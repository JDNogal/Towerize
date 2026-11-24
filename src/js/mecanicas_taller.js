// ==================== v366 · Mecánicas de los enemigos nuevos del Taller ====================
// Cada enemigo nuevo llega con su ficha del Taller (taller_aplicar.js). Aquí está lo que hace: TMEC dice qué mecánica lleva cada id del Taller,
// y solo los que están en TMEC salen en el juego. Se van añadiendo por tandas, en el orden en que se estrenan.
// Tanda 1 · Era Fantástica, partida 1 (valores acordados con Nogal el 24-nov):
//  · Limo (split): al morir se parte en 3 Mini limos, que ya no se dividen. Saltan desde donde muere y caen en triángulo (uno delante y dos detrás, un carril a cada lado).
//  · Cornetero orco (horn): cada 7 s toca el cuerno y su escuadrón va un 50 % más rápido 2 s. No rompe la formación.
//  · Jabalí de guerra (charge): anda a su paso. Cuando tiene una unidad tuya delante (1,5 casillas) frena 0,6 s para coger carrerilla (va al 40 %) y arranca al doble de velocidad:
//    a la primera unidad que toca (también el héroe) le hace el doble de su golpe y la tumba 1 s, y sigue a su paso. Tarda 5 s en repetirlo.
//    Mientras coge carrerilla y corre, tus unidades no salen a por él (lo esperan en su sitio): así se ve la carrera.
//    Ralentizado, aturdido, congelado o enraizado mientras coge carrerilla o corre, pierde la embestida.
//  · Jinete de buitre goblin (dive): volador. Cuando tiene una unidad tuya delante (2 casillas) la marca con una sombra 0,6 s sin dejar de avanzar, se lanza en línea recta hacia ella,
//    le hace 20 de daño y aterriza justo detrás. Se queda 2,5 s en el suelo, donde le pegan las torres que solo dan a tierra, pero tus unidades no lo retienen (nblk) salvo que esté aturdido o congelado;
//    después sube siempre y tarda 6 s en repetir.
const TMEC={i07divisor:{split:{i47minilimo:3}},i47minilimo:{},i06potenciador:{horn:1},i43jabali:{charge:1},i37buitre:{dive:1}};
const HORNCD=7,HORNT=2,HORNM=1.5,HORNR=2*K,CHGCD=5,CHGDOWN=1,CHGSEE=1.5*K,CHGWIND=.6,CHGWM=.4,CHGM=2,CHGRUN=1.6,CHGDM=2,CHGHIT=1.1,
 DIVECD=6,DIVEWARN=.6,DIVEDOWN=2.5,DIVESEE=2*K,DIVEV=3.6*K,DIVEDMG=20,DIVEPAST=2.2,SPLT=.35;
// ¿Tiene el enemigo a esta unidad delante (por el camino) y a la vista? Devuelve la distancia o -1.
function tmAhead(e,s,see){const d=Math.hypot(s.x-e.x,s.y-e.y);if(d>see)return -1;const F=S.field,q=pathNear(s.x,s.y),fe=F&&F[e.ty]&&F[e.ty][e.tx],fs=q&&F&&F[q.y]&&F[q.y][q.x];
 if(fe==null||fs==null||!(fe<1e9)||!(fs<1e9))return -1;const g=fe-fs;return g>=-.5&&g<=see*2?d:-1;}
