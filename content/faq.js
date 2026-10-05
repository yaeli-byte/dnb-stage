
(function () {
  var faq = document.getElementById('faq');
  if (!faq) return;
  var rows = [].slice.call(faq.querySelectorAll('.qa'));
  if (!rows.length) return;
  var stack = faq.querySelector('.rows');

  
  var GAP = 40;                 
  var FB_TOP = 1028.58;         
  function sync() {
    if (!stack) return;
    var f = faq.getBoundingClientRect(), r = stack.getBoundingClientRect();
    var endsAt = (r.top - f.top) + r.height;
    var need = endsAt + GAP - FB_TOP;
    if (need > 0.5) document.documentElement.style.setProperty('--faqx', need.toFixed(2) + 'px');
    else document.documentElement.style.removeProperty('--faqx');
  }

  rows.forEach(function (qa) {
    var btn = qa.querySelector('.qbtn');
    var ans = qa.querySelector('.a');
    if (!btn || !ans) return;

    
    btn.setAttribute('role', 'button');
    btn.setAttribute('tabindex', '0');
    btn.setAttribute('aria-expanded', 'false');
    if (!ans.id) ans.id = 'faq-a-' + rows.indexOf(qa);
    btn.setAttribute('aria-controls', ans.id);

    function toggle() {
      var willOpen = !qa.classList.contains('open');
      rows.forEach(function (o) {
        o.classList.remove('open');
        var b = o.querySelector('.qbtn');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
      if (willOpen) {
        qa.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
      sync();
    }
    btn.addEventListener('click', toggle);
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });

  
  var m = /[?&]faq=(\d+)/.exec(location.search);
  if (m) {
    var q = rows[+m[1]];
    if (q) q.querySelector('.qbtn').click();
  }
  sync();
})();
