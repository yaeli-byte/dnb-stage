
(function () {
  
  var C = {"hero": {"eyebrow": "צמיחה עסקית", "h1": "לצמוח עם הלקוחות הנכונים,<br>בישראל ובעולם.", "lede": "לאתר לקוחות לפי פרופיל מדויק, להגיע למקבלי ההחלטות ולחדור לשווקים חדשים - על בסיס מאגר הנתונים של", "cta": "לשיחה עם מומחה"}, "about": {"eyebrow": "אתגרים", "h2": "מה זה צמיחה עסקית מבוססת נתונים?", "lede": "צמיחה עסקית היא הגדלת הכנסות, הרחבת בסיס הלקוחות וכניסה לשווקים חדשים. כשהיא נשענת על מידע עסקי אמין, יודעים למי לפנות, איפה ומתי.", "blocks": [{"h": "למי כדאי לפנות עכשיו?", "t": "רשימות כלליות מבזבזות זמן ותקציב על לידים שלא יגיעו לסגירה.", "ico": "search"}, {"h": "איפה נמצאים הלקוחות הבאים שלנו?", "t": "שוק חדש, בארץ או בחו״ל, מתחיל בהיכרות עם הלקוחות, המתחרים והשותפים שבו.", "ico": "globe"}, {"h": "איך לקוחות ושותפים חדשים ימצאו אותנו?", "t": "בשוק תחרותי, עסק שלא נראה ולא מוכר מפספס הזדמנויות.", "ico": "trendup"}]}, "benefits": {"eyebrow": "יתרונות", "h2": "יתרונות לצמיחה עסקית חכמה", "items": ["איתור לקוחות חדשים לפי פרופיל הלקוח האידיאלי שלכם", "גישה ישירה למקבלי ההחלטות בחברות שאתם רוצים להגיע אליהן", "מידע על שווקים, לקוחות ושותפים - בישראל ובעולם", "חותם של מובילות ואיתנות שמחזק את האמון בעסק", "חשיפה מול קהל עסקי וצרכני שמחפש ספקים ושותפים", "מידע שוטף על מכרזים והזדמנויות בתחום שלכם"]}, "solutions": {"eyebrow": "הפתרונות", "h2": "שני פתרונות, מטרה אחת: לצמוח", "lede": "פתרון אחד עוזר לכם למצוא לקוחות. השני עוזר ללקוחות למצוא אתכם.", "names": ["שיווק ומכירות", "הזדמנויות עסקיות"]}};
  
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

  


  function go() { hero(); benefits(); solutions();
    
    if (window.DNB_BUILD_ABOUT) window.DNB_BUILD_ABOUT(C.about); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go);
  else go();
})();
