// ==================== ERA 2 · torres de serie: Búnker, Robots, Enjambre de nanitos y Láser de arco ====================
// Iconos vectoriales de las torres nuevas (se dibujan sobre un disco oscuro; el emoji «ic» queda para los textos)
const E2SVG={
 bunker:'<svg viewBox="0 0 64 64"><path d="M8 52 L12 30 Q32 18 52 30 L56 52Z" fill="#6a7060" stroke="#2a2e26" stroke-width="2.5"/><rect x="18" y="34" width="28" height="6" rx="2" fill="#1a1c18"/><path d="M40 37 L58 33" stroke="#e8b04a" stroke-width="3.5"/><path d="M8 52 L56 52" stroke="#8a8e7a" stroke-width="3"/><path d="M14 46 h6 M24 46 h6 M34 46 h6 M44 46 h6" stroke="#9a9a7a" stroke-width="2"/></svg>',
 robots:'<svg viewBox="0 0 64 64"><rect x="20" y="10" width="24" height="18" rx="4" fill="#9aa4b4" stroke="#3a4250" stroke-width="2"/><rect x="25" y="16" width="14" height="5" rx="2" fill="#3fe8ff"/><path d="M32 4 V10" stroke="#3a4250" stroke-width="2"/><circle cx="32" cy="4" r="2.5" fill="#ff4fd8"/><rect x="16" y="30" width="32" height="20" rx="4" fill="#7a8494" stroke="#3a4250" stroke-width="2"/><rect x="8" y="32" width="8" height="14" rx="3" fill="#9aa4b4" stroke="#3a4250" stroke-width="2"/><rect x="48" y="32" width="8" height="14" rx="3" fill="#9aa4b4" stroke="#3a4250" stroke-width="2"/><rect x="20" y="50" width="9" height="10" fill="#5a6474"/><rect x="35" y="50" width="9" height="10" fill="#5a6474"/></svg>',
 nano:'<svg viewBox="0 0 64 64"><g fill="#c8f4ff" stroke="#1b1712" stroke-width="1.2"><circle cx="32" cy="32" r="3"/><circle cx="22" cy="26" r="2"/><circle cx="42" cy="24" r="2.2"/><circle cx="44" cy="38" r="1.8"/><circle cx="24" cy="40" r="2.2"/><circle cx="32" cy="18" r="1.6"/><circle cx="14" cy="34" r="1.4"/><circle cx="50" cy="30" r="1.5"/><circle cx="34" cy="46" r="1.7"/><circle cx="28" cy="52" r="1.2"/><circle cx="52" cy="44" r="1.2"/><circle cx="16" cy="20" r="1.2"/></g><circle cx="32" cy="32" r="18" fill="none" stroke="#6b8cff" stroke-width="1.5" stroke-dasharray="3 4" opacity=".7"/></svg>',
 laser:'<svg viewBox="0 0 64 64"><rect x="24" y="34" width="16" height="24" fill="#5a6474" stroke="#2a3040" stroke-width="2"/><path d="M20 34 h24" stroke="#9aa4b4" stroke-width="3"/><circle cx="32" cy="22" r="10" fill="#1a2440" stroke="#ffe24a" stroke-width="2.5"/><circle cx="32" cy="22" r="4" fill="#fff6b0"/><path d="M40 16 L48 10 L46 18 L56 12" fill="none" stroke="#ffe24a" stroke-width="2.5" stroke-linejoin="round"/><path d="M24 16 L16 12 L18 20 L8 18" fill="none" stroke="#ffe24a" stroke-width="2" stroke-linejoin="round" opacity=".8"/></svg>',
 altar:'<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="22" fill="none" stroke="#1b1712" stroke-width="6.1"/><circle cx="32" cy="32" r="22" fill="none" stroke="#c89aff" stroke-width="2.5"/><circle cx="32" cy="32" r="14" fill="#2a1a40" stroke="#1b1712" stroke-width="2"/><path d="M32 22 L32 42 M26 28 L38 36 M38 28 L26 36" stroke="#e8d0ff" stroke-width="2"/><g fill="#e8d0ff" stroke="#1b1712" stroke-width="1.6"><circle cx="32" cy="10" r="2.5"/><circle cx="54" cy="32" r="2.5"/><circle cx="32" cy="54" r="2.5"/><circle cx="10" cy="32" r="2.5"/></g></svg>',
 dron:'<svg viewBox="0 0 64 64"><path d="M8 54 L14 44 L50 44 L56 54Z" fill="#3a4250" stroke="#1a1e26" stroke-width="2"/><ellipse cx="32" cy="44" rx="18" ry="4" fill="#5a6474" stroke="#9aa4b4" stroke-width="1.5"/><path d="M24 44 h16 M32 41 v6" stroke="#e8b04a" stroke-width="1.5"/><g transform="translate(32,26)"><path d="M-14 -8 L14 8 M14 -8 L-14 8" stroke="#5a6474" stroke-width="3"/><g fill="#9aa4b4" stroke="#3a4250" stroke-width="1.5"><ellipse cx="-14" cy="-8" rx="8" ry="2.8"/><ellipse cx="14" cy="-8" rx="8" ry="2.8"/><ellipse cx="-14" cy="8" rx="8" ry="2.8"/><ellipse cx="14" cy="8" rx="8" ry="2.8"/></g><rect x="-8" y="-6" width="16" height="12" rx="3" fill="#e8b04a" stroke="#6a4a1a" stroke-width="1.5"/><circle r="2.5" fill="#3fe8ff"/></g></svg>'};
