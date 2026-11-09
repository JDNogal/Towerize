// ==================== Torres desbloqueables de la Era Distópica: Lanzallamas (Detonador / Muro de fuego), Chorro de ácido (Corrosión / Nube viajera), Torre sónica (Altavoces / Gigante) y sus logros ====================
// ---- logros que las desbloquean ----
ACH.herencia={c:'jg',n:'Herencia de fuego',d:'Gana una partida en la Era Distópica con una Salamandra a Nv 4 al final.',tw:'flame'};
ACH.oxido={c:'jg',n:'Óxido',d:'Deja a 0 la armadura de un jefe rompiéndosela (armadura rota).',tw:'acid'};
ACH.marcha={c:'jg',n:'Marcha atrás',d:'Haz retroceder a un mismo enemigo 10 casillas en total en una sola oleada (empujones).',tw:'sonic'};
ACH.bombard={c:'jg',n:'Bombardeo',d:'Mata a 8 enemigos con un solo Ataque aéreo de Vega.',tw:'cannon'};
APM.marcha={max:10,best:1};APM.bombard={max:8,best:1};
if(typeof ACHVIS!=='undefined'){ACHVIS.herencia=()=>typeof era2Ok==='function'&&era2Ok();ACHVIS.bombard=()=>typeof era2Ok==='function'&&era2Ok();}
{const _aw=achWin;achWin=function(){const r=_aw.apply(this,arguments);try{if(!S.tut&&S.era===2&&S.list.some(t=>t.type==='sala'&&t.lvl>=4))achieve('herencia');}catch(e){}return r;};}
// Óxido: al romper armadura, si un jefe se queda a 0 o menos
{const _bk=brkAdd;brkAdd=function(e,a,mx){const r=_bk.apply(this,arguments);try{if(e&&isBoss(e)&&!S.tut&&!S.pvE&&armorOf(e,'phys')<=0)achieve('oxido');}catch(x){}return r;};}
// Marcha atrás: suma lo que retrocede cada enemigo en la oleada (los caminos van por ejes, así que la distancia recorrida es |dx|+|dy|)
{const _kn=knock;knock=function(e,d){const x0=e.x,y0=e.y;const r=_kn.apply(this,arguments);try{if(!S.tut&&!S.pvE){e.kbT=(e.kbT||0)+(Math.abs(e.x-x0)+Math.abs(e.y-y0))/K;recBest('marcha',Math.floor(e.kbT));if(e.kbT>=10)achieve('marcha');}}catch(x){}return r;};}
// ---- iconos vectoriales ----
E2SVG.acid='<svg viewBox="0 0 64 64"><path d="M22 10 h20 v8 h-4 v10 l12 22 a4 4 0 0 1 -3 6 h-30 a4 4 0 0 1 -3 -6 l12 -22 v-10 h-4z" fill="#2a3a1a" stroke="#9be15d" stroke-width="2.5" stroke-linejoin="round"/><path d="M20 44 l6 -10 h12 l6 10z" fill="#9be15d"/><circle cx="26" cy="48" r="2.5" fill="#d8ff9a"/><circle cx="36" cy="50" r="2" fill="#d8ff9a"/><path d="M46 20 L56 14 M48 28 L58 26" stroke="#9be15d" stroke-width="2.5" stroke-linecap="round"/></svg>';
E2SVG.sonic='<svg viewBox="0 0 64 64"><rect x="18" y="14" width="20" height="36" rx="4" fill="#3a2a40" stroke="#ff8ad8" stroke-width="2.5"/><circle cx="28" cy="38" r="7" fill="#1a1020" stroke="#ff8ad8" stroke-width="2"/><circle cx="28" cy="38" r="2.5" fill="#ffb0e8"/><circle cx="28" cy="22" r="4" fill="#1a1020" stroke="#ff8ad8" stroke-width="1.5"/><path d="M44 26 a10 10 0 0 1 0 12 M50 20 a18 18 0 0 1 0 24" fill="none" stroke="#ff8ad8" stroke-width="2.5" stroke-linecap="round"/></svg>';
TW.acid.icsvg=E2SVG.acid;TW.sonic.icsvg=E2SVG.sonic;
// ---- constantes ----
const DETTH=30,DETR=1,FWT=4,FWR=1.7,CLOUDCD=6,CLOUDSP=1.2*K,CLOUDR=.75*K,CLOUDD=6,SONSP=5*K,SONK=.4,SONKG=.6,GUITRZ=10;
const unlTarget=(t,s,fly)=>{const prog=e=>S.field[e.ty][e.tx]+Math.hypot(e.tx-e.x,e.ty-e.y),md=TGT[t.mode]||TGT.core;let tg=null,bs=0;
 for(const e of S.enemies){if(e.hp<=0||Math.hypot(e.x-t.x,e.y-t.y)>s.range||(!fly&&isFly(e)))continue;const sc=md.score(e,prog);if(!tg||sc>bs||(sc===bs&&prog(e)<prog(tg))){tg=e;bs=sc;}}return tg;};
