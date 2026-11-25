// ==================== v366 · Mecánicas de los enemigos nuevos del Taller, tanda 8: enemigos de evento de la Distópica ====================
// Acordado con Nogal el 25-nov (02:02). Medidas en celdas pequeñas (K = 5 = el ancho del camino). Sustituyen costes de los eventos (eventos_e2.js, abajo).
//  · Unidad de contención (netter, élite): cada 10 s lanza una red sobre el grupo (todas tus unidades a 2,5 celdas de la que elige, a 15 celdas o menos: lo que alcanza su disparo): 3 s sin andar
//    ni bloquear. Las de cuerpo a cuerpo pegan a lo que les pase al lado; las de distancia siguen disparando. («Llevarte el prototipo», en vez de la Élite extra.)
//  · Núcleo andante (reactor): al morir, pulso de 12,5 celdas: tus torres 4 s sin funcionar (Nogal: 4, y si es mucho, 3). Quita 3 de vida si llega.
//    («Activar el reactor» cuando sale mal, en vez de perder 3 de vida.)
//  · Cazaseñales (counter, élite): cada 6 s la antena avisa 1 s y lanza un pulso de 10 celdas: las torres apuntan al azar 2 s y tus unidades caen 1 s y dejan de
//    bloquear (una recién levantada no vuelve a caer, como con el Jabalí). («Quedarte su equipo», en vez de la Élite extra.)
//  · Centinela Omega (omegae, élite): sale con 2 de las 8 piezas al azar. Cada 12 s se para 4 s como torreta y las usa (abajo, CNP). («Activar el prototipo», en vez de −4.)
//  · Prototipos fallidos (scrapm): salen 5. Si uno muere con otro a 2,5 celdas, el vivo se queda sus piezas: +30 % de vida y algo más grande. («Extraer su núcleo».)
//  · Espécimen (evolve, élite): cada 8 s evoluciona (3 veces): +25 % de vida máxima, más grande y se cura un 20 %. («Tomar una muestra», en vez de −2 de vida.)
//  · Durmientes (thaw): salen 6 congelados: 40 % de velocidad y +30 de armadura; en 10 s se descongelan; la quemadura, el doble de rápido (Nogal).
//    («Quedarte el refrigerante», en vez de −2 de vida.)
Object.assign(TMEC,{v07contencion:{netter:1,evn:1,el:1},v08nucleoandante:{reactor:1,evn:1,dmg:3},v09cazasenales:{counter:1,evn:1,el:1},v10centinela:{omegae:1,evn:1,el:1},
 v11prototipos:{scrapm:1,evn:1},v12especimen:{evolve:1,evn:1,el:1},v13durmiente:{thaw:1,evn:1}});
const NETCD=10,NETR=RANGED_R/* dispara desde donde se para (a 15 celdas de tus unidades) */,NETA=K/2,NETT=3,NETF=.5,REAR=2.5*K,REAT=4,CNTCD=6,CNTW=1,CNTR=2*K,CNTT=2,CNTS=1,OMCD=12,OMDT=4,OMR=RANGED_R,OMCR=2*K,SCRR=K/2,SCRH=.3,EVOCD=8,EVON=3,EVOM=.25,EVOH=.2,
 THWT=10,THWS=.4,THWA=30,THWB=2;
// piezas del Centinela: n nombre, col color
const CNP={fis:{n:'físico',col:'#d9c08a'},ele:{n:'eléctrico',col:'#7ad0ff'},fue:{n:'fuego',col:'#ff7a3a'},ven:{n:'veneno',col:'#8ae05a'},mag:{n:'mágico',col:'#b08aff'},uni:{n:'unidades',col:'#c9d3dd'},con:{n:'control',col:'#5a8aff'},apo:{n:'apoyo',col:'#ffd75a'}};
// ---- Unidad de contención: red ----
function netTick(e,dt,SL){if(e.ntF){const f=e.ntF;f.t+=dt;if(f.s&&f.s.hp>0){f.x=f.s.x;f.y=f.s.y;}/* v366: sigue a la unidad elegida, para que no la esquive */if(f.t>=NETF){e.ntF=null;let n=0;for(const s of SL){if(s.air||!(s.hp>0)||Math.hypot(s.x-f.x,s.y-f.y)>NETA)continue;s.net=S.wt+NETT;s.en=null;s.fight=false;s.en2=null;n++;}
   S.fx.push({x:f.x,y:f.y,t:.5,m:.5,r:NETA,col:'#c9e0ff'});}return;}
 e.ntc=(e.ntc===undefined?2:e.ntc)-dt;if(e.ntc>0)return;let b=null,bn=0;
 for(const s of SL){if(s.air||!(s.hp>0)||(s.net>S.wt)||Math.hypot(s.x-e.x,s.y-e.y)>NETR)continue;let n=0;for(const o of SL)if(!o.air&&o.hp>0&&Math.hypot(o.x-s.x,o.y-s.y)<=NETA)n++;if(n>bn){bn=n;b=s;}}
 if(!b){e.ntc=.4;return;}e.ntF={x0:e.x,y0:e.y,x:b.x,y:b.y,s:b,t:0};e.ntc=NETCD;}
