// ==================== v300 · RELIQUIAS DE LA ERA 2 ====================
// De cofre (solo en la era 2): Pulso electromagnético, Generador de escudo, Impresora 3D y Adrenalina sintética.
// De evento: Criocápsula, Inhibidor de señal, Rayo de reprogramación, Muestra viva y Núcleo adaptativo.
const R2={};
// ---- Pulso electromagnético ----
nrAdd({id:'emp',n:'Pulso electromagnético',ic:'🧲',col:'#3a4a8a',era:2,cd:3,
 pas:()=>`Cada impacto de torre: <span class="cf">10%</span> de dejar ${kw('ez','electrizado','')} al enemigo.`,
 act:()=>`<b>Descarga</b>: todos los enemigos ${kw('ez','electrizados','')} del mapa reciben un golpe eléctrico y quedan ${kw('stun','aturdidos','')} <b>2 s</b> (jefes, 1 s).`},
 {use:()=>{const L=S.enemies.filter(e=>e.hp>0&&!e.leak&&e.ez&&e.ez.n>0);if(!L.length){S.msg='Pulso electromagnético: no hay enemigos electrizados.';return false;}const dm=20+S.round*8;
  for(const e of L){hurt(e,dm*(1+EZAMP*e.ez.n),null,'elem');stunE(e,2);S.fx.push({bolt:[[e.x+(Math.random()-.5),e.y-4*K],[e.x,e.y]],t:.2,m:.2});S.fx.push({x:e.x,y:e.y,t:.35,m:.35,r:.6*K,col:'#ffe14d'});}RS('emp').n+=L.length;return true;}});
// ---- Generador de escudo ----
nrAdd({id:'shgen',n:'Generador de escudo',ic:'💠',col:'#2a5a7a',era:2,cd:3,
 pas:()=>'Tus unidades y tu héroe empiezan cada oleada con un <span class="chp">escudo del 20%</span> de su vida.',
 act:()=>'<b>Cúpula</b>: durante <b>6 s</b>, tus unidades dentro del área no reciben daño.'},
 {aim:'Elige dónde levantar la cúpula.',r:2*K,col:'90,200,255',dur:6,use:c=>{S.dome={x:c.x,y:c.y,r:2*K,t:6};S.fx.push({x:c.x,y:c.y,t:.5,m:.5,r:2*K,col:'#7ad8ff'});return true;}});
UHM.unshift((s,d,e)=>{if(S.dome&&S.dome.t>0&&h2R(s,S.dome,S.dome.r)){RS('shgen').n++;return 0;}if(s.shd>0){const a=Math.min(s.shd,d);s.shd-=a;d-=a;RS('shgen').dmg+=a;}return d;});
function r2Shields(){for(const t of unitTowers())for(const s of t.sd)if(s.hp>0)s.shd=s.max*.2;}
{const _sw=startWave;startWave=function(){const was=S.phase;const r=_sw.apply(this,arguments);try{if(was!=='wave'&&S.phase==='wave'){S.prR=S.prR||0;if(S.relics.includes('shgen')&&rp('shgen'))r2Shields();if(S.hero)S.hero.adrW=0;}}catch(e){}return r;};}
// ---- Impresora 3D ----
const PRDUR=[0,40,35,30,25];
const prFree=t=>!!(t&&S&&S.relics&&S.relics.includes('printer')&&rp('printer')&&t.lvl===1&&!t.holo&&!TW[t.type].uniq&&!TW[t.type].guild&&S.prR!==S.round);
{const _tc=tCost;tCost=function(t,c){if(c!=null&&prFree(t))return 0;return _tc.apply(this,arguments);};}
{const _u=upgrade;upgrade=function(t){if(t&&t.holo){S.msg='Una copia impresa no se puede mejorar.';ui();return;}const fr=prFree(t),l0=t&&t.lvl;const r=_u.apply(this,arguments);if(fr&&t.lvl>l0){S.prR=S.round;S.msg=tinfo(t).n+' sube a Nv 2 gratis (Impresora 3D).';RS('printer').n++;ui();}return r;};}
{const _s=sell;sell=function(t){if(t&&t.holo){S.msg='Una copia impresa no se puede vender.';ui();return;}return _s.apply(this,arguments);};}
{const _c=chooseSpec;chooseSpec=function(t,sp){if(t&&t.holo&&!R2.pr)return;return _c.apply(this,arguments);};}
{const _b=buyAb;buyAb=function(t,id){if(t&&t.holo)return;return _b.apply(this,arguments);};}
{const _o=tmOpts;tmOpts=function(t){const o=_o.apply(this,arguments);if(t&&t.holo){o.top=[];o.bot=o.bot.filter(x=>x.k!=='sell');}return o;};}
function prCopy(src,cx,cy){const g0=S.gold,sp0=S.st?S.st.spent:0,ts=S.tsel,n0=S.list.length,hf=S.half,fr=S.freeT,dk=S.deck,msg=S.msg;S.half=0;S.freeT=0;S.gold=1e9;S.tsel=src.type;if(dk&&!dk.includes(src.type))S.deck=dk.concat([src.type]);R2.pr=1;let t=null;
 try{build(cx,cy);t=S.list.length>n0?S.list[S.list.length-1]:null;
  if(t){while(t.lvl<Math.min(3,src.lvl))lvUp(t);if(src.lvl===4&&src.spec&&SPECS[src.type]&&SPECS[src.type][src.spec]){chooseSpec(t,src.spec);t.ab=Object.assign({},src.ab);for(const k in t.ab)t.acd[k]=0;}
   t.inv=0;t.undo=0;t.bph='holo';t.mode=src.mode;t.holo=PRDUR[Math.min(4,src.lvl)]||25;t.holoM=t.holo;if(t.sd)for(const q of t.sd){q.max=sdHp(t);q.hp=q.max;}if((S.bcnt||{})[t.type]>0)S.bcnt[t.type]--;}}
 finally{R2.pr=0;S.deck=dk;S.tsel=ts;S.gold=g0;if(S.st)S.st.spent=sp0;S.half=hf;S.freeT=fr;S.msg=msg;}return t;}
