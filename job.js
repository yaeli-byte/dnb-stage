
(function () {
  var root = document.querySelector('.pg-job, .pg-article');
  if (!root) return;
  var nav = root.querySelector('nav[aria-label="תוכן העניינים"]');
  if (!nav) return;
  var heads = [].slice.call(root.querySelectorAll('h2'));
  var links = [].slice.call(nav.querySelectorAll('a'));
  var on = links[0] ? links[0].getAttribute('style') : '', off = links[1] ? links[1].getAttribute('style') : '';
  var pairs = links.map(function (a, i) {
    var h = heads.filter(function (x) { return x.textContent.trim() === a.textContent.trim(); })[0];
    if (!h) return null;
    h.id = h.id || 'job-s' + i;
    h.style.scrollMarginTop = '120px';
    a.setAttribute('href', '#' + h.id);
    return [a, h];
  }).filter(Boolean);
  function mark() {
    var cur = pairs[0];
    pairs.forEach(function (p) { if (p[1].getBoundingClientRect().top < 160) cur = p; });
    pairs.forEach(function (p) { p[0].setAttribute('style', p === cur ? on : off); });
  }
  
  var src = [].slice.call(root.querySelectorAll('a.dnb-btn')).filter(function (a) { return /^הגשת מועמדות/.test(a.textContent.trim()); })[0];
  if (src && !nav.querySelector('.nav-apply')) {
    var b = src.cloneNode(true); b.classList.add('nav-apply'); b.removeAttribute('data-ap-wired'); b.setAttribute('href', '#');
    b.style.marginTop = '24px'; b.style.alignSelf = 'flex-start';
    nav.appendChild(b);
  }
  if (on && off && on !== off) { addEventListener('scroll', mark, { passive: true }); mark(); }
})();



