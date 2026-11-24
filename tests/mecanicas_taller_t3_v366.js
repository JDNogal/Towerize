// v366 · Enemigos nuevos del Taller, tanda 3 (Fantástica, partida 3): Guiverno, Ogro glotón, Sacrificador, Gólem de magma, Transportador aéreo, Guardián de la inmortalidad y Portaestandarte alado.
// Las fichas son las del Taller (24-nov); aquí se cargan con tallerAplicar como lo hará el archivo exportado.
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
/* mapa y azar fijos (semilla), para que la prueba mida siempre lo mismo; con SEMILLA=n se prueba con otro mapa */
await p.addInitScript(s0=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}let a=s0>>>0;Math.random=()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};},+(process.env.SEMILLA||7));
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(async()=>{const out={};{const i=document.getElementById('intro');if(i)i.style.display='none';}INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;
 const rep=tallerAplicar({en:{
  i10pesado:{n:'Guiverno',era:1,fac:'Monstruos',fam:'Tanques',tipo:'aire',rg:'No ataca',col:'#4a6a4a',st:{am:0,ap:40,dmg:2,gold:14,hp:400,sp:.6,ud:0}},
  i33gloton:{n:'Ogro glotón',era:1,fac:'Pieles verdes',fam:'Tanques',tipo:'tierra',rg:'Cuerpo a cuerpo',col:'#6a8a3a',st:{am:0,ap:15,dmg:2,gold:12,hp:220,sp:.6,ud:12}},
  i34sacrificador:{n:'Sacrificador',era:1,fac:'Demonios',fam:'Místicos',tipo:'tierra',rg:'A distancia',col:'#8a1a2a',st:{am:20,ap:0,dmg:1,gold:8,hp:70,sp:.75,ud:4}},
  i44golem:{n:'Gólem de magma',era:1,fac:'Demonios',fam:'Tanques',tipo:'tierra',rg:'Cuerpo a cuerpo',col:'#a0401a',st:{am:10,ap:25,dmg:3,gold:14,hp:240,sp:.55,ud:12}},
  i14transporte:{n:'Transportador aéreo',era:1,fac:'Pieles verdes',fam:'Apoyo',tipo:'aire',rg:'No ataca',col:'#7a6a5a',lleva:{sling:6},st:{am:0,ap:20,dmg:1,gold:10,hp:250,sp:.8,ud:0}},
  i05guardian:{n:'Guardián de la inmortalidad',era:1,fac:'Demonios',fam:'Apoyo',tipo:'tierra',rg:'No ataca',col:'#e0c050',st:{am:20,ap:20,dmg:1,gold:12,hp:200,sp:.7,ud:0}},
  i11alado:{n:'Portaestandarte alado',era:1,fac:'Pieles verdes',fam:'Apoyo',tipo:'aire',rg:'No ataca',col:'#8a3a6a',st:{am:20,ap:0,dmg:1,gold:7,hp:80,sp:.8,ud:0}}}});
 out.carga=rep.en===7&&rep.enOff.length===0&&ET.i10pesado.fly===1&&ET.i33gloton.devour===1&&ET.i34sacrificador.sacr===1&&ET.i44golem.magma===1&&ET.i14transporte.ferry===6&&ET.i05guardian.immo===1&&ET.i11alado.rage===1;
 out.compendio=kwHtml0('eimmo','').includes('1 de vida')&&kwHtml0('erage','').includes('15 %')&&kwHtml0('eferry','').includes('mitad de vida')&&kwHtml0('burn','').includes('Gólem');
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
 // ---------- Guardián: los de alrededor no bajan de 1; al morir él, caen ----------
 {const g=pon('i05guardian',TR[M],1),o1=pon('norm',TR[M+1],1),o2=pon('norm',TR[Math.min(TR.length-1,M+40)],1);run(.2);
  hurt(o1,1e9,null,'phys');hurt(o2,1e9,null,'phys');run(.2);out.guardian=S.enemies.includes(o1)&&o1.hp>0&&o1.hp<=1.01&&!S.enemies.includes(o2);
  hurt(g,1e9,null,'phys');run(.3);out.guardianCae=!S.enemies.includes(g)&&!S.enemies.includes(o1);
  const g2=pon('i05guardian',TR[M],1),g3=pon('i05guardian',TR[M+1],1);run(.2);hurt(g3,1e9,null,'phys');run(.2);out.guardianNoSeProtege=!S.enemies.includes(g3);}
 // ---------- Ogro glotón ----------
 limpio();{const og=pon('i33gloton',TR[M],1),gb=pon('sling',TR[M+2],1),gb2=pon('fast',TR[M+3],1),gb3=pon('fast',TR[M+4],1);run(.5);out.glotonNoCome=S.enemies.includes(gb)&&!(og.eat>0);
  const g0=S.gold;og.hp=og.max*.4;const ok=run(1,()=>og.eat>0);const x0=og.x,y0=og.y;run(1.1);out.glotonSinOro=S.gold===g0;out.gloton=ok&&og.hp>og.max*.69&&og.hp<og.max*.71&&S.enemies.filter(e=>GOBS.includes(e.t)).length===2;
  og.hp=og.max*.4;run(3);og.hp=og.max*.4;run(3);out.glotonMax=og.eatN===2&&S.enemies.filter(e=>GOBS.includes(e.t)).length===1;}
 // ---------- Sacrificador ----------
 limpio();{const sc=pon('i34sacrificador',TR[M],1),m1=pon('minion',TR[M+1],1),m2=pon('minion',TR[M+2],1);sc.sacC=0;const mk=run(1,()=>!!sc.sacM);run(1.1);
  out.sacrificio=mk&&!S.enemies.includes(m1)&&!S.enemies.includes(m2)&&S.enemies.some(e=>e.t==='demon');
  const m3=pon('minion',TR[M+1],1),m4=pon('minion',TR[M+2],1);sc.sacC=0;run(.3);hurt(m3,1e6,null,'phys');const nd=S.enemies.filter(e=>e.t==='demon').length;run(1.2);out.sacrificioFalla=S.enemies.filter(e=>e.t==='demon').length===nd&&S.enemies.includes(m4);}
 // ---------- Gólem de magma: quema a quien le pega ----------
 limpio();for(const s of B.sd){s.hp=s.max=9999;s.rt=0;s.lock=false;}run(1);{const fl=B.flag||B,q=pathNear(fl.x,fl.y),gm=pon('i44golem',q,1);gm.hp=gm.max=1e7;const quema=run(6,()=>B.sd.some(s=>s.ubn>0));
  run(3);const s=B.sd.find(s=>s.ubn>0);out.golem=quema&&!!s&&s.ubn>=1&&s.ubn<5;const h0=s?s.hp:0,b0=s?s.ubn:0;update(.05);out.golemDaño=!!s&&h0-s.hp>=BURND*b0*.05*.9;
  hurt(gm,1e8,null,'phys');run(.3);for(const u of B.sd){u.en=null;u.fight=false;}const bb=s.ubn;run(1.05);out.golemSeApaga=s.ubn<bb;}
 // ---------- Transportador ----------
 limpio();for(const s of B.sd){s.hp=s.max=9999;s.rt=0;}{spawnEnemy('i14transporte',P0,null);const tr=S.enemies[S.enemies.length-1];tr.hp=tr.max=1e6;
  out.transporte=tr.fcar===6&&tr.fdX!=null&&S.cells[tr.fdY][tr.fdX]===2;const n0=S.enemies.filter(e=>e.t==='sling').length;const suelta=run(80,()=>!(tr.fcar>0));run(.1);const sl=S.enemies.filter(e=>e.t==='sling');
  out.transporteSuelta=suelta&&sl.length===n0+6&&sl.every(e=>Math.abs(e.hp-e.max)<.01)&&Math.hypot(tr.x-tr.fdX,tr.y-tr.fdY)<4&&new Set(sl.map(e=>Math.round(e.tx)+','+Math.round(e.ty))).size>=4;}
 limpio();{spawnEnemy('i14transporte',P0,null);const tr=S.enemies[S.enemies.length-1];run(1);for(const s of B.sd){s.hp=0;s.rt=999;}A.jam=999;hurt(tr,1e9,null,'phys');run(.3);const sl=S.enemies.filter(e=>e.t==='sling');out.transporteDerribado=sl.length===6&&sl.every(e=>Math.abs(e.hp-e.max*.5)<.01);}
 // dispara a tus unidades desde el aire
 limpio();for(const s of B.sd){s.hp=s.max=9999;s.rt=0;}{const fl=B.flag||B,tr=pon('i14transporte',pathNear(fl.x,fl.y),1);tr.hp=tr.max=1e6;tr.fdF=-1;const h0=B.sd.reduce((a,s)=>a+s.hp,0);run(3);out.transporteDispara=B.sd.reduce((a,s)=>a+s.hp,0)<h0;}
 // ---------- Portaestandarte alado: furia al caer uno de los de debajo ----------
 limpio();for(const s of B.sd){s.hp=0;s.rt=999;}{const al=pon('i11alado',TR[M],1),o1=pon('norm',TR[M+1],1),o2=pon('norm',TR[M+2],1),lejos=pon('norm',TR[Math.min(TR.length-1,M+40)],1);run(.2);hurt(o1,1e9,null,'phys');run(.1);
  out.furia=o2.furU>S.wt+2.5&&!(lejos.furU>S.wt);o2.hp=o2.max=1e9;A.jam=999;o2.fx.root=null;delete o2.fx.root;const vel=()=>{let d=0,x=o2.x,y=o2.y;for(let i=0;i<10;i++){update(.05);d+=Math.hypot(o2.x-x,o2.y-y);x=o2.x;y=o2.y;}return d/.5;};
  const v1=vel();run(3);const v2=vel();out.furiaVel=v1>v2*1.1&&v1<v2*1.2;out.furiaV=v1.toFixed(2)+'/'+v2.toFixed(2);
  {const s=B.sd[0];s.hp=s.max=100;s.rt=0;o2.furU=S.wt+5;hitUnit(s,10,o2);out.furiaDaño=Math.abs((100-s.hp)-10*RAGEM)<.01;}}
 out.guiverno=!!ET.i10pesado&&ET.i10pesado.ap===40;
 return out;});
const bad=Object.keys(r).filter(k=>r[k]!==true&&!/V$/.test(k));console.log(JSON.stringify(r));console.log(bad.length?'FALLA: '+bad.join(', '):'mecanicas_taller_t3 ok');console.log(errs.length?'ERRS '+JSON.stringify(errs.slice(0,5)):'ERRS []');await b.close();process.exit(bad.length||errs.length?1:0);})();
