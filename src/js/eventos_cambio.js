// ==================== v358 · Eventos que no se pueden jugar bien se cambian por otro (Nogal, 15 y 17-nov) ====================
// Los eventos se reparten al crear la partida, pero en el mapa solo se ve «?»: qué evento es se decide de verdad al colocar la pieza
// encima (que es cuando se abre). Justo en ese momento se comprueba:
//  · si alguna opción está bloqueada por algo que el jugador no controla (la pieza no tiene casilla especial, el héroe ya está al máximo,
//    no tienes torres para el Herrero, no quedan huecos para el Faro, no queda solar libre…) → se cambia por otro evento;
//  · el oro y la vida, en cambio, son cosa del jugador: solo cambian el evento si entre los dos dejan menos de 2 opciones que elegir.
// Las opciones que se desbloquean con un logro («Se desbloquea…», como la de los cerditos) no cuentan como bloqueo.
// El evento nuevo sale de los que pueden salir en esta era, sin repetir en la partida y primero los que el jugador no ha visto nunca.
function evReqTxt(o){try{return typeof o.req==='function'?(o.req()||''):'';}catch(e){return '';}}
function evPlayable(id,bk){const E=EVENTS[id];if(!E||!E.opts)return false;const ek=EVK;EVK=bk;
 try{const g0=S.gold,h0=S.hp;let fixed=false;
  try{S.gold=1e9;S.hp=1e9;fixed=E.opts.some(o=>{const t=evReqTxt(o);return t&&!/^Se desbloquea/.test(t);});}finally{S.gold=g0;S.hp=h0;}
  if(fixed)return false;
  return E.opts.filter(o=>!evReqTxt(o)).length>=2;}
 finally{EVK=ek;}}
function evSwapFor(id,bk){if(!S||S.tut||!bk)return id;const E=EVENTS[id];if(!E||E.sub||evPlayable(id,bk))return id;
 const onMap=new Set(Object.values(S.evts||{})),played=S.evPlayed||{};
 const pool=Object.keys(EVENTS).filter(k=>k!==id&&evEraOk(k)&&!evLocked(k)&&!played[k]&&!onMap.has(k)&&evPlayable(k,bk));
 if(!pool.length)return id;
 const fresh=pool.filter(k=>!(typeof seen==='function'&&seen('ev',k))),L=fresh.length?fresh:pool;
 return L[Math.floor(Math.random()*L.length)];}
{const _o=openEvent;openEvent=function(id,bk){try{id=evSwapFor(id,bk);}catch(e){}return _o.call(this,id,bk);};}
