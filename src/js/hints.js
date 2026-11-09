// ==================== PISTAS ====================
// Saltan la primera vez que pasa algo (se recuerda entre partidas). Si salen en plena oleada, el juego frena poco a poco hasta pararse.
let HSEEN={};try{HSEEN=JSON.parse(localStorage.getItem('rt-hints'))||{};}catch(e){}
const HQ={q:[],cur:null,f:1};
const realG=()=>S&&S.st&&!S.pvE&&!S.pvH&&S.portals&&(S.phase==='place'||S.phase==='build'||S.phase==='wave');
// lim: pistas del mapa en la fase de construcción, como mucho 2 por ronda para no saturar (las demás saldrán en rondas siguientes)
const TSKIP={tile:1,fork:1,speed:1,retry:1,bfcost:1};
// pistas prioritarias: van las primeras de la cola y no cuentan para el límite de pistas seguidas (deben salir con lo primero que las provoca)
const HPRIO={units:1};
function hint(id,title,txt,tg,lim){if(S&&S.tut&&(TSKIP[id]||(id==='chest'&&S.round<3)||(id==='hab'&&S.round<2)||(id==='hero'&&S.phase!=='wave')||(id==='portal'&&S.round===1&&S.phase!=='wave')))return;if((!OPT.hints&&!(S&&S.tut))||(S&&S.tut?TUTHS[id]:HSEEN[id])||HQ.q.some(h=>h.id===id)||(HQ.cur&&HQ.cur.id===id)||!realG())return;if(lim){if(HQ.limR!==S.round){HQ.limR=S.round;HQ.limN=0;}if(HQ.limN>=2)return;HQ.limN++;}{const it=Array.isArray(txt)?{id,title,steps:txt,si:0,txt:txt[0][0],tg:txt[0][1],ph:S.phase}:{id,title,txt,tg,ph:S.phase};if(HPRIO[id])HQ.q.unshift(it);else HQ.q.push(it);}}
const hintL=(id,t,x,g)=>hint(id,t,x,g,1);
const HOV=()=>TOUCH?'Toca':'Pasa el ratón por',CANC=()=>TOUCH?' Pulsa el mismo botón para cancelar.':' Esc para cancelar.';
const HEROTXT='Pulsa el retrato de tu héroe y elige una casilla del camino para moverlo, también durante la oleada.';
const hintSeen=id=>{if(S&&S.tut)TUTHS[id]=1;HSEEN[id]=1;try{localStorage.setItem('rt-hints',JSON.stringify(HSEEN));}catch(e){}};
// objetivos: devuelven {x,y,r} en píxeles de la ventana, o null
const tgCell=(x,y,rc)=>()=>{const r=cv.getBoundingClientRect(),k=sc()/VIEW*r.width;return{x:((x+.5)*CS-CAM.x)*k+r.left,y:((y+.5)*CS-CAM.y)*k+r.top,r:Math.max(30,(rc||1.6)*K*CS*k)};};
const tgCard=sel=>()=>{const e=document.querySelector(sel);return e?tgEl(e.closest('button')||e)():null;};
const tgEnemy=e=>()=>e.hp>0?tgCell(e.x,e.y,1.3)():null;
const tgEl=sel=>()=>{const el=typeof sel==='string'?document.querySelector(sel):sel;if(!el||!el.offsetParent)return null;const b=el.getBoundingClientRect();return{x:b.left+b.width/2,y:b.top+b.height/2,r:Math.max(26,Math.max(b.width,b.height)/2+10)};};
function hintShow(h){HQ.cur=h;if(S&&S.tut&&S.phase==='place')setTimeout(()=>{try{ui();}catch(e){}},0);try{if(PR.open)closePrim();}catch(e){}/* que la ficha de un portal no tape lo que señala la pista */let el=$('hint');if(!el){el=document.createElement('div');el.id='hint';document.body.appendChild(el);el.addEventListener('click',e=>{if(e.target.closest('[data-a="hintok"]')){const c=HQ.cur;if(c&&c.steps&&c.si<c.steps.length-1){c.si++;c.txt=c.steps[c.si][0];c.tg=c.steps[c.si][1];hintShow(c);}else hintClose();}});}
 const ns=h.steps&&h.si<h.steps.length-1;const wt=h.steps&&h.steps[h.si][2];el.innerHTML=`<div class="hring"></div><div class="hmsg tipc"><b>${h.title}</b>${h.steps?`<small class="hstep">${h.si+1}/${h.steps.length}</small>`:''}<div style="margin:4px 0 ${wt?2:8}px">${h.txt}</div>${wt?'':`<button class="go" data-a="hintok">${ns?'Siguiente ›':'Entendido'}</button>`}</div>`;el.className='open'+(S&&S.phase==='wave'?' slow':'')+(wt?'':' block')+(h.menu?' dim':'');
 if(h.cam){if(h.cam.fit){const zf=VH/(BS*1.6*P*K*CS),zw=VIEW/(BS*1.6*P*K*CS);CAM.z=Math.max(ZMIN,Math.min(CAM.z,zf,zw));}camCenter(h.cam.x,h.cam.y);}}
