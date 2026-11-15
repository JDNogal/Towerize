// ==================== v351 · Arreglos de la revisión de eventos, reliquias y héroes ====================
// Mímico: si al conseguirlo no había hueco junto al camino, lo vuelve a intentar al colocar cada pieza.
{const _pp=placePiece;placePiece=function(){const r=_pp.apply(this,arguments);try{if(S&&S.relics&&S.relics.includes('mimic')&&!S.mim)mimPlace();}catch(e){}return r;};}
// Avisos (logros, «sube a Nv 2»…) que saltan con un evento abierto: esperan a que lo cierres, para no tapar el título ni las opciones.
const TQ=[];let TQON=false;
{const _t=toast;toast=function(h){try{if(TQON){TQ.push(h);return;}}catch(e){}return _t.apply(this,arguments);};}
{const _o=openEvent;openEvent=function(){TQON=true;try{return _o.apply(this,arguments);}finally{if(!RL.open)TQON=false;}};}
{const _sg=startGame;startGame=function(){TQON=false;TQ.length=0;return _sg.apply(this,arguments);};}
{const _c=closeEvent;closeEvent=function(){const r=_c.apply(this,arguments);try{if(!RL.open){TQON=false;const q=TQ.splice(0);q.forEach((h,i)=>setTimeout(()=>toast(h),i*250));}}catch(e){}return r;};}
// ---- Yunque rúnico (+50% al bonus de las casillas especiales): todas lo notan y la casilla enseña el valor de verdad ----
// Eco: con el Yunque repite más a menudo (1 de cada 5 → 1 de cada 3; ★ 1 de cada 3 → 1 de cada 2).
// Rebote: rebota al mismo número de enemigos, pero con más daño (40% → 60%); antes ★ pasaba de 2 a 3 rebotes y la normal no ganaba nada.
tileV=function(t,key,def){if(!t||!t.cells||!S||!S.buff)return def;let v=null;const K0=typeof rp==='function'&&rp('anvil')?1.5:1;
 for(const[x,y]of t.cells){const b=BF[S.buff[y]&&S.buff[y][x]];if(!b||b[key]==null)continue;const Kc=K0*(S.bless&&S.bless[Math.floor(x/(N/BN))+','+Math.floor(y/(N/BN))]?2:1);
  const val=key==='tal'?Math.max(0,1-(1-b[key])*Kc):key==='eco'?Math.max(2,Math.round(b[key]/Kc)):key==='reb'?b[key]:key==='per'||key==='uhp'?1+(b[key]-1)*Kc:b[key]*Kc;v=v==null?val:(key==='tal'||key==='eco'?Math.min(v,val):Math.max(v,val));}
 return v==null?def:v;};
function rebK(t){let m=0;if(!t||!t.cells||!S||!S.buff)return 1;const K0=rp('anvil')?1.5:1;for(const[x,y]of t.cells){const b=BF[S.buff[y]&&S.buff[y][x]];if(!b||b.reb==null)continue;m=Math.max(m,K0*(S.bless&&S.bless[Math.floor(x/(N/BN))+','+Math.floor(y/(N/BN))]?2:1));}return m||1;}
rebShot=function(p){const t=p.src;if(!t||p.rb||!t.cells||t.hero)return;const n=Math.floor(tileV(t,'reb',0));if(!n)return;const km=rebK(t);
 const c=S.enemies.filter(e=>e!==p.e&&e.hp>0&&!(p.cata&&isFly(e))&&Math.hypot(e.x-p.x,e.y-p.y)<=REBR*K).sort((a,b)=>Math.hypot(a.x-p.x,a.y-p.y)-Math.hypot(b.x-p.x,b.y-p.y));
 for(let i=0;i<n&&i<c.length;i++)(S.rbq=S.rbq||[]).push({x:p.x,y:p.y,e:c[i],tx:c[i].x,ty:c[i].y,vx:0,vy:0,dm:p.dm*REBM*km,dt:p.dt,src:t,sp:Math.max(8,(p.sp||12)*.8),area:p.area||0,slow:p.slow||0,slowt:p.slowt,pen:p.pen,col:p.col||'#a6d84a',rb:1});};
