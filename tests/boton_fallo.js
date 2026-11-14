// «Informar de un fallo» se puede pulsar en todas las pantallas: portada, compendio, elegir héroe, pausa (botón fuera del libro) y partida (columna de arriba a la izquierda)
const {chromium,devices}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
for(const [dev,o] of [['pc',{viewport:{width:1280,height:720}}],['móvil',devices['iPhone 13 landscape']]]){const c=await b.newContext(o);const p=await c.newPage();p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(900);await p.addStyleTag({content:'#toast{display:none!important}'});
const can=()=>p.evaluate(()=>{const els=[document.getElementById('bugfab'),document.querySelector('#mtl .bugm')].filter(Boolean);for(const e of els){const r=e.getBoundingClientRect();if(!r.width||getComputedStyle(e).display==='none')continue;const t=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);if(t&&e.contains(t))return true;}return false;});
const tabsFree=()=>p.evaluate(()=>{const f=document.getElementById('bugfab'),m=document.querySelector('#comp .bkmarks');if(!f||!m||!f.classList.contains('on'))return true;const a=f.getBoundingClientRect(),q=m.getBoundingClientRect();return a.right<=q.left+1||a.bottom<=q.top+1;});
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;});await p.waitForTimeout(500);
ck(await can(),dev+': no se puede pulsar en la portada');
await p.evaluate(()=>{CP.tab='tw';lbOpen('cp');});await p.waitForTimeout(800);ck(await can(),dev+': no se puede pulsar en el compendio');ck(await tabsFree(),dev+': se monta con los marcapáginas del libro');
await p.evaluate(()=>{lbClose(true);startGame(15);});await p.waitForTimeout(900);ck(await can(),dev+': no se puede pulsar al elegir héroe');ck(await tabsFree(),dev+': se monta con los marcapáginas al elegir héroe');
await p.evaluate(()=>{chooseHero('reinhart');if(DLG.on)dlgEnd();try{lbClose(true);}catch(e){}});await p.waitForTimeout(1500);ck(await can(),dev+': no se puede pulsar en la partida');
await p.evaluate(()=>lbOpen(null));await p.waitForTimeout(800);ck(await can(),dev+': no se puede pulsar en la pausa');
const n=await p.evaluate(()=>{const f=document.getElementById('bugfab');f.click();return !!document.querySelector('#bugw.open');});ck(n,dev+': el botón no abre la ventana');
await c.close();}
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'boton_fallo ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