// casilla de camino más cercana a la torre dentro de su alcance
function nearPathT(t,R){let b=null,bd=1e9;const r=Math.ceil(R);for(let y=Math.max(0,t.y-r);y<=Math.min(N-1,t.y+r);y++)for(let x=Math.max(0,t.x-r);x<=Math.min(N-1,t.x+r);x++){if(S.cells[y][x]!==2)continue;const d=Math.hypot(x-t.x,y-t.y);if(d<=R&&d<bd){bd=d;b={x,y};}}return b;}
// ---- estadísticas: el alcance de la Torre sónica crece más con los niveles; los Altavoces animan a las unidades y al héroe cercanos ----
{const _st=stats;stats=function(t){const s=_st.apply(this,arguments);if(!t)return s;
 if(!t.hero&&TW[t.type]&&TW[t.type].sonic)s.range*=1+.12*((t.lvl||1)-1);
 if(S&&S.phase==='wave'&&(t.sd||t.hero)){const sp=S.list.filter(o=>o.type==='sonic'&&o.spec==='spk');if(sp.length){const us=t.hero?[t.hero.s]:t.sd;if(us&&us.some(u=>u&&u.hp>0&&sp.some(o=>Math.hypot(u.x-o.x,u.y-o.y)<=(o.rgC||_st(o).range*1.36))))s.dmg*=1.2;}}
 return s;};}
// ---- multiplicador de daño: desorientación (siguiente golpe directo +50%) y Acople (ralentizados cerca de unos Altavoces) ----
{const _m=e2DmgM;e2DmgM=function(e,src,ty){let m=_m(e,src,ty);if(e.dz>0&&!DNK&&src){m*=1+e.dz;e.dz=0;}if(e.acop>0&&e.fx&&e.fx.slow&&src&&!src.hero&&!src.summ)m*=1+e.acop;return m;};}
// ==================== LANZALLAMAS ====================
// Detonador: con 30 stacks de quemadura de esta torre el enemigo explota (los envenenados, al momento con Reacción en cadena)
function detonate(t,e){const ov=abRank(t,'overp'),ch=abRank(t,'chainr'),r=DETR*K*(1+(ov?ov.r:0)),dmg=e.bn*BURND*.5*(1+(ov?ov.m:0));
 for(const o of S.enemies)if(o.hp>0&&Math.hypot(o.x-e.x,o.y-e.y)<=r){DNK='fire';hurt(o,dmg,t,'elem');DNK=null;if(ch&&o!==e&&o.hp>0)addBurn(o,t,ch.b);}
 e.bn*=.5;e.detc=.8;S.fx.push({x:e.x,y:e.y,t:.45,m:.45,r,col:'#ff8a3c'});try{sfx('boom');}catch(x){}}
function detonTick(t){if(t.spec!=='detn')return;const ch=abRank(t,'chainr');
 for(const e of S.enemies){if(e.hp<=0||e.bsrc!==t||!(e.bn>0)||e.detc>0)continue;if(e.bn>=DETTH||(ch&&e.ps&&e.ps.length&&e.bn>=5))detonate(t,e);}}
