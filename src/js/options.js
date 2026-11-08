// Para añadir una opción basta una línea aquí: tab, type (toggle | slider | choice | note), key, def, label y desc.
const OPTS=[
 {tab:'jg',type:'choice',dev:'pc',label:'Posición del panel de información',desc:'Dónde aparece la ficha con los datos de lo que señalas: fija a la derecha, fija a la izquierda o junto al propio elemento.',get:()=>PM,set:v=>setPM(v),choices:[['right','Derecha'],['left','Izquierda'],['near','Junto al elemento']]},
 {tab:'jg',type:'toggle',key:'fs',def:true,dev:'touch',show:()=>FSOK,label:'Pantalla completa al empezar partida',desc:'Al pulsar Nueva partida, el juego ocupa toda la pantalla y se queda en horizontal. Siempre puedes entrar o salir con el botón de las cuatro esquinas, junto al zoom.'},
 {tab:'jg',type:'toggle',key:'kcap',def:true,dev:'pc',label:'Teclas sobre los botones',desc:'Muestra encima de los botones del héroe y de las reliquias la tecla que los activa (las que tengas puestas en Atajos).'},
 {tab:'jg',type:'toggle',key:'dnum',def:true,label:'Números de daño',desc:'Muestra sobre los enemigos el daño que reciben. Los golpes seguidos se suman en un solo número que va subiendo, con el color de su tipo de daño; los críticos salen más grandes y con «!».'},
 {tab:'jg',type:'toggle',key:'hints',def:true,label:'Pistas',desc:'La primera vez que pasa algo nuevo (un enemigo con armadura, un cofre, una reliquia…), una pista corta te lo explica. Si sale en plena oleada, el juego frena poco a poco hasta pararse. Cada pista sale una sola vez.'},
 {tab:'jg',type:'toggle',key:'ptip',def:false,label:'Tooltips de portales abiertos en fase de construcción',desc:'Durante la fase de construcción, los bocadillos con las escuadras de cada portal se quedan siempre abiertos, sin tener que pasar el ratón por encima.',descT:'Durante la fase de construcción, los bocadillos con las escuadras de cada portal se quedan siempre abiertos, sin tener que tocarlos.'},
 {tab:'jg',type:'toggle',key:'ptipw',def:false,label:'Tooltips de portales abiertos en fase de combate',desc:'Durante la oleada, cada portal muestra siempre la escuadra que está saliendo y la siguiente. Al pasar el ratón por encima ves todo lo que le queda por salir.',descT:'Durante la oleada, cada portal muestra siempre la escuadra que está saliendo y la siguiente. Al tocarlo ves todo lo que le queda por salir.'},
 {tab:'jg',type:'toggle',key:'treal',def:false,label:'Mostrar tiempo real',desc:'Muestra arriba el tiempo real que llevas de partida, contando todo: pausas, menús y lo que tardes en pensar.'},
 {tab:'jg',type:'toggle',key:'tcomb',def:false,label:'Mostrar tiempo de combate',desc:'Muestra arriba el tiempo de juego: solo avanza con el juego en marcha y va al ritmo de la velocidad (a ×2 cuenta el doble de rápido; en pausa se detiene).'},
 {tab:'jg',type:'toggle',key:'slow',def:true,label:'Ralentizar el juego al consultar información',desc:'Al mantener el ratón sobre un elemento o un panel, el juego baja hasta ×0,25.',descT:'Al mantener pulsado un elemento o mientras tienes un panel abierto, el juego baja hasta ×0,25.'},
 {tab:'hs',type:'choice',label:'Velocidad de escritura',desc:'A qué ritmo aparecen las letras en los diálogos de la historia. Puedes pulsar en cualquier momento para ver la frase entera.',get:()=>OPT.dspd||'n',set:v=>{OPT.dspd=v;saveOpt();},choices:[['l','Lenta'],['n','Normal'],['r','Rápida']]},
 {tab:'hs',type:'toggle',key:'dtype',def:true,label:'Efecto máquina de escribir',desc:'El texto de los diálogos aparece letra a letra. Desactivado, aparece de golpe.'},
 {tab:'hs',type:'toggle',key:'dauto',def:false,label:'Avance automático',desc:'Los diálogos pasan solos tras una pausa, sin tener que pulsar.'},
 {tab:'hs',type:'slider',key:'dwait',def:2,min:1,max:5,step:.5,fmt:v=>String(v).replace('.',',')+' s',label:'Pausa del avance automático',desc:'Lo que espera cada diálogo, además de un poco más cuanto más largo es el texto.'},
 {tab:'hs',type:'toggle',key:'dglitch',def:true,label:'Efectos de fallo de ÉTER',desc:'Caracteres corruptos y parpadeos mientras el núcleo está dañado. Desactívalo si te molestan o usas lector de pantalla.'},
 {tab:'hs',type:'toggle',key:'dbig',def:false,label:'Texto de diálogos grande',desc:'Letra más grande en los diálogos de la historia, para leerlos con más comodidad.'},
 {tab:'hs',type:'cname',label:'Nombre del capitán'},
 {tab:'un',type:'note',desc:'Para quien quiera probarlo todo sin pasar por el progreso: streaming, pruebas o simplemente jugar a tu aire. Cada sección se puede desactivar cuando quieras: vuelve a bloquearse lo que no hayas conseguido jugando. Los logros siguen funcionando con normalidad.'},
 {tab:'un',type:'toggle',key:'u_tw',def:false,label:'Desbloquear todas las torres',desc:'Todas las torres pueden salirte en las ofertas desde la primera partida.'},
 {tab:'un',type:'toggle',key:'u_hr',def:false,label:'Desbloquear todos los héroes',desc:'Todos los héroes disponibles en la selección, junto con las torres de sus mazos.'},
 {tab:'kb',type:'keys'},
 {tab:'jg',type:'reset',label:'Borrar progreso',desc:'Borra todo lo que has conseguido y descubierto: compendio, logros, récords y victorias de héroe, rondas, tutoriales, historia y tu nombre para ÉTER, los desbloqueos y la personalización (paletas, núcleos y decoraciones). Se mantienen el sonido, los atajos y tus preferencias de interfaz. No se puede deshacer.'},
 {tab:'un',type:'toggle',key:'u_rl',def:false,label:'Desbloquear todas las reliquias',desc:'Las reliquias que dependen de un logro también pueden salir en los cofres.'},
 {tab:'un',type:'toggle',key:'u_cs',def:false,label:'Desbloquear toda la personalización',desc:'Encuadernaciones, núcleos y decoraciones disponibles sin conseguir sus logros.'},
 {tab:'ps',type:'cosm'},
 {tab:'un',type:'toggle',key:'u_rd',def:false,label:'Desbloquear todas las duraciones de partida',desc:'Puedes elegir partidas de 15 a 30 rondas desde el principio.'},
 {tab:'un',type:'toggle',key:'u_cpa',def:false,label:'Abrir el Compendio',desc:'Solo da acceso al Compendio, como al conseguir Mente curiosa: verás lo que hayas descubierto y el resto en sombra.'},
 {tab:'un',type:'toggle',key:'u_cp',def:false,label:'Compendio completo',desc:'Desbloquea el Compendio y muestra todas sus entradas, incluidos los niveles secretos de las torres de evento.'},
 {tab:'un',type:'toggle',key:'u_sec',def:false,label:'Revelar logros secretos',desc:'Muestra la descripción de los logros ocultos.'},
 {tab:'vol',type:'slider',key:'vm',def:80,min:0,max:100,step:5,fmt:v=>v+'%',label:'Volumen general',desc:'Volumen de todo el sonido del juego. Los otros dos se aplican sobre este.'},
 {tab:'vol',type:'slider',key:'vu',def:60,min:0,max:100,step:5,fmt:v=>v+'%',label:'Música',desc:'Volumen de la música. Towerize todavía no tiene música: queda preparado para cuando la tenga.'},
 {tab:'vol',type:'slider',key:'vf',def:80,min:0,max:100,step:5,fmt:v=>v+'%',label:'Efectos',desc:'Volumen de los efectos: disparos, impactos, botones, avisos y pasar página.'},
 {tab:'vol',type:'note',desc:'Todavía no hay música; los efectos ya suenan.'},
 // {tab:'vol',type:'sfxt',label:'Probar sonidos'}, // pruebas de sonido ocultas: descomentar para volver a mostrarlas
 {tab:'gf',type:'toggle',key:'fps',def:false,label:'Mostrar FPS',desc:'Muestra en una esquina los fotogramas por segundo a los que va el juego (verde: 50 o más; amarillo: 30–49; rojo: menos de 30).'},
 {tab:'gf',type:'toggle',key:'fx',def:true,label:'Destellos de impacto y explosiones',desc:'Los círculos que se dibujan al impactar un proyectil o explotar un cañonazo.'},
 {tab:'ac',type:'toggle',key:'dpsx',def:true,label:'Tooltips de DPS avanzados',desc:'Al señalar el DPS de una torre, muestra también cómo se calcula.'},
 {tab:'ac',type:'toggle',key:'dabbr',def:false,label:'Abreviar números de daño grandes',desc:'1.000 se muestra como 1K, 1.000.000 como 1M, y así sucesivamente.'},
 {tab:'ac',type:'toggle',key:'dsci',def:false,label:'Notación científica en números de daño',desc:'A partir de 1.000.000, los números se muestran como 1,2e6. Tiene prioridad sobre la abreviatura.'},
 {tab:'ac',type:'slider',key:'delay',def:.6,min:.1,max:2,step:.05,fmt:v=>f(v)+' s',label:'Tiempo de apertura del panel de información',descT:'Lo que tarda en completarse la rueda de carga al mantener pulsado algo. Las palabras clave dentro de un panel usan un 58% de este tiempo.',desc:'Lo que tarda en completarse la rueda de carga al señalar algo. Las palabras clave dentro de un panel usan un 58% de este tiempo.'}];
