// ===== Augur Voltaico (Era Fantástica): rayos que caen del cielo, nubes de tormenta y juicios =====
const WETT=3,WETF=1.5,CLR=2.1,HCH=8,HJM=6,FULGD=.2,HCHK=.35;
// v307 · lo «duro» que es un enemigo, de 0 (pequeño) a 1 (élite o jefe): para habilidades que escalan con la vida del objetivo en vez de con su tipo
const toughK=e=>isBoss(e)?1:Math.max(0,Math.min(1,((ET[e.t].hp||1)-1)/11));
const ezM=e=>1+EZAMP*(e.ez?e.ez.n:0);
const cloudR=t=>{const cu=abRank(t,'cumulo');return CLR*K*(1+(cu?cu.r:0)+(t.cg||0));};
// v305 · el rayo del Augur: el objetivo recibe el daño completo y los de alrededor solo un 35 % (antes el 60 % general del daño en área)
const AUGSPL=.35;
function augurShot(t,tg,s,dm,crit,nq){if(t.spec==='herald')return;
 let e0=tg;if(t.spec==='lord'){if(!t.flag)autoFlag(t);if(!t.flag)return;const R=cloudR(t),c=S.enemies.filter(e=>e.hp>0&&Math.hypot(e.x-t.flag.x,e.y-t.flag.y)<=R);if(!c.length)return;e0=c[Math.floor(Math.random()*c.length)];}
 const x=e0.x,y=e0.y,ar=Math.max(s.area,.4*K);
 for(let q=0;q<nq;q++)for(const e of S.enemies)if(e.hp>0&&Math.hypot(e.x-x,e.y-y)<=ar){if(e===e0){sfxHit(t,'elem');strike(e,dm*ezM(e),t,'elem',0);}else hurt(e,dm*AUGSPL*ezM(e),t,'elem');}
 if(crit)critMark(e0);S.fx.push({bolt:[[x+(Math.random()-.5)*1.5,y-4*K],[x+(Math.random()-.5)*.6,y-2*K],[x,y]],t:.18,m:.18});S.fx.push({x,y,t:.25,m:.25,r:ar,col:'#9fd4ff'});}
function augTick(dt){for(const t of S.list){if(t.type!=='augur'||!t.spec)continue;const s=stats(t);
 if(t.spec==='lord'){if(!t.flag)autoFlag(t);if(!t.flag)continue;const R=cloudR(t),ins=S.enemies.filter(e=>e.hp>0&&Math.hypot(e.x-t.flag.x,e.y-t.flag.y)<=R),dr=abRank(t,'drench'),hl=abRank(t,'hail'),cu=abRank(t,'cumulo');
  if(dr)for(const e of ins){e.fx.wet={t:WETT,m:Math.max(dr.m,e.fx.wet?e.fx.wet.m:0)};}
  if(hl){t.hlT=(t.hlT||0)+dt;if(t.hlT>=1){t.hlT=0;for(const e of ins)hurt(e,s.dmg*hl.p,t,'phys',0);}}}
 else if(t.spec==='herald'){t.ch=Math.min(HCH,(t.ch||0)+dt);if(t.ch<HCH)continue;let be=null;for(const e of S.enemies)if(e.hp>0&&Math.hypot(e.x-t.x,e.y-t.y)<=s.range&&(!be||e.hp>be.hp))be=e;if(!be)continue;t.ch=0;heraldBolt(t,s,be);}}
 for(const e of S.enemies)if(e.fx.wet&&e.bn>0)e.bn=0;}
