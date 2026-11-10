// Kai: con Vega, en la ronda 15 de la era 2 aparece cazando al jefe; oleada perfecta → «Caza mayor» y Kai desbloqueada
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Test',intro:1,e2n:1,e2a:1,e2v:1}));localStorage.setItem('rt-ach',JSON.stringify({bounty:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const o={};const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;
 o.oldGone=!ACHS.bounty&&!ACH.bounty;o.kaiLocked=!!HEROES.kai.lockTxt&&HUNL.kai==='caza'&&ACH.caza.n==='Caza mayor';
 ERA=2;startGame(15);chooseHero('vega');if(DLG.on)dlgEnd();S.revAt=0;S.chests={};S.evts={};RL.open=false;HQ.q=[];if(HQ.cur)hintClose();
 for(let pi=0;pi<3;pi++){S.pi=pi;const o2=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o2.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o2);}if(ok)break;}
 RL.open=false;S.round=15;S.phase='build';startWave();o.kai=!!S.kaiT&&S.summ.includes(S.kaiT);o.dlg=DLG.on;if(DLG.on)dlgEnd();
 for(const pt of S.portals)pt.q.length=0;S.enemies.length=0;let g=0;while(S.phase==='wave'&&g++<200)update(.05);if(DLG.on)dlgEnd();
 o.ach=!!ACHS.caza;o.unl=!HEROES.kai.lockTxt;
 // otra partida con otro héroe: no aparece
 return o;});
ck(r.oldGone,'el logro antiguo sigue');ck(r.kaiLocked,'Kai no está bloqueada con el logro nuevo');ck(r.kai,'Kai no aparece en la ronda 15 con Vega');ck(r.dlg,'no hay diálogo con Vega');ck(r.ach&&r.unl,'la oleada perfecta no desbloquea a Kai');
console.log(fails.length?'FALLOS '+JSON.stringify(fails)+' '+JSON.stringify(r):'historia_kai ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