// bidones de brea: en una casilla de camino dentro del alcance, la más cercana a los portales; explotan con fuego
function tarbTick(t,s,dt){const tb=abRank(t,'tarb');if(!tb)return;S.tarb=S.tarb||[];const mine=S.tarb.filter(b=>b.src===t);
 if(!(t.acd.tarb>0)&&mine.length<tb.n){t.acd.tarb=tb.cd;let b=null,bf=-1;const r=Math.ceil(s.range);
  for(let y=Math.max(0,t.y-r);y<=Math.min(N-1,t.y+r);y++)for(let x=Math.max(0,t.x-r);x<=Math.min(N-1,t.x+r);x++){if(S.cells[y][x]!==2||Math.hypot(x-t.x,y-t.y)>s.range)continue;const fv=S.field[y]&&S.field[y][x];if(fv==null||!isFinite(fv)||fv<0)continue;if(S.tarb.some(q=>Math.hypot(q.x-x,q.y-y)<1.5*K))continue;if(fv>bf){bf=fv;b={x,y};}}
  if(b)S.tarb.push({x:b.x,y:b.y,t:40,src:t,dm:s.dmg*15,pen:s.pen});}}
function tarbAll(dt){if(!S.tarb||!S.tarb.length)return;S.tarb=S.tarb.filter(b=>{if(!S.list.includes(b.src))return false;b.t-=dt;if(b.t<=0)return false;
 const lit=S.enemies.some(e=>e.hp>0&&!isFly(e)&&e.bn>0&&Math.hypot(e.x-b.x,e.y-b.y)<=.7*K)||S.pools.some(p=>p.el==='fire'&&Math.hypot(p.x-b.x,p.y-b.y)<=p.r+.5*K);
 if(!lit)return true;for(const e of S.enemies)if(e.hp>0&&Math.hypot(e.x-b.x,e.y-b.y)<=K){DNK='fire';hurt(e,b.dm,b.src,'elem');DNK=null;}
 S.pools.push({x:b.x,y:b.y,t:TARF,n:TARB,tk:0,src:b.src,r:.8*K,el:'fire',tar:1});S.fx.push({x:b.x,y:b.y,t:.5,m:.5,r:K,col:'#ff7a2e'});try{sfx('boom');}catch(x){}return false;});}
// Muro de fuego: franjas que ocupan la casilla de camino delante del objetivo
function fwallShot(t,tg,s){S.fwall=S.fwall||[];const mw=abRank(t,'morew'),df=abRank(t,'densef'),as=abRank(t,'ash'),max=1+(mw?mw.n:0),q=sqOf(tg.x,tg.y),dur=FWT+(df?df.t:0),n=s.dmg*s.rate*.6*(1+(df?df.m:0));
 const mine=S.fwall.filter(w=>w.src===t);let w=mine.find(w=>w.x===q.x&&w.y===q.y);
 if(w){w.t=dur;w.n=n;w.ash=as;return;}
 if(mine.length>=max){mine.sort((a,b)=>a.t-b.t);w=mine[0];Object.assign(w,{x:q.x,y:q.y,t:dur,n,ash:as,tk:0});}else S.fwall.push({x:q.x,y:q.y,t:dur,n,ash:as,tk:0,src:t});
 S.fx.push({x:q.x,y:q.y,t:.35,m:.35,r:FWR,col:'#ff6a2e'});}
function fwallAll(dt){if(!S.fwall||!S.fwall.length)return;for(const w of S.fwall){w.t-=dt;if(!S.list.includes(w.src)){w.t=0;continue;}
 const ins=S.enemies.filter(e=>e.hp>0&&!isFly(e)&&Math.hypot(e.x-w.x,e.y-w.y)<=FWR);
 w.tk-=dt;if(w.tk<=0){w.tk+=PTICK;for(const e of ins)addBurn(e,w.src,w.n);}
 if(w.ash)for(const e of ins){slowE(e,w.ash.s,.3);e.ashW=w.ash.w;e.ashT=.3;}}
 S.fwall=S.fwall.filter(w=>w.t>0);
 for(const e of S.enemies)if(e.ashT>0){e.ashT-=dt;if(e.acd!=null)e.acd+=dt*e.ashW;}}
{const _ft=flameTick;flameTick=function(t,tg,s,cm,TT){if(t.spec==='muro'){fwallShot(t,tg,s);return;}const r=_ft.apply(this,arguments);try{detonTick(t);}catch(e){}return r;};}
// ==================== CHORRO DE ÁCIDO ====================
function acidShot(t,tg,s,dm){const cc=abRank(t,'conc'),so=abRank(t,'sores');addPois(tg,dm,t);brkAdd(tg,cc?cc.a:1,cc?cc.max:5);
 if(so&&armorOf(tg,'phys')<=0&&Math.random()<so.p)addBleed(tg,t,1);
 S.fx.push({line:[t.x,t.y,tg.x,tg.y],t:.16,m:.16,col:'rgba(155,225,93,.9)'});try{sfx('beam',{r:1.5});}catch(e){}}
