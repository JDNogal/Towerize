// v305 · Línea de rondas: 5 puntos que rotan, jefe con calavera, élite delante y mini-élites a los lados, y la línea se rellena con la oleada
const OUT=require('path').join(__dirname,'out');require('fs').mkdirSync(OUT,{recursive:true});
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:720}});const errs=[];p.on('pageerror',e=>errs.push(e.message));const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Test',intro:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;startGame(15);chooseHero('reinhart');if(DLG.on)dlgEnd();try{if(LB.open)lbClose(true);}catch(e){}S.chests={};S.evts={};
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
 RL.open=false;HQ.q=[];if(HQ.cur)hintClose();const out={};
 S.round=1;S.phase='build';rtlTick();const el=document.getElementById('rtl');out.on=el.classList.contains('on');out.n=el.querySelectorAll('.rtd').length;out.first=el.querySelector('.rtd.cur').dataset.tip;
 S.round=11;rtlTick();const d=n=>el.querySelector(`[data-tip="rtl:${n}"]`);out.boss=!!d(15).querySelector('.rti.boss');out.both=!!d(12).querySelector('.rti.fr')&&!!d(12).querySelector('.rti.sl');out.miniOnly=!!d(13).querySelector('.rti.fr')&&!d(13).querySelector('.rti.boss');out.plain=!d(11).querySelector('.rti');
 out.rot=el.querySelector('.rtd.cur').dataset.tip==='rtl:11'&&!d(10);
 S.sched.push({r:14,add:{wanted:1}});RTL.sg='';rtlTick();out.tip=/Élite ×3/.test(rtlTip(14));
 S.hp=999;startWave();for(let k=0;k<20;k++)update(.05);const w0=parseFloat(el.querySelector('.rts.now i').style.width)||0;const N=S.rtlN;S.rtlN=N*2;rtlTick();out.prog=S.phase==="wave"&&parseFloat(el.querySelector(".rts.now i").style.width)>=45;S.rtlN=N;
 return out;});
await p.screenshot({path:OUT+'/linea_rondas.png'});
for(const [k,v] of Object.entries({on:true,n:5,first:'rtl:1',boss:true,both:true,miniOnly:true,plain:true,rot:true,tip:true,prog:true}))ck(r[k]===v,k+'='+JSON.stringify(r[k]));
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'linea ok');console.log('ERRS '+JSON.stringify(errs));await b.close();if(fails.length||errs.length)process.exit(1);})();
