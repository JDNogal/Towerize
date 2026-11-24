// v366 · Enemigos nuevos del Taller, tanda 2 (Fantástica, partida 2): mal de ojo de la Bruja, bombas del Globo, grito del Ogro, brasas del Murciélago, tótem de Firmeza y portal del Portalero.
// Las fichas son las del Taller (24-nov); aquí se cargan con tallerAplicar como lo hará el archivo exportado.
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
/* mapa y azar fijos (semilla), para que la prueba mida siempre lo mismo; con SEMILLA=n se prueba con otro mapa */
await p.addInitScript(s0=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}let a=s0>>>0;Math.random=()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};},+(process.env.SEMILLA||7));
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(async()=>{const out={};{const i=document.getElementById('intro');if(i)i.style.display='none';}INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;
 const rep=tallerAplicar({en:{
  i40bruja:{n:'Bruja goblin',era:1,fac:'Pieles verdes',fam:'Místicos',tipo:'aire',rg:'A distancia',col:'#5a3a7a',st:{am:30,ap:0,dmg:1,gold:7,hp:50,sp:1,ud:4}},
  i04bombardero:{n:'Globo trasgo',era:1,fac:'Pieles verdes',fam:'A distancia',tipo:'aire',rg:'No ataca',col:'#8a3a3a',st:{am:10,ap:0,dmg:1,gold:7,hp:90,sp:.7,ud:0}},
  i15provocador:{n:'Ogro retador',era:1,fac:'Pieles verdes',fam:'Tanques',tipo:'tierra',rg:'Cuerpo a cuerpo',col:'#a07a5a',st:{am:10,ap:40,dmg:2,gold:10,hp:200,sp:.7,ud:8}},
  i17murcielago:{n:'Murciélago de fuego',era:1,fac:'Demonios',fam:'A distancia',tipo:'aire',rg:'A distancia',col:'#c0502a',st:{am:10,ap:0,dmg:1,gold:5,hp:40,sp:1.3,ud:6}},
  i41totem:{n:'Portatótem goblin',era:1,fac:'Pieles verdes',fam:'Apoyo',tipo:'tierra',rg:'No ataca',col:'#8a5a2a',st:{am:10,ap:5,dmg:1,gold:6,hp:60,sp:.75,ud:2}},
  i03directo:{n:'Cuervo de batalla',era:1,fac:'Monstruos',fam:'Rápidos',tipo:'aire',rg:'No ataca',col:'#3a3a48',st:{am:0,ap:0,dmg:1,gold:3,hp:30,sp:.9,ud:0}},
  i01portalero:{n:'Portalero',era:1,fac:'Demonios',fam:'Místicos',tipo:'tierra',rg:'No ataca',col:'#7a3ab8',st:{am:20,ap:10,dmg:1,gold:10,hp:200,sp:.8,ud:0}}}});
 out.carga=rep.en===7&&ET.i03directo.direct===1&&ET.i03directo.fly===1&&rep.enOff.length===0&&ET.i40bruja.hex===1&&ET.i40bruja.fly===1&&ET.i04bombardero.bomb===1&&ET.i15provocador.taunt===1&&ET.i17murcielago.ember===1&&ET.i41totem.totem===1&&ET.i01portalero.gate===1&&!ET.i01portalero.hidden&&!!ET.ttotem;
 out.compendio=EFAM.some(f=>f[1].includes('i01portalero'))&&kwHtml0('ehex','').includes('20 %')&&kwHtml0('ebomb','').includes('2,5 s')&&kwHtml0('etaunt','').includes('hasta que muera')&&kwHtml0('efirm','').includes('ningún control')&&kwHtml0('egate','').includes('Los jefes no caben');
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
 limpio();run(1.5);
 // ---------- Bruja goblin: −20 % de alcance 5 s, no se acumula, 10 s sin poder repetirle ----------
 {const r0=stats(A).range;const w=pon('i40bruja',{x:A.x+1,y:A.y},1),w2=pon('i40bruja',{x:A.x-1,y:A.y},1);B.heximm=999;
  out.bruja=run(4,()=>A.hexr>0)&&Math.abs(stats(A).range-r0*HEXM)<1e-6;run(1);out.brujaNoAcumula=Math.abs(stats(A).range-r0*HEXM)<1e-6;
  run(OJOT);out.brujaAcaba=!(A.hexr>0)&&A.heximm>0&&Math.abs(stats(A).range-r0)<1e-6;out.brujaRespiro=!run(HEXIMM-1.6,()=>A.hexr>0);out.brujaVuelve=run(HEXCD+1.5,()=>A.hexr>0);}
 // ---------- Globo trasgo: diana 1 s y la torre no dispara 2,5 s; prefiere torres sin unidades; a un Baluarte le corta la reposición ----------
 limpio();{const gl=pon('i04bombardero',{x:A.x,y:A.y+1},1);B.jam=999;const dA=Math.hypot(A.x-gl.x,A.y-gl.y),dB=Math.hypot(B.x-gl.x,B.y-gl.y);out.globoAlcanceV=dA.toFixed(1)+'/'+dB.toFixed(1);
  const m=run(3,()=>S.tmb&&S.tmb.length>0);out.globoMarca=m&&S.tmb[0].t===A&&!(A.jam>0);run(BOMBW+.1);out.globoPara=A.jam>BOMBT-.3&&stats(A).rate<.01;
  // con los Arqueros ya parados, la siguiente va al Baluarte
  A.jam=999;B.jam=0;gl.x=gl.tx=B.x;gl.y=gl.ty=B.y+1;const m2=run(BOMBCD+1,()=>S.tmb&&S.tmb.some(x=>x.t===B));run(BOMBW+.1);out.globoBaluarte=m2&&B.jam>0;
  const s0=B.sd[0];s0.hp=0;s0.rt=unitOf(B).rez;run(.2);const rt0=s0.rt;run(1);out.globoNoRepone=rt0>0&&s0.rt>=rt0-.01&&s0.hp<=0;B.jam=0;run(.5);out.globoRepone=s0.rt<rt0-.3||s0.hp>0;for(const s of B.sd){s.hp=s.max;s.rt=0;}A.jam=0;}
 // ---------- Ogro retador: las torres le apuntan hasta que muera ----------
 limpio();for(const s of B.sd){s.hp=0;s.rt=999;}{const og=pon('i15provocador',TR[Math.max(0,iA-2)],1),cebo=pon('norm',TR[Math.min(TR.length-1,iA+2)],1);og.tac=99;out.ogroAntes=true;
  {const c0=cebo.hp;run(1.2);out.ogroAntes=out.ogroAntes&&cebo.hp<c0;}og.tac=0;out.ogroGrita=run(1,()=>A.taunt===og);run(.3);const o1=og.hp,c1=cebo.hp;run(3);out.ogroApunta=og.hp<o1&&cebo.hp===c1;const o2=og.hp;run(9);out.ogroSigue=og.hp<o2&&cebo.hp===c1&&A.taunt===og;
  og.hp=0;S.enemies.splice(S.enemies.indexOf(og),1);const c3=cebo.hp;run(1.5);out.ogroMuere=!A.taunt&&cebo.hp<c3;}
 // las torres con unidades también: los soldados dejan al que tenían y van a por el Ogro
 limpio();A.jam=999;for(const s of B.sd){s.hp=s.max=9999;s.rt=0;s.lock=false;}run(1);{const fl=B.flag||B,q0=pathNear(fl.x,fl.y)||TR[iB],cebo=pon('norm',q0,1);run(1.5);out.ogroUnidadesAntes=B.sd.some(s=>s.en===cebo);
  const iq=cerca(q0),og=pon('i15provocador',TR[Math.max(0,iq-3)],1);og.tac=0;run(.3);out.ogroUnidadesGrito=B.taunt===og;run(1);out.ogroUnidades=B.sd.every(s=>s.en===og);out.ogroUnidadesV=B.sd.map(s=>s.en?s.en.t:'-').join('/')+' '+Math.hypot(og.x-fl.x,og.y-fl.y).toFixed(1);
  og.hp=0;S.enemies.splice(S.enemies.indexOf(og),1);run(1);out.ogroUnidadesMuere=!B.taunt&&B.sd.some(s=>s.en===cebo);for(const s of B.sd){s.en=null;s.fight=false;}}
 // ---------- Murciélago de fuego: diana bajo una unidad y brasas a las que sigan dentro ----------
 limpio();for(const s of B.sd){s.hp=s.max=48;s.rt=0;}run(1.2);{const fl=B.flag||B,mu=pon('i17murcielago',pathNear(fl.x,fl.y)||TR[iB],1);
  const z=run(3,()=>S.tmz&&S.tmz.length>0);const zz=z&&S.tmz[0],h0=B.sd.map(s=>s.hp),den=zz?B.sd.filter(s=>Math.hypot(s.x-zz.x,s.y-zz.y)<=EMBA):[];run(EMBW+.1);
  out.murcielago=z&&den.length>=1&&den.every(s=>(48-s.hp)>=ET.i17murcielago.ud-.01&&(48-s.hp)<ET.i17murcielago.ud*1.3)&&B.sd.filter((s,i)=>s.hp<h0[i]).length===den.length;
  // si apartas las unidades de la diana, falla
  const z2=run(EMBCD+1,()=>S.tmz&&S.tmz.length>0);const h1=B.sd.map(s=>s.hp);for(const s of B.sd){s.x+=4;s.lock=true;}update(.05);for(let i=0;i<Math.round((EMBW+.1)/.05);i++){for(const s of B.sd){const q=S.tmz&&S.tmz[0];if(q&&Math.hypot(s.x-q.x,s.y-q.y)<EMBA+1){s.x=q.x+4;}}update(.05);}
  out.murcielagoFalla=z2&&B.sd.every((s,i)=>s.hp>=h1[i]-.01);
  // las brasas se quedan ardiendo y queman (stacks de quemadura) a quien vuelva a entrar
  const zz2=S.tmz.find(z=>!(z.w>0));out.brasasQuedan=!!zz2&&zz2.l>0;if(zz2){const s=B.sd[0];s.lock=true;s.ubn=0;s.hp=s.max=100;s.x=zz2.x;s.y=zz2.y;for(let i=0;i<10;i++){s.x=zz2.x;s.y=zz2.y;update(.05);}out.brasasQueman=s.hp<100&&!(s.ubn>0);s.lock=false;s.ubn=0;s.hp=0;s.rt=999;}}
 // ---------- Portatótem: tótem y Firmeza (ningún control) ----------
 limpio();for(const s of B.sd){s.hp=0;s.rt=999;}A.jam=999;{const iT=Math.max(3,M-12),pt=pon('i41totem',TR[iT],1);const tot=run(4,()=>S.enemies.some(e=>e.t==='ttotem'));const tt=S.enemies.find(e=>e.t==='ttotem');
  const n1=pon('norm',TR[iT+1]);update(.05);out.totem=tot&&!!tt&&n1.firm>S.wt;
  slowE(n1,.3,5);stunE(n1,2);const x0=n1.x,y0=n1.y;const vel=()=>{let d=0,x=n1.x,y=n1.y;for(let i=0;i<10;i++){update(.05);d+=Math.hypot(n1.x-x,n1.y-y);x=n1.x;y=n1.y;}return d/.5;};const v=vel();
  out.firmeza=!n1.fx.slow&&!n1.fx.stun&&Math.abs(v-ET.norm.sp)<ET.norm.sp*.12;out.firmezaV=v.toFixed(1)+'/'+ET.norm.sp;
  {const bx=n1.x,by=n1.y;knock(n1,3);out.firmezaEmpuje=n1.x===bx&&n1.y===by;freezeE(n1,2);n1.fx.fear={t:2};update(.05);out.firmezaResto=!n1.fx.freeze&&!n1.fx.fear;}
  // el tótem se puede romper; pasada la Firmeza vuelve a entrarle el control
  pt.hp=0;S.enemies.splice(S.enemies.indexOf(pt),1);hurt(tt,1e9,null,'phys');run(.2);out.totemRompe=!S.enemies.some(e=>e.t==='ttotem'&&e.hp>0);
  run(FIRMT+.2);slowE(n1,.3,5);update(.05);out.firmezaAcaba=!(n1.firm>S.wt)&&!!n1.fx.slow;}
 // un tótem se cae solo a los 10 s
 limpio();{const pt=pon('i41totem',TR[Math.max(3,M-12)],1);run(4,()=>S.enemies.some(e=>e.t==='ttotem'));pt.ttc=999;out.totemCae=run(TOTT+.5,()=>!S.enemies.some(e=>e.t==="ttotem"));}
 // ---------- Portalero: portal que adelanta 15 celdas por el camino ----------
 limpio();A.jam=999;for(const u of B.sd){u.hp=0;u.rt=999;u.lock=false;}{const iP=8,po=pon('i01portalero',TR[iP]);run(1);out.portalSinDaño=!(po.gw>0)&&!(po.go>0);
  po.hp-=5;out.portalAvisa=run(.3,()=>po.gw>0)&&po.gex!=null;const px=po.x,py=po.y;run(GATEW+.1);out.portalAbre=po.go>0&&po.x===px&&po.y===py;
  const F=q=>S.field[Math.round(q.y)][Math.round(q.x)],fE=F({x:po.gx,y:po.gy}),fS=F({x:po.gex,y:po.gey});out.portalSalida=fE-fS>=TELED-4&&fE-fS<=TELED+3;out.portalV=(fE-fS).toFixed(0)+'/'+TR.length;
  /* salen justo donde está él: así van por su misma rama aunque el camino se bifurque */const n1=pon('norm',{x:Math.round(po.x),y:Math.round(po.y)}),b1=pon('bat',{x:Math.round(po.x),y:Math.round(po.y)});const cru=run(4,()=>F(n1)<fE-8&&F(b1)<fE-8);out.portalCruzan=cru;
  // pelear con él lo cierra; 2,5 s después de quedar libre lo vuelve a abrir
  const sd=B.sd[0];sd.hp=sd.max=9999;sd.rt=0;const fake=()=>{sd.en=po;sd.fight=true;};const _c=unitCombat;unitCombat=function(dt){const r=_c(dt);fake();return r;};update(.05);update(.05);out.portalCierra=!(po.go>0)&&!(po.gw>0)&&po.gheld===1;
  unitCombat=_c;sd.en=null;sd.fight=false;sd.hp=0;sd.rt=999;run(GATEFREE-.4);out.portalEspera=!(po.gw>0)&&!(po.go>0);out.portalReabre=run(1.2,()=>po.gw>0);
  // 8 s abierto, luego anda 10 s y abre otro
  run(GATEW+.1);const t0=S.wt;const cerr=run(GATET+.5,()=>!(po.go>0));out.portalDura=cerr&&Math.abs((S.wt-t0)-GATET)<.4&&po.gcd>GATECD-.3;
  const ax=po.x,ay=po.y;run(2);out.portalAnda=Math.hypot(po.x-ax,po.y-ay)>2;out.portalOtro=!run(GATECD-2.6,()=>po.gw>0)&&(run(1.5,()=>po.gw>0)||gateInCore(po)/* si ya ha llegado a la casilla del núcleo no abre: también vale */);}
 // sin que nadie le pegue, abre el primero a los 6 s de entrar
 limpio();A.jam=999;{const po=pon('i01portalero',TR[4]);out.portalSolo=!run(GATEFIRST-.5,()=>po.gw>0)&&run(1,()=>po.gw>0);}
 // la Bruja hace daño mágico a las unidades; mal de ojo y bombas también afectan a las torres de evento
 out.brujaMagica=ET.i40bruja.dt==='magic';{const tE={type:'faro',x:0,y:0};out.eventoAfectada=!!tm2Tw(tE);}
 // ---------- Cuervo de batalla: entra por el borde de tus piezas y va recto al núcleo ----------
 limpio();A.jam=0;{out.cuervoSinAviso=!crowNext();S.crowLeft=2;out.cuervoAviso=crowNext();S.crowLeft=0;{const ph=S.phase;S.phase='build';S.portals[0].sqm=[{i03directo:5}];out.cuervoAviso=out.cuervoAviso&&crowNext()&&crowPlan()===5;S.portals[0].sqm=[];out.cuervoSinAviso=out.cuervoSinAviso&&!crowNext();S.phase=ph;}
  S.crowIn=null;const c=crowEntry(),c2=crowEntry();
  out.cuervoBorde=c===c2&&(c.x===0||c.x===N-1||c.y===0||c.y===N-1)&&c.pz>=1;out.cuervoLejosDelGrueso=c.cov>=1&&c.cov<=Math.max(1,Math.floor(c.max/2));out.cuervoV=[c.x,c.y,c.pz,c.cov,c.max].join('/');
  spawnEnemy('i03directo',P0,{r:0,l:1,sp:ET.i03directo.sp,sid:'cv'});const e=S.enemies[S.enemies.length-1];e.hp=e.max=1e6;out.cuervoEntra=e.dirc===1&&Math.hypot(e.x-c.x,e.y-c.y)<=2.1&&Math.hypot(e.x-P0.x,e.y-P0.y)>3;
  const d0=Math.hypot(S.core.x-e.x,S.core.y-e.y),a0=Math.atan2(S.core.y-e.y,S.core.x-e.x);run(1);const d1=Math.hypot(S.core.x-e.x,S.core.y-e.y),a1=Math.atan2(S.core.y-e.y,S.core.x-e.x);
  out.cuervoRecto=Math.abs((d0-d1)-ET.i03directo.sp)<.2&&Math.abs(a1-a0)<.02;slowE(e,.5,5);const d2=Math.hypot(S.core.x-e.x,S.core.y-e.y);run(1);const d3=Math.hypot(S.core.x-e.x,S.core.y-e.y);out.cuervoLento=Math.abs((d2-d3)-ET.i03directo.sp*.5)<.3;
  delete e.fx.slow;const h0=S.hp;e.x=S.core.x-c.ux*3;e.y=S.core.y-c.uy*3;out.cuervoLlega=run(3,()=>!S.enemies.includes(e))&&S.hp<h0;}
 // dentro de la casilla del núcleo no abre portal
 limpio();A.jam=999;{let q=null;for(const t of TR)if(Math.floor(t.x/K)===Math.floor(S.core.x/K)&&Math.floor(t.y/K)===Math.floor(S.core.y/K)){q=t;break;}const po=pon('i01portalero',q,1);po.gact=1;po.hp-=5;out.portalNoNucleo=!run(2,()=>po.gw>0||po.go>0);}
 return out;});
const bad=Object.keys(r).filter(k=>r[k]!==true&&!/V$/.test(k));console.log(JSON.stringify(r));console.log(bad.length?'FALLA: '+bad.join(', '):'mecanicas_taller_t2 ok');console.log(errs.length?'ERRS '+JSON.stringify(errs.slice(0,5)):'ERRS []');await b.close();process.exit(bad.length||errs.length?1:0);})();
