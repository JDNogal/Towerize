// ---- logros (de momento básicos) y torres que se desbloquean con ellos ----
const ACH={tut_m:{n:'Maestro del tutorial',d:'Completa el tutorial completo sin reintentos.',rl:'notebook'},tut_e:{n:'Experto en Tutoriales',d:'Completa el tutorial completo sin reintentos y sin que ningún enemigo llegue al núcleo (la vida que sacrificas tú no cuenta).'},chest:{n:'Abre un cofre',d:'Llega con tu camino a un cofre y ábrelo.',tw:'frost'},event:{n:'Entra en un evento',d:'Llega con tu camino a una casilla de evento.',tw:'poison'},
 
 elem:{n:'Equilibrio elemental',d:'Gana una partida con al menos una Salamandra y un Cryomago construidos al final.',hr:'yrsa'},
 pyro:{n:'Todo arde',d:'Mata a 100 enemigos quemados en una sola partida: cuenta cualquier enemigo que muera con stacks de quemadura, lo mate quien lo mate.',tw:'sala'}};
let ACHS={};try{ACHS=JSON.parse(localStorage.getItem('rt-ach'))||{};}catch(e){}
// fijados (máx. 3), mejores marcas históricas y torres consultadas (para Mente curiosa)
let PINS=[],ACHBEST={},CUR=[];try{PINS=JSON.parse(localStorage.getItem('rt-achpin'))||[];ACHBEST=JSON.parse(localStorage.getItem('rt-achbest'))||{};CUR=JSON.parse(localStorage.getItem('rt-cur'))||[];}catch(e){}
const savePins=()=>{try{localStorage.setItem('rt-achpin',JSON.stringify(PINS));}catch(e){}};
// logros que hablan de algo que quizá no has encontrado: se muestran como «logro oculto» hasta encontrarlo
const PIGS=['straw','wood','brick'],hUnl=id=>HEROES[id]&&!HEROES[id].lockTxt;
const ACHFND={pigs:()=>PIGS.some(k=>seen('tw',k)),cloink:()=>PIGS.some(k=>seen('tw',k)),dragon:()=>seen('tw','dragon'),faro:()=>seen('tw','faro'),party:()=>seen('tw','guild'),
 bowl:()=>hUnl('reinhart'),jungle:()=>hUnl('sylvana'),bhole:()=>hUnl('radagast'),pure:()=>hUnl('radagast'),zero:()=>hUnl('yrsa'),thermal:()=>hUnl('yrsa'),circuit:()=>seen('tw','tesla'),elem:()=>tunl('sala')&&tunl('frost')};
const achFound=id=>UNLOCK_ALL||!!ACHS[id]||!ACHFND[id]||ACHFND[id]();
const achReq=id=>ACH[id]?(achFound(id)?'🏆 '+ACH[id].n+': '+ACH[id].d:'🏆 Un logro oculto: sigue jugando para descubrirlo.'):'';
function lockToast(title,id){toast('🔒 <b>'+title+'</b>'+(id&&ACH[id]?'<br><small>'+achReq(id)+'</small>':''));}
const compOk=()=>UNLOCK_ALL||OPT.u_cp||OPT.u_cpa||!!ACHS.curious;
// niveles de torre vistos (sin spoilers): nivel más alto alcanzado con cada torre y especializaciones elegidas, entre partidas
let TLV={};try{TLV=JSON.parse(localStorage.getItem('rt-tlv'))||{};}catch(e){}
const tlvOk=(k,n)=>{if(UNLOCK_ALL||OPT.u_cp||n<=1||!TW[k]||TW[k].uniq)return true;const r=TLV[k]||{};if(n<=3)return (r.lv||1)>=n;const sp=Object.keys(SPECS[k]||{})[n-4];return !!(r.sp&&r.sp[sp]);};
setInterval(()=>{try{if(!S||!S.list||PREVIEWING||S.pvE||S.pvH||document.body.classList.contains('inmenu'))return;let ch=0;
 for(const t of S.list){if(!TW[t.type]||TW[t.type].uniq)continue;const r=TLV[t.type]=TLV[t.type]||{lv:1};const l=Math.min(t.lvl||1,4);if(l>r.lv){r.lv=l;ch=1;}if(t.spec&&!(r.sp&&r.sp[t.spec])){r.sp=r.sp||{};r.sp[t.spec]=1;ch=1;}}
 if(ch)localStorage.setItem('rt-tlv',JSON.stringify(TLV));}catch(e){}},1000);
