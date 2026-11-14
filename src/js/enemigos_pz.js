// ==================== v327 · Los enemigos de cada era entran poco a poco ====================
// Nogal (14-nov-2026): en las 3 partidas en que consigues las piezas de una era, los enemigos van entrando:
// partida 1 (0 piezas) lo básico, partida 2 (1 pieza) los que piden táctica, partida 3 (2 piezas) los más duros; con la 3.ª pieza, todo.
// Cada tipo y cada escuadra lleva `pz` (1, 2 o 3). Las eras nuevas solo tienen que ponérselo. Propuesta aprobada: «Enemigos que entran poco a poco».
// Los ascensos por ronda (veterano, caudillo…) y los jefes de cada pieza no cambian. PZCHAMP: si algún día los campeones se quitan de la partida 1.
const PZCHAMP=false;
function pzMax(){if(typeof S==='undefined'||!S||S.tut)return 3;const n=(S.era===2?(STO.bb||0):(STO.p||0));return n>=3?3:n+1;}
function pzOk(z){return (z||1)<=pzMax();}
{const T={
 // Era Fantástica
 runner:2,raider:2,shaman:2,javelin:2,acolyte:2,seal:2,harpy:2,hknight:2,wander:2,
 armored:3,warlock:3,griffin:3,raptor:3,
 // Era Distópica
 techm:2,hack:2,spit:2,bioal:2,brutep:2,mutant:2,carrier:2,
 titan:3,rocket:3,glider:3,psy:3,weaver:3,manta:3};
 for(const k in T)if(ET[k])ET[k].pz=T[k];
 const Q={caza:2,saqueo:2,falange:2,bombardeo:2,conclave:2,circulo:2,vuelo:2,ogros:3,horda:3,aquelarre:3,skyraid:3,pentagrama:3,
  falange2:2,intrusion:2,escupitajo:2,colmena:2,bateria:3,linea:3,bandada:3,coro:3,abismo:3};
 for(const k in Q)if(SQUADS[k])SQUADS[k].pz=Q[k];
 // una escuadra no puede traer un tipo de una partida posterior a la suya
 for(const k in SQUADS){const s=SQUADS[k];let z=s.pz||1;for(const t in s.m||{})z=Math.max(z,(ET[t]&&ET[t].pz)||1);s.pz=z;}}
