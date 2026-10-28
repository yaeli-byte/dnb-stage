
(function () {
  if (document.querySelector('.vidsec')) return;

  var MARK = 'יתרונות';            
  var host = null;
  [].forEach.call(document.querySelectorAll('h2'), function (h) {
    if (host) return;
    if ((h.textContent || '').indexOf(MARK) < 0) return;
    for (var n = h; n && n !== document.body; n = n.parentNode)
      if (n.tagName === 'SECTION') { host = n; break; }
  });
  if (!host || !host.parentNode) return;

  var sec = document.createElement('section');
  sec.className = 'vidsec';
  sec.setAttribute('data-t', 'video');
  sec.innerHTML =
    
    '' +
    '<div class="vd-head">' +
      '<div class="vd-eb"><i></i><span>סרטון דמו</span><i></i></div>' +
      '<h2>ראו את המערכת בפעולה</h2>' +
    '</div>' +
    '<div class="vd-frame"><div class="vd-box">' +
      '<iframe title="סרטון דמו של מערכת ניהול סיכונים" src="about:blank" ' +
        'loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>' +
      '<div class="vd-poster" aria-hidden="true">' +
        '<a class="dnb-btn dnb-btn--lite" href="#">' +
          '<span class="dnb-btn__badge"><img src="fig/btn-arrow-dark.svg" alt=""></span>' +
          '<span class="dnb-btn__label">צפו בסרטון</span></a>' +
      '</div>' +
    '</div></div>' +
    
    '';
  

  host.parentNode.insertBefore(sec, host.nextSibling);

  
  function size() {
    var w = sec.getBoundingClientRect().width || sec.offsetWidth;
    sec.classList.toggle('w600', w <= 600);
  }
  size();
  addEventListener('resize', size);
})();
