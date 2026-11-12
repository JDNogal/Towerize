// ---- v311 · Habilidades de las torres de evento (Nv 4): tres por torre, se compran con oro como las de las torres normales ----
// Faro arcano · Casas de los cerditos · Sede del Gremio · Mímico glotón · Dragón anciano. El Prototipo Omega queda para cuando su Nv 4 sea un héroe.
// Las torres de evento no tienen dos especializaciones: sus habilidades cuelgan directamente de la torre (UAB) y abIds(t) las devuelve a todo el juego.
const UAB={faro:['fflash','freveal','fconv'],straw:['sdry','sheavy','scrows'],wood:['wlogs','wsplint','wspin'],brick:['bwall','bspikes','bthrow'],
 guild:['gcontr','glegend','gbanner'],glut:['mengulf','mbite','mbelly'],dragon:['dscales','dbreath','droar']};
const BNRR=1,BNRA=15,HAYT=8,ENGCD=8,ROARR=2.5,DRHP=[0,0,150,220],DRREZ=15,DBRL=3,DBRT=4,DBRS=2,CROWCD=6,THROWCD=3,SPKTK=.5;
Object.assign(AB,{
 // Faro arcano
 fflash:{n:'Destello',ranks:[{c:220,cd:10},{c:150,cd:7}],txt:r=>`Cada <span class="cr">${r.cd} s</span>, las zonas de luz dan un fogonazo: los enemigos de dentro quedan ${kw('daze','desorientados','')} 0,5 s.`},
 freveal:{n:'Revelación',ranks:[{c:220,cr:.1},{c:150,cr:.2}],txt:r=>`Los enemigos dentro de la luz pierden el ${kw('camo','camuflaje','')} y quedan ${kw('mark','marcados','')}: <span class="cc">+${Math.round(r.cr*100)}%</span> de probabilidad de crítico contra ellos.`},
 fconv:{n:'Haz convergente',ranks:[{c:320,m:1.5}],txt:r=>`Donde se solapan las dos zonas de luz, sus mejoras ya no solo se suman: se multiplican por <span class="cd">${f(r.m)}</span>.`},
 // Casa de paja
 sdry:{n:'Paja seca',ranks:[{c:220,t:HAYT},{c:150,t:HAYT+6}],txt:r=>`Los fardos dejan paja seca en el suelo durante <span class="cr">${r.t} s</span>. Es ${kw('flam','inflamable','')}: si le llega fuego, arde y quema a quien esté dentro.`},
 sheavy:{n:'Fardos pesados',ranks:[{c:220,ar:.3,t:1},{c:150,ar:.6,t:2}],txt:r=>`Fardos más grandes: <span class="ca">+${Math.round(r.ar*100)}% de área</span> y la ralentización dura <span class="cr">${r.t} s</span> más.`},
 scrows:{n:'Bandada de cuervos',ranks:[{c:220,n:3},{c:150,n:5}],txt:r=>`Cada ${CROWCD} s, el cerdito espantapájaros suelta <b>${r.n} cuervos</b> contra los enemigos de su zona: picotean (poco daño) y aplican 1 stack de ${kw('bleed','sangrado','')}.`},
 // Casa de madera
 wlogs:{n:'Troncos gordos',ranks:[{c:220,t:1,m:.3},{c:150,t:2,m:.6}],txt:r=>`Troncos más gruesos: ruedan <span class="cr">${r.t} s</span> más (llegan más lejos) y hacen un <span class="cd">+${Math.round(r.m*100)}%</span> de daño. No empujan más.`},
 wsplint:{n:'Astillas',ranks:[{c:220,n:1},{c:150,n:2}],txt:r=>`Cada tronco aplica <b>${r.n}</b> ${r.n>1?'stacks':'stack'} de ${kw('bleed','sangrado','')} a los enemigos que arrolla.`},
 wspin:{n:'Hachazo giratorio',ranks:[{c:220,cd:8,m:2},{c:150,cd:6,m:3}],txt:r=>`Cada <span class="cr">${r.cd} s</span>, el cerdito leñador gira con el hacha y golpea a todos los enemigos a 1 casilla: <span class="cd">${f(r.m)}×</span> su daño.`},
 // Casa de ladrillo
 bwall:{n:'Muro reforzado',ranks:[{c:220,t:2},{c:150,t:4}],txt:r=>`Los muros aguantan <span class="cr">${r.t} s</span> más en pie.`},
 bspikes:{n:'Muro con pinchos',ranks:[{c:220,d:8},{c:150,d:16}],txt:r=>`Los enemigos frenados por un muro reciben <span class="cd">${r.d}</span> de daño físico por segundo.`},
 bthrow:{n:'Ladrillazo',ranks:[{c:220,a:5,mx:20},{c:150,a:8,mx:35}],txt:r=>`Cada ${THROWCD} s, el cerdito albañil lanza un ladrillo al enemigo más adelantado dentro del alcance de la casa (primero, a los frenados por un muro): poco daño y <span class="cph">−${r.a}</span> de ${kw('brk','armadura rota','')} (hasta −${r.mx}).`},
 // Sede del Gremio
 gcontr:{n:'Contratos lucrativos',ranks:[{c:200,m:.25},{c:140,m:.5},{c:140,m:.75}],txt:r=>`La recompensa por ronda del gremio sube un <span class="gd">+${Math.round(r.m*100)}%</span> y su botín pasa a <span class="gd">+${Math.round((.25+r.m)*100)}%</span> de oro por baja.`},
 glegend:{n:'Leyenda viva',ranks:[{c:320,m:1.5}],txt:r=>`El Renombre que gana el grupo sube a un <span class="cd">7,5% / 15% / 22,5%</span>, y un aventurero que cae solo pierde la mitad del suyo.`},
 gbanner:{n:'Abanderado',ranks:[{c:320,a:BNRA}],txt:r=>`Se une al grupo un <b>Abanderado</b>: su estandarte da <span class="cph">+${r.a} de armadura</span> y <span class="cmg">+${r.a} de resistencia mágica</span> a tus unidades y a tu héroe a ${cas(BNRR)} de él.`},
 // Mímico glotón
 mengulf:{n:'Engullir',ranks:[{c:220,t:2},{c:150,t:3},{c:150,t:4}],txt:r=>`Cada ${ENGCD} s se traga a un enemigo cercano y lo mastica dentro hasta <span class="cr">${r.t} s</span>. Si muere dentro, recarga en la mitad de tiempo; si no, lo escupe. A élites y jefes no se los traga: les da un bocado de <span class="cd">3×</span> y los empuja hacia atrás.`},
 mbite:{n:'Mordisco voraz',ranks:[{c:220,p:.01},{c:150,p:.02}],txt:r=>`Cada mordisco hace además un <span class="cd">${f(r.p*100)}%</span> de la vida máxima del objetivo como daño (hasta 4× su mordisco): casi nada contra los pequeños, mucho contra élites y jefes.`},
 mbelly:{n:'Estómago sin fondo',req:'mengulf',ranks:[{c:400,n:20},{c:300,n:15}],txt:r=>`Cada <b>${r.n}</b> enemigos que mueren dentro del Mímico, escupe un cofre: eliges una reliquia.`},
 // Dragón anciano
 dscales:{n:'Escamas de obsidiana',ranks:[{c:220,a:15},{c:150,a:30}],txt:r=>`El dragón gana <span class="cph">+${r.a} de armadura</span> y <span class="cmg">+${r.a} de resistencia mágica</span>.`},
 dbreath:{n:'Aliento abrasador',ranks:[{c:220,L:1.5,t:1,b:.25},{c:150,L:3,t:2,b:.5}],txt:r=>`La franja de fuego de su llamarada es <span class="ca">${f(r.L)} casillas</span> más larga, dura <span class="cr">${r.t} s</span> más y aplica un <span class="cd">+${Math.round(r.b*100)}%</span> de ${kw('burn','quemadura','')}.`},
 droar:{n:'Rugido',ranks:[{c:320,cd:15,t:1.5}],txt:r=>`Cada <span class="cr">${r.cd} s</span> ruge: los enemigos a ${f(ROARR)} casillas de su bandera quedan ${kw('fear','aterrados','')} ${f(r.t)} s (los jefes, la mitad).`}});
