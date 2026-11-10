// Código de guardado: crear en un navegador y cargar en otro (progreso + partida en curso con sus referencias)
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const c1=await b.newContext({viewport:{width:1280,height:720}}),p=await c1.newPage();p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{if(!sessionStorage.getItem('x')){localStorage.clear();localStorage.setItem('rt-tutchoice','skip');sessionStorage.setItem('x',1);}}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const a=await p.evaluate(async()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;
 startGame(15);chooseHero(HIDS()[0]);if(DLG.on)dlgEnd();S.revAt=0;S.chests={};S.evts={};RL.open=false;HQ.q=[];if(HQ.cur)hintClose();
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
 RL.open=false;S.phase='build';S.gold=777;const sol=[];for(let y=0;y<N;y++)for(let x=0;x<N;x++)if(S.cells[y][x]===1&&!S.occ[x+','+y]){const q=sqOf(x,y);if(q.x===x&&q.y===y)sol.push([x,y]);}
 S.tsel=S.deck.find(k=>TW[k].unit)||S.deck[0];build(sol[0][0],sol[0][1]);achieve('suyos');
 await svxMake();return{code:SVX.code,ntw:S.list.length,gold:S.gold,msg:SVX.msg};});
ck(a.code.startsWith('TWZ'),'no se crea el código ('+a.msg+')');
// otro navegador, sin nada
const c2=await b.newContext({viewport:{width:1280,height:720}}),q=await c2.newPage();q.on('pageerror',e=>errs.push(e.message));
await q.goto('file://'+process.argv[2]);await q.waitForTimeout(800);
const before=await q.evaluate(()=>!!ACHS.suyos);
await q.evaluate(()=>{OP.tab='sv';});
await q.evaluate(async(code)=>{SVX.inp=code;await svxLoad(code);},a.code).catch(()=>{});
await q.waitForTimeout(1500);
const r=await q.evaluate(()=>new Promise(res=>{const done=()=>res({ach:!!ACHS.suyos,meta:!!SAV.meta,tw:S&&S.list?S.list.length:0,gold:S&&S.gold,cyc:!!(S&&S.list&&S.list.some(t=>t.sd&&t.sd[0]&&t.sd[0].tw===t)),ph:S&&S.phase});
 if(!SAV.meta)return done();const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;continueRun();setTimeout(done,800);}));
ck(!before&&r.ach,'no se copian los logros');ck(r.meta,'no se copia la partida en curso');ck(r.tw===a.ntw&&r.gold===a.gold,'la partida cargada no es la misma ('+r.tw+'/'+a.ntw+', '+r.gold+'/'+a.gold+')');
ck(r.cyc,'las unidades no apuntan a su torre tras cargar');
// código roto
const bad=await q.evaluate(async()=>{try{await svxUnpack('hola');return 'ok';}catch(e){return e.message;}});ck(/no parece/.test(bad),'un código roto no avisa');
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'codigo_guardado ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
