// ==================== v321 · Amenazas, tanda 2: Asedio sin tregua, Inflación y Niebla de guerra ====================
// ---- Asedio sin tregua: tras poner la pieza, 30 s (R2: 20 s) para construir; después la oleada empieza sola ----
const AZASE={t:null,r:0,last:0};
setInterval(()=>{try{const R=azRank('ase'),B=document.body.classList;let c=$('azase');
 const run=R&&S&&S.phase==='build'&&S.hero&&!B.contains('pcpick')&&!(RL&&RL.open)&&!(LB&&LB.open)&&!(DLG&&DLG.on)&&S.speed!==0&&!document.body.classList.contains('inmenu');
 if(!R||!S||S.phase!=='build'){AZASE.t=null;if(c)c.style.display='none';return;}
 if(AZASE.r!==S.round||AZASE.t==null){AZASE.r=S.round;AZASE.t=R>=2?20:30;}
 const now=performance.now(),dt=AZASE.last?Math.min(.5,(now-AZASE.last)/1000):0;AZASE.last=now;if(run)AZASE.t-=dt;
 if(!c){c=document.createElement('div');c.id='azase';c.className='azase';document.body.appendChild(c);}
 const sec=Math.max(0,Math.ceil(AZASE.t)),h=`<span class="ai">${AZIC.ase}</span>Empieza sola en <b>0:${String(sec).padStart(2,'0')}</b>`;if(c.dataset.h!==h){c.innerHTML=h;c.dataset.h=h;azFit();}
 const go=document.querySelector('#mbr .go');c.style.display=go&&go.offsetWidth?'':'none';c.classList.toggle('pz',!run);c.classList.toggle('hot',AZASE.t<=5);
 if(go){const z=document.body.classList.contains('mfs')?1:(parseFloat(getComputedStyle(c).zoom)||1),r=go.getBoundingClientRect();
  if(document.body.classList.contains('mfs')){c.style.right=(innerWidth-r.left+8)+'px';c.style.bottom=(innerHeight-r.bottom)+'px';}else{c.style.right=(innerWidth-r.right)/z+'px';c.style.bottom=(innerHeight-r.top+13*z)/z+'px';}}
 if(AZASE.t<=0){AZASE.t=null;c.style.display='none';try{startWave();}catch(e){}}}catch(e){}},200);
// ---- Inflación: cada torre del mismo tipo cuesta un 10 % más que la anterior ----
function azInfl(){try{const on=azOn('inf');for(const k of Object.keys(TW)){const T=TW[k];if(T.cost==null||T.uniq)continue;if(T.cost0==null)T.cost0=T.cost;
  const n=on&&S&&S.list?S.list.filter(t=>t.type===k&&!t.hero&&!t.summ).length:0,c=n?Math.round(T.cost0*(1+.1*n)):T.cost0;/* sin redondear a 5: es parte de la dificultad (Nogal) */if(T.cost!==c)T.cost=c;}}catch(e){}}
{const _b=build;build=function(){azInfl();const r=_b.apply(this,arguments);azInfl();return r;};}
{const _u=ui;ui=function(){azInfl();return _u.apply(this,arguments);};}
{const _sg=startGame;startGame=function(){const r=_sg.apply(this,arguments);azInfl();return r;};}
// ---- Niebla de guerra: no se ven hasta que los detecta una torre, tu héroe o una unidad; desde entonces, siempre ----
const azNie=()=>azOn('nie')?S.amz.nie:0;
function azFogTick(){if(azNie()<2||!S||S.phase!=='wave')return;const tw=S.list||[];
 const hs=[S.hero&&S.hero.s,S.hero2&&S.hero2.s].filter(h=>h&&h.hp>0);
 for(const e of S.enemies){if(e.fog||!(e.hp>0))continue;if(hs.some(h=>Math.hypot(e.x-h.x,e.y-h.y)<=2*K)){e.fog=1;continue;}
  for(const t of tw){let rg=0;try{rg=stats(t).range||0;}catch(_){}if(Math.hypot(e.x-t.x,e.y-t.y)<=Math.max(rg,1.5*K)){e.fog=1;break;}
   for(const s of t.sd||[])if(s.hp>0&&Math.hypot(e.x-s.x,e.y-s.y)<=2*K){e.fog=1;break;}if(e.fog)break;}}}
