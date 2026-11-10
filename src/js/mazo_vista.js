// ==================== v304 · Ver tu mazo y tus reliquias mientras eliges (torre, reliquia, evento o pieza) ====================
// PC: dos paneles a los lados de la ventana (la hoja del mazo y el cofre de reliquias). Si no caben, o en móvil:
// dos botones redondos junto al ojo (baraja y cofre) que abren la lista. Todo es de consulta: bocadillo al pasar o mantener.
const MZ={pop:null};
const mzOn=()=>{if(typeof S==='undefined'||!S||!S.deck||(typeof LB!=='undefined'&&LB.open))return false;if(document.body.classList.contains('pcpick'))return !document.body.classList.contains('pcpeek');
 return !!(RL.open&&!RL.hpick&&!RL.peek&&$('relic').querySelector('.rlbar'));};
const mzDeck=()=>S.deck.map(k=>`<div class="mzrow" data-tip="shop:${k}" data-cpt="tw" data-cpv="${k}"><i style="background:${tinfo({type:k}).col}">${twIc(k)}</i><b>${TW[k].n}</b>${S.list.some(t=>t.type===k)?`<em>×${S.list.filter(t=>t.type===k).length}</em>`:''}</div>`).join('');
const mzRel=()=>S.relics.length?`<div class="mzgrid">${S.relics.map(id=>`<i data-tip="relic:${id}" data-cpt="rl" data-cpv="${id}">${icHtml(RELIC[id].ic)}</i>`).join('')}</div>`:'<div class="mzvac">Aún no tienes reliquias.</div>';
function mzSide(){let el=$('mzside');if(!el){el=document.createElement('div');el.id='mzside';el.innerHTML='<div class="mzd"></div><div class="mzr"></div>';document.body.appendChild(el);}
 const on=mzOn();el.classList.toggle('on',on);if(!on){document.body.classList.remove('mzbtn');mzClose();return;}
 // ¿caben a los lados de la ventana? (si no, botones)
 const win=document.body.classList.contains('pcpick')?$('panel'):($('relic').querySelector('.pscr,.evwin,.cgrid')||$('relic').firstElementChild);
 const r=win&&win.getBoundingClientRect?win.getBoundingClientRect():null,gap=r?Math.min(r.left,innerWidth-r.right):0,fit=!document.body.classList.contains('mfs')&&r&&r.width>0&&(gap>=150||(!TOUCH&&innerWidth>=900));if(fit)el.style.setProperty('--mzw',Math.round(Math.max(132,Math.min(168,gap-20)))+'px');
 /* ventanas que ocupan todo el ancho (cofre, eventos): en PC grande se estrechan para dejar sitio a los paneles */
 if(gap<150&&!TOUCH&&innerWidth>=1100&&!document.body.classList.contains('pcpick')&&win&&!win.dataset.mzcap){const zm=parseFloat(getComputedStyle($('relic').firstElementChild||win).zoom)||1;const g=$('relic').querySelector('.cgrid,.evwin')||win;g.dataset.mzcap=1;win.dataset.mzcap=1;g.style.maxWidth=Math.floor((innerWidth-370)/zm)+'px';g.style.marginLeft=g.style.marginRight='auto';return;}
 document.body.classList.toggle('mzbtn',!fit);
 const sg=S.deck.join()+'|'+S.relics.join()+'|'+S.list.length;if(el.dataset.sg!==sg){el.dataset.sg=sg;
  el.querySelector('.mzd').innerHTML=`<h4>Tu mazo<small>${S.deck.length}/${DECKMAX} torres</small></h4>${mzDeck()}`;
  el.querySelector('.mzr').innerHTML=`<h4>Cofre de reliquias<small>${S.relics.length} ${S.relics.length===1?'reliquia':'reliquias'}</small></h4>${mzRel()}`;}
 // botones junto al ojo
 const bar=$('relic').querySelector('.rlbar'),pk=document.querySelector('.pcpeek');
 const add=host=>{if(!host||host.querySelector('[data-mz]'))return;const eye=host.matches&&host.matches('.pcpeek')?null:host.querySelector('[data-a="peek"]');
  const mk=(k,ic,t)=>{const b=document.createElement('button');b.dataset.mz=k;b.className='mzb';b.title=t;b.innerHTML=ic;b.addEventListener('click',e=>{e.stopPropagation();e.preventDefault();mzOpen(k);});return b;};
  const d=mk('deck','🃏','Ver tu mazo'),rl=mk('rel','🧰','Ver tus reliquias');if(eye){host.insertBefore(d,eye);host.insertBefore(rl,eye);}else{host.appendChild(d);host.appendChild(rl);}};
 add(bar);if(pk&&document.body.classList.contains('pcpick')){let w=$('mzpk');if(!w){w=document.createElement('div');w.id='mzpk';pk.parentNode.insertBefore(w,pk);}add(w);}}
