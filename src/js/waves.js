// ---- oleadas ----
// Reintentar: al empezar la oleada se guarda una copia de la partida; reintentar vuelve a ella (fase de construcción) y gasta una carga
function retryWave(){if(!S.snap||!(S.rc>0)||(S.phase!=='wave'&&S.phase!=='lost'))return;
 if(S.tut)TUTR++;const snap=S.snap,rc=S.tut?99:S.rc-1,used=((S.st&&S.st.retries)||0)+1;closePrim();closeFocus();RL.open=false;$('relic').classList.remove('open');$('endscr').classList.remove('open');
 S=structuredClone(snap);S.snap=snap;S.rc=rc;S.st.retries=used;S.phase='build';S.selT=null;S.aim=null;S.rask=0;S.mask=0;S.dn=[];
 S.msg=S.tut?'Oleada reiniciada.':'Oleada reiniciada. Te quedan '+rc+' carga'+(rc===1?'':'s')+' de Reintentar.';renderRelics();ui();}
function baseQueue(p){const q=[],cnt={};
 (p.sq||[]).forEach((k,j)=>{if(j)q.push('|');const m=(p.sqm&&p.sqm[j])||SQUADS[k].m,g=[];for(const t in m)for(let i=0;i<m[t];i++)g.push(t);g.sort((a,b)=>FORM[a]-FORM[b]);for(const t of g){q.push(t);cnt[t]=(cnt[t]||0)+1;}});
 const ec={};for(const t of p.esc||[])ec[t]=(ec[t]||0)+1;const extra=[];for(const t of REGT.concat(['cub'])){const d=(p.plan[t]||0)-(ec[t]||0)-(cnt[t]||0);if(d>0)for(let i=0;i<d;i++)extra.push(t);else if(d<0){let n=-d;for(let i=q.length-1;i>=0&&n>0;i--)if(q[i]===t){q.splice(i,1);n--;}}}
 if(extra.length){if(q.length)q.push('|');q.push(...extra);}
 return q.filter((t,i,a)=>t!=='|'||(i>0&&i<a.length-1&&a[i-1]!=='|'));}
