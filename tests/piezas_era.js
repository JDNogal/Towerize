// Piezas por era (v329): las 4 de la era 2 entran 2/1/1 en sus tres primeras partidas; en la era 1 no salen hasta descubrirlas
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage();p.on('pageerror',e=>errs.push(e.message));await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{INTRO.on=false;STO.intro=1;startGame(15);const s0=S;const NEW=['Desvío','Ocho','Recoveco','Rotonda'];
 const pool=(pp,bb,era)=>{STO.p=pp;STO.bb=bb;STO.bfz={};S=Object.assign({},s0,{era,tut:0});const r=NEW.filter(pieceOk).join(',');S=s0;return r;};
 const o={p:['#..####','#######','#######','#######','#######','#######','#######'],b:[{x:1,y:0,k:'rng'}]};mirO(o);const mir=o.p[0]+'|'+o.b[0].x;
 return {mir,g:[pool(0,0,1),pool(3,0,1),pool(3,0,2),pool(3,1,2),pool(3,2,2),pool(3,3,1)],n:PIECES.length};});
console.log(JSON.stringify(r));
ck(r.g[0]===''&&r.g[1]==='','en la era 1 no salen');ck(r.g[2]==='Desvío,Ocho','1.ª partida de la era 2: Desvío y Ocho');ck(r.g[3]==='Desvío,Ocho,Recoveco','2.ª: + Recoveco');ck(r.g[4]==='Desvío,Ocho,Recoveco,Rotonda','3.ª: + Rotonda');ck(r.g[5]==='Desvío,Ocho,Recoveco,Rotonda','descubiertas, salen también en la era 1');ck(r.n===12,'12 piezas');ck(r.mir==='####..#|5','espejo: camino y casillas especiales');
await b.close();if(errs.length)console.log('ERRS',errs);if(fails.length||errs.length){console.log(fails.join("\n"));process.exit(1);}console.log("ok");})();
