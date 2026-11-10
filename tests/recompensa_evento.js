// Torre de evento al acabar la oleada (cerditos): primero se coloca la torre y luego empieza la ronda siguiente
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const out={};const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;
 startGame(15);chooseHero(HIDS()[0]);if(DLG.on)dlgEnd();S.revAt=0;S.chests={};S.evts={};RL.open=false;HQ.q=[];if(HQ.cur)hintClose();
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
 RL.open=false;S.phase='build';const bk=Object.keys(S.blocks)[0];S.pend=[{r:S.round,bk,towers:['straw']}];
 startWave();for(const pt of S.portals){pt.q.length=0;}for(const e of S.enemies)e.hp=0;S.enemies.length=0;let g=0;while(S.phase==='wave'&&g++<200)update(.05);
 out.phase=S.phase;out.aim=S.aim;out.uq=S.uq.length;const r0=S.round;
 S.aim=null;relicTick();out.reaim=S.aim;
 const q=uSpots(S.uq[0].bk)[0];out.spots=!!q;if(q){uPlaceAt({x:q.x,y:q.y});uPlaceAt({x:q.x,y:q.y});}
 out.after=S.phase;out.round=S.round>r0;out.built=S.list.some(t=>t.type==='straw');return out;});
ck(r.phase==='reward'&&r.aim==='uplace'&&r.uq===1,'al acabar la oleada no se pide primero la torre ('+r.phase+','+r.aim+')');ck(r.reaim==='uplace','si se pierde el modo de colocar no vuelve');
ck(r.spots,'no hay huecos para la torre');ck(r.built,'la torre no se construye');ck(r.after==='place'&&r.round,'tras colocarla no empieza la ronda siguiente ('+r.after+')');
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'recompensa_evento ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