// atrapadas: no andan, y no retienen a nadie (peso casi 0: pueden pegar a lo que tengan al lado, pero no lo paran)
function withoutNet(fn){const saved=[];for(const t of unitTowers())if(t.sd&&t.sd.some(s=>s.net>S.wt)){saved.push([t,t.sd]);t.sd=t.sd.filter(s=>!(s.net>S.wt));}try{return fn();}finally{for(const[t,sd]of saved)t.sd=sd;}}
{const _w=unitWalk;unitWalk=function(dt){return withoutNet(()=>_w(dt));};}
{const _c=unitCombat;unitCombat=function(dt){const L=[];for(const t of unitTowers())for(const s of t.sd||[])if(s.net>S.wt){L.push([s,s.wt]);s.wt=1e-6;}try{return _c(dt);}finally{for(const[s,w]of L)s.wt=w;}};}
// ---- Núcleo andante: pulso al morir ----
{const _a=achDeath;achDeath=function(e){const r=_a.apply(this,arguments);try{t8Death(e);}catch(x){}return r;};}
function t8Death(e){if(!S||!e||e.leak)return;const E=ET[e.t];if(!E)return;
 if(E.reactor){for(const t of S.list){if(!TW[t.type]||t.hero||Math.hypot(t.x-e.x,t.y-e.y)>REAR)continue;t.jam=Math.max(t.jam||0,REAT);t.reaU=S.wt+REAT;}(S.reaP=S.reaP||[]).push({x:e.x,y:e.y,t:0});S.msg='¡El Núcleo andante revienta! Tus torres cercanas se apagan '+REAT+' s.';}
 if(E.scrapm){let b=null,bd=SCRR;for(const o of S.enemies){if(o===e||o.hp<=0||o.t!==e.t)continue;const d=Math.hypot(o.x-e.x,o.y-e.y);if(d<=bd){bd=d;b=o;}}
  if(b){b.hp=Math.min(b.max,b.hp+b.max*SCRH);b.szm=Math.min(1.5,(b.szm||1)*1.1);(S.scrP=S.scrP||[]).push({x0:e.x,y0:e.y,o:b,t:0});}}}
// ---- Cazaseñales: contrainterferencia ----
function cntTick(e,dt,SL){if(e.cnW>0){e.cnW-=dt;if(e.cnW<=0){for(const t of S.list){if(!TW[t.type]||t.hero||Math.hypot(t.x-e.x,t.y-e.y)>CNTR)continue;t.cfU=S.wt+CNTT;t.cfN=0;}
   for(const s of SL){if(s.air||!(s.hp>0)||s.udwn>0||s.uimm>0||Math.hypot(s.x-e.x,s.y-e.y)>CNTR)continue;s.udwn=CNTS;s.en=null;s.fight=false;s.en2=null;}
   (S.cnP=S.cnP||[]).push({x:e.x,y:e.y,t:0});e.cnc=CNTCD;}return;}
 e.cnc=(e.cnc===undefined?3:e.cnc)-dt;if(e.cnc>0)return;const any=S.list.some(t=>TW[t.type]&&!t.hero&&Math.hypot(t.x-e.x,t.y-e.y)<=CNTR)||SL.some(s=>!s.air&&Math.hypot(s.x-e.x,s.y-e.y)<=CNTR);if(!any){e.cnc=.4;return;}e.cnW=CNTW;}
