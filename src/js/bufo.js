// ==================== Torres de bufo: Altar de runas (Fantástica) y Dron de mantenimiento (era 2) ====================
// Logros que las desbloquean
ACH.armonia={c:'jg',n:'Armonía',d:'Gana una partida con al menos una torre de cada tipo de daño (físico, mágico y elemental) a Nv 3 o más al final.',tw:'altar'};
ACH.chapa={c:'jg',n:'Chapa y pintura',d:'En una partida de la Era Distópica, sube una torre a Nv 4 y cómprale todas sus habilidades al máximo antes de la oleada 15.',tw:'dron'};
if(typeof ACHVIS!=='undefined')ACHVIS.chapa=()=>typeof era2Ok==='function'&&era2Ok();
{const _aw=achWin;achWin=function(){const r=_aw.apply(this,arguments);try{if(!S.tut){const dts=new Set(S.list.filter(t=>t.lvl>=3&&TW[t.type]&&!TW[t.type].uniq&&!TW[t.type].support).map(t=>twm(t.type,t.spec).dt));if(dts.has('phys')&&dts.has('magic')&&dts.has('elem'))achieve('armonia');}}catch(e){}return r;};}
function chapaCheck(t){if(!S||S.tut||S.pvE||S.era!==2||!t||t.lvl!==4||!t.spec||S.round>=15)return;const ab=SPECS[t.type][t.spec].ab;if(ab.every(id=>(t.ab[id]||0)>=AB[id].ranks.length))achieve('chapa');}
// Descripción de las torres de apoyo en la ficha: no disparan
const BUFOTXT={altar:'No dispara. Cada 3 s lanza una runa a una torre a su alcance: la torre recibe un bufo de 5 s (por turnos: daño, cadencia o alcance). +25% en Nv 1, +30% en Nv 2, +35% en Nv 3 y +40% en Nv 4.',
 dron:'No dispara. Un dron sale del helipuerto y va de torre en torre dentro de su alcance y tarda 2 s en ajustar cada una; cada ajuste da +5% de probabilidad de crítico (+6% en Nv 2, +7% en Nv 3, +8% en Nv 4; máximo 4 visitas por torre). Los ajustes se pierden al acabar la oleada.'};
