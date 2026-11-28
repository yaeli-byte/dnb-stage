
(function () {
  var G = '<svg viewBox="0 0 20.6356 20.5633" aria-hidden="true">' +
    '<circle cx="12.1744" cy="1.7250" r="1.225"/><circle cx="18.9105" cy="1.7250" r="1.225"/>' +
    '<circle cx="18.9106" cy="8.4633" r="1.225"/><circle cx="15.2492" cy="5.3149" r="1.225"/>' +
    '<circle cx="1.7250" cy="18.8383" r="1.225"/><circle cx="1.7250" cy="12.1000" r="1.225"/>' +
    '<circle cx="8.4611" cy="18.8383" r="1.225"/><circle cx="5.4370" cy="15.1977" r="1.225"/></svg>';
  var CLOSE = '<svg viewBox="0 0 16.1428 16.1428" aria-hidden="true" style="left:12px;top:12px;width:16px;height:16px">' +
    '<g transform="rotate(45 8.0714 8.0714) translate(-3.3433,6.5714)"><circle cx="1.5" cy="1.5" r="1.5"/><circle cx="6.4573" cy="1.5" r="1.5"/><circle cx="11.4147" cy="1.5" r="1.5"/><circle cx="16.3721" cy="1.5" r="1.5"/><circle cx="21.3294" cy="1.5" r="1.5"/></g>' +
    '<g transform="rotate(-45 8.0714 8.0714) translate(-3.3433,6.5714)"><circle cx="1.5" cy="1.5" r="1.5"/><circle cx="6.4573" cy="1.5" r="1.5"/><circle cx="11.4147" cy="1.5" r="1.5"/><circle cx="16.3721" cy="1.5" r="1.5"/><circle cx="21.3294" cy="1.5" r="1.5"/></g></svg>';

  

  var VXG = {1: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="8.50" cy="3.00" r="0.92"/><circle cx="5.75" cy="3.00" r="0.92"/><circle cx="3.00" cy="3.00" r="0.92"/><circle cx="3.00" cy="5.75" r="0.92"/><circle cx="3.00" cy="8.50" r="0.92"/><circle cx="15.50" cy="3.00" r="0.92"/><circle cx="18.25" cy="3.00" r="0.92"/><circle cx="21.00" cy="3.00" r="0.92"/><circle cx="21.00" cy="5.75" r="0.92"/><circle cx="21.00" cy="8.50" r="0.92"/><circle cx="8.50" cy="21.00" r="0.92"/><circle cx="5.75" cy="21.00" r="0.92"/><circle cx="3.00" cy="21.00" r="0.92"/><circle cx="3.00" cy="18.25" r="0.92"/><circle cx="3.00" cy="15.50" r="0.92"/><circle cx="15.50" cy="21.00" r="0.92"/><circle cx="18.25" cy="21.00" r="0.92"/><circle cx="21.00" cy="21.00" r="0.92"/><circle cx="21.00" cy="18.25" r="0.92"/><circle cx="21.00" cy="15.50" r="0.92"/></svg>', 2: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="21.00" cy="3.00" r="0.92"/><circle cx="19.00" cy="5.00" r="0.92"/><circle cx="17.00" cy="7.00" r="0.92"/><circle cx="15.00" cy="9.00" r="0.92"/><circle cx="13.00" cy="11.00" r="0.92"/><circle cx="11.00" cy="13.00" r="0.92"/><circle cx="9.00" cy="15.00" r="0.92"/><circle cx="7.00" cy="17.00" r="0.92"/><circle cx="5.00" cy="19.00" r="0.92"/><circle cx="3.00" cy="21.00" r="0.92"/><circle cx="15.50" cy="3.00" r="0.92"/><circle cx="18.25" cy="3.00" r="0.92"/><circle cx="21.00" cy="5.75" r="0.92"/><circle cx="21.00" cy="8.50" r="0.92"/><circle cx="8.50" cy="21.00" r="0.92"/><circle cx="5.75" cy="21.00" r="0.92"/><circle cx="3.00" cy="18.25" r="0.92"/><circle cx="3.00" cy="15.50" r="0.92"/></svg>', 3: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="9.25" cy="9.25" r="0.92"/><circle cx="7.17" cy="7.17" r="0.92"/><circle cx="5.08" cy="5.08" r="0.92"/><circle cx="3.00" cy="3.00" r="0.92"/><circle cx="14.75" cy="9.25" r="0.92"/><circle cx="16.83" cy="7.17" r="0.92"/><circle cx="18.92" cy="5.08" r="0.92"/><circle cx="21.00" cy="3.00" r="0.92"/><circle cx="9.25" cy="14.75" r="0.92"/><circle cx="7.17" cy="16.83" r="0.92"/><circle cx="5.08" cy="18.92" r="0.92"/><circle cx="3.00" cy="21.00" r="0.92"/><circle cx="14.75" cy="14.75" r="0.92"/><circle cx="16.83" cy="16.83" r="0.92"/><circle cx="18.92" cy="18.92" r="0.92"/><circle cx="21.00" cy="21.00" r="0.92"/><circle cx="5.95" cy="3.00" r="0.92"/><circle cx="3.00" cy="5.95" r="0.92"/><circle cx="18.05" cy="3.00" r="0.92"/><circle cx="21.00" cy="5.95" r="0.92"/><circle cx="5.95" cy="21.00" r="0.92"/><circle cx="3.00" cy="18.05" r="0.92"/><circle cx="18.05" cy="21.00" r="0.92"/><circle cx="21.00" cy="18.05" r="0.92"/></svg>', 4: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="3.00" cy="13.00" r="0.92"/><circle cx="5.50" cy="13.00" r="0.92"/><circle cx="8.00" cy="13.00" r="0.92"/><circle cx="10.50" cy="13.00" r="0.92"/><circle cx="13.00" cy="13.00" r="0.92"/><circle cx="13.00" cy="15.67" r="0.92"/><circle cx="13.00" cy="18.33" r="0.92"/><circle cx="13.00" cy="21.00" r="0.92"/><circle cx="10.50" cy="21.00" r="0.92"/><circle cx="8.00" cy="21.00" r="0.92"/><circle cx="5.50" cy="21.00" r="0.92"/><circle cx="3.00" cy="21.00" r="0.92"/><circle cx="3.00" cy="18.33" r="0.92"/><circle cx="3.00" cy="15.67" r="0.92"/><circle cx="9.00" cy="15.00" r="0.92"/><circle cx="13.00" cy="11.00" r="0.92"/><circle cx="15.00" cy="9.00" r="0.92"/><circle cx="17.00" cy="7.00" r="0.92"/><circle cx="19.00" cy="5.00" r="0.92"/><circle cx="21.00" cy="3.00" r="0.92"/><circle cx="15.50" cy="3.00" r="0.92"/><circle cx="18.25" cy="3.00" r="0.92"/><circle cx="21.00" cy="5.75" r="0.92"/><circle cx="21.00" cy="8.50" r="0.92"/></svg>', 5: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="8.50" cy="3.00" r="0.92"/><circle cx="5.75" cy="3.00" r="0.92"/><circle cx="3.00" cy="3.00" r="0.92"/><circle cx="3.00" cy="5.75" r="0.92"/><circle cx="3.00" cy="8.50" r="0.92"/><circle cx="15.50" cy="3.00" r="0.92"/><circle cx="18.25" cy="3.00" r="0.92"/><circle cx="21.00" cy="3.00" r="0.92"/><circle cx="21.00" cy="5.75" r="0.92"/><circle cx="21.00" cy="8.50" r="0.92"/><circle cx="8.50" cy="21.00" r="0.92"/><circle cx="5.75" cy="21.00" r="0.92"/><circle cx="3.00" cy="21.00" r="0.92"/><circle cx="3.00" cy="18.25" r="0.92"/><circle cx="3.00" cy="15.50" r="0.92"/><circle cx="15.50" cy="21.00" r="0.92"/><circle cx="18.25" cy="21.00" r="0.92"/><circle cx="21.00" cy="21.00" r="0.92"/><circle cx="21.00" cy="18.25" r="0.92"/><circle cx="21.00" cy="15.50" r="0.92"/></svg>'};
  
  var VX = 2;   
  var LABEL = 'הגדלה למסך מלא';
  function chip () {
    return;   
    if (document.querySelector('.vdx-switch')) return;
    var b = document.createElement('div'); b.className = 'vdx-switch'; b.setAttribute('data-review-chip', '');
    var names = ['היום', '1 · מסגרת', '2 · שני חצים', '3 · ארבעה חצים', '4 · פתיחה', '5 · פינת נגן'];
    b.innerHTML = '<span>הגדלת וידאו</span>' + names.map(function (t, i) {
      var q = new URLSearchParams(location.search); if (i) q.set('vx', i); else q.delete('vx');
      var qs = q.toString(); return '<a href="' + location.pathname + (qs ? '?' + qs : '') + '"' + (VX === i ? ' class="on"' : '') + '>' + t + '</a>';
    }).join('');
    document.body.appendChild(b);
  }

  function init () {
    chip();
    [].forEach.call(document.querySelectorAll('.vd-frame'), function (fr) {
      if (fr.getAttribute('data-vdx')) return;
      if (!fr.getClientRects().length) return;          // the losing build of a unified page is removed, but be safe
      var box = fr.firstElementChild;
      if (!box) return;
      fr.setAttribute('data-vdx', '1');

      var bx = document.createElement('button');
      bx.type = 'button';
      bx.className = 'vd-x sg-tile sg-tile--dark' + (VX ? ' vd-x--g vd-x--v' + VX : '');
      bx.setAttribute('aria-label', LABEL);
      bx.title = LABEL;
      bx.innerHTML = VX ? VXG[VX] : G;
      box.appendChild(bx);

      var over = document.createElement('div');
      over.className = 'vd-over';
      over.hidden = true;
      over.setAttribute('role', 'dialog');
      over.setAttribute('aria-modal', 'true');
      over.setAttribute('aria-label', 'סרטון דמו במסך מלא');
      over.innerHTML = '<div class="vd-slot"></div>';
      var cx = document.createElement('button');
      cx.type = 'button';
      cx.className = 'vd-x sg-tile sg-tile--dark';
      cx.setAttribute('aria-label', 'סגירת המסך המלא');
      cx.title = 'סגירת המסך המלא';
      cx.innerHTML = CLOSE;
      over.appendChild(cx);
      document.body.appendChild(over);
      var slot = over.firstChild;

      function open () {
        slot.appendChild(box);
        bx.style.setProperty('display', 'none', 'important');   // .sg-tile is display:block!important — [hidden] loses
        over.hidden = false;
        document.documentElement.classList.add('vd-lock');
        cx.focus();
        if (over.requestFullscreen) over.requestFullscreen().catch(function () {});
      }
      function close () {
        if (over.hidden) return;
        if (document.fullscreenElement === over && document.exitFullscreen) document.exitFullscreen().catch(function () {});
        fr.appendChild(box);
        bx.style.removeProperty('display');
        over.hidden = true;
        document.documentElement.classList.remove('vd-lock');
        bx.focus();
      }
      bx.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); open(); });
      cx.addEventListener('click', close);
      over.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { e.preventDefault(); close(); }
        if (e.key === 'Tab') { e.preventDefault(); cx.focus(); }   // one control in the layer: keep focus on it
      });
      document.addEventListener('fullscreenchange', function () { if (!document.fullscreenElement) close(); });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  addEventListener('load', init);
})();
