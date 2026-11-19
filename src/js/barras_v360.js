// ==================== v360 · TANDA 2 DE BARRAS (Mesa «Barras de mecánica v4», shot barras5; cifras decididas con Nogal el 19-nov) ====================
// Cinco barras de HABILIDAD: ocupan el hueco de la habilidad que sustituyen y la barra solo sale al comprarla.
//  · Racha (Ballesteros, sustituye a Balas penetrantes): cada acierto seguido al mismo enemigo suma 1 (máx. 3/4/5 según el rango);
//    cada punto +10 % de daño y +5 % de velocidad de ataque; se pierde al cambiar de objetivo o al matarlo. Pips con relleno fluido.
//  · Concentración (Nido de francotirador, sustituye a Punto débil): tarda KCONC veces más en disparar y cada disparo hace +230/+260/+290 %.
//    Sin pestañear: al matar, durante 2 s se concentra el doble de rápido (la barra brilla y sale «×2»).
//  · Presión (Ogros, sustituye a Avalancha): la lógica está en towers_fantasy.js (rollStart/rollTick). Aquí, el montón de rocas.
//  · Reserva de escarcha (Guardián de la Ventisca, sustituye a Ventisca): se llena con los enemigos del aura; llena, los congela.
//  · Botín (Sede del Gremio, sustituye a Contratos lucrativos): 1 moneda cada 3 bajas del grupo; con 15, reparto de oro (30/45);
//    en el rango 2, cada reparto llena un cofrecito y al quinto, una reliquia en la siguiente pieza que coloques.
// Las palabras clave (Racha, Concentración, Presión, Reserva de escarcha, Botín) tienen su bocadillo con las cifras y su entrada en Mecánicas.

// ---------- números ----------
{const _st=stats;stats=function(t){const s=_st.apply(this,arguments);if(!t||t.hero||!t.ab)return s;
 if(t.spec==='xbow'){const r=abRank(t,'racha');if(r&&t.rkN>0){const n=Math.min(r.n,t.rkN);s.dmg*=1+.1*n;s.rate*=1+.05*n;}}
 else if(t.spec==='nido'){const c=abRank(t,'concen');if(c){s.dmg*=c.m;s.rate/=KCONC;}}
 return s;};}
// Racha: cuenta los aciertos seguidos al mismo enemigo
{const _sk=strike;strike=function(e,dm,t){const m=_sk.apply(this,arguments);try{if(t&&t.spec==='xbow'&&t.ab){const r=abRank(t,'racha');if(r){
  if(e.hp<=0){t.rkN=0;t.rkE=null;}else if(t.rkE===e)t.rkN=Math.min(r.n,(t.rkN||0)+1);else{t.rkE=e;t.rkN=1;}}}}catch(x){}return m;};}
