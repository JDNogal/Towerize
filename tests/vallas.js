// Vallas (v329): las piezas solo se unen por las salidas; si dos caminos se tocan fuera de una salida, hay valla y no se pasa
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Test',intro:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;ERA=1;startGame(15);if(DLG.on)dlgEnd();RL.open=false;HQ.q=[];if(HQ.cur)hintClose();
 S.cc=Array.from({length:NC},()=>Array(NC).fill(0));S.cells=Array.from({length:N},()=>Array(N).fill(0));
 const set=(x,y)=>{S.cc[y][x]=2;for(let j=0;j<K;j++)for(let i=0;i<K;i++)S.cells[y*K+j][x*K+i]=2;};
 // pieza (1,0): camino de la salida izquierda (7,3) al núcleo (10,3) y subiendo por su borde izquierdo (7,0..3)
 for(let x=7;x<=10;x++)set(x,3);for(let y=0;y<=3;y++)set(7,y);
 // pieza (0,0): camino pegado a su borde derecho (6,0..2), sin salida
 for(let y=0;y<=2;y++)set(6,y);
 S.core={x:10*K+1,y:3*K+1};const F=field();const o={};
 o.across=F[1*K+1][6*K+1];o.own=F[1*K+1][7*K+1];o.fences=fences().length;
 o.cut=[cutC(6,1,7,1),cutC(6,3,7,3),cutC(3,6,3,7),cutC(2,6,2,7)];o.exit=[exitL(3,0),exitL(0,3),exitL(2,0)];
 S.blocks={'0,0':1,'1,0':1};S.phase='build';CAM.x=0;CAM.y=0;return o;});
console.log(JSON.stringify(r));
ck(r.across>=1e9&&r.own<1e9,'la valla corta el paso entre piezas');ck(r.fences===3,'3 tramos de valla');
ck(r.cut.join()==='true,false,false,true','solo se cruza por las salidas');ck(r.exit.join()==='true,true,false','salidas en D1, A4, G4 y D7');
await p.waitForTimeout(400);await p.screenshot({path:'tests/out/vallas.png'});
await b.close();if(errs.length)console.log('ERRS',errs);if(fails.length||errs.length){console.log(fails.join("\n"));process.exit(1);}console.log("ok");})();
