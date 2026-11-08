// Niveles de torre sin spoilers: en el compendio y en la oferta solo se ven los niveles alcanzados en alguna partida
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:800}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.setItem('rt-seen',JSON.stringify({tw:{arrow:1,cata:1,orb:1,straw:1,dragon:1},pc:{Recta:1,Esquina:1,Cruce:1},bf:{rng:1,pow:1},en:{norm:1,runner:1,armored:1},rl:{horn:1,coin:1},hr:{},ev:{merchant:1}}));localStorage.setItem('rt-opts',JSON.stringify({u_cpa:true}));localStorage.setItem('rt-story',JSON.stringify({intro:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;});
const cur=()=>p.evaluate(()=>CP.lv.arrow||1);
const tab=n=>p.evaluate(n=>{const b=document.querySelector(`#comp .bkp.r [data-a="clvs"][data-n="${n}"]`);if(b)b.click();return !!b;},n);
const errTxt=()=>p.evaluate(()=>{const e=document.getElementById('errb');return e&&e.classList.contains('on')?e.textContent:'';});
const tabsN=()=>p.evaluate(()=>document.querySelectorAll('#comp .bkp.r .lvt').length);
// 1. torre nunca subida: solo sale la pestaña de Nv 1
await p.evaluate(()=>{toggleComp(true);CP.tab='tw';CP.sel.tw='arrow';CP.pageR=true;CP.lv={};renderComp();});await p.waitForTimeout(400);
ck((await tabsN())===1,'salen niveles no alcanzados: '+(await tabsN()));ck(!(await tab(2)),'hay pestaña de Nv 2 sin alcanzarlo');ck((await cur())===1,'pasa de Nv 1 sin haberlo alcanzado');
// 2. subir la torre en una partida la desbloquea
await p.evaluate(()=>{lbClose(false,true);startGame(15);chooseHero('sylvana');S.list.push({id:999,type:'arrow',lvl:3,x:0,y:0,cells:[],sq:[],ab:{},acd:{}});});await p.waitForTimeout(1500);
ck(await p.evaluate(()=>TLV.arrow&&TLV.arrow.lv===3),'no se apunta el nivel alcanzado');
await p.evaluate(()=>{S.list=S.list.filter(t=>t.id!==999);showMenu();toggleComp(true);CP.tab='tw';CP.sel.tw='arrow';CP.pageR=true;CP.lv={};renderComp();});await p.waitForTimeout(400);
await tab(2);await p.waitForTimeout(200);ck((await cur())===2,'no deja ver Nv 2 tras alcanzarlo');
await tab(3);await p.waitForTimeout(200);ck((await cur())===3,'no deja ver Nv 3 de golpe');
ck(!(await tab(4))&&(await tabsN())===3,'sale la especialización sin haberla elegida');
// 3. con una especialización elegida, se ve esa y la otra no
await p.evaluate(()=>{const sp=Object.keys(SPECS.arrow)[0];TLV.arrow={lv:4,sp:{[sp]:1}};CP.lv={};renderComp();});await p.waitForTimeout(200);
await tab(4);await p.waitForTimeout(200);ck(await p.evaluate(()=>cpState('arrow').lv===4),'no deja ver la especialización elegida');
ck(!(await tab(5))&&(await tabsN())===4,'sale la especialización no elegida');
await tab(1);await p.waitForTimeout(200);ck((await cur())===1,'no vuelve a Nv 1 de golpe');
// 4. en la oferta de torres las pestañas también funcionan (con la ventana abierta)
await p.evaluate(()=>{lbClose(false,true);startGame(15);chooseHero('sylvana');RL.open=false;HQ.q=[];if(HQ.cur)hintClose();TLV.arrow={lv:3};CP.lv={};RL.tdet=1;RL.towo=['arrow','cata','orb'];renderTowerOffer();});await p.waitForTimeout(500);
await p.click('#relic [data-a="clvs"][data-v="arrow"][data-n="3"]');await p.waitForTimeout(300);
ck(await p.evaluate(()=>(CP.lv.arrow||1)===3&&!!document.querySelector('#relic .lvt.on[data-n="3"]')),'las pestañas de la oferta no cambian de nivel');
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'niveles ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