// Nube viajera: nace en el camino junto a la torre y va contra corriente hacia los portales
function cloudLaunch(t,s){const c=nearPathT(t,s.range);if(!c)return;const df=abRank(t,'dfront'),sa=abRank(t,'slowadv'),tr=abRank(t,'trailx'),n=df?2:1;S.tcl=S.tcl||[];
 for(let i=0;i<n;i++)S.tcl.push({x:c.x,y:c.y,cx:c.x,cy:c.y,left:CLOUDD*K,sp:CLOUDSP*(sa?sa.sp:1),n:s.dmg*(1+(sa?sa.m:0)),src:t,tk:0,br:i,lt:Math.floor(c.x/K)+','+Math.floor(c.y/K),tr:tr?tr.t:0,pen:s.pen});
 S.fx.push({x:c.x,y:c.y,t:.5,m:.5,r:CLOUDR,col:'#b8e07a'});}
function cloudAll(dt){if(!S.tcl||!S.tcl.length)return;S.tcl=S.tcl.filter(c=>{if(!S.list.includes(c.src))return false;let mv=c.sp*dt;
 while(mv>1e-6&&c.left>0){const dx=c.cx-c.x,dy=c.cy-c.y,dd=Math.hypot(dx,dy);
  if(dd<1e-6){const nx=awayNext(c.cx,c.cy);if(!nx.length){c.left=0;break;}nx.sort((a,b)=>a.x-b.x||a.y-b.y);const q=nx[c.br%nx.length];
   {const tk=Math.floor(c.cx/K)+','+Math.floor(c.cy/K);if(c.tr&&c.lt!==tk){const q0=sqOf(c.cx,c.cy);S.pools.push({x:q0.x,y:q0.y,t:c.tr,n:c.n*.5,tk:0,src:c.src,r:.6*K});c.lt=tk;}}
   c.cx=q.x;c.cy=q.y;continue;}
  const st=Math.min(mv,dd,c.left);c.x+=dx/dd*st;c.y+=dy/dd*st;mv-=st;c.left-=st;}
 c.tk-=dt;if(c.tk<=0){c.tk+=PTICK*.5;for(const e of S.enemies){if(e.hp<=0||Math.hypot(e.x-c.x,e.y-c.y)>CLOUDR)continue;addPois(e,c.n*.5,c.src);
   if(c.tr&&e.bn>0){const tot=(e.ps||[]).reduce((a,q)=>a+q.w,0)*10;DNK='poison';for(const o of S.enemies)if(o.hp>0&&Math.hypot(o.x-e.x,o.y-e.y)<=K)hurt(o,tot,c.src,'elem');DNK=null;S.fx.push({x:e.x,y:e.y,t:.5,m:.5,r:K,col:'#9be15d'});c.left=0;break;}}}
 return c.left>0;});}
function acidTick(t,s,dt){t.cd=Math.max(-.1,t.cd-dt);const TT=twm(t.type,t.spec);
 if(TT.tcloud){if(t.cd<=0){const has=S.enemies.some(e=>e.hp>0&&Math.hypot(e.x-t.x,e.y-t.y)<=s.range*1.5);if(has){t.cd=CLOUDCD/(s.rate/TW.acid.rate);cloudLaunch(t,s);}}return;}
 const tg=unlTarget(t,s,true);if(!tg){t.cd=Math.max(t.cd,0);return;}let n=0;
 while(t.cd<=0&&n++<6){t.cd+=1/s.rate;const crit=Math.random()<s.crit+mkB(tg),dm=s.dmg*(crit?s.critm:1);acidShot(t,tg,s,dm);if(crit)critMark(tg);onHit(tg,t);}}
