
(function () {
  if (/[?&]motion=off/.test(location.search)) return;
  
  if ([].some.call(document.scripts, function (s) {
        return /motion\/entrance-all\.js/.test(s.src || '');
      })) return;

  document.documentElement.setAttribute('data-motion', 'on');

  var STEP = 60, SETTLE = 900, ENTER = 0.86;

  
  var PARTS = [
    '.eyebrow', '.eb', '.ns-eyebrow',
    'h1', 'h2', '.lede', '.sub', '.ns-sec-sub',
    '.btnw', '.dnb-btn', '.btn-all',
    '.g-card', '.scard', '.dnb-card', '.dnb-acc', '.chapter', '.qa',
    '.mockcard', '.quote1', '.tcard', '.m', '.t-card',
    '[role="tabpanel"]', '.ns-prod-block', '.dtable'
  ].join(',');

  
  var ASSETS = '.mockcard, .hiw-panel, .tool-scene, .ns-prod-media, .dtable';

  var parts = [];
  [].forEach.call(document.querySelectorAll('section'), function (sec) {
    var seen = [];
    [].forEach.call(sec.querySelectorAll(PARTS), function (el) {
      
      if (seen.some(function (p) { return p.contains(el); })) return;
      if (el.closest('.wip-mark') || el.closest('#header')) return;
      seen.push(el); parts.push(el);
    });
  });
  if (!parts.length) return;

  var fold = innerHeight;
  parts.forEach(function (el) {
    var top = el.getBoundingClientRect().top;
    
    if (top < fold * 0.9) return;
    el.classList.add('pen');
  });

  [].forEach.call(document.querySelectorAll(ASSETS), function (a) {
    a.classList.add('asset-in');
    if (a.getBoundingClientRect().top < fold * 0.9) a.classList.add('asset-go');
  });

  var queue = [], timer = null;
  function flush() {
    timer = null;
    queue.forEach(function (el, i) {
      setTimeout(function () {
        el.classList.add('pin');
        setTimeout(function () { el.classList.remove('pen', 'pin'); }, SETTLE);
      }, i * STEP);
    });
    queue = [];
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      if (e.target.classList.contains('asset-in')) { e.target.classList.add('asset-go'); return; }
      queue.push(e.target);
      if (!timer) timer = setTimeout(flush, 30);
    });
  }, {rootMargin: '0px 0px -' + Math.round((1 - ENTER) * 100) + '% 0px'});

  parts.forEach(function (el) { if (el.classList.contains('pen')) io.observe(el); });
  [].forEach.call(document.querySelectorAll(ASSETS), function (a) {
    if (!a.classList.contains('asset-go')) io.observe(a);
  });

  
  function land(el) {
    if (!el.classList.contains('pen') && !el.classList.contains('asset-in')) return;
    if (el.classList.contains('asset-in')) { el.classList.add('asset-go'); return; }
    el.classList.add('pin');
    setTimeout(function () { el.classList.remove('pen', 'pin'); }, SETTLE);
  }
  function sweep(all) {
    var fold2 = innerHeight;
    [].forEach.call(document.querySelectorAll('.pen, .asset-in:not(.asset-go)'), function (el) {
      var b = el.getBoundingClientRect();
      if (all || (b.top < fold2 && b.bottom > 0)) { io.unobserve(el); land(el); }
    });
  }
  var t = null;
  addEventListener('scroll', function () {
    if (t) return;
    t = setTimeout(function () { t = null; sweep(false); }, 120);
  }, {passive: true});
  addEventListener('resize', function () { sweep(false); }, {passive: true});
  setTimeout(function () { sweep(false); }, 3000);   
  setTimeout(function () { sweep(true);  }, 10000);  
})();
