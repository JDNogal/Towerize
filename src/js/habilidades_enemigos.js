// ---- v291 · Habilidades de las unidades enemigas normales ----
// · Súcubo: embelesa a un soldado cercano (aro rosa, 10 s): deja de luchar por ti, sigue a la Súcubo y ataca a tus otros soldados. El héroe es inmune.
// · Pirata de sistemas: canaliza 4 s un campo de interferencia (2,5 casillas) que apaga las torres de dentro; descansa 6 s.
// · Bombardero goblin y Cohetero sintético: disparan en arco; el golpe salpica a las unidades de alrededor (50 %).
// · Girocóptero goblin (nuevo) y Dron artillero: voladores que se paran a atacar a tus unidades y a tu héroe.
// · Caudillo orco (Hachazo giratorio, círculo), Campeón infernal (Estallido de llamas, chorro hacia delante), Centurión (Golpe sísmico, círculo + aturde)
//   y Pretoriano (Barrido de garras, arco frontal): cada 25 s, si tienen unidades cerca.
// · Las escuadras de demonios giran en corro alrededor de su guía mientras avanzan (solo visual).
const GYROSVG='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M4 7 L60 7" stroke="#1b1712" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/><path d="M6 7 L58 7" stroke="#c9b48a" stroke-width="2.6" stroke-linecap="round"/><circle cx="32" cy="7" r="3" fill="#5a4a3a" stroke="#1b1712" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><g transform="translate(16 6) scale(0.5)"><path d="M4 22 L20 30 L18 36Z M60 22 L44 30 L46 36Z" fill="#8cc04a" stroke="#1b1712" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/><path d="M18 32 Q18 16 32 16 Q46 16 46 32 Q46 50 32 52 Q18 50 18 32Z" fill="#8cc04a" stroke="#1b1712" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/><circle cx="26" cy="31" r="4" fill="#fff" stroke="#1b1712" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><circle cx="38" cy="31" r="4" fill="#fff" stroke="#1b1712" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><circle cx="27" cy="31.5" r="1.8" fill="#1b1712"/><circle cx="37" cy="31.5" r="1.8" fill="#1b1712"/><path d="M32 33 Q36 40 31 41" fill="#7aae3a" stroke="#1b1712" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/><path d="M24 45 Q32 50 40 44" fill="#3a1a12" stroke="#1b1712" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/><path d="M27 46 L28 48 L29 46.5 M35 46 L36 48 L37 46" stroke="#fff" stroke-width="1.4" fill="none"/></g><path d="M23 17 L41 17" stroke="#5a3a2a" stroke-width="2.2"/><circle cx="28.5" cy="17.5" r="2.6" fill="#9ad0e0" stroke="#1b1712" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round"/><circle cx="35.5" cy="17.5" r="2.6" fill="#9ad0e0" stroke="#1b1712" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round"/><path d="M10 30 L54 30 L49 44 Q45 50 32 50 Q19 50 15 44Z" fill="#a0703a" stroke="#1b1712" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/><path d="M13 37 L51 37" stroke="#6a4a2a" stroke-width="2"/><path d="M54 32 L62 28 L62 38Z" fill="#7a5a3a" stroke="#1b1712" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M32 50 V53" stroke="#1b1712" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><circle cx="32" cy="57" r="5" fill="#2a2a30" stroke="#1b1712" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/></svg>';
{const B=ET.javelin,E=Object.assign({},B,{n:'Girocóptero goblin',col:'#6aa03a',fly:1,fac:'g',hf:70,hp:1.6,sp:B.sp*1.1,rg:'ranged',xp:4});ET.gyro=E;EIC.gyro={esvg:GYROSVG};}
ET.gundr.rg='ranged';ET.gundr.ud=Math.max(ET.gundr.ud,5);
// mecánicas: la Súcubo deja de maldecir y embelesa; el Pirata deja de maldecir e interfiere
Object.assign(ET.warlock,{curse:0,charm:1});Object.assign(ET.hack,{curse:0,jam:1});
for(const k of['javelin','rocket','gyro','gundr'])ET[k].splashU=1;
Object.assign(ET.champ,{sk:'whirl'});Object.assign(ET.dchamp,{sk:'jet'});Object.assign(ET.centu,{sk:'quake'});Object.assign(ET.praet,{sk:'claw'});
const ESK={whirl:{n:'Hachazo giratorio',r:1.2,m:2,col:'#f0b429',d:'Cada 25 s, si tiene unidades cerca, gira con el hacha: golpe circular a todas tus unidades a 1 casilla o menos (doble de su daño).'},
 jet:{n:'Estallido de llamas',r:2.2,a:.6,m:1.5,col:'#ff7a3c',d:'Cada 25 s, si tiene unidades cerca, lanza un chorro de fuego hacia delante (cono de 2 casillas): 1,5 veces su daño a las unidades alcanzadas.'},
 quake:{n:'Golpe sísmico',r:1.2,m:1.5,st:.5,col:'#8fb0d0',d:'Cada 25 s, si tiene unidades cerca, golpea el suelo: onda circular a 1 casilla o menos (1,5 veces su daño) que aturde a tus unidades 0,5 s.'},
 claw:{n:'Barrido de garras',r:1.5,a:.8,m:2,col:'#ff4fd8',d:'Cada 25 s, si tiene unidades cerca, barre con las garras en arco hacia delante (1,5 casillas): doble de su daño a las unidades alcanzadas.'}};
