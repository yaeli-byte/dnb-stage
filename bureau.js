
(function () {
  var DATA = {
    'Review': { d: 'סקירה מקיפה של תיק האשראי של הלקוח, לבדיקה מעמיקה לפני שמאשרים עסקה.',
                b: ['תמונה מלאה של ההתחייבויות והתשלומים', 'מבוסס על נתוני מערכת נתוני האשראי', 'רק בהסכמת הלקוח'] },
    'Double Checkit': { d: 'בדיקה כפולה של פרטי הלקוח ונתוני האשראי שלו, לצמצום טעויות וניסיונות הונאה.',
                b: ['אימות פרטים מול מקורות מוסמכים', 'התראה על פערים בנתונים', 'רק בהסכמת הלקוח'] },
    'דוח מיופה כוח בתמורה': { d: 'דוח אשראי שמופק עבור הלקוח באמצעות מיופה כוח מטעמו, בהתאם להוראות החוק.',
                b: ['הפקה מהירה ומאובטחת', 'בהתאם לחוק נתוני אשראי', 'רק בהסכמת הלקוח'] },
    'Monitoring': { d: 'מעקב שוטף אחרי לקוחות קיימים, עם התראה כשמשהו משתנה במצב האשראי שלהם.',
                b: ['התראות על שינויים בזמן', 'מעקב אחרי תיק הלקוחות כולו', 'רק בהסכמת הלקוח'] }
  };
  function sec() { return [].slice.call(document.querySelectorAll('.pg-bureau section')).filter(function (s) { return /לעסקים ולנותני אשראי/.test(s.textContent); }); }

  
  sec().forEach(function (S) {
    var tabs = [].slice.call(S.querySelectorAll('.tabs .tab')), pb = S.querySelector('.pblock');
    if (!tabs.length || !pb) return;
    var on = tabs[0].getAttribute('style') || '', off = (tabs[1] && tabs[1].getAttribute('style')) || '';
    var h3 = pb.querySelector('.pt h3'), p = pb.querySelector('.pt p'), lis = [].slice.call(pb.querySelectorAll('.bul span'));
    var label = [].slice.call(pb.querySelectorAll('.pmedia [dir="ltr"]')).filter(function (e) { return e.textContent.trim() === 'Signal'; })[0];
    DATA['Signal'] = { d: p.textContent, b: lis.map(function (l) { return l.textContent; }), own: true };
    function show(i) {
      var name = tabs[i].textContent.trim(), c = DATA[name]; if (!c) return;
      tabs.forEach(function (t, k) { t.setAttribute('style', k === i ? on : off); t.setAttribute('aria-selected', k === i ? 'true' : 'false'); t.tabIndex = k === i ? 0 : -1; });
      h3.textContent = name; p.textContent = c.d; lis.forEach(function (l, k) { l.textContent = c.b[k] || ''; });
      if (label) label.textContent = name;
      if (c.own) pb.removeAttribute('data-invented'); else pb.setAttribute('data-invented', '');
      pb.classList.remove('bu-swap'); void pb.offsetWidth; pb.classList.add('bu-swap');
    }
    tabs.forEach(function (t, i) {
      t.setAttribute('role', 'tab'); t.style.cursor = 'pointer';
      t.addEventListener('click', function () { show(i); });
      t.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(i); }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); var n = (i + (e.key === 'ArrowLeft' ? 1 : -1) + tabs.length) % tabs.length; show(n); tabs[n].focus(); }   
      });
    });
    pb.setAttribute('role', 'tabpanel');
    tabs[0].setAttribute('aria-selected', 'true'); tabs.forEach(function (t, k) { t.tabIndex = k ? -1 : 0; });
  });

  
  sec().forEach(function (S) {
    var btns = [].slice.call(S.querySelectorAll('button[aria-expanded][aria-controls]'));
    if (btns.length < 2) return;
    var openBtn = btns.filter(function (b) { return b.getAttribute('aria-expanded') === 'true'; })[0] || btns[0];
    var tpl = document.getElementById(openBtn.getAttribute('aria-controls')); if (!tpl) return;
    var tileOpen = openBtn.lastElementChild.innerHTML, closedB = btns.filter(function (b) { return b !== openBtn; })[0];
    var tileClosed = closedB ? closedB.lastElementChild.innerHTML : tileOpen;
    var styleOpen = openBtn.getAttribute('style'), styleClosed = closedB ? closedB.getAttribute('style') : styleOpen;
    btns.forEach(function (b) {
      var id = b.getAttribute('aria-controls'), name = b.firstElementChild.textContent.trim();
      if (!document.getElementById(id)) {                 // build the missing region from the open one (same structure)
        var c = DATA[name], r = tpl.cloneNode(true); r.id = id; r.hidden = true;
        if (c) {
          var pp = r.querySelector('p'); if (pp) pp.textContent = c.d;
          [].slice.call(r.querySelectorAll('li span')).forEach(function (l, k) { l.textContent = c.b[k] || ''; });
          [].slice.call(r.querySelectorAll('[dir="ltr"]')).forEach(function (e) { if (e.textContent.trim() === 'Signal') e.textContent = name; });
          r.setAttribute('data-invented', '');
        }
        b.insertAdjacentElement('afterend', r);
      }
    });
    function set(b, open) {
      var r = document.getElementById(b.getAttribute('aria-controls'));
      b.setAttribute('aria-expanded', open ? 'true' : 'false'); b.setAttribute('style', open ? styleOpen : styleClosed);
      b.lastElementChild.innerHTML = open ? tileOpen : tileClosed; if (r) r.hidden = !open;
    }
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        var was = b.getAttribute('aria-expanded') === 'true';
        btns.forEach(function (o) { set(o, false); });
        if (!was) set(b, true);
      });
    });
  });
})();
