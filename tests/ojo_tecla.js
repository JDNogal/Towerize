// v334 · La tecla del ojo (Tab por defecto, o la que pongas) deja ver el mapa al elegir pieza y en las ventanas (antes, al elegir pieza, Tab saltaba entre botones)
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:720}});const errs=[],fails=[];p.on('pageerror',x=>errs.push(x.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Test',intro:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(900);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;ERA=1;startGame(15);chooseHero('reinhart');if(DLG.on)dlgEnd();HQ.q=[];if(HQ.cur)hintClose();S.revAt=0;ui();});await p.waitForTimeout(600);
await p.keyboard.press('Tab');await p.waitForTimeout(250);if(await p.evaluate(()=>S.ppk)!==1)fails.push('elegir pieza: Tab no deja ver el mapa');
await p.keyboard.press('Tab');await p.waitForTimeout(250);if(await p.evaluate(()=>S.ppk)!==0)fails.push('elegir pieza: Tab no vuelve a las piezas');
await p.evaluate(()=>{KB.peek='o';});await p.keyboard.press('o');await p.waitForTimeout(250);if(await p.evaluate(()=>S.ppk)!==1)fails.push('elegir pieza: con otra tecla no funciona');await p.evaluate(()=>{KB.peek='tab';S.ppk=0;ui();});
await p.evaluate(()=>{S.phase='build';document.body.classList.remove('pcpick','pcpeek');const pb=document.getElementById('pcback');if(pb)pb.remove();openRelic();});await p.waitForTimeout(1500);
await p.keyboard.press('Tab');await p.waitForTimeout(250);if(!(await p.evaluate(()=>RL.peek)))fails.push('cofre: Tab no deja ver el mapa');
await b.close();if(errs.length)console.log('ERRS',errs);if(fails.length||errs.length){console.log('FALLOS',JSON.stringify(fails));process.exit(1);}console.log('ok');})();
