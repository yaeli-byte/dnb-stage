const DATA = [{"code": "C14", "title": "Score gauge", "y": 4, "col": 0, "intro": "A labelled score on a a-to-b gradient rail, with a marker at the value. It arrived with the client's solution page v2 and had no equivalent in the system; Yael's call, 2026-09-27, was to adopt it as a COMPONENT rather than flatten it into the existing scale.", "blocks": [["p", "M3 equivalent — — (no M3 equivalent)"], ["h4", "ANATOMY & MEASUREMENTS"], ["t", [300, 724], [["Label", "10/14 Heebo 500 · on-surface-variant #6B7885"], ["Figure", "22/28 Space Grotesk 300 · on-surface #26333D"], ["Figure, bad score", "22/28 Space Grotesk 300 · error #AF2D1D"], ["Rail", "full-width, radius 999, a two-stop gradient reading good → bad"], ["Marker", "a 1px tick at the value, full height of the rail"], ["Plate", "#E8ECEF, radius 12, the card's own inset hairline"]]], ["h4", "STATES"], ["st", [["Rest", "—", "—", "—", "—", "live"], ["Bad score", "the FIGURE takes the error role; the rail is unchanged", "—", "—", "—", "live"], ["No value", "not designed — a gauge with no score has no drawn state", "—", "—", "—", "proposed"]]], ["p", "WHY IT IS A COMPONENT AND NOT A DEVIATION. Its 10px label and 22px Space Grotesk figure are both off the type scale, and that is legitimate for the same reason 11.19 is legitimate on the data chip and 13.3 on the button label: they are a component's own internal dimensions, not text styles anyone may reach for. Registering them here is what makes them checkable."], ["p", "BUT ITS COLOUR CONSUMES THE SYSTEM'S ROLES. As shipped it carried a violet #5E5E86 with no role behind it, and a red #F10000 that duplicated a role the system ALREADY had. A component may define its own geometry and type; forking the palette is how a system drifts. The violet became on-surface-variant, and the red became the error family — which is also what it means: a bad score is the error role, not a new red."], ["p", "22px Space Grotesk is the system's FIRST small statistic figure. The scale had only 108.3, the display figure. If another small stat appears, it takes this size rather than a new one."], ["p", "The three instances on the solution page are the only ones; the homepage has no gauge."]]}, {"code": "C15", "title": "Page sections · shared", "y": 0, "col": 0, "row_of": "C12", "intro": "The nine sections every page is assembled from. The system documented thirteen ATOMS and not one SECTION, so the thing a new page is actually built out of had no entry, no measured size and no ground — which is the measured source of the recurring note that a section was \"not taken 1:1 from the homepage\": there was nothing to take it 1:1 from. A page writes <div data-home=\"…\"> and passes copy as JSON; anything it does not name keeps the homepage’s own text.", "blocks": [["h4", "THE NINE, MEASURED AT 1440"], ["t", [110, 170, 90, 100, 90, 110, 70], [["hdr", "Top app bar", "79.66", "44 / 43", "18 / 18", "#FCFDFE", "7"], ["crumb", "Breadcrumb", "40", "43 / 100", "0 / 0", "transparent", "7"], ["trust", "Client logo strip", "258.2", "60 / 60", "46 / 60", "transparent", "6"], ["statsw", "Numbers strip", "688.2", "59.88 / 59.88", "80 / 80", "transparent", "2"], ["guides", "Articles · 3 cards", "983", "60 / 60", "80 / 80", "transparent", "6"], ["ctaw", "Promo band", "619", "0 / 0", "0 / 0", "transparent", "7"], ["tst", "Quotes carousel", "898", "60 / 60", "80 / 80", "#FCFCFC", "5"], ["faq", "FAQ + footer", "2323.58", "0 / 0", "0 / 0", "#F3F5F7", "7"], ["fb", "Footer", "1254.51", "60 / 60", "0 / 30", "#071620", "7"]]], ["h4", "WHAT EACH ONE WILL CATCH YOU OUT ON"], ["t", [150, 700], [["Top app bar", "Lifted from index.html by tools/lifthdr.py so it cannot be retyped. Nav CENTRED between the button block and the logo; content runs 44 → 1397."], ["Breadcrumb", "⚠ ITS READING EDGE IS THE LOGO'S. Measured: first item right edge 1393 = logo right edge 1393, Δ0. Mobile is 32 (40 × .8) at inset 20. Takes its trail from a child <script type=\"application/json\"> — a wrong shape means the component REMOVES ITSELF."], ["Client logo strip", "A band, not a section — that is why its padding is 46/60 and not 80/80. Three clone sets drift left at ~30px/s over 44s; the row is masked at the edges, not overlaid."], ["Numbers strip", "The 108.3 Space Grotesk figure is the design — the scale contrast IS the identity. ⚠ Its real box is #stats INSIDE #statsw; capping the outer section does nothing."], ["Articles · 3 cards", "⚠ 983, not 963 — the 20 is --gapx, the client's 56px block gap. A page with no #frame falls back to 0 and silently ships the PRE-decision 46. The head is a ROW that bottom-aligns; the card is height:auto with min-height 118 and a 3-line clamp."], ["Promo band", "Dark ground + the 48px dot field at 78% white. Its three data chips animate ONE AT A TIME — a 136px bubble is far louder than a 22px disc."], ["Quotes carousel", "Uses the LARGE block gap (90), the one named exception. The row is 2161 wide inside a 1327 box and the canvas clips it — that overflow is what makes card 2 peek in."], ["FAQ + footer", "⚠ THE FAQ CARRIES THE FOOTER — #fb is absolutely placed inside #faq's reserved height, so #faq must be LAST on the page. Opening a row pushes the footer via --faqx."], ["Footer", "Mountable alone with .standalone, which drops the absolute placement #faq gives it. The contact panel is a lighter #39454D card OVERLAPPING the footer by 28 — the separation is a GROUND CHANGE, not a rule."]]], ["h4", "THE HEIGHT IS THE CHECK"], ["p", "Every height above is identical on every page that mounts the section. If one page differs, that page is styling a shared component and tools/compguard.py should be failing — that is exactly how type-mobile.css came to carry ~20 rules reaching inside #statsw, #guides and #fb, and why the lobby and the homepage rendered the same component two different ways."], ["h4", "⚠ THE INSET TOKEN SAYS 100 AND THE SECTIONS SAY 60"], ["p", "S9 Spacing documents section-inset-inline as 100, and that is what the page-type sections use (product blocks, more products, solution families, media hero). But the SHARED sections measure 60 — trust, statsw, guides, tst and the footer all sit at 60 / 59.88, and the header at 44 / 43 because it is the frame’s own gutter. So the site runs FIVE inset values: 100 (page sections) · 60 (shared sections) · 56 (challenge cards) · 42 (heroes, the frame’s) · 0 (sections that inset via an inner .wrap instead). Four of the five are explicable; what is not written down anywhere is WHICH a new section should take. Recorded, not corrected — the live build is the truth."], ["tag", "gap", "HERS TO RULE ON: does a new shared section take 100 like a page section, or 60 like the sections it will sit between? Today the answer depends on which file a developer copies from, which is the condition this topic exists to end."], ["tag", "ok", "Added 2026-10-07 from the eight built pages, measured on the staged build."]]}, {"code": "C16", "title": "Section patterns", "y": 0, "col": 0, "row_of": "C12", "intro": "Seventeen section ARCHETYPES the page builds added — layouts, not components. The point of listing them is that a new page picks one instead of inventing an eighteenth, and that each is named by WHAT IT DOES rather than by the page it first appeared on. The homepage has nine sections and nine different organising principles; exactly one is a row of cards, and that ratio is the thing to protect.", "blocks": [["h4", "THE ARCHETYPES, MEASURED AT 1440"], ["t", [230, 120, 90, 150, 100, 100], [["Split hero · copy + live visual", "family · growth", "650", "#FCFDFE", "100", "80 / 80"], ["Canvas hero · full-bleed art", "lobby", "710", "#FCFDFE", "42", "0 / 0"], ["Mock hero · product shot", "industry", "680", "transparent", "42", "0 / 0"], ["Media hero · solution", "solution · mkt", "724", "#FCFDFE", "100", "80 / 80"], ["Benefit grid · 3/4/5/6 up", "sol · mkt · prd", "650–811", "#FCFDFE / #222A30", "100", "80 / 80"], ["Standards strip · seals", "sol · mkt · prd", "423.6", "#F3F5F7", "0 (card 1240)", "80 / 80"], ["How it works · 3 steps", "product · growth", "772.7", "#F3F5F7", "0", "80 / 80"], ["Comparison table", "marketing", "634", "#FCFDFE", "0", "80 / 80"], ["Product blocks · tabbed", "solution · mkt", "973.4", "#F6F8FA", "100", "80 / 80"], ["Feature tabs · 5 panels", "product", "—", "#FCFDFE", "100", "80 / 80"], ["More products · 2 cards", "product", "554.7", "#FCFDFE", "100", "80 / 72"], ["Sector grid · 9 cards", "lobby", "1864.2", "transparent", "0 (1352)", "80 / 80"], ["Challenge cards · 3 up", "industry", "738.5", "#FCFDFE", "56", "24 / 80"], ["Solution families · accordion", "industry", "2184.2", "#FCFDFE", "100", "112 / 104"], ["Proof · single quote", "industry", "579.9", "transparent", "0 (1352)", "80 / 80"], ["Video · 16:9 frame", "product", "1058", "#222A30", "100", "80 / 80"], ["About · value rows", "growth", "621.4", "#FCFDFE", "100", "80 / 80"]]], ["h4", "THE ORGANISING PRINCIPLE — THIS IS THE PART THAT MATTERS"], ["t", [230, 620], [["Split hero · copy + live visual", "Copy right, an animated dashboard card left, on one screen. Header+hero 1172 → 702."], ["Canvas hero · full-bleed art", "A fixed 1440 composition with absolutely-placed children; it does not reflow and needs its own mobile layout rather than a CSS override."], ["Mock hero · product shot", "A clipped 555.72 × 550.44 panel at radius 48 holding a 664 × 658 photo at −54.28 / −53.74."], ["Media hero · solution", "Copy beside a 571 × 450 UI illustration that animates. Re-used verbatim on the family panel at scale .74 — a cropped dashboard reads as broken, a scaled one as a smaller one."], ["Benefit grid · 3/4/5/6 up", "THE CARD COUNT IS THE LAYOUT: 3 → head on top and centred, one row. 4/5 → head beside a 2×2 grid. 6 → two rows of three. Dark is the default; opt out with data-benefits=\"light\"."], ["Standards strip · seals", "A white card at radius 16 on the next step down the grey ramp. ⚠ Its H2 is 34/40.8, the documented .marks-h2 carve-out — do NOT pull it to 48. Placement refuses to sit directly after a trust strip and moves above it."], ["How it works · 3 steps", "Three panels carrying the continuity in a row. Card→title 30, title→text 21, body margin 15."], ["Comparison table", "Columns are comparable by construction; it sits AFTER the products, not after how-it-works."], ["Product blocks · tabbed", "A tab strip switching .ns-prod-block rows — NOT role=tabpanel, so a tabpanel count of 0 is not a defect. The panel is align-items:start, never center."], ["Feature tabs · 5 panels", "Five labelled scenes, one per feature. A tab with no scene shows a FLAGGED SLOT naming the feature — never another feature's artwork."], ["More products · 2 cards", "Card 154 tall at radius 14 on the .957 hairline; visual 176 × 118 at radius 10. ⚠ Its title is 38/44 w500 — the client's own 30/09 spec, a second documented carve-out."], ["Sector grid · 9 cards", "A straight grid: equal cards, one photo size (340), rows pinned at 500 so all nine line up. ⚠ DELIBERATELY OVERRIDES THE FRAME, which indents the columns 112/0/56."], ["Challenge cards · 3 up", "⚠ IN RTL THE FIRST DOM CHILD RENDERS RIGHTMOST — the frame reads right→left and the build read the opposite. Icons must all come from ONE 24×24 set."], ["Solution families · accordion", "One family open at a time, the open row on rgba(255,255,255,.4) with 16px sides."], ["Proof · single quote", "ONE quote in a card, not the homepage's three. .quote1 + .on-dark; the CARD is the band."], ["Video · 16:9 frame", "A 1346 × 757 frame at radius 12 on #071620, poster carrying the promo band's own dot field."], ["About · value rows", "Lede 17/25, row title 20/26, the .957 hairline, radius 12."]]], ["tag", "ok", "⚠ TWO PATTERNS CARRY A DOCUMENTED TYPE CARVE-OUT and must not be pulled to the 48/54 site heading: the standards strip at 34/40.8 (.marks-h2) and more-products at 38/44 w500, which is the client’s own 30/09 spec."]]}, {"code": "S11", "title": "Section grounds", "y": 0, "col": 0, "row_of": "S1", "intro": "What the section BEHIND a card is painted. S7 Surfaces describes what a CARD is made of; this ramp was never written down separately, and measuring it found two values sitting outside it.", "blocks": [["h4", "THE RAMP IN USE"], ["t", [120, 250, 320, 160], [["#FCFDFE", "paper — the page default", "hero · benefits · solutions · more · compare · about", "on the ramp"], ["#F6F8FA", "surface-1 — one step down", "product blocks", "on the ramp"], ["#F3F5F7", "surface-2 — two steps down", "FAQ · standards · how it works", "on the ramp"], ["#222A30", "dark band", "benefits (dark) · video", "on the ramp"], ["#071620", "black teal — the footer only", "footer", "on the ramp"], ["#FCFCFC", "⚠ OFF THE RAMP — quotes", "tst", "0.4 of a step from paper; it reads as paper and is probably meant to be it"], ["#F5F5F5", "⚠ OFF THE RAMP — industries", "#ind", "a neutral grey, not a member of the blue-tinted ramp"]]], ["tag", "gap", "⚠ TWO ARE OFF THE RAMP AND ARE HERS TO RULE ON. #FCFCFC on the quotes section is 0.4 of a step from paper and reads as paper. #F5F5F5 on the industries section is a neutral grey, not a member of the blue-tinted ramp — every other ground here carries the same hue. Neither is corrected: the live build is the truth until she decides."]]}, {"code": "B5", "title": "Page templates", "y": 0, "col": 0, "row_of": "B1", "intro": "What each page type is made of, in order — so a new page of a known type starts from the sections that type already uses rather than from a blank file.", "blocks": [["h4", "THE SIX PAGE TYPES"], ["t", [180, 670], [["Homepage", "hero · trust · statsw · solutions · guides · industries · ctaw · tst · faq(+fb)"], ["Industries lobby", "hdr · crumb · canvas hero · statsw · sector grid · guides · ctaw · faq(+fb)"], ["Industry page", "hdr · crumb · mock hero · intro · challenge cards · solution families · proof · trust · guides · ctaw · faq(+fb)"], ["Solution family", "hdr · crumb · split hero · about · solutions · benefits · trust · tst · guides · ctaw · faq(+fb)"], ["Solution page", "hdr · crumb · media hero · product blocks · benefits · standards · trust · tst · guides · ctaw · faq(+fb)"], ["Product page", "hdr · crumb · media hero · trust · feature tabs · video · how it works · benefits · standards · more products · tst · ctaw · faq(+fb)"]]], ["tag", "ok", "⚠ #faq CARRIES THE FOOTER, so it is ALWAYS LAST. A section placed after it renders above the footer’s reserved height — that is the round-28 failure where \"more products below the FAQ\" was tried three ways and reverted."]]}];

