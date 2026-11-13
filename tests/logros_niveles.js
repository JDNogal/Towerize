// Logros por niveles: bronce/plata/oro/platino, bajas por torre (con su borde) y Estadísticas › Marcas
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;
 const o={};o.lv=[achLv('first'),achLv('hunt'),achLv('marathon'),achLv('plat'),achLv('k_arrow_g'),achLv('pigs'),achLv('cloink')].join();
 o.tro=/#c8803a/.test(ACH.first.ic)&&/#c8d0d8/.test(ACH.hunt.ic)&&/#f2c140/.test(ACH.marathon.ic);
 startGame(15);chooseHero('reinhart');if(DLG.on)dlgEnd();HQ.q=[];RL.open=false;$('relic').classList.remove('open');
 const t={type:'arrow',lvl:1,x:0,y:0};PRG.twk.arrow=2499;achDeath({t:'norm',hp:0,src:t,x:0,y:0});o.k=PRG.twk.arrow;o.bronze=!!ACHS.k_arrow_b;o.best=twBest('arrow');
 for(const k of Object.keys(TW).slice(0,8))SEEN.tw[k]=1;STW.tab='mk';lbOpen('st');o.rows=document.querySelectorAll('.mktab tr[data-a="mksel"]').length;o.nums=document.querySelectorAll('.mkh').length;o.det=!!document.querySelector('.mkdet');
 return o;});
console.log(JSON.stringify(r));
ck(r.lv==='b,s,g,p,g,s,g','niveles de los logros: '+r.lv);ck(r.tro,'el trofeo de cada logro va en su metal');
ck(r.k===2500&&r.bronze&&r.best==='b','las bajas con una torre deben contar y dar el logro de bronce a las 2.500');
ck(r.rows>=3&&r.nums===7&&r.det,'Estadísticas › Marcas: tabla de torres con 7 columnas numeradas y el detalle de la torre');
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'logros_niveles ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
