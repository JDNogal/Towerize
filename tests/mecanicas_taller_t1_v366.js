// v366 · Enemigos nuevos del Taller, tanda 1 (Fantástica, partida 1): Limo que se parte, toque de cuerno del Cornetero, embestida del Jabalí y picado del Jinete de buitre.
// Las fichas son las del Taller (24-nov); aquí se cargan con tallerAplicar como lo hará el archivo exportado.
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(async()=>{const out={};{const i=document.getElementById('intro');if(i)i.style.display='none';}INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;
 const rep=tallerAplicar({en:{
  i06potenciador:{n:'Cornetero orco',era:1,fac:'Pieles verdes',fam:'Apoyo',tipo:'tierra',rg:'No ataca',col:'#e08a2e',st:{am:10,ap:0,dmg:1,gold:5,hp:50,sp:.7,ud:2},contra:'Matarlo primero o ralentizar.'},
  i07divisor:{n:'Limo',era:1,fac:'Monstruos',fam:'Guerreros',tipo:'tierra',rg:'Cuerpo a cuerpo',col:'#5a8a3a',st:{am:0,ap:0,dmg:1,gold:3,hp:90,sp:.8,ud:5}},
  i47minilimo:{n:'Mini limo',era:1,fac:'Monstruos',fam:'Guerreros',tipo:'tierra',rg:'Cuerpo a cuerpo',col:'#6a9a4a',st:{am:0,ap:0,dmg:1,gold:1,hp:25,sp:1,ud:2},tam:.8},
  i37buitre:{n:'Jinete de buitre goblin',era:1,fac:'Pieles verdes',fam:'Guerreros',tipo:'aire',rg:'Cuerpo a cuerpo',col:'#8a6a3a',st:{am:0,ap:5,dmg:1,gold:6,hp:55,sp:1.2,ud:6}},
  i43jabali:{n:'Jabalí de guerra',era:1,fac:'Pieles verdes',fam:'Rápidos',tipo:'tierra',rg:'Cuerpo a cuerpo',col:'#7a5a3a',st:{am:0,ap:10,dmg:1,gold:6,hp:60,sp:1.6,ud:6}},
  i01portalero:{n:'Portalero',era:1,fac:'Demonios',fam:'Místicos',tipo:'tierra',rg:'No ataca',st:{hp:200,sp:.8}}},
  sq:{qcharanga:{custom:true,era:1,pz:1,min:3,n:'Charanga de prueba',lead:'i06potenciador',m:{i06potenciador:1,norm:4},f:[[['norm',0,-1],['norm',0,1],['i06potenciador',1.5,0],['norm',3,-1],['norm',3,1]]]}}});
 // los cinco de la tanda entran encendidos; el que no tiene mecánica hecha, apagado
 out.carga=rep.en===6&&rep.enOff.length===1&&rep.enOff[0]==='i01portalero'&&!ET.i07divisor.hidden&&ET.i07divisor.split.i47minilimo===3&&ET.i06potenciador.horn===1&&ET.i43jabali.charge===1&&ET.i37buitre.dive===1&&ET.i37buitre.fly===1&&!SQUADS.qcharanga.off;
 out.compendio=EFAM.some(f=>f[1].includes('i43jabali'))&&!EFAM.some(f=>f[1].includes('i01portalero'))&&kwHtml0('ehorn','').includes('50 %')&&kwHtml0('echarge','').includes('5 s')&&ETIP2.i06potenciador.includes('ralentizar');
 startGame(15);chooseHero('reinhart');if(DLG.on)dlgEnd();S.chests={};S.evts={};RL.open=false;HQ.q=[];
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
 RL.open=false;S.phase='build';const P0=S.portals[0];
 /* un volador clavado junto al portal mantiene la oleada abierta mientras se prueba cada cosa (las unidades no van a por voladores) */
 const limpio=()=>{S.enemies=[];S.espw=[];for(const q of S.portals){q.q=[];q.qf=[];}spawnEnemy('bat',P0,null);const k=S.enemies[S.enemies.length-1];k.hp=k.max=1e9;k.fx.root={t:1e9,m:1e9};};
 const run=(t,fn)=>{for(let i=0;i<Math.round(t/.05);i++){update(.05);if(fn&&fn())return true;}return false;};
 for(const q of S.portals){q.sq=[];q.sqm=[];q.plan={norm:0,fast:0,tank:0,mini:0,elite:0,boss:0};}startWave();limpio();S.hp=999;
 // el héroe, lejos del portal para que no estorbe
 // ---------- Limo ----------
 spawnEnemy('i07divisor',P0,null);run(.5);const limo=S.enemies.find(e=>e.t==='i07divisor');hurt(limo,1e5,null,'phys');run(.6);
 const minis=S.enemies.filter(e=>e.t==='i47minilimo');out.limo=minis.length===3&&new Set(minis.map(e=>e.fln)).size===3&&!S.enemies.includes(limo);
 for(const e of minis)hurt(e,1e5,null,'phys');run(.6);out.miniNoDivide=S.enemies.filter(e=>e.t==='i47minilimo').length===0;
 // ---------- Cornetero: cada 7 s, +50 % 2 s a su escuadrón, sin romper la formación ----------
 limpio();{const fo=sqForm('qcharanga',SQUADS.qcharanga.m);const sp=Math.min(...fo.map(o=>ET[o.t].sp));for(const o of fo)spawnEnemy(o.t,P0,{r:o.r,l:o.l,sp,sid:'t1',lead:o.lead});}
 const corn=S.enemies.find(e=>e.t==='i06potenciador'),orc=S.enemies.find(e=>e.t==='norm');S.hero.s.hp=0;S.hero.s.rt=999;
 run(2.5);out.cuernoAntes=!(orc.hornU>S.wt)&&orc.fsp>0;
 const t0=S.wt;run(1.2,()=>orc.hornU>S.wt);out.cuerno=orc.hornU>S.wt&&corn.hornU>S.wt&&Math.abs((orc.hornU-S.wt)-HORNT)<.11;
 {const anda=t=>{let d=0,x=orc.x,y=orc.y;for(let i=0;i<Math.round(t/.05);i++){update(.05);d+=Math.hypot(orc.x-x,orc.y-y);x=orc.x;y=orc.y;}return d;};const d1=anda(1.5);run(1);const d2=anda(1.5);out.cuernoRapido=d1>d2*1.4&&d1<d2*1.6;out.cuernoV=[d1.toFixed(2),d2.toFixed(2)].join('/');}
 out.cuernoFormacion=orc.fsp>0&&!orc.loose;
 run(8,()=>orc.hornU>S.wt+1.5);out.cuernoRepite=orc.hornU>S.wt&&S.wt-t0>HORNCD-1&&S.wt-t0<HORNCD+2.5;
 // otro orco suelto y lejos no acelera
 // ---------- Jabalí ----------
 limpio();S.gold=99999;/* un solar pegado al camino y a medio trayecto entre el portal y el núcleo, para que todo lo que sale pase por delante */let sol=null,bd=1e9;{const mx=(P0.x+S.core.x)/2,my=(P0.y+S.core.y)/2;S.field=S.field||field();
  for(let ky=0;ky<NC;ky++)for(let kx=0;kx<NC;kx++)if(S.cc[ky][kx]===1){const x=kx*K+KC,y=ky*K+KC;if(S.occ[x+','+y])continue;let adj=false;for(const[dx,dy]of[[K,0],[-K,0],[0,K],[0,-K]]){const px=x+dx,py=y+dy;if(inb(px,py)&&S.cells[py][px]===2&&S.field[py][px]<1e9)adj=true;}
   if(!adj)continue;const d=Math.hypot(x-mx,y-my);if(d<bd){bd=d;sol={x,y};}}}
 S.deck=['bastion'];S.tsel='bastion';build(sol.x,sol.y);const T=S.list[0];run(1.5);
 const uno=()=>{for(const s of T.sd.slice(1)){s.hp=0;s.rt=999;}T.sd[0].hp=T.sd[0].max=9999;};const todos=()=>{for(const s of T.sd){s.hp=s.max=9999;s.rt=0;}};
 // con un solo soldado: lo tumba 1 s y pasa
 uno();spawnEnemy('i43jabali',P0,null);const j1=S.enemies[S.enemies.length-1];j1.hp=j1.max=1e6;
 const tumbado=run(20,()=>T.sd[0].udwn>0);out.jabaliTumba=tumbado&&j1.chgc>CHGCD-.2&&!j1.stopped;
 run(.5);out.jabaliPasa=!j1.stopped&&T.sd[0].udwn>0&&!T.sd[0].fight;run(.7);out.jabaliSeLevanta=!(T.sd[0].udwn>0);
 // con la embestida gastada sí se le para
 limpio();todos();spawnEnemy('i43jabali',P0,null);const j2=S.enemies[S.enemies.length-1];j2.hp=j2.max=1e6;j2.chgc=999;out.jabaliGastado=run(20,()=>j2.stopped)&&!T.sd.some(s=>s.udwn>0);
 // ralentizado no embiste
 limpio();todos();run(.3);spawnEnemy('i43jabali',P0,null);const j3=S.enemies[S.enemies.length-1];j3.hp=j3.max=1e6;let par=false;for(let i=0;i<400&&!par;i++){slowE(j3,.7,1);update(.05);par=j3.stopped;}out.jabaliLento=par&&!T.sd.some(s=>s.udwn>0)&&!(j3.chgc>0);
 // ---------- Jinete de buitre ----------
 limpio();todos();for(const s of T.sd)s.hp=s.max=48;run(.3);spawnEnemy('i37buitre',P0,null);const v=S.enemies[S.enemies.length-1];v.hp=v.max=1e6;v.dvc=0;/* sin la espera inicial: la torre puede estar muy cerca del portal */
 out.buitreVuela=isFly(v);const aviso=run(25,()=>v.dvw>0);out.buitreAvisa=aviso&&isFly(v);
 const hp0=T.sd.map(s=>s.hp);const x0=v.x,y0=v.y;run(DIVEWARN+.1);const golpes=T.sd.filter((s,i)=>s.hp<hp0[i]).length;
 out.buitreGolpea=golpes>=1&&golpes<=DIVEN&&!isFly(v)&&v.dvd>0&&Math.hypot(v.x-x0,v.y-y0)<.01;
 run(DIVEDOWN+.15);out.buitreSube=isFly(v)&&v.dvc>DIVECD-.5;
 // sin unidades cerca no baja
 limpio();for(const s of T.sd){s.hp=0;s.rt=999;}spawnEnemy('i37buitre',P0,null);const v2=S.enemies[S.enemies.length-1];v2.hp=v2.max=1e6;out.buitreSinUnidades=!run(8,()=>v2.dvw>0||v2.dvd>0);
 return out;});
const bad=Object.keys(r).filter(k=>r[k]!==true&&k!=='cuernoV');console.log(JSON.stringify(r));console.log(bad.length?'FALLA: '+bad.join(', '):'mecanicas_taller_t1 ok');console.log(errs.length?'ERRS '+JSON.stringify(errs.slice(0,5)):'ERRS []');await b.close();process.exit(bad.length||errs.length?1:0);})();
