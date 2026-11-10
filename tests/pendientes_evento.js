// v305 · Pendientes de eventos: lo que un evento te debe sale encima del contador de enemigos, con la cuenta atrás en rondas
const OUT=require('path').join(__dirname,'out');require('fs').mkdirSync(OUT,{recursive:true});
const {chromium,devices}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
for(const mob of [false,true]){const ctx=await b.newContext(mob?devices['iPhone 13 landscape']:{viewport:{width:1280,height:720}});const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Test',intro:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;startGame(15);chooseHero('reinhart');if(DLG.on)dlgEnd();try{if(LB.open)lbClose(true);}catch(e){}S.chests={};S.evts={};
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
 RL.open=false;HQ.q=[];if(HQ.cur)hintClose();S.phase='build';
 S.sched.push({r:S.round+2,add:{wanted:1}});S.bank={g:200,at:S.round+3};addNow('elite',1);S.half=1;});
await p.waitForTimeout(1600);
const t1=await p.evaluate(()=>{const e=document.getElementById('evpend');return e&&e.classList.contains('on')?e.textContent:'';});
ck(/Élite de encargo/.test(t1)&&/en 2 rondas/.test(t1)&&/\+200/.test(t1)&&/en 3 rondas/.test(t1)&&/Élite extra/.test(t1)&&/esta ronda/.test(t1)&&/mitad de precio/.test(t1),'no salen los pendientes ('+(mob?'móvil':'PC')+'): '+t1);
ck(await p.evaluate(()=>{const e=document.getElementById('evpend'),m=document.getElementById('emap');return !m||!m.classList.contains('on')||e.nextElementSibling===m||document.body.classList.contains('mfs');}),'no queda encima del contador de enemigos');
await p.screenshot({path:OUT+'/pendientes'+(mob?'_movil':'')+'.png'});
// una ronda después: la cuenta baja y lo de esta oleada desaparece
const t2=await p.evaluate(()=>{S.round++;S.evNow=null;evpTick();return document.getElementById('evpend').textContent;});
ck(/la próxima ronda/.test(t2)&&/en 2 rondas/.test(t2)&&!/Élite extra/.test(t2),'la cuenta atrás no baja: '+t2);
const t3=await p.evaluate(()=>{S.round++;evpTick();return document.getElementById('evpend').textContent;});ck(/Élite de encargo.*esta ronda/.test(t3),'no avisa de que llega esta ronda: '+t3);
const off=await p.evaluate(()=>{S.sched=[];S.bank=null;S.half=0;evpTick();return document.getElementById('evpend').classList.contains('on');});ck(!off,'no se oculta sin pendientes');
await ctx.close();}
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'pendientes ok');console.log('ERRS '+JSON.stringify(errs));await b.close();if(fails.length||errs.length)process.exit(1);})();
