
(function () {
  var SEL = (window.DNB_FIT || []).concat(['[data-fit1440]']).join(',');
  function apply() {
    var w = document.documentElement.clientWidth, on = w >= 1024 && w < 1424;
    [].forEach.call(document.querySelectorAll(SEL), function (e) {
      if (on) { e.setAttribute('data-fit', ''); e.style.setProperty('zoom', String(w / 1440), 'important'); e.style.setProperty('width', '1440px', 'important'); e.style.setProperty('max-width', 'none', 'important'); }
      else if (e.hasAttribute('data-fit')) { e.removeAttribute('data-fit'); e.style.removeProperty('zoom'); e.style.removeProperty('width'); e.style.removeProperty('max-width'); }
    });
  }
  var t; window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(apply, 80); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply); else apply();
  window.addEventListener('load', apply);
})();