function prRemove(t){t.sold=1;S.list=S.list.filter(o=>o!==t);for(const[a,b]of t.sq||[])if(S.occ[a+','+b]===t)delete S.occ[a+','+b];if(S.selT===t){S.selT=null;try{tmClose();}catch(e){}}try{if(PR.pinned&&PR.key==='tw:'+t.id)closePrim();}catch(e){}S.fx.push({x:t.x,y:t.y,t:.5,m:.5,r:1.2*K,col:'#3fe8ff'});}
nrAdd({id:'printer',n:'Impresora 3D',ic:'🖨️',col:'#4a5a6a',era:2,cd:3,
 pas:()=>'Una vez por ronda, mejorar una torre de <b>Nv 1 a Nv 2</b> sale <span class="gd">gratis</span>.',
 act:()=>'<b>Imprimir</b>: copias una torre tuya, con su nivel y sus habilidades, en un solar vacío. Es un holograma: dura <b>40 s</b> si es de Nv 1, 35 s de Nv 2, 30 s de Nv 3 y 25 s de Nv 4.'},
 {aim:'Elige la torre que quieres copiar.',start:()=>{S.prSrc=null;},use:c=>{const t=S.occ[c.x+','+c.y];
  if(!S.prSrc){if(!t||t.holo||TW[t.type].uniq||TW[t.type].guild){S.msg='Impresora 3D: elige una de tus torres (las únicas no se pueden copiar).';return false;}S.prSrc=t.id;S.msg='Ahora elige un solar vacío para la copia.';return false;}
  const src=S.list.find(o=>o.id===S.prSrc);if(!src){S.prSrc=null;S.msg='Elige la torre que quieres copiar.';return false;}
  const q=sqOf(c.x,c.y);if(t||!inbc(q.kx,q.ky)||S.cc[q.ky][q.kx]!==1){S.msg='Impresora 3D: elige un solar vacío.';return false;}
  const cp=prCopy(src,c.x,c.y);if(!cp){S.msg='Impresora 3D: ahí no se puede construir.';return false;}S.prSrc=null;RS('printer').n2++;S.fx.push({x:cp.x,y:cp.y,t:.6,m:.6,r:1.4*K,col:'#3fe8ff'});return true;}});
{const _nr=nextRound;nextRound=function(){try{for(const t of S.list.filter(o=>o.holo))prRemove(t);S.dome=null;S.prSrc=null;for(const t of S.list)t.asim=null;for(const u of unitTowers())for(const s of u.sd)s.shd=0;}catch(e){}return _nr.apply(this,arguments);};}
// ---- Adrenalina sintética ----
nrAdd({id:'adren',n:'Adrenalina sintética',ic:'💉',col:'#7a2a3a',era:2,cd:3,
 pas:()=>'La primera vez en cada oleada que tu héroe baja del 30% de vida: <span class="cr">+30% de velocidad de ataque</span> durante <b>5 s</b>.',
 act:()=>'<b>Chute</b>: durante <b>8 s</b>, tu héroe y tus unidades atacan y se mueven un <span class="cr">50% más rápido</span>.'},
 {dur:8,use:()=>{for(const t of unitTowers())for(const s of t.sd)if(s.hp>0)S.fx.push({x:s.x,y:s.y,t:.4,m:.4,r:.6*K,col:'#ff6a7a'});return true;}});
