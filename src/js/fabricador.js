// ==================== v345 · Evento de la Era Distópica: Fabricador de sectores (Mesa «Evento · Fabricador de sectores», aprobado por Nogal) ====================
// La fábrica está sin energía: se arranca con sangre (3 de vida) o con oro (30); o se desguaza (la pieza del evento gana una casilla especial al azar).
// Arrancada, abre su ventana: en 5 pasos diseñas tu propio sector de 7×7 y lo pagas al terminar.
//  1 · salidas contando la entrada (2 por 25, 3 por 50, 4 por 75; siempre en el centro de un lado)
//  2 · camino gratis, como mucho 28 casillas, una casilla de ancho, uniendo todas las salidas (puede tocar el borde: si toca otra pieza, se levanta una valla)
//  3 · solares (3 con 2 salidas, 4 con 3 o 4) y uno extra opcional por 100
//  4 · casilla especial opcional (50 normal o 100 ★; eliges entre 3, las que aún no has visto salen como «???»)
//  5 · colocarlo ya en el mapa, girándolo (R), o guardarlo: saldrá como pieza extra (ya pagada) en la próxima elección de pieza.
// Si al colocarlo cae en un cofre o en un evento, se abren después, y la elección de torre de la ronda sale cuando acaben (nada se pierde).
const FAB={open:false,st:null,cvs:null};
const FABX={1:['S','N'],2:['S','W','E'],3:['S','N','W','E']},FABXC={N:[3,0],S:[3,6],W:[0,3],E:[6,3]},FABSOL={1:3,2:4,3:4},FABMAXP=28,FABSTEPS=['Salidas','Camino','Solares','Casilla especial','Colocar'];
const fabK=(x,y)=>x+','+y;
EVENTS.fabric={n:'Fabricador de sectores',ic:'🏭',era:2,txt:'Una fábrica automática de la Forja, abandonada entre los escombros. Imprimía terreno a medida para los asentamientos. Está sin energía: su biorreactor arranca con créditos… o con una muestra orgánica.',opts:[
 {l:'Arrancarla con tu sangre',c:'Pierdes 3 de vida y se abre el Fabricador',req:()=>S.hp<4?'Necesitas al menos 4 de vida':'',run:()=>{hpLoss(3);S.fabGo=1;return['hp:-3','fab'];}},
 {l:'Arrancarla con oro',c:'Pagas 30 🪙 y se abre el Fabricador',req:()=>S.gold<30?'Necesitas 30 🪙':'',run:()=>{S.gold-=30;S.fabGo=1;return['gold:-30','fab'];}},
 {l:'Desguazarla',c:'No se abre el Fabricador',run:()=>{const k=fabScrap();return k?['bf:'+k]:['gold:40'];}}]};
EVRES.fabric=['Pinchas la muestra en el biorreactor. La fábrica tose, se enciende y una pantalla te pide medidas.',
 'Metes los créditos en la ranura. Las luces se encienden una a una y la impresora se pone a calentar.',
 k=>k[0]&&k[0].startsWith('bf')?'Desmontas lo que puedes. Uno de los módulos sigue vivo: lo entierras en un solar de esta pieza y empieza a zumbar.':'Desmontas lo que puedes y vendes la chatarra a la Resistencia.'];
