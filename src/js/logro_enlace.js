// ==================== v305 · Logros que se piden en otros sitios: clic al compendio y fijar ====================
// Donde se pide un logro (héroe bloqueado, torre por desbloquear, cosméticos…), el texto lleva a ese logro en 🏆 Logros.
// Si el logro está oculto, lleva igual (allí sigue saliendo como «???», no se desvela nada). Si ya se ve y no lo tienes, 📌 lo fija.
function achLink(id,fallback){const A=ACH[id];if(!A)return fallback||'';const f=achFound(id),got=!!ACHS[id],pin=PINS.includes(id);
 return `<span class="achlk"><button class="bklink" data-a="cachgo" data-v="${id}" title="Ver en Logros">${f?`🏆 <b>${A.n}</b>: ${A.d}`:'🏆 Un logro oculto: sigue jugando para descubrirlo.'}</button>`+
  (f&&!got?`<button class="pinb${pin?' on':''}" data-a="apin" data-id="${id}" title="${pin?'Quitar de fijados':'Fijar para seguirlo en partida'}">📌${pin?' Fijado':' Fijar'}</button>`:'')+`</span>`;}
// volver a donde estabas (p. ej. la elección de héroe) al salir de Logros con «atrás»
{const _g=cpGo;cpGo=function(t,v){const from=LB.open&&!LB.cover?LB.area:null,tab=CP.tab,win=RL.open&&RL.hpick;const r=_g.apply(this,arguments);try{if(from==='prep'||from==='op'||(from==='cp'&&t==='lg')){LB.ret=from;LB.retTab=tab;}else if(win&&LB.open)LB.fromWin=1;}catch(e){}return r;};}
{const _b=lbBack;lbBack=function(){if(LB.ret&&LB.open&&(LB.area==='lg'||LB.area==='cp')){const r=LB.ret;LB.ret=0;if(r==='cp'&&LB.retTab){CP.tab=LB.retTab;CP.pageR=true;}lbOpen(r);return;}LB.ret=0;return _b.apply(this,arguments);};}
// ---- el libro vuelve a donde estabas: si lo abriste jugando (desde una pista, una ficha, el 📖…), al cerrarlo vuelves a la partida, no a la pausa ----
{const _o=lbOpen;lbOpen=function(area,cover){try{if(!LB.open)LB.orig=cover?'pause':(lbInGame()?'game':'menu');else if(cover)LB.orig='pause';}catch(e){}return _o.apply(this,arguments);};}
{const _b=lbBack;lbBack=function(){try{if(LB.open&&!LB.cover&&!LB.ret&&!LB.fromWin&&LB.orig==='game'&&!['prep','msg','end'].includes(LB.area)&&!(LB.end&&S&&(S.phase==='won'||S.phase==='lost'))){LB.orig=0;lbClose(true);return;}}catch(e){}return _b.apply(this,arguments);};}
// ---- mecánicas sin spoilers: las que solo trae una especialización no se descubren por ver la torre, sino al alcanzar esa especialización ----
{const BASE={burn:['sala','flame'],poison:['poison','acid'],brk:['acid'],slow:['frost','straw'],push:['sonic','wood'],chain:['tesla'],beam:['orb','laser'],vc:['laser'],mag:['bunker']};
 const SPM={burn:{monk:['drunk']},poison:{arrow:['rapid']},bleed:{cannon:['mnr'],bastion:['ass'],bunker:['sup']},ez:{tesla:['ele']},brk:{cata:['treb'],poison:['alch'],nano:['devour'],sala:['forge']},
  slow:{sonic:['spk']},freeze:{frost:['hel','vent']},stun:{tesla:['cad'],cata:['treb','ogre'],laser:['red','volt'],sonic:['spk']},daze:{sonic:['giant']},sticky:{cata:['treb']},flam:{cata:['treb']},
  wet:{augur:['lord']},cursed:{orb:['foco']},poly:{orb:['foco']},fear:{orb:['reap']},mark:{arrow:['xbow']},inf:{nano:['hack']},lmk:{bunker:['nido']},push:{cannon:['art']}};
 for(const id in MECUSE){MECUSE[id]=MECUSE[id].flatMap(r=>{const[t,k]=r.split(':');if(t!=='tw'||(BASE[id]||[]).includes(k))return[r];const sp=SPM[id]&&SPM[id][k];return sp&&sp.length?sp.filter(x=>SPECS[k]&&SPECS[k][x]).map(x=>'tw:'+k+':'+x):[r];});}}
// ---- logros fijados a la vista en partida, solo con el mapa a la vista (no encima del libro ni de las ventanas): arriba a la izquierda, junto al menú y «Reintentar» (antes solo se veían en el compendio) ----
function pinbarTick(){let el=$('pinbar');if(!el){el=document.createElement('div');el.id='pinbar';document.body.appendChild(el);
  el.addEventListener('click',e=>{const r=e.target.closest('[data-pin]');if(r){e.stopPropagation();if(MFSQ()&&!el.classList.contains('open')){el.classList.add('open');return;}cpGo('lg',r.dataset.pin);el.classList.remove('open');return;}if(e.target.closest('.pbt')){e.stopPropagation();el.classList.toggle('open');}});}
 const ids=PINS.filter(id=>ACH[id]&&!ACHS[id]),B=document.body.classList,mapa=!LB.open&&(!RL.open||RL.peek)&&(!B.contains('pcpick')||B.contains('pcpeek'))&&!(typeof NEC!=='undefined'&&NEC.open)&&!(typeof FO!=='undefined'&&FO.open)&&!(typeof PMU!=='undefined'&&PMU.open)&&!(typeof DLG!=='undefined'&&DLG.on),on=ids.length>0&&inRun()&&!PREVIEWING&&mapa;el.classList.toggle('on',on);if(!on){el.dataset.sg='';return;}
 const m=$('mtl');if(m){const r=m.getBoundingClientRect();el.style.left=Math.round(r.right+8)+'px';el.style.top=Math.round(r.top)+'px';}
 const row=id=>{const A=ACH[id],M=APM[id];let v=null,mx=null;try{if(M){mx=M.max;v=M.cur?M.cur():M.best?Math.max((S.gbest||{})[id]||0,0):null;}}catch(e){}
  const sec=achSec(id);return `<button class="pnr" data-pin="${id}" title="Ver en Logros"><b>📌 ${sec?'???':A.n}</b>${v!=null&&mx?`<span class="pnb"><i style="width:${Math.min(100,v/mx*100)}%"></i></span><small>${Math.min(mx,v)}/${mx}</small>`:''}</button>`;};
 const h=`<button class="pbt" title="Logros fijados">📌<small>${ids.length}</small></button><div class="pnl">${ids.map(row).join('')}</div>`;if(el.dataset.sg!==h){el.dataset.sg=h;el.innerHTML=h;}}
setInterval(()=>{try{pinbarTick();}catch(e){}},400);
