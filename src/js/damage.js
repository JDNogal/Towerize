// Efectos de control: los jefes reducen un 50% su fuerza (ralentización), duración (congelación) o distancia (empuje).
const isBoss=e=>e.t==='boss'||e.t==='colossus'||e.t==='bob'||!!(ET[e.t]&&ET[e.t].story),udM=e=>isBoss(e)?(ROUNDS>=26?1+.1*S.round:1)*(1+Math.max(0,(e.blk||0)-BLKT0)*BLKUP):1;
// v307 · un jefe al que tus unidades tienen parado se enfurece: pasados 8 s seguidos bloqueado, pega un 15 % más a las unidades por cada segundo (se le pasa al volver a andar). Así no se le puede retener para siempre.
const BLKT0=8,BLKUP=.15;
function slowE(e,m,t){if(e.fx.freeze)return;if(isBoss(e))m=1-(1-m)*BOSSRES;const q=e.fx.slow;e.fx.slow={m:q&&q.t>0?Math.min(q.m,m):m,t};}
function freezeE(e,t){if(e.fx.freeze||e.fx.fimm)return false;e.fx.freeze={t:(isBoss(e)?t*BOSSRES:t)*(e.fx.wet?WETF:1)};delete e.fx.slow;return true;}
function addBleed(e,src,n){e.bl=e.bl||[];const c=stkN(e,n||1);for(let i=0;i<c;i++)e.bl.push({t:BLEEDT,src});}
// resistencia al control: cada empujón o aturdimiento seguido sobre el mismo enemigo rinde menos (−25% por golpe, hasta −75%) y se recupera en unos segundos
const CCSTEP=.25,CCMAX=.75,CCREC=.3;// jefes: tres empujones seguidos, cada uno más flojo; después no les afectan durante 8 s y siguen andando
const KBBF=[1,.65,.3],KBBI=8;function kbBoss(e){const now=S.wt||0;if(e.kbI>now)return 0;if(now-(e.kbL!=null?e.kbL:-99)>4)e.kbC=0;e.kbL=now;const f=KBBF[e.kbC||0];e.kbC=(e.kbC||0)+1;if(e.kbC>=KBBF.length){e.kbC=0;e.kbI=now+KBBI;}return f;}
function ccRes(e,k){const now=S.wt||0,r=Math.max(0,(e[k]||0)-((now-(e[k+'t']||now))*CCREC));const m=1-r;e[k]=Math.min(CCMAX,r+CCSTEP);e[k+'t']=now;return m;}
function knock(e,d){if(e.anch||(e.t==='argos'&&e.sh))return;if(isBoss(e)){const f=kbBoss(e);if(!f)return;d*=BOSSRES*f;}else d*=ccRes(e,'kbR');e.fsp=0;const tr=e.trail;if(!tr)return;
 while(d>1e-6&&tr.length){const p=tr[tr.length-1],dx=p[0]-e.x,dy=p[1]-e.y,dd=Math.hypot(dx,dy);
  if(dd>d){e.x+=dx/dd*d;e.y+=dy/dd*d;return;}
  e.x=p[0];e.y=p[1];d-=dd;e.tx=p[0];e.ty=p[1];tr.pop();e.pv=tr.length?tr[tr.length-1]:null;}}
function plague(e){if(!e.ps||!e.ps.length)return;const by=new Map();
 for(const q of e.ps){if(!(q.src&&q.src.ab&&abRank(q.src,'plague')))continue;if(!by.has(q.src))by.set(q.src,[]);by.get(q.src).push(q);}
 for(const[src,arr]of by){const r=abRank(src,'plague'),n=Math.round(arr.length*r.p);
  const near=S.enemies.filter(o=>o!==e&&o.hp>0&&Math.hypot(o.x-e.x,o.y-e.y)<=2*K).sort((a,b)=>Math.hypot(a.x-e.x,a.y-e.y)-Math.hypot(b.x-e.x,b.y-e.y)).slice(0,2);
  if(!near.length)continue;
  for(let i=0;i<n;i++){const o=near[i%near.length];(o.ps=o.ps||[]).push({w:arr[i].w,t:arr[i].t,src});}}}
