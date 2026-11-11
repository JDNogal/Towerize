let VIEW=1000,VH=1000,PXR=1;
const DECF=.5,P=7,K=3,CS=20,ENR=.6,POISD=3,GOLDR=.05,PTICK=1,FRZT=3,FRZCD=6,FRZR=3.5*K,MINP=10,BUFFS_FROM=2,SLOWT=1.5,SPLASH=.6,LINGER=.5,HP0=18,HPG=1.25,D=[[1,0],[-1,0],[0,1],[0,-1]];
let ERA=1; // era elegida para la próxima partida (1 Fantástica, 2 Distópica · Ruinas de Neón); ver era2.js
// Partida: rondas elegidas (15-30), tamaño del mapa en piezas y cofres
let BN=5,NC=P*BN,N=NC*K,ROUNDS=15,CHESTS=3;
const chestsFor=n=>3+(n>=19)+(n>=24)+(n>=29),mapFor=n=>n<=20?5:7,bossRound=r=>r===ROUNDS||(r===15&&ROUNDS>15);
// Vida: +25% acumulado hasta la ronda 15; desde la 16, cada ronda suma un 20% de la vida de la ronda 15. El jefe final gana un extra según las rondas elegidas.
const hpR=r=>r<=15?1:1+.12*(r-15),bossB=()=>ROUNDS<=15?1:ROUNDS<=20?1.35:ROUNDS<=25?1.45:1.5;
const cv=document.getElementById('c'),g=cv.getContext('2d');cv.width=cv.height=VIEW;
// Cámara: z=1 muestra todo el mapa; CAM.x/y = esquina superior izquierda en píxeles de mundo
// tamaño de dibujo de enemigos y unidades respecto a su tamaño real en el juego (solo visual)
const EVS=1.4,UVS=1.15;
let ZINI=1.5,ZMAX=4,BS=Math.min(VIEW,VH)/(N*CS);const CAM={z:ZINI,x:0,y:0},ZMIN=1;
function setSize(bn){BN=bn;NC=P*BN;N=NC*K;BS=Math.min(VIEW,VH)/(N*CS);ZINI=1.5*BN/5;ZMAX=4*BN/5;}
const sc=()=>BS*CAM.z;
function clampCam(){const w=VIEW/sc(),h=VH/sc(),M=N*CS,G=P*K*CS;CAM.x=M+2*G<=w?(M-w)/2:Math.max(-G,Math.min(M-w+G,CAM.x));CAM.y=M+2*G<=h?(M-h)/2:Math.max(-G,Math.min(M-h+G,CAM.y));}
// «y» pasa a «e» delante de palabras que empiezan por i / hi (pero no hie, hia…)
const yE=w=>/^h?[ií](?![aeouáéóú])/i.test(String(w).replace(/<[^>]*>/g,'').trim())?' e ':' y ';
const yJ=a=>a.length>1?a.slice(0,-1).join(', ')+yE(a[a.length-1])+a[a.length-1]:(a[0]||'');
const KEYS=new Set();
// tecla dibujada sobre un botón (solo PC)
const kcOn=()=>!TOUCH&&OPT.kcap!==false;
const kcap=t=>kcOn()?`<span class="kcap">${t}</span>`:'';
// ---- atajos de teclado configurables (los de siempre son los predeterminados) ----
const KBDEF={up:'w',left:'a',down:'s',right:'d',zin:'e',zout:'q',hab:'f',ult:'g',hero:'h',ally:'j',pigs:'c',pause:' ',speed:'v',wave:'enter',upg:'u',flag:'b',ptips:'p',rot:'r',peek:'tab',nu:'w',nl:'a',nd:'s',nr:'d',nok:'enter'};
// segunda tecla (alternativa): solo las lógicas vienen rellenas
const KB2DEF={up:'arrowup',left:'arrowleft',down:'arrowdown',right:'arrowright',nu:'arrowup',nl:'arrowleft',nd:'arrowdown',nr:'arrowright',nok:' '};
const KBMENU=['nu','nl','nd','nr','nok'];
const KBL=[['Mapa',[['up','Mover el mapa arriba','⬆️'],['left','Mover el mapa a la izquierda','⬅️'],['down','Mover el mapa abajo','⬇️'],['right','Mover el mapa a la derecha','➡️'],['zin','Acercar','🔍'],['zout','Alejar','🔭']]],
 ['Héroe',[['hab','Habilidad del héroe','✨'],['ult','Habilidad definitiva','🌟'],['hero','Mover al héroe','🦸'],['ally','Mover a la criatura aliada','👽'],['pigs','Mover a los cerditos','🐷']]],
 ['Partida',[['pause','Pausar / reanudar','⏯️'],['speed','Cambiar la velocidad','⏩'],['wave','Empezar la oleada','⚔️'],['upg','Mejorar torre (con Mayús: marcar la mejora)','⬆️'],['flag','Mover la bandera de la torre elegida (o su nube / su luz)','🚩'],['ptips','Mostrar u ocultar lo que sale de cada portal','💀'],['rot','Girar la pieza','🔄'],['peek','Ver el mapa en eventos y ofertas','👁']]],
 ['Menús',[['nu','Subir','⬆️'],['nl','Izquierda','⬅️'],['nd','Bajar','⬇️'],['nr','Derecha','➡️'],['nok','Aceptar / pulsar','✅']]]];
