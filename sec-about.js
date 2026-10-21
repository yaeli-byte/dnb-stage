
(function () {
  window.DNB_BUILD_ABOUT = function (C_about) {
    if (!C_about) return;
    var C = {about: C_about};
  function about() {
    if (document.querySelector('.abtsec')) return;
    var host = null;
    [].forEach.call(document.querySelectorAll('h2'), function (h) {
      if (host) return;
      if ((h.textContent || '').indexOf('\u05d9\u05ea\u05e8\u05d5\u05e0\u05d5\u05ea') < 0) return;
      for (var n = h; n && n !== document.body; n = n.parentNode)
        if (n.tagName === 'SECTION') { host = n; break; }
    });
    if (!host || !host.parentNode) return;
    var rows = (C.about.blocks || []).map(function (b) {
      var ico = b.ico ? ' style="--abt-ico:url(fig/bico/' + b.ico + '.svg)"' : '';
      return '<li class="abt__row"><span class="abt__ico"' + ico + ' aria-hidden="true"></span>' +
             '<span class="abt__tx"><b>' + b.h + '</b><span>' + b.t + '</span></span></li>';
    }).join('');
    var sec = document.createElement('section');
    sec.className = 'abtsec'; sec.setAttribute('dir', 'rtl');
    sec.setAttribute('data-sec', 'about');
    sec.innerHTML =
      '<div class="abt__in">' +
        '<div class="abt__head">' +
          
          '<p class="abt__eb"><i></i><span>' + (C.about.eyebrow || '') + '</span><i></i></p>' +
          '<h2>' + C.about.h2 + '</h2>' +
          '<p class="abt__lede">' + C.about.lede + '</p>' +
        '</div>' +
        '<ul class="abt__list">' + rows + '</ul>' +
      '</div>';
    
    host.parentNode.insertBefore(sec, host);
  }
    about();
  };
})();
