
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
  
  function normalize() {
    [].forEach.call(document.querySelectorAll('span,p,div,b,a'), function (e) {
      if (e.children.length > 1) return;
      var t = (e.textContent || '').trim();
      if (!t || t.length > 40) return;
      var cs = getComputedStyle(e);
      if (Math.abs(parseFloat(cs.fontSize) - 14) > 1.1 || +cs.fontWeight < 500 ||
          !(parseFloat(cs.letterSpacing) >= 0.3)) return;
      var host = e.parentElement; if (!host) return;
      [].forEach.call(host.children, function (c) {
        if (c === e || c.contains(e)) return;
        var r = c.getBoundingClientRect(), ccs = getComputedStyle(c);
        
        if (!(r.width > 0 && r.width <= 10 && Math.abs(r.width - r.height) < 1.5 &&
              (parseFloat(ccs.borderRadius) >= r.width / 3 || c.tagName === 'IMG'))) return;
        c.style.setProperty('width', '5px', 'important');
        c.style.setProperty('height', '5px', 'important');
        c.style.setProperty('border-radius', '50%', 'important');
        c.style.setProperty('background', cs.color, 'important');
        c.style.setProperty('flex', '0 0 auto', 'important');
      });
    });
  }
  function both() { run(); normalize(); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(both, 0); });
  } else { setTimeout(both, 0); }
  
  addEventListener('load', function () { setTimeout(both, 60); setTimeout(normalize, 1500); });
})();
