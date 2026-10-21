
(function () {
  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;

  
  [].forEach.call(document.querySelectorAll('[data-tl]'), function (r) {
    [].forEach.call(r.querySelectorAll('[data-ty]'), function (y) {
      var go = function () { r.setAttribute('data-a', y.dataset.i); };
      y.setAttribute('tabindex', '0'); y.setAttribute('role', 'button');
      y.addEventListener('mouseenter', go); y.addEventListener('click', go); y.addEventListener('focus', go);
      y.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    });
  });

  
  var S = [
 {
  "img": "fig/cd/about/be86929d99df.jpg",
  "year": "1841",
  "text": "לואיס טאפן מקים בניו יורק את <span dir=\"ltr\" style=\"unicode-bidi:isolate; white-space:nowrap\">The Mercantile Agency</span>."
 },
 {
  "img": "fig/cd/about/1850101348db.jpg",
  "year": "1933",
  "text": "<span dir=\"ltr\" style=\"unicode-bidi:isolate; white-space:nowrap\">R.G. Dun</span> והמתחרה <span dir=\"ltr\" style=\"unicode-bidi:isolate; white-space:nowrap\">Bradstreet</span> מתמזגות לדן אנד ברדסטריט."
 },
 {
  "img": "fig/cd/about/e0abb4ed9016.jpg",
  "year": "1961",
  "text": "דן אנד ברדסטריט מגיעה לישראל."
 },
 {
  "img": "fig/cd/about/97835f05b537.jpg",
  "year": "1963",
  "text": "השקת מספר <span dir=\"ltr\" style=\"unicode-bidi:isolate; white-space:nowrap\">D-U-N-S</span>, המזהה העסקי הבינלאומי."
 },
 {
  "img": "fig/cd/about/404fb3e0d3f6.jpg",
  "year": "1981",
  "text": "דירוג <span dir=\"ltr\" style=\"unicode-bidi:isolate; white-space:nowrap\">Dun’s 100</span> מתפרסם לראשונה."
 },
 {
  "img": "fig/cd/about/51e8ff3314c0.jpg",
  "year": "1987",
  "text": "המאגר העסקי עובר לניהול ממוחשב מלא."
 },
 {
  "img": "fig/cd/about/e0abb4ed9016.jpg",
  "year": "1992",
  "text": "השקת שירות להערכת סיכוני אשראי ללקוחות עסקיים."
 },
 {
  "img": "fig/cd/about/15b96f95cefd.jpg",
  "year": "1996",
  "text": "הרחבת הפעילות לניטור ובקרת אשראי שוטפים."
 },
 {
  "img": "fig/cd/about/fc938f8a0bba.jpg",
  "year": "2000",
  "text": "אתר הלקוחות הראשון: מידע עסקי זמין בלחיצה."
 },
 {
  "img": "fig/cd/about/e69db4b0ca95.jpg",
  "year": "2005",
  "text": "חיזוק החיבור לרשת העולמית של Dun &amp; Bradstreet."
 },
 {
  "img": "fig/cd/about/15b96f95cefd.jpg",
  "year": "2009",
  "text": "השקת מוצרי צמיחה ושיווק מבוססי נתונים."
 },
 {
  "img": "fig/cd/about/815f2c2e54c1.jpg",
  "year": "2013",
  "text": "שיתוף פעולה עם גלובס בדירוג <span dir=\"ltr\" style=\"unicode-bidi:isolate; white-space:nowrap\">Dun’s 100</span>."
 },
 {
  "img": "fig/cd/about/0a0e8900a08f.jpg",
  "year": "2016",
  "text": "הרחבת הפעילות לאמריקה הלטינית, <span dir=\"ltr\" style=\"unicode-bidi:isolate; white-space:nowrap\">CIAL Dun &amp; Bradstreet</span>."
 },
 {
  "img": "fig/cd/about/a54d007a40ca.jpg",
  "year": "2018",
  "text": "פיתוח פתרונות לניהול סיכוני ספקים."
 },
 {
  "img": "fig/cd/about/fc938f8a0bba.jpg",
  "year": "2020",
  "text": "מעבר מלא לשירותים דיגיטליים ול-API."
 },
 {
  "img": "fig/cd/about/59bf8c41d7bb.png",
  "year": "2022",
  "text": "שילוב בינה מלאכותית בניתוח הנתונים והדירוגים."
 },
 {
  "img": "fig/cd/about/51e8ff3314c0.jpg",
  "year": "2024",
  "text": "השקת מרכז המידע ופלטפורמת הלקוחות החדשה."
 },
 {
  "img": "fig/cd/about/6e4105f9bcfe.jpg",
  "year": "2026",
  "text": "יותר מ-185 שנות מידע עסקי, והכול מחובר בפלטפורמה אחת."
 }
];
  (function () {
    var sec = document.querySelector('section[aria-label="ההיסטוריה שלנו"]'); if (!sec) return;
    var axis = sec.querySelector('[data-mtl-axis]'); if (!axis) return;
    var card = sec.querySelector('[style*="padding:8px 8px 24px"][style*="background-color:#FFFFFF"], [style*="padding: 8px 8px 24px"]');
    if (!card) return;
    
    var tpl = card.cloneNode(true), track = document.createElement('div'), cards = [];
    track.className = 'mtl-track'; track.setAttribute('role', 'group'); track.setAttribute('aria-label', 'ציר הזמן');
    S.forEach(function (y, k) {
      var c = tpl.cloneNode(true); c.classList.add('mtl-card'); c.setAttribute('aria-label', y.year);
      var im = c.querySelector('img'), yr = c.querySelector('span[dir="ltr"]'), tx = c.lastElementChild;
      im.src = y.img; im.alt = ''; if (k > 1) im.loading = 'lazy'; yr.textContent = y.year; tx.innerHTML = y.text;
      track.appendChild(c); cards.push(c);
    });
    card.parentNode.replaceChild(track, card);
    var line = axis.firstElementChild.outerHTML;
    var YA = "font-family:'Space Grotesk',sans-serif; font-feature-settings:'lnum' 1,'tnum' 1; white-space:nowrap";
    function tick(k, on) {
      return '<span data-k="' + k + '" role="button" tabindex="0" aria-label="' + S[k].year + '"' + (on ? ' aria-current="true"' : '') +
        ' style="position:relative; display:flex; flex-direction:column; align-items:center; gap:10px; width:56px; cursor:pointer">' +
        '<i style="display:block; width:' + (on ? 12 : 7) + 'px; height:' + (on ? 12 : 7) + 'px; margin-top:' + (on ? -6 : -3.5) + 'px; border-radius:50%; background-color:' + (on ? '#0083A1' : '#93A1AB') + '; transition:all .25s"></i>' +
        '<span dir="ltr" style="' + YA + '; font-size:' + (on ? 18 : 16) + 'px; font-weight:' + (on ? 500 : 300) + '; color:' + (on ? '#0083A1' : '#93A1AB') + '">' + S[k].year + '</span></span>';
    }
    var i = -1;
    function paintAxis(k) {
      if (k === i) return; i = k;
      cards.forEach(function (c, j) { c.classList.toggle('is-cur', j === k); });
      var start = Math.max(0, Math.min(k - 2, S.length - 5));
      axis.innerHTML = line + [0, 1, 2, 3, 4].map(function (o) { return tick(start + o, start + o === k); }).join('');
    }
    function nearest() {
      var r = track.getBoundingClientRect(), mid = r.left + r.width / 2, best = 0, bd = 1e9;
      cards.forEach(function (c, j) { var cr = c.getBoundingClientRect(), d = Math.abs(cr.left + cr.width / 2 - mid); if (d < bd) { bd = d; best = j; } });
      return best;
    }
    function go(k, instant) {
      k = Math.max(0, Math.min(S.length - 1, k));
      cards[k].scrollIntoView({ behavior: (reduce || instant) ? 'auto' : 'smooth', inline: 'center', block: 'nearest' });
      paintAxis(k);
    }
    var raf = 0;
    track.addEventListener('scroll', function () { if (raf) return; raf = requestAnimationFrame(function () { raf = 0; paintAxis(nearest()); }); }, { passive: true });
    axis.addEventListener('click', function (e) { var t = e.target.closest('[data-k]'); if (t) go(+t.dataset.k); });
    axis.addEventListener('keydown', function (e) {
      var t = e.target.closest('[data-k]'); if (t && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); go(+t.dataset.k); }
    });
    paintAxis(0);
  })();

  
  var PEOPLE = [
 [
  "fig/cd/about/6386d3036c59.jpg",
  "דורון כהן",
  "יו״ר ומנכ״ל",
  "35 שנות ניסיון בבניית עסקים גלובליים בתחומי הדאטה והפינטק. יו״ר דן אנד ברדסטריט ישראל ולשכת האשראי לצרכן מאז 2002, וממייסדי רשת D&amp;B Worldwide Network.",
  ""
 ],
 [
  "fig/cd/about/88cc65cf9e5c.jpg",
  "אריאל שרייבר",
  "משנה למנכ״ל",
  "25 שנות ניסיון בניהול מכירות, שיווק, שירות ופיתוח עסקי. לפני כן ניהל את YouPhone, ו-13 שנים בפרטנר.",
  ""
 ],
 [
  "fig/cd/about/cb1eb456b072.jpg",
  "משה ידגר",
  "מנכ״ל לשכת אשראי לישראל",
  "יותר מ-20 שנות ניסיון בהובלת פרויקטי תוכנה ומחשוב, כולל בסטארט-אפים שנרכשו על ידי מיקרוסופט ו-EMC.",
  ""
 ],
 [
  "fig/cd/about/94296cb560b7.jpg",
  "טלאור ינאי",
  "סמנכ״לית כספים",
  "רואת חשבון, עם יותר מעשור בתפקידי כספים ואסטרטגיה בחברות גלובליות, בהן ThriveDX ו-BCG.",
  ""
 ],
 [
  "fig/cd/about/4aa5f0e4fac0.jpg",
  "רוני אלפרן",
  "סמנכ״ל דאטה ומוצרים",
  "הצטרף ב-2022. מוביל פרויקטי דאטה, אנליטיקה ו-BI, אחרי כ-15 שנים בביקורת פנימית בבנק לאומי, בשטראוס ובחברות גדולות נוספות.",
  ""
 ],
 [
  "fig/cd/about/3594b9de5f4c.jpg",
  "עידו לדר",
  "סמנכ״ל מכירות Duns100 ודנסגייד",
  "יותר מ-15 שנות ניסיון בניהול בכיר. לפני כן סמנכ״ל מכירות ותפעול ב״הדקה ה-90״ ומנהל חטיבת לקוחות עסקיים בפרטנר.",
  ""
 ]
];
  (function () {
    var pop = document.querySelector('.mg-pop'); if (!pop) return;
    var card = pop.querySelector('.mg-card'), last = null;
    function open(p, from) {
      last = from;
      var im = pop.querySelector('.mg-ph img'); im.src = p[0]; im.alt = p[1];
      pop.querySelector('.mg-nm').textContent = p[1]; pop.querySelector('.mg-rl').textContent = p[2];
      var bio = pop.querySelector('.mg-bio'); bio.innerHTML = p[3]; bio.setAttribute('data-invented', '');
      var li = pop.querySelector('.mg-li'), a = li.querySelector('a');
      li.hidden = false; a.href = p[4] || '#';   
      a.onclick = p[4] ? null : function (e) { e.preventDefault(); };
      pop.setAttribute('aria-label', p[1]); pop.setAttribute('aria-hidden', 'false'); pop.classList.add('is-open');
      document.documentElement.style.overflow = 'hidden';
      pop.querySelector('.mg-x').focus({ preventScroll: true });
    }
    function close() {
      pop.classList.remove('is-open'); pop.setAttribute('aria-hidden', 'true');
      document.documentElement.style.overflow = '';
      if (last) last.focus({ preventScroll: true });
    }
    pop.querySelector('.mg-x').addEventListener('click', close);
    pop.addEventListener('click', function (e) { if (!card.contains(e.target)) close(); });
    document.addEventListener('keydown', function (e) {
      if (!pop.classList.contains('is-open')) return;
      if (e.key === 'Escape') { close(); return; }
      if (e.key !== 'Tab') return;
      var f = [].slice.call(pop.querySelectorAll('button, a[href]')).filter(function (n) { return n.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], lastEl = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); }
      else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
    });
    var byName = function (n) { return PEOPLE.filter(function (p) { return n.indexOf(p[1]) > -1; })[0]; };
    
    [].forEach.call(document.querySelectorAll('a.mgc'), function (a) {
      var nameEl = a.querySelector('.tx > span'), p = nameEl && byName(nameEl.textContent); if (!p) return;
      var d = document.createElement('div'); d.className = a.className; d.setAttribute('style', a.getAttribute('style') || '');
      while (a.firstChild) d.appendChild(a.firstChild);
      a.parentNode.replaceChild(d, a); a = d;
      [].forEach.call(a.querySelectorAll('.tx'), function (t, i) { if (i > 0) t.remove(); });      
      var info = a.querySelector('.tx'), bio = document.createElement('span');
      bio.className = 'mgc-bio'; bio.setAttribute('data-invented', ''); bio.innerHTML = p[3]; info.appendChild(bio);
      var li = document.createElement('span'); li.className = 'tx mgc-li';
      li.innerHTML = '<a class="mgc-li-a" href="' + (p[4] || '#') + '" aria-label="לפרופיל בלינקדאין של ' + p[1] + '"' + (p[4] ? ' target="_blank" rel="noopener"' : '') + '><i></i></a>';
      li.firstChild.addEventListener('click', function (e) { e.stopPropagation(); if (!p[4]) e.preventDefault(); });
      a.appendChild(li);
    });
    [].forEach.call(document.querySelectorAll('a.mgc, div.mgc, section[aria-label="הנהלה"] a[aria-label]'), function (a) {
      var nm = a.getAttribute('aria-label') || (a.querySelector('.tx > span') || a).textContent;
      var p = byName(nm); if (!p) return;
      a.setAttribute('role', 'button'); a.setAttribute('aria-haspopup', 'dialog'); a.setAttribute('tabindex', '0');
      a.addEventListener('click', function (e) { e.preventDefault(); open(p, a); });
      a.addEventListener('keydown', function (e) { if (e.target === a && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); open(p, a); } });
    });
  })();
})();


