// ==================== v366 · Mecánicas de los enemigos nuevos del Taller ====================
// Cada enemigo nuevo llega con su ficha del Taller (taller_aplicar.js). Aquí está lo que hace: TMEC dice qué mecánica lleva cada id del Taller,
// y solo los que están en TMEC salen en el juego. Se van añadiendo por tandas, en el orden en que se estrenan.
// Tanda 1 · Era Fantástica, partida 1 (valores acordados con Nogal el 24-nov):
//  · Limo (split): al morir se parte en 3 Mini limos, que ya no se dividen.
//  · Cornetero orco (horn): cada 7 s toca el cuerno y su escuadrón va un 50 % más rápido 2 s. No rompe la formación.
//  · Jabalí de guerra (charge): con la embestida lista, la primera unidad que lo retiene (también el héroe) cae 1 s y él sigue; tarda 5 s en volver a tenerla.
//    Ralentizado, aturdido o congelado no embiste.
//  · Jinete de buitre goblin (dive): volador. Con unidades tuyas debajo, avisa con una sombra (0,6 s), baja, golpea a las 2 más cercanas y se queda 1,5 s en el suelo,
//    donde le pegan las unidades y las torres que solo dan a tierra. Vuelve a subir y tarda 6 s en repetir.
const TMEC={i07divisor:{split:{i47minilimo:3}},i47minilimo:{},i06potenciador:{horn:1},i43jabali:{charge:1},i37buitre:{dive:1}};
const HORNCD=7,HORNT=2,HORNM=1.5,HORNR=2*K,CHGCD=5,CHGDOWN=1,DIVECD=6,DIVEWARN=.6,DIVEDOWN=1.5,DIVER=1*K,DIVEN=2;
// ---- Limo: al morir se parte ----
{const _a=achDeath;achDeath=function(e){const E=e&&ET[e.t];if(E&&E.split&&!e.leak&&!e.splD&&S&&S.phase==='wave'){e.splD=1;let i=0;
  for(const k in E.split){if(!ET[k])continue;const hp=ehpOf(k,S.round);for(let n=0;n<E.split[k];n++,i++){const a=i*2.1,j=.45;
   (S.espw=S.espw||[]).push({t:k,x:e.x+Math.cos(a)*j,y:e.y+Math.sin(a)*j,tx:e.tx,ty:e.ty,hp,max:hp,fx:{},src:null,pv:[e.x,e.y],fln:Math.max(-KC,Math.min(KC,(e.fln||0)+[0,-1,1][i%3])),fd:e.fd});}}
  S.fx.push({x:e.x,y:e.y,t:.4,m:.4,r:.5*K,col:E.col||'#5a8a3a'});}return _a.apply(this,arguments);};}
// ---- Cornetero orco: toque de cuerno ----
// La prisa del cuerno va aparte de fx.haste (que deshace la marcha en formación): el escuadrón entero acelera a la vez y sigue formado.
function hornTick(e,dt){e.hnc=(e.hnc===undefined?3:e.hnc)-dt;if(e.hnc>0)return;e.hnc=HORNCD;const u=S.wt+HORNT,fac=ET[e.t].fac;
 for(const m of S.enemies){if(m.hp<=0)continue;const near=Math.hypot(m.x-e.x,m.y-e.y)<=HORNR;
  if(m===e||(e.sqid&&m.sqid===e.sqid&&((!m.loose&&!e.loose)||near))||(!e.sqid&&near&&ET[m.t]&&ET[m.t].fac===fac))m.hornU=u;}
 e.hornB=.7;S.fx.push({x:e.x,y:e.y,t:.6,m:.6,r:HORNR,col:'#e08a2e'});}
