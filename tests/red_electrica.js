// v305 · Red eléctrica: se conecta con las demás que estén dentro de su alcance (no a 3 casillas fijas)
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-story',JSON.stringify({p:3,name:'T',intro:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{ERA=2;startGame(15);const mk=(x,y)=>({id:Math.random(),type:'laser',lvl:4,spec:'red',x,y,ab:{},acd:{},cells:[]});const a=mk(10,10),R=stats(a).range;
 const near=mk(10+R*.95,10),far=mk(10+R*1.1,10+40*K);S.list=[a,near,far];S.phase='wave';laserTick(.05);
 return {rg:R/K,ok:S.net.length===1&&S.net[0].includes(near)&&!S.net.some(x=>x.includes(far)),beyond3:R>3.5*K,txt:!/3 casillas/.test(SPECS.laser.red.d)};});
console.log(JSON.stringify(r));const bad=['ok','beyond3','txt'].filter(k=>!r[k]);if(bad.length||errs.length){console.log('FALLA: '+bad.join(', ')+' '+errs.join(';'));process.exit(1);}await b.close();})();
