// Graba una escena de demostración de un enemigo nuevo (para la Mesa): SEMILLA=7 node tools/taller/grabar_escena.js <escena> salida.webm segundos
// Escenas: corneta, jabali, buitre, limo, bruja, globo, ogro, murcielago, totem, portalero. Después se recorta el arranque (~5-12 s) y se pasa a mp4 con ffmpeg.
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
  i40bruja:{n:'Bruja goblin',era:1,fac:'Pieles verdes',fam:'Místicos',tipo:'aire',rg:'A distancia',col:'#5a3a7a',st:{am:30,ap:0,dmg:1,gold:7,hp:50,sp:1,ud:4}},
  i04bombardero:{n:'Globo trasgo',era:1,fac:'Pieles verdes',fam:'A distancia',tipo:'aire',rg:'No ataca',col:'#8a3a3a',st:{am:10,ap:0,dmg:1,gold:7,hp:90,sp:.7,ud:0}},
  i15provocador:{n:'Ogro retador',era:1,fac:'Pieles verdes',fam:'Tanques',tipo:'tierra',rg:'Cuerpo a cuerpo',col:'#a07a5a',st:{am:10,ap:40,dmg:2,gold:10,hp:200,sp:.7,ud:8}},
  i17murcielago:{n:'Murciélago de fuego',era:1,fac:'Demonios',fam:'A distancia',tipo:'aire',rg:'A distancia',col:'#c0502a',st:{am:10,ap:0,dmg:1,gold:5,hp:40,sp:1.3,ud:6}},
  i41totem:{n:'Portatótem goblin',era:1,fac:'Pieles verdes',fam:'Apoyo',tipo:'tierra',rg:'No ataca',col:'#8a5a2a',st:{am:10,ap:5,dmg:1,gold:6,hp:60,sp:.75,ud:2}},
  i01portalero:{n:'Portalero',era:1,fac:'Demonios',fam:'Místicos',tipo:'tierra',rg:'No ataca',col:'#7a3ab8',st:{am:20,ap:10,dmg:1,gold:10,hp:200,sp:.8,ud:0}},
  i43jabali:{n:'Jabalí de guerra',era:1,fac:'Pieles verdes',fam:'Rápidos',tipo:'tierra',rg:'Cuerpo a cuerpo',col:'#7a5a3a',st:{am:0,ap:10,dmg:1,gold:6,hp:60,sp:1.6,ud:6}}},
  sq:{qcharanga:{custom:true,era:1,pz:1,min:1,n:'Charanga orca',lead:'i06potenciador',m:{i06potenciador:1,norm:4},f:[[['norm',0,-1],['norm',0,1],['i06potenciador',1.5,0],['norm',3,-1],['norm',3,1]]]}}});
 startGame(15);chooseHero('reinhart');for(let i=0;i<8&&DLG.on;i++)dlgEnd();S.chests={};S.evts={};RL.open=false;HQ.q=[];
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
 RL.open=false;try{lbClose(true);}catch(e){}S.phase='build';const P0=S.portals[0];S.gold=99999;S.field=S.field||field();
 let sol=null,bd=1e9;{const mx=(P0.x+S.core.x)/2,my=(P0.y+S.core.y)/2;for(let ky=0;ky<NC;ky++)for(let kx=0;kx<NC;kx++)if(S.cc[ky][kx]===1){const x=kx*K+KC,y=ky*K+KC;let adj=false;for(const[dx,dy]of[[K,0],[-K,0],[0,K],[0,-K]]){const px=x+dx,py=y+dy;if(inb(px,py)&&S.cells[py][px]===2&&S.field[py][px]<1e9)adj=true;}if(!adj)continue;const d=Math.hypot(x-mx,y-my);if(d<bd){bd=d;sol={x,y};}}}
 for(const q of S.portals){q.sq=[];q.sqm=[];q.plan={norm:0,fast:0,tank:0,mini:0,elite:0,boss:0};}
 const tw=k=>{S.deck=[k];S.tsel=k;build(sol.x,sol.y);return S.list[S.list.length-1];};
 let T=null;if(esc==='jabali'||esc==='buitre'||esc==='murcielago')T=tw('bastion');if(esc==='bruja'||esc==='globo'||esc==='ogro'||esc==='portalero'||esc==='totem')T=tw('arrow');
 startWave();for(const q of S.portals){q.q=[];q.qf=[];}S.hp=999;S.hero.s.hp=0;S.hero.s.rt=999;
 const keep=()=>{try{SEEN.en.bat=1;}catch(e){}spawnEnemy('bat',P0,null);const k=S.enemies[S.enemies.length-1];k.hp=k.max=1e9;k.fx.root={t:1e9,m:1e9};k.x=-50;k.y=-50;};keep();
 window.__sp=(t,n,gap,hp)=>{let i=0;const f=()=>{spawnEnemy(t,P0,null);const e=S.enemies[S.enemies.length-1];if(hp)e.hp=e.max=hp;if(window.__from){if(!window.__row){const isP=(x,y)=>inb(x,y)&&S.cells[y][x]===2,run=(a,b)=>{const r=[__from];for(const sg of[1,-1])for(let k=1;k<8;k++){const x=__from.x+a*k*sg,y=__from.y+b*k*sg;if(isP(x,y))r.push({x,y});else break;}return r;},h=run(1,0),v=run(0,1),row=(h.length<=v.length?h:v).sort((p,q)=>(p.x-q.x)||(p.y-q.y));const m=Math.floor(row.length/2);window.__row=[0,1,-1,2,-2].map(d=>row[m+d]).filter(Boolean);window.__ri=0;}const q=__row[(__ri++)%__row.length];e.x=e.tx=q.x;e.y=e.ty=q.y;e.pv=null;e.trail=[];e.fln=null;}if(++i<n)setTimeout(f,gap);};setTimeout(f,4500);};
 if(T&&!T.flag){try{autoFlag(T);}catch(e){}}const c=T?(T.flag||T):{x:(P0.x*2+S.core.x)/3,y:(P0.y*2+S.core.y)/3};CAM.z=Math.min(ZMAX,5.2);camCenter(esc==='corneta'?(P0.x+S.core.x)/2:c.x,esc==='corneta'?(P0.y+S.core.y)/2:c.y);if(esc==='corneta')CAM.z=3.6,camCenter((P0.x+S.core.x)/2,(P0.y+S.core.y)/2);
 if(esc==='corneta'){const fo=sqForm('qcharanga',SQUADS.qcharanga.m),sp=Math.min(...fo.map(o=>ET[o.t].sp));let i=0;const o0=fo.slice().sort((a,b)=>a.r-b.r);const f=()=>{const o=o0[i];spawnEnemy(o.t,P0,{r:o.r,l:o.l,sp,sid:'d1',lead:o.lead});const e=S.enemies[S.enemies.length-1];e.hp=e.max=9999;if(++i<o0.length)setTimeout(f,i<o0.length?Math.max(30,(o0[i].r-o.r)*1.15/sp*1000):0);};f();}
 if(esc==='jabali'){__sp('i43jabali',3,3200,400);}
 if(esc==='buitre'){__sp('i37buitre',2,2600,600);}
 if(esc==='limo'){__sp('i07divisor',2,3000,40);}
 if(esc==='bruja'){__sp('i40bruja',2,5500,2500);__sp('norm',10,900,300);}
 if(esc==='globo'){__sp('i04bombardero',2,5000,3000);__sp('norm',10,1000,300);}
 if(esc==='ogro'){__sp('i15provocador',1,1,4000);setTimeout(()=>__sp('norm',8,700,250),1200);}
 if(esc==='murcielago'){__sp('i17murcielago',3,2500,900);}
 if(esc==='totem'){__sp('i41totem',1,1,900);setTimeout(()=>__sp('norm',9,800,400),300);}
 if(esc==='portalero'){__sp('i01portalero',1,1,5000);setTimeout(()=>{__sp('norm',9,650,500);__sp('bat',3,1500,500);},600);}
 try{CAMA.on=false;CAMA.tw=null;}catch(e){}
 const up=(p0,n)=>{let q=pathNear(p0.x,p0.y)||p0;for(let i=0;i<n;i++){let b=null;for(const[a,b2]of[[1,0],[-1,0],[0,1],[0,-1]]){const x=q.x+a,y=q.y+b2;if(inb(x,y)&&S.cells[y][x]===2&&S.field[y][x]<1e9&&S.field[y][x]>S.field[q.y][q.x]&&(!b||S.field[y][x]>S.field[b.y][b.x]))b={x,y};}if(!b)break;q=b;}return q;};
 let cc=esc==='corneta'?{x:(P0.x+S.core.x)/2,y:(P0.y+S.core.y)/2}:up(c,esc==='limo'?0:({bruja:0,globo:0,ogro:2,portalero:0,totem:10})[esc]??3);CAM.z=esc==='corneta'?ZMAX*.8:esc==='limo'?17:({bruja:7.5,globo:8.5,ogro:7.5,murcielago:10,totem:8,portalero:5.6})[esc]||9;const down=(p0,n)=>{let q=pathNear(p0.x,p0.y)||p0;const tr=[q];for(let i=0;i<n;i++){let b=null;for(const[a,b2]of[[1,0],[-1,0],[0,1],[0,-1]]){const x=q.x+a,y=q.y+b2;if(inb(x,y)&&S.cells[y][x]===2&&S.field[y][x]<S.field[q.y][q.x]&&(!b||S.field[y][x]<S.field[b.y][b.x]))b={x,y};}if(!b)break;q=b;tr.push(q);}return tr;};
 if(esc==='limo'){const tr=down(P0,400),m=Math.floor(tr.length/2);cc=tr[m];window.__from=tr[Math.max(0,m-11)];}else if(esc!=='corneta')window.__from=up(cc,({portalero:26,totem:26})[esc]||22);camCenter(cc.x,cc.y);if(esc!=='corneta'){const w=VIEW/sc(),h=VH/sc();CAM.x=cc.x*CS+CS/2-w/2;CAM.y=cc.y*CS+CS/2-h/2;}
 if(esc==='limo'){const f0=S.field[Math.round(cc.y)][Math.round(cc.x)];setInterval(()=>{for(const e of S.enemies)if(e.t==='i07divisor'&&e.hp>0&&S.field[e.ty][e.tx]<=f0+1)hurt(e,1e5,null,'phys');},50);}
 window.__cam=[CAM.z,CAM.x,CAM.y];S.speed=1;S.paused=false;},esc);
await p.evaluate(()=>{setInterval(()=>{try{CAMA.on=false;CAM.z=__cam[0];CAM.x=__cam[1];CAM.y=__cam[2];}catch(e){}for(const e of document.querySelectorAll('div'))if(e.offsetWidth<420&&e.offsetWidth>150&&/NUEVO ENEMIGO/i.test(e.textContent))e.style.visibility='hidden';},30);});
await p.evaluate(()=>{document.querySelectorAll('.toast,.bossw').forEach(e=>e.remove());});
if(out.endsWith('.png')){await p.waitForTimeout(secs*1000);await p.screenshot({path:out});}
else{await p.waitForTimeout(secs*1000);await ctx.close();const v=await p.video().path();fs.renameSync(v,out);}
await b.close();})();
