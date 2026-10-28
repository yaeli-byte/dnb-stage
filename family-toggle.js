
(function () {
  if (document.querySelector('.solstate')) return;      

  
  var sel = ['a.dnb-acc', 'a.dnb-card'];
  var host = null;
  [].forEach.call(document.querySelectorAll('ul,div'), function (el) {
    if (host) return;
    var hits = [].slice.call(el.children).filter(function (c) {
      return sel.some(function (s) { return c.matches(s) || c.querySelector(s); });
    });
    if (hits.length >= 2) { host = el; }
  });
  if (!host) return;

  var sec = host.closest('section');
  if (!sec) return;

  
  var block = host;
  while (block.parentElement && block.parentElement !== sec) block = block.parentElement;
  if (block === host || !block.parentElement) return;

  

  var clones = [];

  
  function slotify(el, n) {
    var h = el.querySelector('h1,h2,h3');
    if (h) { h.textContent = '[שם הפתרון ' + n + ']'; h.classList.add('slot'); }
    var p = el.querySelector('p');
    if (p) { p.textContent = '[תיאור הפתרון ' + n + ']'; p.classList.add('slot'); }
    
    var eb = el.querySelector('.eb, .eyebrow, [class*="eyebrow"]');
    if (!eb && h) {
      var prev = h.previousElementSibling ||
                 (h.parentElement && h.parentElement.previousElementSibling);
      if (prev && (prev.textContent || '').trim().length < 40) eb = prev;
    }
    if (eb) { eb.textContent = '[פתרון ' + n + ']'; eb.classList.add('slot'); }
    [].forEach.call(el.querySelectorAll('a'), function (a) {
      a.setAttribute('href', '#');
      a.setAttribute('aria-disabled', 'true');
      a.setAttribute('title', 'סלוט ריק — אין פתרון שני/שלישי במשפחה הזו');
    });
  }

  function render(n) {
    clones.forEach(function (c) { c.remove(); });
    clones = [];
    for (var k = 2; k <= n; k++) {
      var c = block.cloneNode(true);
      c.removeAttribute('id');
      slotify(c, k);
      block.parentNode.insertBefore(c, clones.length ? clones[clones.length - 1].nextSibling : block.nextSibling);
      clones.push(c);
    }
  }


  
  var dec = document.documentElement.getAttribute('data-solutions') ||
            (document.body && document.body.getAttribute('data-solutions'));
  var q = (location.search.match(/[?&]sol=(\d+)/) || [])[1];
  render(+(q || dec || 1) === 3 ? 3 : 1);
})();
