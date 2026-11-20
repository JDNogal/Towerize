// v363 · Una sola regla de vida (Nogal, 20-nov): Lobato, Lobo gris, El Lobo, Mamá dragona y Bob tienen vida fija hasta la ronda 15 (+12 % por ronda después),
// los Lobatos del evento son más cuantos más tarde (regla de los escuadrones) y el compendio enseña una sola cifra de vida.
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;
 startGame(15);const o={};const v=(k,rd)=>Math.round(ehpOf(k,rd));
 o.fix=['cub','greyw','bigw','momdrg','bob'].map(k=>k+':'+v(k,1)+'/'+v(k,10)+'/'+v(k,15)+'/'+v(k,16)).join(' ');
 o.norm=v('norm',1)+'/'+v('norm',15);
 S.round=3;o.c3=evN(8);S.round=12;o.c12=evN(8);S.round=15;o.c15=evN(8);o.one=evN(1);
 const d=document.createElement('div');d.innerHTML=enemyInfo('greyw');o.info=d.textContent;o.ehp1=ehp1('momdrg');
 // el tutorial sigue con la regla vieja salvo Bob
 S.tut={};o.tutNorm=v('norm',10);o.tutBob=v('bob',10);S.tut=null;
 return o;});
console.log(JSON.stringify(r));
ck(r.fix==='cub:15/15/15/17 greyw:300/300/300/336 bigw:1300/1300/1300/1456 momdrg:1300/1300/1300/1456 bob:6000/6000/6000/6720','vida fija de los de evento y Bob ('+r.fix+')');
ck(r.norm==='25/25','el Orco no cambia');
ck(r.c3===8&&r.c12===13&&r.c15===16&&r.one===1,'Lobatos según la ronda: 8 / 13 / 16; los que van solos no cambian');
ck(!/ronda 1[)5]/.test(r.info)&&/Vida300/.test(r.info),'la ficha del Lobo gris enseña una sola vida ('+r.info.slice(0,60)+')');
ck(r.ehp1===1300,'compendio: Mamá dragona 1300');
ck(r.tutBob===6000&&r.tutNorm>25,'tutorial: Bob con vida fija y el resto aún con la regla vieja');
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'vida_fija_v363 ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
