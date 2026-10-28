
(function () {
  var hdr = document.getElementById('header');
  if (!hdr) return;                       
  if (hdr.querySelector('.slgrp')) return;            

  
  var ICON = {
    search: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"10\" cy=\"3.40\" r=\"0.92\"/><circle cx=\"12.86\" cy=\"4.05\" r=\"0.92\"/><circle cx=\"15.16\" cy=\"5.88\" r=\"0.92\"/><circle cx=\"16.43\" cy=\"8.53\" r=\"0.92\"/><circle cx=\"16.43\" cy=\"11.47\" r=\"0.92\"/><circle cx=\"15.16\" cy=\"14.12\" r=\"0.92\"/><circle cx=\"12.86\" cy=\"15.95\" r=\"0.92\"/><circle cx=\"10\" cy=\"16.60\" r=\"0.92\"/><circle cx=\"7.14\" cy=\"15.95\" r=\"0.92\"/><circle cx=\"4.84\" cy=\"14.12\" r=\"0.92\"/><circle cx=\"3.57\" cy=\"11.47\" r=\"0.92\"/><circle cx=\"3.57\" cy=\"8.53\" r=\"0.92\"/><circle cx=\"4.84\" cy=\"5.88\" r=\"0.92\"/><circle cx=\"7.14\" cy=\"4.05\" r=\"0.92\"/><circle cx=\"17.20\" cy=\"17.20\" r=\"0.92\"/><circle cx=\"19.20\" cy=\"19.20\" r=\"0.92\"/><circle cx=\"21.20\" cy=\"21.20\" r=\"0.92\"/></svg>",
    globe: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"2.40\" r=\"0.92\"/><circle cx=\"14.97\" cy=\"2.87\" r=\"0.92\"/><circle cx=\"17.64\" cy=\"4.23\" r=\"0.92\"/><circle cx=\"19.77\" cy=\"6.36\" r=\"0.92\"/><circle cx=\"21.13\" cy=\"9.03\" r=\"0.92\"/><circle cx=\"21.60\" cy=\"12\" r=\"0.92\"/><circle cx=\"21.13\" cy=\"14.97\" r=\"0.92\"/><circle cx=\"19.77\" cy=\"17.64\" r=\"0.92\"/><circle cx=\"17.64\" cy=\"19.77\" r=\"0.92\"/><circle cx=\"14.97\" cy=\"21.13\" r=\"0.92\"/><circle cx=\"12\" cy=\"21.60\" r=\"0.92\"/><circle cx=\"9.03\" cy=\"21.13\" r=\"0.92\"/><circle cx=\"6.36\" cy=\"19.77\" r=\"0.92\"/><circle cx=\"4.23\" cy=\"17.64\" r=\"0.92\"/><circle cx=\"2.87\" cy=\"14.97\" r=\"0.92\"/><circle cx=\"2.40\" cy=\"12\" r=\"0.92\"/><circle cx=\"2.87\" cy=\"9.03\" r=\"0.92\"/><circle cx=\"4.23\" cy=\"6.36\" r=\"0.92\"/><circle cx=\"6.36\" cy=\"4.23\" r=\"0.92\"/><circle cx=\"9.03\" cy=\"2.87\" r=\"0.92\"/><circle cx=\"15.97\" cy=\"5.79\" r=\"0.92\"/><circle cx=\"16.91\" cy=\"8.83\" r=\"0.92\"/><circle cx=\"17.20\" cy=\"12\" r=\"0.92\"/><circle cx=\"16.91\" cy=\"15.17\" r=\"0.92\"/><circle cx=\"15.97\" cy=\"18.21\" r=\"0.92\"/><circle cx=\"8.03\" cy=\"18.21\" r=\"0.92\"/><circle cx=\"7.09\" cy=\"15.17\" r=\"0.92\"/><circle cx=\"6.80\" cy=\"12\" r=\"0.92\"/><circle cx=\"7.09\" cy=\"8.83\" r=\"0.92\"/><circle cx=\"8.03\" cy=\"5.79\" r=\"0.92\"/><circle cx=\"10.27\" cy=\"12\" r=\"0.92\"/><circle cx=\"13.73\" cy=\"12\" r=\"0.92\"/></svg>",
  };
  

  var root = document.documentElement;

  
  var LANGS = [
    { code: 'he', label: 'עברית',   dir: 'rtl' },
    { code: 'en', label: 'English', dir: 'ltr' }
  ];
  var CURRENT = (document.documentElement.getAttribute('lang') || 'he')
                  .slice(0, 2).toLowerCase();

  
  function btn(kind, svg, aria) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'slico';
    b.setAttribute('data-sl', kind);
    b.setAttribute('aria-label', aria);
    b.setAttribute('aria-expanded', 'false');
    b.innerHTML = svg;
    return b;
  }
  var grp = document.createElement('div');
  grp.className = 'slgrp';
  var bSearch = btn('search', ICON.search || '', 'חיפוש');
  var bLang   = btn('lang',   ICON.globe  || '', 'שינוי שפה');
  grp.appendChild(bSearch);
  grp.appendChild(bLang);

  
  var pop = document.createElement('div');
  pop.className = 'langpop';
  pop.setAttribute('role', 'menu');
  LANGS.forEach(function (l) {
    var a = document.createElement('a');
    a.href = '#';
    a.setAttribute('role', 'menuitem');
    a.setAttribute('lang', l.code);
    a.setAttribute('data-lang', l.code);
    if (l.code === CURRENT) a.setAttribute('aria-current', 'true');
    var dot = document.createElement('i'); dot.setAttribute('aria-hidden', 'true');
    var s = document.createElement('span');
    if (l.dir === 'ltr') s.setAttribute('dir', 'ltr');
    s.textContent = l.label;
    a.appendChild(dot); a.appendChild(s);
    pop.appendChild(a);
  });
  
  hdr.appendChild(pop);

  
  var navRight = hdr.querySelector('.nav-right');
  var mainnav  = hdr.querySelector('.mainnav');
  function place() {
    var where = root.getAttribute('data-slplace') || 'nr';
    if (where === 'mn' && mainnav) mainnav.appendChild(grp);
    else if (navRight) navRight.appendChild(grp);
    else hdr.appendChild(grp);
  }
  place();

  
  function fitLabel(btn) {
    var lbl = btn.querySelector('.lbl');
    if (!lbl) return;
    var probe = lbl.cloneNode(true);
    probe.style.cssText = 'position:absolute;left:-9999px;top:0;visibility:hidden;' +
                          'width:auto;white-space:nowrap';
    btn.appendChild(probe);
    var w = probe.getBoundingClientRect().width;
    probe.parentNode.removeChild(probe);
    if (w) btn.style.setProperty('--lblw', w.toFixed(3) + 'px');
  }

  
  function inlineBox() {
    var h = hdr.getBoundingClientRect(),
        g = grp.getBoundingClientRect(),
        lg = hdr.querySelector('.logo');
    var start = (g.right - h.left) + 16;
    var end   = lg ? (lg.getBoundingClientRect().left - h.left) - 24 : h.width - 44;
    inline.style.left = start + 'px';
    inline.style.right = 'auto';
    root.style.setProperty('--slinline-w', Math.max(220, end - start) + 'px');
  }

  
  function anchor() {
    var h = hdr.getBoundingClientRect(), g = bLang.getBoundingClientRect();
    var w = pop.offsetWidth || 176;
    
    var x = (g.right - h.left) - w;
    
    pop.style.left = Math.max(12, Math.min(x, h.width - w - 12)) + 'px';
  }

  
  var FIELD =
    '<div class="slfield">' + (ICON.search || '') +
      '<input type="search" name="q" autocomplete="off" ' +
             'placeholder="חפשו פתרון, תעשייה או מאמר" aria-label="חיפוש">' +
    '</div>';
  
  var SUBMIT =
    '<a class="btn btn-dark slsubmit" href="#" role="button">' +
      '<span class="badge"><img src="fig/btn-arrow.svg" alt=""></span>' +
      '<span class="lbl">חיפוש</span>' +
    '</a>';
  var RESULTS = '<div class="slres" aria-live="polite"></div>';

  
  var panel = document.createElement('div');
  panel.className = 'slw';
  panel.innerHTML = '<div class="slpanel"><form class="slform">' +
                    FIELD + SUBMIT + '</form>' + RESULTS + '</div>';
  hdr.appendChild(panel);

  
  var inline = document.createElement('div');
  inline.className = 'slinline';
  inline.innerHTML = '<form class="slform">' + FIELD + '</form>';
  hdr.appendChild(inline);

  
  var over = document.createElement('div');
  over.className = 'slover';
  over.innerHTML = '<div class="slbox"><form class="slform">' +
                   FIELD + SUBMIT + '</form>' + RESULTS + '</div>';
  document.body.appendChild(over);

  
  function fitAll() {
    [].forEach.call(document.querySelectorAll('.slsubmit'), fitLabel);
  }
  fitAll();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAll);

  
  var open = null;                                   

  
  function setTop() {
    var r = hdr.getBoundingClientRect();
    var gap = parseFloat(getComputedStyle(root).getPropertyValue('--menu-gap')) ||
              parseFloat(getComputedStyle(hdr).getPropertyValue('--menu-gap')) || 16;
    root.style.setProperty('--menu-top', Math.max(0, r.bottom) + gap + 'px');
  }

  function scrim() {
    if (document.querySelector('.menu-scrim')) return;
    var sc = document.createElement('div');
    sc.className = 'menu-scrim';
    sc.addEventListener('click', close);
    document.body.appendChild(sc);
  }

  
  function closeNavMenu() {
    var t = hdr.querySelector('.mainnav a.open');
    if (t) t.click();
  }

  function close() {
    if (!open) return;
    root.classList.remove('sl-open', 'lang-open');
    bSearch.setAttribute('aria-expanded', 'false');
    bLang.setAttribute('aria-expanded', 'false');
    var sc = document.querySelector('.menu-scrim');
    if (sc && !root.classList.contains('menu-open')) sc.remove();
    open = null;
  }

  function show(kind) {
    if (open === kind) { close(); return; }
    close();
    closeNavMenu();
    setTop();
    open = kind;
    if (kind === 'lang') {
      anchor();
      root.classList.add('lang-open');
      bLang.setAttribute('aria-expanded', 'true');
      return;
    }
    root.classList.add('sl-open');
    bSearch.setAttribute('aria-expanded', 'true');
    var mode = root.getAttribute('data-slsearch') || 'panel';
    if (mode === 'panel') scrim();
    if (mode === 'inline') inlineBox();
    
    var host = mode === 'overlay' ? over : mode === 'inline' ? inline : panel;
    var f = host.querySelector('input');
    if (f) setTimeout(function () { f.focus(); }, 60);
    if (host.__srqDemo) setTimeout(host.__srqDemo, 120);
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
  withEngine(function () { [panel, inline, over].forEach(function (h) { DNBSearch.attach(h); }); });
  bSearch.addEventListener('click', function (e) { e.preventDefault(); show('search'); });
  bLang  .addEventListener('click', function (e) { e.preventDefault(); show('lang'); });

  
  pop.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[data-lang]') : null;
    if (!a) return;
    e.preventDefault();
    close();
  });

  over.addEventListener('click', function (e) { if (e.target === over) close(); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && open) {
      var back = open === 'lang' ? bLang : bSearch;
      close(); back.focus();
    }
  });

  
  document.addEventListener('click', function (e) {
    if (!open) return;
    if (hdr.contains(e.target)) return;
    if (over.contains(e.target)) return;
    close();
  });

  
  [].forEach.call(hdr.querySelectorAll('.mainnav a'), function (a) {
    if (grp.contains(a)) return;
    a.addEventListener('click', function () { if (open) close(); });
  });

  
  new MutationObserver(function () { place(); })
    .observe(root, { attributes: true, attributeFilter: ['data-slplace'] });
})();
