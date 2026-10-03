
(function () {
  
  var MULTI_EB = 'הפתרונות במשפחה';
  var MULTI_H2 = 'פתרונות לכל שלב בניהול סיכונים ואשראי עסקי';
  var ROT = 5200;            

  function txt(el) { return el ? (el.textContent || '').replace(/\s+/g, ' ').trim() : ''; }

  
  function leaves(el) {
    var out = [], w = document.createTreeWalker(el, NodeFilter.SHOW_ELEMENT, null, false), n;
    while ((n = w.nextNode())) {
      if (n.children.length) continue;
      
      if (n.closest('[aria-hidden="true"]')) continue;
      var v = txt(n);
      if (v) out.push({el: n, t: v});
    }
    return out;
  }

  function find() {
    return [].slice.call(document.querySelectorAll('section')).filter(function (s) {
      if (s.classList.contains('solsec')) return false;
      var h = s.querySelector('h2');
      return h && s.querySelectorAll('a.dnb-acc, a.dnb-card').length >= 2;
    })[0];
  }

  var src = find();
  if (!src) return;

  
  var h2 = src.querySelector('h2');
  var eyebrow = (function () {
    var best = '';
    [].forEach.call(src.querySelectorAll('span,b,i'), function (e) {
      if (best) return;
      var cs = getComputedStyle(e);
      if (cs.letterSpacing === '1px' && e.children.length === 0 && txt(e)) best = txt(e);
    });
    return best || 'הפתרון';
  })();

  var ps = [].slice.call(src.querySelectorAll('p')).filter(function (p) {
    return txt(p).length > 20 && !p.closest('a');
  });
  var lede = ps[0] ? txt(ps[0]) : '';
  var para = ps[1] ? txt(ps[1]) : '';
  var btn = src.querySelector('a.dnb-btn');

  var rows = [].slice.call(src.querySelectorAll('a.dnb-acc, a.dnb-card'));
  if (rows.length < 2) return;

  var prods = rows.map(function (a) {
    var ls = leaves(a);
    var name = ls.length ? ls[0].t : '';
    
    var desc = '';
    
    var pool = [].slice.call(a.children).filter(function (k) {
      return k.getAttribute('aria-hidden') !== 'true';
    });
    
    function pureWrapper(e) {
      if (e.children.length < 2) return false;
      for (var c = e.firstChild; c; c = c.nextSibling) {
        if (c.nodeType === 3 && c.nodeValue.trim()) return false;
      }
      return true;
    }
    var flat = [];
    pool.forEach(function (k) {
      if (pureWrapper(k)) {
        [].slice.call(k.children).forEach(function (c) {
          if (c.getAttribute('aria-hidden') !== 'true') flat.push(c);
        });
      } else flat.push(k);
    });
    pool = flat;
    if (pool.length) name = txt(pool[0]) || name;
    for (var ki = 1; ki < pool.length; ki++) {
      var t = txt(pool[ki]);
      if (!t || /^לעמוד/.test(t)) continue;
      if (t.length > desc.length) desc = t;
    }
    if (!desc) ls.slice(1).forEach(function (l) {
      if (/^לעמוד/.test(l.t)) return;
      if (l.t.length > desc.length) desc = l.t;
    });
    
    
    var art = a.querySelector('[aria-hidden="true"] [style*="position:relative; width:"]') ||
              a.querySelector('[style*="width:234px"]') ||
              a.querySelector('[aria-hidden="true"]');
    return {
      name: name, desc: desc,
      href: a.getAttribute('href') || '#',
      dis: a.getAttribute('aria-disabled') === 'true',
      title: a.getAttribute('title') || '',
      art: art ? art.cloneNode(true) : null
    };
  });


  
  var CONTENT = {
    'שיווק ומכירות': {
      desc: 'לדעת למי לפנות לפני שמרימים טלפון — פילוח, איתור ויצירת קשר עם לקוחות פוטנציאליים.',
      href: 'marketing.html',
      label: 'מוצרים לשיווק ומכירות',
      prods: [
        {name: 'ארגז כלים לשיווק ומכירות',
         desc: 'מאגר העסקים הישראלי ככלי עבודה: פילוח לפי ענף, גודל ואיתנות, ורשימות לקוחות פוטנציאליים שאפשר לפנות אליהן היום.'},
        {name: 'D&B Hoovers',
         desc: 'פלטפורמה גלובלית של כ-500 מיליון חברות ויותר מ-300 מיליון אנשי קשר, לאיתור שווקים ולקוחות מחוץ לישראל.'}
      ]
    },
    'הזדמנויות עסקיות': {
      desc: 'שהלקוחות והשותפים הנכונים ימצאו אתכם — נוכחות מאומתת מול קהילת העסקים בישראל.',
      label: 'מוצרים להזדמנויות עסקיות',
      prods: [
        {name: 'פרופיל עסקי מאומת',
         desc: 'הנוכחות שלכם במאגר: תחומי פעילות, ותק ואיתנות פיננסית, כפי שלקוחות וספקים רואים אותם.'},
        {name: 'התראות על הזדמנויות',
         desc: 'עדכון כשחברה מחפשת ספק, פותחת מכרז או נכנסת לתחום שמתאים לפרופיל שלכם.'},
        {name: 'חשיפה לקהילת העסקים',
         desc: 'נראות מול מקבלי החלטות שכבר מחפשים ספק או שותף בענף שלכם.'}
      ]
    },
  };
  
  var FAMILY = {
    growth: ['שיווק ומכירות', 'הזדמנויות עסקיות']
  };
  var FAMKEY = document.documentElement.getAttribute('data-family') || '';

  
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function eb(word) {
    return '<div class="eb"><i></i><span>' + word + '</span><i></i></div>';
  }


  function railFor(list, slot) {
    var rail = el('div', 'srail');
    rail.setAttribute('role', 'tablist');
    rail.setAttribute('aria-label', 'מוצרים בפתרון');
    list.forEach(function (p, i) {
      var box = el('div', 'prod' + (i === 0 ? ' on' : ''));
      box.setAttribute('role', 'tab');
      box.setAttribute('tabindex', i === 0 ? '0' : '-1');
      box.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      var row = el('div', 'ptop');
      var nm = el('p', 'pname' + (slot ? ' slot' : ''));
      nm.textContent = slot ? '[שם המוצר]' : p.name;
      var meta = el('div', 'pmeta');
      meta.appendChild(el('span', 'plbl', 'מוצרים בפתרון'));
      meta.appendChild(el('span', 'pnum', (i + 1) + '/' + list.length));
      var body = el('div', 'pbody');
      var d = el('p', 'pdesc' + (slot ? ' slot' : ''));
      d.textContent = slot ? '[תיאור המוצר]' : p.desc;
      body.appendChild(d);
      var go = el('a', 'pgo', '<i></i>');
      go.setAttribute('aria-label', 'לעמוד המוצר' + (p.name ? ' ' + p.name : ''));
      if (slot || p.dis) { go.setAttribute('aria-disabled', 'true'); go.removeAttribute('href'); }
      else { go.setAttribute('href', p.href); }
      if (p.title) go.setAttribute('title', p.title);
      body.appendChild(go);
      
      row.appendChild(nm); row.appendChild(meta);
      box.appendChild(row); box.appendChild(body);
      rail.appendChild(box);
    });
    return rail;
  }

  function artFor(list) {
    var art = el('div', 'sart');
    list.forEach(function (p, i) {
      var lay = el('div', 'lay' + (i === 0 ? ' on' : ''));
      var card = el('div', 'card');
      
      var art0 = p.art ? p.art.cloneNode(true) : null;
      if (art0) {
        
        var sc = el('span', 'scaler');
        art0.style.display = 'block';
        sc.appendChild(art0);
        card.appendChild(sc);
        
        var w = art0.offsetWidth || 234;
        
        sc.style.setProperty('--k', (405 / w).toFixed(4));
      }
      
      lay.appendChild(card);
      art.appendChild(lay);
    });
    return art;
  }

  
  function prodCard(pr, slot) {
    var c = el('a', 'spcard');
    
    var dest = (slot || pr.dis || !pr.href) ? null : pr.href;
    c.setAttribute('href', dest || '#');
    if (slot || pr.dis || !dest) {
      c.setAttribute('aria-disabled', 'true');
      c.setAttribute('title', slot ? 'סלוט ריק — אין פתרון שני/שלישי במשפחה הזו'
                                   : (pr.title || 'העמוד הזה עדיין לא נבנה'));
    }
    var t = el('div', 'spc-t');
    var h = el('h4', slot ? 'slot' : '');
    h.textContent = slot ? '[שם המוצר]' : pr.name;
    var d = el('p', slot ? 'slot' : '');
    d.textContent = slot ? '[תיאור המוצר]' : pr.desc;
    t.appendChild(h); t.appendChild(d);
    var go = el('span', 'spc-go', '<i></i>');
    c.appendChild(go); c.appendChild(t);
    return c;
  }

  function block(opts) {
    var sol = el('div', 'sol');
    var slot = !!opts.slot;
    
    var list = opts.prods && opts.prods.length ? opts.prods : prods;

    
    var panel = el('div', 'spanel');
    var art = artFor(prods);
    art.classList.add('spart');
    var copy = el('div', 'spcopy');
    copy.appendChild(el('span', 'eb2', 'פתרון · ' + list.length + ' מוצרים'));
    var h3 = el('h3', slot ? 'slot' : '');
    h3.textContent = slot ? opts.name : (opts.name || oneTitle);
    copy.appendChild(h3);
    var cp = el('p', slot ? 'slot' : '');
    cp.textContent = slot ? '[תיאור הפתרון - משפט אחד על מה שהוא נותן]'
                          : (opts.desc || para || lede);
    copy.appendChild(cp);
    
    var bw = el('div', 'sbtn');
    var cta = el('a', 'dnb-btn dnb-btn--dark',
      '<span class="dnb-btn__badge"><img src="fig/btn-arrow.svg" alt=""></span>' +
      '<span class="dnb-btn__label">לעמוד הפתרון</span>');
    if (slot) {
      cta.setAttribute('aria-disabled', 'true');
      cta.setAttribute('href', '#');
      cta.setAttribute('title', 'סלוט ריק — אין פתרון שני/שלישי במשפחה הזו');
    } else {
      
      if (opts.href) {
        cta.setAttribute('href', opts.href);
      } else if (!opts.name || opts.name === oneTitle) {
        cta.setAttribute('href', 'solution.html');   
      } else {
        cta.setAttribute('href', '#');
        cta.setAttribute('aria-disabled', 'true');
        cta.setAttribute('title', 'לא נבנה בפרוטוטייפ הזה');
      }
    }
    bw.appendChild(cta);
    copy.appendChild(bw);
    panel.appendChild(art); panel.appendChild(copy);

    
    var pw = el('div', 'sprods');
    
    pw.appendChild(el('span', 'splbl', opts.label || 'מוצרים לניהול סיכונים ואשראי עסקי'));
    var grid = el('div', 'spgrid');
    list.forEach(function (pr) { grid.appendChild(prodCard(pr, slot)); });
    pw.appendChild(grid);

    if (slot) sol.classList.add('slot-art');
    sol.appendChild(panel); sol.appendChild(pw);
    return sol;
  }

  
  var sec = el('section', 'solsec cards');
  sec.setAttribute('data-sec', 'solution');
  var wrap = el('div', 'swrap');
  var head = el('div', 'shead', eb(eyebrow) + '<h2></h2>');
  var oneTitle = txt(h2);
  head.querySelector('h2').textContent = oneTitle;

  
  var holder = el('div', 'sols');
  wrap.appendChild(head); wrap.appendChild(holder);
  sec.appendChild(wrap);
  src.parentNode.replaceChild(sec, src);

  var timers = [];
  function clearTimers() { timers.forEach(clearInterval); timers = []; }

  
  function wireArt(sol) {
    var art = sol.querySelector('.sart');
    if (!art) return;
    var lays = [].slice.call(art.children);
    lays.forEach(function (l, k) { l.classList.toggle('on', k === 0); });
  }

  function wire(sol) {
    var rail = sol.querySelector('.srail');
    var art = sol.querySelector('.sart');
    var tabs = [].slice.call(rail.children);
    var lays = [].slice.call(art.children);
    var i = 0, hold = false;

    function show(n) {
      i = (n + tabs.length) % tabs.length;
      tabs.forEach(function (t, k) {
        t.classList.toggle('on', k === i);
        t.setAttribute('aria-selected', k === i ? 'true' : 'false');
        t.setAttribute('tabindex', k === i ? '0' : '-1');
      });
      lays.forEach(function (l, k) { l.classList.toggle('on', k === i); });
    }
    tabs.forEach(function (t, k) {
      t.addEventListener('click', function (e) {
        if (e.target.closest('.pgo')) return;      
        show(k); hold = true;
      });
      t.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault();
          show(k + (e.key === 'ArrowDown' ? 1 : -1));
          tabs[i].focus(); hold = true;
        }
      });
    });
    sol.addEventListener('mouseenter', function () { hold = true; });
    sol.addEventListener('focusin', function () { hold = true; });

    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion:reduce)').matches;
    var phone = sec.classList.contains('m') || innerWidth < 768;
    if (!reduce && !phone) {
      timers.push(setInterval(function () {
        if (hold || document.hidden) return;
        if (!sec.getBoundingClientRect().height) return;
        show(i + 1);
      }, ROT));
    }
    show(0);
  }

  function render(n) {
    clearTimers();
    holder.innerHTML = '';
    sec.classList.toggle('multi', n > 1);
    
    var FAM_H2 = {growth: 'הפתרונות במשפחת צמיחה עסקית'};
    head.querySelector('h2').textContent = n > 1 ? (FAM_H2[FAMKEY] || MULTI_H2) : oneTitle;
    head.querySelector('.eb span').textContent = n > 1 ? MULTI_EB : eyebrow;

    
    
    var fam = FAMILY[FAMKEY] || [];
    var names = [];
    for (var k = 0; k < n; k++) {
      
      var nm = fam[k] || (k === 0 ? oneTitle : null), c = nm && CONTENT[nm];
      if (k === 0 && !c) { names.push(oneTitle); holder.appendChild(block({name: oneTitle})); continue; }
      if (c) {
        names.push(nm);
        holder.appendChild(block({name: nm, desc: c.desc, prods: c.prods,
                                  href: c.href, label: c.label}));
      } else {
        names.push('[שם הפתרון ' + (k + 1) + ']');
        holder.appendChild(block({name: '[שם הפתרון ' + (k + 1) + ']', slot: true}));
      }
    }
    [].forEach.call(holder.children, function (sol) { wireArt(sol); });

    
    var strip = sec.querySelector('.stabs');
    if (strip) strip.remove();
    if (n > 1) {
      strip = el('div', 'stabs');
      strip.setAttribute('role', 'tablist');
      strip.setAttribute('aria-label', 'הפתרונות במשפחה');
      names.forEach(function (nm, i) {
        var t = el('button', 'stab' + (i === 0 ? ' on' : '') +
                   (/^\[/.test(nm) ? ' slot' : ''));
        t.type = 'button';
        t.setAttribute('role', 'tab');
        t.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
        t.setAttribute('tabindex', i === 0 ? '0' : '-1');
        t.textContent = nm;
        strip.appendChild(t);
      });
      holder.parentNode.insertBefore(strip, holder);
      var tabs = [].slice.call(strip.children);
      var sols = [].slice.call(holder.children);
      function pick(i) {
        tabs.forEach(function (t, k) {
          t.classList.toggle('on', k === i);
          t.setAttribute('aria-selected', k === i ? 'true' : 'false');
          t.setAttribute('tabindex', k === i ? '0' : '-1');
        });
        sols.forEach(function (sl, k) { sl.classList.toggle('on', k === i); });
      }
      tabs.forEach(function (t, i) {
        t.addEventListener('click', function () { pick(i); });
        t.addEventListener('keydown', function (e) {
          
          var d = e.key === 'ArrowLeft' ? 1 : e.key === 'ArrowRight' ? -1 : 0;
          if (!d) return;
          e.preventDefault();
          var j = (i + d + tabs.length) % tabs.length;
          pick(j); tabs[j].focus();
        });
      });
      pick(0);
    } else {
      [].forEach.call(holder.children, function (sl) { sl.classList.add('on'); });
    }

  }

  var dec = document.documentElement.getAttribute('data-solutions') ||
            (document.body && document.body.getAttribute('data-solutions'));
  var q = (location.search.match(/[?&]sol=(\d)/) || [])[1];   
  
  var want = +(q || dec || 1) || 1;
  var have = (FAMILY[FAMKEY] || []).length || 1;
  render(Math.max(1, Math.min(want, Math.max(have, 1))));

  var w = sec.getBoundingClientRect().width;
  if (w && w < 768) sec.classList.add('m');
})();
