// v305 · Vistas previas: enemigos en una tarjeta con scroll y filtros (era y tipo); el núcleo de la vista previa no cae nunca
const OUT=require('path').join(__dirname,'out');require('fs').mkdirSync(OUT,{recursive:true});
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:800}});const errs=[];p.on('pageerror',e=>errs.push(e.message));const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Test',intro:1,e2n:1,e2a:1,e2v:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.u_era=true;OPT.u_cp=true;RL.hpick=false;for(const k of Object.keys(ET))see('en',k);for(const k of Object.keys(TW))see('tw',k);
 lbOpen('cp');CP.tab='tw';CP.sel.tw='arrow';CP.pen='norm';CP.prev='arrow';newPrev('arrow','norm');renderComp();});
await p.waitForTimeout(500);
const r=await p.evaluate(()=>{const out={};const box=document.querySelector('#comp .bkpven');out.box=!!box;if(!box)return out;const cs=getComputedStyle(box);out.scroll=cs.overflowY==='auto'&&box.scrollHeight>box.clientHeight;
 out.filters=document.querySelectorAll('#comp [data-a="pvenf"][data-f="era"]').length===3&&document.querySelectorAll('#comp [data-a="pvenf"][data-f="ty"]').length>=3;
 document.querySelector('#comp [data-a="pvenf"][data-f="era"][data-v="2"]').click();const vis=[...box.querySelectorAll('.bkpill')].filter(x=>x.style.display!=='none'&&!x.classList.contains('on'));out.era2=vis.length>0&&vis.every(x=>(ET[x.dataset.v].era||1)===2);
 document.querySelector('#comp [data-a="pvenf"][data-f="era"][data-v=""]').click();document.querySelector('#comp [data-a="pvenf"][data-f="ty"][data-v="b"]').click();const vb=[...box.querySelectorAll('.bkpill')].filter(x=>x.style.display!=='none'&&!x.classList.contains('on'));out.boss=vb.length>0&&vb.every(x=>pvTy(x.dataset.v)==='b');
 // un jefe que llega al núcleo de la vista previa: no se pierde la partida y la vista sigue
 newPrev('arrow','argos');const real=S,ph=real&&real.phase;S=PV.S;try{S.enemies.push({t:'argos',x:S.core.x,y:S.core.y,tx:S.core.x,ty:S.core.y,hp:1e6,max:1e6,fx:{},src:null,sh:1});update(.05);update(.05);out.core=S.hp>0&&S.phase==='wave';}finally{S=real;}out.real=(S&&S.phase)===ph&&!!PV;
 return out;});
await p.screenshot({path:OUT+'/vista_enemigos.png'});
for(const k of ['box','scroll','filters','era2','boss','core','real'])ck(r[k],k);
console.log(fails.length?'FALLOS '+JSON.stringify(fails)+' '+JSON.stringify(r):'vista ok');console.log('ERRS '+JSON.stringify(errs));await b.close();if(fails.length||errs.length)process.exit(1);})();
