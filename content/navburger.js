
(function () {
  var btn = document.querySelector('#header .navburger');
  var panel = document.getElementById('navpanel');
  if (!btn || !panel) return;
  function set(open) {
    btn.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;
    document.documentElement.classList.toggle('navopen', open);
  }
  btn.addEventListener('click', function () {
    set(btn.getAttribute('aria-expanded') !== 'true');
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { set(false); btn.focus(); }
  });
  
  panel.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
  window.addEventListener('resize', function () {
    if (getComputedStyle(btn).display === 'none') set(false);
  }, { passive: true });
  set(false);
})();
