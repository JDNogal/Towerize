const OUT=require('path').join(__dirname,'out');require('fs').mkdirSync(OUT,{recursive:true});
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
for(const [w,h] of [[1160,824],[1121,754],[900,600],[1280,720],[1920,1080]]){const p=await b.newPage({viewport:{width:w,height:h}});await p.goto('file://'+process.argv[2]);await p.waitForTimeout(700);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;lbOpen('op');});await p.waitForTimeout(200);
const r=await p.evaluate(()=>{const q=s=>{const e=$('comp').querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return [Math.round(r.left),Math.round(r.right)];};return {bk:q('.bkcover'),rib:q('.bkribs'),nar:$('comp').classList.contains('narrow')};});
console.log(w,h,JSON.stringify(r),r.rib?(r.rib[1]<=w&&r.bk[0]>=0?'OK':'CORTA'):'(estrecho, sin cintas)');
if(w===1160)await p.screenshot({path:OUT+'/edge1160.png'});await p.close();}
await b.close();})();
