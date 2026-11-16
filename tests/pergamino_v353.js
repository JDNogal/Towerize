// v353 · Pergamino nuevo en todas las ventanas de elección de la era 1 (torre y cada evento): sin rodillos viejos y sin scroll en 1280×720
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;startGame(15);chooseHero('reinhart');if(DLG.on)dlgEnd();try{lbClose(true);}catch(e){}
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}RL.open=false;S.phase='build';S.gold=5000;});
const ids=await p.evaluate(()=>Object.keys(EVENTS).filter(k=>!EVENTS[k].era||EVENTS[k].era===1));
const look=()=>p.evaluate(()=>{const rl=$('relic');return{svg:!!rl.querySelector('.pgsvg'),old:!!rl.querySelector('.prod'),scroll:rl.scrollHeight>rl.clientHeight+8};});
const close=()=>p.evaluate(()=>{try{closeEvent();}catch(e){}RL.open=false;$('relic').className='tipc';$('relic').innerHTML='';try{pgStop();}catch(e){}});
const res={};
await p.evaluate(()=>{RL.towo=['arrow','frost','orb'];RL.towT='Nueva torre';renderTowerOffer();});await p.waitForTimeout(3500);res.torre=await look();await close();
for(const id of ids){await p.evaluate(id=>openEvent(id,'0,0'),id);await p.waitForTimeout(3500);res[id]=await look();await close();}
console.log(JSON.stringify(res));
for(const [k,v] of Object.entries(res)){ck(v.svg,k+': sin pergamino nuevo');ck(!v.old,k+': quedan rodillos viejos');ck(!v.scroll,k+': sale scroll en 1280×720');}
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'pergamino_v353 ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