rebBeam=function(t,tg,dm,dt,pen){if(!t||!t.cells||t.hero)return;const n=Math.floor(tileV(t,'reb',0));if(!n)return;const L=rebNear(t,tg,n),km=rebK(t);
 for(const e of L)hurt(e,dm*REBM*km,t,dt,pen);t.rbB={a:tg,L,u:(S.wt||0)+.15};};
// el texto de la casilla, con los números que dan de verdad (antes Penetración, Persistencia, Taller y Rebote no cambiaban, y la Maldición decía «Yunque»)
bfT=function(k,kx,ky){const B=BF[k],{m,why}=bfMul(kx,ky);if(m===1)return B.t;const b=k.replace('+','');if(b==='cur'||B.free&&!B.per&&!B.tal&&!B.reb&&!B.eco&&!B.pen)return B.t;
 const pc=v=>bfFmt(Math.round(v*1000)/10);let t=B.t;
 if(B.pen!=null)t=t.replace(/\+(\d+) de penetración/,'+'+bfFmt(B.pen*m)+' de penetración');
 else if(B.per!=null)t='Lo que deja la torre dura un <span class="cr">'+pc((B.per-1)*m)+'%</span> más';
 else if(B.tal!=null)t=t.replace(/(\d+)%/,pc(Math.min(1,(1-B.tal)*m))+'%');
 else if(B.eco!=null){const n=Math.max(2,Math.round(B.eco/m));t=t.replace(/(<b>)?\d+(<\/b>)? disparos/,'<b>'+n+'</b> disparos');}
 else if(B.reb!=null)t=t.replace(/(\d+)%/,(x,n)=>pc(n/100*m)+'%');
 else t=t.replace(/([+−-])(\d+(?:[.,]\d+)?)%/g,(x,sg,n)=>sg+bfFmt(parseFloat(n.replace(',','.'))*m)+'%');
 return t+` <small class="cf">(${why.join(', ')})</small>`;};
// Reinhart · Provocación (Nv 4): el −15% de daño recibido ahora también vale contra los ataques especiales de los enemigos (a distancia, en área…), no solo cuerpo a cuerpo.
{const _h=hitUnit;hitUnit=function(s,d,e){try{if(s&&s.H&&s.H.id==='reinhart'&&s.H.lvl>=4)d*=.85;}catch(x){}return _h.call(this,s,d,e);};}
// Moneda antigua: la ficha del enemigo enseña el oro por baja que cobras de verdad (+50%).
{const _e=enemyInfo;enemyInfo=function(k){let h=_e.apply(this,arguments);try{const E=ET[k];if(E&&typeof S!=='undefined'&&S&&S.relics&&S.relics.includes('coin')&&rp('coin')&&E.gold>0)h=h.replace('>'+E.gold+' 🪙<','>'+Math.round(E.gold*1.5)+' 🪙 <small class="cf">(+50%, Moneda antigua)</small><');}catch(x){}return h;};}
// Implante cibernético (y cualquier reliquia que cambie la vida del héroe): la vida máxima se actualiza al conseguirla, no a la siguiente oleada.
{const _g=gainRelic;gainRelic=function(id){const r=_g.apply(this,arguments);try{heroSync();}catch(x){}return r;};}
// ---- Huella de las habilidades de área (Nogal): al soltar un activo de reliquia o una habilidad del héroe sobre el mapa,
// queda marcado dónde cayó (anillo discontinuo que se desvanece). Antes solo se veía el círculo al apuntar y, en las instantáneas, nada después.
function amkAdd(x,y,r,col,dur){if(!S||x==null)return;(S.amk=S.amk||[]).push({x,y,r:Math.max(.6*K,r||K),col:col||'255,230,150',t:dur||4,m:dur||4});}
{const _u=update;update=function(dt){const r=_u.apply(this,arguments);try{if(S&&S.amk&&S.amk.length)S.amk=S.amk.filter(m=>(m.t-=dt)>0);}catch(e){}return r;};}
{const _dw=e2DrawWorld;e2DrawWorld=function(lw){const r=_dw.apply(this,arguments);try{if(S&&S.amk&&S.amk.length){const X=v=>v*CS+CS/2;
 for(const m of S.amk){const a=Math.min(1,m.t/Math.min(1.2,m.m)),R=m.r*CS;g.save();g.globalAlpha=a;g.fillStyle='rgba('+m.col+',.10)';g.strokeStyle='rgba('+m.col+',.95)';g.lineWidth=lw(2);g.setLineDash([lw(6),lw(4)]);
  g.beginPath();g.arc(X(m.x),X(m.y),R,0,7);g.fill();g.stroke();g.setLineDash([]);g.lineWidth=lw(1.5);g.beginPath();g.moveTo(X(m.x)-CS*.22,X(m.y));g.lineTo(X(m.x)+CS*.22,X(m.y));g.moveTo(X(m.x),X(m.y)-CS*.22);g.lineTo(X(m.x),X(m.y)+CS*.22);g.stroke();g.restore();}}}catch(e){}return r;};}
{const _c=startGame;startGame=function(){const r=_c.apply(this,arguments);try{if(S)S.amk=[];}catch(e){}return r;};}
// reliquias de la era 1 con área instantánea
{const _f=castFreeze;castFreeze=function(c){const r=_f.apply(this,arguments);try{amkAdd(c.x,c.y,FRZR,'159,220,255',4);}catch(e){}return r;};}
{const _h=castHarpoon;castHarpoon=function(c){const r=_h.apply(this,arguments);try{amkAdd(c.x,c.y,HARPR,'127,184,224',8);}catch(e){}return r;};}
// reliquias nuevas (era 2 y de héroe) que se apuntan: al usarlas con éxito
for(const id in NR){const Dn=NR[id];if(!Dn||typeof Dn.use!=='function'||!Dn.aim)continue;const _use=Dn.use;
 Dn.use=function(c){const ok=_use.apply(this,arguments);try{if(c&&ok!==false){const t=S.occ&&S.occ[c.x+','+c.y];amkAdd(c.x,c.y,Dn.r||(t?.75*K:.9*K),Dn.col||'255,230,150',Dn.dur&&Dn.dur>3?Math.min(Dn.dur,8):4);}}catch(e){}return ok;};}
