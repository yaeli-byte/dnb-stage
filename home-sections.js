
(function () {
  
  function footerDrops(fb) {
    if (!fb || fb.__drops) return;
    var stack = fb.querySelector('.colstack');
    if (!stack || !stack.parentNode) return;
    var out = document.createElement('div');
    out.className = 'fdrops';

    function addDrop(labelText, fill) {
      if (!labelText) return;
      var d = document.createElement('div'); d.className = 'd';
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'sm'; b.setAttribute('aria-expanded', 'false');
      var pm = document.createElement('span'); pm.className = 'pm';
      pm.appendChild(document.createElement('i')).className = 'h';
      pm.appendChild(document.createElement('i')).className = 'v';
      var t = document.createElement('span'); t.setAttribute('dir', 'auto');
      t.textContent = labelText;
      b.appendChild(pm); b.appendChild(t);
      var panel = document.createElement('div'); panel.className = 'panel';
      var pin = document.createElement('div'); pin.className = 'pin';
      fill(pin);
      if (!pin.children.length) return;          
      panel.appendChild(pin); d.appendChild(b); d.appendChild(panel);
      out.appendChild(d);
    }
    function pourCol(col, pin, withHead) {
      var h = col.querySelector('h4,h5');
      if (withHead && h) {
        var h5 = document.createElement('h5');
        var hs = document.createElement('span');
        hs.setAttribute('dir', 'auto');
        hs.textContent = (h.textContent || '').replace(/\s+/g, ' ').trim();
        h5.appendChild(hs); pin.appendChild(h5);
      }
      [].forEach.call(col.querySelectorAll('a'), function (a) {
        pin.appendChild(a.cloneNode(true));
      });
    }

    var pending = null;
    [].forEach.call(stack.children, function (k) {
      if (k.classList.contains('fband')) {
        pending = (k.textContent || '').replace(/\s+/g, ' ').trim();
        return;
      }
      if (!k.classList.contains('crow')) return;
      var cols = [].slice.call(k.querySelectorAll('.col'));
      if (pending) {
        var band = pending; pending = null;
        addDrop(band, function (pin) {
          cols.forEach(function (c) { pourCol(c, pin, true); });
        });
      } else {
        cols.forEach(function (c) {
          var h = c.querySelector('h4,h5');
          if (!h) return;
          addDrop((h.textContent || '').replace(/\s+/g, ' ').trim(),
                  function (pin) { pourCol(c, pin, false); });
        });
      }
    });
    if (!out.children.length) return;
    stack.parentNode.insertBefore(out, stack);
    fb.classList.add('has-drops');
    out.addEventListener('click', function (e) {
      var b = e.target && e.target.closest ? e.target.closest('button.sm') : null;
      if (!b || !out.contains(b)) return;
      var d = b.parentNode;
      var open = d.classList.toggle('open');
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    fb.__drops = true;
  }

  var M = {"crumb": "<nav class=\"crumb-c\" aria-label=\"פירורי לחם\"><div class=\"crumb-in\"></div></nav>", "hdr": "<header class=\"fr\" id=\"header\" data-node=\"505:128700\">\n  <div class=\"nav-right\">\n    <a class=\"btn btn-dark\" href=\"#\">\n      <span class=\"badge\"><img src=\"fig/btn-arrow.svg\" alt=\"\"></span>\n      <span class=\"lbl\">צרו קשר</span>\n    </a>\n    <a class=\"login\" href=\"#\">התחברות</a>\n  </div>\n  <nav class=\"mainnav\">\n    <a href=\"#\"><img src=\"fig/nav-caret.svg\" alt=\"\"><span>מרכז המידע</span></a>\n    <a href=\"#\"><img src=\"fig/nav-caret.svg\" alt=\"\"><span>למה D&amp;B?</span></a>\n    <!-- CLIENT, round 12: these two open menus too, so they carry the same\n         caret as \"מרכז המידע\" and \"למה D&B?\" -->\n    <a href=\"#\"><img src=\"fig/nav-caret.svg\" alt=\"\"><span>פתרונות לפי תעשיות</span></a>\n    <a href=\"#\"><img src=\"fig/nav-caret.svg\" alt=\"\"><span>מעטפת הפתרונות</span></a>\n    <a class=\"duns\" href=\"#\"><span dir=\"ltr\">D-U-N-S</span><span>מספר</span></a>\n  </nav>\n  <a class=\"logo\" href=\"#\" data-node=\"558:14107\"><img src=\"fig/logo-tagline.png\" alt=\"dun &amp; bradstreet — לדעת להחליט\"></a>\n  <!-- CLIENT, round 13 item 11: once the nav is too narrow for one row it\n       becomes a burger instead of wrapping to two. Both of these are\n       display:none above the threshold, so the 1440 canvas never sees them. -->\n  <button class=\"navburger\" type=\"button\" aria-label=\"פתיחת תפריט\" aria-expanded=\"false\" aria-controls=\"navpanel\">\n    <i></i><i></i><i></i>\n  </button>\n</header>", "trust": "<section class=\"fr\" id=\"trust\" data-node=\"505:120710\">\n  <div class=\"lbl\" data-node=\"505:120711\"><i></i><p>מבין לקוחותינו</p><i></i></div>\n  <div class=\"row\" data-node=\"505:120715\">\n    <div class=\"track\">\n      <div style=\"width:206.4px\"><img src=\"fig/logo-hapoalim.png\" alt=\"בנק הפועלים\"></div>\n      <div style=\"width:199.2px\"><img src=\"fig/logo-windward.png\" alt=\"Windward\"></div>\n      <div style=\"width:182.4px\"><img src=\"fig/logo-nsknox.png\" alt=\"nsKnox\"></div>\n      <div style=\"width:180px\"><img src=\"fig/logo-jfrog.png\" alt=\"JFrog\"></div>\n      <div style=\"width:184.8px\"><img src=\"fig/logo-lasso.png\" alt=\"Lasso\"></div>\n      <div style=\"width:182.4px\"><img src=\"fig/logo-nice.png\" alt=\"NICE\"></div>\n      <!-- two clone sets: the marquee loops on one set width, and the\n           clones are the only thing keeping the viewport full. Decorative,\n           so they carry no alt text and are hidden from AT. -->\n      <div aria-hidden=\"true\" style=\"width:206.4px\"><img src=\"fig/logo-hapoalim.png\" alt=\"\"></div>\n      <div aria-hidden=\"true\" style=\"width:199.2px\"><img src=\"fig/logo-windward.png\" alt=\"\"></div>\n      <div aria-hidden=\"true\" style=\"width:182.4px\"><img src=\"fig/logo-nsknox.png\" alt=\"\"></div>\n      <div aria-hidden=\"true\" style=\"width:180px\"><img src=\"fig/logo-jfrog.png\" alt=\"\"></div>\n      <div aria-hidden=\"true\" style=\"width:184.8px\"><img src=\"fig/logo-lasso.png\" alt=\"\"></div>\n      <div aria-hidden=\"true\" style=\"width:182.4px\"><img src=\"fig/logo-nice.png\" alt=\"\"></div>\n      <div aria-hidden=\"true\" style=\"width:206.4px\"><img src=\"fig/logo-hapoalim.png\" alt=\"\"></div>\n      <div aria-hidden=\"true\" style=\"width:199.2px\"><img src=\"fig/logo-windward.png\" alt=\"\"></div>\n      <div aria-hidden=\"true\" style=\"width:182.4px\"><img src=\"fig/logo-nsknox.png\" alt=\"\"></div>\n      <div aria-hidden=\"true\" style=\"width:180px\"><img src=\"fig/logo-jfrog.png\" alt=\"\"></div>\n      <div aria-hidden=\"true\" style=\"width:184.8px\"><img src=\"fig/logo-lasso.png\" alt=\"\"></div>\n      <div aria-hidden=\"true\" style=\"width:182.4px\"><img src=\"fig/logo-nice.png\" alt=\"\"></div>\n    </div>\n  </div>\n</section>", "guides": "<section class=\"fr\" id=\"guides\" data-node=\"505:120760\">\n  <div class=\"g-head\" data-node=\"505:120764\">\n    <div class=\"gh-tx\">\n    <div class=\"eyebrow\"><i></i><span>כתבות ומאמרים</span><i></i></div>\n    <h2>המידע שכל חברה<br>צריכה לדעת</h2>\n    </div>\n    <a class=\"btn-all\" href=\"#\" data-node=\"564:24644\">\n      <span class=\"badge\"><img src=\"fig/btn-arrow-dark.svg\" alt=\"\"></span>\n      <span class=\"lbl\">לכל המאמרים</span>\n    </a>\n  </div>\n  <div class=\"g-grid\" data-node=\"505:120771\">\n    <article class=\"g-card\">\n      <div class=\"g-img\"><img src=\"fig/blog-photo.png\" alt=\"\"></div>\n      <div class=\"rays\" style=\"left:109.711px\">\n        <div class=\"v\"><img src=\"fig/ray-v.svg\" alt=\"\"></div>\n        <div class=\"d a\"><img src=\"fig/ray-d1.svg\" alt=\"\"></div>\n        <div class=\"d b\"><img src=\"fig/ray-d2.svg\" alt=\"\"></div>\n        <div class=\"h\"><img src=\"fig/ray-h1.svg\" alt=\"\"></div>\n      </div>\n      <div class=\"g-body\"><div class=\"g-in\">\n        <div class=\"g-tag deep\" data-w=\"77\"><p>מאמר</p><i></i></div>\n        <div class=\"g-txt\">\n          <h3>מדריך למנהלי סיכונים: כך תזהו<br>סימני אזהרה אצל שותפים</h3>\n          <p>תמונת מידע מקיפה על ספקים, לקוחות ושווקים,<br>התייעלות תפעולית והזדמנויות צמיחה.</p>\n        </div>\n      </div></div>\n    </article>\n    <article class=\"g-card\">\n      <div class=\"g-img\"><img src=\"fig/blog-photo.png\" alt=\"\"></div>\n      <div class=\"rays\" style=\"left:102.043px\">\n        <div class=\"v\"><img src=\"fig/ray-v.svg\" alt=\"\"></div>\n        <div class=\"d a\"><img src=\"fig/ray-d1.svg\" alt=\"\"></div>\n        <div class=\"d b\"><img src=\"fig/ray-d2.svg\" alt=\"\"></div>\n        <div class=\"h\"><img src=\"fig/ray-h2.svg\" alt=\"\"></div>\n      </div>\n      <div class=\"g-body\"><div class=\"g-in\">\n        <div class=\"g-tag\" data-w=\"108\"><p>תמונת מצב</p><i></i></div>\n        <div class=\"g-txt\">\n          <h3 style=\"width:326px\">איך להפוך נתונים עסקיים לגלי<br>שמגדיל את הרווחיות של החברה</h3>\n          <p>תמונת מידע מקיפה על ספקים, לקוחות ושווקים,<br>התייעלות תפעולית והזדמנויות צמיחה.</p>\n        </div>\n      </div></div>\n    </article>\n    <article class=\"g-card\" style=\"height:552px\">\n      <div class=\"g-img\"><img src=\"fig/blog-photo.png\" alt=\"\"></div>\n      <div class=\"rays\" style=\"left:103.816px\">\n        <div class=\"v\"><img src=\"fig/ray-v.svg\" alt=\"\"></div>\n        <div class=\"d a\"><img src=\"fig/ray-d1.svg\" alt=\"\"></div>\n        <div class=\"d b\"><img src=\"fig/ray-d2.svg\" alt=\"\"></div>\n        <div class=\"h big\"><img src=\"fig/ray-h3.svg\" alt=\"\"></div>\n      </div>\n      <div class=\"g-body\"><div class=\"g-in\">\n        <div class=\"g-tag solid\" data-w=\"81\"><p>סקירה</p><i></i></div>\n        <div class=\"g-txt\">\n          <h3 style=\"width:337px\">כך תזהו הזדמנויות עסקיות לפני<br>המתחרים באמצעות מידע איכותי</h3>\n          <p>תמונת מידע מקיפה על ספקים, לקוחות ושווקים,<br>התייעלות תפעולית והזדמנויות צמיחה.</p>\n        </div>\n      </div></div>\n    </article>\n  </div>\n  <div class=\"g-cta\" data-node=\"558:9382\"></div>\n</section>", "ctaw": "<section class=\"fr\" id=\"ctaw\">\n  <div id=\"cta\" data-node=\"558:9440\">\n    <div class=\"dots\" data-node=\"558:9441\"></div>\n    <div class=\"pool\" data-node=\"558:9442\"></div>\n    <div class=\"stack\" data-node=\"558:9443\">\n      <h2 data-node=\"558:9444\">מוכנים לנהל סיכונים ולצמוח?</h2>\n      <div class=\"sub\" data-node=\"558:9445\">\n        <p>הצטרפו לחברות המובילות בישראל ובעולם שכבר מקבלות החלטות מבוססות דאטה חכם.</p>\n        <div class=\"btnw\">\n          <a class=\"btn btn-lite\" href=\"#\">\n            <span class=\"badge\"><img src=\"fig/btn-arrow-dark.svg\" alt=\"\"></span>\n            <span class=\"lbl\">צרו קשר</span>\n          </a>\n        </div>\n      </div>\n    </div>\n    <div class=\"dchip l\" data-node=\"558:9449\" style=\"left:168px;top:128.11px\">\n      <span class=\"dcard\"><p>דירוג אשראי</p></span>\n      <span class=\"dline\"></span>\n      <span class=\"dplus\"><img src=\"fig/d4-plus.svg\" alt=\"\"></span>\n    </div>\n    <div class=\"dchip l\" data-node=\"558:9450\" style=\"left:122px;top:177.11px\">\n      <span class=\"dcard\"><p>דירוג אשראי</p></span>\n      <span class=\"dline\"></span>\n      <span class=\"dplus\"><img src=\"fig/d4-plus.svg\" alt=\"\"></span>\n    </div>\n    <div class=\"dchip r\" data-node=\"558:9451\" style=\"left:1097px;top:363.11px\">\n      <span class=\"dcard\"><p>דירוג אשראי</p></span>\n      <span class=\"dline\"></span>\n      <span class=\"dplus\"><img src=\"fig/d4-plus.svg\" alt=\"\"></span>\n    </div>\n  </div>\n</section>", "tst": "<section class=\"fr\" id=\"tst\" data-node=\"505:125606\">\n  <div class=\"dots\"></div>\n  <div class=\"head\" data-node=\"505:125608\">\n    <div class=\"lbl\"><i></i><p>ציטוטים</p><i></i></div>\n    <h2>מה הלקוחות שלנו <br>אומרים עלינו</h2>\n  </div>\n  <div class=\"row\" data-node=\"558:9746\">\n    <div class=\"card\" data-node=\"558:9747\">\n      <div class=\"qw\">\n        <img src=\"fig/t2-quote.svg\" alt=\"\">\n        <div class=\"qm\"><p>השינוי הכי גדול היה הבהירות. פתאום אנחנו לא רק מסתכלים על מספרים, אנחנו מבינים את המבנה של העסק שלנו.</p></div>\n      </div>\n      <div class=\"who\"><div class=\"in\">\n        <div class=\"n\"><b>אבי כהן</b><span>סמנכ״ל טכנולוגיות, טק-לוג׳יק</span></div>\n        <img src=\"fig/avatar.png\" alt=\"\">\n      </div></div>\n    </div>\n    <div class=\"card\" data-node=\"558:9881\">\n      <div class=\"qw\">\n        <img src=\"fig/t2-quote.svg\" alt=\"\">\n        <div class=\"qm\"><p>בדיקה פשוטה חשפה בפניי מידע שלא הכרתי על לקוח פוטנציאלי, שלא עמד בתשלומים. במערכת אחרת, כבר מצאתי ספק חלופי, אמין שעובד איתי עד היום.</p></div>\n      </div>\n      <div class=\"who\"><div class=\"in\">\n        <div class=\"n\"><b>אבי כהן</b><span>סמנכ״ל טכנולוגיות, טק-לוג׳יק</span></div>\n        <img src=\"fig/avatar.png\" alt=\"\">\n      </div></div>\n    </div>\n    <div class=\"card\" data-node=\"558:10015\">\n      <div class=\"qw\">\n        <img src=\"fig/t2-quote.svg\" alt=\"\">\n        <div class=\"qm\"><p>השינוי הכי גדול היה הבהירות. פתאום אנחנו לא רק מסתכלים על מספרים, אנחנו מבינים את המבנה של העסק שלנו.</p></div>\n      </div>\n      <div class=\"who\"><div class=\"in\">\n        <div class=\"n\"><b>אבי כהן</b><span>סמנכ״ל טכנולוגיות, טק-לוג׳יק</span></div>\n        <img src=\"fig/avatar.png\" alt=\"\">\n      </div></div>\n    </div>\n  </div>\n  <div class=\"navsq\">\n    <span class=\"sq\"><i><img src=\"fig/nav-arrow-a.svg\" alt=\"\"></i></span>\n    <span class=\"sq flip\"><i><img src=\"fig/nav-arrow-b.svg\" alt=\"\"></i></span>\n  </div>\n  <div class=\"progbar\"><span class=\"pill\"><img src=\"fig/t2-progress.svg\" alt=\"\"></span></div>\n</section>", "faq": "<section class=\"fr\" id=\"faq\" data-node=\"529:15604\">\n  <img class=\"glow\" src=\"fig/faq-glow.svg\" alt=\"\">\n  <div class=\"wrap\">\n    <div class=\"aside\" data-node=\"529:15607\">\n      <div class=\"split\">\n        <div class=\"rows\" data-node=\"529:15609\">\n      <div class=\"qa\"><div class=\"qbtn\"><div class=\"qin\"><div class=\"qline\">\n        <span class=\"plus\"><img class=\"h\" src=\"fig/faq2-plus-h.svg\" alt=\"\"><img class=\"v\" src=\"fig/faq2-plus-v.svg\" alt=\"\"></span>\n        <p class=\"q nw\">באיזו תדירות מתעדכן המידע?</p>\n      </div></div></div>\n        <div class=\"a\"><p>מאגרי המידע שלנו בישראל ובעולם מתעדכנים באופן שוטף וכוללים איסוף ועיבוד מידע ממגוון גדול של מקורות, לצד פעילות מודיעין עסקי.</p></div></div>\n      <div class=\"qa\"><div class=\"qbtn\"><div class=\"qin\"><div class=\"qline\">\n        <span class=\"plus\"><img class=\"h\" src=\"fig/faq2-plus-h.svg\" alt=\"\"><img class=\"v\" src=\"fig/faq2-plus-v.svg\" alt=\"\"></span>\n        <p class=\"q \" style=\"width:532px\">האם ניתן לחבר את הפתרונות של דן אנד ברדסטריט למערכות הארגוניות?</p>\n      </div></div></div>\n        <div class=\"a\"><p>כן. ניתן לחבר את הפתרונות וליהנות מגישה מאובטחת, נוחה וקלה תוך סינכרון בין המערכות.</p></div></div>\n      <div class=\"qa\"><div class=\"qbtn\"><div class=\"qin\"><div class=\"qline\">\n        <span class=\"plus\"><img class=\"h\" src=\"fig/faq2-plus-h.svg\" alt=\"\"><img class=\"v\" src=\"fig/faq2-plus-v.svg\" alt=\"\"></span>\n        <p class=\"q nw\">האם פתרונות המידע כוללים <span dir=\"ltr\">AI</span>?</p>\n      </div></div></div>\n        <div class=\"a\"><p>אנחנו מטמיעים בינה מלאכותית ויכולות מתקדמות שלה בכלים שלה, מתוך מטרה להעניק ללקוחותינו את המענה העדכני והאיכותי ביותר. מעבר לכך, המידע שלנו מבוסס, מהימן ועדכני ומאפשר להזין דאטה, איכותי, אמין לניתוח כלי <span dir=\"ltr\">AI</span>.</p></div></div>\n      <div class=\"qa\"><div class=\"qbtn\"><div class=\"qin\"><div class=\"qline\">\n        <span class=\"plus\"><img class=\"h\" src=\"fig/faq2-plus-h.svg\" alt=\"\"><img class=\"v\" src=\"fig/faq2-plus-v.svg\" alt=\"\"></span>\n        <p class=\"q\" style=\"width:453px;line-height:1.4\">האם הפתרונות שלכם מתאימים לעסקים קטנים ובינוניים או רק לחברות גדולות?</p>\n      </div></div></div>\n        <div class=\"a\"><p>הפתרונות שלנו מתאימים הן לעסקים קטנים ובינוניים והן לתאגידי ענק. כמו כן אנחנו מאפשרים לכל עסק ליהנות מסט פתרונות שמותאם באופן אישי לצרכים שלו.</p></div></div>\n      <div class=\"qa\"><div class=\"qbtn\"><div class=\"qin\"><div class=\"qline\">\n        <span class=\"plus\"><img class=\"h\" src=\"fig/faq2-plus-h.svg\" alt=\"\"><img class=\"v\" src=\"fig/faq2-plus-v.svg\" alt=\"\"></span>\n        <p class=\"q\" style=\"width:532px\">יש טעות במידע עליי או שהוא אינו מעודכן.<br>למי פונים?</p>\n      </div></div></div>\n        <div class=\"a\"><p>ניתן להשאיר פרטים בטופס צור קשר ונחזור אלייך בהקדם.</p></div></div>\n        </div>\n        <div class=\"side\" data-node=\"529:15711\">\n          <div class=\"eb\"><p>שאלות נפוצות</p><i></i></div>\n          <h2>כל מה<br>שרציתם לדעת</h2>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div id=\"fb\" data-node=\"527:8429\">\n    <div class=\"dotp\" data-node=\"541:53852\"></div>\n    <div class=\"nl\" data-node=\"527:8432\">\n      <div class=\"ebw\"><div class=\"eb\"><i></i><p>פנו אלינו</p><i></i></div></div>\n      <h2>לא מצאתם מה שחיפשתם?<br>צרו קשר לפרטים נוספים</h2>\n      <a class=\"btn btn-lite\" href=\"#\" data-node=\"527:8440\">\n        <span class=\"badge\"><img src=\"fig/btn-arrow-nl.svg\" alt=\"\"></span>\n        <span class=\"lbl\">צרו קשר</span>\n      </a>\n    </div>\n    <div class=\"foot\" data-node=\"527:8450\">\n    <!-- FOOTER, round 22 (client, 2026-09-28): the brand lockup and the social\n         links now sit ABOVE every page link, and the newsletter takes the\n         opposite side of the same band rather than hanging under the sitemap.\n         Her words: \"הלוגו והלינקים לסושיאל צריכים להיות מעל כל הלינקים לעמודים\"\n         and \"ההרשמה לניוזלטר צריך להיות מתחת ללוגו ולסושיאל או בצד השני כי זה\n         חלק די חשוב\". Same components, new position — nothing is restyled. -->\n    <div class=\"fbtop\" data-node=\"541:53939\">\n      <div class=\"fbid\">\n        <div class=\"brand\" data-node=\"541:53933\">\n          <img src=\"fig/logo-tagline-white.png\" alt=\"dun &amp; bradstreet — לדעת להחליט\">\n        </div>\n        <span class=\"social\" data-node=\"131:557\">\n          <img src=\"fig/soc-x.svg\" alt=\"X\">\n          <img src=\"fig/soc-li.svg\" alt=\"LinkedIn\">\n          <img src=\"fig/soc-yt.svg\" alt=\"YouTube\">\n        </span>\n      </div>\n      <div class=\"brand nlx\" data-node=\"541:53934\">\n          <p>הירשמו לניוזלטר שלנו<br>וקבלו את התובנות שלנו ישירות למייל</p>\n          <form class=\"nlf\" data-node=\"542:53960\" onsubmit=\"return false\">\n            <a class=\"btn btn-lite\" href=\"#\" data-node=\"542:53970\">\n              <span class=\"badge\"><img src=\"fig/btn-arrow-nl.svg\" alt=\"\"></span>\n              <span class=\"lbl\">הרשמה</span>\n            </a>\n            <input type=\"email\" dir=\"ltr\" placeholder=\"example@example.com\" aria-label=\"אימייל\">\n          </form>\n        </div>\n    </div>\n    <div class=\"cols\" data-node=\"541:53897\">\n      <div class=\"colstack\">\n        <!-- FOOTER LAYOUT: option 2 (client pick, 2026-09-22) — every SUB-GROUP\n             is its own column with its own heading, all headings on one\n             baseline. The old three-band structure (a 3+3 grid, a one-column\n             band, a nine-link flow, a three-column band) is what made nothing\n             line up with anything below it.\n             \"מעטפת הפתרונות\" is the client's own addition: a sub-heading over\n             the first row, so those five columns still read as one family now\n             that the old \"הפתרונות\" umbrella heading is gone. It matches the\n             wording the header nav already uses. -->\n        <p class=\"fband\">מעטפת הפתרונות</p>\n        <div class=\"crow five\">\n          <div class=\"col\">\n            <h4><span>ניהול סיכוני אשראי עסקי</span></h4>\n            <a href=\"#\"><span>ניהול סיכונים פיננסיים</span></a>\n          </div>\n          <div class=\"col\">\n            <h4><span>אשראי צרכני</span></h4>\n            <a href=\"#\"><span>בדיקות אשראי</span></a>\n            <a href=\"#\"><span>ניטור ובקרת אשראי</span></a>\n            <a href=\"#\"><span>מודולים מותאמים לבחינת אשראי</span></a>\n          </div>\n          <div class=\"col\">\n            <h4><span>ניהול דאטה ו-AI</span></h4>\n            <a href=\"#\"><span>Master Data</span></a>\n            <a href=\"#\"><span>API</span></a>\n            <a href=\"#\"><span>AI</span></a>\n          </div>\n          <div class=\"col\">\n            <h4><span>צמיחה עסקית</span></h4>\n            <a href=\"#\"><span>שיווק ומכירות</span></a>\n            <a href=\"#\"><span>הזדמנויות עסקיות</span></a>\n          </div>\n          <div class=\"col\">\n            <h4><span>ניהול סיכוני צד שלישי</span></h4>\n            <a href=\"#\"><span>סיכוני ספקים</span></a>\n            <a href=\"#\"><span>סיכוני ציות ורגולציה</span></a>\n          </div>\n        </div>\n        <div class=\"crow five\">\n          <div class=\"col wide2\">\n            <h4><span>פתרונות לפי תעשיות</span></h4>\n            <div class=\"ind2\">\n              <a href=\"#\"><span>ייבוא וייצוא</span></a>\n              <a href=\"#\"><span>ייצור ותעשייה</span></a>\n              <a href=\"#\"><span>בנייה, תשתיות ונדל״ן</span></a>\n              <a href=\"#\"><span>טכנולוגיה ותוכנה</span></a>\n              <a href=\"#\"><span>קמעונאות ומוצרי צריכה</span></a>\n              <a href=\"#\"><span>פיננסים, ביטוח ואשראי</span></a>\n              <a href=\"#\"><span>תחבורה ולוגיסטיקה</span></a>\n              <a href=\"#\"><span>אנרגיה, מים וסביבה</span></a>\n              <a href=\"#\"><span>חקלאות</span></a>\n            </div>\n          </div>\n          <div class=\"col\">\n            <h4><span>למה D&amp;B?</span></h4>\n            <a href=\"#\"><span>הסיפור שלנו</span></a>\n            <a href=\"#\"><span>מאחורי הדאטה שלנו</span></a>\n            <a href=\"#\"><span>הצטרפו אלינו</span></a>\n            <a href=\"#\"><span>שותפים לדרך</span></a>\n            <a href=\"#\"><span>לשכת אשראי</span></a>\n          </div>\n          <div class=\"col\">\n            <h4><span>מרכז המידע</span></h4>\n            <a href=\"#\"><span>לקוחות מספרים</span></a>\n            <a href=\"#\"><span>הבלוג שלנו</span></a>\n            <a href=\"#\"><span>מספר D-U-N-S</span></a>\n          </div>\n          <div class=\"col\">\n            <h4><span>פתרונות נוספים מבית D&amp;B</span></h4>\n            <a href=\"#\"><span>קפטן קרדיט</span></a>\n            <a href=\"#\"><span>קפטן קרדיט לעסקים</span></a>\n            <a href=\"#\"><span>duns 100</span></a>\n            <a href=\"#\"><span>Dun's Guide</span></a>\n          </div>\n        </div>\n      </div>\n      </div>\n      <div class=\"bottom\" data-node=\"527:8490\">\n        <div class=\"credit\" data-node=\"132:722\">\n          <p dir=\"rtl\">עוצב ע״י מובאו קריאייטיב</p>\n          <img src=\"fig/moveo-mark.svg\" alt=\"Moveo\">\n        </div>\n        <p class=\"copy\">© 2026 Dun &amp; Bradstreet Israel · כל הזכויות שמורות</p>\n        <div class=\"legal\" data-node=\"131:558\">\n          <a href=\"#\">Terms of service</a>\n          <a href=\"#\">Workplace policy</a>\n          <a href=\"#\">מדיניות פרטיות</a>\n        </div>\n      </div>\n    </div>\n  </div>\n</section>", "fb": "<div id=\"fb\" data-node=\"527:8429\">\n    <div class=\"dotp\" data-node=\"541:53852\"></div>\n    <div class=\"nl\" data-node=\"527:8432\">\n      <div class=\"ebw\"><div class=\"eb\"><i></i><p>פנו אלינו</p><i></i></div></div>\n      <h2>לא מצאתם מה שחיפשתם?<br>צרו קשר לפרטים נוספים</h2>\n      <a class=\"btn btn-lite\" href=\"#\" data-node=\"527:8440\">\n        <span class=\"badge\"><img src=\"fig/btn-arrow-nl.svg\" alt=\"\"></span>\n        <span class=\"lbl\">צרו קשר</span>\n      </a>\n    </div>\n    <div class=\"foot\" data-node=\"527:8450\">\n    <!-- FOOTER, round 22 (client, 2026-09-28): the brand lockup and the social\n         links now sit ABOVE every page link, and the newsletter takes the\n         opposite side of the same band rather than hanging under the sitemap.\n         Her words: \"הלוגו והלינקים לסושיאל צריכים להיות מעל כל הלינקים לעמודים\"\n         and \"ההרשמה לניוזלטר צריך להיות מתחת ללוגו ולסושיאל או בצד השני כי זה\n         חלק די חשוב\". Same components, new position — nothing is restyled. -->\n    <div class=\"fbtop\" data-node=\"541:53939\">\n      <div class=\"fbid\">\n        <div class=\"brand\" data-node=\"541:53933\">\n          <img src=\"fig/logo-tagline-white.png\" alt=\"dun &amp; bradstreet — לדעת להחליט\">\n        </div>\n        <span class=\"social\" data-node=\"131:557\">\n          <img src=\"fig/soc-x.svg\" alt=\"X\">\n          <img src=\"fig/soc-li.svg\" alt=\"LinkedIn\">\n          <img src=\"fig/soc-yt.svg\" alt=\"YouTube\">\n        </span>\n      </div>\n      <div class=\"brand nlx\" data-node=\"541:53934\">\n          <p>הירשמו לניוזלטר שלנו<br>וקבלו את התובנות שלנו ישירות למייל</p>\n          <form class=\"nlf\" data-node=\"542:53960\" onsubmit=\"return false\">\n            <a class=\"btn btn-lite\" href=\"#\" data-node=\"542:53970\">\n              <span class=\"badge\"><img src=\"fig/btn-arrow-nl.svg\" alt=\"\"></span>\n              <span class=\"lbl\">הרשמה</span>\n            </a>\n            <input type=\"email\" dir=\"ltr\" placeholder=\"example@example.com\" aria-label=\"אימייל\">\n          </form>\n        </div>\n    </div>\n    <div class=\"cols\" data-node=\"541:53897\">\n      <div class=\"colstack\">\n        <!-- FOOTER LAYOUT: option 2 (client pick, 2026-09-22) — every SUB-GROUP\n             is its own column with its own heading, all headings on one\n             baseline. The old three-band structure (a 3+3 grid, a one-column\n             band, a nine-link flow, a three-column band) is what made nothing\n             line up with anything below it.\n             \"מעטפת הפתרונות\" is the client's own addition: a sub-heading over\n             the first row, so those five columns still read as one family now\n             that the old \"הפתרונות\" umbrella heading is gone. It matches the\n             wording the header nav already uses. -->\n        <p class=\"fband\">מעטפת הפתרונות</p>\n        <div class=\"crow five\">\n          <div class=\"col\">\n            <h4><span>ניהול סיכוני אשראי עסקי</span></h4>\n            <a href=\"#\"><span>ניהול סיכונים פיננסיים</span></a>\n          </div>\n          <div class=\"col\">\n            <h4><span>אשראי צרכני</span></h4>\n            <a href=\"#\"><span>בדיקות אשראי</span></a>\n            <a href=\"#\"><span>ניטור ובקרת אשראי</span></a>\n            <a href=\"#\"><span>מודולים מותאמים לבחינת אשראי</span></a>\n          </div>\n          <div class=\"col\">\n            <h4><span>ניהול דאטה ו-AI</span></h4>\n            <a href=\"#\"><span>Master Data</span></a>\n            <a href=\"#\"><span>API</span></a>\n            <a href=\"#\"><span>AI</span></a>\n          </div>\n          <div class=\"col\">\n            <h4><span>צמיחה עסקית</span></h4>\n            <a href=\"#\"><span>שיווק ומכירות</span></a>\n            <a href=\"#\"><span>הזדמנויות עסקיות</span></a>\n          </div>\n          <div class=\"col\">\n            <h4><span>ניהול סיכוני צד שלישי</span></h4>\n            <a href=\"#\"><span>סיכוני ספקים</span></a>\n            <a href=\"#\"><span>סיכוני ציות ורגולציה</span></a>\n          </div>\n        </div>\n        <div class=\"crow five\">\n          <div class=\"col wide2\">\n            <h4><span>פתרונות לפי תעשיות</span></h4>\n            <div class=\"ind2\">\n              <a href=\"#\"><span>ייבוא וייצוא</span></a>\n              <a href=\"#\"><span>ייצור ותעשייה</span></a>\n              <a href=\"#\"><span>בנייה, תשתיות ונדל״ן</span></a>\n              <a href=\"#\"><span>טכנולוגיה ותוכנה</span></a>\n              <a href=\"#\"><span>קמעונאות ומוצרי צריכה</span></a>\n              <a href=\"#\"><span>פיננסים, ביטוח ואשראי</span></a>\n              <a href=\"#\"><span>תחבורה ולוגיסטיקה</span></a>\n              <a href=\"#\"><span>אנרגיה, מים וסביבה</span></a>\n              <a href=\"#\"><span>חקלאות</span></a>\n            </div>\n          </div>\n          <div class=\"col\">\n            <h4><span>למה D&amp;B?</span></h4>\n            <a href=\"#\"><span>הסיפור שלנו</span></a>\n            <a href=\"#\"><span>מאחורי הדאטה שלנו</span></a>\n            <a href=\"#\"><span>הצטרפו אלינו</span></a>\n            <a href=\"#\"><span>שותפים לדרך</span></a>\n            <a href=\"#\"><span>לשכת אשראי</span></a>\n          </div>\n          <div class=\"col\">\n            <h4><span>מרכז המידע</span></h4>\n            <a href=\"#\"><span>לקוחות מספרים</span></a>\n            <a href=\"#\"><span>הבלוג שלנו</span></a>\n            <a href=\"#\"><span>מספר D-U-N-S</span></a>\n          </div>\n          <div class=\"col\">\n            <h4><span>פתרונות נוספים מבית D&amp;B</span></h4>\n            <a href=\"#\"><span>קפטן קרדיט</span></a>\n            <a href=\"#\"><span>קפטן קרדיט לעסקים</span></a>\n            <a href=\"#\"><span>duns 100</span></a>\n            <a href=\"#\"><span>Dun's Guide</span></a>\n          </div>\n        </div>\n      </div>\n      </div>\n      <div class=\"bottom\" data-node=\"527:8490\">\n        <div class=\"credit\" data-node=\"132:722\">\n          <p dir=\"rtl\">עוצב ע״י מובאו קריאייטיב</p>\n          <img src=\"fig/moveo-mark.svg\" alt=\"Moveo\">\n        </div>\n        <p class=\"copy\">© 2026 Dun &amp; Bradstreet Israel · כל הזכויות שמורות</p>\n        <div class=\"legal\" data-node=\"131:558\">\n          <a href=\"#\">Terms of service</a>\n          <a href=\"#\">Workplace policy</a>\n          <a href=\"#\">מדיניות פרטיות</a>\n        </div>\n      </div>\n    </div>\n  </div>", "statsw": "<section class=\"fr\" id=\"statsw\" data-node=\"505:120722\">\n  <div id=\"stats\" data-node=\"505:120723\">\n    <div class=\"dotbg\" data-node=\"527:3629\"></div>\n    <div class=\"content\" data-node=\"505:120725\">\n      <div class=\"tag\"><p>נתונים מספריים</p><img src=\"fig/tag-dot.svg\" alt=\"\"></div>\n      <h2>הבסיס לכל <br>הצלחה עסקית</h2>\n    </div>\n    <div class=\"lists\" data-node=\"558:9173\">\n      <div class=\"slist r1\" data-node=\"558:9174\">\n        <div class=\"item\" data-node=\"558:9175\">\n          <p class=\"num\" dir=\"ltr\">1.8M</p>\n          <div class=\"cap\">\n            <p>חברות ועסקים במאגר המידע הישראלי</p>\n            <span class=\"node\"><img class=\"s\" src=\"fig/stat-node.svg\" alt=\"\"></span>\n          </div>\n        </div>\n        <div class=\"item\" data-node=\"558:9181\">\n          <p class=\"num\" dir=\"ltr\">65</p>\n          <div class=\"cap\">\n            <p>שנות פעילות בישראל</p>\n            <span class=\"node\"><img class=\"s\" src=\"fig/stat-node.svg\" alt=\"\"></span>\n          </div>\n        </div>\n      </div>\n      <div class=\"slist r2\" data-node=\"558:9188\">\n        <div class=\"item\" data-node=\"558:9189\">\n          <p class=\"num\" dir=\"ltr\">620M</p>\n          <div class=\"cap\">\n            <p>חברות במאגר המידע</p>\n            <span class=\"node\"><img class=\"s\" src=\"fig/stat-node.svg\" alt=\"\"></span>\n          </div>\n        </div>\n        <div class=\"item\" data-node=\"558:9196\">\n          <p class=\"num\" dir=\"ltr\">185</p>\n          <div class=\"cap\">\n            <p>שנות פעילות</p>\n            <span class=\"node\"><img class=\"s\" src=\"fig/stat-node.svg\" alt=\"\"></span>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</section>"};
  
  
  function txt(el, v) { if (el && v != null && v !== '') el.innerHTML = v; }

  var APPLY = {
    
    crumb: function (sec, c) {
      var box = sec.querySelector('.crumb-in'), n = (c.items || []).length;
      if (!n) { sec.remove(); return; }
      box.innerHTML = c.items.map(function (it, i) {
        var last = i === n - 1;
        var el = last
          ? '<span aria-current="page">' + it.t + '</span>'
          : '<a href="' + (it.href || '#') + '">' + it.t + '</a>';
        
        return el + (last ? '' : '<span class="sep" aria-hidden="true">\u00b7</span>');
      }).join('');
    },
    hdr: function (sec, c) {
      if (!c.on) return;
      [].forEach.call(sec.querySelectorAll('.mainnav a'), function (a) {
        if ((a.textContent || '').replace(/\s+/g, ' ').trim() === c.on) a.classList.add('on');
      });
    },
    guides: function (sec, c) {
      txt(sec.querySelector('.g-head h2'), c.h2);
      txt(sec.querySelector('.g-head .eyebrow span'), c.eb);
      txt(sec.querySelector('.g-head .btn-all .lbl'), c.cta);
      (c.cards || []).forEach(function (card, i) {
        var el = sec.querySelectorAll('.g-card')[i]; if (!el || !card) return;
        txt(el.querySelector('.g-tag p'), card.tag);
        txt(el.querySelector('.g-txt h3'), card.title);
        txt(el.querySelector('.g-txt p'), card.desc);
      });
    },
    ctaw: function (sec, c) {
      txt(sec.querySelector('#cta h2'), c.h2);
      txt(sec.querySelector('#cta .sub p'), c.sub);
      txt(sec.querySelector('#cta .sub .lbl'), c.cta);
      (c.chips || []).forEach(function (t, i) {
        var el = sec.querySelectorAll('.dchip .dcard p')[i]; txt(el, t);
      });
    },
    tst: function (sec, c) {
      txt(sec.querySelector('.head h2'), c.h2);
      txt(sec.querySelector('.head .lbl p'), c.eb);
      (c.quotes || []).forEach(function (q, i) {
        var el = sec.querySelectorAll('.card')[i]; if (!el || !q) return;
        txt(el.querySelector('.qm p'), q.text);
        txt(el.querySelector('.who .n b'), q.name);
        txt(el.querySelector('.who .n span'), q.role);
      });
    },
    faq: function (sec, c) {
      txt(sec.querySelector('.side h2'), c.h2);
      txt(sec.querySelector('.side .eb p'), c.eb);
      (c.items || []).forEach(function (it, i) {
        var el = sec.querySelectorAll('.qa')[i]; if (!el || !it) return;
        txt(el.querySelector('.q'), it.q);
        txt(el.querySelector('.a p'), it.a);
      });
    },
    trust: function (sec, c) { txt(sec.querySelector('.lbl p'), c.eb); },
    statsw: function (sec, c) {
      txt(sec.querySelector('.tag p, .tag span'), c.tag);
      txt(sec.querySelector('h2'), c.h2);
      (c.stats || []).forEach(function (st, i) {
        var fig = sec.querySelectorAll('.fig, .num')[i];
        var cap = sec.querySelectorAll('.cap, .lbl')[i];
        txt(fig, st.figure); txt(cap, st.caption);
      });
    },
    fb: function (sec, c) {
      txt(sec.querySelector('.nl h2'), c.h2);
      txt(sec.querySelector('.nl .eb p'), c.eb);
    }
  };

  document.querySelectorAll('[data-home]').forEach(function (mount) {
    var key = mount.getAttribute('data-home');
    if (!M[key]) return;
    var box = document.createElement('div');
    box.innerHTML = M[key];
    var sec = box.firstElementChild;

    var copy = {};
    var tag = mount.querySelector('script[type="application/json"]');
    if (tag) { try { copy = JSON.parse(tag.textContent) || {}; } catch (e) {} }
    if (mount.getAttribute('data-h2')) copy.h2 = mount.getAttribute('data-h2');
    if (mount.getAttribute('data-eb')) copy.eb = mount.getAttribute('data-eb');
    if (APPLY[key]) APPLY[key](sec, copy);

    
    if (key === 'fb' || key === 'hdr') sec.classList.add('standalone');

    mount.replaceWith(sec);

    
    var w = sec.getBoundingClientRect().width;
    if (w && w < 768) {
      sec.classList.add('m');
      
      [].forEach.call(sec.querySelectorAll('#fb,#cta,#statsw'), function (el) {
        el.classList.add('m');
      });
      [].forEach.call(sec.querySelectorAll('#fb'), footerDrops);
      if (sec.id === 'fb') footerDrops(sec);
    }
  });
})();