function uSpdM(t){return S.relics&&S.relics.includes('adren')&&ra('adren')?1.5:1;}
// ---- Criocápsula ----
nrAdd({id:'cryo',n:'Criocápsula',ic:'🧊',col:'#2a6a8a',era:2,evr:1,ev:'cryocam',cd:3,
 pas:()=>`Cada <b>5 impactos</b> que recibe un enemigo le dan 1 de ${kw('chill','hipotermia','')}. Los que mueren con hipotermia estallan en esquirlas que dan 1 de hipotermia alrededor.`,
 act:()=>`<b>Nitrógeno líquido</b>: ${kw('freeze','congela','')} <b>3 s</b> a todos los enemigos del mapa con ${kw('chill','hipotermia','')} (jefes, la mitad).`},
 {use:()=>{const L=S.enemies.filter(e=>e.hp>0&&!e.leak&&e.cs&&e.cs.length);if(!L.length){S.msg='Criocápsula: no hay enemigos con hipotermia.';return false;}let n=0;for(const e of L){if(freezeE(e,3))n++;S.fx.push({x:e.x,y:e.y,t:.45,m:.45,r:.7*K,col:'#9fe4ff'});}RS('cryo').n2+=n;return true;}});
H2K.push(e=>{if(S.relics.includes('cryo')&&rp('cryo')&&e.cs&&e.cs.length){for(const o of S.enemies)if(o!==e&&o.hp>0&&Math.hypot(o.x-e.x,o.y-e.y)<=1.2*K)addChill(o,null,1);S.fx.push({x:e.x,y:e.y,t:.4,m:.4,r:1.2*K,col:'#bfeeff'});RS('cryo').n++;}});
// ---- Inhibidor de señal ----
nrAdd({id:'jammer',n:'Inhibidor de señal',ic:'📡',col:'#5a3a6a',era:2,evr:1,ev:'sos',cd:3,
 pas:()=>`Cuando muere el líder de una escuadra, los suyos quedan ${kw('fear','aterrados','')} <b>2 s</b>.`,
 act:()=>`<b>Interferencia</b>: todos los líderes del mapa quedan ${kw('stun','aturdidos','')} <b>4 s</b> y sus escuadras se desperdigan por los carriles.`},
 {use:()=>{const L=S.enemies.filter(e=>e.hp>0&&!e.leak&&e.sqlead);if(!L.length){S.msg='Inhibidor de señal: no hay líderes de escuadra en el mapa.';return false;}
  for(const l of L){stunE(l,4);S.fx.push({x:l.x,y:l.y,t:.5,m:.5,r:K,col:'#c89aff'});for(const e of S.enemies)if(e!==l&&e.hp>0&&e.sqid===l.sqid&&!e.sqlead){e.loose=1;e.fsp=0;e.scat=1;try{setLane(e,Math.floor(Math.random()*3)-1);}catch(x){}}}RS('jammer').n+=L.length;return true;}});
