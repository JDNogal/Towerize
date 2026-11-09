// ==================== COSMÉTICOS DE VETERANO (v281) ====================
// Camino (Tierra / Empedrado), marco de torre (Ninguno / Latón / Obsidiana), efectos (Corona de la torre maestra)
// y la nave estrellada detrás del núcleo, que se repara con ÉTER (STO.p).
COSM.path=[{id:'dirt',n:'Tierra',def:1},{id:'cob',n:'Empedrado',ach:'onepath'}];
COSM.tfr=[{id:'none',n:'Sin marco',def:1},{id:'brass',n:'Latón',ach:'austere'},{id:'obs',n:'Obsidiana',ach:'nonet'}];
COSM.fx=[{id:'crown',n:'Corona de la torre maestra',ach:'master'}];
Object.assign(CSKIND,{path:['🧱','Camino','Caminos'],tfr:['⚙️','Marco de torre','Marcos de torre'],fx:['👑','Efecto','Efectos']});
Object.assign(NUKL,{path:'Caminos',tfr:'Marcos de torre',fx:'Efectos en partida'});
const cosSel=(k,def)=>{const id=OPT['cs_'+k]||def,c=COSM[k].find(x=>x.id===id);return c&&cosOwn(c)?id:def;};
const pathSkin=()=>cosSel('path','dirt'),tfrSkin=()=>cosSel('tfr','none');
const fxOn=id=>{const c=COSM.fx.find(d=>d.id===id);return !!c&&cosOwn(c)&&!(OPT.fxoff||{})[id];};

// ---- camino empedrado: adoquines regulares con bordillo donde el camino toca hierba ----
let COBC=null;
function cobTile(){if(COBC)return COBC;const s=64,c=document.createElement('canvas');c.width=c.height=s;const g=c.getContext('2d');
 g.fillStyle='#8f8a80';g.fillRect(0,0,s,s);const col=['#b3aca0','#a39c90','#bdb6aa'];
 for(let r=0;r<3;r++)for(let i=-1;i<3;i++){const w=s/2.6,h=s/3,x=i*w+(r%2)*w/2,y=r*h;g.fillStyle=col[(i+r+3)%3];
  g.beginPath();if(g.roundRect)g.roundRect(x+2,y+2,w-4,h-4,5);else g.rect(x+2,y+2,w-4,h-4);g.fill();g.strokeStyle='#6e695f';g.lineWidth=1.5;g.stroke();}
 COBC=c;return c;}
function drawCob(g,gx,gy,B){const X=gx*B,Y=gy*B;try{g.drawImage(cobTile(),X,Y,B,B);}catch(e){g.fillStyle='#a39c90';g.fillRect(X,Y,B,B);}
 const pa=(x,y)=>S.cc[y]&&S.cc[y][x]===2,e=B*.09;g.fillStyle='#6e695f';
 if(!pa(gx,gy-1))g.fillRect(X,Y,B,e);if(!pa(gx,gy+1))g.fillRect(X,Y+B-e,B,e);if(!pa(gx-1,gy))g.fillRect(X,Y,e,B);if(!pa(gx+1,gy))g.fillRect(X+B-e,Y,e,B);}