// ¿la pista abierta bloquea el resto del juego? Sí, salvo las que piden hacer algo para continuar («Pulsa este botón…»)
function hintBlocks(){const c=HQ.cur;if(!c)return false;if(c.steps&&c.steps[c.si]&&c.steps[c.si][2])return false;const el=$('hint');return !!(el&&el.classList.contains('open')&&!el.classList.contains('hid'));}
// teclado con una pista abierta: Intro/Espacio = Entendido; Esc sigue abriendo la pausa; nada más
addEventListener('keydown',e=>{if(!hintBlocks()||e.key==='Escape'||/^F\d+$/.test(e.key))return;e.preventDefault();e.stopImmediatePropagation();
 if((e.key==='Enter'||e.key===' ')&&!e.repeat){const b=document.querySelector('#hint [data-a="hintok"]');if(b)b.click();}},true);
function hintClose(){if(!HQ.cur)return;hintSeen(HQ.cur.id);if(HQ.cur.id==='tut_tiles'){hintSeen('tile');hintSeen('bfcost');}if(HQ.cur.id==='tut_fork')hintSeen('fork');if(S&&S.phase==='wave')HQ.nt=(S.wt||0)+HGAP;HQ.pn=(HQ.pn||0)+1;HQ.cur=null;const el=$('hint');if(el)el.className='';}
function hintPos(){const el=$('hint');if(!el||!HQ.cur)return;const ring=el.firstChild,msg=el.lastChild,t=HQ.cur.tg?HQ.cur.tg():null,W=innerWidth,H=innerHeight;
 if(t){ring.style.display='';ring.style.left=(t.x-t.r)+'px';ring.style.top=(t.y-t.r)+'px';ring.style.width=ring.style.height=2*t.r+'px';}else ring.style.display='none';
 const mw=Math.min(420,W-24),mh=msg.offsetHeight;let mx=(t?t.x:W/2)-mw/2,my=t?(t.y+t.r+12+mh<H?t.y+t.r+12:t.y-t.r-12-mh):H/2-mh/2;
 mx=Math.max(12,Math.min(W-mw-12,mx));my=Math.max(12,Math.min(H-mh-12,my));msg.style.width=mw+'px';msg.style.left=mx+'px';msg.style.top=my+'px';}
const HGAP=10,BARX={pc:0,tw:0};
function hintPace(){const k=S.phase+S.round;if(HQ.pk!==k){if(HQ.pph==='wave')HQ.q=HQ.q.filter(h=>h.ph!=='wave');HQ.pk=k;HQ.pph=S.phase;HQ.pn=0;HQ.nt=2.5;}
 const h=HQ.q[0];if(!h)return false;const tut=h.id.startsWith('tut_')||!!HPRIO[h.id];if(!tut&&HQ.pn>=2)return false;if(S.phase==='wave'&&!tut&&(S.wt||0)<HQ.nt)return false;return true;}
function portAuto(){if(!S||S.phase!=='build'||S.round>2||S.portAuto===S.round||PR.open||RL.open||HQ.cur||HQ.q.length||FO.open||LB.open||!realG())return;const pt=S.portals&&S.portals[0];if(!pt)return;S.portAuto=S.round;
 const tg={key:'pt:'+pt.x+','+pt.y+'a',html:()=>portalInfo(pt),rect:cellRect(pt.x-1,pt.y-1,3)};if(MFSQ()){LUPA.tg=tg;LUPA.sticky=true;placeLupa(tg.rect);}else{openPrim(tg);PR.pinned=true;PR.auto=1;}}
