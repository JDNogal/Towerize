// v300 · Reliquias de la era 2: cuatro de cofre y cinco de evento
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Test',intro:1,e2n:1,e2a:1,e2v:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const out={};const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;OPT.u_era=false;OPT.u_hr=true;OPT.u_rl=false;
 const NEW=['emp','shgen','printer','adren','cryo','jammer','repro','sample','core2'];
 out.defs=NEW.every(id=>RELIC[id]&&RELIC[id].era===2&&RELIC[id].cd>0&&typeof RELIC[id].pas()==='string'&&typeof RELIC[id].act()==='string'&&/Pasivo/.test(rdesc(id)));
 out.evr=['cryo','jammer','repro','sample','core2'].every(id=>RELIC[id].evr)&&['emp','shgen','printer','adren'].every(id=>!RELIC[id].evr);
 const clr=()=>{S.enemies=[];const P=S.portals[0],e={t:'norm',x:P.x,y:P.y,tx:P.x,ty:P.y,hp:1e9,max:1,fx:{freeze:{t:1e9}}};S.enemies.push(e);};
 const game=(era,h)=>{ERA=era;startGame(15);chooseHero(h);if(DLG.on)dlgEnd();S.revAt=0;S.chests={};S.evts={};RL.open=false;HQ.q=[];if(HQ.cur)hintClose();
  for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
  RL.open=false;S.phase='build';S.hp=999;S.gold=99999;for(const q of S.portals){q.sq=[];q.sqm=[];q.plan={norm:0,fast:0,tank:0,custodian:0,mini:0,elite:0,boss:0,colossus:0};}return S.hero;};
 const wave=()=>{startWave();clr();};
 const mk=(dx,hp,t)=>{const H=S.hero,r=h2Route(Math.round(H.s.x),Math.round(H.s.y),Math.max(0,dx)),c=r[Math.min(r.length-1,Math.max(0,dx))];const e={t:t||'norm',x:c.x,y:c.y,tx:c.x,ty:c.y,hp:hp||500,max:hp||500,fx:{}};S.enemies.push(e);return e;};
 const run=(s)=>{for(let i=0;i<Math.round(s/.05);i++)update(.05);};
 const give=id=>{if(!S.relics.includes(id))gainRelic(id);S.rs[id].cd=0;S.rs[id].t=0;};
 const sol=()=>{const a=[];for(let ky=0;ky<NC;ky++)for(let kx=0;kx<NC;kx++)if(S.cc[ky][kx]===1&&!S.occ[(kx*K+1)+','+(ky*K+1)])a.push({x:kx*K+1,y:ky*K+1});return a;};
 const bld=(ty)=>{const c=sol()[0];if(!S.deck.includes(ty))S.deck.push(ty);S.tsel=ty;build(c.x,c.y);return S.list[S.list.length-1];};
 // cofres: solo en la era 2
 let H=game(1,'reinhart');let seen1=new Set();for(let k=0;k<300;k++)seen1.add(rndRelic());out.chestEra1=!NEW.some(id=>seen1.has(id));
 H=game(2,'vega');let seen2=new Set();for(let k=0;k<400;k++)seen2.add(rndRelic());out.chestEra2=['emp','shgen','printer','adren'].every(id=>seen2.has(id))&&!['cryo','jammer','repro','sample','core2'].some(id=>seen2.has(id));
 // Impresora 3D: pasiva
 give('printer');const t1=bld('bunker');const g0=S.gold;out.prFree=tCost(t1,upCost(TW.bunker,2))>0;S.prR=-1;prAuto();out.prUp=t1.lvl===2&&S.gold===g0&&S.prR===S.round;const t2=bld('bunker');prAuto();out.prOnce=t2.lvl===1;
 // Generador de escudo
 give('shgen');const tr=bld('robots');wave();const s0=tr.sd[0];out.shOn=s0.shd>0&&H.s.shd>0;const e1=mk(1,500);const hp0=s0.hp,sh0=s0.shd;hitUnit(s0,3,e1);out.shAbs=s0.hp===hp0&&s0.shd<sh0;
 useRelic('shgen');out.shAim=S.aim==='shgen';NR.shgen.use({x:s0.x,y:s0.y});S.aim=null;s0.shd=0;const hp1=s0.hp;hitUnit(s0,30,e1);out.dome=s0.hp===hp1;S.dome=null;hitUnit(s0,3,e1);out.domeOff=s0.hp<hp1;
 // Impresora 3D: activo
 S.gold=99999;while(t2.lvl<3)upgrade(t2);chooseSpec(t2,Object.keys(SPECS.bunker)[0]);const ab=SPECS.bunker[t2.spec].ab.find(a=>!abReq(t2,a));buyAb(t2,ab);
 const g1=S.gold,n0=S.list.length,c0=sol()[0];useRelic('printer');out.ptAim=S.aim==='printer';out.ptStep1=NR.printer.use({x:t2.x,y:t2.y})===false&&S.prSrc===t2.id;out.ptOk=NR.printer.use(c0)===true;S.aim=null;
 const cp=S.list[S.list.length-1];out.ptCopy=S.list.length===n0+1&&cp.type==='bunker'&&cp.lvl===4&&cp.spec===t2.spec&&(cp.ab[ab]||0)===1&&cp.holo===25&&S.gold===g1;
 sell(cp);out.ptNoSell=S.list.includes(cp);S.selT=cp;out.ptMenu=tmOpts(cp).top.length===0&&!tmOpts(cp).bot.some(x=>x.k==='sell');S.selT=null;
 run(25.3);out.ptGone=!S.list.includes(cp)&&!S.occ[cp.x+','+cp.y];
 // Pulso electromagnético
 give('emp');clr();let a=mk(4,1e5);useRelic('emp');out.empNone=S.rs.emp.cd===0;h2Ez(a,3);useRelic('emp');out.emp=a.hp<1e5&&!!a.fx.stun&&S.rs.emp.cd>0;
 S.rs.emp.cd=0;a=mk(5,1e5);let z=0;const rnd=Math.random;Math.random=()=>0.01;onHit(a,t1);Math.random=rnd;out.empPas=!!(a.ez&&a.ez.n>0);
 // Adrenalina sintética
 give('adren');const r0=stats(H.pt).rate,ru=stats(tr).rate;H.s.hp=H.s.max*.2;H.adrW=0;run(.1);out.adPas=H.adr>0&&stats(H.pt).rate>r0*1.29;H.adr=0;H.s.hp=H.s.max;useRelic('adren');out.adAct=S.rs.adren.t>0&&stats(tr).rate>ru*1.49&&uSpdM(tr)===1.5;
 // Criocápsula
 give('cryo');clr();a=mk(4,1e5);const b2=mk(4,1e5);for(let k=0;k<5;k++)onHit(a,t1);out.cryPas=!!(a.cs&&a.cs.length);useRelic('cryo');out.cryAct=!!a.fx.freeze&&!b2.fx.freeze&&S.rs.cryo.cd>0;
 S.rs.cryo.cd=0;const d1=mk(4,50),d2=mk(4,1e5);addChill(d1,null,1);hurt(d1,1e4,null,'elem');run(.1);out.cryShard=!!(d2.cs&&d2.cs.length);
 // Inhibidor de señal
 give('jammer');clr();const L=mk(5,1e5),m1=mk(5,1e5),m2=mk(6,1e5);L.sqid=m1.sqid=m2.sqid=77;L.sqlead=1;useRelic('jammer');out.jam=!!L.fx.stun&&m1.loose===1&&m2.loose===1&&S.rs.jammer.cd>0;
 S.rs.jammer.cd=0;hurt(L,1e9,null,'elem');run(.1);out.jamPas=!!m1.fx.fear&&!!m2.fx.fear;
 // Rayo de reprogramación
 give('repro');clr();a=mk(4,1e5);useRelic('repro');NR.repro.use({x:a.x,y:a.y});S.aim=null;out.repro=!!(a.fx.poly&&a.fx.poly.vac)&&armorOf(a,'phys')===0;
 // Muestra viva
 give('sample');s0.hp=s0.max*.5;const h5=s0.hp;run(1);out.smpPas=s0.hp>h5;const d5=stats(tr).dmg;useRelic('sample');out.smpAct=stats(tr).dmg>d5*1.29;s0.hp=s0.max*.5;const h6=s0.hp;a=mk(4,1e5);hurt(a,100,tr,'phys');out.smpHeal=s0.hp>h6;
 // Núcleo adaptativo
 give('core2');const types=new Set(S.list.map(t=>t.type)).size;out.coreP=Math.abs(coreP()-Math.min(.35,.05*types))<1e-9&&stkX({})>1;
 S.rs.core2.cd=1;const dOff=stats(t1).dmg;S.rs.core2.cd=0;out.coreDmg=stats(t1).dmg>dOff;
 const cs=sol().find(c=>Math.hypot(c.x-t1.x,c.y-t1.y)<=1.6*K);if(cs){S.deck.push('flame');S.tsel='flame';build(cs.x,cs.y);useRelic('core2');out.asim=NR.core2.use({x:t1.x,y:t1.y})==='msg'&&t1.asim.fx.includes('burn');S.aim=null;a=mk(4,1e5);onHit(a,t1);out.asimHit=a.bn>0;}else{out.asim=true;out.asimHit=true;}
 return out;});
await p.screenshot({path:__dirname+'/out/reliquias_e2.png'});
const bad=Object.entries(r).filter(([k,v])=>v!==true).map(([k])=>k);console.log(JSON.stringify(r));if(bad.length){console.log('FALLA: '+bad.join(', '));process.exit(1);}
await b.close();console.log('ERRS '+JSON.stringify(errs));if(errs.length)process.exit(1);})();