// ---- marcos de torre (se dibujan debajo del círculo) ----
function drawTFr(g,t,X,Y,B,sk){
 if(sk==='brass'){const up=t.upT&&performance.now()-t.upT<700?1-(performance.now()-t.upT)/700:0;
  g.fillStyle='#b5862f';g.beginPath();for(let k=0;k<16;k++){const a=k/16*Math.PI*2,r=B*(k%2?.47:.53);g.lineTo(X+Math.cos(a)*r,Y+Math.sin(a)*r);}g.closePath();g.fill();
  g.strokeStyle=up?`rgba(255,241,184,${.5+.5*up})`:'#6a4a10';g.lineWidth=B*(up?.05:.03);g.stroke();
  g.fillStyle='#f0d27a';for(let k=0;k<4;k++){const a=k*Math.PI/2+Math.PI/4;g.beginPath();g.arc(X+Math.cos(a)*B*.465,Y+Math.sin(a)*B*.465,B*.025,0,7);g.fill();}}
 else if(sk==='obs'){const l=t.lvl>=4?1:.3+.25*(Math.sin(performance.now()/900+t.id)+1)/2;
  g.fillStyle='#15121c';g.beginPath();for(let k=0;k<12;k++){const a=k/12*Math.PI*2,r=B*(k%2?.45:.56);g.lineTo(X+Math.cos(a)*r,Y+Math.sin(a)*r);}g.closePath();g.fill();
  g.save();g.shadowColor='#a84aff';g.shadowBlur=B*(l>.9?.25:.06);g.strokeStyle=`rgba(190,120,255,${l})`;g.lineWidth=B*.035;
  for(let k=0;k<6;k++){const a=k/6*Math.PI*2+.26;g.beginPath();g.moveTo(X+Math.cos(a)*B*.4,Y+Math.sin(a)*B*.4);g.lineTo(X+Math.cos(a+.1)*B*.5,Y+Math.sin(a+.1)*B*.5);g.stroke();}g.restore();}}

// ---- corona y halo de la torre maestra: la que más daño lleva en la partida (cambia de dueña en directo) ----
function masterTw(){if(!S||!S.list)return null;let b=null;for(const t of S.list){if(t.hero||t.summ||!(t.dmgT>0))continue;if(!b||t.dmgT>b.dmgT)b=t;}return b;}
function drawHalo(g,X,Y,B){const gr=g.createRadialGradient(X,Y,B*.3,X,Y,B*1.05);gr.addColorStop(0,'rgba(255,216,74,0)');gr.addColorStop(.55,'rgba(255,216,74,.38)');gr.addColorStop(1,'rgba(255,216,74,0)');g.fillStyle=gr;g.beginPath();g.arc(X,Y,B*1.05,0,7);g.fill();}
function drawCrown(g,X,Y,B){const s=B/56,y=Y-B*.62+Math.sin(performance.now()/500)*B*.02;g.save();g.translate(X,y);g.scale(s,s);
 g.fillStyle='#ffd84a';g.strokeStyle='#5a3a08';g.lineWidth=2.5;g.beginPath();g.moveTo(-14,8);g.lineTo(-14,-4);g.lineTo(-7,2);g.lineTo(0,-8);g.lineTo(7,2);g.lineTo(14,-4);g.lineTo(14,8);g.closePath();g.fill();g.stroke();
 for(const dx of[-8,0,8]){g.fillStyle='#e8344a';g.beginPath();g.arc(dx,4,2.2,0,7);g.fill();}g.restore();}

// ---- nave estrellada detrás del núcleo (Mezcla 2: clavada de morro). 0 piezas: clavada y con humo; 1-2: andamio y grúa; 3: reparada y flotando ----
function shipSaucer(c,lights){c.fillStyle='#9aa4ae';c.strokeStyle='#2a3038';c.lineWidth=3;c.beginPath();c.moveTo(-50,8);c.quadraticCurveTo(0,-26,50,8);c.lineTo(30,18);c.lineTo(-30,18);c.closePath();c.fill();c.stroke();
 c.fillStyle=lights?'#3fe8ff':'#4a6a78';c.beginPath();c.ellipse(0,-2,14,8,0,0,7);c.fill();c.stroke();
 c.fillStyle='#7a848e';c.beginPath();c.moveTo(-50,8);c.lineTo(-64,24);c.lineTo(-34,18);c.closePath();c.fill();c.stroke();c.beginPath();c.moveTo(50,8);c.lineTo(64,24);c.lineTo(34,18);c.closePath();c.fill();c.stroke();
 if(lights){c.fillStyle='rgba(63,232,255,.85)';c.beginPath();c.ellipse(-20,22,6,3,0,0,7);c.ellipse(20,22,6,3,0,0,7);c.fill();}
 else{c.strokeStyle='#1a1d22';c.lineWidth=2;c.beginPath();c.moveTo(-22,0);c.lineTo(-12,10);c.lineTo(-18,16);c.moveTo(18,-4);c.lineTo(24,8);c.stroke();}}