function curSeen(k){if(ACHS.curious||!TW[k]||CUR.includes(k)||typeof S==='undefined'||!S||S.pvE)return;CUR.push(k);try{localStorage.setItem('rt-cur',JSON.stringify(CUR));}catch(e){}if(CUR.length>=3)achieve('curious');}
// logros secretos: se revelan al ver por primera vez lo que destriparían
let REV={};try{REV=JSON.parse(localStorage.getItem('rt-rev'))||{};}catch(e){}
function reveal(k){if(REV[k]||(typeof S!=='undefined'&&S&&S.pvE))return;REV[k]=1;try{localStorage.setItem('rt-rev',JSON.stringify(REV));}catch(e){}}
const MAXR=30,CLOINK=10;
Object.assign(ACH.chest,{n:'¿Qué hace este botón?',d:'Abre un cofre, elige una reliquia y usa su activa.'});
{const CAT={tut_m:'tu',tut_e:'tu',chest:'tu',event:'tu',elem:'hr',pyro:'st'};for(const k in CAT)ACH[k].c=CAT[k];}
Object.assign(ACH,{
 curious:{c:'tu',n:'Mente curiosa',d:'Consulta la ficha de 3 torres distintas.',ux:'el Compendio'},
 first:{c:'tu',n:'Primera victoria',d:'Gana una partida.',rl:'crystal'},
 sky:{c:'jg',n:'Cielos despejados',d:'Elimina 40 voladores en una sola partida.',rl:'harpoon'},
 hunt:{c:'jg',n:'Gran cacería',d:'Elimina 10 élites o mini-élites en una sola partida.',rl:'trophy'},
 marathon:{c:'jg',n:'Maratón',d:'Gana una partida de 42 rondas.'},
 perfect:{c:'jg',n:'¿Partida perfecta?',d:'Gana con 1 de vida sin que ningún enemigo golpee tu núcleo.'},
 minimal:{c:'jg',n:'Minimalista',d:'Gana construyendo solo torres del mazo inicial de tu héroe.'},
 collector:{c:'jg',n:'Coleccionista',d:'Gana una partida de 15 rondas o más con exactamente 7 torres construidas, una de cada tipo.'},
 close:{c:'jg',n:'Por los pelos',d:'Gana tras quedarte a 1 de vida por golpes enemigos, con el jefe final muriendo a 2 casillas o menos de tu núcleo.'},
 noact:{c:'jg',n:'Autosuficiente',d:'Gana sin usar ni una vez la activa de ninguna reliquia.'},
 untouch:{c:'hr',n:'Intocable',d:'Gana sin que caigan nunca tu héroe ni ninguna unidad de tus torres (las invocaciones no cuentan).',rl:'banner'},
 bowl:{c:'hr',n:'Bola de Bolos',d:'Aturde a 8 enemigos con una sola Carga Heroica de Reinhart.'},
 jungle:{c:'hr',n:'Reyes de la Selva',d:'En una partida con Sylvana, consigue 20 bajas o más con cada una de sus bestias.'},
 bhole:{c:'hr',n:'Agujero negro',d:'Atrae a 10 enemigos con el Pulso arcano de Radagast y mátalos a todos con la explosión de esa runa.'},
 pure:{c:'hr',n:'Puro intelecto',d:'Gana con Radagast sin construir ninguna torre de daño físico.'},
 zero:{c:'hr',n:'Cero absoluto',d:'Consigue que un enemigo congelado acumule 30 stacks de hipotermia.'},
 thermal:{c:'hr',n:'Choque térmico',d:'Mata con daño de quemadura a un enemigo congelado que tenga al menos 10 stacks de hipotermia.'},
 bar:{c:'st',n:'Barra libre',d:'Consigue que un enemigo tenga a la vez quemadura, veneno, sangrado, hipotermia y electrizado.'},
 circuit:{c:'st',n:'Circuito cerrado',d:'Haz que un rayo de la Tesla rebote entre 3 o más enemigos y termine donde empezó.'},
 pigs:{c:'ev',n:'Soplaré y soplaré',d:'Consigue las tres casas de los cerditos en una partida y súbelas todas a Nv 4.',sec:'pig4',h:'Sube una casa de los cerditos a Nv 4 para descubrir este logro.'},
 cloink:{c:'ev',n:'¡Cloink!',d:'Mata a '+CLOINK+' enemigos con un solo Mecha Cerdito.',sec:'mech',h:'Descubre qué pasa cuando los tres cerditos trabajan juntos.'},
 dragon:{c:'ev',n:'Madre de dragones',d:'Gana con el Dragón anciano como la torre que más daño ha hecho en la partida.',sec:'drag3',h:'Cría a tu dragón hasta su última fase para descubrir este logro.'},
 faro:{c:'ev',n:'Luz eterna',d:'Sube el Faro a Nv 4 y haz que sus zonas de luz iluminen a la vez a 4 torres o más.',sec:'faro4',h:'Sube el Faro a Nv 4 para descubrir este logro.'},
 party:{c:'ev',n:'El grupo del héroe',d:'Sube la Sede del Gremio a Nv 4 y gana sin que caiga ningún aventurero después.'},
 roma:{c:'mp',n:'Todos los caminos llevan a Roma',d:'Haz que un camino salga de tu base por un lado y que su portal acabe en el lado opuesto del mapa.',rl:'square'},
 treasure:{c:'mp',n:'Cazatesoros',d:'Abre 3 cofres antes de la ronda 7.'},
 nobuild:{c:'vet',n:'Sin obras',d:'Gana sin construir ninguna torre desde el menú de torres: solo con tu héroe, torres de evento e invocaciones.'}});
