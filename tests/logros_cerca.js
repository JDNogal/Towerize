// Aviso de «¡Cerca de un logro!»: al 80 %, una vez, con botón para fijarlo; también los de progreso entre partidas
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;startGame(15);chooseHero('reinhart');for(let i=0;i<5&&DLG.on;i++)dlgEnd();HQ.q=[];RL.open=false;$('relic').classList.remove('open');S.phase='build';PINS=[];
 recBest('sky',33);});
await p.waitForTimeout(1600);
const r=await p.evaluate(()=>{const el=document.getElementById('nearach');return {on:!!(el&&el.classList.contains('on')),txt:el?el.textContent:''};});
await p.screenshot({path:'tests/out/logros_cerca.png'});
await p.evaluate(()=>document.querySelector('[data-nearpin]').click());await p.waitForTimeout(300);
r.pin=await p.evaluate(()=>PINS.includes('sky'));
await p.evaluate(()=>{const el=document.getElementById('nearach');el.classList.remove('on');NEAR.cur=null;clearTimeout(NEAR.tm);recBest('sky',35);PRG.twk.arrow=2100;});await p.waitForTimeout(1600);
r.again=await p.evaluate(()=>NEAR.cur);
console.log(JSON.stringify(r));
ck(r.on&&/Cerca de un logro/.test(r.txt),'sale el aviso al 80 %');ck(r.pin,'el botón fija el logro');ck(r.again&&r.again!=='sky','no repite el mismo en la partida y avisa de los de progreso entre partidas: '+r.again);
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'logros_cerca ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
