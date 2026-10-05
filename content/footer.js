
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };

  
  var ROW1 = [
    ['מרכז המידע', ['לקוחות מספרים', 'הבלוג שלנו']],
    ['למה D&B?', ['הסיפור שלנו', 'מאחורי הדאטה שלנו', 'הצטרפו אלינו', 'שותפים לדרך', 'לשכת אשראי']],
    ['פתרונות לפי תעשיות', ['ייבוא וייצוא', 'ייצור ותעשיה', 'בנייה, תשתיות ונדל״ן', 'טכנולוגיה ותוכנה',
                            'קמעונאות ומוצרי צריכה', 'פיננסים, ביטוח ואשראי', 'תחבורה ולוגיסטיקה',
                            'אנרגיה, מים וסביבה', 'חקלאות']]
  ];
  var ROW2 = [
    ['ניהול סיכונים', ['תמונת מצב פיננסית', 'ניהול סיכונים פיננסיים', 'סיכוני ספקים', 'בקרה וטיוב רגולטיבי']],
    ['אשראי צרכני', ['בדיקות אשראי', 'ניטור ובקרת אשראי', 'פתרונות מותאמים לבחינת אשראי']],
    ['צמיחה עסקית', ['שיווק ומכירות', 'הזדמנויות עסקיות']],
    ['ניהול דאטה ו-AI', ['Master Data', 'API', 'AI']],
    ['פתרונות נוספים מבית D&B', ['קפטן קרדיט', 'קפטן קרדיט לעסקים', 'duns 100', 'Dun\'s Guide']]
  ];

  
  var CONTACT = {
    eyebrow: 'דברו איתנו',
    h2: 'יש לכם שאלה?<br>בואו נדבר.'
  };

  var NL_LABEL = 'הרשמה לניוזלטר';
  var NL_TEXT  = 'תובנות, סקירות ומצב המשק — ישירות למייל, אחת לחודש.';

  function col(title, links, wide) {
    return '<div class="col"' + (wide ? ' style="width:' + wide + 'px"' : '') + '>' +
      '<h4><span>' + title + '</span></h4>' +
      links.map(function (l) { return '<a href="#"><span>' + l + '</span></a>'; }).join('') +
      '</div>';
  }

  function newsletterField(id) {
    return '<form class="nlf" id="' + id + '" onsubmit="return false">' +
      '<input type="email" placeholder="האימייל שלכם" dir="ltr" aria-label="אימייל">' +
      '<button type="submit" aria-label="הרשמה">' +
      '<img src="fig/btn-arrow-dark.svg" alt=""></button></form>';
  }

  var ORIG = null;

  function build(opt) {
    var fb = $('#fb');
    if (!fb) return;
    if (ORIG === null) ORIG = fb.innerHTML;
    fb.innerHTML = ORIG;

    
    var nl = $('.nl', fb);
    $('.eb p', nl).innerHTML = CONTACT.eyebrow;
    $('h2', nl).innerHTML = CONTACT.h2;
    // the button already says צרו קשר; make sure it opens the pop-up
    var btn = $('.btn', nl);
    if (btn) btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (window.__popup) window.__popup.open();
    });

    
    var cols = $('.cols', fb);
    var brand = $('.brand', cols).outerHTML;
    cols.classList.add('r1');
    cols.innerHTML = ROW1.map(function (c) { return col(c[0], c[1], 234.8); }).join('') + brand;

    var row2 = document.createElement('div');
    row2.className = 'cols r2';
    row2.innerHTML = ROW2.map(function (c) { return col(c[0], c[1], 215.2); }).join('');
    cols.parentNode.insertBefore(row2, cols.nextSibling);

    
    var fbBrand = $('.brand', cols);
    if (opt === 'A') {
      fb.classList.add('nl-a'); fb.classList.remove('nl-b');
      var box = document.createElement('div');
      box.className = 'nlbox';
      box.innerHTML = '<h5>' + NL_LABEL + '</h5><p>' + NL_TEXT + '</p>' + newsletterField('nl-a');
      fbBrand.appendChild(box);
    } else {
      fb.classList.add('nl-b'); fb.classList.remove('nl-a');
      var band = document.createElement('div');
      band.className = 'nlband';
      band.innerHTML = '<p><b>' + NL_LABEL + '.</b> ' + NL_TEXT + '</p>' + newsletterField('nl-b');
      var bottom = $('.bottom', fb);
      bottom.parentNode.insertBefore(band, bottom);
    }
  }

  
  function refit() {
    var frame = $('#frame'), faq = $('#faq'), fb = $('#fb');
    if (!frame || !faq || !fb) return;
    frame.style.height = 'auto';           // height grows; the horizontal clip stays,
    faq.style.height = 'auto';             // or the 2008px testimonials marquee escapes
    var fbTop = parseFloat(getComputedStyle(fb).top) || 0;
    var need = fbTop + fb.getBoundingClientRect().height + 40;   // 40 = the frame's own tail
    faq.style.height = Math.ceil(need) + 'px';
    var faqTop = parseFloat(getComputedStyle(faq).top) || 0;
    frame.style.height = Math.ceil(faqTop + need) + 'px';
  }

  
  if (document.querySelector('#fb .colstack')) {
    window.__footer = { set: function () {}, refit: function () {} };
    return;
  }
  window.__footer = { set: function (o) { build(o); refit(); }, refit: refit };
  build('A'); refit();
})();
