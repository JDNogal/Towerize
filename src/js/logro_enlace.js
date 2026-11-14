// ==================== v305 · Logros que se piden en otros sitios: clic al compendio y fijar ====================
// Donde se pide un logro (héroe bloqueado, torre por desbloquear, cosméticos…), el texto lleva a ese logro en 🏆 Logros.
// Si el logro está oculto, lleva igual (allí sigue saliendo como «???», no se desvela nada). Si ya se ve y no lo tienes, 📌 lo fija.
function achLink(id,fallback,compact){const A=ACH[id];if(!A)return fallback||'';const f=achFound(id),got=!!ACHS[id],pin=PINS.includes(id);
 return `<span class="achlk${compact?' achc':''}"><button class="bklink" data-a="cachgo" data-v="${id}" title="Ver en Logros">${compact?`🏆 ${f?A.n:'Logro oculto'}`:f?`🏆 <b>${A.n}</b>: ${A.d}`:'🏆 Un logro oculto: sigue jugando para descubrirlo.'}</button>`+
  (f&&!got?`<button class="pinb${pin?' on':''}" data-a="apin" data-id="${id}" title="${pin?'Quitar de fijados':'Fijar para seguirlo en partida'}">📌${pin?' Fijado':' Fijar'}</button>`:'')+`</span>`;}
// volver a donde estabas (p. ej. la elección de héroe) al salir de Logros con «atrás»
{const _g=cpGo;cpGo=function(t,v){const from=LB.open&&!LB.cover?LB.area:null,tab=CP.tab,win=RL.open&&RL.hpick;const r=_g.apply(this,arguments);try{if(from==='prep'||from==='op'||(from==='cp'&&t==='lg')){LB.ret=from;LB.retTab=tab;}else if(win&&LB.open)LB.fromWin=1;}catch(e){}return r;};}
{const _b=lbBack;lbBack=function(){if(LB.ret&&LB.open&&(LB.area==='lg'||LB.area==='cp')){const r=LB.ret;LB.ret=0;if(r==='cp'&&LB.retTab){CP.tab=LB.retTab;CP.pageR=true;}lbOpen(r);return;}LB.ret=0;return _b.apply(this,arguments);};}
// ---- el libro vuelve a donde estabas: si lo abriste jugando (desde una pista, una ficha, el 📖…), al cerrarlo vuelves a la partida, no a la pausa ----
{const _o=lbOpen;lbOpen=function(area,cover){try{if(!LB.open)LB.orig=cover?'pause':(lbInGame()?'game':'menu');else if(cover)LB.orig='pause';}catch(e){}return _o.apply(this,arguments);};}
{const _b=lbBack;lbBack=function(){try{if(LB.open&&!LB.cover&&!LB.ret&&!LB.fromWin&&LB.orig==='game'&&!['prep','msg','end'].includes(LB.area)&&!(LB.end&&S&&(S.phase==='won'||S.phase==='lost'))){LB.orig=0;lbClose(true);return;}}catch(e){}return _b.apply(this,arguments);};}
// ---- mecánicas sin spoilers: las que solo trae una especialización no se descubren por ver la torre, sino al alcanzar esa especialización ----
{const BASE={burn:['sala','flame'],poison:['poison','acid'],brk:['acid'],slow:['frost','straw'],push:['sonic','wood'],chain:['tesla'],beam:['orb','laser'],vc:['laser'],mag:['bunker']};
 const SPM={burn:{monk:['drunk']},poison:{arrow:['rapid']},bleed:{cannon:['bomb'],bastion:['ass'],bunker:['sup']},ez:{tesla:['ele']},brk:{cata:['treb'],poison:['alch'],nano:['devour'],sala:['forge']},
  slow:{sonic:['spk']},freeze:{frost:['hel','vent']},stun:{tesla:['cad'],cata:['treb','ogre'],laser:['red','volt'],sonic:['spk']},daze:{sonic:['giant']},sticky:{cata:['treb']},flam:{cata:['treb']},
  wet:{augur:['lord']},cursed:{orb:['foco']},poly:{orb:['foco']},fear:{orb:['reap']},mark:{arrow:['xbow']},inf:{nano:['hack']},lmk:{bunker:['nido']}};
 for(const id in MECUSE){MECUSE[id]=MECUSE[id].flatMap(r=>{const[t,k]=r.split(':');if(t!=='tw'||(BASE[id]||[]).includes(k))return[r];const sp=SPM[id]&&SPM[id][k];return sp&&sp.length?sp.filter(x=>SPECS[k]&&SPECS[k][x]).map(x=>'tw:'+k+':'+x):[r];});}}
