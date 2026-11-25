// v366 · Enemigos nuevos del Taller, tanda 8 (eventos de la Distópica): Unidad de contención, Núcleo andante, Cazaseñales, Centinela Omega, Prototipos fallidos, Espécimen y Durmientes, y sus eventos.
// Las fichas son las del Taller (22-nov); aquí se cargan con tallerAplicar como lo hará el archivo exportado.
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
/* mapa y azar fijos (semilla), para que la prueba mida siempre lo mismo; con SEMILLA=n se prueba con otro mapa */
await p.addInitScript(s0=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}let a=s0>>>0;Math.random=()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};},+(process.env.SEMILLA||7));
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(async()=>{const out={};{const i=document.getElementById('intro');if(i)i.style.display='none';}INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;
  const rep=tallerAplicar({en:{
  v07contencion:{n:'Unidad de contención',era:2,fac:'Máquinas',fam:'Eventos',tipo:'tierra',rg:'A distancia',col:'#5a6a7a',st:{am:20,ap:30,dmg:8,gold:50,hp:1495,sp:.6,ud:10}},
  v08nucleoandante:{n:'Núcleo andante',era:2,fac:'Máquinas',fam:'Eventos',tipo:'tierra',rg:'No ataca',col:'#e0a02a',st:{am:20,ap:20,dmg:5,gold:30,hp:700,sp:.7,ud:0}},
  v09cazasenales:{n:'Cazaseñales',era:2,fac:'Máquinas',fam:'Eventos',tipo:'tierra',rg:'No ataca',col:'#4a3a6a',st:{am:25,ap:25,dmg:8,gold:50,hp:1495,sp:.6,ud:0}},
  v10centinela:{n:'Centinela Omega',era:2,fac:'Máquinas',fam:'Eventos',tipo:'tierra',rg:'A distancia',col:'#3fe8ff',st:{am:25,ap:25,dmg:8,gold:80,hp:1495,sp:.6,ud:12}},
  v11prototipos:{n:'Prototipo fallido',era:2,fac:'Máquinas',fam:'Eventos',tipo:'tierra',rg:'Cuerpo a cuerpo',col:'#7a8a8a',st:{am:10,ap:15,dmg:1,gold:6,hp:120,sp:.8,ud:6}},
  v12especimen:{n:'Espécimen',era:2,fac:'Alienígenas',fam:'Eventos',tipo:'tierra',rg:'Cuerpo a cuerpo',col:'#6a3a8a',st:{am:15,ap:15,dmg:6,gold:50,hp:1000,sp:.7,ud:15}},
  v13durmiente:{n:'Durmiente',era:2,fac:'',fam:'Eventos',tipo:'tierra',rg:'Cuerpo a cuerpo',col:'#7ab0d0',st:{am:10,ap:40,dmg:2,gold:8,hp:150,sp:.4,ud:8}}}});
 out.carga=rep.en===7&&rep.enOff.length===0&&ET.v07contencion.netter===1&&ET.v08nucleoandante.dmg===3&&ET.v09cazasenales.counter===1&&ET.v10centinela.omegae===1&&ET.v11prototipos.scrapm===1&&ET.v12especimen.evolve===1&&ET.v13durmiente.thaw===1;
 out.compendio=kwHtml0('ereactor','').includes('4 s')&&kwHtml0('ethaw','').includes('doble');
 {const L=['Llevarte el prototipo','Activar el reactor','Quedarte su equipo','Activar el prototipo','Extraer su núcleo','Tomar una muestra','Quedarte el refrigerante','Descargar los registros de la terminal'].map(evOpt);
  out.eventosTexto=L.every(Boolean)&&/un élite/.test(L[0].c)&&/unos enemigos/.test(L[6].c)&&!/Unidad|Durmiente|Centinela|Espécimen/.test(L.map(o=>o.c||'').join(' '))&&/10 %/.test(L[7].c);window.__ev=L;}
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
 {const L=window.__ev,pl=()=>P0.plan;S.hp=50;S.relics=[];const h0=S.hp,el0=pl().elite||0;L[0].run();L[2].run();for(let i=0;i<30&&!pl().v08nucleoandante;i++)L[1].run();L[3].run();L[4].run();L[5].run();L[6].run();
  out.eventos=pl().v07contencion===1&&pl().v09cazasenales===1&&pl().v08nucleoandante>=1&&pl().v10centinela===1&&pl().v11prototipos===5&&pl().v12especimen===1&&pl().v13durmiente===6&&(pl().elite||0)===el0&&S.hp===h0;
  out.eventosOmega=!L[3].req()||/solar|Prototipo/.test(L[3].req());S.hp=999;for(const k of['v07contencion','v08nucleoandante','v09cazasenales','v10centinela','v11prototipos','v12especimen','v13durmiente'])delete P0.plan[k];S.uq=[];}
 // ---------- Unidad de contención: red sobre el grupo, 3 s sin andar ni bloquear ----------
 limpio();A.jam=999;{for(const s of B.sd){s.hp=s.max=9999;s.rt=0;s.udwn=0;s.uimm=0;}run(1.5);const fl=B.flag||B,q=pathNear(fl.x,fl.y),un=pon('v07contencion',harpBack(q,4),1);un.hp=un.max=1e7;
  const r=run(3,()=>B.sd.some(s=>s.net>S.wt));const n=B.sd.filter(s=>s.net>S.wt).length;out.red=r&&n>=2;out.redV=String(n);const s=B.sd.find(s=>s.net>S.wt);const x0=s.x,y0=s.y;const o=pon('norm',{x:Math.round(s.x),y:Math.round(s.y)});o.hp=o.max=1e6;
  run(.5);out.redQV=Math.hypot(s.x-x0,s.y-y0).toFixed(2)+'/'+o.stopped;out.redQuieta=Math.hypot(s.x-x0,s.y-y0)<.05&&!(o.stopped&&!B.sd.some(u=>!(u.net>S.wt)&&u.en===o&&u.fight));run(NETT);out.redAcaba=!(s.net>S.wt)&&s.wt===undefined;for(const u of B.sd){u.hp=0;u.rt=999;}}
 // ---------- Núcleo andante: al morir, torres 4 s apagadas ----------
 limpio();A.jam=0;{const re=pon('v08nucleoandante',{x:Math.round(A.x),y:Math.round(A.y)+3},1);mata(re);out.nucleo=A.jam>=REAT-.2&&A.reaU>S.wt;run(REAT+.2);out.nucleoDura=!(A.reaU>S.wt);}
 // ---------- Cazaseñales: torres al azar 2 s, unidades al suelo 1 s ----------
 limpio();A.jam=0;{for(const s of B.sd){s.hp=s.max=9999;s.rt=0;s.udwn=0;s.uimm=0;}run(1.5);const dAB=Math.hypot(A.x-B.x,A.y-B.y),kk=Math.min(.5,(CNTR-1)/dAB),cz=pon('v09cazasenales',{x:Math.round(A.x+(B.x-A.x)*kk),y:Math.round(A.y+(B.y-A.y)*kk)},1);cz.hp=cz.max=1e7;
  const r=run(6,()=>A.cfU>S.wt);const near=B.sd.filter(s=>Math.hypot(s.x-cz.x,s.y-cz.y)<=CNTR);out.cazasenales=r&&(!near.length||near.some(s=>s.udwn>0));out.cazasenalesV=near.length+'/'+r+'/'+B.sd.map(s=>s.udwn>0?1:0).join('')+'/'+Math.hypot(cz.x-A.x,cz.y-A.y).toFixed(1)+'/'+(cz.cnW||0).toFixed(2)+'/'+(cz.cnc||0).toFixed(2)+'/'+JSON.stringify(cz.fx);run(CNTT+.2);out.cazasenalesDura=!(A.cfU>S.wt);for(const u of B.sd){u.hp=0;u.rt=999;}}
 // ---------- Centinela: 2 piezas; cada 12 s, 4 s quieto de torreta ----------
 limpio();A.jam=999;{const ce=pon('v10centinela',TR[M]);ce.hp=ce.max=1e7;const P=omPieces(ce);out.centinelaPiezas=P.length===2&&P[0]!==P[1]&&P.every(k=>CNP[k]);ce.omP=['con','apo'];
  const r=run(6,()=>ce.omD>0);const tw=S.list.find(t=>TW[t.type]&&!t.hero&&Math.hypot(t.x-ce.x,t.y-ce.y)<=OMCR-.5);const x0=ce.x,y0=ce.y;run(1);out.centinelaV=r+'/'+Math.hypot(ce.x-x0,ce.y-y0).toFixed(2)+'/'+(tw?tw.type+':'+tw.omcU+':'+S.wt.toFixed(2)+':'+ce.omD.toFixed(2)+':'+ce.omP:'-');out.centinela=r&&Math.hypot(ce.x-x0,ce.y-y0)<.01&&(!tw||tw.omcU>S.wt);run(OMDT);out.centinelaSigue=!(ce.omD>0);}
 // ---------- Prototipos fallidos: el vivo se queda las piezas del muerto ----------
 limpio();A.jam=999;{const a=pon('v11prototipos',TR[M],1),b2=pon('v11prototipos',TR[M+1],1);a.hp=a.max=b2.max=1000;b2.hp=400;mata(a);out.prototipos=Math.abs(b2.hp-700)<1&&b2.szm>1;}
 // ---------- Espécimen: evoluciona cada 8 s, 3 veces ----------
 limpio();A.jam=999;{const es=pon('v12especimen',TR[M],1);es.hp=es.max=1000;run(EVOCD+.1);out.especimen=es.evN===1&&Math.abs(es.max-1250)<1&&es.hp===1250;run(EVOCD*3);out.especimenMax=es.evN===EVON;}
 // ---------- Durmientes: salen congelados; en 10 s normales; la quemadura, el doble de rápido ----------
 limpio();A.jam=999;{const d1=pon('v13durmiente',TR[M],1),d2=pon('v13durmiente',TR[M+1],1);d1.hp=d1.max=d2.hp=d2.max=1e6;run(.1);out.durmiente=d1.thwM<.45&&d1.ova>29;run(THWT/2,()=>{d2.bn=1;});out.durmienteFuego=d2.thw>.97&&d1.thw<.6;run(THWT/2+.2);out.durmienteNormal=d1.thw===1&&d1.ova===0;}
 return out;});
const bad=Object.keys(r).filter(k=>r[k]!==true&&!/V$/.test(k));console.log(JSON.stringify(r));console.log(bad.length?'FALLA: '+bad.join(', '):'mecanicas_taller_t8 ok');console.log(errs.length?'ERRS '+JSON.stringify(errs.slice(0,5)):'ERRS []');await b.close();process.exit(bad.length||errs.length?1:0);})();