// ---- progreso de logros: mejor marca histórica (barra) y estado de la partida actual ----
const inRun=()=>typeof S!=='undefined'&&S&&S.round>=1&&(S.hero||S.tut)&&S.phase!=='won'&&S.phase!=='lost'&&!document.body.classList.contains('inmenu');
function recBest(id,v){if(typeof S==='undefined'||!S||S.pvE)return;S.gbest=S.gbest||{};if(v>(S.gbest[id]||0))S.gbest[id]=v;if(v>(ACHBEST[id]||0)){ACHBEST[id]=v;try{localStorage.setItem('rt-achbest',JSON.stringify(ACHBEST));}catch(e){}}}
const APM={curious:{max:3,best:1,cur:()=>CUR.length},bowl:{max:8,best:1},bhole:{max:10,best:1},zero:{max:30,best:1},thermal:{max:10,best:1},bar:{max:5,best:1},circuit:{max:3,best:1},cloink:{max:CLOINK,best:1},faro:{max:4,best:1},jungle:{max:60,best:1},pyro:{max:100,best:1},sky:{max:40,best:1},hunt:{max:10,best:1},
 collector:{max:7,cur:()=>new Set(S.list.filter(t=>TW[t.type]&&!TW[t.type].uniq).map(t=>t.type)).size},pigs:{max:3,cur:()=>['brick','wood','straw'].filter(k=>S.list.some(t=>t.type===k&&t.lvl>=4)).length},treasure:{max:3,cur:()=>S.chOpen||0}};
