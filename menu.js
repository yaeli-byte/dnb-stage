
(function () {
  var hdr = document.getElementById('header');
  

  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const list = it => it.map(t => `<li><a href="#">${esc(t)}</a></li>`).join('');

  
  const FAM = [
    {name:'ניהול סיכוני אשראי עסקי', ico:'dot-alert-triangle', items:[
      'ניהול סיכונים פיננסיים']},
    {name:'אשראי צרכני', ico:'dot-gauge-marker', items:[
      'בדיקות אשראי','ניטור ובקרת אשראי','מודולים מותאמים לבחינת אשראי']},
    {name:'ניהול דאטה ו-AI', ico:'dot-harddrives', items:[
      'Master Data','API','AI']},
    {name:'צמיחה עסקית', ico:'dot-trending-down', items:[
      'שיווק ומכירות','הזדמנויות עסקיות']},
    {name:'ניהול סיכוני צד שלישי', ico:'dot-employees', items:[
      'סיכוני ספקים','סיכוני ציות ורגולציה']},
    {name:'פתרונות נוספים מבית D&B', ico:'dot-building', items:[
      'קפטן קרדיט','קפטן קרדיט לעסקים','duns 100',"Dun's Guide"]},
  ];

  const NAV = {
    
    ind:{label:'פתרונות לפי תעשיות', mode:'flat',
      feat:{img:'fig/ship-aerial.png', tint:false, h:'תשעה סקטורים',
        p:'לכל סקטור מודל סיכון, שפה ומדדים משלו — והפתרון מותאם אליו.', cta:'לכל התעשיות'},
      flat:[['ייבוא וייצוא','import-export'],
            ['ייצור ותעשיה','manufacturing'],
            ['בנייה, תשתיות ונדל״ן','construction'],
            ['טכנולוגיה ותוכנה','technology'],
            ['קמעונאות ומוצרי צריכה','retail'],
            ['פיננסים, ביטוח ואשראי','finance'],
            ['תחבורה ולוגיסטיקה','logistics'],
            ['אנרגיה, מים וסביבה','energy'],
            ['חקלאות','agriculture']]},
    
    why:{label:'למה D&B?', mode:'even',
      feat:{img:'fig/sol-map.svg', tint:true, h:'מאחורי הדאטה שלנו',
        p:'המאגר העסקי הגדול בישראל, ורשת גלובלית של מעל 500 מיליון עסקים.',
        cta:'קראו עוד'},
      flat:['הסיפור שלנו','מאחורי הדאטה שלנו','לשכת אשראי','הצטרפו אלינו','שותפים לדרך']},
    hub:{label:'מרכז המידע', duo:[
      {h:'לקוחות מספרים', p:'איך ארגונים בישראל משתמשים בדאטה שלנו ביום-יום.',
       img:'fig/blog-photo.png', cta:'לכל הסיפורים'},
      {h:'הבלוג שלנו', p:'מאמרים, סקירות ותמונות מצב על הכלכלה הישראלית.',
       img:'fig/ship-aerial.png', cta:'לכל המאמרים'}]},
  };

  const M1 = `
  <div class="scrim"></div>
  <div class="menu" id="m1">
    <div class="in">
      <div class="feat">
        <div class="art"><img src="fig/sol-map.svg" alt=""></div>
        <h3>לורם איפסום דולור</h3>
        <p>לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית סחטיר בלוקריה
           שמחויט - שלושה שלושה מייבן קולורס.</p>
        <a class="more" href="#">לכל הפתרונות <img src="fig/btn-arrow.svg" alt=""></a>
      </div>
      <div class="cols">
        ${FAM.map(f=>`<div class="mcol"><h4><a href="#">${esc(f.name)}</a></h4><ul>${list(f.items)}</ul></div>`).join('')}
      </div>
    </div>
  </div>`;

  const navMenu = k => {
    const n = NAV[k];
    if (n.duo) return `
      <div class="scrim"></div>
      <div class="menu" id="mN"><div class="duo">${n.duo.map(d=>`
        <a href="#"><span class="pic"><img src="${d.img}" alt=""></span>
          <span class="txt"><h4>${esc(d.h)}</h4><p>${esc(d.p)}</p>
            <span class="go">${esc(d.cta)} <i class="arw"></i></span></span></a>`).join('')}</div></div>`;
    const body = n.mode === 'flat'
      ? `<div class="flat">${n.flat.map(([t,ico])=>`<a href="#">
           <span class="sq"><i style="-webkit-mask-image:url(fig/ind/${ico}.svg);mask-image:url(fig/ind/${ico}.svg)"></i></span>
           ${esc(t)}</a>`).join('')}</div>`
      : `<div class="even">${n.flat.map(t=>`<a href="#">${esc(t)}</a>`).join('')}</div>`;
    return `
      <div class="scrim"></div>
      <div class="menu" id="mN"><div class="in">
        <div class="feat${n.mode==='even'?' wide':''}">
          <div class="art${n.feat.tint?' tint':''}"><img src="${n.feat.img}" alt=""></div>
          ${n.mode==='even' ? '<div class="fx">' : ''}
          <h3>${esc(n.feat.h)}</h3><p>${esc(n.feat.p)}</p>
          <a class="more" href="#">${esc(n.feat.cta)} <i class="arw"></i></a>
          ${n.mode==='even' ? '</div>' : ''}
        </div>
        ${body}
      </div></div>`;
  };

  
  
  const LIFTED = (window.DNB_MENU_PANELS || {});
  const PANEL = {
    'מעטפת הפתרונות':   () => LIFTED.sol || M1,
    'פתרונות לפי תעשיות': () => LIFTED.ind || navMenu('ind'),
    'למה D&B?':          () => LIFTED.why || navMenu('why'),
    'מרכז המידע':        () => LIFTED.hub || navMenu('hub'),
  };

  
  if (window.DNB_MENU_PANEL_CSS && !document.getElementById('dnb-menu-panel-css')) {
    var ps = document.createElement('style');
    ps.id = 'dnb-menu-panel-css';
    ps.textContent = window.DNB_MENU_PANEL_CSS;
    document.head.appendChild(ps);
  }

  var wrap = document.createElement('div');
  wrap.className = 'menuw';
  if (hdr) hdr.appendChild(wrap);       

  var openKey = null, openTrigger = null;

  
  var ROUTE = (function () {
    var m = {};
    FAM.forEach(function (f) {
      
      m[f.name] = 'family-a1.html';
      f.items.forEach(function (t) { m[t] = 'solution.html'; });
    });
    (NAV.ind.flat || []).forEach(function (row) {
      m[Array.isArray(row) ? row[0] : row] = 'ind-a.html';
    });
    m['לכל התעשיות'] = 'lobby.html';
    m['לכל הפתרונות'] = 'family-a1.html';
    return m;
  })();

  function route(root) {
    [].forEach.call(root.querySelectorAll('a'), function (a) {
      var h = a.getAttribute('href');
      if (h && h !== '#') return;
      var t = (a.textContent || '').replace(/\s+/g, ' ').trim();
      if (ROUTE[t]) { a.setAttribute('href', ROUTE[t]); return; }
      
      a.setAttribute('title', 'העמוד הזה עדיין לא נבנה');
    });
  }

  function label(a) {
    return (a.textContent || '').replace(/\s+/g, ' ').trim();
  }
  

  
  var BLOCK_SEL = '.feat, .cols > *, .flat > *, .even > *, .duo > *';

  
  function stagger(root) {
    var blks = [].slice.call(root.querySelectorAll(BLOCK_SEL)).filter(function (b) {
      return b.getBoundingClientRect().width > 1;
    });
    var step = blks.length > 6 ? 18 : 28;
    
    blks.forEach(function (b, i) {
      b.classList.add('mblk');
      b.style.setProperty('--blk-d', (60 + Math.min(i, 8) * step) + 'ms');
    });
    return blks.length;
  }

  
  function dirBetween(prev, next) {
    if (!prev || !next) return -1;
    return next.getBoundingClientRect().left < prev.getBoundingClientRect().left ? -1 : 1;
  }

  function clearTriggers() {
    [].forEach.call(hdr.querySelectorAll('.mainnav a'), function (a) {
      a.classList.remove('open'); a.setAttribute('aria-expanded', 'false');
    });
  }

  function close() {
    if (!openKey) return null;
    var root = document.documentElement;
    var trigger = hdr.querySelector('.mainnav a.open');
    root.classList.add('menu-closing');
    root.classList.remove('menu-open');
    clearTriggers();
    var sc = document.querySelector('.menu-scrim');
    openKey = null; openTrigger = null;
    
    setTimeout(function () {
      if (root.classList.contains('menu-open')) return;      
      wrap.innerHTML = '';
      if (sc && sc.parentNode) sc.parentNode.removeChild(sc);
      root.classList.remove('menu-closing');
    }, 200);
    return trigger;
  }

  
  function wrapPane(panel) {
    if (!panel || panel.querySelector('.mbody')) return;
    var inner = document.createElement('div'); inner.className = 'mbody';
    var pane  = document.createElement('div'); pane.className  = 'mpane';
    var kids = [].slice.call(panel.children);
    kids.forEach(function (c) {
      if (c.classList && c.classList.contains('scrim')) { panel.removeChild(c); return; }
      pane.appendChild(c);
    });
    inner.appendChild(pane); panel.appendChild(inner);
  }

  function wireLinks(root) {
    [].forEach.call(root.querySelectorAll('a'), function (a) {
      a.addEventListener('click', function () { close(); });
    });
  }

  
  
  var FAM_ALIAS = {
    'ניהול סיכונים':            0,
    'ניהול סיכוני אשראי עסקי':  0,
    'אשראי צרכני':              1,
    'ניהול דאטה ו-AI':          2,
    'צמיחה עסקית':              3,
    'סיכוני צד ג':              4,   
    'ניהול סיכוני צד שלישי':    4,   
    'פתרונות נוספים מבית D&B':  5
  };
  function orderFamilies(root) {
    var marks = [].slice.call(root.querySelectorAll('.mm-fam'));
    if (marks.length < 2) return;

    
    var boxes = marks.map(function (m) { return m.parentNode; });
    var grid = boxes[0].parentNode;

    
    var SLOT = [0, 1, 2, 5, 3, 4];
    var want = SLOT.map(function (n) { return FAM[n].name; });
    
    function norm(t) { return (t || '').replace(/[׳'"״]/g, '').replace(/\s+/g, ' ').trim(); }
    function famIndex(t) {
      var k = norm(t);
      if (FAM_ALIAS.hasOwnProperty(k)) return FAM_ALIAS[k];
      for (var i = 0; i < FAM.length; i++) if (norm(FAM[i].name) === k) return i;
      if (window.console) console.warn('[menu] unmapped family name:', k);
      return -1;
    }
    function rank(t) {
      var fi = famIndex(t);
      var at = SLOT.indexOf(fi);
      return at < 0 ? 99 : at;
    }

    var olds = [];
    boxes.forEach(function (b) { if (olds.indexOf(b.parentNode) < 0) olds.push(b.parentNode); });

    boxes.slice().sort(function (p, q) {
      return rank(p.querySelector('.mm-fam').textContent) -
             rank(q.querySelector('.mm-fam').textContent);
    }).forEach(function (b) { grid.appendChild(b); });

    grid.style.direction = 'rtl';                 
    grid.style.display = 'grid';

    
    var feat = null;
    [].forEach.call(grid.children, function (c) {
      var fam = c.querySelector('.mm-fam');
      
      if (!fam || /פתרונות נוספים/.test(fam.textContent || '')) feat = c;
    });
    if (feat) {
      grid.appendChild(feat);                     
      
      feat.style.gridRow = '1 / -1';
      feat.style.gridColumn = '6';
      feat.style.alignSelf = 'stretch';
      feat.style.width = 'auto';
      feat.style.marginBlock = '0';
    }
    grid.style.gridTemplateColumns =
      'repeat(5, minmax(0, 1fr))' + (feat ? ' 288px' : '');
    grid.style.alignItems = 'start';
    grid.style.columnGap = '28px';
    grid.style.rowGap = '28px';

    
    olds.forEach(function (o) {
      if (o !== grid && o.parentNode && !o.querySelector('.mm-fam') &&
          !(o.textContent || '').trim()) o.parentNode.removeChild(o);
    });
  }

  
  function reconcileFamilies(root) {
    var marks = [].slice.call(root.querySelectorAll('.mm-fam'));
    if (!marks.length) return;

    function norm(t) { return (t || '').replace(/[׳'"״]/g, '').replace(/\s+/g, ' ').trim(); }
    function leaves(el) {
      var out = [], w = document.createTreeWalker(el, NodeFilter.SHOW_ELEMENT, null, false), n;
      while ((n = w.nextNode())) {
        if (n.children.length) continue;
        if ((n.textContent || '').trim()) out.push(n);
      }
      return out;
    }
    function famFor(markText) {
      var k = norm(markText);
      if (FAM_ALIAS.hasOwnProperty(k)) return FAM[FAM_ALIAS[k]];
      for (var i = 0; i < FAM.length; i++) if (norm(FAM[i].name) === k) return FAM[i];
      if (window.console) console.warn('[menu] unmapped family name:', k);
      return null;
    }

    marks.forEach(function (mark) {
      var fam = famFor(mark.textContent);
      if (!fam) return;
      var box = mark.parentNode;
      var rows = [].slice.call(box.querySelectorAll('.mm-i'));
      if (!rows.length) return;
      var list = rows[0].parentNode;
      var want = fam.items.slice();

      
      function nameOf(r) {
        var ls = leaves(r);
        for (var i = 0; i < ls.length; i++) {
          var v = norm(ls[i].textContent);
          if (v.length > 1) return v;
        }
        return '';
      }

      var kept = [], taken = [];
      rows.forEach(function (r) {
        var nm = nameOf(r);
        var hit = -1;
        for (var i = 0; i < want.length; i++) {
          if (taken.indexOf(i) >= 0) continue;          
          if (norm(want[i]) === nm) { hit = i; break; }
        }
        if (hit < 0) {
          
          for (var j = 0; j < want.length; j++) {
            if (taken.indexOf(j) >= 0) continue;
            if (norm(want[j]).indexOf(nm) === 0 || nm.indexOf(norm(want[j])) === 0) { hit = j; break; }
          }
        }
        if (hit < 0) { r.parentNode.removeChild(r); return; }
        taken.push(hit);
        r.setAttribute('data-fam-i', hit);
        kept.push({ i: hit, el: r });
      });

      
      var have = kept.map(function (k) { return k.i; });
      var donor = kept.length ? kept[0].el : rows[0];
      want.forEach(function (name, i) {
        if (have.indexOf(i) >= 0) return;
        var c = donor.cloneNode(true);
        var ls = leaves(c).filter(function (n) { return norm(n.textContent).length > 1; });
        if (ls[0]) { ls[0].textContent = name; ls[0].classList.remove('slot'); }
        if (ls[1]) { ls[1].textContent = '[תיאור הפתרון]'; ls[1].classList.add('mm-slot'); }
        else if (ls[0] && ls[0].parentNode) {
          
          var d = document.createElement('span');
          d.className = 'mm-slot';
          d.style.cssText = 'display:block;font-size:13px;line-height:18px';
          d.textContent = '[תיאור הפתרון]';
          ls[0].parentNode.appendChild(d);
        }
        for (var k = 2; k < ls.length; k++) ls[k].textContent = '';
        c.setAttribute('data-fam-i', i);
        c.setAttribute('title', 'העמוד הזה עדיין לא נבנה');
        list.appendChild(c);
        kept.push({ i: i, el: c });
      });

      kept.sort(function (a, b) { return a.i - b.i; })
          .forEach(function (k) { list.appendChild(k.el); });

      
      if (norm(mark.textContent) !== norm(fam.name)) {
        var sp = mark.querySelector('span') || mark;
        sp.textContent = fam.name;
      }
    });
  }

  
  var PRODUCT_LOGO = [
    [/קפטן\s*קרדיט/,        'fig/products/captain-credit.png'],
    [/duns\s*100/i,          'fig/products/duns-100.png'],
    [/dun.?s\s*guide/i,      'fig/products/duns-guide.png']
  ];
  function productLogos(root) {
    [].forEach.call(root.querySelectorAll('.mm-i'), function (row) {
      var leafs = [].slice.call(row.querySelectorAll('*')).filter(function (n) {
        return !n.children.length && (n.textContent || '').trim();
      });
      var name = leafs.length ? leafs[0].textContent.trim() : '';
      var src = null;
      for (var i = 0; i < PRODUCT_LOGO.length; i++) {
        if (PRODUCT_LOGO[i][0].test(name)) { src = PRODUCT_LOGO[i][1]; break; }
      }
      if (!src) return;
      var tile = row.querySelector('span[aria-hidden="true"]');
      if (!tile) return;
      
      tile.innerHTML = '';
      tile.style.width = '84px';
      tile.style.flex = '0 0 auto';
      tile.style.background = '#fff';
      tile.style.boxShadow = 'inset 0 0 0 .957px rgba(33,33,33,.1)';
      tile.style.padding = '7px 9px';
      tile.style.boxSizing = 'border-box';
      var img = document.createElement('img');
      img.src = src; img.alt = '';
      img.style.cssText = 'max-width:100%;max-height:100%;width:auto;height:auto;' +
                          'object-fit:contain;display:block;margin:auto';
      tile.appendChild(img);
    });
  }


  
  function markCurrent(root) {
    var HILITE = /rgb\(243,\s*245,\s*247\)|#F3F5F7/i;
    var TEAL = /#0083A1/i;
    var here = (location.pathname.split('/').pop() || 'index.html');
    [].forEach.call(root.querySelectorAll('a.mm-i'), function (a) {
      var st = a.getAttribute('style') || '';
      var isMarked = HILITE.test(st);
      var href = a.getAttribute('href') || '';
      var isHere = href && href !== '#' && href.split('/').pop() === here;
      if (isMarked && !isHere) {
        a.setAttribute('style', st.replace(/background-color\s*:\s*#F3F5F7\s*;?/ig, ''));
        var t = a.querySelector('.mm-t');
        if (t) {
          var ts = t.getAttribute('style') || '';
          t.setAttribute('style', ts.replace(/color\s*:\s*#0083A1/ig, 'color:#26333D'));
        }
        [].forEach.call(a.querySelectorAll('[stroke="#0083A1"]'), function (n) {
          n.setAttribute('stroke', '#26333D');
        });
      }
      
      var tile = a.children[0];
      if (tile && !isHere) {
        var tst = tile.getAttribute('style') || '';
        if (/background-color\s*:\s*#FFFFFF/i.test(tst)) {
          tile.setAttribute('style',
            tst.replace(/background-color\s*:\s*#FFFFFF/ig, 'background-color:#F3F5F7'));
        }
      }
    });
  }


  
  function tagPanel(root) {
    var panel = root.querySelector('.menu');
    if (!panel) {
      panel = root.firstElementChild;
      if (panel) panel.classList.add('menu');
    }
    if (!panel) return;
    
    if (!panel.querySelector('.cols, .flat, .even, .duo, .feat')) {
      var grid = panel.querySelector('[style*="grid-template-columns"]');
      if (grid) grid.classList.add('cols');
    }
  }

  function open(key, trigger) {
    wrap.innerHTML = PANEL[key]();
    tagPanel(wrap);
    var panel = wrap.querySelector('.menu');
    if (key === 'מעטפת הפתרונות') { orderFamilies(wrap); reconcileFamilies(wrap); productLogos(wrap); }
    markCurrent(wrap);
    wrapPane(panel);
    route(wrap);
    wireLinks(wrap);

    var root = document.documentElement;
    root.classList.remove('menu-closing');
    trigger.classList.add('open');
    trigger.setAttribute('aria-expanded', 'true');
    openKey = key; openTrigger = trigger;

    
    if (panel) stagger(panel);
    if (panel) panel.getBoundingClientRect();
    
    (function () {
      var r = hdr.getBoundingClientRect();
      var gap = parseFloat(getComputedStyle(root).getPropertyValue('--menu-gap')) ||
                parseFloat(getComputedStyle(hdr).getPropertyValue('--menu-gap')) || 16;
      root.style.setProperty('--menu-top', Math.max(0, r.bottom) + gap + 'px');
    })();
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { root.classList.add('menu-open'); });
    });

    if (!document.querySelector('.menu-scrim')) {
      var sc = document.createElement('div');
      sc.className = 'menu-scrim';
      sc.addEventListener('click', close);
      document.body.appendChild(sc);
    }
  }

  
  function swap(key, trigger) {
    var panel = wrap.querySelector('.menu');
    var body  = panel && panel.querySelector('.mbody');
    var oldPane = body && body.querySelector('.mpane');
    if (!panel || !body || !oldPane) { open(key, trigger); return; }

    var dir = dirBetween(openTrigger, trigger);
    var h0  = body.getBoundingClientRect().height;

    clearTriggers();
    trigger.classList.add('open');
    trigger.setAttribute('aria-expanded', 'true');

    oldPane.classList.add('out');
    oldPane.style.setProperty('--out-x', (dir === -1 ? 16 : -16) + 'px');

    var tmp = document.createElement('div');
    tmp.innerHTML = PANEL[key]();
    var src = tmp.querySelector('.menu') || tmp;
    var newPane = document.createElement('div');
    newPane.className = 'mpane in';
    newPane.style.setProperty('--in-x', (dir === -1 ? -16 : 16) + 'px');
    [].slice.call(src.children).forEach(function (c) {
      if (!c.classList || !c.classList.contains('scrim')) newPane.appendChild(c);
    });
    body.appendChild(newPane);

    
    oldPane.style.position = 'absolute';
    var h1 = body.getBoundingClientRect().height;
    body.style.height = h0 + 'px';
    panel.classList.add('switching');

    requestAnimationFrame(function () {
      oldPane.classList.add('go');
      body.style.height = h1 + 'px';
      requestAnimationFrame(function () { newPane.classList.add('go'); });
    });

    setTimeout(function () {
      if (oldPane.parentNode) oldPane.parentNode.removeChild(oldPane);
      body.style.height = '';
      panel.classList.remove('switching');
      newPane.classList.remove('in', 'go');
      route(wrap);
      wireLinks(newPane);
    }, 320);

    openKey = key; openTrigger = trigger;
  }

  
  mobileMenu();

  
  if (!hdr) return;

  [].forEach.call(hdr.querySelectorAll('.mainnav a'), function (a) {
    var key = label(a);
    if (!PANEL[key]) return;                 
    a.setAttribute('role', 'button');
    a.setAttribute('aria-expanded', 'false');
    
    if (!a.querySelector('.mdot')) {
      var d = document.createElement('span');
      d.className = 'mdot'; d.setAttribute('aria-hidden', 'true');
      a.appendChild(d);
    }
    a.addEventListener('click', function (e) {
      e.preventDefault();
      if (openKey === key) close();
      else if (openKey) swap(key, a);        
      else open(key, a);
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && openKey) {
      var t = hdr.querySelector('.mainnav a.open');
      close(); if (t) t.focus();
    }
  });
  
  document.addEventListener('click', function (e) {
    if (openKey && !hdr.contains(e.target)) close();
  });

  
  var WANT = {sol:'מעטפת הפתרונות', ind:'פתרונות לפי תעשיות',
              why:'למה D&B?',      hub:'מרכז המידע'};
  var pre = (location.search.match(/[?&]menu=([a-z]+)/) || [])[1];
  if (pre && WANT[pre]) {
    var t = [].slice.call(hdr.querySelectorAll('.mainnav a')).filter(function (a) {
      return (a.textContent || '').indexOf(WANT[pre]) >= 0;
    })[0];
    if (t) open(WANT[pre], t);
  }

  
  function mobileMenu () {
    var html = document.documentElement;
    if (document.querySelector('.msheet')) return;            

    
    var SCREENS = [
      {key:'sol',  label:'מעטפת הפתרונות'},
      {key:'ind',  label:'פתרונות לפי תעשיות'},
      {key:'why',  label:'למה D&B?'},
      {key:'hub',  label:'מרכז המידע'},
      {key:'duns', label:'מספר D-U-N-S', leaf:true}
    ];

    function el (tag, cls, html) {
      var e = document.createElement(tag);
      if (cls) e.className = cls;
      if (html != null) e.innerHTML = html;
      return e;
    }
    function row (text, hasChild) {
      var a = el(hasChild ? 'button' : 'a', 'mrow-i');
      if (hasChild) a.type = 'button'; else a.href = '#';
      a.innerHTML = '<span>' + text + '</span>' +
        (hasChild ? '<i class="mchev" aria-hidden="true"></i>' : '');
      return a;
    }

    
    function childrenOf (key) {
      var out = [];
      if (key === 'sol') {
        FAM.forEach(function (f) {
          out.push({group: f.name});
          (f.items || []).forEach(function (t) { out.push({link: t}); });
        });
      } else if (key === 'ind') {
        (NAV.ind.flat || []).forEach(function (p) { out.push({link: p[0]}); });
      } else if (key === 'why') {
        (NAV.why.flat || []).forEach(function (t) { out.push({link: t}); });
      } else if (key === 'hub') {
        (NAV.hub.duo || []).forEach(function (d) { out.push({link: d.h}); });
      }
      return out;
    }

    
    var sheet = el('div', 'msheet');
    sheet.setAttribute('role', 'dialog');
    sheet.setAttribute('aria-label', 'תפריט');
    var s1 = el('div', 'mscreen s1');
    var s2 = el('div', 'mscreen s2');
    sheet.appendChild(s1); sheet.appendChild(s2);

    SCREENS.forEach(function (sc, i) {
      var r = row(sc.label, !sc.leaf);
      r.style.setProperty('--row-d', (i * 30) + 'ms');
      if (!sc.leaf) r.addEventListener('click', function () { push(sc); });
      s1.appendChild(r);
    });

    function push (sc) {
      s2.innerHTML = '';
      var back = el('button', 'mback-row', '<i class="mchev back" aria-hidden="true"></i><span>' + sc.label + '</span>');
      back.type = 'button';
      back.addEventListener('click', pop);
      s2.appendChild(back);
      childrenOf(sc.key).forEach(function (it, i) {
        var n = it.group ? el('p', 'mgroup', it.group) : row(it.link, false);
        n.style.setProperty('--row-d', (i * 24) + 'ms');
        if (!it.group) n.classList.add('mrow-i');
        s2.appendChild(n);
      });
      
      sheet.classList.remove('popping');
      sheet.classList.add('pushed');
      html.classList.add('msheet-pushed');
    }
    function pop () {
      sheet.classList.add('popping');
      sheet.classList.remove('pushed');
      html.classList.remove('msheet-pushed');
      setTimeout(function () { sheet.classList.remove('popping'); }, 320);
    }
    function openSheet () {
      html.classList.add('msheet-open');
      burgers().forEach(function (b) { b.setAttribute('aria-expanded', 'true'); });
    }
    function closeSheet () {
      html.classList.remove('msheet-open', 'msheet-pushed');
      sheet.classList.remove('pushed', 'popping');
      burgers().forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    }
    function burgers () {
      
      var sel = '.burger, .mburger, button[aria-label="תפריט"], button[aria-label="פתיחת תפריט"]';
      return [].slice.call(document.querySelectorAll(sel));
    }

    document.body.appendChild(sheet);

    burgers().forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault();
        if (html.classList.contains('msheet-open')) closeSheet(); else openSheet();
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && html.classList.contains('msheet-open')) closeSheet();
    });
    
    sheet.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a.mrow-i');
      if (a && a.getAttribute('href') && a.getAttribute('href') !== '#') closeSheet();
    });
  }

})();
