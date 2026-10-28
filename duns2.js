
(function () {
  var root = document.querySelector('.pg-duns'); if (!root) return;

  
  var sc = [].slice.call(root.querySelectorAll('[style*="scroll-snap-type"]'))[0];
  if (sc) {
    var head = sc.previousElementSibling, dotsRow = sc.nextElementSibling;
    // 28/10: the controls are the style guide's squares (.dd-sq) and live in the eyebrow row, which is NOT the scroller's
    // neighbour (the h2 sits between) — looked up in the section, so they are actually wired
    var arrows = [].slice.call(sc.parentElement.querySelectorAll('.dd-sq'));
    // 28/10 b: the row under the cards now holds the dots (.dd-dots) AND the controls
    var dotsBox = dotsRow && (dotsRow.querySelector('.dd-dots') || dotsRow);
    var dots = dotsBox ? [].slice.call(dotsBox.children) : [];
    var cards = [].slice.call(sc.firstElementChild.children);
    var RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    function idx() { var best = 0, bd = 1e9, r = sc.getBoundingClientRect(); cards.forEach(function (c, i) { var d = Math.abs(c.getBoundingClientRect().right - (r.right - 20)); if (d < bd) { bd = d; best = i; } }); return best; }
    function paint() {
      var i = idx();
      dots.forEach(function (d, k) { d.style.width = k === i ? '20px' : '6px'; d.style.backgroundColor = k === i ? '#071620' : '#C9D3DA'; });
      arrows.forEach(function (a, k) { var off = k === 0 ? i === 0 : i === cards.length - 1; a.setAttribute('aria-disabled', off); a.style.opacity = off ? '.4' : '1'; });
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

  
  [].forEach.call(root.querySelectorAll('.pg-duns > section:first-child > div[style*="height:640px"]'), function (card) {
    var comp = card.querySelector(':scope > div[style*="position:absolute"][style*="direction:ltr"]'); if (!comp) return;
    function fit() {
      var w = card.parentElement.clientWidth - parseFloat(getComputedStyle(card.parentElement).paddingLeft) - parseFloat(getComputedStyle(card.parentElement).paddingRight);
      var z = Math.min(1, w / 1356); if (!(z > 0)) return;
      comp.style.inset = 'auto'; comp.style.left = '0'; comp.style.top = '0'; comp.style.width = '1356px'; comp.style.height = '640px'; comp.style.zoom = String(z);
      card.style.height = Math.round(640 * z) + 'px';
    }
    fit(); if (window.ResizeObserver) new ResizeObserver(fit).observe(card.parentElement); else window.addEventListener('resize', fit);
  });

  
  (function () {
    function fitBtns() {
      [].forEach.call(document.querySelectorAll('#ctaw .btn'), function (b) {
        var l = b.querySelector('.lbl'); if (!l) return;
        l.style.width = 'auto'; l.style.whiteSpace = 'nowrap';
        var w = l.scrollWidth; l.style.width = '';
        if (w) b.style.setProperty('--lblw', w.toFixed(3) + 'px');
      });
    }
    var host = document.querySelector('[data-home="ctaw"]');
    if (host && window.MutationObserver) new MutationObserver(fitBtns).observe(host, {childList: true, subtree: true});
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitBtns);
    window.addEventListener('load', fitBtns); fitBtns();
  })();

  
})();
