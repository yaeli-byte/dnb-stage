
(function () {
  var S = window.DNBSearch, root = document.querySelector('.pg-search');
  if (!S || !root) return;
  var input = root.querySelector('input[name="q"]'), form = root.querySelector('.sr-form');
  var meta = root.querySelector('.sr-meta'), tabs = root.querySelector('.sr-tabs');
  var list = root.querySelector('.sr-list'), empty = root.querySelector('.sr-empty');
  var chips = root.querySelector('.sr-chips');
  var q = new URLSearchParams(location.search).get('q') || '', cur = 'all';
  var CHIP = { sol: 'sr-tag--teal', ind: 'sr-tag--cyan', post: 'sr-tag--tint', page: 'sr-tag--grey' };
  var PATH = { sol: 'הפתרונות', ind: 'פתרונות לפי תעשיות', post: 'מרכז המידע · הבלוג', page: 'D&B ישראל' };

  chips.innerHTML = S.POPULAR.map(function (p) { return '<button type="button" data-q="' + p + '">' + S.mark(p, '') + '</button>'; }).join('');
  chips.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) run(b.getAttribute('data-q')); });

  function run(v) {
    q = (v || '').trim(); input.value = q; cur = 'all';
    history.replaceState(null, '', q ? S.resultsUrl(q) : 'search.html');
    render();
  }
  function render() {
    var res = q ? S.query(q) : [];
    document.title = q ? 'D&B — חיפוש: ' + q : 'D&B — תוצאות חיפוש';
    meta.innerHTML = q ? (res.length ? '<b>' + res.length + '</b> תוצאות עבור "<b>' + S.mark(q, '').replace(/<[^>]+>/g, '') + '</b>"'
                                     : 'אין תוצאות עבור "<b>' + q.replace(/</g, '&lt;') + '</b>"')
                       : 'הקלידו מילה כדי לחפש באתר';
    var counts = { all: res.length };
    res.forEach(function (r) { counts[r.type] = (counts[r.type] || 0) + 1; });
    var T = [['all', 'הכל']].concat(Object.keys(S.TYPES).map(function (k) { return [k, S.TYPES[k]]; }));
    tabs.hidden = !res.length;
    tabs.innerHTML = T.filter(function (t) { return t[0] === 'all' || counts[t[0]]; }).map(function (t) {
      return '<button type="button" role="tab" data-t="' + t[0] + '" aria-selected="' + (t[0] === cur) + '">' + t[1] +
             ' <span>' + (counts[t[0]] || 0) + '</span></button>';
    }).join('');
    var shown = res.filter(function (r) { return cur === 'all' || r.type === cur; });
    list.innerHTML = shown.map(function (r) {
      return '<li class="sr-item"><a href="' + r.u + '">' +
        '<span class="sr-tag ' + CHIP[r.type] + '"><i></i>' + S.TYPES[r.type] + '</span>' +
        '<h3>' + S.mark(r.t, q) + '</h3><p>' + S.mark(r.d, q) + '</p>' +
        '<span class="sr-path">' + S.mark(PATH[r.type], '') + ' · ' + S.mark(r.t, '') + '</span>' +
        '<span class="sr-go" aria-hidden="true"></span></a></li>';
    }).join('');
    empty.hidden = !!res.length;
    
    empty.querySelector('h2').hidden = !q;
    empty.querySelector('p').textContent = q ? 'נסו מילה אחרת, או התחילו מאחד החיפושים הפופולריים:' : 'חיפושים פופולריים:';
  }
  tabs.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return; cur = b.getAttribute('data-t'); render();
  });
  form.addEventListener('submit', function (e) { e.preventDefault(); run(input.value); });
  input.value = q;
  render();
})();
