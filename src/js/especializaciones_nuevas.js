// ---- v311 · Especializaciones nuevas ----
// Altar de runas → Senda rúnica · Dron de mantenimiento → Dron petrolero · Cañoneros (era 2) → Cañón de riel y Drones bombarderos
// Sus datos (SPECS y AB) están en data/towers.js; aquí vive lo que hacen.
const SRMAX=6,SRR=.5,SRLAND=.2,RUNO=['x','a','q'],RUNT={x:{n:'Explosiva',col:'#ff8a5a',m:1,r:1},a:{n:'Atadura',col:'#7be08a',m:.25,r:.8,root:1},q:{n:'Quebranto',col:'#9ab4d8',m:.6,r:.8,brk:8,bmax:24}};
const PTT=5,PTR=.6,PTM=.25,PSPD=2,RAILW=.4,RAILF=.85,BDSPD=3.5,BDREB=5;
let SPNERR=null;
// las torres de apoyo no tienen daño propio: al especializarse en algo que ataca, lo toman de su especialización (con todos los bonus de siempre)
{const _s=stats;stats=function(t){const X=t&&t.spec&&!t.ovr&&!t.hero&&SPECS[t.type]&&SPECS[t.type][t.spec],o=X&&X.o,T=X&&TW[t.type];
  if(o&&o.dmg!=null&&T&&!T.dmg){const d0=T.dmg,r0=T.rate;T.dmg=o.dmg;T.rate=o.rate||1;try{return _s.apply(this,arguments);}finally{T.dmg=d0;T.rate=r0;}}return _s.apply(this,arguments);};}
const spnField=(x,y)=>{const r=S.field&&S.field[Math.round(y)];const f=r?r[Math.round(x)]:null;return f==null||!isFinite(f)||f<0||f>=1e9?null:f;};
// casillas de camino (su centro) dentro del alcance de una torre
function spnCells(t,s){const out=[];for(let ky=0;ky<NC;ky++)for(let kx=0;kx<NC;kx++){if(S.cc[ky][kx]!==2)continue;const x=kx*K+1,y=ky*K+1;if(Math.hypot(x-t.x,y-t.y)>s.range)continue;const f=spnField(x,y);if(f==null)continue;out.push({x,y,f});}return out;}

// ================= Senda rúnica =================
function sendaTick(t,dt){const s=stats(t);t.rt=(t.rt==null?1:t.rt)-dt;if(t.rt>0)return;const R=S.srun=S.srun||[],F=S.srfly=S.srfly||[];
 const mine=R.filter(r=>r.src===t&&!r.seal).length+F.filter(r=>r.src===t&&!r.seal).length,sl=abRank(t,'sello');
 const seal=!!sl&&((t.rn||0)+1)%sl.n===0&&!R.some(r=>r.src===t&&r.seal)&&!F.some(r=>r.src===t&&r.seal);
 if(!seal&&mine>=SRMAX){t.rt=.5;return;}
 const cells=spnCells(t,s).filter(c=>!R.some(r=>Math.hypot(r.x-c.x,r.y-c.y)<.9*K)&&!F.some(r=>Math.hypot(r.x-c.x,r.y-c.y)<.9*K));
 if(!cells.length){t.rt=.5;return;}
 // justo delante del enemigo más adelantado dentro del alcance; si no hay nadie, a una casilla libre al azar
 let lead=null;for(const e of S.enemies){if(e.hp<=0||isFly(e)||Math.hypot(e.x-t.x,e.y-t.y)>s.range)continue;const f=spnField(e.x,e.y);if(f!=null&&(!lead||f<lead))lead=f;}
 let c=null;if(lead!=null){const ah=cells.filter(q=>q.f<lead).sort((a,b)=>Math.abs(a.f-(lead-K))-Math.abs(b.f-(lead-K)));c=ah[0]||null;}
 if(!c)c=cells[Math.floor(Math.random()*cells.length)];
 const k=RUNO[(t.rk=(t.rk||0)+1)%3];if(seal||!sl||((t.rn||0)+1)%sl.n!==0)t.rn=(t.rn||0)+1;
 F.push({x0:t.x,y0:t.y,x:c.x,y:c.y,k,t:0,m:.5,src:t,seal});t.rt=1/s.rate;}
