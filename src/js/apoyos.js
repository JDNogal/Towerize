// ==================== v326 · Apoyos (la otra cara de las Amenazas) ====================
// Nogal (13/14-nov-2026): opcionales, hacen la partida más llevadera o más divertida sin cargarse mecánicas.
// Cada apoyo resta puntos de amenaza (nivel neto = amenazas − apoyos, nunca menos de 0: decide la tabla de clasificación y los desbloqueos)
// y baja la puntuación: −10 % por punto, y los «fuertes» además ×0,8 aparte. Las amenazas extremas (Niebla R4, Sin refuerzos R3) dan ×1,25 aparte.
// Suelo de la puntuación: ×0,5. Se abren poco a poco: al ganar con amenazas, y luego ganando con amenaza neta 3, 5 y 7.
// Pantalla: el botón pasa a «Apoyos / Amenazas»; doble página con los Apoyos a la izquierda (verde) y las Amenazas a la derecha (rojo).
// datos: [id, nombre, grupo, puntos, fuerte, desbloqueo, texto, aún no listo]
const APT=[
 ['bi','Bolsa inicial','ec',1,0,'w1','Empiezas la partida con <b>150</b> de oro más.'],
 ['cb','Casillas baratas','ec',1,0,'w1','Las casillas especiales de las piezas cuestan la <b>mitad</b>.'],
 ['rv','Reventa justa','ec',1,0,3,'Al vender una torre recuperas <b>todo</b> lo que invertiste en ella.'],
 ['pp','Primera piedra','ec',2,1,7,'La primera torre que construyes en cada ronda es <b>gratis</b>.'],
 ['apr','Aprendices','to',1,0,3,'La especialización de Nv 4 y las habilidades cuestan un <b>20 %</b> menos.'],
 ['ag','Ascenso gratuito','to',2,1,7,'Al empezar cada oleada, una de tus torres de Nv 1 sube a <b>Nv 2</b> gratis.'],
 ['rr','Refuerzos rápidos','tr',1,0,'w1','Tus soldados reaparecen el <b>doble de rápido</b>.'],
 ['hi','Héroe incansable','tr',1,0,3,'Tu héroe revive en la <b>mitad</b> de tiempo.'],
 ['mf','Murallas firmes','tr',1,0,'w1','El núcleo empieza con <b>5</b> de vida más.'],
 ['tir','Tirada de la ronda','ma',1,0,5,'Cada ronda tienes <b>una tirada gratis</b> para volver a sacar las piezas, las torres o las reliquias que te ofrecen. No se acumula: si no la gastas, sigue ahí; si la gastas, tienes otra en la siguiente ronda.'],
 ['ba','Botín y aventura','ma',2,1,7,'Cada partida trae <b>un cofre y un evento más</b>.'],
 ['vig','Vigía','in',1,0,5,'Al señalar las 2 rondas siguientes en la línea de rondas, ves exactamente qué enemigos vienen.',1]];
const APG=[['ec','Economía'],['to','Torres'],['tr','Tropas y héroe'],['ma','Mapa y piezas'],['in','Información']];
const AZX={nie:4,ref:3};/* rangos extremos de amenaza: ×1,25 aparte */
AZ.ap=AZ.ap||{sel:{1:{},2:{}}};
const apOk=()=>AZ.apw!=null;
const apUn=t=>t[5]==='w1'?apOk():apOk()&&(AZ.apw||0)>=t[5];
const apReady=t=>apUn(t)&&!t[7];
function apOn(k){return !!(typeof S!=='undefined'&&S&&S.ap&&S.ap[k])&&!S.tut&&!S.pvE&&!S.pvH;}
const apSelOf=()=>{const s=AZ.ap.sel[ERA]=AZ.ap.sel[ERA]||{};return s;};
function apPtsOf(sel){return APT.reduce((a,t)=>a+(sel&&sel[t[0]]?t[3]:0),0);}
// multiplicador de puntuación y nivel neto (para la selección o para la partida en curso)
function azScoreM(amz,ap){const tp=azPtsOf(amz||{}),pp=apPtsOf(ap||{});let m=1+.1*tp-.1*pp;
 for(const k in AZX)if((amz||{})[k]>=AZX[k])m*=1.25;for(const t of APT)if(ap&&ap[t[0]]&&t[4])m*=.8;return Math.max(.5,m);}
