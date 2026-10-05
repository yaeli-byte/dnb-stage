
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };

  
  var ORIG = new WeakMap();
  function setText(el, html) {
    if (!el) return;
    if (!ORIG.has(el)) ORIG.set(el, el.innerHTML);
    el.innerHTML = html;
  }
  function restore(els) {
    els.forEach(function (el) { if (el && ORIG.has(el)) el.innerHTML = ORIG.get(el); });
  }

  
  function corrections() {
    // A1 — the frame pasted the third-party paragraph onto the risk card
    var riskP = $('#c-risk .txt .col p');
    if (riskP) setText(riskP, 'סט פתרונות המעניק מידע מהימן, עדכני ומקיף על<br>מוסר תשלומים, רמת סיכון ומצב פיננסי');
    // A4 — the site map calls this "הפתרונות"
    $$('#header .mainnav a span').forEach(function (s) {
      if (s.textContent.trim() === 'מעטפת הפתרונות') setText(s, 'הפתרונות');
    });
  }

  
  var STATS = {
    1: { label: 'doc as written',
         v: [['185', 'שנות פעילות'],
             ['65', 'שנות פעילות בישראל'],
             ['587M', 'חברות במאגר<br>המידע העולמי'],
             ['1.8M', 'חברות ועסקים<br>במאגר הישראלי']] },
    2: { label: 'frame as built',
         v: [['500M+', 'פרופילים עסקיים<br>במאגר הגלובלי'],
             ['90%', 'מחברות ה-Fortune 500 <br>נעזרות בנתונים שלנו'],
             ['300', 'ענפי כלכלה מובילים<br>מדורגים בישראל'],
             ['80K', 'חברות מנוהלות טוב יותר']] },
    3: { label: 'merge — data first, then proof',
         v: [['587M', 'חברות במאגר<br>המידע העולמי'],
             ['1.8M', 'חברות ועסקים<br>במאגר הישראלי'],
             ['185', 'שנות פעילות'],
             ['90%', 'מחברות ה-Fortune 500 <br>נעזרות בנתונים שלנו']] }
  };
  function applyStats(n) {
    var nums = $$('#stats .num'), caps = $$('#stats .cap p');
    if (!n) { restore(nums); restore(caps); return; }
    STATS[n].v.forEach(function (pair, i) {
      setText(nums[i], pair[0]);
      setText(caps[i], pair[1]);
    });
  }

  
  var HERO_SUB = {
    2: 'פתרונות המידע העסקי של דן אנד ברדסטריט חושפים בפנייך את התמונה המלאה:<br>הסיכונים, הפרטים שאולי מנסים קצת לטשטש וההזדמנויות שאף אחד עדיין לא רואה.',
    3: 'התמונה המלאה: הסיכונים, הפרטים שמנסים לטשטש<br>וההזדמנויות שאף אחד עדיין לא רואה.'
  };
  function applyHeroSub(n) {
    var ex = $('#hero .hero-sub');
    if (ex) ex.remove();
    if (!n || n === '1') return;                     // 1 = keep the design as drawn
    var h1 = $('#hero h1');
    if (!h1) return;
    var d = document.createElement('div');
    d.className = 'hero-sub';
    d.innerHTML = HERO_SUB[n];
    h1.parentNode.insertBefore(d, h1.nextSibling);
  }

  
  var REAL_QUOTE = 'בדיקה פשוטה חשפה בפניי מידע שלא הכרתי על לקוח פוטנציאלי,<br>שלא עמד בתשלומים. במערכת אחרת, כבר מצאתי ספק חלופי,<br>אמין שעובד איתי עד היום';
  function applyTst(n) {
    var cards = $$('#tst .card');
    var ps = cards.map(function (c) { return $('.qm p', c); });
    var names = cards.map(function (c) { return $('.who .n b', c); });
    var roles = cards.map(function (c) { return $('.who .n span', c); });
    restore(ps); restore(names); restore(roles);
    cards.forEach(function (c) { c.classList.remove('pending'); });
    if (!n) return;
    if (n === '1') {                       // real quote centre, sides marked pending
      setText(ps[1], REAL_QUOTE);
      setText(names[1], 'לקוח דן אנד ברדסטריט');
      setText(roles[1], 'מנהל אשראי, חברת מסחר');
      cards[0].classList.add('pending'); cards[2].classList.add('pending');
    }
    if (n === '2') {                       // all three carry it, attribution anonymised
      ps.forEach(function (p) { setText(p, REAL_QUOTE); });
      names.forEach(function (b) { setText(b, 'לקוח דן אנד ברדסטריט'); });
      roles.forEach(function (s) { setText(s, 'מנהל אשראי, חברת מסחר'); });
    }
    if (n === '3') {                       // real quote only, siblings emptied
      setText(ps[1], REAL_QUOTE);
      setText(names[1], 'לקוח דן אנד ברדסטריט');
      setText(roles[1], 'מנהל אשראי, חברת מסחר');
      [0, 2].forEach(function (i) {
        setText(ps[i], '');
        setText(names[i], ''); setText(roles[i], '');
        cards[i].classList.add('pending');
      });
    }
  }

  
  var FAQ = [
    ['באיזו תדירות מתעדכן המידע?',
     'מאגרי המידע שלנו בישראל ובעולם מתעדכנים באופן שוטף וכוללים איסוף ועיבוד מידע ממגוון גדול של מקורות, לצד פעילות מודיעין עסקי.'],
    ['האם ניתן לחבר את הפתרונות של דן אנד ברדסטריט למערכות הארגוניות?',
     'כן. ניתן לחבר את הפתרונות וליהנות מגישה מאובטחת, נוחה וקלה תוך סינכרון בין המערכות.'],
    ['האם פתרונות המידע כוללים <span dir="ltr">AI</span>?',
     'אנחנו מטמיעים בינה מלאכותית ויכולות מתקדמות שלה בכלים שלנו, מתוך מטרה להעניק ללקוחותינו את המענה העדכני והאיכותי ביותר. מעבר לכך, המידע שלנו מבוסס, מהימן ועדכני ומאפשר להזין דאטה איכותי ואמין לניתוח כלי AI.'],
    ['האם הפתרונות שלכם מתאימים לעסקים קטנים ובינוניים או רק לחברות גדולות?',
     'הפתרונות שלנו מתאימים הן לעסקים קטנים ובינוניים והן לתאגידי ענק. כמו כן אנחנו מאפשרים לכל עסק ליהנות מסט פתרונות שמותאם באופן אישי לצרכים שלו.'],
    ['יש טעות במידע עליי או שהוא אינו מעודכן. למי פונים?',
     'ניתן להשאיר פרטים בטופס צור קשר ונחזור אלייך בהקדם.']
  ];
  function applyFaq(n) {
    var rows = $$('#faq .rows > .qa');
    var rules = $$('#faq .rows > img.rule, #faq .rows > .dotrule');
    rows.forEach(function (r) { r.style.display = ''; r.classList.remove('roomy'); });
    rules.forEach(function (r) { r.style.display = ''; });
    var qs = rows.map(function (r) { return $('.q', r); });
    restore(qs);
    if (!n) return;
    FAQ.forEach(function (pair, i) { if (qs[i]) setText(qs[i], pair[0]); });
    // hide the three placeholder rows the doc does not have
    for (var i = FAQ.length; i < rows.length; i++) {
      rows[i].style.display = 'none';
      if (rules[i]) rules[i].style.display = 'none';
    }
    if (n === '2') rows.slice(0, FAQ.length).forEach(function (r) { r.classList.add('roomy'); });
    if (n === '3') $('#faq').classList.add('tight');
    if (n !== '3') $('#faq').classList.remove('tight');
  }

  
  var FOOT = {
    1: { label: 'map top level, folded into the existing 3 columns',
         cols: [
           ['הפתרונות', ['ניהול סיכונים', 'אשראי צרכני', 'צמיחה עסקית', 'ניהול דאטה ו-AI', 'פתרונות נוספים מבית D&B']],
           ['פתרונות לפי תעשיות', ['ייבוא וייצוא', 'ייצור ותעשיה', 'בנייה, תשתיות ונדל״ן', 'טכנולוגיה ותוכנה', 'פיננסים, ביטוח ואשראי']],
           ['החברה', ['למה D&B?', 'מרכז המידע', 'מספר D-U-N-S', 'הבלוג שלנו', 'הצטרפו אלינו']]
         ] },
    2: { label: 'four narrower columns — one per map entry',
         cols: [
           ['מרכז המידע', ['לקוחות מספרים', 'הבלוג שלנו']],
           ['למה D&B?', ['הסיפור שלנו', 'מאחורי הדאטה שלנו', 'הצטרפו אלינו', 'שותפים לדרך', 'לשכת אשראי']],
           ['פתרונות לפי תעשיות', ['ייבוא וייצוא', 'ייצור ותעשיה', 'בנייה, תשתיות ונדל״ן', 'טכנולוגיה ותוכנה', 'פיננסים, ביטוח ואשראי']],
           ['הפתרונות', ['ניהול סיכונים', 'אשראי צרכני', 'צמיחה עסקית', 'ניהול דאטה ו-AI', 'מספר D-U-N-S']]
         ] },
    3: { label: 'solutions directory — second level of the map',
         cols: [
           ['ניהול סיכונים', ['תמונת מצב פיננסית', 'ניהול סיכונים פיננסיים', 'סיכוני ספקים', 'בקרה וטיוב רגולטיבי']],
           ['אשראי צרכני · צמיחה', ['בדיקות אשראי', 'ניטור ובקרת אשראי', 'פתרונות מותאמים', 'שיווק ומכירות', 'הזדמנויות עסקיות']],
           ['דאטה ו-AI · פלטפורמות', ['Master Data', 'API', 'קפטן קרדיט', 'duns 100', 'Dun\'s Guide']]
         ] }
  };
  function applyFooter(n) {
    var wrap = $('#fb .cols');
    if (!wrap) return;
    if (!wrap.__orig) wrap.__orig = wrap.innerHTML;
    wrap.innerHTML = wrap.__orig;
    wrap.classList.remove('four');
    if (!n) return;
    var brand = $('.brand', wrap);
    var cols = $$('.col', wrap);
    var spec = FOOT[n].cols;
    if (n === '2') wrap.classList.add('four');
    // grow to the number of columns the option needs
    while (cols.length < spec.length) {
      var c = cols[0].cloneNode(true);
      wrap.insertBefore(c, brand);
      cols = $$('.col', wrap);
    }
    cols.forEach(function (col, i) {
      if (i >= spec.length) { col.remove(); return; }
      var h = $('h4 span', col);
      if (h) h.innerHTML = spec[i][0];
      var links = $$('a', col);
      spec[i][1].forEach(function (label, j) {
        if (!links[j]) {
          var a = links[links.length - 1].cloneNode(true);
          col.appendChild(a); links = $$('a', col);
        }
        links[j].innerHTML = '<span>' + label + '</span>';
      });
      links.slice(spec[i][1].length).forEach(function (a) { a.remove(); });
    });
  }

  
  corrections();
  var APPLY = { stats: applyStats, hero: applyHeroSub, tst: applyTst, faq: applyFaq, foot: applyFooter };
  window.__content = {
    set: function (key, n) {
      document.documentElement.setAttribute('data-c-' + key, n);
      APPLY[key](n === '0' ? null : n);
    }
  };
})();
