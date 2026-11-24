// ==================== v366 · Mecánicas de los enemigos nuevos del Taller, tanda 2 ====================
// Era Fantástica, partida 2 (acordado con Nogal el 24-nov). Las medidas van en celdas pequeñas (K = 5 celdas = el ancho del camino).
// Regla de Nogal: ningún efecto de área de un enemigo puede ser más estrecho que el camino.
//  · Bruja goblin (hex): cada 6 s echa mal de ojo a la torre más cercana (10 celdas): −20 % de alcance 5 s. No se acumula y la torre queda 10 s sin poder sufrirlo otra vez.
//  · Globo trasgo (bomb): cada 5 s marca la torre más cercana (7,5 celdas) y 1 s después cae la bomba: no dispara 2,5 s. Las torres con unidades no reponen a las caídas
//    en ese tiempo; prefiere las torres sin unidades.
//  · Ogro retador (taunt): cada 8 s grita; las torres a 12,5 celdas le apuntan a él mientras lo tengan a tiro, hasta que muera.
//  · Murciélago de fuego (ember): cada 4 s marca el suelo bajo la unidad más cercana (7,5 celdas) y 0,8 s después caen brasas: su golpe a las unidades que sigan a 2 celdas (con 1,5 solo alcanzaba a un soldado de un Baluarte: están a 1,56 unos de otros).
//  · Portatótem goblin (totem): cada 12 s planta un tótem (10 s, se puede romper). Quien pasa a 7,5 celdas gana Firmeza 4 s: no le entra ningún control
//    (ralentizar, aturdir, congelar, enraizar, miedo, empujones, transformaciones, hackeo); solo se le para con unidades.
//  · Portalero (gate): al recibir daño (o a los 6 s de entrar, como dice la ficha: «o cada pocos segundos») abre un portal (aviso 1,5 s) y lo mantiene 8 s parado: todo el que llega (voladores también; jefes no) sale 15 celdas más adelante
//    siguiendo el camino. Después anda 6 s (24 celdas) antes de abrir otro: con 10 s recorría 40 celdas, casi un mapa pequeño entero. Si una unidad pelea con él, o lo aturden o congelan, se cierra; 2,5 s después de quedar libre lo reabre.
Object.assign(TMEC,{i40bruja:{hex:1},i04bombardero:{bomb:1},i15provocador:{taunt:1},i17murcielago:{ember:1},i41totem:{totem:1},i01portalero:{gate:1}});
const HEXCD=6,HEXR=2*K,OJOT=5,HEXIMM=10,HEXM=.8,BOMBCD=5,BOMBR=1.5*K,BOMBW=1,BOMBT=2.5,TAUCD=8,TAUR=2.5*K,EMBCD=4,EMBR=1.5*K,EMBW=.8,EMBA=2,
 TOTCD=12,TOTT=10,TOTR=1.5*K,FIRMT=4,GATEW=1.5,GATET=8,GATECD=6,GATER=KC+1.2,GATEFREE=2.5,GATEAH=1.5,GATEFIRST=6;
const tm2Tw=t=>{const T=TW[t.type];return T&&!T.uniq&&!t.hero?T:null;};   // como la maldición y la interferencia de siempre: las torres de evento no se ven afectadas
// ---- Bruja goblin: mal de ojo ----
function hexTick(e,dt){e.hxc=(e.hxc===undefined?3:e.hxc)-dt;if(e.hxc>0)return;let b=null,bd=HEXR;for(const t of S.list){if(!tm2Tw(t)||t.hexr>0||t.heximm>0)continue;const d=Math.hypot(t.x-e.x,t.y-e.y);if(d<=bd){bd=d;b=t;}}
 if(b){e.hxc=HEXCD;b.hexr=OJOT;S.fx.push({x:b.x,y:b.y,t:.5,m:.5,r:1.2*K,col:'#6fe07a'});}else e.hxc=.5;}
{const _s=stats;stats=function(t){const s=_s(t);if(t&&t.hexr>0&&s&&s.range)return Object.assign({},s,{range:s.range*HEXM});return s;};}
// ---- Globo trasgo: bombas a las torres ----
function globoTick(e,dt){e.bmc=(e.bmc===undefined?2:e.bmc)-dt;if(e.bmc>0)return;let b=null,bd=1e9;const mk=S.tmb||(S.tmb=[]);
 for(const t of S.list){const T=tm2Tw(t);if(!T||t.jam>0||mk.some(m=>m.t===t))continue;const d=Math.hypot(t.x-e.x,t.y-e.y);if(d>BOMBR)continue;const sc=d+(T.unit?1e3:0);if(sc<bd){bd=sc;b=t;}}
 if(b){e.bmc=BOMBCD;mk.push({t:b,w:BOMBW,x0:e.x,y0:e.y});}else e.bmc=.4;}
