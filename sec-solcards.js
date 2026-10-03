
(function () {
  
  var SLOT = {
    eb:   'פתרון · 2 מוצרים',
    name: 'לורם איפסום',
    desc: 'לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג',
    metric: 'לורם איפסום', fig: 'XX', split: 'לורם איפסום', pill: 'לורם איפסום',
    slot: true
  };
  var REAL = {
    eb:   'פתרון · 3 מוצרים',
    name: 'ניהול סיכונים פיננסיים',
    desc: 'תמונה מלאה על לקוחות וספקים - דירוג אשראי, התרעות בזמן אמת ופילוחי סיכון, ' +
          'כדי לזהות בעיה לפני שהיא הופכת לחוב.',
    metric: 'דירוג אשראי', fig: '78', split: 'פילוח סיכון, תיק לקוחות',
    pill: 'התרעה בזמן אמת', slot: false
  };
  
  var SEG = [['#F5574D', 24.38], ['#F0C355', 52.84], ['#259BB3', 125.99]];
  var LEG = [['#F5574D', '12%', 'גבוה'], ['#F0C355', '26%', 'בינוני'], ['#259BB3', '62%', 'נמוך']];

  function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  
  function sc(d) { return ''; }

  function card(d) {
    var seg = SEG.map(function (s) {
      return '<span style="background:' + s[0] + ';width:' + (s[1] / 206.4 * 100).toFixed(3) + '%"></span>';
    }).join('');
    var leg = LEG.map(function (l) {
      return '<span><span>' + l[1] + '</span><span>' + l[2] + '</span><i style="background:' + l[0] + '"></i></span>';
    }).join('');
    return '' +
    '<article class="sccard">' +
      '<div class="scart"><div class="scmockw">' +
        '<div class="scmock">' +
          '<div class="scrow">' +
            '<span class="lbl"' + sc(d) + '>' + esc(d.metric) + '</span>' +
            '<span class="fig"' + sc(d) + '>' + esc(d.fig) + '</span>' +
            '<span class="scbar"><i style="left:21.61%"></i></span>' +
          '</div>' +
          '<div class="scrow">' +
            '<span class="lbl"' + sc(d) + '>' + esc(d.split) + '</span>' +
            '<span class="scseg">' + seg + '</span>' +
            '<span class="sclegend">' + leg + '</span>' +
          '</div>' +
        '</div>' +
        '<span class="scpill"' + sc(d) + '>' + esc(d.pill) + '</span>' +
        '<span class="sctile" aria-hidden="true"><i></i></span>' +
      '</div></div>' +
      '<div class="scbody">' +
        '<span class="eb2">' + esc(d.eb) + '</span>' +
        '<h3' + sc(d) + '>' + esc(d.name) + '</h3>' +
        '<p' + sc(d) + '>' + esc(d.desc) + '</p>' +
        '<div class="scbtnw">' +
          '<a class="dnb-btn dnb-btn--dark" href="' + (d.slot ? '#' : 'solution.html') + '"' +
            (d.slot ? ' aria-disabled="true" title="סלוט ריק — אין פתרון שני/שלישי במשפחה הזו"' : '') + '>' +
            
            '<span class="dnb-btn__badge"><img src="fig/btn-arrow.svg" alt=""></span>' +
            '<span class="dnb-btn__label">לעמוד הפתרון</span>' +
          '</a>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  function build(src) {
    var h2 = src.querySelector('h2');
    var sec = document.createElement('section');
    sec.className = 'solcards';
    sec.setAttribute('data-sec', 'solcards');
    
    sec.innerHTML =
      '<div class="scwrap">' +
        '<div class="schead">' +
          '<div class="eb"><i></i><span>הפתרונות</span><i></i></div>' +
          '<h2></h2>' +
        '</div>' +
        '' +
        '<div class="scgrid"></div>' +
      '</div>';
    sec.querySelector('h2').textContent = 'פתרונות לניהול סיכוני אשראי עסקי';

    var n = +((location.search.match(/[?&]sol=(\d+)/) || [])[1] || 3);
    n = (n === 1) ? 1 : 3;
    if (n === 1) sec.classList.add('one');
    
    var list = (n === 1) ? [REAL] : [REAL, SLOT, SLOT];
    sec.querySelector('.scgrid').innerHTML = list.map(card).join('');
    src.parentNode.replaceChild(sec, src);
    return sec;
  }

  
  var src = [].slice.call(document.querySelectorAll('section')).filter(function (s) {
    if (s.classList.contains('solcards') || s.classList.contains('benefits')) return false;
    var h = s.querySelector('h2');
    return h && /פתרון אחד|שלושה מוצרים|ניהול סיכונים פיננסיים/.test(h.textContent) &&
           s.querySelectorAll('a').length >= 2;
  })[0];
  if (src) build(src);
})();
