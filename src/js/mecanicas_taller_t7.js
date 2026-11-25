// ==================== v366 · Mecánicas de los enemigos nuevos del Taller, tanda 7: enemigos de evento de la Fantástica ====================
// Acordado con Nogal el 25-nov (01:46). Medidas en celdas pequeñas (K = 5 = el ancho del camino). Sustituyen costes de los eventos (events.js, abajo).
//  · Sicario (smoke): salen 4 («Robarle» al Mercader, en vez de la Élite extra). La primera vez que cada uno recibe daño suelta una bomba de humo de 2,5 celdas de
//    radio: él y los que estén dentro no se pueden apuntar 2 s y esquivan todo (también lo que ya iba por el aire, para que no salten todas las bombas a la vez). Quita 2 de vida si llega (Nogal: que los 4 no quiten más de la mitad de la vida).
//  · Espíritu maldito (ghost): («Llevarte el ídolo» del Santuario, en vez de perder 3 de vida). Lo físico lo atraviesa; solo le hace daño lo mágico y lo elemental.
//    Tus unidades no lo paran (es un ente que las atraviesa) y a cada una que atraviesa le hace daño.
//  · Mímico enfurecido (mimr): (opción nueva del Cofre, «Abrirlo a la fuerza»). Suelta 10 🪙 por cada 10 % de vida que pierde y una bolsa de 100 al morir. Si llega
//    al núcleo te roba 200 🪙 (sin bajar de 0) y quita 1 de vida.
//  · Bestias del encargo («Aceptar un encargo» del Gremio; una de las tres al azar en vez de la Élite de encargo; al matarla +200 🪙 y una reliquia, como ahora):
//    Mantícora (spike): sus disparos son púas que dejan 1 stack de veneno; si tus unidades se le pegan, muerde con la cabeza de león (golpe fuerte).
//    Basilisco (gaze): cada 8 s mira 1 s a una torre a 12,5 celdas (la que más daño le hace) y la deja petrificada 3 s.
//    Hidra (heads): al perder 1/3 de su vida le sale otra cabeza (+50 % de daño a unidades) y al perder 2/3, otra (+100 %).
Object.assign(TMEC,{v01sicario:{smoke:1,evn:1,dmg:2},v02espiritu:{ghost:1,evn:1},v03mimico:{mimr:1,evn:1,dmg:1,steal:200},
 v04manticora:{spike:1,upois:1.5,evn:1,el:1,bounty:1},v05basilisco:{gaze:1,evn:1,el:1,bounty:1},v06hidra:{heads:1,evn:1,el:1,bounty:1}});
const SMKR=K/2,SMKT=2,GHD=10,GHCD=2,GHR=1.4,MIMC=.1,MIMG=10,MIMB=100,BITECD=1.5,BITEM=1.5,BITER=1.6,GAZECD=8,GAZEW=1,GAZER=2.5*K,GAZET=3,HEADM=.5,
 BNTYB=['v04manticora','v05basilisco','v06hidra'];
// ---- daño recibido: humo, espíritu, monedas del mímico, a quién culpa el basilisco ----
{const _h=eHurtMod;eHurtMod=function(e,a,src,ty){const E=ET[e.t];
 /* Nogal (25-nov): dentro del humo nada les da, ni las flechas que ya iban por el aire; así no saltan todas las bombas a la vez */if(S&&S.smk&&S.smk.length&&smkHid(e)){if(!(e.dgF>S.wt)){e.dgF=S.wt+.3;S.fx.push({x:e.x,y:e.y,t:.2,m:.2,r:.4*K,col:'#b0b0c0'});}return 0;}
 if(E&&E.ghost&&(ty==='phys'||ty==null)){if(!(e.ghF>S.wt)){e.ghF=S.wt+.25;S.fx.push({x:e.x,y:e.y,t:.2,m:.2,r:.5*K,col:'#c8e0ff'});}return 0;}
 a=_h(e,a,src,ty);if(!(a>0)||!E)return a;
 if(E.smoke&&!e.smk){e.smk=1;(S.smk=S.smk||[]).push({x:e.x,y:e.y,t:SMKT});S.fx.push({x:e.x,y:e.y,t:.5,m:.5,r:SMKR,col:'#8a8a9a'});}
 if(E.mimr){e.mcL=(e.mcL||0)+Math.min(a,e.hp)/e.max;while(e.mcL>=MIMC){e.mcL-=MIMC;goldEv(MIMG);S.fx.push({x:e.x,y:e.y,t:.5,m:.5,r:.4*K,col:'#ffd75a'});(S.coinB=S.coinB||[]).push({x:e.x,y:e.y,t:0});}}
 if(E.gaze&&src&&src.id!=null&&!src.hero){(e.bsD=e.bsD||{})[src.id]=(e.bsD[src.id]||0)+a;}
 return a;};}