// ---- Jabalí de guerra: embestida ----
// Las unidades derribadas (udwn) no andan, no pelean y no retienen a nadie mientras están en el suelo.
function withoutDowned(fn){const saved=[];for(const t of unitTowers())if(t.sd&&t.sd.some(s=>s.udwn>0)){saved.push([t,t.sd]);t.sd=t.sd.filter(s=>!(s.udwn>0));}try{return fn();}finally{for(const[t,sd]of saved)t.sd=sd;}}
function chargeCheck(){for(const t of unitTowers())for(const s of t.sd||[]){if(!(s.hp>0)||!s.fight||!s.en||s.udwn>0)continue;const e=s.en,E=ET[e.t];
  if(!E||!E.charge||e.chgc>0||e.hp<=0||e.fx.slow||e.fx.stun||e.fx.freeze||e.fx.root||e.fx.poly)continue;
  e.chgc=CHGCD;s.udwn=CHGDOWN;s.en=null;s.fight=false;s.en2=null;e.ct=Math.max(0,(e.ct||0)-(s.w||1));if(e.ct<(E.need||1))e.stopped=false;
  S.fx.push({x:s.x,y:s.y,t:.4,m:.4,r:.5*K,col:'#c9a57a'});}}
{const _w=unitWalk;unitWalk=function(dt){return withoutDowned(()=>_w(dt));};}
{const _c=unitCombat;unitCombat=function(dt){const r=withoutDowned(()=>_c(dt));if(S&&S.phase==='wave')chargeCheck();return r;};}
// ---- Jinete de buitre goblin: picado ----
function diveTick(e,E,dt,SL){
 if(e.dvw>0){e.dvw-=dt;if(e.dvw<=0){e.dvw=0;e.gnd=S.wt+DIVEDOWN;e.dvd=DIVEDOWN;
   const near=SL.map(s=>[Math.hypot(s.x-e.x,s.y-e.y),s]).filter(q=>q[0]<=DIVER*1.3).sort((a,b)=>a[0]-b[0]).slice(0,DIVEN);
   for(const q of near)hitUnit(q[1],E.ud*(typeof udM==='function'?udM(e):1),e);S.fx.push({x:e.x,y:e.y,t:.35,m:.35,r:.6*K,col:'#8a6a3a'});}return;}
 if(e.dvd>0){e.dvd-=dt;if(e.dvd<=0){e.dvd=0;e.dvc=DIVECD;}return;}
 e.dvc=(e.dvc===undefined?1.5:e.dvc)-dt;if(e.dvc>0)return;
 if(SL.some(s=>Math.hypot(s.x-e.x,s.y-e.y)<=DIVER))e.dvw=DIVEWARN;else e.dvc=.2;}
{const _m=move;move=function(e,dt){if(e.dvw>0||e.dvd>0)return false;return _m(e,dt);};}
// ---- tick general ----
function tmecTick(dt){const SL=liveUnits().filter(s=>!s.charm&&!(s.udwn>0));
 for(const t of unitTowers())for(const s of t.sd||[])if(s.udwn>0)s.udwn-=dt;
 for(const e of S.enemies){if(e.hp<=0)continue;const E=ET[e.t];if(!E)continue;if(e.chgc>0)e.chgc-=dt;if(e.hornB>0)e.hornB-=dt;if(e.fx.freeze||e.fx.stun||e.fx.poly)continue;
  if(E.horn)hornTick(e,dt);if(E.dive)diveTick(e,E,dt,SL);}}
{const _u=update;update=function(dt){_u(dt);if(!S)return;if(S.phase==='wave')tmecTick(dt);else if(S.list)for(const t of unitTowers())for(const s of t.sd||[])if(s.udwn>0)s.udwn=0;};}
// ---- dibujo ----
function tmecDraw(g,lw){if(!S||!S.enemies)return;const X=v=>v*CS+CS/2,now=performance.now()/1000;
 for(const e of S.enemies){if(e.hp<=0)continue;const E=ET[e.t];if(!E)continue;const px=X(e.x),py=X(e.y);
  // estela de los acelerados por el cuerno
  if(e.hornU>S.wt){const dx=e.pv?e.x-e.pv[0]:0,dy=e.pv?e.y-e.pv[1]:0,d=Math.hypot(dx,dy)||1,ux=dx/d,uy=dy/d,r=E.r*CS*EVS;g.strokeStyle='rgba(255,196,110,.75)';g.lineCap='round';g.lineWidth=lw(2);
   for(let i=-1;i<=1;i++){const ox=-uy*i*r*.6,oy=ux*i*r*.6;g.beginPath();g.moveTo(px-ux*r*1.1+ox,py-uy*r*1.1+oy);g.lineTo(px-ux*r*(1.9+(i?0:.5))+ox,py-uy*r*(1.9+(i?0:.5))+oy);g.stroke();}}
  // el Cornetero al tocar: ondas del cuerno
  if(e.hornB>0){const a=e.hornB/.7,r=E.r*CS*EVS;g.strokeStyle='rgba(255,170,60,'+(a*.9).toFixed(2)+')';g.lineWidth=lw(2.5);for(let i=1;i<=2;i++){g.beginPath();g.arc(px,py-r*.3,r*(1+i*(1.3-a)),-2.2,-.9);g.stroke();}}
  // Jabalí con la embestida lista: aro de polvo
  if(E.charge&&!(e.chgc>0)&&!e.fx.slow&&!e.fx.stun&&!e.fx.freeze){const r=E.r*CS*EVS*(1.25+.08*Math.sin(now*9));g.strokeStyle='rgba(240,220,180,.8)';g.lineWidth=lw(2);g.setLineDash([lw(5),lw(4)]);g.beginPath();g.arc(px,py,r,0,7);g.stroke();g.setLineDash([]);}
  // Jinete de buitre: la sombra crece antes de caer
  if(e.dvw>0){const k=1-e.dvw/DIVEWARN,r=E.r*CS*EVS*(.5+1.1*k);g.fillStyle='rgba(0,0,0,'+(.18+.3*k).toFixed(2)+')';g.beginPath();g.ellipse(px,py+E.r*CS*.6,r,r*.55,0,0,7);g.fill();}}
 // unidades derribadas: estrellitas
 for(const t of unitTowers())for(const s of t.sd||[]){if(!(s.udwn>0)||!(s.hp>0))continue;const px=X(s.x),py=X(s.y)-CS*.75;g.fillStyle='#ffe27a';g.strokeStyle='#1b1712';g.lineWidth=lw(1);
  for(let i=0;i<3;i++){const a=now*6+i*2.094;g.beginPath();g.arc(px+Math.cos(a)*CS*.45,py+Math.sin(a)*CS*.16,CS*.11,0,7);g.fill();g.stroke();}}}
{const _d=eSkillsDraw;eSkillsDraw=function(g,lw){_d(g,lw);try{tmecDraw(g,lw);}catch(x){}};}
// ---- palabras clave, fichas y Mecánicas del compendio ----
{const _k=kwHtml0;kwHtml0=function(id,src){
 if(id==='esplit')return '<b>División</b><small>Al morir se parte en 3 criaturas más pequeñas y algo más rápidas, que ya no se dividen.</small>';
 if(id==='ehorn')return '<b>Toque de cuerno</b><small>Cada '+HORNCD+' s toca el cuerno: todo su escuadrón va un '+Math.round((HORNM-1)*100)+' % más rápido durante '+HORNT+' s.</small>';
 if(id==='echarge')return '<b>Embestida</b><small>La primera unidad que lo retiene cae al suelo '+CHGDOWN+' s y él sigue adelante. Tarda '+CHGCD+' s en poder embestir otra vez. Ralentizado, aturdido o congelado no embiste.</small>';
 if(id==='edive')return '<b>Picado</b><small>Vuela, pero cuando pasa sobre tus unidades baja en picado: golpea a las '+DIVEN+' más cercanas y se queda '+String(DIVEDOWN).replace('.',',')+' s en el suelo, donde le alcanza todo. Tarda '+DIVECD+' s en repetirlo.</small>';
 return _k(id,src);};}
const TMECKW={split:['esplit','División','🫧'],horn:['ehorn','Toque de cuerno','📯'],charge:['echarge','Embestida','🐗'],dive:['edive','Picado','🦅']};   // iconos provisionales: falta dibujarlos (prioritario)
if(typeof MECG2!=='undefined')for(const k in TMECKW)MECG2.push(TMECKW[k]);
if(typeof MECUSE2!=='undefined')for(const k in TMECKW)MECUSE2[TMECKW[k][0]]=Object.keys(TMEC).filter(id=>TMEC[id][k]).map(id=>'en:'+id);