function mzOpen(k){mzClose();const p=document.createElement('div');p.id='mzpop';p.innerHTML=`<div class="mzbox ${k==='deck'?'mzd':'mzr'}"><button class="mzx" aria-label="Cerrar">✕</button>${k==='deck'?`<h4>Tu mazo<small>${S.deck.length}/${DECKMAX} torres · toca para ver su ficha; otra vez, para abrirla en el compendio</small></h4><div class="mzcols">${mzDeck()}</div>`:`<h4>Cofre de reliquias<small>Toca para ver qué hace; otra vez, para abrirla en el compendio</small></h4>${mzRel()}`}</div>`;
 p.addEventListener('click',e=>{if(e.target===p||e.target.closest('.mzx')){e.stopPropagation();mzClose();}});document.body.appendChild(p);MZ.pop=k;try{sfx('page');}catch(e){}}
function mzClose(){const p=$('mzpop');if(p)p.remove();MZ.pop=null;}
addEventListener('keydown',e=>{if(MZ.pop&&e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();mzClose();}},true);
// v305 · el botón del compendio de las ventanas va con los demás botones redondos (antes, cuadrado arriba a la izquierda y tapado por los FPS)
function wcompDock(){const rl=$('relic');if(!rl||!rl.classList.contains('open'))return;const w=rl.querySelector('.wcomp'),bar=rl.querySelector('.rlbar');if(!w||!bar||w.parentNode===bar)return;
 const eye=bar.querySelector('[data-a="peek"]');w.classList.add('wcd');if(eye)bar.insertBefore(w,eye);else bar.appendChild(w);}
setInterval(()=>{try{mzSide();}catch(e){}try{wcompDock();}catch(e){}},200);
// clic (o segundo toque en móvil): abre esa ficha en el compendio
{let last=null;document.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('#mzside [data-cpt],#mzpop [data-cpt]');if(!a){last=null;return;}
 if(TOUCH&&last!==a){last=a;return;}last=null;e.stopPropagation();e.preventDefault();const hp=$('hpop');if(hp)hp.style.display='none';mzClose();try{cpGo(a.dataset.cpt,a.dataset.cpv);if(LB.open)LB.fromWin=1;}catch(x){}},true);}
// v305 · las ventanas (oferta de torres, cofre, eventos) se encogen un poco si no caben a lo alto, para que no salga la barra de scroll del navegador
function relFit(){const rl=$('relic');if(!rl||!rl.classList.contains('open')||rl.querySelector('.toff'))return;if(!rl.firstElementChild)return;
 const kids=[...rl.children].filter(k=>!k.classList.contains('rlbar'));if(!kids.length)return;let tot=0;for(const k of kids)k.style.zoom='';
 const z=parseFloat(getComputedStyle(kids[0]).zoom)||1;const top=Math.min(...kids.map(k=>k.getBoundingClientRect().top)),bot=Math.max(...kids.map(k=>k.getBoundingClientRect().bottom));tot=bot-top;
 const room=innerHeight-48;if(tot>room){const nz=Math.max(.8,z*room/tot);for(const k of kids)k.style.zoom=String(nz);}}
setInterval(()=>{try{relFit();}catch(e){}},300);
// v305 · cartas de reliquia del cofre: los recuadros de pasivo (y los de activo) miden lo mismo en todas las cartas
function rcardAlign(){const rl=$('relic');if(!rl||!rl.classList.contains('open'))return;const cs=[...rl.querySelectorAll('.cgrid .rcard')];if(cs.length<2)return;
 for(const k of ['.rps','.rac']){const bx=cs.map(c=>c.querySelector(k)).filter(Boolean);if(bx.length<2)continue;bx.forEach(b=>b.style.minHeight='');const tops=new Set(bx.map(b=>Math.round(b.getBoundingClientRect().top)));
  const z=parseFloat(getComputedStyle(rl.querySelector('.cgrid')).zoom)||1;const h=Math.max(...bx.map(b=>b.getBoundingClientRect().height))/z;bx.forEach(b=>b.style.minHeight=Math.ceil(h)+'px');}}
setInterval(()=>{try{rcardAlign();}catch(e){}},300);