const BL=e=>[e.bn>0,e.ps&&e.ps.length,e.bl&&e.bl.length,e.cs&&e.cs.length,e.ez&&e.ez.n>0].filter(Boolean).length;
function achState(id){const H=S.hero,B=S.built||[];const ok=t=>['ok','✓ En curso'+(t?': '+t:'')],ko=t=>['ko','✗ Ya no es posible en esta partida'+(t?' ('+t+')':'')],win=t=>['nt','Se comprueba al ganar'+(t?': '+t:'')],now=()=>['nt','Salta en el momento en que lo consigas'];
 switch(id){
  case 'tut_m':return S.tut?(TUTR>0?ko('has reintentado'):ok()):['nt','Solo en el tutorial completo'];
  case 'tut_e':return S.tut?(TUTR>0||S.hpEn>0?ko():ok()):['nt','Solo en el tutorial completo'];
  case 'perfect':return S.hpEn>0?ko('un enemigo golpeó el núcleo'):ok('vida '+S.hp+', debes acabar con 1');
  case 'minimal':return H&&B.some(k=>!(HEROES[H.id].deck||[]).includes(k))?ko('construiste una torre fuera del mazo inicial'):ok();
  case 'nobuild':return B.length?ko('has construido una torre'):ok();
  case 'collector':{const bc=S.bcnt||{},tot=Object.values(bc).reduce((a,v)=>a+v,0);return ROUNDS<15?ko('la partida dura menos de 15 rondas'):Object.values(bc).some(v=>v>1)?ko('has construido dos torres del mismo tipo'):tot>7?ko('has construido más de 7 torres'):ok(tot+' de 7 tipos distintos; se comprueba al ganar');}
  case 'close':return win('1 de vida por golpes y el jefe final a 2 casillas o menos');
  case 'noact':return S.usedAct?ko('usaste una activa'):ok();
  case 'untouch':return S.unitDied?ko('cayó una unidad'):ok();
  case 'pure':return !H||H.id!=='radagast'?ko('necesitas a Radagast'):B.some(k=>TW[k].dt==='phys')?ko('construiste una torre física'):ok();
  
  case 'elem':return win((S.list.some(t=>t.type==='sala')?'🦎':'—')+' / '+(S.list.some(t=>t.type==='frost')?'🧊':'—'));
  case 'dragon':return win('Dragón anciano con más daño que cualquier otra torre');
  case 'party':return S.guildS?(S.guildFail?ko('cayó un aventurero'):ok()):['nt','Sube la Sede del Gremio a Nv 4'];
  case 'treasure':return (S.chOpen||0)<3&&S.round>=7?ko('ya es la ronda 7'):['nt','Cofres abiertos: '+(S.chOpen||0)+' / 3'];
  case 'first':return win();case 'jungle':return !H||H.id!=='sylvana'?ko('necesitas a Sylvana'):now();
  case 'bowl':return !H||H.id!=='reinhart'?ko('necesitas a Reinhart'):now();case 'bhole':return !H||H.id!=='radagast'?ko('necesitas a Radagast'):now();
  case 'zero':case 'thermal':return !H||H.id!=='yrsa'?['nt','Necesitas a Yrsa para aplicar hipotermia']:now();
  default:return now();}}
function achProg(id,run){const M=APM[id];let h='';
 if(M){const b=M.cur?(run?M.cur():null):M.best?(ACHBEST[id]||0):null,c=run&&M.best?((S.gbest||{})[id]||0):null;
  if(M.best&&!M.cur){h+=`<div class="apb"><span style="width:${Math.min(100,(ACHBEST[id]||0)/M.max*100)}%"></span></div><small>Mejor marca: ${Math.min(M.max,ACHBEST[id]||0)} / ${M.max}</small>`;if(run)h+=`<div class="apb cur"><span style="width:${Math.min(100,c/M.max*100)}%"></span></div><small>Esta partida: ${Math.min(M.max,c)} / ${M.max}</small>`;}
  else if(M.cur&&(run||id==='curious')){const v=M.cur();h+=`<div class="apb cur"><span style="width:${Math.min(100,v/M.max*100)}%"></span></div><small>${run&&id!=='curious'?'Esta partida':'Progreso'}: ${Math.min(M.max,v)} / ${M.max}</small>`;}}
 if(run){const [cl,t]=achState(id);h+=`<div class="ast ${cl}">${t}</div>`;}
 return h;}