// cada fotograma, para cada torre que dispara (update.js)
function mechTick(t,tg,s,dt){if(!t.ab)return;
 if(t.blT>0){t.blT=Math.max(0,t.blT-dt);if(t.spec==='nido'&&abRank(t,'concen'))t.cd=Math.max(-.1,t.cd-dt);}
 if(t.spec==='vent'){const r=abRank(t,'resv');if(!r)return;let n=0;const L=[];for(const e of S.enemies)if(e.hp>0&&Math.hypot(e.x-t.x,e.y-t.y)<=s.range){n++;L.push(e);}
  if(n)t.resvV=Math.min(1,(t.resvV||0)+dt*Math.min(n,RESVN*RESVMX)/(RESVN*r.T));
  if(t.resvV>=1&&n){t.resvV=0;t.resvF=(t.resvF||0)+1;for(const e of L)freezeE(e,r.d);S.fx.push({x:t.x,y:t.y,t:.6,m:.6,r:s.range,col:'#cdf2ff'});}}}
{const _sw=startWave;startWave=function(){try{for(const t of (S&&S.list)||[])if(t.spec==='xbow'){t.rkN=0;t.rkE=null;}}catch(e){}return _sw.apply(this,arguments);};}
// Botín: bajas de los aventureros de la Sede
function botinKill(e){const t=e&&e.src;if(!t||!TW[t.type]||!TW[t.type].guild||!t.ab||e.leak)return;const r=abRank(t,'botin');if(!r)return;
 t.btK=(t.btK||0)+1;if(t.btK<BOTK*BOTN)return;
 t.btK=0;const g=BOTN*r.g;goldEv(g);t.btRep=(t.btRep||0)+1;S.fx.push({x:t.x,y:t.y,t:.8,m:.8,r:1.4*K,col:'#ffd84a'});try{sfx('coin');}catch(x){}
 S.msg='¡Reparto del gremio! +'+g+' 🪙';
 if(r.cof){t.btC=(t.btC||0)+1;if(t.btC>=BOTC){t.btC=0;t.btRel=(t.btRel||0)+1;S.botR=(S.botR||0)+1;S.msg='¡Reparto del gremio! +'+g+' 🪙 y una reliquia, que te traerán en la siguiente pieza que coloques.';}}}
{const _mf=mimFeed;mimFeed=function(e){const r=_mf.apply(this,arguments);try{botinKill(e);}catch(x){}return r;};}
{const _pp=placePiece;placePiece=function(){const r=_pp.apply(this,arguments);try{if(S&&S.botR>0&&!RL.open&&S.phase==='build'){S.botR--;S.msg='Los aventureros del gremio te traen una reliquia.';openRelic();}}catch(x){}return r;};}
// partidas guardadas antes de la v360: las habilidades sustituidas pasan a la nueva con el mismo rango
const B6MIG={pierce:'racha',weak:'concen',aval:'presion',blizz:'resv',gcontr:'botin'};
function b6Mig(){for(const t of (S&&S.list)||[]){if(!t.ab)continue;for(const o in B6MIG)if(t.ab[o]){const n=B6MIG[o],rk=Math.min(t.ab[o],AB[n].ranks.length);delete t.ab[o];
  if(abIds(t).includes(n))t.ab[n]=Math.max(t.ab[n]||0,rk);}if(t.acd){delete t.acd.aval;delete t.acd.blizz;}}}
{const _lr=loadRun;loadRun=function(rec){try{if(rec&&rec.S&&rec.S.list){const S0=S;S=rec.S;try{b6Mig();}finally{S=S0;}}}catch(e){}return _lr.apply(this,arguments);};}

// ---------- palabras clave ----------
{const _k0=kwHtml0;kwHtml0=function(id,src){const rg=v=>`<span class="kw rgv" data-kw="rng" data-src="">${typeof f==='function'?f(v):v}</span>`;
 if(id==='racha')return `<b>Racha</b><small>Cada acierto seguido al mismo enemigo suma 1 punto de Racha. Cada punto da <span class="cd">+10%</span> de daño y <span class="cr">+5%</span> de velocidad de ataque.</small><small>El máximo depende del rango de la habilidad: <b>${AB.racha.ranks.map(r=>r.n).join(' / ')}</b> puntos. La Racha se pierde al cambiar de objetivo o al matarlo.</small>`;
 if(id==='concen')return `<b>Concentración</b><small>La torre se concentra mientras apunta y no dispara hasta tenerla llena: tarda el triple en disparar, pero cada disparo hace <span class="cd">${AB.concen.ranks.map(r=>'+'+Math.round((r.m-1)*100)+'%').join(' / ')}</span> de daño según el rango de la habilidad.</small><small>Con <b>Sin pestañear</b>, si un disparo mata a su objetivo, durante <span class="cr">${AB.blink.ranks[0].t} s</span> se concentra el doble de rápido.</small>`;
 if(id==='pres'){const R=AB.presion.ranks;return `<b>Presión</b><small>Cada enemigo que arrolla una roca suma 1 punto de Presión. Una roca arrolla como mucho a <b>${ROLLMX}</b> enemigos.</small><small>Con <b>${R.map(r=>r.n).join(' / ')}</b> puntos (según el rango de la habilidad), la siguiente roca es una avalancha: rueda ${R.map(r=>rg(r.d)).join(' / ')}, hace <span class="cd">${R.map(r=>r.m+'×').join(' / ')}</span> el daño del disparo a hasta <b>${R.map(r=>r.mx).join(' / ')}</b> enemigos y los empuja ${rg(.5)} hacia atrás.</small>`;}
 if(id==='resv'){const R=AB.resv.ranks;return `<b>Reserva de escarcha</b><small>Se llena con los enemigos que hay dentro del aura: con ${RESVN}, en <span class="cr">${R.map(r=>r.T+' s').join(' / ')}</span> según el rango de la habilidad; con más, antes (hasta el triple de rápido).</small><small>Llena, ${kw('freeze','congela','')} a todos los de dentro durante <span class="cr">${R.map(r=>r.d+' s').join(' / ')}</span>. Los jefes, la mitad.</small>`;}
 if(id==='botin'){const R=AB.botin.ranks;return `<b>Botín</b><small>Cada ${BOTK} bajas de los aventureros cae una moneda. Con ${BOTN} monedas, el grupo reparte <span class="gd">${R.map(r=>BOTN*r.g+' 🪙').join(' / ')}</span> según el rango de la habilidad.</small><small>En el rango 2, cada reparto llena uno de los ${BOTC} cofrecitos. Con los ${BOTC} llenos, los aventureros te traen una reliquia en la siguiente pieza que coloques.</small>`;}
 return _k0.apply(this,arguments);};}

