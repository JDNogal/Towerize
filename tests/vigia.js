// Apoyo Vigía: las 2 rondas siguientes se deciden por adelantado y se ven en la línea de rondas; luego llegan esas mismas escuadras
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{if(!sessionStorage.getItem('x')){localStorage.clear();sessionStorage.setItem('x',1);}localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;STO.p=3;
 startGame(15);chooseHero('reinhart');for(let i=0;i<5&&DLG.on;i++)dlgEnd();HQ.q=[];if(HQ.cur)hintClose();try{lbClose(true);}catch(e){}
 const o={};o.off=rtlTip(S.round+1).includes('vigb');S.ap={vig:1};
 o.on=rtlTip(S.round+1).includes('vigb')&&rtlTip(S.round+2).includes('vigb')&&!rtlTip(S.round+3).includes('vigb');
 const r1=S.round+1,plan=vigPlan(r1).out.slice();S.round=r1;const got=waveSquads(r1);o.same=JSON.stringify(plan)===JSON.stringify(got);
 o.ready=APT.find(x=>x[0]==='vig').length<8||!APT.find(x=>x[0]==='vig')[7];S.round=r1-1;return o;});
for(let k=0;k<6;k++){await p.evaluate(()=>{try{for(let i=0;i<10&&DLG.on;i++)dlgEnd();}catch(e){}try{lbClose(true);}catch(e){}if(HQ.cur)try{hintClose()}catch(e){}});await p.waitForTimeout(250);}
await p.evaluate(()=>{if(S.phase==='place'){for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}}try{lbClose(true)}catch(e){}S.ap={vig:1};OPT.ptip=true;});
await p.waitForTimeout(800);
r.auto=await p.evaluate(()=>{const e=document.getElementById('vigauto');return !!(e&&e.style.display!=='none'&&e.querySelectorAll('.vigb').length===2);});
await p.screenshot({path:'tests/out/vigia.png'});
console.log(JSON.stringify(r));
ck(!r.off,'sin Vigía, nada');ck(r.on,'con Vigía, las 2 rondas siguientes');ck(r.same,'llega lo que dijo el Vigía');ck(r.ready,'Vigía ya no sale como «próximamente»');ck(r.auto,'con los bocadillos de portales abiertos, se abren solos en la preparación');
await b.close();if(errs.length)console.log('ERRS',errs);if(fails.length||errs.length){console.log(fails.join("\n"));process.exit(1);}console.log("ok");})();
