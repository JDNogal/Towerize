// ==================== v305 · Recompensa de evento al acabar la oleada ====================
// Si al acabar la oleada toca colocar una torre de evento (p. ej. la casa de los cerditos), primero se coloca la torre (fase «reward»)
// y después empieza la ronda siguiente (colocar pieza, ofertas…). Antes se mezclaban las dos cosas y la pieza nueva no se podía poner.
function uqFinish(){if(!S||S.phase!=='reward')return;S.uqNR=0;S.aim=null;nextRound();dragonGrow();}
{const _u=uPlaceAt;uPlaceAt=function(c){const r=_u.apply(this,arguments);try{if(S.phase==='reward'&&!S.uq.length)uqFinish();}catch(e){}return r;};}
// por si algo quita el modo de colocar (Esc, un menú…): se vuelve a pedir el hueco; si ya no queda nada, sigue la partida
{const _r=relicTick;relicTick=function(){const r=_r.apply(this,arguments);try{if(S&&S.phase==='reward'&&!RL.open){if(!S.uq||!S.uq.length)uqFinish();else if(S.aim!=='uplace')startUPlace();}}catch(e){}return r;};}