H2K.push(e=>{if(e.sqlead&&S.relics.includes('jammer')&&rp('jammer')){let n=0;for(const o of S.enemies)if(o!==e&&o.hp>0&&o.sqid===e.sqid){const d=isBoss(o)?1:2;o.fx.fear={t:Math.max(d,o.fx.fear?o.fx.fear.t:0)};n++;}RS('jammer').n2+=n;}});
// ---- Rayo de reprogramación: el Transformado de la era 2 (robot aspiradora) ----
function vacDraw(g,px,py,r,lw){const R=r*1.15,a=performance.now()/260;g.fillStyle='#c9d0da';g.strokeStyle='#14101e';g.lineWidth=Math.max(1,r*.14);g.beginPath();g.arc(px,py,R,0,7);g.fill();g.stroke();
 g.fillStyle='#8a94a6';g.beginPath();g.arc(px,py,R*.62,0,7);g.fill();g.strokeStyle='#3a4250';g.lineWidth=Math.max(1,r*.18);g.beginPath();g.arc(px,py,R*.86,-2.6,-.55);g.stroke();
 g.fillStyle='#3fe8ff';g.beginPath();g.arc(px,py,R*.22,0,7);g.fill();g.fillStyle=Math.sin(a*3)>0?'#ff4f4f':'#7a2a2a';g.beginPath();g.arc(px+R*.5,py+R*.45,R*.11,0,7);g.fill();
 g.strokeStyle='#5a6474';g.lineWidth=Math.max(1,r*.1);for(const sd of[-1,1]){const bx=px+sd*R*.8,by=py-R*.75;g.beginPath();for(let i=0;i<3;i++){const an=a*2*sd+i*2.094;g.moveTo(bx,by);g.lineTo(bx+Math.cos(an)*R*.3,by+Math.sin(an)*R*.3);}g.stroke();}}
const r2Poly=(e,t)=>{if(e.hp<=0||isBoss(e)||e.fx.poly)return false;e.fx.poly={t:ET[e.t].el?t/2:t,vac:1};return true;};
nrAdd({id:'repro',n:'Rayo de reprogramación',ic:'🔫',col:'#3a6a6a',era:2,evr:1,ev:'lab',cd:3,
 pas:()=>`Cada impacto de torre: <span class="cf">3%</span> de dejar al enemigo ${kw('poly','transformado','')} <b>2 s</b> en un robot aspiradora (jefes no).`,
 act:()=>`Los enemigos de un área quedan ${kw('poly','transformados','')} <b>6 s</b> en robots aspiradora: van despacio, no atacan y pierden su armadura (jefes no).`},
 {aim:'Elige dónde disparar el rayo.',r:2*K,col:'63,232,255',use:c=>{let n=0;for(const e of S.enemies)if(e.hp>0&&!e.leak&&Math.hypot(e.x-c.x,e.y-c.y)<=2*K&&r2Poly(e,6))n++;RS('repro').n+=n;S.fx.push({x:c.x,y:c.y,t:.5,m:.5,r:2*K,col:'#3fe8ff'});return true;}});
// ---- Muestra viva ----
nrAdd({id:'sample',n:'Muestra viva',ic:'🧫',col:'#5a2a6a',era:2,evr:1,ev:'capsule',cd:3,
 pas:()=>'Tus unidades y tu héroe <span class="chp">recuperan vida</span> poco a poco, también en combate.',
 act:()=>'<b>Mutación</b>: durante <b>10 s</b>, tus unidades y tu héroe hacen un <span class="cd">+30% de daño</span> y se curan un <span class="chp">20% del daño</span> que hacen.'},
 {dur:10,use:()=>{for(const t of unitTowers())for(const s of t.sd)if(s.hp>0)S.fx.push({x:s.x,y:s.y,t:.4,m:.4,r:.6*K,col:'#c070ff'});return true;}});