const W=1080;
const rgb=h=>({r:parseInt(h.slice(1,3),16)/255,g:parseInt(h.slice(3,5),16)/255,b:parseInt(h.slice(5,7),16)/255});
const solid=(h,o)=>[{type:'SOLID',color:rgb(h),opacity:o===undefined?1:o}];
const F=(n,w,h)=>{const f=figma.createFrame();f.name=n;f.resize(w,h);f.fills=[];f.clipsContent=false;return f};
const V=(f,g,a)=>{f.layoutMode='VERTICAL';f.primaryAxisSizingMode='AUTO';f.itemSpacing=g||0;if(a)f.counterAxisAlignItems=a;return f};
const HZ=(f,g,a)=>{f.layoutMode='HORIZONTAL';f.primaryAxisSizingMode='AUTO';f.counterAxisSizingMode='AUTO';f.itemSpacing=g||0;if(a)f.counterAxisAlignItems=a;return f};
function TX(c,size,lh,style,color,o){o=o||{};
  const t=figma.createText(); t.fontName={family:o.fam||'Inter',style}; t.characters=String(c);
  t.fontSize=size; t.lineHeight={unit:'PIXELS',value:lh}; t.fills=solid(color);
  t.textAlignHorizontal=o.align||'LEFT';
  if(o.ls!==undefined)t.letterSpacing={unit:'PIXELS',value:o.ls}; return t;}
