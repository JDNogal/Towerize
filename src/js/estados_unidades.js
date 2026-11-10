// ---- v297 · Estados en tus unidades: los enemigos empiezan a usar los mismos estados que tus torres ----
// Mismo estado, mismas reglas: el veneno de una unidad funciona igual que el de un enemigo (stacks de POISD s, daño elemental por segundo,
// ignora la armadura). Queda preparado para añadir más adelante quemadura, hipotermia o congelación sobre tus unidades (UST).
// · Escupidor: cada escupitajo deja stacks de veneno en la unidad a la que da.
const UST={poison:{n:'Veneno',col:'#7bd34a'}};
function uAddPois(s,w,src){if(!s||s.hp<=0||w<=0)return;if(s.H&&s.H.inv>0)return;(s.ps=s.ps||[]).push({w,t:POISD,src});}
function uStatusTick(dt){for(const t of unitTowers())for(const s of t.sd){if(!s.ps||!s.ps.length)continue;if(s.hp<=0){s.ps=[];continue;}
  let dp=0;for(const q of s.ps){dp+=q.w;q.t-=dt;}const src=s.ps[s.ps.length-1].src;hitUnit(s,dp*dt,src);s.ps=s.ps.filter(q=>q.t>0);}}
{const _u=update;update=function(dt){_u(dt);if(!S)return;if(S.phase==='wave')uStatusTick(dt);else if(S.list)for(const t of unitTowers())for(const s of t.sd||[])if(s.ps&&s.ps.length)s.ps=[];};}
Object.assign(ET.spit,{upois:1.5,ud:2});
MECUSE.poison=(MECUSE.poison||[]).concat(['en:spit']);
{const _k=kwHtml0;kwHtml0=function(id,src){const h=_k(id,src);if(id==='poison'&&h)return h.replace(/<\/small>$/,' Algunos enemigos, como el Escupidor, también envenenan a tus unidades: les funciona igual.</small>');return h;};}
ETIP.spit='Escupe ácido que envenena a tus unidades (cada golpe añade veneno durante 3 s): quítalo pronto o no dejes unidades a su alcance.';