function sendaLand(r){const t=r.src;if(!S.list.includes(t))return;const s=stats(t),ps=abRank(t,'persist');
 for(const e of S.enemies)if(e.hp>0&&!isFly(e)&&Math.hypot(e.x-r.x,e.y-r.y)<=.6*K)hurt(e,s.dmg*SRLAND,t,'magic',s.pen);
 S.fx.push({x:r.x,y:r.y,t:.25,m:.25,r:.6*K,col:RUNT[r.k].col});
 const o={x:r.x,y:r.y,k:r.k,src:t,uses:ps?ps.n:1,arm:.3};
 if(r.seal){const cells=stripCells(r.x,r.y,3*K);if(cells.length){o.seal=1;o.cells=cells;o.set=new Set(cells.map(c=>c.x+','+c.y));o.f0=Math.min(...cells.map(c=>S.field[c.y][c.x]));}}
 (S.srun=S.srun||[]).push(o);}
function runeFire(r,seen){if(r.dead||seen.has(r))return;seen.add(r);const t=r.src,s=stats(t),D=RUNT[r.k],sl=abRank(t,'sello'),M=r.seal?(sl?sl.m:1.5):1;
 const hit=r.seal?e=>r.set.has(Math.round(e.x)+','+Math.round(e.y)):e=>Math.hypot(e.x-r.x,e.y-r.y)<=D.r*K;
 for(const e of S.enemies){if(e.hp<=0||isFly(e)||!hit(e))continue;hurt(e,s.dmg*D.m*M,t,'magic',s.pen);if(e.hp<=0)continue;
  if(D.root)e.fx.root={t:Math.max(e.fx.root?e.fx.root.t:0,D.root*M*(isBoss(e)?BOSSRES:1))};if(D.brk)brkAdd(e,D.brk*M,D.bmax*M);}
 if(r.seal){for(const c of r.cells)if((c.x+c.y)%2===0)S.fx.push({x:c.x,y:c.y,t:.35,m:.35,r:.5*K,col:D.col});}else S.fx.push({x:r.x,y:r.y,t:.35,m:.35,r:D.r*K,col:D.col});
 try{sfxHit(t,'magic');}catch(e){}
 r.uses--;if(r.uses<=0)r.dead=1;else r.arm=1;
 const ch=abRank(t,'cadena');if(ch)for(const o of S.srun)if(o!==r&&!o.dead&&!o.seal&&!(o.arm>0)&&Math.hypot(o.x-r.x,o.y-r.y)<=ch.r*K){S.fx.push({line:[r.x,r.y,o.x,o.y],col:'#e0c8ff',t:.2,m:.2});runeFire(o,seen);}}
function sendaAll(dt){
 if(S.srfly&&S.srfly.length){for(const r of S.srfly){r.t+=dt;if(r.t>=r.m)sendaLand(r);}S.srfly=S.srfly.filter(r=>r.t<r.m);}
 const R=S.srun;if(!R||!R.length)return;
 for(const r of R){if(r.dead)continue;if(!S.list.includes(r.src)){r.dead=1;continue;}if(r.arm>0){r.arm-=dt;continue;}
  if(r.seal){let n=0,out=false;for(const e of S.enemies){if(e.hp<=0||isFly(e)||e.hk>0)continue;const cx=Math.round(e.x),cy=Math.round(e.y);if(!r.set.has(cx+','+cy))continue;n++;if(S.field[cy][cx]<=r.f0+1)out=true;}if(n>=4||out)runeFire(r,new Set());}
  else if(S.enemies.some(e=>e.hp>0&&!isFly(e)&&!(e.hk>0)&&Math.hypot(e.x-r.x,e.y-r.y)<=SRR*K))runeFire(r,new Set());}
 S.srun=R.filter(r=>!r.dead);}