// ---- bocadillos de los portales: una fila por escuadra (las iguales seguidas se agrupan con ×N) ----
const PSPEC=['mini','elite','wanted','greyw','bigw','momdrg','boss','colossus','bob'];let PTAP=null,PTSIG='';
const portalAt=c=>S.portals.find(p=>Math.abs(c.x-p.x)<=1&&Math.abs(c.y-p.y)<=1)||null;
function qGroups(list){const gs=[[]];for(let t of list){if(t==='|'){gs.push([]);continue;}t=t.replace('#','');gs[gs.length-1].push(t);}return gs.filter(g=>g.length);}
function rowOf(g){const o=[];for(const t of g){const r=o.find(x=>x[0]===t);if(r)r[1]++;else o.push([t,1]);}return o;}
function rowHtml(r){return `<div class="pbr">${r.map(([t,c])=>`<span class="${PSPEC.includes(t)?'pbs':''}"><i style="background:${ET[t==='wanted'?'elite':t].col}"></i>${t==='wanted'?'Élite (encargo)':ET[t].n} <b class="pbc">×${c}</b></span>`).join('')}</div>`;}
function portalRows(p,lim){
 let gs;if(S.phase==='wave')gs=qGroups(p.q||[]);else{gs=qGroups(baseQueue(p));const sp=[];for(const t of PSPEC)for(let i=0;i<(p.plan[t]||0);i++)sp.push(t);if(sp.length)gs.push(sp);}
 const tot=gs.reduce((a,g)=>a+g.length,0),pl=(n,s)=>n+' '+s+(n===1?'':'s');
 // en oleada: solo lo que viene ahora (dos escuadras como mucho) y cuántos quedan
 if(S.phase==='wave'){if(!gs.length)return '';const k=lim?1:2,rest=gs.length-k;return (lim?'':`<div class="pbh">Quedan ${pl(tot,'enemigo')} · siguientes:</div>`)+gs.slice(0,k).map(g=>rowHtml(rowOf(g))).join('')+(!lim&&rest>0?`<div class="pbmore">y ${pl(rest,'escuadra')} más</div>`:'');}
 // antes de la oleada, con muchas escuadras: el total por tipo de enemigo, más fácil de leer
 if(gs.length>3){const all=rowOf(gs.flat()).sort((a,b)=>(PSPEC.includes(a[0])-PSPEC.includes(b[0]))||b[1]-a[1]);return `<div class="pbh">${pl(tot,'enemigo')} en ${pl(gs.length,'escuadra')}</div><div class="pbr pbw">${rowHtml(all).replace(/^<div class="pbr">|<\/div>$/g,'')}</div>`;}
 if(lim)gs=gs.slice(0,2);
 // agrupa repeticiones: escuadras iguales seguidas (A A A → ×3 A) y alternancias de dos temas (A B A B → ×2 [A B])
 const it=gs.map(g=>{const r=rowOf(g);return{r,sg:JSON.stringify(r)};}),out=[];let i=0;
 while(i<it.length){let n=1;if(!lim)while(i+n<it.length&&it[i+n].sg===it[i].sg)n++;
  if(n>1){out.push({rows:[it[i]],n});i+=n;continue;}
  if(!lim&&i+1<it.length&&it[i+1].sg!==it[i].sg){let m=1;while(i+2*m+1<it.length&&it[i+2*m].sg===it[i].sg&&it[i+2*m+1].sg===it[i+1].sg)m++;if(m>1){out.push({rows:[it[i],it[i+1]],n:m});i+=2*m;continue;}}
  out.push({rows:[it[i]],n:1});i++;}
 const mc=out.some(b=>b.n>1);
 return out.map(b=>`<div class="pbg">${mc?`<b class="pbm">${b.n>1?'×'+b.n:''}</b>`:''}<div class="${b.n>1&&b.rows.length>1?'pbk':''}">${b.rows.map(x=>rowHtml(x.r)).join('')}</div></div>`).join('');}
function ptipTick(){const el=$('ptips');if(!el)return;
 const on=S&&(S.phase==='build'||S.phase==='wave')&&S.portals&&S.portals.length&&!RL.open&&!LB.open;
 let hv=null;if(on){if(M.has&&!M.touch){const r=cv.getBoundingClientRect();if(M.x>=r.left&&M.x<=r.right&&M.y>=r.top&&M.y<=r.bottom)hv=portalAt(cell({clientX:M.x,clientY:M.y}));}else if(PTAP&&S.portals.includes(PTAP))hv=PTAP;}
 const all=on&&(S.phase==='build'?OPT.ptip:OPT.ptipw),list=on?S.portals.filter(p=>p===hv||all):[];
 const r=cv.getBoundingClientRect(),c=$('cw').getBoundingClientRect(),k=sc()/VIEW*r.width;
 let html='';for(const p of list){const rows=portalRows(p,p!==hv&&S.phase==='wave');if(!rows)continue;
  const px=((p.x+.5)*CS-CAM.x)*k+(r.left-c.left),py=((p.y+.5)*CS-CAM.y)*k+(r.top-c.top);
  if(px<0||py<0||px>c.width||py>c.height)continue;
  html+=`<div class="pbub${p===hv?' hv':''}" style="left:${px.toFixed(0)}px;top:${(py-Math.max(10,1.2*CS*k)).toFixed(0)}px" data-py="${py.toFixed(0)}" data-of="${Math.max(10,1.2*CS*k).toFixed(0)}"><div class="pbin">${rows}</div><span class="pd1"></span><span class="pd2"></span><span class="pd3"></span></div>`;}
 if(html!==PTSIG){PTSIG=html;el.innerHTML=html;}
 // que el bocadillo no se salga del mapa: se desplaza en horizontal y, si no cabe arriba, se abre hacia abajo
 const W=c.width;for(const b of el.children){const inn=b.firstChild,w=inn.offsetWidth,h=b.offsetHeight,x=parseFloat(b.style.left),py=+b.dataset.py,of=+b.dataset.of;
  let dx=0;if(x-w/2<4)dx=4-(x-w/2);else if(x+w/2>W-4)dx=W-4-(x+w/2);inn.style.transform=dx?`translateX(${dx.toFixed(0)}px)`:'';
  const dn=py-of-h<4;b.classList.toggle('dn',dn);b.style.top=(dn?py+of:py-of)+'px';}}