function hintTick(rdt){
 if(HQ.cur&&HQ.cur.menu){const el=$('hint');if(el){el.classList.remove('hid');el.classList.add('block','dim');}hintPos();return;}
 portAuto();
 const busy=RL.open||LB.open||FO.open||!realG()||(S&&S.revAt>0)||(($('comp')||{}).classList||{contains:()=>0}).contains('lbout');
 if(!HQ.cur&&!busy&&HQ.q.length&&hintPace())hintShow(HQ.q.shift());
 if(HQ.cur&&!realG())hintClose();
 const el=$('hint');if(el&&HQ.cur){el.classList.toggle('hid',busy);el.classList.toggle('block',hintBlocks());el.classList.toggle('dim',HQ.f<.35||S.phase!=='wave');}
 const tgt=HQ.cur&&S.phase==='wave'?0:1;HQ.f+=(tgt-HQ.f)*Math.min(1,rdt/.18);if(Math.abs(HQ.f-tgt)<.01)HQ.f=tgt;
 {const c=HQ.cur,w=c&&c.steps&&c.steps[c.si][2];if(w){const r=w();if(r===2||(r===1&&c.si>=c.steps.length-1))hintClose();else if(r===1||r===-1){c.si=Math.max(0,c.si+r);c.txt=c.steps[c.si][0];c.tg=c.steps[c.si][1];hintShow(c);}}}
 hintPos();if(realG())hintScan();}
