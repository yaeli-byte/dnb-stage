
(function () {
  
  var MARKS = [
    ['iso-27001', 'תקן אבטחת מידע',        'מכון התקנים הישראלי · ISO 27001:2022'],
    ['iso-9001',  'תקן ניהול איכות',       'מכון התקנים הישראלי · ISO 9001:2015'],
    ['iqnet',     'רשת הסמכה בינלאומית',   'IQNet'],
    ['iaf',       'פורום ההסמכה הבינלאומי', 'IAF'],
    ['anab',      'גוף הסמכה אמריקאי',     'ANAB'],
    ['rva',       'גוף הסמכה הולנדי',      'RvA'],
    ['sii',       'מכון התקנים הישראלי',   'מכון התקנים הישראלי']
  ];

  var HTML =
    '<section class="std-sec" data-sec="standards" aria-labelledby="std-title">' +
      '<div class="std-in">' +
        '<div class="std-eb" aria-hidden="true">תקני אבטחה</div>' +
        
        '<h2 class="std-sr" id="std-title">התקנים והאישורים שאנחנו עומדים בהם</h2>' +
        '<ul class="std-row" role="list">' +
          MARKS.map(function (m) {
            return '<li class="std-item"><div class="std-tile"><img class="std-mark" src="fig/std/' + m[0] + '.png" alt="' + m[2] +
                   '" loading="lazy" decoding="async"></div><p class="std-name">' + m[1] + '</p></li>';
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
      at.parentNode.insertBefore(sec, at);
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
