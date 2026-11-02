
(function () {
  var sec = document.getElementById('ns-hero-sec');
  if (!sec) return;
  var svg = sec.querySelector('.ns-hero-media svg');
  if (!svg) return;

  var dots = [].slice.call(svg.querySelectorAll('path[fill-opacity]'));
  if (!dots.length) return;

  var pts = dots.map(function (d) {
    var b;
    try { b = d.getBBox(); } catch (e) { b = null; }
    return { el: d, k: b ? (b.x + b.y) : 0 };
  });
  var min = Infinity, max = -Infinity;
  pts.forEach(function (p) { if (p.k < min) min = p.k; if (p.k > max) max = p.k; });
  var span = (max - min) || 1;
  
  pts.forEach(function (p) {
    p.el.style.setProperty('--i', Math.round((p.k - min) / span * 36));
  });

  
  var card = svg.querySelector('g > rect, rect');
  if (card && card.parentNode && card.parentNode.tagName.toLowerCase() === 'g') {
    card.parentNode.classList.add('ns-float');
  }
})();
