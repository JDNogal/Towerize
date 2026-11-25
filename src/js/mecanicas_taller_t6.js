// ==================== v366 · Mecánicas de los enemigos nuevos del Taller, tanda 6 ====================
// Era Distópica, partida 3 (acordado con Nogal el 25-nov). Medidas en celdas pequeñas (K = 5 = el ancho del camino).
//  · Proyector holográfico (holo2): los primeros 5 s no hace nada; después, cada 10 s copia al enemigo más fuerte (más vida máxima) a 7,5 celdas: 2 copias con el 50 % de
//    su vida que hacen todo lo que hace el original. No copia jefes, ni copias, ni a otro Proyector. Si le cortan el paso pega puñetazos flojos (último recurso, Nogal).
//    Las copias dan 1 de oro (Nogal: «por las risas»).
//  · Arrojador de colmena (hurl): cada 2,5 s agarra al enemigo pequeño de tierra más cercano a 5 celdas (prefiere los que le vienen por detrás), marca el arco 0,6 s y lo
//    lanza 15 celdas camino adelante por encima de esquinas y unidades. Al caer, tus unidades a 2,5 celdas (todo el ancho del camino) caen 1 s; una recién levantada no
//    vuelve a caer (la misma regla que el Jabalí). No lanza élites, jefes, voladores ni cosas grandes.
//  · Lanzadera de desembarco (lander): cada 8 s marca una diana 1 s en el camino por delante y suelta una cápsula clavada (100 de vida; se le puede pegar). A los 2 s se
//    abre y saca un Autómata cada 3 s, sin límite (Nogal). Cuando ya no queda nada más de la oleada, la cápsula se apaga y se rompe sola (si no, la oleada no acabaría).
//  · Dron reciclador (recyc): no ataca. Cada 3 enemigos que mueren a 7,5 celdas de él, los restos vuelan hacia él y monta un Autómata de chatarra en el camino (1 de oro).
//  · Portador de feromonas (phero): cada alienígena que muere a 7,5 celdas de él deja una nube de 2,5 celdas de radio (todo el camino) 4 s. Los alienígenas de tierra que la
//    pisan, +15 % de velocidad 3 s, hasta 3 veces (+45 %, Nogal).
//  · Dron saboteador (sabo): no dispara a las unidades. Cada 6 s clava un dardo a una torre a 10 celdas: primero las que están sobre una casilla ★, luego cualquier
//    casilla especial (al azar) y si no, las que tienen bufos de otras torres. 5 s sin su casilla especial ni esos bufos.
Object.assign(TMEC,{i24holo:{holo2:1,ud:1},i32arrojador:{hurl:1},i18lanzadera:{lander:1},i22reciclador:{recyc:1,rg:'melee',ud:0},i36feromonas:{phero:1},i46saboteador:{sabo:1,rg:'melee',ud:0}});
const HOLOW=5,HOLOCD=10,HOLOR=1.5*K,HOLOM=.5,HOLON=2,THRCD=2.5,THRR=K,THRW=.6,THRD=3*K,THRT=.6,THRA=K/2,THRS=1,LANDCD=8,LANDW=1,LANDA=K,CAPO=2,CAPCD=3,
 RECR=1.5*K,RECN=3,RECT=.6,PHER=1.5*K,PHEA=K/2,PHET=4,PHEM=.15,PHEN=3,PHEU=3,SABCD=6,SBTR=2*K,SBTT=5,SABF=.4;