// ================= Dron petrolero =================
function petroTick(t,dt){const s=stats(t),d=t.pd=t.pd||{x:t.x,y:t.y,i:0,dir:1};
 if(!t.pr||t.prR!==S.round||t.prG!==s.range){t.pr=spnCells(t,s).sort((a,b)=>b.f-a.f);t.prR=S.round;t.prG=s.range;}
 const rt=t.pr;if(!rt.length)return;if(d.i>=rt.length)d.i=rt.length-1;
 const c=rt[d.i],dx=c.x-d.x,dy=c.y-d.y,dd=Math.hypot(dx,dy),st=PSPD*K*dt;
 if(dd>st){d.x+=dx/dd*st;d.y+=dy/dd*st;}
 else{d.x=c.x;d.y=c.y;const mn=abRank(t,'mancha');
  if(!(S.cz||[]).some(z=>z.k==='tar'&&Math.hypot(z.x-c.x,z.y-c.y)<.7*K)&&!S.pools.some(p=>p.tar&&Math.hypot(p.x-c.x,p.y-c.y)<.7*K))(S.cz=S.cz||[]).push({k:'tar',x:c.x,y:c.y,r:PTR*K*(1+(mn?mn.ar:0)),t:PTT,m:PTM+(mn?mn.m:0),src:t,pd:s.dmg,tk:1});
  if(rt.length>1){if(d.i+d.dir<0||d.i+d.dir>=rt.length)d.dir=-d.dir;d.i+=d.dir;}}
 // Chispazo
 const ch=abRank(t,'chispazo');if(ch){t.spT=(t.spT===undefined?ch.cd/2:t.spT)-dt;if(t.spT<=0){let bz=null,be=null,bf=1e9;
   for(const z of S.cz||[]){if(z.k!=='tar'||z.src!==t)continue;for(const e of S.enemies){if(e.hp<=0||isFly(e)||e.hk>0||Math.hypot(e.x-z.x,e.y-z.y)>z.r)continue;const f=spnField(e.x,e.y);if(f!=null&&f<bf){bf=f;be=e;bz=z;}}}
   if(be){t.spT=ch.cd;S.fx.push({bolt:[[d.x,d.y-1],[be.x,be.y]],t:.18,m:.18});hurt(be,s.dmg*4,t,'elem',0);
    for(const e of S.enemies)if(e.hp>0&&!isFly(e)&&Math.hypot(e.x-bz.x,e.y-bz.y)<=bz.r){addBurn(e,t,ch.n);S.fx.push({x:e.x,y:e.y,t:.2,m:.2,r:.3*K,col:'#ffb04a'});}}
   else t.spT=.4;}}}
// charcos del dron: un poco de daño a quien los pisa
function petroPools(dt){for(const z of S.cz||[]){if(!z.pd)continue;z.tk-=dt;if(z.tk>0)continue;z.tk+=1;for(const e of S.enemies)if(e.hp>0&&!isFly(e)&&Math.hypot(e.x-z.x,e.y-z.y)<=z.r)hurt(e,z.pd,z.src,'phys',0);}}
// Munición incendiaria: torres de la misma pieza que el dron, o pegadas a él
function incendSet(){const set=new Set();for(const t of S.list){if(t.type!=='dron'||t.spec!=='petro'||!abRank(t,'municion'))continue;const kx=Math.floor(t.x/K),ky=Math.floor(t.y/K),bx=Math.floor(kx/P),by=Math.floor(ky/P);
  for(const o of S.list){if(o===t||TW[o.type].support)continue;const ox=Math.floor(o.x/K),oy=Math.floor(o.y/K);if((Math.floor(ox/P)===bx&&Math.floor(oy/P)===by)||Math.max(Math.abs(ox-kx),Math.abs(oy-ky))<=1)set.add(o);}}return set;}
{const _oh=onHit;onHit=function(e,src){const r=_oh.apply(this,arguments);try{if(e&&e.hp>0&&src&&S.incS&&S.incS.has(src)&&S.wt-(src.incT===undefined?-9:src.incT)>=.5){src.incT=S.wt;addBurn(e,src,1);}}catch(x){}return r;};}