const HE=s=>/[֐-׿]/.test(String(s));
const gap=(p,n)=>{const g=F('· '+n,W,n); p.appendChild(g); g.layoutSizingHorizontal='FILL'; return g};
function h4(p,txt){
  const w=F('§ '+txt,W,10); V(w,0); p.appendChild(w); w.layoutSizingHorizontal='FILL';
  w.paddingTop=10; w.paddingBottom=14;
  w.strokes=[{type:'SOLID',color:{r:0,g:0,b:0},opacity:0.14}];
  w.strokeAlign='INSIDE'; w.strokeTopWeight=1; w.strokeBottomWeight=0; w.strokeLeftWeight=0; w.strokeRightWeight=0;
  const t=TX(txt,13,20,'Semi Bold','#0083a1',{ls:1.1}); w.appendChild(t); t.layoutSizingHorizontal='FILL';}
function para(p,txt){const t=TX(txt,14,22,'Regular','#64727c'); p.appendChild(t); t.layoutSizingHorizontal='FILL'; gap(p,4);}
function head(rr,cols,labels){
  rr.paddingBottom=9;
  rr.strokes=[{type:'SOLID',color:{r:0,g:0,b:0},opacity:0.18}];
  rr.strokeAlign='INSIDE'; rr.strokeTopWeight=0; rr.strokeBottomWeight=1; rr.strokeLeftWeight=0; rr.strokeRightWeight=0;
  labels.forEach((l,i)=>{const x=TX(l,11,17,'Semi Bold','#64727c',{ls:.7});
    rr.appendChild(x); x.layoutSizingHorizontal='FIXED'; x.resize(cols[i],17);});}
