
(function () {
  if (/[?&]motion=off/.test(location.search)) return;

  document.documentElement.setAttribute('data-motion', 'on');

  var STEP = 60;      // ms between parts inside one batch
  var SETTLE = 900;   // ms after a part's transition before its classes go
  var ENTER = 0.86;   // a part lands once its top is above this share of the fold

  
  var SECTIONS = [
    { sel: '#hero',   now: true,
      parts: ['.tabs', 'h1', '.hero-sub', '.btnw', '.dchip'] },
    
    { sel: '#trust',  parts: ['.lbl', '.track > div'] },
    { sel: '#statsw', parts: ['.content .tag', '.content h2', '.lists .item'] },
    { sel: '#sol',    parts: ['.pv-head .eyebrow', '.pv-head h2', '.pv-head .sub', '.card'] },
    { sel: '#guides', parts: ['.g-head .eyebrow', '.g-head h2', '.g-head .btn-all', '.g-card'] },
    { sel: '#ind',    parts: ['.pv-head .eyebrow', '.pv-head h2', '.pv-head .sub',
                              '.visual', '.list .grp'] },
    
    { sel: '#ctaw',   parts: ['#cta h2', '#cta .sub'] },
    { sel: '#tst',    parts: ['.head .lbl', '.head h2', '.card'] },
    { sel: '#faq',    parts: ['.side .eb', '.side h2', '.rows .qa',
                              
                              '#fb .nl', '#fb .colstack > *', '#fb .fbside > *', '#fb .bottom'] }
  ];

  var items = [];   // {el, done} in document order
  var immediate = [];

  SECTIONS.forEach(function (S) {
    var root = document.querySelector(S.sel);
    if (!root) return;
    var els = [];
    S.parts.forEach(function (p) {
      [].forEach.call(root.querySelectorAll(p), function (e) {
        if (els.indexOf(e) === -1) els.push(e);
      });
    });
    els.forEach(function (e) {
      e.classList.add('en');
      var it = { el: e, done: false };
      items.push(it);
      if (S.now) immediate.push(it);
    });
  });

  function land(batch) {
    batch.forEach(function (it, i) {
      it.done = true;
      var e = it.el;
      e.style.transitionDelay = (i * STEP) + 'ms';
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { e.classList.add('in'); });
      });
      setTimeout(function () {
        e.style.transitionDelay = '';
        e.classList.remove('en');
        e.classList.remove('in');
      }, i * STEP + 550 + SETTLE);
    });
  }

  
  function ready(el, vh) {
    var b = el.getBoundingClientRect();
    return b.top < vh * ENTER && b.bottom > 0;
  }

  var scheduled = false;
  function check() {
    scheduled = false;
    var vh = innerHeight, batch = [], left = 0;
    items.forEach(function (it) {
      if (it.done) return;
      left++;
      if (ready(it.el, vh)) batch.push(it);
    });
    if (batch.length) land(batch);
    if (!left) stop();
  }
  function queue() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(check);
  }

  
  var io = null;
  if (window.IntersectionObserver) {
    io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) { queue(); return; }
      }
    }, { threshold: 0, rootMargin: '0px 0px -14% 0px' });
    items.forEach(function (it) { io.observe(it.el); });
  }
  addEventListener('scroll', queue, { passive: true });
  addEventListener('resize', queue);

  var polls = 0;
  var poll = setInterval(function () {
    queue();
    if (++polls > 24) clearInterval(poll);
  }, 500);

  function stop() {
    removeEventListener('scroll', queue);
    removeEventListener('resize', queue);
    clearInterval(poll);
    if (io) io.disconnect();
  }

  
  if (immediate.length) land(immediate);
  queue();

  window.__motion = {
    replay: function () {
      items.forEach(function (it) {
        it.done = false;
        it.el.classList.add('en');
        it.el.classList.remove('in');
        it.el.style.transitionDelay = '';
      });
      addEventListener('scroll', queue, { passive: true });
      if (immediate.length) land(immediate);
      queue();
    }
  };
})();
