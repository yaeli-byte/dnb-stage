
(function () {
  var SEL = '.eb, .eyebrow';
  function isDot(n) {
    if (n.nodeType !== 1) return false;
    if (n.tagName === 'I') return true;
    if (n.tagName !== 'SPAN') return false;
    if ((n.textContent || '').trim()) return false;      
    var r = n.getBoundingClientRect();
    return r.width > 0 && r.width < 10;
  }
  function run() {
    [].forEach.call(document.querySelectorAll(SEL), function (eb) {
      if (eb.hasAttribute('data-eb-dots')) return;
      var r = eb.getBoundingClientRect();
      if (r.height < 8 || r.width < 8) return;
      var par = eb.parentElement && eb.parentElement.getBoundingClientRect();
      if (!par || !par.width) return;

      var slack = par.width - r.width;
      var offCentre = Math.abs((r.left + r.right) / 2 - (par.left + par.right) / 2);
      var centred = slack > 24 && offCentre < 12;

      
      [].slice.call(eb.children).forEach(function (c) { if (isDot(c)) c.remove(); });
      eb.setAttribute('data-eb-dots', centred ? '2' : '1');

      function dot() {
        var i = document.createElement('i');
        i.className = 'eb-dot';
        i.setAttribute('aria-hidden', 'true');
        return i;
      }
      
      eb.insertBefore(dot(), eb.firstChild);
      if (centred) eb.appendChild(dot());
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(run, 0); });
  } else { setTimeout(run, 0); }
  
  addEventListener('load', function () { setTimeout(run, 60); });
})();