function rowShell(t){
  const rr=F('row',W,10); HZ(rr,0,'MIN'); t.appendChild(rr); rr.layoutSizingHorizontal='FILL';
  rr.paddingTop=9; rr.paddingBottom=9;
  rr.strokes=[{type:'SOLID',color:{r:0,g:0,b:0},opacity:0.07}];
  rr.strokeAlign='INSIDE'; rr.strokeTopWeight=0; rr.strokeBottomWeight=1; rr.strokeLeftWeight=0; rr.strokeRightWeight=0;
  return rr;}
function table(p,cols,rows,labels){
  const t=F('table',W,10); V(t,0); p.appendChild(t); t.layoutSizingHorizontal='FILL';
  const hr=F('head',W,10); HZ(hr,0,'MIN'); t.appendChild(hr); hr.layoutSizingHorizontal='FILL';
  head(hr,cols,labels||cols.map((_,i)=>['ITEM','VALUE','NOTE','','',''][i]||''));
  rows.forEach(r=>{const rr=rowShell(t);
    r.forEach((cell,i)=>{const he=HE(cell);
      const x=TX(cell,13,20,i===0?'Medium':'Regular',i===0?'#26333d':'#64727c',{fam:he?'Heebo':'Inter'});
      if(he)x.textAlignHorizontal='RIGHT';
      rr.appendChild(x); x.layoutSizingHorizontal='FIXED'; x.resize(cols[i],x.height);});});
  gap(p,4);}
