const OUT=require('path').join(__dirname,'out');require('fs').mkdirSync(OUT,{recursive:true});
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1280,height:800}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;localStorage.setItem('rt-tutchoice','skip');startGame(15);chooseHero('yrsa');S.chests={};S.evts={};
 for(let k=0;k<3;k++){for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}RL.open=false;$('relic').classList.remove('open');S.chests={};if(S.phase!=='place'){S.phase='place';deal();}}
 RL.open=false;$('relic').classList.remove('open');S.phase='build';S.gold=999;
 const sol=[];for(let gy=0;gy<NC;gy++)for(let gx=0;gx<NC;gx++)if(S.cc[gy][gx]===1)sol.push({x:gx*K+1,y:gy*K+1});
 S.deck.push('arrow');S.tsel='arrow';build(sol[1].x,sol[1].y);build(sol[2].x,sol[2].y);S.tsel=null;
 const q=sqOf(sol[0].x,sol[0].y);const tw={id:++S.tid,type:'faro',lvl:4,x:q.x,y:q.y,cells:[[q.x,q.y]],sq:sqCells(q),inv:0,spec:null,ab:{},acd:{},cd:0,tgt:null,mode:'core',rd:S.round,light:0,lz:[{x:q.x,y:q.y}],lzcd:[0,0]};S.list.push(tw);for(const[a,b2]of tw.sq)S.occ[a+','+b2]=tw;
 CAM.z=ZMIN*1.05;CAM.x=(q.x+.5)*CS-VIEW/sc()/2;CAM.y=(q.y+.5)*CS-VH/sc()/2;clampCam();ui();return {faro:[q.x,q.y],t1:sol[1],t2:sol[2],id:tw.id};});
console.log(JSON.stringify(r));
const sc=async(x,y)=>p.evaluate(([x,y])=>{const c=cellRect(x,y,1);return[(c.l+c.r)/2,(c.t+c.b)/2];},[x,y]);
let f=await sc(r.faro[0],r.faro[1]);const om=()=>p.evaluate(id=>{try{closePrim();}catch(e){}PR.pinned=false;const t=S.list.find(o=>o.id===id);S.selT=t;tmOpen(t);},r.id);await om();await p.waitForTimeout(250);
await p.waitForTimeout(300);console.log('vis',await p.evaluate(()=>[tmVis(),!!TM.t,S.selT===TM.t,RL.open,PR.pinned,S.aim,FO.open,CP.open,OP.open,S.phase,typeof DLG!=='undefined'&&DLG.on,PMU.open]));console.log('botones',await p.evaluate(()=>[...document.querySelectorAll('#tmenu .tmb')].map(b=>b.dataset.k).join()));
await p.screenshot({path:OUT+'/faro1.png'});
await p.click('#tmenu .tmb[data-k="flz:0"]');await p.waitForTimeout(100);console.log('aim',await p.evaluate(()=>S.aim));
let t1=await sc(r.t1.x,r.t1.y);await p.mouse.move(t1[0],t1[1]);await p.waitForTimeout(150);await p.screenshot({path:OUT+'/faro2.png'});await p.mouse.click(t1[0],t1[1]);await p.waitForTimeout(150);
console.log('zona',await p.evaluate(id=>JSON.stringify(S.list.find(o=>o.id===id).lz),r.id));
// segunda zona encima de la primera
await om();await p.waitForTimeout(200);console.log('dbg',await p.evaluate(()=>{try{draw();}catch(e){return 'ERR '+e.message+' '+e.stack.split('\n')[1];}return 'okdraw';}));console.log('dbg2',await p.evaluate(()=>[tmVis(),RL.open,PR.pinned,FO.open,CP.open,OP.open,S.phase,S.aim,S.selT&&S.selT.type,TM.t&&TM.t.type,$('tmenu').className,S.msg]));await p.click('#tmenu .tmb[data-k="flz:1"]');await p.mouse.click(t1[0],t1[1]);await p.waitForTimeout(150);
console.log('buff',await p.evaluate(([x,y])=>{const t=S.list.filter(o=>!TW[o.type].faro).sort((a,b)=>Math.hypot(a.x-x,a.y-y)-Math.hypot(b.x-x,b.y-y))[0];return JSON.stringify([t.type,faroBuff(t)]);},[r.t1.x,r.t1.y]));
await p.evaluate(()=>{S.selT=null;});await p.waitForTimeout(150);await p.screenshot({path:OUT+'/faro3.png'});
// enfriamiento en oleada
await p.evaluate(()=>{startWave();});await om();await p.waitForTimeout(200);await p.click('#tmenu .tmb[data-k="flz:0"]');await p.waitForTimeout(100);let t2=await sc(r.t2.x,r.t2.y);await p.mouse.click(t2[0],t2[1]);await p.waitForTimeout(150);
console.log('cd',await p.evaluate(id=>JSON.stringify(S.list.find(o=>o.id===id).lzcd),r.id));
await om();await p.waitForTimeout(250);await p.screenshot({path:OUT+'/faro4.png'});
console.log(errs);await b.close();})();