function smkHid(e){if(!S.smk||!S.smk.length)return false;for(const c of S.smk)if(c.t>0&&Math.hypot(e.x-c.x,e.y-c.y)<=SMKR)return true;return false;}
{const _x=eHidX;eHidX=function(e,t){return smkHid(e)||_x(e,t);};}
// ---- bolsa del mímico ----
{const _a=achDeath;achDeath=function(e){const r=_a.apply(this,arguments);if(S&&e&&!e.leak&&ET[e.t]&&ET[e.t].mimr){goldEv(MIMB);S.fx.push({x:e.x,y:e.y,t:.7,m:.7,r:1*K,col:'#ffd75a'});}return r;};}
// ---- bestia del encargo: una de las tres en vez de la Élite de encargo ----
{const _sp=spawnEnemy;spawnEnemy=function(t,p,fo){if(t==='wanted'&&BNTYB.every(k=>ET[k]&&!ET[k].pend)){const k=BNTYB[Math.floor(Math.random()*BNTYB.length)];const r=_sp.call(this,k,p,fo);const e=S.enemies[S.enemies.length-1];if(e&&e.t===k)e.wanted=1;return r;}
 return _sp.apply(this,arguments);};}
// ---- Espíritu: atraviesa a las unidades y les hace daño ----
function ghostTick(e,SL){e.nblk=1;for(const s of SL){if(s.air||!(s.hp>0)||Math.hypot(s.x-e.x,s.y-e.y)>GHR)continue;const m=e.ghU||(e.ghU=new Map()),k=m.get(s)||0;if(k>S.wt)continue;m.set(s,S.wt+GHCD);hitUnit(s,GHD,e);S.fx.push({x:s.x,y:s.y,t:.3,m:.3,r:.4*K,col:'#a8c8ff'});}}
// ---- Mantícora: púas venenosas (los disparos) y mordisco si se le pegan ----
/* el veneno de las púas va por E.upois (towers.js, en cada golpe); la púa que vuela, S.spkP */
function biteTick(e,E,dt,SL){e.btc=(e.btc||0)-dt;if(e.btc>0)return;let s=null,bd=BITER;for(const u of SL){if(u.air||!(u.hp>0))continue;const d=Math.hypot(u.x-e.x,u.y-e.y)-(u.en===e?.5:0);if(d<=bd){bd=d;s=u;}}/* la unidad pegada a ella (prefiere la que pelea con ella) */if(!s){e.btc=.2;return;}
 e._bite=1;try{hitUnit(s,(E.ud||0)*BITEM*(typeof udM==='function'?udM(e):1),e);}finally{e._bite=0;}e.btc=BITECD;e.btF={x:s.x,y:s.y,t:.35};S.fx.push({x:s.x,y:s.y,t:.3,m:.3,r:.5*K,col:'#d08a3a'});}