function swatches(p,cols,rows){
  const t=F('table',W,10); V(t,0); p.appendChild(t); t.layoutSizingHorizontal='FILL';
  const hr=F('head',W,10); HZ(hr,0,'MIN'); t.appendChild(hr); hr.layoutSizingHorizontal='FILL';
  head(hr,cols,['TOKEN','VALUE','WHERE']);
  rows.forEach(([lab,hex,note])=>{const rr=rowShell(t);
    const a=TX(lab,13,20,'Medium','#26333d'); rr.appendChild(a); a.layoutSizingHorizontal='FIXED'; a.resize(cols[0],a.height);
    const c=F('c',cols[1],22); HZ(c,9,'CENTER'); rr.appendChild(c); c.layoutSizingHorizontal='FIXED'; c.resize(cols[1],22);
    const chip=figma.createRectangle(); chip.name=hex; chip.resize(22,22); chip.cornerRadius=5; chip.fills=solid(hex);
    chip.strokes=[{type:'SOLID',color:{r:0,g:0,b:0},opacity:0.1}]; chip.strokeWeight=1; chip.strokeAlign='INSIDE';
    c.appendChild(chip);
    const lb=TX(hex,12,18,'Medium','#26333d'); c.appendChild(lb); lb.layoutSizingHorizontal='HUG';
    const n=TX(note||'',13,20,'Regular','#64727c'); rr.appendChild(n); n.layoutSizingHorizontal='FIXED'; n.resize(cols[2],n.height);});
  gap(p,4);}
function states(p,rows){
  const cols=[170,250,230,220,80,110];
  const t=F('states',W,10); V(t,0); p.appendChild(t); t.layoutSizingHorizontal='FILL';
  const hr=F('head',W,10); HZ(hr,0,'MIN'); t.appendChild(hr); hr.layoutSizingHorizontal='FILL';
  head(hr,cols,['STATE','CONTAINER','CONTENT','OUTLINE','MS','SOURCE']);
  rows.forEach(r=>{const rr=rowShell(t);
    for(let i=0;i<5;i++){const he=HE(r[i]);
      const x=TX(r[i],13,20,i===0?'Medium':'Regular',i===0?'#26333d':'#64727c',{fam:he?'Heebo':'Inter'});
      rr.appendChild(x); x.layoutSizingHorizontal='FIXED'; x.resize(cols[i],x.height);}
    const live=r[5]==='live';
    const pil=F('pill',110,20); HZ(pil,0,'CENTER'); rr.appendChild(pil);
    pil.layoutSizingHorizontal='FIXED'; pil.resize(cols[5],20);
    const b=F('b',10,20); HZ(b,0,'CENTER'); b.paddingLeft=8; b.paddingRight=8; b.paddingTop=2; b.paddingBottom=2;
    b.cornerRadius=999; b.fills=solid(live?'#e7f6ee':'#e8f2fd'); pil.appendChild(b);
    const t2=TX(live?'measured':'proposed',10,16,'Semi Bold',live?'#1e7d4f':'#1f6fb8',{ls:.6});
    b.appendChild(t2); t2.layoutSizingHorizontal='HUG';});
  gap(p,4);}
function tag(p,kind,txt){
  const C={gap:['#fff4f4','#ffd9d9','#c0392b','#8c3b31','GAP'],
           prop:['#f2f8ff','#d6e8fb','#1f6fb8','#2c5f8a','PROPOSED'],
           ok:['#f3fbf6','#d5efe0','#1e7d4f','#2b6b4b','CORRECTED']}[kind];
  const w=F(kind,W,10); HZ(w,10,'MIN'); p.appendChild(w); w.layoutSizingHorizontal='FILL';
  w.paddingTop=12; w.paddingBottom=12; w.paddingLeft=14; w.paddingRight=14;
  w.cornerRadius=8; w.fills=solid(C[0]);
  w.strokes=solid(C[1]); w.strokeWeight=1; w.strokeAlign='INSIDE';
  const b=TX(C[4],10,16,'Semi Bold',C[2],{ls:1}); w.appendChild(b); b.layoutSizingHorizontal='FIXED'; b.resize(72,16);
  const t=TX(txt,13,20,'Regular',C[3]); w.appendChild(t); t.layoutGrow=1; gap(p,6);}
function radii(p,items){
  const r=F('radii',W,10); HZ(r,12,'MIN'); p.appendChild(r); r.layoutSizingHorizontal='FILL';
  items.forEach(([n,v])=>{const cell=F(n,100,10); V(cell,8,'CENTER'); r.appendChild(cell); cell.layoutGrow=1;
    const sq=figma.createRectangle(); sq.name=n; sq.resize(100,76); sq.cornerRadius=Math.min(v,38);
    sq.fills=solid('#eef2f5');
    sq.strokes=[{type:'SOLID',color:rgb('#0083a1'),opacity:0.45}]; sq.strokeWeight=1.5; sq.strokeAlign='INSIDE';
    cell.appendChild(sq); sq.layoutSizingHorizontal='FILL';
    const l=TX(n,11,16,'Semi Bold','#26333d',{align:'CENTER'}); cell.appendChild(l); l.layoutSizingHorizontal='FILL';
    const x=TX(v===999?'full':String(v),11,16,'Medium','#0083a1',{align:'CENTER'}); cell.appendChild(x); x.layoutSizingHorizontal='FILL';});
  gap(p,8);}
