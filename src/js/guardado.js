// ======================= GUARDAR PARTIDA =======================
// Una sola partida guardada, en IndexedDB (admite la copia completa del estado, igual que «Reintentar oleada»).
// Se guarda: al empezar cada oleada (el estado justo antes), al terminar cada ronda, en cada acción de la fase de
// construcción (con retardo), al pulsar «Guardar y salir» y al cerrar la página. Al ganar o perder, se borra.
// En localStorage queda un resumen (rt-save) para pintar «Continuar partida» en la portada sin esperar a la base de datos.
const SAVE_FMT=1;                      // formato del guardado: si cambia, las partidas antiguas no se cargan (se avisa)
const SAV={meta:null,t:0,busy:false,db:null};
try{SAV.meta=JSON.parse(localStorage.getItem('rt-save'))||null;}catch(e){}
// guardados viejos de un tutorial ya terminado (antes no se borraban al acabarlo): fuera
try{const m=SAV.meta;if(m&&m.tut&&m.round>=m.rounds&&localStorage.getItem('rt-tutdone')){SAV.meta=null;localStorage.removeItem('rt-save');setTimeout(()=>{try{svDel().catch(()=>{});}catch(e){}},0);}}catch(e){}
const svOk=()=>typeof indexedDB!=='undefined';
function svDB(){return new Promise((res,rej)=>{if(SAV.db)return res(SAV.db);const r=indexedDB.open('towerize',1);r.onupgradeneeded=()=>{r.result.createObjectStore('save');};r.onsuccess=()=>{SAV.db=r.result;res(SAV.db);};r.onerror=()=>rej(r.error);});}
function svPut(rec){return svDB().then(db=>new Promise((res,rej)=>{const tx=db.transaction('save','readwrite');tx.objectStore('save').put(rec,'run');tx.oncomplete=()=>res();tx.onerror=()=>rej(tx.error);}));}
function svGet(){return svDB().then(db=>new Promise((res,rej)=>{const tx=db.transaction('save','readonly'),q=tx.objectStore('save').get('run');q.onsuccess=()=>res(q.result||null);q.onerror=()=>rej(q.error);}));}
function svDel(){return svDB().then(db=>new Promise((res,rej)=>{const tx=db.transaction('save','readwrite');tx.objectStore('save').delete('run');tx.oncomplete=()=>res();tx.onerror=()=>rej(tx.error);}));}
const svMeta=m=>{SAV.meta=m;try{if(m)localStorage.setItem('rt-save',JSON.stringify(m));else localStorage.removeItem('rt-save');}catch(e){}};
// ¿hay una partida en marcha que merezca guardarse?
const svLive=()=>!!(S&&S.hero&&S.round>=1&&S.phase!=='won'&&S.phase!=='lost'&&!document.body.classList.contains('inmenu')&&!PREVIEWING);
// el estado que vive fuera de S y hace falta para reanudar
function svGlobals(){return {ROUNDS,CHESTS,MR,BN,CAM:{x:CAM.x,y:CAM.y,z:CAM.z},GT:{r:GT.r,c:GT.c},TUTON,TUTR,TUTHS:{...TUTHS},
 RL:{open:!!RL.open,choices:(RL.choices||[]).slice(),towo:RL.towo?RL.towo.slice():null,towP:RL.towP||0,towT:RL.towT||null,towD:RL.towD||null,towNS:RL.towNS||0,ev:RL.ev||null,peek:false},EVK:EVK||null};}
// construye el registro a guardar a partir de un estado (S o su copia de inicio de oleada)
function svRecord(st,why){let copy;const snap=st.snap,dn=st.dn;st.snap=null;st.dn=[];try{copy=structuredClone(st);}finally{st.snap=snap;st.dn=dn;}
 copy.selT=null;copy.aim=null;copy.aimT=null;copy.tsel=null;copy.hover=null;copy.msg='';copy.mask=0;copy.rask=0;copy.pexp=false;copy.speed=copy.speed||1;
 const g=svGlobals();if(why==='wave'){g.RL={open:false,choices:[],towo:null,towT:null,towD:null,towNS:0,ev:null,peek:false};g.EVK=null;}
 const H=HEROES[copy.hero.id];
 return {v:SAVE_FMT,game:($('ver')&&$('ver').textContent)||'',t:Date.now(),why,S:copy,g,meta:{round:Math.min(copy.round,ROUNDS),rounds:ROUNDS,hero:copy.hero.id,heroN:H?H.n:'',heroIc:H?H.ic:'',tut:!!copy.tut,t:Date.now(),why}};}
// guardar ahora. why: 'wave' (inicio de oleada: se guarda la copia S.snap) · 'round' (fin de ronda) · 'build' (acción en construcción) · 'exit' (guardar y salir)
function saveRun(why){if(!svOk()||!svLive())return Promise.resolve(false);
 let st=S;if(S.phase==='wave'){if(!S.snap)return Promise.resolve(false);st=S.snap;why=why==='exit'?'exit':'wave';}
 let rec;try{rec=svRecord(st,why);}catch(e){console.warn('guardado',e);return Promise.resolve(false);}
 SAV.t=Date.now();svMeta(rec.meta);return svPut(rec).then(()=>true).catch(e=>{console.warn('guardado',e);return false;});}
