// ======================= EL LIBRO: portada (pausa y menú principal) y áreas =======================
// Un único libro para todos los menús. Cerrado es la portada (en partida, la pausa; fuera, el menú principal).
// Abierto: arriba, los marcapáginas de la sección en la que estás; a la derecha, las cintas de las áreas.
// Áreas: cp compendio · lg logros · st estadísticas (solo en partida) · op opciones · hp ayuda · cr créditos
const LB={open:false,cover:false,area:'cp',hp:'play',op:null,note:'',lastK:''};
const LBAREAS=[['cp','Compendio','📖'],['lg','Logros','🏆'],['st','Estadísticas','📊'],['op','Opciones','⚙️'],['hp','Ayuda','❓'],['cr','Créditos','📜']];
const lbInGame=()=>!document.body.classList.contains('inmenu')&&!!(S&&S.list);
const lbAreas=()=>LBAREAS.filter(([k])=>k!=='st'||lbInGame());
const lbMob=()=>TOUCH||bkNarrow();
function lbOpen(area,cover){
 const was=LB.open&&LB.cover;
 LB.open=true;LB.cover=!!cover;if(area)LB.area=area;if(!LB.cover)LB.anim=was;
 closePrim();HV.key=null;HV.t=0;if(document.body.classList.contains('inmenu')){if(typeof closeQuick==='function')closeQuick();$('menu').classList.remove('setup');}
 if(lbInGame()&&!PMU.open){PMU.open=true;PMU.spd=S.speed>0?S.speed:(S.lspd||1);S.speed=0;}
 if(!LB.cover&&LB.area==='op')OP.keepS=0;
 lbRender();if(typeof ui==='function'&&S)ui();
}
function lbClose(resume){
 if(!LB.open){CP.open=false;OP.open=false;return;}
 LB.open=false;LB.cover=false;CP.open=false;OP.open=false;CP.prev=null;PV=null;CP.eprev=null;PE=null;CP.hprev=null;PHV=null;
 const el=$('comp');el.classList.remove('open');el.innerHTML='';
 if(PMU.open){PMU.open=false;if(resume!==false&&S)S.speed=PMU.spd||1;}
 if(typeof ui==='function'&&S)ui();
}
// volver a la portada (X, Esc o clic fuera). Fuera de partida la portada es el menú principal
function lbBack(){if(!LB.open)return;CP.prev=null;PV=null;CP.eprev=null;PE=null;CP.hprev=null;PHV=null;CP.pageR=false;PMU.ask=0;lbOpen(null,true);}
const lbMarks=(list,cur,act)=>list.length<2?'':`<div class="bkmarks">${kcOn()?'<span class="kcap bkq">Q</span>':''}${list.map(([v,l,i])=>`<button class="bkmk${v===cur?' on':''}" data-a="${act}" data-v="${v}" title="${l}">${i}<span class="bkml">${l}</span></button>`).join('')}${kcOn()?'<span class="kcap bkq">E</span>':''}</div>`;
const lbRibs=()=>`<div class="bkribs">${lbAreas().map(([k,l,i])=>`<button class="bkrib${k===LB.area&&!LB.cover?' on':''}${k==='cp'&&!compOk()?' lk':''}" data-a="lbarea" data-v="${k}" title="${l}">${i}<span>${l}</span></button>`).join('')}</div>`;
function lbCoverHTML(){
 const inG=lbInGame(),B=lbMob(),H=inG&&S.hero?HEROES[S.hero.id]:null;
 const chips=inG?[`⏳ Ronda ${Math.min(S.round,ROUNDS)}/${ROUNDS}`,`❤️ ${S.hp}`,`🪙 ${Math.floor(S.gold)}`,H?`${H.ic} ${H.n} · Nv ${S.hero.lvl}`:'',`🕒 ${fClk(GT.r)}`].filter(Boolean).map(x=>`<span>${x}</span>`).join(''):'';
 const main=inG?`<button class="lbmain" data-a="lbcont">▶ Continuar</button>`:`<button class="lbmain" data-a="newgame">▶ Nueva partida</button>`;
 const areas=lbAreas();
 const tiles=`<div class="lbtiles">${areas.map(([k,l,i])=>`<button data-a="lbarea" data-v="${k}"${k==='cp'&&!compOk()?' class="dim"':''}><em>${i}</em>${l}</button>`).join('')}${FSOK&&B?`<button data-a="pfs"><em>⛶</em>${isFS()?'Salir de pantalla completa':'Pantalla completa'}</button>`:''}</div>`;
 const rt=inG&&S.phase==='wave'&&S.snap&&S.rc>0;
 const bot=inG?`<div class="lbbot">${rt?`<button data-a="pretry">↺ Reintentar oleada <small>· ${S.rc} carga${S.rc===1?'':'s'}</small></button>`:''}<button data-a="pquit" class="pquit">${PMU.ask?'¿Seguro? Pulsa otra vez para abandonar':'🏳 Abandonar partida'}</button></div>`:'';
 return `<div class="lbcv ${B?'b':'a'}${inG?' ing':''}"><div class="lbcvin"><div class="lbtit"><b>Towerize</b><span class="lbsub">${inG?'Pausa':'Expande. Mejora. Resiste.'}</span></div><div class="lbemb">${H?`<span class="lbpor">${portrait(S.hero.id,1)}</span>`:'🏰'}</div>${chips?`<div class="lbchips">${chips}</div>`:''}${main}${B?tiles:''}${bot}${inG?`<button class="bkx lbcx" data-a="lbcont" title="Continuar">✕</button>`:''}</div>${B?'':`<div class="lbribs">${areas.map(([k,l,i])=>`<button class="bkrib${k==='cp'&&!compOk()?' lk':''}" data-a="lbarea" data-v="${k}" title="${l}">${i}<span>${l}</span></button>`).join('')}</div>`}</div>`;
}
// ---- estadísticas: tabla a la izquierda, cifras grandes y resumen a la derecha ----
function statParts(){const T=STABS.find(t=>t[0]===STW.tab)||STABS[0],st=S.st||{};
 let h=statsHTML(STW.tab),kp='';const m=h.match(/^<div class="kp">[\s\S]*?<\/div><\/div>/);if(m){kp=m[0];h=h.slice(m[0].length);}
 const K=(b,s)=>`<div><b>${b}</b><small>${s}</small></div>`;
 if(!kp){
  if(STW.tab==='dmg'){const all=(st.all||[]).slice(),H=S.hero;let top=null,tv=0;for(const t of all)if((t.dmgT||0)>tv){tv=t.dmgT;top=tinfo(t).ic+' '+tinfo(t).n;}if(H&&(H.pt.dmgT||0)>tv){tv=H.pt.dmgT;top=H.def.ic+' '+H.def.n;}
   kp=`<div class="kp">${K(`<span class="cd">${fi(st.dmg||0)}</span>`,'Daño total')}${K(fi(st.kills||0),'Enemigos eliminados')}${K(top||'—','Quien más daño ha hecho')}${K(st.dmg>0&&tv?Math.round(tv/st.dmg*100)+'%':'—','Su parte del total')}</div>`;}
  else if(STW.tab==='rel')kp=`<div class="kp">${K((S.relics||[]).length,'Reliquias')}${K(`<span class="gd">${fi(st.gRel||0)} 🪙</span>`,'Oro generado por reliquias')}</div>`;
  else if(STW.tab==='en'){const ek=st.ek||{},ks=Object.keys(ek),sum=f=>ks.reduce((a,k)=>a+(ek[k][f]||0),0);kp=`<div class="kp">${K(fi(sum('k')),'Eliminados')}${K(`<span class="${sum('l')?'cd':''}">${fi(sum('l'))}</span>`,'Llegaron al núcleo')}${K(ks.length,'Tipos distintos')}${K(`<span class="gd">${fi(sum('g'))} 🪙</span>`,'Oro que dieron')}</div>`;}}
 const marks={list:STABS.map(([v,l,i])=>[v,l,i]),cur:STW.tab,act:'stab'};
 const left=`<h3>Estadísticas</h3><div class="bksub">${T[2]} ${T[1]} · ronda ${Math.min(S.round,ROUNDS)}/${ROUNDS}, se actualiza con cada oleada</div><div class="lbstats">${h}</div>`;
 const right=`<div class="lbdet lbkp">${kp}</div>`;
 return {marks,left,right,one:true,key:'st'+STW.tab};
}
// ---- ayuda: secciones a dos páginas, con las teclas que tenga configuradas el jugador ----
const LBHELP=[['play','Cómo se juega','🎮'],['keys','Controles y atajos','⌨️'],['tips','Consejos rápidos','💡'],['tut','Tutoriales','🎓'],['hints','Pistas','🔔']];
const lbK=t=>`<span class="kcap lbk">${t}</span>`;
function helpParts(){
 if(!LBHELP.some(([k])=>k===LB.hp))LB.hp='play';const sec=LBHELP.find(([k])=>k===LB.hp),inG=lbInGame();let h='';
 if(LB.hp==='play')h=QSL.filter(q=>!q.mock).map(q=>`<h4>${q.t}</h4><p>${q.d}</p>`).join('')+`<h4>Ganar</h4><p>Resiste todas las rondas y derrota al jefe final. Entre partidas conservas los logros, lo que has descubierto en el compendio y los desbloqueos.</p>`;
 else if(LB.hp==='keys'){
  if(TOUCH)h=`<h4>Táctil</h4><table class="lbkeys txt">${[['Mover el mapa','Arrastrar con un dedo'],['Acercar / alejar','Pellizcar o los botones ＋ / －'],['Ver información','Botón de lupa 🔍 y tocar lo que quieras'],['Construir','Tocar un solar libre: 1.er toque en una torre, su tarjeta; 2.º toque, se construye'],['Marcar una compra 🔖','Mantener pulsado lo que aún no puedas pagar'],['Mejorar o vender','Tocar la torre: salen sus botones alrededor'],['Mover al héroe','Tocar su retrato (o al héroe en el mapa) y luego una casilla del camino'],['Empezar la oleada','Doble toque en el botón'],['Pausa','Botón ☰']].map(([a,b])=>`<tr><td>${a}</td><td>${b}</td></tr>`).join('')}</table>`;
  else{h=`<h4>Ratón</h4><table class="lbkeys txt">${[['Mover el mapa','Arrastrar (clic izquierdo, derecho o rueda); en trackpad, con dos dedos'],['Acercar / alejar','Rueda o pellizcar'],['Ver información','Dejar el ratón encima'],['Construir','Clic en un solar libre: 1.er clic en una torre, su tarjeta; 2.º clic, se construye'],['Marcar una compra 🔖','Clic derecho en lo que aún no puedas pagar'],['Mejorar o vender','Clic en la torre: salen sus botones alrededor']].map(([a,b])=>`<tr><td>${a}</td><td>${b}</td></tr>`).join('')}</table>`;
   h+=KBL.map(([g,rows])=>`<h4>${g}</h4><table class="lbkeys">${rows.map(([a,l])=>`<tr><td>${l}</td><td>${lbK(kbN(a))}${KB2[a]?' <i>o</i> '+lbK(kbN(a,1)):''}</td></tr>`).join('')}</table>`).join('');
   h+=`<h4>Fijas</h4><table class="lbkeys">${KBFIX.map(([k,l])=>`<tr><td>${l}</td><td>${lbK(k)}</td></tr>`).join('')}</table>`;
   h+=`<p class="lbnote">Las teclas de arriba son las que tienes configuradas. <button class="bklink" data-a="lbgo" data-v="op:kb">Cambiarlas en Opciones → Atajos</button></p>`;}}
 else if(LB.hp==='tips'){const T=TOUCH;h=[
  ['🔖','Compra marcada',`${T?'Mantén pulsada':'Haz clic derecho en'} una torre o mejora que aún no puedas pagar: se marca con 🔖 y se compra sola en cuanto tengas oro, también en plena oleada.`],
  ['🗼','El anillo de construcción',`Al ${T?'tocar':'pulsar'} un solar libre salen las torres de tu mazo alrededor. El primer toque en una torre muestra su tarjeta; el segundo la construye.${T?'':' Con el solar abierto, las teclas 1–7 construyen directamente.'}`],
  ['↶','Deshacer una construcción','Si te arrepientes de una torre que has puesto en esta misma fase, su botón de vender pasa a ser ↶ y recuperas todo lo que pagaste.'],
  ['🦸','El héroe también se mueve en la oleada',`${T?'Toca':'Pulsa'} su retrato o al propio héroe en el mapa y elige una casilla del camino. Bloquea a los enemigos que le llegan.`],
  ['⚔️','Empezar la oleada sin sustos',`El botón pide ${T?'doble toque':'doble clic'} para que no la empieces sin querer${T?'':'; con la tecla '+lbK(kbN('wave'))+' basta una pulsación'}.`],
  ['🔦','Portales','Cada extremo libre del camino es un portal. Al pasar el ratón por uno (o con la lupa) ves qué escuadras van a salir y cuántas quedan.'],
  ['🧩','Sin callejones','Si al camino le queda poco sitio, se te ofrecen gratis piezas con bifurcación para que no se cierre.'],
  T?null:['⌨️','Menús con teclado',`${lbK(kbN('nu'))}${lbK(kbN('nl'))}${lbK(kbN('nd'))}${lbK(kbN('nr'))} o las flechas mueven el marco por los menús; ${lbK('Intro')} o ${lbK('Espacio')} pulsan; ${lbK('Q')} / ${lbK('E')} cambian de marcapáginas; ${lbK('Esc')} vuelve.`]
  ].filter(Boolean).map(([i,t,d])=>`<h4><span class="lbti">${i}</span>${t}</h4><p>${d}</p>`).join('');}
 else if(LB.hp==='tut'){
  h=inG?`<p>Los tutoriales se empiezan desde el menú principal, porque abren una partida nueva.</p>`:`<div class="lbtut"><button class="lbbig" data-a="tutfull"><b>🎓 Tutorial completo</b><small>Unas 10 rondas guiadas: aprende jugando, paso a paso. Al completarlo desbloqueas a Radagast.</small></button><button class="lbbig" data-a="tutquick"><b>⚡ Tutorial rápido</b><small>Un repaso de unos 2 minutos con imágenes animadas. Las pistas te explican el resto sobre la marcha.</small></button></div>`;
  h+=`<p class="lbnote">Puedes repetirlos las veces que quieras.</p>`;}
 else if(LB.hp==='hints')h=`<p>La primera vez que pasa algo nuevo (un enemigo con armadura, un cofre, una reliquia…) una pista corta te lo explica. Si sale en plena oleada, el juego frena un poco hasta que la cierras. Cada pista sale una sola vez.</p><div class="lbtut"><button class="lbbig" data-a="htog"><b>💡 Pistas: ${OPT.hints?'activadas':'desactivadas'}</b><small>${OPT.hints?'Pulsa para desactivarlas.':'Pulsa para volver a activarlas.'}</small></button><button class="lbbig" data-a="hreset"><b>♻️ Restablecer pistas</b><small>Vuelven a salir todas desde el principio.</small></button></div>${LB.note?`<p class="lbnote lbok">✓ ${LB.note}</p>`:''}`;
 const marks={list:LBHELP.map(([k,l,i])=>[k,l,i]),cur:LB.hp,act:'lbhp'};
 return {marks,spread:`<h3>${sec[2]} ${sec[1]}</h3><div class="bksub">Ayuda</div><div class="lbcols">${h}</div>`,key:'hp'+LB.hp};
}
// ---- créditos ----
function credParts(){const ver=($('ver')&&$('ver').textContent)||'Towerize';
 return {marks:null,left:`<h3>Créditos</h3><div class="bksub">Quienes han hecho posible Towerize</div>${credHTML()}`,right:`<div class="lbdet"><span class="lbdic">🏰</span><h4>${ver}</h4><p>Gracias por jugar. Towerize está en desarrollo: lo que ves puede cambiar de una versión a otra.</p></div>`,one:true,key:'cr'};
}
// ---- montaje ----
function lbRender(){
 const el=$('comp');if(!LB.open){el.classList.remove('open');return;}
 el.classList.add('bkm','open');el.classList.toggle('lbtouch',!!TOUCH);const nar=bkNarrow();el.classList.toggle('narrow',nar);el.classList.toggle('lbcv0',LB.cover);
 if(LB.cover){CP.open=false;OP.open=false;el.innerHTML=lbCoverHTML();return;}
 if(LB.area==='st'&&!lbInGame())LB.area='cp';
 if(LB.area==='lg')CP.tab='lg';else if(LB.area==='cp'&&CP.tab==='lg')CP.tab=compOk()?'tw':'lg';
 if(LB.area==='cp'&&CP.tab==='lg')LB.area='lg';
 CP.open=LB.area==='cp'||LB.area==='lg';OP.open=LB.area==='op';
 const P=CP.open?compParts():LB.area==='op'?optParts():LB.area==='st'?statParts():LB.area==='hp'?helpParts():credParts();
 const marks=P.marks?lbMarks(P.marks.list,P.marks.cur,P.marks.act):'';
 const sl=el.querySelector('.bkp.l,.bkp.spread'),st=sl?sl.scrollTop:0,same=LB.lastK===LB.area+'|'+P.key;LB.lastK=LB.area+'|'+P.key;
 let pages;
 if(P.spread)pages=`<div class="bkp spread${P.flip?' flip':''}">${P.spread}</div>`;
 else if(nar&&P.one)pages=`<div class="bkp l one">${P.right}${P.left}</div>`;
 else if(nar){const showR=CP.pageR||P.pvm;pages=showR?`<div class="bkp r${P.flip?' flip':''}">${P.pvm?'':'<button class="bkback" data-a="cbkl">‹ Volver</button>'}${P.right}</div>`:`<div class="bkp l">${P.left}</div>`;}
 else pages=`<div class="bkp l">${P.left}</div><div class="bkp r${P.flip?' flip':''}">${P.right}</div>`;
 el.innerHTML=`<div class="bkw${LB.anim?' lbanim':''}">${marks}<div class="bk"><div class="bkcover"></div>${pages}${nar?'':lbRibs()}<button class="bkx" data-a="lbx" title="${lbInGame()?'Volver a la pausa':'Volver al menú'}">✕</button></div></div>`;
 LB.anim=false;
 const nl=el.querySelector('.bkp.l,.bkp.spread');if(nl&&same)nl.scrollTop=st;
 if(P.after)P.after(el);
}
// la página derecha de Opciones sigue a la opción señalada (ratón o marco del teclado), sin repintar todo el libro
function lbDetail(){const el=$('comp');if(!LB.open||LB.cover||LB.area!=='op')return;const r=el.querySelector('.bkp.r');if(!r)return;const o=LB.op!=null&&OPTS[LB.op]&&OPTS[LB.op].tab===OP.tab?OPTS[LB.op]:null;r.innerHTML=optDetail(o);}
function lbPoint(t){if(!LB.open||LB.cover||LB.area!=='op'||!t||!t.closest)return;const r=t.closest('[data-oi]');if(!r)return;const i=+r.dataset.oi;if(LB.op!==i){LB.op=i;lbDetail();}}
function lbFocus(b){lbPoint(b);}
$('comp').addEventListener('pointerover',e=>lbPoint(e.target),{passive:true});
$('comp').addEventListener('click',e=>lbPoint(e.target),true);
// en el menú principal, las pantallas de preparación (tutorial, era, rondas…) tapan el libro
new MutationObserver(()=>document.body.classList.toggle('lbsetup',$('menu').classList.contains('setup'))).observe($('menu'),{attributes:true,attributeFilter:['class']});
addEventListener('resize',()=>{if(LB.open)lbRender();});
