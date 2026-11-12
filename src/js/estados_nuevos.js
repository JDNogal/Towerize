// ---- v311 · Estados nuevos: regeneración y resistencia mágica rota; Fijado (antes «marcado con láser») con daño plano ----
// Los dos estados nuevos están creados y listos para usarse (regenAdd / mbrkAdd), pero todavía no los aplica nada:
// por eso el compendio los mantiene ocultos (MECUSE vacío) hasta que alguna torre, héroe o enemigo los use.
const RGNT=5,MBRKT=8;
// Resistencia mágica rota: como la armadura rota, pero sobre la resistencia mágica. Cada golpe suma y caduca por separado, hasta un máximo.
function mbrkOf(e){let s=0;if(e&&e.mbrk)for(const q of e.mbrk)s+=q.a;return s;}
function mbrkAdd(e,a,mx){if(!e||!(a>0))return;e.mbrk=e.mbrk||[];e.mbrk.push({t:MBRKT,a});let s=mbrkOf(e);while(s>(mx||a)&&e.mbrk.length){s-=e.mbrk[0].a;e.mbrk.shift();}}
// Regeneración: cura v de vida por segundo durante t s. Vale para enemigos y para tus unidades. No se acumula: manda la más fuerte y la que más dura.
function regenAdd(o,v,t){if(!o||!(o.hp>0)||!(v>0))return;const q=o.rgn&&o.rgn.t>0?o.rgn:null;o.rgn={v:Math.max(v,q?q.v:0),t:Math.max(t||RGNT,q?q.t:0)};}
function regenStep(o,dt){const q=o.rgn;if(!q)return;if(!(o.hp>0)){o.rgn=null;return;}q.t-=dt;if(o.hp<o.max)o.hp=Math.min(o.max,o.hp+q.v*dt);if(q.t<=0)o.rgn=null;}
function newStatesTick(dt){if(!S||S.phase!=='wave')return;
 for(const e of S.enemies){if(e.mbrk&&e.mbrk.length){for(const q of e.mbrk)q.t-=dt;e.mbrk=e.mbrk.filter(q=>q.t>0);}if(e.rgn)regenStep(e,dt);}
 for(const t of unitTowers())for(const s of t.sd||[])if(s.rgn)regenStep(s,dt);}
{const _t=e2TowersTick;e2TowersTick=function(dt){const r=_t.apply(this,arguments);try{newStatesTick(dt);}catch(e){}return r;};}
// señal sobre el que se regenera: cruces verdes que suben
{const _d=e2DrawWorld;e2DrawWorld=function(lw){const r=_d.apply(this,arguments);try{const X=v=>v*CS+CS/2,now=performance.now()/1000;
  const mark=(x,y,rr)=>{g.strokeStyle='rgba(110,230,120,.9)';g.lineWidth=lw(1.6);for(let i=0;i<2;i++){const k=(now*.9+i*.5)%1,px=X(x)+(i?rr:-rr)*.7,py=X(y)-rr-k*CS*.9,a=CS*.16;g.globalAlpha=1-k;g.beginPath();g.moveTo(px-a,py);g.lineTo(px+a,py);g.moveTo(px,py-a);g.lineTo(px,py+a);g.stroke();}g.globalAlpha=1;};
  for(const e of S.enemies)if(e.rgn&&e.hp>0)mark(e.x,e.y,ET[e.t].r*CS*(typeof EVS!=='undefined'?EVS:1));
  for(const t of unitTowers())for(const s of t.sd||[])if(s.rgn&&s.hp>0)mark(s.x,s.y,CS*.5);}catch(e){}return r;};}
// compendio: los dos estados, en «Estados», ocultos hasta que algo los use
{const G=MECG.find(x=>x[0]==='Estados');if(G){const i=G[1].findIndex(x=>x[0]==='brk');G[1].splice(i+1,0,['mrbrk','Resistencia mágica rota','💔']);G[1].push(['rgn','Regeneración','💚']);for(const[id,n,ic]of[['mrbrk','Resistencia mágica rota','💔'],['rgn','Regeneración','💚']])MECI[id]={id,n,ic,g:'Estados'};}
 MECUSE.mrbrk=[];MECUSE.rgn=[];}
E2KW.mrbrk=()=>'<b>Resistencia mágica rota</b>'+R('cr','Duración de cada golpe',MBRKT+' s')+'<small>Reduce la resistencia mágica del enemigo. Cada golpe suma su reducción y caduca por separado, hasta un máximo. Beneficia a todo el daño mágico, venga de la torre que venga.</small>';
E2KW.rgn=()=>'<b>Regeneración</b>'+R('cr','Duración',RGNT+' s')+'<small>Recupera vida cada segundo mientras dura. No se acumula: si recibe varias, cuenta la más fuerte. Puede afectar a enemigos y a tus unidades.</small>';
// Fijado (Nido de francotirador): daño plano extra por golpe de torres, unidades y héroe; no se acumula (si varios Nidos fijan al mismo enemigo, cuenta el valor más alto)
E2KW.lmk=()=>'<b>Fijado</b><small>El Nido de francotirador apunta a su objetivo con un láser rojo visible. Mientras dura, cada golpe de tus torres, unidades y héroe le hace daño plano extra (antes de armadura y de los bonus de daño). No se acumula: si varios Nidos fijan al mismo enemigo, cuenta el valor más alto. Los estados que hacen daño con el tiempo no lo aprovechan.</small>';
const fixFlat=(e,src)=>e.lmk&&e.lmk.t>0&&src&&!DNK&&!TZX?(e.lmk.v||0):0;