function startWave(){
 // nunca con una pista abierta, una ventana abierta o, en el tutorial, una torre por elegir
 if(S.phase!=='build'||RL.open||(typeof hintBlocks==='function'&&hintBlocks()))return;
 if(S.tut&&S.tut.off){S.msg='Primero elige tu torre.';ui();return;}
 if(S.tut&&S.tut.lock){S.tut.lock=null;S.tut.lockAsk=null;}
 S.wk=0;
 if(!S.tut)romaChk();
 {const keep=S.snap;S.snap=null;const dn=S.dn;S.dn=[];try{S.snap=structuredClone(S);}catch(err){S.snap=null;console.warn(err);}S.dn=dn;}
 for(const p of S.portals){p.q=baseQueue(p);
  for(const t of['mini','elite','greyw','bigw','wanted','momdrg'])for(let i=0;i<(p.plan[t]||0);i++)p.q.splice(Math.floor(p.q.length*(.5+Math.random()*.4)),0,t);
  if(p.plan.boss)p.q.push('boss');if(p.plan.colossus)p.q.push('colossus');if(p.esc&&p.esc.length)p.q.push(...p.esc.map(t=>t+'#'));if(p.plan.bob)p.q.push('bob');p.t=0;}
 if(PR.auto){PR.auto=0;closePrim();}S.field=field();S.bags={};S.cf=cfield();S.af={};S.forks={};S.fbag={};S.wt=0;S.phase='wave';S.msg='';S.fury=0;S.hpW=S.hp;if(S.hero){S.hero.ucd=0;S.hero.bcd=0;}
 // duración prevista: lo que tarda en salir toda la cola + lo que tarda el enemigo más lento en recorrer el camino más largo
 {const iv=Math.max(.3,.7-S.round*.03);let sp=0,tr=0;for(const p of S.portals){let d=0;for(const t of p.q)d+=t==='|'?SQGAP:(t==='boss'||t==='colossus')?.25:t.endsWith('#')?.22:iv;sp=Math.max(sp,d);
   const ds=S.field&&S.field[p.y]?S.field[p.y][p.x]:60,slow=Math.min(...p.q.filter(t=>t!=='|').map(t=>ET[t==='wanted'?'elite':t.replace('#','')].sp),9);if(ds<1e9)tr=Math.max(tr,ds/Math.max(.1,slow));}
  S.furyAt=sp+tr+60;}
 ui();tutPhase('wave');
}
const oldHP=t=>S.tut||ET[t].evn||!ET[t].hf,ehpOf=(t,r)=>oldHP(t)?HP0*HPOLD(r)*ET[t].hp:ET[t].hf*hpR(r);
function spawnEnemy(t,p){
 let wanted=0;if(t==='wanted'){t='elite';wanted=1;}
 see('en',t);if(ET[t].fly&&!S.tut)hint('fly','Enemigos voladores','Los enemigos <b>voladores</b> no se pueden bloquear y no les afecta nada que golpee el suelo. El resto de tus ataques sí les dan.');
 const hp=ehpOf(t,S.round)*((t==='boss'||t==='colossus')&&S.round===ROUNDS?bossB():1),[da,db]=p.dir||[0,0],l=(p.ln=((p.ln||0)+1)%3)-1;let x=p.x,y=p.y;if(da!==0)y+=l;else if(db!==0)x+=l;
 const dest=p.split?p.split[(p.si=(p.si||0)+1)%p.split.length]:null;
 S.enemies.push({t,x,y,tx:x,ty:y,hp,max:hp,fx:{},src:null,wanted,dest});
}
function compassStep(e){
 // Brújula (pasivo), a nivel de pieza: al entrar en una casilla de pieza nueva puede desviarse por una rama que se aleja del núcleo y seguirla mientras la distancia siga creciendo
 const cx=Math.floor(e.tx/K),cy=Math.floor(e.ty/K),key=cx+','+cy;
 if(e.ck===key)return;
 const prev=e.ck?e.ck.split(',').map(Number):null;e.ck=key;
 if(!rp('compass')&&!e.away)return;
 const v0=S.cf[cy][cx];
 const aw=D.map(([a,b])=>[cx+a,cy+b]).filter(q=>inbc(q[0],q[1])&&S.cc[q[1]][q[0]]===2&&S.cf[q[1]][q[0]]>v0&&S.cf[q[1]][q[0]]<1e9&&!(prev&&q[0]===prev[0]&&q[1]===prev[1]));
 if(e.away){if(e.aw&&e.aw[0]===cx&&e.aw[1]===cy){if(aw.length)e.aw=aw[Math.floor(Math.random()*aw.length)];else{e.away=false;e.aw=null;}}}
 else if(rp('compass')&&!e.awayUsed&&aw.length&&Math.random()<.5){e.awayUsed=true;RS('compass').n++;e.away=true;e.aw=aw[Math.floor(Math.random()*aw.length)];}
}
// ---- cruces: en cada cruce, los enemigos se reparten entre las ramas que llegan al núcleo con poco rodeo (hasta FORKTOL casillas más largas),
// no solo por la más corta. La ruta alternativa se sigue casilla a casilla (e.wps) ----
const FORKTOL=6;
function forkRoutes(cx,cy){const key=cx+','+cy;S.forks=S.forks||{};if(S.forks[key])return S.forks[key];
 const isP=(x,y)=>inbc(x,y)&&S.cc[y][x]===2,c0=[Math.floor(S.core.x/K),Math.floor(S.core.y/K)];
 const d=Array.from({length:NC},()=>Array(NC).fill(1e9)),q=[c0];d[c0[1]][c0[0]]=0;
 for(let i=0;i<q.length;i++){const[x,y]=q[i];for(const[a,b]of D){const nx=x+a,ny=y+b;if(nx===cx&&ny===cy)continue;if(isP(nx,ny)&&d[ny][nx]>d[y][x]+1){d[ny][nx]=d[y][x]+1;q.push([nx,ny]);}}}
 const out=[];for(const[a,b]of D){const nx=cx+a,ny=cy+b;if(!isP(nx,ny)||!(d[ny][nx]<1e9))continue;
  const path=[[nx,ny]];let x=nx,y=ny,g=0;while(d[y][x]>0&&g++<4000){let nb=null;for(const[a2,b2]of D){const px=x+a2,py=y+b2;if(isP(px,py)&&d[py][px]<d[y][x]&&!(px===cx&&py===cy)){nb=[px,py];break;}}if(!nb)break;path.push(nb);x=nb[0];y=nb[1];}
  out.push({n:[nx,ny],len:1+d[ny][nx],path});}
 return S.forks[key]=out;}
