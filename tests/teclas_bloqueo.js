// Teclas rápidas: si el ratón no puede pulsar el control (pista, foco de portal, ventana encima…), la tecla tampoco lo activa
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const prep=()=>p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;
 startGame(15);chooseHero(HIDS()[0]);if(DLG.on)dlgEnd();try{if(LB.open)lbClose(true);}catch(e){}S.revAt=0;S.chests={};S.evts={};RL.open=false;HQ.q=[];if(HQ.cur)hintClose();
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
 RL.open=false;S.phase='build';HQ.q=[];if(HQ.cur)hintClose();ui();});
const ph=()=>p.evaluate(()=>S.phase);
await prep();await p.waitForTimeout(1200);
// 1) una pista abierta
await p.evaluate(()=>{HQ.q=[];hintShow({id:'zz',title:'Prueba',txt:'Hola',tg:null});});await p.waitForTimeout(150);await p.keyboard.press('Enter');await p.waitForTimeout(150);
ck(await ph()==='build','con una pista abierta, Intro empieza la oleada');await p.evaluate(()=>{if(HQ.cur)hintClose();});
// 2) foco de portal (la pista queda escondida detrás)
await p.evaluate(()=>{showFocus(S.portals[0]||{x:S.core.x,y:S.core.y});hintShow({id:'zz2',title:'Prueba',txt:'Hola',tg:null});});await p.waitForTimeout(200);await p.keyboard.press('Enter');await p.waitForTimeout(150);
ck(await ph()==='build','con el foco de portal abierto, Intro empieza la oleada');
await p.evaluate(()=>{FO.open=false;const f=$('focus');if(f)f.style.display='none';if(HQ.cur)hintClose();});
// 3) algo tapa el botón
await p.evaluate(()=>{const d=document.createElement('div');d.id='tapa';d.style.cssText='position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.2)';document.body.appendChild(d);ui();});await p.waitForTimeout(150);
await p.keyboard.press('h');await p.keyboard.press('Enter');await p.waitForTimeout(150);ck(await ph()==='build','con el botón tapado, Intro empieza la oleada');
// 4) sin nada encima, Intro sí empieza la oleada
await p.evaluate(()=>{$('tapa').remove();ui();});await p.waitForTimeout(150);await p.keyboard.press('Enter');await p.waitForTimeout(200);
ck(await ph()==='wave','sin nada encima, Intro no empieza la oleada ('+await ph()+')');
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'teclas_bloqueo ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
