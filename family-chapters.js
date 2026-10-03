
(function () {
  
  var host = [].slice.call(document.querySelectorAll('ul')).filter(function (u) {
    return u.querySelectorAll(':scope > li a.dnb-acc').length >= 2;
  })[0];
  if (!host) return;
  var rows = [].slice.call(host.querySelectorAll(':scope > li'));
  if (rows.length < 2) return;

  
  function split(li) {
    var a = li.querySelector('a') || li;
    var kids = [].slice.call(a.children).filter(function (k) {
      return k.getBoundingClientRect().width > 1;
    });
    if (kids.length < 2) return null;
    var txt = kids.filter(function (k) { return k.textContent.trim().length > 40; })[0] || kids[0];
    var art = kids.filter(function (k) { return k !== txt; })[0];
    return {txt: txt, art: art, href: a.getAttribute('href') || '#'};
  }

  var parts = rows.map(split).filter(Boolean);
  if (parts.length < 2) return;
  

  var wrap = document.createElement('div');
  wrap.className = 'chapters';
  parts.forEach(function (p) {
    var ch = document.createElement('div');
    ch.className = 'chapter';
    
    var t = document.createElement('a');
    t.className = 'ch-txt dnb-acc';
    t.setAttribute('href', p.href);
    t.appendChild(p.txt);
    var a = document.createElement('div'); a.className = 'ch-art';  a.appendChild(p.art);
    ch.appendChild(t); ch.appendChild(a);
    wrap.appendChild(ch);
  });

  var section = host.closest('section') || host.parentElement;
  host.parentNode.replaceChild(wrap, host);

  
  var bar = document.createElement('div');
  bar.className = 'solstate';
  bar.innerHTML =
    '<span class="lbl">תצוגת הפתרונות במשפחה</span>' +
    '<span class="sw" role="group" aria-label="מספר הפתרונות במשפחה">' +
      '<button type="button" data-n="1" aria-pressed="false">פתרון אחד</button>' +
      '<button type="button" data-n="all" aria-pressed="true">' + parts.length + ' פתרונות</button>' +
    '</span>';
  wrap.parentNode.insertBefore(bar, wrap);

  var chapters = [].slice.call(wrap.children);
  function apply(mode) {
    var one = mode === '1';
    
    chapters.forEach(function (c, i) {
      if (c.__disp === undefined) c.__disp = c.style.display || '';
      var off = one && i > 0;
      c.hidden = off; c.style.display = off ? 'none' : c.__disp;
    });
    
    wrap.classList.toggle('as-cards', !one && chapters.length >= 3);
    [].forEach.call(bar.querySelectorAll('button'), function (b) {
      b.setAttribute('aria-pressed', b.dataset.n === mode ? 'true' : 'false');
    });
  }
  [].forEach.call(bar.querySelectorAll('button'), function (b) {
    b.addEventListener('click', function () { apply(b.dataset.n); });
  });
  apply('all');
})();