// con retardo, para las acciones de la fase de construcción (cada ui() de la partida llama aquí)
function saveSoon(){if(!svOk()||!svLive()||S.phase==='wave')return;clearTimeout(SAV.tm);SAV.tm=setTimeout(()=>saveRun('build'),400);}
function saveClear(){clearTimeout(SAV.tm);svMeta(null);if(svOk())svDel().catch(()=>{});}
// reanudar: deja el juego exactamente como estaba (o al principio de la oleada si se guardó en plena oleada)
function loadRun(rec){if(!rec||rec.v!==SAVE_FMT||!rec.S||!rec.g){toast('⚠️ La partida guardada es de una versión anterior y no se puede continuar.');saveClear();return false;}
 const g=rec.g;TUTON=!!g.TUTON;TUTR=g.TUTR||0;TUTHS=g.TUTHS||{};MR=g.MR||MR;ROUNDS=g.ROUNDS;CHESTS=g.CHESTS;setSize(g.BN);
 closePrim();closeFocus();lbClose(false,true);$('menu').classList.remove('setup');document.body.classList.remove('inmenu');$('endscr').classList.remove('open');
 S=rec.S;if(S.hero){S.hero.def=HEROES[S.hero.id]||S.hero.def;}S.snap=null;S.dn=S.dn||[];S.selT=null;S.aim=null;S.tsel=null;S.msg='';
 CAM.x=g.CAM.x;CAM.y=g.CAM.y;CAM.z=g.CAM.z;clampCam();GT.r=g.GT.r||0;GT.c=g.GT.c||0;
 RL.open=false;RL.hpick=false;RL.choices=g.RL.choices||[];RL.towo=g.RL.towo||null;RL.towT=g.RL.towT||null;RL.towD=g.RL.towD||null;RL.towNS=g.RL.towNS||0;RL.towP=g.RL.towP||0;RL.ev=g.RL.ev||null;EVK=g.EVK||null;
 $('relic').classList.remove('open');renderRelics();ui();
 // ventanas que estaban abiertas al guardar (cofre, evento, oferta de torres)
 if(g.RL.open){if(RL.ev&&EVENTS[RL.ev])openEvent(RL.ev,EVK);else if(RL.towo&&RL.towo.length)renderTowerOffer();else if(RL.choices.length)renderRelicPick();}
 if(TOUCH&&OPT.fs)enterFS();fsMark();
 S.msg=rec.why==='wave'||rec.why==='exit'&&rec.S.phase!=='wave'?'':S.msg;
 toast('💾 Partida reanudada · ronda '+Math.min(S.round,ROUNDS)+'/'+ROUNDS+(rec.why==='wave'?' · al principio de la oleada':''));
 return true;}
function continueRun(){if(!svOk()||!SAV.meta)return;svGet().then(rec=>{if(!rec){saveClear();lbRender();return;}if(loadRun(rec)){try{sfx('page');}catch(e){}}}).catch(e=>{console.warn('cargar',e);toast('⚠️ No se ha podido leer la partida guardada.');});}
// guardar y salir (desde la pausa): en plena oleada se guarda el inicio de la oleada
function saveAndExit(){const p=saveRun('exit');Promise.resolve(p).then(()=>{closePause(false);showMenu();});}
// cerrar la página sin guardar: se guarda igual, con la misma regla
addEventListener('pagehide',()=>{try{if(svLive())saveRun('exit');}catch(e){}});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'){try{if(svLive())saveRun('exit');}catch(e){}}});
// ganchos: inicio de oleada, fin de ronda, acciones de construcción, final de partida
{const _sw=startWave;startWave=function(...a){const r=_sw.apply(this,a);try{if(S.phase==='wave'&&S.snap)saveRun('wave');}catch(e){}return r;};
 const _nr=nextRound;nextRound=function(...a){const r=_nr.apply(this,a);try{if(svLive())saveRun('round');}catch(e){}return r;};
 const _ui=ui;ui=function(...a){const r=_ui.apply(this,a);try{saveSoon();}catch(e){}return r;};
 const _eg=endGame;endGame=function(...a){try{saveClear();}catch(e){}return _eg.apply(this,a);};
 /* acabar el tutorial también es acabar la partida: se borra el guardado (si no, la portada ofrecía «Continuar» la ronda 10) */
 const _te=tutEnd;tutEnd=function(...a){try{saveClear();}catch(e){}return _te.apply(this,a);};}
// la fecha del guardado, para la portada
const svWhen=t=>{const d=new Date(t),now=new Date(),same=d.toDateString()===now.toDateString();const hm=String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');return same?'hoy a las '+hm:String(d.getDate()).padStart(2,'0')+'/'+String(d.getMonth()+1).padStart(2,'0')+' '+hm;};
