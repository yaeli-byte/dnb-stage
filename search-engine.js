
(function () {
  if (window.DNBSearch) return;

  var TYPES = { sol: 'פתרונות', ind: 'תעשיות', post: 'מאמרים', page: 'עמודים' };
  var INDEX = [
    { type: 'sol',  t: 'ניהול סיכוני אשראי עסקי', u: 'family-a1.html', d: 'כל הכלים להערכת לקוחות וספקים, קביעת מסגרות אשראי וניטור שוטף של התיק.', k: 'סיכונים אשראי עסקי לקוחות ספקים מסגרת' },
    { type: 'sol',  t: 'ניהול סיכונים פיננסיים', u: 'solution.html', d: 'תמונה מלאה ועדכנית של מצב העסקים שאתם עובדים איתם, בזמן אמת.', k: 'סיכונים פיננסי דוח ניטור' },
    { type: 'sol',  t: 'צמיחה עסקית', u: 'growth-a.html', d: 'דאטה עסקי שמזהה לקוחות חדשים, שווקים והזדמנויות לצמיחה.', k: 'צמיחה מכירות לקוחות חדשים' },
    { type: 'sol',  t: 'שיווק ומכירות', u: 'marketing.html', d: 'פילוח, העשרת לידים ומיקוד קמפיינים על בסיס מאגר המידע העסקי.', k: 'שיווק מכירות לידים פילוח' },
    { type: 'sol',  t: 'Finance Analytics', u: 'product.html', d: 'מערכת לניהול סיכוני אשראי: דירוגים, התראות ודוחות במקום אחד.', k: 'מוצר מערכת דירוג התראות אשראי' },
    { type: 'sol',  t: 'אשראי צרכני', u: 'family-a1.html', d: 'בדיקות אשראי, ניטור ובקרה ומודולים מותאמים לבחינת אשראי צרכני.', k: 'צרכני בדיקות אשראי ניטור' },
    { type: 'sol',  t: 'ניהול דאטה ו-AI', u: 'family-a1.html', d: 'Master Data, API ו-AI: הדאטה של D&B בתוך המערכות שלכם.', k: 'דאטה api ai בינה מלאכותית master' },
    { type: 'ind',  t: 'ייבוא וייצוא', u: 'ind-a.html', d: 'בדיקת שותפים בחו״ל, ניטור ספקים וניהול סיכוני סחר בינלאומי.', k: 'יבוא יצוא סחר ספקים חו״ל' },
    { type: 'ind',  t: 'פתרונות לפי תעשיות', u: 'lobby.html', d: 'תשע תעשיות מרכזיות: ייצור, בנייה, טכנולוגיה, קמעונאות, פיננסים ועוד.', k: 'תעשיות ייצור בנייה טכנולוגיה קמעונאות פיננסים תחבורה אנרגיה חקלאות' },
    { type: 'ind',  t: 'פיננסים, ביטוח ואשראי', u: 'lobby.html', d: 'מידע עסקי מהימן לחיתום, לניהול תיק ולעמידה ברגולציה.', k: 'פיננסים ביטוח אשראי בנקים' },
    { type: 'post', t: 'איך לקרוא דוח אשראי עסקי', u: 'blog-article.html', d: 'שלושה מדדים שכדאי לקרוא קודם, הסימנים שמצדיקים עצירה, ואיך הופכים את הדוח להחלטה.', k: 'דוח אשראי מדריך מדדים' },
    { type: 'post', t: 'דאטה כמנוע צמיחה', u: 'blog-article.html', d: 'איך חברות משתמשות במידע עסקי כדי למצוא לקוחות חדשים ולהיכנס לשווקים חדשים.', k: 'דאטה צמיחה לקוחות' },
    { type: 'post', t: 'AI בהערכת אשראי', u: 'blog-article.html', d: 'מה מודלים של בינה מלאכותית יודעים לזהות בדוח אשראי, ואיפה עדיין צריך שיקול דעת אנושי.', k: 'ai בינה מלאכותית אשראי' },
    { type: 'post', t: '5 סימני אזהרה בלקוח חדש', u: 'blog-article.html', d: 'חמישה סימנים בדוח האשראי שמעידים שלקוח חדש עלול להתקשות לשלם.', k: 'אזהרה לקוח חדש אשראי סיכון' },
    { type: 'post', t: 'רגולציית אשראי 2026: מה השתנה', u: 'blog-article.html', d: 'מה השתנה השנה בחוק נתוני אשראי ומה צריך לעדכן בתהליך.', k: 'רגולציה חוק נתוני אשראי' },
    { type: 'post', t: 'ניהול סיכוני ספקים', u: 'blog-article.html', d: 'איך עוקבים אחרי עשרות ספקים במקביל ומקבלים התראה ברגע שמשהו משתנה.', k: 'ספקים ניטור סיכונים התראה' },
    { type: 'page', t: 'מספר D-U-N-S', u: 'duns.html', d: 'המזהה הבינלאומי של העסק שלכם: מה זה, למה זה חשוב ואיך מקבלים.', k: 'duns דאנס מספר מזהה' },
    { type: 'page', t: 'אודות D&B ישראל', u: 'about.html', d: 'מאז 1961 אנחנו מלווים עסקים, מנהלים ומקבלי החלטות במשק הישראלי.', k: 'אודות הסיפור שלנו חברה' },
    { type: 'page', t: 'קריירה', u: 'careers.html', d: 'משרות פתוחות, תרבות העבודה שלנו והמקום הבא שלך.', k: 'קריירה משרות דרושים עבודה' },
    { type: 'page', t: 'הבלוג של D&B', u: 'blog-lobby.html', d: 'מאמרים, תמונות מצב וסקירות על הכלכלה הישראלית.', k: 'בלוג מאמרים מרכז המידע' }
  ];
  var POPULAR = ['דוח אשראי', 'מספר D-U-N-S', 'ניטור ספקים', 'ייבוא וייצוא', 'AI'];

  function norm(s) { return (s || '').toLowerCase().replace(/[״"׳'\-]/g, '').replace(/\s+/g, ' ').trim(); }
  function query(q) {
    var n = norm(q); if (!n) return [];
    var words = n.split(' ');
    return INDEX.map(function (r) {
      var title = norm(r.t), body = norm(r.d + ' ' + r.k), score = 0;
      words.forEach(function (w) {
        if (title.indexOf(w) === 0) score += 6;
        else if (title.indexOf(w) > -1) score += 4;
        if (body.indexOf(w) > -1) score += 1;
      });
      var all = words.every(function (w) { return title.indexOf(w) > -1 || body.indexOf(w) > -1; });
      return { r: r, s: all ? score : 0 };
    }).filter(function (x) { return x.s > 0; })
      .sort(function (a, b) { return b.s - a.s; }).map(function (x) { return x.r; });
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function mark(text, q) {
    var out = esc(text), words = norm(q).split(' ').filter(Boolean);
    words.forEach(function (w) {
      var i = out.toLowerCase().indexOf(w);
      if (i > -1) out = out.slice(0, i) + '<mark>' + out.slice(i, i + w.length) + '</mark>' + out.slice(i + w.length);
    });
    return out.replace(/\b(D&amp;B|D-U-N-S|AI|API|Finance Analytics|Master Data)\b/g, '<span dir="ltr">$1</span>');
  }
  function resultsUrl(q) { return 'search.html?q=' + encodeURIComponent(q); }

  
  function renderInto(box, q) {
    var html = '';
    if (!norm(q)) {
      html += '<div class="srq-h">חיפושים פופולריים</div><div class="srq-chips">' +
        POPULAR.map(function (p) { return '<button type="button" class="srq-chip" data-q="' + esc(p) + '">' + mark(p, '') + '</button>'; }).join('') +
        '</div><div class="srq-h">גישה מהירה</div><div class="srq-quick">' +
        INDEX.filter(function (r) { return /duns|family-a1|lobby|blog-lobby/.test(r.u) && r.type !== 'sol' || r.t === 'ניהול סיכוני אשראי עסקי'; })
          .slice(0, 4).map(function (r) { return '<a href="' + r.u + '">' + mark(r.t, '') + '</a>'; }).join('') + '</div>';
    } else {
      var res = query(q);
      if (!res.length) {
        html = '<div class="srq-empty">לא נמצאו תוצאות עבור "<b>' + esc(q) + '</b>". נסו מילה אחרת או חפשו פתרון, תעשייה או מאמר.</div>';
      } else {
        var groups = {};
        res.slice(0, 8).forEach(function (r) { (groups[r.type] = groups[r.type] || []).push(r); });
        Object.keys(TYPES).forEach(function (k) {
          if (!groups[k]) return;
          html += '<div class="srq-h">' + TYPES[k] + '</div><ul class="srq-list">' + groups[k].map(function (r) {
            return '<li><a href="' + r.u + '"><b>' + mark(r.t, q) + '</b><span>' + mark(r.d, q) + '</span></a></li>';
          }).join('') + '</ul>';
        });
        html += '<a class="srq-all" href="' + resultsUrl(q) + '">לכל ' + res.length + ' התוצאות עבור "' + esc(q) + '"</a>';
      }
    }
    box.innerHTML = html;
    box.classList.add('srq');
  }

  var demoed = false;
  function attach(scope, opts) {
    opts = opts || {};
    var input = scope.querySelector('input[name="q"]');
    var box = scope.querySelector(opts.results || '.slres, .slmres');
    if (!input || input.__srq) return;
    input.__srq = true;
    input.placeholder = 'חפשו פתרון, תעשייה או מאמר';
    var timer = null;
    function update() { if (box) renderInto(box, input.value); }
    function submit(e) {
      if (e) e.preventDefault();
      var q = input.value.trim();
      location.href = resultsUrl(q);
    }
    input.addEventListener('input', function () { stopDemo(); update(); });
    var form = input.closest('form');
    if (form) form.addEventListener('submit', submit);
    input.addEventListener('keydown', function (e) { stopDemo(); if (e.key === 'Enter') submit(e); });
    [].forEach.call(scope.querySelectorAll('.slsubmit'), function (b) { b.addEventListener('click', submit); });
    if (box) box.addEventListener('click', function (e) {
      var c = e.target.closest('.srq-chip'); if (!c) return;
      stopDemo(); input.value = c.getAttribute('data-q'); update(); input.focus();
    });
    function stopDemo() { if (timer) { clearTimeout(timer); timer = null; } }
    update();
    
    scope.__srqDemo = function () {
      if (demoed || opts.noDemo || input.value || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
      demoed = true;
      var word = 'אשראי', i = 0;
      (function step() {
        timer = setTimeout(function () {
          input.value = word.slice(0, ++i); update();
          if (i < word.length) step(); else timer = null;
        }, i ? 140 : 700);
      })();
      ['pointerdown', 'keydown'].forEach(function (ev) { document.addEventListener(ev, stopDemo, { once: true }); });
    };
  }

  window.DNBSearch = { INDEX: INDEX, TYPES: TYPES, POPULAR: POPULAR, query: query, mark: mark,
                       attach: attach, renderInto: renderInto, resultsUrl: resultsUrl, norm: norm };
})();
