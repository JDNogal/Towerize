// Jefes de historia (v293-v295): Rey Goblin, ARGOS, Troll del Abismo y la Forja, y su orden según la historia
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
 {const so=setup(2,'vega');S.phase='build';S.tsel='arrow';for(const q of so.slice(0,4))build(q[0],q[1]);}S.phase='wave';spawnEnemy('boss',S.portals[0],null);const A=S.enemies.find(e=>e.t==='argos');out.argos=!!A;const gs=S.enemies.filter(e=>e.t==='gen');out.gens=gs.length===3;
 const h0=A.hp;hurt(A,500,null,'phys');out.inv=A.hp===h0;
 for(let i=0;i<900&&!gs.some(g=>g.anch);i++)update(.05);out.anch=gs.some(g=>g.anch);
 for(const g of gs)g.hp=0;bossTick(.05);out.down=A.sh===0;hurt(A,500,null,'phys');out.hurt=A.hp<h0;
 A.shT=59.99;bossTick(.05);out.call=S.enemies.filter(e=>e.t==='gen'&&e.hp>0).length>=1;
 // orden según la historia
 S.era=1;S.round=ROUNDS;STO.p=0;const o1=storyBoss();STO.p=1;const o2=storyBoss();S.round=ROUNDS-1;const o2m=storyBoss();S.round=ROUNDS;S.era=2;STO.bb=0;const o3=storyBoss();STO.bb=1;const o4=storyBoss();
 out.order=o1==='kgob'&&o2==='atroll'&&o2m==='kgob'&&o3==='argos'&&o4==='forge';STO.p=3;S.era=1;S.sbP=null;out.rand=SBOSS[1].includes(storyBoss());STO.p=0;STO.bb=0;
 // Troll del Abismo y la Forja
 setup(1,'reinhart');const sl2=[];for(let y=0;y<N;y++)for(let x=0;x<N;x++)if(S.cells[y][x]===1&&!S.occ[x+','+y]){const q=sqOf(x,y);if(q.x===x&&q.y===y)sl2.push([x,y]);}
 S.phase='build';S.tsel='bastion';build(sl2[0][0],sl2[0][1]);const b2=S.list[S.list.length-1];S.phase='wave';
 const P0=S.portals[0];const T={t:'atroll',x:P0.x,y:P0.y,tx:P0.x,ty:P0.y,hp:400,max:1000,fx:{}};S.enemies=[T];for(let i=0;i<21;i++)boss2Tick(.05);const g1=T.hp-400;out.abreg=g1>0;T.hp=400;T.bn=3;for(let i=0;i<21;i++)boss2Tick(.05);const g2=T.hp-400;T.hp=400;T.bn=0;T.ct=1;T.rgT=0;for(let i=0;i<21;i++)boss2Tick(.05);const g3=T.hp-400;T.ct=0;out.abcut=g2>0&&g2<g1*.5&&g3<g1&&g3>g2;
 for(const s of b2.sd){s.x=T.x+.5;s.y=T.y;s.hp=s.max;s.cd=0;}T.stc=0;boss2Tick(.05);out.stomp=b2.sd.some(s=>s.cd>=1&&s.hp<s.max);
 const Fg={t:'forge',x:P0.x,y:P0.y,tx:P0.x,ty:P0.y,hp:1000,max:1000,fx:{},lnc:0,lbc:0};S.enemies=[Fg];boss2Tick(.05);eliteTick(.05);out.line=S.enemies.filter(e=>e.t==='auto').length===2&&S.enemies.some(e=>e.t==='carrier');S.enemies=[];
 // Señor del Abismo y el Simbionte
 S.era=1;S.round=ROUNDS;STO.p=2;const o5=storyBoss();S.era=2;STO.bb=2;const o6=storyBoss();out.order3=o5==='alord'&&o6==='symb';STO.p=0;STO.bb=0;S.era=1;
 S.wt=S.wt||10;const tw={x:P0.x+1,y:P0.y,type:'arrow',jam:0};const L1=S.list;S.list=[tw];
 const AL={t:'alord',x:P0.x,y:P0.y,tx:P0.x,ty:P0.y,hp:1000,max:1000,fx:{},rfc:0,pc:0};S.enemies=[AL];boss3Tick(.05);eliteTick(.05);out.rift=S.enemies.filter(e=>ET[e.t].fac==='d'&&e!==AL).length===3;
 out.pwarn=AL.pw>0&&!(tw.jam>0);for(let i=0;i<32;i++)boss3Tick(.05);out.penta=AL.pa>0&&tw.jam>0;
 out.gnd=!isFly(AL);AL.hp=200;boss3Tick(.05);out.wings=isFly(AL)&&AL.spx>1;S.wt+=20;boss3Tick(.05);out.land=!isFly(AL)&&AL.spx===1;
 tw.jam=0;const SY={t:'symb',x:P0.x,y:P0.y,tx:P0.x,ty:P0.y,hp:1000,max:1000,fx:{},plc:0};S.enemies=[SY];boss3Tick(.05);out.shell=armorOf(SY,'phys')>=80&&armorOf(SY,'magic')<=10;out.pulseW=SY.pv2>0&&!(tw.jam>0);
 for(let i=0;i<32;i++)boss3Tick(.05);out.pulse=tw.jam>1;
 SY.hp=480;boss3Tick(.05);out.core=SY.ph2===1&&armorOf(SY,'magic')>=70&&armorOf(SY,'phys')<=10&&SY.spx>1;
 const food={t:'drone',x:P0.x+.5,y:P0.y,tx:P0.x,ty:P0.y,hp:50,max:50,fx:{}};S.enemies.push(food);SY.etc=0;const hh=SY.hp;boss3Tick(.05);out.eat=!S.enemies.includes(food)&&SY.hp>hh;
 SY.hp=200;boss3Tick(.05);out.fury=SY.fury===1&&SY.spx===2;S.enemies=[];S.list=L1;
 out.vis=['kgob','atroll','alord','argos','forge','symb'].every(k=>!ET[k].gen);out.kw=['throne','riches','scepter','gens','anchor','abregen','stomp','line','rift','penta','wings','shell','pulse','core2'].every(k=>kwHtml0(k,'').includes('<b>'));
 return out;});
