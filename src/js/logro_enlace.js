// ==================== v305 · Logros que se piden en otros sitios: clic al compendio y fijar ====================
// Donde se pide un logro (héroe bloqueado, torre por desbloquear, cosméticos…), el texto lleva a ese logro en 🏆 Logros.
// Si el logro está oculto, lleva igual (allí sigue saliendo como «???», no se desvela nada). Si ya se ve y no lo tienes, 📌 lo fija.
function achLink(id,fallback){const A=ACH[id];if(!A)return fallback||'';const f=achFound(id),got=!!ACHS[id],pin=PINS.includes(id);
 return `<span class="achlk"><button class="bklink" data-a="cachgo" data-v="${id}" title="Ver en Logros">${f?`🏆 <b>${A.n}</b>: ${A.d}`:'🏆 Un logro oculto: sigue jugando para descubrirlo.'}</button>`+
  (f&&!got?`<button class="pinb${pin?' on':''}" data-a="apin" data-id="${id}" title="${pin?'Quitar de fijados':'Fijar para seguirlo en partida'}">📌${pin?' Fijado':' Fijar'}</button>`:'')+`</span>`;}
// volver a donde estabas (p. ej. la elección de héroe) al salir de Logros con «atrás»
{const _g=cpGo;cpGo=function(t,v){const from=LB.open&&!LB.cover?LB.area:null,tab=CP.tab,win=RL.open&&RL.hpick;const r=_g.apply(this,arguments);try{if(from==='prep'||from==='op'||(from==='cp'&&t==='lg')){LB.ret=from;LB.retTab=tab;}else if(win&&LB.open)LB.fromWin=1;}catch(e){}return r;};}
{const _b=lbBack;lbBack=function(){if(LB.ret&&LB.open&&(LB.area==='lg'||LB.area==='cp')){const r=LB.ret;LB.ret=0;if(r==='cp'&&LB.retTab){CP.tab=LB.retTab;CP.pageR=true;}lbOpen(r);return;}LB.ret=0;return _b.apply(this,arguments);};}