// ================= Cañón de riel =================
function railShot(t,tg,s,dm,crit){const L=s.range,cand=S.enemies.filter(e=>e.hp>0&&!(e.hk>0)&&Math.hypot(e.x-t.x,e.y-t.y)<=L&&!(typeof camoHid==='function'&&camoHid(e,t)));
 const line=a=>{const ux=Math.cos(a),uy=Math.sin(a),h=[];for(const e of cand){const dx=e.x-t.x,dy=e.y-t.y,p=dx*ux+dy*uy;if(p<0||p>L)continue;if(Math.abs(dx*uy-dy*ux)<=RAILW*K+(ET[e.t].r||.3))h.push([p,e]);}return h;};
 let best=null;for(const e of cand){const a=Math.atan2(e.y-t.y,e.x-t.x),h=line(a),sc=h.length+(h.some(q=>q[1]===tg)?.5:0);if(!best||sc>best.sc)best={a,h,sc};}
 if(!best)return;best.h.sort((a,b)=>a[0]-b[0]);const pf=abRank(t,'perfor');let kills=0,i=0;try{sfxHit(t,'phys');}catch(e){}
 for(const[p,e]of best.h){hurt(e,dm*(pf?1:Math.pow(RAILF,i)),t,'phys',s.pen);if(i===0&&crit)critMark(e);i++;onHit(e,t);if(e.hp<=0)kills++;S.fx.push({x:e.x,y:e.y,t:.18,m:.18,r:.45*K,col:'#bfeaff'});}
 const x2=t.x+Math.cos(best.a)*L,y2=t.y+Math.sin(best.a)*L;(S.railfx=S.railfx||[]).push({x1:t.x,y1:t.y,x2,y2,t:.35,m:.35});
 const rc=abRank(t,'recarga');t.hot=rc?Math.min(rc.max,rc.p*kills):0;if(t.hot>0)t.cd-=(1/s.rate)*(1-1/(1+t.hot));
 const es=abRank(t,'estela');if(es)(S.rails=S.rails||[]).push({x1:t.x,y1:t.y,x2,y2,t:es.t,m:es.t,tk:.5,src:t,dm:s.dmg*es.p});}
const segDist=(px,py,x1,y1,x2,y2)=>{const dx=x2-x1,dy=y2-y1,l2=dx*dx+dy*dy||1,u=Math.max(0,Math.min(1,((px-x1)*dx+(py-y1)*dy)/l2));return Math.hypot(x1+dx*u-px,y1+dy*u-py);};
function railsTick(dt){if(S.railfx&&S.railfx.length)S.railfx=S.railfx.filter(o=>(o.t-=dt)>0);if(!S.rails||!S.rails.length)return;
 for(const z of S.rails){z.t-=dt;z.tk-=dt;if(z.tk>0)continue;z.tk+=1;for(const e of S.enemies){if(e.hp<=0||isFly(e)||segDist(e.x,e.y,z.x1,z.y1,z.x2,z.y2)>RAILW*K+.3)continue;hurt(e,z.dm*ezM(e),z.src,'elem',0);if(e.hp>0)h2Ez(e,1);}}
 S.rails=S.rails.filter(z=>z.t>0&&S.list.includes(z.src));}

