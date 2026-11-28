
(function () {
  var ICONS = {
    bulb: "7.08,13.27 6.2,10.35 6.93,7.39 9.06,5.2 12,4.4 14.94,5.2 17.07,7.39 17.8,10.35 16.92,13.27 9.4,16.4 14.6,16.4 12,16.4 9.6,19.3 12,19.3 14.4,19.3 12,22.1 12,1.3 4.3,4.2 19.7,4.2",
    policy: "2,5 4.86,5 7.71,5 10.57,5 19.14,5 22,5 2,12 4.86,12 10.57,12 13.43,12 16.29,12 19.14,12 22,12 2,19 4.86,19 7.71,19 10.57,19 16.29,19 19.14,19 22,19 14.8,2 14.8,5 14.8,8 7.6,9 7.6,12 7.6,15 13.6,16 13.6,19 13.6,22",
    trend: "2.6,16.8 4.47,14.93 6.33,13.07 8.2,11.2 10.2,13.2 12.2,15.2 14.33,13.07 16.47,10.93 18.6,8.8 14.4,6.8 17.5,6.8 20.6,6.8 20.6,9.9 20.6,13 2.6,21.6 5.73,21.6 8.87,21.6 12,21.6 15.13,21.6 18.27,21.6 21.4,21.6",
    forecast: "2.6,2.6 2.6,5.73 2.6,8.87 2.6,12 2.6,15.13 2.6,18.27 2.6,21.4 5.73,21.4 8.87,21.4 12,21.4 15.13,21.4 18.27,21.4 21.4,21.4 6,17 7.8,14.8 9.6,12.6 13,15 14.4,13.2 15.8,11.4 18.4,4.4 20.9,5.6 21.52,8.31 19.79,10.48 15.28,8.31 15.9,5.6",
    chat: "9.7,3.2 12.64,3.2 15.57,3.2 17.6,4.8 12.64,15.2 9.7,15.2 6.76,15.2 3.83,15.2 1.8,13.6 1.8,10.67 1.8,7.73 1.8,4.8 3.83,3.2 6.76,3.2 9.7,18.6 6.2,19.6 13.2,19.6 18.8,9.4 21.62,9.88 22.2,12.66 22.2,15.6 22.2,18.54 21.62,21.32 18.8,21.8 15.98,21.32 15.4,18.54 15.4,15.6 15.4,12.66 15.98,9.88",
    bell: "5.8,10.4 6.63,7.3 8.9,5.03 12,4.2 15.1,5.03 17.37,7.3 18.2,10.4 5.8,13.7 5.8,17 18.2,13.7 18.2,17 2.8,17 8.93,17 12,17 15.07,17 21.2,17 12,20.6 12,1.4",
    gauge: "12,2.4 14.97,2.87 17.64,4.23 19.77,6.36 21.13,9.03 21.6,12 21.13,14.97 19.77,17.64 17.64,19.77 14.97,21.13 12,21.6 9.03,21.13 6.36,19.77 4.23,17.64 2.87,14.97 2.4,12 2.87,9.03 4.23,6.36 6.36,4.23 9.03,2.87 12,12 14.1,9.9 16.2,7.8",
    globe: "12,2.4 14.97,2.87 17.64,4.23 19.77,6.36 21.13,9.03 21.6,12 21.13,14.97 19.77,17.64 17.64,19.77 14.97,21.13 12,21.6 9.03,21.13 6.36,19.77 4.23,17.64 2.87,14.97 2.4,12 2.87,9.03 4.23,6.36 6.36,4.23 9.03,2.87 15.97,5.79 16.91,8.83 17.2,12 16.91,15.17 15.97,18.21 8.03,18.21 7.09,15.17 6.8,12 7.09,8.83 8.03,5.79 10.27,12 13.73,12",
    search: "10,3.4 12.86,4.05 15.16,5.88 16.43,8.53 16.43,11.47 15.16,14.12 12.86,15.95 10,16.6 7.14,15.95 4.84,14.12 3.57,11.47 3.57,8.53 4.84,5.88 7.14,4.05 17.2,17.2 19.2,19.2 21.2,21.2",
    shield: "12,2.2 14.6,3.2 17.2,4.2 19.8,5.2 19.8,8.1 19.8,11 19.44,13.78 18.32,16.36 16.58,18.57 14.42,20.36 12,21.8 9.58,20.36 7.42,18.57 5.68,16.36 4.56,13.78 4.2,11 4.2,8.1 4.2,5.2 6.8,4.2 9.4,3.2",
    chartbar: "2.6,21.4 5.73,21.4 8.87,21.4 12,21.4 15.13,21.4 18.27,21.4 21.4,21.4 5.73,18.27 5.73,15.13 12,18.27 12,15.13 12,12 12,8.87 18.27,18.27 18.27,15.13 18.27,12 18.27,8.87 18.27,5.73 18.27,2.6",
    calendar: "3,4.4 6,4.4 9,4.4 12,4.4 15,4.4 18,4.4 21,4.4 3,21.4 6,21.4 9,21.4 12,21.4 15,21.4 18,21.4 21,21.4 3,7.23 3,10.07 3,12.9 3,15.73 3,18.57 21,7.23 21,10.07 21,12.9 21,15.73 21,18.57 6,10.07 9,10.07 12,10.07 15,10.07 18,10.07 7.5,1.6 16.5,1.6 7.5,14.3 12,14.3 16.5,14.3 7.5,17.6 12,17.6",
    eye: "12,4.5 9.29,4.79 6.73,5.69 4.44,7.17 2.53,9.11 1.04,11.38 1.73,13.79 3.44,15.91 5.54,17.64 7.98,18.84 10.64,19.43 13.36,19.43 16.02,18.84 18.46,17.64 20.56,15.91 22.27,13.79 22.96,11.38 21.47,9.11 19.56,7.17 17.27,5.69 14.71,4.79 12,15.75 14.41,14.87 15.69,12.65 15.25,10.12 13.28,8.48 10.72,8.48 8.75,10.12 8.31,12.65 9.59,14.87"
  };
  var NS = 'http://www.w3.org/2000/svg';
  function glyph(name) {
    var pts = ICONS[name]; if (!pts) return null;
    var s = document.createElementNS(NS, 'svg');
    s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('fill', 'currentColor');
    s.setAttribute('aria-hidden', 'true'); s.setAttribute('focusable', 'false');
    pts.split(' ').forEach(function (p) {
      var xy = p.split(','), c = document.createElementNS(NS, 'circle');
      c.setAttribute('cx', xy[0]); c.setAttribute('cy', xy[1]); c.setAttribute('r', '0.92');
      s.appendChild(c);
    });
    return s;
  }
  function el(tag, cls, txt) {
    var e = document.createElement(tag); if (cls) e.className = cls;
    if (txt != null) e.textContent = txt; return e;
  }
  function mount(sec) {
    if (sec.hasAttribute('data-bnf-done')) return;
    var src = sec.querySelector('script[type="application/json"]'); if (!src) return;
    var d; try { d = JSON.parse(src.textContent); } catch (e) { return; }
    var wrap = el('div', 'bnf__wrap'), panel = el('div', 'bnf__panel');
    var veil = el('span', 'bnf__veil'), dots = el('span', 'bnf__dots');
    veil.setAttribute('aria-hidden', 'true'); dots.setAttribute('aria-hidden', 'true');
    var head = el('div', 'bnf__head'), eb = el('div', 'bnf__eb');
    eb.setAttribute('data-eb-dots', '2');              
    eb.appendChild(el('i')); eb.appendChild(el('span', null, d.eyebrow || 'יתרונות')); eb.appendChild(el('i'));
    var h2 = el('h2', 'bnf__h2', d.h2 || '');
    head.appendChild(eb); head.appendChild(h2);
    var ul = el('ul', 'bnf__grid'); ul.setAttribute('aria-label', d.h2 || '');
    (d.items || []).forEach(function (it) {
      var li = el('li', 'bnf__card'), ico = el('span', 'bnf__ico');
      ico.setAttribute('aria-hidden', 'true');
      var g = glyph(it[1]); if (g) ico.appendChild(g);
      li.appendChild(ico); li.appendChild(el('p', 'bnf__t', it[0]));
      ul.appendChild(li);
    });
    panel.appendChild(veil); panel.appendChild(dots); panel.appendChild(head); panel.appendChild(ul);
    wrap.appendChild(panel); sec.appendChild(wrap);
    sec.setAttribute('data-bnf-done', '');
    if (!sec.getAttribute('aria-label')) sec.setAttribute('aria-label', d.eyebrow || 'יתרונות');
  }
  function all() { [].forEach.call(document.querySelectorAll('[data-bnf]'), mount); }
  all();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', all);
  window.DNBBenefits = { mount: mount, icons: ICONS };
})();