(function () {
  [/לדעת להחליט/, /האנשים שמובילים/].forEach(function (re) {
    var s = [].slice.call(document.querySelectorAll('section')).filter(function (x) { var h = x.querySelector('h2'); return h && re.test(h.textContent); })[0];
    if (!s) return;
    [].forEach.call(s.querySelectorAll('span[aria-hidden="true"][style*="radial-gradient(circle at center"]'), function (d) {
      if (/inset:\s*0/.test(d.getAttribute('style'))) d.style.display = 'none';
    });
  });
})();


(function () {
  var PM_STATIC_MAX = 6;
  var sec = document.querySelector('section[aria-label="השותפים שלנו"]'); if (!sec) return;
  [].forEach.call(sec.querySelectorAll('span[dir="ltr"]'), function (n) {
    if (n.textContent.trim() === '195') { var c = n.closest('div[style*="height:220px"], div[style*="height: 220px"]'); if (c) c.remove(); }
  });
  var pm = sec.querySelector('.pm'), run = pm && pm.querySelector('.pm-run'); if (!run) return;
  var seen = {}, tiles = [];
  [].forEach.call(run.children, function (t) {
    var im = t.querySelector('img'), k = im ? im.alt : t.textContent;
    if (!seen[k]) { seen[k] = 1; tiles.push(t.cloneNode(true)); }
  });
  var mk = function (list, cls) {
    var ul = document.createElement('div'); ul.className = cls;
    list.forEach(function (t) { var c = t.cloneNode(true); c.removeAttribute('style'); c.className = 'pm2-tile'; c.setAttribute('style', t.getAttribute('style').replace(/width:150px;?/, '')); ul.appendChild(c); });
    return ul;
  };
  var wrap = document.createElement('div'); wrap.className = 'pm2';
  if (tiles.length <= PM_STATIC_MAX || matchMedia('(prefers-reduced-motion:reduce)').matches) {
    wrap.classList.add('pm2--grid'); wrap.appendChild(mk(tiles.slice(0, PM_STATIC_MAX), 'pm2-grid'));
  } else {
    var h = Math.ceil(tiles.length / 2), reps = function (l) { var o = []; for (var r = 0; r < Math.max(2, Math.ceil(8 / l.length)); r++) o = o.concat(l); return o.concat(o); };
    wrap.classList.add('pm2--drift');
    var a = mk(reps(tiles.slice(0, h)), 'pm2-track pm2-l'), b = mk(reps(tiles.slice(h)), 'pm2-track pm2-r');
    [a, b].forEach(function (t) { [].forEach.call(t.children, function (c, j) { if (j >= t.children.length / 2 || j >= tiles.length) c.setAttribute('aria-hidden', 'true'); }); });
    wrap.appendChild(a); wrap.appendChild(b);
  }
  pm.parentNode.replaceChild(wrap, pm);
})();


(function () {
  [].forEach.call(document.querySelectorAll('section[aria-label="מותגי הקבוצה"] a'), function (a) {
    if (a.querySelector('.bk-go')) return;
    var g = document.createElement('span'); g.className = 'bk-go'; g.setAttribute('aria-hidden', 'true'); g.innerHTML = '<i></i>'; a.appendChild(g);
  });
})();
