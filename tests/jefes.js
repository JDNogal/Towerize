// Jefes de historia (v293): Rey Goblin con su trono y ARGOS con sus generadores de escudo
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const out={};INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;
 const setup=(era,hero)=>{let sol=[];for(let tr=0;tr<8&&sol.length<2;tr++){ERA=era;OPT.u_era=1;startGame(15);chooseHero(hero);if(DLG.on)dlgEnd();S.chests={};S.evts={};RL.open=false;HQ.q=[];
  for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
  RL.open=false;S.phase='build';S.gold=99999;S.deck=['arrow','bastion'];sol=[];for(let y=0;y<N;y++)for(let x=0;x<N;x++)if(S.cells[y][x]===1&&!S.occ[x+','+y]){const q=sqOf(x,y);if(q.x===x&&q.y===y)sol.push([x,y]);}}
  for(const p of S.portals){p.sq=[];p.sqm=[];p.plan={norm:0,fast:0,tank:0,custodian:0,mini:0,elite:0,boss:0,colossus:0};}S.round=15;startWave();S.enemies=[];return sol;};
 // Rey Goblin
 const sol=setup(1,'reinhart');S.tsel='bastion';build(sol[0][0],sol[0][1]);const bt=S.list[S.list.length-1];S.phase='wave';
 spawnEnemy('boss',S.portals[0],null);const k=S.enemies.find(e=>e.t==='kgob');out.kgob=!!k;out.porters=S.enemies.filter(e=>e.t==='porter').length===4;out.isBoss=!!k&&isBoss(k);
 for(let i=0;i<10;i++)update(.05);out.stuck=S.enemies.filter(e=>e.t==='porter').every(q=>Math.hypot(q.x-k.x,q.y-k.y)<1.2);
 for(const s of bt.sd){s.x=k.x+.5;s.y=k.y;s.hp=s.max;}k.rc=0;bossTick(.05);out.treas=(S.treas||[]).length===1;
 for(const q of S.enemies)if(q.t==='porter')q.hp=0;bossTick(.05);out.fell=k.fall>0&&!!k.fx.stun;
 const g0=S.gold;achDeath(k);out.gold=S.gold>g0&&(S.treas||[]).length===0;
 // ARGOS
 setup(2,'vega');S.phase='wave';spawnEnemy('boss',S.portals[0],null);const A=S.enemies.find(e=>e.t==='argos');out.argos=!!A;const gs=S.enemies.filter(e=>e.t==='gen');out.gens=gs.length===3;
 const h0=A.hp;hurt(A,500,null,'phys');out.inv=A.hp===h0;
 for(let i=0;i<400&&!gs.every(g=>g.anch);i++)update(.05);out.anch=gs.some(g=>g.anch);
 for(const g of gs)g.hp=0;bossTick(.05);out.down=A.sh===0;hurt(A,500,null,'phys');out.hurt=A.hp<h0;
 A.shT=59.99;bossTick(.05);out.call=S.enemies.filter(e=>e.t==='gen'&&e.hp>0).length>=1;
 out.kw=['throne','riches','scepter','gens','anchor'].every(k=>kwHtml0(k,'').includes('<b>'));
 return out;});
const f=[];const ck=(c,m)=>{if(!c)f.push(m);};
ck(r.kgob&&r.porters,'el Rey Goblin no sale con sus porteadores');ck(r.isBoss,'el Rey Goblin no cuenta como jefe');ck(r.stuck,'los porteadores no van pegados al trono');ck(r.treas,'no lanza Lluvia de riquezas');ck(r.fell,'no se cae al morir los porteadores');ck(r.gold,'no da el oro de los tesoros');
ck(r.argos&&r.gens,'ARGOS no sale con sus generadores');ck(r.inv,'ARGOS no es invulnerable con escudo');ck(r.anch,'los generadores no se anclan');ck(r.down&&r.hurt,'el escudo no cae');ck(r.call,'ARGOS no llama a otro generador');ck(r.kw,'faltan palabras clave');
console.log(f.length?'FALLOS '+JSON.stringify(f)+' '+JSON.stringify(r):'jefes ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
