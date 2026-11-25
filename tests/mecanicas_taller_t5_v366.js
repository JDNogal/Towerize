// v366 · Enemigos nuevos del Taller, tanda 5 (Distópica, partida 2): Gusano excavador, Amalgama, Garrapata del vacío, Dron arpón, Inhibidor, Nexo de colmena, Fragata de escudo y Saltador cuántico.
// Las fichas son las del Taller (24-nov); aquí se cargan con tallerAplicar como lo hará el archivo exportado.
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
/* mapa y azar fijos (semilla), para que la prueba mida siempre lo mismo; con SEMILLA=n se prueba con otro mapa */
await p.addInitScript(s0=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}let a=s0>>>0;Math.random=()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};},+(process.env.SEMILLA||7));
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(async()=>{const out={};{const i=document.getElementById('intro');if(i)i.style.display='none';}INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;
 const rep=tallerAplicar({en:{
  i02tunelador:{n:'Gusano excavador',era:2,fac:'Alienígenas',fam:'Rápidos',tipo:'tierra',rg:'Cuerpo a cuerpo',col:'#8a6a4a',st:{am:0,ap:20,dmg:1,gold:6,hp:60,sp:1.5,ud:5}},
  i16amalgama:{n:'Amalgama',era:2,fac:'Alienígenas',fam:'Tanques',tipo:'tierra',rg:'Cuerpo a cuerpo',col:'#2a6a5a',st:{am:10,ap:10,dmg:1,gold:3,hp:70,sp:.6,ud:3}},
  i21garrapata:{n:'Garrapata del vacío',era:2,fac:'Alienígenas',fam:'Místicos',tipo:'aire',rg:'No ataca',col:'#3a5a3a',st:{am:0,ap:0,dmg:1,gold:4,hp:25,sp:1.4,ud:0}},
  i39choque:{n:'Dron arpón',era:2,fac:'Máquinas',fam:'Guerreros',tipo:'aire',rg:'No ataca',col:'#7a8a9a',st:{am:0,ap:15,dmg:1,gold:6,hp:60,sp:1.2,ud:0}},
  i08inhibidor:{n:'Inhibidor',era:2,fac:'Máquinas',fam:'Místicos',tipo:'tierra',rg:'No ataca',col:'#1e4a5a',st:{am:10,ap:10,dmg:1,gold:8,hp:110,sp:.7,ud:0}},
  i20nexo:{n:'Nexo de colmena',era:2,fac:'Alienígenas',fam:'Apoyo',tipo:'tierra',rg:'No ataca',col:'#7a3a8a',st:{am:20,ap:10,dmg:1,gold:10,hp:180,sp:.65,ud:0}},
  i30fragata:{n:'Fragata de escudo',era:2,fac:'Máquinas',fam:'Tanques',tipo:'aire',rg:'No ataca',col:'#3a6aa8',st:{am:10,ap:10,dmg:2,gold:16,hp:300,sp:.6,ud:0}},
  i31saltador:{n:'Saltador cuántico',era:2,fac:'Máquinas',fam:'Rápidos',tipo:'tierra',rg:'Cuerpo a cuerpo',col:'#6a3ad8',st:{am:10,ap:10,dmg:1,gold:8,hp:110,sp:.9,ud:6}}}});
 out.carga=!!rep&&/* con los datos del Taller ya cargados, rep cuenta otra cosa */ET.i02tunelador.burrow===1&&ET.i16amalgama.amal===1&&ET.i21garrapata.vtick===1&&ET.i39choque.harp2===1&&ET.i08inhibidor.inhib===1&&ET.i20nexo.nexus===1&&ET.i30fragata.fshield===1&&ET.i31saltador.qjump===1;
 out.compendio=kwHtml0('einhib','50 %')!==''&&kwHtml0('efshield','').includes('40 %')&&kwHtml0('evtick','').includes('50 %');
 startGame(15);chooseHero('reinhart');if(DLG.on)dlgEnd();S.chests={};S.evts={};RL.open=false;HQ.q=[];
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
 RL.open=false;S.phase='build';const P0=S.portals[0];S.gold=99999;S.field=S.field||field();
 const run=(t,fn)=>{for(let i=0;i<Math.round(t/.05);i++){update(.05);if(fn&&fn())return true;}return false;};
 // el camino celda a celda, del portal al núcleo
 const TR=(()=>{let q=pathNear(P0.x,P0.y)||P0;const tr=[q];for(let i=0;i<600;i++){let b=null;for(const[a,b2]of[[1,0],[-1,0],[0,1],[0,-1]]){const x=q.x+a,y=q.y+b2;if(inb(x,y)&&S.cells[y][x]===2&&S.field[y][x]<S.field[q.y][q.x]&&(!b||S.field[y][x]<S.field[b.y][b.x]))b={x,y};}if(!b)break;q=b;tr.push(q);}return tr;})();
 const M=Math.floor(TR.length/2),mid=TR[M];
 // dos solares pegados al camino cerca de la mitad: Arqueros en uno y Baluarte en el otro
 const sols=[];for(let ky=0;ky<NC;ky++)for(let kx=0;kx<NC;kx++)if(S.cc[ky][kx]===1){const x=kx*K+KC,y=ky*K+KC;if(S.occ[x+','+y])continue;let adj=false;for(const[dx,dy]of[[K,0],[-K,0],[0,K],[0,-K]]){const px=x+dx,py=y+dy;if(inb(px,py)&&S.cells[py][px]===2&&S.field[py][px]<1e9)adj=true;}if(adj)sols.push({x,y,d:Math.hypot(x-mid.x,y-mid.y)});}
 sols.sort((a,b)=>a.d-b.d);const tw=(k,s)=>{S.deck=[k];S.tsel=k;build(s.x,s.y);return S.list[S.list.length-1];};
 const A=tw('arrow',sols[0]),B=tw('bastion',sols[1]);
 for(const q of S.portals){q.sq=[];q.sqm=[];q.plan={norm:0,fast:0,tank:0,mini:0,elite:0,boss:0};}startWave();S.hp=999;S.hero.s.hp=0;S.hero.s.rt=999;
 const limpio=()=>{S.enemies=[];S.espw=[];S.tmb=[];S.tmz=[];for(const q of S.portals){q.q=[];q.qf=[];}spawnEnemy('bat',P0,null);const k=S.enemies[S.enemies.length-1];k.hp=k.max=1e9;k.fx.root={t:1e9,m:1e9};k.x=-90;k.y=-90;for(const t of S.list){t.jam=0;t.hexr=0;t.heximm=0;t.taunt=null;t.tgt=null;}};
 const pon=(t,q,fijo)=>{spawnEnemy(t,P0,null);const e=S.enemies[S.enemies.length-1];e.hp=e.max=1e6;e.x=e.tx=q.x;e.y=e.ty=q.y;e.pv=null;e.trail=[];e.fln=null;if(fijo)e.fx.root={t:1e9,m:1e9};return e;};
 const cerca=t=>{let b=0,bd=1e9;TR.forEach((q,i)=>{const d=Math.hypot(q.x-t.x,q.y-t.y);if(d<bd){bd=d;b=i;}});return b;},iA=cerca(A),iB=cerca(B);
 limpio();A.jam=999;for(const s of B.sd){s.hp=0;s.rt=999;}run(.5);
 const P=t=>S.field[Math.round(t.y)][Math.round(t.x)];
 // ---------- Gusano excavador: se entierra al ver una unidad y pasa por debajo; enterrado ni se le apunta ni se le daña ----------
 for(const s of B.sd){s.hp=s.max=9999;s.rt=0;s.lock=false;}run(1.2);{const fl=B.flag||B,q=pathNear(fl.x,fl.y),iq=cerca(q),gu=pon('i02tunelador',harpBack(q,8));gu.hp=gu.max=1e6;gu.burc=99;
  const f0=P(gu);const en=run(6,()=>gu.under>0);const h0=gu.hp;hurt(gu,1e3,null,'phys');out.gusano=en&&gu.hp===h0&&camoHid(gu,A)&&gu.nblk===1;run(4);out.gusanoPasa=P(gu)<P(q)-1&&!B.sd.some(s=>s.en===gu&&s.fight);}
 limpio();for(const s of B.sd){s.hp=0;s.rt=999;}{const gu=pon('i02tunelador',TR[3]);gu.hp=gu.max=1e6;gu.burc=.2;const e2=run(1,()=>gu.under>0);run(BURT+.3);out.gusanoCada5=e2&&!(gu.under>0);}
 // ---------- Amalgamas: se buscan, se fusionan, 3 como máximo ----------
 limpio();{const a1=pon('i16amalgama',TR[M]),a2=pon('i16amalgama',TR[M+1]),a3=pon('i16amalgama',TR[M+2]);for(const a of[a1,a2,a3]){a.hp=a.max=1000;a.fx.root={t:1e9,m:1e9};}
  const f=run(4,()=>S.enemies.filter(e=>e.t==='i16amalgama').length<3);const am=S.enemies.filter(e=>e.t==='i16amalgama');const big=am.find(e=>e.amN===2);out.amalgama=f&&!!big&&big.max===2000&&big.hp>=2000*0.99*1&&big.szm===1.2;
  {const a3b=S.enemies.find(e=>e.t==='i16amalgama'&&e!==big);if(a3b&&big){a3b.x=big.x+.5;a3b.y=big.y;}}
  const f3=run(4,()=>S.enemies.filter(e=>e.t==='i16amalgama').length<2);const g=S.enemies.find(e=>e.t==='i16amalgama');out.amalgama3=f3&&g.amN===3&&g.max===3000&&g.szm===1.4;
  const a4=pon('i16amalgama',{x:Math.round(g.x),y:Math.round(g.y)},1);a4.hp=a4.max=1000;run(2);out.amalgamaMax=S.enemies.filter(e=>e.t==='i16amalgama').length===2;}
 // ---------- Garrapatas: a la torre más cercana libre, −50 % de daño, esa torre no les da ----------
 limpio();A.jam=0;{const d0=stats(A).dmg;const g1=pon('i21garrapata',{x:Math.round(A.x),y:Math.round(A.y)+2});g1.hp=g1.max=1e6;const pg=run(5,()=>!!g1.tkT);out.garrapata=pg&&g1.tkT===A&&Math.abs(stats(A).dmg-d0*TICKM)<1e-6&&camoHid(g1,A)&&!camoHid(g1,B);
  const g2=pon('i21garrapata',{x:Math.round(A.x),y:Math.round(A.y)+2});g2.hp=g2.max=1e6;run(5,()=>!!g2.tkT);out.garrapataOtra=g2.tkT===B||(g2.tkT===A&&!S.list.some(t=>t!==A&&t!==B&&Math.hypot(t.x-g2.x,t.y-g2.y)<=TICKR));
  g2.tkT=A;run(.1);out.garrapataNoAcumula=Math.abs(stats(A).dmg-d0*TICKM)<1e-6;hurt(g1,1e9,null,'phys');run(.2);out.garrapataSigue=Math.abs(stats(A).dmg-d0*TICKM)<1e-6;hurt(g2,1e9,null,'phys');run(.2);out.garrapataQuita=Math.abs(stats(A).dmg-d0)<1e-6;}
 // sin torres a 10 celdas sigue el camino
 limpio();{const g3=pon('i21garrapata',TR[2]);g3.hp=g3.max=1e6;const far=!S.list.some(t=>Math.hypot(t.x-g3.x,t.y-g3.y)<=TICKR);const x0=g3.x,y0=g3.y;run(1);out.garrapataCamino=!far||Math.hypot(g3.x-x0,g3.y-y0)>.5;}
 // la Amalgama fundida va más lenta (Nogal, 25-nov)
 limpio();{const a1=pon('i16amalgama',TR[2]),a3=pon('i16amalgama',TR[2]);a1.hp=a1.max=a3.hp=a3.max=1e7;a3.amN=3;a1.amc=a3.amc=99;const f1=P(a1),f3=P(a3);run(2);out.amalgamaLenta=(f1-P(a1))>(f3-P(a3))*1.2;out.amalgamaLentaV=(f1-P(a1)).toFixed(1)+'/'+(f3-P(a3)).toFixed(1);}
 // ---------- Dron arpón: engancha y arrastra 10 celdas atrás; la unidad vuelve ----------
 limpio();A.jam=999;for(const s of B.sd){s.hp=s.max=9999;s.rt=0;s.lock=false;}run(1.2);{const fl=B.flag||B,dr=pon('i39choque',pathNear(fl.x,fl.y),1);dr.hp=dr.max=1e6;dr.hpc=0;const m=run(1,()=>!!dr.hpS);const s=dr.hpS,x0=s.x,y0=s.y,f0=S.field[Math.round(y0)][Math.round(x0)];
  run(HARPW+HARPT+.1);const f1=S.field[Math.round(s.y)][Math.round(s.x)];out.arpon=m&&f1<=f0-HARPD+3&&!(s.hook>0)/* v366: hacia delante (Nogal) */;out.arponV=f0+'/'+f1;run(6);out.arponVuelve=Math.hypot(s.x-x0,s.y-y0)<3;}
 // ---------- Inhibidor: las 3 torres más cercanas a 10 celdas, a la mitad ----------
 limpio();A.jam=0;{const r0=stats(A).rate;const ih=pon('i08inhibidor',{x:Math.round(A.x),y:Math.round(A.y)+3},1);ih.hp=ih.max=1e6;run(.3);out.inhibidor=Math.abs(stats(A).rate-r0*INHM)<1e-6&&(ih.inhL||[]).length<=INHN;hurt(ih,1e9,null,'phys');run(.4);out.inhibidorMuere=Math.abs(stats(A).rate-r0)<1e-6;}
 // ---------- Nexo: se lleva la mitad del daño; al morir aturde 1 s ----------
 limpio();A.jam=999;{const nx=pon('i20nexo',TR[M],1),o=pon('norm',TR[M+1],1);nx.hp=nx.max=o.hp=o.max=1e6;run(.3);const ho=o.hp,hn=nx.hp;hurt(o,1000,null,'magic');const dO=ho-o.hp,dN=hn-nx.hp;out.nexo=o.nxL===nx&&dO>0&&Math.abs(dO-dN)<dO*.4;out.nexoV=dO.toFixed(0)+'/'+dN.toFixed(0);
  hurt(nx,1e9,null,'phys');run(.1);out.nexoAturde=!!o.fx.stun&&!o.nxL;}
 // ---------- Fragata: escudo del 40 %, se recarga a los 3 s sin daño ----------
 limpio();A.jam=999;{const fr=pon('i30fragata',TR[M],1);run(.1);out.fragata=Math.abs(fr.shM-fr.max*FSHM)<1e-6&&fr.sh===fr.shM;const h0=fr.hp;hurt(fr,fr.shM*.5,null,'magic');out.fragataAbsorbe=fr.hp===h0&&fr.sh<fr.shM;run(FSHT-.5);out.fragataEspera=fr.sh<fr.shM;run(1);out.fragataRecarga=fr.sh===fr.shM;}
 // ---------- Saltador: golpe de más del 15 % → 10 celdas adelante ----------
 limpio();A.jam=999;{const sa=pon('i31saltador',TR[2]);sa.hp=sa.max=1e4;run(.2);const f0=P(sa);hurt(sa,100,null,'magic');run(.1);out.saltadorPequeño=P(sa)>=f0-2;const f1=P(sa);hurt(sa,9000,null,'magic');run(.1);const f2=P(sa);out.saltador=f1-f2>=QJD-3&&f1-f2<=QJD+2;out.saltadorV=(f1-f2)+'';sa.hp=sa.max;hurt(sa,9000,null,'magic');run(.1);out.saltadorEspera=P(sa)>=f2-3;run(QJCD);sa.hp=sa.max;const f3=P(sa);hurt(sa,9000,null,'magic');run(.1);out.saltadorOtraVezV=f3+'/'+P(sa)+'/'+sa.hp+'/'+(sa.qjc-S.wt).toFixed(2)+'/'+S.enemies.includes(sa);out.saltadorOtraVez=f3-P(sa)>=QJD-3;}
 return out;});
const bad=Object.keys(r).filter(k=>r[k]!==true&&!/V$/.test(k));console.log(JSON.stringify(r));console.log(bad.length?'FALLA: '+bad.join(', '):'mecanicas_taller_t5 ok');console.log(errs.length?'ERRS '+JSON.stringify(errs.slice(0,5)):'ERRS []');await b.close();process.exit(bad.length||errs.length?1:0);})();
