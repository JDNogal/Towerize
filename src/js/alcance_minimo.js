// ==================== v304 · Alcance de las torres a distancia ====================
// Los solares los pone el juego: con poco alcance una torre a distancia apenas llega a la pieza de al lado
// (medido en mapas reales: con 2,2 casillas solo el 11 % de los solares alcanza otra pieza; con 3, el 35 %; con 3,4, el 70 %).
// Todas suben a un mínimo de 3 casillas en Nv 1, pero se respeta el orden: las de más alcance siguen teniendo más
// (nuevo = 3 + (antes − 2,2) / 2: Lanzallamas 2,2 → 3 · Arqueros 2,8 → 3,3 · Envenenadora 3 → 3,4). Sus niveles y especializaciones
// suben en proporción y pierden algo de daño a cambio (÷ √ de lo que crece el alcance). Las unidades y las de apoyo no cambian.
const RANGE_OLD={};
for(const k in TW){const T=TW[k];if(!T||T.unit||T.support||T.uniq||T.guild||T.ev||!(T.range>0))continue;
 /* TW.range ya está en subcasillas (casillas × K) */const old=T.range/K,nw=Math.max(old,3+(old-2.2)/2);if(nw<=old+1e-6)continue;
 const f=nw/old;RANGE_OLD[k]=+old.toFixed(2);T.range=nw*K;if(T.dmg>0)T.dmg=+(T.dmg/Math.sqrt(f)).toFixed(2);}