// imagen provisional del evento: la fábrica con su impresora
if(typeof EVIMG!=='undefined')EVIMG.fabric={ev:'<svg viewBox="-4 -4 408 268"><rect width="400" height="260" rx="6" fill="#0d1626"/><path d="M0 200h400v60H0z" fill="#1a2436"/><path d="M60 200V110l60 30v-30l60 30v-30l60 30V80h50v120z" fill="#24344e" stroke="#3fe8ff" stroke-width="2.5" stroke-linejoin="round"/><path d="M250 80V40h22v40" fill="#24344e" stroke="#3fe8ff" stroke-width="2.5"/><rect x="150" y="160" width="100" height="40" fill="#121a2a" stroke="#3fe8ff" stroke-width="2"/><path d="M160 180h80" stroke="#ff3fd0" stroke-width="3" stroke-dasharray="8 6"/><g fill="#3fe8ff" opacity=".85"><rect x="90" y="150" width="14" height="14"/><rect x="200" y="120" width="14" height="14"/></g><circle cx="261" cy="30" r="8" fill="#ffd75a" opacity=".6"/></svg>',o:{}};
{const _c=chip;chip=function(k){const[a,b]=k.split(':');if(a==='fab')return '<span class="cf">🏭 diseñas tu propio sector</span>';if(a==='bf'&&BF[b])return `<span class="gd">${BF[b].n}${BF[b].sup?' ★':''} en un solar de la pieza</span>`;return _c.apply(this,arguments);};}
// Desguazarla: un solar libre de la pieza del evento recibe una casilla especial al azar
function fabScrap(){const bk=EVK;if(!bk){goldEv(40);return null;}const[bx,by]=bk.split(',').map(Number),L=[];
 for(let y=0;y<P;y++)for(let x=0;x<P;x++){const gx=bx*P+x,gy=by*P+y;if(!inbc(gx,gy)||S.cc[gy][gx]!==1)continue;const fx=gx*K+1,fy=gy*K+1;if(S.buff[fy]&&S.buff[fy][fx])continue;if(S.occ[fx+','+fy])continue;L.push([gx,gy]);}
 if(!L.length){goldEv(40);return null;}const[gx,gy]=L[Math.floor(Math.random()*L.length)],k=rollBuff();
 for(let j=0;j<K;j++)for(let i=0;i<K;i++)S.buff[gy*K+j][gx*K+i]=k;see('bf',bkey(k));S.fx.push({x:gx*K+1,y:gy*K+1,t:.8,m:.8,r:1.4*K,col:BF[k].col});return k;}
// al cerrar el evento, se abre el Fabricador
{const _c=closeEvent;closeEvent=function(){const go=S&&S.fabGo&&!RL.evNext;const r=_c.apply(this,arguments);if(go){S.fabGo=0;setTimeout(fabOpen,0);}return r;};}
// mientras está abierto, la elección de torre espera
{const _t=tryTowerOffer;tryTowerOffer=function(){if(FAB.open)return;return _t.apply(this,arguments);};}
// ---- estado y reglas ----
function fabNew(){return{step:0,ex:0,path:new Set(),sol:new Set(),xs:0,tier:0,sp:null,spAt:null,ch:[],rot:0,hov:null,hovB:null,msg:'',mc:''};}
const fabOpens=st=>st.ex?FABX[st.ex].map(d=>FABXC[d]):[];
const fabIsOpen=(st,x,y)=>fabOpens(st).some(o=>o[0]===x&&o[1]===y);
// las salidas que no has elegido no pueden llevar camino (serían una salida más)
const fabForbid=(st,x,y)=>!fabIsOpen(st,x,y)&&Object.values(FABXC).some(o=>o[0]===x&&o[1]===y);
const fabNSol=st=>FABSOL[st.ex]+(st.xs?1:0);
function fabCost(st){return (st.ex?25*st.ex:0)+(st.xs?100:0)+(st.tier===1?50:st.tier===2?100:0);}
function fabCheck(st){const O=fabOpens(st),Pt=st.path,r={len:Pt.size,ends:true,conn:false,block:true};
 for(const[x,y]of O)if(!Pt.has(fabK(x,y)))r.ends=false;
 for(const c of Pt){const[x,y]=c.split(',').map(Number);if(Pt.has(fabK(x+1,y))&&Pt.has(fabK(x,y+1))&&Pt.has(fabK(x+1,y+1)))r.block=false;}
 if(Pt.size){const s=[...Pt][0],seen=new Set([s]),q=[s];while(q.length){const[x,y]=q.pop().split(',').map(Number);for(const[dx,dy]of D){const n=fabK(x+dx,y+dy);if(Pt.has(n)&&!seen.has(n)){seen.add(n);q.push(n);}}}r.conn=seen.size===Pt.size;}
 r.lenOk=Pt.size<=FABMAXP;r.ok=r.ends&&r.conn&&r.block&&r.lenOk;return r;}
