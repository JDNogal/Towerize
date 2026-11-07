// Las tablas se escriben en 'casillas viejas'; aquí pasan a casillas de la rejilla fina (x K). Los radios de enemigos se reducen para que quepan varios por camino.
for(const k in TW){const T=TW[k];T.range*=K;if(T.ps)T.ps*=K;if(T.splash)T.splash*=K;if(T.pr)T.pr*=K;if(T.unit)T.unit.spd*=K;}
for(const k in ET){const E=ET[k];E.sp*=K;E.r*=K*ENR;if(E.aura)E.aura.r*=K;}
// Armadura: reducción = armadura/(armadura+ARM_K). Física y mágica; el daño elemental (veneno) las ignora.
const ARM_K=50,DT={phys:{n:'Físico',cls:'cph',kw:'tphys'},magic:{n:'Mágico',cls:'cmg',kw:'tmagic'},elem:{n:'Elemental',cls:'cel',kw:'telem'}};
const armTxt=a=>a+' ('+Math.round(a/(a+ARM_K)*100)+'%)';
// Élites por ronda (de momento sin habilidades, solo estadísticas)
const ELITES={4:{mini:1},8:{elite:1},10:{elite:1},12:{elite:1,mini:1},13:{mini:2},14:{elite:2},16:{elite:1,mini:2},20:{elite:2,mini:1},24:{elite:2,mini:2},28:{elite:3,mini:2}};
// Prioridades de objetivo: score más alto = preferido; en empate decide el más cercano al núcleo. Añadir un modo = una línea.
const emarks=e=>{let n=0;if(e.ps)for(const q of e.ps)n+=q.w;return[((ET[e.t].need||1)>1&&e.ct>0&&!e.stopped?'🛡️'+e.ct+'/'+ET[e.t].need:''),(e.ps&&e.ps.length?'☠'+Math.round(n):''),(e.bl&&e.bl.length?'🩸'+e.bl.length:''),(e.bn>=.5?'🔥'+Math.round(e.bn):''),(e.cs&&e.cs.length?'❄'+Math.round(e.cs.reduce((a,q)=>a+q.w,0)):''),(e.ez?'🌩️'+Math.round(e.ez.n):''),(e.mk&&e.mk.t>0?'🎯':''),(e.wanted?'💰':'')].filter(Boolean).join(' ');};
function drawBolt(c,q,tx,ty,w,j){const a=Math.max(0,q.t/q.m);c.globalAlpha=Math.min(1,a*1.6);c.lineJoin='round';c.lineCap='round';
 for(const[col,ww]of[['rgba(255,225,90,.5)',w*2.6*(q.big?1.8:1)],[q.big?'#ffffff':'#fff6b0',w*(q.big?1.8:1)]]){c.strokeStyle=col;c.lineWidth=ww;c.beginPath();
  for(let i=0;i<q.bolt.length-1;i++){const x0=tx(q.bolt[i][0]),y0=ty(q.bolt[i][1]),x1=tx(q.bolt[i+1][0]),y1=ty(q.bolt[i+1][1]);if(i===0)c.moveTo(x0,y0);
   const sg=4;for(let k=1;k<=sg;k++){const u=k/sg,jj=k<sg?j:0;c.lineTo(x0+(x1-x0)*u+Math.sin(i*7+k*3+q.t*70)*jj,y0+(y1-y0)*u+Math.cos(i*5+k*4+q.t*70)*jj);}}
  c.stroke();}
 c.globalAlpha=1;}
function drawFlame(c,t,tx,ty,cs){const f0=t.fl;if(!f0)return;const px=tx(t.x),py=ty(t.y),len=f0.len*cs;
 const hh=t.heat||0;c.fillStyle=t.blue?'rgba(90,150,255,.42)':`rgba(255,${Math.round(110-60*hh)},40,${.38+.2*hh})`;c.strokeStyle=t.blue?'rgba(150,200,255,.9)':'rgba(255,170,70,.85)';c.lineWidth=Math.max(1,cs*.12);c.beginPath();c.moveTo(px,py);c.arc(px,py,len,f0.a-f0.h,f0.a+f0.h);c.closePath();c.fill();
 if(f0.one){c.beginPath();c.moveTo(px,py);c.lineTo(px+Math.cos(f0.a)*len,py+Math.sin(f0.a)*len);c.stroke();}else c.stroke();}
// oro por baja normalizado: el oro total de las bajas de una oleada sigue una curva fija (la de WGREF), aunque haya más enemigos
let GOLDK=1,WGREF=1.3;const goldNorm=r=>S&&!S.tut?Math.min(1,Math.pow(WGREF,Math.min(r,15)-1)/wGrow(r)):1;const killGoldF=t=>ET[t].gold*GOLDK*goldNorm(S.round),rndG=v=>Math.floor(v)+(Math.random()<v%1?1:0),killGold=t=>rndG(killGoldF(t));;
const espeed=e=>ET[e.t].sp*(e.fx.slow?e.fx.slow.m:1);
const TGT={
 core:{n:'Más cercano al núcleo',d:'El enemigo más adelantado en el camino.',score:(e,pr)=>-pr(e)},
 hpmax:{n:'Más vida',d:'El enemigo con más vida actual.',score:e=>e.hp},
 hpmin:{n:'Menos vida',d:'El enemigo con menos vida actual.',score:e=>-e.hp},
 fast:{n:'Más rápido',d:'El enemigo más rápido en este momento, contando ralentizaciones.',score:e=>espeed(e)}};
const rot=p=>p[0].split('').map((_,x)=>p.map(r=>r[x]).reverse().join(''));
const rotO=o=>{o.p=rot(o.p);o.b=o.b.map(({x,y,k})=>({x:P-1-y,y:x,k}));};
const $=id=>document.getElementById(id);
const inb=(x,y)=>x>=0&&y>=0&&x<N&&y<N,inbc=(x,y)=>x>=0&&y>=0&&x<NC&&y<NC;
const f=n=>String(+n.toFixed(2)).replace('.',',');
const shuf=a=>a.sort(()=>Math.random()-.5);
const M={x:0,y:0,has:false,touch:false},HV={key:null,t:0};
const LSM=window.matchMedia?matchMedia('(orientation:landscape) and (pointer:coarse) and (max-height:820px)'):{matches:false},PMN=()=>PM==='near'||LSM.matches;
let PM='near';try{const v=localStorage.getItem('rt-pm');if(['right','left','near'].includes(v))PM=v;}catch(e){}
let S;
const UNLOCK_ALL=false; // true = todo desbloqueado en el compendio (modo desarrollo)
let SEEN={tw:{},pc:{},bf:{},en:{},rl:{},hr:{},ev:{}};try{const v=JSON.parse(localStorage.getItem('rt-seen'));if(v)SEEN={tw:{},pc:{},bf:{},en:{},rl:{},hr:{},ev:{},...v};}catch(e){}
const seen=(t,k)=>UNLOCK_ALL||(typeof OPT!=='undefined'&&OPT.u_cp)||!!SEEN[t][k];
let SEEOK=false;
function see(t,k){if(!SEEOK||SEEN[t][k])return;SEEN[t][k]=1;try{localStorage.setItem('rt-seen',JSON.stringify(SEEN));}catch(e){}}
const CP={open:false,tab:'tw',sup:{},prev:null,pen:'norm',flt:{},lv:{},spd:1};
