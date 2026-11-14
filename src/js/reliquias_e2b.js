// ==================== v303 · RELIQUIAS DE LA ERA 2 · SEGUNDA TANDA (todas de cofre) ====================
// Virus troyano, Dron de reconocimiento, Implante cibernético, Bidón radiactivo, Mapa estelar, Mochila cohete, Rastreador de combate,
// Satélite láser, Generador de gravedad, Cápsula de clonación, Chip de IA táctica y Baliza de teletransporte.
// Los activos no tienen nombre propio: se describen.
const R3={};let HKD=0;
const r3On=id=>!!(S&&S.relics&&S.relics.includes(id)&&rp(id)),r3Act=id=>!!(S&&S.relics&&S.relics.includes(id)&&ra(id));
const r3Hp=()=>ehpOf('norm',Math.max(1,S.round));// vida de un enemigo normal en esta ronda: referencia de daño
const r3Near=(c,R,f)=>{let b=null,bd=R;for(const e of S.enemies){if(e.hp<=0||e.leak||(f&&!f(e)))continue;const d=Math.hypot(e.x-c.x,e.y-c.y);if(d<=bd){bd=d;b=e;}}return b;};
const r3Path=c=>inb(c.x,c.y)&&S.cells[c.y][c.x]===2?c:pathNear(c.x,c.y);
// ---- Virus troyano ----
nrAdd({id:'trojan',n:'Virus troyano',ic:'🦠',col:'#2a5a2a',era:2,cd:3,
 pas:()=>'Todas las habilidades de los enemigos tardan un <span class="cr">30% más</span> en recargarse.',
 act:()=>'Un enemigo (no jefe) se pasa a tu bando <b>10 s</b>: camina hacia su portal y ataca a los enemigos que encuentra. Nadie le ataca mientras tanto.'},
 {aim:'Elige el enemigo que vas a hackear.',r:1.2*K,col:'120,255,120',use:c=>{const e=r3Near(c,1.5*K,e=>!isBoss(e)&&!(e.hk>0));if(!e){S.msg='Virus troyano: elige un enemigo que no sea jefe.';return false;}
  e.hk=10;e.hkc=0;e.fx.fear={t:10};e.tgt=null;for(const t of S.list)if(t.tgt===e)t.tgt=null;RS('trojan').n++;S.fx.push({x:e.x,y:e.y,t:.6,m:.6,r:.9*K,col:'#7aff7a'});return true;}});
{const T=.77,w=f=>function(){const a=[...arguments];if(r3On('trojan')){const i=a.findIndex(v=>typeof v==='number');if(i>=0)a[i]*=T;}return f.apply(this,a);};
 skTick=w(skTick);charmTick=w(charmTick);jamTick=w(jamTick);eliteTick=w(eliteTick);bossTick=w(bossTick);boss2Tick=w(boss2Tick);boss3Tick=w(boss3Tick);}
function hackTick(dt){for(const e of S.enemies){if(!(e.hk>0)||e.sw)continue;e.hk-=dt;if(e.hp<=0)continue;if(e.hk<=0){e.hk=0;delete e.fx.fear;continue;}e.fx.fear={t:Math.max(.3,e.hk)};
 e.hkc-=dt;if(e.hkc<=0){e.hkc=1;const o=r3Near(e,1.3*K,o=>o!==e&&!(o.hk>0));if(o){HKD=1;try{hurt(o,Math.max(4,(ET[e.t].ud||5)*3*udM(e)),null,'phys');}finally{HKD=0;}S.fx.push({x:o.x,y:o.y,t:.25,m:.25,r:.45*K,col:'#7aff7a'});}}}}