// ---- Basilisco: mirada petrificante ----
function gazeTick(e,dt){if(e.gzW>0){e.gzW-=dt;const t=e.gzT;if(!t||!S.list.includes(t)){e.gzW=0;e.gzT=null;e.gzc=1;return;}if(e.gzW<=0){t.jam=Math.max(t.jam||0,GAZET);t.stnU=S.wt+GAZET;e.gzT=null;e.gzc=GAZECD;S.fx.push({x:t.x,y:t.y,t:.5,m:.5,r:1*K,col:'#9aa08a'});}return;}
 e.gzc=(e.gzc===undefined?3:e.gzc)-dt;if(e.gzc>0)return;let b=null,bs=-1;const D=e.bsD||{};
 for(const t of S.list){if(!TW[t.type]||t.hero)continue;const d=Math.hypot(t.x-e.x,t.y-e.y);if(d>GAZER)continue;const sc=(D[t.id]||0)*1e3-d;if(sc>bs){bs=sc;b=t;}}
 if(!b){e.gzc=.5;return;}e.gzT=b;e.gzW=GAZEW;}
// ---- Hidra: cabezas ----
function headsTick(e){const n=e.hp<=e.max/3?3:e.hp<=e.max*2/3?2:1;if(n>(e.hyN||1)){S.fx.push({x:e.x,y:e.y,t:.6,m:.6,r:1*K,col:'#5ae0a0'});S.msg=ET[e.t].n+': le sale otra cabeza.';}if(n>(e.hyN||1))e.hyN=n;e.hyM=1+HEADM*((e.hyN||1)-1);}
// ---- tick general ----
function t7Tick(dt){const SL=liveUnits().filter(s=>!s.charm);
 if(S.smk&&S.smk.length){for(const c of S.smk)c.t-=dt;S.smk=S.smk.filter(c=>c.t>0);}
 if(S.spkP&&S.spkP.length){for(const p of S.spkP)p.t+=dt;S.spkP=S.spkP.filter(p=>p.t<.3);}
 if(S.coinB&&S.coinB.length){for(const c of S.coinB)c.t+=dt;S.coinB=S.coinB.filter(c=>c.t<.6);}
 for(const e of S.enemies){if(e.hp<=0)continue;const E=ET[e.t];if(!E)continue;if(e.btF&&e.btF.t>0)e.btF.t-=dt;
  if(E.heads)headsTick(e);if(E.ghost)ghostTick(e,SL);
  if(e.fx.freeze||e.fx.stun||e.fx.poly){if(E.gaze&&e.gzW>0){e.gzW=0;e.gzT=null;e.gzc=1;}continue;}
  if(E.spike)biteTick(e,E,dt,SL);if(E.gaze)gazeTick(e,dt);}}
{const _u=update;update=function(dt){_u(dt);if(!S)return;if(S.phase==='wave')t7Tick(dt);else{S.smk=[];S.coinB=[];}};}
// ---- dibujo ----
function t7Draw(g,lw){if(!S||!S.enemies)return;const X=v=>v*CS+CS/2,now=performance.now()/1000;
 for(const c of S.smk||[]){const a=Math.min(1,c.t/.5);for(let i=0;i<5;i++){g.fillStyle='rgba(120,120,135,'+(.28*a).toFixed(2)+')';g.beginPath();g.arc(X(c.x)+Math.cos(i*1.26+now*.8)*SMKR*CS*.45,X(c.y)+Math.sin(i*1.26+now*.8)*SMKR*CS*.45,SMKR*CS*.55,0,7);g.fill();}}
 for(const p of S.spkP||[]){const k=Math.min(1,p.t/.25),x=X(p.x0+(p.x1-p.x0)*k),y=X(p.y0+(p.y1-p.y0)*k),a=Math.atan2(p.y1-p.y0,p.x1-p.x0);g.strokeStyle='#5a3a1a';g.lineWidth=lw(2.5);g.beginPath();g.moveTo(x-Math.cos(a)*CS*.5,y-Math.sin(a)*CS*.5);g.lineTo(x,y);g.stroke();g.fillStyle='#8ae05a';g.beginPath();g.arc(x,y,Math.max(1.5,CS*.1),0,7);g.fill();}
 for(const c of S.coinB||[]){const k=c.t/.6;g.fillStyle='rgba(255,215,90,'+(1-k).toFixed(2)+')';g.strokeStyle='rgba(120,80,10,'+(1-k).toFixed(2)+')';g.lineWidth=lw(1);for(const s of[-1,1]){g.beginPath();g.arc(X(c.x)+s*CS*.4*k,X(c.y)-CS*1.2*Math.sin(Math.PI*k),Math.max(2,CS*.16),0,7);g.fill();g.stroke();}}
 for(const e of S.enemies){if(e.hp<=0)continue;const E=ET[e.t];if(!E)continue;const px=X(e.x),py=X(e.y),r=E.r*CS*EVS*(e.szm||1);
  if(E.ghost){g.fillStyle='rgba(200,225,255,'+(.18+.1*Math.sin(now*4)).toFixed(2)+')';g.beginPath();g.arc(px,py,r*1.3,0,7);g.fill();}
  if(E.gaze&&e.gzT){const t=e.gzT,k=1-e.gzW/GAZEW;g.strokeStyle='rgba(200,230,120,'+(.4+.5*k).toFixed(2)+')';g.lineWidth=lw(1.5+2.5*k);g.beginPath();g.moveTo(px,py);g.lineTo(X(t.x),X(t.y));g.stroke();
   g.fillStyle='#e8f27a';for(const s of[-1,1]){g.beginPath();g.arc(px+s*r*.3,py-r*.2,Math.max(1.5,r*.14),0,7);g.fill();}}
  if(E.heads&&(e.hyN||1)>1){g.fillStyle='#3a6a5a';g.strokeStyle='#1b1712';g.lineWidth=lw(1.2);for(let i=0;i<e.hyN;i++){const a=-Math.PI/2+(i-(e.hyN-1)/2)*.6;g.beginPath();g.arc(px+Math.cos(a)*r*1.15,py+Math.sin(a)*r*1.15,r*.28,0,7);g.fill();g.stroke();}}
  if(E.spike&&e.btF&&e.btF.t>0){g.strokeStyle='rgba(220,140,60,'+(e.btF.t/.35).toFixed(2)+')';g.lineWidth=lw(2.5);g.beginPath();g.arc(X(e.btF.x),X(e.btF.y),CS*.5,.3,2.8);g.stroke();g.beginPath();g.arc(X(e.btF.x),X(e.btF.y),CS*.5,3.4,5.9);g.stroke();}}
 for(const t of S.list||[]){if(!(t.stnU>S.wt))continue;const x=X(t.x),y=X(t.y);g.fillStyle='rgba(140,140,130,.6)';g.beginPath();g.arc(x,y,CT*1.05,0,7);g.fill();g.strokeStyle='rgba(70,70,60,.8)';g.lineWidth=lw(1.5);
  g.beginPath();g.moveTo(x-CT*.5,y-CT*.3);g.lineTo(x-CT*.1,y+CT*.1);g.lineTo(x+CT*.3,y-CT*.2);g.moveTo(x-CT*.1,y+CT*.1);g.lineTo(x,y+CT*.55);g.stroke();}}
{const _d=eSkillsDraw;eSkillsDraw=function(g,lw){_d(g,lw);try{t7Draw(g,lw);}catch(x){}};}
// ---- palabras clave ----
{const _k=kwHtml0,R=v=>(typeof RGV==='function'&&typeof f==='function')?RGV(f(v/K)):String(v/K).replace('.',',');kwHtml0=function(id,src){
 if(id==='esmoke')return '<b>Bomba de humo</b><small>La primera vez que recibe daño suelta humo: él y los que estén dentro (a '+R(SMKR)+' o menos) no se pueden apuntar ni reciben daño durante '+SMKT+' s.</small>';
 if(id==='eghost')return '<b>Ente</b><small>Lo físico lo atraviesa: solo le hace daño lo mágico y lo elemental. Tus unidades no lo paran, y a cada una que atraviesa le hace daño.</small>';
 if(id==='emimr')return '<b>Botín a la carrera</b><small>Suelta '+MIMG+' 🪙 por cada '+Math.round(MIMC*100)+' % de vida que pierde y una bolsa de '+MIMB+' 🪙 al morir. Si llega al núcleo te roba 200 🪙.</small>';
 if(id==='espike')return '<b>Púas venenosas</b><small>Sus disparos dejan 1 stack de veneno. Si tus unidades se le pegan, muerde con su cabeza de león.</small>';
 if(id==='egaze')return '<b>Mirada petrificante</b><small>Cada '+GAZECD+' s mira a una de tus torres cercanas (a '+R(GAZER)+' o menos; la que más daño le hace) y la deja petrificada '+GAZET+' s.</small>';
 if(id==='eheads')return '<b>Cabezas</b><small>Cada vez que pierde un tercio de su vida le sale otra cabeza y pega un '+Math.round(HEADM*100)+' % más fuerte a tus unidades.</small>';
 return _k(id,src);};}
{const KW7={smoke:['esmoke','Bomba de humo','💨'],ghost:['eghost','Ente','👻'],mimr:['emimr','Botín a la carrera','💰'],spike:['espike','Púas venenosas','🦂'],gaze:['egaze','Mirada petrificante','👁️'],heads:['eheads','Cabezas','🐍']};   // iconos provisionales: falta dibujarlos (prioritario)
 Object.assign(TMECKW,KW7);if(typeof MECG2!=='undefined')for(const k in KW7)MECG2.push(KW7[k]);
 if(typeof MECUSE2!=='undefined')for(const k in KW7)MECUSE2[KW7[k][0]]=Object.keys(TMEC).filter(id=>TMEC[id][k]).map(id=>'en:'+id);}