const KBFIX=[['1 – 7','Construir torre (en el solar abierto o con el ratón encima)','🗼'],['Mayús + 1 – 9','Usar reliquia','💎'],['Esc','Pausa / cancelar / volver','⏸️'],['Q / E','Cambiar de sección en el libro (compendio, opciones…)','📖']];
let KB=Object.assign({},KBDEF),KB2=Object.assign({},KB2DEF);try{Object.assign(KB,JSON.parse(localStorage.getItem('rt-keys'))||{});Object.assign(KB2,JSON.parse(localStorage.getItem('rt-keys2'))||{});}catch(e){}
const kbSave=()=>{try{localStorage.setItem('rt-keys',JSON.stringify(KB));localStorage.setItem('rt-keys2',JSON.stringify(KB2));}catch(e){}};
const kbIs=(a,k)=>KB[a]===k||(!!KB2[a]&&KB2[a]===k);
const kbGrp=a=>KBMENU.includes(a)?'m':'g';
const kbN=(k,alt)=>{const v=alt?(KB2[k]||''):(KB[k]!==undefined?KB[k]:k);if(!v)return '—';return v===' '?'Espacio':v==='enter'?'Intro':v==='tab'?'Tab':v==='arrowup'?'↑':v==='arrowdown'?'↓':v==='arrowleft'?'←':v==='arrowright'?'→':v==='backspace'?'Retroceso':v.length===1?v.toUpperCase():v[0].toUpperCase()+v.slice(1);};
const kbAct=(k,g)=>{for(const a of Object.keys(KB))if(kbGrp(a)===g&&KB[a]===k)return[a,0];for(const a of Object.keys(KB2))if(kbGrp(a)===g&&KB2[a]===k)return[a,1];return null;};
const KBC={on:null,note:''};
function kbHTML(){return '<div class="kbhd"><span></span><b>Tecla</b><b>Alternativa</b></div>'+KBL.map(([g,rows])=>`<h3 class="osec">${g}</h3>`+rows.map(([a,l,i])=>`<div class="orow otg"><span class="oic">${i}</span><div class="otl"><div>${l}</div></div>`+[0,1].map(s=>{const on=KBC.on===a&&KBC.s===s;return `<button class="kbk${on?' on':''}${s&&!KB2[a]?' emp':''}" data-a="kbset" data-v="${a}" data-s="${s}" title="${s?'Tecla alternativa (Supr para borrarla)':'Tecla principal'}">${on?'Pulsa una tecla…':kbN(a,s)}</button>`;}).join('')+`</div>`).join('')).join('')
 +`<h3 class="osec">Fijos</h3>`+KBFIX.map(([k,l,i])=>`<div class="orow otg"><span class="oic">${i}</span><div class="otl"><div>${l}</div></div><span class="kbk fix">${k}</span></div>`).join('')
 +(KBC.note?`<div class="orow onote">ℹ️ ${KBC.note}</div>`:'')+`<div class="kbft"><button data-a="kbreset">Restablecer los predeterminados</button></div>`;}
