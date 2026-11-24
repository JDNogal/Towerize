// ==================== v366 · Mecánicas de los enemigos nuevos del Taller, tanda 3 ====================
// Era Fantástica, partida 3 (acordado con Nogal el 24-nov). Medidas en celdas pequeñas (K = 5 = el ancho del camino); ninguna zona más estrecha que el camino.
//  · Guiverno: tanque volador sin mecánica propia; lleva una sombra grande en el suelo.
//  · Ogro glotón (devour): al bajar del 50 % se para 1 s, se come al goblin de tierra más cercano (7,5 celdas) y se cura un 30 %. Como mucho 2 veces.
//  · Sacrificador (sacr): cada 6 s (Nogal: un pelín menos que los 8 s del principio) marca a 2 Esbirros a 7,5 celdas; 1 s después los sacrifica e invoca un Demonio. Si alguno muere antes, no invoca. Sin límite.
//  · Gólem de magma (magma): quien le pega cuerpo a cuerpo se quema con la misma quemadura que los enemigos (1 stack por segundo de pelea).
//  · Transportador aéreo (ferry): lleva 6 Honderos que disparan a tus unidades desde el aire al 60 % de su ritmo. A mitad de su recorrido los suelta con la vida
//    entera (X en el suelo desde que entra); si lo derribas antes, caen donde cae él con la mitad de vida.
//  · Guardián de la inmortalidad (immo): los enemigos a 7,5 celdas no bajan de 1 de vida (anillo dorado). Al morir el Guardián caen todos los que estaban a 1.
//    No protege a los jefes ni a otro Guardián.
//  · Portaestandarte alado (rage): volador que va encima de su escuadrón. Cuando muere uno de tierra a 7,5 celdas de él, los de tierra que tiene a 7,5 celdas
//    se enfurecen 3 s: +15 % de velocidad y de daño a tus unidades (no se acumula; se renueva). Elegido por Nogal (opción C, 24-nov).
Object.assign(TMEC,{i10pesado:{},i33gloton:{devour:1},i34sacrificador:{sacr:1},i44golem:{magma:1},i14transporte:{ferry:6},i05guardian:{immo:1},i11alado:{rage:1}});
const GLOTR=1.5*K,GLOTH=.3,GLOTN=2,SACRR=1.5*K,SACRCD=6,FERRYM=.6,GUARDR=1.5*K,RAGER=1.5*K,RAGET=3,RAGEM=1.15;
const GOBS=['fast','sling','javelin','raider','shaman','porter'];   // goblins de tierra que se puede comer el Ogro glotón
// ---- quemadura en tus unidades: las mismas reglas que en los enemigos (BURND por stack y segundo; cada segundo se pierde un BURNK de los stacks) ----
if(typeof UST!=='undefined')UST.burn={n:'Quemadura',col:'#ff7a2a'};
function uAddBurn(s,n,src){if(!s||s.hp<=0||n<=0)return;if(s.H&&s.H.inv>0)return;s.ubn=(s.ubn||0)+n;s.ubt=s.ubt||0;s.ubsrc=src;}
function uBurnTick(dt){for(const t of unitTowers())for(const s of t.sd||[]){if(!(s.ubn>0))continue;if(s.hp<=0){s.ubn=0;continue;}
  hitUnit(s,BURND*s.ubn*dt,s.ubsrc);s.ubt+=dt;while(s.ubt>=1){s.ubt-=1;s.ubn*=1-BURNK;}if(s.ubn<.3)s.ubn=0;}}
