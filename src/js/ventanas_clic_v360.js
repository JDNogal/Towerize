// ==================== v360 · Clics durante las animaciones de las ventanas y «Saltar» con confirmación (Nogal, 15-nov y 19-nov) ====================
// La gente salta las animaciones a base de clics. Para que un clic de más no elija una reliquia, una torre, una pieza u opción sin querer:
//  · mientras la ventana (cofre o paquete, oferta de torres, evento, elegir pieza) se está dibujando, el primer clic (o Intro/Espacio)
//    la acelera: todo sigue igual de fluido, pero el triple de rápido;
//  · los clics siguientes dentro de la ventana no hacen nada hasta que ha salido todo; entonces ya se puede elegir.
// Fuera de la ventana, el clic solo acelera. Es la misma regla para el pergamino (era 1), el dron (era 2) y el cofre.
// «Saltar» la oferta de torres: el primer clic lo marca («Pulsa otra vez para saltar») y el segundo salta.
const WLX=3;
const wlHost=()=>{const rl=$('relic');if(rl&&rl.classList.contains('open'))return rl;if(document.body.classList.contains('pcpick'))return $('panel');return null;};
// animaciones que están dibujando la ventana: las de una sola vez (no las que se repiten, como el balanceo de las cartas) y no las transiciones de pasar el ratón
function wlAnims(h){try{return document.getAnimations().filter(a=>{if(typeof CSSTransition!=='undefined'&&a instanceof CSSTransition)return false;
 const t=a.effect&&a.effect.target;if(!t||!h.contains(t))return false;const ti=a.effect.getComputedTiming();if(ti.iterations===Infinity||!isFinite(ti.endTime))return false;
 return a.playState==='running'||a.playState==='pending';});}catch(e){return [];}}
// el pergamino de la era 1 se dibuja con su propio reloj (pergamino_nuevo.js): ha terminado cuando la última carta está entera
const wlPg=h=>{const o=typeof PGF!=='undefined'&&PGF.on;return o&&o.h&&(o.h===h||h.contains(o.h))?o:null;};
const wlPgEnd=o=>{let n=1;try{n=pgCfg[o.kind].cards(o.h).length||1;}catch(e){}return 2.55+.8+.2*(n-1)+.05;};
function wlBusy(){const h=wlHost();if(!h)return false;/* ya se ha elegido: la salida del cofre va a su aire */if(typeof CFOUT!=='undefined'&&CFOUT.on)return false;const o=wlPg(h);if(o&&o.t0>0&&(performance.now()-o.t0)/1000<wlPgEnd(o))return true;return wlAnims(h).length>0;}
function wlAccel(h){if(!h)return;const o=wlPg(h);if(o&&!(o.spd>1)){o.spd=WLX;o.lastN=performance.now();}
 for(const a of wlAnims(h))try{if(a.playbackRate!==WLX){if(a.updatePlaybackRate)a.updatePlaybackRate(WLX);else a.playbackRate=WLX;}}catch(e){}}
// el reloj del pergamino corre WLX veces más deprisa una vez acelerado
{const _pt=pgTick;pgTick=function(now){const o=PGF.on;if(o&&o.spd>1&&o.t0>0){if(o.lastN!=null)o.t0-=(now-o.lastN)*(o.spd-1);o.lastN=now;}return _pt.apply(this,arguments);};}
/* mientras se dibuja se bloquea todo lo de la ventana (Nogal, 19-nov): también el fondo y los botones de mirar (mazo, reliquias, ojo, detalles); al acabar, todo vuelve a funcionar */
{const inWin=(e,h)=>!!(h&&e.target&&e.target.nodeType===1&&(h.contains(e.target)||e.target.closest('#pkbar')));
 const ptr=e=>{if(!e.isTrusted||!wlBusy())return;const h=wlHost();wlAccel(h);if(inWin(e,h))e.stopPropagation();};
 /* en window (y no en document) para ir antes que los demás que escuchan en captura, como la salida del cofre */
 for(const ty of ['pointerdown','mousedown','touchstart'])window.addEventListener(ty,ptr,true);
 window.addEventListener('click',e=>{/* los clics que lanza el propio juego (p. ej. al acabar la salida del cofre) pasan siempre */if(!e.isTrusted||!wlBusy())return;const h=wlHost();wlAccel(h);if(inWin(e,h)){e.stopPropagation();e.preventDefault();}},true);
 window.addEventListener('keydown',e=>{if(!e.isTrusted)return;if(!(e.key==='Enter'||e.key===' '||e.key==='Spacebar'||/^[1-9]$/.test(e.key)))return;if(!wlBusy())return;wlAccel(wlHost());e.stopPropagation();e.preventDefault();},true);}
// «Saltar» con confirmación: devuelve true si este clic solo lo ha marcado
function skArm(b){if(!b)return false;if(b.dataset.arm==='1')return false;b.dataset.arm='1';b.dataset.lbl=b.innerHTML;b.classList.add('skarm');b.innerHTML='Pulsa otra vez para saltar';
 try{sfx('ui');}catch(e){}clearTimeout(b._skT);b._skT=setTimeout(()=>{if(b.isConnected&&b.dataset.arm==='1'){b.dataset.arm='';b.classList.remove('skarm');b.innerHTML=b.dataset.lbl;}},4000);return true;}