// ---- Ogro retador: grito ----
function tauntTick(e,dt){if(e.tauB>0)e.tauB-=dt;e.tac=(e.tac===undefined?2:e.tac)-dt;if(e.tac>0)return;let n=0;
 for(const t of S.list){const T=tm2Tw(t);if(!T||T.unit||T.support||Math.hypot(t.x-e.x,t.y-e.y)>TAUR)continue;t.taunt=e;n++;}
 if(n){e.tac=TAUCD;e.tauB=.8;S.fx.push({x:e.x,y:e.y,t:.6,m:.6,r:TAUR,col:'#ff5a4a'});}else e.tac=.5;}
// las torres provocadas le apuntan mientras lo tengan a tiro (antes de que cada torre elija objetivo)
function tauntHold(){if(!S||!S.list)return;for(const t of S.list){const e=t.taunt;if(!e)continue;if(!(e.hp>0)||!S.enemies.includes(e)){t.taunt=null;continue;}const T=TW[t.type];
  if(T&&T.ground&&isFly(e))continue;if(Math.hypot(e.x-t.x,e.y-t.y)<=stats(t).range)t.tgt=e;}}
// ---- Murciélago de fuego: brasas ----
function emberTick(e,E,dt,SL){e.rw=9;/* su ataque son las brasas: no dispara además como los demás enemigos a distancia */e.emc=(e.emc===undefined?2:e.emc)-dt;if(e.emc>0)return;let b=null,bd=EMBR;for(const s of SL){if(s.air||(s.H&&s.H.camo>0))continue;const d=Math.hypot(s.x-e.x,s.y-e.y);if(d<=bd){bd=d;b=s;}}
 if(b){e.emc=EMBCD;(S.tmz||(S.tmz=[])).push({x:b.x,y:b.y,w:EMBW,d:(E.ud||0)*(typeof udM==='function'?udM(e):1),src:e,x0:e.x,y0:e.y});}else e.emc=.3;}
// ---- Portatótem goblin: tótem de Firmeza ----
if(ET.banner)ET.ttotem={n:'Tótem de firmeza',gold:0,hp:3,hf:140,sp:0,r:ET.norm.r,col:'#8a5a2a',dmg:0,ap:0,am:0,ud:0,ac:9,need:1,rg:'melee',xp:0,gen:1,fac:'g',flag:1};
if(typeof EIC!=='undefined'&&ET.ttotem)EIC.ttotem='🗿';
function totemTick(e,dt){e.ttc=(e.ttc===undefined?3:e.ttc)-dt;if(e.ttc>0||!ET.ttotem)return;e.ttc=TOTCD;const hp=ehpOf('ttotem',S.round);
 (S.espw=S.espw||[]).push({t:'ttotem',x:e.x,y:e.y,tx:e.tx,ty:e.ty,hp,max:hp,fx:{},src:null,pv:[e.x,e.y],life:TOTT});}
function totemsTick(dt){const ts=S.enemies.filter(b=>b.t==='ttotem'&&b.hp>0);if(!ts.length)return;const others=S.enemies.some(e=>e.t!=='ttotem'&&e.t!=='banner'&&e.hp>0)||S.portals.some(p=>p.q&&p.q.length);
 for(const b of ts){b.life-=dt;if(b.life<=0||!others){S.enemies.splice(S.enemies.indexOf(b),1);continue;}
  for(const e of S.enemies)if(e.hp>0&&e!==b&&e.t!=='ttotem'&&e.t!=='banner'&&Math.hypot(e.x-b.x,e.y-b.y)<=TOTR)e.firm=S.wt+FIRMT;}}
