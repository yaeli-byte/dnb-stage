
(function () {
  var root = document.querySelector('.pg-careers');
  if (!root) return;
  var ROLES = [
    { t: 'מעצב/ת מוצר בכיר/ה', d: 'עיצוב', l: 'רמת גן', k: 'משרה מלאה', href: 'job-posting.html' },
    { t: 'מפתח/ת <span dir="ltr">Full-Stack</span>', d: 'פיתוח', l: 'רמת גן', k: 'משרה מלאה', href: 'job-posting.html' },
    { t: 'אנליסט/ית דאטה', d: 'דאטה', l: 'תל אביב', k: 'משרה מלאה', href: 'job-posting.html' },
    { t: 'מנהל/ת הצלחת לקוח', d: 'הצלחת לקוח', l: 'היברידי', k: 'משרה מלאה', href: 'job-posting.html' }
  ];

  var rows = [].slice.call(root.querySelectorAll('.gb-role'));
  if (!rows.length) return;
  var list = rows[0].parentNode, tpl = rows[0].cloneNode(true);

  function leaves(row) {   
    return [].filter.call(row.querySelectorAll('span'), function (s) {
      return !s.closest('.dnb-btn') && !s.hasAttribute('aria-hidden') &&
             !s.closest('[dir="ltr"]') && s.textContent.trim() &&
             ![].some.call(s.children, function (c) { return c.tagName === 'SPAN' && !c.hasAttribute('dir'); });
    });
  }
  function build(r) {
    var row = tpl.cloneNode(true), L = leaves(row);
    if (L[0]) L[0].innerHTML = r.t;
    if (L[1]) L[1].textContent = r.d;
    if (L[2]) L[2].textContent = r.l;
    if (L[3]) L[3].textContent = r.k;
    var a = row.querySelector('a.dnb-btn'); if (a) a.setAttribute('href', r.href);
    row.dataset.d = r.d; row.dataset.l = r.l; row.dataset.k = r.k;
    row.dataset.q = (r.t.replace(/<[^>]+>/g, '') + ' ' + r.d + ' ' + r.l + ' ' + r.k).toLowerCase();
    function go(e) { if (e.target.closest('a')) return; location.href = r.href; }
    row.addEventListener('click', go);
    row.addEventListener('keydown', function (e) { if (e.key === 'Enter') go(e); });
    row.style.cursor = 'pointer';
    return row;
  }
  var anchor = rows[rows.length - 1].nextSibling;
  rows.forEach(function (r) { r.remove(); });
  var built = ROLES.map(build);
  built.forEach(function (r) { list.insertBefore(r, anchor); });

  
  var state = { q: '', d: '', l: '', k: '' };
  var KEY = { 'מחלקה': 'd', 'מיקום': 'l' };   
  function apply() {
    built.forEach(function (r) {
      var ok = (!state.q || r.dataset.q.indexOf(state.q) > -1) &&
               (!state.d || r.dataset.d === state.d) &&
               (!state.l || r.dataset.l === state.l) &&
               (!state.k || r.dataset.k === state.k);
      r.style.display = ok ? '' : 'none';
    });
  }
  [].forEach.call(root.querySelectorAll('label'), function (lab) {
    var name = lab.firstElementChild && lab.firstElementChild.textContent.trim();
    var box = lab.children[1]; if (!box) return;
    var shown = box.querySelector('span');
    if (name === 'חיפוש' && shown) {
      var cs = getComputedStyle(shown), inp = document.createElement('input');
      inp.type = 'search'; inp.placeholder = shown.textContent.trim();
      inp.setAttribute('aria-label', name);
      inp.style.cssText = 'flex:1;min-width:0;border:0;background:none;outline:none;padding:0;margin:0;' +
        'font-family:Heebo,sans-serif;font-size:' + cs.fontSize + ';line-height:' + cs.lineHeight + ';color:#000;direction:rtl';
      inp.className = 'cr-input';
      shown.replaceWith(inp);
      inp.addEventListener('input', function () { state.q = inp.value.trim().toLowerCase(); apply(); });
    } else if (KEY[name] && shown) {
      
      var k = KEY[name], opts = [['', shown.textContent.trim()]];
      ROLES.map(function (r) { return r[k]; }).filter(function (v, i, a) { return a.indexOf(v) === i; })
        .forEach(function (v) { opts.push([v, v]); });
      box.style.position = 'relative'; box.style.cursor = 'pointer';
      box.setAttribute('role', 'button'); box.setAttribute('tabindex', '0');
      box.setAttribute('aria-haspopup', 'listbox'); box.setAttribute('aria-expanded', 'false');
      var pop = document.createElement('div'); pop.className = 'cr-pop'; pop.setAttribute('role', 'listbox'); pop.hidden = true;
      opts.forEach(function (o) {
        var a = document.createElement('a'); a.href = '#'; a.setAttribute('role', 'option');
        a.setAttribute('data-v', o[0]); a.innerHTML = '<i></i><span>' + o[1] + '</span>';
        if (!o[0]) a.setAttribute('aria-current', 'true');
        pop.appendChild(a);
      });
      box.appendChild(pop);
      
      for (var an = box.parentNode; an && an !== root; an = an.parentNode) {
        if (getComputedStyle(an).overflow === 'hidden') {
          an.style.overflow = 'visible';
          [].forEach.call(an.children, function (c) {
            if (c.getAttribute('aria-hidden') === 'true') { c.style.borderRadius = 'inherit'; c.style.overflow = 'hidden'; }
          });
        }
      }
      function setOpen(v) { pop.hidden = !v; box.setAttribute('aria-expanded', String(v)); }
      box.addEventListener('click', function (e) {
        var a = e.target.closest('.cr-pop a');
        if (a) {
          e.preventDefault(); state[k] = a.getAttribute('data-v');
          shown.textContent = a.querySelector('span').textContent;
          [].forEach.call(pop.children, function (c) { c.removeAttribute('aria-current'); });
          a.setAttribute('aria-current', 'true'); setOpen(false); apply(); return;
        }
        [].forEach.call(root.querySelectorAll('.cr-pop'), function (o) { if (o !== pop) o.hidden = true; });
        setOpen(pop.hidden);
      });
      box.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') setOpen(false);
        if (e.key === 'Enter' || e.key === ' ') { if (!e.target.closest('.cr-pop')) { e.preventDefault(); setOpen(pop.hidden); } }
      });
      document.addEventListener('click', function (e) { if (!box.contains(e.target)) setOpen(false); });
    }
  });


  
  [].forEach.call(root.querySelectorAll('a.dnb-btn'), function (a) {
    if (!/טען עוד/.test(a.textContent)) return;
    a.className = 'cr-more'; a.removeAttribute('style');
    var lab = a.querySelector('.dnb-btn__label'), txt = lab ? lab.textContent.trim() : 'טען עוד';
    a.innerHTML = '<span>' + txt + '</span><i aria-hidden="true"></i>';
    a.addEventListener('click', function (e) { e.preventDefault(); });
    a.parentNode.classList.add('cr-morewrap');
  });

  
  var roles = root.querySelector('section[aria-label="משרות פתוחות"]') || list.closest('section');
  if (roles) {
    roles.id = roles.id || 'open-roles'; roles.style.scrollMarginTop = '96px';
    [].forEach.call(root.querySelectorAll('a.dnb-btn'), function (a) {
      if (/לכל המשרות הפתוחות/.test(a.textContent)) a.setAttribute('href', '#' + roles.id);
    });
  }
})();