// la pieza como las del juego: '.' camino, 'S' solar, lo demás terreno (con su decoración)
function fabPiece(st){const g=Array.from({length:P},()=>Array(P).fill('#'));for(const c of st.path){const[x,y]=c.split(',').map(Number);g[y][x]='.';}for(const c of st.sol){const[x,y]=c.split(',').map(Number);g[y][x]='S';}
 const o={n:'Sector a medida',p:g.map(r=>r.join('')),b:[],fab:1};try{decorate(o);}catch(e){}
 if(st.sp&&st.spAt){const[x,y]=st.spAt.split(',').map(Number);o.b.push({x,y,k:st.tier===2?st.sp+'+':st.sp});}
 for(let i=0;i<st.rot;i++)rotO(o);return o;}
function fabPick(st){const pool=(typeof bfPool==='function'?bfPool():BK).filter(k=>BF[k]&&!BF[k].cur&&k!=='cur');st.ch=shuf([...pool]).slice(0,3);}
// ---- ventana ----
function fabOpen(){if(!S||FAB.open)return;FAB.open=true;FAB.st=fabNew();let w=$('fabw');if(!w){w=document.createElement('div');w.id='fabw';document.body.appendChild(w);
  w.addEventListener('click',fabClick);w.addEventListener('mousemove',fabTipMove);w.addEventListener('mouseleave',()=>{const t=$('fabtip');if(t)t.style.display='none';});}
 w.innerHTML=`<div class="fabwin"><div class="fabl"><div class="fabh1">FABRICADOR DE SECTORES</div><div class="fabsub">Imprime terreno a medida. Diseña tu propio sector y colócalo donde quieras.</div><div class="fabsteps"></div>
  <div class="fabg"><span>Oro</span><b class="fabgold"></b></div><div class="fabg"><span>Coste del sector</span><span class="fabcost gd"></span></div></div>
  <div class="fabc"><canvas width="448" height="448"></canvas><div class="fabmsg"></div></div><div class="fabside"></div></div><div id="fabtip"></div>`;
 FAB.cvs=w.querySelector('canvas');const c=FAB.cvs;
 c.addEventListener('pointerdown',fabDown);c.addEventListener('pointermove',fabMove);c.addEventListener('pointerup',()=>{FAB.drag=null;});c.addEventListener('pointerleave',()=>{FAB.st.hov=null;FAB.st.hovB=null;FAB.drag=null;fabDraw();});
 w.classList.add('on');document.body.classList.add('fabopen');try{closePrim();}catch(e){}fabFit();fabRender();try{sfx('ui');}catch(e){}}