function heraldBolt(t,s,be){const wr=abRank(t,'wrath'),fk=abRank(t,'fork'),fg=abRank(t,'fulg'),dm=s.dmg*HJM,ar=Math.max(s.area,.6*K);
 const hit=(e,m)=>{hurt(e,(dm*m+(m===1&&wr?e.hp*wr.p*(isBoss(e)?BOSSRES:1):0))*ezM(e),t,'elem');};
 const pts=[[be.x,be.y]];hit(be,1);for(const o of S.enemies)if(o!==be&&o.hp>0&&Math.hypot(o.x-be.x,o.y-be.y)<=ar)hurt(o,dm*AUGSPL*ezM(o),t,'elem');
 if(fk){const nr=S.enemies.filter(o=>o!==be&&o.hp>0&&Math.hypot(o.x-be.x,o.y-be.y)<=2.5*K).sort((a,b)=>Math.hypot(a.x-be.x,a.y-be.y)-Math.hypot(b.x-be.x,b.y-be.y)).slice(0,fk.n);for(const o of nr){hit(o,.5);pts.push([o.x,o.y]);}}
 for(const[x,y]of pts){S.fx.push({bolt:[[x+(Math.random()-.5)*1.5,y-5*K],[x+(Math.random()-.5)*.8,y-2.5*K],[x,y]],t:.3,m:.3,big:1});if(fg)(S.cz=S.cz||[]).push({k:'fulg',x,y,r:.8*K,t:fg.t,tk:0,dm:s.dmg*FULGD,src:t});}
 S.fx.push({x:be.x,y:be.y,t:.45,m:.45,r:ar,col:'#ffe58a'});}
function heraldDeath(e){for(const t of S.list)if(t.type==='augur'&&t.spec==='herald'&&Math.hypot(e.x-t.x,e.y-t.y)<=stats(t).range)t.ch=Math.min(HCH,(t.ch||0)+HCHK);}
// ===== Orbe arcano (Era Fantástica): maleficios y almas =====
const HEXT=3,POLYS=.6,FEART=1.5,SPECSP=1.2*K,KNHP=900;
const SPECT={spectre:{n:'Espectro',ic:'👻',col:'#c8d4f0',hp:.5,d:.5,w:1,sp:1.4},knight:{n:'Caballero Espectral',ic:'♞',col:'#9fb4d8',w:2,d:1.2,sp:1}};
const soulB=o=>{const h=abRank(o,'harvest');return h?Math.min(h.max,(o.souls||0)*.01):0;};
// efectos de cada orbe que impacta (Foco Arcano): maldición, nova cada N impactos y polimorfia
function orbHit(t,tg,s,dmg){const hx=abRank(t,'hex'),nv=abRank(t,'nova'),pl=abRank(t,'poly');
 if(hx)tg.fx.hex={t:HEXT,m:Math.max(hx.m,tg.fx.hex?tg.fx.hex.m:0)};
 if(nv){t.nvN=(t.nvN||0)+1;if(t.nvN>nv.ch){t.nvN=0;const dm=dmg*nv.m,cx=tg.x,cy=tg.y;for(const o of S.enemies)if(o.hp>0&&Math.hypot(o.x-cx,o.y-cy)<=nv.r*K)hurt(o,dm,t,'magic',s.pen);S.fx.push({x:cx,y:cy,t:.5,m:.5,r:nv.r*K,col:'#a58bff'});}}
 if(pl&&tg.hp>0&&!isBoss(tg)&&!tg.fx.poly&&Math.random()<pl.p)tg.fx.poly={t:ET[tg.t].el?pl.d/2:pl.d};}
// un orbe mágico: bola brillante que crece con el nivel de la torre (Nv 1 → Nv 4)
function drawOrbP(c,px,py,lv,cs,col){const r=cs*(.12+.035*((lv||1)-1)),pu=1+.08*Math.sin(performance.now()/90);
 c.fillStyle='rgba(165,139,255,.28)';c.beginPath();c.arc(px,py,r*2*pu,0,7);c.fill();
 const g=c.createRadialGradient(px-r*.3,py-r*.3,r*.1,px,py,r);g.addColorStop(0,'#ffffff');g.addColorStop(.35,'#d8ccff');g.addColorStop(1,col||'#8a7dff');
 c.fillStyle=g;c.beginPath();c.arc(px,py,r,0,7);c.fill();}
