// v354 · interfaz de PC: fila ☰ F3 X (misma altura), «Reintentar» abajo en el centro durante la oleada, medidor de daño, cajones y barra de Almas
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Test',intro:1,e2n:1,e2a:1,e2v:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(async()=>{const W=ms=>new Promise(r=>setTimeout(r,ms));const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;OPT.fps=true;startGame(15);chooseHero('reinhart');for(let i=0;i<5&&DLG.on;i++)dlgEnd();HQ.q=[];
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}}
 RL.open=false;$('relic').classList.remove('open');S.gold=99999;S.deck=['orb','bunker'];ui();
 const free=[];for(let gy=0;gy<NC;gy++)for(let gx=0;gx<NC;gx++)if(S.cc[gy][gx]===1)free.push([gx,gy,Math.hypot(gx*K-S.core.x,gy*K-S.core.y)]);free.sort((a,b)=>a[2]-b[2]);
 let j=0;const T={};for(const k of S.deck){S.tsel=k;for(;j<free.length;j++){const n=S.list.length;build(free[j][0]*K+K/2,free[j][1]*K+K/2);if(S.list.length>n){T[k]=S.list[S.list.length-1];j++;break;}}}S.tsel=null;
 const o={};const R=s=>{const e=document.querySelector(s);return e?e.getBoundingClientRect():null;};
 startWave();ui();await W(900);const m=R('#mtl [data-a="pause"]'),f3=R('#mtl [data-a="bugrep"]'),x=R('#mtl [data-a="rngall"]');o.row=!!(m&&f3&&x)&&Math.abs(m.top-f3.top)<2&&Math.abs(m.top-x.top)<2&&m.left<f3.left&&f3.left<x.left&&Math.abs(m.height-f3.height)<2;
 o.noRetryTop=!document.querySelector('#mtl [data-a="retry"]');
 await W(1500);const rb=R('#rtyb .rtyp');o.retryBottom=!!rb&&Math.abs((rb.left+rb.right)/2-640)<4&&rb.bottom>680;
 const fp=R('#fps');o.fpsH=!!fp&&Math.abs(fp.height-m.height)<2&&fp.left>x.right;
 o.dps=!!document.querySelector('#dpsc.on .lh');document.querySelector('#dpsc .cl').click();await W(300);o.fold=!!document.querySelector('#dpsc.drwF .drt');document.querySelector('#dpsc .drt').click();await W(300);o.unfold=!!document.querySelector('#dpsc:not(.drwF) .lh');
 const tb=document.querySelectorAll('#dpsc .dtb');o.tabs=tb.length>=3;
 const orb=T.orb;orb.lvl=4;orb.spec='reap';orb.ab={raise:2,knight:1};orb.raised=4;pinTower(orb);await W(600);o.almas=!!document.querySelector('canvas.albc')&&/4 \/ 10/.test(document.querySelector('.fb-almas .ftml').textContent);
 o.img=!!almaImg('knight')&&!!almaImg('spectre');
 return o;});
console.log(JSON.stringify(r));for(const k in r)ck(r[k],k);
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'hud_v354 ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