const OTABS=[['jg','Juego','⚙️'],['kb','Atajos','⌨️'],['ps','Personalización','🎨'],['hs','Diálogos','💬'],['vol','Sonido','🔊'],['gf','Gráficos','🖥️'],['ac','Accesibilidad','♿'],['un','Desbloqueos','🔓']];
// icono y apartado de cada opción en la ventana de opciones
const OIC={kcap:'🔤',pm:'📌',fs:'⛶',dnum:'💥',hints:'💡',ptip:'🎯',ptipw:'🌀',treal:'🕒',tcomb:'⏱️',slow:'🐢',keys:'⌨️',reset:'🗑️',dspd:'✍️',dtype:'📝',dauto:'⏩',dwait:'⏳',dglitch:'📺',dbig:'🔠',cname:'🪪',u_tw:'🗼',u_hr:'🦸',u_rl:'💎',u_cs:'🎨',u_rd:'📅',u_cp:'📖',u_cpa:'📘',u_sec:'🕵️',vm:'🔊',vu:'🎵',vf:'💫',fps:'📈',fx:'✨',dpsx:'🧮',dabbr:'🔢',dsci:'🔬',delay:'⌛'};
const OSEC={kcap:'Interfaz',pm:'Interfaz',fs:'Interfaz',dnum:'Interfaz',keys:'Interfaz',hints:'Ayudas',slow:'Tiempo',ptip:'Ayudas',ptipw:'Ayudas',treal:'Tiempo',tcomb:'Tiempo'};
const oKey=o=>o.key||(o.type==='choice'&&o.tab==='jg'?'pm':o.type==='choice'&&o.tab==='hs'?'dspd':o.type);
// cada sección sale una sola vez: se ordenan las opciones de Juego por sección (las de otras pestañas no se mueven)
{const ord=['Interfaz','Ayudas','Tiempo'],rk=o=>{const s=OSEC[oKey(o)];return s?ord.indexOf(s):9;},pos=[],it=[];OPTS.forEach((o,i)=>{if(o.tab==='jg'){pos.push(i);it.push([o,i]);}});it.sort((x,y)=>rk(x[0])-rk(y[0])||x[1]-y[1]);pos.forEach((p,j)=>OPTS[p]=it[j][0]);}
const OPT={};OPTS.forEach(o=>{if(o.key)OPT[o.key]=o.def;});
// ==================== PERSONALIZACIÓN (cosméticos) ====================
const COSM={
 // encuadernaciones: sw = [cuero, papel]. Pergamino y Noche vienen de serie; el resto se desbloquea con logros
 pal:[{id:'perg',n:'Pergamino',def:1,sw:['#5a2e1c','#f6ecd3']},{id:'noche',n:'Noche',def:1,sw:['#1a1610','#2a2620']},{id:'amb',n:'Ámbar',ach:'curious',sw:['#15171d','#e8b04a']},{id:'esc',n:'Escarcha',ach:'zero',sw:['#2e4656','#eef4f6']},{id:'esm',n:'Esmeralda',ach:'jungle',sw:['#1e4433','#eef3e2']},{id:'crep',n:'Crepúsculo',ach:'thermal',sw:['#4a2140','#f8ece8']},{id:'volt',n:'Voltio',ach:'circuit',sw:['#141f45','#eef2fb']},{id:'alq',n:'Alquimia',ach:'bar',sw:['#2a1a3c','#f2f4e6']}],
 core:[{id:'base',n:'Cristal turquesa',def:1},{id:'gold',n:'Dorado',ach:'perfect'},{id:'ruby',n:'Rubí agrietado',ach:'close'},{id:'rune',n:'Rúnico',ach:'pure'},{id:'void',n:'Vacío',ach:'bhole'},{id:'drag',n:'Corazón de dragón',ach:'dragon'},{id:'mono',n:'Monolito',ach:'minimal'}],
 dec:[{id:'snow',n:'Pinos nevados',ach:'zero',ch:'n'},{id:'jung',n:'Selva',ach:'jungle',ch:'j'},{id:'farm',n:'Granja',ach:'pigs',ch:'k'},{id:'lamp',n:'Faroles',ach:'faro',ch:'l'},{id:'scrap',n:'Chatarra',ach:'cloink',ch:'g'},{id:'camp',n:'Campamento',ach:'party',ch:'e'},{id:'ruin',n:'Ruinas',ach:'nobuild',ch:'u'},{id:'gem',n:'Gemas',ach:'treasure',ch:'z'},{id:'tav',n:'Taberna',ach:'bowl',ch:'b'}]};
