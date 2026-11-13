// ==================== v312 · Era Distópica: el dron proyector en lugar del pergamino ====================
// El aspecto vive en css/21_dron.css (aspecto «holo»). Aquí solo lo que el CSS no puede hacer solo:
// · el cofre (elegir reliquia) no tiene pergamino: en el aspecto holo se envuelve en una ventana proyectada;
// · al cambiar de escena dentro de la misma ventana (evento → resultado, otra oferta) hay interferencia y el dron no vuelve a llegar;
// · al cerrar, la imagen se aplasta en una línea y el dron se va volando.
const hdOn=()=>document.documentElement.dataset.skin==='holo';
{const _rp=renderRelicPick;renderRelicPick=function(){const r=_rp.apply(this,arguments);try{if(hdOn()){const rl=$('relic');if(!rl.querySelector('.hdwin')){const w=document.createElement('div');w.className='hdwin';
 [...rl.childNodes].filter(n=>!(n.nodeType===1&&n.classList.contains('rlbar'))).forEach(n=>w.appendChild(n));rl.insertBefore(w,rl.querySelector('.rlbar')||null);}}}catch(e){}return r;};}
{const HD={key:null,open:false,t:0};
 const keyOf=rl=>{const w=rl.querySelector('.pscr,.hdwin');if(!w)return null;const t=w.querySelector('.ptt,.evt,.evhead b,b');return (t?t.textContent:'')+'|'+(w.querySelector('.evrsl')?'r':'')+'|'+rl.querySelectorAll('[data-a="towpick"],[data-a="relic"],[data-a="evopt"]').length;};
 const init=()=>{const rl=$('relic');if(!rl)return setTimeout(init,200);
  new MutationObserver(ms=>{const on=hdOn();for(const m of ms){
   if(m.type==='attributes'){const op=rl.classList.contains('open');
    if(on&&!op&&HD.open&&rl.querySelector('.pscr,.hdwin')){rl.classList.add('hdcl');clearTimeout(HD.t);HD.t=setTimeout(()=>rl.classList.remove('hdcl'),620);}
    if(op&&!HD.open){rl.classList.remove('hdcl');HD.key=keyOf(rl);}
    HD.open=op;}
   else if(on&&m.type==='childList'&&rl.classList.contains('open')){const k=keyOf(rl),w=rl.querySelector('.pscr,.hdwin');if(!w)continue;
    if(HD.key&&k===HD.key)w.classList.add('hdkeep');else if(HD.key&&k!==HD.key)w.classList.add('hdglitch');HD.key=k;}}}).observe(rl,{attributes:true,attributeFilter:['class'],childList:true});};
 if(document.readyState==='loading')addEventListener('DOMContentLoaded',init);else init();}
// móvil: la ventana de piezas tiene scroll y no deja asomar el dron por encima; va aparte, pegado a su borde de arriba
setInterval(()=>{try{const B=document.body.classList,on=hdOn()&&B.contains('pcpick')&&B.contains('mfs');let d=$('hdpk');
 if(!on){if(d)d.classList.remove('on');return;}if(!d){d=document.createElement('div');d.id='hdpk';document.body.appendChild(d);}
 const r=$('panel').getBoundingClientRect();d.style.left=(r.left+r.width/2)+'px';d.style.top=Math.max(0,r.top-46)+'px';d.classList.add('on');}catch(e){}},150);
// con los paneles del mazo y del cofre a los lados, la ventana del cofre cabe entre ellos (también con la ventana ampliada en pantallas grandes)
setInterval(()=>{try{const w=document.querySelector('#relic.open .hdwin');if(!w)return;const B=document.body.classList;
 if(!hdOn()||!B.contains('dsk')||B.contains('mfs')||B.contains('mzbtn')){w.style.maxWidth='';return;}
 const zm=parseFloat(getComputedStyle(w).zoom)||1,mzw=parseFloat(getComputedStyle($('mzside')||document.body).getPropertyValue('--mzw'))||168;
 const mx=Math.floor((innerWidth-2*(mzw+34))/zm)+'px';if(w.style.maxWidth!==mx)w.style.maxWidth=mx;}catch(e){}},200);
