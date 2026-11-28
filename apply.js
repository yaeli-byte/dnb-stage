
(function () {
  if (window.__apply) return;
  var href = document.querySelector('script[src*="apply.js"]');
  var base = href ? href.src.replace(/apply\.js.*$/, '') : '';
  if (!document.querySelector('link[href*="apply.css"]')) {
    var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = base + 'apply.css'; document.head.appendChild(l);
  }
  var FIELDS = [
    { id: 'ap-first', label: 'שם פרטי', ph: 'ישראל', req: 1 },
    { id: 'ap-last', label: 'שם משפחה', ph: 'ישראלי', req: 1, cls: 'tight' },
    { id: 'ap-mail', label: 'אימייל', ph: 'name@company.com', type: 'email', ltr: true, req: 1, cls: 'tight' },
    { id: 'ap-tel', label: 'טלפון', ph: '050-0000000', type: 'tel', ltr: true, cls: 'tight' },
    { id: 'ap-li', label: 'פרופיל לינקדאין (לא חובה)', ph: 'linkedin.com/in/…', type: 'url', ltr: true, cls: 'tight' },
    { id: 'ap-cv', label: 'קורות חיים', file: true, cls: 'tight' },
    { id: 'ap-msg', label: 'ספרו לנו עליכם (לא חובה)', ph: 'כמה מילים על הניסיון שלכם', area: true, cls: 'last' }
  ];
  function field(f) {
    var ctl;
    if (f.file) ctl = '<label class="ap-file" for="' + f.id + '"><span class="ap-fn">צרפו קובץ - PDF או Word</span>' +
      '<span class="ap-pick">בחירת קובץ</span></label><input id="' + f.id + '" type="file" accept=".pdf,.doc,.docx" hidden>';
    else if (f.area) ctl = '<textarea id="' + f.id + '" rows="1" placeholder="' + f.ph + '"></textarea>';
    else ctl = '<input id="' + f.id + '" type="' + (f.type || 'text') + '" placeholder="' + f.ph + '"' + (f.ltr ? ' dir="ltr"' : '') + (f.req ? ' required' : '') + '>';
    return '<div class="f ' + (f.cls || '') + '"><label for="' + f.id + '">' + f.label + (f.req ? ' *' : '') + '</label><div class="ctl">' + ctl + '</div></div>';
  }
  var scrim = document.createElement('div'); scrim.id = 'ap-scrim'; scrim.className = 'ap-scrim';
  document.body.appendChild(scrim);
  var box = document.createElement('div');
  box.className = 'cu cu-apply'; box.hidden = true;
  box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-labelledby', 'ap-title');
  box.innerHTML =
    '<div class="cu-body"><button class="cu-close" type="button" aria-label="סגירה"><span><img class="h" src="fig/cu-x-h.svg" alt=""><img class="v" src="fig/cu-x-v.svg" alt=""></span></button>' +
    '<form class="cu-in ap-form" novalidate><div class="cu-head"><h2 id="ap-title">הגשת מועמדות</h2><p class="cu-lede" id="ap-lede"></p></div>' +
    FIELDS.map(field).join('') +
    '<label class="cu-consent-row" for="ap-consent"><input class="cu-consent-box" id="ap-consent" type="checkbox"><span class="cu-consent-mark" aria-hidden="true"></span>' +
    '<span class="cu-consent">אני מאשר/ת את <a href="https://dbisrael.co.il/privacy-policy/" target="_blank" rel="noopener">מדיניות הפרטיות</a> ואת שמירת קורות החיים שלי לצורך תהליך הגיוס. *</span></label>' +
    '<p class="ap-err" role="alert" hidden></p>' +
    '<button class="cu-submit ap-submit" type="submit"><span class="badge"><img src="fig/btn-arrow-dark.svg" alt=""></span><span class="lbl">שליחת מועמדות</span></button></form>' +
    '<div class="ap-done" hidden><h2>תודה, קיבלנו!</h2><p class="cu-lede">קורות החיים שלך אצלנו. אם נמצא התאמה, נחזור אליך בהקדם.</p>' +
    '<button class="cu-submit ap-close2" type="button"><span class="badge"><img src="fig/btn-arrow-dark.svg" alt=""></span><span class="lbl">סגירה</span></button></div></div>' +
    '<div class="cu-art"><div class="grad"></div><div class="shot"><img src="fig/hero.png" alt=""></div></div>';
  document.body.appendChild(box);
  var form = box.querySelector('.ap-form'), done = box.querySelector('.ap-done'), err = box.querySelector('.ap-err');
  var opener = null;
  function role() { var h = document.querySelector('h1'); return h ? h.textContent.trim() : ''; }
  function open(from, title) {
    opener = from || null;
    form.hidden = false; done.hidden = true; err.hidden = true;
    var lede = box.querySelector('#ap-lede');
    lede.textContent = title ? 'המשרה: ' + title : 'השאירו פרטים וקורות חיים, ונחזור אליכם כשתיפתח משרה מתאימה.';
    box.hidden = false;
    requestAnimationFrame(function () { requestAnimationFrame(function () { scrim.classList.add('on'); box.classList.add('on'); }); });
    setTimeout(function () { var f = box.querySelector('input'); f && f.focus(); }, 320);
    document.addEventListener('keydown', onKey);
  }
  function close() {
    scrim.classList.remove('on'); box.classList.remove('on'); document.removeEventListener('keydown', onKey);
    setTimeout(function () { box.hidden = true; }, 420);
    if (opener && opener.focus) opener.focus(); opener = null;
  }
  function onKey(e) {
    if (e.key === 'Escape') { close(); return; }
    if (e.key !== 'Tab') return;
    var f = [].filter.call(box.querySelectorAll('button,input,select,textarea,a[href]'), function (x) { return x.offsetParent !== null && x.type !== 'hidden' && !x.hidden; });
    if (!f.length) return;
    var a = f[0], z = f[f.length - 1];
    if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
    else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
  }
  scrim.addEventListener('click', close);
  box.addEventListener('click', function (e) { if (e.target.closest('.cu-close,.ap-close2')) close(); });
  var cv = box.querySelector('#ap-cv'), fn = box.querySelector('.ap-fn');
  cv.addEventListener('change', function () { fn.textContent = cv.files[0] ? cv.files[0].name : 'צרפו קובץ - PDF או Word'; fn.classList.toggle('on', !!cv.files[0]); });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var bad = [].filter.call(form.querySelectorAll('input[required]'), function (i) { return !i.value.trim() || (i.type === 'email' && !/^\S+@\S+\.\S+$/.test(i.value)); });
    [].forEach.call(form.querySelectorAll('.f'), function (f) { f.classList.remove('bad'); });
    bad.forEach(function (i) { i.closest('.f').classList.add('bad'); });
    var consent = box.querySelector('#ap-consent');
    var msg = bad.length ? 'יש להשלים את השדות המסומנים.' : (!consent.checked ? 'יש לאשר את מדיניות הפרטיות כדי להמשיך.' : '');
    err.textContent = msg; err.hidden = !msg;
    if (msg) { (bad[0] || consent).focus(); return; }
    form.hidden = true; done.hidden = false;           
    done.querySelector('button').focus();
  });
  function wire(root) {
    [].forEach.call((root || document).querySelectorAll('a,button'), function (el) {
      if (el.dataset.apWired || el.closest('.cu')) return;
      var t = (el.textContent || '').replace(/\s+/g, ' ').trim();
      var job = /^הגשת מועמדות/.test(t), cvband = /^שליחת קורות חיים/.test(t);
      if (!job && !cvband) return;
      el.dataset.apWired = '1';
      el.addEventListener('click', function (ev) { ev.preventDefault(); open(el, job ? role() : ''); });
    });
  }
  wire();
  new MutationObserver(function () { wire(); }).observe(document.body, { childList: true, subtree: true });
  window.__apply = { open: open, close: close, wire: wire };
})();