// ---------- ficha: barras ----------
const B6H={racha:26,concen:30,pres:64,resv:36,botin:0};
const b6Stat=t=>{try{return stats(t);}catch(e){return null;}};
const b6Conc=t=>{const s=b6Stat(t);if(!s||!(s.rate>0))return 0;return Math.max(0,Math.min(1,1-Math.max(0,t.cd||0)*s.rate));};
const B6M=[
 {k:'racha',on:t=>t.spec==='xbow'&&!!abRank(t,'racha'),n:'Racha',ic:'racha',v:t=>(t.rkN||0)/abRank(t,'racha').n,
  l:t=>{const n=t.rkN||0;return n+' / '+abRank(t,'racha').n+(n?' · +'+n*10+'% de daño · +'+n*5+'% de velocidad':'');},
  x:t=>'Disparos lentos y muy fuertes. Cada acierto seguido al mismo enemigo suma Racha; si cambia de objetivo o lo mata, se pierde.'},
 {k:'concen',on:t=>t.spec==='nido'&&!!abRank(t,'concen'),n:'Concentración',ic:'concen',v:b6Conc,
  l:t=>{const v=b6Conc(t);return (v>=1?'¡Lista!':Math.round(v*100)+'%')+(t.blT>0?' · ×2':'');},
  x:t=>'Alcance enorme. Mientras apunta se concentra; llena, dispara y el disparo hace mucho más daño.'},
 {k:'pres',on:t=>t.spec==='ogre'&&!!abRank(t,'presion'),n:'Presión',ic:'pres',v:t=>(t.pres||0)/abRank(t,'presion').n,
  l:t=>{const o=b6S(t);return o.av>0?'¡Avalancha!':(t.pres||0)+' / '+abRank(t,'presion').n;},
  x:t=>'Cada enemigo que arrolla una roca suma Presión; llena, la siguiente roca es una avalancha.'},
 {k:'resv',on:t=>t.spec==='vent'&&!!abRank(t,'resv'),n:'Reserva de escarcha',ic:'resv',v:t=>t.resvV||0,
  l:t=>{const o=b6S(t);return o.burst>0?'¡Suelta la escarcha!':Math.round((t.resvV||0)*100)+'%';},
  x:t=>'Un aura que ralentiza y daña poco. Su frío llena la Reserva; llena, congela a todos los de dentro.'},
 {k:'botin',on:t=>!!(TW[t.type]&&TW[t.type].guild&&abRank(t,'botin')),n:'Botín',ic:'botin',v:t=>(t.btK||0)/(BOTK*BOTN),
  l:t=>{const r=abRank(t,'botin'),o=b6S(t);if(o.rep>0)return '¡Reparto! +'+BOTN*r.g+' 🪙';return Math.floor((t.btK||0)/BOTK)+' / '+BOTN+' monedas'+(r.cof?' · '+(t.btC||0)+' / '+BOTC+' cofres':'');},
  x:t=>'Cada '+BOTK+' bajas del grupo cae una moneda; con '+BOTN+', el grupo reparte oro.'}];
