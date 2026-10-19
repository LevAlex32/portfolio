// Если страница открыта не с этого сервера (например, как файл), укажите: 'http://localhost:3000'
const API_BASE = '';

const textEl = document.getElementById('quote-text');
const authorEl = document.getElementById('quote-author');

let timer;

async function loadQuote(method = 'GET', url = '/api/quote') {
  try {
    const res = await fetch(API_BASE + url, { method });
    const data = await res.json();
    textEl.textContent = data.quote;
    authorEl.textContent = data.author;

    // обновим цитату сразу после полуночи UTC (время берём от сервера)
    clearTimeout(timer);
    timer = setTimeout(() => loadQuote(), data.msUntilChange + 1000);
  } catch (e) {
    textEl.textContent = 'Не удалось загрузить цитату';
    authorEl.textContent = '';
  }
}
loadQuote();