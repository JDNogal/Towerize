const OUT=require('path').join(__dirname,'out');require('fs').mkdirSync(OUT,{recursive:true});
const {chromium,devices}=require('playwright');(async()=>{const b=await chromium.launch();const mob=process.argv[3]==='m';
const ctx=await b.newContext(mob?{...devices['iPhone 13 landscape']}:{viewport:{width:1280,height:720}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);const sfx=mob?'m_':'';
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;localStorage.setItem('rt-tutchoice','skip');startGame(15);chooseHero('sylvana');S.chests={};S.evts={};
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
 let sq=null;for(let ky=0;ky<NC&&!sq;ky++)for(let kx=0;kx<NC&&!sq;kx++){const q={kx,ky,x:kx*K+1,y:ky*K+1};if(bmFree(q))sq=q;}if(sq){S.gold=999;bmBuildNow(S.deck[0],sq);}
 S.st.dmg=18430;S.st.kills=212;S.st.gKill=640;S.st.gRound=420;if(S.list[0]){S.list[0].dmgT=7820;S.list[0].kills=90;S.list[0].act=120;}S.hero.pt.dmgT=3900;S.round=9;S.phase='lost';endGame();});
await p.waitForTimeout(500);
// v352: primero la página de la puntuación sumándose; Saltar la acaba y Continuar pasa a la de siempre
{const t=await p.evaluate(()=>[LB.endv,!!document.querySelector('#sctlist')]);console.log('puntuación primero',t);if(t[0]!=='tally'||!t[1])process.exit(1);
 await p.screenshot({path:OUT+'/b6_'+sfx+'tally.png'});await p.click('#comp [data-a="scskip"]');await p.waitForTimeout(3000);
 const d=await p.evaluate(()=>[SCT.done,document.querySelectorAll('#sctlist .sctit').length===S.scF.rows.length,$('scttot').textContent===fi(S.scF.t)]);console.log('sumada',d);if(d.includes(false))process.exit(1);
 await p.screenshot({path:OUT+'/b6_'+sfx+'tally_fin.png'});await p.click('#comp [data-a="sccont"]');await p.waitForTimeout(500);}
console.log('final',await p.evaluate(()=>[LB.open,LB.area,!!LB.end]));await p.screenshot({path:OUT+'/b6_'+sfx+'end.png'});
await p.click('#comp [data-a="hideend"]');await p.waitForTimeout(600);console.log('ver mapa',await p.evaluate(()=>[LB.open]));await p.screenshot({path:OUT+'/b6_'+sfx+'map.png'});
await p.evaluate(()=>act({target:document.querySelector('[data-a="results"]')||Object.assign(document.createElement('button'),{dataset:{a:'results'}})}));await p.evaluate(()=>{if(!LB.open)lbOpen('end');});await p.waitForTimeout(300);console.log('resumen otra vez',await p.evaluate(()=>[LB.open,LB.area]));
if(!mob){await p.click('#comp [data-a="lbarea"][data-v="lg"]');await p.waitForTimeout(300);console.log('logros desde el final',await p.evaluate(()=>LB.area));await p.keyboard.press('Escape');await p.waitForTimeout(200);console.log('Esc vuelve al resumen',await p.evaluate(()=>LB.area));}
await p.click('#comp .lbft [data-a="menu"]');await p.waitForTimeout(500);console.log('menú principal (única salida)',await p.evaluate(()=>[LB.open,LB.area,LB.step,S.round]));
console.log(JSON.stringify(errs));await b.close();})();
