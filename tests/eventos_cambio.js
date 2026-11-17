// v358 · Eventos que no se pueden jugar bien se cambian por otro al abrirse (Nogal, 15 y 17-nov)
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Test',intro:1,e2n:1,e2a:1,e2v:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const out={};const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;
 ERA=1;startGame(15);chooseHero('reinhart');if(DLG.on)dlgEnd();try{lbClose(true);}catch(e){}S.revAt=0;S.chests={};S.evts={};RL.open=false;HQ.q=[];if(HQ.cur)hintClose();
 S.hp=20;S.gold=5000;S.hero.lvl=1;
 const NB=N/BN,keys=[];for(let by=0;by<BN;by++)for(let bx=0;bx<BN;bx++)keys.push(bx+','+by);
 const plain=keys.find(k=>!blockBuffs(k)),spec=keys.find(k=>k!==plain);
 {const[bx,by]=spec.split(',').map(Number);const bfk=Object.keys(BF).find(k=>!k.includes('+')&&!BF[k].free&&k!=='cur')||Object.keys(BF)[0];S.buff[by*NB]=S.buff[by*NB]||[];S.buff[by*NB][bx*NB]=bfk;}
 out.specOk=blockBuffs(spec);
 const open=(id,bk)=>{S.evPlayed={};openEvent(evSwapFor(id,bk),bk);const got=RL.ev;try{closeEvent();}catch(e){}RL.open=false;return got;};
 out.shrinePlain=open('shrine',plain);           // sin casilla especial → otro evento
 out.shrineSpec=open('shrine',spec);             // con casilla especial → Santuario
 S.hero.lvl=HLMAX;out.shrineMax=open('shrine',spec);S.hero.lvl=1; // héroe al máximo → otro evento
 S.gold=0;out.merchNoGold=open('merchant',spec);S.gold=5000;      // solo falta oro → se queda
 S.gold=0;S.hp=1;out.chestBoth=open('chest',spec);S.gold=5000;S.hp=20; // oro y vida a la vez → menos de 2 opciones → otro
 S.gold=0;out.chestGold=open('chest',spec);S.gold=5000;            // solo oro → se queda
 return out;});
const ok=r.specOk&&r.shrinePlain!=='shrine'&&!!EVOK(r.shrinePlain)&&r.shrineSpec==='shrine'&&r.shrineMax!=='shrine'&&r.merchNoGold==='merchant'&&r.chestBoth!=='chest'&&r.chestGold==='chest'&&!errs.length;
function EVOK(x){return typeof x==='string'&&x.length>0;}
console.log(JSON.stringify(r),errs.slice(0,3));console.log(ok?'eventos_cambio ok':'FALLO');await b.close();process.exit(ok?0:1);})();