// torres confundidas: cada medio segundo, un enemigo al azar a su alcance
function cfHold(){if(!S||!S.list)return;for(const t of S.list){if(!(t.cfU>S.wt))continue;const T=TW[t.type];if(!T||T.unit)continue;t.cfN=(t.cfN||0)-1/60;if(t.cfN>0&&t.tgt&&t.tgt.hp>0)continue;t.cfN=.5;
 const r=stats(t).range,L=S.enemies.filter(e=>e.hp>0&&!(T.ground&&isFly(e))&&Math.hypot(e.x-t.x,e.y-t.y)<=r);if(L.length)t.tgt=L[Math.floor(Math.random()*L.length)];}}
// ---- Centinela Omega ----
function omPieces(e){if(!e.omP){const k=Object.keys(CNP),a=k.splice(Math.floor(Math.random()*k.length),1)[0],b=k[Math.floor(Math.random()*k.length)];e.omP=[a,b];}return e.omP;}
const omShot=(e,x1,y1,col)=>(e.omS=e.omS||[]).push({x1,y1,t:0,col});
function omNear(e,SL,n){return SL.filter(s=>!s.air&&s.hp>0&&Math.hypot(s.x-e.x,s.y-e.y)<=OMR).sort((a,b)=>Math.hypot(a.x-e.x,a.y-e.y)-Math.hypot(b.x-e.x,b.y-e.y)).slice(0,n);}
function omTick(e,E,dt,SL){const P=omPieces(e);if(e.omS){for(const s of e.omS)s.t+=dt;e.omS=e.omS.filter(s=>s.t<.3);}
 if(e.omD>0){e.omD-=dt;e.omA=(e.omA||0)+dt;const tk=k=>{e['omc_'+k]=(e['omc_'+k]||0)-dt;if(e['omc_'+k]>0)return false;return true;};
  for(const k of P){
   if(k==='fis'&&tk(k)){e.omc_fis=.4;const s=omNear(e,SL,1)[0];if(s){hitUnit(s,3,e);omShot(e,s.x,s.y,CNP.fis.col);}}
   if(k==='ele'&&tk(k)){e.omc_ele=1;const L=omNear(e,SL,3);let p={x:e.x,y:e.y};for(const s of L){hitUnit(s,8,e);(e.omS=e.omS||[]).push({x0:p.x,y0:p.y,x1:s.x,y1:s.y,t:0,col:CNP.ele.col});p=s;}}
   if((k==='fue'||k==='ven')&&!e['omZ_'+k]){const s=omNear(e,SL,1)[0];if(s)e['omZ_'+k]={x:s.x,y:s.y};}
   if((k==='fue'||k==='ven')&&e['omZ_'+k]&&tk(k)){e['omc_'+k]=1;const z=e['omZ_'+k];for(const s of SL){if(s.air||!(s.hp>0)||Math.hypot(s.x-z.x,s.y-z.y)>K/2)continue;if(k==='fue'&&typeof uAddBurn==='function')uAddBurn(s,1,e);if(k==='ven'&&typeof uAddPois==='function')uAddPois(s,1.5,e);}}
   if(k==='mag'&&tk(k)){e.omc_mag=1;const s=omNear(e,SL,1)[0];if(s){hitUnit(s,12,e)/* golpe directo: no mira la armadura */;omShot(e,s.x,s.y,CNP.mag.col);}}
   if(k==='uni'&&!e.omU){e.omU=1;if(ET.swarm){const hp=ehpOf('swarm',S.round);for(let i=0;i<2;i++)(S.espw=S.espw||[]).push({t:'swarm',x:e.x+(i?.6:-.6),y:e.y,tx:e.tx,ty:e.ty,hp,max:hp,fx:{},src:null,pv:e.pv,fln:e.fln,fd:e.fd});}}
   if(k==='con')for(const t of S.list)if(TW[t.type]&&!t.hero&&Math.hypot(t.x-e.x,t.y-e.y)<=OMCR)t.omcU=S.wt+.15;
   if(k==='apo')for(const o of S.enemies)if(o!==e&&o.hp>0&&Math.hypot(o.x-e.x,o.y-e.y)<=1.5*K&&!(o.fx.haste&&o.fx.haste.m>1.2))o.fx.haste={m:1.2,t:.3};}
  if(e.omD<=0){e.omD=0;e.omc=OMCD;e.omU=0;e.omZ_fue=null;e.omZ_ven=null;}return;}
 e.omc=(e.omc===undefined?5:e.omc)-dt;if(e.omc>0)return;e.omD=OMDT;e.omA=0;e.fsp=0;S.fx.push({x:e.x,y:e.y,t:.5,m:.5,r:.8*K,col:'#3fe8ff'});}
{const _s=stats;stats=function(t){const s=_s(t);if(t&&t.omcU>S.wt&&s&&s.rate)return Object.assign({},s,{rate:s.rate*.7});return s;};}
// ---- Espécimen ----
function evoTick(e,dt){if((e.evN||0)>=EVON)return;e.evc=(e.evc===undefined?EVOCD:e.evc)-dt;if(e.evc>0)return;e.evc=EVOCD;e.evN=(e.evN||0)+1;const m0=e.max;e.max=m0*(1+EVOM);e.hp=Math.min(e.max,e.hp+(e.max-m0)+e.max*EVOH);
 e.szm=1+.15*e.evN;S.fx.push({x:e.x,y:e.y,t:.7,m:.7,r:1.2*K,col:'#c08aff'});}