function onDmg(e,dl,src,ty){if(!S.relics||!S.relics.includes('sample')||!ra('sample'))return;let s=null;if(src.hero)s=src.hero.s;else if(src.sd){for(const q of src.sd)if(q.hp>0&&(!s||q.hp/q.max<s.hp/s.max))s=q;}if(s&&s.hp>0&&s.hp<s.max){const h=Math.min(s.max-s.hp,dl*.2);s.hp+=h;RS('sample').dmg+=h;}}
// ---- Núcleo adaptativo ----
const TWFAM={arrow:'fis',bunker:'fis',cata:'fis',cannon:'fis',orb:'mag',nano:'mag',sala:'fue',flame:'fue',poison:'ven',acid:'ven',augur:'ele',laser:'ele',tesla:'ele',frost:'con',sonic:'con',bastion:'uni',monk:'uni',robots:'uni',alien:'uni',altar:'apo',dron:'apo'};
const coreN=()=>{const k=S.list.length+'|'+S.round;if(R2.ck!==k||R2.cS!==S){R2.ck=k;R2.cS=S;R2.cn=new Set(S.list.filter(t=>!t.holo).map(t=>t.type)).size;}return R2.cn;},coreP=()=>Math.min(.35,.05*coreN());
function stkX(e){return S.relics&&S.relics.includes('core2')&&rp('core2')?1+coreP():1;}
function r2Fx(t){const T=TW[t.type],o=[];if(T.burn)o.push('burn');if(T.dot)o.push('pois');if(T.slow||T.sonic)o.push('slow');if(T.zap||T.arc||t.type==='augur')o.push('ez');if(t.type==='frost')o.push('chill');if(t.type==='cannon'||t.type==='bastion')o.push('bleed');return o;}
const R2FXN={burn:'quemadura',pois:'veneno',slow:'ralentización',ez:'electrizado',chill:'hipotermia',bleed:'sangrado'};
nrAdd({id:'core2',n:'Núcleo adaptativo',ic:'⚛️',col:'#2a4a6a',era:2,evr:1,ev:'omega',cd:3,
 pas:()=>'Por cada <b>tipo distinto</b> de torre en el mapa: torres <span class="cd">+5% de daño</span> y <span class="cbu">+5% de stacks</span> en los estados (máx. +35%'+(typeof S!=='undefined'&&S&&S.list&&S.relics&&S.relics.includes('core2')?'; ahora: <span class="cd">+'+Math.round(coreP()*100)+'%</span>':'')+').',
 act:()=>'<b>Asimilación</b>: durante <b>15 s</b>, una torre que elijas aplica también los estados de las torres que tiene al lado (quemadura, veneno, ralentización, electrizado…).'},
 {aim:'Elige la torre que va a asimilar a sus vecinas.',use:c=>{const t=S.occ[c.x+','+c.y];if(!t||t.holo){S.msg='Núcleo adaptativo: elige una de tus torres.';return false;}const me=r2Fx(t),fx=new Set();
  for(const o of S.list)if(o!==t&&Math.hypot(o.x-t.x,o.y-t.y)<=1.6*K)for(const k of r2Fx(o))if(!me.includes(k))fx.add(k);
  if(!fx.size){S.msg='Núcleo adaptativo: esa torre no tiene al lado ninguna torre con estados que copiar.';return false;}t.asim={t:15,fx:[...fx]};S.msg=tinfo(t).n+' asimila: '+[...fx].map(k=>R2FXN[k]).join(', ')+'.';S.fx.push({x:t.x,y:t.y,t:.6,m:.6,r:1.6*K,col:'#7ad8ff'});return 'msg';}});
// ---- pasivas que cuelgan de cada impacto ----
{const _oh=onHit;onHit=function(e,src){const r=_oh.apply(this,arguments);try{if(!e||e.hp<=0||!S.relics)return r;
  if(src&&!src.hero){if(S.relics.includes('emp')&&rp('emp')&&Math.random()<.1){h2Ez(e,1);RS('emp').n2++;}
   if(S.relics.includes('repro')&&rp('repro')&&Math.random()<.03&&r2Poly(e,2))RS('repro').n2++;
   if(S.relics.includes('cryo')&&rp('cryo')){e.cry=(e.cry||0)+1;if(e.cry>=5){e.cry=0;addChill(e,src,1);}}}
  if(src&&src.asim&&src.asim.t>0){for(const k of src.asim.fx){if(k==='burn')addBurn(e,src,Math.max(1,stats(src).dmg*.25));else if(k==='pois')addPois(e,2,src);else if(k==='slow')slowE(e,.7,1.5);else if(k==='ez')h2Ez(e,1);else if(k==='chill')addChill(e,src,1);else if(k==='bleed'&&Math.random()<.5)addBleed(e,src,1);}}}catch(x){}return r;};}
// ---- estadísticas: daño y cadencia que dan estas reliquias ----
{const _s=stats;stats=function(t){const r=_s.apply(this,arguments);if(!t||t.ovr||typeof S==='undefined'||!S||!S.relics||!S.rs)return r;let d=1,rt=1;const unit=!!(t.hero||(t.sd&&t.sd.length));
 if(unit){if(S.relics.includes('sample')&&ra('sample'))d*=1.3;if(S.relics.includes('adren')&&ra('adren'))rt*=1.5;if(t.hero&&t.hero.adr>0)rt*=1.3;}
 if(!t.hero&&S.relics.includes('core2')&&rp('core2')&&S.list)d*=1+coreP();
 return d!==1||rt!==1?Object.assign({},r,{dmg:r.dmg*d,rate:r.rate*rt}):r;};}
