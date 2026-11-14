// Enemigos que entran poco a poco: en la partida 1 de cada era solo salen los de pz 1; con la 3.ª pieza, todos
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;
 startGame(15);chooseHero('reinhart');for(let i=0;i<5&&DLG.on;i++)dlgEnd();try{lbClose(true);}catch(e){}
 const o={};const run=(era,pc)=>{S.era=era;if(era===2)STO.bb=pc;else STO.p=pc;const seen={},bad=[];for(let k=0;k<6;k++)for(let r=1;r<=15;r++){const W=waveSquads(r)||[];for(const x of W){const key=typeof x==='string'?x:(x.k||x.id||x);seen[key]=1;const s=SQUADS[key];if(s&&(s.pz||1)>pzMax())bad.push(key);}}return {n:Object.keys(seen).length,bad:[...new Set(bad)],seen:Object.keys(seen)};};
 o.e1p0=run(1,0);o.e1p1=run(1,1);o.e1p3=run(1,3);o.e2p0=run(2,0);o.e2p3=run(2,3);
 STO.p=0;S.era=1;o.elP1=ELV[1].mini.concat(ELV[1].elite).filter(k=>pzOk(ET[k].pz));
 return o;});
console.log(JSON.stringify(r));
ck(r.e1p0.n>0&&!r.e1p0.bad.length,'Era 1, partida 1: solo escuadras de la partida 1 ('+r.e1p0.seen.join(',')+')');
ck(r.e2p0.n>0&&!r.e2p0.bad.length,'Era 2, partida 1: solo escuadras de la partida 1 ('+r.e2p0.seen.join(',')+')');
ck(r.e1p3.n>r.e1p0.n&&r.e1p1.n>=r.e1p0.n,'Con más piezas salen más escuadras ('+r.e1p0.n+' → '+r.e1p1.n+' → '+r.e1p3.n+')');
ck(r.elP1.length===2,'Partida 1: un mini-élite y un élite ('+r.elP1.join(',')+')');
await b.close();if(errs.length)console.log('ERRS',errs);if(fails.length||errs.length){console.log(fails.join('\n'));process.exit(1);}})();
