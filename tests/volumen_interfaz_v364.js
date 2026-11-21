// v364 · Volumen: barra «Interfaz» aparte de «Efectos» (botones, pasar el ratón, cerrar, páginas, libro) y quien ya tenía Efectos guardado empieza con Interfaz igual
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Test',intro:1,e2n:1,e2a:1,e2v:1}));localStorage.setItem('rt-opts',JSON.stringify({vf:40}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const out={};
 out.migra=OPT.vi===40&&OPT.vf===40;
 out.opcion=OPTS.some(o=>o.key==='vi'&&o.tab==='vol'&&o.type==='slider'&&o.label==='Interfaz');
 OPT.vm=100;OPT.vf=50;OPT.vi=20;
 out.ui=['ui','uih','uix','page','bkopen','bkclose','err'].every(k=>Math.abs(sndVol(k)-.2)<1e-9);
 out.fx=['build','h_arrow','coin','kill_w','boss','wave'].every(k=>Math.abs(sndVol(k)-.5)<1e-9);
 OPT.vm=50;out.general=Math.abs(sndVol('ui')-.1)<1e-9&&Math.abs(sndVol('build')-.25)<1e-9;
 return out;});
const bad=Object.entries(r).filter(([k,v])=>v!==true).map(([k])=>k);console.log(JSON.stringify(r));if(bad.length){console.log('FALLA: '+bad.join(', '));process.exit(1);}
await b.close();if(errs.length){console.log('ERRS '+JSON.stringify(errs));process.exit(1);}console.log('ok');})();
