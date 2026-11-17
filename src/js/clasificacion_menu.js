// ==================== v337 · Clasificación en el menú principal ====================
// A la izquierda del libro, en la portada del menú principal, se ve siempre el top de la clasificación de la era
// (con «Ver toda la clasificación»); en móvil, donde no cabe, una cinta más en la portada. Desde ahí, «‹ Menú» vuelve a la portada.
const LBM={t:0,sig:'',ti:null};
// v358 · flechas ‹ › para pasar solo por las tablas (era + amenaza) donde el jugador tiene puntuación (las que ha subido);
// empieza en la de su mejor partida y su fila va marcada (si no está en el top, sale debajo). Solo en esta clasificación pequeña.
function lbmTabs(){const B=lbBestGet(),m={};for(const k in B){const[e,a]=k.split('|').map(Number);if(!e)continue;if(e===2&&!(typeof era2Ok==='function'&&era2Ok()))continue;const t=e+'|'+a;m[t]=Math.max(m[t]||0,B[k]||0);}
 return Object.entries(m).sort((x,y)=>y[1]-x[1]).map(([k])=>k.split('|').map(Number));}
function lbmGo(d){const T=lbmTabs();if(T.length<2)return;LBM.ti=((LBM.ti||0)+d+T.length)%T.length;const[e,a]=T[LBM.ti];LBR.era=e;LBR.sel=a;LBR.err=0;LBM.t=0;try{sfx('page');}catch(_){}lbRankLoad().then(()=>lbmTick());lbmTick();}
function lbmTick(){try{const on=document.body.classList.contains('inmenu')&&LB.open&&LB.cover&&!document.body.classList.contains('mfs')&&innerWidth>=1100;let el=$('lbmside');
 if(!on){if(el)el.classList.remove('on');return;}
 if(!el){el=document.createElement('div');el.id='lbmside';document.body.appendChild(el);el.addEventListener('click',e=>{const ar=e.target.closest('[data-lbm]');if(ar){e.stopPropagation();lbmGo(+ar.dataset.lbm);return;}if(e.target.closest('[data-a="lbrank"]')){e.stopPropagation();try{sfx('page');}catch(_){}lbRankOpen();}});}
 {const T=lbmTabs();if(LBM.ti==null&&T.length){LBM.ti=0;LBR.era=T[0][0];LBR.sel=T[0][1];}}
 if(!LBR.era)LBR.era=ERA||1;const era=LBR.era;
 if(performance.now()-LBM.t>60000||!LBR.tiers[era]){LBM.t=performance.now();lbRankLoad();}
 const L=LBR.data[era+'|'+LBR.sel],me=lbPilot().toLowerCase(),hn=id=>(HEROES[id]&&HEROES[id].n)||id;
 const rows=LBR.err?'<p>No se ha podido cargar.</p>':!L?'<p>Cargando…</p>':!L.length?'<p>Aún no hay partidas. ¡Sé el primero!</p>':
  (()=>{const li=(r,i)=>`<li class="${r.nick.toLowerCase()===me?'me':''}"><b>${i+1}</b><span>${r.nick}<small>${hn(r.hero)} · Ronda ${r.round}${r.won?' ✓':''}</small></span><em>${fi(r.score)}</em></li>`,mi=me?L.findIndex(r=>r.nick.toLowerCase()===me):-1;
  return `<ol>${L.slice(0,8).map(li).join('')}${mi>=8?'<li class="gap">…</li>'+li(L[mi],mi):''}</ol>`;})();
 const TB=lbmTabs(),nm=`${ERADEF[era]&&(ERADEF[era].esc||'Era '+ERADEF[era].n)||''}${lbAmzOpen(era)&&LBR.sel?' · Amenaza '+LBR.sel:''}`;
 const h=`<h4>Clasificación<small>${TB.length>1?`${nm}<span class="lbmnav"><button class="lbmar" data-lbm="-1">‹</button><i>${(LBM.ti||0)+1} / ${TB.length}</i><button class="lbmar" data-lbm="1">›</button></span>`:nm}</small></h4>${rows}<button class="lbmall" data-a="lbrank">Ver toda la clasificación ›</button>`;
 if(h!==LBM.sig){LBM.sig=h;el.innerHTML=h;}
 el.classList.add('on');
 // centrado entre el borde izquierdo y el libro
 // v358: en pantallas grandes el panel lleva zoom (--uiz, desde v348) y left/top se multiplican por él: se calcula en píxeles de pantalla y se divide entre el zoom
 const z=parseFloat(getComputedStyle(el).zoom)||1,sw=el.offsetWidth*z,sh=el.offsetHeight*z;
 const bk=document.querySelector('#comp .lbcv')||document.querySelector('#comp .bkw');if(bk){const r=bk.getBoundingClientRect();el.style.left=Math.max(8,(r.left-sw)/2)/z+'px';el.style.top=Math.max(60,Math.min(innerHeight-sh-8,r.top+r.height/2-sh/2))/z+'px';}else{el.style.left=40/z+'px';el.style.top=Math.max(60,innerHeight/2-sh/2)/z+'px';}
 el.classList.add('on');}catch(e){}}
setInterval(lbmTick,300);
// móvil: cinta «Clasificación» en la portada del menú
{const _r=lbRender;lbRender=function(){const r=_r.apply(this,arguments);try{if(document.body.classList.contains('inmenu')&&LB.open&&LB.cover){const rb=document.querySelector('#comp .bkribs');const nv=document.querySelector('#comp .lbnov');if(nv&&document.body.classList.contains('mfs')&&!document.querySelector('#comp .lbnov.rk')){/* v349: en móvil, Novedades y Clasificación en la misma fila (abajo no cabía «Pantalla completa») */const w=document.createElement('div');w.className='lbnovrow';nv.parentNode.insertBefore(w,nv);w.appendChild(nv);w.insertAdjacentHTML('beforeend','<button class="lbnov rk" data-a="lbrank">🏆 Clasificación</button>');}if(rb&&!rb.querySelector('[data-a="lbrank"]'))rb.insertAdjacentHTML('beforeend',`<button class="bkrib" data-a="lbrank" title="Clasificación"><svg width="24" height="22" viewBox="0 0 24 22" fill="#f2cd62" stroke="#1b1712" stroke-width="1.4"><rect x="8.5" y="6" width="7" height="15"/><rect x="1.5" y="11" width="7" height="10" fill="#d9d2c2"/><rect x="15.5" y="14" width="7" height="7" fill="#d08a4a"/><path d="M12 1l1 2 2 .3-1.5 1.4.4 2.1L12 5.8l-1.9 1 .4-2.1L9 3.3l2-.3z"/></svg><span>Clasificación</span></button>`);}}catch(e){}return r;};}
// v350: el panel se oculta (o aparece) en el mismo momento en que el libro cambia de página, sin esperar al siguiente repaso (se quedaba un instante encima del compendio)
for(const fn of ['lbOpen','lbRender','lbClose']){const _f=window[fn];if(typeof _f!=='function')continue;window[fn]=function(){const r=_f.apply(this,arguments);try{lbmTick();}catch(e){}return r;};}
