// Eventos en pergamino: cada evento y cada opción tienen su dibujo; el cofre y el reactor muestran el final bueno o el malo.
const {chromium,devices}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
for(const mob of [false,true]){const ctx=await b.newContext(mob?devices['iPhone 13 landscape']:{viewport:{width:1280,height:720}});const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Test',intro:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;startGame(15);chooseHero('reinhart');if(DLG.on)dlgEnd();try{if(LB.open)lbClose(true);}catch(e){}
 RL.open=false;HQ.q=[];if(HQ.cur)hintClose();S.phase='build';S.gold=999;S.hp=20;
 const miss=[];for(const id in EVENTS){const E=EVENTS[id];if(!/<svg/.test(evImg(id)))miss.push(id);E.opts.forEach((o,k)=>{if(!/<svg/.test(evImg(id,k,[])))miss.push(id+':'+k);});}
 openEvent('merchant','0,0');const pap=document.querySelector('#relic .ppap.evp'),img=document.querySelector('#relic .evp .evimg svg'),nOpt=document.querySelectorAll('#relic .evp .evopts .evo').length;
 const fit=pap?pap.getBoundingClientRect().bottom<=innerHeight+2:false;
 const alt=[evImg('chest',0,['relicx'])!==evImg('chest',0,['more:30']),evImg('lab',2,['gold:200'])!==evImg('lab',2,['hp:-3'])];
 chooseEvent(2);const res=document.querySelector('#relic .evp .evimg svg')&&!!document.querySelector('#relic .evp [data-a="evok"]');
 return {miss,pap:!!pap,img:!!img,nOpt,fit,alt,res};});
ck(!r.miss.length,'faltan dibujos: '+r.miss.join(', '));ck(r.pap&&r.img,'el evento no sale en el pergamino con su dibujo');ck(r.nOpt===3,'no salen las 3 opciones del mercader');
ck(r.fit,'el pergamino del evento se sale de la pantalla'+(mob?' (móvil)':''));ck(r.alt.every(Boolean),'el cofre o el reactor no cambian de dibujo según el final');ck(r.res,'el resultado no sale con su dibujo y «Continuar»');
await p.evaluate(()=>{closeEvent();openEvent('pigs','0,0');});await p.waitForTimeout(1500);
const f2=await p.evaluate(()=>{const pp=document.querySelector('#relic .ppap.evp');return pp?pp.getBoundingClientRect().bottom<=innerHeight+2:false;});ck(f2,'el evento de 4 opciones se sale de la pantalla'+(mob?' (móvil)':''));
await ctx.close();}
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'eventos ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
