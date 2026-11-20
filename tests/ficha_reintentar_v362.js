// v362: la ficha de una torre no tapa «Reintentar» (abajo en el centro durante la oleada, en PC) ni el resto de la interfaz
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:720}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(700);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;
 startGame(15);chooseHero(HIDS()[0]);for(let i=0;i<5&&DLG.on;i++)dlgEnd();try{if(LB.open)lbClose(true);}catch(e){}S.chests={};S.evts={};RL.open=false;HQ.q=[];if(HQ.cur)hintClose();
 for(let k=0;k<4;k++)for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok){RL.open=false;S.chests={};if(S.phase!=='place'){S.phase='place';deal();}break;}}
 RL.open=false;$('relic').classList.remove('open');S.chests={};S.phase='build';S.gold=99999;
 for(let gy=0;gy<NC;gy++)for(let gx=0;gx<NC;gx++){if(S.cc[gy][gx]!==1)continue;S.tsel='arrow';const n=S.list.length;build(gx*K+K/2,gy*K+K/2);if(S.list.length>n){gy=NC;break;}}
 window._t=S.list[S.list.length-1];S.phase='build';S.rc=2;startWave();try{if(LB.open)lbClose(true);}catch(e){}ui();try{hudRow();}catch(e){}});
await p.waitForTimeout(1500);
const r=await p.evaluate(async()=>{/* que no se abra ninguna ventana encima mientras se mide */setInterval(()=>{RL.open=false;$('relic').classList.remove('open');document.body.classList.remove('lbopen');try{hudRow();}catch(e){}},30);await new Promise(r=>setTimeout(r,120));await new Promise(r=>setTimeout(r,100));const t=_t,cvr=cv.getBoundingClientRect(),rb=$('rtyb').getBoundingClientRect();if(!rb.width)return {err:'no sale Reintentar',cls:document.body.className,on:$('rtyb').className,disp:getComputedStyle($('rtyb')).display,relic:$('relic').className,html:$('rtyb').innerHTML.length};
 // la torre justo encima de «Reintentar»: su ficha caería encima
 const k=sc()/VIEW*cvr.width;CAM.x=(t.x+.5)*CS-((rb.left+rb.right)/2-cvr.left)/k;CAM.y=(t.y+.5)*CS-(rb.top-40-cvr.top)/k;HQ.q=[];if(HQ.cur)hintClose();pinTower(t);
 await new Promise(r=>setTimeout(r,400));ui();await new Promise(r=>setTimeout(r,200));const q=$('tip').getBoundingClientRect(),o=$('rtyb').getBoundingClientRect();
 return {tip:[q.left,q.top,q.right,q.bottom].map(Math.round),rty:[o.left,o.top,o.right,o.bottom].map(Math.round),pisa:q.left<o.right&&q.right>o.left&&q.top<o.bottom&&q.bottom>o.top,dentro:q.left>=0&&q.top>=0&&q.right<=innerWidth&&q.bottom<=innerHeight};});
await p.screenshot({path:'tests/out/ficha_reintentar_v362.png'});
const fails=[];if(r.err)fails.push(r.err);else{if(r.pisa)fails.push('la ficha tapa «Reintentar»');if(!r.dentro)fails.push('la ficha se sale de la pantalla');}if(errs.length)fails.push('errores: '+errs.join(' | '));
console.log(JSON.stringify(r));if(fails.length)console.log('FALLOS\n'+fails.join('\n'));await b.close();process.exit(fails.length?1:0);})();
