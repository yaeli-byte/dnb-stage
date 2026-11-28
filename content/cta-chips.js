
(function () {
  var band = document.getElementById('cta');
  if (!band) return;
  var chips = [].slice.call(band.querySelectorAll('.dchip'));
  if (!chips.length) return;

  
  var EDGE = 28, TEXTM = 40, CHIPM = 18;
  function textRect() {
    var st = band.querySelector('.stack'), b = band.getBoundingClientRect();
    if (!st) return null;
    var kids = [].slice.call(st.querySelectorAll('h2,p,.btnw,.btn')), L = 1e9, T = 1e9, R = -1e9, B = -1e9;
    (kids.length ? kids : [st]).forEach(function (k) { var r = k.getBoundingClientRect(); if (!r.width) return; L = Math.min(L, r.left); T = Math.min(T, r.top); R = Math.max(R, r.right); B = Math.max(B, r.bottom); });
    return { l: L - b.left, t: T - b.top, r: R - b.left, b: B - b.top };
  }
  function hit(a, b, m) { return a.l < b.r + m && a.r > b.l - m && a.t < b.b + m && a.b > b.t - m; }
  
  var mounted = !!band.closest('[data-mounted]');
  function place(el, others) {
    if (!mounted) return true;
    var bw = band.clientWidth, bh = band.clientHeight, w = el.offsetWidth || 150, h = el.offsetHeight || 28, tr = textRect();
    for (var n = 0; n < 60; n++) {
      var x = EDGE + Math.random() * (bw - w - 2 * EDGE), y = EDGE + Math.random() * (bh - h - 2 * EDGE);
      var me = { l: x, t: y, r: x + w, b: y + h };
      if (x < EDGE || y < EDGE || x + w > bw - EDGE || y + h > bh - EDGE) continue;
      if (tr && hit(me, tr, TEXTM)) continue;
      var bad = false; others.forEach(function (o) { if (o !== el && hit(me, o._box || {l: -9e9, t: -9e9, r: -9e9, b: -9e9}, CHIPM)) bad = true; });
      if (bad) continue;
      el.style.left = x.toFixed(1) + 'px'; el.style.top = y.toFixed(1) + 'px';
      
      el.classList.toggle('r', x + w / 2 > bw / 2); el.classList.toggle('l', !(x + w / 2 > bw / 2));
      el._box = me; return true;
    }
    return false;
  }
  chips.forEach(function (c) { c._box = null; });
  chips.forEach(function (c) { place(c, chips); });
  var rz; window.addEventListener('resize', function () { clearTimeout(rz); rz = setTimeout(function () { chips.forEach(function (c) { c._box = null; }); chips.forEach(function (c) { place(c, chips); }); }, 150); });

  if (document.documentElement.getAttribute('data-motion') !== 'on') return;
  if (window.matchMedia && matchMedia('(prefers-reduced-motion:reduce)').matches) return;

  
  var NOTES = ['שינוי באחזקות', 'שינוי בבעלות', 'דירוג אשראי'];
  
  var own = !!band.closest('[data-own-chips]');

  var LIT = 320, HOLD = [3600, 5800], CLOSE = 340, GAP = [500, 1200];
  var slots = chips.map(function (el, k) {
    return { el: el, lbl: el.querySelector('.dcard p'), state: 'idle', t: k * 1800 };
  });
  var last = 0, raf = null, visible = false;

  function rnd(r) { return r[0] + Math.random() * (r[1] - r[0]); }

  function step(now) {
    raf = null;
    var dt = last ? now - last : 16; last = now;
    slots.forEach(function (s) {
      s.t -= dt;
      if (s.t > 0) return;
      if (s.state === 'idle') {
        
        if (!own) s.lbl.textContent = NOTES[(Math.random() * NOTES.length) | 0];
        s.el._box = null;                                   
        if (!place(s.el, chips)) { s.t = 900; return; }     
        s.el.classList.add('lit');
        s.state = 'lit'; s.t = LIT;
      } else if (s.state === 'lit') {
        s.el.classList.add('show');
        s.state = 'open'; s.t = rnd(HOLD);
      } else if (s.state === 'open') {
        s.el.classList.remove('show');
        s.state = 'close'; s.t = CLOSE;
      } else {
        s.el.classList.remove('lit'); s.el._box = null;
        s.state = 'idle'; s.t = rnd(GAP);
      }
    });
    if (visible) raf = requestAnimationFrame(step);
  }

  function start() { if (!raf && visible) { last = 0; raf = requestAnimationFrame(step); } }
  function stop() {
    if (raf) cancelAnimationFrame(raf);
    raf = null;
    slots.forEach(function (s) { s.el.classList.remove('lit', 'show'); s.state = 'idle'; });
    slots.forEach(function (s, k) { s.t = k * 1800; });
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      visible = es[0].isIntersecting;
      if (visible) start(); else stop();
    }, { rootMargin: '0px 0px -10% 0px' }).observe(band);
  } else { visible = true; start(); }
})();
