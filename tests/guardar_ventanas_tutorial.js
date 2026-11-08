const OUT=require('path').join(__dirname,'out');require('fs').mkdirSync(OUT,{recursive:true});
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1280,height:720}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
const F='file://'+process.argv[2];const boot=async()=>{await p.goto(F);await p.waitForTimeout(800);await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;localStorage.setItem('rt-tutchoice','skip');});};
const game=async()=>{await p.evaluate(()=>{startGame(15);chooseHero('sylvana');S.chests={};S.evts={};for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}});await p.waitForTimeout(300);};
const reload=async()=>{await p.goto(F);await p.waitForTimeout(900);await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;showMenu();});await p.waitForTimeout(300);await p.click('#comp [data-a="lbload"]');await p.waitForTimeout(900);};
// 1. cofre abierto
await boot();await game();await p.evaluate(()=>openRelic());await p.waitForTimeout(600);const c1=await p.evaluate(()=>RL.choices.slice());await p.evaluate(()=>saveRun('build'));await p.waitForTimeout(300);
await reload();console.log('cofre reabierto',await p.evaluate(c=>[RL.open,JSON.stringify(RL.choices)===JSON.stringify(c),$('relic').classList.contains('open'),$('relic').textContent.includes('Cofre abierto')],c1));await p.screenshot({path:OUT+'/sv_chest.png'});
// 2. evento abierto
await p.evaluate(()=>{RL.open=false;$('relic').classList.remove('open');openEvent('merchant');});await p.waitForTimeout(600);await p.evaluate(()=>saveRun('build'));await p.waitForTimeout(300);
await reload();console.log('evento reabierto',await p.evaluate(()=>[RL.open,RL.ev,$('relic').textContent.includes('Mercader')]));
// 3. oferta de torres
await p.evaluate(()=>{closeEvent();RL.towo=['frost','cannon','orb'];renderTowerOffer();});await p.waitForTimeout(600);await p.evaluate(()=>saveRun('build'));await p.waitForTimeout(300);
await reload();console.log('oferta reabierta',await p.evaluate(()=>[RL.open,JSON.stringify(RL.towo),$('relic').textContent.includes('Nueva torre')]));
// 4. fin de ronda: tras la oleada se guarda 'round'
await p.evaluate(()=>{RL.open=false;$('relic').classList.remove('open');S.gold=999;startWave();});await p.waitForTimeout(400);
await p.evaluate(()=>{S.enemies=[];for(const q of S.portals){q.q=[];}S.speed=8;});for(let i=0;i<40;i++){await p.waitForTimeout(250);const ph=await p.evaluate(()=>S.phase);if(ph!=='wave')break;}
console.log('tras la oleada',await p.evaluate(()=>[S.phase,S.round,SAV.meta&&SAV.meta.why,SAV.meta&&SAV.meta.round]));
// 5. tutorial
await p.evaluate(()=>{startTut();});await p.waitForTimeout(400);await p.evaluate(()=>{chooseHero('reinhart');});await p.waitForTimeout(600);
console.log('tutorial guardado',await p.evaluate(()=>[TUTON,!!S.tut,SAV.meta&&SAV.meta.tut]));
await p.evaluate(()=>{TUTHS.x=1;saveRun('build');});await p.waitForTimeout(300);await reload();console.log('tutorial reanudado',await p.evaluate(()=>[TUTON,!!S.tut,ROUNDS,BN,TUTHS.x,S.hero&&S.hero.id]));
await p.screenshot({path:OUT+'/sv_tut.png'});
console.log(JSON.stringify(errs));await b.close();})();
