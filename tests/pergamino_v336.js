// Pergamino nuevo (piezas, nueva torre, eventos y su resultado) y cofres/eventos del mapa: se monta el SVG, nada se sale y no hay errores
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;startGame(15);chooseHero('reinhart');if(DLG.on)dlgEnd();try{lbClose(true);}catch(e){}});
await p.waitForTimeout(5500);
const inside=sel=>p.evaluate(sel=>{const h=document.querySelector(sel);if(!h)return 'sin ventana';if(!h.querySelector('.pgsvg'))return 'sin pergamino';const r=h.getBoundingClientRect();const bad=[...h.querySelectorAll('.card,.tof,.evo')].filter(c=>{const q=c.getBoundingClientRect();return q.left<r.left-1||q.right>r.right+1;}).length;return bad?'cartas fuera':'ok';},sel);
ck(await inside('#panel')==='ok','elegir pieza: '+await inside('#panel'));
ck(await p.evaluate(()=>document.querySelectorAll('#panel .pcinfo').length===S.offers.length),'falta la info debajo de cada pieza');
await p.evaluate(()=>{for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}RL.open=false;S.phase='build';ui();RL.towo=['frost','sala','poison'];renderTowerOffer();});
await p.waitForTimeout(5000);ck(await inside('#relic .ppap')==='ok','nueva torre: '+await inside('#relic .ppap'));
await p.evaluate(()=>{RL.open=false;$('relic').classList.remove('open');openEvent('merchant','x');});await p.waitForTimeout(5000);ck(await inside('#relic .ppap')==='ok','evento: '+await inside('#relic .ppap'));
await p.evaluate(()=>{const x=document.querySelector('#relic [data-a="evopt"]');x&&x.click();});await p.waitForTimeout(1500);ck(await inside('#relic .ppap')==='ok','resultado del evento: '+await inside('#relic .ppap'));
// iconos del mapa: se dibujan en las dos eras sin errores
const er=await p.evaluate(()=>{const c=document.createElement('canvas');c.width=400;c.height=200;const x=c.getContext('2d');try{for(const e2 of [false,true]){MIC.e2=e2;MIC.ctx=x;for(const t of [0,.4,1,2]){MIC.now=1000+t;mapChestDraw('1,1',100,100,40,v=>v);mapEvtDraw('2,1',300,100,40,v=>v);}}return '';}catch(e){return e.message;}finally{MIC.e2=null;MIC.ctx=null;MIC.now=null;}});
ck(!er,'iconos del mapa: '+er);
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'pergamino_v336 ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