// ================= Drones bombarderos =================
const bprog=e=>(S.field[e.ty]?S.field[e.ty][e.tx]:0)+Math.hypot(e.tx-e.x,e.ty-e.y);
function bombTick(t,dt){const s=stats(t),eq=abRank(t,'escuad'),n=2+(eq?eq.n:0);t.bd=t.bd||[];while(t.bd.length<n)t.bd.push({x:t.x,y:t.y,cd:0,rb:0});t.bd.length=n;
 for(const d of t.bd)if(d.rb>0){d.rb-=dt;if(d.rb<=0){d.rb=0;d.x=t.x;d.y=t.y;S.fx.push({x:t.x,y:t.y,t:.3,m:.3,r:.5*K,col:'#ffd75a'});}}
 // picados en curso
 for(const d of t.bd){const v=d.dive;if(!v)continue;const dx=v.x-d.x,dy=v.y-d.y,dd=Math.hypot(dx,dy),st=9*K*dt;if(dd>st){d.x+=dx/dd*st;d.y+=dy/dd*st;continue;}
  d.dive=null;d.rb=BDREB;const R=s.area*2;for(const e of S.enemies)if(e.hp>0&&Math.hypot(e.x-v.x,e.y-v.y)<=R)hurt(e,s.dmg*v.m,t,'phys',s.pen);S.fx.push({x:v.x,y:v.y,t:.45,m:.45,r:R,col:'#ff9a4a'});try{sfxHit(t,'phys');}catch(e){}}
 if(t.jam>0)return;
 // escuadras con algún enemigo de tierra dentro del alcance
 const G=new Map();for(const e of S.enemies){if(e.hp<=0||e.hk>0||isFly(e)||Math.hypot(e.x-t.x,e.y-t.y)>s.range||(typeof camoHid==='function'&&camoHid(e,t)))continue;const k=e.sqid?'s'+e.sqid:e;let g=G.get(k);if(!g)G.set(k,g={es:[],p:1e9,lead:null});g.es.push(e);const p=bprog(e);if(p<g.p){g.p=p;g.lead=e;}}
 const gs=[...G.values()].sort((a,b)=>a.p-b.p),live=t.bd.filter(d=>!(d.rb>0)&&!d.dive);
 // reparto: la escuadra más adelantada primero; cada una se lleva al dron libre que tenga más cerca. Los drones que sobran repiten escuadra
 const free=live.slice(),asg=new Map();for(let i=0;i<gs.length&&free.length;i++){let bi=0,bd=1e9;free.forEach((d,j)=>{const q=Math.hypot(d.x-gs[i].lead.x,d.y-gs[i].lead.y);if(q<bd){bd=q;bi=j;}});asg.set(free.splice(bi,1)[0],gs[i]);}
 free.forEach((d,j)=>{if(gs.length)asg.set(d,gs[j%gs.length]);});
 const mt=abRank(t,'metafil');
 for(const d of live){const g=asg.get(d),tx=g?g.lead.x:t.x,ty=g?g.lead.y:t.y,dx=tx-d.x,dy=ty-d.y,dd=Math.hypot(dx,dy),st=BDSPD*K*dt;if(dd>st){d.x+=dx/dd*st;d.y+=dy/dd*st;}else{d.x=tx;d.y=ty;}
  d.cd=Math.max(0,d.cd-dt);if(g&&dd<=.6*K&&d.cd<=0){d.cd=1/s.rate;const crit=Math.random()<s.crit+mkB(g.lead);(S.bombs=S.bombs||[]).push({x:g.lead.x,y:g.lead.y,t:.22,m:.22,src:t,dm:s.dmg*(crit?s.critm:1),area:s.area,pen:s.pen,bl:mt?mt.n:0,crit,e:g.lead});}}
 // Bombardeo en picado: contra el grupo más grande (también voladores)
 const pk=abRank(t,'picado');if(pk){t.pkT=(t.pkT===undefined?pk.cd/2:t.pkT)-dt;if(t.pkT<=0){const R=s.area*2,inR=S.enemies.filter(e=>e.hp>0&&!(e.hk>0)&&Math.hypot(e.x-t.x,e.y-t.y)<=s.range);let be=null,bn=0;
   for(const e of inR){let c=0;for(const o of inR)if(Math.hypot(o.x-e.x,o.y-e.y)<=R)c++;if(c>bn){bn=c;be=e;}}
   if(be&&live.length){let d=live[0];for(const q of live)if(Math.hypot(q.x-be.x,q.y-be.y)<Math.hypot(d.x-be.x,d.y-be.y))d=q;d.dive={x:be.x,y:be.y,m:pk.m};t.pkT=pk.cd;}else t.pkT=.5;}}}
function bombsTick(dt){if(!S.bombs||!S.bombs.length)return;for(const b of S.bombs){b.t-=dt;if(b.t>0)continue;if(!S.list.includes(b.src))continue;try{sfxHit(b.src,'phys');}catch(e){}
  for(const e of S.enemies){if(e.hp<=0||isFly(e)||Math.hypot(e.x-b.x,e.y-b.y)>b.area)continue;hurt(e,b.dm*(e===b.e?1:SPLASH),b.src,'phys',b.pen);if(e===b.e){if(b.crit)critMark(e);onHit(e,b.src);}if(b.bl&&e.hp>0)addBleed(e,b.src,b.bl);}
  S.fx.push({x:b.x,y:b.y,t:.22,m:.22,r:b.area,col:'#e8a05a'});}
 S.bombs=S.bombs.filter(b=>b.t>0);}

