
(function () {
  function build(sec) {
    var h2 = sec.querySelector('h2');
    if (!h2) return;

    
    var items = [];
    var pools = [sec].concat([].slice.call(sec.querySelectorAll('ul,ol,div')));
    for (var i = 0; i < pools.length; i++) {
      var kids = [].slice.call(pools[i].children).filter(function (k) {
        return k.querySelector('svg,img') &&
               (k.textContent || '').replace(/\s+/g, ' ').trim().length > 15 &&
               !k.querySelector('h2');
      });
      if (kids.length >= 3 && kids.length <= 6) { items = kids; break; }
    }
    if (!items.length) return;

    var cards = items.map(function (el) {
      
      var lead = null;
      var w = document.createTreeWalker(el, NodeFilter.SHOW_ELEMENT, null, false), n;
      while ((n = w.nextNode())) {
        if (n.children.length) continue;
        var v = (n.textContent || '').replace(/\s+/g, ' ').trim();
        if (v.length > 10) { lead = v; break; }
      }
      var txt = lead || (el.textContent || '').replace(/\s+/g, ' ').trim();
      var ico = el.querySelector('svg,img');
      return {text: txt, ico: ico ? ico.cloneNode(true) : null};
    });

    
    var WANT = 6;
    
    
    var POOL = [
      ['כל תמונת הסיכון של הלקוח במסך אחד, בלי לעבור בין מערכות', 'fig/bico/gauge.svg'],
      ['ניטור שוטף והתראות על שינויים אצל לקוחות וספקים',        'fig/bico/bell.svg']
    ];
    var short = WANT - cards.length;
    if (short > 0) POOL.slice(-short).forEach(function (b) {
      var ic = document.createElement('img'); ic.src = b[1]; ic.alt = '';
      cards.push({text: b[0], ico: ic, invented: true});
    });
    
    while (cards.length < WANT) {
      cards.push({text: '[יתרון ' + (cards.length + 1) + ' — חסר תוכן]', ico: null, slot: true});
    }
    if (cards.length > WANT) cards.length = WANT;

    var eyebrow = (function () {
      var e = sec.querySelector('.eyebrow, .eb, .ns-eyebrow');
      var t = e ? (e.textContent || '').replace(/\s+/g, ' ').trim() : '';
      return t || 'יתרונות';
    })();

    var box = document.createElement('section');
    box.className = 'benefits n' + cards.length;
    box.setAttribute('data-sec', 'benefits');
    var dot = document.createElement('span'); dot.className = 'dotf'; dot.setAttribute('aria-hidden', 'true');
    var wrap = document.createElement('div'); wrap.className = 'wrap';
    var head = document.createElement('div'); head.className = 'bhead';
    head.innerHTML = '<div class="eb"><span></span><i></i></div><h2></h2>';
    head.querySelector('.eb span').textContent = eyebrow;
    head.querySelector('h2').innerHTML = h2.innerHTML;
    var grid = document.createElement('div'); grid.className = 'bgrid';
    var slots = 0;
    cards.forEach(function (c) {
      var card = document.createElement('div'); card.className = 'bcard' + (c.slot ? ' isslot' : '');
      var ic = document.createElement('span'); ic.className = 'bico'; ic.setAttribute('aria-hidden', 'true');
      if (c.ico) ic.appendChild(c.ico);
      var p = document.createElement('p'); p.textContent = c.text;
      if (c.slot) { p.className = 'slot'; slots++; }
      card.appendChild(ic); card.appendChild(p);
      grid.appendChild(card);
    });
    if (slots) {
      var note = document.createElement('p'); note.className = 'bnote';
      note.textContent = '⚠ ' + slots + ' יתרונות חסרים — סלוטים ריקים, לא תוכן שהומצא. הסקשן מוגדר ל-6 פריטים.';
      head.appendChild(note);
    }
    
    
    if (sec.getAttribute('data-benefits') !== 'light') {
      box.classList.add('dark');
      var panel = document.createElement('div'); panel.className = 'panel';
      var veil = document.createElement('span'); veil.className = 'veil'; veil.setAttribute('aria-hidden','true');
      var dots = document.createElement('span'); dots.className = 'dots'; dots.setAttribute('aria-hidden','true');
      var inner = document.createElement('div'); inner.className = 'in';
      inner.appendChild(head); inner.appendChild(grid);
      panel.appendChild(veil); panel.appendChild(dots); panel.appendChild(inner);
      wrap.appendChild(panel);
    } else {
      wrap.appendChild(head); wrap.appendChild(grid);
    }
    box.appendChild(dot); box.appendChild(wrap);
    sec.parentNode.replaceChild(box, sec);

    var wpx = box.getBoundingClientRect().width;
    if (wpx && wpx < 768) box.classList.add('m');
  }

  var target = [].slice.call(document.querySelectorAll('section')).filter(function (s) {
    var h = s.querySelector('h2');
    return h && /יתרונות/.test(h.textContent) && !s.classList.contains('benefits');
  })[0];
  if (target) build(target);
})();