function fabClose(){FAB.open=false;const w=$('fabw');if(w){w.classList.remove('on');w.innerHTML='';}document.body.classList.remove('fabopen');FAB.drag=null;try{ui();}catch(e){}}
function fabFit(){const w=$('fabw'),b=w&&w.querySelector('.fabwin');if(!b)return;/* v349: en móvil (poca altura), una ventana más compacta para que la letra no quede diminuta */const m=innerHeight<520;b.classList.toggle('fabm',m);const W=m?860:1000,H=m?450:580,z=Math.min((innerWidth-(m?96:16))/W,(innerHeight-(m?12:76))/H);/* arriba queda sitio para el botón de informar de un fallo */b.style.top=m?'50%':'calc(50% + 30px)';b.style.left=m?"calc(50% + 36px)":"50%";b.style.transform=`translate(-50%,-50%) scale(${Math.max(.3,z)})`;}
addEventListener('resize',()=>{if(FAB.open)fabFit();});
function fabMsg(t,c){FAB.st.msg=t||'';FAB.st.mc=c||'';const m=document.querySelector('#fabw .fabmsg');if(m){m.textContent=FAB.st.msg;m.className='fabmsg '+FAB.st.mc;}}
function fabRender(){const st=FAB.st,w=$('fabw');if(!w||!st)return;const G=S.gold-fabCost(st),avail=x=>G+x>=0;
 w.querySelector('.fabsteps').innerHTML=FABSTEPS.map((n,i)=>`<div class="fabstp${i===st.step?' on':i<st.step?' done':''}"><i>${i<st.step?'✓':i+1}</i>${n}</div>`).join('');
 w.querySelector('.fabgold').textContent=G+' 🪙';w.querySelector('.fabcost').textContent=fabCost(st)+' 🪙';
 const back='<button class="fabbtn" data-fb="back">‹ Atrás</button>';let h='';
 if(st.step===0){const poor=S.gold<25;h=`<h2>1 · ¿Cuántas salidas?</h2><p>Contando por donde se entra. Siempre van en el centro de un lado; al colocar el sector podrás girarlo.</p>
  ${[[1,'Pasillo','2 salidas'],[2,'Bifurcación','3 salidas'],[3,'Cruce','4 salidas']].map(([n,t,s])=>`<button class="fabopt${st.ex===n?' on':''}" data-ex="${n}"${S.gold<25*n?' disabled':''}><span>${t}<small>${s} · ${FABSOL[n]} solares</small></span><span class="gd">${25*n} 🪙</span></button>`).join('')}
  <div class="fabrow">${poor?'<button class="fabbtn" data-fb="quit">Salir sin fabricar</button>':''}<button class="fabbtn go" data-fb="go"${st.ex?'':' disabled'}>Continuar ›</button></div>`;}
 else if(st.step===1){const r=fabCheck(st);h=`<h2>2 · Dibuja el camino</h2><p>Pulsa o arrastra sobre las casillas para poner o quitar camino. Tiene que unir todas las salidas. Si toca el borde fuera de una salida y al lado hay otra pieza, se levanta una valla.</p>
  <div class="fabchk"><span class="${r.ends&&r.conn?'y':''}">Une todas las salidas</span><span class="${r.block?'y':''}">Sin bloques de 2×2 (el camino es de una casilla de ancho)</span><span class="${r.lenOk?'y':''}">Como mucho ${FABMAXP} casillas (llevas ${r.len})</span></div>
  <div class="fabrow">${back}<button class="fabbtn go" data-fb="go"${r.ok?'':' disabled'}>Continuar ›</button></div>`;}
 else if(st.step===2){const n=fabNSol(st);h=`<h2>3 · Coloca los solares</h2><p>Tienes ${n} solares. Ponlos donde quieras, fuera del camino. Pulsa uno puesto para quitarlo.</p><p><b class="fabink">${st.sol.size} / ${n}</b> colocados</p>
  <button class="fabopt${st.xs?' on':''}" data-xs="1"${!st.xs&&!avail(-100)?' disabled':''}><span>Solar extra<small>Uno más, solo uno</small></span><span class="gd">${st.xs?'Quitar · ':''}100 🪙</span></button>
  <div class="fabrow">${back}<button class="fabbtn go" data-fb="go"${st.sol.size===n?'':' disabled'}>Continuar ›</button></div>`;}
 else if(st.step===3){const cur=st.tier===1?50:st.tier===2?100:0;h=`<h2>4 · Casilla especial <small>(opcional)</small></h2><p>Elige el tipo, luego una de las tres y pulsa un solar para ponerla.</p>
  <button class="fabopt${st.tier===0?' on':''}" data-tier="0"><span>Sin casilla especial</span><span class="gd">0 🪙</span></button>
  <button class="fabopt${st.tier===1?' on':''}" data-tier="1"${avail(cur-50)?'':' disabled'}><span>Casilla especial<small>Elige entre 3</small></span><span class="gd">50 🪙</span></button>
  <button class="fabopt${st.tier===2?' on':''}" data-tier="2"${avail(cur-100)?'':' disabled'}><span>Casilla especial ★<small>Elige entre 3, versión mejorada</small></span><span class="gd">100 🪙</span></button>
  ${st.tier?`<div class="fabchs">${st.ch.map(k=>{const kk=st.tier===2?k+'+':k,kn=seen('bf',k);return `<button class="fabopt fabbf${st.sp===k?' on':''}" data-sp="${k}" data-ftip="${kn?kk:'?'}">${kn&&typeof bfIcon==='function'?bfIcon(kk,26):'<span class="fabunk">?</span>'}<span>${kn?BF[k].n+(st.tier===2?' ★':''):'???'}</span></button>`;}).join('')}</div>`:''}
  <div class="fabrow">${back}<button class="fabbtn go" data-fb="go"${!st.tier||(st.sp&&st.spAt)?'':' disabled'}>Continuar ›</button></div>`;}
 else{const o=fabPiece(st),any=fabSpots(o).length;h=`<h2>5 · Coloca el sector</h2><p>Los huecos marcados son donde encaja. Gíralo con <kbd>R</kbd> o con el botón. Pasa por un hueco para verlo y pulsa para colocarlo.</p>
  <button class="fabopt" data-fb="rot"><span>⟳ Girar</span><small>${['Sin girar','Girado 90°','Girado 180°','Girado 270°'][st.rot]}</small></button>
  <p>${any?'Si lo prefieres, guárdalo: saldrá ya pagado en la próxima elección de pieza.':'<b class="fabbad">Ahora no encaja en ningún sitio</b>: guárdalo y saldrá ya pagado en la próxima elección de pieza.'}</p>
  <div class="fabrow">${back}<button class="fabbtn go" data-fb="keep">Guardar para después</button></div>`;}
 w.querySelector('.fabside').innerHTML=h;fabDraw();
 if(st.step===1){const r=fabCheck(st);fabMsg(r.ok?'Camino listo.':st.msg&&st.mc==='bad'?st.msg:'',r.ok?'ok':st.mc);}else if(st.step!==4&&st.mc!=='bad'&&st.mc!=='ok')fabMsg(st.msg);else fabMsg(st.msg,st.mc);}