// ---- Guardián: los protegidos no pueden bajar de 1 ----
function immArm(e){if(e._immA)return;let v=e.hp;Object.defineProperty(e,'hp',{get(){return v;},set(n){if(n<1&&v>=1&&e.imm>S.wt)n=1;v=n;},enumerable:true,configurable:true});e._immA=1;}
function guardTick(){const gs=S.enemies.filter(g=>g.hp>0&&ET[g.t]&&ET[g.t].immo);if(!gs.length)return;
 for(const e of S.enemies){if(e.hp<=0||isBoss(e)||(ET[e.t]&&ET[e.t].immo)||ET[e.t].flag)continue;let g=null;for(const q of gs)if(Math.hypot(e.x-q.x,e.y-q.y)<=GUARDR){g=q;break;}
  if(g){immArm(e);e.imm=S.wt+.25;e.immG=g;}}}
{const _a=achDeath;achDeath=function(e){const E=e&&ET[e.t];
 if(E&&E.immo&&S&&S.enemies){for(const o of S.enemies)if(o.immG===e){o.immG=null;if(o.imm>S.wt&&o.hp>0&&o.hp<=1.01){o.imm=0;o.src=o.src||e.src;o.hp=0;S.fx.push({x:o.x,y:o.y,t:.4,m:.4,r:.5*K,col:'#ffe27a'});}else o.imm=0;}}
 // Transportador derribado: los Honderos caen donde cae él, con la mitad de vida
 if(E&&E.ferry&&e.fcar>0&&!e.leak&&S&&S.phase==='wave')ferryDrop(e,.5);
 // Portaestandarte alado: si cae uno de tierra a su alcance, los de tierra que tiene debajo se enfurecen
 if(E&&!e.leak&&S&&S.enemies&&!isFly(e))for(const a of S.enemies){if(a===e||a.hp<=0||!ET[a.t]||!ET[a.t].rage||Math.hypot(a.x-e.x,a.y-e.y)>RAGER)continue;a.rageB=.6;
  for(const o of S.enemies)if(o!==e&&o.hp>0&&!isFly(o)&&!isBoss(o)&&Math.hypot(o.x-a.x,o.y-a.y)<=RAGER)o.furU=S.wt+RAGET;}
 return _a.apply(this,arguments);};}
// ---- Transportador aéreo ----
// los suelta como un escuadrón: dos filas de 3 a lo ancho del camino (carriles −2, 0 y 2), la segunda 1,5 celdas detrás
function ferryDrop(e,hpM){const n=e.fcar;e.fcar=0;if(!ET.sling)return;const q=pathNear(e.x,e.y)||{x:e.tx,y:e.ty},hp=ehpOf('sling',S.round)*hpM,F=S.field;
 let dx=0,dy=1;{let b=null;for(const[a,c]of[[1,0],[-1,0],[0,1],[0,-1]]){const x=q.x+a,y=q.y+c;if(inb(x,y)&&S.cells[y][x]===2&&F[y][x]<F[q.y][q.x]&&(!b||F[y][x]<F[b[1]][b[0]]))b=[x,y,a,c];}if(b){dx=b[2];dy=b[3];}}
 const ok=(x,y)=>inb(x,y)&&S.cells[y][x]===2;
 for(let i=0;i<n;i++){const ln=[-2,0,2][i%3],row=Math.floor(i/3)%2,x=Math.round(q.x-dy*ln-dx*row*1.5),y=Math.round(q.y+dx*ln-dy*row*1.5),p=ok(x,y)?{x,y}:q;
  (S.espw=S.espw||[]).push({t:'sling',x:e.x,y:e.y,tx:p.x,ty:p.y,hp,max:ehpOf('sling',S.round),fx:{},src:null,pv:null,fln:ln,fd:[dx,dy],spj:{x0:e.x,y0:e.y,x1:p.x,y1:p.y,t:0}});}
 S.fx.push({x:q.x,y:q.y,t:.5,m:.5,r:1*K,col:'#c9a57a'});}
{const _sp=spawnEnemy;spawnEnemy=function(t,p,fo){const r=_sp.apply(this,arguments);if(ET[t]&&ET[t].ferry&&S&&S.enemies.length){const e=S.enemies[S.enemies.length-1];
  if(e.t===t&&e.fcar==null){e.fcar=ET[t].ferry;e.frc=Array.from({length:e.fcar},(_,i)=>.4+i*.2);const F=S.field,f0=F[e.ty]&&F[e.ty][e.tx];
   if(f0!=null&&f0<1e9){e.fdF=f0/2;let q={x:e.tx,y:e.ty};for(let i=0;i<800&&F[q.y][q.x]>e.fdF;i++){let b=null;for(const[a,b2]of[[1,0],[-1,0],[0,1],[0,-1]]){const x=q.x+a,y=q.y+b2;if(inb(x,y)&&F[y][x]!=null&&F[y][x]<F[q.y][q.x]&&(!b||F[y][x]<F[b.y][b.x]))b={x,y};}if(!b)break;q=b;}e.fdX=q.x;e.fdY=q.y;}}}return r;};}
