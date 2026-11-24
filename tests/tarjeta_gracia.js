// Fichas del anillo de construir y del menú de torre: al salir del botón aguantan un momento, se puede llegar a ellas y abrir sus palabras clave
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(700);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;
 startGame(15);chooseHero(HIDS()[0]);if(DLG.on)dlgEnd();try{if(LB.open)lbClose(true);}catch(e){}S.revAt=0;S.chests={};S.evts={};RL.open=false;HQ.q=[];if(HQ.cur)hintClose();
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
 RL.open=false;S.phase='build';S.gold=5000;ui();});
await p.waitForTimeout(1200);
const pos=await p.evaluate(()=>{/* v365: con 5 carriles el mapa ya no cabe entero en la pantalla; se elige el solar libre más cercano al centro de la ventana */let best=null,bd=1e9;for(let ky=0;ky<NC;ky++)for(let kx=0;kx<NC;kx++){if(S.cc[ky][kx]!==1)continue;const x=kx*K+KC,y=ky*K+KC;if(S.occ[x+','+y])continue;const r=cellRect(x,y,1),px=(r.l+r.r)/2,py=(r.t+r.b)/2,d=Math.hypot(px-innerWidth/2,py-innerHeight/2);if(d<bd){bd=d;best={x:px,y:py};}}return best;});
const ctr=r=>({x:r.x+r.width/2,y:r.y+r.height/2});
const glide=async(a,c,n)=>{for(let i=1;i<=n;i++){await p.mouse.move(a.x+(c.x-a.x)*i/n,a.y+(c.y-a.y)*i/n);await p.waitForTimeout(16);}};
// --- anillo de construir
await p.mouse.click(pos.x,pos.y);await p.waitForTimeout(500);
const bt=await p.$('#bmenu .tmb');ck(!!bt,'no sale el anillo');
if(bt){const a=ctr(await bt.boundingBox());await p.mouse.move(a.x,a.y);await p.waitForTimeout(250);
 ck(await p.evaluate(()=>$('bmcard').classList.contains('on')),'la ficha del anillo no sale al pasar el ratón');
 await p.mouse.move(a.x,a.y+200);await p.waitForTimeout(150);ck(await p.evaluate(()=>$('bmcard').classList.contains('on')),'la ficha del anillo se cierra nada más salir del botón');
 await p.waitForTimeout(600);ck(!(await p.evaluate(()=>$('bmcard').classList.contains('on'))),'la ficha del anillo no se cierra al alejarse');
 await p.mouse.move(a.x,a.y);await p.waitForTimeout(250);const c=ctr(await (await p.$('#bmcard')).boundingBox());await glide(a,c,10);await p.waitForTimeout(700);
 ck(await p.evaluate(()=>$('bmcard').classList.contains('on')),'la ficha del anillo se cierra al ir hasta ella');
 // construir para el menú de torre
 await p.evaluate(()=>{const k=bmDeck()[0];BM.arm=k;bmBuildNow(k);});}
await p.waitForTimeout(400);
// --- menú de torre
await p.mouse.move(5,400);await p.waitForTimeout(300);
await p.evaluate(()=>{const t=S.list[0];t.lvl=4;
 // una torre y especialización cuyas habilidades lleven palabras clave
 for(const ty of Object.keys(SPECS))for(const sp of Object.keys(SPECS[ty])){t.type=ty;t.spec=sp;S.selT=t;tmOpen(t);tmTick();if([...document.querySelectorAll('#tmenu .tmb')].some(b=>/class="kw/.test(tmInfo(b.dataset.k,t).h)))return;}});await p.waitForTimeout(500);
const tbs=await p.$$('#tmenu .tmb');let kwOk=false,tested=false,stay=false;
{const tb=tbs[0];const a=ctr(await tb.boundingBox());await p.mouse.move(a.x,a.y);await p.waitForTimeout(300);
 if(await p.evaluate(()=>$('tmcard').classList.contains('on'))){tested=true;
  const c=ctr(await (await p.$('#tmcard')).boundingBox());await glide(a,c,12);await p.waitForTimeout(800);stay=await p.evaluate(()=>$('tmcard').classList.contains('on'));
  // palabra clave dentro de la ficha (se añade una para no depender del texto de cada habilidad)
  await p.evaluate(()=>{const s=document.createElement('div');s.innerHTML='<span class="kw" data-kw="burn">quemadura</span>';$('tmcard').appendChild(s);tmCardPos();});await p.waitForTimeout(200);
  const kr=await p.evaluate(()=>{const r=$('tmcard').querySelector('.kw').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2};});
  await glide(c,kr,6);await p.waitForTimeout(1200);
  kwOk=await p.evaluate(()=>$('tmcard').classList.contains('on')&&!!document.querySelector('.kpanel'));
  if(kwOk){const kp=await p.evaluate(()=>{const r=document.querySelector('.kpanel').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2};});await glide(kr,kp,8);await p.waitForTimeout(800);
   ck(await p.evaluate(()=>$('tmcard').classList.contains('on')&&!!document.querySelector('.kpanel')),'la ficha se cierra al pasar a la palabra clave');}}}
ck(tested,'no sale la ficha del menú de torre');ck(stay,'la ficha del menú de torre se cierra al ir hasta ella');ck(!tested||kwOk,'no se pueden abrir las palabras clave de la ficha del menú de torre');
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'tarjeta_gracia ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