// cápsula de desembarco: quieta (flag), se puede destruir, no sale en el compendio (gen)
ET.tcaps={n:'Cápsula de desembarco',era:2,gold:2,hp:1,hf:100,sp:0,r:ET.norm.r*1.1,col:'#5a6a7a',dmg:0,ap:20,am:0,ud:0,ac:9,need:1,rg:'melee',xp:1,gen:1,fac:'m',flag:1};
if(typeof EIC!=='undefined')EIC.tcaps='🛢️';   // icono provisional: falta dibujarlo
// ---- camino adelante (al revés que harpBack) ----
function hurlFwd(q,n){const F=S.field;let p={x:q.x,y:q.y};for(let i=0;i<n;i++){let b=null;for(const[a,c]of[[1,0],[-1,0],[0,1],[0,-1]]){const x=p.x+a,y=p.y+c;if(inb(x,y)&&S.cells[y][x]===2&&F[y][x]<F[p.y][p.x]&&(!b||F[y][x]<F[b.y][b.x]))b={x,y};}if(!b)break;p=b;}return p;}
// ---- ocultar: el que va volando lanzado no se puede apuntar ----
{const _x=eHidX;eHidX=function(e,t){return !!e.thr||_x(e,t);};}
// ---- oro: las copias y los Autómatas de chatarra dan 1 ----
{const _a=achDeath;achDeath=function(e){const r=_a.apply(this,arguments);if(S&&e&&(e.cpy||e.scrp)&&!e.leak)S._g1=S.gold;else if(S)S._g1=null;try{t6Death(e);}catch(x){}return r;};}
{const _mf=mimFeed;mimFeed=function(e){if(S&&S._g1!=null&&e&&(e.cpy||e.scrp)){S.gold=S._g1+1;S._g1=null;}return _mf.apply(this,arguments);};}
function t6Death(e){if(!S||!e||e.leak)return;const E=ET[e.t];if(!E||E.flag||E.gen===1)return;
 for(const r of S.enemies){if(r===e||r.hp<=0)continue;const R=ET[r.t];if(!R)continue;
  if(R.recyc&&Math.hypot(r.x-e.x,r.y-e.y)<=RECR){r.rcN=(r.rcN||0)+1;(r.rcP=r.rcP||[]).push({x:e.x,y:e.y,t:0});if(r.rcN>=RECN){r.rcN-=RECN;r.rcB=RECT;}}
  if(R.phero&&E.fac==='a'&&Math.hypot(r.x-e.x,r.y-e.y)<=PHER)(S.phC=S.phC||[]).push({x:e.x,y:e.y,t:PHET,got:[]});}}
// ---- Proyector holográfico ----
function mkCopy(o,n,src){const hp=o.max*HOLOM;for(let i=0;i<n;i++){const ln=o.fln!=null?Math.max(-2,Math.min(2,o.fln+(i?1:-1))):null,a=Math.random()*6.28;
  (S.espw=S.espw||[]).push({t:o.t,x:o.x+Math.cos(a)*.6,y:o.y+Math.sin(a)*.6,tx:o.tx,ty:o.ty,hp,max:hp,fx:{},src:null,pv:o.pv,fln:ln,fd:o.fd,cpy:1,szm:o.szm,cpyF:{x0:src.x,y0:src.y,t:.5}});}}
function holoTick(e,dt){e.hoC=(e.hoC===undefined?HOLOW:e.hoC)-dt;if(e.hoC>0)return;let b=null,bm=0;
 for(const o of S.enemies){if(o===e||o.hp<=0||o.cpy||isBoss(o)||!ET[o.t]||ET[o.t].holo2||ET[o.t].flag||ET[o.t].gen===1||o.under>0||o.thr||Math.hypot(o.x-e.x,o.y-e.y)>HOLOR)continue;if(o.max>bm){bm=o.max;b=o;}}
 if(!b){e.hoC=.5;return;}mkCopy(b,HOLON,e);e.hoC=HOLOCD;e.hoB={x:b.x,y:b.y,t:.6};S.fx.push({x:b.x,y:b.y,t:.6,m:.6,r:.9*K,col:'#3ab8d8'});}
// ---- Arrojador de colmena ----
function hurlOk(e,o){const E=ET[o.t];return o!==e&&o.hp>0&&E&&!E.el&&!E.flag&&!E.hurl&&!isBoss(o)&&!isFly(o)&&!o.thr&&!(o.under>0)&&(TAM[o.t]||1)<=1.5;}
function hurlTick(e,dt){if(e.thW>0){e.thW-=dt;const o=e.thO;if(!o||!(o.hp>0)||!S.enemies.includes(o)){e.thW=0;e.thO=null;e.thc=.5;return;}o.thH=S.wt+.1;
  if(e.thW<=0){const L=e.thL;o.thr={x0:o.x,y0:o.y,x1:L.x,y1:L.y,t:0};o.thH=0;tmRelease(o);o.stopped=false;o.ct=0;e.thO=null;e.thL=null;e.thc=THRCD;}return;}
 e.thc=(e.thc===undefined?1:e.thc)-dt;if(e.thc>0)return;const F=S.field,fe=F[Math.round(e.y)]&&F[Math.round(e.y)][Math.round(e.x)];let b=null,bs=1e9;
 for(const o of S.enemies){if(!hurlOk(e,o))continue;const d=Math.hypot(o.x-e.x,o.y-e.y);if(d>THRR)continue;const fo=F[Math.round(o.y)]&&F[Math.round(o.y)][Math.round(o.x)];const sc=d-(fo>fe?THRR:0)/* detrás primero */;if(sc<bs){bs=sc;b=o;}}
 if(!b){e.thc=.3;return;}const q=pathNear(b.x,b.y)||{x:Math.round(b.x),y:Math.round(b.y)};e.thO=b;e.thL=hurlFwd(q,THRD);e.thW=THRW;b.thH=S.wt+.1;}
