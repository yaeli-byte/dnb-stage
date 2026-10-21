
(function () {
  var W = /(?:^|;)\s*width:\s*([\d.]+)px/, Hh = /(?:^|;)\s*height:\s*([\d.]+)px/;
  function plates() {
    return [].filter.call(document.querySelectorAll('[style*="width:"][style*="height:"]'), function (e) {
      var st = e.getAttribute('style') || '', w = W.exec(st), h = Hh.exec(st);
      return w && h && +w[1] >= 480 && +h[1] >= 240 && (/position:\s*relative/.test(st) || e.hasAttribute('data-plate')) &&
        !e.closest('#header,#fb,#faq,.menuw');
    });
  }
  function run() {
    var vw = document.documentElement.clientWidth, on = vw >= 768 && vw <= 1100;
    plates().forEach(function (e) {
      var n = +W.exec(e.getAttribute('style'))[1], p = e.parentElement, cs = p && getComputedStyle(p);
      if (e.__z) { e.style.removeProperty('zoom'); e.__z = 0; }
      if (!on || !p) return;
      var avail = p.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      if (avail > 0 && n > avail + 1) { e.style.setProperty('zoom', String(avail / n), 'important'); e.__z = 1; }
    });
  }
  var t; function later() { clearTimeout(t); t = setTimeout(run, 80); }
  window.addEventListener('resize', later); window.addEventListener('load', function () { run(); setTimeout(run, 1200); });
  if (document.readyState !== 'loading') run(); else document.addEventListener('DOMContentLoaded', run);
})();
