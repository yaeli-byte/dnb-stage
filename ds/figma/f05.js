const DATA = [{"code":"B5","title":"Page templates","y":0,"col":0,"row_of":"B1","intro":"What each page type is made of, in order — so a new page of a known type starts from the sections that type already uses rather than from a blank file.","blocks":[["h4","THE SIX PAGE TYPES"],["t",[180,670],[["Homepage","hero · trust · statsw · solutions · guides · industries · ctaw · tst · faq(+fb)"],["Industries lobby","hdr · crumb · canvas hero · statsw · sector grid · guides · ctaw · faq(+fb)"],["Industry page","hdr · crumb · mock hero · intro · challenge cards · solution families · proof · trust · guides · ctaw · faq(+fb)"],["Solution family","hdr · crumb · split hero · about · solutions · benefits · trust · tst · guides · ctaw · faq(+fb)"],["Solution page","hdr · crumb · media hero · product blocks · benefits · standards · trust · tst · guides · ctaw · faq(+fb)"],["Product page","hdr · crumb · media hero · trust · feature tabs · video · how it works · benefits · standards · more products · tst · ctaw · faq(+fb)"]],["PAGE TYPE","SECTIONS, IN ORDER"]],["tag","ok","⚠ #faq CARRIES THE FOOTER, so it is ALWAYS LAST. A section placed after it renders above the footer’s reserved height — that is the round-28 failure where \"more products below the FAQ\" was tried three ways and reverted."]]},{"code":"S9","title":"Spacing","y":0,"col":0,"row_of":"S6","intro":"Section padding, the content inset and the gap between blocks inside a section — MEASURED off the live build, desktop and mobile. This did not exist in the system until 2026-09-22, which is why nothing could check a margin and why \"שוליים מוזרים / ללא שוליים\" kept coming back in review.","blocks":[["h4","THE THREE VALUES"],["t",[300,180,180,308],[["section-padding-block","80","64","desktop: sol · guides · ind · tst · faq all measure 80. mobile: sol · guides · ind · cta · faq · tst all measure 64."],["section-inset-inline","100 page · 60 shared","20","⭐ CLIENT DECISION 2026-10-07: a section MOUNTED on more than one page takes 60; a section that belongs to ONE page type takes 100. Full test and the four mechanism exceptions (hdr/crumb 44/43 · heroes 42 · challenge cards 56 · ctaw/faq 0, which inset through an inner .wrap) are in C15."],["block-gap","56","32","CLIENT DECISION 2026-09-22. Measured 46 (guides) · 57 (sol) · 57.2 (ind) — two of the three were already within 1.2px of 56."],["block-gap-large","90","—","CLIENT DECISION: the QUOTES section is a deliberate exception and takes the large gap. Its heading is a narrow off-axis column, so the extra air reads as composition."]],["TOKEN","DESKTOP 1440","MOBILE 390","MEASURED ON"]],["h4","THE EXCEPTIONS ARE FACTS, NOT DEFECTS"],["p","The live page is the source of truth, so a section that departs is RECORDED, not corrected. Naming them is what stops a later session \"fixing\" the design back to the token: trust 70 / 44 (a band, not a section) · stats 73 / 19.3 (the figure card carries its own padding) · cta 32 / 64 (the promo band’s art starts at 32) · contact 78.8 and footer 70.8 on mobile, both from the client’s own frame 124:17951."],["h4","HOW IT WAS MEASURED"],["p","tools/spaceprobe.html walks every section of a build and reports its real padding, inset and the gaps between its in-flow children. Run it with ?w=1440&src=index.html or ?w=390&src=m2/index.html. Re-measure rather than trusting this table if the build moves."],["tag","ok","CLOSED 2026-09-22: desktop block-gap is 56, and the quotes section keeps 90 as a named large-gap exception. Decided off a rendered, measured comparison of all four sections (tools/gapshot.html), not off a table."]]},{"code":"S10","title":"Type scale · mobile","y":0,"col":0,"row_of":"S6","intro":"The mobile build had NO type scale. Measured 2026-09-22: 34 distinct styles on one page — four H2 sizes, four H3 variants, four body sizes with three different line-heights on 17px alone, and five sizes in the small band. That is the measured source of the recurring \"אין היררכיה\" note, and it is why a mobile scale is a separate topic from S6.","blocks":[["h4","THE SCALE — CLIENT DECISION, 2026-09-22"],["t",[240,170,120,438],[["m-h2","28 / 36","500","30 · 29 · 28 · 26"],["m-h3","24 / 30","500","24 w500 · 24 w400 · 22 · 20"],["m-body-large","20 / 28","400","19 · 17/24.65 · 16/24"],["m-body-medium","16 / 21","400","17 · 16/20.8 · 15"],["m-label","16 / 21","500","FAQ question · card title · footer heading"],["m-small","14 / 18","400","footer links · captions · legal · attribution"],["m-small-strong","14 / 18 · +1px","500","the eyebrow — it had 1px on 5 uses and none on 2"],["m-tag","12 / 16","500","CLIENT-ADDED after seeing 14 was too big for a tag"]],["STYLE","SIZE / LINE","WEIGHT","REPLACES"]],["h4","THE FOUR CASES SHE DECIDED ON RENDERS, NOT ON THIS TABLE"],["p","Four mappings changed the design’s character, so they were shown as the real page rendered twice — tools/typecompare.html, real content at 390 — instead of being argued in a table. Industries rows 20 → 24: TAKEN, the list reads as one level instead of two and grows accordingly. Blog card titles 16 → 24: REJECTED, at 24 the title swamped both the tag and the photo and the cards nearly doubled in height. Article tags 11.2 → 14: REJECTED, she added m-tag 12 instead. Solution card body 17 → 16: TAKEN."],["h4","DELIBERATELY OUTSIDE THE SCALE"],["p","The stat figure (56 / 52 Space Grotesk), the hero H1 (34 / 37.4), the button label (13.3 / 19.91) and the data-chip label (11.19). The last two are COMPONENTS, not text styles — their size is part of a measured geometry, so folding them into the scale would change the component."],["tag","ok","RESULT, measured on m2/index.html after the change: 34 distinct styles → 12, one per level, with Space Grotesk the only remaining exception."]]},{"code":"C13","title":"The component sheet","y":0,"col":0,"row_of":"C1","intro":"ds/components.css — generated from this source, linked by every page, and the reason no page may declare .btn again. It exists because the button was defined in EIGHT hand-authored files and every copy had drifted.","blocks":[["h4","WHAT IT EMITS"],["t",[300,430,308],[[".dnb-btn","the one button — 4 grounds, 5 states","BUTTON"],[".dnb-tile","the card / row arrow tile, pinned not centred","ICON_BUTTON"],[".dnb-surface--*","all ten card surfaces, each a complete package","SURFACES"],["--dnb-sys-spacing-*","section padding and inset, with a mobile block","SPACING"]],["CLASS","WHAT","FROM"]],["h4","THE BUTTON IS A FLEX ROW — THAT IS THE WHOLE FIX"],["p","The built button positions its label absolutely at left:38.85 with a hard-coded width:var(--lblw) inside overflow:hidden. That is why renaming a label to \"שליחה\" clipped it to \"שליי\": the LABEL was the fixed box, so widening the BUTTON could never fix it. As a flex row the box follows the label, and 7.86 + 22.8 + 8.19 + 15.04 = 53.89 reproduces the spec’s own calc(53.89 + label width) exactly. Verified against the live button: badge-lead 7.86, gap 8.19, trail 15.04 all identical."],["h4","ONE PIN, FOR ONE REASON"],["p","Hugged in Heebo the hero button measures 100.23 where the live one is 105.03 — the live --lblw:51.143 was measured in Atlas DL and carries 4.79px of slack. The live page is the source of truth, so --dnb-btn-label-min pins it. A genuinely new button just hugs."],["h4","ENFORCEMENT"],["p","tools/dslint.py fails on a redeclared button, a button off 43.67 / 48, a button with no arrow, a hard-coded label width, and a hover shadow past the approved ambient (blur ≤ 8, alpha ≤ .26 — micro option 3, which is approved WITH its shadow, so the rule is a ceiling and not a ban). It never lints the live homepage: that is the reference the rules were derived from."],["tag","ok","A var() THAT RESOLVES TO NOTHING FAILS SILENTLY. m2/index.html never defines --head, so font-family:var(--head),Heebo,sans-serif was invalid at computed-value time and the footer submit inherited the UA’s Arial from its <button>. A comma-list AFTER var() is not a fallback — the fallback goes inside the parens."]]},{"code":"F7","title":"RTL & bidi","y":0,"col":0,"row_of":"F5","intro":"The desktop canvas lays out LEFT-TO-RIGHT and only the text leaves are RTL. That is not a shortcut — it is what the Figma frame does, and every attempt to make the page natively RTL mirrors rows that the design does not mirror.","blocks":[["h4","THE BASE DIRECTION IS DIFFERENT ON DESKTOP AND MOBILE"],["t",[200,240,528],[["index.html","direction: ltr","Every box is placed at its Figma x. Figma orders children by ascending x, so an RTL container silently mirrors every row."],["text leaves only","direction: rtl","Applied leaf by leaf, never to a container."],["mobile.html","direction: rtl","Nothing on mobile is positioned from frame coordinates, so there is no reason to fight the natural direction."]],["SURFACE","BASE","WHY"]],["p","What the LTR base cost when it was got wrong: the logo landed on the wrong side, the six client logos ran in reverse, and the stat pair 500M+ / 90% swapped places. None of those look like a direction bug — they look like three separate mistakes."],["h4","SOURCE ORDER MUST BE LOGICAL ORDER"],["p","A leading or trailing neutral character — a period, a comma, a question mark — takes the PARAGRAPH direction, not the direction of the text beside it. The footer heading was written \"?למה D&B\" with the mark first in source, and it rendered with the mark at the start of the line. Write the logical order and let the bidi algorithm place it."],["p","Only two leaves on the whole page actually render differently with direction:rtl on the leaf — the industries lede (the period moved 556px to the correct end) and the header's \"למה D&B?\" (the question mark, 58.9px). Checked by flipping all 47 Hebrew leaves and measuring the last glyph. Everything else is unaffected, so do not apply it broadly."],["h4","TWO TRAPS THAT LOOK LIKE PAINT BUGS"],["p","A flex container splits an inline run into a separate item. Every mobile <summary> is display:flex with space-between, so the FAQ question \"האם פתרונות המידע כוללים <span dir=ltr>AI</span>?\" became three flex items pushed to opposite ends of the row. Wrap the whole label in one span."],["p","A flex row must not be RTL. #header .mainnav a is a flex row; direction:rtl there sends its chevron to the other side of the label."],["h4","THE FOOTER IS WRITTEN BACKWARDS ON PURPOSE"],["p","Base is LTR, so DOM order is left-to-right and the site map's FIRST entry would land at the smallest x — last for a Hebrew reader. Every footer row's DOM order is written reversed. The nine industry links are one column-count:3 flow with direction:rtl on the container, so the tracks fill right-to-left; without it, industry #1 lands in the track that is read last."]]}];

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
    else if(b[0]==='t') table(f,b[1],b[2],b[3]);
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
