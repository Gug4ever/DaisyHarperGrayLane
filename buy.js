// Buy links: one Amazon ASIN (= ISBN-10) per book, valid on every Amazon store,
// plus the IngramSpark shop link (prints and ships from the UK and the US only).
(function () {
  var MARKETS = [
    ['com', 'us', 'United States'], ['co.uk', 'uk', 'United Kingdom'],
    ['ca', 'ca', 'Canada'], ['com.au', 'au', 'Australia'],
    ['de', 'de', 'Germany'], ['fr', 'fr', 'France'], ['es', 'es', 'Spain'],
    ['it', 'it', 'Italy'], ['nl', 'nl', 'Netherlands'], ['com.be', 'be', 'Belgium'],
    ['ie', 'ie', 'Ireland'], ['pl', 'pl', 'Poland'], ['se', 'se', 'Sweden'],
    ['co.jp', 'jp', 'Japan']
  ];

  var bars = document.querySelectorAll('.mkt-bar');
  bars.forEach(function (bar) {
    MARKETS.forEach(function (m) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'mkt-btn';
      b.dataset.tld = m[0];
      b.title = 'Amazon ' + m[2];
      b.innerHTML = '<img src="assets/flags/' + m[1] + '.jpg" alt="' + m[2] +
        '" width="42" height="30" loading="lazy"><span>' + m[2] + '</span>';
      b.addEventListener('click', function () { setMarket(m[0]); });
      bar.appendChild(b);
    });
  });

  function setMarket(tld) {
    document.querySelectorAll('.buy-amazon').forEach(function (a) {
      a.href = 'https://www.amazon.' + tld + '/dp/' + a.dataset.asin;
    });
    document.querySelectorAll('.mkt-btn').forEach(function (b) {
      b.classList.toggle('active', b.dataset.tld === tld);
    });
    try { localStorage.setItem('dhgl-market', tld); } catch (e) {}
  }

  var saved = null;
  try { saved = localStorage.getItem('dhgl-market'); } catch (e) {}
  if (!saved || !MARKETS.some(function (m) { return m[0] === saved; })) {
    var lang = (navigator.language || '').toLowerCase();
    var guess = { 'en-gb': 'co.uk', 'en-ie': 'ie', 'en-ca': 'ca', 'fr-ca': 'ca',
                  'en-au': 'com.au', 'fr-be': 'com.be', 'nl-be': 'com.be',
                  'fr': 'fr', 'de': 'de', 'es': 'es', 'it': 'it', 'nl': 'nl',
                  'pl': 'pl', 'sv': 'se', 'ja': 'co.jp' };
    saved = guess[lang] || guess[lang.split('-')[0]] || 'com';
  }
  setMarket(saved);
})();
