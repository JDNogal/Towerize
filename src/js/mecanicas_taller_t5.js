// ==================== v366 · Mecánicas de los enemigos nuevos del Taller, tanda 5 ====================
// Era Distópica, partida 2 (acordado con Nogal el 24-nov). Medidas en celdas pequeñas (K = 5 = el ancho del camino).
//  · Gusano excavador (burrow): cada 5 s se entierra 1,5 s; y si tiene una unidad a 2 celdas delante se entierra en el momento y pasa por debajo (sigue enterrado mientras
//    tenga unidades a 2,5 celdas, como mucho 3 s). Enterrado: tus unidades no lo paran y nada le hace daño ni lo apunta.
//  · Amalgama (amal): 2 % de vida por segundo. Las que están a 5 celdas se cambian de carril para juntarse; 1 s pegadas y se fusionan: 2 → vida de las dos +10 % y un 20 %
//    más grande; 3 → vida de las tres y un 40 % más grande. Nunca más de 3.
//  · Garrapata del vacío (vtick): vuela recta a la torre más cercana sin garrapata (10 celdas; si no queda ninguna libre, a la más cercana) y se le pega: esa torre hace un
//    50 % menos de daño hasta que mueran todas las que tiene (no se acumula) y no puede darles; las de alrededor y el héroe sí.
//  · Dron arpón (harp2): cada 6 s marca con un cable a una unidad a 7,5 celdas (prefiere las que pelean; también el héroe) y 0,5 s después la arrastra 10 celdas
//    camino atrás. Vuelve andando a su sitio. No hace daño.
//  · Inhibidor (inhib): las 3 torres más cercanas a 10 celdas disparan un 50 % más despacio mientras vive (Nogal: área que llegue a los dos lados y algo más; tope de
//    torres para que no apague media defensa).
//  · Nexo de colmena (nexus): une a los enemigos a 7,5 celdas (no jefes ni otros Nexos): la mitad del daño que reciben se lo lleva él. Al morir, los unidos, 1 s aturdidos.
//  · Fragata de escudo (fshield): escudo del 40 % de su vida (Nogal); si pasa 3 s sin recibir daño, se recarga entero.
//  · Saltador cuántico (qjump): si recibe de una vez más del 15 % de su vida, salta 10 celdas camino adelante (1 s entre saltos).
Object.assign(TMEC,{i02tunelador:{burrow:1},i16amalgama:{amal:1},i21garrapata:{vtick:1},i39choque:{harp2:1},i08inhibidor:{inhib:1},i20nexo:{nexus:1},i30fragata:{fshield:1},i31saltador:{qjump:1}});
const BURCD=5,BURT=1.5,BURSEE=2,BURMAX=3,AMREG=.02,AMSEE=K,AMFUS=1.2,AMT=1,TICKR=2*K,TICKM=.5,HARPCD=6,ARPR=1.5*K,HARPW=.5,HARPD=2*K,HARPT=.6,INHR=2*K,INHN=3,INHM=.7/* Nogal (25-nov): −30 % */,
 NEXR=1.5*K,NEXM=.5,FSHM=.4,FSHT=3,QJM=.05,QJD=2*K,QJCD=10/* Nogal (25-nov): salta con cualquier golpe de verdad (≥5 %) y espera 10 s; antes 15 % y 1 s */;
// ---- ocultar y modificar daño ----
function eHidX(e,t){return e.under>0||(!!t&&!!e.tkT&&e.tkT===t);}
{const _h=eHurtMod;eHurtMod=function(e,a,src,ty){if(e.under>0)return 0;
 // Nexo: la mitad del daño se lo lleva él
 const nx=e.nxL;if(nx&&nx!==e&&nx.hp>0&&S.enemies.includes(nx)&&!e._nxIn){const part=a*NEXM;a-=part;nx._nxIn=1;try{hurt(nx,part,src,ty);}finally{nx._nxIn=0;}}
 // Fragata: el escudo absorbe primero
 if(e.shM>0){e.shT=S.wt;if(e.sh>0){const k=Math.min(e.sh,a);e.sh-=k;a-=k;}}
 a=_h(e,a,src,ty);
 // Saltador: golpe grande → salta
 const E=ET[e.t];if(E&&E.qjump&&a>=e.max*QJM&&!(e.qjc>S.wt))e.qjp=1;
 return a;};}
