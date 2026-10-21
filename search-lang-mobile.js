
(function () {
  var root = document.documentElement;

  
  var ICON = {
    search: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"10\" cy=\"3.40\" r=\"0.92\"/><circle cx=\"12.86\" cy=\"4.05\" r=\"0.92\"/><circle cx=\"15.16\" cy=\"5.88\" r=\"0.92\"/><circle cx=\"16.43\" cy=\"8.53\" r=\"0.92\"/><circle cx=\"16.43\" cy=\"11.47\" r=\"0.92\"/><circle cx=\"15.16\" cy=\"14.12\" r=\"0.92\"/><circle cx=\"12.86\" cy=\"15.95\" r=\"0.92\"/><circle cx=\"10\" cy=\"16.60\" r=\"0.92\"/><circle cx=\"7.14\" cy=\"15.95\" r=\"0.92\"/><circle cx=\"4.84\" cy=\"14.12\" r=\"0.92\"/><circle cx=\"3.57\" cy=\"11.47\" r=\"0.92\"/><circle cx=\"3.57\" cy=\"8.53\" r=\"0.92\"/><circle cx=\"4.84\" cy=\"5.88\" r=\"0.92\"/><circle cx=\"7.14\" cy=\"4.05\" r=\"0.92\"/><circle cx=\"17.20\" cy=\"17.20\" r=\"0.92\"/><circle cx=\"19.20\" cy=\"19.20\" r=\"0.92\"/><circle cx=\"21.20\" cy=\"21.20\" r=\"0.92\"/></svg>",
    globe: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"2.40\" r=\"0.92\"/><circle cx=\"14.97\" cy=\"2.87\" r=\"0.92\"/><circle cx=\"17.64\" cy=\"4.23\" r=\"0.92\"/><circle cx=\"19.77\" cy=\"6.36\" r=\"0.92\"/><circle cx=\"21.13\" cy=\"9.03\" r=\"0.92\"/><circle cx=\"21.60\" cy=\"12\" r=\"0.92\"/><circle cx=\"21.13\" cy=\"14.97\" r=\"0.92\"/><circle cx=\"19.77\" cy=\"17.64\" r=\"0.92\"/><circle cx=\"17.64\" cy=\"19.77\" r=\"0.92\"/><circle cx=\"14.97\" cy=\"21.13\" r=\"0.92\"/><circle cx=\"12\" cy=\"21.60\" r=\"0.92\"/><circle cx=\"9.03\" cy=\"21.13\" r=\"0.92\"/><circle cx=\"6.36\" cy=\"19.77\" r=\"0.92\"/><circle cx=\"4.23\" cy=\"17.64\" r=\"0.92\"/><circle cx=\"2.87\" cy=\"14.97\" r=\"0.92\"/><circle cx=\"2.40\" cy=\"12\" r=\"0.92\"/><circle cx=\"2.87\" cy=\"9.03\" r=\"0.92\"/><circle cx=\"4.23\" cy=\"6.36\" r=\"0.92\"/><circle cx=\"6.36\" cy=\"4.23\" r=\"0.92\"/><circle cx=\"9.03\" cy=\"2.87\" r=\"0.92\"/><circle cx=\"15.97\" cy=\"5.79\" r=\"0.92\"/><circle cx=\"16.91\" cy=\"8.83\" r=\"0.92\"/><circle cx=\"17.20\" cy=\"12\" r=\"0.92\"/><circle cx=\"16.91\" cy=\"15.17\" r=\"0.92\"/><circle cx=\"15.97\" cy=\"18.21\" r=\"0.92\"/><circle cx=\"8.03\" cy=\"18.21\" r=\"0.92\"/><circle cx=\"7.09\" cy=\"15.17\" r=\"0.92\"/><circle cx=\"6.80\" cy=\"12\" r=\"0.92\"/><circle cx=\"7.09\" cy=\"8.83\" r=\"0.92\"/><circle cx=\"8.03\" cy=\"5.79\" r=\"0.92\"/><circle cx=\"10.27\" cy=\"12\" r=\"0.92\"/><circle cx=\"13.73\" cy=\"12\" r=\"0.92\"/></svg>",
  };
  

  var LANGS = [
    { code: 'he', label: 'עברית',   dir: 'rtl' },
    { code: 'en', label: 'English', dir: 'ltr' }
  ];
  var CURRENT = (root.getAttribute('lang') || 'he').slice(0, 2).toLowerCase();
  function current() {
    for (var i = 0; i < LANGS.length; i++) if (LANGS[i].code === CURRENT) return LANGS[i];
    return LANGS[0];
  }

  
  var SEL = '.burger, .mburger, button[aria-label="תפריט"], ' +
            'button[aria-label="פתיחת תפריט"], #header .navburger';
  function burger() {
    var all = [].slice.call(document.querySelectorAll(SEL));
    for (var i = 0; i < all.length; i++) {
      var b = all[i];
      
      if (b.offsetWidth > 0 && b.offsetHeight > 0) return b;
    }
    return null;
  }

  function boot() {
    var bg = burger();
    if (!bg) return false;
    if (document.querySelector('.slmgrp, .slmdrawer-search, .slmlang-row')) return true;

    var bar  = bg.closest('header') || bg.parentElement;
    var host = bg.parentElement;
    var mode = root.getAttribute('data-slphone') || 'bar-drawer';

    
    var grp = null, bSearch = null, bLang = null;
    function ico(kind, svg, aria) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'slmico';
      b.setAttribute('data-slm', kind);
      b.setAttribute('aria-label', aria);
      b.setAttribute('aria-expanded', 'false');
      b.innerHTML = svg;
      return b;
    }
    if (mode !== 'drawer') {
      grp = document.createElement('div');
      grp.className = 'slmgrp';
      bSearch = ico('search', ICON.search || '', 'חיפוש');
      grp.appendChild(bSearch);
      if (mode === 'bar') {
        bLang = ico('lang', ICON.globe || '', 'שינוי שפה');
        grp.appendChild(bLang);
      }
      
      var lead = document.createElement('div');
      lead.className = 'slmlead';
      host.insertBefore(lead, bg);
      lead.appendChild(bg); lead.appendChild(grp);

      
      function arrange() {
        var b = bg.getBoundingClientRect(), f = bar.getBoundingClientRect();
        if (!b.width || !f.width) return;
        
        var iconGoesRight = (b.left + b.width / 2) < (f.left + f.width / 2);
        
        var bo = parseInt(window.getComputedStyle(bg).order, 10);
        if (isNaN(bo)) bo = 0;
        grp.style.order = String(iconGoesRight ? bo + 1 : bo - 1);
      }
      arrange();
      
      requestAnimationFrame(arrange);
      setTimeout(arrange, 400);
      setTimeout(arrange, 1200);
      window.addEventListener('resize', arrange);
      if (window.MutationObserver) {
        new MutationObserver(arrange).observe(bar, {
          attributes: true, attributeFilter: ['class', 'style'] });
      }
      if (window.ResizeObserver) { try { new ResizeObserver(arrange).observe(bar); } catch (e) {} }
    }


    
    function withEngine(cb) {
      if (window.DNBSearch) return cb();
      var s = document.querySelector('script[data-srq]');
      if (!s) {
        s = document.createElement('script'); s.setAttribute('data-srq', '');
        var me = document.querySelector('script[src*="search-lang"]');
        s.src = (me ? me.src.replace(/search-lang(-mobile)?\.js.*$/, '') : '') + 'search-engine.js';
        document.head.appendChild(s);
      }
      s.addEventListener('load', cb);
    }

    
    var FIELD =
      '<div class="slmfield">' + (ICON.search || '') +
        '<input type="search" name="q" autocomplete="off" ' +
               'placeholder="חפשו פתרון, תעשייה או מאמר" aria-label="חיפוש">' +
      '</div>';
    
    var SUBMIT =
      '<div class="slmrow"><a class="btn btn-dark slsubmit" href="#" role="button">' +
        '<span class="badge"><img src="fig/btn-arrow.svg" alt=""></span>' +
        '<span class="lbl">חיפוש</span>' +
      '</a></div>';
    var RESULTS = '<div class="slmres" aria-live="polite"></div>';

    var panel = null;
    if (mode !== 'drawer') {
      panel = document.createElement('div');
      panel.className = 'slmw';
      panel.innerHTML = '<div class="slmpanel">' + FIELD + SUBMIT + RESULTS + '</div>';
      bar.appendChild(panel);
      withEngine(function () { DNBSearch.attach(panel); });
    }

    
    var pop = null;
    if (mode === 'bar') {
      pop = document.createElement('div');
      pop.className = 'slmpop';
      pop.setAttribute('role', 'menu');
      LANGS.forEach(function (l) {
        var a = document.createElement('a');
        a.href = '#'; a.setAttribute('role', 'menuitem');
        a.setAttribute('lang', l.code); a.setAttribute('data-lang', l.code);
        if (l.code === CURRENT) a.setAttribute('aria-current', 'true');
        var dot = document.createElement('i'); dot.setAttribute('aria-hidden', 'true');
        var s = document.createElement('span');
        if (l.dir === 'ltr') s.setAttribute('dir', 'ltr');
        s.textContent = l.label;
        a.appendChild(dot); a.appendChild(s);
        pop.appendChild(a);
      });
      bar.appendChild(pop);
    }

    
    function fitLabel(btn) {
      var lbl = btn.querySelector('.lbl'); if (!lbl) return;
      var probe = lbl.cloneNode(true);
      probe.style.cssText = 'position:absolute;left:-9999px;top:0;visibility:hidden;' +
                            'width:auto;white-space:nowrap';
      btn.appendChild(probe);
      var w = probe.getBoundingClientRect().width;
      probe.parentNode.removeChild(probe);
      if (w) btn.style.setProperty('--lblw', w.toFixed(3) + 'px');
    }
    function fitAll() { [].forEach.call(document.querySelectorAll('.slsubmit'), fitLabel); }
    fitAll();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAll);

    
    var open = null;
    function close() {
      if (!open) return;
      root.classList.remove('slm-open', 'slmlang-open');
      track(false);
      if (bSearch) bSearch.setAttribute('aria-expanded', 'false');
      if (bLang)   bLang.setAttribute('aria-expanded', 'false');
      open = null;
    }
    function show(kind) {
      if (open === kind) { close(); return; }
      close();
      
      if (root.classList.contains('msheet-open')) bg.click();
      open = kind;
      if (kind === 'lang' && pop) {
        anchor(); root.classList.add('slmlang-open');
        bLang.setAttribute('aria-expanded', 'true');
        return;
      }
      root.classList.add('slm-open');
      bSearch.setAttribute('aria-expanded', 'true');
      placePanel(); track(true);
      var f = panel && panel.querySelector('input');
      if (f) setTimeout(function () { f.focus(); }, 80);
      if (panel && panel.__srqDemo) setTimeout(panel.__srqDemo, 140);
    }
    
    function placePanel() {
      if (!panel) return;
      var b = bar.getBoundingClientRect();
      
      panel.style.left  = '0px';
      panel.style.top   = '0px';
      panel.style.width = b.width + 'px';
      var o = panel.getBoundingClientRect();
      panel.style.left = (b.left - o.left) + 'px';
      panel.style.top  = (Math.max(0, b.bottom) - o.top) + 'px';
    }
    var tracking = false;
    function track(on) {
      if (on === tracking) return;
      tracking = on;
      var m = on ? 'addEventListener' : 'removeEventListener';
      window[m]('scroll', placePanel, true);
      window[m]('resize', placePanel);
    }

    function anchor() {
      if (!pop || !bLang) return;
      var b = bar.getBoundingClientRect(), g = bLang.getBoundingClientRect();
      var w = pop.offsetWidth || 176;
      
      pop.style.left = Math.max(8, Math.min(g.left - b.left, b.width - w - 8)) + 'px';
    }

    if (bSearch) bSearch.addEventListener('click', function (e) { e.preventDefault(); show('search'); });
    if (bLang)   bLang  .addEventListener('click', function (e) { e.preventDefault(); show('lang'); });
    if (pop) pop.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a[data-lang]') : null;
      if (!a) return;
      e.preventDefault(); close();      
    });
    
    bg.addEventListener('click', function () { if (open) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    document.addEventListener('click', function (e) {
      if (!open) return;
      if (bar.contains(e.target)) return;
      close();
    });

    
    if (mode !== 'bar') wireDrawer(mode);
    return true;

    function wireDrawer(mode) {
      
      var tries = 0;
      (function wait() {
        var sheet = document.querySelector('.msheet');
        var s1 = sheet && sheet.querySelector('.mscreen.s1');
        if (!s1) { if (tries++ < 40) return setTimeout(wait, 80); return; }
        if (s1.querySelector('.slmlang-row')) return;

        
        if (mode === 'drawer') {
          var box = document.createElement('div');
          box.className = 'slmdrawer-search';
          box.innerHTML = FIELD;
          s1.insertBefore(box, s1.firstChild);
        }

        
        var row = document.createElement('button');
        row.type = 'button';
        row.className = 'mrow-i slmlang-row';
        row.innerHTML =
          '<span class="slmlang-lead">' +
            (ICON.globe || '').replace('<svg ', '<svg class="slmg" ') +
            '<span>שפה</span>' +
          '</span>' +
          '<span class="slmlang-val">' +
            (current().dir === 'ltr' ? '<span dir="ltr">' : '<span>') +
              current().label + '</span>' +
            '<i class="mchev" aria-hidden="true"></i>' +
          '</span>';
        s1.appendChild(row);

        
        row.addEventListener('click', function () {
          var s2 = sheet.querySelector('.mscreen.s2');
          if (!s2) return;
          s2.innerHTML = '';
          var back = document.createElement('button');
          back.type = 'button'; back.className = 'mback-row';
          back.innerHTML = '<i class="mchev back" aria-hidden="true"></i><span>שפה</span>';
          back.addEventListener('click', function () {
            sheet.classList.add('popping');
            sheet.classList.remove('pushed');
            root.classList.remove('msheet-pushed');
            setTimeout(function () { sheet.classList.remove('popping'); }, 320);
          });
          s2.appendChild(back);
          LANGS.forEach(function (l, i) {
            var a = document.createElement('a');
            a.href = '#'; a.className = 'mrow-i'; a.setAttribute('lang', l.code);
            a.style.setProperty('--row-d', (i * 24) + 'ms');
            if (l.code === CURRENT) a.setAttribute('aria-current', 'true');
            a.innerHTML = (l.dir === 'ltr' ? '<span dir="ltr">' : '<span>') + l.label + '</span>' +
                          (l.code === CURRENT ? '<i class="mchev" style="border:0;' +
                            'width:5px;height:5px;border-radius:50%;background:#0083a1;' +
                            'transform:none"></i>' : '');
            
            a.addEventListener('click', function (e) { e.preventDefault(); });
            s2.appendChild(a);
          });
          sheet.classList.remove('popping');
          sheet.classList.add('pushed');
          root.classList.add('msheet-pushed');
        });
      })();
    }
  }

  if (!boot()) {
    
    var n = 0, t = setInterval(function () {
      if (boot() || ++n > 40) clearInterval(t);
    }, 100);
  }

  
  new MutationObserver(function () { location.reload(); })
    .observe(root, { attributes: true, attributeFilter: ['data-slphone'] });
})();