// ---- tic ----
H2T.push(dt=>{if(S.dome&&(S.dome.t-=dt)<=0)S.dome=null;
 for(const t of S.list.slice()){if(t.asim&&(t.asim.t-=dt)<=0)t.asim=null;if(t.holo>0&&(t.holo-=dt)<=0)prRemove(t);}
 const H=S.hero;if(H){if(H.adr>0)H.adr-=dt;if(S.relics.includes('adren')&&rp('adren')&&!H.adrW&&H.s.hp>0&&H.s.hp<H.s.max*.3){H.adrW=1;H.adr=5;RS('adren').n++;S.fx.push({x:H.s.x,y:H.s.y,t:.5,m:.5,r:.8*K,col:'#ff6a7a'});}}
 if(S.relics.includes('sample')&&rp('sample'))for(const t of unitTowers())for(const s of t.sd)if(s.hp>0&&s.hp<s.max&&!(s.H&&s.H.camo>0)){const h=Math.min(s.max-s.hp,s.max*.015*dt);s.hp+=h;RS('sample').gold+=h;}});
// ---- dibujo ----
H2D.push((g,lw)=>{const X=v=>v*CS+CS/2,now=performance.now()/1000;
 if(S.dome){const d=S.dome,p=.5+.5*Math.sin(now*5);g.fillStyle='rgba(90,200,255,.12)';g.strokeStyle='rgba(140,225,255,'+(.6+.3*p)+')';g.lineWidth=lw(2.5);g.beginPath();g.arc(X(d.x),X(d.y),d.r*CS,0,7);g.fill();g.stroke();}
 for(const t of unitTowers())for(const s of t.sd)if(s.hp>0&&s.shd>0){g.strokeStyle='rgba(120,215,255,.9)';g.lineWidth=lw(2);g.beginPath();g.arc(X(s.x),X(s.y),CS*(s.H?1.25:.72),-Math.PI/2,-Math.PI/2+6.283*Math.min(1,s.shd/(s.max*.2)));g.stroke();}
 const gl=typeof OPT==='undefined'||OPT.dglitch!==false;
 for(const t of S.list){const x0=(t.x-1)*CS,y0=(t.y-1)*CS,W=K*CS;
  if(t.asim){g.strokeStyle='rgba(122,216,255,'+(.6+.4*Math.sin(now*8))+')';g.lineWidth=lw(2.5);g.setLineDash([lw(5),lw(4)]);g.strokeRect(x0+lw(1),y0+lw(1),W-lw(2),W-lw(2));g.setLineDash([]);}
  if(!(t.holo>0))continue;g.save();g.beginPath();g.rect(x0,y0,W,W);g.clip();g.fillStyle='rgba(20,60,80,.42)';g.fillRect(x0,y0,W,W);g.fillStyle='rgba(63,232,255,.16)';for(let y=y0+((now*18)%4);y<y0+W;y+=4)g.fillRect(x0,y,W,1.2);
  if(gl){const k=Math.floor(now*9),rnd=n=>{const v=Math.sin((k+n)*91.7+t.id*13.3)*43758.5;return v-Math.floor(v);};if(rnd(1)>.45)for(let i=0;i<2;i++){const yy=y0+rnd(2+i)*W,hh=2+rnd(4+i)*5,dx=(rnd(6+i)-.5)*10;g.fillStyle='rgba(63,232,255,.55)';g.fillRect(x0+dx,yy,W,hh*.5);g.fillStyle='rgba(255,79,216,.45)';g.fillRect(x0-dx,yy+hh*.5,W,hh*.5);}}
  g.restore();g.strokeStyle='rgba(63,232,255,.85)';g.lineWidth=lw(1.5);g.strokeRect(x0+lw(1),y0+lw(1),W-lw(2),W-lw(2));
  const f=Math.max(0,t.holo/(t.holoM||t.holo));g.fillStyle='rgba(10,20,30,.85)';g.fillRect(x0+W+lw(3),y0,lw(5),W);g.fillStyle=f<.25?'#ff6a5a':'#3fe8ff';g.fillRect(x0+W+lw(4),y0+W*(1-f)+lw(1),lw(3),W*f-lw(2));}});
