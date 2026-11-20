// v352 · Fichas del mapa: pegadas a su opción hacia fuera del anillo, crecen con el zoom, «Ver en el compendio» (L), sin «casillas» y Vega centrada
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1600,height:900}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Test',intro:1,e2n:1,e2a:1,e2v:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const sol=await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.u_cp=true;startGame(15);chooseHero('reinhart');S.chests={};S.evts={};
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}}
 RL.open=false;$('relic').classList.remove('open');S.gold=300;S.deck=['arrow','frost','orb','cata'];ui();
 let best=null;for(let gy=0;gy<NC;gy++)for(let gx=0;gx<NC;gx++)if(S.cc[gy][gx]===1){const d=Math.hypot(gx*K-S.core.x,gy*K-S.core.y);if(!best||d<best[2])best=[gx,gy,d];}
 window._pl=best;const r=cellRect(best[0]*K,best[1]*K,K);return [(r.l+r.r)/2,(r.t+r.b)/2];});
async function hover(){await p.evaluate(()=>{try{bmClose();}catch(e){}});await p.waitForTimeout(150);
 const s=await p.evaluate(()=>{const r=cellRect(_pl[0]*K,_pl[1]*K,K);return [(r.l+r.r)/2,(r.t+r.b)/2];});await p.mouse.click(s[0],s[1]);await p.waitForTimeout(650);/* v361: al abrir el anillo la cámara puede alejarse un poco (0,35 s) */
 const bt=await p.evaluate(()=>{const q=document.querySelector('#bmenu .tmb[data-k="arrow"]').getBoundingClientRect();return[q.x+q.width/2,q.y+q.height/2];});await p.mouse.move(bt[0],bt[1]);await p.waitForTimeout(400);
 return p.evaluate(()=>{const c=$('bmcard'),r=c.getBoundingClientRect(),t=document.querySelector('#bmenu .tmb[data-k="arrow"]').getBoundingClientRect();
  const gap=Math.min(Math.abs(r.right-t.left),Math.abs(t.right-r.left),Math.abs(r.bottom-t.top),Math.abs(t.bottom-r.top));return {on:c.classList.contains('on'),w:r.width,gap,link:!!c.querySelector('.fzlink'),inV:r.left>=0&&r.top>=0&&r.right<=innerWidth&&r.bottom<=innerHeight};});}
await hover();const far=await hover();
await p.evaluate(()=>{CAM.z=ZMAX;try{clampCam&&clampCam();}catch(e){}const h=_pl;const r=cellRect(h[0]*K,h[1]*K,K);});
await p.evaluate(()=>{const r=cellRect(_pl[0]*K,_pl[1]*K,K);const a=sc();CAM.x+=((r.l+r.r)/2-innerWidth/2)/a;CAM.y+=((r.t+r.b)/2-innerHeight/2)/a;});await p.waitForTimeout(200);
const near=await hover();
const out={};out.far=far.on&&far.link&&far.inV&&far.gap<60;/* v361: si su sitio pisa la interfaz, la ficha se aparta unos píxeles */out.near=near.on&&near.inV;out.grows=near.w>far.w*1.3;
// L abre el compendio en esa torre
await p.keyboard.press('l');await p.waitForTimeout(500);out.compL=await p.evaluate(()=>!!document.querySelector('.book.open,#book.open,body.lbopen'));
// sin «casillas» en descripciones de torres y en la ficha; el bocadillo de Rango lo explica
Object.assign(out,await p.evaluate(()=>{const o={};let all='';for(const k in TW){try{all+=shopInfo(k,1);}catch(e){}}
 for(const id in AB){try{const D=AB[id];all+=typeof D.t==='function'?D.t(D.ranks?D.ranks[0]:{}):'';}catch(e){}}
 o.noCas=!/\d casillas?\b/.test(all.replace(/casillas? especial/g,''));o.rgv=document.querySelectorAll('#rgvcss').length===1;o.tip=/1 de rango = 1 casilla del mapa/.test(kwHtml('rng','shop:arrow'));
 o.vega=PCROP.vega==='24 22 72 72';return o;}));
const bad=Object.entries(out).filter(([k,v])=>v!==true).map(([k])=>k);console.log(JSON.stringify({far,near,out}));if(bad.length){console.log('FALLA: '+bad.join(', '));process.exit(1);}
await b.close();console.log('ERRS '+JSON.stringify(errs));if(errs.length)process.exit(1);})();
