
(function () {
  var s = document.querySelector('.ev-slide'); if (!s) return;
  var W = 1257, last = -1;
  function fit() {
    var host = s.parentElement, w = document.documentElement.clientWidth;
    var avail = host.clientWidth;
    if (w < 1024 || w >= 1440) { s.style.width = ''; s.style.zoom = ''; last = -1; return; }
    if (avail === last) return; last = avail;
    s.style.width = W + 'px';
    s.style.zoom = Math.min(1, avail / W).toFixed(4);
  }
  fit(); addEventListener('resize', fit); addEventListener('load', fit);
})();
