const OUT=require('path').join(__dirname,'out');require('fs').mkdirSync(OUT,{recursive:true});
const {chromium,devices}=require('playwright');(async()=>{const b=await chromium.launch();const mob=process.argv[3]==='m';
const ctx=await b.newContext(mob?{...devices['iPhone 13 landscape']}:{viewport:{width:1280,height:800}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;localStorage.setItem('rt-tutchoice','skip');startGame(15);chooseHero('sylvana');S.chests={};S.evts={};
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
 RL.open=false;$('relic').classList.remove('open');for(const id of ['horn','coin','map']){if(!S.relics.includes(id)){S.relics.push(id);S.rs[id]={cd:0,t:0,n:0};}}S.hero.lvl=10;S.gold=300;S.msg='';renderRelics();ui();
 const H=S.hero;CAM.z=ZMAX*.8;CAM.x=(H.s.x+.5)*CS-VIEW/sc()/2;CAM.y=(H.s.y+.5)*CS-VH/sc()/2;clampCam();});
await p.waitForTimeout(400);
const hp=await p.evaluate(()=>{const H=S.hero,r=cellRect(H.s.x,H.s.y,1);return[(r.l+r.r)/2,(r.t+r.b)/2];});
await p.mouse.click(hp[0],hp[1]);await p.waitForTimeout(150);console.log('aim tras tocar héroe',await p.evaluate(()=>S.aim));
// destino: casilla de camino a ~6 casillas
const dst=await p.evaluate(()=>{const H=S.hero;let best=null;for(let y=0;y<N;y++)for(let x=0;x<N;x++)if(S.cells[y][x]===2){const d=Math.hypot(x-H.s.x,y-H.s.y);if(d>5&&d<9&&(!best||d<best.d))best={x,y,d};}const r=cellRect(best.x,best.y,1);return[(r.l+r.r)/2,(r.t+r.b)/2];});
await p.mouse.click(dst[0],dst[1]);await p.waitForTimeout(400);
console.log('tras mover',await p.evaluate(()=>[S.aim,JSON.stringify(S.hsay),S.msg,getComputedStyle($('panel')).display]));
await p.screenshot({path:`${OUT}/h_${mob?'m':'pc'}.png`});
// tocar héroe dos veces cancela
await p.waitForTimeout(1600);const hp2=await p.evaluate(()=>{const H=S.hero,r=cellRect(H.s.x,H.s.y,1);return[(r.l+r.r)/2,(r.t+r.b)/2];});
await p.mouse.click(hp2[0],hp2[1]);await p.waitForTimeout(100);const a1=await p.evaluate(()=>S.aim);await p.mouse.click(hp2[0],hp2[1]);await p.waitForTimeout(100);console.log('toggle',a1,await p.evaluate(()=>S.aim));
// aviso: debe salir como notificación y desaparecer del panel
await p.evaluate(()=>{S.msg='¡Furia! prueba de aviso';ui();});await p.waitForTimeout(600);console.log('aviso',await p.evaluate(()=>[S.msg,[...document.querySelectorAll('.tst')].map(e=>e.textContent).join('|')]));
await p.evaluate(()=>{S.msg='Elige una casilla del camino.';ui();});await p.waitForTimeout(600);console.log('instr sin acción',await p.evaluate(()=>S.msg));
console.log(errs);await b.close();})();