function orbDeath(e){const s=e.src;if(!s)return;const o=s.spOwner||s;if(o.type!=='orb'||o.spec!=='reap'||!S.list.includes(o))return;
 if(abRank(o,'harvest'))o.souls=(o.souls||0)+1;
 const ra=abRank(o,'raise');if(s!==o||!ra||isBoss(e))return;
 const live=(S.summ||[]).filter(q=>q.spOwner===o&&q.beast==='spectre').length;if(live>=ra.n)return;
 if(mkSpectre(o,e,'spectre',ra.d)){o.raised=(o.raised||0)+1;const kn=abRank(o,'knight');if(kn&&o.raised>=kn.n){o.raised=0;mkSpectre(o,e,'knight',kn.d);}}}
function mkSpectre(o,e,kind,ttl){const c=pathNear(e.x,e.y);if(!c)return false;const B=SPECT[kind],s=stats(o),dps=s.dmg*s.rate*(1+soulB(o)),hp=kind==='knight'?KNHP*hpR(S.round):e.max*B.hp;
 const t={type:'bastion',lvl:1,summ:1,beast:kind,spOwner:o,ttl,x:c.x,y:c.y,cells:[],flag:{x:c.x,y:c.y},pc:[c.x,c.y],ab:{},acd:{},sd:[],xap:0,alert:1.2*K,uspdx:B.sp,ovr:{dmg:dps*B.d,rate:1,range:2.5*K,crit:0,critm:2,area:0,gold:0,pen:0}};
 t.sd=[{i:0,x:c.x,y:c.y,hp,max:hp,en:null,cd:0,rt:0,tw:t,lock:false,fight:false,wt:B.w,beast:kind}];(S.summ=S.summ||[]).push(t);S.fx.push({x:c.x,y:c.y,t:.5,m:.5,r:.8*K,col:'#c8d4f0'});return true;}
// los espectros avanzan hacia los portales mientras no luchan; el Caballero golpea en área y aterra al desvanecerse
function specTick(dt){for(const t of S.summ||[]){if(!t.spOwner)continue;const u=t.sd[0],al=u&&u.hp>0;
 if(al&&!u.en){let mv=SPECSP*dt;while(mv>1e-6){const dx=t.pc[0]-t.flag.x,dy=t.pc[1]-t.flag.y,dd=Math.hypot(dx,dy);if(dd<1e-6){const nx=rollNext(t.pc[0],t.pc[1]);if(!nx)break;t.pc=nx;continue;}const st=Math.min(mv,dd);t.flag={x:t.flag.x+dx/dd*st,y:t.flag.y+dy/dd*st};mv-=st;}}
 if(t.beast!=='knight')continue;
 if(al&&u.fight){t.kaT=(t.kaT||0)+dt;if(t.kaT>=1){t.kaT=0;for(const e of S.enemies)if(e.hp>0&&e!==u.en&&Math.hypot(e.x-u.x,e.y-u.y)<=.9*K)hurt(e,t.ovr.dmg*.5,t,'phys',0);S.fx.push({x:u.x,y:u.y,t:.3,m:.3,r:.9*K,col:'#9fb4d8'});}}
 if(!t.fe&&(!al||t.ttl<=dt*1.5)){t.fe=1;const x=u?u.x:t.flag.x,y=u?u.y:t.flag.y;for(const e of S.enemies)if(e.hp>0&&Math.hypot(e.x-x,e.y-y)<=2*K){const d=isBoss(e)?FEART*BOSSRES:FEART;e.fx.fear={t:Math.max(d,e.fx.fear?e.fx.fear.t:0)};}S.fx.push({x,y,t:.7,m:.7,r:2*K,col:'#d8e0ff'});}}}