const CSKIND={pal:['📕','Encuadernación','Encuadernaciones'],core:['💠','Núcleo','Núcleos'],dec:['🌲','Decoración','Decoración'],frame:['🖼️','Marco de héroe','Marcos de héroe']};
const cosOwn=c=>!!(c.def||UNLOCK_ALL||OPT.u_cs||ACHS[c.ach]);
const cosOf=aid=>{const r=[];for(const k of['pal','core','dec'])for(const c of COSM[k])if(c.ach===aid)r.push([k,c]);return r;};
const decOn=id=>{const c=COSM.dec.find(d=>d.id===id);return !!c&&cosOwn(c)&&!(OPT.decoff||{})[id];};
const COL={bg2:'#14161c'};
try{document.fonts&&document.fonts.load('16px "Noto Color Emoji"','🪙🪨🪵🪶🪽🩸🪦🪺🫗🫠');}catch(e){}
function applyPal(){/* el mapa no usa la paleta: siempre el fondo de siempre */const p=COSM.pal.find(x=>x.id===OPT.pal);document.documentElement.dataset.pal=p&&cosOwn(p)?p.id:'perg';}
// victorias por héroe → marcos
let HWIN={};try{HWIN=JSON.parse(localStorage.getItem('rt-hwin'))||{};}catch(e){}
const FRT=[[10,3,'oro'],[5,2,'plata'],[1,1,'bronce']];
const hTier=id=>{const n=HWIN[id]||0;for(const[t,v]of FRT)if(n>=t)return v;return 0;};
const hTierN=v=>['','bronce','plata','oro'][v];
// nuevos desbloqueos pendientes de enseñar en el menú
let NEWU=[];try{NEWU=JSON.parse(localStorage.getItem('rt-newu'))||[];}catch(e){}
const saveNewu=()=>{try{localStorage.setItem('rt-newu',JSON.stringify(NEWU));}catch(e){}};
function newU(kind,ic,n,extra){NEWU.push({k:kind,ic,n,x:extra||''});saveNewu();}
function heroWinCount(){if(!S||S.tut||!S.hero||S.pvE)return;const id=S.hero.id,t0=hTier(id);HWIN[id]=(HWIN[id]||0)+1;try{localStorage.setItem('rt-hwin',JSON.stringify(HWIN));}catch(e){}
 const t1=hTier(id);if(t1>t0){const H=HEROES[id];newU('frame','🖼️','Marco de '+hTierN(t1)+' · '+H.n,(HWIN[id])+' victorias');toast(`🖼️ <b>Marco de ${hTierN(t1)} para ${H.n}</b><br><small>${HWIN[id]} victoria${HWIN[id]===1?'':'s'} con este héroe.</small>`);}}
