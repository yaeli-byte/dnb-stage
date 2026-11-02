
(function () {
  var SEAL = 'fig/dotted/dot-check.svg';

  
  var MARKS = [
    ['ISO 27001',    'ניהול מאובטח של המידע בארגון'],
    ['ISO 27701',    'הגנה על מידע אישי ועמידה בדרישות פרטיות'],
    ['SOC 2 Type 2', 'ביקורת עצמאית שמוכיחה שהאבטחה עובדת בפועל'],
    ['ISO 22301',    'השירות ממשיך לפעול גם בזמן משבר']
  ];

  function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  function mark(m) {
    return '<div class="m">' +
      '<span class="seal"><i style="-webkit-mask-image:url(' + SEAL + ');mask-image:url(' + SEAL + ')"></i></span>' +
      '<div class="tx"><h3><span dir="ltr">' + esc(m[0]) + '</span></h3><p>' + esc(m[1]) + '</p></div>' +
    '</div>';
  }

  var HTML =
    '<section class="tmarks marks-sec" data-sec-built="marks">' +
      '<div class="wrap">' +
        '<div class="head">' +
          
          '<div class="eb"><i></i><span>תקנים</span><i></i></div>' +
          '<h2 class="marks-h2">התקנים והאישורים שאנחנו עומדים בהם</h2>' +
        '</div>' +
        '<div class="marks3">' + MARKS.map(mark).join('') + '</div>' +
      '</div>' +
    '</section>';

  
  function isTrust(el) {
    if (!el || el.nodeType !== 1) return false;
    var id = el.id || '';
    var cls = String(el.className || '');
    if (/trust|statsw|tst\b/.test(id)) return true;
    if (/\b(numbers|case|proof|clients|logos)\b/.test(cls)) return true;
    if (el.querySelector && el.querySelector('#trust, #tst, #statsw')) return true;
    return false;
  }

  function place(slot, sec) {
    var prev = slot.previousElementSibling;
    
    var host = slot.parentNode;
    if (!prev && host && host.previousElementSibling) prev = host.previousElementSibling;
    if (!isTrust(prev)) { slot.parentNode.replaceChild(sec, slot); return 'as mounted'; }
    
    prev.parentNode.insertBefore(sec, prev);
    slot.parentNode.removeChild(slot);
    return 'moved above a trust strip';
  }

  [].forEach.call(document.querySelectorAll('[data-sec="marks"]'), function (slot) {
    if (document.querySelector('[data-sec-built="marks"]')) { slot.remove(); return; }
    var box = document.createElement('div');
    box.innerHTML = HTML;
    var sec = box.firstElementChild;
    sec.style.direction = 'rtl';          
    place(slot, sec);
  });
})();