// ===== Catapulta (Era Fantástica): munición variada, restos en el camino, rocas que ruedan =====
const STKT=2.5,BRKT=8,RUBT=.6,TARF=4,TARB=2,BEESL=1.5,ROLLM=.45,ROLLSP=12,ROLLB=3,AVPUSH=.5;
function brkOf(e){let s=0;if(e.brk)for(const q of e.brk)s+=q.a;return s;}
function brkAdd(e,a,mx){e.brk=e.brk||[];e.brk.push({t:BRKT,a});let s=brkOf(e);while(s>mx&&e.brk.length){s-=e.brk[0].a;e.brk.shift();}}
function cataShot(t,tg,s,dm,crit,nq){const ar=abRank(t,'arsenal');
 for(let q=0;q<nq;q++){let am='rock';if(ar){const r=Math.random();am=r<1/3?'tar':r<2/3?'hive':'rock';}
  const mul=am==='tar'?.6:am==='hive'?.4:1,cl=am==='tar'?'#3a2f28':am==='hive'?'#f2c230':'#9a8f80';
  S.proj.push({x:t.x,y:t.y,e:tg,tx:tg.x,ty:tg.y,vx:0,vy:0,dm:dm*mul,bd:dm,dt:'phys',src:t,sp:TW.cata.ps,area:s.area,pen:s.pen,col:cl,crit,ammo:am,cata:1});}}
function cataHit(p){const t=p.src;if(!S.list.includes(t))return;S.cz=S.cz||[];
 const ins=S.enemies.filter(e=>e.hp>0&&!isFly(e)&&Math.hypot(e.x-p.x,e.y-p.y)<=Math.max(p.area,.5*K)),rs=abRank(t,'debris'),ar=abRank(t,'arsenal');
 if(p.ammo==='rock'){const bw=abRank(t,'breach');if(bw)for(const e of ins)brkAdd(e,bw.a,bw.max);
  if(rs)S.cz.push({k:'rub',x:p.x,y:p.y,t:rs.t});
  if(t.spec==='ogre'){const c=p.e&&p.e.pv?p.e.pv:[Math.round(p.x),Math.round(p.y)];if(inb(c[0],c[1])&&S.cells[c[1]][c[0]]===2)rollStart(t,p.x,p.y,c[0],c[1],false);}}
 else if(p.ammo==='tar'&&ar)S.cz.push({k:'tar',x:p.x,y:p.y,r:Math.max(p.area,.8*K),t:ar.tar+(rs?rs.tar:0),m:ar.stk,src:t});
 else if(p.ammo==='hive'&&ar){const dps=p.bd*ar.bee;S.cz.push({k:'bee',x:p.x,y:p.y,r:1.1*K,t:3,tk:0,dps,pen:p.pen,src:t});if(rs)S.cz.push({k:'hive',x:p.x,y:p.y,t:rs.t,dps,pen:p.pen,src:t});}}
function rollStart(t,x,y,cx,cy,big){const s=stats(t),rr=abRank(t,'roll'),av=abRank(t,'aval'),d=big?av.d:(rr?rr.d:3);
 S.rolls=S.rolls||[];S.rolls.push({src:t,x,y,cx,cy,left:d*K,dm:s.dmg*(big?av.m:ROLLM),r:(big?.8:.45)*K,hit:new Set(),big,fire:0,pen:s.pen});}
function rollNext(x,y){if(!S.field||!S.field[y])return null;const f0=S.field[y][x];let b=null;for(const[dx,dy]of D){const nx=x+dx,ny=y+dy;if(!inb(nx,ny)||S.cells[ny][nx]!==2)continue;const g=S.field[ny][nx];if(g<1e9&&g>f0&&(!b||g<b.g))b={x:nx,y:ny,g};}return b?[b.x,b.y]:null;}
function rollTick(dt){if(!S.rolls||!S.rolls.length)return;
 S.rolls=S.rolls.filter(r=>{if(!S.list.includes(r.src))return false;let mv=ROLLSP*dt;
  while(mv>1e-6&&r.left>0){const dx=r.cx-r.x,dy=r.cy-r.y,dd=Math.hypot(dx,dy);
   if(dd<1e-6){const nx=rollNext(r.cx,r.cy);if(!nx){r.left=0;break;}r.cx=nx[0];r.cy=nx[1];continue;}
   const st=Math.min(mv,dd,r.left);r.x+=dx/dd*st;r.y+=dy/dd*st;mv-=st;r.left-=st;}
  if(!r.fire&&S.pools.some(p=>p.tar&&Math.hypot(p.x-r.x,p.y-r.y)<=p.r))r.fire=1;
  /* también se empapa en los charcos de veneno: envenena a todo lo que arrolla con la fuerza del charco */
  if(!r.pois){const pp=S.pools.find(p=>!p.el&&Math.hypot(p.x-r.x,p.y-r.y)<=p.r);if(pp)r.pois=pp.n;}
  const cr=abRank(r.src,'crush');
  for(const e of S.enemies){if(e.hp<=0||isFly(e)||r.hit.has(e)||Math.hypot(e.x-r.x,e.y-r.y)>r.r)continue;r.hit.add(e);hurt(e,r.dm,r.src,'phys',r.pen);
   if(e.hp>0){if(cr)stunE(e,cr.s);if(r.big)knock(e,AVPUSH*K);if(r.fire)addBurn(e,r.src,ROLLB);if(r.pois)addPois(e,r.pois,r.src);}}
  return r.left>0;});}
