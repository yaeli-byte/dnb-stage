
(function () {
  var root = document.querySelector('.pg-article'); if (!root) return;

  
  var name = (root.getAttribute('data-author-name') || '').trim(), role = (root.getAttribute('data-author-role') || '').trim();
  var date = [].slice.call(root.querySelectorAll('span')).filter(function (s) { return /^\d{2}\.\d{2}\.\d{4}$/.test(s.textContent.trim()) && !s.children.length; })[0];
  var row = date && date.closest('div[style*="gap:14px"]');
  if (row) {
    var kids = [].slice.call(row.children);
    var avatar = kids[0], who = kids[1], meta = kids[2];
    if (!name) { if (avatar) avatar.remove(); if (who) who.remove(); if (meta) meta.style.marginInlineStart = '0'; }
    else if (who) { var sp = who.querySelectorAll('span'); if (sp[0]) sp[0].textContent = name; if (sp[1]) sp[1].textContent = role; }
  }

  
  var lab = [].slice.call(root.querySelectorAll('span')).filter(function (s) { return s.textContent.trim() === 'על הכותבת' && !s.children.length; })[0];
  var box = lab && lab.closest('div[style*="border-radius:16px"], aside, div[style*="padding:28px"]');
  if (!box && lab) { box = lab; for (var n = 0; n < 5 && box.parentElement && !/border-radius:\s*1[0-9]px/.test(box.getAttribute('style') || ''); n++) box = box.parentElement; }
  if (box) {
    if (!name) box.remove();
    else {
      var spans = box.querySelectorAll('span'); for (var k = 0; k < spans.length; k++) if (spans[k].textContent.trim() === 'מיכל רוזן') spans[k].textContent = name;
      var bio = (root.getAttribute('data-author-bio') || '').trim(), bp = box.querySelector('p'); if (bp) { if (bio) bp.textContent = bio; else bp.remove(); }
    }
  }

  
  var PRODUCTS = { 'Finance Analytics': 'product.html' };
  var body = root.querySelector('.hero-card') ? null : root;
  var paras = [].slice.call(root.querySelectorAll('p')).filter(function (p) { return !p.closest('nav,aside,.hero-card,.cu'); });
  Object.keys(PRODUCTS).forEach(function (nm) {
    paras.forEach(function (p) {
      var w = document.createTreeWalker(p, NodeFilter.SHOW_TEXT), n, hits = [];
      while ((n = w.nextNode())) if (n.nodeValue.indexOf(nm) > -1 && !n.parentNode.closest('a')) hits.push(n);
      hits.forEach(function (t) {
        var parts = t.nodeValue.split(nm), frag = document.createDocumentFragment();
        parts.forEach(function (part, i) {
          frag.appendChild(document.createTextNode(part));
          if (i < parts.length - 1) {
            var a = document.createElement('a'); a.href = PRODUCTS[nm]; a.textContent = nm; a.setAttribute('dir', 'ltr');
            a.style.cssText = 'color:#0083A1;text-decoration:none;font-weight:500;unicode-bidi:isolate';
            frag.appendChild(a);
          }
        });
        t.parentNode.replaceChild(frag, t);
      });
    });
  });

  
  if (window.DNBShare) DNBShare.replace(root);

  
  (function () {
    var id = new URLSearchParams(location.search).get('cover'), C = window.DNB_COVERS || {}; if (!id || !C[id]) return;
    var img = root.querySelector('img[width="1240"], img[width="326"]'); if (!img) return;
    var f = C[id].files[img.getAttribute('width') === '1240' ? 'hero' : 'mobile']; if (!f) return;
    img.src = f['1x']; img.srcset = f['1x'] + ' 1x, ' + f['2x'] + ' 2x'; img.width = f.w; img.height = f.h;
  })();
})();
