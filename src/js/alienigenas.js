// ==================== v305 · Criaturas alienígenas (era 2 · Unidades · se desbloquea al ganar con Korr) ====================
// La primera torre de enjambre: muchas criaturas pequeñas y frágiles, daño mágico. 4 en Nv 1, 5 en Nv 2 y 6 en Nv 3.
// Simbiosis: cada golpe les cura un 15 % del daño que hacen.
// · Colmena: 8 criaturas. Larvas (al morir suelta larvas), Puesta (nacen criaturas extra cada cierto tiempo) y Corrosión del enjambre
//   (cada criatura que muerde al mismo enemigo le quita resistencia mágica; puede quedar negativa).
// · Depredadores: solo quedan las 3 más fuertes, grandes y con corpulencia 2. Devorar, Emboscada y Frenesí.
const ALS='#2a3a34';
const ALSVG={
 nest:`<svg viewBox="0 0 64 64"><ellipse cx="32" cy="54" rx="26" ry="7" fill="#5a3a6a" stroke="${ALS}" stroke-width="2"/><ellipse cx="20" cy="38" rx="10" ry="14" fill="#7ad6c4" stroke="${ALS}" stroke-width="2"/><ellipse cx="44" cy="38" rx="10" ry="14" fill="#7ad6c4" stroke="${ALS}" stroke-width="2"/><ellipse cx="32" cy="30" rx="12" ry="17" fill="#3fc9b0" stroke="${ALS}" stroke-width="2"/><path d="M26 22 Q32 18 38 22 M25 32 Q32 28 39 32" stroke="#2a9a88" stroke-width="2" fill="none"/><circle cx="32" cy="30" r="4" fill="#ffcf3a" opacity=".85"/></svg>`,
 crit:`<svg viewBox="0 0 64 64"><ellipse cx="32" cy="40" rx="18" ry="14" fill="#3fc9b0" stroke="${ALS}" stroke-width="2"/><path d="M16 46 L8 56 M22 50 L18 60 M42 50 L46 60 M48 46 L56 56" stroke="${ALS}" stroke-width="3" stroke-linecap="round"/><path d="M24 28 Q20 16 14 14 M40 28 Q44 16 50 14" stroke="${ALS}" stroke-width="2.4" fill="none" stroke-linecap="round"/><circle cx="26" cy="36" r="4" fill="#ffcf3a" stroke="${ALS}" stroke-width="1.5"/><circle cx="38" cy="36" r="4" fill="#ffcf3a" stroke="${ALS}" stroke-width="1.5"/><path d="M27 46 L30 49 L32 46 L34 49 L37 46" stroke="${ALS}" stroke-width="1.8" fill="none"/></svg>`,
 // larva: las rayas no tocan el borde negro
 larva:`<svg viewBox="0 0 64 64"><path d="M12 44 Q12 32 22 34 Q26 26 34 32 Q42 26 48 34 Q56 34 54 44 Q52 52 32 52 Q14 52 12 44Z" fill="#9ae6d6" stroke="${ALS}" stroke-width="2"/><path d="M23 38 L24.5 47 M34 35.5 L34 48 M44.5 38 L43 47" stroke="#2a9a88" stroke-width="1.6" stroke-linecap="round"/><circle cx="50" cy="40" r="2.6" fill="#ffcf3a" stroke="${ALS}" stroke-width="1.2"/></svg>`,
 pred:`<svg viewBox="0 0 64 64"><path d="M10 40 Q10 22 32 20 Q54 22 54 40 Q54 54 32 56 Q10 54 10 40Z" fill="#2a9a88" stroke="${ALS}" stroke-width="2"/><path d="M14 24 Q8 12 4 10 M50 24 Q56 12 60 10 M20 20 Q18 8 22 4 M44 20 Q46 8 42 4" stroke="${ALS}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M18 30 L26 34 M46 30 L38 34" stroke="${ALS}" stroke-width="2.5"/><ellipse cx="24" cy="38" rx="4" ry="3" fill="#ff5a3a" stroke="${ALS}" stroke-width="1.5"/><ellipse cx="40" cy="38" rx="4" ry="3" fill="#ff5a3a" stroke="${ALS}" stroke-width="1.5"/><path d="M20 46 L24 52 L28 46 L32 52 L36 46 L40 52 L44 46" stroke="#f4ecd6" stroke-width="2" fill="none"/><path d="M14 50 L6 60 M50 50 L58 60" stroke="${ALS}" stroke-width="3.4" stroke-linecap="round"/></svg>`};