// zonas: charcos de brea (pegajoso, inflamable), enjambres, panales y cascotes
function czTick(dt){for(const e of S.enemies)e.stkIn=0;
 if(S.cz&&S.cz.length){const add=[];
  S.cz=S.cz.filter(z=>{if(z.src&&!S.list.includes(z.src))return false;
   if(z.k==='tar'){let lit=false;for(const e of S.enemies){if(e.hp<=0||isFly(e)||Math.hypot(e.x-z.x,e.y-z.y)>z.r)continue;e.stkIn=Math.max(e.stkIn,z.m);if(e.bn>0)lit=true;}
    if(!lit&&S.pools.some(p=>p.el==='fire'&&Math.hypot(p.x-z.x,p.y-z.y)<=p.r+z.r))lit=true;
    if(lit){S.pools.push({x:z.x,y:z.y,t:TARF,n:TARB,tk:0,src:z.src,r:z.r,el:'fire',tar:1});S.fx.push({x:z.x,y:z.y,t:.5,m:.5,r:z.r,col:'#ff7a2e'});return false;}}
   else if(z.k==='bee'){z.tk-=dt;if(z.tk<=0){z.tk+=.5;for(const e of S.enemies)if(e.hp>0&&Math.hypot(e.x-z.x,e.y-z.y)<=z.r)hurt(e,z.dps*.5*(e.fx.slow||e.stk>0?BEESL:1),z.src,'phys',z.pen);}}
   else if(z.k==='hive'){if(S.enemies.some(e=>e.hp>0&&!isFly(e)&&Math.hypot(e.x-z.x,e.y-z.y)<=.6*K)){add.push({k:'bee',x:z.x,y:z.y,r:1.1*K,t:2,tk:0,dps:z.dps,pen:z.pen,src:z.src});return false;}}
   else if(z.k==='fulg'){z.tk-=dt;if(z.tk<=0){z.tk+=1;for(const e of S.enemies)if(e.hp>0&&!isFly(e)&&Math.hypot(e.x-z.x,e.y-z.y)<=z.r){hurt(e,z.dm*ezM(e),z.src,'elem');const q=e.ez||(e.ez={n:0,t:0});q.n=Math.min(EZMAX,q.n+stkM(e));q.t=4;}}}
   else if(z.k==='rub'){const e=S.enemies.find(e=>e.hp>0&&!isFly(e)&&Math.hypot(e.x-z.x,e.y-z.y)<=.5*K);if(e){stunE(e,RUBT);return false;}}
   return (z.t-=dt)>0;});
  if(add.length)S.cz.push(...add);}
 for(const e of S.enemies){if(e.stkIn>0){e.stk=1;e.stkM=e.stkIn;}else if(e.stk>0)e.stk=Math.max(0,e.stk-dt/STKT);if(e.stk>0)slowE(e,1-e.stkM*e.stk,.15);
  if(e.brk&&e.brk.length){for(const q of e.brk)q.t-=dt;e.brk=e.brk.filter(q=>q.t>0);}}}
const isFly=e=>(!!ET[e.t].fly||e.flyx>S.wt)&&!(e.gnd>S.wt);
const alive=e=>e.hp>0&&S.enemies.includes(e),mkB=e=>e&&e.mk&&e.mk.t>0?e.mk.cr:0;