function fabClick(e){const b=e.target.closest('button');if(!b||b.disabled||!FAB.open)return;const st=FAB.st;e.stopPropagation();st.msg='';st.mc='';
 if(b.dataset.ex){st.ex=+b.dataset.ex;st.path=new Set(fabOpens(st).map(([x,y])=>fabK(x,y)));st.sol=new Set();st.spAt=null;st.xs=0;}
 else if(b.dataset.fb==='go'){st.step++;if(st.step===1&&!st.path.size)st.path=new Set(fabOpens(st).map(([x,y])=>fabK(x,y)));
  if(st.step===2){for(const s of [...st.sol])if(st.path.has(s))st.sol.delete(s);while(st.sol.size>fabNSol(st))st.sol.delete([...st.sol].pop());}
  if(st.step===3){if(st.spAt&&!st.sol.has(st.spAt))st.spAt=null;if(st.tier&&!st.ch.length)fabPick(st);}}
 else if(b.dataset.fb==='back')st.step=Math.max(0,st.step-1);
 else if(b.dataset.fb==='quit'){fabClose();return;}
 else if(b.dataset.fb==='rot')st.rot=(st.rot+1)%4;
 else if(b.dataset.fb==='keep'){fabFinish(null);return;}
 else if(b.dataset.xs){st.xs=st.xs?0:1;if(!st.xs)while(st.sol.size>fabNSol(st)){const l=[...st.sol].pop();st.sol.delete(l);if(st.spAt===l)st.spAt=null;}}
 else if(b.dataset.tier!=null){st.tier=+b.dataset.tier;st.sp=null;st.spAt=null;if(st.tier)fabPick(st);}
 else if(b.dataset.sp){st.sp=b.dataset.sp;st.spAt=null;st.msg='Ahora pulsa uno de tus solares para ponerla.';}
 try{sfx('ui');}catch(x){}fabRender();}
// bocadillo de las casillas especiales
function fabTipMove(e){const t=$('fabtip');if(!t)return;const b=e.target.closest&&e.target.closest('[data-ftip]');if(!b){t.style.display='none';return;}const k=b.dataset.ftip;
 t.innerHTML=k==='?'?'<b>???</b>Una casilla especial que aún no has descubierto. La conocerás al ponerla.':`<b style="color:${BF[k].col}">${BF[k].n}${BF[k].sup?' ★':''}</b>${BF[k].t||''}${BF[k].note?`<small>${BF[k].note}</small>`:''}`;
 t.style.display='block';const r=b.getBoundingClientRect(),tw=t.offsetWidth,th=t.offsetHeight;let x=r.left-tw-10;if(x<8)x=Math.min(innerWidth-tw-8,r.right+10);t.style.left=x+'px';t.style.top=Math.max(8,Math.min(innerHeight-th-8,r.top))+'px';}
// ---- lienzo ----
function fabCell(e){const c=FAB.cvs,r=c.getBoundingClientRect();return[Math.floor((e.clientX-r.left)/r.width*P),Math.floor((e.clientY-r.top)/r.height*P)];}
function fabBlock(e){const c=FAB.cvs,r=c.getBoundingClientRect();return[Math.floor((e.clientX-r.left)/r.width*BN),Math.floor((e.clientY-r.top)/r.height*BN)];}
function fabTog(x,y,mode){const st=FAB.st;if(x<0||y<0||x>=P||y>=P)return;const k=fabK(x,y);if(fabIsOpen(st,x,y))return;
 if(fabForbid(st,x,y)){fabMsg('Ahí iría otra salida: el camino no puede pasar por el centro de un lado que no has elegido.','bad');return;}
 if(mode==='del'||(!mode&&st.path.has(k)))st.path.delete(k);else if(!st.path.has(k)){if(st.path.size>=FABMAXP){fabMsg('Has llegado al máximo de camino.','bad');return;}st.path.add(k);}fabRender();}