function typeScale(p,items){
  items.forEach(([n,fam,wt,size,lh,ls,use])=>{
    const r=F('type · '+n,W,10); HZ(r,26,'CENTER'); p.appendChild(r); r.layoutSizingHorizontal='FILL';
    r.paddingTop=16; r.paddingBottom=16;
    r.strokes=[{type:'SOLID',color:{r:0,g:0,b:0},opacity:0.07}];
    r.strokeAlign='INSIDE'; r.strokeTopWeight=0; r.strokeBottomWeight=1; r.strokeLeftWeight=0; r.strokeRightWeight=0;
    const px=Math.min(size,52), k=px/size;
    const sp=F('specimen',480,10); V(sp,0); r.appendChild(sp); sp.layoutSizingHorizontal='FIXED'; sp.resize(480,10);
    const style = wt>=500 ? (fam==='Space Grotesk'?'Light':'Medium') : (fam==='Space Grotesk'?'Light':'Regular');
    const demo = n==='stat-figure' ? '620M' : 'מידע שמעניק לכם ערך';
    const t=TX(demo,px,lh*k,style,'#000000',{fam:fam,align:'RIGHT'}); sp.appendChild(t); t.layoutSizingHorizontal='FILL';
    const m=F('meta',540,10); V(m,3); r.appendChild(m); m.layoutGrow=1;
    const a=TX('dnb.sys.typescale.'+n,14,20,'Semi Bold','#000000'); m.appendChild(a); a.layoutSizingHorizontal='FILL';
    const b=TX(fam+' '+wt+'  ·  '+size+' / '+lh+(ls?('  ·  tracking '+ls):''),12,18,'Medium','#0083a1');
    m.appendChild(b); b.layoutSizingHorizontal='FILL';
    const c=TX(use,12,18,'Regular','#9fb0bd'); m.appendChild(c); c.layoutSizingHorizontal='FILL';});
  gap(p,8);}
function swBig(p,groups){
  groups.forEach(([label,items])=>{
    if(!items.length) return;
    const lb=TX(label,11,17,'Semi Bold','#9fb0bd',{ls:1}); p.appendChild(lb);
    lb.layoutSizingHorizontal='FILL'; gap(p,8);
    for(let i=0;i<items.length;i+=6){
      const r=F('row',W,10); HZ(r,10,'MIN'); p.appendChild(r); r.layoutSizingHorizontal='FILL';
      const chunk=items.slice(i,i+6);
      chunk.forEach(([name,token,hex])=>{
        const cell=F(name,160,10); V(cell,0); r.appendChild(cell); cell.layoutGrow=1;
        cell.cornerRadius=12; cell.clipsContent=true; cell.fills=solid('#ffffff');
        cell.strokes=[{type:'SOLID',color:{r:0,g:0,b:0},opacity:0.08}]; cell.strokeWeight=1; cell.strokeAlign='INSIDE';
        const sq=F('chip',160,104); V(sq,0); sq.fills=solid(hex);
        sq.paddingLeft=12; sq.paddingBottom=10; sq.primaryAxisAlignItems='MAX';
        cell.appendChild(sq); sq.layoutSizingHorizontal='FILL';
        sq.layoutSizingVertical='FIXED'; sq.resize(sq.width,104);
        const c=rgb(hex), lum=0.2126*c.r+0.7152*c.g+0.0722*c.b;
        const hx=TX(hex,13,18,'Semi Bold',lum>0.42?'#000000':'#ffffff'); sq.appendChild(hx); hx.layoutSizingHorizontal='FILL';
        const cap=F('cap',160,10); V(cap,2); cap.paddingLeft=12; cap.paddingRight=12; cap.paddingTop=9; cap.paddingBottom=12;
        cell.appendChild(cap); cap.layoutSizingHorizontal='FILL';
        const a=TX(name,12,17,'Medium','#26333d'); cap.appendChild(a); a.layoutSizingHorizontal='FILL';
        const b=TX(token,11,16,'Regular','#9fb0bd'); cap.appendChild(b); b.layoutSizingHorizontal='FILL';});
      
      for(let k=chunk.length;k<6;k++){const sp=F('spacer',160,10); r.appendChild(sp); sp.layoutGrow=1;}
      gap(p,10);}
    gap(p,12);});
  gap(p,6);}