setInterval(()=>{try{azFogTick();}catch(e){}},100);
{const _d=draw;draw=function(){if(azNie()<2||!S||!S.enemies)return _d.apply(this,arguments);const all=S.enemies;S.enemies=all.filter(e=>e.fog);try{return _d.apply(this,arguments);}finally{const add=S.enemies.filter(e=>!all.includes(e));S.enemies=all.concat(add);}};}
{const _rd=rtlDot;rtlDot=function(r){const d=_rd.apply(this,arguments);if(azNie()>=1&&r>(S.phase==='wave'?S.round+1:S.round))return Object.assign({},d,{c:'',h:''});return d;};}

// Niebla R3: los portales no dicen qué va a salir
{const _pi=portalInfo;portalInfo=function(p){if(p&&azNie()>=3)return '<b>Portal enemigo</b><small>Sin información sobre la siguiente oleada.</small>';return _pi.apply(this,arguments);};}
{const _pr=portalRows;portalRows=function(p,lim){if(azNie()>=3)return lim?'':'<div class="pbh">Sin información sobre la oleada</div>';return _pr.apply(this,arguments);};}
// Niebla R4: no se ve dónde están los portales (ni los extremos del camino); tampoco se pueden señalar
{const _d=draw;draw=function(){if(azNie()<4||!S||!S.portals)return _d.apply(this,arguments);const P=S.portals,E=S.ends;S.portals=[];S.ends=[];try{return _d.apply(this,arguments);}finally{S.portals=P;S.ends=E;}};}
{const _r=resolve;resolve=function(){const o=_r.apply(this,arguments);if(o&&azNie()>=4&&o.key&&o.key.startsWith('pt:'))return null;return o;};}
{const _p=ptipTick;ptipTick=function(){if(azNie()>=4){const el=$('ptips');if(el&&el.innerHTML)el.innerHTML='';PTSIG='';return;}return _p.apply(this,arguments);};}

// ==================== Sabotaje ====================
// Desde la ronda 3: 1 saboteador por oleada (2 desde la 9, 3 desde la 15). Va a por una torre cerca del camino;
// él y la torre salen marcados y una línea de puntos aparece y se desvanece. Si llega a 2 casillas, la torre se apaga 6 s (interferencia).
const SABR=2,SABT=6;
function azSabTargets(){const out=[];for(const t of S.list){const T=TW[t.type];if(!T||T.unit||T.uniq||t.hero)continue;let ok=false;
  for(let y=Math.max(0,t.y-3);y<=Math.min(N-1,t.y+3)&&!ok;y++)for(let x=Math.max(0,t.x-3);x<=Math.min(N-1,t.x+3);x++)if(S.cells[y][x]===2&&Math.hypot(x-t.x,y-t.y)<=2.5){ok=true;break;}
  if(ok)out.push(t);}return out;}
{const _sw=startWave;startWave=function(){const r=_sw.apply(this,arguments);try{S.sabIdx=null;S.spN=0;S.flagSq={};
  if(azOn('sab')&&S.round>=3){const n=S.round>=15?3:S.round>=9?2:1;let tot=0;for(const p of S.portals)for(const t of p.q||[])if(t!=='|')tot++;
   const lim=Math.max(1,Math.floor(tot*.7)),set=new Set();let g=0;while(set.size<Math.min(n,lim)&&g++<50)set.add(Math.floor(Math.random()*lim));S.sabIdx=set;}}catch(e){}return r;};}
{const _se=spawnEnemy;spawnEnemy=function(t,p,fo){const n=S&&S.enemies?S.enemies.length:0;const r=_se.apply(this,arguments);try{if(S.enemies.length>n){const e=S.enemies[S.enemies.length-1],E=ET[e.t]||{};
  const i=S.spN=(S.spN||0)+1;
  // saboteador: un enemigo de a pie normal
  if(S.sabIdx&&S.sabIdx.has(i-1)){if(!isBoss(e)&&!E.el&&!E.fly){const ts=azSabTargets();if(ts.length){e.sab=ts[Math.floor(Math.random()*ts.length)];}}else S.sabIdx.add(i);}
  // abanderado: el primero de una escuadra nueva, con probabilidad
  if(azOn('aba')&&S.round>=4&&e.sqid&&!isBoss(e)&&!E.fly){S.flagSq=S.flagSq||{};if(!(e.sqid in S.flagSq)){const pr=.25+.15*Math.max(0,Math.min(1,(S.round-4)/Math.max(1,ROUNDS-4)));S.flagSq[e.sqid]=Math.random()<pr?e:null;if(S.flagSq[e.sqid])e.flag=1;}}
 }}catch(x){}return r;};}