function fabDown(e){const st=FAB.st;e.preventDefault();
 if(st.step===4){const[bx,by]=fabBlock(e),o=fabPiece(st);if(fabSpots(o).some(([a,b])=>a===bx&&b===by))fabFinish([bx,by]);else fabMsg('Ahí no encaja: elige uno de los huecos marcados.','bad');return;}
 const[x,y]=fabCell(e),k=fabK(x,y);
 if(st.step===1){if(fabIsOpen(st,x,y)){fabMsg('Las salidas no se pueden quitar.','bad');return;}FAB.drag=st.path.has(k)?'del':'add';fabTog(x,y,FAB.drag);try{FAB.cvs.setPointerCapture(e.pointerId);}catch(x){}}
 else if(st.step===2){if(st.path.has(k)){fabMsg('Los solares van fuera del camino.','bad');return;}if(st.sol.has(k)){st.sol.delete(k);if(st.spAt===k)st.spAt=null;}else if(st.sol.size<fabNSol(st))st.sol.add(k);else{fabMsg('Ya has puesto todos los solares.','bad');return;}st.msg='';fabRender();}
 else if(st.step===3){if(!st.sp)return;if(!st.sol.has(k)){fabMsg('La casilla especial va en uno de tus solares.','bad');return;}st.spAt=k;see('bf',st.sp);st.msg='Casilla especial colocada.';st.mc='ok';fabRender();}}
function fabMove(e){const st=FAB.st;if(st.step===4){const[bx,by]=fabBlock(e),k=fabK(bx,by);if(st.hovB!==k){st.hovB=k;fabDraw();}return;}
 const h=fabCell(e);if(FAB.drag&&st.step===1){fabTog(h[0],h[1],FAB.drag);}if(!st.hov||st.hov[0]!==h[0]||st.hov[1]!==h[1]){st.hov=h;fabDraw();}}
