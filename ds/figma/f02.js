const DATA = [{"code":"C3","title":"Card","y":2,"col":2,"intro":"Seven distinct surface recipes, each welded to one place. A card is a package — gradient angle, stops, radius, hairline and blur together.","blocks":[["p","M3 equivalent — Cards"],["h4","ANATOMY & MEASUREMENTS"],["t",[300,724],[["Solution · dark","604 × 462.4 · r 11.488 · linear 147.349° teal-20 22.78% → teal-15 101.15%"],["Solution · light wide","604 × 462.4 · r 12 · linear 159.838° #F6F8FA 16.208% → #F3F5F7 96.765%"],["Solution · light tall","392 × 504 · r 12 · linear 148.339° + inset .957 hairline + blur 18.97"],["Solution · teal","392 × 504 · r 12 · linear 141.072° #AEEBF9 50% → #AEEBF9 101.18% + blur 18.97"],["Article","394.3 × 552.2 · r 12 · linear 146.111° #F6F8FA → #F3F5F7"],["Quote","699 × 344 · r 16 · linear 166.705° #F6F8FA 16% → #F1F3F5 97% + blur 9.5"],["FAQ","662 × 133.6 · r 8 · linear 172.538° #F8FAFC 90% → 100% + blur 9.5"]]],["h4","STATES"],["st",[["Rest","the recipe","—","the recipe's hairline","—","live"],["Hover (light)","+ rgba(11,22,32,.022)","its icon button goes teal","border → rgba(33,33,33,.16)","140","live"],["Hover (dark)","+ rgba(255,255,255,.03)","icon button → teal-85","unchanged","140","live"],["Hover shadow","0 2px 8px −4px rgba(11,46,56,.10) — dark card rgba(0,0,0,.26)","—","—","140","live"],["Pressed","unchanged","its icon button scales to .94","unchanged","140","live"],["Focus","unchanged","unchanged","the page-wide ring","—","live"],["Disabled","on-surface at 12%","on-surface at 38%","none","—","proposed"]]],["p","Three of the stop percentages run PAST 100 (101.15, 101.18). That is the frame's own value and it means the end colour is never fully reached inside the box; clamping to 100 makes the card visibly flatter."],["p","Only the two tall light cards carry the inset hairline. That asymmetry is real, not a bug."],["p","The article card also nudges its category tag −1.5px on hover."],["h4","ACCESSIBILITY"],["p","The whole card is a link and gets the page-wide focus ring."]]},{"code":"C4","title":"Chip","y":2,"col":3,"intro":"M3 chips are interactive by definition. D&B's three are labels, not controls — a meaningful difference, and the reason they have no states.","blocks":[["p","M3 equivalent — Chips / Badges"],["h4","ANATOMY & MEASUREMENTS"],["t",[300,724],[["Tag chip","#F7F9FB · r 4.8 · label-medium in primary · 5px secondary dot"],["Category · deep","primary ground · r 6 · 14 / 19.5 Medium white · white dot"],["Category · tonal","rgba(92,205,231,.2) · r 6 · #232323 · primary dot"],["Category · solid","secondary ground · r 6 · #232323 · #232323 dot"],["Data chip","rgba(1,30,44,.8) + blur 1.722 · r full · 11.19 Medium white 86%"]]],["h4","STATES"],["st",[["Rest","the ground","the label","—","—","live"],["Hover","— none: it is a label","—","—","—","live"],["Selected","— not applicable","—","—","—","live"]]],["p","The three guides tags are three different colours deliberately — the client sent them as separate exports. Do not unify them."],["p","If any of these ever becomes a filter, it needs a real M3 chip spec with selected, hover and disabled — not this label."],["h4","ACCESSIBILITY"],["p","Non-interactive, so no focus or target-size requirement."]]},{"code":"C5","title":"List","y":2,"col":4,"intro":"The industries sector list — a list whose rows expand, which M3 has no component for.","blocks":[["p","M3 equivalent — Lists"],["h4","ANATOMY & MEASUREMENTS"],["t",[300,724],[["Closed row","94 + 1px rule · heading headline-small in on-surface-variant"],["Open row","158 with its paragraph · ground rgba(255,255,255,.4) · 16px sides"],["Open heading","title-large in #171717"],["Description","body-medium in on-surface-variant-2, shown only when open"],["Rule","closed outline 12% · open 4%"],["Icon button","rest at top 9.4 · selected = primary solid with a white arrow"]]],["h4","STATES"],["st",[["Rest","—","—","rule at 12%","—","live"],["Hover (closed)","—","its icon button goes teal + fly-through","unchanged","340","live"],["Focus","unchanged","unchanged","the page-wide ring","—","live"],["Selected / open","white 40%","heading → #171717","rule → 4%","—","live"],["Disabled","on-surface at 12%","on-surface at 38%","none","—","proposed"]]],["p","The chip stays IN FLOW, level with its own heading. It used to be absolutely placed at 12 / 83.04 — the frame's number, right only for the one row the frame draws open (158 tall). Every other row is 95, so a 58.8 chip at 83.04 ended 46.8px BELOW its own group and covered the row beneath. That single number was the whole of “the opened card is covered”."],["p","One row open at a time; every row is role=button with aria-expanded."],["p","Four of the nine sectors have no description in the copy document and eight have no image. They open with the highlight and no paragraph — deliberately, rather than invented text."],["h4","ACCESSIBILITY"],["p","role=button + aria-expanded, and the page-wide focus ring."]]},{"code":"C6","title":"Expandable","y":2,"col":5,"intro":"A D&B addition, documented in full rather than mapped. It is the FAQ.","blocks":[["p","M3 equivalent — — (M3 has no accordion)"],["h4","ANATOMY & MEASUREMENTS"],["t",[300,724],[["Card","662 wide · r 8 · linear 172.538° #F8FAFC 90% → 100% · blur 9.5"],["Closed height","133.6 one-line · 162.4–167.2 two-line"],["Question","title-large, tracking −.39, in #061B31"],["Answer","15 / 1.55 in on-surface-variant-2, shown only when open"],["Marker","two separate 33.6 × 4.4 bars"],["Gap between cards","10"]]],["h4","STATES"],["st",[["Closed","the recipe","question #061B31","—","—","live"],["Hover","+ rgba(11,22,32,.02) across the WHOLE card","unchanged","unchanged","160","live"],["Focus","unchanged","unchanged","the page-wide ring","—","live"],["Open","rgba(255,255,255,.96) → #FFF","question → on-surface; vertical bar scales to 0","unchanged","260","live"],["Disabled","on-surface at 12%","on-surface at 38%","none","—","proposed"]]],["p","The markers are two files, not one glyph rotated, so the horizontal bar stays exactly where it was when the vertical one collapses."],["p","The hover was on the inner button, which sits inside the card's 30/32 padding and left a white margin all the way round. It is on the card now."],["p","The rows are absolutely placed in a fixed canvas, so a taller stack grows over the footer. The closed stack is 823 and the frame leaves 82px; the longest answer is 87, so an open row overlapped by 5px. --faqx carries whatever keeps a 40px gap. An early guess of ~684 for the closed stack was wrong — measure it."],["h4","ACCESSIBILITY"],["p","The page-wide focus ring, offset 3."]]},{"code":"C7","title":"Text field","y":3,"col":0,"intro":"M3 specifies six states for a text field. D&B has exactly one field on the page — the newsletter input — and now that the error roles exist, all six can be drawn.","blocks":[["p","M3 equivalent — Text fields"],["h4","ANATOMY & MEASUREMENTS"],["t",[300,724],[["Container","375.63 × 50 · r 12 · rgba(255,255,255,.1) · 1px rgba(255,255,255,.3)"],["Input","42 tall inside a 3px inset · 15px Heebo Regular · white"],["Placeholder","rgba(255,255,255,.5)"],["Submit","the standard button, primary-container ground, inside the field"]]],["h4","STATES"],["st",[["Enabled","white 10%","placeholder white 50%","white 30%","—","live"],["Focus","white 14%","value white","2px secondary, offset 3","—","live"],["Filled","white 10%","value white 100%","white 30%","—","proposed"],["Error","white 10%","value white; helper on-error-container","2px error","—","proposed"],["Disabled","white 4%","white 38%","white 12%","—","proposed"]]],["p","The focus state is the page-wide ring, which already covers input:focus-visible — so only filled, error and disabled are new."],["p","Error needs a helper line under the field. There is no helper-text slot in the design yet; the proposal puts it at body-small in on-error-container, 6px under the container."],["h4","ACCESSIBILITY"],["p","The field has no visible label — only a placeholder — so it needs an aria-label. It has one."]]}];

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
