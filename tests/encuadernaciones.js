const OUT=require('path').join(__dirname,'out');require('fs').mkdirSync(OUT,{recursive:true});
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:720}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.u_cs=true;OPT.hints=false;localStorage.setItem('rt-tutchoice','skip');startGame(15);chooseHero('sylvana');});
const out=[];for(const pal of COSM_IDS=await p.evaluate(()=>COSM.pal.map(c=>c.id))){
 const r=await p.evaluate(pal=>{OPT.pal=pal;applyPal();const cs=getComputedStyle(document.documentElement);const v=k=>cs.getPropertyValue(k).trim();return [document.documentElement.dataset.pal,!!v('--lea'),!!v('--paper'),getComputedStyle($('sh')).color];},pal);
 out.push(r[0]+(r[1]&&r[2]?' ok':' SIN VARIABLES'));if(pal==='noche'||pal==='amb'||pal==='esc')await p.screenshot({path:OUT+'/enc_'+pal+'.png'});}
console.log(out.join(' · '));
console.log('inicial perg',await p.evaluate(()=>{OPT.pal='nada';applyPal();return document.documentElement.dataset.pal;}));
console.log(JSON.stringify(errs));await b.close();})();
