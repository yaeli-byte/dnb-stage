
(function () {
  
  var strip = document.querySelector('[role="tablist"][aria-label="פיצ׳רים"]')
    || document.querySelector('[role="tablist"][aria-label="מאפייני המוצר"]')
    || document.querySelector('[role="tablist"][aria-label="הכלים"]')
           || document.querySelector('[role="tablist"][aria-label="הכלים"]');
  if (!strip) return;
  var sec = strip.closest('section');
  if (!sec) return;
  var first = sec.querySelector('[role="tabpanel"]');
  if (!first) return;

  var tabs = [].slice.call(strip.querySelectorAll('[role="tab"]'));
  if (tabs.length < 2) return;

  
  tabs.forEach(function (t) {
    [].forEach.call(t.querySelectorAll('svg,img'), function (g) { g.remove(); });
    t.style.gap = '0';
  });

  var LOREM = 'לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית סחטיר בלוקריה, ' +
              'מונפרד אדנדום סילקוף מרגשי ומרגשח. עמיד היה ברור בשיצמו המרוח.';

  function labelOf(t) { return (t.textContent || '').replace(/\s+/g, ' ').trim(); }

  
  
  var REAL = window.DNB_FEATURE_PANELS || {};

  var panels = [first];
  
  if (REAL[labelOf(tabs[0])]) {
    var holder0 = document.createElement('div');
    holder0.innerHTML = REAL[labelOf(tabs[0])];
    var real0 = holder0.firstElementChild;
    if (real0) { first.parentNode.replaceChild(real0, first); first = real0; panels[0] = real0; }
  }
  for (var i = 1; i < tabs.length; i++) {
    var supplied = REAL[labelOf(tabs[i])];
    if (supplied) {
      var h = document.createElement('div');
      h.innerHTML = supplied;
      var real = h.firstElementChild;
      if (real) {
        first.parentNode.insertBefore(real, first.nextSibling);
        panels.push(real);
        continue;
      }
    }
    var p = first.cloneNode(true);
    p.setAttribute('data-placeholder', '1');
    var h3 = p.querySelector('h3');
    if (h3) h3.textContent = labelOf(tabs[i]);
    var para = p.querySelector('p');
    if (para) para.textContent = LOREM;
    var count = p.querySelector('span[dir="ltr"]');
    if (count) count.textContent = '0' + (i + 1) + ' / 0' + tabs.length;
    
    var scene = p.querySelector('.tool-scene');
    if (scene) {
      var slot = document.createElement('div');
      slot.className = 'tool-scene pf-wait';
      slot.setAttribute('data-needs-asset', '1');
      slot.innerHTML = '<span>\u26a0 \u05d7\u05e1\u05e8 \u05d3\u05d9\u05de\u05d5\u05d9 \u05dc\u05e4\u05d9\u05e6\u05f3\u05e8 \u00ab' +
        labelOf(tabs[i]) + '\u00bb</span>' +
        '<span class="sub">\u05e1\u05dc\u05d5\u05d8 \u05e8\u05d9\u05e7, \u05dc\u05d0 \u05d3\u05d9\u05de\u05d5\u05d9 \u05e9\u05d4\u05d5\u05e9\u05d0\u05dc \u05de\u05e4\u05d9\u05e6\u05f3\u05e8 \u05d0\u05d7\u05e8</span>';
      scene.parentNode.replaceChild(slot, scene);
    }
    first.parentNode.insertBefore(p, first.nextSibling);
    panels.push(p);
  }
  
  panels.forEach(function (p) { first.parentNode.appendChild(p); });

  var c0 = first.querySelector('span[dir="ltr"]');
  if (c0) c0.textContent = '01 / 0' + tabs.length;

  function show(n) {
    tabs.forEach(function (t, k) {
      var on = k === n;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.setAttribute('tabindex', on ? '0' : '-1');
      t.classList.toggle('is-active', on);
    });
    panels.forEach(function (p, k) { p.hidden = k !== n; });
  }

  tabs.forEach(function (t, i) {
    t.style.cursor = 'pointer';
    t.addEventListener('click', function () { show(i); });
    t.addEventListener('keydown', function (e) {
      
      var d = e.key === 'ArrowLeft' ? 1 : e.key === 'ArrowRight' ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      var j = (i + d + tabs.length) % tabs.length;
      show(j); tabs[j].focus();
    });
  });

  
  var host = strip.parentElement;
  if (host) {
    var g = getComputedStyle(document.documentElement).getPropertyValue('--tabgap').trim() || '16px';
    host.style.gap = g;
  }

  
  var list = sec.querySelector('ul[aria-label]');
  if (list && !list.closest('.pf-card')) {
    var card = document.createElement('div');
    card.className = 'pf-card';
    var dots = document.createElement('span');
    dots.className = 'pf-dots'; dots.setAttribute('aria-hidden', 'true');
    var eb = document.createElement('div');
    eb.className = 'eb pf-eb';
    eb.innerHTML = '<span>פיצ׳רים</span>';  
    card.appendChild(dots); card.appendChild(eb);
    
    card.appendChild(list);
    
    (strip.parentElement || sec).appendChild(card);
  }

  show(0);
})();