const APAN={open:false,sig:''};
function apanTick(force){const el=$('apan');if(!el)return;const on=APAN.open&&inRun();el.classList.toggle('on',on);if(!on)return;
 const h=(PINS.length?PINS.filter(id=>ACH[id]).map(id=>{const A=ACH[id];return `<div class="apr"><b>📌 ${A.n}</b><br><small>${achSec(id)?'???':A.d}</small>${achProg(id,true)}</div>`;}).join(''):'<small>No tienes logros fijados. Fija hasta 3 para seguir su progreso mientras juegas.</small>')+'<button data-a="achm">🏆 Ver todos los logros</button>';
 if(force||h!==APAN.sig){APAN.sig=h;el.innerHTML='<b>Logros fijados</b>'+h;}}
// recompensa de un logro: candado abierto + icono (en silueta si aún no lo tienes)
let ALKS={};try{ALKS=JSON.parse(localStorage.getItem('rt-alks'))||{};}catch(e){}
const ALKNEW=new Set();
const arw=(ok,r,id)=>{if(!r)return '';const an=ok&&id&&!ALKS[id];if(an)ALKNEW.add(id);return `<div class="arw"><span class="rwi" data-tip="achrw:${r[2]}${ok?'.'+encodeURIComponent(r[1]):''}"><span class="${ok?'rwc':'sil'}">${r[0]}</span><span class="alk${an?' anim':''}">${an?'<i class="c">🔒</i><i class="o">🔓</i>':ok?'🔓':'🔒'}</span></span>${ok?'<small>'+r[1]+'</small>':''}</div>`;};
const ACHCATS=[['tu','Primeros pasos'],['jg','Formas de jugar'],['hr','Héroes'],['st','Estados y combinaciones'],['ev','Eventos y torres únicas'],['mp','Mapa'],['vet','De veterano']];
const revd=k=>UNLOCK_ALL||OPT.u_cp||!!REV[k];
const lvSec=(k,l)=>!UNLOCK_ALL&&!OPT.u_cp&&(l===4&&!!(TW[k].faro&&!REV.faro4||TW[k].dragon&&!REV.drag3||TW[k].pig&&!REV.pig4)||l===3&&!!(TW[k].dragon&&!REV.drag2&&!REV.drag3));
const achSec=id=>!ACHS[id]&&ACH[id].sec&&!UNLOCK_ALL&&!OPT.u_sec&&!REV[ACH[id].sec];
const fieldAt=e=>(S.field&&S.field[Math.round(e.y)]&&S.field[Math.round(e.y)][Math.round(e.x)])||0;
function unitDeath(t,s){if(t.summ||t.merc||S.pvE)return;S.unitDied=1;if(TW[t.type]&&TW[t.type].guild&&t.lvl>=4)S.guildFail=1;if(s.ren){s.max/=1+s.ren;s.ren=0;}}
function achDeath(e){if(S.pvE)return;const k=e.src;
 // Renombre (Sede del Gremio en rango S): todo el grupo gana daño y vida
 if(k&&TW[k.type]&&TW[k.type].guild&&k.lvl>=4&&k.sd){const g=e.t==='mini'?.05:(e.t==='elite'||e.t==='wanted')?.1:isBoss(e)&&S.round<ROUNDS?.15:0;
  if(g)for(const s of k.sd)if(s.hp>0){const o=1+(s.ren||0);s.ren=(s.ren||0)+g;const m=(1+s.ren)/o;s.max*=m;s.hp*=m;}}
 if(S.tut)return;
 if(isBoss(e)&&S.round===ROUNDS)S.lastBossD=fieldAt(e);
 if(k&&k.beast){const b=(S.bst=S.bst||{});b[k.beast]=(b[k.beast]||0)+1;recBest('jungle',Object.keys(BEASTS).reduce((a,x)=>a+Math.min(20,b[x]||0),0));if(S.hero&&S.hero.id==='sylvana'&&Object.keys(BEASTS).every(x=>(b[x]||0)>=20))achieve('jungle');}
 if(k&&k.pigU==='mech'){k.kills=(k.kills||0)+1;recBest('cloink',k.kills);if(k.kills>=CLOINK)achieve('cloink');}
 if(e.kdn==='fire'&&e.fx.freeze){const w=(e.cs||[]).reduce((a,q)=>a+q.w,0);recBest('thermal',Math.floor(w));if(w>=10)achieve('thermal');}}
