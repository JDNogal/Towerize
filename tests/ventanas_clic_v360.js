// v360 · Clics durante las animaciones: el primer clic acelera (×3) y los demás no eligen nada hasta que todo está dibujado
// (cofre y paquete, oferta de torres con pergamino o dron); «Saltar» la oferta pide un segundo clic; los eventos nunca abiertos salen primero
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Test',intro:1,e2n:1,e2a:1,e2v:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const start=era=>p.evaluate(era=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;ERA=era;startGame(15);chooseHero('reinhart');for(let i=0;i<5&&DLG.on;i++)dlgEnd();try{lbClose(true);}catch(e){}HQ.q=[];if(HQ.cur)hintClose();S.chests={};S.evts={};
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
 RL.open=false;$('relic').classList.remove('open');S.phase='build';S.gold=99999;ui();},era);
const center=sel=>p.evaluate(sel=>{const e=document.querySelector(sel);if(!e)return null;const r=e.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2];},sel);
const waitFree=async(ms)=>{const t0=Date.now();while(Date.now()-t0<ms){if(!(await p.evaluate(()=>wlBusy())))return Date.now()-t0;await p.waitForTimeout(100);}return -1;};
const r={};
for(const era of [1,2]){await start(era);await p.waitForTimeout(1600);
 // --- oferta de torres ---
 await p.evaluate(()=>{RL.towo=['frost','sala','poison'];renderTowerOffer();});await p.waitForTimeout(120);
 const busy0=await p.evaluate(()=>wlBusy());const c1=await center('#relic [data-a="towpick"]');
 let acc=false;if(c1){await p.mouse.click(c1[0],c1[1]);acc=await p.evaluate(()=>{const o=PGF.on;return (o&&o.spd===3)||document.getAnimations().some(a=>a.playbackRate===3);});if(await p.evaluate(()=>wlBusy())){await p.waitForTimeout(40);await p.mouse.click(c1[0],c1[1]);}}
 const picked=await p.evaluate(()=>!RL.open||!$('relic').querySelector('[data-a="towpick"]'));
 const tf=await waitFree(6000);
 // «Saltar»: el primer clic lo marca; el segundo salta
 const sk=await center('#relic [data-a="towskip"]');let skip1=null,skip2=null;
 if(sk){await p.mouse.click(sk[0],sk[1]);await p.waitForTimeout(100);skip1=await p.evaluate(()=>RL.open&&!!document.querySelector('#relic [data-a="towskip"].skarm'));
  const sk2=await center('#relic [data-a="towskip"]');await p.mouse.click(sk2[0],sk2[1]);await p.waitForTimeout(150);skip2=await p.evaluate(()=>!RL.towo);}
 await p.evaluate(()=>{RL.open=false;$('relic').classList.remove('open');ui();});await p.waitForTimeout(300);
 // --- cofre del mapa ---
 const n0=await p.evaluate(()=>{const n=S.relics.length;RL.open=false;openRelic();RL.fromChest=true;return n;});await p.waitForTimeout(60);
 const busyC=await p.evaluate(()=>wlBusy());const cc=await center('#relic .cgrid .rcard');
 for(let k=0;k<4&&cc;k++){await p.mouse.click(cc[0],cc[1]);await p.waitForTimeout(90);}
 const notPicked=await p.evaluate(n0=>S.relics.length===n0&&!CFOUT.on,n0);const tc=await waitFree(6000);
 await p.waitForTimeout(300);const cc2=await center('#relic .cgrid .rcard');if(cc2)await p.mouse.click(cc2[0],cc2[1]);let pickedAfter=false;for(let k=0;k<40&&!pickedAfter;k++){await p.waitForTimeout(100);pickedAfter=await p.evaluate(n0=>S.relics.length===n0+1,n0);}
 r[era]={busy0,picked,acc,tf,skip1,skip2,busyC,notPicked,tc,pickedAfter};
 ck(busy0,'era '+era+': la oferta recién abierta debe estar bloqueada');ck(!picked,'era '+era+': un clic durante la animación eligió torre');ck(acc||(tf>=0&&tf<400),'era '+era+': el primer clic no acelera');/* en la era 2 la entrada es corta (≈0,3 s): puede acabar antes de mirarlo */ck(tf>=0,'era '+era+': la oferta no se desbloquea');
 ck(skip1===true,'era '+era+': «Saltar» debe pedir un segundo clic');ck(skip2===true,'era '+era+': el segundo clic en «Saltar» salta');
 ck(busyC,'era '+era+': el cofre recién abierto debe estar bloqueado');ck(notPicked,'era '+era+': clics durante el cofre eligieron reliquia');ck(tc>=0&&tc<3000,'era '+era+': el cofre acelerado tarda demasiado ('+tc+' ms)');ck(pickedAfter,'era '+era+': después de dibujarse, la reliquia se elige');}
// --- eventos: primero los que nunca has abierto ---
r.ev=await p.evaluate(()=>{const ids=Object.keys(EVENTS).filter(k=>evEraOk(k)&&!evLocked(k));const keep=ids.slice(0,2);for(const k of ids)if(!keep.includes(k))see('ev',k);
 let ok=0;for(let t=0;t<20;t++){S.evts={};placeEvents(Math.floor(BN/2),[0,0]);const got=Object.values(S.evts);if(keep.every(k=>got.includes(k)))ok++;}return {ok,n:ids.length};});
ck(r.ev.ok===20,'los eventos nunca abiertos deben salir primero ('+r.ev.ok+'/20)');
await p.screenshot({path:'tests/out/ventanas_clic_v360.png'});
console.log(JSON.stringify(r));console.log(fails.length?'FALLOS '+JSON.stringify(fails):'ventanas_clic_v360 ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();if(fails.length||errs.length)process.exit(1);})();
