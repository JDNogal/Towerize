// v363 · Una sola regla de vida (también en el tutorial) (Nogal, 20-nov): Lobato, Lobo gris, El Lobo, Mamá dragona y Bob tienen vida fija hasta la ronda 15 (+12 % por ronda después),
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
 // el tutorial también: vida fija, y sus oleadas suben con enemigos mejores (vida total parecida a la de antes)
 S.tut={};o.tutNorm=v('norm',10);o.tutBob=v('bob',10);o.tw=[5,6,7,8,9,10].map(rd=>{let t=0;for(const k of TUTW[rd])for(const u in SQUADS[k].m)t+=SQUADS[k].m[u]*v(u,rd);return Math.round(t);}).join('/');o.tn=[5,6,7,8,9,10].map(rd=>TUTW[rd].reduce((a,k)=>a+Object.values(SQUADS[k].m).reduce((x,y)=>x+y,0),0)).join('/');o.tnew=[['vet',5],['runner',6],['armored',7],['custodian',8],['champ',9]].every(([u,rd])=>TUTW[rd].some(k=>SQUADS[k].m[u]));S.tut=null;
 return o;});
console.log(JSON.stringify(r));
ck(r.fix==='cub:15/15/15/17 greyw:300/300/300/336 bigw:1300/1300/1300/1456 momdrg:1300/1300/1300/1456 bob:6000/6000/6000/6720','vida fija de los de evento y Bob ('+r.fix+')');
ck(r.norm==='25/25','el Orco no cambia');
ck(r.c3===8&&r.c12===13&&r.c15===16&&r.one===1,'Lobatos según la ronda: 8 / 13 / 16; los que van solos no cambian');
ck(!/ronda 1[)5]/.test(r.info)&&/Vida300/.test(r.info),'la ficha del Lobo gris enseña una sola vida ('+r.info.slice(0,60)+')');
ck(r.ehp1===1300,'compendio: Mamá dragona 1300');
ck(r.tutBob===6000&&r.tutNorm===25,'tutorial: vida fija también');
{const N=r.tn.split('/').map(Number),O=[10,15,16,20,20,25];ck(N.every((x,i)=>x<=O[i]+2),'tutorial: no más enemigos que antes ('+r.tn+')');ck(r.tnew,'tutorial: cada ronda de la 5 a la 9 trae su enemigo nuevo');const T=r.tw.split('/').map(Number);ck(T.slice(0,5).every((x,i)=>!i||x>=T[i-1]),'tutorial: la vida sube de ronda en ronda hasta la 9 ('+r.tw+')');}
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'vida_fija_v363 ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