// Charcos: los enemigos que mata el veneno de una Corrosión se deshacen en un charco
{const _ad=achDeath;achDeath=function(e){try{const k=e.src;if(k&&k.type==='acid'&&k.spec==='corr'&&S.list.includes(k)&&e.kdn==='poison'){const pd=abRank(k,'pudd');if(pd){const st=stats(k);S.pools.push({x:e.x,y:e.y,t:pd.t,n:st.dmg,tk:0,src:k,r:.6*K});}}}catch(x){}return _ad.apply(this,arguments);};}
// ==================== TORRE SÓNICA ====================
SPECT.guit={n:'Guitarrista rebelde',ic:'🎸',col:'#ff8ad8',w:1,d:1,sp:1};
function sonicWave(t,s,o){S.sonw=S.sonw||[];const TT=twm(t.type,t.spec),gi=!!TT.giant,sw=abRank(t,'swall'),dz=abRank(t,'daze');
 S.sonw.push({x:t.x,y:t.y,r:0,R:s.range,sp:SONSP,dm:s.dmg*(o&&o.m||1),pen:s.pen,src:t,hit:new Set(),kb:(gi?SONKG:SONK)*K,fly:!!sw,bres:sw?sw.b:1,slow:TT.spk?.7:0,stun:o&&o.stun||0,dz:dz?dz:null,echo:o&&o.echo!=null?o.echo:1,big:!!(o&&o.stun)});}
function sonwAll(dt){if(!S.sonw||!S.sonw.length)return;S.sonw=S.sonw.filter(w=>{const t=w.src;if(!S.list.includes(t))return false;const r0=w.r;w.r=Math.min(w.R,w.r+w.sp*dt);
 for(const e of S.enemies){if(e.hp<=0||w.hit.has(e))continue;const d=Math.hypot(e.x-w.x,e.y-w.y);if(d>w.r||d<r0-.5)continue;w.hit.add(e);
  const crit=Math.random()<stats(t).crit+mkB(e),dm=w.dm*(crit?stats(t).critm:1);hurt(e,dm,t,'magic',w.pen);if(crit)critMark(e);onHit(e,t);if(e.hp<=0)continue;
  if(!isFly(e)||w.fly){knock(e,w.kb*((ET[e.t].el||isBoss(e))?w.bres:1));if(w.dz){stunE(e,w.dz.t);e.dz=w.dz.m;}}
  if(w.slow)slowE(e,w.slow,2);if(w.stun)stunE(e,w.stun);}
 if(w.r>=w.R){const ec=abRank(t,'echo');if(ec&&w.echo>0){const p=w.echo===1?ec.p:ec.p2;if(p&&Math.random()<p){const s=stats(t);sonicWave(t,s,{m:.6*(w.dm/s.dmg),echo:w.echo===1?2:0,stun:w.stun});}}return false;}return true;});}
// guitarrista rebelde: unidad invocada junto a la torre; sus acordes golpean en área y curan
function guitSpawn(t,s){const c=nearPathT(t,s.range);if(!c)return;const B=SPECT.guit,hp=TW.bastion.unit.hp*LV[3].hp*2.2*hpR(S.round),u={type:'bastion',lvl:3,summ:1,beast:'guit',gOwner:t,ttl:9999,x:c.x,y:c.y,cells:[],flag:{x:c.x,y:c.y},ab:{},acd:{},sd:[],xap:10,alert:1.5*K,uspdx:B.sp,ovr:{dmg:s.dmg*.6,rate:1,range:2.5*K,crit:.05,critm:2,area:0,gold:0,pen:0}};
 u.sd=[{i:0,x:c.x,y:c.y,hp,max:hp,en:null,cd:0,rt:0,tw:u,lock:false,fight:false,wt:B.w,beast:'guit'}];(S.summ=S.summ||[]).push(u);t.guit=u;S.fx.push({x:c.x,y:c.y,t:.6,m:.6,r:1.2*K,col:'#ff8ad8'});}
