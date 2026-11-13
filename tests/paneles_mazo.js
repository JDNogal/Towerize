// Paneles del mazo y del cofre: con la ventana de torre abierta encima de la elección de pieza pendiente, salen a los lados (no como botones)
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
for(const [w,h] of [[1600,755],[2560,1440],[1280,720]]){const p=await b.newPage({viewport:{width:w,height:h}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;startGame(15);chooseHero('reinhart');for(let i=0;i<5&&DLG.on;i++)dlgEnd();HQ.q=[];});
await p.waitForTimeout(500);await p.evaluate(()=>{try{lbClose(true);}catch(e){}});await p.waitForTimeout(1500);await p.evaluate(()=>{RL.open=false;RL.towo=['orb','bastion','cata'];renderTowerOffer();});await p.waitForTimeout(1500);
const r=await p.evaluate(()=>({pc:document.body.classList.contains('pcpick'),btn:document.body.classList.contains('mzbtn'),side:!!document.querySelector('#mzside.on')}));
console.log(w,h,JSON.stringify(r));ck(!r.btn&&r.side,`${w}×${h}: con la elección de pieza pendiente, los paneles del mazo y del cofre deben salir a los lados`);await p.close();}
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'paneles_mazo ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
