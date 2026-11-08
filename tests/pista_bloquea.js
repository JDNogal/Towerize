// Con una pista abierta no se puede hacer nada más (bug del playtester: empezar la oleada del tutorial sin elegir torre)
const OUT=require('path').join(__dirname,'out');require('fs').mkdirSync(OUT,{recursive:true});
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:720}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;startTut();chooseHero('sylvana');});
await p.waitForTimeout(500);const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};
// tutorial: colocar la primera pieza para pasar a construcción
await p.evaluate(()=>{for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}});
await p.waitForTimeout(800);
// avanzar por las pistas del tutorial (Entendido / Siguiente) hasta «Construir torres», cerrando el aviso del portal si sale
let got=false;for(let i=0;i<40&&!got;i++){got=await p.evaluate(()=>HQ.cur&&HQ.cur.id==='build'&&hintBlocks());if(got)break;
 await p.evaluate(()=>{if(FO.open)closeFocus();if(RL.open&&RL.towo&&RL.towo.length)towerPick(RL.towo[0]);const b=document.querySelector('#hint [data-a="hintok"]');if(b&&HQ.cur&&HQ.cur.id!=='build')b.click();});await p.waitForTimeout(300);}
{const st=await p.evaluate(()=>JSON.stringify({cur:HQ.cur&&HQ.cur.id,cls:document.getElementById('hint').className,fo:FO.open,rl:RL.open,q:HQ.q.map(h=>h.id),ph:S.phase}));ck(got,'no llega a la pista «Construir torres» bloqueando '+st);}
await p.screenshot({path:OUT+'/pista_build.png'});
// clic en Empezar oleada (aunque esté debajo de la capa)
const wb=await p.$('[data-a="wave"]');if(wb){const bb=await wb.boundingBox();if(bb){await p.mouse.click(bb.x+bb.width/2,bb.y+bb.height/2);await p.waitForTimeout(300);}}
ck(await p.evaluate(()=>S.phase==='build'),'el clic empezó la oleada');
// teclado: la tecla de oleada no hace nada; Intro cierra la pista
await p.evaluate(()=>{});await p.keyboard.press('Enter');await p.waitForTimeout(300);
ck(await p.evaluate(()=>S.phase==='build'&&!(HQ.cur&&HQ.cur.id==='build')),'Intro no cerró la pista (o empezó la oleada)');
// sin pista, en el tutorial con torre por elegir: tampoco empieza
await p.evaluate(()=>{HQ.q=[];if(HQ.cur)hintClose();RL.open=false;S.tut.off={list:['arrow','cata'],title:'x',txt:'x'};startWave();});await p.waitForTimeout(200);
ck(await p.evaluate(()=>S.phase==='build'),'empezó la oleada con una torre por elegir');
// con la torre elegida, sí
await p.evaluate(()=>{S.tut.off=null;RL.open=false;HQ.q=[];if(HQ.cur)hintClose();startWave();});await p.waitForTimeout(200);
ck(await p.evaluate(()=>S.phase==='wave'),'no empieza la oleada cuando todo está bien');
// una pista nueva cierra la ficha del portal abierta (no debe tapar lo que señala)
await p.evaluate(()=>{const pt=S.portals[0];openPrim({key:'pt:x',html:()=>portalInfo(pt),rect:cellRect(pt.x-1,pt.y-1,3)});PR.pinned=true;hint('tut_tstportal','Prueba','Texto.',null);});await p.waitForTimeout(600);
ck(await p.evaluate(()=>HQ.cur&&HQ.cur.id==='tut_tstportal'&&!PR.open),'la ficha del portal sigue abierta con la pista');
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'pista ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