// al comprar una habilidad de torre de evento
function uabBought(t,id){if(!t)return;if(id==='gbanner')guildBanner(t);if(id==='mengulf'){t.eng=1;}if(id==='dscales'&&t.sd&&t.sd[0]&&t.sd[0].air){/* nada: las escamas se leen al vuelo */}}

// ================= Faro arcano =================
// Haz convergente: en el solape de las dos zonas, las mejoras ×1,5
{const _fb=faroBuff;faroBuff=function(t){if(t.hero||!S||!S.list)return null;let best=null;for(const f of S.list){if(!TW[f.type]||!TW[f.type].faro||f===t)continue;const L=FARO[(f.lvl||1)-1],m=faroIn(f,t);if(!m)continue;const cv=m>=2&&abRank(f,'fconv'),k=m*(cv?cv.m:1),b={rg:L.rg*k,d:L.d*k,c:Math.min(.6,L.c*k)};if(!best||b.rg>best.rg)best=b;}return best;};}
function faroAbTick(dt){for(const f of S.faros||[]){if(!uabOk(f))continue;const L=FARO[(f.lvl||1)-1],Z=faroZones(f),R=L.r*K,inZ=e=>Z.some(z=>Math.hypot(e.x-z.x,e.y-z.y)<=R);
  const rv=abRank(f,'freveal');if(rv)for(const e of S.enemies){if(e.hp<=0||!inZ(e))continue;if(ET[e.t].camo)e.rev=Math.max(e.rev||0,.3);e.mk={t:Math.max(.4,e.mk&&e.mk.t>0?e.mk.t:0),cr:Math.max(rv.cr,e.mk&&e.mk.t>0?e.mk.cr:0)};}
  const fl=abRank(f,'fflash');if(fl){f.flT=(f.flT===undefined?fl.cd:f.flT)-dt;if(f.flT<=0){let n=0;for(const e of S.enemies){if(e.hp<=0||!inZ(e))continue;stunE(e,.5);e.dz=Math.max(e.dz||0,.5);n++;}
    if(n){f.flT=fl.cd;for(const z of Z)(S.ufx=S.ufx||[]).push({k:'flash',x:z.x,y:z.y,t:.5,m:.5,r:R});try{sfx('ui');}catch(e){}}else f.flT=.4;}}}}