for(let i=B6M.length-1;i>=0;i--)TMECH.unshift(B6M[i]);
const B6K={};for(const m of B6M)B6K[m.k]=m;
const b6H=(k,t)=>k==='botin'?(abRank(t,'botin')&&abRank(t,'botin').cof?120:98):B6H[k];/* v361: más alto para que la pirámide y las monedas que caen no se corten (Nogal) */
const b6Box=(t,M,txt)=>`<div class="ftmech fbm b6m b6-${M.k}"><div class="ftmt"><b>${kw(M.ic,M.n,'tw:'+t.id,'st')}</b>${txt?' · '+txt:''}</div><canvas class="b6c" data-k="${M.k}" data-tid="${t.id}" style="height:${b6H(M.k,t)}px"></canvas><div class="ftml" data-b6="${M.k}">${M.l(t)}</div></div>`;
{const _mb=ftMechBox;ftMechBox=function(t,M,txt){if(!M||!B6K[M.k])return _mb.apply(this,arguments);return b6Box(t,M,txt);};}
// la Sede del Gremio aún usa la ficha antigua (uniqInfo): el Botín va justo debajo del título
{const _ui=uniqInfo;uniqInfo=function(t,k){const h=_ui.apply(this,arguments);try{if(t&&B6K.botin.on(t)){const i=h.indexOf('</div>')+6;return h.slice(0,i)+'<div class="b6uq">'+b6Box(t,B6K.botin,B6K.botin.x(t))+'</div>'+h.slice(i);}}catch(e){}return h;};}

// ---------- dibujo ----------
const B6={st:new WeakMap(),raf:0,last:0};
const b6S=t=>{let o=B6.st.get(t);if(!o){o={f:[0,0,0,0,0],brk:0,lastN:0,born:[],av:0,avN:0,lastAv:t.presAv||0,burst:0,lastF:t.resvF||0,fl:[],mist:[],rep:0,lastRep:t.btRep||0,rel:0,lastRel:t.btRel||0,coins:[],lastCoins:0};B6.st.set(t,o);}return o;};
const b6E=x=>x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2;
// Racha: pips en forma de punta de flecha; cada uno se rellena de izquierda a derecha
function b6Racha(c,W,H,t,o,dt){const N=abRank(t,'racha').n,n=Math.min(N,t.rkN||0);
 if(n<o.lastN&&o.lastN>0&&n===0)o.brk=.35;o.lastN=n;o.brk=Math.max(0,o.brk-dt);
 for(let i=0;i<5;i++){const tg=i<n?1:0;o.f[i]+=tg>o.f[i]?Math.min(dt*4,tg-o.f[i]):Math.max(-dt*6,tg-o.f[i]);}
 const gap=7,pw=(W-4-gap*(N-1))/N,y0=3,y1=H-3,mid=H/2,tip=Math.min(10,pw*.3);
 for(let i=0;i<N;i++){const x=2+i*(pw+gap),f=o.f[i],sh=o.brk>0&&f>0?(Math.random()-.5)*3:0;c.save();c.translate(x+sh,0);
  const shape=()=>{c.beginPath();c.moveTo(0,y0);c.lineTo(pw-tip,y0);c.lineTo(pw,mid);c.lineTo(pw-tip,y1);c.lineTo(0,y1);c.lineTo(tip*.6,mid);c.closePath();};
  shape();const e=c.createLinearGradient(0,0,0,H);e.addColorStop(0,'#eadbb8');e.addColorStop(1,'#d9c49a');c.fillStyle=e;c.fill();
  if(f>0){c.save();shape();c.clip();const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,f<1?'#ffd6b0':'#ffb07a');g.addColorStop(1,o.brk>0?'#7a3a1a':'#c2541e');c.fillStyle=g;const w=pw*b6E(Math.min(1,f));c.fillRect(0,0,w,H);
   if(f<.999){c.fillStyle='rgba(255,245,220,.9)';c.fillRect(w-2,0,2,H);}c.restore();}
  shape();c.strokeStyle=f>.5?'#5a2008':'#b9a27a';c.lineWidth=1.8;c.stroke();c.restore();}}
