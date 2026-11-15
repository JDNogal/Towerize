// Moneda: +50% de todo el oro que entra (no al vender), y se guarda bien
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;startGame(15);chooseHero('reinhart');if(DLG.on)dlgEnd();try{lbClose(true);}catch(e){}
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}RL.open=false;S.phase='build';
 S.gold=1000;const a0=S.gold;S.gold+=100;const noCoin=S.gold-a0;gainRelic('coin');const g0=S.gold;S.gold+=100;const ev=S.gold-g0;const g1=S.gold;S.gold-=40;const spend=g1-S.gold;
 const js=Object.keys(S).includes('gold')&&Object.getOwnPropertyDescriptor(S,'gold').enumerable;
 S.rs.coin.cd=5;const g2=S.gold;S.gold+=100;const off=S.gold-g2;S.rs.coin.cd=0;
 return {noCoin,ev,spend,js,off};});
console.log(JSON.stringify(r));
ck(r.noCoin===100,'sin Moneda el oro no debe cambiar');ck(r.ev===150,'con la Moneda, +100 de oro debe dar 150 ('+r.ev+')');ck(r.spend===40,'gastar oro no debe cambiar');ck(r.js,'el oro no se guarda bien');ck(r.off===100,'con el pasivo desactivado no debe dar extra');
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'moneda_oro ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