// ================= Casas de los cerditos =================
// proyectiles: los fardos de paja y los mordiscos del Mímico llevan sus extras; se aplican al impactar (uabProjHit)
function uabProj(p,t){try{if(!t||!TW[t.type]||!uabOk(t))return p;const T=TW[t.type];
  if(T.pig&&t.type==='straw'){const hv=abRank(t,'sheavy'),dr=abRank(t,'sdry');if(hv)p.slowt=(p.slowt||SLOWT)+hv.t;if(dr){p.uab=1;p.hay=dr.t;}}
  else if(T.glut){const b=abRank(t,'mbite');if(b&&p.e)p.dm+=Math.min(p.dm*4,p.e.max*b.p);}}catch(e){}return p;}
function uabProjHit(p){try{if(p.hay){const c=pathNear(p.x,p.y);if(c&&!(S.cz||[]).some(z=>z.k==='hay'&&Math.hypot(z.x-p.x,z.y-p.y)<.6*K))(S.cz=S.cz||[]).push({k:'hay',x:p.x,y:p.y,r:Math.max(p.area||0,.7*K),t:p.hay,m:0,src:p.src});}
  if(p.brk&&p.e&&p.e.hp>0)brkAdd(p.e,p.brk.a,p.brk.mx);
  if(p.crow&&p.e&&p.e.hp>0)addBleed(p.e,p.src,1);}catch(e){}}
// Fardos pesados: más área
{const _s=stats;stats=function(t){const s=_s.apply(this,arguments);try{if(t&&t.type==='straw'&&!t.pigU){const hv=abRank(t,'sheavy');if(hv)return Object.assign({},s,{area:s.area*(1+hv.ar)});}
  if(t&&t.type==='wood'&&!t.pigU){const g=abRank(t,'wlogs');if(g)return Object.assign({},s,{dmg:s.dmg*(1+g.m),ldur:(s.ldur||logDur(t.lvl))+g.t});}}catch(e){}return s;};}
// Casa de madera: troncos gordos y astillas
{const _l=logShot;logShot=function(t,tg,s,dm){const n0=(S.logs||[]).length,g=abRank(t,'wlogs'),sp=abRank(t,'wsplint');_l.apply(this,arguments);const L=S.logs&&S.logs.length>n0?S.logs[S.logs.length-1]:null;if(L){if(g)L.big=1;if(sp)L.bl=sp.n;}};}
// Casa de ladrillo: muros reforzados y con pinchos
{const _w=wallShot;wallShot=function(t,s,prog){const n0=S.barr.length;_w.apply(this,arguments);if(S.barr.length>n0){const b=S.barr[S.barr.length-1],rf=abRank(t,'bwall'),sk=abRank(t,'bspikes');b.src=t;if(rf)b.t+=rf.t;if(sk){b.spk=sk.d;b.tk=SPKTK;}}};}
const pigOf=t=>t&&t.pigT&&!t.pigT.off&&t.pigT.sd&&t.pigT.sd[0]&&t.pigT.sd[0].hp>0?t.pigT.sd[0]:null;
function pigsAbTick(dt){
 // pinchos: daño a los frenados por el muro
 for(const b of S.barr){if(!b.spk)continue;b.tk-=dt;if(b.tk>0)continue;b.tk+=SPKTK;for(const e of S.enemies)if(e.hp>0&&!isFly(e)&&segD(e.x+.5,e.y+.5,b.seg)<=1.1){hurt(e,b.spk*SPKTK,b.src,'phys',0);S.fx.push({x:e.x,y:e.y,t:.15,m:.15,r:.3*K,col:'#d8dee6'});}}
 for(const t of S.list){const T=TW[t.type];if(!T.pig||!uabOk(t))continue;const pg=pigOf(t),s=stats(t);
  if(t.type==='straw'){const cr=abRank(t,'scrows');if(cr&&pg){t.crT=(t.crT===undefined?2:t.crT)-dt;if(t.crT<=0){const f=t.flag||t,c=S.enemies.filter(e=>e.hp>0&&!(e.hk>0)&&Math.hypot(e.x-f.x,e.y-f.y)<=3*K);
     if(c.length){t.crT=CROWCD;const dm=PIGU.straw.dmg*.5;for(let i=0;i<cr.n;i++){const e=c[i%c.length];S.proj.push({x:pg.x+(Math.random()-.5),y:pg.y-.6-Math.random()*.6,e,tx:e.x,ty:e.y,vx:0,vy:0,dm,dt:'phys',src:t,sp:9+Math.random()*3,area:0,slow:0,pen:0,col:'#2a2a34',uab:1,crow:1});}}else t.crT=.5;}}}
  else if(t.type==='wood'){const sp=abRank(t,'wspin');if(sp&&pg){t.spT=(t.spT===undefined?sp.cd/2:t.spT)-dt;if(t.spT<=0){const R=1*K,c=S.enemies.filter(e=>e.hp>0&&!(e.hk>0)&&!isFly(e)&&Math.hypot(e.x-pg.x,e.y-pg.y)<=R);
     if(c.length){t.spT=sp.cd;const dm=PIGU.wood.dmg*sp.m;for(const e of c)hurt(e,dm,t.pigT,'phys',0);S.fx.push({x:pg.x,y:pg.y,t:.35,m:.35,r:R,col:'#e8dcc0'});(S.spins=S.spins||[]).push({x:pg.x,y:pg.y,t:.35,m:.35});}else t.spT=.3;}}}
  else if(t.type==='brick'){const th=abRank(t,'bthrow');if(th&&pg){t.thT=(t.thT===undefined?1:t.thT)-dt;if(t.thT<=0){let be=null,bs=-1;for(const e of S.enemies){if(e.hp<=0||e.hk>0||Math.hypot(e.x-t.x,e.y-t.y)>s.range)continue;
      const wl=!isFly(e)&&S.barr.some(b=>b.brick&&segD(e.x+.5,e.y+.5,b.seg)<=1.1)?1e6:0,f=S.field[e.ty]?S.field[e.ty][e.tx]:0,sc=wl+1e5-(f||0)-(brkOf(e)>=th.mx?5e5:0);if(sc>bs){bs=sc;be=e;}}
     if(be){t.thT=THROWCD;S.proj.push({x:pg.x,y:pg.y,e:be,tx:be.x,ty:be.y,vx:0,vy:0,dm:PIGU.brick.dmg,dt:'phys',src:t,sp:14,area:0,slow:0,pen:0,col:'#c05a3a',uab:1,brk:{a:th.a,mx:th.mx},brickP:1});}else t.thT=.4;}}}}
 if(S.spins)S.spins=S.spins.filter(o=>(o.t-=dt)>0);}

