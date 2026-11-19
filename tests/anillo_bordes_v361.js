// v361: el anillo de la torre (habilidades, mejorar, vender…) nunca queda debajo de la interfaz ni fuera de la pantalla,
// con la torre pegada a cualquiera de los cuatro bordes, en PC y en móvil
const {chromium,devices}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];const out={};
const OBS=['stats','rtl','mtl','mbl','mbr','zm','relics','dpsmb','dpsc','emap','pkbar','rtyb'];
for(const [dev,opt] of [['pc',{viewport:{width:1280,height:720}}],['movil',devices['iPhone 13 landscape']]]){
 const c=await b.newContext(opt),p=await c.newPage();p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
 await p.goto('file://'+process.argv[2]);await p.waitForTimeout(700);
 await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;
  startGame(15);chooseHero(HIDS()[0]);for(let i=0;i<5&&DLG.on;i++)dlgEnd();try{if(LB.open)lbClose(true);}catch(e){}S.revAt=0;S.chests={};S.evts={};RL.open=false;HQ.q=[];if(HQ.cur)hintClose();
  for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
  RL.open=false;$('relic').classList.remove('open');S.chests={};S.phase='build';S.gold=5000;if(!S.deck.includes('arrow'))S.deck.push('arrow');
  for(let gy=0;gy<NC;gy++)for(let gx=0;gx<NC;gx++){if(S.cc[gy][gx]!==1)continue;S.tsel='arrow';const n=S.list.length;build(gx*K+K/2,gy*K+K/2);if(S.list.length>n){gy=NC;break;}}
  const t=S.list[S.list.length-1];t.lvl=4;t.spec=Object.keys(SPECS.arrow)[0];window._t=t;S.selT=t;tmOpen(t);ui();});
 await p.waitForTimeout(1500);await p.evaluate(()=>{try{if(LB.open)lbClose(true);}catch(e){}for(let i=0;i<5&&DLG.on;i++)dlgEnd();const q=$('toast');if(q)q.style.display='none';S.selT=_t;tmOpen(_t);ui();});await p.waitForTimeout(600);
 for(const edge of ['arriba','abajo','izquierda','derecha']){
  const r=await p.evaluate(([edge,OBS])=>{const t=_t,cvr=cv.getBoundingClientRect(),c=$('cw').getBoundingClientRect(),k=sc()/VIEW*cvr.width,ox=cvr.left-c.left,oy=cvr.top-c.top;
   const want={arriba:[c.width/2,40],abajo:[c.width/2,c.height-40],izquierda:[90,c.height/2],derecha:[c.width-90,c.height/2]}[edge];
   CAM.x=(t.x+.5)*CS-(want[0]-ox)/k;CAM.y=(t.y+.5)*CS-(want[1]-oy)/k;S.selT=t;TM.t=t;tmTick();tmPos(true);
   const obs=[];for(const id of OBS){const e=$(id);if(!e)continue;const s=getComputedStyle(e);if(s.display==='none'||s.visibility==='hidden'||+s.opacity===0)continue;const q=e.getBoundingClientRect();if(q.width>2&&q.height>2)obs.push([id,q]);}
   const bad=[];let n=0;for(const bt of document.querySelectorAll('#tmenu .tmb')){const q=bt.getBoundingClientRect();if(!q.width)continue;n++;
    if(q.left<0||q.top<0||q.right>innerWidth||q.bottom>innerHeight)bad.push(bt.dataset.tm+':fuera');
    for(const [id,o] of obs)if(q.left<o.right&&q.right>o.left&&q.top<o.bottom&&q.bottom>o.top)bad.push(bt.dataset.tm+':'+id);}
   return {n,bad,on:$('tmenu').classList.contains('on')};},[edge,OBS]);
  await p.waitForTimeout(150);await p.screenshot({path:`tests/out/anillo_${dev}_${edge}.png`});
  // la ficha de una habilidad (primer toque o ratón encima) tampoco pisa la interfaz ni los botones del anillo
  await p.evaluate(()=>{const b=document.querySelector('#tmenu .tmb[data-tm="abuy"]');TM.arm=b.dataset.k;tmCard();tmCardPos();});await p.waitForTimeout(300);
  const cr=await p.evaluate(OBS=>{tmCardPos();
   const q=$('tmcard').getBoundingClientRect(),bad=[];if(!q.width)return ['no sale la ficha'];for(const id of OBS){const e=$(id);if(!e)continue;const s=getComputedStyle(e);if(s.display==='none'||s.visibility==='hidden'||+s.opacity===0)continue;const o=e.getBoundingClientRect();
    if(o.width>2&&q.left<o.right&&q.right>o.left&&q.top<o.bottom&&q.bottom>o.top)bad.push(id);}
   for(const bt of document.querySelectorAll('#tmenu .tmb')){const o=bt.getBoundingClientRect();if(o.width&&q.left<o.right-2&&q.right>o.left+2&&q.top<o.bottom-2&&q.bottom>o.top+2)bad.push('botón '+bt.dataset.tm);}
   if(q.left<0||q.top<0||q.right>innerWidth||q.bottom>innerHeight)bad.push('fuera');return bad;},OBS);
  await p.waitForTimeout(150);await p.screenshot({path:`tests/out/anillo_ficha_${dev}_${edge}.png`});await p.evaluate(()=>{TM.arm=null;tmCard();});
  r.card=cr;
  out[dev+'_'+edge]=r;ck(r.on&&r.n>=4,`${dev} ${edge}: no sale el anillo`);ck(!r.bad.length,`${dev} ${edge}: el anillo pisa ${r.bad.join(', ')}`);ck(!r.card.length,`${dev} ${edge}: la ficha de la habilidad pisa ${r.card.join(', ')}`);}
 // anillo de construir en un solar libre, en los cuatro bordes
 await p.evaluate(()=>{tmClose();S.selT=null;S.deck=[...new Set(S.deck.concat(['arrow','mage','cryo','poison','cata']))].filter(k=>TW[k]);let q=null;for(let y=0;y<N&&!q;y++)for(let x=0;x<N&&!q;x++)if(S.cells[y][x]===1&&!S.occ[x+','+y]){const z=sqOf(x,y);if(z.x===x&&z.y===y)q=z;}window._q=q;bmOpen(q);ui();});await p.waitForTimeout(400);
 for(const edge of ['arriba','abajo','izquierda','derecha']){
  const r=await p.evaluate(([edge,OBS])=>{const q=_q,cvr=cv.getBoundingClientRect(),c=$('cw').getBoundingClientRect(),k=sc()/VIEW*cvr.width,ox=cvr.left-c.left,oy=cvr.top-c.top;
   const want={arriba:[c.width/2,40],abajo:[c.width/2,c.height-40],izquierda:[90,c.height/2],derecha:[c.width-90,c.height/2]}[edge];
   CAM.x=(q.x+.5)*CS-(want[0]-ox)/k;CAM.y=(q.y+.5)*CS-(want[1]-oy)/k;BM.s=q;bmTick();bmPos(true);
   const obs=[];for(const id of OBS){const e=$(id);if(!e)continue;const s=getComputedStyle(e);if(s.display==='none'||s.visibility==='hidden'||+s.opacity===0)continue;const o=e.getBoundingClientRect();if(o.width>2&&o.height>2)obs.push([id,o]);}
   const bad=[];let n=0;for(const bt of document.querySelectorAll('#bmenu .tmb')){const o=bt.getBoundingClientRect();if(!o.width)continue;n++;
    if(o.left<0||o.top<0||o.right>innerWidth||o.bottom>innerHeight)bad.push('fuera');
    for(const [id,b] of obs)if(o.left<b.right&&o.right>b.left&&o.top<b.bottom&&o.bottom>b.top)bad.push(id);}
   return {n,bad};},[edge,OBS]);
  await p.waitForTimeout(150);await p.screenshot({path:`tests/out/anillo_construir_${dev}_${edge}.png`});
  out['construir_'+dev+'_'+edge]=r;ck(r.n>=2,`${dev} ${edge}: no sale el anillo de construir`);ck(!r.bad.length,`${dev} ${edge}: el anillo de construir pisa ${[...new Set(r.bad)].join(', ')}`);}
 await c.close();}
ck(!errs.length,'errores: '+errs.join(' | '));
console.log(JSON.stringify(out));if(fails.length){console.log('FALLOS\n'+fails.join('\n'));console.log(JSON.stringify(errs));}
await b.close();process.exit(fails.length?1:0);})();