function thrTick(e,dt){const h=e.thr;h.t+=dt;const k=Math.min(1,h.t/THRT);e.x=h.x0+(h.x1-h.x0)*k;e.y=h.y0+(h.y1-h.y0)*k-Math.sin(Math.PI*k)*1.2*K*.4;e.thZ=Math.sin(Math.PI*k);
 if(k<1)return;e.x=e.tx=h.x1;e.y=e.ty=h.y1;e.pv=null;e.thr=null;e.thZ=0;e.fsp=0;if(e.fln!=null&&typeof setLane==='function')try{setLane(e,e.fln);}catch(x){}
 S.fx.push({x:e.x,y:e.y,t:.5,m:.5,r:THRA,col:'#9ab84a'});
 for(const t of unitTowers())for(const s of t.sd||[]){if(!(s.hp>0)||s.air||s.charm||s.udwn>0||s.uimm>0)continue;if(Math.hypot(s.x-e.x,s.y-e.y)<=THRA){s.udwn=THRS;s.en=null;s.fight=false;s.en2=null;}}}
// ---- Lanzadera de desembarco y cápsulas ----
function landerTick(e,dt){if(e.ldW>0){e.ldW-=dt;if(e.ldW<=0){const p=e.ldP;e.ldP=null;e.ldc=LANDCD;const hp=ehpOf('tcaps',S.round);
   (S.espw=S.espw||[]).push({t:'tcaps',x:p.x,y:p.y,tx:p.x,ty:p.y,hp,max:hp,fx:{},src:null,pv:null,fd:e.fd,cpO:CAPO,cpC:0,cpD:.35});S.fx.push({x:p.x,y:p.y,t:.5,m:.5,r:LANDA,col:'#c9d3dd'});}return;}
 e.ldc=(e.ldc===undefined?3:e.ldc)-dt;if(e.ldc>0)return;const q=pathNear(e.x,e.y);if(!q){e.ldc=.5;return;}e.ldP=hurlFwd(q,LANDA);e.ldW=LANDW;}
function capsTick(dt){const cs=S.enemies.filter(c=>c.t==='tcaps'&&c.hp>0);if(!cs.length)return;
 const others=S.enemies.some(o=>o.hp>0&&o.t!=='tcaps'&&!o.cpA)||S.portals.some(p=>p.q&&p.q.length)||(S.espw&&S.espw.some(o=>o.t!=='tcaps'&&!o.cpA));
 for(const c of cs){if(c.cpD>0)c.cpD-=dt;if(!others){S.enemies.splice(S.enemies.indexOf(c),1)/* sin oro: se rompe sola */;S.fx.push({x:c.x,y:c.y,t:.4,m:.4,r:.6*K,col:'#8a9aaa'});continue;}
  if(c.cpO>0){c.cpO-=dt;continue;}if(c.fx.stun||c.fx.freeze)continue;c.cpC-=dt;if(c.cpC>0)continue;c.cpC=CAPCD;
  if(ET.auto){const hp=ehpOf('auto',S.round),ln=[-1,0,1][Math.floor(Math.random()*3)];(S.espw=S.espw||[]).push({t:'auto',x:c.x,y:c.y,tx:c.x,ty:c.y,hp,max:hp,fx:{},src:null,pv:null,fln:ln,fd:c.fd,cpA:1,spj:{x0:c.x,y0:c.y,x1:c.x,y1:c.y,t:0}});S.fx.push({x:c.x,y:c.y,t:.3,m:.3,r:.5*K,col:'#c9d3dd'});}}}
