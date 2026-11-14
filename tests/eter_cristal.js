// ÉTER en la era fantástica: el cristal atado a la cinta del libro, en el menú y en la pausa; al pulsarlo habla
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.skin='perg';OPT.hints=false;try{saveOpt();applyPal();}catch(e){}showMenu();});await p.waitForTimeout(2500);
const r={};r.vis=await p.evaluate(()=>{const s=document.querySelector('.lbcv.a .etmbt .etcr');if(!s)return 0;const q=s.getBoundingClientRect();return q.width>20&&q.height>40?1:0;});
await p.evaluate(()=>document.querySelector('.lbcv.a .etmbt').click());await p.waitForTimeout(700);
r.talk=await p.evaluate(()=>{const b=document.querySelector('.lbcv.a .etmbub');return !!(b&&b.classList.contains('on')&&getComputedStyle(b).display!=='none');});
await p.screenshot({path:'tests/out/eter_cristal.png'});
console.log(JSON.stringify(r));
ck(r.vis,'El cristal de ÉTER sale colgado en el libro');ck(r.talk,'Al pulsarlo, ÉTER habla con su bocadillo');
await b.close();if(errs.length)console.log('ERRS',errs);if(fails.length||errs.length){console.log(fails.join('\n'));process.exit(1);}})();