// ---- Dron de reconocimiento ----
nrAdd({id:'drone',n:'Dron de reconocimiento',ic:'🛸',col:'#3a4a5a',era:2,cd:3,
 pas:()=>`Un dron da vueltas al núcleo y dispara al enemigo más adelantado a su alcance. Descubre a los ${kw('camo','camuflados','')} que pisan la casilla del núcleo o las 8 de alrededor.`,
 act:()=>`El dron suelta una bomba en un área: daño y ${kw('stun','aturde','')} <b>1 s</b>.`},
 {aim:'Elige dónde soltar la bomba.',r:1.5*K,col:'255,180,90',use:c=>{let n=0;const dm=r3Hp()*.6;for(const e of S.enemies)if(e.hp>0&&!e.leak&&Math.hypot(e.x-c.x,e.y-c.y)<=1.5*K){hurt(e,dm,null,'phys');stunE(e,1);n++;}
  RS('drone').n2+=n;S.fx.push({x:c.x,y:c.y,t:.5,m:.5,r:1.5*K,col:'#ffb45a'});return true;}});
const DRN={a:0,cd:0};
function droneTick(dt){if(!r3On('drone')){DRN.p=null;return;}DRN.a+=dt*1.4;const c=S.core,p={x:c.x+Math.cos(DRN.a)*2.5*K,y:c.y+Math.sin(DRN.a)*2.5*K};DRN.p=p;
 const kx=Math.floor(c.x/K),ky=Math.floor(c.y/K);for(const e of S.enemies)if(e.hp>0&&ET[e.t].camo&&Math.abs(Math.floor(e.x/K)-kx)<=1&&Math.abs(Math.floor(e.y/K)-ky)<=1)e.rev=Math.max(e.rev||0,.3);
 if(S.phase!=='wave')return;DRN.cd-=dt;if(DRN.cd>0)return;let b=null,bp=1e9;for(const e of S.enemies){if(e.hp<=0||e.leak||e.hk>0||Math.hypot(e.x-p.x,e.y-p.y)>4*K)continue;if(typeof camoHid==='function'&&camoHid(e))continue;const pr=h2F(e.x,e.y);if(pr>=0&&pr<bp){bp=pr;b=e;}}
 if(b){DRN.cd=.8;hurt(b,r3Hp()*.08,null,'phys');DRN.sh={x:b.x,y:b.y,t:.1};RS('drone').n++;}}
// ---- Implante cibernético ----
nrAdd({id:'implant',n:'Implante cibernético',ic:'🦾',col:'#4a3a5a',era:2,cd:3,
 pas:()=>'Tu héroe: <span class="chp">+20% de vida</span> y <span class="cd">+10% de daño</span>.',
 act:()=>'Durante <b>8 s</b>, las habilidades de tu héroe se recargan el <span class="cr">doble de rápido</span>.'},{dur:8,use:()=>{if(!S.hero){S.msg='Implante cibernético: no tienes héroe.';return false;}S.fx.push({x:S.hero.s.x,y:S.hero.s.y,t:.5,m:.5,r:K,col:'#c070ff'});return true;}});
// ---- Bidón radiactivo ----
nrAdd({id:'barrel',n:'Bidón radiactivo',ic:'☢️',col:'#5a5a1a',era:2,cd:3,
 pas:()=>'Los enemigos que mueren dejan <b>3 s</b> una mancha radiactiva que hace un poco de daño y <b>corta toda curación</b> de los enemigos que la pisan.',
 act:()=>'Una zona radiactiva grande durante <b>8 s</b>: daño constante y, dentro, ningún enemigo se cura ni se regenera.'},
 {aim:'Elige dónde volcar el bidón.',r:2*K,col:'190,240,60',use:c=>{(S.rads=S.rads||[]).push({x:c.x,y:c.y,r:2*K,t:8,m:8,big:1,tk:0});return true;}});