// fuerza de cada runa y del ajuste del dron según el nivel de la torre de apoyo (Nv 1 → Nv 3/4)
const DRWAIT=2;/* v307: lo que tarda el dron en ajustar cada torre (antes 0,8 s) */
const runeM=t=>.25+.05*Math.min(3,(t&&t.lvl||1)-1),dronC=t=>.05+.01*Math.min(3,(t&&t.lvl||1)-1);
const RUNEK=['d','r','rg'],RUNEN={d:'daño',r:'cadencia',rg:'alcance'},RUNEC={d:'#ff8a7a',r:'#c89aff',rg:'#7ad0ff'};
// torres que puede bufar (dentro del alcance, que disparen o tengan unidades)
function bufoTargets(t){const r=stats(t).range;return S.list.filter(o=>o!==t&&!TW[o.type].support&&!TW[o.type].uniq&&Math.hypot(o.x-t.x,o.y-t.y)<=r);}
function bufoTick(dt){if(S.phase!=='wave')return;
 for(const t of S.list){const T=TW[t.type];if(!T||!T.bufo)continue;if(t.acd)for(const k in t.acd)t.acd[k]=Math.max(0,(t.acd[k]||0)-dt);
  if(t.type==='altar'&&t.spec!=='senda'){t.rt=(t.rt==null?1:t.rt)-dt;if(t.rt<=0){t.rt=3;const tg=bufoTargets(t);if(tg.length){const tw=abRank(t,'twin'),n=1+(tw?tw.n:0),af=abRank(t,'affin'),fav=af&&t.fav?S.list.find(o=>o.id===t.fav):null;
     for(let i=0;i<n;i++){const o=(fav&&tg.includes(fav)&&(i===0||Math.random()<.5))?fav:tg[Math.floor(Math.random()*tg.length)];const k=RUNEK[(t.rk=((t.rk||0)+1))%3];(S.runesB=S.runesB||[]).push({x:t.x,y:t.y,o,k,t:0,m:.5,src:t});}}}}
  if(t.type==='dron'&&t.spec!=='petro'){const fl=abRank(t,'fleet'),n=1+(fl?fl.n:0);t.dr=t.dr||[];while(t.dr.length<n)t.dr.push({x:t.x,y:t.y,o:null,wait:0});t.dr.length=n;
   const wd=abRank(t,'weld'),oc=abRank(t,'overclock');
   for(const d of t.dr){if(d.o&&!S.list.includes(d.o))d.o=null;
    if(!d.o){const free=bufoTargets(t).filter(o=>!t.dr.some(q=>q!==d&&q.o===o)),tg=free.filter(o=>(o.drc||0)<4);
     if(tg.length){tg.sort((a,b)=>(a.drc||0)-(b.drc||0)||Math.hypot(a.x-d.x,a.y-d.y)-Math.hypot(b.x-d.x,b.y-d.y));d.o=tg[0];}
     // v307: con Overclock no se para al acabar las visitas de crítico: sigue dando Overclock, primero a las que están disparando y no lo tienen
     else if(oc&&free.length){const busy=o=>{const r=stats(o).range;return S.enemies.some(e=>e.hp>0&&Math.hypot(e.x-o.x,e.y-o.y)<=r)?0:1;};
      free.sort((a,b)=>busy(a)-busy(b)||(a.oc||0)-(b.oc||0)||Math.hypot(a.x-d.x,a.y-d.y)-Math.hypot(b.x-d.x,b.y-d.y));d.o=free[0];}
     else{const tx=t.x,ty=t.y,dx=tx-d.x,dy=ty-d.y,dd=Math.hypot(dx,dy),sp=4*K*dt;if(dd>sp){d.x+=dx/dd*sp;d.y+=dy/dd*sp;}continue;}}
    const dx=d.o.x-d.x,dy=d.o.y-d.y,dd=Math.hypot(dx,dy),sp=4*K*dt;
    if(dd>sp){d.x+=dx/dd*sp;d.y+=dy/dd*sp;d.wait=0;}else{d.x=d.o.x;d.y=d.o.y;d.wait+=dt;d.sk=(d.sk||0)+dt;if(d.sk>=.22){d.sk=0;S.fx.push({x:d.x+(Math.random()-.5)*.5*K,y:d.y+(Math.random()-.5)*.5*K,t:.22,m:.22,r:.18*K,col:'#ffd75a'});}
     if(d.wait>=DRWAIT){const o=d.o;o.drc=Math.min(4,(o.drc||0)+1);o.drp=Math.max(o.drp||0,dronC(t));if(oc){o.oc=oc.t;o.ocm=oc.m;}S.fx.push({x:o.x,y:o.y,t:.5,m:.5,r:.8*K,col:'#ffd75a'});d.o=null;d.wait=0;}}
    if(wd){d.wt=(d.wt||0)+dt;if(d.wt>=1){d.wt-=1;for(const u of unitTowers())for(const s of u.sd)if(s.hp>0&&Math.hypot(s.x-d.x,s.y-d.y)<=1.5*K){s.hp=Math.min(s.max,s.hp+s.max*wd.h);s.sh=Math.max(s.sh||0,s.max*wd.sh);}}}}}}
 // runas en vuelo
 if(S.runesB&&S.runesB.length){for(const r of S.runesB){r.t+=dt;if(r.t>=r.m){const o=r.o;if(S.list.includes(o)){const mj=abRank(r.src,'major');o.rb={k:r.k,m:runeM(r.src)*(1+(mj?mj.m:0)),t:5+(mj?mj.t:0)};S.fx.push({x:o.x,y:o.y,t:.4,m:.4,r:.7*K,col:RUNEC[r.k]});}}}S.runesB=S.runesB.filter(r=>r.t<r.m);}
 for(const t of S.list){if(t.rb&&t.rb.t>0){t.rb.t-=dt;if(t.rb.t<=0)t.rb=null;}if(t.oc>0)t.oc-=dt;}
 // escudo de soldadura: absorbe daño (se aplica comparando la vida con el fotograma anterior)
 for(const u of unitTowers())for(const s of u.sd){if(s.sh>0&&s.shp!=null&&s.hp<s.shp){const d=s.shp-s.hp,ab=Math.min(d,s.sh);s.hp+=ab;s.sh-=ab;}s.shp=s.hp;}}
{const _nr=nextRound;nextRound=function(){try{for(const t of S.list){t.drc=0;t.drp=0;t.oc=0;t.rb=null;if(t.dr)for(const d of t.dr){d.o=null;d.x=t.x;d.y=t.y;}}S.runesB=[];}catch(e){}return _nr.apply(this,arguments);};}
function bufoDraw(lw){const X=v=>v*CS+CS/2,now=performance.now()/1000;
 for(const r of S.runesB||[]){const k=r.t/r.m,x=r.x+(r.o.x-r.x)*k,y=r.y+(r.o.y-r.y)*k-Math.sin(k*Math.PI)*K*.8;g.fillStyle=RUNEC[r.k];g.strokeStyle='#fff';g.lineWidth=lw(1);g.beginPath();g.moveTo(X(x),X(y)-lw(6));g.lineTo(X(x)+lw(4),X(y));g.lineTo(X(x),X(y)+lw(6));g.lineTo(X(x)-lw(4),X(y));g.closePath();g.fill();g.stroke();}
 for(const t of S.list){
  if(t.rb&&t.rb.t>0){g.strokeStyle=RUNEC[t.rb.k];g.lineWidth=lw(2);g.setLineDash([lw(3),lw(3)]);g.beginPath();g.arc(X(t.x),X(t.y),K*CS*.5,now*2,now*2+6.283*Math.min(1,t.rb.t/5));g.stroke();g.setLineDash([]);}
  if(t.drc>0){g.fillStyle='#ffd75a';for(let i=0;i<t.drc;i++){g.beginPath();g.arc(X(t.x)-K*CS*.42+i*lw(5),X(t.y)+K*CS*.42,lw(2),0,7);g.fill();}}
  if(t.oc>0){g.strokeStyle='rgba(255,215,90,.9)';g.lineWidth=lw(2.5);g.beginPath();g.arc(X(t.x),X(t.y),K*CS*.56,0,7);g.stroke();}
  if(t.type==='altar'&&t.fav){const o=S.list.find(q=>q.id===t.fav);if(o){g.font=Math.round(CS*1.1)+'px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('💜',X(o.x)+K*CS*.3,X(o.y)-K*CS*.36);}}
  if(t.dr&&t.spec!=='petro'){const im=svgImg(E2DRONE),r=CS*1.1;for(const d of t.dr){const bob=Math.sin(now*4+d.x)*CS*.15;if(im.complete&&im.naturalWidth)try{g.drawImage(im,X(d.x)-r,X(d.y)-r*1.5+bob,r*2,r*2);}catch(e){}g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(X(d.x),X(d.y)+CS*.3,r*.5,r*.2,0,0,7);g.fill();}}}}
// Afinidad: marcar la torre favorita del altar con el botón de bandera
{const _to=tmOpts;tmOpts=function(t){const o=_to.apply(this,arguments);if(t&&t.type==='altar'&&t.spec!=='senda'&&abRank(t,'affin'))o.side={k:'flag',ic:'💜'};return o;};}
{const _sf=startFlag;startFlag=function(t){if(t&&t.type==='altar'){closePrim();S.aim='fav';S.aimT=t;S.msg='Elige la torre favorita del altar: recibirá la mitad de las runas (Esc para cancelar).';renderRelics();ui();return;}return _sf.apply(this,arguments);};}
function favAt(c){const a=S.aimT,t=S.occ[c.x+','+c.y];if(!a||!t||t===a||TW[t.type].support||TW[t.type].uniq){S.msg='Elige una torre que dispare dentro del alcance del altar.';ui();return;}if(Math.hypot(t.x-a.x,t.y-a.y)>stats(a).range){S.msg='Esa torre está fuera del alcance del altar.';ui();return;}a.fav=t.id;S.aim=null;S.aimT=null;S.msg=tinfo(t).n+' es ahora la favorita del altar.';S.fx.push({x:t.x,y:t.y,t:.6,m:.6,r:1.2*K,col:'#c89aff'});renderRelics();ui();}
// fichas: texto de lo que hacen y una fila de estado
{const _ti=towerInfo;towerInfo=function(t){let h=_ti.apply(this,arguments);try{if(t&&TW[t.type]&&TW[t.type].bufo){const extra=`<small>${typeof specTxt==='function'&&specTxt(t)||BUFOTXT[t.type]}</small>`+(t.type==='dron'&&t.dr&&t.spec!=='petro'?`<small>Drones: <b>${t.dr.length}</b>.</small>`:'')+(t.type==='altar'&&t.fav?`<small>Favorita: <b>${(tinfo(S.list.find(o=>o.id===t.fav)||{})||{}).n||'—'}</b>.</small>`:'');const i=h.indexOf('<div class="row');h=i>=0?h.slice(0,i)+extra+h.slice(i):h+extra;}}catch(e){}return h;};}
{const _si=shopInfo;shopInfo=function(k){let h=_si.apply(this,arguments);try{if(TW[k]&&TW[k].bufo){const i=h.indexOf('<div class="row');const extra=`<small>${BUFOTXT[k]}</small>`;h=i>=0?h.slice(0,i)+extra+h.slice(i):h+extra;}}catch(e){}return h;};}
