// ==================== v305 · Pendientes de eventos ====================
// Lo que un evento te ha dejado a deber y aún no ha llegado: oro de la cámara, élites de encargo, la Mamá dragona,
// enemigos extra de esta oleada, casas por defender, la torre a mitad de precio, el cofre de 4 reliquias…
// Sale en la columna izquierda, justo encima del contador de enemigos (o en su sitio si está desactivado), con la cuenta atrás en rondas.
const EVP={sg:''};
const evpWhen=d=>d<=0?'esta ronda':d===1?'la próxima ronda':'en '+d+' rondas';
// lo que los eventos añaden a la oleada que está por salir
function evpNow(it){if(!S)return;if(!S.evNow||S.evNow.r!==S.round)S.evNow={r:S.round,L:[]};S.evNow.L.push(it);}
{const _a=addNow;addNow=function(k,v){const r=_a.apply(this,arguments);try{const E=ET[k]||{};evpNow({k:'add',t:k,n:v,ic:enIc(k)?icHtml(enIc(k)):'💀',tx:(v>1?v+' × ':'')+(E.n||k)+' extra'});}catch(e){}return r;};}
{const _m=moreEnemies;moreEnemies=function(f){const r=_m.apply(this,arguments);try{evpNow({k:'more',ic:'💀',tx:'+'+Math.round(f*100)+'% enemigos'});}catch(e){}return r;};}
{const _l=lessEnemies;lessEnemies=function(f){const r=_l.apply(this,arguments);try{evpNow({k:'less',ic:'🕯',tx:'−'+Math.round(f*100)+'% enemigos'});}catch(e){}return r;};}
function evpList(){const o=[];if(!S||S.tut||PREVIEWING||S.pvE||S.pvH)return o;const bld=S.phase==='build',wave=S.phase==='wave';if(!bld&&!wave)return o;
 const enIcH=k=>enIc(k)?`<i class="emi" style="background:${ET[k]?ET[k].col:'#888'}">${icHtml(enIc(k))}</i>`:'💀';
 // enemigos programados por un evento para dentro de unas rondas
 for(const sc of S.sched||[]){const d=sc.r-S.round;if(d<0||(d===0&&!bld))continue;for(const k in sc.add){const n=sc.add[k];if(!(n>0))continue;
  const nm=k==='wanted'?'Élite de encargo':(ET[k]||{}).n||k;o.push({ic:enIcH(k==='wanted'?'elite':k),tx:(n>1?n+' × ':'')+nm,w:evpWhen(d),d,bad:1});}}
 // enemigos añadidos a esta oleada (solo mientras aún no ha empezado)
 if(bld&&S.evNow&&S.evNow.r===S.round){const agg={};for(const it of S.evNow.L){if(it.k==='add'){const a=agg[it.t]=agg[it.t]||{ic:enIcH(it.t),n:0,nm:(ET[it.t]||{}).n||it.t};a.n+=it.n;}else o.push({ic:it.ic,tx:it.tx,w:'esta ronda',d:0,bad:it.k!=='less'});}
  for(const k in agg){const a=agg[k];o.push({ic:a.ic,tx:(a.n>1?a.n+' × ':'')+a.nm+' extra',w:'esta ronda',d:0,bad:1});}}
 // oro guardado en la cámara criogénica
 if(S.bank&&S.bank.g>0){const d=Math.max(1,S.bank.at-S.round);o.push({ic:'🏦',tx:`<span class="gd">+${S.bank.g} 🪙</span> de la cámara`,w:evpWhen(d),d});}
 // casas defendidas: la torre se cobra al acabar la oleada
 for(const p of S.pend||[]){if(p.r<S.round)continue;for(const ty of p.towers||[])if(TW[ty])o.push({ic:twIc(ty),tx:TW[ty].n,w:'al acabar la oleada',d:0});}
 if(S.half)o.push({ic:'🏷',tx:'Próxima torre a mitad de precio',w:'',d:99});
 if(S.chest4&&!(typeof r3On==='function'&&r3On('starmap')))o.push({ic:'🎁',tx:'Próximo cofre: 4 reliquias',w:'',d:99});
 return o.sort((a,b)=>a.d-b.d);}
function evpTick(){let el=document.getElementById('evpend');
 const on=S&&!document.body.classList.contains('inmenu')&&!PREVIEWING;const L=on?evpList():[];
 if(!L.length){if(el)el.classList.remove('on');EVP.sg='';return;}
 const st=lstack();if(!el){el=document.createElement('div');el.id='evpend';}
 const em=document.getElementById('emap');if(el.parentNode!==st||(em&&em.parentNode===st&&el.nextSibling!==em)){if(em&&em.parentNode===st)st.insertBefore(el,em);else st.prepend(el);}
 const sg=L.map(x=>x.tx+'|'+x.w).join('§');if(sg!==EVP.sg){EVP.sg=sg;
  el.innerHTML=`<div class="emh">⏳ Pendiente</div>`+L.map(x=>`<div class="evp${x.bad?' bad':''}"><span class="evpi">${x.ic}</span><span class="evpt"><span>${x.tx}</span>${x.w?`<small>${x.w}</small>`:''}</span></div>`).join('');}
 el.classList.add('on');}
if(typeof window!=='undefined')setInterval(()=>{try{evpTick();}catch(e){}},400);
