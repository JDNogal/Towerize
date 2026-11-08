// Radagast se desbloquea al ganar la primera partida aunque se haya saltado el tutorial
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
for(const tut of [0,1]){const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(t=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');if(t)localStorage.setItem('rt-tutdone','1');}catch(e){}},tut);
 await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
 const r=await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.u_hr=false;applyUnl();const before=!!HEROES.radagast.lockTxt;
  startGame(15);chooseHero('sylvana');S.phase='won';endGame();return {before,after:!!HEROES.radagast.lockTxt,nu:NEWU.some(u=>u.id==='radagast'),flag:localStorage.getItem('rt-win1')};});
 if(!tut){ck(r.before,'Radagast desbloqueado sin jugar');ck(!r.after,'no se desbloquea al ganar la primera partida');ck(r.nu,'no sale en Nuevos desbloqueos');ck(r.flag==='1','no se guarda');}
 else{ck(!r.before,'con el tutorial hecho sigue bloqueado');ck(!r.nu,'se anuncia otra vez aunque ya lo tenía');}
 await p.close();}
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'radagast ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