function roundUnlock(){if(S.tut||ROUNDS<RUNL||RUNL>=30)return;RUNL=Math.min(30,RUNL+5);try{localStorage.setItem('rt-runl',RUNL);}catch(e){}toast(`🔓 <b>¡Desbloqueas partidas de hasta ${RUNL} rondas!</b>`);}
function achWin(){roundUnlock();const H=S.hero,B=S.built||[],nm=S.list.filter(t=>TW[t.type]&&!TW[t.type].uniq);
 heroWinCount();achieve('first');if(ROUNDS>=42)achieve('marathon');
 if(S.hp===1&&!(S.hpEn>0))achieve('perfect');
 if(S.hp===1&&S.hpEn>0&&S.lastBossD!=null&&S.lastBossD<=2*K+1)achieve('close');
 if(H&&B.length&&B.every(k=>(HEROES[H.id].deck||[]).includes(k)))achieve('minimal');
 if(!B.length)achieve('nobuild');
 if(ROUNDS>=15&&nm.length===7&&new Set(nm.map(t=>t.type)).size===7&&!Object.values(S.bcnt||{}).some(v=>v>1))achieve('collector');
 if(!S.usedAct)achieve('noact');
 if(!S.unitDied)achieve('untouch');
 if(H&&H.id==='radagast'&&!B.some(k=>TW[k].dt==='phys'))achieve('pure');
 const dr=S.list.find(t=>TW[t.type].dragon&&t.stage>=3);if(dr&&(dr.dmgT||0)>0&&S.st.all.concat(S.list).every(t=>t===dr||(t.dmgT||0)<=dr.dmgT))achieve('dragon');
 if(S.guildS&&!S.guildFail)achieve('party');}
function romaChk(){const c=BN>>1;let ex=null;for(let y=0;y<P;y++)for(let x=0;x<P;x++){const ch=S.cc[c*P+y]&&S.cc[c*P+y][c*P+x];if(ch===2&&(x===0||y===0||x===P-1||y===P-1))ex=[x===0?-1:x===P-1?1:0,y===0?-1:y===P-1?1:0];}
 if(!ex||!S.core)return;for(const p of S.portals){const v=(p.x-S.core.x)*ex[0]+(p.y-S.core.y)*ex[1];if(v<-P*K*.75){achieve('roma');return;}}}
function achTick(dt){if(S.pvE||!S.list)return;
 {const pe=S.enemies.find(e=>e.hp>0&&(ET[e.t].need||1)>1&&e.ct>0&&!e.stopped);if(pe){const tg=()=>{const r=cv.getBoundingClientRect(),k=sc()/VIEW*r.width;return{x:((pe.x+.5)*CS-CAM.x)*k+r.left,y:((pe.y+.5)*CS-CAM.y)*k+r.top,r:40};};hint('pblock','Enemigos corpulentos',[['Este enemigo es <b>corpulento</b>: para pararlo necesita ser bloqueado por <b>'+ET[pe.t].need+' unidades</b>. Menos unidades solo lo frenarán.',tg],['El 🛡️ sobre él indica cuántas unidades lo están frenando.',tg]]);}}
 if(!S.tut&&S.round>=Math.ceil(ROUNDS/2)){let td=null,qd=null;try{td=localStorage.getItem('rt-tutdone');qd=localStorage.getItem('rt-qdone');}catch(e){}if(!td&&!qd)hint('optsx','Personaliza tu juego',OPTTXT,tgEl('#mtl [data-a="opts"]'));}
 for(const f of S.list){if(!TW[f.type]||!TW[f.type].faro||(f.lvl||1)<4)continue;reveal('faro4');let n=0;for(const t of S.list)if(t!==f&&!TW[t.type].faro&&!t.hero&&faroIn(f,t))n++;if(!S.tut)recBest('faro',n);if(n>=4&&!S.tut)achieve('faro');}
 // tutorial, ronda 10: si no has usado aún la reliquia del cofre, te pide usarla cuando Bob entra en tu zona de fuego
 if(S.tut&&S.round===10&&S.phase==='wave'&&S.chestRel&&S.chestRel.length&&!S.chestUsed){const e=S.enemies.find(q=>q.t==='bob'&&q.hp>0);if(!e)return;
  const now=S.wt||0,Y=S.list.filter(t=>TW[t.type]&&!TW[t.type].uniq).length,hit=Object.values(e.hb||{}).filter(v=>now-v<1).length;
  if(e.f0===undefined)e.f0=fieldAt(e);
  if(hit>0){if((e.gapT||0)>=1)e.gap2=1;e.gapT=0;e.wasHit=1;}else if(e.wasHit)e.gapT=(e.gapT||0)+dt;
  const c1=Y>0&&hit>=Math.ceil(Y/2),c2=e.gap2&&hit>=2,c3=e.f0>0&&fieldAt(e)<=e.f0*.4;
  if(c1||c2||c3){const id=S.chestRel[0],R=RELIC[id];hint('tut_relic','¡Usa tu reliquia!',`Bob está en plena zona de fuego: es el momento perfecto para activar ${R.ic} <b>${R.n}</b>. Pulsa su botón en la barra de reliquias y verás la diferencia.`,tgEl('#relics [data-a="ract"][data-id="'+id+'"]'));}}}