const firmOn=e=>e&&e.firm>S.wt;
function firmClear(e){if(!firmOn(e))return;const f=e.fx;if(f.slow)delete f.slow;if(f.stun)delete f.stun;if(f.freeze)delete f.freeze;if(f.root)delete f.root;if(f.fear)delete f.fear;if(f.poly)delete f.poly;if(e.hk>0)e.hk=0;}
{const _k=knock;knock=function(e,d){if(firmOn(e))return;return _k.apply(this,arguments);};}
{const _a=achDeath;achDeath=function(e){if(e&&e.t==='ttotem')return;return _a.apply(this,arguments);};}
// ---- Portalero: portal ----
// gw = aviso · go = abierto · gcd = espera andando · gheld/gfree = cerrado porque pelean con él · gx,gy entrada · gex,gey salida
function gateGhost(e,d0){const g=Object.assign({},e,{fx:{},trail:(e.trail||[]).slice(),gw:0,go:0,fsp:0,stopped:false,ghost:1});let d=0;for(let i=0;i<400&&d<d0;i++){const px=g.x,py=g.y;if(move(g,.05))break;d+=Math.hypot(g.x-px,g.y-py);if(g.x===px&&g.y===py)break;}return g;}
function gateOpen(e){const a=gateGhost(e,GATEAH),b=gateGhost(e,GATEAH+TELED);e.gx=a.x;e.gy=a.y;e.gex=b.x;e.gey=b.y;e.gw=GATEW;e.fsp=0;}
function gateTick(e,dt,SL){const held=SL.some(s=>(s.fight&&s.en===e)||s.en2===e),cc=!!(e.fx.stun||e.fx.freeze||e.fx.poly);
 if((e.gw>0||e.go>0)&&(held||cc)){e.gw=0;e.go=0;e.gheld=1;e.gfree=GATEFREE;S.fx.push({x:e.gx,y:e.gy,t:.4,m:.4,r:.6*K,col:'#7a3ab8'});return;}
 if(e.gw>0){e.gw-=dt;if(e.gw<=0){e.gw=0;e.go=GATET;}return;}
 if(e.go>0){e.go-=dt;for(const o of S.enemies){if(o===e||o.hp<=0||o.leak||isBoss(o)||ET[o.t].flag||o.spj||o.dvs||o.dvd>0||o.chr>0||Math.hypot(o.x-e.gx,o.y-e.gy)>GATER)continue;teleFwd(o);}
  if(e.go<=0){e.go=0;e.gcd=GATECD;}return;}
 if(e.gheld){if(held||cc){e.gfree=GATEFREE;return;}e.gfree-=dt;if(e.gfree<=0){e.gheld=0;gateOpen(e);}return;}
 if(e.gcd>0){e.gcd-=dt;return;}
 if(!e.gact){e.gage=(e.gage||0)+dt;/* el primero: al recibir daño o, si nadie le pega (suele ir detrás), a los 6 s de entrar */if(e.hp<e.max-.01||e.gage>=GATEFIRST)e.gact=1;else return;}
 gateOpen(e);}
{const _m=move;move=function(e,dt){if(e.gw>0||e.go>0)return false;if(e.firm>S.wt)firmClear(e);return _m(e,dt);};}
// ---- tick general ----
function tm2Tick(dt){const SL=liveUnits().filter(s=>!s.charm);
 for(const t of S.list){if(t.hexr>0){t.hexr-=dt;if(t.hexr<=0){t.hexr=0;t.heximm=HEXIMM;}}else if(t.heximm>0)t.heximm-=dt;
  if(t.jam>0&&TW[t.type]&&TW[t.type].unit&&t.sd)for(const s of t.sd)if(s.hp<=0&&s.rt>0)s.rt+=dt;/* bombardeada: no repone a las caídas */}
 if(S.tmb&&S.tmb.length){for(const m of S.tmb){m.w-=dt;if(m.w<=0&&S.list.includes(m.t)){m.t.jam=Math.max(m.t.jam||0,BOMBT);S.fx.push({x:m.t.x,y:m.t.y,t:.5,m:.5,r:1*K,col:'#ffb04a'});}}S.tmb=S.tmb.filter(m=>m.w>0);}
 if(S.tmz&&S.tmz.length){for(const z of S.tmz){z.w-=dt;if(z.w<=0){for(const s of liveUnits())if(Math.hypot(s.x-z.x,s.y-z.y)<=EMBA)hitUnit(s,z.d,z.src);S.fx.push({x:z.x,y:z.y,t:.45,m:.45,r:EMBA,col:'#ff7a2a'});}}S.tmz=S.tmz.filter(z=>z.w>0);}
 totemsTick(dt);
 for(const e of S.enemies){if(e.hp<=0)continue;const E=ET[e.t];if(!E)continue;firmClear(e);if(E.gate)gateTick(e,dt,SL);if(e.fx.freeze||e.fx.stun||e.fx.poly)continue;
  if(E.hex)hexTick(e,dt);if(E.bomb)globoTick(e,dt);if(E.taunt)tauntTick(e,dt);if(E.ember)emberTick(e,E,dt,SL);if(E.totem)totemTick(e,dt);}}
{const _u=update;update=function(dt){if(S&&S.phase==='wave')tauntHold();_u(dt);if(!S)return;if(S.phase==='wave')tm2Tick(dt);else if(S.list){S.tmb=[];S.tmz=[];for(const t of S.list){if(t.hexr)t.hexr=0;if(t.heximm)t.heximm=0;if(t.taunt)t.taunt=null;}}};}
// ---- dibujo ----
function tm2Draw(g,lw){if(!S||!S.enemies)return;const X=v=>v*CS+CS/2,now=performance.now()/1000;
 const diana=(x,y,r,k,col)=>{g.strokeStyle=col;g.lineWidth=lw(2.5);g.beginPath();g.arc(x,y,r*(1.6-.6*k),0,7);g.stroke();g.beginPath();g.arc(x,y,r*.45,0,7);g.stroke();for(let i=0;i<4;i++){const a=i*Math.PI/2;g.beginPath();g.moveTo(x+Math.cos(a)*r*.7,y+Math.sin(a)*r*.7);g.lineTo(x+Math.cos(a)*r*1.5,y+Math.sin(a)*r*1.5);g.stroke();}};
 // torres con mal de ojo: calavera verde
 for(const t of S.list||[])if(t.hexr>0){/* el alcance encogido, para que se vea qué deja de cubrir */g.strokeStyle='rgba(111,224,122,.75)';g.lineWidth=lw(1.8);g.setLineDash([lw(7),lw(5)]);g.beginPath();g.arc(X(t.x),X(t.y),stats(t).range*CS,0,7);g.stroke();g.setLineDash([]);
   const x=X(t.x),y=X(t.y)-CT*1.25,r=CT*.42;g.fillStyle='#6fe07a';g.strokeStyle='#1b1712';g.lineWidth=lw(1.6);g.beginPath();g.arc(x,y,r,0,7);g.fill();g.stroke();g.beginPath();g.rect(x-r*.55,y+r*.5,r*1.1,r*.6);g.fill();g.stroke();
   g.fillStyle='#1b1712';g.beginPath();g.arc(x-r*.38,y-r*.05,r*.24,0,7);g.arc(x+r*.38,y-r*.05,r*.24,0,7);g.fill();}
 // bombas del Globo: diana sobre la torre y la bomba cayendo
 for(const m of S.tmb||[]){const k=1-m.w/BOMBW,x=X(m.t.x),y=X(m.t.y);diana(x,y,CT*.9,k,'rgba(255,90,60,'+(.5+.5*k).toFixed(2)+')');const bx=X(m.x0)+(x-X(m.x0))*k,by=X(m.y0)+(y-X(m.y0))*k-Math.sin(Math.PI*k)*CT*.8;g.fillStyle='#1b1712';g.beginPath();g.arc(bx,by,CT*.22,0,7);g.fill();g.fillStyle='#ffb04a';g.beginPath();g.arc(bx+CT*.12,by-CT*.2,CT*.08,0,7);g.fill();}
 // brasas del Murciélago: diana en el suelo y la brasa cayendo
 for(const z of S.tmz||[]){const k=1-z.w/EMBW,x=X(z.x),y=X(z.y),r=EMBA*CS;g.fillStyle='rgba(255,120,40,'+(.12+.2*k).toFixed(2)+')';g.beginPath();g.arc(x,y,r,0,7);g.fill();diana(x,y,r*.62,k,'rgba(255,140,50,'+(.55+.45*k).toFixed(2)+')');
  const bx=X(z.x0)+(x-X(z.x0))*k,by=X(z.y0)+(y-X(z.y0))*k;g.fillStyle='#ff7a2a';g.beginPath();g.arc(bx,by,CS*.35,0,7);g.fill();g.fillStyle='#ffe08a';g.beginPath();g.arc(bx,by,CS*.16,0,7);g.fill();}
 for(const e of S.enemies){if(e.hp<=0)continue;const E=ET[e.t];if(!E)continue;const px=X(e.x),py=X(e.y),r=E.r*CS*EVS;
  // tótem: su zona
  if(e.t==='ttotem'){g.fillStyle='rgba(160,120,70,.10)';g.strokeStyle='rgba(190,150,90,.6)';g.lineWidth=lw(1.4);g.beginPath();g.arc(px,py,TOTR*CS,0,7);g.fill();g.stroke();
   g.strokeStyle='#ffd98a';g.lineWidth=lw(1.6);for(let i=0;i<3;i++){const a=now*1.5+i*2.094;g.beginPath();g.arc(px+Math.cos(a)*r*1.2,py+Math.sin(a)*r*1.2,r*.18,0,7);g.stroke();}}
  // Firmeza: aro de piedra
  if(e.firm>S.wt&&e.t!=='ttotem'){g.strokeStyle='rgba(205,198,186,.95)';g.lineWidth=lw(2.6);g.setLineDash([lw(6),lw(3)]);g.beginPath();g.arc(px,py,r*1.28,0,7);g.stroke();g.setLineDash([]);}
  // grito del Ogro: ondas y línea roja a las torres que le apuntan
  if(E.taunt){if(e.tauB>0){const a=e.tauB/.8;g.strokeStyle='rgba(255,90,70,'+(a*.9).toFixed(2)+')';g.lineWidth=lw(3);for(let i=1;i<=3;i++){g.beginPath();g.arc(px,py,r*(1+i*(1.5-a)),-2.4,-.7);g.stroke();}}
   g.strokeStyle='rgba(255,70,60,.55)';g.lineWidth=lw(1.6);g.setLineDash([lw(5),lw(4)]);for(const t of S.list||[])if(t.taunt===e&&Math.hypot(e.x-t.x,e.y-t.y)<=stats(t).range){g.beginPath();g.moveTo(px,py);g.lineTo(X(t.x),X(t.y));g.stroke();}g.setLineDash([]);}
  // portal: entrada y salida (durante el aviso, tenues y creciendo)
  if(E.gate&&(e.gw>0||e.go>0)){const k=e.gw>0?1-e.gw/GATEW:1,w=CS*(KC+.4)*k,h=CS*.9*k+CS*.3,pt=(x,y,c1,c2)=>{const horiz=Math.abs((e.gex-e.gx))>=Math.abs((e.gey-e.gy));g.save();g.translate(X(x),X(y));if(horiz)g.rotate(Math.PI/2);g.fillStyle=c1;g.strokeStyle=c2;g.lineWidth=lw(2.5);g.beginPath();g.ellipse(0,0,w,h,0,0,7);g.fill();g.stroke();
     g.strokeStyle='rgba(235,210,255,.8)';g.lineWidth=lw(1.6);for(let i=0;i<3;i++){const a=now*3+i*2.094;g.beginPath();g.ellipse(0,0,w*(.25+.22*i),h*(.25+.22*i),0,a,a+2.2);g.stroke();}g.restore();};
   const al=e.gw>0?.35+.3*k:.8;pt(e.gx,e.gy,'rgba(122,58,184,'+al.toFixed(2)+')','#3a1a5a');pt(e.gex,e.gey,'rgba(170,110,235,'+(al*.8).toFixed(2)+')','#3a1a5a');}}}
{const _d=eSkillsDraw;eSkillsDraw=function(g,lw){_d(g,lw);try{tm2Draw(g,lw);}catch(x){}};}
// ---- palabras clave, fichas y Mecánicas del compendio ----
{const _k=kwHtml0,R=v=>(typeof RGV==='function'&&typeof f==='function')?RGV(f(v/K)):String(v/K).replace('.',','),c=v=>String(v).replace('.',',');kwHtml0=function(id,src){
 if(id==='ehex')return '<b>Mal de ojo</b><small>Cada '+HEXCD+' s echa mal de ojo a la torre más cercana (a '+R(HEXR)+' o menos): durante '+OJOT+' s tiene un '+Math.round((1-HEXM)*100)+' % menos de alcance. No se acumula, y una torre que acaba de librarse no puede volver a sufrirlo en '+HEXIMM+' s. Las torres de evento no se ven afectadas.</small>';
 if(id==='ebomb')return '<b>Bombardeo</b><small>Cada '+BOMBCD+' s marca con una diana la torre más cercana (a '+R(BOMBR)+' o menos) y '+BOMBW+' s después le cae una bomba: la torre no dispara durante '+c(BOMBT)+' s. Una torre con unidades, en ese tiempo, no repone a las caídas. Prefiere las torres sin unidades. Las torres de evento no se ven afectadas.</small>';
 if(id==='etaunt')return '<b>Grito de desafío</b><small>Cada '+TAUCD+' s grita: las torres a '+R(TAUR)+' o menos le apuntan a él mientras lo tengan a tiro, hasta que muera, tengan el modo de objetivo que tengan.</small>';
 if(id==='eember')return '<b>Brasas</b><small>Cada '+EMBCD+' s marca con una diana el suelo bajo tu unidad más cercana (a '+R(EMBR)+' o menos) y '+c(EMBW)+' s después caen las brasas: golpean a todas las unidades que sigan dentro.</small>';
 if(id==='etotem')return '<b>Tótem de firmeza</b><small>Cada '+TOTCD+' s planta un tótem que dura '+TOTT+' s y se puede destruir como un enemigo más (no se mueve ni ataca). Los enemigos que pasan a '+R(TOTR)+' o menos ganan Firmeza durante '+FIRMT+' s.</small>';
 if(id==='efirm')return '<b>Firmeza</b><small>No le afecta ningún control: ni ralentización, ni aturdimiento, ni congelación, ni enraizamiento, ni miedo, ni empujones. Solo se le puede parar con unidades.</small>';
 if(id==='egate')return '<b>Portal</b><small>Al recibir daño, o a los '+GATEFIRST+' s de entrar si nadie le ha pegado, abre un portal (avisa '+c(GATEW)+' s antes) y se queda '+GATET+' s manteniéndolo: todo el que llega lo cruza y sale '+R(TELED)+' más adelante siguiendo el camino. Los jefes no caben. Después anda '+GATECD+' s antes de abrir otro. Si una unidad tuya pelea con él, o lo aturdes o congelas, el portal se cierra.</small>';
 return _k(id,src);};}
{const KW2={hex:['ehex','Mal de ojo','💀'],bomb:['ebomb','Bombardeo','💣'],taunt:['etaunt','Grito de desafío','📢'],ember:['eember','Brasas','🔥'],totem:['etotem','Tótem de firmeza','🗿'],gate:['egate','Portal','🌀']};   // iconos provisionales: falta dibujarlos (prioritario)
 Object.assign(TMECKW,KW2);if(typeof MECG2!=='undefined'){for(const k in KW2)MECG2.push(KW2[k]);MECG2.push(['efirm','Firmeza','🪨']);}
 if(typeof MECUSE2!=='undefined'){for(const k in KW2)MECUSE2[KW2[k][0]]=Object.keys(TMEC).filter(id=>TMEC[id][k]).map(id=>'en:'+id);MECUSE2.efirm=['en:i41totem'];}}