addEventListener('keydown',e=>{if(!KBC.on)return;e.preventDefault();e.stopImmediatePropagation();const k=e.key.toLowerCase(),a=KBC.on,s=KBC.s||0;
 if(k==='escape'){KBC.on=null;KBC.note='';renderOpts();return;}
 if(s&&(k==='delete'||k==='backspace')){KB2[a]='';kbSave();KBC.on=null;KBC.note='Tecla alternativa borrada.';renderOpts();return;}
 if(['shift','control','alt','meta','capslock'].includes(k)||/^[0-9]$/.test(k)||(/^Digit/.test(e.code)&&e.shiftKey)||(kbGrp(a)==='g'&&(k==='q'||k==='e')&&false)){KBC.note='Esa tecla no se puede usar: los números, Esc y las teclas modificadoras están reservados.';renderOpts();return;}
 const M=s?KB2:KB,old=M[a],o=kbAct(k,kbGrp(a));KBC.note='';
 if(o&&!(o[0]===a&&o[1]===s)){const OM=o[1]?KB2:KB;OM[o[0]]=old||'';const nm=KBL.flatMap(x=>x[1]).find(r=>r[0]===o[0]);KBC.note=`Esa tecla ya la usaba «${nm?nm[1]:o[0]}»; ahora usa <b>${kbN(o[0],o[1])}</b>.`;}
 M[a]=k;kbSave();KBC.on=null;renderOpts();},true);

const clickA=(sel,i)=>{const L=[...document.querySelectorAll(sel)].filter(b=>b.offsetParent||b.getClientRects().length);const b=L[i||0];if(b&&!b.disabled&&hitOk(b)){b.click();return true;}return false;};
addEventListener('keydown',e=>{if(!keyOK(e)||e.ctrlKey||e.metaKey||e.altKey||e.repeat||RL.open||PMU.open||ctlBlocked())return;const k=e.key.toLowerCase(),c=e.code||'';
 const dg=/^Digit([1-9])$/.exec(c);
 if(dg&&e.shiftKey){if(clickA('#relics [data-a="ract"]',+dg[1]-1))e.preventDefault();return;}
 if(dg&&!e.shiftKey){if(bmKey(+dg[1]-1))e.preventDefault();return;}
 if(kbIs('hab',k)){clickA('[data-a="hab"]');e.preventDefault();}
 else if(kbIs('ult',k)){clickA('[data-a="hult"]');e.preventDefault();}
 else if(kbIs('hero',k)){clickA('[data-a="hero"]');e.preventDefault();}
 else if(kbIs('pigs',k)){clickA('[data-a="pigs"]');e.preventDefault();}
 else if(kbIs('ally',k)){if(clickA('[data-a="ally"]'))e.preventDefault();}
 else if(kbIs('pause',k)){e.preventDefault();if(S.speed===0)S.speed=S.lspd||1;else{S.lspd=S.speed;S.speed=0;}ui();}
 else if(kbIs('speed',k)){e.preventDefault();const Lv=[.5,1,2,3],cu=S.speed||S.lspd||1,n=Lv[(Lv.indexOf(cu)+1)%Lv.length]||1;S.lspd=n;S.speed=n;ui();}
 else if(kbIs('wave',k)&&S.phase==='build'){const wb=document.querySelector('[data-a="wave"]');if(wb&&hitOk(wb)){WARM=0;startWave();}e.preventDefault();}
 else if(kbIs('ptips',k)){togglePtips();e.preventDefault();}
 else if(kbIs('flag',k)&&S.selT&&!S.aim){quickFlag(S.selT);e.preventDefault();}
 else if(kbIs('upg',k)){if(e.shiftKey){const b=document.querySelector('#tmenu.on [data-tm="up"],#side [data-a="up"],#tip [data-a="up"]');if(b){wishToggle(b);e.preventDefault();}}else{const b=document.querySelector('#tmenu.on [data-tm="up"],#tmenu.on [data-tm="gup"]');if(b){tmDo(b);e.preventDefault();}else if(clickA('[data-a="up"]'))e.preventDefault();}}});
const keyOK=e=>!(e.target&&/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))&&typeof S!=='undefined'&&S&&!document.body.classList.contains('inmenu')&&!LB.open&&!(typeof DLG!=='undefined'&&DLG.on)&&!(typeof INTRO!=='undefined'&&INTRO.on);
addEventListener('keydown',e=>{const k=e.key.toLowerCase();if(!keyOK(e)||e.ctrlKey||e.metaKey||e.altKey)return;const mv=['up','left','down','right'].find(a=>kbIs(a,k));if(mv){KEYS.add(mv);e.preventDefault();}
 else if(kbIs('zin',k)||k==='+'||k==='='){zoomSmooth(1.25,VIEW/2,VH/2);e.preventDefault();}else if(kbIs('zout',k)||k==='-'){zoomSmooth(1/1.25,VIEW/2,VH/2);e.preventDefault();}});
