// v366 · Enemigos nuevos del Taller, tanda 7 (eventos de la Fantástica): Sicario, Espíritu maldito, Mímico enfurecido, Mantícora, Basilisco e Hidra, y los costes de sus eventos.
// Las fichas son las del Taller (22-nov); aquí se cargan con tallerAplicar como lo hará el archivo exportado.
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
/* mapa y azar fijos (semilla), para que la prueba mida siempre lo mismo; con SEMILLA=n se prueba con otro mapa */
await p.addInitScript(s0=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}let a=s0>>>0;Math.random=()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};},+(process.env.SEMILLA||7));
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(async()=>{const out={};{const i=document.getElementById('intro');if(i)i.style.display='none';}INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;
  const rep=tallerAplicar({en:{
  v01sicario:{n:'Sicario',era:1,fac:'',fam:'Eventos',tipo:'tierra',rg:'Cuerpo a cuerpo',col:'#3a3a4a',st:{am:10,ap:10,dmg:3,gold:10,hp:110,sp:1.2,ud:8}},
  v02espiritu:{n:'Espíritu maldito',era:1,fac:'',fam:'Eventos',tipo:'tierra',rg:'No ataca',col:'#6a8aa8',st:{am:0,ap:0,dmg:4,gold:25,hp:500,sp:.7,ud:0}},
  v03mimico:{n:'Mímico enfurecido',era:1,fac:'',fam:'Eventos',tipo:'tierra',rg:'No ataca',col:'#8a5a2a',st:{am:20,ap:20,dmg:3,gold:0,hp:600,sp:1.3,ud:0}},
  v04manticora:{n:'Mantícora',era:1,fac:'',fam:'Eventos',tipo:'tierra',rg:'A distancia',col:'#a0603a',st:{am:25,ap:25,dmg:8,gold:50,hp:1300,sp:.7,ud:15}},
  v05basilisco:{n:'Basilisco',era:1,fac:'',fam:'Eventos',tipo:'tierra',rg:'No ataca',col:'#5a7a4a',st:{am:15,ap:35,dmg:8,gold:50,hp:1300,sp:.6,ud:15}},
  v06hidra:{n:'Hidra',era:1,fac:'',fam:'Eventos',tipo:'tierra',rg:'Cuerpo a cuerpo',col:'#3a6a5a',st:{am:25,ap:25,dmg:8,gold:50,hp:1300,sp:.6,ud:15}}}});
 out.carga=rep.en===6&&rep.enOff.length===0&&ET.v01sicario.smoke===1&&ET.v01sicario.dmg===2&&ET.v02espiritu.ghost===1&&ET.v03mimico.steal===200&&ET.v03mimico.dmg===1&&ET.v04manticora.el===1&&ET.v05basilisco.gaze===1&&ET.v06hidra.heads===1;
 out.compendio=kwHtml0('esmoke','').includes('2 s')&&kwHtml0('egaze','').includes('3 s');
 {const ro=EVENTS.merchant.opts.find(o=>o.l==='Robarle'),io=EVENTS.shrine.opts.find(o=>o.l==='Llevarte el ídolo'),fo=EVENTS.chest.opts.find(o=>o.l==='Abrirlo a la fuerza');
  out.eventosTexto=!!(ro&&io&&fo)&&/unos enemigos/.test(ro.c)&&/un enemigo/.test(io.c)&&!/Sicario|Espíritu/.test(ro.c+io.c)&&EVENTS.chest.opts.length===4;out.eventosV=ro&&ro.c;window.__ev=[ro,io,fo];}
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
 // ---------- eventos: los costes son ahora estos enemigos ----------
 {const[ro,io,fo]=window.__ev,pl=()=>P0.plan;const h0=S.hp;ro.run();io.run();fo.run();out.eventos=pl().v01sicario===4&&pl().v02espiritu===1&&pl().v03mimico===1&&S.hp===h0&&!pl().elite;out.eventosChip=chip('evn:v01sicario:4').includes('???');
  for(const k of['v01sicario','v02espiritu','v03mimico','elite'])delete P0.plan[k];}
 // ---------- Sicario: humo 2 s al primer daño; los de dentro no se pueden apuntar ----------
 limpio();A.jam=999;{const si=pon('v01sicario',TR[M],1),o=pon('norm',TR[M+1],1);si.hp=si.max=o.hp=o.max=1e6;hurt(si,10,null,'magic');out.sicario=(S.smk||[]).length===1&&camoHid(o,A)&&camoHid(si,A);
  hurt(si,10,null,'magic');out.sicarioUnaVez=S.smk.length===1;run(SMKT+.2);out.sicarioDura=!camoHid(o,A);}
 // ---------- Espíritu: lo físico lo atraviesa; atraviesa a las unidades y les hace daño ----------
 limpio();A.jam=999;{const gh=pon('v02espiritu',TR[M],1);gh.hp=gh.max=1e5;hurt(gh,500,null,'phys');const h1=gh.hp;hurt(gh,500,null,'magic');out.espiritu=h1===1e5&&gh.hp<1e5;
  const s=B.sd[0];s.hp=s.max=9999;s.rt=0;run(.2,()=>{s.x=gh.x;s.y=gh.y;});out.espirituUnidades=s.hp<9999&&gh.nblk===1&&!(s.en===gh&&s.fight);run(.5,()=>{s.x=gh.x;s.y=gh.y;});const h2=s.hp;run(.5,()=>{s.x=gh.x;s.y=gh.y;});out.espirituCada2s=s.hp===h2;s.hp=0;s.rt=999;}
 // ---------- Mímico: 10 🪙 por cada 10 %, bolsa de 100 al morir ----------
 limpio();A.jam=999;{const mi=pon('v03mimico',TR[M],1);mi.hp=mi.max=1000;const g0=S.gold;hurt(mi,2000*.35,null,'true');const lost=1000-mi.hp,exp=Math.floor(lost/100+1e-9)*MIMG;out.mimico=S.gold-g0===exp&&exp>0;out.mimicoV=(S.gold-g0)+'/'+exp+'/'+lost.toFixed(0);
  const g1=S.gold;mata(mi);out.mimicoBolsa=S.gold-g1>=MIMB;}
 // ---------- Encargo: una de las tres bestias, con su recompensa ----------
 limpio();{spawnEnemy('wanted',P0,null);const e=S.enemies[S.enemies.length-1];out.encargo=['v04manticora','v05basilisco','v06hidra'].includes(e.t)&&e.wanted===1;}
 // ---------- Mantícora: púas con veneno; mordisco si se le pegan ----------
 limpio();A.jam=999;{const ma=pon('v04manticora',TR[M],1);ma.hp=ma.max=1e6;const s=B.sd[0];s.hp=s.max=9999;s.rt=0;s.ps=[];hitUnit(s,1,ma);out.manticoraPua=(s.ps||[]).length===1;
  s.ps=[];const h0=s.hp;run(.6,()=>{s.x=ma.x+.5;s.y=ma.y;s.en=ma;s.fight=true;});out.manticoraMuerde=!!ma.btF&&h0-s.hp>=ET.v04manticora.ud*BITEM*.3&&!(s.ps||[]).length;out.manticoraV=(h0-s.hp).toFixed(1);s.hp=0;s.rt=999;s.en=null;s.fight=false;}
 // ---------- Basilisco: petrifica 3 s a la torre que más daño le hace ----------
 limpio();A.jam=0;{const bs=pon('v05basilisco',{x:Math.round(A.x),y:Math.round(A.y)+3},1);bs.hp=bs.max=1e7;hurt(bs,50,A,'magic');const r=run(3+GAZEW+.3,()=>A.stnU>S.wt);out.basilisco=r&&A.jam>0&&!(B.stnU>S.wt);run(GAZET+.3);out.basiliscoDura=!(A.stnU>S.wt);}
 // ---------- Hidra: cabezas al perder 1/3 y 2/3 ----------
 limpio();A.jam=999;{const hy=pon('v06hidra',TR[M],1);hy.hp=hy.max=900;run(.1);const a=(hy.hyN||1)===1;hy.hp=500;run(.1);const b2=hy.hyN===2&&hy.hyM===1.5;hy.hp=200;run(.1);out.hidra=a&&b2&&hy.hyN===3&&hy.hyM===2;hy.hp=800;run(.1);out.hidraNoPierde=hy.hyN===3;}
 return out;});
const bad=Object.keys(r).filter(k=>r[k]!==true&&!/V$/.test(k));console.log(JSON.stringify(r));console.log(bad.length?'FALLA: '+bad.join(', '):'mecanicas_taller_t7 ok');console.log(errs.length?'ERRS '+JSON.stringify(errs.slice(0,5)):'ERRS []');await b.close();process.exit(bad.length||errs.length?1:0);})();