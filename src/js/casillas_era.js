// ==================== v329 · Casillas especiales por era y casilla Rebote (Nogal, 14-nov-2026) ====================
// · Era 1, las básicas: 1.ª partida Alcance, Potencia, Frenesí y Codicia · 2.ª + Precisión y Expansión · 3.ª + Cuartel y Persistencia.
// · Era 2: 1.ª partida + Perforación y Taller · 2.ª + Eco · 3.ª + Rebote (nueva).
// · Como los enemigos (enemigos_pz.js): «partida» = piezas de esa era que ya tienes + 1. Las ★ entran con su casilla.
// · Una vez descubiertas salen en cualquier era (STO.bfz guarda hasta dónde has llegado en cada era).
// · Las de una era no alcanzada no salen en el compendio.
// · Casilla defectuosa (antes «maldita», Piezas corruptas) con el rojo de antes de Potencia; Potencia con el rojo intenso.
const BFZ={rng:[1,1],pow:[1,1],spd:[1,1],gold:[1,1],crt:[1,2],aoe:[1,2],cua:[1,3],per:[1,3],prf:[2,1],tal:[2,1],eco:[2,2],reb:[2,3]};
// Rebote: cada disparo que acierta salta a 1 enemigo cercano (★: a 2) con el 40 % del daño; la roca de la Catapulta rebota con su área.
// Los láseres también rebotan (Nogal): el rayo se refleja en el objetivo hacia el enemigo más cercano. Auras y unidades, no.
const REBM=.4,REBR=1.6;
BFICO.reb='<path d="M2.5 19.5L8 9l5 7 6.5-11.5"/><circle cx="19.5" cy="4.6" r="2.4" fill="currentColor"/><path d="M2 21.5h7" stroke-width="1.6"/>';
BF.reb={n:'Rebote',l:'B',col:'#a6d84a',reb:1,t:'Cada disparo que acierta <b>rebota</b> a un enemigo cercano con el <span class="cd">40%</span> del daño',note:'En torres que disparan proyectiles o láseres (el rayo se refleja). La roca de la Catapulta rebota con su área. No en auras ni en unidades.'};
BF['reb+']={...BF.reb,reb:2,t:'Cada disparo que acierta <b>rebota</b> a <b>2</b> enemigos cercanos con el <span class="cd">40%</span> del daño',sup:1,base:'reb'};
if(!BK.includes('reb'))BK.push('reb');
if(typeof BFSUP!=='undefined')BFSUP.reb={reb:2,t:BF['reb+'].t};
// colores: Potencia se queda el rojo intenso y la defectuosa el de antes de Potencia
BF.pow.col=BF['pow+'].col='#e0453a';
if(BF.cur){BF.cur.n='Casilla defectuosa';BF.cur.col='#e0605a';}
// hasta qué partida has llegado en cada era (1-3; 0 = aún no)
function bfzLv(e){const z=(STO.bfz=STO.bfz||{}),n=e===1?(STO.p||0):(STO.bb||0);let v=Math.max(z[e]||0,Math.min(3,n));
 if(typeof S!=='undefined'&&S&&!S.tut&&(S.era||1)===e&&typeof pzMax==='function')v=Math.max(v,pzMax());
 if(v>(z[e]||0)){z[e]=v;try{saveSto();}catch(_){}}return v;}
function bfPool(){if(typeof S!=='undefined'&&S&&S.tut)return BK.filter(k=>BFZ[k]&&BFZ[k][0]===1);
 const L=[bfzLv(1),bfzLv(2)],P=BK.filter(k=>{const z=BFZ[k];return !z||z[1]<=L[z[0]-1];});return P.length?P:BK.slice(0,4);}
rollBuff=function(){const P=bfPool(),k=P[Math.floor(Math.random()*P.length)];
 if(Math.random()<S.sup){S.sup=SUP0;return k+'+';}S.sup=Math.min(1,S.sup+SUPUP);return k;};
// compendio: las casillas de una era que aún no has alcanzado no aparecen
function bfEraOk(k){const z=BFZ[k];return !z||z[0]===1||(typeof era2Ok==='function'&&era2Ok());}
// Rebote: se llama al acertar un proyectil (update.js); los rebotes no vuelven a rebotar
function rebShot(p){const t=p.src;if(!t||p.rb||!t.cells||t.hero)return;const n=Math.floor(tileV(t,'reb',0));if(!n)return;
 const c=S.enemies.filter(e=>e!==p.e&&e.hp>0&&!(p.cata&&isFly(e))&&Math.hypot(e.x-p.x,e.y-p.y)<=REBR*K).sort((a,b)=>Math.hypot(a.x-p.x,a.y-p.y)-Math.hypot(b.x-p.x,b.y-p.y));
 for(let i=0;i<n&&i<c.length;i++)(S.rbq=S.rbq||[]).push({x:p.x,y:p.y,e:c[i],tx:c[i].x,ty:c[i].y,vx:0,vy:0,dm:p.dm*REBM,dt:p.dt,src:t,sp:Math.max(8,(p.sp||12)*.8),area:p.area||0,slow:p.slow||0,slowt:p.slowt,pen:p.pen,col:p.col||'#a6d84a',rb:1});}
{const _u=update;update=function(dt){const r=_u.apply(this,arguments);try{if(S&&S.rbq&&S.rbq.length){S.proj.push(...S.rbq);S.rbq=[];}}catch(e){}return r;};}
// láser: el rayo se refleja en su objetivo y hace el 40 % de su daño al más cercano (★: a los 2 más cercanos)
function rebNear(t,from,n,noFly){return S.enemies.filter(e=>e!==from&&e.hp>0&&!(noFly&&isFly(e))&&Math.hypot(e.x-from.x,e.y-from.y)<=REBR*K).sort((a,b)=>Math.hypot(a.x-from.x,a.y-from.y)-Math.hypot(b.x-from.x,b.y-from.y)).slice(0,n);}
function rebBeam(t,tg,dm,dt,pen){if(!t||!t.cells||t.hero)return;const n=Math.floor(tileV(t,'reb',0));if(!n)return;const L=rebNear(t,tg,n);
 for(const e of L)hurt(e,dm*REBM,t,dt,pen);t.rbB={a:tg,L,u:(S.wt||0)+.15};}
{const _d=e2DrawWorld;e2DrawWorld=function(lw){const r=_d.apply(this,arguments);try{if(S&&S.phase==='wave'&&S.list){const X=v=>v*CS+CS/2;
 for(const t of S.list){const b=t.rbB;if(!b||!(b.u>(S.wt||0))||!(b.a&&b.a.hp>0))continue;const T=TW[t.type]||{};g.save();g.strokeStyle=T.col||'#a6d84a';g.globalAlpha=.75;g.lineWidth=lw(1.8);
  for(const e of b.L){if(!(e.hp>0))continue;g.beginPath();g.moveTo(X(b.a.x),X(b.a.y));g.lineTo(X(e.x),X(e.y));g.stroke();}g.restore();}}}catch(e){}return r;};}
