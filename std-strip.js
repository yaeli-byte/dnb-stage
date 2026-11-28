
(function () {
  
  var CARDS = [
    ['iso-27001', 'ISO/IEC 27001:2022', 'ניהול אבטחת מידע', 'דן אנד ברדסטריט (ישראל)', '1124566', 'ינואר 2028'],
    ['iso-27001', 'ISO/IEC 27001:2022', 'ניהול אבטחת מידע', 'לשכת אשראי, די אנד בי החברה לנתוני אשראי', '1124568', 'ינואר 2028'],
    ['iso-9001',  'ISO 9001:2015',      'ניהול איכות',      'דן אנד ברדסטריט (ישראל)', '1124567', 'אפריל 2028']
  ];

  var HTML =
    '<section class="std-sec" data-sec="standards" aria-labelledby="std-title">' +
      '<div class="std-in">' +
        '<div class="std-eb">תקנים והסמכות</div>' +
        '<h2 class="std-h2" id="std-title">המידע שלכם מנוהל ומאובטח לפי תקנים בינלאומיים</h2>' +
        '<ul class="std-cards" role="list">' +
          CARDS.map(function (c) {
            return '<li class="std-card"><div class="std-cb"><p class="std-code" dir="ltr">' + c[1] + '</p><h3 class="std-ct">' + c[2] +
                   '</h3></div>' +
                   '<img class="std-mark" src="fig/std/' + c[0] + '.png" alt="' + c[1] + '" loading="lazy" decoding="async"></li>';
          }).join('') +
        '</ul>' +
      '</div>' +
    '</section>';

  var TRUST = '#trust, #statsw, #tst, .tmarks, [data-sec="marks"], .logos, [data-trust]';

  function build() {
    var box = document.createElement('div');
    box.innerHTML = HTML;
    return box.firstElementChild;
  }

  function prevSection(el) {
    var p = el.previousElementSibling;
    while (p && (p.tagName === 'SCRIPT' || p.tagName === 'STYLE' || p.nodeType !== 1 ||
                 getComputedStyle(p).display === 'none')) p = p.previousElementSibling;
    return p;
  }

  function place() {
    if (document.querySelector('.std-sec')) return;           
    var slot = document.querySelector('[data-sec="std"]');
    var sec = build();
    if (slot) { slot.replaceWith(sec); }
    else {
      
      var at = document.querySelector('#faq, [data-home="faq"]') ||
               document.querySelector('#fb, [data-home="fb"]');
      if (!at) return;
      
      var host = at.matches('[data-home="faq"]') ? at : at.closest('[data-home="faq"]');
      var js = host && host.querySelector('script[type="application/json"]');
      
      var nofb = at.matches('#faq.nofb') || (host && host.querySelector('#faq.nofb')) || (js && /"nofooter"\s*:\s*true/.test(js.textContent));
      var after = host || at;
      if (nofb) after.parentNode.insertBefore(sec, after.nextSibling);
      else { at.parentNode.insertBefore(sec, at); sec.classList.add('std-before-faq'); }
    }
    var prev = prevSection(sec);
    if (prev && prev.matches && prev.matches(TRUST)) {
      sec.setAttribute('data-trust-adjacent', prev.id || prev.className || prev.tagName);
      if (window.console) console.warn('[std-strip] directly after a trust strip:', prev);
    }
  }

  
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', place);
  else place();
})();
