
(function () {
  
  var btns = [].slice.call(document.querySelectorAll('button[aria-expanded][aria-controls]')).filter(function (b) {
    return !b.closest('#header, header, .msheet, .menuw, .slm, #fb, #faq');
  });
  if (!btns.length) return;

  function titleOf (b) {
    
    var best = '', nodes = b.querySelectorAll('span,b,strong');
    [].forEach.call(nodes, function (n) {
      if (n.children.length) return;
      var t = (n.textContent || '').replace(/\s+/g, ' ').trim();
      if (t.length > 1 && !/^\d+\s*\/\s*\d+$/.test(t) && t.length > best.length) best = t;
    });
    return best;
  }

  
  function copyFrom (html) {
    var d = document.createElement('div');
    d.innerHTML = html;
    var out = [];
    [].forEach.call(d.querySelectorAll('p'), function (p) {
      var t = (p.textContent || '').replace(/\s+/g, ' ').trim();
      if (t.length > 20) out.push(t);
    });
    return out;
  }

  function bodyFor (title) {
    var P = window.DNB_FEATURE_PANELS || {};
    if (P[title]) return copyFrom(P[title]);
    var S = window.DNB_SOL_PRODUCTS || {};
    if (S[title]) return (S[title].p || []).concat(S[title].li || []);
    return null;
  }

  btns.forEach(function (b) {
    var id = b.getAttribute('aria-controls');
    var region = document.getElementById(id);

    if (!region) {
      region = document.createElement('div');
      region.id = id;
      region.setAttribute('role', 'region');
      region.style.cssText = 'padding:0 16px 16px; display:flex; flex-direction:column; gap:12px';
      var lines = bodyFor(titleOf(b));
      if (lines && lines.length) {
        lines.forEach(function (t) {
          var p = document.createElement('p');
          p.style.cssText = 'margin:0; font-size:16px; line-height:21px; color:#51606B; text-align:right';
          p.textContent = t;
          region.appendChild(p);
        });
      } else {
        
        region.setAttribute('data-invented', titleOf(b));
      }
      
      b.parentNode.insertBefore(region, b.nextSibling);
    }

    var open = b.getAttribute('aria-expanded') === 'true';
    region.hidden = !open;
    
    region.style.display = open ? 'flex' : 'none';

    b.addEventListener('click', function () {
      var nowOpen = b.getAttribute('aria-expanded') !== 'true';
      
      var group = b.closest('div').parentNode;
      [].forEach.call(group.querySelectorAll('button[aria-expanded][aria-controls]'), function (o) {
        if (o === b) return;
        o.setAttribute('aria-expanded', 'false');
        var r = document.getElementById(o.getAttribute('aria-controls'));
        if (r) { r.hidden = true; r.style.display = 'none'; }
      });
      b.setAttribute('aria-expanded', nowOpen ? 'true' : 'false');
      region.hidden = !nowOpen;
      region.style.display = nowOpen ? 'flex' : 'none';
    });
  });
})();


(function () {
  var PAGES = { 'מערכת ניהול סיכונים': 'product.html' };
  var bs = [].slice.call(document.querySelectorAll('button[aria-controls^="smp-"],button[aria-controls^="fa-"]'))
    .filter(function (b) { return !b.closest('#header, header, .msheet, .menuw, #fb, #faq'); });
  bs.forEach(function (b) {
    var tile = b.lastElementChild;
    if (!tile || tile.classList.contains('acc-pm')) return;
    var t = document.createElement('span');
    t.className = 'sg-tile acc-pm';
    t.setAttribute('aria-hidden', 'true');
    t.innerHTML = '<span class="acc-pm__g"><img class="h" src="fig/faq2-plus-h.svg" alt=""><img class="v" src="fig/faq2-plus-v.svg" alt=""></span>';
    b.replaceChild(t, tile);
    
    var reg = document.getElementById(b.getAttribute('aria-controls'));
    var name = '';
    [].forEach.call(b.querySelectorAll('span'), function (s) { if (!s.children.length && s.textContent.trim().length > name.length && !/^\d+\s*\/\s*\d+$/.test(s.textContent.trim())) name = s.textContent.trim(); });
    var href = PAGES[name];
    if (reg && href && !reg.querySelector('a[href]:not([href="#"])')) {
      var src = document.querySelector('[id^="smp-"] a.dnb-btn[href]:not([href="#"])');
      var txt = reg.querySelector('p');
      if (src && txt) { var a = src.cloneNode(true); a.setAttribute('href', href); txt.parentNode.appendChild(a); }
    }
  });
  
  [].forEach.call(document.querySelectorAll('[data-pr-scene]'), function (sc) {
    var plate = sc.firstElementChild;
    if (!plate) return;
    function fit () { var w = sc.clientWidth; if (w) plate.style.transform = 'scale(' + (w / 600) + ')'; }
    if (window.ResizeObserver) new ResizeObserver(fit).observe(sc);
    fit();
  });
})();


(function () {
  [].forEach.call(document.querySelectorAll('[data-pr-scene]'), function (sc) {
    var plate = sc.firstElementChild, frame = plate && plate.firstElementChild;
    if (!frame) return;
    var H = 0;
    
    function measure() {
      var b = 0;
      [].forEach.call(frame.querySelectorAll('*'), function (e) {
        if (e.closest('svg') && e.tagName.toLowerCase() !== 'svg') return;
        var isArt = /^(svg|img)$/i.test(e.tagName), txt = false;
        if (!isArt) for (var n = e.firstChild; n; n = n.nextSibling) if (n.nodeType === 3 && n.textContent.trim()) { txt = true; break; }
        if (!isArt && !txt) return;
        var h = e; while (h && !(h instanceof HTMLElement)) h = h.parentElement;
        if (!h || !h.offsetHeight) return;
        var y = h.offsetHeight, o = h;
        while (o && o !== frame) { y += o.offsetTop; o = o.offsetParent; }
        if (o === frame) b = Math.max(b, y);
      });
      return b;
    }
    function fit() {
      var w = sc.clientWidth, h = sc.clientHeight;
      if (!w || !h) return;
      if (!H) { var b = measure(); if (!b) return; H = b > 420 ? Math.ceil(b + 20) : 420; }
      frame.style.height = H + 'px'; plate.style.height = H + 'px';
      var k = Math.min(w / 600, h / H);
      plate.style.transform = 'translateX(' + ((w - 600 * k) / 2).toFixed(2) + 'px) scale(' + k.toFixed(5) + ')';
    }
    if (window.ResizeObserver) new ResizeObserver(fit).observe(sc);
    fit();
  });
})();