// Concentración: retícula que se cierra y barra; con Sin pestañear activo, la barra brilla
function b6Concen(c,W,H,t,o,dt,tm){const v=b6Conc(t),fast=t.blT>0,full=v>=1,r=H/2-3,cx=r+2,cy=H/2,gap=r*(1-v*.85);
 c.strokeStyle=full?'#c0281a':'#1f6a80';c.lineWidth=2;c.beginPath();c.arc(cx,cy,r,0,7);c.stroke();
 c.beginPath();c.moveTo(cx-r-1,cy);c.lineTo(cx-gap*.45,cy);c.moveTo(cx+gap*.45,cy);c.lineTo(cx+r+1,cy);c.moveTo(cx,cy-r-1);c.lineTo(cx,cy-gap*.45);c.moveTo(cx,cy+gap*.45);c.lineTo(cx,cy+r+1);c.stroke();
 if(full&&Math.sin(tm*12)>0){c.fillStyle='#c0281a';c.beginPath();c.arc(cx,cy,2.5,0,7);c.fill();}
 const bx=cx+r+8,len=W-bx-2,bh=12,by=cy-bh/2;
 if(fast){c.save();c.shadowColor='rgba(90,220,255,.9)';c.shadowBlur=6+4*Math.sin(tm*10);c.fillStyle='rgba(127,212,236,.35)';c.beginPath();c.roundRect(bx-1,by-1,len+2,bh+2,7);c.fill();c.restore();}
 c.save();c.beginPath();c.roundRect(bx,by,len,bh,6);c.fillStyle='#e3d2ae';c.fill();c.clip();
 const g=c.createLinearGradient(bx,0,bx+len,0);if(fast){g.addColorStop(0,'#c8f4ff');g.addColorStop(1,'#3fb4d8');}else{g.addColorStop(0,'#7fc4d6');g.addColorStop(1,full?'#0e4a5c':'#1f6a80');}c.fillStyle=g;c.fillRect(bx,by,len*v,bh);
 if(fast){c.fillStyle='rgba(255,255,255,.5)';const sx=bx+((tm*160)%(len+30))-30;c.fillRect(sx,by,14,bh);}
 c.restore();c.strokeStyle='#0e3a48';c.lineWidth=1.5;c.beginPath();c.roundRect(bx,by,len,bh,6);c.stroke();
 if(fast){c.font='700 11px system-ui,sans-serif';c.textAlign='right';c.textBaseline='middle';c.lineWidth=3;c.strokeStyle='#0e3a48';c.strokeText('×2',bx+len-4,cy+.5);c.fillStyle='#fff';c.fillText('×2',bx+len-4,cy+.5);}}
// Presión: montón de rocas de ogro, sin barra; cada roca aparece creciendo; con la avalancha salen rodando todas
function b6Boulder(c,x,y,r,rot,v){c.save();c.translate(x,y);c.fillStyle='rgba(40,25,10,.3)';c.beginPath();c.ellipse(1,r*.85,r*.95,r*.26,0,0,7);c.fill();c.rotate(rot);
 const g=c.createRadialGradient(-r*.35,-r*.4,r*.1,0,0,r);g.addColorStop(0,['#b5a58a','#a89878','#bcae90'][v]);g.addColorStop(.7,['#7d6c52','#6f5f46','#85745a'][v]);g.addColorStop(1,'#4a3c28');
 c.fillStyle=g;c.beginPath();for(let a=0;a<6.28;a+=.52){const rr=r*(.93+.07*Math.sin(a*3+v));c.lineTo(Math.cos(a)*rr,Math.sin(a)*rr);}c.closePath();c.fill();c.strokeStyle='#2e2416';c.lineWidth=Math.max(1,r*.12);c.stroke();
 c.strokeStyle='rgba(46,36,22,.75)';c.lineWidth=Math.max(.8,r*.08);c.beginPath();c.moveTo(-r*.2,-r*.55);c.lineTo(r*.1,-r*.1);c.lineTo(-r*.1,r*.32);c.stroke();
 c.fillStyle='rgba(255,250,230,.35)';c.beginPath();c.ellipse(-r*.38,-r*.42,r*.24,r*.13,-.6,0,7);c.fill();c.restore();}
function b6Slots(N,W,H){const c0=Math.ceil(N/3)+1,c1=c0-1,c2=Math.max(0,N-c0-c1),rows=[c0,c1,c2],r=Math.min((H-4)/5.3,(W-4)/(2*c0)),L=[];
 rows.forEach((n,k)=>{for(let i=0;i<n;i++)L.push({x:W/2+(i-(n-1)/2)*2*r,y:H-2-r-k*r*1.62,r:r*(.92+((L.length*7)%4)*.03),rot:(L.length*1.7)%6,v:(L.length*5)%3});});return L;}