function guitTick(t,s,dt){const sr=abRank(t,'seren');if(!sr)return;const u=t.guit,al=u&&(S.summ||[]).includes(u)&&u.sd[0].hp>0;
 if(!al){t.gT=(t.gT==null?0:t.gT)-dt;if(t.gT<=0){guitSpawn(t,s);t.gT=GUITRZ;}return;}
 u.ovr.dmg=s.dmg*.6;u.gh=(u.gh||0)+dt;if(u.gh>=2){u.gh=0;const q=u.sd[0];let n=0;for(const o of unitTowers())for(const x of o.sd)if(x!==q&&x.hp>0&&x.hp<x.max&&Math.hypot(x.x-q.x,x.y-q.y)<=2*K){x.hp=Math.min(x.max,x.hp+x.max*sr.h);n++;}if(n)S.fx.push({x:q.x,y:q.y,t:.5,m:.5,r:2*K,col:'#ffb0e8'});}}
{const _oh=onHit;onHit=function(e,t){const r=_oh.apply(this,arguments);try{if(t&&t.beast==='guit'&&t.gOwner&&S.list.includes(t.gOwner)){const sr=abRank(t.gOwner,'seren');if(sr){const q=t.sd[0],dm=t.ovr.dmg*.5;for(const o of S.enemies)if(o!==e&&o.hp>0&&Math.hypot(o.x-q.x,o.y-q.y)<=sr.r*K)hurt(o,dm,t.gOwner,'magic',0);S.fx.push({x:q.x,y:q.y,t:.25,m:.25,r:sr.r*K,col:'#ff8ad8'});}}}catch(x){}return r;};}
function sonicTick(t,s,dt){t.cd=Math.max(-.1,t.cd-dt);for(const k in t.acd)t.acd[k]=Math.max(0,(t.acd[k]||0)-dt);t.rgC=s.range;
 const fb=abRank(t,'feedb');if(fb)for(const e of S.enemies)if(e.hp>0&&Math.hypot(e.x-t.x,e.y-t.y)<=s.range)e.acop=Math.max(e.acop||0,fb.m);
 guitTick(t,s,dt);
 const has=S.enemies.some(e=>e.hp>0&&Math.hypot(e.x-t.x,e.y-t.y)<=s.range);if(!has){t.cd=Math.max(t.cd,0);return;}
 const bs=abRank(t,'bass');if(bs&&!(t.acd.bass>0)){t.acd.bass=bs.cd;sonicWave(t,s,{m:bs.m,stun:bs.s,echo:0});try{sfx('boom');}catch(e){}}
 let n=0;while(t.cd<=0&&n++<4){t.cd+=1/s.rate;sonicWave(t,s);try{sfx('beam',{r:.6});}catch(e){}}}
