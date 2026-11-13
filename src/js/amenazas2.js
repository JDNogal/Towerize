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
{const _pi=portalInfo;portalInfo=function(p){if(p&&azNie()>=3)return '<b>Portal enemigo</b><small>La niebla no deja ver qué saldrá por aquí.</small>';return _pi.apply(this,arguments);};}
{const _pr=portalRows;portalRows=function(p,lim){if(azNie()>=3)return lim?'':'<div class="pbh">Niebla: no se sabe qué viene</div>';return _pr.apply(this,arguments);};}