function b6Pres(c,W,H,t,o,dt,tm){const N=abRank(t,'presion').n,n=Math.min(N,t.pres||0),sl=b6Slots(N,W,H);
 if((t.presAv||0)!==o.lastAv){o.lastAv=t.presAv||0;o.av=1.4;o.avN=Math.max(o.avN,o.lastN||0);o.born=[];}
 if(o.av>0){o.av-=dt;const k=1.4-o.av;for(let i=0;i<Math.min(sl.length,o.avN);i++){const s=sl[i],x=s.x+k*k*W*.9+k*30*(1+(i%3)*.2);if(x<W+s.r*2)b6Boulder(c,x,Math.min(H-2-s.r,s.y+k*k*40),s.r,s.rot+k*k*12,s.v);}
  if(o.av<=0)o.avN=0;}
 for(let i=0;i<n;i++)if(o.born[i]==null)o.born[i]=tm;for(let i=n;i<o.born.length;i++)o.born[i]=null;o.lastN=n;
 if(o.av>0)return;
 const ord=[...Array(n).keys()].sort((a,b)=>sl[b].y-sl[a].y||a-b);for(const i of ord){const s=sl[i],q=b6E(Math.min(1,(tm-(o.born[i]||tm))/.35));if(q>0)b6Boulder(c,s.x,s.y+(1-q)*s.r*.6,s.r*q,s.rot,s.v);}
 if(n===0){c.fillStyle='rgba(110,85,48,.35)';c.beginPath();c.ellipse(W/2,H-4,W*.3,3,0,0,7);c.fill();}}
// Reserva de escarcha: hielo que se oscurece al llenarse, grietas que crecen detrás del frente (sin tocar el borde), copos y vaho
function b6Resv(c,W,H,t,o,dt,tm){const eR=Math.max(0,Math.min(1,t.resvV||0));
 if((t.resvF||0)!==o.lastF){o.lastF=t.resvF||0;o.burst=1.1;for(let i=0;i<18;i++)o.fl.push({x:W*Math.random(),y:H/2,vx:(Math.random()-.5)*120,vy:(Math.random()-.5)*60,l:1});}
 o.burst=Math.max(0,o.burst-dt);
 const x0=3,y0=6,len=W-6,bh=H-10,w=len*eR;
 c.save();c.beginPath();c.roundRect(x0,y0,len,bh,7);c.fillStyle='#e3d2ae';c.fill();c.clip();
 const g=c.createLinearGradient(0,y0,0,y0+bh);g.addColorStop(0,'#f2fbff');g.addColorStop(.45,`rgb(${140-80*eR|0},${200-60*eR|0},${240-20*eR|0})`);g.addColorStop(1,`rgb(${40-20*eR|0},${110-50*eR|0},${170-40*eR|0})`);c.fillStyle=g;c.fillRect(x0,y0,w,bh);
 c.strokeStyle='rgba(255,255,255,.85)';c.lineWidth=1.1;c.lineCap='round';
 for(let k=0;k<Math.floor(len/26);k++){const bx=x0+14+k*26,by=y0+4+((k*37)%10)/10*(bh-13),g2=Math.max(0,Math.min(1,(x0+w-bx-4)/30));if(g2<=0)continue;
  c.globalAlpha=g2;c.beginPath();c.moveTo(bx,by);c.lineTo(bx+6*g2,by+4*g2);c.lineTo(bx+3*g2,by+8*g2);c.moveTo(bx+6*g2,by+4*g2);c.lineTo(bx+11*g2,by+2*g2);c.stroke();c.globalAlpha=1;}
 c.fillStyle='rgba(255,255,255,.9)';c.font='9px system-ui';c.textAlign='center';c.textBaseline='middle';for(let k=0;k<6;k++){const fx=x0+((k*47+tm*14)%Math.max(1,w)),fy=y0+bh/2+Math.sin(tm*1.5+k)*bh*.28;if(fx<x0+w-5)c.fillText('❄',fx,fy);}
 if(w>2){c.fillStyle='#e6f6ff';c.beginPath();c.moveTo(x0+w,y0);for(let y=y0;y<=y0+bh;y+=3)c.lineTo(x0+w+((y*13)%5)+Math.sin(tm*3+y)*1,y);c.lineTo(x0+w,y0+bh);c.fill();}
 if(o.burst>0){c.fillStyle=`rgba(255,255,255,${o.burst/1.1*.9})`;c.fillRect(x0,y0,len,bh);}
 c.restore();c.strokeStyle='#123a5a';c.lineWidth=1.6;c.beginPath();c.roundRect(x0,y0,len,bh,7);c.stroke();
 if(eR>.15&&Math.random()<dt*8*eR)o.mist.push({x:x0+Math.random()*w,y:y0,l:1});
 for(const m of o.mist){m.l-=dt*.9;m.y-=dt*7;m.x+=dt*3;c.fillStyle=`rgba(200,235,255,${Math.max(0,m.l)*.5})`;c.beginPath();c.arc(m.x,m.y,2+(1-m.l)*3,0,7);c.fill();}o.mist=o.mist.filter(m=>m.l>0);
 for(const q of o.fl){q.l-=dt;q.x+=q.vx*dt;q.y+=q.vy*dt;if(q.l>0){c.fillStyle=`rgba(40,110,170,${q.l})`;c.font='11px system-ui';c.fillText('❄',q.x,q.y);}}o.fl=o.fl.filter(q=>q.l>0);}
