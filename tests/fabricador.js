// Fabricador de sectores: el evento abre la ventana, se diseña el sector en 5 pasos, se cobra al terminar y se coloca (o se guarda y sale ya pagado en la próxima elección)
const {chromium,devices}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const OUT=require('path').join(__dirname,'out');
for(const mob of [false,true]){
const ctx=await b.newContext(mob?{...devices['iPhone 13 landscape']}:{viewport:{width:1280,height:720}});const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;startGame(15);chooseHero(HIDS()[0]);if(DLG.on)dlgEnd();try{if(LB.open)lbClose(true);}catch(e){}
 RL.open=false;HQ.q=[];if(HQ.cur)hintClose();S.chests={};S.evts={};
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
 RL.open=false;S.phase='build';S.gold=1000;S.hp=20;openEvent('fabric',S.lastBk);});
await p.waitForTimeout(600);
const r0=await p.evaluate(()=>{const o=document.querySelectorAll('#relic [data-a="evopt"]');return {n:o.length,t:document.querySelector('#relic').textContent.includes('Fabricador')};});
ck(r0.t&&r0.n===3,'el evento no sale con sus 3 opciones');
await p.evaluate(()=>{chooseEvent(1);});await p.waitForTimeout(300);await p.evaluate(()=>{closeEvent();});await p.waitForTimeout(400);
ck(await p.evaluate(()=>FAB.open&&$('fabw').classList.contains('on')),'no se abre el Fabricador al arrancarlo');
const g0=await p.evaluate(()=>S.gold);ck(g0===970,'arrancarla con oro no cobra 30 ('+g0+')');
if(!mob)await p.screenshot({path:OUT+'/fabricador_1.png'});
// paso 1 · 2 · 3 · 4 con clics de verdad en el lienzo
const cell=async(x,y)=>{const r=await p.evaluate(()=>{const r=FAB.cvs.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width};});await p.mouse.click(r.x+(x+.5)*r.w/7,r.y+(y+.5)*r.w/7);await p.waitForTimeout(40);};
await p.click('#fabw [data-ex="3"]');await p.click('#fabw [data-fb="go"]');/* cruce: encaja en cualquier extremo */
await cell(3,3);ck(await p.evaluate(()=>FAB.st.path.has('3,3')),'pulsar en el lienzo no pone camino');
for(const y of [1,2,4,5])await cell(3,y);for(const x of [1,2,4,5])await cell(x,3);

ck(await p.evaluate(()=>!document.querySelector('#fabw [data-fb="go"]').disabled),'el camino en cruz no se da por bueno');
if(!mob)await p.screenshot({path:OUT+'/fabricador_2.png'});
await p.click('#fabw [data-fb="go"]');for(const [x,y] of [[1,1],[5,1],[1,5],[5,5]])await cell(x,y);
ck(await p.evaluate(()=>FAB.st.sol.size===4),'no se ponen los 4 solares');
await p.click('#fabw [data-fb="go"]');await p.click('#fabw [data-tier="1"]');await p.click('#fabw [data-sp]');await cell(5,5);
ck(await p.evaluate(()=>FAB.st.spAt==='5,5'),'no se pone la casilla especial');
if(!mob)await p.screenshot({path:OUT+'/fabricador_4.png'});
await p.click('#fabw [data-fb="go"]');await p.waitForTimeout(200);
if(!mob)await p.screenshot({path:OUT+'/fabricador_5.png'});else await p.screenshot({path:OUT+'/fabricador_movil.png'});
const sp=await p.evaluate(()=>fabSpots(fabPiece(FAB.st)));
if(!mob){ck(sp.length>0,'el sector no encaja en ningún sitio del mapa de prueba');
 if(sp.length){const nb=await p.evaluate(()=>Object.keys(S.blocks).length),[bx,by]=sp[0];
  await p.evaluate(([bx,by])=>{const r=FAB.cvs.getBoundingClientRect();window._pt={x:r.x+(bx+.5)*r.width/BN,y:r.y+(by+.5)*r.width/BN};},[bx,by]);const pt=await p.evaluate(()=>window._pt);await p.mouse.click(pt.x,pt.y);await p.waitForTimeout(400);
  const r=await p.evaluate(([bx,by])=>{let bf=0;for(let y=0;y<P;y++)for(let x=0;x<P;x++){const v=S.buff[(by*P+y)*K+KC][(bx*P+x)*K+KC];if(v)bf++;}return {nb:Object.keys(S.blocks).length,open:FAB.open,g:S.gold,bf,ph:S.phase};},[bx,by]);
  ck(r.nb===nb+1&&!r.open,'no se coloca el sector');ck(r.g===970-125,'no cobra lo que cuesta el sector (25 + 50): '+r.g);ck(r.bf===1,'la casilla especial no queda en el mapa');ck(r.ph==='build','no vuelve a la fase de construir');}}
else{// en móvil se guarda y sale en la próxima elección, ya pagado
 await p.click('#fabw [data-fb="keep"]');await p.waitForTimeout(200);const g1=await p.evaluate(()=>S.gold);ck(g1===970-125,'guardar no cobra el sector');
 await p.evaluate(()=>{nextRound();});await p.waitForTimeout(400);
 const r=await p.evaluate(()=>{const i=S.offers.findIndex(o=>o.fab);const c=i>=0&&document.querySelector(`#ui .card[data-i="${i}"] .pcst`);return {i,c:c&&c.textContent};});
 ck(r.i>=0,'el sector guardado no sale en la próxima elección de pieza');ck(!r.c||/pagada/.test(r.c),'el sector guardado no dice que ya está pagado: '+r.c);}
await ctx.close();}
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'fabricador ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
