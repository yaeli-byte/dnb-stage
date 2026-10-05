
(function () {
  
  var C = {"hero": {"eyebrow": "צמיחה עסקית", "h1": "שיווק ומכירות", "lede": "לדעת למי לפנות, לפני שאתם מרימים טלפון. כלים לאיתור, פילוח ויצירת קשר עם לקוחות פוטנציאליים - מיותר מ-1.8 מיליון עסקים בישראל ועד כ-500 מיליון חברות בעולם.", "cta": "לשיחה עם מומחה"}, "benefits": {"eyebrow": "יתרונות", "h2": "יתרונות לשיווק ומכירות חכמים", "items": ["לפנות רק למי שמתאים", "להגיע ישר למקבלי ההחלטות", "שווקים חדשים, בלי לנחש", "תקציב שיווק שעובד קשה יותר", "לדעת עם מי אתם מדברים", "לפנות בזמן הנכון"]}, "products": {"eyebrow": "מוצרים", "h2": "המוצרים בשיווק ומכירות", "lede": "מאגר עסקים ישראלי לצד פלטפורמה גלובלית: בחרו את נקודת ההתחלה לפי השוק שבו נמצאים הלקוחות הבאים שלכם."}, "hiw": {"eyebrow": "איך זה עובד", "h2": "מפרופיל ללקוח, בשלושה צעדים"}, "compare": {"eyebrow": "השוואה", "h2": "איזה מוצר מתאים לכם?", "lede": "שני המוצרים משלימים זה את זה. ההבדל העיקרי הוא איפה נמצאים הלקוחות הבאים שלכם.", "cols": ["ארגז כלים לשיווק ומכירות", "D&B Hoovers"], "rows": [{"k": "השוק", "a": "ישראל", "b": "ישראל והעולם"}, {"k": "היקף המאגר", "a": "יותר מ-1.8 מיליון עסקים", "b": "כ-500 מיליון חברות ויותר מ-300 מיליון אנשי קשר"}, {"k": "למי זה מתאים", "a": "מכירות ושיווק לעסקים בישראל", "b": "ייצוא, התרחבות לחו״ל וחברות גלובליות"}, {"k": "חוזקה מרכזית", "a": "פילוח מקומי מדויק ובדיקת חוסן פיננסי", "b": "מיפוי שווקים, מתחרים ומקבלי החלטות בעולם"}]}, "integ": {"eyebrow": "אינטגרציות"}};
  var t = function (e, s) { if (e && s) e.textContent = s; };
  function eb(el, s) {
    if (!el) return;
    var n = [].slice.call(el.childNodes).filter(function (x) {
      return x.nodeType === 3 && (x.nodeValue || '').trim(); })[0];
    if (n) n.nodeValue = s; else t(el, s);
  }
  function headed(re) {
    return [].slice.call(document.querySelectorAll('h2')).filter(function (h) {
      return re.test(h.textContent || ''); })[0];
  }

  function hero() {
    var h1 = document.querySelector('h1'); t(h1, C.hero.h1);
    var sec = h1 && h1.closest('section');
    if (sec) {
      eb(sec.querySelector('.eb, .eyebrow, .ns-eyebrow'), C.hero.eyebrow);
      var p = sec.querySelector('p'); t(p, C.hero.lede);
      t(sec.querySelector('.dnb-btn__label'), C.hero.cta);
    }
    document.title = 'D&B — שיווק ומכירות · עמוד פתרון';
  }

  function benefits() {
    var s = document.querySelector('.benefits'); if (!s) return;
    t(s.querySelector('h2'), C.benefits.h2);
    eb(s.querySelector('.eb, .eyebrow'), C.benefits.eyebrow);
    var cards = s.querySelectorAll('.bcard');
    C.benefits.items.forEach(function (x, i) {
      if (cards[i]) t(cards[i].querySelector('p'), x); });
  }

  function heads() {
    var p = headed(/המוצרים|מוצרים/); if (p) t(p, C.products.h2);
    var w = headed(/איך זה עובד|צעדים/); if (w) t(w, C.hiw.h2);
  }

  
  function compare() {
    if (document.querySelector('.cmp')) return;
    
    var anchor = headed(/המוצרים|מוצרים ב/) || headed(/איך זה עובד|צעדים/);
    var host = anchor && anchor.closest('section');
    if (!host || !host.parentNode) { host = document.querySelector('.benefits'); }
    if (!host || !host.parentNode) return;
    var C2 = C.compare;
    var head =
      '<div class="cmp__head">' +
        
        '<p class="cmp__eb"><i></i><span>' + C2.eyebrow + '</span><i></i></p>' +
        '<h2 class="cmp__h2">' + C2.h2 + '</h2>' +
        '<p class="cmp__lede">' + C2.lede + '</p>' +
      '</div>';
    var rows = C2.rows.map(function (r) {
      return '<tr><th scope="row">' + r.k + '</th><td>' + r.a + '</td><td>' + r.b + '</td></tr>';
    }).join('');
    var table =
      '<div class="cmp__card"><table class="cmp__t"><thead><tr><td></td>' +
        '<th scope="col">' + C2.cols[0] + '</th><th scope="col" dir="ltr">' + C2.cols[1] + '</th>' +
      '</tr></thead><tbody>' + rows + '</tbody></table></div>';
    var sec = document.createElement('section');
    sec.className = 'cmp'; sec.setAttribute('dir', 'rtl'); sec.setAttribute('data-sec', 'compare');
    sec.innerHTML = '<div class="cmp__in">' + head + table + '</div>';
    host.parentNode.insertBefore(sec, host.nextSibling);
  }

  function go() { hero(); benefits(); heads(); compare(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go);
  else go();
})();