TW.alien={n:'Criaturas alienígenas',ic:'🥚',icsvg:ALSVG.nest,dt:'magic',udt:'magic',era:2,cost:90,range:2.5,dmg:3,rate:1.2,unit:{n:4,hp:18,ap:0,rez:6,spd:2.4},col:'#3fb89c',l:'J',fx:'Simbiosis',alien:1};
TW.alien.range*=K;TW.alien.unit.spd*=K;/* las torres se definen en casillas y el juego trabaja en celdas (×K): las que se añaden tarde lo hacen a mano */
UNAME.alien=['Criatura'];UIC.alien={img:ALSVG.crit};UIC.pred={img:ALSVG.pred};
const ALN=[0,4,5,6],ALHIVE=8,ALSYM=.15;
CLS.pred={n:'Depredador',d:2.6,rt:.9,cr:.05,hp:3.2,ap:5};CLS.larva={n:'Larva',d:.5,rt:1,cr:0,hp:.4,ap:0};
SPECS.alien={
 hive:{n:'Colmena',ic:'🥚',col:'#3fc9b0',lv:{dmg:L4D*.85,cd:.7,range:1.2,area:1.3,hp:L4H*.9,pen:0},ab:['larva','brood','swcor'],d:'El enjambre crece: 8 criaturas. Se multiplican y desgastan entre todas la resistencia mágica de los enemigos grandes.'},
 pred:{n:'Depredadores',ic:'🦖',col:'#2a9a88',lv:{dmg:L4D*1.2,cd:.7,range:1.2,area:1.3,hp:L4H*1.2,pen:0},ab:['devour','ambush','frenzy'],d:'Solo sobreviven las 3 más fuertes: mucho más grandes, con más vida y daño, y corpulencia 2.'}};
Object.assign(AB,{
 larva:{n:'Larvas',ranks:[{c:30,n:2,t:6},{c:40,n:2,t:10},{c:50,n:3,t:10}],txt:r=>`Al morir, cada criatura suelta <b>${r.n} larvas</b> que pelean <span class="cr">${r.t} s</span> (con menos vida y daño).`},
 brood:{n:'Puesta',ranks:[{c:35,n:2,cd:10},{c:45,n:4,cd:10},{c:55,n:4,cd:7}],txt:r=>`Cada <span class="cr">${r.cd} s</span> nace una criatura extra, hasta <b>${r.n} más</b> que el grupo. Las extra no reaparecen al morir.`},
 swcor:{n:'Corrosión del enjambre',ranks:[{c:35,a:6},{c:45,a:9},{c:55,a:12}],txt:r=>`Cada criatura que muerde al mismo enemigo le quita <span class="cmg">${r.a}</span> de resistencia mágica mientras siga encima (puede quedar negativa).`},
 devour:{n:'Devorar',ranks:[{c:35,p:.15},{c:45,p:.2},{c:55,p:.25}],txt:r=>`Si el enemigo baja del <span class="cd">${Math.round(r.p*100)}%</span> de vida (élites y jefes no), se lo comen de golpe y se curan la mitad de su vida.`},
 ambush:{n:'Emboscada',ranks:[{c:40,cd:9,st:.6},{c:50,cd:6,st:1}],txt:r=>`Cada <span class="cr">${r.cd} s</span>, un depredador salta sobre un enemigo a su alcance, le hace el doble de daño y lo aturde <span class="cr">${f(r.st)} s</span>.`},
 frenzy:{n:'Frenesí',ranks:[{c:35,m:.15},{c:45,m:.2},{c:55,m:.25}],txt:r=>`Al matar, ataca un <span class="cr">${Math.round(r.m*100)}%</span> más rápido durante 4 s (se acumula hasta 3 veces).`}});
