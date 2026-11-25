// v366 · Enemigos nuevos del Taller, tanda 6 (Distópica, partida 3): Proyector holográfico, Arrojador de colmena, Lanzadera de desembarco, Dron reciclador, Portador de feromonas y Dron saboteador.
// Las fichas son las del Taller (25-nov); aquí se cargan con tallerAplicar como lo hará el archivo exportado.
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
/* mapa y azar fijos (semilla), para que la prueba mida siempre lo mismo; con SEMILLA=n se prueba con otro mapa */
await p.addInitScript(s0=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}let a=s0>>>0;Math.random=()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};},+(process.env.SEMILLA||7));
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(async()=>{const out={};{const i=document.getElementById('intro');if(i)i.style.display='none';}INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;
  const rep=tallerAplicar({en:{
  i24holo:{n:'Proyector holográfico',era:2,fac:'Máquinas',fam:'Místicos',tipo:'tierra',rg:'No ataca',col:'#3ab8d8',st:{am:30,ap:0,dmg:1,gold:8,hp:70,sp:.85,ud:0}},
  i32arrojador:{n:'Arrojador de colmena',era:2,fac:'Alienígenas',fam:'Tanques',tipo:'tierra',rg:'Cuerpo a cuerpo',col:'#5a7a2a',st:{am:10,ap:20,dmg:2,gold:12,hp:300,sp:.45,ud:10}},
  i18lanzadera:{n:'Lanzadera de desembarco',era:2,fac:'Máquinas',fam:'Apoyo',tipo:'aire',rg:'No ataca',col:'#5a6a7a',st:{am:20,ap:30,dmg:2,gold:18,hp:450,sp:.6,ud:0}},
  i22reciclador:{n:'Dron reciclador',era:2,fac:'Máquinas',fam:'Apoyo',tipo:'aire',rg:'Cuerpo a cuerpo',col:'#8a7a3a',st:{am:0,ap:20,dmg:1,gold:7,hp:90,sp:.8,ud:5}},
  i36feromonas:{n:'Portador de feromonas',era:2,fac:'Alienígenas',fam:'Apoyo',tipo:'tierra',rg:'No ataca',col:'#b8a02a',st:{am:10,ap:0,dmg:1,gold:7,hp:80,sp:.8,ud:2}},
  i46saboteador:{n:'Dron saboteador',era:2,fac:'Máquinas',fam:'A distancia',tipo:'aire',rg:'A distancia',col:'#6a4a6a',st:{am:10,ap:0,dmg:1,gold:7,hp:60,sp:1.1,ud:0}}}});
 out.carga=!!rep&&/* con los datos del Taller ya cargados, rep cuenta otra cosa */ET.i24holo.holo2===1&&ET.i24holo.ud===1&&ET.i32arrojador.hurl===1&&ET.i18lanzadera.lander===1&&ET.i22reciclador.recyc===1&&ET.i22reciclador.ud===0&&ET.i36feromonas.phero===1&&ET.i46saboteador.sabo===1&&ET.i46saboteador.rg==='melee';
 out.compendio=kwHtml0('ephero','').includes('15 %')&&kwHtml0('eholo2','').includes('50 %')&&kwHtml0('esabo','').includes('★');
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
 const mata=e=>{hurt(e,1e15,null,'magic');run(.1);};
 // ---------- Proyector: 5 s quieto, copia al más fuerte (no jefes), 2 copias al 50 %, 1 de oro ----------
 limpio();A.jam=999;{const ho=pon('i24holo',TR[M],1),big=pon('norm',TR[M+1],1),sm=pon('norm',TR[M-1],1);ho.hp=ho.max=1e6;big.hp=big.max=5000;sm.hp=sm.max=100;
  run(HOLOW-.4);out.holoEspera=!S.enemies.some(e=>e.cpy);run(.8);const cp=S.enemies.filter(e=>e.cpy);for(const c of cp)c.fx.root={t:1e9,m:1e9};out.holo=cp.length===HOLON&&cp.every(c=>c.t==='norm'&&Math.abs(c.max-2500)<1&&c.hp>0);
  run(HOLOCD-1.4);out.holoN1V=S.enemies.filter(e=>e.cpy).map(e=>e.t+':'+Math.round(e.max)).join(',');out.holoNoCopiaCopias=S.enemies.filter(e=>e.cpy).length===HOLON;run(1.5);out.holoCada10=S.enemies.filter(e=>e.cpy).length===2*HOLON;
  for(const c of S.enemies.filter(e=>e.cpy))c.fx.root={t:1e9,m:1e9};const c0=S.enemies.find(e=>e.cpy),g0=S.gold;mata(c0);out.holoOro1=S.gold-g0===1;out.holoOroV=String(S.gold-g0);}
 limpio();A.jam=999;{const ho=pon('i24holo',TR[M],1);ho.hp=ho.max=1e6;const bo=pon('boss',TR[M+1],1);bo.hp=bo.max=1e7;run(HOLOW+1);out.holoJV=S.enemies.filter(e=>e.cpy).map(e=>e.t).join(',');out.holoNoJefes=!S.enemies.some(e=>e.cpy);}
 // ---------- Arrojador: lanza 15 celdas adelante a un pequeño; al caer tumba a tus unidades; no lanza élites ----------
 limpio();A.jam=999;{const ar=pon('i32arrojador',TR[M],1),o=pon('norm',TR[M-2],1);ar.hp=ar.max=1e6;o.hp=o.max=1e6;delete o.fx.root;o.fx.root={t:1e9,m:1e9};const f0=P(o);
  const w=run(2,()=>!!ar.thO);const L=ar.thL;const s=B.sd[0];s.hp=s.max=9999;s.rt=0;s.udwn=0;s.uimm=0;
  run(THRW+THRT+.15,()=>{s.x=L.x;s.y=L.y;});const f1=P(o);out.arrojador=w&&!o.thr&&f0-f1>=THRD-3;out.arrojadorV=f0+'→'+f1;out.arrojadorTumba=s.udwn>0||s.uimm>0;s.hp=0;s.rt=999;}
 limpio();A.jam=999;{const ar=pon('i32arrojador',TR[M],1);ar.hp=ar.max=1e6;const el=pon('elite',TR[M-1],1);run(3);out.arrojadorNoElites=!el.thr&&!ar.thO;}
 // ---------- Lanzadera: diana, cápsula clavada que saca Autómatas cada 3 s; sin nadie más, se rompe sola ----------
 limpio();A.jam=999;{const la=pon('i18lanzadera',TR[M],1);la.hp=la.max=1e6;run(4.4);const cs=S.enemies.find(e=>e.t==='tcaps');out.capsula=!!cs&&S.cells[Math.round(cs.y)][Math.round(cs.x)]===2;
  run(CAPO+.3);const n1=S.enemies.filter(e=>e.cpA).length;run(CAPCD);const n2=S.enemies.filter(e=>e.cpA).length;out.capsulaSaca=n1===1&&n2===2&&S.enemies.filter(e=>e.cpA).every(e=>e.t==='auto');out.capsulaV=n1+'/'+n2;
  const x0=cs.x;run(1);out.capsulaQuieta=cs.x===x0;S.enemies=S.enemies.filter(e=>e.t==='tcaps'||e.cpA);const g0=S.gold;run(.2);out.capsulaSeRompe=!S.enemies.some(e=>e.t==='tcaps')&&S.gold===g0;}
 // ---------- Reciclador: cada 3 bajas cerca, un Autómata de chatarra (1 de oro) ----------
 limpio();A.jam=999;{const rc=pon('i22reciclador',TR[M],1);rc.hp=rc.max=1e6;const v=[0,1,2].map(i=>{const e=pon('norm',TR[M+i-1],1);e.hp=e.max=50;return e;});mata(v[0]);mata(v[1]);out.recicladorCuenta=rc.rcN===2;mata(v[2]);
  run(RECT+.2);const sc=S.enemies.find(e=>e.scrp);out.reciclador=!!sc&&sc.t==='auto'&&rc.rcN===0;if(sc){sc.fx.root={t:1e9,m:1e9};const g0=S.gold;mata(sc);out.recicladorOro1=S.gold-g0===1;}}
 // ---------- Feromonas: nube al morir un alienígena; +15 % hasta 3 veces ----------
 limpio();A.jam=999;{const ph=pon('i36feromonas',TR[M],1);ph.hp=ph.max=1e6;const q=TR[M+1];const al=()=>{const e=pon('drone',q,1);e.hp=e.max=10;return e;};
  out.feroFac=ET.drone.fac==='a';const w=pon('drone',TR[M+3],1);w.hp=w.max=1e6;mata(al());out.feroNube=(S.phC||[]).length===1;w.x=q.x;w.y=q.y;run(.2);out.fero=w.phU>S.wt&&w.phN===1;
  for(let i=0;i<4;i++){mata(al());run(.1);}out.feroMax=w.phN===PHEN;const nb=pon('norm',q,1);run(.2);out.feroSoloAliens=!(nb.phN>0);}
 // ---------- Saboteador: prefiere ★; 5 s sin casilla; luego vuelve ----------
 limpio();A.jam=999;{const ks=Object.keys(BF).filter(k=>k!=='cur'&&!k.includes('+')),kS=Object.keys(BF).find(k=>k.includes('+'))||ks[0],kN=ks[0];
  for(const[x,y]of A.cells)S.buff[y][x]=kS;for(const[x,y]of B.cells)S.buff[y][x]=kN;const dAB=Math.hypot(A.x-B.x,A.y-B.y),kk=Math.min(.5,(SBTR-1)/dAB),mid={x:A.x+(B.x-A.x)*kk,y:A.y+(B.y-A.y)*kk}/* a tiro de A (y de B si están cerca) */;out.sabDistV=Math.hypot(A.x-B.x,A.y-B.y).toFixed(1);
  const sb=pon('i46saboteador',mid,1);sb.hp=sb.max=1e6;const r=run(3,()=>A.sabU>S.wt||B.sabU>S.wt);const c0=A.cells[0];
  out.sabotaje=r&&A.sabU>S.wt&&!S.buff[c0[1]][c0[0]]&&!(B.sabU>S.wt);out.sabotajeV=kS+'/'+kN+'/'+r+'/'+(A.sabU>S.wt)+'/'+S.buff[c0[1]][c0[0]]+'/'+(B.sabU>S.wt)+'/'+Math.hypot(sb.x-A.x,sb.y-A.y).toFixed(1)+'/'+Math.hypot(sb.x-B.x,sb.y-B.y).toFixed(1);run(SBTT+.2,()=>!(A.sabU>S.wt));out.sabotajeVuelve=S.buff[c0[1]][c0[0]]===kS;
  hurt(sb,1e15,null,'magic');run(.1);for(const t of[A,B])for(const[x,y]of t.cells)S.buff[y][x]=null;}
 return out;});
const bad=Object.keys(r).filter(k=>r[k]!==true&&!/V$/.test(k));console.log(JSON.stringify(r));console.log(bad.length?'FALLA: '+bad.join(', '):'mecanicas_taller_t6 ok');console.log(errs.length?'ERRS '+JSON.stringify(errs.slice(0,5)):'ERRS []');await b.close();process.exit(bad.length||errs.length?1:0);})();