// ---- eventos: los costes pasan a ser estos enemigos (sin destripar: hasta que los ves, «unos enemigos» / «un enemigo») ----
const evSeen=k=>typeof seen==='function'&&seen('en',k);
function evT7(){if(typeof EVENTS==='undefined'||!ET.v01sicario||ET.v01sicario.pend)return;const E=EVENTS;
 const o=(ev,l)=>E[ev]&&E[ev].opts.find(x=>x.l===l);
 {const r=o('merchant','Robarle');if(r){Object.defineProperty(r,'c',{get:()=>'La próxima oleada trae '+(evSeen('v01sicario')?'4 Sicarios':'unos enemigos'),configurable:true});
   r.run=()=>{const id=rndRelic();addNow('v01sicario',4);if(id)gainRelic(id);return[id?'relic:'+id:'gold:0','evn:v01sicario:4'];};}}
 {const r=o('shrine','Llevarte el ídolo');if(r&&ET.v02espiritu&&!ET.v02espiritu.pend){Object.defineProperty(r,'c',{get:()=>'La próxima oleada trae '+(evSeen('v02espiritu')?'un Espíritu maldito (la maldición del santuario)':'un enemigo (la maldición del santuario)'),configurable:true});
   delete r.req;r.run=()=>{addNow('v02espiritu',1);const x=relOr('idol');return x.concat(['evn:v02espiritu:1']);};}}
 if(E.chest&&ET.v03mimico&&!ET.v03mimico.pend&&!o('chest','Abrirlo a la fuerza'))E.chest.opts.push({l:'Abrirlo a la fuerza',get c(){return 'La próxima oleada trae '+(evSeen('v03mimico')?'un Mímico enfurecido: suelta oro al pegarle':'un enemigo');},run:()=>{addNow('v03mimico',1);return['evn:v03mimico:1'];}});}
{const _ta=tallerAplicar;tallerAplicar=function(){const r=_ta.apply(this,arguments);try{evT7();}catch(x){}return r;};}
{const _c=chip;chip=function(k){const p=String(k).split(':');if(p[0]==='evn'){const t=p[1],n=+p[2]||1;return '💀 '+(n>1?n+' × ':'')+(evSeen(t)?(ET[t]||{}).n||t:'???');}return _c.apply(this,arguments);};}
