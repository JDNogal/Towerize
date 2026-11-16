// v353 · Barras de mecánica: Heraldo (máx. 20, +1/s, +0,5 por baja de OTRA torre, se vacía al empezar oleada), Búnker (Cadencia por tiempo disparando, se pierde al recargar), barras dibujadas en la ficha
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Test',intro:1,e2n:1,e2a:1,e2v:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(async()=>{const W=ms=>new Promise(r=>setTimeout(r,ms));const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;startGame(15);chooseHero('reinhart');for(let i=0;i<5&&DLG.on;i++)dlgEnd();HQ.q=[];if(HQ.cur)hintClose();S.chests={};S.evts={};
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}}
 RL.open=false;$('relic').classList.remove('open');S.gold=99999;S.deck=['sala','augur','bunker','laser'];ui();
 const free=[];for(let gy=0;gy<NC;gy++)for(let gx=0;gx<NC;gx++)if(S.cc[gy][gx]===1)free.push([gx,gy,Math.hypot(gx*K-S.core.x,gy*K-S.core.y)]);free.sort((a,b)=>a[2]-b[2]);
 const T={};let j=0;for(const k of S.deck){S.tsel=k;for(;j<free.length;j++){const n=S.list.length;build(free[j][0]*K+K/2,free[j][1]*K+K/2);if(S.list.length>n){T[k]=S.list[S.list.length-1];j++;break;}}}
 const h=T.augur;h.lvl=4;h.spec='herald';h.ab={};const o={};o.hch=HCH===20;
 // bajas: la suya no cuenta, la de otra torre +0,5, la del héroe no
 const e0={x:h.x,y:h.y,src:h};h.ch=5;heraldDeath(e0);o.own=h.ch===5;heraldDeath({x:h.x,y:h.y,src:T.sala});o.other=Math.abs(h.ch-5.5)<1e-9;heraldDeath({x:h.x,y:h.y,src:S.hero});o.hero=Math.abs(h.ch-5.5)<1e-9;
 S.phase='build';h.ch=12;startWave();o.reset=h.ch===0;S.phase='build';
 // Búnker: la Cadencia sube disparando seguido y se pierde al recargar
 const bk=T.bunker,s=stats(bk),tg={x:bk.x,y:bk.y,hp:1e9};S.wt=0;bk.magN=null;bk.cad=0;bk.lsh=null;const r0=stats(bk).rate;
 for(let k=0;k<12;k++){S.wt=k*.2;bunkerFire(bk,tg,s,1,false);}o.cadUp=bk.cad>.4&&stats(bk).rate>r0*1.2;
 S.wt+=5;o.cadDown=bkCad(bk)<bk.cad;S.wt-=5;
 bk.magN=1;bunkerFire(bk,tg,s,1,false);o.reloadLoses=bk.cad===0;
 // barras dibujadas en la ficha
 const sa=T.sala;sa.lvl=4;sa.spec='volc';sa.ab={};sa.heat=.5;const red=T.laser;red.lvl=4;red.spec='red';red.ab={};red.netN=2;bk.magN=12;
 o.cv={};for(const [k,t] of [['volc',sa],['herald',h],['net',red],['mag',bk]]){pinTower(t);await W(500);const c=document.querySelector('canvas.fbc[data-k="'+k+'"]');o.cv[k]=!!(c&&c.width>0);}
 // Coleccionista: vender lo anula
 S.nSell=0;const tv=T.sala;sell(tv);o.sellCounts=S.nSell===1&&/sin vender/.test(ACH.collector.d);
 return o;});
console.log(JSON.stringify(r));
ck(r.hch,'el Heraldo carga hasta 20');ck(r.own,'sus propias bajas no deben cargarle');ck(r.other,'la baja de otra torre da +0,5');ck(r.hero,'las bajas del héroe no cuentan');ck(r.reset,'la carga se vacía al empezar la oleada');
ck(r.cadUp,'la Cadencia del Búnker sube disparando seguido');ck(r.cadDown,'la Cadencia baja si deja de disparar');ck(r.reloadLoses,'al recargar se pierde la Cadencia');
ck(r.sellCounts,'vender debe anular el Coleccionista');ck(Object.values(r.cv).every(Boolean),'faltan barras dibujadas: '+JSON.stringify(r.cv));
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'barras_v353 ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