// v305: el coste de sus habilidades se escala con el de la torre, como en todas las demás (se definían después del ajuste general y salían unas 6 veces más baratas)
{const r5=v=>Math.round(v/5)*5,b=TW.alien.cost;for(const sp of Object.values(SPECS.alien||{}))for(const a of sp.ab){const R=AB[a]&&AB[a].ranks;if(!R)continue;R.forEach((r,k)=>{r.c=R.length===1?r5(b*4.2):k===0?r5(b*2.8):r5(b*1.9);});}}
// ---- cuántas criaturas toca tener ----
const alienN=t=>t.spec==='pred'?3:t.spec==='hive'?ALHIVE:ALN[Math.min(3,t.lvl||1)];
function alienSync(t){if(!t||t.type!=='alien'||!t.sd)return;const want=alienN(t),base=t.sd.filter(s=>!s.lar&&!s.xtr);
 t.uov={...TW.alien.unit,n:want};
 while(base.length<want){const s={i:0,x:t.x,y:t.y,hp:sdHp(t),max:sdHp(t),en:null,cd:0,rt:0,tw:t,lock:true,fight:false};if(t.spec==='pred')alienPred(s,t);t.sd.push(s);base.push(s);}
 if(base.length>want){/* evolución: solo quedan las más fuertes (más vida) */const keep=[...base].sort((a,b)=>Math.max(0,b.hp)-Math.max(0,a.hp)).slice(0,want);for(const s of base)if(!keep.includes(s)){s.en=null;s.fight=false;}t.sd=t.sd.filter(s=>keep.includes(s)||s.lar||s.xtr);}
 if(t.spec==='pred')for(const s of t.sd)if(!s.lar)alienPred(s,t);
 t.sd.forEach((s,i)=>s.i=i);}
function alienPred(s,t){s.pred=1;s.cls='pred';s.wt=2;s.uic=UIC.pred;const m=sdHp(t)*CLS.pred.hp;if(Math.abs(s.max-m)<.01)return;s.hp=s.hp>0?m*(s.hp/Math.max(1,s.max)):s.hp;s.max=m;}
{const _m=mkSoldiers;mkSoldiers=function(t){const r=_m.apply(this,arguments);try{alienSync(t);}catch(e){}return r;};}
{const _u=upgrade;upgrade=function(t){const r=_u.apply(this,arguments);try{alienSync(t);}catch(e){}return r;};}
{const _l=lvUp;lvUp=function(t){const r=_l.apply(this,arguments);try{alienSync(t);}catch(e){}return r;};}
{const _c=chooseSpec;chooseSpec=function(t,sp){const r=_c.apply(this,arguments);try{if(t&&t.type==='alien'&&t.spec===sp)alienSync(t);}catch(e){}return r;};}
// los depredadores reaparecen con su vida de depredador
// ---- golpe de una criatura: simbiosis, devorar, frenesí ----
function alienHit(t,s,e,dh){if(!s||s.hp<=0)return;s.hp=Math.min(s.max,s.hp+dh*ALSYM);
 if(t.spec==='pred'&&!s.lar){const dv=abRank(t,'devour');if(dv&&e.hp>0&&!ET[e.t].el&&!isBoss(e)&&e.hp<=e.max*dv.p){hurt(e,e.hp+1,t,'pure');s.hp=Math.min(s.max,s.hp+s.max*.5);S.fx.push({x:e.x,y:e.y,t:.4,m:.4,r:.7*K,col:'#3fc9b0'});(S.st||{}).dev=((S.st||{}).dev||0)+1;}
  const fz=abRank(t,'frenzy');if(fz&&e.hp<=0){s.frzN=Math.min(3,(s.frzN||0)+1);s.frz=4;s.rtm=1+fz.m*s.frzN;}}}
