// v363 · Velocidad (Nogal, 21-nov): a mano como mucho ×2 (botones, móvil y tecla); ×3 solo con el avance rápido automático cuando no hay enemigos a tiro
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;startGame(15);ui();
 const o={};o.btns=[...document.querySelectorAll('#mbl [data-a="spd"]')].map(b=>b.dataset.v).join(',');
 S.speed=3;S.lspd=3;ui();o.clamp=S.speed+'/'+S.lspd;
 S.speed=1;S.lspd=1;ui();o.max=SPDMAX;return o;});
r.keys=await p.evaluate(()=>{document.body.classList.add('mfs');S.speed=1;S.lspd=1;ui();const seq=[];for(let k=0;k<4;k++){const b=document.querySelector('#mbl [data-a="spdc"]');if(!b)return 'sin botón';b.click();seq.push(S.speed);ui();}document.body.classList.remove('mfs');ui();return seq.join(',');});
console.log(JSON.stringify(r));
ck(!/(^|,)3(,|$)/.test(r.btns)&&/2/.test(r.btns),'sin botón ×3 ('+r.btns+')');
ck(r.clamp==='2/2','una velocidad guardada de ×3 se queda en ×2');
ck(!/3/.test(r.keys)&&/2/.test(r.keys),'el botón de velocidad del móvil no llega a ×3 ('+r.keys+')');
ck(r.max===2,'SPDMAX = 2');
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'velocidad_v363 ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
