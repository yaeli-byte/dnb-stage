
(function () {
  
  var C = {"hero": {"eyebrow": "צמיחה עסקית", "h1": "לצמוח עם הלקוחות הנכונים,<br>בישראל ובעולם.", "lede": "לאתר לקוחות לפי פרופיל מדויק, להגיע למקבלי ההחלטות ולחדור לשווקים חדשים - על בסיס מאגר הנתונים של", "cta": "לשיחה עם מומחה"}, "about": {"eyebrow": "על צמיחה עסקית", "h2": "מה זה צמיחה עסקית מבוססת נתונים?", "lede": "צמיחה עסקית היא הגדלת הכנסות, הרחבת בסיס הלקוחות וכניסה לשווקים חדשים. כשהיא נשענת על מידע עסקי אמין, יודעים למי לפנות, איפה ומתי.", "blocks": [{"h": "איתור לקוחות ולידים עסקיים", "t": "רשימות ממוקדות מתוך מאגר של יותר מ-1.8 מיליון עסקים בישראל."}, {"h": "פיתוח עסקי והתרחבות לחו״ל", "t": "מידע על כ-500 מיליון חברות למיפוי שווקים, לקוחות ושותפים."}, {"h": "מוניטין, חשיפה והזדמנויות", "t": "חיזוק הנראות והאמון בעסק, כדי שלקוחות ושותפים חדשים ימצאו אתכם."}]}, "benefits": {"eyebrow": "יתרונות", "h2": "יתרונות לצמיחה עסקית חכמה", "items": ["איתור לקוחות חדשים לפי פרופיל הלקוח האידיאלי שלכם", "גישה ישירה למקבלי ההחלטות בחברות שאתם רוצים להגיע אליהן", "חדירה לשווקים חדשים, בישראל ובעולם", "מיקוד מאמצי השיווק והמכירות בלידים עם הסיכוי הגבוה ביותר", "בדיקת האיתנות של לקוח פוטנציאלי עוד לפני הפגישה הראשונה", "חשיפה, מוניטין ומיתוג מול קהילת העסקים בישראל"]}, "solutions": {"eyebrow": "הפתרונות", "h2": "שני פתרונות, מטרה אחת: לצמוח", "lede": "פתרון אחד עוזר לכם למצוא לקוחות. השני עוזר ללקוחות למצוא אתכם.", "names": ["שיווק ומכירות", "הזדמנויות עסקיות"]}};
  
  var t = function (el, s) {
    if (!el || !s) return;
    if (s.indexOf('<br>') < 0) { el.textContent = s; return; }
    el.textContent = '';
    s.split('<br>').forEach(function (part, i) {
      if (i) el.appendChild(document.createElement('br'));
      el.appendChild(document.createTextNode(part));
    });
  };
  function ebText(el, s) {           
    if (!el) return;
    var n = [].slice.call(el.childNodes).filter(function (x) {
      return x.nodeType === 3 && (x.nodeValue || '').trim(); })[0];
    if (n) n.nodeValue = s; else t(el, s);
  }

  function hero() {
    var h = document.querySelector('section.fh') || document.querySelector('section.fam-hero');
    if (!h) { var h1 = document.querySelector('h1');
      for (var n = h1; n && n !== document.body; n = n.parentNode)
        if (n.tagName === 'SECTION') { h = n; break; } }
    if (!h) return;
    t(h.querySelector('h1, .fh__title'), C.hero.h1);
    t(h.querySelector('.fh__lede') || h.querySelector('p'), C.hero.lede);
    ebText(h.querySelector('.fh__eyebrow, .eb, .eyebrow'), C.hero.eyebrow);
    t(h.querySelector('.dnb-btn__label'), C.hero.cta);
    document.title = 'D&B — צמיחה עסקית · משפחת פתרונות';
  }

  function benefits() {
    var s = document.querySelector('.benefits'); if (!s) return;
    t(s.querySelector('h2'), C.benefits.h2);
    ebText(s.querySelector('.eb, .eyebrow'), C.benefits.eyebrow);
    var cards = s.querySelectorAll('.bcard');
    C.benefits.items.forEach(function (txt, i) {
      if (cards[i]) t(cards[i].querySelector('p'), txt);
    });
  }

  
  function solutions() {
    var heads = [].slice.call(document.querySelectorAll('h2'));
    var h2 = heads.filter(function (e) {
      return /פתרונות|הפתרונות/.test(e.textContent || '') && !e.closest('.benefits'); })[0];
    if (h2) t(h2, C.solutions.h2);
  }

  
  function about() {
    if (document.querySelector('.abtsec')) return;
    var host = null;
    [].forEach.call(document.querySelectorAll('h2'), function (h) {
      if (host) return;
      if ((h.textContent || '').indexOf('\u05d9\u05ea\u05e8\u05d5\u05e0\u05d5\u05ea') < 0) return;
      for (var n = h; n && n !== document.body; n = n.parentNode)
        if (n.tagName === 'SECTION') { host = n; break; }
    });
    if (!host || !host.parentNode) return;
    var rows = (C.about.blocks || []).map(function (b) {
      return '<li class="abt__row"><span class="abt__ico" aria-hidden="true"></span>' +
             '<span class="abt__tx"><b>' + b.h + '</b><span>' + b.t + '</span></span></li>';
    }).join('');
    var sec = document.createElement('section');
    sec.className = 'abtsec'; sec.setAttribute('dir', 'rtl');
    sec.setAttribute('data-sec', 'about');
    sec.innerHTML =
      '<div class="abt__in">' +
        '<div class="abt__head">' +
          
          '<p class="abt__eb"><i></i><span>' + (C.about.eyebrow || '') + '</span><i></i></p>' +
          '<h2>' + C.about.h2 + '</h2>' +
          '<p class="abt__lede">' + C.about.lede + '</p>' +
        '</div>' +
        '<ul class="abt__list">' + rows + '</ul>' +
      '</div>';
    host.parentNode.insertBefore(sec, host.nextSibling);
  }


  function go() { hero(); benefits(); solutions(); about(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go);
  else go();
})();