// (enterrado se ve medio transparente: lo hace eAlpha de elites.js, que usa camoHid)
// ---- Gusano excavador ----
function burrowTick(e,dt,SL){if(e.under>0){e.under-=dt;e.undA=(e.undA||0)+dt;const near=SL.some(s=>!s.air&&Math.hypot(s.x-e.x,s.y-e.y)<=BURSEE+.5);if(near&&e.undA<BURMAX&&e.under<.1)e.under=.1;if(e.under<=0){e.under=0;e.undA=0;e.burc=BURCD;}e.nblk=e.under>0?1:0;return;}
 e.nblk=0;e.burc=(e.burc===undefined?BURCD:e.burc)-dt;const ahead=e.ct>0||e.stopped&&SL.some(s=>s.en===e)||SL.some(s=>!s.air&&Math.hypot(s.x-e.x,s.y-e.y)<=BURSEE&&(typeof tmAhead!=='function'||tmAhead(e,s,BURSEE+.5)>=0||Math.hypot(s.x-e.x,s.y-e.y)<=1.2))/* una unidad delante, o ya lo están parando */;
 if(ahead||e.burc<=0){e.under=BURT;e.undA=0;e.nblk=1;e.stopped=false;e.ct=0;tmRelease(e);S.fx.push({x:e.x,y:e.y,t:.4,m:.4,r:.6*K,col:'#8a6a4a'});}}
// ---- Amalgama ----
function amalTick(e,dt){e.amN=e.amN||1;if(e.hp<e.max)e.hp=Math.min(e.max,e.hp+e.max*AMREG*dt);if(e.amN>=3)return;let b=null,bd=AMSEE;
 for(const o of S.enemies){if(o===e||o.hp<=0||!ET[o.t]||!ET[o.t].amal||(o.amN||1)+e.amN>3)continue;const d=Math.hypot(o.x-e.x,o.y-e.y);if(d<bd){bd=d;b=o;}}
 if(!b){e.fusT=0;return;}if(b.fln!=null&&e.fln!==b.fln&&typeof setLane==='function')setLane(e,b.fln);
 if(bd<=AMFUS){e.fusT=(e.fusT||0)+dt;b.fusG=S.wt+.1;e.fusG=S.wt+.1;if(e.fusT>=AMT&&e.hp>=b.hp){const n=e.amN+(b.amN||1),hp=e.hp+b.hp,mx=e.max+b.max;S.enemies.splice(S.enemies.indexOf(b),1);
   e.amN=n;e.max=mx;e.hp=Math.min(mx,hp+(n===2?mx*.1:0));e.szm=n===2?1.2:1.4;e.gold2=(e.gold2||0)+(ET[b.t].gold||0)*(b.amN||1);e.fusT=0;S.fx.push({x:e.x,y:e.y,t:.6,m:.6,r:1.2*K,col:'#5ae0b0'});}}
 else e.fusT=0;}
// ---- Garrapata del vacío ----
function tickPick(e){let free=null,fd=TICKR,any=null,ad=TICKR;for(const t of S.list){const T=TW[t.type];if(!T||t.hero)continue;const d=Math.hypot(t.x-e.x,t.y-e.y);if(d>TICKR)continue;
  const has=S.enemies.some(o=>o!==e&&o.hp>0&&(o.tkT===t||o.tkGo===t));if(!has&&d<fd){fd=d;free=t;}if(d<ad){ad=d;any=t;}}return free||any;}
