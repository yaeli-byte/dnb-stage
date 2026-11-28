
(function () {
  if (!document.querySelector('script[src*="home-sections.js"]')) return;
  var T =
'<section class="pf-c"><div class="dots" aria-hidden="true"></div><div class="in">' +
  '<div class="eb"><i></i><b dir="auto">פנו אלינו</b><i></i></div>' +
  '<h2 dir="auto">לא מצאתם מה שחיפשתם? <br>צרו קשר לפרטים נוספים</h2>' +
  '<a class="dnb-btn dnb-btn--lite" href="#"><span class="dnb-btn__badge"><img src="fig/btn-arrow-dark.svg" alt=""></span><span class="dnb-btn__label" dir="auto">צרו קשר</span></a>' +
'</div></section>' +
'<footer class="pf-f"><div class="dots"></div>' +
  '<div class="brand"><img class="mark" src="fig/logo-tagline-white.png" alt="dun &amp; bradstreet — לדעת להחליט"></div>' +
  '<div class="sp" style="height:35.72px"></div>' +
  '<div class="soc"><a href="#" aria-label="LinkedIn"><img src="fig/soc-li.svg" alt=""></a><a href="#" aria-label="X"><img src="fig/soc-x.svg" alt=""></a><a href="#" aria-label="YouTube"><img src="fig/soc-yt.svg" alt=""></a></div>' +
  '<div class="sp" style="height:26px"></div>' +
  '<div class="nl"><div class="eb"><b dir="auto">ניוזלטר</b></div><div class="sp" style="height:16px"></div>' +
    '<h2 dir="auto">הירשמו לניוזלטר שלנו וקבלו את התובנות שלנו ישירות למייל</h2><div class="sp" style="height:16px"></div>' +
    '<form class="nlf" onsubmit="return false"><button class="dnb-btn dnb-btn--lite" type="submit"><span class="dnb-btn__badge"><img src="fig/btn-arrow-dark.svg" alt=""></span><span class="dnb-btn__label" dir="auto">הרשמה</span></button>' +
    '<span class="field"><input type="email" placeholder="כתובת אימייל" aria-label="כתובת אימייל"></span></form></div>' +
  '<div class="sp" style="height:30px"></div>' +
  '<nav class="cols">' +
    D('הפתרונות', [['h','ניהול סיכוני אשראי'],'סיכוני אשראי עסקי','סיכוני אשראי צרכני',['x','לאתר הדוחות'],['h','ניהול דאטה ו-AI'],'Master Data','API','AI',['h','צמיחה עסקית'],'שיווק ומכירות','DUNS 100',['h','ניהול סיכוני צד שלישי'],'סיכוני ספקים','סיכוני ציות ורגולציה',['h','פתרונות נוספים מבית D&amp;B'],'לשכת אשראי','קפטן קרדיט','קפטן קרדיט לעסקים','duns 100',"Dun's Guide"]) +
    D('פתרונות לפי תעשיות', ['ייבוא וייצוא','ייצור ותעשייה','בנייה, תשתיות ונדל״ן','טכנולוגיה ותוכנה','פיננסים, ביטוח ואשראי']) +
    D('למה D&amp;B?', ['הסיפור שלנו','מאחורי הדאטה שלנו','הצטרפו אלינו']) +
    D('מרכז המידע', ['לקוחות מספרים','הבלוג שלנו']) +
    '<div class="flat"><a href="#" dir="auto">מספר D-U-N-S</a></div>' +
  '</nav><div class="sp" style="height:43px"></div>' +
  '<div class="legal"><div class="row"><a href="#">מדיניות פרטיות</a><a href="#">תנאי השימוש</a></div><div class="rule"></div>' +
    '<p class="copy" dir="ltr">© 2026 Dun &amp; Bradstreet Israel · כל הזכויות שמורות</p>' +
    '<p class="credit"><span dir="rtl">עוצב ע״י מובאו קריאייטיב</span><img src="fig/moveo-mark.svg" alt="Moveo"></p></div>' +
'</footer>';
  function D(title, items) {
    return '<div class="d"><button class="sm" type="button" aria-expanded="false"><span class="pm"><i class="h"></i><i class="v"></i></span><span dir="auto">' + title + '</span></button>' +
      '<div class="panel"><div class="pin">' + items.map(function (i) { return Array.isArray(i) ? (i[0] === 'x' ? '<a href="#" class="fx"><span dir="auto">' + i[1] + '</span></a>' : '<h5><span dir="auto">' + i[1] + '</span></h5>') : '<a href="#"><span dir="auto">' + i + '</span></a>'; }).join('') + '</div></div></div>';
  }
  var H = document.documentElement;
  function isPhone() { return H.hasAttribute('data-m') || H.clientWidth < 768; }
  function mount() {
    var fb = document.querySelector('#fb');
    if (!fb) return;
    var host = fb.closest('#faq') || fb;
    var pf = document.getElementById('pf');
    if (!pf) {
      pf = document.createElement('div'); pf.id = 'pf'; pf.innerHTML = T;
      host.parentNode.insertBefore(pf, host.nextSibling);
      [].forEach.call(pf.querySelectorAll('.sm'), function (b) {
        b.addEventListener('click', function () {
          var d = b.closest('.d'), open = d.classList.toggle('open');
          b.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
      });
    }
  }
  function sync() {
    var on = isPhone();
    if (on) mount();
    var live = on && !!document.getElementById('pf');
    H.classList.toggle('pf-on', live);
    [].forEach.call(document.querySelectorAll('#fb'), function (f) { if (live) f.style.setProperty('display', 'none', 'important'); else f.style.removeProperty('display'); });
  }
  var t; function later() { clearTimeout(t); t = setTimeout(sync, 80); }
  window.addEventListener('resize', later);
  window.addEventListener('load', sync);
  
  var n = 0, iv = setInterval(function () { sync(); if (document.getElementById('pf') || ++n > 40) clearInterval(iv); }, 250);
  sync();
  
  function spaceBr() {
    [].forEach.call(document.querySelectorAll('#guides .g-txt h3 br:not([data-sp])'), function (br) {
      br.setAttribute('data-sp', '1');
      if (!/\s$/.test((br.previousSibling && br.previousSibling.textContent) || ' ')) br.parentNode.insertBefore(document.createTextNode(' '), br);
    });
  }
  var n2 = 0, iv2 = setInterval(function () { spaceBr(); if (++n2 > 24) clearInterval(iv2); }, 250);
})();
