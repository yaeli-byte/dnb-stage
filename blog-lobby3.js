
(function () {
  var root = document.querySelector('.bl'); if (!root) return;
  var M = root.getAttribute('data-bl') === 'm';
  var POSTS = (window.DNB_POSTS || []).slice(), COV = window.DNB_COVERS || {};
  var BATCH = M ? 4 : 9, ROWMAX = 6;
  var RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var TABS = [
    { id: 'all',      label: 'הכל',             type: null,       q: null },
    { id: 'articles', label: 'מאמרים',          type: 'article',  q: 'articles' },
    { id: 'snapshot', label: 'מצב סקירת המשק',  type: 'snapshot', q: 'economy' },
    { id: 'review',   label: 'סקירות',          type: 'review',   q: 'reviews' },
    { id: 'sector',   label: 'סקירות ענפיות',   type: 'sector',   q: 'sector-reviews' }
  ];
  var TAG = { article: ['מאמר', ''], snapshot: ['תמונת מצב', 's'], review: ['סקירה', 'r'], sector: ['סקירה ענפית', 'r'] };
  var HREF = { review: 'review.html' };               // the gated review page; everything else → the article template
  var SORT = [['new', 'מיון: החדשים ביותר'], ['old', 'מיון: הישנים ביותר']];
  var state = { tab: 'all', sort: 'new', shown: {}, feat: 0 };

  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function tabOf(id) { return TABS.filter(function (t) { return t.id === id; })[0] || TABS[0]; }
  function items(tabId) {
    var t = tabOf(tabId);
    var a = POSTS.filter(function (p) { return !t.type || p.type === t.type; });
    a.sort(function (x, y) { return state.sort === 'old' ? (x.date < y.date ? -1 : 1) : (x.date < y.date ? 1 : -1); });
    return a;
  }
  
  function cover(p, fmt, cls) {
    var c = COV[p.cover], f = c && c.files[fmt]; if (!f) return '';
    return '<img class="' + cls + '" src="' + f['1x'] + '" srcset="' + f['1x'] + ' 1x, ' + f['2x'] + ' 2x" width="' + f.w + '" height="' + f.h +
      '" alt="" aria-hidden="true" loading="lazy" decoding="async">';
  }
  function tag(p) { var t = TAG[p.type] || TAG.article; return '<span class="bl-tag ' + t[1] + '"><i></i><span>' + t[0] + '</span></span>'; }
  
  function href(p) { return (HREF[p.type] || 'blog-article.html') + '?cover=' + encodeURIComponent(p.cover); }
  function card(p, fmt) {
    return '<a class="bl-card" href="' + href(p) + '"' + (p.invented ? ' data-invented' : '') + '>' + cover(p, fmt, 'bl-cv') +
      '<div class="bl-cb">' + tag(p) + '<div class="bl-ct"><h3 data-h-keep>' + esc(p.title) + '</h3><p>' + esc(p.excerpt) + '</p></div></div></a>';
  }
  function num(n) { return '<span class="bl-num">' + n + '</span>'; }
  function arrow() { return '<i class="bl-ar" aria-hidden="true"></i>'; }

  
  var FEAT = POSTS.filter(function (p) { return p.featured != null; }).sort(function (a, b) { return a.featured - b.featured; });
  function renderFeat(swap) {
    var slide = $('blSlide'); if (!slide || !FEAT.length) return;
    var p = FEAT[state.feat];
    slide.innerHTML = '<div class="bl-fcopy">' + tag(p) + '<h2 data-h-keep><a class="bl-flink" href="' + href(p) + '">' + esc(p.title) + '</a></h2><p>' +
      esc(p.lede || p.excerpt) + '</p></div><div class="bl-fcover">' + cover(p, M ? 'mobile' : 'featured', 'bl-fimg') + '</div>';
    if (swap) { slide.classList.remove('is-swap'); void slide.offsetWidth; slide.classList.add('is-swap'); }
    var c = $('blFCount'); if (c) c.textContent = (state.feat + 1) + ' / ' + FEAT.length;
    var nav = $('blFNav');
    if (!M && nav) {
      nav.querySelector('.prev').setAttribute('aria-disabled', state.feat === 0);
      nav.querySelector('.next').setAttribute('aria-disabled', state.feat === FEAT.length - 1);
    }
    if (M) [].forEach.call(document.querySelectorAll('.bl-dotsnav button'), function (b, i) { b.setAttribute('aria-current', i === state.feat ? 'true' : 'false'); });
  }
  function goFeat(i) { i = Math.max(0, Math.min(FEAT.length - 1, i)); if (i === state.feat) return; state.feat = i; renderFeat(true); }
  function buildFeatNav() {
    var nav = $('blFNav'); if (!nav || FEAT.length < 2) { if (nav) nav.hidden = true; return; }
    if (M) {
      nav.className = 'bl-dotsnav'; nav.setAttribute('role', 'group'); nav.setAttribute('aria-label', 'כתבות נבחרות');
      nav.innerHTML = FEAT.map(function (p, i) { return '<button type="button" aria-label="כתבה ' + (i + 1) + ' מתוך ' + FEAT.length + '" aria-current="' + (i === 0) + '"><i></i></button>'; }).join('');
      nav.addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; goFeat([].indexOf.call(nav.children, b)); });
      var sx = null, sl = $('blSlide');
      sl.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
      sl.addEventListener('touchend', function (e) {
        if (sx == null) return; var dx = e.changedTouches[0].clientX - sx; sx = null;
        if (Math.abs(dx) > 40) goFeat(state.feat + (dx > 0 ? 1 : -1));        // RTL: dragging right brings the next one in
      }, { passive: true });
    } else {
      nav.innerHTML = '<button type="button" class="bl-ctl prev" aria-label="הקודם" aria-disabled="true">' + arrow() + '</button>' +
        '<button type="button" class="bl-ctl next" aria-label="הבא" aria-disabled="false">' + arrow() + '</button>';
      nav.addEventListener('click', function (e) {
        var b = e.target.closest('.bl-ctl'); if (!b || b.getAttribute('aria-disabled') === 'true') return;
        goFeat(state.feat + (b.classList.contains('next') ? 1 : -1));
      });
    }
  }

  
  function buildBar() {
    var tabs = $('blTabs');
    tabs.innerHTML = TABS.map(function (t) {
      return '<button type="button" class="bl-tab" role="tab" id="blTab-' + t.id + '" data-tab="' + t.id + '" aria-controls="blPanel" aria-selected="false" tabindex="-1">' + t.label + '</button>';
    }).join('');
    $('blTools').innerHTML = '<span class="bl-count" id="blCount" role="status" aria-live="polite"></span>' +
      '<label class="bl-sort"><select id="blSort" aria-label="מיון">' +
      SORT.map(function (s) { return '<option value="' + s[0] + '"' + (s[0] === 'old' ? ' data-invented' : '') + '>' + s[1] + '</option>'; }).join('') + '</select></label>';
    tabs.addEventListener('click', function (e) { var b = e.target.closest('.bl-tab'); if (b) select(b.getAttribute('data-tab'), true); });
    tabs.addEventListener('keydown', function (e) {
      var all = [].slice.call(tabs.querySelectorAll('.bl-tab')), i = all.indexOf(document.activeElement); if (i < 0) return;
      var n = null;
      
      if (e.key === 'ArrowLeft') n = all[(i + 1) % all.length]; else if (e.key === 'ArrowRight') n = all[(i - 1 + all.length) % all.length];
      else if (e.key === 'Home') n = all[0]; else if (e.key === 'End') n = all[all.length - 1];
      if (n) { e.preventDefault(); n.focus(); n.scrollIntoView({ block: 'nearest', inline: 'nearest' }); }
    });
    $('blSort').addEventListener('change', function () { state.sort = this.value; render(false); });
  }
  function setBar(tabId) {
    [].forEach.call(document.querySelectorAll('.bl-tab'), function (b) {
      var on = b.getAttribute('data-tab') === tabId; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1;
    });
    var n = items(tabId).length;
    $('blCount').innerHTML = n === 0 ? 'אין פריטים' : (n === 1 ? 'פריט אחד' : num(n) + ' פריטים');
    var p = $('blPanel'); p.setAttribute('aria-labelledby', 'blTab-' + tabId);
  }

  
  function sectionAll(t) {
    var a = items(t.id).slice(0, ROWMAX); if (!a.length) return '';
    var cards = a.map(function (p) { return M ? '<li>' + card(p, 'card-m') + '</li>' : card(p, 'card'); }).join('');
    return '<section class="bl-psec" aria-labelledby="blH-' + t.id + '"><div class="bl-phead"><h2 id="blH-' + t.id + '" data-h-keep>' + t.label + '</h2><div class="bl-pside">' +
      '<button type="button" class="bl-all" data-go="' + t.id + '">ראה הכל' + arrow() + '</button>' +
      (M ? '' : '<div class="bl-rnav"><button type="button" class="bl-ctl prev" aria-label="הקודם" aria-disabled="true">' + arrow() + '</button>' +
        '<button type="button" class="bl-ctl next" aria-label="הבא" aria-disabled="false">' + arrow() + '</button></div>') +
      '</div></div>' + (M ? '<ul class="bl-swipe">' + cards + '</ul>' : '<div class="bl-row">' + cards + '</div>') + '</section>';
  }
  function sectionTab(t) {
    var a = items(t.id), shown = state.shown[t.id] || BATCH, n = a.length;
    var body;
    if (!n) body = '<p class="bl-empty" data-invented>עדיין אין כאן ' + t.label + '. הראשונות יפורסמו בקרוב.</p>';
    else body = '<div class="bl-grid" id="blGrid">' + a.slice(0, shown).map(function (p) { return card(p, M ? 'mobile' : 'card'); }).join('') + '</div>' +
      '<div class="bl-moreWrap" id="blMoreWrap"' + (shown >= n ? ' hidden' : '') + '><button type="button" class="bl-more" id="blMore">טען עוד מאמרים' + arrow() + '</button></div>';
    return '<section class="bl-psec" aria-labelledby="blH-' + t.id + '"><div class="bl-phead is-tab"><h2 id="blH-' + t.id + '" data-h-keep>' + t.label + '</h2></div>' + body + '</section>';
  }
  function rowNav() {
    [].forEach.call(document.querySelectorAll('.bl-psec'), function (sec) {
      var row = sec.querySelector('.bl-row'); if (!row) return;
      var prev = sec.querySelector('.bl-ctl.prev'), next = sec.querySelector('.bl-ctl.next');
      function upd() {
        var x = Math.abs(row.scrollLeft), max = row.scrollWidth - row.clientWidth;
        prev.setAttribute('aria-disabled', x < 2); next.setAttribute('aria-disabled', x > max - 2);
      }
      function by(dir) { row.scrollBy({ left: -dir * (row.clientWidth + 32), behavior: RM ? 'auto' : 'smooth' }); }   // RTL: forward is leftward
      prev.addEventListener('click', function () { if (prev.getAttribute('aria-disabled') !== 'true') by(-1); });
      next.addEventListener('click', function () { if (next.getAttribute('aria-disabled') !== 'true') by(1); });
      row.addEventListener('scroll', upd, { passive: true }); upd();
    });
  }
  function render(swap) {
    var t = tabOf(state.tab), p = $('blPanel');
    p.innerHTML = t.id === 'all' ? TABS.slice(1).map(sectionAll).join('') : sectionTab(t);
    if (swap && !RM) { p.classList.remove('is-swap'); void p.offsetWidth; p.classList.add('is-swap'); }
    setBar(t.id); rowNav();
  }

  
  function select(id, push) {
    if (id === state.tab && !push) return;
    var bar = document.querySelector('.bl-barwrap'), y = bar.getBoundingClientRect().top;
    state.tab = id; state.shown[id] = BATCH; render(true);
    var dy = bar.getBoundingClientRect().top - y; if (dy) window.scrollBy(0, dy);
    if (push) {
      var q = new URLSearchParams(location.search), t = tabOf(id);
      if (t.q) q.set('type', t.q); else q.delete('type');
      var s = q.toString(); history.pushState({ tab: id }, '', location.pathname + (s ? '?' + s : '') + location.hash);
    }
  }
  function fromUrl() {
    var q = new URLSearchParams(location.search).get('type');
    return (TABS.filter(function (t) { return t.q && t.q === q; })[0] || TABS[0]).id;
  }

  root.addEventListener('click', function (e) {
    var g = e.target.closest('[data-go]');
    if (g) { select(g.getAttribute('data-go'), true); var b = $('blTab-' + g.getAttribute('data-go')); if (b) b.focus({ preventScroll: true }); return; }
    if (e.target.closest('#blMore')) {
      var t = tabOf(state.tab), a = items(t.id), from = state.shown[t.id] || BATCH, to = Math.min(a.length, from + BATCH);
      state.shown[t.id] = to;
      var html = a.slice(from, to).map(function (p) { return card(p, M ? 'mobile' : 'card'); }).join('');
      var grid = $('blGrid'), before = grid.children.length; grid.insertAdjacentHTML('beforeend', html);
      if (to >= a.length) $('blMoreWrap').hidden = true;
      var first = grid.children[before]; if (first) first.focus({ preventScroll: false });
    }
  });
  window.addEventListener('popstate', function () { var id = fromUrl(); if (id !== state.tab) select(id, false); });

  
  function stick() {
    var h = document.querySelector('#header'); var hh = h ? h.getBoundingClientRect().height : 0;
    if (hh <= 30) return;
    
    var probe = document.createElement('div'); probe.style.cssText = 'position:absolute;width:100px;height:0;visibility:hidden'; root.appendChild(probe);
    var z = probe.getBoundingClientRect().width / 100 || 1; probe.remove();
    root.style.setProperty('--bl-top', (hh / z).toFixed(2) + 'px');   
  }
  window.addEventListener('resize', stick); window.addEventListener('load', stick);
  
  (function () { var h = document.querySelector('#header'); if (h && window.ResizeObserver) new ResizeObserver(stick).observe(h); })();

  buildBar(); buildFeatNav();
  state.tab = fromUrl(); state.shown[state.tab] = BATCH;
  renderFeat(false); render(false); stick();
  setTimeout(stick, 600);
})();
