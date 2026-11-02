
(function () {
  var cards = [].slice.call(document.querySelectorAll('.pg-data div[style*="flex:0 0 250px"]'));
  if (!cards.length) return;
  var row = cards[0].parentElement, dotsRow = row.nextElementSibling;
  var dots = dotsRow ? [].slice.call(dotsRow.children) : [];
  row.style.overflowX = 'auto'; row.style.overflowY = 'hidden';
  row.style.scrollSnapType = 'x mandatory'; row.style.scrollPaddingInline = '16px';
  row.style.scrollbarWidth = 'none'; row.style.overscrollBehaviorX = 'contain';
  row.classList.add('dt-swipe');
  cards.forEach(function (c) { c.style.scrollSnapAlign = 'start'; });
  
  function idx() {
    var step = cards.length > 1 ? Math.abs(cards[1].offsetLeft - cards[0].offsetLeft) : 1;
    var max = row.scrollWidth - row.clientWidth, x = Math.abs(row.scrollLeft);
    if (x >= max - 2) return cards.length - 1;
    return Math.max(0, Math.min(cards.length - 1, Math.round(x / step)));
  }
  function paint() {
    var i = idx();
    dots.forEach(function (d, k) { var on = k === i; d.style.width = on ? '18px' : '6px'; d.style.background = on ? '#0083A1' : 'rgba(11,22,32,.2)'; });
  }
  dots.forEach(function (d, k) {
    d.setAttribute('role', 'button'); d.setAttribute('tabindex', '0'); d.setAttribute('aria-label', 'עיקרון ' + (k + 1) + ' מתוך ' + dots.length);
    d.style.cursor = 'pointer'; d.style.transition = 'width 200ms cubic-bezier(.19,1,.22,1), background-color 200ms';
    d.addEventListener('click', function () { var step = cards.length > 1 ? Math.abs(cards[1].offsetLeft - cards[0].offsetLeft) : 0; row.scrollTo({ left: -k * step, behavior: 'smooth' }); });
  });
  row.addEventListener('scroll', paint, { passive: true }); paint();
})();
