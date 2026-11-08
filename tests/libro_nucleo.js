const OUT=require('path').join(__dirname,'out');require('fs').mkdirSync(OUT,{recursive:true});
const {chromium,devices}=require('playwright');(async()=>{const b=await chromium.launch();const mob=process.argv[3]==='m';
const ctx=await b.newContext(mob?{...devices['iPhone 13 landscape']}:{viewport:{width:1280,height:720}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);const sfx=mob?'m_':'';
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;localStorage.setItem('rt-tutchoice','skip');showMenu();});await p.waitForTimeout(400);
await p.screenshot({path:OUT+'/b5_'+sfx+'menu.png'});
console.log('menú: núcleo bajo el libro',await p.evaluate(()=>{const c=lbCorePos();const r=$('comp').querySelector('.lbcvin').getBoundingClientRect();return [Math.round(c.x),Math.round(c.y),Math.round(r.left+r.width/2),Math.round(r.top+r.height/2)];}));
await p.click('#comp [data-a="newgame"]');await p.waitForTimeout(100);await p.screenshot({path:OUT+'/b5_'+sfx+'open1.png'});await p.waitForTimeout(300);
await p.click('#comp [data-a="erago"]');await p.waitForTimeout(200);await p.click('#comp [data-a="begin"]');await p.waitForTimeout(500);
await p.evaluate(()=>{RL.hsel='sylvana';renderHeroPick();});await p.waitForTimeout(200);
await p.click('#comp [data-a="pickhero"]');await p.waitForTimeout(180);await p.screenshot({path:OUT+'/b5_'+sfx+'shrink.png'});await p.waitForTimeout(300);await p.screenshot({path:OUT+'/b5_'+sfx+'flash.png'});await p.waitForTimeout(500);
console.log('tras elegir',await p.evaluate(()=>[LB.open,$('comp').classList.contains('open'),$('comp').innerHTML.length,S.hero&&S.hero.id,S.speed]));
// pausa desde el núcleo
await p.evaluate(()=>{CAM.z=ZMAX*.9;camCenter(S.core.x+6,S.core.y+4);});await p.evaluate(()=>openPause());await p.waitForTimeout(120);await p.screenshot({path:OUT+'/b5_'+sfx+'pausegrow.png'});await p.waitForTimeout(400);await p.screenshot({path:OUT+'/b5_'+sfx+'pause.png'});
await p.evaluate(()=>closePause(true));await p.waitForTimeout(200);await p.screenshot({path:OUT+'/b5_'+sfx+'pauseshrink.png'});await p.waitForTimeout(400);
console.log('tras continuar',await p.evaluate(()=>[LB.open,$('comp').classList.contains('open'),S.speed,PMU.open]));
// abrir y cerrar rápido no deja restos
await p.evaluate(()=>{openPause();closePause(true);openPause();});await p.waitForTimeout(600);console.log('reabrir durante el cierre',await p.evaluate(()=>[LB.open,$('comp').classList.contains('open'),!!$('comp').querySelector('.lbcv')]));
await p.evaluate(()=>closePause(true));await p.waitForTimeout(600);
console.log(JSON.stringify(errs));await b.close();})();
