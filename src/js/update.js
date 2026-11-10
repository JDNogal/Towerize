function update(dt){
 if(!dt)return;
 S.fx=S.fx.filter(q=>(q.t-=dt)>0);
 unitWalk(dt);
 if(S.phase!=='wave'){orbTick(dt);return;}/* la experiencia que queda al acabar la oleada vuela hacia el héroe también en construcción */
 DNF++;S.faros=S.list.filter(t=>TW[t.type].faro);for(const f of S.faros)if(f.lzcd)for(let i=0;i<f.lzcd.length;i++)f.lzcd[i]=Math.max(0,f.lzcd[i]-dt);
 if(S.st){S.st.time+=dt;for(const t of S.list)t.act=(t.act||0)+dt;if(S.hero)S.hero.pt.act=(S.hero.pt.act||0)+dt;}
 S.wt+=dt;for(const id of S.relics){const st=S.rs[id];if(st.t>0)st.t=Math.max(0,st.t-dt);if(st.cd>0&&S.phase==='wave')st.cd=Math.max(0,st.cd-dt);}
 const iv=Math.max(.3,.7-S.round*.03);
 for(const p of S.portals){p.t-=dt;let gd=0;while(p.q.length&&p.t<=0&&gd++<12){let t=p.q.shift();const fo=p.qf?p.qf.shift():null;if(t==='|'){p.t=SQGAP*Math.max(1,1/(p.lsp||1));continue;}const esc=t.endsWith('#');if(esc)t=t.slice(0,-1);spawnEnemy(t,p,fo);
  // dentro de una formación, la siguiente fila sale cuando esta ha avanzado su distancia (a la velocidad común); las de la misma fila, a la vez
  const nf=p.qf&&p.qf[0];if(fo){p.lsp=fo.sp;p.t+=nf&&nf.sid===fo.sid?(nf.r-fo.r)*SQROW/fo.sp:iv;}else{p.lsp=0;p.t=(t==='boss'||t==='colossus')?.25:esc?.22:iv;}if(p.t>0)break;}}
 S.pools=S.pools.filter(p=>(p.t-=dt)>0);
 for(const q of S.rain){if(!S.list.includes(q.src)){q.left=0;continue;}q.tk-=dt;while(q.tk<=0&&q.left>0){q.tk+=.12;q.left--;const c=S.enemies.filter(e=>e.hp>0&&Math.hypot(e.x-q.x,e.y-q.y)<=q.r);if(c.length){const e=c[Math.floor(Math.random()*c.length)],ty=q.ty||'phys',hit=[e];strike(e,q.dm,q.src,ty,q.pen);
   if(q.ar)for(const o of S.enemies)if(o!==e&&o.hp>0&&Math.hypot(o.x-e.x,o.y-e.y)<=q.ar){hurt(o,q.dm*(q.af||1),q.src,ty,q.pen);hit.push(o);}
   if(q.slow)for(const o of hit)slowE(o,q.slow,SLOWT);
   if(q.burn)for(const o of hit)if(o.hp>0)addBurn(o,q.src,q.burn);
   S.fx.push({x:e.x,y:e.y,t:.2,m:.2,r:Math.max(q.ar||0,.35*K),col:q.col||'#f0c46a'});}}}
 S.rain=S.rain.filter(q=>q.left>0);
 for(const e of S.enemies){e.cb=0;e.cbm=0;e.cor=0;if(e.ps&&e.ps.length){e.crT=(e.crT||0)+dt;if(e.crT>=1){e.crT-=1;const by=new Map();for(const q of e.ps){const cr=q.src&&q.src.ab&&abRank(q.src,'corr');if(cr)by.set(q.src,(by.get(q.src)||0)+1);}
  for(const[src,n]of by){const cr=abRank(src,'corr');for(let i=Math.floor(n/5);i>0;i--)brkAdd(e,cr.a,cr.max);}}}}
 for(const c of S.enemies){const A=ET[c.t].aura;if(!A)continue;for(const e of S.enemies)if(Math.hypot(e.x-c.x,e.y-c.y)<=A.r){if(A.m)e.cbm=Math.max(e.cbm,A.v);else e.cb=Math.max(e.cb,A.v);}}
 S.barr=S.barr.filter(b=>(b.t-=dt)>0);S.dbl=S.dbl.filter(b=>(b.t-=dt)>0);S.tz=(S.tz||[]).filter(z=>(z.t-=dt)>0);S.bz=(S.bz||[]).filter(z=>{const ins=S.enemies.filter(e=>e.hp>0&&Math.hypot(e.x-z.x,e.y-z.y)<=z.r);for(const e of ins)slowE(e,.7,.25);z.tk-=dt;if(z.tk<=0){z.tk+=1;for(const e of ins){addBurn(e,null,3);addChill(e,null,1);}}return(z.t-=dt)>0;});S.fz=(S.fz||[]).filter(z=>{z.tk-=dt;if(z.tk<=0){z.tk+=1;for(const e of S.enemies)if(e.hp>0&&Math.hypot(e.x-z.x,e.y-z.y)<=z.r)emberBurn(e,null,z.n);}return(z.t-=dt)>0;});
 unitCombat(dt);
 for(const t of S.list){if(!t.sd)continue;for(const k in t.acd)t.acd[k]=Math.max(0,t.acd[k]-dt);
  const h=abRank(t,'heal');if(h&&t.acd.heal<=0){t.acd.heal=h.cd;for(const q of t.sd)if(q.hp>0&&q.hp<q.max)q.hp=Math.min(q.max,q.hp+q.max*h.p);S.fx.push({x:t.x,y:t.y,t:.6,m:.6,r:2*K,col:'#8ff0a0'});}}
 S.mines=S.mines.filter(m=>{if(!S.list.includes(m.src))return false;if(!S.enemies.some(e=>e.hp>0&&!isFly(e)&&Math.hypot(e.x-m.x,e.y-m.y)<=MINET))return true;
  for(const e of S.enemies)if(e.hp>0&&!isFly(e)&&Math.hypot(e.x-m.x,e.y-m.y)<=m.r)hurt(e,m.dm,m.src,'phys',m.pen);
  S.fx.push({x:m.x,y:m.y,t:.4,m:.4,r:m.r,col:'#ff9a5c'});m.src.acd.mine=15;return false;});
 for(const p of S.pools){p.tk-=dt;if(p.tk<=0){p.tk+=PTICK;for(const e of S.enemies)if(!isFly(e)&&Math.hypot(e.x-p.x,e.y-p.y)<=p.r){if(p.el==='bleed')addBleed(e,p.src,1);else if(p.el==='fire')addBurn(e,p.src,p.n);else addPois(e,p.n,p.src);}}}
 for(const e of S.enemies){
  for(const k in e.fx){const q=e.fx[k];if((q.t-=dt)<=0){delete e.fx[k];if(k==='freeze'){e.fx.fimm={t:FRZCD};if(q.src&&e.hp>0)shatter(e,q.src);}}}
  if(e.ps&&e.ps.length){let dp=0,rvw=0;for(const q of e.ps){let w=q.w;const tx=q.src&&q.src.ab&&abRank(q.src,'toxin');if(tx&&(ET[e.t].el||isBoss(e)))w*=1+tx.el;dp+=w;if(q.rv)rvw+=w;q.t-=dt;}DNK='poison';hurt(e,dp*dt,e.ps[e.ps.length-1].src,'elem');DNK=null;if(rvw)RS('venom').dmg+=rvw*dt;e.ps=e.ps.filter(q=>q.t>0);}
  if(e.bl&&e.bl.length){for(const q of e.bl)q.t-=dt;e.bl=e.bl.filter(q=>q.t>0);}
  if(e.cs&&e.cs.length){let w=0;for(const q of e.cs){q.t-=dt;w+=q.w;}const fr=chillF(e);if(e.fx.freeze&&!S.tut){recBest('zero',Math.floor(w));if(w>=30&&!S.pvE)achieve('zero');}if(fr>0){DNK='ice';hurt(e,w*CHILLD*fr*dt,e.cs[e.cs.length-1].src,'elem');DNK=null;}e.cs=e.cs.filter(q=>q.t>0);}
  if(e.bn>0){DNK='fire';hurt(e,BURND*e.bn*dt,e.bsrc,'elem');DNK=null;e.bt+=dt;while(e.bt>=1){e.bt-=1;const fu=e.bsrc&&e.bsrc.ab&&abRank(e.bsrc,'fuel');e.bn*=1-(fu?fu.d:BURNK);}if(e.bn<.3)e.bn=0;}
  if(e.ez){e.ez.t-=dt;if(e.ez.t<=0)e.ez=null;}
  if(!S.tut&&!S.pvE&&(e.bn>0||e.ps&&e.ps.length||e.bl&&e.bl.length||e.cs&&e.cs.length||e.ez)){const n=BL(e);recBest('bar',n);if(n>=5)achieve('bar');}
  if(e.mk){e.mk.t-=dt;if(e.mk.t<=0)e.mk=null;}
  const ox=e.x,oy=e.y;
  if(move(e,dt)){e.leak=true;if(e.hx>0){orbAdd(e.x,e.y,e.hx);e.hx=0;}if(rp('crystal')&&!isBoss(e)&&S.cryR!==S.round){S.cryR=S.round;RS('crystal').n++;S.fx.push({x:e.x,y:e.y,t:.6,m:.6,r:1.2*K,col:'#8fe3ff'});S.msg='💎 El Corazón de cristal ha absorbido un golpe.';}else{EKS(e.t).l++;histLeak(e.t,isBoss(e)?Math.max(S.hp,ET[e.t].dmg):ET[e.t].dmg);hpLoss(isBoss(e)?Math.max(S.hp,ET[e.t].dmg):ET[e.t].dmg,1);}if(ET[e.t].steal){const v=Math.min(S.gold,ET[e.t].steal);S.gold-=v;if(v)S.msg='Un '+ET[e.t].n+' te ha robado '+v+' de oro.';}}
  else if(e.bl&&e.bl.length){const d=Math.hypot(e.x-ox,e.y-oy);if(d>0){DNK='bleed';hurt(e,e.bl.length*BLEEDD/K*d,e.bl[e.bl.length-1].src,'elem');DNK=null;}}}
 S.enemies=S.enemies.filter(e=>!e.leak);
 const prog=e=>S.field[e.ty][e.tx]+Math.hypot(e.tx-e.x,e.ty-e.y);
 for(const t of S.list){
  const T=TW[t.type],s=stats(t);if(T.unit||T.support||T.swarm||T.custom||t.jam>0)continue;t.cd=Math.max(-.1,t.cd-dt);if(t.acd)for(const k in t.acd)t.acd[k]=Math.max(0,t.acd[k]-dt);if(t.flash&&(t.flash.t-=dt)<=0)t.flash=null;if(t.fl&&(t.fl.ttl-=dt)<=0)t.fl=null;
  let tg=alive(t.tgt||{})&&!(t.tgt.hk>0)&&Math.hypot(t.tgt.x-t.x,t.tgt.y-t.y)<=s.range&&!(typeof camoHid==='function'&&camoHid(t.tgt,t))?t.tgt:null;
  if(!tg){const md=(typeof tgtAI==='function'&&tgtAI(t,s))||TGT[t.mode]||TGT.core;let bs=0;
   for(const e of S.enemies){if(e.hk>0||Math.hypot(e.x-t.x,e.y-t.y)>s.range||(T.ground&&isFly(e))||(typeof camoHid==='function'&&camoHid(e,t)))continue;const sc=md.score(e,prog);
    if(!tg||sc>bs||(sc===bs&&prog(e)<prog(tg))){tg=e;bs=sc;}}}
  t.tgt=T.beam?tg:null;
  volcHeat(t,!!tg,dt);
  if(!tg){t.rays=null;continue;}
  abilities(t,tg,s);
  const X=tinfo(t),TT=twm(t.type,t.spec);
  if(abRank(t,'focus')){if(t.foE!==tg){t.foE=tg;t.foT=0;}else t.foT+=dt;}
  if(abRank(t,'overl')){if(t.ovE!==tg){const cv=abRank(t,'conv');t.ovT=cv&&t.ovE&&t.ovE.hp<=0?t.ovT*cv.p:0;t.ovE=tg;}else t.ovT+=dt;}
  let n=0;
  while(t.cd<=0&&n++<6){
   t.cd+=1/s.rate;if(typeof ecoShot==='function'&&ecoShot(t))t.cd-=1/s.rate;
   const crit=Math.random()<s.crit+mkB(tg),dm=s.dmg*(crit?s.critm:1),pzr=abRank(t,'poison'),pz=!!(pzr&&Math.random()<pzr.p),col=pz?'#7bd34a':T.col;
   if(X.aura){const dp=abRank(t,'deep'),bi=abRank(t,'bite');
    for(const e of S.enemies){if(e.hp<=0||Math.hypot(e.x-t.x,e.y-t.y)>s.range)continue;
     const fa=(e.fa&&S.wt-e.fa.u<1.2)?e.fa:(e.fa={s:S.wt,u:S.wt});fa.u=S.wt;const tin=S.wt-fa.s;
     hurt(e,bi&&bi.pct?dm*(1+Math.min(bi.max,bi.g*tin)):dm+(bi?Math.min(bi.max,bi.g*tin)/s.rate:0),t,'magic',s.pen);
     let m=TW.frost.slow;if(dp)m+=((1-dp.s)-m)*Math.min(1,tin/DEEPT);
     slowE(e,m,.6);}
    continue;}
   if(X.prism){const sp=abRank(t,'split'),nr=sp?sp.n:1,tr=abRank(t,'trail'),md=TGT[t.mode]||TGT.core;
    const cand=S.enemies.filter(e=>e.hp>0&&Math.hypot(e.x-t.x,e.y-t.y)<=s.range);
    cand.sort((a,b)=>md.score(b,prog)-md.score(a,prog)||prog(a)-prog(b));
    t.rays=[];for(let i=0;i<nr&&cand.length;i++)t.rays.push({e:cand[i%cand.length],el:ELEMS[i%ELEMS.length]});
    t.prt=(t.prt||0)-1/s.rate;const stk=t.prt<=0;if(stk)t.prt=1.5;
    const rf=abRank(t,'refr'),tgs=new Set(t.rays.map(r=>r.e));
    for(const r of t.rays){DNK=r.el.k==='bleed'?'bleed':'poison';hurt(r.e,dm,t,'elem');DNK=null;
     if(stk){if(r.el.k==='bleed')addBleed(r.e,t,1);else addPois(r.e,1,t);}
     if(tr){const ax=t.x,ay=t.y,bx=r.e.x-ax,by=r.e.y-ay,L2=bx*bx+by*by||1;
      for(const o of S.enemies){if(o.hp<=0||tgs.has(o))continue;const u=((o.x-ax)*bx+(o.y-ay)*by)/L2;if(u<=0||u>=1)continue;if(Math.hypot(ax+bx*u-o.x,ay+by*u-o.y)<=.5*K)hurt(o,dm*tr.p,t,'elem');}}
     if(rf&&Math.random()<rf.p){const o=S.enemies.find(o=>o!==r.e&&o.hp>0&&Math.hypot(o.x-r.e.x,o.y-r.e.y)<=2*K);
      if(o){hurt(o,dm,t,'elem');if(stk){if(r.el.k==='bleed')addBleed(o,t,1);else addPois(o,1,t);}S.fx.push({bolt:[[r.e.x,r.e.y],[o.x,o.y]],t:.15,m:.15});}}}
    continue;}
   if(T.log){logShot(t,tg,s,dm);continue;}
   if(T.wall){wallShot(t,s,prog);continue;}
   if(T.zap){zap(t,tg,s,dm*(S.dbl.some(b=>Math.hypot(t.x-b.x,t.y-b.y)<=b.r)?2:1),TT);if(crit)critMark(tg);continue;}
   if(T.burn){flameTick(t,tg,s,(crit?s.critm:1)*(S.dbl.some(b=>Math.hypot(t.x-b.x,t.y-b.y)<=b.r)?2:1),TT);if(crit)critMark(tg);continue;}
   if(T.puddle){const px=tg.tx,py=tg.ty,pz=abRank(t,'ponz');
    if(!S.pools.some(p=>p.src===t&&Math.hypot(p.x-px,p.y-py)<.8*K))S.pools.push({x:px,y:py,t:T.dur,n:dm*(pz?pz.m:1)*rateF(t,s),tk:0,src:t,r:s.area});
    break;}
   if(T.beam){sfx('beam',{r:T.orb?1:1.3});const ov=abRank(t,'overl'),mm=ov?1+Math.min(ov.max,ov.g*t.ovT):1;hurt(tg,dm*mm*(1+(T.orb?soulB(t):0))*(S.dbl.some(b=>Math.hypot(t.x-b.x,t.y-b.y)<=b.r)?2:1),t,T.dt,s.pen);onHit(tg,t);if(T.orb&&tg.hp>0)orbHit(t,tg,s,dm);if(crit)critMark(tg);if(tg.hp<=0)break;continue;}
   if(T.mag!=null){bunkerFire(t,tg,s,dm,crit);if(tg.hp<=0)break;continue;}
   if(T.augur){augurShot(t,tg,s,dm,crit,S.dbl.some(b=>Math.hypot(t.x-b.x,t.y-b.y)<=b.r)?2:1);continue;}
   if(T.cata){cataShot(t,tg,s,dm,crit,S.dbl.some(b=>Math.hypot(t.x-b.x,t.y-b.y)<=b.r)?2:1);continue;}
   // el daño, el crítico y el área se fijan al disparar; los efectos se aplican al impactar
   let nb=1;{const bu=abRank(t,'burst');if(bu){t.shc=(t.shc||0)+1;if(t.shc>=bu.n){t.shc=0;nb=bu.a;}}}
   for(let q=0,nq=(S.dbl.some(b=>Math.hypot(t.x-b.x,t.y-b.y)<=b.r)?2:1)*nb;q<nq;q++)S.proj.push({x:t.x+(nb>1?(q%3-1)*.35:0),y:t.y+(nb>1?(q%3-1)*.35:0),e:tg,tx:tg.x,ty:tg.y,vx:0,vy:0,dm:T.orb?dm*(1+soulB(t)):dm,orb:T.orb?Math.min(4,t.lvl||1):0,dt:T.dt,src:t,sp:T.ps,area:T.splash?s.area:0,slow:T.slow||0,slowt:T.slowt||SLOWT,slowA:T.slowA,pen:s.pen,col,crit,pz});
  }
 }
 S.proj=S.proj.filter(p=>{
  if(alive(p.e)){p.tx=p.e.x;p.ty=p.e.y;}
  const dx=p.tx-p.x,dy=p.ty-p.y,dd=Math.hypot(dx,dy),st=p.sp*dt;if(dd<=st&&p.crit&&alive(p.e))critMark(p.e);
  if(dd>st){p.vx=dx/dd;p.vy=dy/dd;p.x+=p.vx*st;p.y+=p.vy*st;return true;}
  p.x=p.tx;p.y=p.ty;const hit=alive(p.e),sh=abRank(p.src,'shock'),kd=sh?sh.k*K:0;
  if(hit){sfxHit(p.src,p.dt);strike(p.e,p.dm,p.src,p.dt,p.pen,p.pz);onHit(p.e,p.src);if(p.orb&&p.src&&p.src.ab)orbHit(p.src,p.e,stats(p.src),p.dm);if(p.slow)slowE(p.e,p.slow,p.slowt||SLOWT);if(kd&&p.e.hp>0&&p.area)knock(p.e,kd);}
  if(p.area){for(const e of S.enemies)if(e!==p.e&&e.hp>0&&!(p.cata&&isFly(e))&&Math.hypot(e.x-p.x,e.y-p.y)<=p.area){hurt(e,p.dm*SPLASH,p.src,p.dt,p.pen);if(p.slowA&&p.slow&&e.hp>0)slowE(e,p.slow,p.slowt||SLOWT);if(kd&&e.hp>0)knock(e,kd);}
   {const cr=p.src&&p.src.ab&&abRank(p.src,'cluster');if(cr)cluster(p,cr);}
   S.fx.push({x:p.x,y:p.y,t:.25,m:.25,r:p.area,col:p.col});}
  else if(hit)S.fx.push({x:p.x,y:p.y,t:.12,m:.12,r:.3*K,col:p.col});
  if(p.cata)cataHit(p);
  return false;});
 rollTick(dt);czTick(dt);augTick(dt);
 // Coloso · Vástagos: al perder cada 25% de su vida, un trozo se desprende y se convierte en 2 Mini-élites (los trozos salen volando hasta su sitio)
 for(const e of S.enemies.slice())if(e.t==='colossus'&&e.hp>0){e.calls=e.calls||0;
  while(e.calls<3&&e.hp<=e.max*(1-.25*(e.calls+1))){e.calls++;see('en','mini');const mh=ehpOf('mini',S.round),tr=e.trail||[];
   for(let i=0;i<2;i++){const pt=tr.length>i+1?tr[tr.length-1-i]:[e.tx,e.ty],m={t:'mini',x:pt[0],y:pt[1],tx:pt[0],ty:pt[1],trail:tr.slice(0,Math.max(0,tr.length-1-i)),hp:mh,max:mh,fx:{},src:null};
    S.enemies.push(m);S.fx.push({frag:1,x0:e.x,y0:e.y,x:pt[0],y:pt[1],t:.45,m:.45,col:ET.colossus.col,sd:Math.random()});}
   S.fx.push({x:e.x,y:e.y,t:.5,m:.5,r:1.2*K,col:'#c0304a'});}}
 wolfTick(dt);dragonAdults(dt);guildHeal(dt);furyTick();orbTick(dt);heroAbTick(dt);mechaTick(dt);achTick(dt);logTick(dt);if(typeof e2TowersTick==='function')e2TowersTick(dt);if(typeof bufoTick==='function')bufoTick(dt);
 let bossDead=false;
 S.enemies=S.enemies.filter(e=>{if(e.hp>0)return true;if(!e.leak)S.wk=(S.wk||0)+1;if(ET[e.t].el&&!e.leak&&S.relics.includes('trophy'))S.troN=Math.min(5,(S.troN||0)+1);if(!e.leak&&!S.tut&&!S.pvE){if(ET[e.t].fly){S.flyK=(S.flyK||0)+1;recBest('sky',S.flyK);if(S.flyK>=40)achieve('sky');}if(ET[e.t].el){S.eliK=(S.eliK||0)+1;recBest('hunt',S.eliK);if(S.eliK>=10)achieve('hunt');}}if(!e.leak){sfxKill(e);sfx('coin');}achDeath(e);orbDeath(e);heraldDeath(e);if(e.bn>0&&!S.tut&&!S.pvE){S.bk=(S.bk||0)+1;recBest('pyro',S.bk);if(S.bk>=100)achieve('pyro');}plague(e);epidemic(e);burnSpread(e);
  {const gb=killGoldF(e.t),g1=rndG(gb*(e.src&&e.src.type&&TW[e.src.type]&&TW[e.src.type].guild?1.25:1)),g2=e.src?rndG(gb*stats(e.src).gold):0,g3=rp('coin')?rndG(gb*.5):0;S.gold+=g1+g2+g3;mimFeed(e);if(e.src&&TW[e.src.type]&&TW[e.src.type].glut)glutEat(e.src);if(e.wanted){S.gold+=200;if(S.st)S.st.gEv+=200;S.msg='¡Encargo cumplido! +200 🪙 y una reliquia.';setTimeout(()=>openRelic(),0);}if(S.st){S.st.gKill+=g1;S.st.gTile+=g2;S.st.gRel+=g3;S.st.kills++;{const q=EKS(e.t);q.k++;q.g+=g1+g2+g3;}if(e.src)e.src.kills=(e.src.kills||0)+1;}}
  // experiencia del héroe: si el golpe final es suyo, la experiencia entera le llega directa; si es de otro, recibe directa la parte del daño que hizo y cae una bola del 40 % del resto que recoge al acercarse
  {const X=ET[e.t].xp||1,nb=(S.nbR===S.round&&!S.pvH?1:0);if(e.src&&e.src.hero)orbAdd(e.x,e.y,X+nb);else{/* contribución: la parte del daño que hizo el héroe le llega directa; del resto, bola del 40 % en el suelo */const hx=Math.min(X,e.hx||0);if(hx>0)orbAdd(e.x,e.y,hx);orbGround(e.x,e.y,hx>0?(X-hx)*.4:Math.max(1,X*.4));if(nb)orbAdd(e.x,e.y,nb);}}
  if(isBoss(e)&&S.round===ROUNDS&&!S.tut)bossDead=true;
  if(e.t==='boss'&&S.round===15&&ROUNDS>15){const before=S.rc||0;S.rc=Math.min(3,before+2);if(S.rc>before)S.msg='¡Jefe derrotado! Recuperas '+(S.rc-before)+' carga'+(S.rc-before===1?'':'s')+' de Reintentar.';}
  return false;});
 if(S.hp<=0&&S.tut&&tutRetry())return;
 if(S.hp<=0){S.hp=0;S.phase='lost';S.proj=[];S.fx=[];S.msg='El núcleo ha caído.';ui();endGame();return;}
 if(bossDead){S.phase='won';S.proj=[];S.fx=[];S.msg='¡Jefe derrotado! Has completado la expedición.';ui();endGame();return;}
 if(!S.portals.some(p=>p.q.length)&&!S.enemies.length){if(S.gorbs&&S.gorbs.length){(S.orbs=S.orbs||[]).push(...S.gorbs.map(o=>({x:o.x,y:o.y,v:o.v,t:0})));S.gorbs=[];}if(!S.hero||S.hero.s.hp<=0)orbFlush();if(S.relics.includes('notebook')&&S.hp>=(S.hpW||0))S.nbN=Math.min(10,(S.nbN||0)+1);}
 if(!S.portals.some(p=>p.q.length)&&!S.enemies.length&&S.tut&&S.round>=ROUNDS){tutEnd();return;}
 if(!S.portals.some(p=>p.q.length)&&!S.enemies.length){tutPhase('end');S.gold+=50+S.round*10;if(S.st)S.st.gRound+=50+S.round*10;roundRewards();S.pools=[];S.mines=[];S.cz=[];S.rolls=[];if(S.uq&&S.uq.length){S.phase='reward';S.uqNR=1;startUPlace();}else{nextRound();dragonGrow();}}
}