function azNetOf(amz,ap){return Math.max(0,azPtsOf(amz||{})-apPtsOf(ap||{}));}
function apNetRun(){return typeof S!=='undefined'&&S?azNetOf(S.amz,S.ap):0;}
function azMultT(m){return '×'+(Math.round(m*100)/100).toFixed(2).replace(/0$/,'').replace('.',',');}
// ---- al empezar: los apoyos elegidos (solo si la era tiene las Amenazas y están desbloqueados) ----
{const _ch=chooseHero;chooseHero=function(id){try{if(typeof S!=='undefined'&&S&&!S.tut&&!S.ap){const sel=apSelOf();S.ap={};if(azEraDone(ERA))for(const t of APT)if(sel[t[0]]&&apReady(t))S.ap[t[0]]=1;}}catch(e){}
 const r=_ch.apply(this,arguments);try{if(S&&S.ap&&!S.apIni){S.apIni=1;
  if(S.ap.bi)S.gold+=150;if(S.ap.mf)S.hp+=5;
  if(S.ap.ba){const k=freeSlot();if(k)S.chests[k]=1;
   const used=new Set(Object.values(S.evts||{})),pool=shuf(Object.keys(EVENTS).filter(k=>evEraOk(k)&&!evLocked(k)&&!used.has(k)));
   const c=Math.floor(BN/2),cand=[];for(let by=0;by<BN;by++)for(let bx=0;bx<BN;bx++){const q=bx+','+by;if(S.blocks[q]||S.chests[q]||(S.evts&&S.evts[q])||(bx===c&&by===c))continue;cand.push(q);}
   if(pool.length&&cand.length){S.evts=S.evts||{};S.evts[shuf(cand)[0]]=pool[0];}}
  ui();}}catch(e){console.warn(e);}return r;};}
{const _sg=startGame;startGame=function(){const r=_sg.apply(this,arguments);try{if(S){S.ap=null;S.apIni=0;}}catch(e){}return r;};}
// ---- efectos ----
// Refuerzos rápidos y Héroe incansable
{const _ud=unitDeath;unitDeath=function(t,s){const r=_ud.apply(this,arguments);try{if(s&&s.rt>0&&s.rt<1e8){if(s.H&&apOn('hi'))s.rt*=.5;else if(!s.H&&t&&!t.hero&&apOn('rr'))s.rt*=.5;}}catch(e){}return r;};}
// Aprendices (Nv 4: especialización y habilidades)
{const _tc=tCost;tCost=function(t,c){const v=_tc.apply(this,arguments);if(v>0&&t&&t.lvl>=3&&apOn('apr'))return Math.round(v*.8);return v;};}
// Primera piedra: la primera torre de cada ronda, gratis
{const _b=build;build=function(fx,fy){const n0=S?S.list.length:0,g0=S?S.gold:0;const r=_b.apply(this,arguments);try{if(apOn('pp')&&S.list.length>n0&&S.ppR!==S.round){const t=S.list[S.list.length-1],paid=g0-S.gold;
 if(paid>0&&!t.hero){S.gold+=paid;S.st.spent=Math.max(0,(S.st.spent||0)-paid);t.inv=0;t.undo=0;S.ppR=S.round;try{toast('<b>Primera piedra</b><br><small>Esta torre te sale gratis.</small>');}catch(e){}ui();}}}catch(e){}return r;};}
// Ascenso gratuito: al empezar cada oleada, una torre de Nv 1 sube a Nv 2
{const _sw=startWave;startWave=function(){const was=S&&S.phase;const r=_sw.apply(this,arguments);try{if(apOn('ag')&&was!=='wave'&&S.phase==='wave'){
 const L=S.list.filter(t=>t.lvl===1&&!t.hero&&!t.summ&&TW[t.type]&&!TW[t.type].uniq&&!(t.holo>0));if(L.length){const t=L[Math.floor(Math.random()*L.length)],c=tCost(t,upCost(TW[t.type],2));
  S.gold+=c;const sp=S.st.spent;upgrade(t);if(t.lvl===2){S.st.spent=sp;try{toast('<b>Ascenso gratuito</b><br><small>'+TW[t.type].n+' sube a Nv 2.</small>');}catch(e){}}else S.gold-=c;}}}catch(e){console.warn(e);}return r;};}
// Tirada de la ronda: una tirada gratis por ronda (piezas, torres o reliquias); no se acumula
function apTirOk(){return apOn('tir')&&S.tirR!==S.round;}
// ---- puntuación: la de las amenazas pasa a contar también apoyos y extremos ----
// (la fila 'amz' la añade amenazas.js; aquí se rehace con el multiplicador completo)
{const _sc=scoreCalc;scoreCalc=function(){const r=_sc.apply(this,arguments);try{if(!S||!(S.amz||S.ap))return r;const i=r.rows.findIndex(x=>x[0]==='amz');if(i>=0){r.t-=r.rows[i][3];r.rows.splice(i,1);}
 const tp=azPtsOf(S.amz||{}),pp=apPtsOf(S.ap||{});if(!tp&&!pp)return r;const m=azScoreM(S.amz,S.ap),x=Math.round(r.t*(m-1));
 r.rows.push(['amz',pp?'Amenazas y apoyos':'Amenazas',`amenaza ${azNetOf(S.amz,S.ap)}${pp?' ('+tp+' − '+pp+')':''} · ${azMultT(m)}`,x]);r.t+=x;}catch(e){}return r;};}
