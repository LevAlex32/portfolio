const ruList = require('../data/quotes_ru.json'); // главная база, из неё берём id
const enList = require('../data/quotes_en.json');

const DAY_MS = 24 * 60 * 60 * 1000;

// Детерминированный генератор случайных чисел (одинаковый seed → одинаковый результат)
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Порядок показа на один «круг»: каждая цитата по разу, порядок случайный, но фиксированный
function cycleOrder(ids, cycle) {
  const rnd = mulberry32(cycle + 1);
  const arr = [...ids];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function pickId(ids, day) {
  const n = ids.length;
  const cycle = Math.floor(day / n);
  const order = cycleOrder(ids, cycle);
  // чтобы на стыке кругов не повторилась вчерашняя цитата
  if (cycle > 0 && n > 2) {
    const prevLast = cycleOrder(ids, cycle - 1)[n - 1];
    if (order[0] === prevLast) [order[0], order[1]] = [order[1], order[0]];
  }
  return order[day % n];
}

module.exports = (req, res) => {
  const lang = req.query.lang === 'ru' ? 'ru' : 'en';
  // offset — только для теста: «сдвиг» на N дней вперёд
  const offset = Math.min(Math.max(parseInt(req.query.offset, 10) || 0, 0), 3650);

  const now = Date.now(); // часы серверов Vercel синхронизированы, сверка через интернет не нужна
  const day = Math.floor(now / DAY_MS) + offset; // номер дня по UTC, меняется в 0:00 UTC

  const ids = ruList.map(q => q.id).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  const id = pickId(ids, day);

  const master = ruList.find(q => q.id === id);
  const q = lang === 'ru' ? master : (enList.find(x => x.id === id) || master);

  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({
    id,
    quote: q.quote,
    author: q.author,
    lang,
    msUntilChange: DAY_MS - (now % DAY_MS),
  });
};