// v299 · Héroes de la era 2 (Korr, Ferro, Kai), sus reliquias y los charcos en franja
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Test',intro:1,e2n:1,e2a:1,e2v:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const out={};const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;OPT.u_era=false;OPT.u_hr=false;
 // bloqueados de serie y visibles solo en la era 2
 h2Locks();out.locked=!!HEROES.korr.lockTxt&&!!HEROES.ferro.lockTxt&&!!HEROES.kai.lockTxt;
 ERA=1;startGame(15);out.era1=!HIDS().includes('korr');ERA=2;startGame(15);out.era2=['korr','ferro','kai'].every(h=>HIDS().includes(h));
 STO.h_korr=1;h2Locks();out.unlock=!HEROES.korr.lockTxt&&!!HEROES.ferro.lockTxt;OPT.u_hr=true;h2Locks();out.unlAll=!HEROES.kai.lockTxt;
 out.ports=['korr','ferro','kai'].every(h=>/<svg/.test(portrait(h,1))&&/<svg/.test(portrait(h)));
 out.sheet=['korr','ferro','kai'].every(h=>heroSheet(h).includes(HEROES[h].n)&&heroSheet(h).includes(RELIC[HEROES[h].relic].n));
 const clr=()=>{S.enemies=[];const P=S.portals[0],e={t:'norm',x:P.x,y:P.y,tx:P.x,ty:P.y,hp:1e9,max:1,fx:{freeze:{t:1e9}}};S.enemies.push(e);};
 const game=h=>{ERA=2;startGame(15);chooseHero(h);if(DLG.on)dlgEnd();S.revAt=0;S.chests={};S.evts={};RL.open=false;HQ.q=[];if(HQ.cur)hintClose();
  for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
  RL.open=false;S.phase='build';S.hp=999;for(const q of S.portals){q.sq=[];q.sqm=[];q.plan={norm:0,fast:0,tank:0,custodian:0,mini:0,elite:0,boss:0,colossus:0};}startWave();clr();return S.hero;};
 const mk=(dx,hp,t)=>{const H=S.hero,r=h2Route(Math.round(H.s.x),Math.round(H.s.y),Math.max(0,dx)),c=r[Math.min(r.length-1,Math.max(0,dx))];const e={t:t||'norm',x:c.x,y:c.y,tx:c.x,ty:c.y,hp:hp||500,max:hp||500,fx:{}};S.enemies.push(e);return e;};
 const run=(s)=>{for(let i=0;i<Math.round(s/.05);i++)update(.05);};
 // ---------- Korr ----------
 let H=game('korr');out.kRelic=S.relics[0]==='seal';out.kDeck=S.deck.join()==='nano,sonic';H.lvl=8;heroSync();
 startHab('b');out.kNoTarget=!H.tau&&!(H.bcd>0);
 let a=mk(5,900),b2=mk(6,900),c=mk(7,900);startHab('b');out.kTaunt=!!H.tau&&a.tau>0&&H.bcd>0&&Math.hypot(a.x-H.s.x,a.y-H.s.y)<=2;
 const hp0=H.s.hp;hitUnit(H.s,40,a);out.kReduce=Math.abs((hp0-H.s.hp)-10)<.01;out.kReflect=a.hp<900&&H.tau.acc>0;
 run(1);out.kRoot=!!a.fx.root;out.kHitBack=H.s.hp<hp0-10;run(3.3);out.kEnd=!H.tau&&a.tau===0;out.kBoom=b2.hp<900&&c.hp<900;
 // resistencia mágica y aura
 clr();H.s.hp=H.s.max;const m=mk(1,500,'demon');const h1=H.s.hp;hitUnit(H.s,50,m);out.kMR=(h1-H.s.hp)<49;
 // definitiva
 H.lvl=10;heroSync();H.s.hp=H.s.max;clr();H.bcd=0;H.ucd=0;a=mk(3,5000);const d0=stats(H.pt).dmg;startHab('u');out.kForm=H.form>0&&H.big===1&&!!a.fx.fear&&stats(H.pt).dmg>d0*1.4;
 const h2=H.s.hp;hitUnit(H.s,50,a);out.kFormRed=Math.abs((h2-H.s.hp)-30)<.01;
 H.bcd=0;delete a.fx.fear;{const r2=h2Route(Math.round(H.s.x),Math.round(H.s.y),2),c2=r2[r2.length-1];a.x=a.tx=c2.x;a.y=a.ty=c2.y;}const ah=a.hp;startHab('b');out.kCharge=!!H.chg&&a.hp<ah&&H.bcd===10;
 run(26);out.kFormEnd=!(H.form>0)&&!H.big;
 // ---------- Ferro ----------
 H=game('ferro');out.fRelic=S.relics[0]==='cell';H.lvl=1;
 a=mk(4,5000);startHab('b');out.fStrip=S.strips.length===1&&S.strips[0].cells.length>=6&&H.bcd>0;const n3=S.strips[0].cells.length;
 run(1.2);out.fPois=!!(a.ps&&a.ps.length)&&brkOf(a)>0&&!(a.bn>0);
 H.lvl=8;H.bcd=0;S.strips=[];startHab('b');out.fLong=S.strips[0].cells.length>n3&&S.strips[0].burn>0;run(1.2);out.fBurn=a.bn>0;
 const z0=a.ez?a.ez.n:0;c=mk(5,5000);onHit(a,H.pt);out.fArc=a.ez&&a.ez.n>z0&&c.ez&&c.ez.n>0&&c.hp<5000;
 H.lvl=10;H.ucd=0;S.strips=[];a.hp=a.max=1e6;const pre=a.hp;startHab('u');out.fPurge=a.hp<pre&&a.fus>0&&!(a.ps&&a.ps.length)&&!(a.bn>0)&&!a.ez&&!!a.fx.stun&&H.ucd>0;
 out.fArmor0=armorOf(a,'phys')<=0&&armorOf(a,'magic')<=0;run(5.2);out.fFusEnd=!(a.fus>0)&&a.apx===undefined;
 clr();H.ucd=0;mk(2,500);startHab('u');out.fNoStates=H.ucd===0;
 // Célula de la Forja
 clr();a=mk(3,1e5);const x1=mk(4,1e5),x2=mk(5,1e5);addPois(a,5,H.pt);addBurn(a,H.pt,5);
 const m1=e2DmgM(a,H.pt,'phys'),m0=e2DmgM(x1,H.pt,'phys');out.cPas=Math.abs(m1/m0-1.1)<.001;
 useRelic('cell');out.cAim=S.aim==='cell';NR.cell.use({x:a.x,y:a.y});out.cCopy=!!(x1.ps&&x1.ps.length)&&x1.bn>0&&x2.bn>0;S.aim=null;
 // ---------- Kai ----------
 H=game('kai');out.xRelic=S.relics[0]==='board';H.lvl=1;
 startHab('b');out.xNoTarget=!(H.bcd>0);
 a=mk(6,1000);b2=mk(7,1000);a.hp=200;b2.hp=600;startHab('b');out.xExec=a.hp<=0&&b2.hp===600&&Math.hypot(H.s.x-a.x,H.s.y-a.y)<=1.5&&H.bcd>0;
 clr();H.bcd=0;a=mk(3,1000);a.hp=900;startHab('b');out.xHit=a.hp>0&&a.hp<900;
 H.lvl=8;H.bcd=0;clr();const q1=mk(3,1000),q2=mk(4,1000),q3=mk(5,1000);q1.hp=q2.hp=q3.hp=100;startHab('b');run(1);out.xChain=q1.hp<=0&&q2.hp<=0&&q3.hp<=0;
 // camuflaje
 clr();H.s.hp=H.s.max*.4;H.ccd=0;run(.1);out.xCamo=H.camo>0;const e9=mk(0,1000);const hh=H.s.hp;hitUnit(H.s,30,e9);out.xUntouch=H.s.hp>=hh;run(3.7);out.xCamoEnd=!(H.camo>0)&&H.s.hp>=H.s.max*.74&&H.s.hp<=H.s.max*.8&&H.ccd>30;
 // definitiva
 H.lvl=10;heroSync();H.s.hp=H.s.max;H.ucd=0;clr();a=mk(1,1e5);startHab('u');run(.4);out.xDance=!!H.dance&&a.hp<1e5&&a.mk&&a.mk.t>0&&H.inv>0;run(3);out.xDanceEnd=!H.dance;
 // Tablón de recompensas
 clr();a=mk(3,300);b2=mk(4,9000);S.wt=7;S.bqR=0;boardTick(.05);out.bWanted=b2.bnty===1&&!a.bnty;
 let g0=S.gold;hurt(b2,1e6,null,'elem');run(.1);out.bPaid=S.gold>g0+15;
 a=mk(3,300);b2=mk(4,9000);useRelic('board');out.bContract=b2.ctr>0&&b2.mk&&b2.mk.t>=19&&S.rs.board.cd>0&&!a.ctr;
 g0=S.gold;hurt(b2,1e6,null,'elem');run(.1);const base=killGoldF(b2.t);out.bTriple=S.gold-g0>=base*2;
 // Sello psiónico
 H=game('korr');a=mk(8,1000);const ax=a.x,ay=a.y,rr=h2Route(Math.round(H.s.x),Math.round(H.s.y),5),ctr=rr[Math.min(rr.length-1,4)];useRelic('seal');out.sAim=S.aim==='seal';NR.seal.use(ctr);out.sPull=!!a.fx.slow&&Math.hypot(a.x-ctr.x,a.y-ctr.y)<=Math.hypot(ax-ctr.x,ay-ctr.y);S.aim=null;
 const e5=mk(1,1000);S.rs.seal.cd=0;const u=unitTowers().map(t=>t.sd).flat().find(s=>s.hp>0);hitUnit(u,20,e5);out.sReflect=e5.hp<1000;
 // logro de Kai
 OPT.u_hr=false;delete ACHS.caza;S.elK=0;for(let k=0;k<3;k++){const el=mk(2,100,Object.keys(ET).find(t=>ET[t].el));hurt(el,1e6,null,"elem");}run(.1);out.ach=!ACHS.caza&&!h2Has("kai");
 return out;});
await p.screenshot({path:__dirname+'/out/heroes_e2.png'});
const bad=Object.entries(r).filter(([k,v])=>v!==true).map(([k])=>k);console.log(JSON.stringify(r));if(bad.length){console.log('FALLA: '+bad.join(', '));process.exit(1);}
await b.close();console.log('ERRS '+JSON.stringify(errs));if(errs.length)process.exit(1);})();