// Botín: pirámide de 15 monedas (5 pisos); en el rango 2, debajo y centrada, la fila de 5 cofrecitos
function b6Coin(c,x,y,rx){const ry=rx*.42,th=rx*.32;c.save();c.lineWidth=Math.max(1,rx*.14);c.strokeStyle='#5a4000';
 c.fillStyle='#b9861a';c.beginPath();c.moveTo(x-rx,y);c.lineTo(x-rx,y+th);c.ellipse(x,y+th,rx,ry,0,Math.PI,0,true);c.lineTo(x+rx,y);c.closePath();c.fill();c.stroke();
 c.fillStyle='#ffd34a';c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);c.fill();c.stroke();
 c.strokeStyle='rgba(255,250,210,.85)';c.lineWidth=Math.max(.8,rx*.11);c.beginPath();c.ellipse(x-rx*.15,y-ry*.1,rx*.55,ry*.5,0,3.5,4.9);c.stroke();c.restore();}
function b6Chest(c,x,y,w,on,glow){const h=w*.62;c.save();if(glow){c.shadowColor='rgba(255,210,80,.95)';c.shadowBlur=8;}c.lineWidth=1.6;c.strokeStyle=on?'#4a2a08':'#b9a27a';c.fillStyle=on?'#c98a1a':'#e3d2ae';
 c.beginPath();c.roundRect(x-w/2,y-h/2,w,h,3);c.fill();c.stroke();c.beginPath();c.moveTo(x-w/2,y-h*.1);c.lineTo(x+w/2,y-h*.1);c.stroke();c.fillStyle=on?'#ffd34a':'#cbb48a';c.fillRect(x-2.5,y-h*.25,5,h*.32);c.restore();}
