// v303 · Reliquias de la era 2, segunda tanda (doce de cofre)
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Test',intro:1,e2n:1,e2a:1,e2v:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const out={};const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;OPT.u_era=false;OPT.u_hr=true;OPT.u_rl=false;
 const NEW=['trojan','drone','implant','barrel','starmap','jetpack','scouter','satlaser','gravity','clone','aichip','beacon'];
 out.defs=NEW.every(id=>RELIC[id]&&RELIC[id].era===2&&RELIC[id].cd>0&&!RELIC[id].evr&&typeof RELIC[id].pas()==='string'&&typeof RELIC[id].act()==='string'&&/Pasivo/.test(rdesc(id)));
 out.noNames=NEW.every(id=>!/^\s*<b>[^<]*<\/b>\s*:/.test(RELIC[id].act()));
 const clr=()=>{S.enemies=[];const P=S.portals[0],e={t:'norm',x:P.x,y:P.y,tx:P.x,ty:P.y,hp:1e9,max:1,fx:{freeze:{t:1e9}}};S.enemies.push(e);};
 const game=(era,h)=>{ERA=era;startGame(15);chooseHero(h);if(DLG.on)dlgEnd();S.revAt=0;S.chests={};S.evts={};RL.open=false;HQ.q=[];if(HQ.cur)hintClose();
  for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
  RL.open=false;S.phase='build';S.hp=999;S.gold=99999;for(const q of S.portals){q.sq=[];q.sqm=[];q.plan={norm:0,fast:0,tank:0,custodian:0,mini:0,elite:0,boss:0,colossus:0};}return S.hero;};
 const wave=()=>{startWave();clr();};
 const mk=(dx,hp,t)=>{const H=S.hero,r=h2Route(Math.round(H.s.x),Math.round(H.s.y),Math.max(0,dx)),c=r[Math.min(r.length-1,Math.max(0,dx))];const e={t:t||'norm',x:c.x,y:c.y,tx:c.x,ty:c.y,hp:hp||500,max:hp||500,fx:{}};S.enemies.push(e);return e;};
 const run=(s)=>{for(let i=0;i<Math.round(s/.05);i++)update(.05);};
 const give=id=>{if(!S.relics.includes(id))gainRelic(id);S.rs[id].cd=0;S.rs[id].t=0;};
 const sol=()=>{const a=[];for(let ky=0;ky<NC;ky++)for(let kx=0;kx<NC;kx++)if(S.cc[ky][kx]===1&&!S.occ[(kx*K+1)+','+(ky*K+1)])a.push({x:kx*K+1,y:ky*K+1});return a;};
 const bld=(ty)=>{const c=sol()[0];if(!S.deck.includes(ty))S.deck.push(ty);S.tsel=ty;build(c.x,c.y);return S.list[S.list.length-1];};

 try{let H=game(1,'reinhart');let seen1=new Set();for(let k=0;k<400;k++)seen1.add(rndRelic());out.chestEra1=!NEW.some(id=>seen1.has(id));
 H=game(2,'vega');let seen2=new Set();for(let k=0;k<1500;k++)seen2.add(rndRelic());out.chestEra2=NEW.every(id=>seen2.has(id));
 const t1=bld('bunker');wave();
 // Virus troyano
 give('trojan');let a=mk(5,1e5),b=mk(5,1e5);const c0=a.max;useRelic('trojan');out.trAim=S.aim==='trojan';out.trUse=NR.trojan.use({x:a.x,y:a.y})===true;S.aim=null;
 const hk=a.hk>0?a:b,ot=hk===a?b:a;out.trHk=hk.hk===10&&!!hk.fx.fear;out.trImm=hurt(hk,100,t1,'phys')===0;const o0=ot.hp;run(1.2);out.trHits=ot.hp<o0;
 out.trSlow=/r3On\('trojan'\)/.test(skTick.toString())&&/r3On\('trojan'\)/.test(bossTick.toString());
 // Dron
 give('drone');clr();run(.1);out.drPos=!!DRN.p;const cm=mk(3,1e5);cm.fx.freeze={t:99};DRN.p={x:cm.x,y:cm.y};DRN.cd=0;const ch=cm.hp;run(.05);out.drShot=cm.hp<ch;
 const ce={t:Object.keys(ET).find(k=>ET[k].camo)||'norm',x:S.core.x+1,y:S.core.y,tx:S.core.x+1,ty:S.core.y,hp:1e5,max:1e5,fx:{freeze:{t:99}}};S.enemies.push(ce);run(.1);out.drRev=!ET[ce.t].camo||ce.rev>0;
 a=mk(4,1e5);useRelic('drone');NR.drone.use({x:a.x,y:a.y});S.aim=null;out.drBomb=a.hp<1e5&&!!a.fx.stun;
 // Implante
 const hp0=heroHpM(),d0=stats(H.pt).dmg;give('implant');out.imPas=Math.abs(heroHpM()/hp0-1.2)<1e-9&&stats(H.pt).dmg>d0*1.09;H.bcd=10;useRelic('implant');run(1);out.imAct=H.bcd<=8.05;
 // Bidón
 give('barrel');clr();a=mk(4,50);hurt(a,1e4,null,'elem');run(.1);out.brPas=(S.rads||[]).length>0;const z=S.rads[0];b=mk(4,1e5);b.x=z.x;b.y=z.y;run(.6);const h1=b.hp;b.hp+=500;run(.05);out.brNoHeal=b.hp<=h1;
 // Mapa estelar
 give('starmap');run(.05);out.smPas=S.chest4===1;clr();a=mk(4,1e5);useRelic('starmap');NR.starmap.use({x:a.x,y:a.y});S.aim=null;run(2.5);out.smWait=S.mets.length===1;run(.7);out.smHit=S.mets.length===0&&a.hp<1e5&&a.bn>0;
 // Mochila cohete
 give('jetpack');out.jpSpd=Math.abs(uSpdM(H.pt)-1.3)<1e-6||uSpdM(H.pt)>1.29;clr();a=mk(6,1e5);useRelic('jetpack');out.jpUse=NR.jetpack.use({x:a.x,y:a.y})===true;S.aim=null;out.jpLand=Math.hypot(H.s.x-a.x,H.s.y-a.y)<1.5&&a.hp<1e5&&!!a.fx.stun;
 // Rastreador
 give('scouter');clr();a=mk(4,5000);useRelic('scouter');NR.scouter.use({x:a.x,y:a.y});S.aim=null;out.scHit=Math.abs(a.hp-4500)<1;
 S.rs.scouter.cd=0;b=mk(4,20000);useRelic('scouter');const rr=NR.scouter.use({x:b.x,y:b.y});S.aim=null;setCD('scouter');out.sc9000=rr==='msg'&&Math.abs(b.hp-16000)<1&&S.rs.scouter.cd>RELIC.scouter.cd*1.5;
 // Satélite
 give('satlaser');clr();a=mk(5,1e6);S.satT=19.9;run(.2);out.satAim=!!S.satX;run(1.1);out.satHit=a.hp<1e6;
 b=mk(3,1e6);useRelic('satlaser');out.swUse=NR.satlaser.use({x:b.x,y:b.y})===true;S.aim=null;run(.6);out.swHit=b.hp<1e6&&b.bn>0;
 // Gravedad
 give('gravity');clr();a=mk(4,1e5);slowE(a,.5,5);const g1=e2DmgM(a,t1,'phys');delete a.fx.slow;const g0=e2DmgM(a,t1,'phys');out.gvPas=g1>g0*1.14;
 useRelic('gravity');NR.gravity.use({x:a.x,y:a.y});S.aim=null;run(.2);out.gvAct=a.gpin>0&&!!a.fx.slow;
 // Clonación
 give('clone');const sum0=(S.summ||[]).length;useRelic('clone');out.clAct=(S.summ||[]).length===sum0+1&&S.summ[S.summ.length-1].sd[0].clone===H.id;
 const rnd=Math.random;Math.random=()=>0.01;const tr=bld('robots');const s0=tr.sd[0];S.rs.clone.cd=0;s0.hp=0;unitDeath(tr,s0);Math.random=rnd;out.clRev=s0.hp===s0.max;
 // Chip IA
 give('aichip');out.aiPas=!!tgtAI(t1,stats(t1));t1.mman=1;out.aiMan=!tgtAI(t1,stats(t1));t1.mman=0;useRelic('aichip');clr();a=mk(4,10);t1.cd=5;hurt(a,1e3,t1,'phys');out.aiReset=t1.cd===0;
 // Baliza
 give('beacon');const n0=S.list.length,dst=sol()[0],lv=t1.lvl;useRelic('beacon');out.bcStep=NR.beacon.use({x:t1.x,y:t1.y})===false&&S.bcSrc===t1.id;out.bcUse=NR.beacon.use(dst)===true;S.aim=null;
 const nt=S.list[S.list.length-1];out.bcMove=S.list.length===n0&&!S.list.includes(t1)&&nt.type==='bunker'&&nt.lvl===lv&&!nt.holo&&nt.tpb===8;
 clr();S.bcR=-1;S.rs.beacon.cd=0;a=mk(1,1e5);a.org={x:S.portals[0].x,y:S.portals[0].y};let lk=0;for(let k=0;k<4000&&!lk;k++){if(Math.hypot(a.x-a.org.x,a.y-a.org.y)<.01&&k>0){lk=1;break;}if(move(a,.05))lk=2;}out.bcPas=lk===1&&S.bcR===S.round;b=mk(1,1e5);let l2=0;for(let k=0;k<4000&&!l2;k++)if(move(b,.05))l2=1;out.bcOnce=l2===1;
 }catch(x){out.err=String(x.stack).slice(0,600);}return out;});
await p.screenshot({path:__dirname+'/out/reliquias_e2b.png'});
const bad=Object.entries(r).filter(([k,v])=>v!==true).map(([k])=>k);console.log(JSON.stringify(r));if(bad.length){console.log('FALLA: '+bad.join(', '));process.exit(1);}
await b.close();console.log('ERRS '+JSON.stringify(errs));if(errs.length)process.exit(1);})();