function renderUnlocks(){if(!NEWU.length)return;const KL={tw:'Torres',hr:'Héroes',rl:'Reliquias',ux:'Funciones',pal:'Encuadernaciones',core:'Núcleos',dec:'Decoración del mapa',frame:'Marcos de héroe'};
 const g={};for(const u of NEWU)(g[u.k]=g[u.k]||[]).push(u);
 $('msetup').innerHTML='<h3>🔓 Nuevos desbloqueos</h3><div class="nug">'+Object.keys(KL).filter(k=>g[k]).map(k=>`<div class="nus"><b>${KL[k]}</b><div class="nul">${g[k].map(u=>`<div class="nui"><span>${u.ic}</span><div>${u.n}${u.x?`<small>${u.x}</small>`:''}</div></div>`).join('')}</div></div>`).join('')+
 '</div><small style="display:block;margin:4px 0 12px">Las encuadernaciones, los núcleos y la decoración se configuran en <b>Opciones → Personalización</b>.</small><button class="go" data-a="nuok">Continuar</button>';$('menu').classList.add('setup');NEWU=[];saveNewu();}
function cosmHTML(){const lockTxt=c=>c.def?'':cosOwn(c)?'':'🔒 '+achReq(c.ach);
 const pal=COSM.pal.map(c=>{const o=cosOwn(c),on=(OPT.pal||'perg')===c.id;return `<button class="csw${on?' on':''}${o?'':' lk'}" ${o?`data-a="cspal" data-v="${c.id}"`:'disabled'} title="${o?c.n:lockTxt(c).replace(/<[^>]+>/g,'')}"><i class="cswbk" style="background:linear-gradient(90deg,${c.sw[0]} 0 26%,${c.sw[1]} 26%);border-color:${c.sw[0]};box-shadow:inset 0 0 0 2px ${c.sw[0]},inset 0 0 0 3px color-mix(in srgb,${c.sw[1]} 60%,${c.sw[0]})"></i><span>${o?c.n:'🔒 ???'}</span></button>`;}).join('');
 const core=COSM.core.map(c=>{const o=cosOwn(c),on=(OPT.core||'base')===c.id;return `<button class="csw${on?' on':''}${o?'':' lk'}" ${o?`data-a="cscore" data-v="${c.id}"`:'disabled'} title="${o?c.n:lockTxt(c).replace(/<[^>]+>/g,'')}"><canvas width="44" height="44" data-core="${c.id}"></canvas><span>${o?c.n:'🔒 ???'}</span></button>`;}).join('');
 const dec=COSM.dec.map(c=>{const o=cosOwn(c),on=o&&!(OPT.decoff||{})[c.id];return `<button class="csw cdec${on?' on':''}${o?'':' lk'}" ${o?`data-a="csdec" data-v="${c.id}" aria-pressed="${on}"`:'disabled'} title="${o?c.n+(on?' · activada':' · apagada'):lockTxt(c).replace(/<[^>]+>/g,'')}"><canvas width="44" height="44" data-dec="${c.ch}"></canvas><span>${o?c.n:'🔒 ???'}</span><em>${o?(on?'Activada':'Apagada'):''}</em></button>`;}).join('');
 const fr=Object.keys(HEROES).filter(h=>UNLOCK_ALL||heroVis(h)).map(id=>{const t=hTier(id),n=HWIN[id]||0,nx=FRT.slice().reverse().find(([a])=>n<a);return `<div class="frw"><span class="hfr fr${t}" style="background:${HEROES[id].col}">${portrait(id,1)}</span><div><b>${HEROES[id].n}</b><small>${n} victoria${n===1?'':'s'}${t?' · marco de '+hTierN(t):''}${nx?' · siguiente marco a las '+nx[0]:''}</small></div></div>`;}).join('');
 return `<div class="orow"><div>Encuadernación</div><div class="cswr">${pal}</div></div><div class="orow"><div>Núcleo</div><div class="cswr">${core}</div></div><div class="orow"><div>Decoración del mapa</div><small>Las decoraciones aparecen al azar en las piezas nuevas. Pulsa una para activarla o apagarla.</small><div class="cswr">${dec}</div></div><div class="orow"><div>Marcos de héroe</div><small>Se consiguen solos al ganar con cada héroe: bronce con 1 victoria, plata con 5 y oro con 10.</small><div class="frl">${fr}</div></div>`;}