// ---- desbloqueo de los apoyos al ganar ----
{const _eg=endGame;endGame=function(){const won=S&&S.phase==='won'&&!S.tut,tp=S?azPtsOf(S.amz||{}):0,net=apNetRun();const pre=APT.filter(apUn).map(t=>t[0]);const r=_eg.apply(this,arguments);try{
 if(won&&tp>0){AZ.apw=Math.max(AZ.apw==null?-1:AZ.apw,net);azSave();const nu=APT.filter(t=>apUn(t)&&!pre.includes(t[0])).map(t=>t[1]);
  if(nu.length)setTimeout(()=>{try{toast('Apoyos desbloqueados: <b>'+nu.join('</b>, <b>')+'</b>');}catch(e){}},2200);}}catch(e){}return r;};}
// ---- pantalla: doble página Apoyos | Amenazas ----
const APUI={sel:null};
const APIC=c=>`<span class="apdot" style="--c:${c}"></span>`;
const apRow=(t,sel)=>{const[id,n,,p,st]=t,on=!!sel[id],lk=!apUn(t);
 return `<div class="amzr apr${on?' on':''}${APUI.sel===id?' sel':''}${lk?' lk':''}" data-a="apsel" data-id="${id}"><span class="ai">${lk?AZLOCK:APIC(on?'#3a8a3a':'#cfe5c9')}</span><span><b>${lk?'???':n}</b>${!lk&&st?'<span class="tg ap">fuerte</span>':''}${!lk&&t[7]?'<span class="tg">próximamente</span>':''}</span><span class="pt ap">${on?'−'+p:''}</span></div>`;};
const apCond=u=>u==='w1'?'Gana una partida con alguna amenaza':'Gana una partida con amenaza '+u+' o más';
function apDet(){const t=APT.find(x=>x[0]===APUI.sel);if(!t)return '<div class="apdet ap"><p>Elige un apoyo para ver qué hace. Pulsa otra vez para activarlo o quitarlo.</p></div>';
 if(!apUn(t))return `<div class="apdet ap"><b>???</b><p>Para desbloquear: <b>${apCond(t[5])}</b></p></div>`;
 const on=!!apSelOf()[t[0]];return `<div class="apdet ap"><b>${t[1]} · −${t[3]}${t[4]?' · fuerte':''}</b><p>${t[6]}${t[4]?' <i>Además, ×0,8 a la puntuación.</i>':''}</p>${t[7]?'<p class="bknote">Llegará en una próxima versión.</p>':`<button class="gbtn apbt" data-a="aptog">${on?'Quitar':'Activar'}</button>`}</div>`;}
function azDetC(){const sel=AZ.sel[ERA]||{},t=AZT.find(x=>x[0]===AZUI.sel);if(!t)return '<div class="apdet az"><p>Elige una amenaza para ver sus rangos.</p></div>';
 if(!azUn(t)||t[4]==='fut')return `<div class="apdet az"><b>???</b><p>Para desbloquear: <b>${azCond(t[4])}</b></p></div>`;
 const r=sel[t[0]]||0,cur=t[3][Math.max(0,r-1)],nx=t[3][r],ex=AZX[t[0]];
 return `<div class="apdet az"><b>${t[1]} · ${r?'Rango '+r+' de '+t[3].length:'sin activar'}${r&&ex&&r>=ex?' · extremo':''}</b><p>${r?cur[1]:t[3][0][1]}${!r?'':nx&&r<azRk(t[0])?' <i>Siguiente: '+nx[1]+'</i>':''}</p>${t[5]?'<p class="bknote">Llegará en una próxima versión.</p>':`<span class="amzbtns sm"><button class="gbtn" data-a="azdec"${r?'':' disabled'}><span>−</span></button><button class="gbtn" data-a="azinc"${r<Math.min(t[3].length,azRk(t[0]))?'':' disabled'}><span>+</span></button></span>`}</div>`;}
