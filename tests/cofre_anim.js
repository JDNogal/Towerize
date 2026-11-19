// v329 · Animación del cofre / paquete al elegir reliquia
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Test',intro:1,e2n:1,e2a:1,e2v:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const go=async era=>p.evaluate(era=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;ERA=era;startGame(15);chooseHero(Object.keys(HEROES||{})[0]||undefined);if(typeof DLG!=='undefined'&&DLG.on)dlgEnd();RL.open=false;openRelic();RL.fromChest=true;const rl=document.getElementById('relic');return {cofre:rl.classList.contains('cofre'),e2:rl.classList.contains('cfe2'),sign:!!rl.querySelector('.cfsign'),tipEarly:rl.dataset.ready==='1'};},era);
const r={};
for(const era of [1,2]){const a=await go(era);await p.waitForTimeout(150);const mid=await p.evaluate(()=>!!document.querySelector('#relic .cofx'));await p.waitForTimeout(4500);const end=await p.evaluate(()=>{const rl=document.getElementById('relic');return {ready:rl.dataset.ready==='1',cards:rl.querySelectorAll('.rcard').length};});r[era]={...a,mid,...end};}
await p.screenshot({path:'tests/out/cofre_anim.png'});
// v352 · salida: al elegir, la ventana sigue abierta mientras sale la animación y luego se aplica la elección
const n0=await p.evaluate(()=>S.relics.length);const cc=await p.evaluate(()=>{const r=document.querySelectorAll('#relic .cgrid .rcard')[0].getBoundingClientRect();return[r.left+r.width/2,r.top+r.height/2];});
/* v360: mientras se dibuja, los clics no eligen: se espera a que acabe */for(let k=0;k<40&&await p.evaluate(()=>typeof wlBusy==='function'&&wlBusy());k++)await p.waitForTimeout(100);
await p.mouse.click(cc[0],cc[1]);await p.waitForTimeout(400);const exMid=await p.evaluate(n0=>document.getElementById('relic').classList.contains('open')&&S.relics.length===n0&&CFOUT.on,n0);
await p.waitForTimeout(2400);const exEnd=await p.evaluate(n0=>!document.getElementById('relic').classList.contains('open')&&S.relics.length===n0+1&&!CFOUT.on,n0);r.exit={exMid,exEnd};
const ok=r[1].cofre&&!r[1].e2&&r[2].e2&&r[1].sign&&r[2].sign&&!r[1].tipEarly&&r[1].ready&&r[2].ready&&r[1].cards>0&&r[1].mid&&r.exit.exMid&&r.exit.exEnd&&!errs.length;
console.log(JSON.stringify({r,errs}));console.log(ok?'ok':'FALLOS');await b.close();process.exit(ok?0:1);})();
