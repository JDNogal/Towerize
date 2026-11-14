// Supercampeones: rasgos que se descubren al verlos (ficha de la amenaza, con y sin Apoyos, y Mecánicas)
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{if(!sessionStorage.getItem('x')){localStorage.clear();sessionStorage.setItem('x',1);}localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r={};
r.a=await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;STO.p=3;STO.supT={};
 startGame(15);chooseHero('reinhart');for(let i=0;i<5&&DLG.on;i++)dlgEnd();HQ.q=[];if(HQ.cur)hintClose();try{lbClose(true);}catch(e){}
 S.phase='wave';const e={t:'champ',x:3,y:3,hp:100,max:100,fx:{},sup:['sh','rg']};S.enemies.push(e);return 1;});
await p.waitForTimeout(700);
r.seen=await p.evaluate(()=>Object.keys(STO.supT||{}).sort().join(','));
await p.evaluate(()=>{S.enemies=[];S.phase='build';try{lbClose(true);}catch(e){}LB.area='prep';LB.step='era';lbOpen('prep');LB.step='amz';AZUI.sel='sup';lbRender();});await p.waitForTimeout(700);
r.sin=await p.evaluate(()=>({n:document.querySelectorAll('#comp .suptr .rg').length,on:document.querySelectorAll('#comp .suptr .rg.on').length,q:[...document.querySelectorAll('#comp .suptr .rg:not(.on) small')].map(x=>x.textContent)[0]}));
await p.screenshot({path:'tests/out/suptr_ficha.png'});
await p.evaluate(()=>{AZ.apw=7;lbRender();});await p.waitForTimeout(700);
r.con=await p.evaluate(()=>({n:document.querySelectorAll('#comp .suptr .rg').length,on:document.querySelectorAll('#comp .suptr .rg.on').length}));
await p.screenshot({path:'tests/out/suptr_ficha_apoyos.png'});
r.mc=await p.evaluate(()=>{const L=bkItems('mc');const i=L.findIndex(x=>x.sec==='Supercampeones');return i<0?null:L.slice(i+1,i+5).map(x=>x.n+':'+(x.ok?1:0)).join(',');});
console.log(JSON.stringify(r));
ck(r.seen==='rg,sh','se descubren los rasgos del supercampeón visto');
ck(r.sin.n===4&&r.sin.on===2&&/Todavía no has encontrado/.test(r.sin.q||''),'ficha: 4 rasgos, 2 descubiertos y el resto «???»');
ck(r.con.n===4&&r.con.on===2,'también en la doble página con Apoyos');
ck(r.mc==='Escudo frontal:1,???:0,Regeneración:1,???:0','Mecánicas › Supercampeones');
await b.close();if(errs.length)console.log('ERRS',errs);if(fails.length||errs.length){console.log(fails.join("\n"));process.exit(1);}console.log("ok");})();
