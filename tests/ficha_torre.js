// v352 · Ficha de torre nueva: qué hace, mecánica con barra (solo las que la tienen), 4 números, DPS real en directo
// (congelado entre oleadas), efectos solo con icono, Objetivo y Más detalles plegados, Habilidades abierta, sin recordar lo desplegado
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Test',intro:1,e2n:1,e2a:1,e2v:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;startGame(15);chooseHero('reinhart');for(let i=0;i<5&&DLG.on;i++)dlgEnd();HQ.q=[];if(HQ.cur)hintClose();S.chests={};S.evts={};
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}}
 RL.open=false;$('relic').classList.remove('open');S.gold=99999;S.deck=['arrow','sala','altar','bastion'];ui();
 const free=[];for(let gy=0;gy<NC;gy++)for(let gx=0;gx<NC;gx++)if(S.cc[gy][gx]===1)free.push([gx,gy,Math.hypot(gx*K-S.core.x,gy*K-S.core.y)]);free.sort((a,b)=>a[2]-b[2]);
 window._T={};let j=0;for(const k of ['arrow','sala','altar','bastion']){S.tsel=k;for(;j<free.length;j++){const n=S.list.length;build(free[j][0]*K+K/2,free[j][1]*K+K/2);if(S.list.length>n){_T[k]=S.list[S.list.length-1];j++;break;}}}
 const v=_T.sala;v.lvl=4;v.spec='volc';v.ab={erupt:1};});
const card=k=>p.evaluate(k=>{pinTower(_T[k]);const el=document.querySelector('#side .ftc,#tip .ftc');const fo={};for(const d of el.querySelectorAll('.ftfold'))fo[d.dataset.ft]=d.open;
 return {chips:el.querySelectorAll('.ftchip').length,mech:!!el.querySelector('.ftmech'),dps:!!el.querySelector('.ftdps'),fx:!!el.querySelector('.ftfx .ftfxi'),desc:!!el.querySelector('.ftdesc'),fo,
  dup:[...el.querySelectorAll('.ftfold[data-ft="more"] .row [data-kw]')].map(x=>x.dataset.kw).filter(x=>['cool','rng','area','dps'].includes(x)),sel:!!el.querySelector('.ftfold[data-ft="obj"] select')};},k);
const out={},A=await card('arrow'),V=await card('sala'),L=await card('altar'),B=await card('bastion');
out.arrow=A.chips===3&&!A.mech&&A.dps&&A.desc&&A.fo.obj===false&&A.fo.more===false&&!A.dup.length&&A.sel;
out.volc=V.chips===4&&V.mech&&V.dps&&V.fx&&V.fo.ab===true&&V.fo.more===false;
out.altarNoDps=!L.dps&&!L.mech;out.bastion=B.dps&&B.chips>=3;
// lo desplegado se mantiene al refrescar la misma ficha, pero no al abrir otra
out.keep=await p.evaluate(()=>{pinTower(_T.arrow);const d=document.querySelector('#side .ftfold[data-ft="more"],#tip .ftfold[data-ft="more"]');d.open=true;d.dispatchEvent(new Event('toggle'));refreshPrim();
 const a=document.querySelector('.ftfold[data-ft="more"]').open;pinTower(_T.sala);pinTower(_T.arrow);const b2=document.querySelector('.ftfold[data-ft="more"]').open;return a===true&&b2===false;});
// DPS real: en oleada se mide; al acabar, se congela con la media de la oleada
Object.assign(out,await p.evaluate(()=>{const t=_T.arrow;S.phase='wave';ftSample();const w0=S.wt||0;
 for(let i=1;i<=10;i++){S.wt=w0+i*.3;t.dmgT=(t.dmgT||0)+3;t.act=(t.act||0)+.3;ftSample();}const live=ftReal(t);
 S.phase='build';ftSample();const fr=ftReal(t);return {live:Math.abs(live.v-10)<.6,frozen:!!(fr&&fr.frozen&&Math.abs(fr.v-10)<.6)};}));
// la mecánica y el DPS real se pintan solos
Object.assign(out,await p.evaluate(()=>new Promise(r=>{const v=_T.sala;pinTower(v);v.heat=.5;setTimeout(()=>{const w=document.querySelector('canvas.fbc[data-k="volc"]')?'50%':'',l=document.querySelector('.ftml').textContent,dv=document.querySelector('.ftdv').textContent;r({mechLive:w==='50%'&&/50%/.test(l),dpsTxt:dv.length>0});},450);})));
const bad=Object.entries(out).filter(([k,v])=>v!==true).map(([k])=>k);console.log(JSON.stringify({A,V,L,B,out}));
if(process.argv[3]!=='m'&&process.env.SHOTS){await p.screenshot({path:process.env.SHOTS+'/ficha_torre.png'});}
await b.close();if(bad.length){console.log('FALLA: '+bad.join(', '));process.exit(1);}console.log('ERRS '+JSON.stringify(errs));if(errs.length)process.exit(1);})();
