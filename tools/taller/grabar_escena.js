// Graba una escena de demostración de un enemigo nuevo (para la Mesa): SEMILLA=7 node tools/taller/grabar_escena.js <escena> salida.webm segundos
// Escenas: corneta, jabali, buitre, limo, bruja, globo, ogro, murcielago, totem, portalero, cuervo, guardian, gloton, sacrificador, golem, transporte, alado, guiverno, sobrecarga, avispa, caza, escupidor. Después se recorta el arranque (~5-12 s) y se pasa a mp4 con ffmpeg., holo, arrojador, lanzadera, reciclador, feromonas, saboteador
// Ojo: las rutas son las del entorno de Claude (/home/claude/towerize y /tmp/demo/vid); las fichas van copiadas del Taller (24-nov).
// node demo.js escena salida.webm segundos  → graba la escena a tiempo real
const {chromium}=require('/home/claude/towerize/node_modules/playwright');const fs=require('fs');(async()=>{const esc=process.argv[2],out=process.argv[3],secs=+(process.argv[4]||8);
const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:960,height:540},recordVideo:out.endsWith('.webm')?{dir:'/tmp/demo/vid',size:{width:960,height:540}}:undefined});const p=await ctx.newPage();p.on('pageerror',e=>console.log('ERR',e.message));
await p.addInitScript(s0=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}let a=s0>>>0;Math.random=()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};},+(process.env.SEMILLA||7));
await p.goto('file:///home/claude/towerize/index.html');await p.waitForTimeout(700);
await p.evaluate(async(esc)=>{{const i=document.getElementById('intro');if(i)i.style.display='none';}INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;OPT.camauto=false;
 tallerAplicar({en:{
  i06potenciador:{n:'Cornetero orco',era:1,fac:'Pieles verdes',fam:'Apoyo',tipo:'tierra',rg:'No ataca',col:'#e08a2e',st:{am:10,ap:0,dmg:1,gold:5,hp:50,sp:.7,ud:2}},
  i07divisor:{n:'Limo',era:1,fac:'Monstruos',fam:'Guerreros',tipo:'tierra',rg:'Cuerpo a cuerpo',col:'#5a8a3a',st:{am:0,ap:0,dmg:1,gold:3,hp:90,sp:.8,ud:5}},
  i47minilimo:{n:'Mini limo',era:1,fac:'Monstruos',fam:'Guerreros',tipo:'tierra',rg:'Cuerpo a cuerpo',col:'#6a9a4a',st:{am:0,ap:0,dmg:1,gold:1,hp:25,sp:1,ud:2},tam:.8},
  i37buitre:{n:'Jinete de buitre goblin',era:1,fac:'Pieles verdes',fam:'Guerreros',tipo:'aire',rg:'Cuerpo a cuerpo',col:'#8a6a3a',st:{am:0,ap:5,dmg:1,gold:6,hp:55,sp:1.2,ud:6}},
  i03directo:{n:'Cuervo de batalla',era:1,fac:'Monstruos',fam:'Rápidos',tipo:'aire',rg:'No ataca',col:'#3a3a48',st:{am:0,ap:0,dmg:1,gold:3,hp:30,sp:.9,ud:0}},
  i10pesado:{n:'Guiverno',era:1,fac:'Monstruos',fam:'Tanques',tipo:'aire',rg:'No ataca',col:'#4a6a4a',st:{am:0,ap:40,dmg:2,gold:14,hp:400,sp:.6,ud:0}},
  i33gloton:{n:'Ogro glotón',era:1,fac:'Pieles verdes',fam:'Tanques',tipo:'tierra',rg:'Cuerpo a cuerpo',col:'#6a8a3a',st:{am:0,ap:15,dmg:2,gold:12,hp:220,sp:.6,ud:12}},
  i34sacrificador:{n:'Sacrificador',era:1,fac:'Demonios',fam:'Místicos',tipo:'tierra',rg:'A distancia',col:'#8a1a2a',st:{am:20,ap:0,dmg:1,gold:8,hp:70,sp:.75,ud:4}},
  i44golem:{n:'Gólem de magma',era:1,fac:'Demonios',fam:'Tanques',tipo:'tierra',rg:'Cuerpo a cuerpo',col:'#a0401a',st:{am:10,ap:25,dmg:3,gold:14,hp:240,sp:.55,ud:12}},
  i14transporte:{n:'Transportador aéreo',era:1,fac:'Pieles verdes',fam:'Apoyo',tipo:'aire',rg:'No ataca',col:'#7a6a5a',lleva:{sling:6},st:{am:0,ap:20,dmg:1,gold:10,hp:250,sp:.8,ud:0}},
  i05guardian:{n:'Guardián de la inmortalidad',era:1,fac:'Demonios',fam:'Apoyo',tipo:'tierra',rg:'No ataca',col:'#e0c050',st:{am:20,ap:20,dmg:1,gold:12,hp:200,sp:.7,ud:0}},
  i11alado:{n:'Portaestandarte alado',era:1,fac:'Pieles verdes',fam:'Apoyo',tipo:'aire',rg:'No ataca',col:'#8a3a6a',st:{am:20,ap:0,dmg:1,gold:7,hp:80,sp:.8,ud:0}},
  i29microbot:{n:'Microbot',era:2,fac:'Máquinas',fam:'Guerreros',tipo:'tierra',rg:'Cuerpo a cuerpo',col:'#8a9aaa',st:{am:0,ap:5,dmg:1,gold:1,hp:12,sp:1.1,ud:2}},
  i19sobrecarga:{n:'Sobrecargador',era:2,fac:'Máquinas',fam:'Apoyo',tipo:'tierra',rg:'No ataca',col:'#c04a2a',st:{am:10,ap:0,dmg:1,gold:6,hp:60,sp:.7,ud:2}},
  i38avispa:{n:'Avispa de colmena',era:2,fac:'Alienígenas',fam:'Guerreros',tipo:'aire',rg:'Cuerpo a cuerpo',col:'#c0a02a',st:{am:10,ap:0,dmg:1,gold:3,hp:30,sp:1.4,ud:3}},
  i45caza:{n:'Caza interceptor',era:2,fac:'Máquinas',fam:'Rápidos',tipo:'aire',rg:'No ataca',col:'#4a6a8a',st:{am:0,ap:10,dmg:1,gold:7,hp:70,sp:1.5,ud:0}},
  i42escupidor:{n:'Escupidor alado',era:2,fac:'Alienígenas',fam:'A distancia',tipo:'aire',rg:'A distancia',col:'#6a9a2a',st:{am:10,ap:0,dmg:1,gold:6,hp:50,sp:1.1,ud:4}},
  i02tunelador:{n:'Gusano excavador',era:2,fac:'Alienígenas',fam:'Rápidos',tipo:'tierra',rg:'Cuerpo a cuerpo',col:'#8a6a4a',st:{am:0,ap:20,dmg:1,gold:6,hp:60,sp:1.5,ud:5}},
  i16amalgama:{n:'Amalgama',era:2,fac:'Alienígenas',fam:'Tanques',tipo:'tierra',rg:'Cuerpo a cuerpo',col:'#2a6a5a',st:{am:10,ap:10,dmg:1,gold:3,hp:70,sp:.6,ud:3}},
  i21garrapata:{n:'Garrapata del vacío',era:2,fac:'Alienígenas',fam:'Místicos',tipo:'aire',rg:'No ataca',col:'#3a5a3a',st:{am:0,ap:0,dmg:1,gold:4,hp:25,sp:1.4,ud:0}},
  i39choque:{n:'Dron arpón',era:2,fac:'Máquinas',fam:'Guerreros',tipo:'aire',rg:'No ataca',col:'#7a8a9a',st:{am:0,ap:15,dmg:1,gold:6,hp:60,sp:1.2,ud:0}},
  i08inhibidor:{n:'Inhibidor',era:2,fac:'Máquinas',fam:'Místicos',tipo:'tierra',rg:'No ataca',col:'#1e4a5a',st:{am:10,ap:10,dmg:1,gold:8,hp:110,sp:.7,ud:0}},
  i20nexo:{n:'Nexo de colmena',era:2,fac:'Alienígenas',fam:'Apoyo',tipo:'tierra',rg:'No ataca',col:'#7a3a8a',st:{am:20,ap:10,dmg:1,gold:10,hp:180,sp:.65,ud:0}},
  i30fragata:{n:'Fragata de escudo',era:2,fac:'Máquinas',fam:'Tanques',tipo:'aire',rg:'No ataca',col:'#3a6aa8',st:{am:10,ap:10,dmg:2,gold:16,hp:300,sp:.6,ud:0}},
  i31saltador:{n:'Saltador cuántico',era:2,fac:'Máquinas',fam:'Rápidos',tipo:'tierra',rg:'Cuerpo a cuerpo',col:'#6a3ad8',st:{am:10,ap:10,dmg:1,gold:8,hp:110,sp:.9,ud:6}},
  i40bruja:{n:'Bruja goblin',era:1,fac:'Pieles verdes',fam:'Místicos',tipo:'aire',rg:'A distancia',col:'#5a3a7a',st:{am:30,ap:0,dmg:1,gold:7,hp:50,sp:1,ud:4}},
  i04bombardero:{n:'Globo trasgo',era:1,fac:'Pieles verdes',fam:'A distancia',tipo:'aire',rg:'No ataca',col:'#8a3a3a',st:{am:10,ap:0,dmg:1,gold:7,hp:90,sp:.7,ud:0}},
  i15provocador:{n:'Ogro retador',era:1,fac:'Pieles verdes',fam:'Tanques',tipo:'tierra',rg:'Cuerpo a cuerpo',col:'#a07a5a',st:{am:10,ap:40,dmg:2,gold:10,hp:200,sp:.7,ud:8}},
  i17murcielago:{n:'Murciélago de fuego',era:1,fac:'Demonios',fam:'A distancia',tipo:'aire',rg:'A distancia',col:'#c0502a',st:{am:10,ap:0,dmg:1,gold:5,hp:40,sp:1.3,ud:6}},
  i41totem:{n:'Portatótem goblin',era:1,fac:'Pieles verdes',fam:'Apoyo',tipo:'tierra',rg:'No ataca',col:'#8a5a2a',st:{am:10,ap:5,dmg:1,gold:6,hp:60,sp:.75,ud:2}},
  i01portalero:{n:'Portalero',era:1,fac:'Demonios',fam:'Místicos',tipo:'tierra',rg:'No ataca',col:'#7a3ab8',st:{am:20,ap:10,dmg:1,gold:10,hp:200,sp:.8,ud:0}},
  i24holo:{n:'Proyector holográfico',era:2,fac:'Máquinas',fam:'Místicos',tipo:'tierra',rg:'No ataca',col:'#3ab8d8',st:{am:30,ap:0,dmg:1,gold:8,hp:70,sp:.85,ud:0}},
  i32arrojador:{n:'Arrojador de colmena',era:2,fac:'Alienígenas',fam:'Tanques',tipo:'tierra',rg:'Cuerpo a cuerpo',col:'#5a7a2a',st:{am:10,ap:20,dmg:2,gold:12,hp:300,sp:.45,ud:10}},
  i18lanzadera:{n:'Lanzadera de desembarco',era:2,fac:'Máquinas',fam:'Apoyo',tipo:'aire',rg:'No ataca',col:'#5a6a7a',st:{am:20,ap:30,dmg:2,gold:18,hp:450,sp:.6,ud:0}},
  i22reciclador:{n:'Dron reciclador',era:2,fac:'Máquinas',fam:'Apoyo',tipo:'aire',rg:'Cuerpo a cuerpo',col:'#8a7a3a',st:{am:0,ap:20,dmg:1,gold:7,hp:90,sp:.8,ud:5}},
  i36feromonas:{n:'Portador de feromonas',era:2,fac:'Alienígenas',fam:'Apoyo',tipo:'tierra',rg:'No ataca',col:'#b8a02a',st:{am:10,ap:0,dmg:1,gold:7,hp:80,sp:.8,ud:2}},
  i46saboteador:{n:'Dron saboteador',era:2,fac:'Máquinas',fam:'A distancia',tipo:'aire',rg:'A distancia',col:'#6a4a6a',st:{am:10,ap:0,dmg:1,gold:7,hp:60,sp:1.1,ud:0}},
  i43jabali:{n:'Jabalí de guerra',era:1,fac:'Pieles verdes',fam:'Rápidos',tipo:'tierra',rg:'Cuerpo a cuerpo',col:'#7a5a3a',st:{am:0,ap:10,dmg:1,gold:6,hp:60,sp:1.6,ud:6}}},
  sq:{qmarea:{custom:true,era:2,pz:1,min:1,n:'Marea de chatarra',lead:'i19sobrecarga',m:{i19sobrecarga:1,i29microbot:12},f:[[['i29microbot',0.5,-1],['i29microbot',1,0],['i29microbot',0.5,1],['i29microbot',1.5,-1],['i29microbot',1.5,1],['i29microbot',2,-2],['i29microbot',4,0],['i29microbot',2,2],['i29microbot',3.5,-1],['i29microbot',3.5,1],['i29microbot',3,-2],['i19sobrecarga',2.4,0],['i29microbot',3,2]]]},qcharanga:{custom:true,era:1,pz:1,min:1,n:'Charanga orca',lead:'i06potenciador',m:{i06potenciador:1,norm:4},f:[[['norm',0,-1],['norm',0,1],['i06potenciador',1.5,0],['norm',3,-1],['norm',3,1]]]}}});
 startGame(15);chooseHero('reinhart');for(let i=0;i<8&&DLG.on;i++)dlgEnd();S.chests={};S.evts={};RL.open=false;HQ.q=[];
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
 RL.open=false;try{lbClose(true);}catch(e){}S.phase='build';const P0=S.portals[0];S.gold=99999;S.field=S.field||field();
 let sol=null,bd=1e9;{const mx=(P0.x+S.core.x)/2,my=(P0.y+S.core.y)/2;for(let ky=0;ky<NC;ky++)for(let kx=0;kx<NC;kx++)if(S.cc[ky][kx]===1){const x=kx*K+KC,y=ky*K+KC;let adj=false;for(const[dx,dy]of[[K,0],[-K,0],[0,K],[0,-K]]){const px=x+dx,py=y+dy;if(inb(px,py)&&S.cells[py][px]===2&&S.field[py][px]<1e9)adj=true;}if(!adj)continue;const d=Math.hypot(x-mx,y-my);if(d<bd){bd=d;sol={x,y};}}}
 for(const q of S.portals){q.sq=[];q.sqm=[];q.plan={norm:0,fast:0,tank:0,mini:0,elite:0,boss:0};}
 const tw=k=>{S.deck=[k];S.tsel=k;build(sol.x,sol.y);return S.list[S.list.length-1];};
 let T=null;if(esc==='jabali'||esc==='buitre'||esc==='murcielago'||esc==='ogrob'||esc==='golem'||esc==='transporte'||esc==='avispa'||esc==='escupidor'||esc==='gusano'||esc==='arpon')T=tw('bastion');if(esc==='amalgama'||esc==='garrapata'||esc==='inhibidor'||esc==='nexo'||esc==='fragata'||esc==='saltador')T=tw(esc==='saltador'?'cannon':'arrow');if(esc==='caza'||esc==='sobrecarga')T=tw('arrow');if(esc==='guardian'||esc==='gloton'||esc==='sacrificador'||esc==='alado'||esc==='guiverno')T=tw('arrow');if(esc==='bruja'||esc==='globo'||esc==='ogro'||esc==='portalero'||esc==='cuervo')T=tw('arrow');if(esc==='totem')T=tw('frost');
 if(['holo','arrojador','lanzadera'].includes(esc))T=tw('bastion');if(['reciclador','saboteador'].includes(esc))T=tw('arrow');if(esc==='feromonas'){T=tw('bastion');}if(esc==='saboteador'){const k=Object.keys(BF).find(k=>k.includes('+'));for(const[x,y]of T.cells)S.buff[y][x]=k;}
 const arr=()=>{startWave();for(const q of S.portals){q.q=[];q.qf=[];}S.hp=999;S.hero.s.hp=0;S.hero.s.rt=999;};if(esc==='cuervo'){S.portals[0].sqm=[{i03directo:7}];S.hp=999;}else arr();
 const keep=()=>{try{SEEN.en.bat=1;}catch(e){}spawnEnemy('bat',P0,null);const k=S.enemies[S.enemies.length-1];k.hp=k.max=1e9;k.fx.root={t:1e9,m:1e9};k.x=-50;k.y=-50;};if(esc!=='cuervo')keep();
 window.__sp=(t,n,gap,hp)=>{let i=0;const f=()=>{spawnEnemy(t,P0,null);const e=S.enemies[S.enemies.length-1];if(hp)e.hp=e.max=hp;if(window.__from){if(!window.__row){const isP=(x,y)=>inb(x,y)&&S.cells[y][x]===2,run=(a,b)=>{const r=[__from];for(const sg of[1,-1])for(let k=1;k<8;k++){const x=__from.x+a*k*sg,y=__from.y+b*k*sg;if(isP(x,y))r.push({x,y});else break;}return r;},h=run(1,0),v=run(0,1),row=(h.length<=v.length?h:v).sort((p,q)=>(p.x-q.x)||(p.y-q.y));const m=Math.floor(row.length/2);window.__row=[0,1,-1,2,-2].map(d=>row[m+d]).filter(Boolean);window.__ri=0;}const q=__row[(__ri++)%__row.length];e.x=e.tx=q.x;e.y=e.ty=q.y;e.pv=null;e.trail=[];e.fln=null;}if(++i<n)setTimeout(f,gap);};setTimeout(f,4500);};
 if(T&&!T.flag){try{autoFlag(T);}catch(e){}}const c=T?(T.flag||T):{x:(P0.x*2+S.core.x)/3,y:(P0.y*2+S.core.y)/3};CAM.z=Math.min(ZMAX,5.2);camCenter(esc==='corneta'?(P0.x+S.core.x)/2:c.x,esc==='corneta'?(P0.y+S.core.y)/2:c.y);if(esc==='corneta')CAM.z=3.6,camCenter((P0.x+S.core.x)/2,(P0.y+S.core.y)/2);
 if(esc==='corneta'){const fo=sqForm('qcharanga',SQUADS.qcharanga.m),sp=Math.min(...fo.map(o=>ET[o.t].sp));let i=0;const o0=fo.slice().sort((a,b)=>a.r-b.r);const f=()=>{const o=o0[i];spawnEnemy(o.t,P0,{r:o.r,l:o.l,sp,sid:'d1',lead:o.lead});const e=S.enemies[S.enemies.length-1];e.hp=e.max=9999;if(++i<o0.length)setTimeout(f,i<o0.length?Math.max(30,(o0[i].r-o.r)*1.15/sp*1000):0);};f();}
 if(esc==='jabali'){__sp('i43jabali',3,3200,400);}
 if(esc==='buitre'){__sp('i37buitre',2,2600,600);}
 if(esc==='limo'){__sp('i07divisor',2,3000,40);}
 if(esc==='cuervo'){setTimeout(()=>{arr();keep();[[0,0],[450,-1],[450,1],[900,-2],[900,2],[1350,-1],[1350,1]].forEach(([d,l])=>setTimeout(()=>{spawnEnemy('i03directo',P0,{r:0,l,sp:ET.i03directo.sp,sid:'cv'});const e=S.enemies[S.enemies.length-1];e.hp=e.max=400;},d));},9500);}
 if(esc==='gusano'){__sp('i02tunelador',4,1500,400);}
 if(esc==='amalgama'){__sp('i16amalgama',3,300,1200);setTimeout(()=>{for(const e of S.enemies)if(e.t==='i16amalgama'){e.fx.slow={t:6,m:.4};}},5200);}
 if(esc==='garrapata'){__sp('i21garrapata',3,800,60);__sp('norm',6,900,200);}
 if(esc==='arpon'){__sp('i39choque',2,3000,1500);__sp('norm',6,1200,500);}
 if(esc==='inhibidor'){__sp('i08inhibidor',1,1,2000);__sp('norm',10,700,150);}
 if(esc==='nexo'){__sp('i20nexo',1,1,2500);__sp('norm',6,500,300);}
 if(esc==='fragata'){__sp('i30fragata',2,3500,1500);}
 if(esc==='saltador'){__sp('i31saltador',4,1500,400);}
 if(esc==='sobrecarga'){setTimeout(()=>{const fo=sqForm('qmarea',SQUADS.qmarea.m),sp=Math.min(...fo.map(o=>ET[o.t].sp));for(const o of fo){spawnEnemy(o.t,P0,{r:o.r,l:o.l,sp,sid:'d9',lead:o.lead});const e=S.enemies[S.enemies.length-1];e.hp=e.max=o.t==='i19sobrecarga'?3000:200;}},3000);}
 if(esc==='avispa'){__sp('i38avispa',8,250,300);setInterval(()=>{for(const t of S.list)if(t.sd)for(const s of t.sd)if(s.hp>0&&s.hp<s.max*.4)s.hp=s.max;},500);}
 if(esc==='caza'){__sp('i45caza',6,700,400);}
 if(esc==='escupidor'){__sp('i42escupidor',2,2500,800);}
 if(esc==='guardian'){__sp('i05guardian',1,1,2500);setTimeout(()=>__sp('norm',8,500,60),300);}
 if(esc==='gloton'){__sp('i33gloton',1,1,900);setInterval(()=>{const o=S.enemies.find(e=>e.t==='i33gloton');if(o&&!(o.eat>0)&&o.hp>o.max*.3)o.hp-=o.max*.05;for(const t of S.list)t.jam=9;},400);setTimeout(()=>__sp('sling',6,450,200),300);}
 if(esc==='sacrificador'){__sp('i34sacrificador',1,1,1500);setTimeout(()=>__sp('minion',8,350,900),200);}
 if(esc==='holo'){__sp('norm',1,1,2500);setTimeout(()=>__sp('i24holo',1,1,1500),700);}
 if(esc==='arrojador'){__sp('i32arrojador',1,1,4000);setTimeout(()=>__sp('norm',8,450,250),900);}
 if(esc==='lanzadera'){__sp('i18lanzadera',1,1,5000);}
 if(esc==='reciclador'){__sp('i22reciclador',1,1,5000);__sp('norm',12,350,40);}
 if(esc==='feromonas'){__sp('i36feromonas',1,1,5000);setTimeout(()=>__sp('drone',24,420,20),1200);setTimeout(()=>{const o=S.enemies.find(e=>e.t==='i36feromonas');if(o)o.fx.root={t:12,m:12};},4200);}
 if(esc==='saboteador'){__sp('i46saboteador',2,4000,1500);__sp('norm',6,1500,300);}
 if(esc==='golem'){__sp('i44golem',2,6000,3000);}
 if(esc==='transporte'){__sp('i14transporte',1,1,2000);}
 if(esc==='alado'){__sp('i11alado',1,1,3000);setTimeout(()=>__sp('norm',8,500,90),200);}
 if(esc==='guiverno'){__sp('i10pesado',2,4000,2500);}
 if(esc==='bruja'){__sp('i40bruja',2,5500,2500);__sp('norm',10,900,300);}
 if(esc==='globo'){__sp('i04bombardero',2,5000,3000);__sp('norm',10,1000,300);}
 if(esc==='ogro'){__sp('i15provocador',1,1,4000);setTimeout(()=>__sp('norm',8,700,250),1200);}
 if(esc==='ogrob'){__sp('norm',3,500,250);setTimeout(()=>__sp('i15provocador',1,1,4000),900);setTimeout(()=>__sp('norm',7,700,250),2600);}
 if(esc==='murcielago'){__sp('i17murcielago',3,2500,900);}
 if(esc==='totem'){__sp('i41totem',1,1,900);setTimeout(()=>__sp('norm',9,800,400),300);}
 if(esc==='portalero'){__sp('i01portalero',1,1,5000);setTimeout(()=>{__sp('norm',9,650,500);__sp('bat',3,1500,500);},600);}
 try{CAMA.on=false;CAMA.tw=null;}catch(e){}
 const up=(p0,n)=>{let q=pathNear(p0.x,p0.y)||p0;for(let i=0;i<n;i++){let b=null;for(const[a,b2]of[[1,0],[-1,0],[0,1],[0,-1]]){const x=q.x+a,y=q.y+b2;if(inb(x,y)&&S.cells[y][x]===2&&S.field[y][x]<1e9&&S.field[y][x]>S.field[q.y][q.x]&&(!b||S.field[y][x]>S.field[b.y][b.x]))b={x,y};}if(!b)break;q=b;}return q;};
 let cc=(esc==='corneta'||esc==='sobrecarga')?{x:(P0.x+S.core.x)/2,y:(P0.y+S.core.y)/2}:up(c,esc==='limo'?0:({bruja:0,globo:0,ogro:2,portalero:0,totem:10})[esc]??3);CAM.z=(esc==='corneta'||esc==='sobrecarga')?ZMAX*.8:esc==='limo'?17:({bruja:7.5,globo:8.5,ogro:7.5,ogrob:9,guardian:7,gloton:7.5,sacrificador:7.5,golem:6.5,transporte:5,alado:7.5,guiverno:7,gusano:8,holo:7,arrojador:6.5,lanzadera:6,reciclador:7,feromonas:7,saboteador:6.5,amalgama:8,garrapata:7,arpon:8,inhibidor:7,nexo:7.5,fragata:7,saltador:6,avispa:8,caza:6,escupidor:8.5,sobrecarga:4.5,murcielago:10,totem:8,portalero:5.6,cuervo:2.2})[esc]||9;const down=(p0,n)=>{let q=pathNear(p0.x,p0.y)||p0;const tr=[q];for(let i=0;i<n;i++){let b=null;for(const[a,b2]of[[1,0],[-1,0],[0,1],[0,-1]]){const x=q.x+a,y=q.y+b2;if(inb(x,y)&&S.cells[y][x]===2&&S.field[y][x]<S.field[q.y][q.x]&&(!b||S.field[y][x]<S.field[b.y][b.x]))b={x,y};}if(!b)break;q=b;tr.push(q);}return tr;};
 if(esc==='cuervo'){const e0=crowEntry();cc={x:(e0.x+S.core.x)/2,y:(e0.y+S.core.y)/2};}
 if(esc==='limo'){const tr=down(P0,400),m=Math.floor(tr.length/2);cc=tr[m];window.__from=tr[Math.max(0,m-11)];}else if(esc!=='corneta'&&esc!=='cuervo'&&esc!=='sobrecarga')window.__from=up(cc,({portalero:26,totem:26,guardian:12,gusano:14,holo:12,arrojador:14,lanzadera:16,reciclador:12,feromonas:12,saboteador:14,amalgama:10,garrapata:14,arpon:12,inhibidor:12,nexo:12,fragata:14,saltador:16,avispa:12,caza:20,escupidor:12,gloton:12,sacrificador:12,golem:9,alado:12,guiverno:16})[esc]||22);camCenter(cc.x,cc.y);if(esc!=='corneta'&&esc!=='sobrecarga'){const w=VIEW/sc(),h=VH/sc();CAM.x=cc.x*CS+CS/2-w/2;CAM.y=cc.y*CS+CS/2-h/2;}
 if(esc==='limo'){const f0=S.field[Math.round(cc.y)][Math.round(cc.x)];setInterval(()=>{for(const e of S.enemies)if(e.t==='i07divisor'&&e.hp>0&&S.field[e.ty][e.tx]<=f0+1)hurt(e,1e5,null,'phys');},50);}
 window.__cam=[CAM.z,CAM.x,CAM.y];S.speed=1;S.paused=false;},esc);
await p.evaluate(()=>{setInterval(()=>{try{CAMA.on=false;CAM.z=__cam[0];CAM.x=__cam[1];CAM.y=__cam[2];}catch(e){}for(const e of document.querySelectorAll('div'))if(e.offsetWidth<420&&e.offsetWidth>150&&/NUEVO ENEMIGO/i.test(e.textContent))e.style.visibility='hidden';},30);});
await p.evaluate(()=>{document.querySelectorAll('.toast,.bossw').forEach(e=>e.remove());});
if(out.endsWith('.png')){await p.waitForTimeout(secs*1000);await p.screenshot({path:out});}
else{await p.waitForTimeout(secs*1000);await ctx.close();const v=await p.video().path();fs.renameSync(v,out);}
await b.close();})();