// ---- logros fijados a la vista en partida, solo con el mapa a la vista (no encima del libro ni de las ventanas): arriba a la izquierda, junto al menú y «Reintentar» (antes solo se veían en el compendio) ----
function pinbarTick(){let el=$('pinbar');if(!el){el=document.createElement('div');el.id='pinbar';document.body.appendChild(el);
  el.addEventListener('click',e=>{const r=e.target.closest('[data-pin]');if(r){e.stopPropagation();if(MFSQ()&&!el.classList.contains('open')){el.classList.add('open');return;}cpGo('lg',r.dataset.pin);el.classList.remove('open');return;}if(e.target.closest('.pbt')){e.stopPropagation();el.classList.toggle('open');}});}
 const ids=PINS.filter(id=>ACH[id]&&!ACHS[id]),B=document.body.classList,mapa=!LB.open&&(!RL.open||RL.peek)&&(!B.contains('pcpick')||B.contains('pcpeek'))&&!(typeof NEC!=='undefined'&&NEC.open)&&!(typeof FO!=='undefined'&&FO.open)&&!(typeof PMU!=='undefined'&&PMU.open)&&!(typeof DLG!=='undefined'&&DLG.on),rl=$('relic'),dom=!B.contains('lbopen')&&!B.contains('inmenu')&&!(rl&&rl.classList.contains('open')&&!RL.peek),want=ids.length>0&&inRun()&&!PREVIEWING&&mapa&&dom;
 /* sin parpadeos: se oculta al momento, pero solo vuelve a salir si sigue tocando 0,6 s seguidos */
 if(!want){el._ok=0;el.classList.remove('on');el.dataset.sg='';return;}el._ok=(el._ok||0)+1;if(el._ok<2)return;el.classList.add('on');
 /* sitio reservado: a la derecha del segundo botón de arriba a la izquierda (↺); la fila del ☰ es para los FPS */const bs=document.querySelectorAll('#mtl button'),b2=bs[1]||bs[0];if(b2){const r=b2.getBoundingClientRect();el.style.left=Math.round(r.right+8)+'px';el.style.top=Math.round(r.top)+'px';}
 const row=id=>{const A=ACH[id],M=APM[id];let v=null,mx=null;try{if(M){mx=M.max;v=M.cur?M.cur():M.best?Math.max((S.gbest||{})[id]||0,0):null;}}catch(e){}
  const sec=achSec(id);return `<button class="pnr" data-pin="${id}" title="Ver en Logros"><b>📌 ${sec?'???':A.n}</b>${v!=null&&mx?`<span class="pnb"><i style="width:${Math.min(100,v/mx*100)}%"></i></span><small>${Math.min(mx,v)}/${mx}</small>`:''}</button>`;};
 const h=`<button class="pbt" title="Logros fijados">📌<small>${ids.length}</small></button><div class="pnl">${ids.map(row).join('')}</div>`;if(el.dataset.sg!==h){el.dataset.sg=h;el.innerHTML=h;}}
setInterval(()=>{try{pinbarTick();}catch(e){}},300);
// v305 · seguro: si el libro está cerrado y no se está cerrando, que no quede la marca «libro abierto» (ocultaba todos los bocadillos de palabras clave)
setInterval(()=>{try{const c=$('comp');if(!LB.open&&document.body.classList.contains('lbopen')&&!(c&&c.classList.contains('lbout')))document.body.classList.remove('lbopen');}catch(e){}},500);
// ---- Escuadra del arquitecto (activo): después de colocar la pieza, vuelves a elegir otra de las que quedan ----
{const _p=placePiece;placePiece=function(bx,by){const ex=S.extraPc&&S.offers&&S.offers.length>1,i=S.pi;const r=_p.apply(this,arguments);
 try{if(ex){S.extraPc=0;S.offers=S.offers.filter((o,j)=>j!==i);const can=S.offers.some(o=>{for(let k=0;k<4;k++){for(let y=0;y<BN;y++)for(let x=0;x<BN;x++)if(check(x,y,o.p)===0)return true;rotO(o);}return false;});
  if(can){S.phase='place';S.pi=null;S.msg='📐 Escuadra del arquitecto: coloca la segunda pieza.';ui();}}}catch(e){}return r;};}
