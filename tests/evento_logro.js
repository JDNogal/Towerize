// v305 · Salamandra disponible desde el principio; «Todo arde» (250 quemados) desbloquea el evento Nido abandonado
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:800}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'T',intro:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const o={};INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;
 o.sala=tunl('sala')&&!TLOCK.sala;o.ach=ACH.pyro.ev==='nest'&&!ACH.pyro.tw&&/250/.test(ACH.pyro.d);
 delete ACHS.pyro;o.locked=evLocked('nest');ERA=1;let got=false;for(let i=0;i<40&&!got;i++){startGame(15);got=Object.values(S.evts||{}).includes('nest');}o.noNest=!got;
 S.bk=249;o.notYet=!ACHS.pyro;achieve('pyro');o.unl=!evLocked('nest');
 let got2=false;for(let i=0;i<80&&!got2;i++){startGame(15);got2=Object.values(S.evts||{}).includes('nest');}o.nest=got2;
 o.rw=/data-tip="achrw:ev/.test(bkDetail('lg','pyro'));return o;});
console.log(JSON.stringify(r));const bad=Object.keys(r).filter(k=>!r[k]);if(bad.length||errs.length){console.log('FALLA: '+bad.join(', ')+' '+errs.join(';'));process.exit(1);}await b.close();})();