// ---- tick común ----
function unlTick(dt){for(const e of S.enemies)e.acop=0;
 for(const t of S.list){const T=TW[t.type];if(!T)continue;
  if(t.type==='flame'){if(!t.acd)t.acd={};tarbTick(t,stats(t),dt);for(const e of S.enemies)if(e.detc>0)e.detc-=dt;}
  if(t.type==='acid')acidTick(t,stats(t),dt);
  if(t.type==='sonic')sonicTick(t,stats(t),dt);}
 tarbAll(dt);fwallAll(dt);cloudAll(dt);sonwAll(dt);}
{const _t=e2TowersTick;e2TowersTick=function(dt){const r=_t.apply(this,arguments);try{unlTick(dt);}catch(e){}return r;};}
{const _nr=nextRound;nextRound=function(){try{S.tarb=[];S.fwall=[];S.tcl=[];S.sonw=[];for(const t of S.list){t.guit=null;t.gT=0;}}catch(e){}return _nr.apply(this,arguments);};}
// ---- dibujo ----
function unlDraw(lw){const X=v=>v*CS+CS/2,now=performance.now()/1000;
 for(const w of S.fwall||[]){const a=Math.min(.6,w.t/1.5),f=.85+.15*Math.sin(now*14+w.x);g.fillStyle='rgba(255,110,40,'+a*.55+')';g.beginPath();g.arc(X(w.x),X(w.y),FWR*CS*f,0,7);g.fill();g.strokeStyle='rgba(255,200,90,'+a+')';g.lineWidth=lw(2);g.beginPath();for(let i=0;i<7;i++){const px=X(w.x)-FWR*CS+i*FWR*CS/3,h=(.5+.5*Math.abs(Math.sin(now*9+i*1.7+w.y)))*CS*1.2;g.moveTo(px,X(w.y)+CS*.6);g.lineTo(px+CS*.2,X(w.y)+CS*.6-h);}g.stroke();}
 for(const b of S.tarb||[]){g.fillStyle='#3a2f28';g.strokeStyle='#8a6a4a';g.lineWidth=lw(1.5);g.beginPath();g.rect(X(b.x)-CS*.45,X(b.y)-CS*.6,CS*.9,CS*1.2);g.fill();g.stroke();g.strokeStyle='#c9a24a';g.beginPath();g.moveTo(X(b.x)-CS*.45,X(b.y)-CS*.2);g.lineTo(X(b.x)+CS*.45,X(b.y)-CS*.2);g.moveTo(X(b.x)-CS*.45,X(b.y)+CS*.2);g.lineTo(X(b.x)+CS*.45,X(b.y)+CS*.2);g.stroke();}
 for(const c of S.tcl||[]){g.fillStyle='rgba(155,225,93,.14)';for(let i=0;i<5;i++){const a=now*1.5+i*1.26,r=CLOUDR*CS*.55;g.beginPath();g.arc(X(c.x)+Math.cos(a)*r*.6,X(c.y)+Math.sin(a*1.3)*r*.5,r,0,7);g.fill();}g.strokeStyle='rgba(184,224,122,.6)';g.lineWidth=lw(1);g.setLineDash([lw(3),lw(3)]);g.beginPath();g.arc(X(c.x),X(c.y),CLOUDR*CS,0,7);g.stroke();g.setLineDash([]);}
 for(const w of S.sonw||[]){const k=w.r/w.R,a=(1-k*.7)*(w.big?1:.8);g.strokeStyle='rgba(255,138,216,'+a+')';g.lineWidth=lw(w.big?5:2.5);g.beginPath();g.arc(X(w.x),X(w.y),w.r*CS,0,7);g.stroke();g.strokeStyle='rgba(255,220,245,'+a*.5+')';g.lineWidth=lw(1);g.beginPath();g.arc(X(w.x),X(w.y),Math.max(0,w.r*CS-lw(4)),0,7);g.stroke();}
 for(const e of S.enemies)if(e.dz>0){g.font=Math.round(CS*.9)+'px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('💫',X(e.x),X(e.y)-ET[e.t].r*CS*EVS-lw(6));}}
{const _d=e2DrawWorld;e2DrawWorld=function(lw){const r=_d.apply(this,arguments);try{unlDraw(lw);}catch(e){}return r;};}
// ---- fichas: efectos base y palabras clave ----
{const _ef=effHtml;effHtml=function(T,src){if(T.acidj)return kw('poison','Veneno',src)+' + '+kw('brk','Armadura rota',src);if(T.sonic)return kw('push','Empuje',src)+' '+(T.giant?f(SONKG):f(SONK))+' casillas'+(T.spk?' + '+kw('slow','Ralentización',src)+' 30%':'');return _ef.apply(this,arguments);};}
const UNLTXT={acid:T=>T.tcloud?'':'Cada chorro aplica stacks de veneno (su «daño») y rompe −1 de armadura, hasta −5. Alcanza también a los voladores.',
 sonic:T=>'Cada onda sale de la torre y se expande hasta su alcance: golpea una vez a cada enemigo que atraviesa y lo empuja hacia atrás por el camino'+(T.giant?' (los voladores no, salvo con Muro de sonido)':' (los voladores no)')+'. Su alcance crece más que el de otras torres al subir de nivel.'};
{const _ti=towerInfo;towerInfo=function(t){let h=_ti.apply(this,arguments);try{if(t&&UNLTXT[t.type]){const tx=UNLTXT[t.type](twm(t.type,t.spec));if(tx){const i=h.indexOf('<div class="row');h=i>=0?h.slice(0,i)+`<small>${tx}</small>`+h.slice(i):h+`<small>${tx}</small>`;}}}catch(e){}return h;};}
{const _si=shopInfo;shopInfo=function(k,quiet){let h=_si.apply(this,arguments);try{if(UNLTXT[k]){const st=quiet?cpState(k):{lv:1,spec:null},tx=UNLTXT[k](twm(k,st.spec));if(tx){const i=h.indexOf('<div class="row');h=i>=0?h.slice(0,i)+`<small>${tx}</small>`+h.slice(i):h+`<small>${tx}</small>`;}}}catch(e){}return h;};}
E2KW.daze=()=>'<b>Desorientado</b>'+R('','Duración','0,4 s')+'<small>La onda de la Torre sónica gigante lo ha dejado aturdido un instante, y el siguiente golpe directo que reciba hará un 50% más de daño.</small>';
