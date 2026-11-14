// Rangos nuevos de amenazas (v329): Supercampeones R3 extremo, Sabotaje R2, Abanderados R2, Asedio R3, Saqueadores R2, Inflación R2
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage();p.on('pageerror',e=>errs.push(e.message));await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{INTRO.on=false;STO.intro=1;const o={};const L=id=>AZT.find(x=>x[0]===id)[3].length;
 o.n={ven:L('ven'),sup:L('sup'),sab:L('sab'),aba:L('aba'),ase:L('ase'),saq:L('saq'),inf:L('inf')};o.ext=AZX.sup;
 startGame(15);chooseHero('reinhart');for(let i=0;i<5&&DLG.on;i++)dlgEnd();HQ.q=[];try{lbClose(true);}catch(e){}
 const k=Object.keys(TW).find(k=>TW[k].cost&&!TW[k].uniq&&!TW[k].era);const mk=()=>({type:k,lvl:1,cells:[],x:0,y:0});
 S.list=[mk(),mk()];S.amz={inf:1};azInfl();o.c1=TW[k].cost/TW[k].cost0;S.amz={inf:2};azInfl();o.c2=TW[k].cost/TW[k].cost0;
 o.up1=tCost(S.list[0],100);S.amz={};o.up0=tCost(S.list[0],100);S.list=[];azInfl();return o;});
console.log(JSON.stringify(r));
ck(r.n.ven===2&&r.n.sup===3&&r.n.sab===2&&r.n.aba===2&&r.n.ase===3&&r.n.saq===2&&r.n.inf===2,'rangos nuevos en la lista');ck(r.ext===3,'Supercampeones R3 es extremo');
ck(Math.abs(r.c1-1.2)<.02&&Math.abs(r.c2-1.3)<.02,'Inflación: +10 % / +15 % por torre igual');ck(r.up1===115&&r.up0===100,'Inflación R2 encarece las mejoras');
await b.close();if(errs.length)console.log('ERRS',errs);if(fails.length||errs.length){console.log(fails.join("\n"));process.exit(1);}console.log("ok");})();