// ================= Sede del Gremio =================
CLS.flagb={n:'Abanderado',d:.5,rt:1,cr:0,hp:1.3,ap:10,sp:.9};
const guildParty=t=>PARTY[t.lvl].concat(t.lvl>=4&&abRank(t,'gbanner')?['flagb']:[]);
function guildBanner(t){if(!t.sd||t.sd.some(s=>s.cls==='flagb'))return;const U=TW[t.type].unit,m=U.hp*lvMods(t.type,t.lvl,null).hp*CLS.flagb.hp;t.sd.push({i:t.sd.length,x:t.x,y:t.y,hp:m,max:m,en:null,cd:0,rt:0,tw:t,lock:true,fight:false,cls:'flagb',rng:false});for(const s of t.sd)s.lock=true;}
// Abanderado y Escamas: armadura y resistencia mágica extra (auraAP suma a la armadura y es toda la resistencia mágica de una unidad)
{const _a=auraAP;auraAP=function(s){let b=_a.apply(this,arguments);try{let x=0;for(const t of S.list){if(!TW[t.type].guild||!t.sd)continue;const r=abRank(t,'gbanner');if(!r)continue;const q=t.sd.find(o=>o.cls==='flagb'&&o.hp>0);if(q&&Math.hypot(s.x-q.x,s.y-q.y)<=BNRR*K)x=Math.max(x,r.a);}
   if(s.air&&s.tw){const sc=abRank(s.tw,'dscales');if(sc)x+=sc.a;}b+=x;}catch(e){}return b;};}
// Contratos lucrativos: recompensa por ronda (el botín por baja se ajusta en update.js con guildLoot)
const guildLoot=src=>{if(!(src&&src.type&&TW[src.type]&&TW[src.type].guild))return 1;const r=abRank(src,'gcontr');return 1.25+(r?r.m:0);};
{const _rr=roundRewards;roundRewards=function(){try{for(const t of S.list)if(TW[t.type].guild){const r=abRank(t,'gcontr');if(r)goldEv(Math.round(([10,20,35,50][t.lvl-1]||10)*r.m));}}catch(e){}return _rr.apply(this,arguments);};}

// ================= Mímico glotón =================
const bigE=e=>!!(ET[e.t].el||isBoss(e));
function glutRelease(t,dead){const B=t.belly;if(!B)return;t.belly=null;const e=B.e;e.sw=0;e.hk=0;if(B.x!==undefined){e.x=B.x;e.y=B.y;}if(e.fx)delete e.fx.root;t.engT=dead?ENGCD/2:ENGCD;
 if(!dead&&e.hp>0){S.fx.push({x:e.x,y:e.y,t:.35,m:.35,r:.6*K,col:'#e05a6a'});S.fx.push({line:[t.x,t.y,e.x,e.y],col:'#e05a6a',t:.2,m:.2});}}