// lado del núcleo sin camino (prefiere arriba): así la nave no tapa el camino por el que llegan los enemigos
function shipSide(){const c=S&&S.core;if(!c||!S.cc)return[0,-1];const gx=Math.floor(c.x/K),gy=Math.floor(c.y/K),pa=(x,y)=>S.cc[y]&&S.cc[y][x]===2;
 for(const d of[[0,-1],[-1,0],[1,0],[0,1]])if(!pa(gx+d[0],gy+d[1])&&!pa(gx+d[0]*2,gy+d[1]*2))return d;return[0,-1];}
// ---- nave de la era 2: ya reparada, mejora con las cajas negras (STO.bb 0-3) ----
// 1: patas y antena parabólica emitiendo · 2: alas con luces y anillo de salto del suelo encendido por delante · 3: cohetes y anillo completo (despega un poco)
function drawShipE2(g,cx,cy,B){const bb=Math.min(3,(typeof STO!=='undefined'&&STO.bb)||0),s=B/52,t=performance.now()/1000,sd=shipSide(),x=sd[0]*84,y=sd[1]===1?96:sd[1]*80-(sd[0]?14:0),gy=y+34;
 g.save();g.translate(cx,cy);g.scale(s,s);
 // anillo de salto en el suelo (dos anillos concéntricos)
 const R=[[74,17],[88,21]];for(const[rx,ry]of R){g.strokeStyle='rgba(63,232,255,.16)';g.lineWidth=5;g.beginPath();g.ellipse(x,gy,rx,ry,0,0,7);g.stroke();}
 if(bb>=2){const full=bb>=3,pul=.75+.25*Math.sin(t*3);g.strokeStyle=`rgba(63,232,255,${pul})`;g.lineWidth=4;for(const[rx,ry]of R){g.beginPath();g.ellipse(x,gy,rx,ry,0,0,full?7:Math.PI);g.stroke();}
  g.strokeStyle=`rgba(63,232,255,${.25*pul})`;g.lineWidth=10;for(const[rx,ry]of R){g.beginPath();g.ellipse(x,gy,rx,ry,0,0,full?7:Math.PI);g.stroke();}
  // chispa que recorre el anillo
  const a=(t*1.2)%(full?Math.PI*2:Math.PI);g.fillStyle='#e8ffff';g.beginPath();g.arc(x+Math.cos(a)*88,gy+Math.sin(a)*21,3,0,7);g.fill();}
 // plataforma
 g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(x,gy,58,12,0,0,7);g.fill();g.strokeStyle='rgba(63,232,255,.5)';g.lineWidth=2;g.beginPath();g.ellipse(x,gy,50,9,0,0,7);g.stroke();
 const fl=bb>=3?-8+Math.sin(t*1.6)*2:0;g.save();g.translate(x,y+fl);
 if(bb>=2){g.fillStyle='#6a7480';g.strokeStyle='#2a3038';g.lineWidth=2.5;for(const sg of[-1,1]){g.beginPath();g.moveTo(sg*44,4);g.lineTo(sg*78,-4);g.lineTo(sg*80,6);g.lineTo(sg*44,14);g.closePath();g.fill();g.stroke();g.fillStyle=Math.sin(t*4+sg)>0?'#ff4fd8':'#7a2a6a';g.fillRect(sg*76-2,-2,4,4);g.fillStyle='#6a7480';}}
 shipSaucer(g,true);
 if(bb===1||bb===2){g.strokeStyle='#4a5260';g.lineWidth=3;for(const sg of[-1,1]){g.beginPath();g.moveTo(sg*26,18);g.lineTo(sg*36,34);g.stroke();g.fillStyle='#4a5260';g.fillRect(sg*36-6,33,12,3);}}
 if(bb>=3){for(const sg of[-1,1]){g.fillStyle='#5a6470';g.fillRect(sg*38-7,10,14,10);const f=14+Math.sin(t*20+sg)*3;g.fillStyle='rgba(255,140,60,.9)';g.beginPath();g.moveTo(sg*38-6,20);g.lineTo(sg*38,20+f);g.lineTo(sg*38+6,20);g.closePath();g.fill();g.fillStyle='rgba(255,230,150,.9)';g.beginPath();g.moveTo(sg*38-3,20);g.lineTo(sg*38,20+f*.55);g.lineTo(sg*38+3,20);g.closePath();g.fill();}}
 if(bb>=1){g.strokeStyle='#2a3038';g.lineWidth=2;g.beginPath();g.moveTo(-20,-6);g.lineTo(-24,-13);g.stroke();g.fillStyle='#b8c0ca';g.beginPath();g.ellipse(-24,-15,9,5,-.5,0,7);g.fill();g.stroke();g.fillStyle='#ff4fd8';g.beginPath();g.arc(-27,-19,2,0,7);g.fill();
  for(let i=0;i<3;i++){const k=(t*.9+i/3)%1;g.strokeStyle=`rgba(255,79,216,${.8*(1-k)})`;g.lineWidth=1.6;g.beginPath();g.arc(-27,-19,4+k*16,-2.6,-1.2);g.stroke();}}
 g.restore();g.restore();}