const SKCD=25,CHARMT=10,CHARMCD=8,CHARMR=3*K,JAMR=2.5*K,JAMT=4,JAMREST=6;
for(const k of['gyro'])if(!REGT.includes(k))REGT.push(k);
FORM.gyro=3;
// escuadras: el Girocóptero se suma al Bombardeo
SQUADS.bombardeo.m={norm:3,javelin:2,gyro:1};SQF.bombardeo=[[['norm',0,-1],['norm',0,0],['norm',0,1],['javelin',1.4,-1],['gyro',1.6,0],['javelin',1.5,1]]];
EFAM.find(x=>x[0]==='Voladores')[1].push('gyro');
// ---- daño a una unidad (soldado o héroe), con su muerte si cae ----
function hitUnit(s,d,e){if(!s||s.hp<=0||d<=0)return;if(s.H&&s.H.inv>0)return;if(typeof uHitMod==='function'){d=uHitMod(s,d,e);if(!(d>0))return;}s.hp-=d;s.lh=S.wt;if(S.pvE&&S.dn)dnAdd(s,d,'taken');
 if(s.hp<=0){if(!s.H&&typeof ra==='function'&&ra('banner')){s.hp=1;return;}const U=unitOf(s.tw);if(s.H&&S.st)S.st.hDie=(S.st.hDie||0)+1;s.rt=U.rez*(!s.H&&typeof rp==='function'&&rp('banner')?.7:1);s.en=null;s.fight=false;s.charm=null;}}
const liveUnits=()=>{const L=[];for(const t of unitTowers())for(const s of t.sd)if(s.hp>0)L.push(s);return L;};
// ---- habilidades de campeón ----
function skTick(e,E,dt,SL){e.skc=(e.skc===undefined?8:e.skc)-dt;if(e.skc>0)return;const K0=ESK[E.sk],R=K0.r*K;
 let tg=null,bd=R;for(const s of SL){const d=Math.hypot(s.x-e.x,s.y-e.y);if(d<=bd){bd=d;tg=s;}}if(!tg)return;e.skc=SKCD;
 const ang=Math.atan2(tg.y-e.y,tg.x-e.x),dmg=E.ud*K0.m*(typeof udM==='function'?udM(e):1);
 for(const s of SL){const dx=s.x-e.x,dy=s.y-e.y,d=Math.hypot(dx,dy);if(d>R)continue;if(K0.a&&d>.3){let da=Math.abs(Math.atan2(dy,dx)-ang);if(da>Math.PI)da=2*Math.PI-da;if(da>K0.a)continue;}
  hitUnit(s,dmg,e);if(K0.st&&s.hp>0)s.cd=Math.max(s.cd||0,K0.st);}
 (S.efx=S.efx||[]).push({k:E.sk,x:e.x,y:e.y,a:ang,r:R,arc:K0.a||0,col:K0.col,t:.6,m:.6});S.msg=E.n+': '+K0.n+'.';}
