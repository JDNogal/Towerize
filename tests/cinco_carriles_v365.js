// v365 · El camino tiene 5 carriles: casillas de 5×5, portal en el borde, carriles -2…2, tamaños por ficha, encuadre sin encoger y guardados viejos fuera
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(async()=>{const out={};{const i=document.getElementById('intro');if(i)i.style.display='none';}INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;
 out.k=K===5&&KC===2&&K3===3&&N===NC*5;
 // tamaños: el radio sale del tamaño en carriles de la ficha (diámetro dibujado = tamaño)
 out.tam=Math.abs(ET.norm.r*2*EVS-1.2)<1e-6&&Math.abs(ET.sling.r*2*EVS-.9)<1e-6&&tamOf('norm')===1.2;
 // los que no tienen ficha cambiada no crecen con la casilla: mismo radio que con 3 carriles (tabla × 1,8)
 out.radio=ET.tank.r>0&&ET.tank.r<1.2&&ET.boss.r<2;
 out.fmt=SAVE_FMT===2;
 startGame(15);chooseHero('reinhart');if(DLG.on)dlgEnd();S.chests={};S.evts={};RL.open=false;HQ.q=[];
 // el núcleo está en el centro de su casilla
 out.core=S.core.x%K===KC&&S.core.y%K===KC;
 // el héroe empieza en el borde de la casilla del núcleo, del lado por el que sale el camino
 {const h=S.hero.s,dx=h.x-S.core.x,dy=h.y-S.core.y;out.hero=Math.hypot(dx,dy)===KC&&S.cells[S.core.y+Math.sign(dy)*(KC+1)][S.core.x+Math.sign(dx)*(KC+1)]===2;}
 out.contacto=SCONTR>=KC&&SCONTACT<SCONTR;
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
 RL.open=false;S.phase='build';
 // el portal queda en el borde de su casilla, en el carril central
 const P0=S.portals[0];out.portal=!!P0&&S.portals.every(q=>{const ox=q.x%K,oy=q.y%K;return q.dir[0]!==0?(ox===(q.dir[0]>0?K-1:0)&&oy===KC):(oy===(q.dir[1]>0?K-1:0)&&ox===KC);});
 out.pcell=S.portals.every(q=>S.cells[q.y][q.x]===2);
 // el encuadre automático no encoge el mapa por debajo de la escala de 3 carriles
 camFit(true);out.cam=CAM.z>=K/K3-1e-6;
 // carriles: los sueltos se reparten por los 5; setLane admite de -2 a 2
 for(const q of S.portals){q.sq=[];q.sqm=[];q.plan={norm:0,fast:0,tank:0,mini:0,elite:0,boss:0};}
 startWave();for(const q of S.portals){q.q=[];q.qf=[];}
 for(let i=0;i<10;i++)spawnEnemy('norm',P0,null);
 const lanes=new Set(),seen=new Set();let off=0,stop=0;
 for(let i=0;i<60;i++){update(.05);for(const e of S.enemies){if(e.fln!=null)lanes.add(e.fln);if(S.cells[Math.round(e.y)]&&S.cells[Math.round(e.y)][Math.round(e.x)]!==2)off++;}}
 out.lanes=[...lanes].sort((a,b)=>a-b).join(',')==='-2,-1,0,1,2';out.onPath=off===0;
 const e0=S.enemies[0];setLane(e0,9);const hi=e0.fln;setLane(e0,-9);out.clamp=hi===2&&e0.fln===-2;
 // sin torres, los enemigos llegan al núcleo por el camino de 5 carriles
 const hp0=S.hp;for(let i=0;i<4000&&S.enemies.length&&S.phase==='wave'&&S.hp===hp0;i++)update(.05);out.leak=S.hp<hp0&&S.phase==='wave';
 // una torre de unidades para a los que van por los carriles de fuera
 S.gold=9999;let sol=null,bd=1e9;for(let ky=0;ky<NC;ky++)for(let kx=0;kx<NC;kx++)if(S.cc[ky][kx]===1){const x=kx*K+KC,y=ky*K+KC,d=Math.hypot(x-P0.x,y-P0.y);if(!S.occ[x+','+y]){const dd=d>2*K?d:d+1e3;/* mejor a más de 2 casillas del portal; si no hay, el que haya */if(dd<bd){bd=dd;sol={x,y};}}}
 S.deck=['bastion'];S.tsel='bastion';build(sol.x,sol.y);out.built=S.list.length===1;
 for(let i=0;i<6;i++){spawnEnemy('norm',P0,null);setLane(S.enemies[S.enemies.length-1],i%2?2:-2);}
 for(let i=0;i<900&&S.enemies.length;i++){update(.05);for(const e of S.enemies)if(e.stopped&&Math.abs(e.fln)===2)stop++;}
 out.block=stop>0;
 // la bandera de una torre de unidades no se queda en el carril de fuera
 {const t=S.list[0],fd=S.enemies[0]&&S.enemies[0].fd;const ox=t.flag.x-Math.floor(t.flag.x/K)*K-KC,oy=t.flag.y-Math.floor(t.flag.y/K)*K-KC;out.flag=Math.min(Math.abs(ox),Math.abs(oy))<=1;}
 return out;});
const bad=Object.keys(r).filter(k=>r[k]!==true);console.log(JSON.stringify(r));console.log(bad.length?'FALLA: '+bad.join(', '):'cinco_carriles ok');console.log(errs.length?'ERRS '+JSON.stringify(errs.slice(0,5)):'ERRS []');await b.close();process.exit(bad.length||errs.length?1:0);})();