H2K.push(e=>{if(r3On('barrel')&&!e.hk)(S.rads=S.rads||[]).push({x:e.x,y:e.y,r:.8*K,t:3,m:3,tk:0});});
function radTick(dt){for(const e of S.enemies){if(e.nh>0){if(e._nhp!=null&&e.hp>e._nhp&&e.hp>0){RS('barrel').gold+=e.hp-e._nhp;e.hp=e._nhp;}e.nh-=dt;}e._nhp=e.hp;}
 if(!S.rads||!S.rads.length)return;for(const z of S.rads){z.t-=dt;z.tk-=dt;const tick=z.tk<=0;if(tick)z.tk+=.5;for(const e of S.enemies){if(e.hp<=0||Math.hypot(e.x-z.x,e.y-z.y)>z.r)continue;e.nh=Math.max(e.nh||0,.6);if(tick&&S.phase==='wave'){hurt(e,r3Hp()*(z.big?.06:.025),null,'elem');RS('barrel').dmg+=1;}}}S.rads=S.rads.filter(z=>z.t>0);}
// ---- Mapa estelar ----
nrAdd({id:'starmap',n:'Mapa estelar',ic:'🌌',col:'#1a2a5a',era:2,cd:3,
 pas:()=>'En los cofres eliges entre <b>4 reliquias</b> en vez de 3.',
 act:()=>'Eliges un punto y, a los <b>3 s</b>, cae un meteorito: mucho daño en un área grande y deja '+kw('burn','quemadura','')+'.'},
 {aim:'Elige dónde caerá el meteorito.',r:1.8*K,col:'255,140,60',use:c=>{(S.mets=S.mets||[]).push({x:c.x,y:c.y,t:3});return true;}});
function metTick(dt){if(r3On('starmap'))S.chest4=1;if(!S.mets||!S.mets.length)return;for(const m of S.mets){m.t-=dt;if(m.t<=0){const dm=r3Hp()*2.2;let n=0;for(const e of S.enemies)if(e.hp>0&&!e.leak&&Math.hypot(e.x-m.x,e.y-m.y)<=1.8*K){const d=Math.hypot(e.x-m.x,e.y-m.y);hurt(e,dm*(d<=.8*K?1:.55),null,'elem');addBurn(e,null,4);n++;}
  RS('starmap').n+=n;S.fx.push({x:m.x,y:m.y,t:.8,m:.8,r:1.8*K,col:'#ff8a3c'});S.fx.push({x:m.x,y:m.y,t:.5,m:.5,r:.9*K,col:'#fff0b0'});try{sfx('boom',{force:1});}catch(x){}}}S.mets=S.mets.filter(m=>m.t>0);}
// ---- Mochila cohete ----
nrAdd({id:'jetpack',n:'Mochila cohete',ic:'🚀',col:'#6a3a2a',era:2,cd:3,
 pas:()=>'Tu héroe reaparece un <span class="cr">30% antes</span> y se mueve un <span class="cr">30% más rápido</span>.',
 act:()=>`Tu héroe vuela hasta el punto elegido del camino y cae haciendo daño en área y ${kw('stun','aturdiendo','')} <b>1 s</b>.`},
 {aim:'Elige dónde aterriza tu héroe.',r:1.3*K,col:'255,150,80',use:c=>{const H=S.hero;if(!H||H.s.hp<=0){S.msg='Mochila cohete: tu héroe tiene que estar vivo.';return false;}const q=r3Path(c);if(!q){S.msg='Mochila cohete: elige un punto del camino.';return false;}
  (S.kfx=S.kfx||[]).push({x0:H.s.x,y0:H.s.y,x1:q.x,y1:q.y,t:.35});H.s.x=q.x;H.s.y=q.y;H.pt.flag={x:q.x,y:q.y};H.s.lock=false;H.s.en=null;H.s.fight=false;
  const dm=Math.max(hdm()*2.5,r3Hp()*.5);let n=0;for(const e of S.enemies)if(e.hp>0&&!e.leak&&Math.hypot(e.x-q.x,e.y-q.y)<=1.3*K){hurt(e,dm,H.pt,'phys');stunE(e,1);n++;}RS('jetpack').n+=n;S.fx.push({x:q.x,y:q.y,t:.5,m:.5,r:1.3*K,col:'#ffa060'});return true;}});
{const _u=uSpdM;uSpdM=function(t){return _u.apply(this,arguments)*(t&&t.hero&&r3On('jetpack')?1.3:1);};}
// ---- Rastreador de combate ----
// v329 (idea de Nogal): el activo es un guiño a la lectura de poder más famosa del anime: un golpe en área de 1 a 9000, al azar
nrAdd({id:'scouter',n:'Rastreador de combate',ic:'🥽',col:'#2a6a3a',era:2,cd:5,
 pas:()=>'Tus torres, tus unidades y tu héroe hacen un <span class="cd">+20% de daño</span> a élites y jefes.',
 act:()=>'<i>«¡Su nivel de poder… supera los 9000!»</i> Golpea un área: cada enemigo dentro recibe <b>entre 1 y 9000</b> de daño, al azar.'},
 {aim:'Elige dónde leer el poder.',r:1.5*K,col:'120,255,140',use:c=>{const L=S.enemies.filter(e=>e.hp>0&&!e.leak&&Math.hypot(e.x-c.x,e.y-c.y)<=1.5*K);if(!L.length){S.msg='Rastreador de combate: no hay enemigos ahí.';return false;}
  let top=0;for(const e of L){const d=1+Math.floor(Math.random()*9000);top=Math.max(top,d);hurt(e,d,null,'elem');}RS('scouter').n+=L.length;
  S.fx.push({x:c.x,y:c.y,t:.7,m:.7,r:1.5*K,col:top>8000?'#ff4f4f':'#7aff8a'});S.msg=top>8000?'¡Lectura máxima: '+top.toLocaleString('es-ES')+'!':'Rastreador de combate: lectura de '+top.toLocaleString('es-ES')+'.';return 'msg';}});
