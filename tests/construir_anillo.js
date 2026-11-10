// Construir con el anillo y el ratón: pulsar un solar, pulsar la torre dos veces → se construye
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(700);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;
 startGame(15);chooseHero(HIDS()[0]);if(DLG.on)dlgEnd();try{if(LB.open)lbClose(true);}catch(e){}S.revAt=0;S.chests={};S.evts={};RL.open=false;HQ.q=[];if(HQ.cur)hintClose();
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
 RL.open=false;S.phase='build';ui();});
await p.waitForTimeout(1500);
const pos=await p.evaluate(()=>{for(let ky=0;ky<NC;ky++)for(let kx=0;kx<NC;kx++){if(S.cc[ky][kx]!==1)continue;const x=kx*K+1,y=ky*K+1;if(S.occ[x+','+y])continue;const r=cellRect(x-1,y-1,3);return {x:(r.l+r.r)/2,y:(r.t+r.b)/2};}});
await p.mouse.click(pos.x,pos.y);await p.waitForTimeout(500);const btn=await p.$('#bmenu .tmb');ck(!!btn,'no sale el anillo');
if(btn){const bb=await btn.boundingBox();await p.mouse.click(bb.x+bb.width/2,bb.y+bb.height/2);await p.waitForTimeout(300);await p.mouse.click(bb.x+bb.width/2,bb.y+bb.height/2);await p.waitForTimeout(500);
 ck(await p.evaluate(()=>S.list.length)===1,'pulsar dos veces la torre del anillo no construye');}
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'construir_anillo ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