function btnStates(p){
  
  const D=[['Rest','#9eedfa','no filter',0],
           ['Hover','#9ae6f3','brightness(.97) · tone ≤4% · ≤1px',0],
           ['Pressed','#95ddea','brightness(.94) · tone ≤6%',0],
           ['Focus','#9eedfa','2px secondary ring, offset 3 — page-wide',1],
           ['Disabled','#dceff3','container .12 · content .38',0]];
  const r=F('button states',W,10); HZ(r,14,'MIN'); p.appendChild(r); r.layoutSizingHorizontal='FILL';
  D.forEach(([name,fill,note,ring])=>{
    const cell=F(name,190,10); V(cell,0,'CENTER'); r.appendChild(cell); cell.layoutGrow=1;
    cell.cornerRadius=14; cell.fills=solid('#f6f8fa');
    cell.strokes=[{type:'SOLID',color:{r:0,g:0,b:0},opacity:0.06}]; cell.strokeWeight=1; cell.strokeAlign='INSIDE';
    cell.paddingTop=28; cell.paddingBottom=18; cell.paddingLeft=14; cell.paddingRight=14;
    const btn=F('btn',150,44); HZ(btn,9,'CENTER'); cell.appendChild(btn);
    btn.cornerRadius=999; btn.fills=solid(fill);
    btn.strokes=[{type:'SOLID',color:rgb('#282834'),opacity:name==='Disabled'?0.38:1}];
    btn.strokeWeight=1; btn.strokeAlign='INSIDE';
    btn.paddingLeft=12; btn.paddingRight=18; btn.paddingTop=11; btn.paddingBottom=11;
    const dot=figma.createEllipse(); dot.resize(23,23); dot.fills=solid('#283032',name==='Disabled'?0.38:1);
    btn.appendChild(dot);
    const lb=TX('צרו קשר',15,20,'Medium','#283032',{fam:'Heebo'}); btn.appendChild(lb); lb.layoutSizingHorizontal='HUG';
    if(ring){btn.effects=[{type:'DROP_SHADOW',color:{r:0.36,g:0.80,b:0.91,a:1},offset:{x:0,y:0},
      radius:0,spread:3,visible:true,blendMode:'NORMAL'}];}
    const g2=F('g',10,18); cell.appendChild(g2); g2.layoutSizingHorizontal='FILL'; g2.resize(10,18);
    const t=TX(name,13,19,'Semi Bold','#26333d',{align:'CENTER'}); cell.appendChild(t); t.layoutSizingHorizontal='FILL';
    const n=TX(note,11,16,'Regular','#9fb0bd',{align:'CENTER'}); cell.appendChild(n); n.layoutSizingHorizontal='FILL';});
  gap(p,10);}
function surfPlates(p,items){
  for(let i=0;i<items.length;i+=3){
    const chunk=items.slice(i,i+3);
    const r=F('row',W,10); HZ(r,18,'MIN'); p.appendChild(r); r.layoutSizingHorizontal='FILL';
    chunk.forEach(([name,paints,rad,meta,where,hair])=>{
      const cell=F(name,300,10); V(cell,0); r.appendChild(cell); cell.layoutGrow=1;
      const pl=F('plate',300,196); pl.fills=paints; pl.cornerRadius=rad;
      if(hair){pl.strokes=[{type:'SOLID',color:rgb('#212121'),opacity:0.1}];
               pl.strokeWeight=0.957; pl.strokeAlign='INSIDE';}
      cell.appendChild(pl); pl.layoutSizingHorizontal='FILL';
      pl.layoutSizingVertical='FIXED'; pl.resize(pl.width,196);
      const g=F('g',10,12); cell.appendChild(g); g.layoutSizingHorizontal='FILL'; g.resize(10,12);
      const a=TX(name,14,20,'Semi Bold','#26333d'); cell.appendChild(a); a.layoutSizingHorizontal='FILL';
      const b=TX(meta,11.5,18,'Medium','#0083a1'); cell.appendChild(b); b.layoutSizingHorizontal='FILL';
      const c=TX(where||'',12,18,'Regular','#9fb0bd'); cell.appendChild(c); c.layoutSizingHorizontal='FILL';});
    for(let k=chunk.length;k<3;k++){const sp=F('spacer',300,10); r.appendChild(sp); sp.layoutGrow=1;}
    gap(p,20);}
  gap(p,6);}
function dotPlates(p,items){
  const PW=472, PH=236;
  for(let i=0;i<items.length;i+=2){
    const chunk=items.slice(i,i+2);
    const r=F('row',W,10); HZ(r,24,'MIN'); p.appendChild(r); r.layoutSizingHorizontal='FILL';
    chunk.forEach(([name,ground,period,col,r1,meta,where])=>{
      const cell=F(name,PW,10); V(cell,0); r.appendChild(cell); cell.layoutGrow=1;
      const pl=F('plate',PW,PH); pl.cornerRadius=12; pl.clipsContent=true; pl.fills=solid(ground);
      cell.appendChild(pl); pl.layoutSizingHorizontal='FIXED'; pl.resize(PW,PH);
      const nx=Math.ceil(PW/period)+1, ny=Math.ceil(PH/period)+1;
      for(let y=0;y<ny;y++) for(let x=0;x<nx;x++){
        const d=figma.createEllipse(); d.name='dot'; d.resize(r1*2,r1*2);
        d.x=x*period; d.y=y*period;
        d.fills=[{type:'SOLID',color:{r:col[0],g:col[1],b:col[2]},opacity:col[3]}];
        pl.appendChild(d);}
      const g=F('g',10,12); cell.appendChild(g); g.layoutSizingHorizontal='FILL'; g.resize(10,12);
      const a=TX(name,14,20,'Semi Bold','#26333d'); cell.appendChild(a); a.layoutSizingHorizontal='FILL';
      const b=TX(meta,11.5,18,'Medium','#0083a1'); cell.appendChild(b); b.layoutSizingHorizontal='FILL';
      const c=TX(where||'',12,18,'Regular','#9fb0bd'); cell.appendChild(c); c.layoutSizingHorizontal='FILL';});
    for(let k=chunk.length;k<2;k++){const sp=F('spacer',PW,10); r.appendChild(sp); sp.layoutGrow=1;}
    gap(p,22);}
  gap(p,6);}