// ---- «!» sobre un enemigo que lanza una habilidad (campeones): llama la atención sin llenar la pantalla de avisos ----
H2D.push((g,lw)=>{const X=v=>v*CS+CS/2,dt=1/60;for(const e of S.enemies){if(!(e.exc>0)||e.hp<=0)continue;e.exc-=dt;const a=Math.min(1,e.exc/.3),y=X(e.y)-CS*1.15-Math.sin((1.2-e.exc)*9)*1.5;
 g.save();g.globalAlpha=a;g.font='900 '+Math.round(CS*1.1)+'px system-ui,sans-serif';g.textAlign='center';g.textBaseline='middle';g.lineWidth=lw(3);g.strokeStyle='#1b1712';g.strokeText('!',X(e.x),y);g.fillStyle='#ffd23a';g.fillText('!',X(e.x),y);g.restore();}});
// ---- lo que tienes en la partida queda descubierto en el compendio al momento (reliquias de evento, torres del mazo, tu héroe…) ----
setInterval(()=>{try{if(typeof S==='undefined'||!S||!S.round||!SEEOK||PREVIEWING||S.pvE)return;for(const r of S.relics||[])if(RELIC[r])see('rl',r);for(const k of S.deck||[])if(TW[k])see('tw',k);for(const t of S.list||[])if(TW[t.type])see('tw',t.type);if(S.hero&&S.hero.id)see('hr',S.hero.id);if(typeof abSee==='function')for(const t of S.list||[])for(const id in t.ab||{})if(t.ab[id]>0&&AB[id])abSee(id);}catch(e){}},1000);
// v305 · al continuar una partida guardada también se descubren cosas (antes solo al empezar una nueva: el Martillo del herrero no aparecía en el compendio)
{const _l=loadRun;loadRun=function(){const r=_l.apply(this,arguments);try{if(r)SEEOK=true;}catch(e){}return r;};}
// ---- colocar la pieza con el teclado (Intro o Espacio) donde está el ratón, solo mientras colocas una pieza ----
addEventListener('keydown',e=>{try{if(!(e.key==='Enter'||e.key===' ')||e.repeat||typeof S==='undefined'||!S||S.phase!=='place'||S.pi==null)return;
 if(e.target&&/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;if(LB.open||RL.open||ctlBlocked()||!M.has)return;
 const el=document.elementFromPoint(M.x,M.y);if(el!==cv)return;e.preventDefault();e.stopImmediatePropagation();
 cv.dispatchEvent(new MouseEvent('click',{clientX:M.x,clientY:M.y,bubbles:true}));}catch(er){}},true);
// ---- criatura aliada (y cualquier unidad que se mueva como un héroe): al elegirla se ve su alcance, como con el héroe ----
H2D.push((g,lw)=>{if(!S||!S.ally||S.aim!=='ally')return;const s=S.ally.sd&&S.ally.sd[0];if(!s||s.hp<=0)return;const R=S.ally.alert||ALERT;
 g.save();g.fillStyle='rgba(90,180,255,.10)';g.strokeStyle='rgba(110,190,255,.85)';g.lineWidth=lw(1.5);g.beginPath();g.arc(s.x*CS+CS/2,s.y*CS+CS/2,R*CS,0,7);g.fill();g.stroke();g.restore();});
// v305: eventos que se desbloquean con un logro: en el compendio, si aún no lo tienes, sale el logro que lo desbloquea
{const _bd=bkDetail;bkDetail=function(t,id){const h=_bd.apply(this,arguments);try{if(t==='ev'&&typeof evLocked==='function'&&evLocked(id)&&!seen('ev',id))return h.replace('Aún no descubierto.','Aún no descubierto. Se desbloquea con un logro:')+`<div class="evlk">${achLink(EVLOCK[id],'',1)}</div>`;}catch(e){}return h;};}