// habilidades del héroe que se apuntan (activa y definitiva)
const habR=(H,k)=>{const id=H.id;if(id==='vega')return (k==='b'?(H.lvl>=8?.75:.5):.8)*K;return (k==='b'?(id==='sylvana'?1.5:id==='radagast'?(H.lvl>=8?2.4:1.2):id==='yrsa'?1.2:.8):(id==='reinhart'||id==='yrsa'?1.5:id==='radagast'?3:.8))*K;};
{const _c=castHab;castHab=function(c,k){const H=S.hero,b0=H?H.bcd||0:0,u0=H?H.ucd||0:0;const r=_c.apply(this,arguments);
 try{if(H&&c&&((k==='u'?H.ucd||0:H.bcd||0)>(k==='u'?u0:b0)+.5)){const p=H.id==='vega'&&k==='b'?{x:c.fx!=null?c.fx-.5:c.x,y:c.fy!=null?c.fy-.5:c.y}:(pathNear(c.x,c.y)||c);amkAdd(p.x,p.y,habR(H,k),H.def&&H.def.col?hexRgb(H.def.col):'255,215,90',4);}}catch(e){}return r;};}
function hexRgb(h){const m=String(h).replace('#','');if(m.length<6)return '255,215,90';return [0,2,4].map(i=>parseInt(m.slice(i,i+2),16)).join(',');}
// ---- Un evento sale como mucho una vez por partida (Nogal) ----
// Al repartirlos ya no se repetían, pero ahora además: si por lo que sea el mapa tuviera dos casillas con el mismo evento, se quita la segunda;
// y un evento ya jugado en esta partida no se vuelve a abrir (salvo al recuperar la partida guardada con ese evento a medias).
function evDedupe(){if(!S||!S.evts)return;const seen=new Set(Object.keys(S.evPlayed||{}));for(const k of Object.keys(S.evts)){const id=S.evts[k];if(!id)continue;if(seen.has(id))delete S.evts[k];else seen.add(id);}}
{const _o=openEvent;openEvent=function(id){try{S.evPlayed=S.evPlayed||{};if(S.evPlayed[id]&&RL.ev!==id)return;S.evPlayed[id]=1;}catch(e){}return _o.apply(this,arguments);};}
{const _sg=startGame;startGame=function(){const r=_sg.apply(this,arguments);try{evDedupe();}catch(e){}return r;};}
{const _ch=chooseHero;chooseHero=function(){const r=_ch.apply(this,arguments);try{evDedupe();}catch(e){}return r;};}
// Ofertas de torres: botón 📖 en cada carta para abrir esa torre en el compendio (Nogal), como en las fichas.
{const _r=renderTowerOffer;renderTowerOffer=function(){const r=_r.apply(this,arguments);try{if(compOk()){const ks=RL.towo||[];document.querySelectorAll('#relic .toff>.tof').forEach((el,i)=>{const k=ks[i];if(k&&TW[k]&&!el.querySelector(':scope>.cpgo'))el.insertAdjacentHTML('afterbegin',cpBtn('tw',k));});}}catch(e){}return r;};}
// ---- Cofre y paquete de ayuda (animación al abrir un cofre del mapa) ----
// Los degradados del paquete se llamaban igual que el contenedor del juego (#cw): partes del paquete salían invisibles.
// Ahora todos los dibujos del cofre usan nombres propios.
for(const k in CFX){if(typeof CFX[k]!=='string')continue;const ids=[...CFX[k].matchAll(/id="([^"]+)"/g)].map(m=>m[1]);let s=CFX[k];
 for(const id of ids){s=s.split('id="'+id+'"').join('id="cfx'+k+'-'+id+'"').split('url(#'+id+')').join('url(#cfx'+k+'-'+id+')').split('href="#'+id+'"').join('href="#cfx'+k+'-'+id+'"');}CFX[k]=s;}
