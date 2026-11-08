const OUT=require('path').join(__dirname,'out');require('fs').mkdirSync(OUT,{recursive:true});
const {chromium,devices}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const run=async(name,ctxo)=>{const ctx=await b.newContext(ctxo);const p=await ctx.newPage();p.on('pageerror',e=>errs.push(name+': '+e.message));
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;localStorage.setItem('rt-tutchoice','skip');startGame(15);chooseHero(Object.keys(HEROES)[0]);S.chests={};
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
 RL.open=false;$('relic').classList.remove('open');S.gold=500;for(let ky=0;ky<NC;ky++)for(let kx=0;kx<NC;kx++)if(S.cc[ky][kx]===1&&S.list.length<2){S.tsel=S.list.length?'bastion':'arrow';build(kx*K+1,ky*K+1);}S.tsel=null;S.selT=null;tmClose&&tmClose();
 for(const id of ['coin','horn'])if(!S.relics.includes(id)){S.relics.push(id);S.rs[id]={cd:0,t:0,n:0};}startWave();for(let i=0;i<300;i++)update(1/30);RL.open=false;$('relic').classList.remove('open');});
await p.waitForTimeout(300);
if(name==='pc'){console.log(await p.evaluate(()=>JSON.stringify({aim:S.aim,tsel:S.tsel,pi:S.pi,selT:!!S.selT,pr:PR.pinned,rl:RL.open,cp:CP.open,op:OP.open,fo:FO.open,hq:!!HQ.cur,ph:S.phase,inm:document.body.classList.contains('inmenu')})));await p.keyboard.press('Escape');}else{await p.click('#mtl [data-a="pause"]');}
await p.waitForTimeout(300);console.log(name,'pause',await p.evaluate(()=>[PMU.open,S.speed]));await p.screenshot({path:`${OUT}/p_${name}.png`});
await p.click('#comp [data-a="lbarea"][data-v="st"]');await p.waitForTimeout(200);
for(const t of ['run','dmg','rel','hero','en']){await p.click(`#comp .bkmk[data-a="stab"][data-v="${t}"]`);await p.waitForTimeout(120);await p.screenshot({path:`${OUT}/s_${name}_${t}.png`});}
await p.click('#comp [data-a="lbx"]');await p.waitForTimeout(100);
console.log(name,'after stats',await p.evaluate(()=>[PMU.open,LB.cover]));
if(name==='pc'){await p.keyboard.press('Escape');await p.waitForTimeout(150);console.log('esc close',await p.evaluate(()=>[PMU.open,S.speed]));
 // error bubble: click relic horn during... set phase build to trigger error
 await p.evaluate(()=>{S.phase='build';renderRelics();});await p.waitForTimeout(200);const r=await p.evaluate(()=>{const b=[...document.querySelectorAll('#relics .rl')].find(x=>x.dataset.id==='horn');const q=b.getBoundingClientRect();return[q.x+q.width/2,q.y+q.height/2];});
 await p.mouse.click(r[0],r[1]);await p.waitForTimeout(300);console.log('bubble',await p.evaluate(()=>{const e=$('errb');if(!e)return null;const q=e.getBoundingClientRect();return [e.textContent,e.className,Math.round(q.x),Math.round(q.y),Math.round(q.right),innerWidth];}));await p.screenshot({path:OUT+'/errb.png'});}
await ctx.close();};
await run('pc',{viewport:{width:1280,height:800}});
await run('mob',{...devices['iPhone 13 landscape']});
console.log(errs);await b.close();})();