// ================= bucle, ronda y guardados =================
function spnTick(dt){if(!S||S.phase!=='wave')return;S.incK=(S.incK||0)-dt;if(S.incK<=0||!S.incS){S.incK=1;S.incS=incendSet();}
 for(const t of S.list){if(!t.spec)continue;const X=SPECS[t.type]&&SPECS[t.type][t.spec];if(!X)continue;if(X.senda)sendaTick(t,dt);else if(X.petro)petroTick(t,dt);else if(t.type==='cannon'&&t.spec==='bomb')bombTick(t,dt);}
 sendaAll(dt);petroPools(dt);railsTick(dt);bombsTick(dt);}
{const _t=e2TowersTick;e2TowersTick=function(dt){const r=_t.apply(this,arguments);try{spnTick(dt);}catch(e){if(!SPNERR){SPNERR=e;console.error(e);}}return r;};}
{const _nr=nextRound;nextRound=function(){try{S.srun=[];S.srfly=[];S.rails=[];S.railfx=[];S.bombs=[];S.incS=null;for(const t of S.list){t.hot=0;if(t.bd)for(const d of t.bd){d.x=t.x;d.y=t.y;d.rb=0;d.dive=null;d.cd=0;}if(t.pd){t.pd.x=t.x;t.pd.y=t.y;t.pd.i=0;t.pd.dir=1;}t.pr=null;}}catch(e){}return _nr.apply(this,arguments);};}
// partidas guardadas con los Cañoneros antiguos (Artilleros / Mineros): pasan a las especializaciones nuevas, sin habilidades
{const _l=loadRun;loadRun=function(rec){try{const L=rec&&rec.S&&rec.S.list;if(L)for(const t of L)if(t&&t.type==='cannon'&&(t.spec==='art'||t.spec==='mnr')){t.spec=t.spec==='art'?'rail':'bomb';t.ab={};t.acd={};}}catch(e){}return _l.apply(this,arguments);};}

// ================= dibujo =================
function spnRune(px,py,r,k,lw,a){const D=RUNT[k];g.save();g.globalAlpha=a==null?1:a;g.fillStyle='rgba(20,16,30,.7)';g.beginPath();g.arc(px,py,r*1.25,0,7);g.fill();g.strokeStyle=D.col;g.lineWidth=lw(2);g.beginPath();g.arc(px,py,r*1.25,0,7);g.stroke();
 g.fillStyle=D.col;g.strokeStyle='#1b1712';g.lineWidth=lw(1);g.beginPath();g.moveTo(px,py-r);g.lineTo(px+r*.7,py);g.lineTo(px,py+r);g.lineTo(px-r*.7,py);g.closePath();g.fill();g.stroke();
 g.strokeStyle='#1b1712';g.lineWidth=lw(1.4);g.beginPath();if(k==='x'){g.moveTo(px-r*.25,py-r*.3);g.lineTo(px+r*.25,py+r*.3);g.moveTo(px+r*.25,py-r*.3);g.lineTo(px-r*.25,py+r*.3);}else if(k==='a'){g.arc(px,py,r*.28,0,7);}else{g.moveTo(px,py-r*.45);g.lineTo(px-r*.15,py);g.lineTo(px+r*.15,py);g.lineTo(px,py+r*.45);}g.stroke();g.restore();}
