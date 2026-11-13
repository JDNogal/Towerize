// Amenazas, tanda 2: Asedio sin tregua (la oleada empieza sola), Inflación (precio sube por torre del mismo tipo) y Niebla de guerra (se ven al detectarlos)
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;startGame(15);chooseHero('reinhart');for(let i=0;i<5&&DLG.on;i++)dlgEnd();HQ.q=[];if(HQ.cur)hintClose();});
await p.waitForTimeout(600);
const r=await p.evaluate(()=>{try{lbClose(true);}catch(e){}RL.open=false;$('relic').classList.remove('open');
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
 RL.open=false;$('relic').classList.remove('open');document.body.classList.remove('pcpick');S.phase='build';S.gold=9999;S.amz={inf:1,ase:1,nie:3};ui();
 const k=S.deck[0],c0=TW[k].cost0||TW[k].cost;const sol=[];for(let y=0;y<N;y++)for(let x=0;x<N;x++)if(S.cells[y][x]===1&&!S.occ[x+','+y]){const q=sqOf(x,y);if(q.x===x&&q.y===y)sol.push([x,y]);}
 S.tsel=k;build(sol[0][0],sol[0][1]);ui();return {k,c0,c1:TW[k].cost};});
for(let i=0;i<20;i++){if(await p.evaluate(()=>AZASE.t!=null))break;await p.waitForTimeout(200);}await p.evaluate(()=>{AZASE.t=.4;});for(let i=0;i<20;i++){await p.waitForTimeout(300);if(await p.evaluate(()=>S.phase==="wave"))break;}
r.wave=await p.evaluate(()=>S.phase);r.dbg=await p.evaluate(()=>JSON.stringify({t:AZASE.t,pc:document.body.classList.contains('pcpick'),rl:RL.open,lb:LB.open,dlg:DLG.on,sp:S.speed,menu:document.body.classList.contains('inmenu'),rank:azRank('ase')}));
r.fog=await p.evaluate(()=>{const t=S.list.find(x=>!x.hero);const mk=(dx)=>{const hp=ehpOf('norm',1),q={t:'norm',x:t.x+dx,y:t.y,tx:t.x+dx,ty:t.y,hp,max:hp,fx:{},src:null,pv:[t.x,t.y]};S.enemies.push(q);return q;};const a=mk(0.2),f=mk(40);azFogTick();return [!!a.fog,!!f.fog];});
r.nie=await p.evaluate(()=>{const b=S.phase;S.phase='build';const nx=rtlDot(S.round),far=rtlDot(S.round+2);const pi=portalInfo(S.portals[0]||{plan:{}});S.amz.nie=1;const pi1=portalInfo(S.portals[0]||{plan:{}});S.amz.nie=4;const P=S.portals.slice();let inDraw=-1;const _g=S;draw();const back=S.portals.length===P.length;S.amz.nie=3;S.phase=b;return {back,r4:AZT.find(t=>t[0]==='nie')[3].length===4,far:(far.c||'')+(far.h||''),pi:/Sin información/.test(pi),pi1:/Sin información/.test(pi1)};});
console.log(JSON.stringify(r));
ck(r.c1===Math.round(r.c0*1.1),'Inflación: la segunda torre del mismo tipo cuesta un 10 % más ('+r.c0+' → '+r.c1+')');
ck(r.wave==='wave','Asedio sin tregua: al acabarse el tiempo, la oleada empieza sola ('+r.wave+')');
ck(!r.nie.far,'Niebla R1: la línea de rondas no enseña más allá de la siguiente');
ck(r.nie.pi&&!r.nie.pi1,'Niebla R3: el portal no dice qué sale (y en R1 sí)');
ck(r.nie.back&&r.nie.r4,'Niebla R4: existe y, tras dibujar sin portales, los portales vuelven intactos');
ck(r.fog[0]&&!r.fog[1],'Niebla de guerra: se ve el que está al alcance y no el lejano');
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'amenazas2 ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
