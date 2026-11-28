
(function () {
  var n = (new URLSearchParams(location.search).get('fh') || '').trim();
  if (!/^[123]$/.test(n)) return;
  document.documentElement.setAttribute('data-fh', n);

  var MARKS = ['import-export', 'manufacturing', 'construction', 'technology', 'retail'];
  var ROW2 = ['finance', 'logistics', 'energy', 'agriculture'];
  function mark(k) { return '<span class="mark" style="--src:url(fig/ind/' + k + '.svg)"></span>'; }

  var ART = {
    '1': '<img src="fig/hero.png" width="2640" height="1414" alt="" decoding="async">',
    '2': '<div class="artframe"><div class="marks">' + MARKS.map(mark).join('') +
         '<span class="row2">' + ROW2.map(mark).join('') + '</span></div></div>',
    '3': '<img src="fig/cd/about/51e8ff3314c0.jpg" width="1536" height="1024" alt="" decoding="async">'
  };

  function mount(host) {
    if (!host || host.querySelector(':scope > .fhg')) return true;
    var d = document.createElement('div');
    d.className = 'fhg fhg--' + n;
    d.setAttribute('aria-hidden', 'true');
    d.innerHTML = ART[n];
    host.appendChild(d);
    return true;
  }

  function tryMount() {
    var host = document.querySelector('.fh--o6 .fh__stage') || document.querySelector('.fa1-vis');
    return host ? mount(host) : false;
  }

  if (tryMount()) return;
  var mo = new MutationObserver(function () { if (tryMount()) mo.disconnect(); });
  mo.observe(document.documentElement, { childList: true, subtree: true });
  setTimeout(function () { mo.disconnect(); }, 15000);
})();
