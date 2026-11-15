// La casilla Expansión (y la bendición) agranda el cono de la Salamandra y los radios de las habilidades
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;startGame(15);chooseHero(HIDS()[0]);if(DLG.on)dlgEnd();
 const t={type:'sala',lvl:1,x:10,y:10,cells:[[10,10]],ab:{},acd:{},spec:null},tg={x:20,y:10,hp:100},h=[];
 const cone=()=>{flameTick(t,tg,stats(t),1,TW.sala);return Math.round(t.fl.h*360/Math.PI);};h.push(cone());S.buff[10][10]='aoe';h.push(cone());S.buff[10][10]='aoe+';h.push(cone());
 const o={type:'arrow',lvl:4,spec:'rapid',x:10,y:10,cells:[[10,10]],ab:{rain:1},acd:{}};const r1=abRank(o,'rain').r;S.buff[10][10]=0;const r0=abRank(o,'rain').r;
 return {h,r0,r1,base:AB.rain.ranks[0].r};});
ck(r.h[0]===60,'el cono base no es de 60°: '+r.h[0]);ck(r.h[1]>r.h[0]&&r.h[2]>r.h[1],'la casilla Expansión no agranda el cono de la Salamandra: '+r.h);
ck(r.r0===r.base&&r.r1>r.r0,'la casilla Expansión no agranda el radio de Lluvia de flechas: '+r.r0+' → '+r.r1);ck(r.base===1.5,'Expansión ha cambiado el radio base de la habilidad');
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'area_casillas ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
