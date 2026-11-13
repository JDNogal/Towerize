// ==================== v312 · Elegir pieza en móvil: pantalla aparte, como la oferta de torres ====================
// El fondo queda tapado (no se ve ni se puede tocar el mapa) y el mazo, las reliquias y el ojo van arriba a la derecha,
// en el mismo sitio que en las demás ventanas. Los botones de dentro de la ventana se ocultan en móvil.
setInterval(()=>{try{const B=document.body.classList,on=B.contains('pcpick')&&B.contains('mfs')&&!B.contains('pcpeek')&&!(typeof LB!=='undefined'&&LB.open);let b=$('pkbar');
 if(!on){if(b)b.classList.remove('on');return;}
 if(!b){b=document.createElement('div');b.id='pkbar';b.className='rlbar pkbar';const ic=(k,fb)=>typeof icU==='function'?icU(k,fb):fb;
  b.innerHTML=`<button data-mz="deck" class="mzb" title="Ver tu mazo">${ic('m_deck','🃏')}</button><button data-mz="rel" class="mzb" title="Ver tus reliquias">${ic('m_chest','🧰')}</button><button data-a="ppeek" title="Ver el mapa">${ic('m_k_peek','👁')}</button>`;
  b.querySelectorAll('[data-mz]').forEach(x=>x.addEventListener('click',e=>{e.stopPropagation();e.preventDefault();try{mzOpen(x.dataset.mz);}catch(_){}}));document.body.appendChild(b);}
 b.classList.add('on');}catch(e){}},150);