(function () {
  var root = document.querySelector('.pg-careers');
  if (!root) return;
  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches, all = [];
  function tag(els, cls) {
    [].forEach.call(els, function (e, i) {
      cls.split(' ').forEach(function (c) { e.classList.add(c); });
      e.style.setProperty('--i', i % 8); all.push(e);
    });
  }
  function secByH2(t) {
    var h = [].slice.call(root.querySelectorAll('h2')).filter(function (x) { return x.textContent.replace(/\s+/g, ' ').indexOf(t) > -1; })[0];
    return h && h.closest('section');
  }
  
  [].forEach.call(root.querySelectorAll('section h2'), function (h) { var hd = h.parentElement; if (hd) tag([hd], 'hm-rv'); });
  
  tag(root.querySelectorAll('[style*="border-radius:16px"][style*="rgba(11,22,32,.16)"]'), 'hm-rv hm-card');
  
  var ben = secByH2('למה לעבוד אצלנו'), grid = ben && ben.querySelector('[style*="display:grid"]');
  if (grid) {
    tag(grid.children, 'hm-rv');
    [].forEach.call(grid.children, function (c) {
      if (c.querySelector(':scope > img')) c.classList.add('hm-photo');
      else if (getComputedStyle(c).backgroundColor === 'rgb(255, 255, 255)') c.classList.add('hm-card');   
    });
  }
  
  tag(root.querySelectorAll('.gb-role'), 'hm-rv');
  [].forEach.call(root.querySelectorAll('.gb-role'), function (r) {
    var a = r.querySelector('a.dnb-btn'); if (a) a.classList.add('hm-arrow');
  });
  
  [].forEach.call(root.querySelectorAll('[style*="repeat(3,"][style*="gap:10px"], [style*="repeat(6,minmax(0,1fr))"]'), function (g) { tag(g.children, 'hm-pop'); });
  
  var pan = root.querySelector('[data-galroot="pan"]');
  if (pan) tag([pan], 'hm-rv');
  if (reduce || !('IntersectionObserver' in window)) { all.forEach(function (e) { e.classList.add('is-in'); }); }
  else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    all.forEach(function (e) { io.observe(e); });
    
    setTimeout(function () { all.forEach(function (e) { e.classList.add('is-in'); }); }, 9000);
  }

  
  var rows = [].slice.call(root.querySelectorAll('.gb-role')), list = rows[0] && rows[0].parentNode;
  if (list) {
    var cv = root.querySelector('#ctaw, [data-home="ctaw"]');
    var msg = document.createElement('p'); msg.className = 'cr-empty'; msg.hidden = true; msg.setAttribute('data-invented', '');
    msg.innerHTML = 'לא נמצאו משרות מתאימות. <a href="#' + (cv && cv.id || 'ctaw') + '">שליחת קורות חיים</a>';
    list.appendChild(msg);
    var sync = function () {
      var any = [].slice.call(list.querySelectorAll('.gb-role')).some(function (r) { return r.style.display !== 'none'; });
      msg.hidden = any;
    };
    new MutationObserver(sync).observe(list, { attributes: true, attributeFilter: ['style'], subtree: true });
    sync();
  }
  
  var more = root.querySelector('a.cr-more');
  if (more) more.addEventListener('click', function (e) {
    e.preventDefault();
    var hid = [].slice.call(root.querySelectorAll('.gb-role[data-more]'));
    hid.slice(0, 4).forEach(function (r, i) { r.removeAttribute('data-more'); r.hidden = false; r.style.setProperty('--i', i); r.classList.add('hm-rv', 'is-in'); });
    if (hid.length <= 4) { var w = more.parentNode; more.hidden = true; w.hidden = true; }
  });
})();


