// ==================== v366 · Mecánicas de los enemigos nuevos del Taller, tanda 4 ====================
// Era Distópica, partida 1 (acordado con Nogal el 24-nov). Medidas en celdas pequeñas (K = 5 = el ancho del camino).
//  · Microbot: sin mecánica propia (la masa que empuja el Sobrecargador).
//  · Sobrecargador (ovl): cada 12 s carga a las máquinas de su escuadrón (si va suelto, a las que tiene a 10 celdas). Las cargadas: 4 s +30 % de velocidad y +20 de armadura;
//    después 4 s recalentadas: −20 % de velocidad y −20 de armadura. Solo afecta a las que haya cargado (Nogal). No rompe la formación.
//  · Avispa de colmena (sting): cada 3 s pica a una unidad a 7,5 celdas (también al héroe), repartiéndose: la que tenga menos avispas encima: su golpe y un stack de veneno (el del Escupidor). Va y vuelve volando.
//  · Caza interceptor (aburn): la primera vez que recibe daño, postcombustión: el doble de rápido 2 s. Solo el que recibe el golpe.
//  · Escupidor alado (spit2): se para mientras tenga unidades a tiro; cada 4 s escupe a tu unidad más cercana (7,5 celdas) y deja un charco de ácido de 2 celdas 4 s: cada segundo encima, un stack de veneno.
Object.assign(TMEC,{i29microbot:{},i19sobrecarga:{ovl:1},i38avispa:{sting:1},i45caza:{aburn:1},i42escupidor:{spit2:1}});
const OVLCD=12,OVLT=4,OVHT=4,OVLM=1.3,OVHM=.8,OVLA=20,OVLR=2*K,STGCD=3,STGR=1.5*K,STGV=5*K,ABM=2,ABT=2,SPITCD=4,SPITR=1.5*K,SPITA=2,SPITT=4,SPITW=.5,SPITP=1.5;
// ---- Sobrecargador ----
function ovlTick(e,dt){if(e.ovB>0)e.ovB-=dt;e.ovc=(e.ovc===undefined?4:e.ovc)-dt;if(e.ovc>0)return;e.ovc=OVLCD;const u=S.wt+OVLT,h=u+OVHT;let n=0;
 for(const m of S.enemies){if(m.hp<=0||!ET[m.t]||ET[m.t].fac!=='m')continue;const near=Math.hypot(m.x-e.x,m.y-e.y)<=OVLR;
  if(m===e||(e.sqid&&m.sqid===e.sqid&&((!m.loose&&!e.loose)||near))||(!e.sqid&&near)){m.ovU=u;m.ohU=h;n++;}}
 e.ovB=.8;S.fx.push({x:e.x,y:e.y,t:.6,m:.6,r:OVLR,col:'#ff5a3a'});}
// ---- Avispa de colmena ----
// se reparten: cada avispa va a la unidad con menos avispas encima; a las que ya llevan 3 stacks de veneno solo si no queda otra (Nogal, 24-nov)
function stingPick(e,SL){let b=null,bs=1e9;for(const s of SL){if(s.H&&s.H.camo>0)continue;const d=Math.hypot(s.x-e.x,s.y-e.y);if(d>STGR)continue;let n=0;for(const o of S.enemies)if(o!==e&&o.wsp&&o.wsp.s===s&&!o.wsp.back)n++;
  const sc=n*100+((s.ps||[]).length>=3?1000:0)+d;if(sc<bs){bs=sc;b=s;}}return b;}
function stingTick(e,E,dt,SL){const g=e.wsp;
 if(g){const s=g.s,tx=g.back?g.hx:s.x,ty=g.back?g.hy:s.y,dx=tx-e.x,dy=ty-e.y,d=Math.hypot(dx,dy),st=STGV*dt;
  if(d<=st){e.x=tx;e.y=ty;if(!g.back){if(s.hp>0){hitUnit(s,(E.ud||0)*(typeof udM==='function'?udM(e):1),e);if(typeof uAddPois==='function')uAddPois(s,1.5,e);S.fx.push({x:s.x,y:s.y,t:.25,m:.25,r:.35*K,col:'#c0e04a'});}g.back=1;}else{e.wsp=null;e.wcd=STGCD;}}
  else{e.x+=dx/d*st;e.y+=dy/d*st;}return;}
 e.wcd=(e.wcd===undefined?Math.random()*.4:e.wcd)-dt;/* la primera picada en cuanto tiene una unidad a tiro (antes esperaba 1-3 s y algunas pasaban de largo) */if(e.wcd>0)return;const b=stingPick(e,SL);
 if(b)e.wsp={s:b,hx:e.x,hy:e.y,back:0};else e.wcd=.3;}
