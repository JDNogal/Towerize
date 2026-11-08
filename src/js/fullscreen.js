// ---- pantalla completa (solo con un toque del jugador; en iPhone no existe) ----
const FSEL=document.documentElement,FSOK=!!(FSEL.requestFullscreen||FSEL.webkitRequestFullscreen),TOUCH=!!(window.matchMedia&&matchMedia('(pointer:coarse)').matches);
const isFS=()=>!!(document.fullscreenElement||document.webkitFullscreenElement);
function enterFS(){if(!FSOK||isFS())return;try{const r=(FSEL.requestFullscreen||FSEL.webkitRequestFullscreen).call(FSEL,{navigationUI:'hide'});
 const lock=()=>{try{const o=screen.orientation;if(o&&o.lock)o.lock('landscape').catch(()=>{});}catch(e){}};if(r&&r.then)r.then(lock).catch(()=>{});else lock();}catch(e){}}
function exitFS(){try{(document.exitFullscreen||document.webkitExitFullscreen).call(document);}catch(e){}}
function toggleFS(){if(isFS())exitFS();else enterFS();}
function fsMark(){const b=$('fsb');if(!b)return;b.style.display=FSOK?'':'none';b.classList.toggle('on',isFS());b.title=isFS()?'Salir de pantalla completa':'Pantalla completa';}
document.addEventListener('fullscreenchange',fsMark);document.addEventListener('webkitfullscreenchange',fsMark);
let RUNL=15;try{RUNL=Math.min(30,Math.max(15,+localStorage.getItem('rt-runl')||15));}catch(e){}
const rMax=()=>UNLOCK_ALL||OPT.u_rd?30:RUNL;
let MR=15;try{MR=Math.min(rMax(),Math.max(15,+localStorage.getItem('rt-rounds')||15));}catch(e){}
function renderSetup(){LB.step='rounds';lbOpen('prep');}
function renderSetupOld(){
 $('msetup').innerHTML='<h3>Nueva partida</h3><div class="rsel"><button data-a="rnd" data-v="-1">−</button><div><b id="rnum"></b><br><small>rondas</small></div><button data-a="rnd" data-v="1">+</button></div>'+
  '<input type="range" id="rrange" min="15" max="'+rMax()+'" step="1"'+(rMax()<=15?' disabled':'')+'><div class="rinfo" id="rinfo"></div><button class="go" data-a="begin">Empezar</button><button data-a="mback">Volver</button>';updSetup();}
function updSetup(){const n=MR,m=mapFor(n);if(!$('rnum'))return;$('rnum').textContent=n;$('rrange').value=n;
 $('rinfo').innerHTML=`Mapa de ${m}×${m} piezas · ${chestsFor(n)} cofres<br>${n===15?'Jefe en la ronda 15':'Jefes en las rondas 15 y '+n}${n===30?'<br>La ronda 30 esconde algo peor que el jefe…':''}${rMax()<30?'<br>🔒 Gana una partida de '+rMax()+' rondas para desbloquear partidas de hasta '+(rMax()+5)+'.':''}`;}
function setRounds(n){MR=Math.min(rMax(),Math.max(15,n));try{localStorage.setItem('rt-rounds',MR);}catch(e){}updSetup();}

