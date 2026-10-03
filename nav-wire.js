
(function () {
  var MAP = [
    
    [/^שיווק ומכירות$/, 'marketing.html'],
    [/^צמיחה עסקית$/, 'growth-a.html'],
    // family — the solution family, in its three layouts
    
    
    [/^ניהול סיכונים$|^ניהול סיכוני אשראי עסקי$|^משפחת פתרונות|^צמיחה עסקית$|^אשראי צרכני$|^ניהול דאטה ו-AI$|^פתרונות נוספים|^לעמוד משפחת הפתרונות$|^לכל הפתרונות$|^ניהול סיכוני צד שלישי$|^ניהול סיכוני צד שלישי$/, 'family-a1.html'],   
    // the single solution page
    
    [/^ניהול סיכונים פיננסיים|^לעמוד הפתרון|^תמונת מצב פיננסית|^סיכוני ספקים|^בקרה וטיוב רגולטיבי|^סיכוני ציות ורגולציה$|^בדיקות אשראי$|^ניטור ובקרת אשראי$|^מודולים מותאמים לבחינת אשראי|^פתרונות מותאמים לבחינת אשראי|^הזדמנויות עסקיות$|^Master Data$|^API$|^AI$/, 'solution.html'],
    // the product page
    [/^מערכת ניהול סיכונים|^לעמוד המוצר|^למידע נוסף$/, 'product.html'],
    // industries
    [/^פתרונות לפי תעשיות$|^תעשיות$|^לכל התעשיות|^סקטורים נוספים$/, 'lobby.html'],
    
    [/^ייבוא וייצוא$|^יבוא ויצוא$|^ייצור ותעשייה$|^בנייה, תשתיות ונדל|^טכנולוגיה ותוכנה$|^קמעונאות|^פיננסים, ביטוח|^תחבורה ולוגיסטיקה$|^אנרגיה, מים|^חקלאות$/, 'ind-b.html'],
    // the homepage
    [/^עמוד הבית$|^ראשי$/, 'index.html'],
  ];

  var OPTIONS = {
    
    
    family:   {label: 'עמוד משפחה', items: [
      ['family-a1.html', 'א׳ · סקשנים'],
      ['family-a3.html', 'א׳ · טאבים']]},
    industry: {label: 'עמוד תעשייה', items: [
      ['ind-a.html', 'א׳ · מוביל־מוצר'],
      ['ind-b.html', 'ב׳ · מוביל־משימה']]},
  };

  
  var NOPAGE = /^Finance Analytics$|^דוחות פיננסים$/;

  var here = location.pathname.split('/').pop() || 'index.html';

  
  
  (function phoneRoute () {
    if (/[?&]nom=1/.test(location.search)) return;
    if (/-m\.html$/.test(here)) return;                 
    
    var short = (window.screen && screen.width)
      ? Math.min(screen.width, screen.height) : innerWidth;
    if (short >= 768) return;

    var TWIN = {
      'family-a1.html':        'family-a1-m.html',
      'family-a3.html':        'family-a3-m.html',
      'family-b.html':         'family-b-m.html',
      'growth-a.html':  'growth-a-m.html',
      'growth-b.html':  'growth-b-m.html',
      'product.html':     'product-m.html',
      'solution.html':           'solution-m.html',
      'marketing.html':    'marketing-m.html'
    };
    var twin = TWIN[here];
    if (!twin) return;
    location.replace(twin + location.search + location.hash);
  })();


  
  
  function label(a) {
    
    var dn = a.getAttribute('data-navlabel');
    if (dn) return dn.replace(/\s+/g, ' ').trim();
    var h = a.querySelector('h2,h3,h4,.t,.lbl');
    if (h) return (h.textContent || '').replace(/\s+/g, ' ').trim();
    
    var leaf = null;
    var walk = document.createTreeWalker(a, NodeFilter.SHOW_ELEMENT, null, false), n;
    while ((n = walk.nextNode())) {
      if (n.children.length) continue;                 // not a leaf
      
      if (n.closest('[aria-hidden="true"]')) continue;
      var v = (n.textContent || '').replace(/\s+/g, ' ').trim();
      if (!v) continue;                                // icon / rule / spacer
      leaf = v; break;
    }
    var t = (a.textContent || '').replace(/\s+/g, ' ').trim();
    if (leaf && leaf.length <= 60) return leaf;
    
    if (t.length > 44) t = t.split(/[.,:·|]| {2,}/)[0].trim();
    return t;
  }
  
  var NAVBTN = /^למידע נוסף$|^לעמוד המוצר$|^לעמוד הפתרון$|^למוצר$/;
  function upgradeButtons(root) {
    [].forEach.call((root || document).querySelectorAll('button'), function (b) {
      var lbl = (b.textContent || '').replace(/\s+/g, ' ').trim();
      if (!NAVBTN.test(lbl)) return;
      if (b.closest && b.closest('a')) return;
      var a = document.createElement('a');
      a.className = b.className;
      a.setAttribute('href', '#');
      var blk = b.closest && b.closest('.ns-prod-block, .prod, .pcard, article');
      var nm = blk && blk.querySelector('h3, h2');
      var nt = nm ? (nm.textContent || '').replace(/\s+/g, ' ').trim() : '';
      if (nt) a.setAttribute('data-navlabel', nt);
      a.setAttribute('data-navbtn', '1');
      while (b.firstChild) a.appendChild(b.firstChild);
      if (b.parentNode) b.parentNode.replaceChild(a, b);
    });
  }
  function wire(root) {
  [].forEach.call((root || document).querySelectorAll('a'), function (a) {
    var href = a.getAttribute('href');
    if (href && href !== '#' && !/^#/.test(href)) return;   // already points somewhere
    
    if (a.getAttribute('aria-disabled') === 'true') return;
    var t = label(a);
    if (!t) return;
    if (NOPAGE.test(t)) {
      a.setAttribute('aria-disabled', 'true');
      a.setAttribute('title', 'לא נבנה בפרוטוטייפ הזה');
      return;
    }
    for (var i = 0; i < MAP.length; i++) {
      if (MAP[i][0].test(t)) {
        if (MAP[i][1] !== here) a.setAttribute('href', MAP[i][1]);
        return;
      }
    }
    
    if (a.getAttribute('data-navbtn')) {
      a.setAttribute('aria-disabled', 'true');
      a.setAttribute('title', 'לא נבנה בפרוטוטייפ הזה');
    }
  });
  }
  
  (function () {
    var img = document.querySelector('#header a img, #header img');
    var a = img && img.closest ? img.closest('a') : null;
    if (a && (!a.getAttribute('href') || a.getAttribute('href') === '#')) {
      if (here !== 'index.html') a.setAttribute('href', 'index.html');
      a.setAttribute('aria-label', 'D\u0026B — לעמוד הבית');
    }
  })();

  upgradeButtons(document);
  wire(document);
  
  new MutationObserver(function (recs) {
    recs.forEach(function (r) {
      [].forEach.call(r.addedNodes, function (n) {
        if (n.nodeType === 1) { upgradeButtons(n.querySelectorAll ? n : document);
                                wire(n.querySelectorAll ? n : document); }
      });
    });
  }).observe(document.documentElement, {childList: true, subtree: true});

  
  var set = null;
  Object.keys(OPTIONS).forEach(function (k) {
    if (OPTIONS[k].items.some(function (it) { return it[0] === here; })) set = OPTIONS[k];
  });
  if (!set) return;

  var css = document.createElement('style');
  css.textContent =
    '#navopt{position:fixed;inset-block-end:18px;inset-inline-start:50%;transform:translateX(50%);' +
    'z-index:9998;display:flex;align-items:center;gap:6px;padding:7px 9px;border-radius:999px;' +
    'background:rgba(7,22,32,.92);backdrop-filter:blur(8px);font:500 12.5px/1 Heebo,sans-serif;' +
    'box-shadow:0 8px 28px -12px rgba(7,22,32,.6);direction:rtl}' +
    '#navopt b{font-weight:500;color:#8b9aa5;padding:0 6px}' +
    '#navopt a{color:#dfe7ec;text-decoration:none;padding:7px 12px;border-radius:999px}' +
    '#navopt a:hover{background:rgba(255,255,255,.1)}' +
    '#navopt a.on{background:#80E7FF;color:#04202a}' +
    '@media print{#navopt{display:none}}';
  document.head.appendChild(css);

  var bar = document.createElement('nav');
  bar.id = 'navopt';
  bar.innerHTML = '<b>' + set.label + '</b>' + set.items.map(function (it) {
    return '<a href="' + it[0] + '"' + (it[0] === here ? ' class="on"' : '') + '>' + it[1] + '</a>';
  }).join('');
  document.body.appendChild(bar);


})();
