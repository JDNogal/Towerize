// Niveles de torre sin spoilers: en el compendio y en la oferta solo se ven los niveles alcanzados en alguna partida
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:800}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.setItem('rt-seen',JSON.stringify({tw:{arrow:1,cata:1,orb:1,straw:1,dragon:1},pc:{Recta:1,Esquina:1,Cruce:1},bf:{rng:1,pow:1},en:{norm:1,runner:1,armored:1},rl:{horn:1,coin:1},hr:{},ev:{merchant:1}}));localStorage.setItem('rt-opts',JSON.stringify({u_cpa:true}));localStorage.setItem('rt-story',JSON.stringify({intro:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;});
const lvTxt=()=>p.evaluate(()=>{const b=document.querySelector('#comp .bkp.r .lvbtn');return b?b.textContent:'';});
const errTxt=()=>p.evaluate(()=>{const e=document.getElementById('errb');return e&&e.classList.contains('on')?e.textContent:'';});
// 1. torre nunca subida: el botón Nv no pasa de Nv 1 y avisa
await p.evaluate(()=>{toggleComp(true);CP.tab='tw';CP.sel.tw='arrow';CP.pageR=true;CP.lv={};renderComp();});await p.waitForTimeout(400);
await p.click('#comp .bkp.r [data-a="clv"]');await p.waitForTimeout(300);
ck((await lvTxt())==='Nv 1','pasa de Nv 1 sin haberlo alcanzado: '+(await lvTxt()));ck(/No has alcanzado/.test(await errTxt()),'no sale el aviso');
// 2. subir la torre en una partida la desbloquea
await p.evaluate(()=>{lbClose(false,true);startGame(15);chooseHero('sylvana');S.list.push({id:999,type:'arrow',lvl:3,x:0,y:0,cells:[],sq:[],ab:{},acd:{}});});await p.waitForTimeout(1500);
ck(await p.evaluate(()=>TLV.arrow&&TLV.arrow.lv===3),'no se apunta el nivel alcanzado');
await p.evaluate(()=>{S.list=S.list.filter(t=>t.id!==999);showMenu();toggleComp(true);CP.tab='tw';CP.sel.tw='arrow';CP.pageR=true;CP.lv={};renderComp();});await p.waitForTimeout(400);
await p.click('#comp .bkp.r [data-a="clv"]');await p.waitForTimeout(200);ck((await lvTxt())==='Nv 2','no deja ver Nv 2 tras alcanzarlo');
await p.click('#comp .bkp.r [data-a="clv"]');await p.waitForTimeout(200);
await p.click('#comp .bkp.r [data-a="clv"]');await p.waitForTimeout(300);ck(/No has alcanzado/.test(await errTxt()),'deja ver la especialización sin haberla elegido');
// 3. con una especialización elegida, se ve esa y la otra no
await p.evaluate(()=>{const sp=Object.keys(SPECS.arrow)[0];TLV.arrow={lv:4,sp:{[sp]:1}};CP.lv={};renderComp();});
for(let i=0;i<3;i++){await p.click('#comp .bkp.r [data-a="clv"]');await p.waitForTimeout(150);}
ck(await p.evaluate(()=>cpState('arrow').lv===4),'no deja ver la especialización elegida');
const cb=await p.$('#comp .bkp.r [data-a="cbr"]');if(cb){await cb.click();await p.waitForTimeout(300);ck(await p.evaluate(()=>(CP.lv.arrow||1)===4),'cambia a la especialización no elegida');}
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'niveles ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
