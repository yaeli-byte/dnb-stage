
(function () {
  var ARROWS = "<svg class=\"arw a\" viewBox=\"0 0 20.6356 20.5633\" aria-hidden=\"true\"><circle cx=\"5.4369\" cy=\"1.7250\" r=\"1.225\" style=\"--i:6\"/><circle cx=\"12.1744\" cy=\"1.7250\" r=\"1.225\" style=\"--i:2\"/><circle cx=\"18.9105\" cy=\"1.7250\" r=\"1.225\" style=\"--i:0\"/><circle cx=\"18.9106\" cy=\"8.4633\" r=\"1.225\" style=\"--i:1\"/><circle cx=\"18.9106\" cy=\"15.2016\" r=\"1.225\" style=\"--i:4\"/><circle cx=\"12.1745\" cy=\"8.4633\" r=\"1.225\" style=\"--i:5\"/><circle cx=\"15.2492\" cy=\"5.3149\" r=\"1.225\" style=\"--i:3\"/><circle cx=\"8.7810\" cy=\"11.7797\" r=\"1.225\" style=\"--i:7\"/><circle cx=\"1.7250\" cy=\"18.8383\" r=\"1.225\" style=\"--i:9\"/><circle cx=\"5.4370\" cy=\"15.1977\" r=\"1.225\" style=\"--i:8\"/></svg><svg class=\"arw b\" viewBox=\"0 0 20.6356 20.5633\" aria-hidden=\"true\"><circle cx=\"5.4369\" cy=\"1.7250\" r=\"1.225\" style=\"--i:6\"/><circle cx=\"12.1744\" cy=\"1.7250\" r=\"1.225\" style=\"--i:2\"/><circle cx=\"18.9105\" cy=\"1.7250\" r=\"1.225\" style=\"--i:0\"/><circle cx=\"18.9106\" cy=\"8.4633\" r=\"1.225\" style=\"--i:1\"/><circle cx=\"18.9106\" cy=\"15.2016\" r=\"1.225\" style=\"--i:4\"/><circle cx=\"12.1745\" cy=\"8.4633\" r=\"1.225\" style=\"--i:5\"/><circle cx=\"15.2492\" cy=\"5.3149\" r=\"1.225\" style=\"--i:3\"/><circle cx=\"8.7810\" cy=\"11.7797\" r=\"1.225\" style=\"--i:7\"/><circle cx=\"1.7250\" cy=\"18.8383\" r=\"1.225\" style=\"--i:9\"/><circle cx=\"5.4370\" cy=\"15.1977\" r=\"1.225\" style=\"--i:8\"/></svg>";
  function up(t) {
    if (t.querySelector('.arw')) return;              
    var i = t.querySelector('i');
    
    if (i) {
      var cs = getComputedStyle(i);
      var ink = cs.backgroundColor;
      if (!ink || ink === 'transparent' || ink === 'rgba(0, 0, 0, 0)') ink = cs.color;
      t.style.setProperty('--gsq-ink', ink || '#333');
      i.remove();
    }
    t.insertAdjacentHTML('beforeend', ARROWS);
  }
  function scan(root) {
    [].forEach.call((root || document).querySelectorAll('.dnb-tile, .gsq, .go, .arrow-tile'), up);
  }
  scan(document);
  
  new MutationObserver(function (rs) {
    rs.forEach(function (r) {
      [].forEach.call(r.addedNodes, function (n) {
        if (n.nodeType === 1) scan(n.querySelectorAll ? n : document);
      });
    });
  }).observe(document.documentElement, {childList: true, subtree: true});
})();
