
(function () {
  var ind = document.getElementById('ind');
  if (!ind) return;
  var list = ind.querySelector('.list .col');
  if (!list) return;

  
  var EXTRA = ['קמעונאות ומוצרי צריכה', 'תחבורה ולוגיסטיקה', 'אנרגיה, מים וסביבה', 'חקלאות'];

  
  var DOTS = [[5.43691,1.725,6],[12.1744,1.725,2],[18.9105,1.725,0],[18.9106,8.46332,1],
              [18.9106,15.2016,4],[12.1745,8.46332,5],[15.2492,5.31488,3],
              [8.78096,11.7797,7],[1.725,18.8383,9],[5.43696,15.1977,8]];
  function arwSvg(cls) {
    var c = DOTS.map(function (d) {
      return '<circle cx="' + d[0] + '" cy="' + d[1] + '" r="1.225" style="--i:' + d[2] + '"/>';
    }).join('');
    return '<svg class="arw ' + cls + '" viewBox="0 0 20.6356 20.5633" aria-hidden="true">' + c + '</svg>';
  }
  function rowHtml(name) {
    return '<div class="grp extra" hidden>' +
      '<div class="row">' +
        '<span class="gsq"><span class="tile">' + arwSvg('a') + arwSvg('b') + '</span></span>' +
        '<div class="h"><p>' + name + '</p></div>' +
      '</div>' +
      '<div class="rule"></div>' +
    '</div>';
  }
  list.insertAdjacentHTML('beforeend', EXTRA.map(rowHtml).join(''));

  var groups = [].slice.call(list.querySelectorAll('.grp'));

  
  var collapsedH = list.offsetHeight;
  function sync() {
    var d = list.offsetHeight - collapsedH;
    if (d > 0.5) document.documentElement.style.setProperty('--indx', d.toFixed(2) + 'px');
    else document.documentElement.style.removeProperty('--indx');
  }

  
  groups.forEach(function (g) {
    var row = g.querySelector('.row');
    if (!row) return;
    row.setAttribute('role', 'button');
    row.setAttribute('tabindex', '0');
    row.setAttribute('aria-expanded', g.classList.contains('open') ? 'true' : 'false');
    var open = function () { toggle(g); };
    row.addEventListener('click', open);
    row.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
  });

  function toggle(g) {
    var isOpen = g.classList.contains('open');
    groups.forEach(function (x) {
      x.classList.remove('open');
      var r = x.querySelector('.row');
      if (r) r.setAttribute('aria-expanded', 'false');
      
      var rule = x.querySelector('.rule');
      if (rule) rule.classList.remove('soft');
    });
    if (isOpen) { sync(); return; }     
    g.classList.add('open');
    var r = g.querySelector('.row');
    if (r) r.setAttribute('aria-expanded', 'true');
    var rule = g.querySelector('.rule');
    if (rule) rule.classList.add('soft');
    
    photo(g);
    sync();
  }

  
  var PHOTOS = {
    'ייבוא וייצוא':            'fig/ship-aerial.png',
    'ייצור ותעשייה':           'fig/ship-aerial.png',
    'בנייה, תשתיות ונדל״ן':    'fig/ship-aerial.png',
    'טכנולוגיה ותוכנה':        'fig/ship-aerial.png',
    'פיננסים, ביטוח ואשראי':   'fig/ship-aerial.png'
  };
  var visual = ind.querySelector('.visual');
  var shot = visual && visual.querySelector('.photo img');
  var swapT = null;
  function photo(g) {
    if (!shot) return;
    var p = g.querySelector('.h p');
    var want = PHOTOS[p ? p.textContent.trim() : ''] || 'fig/ship-aerial.png';
    if (shot.getAttribute('src') === want) return;
    clearTimeout(swapT);
    visual.classList.add('swapping');
    swapT = setTimeout(function () {
      shot.setAttribute('src', want);
      
      if (shot.decode) shot.decode().catch(function () {}).then(reveal); else reveal();
    }, 280);
    function reveal() { visual.classList.remove('swapping'); }
  }

  
  var btn = ind.querySelector('.btn-all');
  if (btn) {
    var lbl = btn.querySelector('.lbl');
    var shown = false;
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      shown = !shown;
      [].forEach.call(list.querySelectorAll('.grp.extra'), function (g) { g.hidden = !shown; });
      btn.setAttribute('aria-expanded', String(shown));
      if (lbl) lbl.textContent = shown ? 'פחות סקטורים' : 'סקטורים נוספים';
      sync();
    });
    
    if (/[?&]ind=all/.test(location.search)) btn.click();
  }
})();
