// Compendio > Eventos: tarjetas con la imagen del evento, detalle con opciones y página de cada opción ya elegida
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r0=await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.u_cpa=true;
 const ids=Object.keys(EVENTS).filter(evSeeEra);ids.slice(0,ids.length-2).forEach(id=>{SEEN.ev[id]=1;});const id0=ids[1];MEM.ev[id0]={1:['gold:60']};
 CP.tab='ev';CP.sel.ev=id0;lbOpen('cp');
 const t=[...document.querySelectorAll('.bti.evt')];return {n:t.length,img:t.filter(x=>x.querySelector('svg')).length,un:t.filter(x=>x.classList.contains('un')).length,unSpoil:t.filter(x=>x.classList.contains('un')).every(x=>!x.querySelector('svg')&&x.textContent.includes('???')),
  below:t[0]&&t[0].lastElementChild.tagName==='SMALL',btn:document.querySelectorAll('button.evoi').length,no:document.querySelectorAll('.evoi.no').length,total:EVENTS[id0].opts.length};});
console.log(JSON.stringify(r0));
ck(r0.n>3&&r0.img===r0.n-r0.un,'las tarjetas de eventos descubiertos deben llevar su imagen');ck(r0.un===2&&r0.unSpoil,'los no descubiertos no deben enseñar ni imagen ni nombre');ck(r0.below,'el nombre va debajo de la imagen');
ck(r0.btn===1&&r0.no===r0.total-1,'solo la opción ya elegida se puede abrir');
await p.click('button.evoi[data-v="1"]');await p.waitForTimeout(300);
const r1=await p.evaluate(()=>({evo:CP.evo,txt:document.querySelector('#comp .evdet').textContent,back:!!document.querySelector('[data-a="cevob"]'),img:!!document.querySelector('#comp .evdet .evbig svg')}));
ck(r1.evo===1&&r1.back&&r1.img&&r1.txt.includes('Obtienes'),'la página de la opción no se abre bien');
await p.keyboard.press('Escape');await p.waitForTimeout(300);
const r2=await p.evaluate(()=>({evo:CP.evo,open:LB.open,list:!!document.querySelector('button.evoi')}));ck(r2.evo===null&&r2.open&&r2.list,'Esc debe volver de la opción al evento');
if(fails.length)console.log('FALLOS\n'+fails.join('\n'));console.log(errs.length?JSON.stringify(errs):'[]');await b.close();})();