// ---- Satélite láser ----
nrAdd({id:'satlaser',n:'Satélite láser',ic:'🛰️',col:'#3a2a5a',era:2,cd:3,
 pas:()=>'Cada <b>20 s</b> de oleada, un impacto orbital cae sobre el enemigo con más vida: mucho daño en el centro y algo menos alrededor (2 casillas).',
 act:()=>`El láser recorre <b>6 casillas</b> de camino desde el punto elegido hacia el portal, haciendo daño y dejando ${kw('burn','quemadura','')}.`},
 {aim:'Elige dónde empieza el barrido.',r:.8*K,col:'255,80,220',use:c=>{const q=r3Path(c);if(!q){S.msg='Satélite láser: elige un punto del camino.';return false;}S.sweep={pts:h2Route(q.x,q.y,6*K),i:0,tk:0,hit:new Set()};return true;}});
function satTick(dt){if(S.phase==='wave'&&r3On('satlaser')){S.satT=(S.satT||0)+dt;if(S.satT>=20&&!S.satX){let b=null;for(const e of S.enemies)if(e.hp>0&&!e.leak&&!(e.hk>0)&&(!b||e.hp>b.hp))b=e;if(b){S.satT=0;S.satX={e:b,t:1,x:b.x,y:b.y};}}}
 if(S.satX){const X=S.satX;if(X.e.hp>0){X.x=X.e.x;X.y=X.e.y;}X.t-=dt;if(X.t<=0){const dm=r3Hp()*1.6;let n=0;for(const e of S.enemies)if(e.hp>0&&!e.leak&&Math.hypot(e.x-X.x,e.y-X.y)<=2*K){const d=Math.hypot(e.x-X.x,e.y-X.y);hurt(e,d<=.7*K?dm:dm*.4,null,'elem');n++;}
  RS('satlaser').n+=n;S.fx.push({x:X.x,y:X.y,t:.6,m:.6,r:2*K,col:'#ff4fd8'});S.fx.push({x:X.x,y:X.y,t:.4,m:.4,r:.7*K,col:'#ffffff'});S.satX=null;try{sfx('zap',{force:1});}catch(x){}}}
 if(S.sweep){const W=S.sweep;W.tk-=dt;while(W.tk<=0&&W.i<W.pts.length){W.tk+=.06;const p=W.pts[W.i++];for(const e of S.enemies)if(e.hp>0&&!e.leak&&!W.hit.has(e)&&Math.hypot(e.x-p.x,e.y-p.y)<=.9*K){W.hit.add(e);hurt(e,r3Hp()*.7,null,'elem');addBurn(e,null,3);}}if(W.i>=W.pts.length)S.sweep=null;}}