function spnDraw(lw){const X=v=>v*CS+CS/2,now=performance.now()/1000,im=svgImg(E2DRONE);
 // sellos y runas en el suelo
 for(const r of S.srun||[]){const D=RUNT[r.k],pu=.75+.25*Math.sin(now*4+r.x);
  if(r.seal){g.fillStyle=D.col;g.globalAlpha=.22*pu;for(const c of r.cells)g.fillRect(c.x*CS,c.y*CS,CS,CS);g.globalAlpha=.9;g.strokeStyle=D.col;g.lineWidth=lw(1.6);
   for(const c of r.cells){const x=c.x*CS,y=c.y*CS;g.beginPath();if(!r.set.has((c.x-1)+','+c.y)){g.moveTo(x,y);g.lineTo(x,y+CS);}if(!r.set.has((c.x+1)+','+c.y)){g.moveTo(x+CS,y);g.lineTo(x+CS,y+CS);}if(!r.set.has(c.x+','+(c.y-1))){g.moveTo(x,y);g.lineTo(x+CS,y);}if(!r.set.has(c.x+','+(c.y+1))){g.moveTo(x,y+CS);g.lineTo(x+CS,y+CS);}g.stroke();}
   g.globalAlpha=1;let sx=0,sy=0;for(const c of r.cells){sx+=c.x;sy+=c.y;}spnRune(X(sx/r.cells.length),X(sy/r.cells.length),CS*1.1,r.k,lw,r.arm>0?.5:1);}
  else{g.fillStyle=D.col;g.globalAlpha=.16+.14*pu;g.beginPath();g.arc(X(r.x),X(r.y),CS*(1.1+.25*pu),0,7);g.fill();g.globalAlpha=1;spnRune(X(r.x),X(r.y),CS*.72,r.k,lw,r.arm>0?.55:1);}
  if(r.uses>1){g.fillStyle='#fff';for(let i=0;i<r.uses;i++){g.beginPath();g.arc(X(r.x)-lw(3)+i*lw(6),X(r.y)+CS*(r.seal?1.7:1.05),lw(1.8),0,7);g.fill();}}}
 for(const r of S.srfly||[]){const k=r.t/r.m,x=r.x0+(r.x-r.x0)*k,y=r.y0+(r.y-r.y0)*k-Math.sin(k*Math.PI)*K*.9;spnRune(X(x),X(y),CS*.5,r.k,lw,1);}
 // estela iónica y fogonazo del riel
 for(const z of S.rails||[]){const a=Math.min(1,z.t/.6);g.strokeStyle='rgba(120,216,255,'+.28*a+')';g.lineWidth=RAILW*2*K*CS;g.lineCap='butt';g.beginPath();g.moveTo(X(z.x1),X(z.y1));g.lineTo(X(z.x2),X(z.y2));g.stroke();
  g.strokeStyle='rgba(215,245,255,'+.85*a+')';g.lineWidth=lw(1.6);g.setLineDash([lw(5),lw(4)]);g.lineDashOffset=-now*40;g.beginPath();g.moveTo(X(z.x1),X(z.y1));g.lineTo(X(z.x2),X(z.y2));g.stroke();g.setLineDash([]);}
 for(const o of S.railfx||[]){const a=o.t/o.m;g.lineCap='round';g.strokeStyle='rgba(122,216,255,'+.55*a+')';g.lineWidth=lw(10)*a+lw(2);g.beginPath();g.moveTo(X(o.x1),X(o.y1));g.lineTo(X(o.x2),X(o.y2));g.stroke();g.strokeStyle='rgba(255,255,255,'+a+')';g.lineWidth=lw(3)*a+lw(1);g.beginPath();g.moveTo(X(o.x1),X(o.y1));g.lineTo(X(o.x2),X(o.y2));g.stroke();}
 // bombas cayendo
 for(const b of S.bombs||[]){const k=1-b.t/b.m,px=X(b.x),py=X(b.y)-CS*1.4*(1-k);g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(X(b.x),X(b.y),CS*.3,CS*.14,0,0,7);g.fill();g.fillStyle='#2a2a34';g.strokeStyle='#1b1712';g.lineWidth=lw(1);g.beginPath();g.arc(px,py,CS*.2,0,7);g.fill();g.stroke();}
 const drone=(x,y,r,tint)=>{const bob=Math.sin(now*4+x)*CS*.15;g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(X(x),X(y)+CS*.3,r*.5,r*.2,0,0,7);g.fill();if(im.complete&&im.naturalWidth)try{g.drawImage(im,X(x)-r,X(y)-r*1.5+bob,r*2,r*2);}catch(e){}
  if(tint){g.fillStyle=tint;g.strokeStyle='#1b1712';g.lineWidth=lw(1);g.beginPath();g.arc(X(x),X(y)-r*.25+bob,r*.24,0,7);g.fill();g.stroke();}};
 for(const t of S.list){if(!t.spec)continue;
  if(t.type==='dron'&&t.spec==='petro'&&t.pd)drone(t.pd.x,t.pd.y,CS*1.1,'#2a2420');
  if(t.type==='cannon'&&t.spec==='bomb'&&t.bd)for(const d of t.bd){if(d.rb>0)continue;if(d.dive){g.strokeStyle='rgba(255,154,74,.7)';g.lineWidth=lw(2.5);g.beginPath();g.moveTo(X(d.x),X(d.y)-CS);g.lineTo(X(d.dive.x),X(d.dive.y));g.stroke();}drone(d.x,d.y,CS*.9,'#c0392b');}
  // carga del riel: un arco que se va cerrando alrededor de la torre
  if(t.type==='cannon'&&t.spec==='rail'&&S.phase==='wave'){const s=stats(t),k=Math.max(0,Math.min(1,1-t.cd*s.rate));if(k<1&&k>0){g.strokeStyle='rgba(122,216,255,.85)';g.lineWidth=lw(2.5);g.beginPath();g.arc(X(t.x),X(t.y),K*CS*.56,-Math.PI/2,-Math.PI/2+6.283*k);g.stroke();}}}}
{const _d=e2DrawWorld;e2DrawWorld=function(lw){const r=_d.apply(this,arguments);try{spnDraw(lw);}catch(e){if(!SPNERR){SPNERR=e;console.error(e);}}return r;};}

