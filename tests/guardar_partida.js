const OUT=require('path').join(__dirname,'out');require('fs').mkdirSync(OUT,{recursive:true});
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1280,height:720}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
const F='file://'+process.argv[2];
await p.goto(F);await p.waitForTimeout(800);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;localStorage.setItem('rt-tutchoice','skip');});
console.log('sin guardado: portada',await p.evaluate(()=>[!!SAV.meta,!!$('comp').querySelector('[data-a="lbload"]')]));
// partida: colocar pieza, construir, empezar oleada
await p.evaluate(()=>{startGame(15);chooseHero('sylvana');S.chests={};S.evts={};
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
 let sq=null;for(let ky=0;ky<NC&&!sq;ky++)for(let kx=0;kx<NC&&!sq;kx++){const q={kx,ky,x:kx*K+1,y:ky*K+1};if(bmFree(q))sq=q;}if(sq){S.gold=500;bmBuildNow(S.deck[0],sq);}CAM.z=ZMAX*.7;camCenter(S.core.x+3,S.core.y);});
await p.waitForTimeout(700);
const ok1=await p.evaluate(()=>saveRun('build'));console.log('guardado en construcción',ok1,await p.evaluate(()=>SAV.meta&&[SAV.meta.round,SAV.meta.heroN,SAV.meta.why]));
const before=await p.evaluate(()=>({gold:S.gold,towers:S.list.length,round:S.round,phase:S.phase,blocks:Object.keys(S.blocks).length,cam:[Math.round(CAM.x),Math.round(CAM.y),CAM.z],bn:BN,rounds:ROUNDS}));
// recargar la página y continuar
await p.goto(F);await p.waitForTimeout(900);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;showMenu();});await p.waitForTimeout(400);
console.log('portada con guardado',await p.evaluate(()=>[!!$('comp').querySelector('[data-a="lbload"]'),($('comp').querySelector('.lbsv')||{}).textContent]));
await p.screenshot({path:OUT+'/sv_cover.png'});
await p.click('#comp [data-a="newgame"]');await p.waitForTimeout(200);console.log('nueva pide confirmación',await p.evaluate(()=>[LB.ask,($('comp').querySelector('.lbnew')||{}).textContent]));
await p.click('#comp [data-a="lbload"]');await p.waitForTimeout(900);
const after=await p.evaluate(()=>({gold:S.gold,towers:S.list.length,round:S.round,phase:S.phase,blocks:Object.keys(S.blocks).length,cam:[Math.round(CAM.x),Math.round(CAM.y),CAM.z],bn:BN,rounds:ROUNDS,hero:S.hero&&S.hero.id,inmenu:document.body.classList.contains('inmenu'),lb:LB.open}));
console.log('antes ',JSON.stringify(before));console.log('después',JSON.stringify(after));await p.screenshot({path:OUT+'/sv_loaded.png'});
// oleada: guardar y salir en plena oleada → vuelve al principio
await p.evaluate(()=>{HQ.q=[];if(HQ.cur)hintClose();startWave();});await p.waitForTimeout(1500);
const mid=await p.evaluate(()=>[S.phase,S.enemies.length,SAV.meta&&SAV.meta.why]);console.log('en oleada',mid);
await p.evaluate(()=>openPause());await p.waitForTimeout(300);await p.click('#comp [data-a="psave"]');await p.waitForTimeout(300);console.log('aviso primera pulsación',await p.evaluate(()=>[PMU.svask,document.body.classList.contains('inmenu')]));
await p.click('#comp [data-a="psave"]');await p.waitForTimeout(2500);console.log('tras guardar y salir',await p.evaluate(()=>[document.body.classList.contains('inmenu'),LB.cover,SAV.meta&&SAV.meta.why]));
await p.click('#comp [data-a="lbload"]');await p.waitForTimeout(900);console.log('reanudada al inicio de la oleada',await p.evaluate(()=>[S.phase,S.enemies.length,S.round,S.list.length]));
// ganar/perder borra
await p.evaluate(()=>{S.phase='lost';endGame();});await p.waitForTimeout(400);console.log('tras perder',await p.evaluate(()=>[!!SAV.meta,localStorage.getItem('rt-save')]));
await p.evaluate(()=>{lbClose(false,true);showMenu();});await p.waitForTimeout(300);console.log('portada sin guardado',await p.evaluate(()=>!$('comp').querySelector('[data-a="lbload"]')));
// formato antiguo
await p.evaluate(async()=>{await svPut({v:0,S:{},g:{}});svMeta({round:1,rounds:15,hero:'x',t:Date.now()});lbRender();});await p.waitForTimeout(200);await p.click('#comp [data-a="lbload"]');await p.waitForTimeout(600);
console.log('formato antiguo',await p.evaluate(()=>[document.body.classList.contains('inmenu'),!!SAV.meta,($('toast')||{}).textContent]));
console.log(JSON.stringify(errs));await b.close();})();
