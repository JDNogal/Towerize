// «Mala suerte con red»: misma media que el azar puro y sin rachas largas; desde el 50 %, azar puro
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage();p.on('pageerror',e=>errs.push(e.message));await p.goto('file://'+process.argv[2]);await p.waitForTimeout(700);
const r=await p.evaluate(()=>{const o={};for(const pp of [.03,.1,.2,.4]){const ow={};let hit=0,run=0,maxr=0;const N=200000;for(let i=0;i<N;i++){if(prdRoll(ow,pp)){hit++;run=0;}else{run++;maxr=Math.max(maxr,run);}}o[pp]={avg:hit/N,maxr};}return o;});
r.luck=await p.evaluate(()=>{luckSet('t',0);const a=[...Array(4000)].map(()=>luckHigh('t',9000));const m0=a.reduce((x,y)=>x+y,0)/a.length;luckSet('t',1);const b=[...Array(4000)].map(()=>luckHigh('t',9000));const m1=b.reduce((x,y)=>x+y,0)/b.length;luckSet('t',0);return [Math.round(m0),Math.round(m1),JSON.parse(localStorage.getItem('rt-luck')).t];});
console.log(JSON.stringify(r));
for(const k in r){if(k==='luck')continue;const p=+k;ck(Math.abs(r[k].avg-p)<p*.06,'Media '+k+': '+r[k].avg.toFixed(4));}
ck(r.luck[0]>4000&&r.luck[0]<5000&&r.luck[1]>7000&&r.luck[2]===0,'suerte entre partidas: el empujón sube las lecturas y se guarda');ck(r['0.1'].maxr<=45,'Con un 10 %, como mucho ~45 fallos seguidos, frente a ~115 del azar puro ('+r['0.1'].maxr+')');
await b.close();if(errs.length)console.log('ERRS',errs);if(fails.length||errs.length){console.log(fails.join('\n'));process.exit(1);}})();