// ---- Generador de gravedad ----
nrAdd({id:'gravity',n:'Generador de gravedad',ic:'🌀',col:'#2a2a4a',era:2,cd:3,
 pas:()=>`Los enemigos ${kw('slow','ralentizados','')} reciben un <span class="cd">+15% de daño</span>.`,
 act:()=>'Un campo de gravedad triple en un área durante <b>6 s</b>: los enemigos van un <b>60% más lentos</b>, no pueden teletransportarse ni esquivar a tus unidades (que ahora sí los bloquean). Los voladores siguen volando.'},
 {aim:'Elige dónde activar el campo de gravedad.',r:2*K,col:'150,120,255',use:c=>{S.grav={x:c.x,y:c.y,r:2*K,t:6};return true;}});
function gravTick(dt){for(const e of S.enemies)if(e.gpin>0)e.gpin-=dt;if(!S.grav)return;const G=S.grav;G.t-=dt;if(G.t<=0){S.grav=null;return;}
 for(const e of S.enemies){if(e.hp<=0||Math.hypot(e.x-G.x,e.y-G.y)>G.r)continue;e.gpin=.25;if(!isFly(e))slowE(e,.4,.3);e.fsp=0;}}
{const _t=teleFwd;teleFwd=function(e){if(e&&e.gpin>0)return;return _t.apply(this,arguments);};}
// ---- Cápsula de clonación ----
nrAdd({id:'clone',n:'Cápsula de clonación',ic:'🧬',col:'#2a5a6a',era:2,cd:3,
 pas:()=>'Cuando cae una de tus unidades o tu héroe, hay un <span class="cf">25%</span> de que reaparezca al instante.',
 act:()=>'Durante <b>10 s</b>, un clon de tu héroe, con la mitad de vida y de daño, pelea a su lado.'},
 {dur:10,use:()=>{const H=S.hero;if(!H||H.s.hp<=0){S.msg='Cápsula de clonación: tu héroe tiene que estar vivo.';return false;}const s=H.s,st=stats(H.pt),hp=s.max*.5;
  const t={type:'bastion',lvl:2,summ:1,ttl:10,x:s.x,y:s.y,cells:[],flag:{x:Math.round(s.x),y:Math.round(s.y)},ab:{},acd:{},sd:[],uspdx:(H.def.spd||2)/2,tinf:{n:'Clon de '+H.def.n,ic:H.def.ic,col:'#3fe8ff',dt:H.def.dt||'phys',range:st.range/K,dmg:st.dmg*.5,rate:st.rate,unit:{n:1,hp,ap:5,rez:99,spd:(H.def.spd||2)*K}},ovr:{dmg:st.dmg*.5,rate:st.rate,range:Math.max(2.5*K,st.range),crit:.05,critm:2,area:0,gold:0,pen:0}};
  t.sd=[{i:0,x:s.x,y:s.y,hp,max:hp,en:null,cd:0,rt:0,tw:t,lock:false,fight:false,clone:H.id,rng:H.def.ranged?1:0}];(S.summ=S.summ||[]).push(t);RS('clone').n2++;S.fx.push({x:s.x,y:s.y,t:.6,m:.6,r:K,col:'#3fe8ff'});return true;}});
{const _u=unitDeath;unitDeath=function(t,s){const r=_u.apply(this,arguments);try{if(!t.summ&&!t.merc&&!S.pvE&&r3On('clone')&&prdRoll(S.rs.clone||S,.25,'clone')){s.hp=s.max;s.rt=0;s.dd=0;s.en=null;s.fight=false;RS('clone').n++;S.fx.push({x:s.x,y:s.y,t:.5,m:.5,r:.8*K,col:'#3fe8ff'});}}catch(e){}return r;};}
// ---- Chip de IA táctica ----
nrAdd({id:'aichip',n:'Chip de IA táctica',ic:'💾',col:'#1a4a4a',era:2,cd:3,
 pas:()=>'Tus torres eligen solas el mejor objetivo: las de área, el grupo más grande; las demás, el enemigo con más vida. Si cambias a mano el objetivo de una torre, se queda con tu elección.',
 act:()=>'Durante <b>10 s</b>, cada torre que mata a un enemigo <span class="cr">vuelve a disparar al instante</span>.'},{dur:10,use:()=>true});
