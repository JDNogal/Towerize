// ==================== v312 · Elegir pieza en móvil: pantalla aparte, como la oferta de torres ====================
// El fondo queda tapado (no se ve ni se puede tocar el mapa) y el mazo, las reliquias y el ojo van arriba a la derecha,
// en el mismo sitio que en las demás ventanas. Los botones de dentro de la ventana se ocultan en móvil.
setInterval(()=>{try{const B=document.body.classList,on=B.contains('pcpick')&&B.contains('mfs')&&!B.contains('pcpeek')&&!(typeof LB!=='undefined'&&LB.open)&&!$('relic').classList.contains('open');let b=$('pkbar');/* v317: con otra ventana encima (torre, cofre, evento), su barra manda */
 if(!on){if(b)b.classList.remove('on');return;}
 if(!b){b=document.createElement('div');b.id='pkbar';b.className='rlbar pkbar';const ic=(k,fb)=>typeof icU==='function'?icU(k,fb):fb;
  b.innerHTML=`<button data-mz="deck" class="mzb" title="Ver tu mazo">${ic('m_deck','🃏')}</button><button data-mz="rel" class="mzb" title="Ver tus reliquias">${ic('m_chest','🧰')}</button><button data-a="ppeek" title="Ver el mapa">${ic('m_k_peek','👁')}</button>`;
  b.querySelectorAll('[data-mz]').forEach(x=>x.addEventListener('click',e=>{e.stopPropagation();e.preventDefault();try{mzOpen(x.dataset.mz);}catch(_){}}));document.body.appendChild(b);}
 b.classList.add('on');}catch(e){}},150);
// ==================== v312 · Barra de scroll dibujada en lo que no cabe entero (en vez de la sombra de abajo) ====================
// Donde salga la flechita ▼ (SMSEL: ventanas, cofre, fichas…), una barra vertical fina por dentro del borde derecho,
// que no pisa la flechita. Se ve en móvil, donde el navegador no enseña la suya.
{const SB=new Map();
 const upd=()=>{try{const seen=new Set();for(const el of document.querySelectorAll(SMSEL)){
   const r=el.getClientRects().length?el.getBoundingClientRect():null;const over=r&&r.width>0&&el.scrollHeight>el.clientHeight+8&&getComputedStyle(el).overflowY!=='visible';if(!over)continue;seen.add(el);
   let b=SB.get(el);if(!b){b=document.createElement('div');b.className='sbar';b.innerHTML='<i></i>';document.body.appendChild(b);SB.set(el,b);}
   const ir=el.id==='relic'&&el.querySelector('.ppap')?el.querySelector('.ppap').getBoundingClientRect():null,t0=Math.max(r.top,ir?ir.top:r.top),b0=Math.min(r.bottom,ir?ir.bottom:r.bottom),bar=el.id==='relic'&&el.querySelector('.rlbar'),bb=bar?bar.getBoundingClientRect():null,t1=bb&&bb.bottom>t0&&bb.left<r.right?Math.max(t0+8,bb.bottom+6):t0+8,top=t1,h=Math.max(30,b0-8-t1),th=Math.max(18,h*el.clientHeight/el.scrollHeight),ty=(h-th)*el.scrollTop/Math.max(1,el.scrollHeight-el.clientHeight);
   const inn=el.id==='relic'&&el.querySelector('.ppap'),rx=inn?inn.getBoundingClientRect().right-8:r.right;b.style.cssText=`left:${rx-9}px;top:${top}px;height:${h}px;z-index:${(parseInt(getComputedStyle(el).zIndex)||20)+30}`;b.firstChild.style.cssText=`height:${th}px;transform:translateY(${ty}px)`;}
  for(const[el,b]of SB)if(!seen.has(el)){b.remove();SB.delete(el);}}catch(e){}};
 setInterval(upd,150);document.addEventListener('scroll',upd,true);}
// ==================== v312 · Tarjetas de reliquias del cofre: todos los recuadros de una fila con la misma altura ====================
// La altura es la del texto más largo de esa fila, con un máximo de 3 líneas (2 en móvil); lo que no quepa, con scroll.
setInterval(()=>{try{const cs=[...document.querySelectorAll('#relic.open .cgrid .rcard')];if(!cs.length)return;const lines=document.body.classList.contains('mfs')?2:3;
 const sig=cs.map(c=>c.textContent.length).join()+'|'+innerWidth+'|'+innerHeight+'|'+lines;const g=cs[0].closest('.cgrid');if(g.dataset.eq===sig)return;g.dataset.eq=sig;
 for(let i=0;i<2;i++){const bs=cs.map(c=>c.querySelectorAll('.rbd')[i]).filter(Boolean);bs.forEach(b=>b.style.height='');const lh=parseFloat(getComputedStyle(bs[0]).lineHeight)||18;
  const h=Math.min(lh*lines,Math.max(...bs.map(b=>b.scrollHeight)));bs.forEach(b=>b.style.height=Math.ceil(h)+'px');}}catch(e){}},250);
// ==================== v314 · Pantallas grandes: el libro / la tablet (opciones, compendio, pausa, final, partidas…) crecen si caben ====================
// Regla de Nogal: grande pero sin taparlo todo, que asome un poco de mapa (≈78 % del ancho / 90 % del alto, igual en 1280, 1920 y 2560).
{const bkz=()=>{const B=document.body.classList;let z=1;if(B.contains('dsk')&&!B.contains('mfs'))z=Math.max(0.8,Math.min(2.2,Math.min(innerWidth*0.78/1080,innerHeight*0.9/690)));z=Math.round(z*40)/40;
 const r=document.documentElement.style;if(r.getPropertyValue('--bkz')!==String(z))r.setProperty('--bkz',String(z));};bkz();addEventListener('resize',bkz);setInterval(bkz,1000);}
// v314 · cabecera del compendio: el dibujo de reliquias y enemigos llena su círculo igual que el de las torres (≈62 % del círculo),
// recolocando el viewBox según lo que ocupa de verdad el dibujo (algunos, como la Moneda antigua, eran muy pequeños dentro de su lienzo)
setInterval(()=>{try{for(const s of document.querySelectorAll('#comp .bksh .bkbic:not(.bctw):not(.bkach) svg:not([data-fit])')){const host=s.closest('.bken i')||s.closest('.bkbic');
 const bb=s.getBBox();if(!bb.width||!bb.height)continue;const sz=Math.max(bb.width,bb.height)/0.62*(host.getBoundingClientRect().width/Math.max(1,s.getBoundingClientRect().width)),cx=bb.x+bb.width/2,cy=bb.y+bb.height/2;
 s.setAttribute('viewBox',`${(cx-sz/2).toFixed(2)} ${(cy-sz/2).toFixed(2)} ${sz.toFixed(2)} ${sz.toFixed(2)}`);s.style.setProperty('width','100%','important');s.style.setProperty('height','100%','important');s.style.overflow='visible';
 const w=s.parentElement;if(w&&w!==host&&!w.matches('i')){w.style.setProperty('width','100%','important');w.style.setProperty('height','100%','important');w.style.display='grid';}s.dataset.fit='1';}}catch(e){}},200);
