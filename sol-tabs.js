
(function () {
  var sec = document.getElementById('ns-prod-sec');
  if (!sec) return;
  var tabs = [].slice.call(sec.querySelectorAll('.ns-prod-tab'));
  var list = sec.querySelector('.ns-prod-blocks');
  var blocks = list ? [].slice.call(list.querySelectorAll('.ns-prod-block')) : [];
  if (!tabs.length || blocks.length !== tabs.length) return;

  var tabsWrap = sec.querySelector('.ns-prod-tabs');

  function phone() { return sec.getBoundingClientRect().width < 768; }

  function select(i) {
    tabs.forEach(function (t, n) {
      var on = n === i;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.setAttribute('tabindex', on ? '0' : '-1');
    });
    blocks.forEach(function (b, n) { b.hidden = n !== i; });
  }

  function openAll() {
    blocks.forEach(function (b) { b.hidden = false; });
    if (tabsWrap) tabsWrap.hidden = true;
  }

  var current = 0;
  function apply() {
    if (phone()) { openAll(); return; }
    if (tabsWrap) tabsWrap.hidden = false;
    select(current);
  }

  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { current = i; if (!phone()) select(i); });
    
    t.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowLeft' ? 1 : e.key === 'ArrowRight' ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      current = (i + d + tabs.length) % tabs.length;
      select(current); tabs[current].focus();
    });
  });

  apply();
  addEventListener('resize', apply);
})();