function glutAbTick(dt){for(const t of S.list){if(!TW[t.type].glut||!uabOk(t))continue;const en=abRank(t,'mengulf');if(!en){if(t.belly)glutRelease(t,false);continue;}const s=stats(t);
  const dig=()=>{t.dig=(t.dig||0)+1;glutRelease(t,true);const bl=abRank(t,'mbelly');if(bl&&t.dig>=bl.n){t.dig-=bl.n;S.fx.push({x:t.x,y:t.y,t:.8,m:.8,r:1.6*K,col:'#ffd84a'});S.msg='¡El Mímico glotón escupe un cofre!';try{sfx('coin');}catch(x){}setTimeout(()=>{try{openRelic();}catch(x){}},0);}};
  if(t.belly){const B=t.belly,e=B.e;if(e.hp<=0){dig();continue;}if(!S.enemies.includes(e)){t.belly=null;t.engT=ENGCD;continue;}
   B.t-=dt;e.fx.root={t:.3};e.hk=1;e.x=t.x;e.y=t.y;t.cd=Math.max(t.cd,.25);B.cd-=dt;
   while(B.cd<=0&&e.hp>0){B.cd+=1/s.rate;const b=abRank(t,'mbite'),dm=s.dmg+(b?Math.min(s.dmg*4,e.max*b.p):0);HKD=1;try{hurt(e,dm,t,'phys',s.pen);}finally{HKD=0;}}
   if(e.hp<=0)dig();else if(B.t<=0)glutRelease(t,false);continue;}
  t.engT=(t.engT===undefined?2:t.engT)-dt;if(t.engT>0)continue;
  let best=null,bs=-1;const exp=s.dmg*s.rate*en.t;for(const e of S.enemies){if(e.hp<=0||e.hk>0||e.sw||e.leak||Math.hypot(e.x-t.x,e.y-t.y)>s.range||(typeof camoHid==='function'&&camoHid(e,t)))continue;const sc=bigE(e)?1:(e.hp<=exp?1e6:1e3)+e.hp;if(sc>bs){bs=sc;best=e;}}
  if(!best){t.engT=.3;continue;}
  S.fx.push({line:[t.x,t.y,best.x,best.y],col:'#e8607a',t:.25,m:.25});
  if(bigE(best)){const b=abRank(t,'mbite');hurt(best,s.dmg*3+(b?Math.min(s.dmg*4,best.max*b.p):0),t,'phys',s.pen);if(best.hp>0)knock(best,.5*K);S.fx.push({x:best.x,y:best.y,t:.3,m:.3,r:.7*K,col:'#e05a6a'});t.engT=ENGCD;continue;}
  best.sw=1;best.hk=1;best.fx.root={t:.3};best.tgt=null;t.belly={e:best,t:en.t,cd:0,x:best.x,y:best.y};best.x=t.x;best.y=t.y;for(const o of S.list)if(o.tgt===best)o.tgt=null;for(const u of unitTowers())for(const q of u.sd||[]){if(q.en===best){q.en=null;q.fight=false;}if(q.en2===best)q.en2=null;}}}

// ================= Dragón =================
// Adulto y anciano vuelan: ahora tienen vida y solo pueden dañarlos los enemigos a distancia (como decía su ficha). Si cae, vuelve al nido y reaparece.
function dragonAir(t){if(!t.fly)return null;let s=t.sd&&t.sd[0];if(!s||!s.air){const m=DRHP[Math.min(3,t.stage||2)]||150;s={i:0,x:t.x,y:t.y,hp:m,max:m,en:null,cd:0,rt:0,tw:t,lock:true,fight:false,air:1};t.sd=[s];}
 const m=DRHP[Math.min(3,t.stage||2)]||150;if(s.max!==m){s.hp=s.hp>0?s.hp+(m-s.max):s.hp;s.max=m;}return s;}
const dragonUp=t=>{const s=t.sd&&t.sd[0];return !(s&&s.air)||s.hp>0;};
// centro del camino a lo largo de una franja (para que el anciano la recorra en línea)
function stripLine(cells){const by=new Map();for(const c of cells){const f=S.field[c.y][c.x];if(!by.has(f))by.set(f,[0,0,0]);const a=by.get(f);a[0]+=c.x;a[1]+=c.y;a[2]++;}return [...by.keys()].sort((a,b)=>a-b).map(f=>{const a=by.get(f);return[a[0]/a[2],a[1]/a[2]];});}
// Llamarada del anciano: pasa en línea recta sobre el camino y deja una franja de fuego a todo lo ancho (el mismo sistema que los charcos en franja)
function dragonBreath(t,fx,fy,tg){const br=abRank(t,'dbreath'),L=(DBRL+(br?br.L:0))*K,cells=stripCells(tg.x,tg.y,L);if(!cells.length)return;
 const bm=1+(br?br.b:0),all=cells.slice().sort((a,b)=>S.field[a.y][a.x]-S.field[b.y][b.x]),pts=stripLine(cells);
 const z=addStrip({cells:[],t:DBRT+(br?br.t:0),src:t,burn:DBRS*bm,fire:1});
 t.fly.pass={pts:pts.length>1?pts:[[fx,fy],pts[0]||[tg.x,tg.y]],k:0,T:Math.max(.6,pts.length*.07),z,all,i:0,n0:DBRN*bm};dragonLay(t,0);}
// extiende la franja hasta donde ha llegado el dragón (k de 0 a 1) y prende a los enemigos de las celdas nuevas
function dragonLay(t,k){const P=t.fly&&t.fly.pass;if(!P||!P.z)return;const n=Math.min(P.all.length,Math.ceil(k*P.all.length)+1),nw=new Set();while(P.i<n){const c=P.all[P.i++],q=c.x+','+c.y;P.z.cells.push(c);P.z.set.add(q);nw.add(q);}
 if(nw.size)for(const e of S.enemies)if(e.hp>0&&!isFly(e)&&nw.has(Math.round(e.x)+','+Math.round(e.y)))addBurn(e,t,P.n0);}
