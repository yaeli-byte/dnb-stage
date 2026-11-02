
(function () {
  var ARW = "<svg class=\"arw a\" viewBox=\"0 0 20.6356 20.5633\" aria-hidden=\"true\"><circle cx=\"5.4369\" cy=\"1.7250\" r=\"1.225\" style=\"--i:6\"/><circle cx=\"12.1744\" cy=\"1.7250\" r=\"1.225\" style=\"--i:2\"/><circle cx=\"18.9105\" cy=\"1.7250\" r=\"1.225\" style=\"--i:0\"/><circle cx=\"18.9106\" cy=\"8.4633\" r=\"1.225\" style=\"--i:1\"/><circle cx=\"18.9106\" cy=\"15.2016\" r=\"1.225\" style=\"--i:4\"/><circle cx=\"12.1745\" cy=\"8.4633\" r=\"1.225\" style=\"--i:5\"/><circle cx=\"15.2492\" cy=\"5.3149\" r=\"1.225\" style=\"--i:3\"/><circle cx=\"8.7810\" cy=\"11.7797\" r=\"1.225\" style=\"--i:7\"/><circle cx=\"1.7250\" cy=\"18.8383\" r=\"1.225\" style=\"--i:9\"/><circle cx=\"5.4370\" cy=\"15.1977\" r=\"1.225\" style=\"--i:8\"/></svg><svg class=\"arw b\" viewBox=\"0 0 20.6356 20.5633\" aria-hidden=\"true\"><circle cx=\"5.4369\" cy=\"1.7250\" r=\"1.225\" style=\"--i:6\"/><circle cx=\"12.1744\" cy=\"1.7250\" r=\"1.225\" style=\"--i:2\"/><circle cx=\"18.9105\" cy=\"1.7250\" r=\"1.225\" style=\"--i:0\"/><circle cx=\"18.9106\" cy=\"8.4633\" r=\"1.225\" style=\"--i:1\"/><circle cx=\"18.9106\" cy=\"15.2016\" r=\"1.225\" style=\"--i:4\"/><circle cx=\"12.1745\" cy=\"8.4633\" r=\"1.225\" style=\"--i:5\"/><circle cx=\"15.2492\" cy=\"5.3149\" r=\"1.225\" style=\"--i:3\"/><circle cx=\"8.7810\" cy=\"11.7797\" r=\"1.225\" style=\"--i:7\"/><circle cx=\"1.7250\" cy=\"18.8383\" r=\"1.225\" style=\"--i:9\"/><circle cx=\"5.4370\" cy=\"15.1977\" r=\"1.225\" style=\"--i:8\"/></svg>";
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function cell(t, ltr) { return '<div class="cmp__c" role="cell"' + (ltr ? ' dir="ltr"' : '') + '>' + t + '</div>'; }
  function build(d) {
    var n = d.cols.length;
    var head = '<div class="cmp__r cmp__hd" role="row"><div class="cmp__cor" role="presentation"></div>' + d.cols.map(function (c) {
      return '<div class="cmp__ch" role="columnheader"' + (c.ltr ? ' dir="ltr"' : '') + '>' + esc(c.name) + '</div>';
    }).join('') + '</div>';
    var rows = d.rows.map(function (r) {
      return '<div class="cmp__r" role="row"><div class="cmp__lb" role="rowheader">' + esc(r.k) + '</div>' +
        r.v.map(function (v) { return cell(esc(v)); }).join('') + '</div>';
    }).join('');
    var go = '<div class="cmp__r cmp__go" role="row"><div class="cmp__lb cmp__lb--e" role="presentation"></div>' + d.cols.map(function (c) {
      var off = !c.href || c.href === '#';
      return cell('<a class="cmp__act" href="' + (c.href || '#') + '" aria-label="לעמוד המוצר ' + esc(c.name) + '"' +
        (off ? ' aria-disabled="true" title="לא נבנה בפרוטוטייפ הזה"' : '') + '><span class="cmp__t">לעמוד המוצר</span>' +
        '<span class="cmp__tile" aria-hidden="true">' + ARW + '</span></a>');
    }).join('') + '</div>';
    var dots = ''; for (var i = 0; i < n; i++) dots += '<i></i>';
    return '<div class="cmp__in"><div class="cmp__head"><p class="cmp__eb"><i></i><span>' + esc(d.eyebrow) + '</span><i></i></p>' +
      '<h2 class="cmp__h2">' + esc(d.h2) + '</h2><p class="cmp__lede">' + esc(d.lede) + '</p></div>' +
      '<div class="cmp__wrap"><div class="cmp__card"><div class="cmp__scroll"><div class="cmp__tbl" role="table" aria-label="' + esc(d.h2) + '" style="--n:' + n + '">' +
      head + rows + go + '</div></div></div><span class="cmp__corner" aria-hidden="true"></span><span class="cmp__fade" aria-hidden="true"></span></div>' +
      '<div class="cmp__dots" aria-hidden="true">' + dots + '</div></div>';
  }
  
  function wire(sec) {
    var sc = sec.querySelector('.cmp__scroll'), hd = sec.querySelector('.cmp__hd'), dots = [].slice.call(sec.querySelectorAll('.cmp__dots i'));
    var n = dots.length;
    function dotsUpd() {
      if (!sec.classList.contains('is-m') || n < 3) return;
      var r = sc.getBoundingClientRect(), lab = hd.children[0].getBoundingClientRect();
      [].slice.call(hd.children, 1).forEach(function (c, k) {
        var b = c.getBoundingClientRect(), vis = b.left >= r.left - 2 && b.right <= lab.left + 2;
        dots[k].classList.toggle('on', vis);
      });
    }
    function measure() {
      var m = sec.getBoundingClientRect().width < 768;
      sec.classList.toggle('is-m', m);
      sec.style.setProperty('--cmp-hh', Math.round(hd.getBoundingClientRect().height) + 'px');
      if (m && n >= 3) { sc.setAttribute('tabindex', '0'); sc.setAttribute('role', 'region'); sc.setAttribute('aria-label', 'טבלת השוואה, גלילה לצדדים'); }
      else { sc.removeAttribute('tabindex'); sc.removeAttribute('role'); sc.removeAttribute('aria-label'); }
      dotsUpd();
    }
    sc.addEventListener('scroll', dotsUpd, { passive: true });
    if (window.ResizeObserver) new ResizeObserver(measure).observe(sec); else window.addEventListener('resize', measure);
    measure(); if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  }
  function mount(after, d) {
    if (!after || !after.parentNode) return null;
    var sec = document.createElement('section');
    sec.className = 'cmp'; sec.setAttribute('dir', 'rtl'); sec.setAttribute('data-sec', 'compare'); sec.setAttribute('data-n', d.cols.length);
    sec.innerHTML = build(d);
    after.parentNode.insertBefore(sec, after.nextSibling);
    wire(sec);
    return sec;
  }
  window.DNBCompare = { build: build, mount: mount, wire: wire };
})();
