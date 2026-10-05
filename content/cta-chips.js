
(function () {
  if (document.documentElement.getAttribute('data-motion') !== 'on') return;
  if (window.matchMedia && matchMedia('(prefers-reduced-motion:reduce)').matches) return;

  var band = document.getElementById('cta');
  if (!band) return;
  var chips = [].slice.call(band.querySelectorAll('.dchip'));
  if (!chips.length) return;

  
  var NOTES = ['שינוי באחזקות', 'שינוי בבעלות', 'דירוג אשראי'];

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
        
        s.lbl.textContent = NOTES[(Math.random() * NOTES.length) | 0];
        s.el.classList.add('lit');
        s.state = 'lit'; s.t = LIT;
      } else if (s.state === 'lit') {
        s.el.classList.add('show');
        s.state = 'open'; s.t = rnd(HOLD);
      } else if (s.state === 'open') {
        s.el.classList.remove('show');
        s.state = 'close'; s.t = CLOSE;
      } else {
        s.el.classList.remove('lit');
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