const armorOf=(e,ty)=>e.fx&&e.fx.poly?0:ty==='phys'?Math.max(-MAXPEN,(e.apx!=null?e.apx:(ET[e.t].ap||0))+(e.cb||0)-(e.cor||0)-brkOf(e)):ty==='magic'?Math.max(-MAXPEN,(e.amx!=null?e.amx:(ET[e.t].am||0))+(e.cbm||0)-(e.cor||0)):0;
// Penetración plana: resta armadura (puede quedar negativa, mínimo -MAXPEN => máximo x2 de daño). El daño elemental ignora armadura y penetración.
let TZX=0;const TZR=4*K;
// ---- números de daño: se suman por enemigo y tipo mientras sigan llegando golpes ----
const DNC={taken:'#ff8a7a',phys:'#f2efe6',magic:'#a3adff',ice:'#9fe4ff',poison:'#5fdc7a',fire:'#ff7a3c',elec:'#ffe14d',bleed:'#ff5a64',elem:'#4fd6b8'};
let DNK=null,DNF=0;
const dnKey=(src,ty)=>{if(DNK)return DNK;if(ty==='magic')return src&&src.type==='frost'?'ice':'magic';if(ty!=='elem')return 'phys';const T=src&&src.type;return T==='poison'?'poison':T==='flame'||T==='sala'?'fire':T==='tesla'||T==='augur'?'elec':'elem';};
function dnAdd(e,v,key){if(!OPT.dnum||!S.dn)return;e.dnm=e.dnm||{};let d=e.dnm[key];
 if(!d||d.idle>.6){d={e,key,x:e.x,y:e.y,r:e.t&&ET[e.t]?ET[e.t].r:.85,u:!e.t,v:0,sh:0,age:0,idle:0,crit:0,i:Object.keys(e.dnm).length%3};e.dnm[key]=d;S.dn.push(d);}
 d.v+=v;d.idle=0;if(e.crF!==undefined&&DNF-e.crF<=1&&(key==='phys'||key==='magic'||key==='ice'))d.crit=.7;}
function dnTick(dt){if(!S.dn)return;for(const d of S.dn){d.age+=dt;d.idle+=dt;if(d.crit>0)d.crit-=dt;if(d.e.hp>0&&(d.u||S.enemies.includes(d.e))){d.x=d.e.x;d.y=d.e.y;}d.sh+=(d.v-d.sh)*Math.min(1,dt*9);}
 S.dn=S.dn.filter(d=>d.idle<1.1);}
const fmtD=n=>{n=Math.round(n);if(OPT.dsci&&n>=1e6){const s=n.toExponential(2).split('e+');return s[0].replace('.',',')+'e'+s[1];}
 if(OPT.dabbr&&n>=1000){const u=['K','M','B','T','Qa','Qi'];let i=-1,v=n;while(v>=1000&&i<u.length-1){v/=1000;i++;}return String(+v.toFixed(v<10?2:v<100?1:0)).replace('.',',')+u[i];}
 return String(n).replace(/\B(?=(\d{3})+(?!\d))/g,'.');};
const hurt=(e,a,src,ty,pen)=>{if(e.hk>0&&!(typeof HKD!=='undefined'&&HKD))return 0;if(typeof eHurtMod==='function'){a=eHurtMod(e,a,src,ty);if(!(a>0))return 0;}if(e.fx&&e.fx.wet&&src&&(src.type==='augur'||src.type==='tesla'))a*=1+e.fx.wet.m;if(ty==='magic'&&e.fx&&e.fx.hex)a*=1+e.fx.hex.m;if(S.fury)a*=furyM();if(ET[e.t].fly&&rp('harpoon'))a*=1.25;if(e.prey>0)a*=1.15;if(typeof e2DmgM==='function')a*=e2DmgM(e,src,ty);if(src&&S.faros&&S.faros.length&&!src.hero)faroFeed(src,Math.min(Math.max(e.hp,0),a));if(ty==='phys'&&src&&src.ab&&src.ab.hollow)a*=1+abRank(src,'hollow').p*Math.max(0,armorOf(e,'phys'));const A=ty==='elem'?0:Math.max(-MAXPEN,armorOf(e,ty)-(pen||0)),m=1-A/(A+ARM_K);if(src&&src.hero&&src.hero.s&&S.phase==='wave')src.hero.s.la=S.wt;if(src&&src.hero&&e.hp>0)e.hx=(e.hx||0)+ET[e.t].xp*Math.min(e.hp,a*m)/e.max;if(src&&!src.hero){if(ty==='phys')e.ph=1;else if(ty==='magic')e.mh=1;}const dl=Math.min(Math.max(e.hp,0),a*m);e.hp-=a*m;if(src)e.src=src;e.kdn=DNK;if(S.tut&&src&&src.id)(e.hb=e.hb||{})[src.id]=S.wt;if(dl>0&&S.dn)dnAdd(e,dl,dnKey(src,ty));if(dl>0&&src&&typeof onDmg==='function')onDmg(e,dl,src,ty);if(S.st&&dl>0){S.st.dmg+=dl;if(src){src.dmgT=(src.dmgT||0)+dl;relDmg(src,dl);}}
 if(!TZX&&S.tz&&S.tz.length&&S.tz.some(z=>Math.hypot(e.x-z.x,e.y-z.y)<=z.r)){TZX=1;const d0=S.st?S.st.dmg:0;hurt(e,a*.25,src,'magic',0);if(S.st)RS('tome').dmg+=S.st.dmg-d0;TZX=0;}
 return m;};
