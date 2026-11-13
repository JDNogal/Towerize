// Menú principal con partida guardada (línea encima, Continuar y Nueva partida iguales) y Novedades
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-novseen','310');localStorage.setItem('rt-save',JSON.stringify({round:7,rounds:15,hero:'reinhart',heroN:'Reinhart',t:Date.now()}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;SAV.meta=JSON.parse(localStorage.getItem('rt-save'));lbOpen(null,true);});await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const c=$('comp'),sv=c.querySelector('.lbsv'),ld=c.querySelector('[data-a="lbload"]'),nw=c.querySelector('[data-a="newgame"]'),nv=c.querySelector('[data-a="novopen"]');
 const a=ld.getBoundingClientRect(),n=nw.getBoundingClientRect();return {order:sv&&sv.getBoundingClientRect().top<a.top&&a.top<n.top&&n.top<nv.getBoundingClientRect().top,same:Math.abs(a.width-n.width)<2&&Math.abs(a.height-n.height)<2,dot:!!nv.querySelector('i')};});
await p.evaluate(()=>document.querySelector('#comp [data-a="novopen"]').click());await p.waitForTimeout(800);
r.page=await p.evaluate(()=>!!document.querySelector('#comp .novl')&&document.querySelectorAll('#comp .novr .nw').length>0);
await p.evaluate(()=>document.querySelector('#comp [data-a="novsel"][data-v="315"]').click());await p.waitForTimeout(400);
r.sel=await p.evaluate(()=>/v315/.test(document.querySelector('#comp .novd h4').textContent));
await p.evaluate(()=>document.querySelector('#comp [data-a="novback"]').click());await p.waitForTimeout(800);
r.back=await p.evaluate(()=>!!document.querySelector('#comp [data-a="novopen"]')&&!document.querySelector('#comp [data-a="novopen"] i'));
console.log(JSON.stringify(r));
ck(r.order,'la línea de la partida va encima y los botones juntos: Continuar, Nueva partida, Novedades');ck(r.same,'Continuar y Nueva partida miden lo mismo');ck(r.dot&&r.page,'Novedades marca lo nuevo');ck(r.sel,'se puede elegir otra versión');ck(r.back,'al volver, ya no hay punto de nuevo');
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'novedades ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
