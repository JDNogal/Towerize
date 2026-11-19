// v361: tarjeta de unidad. En la ficha de una torre con unidades, «Más detalles» lleva un botón por unidad (ya no sus bloques de cifras);
// un botón por unidad (Soldado, Soldado, Soldado…); al pulsarlo sale su tarjeta (vida en barra, números en tarjetas) con «← Torre» para volver. PC y móvil; Baluarte, Gremio y Casa de paja.
const {chromium,devices}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];const out={};
for(const [dev,opt] of [['pc',{viewport:{width:1280,height:720}}],['movil',devices['iPhone 13 landscape']]]){
 const c=await b.newContext(opt),p=await c.newPage();p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
 await p.goto('file://'+process.argv[2]);await p.waitForTimeout(700);
 await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;
  startGame(15);chooseHero(HIDS()[0]);for(let i=0;i<5&&DLG.on;i++)dlgEnd();try{if(LB.open)lbClose(true);}catch(e){}S.revAt=0;S.chests={};S.evts={};RL.open=false;HQ.q=[];if(HQ.cur)hintClose();
  for(let k=0;k<4;k++)for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok){RL.open=false;S.chests={};if(S.phase!=='place'){S.phase='place';deal();}break;}}
  RL.open=false;$('relic').classList.remove('open');S.chests={};S.phase='build';S.gold=99999;S.round=12;if(!S.deck.includes('bastion'))S.deck.push('bastion');
  for(let gy=0;gy<NC;gy++)for(let gx=0;gx<NC;gx++){if(S.cc[gy][gx]!==1)continue;S.tsel='bastion';const n=S.list.length;build(gx*K+K/2,gy*K+K/2);if(S.list.length>n){gy=NC;break;}}
  const sol=[];for(let y=0;y<N;y++)for(let x=0;x<N;x++)if(S.cells[y][x]===1){const q=sqOf(x,y);if(q.x===x&&q.y===y&&!sqCells(q).some(([a,c])=>S.occ[a+','+c]))sol.push(q);}
  const mk=(type,q,lvl)=>{const tw={id:++S.tid,type,lvl,x:q.x,y:q.y,cells:[[q.x,q.y]],sq:sqCells(q),inv:0,spec:null,ab:{},acd:{},cd:0,tgt:null,mode:'core',rd:S.round};if(TW[type].guild)mkGuild(tw);
   S.list.push(tw);S.st.all.push(tw);for(const[a,c]of tw.sq)S.occ[a+','+c]=tw;try{autoFlag(tw);}catch(e){}if(TW[type].pig&&lvl>=4)mkPig(tw);return tw;};
  window._T={bastion:S.list.find(t=>t.type==='bastion'),guild:mk('guild',sol[0],4),straw:mk('straw',sol[1],4)};_T.bastion.lvl=3;ui();});
 await p.waitForTimeout(500);
 for(const ty of ['bastion','guild','straw']){
  const r=await p.evaluate(async ty=>{const t=_T[ty];if(!t)return {err:'sin torre'};HQ.q=[];if(HQ.cur)hintClose();closePrim();pinTower(t);await new Promise(r=>setTimeout(r,350));
   const box=()=>document.querySelector(PMN()?'#tip':'#side');const o={};o.btn=box().querySelectorAll('[data-a="fuunit"]').length;o.usub=box().querySelectorAll('.usub').length;
   const bt=box().querySelector('[data-a="fuunit"]');if(!bt)return o;bt.click();await new Promise(r=>setTimeout(r,300));
   const card=box().querySelector('.fuu');o.card=!!card;if(card){o.back=!!card.querySelector('[data-a="fuback"]');o.chips=card.querySelectorAll('.ftchip').length;o.bars=card.querySelectorAll('.fuhp .ftbar').length;o.name=(card.querySelector('.ttl')||{}).textContent;
    const q=card.querySelector('[data-a="fuback"]').getBoundingClientRect();o.backVis=q.top>=0&&q.bottom<=innerHeight&&q.left>=0&&q.right<=innerWidth;
    ui();refreshPrim();await new Promise(r=>setTimeout(r,250));o.stays=!!box().querySelector('.fuu');const ln=document.getElementById('fuln');o.line=!!(ln&&ln.style.display==='block');/* aguanta los repintados de la ficha */
    box().querySelector('[data-a="fuback"]').click();await new Promise(r=>setTimeout(r,300));o.backOk=!box().querySelector('.fuu')&&box().querySelectorAll('[data-a="fuunit"]').length===o.btn;}
   closePrim();return o;},ty);
  out[dev+'_'+ty]=r;const L=`${dev} ${ty}`;
  ck(r.btn>=1,L+': no hay botones de unidad en la ficha');ck(r.usub===0,L+': siguen los bloques de cifras de unidad en la ficha');ck(r.card,L+': no sale la tarjeta de la unidad');
  if(r.card){ck(r.back&&r.backVis,L+': «Volver» no se ve');ck(r.chips>=2,L+': la tarjeta no tiene sus números en tarjetas');ck(r.bars>=1,L+': la vida no va en barra');ck(r.stays,L+': la tarjeta se cierra al repintar la ficha');ck(r.backOk,L+': «Volver» no devuelve a la ficha de la torre');ck(r.line||ty==='straw',L+': no sale la línea punteada hasta la unidad');}
  await p.screenshot({path:`tests/out/ficha_unidad_${dev}_${ty}.png`});}
 await c.close();}
ck(!errs.length,'errores: '+errs.join(' | '));
console.log(JSON.stringify(out));if(fails.length){console.log('FALLOS\n'+fails.join('\n'));}
await b.close();process.exit(fails.length?1:0);})();