function pierceChain(e,raw,t,ty,pen,R){
 const seen=[e];let cur=e;
 for(let i=0;i<12&&raw>.05;i++){let nx=null,nd=R;
  for(const o of S.enemies){if(o.hp<=0||seen.includes(o))continue;const d=Math.hypot(o.x-cur.x,o.y-cur.y);if(d<=nd){nd=d;nx=o;}}
  if(!nx)break;const m=hurt(nx,raw,t,ty,pen);seen.push(nx);S.fx.push({x:nx.x,y:nx.y,t:.2,m:.2,r:.4*K,col:'#c9783a'});
  if(nx.hp>0)break;raw=-nx.hp/m;cur=nx;}
}
// Contraste (Piedra del equilibrio): con quemadura e hipotermia a la vez, +25% de stacks de cualquier estado
const stkM=e=>(S.relics&&rp('balance')&&e.bn>0&&e.cs&&e.cs.length?1.25:1)*(typeof stkX==='function'?stkX(e):1),stkN=(e,n)=>{const v=n*stkM(e),b=Math.floor(v);return b+(Math.random()<v-b?1:0);};
// Choque térmico (Yrsa Nv 4): +50% de stacks de quemadura a enemigos ralentizados o parados
const thermM=e=>S.hero&&S.hero.id==='yrsa'&&S.hero.lvl>=4&&(e.stopped||e.fx.freeze||e.fx.stun||e.fx.root||e.fx.slow)?1.5:1;
function addBurn(e,src,n){n*=stkM(e)*thermM(e);if(!(e.bn>0)){e.bn=0;e.bt=0;}e.bn+=n;e.bsrc=src;}
// Hipotermia: lo contrario del sangrado; daña según lo frenado que esté el enemigo
const CHILLD=3,CHILLT=4;
const chillF=e=>e.fx.freeze||e.fx.stun||e.fx.root||e.stopped?1:e.fx.slow?Math.max(0,1-e.fx.slow.m):0;
function addChill(e,src,n){n*=stkM(e);(e.cs=e.cs||[]).push({t:CHILLT,src,w:n});}
function stunE(e,t){if(e.fx.freeze)return;if(isBoss(e))t*=BOSSRES;t*=ccRes(e,'stR');e.fx.stun={t:Math.max(t,e.fx.stun?e.fx.stun.t:0)};}
function zap(t,tg,s,dm,TT,big){
 const ch=TT.chain,ez=TT.ez,cd=abRank(t,'cond'),ds=abRank(t,'disch'),list=[tg],pts=[[t.x,t.y]];
 if(ch){let cur=tg;const U=[tg];let pos=0,dir=1;for(let i=0;i<ch.n+(cd?cd.n:0);i++){let nx=null,nd=ZAPR;
   for(const o of S.enemies){if(o.hp<=0||U.includes(o))continue;const d=Math.hypot(o.x-cur.x,o.y-cur.y);if(d<=nd){nd=d;nx=o;}}
   if(nx){U.push(nx);pos=U.length-1;dir=1;}
   else if(cd&&U.length>1){if(pos+dir<0||pos+dir>=U.length)dir=-dir;pos+=dir;nx=U[pos];if(!(nx.hp>0)||Math.hypot(nx.x-cur.x,nx.y-cur.y)>ZAPR*1.5)break;}
   else break;
   list.push(nx);cur=nx;}
  if(cd&&list.length>1&&list[list.length-1]===list[0]&&!S.tut&&!S.pvE){recBest('circuit',U.length);if(U.length>=3)achieve('circuit');}}
 list.forEach((e,i)=>{pts.push([e.x,e.y]);
  let d=dm*(ch?Math.pow(ch.f,i):1);if(ez)d*=1+EZAMP*(e.ez?e.ez.n:0);
  hurt(e,d,t,'elem');
  if(ez){const ac=abRank(t,'accum'),rs=abRank(t,'reson'),cc=abRank(t,'short'),q=e.ez||(e.ez={n:0,t:0});
   q.n=Math.min(EZMAX,q.n+(ac?ac.n:1)*stkM(e));q.t=rs?rs.t:4;
   if(cc&&q.n>=EZMAX){hurt(e,dm*cc.m,t,'elem');e.ez=null;S.fx.push({x:e.x,y:e.y,t:.4,m:.4,r:.7*K,col:'#ffe97a'});}}
  if(ds&&Math.random()<ds.p)stunE(e,STUNT);});
 S.fx.push({bolt:pts,t:.18,m:.18,big});
}
// Corazón Volcánico: el Calor sube disparando (8 s) y baja sin objetivo (4 s; Brasas internas lo frena)
const HEATUP=8,HEATDN=4;
function volcHeat(t,has,dt){if(t.spec!=='volc')return;const eb=abRank(t,'embr');t.heat=Math.max(0,Math.min(1,(t.heat||0)+(has?dt/HEATUP:-dt/HEATDN*(eb?eb.k:1))));
 t.erT=Math.max(0,(t.erT||0)-dt);const er=abRank(t,'erupt');if(er&&t.heat>=1&&t.erT<=0){t.erT=er.cd;for(const e of S.enemies)if(e.hp>0&&Math.hypot(e.x-t.x,e.y-t.y)<=er.r*K)addBurn(e,t,er.b);S.fx.push({x:t.x,y:t.y,t:.6,m:.6,r:er.r*K,col:'#ff6a2e'});}}
