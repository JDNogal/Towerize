// v305 · Compendio: al pasar el ratón por una habilidad de Nv 4 sale su bocadillo con lo que hace
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:800}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Test',intro:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.u_cp=true;OPT.u_tw=true;RL.hpick=false;for(const k of Object.keys(TW))see('tw',k);
 lbOpen('cp');CP.tab='tw';CP.sel.tw='arrow';renderComp();const t=document.querySelector('#comp .bksp[data-n="4"]');t&&t.click();});
await p.waitForTimeout(300);const el=await p.$('#comp [data-kw^="ab_"]');let ok=false;
if(el){await el.hover();await p.waitForTimeout(900);ok=await p.evaluate(()=>[...document.querySelectorAll('.kpanel')].some(x=>getComputedStyle(x).display!=='none'&&x.offsetWidth>0&&/Rango 1/.test(x.textContent)));}
console.log(JSON.stringify({kw:!!el,ok}));if(!el||!ok||errs.length){console.log('FALLA '+errs.join(';'));process.exit(1);}await b.close();})();
