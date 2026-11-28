
(function () {
  var root = document.querySelector('.pg-duns');
  if (!root) return;
  function set(el, v) { for (var k in v) el.style.setProperty('--' + k, v[k]); }
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  var ON = 'inset 0 0 0 1px rgba(0,131,161,.85)', OFF = 'inset 0 0 0 .957px rgba(255,255,255,.95)';
  var hero = root.querySelector('[data-part="hero"]');
  function heroVals(a) {
    var v = {};
    for (var i = 0; i < 3; i++) {
      var on = a === i;
      v['go' + i] = on ? 1 : .28; v['to' + i] = on ? 1 : .4; v['bx' + i] = on ? ON : OFF;
    }
    return v;
  }
  if (hero && !reduce) {
    var s = 0;
    setInterval(function () { s = (s + 1) % 3; set(hero, heroVals(s)); }, 3000);
  }

  var lbi = root.querySelector('[data-part="lbi"]');
  var DIM = 'inset 0 0 0 .957px rgba(33,33,33,.1)';
  function lbiVals(a) {
    var v = {};
    for (var i = 0; i < 6; i++) {
      var on = a === i;
      v['w' + i] = on ? '100%' : '0%';       v['n' + i] = on ? '#0083A1' : '#8FA2AF';
      v['t' + i] = on ? 1 : .6;              v['a' + i] = on ? 1 : 0;
      v['h' + i] = on ? HOPEN : '0px';      v['o' + i] = on ? 1 : 0;
      v['m' + i] = on ? 1 : .38;
      v['g' + i] = on ? 'linear-gradient(141deg,rgba(174,235,249,.35) 19%,#AEEBF9 101%)' : '#F3F5F7';
      v['b' + i] = DIM;   
      v['pr' + i] = on ? 'rotate(0deg)' : 'rotate(-90deg)';
    }
    return v;
  }
  var HOPEN = lbi && getComputedStyle(lbi).getPropertyValue('--hopen').trim() || '80px';
  if (lbi) {
    var open = 0;
    var picks = [].slice.call(lbi.querySelectorAll('[data-pick]'));
    function sync() {
      set(lbi, lbiVals(open));
      picks.forEach(function (b) {
        b.setAttribute('aria-expanded', String(+b.getAttribute('data-pick').slice(4) === open));
      });
    }
    
    var canHover = window.matchMedia && matchMedia('(hover:hover)').matches;
    picks.forEach(function (b) {
      var i = +b.getAttribute('data-pick').slice(4);
      function go() { if (open !== i) { open = i; sync(); } }
      if (canHover) b.addEventListener('mouseenter', go);
      b.addEventListener('focus', go);
      b.addEventListener('click', function () {
        if (canHover) { go(); return; }
        open = open === i ? -1 : i; sync();
      });
    });
    sync();
  }

  
  [].forEach.call(root.querySelectorAll('form'), function (f) {
    f.addEventListener('submit', function (e) { e.preventDefault(); });
  });

  
  function fit() {
    [].forEach.call(document.querySelectorAll('#cta .btn, #ctaw .btn'), function (b) {
      var l = b.querySelector('.lbl'); if (!l) return;
      var p = l.cloneNode(true);
      p.style.cssText = 'position:absolute;left:-9999px;top:0;visibility:hidden;width:auto;white-space:nowrap';
      b.appendChild(p);
      var w = p.getBoundingClientRect().width;
      b.removeChild(p);
      if (w > l.getBoundingClientRect().width + .5) b.style.setProperty('--lblw', w.toFixed(3) + 'px');
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fit); else fit();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
})();