const apTot=()=>{const a=AZ.sel[ERA]||{},p=apSelOf(),tp=azPtsOf(a),pp=apPtsOf(p),m=azScoreM(a,p);
 return `<span class="amztot"><span><small>Amenaza</small><b>${pp?tp+' − '+pp+' = ':''}${Math.max(0,tp-pp)}</b></span><span><small>Puntuación</small><b>${azMultT(m)}</b></span></span>`;};
{const _ap=azParts;azParts=function(){const P=_ap.apply(this,arguments);try{if(!apOk()||!azEraDone(ERA))return P;const sel=AZ.sel[ERA]||{},as=apSelOf();
 P.left=`<h3 class="aph ap">Apoyos</h3><div class="bksub">Hacen la partida más llevadera · restan amenaza y puntuación</div><div class="amzl apl">${APG.map(([g,n])=>{const L=APT.filter(x=>x[2]===g);return L.length?`<div class="amzg ap">${n}</div>`+L.map(x=>apRow(x,as)).join(''):'';}).join('')}</div>${apDet()}`;
 P.right=`<h3 class="aph az">Amenazas</h3><div class="bksub">Hacen la partida más difícil · suman amenaza y puntuación</div><div class="amzl apl">${AZG.map(([g,n])=>`<div class="amzg">${n}</div>`+AZT.filter(x=>x[2]===g).map(x=>azRow(x,sel)).join('')).join('')}</div>${azDetC()}`;
 P.key='amzap'+JSON.stringify(sel)+JSON.stringify(as)+AZUI.sel+APUI.sel;P.footR=`<span class="amzft">${apTot()}<button class="gbtn" data-a="azback">Continuar ›</button></span>`;P.after=()=>{apFit();setTimeout(apFit,150);setTimeout(apFit,450);};}catch(e){console.warn(e);}return P;};}
// cada lista llega justo hasta su detalle, que queda encima del pie del libro
const apFit=()=>setTimeout(()=>{try{if(document.body.classList.contains('mfs'))return;const F=document.querySelector('#comp [data-a="azback"]');if(!F)return;const ft=F.getBoundingClientRect().top;
 for(const L of document.querySelectorAll('#comp .apl')){const D=L.parentElement.querySelector('.apdet');if(!D)continue;const z=(L.getBoundingClientRect().height/(L.offsetHeight||1))||1,lt=L.getBoundingClientRect().top,dh=D.getBoundingClientRect().height;const h=ft-lt-dh-18;if(h>60)L.style.maxHeight=h/z+'px';}}catch(e){}},40);
document.addEventListener('click',ev=>{const b=ev.target.closest&&ev.target.closest('[data-a="apsel"],[data-a="aptog"]');if(!b)return;ev.stopPropagation();ev.preventDefault();try{sfx('page');}catch(_){}
 const sel=apSelOf();if(b.dataset.a==='apsel'){const id=b.dataset.id,t=APT.find(x=>x[0]===id);if(APUI.sel===id&&t&&apReady(t)){if(sel[id])delete sel[id];else sel[id]=1;azSave();}APUI.sel=id;}
 else{const t=APT.find(x=>x[0]===APUI.sel);if(t&&apReady(t)){if(sel[t[0]])delete sel[t[0]];else sel[t[0]]=1;azSave();}}lbRender();},true);
// el botón de la preparación y el resumen: «Apoyos / Amenazas», con el nivel neto y la puntuación
{const _pp=prepParts;prepParts=function(){const P=_pp.apply(this,arguments);try{if(apOk()&&azEraDone(ERA)&&LB.step!=='amz'){const a=AZ.sel[ERA]||{},p=apSelOf(),tp=azPtsOf(a),pp=apPtsOf(p),m=azScoreM(a,p);
 const fix=h=>String(h||'').replace(/<b>Amenazas<\/b>(<small>[^<]*<\/small>)?/,`<b>Apoyos / Amenazas</b><small>${pp?`<span class="apc">−${pp}</span> · `:''}${tp?`<span class="azc">+${tp}</span> · `:''}amenaza ${Math.max(0,tp-pp)} · puntuación ${azMultT(m)}</small>`);
 for(const k of ['left','right'])if(typeof P[k]==='string')P[k]=fix(P[k]);if(LB.step==='res'&&typeof P.right==='string'){const on=APT.filter(t=>p[t[0]]&&apReady(t));if(on.length)P.right+=`<h3 class="aph ap" style="margin-top:10px">Apoyos</h3><div class="amzl" style="margin-top:6px">${on.map(t=>apRow(t,p)).join('')}</div>`;
  P.right=P.right.replace(/\d+ puntos de amenaza · puntuación ×[\d,]+/,`amenaza ${Math.max(0,tp-pp)} · puntuación ${azMultT(m)}`);}}}catch(e){}return P;};}
window.addEventListener('resize',()=>{if(typeof LB!=='undefined'&&LB.open&&LB.step==='amz')apFit();});
setInterval(()=>{try{if(typeof LB!=='undefined'&&LB.open&&LB.area==='prep'&&LB.step==='amz'&&document.querySelector('#comp .apl'))apFit();}catch(e){}},500);