// ---- Súcubo: embeleso ----
// El soldado embelesado se convierte un rato en un enemigo de verdad («Soldado embelesado»): camina por el camino con el grupo, pelea contra tus unidades
// y, si llega al núcleo, quita 1 de vida. Mientras tanto el soldado original queda fuera de juego. Al acabar el efecto vuelve a ser tuyo donde esté;
// si matas al embelesado, el soldado cae y reaparece en su torre como siempre. Sirve de base para futuras mecánicas de «cambiar de bando».
ET.thrall={n:'Soldado embelesado',gold:0,hp:1,hf:30,sp:ET.minion.sp,r:ET.minion.r,col:'#ff7ac8',dmg:1,ap:0,am:0,ud:6,ac:1,need:1,rg:'melee',xp:0,gen:1,fac:'d',thrall:1};EIC.thrall='💂';
function pathCellNear(x,y){if(!S.field||!S.cells)return null;let b=null,bd=1e9;const cx=Math.round(x),cy=Math.round(y);for(let dy=-4;dy<=4;dy++)for(let dx=-4;dx<=4;dx++){const px=cx+dx,py=cy+dy;if(!inb(px,py)||S.cells[py][px]!==2)continue;const f=S.field[py]&&S.field[py][px];if(f==null||!isFinite(f)||f<0)continue;const d=Math.hypot(px-x,py-y);if(d<bd){bd=d;b=[px,py];}}return b;}
function turnCoat(s,by,T){const c=pathCellNear(s.x,s.y);if(!c)return null;const hp=Math.max(20,s.max*1.5),p={t:'thrall',x:c[0],y:c[1],tx:c[0],ty:c[1],hp,max:hp,fx:{},src:null,pv:[c[0],c[1]],ths:s,tht:T,thby:by};
 S.enemies.push(p);s.charm={e:p};s.en=null;s.fight=false;s.en2=null;S.fx.push({x:s.x,y:s.y,t:.6,m:.6,r:.6*K,col:'#ff7ac8'});return p;}
function charmTick(e,dt,SL){e.chc=(e.chc===undefined?3:e.chc)-dt;if(e.chc>0)return;let b=null,bd=CHARMR;for(const s of SL){if(s.H||s.charm||s.pig||s.mech||s.beast)continue;const d=Math.hypot(s.x-e.x,s.y-e.y);if(d<=bd){bd=d;b=s;}}
 if(!b||!turnCoat(b,e,CHARMT)){e.chc=.5;return;}e.chc=CHARMCD;}
function charmedTick(dt){for(const t of unitTowers())for(const s of t.sd){const c=s.charm;if(!c)continue;const p=c.e;
  if(!S.enemies.includes(p)){s.charm=null;if(p.leak||p.hp>0){/* llegó al núcleo (o desapareció): vuelve a su torre */s.x=t.x;s.y=t.y;s.lock=true;s.en=null;}else{/* lo mataste: cae y reaparece como siempre */s.hp=0;s.rt=unitOf(t).rez;s.en=null;s.fight=false;}continue;}
  if(p.hp<=0)continue;p.tht-=dt;
  if(p.tht<=0||!(p.thby&&p.thby.hp>0)){S.enemies.splice(S.enemies.indexOf(p),1);s.charm=null;s.x=p.x;s.y=p.y;s.lock=true;s.en=null;S.fx.push({x:p.x,y:p.y,t:.4,m:.4,r:.5*K,col:'#ffd0ea'});}}}
{const _a=achDeath;achDeath=function(e){if(e&&e.t==='thrall')return;return _a.apply(this,arguments);};}
// los soldados embelesados no los ven ni tus unidades ni los enemigos: se sacan un momento de su torre mientras se calculan el paso y el combate
function withoutCharmed(fn){const saved=[];for(const t of unitTowers())if(t.sd&&t.sd.some(s=>s.charm)){saved.push([t,t.sd]);t.sd=t.sd.filter(s=>!s.charm);}try{return fn();}finally{for(const[t,sd]of saved)t.sd=sd;}}
{const _w=unitWalk;unitWalk=function(dt){return withoutCharmed(()=>_w(dt));};}
{const _c=unitCombat;unitCombat=function(dt){return withoutCharmed(()=>_c(dt));};}
// ---- Pirata de sistemas: campo de interferencia ----
function jamTick(e,dt){if(e.chan>0){e.chan-=dt;for(const t of S.list){if(TW[t.type].uniq||TW[t.type].unit)continue;if(Math.hypot(t.x-e.x,t.y-e.y)<=JAMR)t.jam=Math.max(t.jam||0,.15);}if(e.chan<=0)e.jc=JAMREST;return;}
 e.jc=(e.jc===undefined?2:e.jc)-dt;if(e.jc>0)return;let any=false;for(const t of S.list)if(!TW[t.type].uniq&&!TW[t.type].unit&&Math.hypot(t.x-e.x,t.y-e.y)<=JAMR){any=true;break;}
 if(any){e.chan=JAMT;}else e.jc=.5;}
