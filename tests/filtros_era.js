// v305 · Compendio: una sola sección por familia (sin «· Distópica») y filtro por era en torres, enemigos, héroes, reliquias y eventos
const OUT=require('path').join(__dirname,'out');require('fs').mkdirSync(OUT,{recursive:true});
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:800}});const errs=[];p.on('pageerror',e=>errs.push(e.message));const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Test',intro:1,e2n:1,e2a:1,e2v:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.u_era=true;OPT.u_cp=true;OPT.u_hr=true;OPT.u_rl=true;OPT.u_tw=true;RL.hpick=false;lbOpen('cp');const out={};
 out.noSplit=!EFAM.some(([n])=>/Distópica/.test(n))&&EFAM.find(x=>x[0]==='Guerreros')[1].includes('auto');
 for(const k of Object.keys(ET))see('en',k);for(const k of Object.keys(TW))see('tw',k);for(const x of RELICS)see('rl',x.id);for(const k of Object.keys(EVENTS))see('ev',k);
 CP.flt={};const secs=t=>bkItems(t).filter(x=>x.sec).map(x=>x.sec);out.twSecs=secs('tw').join('|');out.enDup=secs('en').some(s=>/Distópica/.test(s));
 out.dbg=JSON.stringify(eraSeen('rl'))+eraSeen('hr').toString();out.row=['tw','en','hr','rl','ev'].map(t=>/data-f="era"/.test(bkFilters(t))?1:0).join('');
 CP.flt.era='2';const L=bkItems('en').filter(x=>x.id);out.only2=L.length>0&&L.every(x=>(ET[x.id].era||1)===2);out.noEmpty=bkItems('en').every((x,i,a)=>!x.sec||(a[i+1]&&!a[i+1].sec));
 CP.flt.era='1';out.only1=bkItems('tw').filter(x=>x.id&&!TW[x.id].uniq).every(x=>(TW[x.id].era||1)===1);
 lbOpen('cp');CP.tab='en';CP.flt={era:'2'};renderComp();return out;});
await p.waitForTimeout(500);await p.screenshot({path:OUT+'/filtros_era.png'});
ck(r.noSplit,'siguen familias «· Distópica»');ck(!/Distópica/.test(r.twSecs),'las torres siguen partidas por era: '+r.twSecs);ck(!r.enDup,'enemigos partidos por era');ck(r.row==='11111','falta el filtro de era en alguna pestaña: '+r.row+' '+r.dbg);
ck(r.only2&&r.only1,'el filtro de era no filtra');ck(r.noEmpty,'quedan secciones vacías');
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'filtros ok');console.log('ERRS '+JSON.stringify(errs));await b.close();if(fails.length||errs.length)process.exit(1);})();
