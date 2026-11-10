// v301 · Eventos de la era 2 (incluido el evento por fases) y la torre Prototipo Omega
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Test',intro:1,e2n:1,e2a:1,e2v:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const out={};const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;OPT.u_era=false;OPT.u_hr=false;
 const E2=['capsule','lab','sos','cryocam','omega'];
 out.defs=E2.concat(['omega2']).every(id=>EVENTS[id]&&EVENTS[id].era===2&&EVENTS[id].opts.length===3&&EVRES[id].length===3)&&EVENTS.omega2.sub===1;
 const game=(era,h)=>{ERA=era;startGame(15);chooseHero(h);if(DLG.on)dlgEnd();S.revAt=0;S.chests={};RL.open=false;HQ.q=[];if(HQ.cur)hintClose();};
 // cada era, sus eventos
 let ok1=true,ok2=true;for(let k=0;k<6;k++){game(1,'reinhart');ok1=ok1&&Object.values(S.evts).every(id=>EVENTS[id].era!==2);game(2,'vega');ok2=ok2&&Object.values(S.evts).length>0&&Object.values(S.evts).every(id=>E2.includes(id));}out.era1=ok1;out.era2=ok2;
 S.evts={};for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
 RL.open=false;S.phase='build';S.hp=20;S.gold=5000;for(const q of S.portals){q.sq=[];q.sqm=[];q.plan={norm:3,fast:0,tank:0,custodian:0,mini:0,elite:0,boss:0,colossus:0};}
 const bk=Object.keys(S.blocks).find(k=>uSpots(k).length>1);out.block=!!bk;
 const ev=(id,i)=>{openEvent(id,bk);const o=RL.open&&RL.ev===id;chooseEvent(i);return o;};const done=()=>{closeEvent();};
 // Cápsula caída
 out.capOpen=ev('capsule',0)&&!!S.ally&&unitTowers().includes(S.ally)&&S.allyOn===1&&STO.h_korr===1&&!HEROES.korr.lockTxt;done();out.capPanel=heroPanel().includes('data-a="ally"');
 let g=S.gold;ev('capsule',1);done();out.capGold=S.gold===g+150;let hp=S.hp;ev('capsule',2);done();out.capRel=S.relics.includes('sample')&&S.hp===hp-2;
 // Laboratorio
 let el=S.portals[0].plan.elite||0;ev('lab',0);done();out.labRel=S.relics.includes('repro')&&(S.portals[0].plan.elite||0)===el+1;
 ev('lab',1);done();out.labVch=S.vch.up===1;const rnd=Math.random;Math.random=()=>.1;g=S.gold;ev('lab',2);done();out.labWin=S.gold===g+200;Math.random=()=>.9;hp=S.hp;ev('lab',2);done();Math.random=rnd;out.labLose=S.hp===hp-3;
 // Señal de socorro
 g=S.gold;ev('sos',0);done();out.sosSq=S.resc===1&&S.gold===g-100;ev('sos',1);done();out.sosRel=S.relics.includes('jammer');for(const id of S.relics)S.rs[id].cd=50;ev('sos',2);done();out.sosCh=S.relics.every(id=>S.rs[id].cd===0);
 // Cámara criogénica
 const lv=S.hero.lvl;g=S.gold;ev('cryocam',0);done();out.cryLvl=S.hero.lvl===lv+1&&S.gold===g-120;ev('cryocam',1);done();out.cryRel=S.relics.includes('cryo');
 g=S.gold;ev('cryocam',2);done();out.cryBank=S.gold===g-150&&S.bank&&S.bank.g===300&&S.bank.at===S.round+3;
 // Proyecto Omega: fase 1 → fase 2 → torre
 g=S.gold;ev('omega',1);done();out.omCoord=S.gold===g+120;ev('omega',2);done();out.omLog=S.vch.ab===1;
 g=S.gold;ev('omega',0);out.omNext=RL.evNext==='omega2'&&S.gold===g-100;closeEvent();out.omPhase2=RL.open&&RL.ev==='omega2';
 hp=S.hp;chooseEvent(0);out.omAct=S.hp===hp-4&&S.uq.some(u=>u.type==='omega');closeEvent();out.omPlace=S.aim==='uplace';
 const q=uSpots(bk)[0];uPlaceAt({x:q.x,y:q.y});uPlaceAt({x:q.x,y:q.y});const om=S.list.find(t=>t.type==='omega');out.omBuilt=!!om&&S.aim!=='uplace';
 openEvent('omega2',bk);out.omOnce=!!EVENTS.omega2.opts[0].req();chooseEvent(1);closeEvent();out.omCore=S.relics.includes('core2');
 openEvent('omega2',bk);const v0=S.vch.up;chooseEvent(2);closeEvent();out.omPlans=S.vch.up===v0+1;
 if(!om)return out;
 // la torre: controles
 S.deck=['bunker','cannon','laser','acid','nano','robots','sonic'];S.gold=9999;
 S.selT=om;tmOpen(om);let o=tmOpts(om);out.ringEmpty=o.top.length===1&&o.top[0].k==='obuild'&&o.bot.length===1&&o.bot[0].k==='lupa';
 TM.osub=1;o=tmOpts(om);const feeds=o.top.filter(x=>x.k==='ofeed');out.subRing=feeds.length===6&&o.top[o.top.length-1].k==='oback'&&feeds.some(x=>x.v==='bunker')&&!feeds.some(x=>x.v==='cannon')&&feeds.find(x=>x.v==='bunker').c===130;
 g=S.gold;out.feed1=omegaFeed(om,'bunker')===true&&om.fam.join()==='fis'&&S.gold===g-130;out.noDup=!omAvail(om).some(a=>a.f==='fis');
 out.upNeeds=omegaUp(om)===false&&om.lvl===1;omegaFeed(om,'laser');out.feed2=om.fam.length===2;out.capped=omegaFeed(om,'acid')===false&&om.fam.length===2;
 TM.osub=0;o=tmOpts(om);out.ringFull=o.top.some(x=>x.k==='oup'&&!x.lk)&&o.top.some(x=>x.k==='obuild'&&x.lk);
 g=S.gold;out.up2=omegaUp(om)===true&&om.lvl===2&&S.gold===g-150;omegaFeed(om,'acid');omegaFeed(om,'nano');out.four=om.fam.length===4&&omegaFeed(om,'robots')===false;
 omegaUp(om);omegaFeed(om,'robots');omegaFeed(om,'sonic');omegaUp(om);out.lvl4=om.lvl===4&&om.fam.length===6&&!omAvail(om).length;
 out.icon=tinfo(om).icsvg!==TW.omega.icsvg&&/Físico/.test(omegaInfo(om))&&/6 \/ 8/.test(omegaInfo(om));
 // menú real: el anillo se dibuja
 om.fam=['fis'];om.lvl=1;S.selT=om;tmOpen(om);tmTick();const bb=document.querySelector('#tmenu .tmb[data-tm="obuild"]');out.menuBtn=!!bb;if(bb){tmClick(bb);tmTick();out.menuSub=document.querySelectorAll('#tmenu .tmb[data-tm="ofeed"]').length===5&&!!document.querySelector('#tmenu .tmb[data-tm="oback"]');
  const fb=document.querySelector('#tmenu .tmb[data-tm="ofeed"][data-v="laser"]');tmClick(fb);tmTick();const fb2=document.querySelector('#tmenu .tmb[data-tm="ofeed"][data-v="laser"]');tmClick(fb2);out.menuFeed=om.fam.includes('ele')&&TM.osub===0;}
 tmClose();S.selT=null;
 // combate
 om.fam=['fis','ven','con','uni','ele','mag','fue','apo'];om.lvl=4;const nb=S.list.find(t=>t!==om);
 startWave();S.enemies=[];const e={t:'norm',x:om.x+2,y:om.y,tx:om.x+2,ty:om.y,hp:1e6,max:1e6,fx:{}};S.enemies.push(e);for(let k=0;k<60;k++){heroAbTick(.05);}
 out.fight=e.hp<1e6&&!!(e.ps&&e.ps.length)&&e.bn>0&&!!e.fx.slow&&!!(e.cs&&e.cs.length)&&e.ez&&e.ez.n>0;out.drones=(S.summ||[]).some(u=>u.odr&&u.sd.length===3);
 S.tsel='bunker';const sp=[];for(let ky=0;ky<NC;ky++)for(let kx=0;kx<NC;kx++)if(S.cc[ky][kx]===1&&!S.occ[(kx*K+1)+','+(ky*K+1)])sp.push({x:kx*K+1,y:ky*K+1});sp.sort((a,b)=>Math.hypot(a.x-om.x,a.y-om.y)-Math.hypot(b.x-om.x,b.y-om.y));
 if(sp[0]&&Math.hypot(sp[0].x-om.x,sp[0].y-om.y)<=2*K+.5){build(sp[0].x,sp[0].y);const nt=S.list[S.list.length-1];const d1=stats(nt).dmg;om.fam=['fis'];out.apo=d1>stats(nt).dmg*1.19;}else out.apo=true;
 return out;});
await p.screenshot({path:__dirname+'/out/eventos_e2.png'});
const bad=Object.entries(r).filter(([k,v])=>v!==true).map(([k])=>k);console.log(JSON.stringify(r));if(bad.length){console.log('FALLA: '+bad.join(', '));process.exit(1);}
await b.close();console.log('ERRS '+JSON.stringify(errs));if(errs.length)process.exit(1);})();