const YLOCK='Gana una partida con al menos una Salamandra y un Cryomago construidos al final.';if(!ACHS.elem)HEROES.yrsa.lockTxt=YLOCK;
// torres que necesitan logro para poder salir en las ofertas de la partida (null = logro aún por definir)
const TLOCK={frost:'chest',poison:'event',sala:'pyro'};
const BASET=()=>[...new Set(['cata'].concat(Object.values(HEROES).filter(h=>!h.late).flatMap(h=>h.deck||[])))];
const tunl=k=>BASET().includes(k)||(typeof OPT!=='undefined'&&(OPT.u_tw||OPT.u_hr&&Object.values(HEROES).some(h=>(h.deck||[]).includes(k))))||(TLOCK[k]?!!ACHS[TLOCK[k]]:false);
function achieve(id){if(!ACH[id]||ACHS[id])return;ACHS[id]=Date.now();if(PINS.includes(id)){PINS=PINS.filter(x=>x!==id);savePins();}try{localStorage.setItem('rt-ach',JSON.stringify(ACHS));}catch(e){}
 if(id==='elem'&&HEROES.yrsa)delete HEROES.yrsa.lockTxt;const A=ACH[id],T=A.tw&&TW[A.tw],Rl=A.rl&&RELIC[A.rl],Hr=A.hr&&HEROES[A.hr];toast(`🏆 <b>Logro: ${A.n}</b>${T?`<br><small>Desbloqueas ${T.ic} ${T.n}: ya puede salirte en las ofertas de torres.</small>`:''}${Rl?`<br><small>Desbloqueas la reliquia ${Rl.ic} ${Rl.n}: ya puede salirte en los cofres.</small>`:''}${Hr?`<br><small>Desbloqueas a ${Hr.ic} ${Hr.n}: ya puedes elegirla al empezar una partida.</small>`:''}${A.ux?`<br><small>Desbloqueas ${A.ux}.</small>`:''}${cosOf(id).map(([k,c])=>`<br><small>Desbloqueas ${CSKIND[k][1].toLowerCase()}: ${c.n}.</small>`).join('')}`);
 if(T)newU('tw',T.ic,T.n);if(Rl)newU('rl',Rl.ic,Rl.n);if(Hr)newU('hr',Hr.ic,Hr.n);if(A.ux)newU('ux','📖',A.ux.replace(/^el /,'').replace(/^./,m=>m.toUpperCase()));for(const[k,c]of cosOf(id))newU(k,CSKIND[k][0],c.n);}
function toast(h){let el=$('toast');if(!el){el=document.createElement('div');el.id='toast';document.body.appendChild(el);}const d=document.createElement('div');d.className='tst';d.innerHTML=h;el.appendChild(d);setTimeout(()=>d.classList.add('out'),3800);setTimeout(()=>d.remove(),4400);}
