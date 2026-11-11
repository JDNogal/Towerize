// ==================== v307 · Tope de bufadores por oleada ====================
// Una oleada repite unos pocos tipos de escuadra; si uno lleva bufador (Tamborilero, Portador de sellos, Tecnomante, Tejedor),
// salía en una de cada tres o cuatro escuadras y parecía que toda la oleada venía bufada. Ahora, como mucho, 1 grupo bufado
// por oleada hasta la ronda 10, 2 hasta la 15 y 3 después; en el resto el bufador se cambia por el enemigo normal de su facción.
// En la última ronda se permite uno más, para que la escolta del jefe final conserve el suyo.
const BUFSWAP={custodian:'norm',seal:'minion',techm:'auto',weaver:'drone'};
const bufCap=r=>(r<=10?1:r<=15?2:3)+(r>=ROUNDS?1:0);
{const _sp=spawnEnemy;spawnEnemy=function(t,p,fo){
 if(BUFSWAP[t]&&!S.tut){
  if(!S.bufW||S.bufW.r!==S.round)S.bufW={r:S.round,g:new Set()};
  const g=fo?(p.x+'.'+p.y+'.'+S.round+'.'+fo.sid):'solo'+(S.bufW.n=(S.bufW.n||0)+1);
  if(!S.bufW.g.has(g)){if(S.bufW.g.size<bufCap(S.round))S.bufW.g.add(g);else t=BUFSWAP[t];}}
 return _sp.call(this,t,p,fo);};}