function drawShip(g,cx,cy,B,st){if(st==null)st=(STO.p||0)>=3?2:(STO.p||0)>=1?1:0;const s=B/52,t=performance.now()/1000,sd=shipSide(),x=sd[0]*84,y=sd[1]===1?96:sd[1]*80-(sd[0]?14:0);
 g.save();g.translate(cx,cy);g.scale(s,s);
 // cráter (más pequeño cuanto más reparada)
 if(S&&S.era===2){/* era 2: la nave ya está reparada, posada sobre una plataforma (sin cráter) */g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(x,y+32,46,10,0,0,7);g.fill();g.strokeStyle='rgba(63,232,255,.5)';g.lineWidth=2;g.beginPath();g.ellipse(x,y+32,40,8,0,0,7);g.stroke();}
 else{const w=st===2?40:62;g.fillStyle='#1f2e1a';g.beginPath();g.ellipse(x,y+32,w,w*.3,0,0,7);g.fill();g.fillStyle='#3a2a1a';g.beginPath();g.ellipse(x,y+32,w*.82,w*.22,0,0,7);g.fill();}
 const ang=[1.45,.75,0][st],dep=[30,14,0][st],fl=st===2?Math.sin(t*1.6)*3-6:0;
 g.save();if(st<2){g.beginPath();g.rect(-200,-400,400,400+y+34);g.clip();}g.translate(x,y+dep+fl);g.rotate(-ang);shipSaucer(g,st===2);g.restore();
 if(st===0){for(let i=0;i<4;i++){const k=(t*.4+i/4)%1;g.fillStyle=`rgba(90,90,90,${.5*(1-k)})`;g.beginPath();g.arc(x-10+k*24,y-30-k*60,7+k*14,0,7);g.fill();}
  g.fillStyle='#ffd84a';g.font='18px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('⚠',x+60,y-20);
  for(const dx of[-40,-24,30,44]){g.fillStyle='#6b5a44';g.beginPath();g.arc(x+dx,y+30+(dx%3),5,0,7);g.fill();}}
 if(st===1){g.strokeStyle='#8a6a3a';g.lineWidth=3;for(const dx of[-56,56]){g.beginPath();g.moveTo(x+dx,y+26);g.lineTo(x+dx,y-50);g.stroke();}
  g.beginPath();g.moveTo(x-56,y-20);g.lineTo(x+56,y-20);g.moveTo(x-56,y+6);g.lineTo(x+56,y+6);g.stroke();g.lineWidth=2;g.beginPath();g.moveTo(x-56,y+6);g.lineTo(x-20,y-20);g.moveTo(x+56,y+6);g.lineTo(x+20,y-20);g.stroke();
  g.strokeStyle='#c9a24a';g.beginPath();g.moveTo(x+56,y-50);g.lineTo(x+20,y-10);g.stroke();}
 if(st===2){g.strokeStyle=`rgba(63,232,255,${.4+.2*Math.sin(t*3)})`;g.lineWidth=2;g.setLineDash([4,4]);g.lineDashOffset=-t*12;g.beginPath();g.moveTo(x,y+20+fl);g.lineTo(x*.25,-14+(y>0?28:0));g.stroke();g.setLineDash([]);}
 g.restore();}