const AIT={area:{n:'IA táctica',score:e=>e._dn||0},one:{n:'IA táctica',score:e=>e.hp}};
function tgtAI(t,s){if(t.mman||!r3On('aichip'))return null;return (s&&s.area>0)?AIT.area:AIT.one;}
function denseTick(){if(!r3On('aichip'))return;const L=S.enemies;for(const e of L){let n=0;for(const o of L)if(o.hp>0&&Math.abs(o.x-e.x)<=1.2*K&&Math.abs(o.y-e.y)<=1.2*K)n++;e._dn=n;}}
{const _d=onDmg;onDmg=function(e,dl,src,ty){const r=_d.apply(this,arguments);try{if(e.hp<=0&&!e._rk&&src&&!src.hero&&!(src.sd&&src.sd.length)&&src.cd!=null&&r3Act('aichip')){e._rk=1;src.cd=0;RS('aichip').n++;}}catch(x){}return r;};}
// ---- Baliza de teletransporte ----
nrAdd({id:'beacon',n:'Baliza de teletransporte',ic:'📍',col:'#5a2a5a',era:2,cd:3,
 pas:()=>'En cada oleada, el primer enemigo que iba a llegar al núcleo vuelve a su portal (jefes no).',
 act:()=>'Mueves una torre que hayas construido tú a otro solar libre, con su nivel, especialización y habilidades. Al llegar, durante <b>8 s</b> dispara un <span class="cr">50% más rápido</span> y hace un <span class="cd">25% más de daño</span>.'},
 {aim:'Elige la torre que quieres mover.',any:1,start:()=>{S.bcSrc=null;},use:c=>{const t=S.occ[c.x+','+c.y];
  if(!S.bcSrc){if(!t||t.holo||TW[t.type].uniq||TW[t.type].guild||t.summ){S.msg='Baliza: elige una torre que hayas construido tú.';return false;}S.bcSrc=t.id;S.msg='Ahora elige un solar libre para llevarla.';return false;}
  const src=S.list.find(o=>o.id===S.bcSrc);if(!src){S.bcSrc=null;S.msg='Elige la torre que quieres mover.';return false;}
  const q=sqOf(c.x,c.y);if(t||!inbc(q.kx,q.ky)||S.cc[q.ky][q.kx]!==1){S.msg='Baliza: elige un solar libre.';return false;}
  const nt=prCopy(src,c.x,c.y);if(!nt){S.msg='Baliza: ahí no se puede construir.';return false;}
  nt.holo=0;nt.holoM=0;nt.bph=src.bph;nt.inv=src.inv;nt.mode=src.mode;nt.mman=src.mman;for(const k of['kills','dmgD','chapa','xd'])if(src[k]!=null)nt[k]=src[k];if((S.bcnt||{})[nt.type]!=null)S.bcnt[nt.type]++;
  prRemove(src);nt.tpb=8;S.bcSrc=null;RS('beacon').n2++;S.fx.push({x:nt.x,y:nt.y,t:.6,m:.6,r:1.4*K,col:'#ff4fd8'});return true;}});
{const _m=move;move=function(e,dt){const r=_m.apply(this,arguments);if(r&&!isBoss(e)&&!e.hk&&S.phase==='wave'&&r3On('beacon')&&S.bcR!==S.round){S.bcR=S.round;const o=e.org||S.portals.reduce((a,p)=>h2F(p.x,p.y)>h2F(a.x,a.y)?p:a,S.portals[0]);
  S.fx.push({x:e.x,y:e.y,t:.5,m:.5,r:.9*K,col:'#ff4fd8'});e.x=e.tx=o.x;e.y=e.ty=o.y;e.fsp=0;S.fx.push({x:o.x,y:o.y,t:.5,m:.5,r:.9*K,col:'#ff4fd8'});RS('beacon').n++;S.msg='📍 La baliza ha devuelto a un enemigo a su portal.';return false;}return r;};}
{const _sp=spawnEnemy;spawnEnemy=function(t,p){const n=S.enemies.length;const r=_sp.apply(this,arguments);try{const e=S.enemies[S.enemies.length-1];if(S.enemies.length>n&&e&&!e.org)e.org={x:e.x,y:e.y};}catch(x){}return r;};}
// ---- daño, velocidad y tic ----
{const _m=e2DmgM;e2DmgM=function(e,src,ty){let m=_m.apply(this,arguments);try{if(src&&r3On('scouter')&&(ET[e.t].el||isBoss(e)))m*=1.2;if(r3On('gravity')&&e.fx&&e.fx.slow&&e.fx.slow.t>0)m*=1.15;}catch(x){}return m;};}
{const _s=stats;stats=function(t){const r=_s.apply(this,arguments);if(!t||typeof S==='undefined'||!S||!S.relics)return r;let d=1,rt=1;if(t.hero&&r3On('implant'))d*=1.1;if(t.tpb>0){rt*=1.5;d*=1.25;}return d!==1||rt!==1?Object.assign({},r,{dmg:r.dmg*d,rate:r.rate*rt}):r;};}
H2T.push(dt=>{hackTick(dt);droneTick(dt);radTick(dt);metTick(dt);satTick(dt);gravTick(dt);denseTick();
 for(const t of S.list)if(t.tpb>0)t.tpb-=dt;const H=S.hero;if(H){if(r3Act('implant')){H.bcd=Math.max(0,(H.bcd||0)-dt);H.ucd=Math.max(0,(H.ucd||0)-dt);}if(r3On('jetpack')&&H.s.hp<=0&&H.s.rt>0)H.s.rt-=dt*.43;}if(DRN.sh&&(DRN.sh.t-=dt)<=0)DRN.sh=null;});
{const _nr=nextRound;nextRound=function(){try{S.rads=[];S.mets=[];S.satX=null;S.sweep=null;S.grav=null;S.satT=0;for(const e of S.enemies){e.hk=0;}}catch(e){}return _nr.apply(this,arguments);};}
// ---- dibujo ----
H2D.push((g,lw)=>{const X=v=>v*CS+CS/2,now=performance.now()/1000;
 for(const z of S.rads||[]){const a=Math.min(1,z.t/1)*(z.big?.22:.16);g.fillStyle='rgba(190,240,60,'+a+')';g.strokeStyle='rgba(220,255,90,'+(a*2.5)+')';g.lineWidth=lw(1.5);g.beginPath();g.arc(X(z.x),X(z.y),z.r*CS,0,7);g.fill();g.stroke();
  if(z.big){g.fillStyle='rgba(30,30,0,'+(a*2)+')';g.font='bold '+Math.round(lw(16))+'px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('☢',X(z.x),X(z.y));}}
 if(S.grav){const G=S.grav;for(let i=0;i<3;i++){const k=((now*1.2+i/3)%1);g.strokeStyle='rgba(150,120,255,'+(.6*(1-k))+')';g.lineWidth=lw(2);g.beginPath();g.arc(X(G.x),X(G.y),G.r*CS*(1-k*.85),0,7);g.stroke();}g.fillStyle='rgba(80,60,160,.13)';g.beginPath();g.arc(X(G.x),X(G.y),G.r*CS,0,7);g.fill();}
 for(const m of S.mets||[]){const k=1-m.t/3;g.strokeStyle='rgba(255,120,60,'+(.5+.4*Math.sin(now*12))+')';g.lineWidth=lw(2);g.setLineDash([lw(6),lw(4)]);g.beginPath();g.arc(X(m.x),X(m.y),1.8*K*CS,0,7);g.stroke();g.setLineDash([]);
  const sx=X(m.x)+(1-k)*CS*14,sy=X(m.y)-(1-k)*CS*20;g.fillStyle='#ffb070';g.beginPath();g.arc(sx,sy,CS*(.5+k*.6),0,7);g.fill();g.strokeStyle='rgba(255,170,90,.6)';g.lineWidth=lw(5);g.beginPath();g.moveTo(sx,sy);g.lineTo(sx+CS*3,sy-CS*4.3);g.stroke();}
 if(S.satX){const X0=S.satX,p=.5+.5*Math.sin(now*14);g.strokeStyle='rgba(255,79,216,'+(.6+.4*p)+')';g.lineWidth=lw(2.5);g.beginPath();g.arc(X(X0.x),X(X0.y),.7*K*CS,0,7);g.stroke();g.beginPath();g.moveTo(X(X0.x)-K*CS,X(X0.y));g.lineTo(X(X0.x)+K*CS,X(X0.y));g.moveTo(X(X0.x),X(X0.y)-K*CS);g.lineTo(X(X0.x),X(X0.y)+K*CS);g.stroke();}
 if(S.sweep){const W=S.sweep,p=W.pts[Math.min(W.pts.length-1,W.i)];if(p){g.strokeStyle='rgba(255,79,216,.85)';g.lineWidth=lw(5);g.beginPath();g.moveTo(X(p.x),X(p.y)-CS*12);g.lineTo(X(p.x),X(p.y));g.stroke();g.fillStyle='rgba(255,220,250,.8)';g.beginPath();g.arc(X(p.x),X(p.y),CS*.9,0,7);g.fill();}}
 for(const e of S.enemies)if(e.hk>0&&e.hp>0&&!e.sw){const r=ET[e.t].r*CS;g.strokeStyle='rgba(120,255,120,.9)';g.lineWidth=lw(2);g.setLineDash([lw(3),lw(3)]);g.beginPath();g.arc(X(e.x),X(e.y),r*1.4,0,7);g.stroke();g.setLineDash([]);g.font=Math.round(Math.max(lw(10),r*.9))+'px sans-serif';g.textAlign='center';g.textBaseline='bottom';g.fillText('🦠',X(e.x),X(e.y)-r*1.3);}
 for(const t of S.list)if(t.tpb>0){g.strokeStyle='rgba(255,79,216,'+(.5+.4*Math.sin(now*10))+')';g.lineWidth=lw(2.5);g.strokeRect((t.x-1)*CS+lw(1),(t.y-1)*CS+lw(1),K*CS-lw(2),K*CS-lw(2));}
 if(DRN.p&&r3On('drone')){const p=DRN.p,px=X(p.x),py=X(p.y);if(DRN.sh){g.strokeStyle='rgba(255,230,150,.9)';g.lineWidth=lw(1.5);g.beginPath();g.moveTo(px,py);g.lineTo(X(DRN.sh.x),X(DRN.sh.y));g.stroke();}
  g.fillStyle='#5a6474';g.strokeStyle='#14101e';g.lineWidth=lw(1.5);g.fillRect(px-CS*.45,py-CS*.3,CS*.9,CS*.6);g.strokeRect(px-CS*.45,py-CS*.3,CS*.9,CS*.6);g.fillStyle='#3fe8ff';g.beginPath();g.arc(px,py,CS*.15,0,7);g.fill();
  g.strokeStyle='#9aa4b4';for(const sx of[-1,1]){const bx=px+sx*CS*.55,by=py-CS*.4;g.beginPath();g.moveTo(bx-CS*.25*Math.cos(now*30),by);g.lineTo(bx+CS*.25*Math.cos(now*30),by);g.stroke();}}});
