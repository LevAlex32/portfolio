// Сервер цитаты дня. Без внешних зависимостей, нужен Node.js 18+.
// Запуск: node server.js

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const QUOTES_FILE = path.join(__dirname, 'data', 'quotes.json'); // «база данных»
const STATE_FILE = path.join(__dirname, 'data', 'state.json');   // текущая цитата и день
const PUBLIC_DIR = path.join(__dirname, 'public');               // сюда положить файлы сайта
const DAY_MS = 24 * 60 * 60 * 1000;

/* ---------- Время (UTC) со сверкой через интернет ---------- */

let offset = 0; // поправка: точное время минус время системных часов

async function syncTime() {
  const sources = [
    async () => {
      const r = await fetch('https://worldtimeapi.org/api/timezone/Etc/UTC', { signal: AbortSignal.timeout(5000) });
      return (await r.json()).unixtime * 1000;
    },
    async () => {
      const r = await fetch('https://www.google.com', { method: 'HEAD', signal: AbortSignal.timeout(5000) });
      return new Date(r.headers.get('date')).getTime();
    },
  ];
  for (const get of sources) {
    try {
      const t = await get();
      if (Number.isFinite(t)) {
        offset = t - Date.now();
        console.log(`[time] синхронизировано, поправка ${offset} мс`);
        return;
      }
    } catch (e) { /* пробуем следующий источник */ }
  }
  console.warn('[time] интернет недоступен, используются системные часы');
}

const now = () => Date.now() + offset;
const todayStr = () => new Date(now()).toISOString().slice(0, 10); // YYYY-MM-DD в UTC
const msUntilMidnight = () => DAY_MS - (now() % DAY_MS);

/* ---------- Работа с файлами ---------- */

function readJson(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch { return fallback; }
}

function writeJson(file, data) {
  const tmp = file + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2));
  fs.renameSync(tmp, file); // атомарная запись, файл не повредится при сбое
}

/* ---------- Логика цитат ---------- */

function pickNewQuote() {
  const quotes = readJson(QUOTES_FILE, []);
  if (quotes.length === 0) throw new Error('quotes.json пуст');
  const state = readJson(STATE_FILE, {});

  let candidates = quotes.filter(q => !q.shown);
  if (candidates.length === 0) {
    // все показаны — сбрасываем статус
    quotes.forEach(q => { q.shown = false; });
    candidates = quotes.filter(q => q.id !== state.currentId); // не повторяем вчерашнюю
    if (candidates.length === 0) candidates = quotes;           // в списке всего одна цитата
  }

  const chosen = candidates[Math.floor(Math.random() * candidates.length)];
  chosen.shown = true;
  writeJson(QUOTES_FILE, quotes);
  writeJson(STATE_FILE, { day: todayStr(), currentId: chosen.id });
  return chosen;
}

// Возвращает цитату на сегодня; если день сменился (или состояния нет) — выбирает новую
function getTodayQuote() {
  const state = readJson(STATE_FILE, {});
  const quotes = readJson(QUOTES_FILE, []);
  const current = quotes.find(q => q.id === state.currentId);
  if (state.day === todayStr() && current) return current;
  return pickNewQuote();
}

function payload(q) {
  return { id: q.id, quote: q.quote, author: q.author, msUntilChange: msUntilMidnight() };
}

/* ---------- Планировщик: смена ровно в 00:00 UTC ---------- */

function scheduleMidnight() {
  setTimeout(async () => {
    await syncTime();
    getTodayQuote();
    scheduleMidnight();
  }, msUntilMidnight() + 500);
}

/* ---------- HTTP ---------- */

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
};

function sendJson(res, code, data) {
  res.writeHead(code, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*', // чтобы работало и при открытии html как файла
    'Cache-Control': 'no-store',
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');

  try {
    if (url.pathname === '/api/quote' && req.method === 'GET') {
      return sendJson(res, 200, payload(getTodayQuote()));
    }
    // ТЕСТ: принудительная смена цитаты (удалить перед публикацией сайта)
    if (url.pathname === '/api/quote/next' && req.method === 'POST') {
      return sendJson(res, 200, payload(pickNewQuote()));
    }
    if (url.pathname.startsWith('/api/')) {
      res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST' });
      return res.end();
    }
  } catch (e) {
    console.error(e);
    return sendJson(res, 500, { error: e.message });
  }

  // статические файлы
  let file = path.join(PUBLIC_DIR, url.pathname === '/' ? 'index.html' : decodeURIComponent(url.pathname));
  if (!file.startsWith(PUBLIC_DIR)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  });
});

(async () => {
  await syncTime();
  setInterval(syncTime, 60 * 60 * 1000); // повторная сверка раз в час
  getTodayQuote();
  scheduleMidnight();
  server.listen(PORT, () => console.log(`http://localhost:${PORT}`));
})();