// ---- previsualizaciones en Opciones › Personalización ----
function cosmPrev(cv,k,id){const g=cv.getContext('2d'),W=cv.width;g.clearRect(0,0,W,W);g.fillStyle='#2b3d29';g.fillRect(0,0,W,W);
 if(k==='path'){if(id==='cob'){const B=W/3;try{g.drawImage(cobTile(),0,B,W/2,B);g.drawImage(cobTile(),W/2,B,W/2,B);}catch(e){}g.fillStyle='#6e695f';g.fillRect(0,B,W,B*.12);g.fillRect(0,2*B-B*.12,W,B*.12);}else{g.fillStyle='#a8854a';g.fillRect(0,W/3,W,W/3);}}
 else if(k==='tfr'){const t={lvl:id==='obs'?4:1,id:1};drawTFr(g,t,W/2,W/2,W*.8,id);g.fillStyle='#e8b04a';g.beginPath();g.arc(W/2,W/2,W*.8*.4,0,7);g.fill();g.font=Math.round(W*.36)+'px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('🏹',W/2,W/2+1);}
 else if(k==='fx'){const B=W*.62,Y=W*.6;drawHalo(g,W/2,Y,B);g.fillStyle='#8a7dff';g.beginPath();g.arc(W/2,Y,B*.4,0,7);g.fill();drawCrown(g,W/2,Y,B);}}
function cosmHTML2(){const lk=c=>'🔒 '+achReq(c.ach).replace(/<[^>]+>/g,'');
 const ex=k=>COSM[k].map(c=>{const o=cosOwn(c),on=cosSel(k,COSM[k][0].id)===c.id;return `<button class="csw${on?' on':''}${o?'':' lk'}" ${o?`data-a="csex" data-k="${k}" data-v="${c.id}"`:'disabled'} title="${o?c.n:lk(c)}"><canvas width="44" height="44" data-cs="${k}" data-v="${c.id}"></canvas><span>${o?c.n:'🔒 ???'}</span></button>`;}).join('');
 const fx=COSM.fx.map(c=>{const o=cosOwn(c),on=o&&!(OPT.fxoff||{})[c.id];return `<button class="csw cdec${on?' on':''}${o?'':' lk'}" ${o?`data-a="csfx" data-v="${c.id}" aria-pressed="${on}"`:'disabled'} title="${o?c.n+(on?' · activado':' · apagado'):lk(c)}"><canvas width="44" height="44" data-cs="fx" data-v="${c.id}"></canvas><span>${o?c.n:'🔒 ???'}</span><em>${o?(on?'Activado':'Apagado'):''}</em></button>`;}).join('');
 return `<div class="orow"><div>Camino</div><div class="cswr">${ex('path')}</div></div><div class="orow"><div>Marco de torre</div><div class="cswr">${ex('tfr')}</div></div><div class="orow"><div>Efectos en partida</div><small>La corona va sobre la torre que más daño lleva en la partida y cambia de dueña en directo. Pulsa para activarla o apagarla.</small><div class="cswr">${fx}</div></div>`;}
{const _h=cosmHTML;cosmHTML=function(){const h=_h(),i=h.indexOf('<div class="orow"><div>Marcos de héroe');return i<0?h+cosmHTML2():h.slice(0,i)+cosmHTML2()+h.slice(i);};
 const _p=cosmPaint;cosmPaint=function(){_p();document.querySelectorAll('#comp canvas[data-cs]').forEach(cv=>cosmPrev(cv,cv.dataset.cs,cv.dataset.v));};}
