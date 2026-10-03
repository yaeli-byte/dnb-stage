
(function () {
  var tl = document.querySelector('[role="tablist"][aria-label="הכלים"]');
  if (!tl) return;
  var sec = tl.closest('section');
  if (!sec) return;
  var panel = sec.querySelector('[role="tabpanel"]');
  var list  = sec.querySelector('ul');
  if (!panel || !list) return;

  
  var KILL_LIST = ['display','grid-template-columns','grid-template','gap','padding',
                   'border-radius','background','background-color','box-shadow','height',
                   'justify-content','align-items','width','font-size','line-height'];
  function strip(el, props) { props.forEach(function (k) { el.style.removeProperty(k); }); }
  strip(tl, KILL_LIST);
  [].forEach.call(tl.querySelectorAll('[role="tab"]'), function (b) { strip(b, KILL_LIST); });
  tl.classList.add('tools-rail');

  
  [].forEach.call(tl.querySelectorAll('[role="tab"]'), function (b) {
    if (b.querySelector('.rail-go')) return;
    var go = document.createElement('span');
    go.className = 'rail-go';
    go.setAttribute('aria-hidden', 'true');
    go.innerHTML = '<i></i>';
    b.appendChild(go);
  });

  
  var split = document.createElement('div');
  split.className = 'tools-split';
  tl.parentNode.insertBefore(split, tl);
  split.appendChild(tl);
  split.appendChild(panel);

  
  list.classList.add('tools-checklist');
  split.parentNode.insertBefore(list, split.nextSibling);

  
  var tabs = [].slice.call(tl.querySelectorAll('[role="tab"]'));
  var hasPanel = 0;                      
  tabs.forEach(function (b, i) {
    b.addEventListener('click', function () {
      tabs.forEach(function (o, n) {
        o.setAttribute('aria-selected', n === i ? 'true' : 'false');
        o.setAttribute('tabindex', n === i ? '0' : '-1');
      });
      flag.hidden = (i === hasPanel);
      panel.style.opacity = (i === hasPanel) ? '' : '.35';
    });
  });

  var flag = document.createElement('div');
  flag.className = 'needs-file';
  flag.hidden = true;
  flag.innerHTML = '⚠ <b>חסר תוכן</b> — לכלי הזה אין עדיין מסך ותיאור. ' +
                   'בפרוטוטייפ קיים רק המסך של ״' +
                   (tabs[hasPanel] ? tabs[hasPanel].textContent.trim() : '') + '״.';
  split.parentNode.insertBefore(flag, split);

  
  (function phone() {
    var w = sec.getBoundingClientRect().width;
    if (!w || w >= 768) return;

    var tabs = [].slice.call(tl.querySelectorAll('[role="tab"]'));
    if (!tabs.length) return;
    var body = panel;                                   

    var wrap = document.createElement('div');
    wrap.className = 'tm';
    var q = (location.search.match(/[?&]tools=(open|drop)/) || [])[1] || 'open';
    wrap.setAttribute('data-opt', q);

    var bar = document.createElement('div');
    bar.className = 'tm-bar';
    bar.innerHTML = '<span class="lbl">תצוגת הכלים במובייל</span>' +
      '<span class="sw" role="group" aria-label="תצוגת הכלים">' +
      '<button type="button" data-o="open">הכל פתוח</button>' +
      '<button type="button" data-o="drop">דרופדאונים</button></span>';

    tabs.forEach(function (t, i) {
      var row = document.createElement('div');
      row.className = 'trow';
      row.setAttribute('data-on', i === 0 ? 'true' : 'false');
      var head = document.createElement('button');
      head.type = 'button';
      head.setAttribute('aria-expanded', i === 0 ? 'true' : 'false');
      head.textContent = (t.textContent || '').replace(/\s+/g, ' ').trim();
      var go = document.createElement('span');
      go.className = 'go'; go.setAttribute('aria-hidden', 'true');
      go.innerHTML = '<i></i>';
      head.appendChild(go);
      var bd = document.createElement('div');
      bd.className = 'body';
      if (i === 0 && body) bd.appendChild(body);
      else bd.innerHTML = '<p class="noslot">⚠ אין עדיין תוכן לכלי הזה — סלוט ריק, לא תוכן שהמצאתי.</p>';
      row.appendChild(head); row.appendChild(bd);
      head.addEventListener('click', function () {
        if (wrap.getAttribute('data-opt') !== 'drop') return;
        [].forEach.call(wrap.querySelectorAll('.trow'), function (r, n) {
          r.setAttribute('data-on', n === i ? 'true' : 'false');
          r.querySelector('button').setAttribute('aria-expanded', n === i ? 'true' : 'false');
        });
        tabs.forEach(function (o, n) { o.setAttribute('aria-selected', n === i ? 'true' : 'false'); });
      });
      wrap.appendChild(row);
    });

    [].forEach.call(bar.querySelectorAll('button'), function (b) {
      b.addEventListener('click', function () {
        wrap.setAttribute('data-opt', b.dataset.o);
        [].forEach.call(bar.querySelectorAll('button'), function (o) {
          o.setAttribute('aria-pressed', o.dataset.o === b.dataset.o ? 'true' : 'false');
        });
      });
      b.setAttribute('aria-pressed', b.dataset.o === q ? 'true' : 'false');
    });

    split.parentNode.insertBefore(bar, split);
    split.parentNode.insertBefore(wrap, split);
    split.remove();
  })();
})();
