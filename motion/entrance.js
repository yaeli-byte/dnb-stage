
(function () {
  var sol = document.getElementById('sol');
  if (!sol) return;

  
  function parts() {
    var head = sol.querySelector('.pv-head');
    var list = [];
    if (head) {
      list.push(head.querySelector('.eyebrow'));
      list.push(head.querySelector('h2'));
      list.push(head.querySelector('.sub'));
    }
    [].forEach.call(sol.querySelectorAll('.card'), function (c) {
      list.push(c);
      var t = c.querySelector('.s2-t, .txt');
      if (t) list.push(t);
    });
    return list.filter(Boolean);
  }

  var els = parts();
  els.forEach(function (e) { e.classList.add('en'); });

  
  var PLAN = {
    '1': { step: 0,   copy: 0,   head: 0   },   // ramp — everything at once
    '2': { step: 60,  copy: 40,  head: 0   },   // cloudflare — even 60ms cascade
    '3': { step: 100, copy: 80,  head: 120 },   // apple — staged groups
    '4': { step: 80,  copy: 60,  head: 0   },   // cyera — wipe cascade
    '5': { step: 70,  copy: 50,  head: 0   }    // content architecture — blur cascade
  };

  function clear() {
    clearTimeout(run._t);
    els.forEach(function (e) {
      e.classList.add('en');            // re-arm after a previous cleanup
      e.classList.remove('in');
      e.style.transitionDelay = '';
    });
  }

  function run() {
    var opt = document.documentElement.getAttribute('data-anim');
    if (!opt || opt === '0') { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var p = PLAN[opt] || PLAN['2'];
    clear();
    // force a reflow so the reset is committed before the transition starts
    void sol.offsetHeight;
    var headCount = 3, i = 0, d = 0;
    els.forEach(function (e, idx) {
      var isCopy = idx >= headCount && idx % 2 === 0; // card copy sits after its card
      if (idx < headCount) {
        d = idx * (p.head || p.step);
      } else {
        var cardIdx = Math.floor((idx - headCount) / 2);
        d = (p.head ? headCount * p.head : headCount * p.step) + cardIdx * p.step + (isCopy ? p.copy : 0);
      }
      e.style.transitionDelay = d + 'ms';
      requestAnimationFrame(function () { requestAnimationFrame(function () { e.classList.add('in'); }); });
    });
    
    var settle = d + 1400;
    clearTimeout(run._t);
    run._t = setTimeout(function () {
      els.forEach(function (e) {
        e.style.transitionDelay = '';
        e.classList.remove('en');
        e.classList.remove('in');
      });
    }, settle);
  }

  
  var fired = false;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting && !fired) { fired = true; run(); }
    });
  }, { threshold: 0.25 });
  io.observe(sol);

  window.__entrance = {
    set: function (opt) {
      document.documentElement.setAttribute('data-anim', String(opt));
      fired = true;
      sol.scrollIntoView({ block: 'start' });
      setTimeout(run, 60);
    },
    replay: function () { fired = true; clear(); setTimeout(run, 60); }
  };

  
  if (sol.getBoundingClientRect().top < innerHeight) { fired = true; run(); }
})();