function cosmPaint(){document.querySelectorAll('#comp canvas[data-core]').forEach(cv=>{const g=cv.getContext('2d');g.clearRect(0,0,44,44);g.fillStyle='#22301f';g.fillRect(0,0,44,44);drawCore(g,22,22,30,cv.dataset.core);});
 document.querySelectorAll('#comp canvas[data-dec]').forEach(cv=>{const g=cv.getContext('2d');g.clearRect(0,0,44,44);g.fillStyle='#2b3d29';g.fillRect(0,0,44,44);drawObs(g,cv.dataset.dec,4,4,36);});}
// núcleo
function drawCore(g,cx,cy,b,skin){skin=skin||OPT.core||'base';const c=COSM.core.find(x=>x.id===skin);if(!c||!cosOwn(c))skin='base';const t=(typeof performance!=='undefined'?performance.now():0)/1000,h=b*.35;
 const sq=(col,s)=>{g.fillStyle=col;g.fillRect(cx-s,cy-s,s*2,s*2);};
 if(skin==='base'){sq('#3dd6c4',h);return;}
 if(skin==='gold'){sq('#c8961e',h);sq('#f1c84b',h*.78);g.fillStyle='rgba(255,255,255,.55)';g.fillRect(cx-h*.6,cy-h*.6,h*.5,h*.22);return;}
 if(skin==='ruby'){sq('#8e1b2c',h);sq('#d23a52',h*.78);g.strokeStyle='#4a0a14';g.lineWidth=Math.max(1,b*.04);g.beginPath();g.moveTo(cx-h*.5,cy-h*.7);g.lineTo(cx-h*.1,cy-h*.1);g.lineTo(cx+h*.2,cy+h*.05);g.lineTo(cx+h*.5,cy+h*.7);g.moveTo(cx-h*.1,cy-h*.1);g.lineTo(cx-h*.6,cy+h*.3);g.stroke();return;}
 if(skin==='rune'){sq('#2a3b7a',h);sq('#4a64c8',h*.7);g.save();g.translate(cx,cy);g.rotate(t*.8);g.strokeStyle='#9fd0ff';g.lineWidth=Math.max(1,b*.04);g.beginPath();g.arc(0,0,h*1.25,0,7);g.stroke();for(let i=0;i<4;i++){g.rotate(Math.PI/2);g.beginPath();g.moveTo(h*1.25,-h*.15);g.lineTo(h*1.4,0);g.lineTo(h*1.25,h*.15);g.stroke();}g.restore();return;}
 if(skin==='void'){g.fillStyle='#0a0710';g.beginPath();g.arc(cx,cy,h*1.05,0,7);g.fill();g.strokeStyle=`rgba(170,110,255,${.6+.3*Math.sin(t*2)})`;g.lineWidth=Math.max(1.5,b*.07);g.beginPath();g.ellipse(cx,cy,h*1.45,h*.55,-.4,0,7);g.stroke();return;}
 if(skin==='drag'){const p=1+.08*Math.sin(t*4);sq('#5a1010',h);g.fillStyle='#e0402a';g.beginPath();g.arc(cx,cy,h*.62*p,0,7);g.fill();g.fillStyle='#ffb050';g.beginPath();g.arc(cx,cy,h*.3*p,0,7);g.fill();return;}
 if(skin==='mono'){g.fillStyle='#5c5f66';g.fillRect(cx-h*.65,cy-h*1.15,h*1.3,h*2.3);g.fillStyle='#7d8088';g.fillRect(cx-h*.65,cy-h*1.15,h*.35,h*2.3);return;}
 sq('#3dd6c4',h);}
