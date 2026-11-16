// ==================== v342 · Moneda: +20% de todo el oro que recibes (v353: antes +50%) ====================
// Nogal (15-nov): antes solo daba +50% del oro de los enemigos. Ahora cualquier oro que entra (enemigos, eventos, reliquias, intereses…)
// sube un 20% (v353; era +50% y se elegía siempre: elección falsa) mientras el pasivo esté activo. No cuenta lo que recuperas al vender o deshacer una torre (si no, construir y deshacer daría oro).
let GNOX=0;const COINM=1.2;
function coinHook(st){if(!st||st.__gh)return;let v=+st.gold||0;
 Object.defineProperty(st,'__gh',{value:1,enumerable:false});
 Object.defineProperty(st,'gold',{configurable:true,enumerable:true,get(){return v;},set(n){n=+n;try{if(n>v&&!GNOX&&st===S&&st.relics&&st.rs&&rp('coin'))n=v+Math.round((n-v)*COINM);}catch(e){}v=n;}});}
{const _s=sell;sell=function(){GNOX++;try{return _s.apply(this,arguments);}finally{GNOX--;}};}
setInterval(()=>{try{if(typeof S!=='undefined'&&S&&S.relics&&S.relics.includes('coin'))coinHook(S);}catch(e){}},200);
{const _g=gainRelic;gainRelic=function(id){const r=_g.apply(this,arguments);try{if(id==='coin')coinHook(S);}catch(e){}return r;};}
