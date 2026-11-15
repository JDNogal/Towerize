// Activo del Mímico: tras pulsarlo, se puede pulsar otra reliquia (aunque esté recargando) y usa su activo
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;startGame(15);chooseHero('reinhart');if(DLG.on)dlgEnd();try{lbClose(true);}catch(e){}
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}RL.open=false;S.phase='build';
 gainRelic('mimic');gainRelic('coin');S.rs.coin.cd=50;HQ.q=[];if(HQ.cur)hintClose();renderRelics();ui();});
await p.waitForTimeout(500);await p.click('#relics [data-id="mimic"]');await p.waitForTimeout(300);
const r0=await p.evaluate(()=>({aim:S.aim,dim:document.querySelector('#relics [data-id="coin"]').classList.contains('dim'),g:S.gold}));
await p.click('#relics [data-id="coin"]');await p.waitForTimeout(300);
const r1=await p.evaluate(()=>({aim:S.aim,g:S.gold,msg:S.msg,cd:S.rs.mimic.cd}));
ck(r0.aim==='mimic','el Mímico no pide elegir reliquia');ck(!r0.dim,'las demás reliquias salen apagadas al copiar');
ck(r1.aim===null&&r1.g>r0.g&&!/termina o cancela/.test(r1.msg),'no deja copiar el activo de otra reliquia: '+r1.msg);ck(r1.cd>0,'el Mímico no se recarga tras usarlo');
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'mimico_activo ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
