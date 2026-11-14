// v333 · Desde el menú principal, cerrar cualquier página del libro (✕ o Esc), Novedades incluida, vuelve a la portada (antes, en Novedades, el libro desaparecía y no se podía hacer nada)
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:720}});const errs=[],fails=[];p.on('pageerror',x=>errs.push(x.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Test',intro:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(1000);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;});await p.waitForTimeout(400);
for(const [a,v] of [['novopen',''],['lbarea','cp'],['lbarea','lg'],['lbarea','pt'],['lbarea','op'],['lbarea','hp'],['lbarea','cr']])for(const how of ['x','esc']){
 await p.evaluate(()=>lbOpen(null,true));await p.waitForTimeout(350);
 const el=await p.$(v?`#comp [data-a="${a}"][data-v="${v}"]`:`#comp [data-a="${a}"]`);if(!el){fails.push('no encuentro '+a+' '+v);continue;}await el.click();await p.waitForTimeout(600);
 if(how==='x'){const x=await p.$('#comp .bkx:not(.bkhist)');if(x)await x.click();}else await p.keyboard.press('Escape');await p.waitForTimeout(500);
 const s=await p.evaluate(()=>({open:LB.open,cover:LB.cover}));if(!s.open||!s.cover)fails.push(`${a} ${v} (${how}): el libro no vuelve a la portada`);}
await b.close();if(errs.length)console.log('ERRS',errs);if(fails.length||errs.length){console.log('FALLOS',JSON.stringify(fails));process.exit(1);}console.log('ok');})();