(function () {
  var root = document.querySelector('.pg-job, .pg-article');
  
  
  if (root && root.querySelector('a[aria-label="שיתוף בוואטסאפ"]') && !root.querySelector('.share')) {
    var pu2 = encodeURIComponent(location.href.split('#')[0]);
    var pt2 = encodeURIComponent(((root.querySelector('h1') || {}).textContent || document.title).trim());
    [].slice.call(root.querySelectorAll('a[aria-label^="שיתוף"]')).forEach(function (a) {
      var l = a.getAttribute('aria-label');
      if (/וואטסאפ/.test(l)) { a.href = 'https:/' + '/wa.me/?text=' + pt2 + '%20' + pu2; a.target = '_blank'; a.rel = 'noopener'; }
      else if (/מייל/.test(l)) a.href = 'mailto:?subject=' + pt2 + '&body=' + pu2;
      else if (/לינקדאין/.test(l)) { a.href = 'https:/' + '/www.linkedin.com/sharing/share-offsite/?url=' + pu2; a.target = '_blank'; a.rel = 'noopener'; }
    });
    return;
  }
  if (root && root.querySelector('.r3s')) {
    var pu = encodeURIComponent(location.href.split('#')[0]);
    var pt = ((root.querySelector('h1') || {}).textContent || document.title).trim();
    [].slice.call(root.querySelectorAll('.r3s')).forEach(function (a) {
      var l = a.getAttribute('aria-label') || '';
      if (/לינקדאין/.test(l)) { a.href = 'https:/' + '/www.linkedin.com/sharing/share-offsite/?url=' + pu; a.target = '_blank'; a.rel = 'noopener'; }
      else if (/\bX\b|טוויטר|אקס/.test(l)) { a.href = 'https:/' + '/twitter.com/intent/tweet?url=' + pu; a.target = '_blank'; a.rel = 'noopener'; }
      else if (/מייל|דוא/.test(l)) { a.href = 'mailto:?subject=' + encodeURIComponent(pt) + '&body=' + pu; }
      else if (/קישור|העתק/.test(l)) {
        a.addEventListener('click', function (e) {
          e.preventDefault();
          var u = location.href.split('#')[0];
          if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(u).catch(function () {});
        });
      }
    });
    return;
  }
  if (!root || root.querySelector('.share')) return;
  var date = [].slice.call(root.querySelectorAll('span')).filter(function (s) {
    return /\d{2}\.\d{2}\.\d{4}/.test(s.textContent) && s.children.length <= 1 && !s.closest('nav,aside');
  })[0];
  if (!date) return;
  var row = date.closest('div');                       
  var title = (root.querySelector('h1') || {}).textContent || document.title;
  title = title.trim();
  var u = encodeURIComponent(location.href.split('#')[0]), t = encodeURIComponent(title);
  var ICON = {
    wa: '<svg width="18" height="18" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><circle cx="12.00" cy="3.20" r="0.80"/><circle cx="9.86" cy="3.47" r="0.80"/><circle cx="7.85" cy="4.26" r="0.80"/><circle cx="6.10" cy="5.53" r="0.80"/><circle cx="4.73" cy="7.19" r="0.80"/><circle cx="3.81" cy="9.14" r="0.80"/><circle cx="3.41" cy="11.26" r="0.80"/><circle cx="3.54" cy="13.42" r="0.80"/><circle cx="4.21" cy="15.47" r="0.80"/><circle cx="4.25" cy="17.49" r="0.80"/><circle cx="3.69" cy="19.58" r="0.80"/><circle cx="6.96" cy="19.39" r="0.80"/><circle cx="8.96" cy="19.81" r="0.80"/><circle cx="11.05" cy="20.34" r="0.80"/><circle cx="13.21" cy="20.32" r="0.80"/><circle cx="15.30" cy="19.78" r="0.80"/><circle cx="17.18" cy="18.72" r="0.80"/><circle cx="18.75" cy="17.24" r="0.80"/><circle cx="19.89" cy="15.40" r="0.80"/><circle cx="20.54" cy="13.35" r="0.80"/><circle cx="20.66" cy="11.19" r="0.80"/><circle cx="20.24" cy="9.08" r="0.80"/><circle cx="19.30" cy="7.13" r="0.80"/><circle cx="17.91" cy="5.48" r="0.80"/><circle cx="16.16" cy="4.23" r="0.80"/><circle cx="14.14" cy="3.45" r="0.80"/><circle cx="9.20" cy="8.30" r="0.80"/><circle cx="10.45" cy="9.12" r="0.80"/><circle cx="10.49" cy="11.00" r="0.80"/><circle cx="12.06" cy="12.48" r="0.80"/><circle cx="13.77" cy="12.14" r="0.80"/><circle cx="14.71" cy="13.56" r="0.80"/><circle cx="12.75" cy="14.15" r="0.80"/><circle cx="10.80" cy="13.24" r="0.80"/><circle cx="9.24" cy="11.75" r="0.80"/><circle cx="8.28" cy="9.82" r="0.80"/></svg>',
    mail: '<svg width="18" height="18" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><circle cx="6.00" cy="5.50" r="0.80"/><circle cx="8.21" cy="5.50" r="0.80"/><circle cx="10.42" cy="5.50" r="0.80"/><circle cx="12.64" cy="5.50" r="0.80"/><circle cx="14.85" cy="5.50" r="0.80"/><circle cx="17.06" cy="5.50" r="0.80"/><circle cx="19.22" cy="5.82" r="0.80"/><circle cx="20.48" cy="7.68" r="0.80"/><circle cx="20.50" cy="9.87" r="0.80"/><circle cx="20.50" cy="12.08" r="0.80"/><circle cx="20.50" cy="14.30" r="0.80"/><circle cx="20.45" cy="16.48" r="0.80"/><circle cx="19.06" cy="18.26" r="0.80"/><circle cx="16.89" cy="18.50" r="0.80"/><circle cx="14.68" cy="18.50" r="0.80"/><circle cx="12.47" cy="18.50" r="0.80"/><circle cx="10.26" cy="18.50" r="0.80"/><circle cx="8.04" cy="18.50" r="0.80"/><circle cx="5.84" cy="18.50" r="0.80"/><circle cx="3.91" cy="17.38" r="0.80"/><circle cx="3.50" cy="15.23" r="0.80"/><circle cx="3.50" cy="13.02" r="0.80"/><circle cx="3.50" cy="10.81" r="0.80"/><circle cx="3.50" cy="8.60" r="0.80"/><circle cx="4.02" cy="6.47" r="0.80"/><circle cx="6.17" cy="8.83" r="0.80"/><circle cx="7.83" cy="10.17" r="0.80"/><circle cx="9.50" cy="11.50" r="0.80"/><circle cx="11.17" cy="12.83" r="0.80"/><circle cx="12.83" cy="12.83" r="0.80"/><circle cx="14.50" cy="11.50" r="0.80"/><circle cx="16.17" cy="10.17" r="0.80"/><circle cx="17.83" cy="8.83" r="0.80"/></svg>',
    li: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor"><path d="M5.2 9.2h2.8V19H5.2zM6.6 4.800a1.600 1.600 0 1 1 0 3.200 1.600 1.600 0 0 1 0-3.200zM10.200 9.200h2.700v1.300c.4-.8 1.400-1.500 2.800-1.500 2.900 0 3.400 1.900 3.400 4.400V19h-2.800v-4.900c0-1.200 0-2.600-1.600-2.600s-1.800 1.200-1.800 2.500V19h-2.800z"/></svg>'
  };
  var LINKS = [
    ['wa', 'שיתוף בווטסאפ', 'https:/' + '/wa.me/?text=' + t + '%20' + u],
    ['mail', 'שיתוף במייל', 'mailto:?subject=' + t + '&body=' + u],
    ['li', 'שיתוף בלינקדאין', 'https:/' + '/www.linkedin.com/sharing/share-offsite/?url=' + u]
  ];
  var g = document.createElement('span'); g.className = 'share'; g.setAttribute('role', 'group'); g.setAttribute('aria-label', 'שיתוף');
  g.innerHTML = '<i class="share-dot" aria-hidden="true"></i>' + LINKS.map(function (l) {
    return '<a href="' + l[2] + '" target="_blank" rel="noopener" aria-label="' + l[1] + '" title="' + l[1] + '">' + ICON[l[0]] + '</a>';
  }).join('');
  row.appendChild(g);
})();
