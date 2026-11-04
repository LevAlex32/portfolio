const API_BASE = '';

const textEl = document.getElementById('quote-text');
const authorEl = document.getElementById('quote-author');

let timer;
let requestId = 0; 

function currentLang() {
  return (window.I18N && window.I18N.lang) || 'en';
}

async function loadQuote(method = 'GET', url = '/api/quote') {
  const myRequest = ++requestId;
  const lang = currentLang();
  const sep = url.includes('?') ? '&' : '?';

  try {
    const res = await fetch(`${API_BASE}${url}${sep}lang=${lang}`, { method });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    if (myRequest !== requestId) return;

    textEl.textContent = data.quote;
    authorEl.textContent = data.author;

    clearTimeout(timer);
    timer = setTimeout(() => loadQuote(), data.msUntilChange + 1000);
  } catch (e) {
    if (myRequest !== requestId) return;
    textEl.textContent = lang === 'ru' ? 'Не удалось загрузить цитату' : 'Failed to load the quote';
    authorEl.textContent = '';
  }
}

document.addEventListener('sitelangchange', () => loadQuote());

loadQuote();