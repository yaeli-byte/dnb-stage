
(function () {
  
  var BUILT = {
    'ניהול סיכוני אשראי עסקי': 'family-a1.html',
    'צמיחה עסקית':             'growth-a.html'
  };

  
  var ART = {
    'ניהול סיכוני צד שלישי':   {src: 'fig/sol-third.svg',
      bg: 'linear-gradient(147.349deg,#015A70 22.782%,#004657 101.15%)'},
    'ניהול סיכוני אשראי עסקי': {src: 'fig/sol-risk.svg',
      bg: 'linear-gradient(159.838deg,#F6F8FA 16.208%,#F3F5F7 96.765%)'},
    'אשראי צרכני':             {src: 'fig/sol-consumer.svg',
      bg: 'linear-gradient(141.072deg,rgba(174,235,249,.5) 19.291%,#AEEBF9 101.18%)'},
    'צמיחה עסקית':             {src: 'fig/sol-growth.svg',
      bg: 'linear-gradient(148.339deg,#F6F8FA 16.208%,#F3F5F7 96.765%)'}
  };

  function art() {
    var sec = document.querySelector('.a2-families');
    if (!sec) return;
    [].forEach.call(sec.querySelectorAll('h2'), function (h2) {
      var name = (h2.textContent || '').replace(/\s+/g, ' ').trim();
      var spec = ART[name];
      if (!spec) return;
      var row = h2.closest('div[style*="grid-template-columns"]');
      if (!row) return;
      
      var plate = row.querySelector('div[style*="width:560px"]');
      if (!plate || plate.getAttribute('data-art') === 'home') return;
      plate.setAttribute('data-art', 'home');
      plate.style.backgroundImage = spec.bg;
      plate.innerHTML = '';
      var img = document.createElement('img');
      img.src = spec.src; img.alt = '';
      img.style.cssText = 'width:100%;height:100%;object-fit:contain;display:block';
      plate.appendChild(img);
    });
  }

  function go() {
    var sec = document.querySelector('.a2-families');
    if (!sec) return;
    var rows = sec.querySelectorAll('h2');
    [].forEach.call(rows, function (h2) {
      var name = (h2.textContent || '').replace(/\s+/g, ' ').trim();
      if (!name || name === 'הפתרונות שלנו לאתגרים') return;      
      
      var row = h2.closest('div[style*="grid-template-columns"]') || h2.parentNode;
      var a = row && row.querySelector('a.dnb-btn');
      if (!a) return;
      if (BUILT[name]) {
        
        a.setAttribute('data-navlabel', name);
        a.setAttribute('href', BUILT[name]);
      } else {
        a.setAttribute('aria-disabled', 'true');
        a.setAttribute('title', 'לא נבנה בפרוטוטייפ הזה');
        a.removeAttribute('href');
      }
    });
    art();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go);
  else go();
})();
