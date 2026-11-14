// v332 · Elegir tutorial: tocar un tutorial solo lo elige (aunque cambies de uno a otro); «Empezar el tutorial» / «Ver el repaso»
// lo empiezan (antes el botón no hacía nada); «Saltar tutorial» funciona; y la historia sale en los tres casos (con el rápido, al acabarlo)
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[],fails=[];
for(const mode of ['tutfull','tutquick','quickskip','skip']){const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',x=>errs.push(mode+': '+x.message));
 await p.addInitScript(()=>{try{if(!sessionStorage.getItem('x')){localStorage.clear();sessionStorage.setItem('x',1);}}catch(e){}});
 await p.goto('file://'+process.argv[2]);await p.waitForTimeout(1000);
 await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;renderTutPick();});await p.waitForTimeout(600);
 const st=()=>p.evaluate(()=>({step:LB.step,tut:!!(S&&S.tut),qs:!!QS.on,intro:+STO.intro||0,story:!!(typeof INTRO!=='undefined'&&INTRO.on)}));
 if(mode==='skip'){await p.click('[data-a="tutskip"]');await p.waitForTimeout(600);if((await st()).step!=='skip')fails.push('saltar: no sale la página de «Tutorial saltado»');await p.click('[data-a="skipok"]');await p.waitForTimeout(1500);}
 else{const t=mode==='tutfull'?'tutfull':'tutquick',o=t==='tutfull'?'tutquick':'tutfull';
  // cambiar de uno a otro solo elige
  await p.click(`[data-a="${t}"]`);await p.waitForTimeout(250);await p.click(`[data-a="${o}"]`);await p.waitForTimeout(250);await p.click(`[data-a="${o}"]`);await p.waitForTimeout(250);await p.click(`[data-a="${t}"]`);await p.waitForTimeout(250);
  let s=await st();if(s.step!=='learn'||s.tut||s.qs)fails.push(mode+': tocar los tutoriales empieza uno en vez de solo elegirlo');
  await p.click('[data-a="tutgo"]');await p.waitForTimeout(1200);s=await st();
  if(t==='tutfull'&&!s.tut)fails.push('completo: «Empezar el tutorial» no lo empieza');
  if(t==='tutquick'){if(!s.qs)fails.push('rápido: «Ver el repaso» no lo abre');
   if(s.intro||s.story)fails.push('rápido: la historia sale antes del repaso');
   if(mode==='quickskip')await p.evaluate(()=>{const b=[...document.querySelectorAll('#msetup button')].find(x=>/^Saltar$/.test(x.textContent.trim()));if(b)b.click();});
   else for(let i=0;i<12;i++){if(!(await st()).qs)break;await p.evaluate(()=>{const b=[...document.querySelectorAll('#msetup button')].find(x=>/Continuar|jugar/i.test(x.textContent));if(b)b.click();});await p.waitForTimeout(250);}
   await p.waitForTimeout(1500);}}
 const s=await st();if(!s.intro&&!s.story)fails.push(mode+': no sale la historia');
 await p.close();}
await b.close();if(errs.length)console.log('ERRS',errs);if(fails.length||errs.length){console.log('FALLOS',JSON.stringify(fails));process.exit(1);}console.log('ok');})();
