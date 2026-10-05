
(function () {
  var mount = document.getElementById('tail');
  if (!mount) return;
  var skip = (mount.getAttribute('data-skip') || '').split(/\s+/).filter(Boolean);
  var html = `<!-- ============ GUIDES ============ -->
<section class="guides">
  <div class="wrap">
    <div class="ghead">
      <div><div class="eb"><i></i>כתבות ומאמרים<i></i></div><h2>המידע שכל חברה<br>צריכה לדעת</h2></div>
      <a class="dnb-btn dnb-btn--lite" href="#"><span class="dnb-btn__badge"><img src="fig/btn-arrow-dark.svg" alt=""></span><span class="dnb-btn__label">לכל המאמרים</span></a>
    </div>
    <div class="ggrid">
      <div class="gcard"><div class="gimg"><img src="fig/blog-photo.png" alt=""></div>
        <span class="gtag deep">מאמר<i></i></span><h3>מדריך למנהלי סיכונים: כך תזהו סימנים מוקדמים</h3>
        <p>תמונת מידע מקיפה על ספקים, לקוחות ושותפים עסקיים.</p></div>
      <div class="gcard"><div class="gimg"><img src="fig/blog-photo.png" alt=""></div>
        <span class="gtag tonal">תמונת מצב<i></i></span><h3>איך להפוך נתונים עסקיים לתובנות שמגדילות מכירות</h3>
        <p>תמונת מידע מקיפה על ספקים, לקוחות ושותפים עסקיים.</p></div>
      <div class="gcard"><div class="gimg"><img src="fig/blog-photo.png" alt=""></div>
        <span class="gtag solid">סקירה<i></i></span><h3>כך תזהו הזדמנויות עסקיות לפני המתחרים</h3>
        <p>תמונת מידע מקיפה על ספקים, לקוחות ושותפים עסקיים.</p></div>
    </div>
  </div>
</section>

<!-- ============ FAQ ============ -->
<section class="faq">
  <div class="wrap">
    <div class="in">
      <div class="rows">
        <details class="qa"><summary><button type="button"><span class="pm"><i class="h"></i><i class="v"></i></span>באיזו תדירות מתעדכן המידע?</button></summary></details>
        <details class="qa"><summary><button type="button"><span class="pm"><i class="h"></i><i class="v"></i></span>האם ניתן לחבר את הפתרונות של דן אנד ברדסטריט למערכות הארגוניות?</button></summary></details>
        <details class="qa"><summary><button type="button"><span class="pm"><i class="h"></i><i class="v"></i></span>האם פתרונות המידע כוללים AI?</button></summary></details>
        <details class="qa"><summary><button type="button"><span class="pm"><i class="h"></i><i class="v"></i></span>האם הפתרונות שלכם מתאימים לעסקים קטנים ובינוניים?</button></summary></details>
        <details class="qa"><summary><button type="button"><span class="pm"><i class="h"></i><i class="v"></i></span>יש טעות במידע עליי או שהוא אינו מעודכן, למי פונים?</button></summary></details>
      </div>
      <div class="side"><div class="eb"><i></i>שאלות נפוצות<i></i></div><h2>כל מה<br>שרציתם לדעת</h2></div>
    </div>
  </div>
</section>

<!-- ============ FOOTER (brand band above the links — round 22) ============ -->
<footer class="fb">
  <div class="wrap">
    <div class="contact">
      <div class="dots"></div>
      <div class="eb"><i></i>פנו אלינו<i></i></div>
      <h2>לא מצאתם מה שחיפשתם?<br>צרו קשר לפרטים נוספים</h2>
      <div class="btnw"><a class="dnb-btn dnb-btn--lite" href="#"><span class="dnb-btn__badge"><img src="fig/btn-arrow-nl.svg" alt=""></span><span class="dnb-btn__label">צרו קשר</span></a></div>
    </div>
    <div class="brandrow">
      <div class="nl">
        <p style="font:400 20px/27.2px var(--head);color:#fff;max-width:320px;margin:0">הירשמו לניוזלטר שלנו וקבלו את התובנות שלנו ישירות למייל</p>
        <form class="nlf" onsubmit="return false">
          <a class="dnb-btn dnb-btn--lite" href="#"><span class="dnb-btn__badge"><img src="fig/btn-arrow-nl.svg" alt=""></span><span class="dnb-btn__label">הרשמה</span></a>
          <input type="email" dir="ltr" placeholder="example@example.com" aria-label="אימייל">
        </form>
      </div>
      <div class="lock" style="text-align:end">
        <img src="fig/logo-white.png" alt="dun &amp; bradstreet">
        <p style="font:400 14px/23.1px var(--head);color:#8fa2af;max-width:276px;margin-top:14px;margin-inline-start:auto">מאגר המודיעין העסקי המקיף בישראל — נתונים על כל עסק, בכל רגע.</p>
        <div class="soc" style="justify-content:flex-end">
          <img src="fig/soc-x.svg" alt="X"><img src="fig/soc-li.svg" alt="LinkedIn"><img src="fig/soc-yt.svg" alt="YouTube">
        </div>
      </div>
    </div>
    <div class="cols">
      <div class="band">
        <h4>הפתרונות</h4><div class="rule"></div>
        <div class="grid3">
          <ul>
            <li><a class="ln" href="#" style="color:#fff">צמיחה עסקית</a></li>
            <li><a class="ln" href="#">שיווק ומכירות</a></li>
            <li><a class="ln" href="#">הזדמנויות עסקיות</a></li>
          </ul>
          <ul>
            <li><a class="ln" href="#" style="color:#fff">אשראי צרכני</a></li>
            <li><a class="ln" href="#">בדיקות אשראי</a></li>
            <li><a class="ln" href="#">ניטור ובקרת אשראי</a></li>
            <li><a class="ln" href="#">פתרונות מותאמים לבחינת אשראי</a></li>
          </ul>
          <ul>
            <li><a class="ln" href="#" style="color:#fff">ניהול סיכונים</a></li>
            <li><a class="ln" href="#">תמונת מצב פיננסית</a></li>
            <li><a class="ln" href="#">ניהול סיכונים פיננסיים</a></li>
            <li><a class="ln" href="#">סיכוני ספקים</a></li>
            <li><a class="ln" href="#">בקרה וטיוב רגולטיבי</a></li>
          </ul>
        </div>
        <div class="grid3" style="margin-top:28px">
          <ul></ul>
          <ul>
            <li><a class="ln" href="#" style="color:#fff">פתרונות נוספים מבית D&amp;B</a></li>
            <li><a class="ln" href="#">קפטן קרדיט</a></li>
            <li><a class="ln" href="#">קפטן קרדיט לעסקים</a></li>
            <li><a class="ln" href="#">duns 100</a></li>
            <li><a class="ln" href="#">Dun's Guide</a></li>
          </ul>
          <ul>
            <li><a class="ln" href="#" style="color:#fff">ניהול דאטה ו-AI</a></li>
            <li><a class="ln" href="#">Master Data</a></li>
            <li><a class="ln" href="#">API</a></li>
            <li><a class="ln" href="#">AI</a></li>
          </ul>
        </div>
      </div>

      <div><h4>מרכז המידע</h4><div class="rule"></div><ul>
        <li><a class="ln" href="#">לקוחות מספרים</a></li>
        <li><a class="ln" href="#">הבלוג שלנו</a></li></ul></div>
      <div><h4>למה D&amp;B?</h4><div class="rule"></div><ul>
        <li><a class="ln" href="#">הסיפור שלנו</a></li>
        <li><a class="ln" href="#">מאחורי הדאטה שלנו</a></li>
        <li><a class="ln" href="#">הצטרפו אלינו</a></li>
        <li><a class="ln" href="#">שותפים לדרך</a></li>
        <li><a class="ln" href="#">לשכת אשראי</a></li></ul></div>
      <div><h4>מספר D-U-N-S</h4><div class="rule"></div></div>

      <div class="band">
        <h4>פתרונות לפי תעשיות</h4><div class="rule"></div>
        <ul class="ind">
          <li><a class="ln" href="#">ייבוא וייצוא</a></li>
          <li><a class="ln" href="#">ייצור ותעשייה</a></li>
          <li><a class="ln" href="#">בנייה, תשתיות ונדל״ן</a></li>
          <li><a class="ln" href="#">טכנולוגיה ותוכנה</a></li>
          <li><a class="ln" href="#">קמעונאות ומוצרי צריכה</a></li>
          <li><a class="ln" href="#">פיננסים, ביטוח ואשראי</a></li>
          <li><a class="ln" href="#">תחבורה ולוגיסטיקה</a></li>
          <li><a class="ln" href="#">אנרגיה, מים וסביבה</a></li>
          <li><a class="ln" href="#">חקלאות</a></li>
        </ul>
      </div>
    </div>
    <div class="legal">
      <span>עוצב ע״י מובאו קריאייטיב</span>
      <span><a href="#">Terms of service</a> &nbsp; <a href="#">Workplace policy</a> &nbsp; <a href="#">מדיניות פרטיות</a></span>
      <span>© 2026 Dun &amp; Bradstreet Israel · כל הזכויות שמורות</span>
    </div>
  </div>
</footer>>`;
  var frag = document.createElement('div');
  frag.innerHTML = html;
  if (skip.indexOf('guides') >= 0) { var g = frag.querySelector('.guides'); if (g) g.remove(); }
  if (skip.indexOf('faq')    >= 0) { var f = frag.querySelector('.faq');    if (f) f.remove(); }
  mount.replaceWith.apply(mount, Array.prototype.slice.call(frag.childNodes));
})();