addEventListener('keyup',e=>{const k=e.key.toLowerCase();for(const a of ['up','left','down','right'])if(kbIs(a,k))KEYS.delete(a);});addEventListener('blur',()=>KEYS.clear());
{let last=0;const tick=t=>{const dt=Math.min(.05,(t-(last||t))/1000);last=t;if(KEYS.size&&typeof S!=='undefined'&&S){const sp=VIEW*.9*dt/sc();if(KEYS.has('left'))CAM.x-=sp;if(KEYS.has('right'))CAM.x+=sp;if(KEYS.has('up'))CAM.y-=sp;if(KEYS.has('down'))CAM.y+=sp;clampCam();}requestAnimationFrame(tick);};requestAnimationFrame(tick);}
document.addEventListener('mouseover',e=>{if(TOUCH||!S||S.phase!=='place'||S.pi==null||S.pexp)return;if(e.target.closest&&e.target.closest('.pstrip')&&!e.target.closest('button')){S.pexp=true;ui();}});
document.addEventListener('mouseout',e=>{if(TOUCH||!S||S.phase!=='place'||S.pi==null||!S.pexp)return;const p=$('panel');if(p&&p.contains(e.target)&&!(e.relatedTarget&&p.contains(e.relatedTarget))){S.pexp=false;ui();}});
function zoomAt(f,px,py){const a=sc(),wx=px/a+CAM.x,wy=py/a+CAM.y;CAM.z=Math.max(ZMIN,Math.min(ZMAX,CAM.z*f));const b=sc();CAM.x=wx-px/b;CAM.y=wy-py/b;clampCam();}
function camCenter(x,y){const w=VIEW/sc(),h=VH/sc();CAM.x=x*CS+CS/2-w/2;CAM.y=y*CS+CS/2-h/2;clampCam();}
// escritorio: el lienzo ocupa toda la ventana y se dibuja a su resolución real
function fitView(){const r=cv.getBoundingClientRect(),dk=document.body.classList.contains('dsk');let W=1000,H=1000;
 if(dk&&r.width>0&&r.height>0){const d=Math.min(2,window.devicePixelRatio||1);W=Math.round(r.width*d);H=Math.round(r.height*d);}
 if(W!==VIEW||H!==VH){const k0=sc(),cx=CAM.x+VIEW/k0/2,cy=CAM.y+VH/k0/2;VIEW=W;VH=H;cv.width=W;cv.height=H;BS=Math.min(VIEW,VH)/(N*CS);const k=sc();CAM.x=cx-VIEW/k/2;CAM.y=cy-VH/k/2;clampCam();}
 PXR=dk&&r.width>0?1.1*VIEW/r.width:1;}
function setDsk(){const mf=TOUCH&&innerWidth>innerHeight&&!document.body.classList.contains('vert'),d=mf||!TOUCH||innerWidth>860&&!LSM.matches&&!(TOUCH&&innerHeight>innerWidth);document.body.classList.toggle('dsk',d);document.body.classList.toggle('mfs',mf);fitView();}

// tiempos: en segundos o, con la opción «Tiempos en minutos», como «1 min 30 s»; c = versión corta para insignias («1:30»)
const fmtT=(sec,c)=>{sec=Math.max(0,Math.ceil(sec));if(typeof OPT==='undefined'||!OPT.tmin||sec<60)return sec+(c?'':' s');const m=Math.floor(sec/60),r=sec%60;return c?m+':'+String(r).padStart(2,'0'):m+' min'+(r?' '+r+' s':'');};

// v307: bandera de las unidades (cola de golondrina roja clavada, con el círculo de «aquí»); trazo del color del texto
const FLAGI='<svg class="flagi" viewBox="0 0 64 64" width="1.25em" height="1.25em" style="vertical-align:-.28em"><g fill="none" stroke="currentColor" stroke-width="3.4" stroke-linejoin="round" stroke-linecap="round"><ellipse cx="30" cy="52" rx="20" ry="6.5" stroke-dasharray="5 5"/><path d="M30 52V7" stroke-width="4.2"/><path d="M30 9h26l-8 10 8 10H30z" fill="#d8453a"/></g></svg>';

// v307: marca de «compra en cola»: marcapáginas rojo con reloj (antes el emoji 🔖)
const WISHSVG='<g stroke="#1b1712" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"><path d="M12 4h24v39l-12-9-12 9z" fill="#d8453a"/><circle cx="24" cy="19" r="7" fill="#fff6dc" stroke-width="2"/><path d="M24 15v4.4l2.8 1.8" stroke-width="2"/></g>';
const WISHI='<svg class="wishi" viewBox="8 0 32 48" width=".8em" height="1.2em" style="vertical-align:-.25em">'+WISHSVG+'</svg>';
let WISHIM=null;function wishImg(){if(WISHIM)return WISHIM;try{WISHIM=new Image();WISHIM.src='data:image/svg+xml;utf8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="96" height="96">'+WISHSVG+'</svg>');}catch(e){}return WISHIM;}