function ferryTick(e,dt,SL){if(!(e.fcar>0))return;
 if(e.fdF!=null&&S.field[e.ty]&&S.field[e.ty][e.tx]<=e.fdF){ferryDrop(e,1);return;}
 const H=ET.sling;if(!H)return;for(let i=0;i<e.fcar;i++){e.frc[i]-=dt;if(e.frc[i]>0)continue;e.frc[i]+=(H.ac||.7)/FERRYM;
  let tg=null,bd=RANGED_R;for(const s of SL){if(s.H&&s.H.camo>0)continue;const d=Math.hypot(s.x-e.x,s.y-e.y);if(d<=bd){bd=d;tg=s;}}if(!tg)continue;
  const ua=(typeof uapOf==='function'&&tg.tw?uapOf(tg.tw):0)+(typeof auraAP==='function'?auraAP(tg):0);hitUnit(tg,(H.ud||3)*(typeof udM==='function'?udM(e):1)*(1-ua/(ua+ARM_K)),e);
  S.fx.push({x:tg.x+(Math.random()-.5)*.6,y:tg.y+(Math.random()-.5)*.6,t:.2,m:.2,r:.3*K,col:'#d9c08a'});}}
// ---- Ogro glotón ----
function devourTick(e,dt){if(e.eat>0){e.eat-=dt;const g=e.eatT;if(e.eat<=0){e.eat=0;e.eatT=null;if(g&&g.hp>0&&S.enemies.includes(g)){S.enemies.splice(S.enemies.indexOf(g),1);e.hp=Math.min(e.max,e.hp+e.max*GLOTH);e.eatN=(e.eatN||0)+1;S.fx.push({x:e.x,y:e.y,t:.6,m:.6,r:1*K,col:'#9fe07a'});}e.eatc=1.5;}return;}
 if(e.eatc>0){e.eatc-=dt;return;}if((e.eatN||0)>=GLOTN||e.hp>=e.max*.5)return;let b=null,bd=GLOTR;
 for(const o of S.enemies){if(o===e||o.hp<=0||!GOBS.includes(o.t)||isFly(o))continue;const d=Math.hypot(o.x-e.x,o.y-e.y);if(d<=bd){bd=d;b=o;}}
 if(b){e.eat=1;e.eatT=b;e.fsp=0;}else e.eatc=.5;}
// ---- Sacrificador ----
function sacrTick(e,dt){if(e.sacW>0){e.sacW-=dt;if(e.sacW>0)return;const[a,b]=e.sacM||[];e.sacM=null;e.sacC=SACRCD;
  if(!(a&&b&&a.hp>0&&b.hp>0&&S.enemies.includes(a)&&S.enemies.includes(b)))return;for(const m of[a,b]){S.enemies.splice(S.enemies.indexOf(m),1);S.fx.push({x:m.x,y:m.y,t:.5,m:.5,r:.6*K,col:'#c0303a'});}
  if(ET.demon){const hp=ehpOf('demon',S.round);(S.espw=S.espw||[]).push({t:'demon',x:e.x,y:e.y,tx:e.tx,ty:e.ty,hp,max:hp,fx:{},src:null,pv:e.pv,fln:e.fln,fd:e.fd});S.fx.push({x:e.x,y:e.y,t:.7,m:.7,r:1.2*K,col:'#ff3a3a'});}return;}
 e.sacC=(e.sacC===undefined?4:e.sacC)-dt;if(e.sacC>0)return;const L=S.enemies.filter(o=>o.t==='minion'&&o.hp>0&&Math.hypot(o.x-e.x,o.y-e.y)<=SACRR).sort((p,q)=>Math.hypot(p.x-e.x,p.y-e.y)-Math.hypot(q.x-e.x,q.y-e.y));
 if(L.length>=2){e.sacM=[L[0],L[1]];e.sacW=1;}else e.sacC=.5;}
{const _m=move;move=function(e,dt){if(e.eat>0)return false;return _m(e,dt);};}
// ---- Gólem de magma: quema a quien le pega cuerpo a cuerpo ----
function magmaTick(dt){for(const t of unitTowers())for(const s of t.sd||[]){const e=s.en;if(!(s.hp>0)||!s.fight||!e||!ET[e.t]||!ET[e.t].magma||(s.H&&s.H.def.ranged)||s.rng){s.gmc=0;continue;}
  s.gmc=(s.gmc||0)+dt;while(s.gmc>=1){s.gmc-=1;uAddBurn(s,1,e);}}}
