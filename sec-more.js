
(function () {
  var TITLE = 'מוצרים נוספים בפתרון';
  var ARROW = '<svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true"><g fill="currentColor"><circle cx="12" cy="20" r="1.225"/><circle cx="15.2" cy="20" r="1.225"/><circle cx="18.4" cy="20" r="1.225"/><circle cx="21.6" cy="20" r="1.225"/><circle cx="24.8" cy="20" r="1.225"/><circle cx="28" cy="20" r="1.225"/><circle cx="14.8" cy="17.2" r="1.225"/><circle cx="17.6" cy="14.4" r="1.225"/><circle cx="14.8" cy="22.8" r="1.225"/><circle cx="17.6" cy="25.6" r="1.225"/></g></svg>';

  
  function tile(extra) {
    return '<span class="arrow-tile' + (extra || '') + '" aria-hidden="true">' +
           '<i class="arrow-tile__mark"></i></span>';
  }

  var ITEMS = [
    { name: 'Finance Analytics', ltr: true,
      text: 'התראות ואנליטיקה על לקוחות וספקים בכל העולם.',
      vis: '<span class="prod__vis prod__vis--chart" aria-hidden="true"><span style="position:absolute; left:0; top:0; right:0; bottom:0; background-image:radial-gradient(circle at center,rgba(11,22,32,.08) 1px,rgba(0,0,0,0) 1.5px); background-size:12px 12px; background-position:center center"></span><span style="position:absolute; left:14px; right:14px; top:16px; display:flex; flex-direction:column; gap:4px; padding:5px; border-radius:8px; background-color:rgba(255,255,255,.55); box-shadow:inset 0 0 0 1px rgba(255,255,255,.95)"><span style="display:flex; flex-direction:column; gap:4px; padding:8px 10px 9px; border-radius:3px; background-color:#E8ECEF"><span style="display:flex; align-items:center; justify-content:space-between"><span style="font-size:10.5px; line-height:14px; color:#5E5E86; white-space:nowrap">מצב פיננסי, <span dir="ltr">12</span> ח׳</span><span dir="ltr" style="font-size:10.5px; line-height:14px; font-weight:500; color:#0083A1">+8%</span></span><svg dir="ltr" width="158" height="34" viewBox="0 0 158 34" aria-hidden="true" style="display:block"><polygon points="2,34 2,30 16,26 30,27.5 44,21 58,22.5 72,16.5 86,18 100,13.5 114,9 128,10.5 142,6 156,2 156,34" fill="rgba(37,155,179,.12)"></polygon><polyline points="2,30 16,26 30,27.5 44,21 58,22.5 72,16.5 86,18 100,13.5 114,9 128,10.5 142,6 156,2" fill="none" stroke="#0083A1" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></polyline><circle cx="156" cy="2" r="2" fill="#0083A1"></circle></svg></span><span style="display:flex; flex-direction:column; gap:5px; padding:8px 10px 9px; border-radius:3px; background-color:#E8ECEF"><span style="display:flex; align-items:center; gap:7px"><span style="width:46px; font-size:10px; line-height:13px; color:#5E5E86; white-space:nowrap">אירופה</span><span style="position:relative; flex:1; height:5px; border-radius:3px; background-color:rgba(94,94,134,.16)"><span style="position:absolute; right:0; top:0; bottom:0; width:42%; border-radius:3px; background-color:#0083A1"></span></span><span dir="ltr" style="font-size:10px; line-height:13px; color:#5E5E86">42%</span></span><span style="display:flex; align-items:center; gap:7px"><span style="width:46px; font-size:10px; line-height:13px; color:#5E5E86; white-space:nowrap">צפון אמריקה</span><span style="position:relative; flex:1; height:5px; border-radius:3px; background-color:rgba(94,94,134,.16)"><span style="position:absolute; right:0; top:0; bottom:0; width:31%; border-radius:3px; background-color:#0083A1"></span></span><span dir="ltr" style="font-size:10px; line-height:13px; color:#5E5E86">31%</span></span></span></span></span>' },
    { name: 'דוחות פיננסים', ltr: false,
      text: 'דוח על כל עסק, ברמת הפירוט שאתם צריכים.',
      vis: '<span class="prod__vis prod__vis--report" aria-hidden="true"><span style="position:absolute; left:0; top:0; right:0; bottom:0; background-image:radial-gradient(circle at center,rgba(11,22,32,.08) 1px,rgba(0,0,0,0) 1.5px); background-size:12px 12px; background-position:center center"></span><span style="position:absolute; left:14px; right:14px; top:16px; display:flex; flex-direction:column; gap:4px; padding:5px; border-radius:8px; background-color:rgba(255,255,255,.55); box-shadow:inset 0 0 0 1px rgba(255,255,255,.95)"><span style="display:flex; flex-direction:column; gap:5px; padding:9px 11px 10px; border-radius:3px; background-color:#E8ECEF"><span style="display:block; width:100%; height:5px; border-radius:3px; background-color:rgba(94,94,134,.18)"></span><span style="display:block; width:86%; height:5px; border-radius:3px; background-color:rgba(94,94,134,.18)"></span><span style="display:block; width:100%; height:5px; border-radius:3px; background-color:rgba(94,94,134,.18)"></span><span style="display:block; width:58%; height:5px; border-radius:3px; background-color:rgba(94,94,134,.18)"></span></span><span style="display:flex; gap:4px"><span style="flex:1; display:flex; align-items:baseline; gap:5px; padding:4px 9px 5px; border-radius:3px; background-color:#E8ECEF"><span dir="ltr" style="font-size:17px; line-height:21px; font-weight:300; color:#5E5E86">78</span><span style="font-size:10px; line-height:13px; color:#5E5E86; white-space:nowrap">סקור כללי</span></span><span style="flex:1; display:flex; align-items:baseline; gap:5px; padding:4px 9px 5px; border-radius:3px; background-color:#E8ECEF"><span dir="ltr" style="font-size:17px; line-height:21px; font-weight:300; color:#5E5E86">5</span><span style="font-size:10px; line-height:13px; color:#5E5E86; white-space:nowrap">פרקים</span></span></span></span></span>' }
  ];

  function build() {
    var li = ITEMS.map(function (p) {
      
      return '<li class="more__item"><a class="prod" href="#">' + p.vis +
        '<span class="prod__main">' +
          '<span class="prod__body">' +
            '<span class="prod__name"' + (p.ltr ? ' dir="ltr"' : '') + '>' + p.name + '</span>' +
            '<span class="prod__text">' + p.text + '</span>' +
          '</span>' + tile(' arrow-tile--grey') +
        '</span></a></li>';
    }).join('');

    var s = document.createElement('section');
    s.className = 'moresec';
    s.setAttribute('dir', 'rtl');
    s.setAttribute('data-sec', 'more');
    s.innerHTML =
      '<header class="more__head">' +
        '<div class="more__intro">' +
          '<p class="eyebrow">הפתרון</p>' +
          
          '<h2 class="more__title">מוצרים נוספים בפתרון<br>ניהול סיכונים פיננסיים</h2>' +
          '' +
        '</div>' +
        
        '<a class="dnb-btn dnb-btn--lite more__family" href="#">' +
          '<span class="dnb-btn__badge"><img src="fig/btn-arrow-dark.svg" alt=""></span>' +
          '<span class="dnb-btn__label">לעמוד משפחת הפתרונות</span></a>' +
      '</header>' +
      '<ul class="more__list">' + li + '</ul>';
    return s;
  }

  
  function target() {
    var hs = document.querySelectorAll('h2, h3');
    for (var i = 0; i < hs.length; i++) {
      if ((hs[i].textContent || '').indexOf(TITLE) < 0) continue;
      var n = hs[i];
      while (n && n !== document.body) {
        if (n.tagName === 'SECTION' && n.parentNode) return n;
        n = n.parentNode;
      }
      
      return hs[i].closest('div') || hs[i];
    }
    return null;
  }

  
  function size(s) {
    var w = s.getBoundingClientRect().width || s.offsetWidth;
    s.classList.toggle('w1100', w <= 1100);
    s.classList.toggle('w600', w <= 600);
  }

  

  function mount() {
    
    if (document.querySelector('.moresec')) return;
    var old = target();
    if (!old) { console.warn('[sec-more] no section matched "' + TITLE + '"'); return; }
    var s = build();
    old.parentNode.replaceChild(s, old);
    size(s);
    addEventListener('resize', function () { size(s); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { size(s); });
  }

  
  function assert() {
    var sec = document.querySelector('.moresec');
    if (!sec) return;

    
    var head = sec.querySelector('.more__intro') || sec.querySelector('.more__head');
    if (head && !sec.querySelector('.eyebrow')) {
      var eb = document.createElement('p');
      eb.className = 'eyebrow';
      eb.textContent = 'הפתרון';
      head.insertBefore(eb, head.firstChild);
    }

    
    var band = document.getElementById('ctaw') ||
               document.querySelector('[data-home="ctaw"]') ||
               (function () {
                 var all = document.querySelectorAll('section');
                 for (var i = 0; i < all.length; i++)
                   if (/רוצים לראות|לא בטוחים איזה פתרון/.test(all[i].textContent || '')) return all[i];
                 return null;
               })();
    if (band && band.parentNode && sec.compareDocumentPosition(band) & Node.DOCUMENT_POSITION_FOLLOWING) {
      band.parentNode.insertBefore(sec, band.nextSibling);
    }
  }

  function go() { mount(); assert(); }
  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', go);
  else go();
})();