// ---- al morir: larvas (las larvas y las extra no reaparecen) ----
{const _u=unitDeath;unitDeath=function(t,s){const r=_u.apply(this,arguments);try{if(t&&t.type==='alien'&&s&&!s.lar&&t.spec==='hive'&&!S.pvE){const lv=abRank(t,'larva');if(lv)for(let k=0;k<lv.n;k++){const m=sdHp(t)*CLS.larva.hp;t.sd.push({i:t.sd.length,x:s.x+(Math.random()-.5)*1.5,y:s.y+(Math.random()-.5)*1.5,hp:m,max:m,en:null,cd:0,rt:0,tw:t,lock:false,fight:false,lar:lv.t,cls:'larva',uic:{img:ALSVG.larva}});}}}catch(e){}return r;};}
// ---- tic: larvas que caducan, puesta, corrosión, emboscada, frenesí ----
function alienTick(dt){for(const e of S.enemies)e.mrsw=0;
 for(const t of S.list){if(t.type!=='alien'||!t.sd)continue;let ch=false;
  for(const s of t.sd){if(s.lar){s.lar-=dt;if(s.lar<=0||s.hp<=0){s.gone=1;ch=true;}}else if(s.xtr&&s.hp<=0){s.gone=1;ch=true;}
   if(s.frz>0){s.frz-=dt;if(s.frz<=0){s.frzN=0;s.rtm=1;}}}
  if(ch){for(const s of t.sd)if(s.gone){s.en=null;s.fight=false;}t.sd=t.sd.filter(s=>!s.gone);t.sd.forEach((s,i)=>s.i=i);}
  if(t.spec==='hive'){const br=abRank(t,'brood');if(br){t.brT=(t.brT==null?br.cd:t.brT)-dt;const nx=t.sd.filter(s=>s.xtr).length;
    if(t.brT<=0){t.brT=br.cd;if(nx<br.n){const m=sdHp(t);t.sd.push({i:t.sd.length,x:t.x,y:t.y,hp:m,max:m,en:null,cd:0,rt:0,tw:t,lock:true,fight:false,xtr:1});S.fx.push({x:t.x,y:t.y,t:.4,m:.4,r:.8*K,col:'#7ad6c4'});}}}
   const sc=abRank(t,'swcor');if(sc&&S.phase==='wave')for(const s of t.sd)if(s.hp>0&&s.fight&&s.en&&s.en.hp>0)s.en.mrsw=(s.en.mrsw||0)+sc.a;}
  if(t.spec==='pred'&&S.phase==='wave'){const am=abRank(t,'ambush');if(am){t.amT=(t.amT==null?am.cd:t.amT)-dt;if(t.amT<=0){const st=stats(t),R=st.range,f0=t.flag||t;
    let be=null;for(const e of S.enemies){if(e.hp<=0||e.leak||ET[e.t].fly||(typeof camoHid==='function'&&camoHid(e)))continue;if(Math.hypot(e.x-f0.x,e.y-f0.y)>R)continue;if(!be||e.hp>be.hp)be=e;}
    const s=t.sd.find(q=>q.hp>0&&!q.lar&&!q.fight)||t.sd.find(q=>q.hp>0&&!q.lar);
    if(be&&s){t.amT=am.cd;S.fx.push({x:s.x,y:s.y,t:.3,m:.3,r:.5*K,col:'#2a9a88'});s.x=be.x;s.y=be.y;hurt(be,st.dmg*CLS.pred.d*2,t,'magic');stunE(be,am.st);s.en=be;s.lock=false;S.fx.push({x:be.x,y:be.y,t:.5,m:.5,r:.8*K,col:'#3fc9b0'});if(be.hp<=0)alienHit(t,s,be,0);}else t.amT=.5;}}}}}
// corrosión del enjambre: resta resistencia mágica en el daño mágico (como el ácido)
{const _m=e2DmgM;e2DmgM=function(e,src,ty){let m=_m.apply(this,arguments);try{if(ty==='magic'&&e.mrsw>0){const A0=Math.max(-MAXPEN,armorOf(e,'magic')-(e.mrb||0)),A1=Math.max(-MAXPEN,A0-e.mrsw);m*=(1-A1/(A1+ARM_K))/(1-A0/(A0+ARM_K));}}catch(x){}return m;};}
H2T.push(dt=>{try{alienTick(dt);}catch(e){}});
// ficha: nº de unidades según el nivel
{const _ur=unitRows;unitRows=function(T,src,t){const r=_ur.apply(this,arguments);try{if(T&&T.alien&&r&&r.u)r.n=R('',kst('usol','Nº de unidades',src),t?alienN(t):(()=>{try{const c=cpState('alien');return String(alienN({lvl:c.lv,spec:c.spec}));}catch(e){return '4 · 5 · 6 (Nv 1-3)';}})());}catch(e){}return r;};}
// ---- desbloqueo: ganar una partida con Korr ----
ACH.suyos={c:'jg',n:'Los suyos',d:'Gana una partida con Korr: convence a algunas criaturas de su colmena para que luchen a tu lado.',tw:'alien'};
if(typeof ACHVIS!=='undefined')ACHVIS.suyos=()=>typeof era2Ok==='function'&&era2Ok();
TLOCK.alien='suyos';
{const _aw=achWin;achWin=function(){const r=_aw.apply(this,arguments);try{if(!S.tut&&S.hero&&S.hero.id==='korr')achieve('suyos');}catch(e){}return r;};}
// iconos SVG para unidades: {img:svg} en el mapa (canvas) y en las fichas (HTML)
{const _d=icDraw;icDraw=function(c,ic,x,y,sz){if(ic&&typeof ic==='object'&&ic.img){const im=svgImg(ic.img);if(im.complete&&im.naturalWidth){const w=sz*1.15;c.drawImage(im,x-w/2,y-w/2,w,w);}return;}return _d.apply(this,arguments);};}
{const _h=icHtml;icHtml=function(ic){if(ic&&typeof ic==='object'&&ic.img)return `<img class="icimg" alt="" src="${svgImg(ic.img).src}" style="width:1.15em;height:1.15em;vertical-align:-.2em">`;return _h.apply(this,arguments);};}
