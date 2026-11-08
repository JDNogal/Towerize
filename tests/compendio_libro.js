const OUT=require('path').join(__dirname,'out');require('fs').mkdirSync(OUT,{recursive:true});
const {chromium,devices}=require('playwright');(async()=>{const b=await chromium.launch();const mob=process.argv[3]==='m';
const ctx=await b.newContext(mob?{...devices['iPhone 13 landscape']}:{viewport:{width:1280,height:800}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await p.addInitScript(()=>{try{localStorage.setItem('rt-seen',JSON.stringify({tw:{arrow:1,cata:1,orb:1,straw:1,dragon:1},pc:{Recta:1,Esquina:1,Cruce:1},bf:{rng:1,pow:1},en:{norm:1,runner:1,armored:1},rl:{horn:1,coin:1},hr:{},ev:{merchant:1}}));localStorage.setItem('rt-opts',JSON.stringify({u_cpa:true}));localStorage.setItem('rt-story',JSON.stringify({intro:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;});
const shot=async n=>{await p.waitForTimeout(450);await p.screenshot({path:`${OUT}/bk_${mob?'m':'pc'}_${n}.png`});};
await p.evaluate(()=>{toggleComp(true);CP.tab='tw';renderComp();});await shot('tw');
if(mob){await p.click('.bti[data-v="arrow"]');await shot('tw_det');await p.click('[data-a="cbkl"]');}
await p.click('.bti[data-v="frost"]');await shot('frost');
await p.click('[data-a="cachgo"]');await p.waitForTimeout(200);await shot('lg');
if(mob)await p.evaluate(()=>{CP.pageR=false;});
for(const t of ['hr','pc','bf','rl','en','ev']){await p.evaluate(t=>{CP.tab=t;CP.pageR=false;renderComp();},t);await shot(t);}
await p.evaluate(()=>{CP.tab='tw';CP.sel.tw='arrow';CP.pageR=true;renderComp();});await p.click('.bkgo');await shot('prev');
console.log(errs);await b.close();})();
