// v366 · Enemigos nuevos del Taller, tanda 4 (Distópica, partida 1): Microbot, Sobrecargador, Avispa de colmena, Caza interceptor y Escupidor alado.
// Las fichas son las del Taller (24-nov); aquí se cargan con tallerAplicar como lo hará el archivo exportado.
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
/* mapa y azar fijos (semilla), para que la prueba mida siempre lo mismo; con SEMILLA=n se prueba con otro mapa */
await p.addInitScript(s0=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}let a=s0>>>0;Math.random=()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};},+(process.env.SEMILLA||7));
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(async()=>{const out={};{const i=document.getElementById('intro');if(i)i.style.display='none';}INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;
 const rep=tallerAplicar({en:{
  i29microbot:{n:'Microbot',era:2,fac:'Máquinas',fam:'Guerreros',tipo:'tierra',rg:'Cuerpo a cuerpo',col:'#8a9aaa',st:{am:0,ap:5,dmg:1,gold:1,hp:12,sp:1.1,ud:2}},
  i19sobrecarga:{n:'Sobrecargador',era:2,fac:'Máquinas',fam:'Apoyo',tipo:'tierra',rg:'No ataca',col:'#c04a2a',st:{am:10,ap:0,dmg:1,gold:6,hp:60,sp:.7,ud:2}},
  i38avispa:{n:'Avispa de colmena',era:2,fac:'Alienígenas',fam:'Guerreros',tipo:'aire',rg:'Cuerpo a cuerpo',col:'#c0a02a',st:{am:10,ap:0,dmg:1,gold:3,hp:30,sp:1.4,ud:3}},
  i45caza:{n:'Caza interceptor',era:2,fac:'Máquinas',fam:'Rápidos',tipo:'aire',rg:'No ataca',col:'#4a6a8a',st:{am:0,ap:10,dmg:1,gold:7,hp:70,sp:1.5,ud:0}},
  i42escupidor:{n:'Escupidor alado',era:2,fac:'Alienígenas',fam:'A distancia',tipo:'aire',rg:'A distancia',col:'#6a9a2a',st:{am:10,ap:0,dmg:1,gold:6,hp:50,sp:1.1,ud:4}}},
  sq:{qmarea:{custom:true,era:2,pz:1,min:1,n:'Marea de prueba',lead:'i19sobrecarga',m:{i19sobrecarga:1,i29microbot:4},f:[[['i29microbot',0,-1],['i29microbot',0,1],['i19sobrecarga',1.5,0],['i29microbot',3,-1],['i29microbot',3,1]]]}}});
 out.carga=rep.en===5&&rep.enOff.length===0&&ET.i19sobrecarga.ovl===1&&ET.i38avispa.sting===1&&ET.i45caza.aburn===1&&ET.i42escupidor.spit2===1&&ET.i29microbot.fac==='m'&&!SQUADS.qmarea.off;
 out.compendio=kwHtml0('eovl','').includes('30 %')&&kwHtml0('eaburn','').includes('doble')&&kwHtml0('espit2','').includes('ácido');
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
 // ---------- Sobrecargador ----------
 {const fo=sqForm('qmarea',SQUADS.qmarea.m),sp=Math.min(...fo.map(o=>ET[o.t].sp));for(const o of fo)spawnEnemy(o.t,P0,{r:o.r,l:o.l,sp,sid:'t4',lead:o.lead});
  const sc=S.enemies.find(e=>e.t==='i19sobrecarga'),mb=S.enemies.find(e=>e.t==='i29microbot');for(const e of S.enemies)if(e.sqid)e.hp=e.max=1e6;const suelto=pon('i29microbot',TR[Math.min(TR.length-1,M+30)]);suelto.hp=suelto.max=1e6;
  const ap0=armorOf(mb,'phys');const vel=e=>{let d=0,x=e.x,y=e.y;for(let i=0;i<10;i++){update(.05);d+=Math.hypot(e.x-x,e.y-y);x=e.x;y=e.y;}return d/.5;};const v0=vel(mb);
  const c=run(5,()=>mb.ovU>S.wt);const v1=vel(mb);out.sobrecarga=c&&Math.abs(armorOf(mb,'phys')-(ap0+OVLA))<.01&&v1>v0*1.2&&sc.ovU>S.wt&&!(suelto.ovU>S.wt)&&mb.fsp>0;out.sobrecargaV=[v0,v1].map(v=>v.toFixed(2)).join('/');
  run(OVLT-.4);const v2=vel(mb);out.recalentado=!(mb.ovU>S.wt)&&mb.ohU>S.wt&&Math.abs(armorOf(mb,'phys')-(ap0-OVLA))<.01&&v2<v0*.9;run(OVHT);out.normal=Math.abs(armorOf(mb,'phys')-ap0)<.01;}
 // ---------- Avispa: pica a la unidad (también al héroe), la envenena y vuelve ----------
 limpio();for(const s of B.sd){s.hp=s.max=100;s.rt=0;s.ps=[];}run(1.2);{const fl=B.flag||B,av=pon('i38avispa',pathNear(fl.x,fl.y),1);av.hp=av.max=1e6;av.wcd=0;const h0=B.sd.map(s=>s.hp);
  const va=run(1,()=>!!av.wsp);const hx=av.wsp&&av.wsp.hx,hy=av.wsp&&av.wsp.hy,tg=av.wsp&&av.wsp.s;run(1.5,()=>!av.wsp);out.avispa=va&&!!tg&&tg.hp<h0[B.sd.indexOf(tg)]&&(tg.ps||[]).length>=1&&Math.hypot(av.x-hx,av.y-hy)<.2&&av.wcd>STGCD-.8;}
 {const h=S.hero.s;h.hp=h.max;h.rt=0;h.x=B.x;h.y=B.y;for(const s of B.sd){s.hp=0;s.rt=999;}const av=S.enemies.find(e=>e.t==='i38avispa');av.x=h.x+1;av.y=h.y;av.wcd=0;const hh=h.hp;run(1.5,()=>h.hp<hh);out.avispaHeroe=h.hp<hh;h.hp=0;h.rt=999;}
 // ---------- Caza: postcombustión al primer golpe, solo el que lo recibe ----------
 limpio();A.jam=999;{const c1=pon('i45caza',TR[5]),c2=pon('i45caza',TR[6]);c1.hp=c1.max=c2.hp=c2.max=1e6;run(.3);hurt(c1,50,null,'phys');run(.1);const vel=e=>{let d=0,x=e.x,y=e.y;for(let i=0;i<10;i++){update(.05);d+=Math.hypot(e.x-x,e.y-y);x=e.x;y=e.y;}return d/.5;};
  const v1=vel(c1),v2=vel(c2);out.caza=c1.abU>S.wt&&!(c2.abU>S.wt)&&v1>v2*1.8;out.cazaV=v1.toFixed(1)+'/'+v2.toFixed(1);run(ABT);hurt(c1,50,null,'phys');run(.1);out.cazaUnaVez=!(c1.abU>S.wt);}
 // ---------- Escupidor alado: charco de ácido bajo las unidades; si se apartan, deja de doler ----------
 limpio();for(const s of B.sd){s.hp=s.max=100;s.rt=0;s.ps=[];}run(1.2);{const fl=B.flag||B,es=pon('i42escupidor',pathNear(fl.x,fl.y),1);es.hp=es.max=1e6;es.spc=0;
  const ch=run(1,()=>S.tmp2&&S.tmp2.length>0);const p=S.tmp2[0];run(SPITW+.05);const h1=B.sd.map(s=>s.hp);run(1);const den=B.sd.filter((s,i)=>Math.hypot(s.x-p.x,s.y-p.y)<=SPITA);
  out.escupidor=ch&&den.length>=1&&den.every(s=>{const i=B.sd.indexOf(s);return h1[i]-s.hp>ET.i42escupidor.ud*.8;});
  for(const s of B.sd){s.x=p.x+5;s.lock=true;}const h2=B.sd.map(s=>s.hp);es.spc=99;for(let i=0;i<20;i++){for(const s of B.sd)s.x=p.x+5;update(.05);}out.escupidorApartar=B.sd.every((s,i)=>s.hp>=h2[i]-.01);
  run(SPITT);out.charcoSeca=!S.tmp2.length;}
 return out;});
const bad=Object.keys(r).filter(k=>r[k]!==true&&!/V$/.test(k));console.log(JSON.stringify(r));console.log(bad.length?'FALLA: '+bad.join(', '):'mecanicas_taller_t4 ok');console.log(errs.length?'ERRS '+JSON.stringify(errs.slice(0,5)):'ERRS []');await b.close();process.exit(bad.length||errs.length?1:0);})();
