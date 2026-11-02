
(function () {
  if (window.__dnbBot) return; window.__dnbBot = 1;
  var BUBBLE = '<svg aria-hidden="true" width="26" height="26" viewBox="0 0 60 60" fill="currentColor"><circle cx="15.00" cy="11.00" r="1.6"/><circle cx="20.00" cy="11.00" r="1.6"/><circle cx="25.00" cy="11.00" r="1.6"/><circle cx="30.00" cy="11.00" r="1.6"/><circle cx="35.00" cy="11.00" r="1.6"/><circle cx="40.00" cy="11.00" r="1.6"/><circle cx="45.00" cy="11.00" r="1.6"/><circle cx="49.95" cy="13.05" r="1.6"/><circle cx="52.00" cy="18.00" r="1.6"/><circle cx="52.00" cy="23.33" r="1.6"/><circle cx="52.00" cy="28.67" r="1.6"/><circle cx="52.00" cy="34.00" r="1.6"/><circle cx="49.95" cy="38.95" r="1.6"/><circle cx="45.00" cy="41.00" r="1.6"/><circle cx="43.50" cy="46.00" r="1.6"/><circle cx="45.00" cy="51.00" r="1.6"/><circle cx="39.00" cy="46.00" r="1.6"/><circle cx="36.00" cy="43.50" r="1.6"/><circle cx="33.00" cy="41.00" r="1.6"/><circle cx="27.00" cy="41.00" r="1.6"/><circle cx="21.00" cy="41.00" r="1.6"/><circle cx="15.00" cy="41.00" r="1.6"/><circle cx="10.05" cy="38.95" r="1.6"/><circle cx="8.00" cy="34.00" r="1.6"/><circle cx="8.00" cy="28.67" r="1.6"/><circle cx="8.00" cy="23.33" r="1.6"/><circle cx="8.00" cy="18.00" r="1.6"/><circle cx="10.05" cy="13.05" r="1.6"/><circle cx="21.00" cy="26.00" r="2.72"/><circle cx="30.00" cy="26.00" r="2.72"/><circle cx="39.00" cy="26.00" r="2.72"/></svg>', DOTS = '<svg aria-hidden="true" width="14" height="4" viewBox="0 0 14 4"><g fill="currentColor"><circle cx="2" cy="2" r="1.4"/><circle cx="7" cy="2" r="1.4"/><circle cx="12" cy="2" r="1.4"/></g></svg>', XICON = '<svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12"><g fill="currentColor"><circle cx="1.0" cy="1.0" r="1"/><circle cx="11.0" cy="1.0" r="1"/><circle cx="3.5" cy="3.5" r="1"/><circle cx="8.5" cy="3.5" r="1"/><circle cx="6.0" cy="6.0" r="1"/><circle cx="6.0" cy="6.0" r="1"/><circle cx="8.5" cy="8.5" r="1"/><circle cx="3.5" cy="8.5" r="1"/><circle cx="11.0" cy="11.0" r="1"/><circle cx="1.0" cy="11.0" r="1"/></g></svg>', ARR = '<svg aria-hidden="true" width="12" height="12" viewBox="0 0 13 12"><g fill="currentColor"><circle cx="2" cy="6" r="1.1"/><circle cx="5" cy="6" r="1.1"/><circle cx="8" cy="6" r="1.1"/><circle cx="11" cy="6" r="1.1"/><circle cx="4.5" cy="3.5" r="1.1"/><circle cx="7" cy="1" r="1.1"/><circle cx="4.5" cy="8.5" r="1.1"/><circle cx="7" cy="11" r="1.1"/></g></svg>';
  var BOT = {
    name: 'דניאל', sub: 'הצוות יכול גם לעזור', meta: 'דניאל · <span dir="ltr">AI Agent</span> · ממש עכשיו',
    greeting: 'שלום, מה שלומך? באיזה נושא אוכל לסייע לך היום?',
    placeholder: 'כתבו הודעה...',
    topics: [
      { t: 'מוצרי מידע ואשראי', a: 'יש לנו מוצרי מידע שעוזרים להחליט על אשראי: דוחות, ניטור והתראות. מה תרצו לעשות?', inv: 1 },
      { t: 'מספר <span dir="ltr">D-U-N-S®</span>', plain: 'מספר D-U-N-S',
        a: 'מספר <span dir="ltr">D-U-N-S</span> הוא מזהה בן 9 ספרות שמזהה את העסק שלכם בכל העולם. מה תרצו לעשות?',
        card: { title: 'חיפוש מספר <span dir="ltr">D-U-N-S</span>', field: 'שם החברה או ח.פ.', act: 'לחיפוש' },
        quick: ['לבדוק אם יש לנו מספר', 'להנפיק מספר חדש', 'לדבר עם נציג'], suggested: 0, inv: 1 },
      { t: 'תמיכה במוצרי החברה', a: 'אפשר לקבל כאן תשובות על המוצרים שכבר אצלכם. על מה תרצו לשמוע?', inv: 1 },
      { t: 'אשראי פרטי - קפטן קרדיט', a: 'קפטן קרדיט הוא השירות שלנו לאשראי פרטי. מה תרצו לעשות?', inv: 1 },
      { t: 'פניות הציבור', a: 'אפשר להגיש פנייה כאן, או לדבר עם נציג.', inv: 1 }
    ],
    defaultQuick: ['חזרה לנושאים', 'לדבר עם נציג'],
    free: 'קיבלתי. אפשר לבחור נושא מהרשימה, או לדבר עם נציג.',
    agent: 'אפשר לפנות לנציג דרך טופס יצירת הקשר באתר.'
  };
  var RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function el(h) { var d = document.createElement('div'); d.innerHTML = h; return d.firstElementChild; }
  var launcher = el('<button type="button" class="dbot-l" id="dbotL" aria-expanded="false" aria-controls="dbotP"><span class="dbot-lt" aria-hidden="true">' + BUBBLE + '<i></i></span><span class="dbot-ll">דברו איתנו</span></button>');
  var panel = el('<div class="dbot-p" id="dbotP" role="dialog" aria-label="' + BOT.name + '" hidden>' +
    '<div class="dbot-h"><span class="dbot-av" aria-hidden="true">' + BUBBLE + '<i></i></span><div class="dbot-hn"><span class="dbot-n">' + BOT.name + '</span><span class="dbot-s">' + BOT.sub + '</span></div>' +
    '<span class="dbot-hb"><button type="button" class="dbot-ib" aria-label="תפריט" aria-disabled="true" title="לא עוצב בפרוטוטייפ הזה">' + DOTS + '</button>' +
    '<button type="button" class="dbot-ib dbot-x" aria-label="סגירה">' + XICON + '</button></span></div>' +
    '<div class="dbot-b" id="dbotB" aria-live="polite"></div><div class="dbot-q" id="dbotQ"></div>' +
    '<form class="dbot-c" id="dbotC" autocomplete="off"><input class="dbot-f" id="dbotF" type="text" placeholder="' + BOT.placeholder + '" aria-label="' + BOT.placeholder.replace('...', '') + '"><button type="submit" class="dbot-snd" aria-label="שליחה">' + ARR + '</button></form></div>');
  var body, quick, field, busy = false, opened = false, built = false;
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function scroll() { body.scrollTop = body.scrollHeight; }
  function add(h) { body.appendChild(h); scroll(); return h; }
  function bot(html, meta) {
    return add(el('<div class="dbot-m"><div class="dbot-bb">' + html + '</div>' + (meta === false ? '' : '<span class="dbot-mt">' + BOT.meta + '</span>') + '</div>'));
  }
  function user(html) { return add(el('<div class="dbot-ub">' + html + '</div>')); }
  function typing() { return add(el('<div class="dbot-m"><div class="dbot-bb dbot-ty" aria-label="דניאל מקלידה"><i></i><i></i><i></i></div></div>')); }
  function chips(list, suggested) {
    quick.innerHTML = '';
    list.forEach(function (l, i) {
      var b = el('<button type="button" class="dbot-ch' + (i === suggested ? ' is-sug' : '') + '"><span>' + (l.t || l) + '</span>' + ARR + '</button>');
      b.addEventListener('click', function () { l.go ? l.go() : quickClick(String(l)); });
      quick.appendChild(b);
    });
  }
  function topics() {
    chips(BOT.topics.map(function (t) { return { t: t.t, go: function () { say(t); } }; }));
  }
  function reply(fn) {
    busy = true; var ty = typing();
    setTimeout(function () { ty.remove(); fn(); busy = false; }, RM ? 120 : 1100);
  }
  function say(t) {
    if (busy) return; user(t.t); quick.innerHTML = '';
    reply(function () {
      bot(t.a);
      if (t.card) add(el('<div class="dbot-cd"><span class="dbot-ct">' + t.card.title + '</span><span class="dbot-cf">' + t.card.field + '</span><span class="dbot-ca">' + t.card.act + ARR + '</span></div>'));
      chips((t.quick || BOT.defaultQuick), t.suggested);
    });
  }
  function quickClick(l) {
    if (busy) return;
    if (l === 'חזרה לנושאים') { user(l); quick.innerHTML = ''; reply(function () { bot(BOT.greeting); topics(); }); return; }
    if (l === 'לדבר עם נציג') {
      user(l); quick.innerHTML = '';
      reply(function () {
        bot(BOT.agent);
        chips([{ t: 'צרו קשר', go: function () { var b = [].slice.call(document.querySelectorAll('a,button')).filter(function (x) { return !panel.contains(x) && /^\s*צרו קשר/.test(x.textContent); })[0]; close(); if (b) b.click(); } }, { t: 'חזרה לנושאים', go: function () { quickClick('חזרה לנושאים'); } }]);
      });
      return;
    }
    user(esc(l)); quick.innerHTML = ''; reply(function () { bot(BOT.free); chips(BOT.defaultQuick); });
  }
  function open() {
    if (opened) return; opened = true;
    if (!built) { built = true; build(); }
    panel.hidden = false; launcher.setAttribute('aria-expanded', 'true');
    void panel.offsetWidth; panel.classList.add('is-open');
    if (window.matchMedia('(max-width:767.98px)').matches) document.documentElement.classList.add('dbot-lock');
    setTimeout(function () { field.focus({ preventScroll: true }); }, RM ? 0 : 60);
  }
  function close() {
    if (!opened) return; opened = false;
    panel.classList.remove('is-open'); launcher.setAttribute('aria-expanded', 'false'); document.documentElement.classList.remove('dbot-lock');
    setTimeout(function () { if (!opened) panel.hidden = true; }, RM ? 0 : 250);
    launcher.focus({ preventScroll: true });
  }
  function build() {
    document.body.appendChild(panel); body = panel.querySelector('#dbotB'); quick = panel.querySelector('#dbotQ'); field = panel.querySelector('#dbotF');
    bot(BOT.greeting); topics();
    panel.querySelector('.dbot-x').addEventListener('click', close);
    panel.querySelector('#dbotC').addEventListener('submit', function (e) {
      e.preventDefault(); var v = field.value.trim(); if (!v || busy) return; field.value = ''; quickClick(v);
    });
  }
  launcher.addEventListener('click', function () { opened ? close() : open(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && opened) { e.stopPropagation(); close(); } });
  function mount() { document.body.appendChild(launcher); }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
})();
