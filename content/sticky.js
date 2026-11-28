
(function () {
  var root = document.documentElement, on = false;
  
  function read() {
    var y = window.pageYOffset || root.scrollTop || 0;
    var next = y > 8;
    if (next !== on) { on = next; root.classList.toggle('stuck', on); }
  }
  window.addEventListener('scroll', read, { passive: true });
  window.addEventListener('resize', read, { passive: true });
  read();
})();