function tickTick(e,E,dt){if(e.tkT){if(!S.list.includes(e.tkT)){e.tkT=null;return;}e.x=e.tkT.x+(e.tkO||0);e.y=e.tkT.y-.6;return;}
 if(!e.tkGo||!S.list.includes(e.tkGo))e.tkGo=tickPick(e);const t=e.tkGo;if(!t)return;const dx=t.x-e.x,dy=t.y-.6-e.y,d=Math.hypot(dx,dy),st=E.sp*(e.fx.slow?e.fx.slow.m:1)*(S.espd||1)*dt;
 if(d<=st+.05){e.tkT=t;e.tkGo=null;e.tkO=(S.enemies.filter(o=>o.tkT===t).length-1)*.5;}else{e.x+=dx/d*st;e.y+=dy/d*st;}}
{const _s=stats;stats=function(t){const s=_s(t);if(t&&s&&S&&S.enemies&&S.enemies.some(o=>o.tkT===t&&o.hp>0)&&s.dmg!=null)return Object.assign({},s,{dmg:s.dmg*TICKM});return s;};}
// ---- Dron arpón ----
function harpBack(q,n){const F=S.field;let p={x:q.x,y:q.y};for(let i=0;i<n;i++){let b=null;for(const[a,c]of[[1,0],[-1,0],[0,1],[0,-1]]){const x=p.x+a,y=p.y+c;if(inb(x,y)&&S.cells[y][x]===2&&F[y][x]<1e9&&F[y][x]>F[p.y][p.x]&&(!b||F[y][x]>F[b.y][b.x]))b={x,y};}if(!b)break;p=b;}return p;}
function harpTick(e,dt,SL){if(e.hpW>0){e.hpW-=dt;const s=e.hpS;if(!s||!(s.hp>0)){e.hpW=0;e.hpS=null;e.hpc=1;return;}if(e.hpW<=0){const q=pathNear(s.x,s.y)||{x:Math.round(s.x),y:Math.round(s.y)},d=hurlFwd(q,HARPD)/* v366 (Nogal): hacia donde van, no hacia atrás */;
   s.hook=HARPT;s.hkd={x0:s.x,y0:s.y,x1:d.x,y1:d.y,t:0};s.en=null;s.fight=false;s.en2=null;e.hpc=HARPCD;e.hpS=null;}return;}
 e.hpc=(e.hpc===undefined?2:e.hpc)-dt;if(e.hpc>0)return;let b=null,bs=1e9;for(const s of SL){if(s.air||s.hook>0||(s.H&&s.H.camo>0))continue;const d=Math.hypot(s.x-e.x,s.y-e.y);if(d>ARPR)continue;const sc=d-(s.fight?50:0);if(sc<bs){bs=sc;b=s;}}
 if(b){e.hpS=b;e.hpW=HARPW;}else e.hpc=.3;}
function hookTick(dt){for(const s of liveUnits()){if(!(s.hook>0)||!s.hkd)continue;s.hook-=dt;const h=s.hkd;h.t+=dt;const k=Math.min(1,h.t/HARPT);s.x=h.x0+(h.x1-h.x0)*k;s.y=h.y0+(h.y1-h.y0)*k;if(s.hook<=0){s.hook=0;s.hkd=null;}}}
// ---- Inhibidor ----
function inhibTick(e){const L=S.list.filter(t=>{const T=TW[t.type];return T&&!t.hero&&!T.unit&&!T.support&&Math.hypot(t.x-e.x,t.y-e.y)<=INHR;}).sort((a,b)=>Math.hypot(a.x-e.x,a.y-e.y)-Math.hypot(b.x-e.x,b.y-e.y)).slice(0,INHN);
 e.inhL=L;for(const t of L)t.inhU=S.wt+.15;}
{const _s=stats;stats=function(t){const s=_s(t);if(t&&t.inhU>S.wt&&s&&s.rate)return Object.assign({},s,{rate:s.rate*INHM});return s;};}
// ---- Nexo de colmena ----
function nexusTick(e){const L=[];for(const o of S.enemies){if(o===e||o.hp<=0||isBoss(o)||(ET[o.t]&&ET[o.t].nexus)||ET[o.t].flag||Math.hypot(o.x-e.x,o.y-e.y)>NEXR)continue;o.nxL=e;o.nxU=S.wt+.2;L.push(o);}e.nxA=L;}
{const _a=achDeath;achDeath=function(e){const E=e&&ET[e.t];if(E&&E.nexus&&S&&S.enemies)for(const o of S.enemies)if(o.nxL===e){o.nxL=null;if(o.hp>0&&!isBoss(o)){o.fx.stun={t:1};}}
 if(E&&E.amal&&e.gold2&&!e.leak&&S){S.gold+=e.gold2;}/* una Amalgama fusionada da el oro de todas */return _a.apply(this,arguments);};}