function flameTick(t,tg,s,cm,TT){
 const ht=t.spec==='volc'?(t.heat||0):0,fr=ht&&abRank(t,'flare');if(ht){TT={...TT,cone:60+50*ht};cm*=1+.5*ht;if(fr)s={...s,range:s.range+fr.g*K*ht};}
 const one=!TT.cone,ang=Math.atan2(tg.y-t.y,tg.x-t.x),half=(TT.cone||0)*Math.PI/360,
  it=abRank(t,'intens'),fo=abRank(t,'focus'),nap=abRank(t,'napalm'),det=abRank(t,'deton'),
  n=s.dmg*cm*(1+(it?it.p:0))*(fo?1+Math.min(fo.max,fo.g*(t.foT||0)):1);
 t.fl={a:ang,h:one?.07:half,len:s.range,one,ttl:1/s.rate+.08};
 for(const e of S.enemies){if(e.hp<=0)continue;
  if(e!==tg){if(one)continue;const dx=e.x-t.x,dy=e.y-t.y;if(Math.hypot(dx,dy)>s.range)continue;let da=Math.abs(Math.atan2(dy,dx)-ang);if(da>Math.PI)da=2*Math.PI-da;if(da>half)continue;}
  addBurn(e,t,n);
  if(nap&&!S.pools.some(p=>p.src===t&&p.el==='fire'&&Math.hypot(p.x-e.x,p.y-e.y)<.8*K))S.pools.push({x:e.x,y:e.y,t:nap.t,n:1,tk:0,src:t,r:.6*K,el:'fire'});}
 if(t.spec==='forge'&&tg.hp>0){const per=1/s.rate,ml=abRank(t,'melt'),bl=abRank(t,'blue'),bt=abRank(t,'sbite');
  if(ml&&tg.bn>=ml.th){t.mlT=(t.mlT||0)+per;while(t.mlT>=1){t.mlT-=1;brkAdd(tg,ml.a,ml.max);}}
  if(bl&&tg.bn>=bl.th){hurt(tg,tg.bn*BURND*bl.p*per,t,'magic',s.pen);t.blue=1;}else t.blue=0;
  if(bt){t.btT=(t.btT||0)+per;if(t.btT>=bt.cd){t.btT=0;hurt(tg,n*bt.m,t,'phys',0);S.fx.push({x:tg.x,y:tg.y,t:.3,m:.3,r:.5*K,col:'#ffd27a'});}}}
 if(det&&tg.bn>=det.th){const dmg=tg.bn*BURND*.5;for(const o of S.enemies)if(o.hp>0&&Math.hypot(o.x-tg.x,o.y-tg.y)<=det.r*K)hurt(o,dmg,t,'elem');tg.bn*=.5;S.fx.push({x:tg.x,y:tg.y,t:.45,m:.45,r:det.r*K,col:'#ff8a3c'});}
}
function burnSpread(e){if(!(e.bn>0)||!e.bsrc||!e.bsrc.ab)return;const r=abRank(e.bsrc,'embers');if(!r)return;
 const near=S.enemies.filter(o=>o!==e&&o.hp>0&&Math.hypot(o.x-e.x,o.y-e.y)<=2*K).sort((a,b)=>Math.hypot(a.x-e.x,a.y-e.y)-Math.hypot(b.x-e.x,b.y-e.y)).slice(0,2);
 for(const o of near)addBurn(o,e.bsrc,e.bn*r.p/near.length);}
