
(function () {
  var btns = [].slice.call(document.querySelectorAll('button[aria-expanded][aria-controls]'));
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
        
        var f = document.createElement('p');
        f.className = 'dnb-invented';
        f.style.cssText = 'margin:0; font-size:14px; line-height:19px; color:#AF2D1D';
        f.textContent = '⚠ חסר תוכן לפריט «' + titleOf(b) + '» — יילקח מהעמוד בדסקטופ';
        region.appendChild(f);
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