(function () {
  if (!document.querySelector('.pg-careers') || !(window.matchMedia('(max-width:767.98px)').matches || document.documentElement.hasAttribute('data-m'))) return;
  [].forEach.call(document.querySelectorAll('#statsw #stats .item'), function (i) { i.style.borderBottom = '0'; });
})();


(function () {
  var root = document.querySelector('.pg-careers');
  if (!root) return;
  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  
  [].forEach.call(root.querySelectorAll('[data-cf]'), function (f) {
    if (f._b) return; f._b = 1;
    var S = JSON.parse(f.getAttribute('data-cf')), off = JSON.parse(f.getAttribute('data-cfoff'));
    var cards = [].slice.call(f.querySelectorAll('[data-cfc]')), n = cards.length, k = 0, hover = false;
    var EASE = 'transform .62s cubic-bezier(.19,1,.22,1), opacity .34s cubic-bezier(.19,1,.22,1)';
    function put(c, s, anim) {
      c.style.transition = anim && !reduce ? EASE : 'none';
      c.style.transform = 'translateX(' + s[0] + 'px) scale(' + s[1] + ')'; c.style.zIndex = s[2]; c.style.opacity = s[3];
      var v = c.querySelector('[data-cfv]');
      if (v) { v.style.transition = c.style.transition.replace('transform .62s cubic-bezier(.19,1,.22,1), ', ''); v.style.opacity = s[4]; }
    }
    function go(d) {
      var k0 = k; k = (k + d + n) % n;
      cards.forEach(function (c, i) {
        var a = (i + k0) % n, b = (i + k) % n;
        if (d > 0 && a === n - 1 && b === 0) { put(c, off, true); setTimeout(function () { put(c, S[0], false); }, 640); }
        else if (d < 0 && a === 0 && b === n - 1) { put(c, off, false); void c.offsetWidth; requestAnimationFrame(function () { put(c, S[b], true); }); }
        else put(c, S[b], true);
      });
    }
    [].forEach.call(f.querySelectorAll('[data-cfnext]'), function (b) { b.addEventListener('click', function (e) { e.stopPropagation(); go(1); }); });
    [].forEach.call(f.querySelectorAll('[data-cfprev]'), function (b) { b.addEventListener('click', function (e) { e.stopPropagation(); go(-1); }); });
    f.addEventListener('mouseenter', function () { hover = true; }); f.addEventListener('mouseleave', function () { hover = false; });
    cards.forEach(function (c, i) { put(c, S[i % S.length], false); });
    if (!reduce) setInterval(function () { if (!hover) go(1); }, 5000);
  });
  
  [].forEach.call(root.querySelectorAll('[data-galroot="pan"]'), function (r) {
    if (r._b2) return; r._b2 = 1;
    var steps = +r.getAttribute('data-steps'), step = +r.getAttribute('data-step') || 632;
    var cols = [].slice.call(r.querySelectorAll('[data-col]')), dots = [].slice.call(r.querySelectorAll('[data-pdot]')), p = 0;
    function lay() {
      cols.forEach(function (c) { if (reduce) c.style.transition = 'none'; c.style.transform = 'translateX(' + (p * step) + 'px)'; });
      dots.forEach(function (d, i) { d.style.width = i === p ? '18px' : '6px'; d.style.backgroundColor = i === p ? '#0083A1' : 'rgba(11,22,32,.2)'; });
      [].forEach.call(r.querySelectorAll('[data-gnext]'), function (b) { b.style.opacity = p >= steps ? .4 : 1; });
      [].forEach.call(r.querySelectorAll('[data-gprev]'), function (b) { b.style.opacity = p <= 0 ? .4 : 1; });
    }
    function to(q) { p = Math.max(0, Math.min(steps, q)); lay(); }
    [].forEach.call(r.querySelectorAll('[data-gnext]'), function (b) { b.addEventListener('click', function () { to(p + 1); }); });
    [].forEach.call(r.querySelectorAll('[data-gprev]'), function (b) { b.addEventListener('click', function () { to(p - 1); }); });
    dots.forEach(function (d, i) { d.style.cursor = 'pointer'; d.addEventListener('click', function () { to(i); }); });
    
    var x0 = null;
    r.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    r.addEventListener('touchend', function (e) {
      if (x0 == null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) < 30) return; to(p + (dx > 0 ? 1 : -1));
    });
    lay();
  });
})();