// disparadores que dependen del estado del mapa o del combate
function hintScan(){
 if(S.phase==='build'){
  const p=S.portals[0];if(p)hintL('portal','Portales','Por aquí saldrán los enemigos. '+HOV()+' el portal para ver qué viene.',tgCell(p.x,p.y,1.4));
  if(S.portals.length>1){const q=S.portals[1];hintL('multi','Varios portales','Cuantos más extremos tenga el camino, más portales pueden abrirse a la vez. Reparte tus defensas o protege el tramo que comparten.',tgCell(q.x,q.y,1.4));}
  {let fs=null;for(let gy=0;gy<NC&&!fs;gy++)for(let gx=0;gx<NC&&!fs;gx++)if(S.cc[gy][gx]===1&&!S.occ[(gx*K+1)+','+(gy*K+1)])fs={x:gx*K+1,y:gy*K+1};
  hintL('build','Construir torres','Pulsa un <span class="kw" data-kw="g_solar" data-src="">solar</span> libre: alrededor saldrán las torres de tu mazo. Toca una para ver su tarjeta y vuelve a tocarla para construirla. Disparan solas a lo que tengan a su alcance.',fs?tgCell(fs.x,fs.y,1.4):null);}
  for(const k in S.chests)if(S.chests[k]){const[bx,by]=k.split(',').map(Number);hintL('chest','Cofres','Esto es un cofre. Si tu camino llega hasta él, podrás abrirlo y elegir una reliquia para esta partida.',tgCell((bx*P+3)*K+1,(by*P+3)*K+1,1.6));{const h=HQ.q.find(h=>h.id==='chest');if(h)h.cam={x:(bx*P+3)*K+1,y:(by*P+3)*K+1,fit:1};}break;}
  for(const k in S.evts)if(S.evts[k]){const[bx,by]=k.split(',').map(Number);hintL('evtile','Casillas de evento','Esto es una casilla de evento. Si tu camino llega hasta ella, pasará algo… y tendrás que tomar una decisión.',tgCell((bx*P+3)*K+1,(by*P+3)*K+1,1.6));{const h=HQ.q.find(h=>h.id==='evtile');if(h)h.cam={x:(bx*P+3)*K+1,y:(by*P+3)*K+1,fit:1};}break;}
  if(S.ends.filter(e=>!e.bd).length>1){const e0=S.ends.find(e=>!e.bd),p0=S.portals&&S.portals[0];hintL('fork','Bifurcaciones',[['Tu camino tiene varios extremos libres: más sitios donde colocar piezas.',e0?tgCell(e0.x,e0.y,1.4):null],['Pero también más <span class="kw" data-kw="g_portal" data-src="">portales</span> por los que pueden salir enemigos.',p0?tgCell(p0.x,p0.y,1.4):null]]);}
  {let bt=null;for(const k in S.blocks){const[bx,by]=k.split(',').map(Number),NB=N/BN;for(let y=by*NB;y<(by+1)*NB&&!bt;y+=K)for(let x=bx*NB;x<(bx+1)*NB&&!bt;x+=K){const q=sqOf(x,y);if(S.buff[q.y]&&BF[S.buff[q.y][q.x]]&&S.cc[q.ky][q.kx]===1&&!S.occ[q.x+','+q.y])bt=q;}if(bt)break;}
   if(bt)hintL('tile','Casillas especiales','La torre que pongas sobre una <span class="kw" data-kw="g_tile" data-src="">casilla de color</span> gana su bonus. '+HOV()+' la casilla para verlo.',tgCell(bt.x,bt.y,1.2));}
 }
 if(S.tut&&S.phase==='place'&&S.round>=3)for(const k in S.chests)if(S.chests[k]){const[bx,by]=k.split(',').map(Number);hint('chest','Cofres','Esto es un cofre. Si tu camino llega hasta él, podrás abrirlo y elegir una reliquia para esta partida.',tgCell((bx*P+3)*K+1,(by*P+3)*K+1,1.6));{const h=HQ.q.find(h=>h.id==='chest');if(h)h.cam={x:(bx*P+3)*K+1,y:(by*P+3)*K+1,fit:1};}break;}
 if(S.tut&&S.phase==='wave'){const p=S.portals[0];if(S.round===1&&p)hint('portal','Portales','Por aquí saldrán los enemigos. '+HOV()+' el portal para ver qué viene.',tgCell(p.x,p.y,1.4));if(S.hero)hint('hero','Tu héroe',HEROTXT,tgEl('#mbr .hpport'));}
 if(S.phase==='wave'&&S.hero&&S.hero.s.hp>0&&!(S.hero.bcd>0))hint('hab','Habilidad del héroe',[['Pulsa este botón para usar la <span class="kw" data-kw="g_hab" data-src="">habilidad</span> de tu héroe.<br><small>Pruébala para continuar.</small>',tgEl('#mbr [data-a="hab"]'),()=>S.aim==='habb'?1:S.hero&&S.hero.bcd>0?2:0],['Ahora elige un punto del camino. Cuando se recargue, podrás volver a usarla.<br><small>Elige el punto para continuar.</small>',()=>S.hero?tgCell(S.hero.s.x,S.hero.s.y,1.6)():null,()=>S.hero&&S.hero.bcd>0?1:S.aim!=='habb'?-1:0]]);
 if(S.phase==='wave'){
  hint('speed','Velocidad',[['En pausa puedes construir, mejorar y mover a tu héroe con calma.',tgEl('#mbl [data-a="spd"][data-v="0"]')],['Con estos cambias la velocidad del juego.',tgEl('#mbl')]]);
  for(const e of S.enemies){if(e.hp<=0)continue;const E=ET[e.t];
   if(E.ap>0&&e.ph&&e.hp<e.max*.85)hint('armor','Armadura','¿Ves que tus golpes le quitan menos vida? Es la <span class="kw" data-kw="aphys" data-src="">armadura</span>: reduce el daño físico. El daño mágico la ignora.',tgEnemy(e));
   if(E.am>0&&e.mh&&e.hp<e.max*.85)hint('mres','Resistencia mágica','Este enemigo tiene <span class="kw" data-kw="amagic" data-src="">resistencia mágica</span>: reduce el daño mágico que recibe. El daño físico no se ve afectado.',tgEnemy(e));
   if(E.rg==='ranged'&&e.stopped)hint('ranged','Enemigos a distancia','Algunos enemigos atacan desde lejos: se detienen para disparar a tus unidades y no avanzarán hasta acabar con ellas.',tgEnemy(e));
   if(E.dodge&&unitTowers().some(t=>t.sd.some(s=>s.hp>0&&Math.hypot(s.x-e.x,s.y-e.y)<=K)))hint('dodge','Enemigos escurridizos','Este enemigo esquiva a tus unidades: ni lo bloquean ni lo atacan. Solo lo paran tus torres, las barricadas y los muros.',tgEnemy(e));
   if(E.rg!=='ranged'&&e.stopped&&e.ct>0)hint('block','Bloqueo',[['Tus unidades han frenado a este enemigo: mientras pelean con él, no avanza.',tgEnemy(e)],['Cada unidad puede bloquear a un enemigo: cuantas más unidades, más enemigos frenas a la vez.',tgEnemy(e)]]);}}
}