function forkPick(e,cx,cy,prev){if(e.away||e.dest||e.wps||S.pvE||S.pvH||!S.cc||!S.cc[cy]||!S.cf||ra("compass"))return;
 const rs=forkRoutes(cx,cy).filter(r=>!(prev&&r.n[0]===prev[0]&&r.n[1]===prev[1]));if(rs.length<2)return;
 const best=Math.min(...rs.map(r=>r.len)),ok=rs.filter(r=>r.len<=best+FORKTOL);if(ok.length<2)return;
 const key=cx+','+cy;S.fbag=S.fbag||{};let bag=S.fbag[key];if(!bag||!bag.length)bag=S.fbag[key]=shuf(ok.map((r,i)=>i));const r=ok[bag.pop()];
 if(r.len===best&&S.cf[r.n[1]][r.n[0]]<S.cf[cy][cx])return;/* la más corta: la sigue el camino normal */
 e.wps=r.path.slice();}
function move(e,dt){if(e.fx.fear&&!e.fx.freeze&&!e.fx.stun){knock(e,ET[e.t].sp*.8*(S.espd||1)*dt);return false;}
 const PBK=.25;let mv=ET[e.t].sp*(e.fx.slow?e.fx.slow.m:1)*(e.fx.poly?POLYS:1)*(e.fx.haste?e.fx.haste.m:1)*(S.espd||1)*dt;if(e.fx.freeze||e.fx.stun||e.fx.root||e.stopped)mv=0;else if((ET[e.t].need||1)>1&&e.ct>0)mv*=Math.max(0,1-PBK*e.ct);
 const go=c=>{(e.trail=e.trail||[]).push([e.tx,e.ty]);if(e.trail.length>3000)e.trail.shift();e.pv=[e.tx,e.ty];e.tx=c[0];e.ty=c[1];};
 while(mv>0){
  const dx=e.tx-e.x,dy=e.ty-e.y,dd=Math.hypot(dx,dy);
  if(dd<1e-6){
   if(e.tx===S.core.x&&e.ty===S.core.y)return true;
   if(ra('compass')){if(e.trail&&e.trail.length){const c=e.trail.pop();e.pv=null;e.tx=c[0];e.ty=c[1];continue;}return false;}
   compassStep(e);
   if(e.dest&&Math.floor(e.tx/K)===Math.floor(e.dest[0]/K)&&Math.floor(e.ty/K)===Math.floor(e.dest[1]/K))e.dest=null;
   {const cx=Math.floor(e.tx/K),cy=Math.floor(e.ty/K),fk=cx+','+cy;if(e.fk!==fk){const pv=e.fk?e.fk.split(',').map(Number):null;e.fk=fk;forkPick(e,cx,cy,pv);}
    if(e.wps){while(e.wps.length&&e.wps[0][0]===cx&&e.wps[0][1]===cy)e.wps.shift();if(!e.wps.length)e.wps=null;}}
   const F=e.dest?afield([Math.floor(e.dest[0]/K),Math.floor(e.dest[1]/K)]):e.wps?afield(e.wps[0]):(e.away&&e.aw)?afield(e.aw):S.field;
   // solo se consideran vecinos que acercan al objetivo; entre varios igual de buenos se prefiere seguir recto (mantiene el carril) y, si no, se reparte con una bolsa barajada por casilla
   let bd=F[e.ty][e.tx],cs=[];
   for(const[a,b]of D){const nx=e.tx+a,ny=e.ty+b;if(!inb(nx,ny))continue;const v=F[ny][nx];
    if(v>=bd)continue;if(cs.length&&v<F[cs[0][1]][cs[0][0]])cs=[];
    if(!cs.length||v===F[cs[0][1]][cs[0][0]])cs.push([nx,ny]);}
   if(!cs.length)return false;
   let best=cs[0];
   if(cs.length>1){
    const st=e.pv?cs.find(c=>c[0]===2*e.tx-e.pv[0]&&c[1]===2*e.ty-e.pv[1]):null;
    if(st)best=st;
    else{const k=e.tx+','+e.ty;let bag=S.bags[k];
     if(!bag||!bag.length)bag=S.bags[k]=shuf(cs.map((_,i)=>i));
     best=cs[bag.pop()];}}
   go(best);continue;
  }
  const st=Math.min(mv,dd);e.x+=dx/dd*st;e.y+=dy/dd*st;mv-=st;
 }
 return false;
}