// ---- Durmientes ----
function thawTick(e,dt){if((e.thw||0)>=1){e.ova=0;return;}e.thw=Math.min(1,(e.thw||0)+dt/THWT*(e.bn>0?THWB:1));e.ova=THWA*(1-e.thw);e.thwM=THWS+(1-THWS)*e.thw;}
// ---- tick general ----
function t8Tick(dt){const SL=liveUnits().filter(s=>!s.charm);
 for(const k of['reaP','cnP','scrP'])if(S[k]&&S[k].length){for(const p of S[k])p.t+=dt;S[k]=S[k].filter(p=>p.t<.8);}
 for(const e of S.enemies){if(e.hp<=0)continue;const E=ET[e.t];if(!E)continue;if(E.thaw)thawTick(e,dt);if(E.evolve)evoTick(e,dt);
  if(e.fx.freeze||e.fx.stun||e.fx.poly){if(E.counter&&e.cnW>0){e.cnW=0;e.cnc=1;}if(E.omegae&&e.omD>0){e.omD=0;e.omc=OMCD;e.omU=0;e.omZ_fue=null;e.omZ_ven=null;}continue;}
  if(E.netter)netTick(e,dt,SL);if(E.counter)cntTick(e,dt,SL);if(E.omegae)omTick(e,E,dt,SL);}}
{const _m=move;move=function(e,dt){if(e.omD>0)return false;return _m(e,dt);};}
{const _u=update;update=function(dt){if(S&&S.phase==='wave')cfHold();_u(dt);if(!S)return;if(S.phase==='wave')t8Tick(dt);else{for(const t of S.list||[]){t.cfU=0;t.omcU=0;}for(const s of liveUnits())s.net=0;}};}
// ---- dibujo ----
function t8Draw(g,lw){if(!S||!S.enemies)return;const X=v=>v*CS+CS/2,now=performance.now()/1000;
 for(const p of S.reaP||[]){const k=p.t/.8;g.strokeStyle='rgba(255,170,60,'+(1-k).toFixed(2)+')';g.lineWidth=lw(4);g.beginPath();g.arc(X(p.x),X(p.y),REAR*CS*k,0,7);g.stroke();}
 for(const p of S.cnP||[]){const k=p.t/.8;g.strokeStyle='rgba(150,110,230,'+(1-k).toFixed(2)+')';g.lineWidth=lw(3);g.beginPath();g.arc(X(p.x),X(p.y),CNTR*CS*k,0,7);g.stroke();}
 for(const p of S.scrP||[]){const k=Math.min(1,p.t/.5);g.fillStyle='#8a9a9a';for(let i=0;i<3;i++){g.beginPath();g.rect(X(p.x0+(p.o.x-p.x0)*k)+(i-1)*CS*.2,X(p.y0+(p.o.y-p.y0)*k)-CS*.3*Math.sin(Math.PI*k),CS*.18,CS*.18);g.fill();}}
 for(const e of S.enemies){if(e.hp<=0)continue;const E=ET[e.t];if(!E)continue;const px=X(e.x),py=X(e.y),r=E.r*CS*EVS*(e.szm||1);
  if(E.netter&&e.ntF){const f=e.ntF,k=Math.min(1,f.t/NETF),x=X(f.x0+(f.x-f.x0)*k),y=X(f.y0+(f.y-f.y0)*k)-Math.sin(Math.PI*k)*CS*1.5;g.strokeStyle='rgba(200,225,255,.9)';g.lineWidth=lw(1.5);
   g.beginPath();g.arc(x,y,CS*(.3+.5*k),0,7);g.moveTo(x-CS*.6*k,y);g.lineTo(x+CS*.6*k,y);g.moveTo(x,y-CS*.6*k);g.lineTo(x,y+CS*.6*k);g.stroke();g.strokeStyle='rgba(200,225,255,.35)';g.beginPath();g.arc(X(f.x),X(f.y),NETA*CS,0,7);g.stroke();}
  if(E.reactor){const k=1-e.hp/e.max;g.fillStyle='rgba(255,180,60,'+(.15+.45*k*(.6+.4*Math.sin(now*(4+10*k)))).toFixed(2)+')';g.beginPath();g.arc(px,py,r*(1.2+.3*k),0,7);g.fill();}
  if(E.counter){g.strokeStyle='#1b1712';g.lineWidth=lw(1.5);g.beginPath();g.moveTo(px,py-r);g.lineTo(px,py-r*1.7);g.stroke();g.fillStyle=e.cnW>0?(Math.sin(now*30)>0?'#ff5a5a':'#ffd75a'):'#8a7ac0';g.beginPath();g.arc(px,py-r*1.75,Math.max(2,r*.2),0,7);g.fill();
   if(e.cnW>0){g.strokeStyle='rgba(150,110,230,'+(.3+.5*(1-e.cnW/CNTW)).toFixed(2)+')';g.lineWidth=lw(1.5);g.setLineDash([lw(4),lw(4)]);g.beginPath();g.arc(px,py,CNTR*CS,0,7);g.stroke();g.setLineDash([]);}}
  if(E.omegae){const P=omPieces(e);P.forEach((k,i)=>{g.fillStyle=CNP[k].col;g.strokeStyle='#1b1712';g.lineWidth=lw(1);g.beginPath();g.arc(px+(i?1:-1)*r*.55,py-r*1.2,Math.max(2,r*.25),0,7);g.fill();g.stroke();});
   if(e.omD>0){g.strokeStyle='rgba(63,232,255,.8)';g.lineWidth=lw(2.5);g.beginPath();g.rect(px-r*1.3,py-r*1.3,r*2.6,r*2.6);g.stroke();g.strokeStyle='rgba(63,232,255,.25)';g.beginPath();g.arc(px,py,OMR*CS,0,7);g.stroke();
    for(const k of['fue','ven']){const z=e['omZ_'+k];if(!z)continue;g.fillStyle=k==='fue'?'rgba(255,110,40,.25)':'rgba(130,220,80,.25)';g.beginPath();g.arc(X(z.x),X(z.y),K/2*CS,0,7);g.fill();}}
   for(const s of e.omS||[]){g.strokeStyle=s.col;g.lineWidth=lw(2.2);g.globalAlpha=1-s.t/.3;g.beginPath();g.moveTo(X(s.x0!=null?s.x0:e.x),X(s.y0!=null?s.y0:e.y));g.lineTo(X(s.x1),X(s.y1));g.stroke();g.globalAlpha=1;}}
  if(E.evolve){for(let i=0;i<EVON;i++){g.fillStyle=i<(e.evN||0)?'#c08aff':'rgba(40,30,50,.45)';g.beginPath();g.arc(px+(i-1)*r*.5,py-r*1.45,Math.max(1.8,r*.16),0,7);g.fill();}
   if((e.evN||0)<EVON){const k=1-Math.max(0,e.evc||EVOCD)/EVOCD;g.strokeStyle='rgba(192,138,255,.8)';g.lineWidth=lw(2);g.beginPath();g.arc(px,py,r*1.25,-Math.PI/2,-Math.PI/2+k*6.283);g.stroke();}}
  if(E.thaw&&(e.thw||0)<1){const a=1-(e.thw||0);g.fillStyle='rgba(170,220,255,'+(.55*a).toFixed(2)+')';g.strokeStyle='rgba(230,245,255,'+(.8*a).toFixed(2)+')';g.lineWidth=lw(1.5);g.beginPath();g.arc(px,py,r*1.1,0,7);g.fill();g.stroke();}}
 for(const s of liveUnits())if(s.net>S.wt){g.strokeStyle='rgba(200,225,255,.85)';g.lineWidth=lw(1.2);const x=X(s.x),y=X(s.y),R=CS*.55;g.beginPath();for(let i=-1;i<=1;i++){g.moveTo(x-R,y+i*R*.5);g.lineTo(x+R,y+i*R*.5);g.moveTo(x+i*R*.5,y-R);g.lineTo(x+i*R*.5,y+R);}g.stroke();}
 for(const t of S.list||[]){const x=X(t.x),y=X(t.y);if(t.reaU>S.wt){g.fillStyle='rgba(40,30,20,.45)';g.beginPath();g.arc(x,y,CT*1.05,0,7);g.fill();g.fillStyle='#ffb43a';g.font='bold '+Math.round(CT*.6)+'px sans-serif';g.textAlign='center';g.fillText('⚡',x,y+CT*.2);}
  if(t.cfU>S.wt){for(let i=0;i<3;i++){const a=now*4+i*2.09;g.fillStyle='#ffe07a';g.font='bold '+Math.round(CT*.4)+'px sans-serif';g.textAlign='center';g.fillText('✦',x+Math.cos(a)*CT*.6,y-CT*.95+Math.sin(a)*CT*.2);}g.fillStyle='#b08aff';g.font='bold '+Math.round(CT*.55)+'px sans-serif';g.textAlign='center';g.fillText('?',x+CT*.6,y-CT*.6);}
  if(t.omcU>S.wt){g.strokeStyle='rgba(90,140,255,.7)';g.lineWidth=lw(2);g.beginPath();g.arc(x,y,CT*1.1,0,7);g.stroke();}}}
{const _d=eSkillsDraw;eSkillsDraw=function(g,lw){_d(g,lw);try{t8Draw(g,lw);}catch(x){}};}
// ---- palabras clave ----
{const _k=kwHtml0,R=v=>(typeof RGV==='function'&&typeof f==='function')?RGV(f(v/K)):String(v/K).replace('.',',');kwHtml0=function(id,src){
 if(id==='enetter')return '<b>Red de contención</b><small>Cada '+NETCD+' s lanza una red sobre un grupo de tus unidades (a '+R(NETR)+' o menos): '+NETT+' s sin andar ni bloquear. Las de cuerpo a cuerpo solo pegan a lo que les pase al lado.</small>';
 if(id==='ereactor')return '<b>Reactor inestable</b><small>Al morir revienta: tus torres a '+R(REAR)+' o menos se apagan '+REAT+' s.</small>';
 if(id==='ecounter')return '<b>Contrainterferencia</b><small>Cada '+CNTCD+' s lanza un pulso (a '+R(CNTR)+' o menos): tus torres apuntan al azar '+CNTT+' s y tus unidades caen '+CNTS+' s.</small>';
 if(id==='eomegae')return '<b>Piezas Omega</b><small>Lleva 2 piezas al azar. Cada '+OMCD+' s se para '+OMDT+' s como una torreta y las usa contra ti.</small>';
 if(id==='escrapm')return '<b>Piezas sueltas</b><small>Si uno muere junto a otro, el que queda se queda sus piezas: se cura un '+Math.round(SCRH*100)+' % y crece.</small>';
 if(id==='eevolve')return '<b>Evolución</b><small>Cada '+EVOCD+' s evoluciona (hasta '+EVON+' veces): '+Math.round(EVOM*100)+' % más de vida, más grande y se cura un '+Math.round(EVOH*100)+' %.</small>';
 if(id==='ethaw')return '<b>Congelado</b><small>Sale congelado: lento y con +'+THWA+' de armadura. En '+THWT+' s se descongela del todo; la quemadura lo descongela el doble de rápido.</small>';
 return _k(id,src);};}
{const KW8={netter:['enetter','Red de contención','🕸️'],reactor:['ereactor','Reactor inestable','☢️'],counter:['ecounter','Contrainterferencia','📶'],omegae:['eomegae','Piezas Omega','🔷'],scrapm:['escrapm','Piezas sueltas','🔩'],evolve:['eevolve','Evolución','🧬'],thaw:['ethaw','Congelado','🧊']};   // iconos provisionales: falta dibujarlos (prioritario)
 Object.assign(TMECKW,KW8);if(typeof MECG2!=='undefined')for(const k in KW8)MECG2.push(KW8[k]);
 if(typeof MECUSE2!=='undefined')for(const k in KW8)MECUSE2[KW8[k][0]]=Object.keys(TMEC).filter(id=>TMEC[id][k]).map(id=>'en:'+id);}