function b6Botin(c,W,H,t,o,dt,tm){const r=abRank(t,'botin'),cof=!!r.cof,cn=Math.min(BOTN,Math.floor((t.btK||0)/BOTK)),PH=cof?H-26:H-4;
 if((t.btRep||0)!==o.lastRep){o.lastRep=t.btRep||0;o.rep=1.3;o.repN=BOTN;}
 if((t.btRel||0)!==o.lastRel){o.lastRel=t.btRel||0;o.rel=2.2;}
 o.rep=Math.max(0,o.rep-dt);o.rel=Math.max(0,o.rel-dt);
 if(cn>o.lastCoins)for(let k=o.lastCoins;k<cn;k++)o.coins.push({k,t0:tm});o.lastCoins=cn;o.coins=o.coins.filter(q=>tm-q.t0<.6);
 const rx=Math.min(13.5,(W*.55)/10),ry=rx*.42,dy=ry*2.3,cx=W/2,L=[];for(let row=0;row<5;row++){const n=5-row;for(let k=0;k<n;k++)L.push({x:cx+(k-(n-1)/2)*rx*2.05,y:PH-ry-rx*.32-row*dy});}
 c.fillStyle='rgba(60,40,10,.16)';c.beginPath();c.ellipse(cx,PH-ry*.4,rx*5.6,ry*1.2,0,0,7);c.fill();
 const show=o.rep>0?o.repN:cn;
 for(let k=0;k<show&&k<L.length;k++){const p=L[k];let y=p.y,a=1;const fl=o.coins.find(q=>q.k===k);if(fl){const q=Math.min(1,(tm-fl.t0)/.45);y=p.y-(1-b6E(q))*Math.min(30,Math.max(0,p.y-rx*1.2));}
  if(o.rep>0){const q=1-o.rep/1.3;y-=Math.sin(Math.min(1,q*1.4)*Math.PI)*(14+(k%5)*5);y=Math.max(rx*.9,y);/* v361: que no se corte por arriba */a=Math.max(0,1-Math.max(0,q-.6)/.4);}
  c.globalAlpha=a;b6Coin(c,p.x,y,rx);c.globalAlpha=1;}
 if(o.rep>0){const q=1-o.rep/1.3;c.font='700 13px system-ui,sans-serif';c.textAlign='center';c.textBaseline='middle';c.globalAlpha=Math.min(1,o.rep*2);c.lineWidth=3;c.strokeStyle='#5a4000';const tx='+'+BOTN*r.g;c.strokeText(tx,cx,PH*.35-q*10);c.fillStyle='#ffd34a';c.fillText(tx,cx,PH*.35-q*10);c.globalAlpha=1;}
 {const tx=W-34,ty=PH*.5,nv=String(o.rep>0?BOTN:cn);c.textBaseline='middle';/* sin moneda: ya se ve la pila al lado (Nogal) */
  c.textAlign='right';c.fillStyle='#6b4a00';c.font='500 20px system-ui,sans-serif';c.fillText(nv,tx-2,ty-8);
  c.strokeStyle='#8a6a2a';c.lineWidth=2;c.lineCap='round';c.beginPath();c.moveTo(tx-4,ty+12);c.lineTo(tx+6,ty-6);c.stroke();
  c.textAlign='left';c.fillStyle='#8a6a2a';c.font='500 14px system-ui,sans-serif';c.fillText(String(BOTN),tx+6,ty+9);/* los dos sin negrita (Nogal) */}/* v361: monedas como fracción en diagonal (Nogal): el número arriba a la izquierda, la raya y el 15 abajo a la derecha */
 if(cof){const cw=Math.min(26,(W-20)/6.5),y=H-12,n=o.rel>0?BOTC:(t.btC||0);for(let k=0;k<BOTC;k++){const x=cx+(k-(BOTC-1)/2)*cw*1.35;b6Chest(c,x,y,cw,k<n,o.rel>0&&Math.floor(tm/.15)%2===0);}}}
function b6Draw(now){B6.raf=0;const cs=document.querySelectorAll('canvas.b6c');if(!cs.length)return;const tm=now/1000,dt=Math.min(.05,(now-(B6.last||now))/1000);B6.last=now;
 for(const cv of cs){if(!cv.isConnected)continue;const t=S&&S.list&&S.list.find(q=>String(q.id)===cv.dataset.tid);if(!t)continue;const k=cv.dataset.k,M=B6K[k];if(!M||!M.on(t))continue;
  const rc=cv.getBoundingClientRect();if(!rc.width)continue;const dpr=Math.min(2,window.devicePixelRatio||1),W=Math.round(rc.width),H=Math.round(rc.height);
  if(cv.width!==Math.round(W*dpr)||cv.height!==Math.round(H*dpr)){cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);}
  const c=cv.getContext('2d');c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,W,H);const o=b6S(t);
  try{if(k==='racha')b6Racha(c,W,H,t,o,dt);else if(k==='concen')b6Concen(c,W,H,t,o,dt,tm);else if(k==='pres')b6Pres(c,W,H,t,o,dt,tm);else if(k==='resv')b6Resv(c,W,H,t,o,dt,tm);else if(k==='botin')b6Botin(c,W,H,t,o,dt,tm);else if(B6DR[k])B6DR[k](c,W,H,t,o,dt,tm);}catch(e){}
  const lb=cv.parentElement&&cv.parentElement.querySelector('.ftml[data-b6]');if(lb){const l=M.l(t);if(lb.textContent!==l)lb.textContent=l;}}
 B6.raf=requestAnimationFrame(b6Draw);}
setInterval(()=>{if(!B6.raf&&document.querySelector('canvas.b6c')){B6.last=performance.now();B6.raf=requestAnimationFrame(b6Draw);}},250);
