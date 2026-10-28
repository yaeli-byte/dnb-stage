
(function () {
  var v = (/[?&]hiws=(on|off)/.exec(location.search) || [])[1];
  if (v) document.documentElement.setAttribute('data-hiws', v);
})();