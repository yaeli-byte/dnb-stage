
(function(){
  var ov=document.getElementById('pn-ov'); if(!ov) return;
  var dlg=ov.querySelector('.pn-dlg'), form=ov.querySelector('form'), last=null;
  function open(e){ if(e){e.preventDefault();} last=document.activeElement; dlg.classList.remove('done'); ov.classList.add('open'); ov.setAttribute('aria-hidden','false'); document.documentElement.style.overflow='hidden'; setTimeout(function(){ var f=ov.querySelector('input'); if(f) f.focus(); },60); }
  function close(){ ov.classList.remove('open'); ov.setAttribute('aria-hidden','true'); document.documentElement.style.overflow=''; if(last&&last.focus) last.focus(); }
  window.__pniyot={open:open,close:close};
  ov.addEventListener('click',function(e){ if(e.target===ov) close(); });
  ov.querySelector('.pn-x').addEventListener('click',close);
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&ov.classList.contains('open')) close(); });
  function ok(el){ var v=el.value.trim(), t=el.getAttribute('data-v');
    if(el.required&&!v) return false;
    if(t==='mail') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    if(t==='tel') return /^[0-9+\-\s()]{9,15}$/.test(v);
    if(t==='id') return /^\d{5,9}$/.test(v);
    return true; }
  form.addEventListener('submit',function(e){ e.preventDefault(); var bad=null;
    [].slice.call(form.querySelectorAll('input:not([type=checkbox]),textarea')).forEach(function(el){ var f=el.closest('.pn-f'), g=ok(el); if(f) f.classList.toggle('err',!g); if(!g&&!bad) bad=el; });
    var ck=form.querySelector('[name=confirm]'); ck.closest('.pn-ck').classList.toggle('err',!ck.checked); if(!ck.checked&&!bad) bad=ck;
    if(bad){ bad.focus(); return; }
    dlg.classList.add('done'); form.reset(); });
  form.addEventListener('input',function(e){ var f=e.target.closest('.pn-f'); if(f&&f.classList.contains('err')&&ok(e.target)) f.classList.remove('err'); });
  function wire(){
    [].slice.call(document.querySelectorAll('h3')).forEach(function(h){
      var t=h.textContent.trim(), card=h.closest('a')||h.parentElement; if(!card) return;
      if(t==='פניות הציבור'){ card.style.cursor='pointer'; if(card.tagName==='A') card.setAttribute('href','#pniyot'); card.setAttribute('role', card.tagName==='A'?'link':'button'); card.addEventListener('click',open); }
      if(t==='אמנת השירות'){ card.style.cursor='pointer'; if(card.tagName==='A'){ card.setAttribute('href','sla.html'); } else { card.setAttribute('role','link'); card.setAttribute('tabindex','0'); card.addEventListener('click',function(){ location.href='sla.html'; }); card.addEventListener('keydown',function(e){ if(e.key==='Enter') location.href='sla.html'; }); } }
    });
    if(location.hash==='#pniyot') open();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',wire); else wire();
})();
