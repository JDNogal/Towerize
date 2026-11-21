// v363 · Guía «Juega a tu manera» (Nogal, 21-nov) y botón «Ver más» del medidor de daño.
// La guía sale una vez: al acabar el Tutorial rápido o el completo; quien los salta, en la ronda 10 o al acabar su primera partida.
const {chromium,devices}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const OUT=require('path').join(__dirname,'out');
async function pg(opt,seen){const c=await b.newContext(opt||{viewport:{width:1280,height:720}});const p=await c.newPage();p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(s=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Nogal',intro:1,e2n:1,e2a:1,e2v:1}));if(s)localStorage.setItem('rt-guia','1');}catch(e){}},!!seen);
 await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
 await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;});return p;}
const st=p=>p.evaluate(()=>({open:LB.open,area:LB.area,key:LB.msg&&LB.msg.key,seen:!!localStorage.getItem('rt-guia'),inmenu:document.body.classList.contains('inmenu'),step:LB.step}));
// 1) Tutorial rápido: la última diapositiva ya no es «Personaliza tu juego»; al acabarlo sale la guía y «Continuar» sigue a donde tocaba
{const p=await pg();
 const q=await p.evaluate(()=>{openQuick('setup');QS.i=QSL.length-1;renderQuick();return {n:QSL.length,last:QSL[QSL.length-1].t};});
 ck(!/Personaliza/.test(q.last),'el Tutorial rápido ya no acaba en «Personaliza tu juego»');
 await p.click('[data-a="qend"]');await p.waitForTimeout(600);let s=await st(p);
 ck(s.open&&s.area==='msg'&&s.key==='guia','al acabar el Tutorial rápido sale la guía ('+JSON.stringify(s)+')');ck(s.seen,'la guía queda vista (rt-guia)');
 const ui=await p.evaluate(()=>({cards:document.querySelectorAll('#comp .gqA .c').length,sw:[...document.querySelectorAll('#comp [data-a="guiasw"]')].map(x=>x.dataset.v).join(','),imgs:[...document.querySelectorAll('#comp .gqA .im,#comp .gqpic div')].filter(e=>/url\(/.test(e.getAttribute('style')||'')).length,cut:(()=>{const bk=document.querySelector('#comp .bk').getBoundingClientRect();return [...document.querySelectorAll('#comp .lbft button')].some(x=>{const r=x.getBoundingClientRect();return r.right>bk.right+1||r.bottom>bk.bottom+1;});})()}));
 ck(ui.cards===4&&ui.sw==='ffwd,dnum,dps,nearach','las 4 opciones con su interruptor ('+ui.sw+')');ck(ui.imgs===5,'5 imágenes (4 tarjetas + la partida): '+ui.imgs);ck(!ui.cut,'los botones del pie no se salen del libro');
 await p.screenshot({path:OUT+'/guia_opciones_pc.png'});
 // interruptor: cambia la opción y se guarda
 await p.click('#comp [data-a="guiasw"][data-v="dnum"]');await p.waitForTimeout(200);
 const t=await p.evaluate(()=>({o:OPT.dnum,ls:JSON.parse(localStorage.getItem('rt-opts')||'{}').dnum,on:document.querySelector('#comp [data-a="guiasw"][data-v="dnum"]').classList.contains('on')}));
 ck(t.o===false&&t.ls===false&&!t.on,'el interruptor de Números de daño la apaga y se guarda ('+JSON.stringify(t)+')');
 await p.click('#comp [data-a="guiasw"][data-v="dnum"]');await p.waitForTimeout(150);ck(await p.evaluate(()=>OPT.dnum===true),'y la vuelve a encender');
 await p.click('#comp [data-a="guiacont"]');await p.waitForTimeout(500);s=await st(p);
 ck(s.open&&s.area==='prep'&&s.step==='era','«Continuar» lleva a elegir era, como antes ('+JSON.stringify(s)+')');
 // ya vista: no vuelve a salir
 await p.evaluate(()=>{showMenu();openQuick('setup');QS.i=QSL.length-1;renderQuick();document.querySelector('[data-a="qend"]').click();});await p.waitForTimeout(400);s=await st(p);
 ck(!(s.area==='msg'&&s.key==='guia'),'la segunda vez no sale');
 await p.context().close();}
// 2) Tutorial completo: «Menú principal» pasa antes por la guía; «Ver todas las opciones» abre Opciones
{const p=await pg();
 await p.evaluate(()=>{const d=document.createElement('button');d.dataset.a='tutmenu';d.id='tm';document.body.appendChild(d);act({target:d,preventDefault(){},stopPropagation(){}});});await p.waitForTimeout(500);let s=await st(p);
 ck(s.area==='msg'&&s.key==='guia','al acabar el Tutorial completo sale la guía');
 await p.click('#comp [data-a="guiaopts"]');await p.waitForTimeout(500);s=await p.evaluate(()=>({area:LB.area,tab:OP.tab,inmenu:document.body.classList.contains('inmenu')}));
 ck(s.area==='op'&&s.tab==='jg'&&s.inmenu,'«Ver todas las opciones» abre Opciones (en el menú) ('+JSON.stringify(s)+')');
 const hs=await p.evaluate(()=>typeof OPTTXT==='undefined'&&typeof optsMock==='undefined');ck(hs,'se ha quitado el texto viejo «Personaliza tu juego»');
 await p.context().close();}
// 3) Quien salta el tutorial: en la ronda 10 (construyendo) sale la guía; «Continuar» vuelve a la partida
{const p=await pg();
 await p.evaluate(()=>{startGame(15);chooseHero('reinhart');for(let i=0;i<5&&DLG.on;i++)dlgEnd();HQ.q=[];RL.open=false;$('relic').classList.remove('open');S.round=9;S.phase='build';});
 await p.waitForTimeout(1600);let s=await st(p);ck(!(s.area==='msg'&&s.key==='guia'&&s.open),'en la ronda 9 aún no sale');
 await p.evaluate(()=>{S.round=10;S.phase='build';});await p.waitForTimeout(1600);s=await st(p);
 ck(s.open&&s.area==='msg'&&s.key==='guia','en la ronda 10 sale la guía ('+JSON.stringify(s)+')');
 await p.click('#comp [data-a="guiacont"]');await p.waitForTimeout(900);s=await st(p);ck(!s.open&&!s.inmenu,'«Continuar» vuelve a la partida');
 await p.context().close();}
// 4) … o al acabar su primera partida (antes de la ronda 10): al pulsar «Menú principal»
{const p=await pg();
 await p.evaluate(()=>{startGame(15);chooseHero('reinhart');for(let i=0;i<5&&DLG.on;i++)dlgEnd();HQ.q=[];RL.open=false;$('relic').classList.remove('open');OPT.lbup='never';S.round=4;S.hp=0;S.phase='lost';endGame();});
 await p.waitForTimeout(700);const e=await st(p);ck(e.area==='end','sale el final de partida');
 for(let k=0;k<10;k++){const has=await p.evaluate(()=>!!document.querySelector('#comp [data-a="menu"]'));if(has)break;await p.evaluate(()=>{const x=[...document.querySelectorAll('#comp [data-a="scskip"],#comp [data-a="sccont"]')].find(q=>!q.hidden);if(x)x.click();});await p.waitForTimeout(700);}
 await p.click('#comp [data-a="menu"]');await p.waitForTimeout(600);let s=await st(p);
 ck(s.area==='msg'&&s.key==='guia','al acabar la primera partida, «Menú principal» pasa antes por la guía ('+JSON.stringify(s)+')');
 await p.click('#comp [data-a="guiacont"]');await p.waitForTimeout(600);s=await st(p);ck(s.inmenu,'y después va al menú');
 await p.context().close();}
// 5) Medidor de daño: «Ver más» pausa y abre Estadísticas › Daño; la flecha de plegar, centrada
{const p=await pg(null,true);
 const r=await p.evaluate(async()=>{const W=ms=>new Promise(r=>setTimeout(r,ms));startGame(15);chooseHero('reinhart');for(let i=0;i<5&&DLG.on;i++)dlgEnd();HQ.q=[];OPT.dps=true;
  for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}}
  RL.open=false;$('relic').classList.remove('open');S.gold=99999;S.deck=['arrow','orb'];
  const free=[];for(let gy=0;gy<NC;gy++)for(let gx=0;gx<NC;gx++)if(S.cc[gy][gx]===1)free.push([gx,gy,Math.hypot(gx*K-S.core.x,gy*K-S.core.y)]);free.sort((a,b)=>a[2]-b[2]);
  let j=0;for(const k of ['arrow','orb','arrow']){S.tsel=k;for(;j<free.length;j++){const n=S.list.length;build(free[j][0]*K+K/2,free[j][1]*K+K/2);if(S.list.length>n){j++;break;}}}S.tsel=null;
  S.round=3;startWave();S.speed=2;ui();for(let t=0;t<80;t++){await W(150);if(document.querySelector('#dpsc .dstat'))break;}
  const btn=document.querySelector('#dpsc .dstat');const cen=[...document.querySelectorAll('#lstack .cl')].map(c=>{const a=c.getBoundingClientRect(),s=c.querySelector('svg').getBoundingClientRect();return Math.max(Math.abs((a.left+a.right)/2-(s.left+s.right)/2),Math.abs((a.top+a.bottom)/2-(s.top+s.bottom)/2));});
  return {btn:!!btn,cen,txt:btn&&btn.textContent};});
 ck(r.btn&&/Ver más/.test(r.txt),'el medidor tiene «Ver más»');ck(r.cen.length&&r.cen.every(v=>v<=0.6),'la flecha de plegar está centrada ('+r.cen.join(',')+')');
 await p.evaluate(()=>document.querySelector('#dpsc .dstat').click());await p.waitForTimeout(500);
 const s=await p.evaluate(()=>({open:LB.open,area:LB.area,tab:STW.tab,speed:S.speed}));ck(s.open&&s.area==='st'&&s.tab==='dmg'&&s.speed===0,'«Ver más» pausa y abre Estadísticas › Daño ('+JSON.stringify(s)+')');
 await p.context().close();}