// ---- Dron reciclador ----
function recycTick(e,dt){if(e.rcP)for(const p of e.rcP)p.t+=dt;if(e.rcP)e.rcP=e.rcP.filter(p=>p.t<RECT);
 if(e.rcB>0){e.rcB-=dt;if(e.rcB<=0&&ET.auto){const q=pathNear(e.x,e.y)||{x:Math.round(e.x),y:Math.round(e.y)},hp=ehpOf('auto',S.round);
   (S.espw=S.espw||[]).push({t:'auto',x:e.x,y:e.y,tx:q.x,ty:q.y,hp,max:hp,fx:{},src:null,pv:null,fln:e.fln,fd:e.fd,scrp:1,spj:{x0:e.x,y0:e.y,x1:q.x,y1:q.y,t:0}});S.fx.push({x:q.x,y:q.y,t:.5,m:.5,r:.8*K,col:'#c9a24a'});}}}
// ---- Portador de feromonas ----
function pheroTick(dt){if(!S.phC||!S.phC.length)return;for(const c of S.phC){c.t-=dt;if(c.t<=0)continue;
  for(const o of S.enemies){if(o.hp<=0||isFly(o)||!ET[o.t]||ET[o.t].fac!=='a'||Math.hypot(o.x-c.x,o.y-c.y)>PHEA)continue;
   if(!c.got.includes(o)){c.got.push(o);o.phN=Math.min(PHEN,(o.phU>S.wt?o.phN||0:0)+1);}o.phU=S.wt+PHEU;}}
 S.phC=S.phC.filter(c=>c.t>0);}
// ---- Dron saboteador ----
const sabTile=t=>{let k0=0;for(const[x,y]of t.cells||[]){const k=S.buff[y]&&S.buff[y][x];if(!k||k==='cur')continue;k0=Math.max(k0,String(k).includes('+')?2:1);}return k0;};
const sabBuf=t=>!!(t.rb||t.drp>0||t.oc>0);
function saboPick(e){const L=S.list.filter(t=>TW[t.type]&&!t.hero&&!t.sabU&&t.cells&&Math.hypot(t.x-e.x,t.y-e.y)<=SBTR);let best=[],bs=0;
 for(const t of L){const s=sabTile(t)?1+sabTile(t):sabBuf(t)?1:0;if(!s)continue;if(s>bs){bs=s;best=[t];}else if(s===bs)best.push(t);}
 return best.length?best[Math.floor(Math.random()*best.length)]:null;}
function saboStart(t){t.sabU=S.wt+SBTT;t.sabB=[];for(const[x,y]of t.cells){const k=S.buff[y]&&S.buff[y][x];if(k&&k!=='cur'){t.sabB.push([x,y,k]);S.buff[y][x]=null;}}
 t.sabD={drc:t.drc||0,drp:t.drp||0,oc:t.oc||0,ocm:t.ocm};t.drc=0;t.drp=0;t.oc=0;t.rb=null;(S.sabL=S.sabL||[]).includes(t)||S.sabL.push(t);}
function saboEnd(t){for(const[x,y,k]of t.sabB||[])if(S.buff[y]&&!S.buff[y][x])S.buff[y][x]=k;const d=t.sabD||{};t.drc=Math.max(t.drc||0,d.drc||0);t.drp=Math.max(t.drp||0,d.drp||0);
 if((d.oc||0)>(t.oc||0)){t.oc=d.oc;t.ocm=d.ocm;}t.sabU=0;t.sabB=null;t.sabD=null;if(S.sabL)S.sabL=S.sabL.filter(o=>o!==t);}
function saboAll(){if(S&&S.sabL)for(const t of S.sabL.slice())saboEnd(t);}
function saboTick(e,dt){if(e.sbF){const f=e.sbF;f.t+=dt;if(f.t>=SABF){e.sbF=null;if(S.list.includes(f.o)&&!f.o.sabU){saboStart(f.o);S.fx.push({x:f.o.x,y:f.o.y,t:.4,m:.4,r:.7*K,col:'#b07ab0'});}}return;}
 e.sbc=(e.sbc===undefined?1.5:e.sbc)-dt;if(e.sbc>0)return;const t=saboPick(e);if(!t){e.sbc=.5;return;}e.sbF={o:t,x0:e.x,y0:e.y,t:0};e.sbc=SABCD;}
