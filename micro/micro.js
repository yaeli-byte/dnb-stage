
(function () {
  var root = document.documentElement;
  var MAX = 2;            // degrees
  var wired = false;

  function cards() {
    return [].slice.call(document.querySelectorAll('#frame .card, #frame .g-card'));
  }

  function onMove(e) {
    var el = e.currentTarget, b = el.getBoundingClientRect();
    var px = (e.clientX - b.left) / b.width - 0.5;      // -0.5 … 0.5
    var py = (e.clientY - b.top) / b.height - 0.5;
    el.style.setProperty('--ty', (px * MAX * 2).toFixed(2) + 'deg');
    el.style.setProperty('--tx', (-py * MAX * 2).toFixed(2) + 'deg');
    el.classList.add('tilt');
  }
  function onLeave(e) {
    var el = e.currentTarget;
    el.style.setProperty('--ty', '0deg');
    el.style.setProperty('--tx', '0deg');
    setTimeout(function () {
      if (root.getAttribute('data-micro') !== '3') el.classList.remove('tilt');
    }, 260);
  }

  function wire() {
    if (wired) return;
    wired = true;
    cards().forEach(function (el) {
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerleave', onLeave);
    });
  }
  function unwire() {
    if (!wired) return;
    wired = false;
    cards().forEach(function (el) {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      el.classList.remove('tilt');
      el.style.removeProperty('--tx');
      el.style.removeProperty('--ty');
    });
  }

  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;

  window.__micro = {
    set: function (n) {
      n = String(n || '');
      if (!n || n === '0') { root.removeAttribute('data-micro'); unwire(); return; }
      root.setAttribute('data-micro', n);
      if (n === '3' && !reduce) wire(); else unwire();
    },
    get: function () { return root.getAttribute('data-micro') || '0'; }
  };

  
  window.__micro.hover = function (id) {
    [].forEach.call(document.querySelectorAll('.__hov'), function (e) { e.classList.remove('__hov'); });
    if (!id) return null;
    var el = document.getElementById(id) || document.querySelector(id);
    if (el) el.classList.add('__hov');
    return !!el;
  };

  
  var q = (location.search.match(/[?&]micro=([0-5])/) || [])[1];
  window.__micro.set(q || '3');
  var hv = (location.search.match(/[?&]hov=([^&]+)/) || [])[1];
  if (hv) addEventListener('load', function () { window.__micro.hover(decodeURIComponent(hv)); });
})();