// decoración nueva
const DSTAMPS=[{lot:'snow',w:1.5,ch:'n',a:2,b:4},{lot:'jung',w:1.5,ch:'j',a:2,b:4},{lot:'farm',w:1.2,ch:'F',a:2,b:3,x:'k'},{lot:'lamp',w:1,ch:'l',a:1,b:2},{lot:'scrap',w:1,ch:'g',a:1,b:2},{lot:'camp',w:1,ch:'e',a:1,b:1,x:'f'},{lot:'ruin',w:1.2,ch:'u',a:1,b:3},{lot:'gem',w:1,ch:'z',a:1,b:2},{lot:'tav',w:1,ch:'b',a:1,b:2}];
function drawDeco2(c,ch,x,y,s){const h=((x*73+y*151)|0)%5,X=f=>x+s*f,Y=f=>y+s*f,L=Math.max(1,s*.04);
 if(ch==='n'){c.fillStyle='#5a3c22';c.fillRect(X(.45),Y(.68),s*.1,s*.2);c.fillStyle='#24543a';c.beginPath();c.moveTo(X(.5),Y(.12));c.lineTo(X(.8),Y(.72));c.lineTo(X(.2),Y(.72));c.closePath();c.fill();c.fillStyle='#f2f6fa';c.beginPath();c.moveTo(X(.5),Y(.12));c.lineTo(X(.62),Y(.36));c.lineTo(X(.38),Y(.36));c.closePath();c.fill();c.fillRect(X(.28),Y(.66),s*.44,s*.06);return;}
 if(ch==='j'){c.fillStyle='#1f6b33';for(let i=0;i<4;i++){c.save();c.translate(X(.5),Y(.7));c.rotate(-1.1+i*.7);c.beginPath();c.ellipse(0,-s*.22,s*.08,s*.26,0,0,7);c.fill();c.restore();}if(h<2){c.fillStyle='#e8e0d0';c.fillRect(X(.68),Y(.68),s*.05,s*.12);c.fillStyle='#d23a3a';c.beginPath();c.arc(X(.705),Y(.68),s*.09,Math.PI,0);c.fill();}return;}
 if(ch==='k'){c.strokeStyle='#6a4a2a';c.lineWidth=Math.max(1,s*.06);c.beginPath();c.moveTo(X(.5),Y(.88));c.lineTo(X(.5),Y(.3));c.moveTo(X(.25),Y(.45));c.lineTo(X(.75),Y(.45));c.stroke();c.fillStyle='#c9a24a';c.beginPath();c.arc(X(.5),Y(.25),s*.1,0,7);c.fill();c.fillStyle='#5a3c22';c.fillRect(X(.38),Y(.13),s*.24,s*.05);c.fillStyle='#8a5a8a';c.fillRect(X(.4),Y(.42),s*.2,s*.2);return;}
 if(ch==='l'){c.strokeStyle='#3a3a40';c.lineWidth=Math.max(1,s*.05);c.beginPath();c.moveTo(X(.5),Y(.9));c.lineTo(X(.5),Y(.35));c.stroke();const gr=c.createRadialGradient(X(.5),Y(.3),1,X(.5),Y(.3),s*.35);gr.addColorStop(0,'rgba(255,220,120,.55)');gr.addColorStop(1,'rgba(255,220,120,0)');c.fillStyle=gr;c.beginPath();c.arc(X(.5),Y(.3),s*.35,0,7);c.fill();c.fillStyle='#ffd870';c.fillRect(X(.43),Y(.24),s*.14,s*.14);c.fillStyle='#3a3a40';c.fillRect(X(.4),Y(.2),s*.2,s*.05);return;}
 if(ch==='g'){const gear=(gx,gy,r,col)=>{c.fillStyle=col;c.beginPath();c.arc(gx,gy,r,0,7);c.fill();for(let i=0;i<8;i++){const a=i*Math.PI/4;c.fillRect(gx+Math.cos(a)*r-s*.03,gy+Math.sin(a)*r-s*.03,s*.06,s*.06);}c.fillStyle='#2b3d29';c.beginPath();c.arc(gx,gy,r*.35,0,7);c.fill();};gear(X(.4),Y(.58),s*.18,'#7d7a72');gear(X(.65),Y(.42),s*.12,'#9a6a3a');return;}
 if(ch==='e'){const col=['#b0453a','#3a6ab0','#c9a24a','#4a8a4a','#8a4ab0'][h];c.fillStyle=col;c.beginPath();c.moveTo(X(.5),Y(.2));c.lineTo(X(.85),Y(.8));c.lineTo(X(.15),Y(.8));c.closePath();c.fill();c.fillStyle='rgba(0,0,0,.35)';c.beginPath();c.moveTo(X(.5),Y(.45));c.lineTo(X(.6),Y(.8));c.lineTo(X(.4),Y(.8));c.closePath();c.fill();c.strokeStyle='#5a3c22';c.lineWidth=L;c.beginPath();c.moveTo(X(.5),Y(.2));c.lineTo(X(.5),Y(.08));c.stroke();return;}
 if(ch==='f'){c.strokeStyle='#5a3c22';c.lineWidth=Math.max(1,s*.07);c.beginPath();c.moveTo(X(.3),Y(.75));c.lineTo(X(.7),Y(.6));c.moveTo(X(.3),Y(.6));c.lineTo(X(.7),Y(.75));c.stroke();c.fillStyle='#ff8a2a';c.beginPath();c.moveTo(X(.5),Y(.3));c.quadraticCurveTo(X(.68),Y(.55),X(.5),Y(.68));c.quadraticCurveTo(X(.32),Y(.55),X(.5),Y(.3));c.fill();c.fillStyle='#ffd870';c.beginPath();c.arc(X(.5),Y(.58),s*.07,0,7);c.fill();return;}
 if(ch==='u'){c.fillStyle='#b8b2a2';if(h<3){c.fillRect(X(.38),Y(.35),s*.24,s*.5);c.fillStyle='#d2ccbc';c.beginPath();c.moveTo(X(.34),Y(.35));c.lineTo(X(.66),Y(.28));c.lineTo(X(.66),Y(.36));c.lineTo(X(.34),Y(.4));c.closePath();c.fill();c.fillStyle='#8a8576';c.fillRect(X(.3),Y(.82),s*.4,s*.06);}else{c.fillRect(X(.4),Y(.4),s*.2,s*.45);c.beginPath();c.arc(X(.5),Y(.32),s*.11,0,7);c.fill();c.fillStyle='#8a8576';c.fillRect(X(.32),Y(.82),s*.36,s*.06);}return;}
 if(ch==='z'){c.fillStyle='#62656e';c.beginPath();c.ellipse(X(.5),Y(.65),s*.3,s*.18,0,0,7);c.fill();const cr=(bx,top,col)=>{c.fillStyle=col;c.beginPath();c.moveTo(bx-s*.06,Y(.62));c.lineTo(bx,top);c.lineTo(bx+s*.06,Y(.62));c.closePath();c.fill();};cr(X(.42),Y(.3),h%2?'#7fe0f0':'#c07fff');cr(X(.56),Y(.38),h%2?'#b0f4ff':'#e0b0ff');return;}
 if(ch==='b'){const bar=(bx,by)=>{c.fillStyle='#8a5a2a';c.beginPath();c.ellipse(bx,by,s*.13,s*.17,0,0,7);c.fill();c.strokeStyle='#3a2a1a';c.lineWidth=L;c.beginPath();c.moveTo(bx-s*.13,by-s*.06);c.lineTo(bx+s*.13,by-s*.06);c.moveTo(bx-s*.13,by+s*.06);c.lineTo(bx+s*.13,by+s*.06);c.stroke();};if(h<3){bar(X(.38),Y(.6));bar(X(.64),Y(.62));}else{c.fillStyle='#7a5230';c.fillRect(X(.22),Y(.45),s*.56,s*.22);c.fillStyle='#3a2a1a';c.beginPath();c.arc(X(.32),Y(.72),s*.08,0,7);c.arc(X(.68),Y(.72),s*.08,0,7);c.fill();}return;}}

