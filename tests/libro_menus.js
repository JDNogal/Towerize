const OUT=require('path').join(__dirname,'out');require('fs').mkdirSync(OUT,{recursive:true});
const {chromium,devices}=require('playwright');(async()=>{const b=await chromium.launch();const mob=process.argv[3]==='m';
const ctx=await b.newContext(mob?{...devices['iPhone 13 landscape']}:{viewport:{width:1280,height:720}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;});
const sfx=mob?'m_':'';const shot=async n=>{await p.waitForTimeout(250);await p.screenshot({path:OUT+'/lb_'+sfx+n+'.png'});};
console.log('menú: libro abierto en portada',await p.evaluate(()=>[LB.open,LB.cover,getComputedStyle($('comp')).display]));
await shot('menu');
for(const a of ['cp','lg','op','hp','cr']){await p.evaluate(a=>lbOpen(a),a);await shot(a);}
await p.evaluate(()=>{LB.hp='keys';lbOpen('hp');});await shot('hp_keys');
await p.evaluate(()=>{LB.hp='tips';lbOpen('hp');});await shot('hp_tips');
await p.evaluate(()=>{OP.tab='kb';lbOpen('op');});await shot('op_kb');
await p.evaluate(()=>{OP.tab='ps';lbOpen('op');});await shot('op_ps');
// Esc vuelve a la portada
await p.keyboard.press('Escape');console.log('Esc en área → portada',await p.evaluate(()=>[LB.open,LB.cover]));
// partida
await p.evaluate(()=>{OPT.hints=false;localStorage.setItem('rt-tutchoice','skip');startGame(15);chooseHero('sylvana');S.chests={};S.evts={};
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
 RL.open=false;$('relic').classList.remove('open');S.gold=300;ui();});
await p.waitForTimeout(300);console.log('tras startGame: libro cerrado',await p.evaluate(()=>[LB.open,S.speed]));
await p.evaluate(()=>openPause());await shot('pause');console.log('pausa',await p.evaluate(()=>[LB.open,LB.cover,PMU.open,S.speed]));
await p.evaluate(()=>lbOpen('st'));await shot('st');
await p.evaluate(()=>{STW.tab='dmg';lbRender();});await shot('st_dmg');
await p.keyboard.press('Escape');console.log('Esc → portada',await p.evaluate(()=>[LB.cover,PMU.open]));
await p.keyboard.press('Escape');console.log('Esc en portada → continuar',await p.evaluate(()=>[LB.open,PMU.open,S.speed]));
// Q/E en opciones
await p.evaluate(()=>{OP.tab='jg';lbOpen('op');});await p.keyboard.press('e');console.log('E → pestaña',await p.evaluate(()=>OP.tab));
await p.keyboard.press('q');console.log('Q → pestaña',await p.evaluate(()=>OP.tab));
// detalle de opciones al pasar el ratón
const r=await p.$('#comp .orow[data-oi]');if(r){await r.hover();await p.waitForTimeout(100);console.log('detalle',await p.evaluate(()=>LB.op+' | '+($('comp').querySelector('.bkp.r h4')||{}).textContent));}
// clic fuera → portada
const box=await p.evaluate(()=>{const r=$('comp').getBoundingClientRect();return[r.left+8,r.bottom-8];});await p.mouse.click(box[0],box[1]);console.log('clic fuera → portada',await p.evaluate(()=>[LB.open,LB.cover]));
await p.mouse.click(box[0],box[1]);console.log('clic fuera en portada → continuar',await p.evaluate(()=>[LB.open,S.speed]));
// abandonar → menú principal con portada
await p.evaluate(()=>{openPause();});await p.evaluate(()=>{PMU.ask=1;closePause(false);showMenu();});console.log('showMenu → portada',await p.evaluate(()=>[LB.open,LB.cover,document.body.classList.contains('inmenu')]));
console.log(JSON.stringify(errs));await b.close();})();
