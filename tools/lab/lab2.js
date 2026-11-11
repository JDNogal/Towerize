// Laboratorio de torres v2: una torre sola (o varias copias) contra una oleada real alta, en una casilla normal, especial o súper.
// Mide daño, bajas, fugas, cuánto tiempo pasan parados los enemigos, la parada seguida más larga y a qué velocidad avanzan de verdad.
(function(){
const TILES=['','rng','pow','spd','gold','aoe','rng+','pow+','spd+','gold+','aoe+'];
function setup(){startGame(15);S.chests={};S.evts={};chooseHero('reinhart');if(typeof DLG!=='undefined'&&DLG.on)try{dlgEnd();}catch(e){}S.hero.s.hp=-1;S.hero.s.rt=1e9;S.revAt=0;RL.open=false;if(typeof HQ!=='undefined'){HQ.q=[];if(HQ.cur)try{hintClose();}catch(e){}}
 const place=()=>{for(let pi=0;pi<S.offers.length;pi++){let ok=false;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,S.offers[pi].p)===0){S.pi=pi;placePiece(bx,by);ok=true;}if(!ok)rotO(S.offers[pi]);}if(ok)return true;}return false;};
 for(let i=0;i<6;i++){place();RL.open=false;S.gold+=100;nextRound();}
 place();/* la última pieza deja los portales y el campo listos */
 S.hero.s.hp=-1;S.hero.s.rt=1e9;S.hero.s.en=null;S.hero.s.fight=false;/* el héroe no participa (nextRound lo había revivido) */
 RL.open=false;S.phase='build';S.deck=Object.keys(TW).filter(k=>!TW[k].uniq);S.relics=[];}
// solares ordenados por cuántas casillas de camino caen dentro del rango
function spots(rg,n){const a=[];for(let ky=0;ky<NC;ky++)for(let kx=0;kx<NC;kx++){if(S.cc[ky][kx]!==1)continue;const x=kx*K+1,y=ky*K+1;if(S.occ[x+','+y])continue;let c=0;const r=Math.ceil(rg);for(let yy=y-r;yy<=y+r;yy++)for(let xx=x-r;xx<=x+r;xx++)if(inb(xx,yy)&&S.cells[yy][xx]===2&&S.field&&S.field[yy]&&S.field[yy][xx]<1e9&&Math.hypot(xx-x,yy-y)<=rg*.85)c++;a.push({x,y,n:c});}
 a.sort((p,q)=>q.n-p.n);return a.slice(0,n);}
function buildOne(type,lvl,spec,abMax,tile,q){S.gold=1e9;S.tsel=type;build(q.x,q.y);const t=S.list[S.list.length-1];if(!t||t.type!==type)return null;
 if(tile)S.buff[q.y][q.x]=tile;
 while(t.lvl<Math.min(3,lvl))upgrade(t);
 if(lvl>=4&&spec&&SPECS[type]&&SPECS[type][spec]){chooseSpec(t,spec);if(abMax)for(let pass=0;pass<3;pass++)for(const id of SPECS[type][spec].ab)while((t.ab[id]||0)<AB[id].ranks.length&&!abReq(t,id))buyAb(t,id);}
 return t;}