function dragonAdults(dt){for(const t of S.list){if(!t.fly||!t.flag)continue;const sa=dragonAir(t);
  if(sa.hp<=0){if(t.fly.pass)dragonLay(t,1);if(!sa.dz){sa.dz=1;sa.rt=DRREZ;sa.en=null;S.fx.push({x:t.fly.x,y:t.fly.y,t:.6,m:.6,r:1.4*K,col:'#ff7a2e'});S.msg='Tu dragón ha caído: vuelve al nido a recuperarse.';}t.fly.pass=null;t.fly.x=t.x;t.fly.y=t.y;sa.x=t.x;sa.y=t.y;continue;}
  sa.dz=0;t.fly.a+=dt*1.2;const cx=t.flag.x+Math.cos(t.fly.a)*1.5*K,cy=t.flag.y+Math.sin(t.fly.a)*1.5*K;let fx=cx,fy=cy;
  const P=t.fly.pass;if(P){P.k+=dt/P.T;dragonLay(t,Math.min(1,P.k));if(P.k>=1){t.fly.pass=null;t.fly.back=.35;t.fly.bx=P.pts[P.pts.length-1][0];t.fly.by=P.pts[P.pts.length-1][1];}else{const u=P.k*(P.pts.length-1),i=Math.min(P.pts.length-2,Math.floor(u)),w=u-i;fx=P.pts[i][0]+(P.pts[i+1][0]-P.pts[i][0])*w;fy=P.pts[i][1]+(P.pts[i+1][1]-P.pts[i][1])*w;}}
  if(!t.fly.pass&&t.fly.back>0){t.fly.back-=dt;const w=Math.max(0,t.fly.back/.35);fx=cx+(t.fly.bx-cx)*w;fy=cy+(t.fly.by-cy)*w;}
  t.fly.x=fx;t.fly.y=fy;sa.x=fx;sa.y=fy;sa.lock=true;sa.en=null;sa.fight=false;
  // Rugido
  const ro=uabOk(t)&&abRank(t,'droar');if(ro){t.roT=(t.roT===undefined?ro.cd/2:t.roT)-dt;if(t.roT<=0){const c=S.enemies.filter(e=>e.hp>0&&!(e.hk>0)&&Math.hypot(e.x-t.flag.x,e.y-t.flag.y)<=ROARR*K);if(c.length){t.roT=ro.cd;for(const e of c){const d=isBoss(e)?ro.t*BOSSRES:ro.t;e.fx.fear={t:Math.max(d,e.fx.fear?e.fx.fear.t:0)};}(S.ufx=S.ufx||[]).push({k:'roar',x:t.flag.x,y:t.flag.y,t:.8,m:.8,r:ROARR*K});try{sfx('roar');}catch(e){}}else t.roT=.5;}}
  if(t.fly.pass)continue;
  t.fly.cd-=dt;if(t.fly.cd>0)continue;let tg=null,bd=3.5*K;for(const e of S.enemies)if(e.hp>0&&!(e.hk>0)){const d=Math.hypot(e.x-fx,e.y-fy);if(d<=bd){bd=d;tg=e;}}if(!tg){t.fly.cd=0;continue;}
  t.fly.cd=1.5;const st=stats(t),crit=Math.random()<st.crit+mkB(tg),old=t.stage>=3;S.proj.push({x:fx,y:fy,e:tg,tx:tg.x,ty:tg.y,vx:0,vy:0,dm:(old?22:18)*(crit?st.critm:1),dt:'elem',src:t,sp:10,area:old?1.2*K:K,slow:0,pen:0,col:'#ff6a2e',crit});
  if(old){t.fly.br=(t.fly.br===undefined?2:t.fly.br)-1.5;if(t.fly.br<=0){t.fly.br=DBRCD;dragonBreath(t,fx,fy,tg);}}}}

// filas de la ficha del dragón volador (vida, armadura, reaparición)
function dragRows(t,sg,src){const sc=t&&abRank(t,'dscales'),a=sc?sc.a:0,s=t&&t.sd&&t.sd[0]&&t.sd[0].air?t.sd[0]:null;
 return R('chp',kst('uhp','Vida',src),s&&s.hp>0&&s.hp<s.max?Math.ceil(s.hp)+' / '+DRHP[sg]:DRHP[sg])+R('cph',kst('aphys','Armadura',src),TW.dragon.unit.ap+a)+(a?R('cmg',kst('umr','Resistencia mágica',src),a):'')+R('cr','Reaparece',DRREZ+' s');}
// habilidades en la ficha de una torre de evento: en partida, con sus botones; en el compendio (Nv Máx), la lista con precios
function uabSheet(t,k,CL,lvo,pin){if(!UAB[k])return '';
 if(t&&!lvo){if(!uabOk(t))return '';t.ab=t.ab||{};t.acd=t.acd||{};return '<div style="margin-top:8px"><b>Habilidades</b></div>'+abListIds(UAB[k],t,pin);}
 return CL>=4?'<div style="margin-top:8px"><b>Habilidades</b> <small style="display:inline">· se compran con oro</small></div>'+abListIds(UAB[k],null,false):'';}

