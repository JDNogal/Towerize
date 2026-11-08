const OUT=require('path').join(__dirname,'out');require('fs').mkdirSync(OUT,{recursive:true});
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1280,height:800}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.setItem('rt-seen',JSON.stringify({tw:{arrow:1,cata:1,orb:1,straw:1},pc:{},bf:{},en:{norm:1,runner:1},rl:{horn:1,coin:1},hr:{},ev:{merchant:1}}));localStorage.setItem('rt-opts',JSON.stringify({u_cpa:true}));localStorage.setItem('rt-story',JSON.stringify({intro:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;});
for(const tab of ['lg']){await p.evaluate(t=>{toggleComp(true);CP.tab=t;CP.af='ev';CP.prev=null;CP.solo=false;renderComp();},tab);await p.waitForTimeout(200);await p.screenshot({path:`${OUT}/cp_${tab}.png`});}
console.log(await p.evaluate(()=>[compOk(),achFound('pigs'),achFound('dragon'),achFound('zero'),achReq('zero')]));
console.log(errs);await b.close();})();