// ---- eventos de la Distópica: los costes pasan a ser estos enemigos (sin destripar: hasta verlos, «unos enemigos» / «un élite») ----
function evOpt(l){for(const id in EVENTS){const o=(EVENTS[id].opts||[]).find(x=>x.l===l);if(o)return o;}return null;}
function evT8(){if(typeof EVENTS==='undefined'||!ET.v07contencion||ET.v07contencion.pend)return;const ok=k=>ET[k]&&!ET[k].pend,nm=(k,a,b)=>evSeen(k)?a:b,setC=(o,f)=>Object.defineProperty(o,'c',{get:f,configurable:true});
 {const o=evOpt('Llevarte el prototipo');if(o&&ok('v07contencion')){const run0=o.run;setC(o,()=>'La próxima oleada trae '+nm('v07contencion','una Unidad de contención','un élite')+' (la seguridad del laboratorio te sigue)');
   o.run=()=>{const r=run0().filter(k=>k!=='elite');for(const p of S.portals)if(p.plan.elite>0){p.plan.elite--;break;}addNow('v07contencion',1);return r.concat(['evn:v07contencion:1']);};}}
 {const o=evOpt('Activar el reactor');if(o&&ok('v08nucleoandante')){delete o.req;o.run=()=>{if(Math.random()<.5){goldEv(200);return['gold:200'];}addNow('v08nucleoandante',1);return['evn:v08nucleoandante:1'];};}}
 {const o=evOpt('Quedarte su equipo');if(o&&ok('v09cazasenales')){const run0=o.run;setC(o,()=>'La próxima oleada trae '+nm('v09cazasenales','un Cazaseñales','un élite')+' (los que los buscaban vienen a por ti)');
   o.run=()=>{const r=run0().filter(k=>k!=='elite');for(const p of S.portals)if(p.plan.elite>0){p.plan.elite--;break;}addNow('v09cazasenales',1);return r.concat(['evn:v09cazasenales:1']);};}}
 {const o=evOpt('Activar el prototipo');if(o&&ok('v10centinela')){setC(o,()=>'La próxima oleada trae '+nm('v10centinela','el Centinela Omega','un élite')+' (el sistema de seguridad)');
   o.req=()=>EVK&&!uSpots(EVK).length?'No queda ningún solar libre en esta pieza':S.list.some(t=>t.type==='omega')?'Ya tienes un Prototipo Omega':'';o.run=()=>{S.uq.push({type:'omega',bk:EVK});addNow('v10centinela',1);return['tower:omega','evn:v10centinela:1'];};}}
 {const o=evOpt('Extraer su núcleo');if(o&&ok('v11prototipos')){setC(o,()=>'La próxima oleada trae '+nm('v11prototipos','5 Prototipos fallidos','unos enemigos'));delete o.req;o.run=()=>{addNow('v11prototipos',5);return ev2Relic('core2').concat(['evn:v11prototipos:5']);};}}
 {const o=evOpt('Tomar una muestra');if(o&&ok('v12especimen')){setC(o,()=>'La próxima oleada trae '+nm('v12especimen','un Espécimen (lo de dentro despierta)','un élite (lo de dentro despierta)'));delete o.req;o.run=()=>{addNow('v12especimen',1);return ev2Relic('sample').concat(['evn:v12especimen:1']);};}}
 {const o=evOpt('Quedarte el refrigerante');if(o&&ok('v13durmiente')){setC(o,()=>'La próxima oleada trae '+nm('v13durmiente','6 Durmientes (se descongelan las otras cámaras)','unos enemigos (se descongelan las otras cámaras)'));delete o.req;o.run=()=>{addNow('v13durmiente',6);return ev2Relic('cryo').concat(['evn:v13durmiente:6']);};}}
 {const o=evOpt('Descargar los registros de la terminal');if(o){setC(o,()=>'Salta la alarma: la próxima oleada trae un 10 % más de enemigos');o.run=()=>{moreEnemies(.1);giveVch('ab',1);return['vch:ab','more:10'];};}}}
{const _ta=tallerAplicar;tallerAplicar=function(){const r=_ta.apply(this,arguments);try{evT8();}catch(x){}return r;};}