// ---- Descripciones: las duraciones van con su icono (⌛, el mismo de «Duración» en el compendio), del tamaño del texto y sin negrita gorda ----
{try{const svg=k=>'url("data:image/svg+xml;utf8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 56 56">'+ICUIS[k]+'</svg>')+'")';
 const st=document.createElement('style');st.textContent=`.nd{white-space:nowrap;font-weight:600;color:var(--t7fb4d9,#7fb4d9)}
.nd::before{content:"";display:inline-block;width:1.05em;height:1.05em;margin-right:.18em;vertical-align:-.17em;background:${svg('dur')} center/contain no-repeat}
:root:not([data-skin="holo"]) :is(.pa,#comp,#tip,#relic,#bmcard,#tmcard,.ce,.rbx,#side) .nd{color:#5a3fa0}`;document.head.appendChild(st);}catch(e){}}
// Bengala de Vega: desde Nv 8 (Fósforo blanco) la ficha dice directamente cuánto dura.
try{Object.defineProperty(HDUR.vega,'b',{get(){try{if(S&&S.hero&&S.hero.id==='vega'&&S.hero.lvl>=8)return '12 s';}catch(e){}return '8 s (12 s con Fósforo blanco)';},configurable:true});}catch(e){}
// Héroe caído en el mapa: su retrato gris con la cuenta atrás se dibuja encima de las bolitas de experiencia (antes quedaba tapado).
{const _dw=e2DrawWorld;e2DrawWorld=function(lw){const r=_dw.apply(this,arguments);try{const H=S&&S.hero,q=H&&H.s;if(q&&q.hp<=0&&(S.gorbs||[]).length){const cs=CS,px=q.x*cs+cs/2,py=q.y*cs+cs/2,rr=cs*1.05,im=heroImg(H.id);g.save();g.globalAlpha=.9;g.fillStyle='#3a3d45';g.beginPath();g.arc(px,py,rr,0,7);g.fill();
 if(im.complete&&im.naturalWidth){g.beginPath();g.arc(px,py,rr,0,7);g.clip();try{g.filter='grayscale(1) brightness(.75)';}catch(e){}g.drawImage(im,px-rr,py-rr,rr*2,rr*2);try{g.filter='none';}catch(e){}}g.restore();
 g.strokeStyle='#8a8f9c';g.lineWidth=lw(2.5);g.beginPath();g.arc(px,py,rr,0,7);g.stroke();const n=Math.ceil(q.rt||0);if(n>0){g.font='800 '+Math.round(rr*1.1)+'px system-ui,sans-serif';g.textAlign='center';g.textBaseline='middle';g.lineWidth=lw(3);g.strokeStyle='rgba(0,0,0,.8)';g.strokeText(n,px,py+1);g.fillStyle='#fff';g.fillText(n,px,py+1);}}}catch(e){}return r;};}
