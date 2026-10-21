
(function () {
  'use strict';

  
  function fitLabels() {
    var btns = document.querySelectorAll('.cr .btn, .cr .btn-all, .jp .btn, .jp .btn-all, .bl .btn, .bl .btn-all, .ba .btn, .ba .btn-all');
    for (var i = 0; i < btns.length; i++) {
      var lbl = btns[i].querySelector('.lbl');
      if (!lbl) continue;
      var probe = lbl.cloneNode(true);
      probe.style.cssText = 'position:absolute;left:-9999px;top:0;visibility:hidden;' +
                            'width:auto;white-space:nowrap';
      btns[i].appendChild(probe);
      var w = probe.getBoundingClientRect().width;
      btns[i].removeChild(probe);
      if (w) btns[i].style.setProperty('--lblw', w.toFixed(3) + 'px');
    }
  }
  fitLabels();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitLabels);

  
  var rows = [].slice.call(document.querySelectorAll('.cr .ben .row'));
  rows.forEach(function (row) {
    row.addEventListener('click', function () {
      var open = row.getAttribute('aria-expanded') === 'true';
      rows.forEach(function (r) { r.setAttribute('aria-expanded', 'false'); });
      row.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
  });
})();
