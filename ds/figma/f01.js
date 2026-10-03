const DATA = [{"code":"S5","title":"Shape","y":0,"col":3,"intro":"M3 uses a ten-step corner-radius scale named for roundedness. D&B’s radii were each measured off the frame, so some land off the scale. Use the scale for anything new.","blocks":[["h4","THE SCALE"],["r",[["none",0],["extra-small",4],["small",8],["medium",12],["large",16],["extra-extra-large",48],["full",999]]],["t",[300,130,594],[["dnb.sys.shape.corner-none","0","none"],["dnb.sys.shape.corner-extra-small","4","extra-small"],["dnb.sys.shape.corner-small","8","small — the FAQ card"],["dnb.sys.shape.corner-medium","12","medium — every card but the dark one"],["dnb.sys.shape.corner-large","16","large — hero, promotional band, quote card, footer"],["dnb.sys.shape.corner-extra-extra-large","48","extra-extra-large — the industries visual panel"],["dnb.sys.shape.corner-full","full","full — the hero data chip"]]],["h4","OFF THE SCALE — EACH MEASURED, NONE TIDY-ABLE"],["t",[300,130,594],[["dnb.sys.shape.corner-tag","4.8","the stats tag chip"],["dnb.sys.shape.corner-icon-tile","5.556","the option-6 tile — 8.167 × 40/58.8, the box radius scaled with the box"],["dnb.sys.shape.corner-category-tag","6","the guides tags"],["dnb.sys.shape.corner-carousel-control","6.533","the testimonials prev/next squares"],["dnb.sys.shape.corner-icon-box","8.167","the icon-button positioning box"],["dnb.sys.shape.corner-badge","8.55","the button badge"],["dnb.sys.shape.corner-button","11","the button"],["dnb.sys.shape.corner-card-dark","11.488","the dark solution card"],["dnb.sys.shape.corner-data-node","13","the hero data-chip plus node"]]]]},{"code":"S6","title":"Typography","y":0,"col":4,"intro":"M3’s scale is Display / Headline / Title / Body / Label × Large / Medium / Small. D&B’s measured styles map onto all fifteen, plus one display face outside the scale.","blocks":[["h4","TYPE SCALE — dnb.sys.typescale.*"],["ty",[["display-large","Heebo",400,48,54,0,"hero H1 (48/54/400, 01/10)"],["display-medium","Heebo",400,48,54,0,"section H2 (48/54/400, 01/10)"],["display-small","Heebo",400,48,57.6,0,"footer contact"],["headline-large","Heebo",400,34,38,0,"faq · guides"],["headline-medium","Heebo",400,28,39.2,0,"quote"],["headline-small","Heebo",400,26,34,0,"industries row — 8 uses"],["title-large","Heebo",400,24,31.2,-0.39,"faq question · open industries row"],["title-medium","Heebo",400,20,27.2,0,"section lede"],["title-small","Heebo",400,18,27,0,"quote attribution"],["body-large","Heebo",400,17.61,22.89,0,"cta sub"],["body-medium","Heebo",400,16,20.8,0,"card body · descriptions"],["body-small","Heebo",400,14,21,0,"footer link — 33 uses, the most repeated style"],["label-large","Heebo",500,15,22.5,0,"nav · footer heading"],["label-medium","Heebo",500,14,21,1,"eyebrow · tag chip"],["label-small","Heebo",500,13.3,19.91,-0.1,"button label — all seven"],["stat-figure","Space Grotesk",300,108.3,108.3,1.083,"OUTSIDE the scale — the four stat numbers"]]],["h4","TWO THINGS THAT WILL BITE"],["p","The weight trap. Figma’s variables read 450 on the display styles. 450 is a variable-axis position, not a CSS weight — the rendered style is Heebo Medium = 500, verified against the frame’s own text widths. Shipping 400 where the frame says 450 makes every headline too light.\n\nOne display size, not three. Every section H2 on the desktop is 56px; only the LEADING changes (61.6 / 67.2 / 72.8)."]]},{"code":"F5","title":"Interaction states","y":1,"col":0,"intro":"M3 applies a semi-transparent state layer in the content’s own colour. D&B’s approved budget is tighter, so the build uses a filter rather than an overlay.","blocks":[["bst",null],["h4","M3’S VALUES vs THE APPROVED BUDGET"],["t",[180,280,564],[["Hover","+8% opacity overlay","filter brightness(.97) · tone ≤4% · movement ≤1px"],["Focus","+10% opacity overlay","2px secondary ring, offset 3, radius 6 — PAGE-WIDE"],["Pressed","+10% opacity overlay","filter brightness(.94)"],["Dragged","+16% opacity overlay","nothing on the page is draggable"]]],["p","movement ≤1px · tone ≤4% · no scale on a card · no rotation · no blur · no sweep · no shadow beyond a hairline · 140–260ms. At rest every option measures Δ0.00 against the static design."],["h4","STATE TOKENS"],["t",[260,130,634],[["dnb.sys.state.hover-tone","0.04","the budget's ceiling on tone change (M3 uses an 8% overlay)"],["dnb.sys.state.pressed-tone","0.06","(M3 uses a 10% overlay)"],["dnb.sys.state.disabled-container","0.12","M3's convention, adopted — nothing on the page had a disabled state"],["dnb.sys.state.disabled-content","0.38","M3's convention, adopted"],["dnb.sys.state.focus-ring-width","2","2px secondary, offset 3, radius 6 — page-wide on every a / button / input"],["dnb.sys.state.focus-ring-offset","3",""]]],["tag","ok","CORRECTED. An earlier draft said the build defined no button states and focus on only two components. Both were wrong: micro/micro.css defines the button hover and active, the card hover and active, the link and FAQ hovers, and a page-wide focus-visible ring on every a / button / input inside #frame. Only DISABLED was genuinely missing, and it is now specified on every component."]]},{"code":"C1","title":"Button","y":2,"col":0,"intro":"M3: buttons prompt most actions in a UI. D&B has ONE button component — a client decision that overrides the frame — in four grounds. All seven instances measure identically.","blocks":[["p","M3 equivalent — Buttons (filled)"],["h4","ANATOMY & MEASUREMENTS"],["t",[300,724],[["Height","43.67 desktop · 48 mobile tap minimum — only the box grows"],["Corner","dnb.sys.shape.corner-button = 11"],["Container width","calc(53.89 + label width) — the box follows the label"],["Badge","22.8 × 27.08, corner 8.55, at 7.86 from the leading edge"],["Badge → label","8.19"],["Label","dnb.sys.typescale.label-small — 13.3 / 19.91, tracking −.1"],["Label → trailing edge","15.04"],["Outline","inset 0 0 0 1px #282834 — an inset shadow, NEVER a border"]]],["h4","STATES"],["st",[["Enabled","tertiary","on-primary-container","#282834 1px inset","—","live"],["Hover","filter brightness(.97)","unchanged — tone only","unchanged","160 / 180","live"],["Focus","unchanged","unchanged","2px secondary, offset 3, radius 6","—","live"],["Pressed","filter brightness(.94)","unchanged","unchanged","160","live"],["Disabled","on-surface at 12%","on-surface at 38%","none","—","proposed"]]],["p","Three widths deliberately differ from the Figma frame, because the component's padding wins: guides 133 → 130.22, industries 146 → 142.99, cta 154 → 105.03. At 154 the centred label sat 32.7 from the badge instead of 8.19 — that is the button the client flagged."],["p","The hover is a filter, not a colour swap, so it works on all four grounds without a per-variant value. Disabled is the only state the build does not define."],["h4","ACCESSIBILITY"],["p","Label contrast is 9.1:1 on the tertiary ground. 43.67 is under WCAG 2.5.5 AAA (44×44) but fine at AA; mobile raises it to 48. Focus is the page-wide ring, so no new treatment."]]},{"code":"C2","title":"Icon button","y":2,"col":1,"intro":"The card / row action the client chose — option 6 of the seven put up. Figma calls the original “Green square”.","blocks":[["p","M3 equivalent — Icon buttons"],["h4","ANATOMY & MEASUREMENTS"],["t",[300,724],[["Positioning box","58.8 × 58.8, no paint — what the frame positioned, so it never resizes"],["Tile","40 × 40, corner-icon-tile 5.556"],["Tile position","PINNED: top 18.8 on a card (bottom-leading), top 9.4 on a row"],["Arrow","17 × 17 at 11.5 / 11.5 — ten circles, r 1.225, rotated 180° to point down-left"],["Container","rgba(255,255,255,.34) + inset 0 0 0 1px rgba(11,22,32,.13)"]]],["h4","STATES"],["st",[["Rest (light)","white 34%","#333","rgba(11,22,32,.13)","—","live"],["Hover (light)","rgba(0,131,161,.07)","primary + fly-through","rgba(0,131,161,.34)","340","live"],["Rest (dark card)","white 10%","icon-on-dark","white 24%","—","live"],["Hover (dark card)","rgba(92,205,231,.17)","primary-container","rgba(169,243,255,.42)","340","live"],["Selected (open row)","primary solid","on-primary, no fly-through","none","—","live"],["Pressed","unchanged","unchanged","tile scales to .94","140","live"],["Disabled","on-surface at 12%","on-surface at 38%","none","—","proposed"]]],["p","Centring a 40px element in the 58.8 box pushes every edge 9.4px deeper and the component reads as having more margin than the frame's tile. Measured on all five cards, each with a different frame inset, all 9.4 too deep. Pinning to the corner fixes it per card automatically."],["p","The hue change is an explicit exception to the budget, which says no hue change. The client asked for it. --gsq-ink is set on the box, not the svg, so BOTH arrow copies inherit it — the arrow you see after the fly-through is the second copy."],["p","The dark card needs its own values because its corner ground is 64–106 grey against 233–249 on the other four: the teal arrow scored 2.0 grey levels of contrast there, and a 34% white wash lifted the patch +18.9 into a conspicuous block."],["h4","ACCESSIBILITY"],["p","No focus ring of its own — the whole card is the link, so focus lands on the card and the page-wide ring draws it there."]]}];

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