function tmTarget(e,SL,see){let b=null,bd=1e9;for(const s of SL){if(s.air||(s.H&&s.H.camo>0))continue;const d=tmAhead(e,s,see);if(d>=0&&d<bd){bd=d;b=s;}}return b;}
// ---- Limo: al morir se parte ----
{const _a=achDeath;achDeath=function(e){const E=e&&ET[e.t];if(E&&E.split&&!e.leak&&!e.splD&&S&&S.phase==='wave'){e.splD=1;let i=0;
  let ux=e.tx-e.x,uy=e.ty-e.y;if(Math.hypot(ux,uy)<.05&&e.fd){ux=e.fd[0];uy=e.fd[1];}if(Math.hypot(ux,uy)<.05&&e.pv){ux=e.tx-e.pv[0];uy=e.ty-e.pv[1];}{const d=Math.hypot(ux,uy);if(d<.05){ux=1;uy=0;}else{ux/=d;uy/=d;}}
  const isP=(x,y)=>inb(x,y)&&S.cells[y][x]===2,used={},spot=cs=>{for(const[a,b]of cs){const x=Math.round(e.x+ux*a-uy*b),y=Math.round(e.y+uy*a+ux*b);if(isP(x,y)&&!used[x+','+y]){used[x+','+y]=1;return{x,y};}}return pathNear(e.x,e.y)||{x:e.tx,y:e.ty};};
  const SPLTRI=[[[1,0],[1,1],[1,-1],[2,0]],[[-.6,1],[-.6,-2],[.4,1],[-1.6,0]],[[-.6,-1],[-.6,2],[.4,-1],[-1.6,1]]];
  for(const k in E.split){if(!ET[k])continue;const hp=ehpOf(k,S.round);for(let n=0;n<E.split[k];n++,i++){const q=spot(SPLTRI[i%3]);
   (S.espw=S.espw||[]).push({t:k,x:e.x,y:e.y,tx:q.x,ty:q.y,hp,max:hp,fx:{},src:null,pv:null,fd:e.fd,spj:{x0:e.x,y0:e.y,x1:q.x,y1:q.y,t:0}});}}
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
// chw = cogiendo carrerilla (s que le quedan) · chr = corriendo (s que le quedan) · chgc = espera hasta la siguiente
function chargeTick(e,E,dt,SL){const cc=e.fx.slow||e.fx.stun||e.fx.freeze||e.fx.root||e.fx.poly||e.fx.fear;
 if(e.chw>0||e.chr>0){if(cc){e.chw=e.chr=0;e.chgc=CHGCD;return;}
  if(e.chw>0){e.chw-=dt;if(e.chw<=0){e.chw=0;e.chr=CHGRUN;}}else{e.chr-=dt;if(e.chr<=0){e.chr=0;e.chgc=CHGCD;}}return;}
 if(e.chgc>0||cc)return;if(tmTarget(e,SL,CHGSEE)){e.chw=CHGWIND;e.fsp=0;e.nblk=1;tmRelease(e);}}
// quien lo retenía o iba a por él lo suelta
function tmRelease(e){for(const t of unitTowers())for(const s of t.sd||[]){if(s.en===e){s.en=null;s.fight=false;}if(s.en2===e)s.en2=null;}}
// mientras corre nadie lo retiene; a la primera unidad que toca la golpea y la tumba
function chargeCheck(){for(const e of S.enemies){if(!(e.chr>0)||e.hp<=0)continue;const E=ET[e.t];let v=null,bd=CHGHIT;
  for(const t of unitTowers())for(const s of t.sd||[]){if(!(s.hp>0)||s.udwn>0||s.air||s.charm)continue;const d=Math.hypot(s.x-e.x,s.y-e.y);if(d<=bd){bd=d;v=s;}}
  e.stopped=false;e.ct=0;if(!v)continue;
  hitUnit(v,(E.ud||0)*CHGDM*(typeof udM==='function'?udM(e):1),e);v.udwn=CHGDOWN;v.en=null;v.fight=false;v.en2=null;e.chr=0;e.chgc=CHGCD;
  S.fx.push({x:v.x,y:v.y,t:.4,m:.4,r:.6*K,col:'#c9a57a'});}}
{const _w=unitWalk;unitWalk=function(dt){return withoutDowned(()=>_w(dt));};}
{const _c=unitCombat;unitCombat=function(dt){const r=withoutDowned(()=>_c(dt));if(S&&S.phase==='wave')chargeCheck();return r;};}
// ---- Jinete de buitre goblin: picado ----
// dvc = espera · dvt/dvw = unidad marcada y s de aviso · dvs = lanzándose · dvd = s que le quedan en el suelo
function diveLand(e){const d=e.dvs;e.x=d.qx;e.y=d.qy;e.tx=d.qx;e.ty=d.qy;e.pv=null;e.trail=[];e.dvs=null;e.fsp=0;e.gnd=S.wt+DIVEDOWN;e.dvd=DIVEDOWN;e.nblk=1;
 if(e.wps){const cx=Math.floor(e.tx/K),cy=Math.floor(e.ty/K),i=e.wps.findIndex(w=>w[0]===cx&&w[1]===cy);if(i>=0){e.wps=e.wps.slice(i+1);if(!e.wps.length)e.wps=null;}}}
function diveHit(e,s){if(e.dvs.hit)return;e.dvs.hit=1;if(!(s&&s.hp>0))return;hitUnit(s,DIVEDMG*(typeof udM==='function'?udM(e):1),e);S.fx.push({x:s.x,y:s.y,t:.4,m:.4,r:.7*K,col:'#d9b06a'});}
function diveTick(e,E,dt,SL){
 if(e.dvs){const d=e.dvs,s=d.s;let mv=DIVEV*dt;const dx=d.qx-e.x,dy=d.qy-e.y,dd=Math.hypot(dx,dy);
  if(dd<=mv){diveHit(e,s&&Math.hypot(s.x-d.qx,s.y-d.qy)<=DIVEPAST+1.2?s:null);diveLand(e);return;}
  e.x+=dx/dd*mv;e.y+=dy/dd*mv;if(s&&s.hp>0&&Math.hypot(s.x-e.x,s.y-e.y)<=.9)diveHit(e,s);return;}
 if(e.dvd>0){e.dvd-=dt;if(e.dvd<=0){e.dvd=0;e.dvc=DIVECD;/* sube: quien lo retenía lo suelta */tmRelease(e);}return;}
 if(e.dvw>0){const s=e.dvt;if(!s||!(s.hp>0)){e.dvw=0;e.dvt=null;e.dvc=.4;return;}e.dvw-=dt;
  if(e.dvw<=0){e.dvw=0;e.dvt=null;let ux=s.x-e.x,uy=s.y-e.y;const d=Math.hypot(ux,uy)||1;ux/=d;uy/=d;
   const q=pathNear(s.x+ux*DIVEPAST,s.y+uy*DIVEPAST)||pathNear(s.x,s.y)||{x:e.tx,y:e.ty};e.dvs={s,qx:q.x,qy:q.y,x0:e.x,y0:e.y,hit:0};e.fsp=0;}return;}
 e.dvc=(e.dvc===undefined?1.5:e.dvc)-dt;if(e.dvc>0)return;
 const s=tmTarget(e,SL,DIVESEE);if(s){e.dvt=s;e.dvw=DIVEWARN;}else e.dvc=.2;}
{const _m=move;move=function(e,dt){if(e.dvs||e.dvd>0||e.spj)return false;return _m(e,dt);};}
// ---- tick general ----
function tmecTick(dt){const SL=liveUnits().filter(s=>!s.charm&&!(s.udwn>0));
 for(const t of unitTowers())for(const s of t.sd||[])if(s.udwn>0)s.udwn-=dt;
 for(const e of S.enemies){if(e.hp<=0)continue;const E=ET[e.t];if(!E)continue;if(e.chgc>0)e.chgc-=dt;if(e.hornB>0)e.hornB-=dt;
  if(e.spj){const j=e.spj;j.t+=dt;const k=Math.min(1,j.t/SPLT),kk=1-(1-k)*(1-k);e.x=j.x0+(j.x1-j.x0)*kk;e.y=j.y0+(j.y1-j.y0)*kk-Math.sin(Math.PI*k)*.45;if(k>=1){e.x=j.x1;e.y=j.y1;e.spj=null;}}
  if(E.charge)chargeTick(e,E,dt,SL);if(E.dive||E.charge)e.nblk=(e.dvd>0&&!e.fx.stun&&!e.fx.freeze)||e.chw>0||e.chr>0?1:0;/* nblk: tus unidades no van a por él ni lo retienen (buitre en tierra; jabalí cogiendo carrerilla o corriendo) */if(e.fx.freeze||e.fx.stun||e.fx.poly)continue;
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
  // Jabalí: polvo mientras coge carrerilla y estela mientras corre
  if(e.chw>0||e.chr>0){let ux=e.tx-e.x,uy=e.ty-e.y;const d=Math.hypot(ux,uy);if(d>.01){ux/=d;uy/=d;}else if(e.fd){ux=e.fd[0];uy=e.fd[1];}else{ux=1;uy=0;}const r=E.r*CS*EVS;
   if(e.chw>0){const k=1-e.chw/CHGWIND;g.fillStyle='rgba(214,196,160,.75)';for(let i=0;i<4;i++){const ph=(now*3+i*.25)%1,bx=px-ux*r*(1+ph*1.6)-uy*r*(i-1.5)*.45,by=py-uy*r*(1+ph*1.6)+ux*r*(i-1.5)*.45;g.globalAlpha=(1-ph)*.8;g.beginPath();g.arc(bx,by,r*(.25+ph*.4),0,7);g.fill();}g.globalAlpha=1;
    g.strokeStyle='rgba(255,120,70,'+(.35+.55*k).toFixed(2)+')';g.lineWidth=lw(3.5);g.beginPath();g.arc(px,py,r*(2-.75*k),0,7);g.stroke();}
   else{g.strokeStyle='rgba(255,236,200,.85)';g.lineCap='round';g.lineWidth=lw(2.5);for(let i=-2;i<=2;i++){const ox=-uy*i*r*.4,oy=ux*i*r*.4,L=2.6-Math.abs(i)*.5;g.beginPath();g.moveTo(px-ux*r*1.1+ox,py-uy*r*1.1+oy);g.lineTo(px-ux*r*(1.1+L)+ox,py-uy*r*(1.1+L)+oy);g.stroke();}
    g.strokeStyle='rgba(255,120,70,.9)';g.lineWidth=lw(3);const a0=Math.atan2(uy,ux);g.beginPath();g.arc(px,py,r*1.25,a0-.9,a0+.9);g.stroke();}}
  // Jinete de buitre: sombra sobre la unidad marcada, que crece hasta que cae
  if(e.dvw>0&&e.dvt){const s=e.dvt,k=1-e.dvw/DIVEWARN,sx=X(s.x),sy=X(s.y),r=CS*(.35+.75*k);g.fillStyle='rgba(0,0,0,'+(.2+.3*k).toFixed(2)+')';g.beginPath();g.ellipse(sx,sy+CS*.25,r,r*.55,0,0,7);g.fill();
   g.strokeStyle='rgba(200,60,40,'+(.5+.45*k).toFixed(2)+')';g.lineWidth=lw(2);g.beginPath();g.arc(sx,sy,CS*(1.7-.9*k),0,7);g.stroke();}
  // lanzándose: estela desde donde arrancó
  if(e.dvs){const d=e.dvs;let ux=e.x-d.x0,uy=e.y-d.y0;const q=Math.hypot(ux,uy)||1;ux/=q;uy/=q;const r=E.r*CS*EVS;g.strokeStyle='rgba(255,240,210,.8)';g.lineCap='round';g.lineWidth=lw(2.5);
   for(let i=-1;i<=1;i++){const ox=-uy*i*r*.5,oy=ux*i*r*.5,L=Math.min(q*CS,r*(3.4-Math.abs(i)));g.beginPath();g.moveTo(px-ux*r+ox,py-uy*r+oy);g.lineTo(px-ux*(r+L)+ox,py-uy*(r+L)+oy);g.stroke();}}}
 // unidades derribadas: estrellitas
 for(const t of unitTowers())for(const s of t.sd||[]){if(!(s.udwn>0)||!(s.hp>0))continue;const px=X(s.x),py=X(s.y)-CS*.75;g.fillStyle='#ffe27a';g.strokeStyle='#1b1712';g.lineWidth=lw(1);
  for(let i=0;i<3;i++){const a=now*6+i*2.094;g.beginPath();g.arc(px+Math.cos(a)*CS*.45,py+Math.sin(a)*CS*.16,CS*.11,0,7);g.fill();g.stroke();}}}
{const _d=eSkillsDraw;eSkillsDraw=function(g,lw){_d(g,lw);try{tmecDraw(g,lw);}catch(x){}};}
// ---- palabras clave, fichas y Mecánicas del compendio ----
{const _k=kwHtml0;kwHtml0=function(id,src){
 if(id==='esplit')return '<b>División</b><small>Al morir se parte en 3 criaturas más pequeñas y algo más rápidas, que ya no se dividen.</small>';
 if(id==='ehorn')return '<b>Toque de cuerno</b><small>Cada '+HORNCD+' s toca el cuerno: todo su escuadrón va un '+Math.round((HORNM-1)*100)+' % más rápido durante '+HORNT+' s.</small>';
 if(id==='echarge')return '<b>Embestida</b><small>Cuando tiene delante a una unidad tuya, frena un momento para coger carrerilla y embiste: a la primera que toca le hace el doble de su golpe y la tumba '+CHGDOWN+' s, y sigue adelante. Tarda '+CHGCD+' s en repetirlo. Si lo ralentizas, aturdes o congelas mientras coge carrerilla, pierde la embestida.</small>';
 if(id==='edive')return '<b>Picado</b><small>Vuela, pero cuando tiene delante a una unidad tuya la marca con su sombra y se lanza contra ella: le hace '+DIVEDMG+' de daño y se queda '+String(DIVEDOWN).replace('.',',')+' s en el suelo, donde le alcanzan también las torres que solo dan a tierra. Tus unidades no pueden retenerlo salvo que esté aturdido o congelado. Después vuelve a subir y tarda '+DIVECD+' s en repetirlo.</small>';
 return _k(id,src);};}
const TMECKW={split:['esplit','División','🫧'],horn:['ehorn','Toque de cuerno','📯'],charge:['echarge','Embestida','🐗'],dive:['edive','Picado','🦅']};   // iconos provisionales: falta dibujarlos (prioritario)
if(typeof MECG2!=='undefined')for(const k in TMECKW)MECG2.push(TMECKW[k]);
if(typeof MECUSE2!=='undefined')for(const k in TMECKW)MECUSE2[TMECKW[k][0]]=Object.keys(TMEC).filter(id=>TMEC[id][k]).map(id=>'en:'+id);
