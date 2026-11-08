const OUT=require('path').join(__dirname,'out');require('fs').mkdirSync(OUT,{recursive:true});
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1280,height:800}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.setItem('rt-seen',JSON.stringify({tw:{arrow:1,cata:1,orb:1},pc:{},bf:{},en:{norm:1},rl:{horn:1},hr:{},ev:{}}));localStorage.setItem('rt-opts',JSON.stringify({u_cpa:true}));localStorage.setItem('rt-story',JSON.stringify({intro:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;localStorage.setItem('rt-tutchoice','skip');startGame(15);chooseHero('reinhart');S.chests={};S.evts={};RL.open=false;$('relic').classList.remove('open');ui();});
await p.waitForTimeout(200);
const foc=()=>p.evaluate(()=>{const e=document.querySelector('.kfoc');return e?(e.dataset.a||'')+':'+(e.dataset.v||'')+':'+e.textContent.trim().slice(0,20):null;});
await p.keyboard.press('Escape');await p.waitForTimeout(200);console.log('pausa',await p.evaluate(()=>PMU.open));
await p.keyboard.press('ArrowDown');await p.waitForTimeout(80);console.log('foco1',await foc());
await p.keyboard.press('s');await p.waitForTimeout(80);console.log('foco2',await foc());
await p.keyboard.press('ArrowRight');await p.waitForTimeout(80);console.log('foco3',await foc());
await p.screenshot({path:OUT+'/nav_pause258.png'});
// abrir compendio con el teclado: buscar el botón Compendio
for(let i=0;i<6;i++){const f=await foc();if(f&&/Compendio/.test(f))break;await p.keyboard.press('ArrowRight');await p.waitForTimeout(60);}
console.log('antes enter',await foc());await p.keyboard.press('Enter');await p.waitForTimeout(300);console.log('comp',await p.evaluate(()=>CP.open));
await p.keyboard.press('ArrowDown');await p.waitForTimeout(150);await p.keyboard.press('ArrowRight');await p.waitForTimeout(250);console.log('libro',await foc(),await p.evaluate(()=>CP.sel.tw));
await p.keyboard.press('e');await p.waitForTimeout(250);console.log('pestaña',await p.evaluate(()=>CP.tab));
await p.screenshot({path:OUT+'/nav_book258.png'});
await p.mouse.move(100,100);await p.mouse.move(300,300);await p.waitForTimeout(100);console.log('ratón quita',await foc());
console.log(errs);await b.close();})();