// ---- Saltador cuántico ----
function qjumpDo(e){const x0=e.x,y0=e.y;e.fsp=0;/* se teletransporta: si una unidad lo retenía, la deja atrás */tmRelease(e);e.stopped=false;e.ct=0;let d=0;for(let i=0;i<300&&d<QJD;i++){const px=e.x,py=e.y;if(move(e,.05)){e.leak=true;break;}d+=Math.hypot(e.x-px,e.y-py);}
 e.qjc=S.wt+QJCD;S.fx.push({x:x0,y:y0,t:.5,m:.5,r:.8*K,col:'#9a6aff'});S.fx.push({x:e.x,y:e.y,t:.5,m:.5,r:.8*K,col:'#c9a8ff'});e.qjF={x0,y0,t:.5};}
// ---- tick general ----
function t5Tick(dt){const SL=liveUnits().filter(s=>!s.charm);hookTick(dt);
 for(const e of S.enemies){if(e.hp<=0)continue;const E=ET[e.t];if(!E)continue;
  if(E.fshield){if(!(e.shM>0)){e.shM=e.max*FSHM;e.sh=e.shM;e.shT=-99;}if(e.sh<e.shM&&S.wt-e.shT>=FSHT)e.sh=e.shM;}
  if(e.nxL&&!(e.nxU>S.wt))e.nxL=null;
  if(E.qjump&&e.qjp){e.qjp=0;if(!e.fx.stun&&!e.fx.freeze&&!e.fx.root)qjumpDo(e);}
  if(E.vtick)tickTick(e,E,dt);
  if(e.fx.freeze||e.fx.stun||e.fx.poly){if(E.burrow&&e.under>0)burrowTick(e,dt,SL);continue;}
  if(E.burrow)burrowTick(e,dt,SL);if(E.amal)amalTick(e,dt);if(E.harp2)harpTick(e,dt,SL);if(E.inhib)inhibTick(e);if(E.nexus)nexusTick(e);}}
{const _m=move;move=function(e,dt){if(e.tkT||e.tkGo)return false;/* sin torre a 10 celdas sigue el camino como cualquier volador */return _m(e,dt);};}
{const _u=update;update=function(dt){_u(dt);if(!S)return;if(S.phase==='wave')t5Tick(dt);else if(S.list){for(const t of S.list)t.inhU=0;for(const s of liveUnits()){s.hook=0;s.hkd=null;}}};}
// ---- dibujo ----
function t5Draw(g,lw){if(!S||!S.enemies)return;const X=v=>v*CS+CS/2,now=performance.now()/1000;
 for(const e of S.enemies){if(e.hp<=0)continue;const E=ET[e.t];if(!E)continue;const px=X(e.x),py=X(e.y),r=E.r*CS*EVS*(e.szm||1);
  if(e.under>0){g.fillStyle='#6a5034';g.strokeStyle='#3a2a1a';g.lineWidth=lw(1.5);g.beginPath();g.ellipse(px,py+r*.2,r*1.1,r*.6,0,0,7);g.fill();g.stroke();for(let i=1;i<4;i++){g.fillStyle='rgba(106,80,52,'+(.5-i*.12).toFixed(2)+')';g.beginPath();g.arc(px-(e.tx-e.x)*CS*i*.6,py-(e.ty-e.y)*CS*i*.6,r*(.5-i*.08),0,7);g.fill();}}
  if(E.amal&&e.fusG>S.wt){g.strokeStyle='rgba(90,224,176,'+(.5+.4*Math.sin(now*14)).toFixed(2)+')';g.lineWidth=lw(2.5);g.beginPath();g.arc(px,py,r*1.35,0,7);g.stroke();}
  if(E.vtick&&e.tkT){const t=e.tkT;g.strokeStyle='rgba(120,220,120,.8)';g.lineWidth=lw(2);g.beginPath();g.arc(X(t.x),X(t.y),CT*1.3,0,7);g.stroke();}
  if(e.hpS){const s=e.hpS,k=1-e.hpW/HARPW;g.strokeStyle='rgba(200,210,220,.9)';g.lineWidth=lw(2);g.setLineDash([lw(4),lw(3)]);g.beginPath();g.moveTo(px,py);g.lineTo(X(s.x),X(s.y));g.stroke();g.setLineDash([]);g.strokeStyle='rgba(255,80,60,'+(.5+.5*k).toFixed(2)+')';g.beginPath();g.arc(X(s.x),X(s.y),CS*(1.2-.5*k),0,7);g.stroke();}
  if(E.inhib){g.fillStyle='rgba(30,74,90,.10)';g.strokeStyle='rgba(80,180,220,.55)';g.lineWidth=lw(1.6);g.beginPath();g.arc(px,py,INHR*CS,0,7);g.fill();g.stroke();
   for(const t of e.inhL||[]){g.strokeStyle='rgba(80,180,220,.7)';g.lineWidth=lw(1.4);g.setLineDash([lw(3),lw(4)]);g.beginPath();g.moveTo(px,py);g.lineTo(X(t.x),X(t.y));g.stroke();g.setLineDash([]);
    const x=X(t.x),y=X(t.y)-CT*1.35,rr=CT*.4;g.fillStyle='#2a6a8a';g.strokeStyle='#1b1712';g.lineWidth=lw(1.4);g.beginPath();g.arc(x,y,rr,0,7);g.fill();g.stroke();g.strokeStyle='#bfefff';g.lineWidth=lw(2);g.beginPath();g.moveTo(x-rr*.5,y);g.lineTo(x+rr*.5,y);g.stroke();}}
  if(E.nexus)for(const o of e.nxA||[]){if(o.hp<=0)continue;g.strokeStyle='rgba(210,150,255,'+(.6+.3*Math.sin(now*6+o.x)).toFixed(2)+')';g.lineWidth=lw(2.5);g.beginPath();g.moveTo(px,py);g.quadraticCurveTo((px+X(o.x))/2,(py+X(o.y))/2-CS,X(o.x),X(o.y));g.stroke();}
  if(E.fshield&&e.sh>0){const a=e.sh/e.shM;g.fillStyle='rgba(90,160,255,'+(.12+.15*a).toFixed(2)+')';g.strokeStyle='rgba(140,200,255,'+(.4+.5*a).toFixed(2)+')';g.lineWidth=lw(2);g.beginPath();g.arc(px,py,r*1.45,0,7);g.fill();g.stroke();}
  if(e.qjF&&e.qjF.t>0){e.qjF.t-=1/60;const a=e.qjF.t/.5;g.strokeStyle='rgba(180,140,255,'+a.toFixed(2)+')';g.lineWidth=lw(2.5);g.setLineDash([lw(4),lw(5)]);g.beginPath();g.moveTo(X(e.qjF.x0),X(e.qjF.y0));g.lineTo(px,py);g.stroke();g.setLineDash([]);}}
 for(const s of liveUnits())if(s.hook>0&&s.hkd){g.strokeStyle='rgba(220,230,240,.8)';g.lineWidth=lw(2);g.beginPath();g.moveTo(X(s.hkd.x0),X(s.hkd.y0));g.lineTo(X(s.x),X(s.y));g.stroke();}}
{const _d=eSkillsDraw;eSkillsDraw=function(g,lw){_d(g,lw);try{t5Draw(g,lw);}catch(x){}};}
// ---- palabras clave ----
{const _k=kwHtml0,R=v=>(typeof RGV==='function'&&typeof f==='function')?RGV(f(v/K)):String(v/K).replace('.',',');kwHtml0=function(id,src){
 if(id==='eburrow')return '<b>Excavar</b><small>Cada '+BURCD+' s se mete bajo tierra '+String(BURT).replace('.',',')+' s, y en cuanto tiene una unidad tuya delante se entierra y pasa por debajo. Bajo tierra no se le puede parar ni hacer daño.</small>';
 if(id==='eamal')return '<b>Fusión</b><small>Se regenera y busca a otras Amalgamas cercanas. Si pasan 1 s juntas, se fusionan en una más grande con la vida de las dos (hasta 3).</small>';
 if(id==='evtick')return '<b>Parásito</b><small>Vuela a tu torre más cercana y se le pega: esa torre hace un '+Math.round((1-TICKM)*100)+' % menos de daño hasta que mueran todas las que tiene, y no puede darles. Las de alrededor y el héroe sí.</small>';
 if(id==='eharp2')return '<b>Arpón</b><small>Cada '+HARPCD+' s engancha a una unidad tuya cercana (también al héroe) y la arrastra '+R(HARPD)+' camino atrás. Vuelve andando a su sitio.</small>';
 if(id==='einhib')return '<b>Inhibición</b><small>Mientras vive, tus '+INHN+' torres más cercanas (a '+R(INHR)+' o menos) disparan un '+Math.round((1-INHM)*100)+' % más despacio.</small>';
 if(id==='enexus')return '<b>Vínculo de colmena</b><small>Une a los enemigos de alrededor (a '+R(NEXR)+' o menos): la mitad del daño que reciben se lo lleva el Nexo. Al morir, los unidos quedan aturdidos 1 s.</small>';
 if(id==='efshield')return '<b>Escudo de energía</b><small>Un escudo del '+Math.round(FSHM*100)+' % de su vida absorbe el daño. Si pasa '+FSHT+' s sin recibir daño, se recarga entero.</small>';
 if(id==='eqjump')return '<b>Salto cuántico</b><small>Si recibe de una vez un golpe de más del '+Math.round(QJM*100)+' % de su vida, se teletransporta '+R(QJD)+' camino adelante. Después tarda '+QJCD+' s en poder volver a saltar.</small>';
 return _k(id,src);};}
{const KW5={burrow:['eburrow','Excavar','🪱'],amal:['eamal','Fusión','🫧'],vtick:['evtick','Parásito','🕷️'],harp2:['eharp2','Arpón','🪝'],inhib:['einhib','Inhibición','📡'],nexus:['enexus','Vínculo de colmena','🕸️'],fshield:['efshield','Escudo de energía','🛡️'],qjump:['eqjump','Salto cuántico','✨']};   // iconos provisionales: falta dibujarlos (prioritario)
 Object.assign(TMECKW,KW5);if(typeof MECG2!=='undefined')for(const k in KW5)MECG2.push(KW5[k]);
 if(typeof MECUSE2!=='undefined')for(const k in KW5)MECUSE2[KW5[k][0]]=Object.keys(TMEC).filter(id=>TMEC[id][k]).map(id=>'en:'+id);}
