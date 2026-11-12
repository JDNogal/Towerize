// Compendio enlazado: botón 📖 en fichas y bocadillos, pestaña Mecánicas, flechas de evolución y aviso de enemigo nuevo
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const shots=process.env.SHOTS;
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Test',intro:1,e2n:1,e2a:1,e2v:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;ACHS.curious=Date.now();ERA=1;startGame(15);chooseHero('reinhart');if(DLG.on)dlgEnd();S.chests={};S.evts={};RL.open=false;HQ.q=[];if(HQ.cur)hintClose();});
await p.mouse.click(5,5);await p.waitForTimeout(200);
for(let k=0;k<3;k++){const bt=await p.$('button:has-text("Elegir a")');if(bt){try{await bt.click({force:true,timeout:1500});}catch(e){}await p.waitForTimeout(300);}}
const r1=await p.evaluate(()=>{const out={};RL.open=false;document.getElementById('relic').classList.remove('open');SEEOK=true;
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
 RL.open=false;S.phase='build';S.gold=9999;S.deck=['arrow','bastion'];
 const sol=[];for(let y=0;y<N;y++)for(let x=0;x<N;x++)if(S.cells[y][x]===1&&!S.occ[x+','+y]){const q=sqOf(x,y);if(q.x===x&&q.y===y)sol.push([x,y]);}
 S.tsel='arrow';build(sol[0][0],sol[0][1]);const t=S.list[0];S.tsel=null;
 // ficha de la torre con botón 📖
 openPrim({key:'tw:'+t.id,html:()=>towerInfo(t),rect:cellRect(t.x-1,t.y-1,K)});PR.pinned=true;refreshPrim();
 const box=PMN()?document.getElementById('tip'):document.getElementById('side');out.twBtn=!!box.querySelector('.cpgo[data-t="tw"][data-v="arrow"]');
 // aviso de enemigo nuevo: la primera vez que sale un tipo
 out.seenBefore=!!SEEN.en.norm;startWave();for(let i=0;i<20;i++)update(.05);out.q=NEC.q.slice();out.cur=NEC.cur;return out;});
await p.waitForTimeout(600);
const r2=await p.evaluate(()=>({notice:!!document.querySelector('#nenot.on .nenot'),cur:NEC.cur}));
if(shots)await p.screenshot({path:shots+'/v287_aviso.png'});
await p.click('#nenot .nenot');await p.waitForTimeout(250);
const r3=await p.evaluate(()=>({card:!!document.querySelector('#necard.on'),held:NEC.open,tip:(document.querySelector('#necard p')||{}).textContent||'',btn:!!document.querySelector('#necard .cpgo')}));
if(shots)await p.screenshot({path:shots+'/v287_ficha_corta.png'});
await p.click('#necard .cpgo');await p.waitForTimeout(700);
const r4=await p.evaluate(()=>({book:LB.open,tab:CP.tab,sel:CP.sel.en,cardClosed:!NEC.open,evo:document.querySelectorAll('#comp .bkevo').length,how:/Cómo enfrentarlo/.test(document.getElementById('comp').textContent)}));
if(shots){await p.evaluate(()=>{for(const k of Object.keys(ET))see('en',k);CP.sel.en='vet';renderComp();});await p.waitForTimeout(500);await p.screenshot({path:shots+'/v287_evolucion.png'});}
const r5=await p.evaluate(()=>{for(const k of Object.keys(ET))see('en',k);see('tw','sala');CP.tab='mc';CP.sel.mc='burn';renderComp();const c=document.getElementById('comp');return{mc:/Mecánicas/.test(c.textContent),burn:/Quemadura/.test(c.textContent),red:/Reducción/.test(c.textContent),q:c.querySelectorAll('.bti.un').length,uses:c.querySelectorAll('.mecuse').length};});
if(shots){await p.waitForTimeout(400);await p.screenshot({path:shots+'/v287_mecanicas.png'});}
// desde una ficha de «Lo usan» se salta a la torre
const want=await p.evaluate(()=>{const u=document.querySelector('#comp .mecuse');if(u){const t=u.dataset.t;u.click();return t;}return null;});await p.waitForTimeout(300);
const r6=await p.evaluate(()=>({tab:CP.tab}));r6.want=want;
// bocadillo de palabra clave con 📖 que abre Mecánicas
await p.evaluate(()=>{lbClose(true,true);});await p.waitForTimeout(300);
const r7=await p.evaluate(()=>{const t=S.list[0];openPrim({key:'tw:'+t.id,html:()=>towerInfo(t),rect:cellRect(t.x-1,t.y-1,K)});PR.pinned=true;refreshPrim();const box=PMN()?document.getElementById('tip'):document.getElementById('side');const k=box.querySelector('.kw[data-kw="dmg"]')||box.querySelector('.kw');openKw(k,0);const d=KS[KS.length-1].el;return{kwBtn:!!d.querySelector('.cpgo'),t:(d.querySelector('.cpgo')||{dataset:{}}).dataset.t};});
if(shots){await p.waitForTimeout(200);await p.screenshot({path:shots+'/v287_boton.png'});}
ck(r1.twBtn,'la ficha de una torre no tiene el botón 📖');ck(!r1.seenBefore&&(r1.q.includes('norm')||r1.cur==='norm'||r2.cur==='norm'),'no se avisa del primer Guerrero ('+JSON.stringify(r1)+')');
ck(r2.notice,'el aviso de enemigo nuevo no se ve abajo');ck(r3.card&&r3.held&&r3.tip.length>10&&r3.btn,'al pulsar el aviso no sale la ficha corta con «Cómo enfrentarlo» y su 📖');
ck(r4.book&&r4.tab==='en'&&r4.sel==='norm'&&r4.cardClosed,'el 📖 de la ficha corta no abre el compendio en el enemigo ('+JSON.stringify(r4)+')');ck(r4.how,'la ficha del compendio no tiene «Cómo enfrentarlo»');
ck(r5.mc&&r5.burn&&r5.red&&r5.uses>0,'la pestaña Mecánicas no muestra la Quemadura con «Reducción» y quién la usa ('+JSON.stringify(r5)+')');
ck(r6.want&&r6.tab===r6.want,'«Lo usan» no lleva a su ficha ('+JSON.stringify(r6)+')');ck(r7.kwBtn&&r7.t==='mc','el bocadillo de palabra clave no tiene 📖 a Mecánicas ('+JSON.stringify(r7)+')');
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'compendio_enlace ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
