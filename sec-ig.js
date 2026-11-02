
window.DNB_INTEGRATIONS = [
  { name: 'Salesforce',   logo: 'fig/ig/salesforce.svg' },
  { name: 'SAP',          logo: 'fig/ig/sap.svg' },
  { name: 'HubSpot',      logo: 'fig/ig/hubspot.svg' },
  { name: 'monday.com',   logo: 'fig/ig/monday.svg' },
  { name: 'Snowflake',    logo: 'fig/ig/snowflake.svg' },
  { name: 'Oracle',       logo: 'fig/ig/oracle.svg' },
  { name: 'Zapier',       logo: 'fig/ig/zapier.svg' },
  { name: 'Power BI',     logo: 'fig/ig/power-bi.svg' }
];

window.DNB_INTEGRATIONS_SPARE = [
  { name: 'Dynamics 365', logo: 'fig/ig/dynamics-365.svg' },
  { name: 'Tableau',      logo: 'fig/ig/tableau.svg' },
  { name: 'Databricks',   logo: 'fig/ig/databricks.svg' },
  { name: 'Slack',        logo: 'fig/ig/slack.svg' }
];


(function () {
  function tileHTML(it, hidden) {
    return '<li class="ig__tile"' + (hidden ? ' aria-hidden="true"' : '') + '>' +
      '<img class="ig__logo" src="' + it.logo + '" alt="" loading="lazy" decoding="async">' +
      '<span class="ig__name">' + it.name + '</span></li>';
  }
  function rowsFor(n, cap) { return n <= cap ? [n] : [Math.ceil(n / 2), Math.floor(n / 2)]; }

  function renderStatic(list, cap) {
    const rows = rowsFor(list.length, cap);
    let k = 0, html = '';
    rows.forEach(r => { html += '<ul class="ig__row" role="list">' + list.slice(k, k + r).map(it => tileHTML(it)).join('') + '</ul>'; k += r; });
    const even = rows.length === 2 && rows[0] === rows[1];
    return '<div class="ig__static' + (even ? ' is-even' : '') + '">' + html + '</div>';
  }

  function renderDrift(list, tile, gap, width) {
    const a = list.slice(0, Math.ceil(list.length / 2)), b = list.slice(Math.ceil(list.length / 2));
    // repeat the list until ONE cycle is wider than the column (+2 tiles), then double it so translateX(-50%) loops seamlessly
    const need = Math.ceil((width + 2 * (tile + gap)) / (tile + gap));
    const track = (L, dir) => {
      const reps = Math.ceil(need / L.length);
      let cyc = []; for (let r = 0; r < reps; r++) cyc = cyc.concat(L.map((it, i) => [it, r > 0]));
      const both = cyc.concat(cyc.map(([it]) => [it, true]));
      return '<ul class="ig__track ig__track--' + dir + '" role="list">' + both.map(([it, hid]) => tileHTML(it, hid)).join('') + '</ul>';
    };
    return '<div class="ig__drift">' + track(a, 'l') + track(b, 'r') + '</div>';
  }

  function render(section, list) {
    const mount = section.querySelector('[data-ig-tiles]');
    const mobile = section.getBoundingClientRect().width < 768;
    section.setAttribute('data-mode', mobile ? 'm' : 'd');
    const cap = mobile ? 4 : 5, max = cap * 2, tile = mobile ? 78 : 99, gap = mobile ? 10 : 12;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const key = (mobile ? 'm' : 'd') + list.length + (reduce ? 'r' : '');
    if (mount.dataset.key === key) return;
    mount.dataset.key = key;
    if (list.length <= max) mount.innerHTML = renderStatic(list, cap);
    else if (reduce) mount.innerHTML = renderStatic(list.slice(0, max), cap);
    else mount.innerHTML = renderDrift(list, tile, gap, mount.getBoundingClientRect().width || (mobile ? 390 : 640));
  }

  window.DnbIntegrations = {
    mount(section, list) {
      render(section, list);
      if ('ResizeObserver' in window) new ResizeObserver(() => render(section, list)).observe(section);
      window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', () => { section.querySelector('[data-ig-tiles]').dataset.key = ''; render(section, list); });
    },
    render
  };
})();


(function () {
  function go() {
    var q = /[?&]ign=(\d+)/.exec(location.search), list = window.DNB_INTEGRATIONS;
    if (q) { var all = list.concat(window.DNB_INTEGRATIONS_SPARE); list = all.slice(0, Math.max(1, Math.min(12, +q[1]))); }
    [].forEach.call(document.querySelectorAll('section.ig[data-t="integrations"]'), function (s) { window.DnbIntegrations.mount(s, list); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
})();