const f=[];const ck=(c,m)=>{if(!c)f.push(m);};
ck(r.kgob&&r.porters,'el Rey Goblin no sale con sus porteadores');ck(r.isBoss,'el Rey Goblin no cuenta como jefe');ck(r.stuck,'los porteadores no van pegados al trono');ck(r.treas,'no lanza Lluvia de riquezas');ck(r.fell,'no se cae al morir los porteadores');ck(r.gold,'no da el oro de los tesoros');
ck(r.argos&&r.gens,'ARGOS no sale con sus generadores');ck(r.inv,'ARGOS no es invulnerable con escudo');ck(r.anch,'los generadores no se anclan');ck(r.down&&r.hurt,'el escudo no cae');ck(r.call,'ARGOS no llama a otro generador');ck(r.order,'el orden de los jefes según la historia está mal');ck(r.rand,'con la historia completa no sale un jefe válido');ck(r.abreg&&r.abcut,'regeneración del Troll del Abismo mal');ck(r.stomp,'el Troll del Abismo no pisotea');ck(r.line,'la Forja no fabrica');ck(r.order3,'el tercer jefe no sale en la tercera partida');ck(r.rift,'el Señor del Abismo no abre portales');ck(r.pwarn&&r.penta,'pentagrama mal');ck(r.gnd&&r.wings&&r.land,'alas mal');ck(r.shell&&r.core,'fases del Simbionte mal');ck(r.pulseW&&r.pulse,'pulso mal');ck(r.eat,'el Simbionte no devora');ck(r.fury,'furia mal');ck(r.vis,'algún jefe queda oculto en el compendio');ck(r.kw,'faltan palabras clave');
console.log(f.length?'FALLOS '+JSON.stringify(f)+' '+JSON.stringify(r):'jefes ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
