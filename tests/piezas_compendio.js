// v305 · Compendio de piezas: solo las variantes de solares vistas y el decorado de cada era
const OUT=require('path').join(__dirname,'out');require('fs').mkdirSync(OUT,{recursive:true});
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:800}});const errs=[];p.on('pageerror',e=>errs.push(e.message));const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Test',intro:1,e2n:1,e2a:1,e2v:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.u_era=true;OPT.u_cp=true;RL.hpick=false;const out={};
 const pi=PIECES.findIndex(o=>(SOLARES[o.n]||[]).length>1),n=PIECES[pi].n;for(const o of PIECES)see('pc',o.n);
 lbOpen('cp');CP.tab='pc';CP.sel.pc=String(pi);renderComp();out.noV=!document.querySelector('#comp [data-a="cpcv2"]');
 PCVS[n]=[1];renderComp();out.v=!!document.querySelector('#comp [data-a="cpcv2"]');
 out.era=document.querySelectorAll('#comp [data-a="cpce"]').length===2;const cn=document.querySelector('#comp canvas[data-pi]');const d1=cn.toDataURL();
 document.querySelector('#comp [data-a="cpce"][data-v="2"]').click();const d2=document.querySelector('#comp canvas[data-pi]').toDataURL();out.diff=d1!==d2;
 // en partida se apuntan las variantes que salen
 PCVS={};startGame(15);let seenV=Object.keys(PCVS).length>0;out.rec=seenV;
 lbOpen('cp');CP.tab='pc';CP.sel.pc=String(pi);CP.pce[pi]=2;renderComp();return out;});
await p.waitForTimeout(300);await p.screenshot({path:OUT+'/piezas_compendio.png'});
for(const k of ['noV','v','era','diff','rec'])ck(r[k],k);
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'piezas ok');console.log('ERRS '+JSON.stringify(errs));await b.close();if(fails.length||errs.length)process.exit(1);})();