// ---- Escupidor alado ----
// se queda quieto escupiendo mientras tenga unidades a tiro; sin unidades sigue volando (Nogal, 24-nov: distinto del Murciélago, que suelta las brasas al pasar)
function spitTick(e,E,dt,SL){e.rw=9;/* su ataque son los charcos */let b=null,bd=SPITR;for(const s of SL){if(s.H&&s.H.camo>0)continue;const d=Math.hypot(s.x-e.x,s.y-e.y);if(d<=bd){bd=d;b=s;}}
 e.spAim=!!b;e.spc=(e.spc===undefined?.6:e.spc)-dt;if(e.spc>0)return;
 if(!b){e.spc=.3;return;}e.spc=SPITCD;(S.tmp2=S.tmp2||[]).push({x:b.x,y:b.y,w:SPITW,t:SPITT,d:(E.ud||0)*(typeof udM==='function'?udM(e):1),src:e,x0:e.x,y0:e.y});}
// el charco envenena: cada segundo encima, un stack del veneno de siempre (se acumula si no apartas a tus unidades; Nogal, 24-nov)
function puddleTick(dt){if(!S.tmp2||!S.tmp2.length)return;for(const p of S.tmp2){if(p.w>0){p.w-=dt;continue;}p.t-=dt;p.pt=(p.pt||0)+dt;if(p.pt>=1){p.pt-=1;if(typeof uAddPois==='function')for(const s of liveUnits())if(Math.hypot(s.x-p.x,s.y-p.y)<=SPITA)uAddPois(s,SPITP,p.src);}}S.tmp2=S.tmp2.filter(p=>p.w>0||p.t>0);}
{const _m=move;move=function(e,dt){if(e.wsp)return false;if(e.spAim&&ET[e.t]&&ET[e.t].spit2)return false;return _m(e,dt);};}
// ---- tick general ----
function t4Tick(dt){const SL=liveUnits().filter(s=>!s.charm);puddleTick(dt);
 for(const e of S.enemies){if(e.hp<=0)continue;const E=ET[e.t];if(!E)continue;
  e.ova=e.ovU>S.wt?OVLA:e.ohU>S.wt?-OVLA:0;
  if(E.aburn&&!e.abDone&&e.hp<e.max-.01){e.abDone=1;e.abU=S.wt+ABT;e.fsp=0;}
  if(e.fx.freeze||e.fx.stun||e.fx.poly){if(e.wsp){e.wsp=null;e.wcd=STGCD;}continue;}
  if(E.ovl)ovlTick(e,dt);if(E.sting)stingTick(e,E,dt,SL);if(E.spit2)spitTick(e,E,dt,SL);}}
{const _u=update;update=function(dt){_u(dt);if(!S)return;if(S.phase==='wave')t4Tick(dt);else S.tmp2=[];};}
// ---- dibujo ----
function t4Draw(g,lw){if(!S||!S.enemies)return;const X=v=>v*CS+CS/2,now=performance.now()/1000;
 for(const p of S.tmp2||[]){const x=X(p.x),y=X(p.y);if(p.w>0){const k=1-p.w/SPITW;g.fillStyle='#8ad03a';g.beginPath();g.arc(X(p.x0)+(x-X(p.x0))*k,X(p.y0)+(y-X(p.y0))*k-Math.sin(Math.PI*k)*CS,CS*.3,0,7);g.fill();continue;}
  const a=Math.min(1,p.t/1);g.fillStyle='rgba(120,200,50,'+(.32*a).toFixed(2)+')';g.strokeStyle='rgba(150,230,70,'+(.7*a).toFixed(2)+')';g.lineWidth=lw(1.6);g.beginPath();g.arc(x,y,SPITA*CS,0,7);g.fill();g.stroke();
  g.fillStyle='rgba(200,255,120,'+(.6*a).toFixed(2)+')';for(let i=0;i<4;i++){const ph=(now*1.3+i*.27)%1,ang=i*1.7;g.beginPath();g.arc(x+Math.cos(ang)*SPITA*CS*.5,y+Math.sin(ang)*SPITA*CS*.5,CS*.12*(1-ph)+1,0,7);g.fill();}}
 for(const e of S.enemies){if(e.hp<=0)continue;const E=ET[e.t];if(!E)continue;const px=X(e.x),py=X(e.y),r=E.r*CS*EVS;
  if(e.ovU>S.wt){g.strokeStyle='rgba(255,70,40,'+(.6+.3*Math.sin(now*12)).toFixed(2)+')';g.lineWidth=lw(2.5);g.beginPath();g.arc(px,py,r*1.3,0,7);g.stroke();}
  else if(e.ohU>S.wt){for(let i=0;i<2;i++){const ph=(now*1.2+i*.5)%1;g.fillStyle='rgba(110,110,110,'+(.5*(1-ph)).toFixed(2)+')';g.beginPath();g.arc(px+(i-.5)*r*.6,py-r*(.8+ph*1.4),r*(.25+ph*.3),0,7);g.fill();}}
  if(E.ovl&&e.ovB>0){const a=e.ovB/.8;g.strokeStyle='rgba(255,90,50,'+a.toFixed(2)+')';g.lineWidth=lw(3);g.beginPath();g.arc(px,py,OVLR*CS*(1-a*.6),0,7);g.stroke();}
  if(e.abU>S.wt){let ux=e.tx-e.x,uy=e.ty-e.y;const d=Math.hypot(ux,uy)||1;ux/=d;uy/=d;g.fillStyle='rgba(255,150,40,.85)';g.beginPath();g.moveTo(px-ux*r*.9-uy*r*.4,py-uy*r*.9+ux*r*.4);g.lineTo(px-ux*r*(2.2+Math.random()*.6),py-uy*r*(2.2+Math.random()*.6));g.lineTo(px-ux*r*.9+uy*r*.4,py-uy*r*.9-ux*r*.4);g.fill();}
  if(e.wsp&&!e.wsp.back){g.strokeStyle='rgba(220,230,80,.6)';g.lineWidth=lw(1.2);g.beginPath();g.moveTo(X(e.wsp.hx),X(e.wsp.hy));g.lineTo(px,py);g.stroke();}}}
{const _d=eSkillsDraw;eSkillsDraw=function(g,lw){_d(g,lw);try{t4Draw(g,lw);}catch(x){}};}
// ---- palabras clave ----
{const _k=kwHtml0,R=v=>(typeof RGV==='function'&&typeof f==='function')?RGV(f(v/K)):String(v/K).replace('.',',');kwHtml0=function(id,src){
 if(id==='eovl')return '<b>Sobrecarga</b><small>Cada '+OVLCD+' s carga a las máquinas de su escuadrón: '+OVLT+' s un '+Math.round((OVLM-1)*100)+' % más rápidas y con +'+OVLA+' de armadura. Después quedan recalentadas '+OVHT+' s: un '+Math.round((1-OVHM)*100)+' % más lentas y con −'+OVLA+' de armadura.</small>';
 if(id==='esting')return '<b>Aguijón</b><small>Cada '+STGCD+' s se lanza contra tu unidad más cercana (a '+R(STGR)+' o menos), le pica y la envenena, y vuelve con el enjambre.</small>';
 if(id==='eaburn')return '<b>Postcombustión</b><small>La primera vez que recibe daño va el doble de rápido durante '+ABT+' s.</small>';
 if(id==='espit2')return '<b>Charco de ácido</b><small>Se para mientras tenga a tiro alguna unidad tuya. Cada '+SPITCD+' s escupe a la más cercana (a '+R(SPITR)+' o menos) y deja un charco de ácido durante '+SPITT+' s: cada segundo encima, tus unidades se envenenan un poco más.</small>';
 return _k(id,src);};}
{const KW4={ovl:['eovl','Sobrecarga','⚡'],sting:['esting','Aguijón','🐝'],aburn:['eaburn','Postcombustión','🔥'],spit2:['espit2','Charco de ácido','🧪']};   // iconos provisionales: falta dibujarlos (prioritario)
 Object.assign(TMECKW,KW4);if(typeof MECG2!=='undefined')for(const k in KW4)MECG2.push(KW4[k]);
 if(typeof MECUSE2!=='undefined')for(const k in KW4)MECUSE2[KW4[k][0]]=Object.keys(TMEC).filter(id=>TMEC[id][k]).map(id=>'en:'+id);}
