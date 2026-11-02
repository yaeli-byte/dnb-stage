
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
    wa: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.2a8.6 8.6 0 0 0-7.4 13l-1.1 4.1 4.2-1.1A8.6 8.6 0 1 0 12 3.2z"/><path d="M9.2 8.3c.2-.4.5-.4.8-.3.2.5.5 1.2.5 1.3 0 .3-.4.7-.5.9.6 1.2 1.6 2.1 2.8 2.7.3-.3.6-.7.8-.8.2 0 .9.4 1.3.6.1.3 0 .7-.4 1.1-.6.5-1.4.5-2.3.2-1.9-.8-3.3-2.200-3.900-4.100-.2-.8 0-1.200.4-1.600z" fill="currentColor" stroke="none"/></svg>',
    mail: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5.5" width="17" height="13" rx="2.5"/><path d="M4.5 7.5l7.5 6 7.5-6"/></svg>',
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
