// Mini-élites y élites (v292): variante por era, regeneración, escudo, estandartes, teletransporte, camuflaje, adaptación, puesta y hangar
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const out={};INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;
 startGame(15);chooseHero('reinhart');if(DLG.on)dlgEnd();S.chests={};S.evts={};RL.open=false;HQ.q=[];
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
 RL.open=false;S.phase='build';S.round=8;
 for(const p of S.portals){p.sq=[];p.sqm=[];p.plan={norm:0,fast:0,tank:0,custodian:0,mini:1,elite:1,boss:0,colossus:0};}
 startWave();for(let i=0;i<600&&S.enemies.length<2;i++)update(.05);out.e1=S.enemies.map(e=>e.t);out.v1=S.enemies.length>0&&S.enemies.every(e=>['troll','hknight','warlord','wander'].includes(e.t));
 const P=S.enemies[0]||{x:5,y:5,tx:5,ty:5};S.enemies=[];const mk=t=>{const e={t,x:P.x,y:P.y,tx:P.tx,ty:P.ty,hp:100,max:200,fx:{}};S.enemies.push(e);return e;};
 const tr=mk('troll');for(let i=0;i<21;i++)eliteTick(.05);out.regen=tr.hp>100;tr.hp=100;tr.bn=3;for(let i=0;i<21;i++)eliteTick(.05);out.noregen=tr.hp===100;S.enemies=[];
 const hk=mk('hknight');hk.hp=200;for(let i=0;i<6;i++)hurt(hk,10,null,'phys');out.shield=hk.hp===200;hurt(hk,10,null,'phys');out.shBreak=hk.hp<200;S.enemies=[];
 const wl=mk('warlord');wl.bnc=0;eliteTick(.05);const bn=S.enemies.find(e=>e.t==='banner');out.banner=!!bn&&bn.hp>0;const o=mk('norm');eliteTick(.05);out.haste=!!(o.fx.haste&&o.fx.haste.m>1);const bx=bn?bn.x:0;if(bn){update(.05);out.banStill=bn.x===bx;bn.life=0;eliteTick(.05);out.banGone=!S.enemies.includes(bn);}S.enemies=[];
 const wd=mk('wander');wd.tlc=0;wd.tx=P.tx;wd.ty=P.ty;const f0=S.field[wd.ty][wd.tx];eliteTick(.05);out.warn=wd.tw>0||f0<=TELED*1.6;if(wd.tw>0){for(let i=0;i<25;i++)eliteTick(.05);out.tele=S.field[wd.ty][wd.tx]<f0;}else out.tele=true;
 const wd2=mk('wander');wd2.tlc=0;eliteTick(.05);if(wd2.tw>0){wd2.fx.stun={t:1};eliteTick(.05);out.cancel=!(wd2.tw>0);}else out.cancel=true;S.enemies=[];
 const inf=mk('infil');const L0=S.list;S.list=[];eliteTick(.05);out.camo=camoHid(inf);S.list=[{x:inf.x+1,y:inf.y,type:'arrow'}];eliteTick(.05);const near=!camoHid(inf);S.list=[];for(let i=0;i<10;i++)eliteTick(.05);out.camo=out.camo&&near&&camoHid(inf);hurt(inf,1,null,'phys');out.reveal=!camoHid(inf);S.list=L0;S.enemies=[];
 const mu=mk('mutant');mu.hp=1e6;mu.max=1e6;for(let s=0;s<6;s++){hurt(mu,100,null,'magic');for(let i=0;i<20;i++)eliteTick(.05);}out.adapt=mu.res.magic>.1&&mu.res.phys===0;S.enemies=[];
 const ca=mk('carrier');ca.lnc=0;eliteTick(.05);eliteTick(.05);out.launch=S.enemies.filter(e=>e.t==='swarm').length===2;S.enemies=[];
 const br=mk('brood');achDeath(br);eliteTick(.05);out.burst=S.enemies.filter(e=>e.t==='stalk').length===8;
 ERA=2;OPT.u_era=1;startGame(15);chooseHero('vega');if(DLG.on)dlgEnd();S.chests={};S.evts={};RL.open=false;HQ.q=[];
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
 RL.open=false;S.phase='build';S.round=8;for(const p of S.portals){p.sq=[];p.sqm=[];p.plan={norm:0,fast:0,tank:0,custodian:0,mini:1,elite:1,boss:0,colossus:0};}
 startWave();for(let i=0;i<600&&S.enemies.length<2;i++)update(.05);out.e2=S.enemies.map(e=>e.t);out.v2=S.enemies.length>0&&S.enemies.some(e=>['infil','mutant','brood','carrier'].includes(e.t))&&!S.enemies.some(e=>['troll','hknight','warlord','wander'].includes(e.t));
 out.kw=['regen','shield','banner','tele','camo','adapt','burst','launch'].every(k=>kwHtml0(k,'').includes('<b>'));
 return out;});
const f=[];const ck=(c,m)=>{if(!c)f.push(m);};
ck(r.v1,'en la Fantástica no salen sus élites');ck(r.v2,'en la Distópica no salen sus élites');ck(r.regen&&r.noregen,'regeneración del Troll mal');ck(r.shield&&r.shBreak,'escudo del Caballero mal');ck(r.banner&&r.haste,'estandarte mal');ck(r.banStill&&r.banGone,'el estandarte se mueve o no se cae');
ck(r.warn&&r.tele,'teletransporte mal');ck(r.cancel,'el control no cancela el salto');ck(r.camo&&r.reveal,'camuflaje mal');ck(r.adapt,'adaptación mal');ck(r.launch,'hangar mal');ck(r.burst,'puesta mal');ck(r.kw,'faltan palabras clave');
console.log(f.length?'FALLOS '+JSON.stringify(f)+' '+JSON.stringify(r):'elites ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