for(const k in E2SVG)if(TW[k])TW[k].icsvg=E2SVG[k];
// dron en vuelo (sin pinza) para el Dron de mantenimiento
const E2DRONE='<svg viewBox="0 0 64 64"><g transform="translate(32,32)"><path d="M-14 -8 L14 8 M14 -8 L-14 8" stroke="#5a6474" stroke-width="3"/><g fill="#cfd6e0" stroke="#3a4250" stroke-width="1.5"><ellipse cx="-14" cy="-8" rx="8" ry="2.8"/><ellipse cx="14" cy="-8" rx="8" ry="2.8"/><ellipse cx="-14" cy="8" rx="8" ry="2.8"/><ellipse cx="14" cy="8" rx="8" ry="2.8"/></g><rect x="-8" y="-6" width="16" height="12" rx="3" fill="#e8b04a" stroke="#6a4a1a" stroke-width="1.5"/><circle r="2.5" fill="#3fe8ff"/></g></svg>';
const SVGIMG={};function svgImg(svg){let im=SVGIMG[svg];if(!im){im=new Image();im.src=svg.startsWith('data:')?svg:'data:image/svg+xml;utf8,'+encodeURIComponent(svg.includes('xmlns=')?svg:svg.replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" '));SVGIMG[svg]=im;}return im;}
// icDraw / icHtml entienden {svg}: en el lienzo, disco oscuro + imagen; en HTML, el svg en línea
{const _d=icDraw;icDraw=function(c,ic,x,y,sz){if(ic&&typeof ic==='object'&&ic.img){const im=svgImg(ic.img);if(im.complete&&im.naturalWidth)try{c.drawImage(im,x-sz*.62,y-sz*.62,sz*1.24,sz*1.24);}catch(e){}return;}if(ic&&typeof ic==='object'&&ic.svg){const im=svgImg(ic.svg),r=sz*.6;/* v308: fondo del color de la torre con borde oscuro, como en los diseños */c.fillStyle=ic.bg||'#0c1622';c.beginPath();c.arc(x,y,r,0,7);c.fill();if(ic.bg){c.strokeStyle='#1b1712';c.lineWidth=Math.max(1,sz*.05);c.stroke();}if(im.complete&&im.naturalWidth)try{c.drawImage(im,x-r*1.05,y-r*1.05,r*2.1,r*2.1);}catch(e){}return;}return _d.apply(this,arguments);};
 const _h=icHtml;icHtml=function(ic){if(ic&&typeof ic==='object'&&ic.img)return `<span class="icst icimg"><img src="${ic.img}" alt=""></span>`;if(ic&&typeof ic==='object'&&ic.svg)return `<span class="icst icsvg">${ic.svg}</span>`;return _h.apply(this,arguments);};}
UIC.robots={f:'🤖',b:'🛡️',fs:.9};UIC.kami='💥';UIC.mecha='🦾';
// ---- multiplicador de daño común (infección de los nanitos, marcador láser del Nido, bengala de Vega) ----
function e2DmgM(e,src,ty){let m=1;if(e.inf&&e.inf.t>0)m*=1+e.inf.m;if(typeof flareM==='function')m*=flareM(e);return m;}
// ---- estadísticas: calentamiento del Búnker, red eléctrica, enjambre devorador, críticos del Nido, bufos de runas y drones ----
{const _st=stats;stats=function(t){const s=_st.apply(this,arguments);if(!t||t.hero||!TW[t.type])return s;const TT=twm(t.type,t.spec);
 if(TT.mag!=null&&TT.mag>0){const mx=magMax(t),h=1-Math.min(1,(t.magN==null?mx:t.magN)/mx),tr=abRank(t,'trigger');s.rate*=1+((TT.ramp||.6)+(tr?tr.r:0))*h;}
 if(TT.net){s.dmg*=1+.15*Math.min(4,t.netN||0);}
 if(TT.grow)s.dmg*=t.g||1;
 {const w=abRank(t,'weak');if(w)s.critm+=w.m;}
 if(t.rb&&t.rb.t>0){if(t.rb.k==='d')s.dmg*=1+t.rb.m;else if(t.rb.k==='r')s.rate*=1+t.rb.m;else s.range*=1+t.rb.m;}
 if(t.drc>0)s.crit=Math.min(1,s.crit+(t.drp||.05)*t.drc);
 if(t.oc>0)s.rate*=t.ocm||2;
 return s;};}
const magMax=t=>{const TT=twm(t.type,t.spec),mz=abRank(t,'magz');return (TT.mag||0)+(mz?mz.n:0);};
// ---- Búnker: disparo con cargador; el Nido no tiene cargador y marca con láser ----
function bunkerFire(t,tg,s,dm,crit){const TT=twm(t.type,t.spec),mx=magMax(t);
 if(mx>0){if(t.magN==null)t.magN=mx;t.magN--;}
 S.proj.push({x:t.x,y:t.y,e:tg,tx:tg.x,ty:tg.y,vx:0,vy:0,dm,dt:'phys',src:t,sp:TT.ps||40,area:0,slow:0,pen:s.pen,col:TT.col,crit,bul:1});
 if(mx>0&&t.magN<=0){t.magN=mx;t.cd=Math.max(t.cd,TT.reload||1.8);t.rld=TT.reload||1.8;}
 if(abRank(t,'lmark')){t.lmE=tg;const v=abRank(t,'lmark').v,q=tg.lmk&&tg.lmk.t>0?tg.lmk:null;tg.lmk={t:Math.max(1/s.rate+.4,q?q.t:0),v:Math.max(v,q?q.v:0)};}}
// ---- Robots ----
CLS.mecha={n:'Mecha',d:2,rt:.8,cr:.05,hp:2.5,ap:15,sp:.75};
function robotsSpec(t){const T=TW[t.type];if(!T||t.type!=='robots'||!t.sd)return;
 if(t.spec==='mecha'){const s=t.sd[0];if(s&&!s.mech){s.mech=1;s.cls='mecha';s.wt=2;s.max*=2.5;s.hp=Math.min(s.max,s.hp*2.5);}}
 if(t.spec==='kami'){while(t.sd.length<4){const i=t.sd.length;t.sd.push({i,x:t.x,y:t.y,hp:sdHp(t),max:sdHp(t),en:null,cd:0,rt:0,tw:t,lock:true,fight:false});}}}
{const _cs=chooseSpec;chooseSpec=function(t,sp){const r=_cs.apply(this,arguments);try{if(t&&t.spec===sp)robotsSpec(t);}catch(e){}return r;};}
function kamiBoom(t,s,mul){const st=stats(t),dm=st.dmg*3*(mul||1),r=1*K;let n=0;for(const e of S.enemies)if(e.hp>0&&Math.hypot(e.x-s.x,e.y-s.y)<=r){hurt(e,dm,t,'phys',st.pen);n++;}
 S.fx.push({x:s.x,y:s.y,t:.4,m:.4,r,col:'#ff8a5a'});try{sfx('boom');}catch(e){}
 const sc=abRank(t,'scrap');if(sc){(S.scrap=S.scrap||[]);for(let i=0;i<sc.n;i++){const a=Math.random()*6.283,d=(.4+Math.random()*.8)*K;S.scrap.push({x:s.x+Math.cos(a)*d,y:s.y+Math.sin(a)*d,x0:s.x,y0:s.y,t:1,m:1,dm:st.dmg*3*sc.m,src:t,pen:st.pen});}}}
{const _ud=unitDeath;unitDeath=function(t,s){try{if(t&&t.type==='robots'&&t.spec==='kami'&&!S.pvE)kamiBoom(t,s,s.boom||1);}catch(e){}return _ud.apply(this,arguments);};}
// reaparición más rápida de los kamikazes: la reparación la lleva unitWalk con s.rt = U.rez; ajustamos el rez de la torre al elegir la habilidad
{const _b=buyAb;buyAb=function(t,id){const r=_b.apply(this,arguments);try{if(id==='reens'&&t&&t.ab&&t.ab.reens)t.uov={...(t.uov||TW.robots.unit),n:4,rez:abRank(t,'reens').t,hp:TW.robots.unit.hp,ap:TW.robots.unit.ap,spd:TW.robots.unit.spd};if(id==='infect'&&t)nanoSetup(t);try{chapaCheck(t);}catch(e){}}catch(e){}return r;};}
// camino hacia los portales desde una casilla: sigue las casillas de camino cuyo campo (distancia al núcleo) crece; en los cruces devuelve las ramas
function awayNext(x,y){const f0=S.field[y]&&S.field[y][x];if(f0==null||f0<0)return[];const out=[];for(const[dx,dy]of D){const nx=x+dx,ny=y+dy;if(!inb(nx,ny)||S.cells[ny][nx]!==2||cutF(x,y,nx,ny))continue;const f=S.field[ny][nx];if(f!=null&&f>f0)out.push({x:nx,y:ny});}return out;}
function awayRoute(x,y,n){const r=[{x,y}];let cx=x,cy=y;for(let i=0;i<n;i++){const nx=awayNext(cx,cy);if(!nx.length)break;const q=nx[Math.floor(Math.random()*nx.length)];r.push(q);cx=q.x;cy=q.y;}return r;}
function mechaTickE2(dt){for(const t of S.list){if(t.type!=='robots'||!t.sd)continue;const st=stats(t);
  // blindaje reactivo: si un robot ha perdido vida desde el último fotograma, puede rebotar el golpe
  const rc=abRank(t,'react');for(const s of t.sd){if(s.hp>0&&s.php!=null&&s.hp<s.php&&rc&&prdRoll(rc,rc.p)){const d=s.php-s.hp;s.hp=Math.min(s.max,s.hp+d/2);if(s.en&&s.en.hp>0){hurt(s.en,st.dmg,t,'phys',st.pen);S.fx.push({x:s.x,y:s.y,t:.2,m:.2,r:.5*K,col:'#9fe8ff'});}}s.php=s.hp;}
  if(t.spec==='mecha'){const m=t.sd[0];for(const k in t.acd)t.acd[k]=Math.max(0,(t.acd[k]||0)-dt);
   const sh=abRank(t,'shoulder');if(sh&&m&&m.hp>0&&!(t.acd.shoulder>0)){const f=t.flag||t;let be=null;for(const e of S.enemies)if(e.hp>0&&Math.hypot(e.x-f.x,e.y-f.y)<=3*K&&(!be||e.hp>be.hp))be=e;
    if(be){t.acd.shoulder=sh.cd;S.proj.push({x:m.x,y:m.y,e:be,tx:be.x,ty:be.y,vx:0,vy:0,dm:st.dmg*sh.m,dt:'phys',src:t,sp:9*K,area:sh.r*K,slow:0,pen:st.pen,col:'#ff9a5c',crit:false});}}
   const dr=abRank(t,'drill');if(dr&&m&&m.hp>0&&!(t.acd.drill>0)&&!t.drillO){const f=t.flag||t;const near=S.enemies.some(e=>e.hp>0&&Math.hypot(e.x-f.x,e.y-f.y)<=3*K);
    if(near){const route=awayRoute(Math.round(f.x),Math.round(f.y),dr.d);if(route.length>1){t.acd.drill=dr.cd;t.drillO={r:route,i:0,k:0,hit:new Set(),dm:st.dmg*dr.m,pen:st.pen};}}}
   if(t.drillO){const o=t.drillO;o.k+=dt*6;while(o.k>=1&&o.i<o.r.length-1){o.k-=1;o.i++;}const a=o.r[o.i],b=o.r[Math.min(o.r.length-1,o.i+1)],x=a.x+(b.x-a.x)*Math.min(1,o.k),y=a.y+(b.y-a.y)*Math.min(1,o.k);o.x=x;o.y=y;
    for(const e of S.enemies){if(e.hp<=0||o.hit.has(e)||isFly(e)||Math.hypot(e.x-x,e.y-y)>1.2*K)continue;o.hit.add(e);hurt(e,o.dm,t,'phys',o.pen);knock(e,.5*K);}
    if(m){m.x=x;m.y=y;m.lock=false;}
    if(o.i>=o.r.length-1&&o.k>=1){t.drillO=null;if(m){m.lock=true;}}}}
  if(t.spec==='kami'){const dc=abRank(t,'decoy');for(const k in t.acd)t.acd[k]=Math.max(0,(t.acd[k]||0)-dt);
   if(dc&&!(t.acd.decoy>0)&&!t.sd.some(s=>s.beep>0)){const alive=t.sd.filter(s=>s.hp>0&&!s.lock),nearE=S.enemies.some(e=>e.hp>0&&Math.hypot(e.x-(t.flag||t).x,e.y-(t.flag||t).y)<=3*K);
    if(alive.length&&nearE){const s=alive[Math.floor(Math.random()*alive.length)];s.beep=1.5;s.beepR=dc.r*K;t.acd.decoy=dc.cd;}}
   for(const s of t.sd)if(s.beep>0){s.beep-=dt;const fs=(S.field[Math.round(s.y)]||[])[Math.round(s.x)];for(const e of S.enemies){if(e.hp<=0||isBoss(e)||isFly(e))continue;const d=Math.hypot(e.x-s.x,e.y-s.y);if(d>s.beepR||d<.3)continue;/* v305: solo tira hacia atrás de los que ya lo han pasado; a los que aún vienen no los adelanta hacia el núcleo */const fe=(S.field[e.ty]||[])[e.tx];if(fs!=null&&fe!=null&&fe>=fs)continue;const mv=Math.min(d-.25,2.5*K*dt),q=pathNear(e.x+(s.x-e.x)/d*mv,e.y+(s.y-e.y)/d*mv);if(q){e.x=e.tx=q.x;e.y=e.ty=q.y;}}
    if(s.beep<=0&&s.hp>0){s.boom=2;s.hp=0;s.dd=0;/* v305: antes no se le ponía tiempo de reensamblaje y el androide del señuelo no volvía nunca: la torre se quedaba sin androides */s.rt=Math.min(unitOf(t).rez||8,3);s.en=null;}}}}
 // piezas de la chatarra volátil
 if(S.scrap&&S.scrap.length){for(const q of S.scrap){q.t-=dt;if(q.t<=0){for(const e of S.enemies)if(e.hp>0&&Math.hypot(e.x-q.x,e.y-q.y)<=.6*K)hurt(e,q.dm,q.src,'phys',q.pen);S.fx.push({x:q.x,y:q.y,t:.3,m:.3,r:.6*K,col:'#ffb07a'});}}S.scrap=S.scrap.filter(q=>q.t>0);}}
// ---- Enjambre de nanitos ----
function nanoN(t){const TT=twm(t.type,t.spec),inf=abRank(t,'infect');return (TT.nsw||1)+(inf&&inf.sw?1:0);}
function nanoSetup(t){if(t.type!=='nano')return;const n=nanoN(t);t.sw=t.sw||[];while(t.sw.length<n)t.sw.push({x:t.x,y:t.y,e:null,ph:Math.random()*6.283,tk:0});t.sw.length=n;}
function nanoGrowMax(t){const h=abRank(t,'hunger');return h?h.max:1.8;}
function nanoTick(dt){const prog=e=>S.field[e.ty][e.tx]+Math.hypot(e.tx-e.x,e.ty-e.y);
 for(const t of S.list){if(t.type!=='nano')continue;if(!t.sw||t.sw.length!==nanoN(t))nanoSetup(t);const s=stats(t),TT=twm(t.type,t.spec),g=TT.grow?(t.g||1):1,md=TGT[t.mode]||TGT.core,inf=abRank(t,'infect'),ac=abRank(t,'acid');
  if(t.acd)for(const k in t.acd)t.acd[k]=Math.max(0,(t.acd[k]||0)-dt);
  const taken=new Set(t.sw.map(w=>w.e).filter(Boolean));
  for(const w of t.sw){w.ph+=dt*3;
   if(w.e&&!(alive(w.e)&&Math.hypot(w.e.x-t.x,w.e.y-t.y)<=s.range)){taken.delete(w.e);w.e=null;}
   if(!w.e&&S.phase==='wave'){let be=null,bs=0;for(const e of S.enemies){if(e.hp<=0||taken.has(e)||Math.hypot(e.x-t.x,e.y-t.y)>s.range)continue;const sc=md.score(e,prog);if(!be||sc>bs||(sc===bs&&prog(e)<prog(be))){be=e;bs=sc;}}
    if(!be)for(const e of S.enemies){if(e.hp<=0||Math.hypot(e.x-t.x,e.y-t.y)>s.range)continue;const sc=md.score(e,prog);if(!be||sc>bs){be=e;bs=sc;}}
    if(be){w.e=be;taken.add(be);}}
   const tx=w.e?w.e.x:t.x,ty=w.e?w.e.y:t.y,dx=tx-w.x,dy=ty-w.y,dd=Math.hypot(dx,dy),sp=6*K*dt;
   if(dd>sp){w.x+=dx/dd*sp;w.y+=dy/dd*sp;}else{w.x=tx;w.y=ty;}
   if(!w.e)continue;const rad=.45*K*g;w.tk-=dt;
   if(Math.hypot(w.e.x-w.x,w.e.y-w.y)<=.5*K&&w.tk<=0){w.tk+=1/s.rate;const crit=prdRoll(w,s.crit+mkB(w.e),"cr"),dm=s.dmg*(crit?s.critm:1);
    for(const e of S.enemies){if(e.hp<=0)continue;const d=Math.hypot(e.x-w.x,e.y-w.y);if(d>rad&&e!==w.e)continue;const full=e===w.e;hurt(e,dm*(full?1:.6),t,'magic',s.pen);if(e.hp>0){if(inf)e.inf={t:4,m:inf.m,src:t};if(ac){e.ack=(e.ack||0)+1/s.rate;if(e.ack>=1){e.ack-=1;brkAdd(e,ac.a,ac.max);mbrkAdd(e,ac.a,ac.max);}}}}
    if(crit)critMark(w.e);onHit(w.e,t);try{sfx('beam',{r:.7});}catch(e){}}}}
 // infección: caduca; reprogramar: el infectado ataca a otro enemigo
 for(const e of S.enemies){if(e.inf){e.inf.t-=dt;if(e.inf.t<=0)e.inf=null;else{const src=e.inf.src,rp=src&&S.list.includes(src)?abRank(src,'reprog'):null;if(rp){e.rpt=(e.rpt||0)+dt;if(e.rpt>=1){e.rpt-=1;if(prdRoll(rp,rp.p)){let o=null,bd=1*K;for(const q of S.enemies){if(q===e||q.hp<=0)continue;const d=Math.hypot(q.x-e.x,q.y-e.y);if(d<bd){bd=d;o=q;}}
    if(o){const st=stats(src);hurt(o,st.dmg,src,'magic',st.pen);S.fx.push({bolt:[[e.x,e.y],[o.x,o.y]],t:.15,m:.15});if(o.hp<=0)infPass(e,src,true);}}}}}}
  if(e.mrbT>0){e.mrbT-=dt;if(e.mrbT<=0)e.mrb=0;}}}
// la infección (y la reprogramación) pasa a otro enemigo cercano
function infPass(e,src,fromKill){const inf=abRank(src,'infect');if(!inf)return;let o=null,bd=2*K;for(const q of S.enemies){if(q===e||q.hp<=0||(q.inf&&q.inf.t>0))continue;const d=Math.hypot(q.x-e.x,q.y-e.y);if(d<bd){bd=d;o=q;}}if(o){o.inf={t:4,m:inf.m,src};S.fx.push({bolt:[[e.x,e.y],[o.x,o.y]],t:.2,m:.2});}}
{const _ad=achDeath;achDeath=function(e){try{
  if(e.inf&&e.inf.t>0&&e.inf.src&&S.list.includes(e.inf.src)){const src=e.inf.src,v=abRank(src,'virus');if(v){for(const q of S.enemies)if(q!==e&&q.hp>0&&Math.hypot(q.x-e.x,q.y-e.y)<=v.r*K)q.inf={t:4,m:e.inf.m,src};S.fx.push({x:e.x,y:e.y,t:.4,m:.4,r:v.r*K,col:'#9fe0ff'});}if(abRank(src,'reprog'))infPass(e,src);}
  const k=e.src;if(k&&k.type==='nano'&&k.spec==='devour'&&S.list.includes(k)){const h=abRank(k,'hunger');k.g=Math.min(nanoGrowMax(k),(k.g||1)+(h?h.g:.08));}
 }catch(er){}return _ad.apply(this,arguments);};}
// resistencia mágica rota por el ácido: se resta en el daño mágico
{const _am=armorOf;/* armorOf es const: el ácido se aplica como multiplicador en e2DmgM */}
{const _m=e2DmgM;e2DmgM=function(e,src,ty){let m=_m(e,src,ty);if(ty==='magic'&&e.mrb>0){const A0=Math.max(-MAXPEN,(ET[e.t].am||0)),A1=Math.max(-MAXPEN,A0-e.mrb);m*=(1-A1/(A1+ARM_K))/(1-A0/(A0+ARM_K));}return m;};}
// ---- Láser de arco ----
const VMAX=20;
function laserTick(dt){const reds=S.list.filter(t=>t.type==='laser'&&t.spec==='red');S.net=[];
 for(const t of reds)t.netN=0;
 /* v305: se conectan las que estén dentro del alcance de una de las dos torres (antes, 3 casillas fijas) */const rg=new Map(reds.map(t=>{let r=3.5*K;try{r=stats(t).range;}catch(e){}return[t,r];}));
 for(let i=0;i<reds.length;i++)for(let j=i+1;j<reds.length;j++){const a=reds[i],b=reds[j];if(Math.hypot(a.x-b.x,a.y-b.y)<=Math.max(rg.get(a),rg.get(b))){a.netN++;b.netN++;S.net.push([a,b]);}}
 for(const t of S.list){if(t.type!=='laser'||!t.acd)continue;for(const k in t.acd)t.acd[k]=Math.max(0,(t.acd[k]||0)-dt);}
 if(S.phase!=='wave')return;
 // valla eléctrica
 for(const[a,b]of S.net){const fa=abRank(a,'fence'),fb=abRank(b,'fence'),fr=fa&&fb?(fa.m>fb.m?fa:fb):(fa||fb);if(!fr)continue;const src=fa?a:b,st=stats(src);
  for(const e of S.enemies){if(e.hp<=0||e.fcd>0||isFly(e))continue;if(segD(e.x+.5,e.y+.5,[a.x+.5,a.y+.5,b.x+.5,b.y+.5])<=.45*K){e.fcd=3;hurt(e,st.dmg*fr.m,src,'elem');stunE(e,fr.s);S.fx.push({x:e.x,y:e.y,t:.25,m:.25,r:.5*K,col:'#9fe8ff'});}}}
 for(const e of S.enemies)if(e.fcd>0)e.fcd-=dt;
 // sobrecarga
 for(const t of reds){const ov=abRank(t,'overload');if(!ov||t.acd.overload>0)continue;const grp=netGroup(t);if(!grp.some(q=>S.enemies.some(e=>e.hp>0&&Math.hypot(e.x-q.x,e.y-q.y)<=stats(q).range)))continue;t.acd.overload=ov.cd;const st=stats(t);
  for(const q of grp){const r=stats(q).range;for(const e of S.enemies)if(e.hp>0&&Math.hypot(e.x-q.x,e.y-q.y)<=r)hurt(e,st.dmg*ov.m,t,'elem');S.fx.push({x:q.x,y:q.y,t:.4,m:.4,r,col:'#fff08a'});}}
 // arco voltaico: carga por tick (se aplica en onHit); aquí caduca la carga y pasa la carga «saltarina» al objetivo nuevo
 for(const t of S.list){if(t.type!=='laser'||t.spec!=='volt')continue;if(t.tgt&&t.tgt.hp>0){if(t.vE!==t.tgt){t.vE=t.tgt;if(t.vcarry>0){t.tgt.vc=t.tgt.vc||{};t.tgt.vc[t.id]=Math.max(t.tgt.vc[t.id]||0,t.vcarry);t.vcarry=0;}}}}}
function netGroup(t){const seen=new Set([t]),q=[t];while(q.length){const a=q.pop();for(const[x,y]of S.net){const o=x===a?y:y===a?x:null;if(o&&!seen.has(o)){seen.add(o);q.push(o);}}}return[...seen];}
// ---- golpes: cortocircuito, carga voltaica, balas expansivas, «sin pestañear», mecha en área ----
{const _oh=onHit;onHit=function(e,t){const r=_oh.apply(this,arguments);try{if(!t||!TW[t.type]||!S.list.includes(t))return r;const st=()=>stats(t);
  if(t.type==='laser'&&t.spec==='red'){const sc=abRank(t,'shortc');if(sc&&prdRoll(sc,sc.p)){const grp=netGroup(t).filter(q=>q!==t);let o=null;for(const q of grp){for(const x of S.enemies)if(x!==e&&x.hp>0&&Math.hypot(x.x-q.x,x.y-q.y)<=1.5*K){o=x;break;}if(o)break;}
    if(o){hurt(o,st().dmg*.6,t,'elem');S.fx.push({bolt:[[e.x,e.y],[o.x,o.y]],t:.15,m:.15});}}}
  if(t.type==='laser'&&t.spec==='volt'&&e.hp>0){const hv=abRank(t,'hv');e.vc=e.vc||{};e.vc[t.id]=(e.vc[t.id]||0)+1+(hv?hv.n:0);
   if(e.vc[t.id]>=VMAX){e.vc[t.id]=0;const dm=st().dmg*15;hurt(e,dm,t,'elem');stunE(e,1);const gr=abRank(t,'ground');if(gr)for(const o of S.enemies)if(o!==e&&o.hp>0&&Math.hypot(o.x-e.x,o.y-e.y)<=gr.r*K)hurt(o,dm*gr.p,t,'elem');
    S.fx.push({x:e.x,y:e.y,t:.4,m:.4,r:(gr?gr.r:.6)*K,col:'#fff08a'});S.fx.push({bolt:[[t.x,t.y],[e.x,e.y]],t:.2,m:.2,big:1});try{sfx('zap');}catch(er){}const jp=abRank(t,'jump');if(jp)t.vcarry=VMAX*jp.k;}}
  if(t.type==='bunker'){const ex=abRank(t,'expan');if(ex&&e.hp>0&&prdRoll(ex,ex.p))addBleed(e,t,1);if(e.hp<=0&&abRank(t,'blink'))t.cd=Math.min(t.cd,0);}
  if(t.type==='robots'&&t.spec==='mecha'&&t.sd&&t.sd[0]&&t.sd[0].fight&&t.sd[0].en===e){const m=t.sd[0],dm=st().dmg*2*.5;for(const o of S.enemies)if(o!==e&&o.hp>0&&Math.hypot(o.x-m.x,o.y-m.y)<=.7*K)hurt(o,dm,t,'phys',st().pen);}
 }catch(er){}return r;};}
// ---- tick común y limpieza al acabar la ronda ----
function e2TowersTick(dt){try{laserTick(dt);}catch(e){}try{nanoTick(dt);}catch(e){}try{mechaTickE2(dt);}catch(e){}
 for(const t of S.list){if(t.lmE&&(!alive(t.lmE)||!(t.lmE.lmk&&t.lmE.lmk.t>0)))t.lmE=null;if(t.rld>0)t.rld-=dt;}
 for(const e of S.enemies)if(e.lmk){e.lmk.t-=dt;if(e.lmk.t<=0)e.lmk=null;}}
{const _nr=nextRound;nextRound=function(){try{for(const t of S.list){if(t.type==='nano'&&t.spec==='devour'){const b=abRank(t,'bottom');t.g=1+((t.g||1)-1)*(b?b.k:0);}t.drillO=null;t.magN=null;if(t.sw)for(const w of t.sw){w.e=null;}}S.scrap=[];}catch(e){}return _nr.apply(this,arguments);};}
// ---- dibujo en el mundo (antes de los paneles) ----
function e2DrawWorld(lw){const X=v=>v*CS+CS/2,now=performance.now()/1000;
 // red eléctrica
 if(S.net)for(const[a,b]of S.net){g.strokeStyle='rgba(159,232,255,.85)';g.lineWidth=lw(2);g.beginPath();const n=6,dx=(b.x-a.x)/n,dy=(b.y-a.y)/n;g.moveTo(X(a.x),X(a.y));for(let i=1;i<n;i++){const j=(Math.sin(now*17+i*2.3+a.id)*.25);g.lineTo(X(a.x+dx*i-dy*j*2),X(a.y+dy*i+dx*j*2));}g.lineTo(X(b.x),X(b.y));g.stroke();}
 for(const t of S.list){const T=TW[t.type];
  // marcador láser del Nido
  if(t.lmE&&t.lmE.hp>0){g.strokeStyle='rgba(255,70,70,.9)';g.lineWidth=lw(1.2);g.setLineDash([lw(6),lw(4)]);g.beginPath();g.moveTo(X(t.x),X(t.y));g.lineTo(X(t.lmE.x),X(t.lmE.y));g.stroke();g.setLineDash([]);g.fillStyle='rgba(255,70,70,.9)';g.beginPath();g.arc(X(t.lmE.x),X(t.lmE.y),lw(3),0,7);g.fill();}
  // cargador del Búnker: barra bajo la torre
  if(T.mag&&S.phase==='wave'){const mx=magMax(t),n=t.magN==null?mx:t.magN,w=K*CS*.7,x0=X(t.x)-w/2,y0=X(t.y)+K*CS*.42;g.fillStyle='rgba(0,0,0,.6)';g.fillRect(x0,y0,w,lw(4));g.fillStyle=t.rld>0?'#ff9a5c':'#e8d08a';g.fillRect(x0,y0,w*(t.rld>0?1-Math.max(0,t.rld)/(twm(t.type,t.spec).reload||1.8):n/mx),lw(4));}
  // enjambres
  if(t.sw){const TT=twm(t.type,t.spec),gq=TT.grow?(t.g||1):1,rad=.45*K*gq*CS,np=Math.round((6+t.lvl*4)*gq/(t.sw.length>1?1.4:1));
   for(const w of t.sw){g.fillStyle='rgba(200,244,255,.95)';for(let i=0;i<np;i++){const a=w.ph*(.6+(i%5)*.2)+i*2.39,r=rad*(.25+.75*((i*7919)%100)/100);g.beginPath();g.arc(X(w.x)+Math.cos(a)*r,X(w.y)+Math.sin(a*1.3)*r,lw(1.4+(i%3)*.5),0,7);g.fill();}
    g.strokeStyle='rgba(107,140,255,.45)';g.lineWidth=lw(1);g.setLineDash([lw(2),lw(3)]);g.beginPath();g.arc(X(w.x),X(w.y),rad,0,7);g.stroke();g.setLineDash([]);}}
  // taladro
  if(t.drillO&&t.drillO.x!=null){const o=t.drillO,a=o.r[Math.min(o.r.length-1,o.i+1)],b=o.r[o.i],ang=Math.atan2(a.y-b.y,a.x-b.x);g.save();g.translate(X(o.x),X(o.y));g.rotate(ang);g.fillStyle='#e0884a';g.beginPath();g.moveTo(-K*CS*.5,-K*CS*.45);g.lineTo(K*CS*.7,0);g.lineTo(-K*CS*.5,K*CS*.45);g.closePath();g.fill();g.strokeStyle='#4a2a1a';g.lineWidth=lw(2);g.stroke();for(let i=0;i<4;i++){g.strokeStyle='rgba(255,230,150,.8)';g.beginPath();g.moveTo(-K*CS*.4+i*K*CS*.25,-K*CS*.35+i*K*CS*.17);g.lineTo(-K*CS*.2+i*K*CS*.25,K*CS*.35-i*K*CS*.17);g.stroke();}g.restore();}
  // mecha: icono sobre la unidad grande; kamikaze pitando
  if(t.type==='robots'&&t.sd)for(const s of t.sd){if(s.hp<=0)continue;if(s.mech){g.fillStyle='#14161c';g.font=Math.round(CS*1.6)+'px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('🦾',X(s.x),X(s.y)+1);}
   if(s.beep>0){const k=1-s.beep/1.5;g.strokeStyle='rgba(255,90,90,'+(.4+.6*Math.abs(Math.sin(now*12)))+')';g.lineWidth=lw(2);g.beginPath();g.arc(X(s.x),X(s.y),s.beepR*CS*(1-k*.6),0,7);g.stroke();}}
  // carga voltaica del objetivo
  if(t.type==='laser'&&t.spec==='volt'&&t.tgt&&t.tgt.hp>0&&t.tgt.vc&&t.tgt.vc[t.id]>0){const e=t.tgt,k=Math.min(1,e.vc[t.id]/VMAX),r=ET[e.t].r*CS*EVS+lw(5);g.strokeStyle='rgba(255,240,138,.9)';g.lineWidth=lw(2.5);g.beginPath();g.arc(X(e.x),X(e.y),r,-Math.PI/2,-Math.PI/2+k*6.283);g.stroke();}}
 // piezas de chatarra
 for(const q of S.scrap||[]){const k=1-q.t/q.m,x=q.x0+(q.x-q.x0)*Math.min(1,k*2),y=q.y0+(q.y-q.y0)*Math.min(1,k*2)-Math.sin(Math.min(1,k*2)*Math.PI)*K*.6;g.fillStyle='#ffb07a';g.beginPath();g.arc(X(x),X(y),lw(3),0,7);g.fill();}
 // infectados: aro cian; marcados con láser: punto rojo
 for(const e of S.enemies){if(e.inf&&e.inf.t>0){g.strokeStyle='rgba(159,224,255,.9)';g.lineWidth=lw(1.5);g.setLineDash([lw(2),lw(2)]);g.beginPath();g.arc(X(e.x),X(e.y),ET[e.t].r*CS*EVS+lw(3),0,7);g.stroke();g.setLineDash([]);}}}
// ---- palabras clave nuevas ----
const E2KW={mag:()=>'<b>Cargador</b><small>El Búnker dispara ráfagas con un cargador: cuanto más vacío está, más rápido dispara. Al vaciarse, recarga durante un momento (barra naranja bajo la torre) y vuelve a empezar.</small>',

 inf:()=>'<b>Infectado</b>'+R('','Duración','4 s')+'<small>Los nanitos han infectado al enemigo: recibe más daño de todas las fuentes. Con Virus, al morir contagia a los de alrededor; con Reprogramar, ataca a otros enemigos.</small>',
 vc:()=>'<b>Carga</b>'+R('','Máximo',VMAX)+'<small>El Arco voltaico carga de electricidad a su objetivo (anillo amarillo). Al llenarse, descarga: un golpe de 15× el daño de un tick y lo aturde 1 s.</small>'};
{const _k=kwHtml0;kwHtml0=function(id,src){if(E2KW[id])return E2KW[id]();return _k.apply(this,arguments);};}
