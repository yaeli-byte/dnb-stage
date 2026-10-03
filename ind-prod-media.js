
window.DNB_PROD_MEDIA = "<div class=\"ns-prod-media\" id=\"nsProdMedia1\"><div class=\"ns-prod-gauge-card\"><div class=\"ns-prod-gauge\"><div class=\"g-lbl\"><span>סקור כללי</span><b>50</b></div><div class=\"g-track good\"><i style=\"left:54%\"></i></div></div><div class=\"ns-prod-gauge\"><div class=\"g-lbl\"><span>סקור ענפי</span><b class=\"bad\">31</b></div><div class=\"g-track bad\"><i style=\"left:83%\"></i></div></div></div></div>";
(function () {
  var html = window.DNB_PROD_MEDIA;
  if (!html) return;
  [].forEach.call(document.querySelectorAll('.products .pmock'), function (m) {
    var h = document.createElement('div');
    h.innerHTML = html;
    var vis = h.firstElementChild;
    if (!vis) return;
    
    m.innerHTML = '';
    m.appendChild(vis);
    m.setAttribute('data-media', 'solution');
  });
})();