// ---- tick general ----
function t3Tick(dt){const SL=liveUnits().filter(s=>!s.charm);uBurnTick(dt);magmaTick(dt);
 for(const e of S.enemies){if(e.hp<=0)continue;const E=ET[e.t];if(!E)continue;if(E.ferry)ferryTick(e,dt,SL);if(e.fx.freeze||e.fx.stun||e.fx.poly)continue;
  if(E.devour)devourTick(e,dt);if(E.sacr)sacrTick(e,dt);}}
{const _u=update;update=function(dt){if(S&&S.phase==='wave')guardTick();_u(dt);if(!S)return;if(S.phase==='wave')t3Tick(dt);else if(S.list)for(const t of unitTowers())for(const s of t.sd||[]){if(s.ubn)s.ubn=0;}};}
// ---- dibujo ----
function t3Draw(g,lw){if(!S||!S.enemies)return;const X=v=>v*CS+CS/2,now=performance.now()/1000;
 for(const e of S.enemies){if(e.hp<=0)continue;const E=ET[e.t];if(!E)continue;const px=X(e.x),py=X(e.y),r=E.r*CS*EVS;
  if(e.t==='i10pesado'){g.fillStyle='rgba(0,0,0,.22)';g.beginPath();g.ellipse(px+r*.5,py+r*1.6,r*1.5,r*.7,0,0,7);g.fill();}
  if(E.immo){g.fillStyle='rgba(255,215,90,.08)';g.strokeStyle='rgba(255,215,90,'+(.55+.25*Math.sin(now*3)).toFixed(2)+')';g.lineWidth=lw(2.2);g.beginPath();g.arc(px,py,GUARDR*CS,0,7);g.fill();g.stroke();}
  if(e.imm>S.wt&&!E.immo){const low=e.hp<=1.01;g.strokeStyle=low?'#fff3b0':'rgba(255,215,90,.8)';g.lineWidth=lw(low?3:1.6);g.beginPath();g.arc(px,py,r*(low?1.45:1.2),0,7);g.stroke();
   if(low){g.fillStyle='rgba(255,240,160,.35)';g.beginPath();g.arc(px,py,r*1.45,0,7);g.fill();}}
  if(E.ferry&&e.fcar>0){if(e.fdX!=null){const x=X(e.fdX),y=X(e.fdY),s=CS*1.1;g.strokeStyle='rgba(255,90,60,.8)';g.lineWidth=lw(3);g.beginPath();g.moveTo(x-s,y-s);g.lineTo(x+s,y+s);g.moveTo(x+s,y-s);g.lineTo(x-s,y+s);g.stroke();}
   g.fillStyle='#4a6a2a';g.strokeStyle='#1b1712';g.lineWidth=lw(1);for(let i=0;i<e.fcar;i++){const a=i/e.fcar*6.283+now;g.beginPath();g.arc(px+Math.cos(a)*r*.55,py+Math.sin(a)*r*.35+r*.5,r*.16,0,7);g.fill();g.stroke();}}
  if(e.eat>0&&e.eatT){const q=e.eatT;g.strokeStyle='rgba(150,220,100,.9)';g.lineWidth=lw(2.5);g.beginPath();g.moveTo(px,py);g.lineTo(X(q.x),X(q.y));g.stroke();g.beginPath();g.arc(X(q.x),X(q.y),CS*.9*(.6+.4*e.eat),0,7);g.stroke();}
  if(e.sacM)for(const m of e.sacM)if(m&&m.hp>0){const k=1-(e.sacW||0);g.strokeStyle='rgba(220,40,50,'+(.5+.5*k).toFixed(2)+')';g.lineWidth=lw(2.5);g.beginPath();g.arc(X(m.x),X(m.y),CS*(1.4-.5*k),0,7);g.stroke();g.beginPath();g.moveTo(px,py);g.lineTo(X(m.x),X(m.y));g.stroke();}
  if(E.rage){g.fillStyle='rgba(220,60,40,.07)';g.strokeStyle='rgba(220,60,40,.45)';g.lineWidth=lw(1.4);g.beginPath();g.arc(px,py,RAGER*CS,0,7);g.fill();g.stroke();
   for(const o of S.enemies)if(o.hp>0&&!isFly(o)&&o!==e&&Math.hypot(o.x-e.x,o.y-e.y)<=RAGER){g.strokeStyle='rgba(255,200,120,.35)';g.lineWidth=lw(1);g.beginPath();g.moveTo(px,py);g.lineTo(X(o.x),X(o.y));g.stroke();}
   if(e.rageB>0){e.rageB-=1/60;g.strokeStyle='rgba(255,60,40,.9)';g.lineWidth=lw(3);g.beginPath();g.arc(px,py,r*(1.3+(.6-e.rageB)*2),0,7);g.stroke();}}
  if(e.furU>S.wt){g.strokeStyle='rgba(255,50,30,.9)';g.lineWidth=lw(2.4);for(let i=0;i<3;i++){const a=-1.9+i*.4;g.beginPath();g.moveTo(px+Math.cos(a)*r*1.05,py+Math.sin(a)*r*1.05);g.lineTo(px+Math.cos(a)*r*1.55,py+Math.sin(a)*r*1.55);g.stroke();}}
  if(E.magma){g.strokeStyle='rgba(255,120,40,'+(.5+.3*Math.sin(now*5)).toFixed(2)+')';g.lineWidth=lw(1.8);for(let i=0;i<3;i++){const a=i*2.1+.4;g.beginPath();g.moveTo(px+Math.cos(a)*r*.2,py+Math.sin(a)*r*.2);g.lineTo(px+Math.cos(a+.3)*r*.8,py+Math.sin(a+.3)*r*.8);g.stroke();}}}
 for(const t of unitTowers())for(const s of t.sd||[]){if(!(s.ubn>0)||!(s.hp>0))continue;const x=X(s.x),y=X(s.y);for(let i=0;i<3;i++){const ph=(now*1.4+i/3)%1;g.fillStyle='rgba(120,120,120,'+(.5*(1-ph)).toFixed(2)+')';g.beginPath();g.arc(x+(i-1)*CS*.25,y-CS*(.4+ph*1.1),CS*(.12+ph*.15),0,7);g.fill();}
  g.fillStyle='rgba(255,130,40,.85)';g.beginPath();g.arc(x,y-CS*.15,CS*.14,0,7);g.fill();}}
{const _d=eSkillsDraw;eSkillsDraw=function(g,lw){_d(g,lw);try{t3Draw(g,lw);}catch(x){}};}
// otros golpes de enemigos a tus unidades (picados, brasas…) también llevan la furia
{const _h=hitUnit;hitUnit=function(s,d,e){if(e&&e.furU>S.wt)d*=RAGEM;return _h(s,d,e);};}
// ---- palabras clave ----
{const _k=kwHtml0,R=v=>(typeof RGV==='function'&&typeof f==='function')?RGV(f(v/K)):String(v/K).replace('.',',');kwHtml0=function(id,src){
 if(id==='erage')return '<b>Estandarte de la horda</b><small>Vuela sobre su escuadrón. Cuando muere uno de tierra a '+R(RAGER)+' o menos de él, los de tierra que tiene debajo se enfurecen '+RAGET+' s: van un '+Math.round((RAGEM-1)*100)+' % más rápido y pegan un '+Math.round((RAGEM-1)*100)+' % más fuerte a tus unidades. No se acumula.</small>';
 if(id==='edevour')return '<b>Glotonería</b><small>Al bajar del 50 % de vida se para un momento, se come al goblin de tierra más cercano (a '+R(GLOTR)+' o menos) y se cura un '+Math.round(GLOTH*100)+' %. Como mucho '+GLOTN+' veces.</small>';
 if(id==='esacr')return '<b>Sacrificio</b><small>Cada '+SACRCD+' s marca a 2 Esbirros infernales cercanos (a '+R(SACRR)+' o menos) y 1 s después los sacrifica para invocar un Demonio. Si matas a uno de los marcados antes, no invoca nada.</small>';
 if(id==='emagma')return '<b>Cuerpo de magma</b><small>Tus unidades que le pegan cuerpo a cuerpo se queman: cada segundo de pelea les añade un stack de quemadura, que funciona igual que en los enemigos.</small>';
 if(id==='eferry')return '<b>Transporte</b><small>Lleva '+6+' Honderos goblin que disparan a tus unidades desde el aire, más despacio que en tierra. A mitad de su recorrido los suelta en el camino (una X marca dónde). Si lo derribas antes, caen donde cae él con la mitad de vida.</small>';
 if(id==='eimmo')return '<b>Inmortalidad</b><small>Los enemigos a '+R(GUARDR)+' o menos de él no pueden bajar de 1 de vida. Cuando muere el Guardián, caen todos los que se habían quedado a 1. No protege a los jefes.</small>';
 if(id==='burn'){const h=_k(id,src);return h?h.replace(/<\/small>$/,' El Gólem de magma también quema a tus unidades: les funciona igual.</small>'):h;}
 return _k(id,src);};}
{const KW3={devour:['edevour','Glotonería','🍖'],sacr:['esacr','Sacrificio','🩸'],magma:['emagma','Cuerpo de magma','🌋'],ferry:['eferry','Transporte','🪂'],immo:['eimmo','Inmortalidad','✨'],rage:['erage','Estandarte de la horda','🚩']};   // iconos provisionales: falta dibujarlos (prioritario)
 Object.assign(TMECKW,KW3);if(typeof MECG2!=='undefined')for(const k in KW3)MECG2.push(KW3[k]);
 if(typeof MECUSE2!=='undefined')for(const k in KW3)MECUSE2[KW3[k][0]]=Object.keys(TMEC).filter(id=>TMEC[id][k]).map(id=>'en:'+id);}