function elevDemo(p){
  const el=F('elev',W,10); HZ(el,26,'MIN'); p.appendChild(el); el.layoutSizingHorizontal='FILL';
  [['hairline','inset 0 0 0 0.957px rgba(33,33,33,.1)',1,null],
   ['badge shadow','0 1.4px .35px rgba(0,0,0,.04)',0,{c:{r:0,g:0,b:0,a:0.04},o:{x:0,y:1.4},r:0.35}],
   ['card hover','0 2px 8px -4px rgba(11,46,56,.10)',0,{c:{r:0.043,g:0.18,b:0.22,a:0.1},o:{x:0,y:2},r:8}]
  ].forEach(([n,spec,ring,sh])=>{
    const cell=F(n,320,10); V(cell,12); el.appendChild(cell); cell.layoutGrow=1;
    const sq=F('swatch',320,110); sq.cornerRadius=12; sq.fills=solid('#ffffff');
    if(ring){sq.strokes=[{type:'SOLID',color:rgb('#212121'),opacity:0.1}]; sq.strokeWeight=0.957; sq.strokeAlign='INSIDE';}
    if(sh) sq.effects=[{type:'DROP_SHADOW',color:sh.c,offset:sh.o,radius:sh.r,spread:0,visible:true,blendMode:'NORMAL'}];
    cell.appendChild(sq); sq.layoutSizingHorizontal='FILL';
    const t=TX(n,15,22,'Semi Bold','#000000'); cell.appendChild(t); t.layoutSizingHorizontal='FILL';
    const s=TX(spec,12,18,'Medium','#0083a1'); cell.appendChild(s); s.layoutSizingHorizontal='FILL';});
  gap(p,8);}

function freeSpot(page, refCode){
  
  const ref = page.children.find(c => c.name.indexOf(refCode + ' · ') === 0);
  if (!ref) return null;
  const taken = page.children.filter(c => Math.abs(c.y - ref.y) < 40).map(c => Math.round(c.x));
  for (let k = 0; k < 14; k++) {
    const x = k * 1200;
    if (taken.indexOf(x) < 0) return {x: x, y: ref.y};
  }
  return {x: 15 * 1200, y: ref.y};
}

const page = await figma.getNodeByIdAsync('736:881');
await page.loadAsync();
await figma.setCurrentPageAsync(page);
for (const s of ['Regular','Medium','Light']) { try{await figma.loadFontAsync({family:'Heebo',style:s})}catch(e){} }
try{await figma.loadFontAsync({family:'Space Grotesk',style:'Light'})}catch(e){}
for (const s of ['Regular','Medium','Semi Bold']) { try{await figma.loadFontAsync({family:'Inter',style:s})}catch(e){} }

for (const spec of DATA){
  const old = page.children.find(c=>c.name.indexOf(spec.code+' · ')===0);
  let x = old ? old.x : spec.col*1200, y = old ? old.y : 0;
  if (!old && spec.row_of) { const s2 = freeSpot(page, spec.row_of); if (s2) { x = s2.x; y = s2.y; } }
  if (old) old.remove();
  const f=F(spec.code+' · '+spec.title,W,10); V(f,0);
  f.fills=solid('#ffffff'); f.cornerRadius=20;
  f.paddingLeft=56; f.paddingRight=56; f.paddingTop=48; f.paddingBottom=56;
  f.strokes=[{type:'SOLID',color:{r:0,g:0,b:0},opacity:0.07}]; f.strokeWeight=1; f.strokeAlign='INSIDE';
  page.appendChild(f); f.x=x; f.y=y;
  const cd=TX(spec.code,12,18,'Semi Bold','#9fb0bd',{ls:1.4}); f.appendChild(cd); cd.layoutSizingHorizontal='FILL';
  gap(f,10);
  const ti=TX(spec.title,40,46,'Semi Bold','#000000',{ls:-1}); f.appendChild(ti); ti.layoutSizingHorizontal='FILL';
  if(spec.intro){ gap(f,14); const k=TX(spec.intro,16,25,'Regular','#51606b'); f.appendChild(k); k.layoutSizingHorizontal='FILL'; }
  gap(f,30);
  for (const b of spec.blocks){
    if(b[0]==='h4') h4(f,b[1]);
    else if(b[0]==='p') para(f,b[1]);
    else if(b[0]==='t') table(f,b[1],b[2]);
    else if(b[0]==='sw') swatches(f,b[1],b[2]);
    else if(b[0]==='st') states(f,b[1]);
    else if(b[0]==='tag') tag(f,b[1],b[2]);
    else if(b[0]==='r') radii(f,b[1]);
    else if(b[0]==='ty') typeScale(f,b[1]);
    else if(b[0]==='elev') elevDemo(f);
    else if(b[0]==='swb') swBig(f,b[1]);
    else if(b[0]==='bst') btnStates(f);
    else if(b[0]==='surf') surfPlates(f,b[1]);
    else if(b[0]==='dots') dotPlates(f,b[1]);
  }
}
