
(function () {
  var m = /[?&]hero=([1-5])/.exec(location.search), N = m ? +m[1] : 0;
  var tm = /[?&]t=([\d.]+)/.exec(location.search), FREEZE = tm ? +tm[1] : null;
  var NAMES = ['היום', '1 · שני פאנלים', '2 · חוט אחד', '3 · מתכנסים', '4 · מסילה', '5 · מסוע'];
  var STEPS = ['איסוף', 'אימות והתאמה', 'מספר D-U-N-S', 'העשרה ודירוג', 'ניטור ועדכון'];
  var DESC = ['קליטת מידע מאלפי מקורות ציבוריים, קנייניים ובינלאומיים', 'הצלבה בין מקורות, ניקוי כפילויות ושיוך כל נתון לישות הנכונה',
    'לכל עסק מזהה ייחודי ובינלאומי, שמחבר את כל המידע עליו ומקשר אותו לחברות קשורות', 'הוספת ציונים, דירוגים, עץ בעלויות ותובנות אנליטיות', 'מעקב שוטף אחר שינויים והתראות בזמן אמת'];
  var SRC = ['רשם החברות', 'דוחות כספיים', 'חוויית תשלום', 'פרסום ברשומות', 'רשת D&B', 'בית משפט', 'מחקר שטח', 'שעבוד חדש', 'בעלי שליטה', 'עדכון כתובת'];
  var HH;

  function iso(t) { return t.replace('D&B', '<span dir="ltr" style="unicode-bidi:isolate">D&amp;B</span>').replace('D-U-N-S', '<span dir="ltr" style="unicode-bidi:isolate">D-U-N-S</span>'); }
  function pad(i) { return '0' + (i + 1); }
  function key(i, cls) { return '<div class="hh-k' + (cls ? ' ' + cls : '') + '"><b>' + pad(i) + '</b><span>' + iso(STEPS[i]) + '</span></div>'; }
  function at(x, y, html, cls, st) { return '<div class="hh-at' + (cls ? ' ' + cls : '') + '" style="left:' + x + 'px;top:' + y + 'px;' + (st || '') + '">' + html + '</div>'; }

  
  function harvest(vi) {
    var H = { ic: {}, rows: [] };
    [].forEach.call(vi.querySelectorAll('.nc'), function (n) { var t = n.querySelector('.t'); H.ic[t.textContent.trim()] = t.innerHTML; });
    [].forEach.call(vi.querySelectorAll('.rw'), function (r) { H.rows.push(r.getAttribute('style').replace(/"/g, '&quot;')); });
    var fr = vi.querySelector('.fr'); H.fr = fr ? fr.innerHTML : '';
    var r = vi.querySelector('.ring svg'); H.ring = r ? r.outerHTML : '';
    var a = vi.querySelector('.rowv > svg'); H.arr = a ? a.outerHTML : '';
    H.tl = [].map.call(vi.querySelectorAll('.st .tl'), function (e) { return e.outerHTML; });
    var svg = function (k) { var x = /<svg[\s\S]*<\/svg>/.exec(H.ic[k] || ''); return x ? x[0] : ''; };
    H.check = svg('אימות טלפוני'); H.bell = svg('הוצאה לפועל'); H.bld = svg('רשם החברות');
    return H;
  }
  
  function nc(label, x, y, delay, still) {
    return '<div class="nc' + (still ? ' hh-still' : '') + '" aria-hidden="true" style="left:' + x + 'px;top:' + y + 'px;animation-delay:' + (delay || 0) + 's"><div class="t">' + (HH.ic[label] || iso(label)) + '</div></div>';
  }
  
  function rows(x, w, y0, n) {
    var h = '';
    for (var i = 0; i < n; i++) h += '<div class="rw" style="' + HH.rows[i % HH.rows.length] + ';left:' + x + 'px;width:' + w + 'px;top:' + (y0 + i * 12) + 'px"></div>';
    return h;
  }
  
  function card(x, y) { return '<div class="fr hh-fr" style="left:' + x + 'px;top:' + y + 'px">' + HH.fr + '</div>'; }
  
  function ln(x, y, w, dark) { return '<div class="ln hh-ln' + (dark ? ' dk' : '') + '" aria-hidden="true" style="left:' + x + 'px;right:auto;width:' + w + 'px;top:' + (y - 1.5) + 'px"></div>'; }
  function vln(x, y, h, dark) { return '<div class="hh-vln' + (dark ? ' dk' : '') + '" style="left:' + (x - 1.5) + 'px;top:' + y + 'px;height:' + h + 'px"></div>'; }
  
  function ringv() { return '<span class="ring hh-ring">' + HH.ring + '<b>82</b></span>'; }
  function rate() { return '<span class="hh-rowv"><span class="rc" style="background:#F3F5F7;color:#64727C">B2</span>' + HH.arr + '<span class="rc" style="background:#5CCDE7;color:#071620">A1</span></span>'; }
  function wrap(glass, inner) { return '<div class="hh-o' + (glass ? ' gl' : '') + '"><div class="hh-oi">' + inner + '</div></div>'; }
  function outScore(g) { return wrap(g, ringv() + '<div><div class="hh-lb">ציון סקור</div>' + rate() + '</div>'); }
  function outScoreOnly(g) { return wrap(g, ringv() + '<div><div class="hh-lb">ציון סקור</div><div class="hh-rowv"><span class="pl2 hh-pl2">סיכון נמוך</span></div></div>'); }
  function outRate(g) { return wrap(g, (HH.tl[0] || '') + '<div><div class="hh-lb">שינוי בדירוג אשראי</div>' + rate() + '</div>'); }
  function outLive(g) { return wrap(g, '<span class="tl hh-tl">' + HH.bell + '</span><div><div class="hh-lb">מעקב שוטף</div><div class="hh-live"><i></i><span>התראות בזמן אמת</span></div></div>'); }
  function gate(dark) { return '<span class="hh-gate' + (dark ? ' dk' : '') + '">' + HH.check + '</span>'; }
  function pulse(x, y, dark) { return '<div class="hh-pulse' + (dark ? ' dk' : '') + '" style="left:' + x + 'px;top:' + y + 'px"><i></i><i></i><i></i></div>'; }
  function chips(list) { return list.map(function (c, i) { return nc(SRC[i], c[0], c[1], c[2]); }).join(''); }

  
  function o1(st, L) {
    var h = '';
    if (L) {
      var CY = 214;
      h += '<div class="pl lt hh-pl" style="left:576px;top:0">' + rows(0, 576, CY - 64, 13) +
        chips([[430, 108, 0], [262, 128, -.7], [470, 168, -1.4], [330, 186, -2.1], [212, 222, -2.8], [446, 240, -3.5], [300, 262, -4.2], [470, 300, -4.9], [236, 304, -5.6], [372, 334, -6.3]]) +
        vln(190, 96, 246) + at(190, 96, gate(), 'c') + '</div>';
      h += '<div class="pl hh-pl" style="left:0;top:0">' + ln(0, CY, 420, 1) + pulse(106, CY, 1) +
        at(292, CY, outScore(1), 'c') + at(106, CY, outLive(1), 'c') + '</div>';
      h += card(412, CY - 46);
      h += at(0, 34, key(0), '', 'right:40px;left:auto') + at(766, 34, key(1), 'cx');
      h += at(576, CY + 72, key(2, 'pill'), 'cx');
      h += at(292, 34, key(3, 'dk'), 'cx') + at(106, 34, key(4, 'dk'), 'cx');
    } else {
      h += '<div class="pl lt hh-pl" style="left:0;top:0">' + rows(0, 576, 120, 13) +
        chips([[330, 96, 0], [110, 112, -.7], [400, 146, -1.4], [30, 160, -2.1], [220, 180, -2.8], [380, 206, -3.5], [80, 222, -4.2], [270, 236, -4.9]]) +
        ln(0, 334, 576) + at(288, 334, gate(), 'c') + '</div>';
      h += '<div class="pl hh-pl" style="left:0;top:425px">' + vln(288, 40, 370, 1) + pulse(288, 314, 1) +
        at(288, 178, outScore(1), 'c') + at(288, 314, outLive(1), 'c') + '</div>';
      h += card(124, 371);
      h += at(0, 30, key(0), '', 'right:36px;left:auto') + at(0, 284, key(1), '', 'right:36px;left:auto');
      h += at(288, 474, key(2, 'pill'), 'cx');
      h += at(288, 425 + 106, key(3, 'dk'), 'cx') + at(288, 425 + 242, key(4, 'dk'), 'cx');
    }
    st.insertAdjacentHTML('beforeend', h);
  }

  
  function o2(st, L) {
    var h = '<div class="hh-dk"></div>';
    if (L) {
      var CY = 166;
      h += ln(0, CY, 1152, 1);
      h += [['רשם החברות', 1012, 84, 0, 1], ['דוחות כספיים', 900, 110, 0, 1], ['חוויית תשלום', 1040, 186, 0, 1], ['רשת D&B', 920, 192, 0, 1],
        ['פרסום ברשומות', 960, 152, -1.5], ['בית משפט', 850, 226, -3.8]].map(function (c) { return nc(c[0], c[1], c[2], c[3], c[4]); }).join('');
      h += at(800, CY, gate(1), 'c') + pulse(106, CY, 1);
      h += card(412, CY - 46);
      h += at(292, CY, outScore(1), 'c') + at(106, CY, outLive(1), 'c');
      [1030, 800, 576, 292, 106].forEach(function (x, i) { h += vln(x, 226, 22, 1) + at(x, 256, key(i, 'dk') + '<p class="hh-d">' + iso(DESC[i]) + '</p>', 'cx hh-col'); });
    } else {
      var X = 288;
      h += vln(X, 0, 835, 1);
      h += [['רשם החברות', 316, 84, 0, 1], ['דוחות כספיים', 70, 104, 0, 1], ['חוויית תשלום', 360, 150, 0, 1], ['רשת D&B', 110, 176, 0, 1], ['פרסום ברשומות', 300, 206, -2], ['בית משפט', 40, 140, -4.5]].map(function (c) { return nc(c[0], c[1], c[2], c[3], c[4]); }).join('');
      h += at(X, 272, gate(1), 'c') + at(X + 44, 272, key(1, 'dk'), 'cl');
      h += at(X, 336, key(2, 'dk bgd'), 'cx') + card(124, 378);
      h += at(X, 500, key(3, 'dk bgd'), 'cx') + at(X, 596, outScore(1), 'c');
      h += pulse(X, 760, 1) + at(X, 666, key(4, 'dk bgd'), 'cx') + at(X, 760, outLive(1), 'c');
      h += at(0, 26, key(0, 'dk'), '', 'right:36px;left:auto');
    }
    st.insertAdjacentHTML('beforeend', h);
  }

  
  function o3(st, L) {
    var h = '<div class="hh-g3"></div>', svg = '';
    function path(d, dark, k) { return '<path class="hh-fl' + (dark ? ' dk' : '') + '" style="animation-delay:' + (-k * .37).toFixed(2) + 's" d="' + d + '"/>'; }
    if (L) {
      var CY = 205, MX = 790;
      [[1000, 92], [930, 138], [1018, 184], [930, 230], [1000, 276], [930, 322]].forEach(function (c, i) {
        h += nc(SRC[i], c[0], c[1] - 14, 0, 1);
        svg += path('M' + (c[0] - 6) + ' ' + c[1] + 'C' + (c[0] - 90) + ' ' + c[1] + ' ' + (MX + 80) + ' ' + CY + ' ' + MX + ' ' + CY, 0, i);
      });
      svg += path('M' + MX + ' ' + CY + 'L744 ' + CY, 0, 7);
      var outs = [112, 214, 316];
      outs.forEach(function (y, i) { svg += path('M408 ' + CY + 'C340 ' + CY + ' 380 ' + y + ' 320 ' + y, 1, i); });
      h += '<svg class="hh-svg" viewBox="0 0 1152 410" width="1152" height="410" aria-hidden="true">' + svg + '</svg>';
      h += at(MX, CY, gate(), 'c') + at(MX, CY - 64, key(1), 'cx');
      h += card(412, CY - 46) + at(576, CY + 72, key(2, 'pill'), 'cx');
      h += at(200, outs[0], outScoreOnly(1), 'c') + at(200, outs[1], outRate(1), 'c') + at(200, outs[2], outLive(1), 'c');
      h += at(0, 30, key(0), '', 'right:40px;left:auto');
      h += at(200, 44, key(3, 'dk'), 'cx') + at(200, 366, key(4, 'dk'), 'cx');
    } else {
      var X = 288, MY = 300;
      [[330, 70], [70, 96], [350, 130], [100, 160], [330, 190], [60, 216]].forEach(function (c, i) {
        h += nc(SRC[i], c[0], c[1], 0, 1);
        var sx = c[0] + (c[0] > X ? 0 : 120), sy = c[1] + 30;
        svg += path('M' + sx + ' ' + sy + 'C' + sx + ' ' + (sy + 50) + ' ' + X + ' ' + (MY - 60) + ' ' + X + ' ' + MY, 0, i);
      });
      svg += path('M' + X + ' ' + MY + 'L' + X + ' 368', 0, 7);
      [[150, 610], [426, 610], [288, 752]].forEach(function (o, i) { svg += path('M' + X + ' 466C' + X + ' 520 ' + o[0] + ' ' + (o[1] - 100) + ' ' + o[0] + ' ' + (o[1] - 46), 1, i); });
      h += '<svg class="hh-svg" viewBox="0 0 576 835" width="576" height="835" aria-hidden="true">' + svg + '</svg>';
      h += at(X, MY, gate(), 'c') + at(X + 44, MY, key(1), 'cl');
      h += card(124, 371) + at(0, 20, key(0), '', 'right:30px;left:auto');
      h += at(150, 610, outScoreOnly(1), 'c') + at(426, 610, outRate(1), 'c') + at(288, 752, outLive(1), 'c');
      h += at(288, 500, key(3, 'dk bgd'), 'cx') + at(288, 674, key(4, 'dk bgd'), 'cx');
    }
    st.insertAdjacentHTML('beforeend', h);
  }

  
  function o4(st, L) {
    var h = '<div class="hh-lt"></div>', ticks = '';
    function tick(x, y, i) { return at(x, y, '<span class="hh-tick" style="--d:' + (i ? -(15 - i * 3) : 0) + 's">' + pad(i) + '</span>', 'c'); }
    if (L) {
      var CY = 156;
      h += rows(756, 396, CY - 72, 13);
      h += chips([[1000, 92, 0], [860, 116, -.9], [1050, 142, -1.8], [920, 176, -2.7], [1020, 208, -3.6], [830, 224, -4.5]]);
      h += '<div class="hh-slab" style="left:396px;top:' + (CY - 78) + 'px;width:360px;height:156px"></div>' + card(412, CY - 46);
      h += ln(0, CY, 396) + pulse(104, CY) + at(300, CY, outScore(), 'c') + at(104, CY, outLive(), 'c');
      h += '<div class="hh-rail" style="left:104px;width:944px;top:306px"><i></i></div>';
      [1048, 812, 576, 300, 104].forEach(function (x, i) { ticks += tick(x, 306, i) + at(x, 328, key(i, 'nn'), 'cx'); });
    } else {
      h += rows(0, 576, 66, 13);
      h += chips([[350, 52, 0], [100, 76, -.9], [410, 108, -1.8], [190, 136, -2.7], [30, 118, -3.6], [290, 170, -4.5]]);
      h += '<div class="hh-slab" style="left:84px;top:240px;width:408px;height:164px"></div>' + card(124, 276);
      h += vln(288, 404, 220) + pulse(288, 584) + at(288, 474, outScore(), 'c') + at(288, 584, outLive(), 'c');
      h += '<div class="hh-rail" style="left:76px;width:424px;top:722px"><i></i></div>';
      [500, 394, 288, 182, 76].forEach(function (x, i) { ticks += tick(x, 722, i) + at(x, i % 2 ? 662 : 756, key(i, 'nn sm'), 'cx'); });
    }
    st.insertAdjacentHTML('beforeend', h + ticks);
  }

  
  function o5(st, L) {
    var S = L ? 344 : 200, CX = L ? 576 : 288, CY = L ? 224 : 430;
    var states = [
      '<span class="tl hh-tl">' + HH.bld + '</span><div><div class="hh-lb">קליטת מידע מאלפי מקורות</div><div class="hh-rowv">' + nc('רשם החברות', 0, 0, 0, 1) + nc('דוחות כספיים', 0, 0, 0, 1) + '</div></div>',
      '<span class="tl hh-tl">' + HH.check + '</span><div><div class="hh-lb">הצלבה בין מקורות</div><div class="hh-rowv"><span class="pl2 hh-pl2">מאומת</span><span class="pl2 hh-pl2 gr">ניקוי כפילויות</span></div></div>',
      (HH.tl[1] || '') + '<div><div class="hh-lb">מספר <span dir="ltr" style="unicode-bidi:isolate">D-U-N-S</span></div><div class="hh-rowv"><span class="sgv">00-000-0000</span><span class="pl2 hh-pl2">מאומת</span></div></div>',
      ringv() + '<div><div class="hh-lb">ציון סקור</div>' + rate() + '</div>',
      '<span class="tl hh-tl">' + HH.bell + '</span><div><div class="hh-lb">התראות בזמן אמת</div><div class="hh-live"><i></i><span>שינוי בהנהלה</span></div></div>'];
    var belt = '';
    for (var j = -3; j < 8; j++) {
      var k = ((j % 5) + 5) % 5, x = L ? CX - j * S : CX, y = L ? CY : CY + j * S;
      belt += '<div class="hh-item" style="left:' + (x - 164) + 'px;top:' + (y - 46) + 'px">' + key(k, 'pill hh-ik') + '<div class="hh-card"><div class="hh-ci"><div class="hh-s">' + states[k] + '</div></div></div></div>';
    }
    var h = '<div class="hh-g5"></div>';
    h += '<div class="hh-slab" style="left:' + (CX - 200) + 'px;top:' + (CY - 112) + 'px;width:400px;height:196px"></div>';
    h += L ? rows(0, 1152, CY - 66, 12) + ln(0, CY, 1152) : vln(CX, 0, 835);
    h += '<div class="hh-beltw ' + (L ? 'x' : 'y') + '"><div class="hh-belt ' + (L ? 'x' : 'y') + '" style="--s:' + S + 'px">' + belt + '</div></div>';
    st.insertAdjacentHTML('beforeend', h);
  }

  
  var BUILD = [null, o1, o2, o3, o4, o5];
  function mount() {
    [].forEach.call(document.querySelectorAll('.vd11 .hv .vi'), function (vi) {
      if (vi.getAttribute('data-ho')) return;
      HH = harvest(vi);
      var L = !vi.closest('.mvi');
      vi.setAttribute('data-ho', N); vi.innerHTML = '';
      var st = document.createElement('div'); st.className = 'ho o' + N + ' ' + (L ? 'l' : 'p'); st.setAttribute('aria-hidden', 'true');
      vi.appendChild(st);
      try { BUILD[N](st, L); } catch (e) { window.__hoErr = String(e && e.stack || e); }
    });
    if (FREEZE != null) document.getAnimations().forEach(function (a) { try { a.pause(); a.currentTime = FREEZE * 1000; } catch (e) {} });
  }
  function bar() {
    if (!document.querySelector('.vd11 .hv .vi') || document.querySelector('.ho-switch')) return;
    var b = document.createElement('div'); b.className = 'ho-switch'; b.setAttribute('data-review-chip', '');
    b.innerHTML = '<span>איור ההירו</span>' + NAMES.map(function (t, i) { return '<a href="' + (i ? '?hero=' + i : '?') + '"' + (N === i ? ' class="on"' : '') + '>' + t + '</a>'; }).join('');
    document.body.appendChild(b);
  }
  function go() {
    if (FREEZE == null) bar();
    if (!N) return;
    document.documentElement.setAttribute('data-hero', N);
    mount();
    if (FREEZE != null) setTimeout(mount, 300);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
})();