window.LAB2={TILES,
 // Jefe final contra una sola torre: la torre (con su especialización y habilidades al máximo) en el solar que más camino cubre (suele ser una curva),
 // el jefe sale por el portal cuyo camino pasa más por su alcance, en la última ronda (con su vida de jefe final). ¿Lo mata ella sola?
 boss(job){const {type,lvl,spec,abMax,tile}=job;
  {let a=(job.seed||12345)>>>0;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
  if(typeof ERA!=='undefined')ERA=job.era||1;
  setup();S.field=field();
  const R=TW[type].range*(lvMods(type,lvl,spec).range||1)*(tile&&BF[tile]?(BF[tile].rg||1):1);
  const sp=spots(R,1);if(!sp.length)return{...job,err:'sin solar'};const t=buildOne(type,lvl,spec,abMax,tile,sp[0]);if(!t)return{...job,err:'no se construye'};
  S.round=ROUNDS;S.phase='build';S.tsel=null;S.selT=null;S.hp=1e6;makePortals(null);S.phase='build';startWave();if(S.phase!=='wave')return{...job,err:'no arranca la oleada ('+S.phase+')'};
  for(const p of S.portals){p.q.length=0;if(p.qf)p.qf.length=0;}for(const e of S.enemies)e.hp=0;S.enemies.length=0;
  const rg=stats(t).range,F=S.field;let bp=S.portals[0],bn=-1;
  for(const p of S.portals){let x=Math.round(p.x),y=Math.round(p.y),n=0,g=0;
   if(!(inb(x,y)&&F[y]&&F[y][x]<1e9)&&p.dir){x+=p.dir[0];y+=p.dir[1];}
   while(g++<3000&&inb(x,y)){if(Math.hypot(x-t.x,y-t.y)<=rg)n++;const f=F[y][x];if(!(f<1e9)||f<=0)break;let b=null,bf=f;for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const xx=x+dx,yy=y+dy;if(!inb(xx,yy))continue;const ff=F[yy][xx];if(ff<bf){bf=ff;b=[xx,yy];}}if(!b)break;x=b[0];y=b[1];}
   if(n>bn){bn=n;bp=p;}}
  const n0=S.enemies.length;spawnEnemy(job.boss,bp);const e=S.enemies.slice(n0).find(x=>x.t===job.boss)||S.enemies[n0];const max=e.max;const hp0=S.hp;
  let time=0,inR=0,minHp=e.hp;const dt=.05,cap=job.maxT||240;
  while(time<cap&&e.hp>0&&S.enemies.includes(e)){update(dt);time+=dt;{const c=TW[type].unit&&t.flag?t.flag:t;if(Math.hypot(e.x-c.x,e.y-c.y)<=stats(t).range)inR+=dt;}minHp=Math.min(minHp,e.hp);}
  const killed=e.hp<=0;
  return{...job,ok:1,bossMode:1,killed,time:+time.toFixed(1),inRangeS:+inR.toFixed(1),bossHp:Math.round(max),hpLeftPct:killed?0:Math.round(100*Math.max(0,e.hp)/max),minHpPct:Math.round(100*Math.max(0,minHp)/max),pathCells:bn,capped:!killed&&S.enemies.includes(e)&&e.hp>0};},

 // Grupo a medida contra una sola torre: job.mobs=[tipos…] salen por el portal que más pasa por el alcance, uno cada job.gap s, con la vida de job.round.
 // Sirve para «oleada solo de élites» y «un objetivo duro». Mide cuántos mueren, la vida que les queda de media y lo que tarda.
 mobs(job){const {type,lvl,spec,abMax,tile}=job;
  {let a=(job.seed||12345)>>>0;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
  if(typeof ERA!=='undefined')ERA=job.era||1;
  setup();S.field=field();
  const R=TW[type].range*(lvMods(type,lvl,spec).range||1)*(tile&&BF[tile]?(BF[tile].rg||1):1);
  const sp=spots(R,1);if(!sp.length)return{...job,err:'sin solar'};const t=buildOne(type,lvl,spec,abMax,tile,sp[0]);if(!t)return{...job,err:'no se construye'};
  S.round=job.round||20;S.phase='build';S.tsel=null;S.selT=null;S.hp=1e6;makePortals(null);S.phase='build';startWave();if(S.phase!=='wave')return{...job,err:'no arranca'};
  for(const p of S.portals){p.q.length=0;if(p.qf)p.qf.length=0;}for(const e of S.enemies)e.hp=0;S.enemies.length=0;
  const rg=stats(t).range,F=S.field;let bp=S.portals[0],bn=-1;
  for(const p of S.portals){let x=Math.round(p.x),y=Math.round(p.y),n=0,g=0;if(!(inb(x,y)&&F[y]&&F[y][x]<1e9)&&p.dir){x+=p.dir[0];y+=p.dir[1];}
   while(g++<3000&&inb(x,y)){if(Math.hypot(x-t.x,y-t.y)<=rg)n++;const f=F[y][x];if(!(f<1e9)||f<=0)break;let b=null,bf=f;for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const xx=x+dx,yy=y+dy;if(!inb(xx,yy))continue;const ff=F[yy][xx];if(ff<bf){bf=ff;b=[xx,yy];}}if(!b)break;x=b[0];y=b[1];}
   if(n>bn){bn=n;bp=p;}}
  const _nr=window.__nr||(window.__nr=nextRound);nextRound=function(){};try{/* que la ronda no acabe entre un enemigo y el siguiente */
  var L=job.mobs.slice(),E=[],gap=job.gap||1.5;var time=0,next=0,uDead=0;var dt=.05,cap=job.maxT||180,d0=S.st.dmg,hp0=S.hp;var sdPrev=new Map();
  while(time<cap&&(L.length||E.some(e=>e.hp>0&&S.enemies.includes(e)))){
   if(L.length&&time>=next){const n0=S.enemies.length,k=L.shift();spawnEnemy(k,bp);const e=S.enemies.slice(n0).find(x=>x.t===k)||S.enemies[n0];if(e){e._max=e.max;E.push(e);}next=time+gap;}
   update(dt);time+=dt;if(t.sd)for(const s of t.sd){const was=sdPrev.get(s);if(was>0&&s.hp<=0)uDead++;sdPrev.set(s,s.hp);}}
  }finally{nextRound=_nr;}
  const killed=E.filter(e=>e.hp<=0).length,left=E.filter(e=>e.hp>0);const totMax=E.reduce((a,e)=>a+e._max,0),dmgDone=E.reduce((a,e)=>a+(e._max-Math.max(0,e.hp)),0);
  return{...job,ok:1,mobMode:1,n:E.length,killed,killPct:Math.round(100*killed/Math.max(1,E.length)),hpDonePct:Math.round(100*dmgDone/Math.max(1,totMax)),dmg:Math.round(S.st.dmg-d0),time:+time.toFixed(1),leakHp:hp0-S.hp,uDead,inv:t.inv||0,pathCells:bn,totHp:Math.round(totMax)};},
 run(job){if(job.boss)return LAB2.boss(job);if(job.mobs)return LAB2.mobs(job);const {type,lvl,spec,abMax,tile,round,copies,maxT}=job;
  // mismo mapa y misma oleada para todas las pruebas: azar con semilla
  {let a=(job.seed||12345)>>>0;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
  if(job.era&&typeof ERA!=='undefined')ERA=job.era;
  setup();S.field=field();
  const R=TW[type].range*(lvMods(type,lvl,spec).range||1)*(tile&&BF[tile]?(BF[tile].rg||1):1);
  const sp=spots(R,copies||1),ts=[];for(const q of sp){const t=buildOne(type,lvl,spec,abMax,tile,q);if(t)ts.push(t);}
  if(!ts.length)return{...job,err:'sin solar'};
  // torres de apoyo (Altar, Dron): se miden junto a unos Arqueros Nv 3 dentro de su alcance; la referencia es esos Arqueros solos
  if(TW[type].support||job.ref){const t0=ts[0],rg=stats(t0).range;let b=null,bd=1e9;for(let ky=0;ky<NC;ky++)for(let kx=0;kx<NC;kx++){if(S.cc[ky][kx]!==1)continue;const x=kx*K+1,y=ky*K+1;if(S.occ[x+','+y])continue;const d=Math.hypot(x-t0.x,y-t0.y);if(d<=rg&&d<bd){bd=d;b={x,y};}}
   if(b){const r=buildOne(job.ref||'arrow',3,null,false,'',b);if(r)ts.push(r);}
   /* solo la referencia, en el mismo solar: para saber cuánto aporta la torre principal */
   if(job.refOnly&&ts.length>1){const m=ts.shift();S.list.splice(S.list.indexOf(m),1);for(const k in S.occ)if(S.occ[k]===m)delete S.occ[k];if(m.sd)m.sd.length=0;}}
  const inv=ts.reduce((a,t)=>a+(t.inv||0),0);
  S.round=round||20;S.phase='build';S.tsel=null;S.selT=null;S.hp=1e6;makePortals(null);S.phase='build';startWave();if(S.phase!=='wave')return{...job,err:'no arranca la oleada ('+S.phase+')'};
  // la oleada completa de una ronda alta tiene 500-1000 enemigos: nos quedamos con los primeros (misma composición y vida), repartidos entre portales
  {const tot=S.portals.reduce((a,p)=>a+p.q.filter(t=>t!=='|').length,0),cap=job.maxEnemies||300;if(tot>cap){const k=cap/tot;for(const p of S.portals){let n=Math.ceil(p.q.filter(t=>t!=='|').length*k),i=0;for(;i<p.q.length&&n>0;i++)if(p.q[i]!=='|')n--;p.q.length=i;if(p.qf)p.qf.length=i;}}}
  const d0=S.st.dmg,k0=S.st.kills,hp0=S.hp;let time=0,spawned=0;const seen=new Set(),M={alive:0,stall:0,maxStall:0,prog:0,exp:0,inR:0,cc:0};
  const dt=.05,cap=maxT||150;let rgs=[];const inRange=e=>ts.some((t,i)=>Math.hypot(e.x-t.x,e.y-t.y)<=rgs[i]);
  while(S.phase==='wave'&&time<cap){const pre=new Map();for(const e of S.enemies)pre.set(e,{x:e.x,y:e.y,kb:e.kbT||0,f:S.field[e.ty]&&S.field[e.ty][e.tx]!=null?S.field[e.ty][e.tx]+Math.hypot(e.tx-e.x,e.ty-e.y):null});
   update(dt);time+=dt;rgs=ts.map(t=>stats(t).range);
   for(const e of S.enemies){if(e.hp<=0)continue;const p=pre.get(e);if(!p)continue;const ir=inRange(e);if(ir)e._seen=1;if(!e._seen)continue;seen.add(e);
    M.alive+=dt;if(ir)M.inR+=dt;const moved=Math.hypot(e.x-p.x,e.y-p.y),cc=!!(e.fx.stun||e.fx.freeze||e.fx.root||e.fx.poly);if(cc)M.cc+=dt;
    const f1=S.field[e.ty]&&S.field[e.ty][e.tx]!=null?S.field[e.ty][e.tx]+Math.hypot(e.tx-e.x,e.ty-e.y):null;
    if(moved<1e-4||((e.kbT||0)>p.kb)){e._st=(e._st||0)+dt;M.stall+=dt;M.maxStall=Math.max(M.maxStall,e._st);if(job.debug&&e._st>2&&!e._dbg){e._dbg=1;(M.dbg=M.dbg||[]).push({t:e.t,x:+e.x.toFixed(1),y:+e.y.toFixed(1),tx:e.tx,ty:e.ty,fx:Object.keys(e.fx),stopped:e.stopped,ct:e.ct,fsp:e.fsp,fln:e.fln,hp:Math.round(e.hp),time:+time.toFixed(1),wps:!!e.wps,dest:!!e.dest});}}else e._st=0;
    if(p.f!=null&&f1!=null)M.prog+=Math.max(0,p.f-f1);M.exp+=ET[e.t].sp*(S.espd||1)*dt;}}
  const dmg=S.st.dmg-d0,kills=S.st.kills-k0,leak=hp0-S.hp;const spawnedN=S.st.spawned||null;
  return{...job,ok:1,time:+time.toFixed(1),n:ts.length,inv,dmg:Math.round(dmg),dps:+(dmg/Math.max(1,time)).toFixed(1),kills,leakHp:leak,seen:seen.size,
   stallPct:M.alive?+(100*M.stall/M.alive).toFixed(1):0,ccPct:M.alive?+(100*M.cc/M.alive).toFixed(1):0,maxStall:+M.maxStall.toFixed(2),speedPct:M.exp?+(100*M.prog/M.exp).toFixed(0):0,inRangePct:M.alive?+(100*M.inR/M.alive).toFixed(0):0,ended:S.phase!=='wave',dbg:M.dbg};}
};
})();
