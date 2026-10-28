
(function () {
  
  function link() {
    [].slice.call(document.querySelectorAll('a[href="blog-article.html"], #guides a.g-card, #guides .g-card')).forEach(function (c) {
      var tag = c.querySelector('.g-tag p, .bl-chip, [data-tag]');
      var t = tag ? tag.textContent.trim() : '';
      if (t !== 'סקירה') return;
      var a = c.tagName === 'A' ? c : c.closest('a');
      if (a) a.setAttribute('href', 'review.html');
      else { c.style.cursor = 'pointer'; c.onclick = function () { location.href = 'review.html'; }; }
    });
  }
  link(); setTimeout(link, 700); setTimeout(link, 2200);

  var root = document.querySelector('.pg-review');
  if (!root) return;

  
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  function validate(form) {
    var first = null;
    [].slice.call(form.querySelectorAll('.rv-in')).forEach(function (i) {
      var ok = i.value.trim() !== '' && (i.type !== 'email' || EMAIL.test(i.value.trim()));
      i.setAttribute('aria-invalid', ok ? 'false' : 'true');
      if (!ok && !first) first = i;
    });
    var chk = form.querySelector('.rv-chk input'), lab = form.querySelector('.rv-chk');
    if (chk) { lab.toggleAttribute('data-invalid', !chk.checked); if (!chk.checked && !first) first = chk; }
    return first;
  }
  function submit(form) {
    var bad = validate(form);
    var er = form.querySelector('.rv-err');
    if (bad) {
      if (!er) { er = document.createElement('p'); er.className = 'rv-err'; er.setAttribute('role', 'alert'); er.setAttribute('data-invented', ''); er.textContent = 'נא למלא את כל השדות ולאשר את קבלת העדכונים.'; form.appendChild(er); }
      er.hidden = false; bad.focus(); return;
    }
    if (er) er.hidden = true;
    var data = {};
    [].slice.call(form.querySelectorAll('input')).forEach(function (i) { data[i.name] = i.type === 'checkbox' ? i.checked : i.value.trim(); });
    
    document.dispatchEvent(new CustomEvent('review:lead', { detail: data }));
    form.setAttribute('data-sent', '');
    if (!form.querySelector('.rv-pending')) {
      var p = document.createElement('p'); p.className = 'rv-pending'; p.setAttribute('data-invented', '');
      p.setAttribute('role', 'status');
      p.textContent = 'תודה! הסקירה המלאה בדרך אליכם, ונשלחה גם למייל שלכם.';
      form.appendChild(p);
    }
  }
  [].slice.call(root.ownerDocument.querySelectorAll('.rv-form')).forEach(function (form) {
    form.addEventListener('submit', function (e) { e.preventDefault(); submit(form); });
    form.addEventListener('keydown', function (e) { if (e.key === 'Enter' && e.target.tagName === 'INPUT' && e.target.type !== 'checkbox') { e.preventDefault(); submit(form); } });
    var b = form.querySelector('[data-rv-submit]');
    if (b) b.addEventListener('click', function (e) { e.preventDefault(); submit(form); });
    form.addEventListener('input', function (e) { if (e.target.getAttribute && e.target.getAttribute('aria-invalid') === 'true') e.target.setAttribute('aria-invalid', 'false'); });
  });

  
  var sheet = document.querySelector('[data-rv-sheet]');
  if (!sheet) return;
  var dlg = sheet.querySelector('[role="dialog"]'), opener = null;
  function focusables() {
    return [].slice.call(dlg.querySelectorAll('input,button,a[href],[tabindex]:not([tabindex="-1"])')).filter(function (n) { return !n.disabled && n.offsetParent !== null; });
  }
  function open(from) {
    opener = from || document.activeElement;
    sheet.hidden = false; void sheet.offsetWidth;
    sheet.classList.add('is-in'); document.body.classList.add('rv-lock');
    var f = dlg.querySelector('.rv-in') || dlg; f.focus({ preventScroll: true });
  }
  function close() {
    sheet.classList.remove('is-in'); document.body.classList.remove('rv-lock');
    var done = function () { sheet.hidden = true; }, rm = matchMedia('(prefers-reduced-motion:reduce)').matches;
    rm ? done() : setTimeout(done, 280);
    if (opener && opener.focus) opener.focus();
  }
  [].slice.call(document.querySelectorAll('[data-rv-open]')).forEach(function (b) {
    b.addEventListener('click', function (e) { e.preventDefault(); open(b); });
  });
  [].slice.call(sheet.querySelectorAll('[data-rv-close], .rv-close')).forEach(function (b) { b.addEventListener('click', close); });
  document.addEventListener('keydown', function (e) {
    if (sheet.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key !== 'Tab') return;
    var f = focusables(); if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === dlg)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  if (/[?&]sheet=1/.test(location.search)) open();    
})();


(function () {
  var root = document.querySelector('.pg-review'); if (!root) return;
  var name = (root.getAttribute('data-author-name') || '').trim(), role = (root.getAttribute('data-author-role') || '').trim();
  var date = [].slice.call(root.querySelectorAll('span')).filter(function (s) { return /^\d{2}\.\d{2}\.\d{4}$/.test(s.textContent.trim()) && !s.children.length; })[0];
  if (!date) return;
  var meta = date.parentElement, row = meta.parentElement;
  var who = [].slice.call(row.children).filter(function (c) { return c !== meta && c.querySelector && !c.contains(date); });
  var phone = row.children.length === 2 && row.contains(date) && meta.tagName === 'DIV';          
  var avatar = row.querySelector('span[aria-hidden="true"]');
  if (!name) {
    if (phone) { var col = meta; [].slice.call(col.children).forEach(function (c) { if (!c.contains(date)) c.remove(); }); if (avatar) avatar.remove(); }
    else { who.forEach(function (c) { c.remove(); }); meta.style.marginInlineStart = '0'; }
  } else {
    var sp = row.querySelectorAll('span'); for (var i = 0; i < sp.length; i++) { if (sp[i].textContent.trim() === 'מיכל רוזן') sp[i].textContent = name; else if (role && sp[i].textContent.trim() === 'אנליסטית אשראי בכירה') sp[i].textContent = role; }
  }
  var holder = document.createElement('span'); holder.innerHTML = window.DNBShare ? DNBShare.html() : ''; var st = holder.querySelector('style'), share = holder.querySelector('div');
  if (!share) return;
  if (st && !document.getElementById('dnb-share-style')) { st.id = 'dnb-share-style'; document.head.appendChild(st); }
  DNBShare.wire(share);
  if (phone) { var wrap = document.createElement('div'); wrap.style.cssText = 'display:flex;justify-content:center;margin-top:16px'; wrap.appendChild(share); row.parentElement.insertBefore(wrap, row.nextSibling); }
  else { var div = document.createElement('span'); div.setAttribute('aria-hidden', 'true'); div.style.cssText = 'width:1px;height:24px;flex-shrink:0;background-color:rgba(11,22,32,.14)'; meta.appendChild(div); meta.appendChild(share); }
})();


(function () {
  var root = document.querySelector('.pg-review'), C = window.DNB_COVERS || {}; if (!root) return;
  var id = new URLSearchParams(location.search).get('cover') || 'P6'; if (!C[id]) return;
  var box = [].slice.call(root.querySelectorAll('div[aria-hidden="true"]')).filter(function (d) {
    var st = d.getAttribute('style') || ''; return /overflow:\s*hidden/.test(st) && /(width:\s*1152px; height:\s*420px|width:\s*350px; height:\s*200px)/.test(st);
  })[0];
  if (!box) return;
  var phone = /width:\s*350px/.test(box.getAttribute('style')), f = C[id].files[phone ? 'mobile' : 'hero'];
  var img = document.createElement('img'); img.src = f['1x']; img.srcset = f['1x'] + ' 1x, ' + f['2x'] + ' 2x'; img.width = f.w; img.height = f.h; img.alt = ''; img.decoding = 'async';
  img.style.cssText = 'display:block;width:100%;height:auto;aspect-ratio:' + f.w + '/' + f.h + ';object-fit:cover;border-radius:' + (phone ? '8px' : '16px');
  box.replaceWith(img);
})();