// las torres interferidas no disparan (las de disparo normal se saltan; el resto ve su cadencia casi a cero)
{const _s=stats;stats=function(t){const s=_s(t);if(t&&t.jam>0&&TW[t.type]&&!TW[t.type].unit){return Object.assign({},s,{rate:(s.rate||1)*1e-3});}return s;};}
{const _m=move;move=function(e,dt){if(e.chan>0)return false;return _m(e,dt);};}
// ---- tick general ----
function eSkillsTick(dt){const SL=liveUnits().filter(s=>!s.charm);
 for(const t of S.list)if(t.jam>0){t.jam-=dt;/* al acabar la interferencia, la recarga vuelve a la normal (las torres especiales la calculaban con la cadencia casi a cero y se quedaban sin disparar toda la partida) */if(t.jam<=0){t.jam=0;const r=stats(t).rate||1;if(t.cd>1/r)t.cd=1/r;if(t.sw)for(const w of t.sw)if(w.tk>1/r)w.tk=1/r;}}
 for(const e of S.enemies){if(e.hp<=0||e.fx.freeze||e.fx.stun||e.fx.poly)continue;const E=ET[e.t];
  if(E.sk)skTick(e,E,dt,SL);if(E.charm)charmTick(e,dt,SL);if(E.jam)jamTick(e,dt);}
 charmedTick(dt);
 if(S.efx)S.efx=S.efx.filter(q=>(q.t-=dt)>0);}
{const _u=update;update=function(dt){_u(dt);if(!S)return;if(S.phase==='wave')eSkillsTick(dt);else if(S.list)for(const t of unitTowers())for(const s of t.sd||[])if(s.charm){s.charm=null;s.x=t.x;s.y=t.y;s.lock=true;s.en=null;}};}
{const _s=startWave;startWave=function(){const r=_s.apply(this,arguments);if(S){S.efx=[];for(const t of S.list)t.jam=0;}return r;};}
// ---- salpicadura de los disparos en arco ----
function splashUnits(tg,d,e){for(const t of unitTowers())for(const s of t.sd){if(s===tg||s.hp<=0||s.charm)continue;if(Math.hypot(s.x-tg.x,s.y-tg.y)<=.9*K)hitUnit(s,d,e);}S.fx.push({x:tg.x,y:tg.y,t:.35,m:.35,r:.9*K,col:'#ff9a3c'});}
// ---- dibujo ----
// corro de los demonios: los que siguen a su guía giran despacio a su alrededor
function eWob(e){return null;}
function eSkillsDraw(g,lw){if(!S)return;
 for(const e of S.enemies)if(e.chan>0&&e.hp>0){const px=e.x*CS+CS/2,py=e.y*CS+CS/2,R=JAMR*CS;g.save();g.beginPath();g.arc(px,py,R,0,7);g.clip();g.fillStyle='rgba(63,232,255,.08)';g.fillRect(px-R,py-R,R*2,R*2);
  g.strokeStyle='rgba(63,232,255,.35)';g.lineWidth=lw(1);const st=CS*.6,o=(performance.now()/60)%st;for(let x=px-R-st+o;x<px+R;x+=st){g.beginPath();g.moveTo(x,py-R);g.lineTo(x,py+R);g.stroke();}for(let y=py-R;y<py+R;y+=st){g.beginPath();g.moveTo(px-R,y);g.lineTo(px+R,y);g.stroke();}g.restore();
  g.strokeStyle='rgba(63,232,255,.85)';g.lineWidth=lw(2);g.beginPath();g.arc(px,py,R,0,7);g.stroke();
  for(const t of S.list)if(t.jam>0&&Math.hypot(t.x-e.x,t.y-e.y)<=JAMR){g.strokeStyle='rgba(63,232,255,.6)';g.lineWidth=lw(1.5);g.beginPath();g.moveTo(px,py);g.lineTo(t.x*CS+CS/2,t.y*CS+CS/2);g.stroke();}}
 for(const t of S.list)if(t.jam>0){const x=t.x*CS+CS/2,y=t.y*CS+CS/2,j=CS*.5;g.strokeStyle='#3fe8ff';g.lineWidth=lw(2);for(let i=0;i<3;i++){const a=performance.now()/90+i*2.1;g.beginPath();g.moveTo(x+Math.cos(a)*j*.4,y+Math.sin(a)*j*.4);g.lineTo(x+Math.cos(a+.4)*j,y+Math.sin(a+.4)*j);g.stroke();}}
 for(const q of S.efx||[]){const px=q.x*CS+CS/2,py=q.y*CS+CS/2,al=Math.max(0,q.t/q.m);g.globalAlpha=al*.55;g.fillStyle=q.col;g.beginPath();if(q.arc){g.moveTo(px,py);g.arc(px,py,q.r*CS,q.a-q.arc,q.a+q.arc);g.closePath();}else g.arc(px,py,q.r*CS*(1.1-al*.3),0,7);g.fill();g.globalAlpha=al;g.strokeStyle=q.col;g.lineWidth=lw(2.5);g.stroke();g.globalAlpha=1;}}