// Fragilidad: el enemigo congelado estalla en escarcha al descongelarse
function shatter(e,t){const r=abRank(t,'shatter');if(!r||!S.list.includes(t))return;const dm=stats(t).dmg*r.m;
 for(const o of S.enemies)if(o.hp>0&&Math.hypot(o.x-e.x,o.y-e.y)<=K)hurt(o,dm,t,'magic',stats(t).pen);S.fx.push({x:e.x,y:e.y,t:.45,m:.45,r:K,col:'#bfefff'});}
// Racimo: bombas pequeñas alrededor de la explosión
function cluster(p,r){for(let i=0;i<r.n;i++){const a=Math.random()*6.283,d=K*(.4+.6*Math.random()),x=p.x+Math.cos(a)*d,y=p.y+Math.sin(a)*d;
  for(const e of S.enemies)if(e.hp>0&&Math.hypot(e.x-x,e.y-y)<=.5*K)hurt(e,p.dm*.25,p.src,p.dt,p.pen);S.fx.push({x,y,t:.3,m:.3,r:.5*K,col:'#ffb070'});}}
// Epidemia: el enemigo envenenado explota al morir con parte del veneno restante de cada torre que la tenga
function epidemic(e){if(!e.ps||!e.ps.length)return;const by=new Map();
 for(const q of e.ps){if(!(q.src&&q.src.ab&&abRank(q.src,'epid')))continue;by.set(q.src,(by.get(q.src)||0)+q.w*q.t);}
 for(const[src,rest]of by){const dm=rest*abRank(src,'epid').p;DNK='poison';for(const o of S.enemies)if(o!==e&&o.hp>0&&Math.hypot(o.x-e.x,o.y-e.y)<=1.5*K)hurt(o,dm,src,'elem');DNK=null;S.fx.push({x:e.x,y:e.y,t:.45,m:.45,r:1.5*K,col:'#9be15d'});}}