// dónde encaja: los mismos huecos que una pieza normal
function fabSpots(o){const out=[];for(let by=0;by<BN;by++)for(let bx=0;bx<BN;bx++)if(check(bx,by,o.p)===0)out.push([bx,by]);return out;}
const FABC={bg:'#151c27',ln:'#22314a',path:'#2a3a50',pe:'#3fe8ff66',sol:'#33415a',sole:'#9fb4d0',cy:'#3fe8ff',bad:'#ff6a5a55'};
function fabDraw(){const st=FAB.st,c=FAB.cvs;if(!c||!st)return;const g2=c.getContext('2d'),W=c.width;g2.clearRect(0,0,W,W);
 if(st.step===4)return fabDrawMap(g2,W);const cs=W/P;g2.fillStyle=FABC.bg;g2.fillRect(0,0,W,W);
 g2.strokeStyle=FABC.ln;g2.lineWidth=1;for(let i=0;i<=P;i++){g2.beginPath();g2.moveTo(i*cs,0);g2.lineTo(i*cs,W);g2.stroke();g2.beginPath();g2.moveTo(0,i*cs);g2.lineTo(W,i*cs);g2.stroke();}
 // salidas no elegidas: prohibidas
 if(st.step===1)for(const[x,y]of Object.values(FABXC))if(fabForbid(st,x,y)){g2.fillStyle=FABC.bad;g2.fillRect(x*cs+6,y*cs+6,cs-12,cs-12);g2.strokeStyle='#ff6a5a';g2.lineWidth=2;g2.beginPath();g2.moveTo(x*cs+16,y*cs+16);g2.lineTo(x*cs+cs-16,y*cs+cs-16);g2.moveTo(x*cs+cs-16,y*cs+16);g2.lineTo(x*cs+16,y*cs+cs-16);g2.stroke();}
 for(const[x,y]of fabOpens(st)){g2.fillStyle='#3fe8ff22';g2.fillRect(x*cs,y*cs,cs,cs);g2.strokeStyle=FABC.cy;g2.lineWidth=2;g2.setLineDash([6,4]);g2.strokeRect(x*cs+3,y*cs+3,cs-6,cs-6);g2.setLineDash([]);
  const ax=x===0?-1:x===P-1?1:0,ay=y===0?-1:y===P-1?1:0,cx=x*cs+cs/2+ax*cs*.36,cy=y*cs+cs/2+ay*cs*.36;g2.fillStyle=FABC.cy;g2.beginPath();g2.moveTo(cx+ax*8,cy+ay*8);g2.lineTo(cx-ay*8-ax*4,cy+ax*8-ay*4);g2.lineTo(cx+ay*8-ax*4,cy-ax*8-ay*4);g2.fill();}
 for(const p of st.path){const[x,y]=p.split(',').map(Number);g2.fillStyle=FABC.path;g2.fillRect(x*cs+1,y*cs+1,cs-2,cs-2);g2.strokeStyle=FABC.pe;g2.lineWidth=1.5;g2.strokeRect(x*cs+4,y*cs+4,cs-8,cs-8);}
 for(const s of st.sol){const[x,y]=s.split(',').map(Number),sp=st.spAt===s&&st.sp,kk=sp?(st.tier===2?st.sp+'+':st.sp):null,m=cs*.16;g2.fillStyle=sp?BF[kk].col:FABC.sol;g2.fillRect(x*cs+m,y*cs+m,cs-2*m,cs-2*m);g2.strokeStyle=sp?'#fff':FABC.sole;g2.lineWidth=2.5;g2.strokeRect(x*cs+m,y*cs+m,cs-2*m,cs-2*m);
  if(sp){g2.fillStyle='#0b111c';g2.font=`800 ${Math.round(cs*.34)}px Arial`;g2.textAlign='center';g2.textBaseline='middle';g2.fillText((BF[kk].l||'')+(st.tier===2?'★':''),x*cs+cs/2,y*cs+cs/2+1);}}
 if(st.hov){const[x,y]=st.hov;g2.strokeStyle='#ffffffaa';g2.lineWidth=2;g2.strokeRect(x*cs+2,y*cs+2,cs-4,cs-4);}}
// paso 5: el mapa de verdad, en pequeño, con los huecos donde encaja
function fabDrawMap(g2,W){const st=FAB.st,bs=W/BN,cs=bs/P,o=fabPiece(st),sp=fabSpots(o),isSp=(a,b)=>sp.some(([x,y])=>x===a&&y===b);g2.fillStyle='#0f1522';g2.fillRect(0,0,W,W);
 for(let by=0;by<BN;by++)for(let bx=0;bx<BN;bx++){const x0=bx*bs,y0=by*bs,k=fabK(bx,by);g2.strokeStyle=FABC.ln;g2.lineWidth=1;g2.strokeRect(x0+.5,y0+.5,bs-1,bs-1);
  if(S.blocks[k]){for(let y=0;y<P;y++)for(let x=0;x<P;x++){const v=S.cc[by*P+y][bx*P+x];g2.fillStyle=v===2?'#2e4462':v===1?'#3a4a64':'#141b28';g2.fillRect(x0+x*cs,y0+y*cs,cs+.3,cs+.3);}
   const cx=Math.floor(S.core.x/K),cy=Math.floor(S.core.y/K);if(Math.floor(cx/P)===bx&&Math.floor(cy/P)===by){g2.fillStyle=FABC.cy;g2.beginPath();g2.arc((cx+.5)*cs,(cy+.5)*cs,cs*.9,0,7);g2.fill();}}
  else{if(S.chests&&S.chests[k]){g2.fillStyle='#4d5a35';g2.fillRect(x0+bs*.32,y0+bs*.38,bs*.36,bs*.26);g2.fillStyle='#ff4d3a';g2.beginPath();g2.arc(x0+bs*.5,y0+bs*.33,bs*.04,0,7);g2.fill();}
   if(S.evts&&S.evts[k]){g2.strokeStyle=FABC.cy;g2.lineWidth=2;g2.font=`800 ${Math.round(bs*.42)}px Arial`;g2.textAlign='center';g2.textBaseline='middle';g2.strokeText('?',x0+bs/2,y0+bs/2);}
   if(isSp(bx,by)){g2.strokeStyle=FABC.cy;g2.setLineDash([7,5]);g2.lineWidth=2.5;g2.strokeRect(x0+3,y0+3,bs-6,bs-6);g2.setLineDash([]);if(st.hovB===k)fabDrawPiece(g2,o,x0,y0,bs,.65);}}}}