// v307: iconos de la barra de arriba (portales, vida, oro) e iconos genéricos de peligro de la línea de rondas (mini-élite, élite, jefe)
const HUDI={hour:'<svg class="hudi" viewBox="0 0 48 48"><g stroke="#f3e3c0" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"><path d="M13 9C13 19 21 20 24 24C21 28 13 29 13 39H35C35 29 27 28 24 24C27 20 35 19 35 9Z" fill="#fbf1d8"/><path d="M19.5 19.5H28.5L24 24Z" fill="#e8ac42" stroke-width="1"/><path d="M24 24v6" stroke="#e8ac42" stroke-width="2"/><path d="M13.2 33C15 29.5 20.5 28.5 24 25.5C27.5 28.5 33 29.5 34.8 33L35 39H13Z" fill="#e8ac42" stroke-width="1.2"/><path d="M9 8h30M9 40h30" stroke-width="4"/></g></svg>',port:'<svg class="hudi" viewBox="0 0 48 48"><g stroke="#1b1712" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"><path d="M10 42V22a14 14 0 0128 0v20z" fill="#3a2a55" stroke="#f3e3c0"/><path d="M15.5 42V23a8.5 8.5 0 0117 0v19z" fill="#b46cff"/><path d="M24 20c3 2 3 6 0 8s-3 6 0 8" fill="none" stroke="#f1dcff" stroke-width="2"/><path d="M7 42h34" stroke="#f3e3c0" stroke-width="3.4"/></g></svg>',heart:'<svg class="hudi" viewBox="0 0 48 48"><g stroke="#1b1712" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"><path d="M24 41C10 31 6 24 6 17a9 9 0 0118-2.5A9 9 0 0142 17c0 7-4 14-18 24z" fill="#e8434f"/><path d="M13 15.5c1-2.5 3-3.5 5-3.5" fill="none" stroke="#ffd0d4" stroke-width="2.4"/></g></svg>',heartlow:'<svg class="hudi" viewBox="0 0 48 48"><g stroke="#1b1712" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"><path d="M24 41C10 31 6 24 6 17a9 9 0 0118-2.5A9 9 0 0142 17c0 7-4 14-18 24z" fill="#b8323c"/><path d="M24 15l-4 7 7 4-5 8" fill="none" stroke="#1b1712" stroke-width="2.600"/></g></svg>',coins:'<svg class="hudi" viewBox="0 0 48 48"><g stroke="#1b1712" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"><ellipse cx="24" cy="33" rx="15" ry="6" fill="#e0a82e"/><ellipse cx="24" cy="27" rx="15" ry="6" fill="#f2c94c"/><ellipse cx="24" cy="21" rx="15" ry="6" fill="#f2c94c"/><ellipse cx="24" cy="15" rx="15" ry="6" fill="#f8de7a"/></g></svg>'};
const RTLI={mini:'<svg viewBox="0 0 48 48"><g stroke="#1b1712" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"><path d="M24 9c-8.5 0-14 5.5-14 12.5 0 4.6 2.2 7.6 5 9.4V36a2.5 2.5 0 002.5 2.5h13A2.5 2.5 0 0033 36v-5.1c2.8-1.8 5-4.8 5-9.4C38 14.5 32.5 9 24 9z" fill="#e9dfc8"/><circle cx="18.5" cy="22" r="3.4" fill="#1b1712"/><circle cx="29.5" cy="22" r="3.4" fill="#1b1712"/><path d="M24 27l-1.8 3.2h3.6z" fill="#1b1712" stroke-width="1"/><path d="M20 34v4M24 34v4M28 34v4" stroke-width="1.8"/></g></svg>',elite:'<svg viewBox="0 0 48 48"><g stroke="#1b1712" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"><path d="M11 17C6 15 4 10 5 5c3 4 6 6 10 6.5z" fill="#e9dfc8"/><path d="M37 17c5-2 7-7 6-12-3 4-6 6-10 6.5z" fill="#e9dfc8"/><path d="M24 9c-8.5 0-14 5.5-14 12.5 0 4.6 2.2 7.6 5 9.4V36a2.5 2.5 0 002.5 2.5h13A2.5 2.5 0 0033 36v-5.1c2.8-1.8 5-4.8 5-9.4C38 14.5 32.5 9 24 9z" fill="#e9dfc8"/><circle cx="18.5" cy="22" r="3.4" fill="#1b1712"/><circle cx="29.5" cy="22" r="3.4" fill="#1b1712"/><path d="M24 27l-1.8 3.2h3.6z" fill="#1b1712" stroke-width="1"/><path d="M20 34v4M24 34v4M28 34v4" stroke-width="1.8"/></g></svg>',boss:'<svg viewBox="0 0 48 48"><g stroke="#1b1712" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"><g transform="translate(0 6)"><path d="M10 16C5 14 3 9 4 4c3 4 6 6 10 6.5z" fill="#e9dfc8"/><path d="M38 16c5-2 7-7 6-12-3 4-6 6-10 6.5z" fill="#e9dfc8"/><path d="M24 9c-8.5 0-14 5.5-14 12.5 0 4.6 2.2 7.6 5 9.4V36a2.5 2.5 0 002.5 2.5h13A2.5 2.5 0 0033 36v-5.1c2.8-1.8 5-4.8 5-9.4C38 14.5 32.5 9 24 9z" fill="#d8453a"/><circle cx="18.5" cy="22" r="3.4" fill="#1b1712"/><circle cx="29.5" cy="22" r="3.4" fill="#1b1712"/><path d="M24 27l-1.8 3.2h3.6z" fill="#1b1712" stroke-width="1"/><path d="M20 34v4M24 34v4M28 34v4" stroke-width="1.8"/></g><path d="M15 13.5l-1.6-8.5 5.6 4.2L24 2.5l5 6.7 5.6-4.2-1.6 8.5z" fill="#f2c94c"/><circle cx="24" cy="9.6" r="1.5" fill="#d8453a" stroke-width="1"/></g></svg>',group:'<svg viewBox="6 2 36 40"><g stroke="#1b1712" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"><g transform="translate(2.5 14) scale(0.6)"><path d="M24 9c-8.5 0-14 5.5-14 12.5 0 4.6 2.2 7.6 5 9.4V36a2.5 2.5 0 002.5 2.5h13A2.5 2.5 0 0033 36v-5.1c2.8-1.8 5-4.8 5-9.4C38 14.5 32.5 9 24 9z" fill="#cfc4aa"/><circle cx="18.5" cy="22" r="3.4" fill="#1b1712"/><circle cx="29.5" cy="22" r="3.4" fill="#1b1712"/><path d="M24 27l-1.8 3.2h3.6z" fill="#1b1712" stroke-width="1"/><path d="M20 34v4M24 34v4M28 34v4" stroke-width="1.8"/></g><g transform="translate(16.7 14) scale(0.6)"><path d="M24 9c-8.5 0-14 5.5-14 12.5 0 4.6 2.2 7.6 5 9.4V36a2.5 2.5 0 002.5 2.5h13A2.5 2.5 0 0033 36v-5.1c2.8-1.8 5-4.8 5-9.4C38 14.5 32.5 9 24 9z" fill="#cfc4aa"/><circle cx="18.5" cy="22" r="3.4" fill="#1b1712"/><circle cx="29.5" cy="22" r="3.4" fill="#1b1712"/><path d="M24 27l-1.8 3.2h3.6z" fill="#1b1712" stroke-width="1"/><path d="M20 34v4M24 34v4M28 34v4" stroke-width="1.8"/></g><g transform="translate(7.2 3) scale(.7)"><path d="M11 17C6 15 4 10 5 5c3 4 6 6 10 6.5z" fill="#e9dfc8"/><path d="M37 17c5-2 7-7 6-12-3 4-6 6-10 6.5z" fill="#e9dfc8"/><path d="M24 9c-8.5 0-14 5.5-14 12.5 0 4.6 2.2 7.6 5 9.4V36a2.5 2.5 0 002.5 2.5h13A2.5 2.5 0 0033 36v-5.1c2.8-1.8 5-4.8 5-9.4C38 14.5 32.5 9 24 9z" fill="#e9dfc8"/><circle cx="18.5" cy="22" r="3.4" fill="#1b1712"/><circle cx="29.5" cy="22" r="3.4" fill="#1b1712"/><path d="M24 27l-1.8 3.2h3.6z" fill="#1b1712" stroke-width="1"/><path d="M20 34v4M24 34v4M28 34v4" stroke-width="1.8"/></g></g></svg>'};
