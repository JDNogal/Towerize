// v361: el nombre de cada barra de mecánica abre el bocadillo de SU palabra clave (antes «Carga del juicio» abría el de Electrizado y la Red, el de Rebote)
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(700);
const r=await p.evaluate(()=>{const bad=[];const tx=h=>{const d=document.createElement('div');d.innerHTML=h||'';const b=d.querySelector('b');return (b?b.textContent:d.textContent).trim().toLowerCase();};
 for(const M of TMECH){const id=ftMkw(M);let h='';try{h=kwHtml0(id,'');}catch(e){}const t=tx(h),n=String(M.n).trim().toLowerCase();if(!h||t!==n)bad.push(M.k+': «'+M.n+'» abre «'+(t||'nada')+'» ('+id+')');}
 return bad;});
const fails=[...r];if(errs.length)fails.push('errores: '+errs.join(' | '));
if(fails.length)console.log('FALLOS\n'+fails.join('\n'));else console.log('barras con su palabra ok');await b.close();process.exit(fails.length?1:0);})();
