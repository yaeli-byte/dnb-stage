
(function () {
  var root = document.querySelector('.pg-duns'); if (!root) return;
  var dv = document.documentElement.getAttribute('data-dv') || 'a';

  
  var chip = document.createElement('div'); chip.className = 'dd-vchip'; chip.setAttribute('role', 'group'); chip.setAttribute('aria-label', 'גרסה');
  [['a', 'גרסה A'], ['b', 'גרסה B']].forEach(function (v) {
    var a = document.createElement('a'); a.textContent = v[1]; a.setAttribute('aria-current', String(dv === v[0]));
    var q = new URLSearchParams(location.search); q.set('v', v[0]); a.href = location.pathname + '?' + q.toString(); chip.appendChild(a);
  });
  document.body.appendChild(chip);

  
  var sc = [].slice.call(root.querySelectorAll('[data-v="a"] [style*="scroll-snap-type"]'))[0];
  if (sc) {
    var head = sc.previousElementSibling, dotsRow = sc.nextElementSibling;
    var arrows = head ? [].slice.call(head.querySelectorAll('span[style*="border-radius:50%"][style*="width:36px"]')) : [];
    var dots = dotsRow ? [].slice.call(dotsRow.children) : [];
    var cards = [].slice.call(sc.firstElementChild.children);
    var RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    function idx() { var best = 0, bd = 1e9, r = sc.getBoundingClientRect(); cards.forEach(function (c, i) { var d = Math.abs(c.getBoundingClientRect().right - (r.right - 20)); if (d < bd) { bd = d; best = i; } }); return best; }
    function paint() {
      var i = idx();
      dots.forEach(function (d, k) { d.style.width = k === i ? '20px' : '6px'; d.style.backgroundColor = k === i ? '#071620' : '#C9D3DA'; });
      if (arrows[0]) { arrows[0].setAttribute('aria-disabled', i === 0); arrows[0].style.backgroundColor = '#FFFFFF'; }
      if (arrows[1]) { arrows[1].setAttribute('aria-disabled', i === cards.length - 1); }
    }
    function go(n) { n = Math.max(0, Math.min(cards.length - 1, n)); var c = cards[n], r = sc.getBoundingClientRect(), b = c.getBoundingClientRect();
      sc.scrollBy({ left: b.right - (r.right - 20), behavior: RM ? 'auto' : 'smooth' }); }
    
    arrows.forEach(function (a, k) {
      a.setAttribute('role', 'button'); a.setAttribute('tabindex', '0'); a.setAttribute('data-dd', 'arrow'); a.setAttribute('aria-label', k === 0 ? 'הקודם' : 'הבא');
      a.addEventListener('click', function () { if (a.getAttribute('aria-disabled') !== 'true') go(idx() + (k === 0 ? -1 : 1)); });
      a.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); a.click(); } });
    });
    sc.addEventListener('scroll', paint, { passive: true }); paint();
  }

  
  
  [].forEach.call(document.querySelectorAll('.dd-form'), function (f) {
    var err = f.querySelector('.dd-err'), ok = f.querySelector('.dd-ok'), sel = f.querySelector('select');
    sel.addEventListener('change', function () { sel.classList.add('has'); });
    f.addEventListener('submit', function (e) {
      e.preventDefault(); var bad = [];
      [].forEach.call(f.querySelectorAll('[required]'), function (el) {
        var v = el.type === 'checkbox' ? el.checked : String(el.value || '').trim();
        if (el.type === 'email' && v && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) v = '';
        el.setAttribute('aria-invalid', String(!v)); if (!v) bad.push(el);
      });
      if (bad.length) { err.textContent = 'יש להשלים את שדות החובה ולאשר את מדיניות הפרטיות.'; err.hidden = false; ok.hidden = true; bad[0].focus(); return; }
      err.hidden = true; var data = {}; new FormData(f).forEach(function (v, k) { data[k] = v; });
      document.dispatchEvent(new CustomEvent('duns:lead', { detail: data }));
      ok.hidden = false; f.querySelector('.dd-act').hidden = true;
    });
  });

  
  [].forEach.call(root.querySelectorAll('[data-v] > section:first-child > div[style*="height:640px"]'), function (card) {
    var comp = card.querySelector(':scope > div[style*="position:absolute"][style*="direction:ltr"]'); if (!comp) return;
    function fit() {
      var w = card.parentElement.clientWidth - parseFloat(getComputedStyle(card.parentElement).paddingLeft) - parseFloat(getComputedStyle(card.parentElement).paddingRight);
      var z = Math.min(1, w / 1356); if (!(z > 0)) return;
      comp.style.inset = 'auto'; comp.style.left = '0'; comp.style.top = '0'; comp.style.width = '1356px'; comp.style.height = '640px'; comp.style.zoom = String(z);
      card.style.height = Math.round(640 * z) + 'px';
    }
    fit(); if (window.ResizeObserver) new ResizeObserver(fit).observe(card.parentElement); else window.addEventListener('resize', fit);
  });
})();