function saboKeep(){if(!S.sabL)return;for(const t of S.sabL.slice()){if(!(t.sabU>S.wt)||!S.list.includes(t)){saboEnd(t);continue;}
 /* mientras dura, nada de bufos nuevos: lo que llegue se guarda para después */if(t.rb)t.rb=null;if(t.drc||t.drp){t.sabD.drc=Math.max(t.sabD.drc,t.drc||0);t.sabD.drp=Math.max(t.sabD.drp,t.drp||0);t.drc=0;t.drp=0;}if(t.oc>0){if(t.oc>t.sabD.oc){t.sabD.oc=t.oc;t.sabD.ocm=t.ocm;}t.oc=0;}}}
// ---- tick general ----
function t6Tick(dt){capsTick(dt);pheroTick(dt);saboKeep();
 for(const e of S.enemies){if(e.hp<=0)continue;const E=ET[e.t];if(!E)continue;if(e.thr){thrTick(e,dt);continue;}if(e.cpyF&&e.cpyF.t>0)e.cpyF.t-=dt;if(e.hoB&&e.hoB.t>0)e.hoB.t-=dt;
  if(E.recyc)recycTick(e,dt);if(E.lander&&e.ldW>0&&!(e.fx.freeze||e.fx.stun)){landerTick(e,dt);continue;}
  if(e.fx.freeze||e.fx.stun||e.fx.poly){if(E.hurl&&e.thW>0){e.thW=0;e.thO=null;e.thc=.5;}continue;}
  if(E.holo2)holoTick(e,dt);if(E.hurl)hurlTick(e,dt);if(E.lander)landerTick(e,dt);if(E.sabo)saboTick(e,dt);}}
{const _m=move;move=function(e,dt){if(e.thr||e.thH>S.wt)return false;return _m(e,dt);};}
{const _u=update;update=function(dt){_u(dt);if(!S)return;if(S.phase==='wave')t6Tick(dt);else{saboAll();S.phC=[];}};}
{const _nr=nextRound;nextRound=function(){try{saboAll();}catch(x){}return _nr.apply(this,arguments);};}
// ---- dibujo ----
function t6Draw(g,lw){if(!S||!S.enemies)return;const X=v=>v*CS+CS/2,now=performance.now()/1000;
 for(const c of S.phC||[]){const a=Math.min(1,c.t/1);g.fillStyle='rgba(216,190,60,'+(.22*a).toFixed(2)+')';g.strokeStyle='rgba(216,190,60,'+(.45*a).toFixed(2)+')';g.lineWidth=lw(1.5);
  for(let i=0;i<3;i++){g.beginPath();g.arc(X(c.x)+Math.cos(i*2.1+now)*PHEA*CS*.25,X(c.y)+Math.sin(i*2.1+now)*PHEA*CS*.25,PHEA*CS*.8,0,7);g.fill();}g.beginPath();g.arc(X(c.x),X(c.y),PHEA*CS,0,7);g.stroke();}
 for(const e of S.enemies){if(e.hp<=0)continue;const E=ET[e.t];if(!E)continue;const px=X(e.x),py=X(e.y),r=E.r*CS*EVS*(e.szm||1);
  if(e.cpy){g.strokeStyle='rgba(90,200,255,'+(.55+.4*Math.sin(now*9+e.x)).toFixed(2)+')';g.lineWidth=lw(2.2);g.setLineDash([lw(3),lw(2)]);g.beginPath();g.arc(px,py,r*1.18,0,7);g.stroke();g.setLineDash([]);
   if(Math.sin(now*13+e.y*3)>.85){g.fillStyle='rgba(120,220,255,.35)';g.beginPath();g.arc(px,py,r*1.1,0,7);g.fill();}
   if(e.cpyF&&e.cpyF.t>0){g.strokeStyle='rgba(90,200,255,'+(e.cpyF.t/.5).toFixed(2)+')';g.lineWidth=lw(3);g.beginPath();g.moveTo(X(e.cpyF.x0),X(e.cpyF.y0));g.lineTo(px,py);g.stroke();}}
  if(e.scrp){g.strokeStyle='rgba(180,110,50,.9)';g.lineWidth=lw(2);g.setLineDash([lw(2),lw(3)]);g.beginPath();g.arc(px,py,r*1.15,0,7);g.stroke();g.setLineDash([]);}
  if(E.holo2){const k=e.hoC>0&&e.hoC<1.2?1-e.hoC/1.2:0;g.strokeStyle='rgba(58,184,216,'+(.35+.5*k).toFixed(2)+')';g.lineWidth=lw(1.6);g.beginPath();g.arc(px,py,r*1.3+k*r*.3,0,7);g.stroke();
   if(e.hoB&&e.hoB.t>0){g.fillStyle='rgba(58,184,216,'+(e.hoB.t/.6*.35).toFixed(2)+')';g.beginPath();g.moveTo(px-r*.4,py);g.lineTo(X(e.hoB.x)-CS*.8,X(e.hoB.y));g.lineTo(X(e.hoB.x)+CS*.8,X(e.hoB.y));g.lineTo(px+r*.4,py);g.closePath();g.fill();}}
  if(E.hurl&&e.thO&&e.thL){const o=e.thO,L=e.thL,k=1-e.thW/THRW,x0=X(o.x),y0=X(o.y),x1=X(L.x),y1=X(L.y),mx=(x0+x1)/2,my=(y0+y1)/2-Math.hypot(x1-x0,y1-y0)*.35;
   g.strokeStyle='rgba(160,200,80,'+(.5+.4*k).toFixed(2)+')';g.lineWidth=lw(2.2);g.setLineDash([lw(5),lw(4)]);g.beginPath();g.moveTo(x0,y0);g.quadraticCurveTo(mx,my,x1,y1);g.stroke();g.setLineDash([]);
   g.fillStyle='rgba(160,200,80,'+(.12+.18*k).toFixed(2)+')';g.strokeStyle='rgba(160,200,80,.8)';g.beginPath();g.arc(x1,y1,THRA*CS,0,7);g.fill();g.stroke();g.strokeStyle='rgba(160,200,80,.9)';g.lineWidth=lw(2.5);g.beginPath();g.moveTo(px,py);g.lineTo(x0,y0);g.stroke();}
  if(e.thr){g.fillStyle='rgba(0,0,0,.25)';const h=e.thr,k=Math.min(1,h.t/THRT);g.beginPath();g.ellipse(X(h.x0+(h.x1-h.x0)*k),X(h.y0+(h.y1-h.y0)*k),r*.9,r*.45,0,0,7);g.fill();}
  if(E.lander&&e.ldP){const k=1-e.ldW/LANDW,x=X(e.ldP.x),y=X(e.ldP.y),R=LANDA*CS*.5;g.strokeStyle='rgba(230,90,70,'+(.5+.5*k).toFixed(2)+')';g.lineWidth=lw(2.4);
   g.beginPath();g.arc(x,y,R*(1.2-.4*k),0,7);g.stroke();g.beginPath();g.moveTo(x-R,y);g.lineTo(x+R,y);g.moveTo(x,y-R);g.lineTo(x,y+R);g.stroke();}
  if(e.t==='tcaps'){g.strokeStyle='#1b1712';g.lineWidth=lw(1.6);g.fillStyle=e.cpO>0?'#6a7a8a':'#8a9aaa';g.beginPath();g.ellipse(px,py+r*.3,r*1.1,r*.45,0,0,7);g.fill();g.stroke();
   if(e.cpD>0){g.strokeStyle='rgba(220,230,240,'+(e.cpD/.35).toFixed(2)+')';g.lineWidth=lw(3);g.beginPath();g.moveTo(px,py-r*4*e.cpD/.35);g.lineTo(px,py);g.stroke();}
   if(!(e.cpO>0)){const k=1-Math.max(0,e.cpC)/CAPCD;g.strokeStyle='rgba(255,210,90,.85)';g.lineWidth=lw(2);g.beginPath();g.arc(px,py,r*1.3,-Math.PI/2,-Math.PI/2+k*6.283);g.stroke();}}
  if(E.recyc){for(let i=0;i<RECN;i++){g.fillStyle=i<(e.rcN||0)||e.rcB>0?'#d8b04a':'rgba(40,30,20,.45)';g.strokeStyle='#1b1712';g.lineWidth=lw(1);g.beginPath();g.rect(px+(i-1)*r*.55-r*.2,py-r*1.65,r*.4,r*.4);g.fill();g.stroke();}
   for(const p of e.rcP||[]){const k=p.t/RECT;g.fillStyle='#b08a3a';g.beginPath();g.rect(X(p.x+(e.x-p.x)*k)-CS*.12,X(p.y+(e.y-p.y)*k)-CS*.12,CS*.24,CS*.24);g.fill();}}
  if(e.phU>S.wt&&e.phN>0){g.fillStyle='#ff3a2a';for(const s of[-1,1]){g.beginPath();g.arc(px+s*r*.3,py-r*.15,Math.max(1.2,r*.12),0,7);g.fill();}}
  if(E.sabo&&e.sbF){const f=e.sbF,k=Math.min(1,f.t/SABF),o=f.o;g.fillStyle='#d08ad0';g.beginPath();g.arc(X(f.x0+(o.x-f.x0)*k),X(f.y0+(o.y-f.y0)*k),Math.max(2,CS*.15),0,7);g.fill();}}
 for(const t of S.sabL||[]){if(!(t.sabU>S.wt))continue;const x=X(t.x),y=X(t.y);g.fillStyle='rgba(60,40,60,.35)';g.beginPath();g.arc(x,y,CT*1.05,0,7);g.fill();
  g.strokeStyle='#d08ad0';g.lineWidth=lw(2.5);g.beginPath();g.moveTo(x+CT*.35,y-CT*.35);g.lineTo(x+CT*.75,y-CT*.75);g.stroke();
  if(Math.sin(now*12+t.x)>.3){g.fillStyle='#ffe07a';g.beginPath();g.arc(x+CT*.35,y-CT*.35,Math.max(1.5,CS*.1),0,7);g.fill();}}}
{const _d=eSkillsDraw;eSkillsDraw=function(g,lw){_d(g,lw);try{t6Draw(g,lw);}catch(x){}};}
// ---- palabras clave ----
{const _k=kwHtml0,R=v=>(typeof RGV==='function'&&typeof f==='function')?RGV(f(v/K)):String(v/K).replace('.',',');kwHtml0=function(id,src){
 if(id==='eholo2')return '<b>Holograma</b><small>Los primeros '+HOLOW+' s no hace nada. Después, cada '+HOLOCD+' s copia al enemigo más fuerte que tenga cerca (a '+R(HOLOR)+' o menos): '+HOLON+' copias con el '+Math.round(HOLOM*100)+' % de su vida que hacen lo mismo que él. No copia jefes ni copias. Las copias dan 1 de oro.</small>';
 if(id==='ehurl')return '<b>Lanzamiento</b><small>Cada '+String(THRCD).replace('.',',')+' s agarra a un enemigo pequeño cercano y lo lanza '+R(THRD)+' camino adelante, por encima de tus unidades. Donde cae, tus unidades caen al suelo '+THRS+' s.</small>';
 if(id==='elander')return '<b>Desembarco</b><small>Cada '+LANDCD+' s suelta en el camino una cápsula. A los '+CAPO+' s se abre y saca un Autómata cada '+CAPCD+' s hasta que la rompas.</small>';
 if(id==='erecyc')return '<b>Reciclaje</b><small>Cada '+RECN+' enemigos que mueren cerca de él (a '+R(RECR)+' o menos), monta con sus restos un Autómata de chatarra.</small>';
 if(id==='ephero')return '<b>Feromonas</b><small>Cada alienígena que muere cerca de él deja una nube. Los alienígenas que la pisan van un '+Math.round(PHEM*100)+' % más rápido '+PHEU+' s, hasta '+PHEN+' veces.</small>';
 if(id==='esabo')return '<b>Sabotaje</b><small>Cada '+SABCD+' s clava un dardo a una de tus torres cercanas (a '+R(SBTR)+' o menos): '+SBTT+' s sin su casilla especial ni los bufos de otras torres. Prefiere las casillas ★.</small>';
 return _k(id,src);};}
{const KW6={holo2:['eholo2','Holograma','📽️'],hurl:['ehurl','Lanzamiento','🤾'],lander:['elander','Desembarco','🛸'],recyc:['erecyc','Reciclaje','♻️'],phero:['ephero','Feromonas','💨'],sabo:['esabo','Sabotaje','🎯']};   // iconos provisionales: falta dibujarlos (prioritario)
 Object.assign(TMECKW,KW6);if(typeof MECG2!=='undefined')for(const k in KW6)MECG2.push(KW6[k]);
 if(typeof MECUSE2!=='undefined')for(const k in KW6)MECUSE2[KW6[k][0]]=Object.keys(TMEC).filter(id=>TMEC[id][k]).map(id=>'en:'+id);}
