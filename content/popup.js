
(function () {
  var DEPTS = ['מכירות', 'שירות לקוחות', 'תמיכה טכנית', 'שיתופי פעולה', 'דוברות ותקשורת'];

  
  var FIELDS = [
    { id: 'cu-first', label: 'שם פרטי',     ph: 'ישראל',                    cls: '' },
    { id: 'cu-last',  label: 'שם משפחה',    ph: 'ישראלי',                   cls: '' },
    { id: 'cu-mail',  label: 'אימייל עסקי', ph: 'name@company.com', type: 'email', ltr: true, cls: 'tight' },
    { id: 'cu-dept',  label: 'מחלקה',       select: true,                   cls: 'tight sel' },
    { id: 'cu-msg',   label: 'הודעה',       ph: 'ספרו לנו במה נוכל לעזור', area: true, cls: 'last' }
  ];

  function field(f) {
    var ctl;
    if (f.select) {
      ctl = '<select id="' + f.id + '">' +
        '<option value="" selected>בחרו מחלקה איתה תרצו לשוחח</option>' +
        DEPTS.map(function (d) { return '<option>' + d + '</option>'; }).join('') + '</select>';
    } else if (f.area) {
      ctl = '<textarea id="' + f.id + '" rows="1" placeholder="' + f.ph + '"></textarea>';
    } else {
      ctl = '<input id="' + f.id + '" type="' + (f.type || 'text') + '" placeholder="' + f.ph + '"' +
            (f.ltr ? ' dir="ltr"' : '') + '>';
    }
    return '<div class="f ' + f.cls + '">' +
             '<label for="' + f.id + '">' + f.label + '</label>' +
             '<div class="ctl">' + ctl + '</div>' +
           '</div>';
  }

  var scrim = document.createElement('div');
  scrim.id = 'cu-scrim';
  document.body.appendChild(scrim);

  var box = document.createElement('div');
  box.className = 'cu';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-labelledby', 'cu-title');
  box.setAttribute('data-node', '558:24363');
  box.hidden = true;
  box.innerHTML =
    '<div class="cu-body" data-node="558:24364">' +
      '<button class="cu-close" type="button" aria-label="סגירה" data-node="558:24426">' +
        '<span><img class="h" src="fig/cu-x-h.svg" alt=""><img class="v" src="fig/cu-x-v.svg" alt=""></span>' +
      '</button>' +
      '<div class="cu-in">' +
        '<div class="cu-head">' +
          '<h2 id="cu-title" data-node="558:24367">בואו נדבר</h2>' +
          '<p class="cu-lede">השאירו פרטים ומומחה מטעמנו יחזור אליכם עם ההצעה המותאמת לצרכים שלכם.</p>' +
        '</div>' +
        FIELDS.map(field).join('') +
        
        '<label class="cu-consent-row" for="cu-consent">' +
          '<input class="cu-consent-box" id="cu-consent" type="checkbox">' +
          '<span class="cu-consent-mark" aria-hidden="true"></span>' +

        
        '<span class="cu-consent">' +
          'במשלוח טופס זה הריני מסכים לקבל מדן אנד ברדסטריט (ישראל) בע”מ /או ' +
          'Dun &amp; Bradstreet International Limited ו/או ל.א.י. לשכת אשראי לישראל בע"מ ' +
          'ו/או חברות בנות ו/או חברות אם ו/או חברות קשורות של החברות הנזכרות לעיל, ' +
          'ביחד ולחוד דברי פרסומת לרבות הצעות ו/או הטבות, וזאת באמצעים אלקטרוניים ' +
          '(SMS, דוא"ל, חיוג אוטומטי ועוד). כמו כן, במשלוח טופס זה הריני מאשר את ' +
          '<a href="https://dbisrael.co.il/privacy-policy/" target="_blank" rel="noopener">' +
          'מדיניות הפרטיות</a>.' +
        '</span>' +        '</label>' +
        '<button class="cu-submit" type="button" data-node="558:24404">' +
          '<span class="badge"><img src="fig/btn-arrow-dark.svg" alt=""></span>' +
          '<span class="lbl">שליחה</span>' +
        '</button>' +
      '</div>' +
    '</div>' +
    '<div class="cu-art" data-node="558:24420">' +
      '<div class="grad"></div>' +
      '<div class="shot"><img src="fig/hero.png" alt=""></div>' +
    '</div>';
  document.body.appendChild(box);

  
  (function () {
    var m = /[?&]cuv=([abcd])/.exec(location.search);
    if (m) document.documentElement.setAttribute('data-cuv', m[1]);
    
    else document.documentElement.setAttribute('data-cuv', 'c');
    
    var h = /[?&]cuh=([123])/.exec(location.search);
    if (h) document.documentElement.setAttribute('data-cuh', h[1]);
  })();


  var opener = null;

  function open(from) {
    opener = from || null;
    box.hidden = false;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { scrim.classList.add('on'); box.classList.add('on'); });
    });
    var first = box.querySelector('input');
    if (first) setTimeout(function () { first.focus(); }, 320);
    document.addEventListener('keydown', onKey);
  }
  function close() {
    scrim.classList.remove('on');
    box.classList.remove('on');
    document.removeEventListener('keydown', onKey);
    setTimeout(function () { box.hidden = true; }, 420);
    if (opener && opener.focus) opener.focus();
    opener = null;
  }
  function onKey(e) {
    if (e.key === 'Escape') { close(); return; }
    
    if (e.key !== 'Tab') return;
    var f = box.querySelectorAll('button,input,select,textarea,a[href]');
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  scrim.addEventListener('click', close);
  box.addEventListener('click', function (e) {
    if (e.target.closest('.cu-close')) close();
  });

  
  
  function wire(root) {
    [].forEach.call((root || document).querySelectorAll('a, button'), function (el) {
      if (el.dataset.cuWired) return;
      var t = (el.textContent || '').replace(/\s+/g, ' ').trim();
      if (!/^(צרו קשר|צור קשר)/.test(t)) return;
      el.dataset.cuWired = '1';
      el.addEventListener('click', function (e) { e.preventDefault(); open(el); });
    });
  }
  wire();
  
  var mo = new MutationObserver(function () { wire(); });
  mo.observe(document.body, { childList: true, subtree: true });

  window.__popup = { open: open, close: close, wire: wire,
    count: function () { return document.querySelectorAll('[data-cu-wired]').length; } };

  if (/[?&]cu=1/.test(location.search)) setTimeout(function () { open(); }, 350);
})();