// ================= bucle y dibujo =================
let UABERR=null;
function uabTick(dt){if(S&&S.ufx&&S.ufx.length)S.ufx=S.ufx.filter(o=>(o.t-=dt)>0);if(!S||S.phase!=='wave'){if(S&&S.list)for(const t of S.list)if(t.belly)glutRelease(t,false);return;}faroAbTick(dt);pigsAbTick(dt);glutAbTick(dt);}
{const _t=e2TowersTick;e2TowersTick=function(dt){const r=_t.apply(this,arguments);try{uabTick(dt);}catch(e){if(!UABERR){UABERR=e;console.error(e);}}return r;};}
{const _nr=nextRound;nextRound=function(){try{S.spins=[];S.ufx=[];for(const t of S.list){if(t.belly)glutRelease(t,false);if(t.fly){t.fly.pass=null;t.fly.back=0;const s=t.sd&&t.sd[0];if(s&&s.air){s.hp=s.max;s.rt=0;}}}for(const e of S.enemies)e.sw=0;}catch(e){}return _nr.apply(this,arguments);};}
function uabDraw(lw){const X=v=>v*CS+CS/2,now=performance.now()/1000,BCS=K*CS;
 for(const o of S.ufx||[]){const k=1-o.t/o.m,px=X(o.x),py=X(o.y),R=o.r*CS;
  if(o.k==='flash'){const gr=g.createRadialGradient(px,py,0,px,py,R);gr.addColorStop(0,'rgba(255,250,215,'+.5*(1-k)+')');gr.addColorStop(1,'rgba(255,236,150,'+.12*(1-k)+')');g.fillStyle=gr;g.beginPath();g.arc(px,py,R,0,7);g.fill();g.strokeStyle='rgba(255,246,200,'+(1-k)+')';g.lineWidth=lw(3);g.beginPath();g.arc(px,py,R*(.25+.75*k),0,7);g.stroke();}
  else if(o.k==='roar'){for(let i=0;i<3;i++){const q=k-i*.18;if(q<=0||q>=1)continue;g.strokeStyle='rgba(255,176,138,'+(1-q)+')';g.lineWidth=lw(3.5);g.beginPath();g.arc(px,py,R*q,0,7);g.stroke();}}}
 // paja seca en el suelo
 for(const z of S.cz||[]){if(z.k!=='hay')continue;const a=Math.min(.8,z.t/1.5);g.fillStyle='rgba(224,192,96,'+a*.55+')';g.beginPath();g.arc(X(z.x),X(z.y),z.r*CS,0,7);g.fill();g.strokeStyle='rgba(168,138,64,'+a+')';g.lineWidth=lw(1.2);for(let i=0;i<9;i++){const an=i*2.4+z.x,rr=z.r*CS*(.25+.6*((i*37)%10)/10),px=X(z.x)+Math.cos(an)*rr,py=X(z.y)+Math.sin(an)*rr;g.beginPath();g.moveTo(px-CS*.22,py-CS*.08);g.lineTo(px+CS*.22,py+CS*.08);g.stroke();}}
 // pinchos del muro
 for(const b of S.barr){if(!b.spk||!b.seg)continue;const[x1,y1,x2,y2]=b.seg,dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy)||1,nx=-dy/L,ny=dx/L;g.fillStyle='#d8dee6';g.strokeStyle='#1b1712';g.lineWidth=lw(1);
  for(let i=0;i<5;i++){const u=(i+.5)/5,px=(x1+dx*u)*CS,py=(y1+dy*u)*CS,w=CS*.2;for(const sg of[-1,1]){g.beginPath();g.moveTo(px-dx/L*w+nx*sg*CS*.5,py-dy/L*w+ny*sg*CS*.5);g.lineTo(px+nx*sg*CS*.95,py+ny*sg*CS*.95);g.lineTo(px+dx/L*w+nx*sg*CS*.5,py+dy/L*w+ny*sg*CS*.5);g.closePath();g.fill();g.stroke();}}}
 // giro del leñador
 for(const o of S.spins||[]){const k=1-o.t/o.m;g.strokeStyle='rgba(255,244,220,'+(1-k)+')';g.lineWidth=lw(3);g.beginPath();g.arc(X(o.x),X(o.y),K*CS*.95,k*9,k*9+4.4);g.stroke();}
 // cuervos y ladrillos al vuelo
 for(const p of S.proj){if(p.crow){const px=X(p.x),py=X(p.y),w=CS*.42,fl=Math.sin(now*22+p.sp)*.5;g.strokeStyle='#1b1712';g.lineWidth=lw(2.6);g.beginPath();g.moveTo(px-w,py-w*(.3+fl));g.lineTo(px,py);g.lineTo(px+w,py-w*(.3+fl));g.stroke();g.fillStyle='#2a2a34';g.beginPath();g.arc(px,py,CS*.16,0,7);g.fill();}
  else if(p.brickP){const px=X(p.x),py=X(p.y);g.save();g.translate(px,py);g.rotate(now*9);g.fillStyle='#c05a3a';g.strokeStyle='#1b1712';g.lineWidth=lw(1.2);g.fillRect(-CS*.3,-CS*.16,CS*.6,CS*.32);g.strokeRect(-CS*.3,-CS*.16,CS*.6,CS*.32);g.restore();}}
 for(const t of S.list){const T=TW[t.type];
  // Mímico con la boca llena
  if(T.glut&&t.belly){const B=t.belly,px=X(t.x),py=X(t.y),k=.5+.5*Math.sin(now*12);g.strokeStyle='rgba(224,90,106,.9)';g.lineWidth=lw(2.5);g.beginPath();g.arc(px,py,BCS*(.5+.05*k),0,7);g.stroke();const E=ET[B.e.t];g.fillStyle=E.col;g.strokeStyle='#1b1712';g.lineWidth=lw(1.2);g.beginPath();g.arc(px,py-BCS*.62,CS*.42,0,7);g.fill();g.stroke();try{if(enIc(B.e.t))enIcDraw(g,B.e.t,px,py-BCS*.62,CS*.3);}catch(e){}
   const hp=Math.max(0,B.e.hp/B.e.max);g.fillStyle='rgba(0,0,0,.5)';g.fillRect(px-CS*.6,py-BCS*.62-CS*.7,CS*1.2,lw(3));g.fillStyle='#e0453a';g.fillRect(px-CS*.6,py-BCS*.62-CS*.7,CS*1.2*hp,lw(3));}
  // Abanderado: estandarte y aura
  if(T.guild&&t.sd){const q=t.sd.find(o=>o.cls==='flagb'&&o.hp>0);if(q){const px=X(q.x),py=X(q.y);g.strokeStyle='rgba(91,141,239,.55)';g.fillStyle='rgba(91,141,239,.08)';g.lineWidth=lw(1.2);g.setLineDash([lw(4),lw(4)]);g.beginPath();g.arc(px,py,BNRR*K*CS,0,7);g.fill();g.stroke();g.setLineDash([]);
    g.strokeStyle='#7a4a24';g.lineWidth=lw(2);g.beginPath();g.moveTo(px,py);g.lineTo(px,py-CS*1.7);g.stroke();g.fillStyle='#3a6ad8';g.strokeStyle='#1b1712';g.lineWidth=lw(1);g.beginPath();g.moveTo(px-CS*.42,py-CS*1.7);g.lineTo(px+CS*.42,py-CS*1.7);g.lineTo(px+CS*.42,py-CS*.75);g.lineTo(px,py-CS*.95);g.lineTo(px-CS*.42,py-CS*.75);g.closePath();g.fill();g.stroke();g.fillStyle='#ffd84a';g.beginPath();g.moveTo(px-CS*.2,py-CS*1.5);g.lineTo(px+CS*.2,py-CS*1.5);g.lineTo(px+CS*.2,py-CS*1.25);g.lineTo(px,py-CS*1.05);g.lineTo(px-CS*.2,py-CS*1.25);g.closePath();g.fill();g.stroke();}}
  // dragón caído: cuenta atrás sobre el nido
  if(t.fly){const s=t.sd&&t.sd[0];if(s&&s.air&&s.hp<=0&&s.rt>0){const px=X(t.x),py=X(t.y);g.font='800 '+Math.round(CS*1.5)+'px system-ui,sans-serif';g.textAlign='center';g.textBaseline='middle';g.lineWidth=lw(3);g.strokeStyle='rgba(0,0,0,.8)';g.strokeText(Math.ceil(s.rt),px,py);g.fillStyle='#fff';g.fillText(Math.ceil(s.rt),px,py);}}
  // vida del dragón volador
  if(t.fly&&t.fly.x!==undefined){const s=t.sd&&t.sd[0];if(s&&s.air&&s.hp>0&&s.hp<s.max){const px=X(t.fly.x),py=X(t.fly.y)-CS*1.9,w=CS*2;g.fillStyle='rgba(0,0,0,.5)';g.fillRect(px-w/2,py,w,lw(3));g.fillStyle='#5ce05a';g.fillRect(px-w/2,py,w*s.hp/s.max,lw(3));}}}}
{const _d=e2DrawWorld;e2DrawWorld=function(lw){const r=_d.apply(this,arguments);try{uabDraw(lw);}catch(e){if(!UABERR){UABERR=e;console.error(e);}}return r;};}
// palabras clave
E2KW.daze=()=>'<b>Desorientado</b>'+R('','Duración','0,4 – 0,5 s')+'<small>El enemigo queda aturdido un instante, y el siguiente golpe directo que reciba hará un 50% más de daño. Lo provocan la onda de la Torre sónica gigante y el Destello del Faro arcano.</small>';
try{MECUSE.daze=(MECUSE.daze||[]).concat(['tw:faro']);MECUSE.flam=(MECUSE.flam||[]).concat(['tw:straw']);MECUSE.brk=(MECUSE.brk||[]).concat(['tw:brick']);MECUSE.bleed=(MECUSE.bleed||[]).concat(['tw:wood','tw:straw']);MECUSE.fear=(MECUSE.fear||[]).concat(['tw:dragon']);MECUSE.mark=(MECUSE.mark||[]).concat(['tw:faro']);}catch(e){}
