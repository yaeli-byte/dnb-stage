
(function () {
  if (document.documentElement.getAttribute('data-motion') !== 'on') return;

  var sec  = document.getElementById('tst');
  if (!sec) return;
  var row  = sec.querySelector('.row'),
      nav  = sec.querySelector('.navsq'),
      pill = sec.querySelector('.progbar .pill');
  if (!row || !nav || !pill) return;

  var cards = [].slice.call(row.querySelectorAll('.card'));
  if (cards.length < 2) return;

  var sqs = [].slice.call(nav.querySelectorAll('.sq'));
  var next = sqs[0], prev = sqs[1];   
  var i = 0, timer = null, visible = false, held = false, taken = false;
  var AUTO = 6000;

  
  var dots = document.createElement('span');
  
  dots.className = 'pdots';
  cards.forEach(function () { dots.appendChild(document.createElement('i')); });
  pill.appendChild(dots);
  var dotEls = [].slice.call(dots.children);

  
  function step () {
    var a = cards[0].getBoundingClientRect();
    var gap = parseFloat(getComputedStyle(row).columnGap) || 32;
    return a.width + gap;
  }

  
  function view () {
    var cs = getComputedStyle(sec), r = sec.getBoundingClientRect();
    var inner = r.width - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    return Math.min(row.clientWidth || inner, inner);
  }
  function maxIndex () {
    var s = step(), gap = s - cards[0].getBoundingClientRect().width;
    var fits = Math.max(1, Math.floor((view() + gap) / s));
    return Math.max(0, cards.length - fits);
  }

  
  function scroller () {
    var ox = getComputedStyle(row).overflowX;
    return (ox === 'auto' || ox === 'scroll') && row.scrollWidth > row.clientWidth + 1;
  }

  function paint () {
    if (scroller()) {
      row.style.removeProperty('--tshift');
      var dir = getComputedStyle(row).direction === 'rtl' ? -1 : 1;
      row.scrollTo({ left: dir * i * step(), behavior: 'smooth' });
    } else {
      row.style.setProperty('--tshift', (-i * step()) + 'px');
    }
    dotEls.forEach(function (d, n) { d.classList.toggle('on', n === i); });
    var top = maxIndex();
    if (prev) prev.setAttribute('aria-disabled', i <= 0 ? 'true' : 'false');
    if (next) next.setAttribute('aria-disabled', i >= top ? 'true' : 'false');
  }

  function go (n, byHand) {
    var top = maxIndex();
    i = Math.max(0, Math.min(top, n));
    if (byHand) { taken = true; clearTimeout(timer); timer = null; }
    paint();
  }

  function tick () {
    if (taken || held || !visible) return;
    var top = maxIndex();
    go(i >= top ? 0 : i + 1);
    timer = setTimeout(tick, AUTO);
  }
  function start () { if (!timer && !taken) timer = setTimeout(tick, AUTO); }
  function stop ()  { clearTimeout(timer); timer = null; }

  
  
  sqs.forEach(function (sq, n) {
    sq.setAttribute('role', 'button');
    sq.setAttribute('tabindex', '0');
    sq.setAttribute('aria-label', n === 0 ? 'הציטוט הבא' : 'הציטוט הקודם');
    var d = n === 0 ? 1 : -1;
    sq.addEventListener('click', function () { go(i + d, true); });
    sq.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(i + d, true); }
    });
  });
  row.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft')  go(i + 1, true);
    if (e.key === 'ArrowRight') go(i - 1, true);
  });

  sec.addEventListener('mouseenter', function () { held = true; stop(); });
  sec.addEventListener('mouseleave', function () { held = false; start(); });
  sec.addEventListener('focusin',    function () { held = true; stop(); });
  sec.addEventListener('focusout',   function () { held = false; start(); });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      visible = es[0].isIntersecting;
      if (visible) start(); else stop();
    }, {rootMargin: '0px 0px -15% 0px'}).observe(sec);
  } else { visible = true; start(); }

  
  if ('ResizeObserver' in window) new ResizeObserver(function () { paint(); }).observe(row);

  paint();
})();