// palabras clave nuevas
{const _k=kwHtml0;kwHtml0=function(id,src){
 if(id==='charm')return '<b>Embeleso</b><small>Cada '+CHARMCD+' s elige a uno de tus soldados cercanos (3 casillas), que pasa a ser un enemigo rosa durante '+CHARMT+' s: camina por el camino con el grupo y pelea contra tus unidades. Si llega al núcleo quita 1 de vida y el soldado vuelve a su torre. Si lo matas, el soldado cae y reaparece como siempre. Si la Súcubo muere o se acaba el tiempo, vuelve a ser tuyo. El héroe es inmune.</small>';
 if(id==='jam')return '<b>Interferencia</b><small>Se para '+JAMT+' s y despliega un campo holográfico de '+f(JAMR/K)+' casillas: las torres dentro se apagan y no disparan. Luego descansa '+JAMREST+' s. Las torres de unidades siguen luchando.</small>';
 if(id==='arcsh')return '<b>Disparo en arco</b><small>Su ataque cae en arco y salpica: las unidades a menos de 0,9 casillas del objetivo reciben la mitad del daño.</small>';
 if(id==='airatk')return '<b>Ataque aéreo</b><small>Vuela, pero se para en el aire para atacar a tus unidades y a tu héroe desde lejos. Solo las unidades a distancia y las torres que alcancen el aire pueden darle.</small>';
 if(ESK[id])return '<b>'+ESK[id].n+'</b><small>'+ESK[id].d+'</small>';
 return _k(id,src);};}
const MECG2=[['charm','Embeleso','💗'],['jam','Interferencia','📡'],['arcsh','Disparo en arco','💣'],['airatk','Ataque aéreo','🛩️'],['whirl','Hachazo giratorio','🪓'],['jet','Estallido de llamas','🔥'],['quake','Golpe sísmico','💥'],['claw','Barrido de garras','🐾']];
const MECUSE2={curse:[],charm:['en:warlock'],jam:['en:hack'],arcsh:['en:javelin','en:rocket','en:gyro','en:gundr'],airatk:['en:gyro','en:gundr'],whirl:['en:champ'],jet:['en:dchamp'],quake:['en:centu'],claw:['en:praet']};
Object.assign(ETIP2,{hack:'Apaga las torres dentro de su campo: mátalo pronto o ataca desde fuera de su alcance.',rocket:'Sus cohetes caen en arco y salpican a tus unidades: sepáralas o quítalo pronto.',gundr:'Se para en el aire a disparar a tus unidades: usa torres que den al aire.',
 centu:'Mucha armadura y cada 25 s un golpe sísmico que aturde a tus unidades.',praet:'Mucha resistencia mágica y cada 25 s un barrido de garras hacia delante.'});