function fabDrawPiece(g2,o,x0,y0,sz,al){const cs=sz/P;g2.save();g2.globalAlpha=al;g2.fillStyle=FABC.bg;g2.fillRect(x0,y0,sz,sz);
 for(let y=0;y<P;y++)for(let x=0;x<P;x++){const ch=o.p[y][x];if(ch==='.'){g2.fillStyle=FABC.path;g2.fillRect(x0+x*cs,y0+y*cs,cs,cs);}else if(ch==='S'){const b=o.b.find(q=>q.x===x&&q.y===y);g2.fillStyle=b?BF[b.k].col:FABC.sol;g2.fillRect(x0+x*cs+cs*.15,y0+y*cs+cs*.15,cs*.7,cs*.7);}}
 g2.strokeStyle=FABC.cy;g2.lineWidth=2;g2.strokeRect(x0,y0,sz,sz);g2.restore();}
// ---- terminar: se paga y se coloca ya o se guarda ----
function fabFinish(at){const st=FAB.st,cost=fabCost(st),o=fabPiece(st);S.gold-=cost;if(S.st)S.st.gEvSpent=(S.st.gEvSpent||0)+cost;fabClose();
 if(!at){(S.fabKeep=S.fabKeep||[]).push(o);toast('🏭 Sector guardado: saldrá ya pagado en la próxima elección de pieza.');ui();return;}
 fabPlace(o,at[0],at[1]);}
// colocarlo como una pieza más (lo pagado ya está pagado: la casilla especial no se cobra otra vez)
function fabPlace(o,bx,by){const off=S.offers,pi=S.pi;S.offers=[o];S.pi=0;const pc=payOn()?pcost(o):0;S.gold+=pc;
 try{placePiece(bx,by);}finally{S.offers=off&&off.length&&S.phase!=='build'?off:[];S.pi=null;}
 try{sfx('place');}catch(e){}ui();}
// las piezas guardadas salen en la próxima elección de pieza, además de las de siempre
{const _d=deal;deal=function(){const r=_d.apply(this,arguments);try{if(S&&S.fabKeep&&S.fabKeep.length&&!S.tut&&S.offers){const k=S.fabKeep.find(o=>anyPlace(o));if(k){S.fabKeep=S.fabKeep.filter(o=>o!==k);S.offers.push(k);S.noSlot=false;}}}catch(e){}return r;};}
{const _p=placePiece;placePiece=function(bx,by){const o=S.offers&&S.offers[S.pi];if(o&&o.fab&&!FAB.placing){FAB.placing=1;try{if(payOn())S.gold+=pcost(o);return _p.apply(this,arguments);}finally{FAB.placing=0;}}return _p.apply(this,arguments);};}
// fabPlace ya devuelve lo de la casilla especial: que el envoltorio no lo devuelva dos veces
{const _fp=fabPlace;fabPlace=function(o,bx,by){FAB.placing=1;try{return _fp.apply(this,arguments);}finally{FAB.placing=0;}};}
// en la elección de pieza, la guardada dice que ya está pagada
{const _u=ui;ui=function(){const r=_u.apply(this,arguments);try{if(S&&S.phase==='place'&&S.offers)S.offers.forEach((o,i)=>{if(!o.fab)return;const c=document.querySelector(`#ui .card[data-i="${i}"] .pcst`);if(c){c.textContent='Ya pagada';c.className='pcst pfree';}});}catch(e){}return r;};}
// teclado: mientras está abierto, las teclas son suyas (R gira en el paso 5)
addEventListener('keydown',e=>{if(!FAB.open)return;const k=e.key.toLowerCase();if(k==='r'&&FAB.st.step===4){FAB.st.rot=(FAB.st.rot+1)%4;fabRender();}
 if(e.key==='Escape'&&FAB.st.step>0){FAB.st.step--;fabRender();}e.stopImmediatePropagation();e.preventDefault();},true);