// ================= fichas =================
// texto de lo que hace una torre de apoyo especializada en atacar (lo usa la ficha de las torres de bufo)
function specTxt(t){if(!t||!t.spec)return '';const s=stats(t),sl=abRank(t,'sello');
 if(t.type==='altar'&&t.spec==='senda')return `Ya no bufa torres. Cada ${f(1/s.rate)} s lanza una runa al camino (hasta ${SRMAX} en el suelo): al caer hace <span class="cmg">${f(s.dmg*SRLAND)}</span> de daño y se queda hasta que un enemigo de tierra la pisa. Rotan tres tipos: <b style="color:${RUNT.x.col}">explosiva</b> (<span class="cmg">${f(s.dmg)}</span> de daño a 1 casilla), <b style="color:${RUNT.a.col}">atadura</b> (<span class="cmg">${f(s.dmg*RUNT.a.m)}</span> de daño e ${kw('root','inmoviliza','tw:'+t.id)} 1 s) y <b style="color:${RUNT.q.col}">quebranto</b> (<span class="cmg">${f(s.dmg*RUNT.q.m)}</span> de daño y −${RUNT.q.brk} de ${kw('brk','armadura rota','tw:'+t.id)}, hasta −${RUNT.q.bmax}).`+(sl?` Runas hasta el próximo sello: <b>${sl.n-((t.rn||0)%sl.n)}</b>.`:'');
 if(t.type==='dron'&&t.spec==='petro'){const mn=abRank(t,'mancha');return `Ya no ajusta torres. El dron recorre el camino dentro de su alcance y suelta charcos de brea que duran ${PTT} s: hacen <span class="cph">${f(s.dmg)}</span> de daño por segundo, dejan ${kw('sticky','pegajosos','tw:'+t.id)} a los enemigos (hasta un ${Math.round((PTM+(mn?mn.m:0))*100)}% de ralentización) y son ${kw('flam','inflamables','tw:'+t.id)}: si les llega fuego, arden.`;}
 return '';}
{const _ti=towerInfo;towerInfo=function(t){let h=_ti.apply(this,arguments);try{if(t&&t.type==='cannon'&&t.spec){let x='';
   if(t.spec==='bomb'){const n=t.bd?t.bd.length:2+((abRank(t,'escuad')||{}).n||0);x=`<small>Drones: <b>${n}</b>. El daño, el enfriamiento y el DPS son los de cada dron. No se elige objetivo: cada dron va a una escuadra distinta, empezando por la más adelantada.</small>`;}
   else if(t.spec==='rail'){x=`<small>Dispara en línea recta por todo su alcance, en el ángulo que más enemigos atraviesa.${abRank(t,'perfor')?'':' Pierde un 15% de daño por cada enemigo atravesado.'}${t.hot>0?' Recarga en caliente: <b>+'+Math.round(t.hot*100)+'%</b>.':''}</small>`;}
   if(x){const i=h.indexOf('<div class="esec"');h=i>=0?h.slice(0,i)+x+h.slice(i):h+x;}}}catch(e){}return h;};}
// mecánicas del compendio
try{const add=(id,r)=>{MECUSE[id]=MECUSE[id]||[];if(!MECUSE[id].includes(r))MECUSE[id].push(r);};
 for(const id in MECUSE)MECUSE[id]=MECUSE[id].filter(x=>x!=='tw:cannon:art'&&x!=='tw:cannon:mnr'&&!(x==='tw:cannon'&&id==='push'));add('bleed','tw:cannon:bomb');add('ez','tw:cannon:rail');add('root','tw:altar:senda');add('brk','tw:altar:senda');add('sticky','tw:dron:petro');add('flam','tw:dron:petro');add('burn','tw:dron:petro');}catch(e){}