// 7) Ayuda › Tutoriales: botón «Juega a tu manera» para volver a verla (en el menú y en partida); «Continuar» vuelve ahí
for(const inG of [false,true]){const p=await pg(null,true);
 await p.evaluate(g=>{if(g){startGame(15);chooseHero('reinhart');for(let i=0;i<5&&DLG.on;i++)dlgEnd();HQ.q=[];RL.open=false;$('relic').classList.remove('open');}LB.hp='tut';lbOpen('hp');},inG);await p.waitForTimeout(600);
 await p.screenshot({path:OUT+'/guia_ayuda_'+(inG?'partida':'menu')+'.png'});
 const has=await p.evaluate(()=>!!document.querySelector('#comp [data-a="guiaver"]'));ck(has,'Ayuda › Tutoriales tiene «Juega a tu manera» ('+(inG?'partida':'menú')+')');
 if(has){await p.evaluate(()=>document.querySelector('#comp [data-a="guiaver"]').click());await p.waitForTimeout(500);let s=await st(p);ck(s.area==='msg'&&s.key==='guia','el botón abre la guía');
  await p.evaluate(()=>document.querySelector('#comp [data-a="guiacont"]').click());await p.waitForTimeout(500);s=await p.evaluate(()=>({open:LB.open,area:LB.area,hp:LB.hp}));ck(s.open&&s.area==='hp'&&s.hp==='tut','«Continuar» vuelve a Ayuda › Tutoriales ('+JSON.stringify(s)+')');}
 await p.context().close();}
// 6) Móvil: la guía se ve y se puede continuar
{const p=await pg({...devices['iPhone 13 landscape']});
 await p.evaluate(()=>{guiaOpen();});await p.waitForTimeout(700);await p.screenshot({path:OUT+'/guia_opciones_movil.png'});
 const m=await p.evaluate(()=>{const c=document.querySelector('#comp [data-a="guiacont"]');const r=c&&c.getBoundingClientRect();return !!r&&r.width>0&&r.bottom<=innerHeight+1&&r.right<=innerWidth+1;});ck(m,'en el móvil «Continuar» se ve entero');
 await p.context().close();}
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'guia_opciones_v363 ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