function azSabTick(){if(!S||S.phase!=='wave'||!azOn('sab'))return;for(const e of S.enemies){const t=e.sab;if(!t||!(e.hp>0))continue;
  if(!S.list.includes(t)){e.sab=null;continue;}
  if(Math.hypot(e.x-t.x,e.y-t.y)<=SABR){t.jam=Math.max(t.jam||0,SABT);e.sab=null;e.sabDone=1;S.fx.push({x:t.x,y:t.y,t:.6,m:.6,r:1.2*K,col:'#e0453a'});}}}
setInterval(()=>{try{azSabTick();}catch(e){}},100);
// ==================== Abanderados ====================
const azFlagOn=e=>{if(!e||!e.sqid||!S.flagSq)return false;const b=S.flagSq[e.sqid];return !!(b&&b.hp>0&&S.enemies.includes(b));};
{const _sl=slowE;slowE=function(e,m,t){if(azOn('aba')&&azFlagOn(e))return;return _sl.apply(this,arguments);};}
{const _kn=knock;knock=function(e,d){if(azOn('aba')&&azFlagOn(e))return;return _kn.apply(this,arguments);};}
// dibujo: saboteador (aro rojo discontinuo + llave), su torre (aro + «!») y la línea que aparece y se desvanece; bandera del abanderado
{const _dw=e2DrawWorld;e2DrawWorld=function(lw){const r=_dw.apply(this,arguments);try{if(!S||!S.enemies)return r;const X=v=>v*CS+CS/2,es=typeof EVS!=='undefined'?EVS:1,now=performance.now()/1000;
  for(const e of S.enemies){if(!(e.hp>0))continue;const rr=ET[e.t].r*CS*es,x=X(e.x),y=X(e.y);
   if(e.sab){const t=e.sab,tx=X(t.x),ty=X(t.y);
    g.save();g.setLineDash([lw(4),lw(3)]);g.strokeStyle='#e0453a';g.lineWidth=lw(2);g.beginPath();g.arc(x,y,rr+lw(4),0,7);g.stroke();
    const a=Math.max(0,Math.sin(now*2.4));g.globalAlpha=.85*a;g.setLineDash([lw(2),lw(5)]);g.lineWidth=lw(1.8);g.beginPath();g.moveTo(x,y);g.lineTo(tx,ty);g.stroke();g.globalAlpha=1;
    g.setLineDash([lw(5),lw(3)]);g.lineWidth=lw(2.4);g.beginPath();g.arc(tx,ty,CS*1.4,0,7);g.stroke();g.setLineDash([]);
    g.fillStyle='#e0453a';g.beginPath();g.arc(tx+CS*1.05,ty-CS*1.05,CS*.4,0,7);g.fill();g.fillStyle='#fff';g.font='bold '+(CS*.55|0)+'px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('!',tx+CS*1.05,ty-CS*1.02);
    // llave inglesa sobre el saboteador
    const wx=x+rr*.9,wy=y-rr*.9,s=rr*.55;g.strokeStyle='#1b1712';g.lineWidth=lw(3.2);g.lineCap='round';g.beginPath();g.moveTo(wx-s,wy+s);g.lineTo(wx+s*.3,wy-s*.3);g.stroke();g.strokeStyle='#e0453a';g.lineWidth=lw(1.8);g.stroke();
    g.beginPath();g.arc(wx+s*.45,wy-s*.45,s*.42,0,7);g.stroke();g.restore();}
   if(azOn('aba')&&e.sqid&&S.flagSq){const b=S.flagSq[e.sqid];if(b&&b.hp>0){
    if(b===e){const px=x+rr*.2,top=y-rr-CS*.9;g.strokeStyle='#3b2a18';g.lineWidth=lw(2);g.beginPath();g.moveTo(px,y-rr*.2);g.lineTo(px,top);g.stroke();
     g.fillStyle='#d9a52b';g.strokeStyle='#1b1712';g.lineWidth=lw(1.2);g.beginPath();g.moveTo(px,top);g.lineTo(px+CS*.6,top+CS*.15);g.lineTo(px,top+CS*.32);g.closePath();g.fill();g.stroke();}
    else{g.fillStyle='#d9a52b';g.strokeStyle='#1b1712';g.lineWidth=lw(1);g.beginPath();g.moveTo(x-rr*.25,y-rr-lw(5));g.lineTo(x+rr*.25,y-rr-lw(5));g.lineTo(x,y-rr-lw(1));g.closePath();g.fill();g.stroke();}}}}
 }catch(x){}return r;};}