// Aura sagrada: bonus de armadura/resistencia para una unidad según las banderas de Paladines cercanas
function auraAP(s){let b=0;for(const t of S.list){const r=t.flag&&abRank(t,'sacred');if(r&&Math.hypot(s.x-t.flag.x,s.y-t.flag.y)<=2*K)b=Math.max(b,r.a);}return b;}
function critMark(e){e.crF=DNF;S.fx.push({x:e.x,y:e.y,t:.6,m:.6,mk:1});}
function strike(e,dm,t,ty,pen,pz){
 const m=hurt(e,dm,t,ty,pen);
 if(t.ab){const pr=abRank(t,'poison');if(pr&&(pz===undefined?Math.random()<pr.p:pz))addPois(e,1,t);
  const sh=abRank(t,'shrap');if(sh&&Math.random()<sh.p)addBleed(e,t,1);
  const fz=abRank(t,'frzh');if(fz&&Math.random()<fz.p&&freezeE(e,1))e.fx.freeze.src=t;
  const mr=abRank(t,'mark');if(mr&&e.hp>0)e.mk={t:4,cr:Math.max(mr.cr,e.mk&&e.mk.t>0?e.mk.cr:0)};
  const pc=abRank(t,'pierce');if(pc&&e.hp<=0)pierceChain(e,-e.hp/m,t,ty,pen,pc.r*K);}
 return m;
}
function abilities(t,tg,s){
 if(!t.ab)return;
 const r1=abRank(t,'rain');
 if(r1&&(t.acd.rain||0)<=0){t.acd.rain=r1.cd;S.rain.push({src:t,x:tg.x,y:tg.y,r:r1.r*K,left:r1.n,tk:0,dm:s.dmg*RAINP,pen:s.pen});S.fx.push({x:tg.x,y:tg.y,t:1.2,m:1.2,r:r1.r*K,col:'#f0c46a'});}
 const r2=abRank(t,'charged');
 if(r2&&(t.acd.charged||0)<=0){let be=null;for(const e of S.enemies)if(e.hp>0&&Math.hypot(e.x-t.x,e.y-t.y)<=s.range&&(!be||e.hp>be.hp))be=e;
  if(be){t.acd.charged=r2.cd;const E=ET[be.t];let dmg=be.hp+1;if(isBoss(be))dmg=be.max*r2.boss;else if(E.el)dmg=be.max*r2.el;
   be.hp-=dmg;be.src=t;t.flash={x:be.x,y:be.y,t:.35};S.fx.push({x:be.x,y:be.y,t:.4,m:.4,r:.9*K,col:'#ffffff'});}}
 const rdy=id=>(t.acd[id]||0)<=0,r3=abRank(t,'bombard');
 if(r3&&rdy('bombard')){t.acd.bombard=r3.cd;S.rain.push({src:t,x:tg.x,y:tg.y,r:r3.r*K,left:r3.n,tk:0,dm:s.dmg*RAINP,pen:s.pen,ar:.6*K,af:SPLASH,col:'#ff6a2e',burn:r3.b});S.fx.push({x:tg.x,y:tg.y,t:1.2,m:1.2,r:r3.r*K,col:'#e07a3d'});}
 const ra=abRank(t,'aval');
 if(ra&&rdy('aval')&&inb(tg.tx,tg.ty)){t.acd.aval=ra.cd;const c=tg.pv||[tg.tx,tg.ty];rollStart(t,tg.x,tg.y,c[0],c[1],true);S.fx.push({x:tg.x,y:tg.y,t:.5,m:.5,r:.9*K,col:'#b0a48c'});}
 const r4=abRank(t,'mine');
 if(r4&&rdy('mine')&&!S.mines.some(m=>m.src===t))S.mines.push({src:t,x:tg.tx,y:tg.ty,r:r4.r*K,dm:s.dmg*r4.dm,pen:s.pen});
 const r5=abRank(t,'icicle');
 if(r5&&rdy('icicle')){t.acd.icicle=r5.cd;S.rain.push({src:t,x:tg.x,y:tg.y,r:r5.r*K,left:r5.n,tk:0,dm:s.dmg*ICEM,pen:s.pen,ty:'magic',ar:r5.a*K,af:1,slow:TW.frost.slow,col:'#9fdcff'});S.fx.push({x:tg.x,y:tg.y,t:1.2,m:1.2,r:r5.r*K,col:'#9fdcff'});}
 const r7=abRank(t,'storm');
 if(r7&&rdy('storm')){let be=null;for(const e of S.enemies)if(e.hp>0&&Math.hypot(e.x-t.x,e.y-t.y)<=s.range&&(!be||e.hp>be.hp))be=e;
  if(be){t.acd.storm=r7.cd;zap(t,be,s,s.dmg*r7.m,twm(t.type,t.spec),1);}}
 const r8=abRank(t,'flask');
 if(r8&&rdy('flask')){let be=null,bn=0;for(const e of S.enemies){if(e.hp<=0||Math.hypot(e.x-t.x,e.y-t.y)>s.range)continue;let n=0;for(const o of S.enemies)if(o.hp>0&&Math.hypot(o.x-e.x,o.y-e.y)<=s.area)n++;if(n>bn){bn=n;be=e;}}
  if(be){t.acd.flask=r8.cd;const pz=abRank(t,'ponz');S.pools.push({x:be.tx,y:be.ty,t:4,n:s.dmg*(pz?pz.m:1)*rateF(t,s),tk:0,src:t,r:s.area});S.fx.push({x:be.x,y:be.y,t:.5,m:.5,r:s.area,col:'#7bd34a'});}}
 const r6=abRank(t,'blizz');
 if(r6&&rdy('blizz')){t.acd.blizz=r6.cd;let n=0;for(const e of S.enemies)if(e.hp>0&&Math.hypot(e.x-t.x,e.y-t.y)<=s.range&&freezeE(e,r6.d))n++;S.fx.push({x:t.x,y:t.y,t:.6,m:.6,r:s.range,col:'#cdf2ff'});}
}



