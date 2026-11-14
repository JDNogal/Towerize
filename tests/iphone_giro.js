// v330 · iPhone: al girar, el lienzo se vuelve a medir aunque el aviso de iOS llegue antes de tiempo
const {chromium,devices}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const c=await b.newContext({...devices['iPhone 13 landscape']});const p=await c.newPage();p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Test',intro:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;startGame(15);});

// iOS: el lienzo se queda con las medidas de antes de girar
await p.evaluate(()=>{VIEW=300;VH=600;cv.width=300;cv.height=600;});await p.waitForTimeout(900);
const r=await p.evaluate(()=>{const R=cv.getBoundingClientRect(),d=Math.min(2,devicePixelRatio||1);return {w:cv.width,h:cv.height,rw:Math.round(R.width*d),rh:Math.round(R.height*d)};});
console.log(JSON.stringify(r));const ok=Math.abs(r.w-r.rw)<=2&&Math.abs(r.h-r.rh)<=2&&r.w>r.h&&!errs.length;
await b.close();if(errs.length)console.log('ERRS',errs);if(!ok){console.log('FALLOS ["lienzo sin volver a medir"]');process.exit(1);}console.log('ok');})();
