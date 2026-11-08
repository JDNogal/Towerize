// ÉTER habla en partida: bocadillo sobre el núcleo, fallos según la reparación, nombre al 100 %, opción para desactivarlo
const OUT=require('path').join(__dirname,'out');require('fs').mkdirSync(OUT,{recursive:true});
const {chromium,devices}=require('playwright');(async()=>{const b=await chromium.launch();const mob=process.argv[3]==='m';
const ctx=await b.newContext(mob?{...devices['iPhone 13 landscape']}:{viewport:{width:1280,height:720}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;startGame(15);chooseHero('sylvana');S.chests={};S.evts={};for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}});
await p.waitForTimeout(600);
const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};
// 1. se cuela un enemigo en plena oleada (núcleo al 9 %: con fallos)
await p.evaluate(()=>{STO.p=0;ETER.t=-1e9;S.phase='wave';S.speed=0;});await p.waitForTimeout(400);
await p.evaluate(()=>{Math.random=(r=>()=>.01)(Math.random);S.hp-=1;});await p.waitForTimeout(500);
let st=await p.evaluate(()=>({on:$('eterb')&&$('eterb').classList.contains('on'),txt:$('eterb')&&$('eterb').textContent,g:$('eterb')&&$('eterb').className}));
ck(st.on,'no sale el bocadillo al colarse un enemigo');ck(/g3/.test(st.g),'sin fallos con el núcleo al 9 %');await p.screenshot({path:OUT+'/eter_'+(mob?'m':'pc')+'_leak.png'});
// 2. no repite enseguida (enfriamiento)
await p.evaluate(()=>{$('eterb').classList.remove('on');S.eter.leak=0;S.hp-=1;});await p.waitForTimeout(500);
ck(!(await p.evaluate(()=>$('eterb').classList.contains('on'))),'habla dos veces seguidas sin esperar');
// 3. núcleo reparado: limpio y con el nombre
await p.evaluate(()=>{STO.p=3;STO.name='Nogal';ETER.t=-1e9;ETER.last='';S.eter.hp0=S.hp;S.eter.hurt=0;S.phase='build';});await p.waitForTimeout(500);
st=await p.evaluate(()=>({on:$('eterb').classList.contains('on'),txt:$('eterb').textContent,g:$('eterb').className}));
ck(st.on,'no habla al ganar la oleada sin daños');ck(!/[▒░▓]/.test(st.txt),'fallos con el núcleo al 100 %');ck(!/Piloto/.test(st.txt),'no usa el nombre');
await p.screenshot({path:OUT+'/eter_'+(mob?'m':'pc')+'_clean.png'});
// 4. desactivado en Opciones: no habla
await p.evaluate(()=>{OPT.eter=false;ETER.t=-1e9;$('eterb').classList.remove('on');S.phase='wave';});await p.waitForTimeout(400);await p.evaluate(()=>{S.eter.leak=0;S.hp-=1;});await p.waitForTimeout(500);
ck(!(await p.evaluate(()=>$('eterb').classList.contains('on'))),'habla con la opción desactivada');
// 5. jefe a la vista y en el tutorial no habla
ck(!(await p.evaluate(()=>{OPT.eter=true;ETER.t=-1e9;const t=S.tut;S.tut={};const r=eterSay('boss',1);S.tut=t;return r;})),'habla en el tutorial');
await p.evaluate(()=>{ETER.t=-1e9;$('eterb').classList.remove('on');spawnEnemy('boss',S.portals[0]);});await p.waitForTimeout(500);
ck(await p.evaluate(()=>$('eterb').classList.contains('on')&&/jefe|fragmento/i.test($('eterb').textContent)),'no avisa del jefe');
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'eter ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