try{Object.assign(OPT,JSON.parse(localStorage.getItem('rt-opts'))||{});}catch(e){}
const saveOpt=()=>{try{localStorage.setItem('rt-opts',JSON.stringify(OPT));}catch(e){}};
// Opciones por dispositivo: dev:'touch' solo en móvil/tablet, dev:'pc' solo con ratón, show:()=>bool para condiciones extra; descT sustituye a desc en táctil.
const optVis=o=>!(o.dev==='touch'&&!TOUCH||o.dev==='pc'&&TOUCH||o.show&&!o.show());
const OP={open:false,tab:'jg'};
// cuerpo de la pestaña actual: filas (en el libro, sin la descripción: va en la página derecha)
function optBody(book){
 const inG=!document.body.classList.contains('inmenu');
 const d=o=>{const t=TOUCH&&o.descT?o.descT:o.desc;return t&&!book?`<small>${t}</small>`:'';},ic=o=>{const k=oKey(o);return OIC[k]?`<span class="oic">${OIC[k]}</span>`:'';};
 let sec='',danger='';
 const R=(o,i,cls,inner)=>`<div class="orow otg${cls}" data-ok="${oKey(o)}" data-oi="${i}">${inner}</div>`;
 const body=OPTS.map((o,i)=>{if(o.tab!==OP.tab||!optVis(o))return '';const k=oKey(o),sh=OP.tab==='jg'&&OSEC[k]&&OSEC[k]!==sec?(sec=OSEC[k],`<h3 class="osec">${sec}</h3>`):'';
  if(o.type==='toggle')return sh+R(o,i,'',`${ic(o)}<div class="otl"><div>${o.label}</div>${d(o)}</div><button class="sw${OPT[o.key]?' on':''}" role="switch" aria-checked="${!!OPT[o.key]}" aria-label="${o.label}" data-a="opt" data-i="${i}"><i></i></button>`);
  if(o.type==='slider')return sh+R(o,i,' osl',`${ic(o)}<div class="otl"><div>${o.label}</div>${d(o)}</div><label class="osr"><input type="range" data-o="${i}" min="${o.min}" max="${o.max}" step="${o.step}" value="${OPT[o.key]}"><output>${o.fmt(OPT[o.key])}</output></label>`);
  if(o.type==='cname')return sh+(STO.name?R(o,i,'',`${ic(o)}<div class="otl"><div>${o.label}</div>${book?'':'<small>Cómo te llama ÉTER.</small>'}</div><div class="ocn"><input id="cname" maxlength="16" value="${escH(STO.name)}"><button data-a="sname">Guardar</button></div>`):R(o,i,'',`${ic(o)}<div class="otl"><div>${o.label}</div><small>ÉTER aún no recuerda tu nombre. Sigue jugando…</small></div>`));
  if(o.type==='reset'){danger=`<div class="odanger"><div><b>⚠️ ${o.label}</b>${d(o)}</div><button data-a="preset" class="${OP.rst?'warn':''}">${OP.rst?'¿Seguro? Pulsa otra vez':'Borrar…'}</button></div>`;return '';}
  if(o.type==='cosm')return cosmHTML();
  if(o.type==='keys')return kbHTML();
  if(o.type==='sfxt')return `<div class="orow"><div>${o.label}</div>${sfxTestHTML()}</div>`;
  if(o.type==='choice')return sh+R(o,i,' och',`${ic(o)}<div class="otl"><div>${o.label}</div>${d(o)}</div><div class="oseg">${o.choices.map(([v,l])=>`<button class="${o.get()===v?'on':''}" data-a="optc" data-i="${i}" data-v="${v}">${l}</button>`).join('')}</div>`);
  return `<div class="orow onote">ℹ️ ${(TOUCH&&o.descT)||o.desc||''}</div>`;}).join('');
 return {body,danger,inG};
}
// página derecha: ficha de la opción señalada (o la descripción de la pestaña)
const LBOPTXT={jg:'Ajustes generales del juego. Señala una opción para leer qué hace.',kb:'Pulsa la tecla de un atajo y luego la nueva tecla. La columna Alternativa admite una segunda tecla; Supr la borra. Las teclas de Menús mueven el marco dorado por los menús.',ps:'Encuadernaciones (cuero, remates y papel del libro), núcleos y decoración que vas desbloqueando al jugar. Lo que aún no tienes sale con candado.',hs:'Cómo se muestran los diálogos de la historia.',vol:'Volumen y sonidos. Pulsa un sonido para escucharlo; si tiene variantes, la última que pruebes es la que se queda.',gf:'Rendimiento y calidad gráfica.',ac:'Ayudas de lectura y accesibilidad.',un:'Atajos para desbloquear contenido sin jugar, pensados para probar el juego. Lo que desbloquees así no cuenta como progreso.'};
function optDetail(o){const T=OTABS.find(t=>t[0]===OP.tab)||OTABS[0];
 if(!o)return `<div class="lbdet"><span class="lbdic">${T[2]}</span><h4>${T[1]}</h4><p>${LBOPTXT[OP.tab]||''}</p></div>`;
 const k=oKey(o),desc=(TOUCH&&o.descT)||o.desc||'';let cur='';
 if(o.type==='toggle')cur=OPT[o.key]?'Activado':'Desactivado';else if(o.type==='slider')cur=o.fmt(OPT[o.key]);else if(o.type==='choice'){const c=o.choices.find(([v])=>v===o.get());cur=c?c[1]:'';}else if(o.type==='reset')cur='';
 return `<div class="lbdet"><span class="lbdic">${OIC[k]||T[2]}</span><h4>${o.label}</h4><p>${desc}</p>${cur?`<div class="lbcur">Ahora: <b>${cur}</b></div>`:''}</div>`;}
function optParts(){const {body,danger,inG}=optBody(true),T=OTABS.find(t=>t[0]===OP.tab)||OTABS[0];
 const o=LB.op!=null&&OPTS[LB.op]&&OPTS[LB.op].tab===OP.tab&&optVis(OPTS[LB.op])?OPTS[LB.op]:null;
 const marks={list:OTABS.filter(t=>t[0]!=='kb'||!TOUCH).map(([v,l,i])=>[v,l,i]),cur:OP.tab,act:'otab'};
 const left=`<h3>Opciones</h3><div class="bksub">${T[2]} ${T[1]} · ${inG?'el juego está en pausa':'los cambios se guardan solos'}</div><div class="lbopts">${body}${danger}</div>`;
 return {marks,left,right:optDetail(o),key:'op'+OP.tab,after:()=>{if(OP.tab==='ps'&&typeof cosmPaint==='function')cosmPaint();}};
}
function renderOpts(){if(typeof LB!=='undefined'&&LB.open&&LB.area==='op'&&typeof lbRender==='function')lbRender();}
