// Para añadir una opción basta una línea aquí: tab, type (toggle | slider | choice | note), key, def, label y desc.
const OPTS=[
 {tab:'gf',type:'toggle',key:'hpbar',def:true,label:'Barras de vida de los enemigos',desc:'La barrita verde sobre cada enemigo. Desactívala si prefieres ver el mapa más limpio (las barras de los jefes siguen saliendo).'},
 {tab:'gf',type:'choice',dev:'pc',label:'Posición del panel de información',desc:'Dónde aparece la ficha con los datos de lo que señalas: fija a la derecha, fija a la izquierda o junto al propio elemento.',get:()=>PM,set:v=>setPM(v),choices:[['right','Derecha'],['left','Izquierda'],['near','Junto al elemento']]},
 {tab:'gf',type:'toggle',key:'fs',def:true,dev:'touch',show:()=>FSOK,label:'Pantalla completa al empezar partida',desc:'Al pulsar Nueva partida, el juego ocupa toda la pantalla y se queda en horizontal. Siempre puedes entrar o salir con el botón de las cuatro esquinas, junto al zoom.'},
 {tab:'gf',type:'toggle',key:'kcap',def:true,dev:'pc',label:'Teclas sobre los botones',desc:'Muestra encima de los botones del héroe y de las reliquias la tecla que los activa (las que tengas puestas en Atajos).'},
 {tab:'gf',type:'toggle',key:'emap',def:true,label:'Enemigos en el mapa',desc:'Durante la oleada, un panel arriba a la izquierda muestra cuántos enemigos de cada tipo hay en el mapa, cuántos llevas eliminados y cuántos quedan por salir.'},
 {tab:'jg',type:'toggle',key:'autoB',def:false,label:'Habilidad básica automática',desc:'El héroe usa su habilidad básica él solo en cuanto está lista, sobre el grupo de enemigos más grande que tenga cerca. Atajo en partida: clic derecho (o mantener pulsado) sobre el botón de la habilidad.'},
 {tab:'jg',type:'toggle',key:'autoU',def:false,label:'Definitiva automática',desc:'El héroe usa su definitiva él solo en cuanto está lista, sobre el grupo de enemigos más grande que tenga cerca. Atajo en partida: clic derecho (o mantener pulsado) sobre el botón de la definitiva.'},
 {tab:'gf',type:'toggle',key:'tmin',def:false,label:'Tiempos en minutos',desc:'Muestra las recargas largas como «1 min 30 s» en lugar de «90 s».'},
 {tab:'jg',type:'toggle',key:'ffwd',def:true,label:'Avance rápido automático',desc:'Desde la ronda 5, mientras ningún enemigo esté al alcance de tus torres ni de tu héroe, el juego va a ×3. En cuanto el primero entra en rango, vuelve a tu velocidad.'},
 {tab:'gf',type:'toggle',key:'dnum',def:true,label:'Números de daño',desc:'Muestra el daño que reciben los enemigos. Los golpes seguidos se suman en un solo número, con el color de su tipo de daño; los críticos salen más grandes y con «!». Debajo puedes elegir el estilo y qué números se muestran.'},
 {tab:'gf',type:'choice',label:'Estilo de los números',desc:'Salto lateral: cada golpe salta en arco hacia fuera del camino. Al costado: el contador sigue al enemigo por fuera del camino. Encima: sobre el enemigo, como antes.',get:()=>OPT.dnst||'jump',set:v=>{OPT.dnst=v;saveOpt();},choices:[['jump','Salto lateral'],['side','Al costado'],['over','Encima']],dep:'dnum'},
 {tab:'gf',type:'choice',label:'Números en qué enemigos',desc:'Todos; solo los importantes (élites, jefes y los fuertes de cada escuadra: ogros, tamborileros, portadores de sellos, chamanes, súcubos, gárgolas); o solo los jefes.',get:()=>OPT.dnwho||'all',set:v=>{OPT.dnwho=v;saveOpt();},choices:[['all','Todos'],['imp','Importantes'],['boss','Jefes']],dep:'dnum'},
 {tab:'gf',type:'choice',label:'Qué golpes',desc:'Todos los golpes, o solo los críticos y los golpes grandes (al menos un 8% de la vida del enemigo).',get:()=>OPT.dnhit||'all',set:v=>{OPT.dnhit=v;saveOpt();},choices:[['all','Todos'],['big','Críticos y grandes']],dep:'dnum'},
 {tab:'gf',type:'choice',label:'Opacidad de los números',desc:'Lo opacos que se ven los números de daño.',get:()=>String(OPT.dnop||1),set:v=>{OPT.dnop=+v;saveOpt();},choices:[['1','100%'],['0.75','75%'],['0.5','50%']],dep:'dnum'},
 {tab:'gf',type:'choice',label:'Tamaño de los números',desc:'El tamaño de los números de daño.',get:()=>OPT.dnsz||'n',set:v=>{OPT.dnsz=v;saveOpt();},choices:[['s','Pequeño'],['n','Normal'],['l','Grande']],dep:'dnum'},
 {tab:'jg',type:'toggle',key:'hints',def:true,label:'Pistas',desc:'La primera vez que pasa algo nuevo (un enemigo con armadura, un cofre, una reliquia…), una pista corta te lo explica. Si sale en plena oleada, el juego frena poco a poco hasta pararse. Cada pista sale una sola vez.'},
 {tab:'gf',type:'toggle',key:'ptip',def:false,show:()=>false,label:'Tooltips de portales abiertos en fase de construcción',desc:'Durante la fase de construcción, los bocadillos con las escuadras de cada portal se quedan siempre abiertos, sin tener que pasar el ratón por encima.',descT:'Durante la fase de construcción, los bocadillos con las escuadras de cada portal se quedan siempre abiertos, sin tener que tocarlos.'},
 {tab:'gf',type:'toggle',key:'ptipw',def:false,show:()=>false,label:'Tooltips de portales abiertos en fase de combate',desc:'Durante la oleada, cada portal muestra siempre la escuadra que está saliendo y la siguiente. Al pasar el ratón por encima ves todo lo que le queda por salir.',descT:'Durante la oleada, cada portal muestra siempre la escuadra que está saliendo y la siguiente. Al tocarlo ves todo lo que le queda por salir.'},
 {tab:'gf',type:'toggle',key:'treal',def:false,label:'Mostrar tiempo real',desc:'Muestra arriba el tiempo real que llevas de partida, contando todo: pausas, menús y lo que tardes en pensar.'},
 {tab:'gf',type:'toggle',key:'tcomb',def:false,label:'Mostrar tiempo de combate',desc:'Muestra arriba el tiempo de juego: solo avanza con el juego en marcha y va al ritmo de la velocidad (a ×2 cuenta el doble de rápido; en pausa se detiene).'},
 {tab:'jg',type:'toggle',key:'slow',def:true,label:'Ralentizar el juego al consultar información',desc:'Al mantener el ratón sobre un elemento o un panel, el juego baja hasta ×0,25.',descT:'Al mantener pulsado un elemento o mientras tienes un panel abierto, el juego baja hasta ×0,25.'},
 {tab:'hs',type:'choice',label:'Velocidad de escritura',desc:'A qué ritmo aparecen las letras en los diálogos de la historia. Puedes pulsar en cualquier momento para ver la frase entera.',get:()=>OPT.dspd||'n',set:v=>{OPT.dspd=v;saveOpt();},choices:[['l','Lenta'],['n','Normal'],['r','Rápida']]},
 {tab:'hs',type:'toggle',key:'dtype',def:true,label:'Efecto máquina de escribir',desc:'El texto de los diálogos aparece letra a letra. Desactivado, aparece de golpe.'},
 {tab:'hs',type:'toggle',key:'dauto',def:false,label:'Avance automático',desc:'Los diálogos pasan solos tras una pausa, sin tener que pulsar.'},
 {tab:'hs',type:'slider',key:'dwait',def:2,min:1,max:5,step:.1,fmt:v=>String(v).replace('.',',')+' s',label:'Pausa del avance automático',desc:'Lo que espera cada diálogo, además de un poco más cuanto más largo es el texto.'},
 {tab:'hs',type:'toggle',key:'dglitch',def:true,label:'Efectos de fallo de ÉTER',desc:'Caracteres corruptos y parpadeos mientras el núcleo está dañado. Desactívalo si te molestan o usas lector de pantalla.'},
 {tab:'hs',type:'toggle',key:'eter',def:true,label:'ÉTER habla en partida',desc:'De vez en cuando, ÉTER comenta lo que pasa desde el núcleo con un bocadillo corto: al ganar una oleada sin daños, cuando se cuela un enemigo, al ver un jefe… No para el juego.'},
 {tab:'hs',type:'toggle',key:'dbig',def:false,label:'Texto de diálogos grande',desc:'Letra más grande en los diálogos de la historia, para leerlos con más comodidad.'},
 {tab:'hs',type:'cname',label:'Nombre del capitán'},
 {tab:'un',type:'note',desc:'Para quien quiera probarlo todo sin pasar por el progreso: streaming, pruebas o simplemente jugar a tu aire. Cada sección se puede desactivar cuando quieras: vuelve a bloquearse lo que no hayas conseguido jugando. Los logros siguen funcionando con normalidad.'},
 {tab:'un',type:'toggle',key:'u_tw',def:false,label:'Desbloquear todas las torres',desc:'Todas las torres pueden salirte en las ofertas desde la primera partida.'},
 {tab:'un',type:'toggle',key:'u_hr',def:false,label:'Desbloquear todos los héroes',desc:'Todos los héroes disponibles en la selección, junto con las torres de sus mazos.'},
 {tab:'kb',type:'keys'},
 {tab:'jg',type:'reset',label:'Borrar progreso',desc:'Borra todo lo que has conseguido y descubierto: compendio, logros, récords y victorias de héroe, rondas, tutoriales, historia y tu nombre para ÉTER, los desbloqueos y la personalización (paletas, núcleos y decoraciones). Se mantienen el sonido, los atajos y tus preferencias de interfaz. No se puede deshacer.'},
 {tab:'un',type:'toggle',key:'u_rl',def:false,label:'Desbloquear todas las reliquias',desc:'Las reliquias que dependen de un logro también pueden salir en los cofres.'},
 {tab:'un',type:'toggle',key:'u_era',def:false,label:'Desbloquear todas las eras',desc:'La Era Distópica (Ruinas de Neón) disponible sin haber reparado a ÉTER.'},
 {tab:'un',type:'toggle',key:'u_cs',def:false,label:'Desbloquear toda la personalización',desc:'Encuadernaciones, núcleos y decoraciones disponibles sin conseguir sus logros.'},
 {tab:'ps',type:'cosm'},
 {tab:'un',type:'toggle',key:'u_rd',def:false,label:'Desbloquear todas las duraciones de partida',desc:'Puedes elegir partidas de 15 a 30 rondas desde el principio.'},
 {tab:'un',type:'toggle',key:'u_cpa',def:false,label:'Abrir el Compendio',desc:'Solo da acceso al Compendio, como al conseguir Mente curiosa: verás lo que hayas descubierto y el resto en sombra.'},
 {tab:'un',type:'toggle',key:'u_cp',def:false,label:'Compendio completo',desc:'Desbloquea el Compendio y muestra todas sus entradas, incluidos los niveles secretos de las torres de evento.'},
 {tab:'un',type:'toggle',key:'u_sec',def:false,label:'Revelar logros secretos',desc:'Muestra la descripción de los logros ocultos.'},
 {tab:'vol',type:'slider',key:'vm',def:80,min:0,max:100,step:1,fmt:v=>v+'%',label:'Volumen general',desc:'Volumen de todo el sonido del juego. Los otros dos se aplican sobre este.'},
 {tab:'vol',type:'slider',key:'vu',def:60,min:0,max:100,step:1,fmt:v=>v+'%',label:'Música',desc:'Volumen de la música de fondo. Empieza a sonar con el primer clic o tecla y vuelve a empezar al terminar.'},
 {tab:'vol',type:'slider',key:'vf',def:80,min:0,max:100,step:1,fmt:v=>v+'%',label:'Efectos',desc:'Volumen de los efectos: disparos, impactos, botones, avisos y pasar página.'},
 {tab:'vol',type:'slider',key:'fq_coin',def:100,min:0,max:100,step:1,fmt:v=>v?v+'%':'Nunca',label:'Frecuencia · oro por baja',desc:'Cuántas veces suena la moneda al matar a un enemigo. Al 100% suena siempre (con un pequeño límite para que no se amontone); más bajo, solo algunas veces.'},
 {tab:'vol',type:'slider',key:'fq_kill',def:100,min:0,max:100,step:1,fmt:v=>v?v+'%':'Nunca',label:'Frecuencia · bajas',desc:'Cuántas veces suena la muerte de los enemigos. Los jefes suenan siempre.'},
 {tab:'vol',type:'slider',key:'fq_hit',def:100,min:0,max:100,step:1,fmt:v=>v?v+'%':'Nunca',label:'Frecuencia · ataques',desc:'Cuántas veces suenan los disparos e impactos de torres, unidades y héroe.'},
 {tab:'vol',type:'sfxt',label:'Probar sonidos',desc:'Escucha cada sonido. Donde hay varias versiones (Nuevo / Actual), la marcada es la que suena en el juego: pulsa otra para cambiarla.'},
 {tab:'gf',type:'toggle',key:'fps',def:false,label:'Mostrar FPS',desc:'Muestra en una esquina los fotogramas por segundo a los que va el juego (verde: 50 o más; amarillo: 30–49; rojo: menos de 30).'},
 {tab:'gf',type:'toggle',key:'fx',def:true,label:'Destellos de impacto y explosiones',desc:'Los círculos que se dibujan al impactar un proyectil o explotar un cañonazo.'},
 {tab:'ac',type:'toggle',key:'dpsx',def:true,label:'Tooltips de DPS avanzados',desc:'Al señalar el DPS de una torre, muestra también cómo se calcula.'},
 {tab:'ac',type:'toggle',key:'dabbr',def:false,label:'Abreviar números de daño grandes',desc:'1.000 se muestra como 1K, 1.000.000 como 1M, y así sucesivamente.'},
 {tab:'ac',type:'toggle',key:'dsci',def:false,label:'Notación científica en números de daño',desc:'A partir de 1.000.000, los números se muestran como 1,2e6. Tiene prioridad sobre la abreviatura.'},
 {tab:'ac',type:'slider',key:'delay',def:.6,min:.1,max:2,step:.01,fmt:v=>f(v)+' s',label:'Tiempo de apertura del panel de información',descT:'Lo que tarda en completarse la rueda de carga al mantener pulsado algo. Las palabras clave dentro de un panel usan un 58% de este tiempo.',desc:'Lo que tarda en completarse la rueda de carga al señalar algo. Las palabras clave dentro de un panel usan un 58% de este tiempo.'}];
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
 core:[{id:'base',n:'Cristal turquesa',def:1},{id:'gold',n:'Dorado',ach:'perfect'},{id:'ruby',n:'Rubí agrietado',ach:'close'},{id:'rune',n:'Rúnico',ach:'pure'},{id:'void',n:'Vacío',ach:'bhole'},{id:'drag',n:'Corazón de dragón',ach:'dragon'},{id:'mono',n:'Monolito',ach:'minimal'},{id:'bast',n:'Bastión',ach:'rear'},{id:'diam',n:'Diamante',ach:'clean'}]/* «Prisma» (CSK.prism) queda preparado para un logro futuro */,
 dec:[{id:'snow',n:'Pinos nevados',ach:'zero',ch:'n'},{id:'jung',n:'Selva',ach:'jungle',ch:'j'},{id:'farm',n:'Granja',ach:'pigs',ch:'k'},{id:'lamp',n:'Faroles',ach:'faro',ch:'l'},{id:'scrap',n:'Chatarra',ach:'cloink',ch:'g'},{id:'camp',n:'Campamento',ach:'party',ch:'e'},{id:'ruin',n:'Ruinas',ach:'rear',ch:'u'},{id:'gem',n:'Gemas',ach:'treasure',ch:'z'},{id:'tav',n:'Taberna',ach:'bowl',ch:'b'}]};
const CSKIND={pal:['📕','Encuadernación','Encuadernaciones'],core:['💠','Núcleo','Núcleos'],dec:['🌲','Decoración','Decoración'],frame:['🖼️','Marco de héroe','Marcos de héroe']};
const cosOwn=c=>!!(c.def||UNLOCK_ALL||OPT.u_cs||ACHS[c.ach]);
const cosOf=aid=>{const r=[];for(const k of['pal','core','dec','path','tfr','fx'])for(const c of COSM[k]||[])if(c.ach===aid)r.push([k,c]);return r;};
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
function newU(kind,ic,n,extra,id){NEWU.push({k:kind,ic,n,x:extra||'',id:id||null});saveNewu();}
function heroWinCount(){if(!S||S.tut||!S.hero||S.pvE)return;const id=S.hero.id,t0=hTier(id);HWIN[id]=(HWIN[id]||0)+1;try{localStorage.setItem('rt-hwin',JSON.stringify(HWIN));}catch(e){}
 const t1=hTier(id);if(t1>t0){const H=HEROES[id];newU('frame','🖼️','Marco de '+hTierN(t1)+' · '+H.n,(HWIN[id])+' victorias');toast(`🖼️ <b>Marco de ${hTierN(t1)} para ${H.n}</b><br><small>${HWIN[id]} victoria${HWIN[id]===1?'':'s'} con este héroe.</small>`);}}
const NUKL={era:'Eras',tw:'Torres',hr:'Héroes',rl:'Reliquias',ux:'Funciones',pal:'Encuadernaciones',core:'Núcleos',dec:'Decoración del mapa',frame:'Marcos de héroe'};
// ficha de un desbloqueo (página derecha)
function nuDetail(u){if(!u)return '';
 if(u.k==='tw'&&u.id&&TW[u.id]){const T=TW[u.id];return bkSheet(`<span class="bkbic" style="background:${T.col}">${T.ic}</span>`,(T.uniq?uniqGlance(u.id,1):shopInfo(u.id,1)).replace(/<b>[^\p{L}<\s]+ /u,'<b>'))+'<p class="bknote">A partir de ahora puede salirte en las ofertas de torres de cada partida.</p>';}
 if(u.k==='rl'&&u.id&&RELIC[u.id]){const r=RELIC[u.id];return bkSheet(`<span class="bkbic" style="background:${r.col}">${r.ic}</span>`,relicInfo(u.id,1))+'<p class="bknote">A partir de ahora puede salirte en los cofres.</p>';}
 if(u.k==='hr'&&u.id&&HEROES[u.id]){const D=HEROES[u.id];return bkSheet(`<span class="bkpor" style="background:${D.col}">${portrait(u.id)}</span>`,heroInfo(u.id,1).replace(/<b>[^\p{L}<\s]+ /u,'<b>'))+'<p class="bknote">Ya puedes elegirlo al empezar una partida.</p>';}
 const why={era:'Se elige al empezar una partida, en el paso «Era».',ux:'Ya está disponible en el menú.',pal:'Se elige en Opciones › Personalización.',core:'Se elige en Opciones › Personalización.',dec:'Se activa o desactiva en Opciones › Personalización.',frame:'Se pone solo en el retrato del héroe.'}[u.k]||'';
 return `<div class="bksh"><span class="bkbic">${u.ic}</span><div class="ttl bksht"><b>${u.n}</b>${u.x?`<br><small>${u.x}</small>`:''}</div></div><p class="bknote">${why}</p>`;}
function renderUnlocks(){if(!NEWU.length)return;const list=NEWU.slice();NEWU=[];saveNewu();
 const g={};list.forEach((u,i)=>{u.i=i;(g[u.k]=g[u.k]||[]).push(u);});
 LB.msg={key:'nu',list,sel:0,onBack:()=>lbOpen(null,true),
  left:()=>`<h3>🔓 Nuevos desbloqueos</h3><div class="bksub">Lo que has conseguido en tu última partida</div>`+Object.keys(NUKL).filter(k=>g[k]).map(k=>`<div class="bksec">${NUKL[k]}</div><div class="bktiles">`+g[k].map(u=>`<button class="bti nut${LB.msg.sel===u.i?' on':''}" data-a="nusel" data-v="${u.i}"><span class="nunw">NUEVO</span><span class="bic"><i>${u.ic}</i></span><small>${u.n}</small></button>`).join('')+'</div>').join(''),
  right:()=>nuDetail(LB.msg.list[LB.msg.sel]),footR:`<button class="gbtn" data-a="nuok">Continuar ›</button>`};
 lbOpen('msg');}
function cosmHTML(){const lockTxt=c=>c.def?'':cosOwn(c)?'':'🔒 '+achReq(c.ach);
 const pal=COSM.pal.map(c=>{const o=cosOwn(c),on=(OPT.pal||'perg')===c.id;return `<button class="csw${on?' on':''}${o?'':' lk'}" ${o?`data-a="cspal" data-v="${c.id}"`:(c.ach&&ACH[c.ach]?`data-a="cachgo" data-v="${c.ach}"`:'disabled')} title="${o?c.n:lockTxt(c).replace(/<[^>]+>/g,'')}"><i class="cswbk" style="background:linear-gradient(90deg,${c.sw[0]} 0 26%,${c.sw[1]} 26%);border-color:${c.sw[0]};box-shadow:inset 0 0 0 2px ${c.sw[0]},inset 0 0 0 3px color-mix(in srgb,${c.sw[1]} 60%,${c.sw[0]})"></i><span>${o?c.n:'🔒 ???'}</span></button>`;}).join('');
 const core=COSM.core.map(c=>{const o=cosOwn(c),on=(OPT.core||'base')===c.id;return `<button class="csw${on?' on':''}${o?'':' lk'}" ${o?`data-a="cscore" data-v="${c.id}"`:(c.ach&&ACH[c.ach]?`data-a="cachgo" data-v="${c.ach}"`:'disabled')} title="${o?c.n:lockTxt(c).replace(/<[^>]+>/g,'')}"><canvas width="44" height="44" data-core="${c.id}"></canvas><span>${o?c.n:'🔒 ???'}</span></button>`;}).join('');
 const dec=COSM.dec.map(c=>{const o=cosOwn(c),on=o&&!(OPT.decoff||{})[c.id];return `<button class="csw cdec${on?' on':''}${o?'':' lk'}" ${o?`data-a="csdec" data-v="${c.id}" aria-pressed="${on}"`:(c.ach&&ACH[c.ach]?`data-a="cachgo" data-v="${c.ach}"`:'disabled')} title="${o?c.n+(on?' · activada':' · apagada'):lockTxt(c).replace(/<[^>]+>/g,'')}"><canvas width="44" height="44" data-dec="${c.ch}"></canvas><span>${o?c.n:'🔒 ???'}</span><em>${o?(on?'Activada':'Apagada'):''}</em></button>`;}).join('');
 const fr=Object.keys(HEROES).filter(h=>UNLOCK_ALL||heroVis(h)).map(id=>{const t=hTier(id),n=HWIN[id]||0,nx=FRT.slice().reverse().find(([a])=>n<a);return `<div class="frw"><span class="hfr fr${t}" style="background:${HEROES[id].col}">${portrait(id,1)}</span><div><b>${HEROES[id].n}</b><small>${n} victoria${n===1?'':'s'}${t?' · marco de '+hTierN(t):''}${nx?' · siguiente marco a las '+nx[0]:''}</small></div></div>`;}).join('');
 return `<div class="orow"><div>Encuadernación</div><div class="cswr">${pal}</div></div><div class="orow"><div>Núcleo</div><div class="cswr">${core}</div></div><div class="orow"><div>Decoración del mapa</div><small>Las decoraciones aparecen al azar en las piezas nuevas. Pulsa una para activarla o apagarla.</small><div class="cswr">${dec}</div></div><div class="orow"><div>Marcos de héroe</div><small>Se consiguen solos al ganar con cada héroe: bronce con 1 victoria, plata con 5 y oro con 10.</small><div class="frl">${fr}</div></div>`;}
function cosmPaint(){document.querySelectorAll('#comp canvas[data-core]').forEach(cv=>{const g=cv.getContext('2d');g.clearRect(0,0,44,44);g.fillStyle='#22301f';g.fillRect(0,0,44,44);drawCore(g,22,22,30,cv.dataset.core);});
 document.querySelectorAll('#comp canvas[data-dec]').forEach(cv=>{const g=cv.getContext('2d');g.clearRect(0,0,44,44);g.fillStyle='#2b3d29';g.fillRect(0,0,44,44);drawObs(g,cv.dataset.dec,4,4,36);});}
// núcleo
// núcleo de la era Fantástica: cristal que flota sobre un pedestal con runas. Con ÉTER poco reparado (STO.p) tiene grietas y chispas; al recibir daño, destello rojo
// núcleo: cristal que flota sobre un pedestal con runas. Cada aspecto cambia colores, brillo y un detalle propio.
// Con ÉTER poco reparado (STO.p) tiene grietas y chispas; al recibir daño, destello rojo.
// variantes B (propuesta): mismo nombre con 2
// aspectos del núcleo (elegidos por el autor, 2026-11-08). Variantes en prueba: CSKV
const CSK={base:{c:['#1aa8c4','#bff8ff'],g:'63,232,255',e:'#0a4a5a',r:'63,232,255'},
 gold:{c:['#b8860b','#fff3b0'],g:'255,210,90',e:'#5a3a08',r:'255,230,140',sparks:1},
 ruby:{c:['#7a0f22','#ff6a85'],g:'255,60,90',e:'#3a0610',r:'255,90,120',pulse:1,cr:1},
 rune:{c:['#5a2ab8','#e0c8ff'],g:'160,110,255',e:'#2a135a',r:'200,170,255',rise:1},
 void:{c:['#1a0f2e','#7d5ac8'],g:'150,90,255',e:'#0a0710',r:'170,110,255',orbit:2},
 drag:{c:['#9e1b12','#ff7a3a'],g:'255,90,40',e:'#3a0806',r:'255,120,60',eye:1},
 mono:{c:['#121418','#3a3e48'],g:'63,232,255',e:'#000',r:'63,232,255',tall:1,seam:1},
 bast:{c:['#1aa8c4','#bff8ff'],g:'63,232,255',e:'#0a4a5a',r:'63,232,255',wring:1},
 diam:{c:['#9ec8ff','#f4faff','#cfe4ff'],g:'190,220,255',e:'#3a5a8a',r:'220,235,255',facets:1,spark:1},
 prism:{c:['#ff8ad8','#fff7a8','#9af7ff','#c0a8ff'],g:'255,255,255',e:'#3a3a5a',r:'255,255,255',facets:1,spark:1}};
const CSKV={ruby1:{...{c:['#7a0f22','#ff6a85'],g:'255,60,90',e:'#3a0610',r:'255,90,120',pulse:1},cr:1},ruby2:{c:['#7a0f22','#ff6a85'],g:'255,60,90',e:'#3a0610',r:'255,90,120',pulse:1,cr:2},ruby3:{c:['#7a0f22','#ff6a85'],g:'255,60,90',e:'#3a0610',r:'255,90,120',pulse:1,cr:3},
 bast1:{c:['#1aa8c4','#bff8ff'],g:'63,232,255',e:'#0a4a5a',r:'63,232,255',wring:1},bast2:{c:['#1aa8c4','#bff8ff'],g:'63,232,255',e:'#0a4a5a',r:'63,232,255',wsq:1}};
function coreCrystal(c,x,y,b,t,sk){try{coreCrystal0(c,x,y,b,t,CSK[sk]||CSKV[sk]||CSK.base);}catch(e){c.fillStyle='#3dd6c4';c.fillRect(x-b*.35,y-b*.35,b*.7,b*.7);}}
function coreCrystal0(c,x,y,b,t,K0){const u=b*.95,rep=K0.crack?.4:K0.cr?1:Math.min(1,((typeof STO!=='undefined'&&STO.p)||0)/3),hit=(typeof S!=='undefined'&&S&&S.chit)?Math.max(0,1-(performance.now()-S.chit)/450):0;
 const tall=K0.tall?1.35:1;
 // murallas conectadas: anillo continuo (wring) o fuerte cuadrado con torres en las esquinas (wsq); parte de atrás y de delante
 const wring=front=>{const cy=y+u*.24,rx=u*.52,ry=u*.2,hh=u*.12;c.lineJoin='round';for(let k=0;k<24;k++){const a0=k/24*Math.PI*2,a1=(k+1)/24*Math.PI*2,s=Math.sin((a0+a1)/2);if(front?s<0:s>=0)continue;const x0=x+Math.cos(a0)*rx,y0=cy+Math.sin(a0)*ry,x1=x+Math.cos(a1)*rx,y1=cy+Math.sin(a1)*ry;c.fillStyle=s>0?'#9a9184':'#7a7266';c.beginPath();c.moveTo(x0,y0);c.lineTo(x1,y1);c.lineTo(x1,y1-hh);c.lineTo(x0,y0-hh);c.closePath();c.fill();c.strokeStyle='#3a362f';c.lineWidth=Math.max(.6,u*.01);c.stroke();if(k%2===0){c.fillStyle=s>0?'#9a9184':'#7a7266';c.fillRect((x0+x1)/2-u*.02,(y0+y1)/2-hh-u*.035,u*.04,u*.035);}}
  if(front)for(const a of[Math.PI*.25,Math.PI*.75]){const tx=x+Math.cos(a)*rx,ty=cy+Math.sin(a)*ry;c.fillStyle='#8a8478';c.fillRect(tx-u*.05,ty-hh*1.6,u*.1,hh*1.6);c.strokeRect(tx-u*.05,ty-hh*1.6,u*.1,hh*1.6);c.fillRect(tx-u*.05,ty-hh*1.6-u*.04,u*.03,u*.04);c.fillRect(tx+u*.02,ty-hh*1.6-u*.04,u*.03,u*.04);}};
 const wsq=front=>{const cy=y+u*.22,hw=u*.48,hd=u*.16,hh=u*.12,P=[[x-hw,cy-hd],[x+hw,cy-hd],[x+hw,cy+hd],[x-hw,cy+hd]];c.strokeStyle='#3a362f';c.lineWidth=Math.max(.6,u*.01);
  const seg=(a,b,col)=>{c.fillStyle=col;c.beginPath();c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.lineTo(b[0],b[1]-hh);c.lineTo(a[0],a[1]-hh);c.closePath();c.fill();c.stroke();for(let t=.1;t<.95;t+=.2){const mx=a[0]+(b[0]-a[0])*t,my=a[1]+(b[1]-a[1])*t;c.fillRect(mx-u*.018,my-hh-u*.03,u*.036,u*.03);}};
  if(!front){seg(P[0],P[1],'#7a7266');seg(P[3],P[0],'#857d71');seg(P[1],P[2],'#857d71');}else{seg(P[3],P[2],'#9a9184');for(const q of P){c.fillStyle='#8a8478';c.fillRect(q[0]-u*.055,q[1]-hh*1.7,u*.11,hh*1.7);c.strokeRect(q[0]-u*.055,q[1]-hh*1.7,u*.11,hh*1.7);c.fillRect(q[0]-u*.055,q[1]-hh*1.7-u*.04,u*.035,u*.04);c.fillRect(q[0]+u*.02,q[1]-hh*1.7-u*.04,u*.035,u*.04);}}};
 if(K0.wring)wring(0);if(K0.wsq)wsq(0);
 // murallas detrás (Bastión)
 const wall=front=>{c.fillStyle='#8a8478';c.strokeStyle='#3a362f';c.lineWidth=Math.max(.8,u*.012);for(let k=0;k<10;k++){const a=k/10*Math.PI*2+.31,s=Math.sin(a);if(front?s<.15:s>=.15)continue;const rx=x+Math.cos(a)*u*.5,ry=y+u*.22+s*u*.2,w=u*.11,h=u*.13;c.fillRect(rx-w/2,ry-h,w,h);c.strokeRect(rx-w/2,ry-h,w,h);c.fillRect(rx-w/2,ry-h-u*.04,w*.38,u*.04);c.fillRect(rx+w*.12,ry-h-u*.04,w*.38,u*.04);}};
 if(K0.walls)wall(0);
 c.fillStyle='#7d7468';c.beginPath();c.moveTo(x-u*.42,y+u*.42);c.lineTo(x+u*.42,y+u*.42);c.lineTo(x+u*.32,y+u*.22);c.lineTo(x-u*.32,y+u*.22);c.closePath();c.fill();
 c.fillStyle='#9a9184';c.fillRect(x-u*.3,y+u*.14,u*.6,u*.1);
 c.strokeStyle=`rgba(${K0.r},${.35+.4*rep})`;c.lineWidth=u*.03;c.beginPath();c.moveTo(x-u*.2,y+u*.32);c.lineTo(x+u*.2,y+u*.32);c.stroke();
 const fy=y-u*.12+Math.sin(t*2)*u*.03,gl=.4+.6*rep,pu=K0.flame?1+.12*Math.sin(t*5):1,gr=c.createRadialGradient(x,fy,0,x,fy,u*.6*pu);
 gr.addColorStop(0,hit>0?`rgba(255,80,80,${.6*hit+.2})`:`rgba(${K0.g},${.45*gl})`);gr.addColorStop(1,`rgba(${K0.g},0)`);c.fillStyle=gr;c.fillRect(x-u*.7,fy-u*.7,u*1.4,u*1.4);
 // anillo de runas (Rúnico) o órbita (Vacío), por detrás del cristal
 if(K0.ring){c.save();c.translate(x,fy);c.rotate(t*.8);c.strokeStyle='rgba(159,208,255,.85)';c.lineWidth=Math.max(.8,u*.02);c.beginPath();c.arc(0,0,u*.42,0,7);c.stroke();for(let k=0;k<6;k++){c.rotate(Math.PI/3);c.beginPath();c.moveTo(u*.42,-u*.05);c.lineTo(u*.47,0);c.lineTo(u*.42,u*.05);c.stroke();}c.restore();}
 if(K0.orbit){for(let o=0;o<K0.orbit;o++){c.strokeStyle=`rgba(170,110,255,${(.6+.3*Math.sin(t*2+o))*(o?.6:1)})`;c.lineWidth=Math.max(1,u*(o?.025:.04));c.beginPath();c.ellipse(x,fy,u*(.5+o*.12),u*(.17+o*.04),-.4,Math.PI,Math.PI*2);c.stroke();}}
 const top=fy-u*.36*tall,bot=fy+u*.22*tall,wd=u*.18*(K0.tall?.8:1);
 c.beginPath();c.moveTo(x,top);c.lineTo(x+wd,fy);c.lineTo(x,bot);c.lineTo(x-wd,fy);c.closePath();
 const g2=c.createLinearGradient(x-wd,fy,x+wd,fy),cs=hit>.3?['#c43a3a','#ffd0d0']:K0.c;if(cs.length>2)cs.forEach((col,i)=>g2.addColorStop(i/(cs.length-1),col));else{g2.addColorStop(0,cs[0]);g2.addColorStop(.5,cs[1]);g2.addColorStop(1,cs[0]);}
 c.fillStyle=g2;c.fill();c.strokeStyle=K0.e;c.lineWidth=Math.max(1,u*.03);c.lineJoin='round';c.stroke();
 if(K0.flame){const f=.6+.4*Math.sin(t*6);c.fillStyle=`rgba(255,220,120,${.5+.3*f})`;c.beginPath();c.ellipse(x,fy+u*.02,u*.06*pu,u*.12*pu,0,0,7);c.fill();}
 if(K0.facets){c.strokeStyle='rgba(255,255,255,.75)';c.lineWidth=Math.max(.6,u*.012);c.beginPath();c.moveTo(x,top);c.lineTo(x-wd*.4,fy);c.lineTo(x,bot);c.moveTo(x,top);c.lineTo(x+wd*.4,fy);c.lineTo(x,bot);c.moveTo(x-wd,fy);c.lineTo(x+wd,fy);c.stroke();}
 else{c.beginPath();c.moveTo(x,top);c.lineTo(x,bot);c.strokeStyle='rgba(255,255,255,.5)';c.lineWidth=Math.max(.5,u*.015);c.stroke();}
 if(K0.orbit){for(let o=0;o<K0.orbit;o++){c.strokeStyle=`rgba(170,110,255,${(.6+.3*Math.sin(t*2+o))*(o?.6:1)})`;c.lineWidth=Math.max(1,u*(o?.025:.04));c.beginPath();c.ellipse(x,fy,u*(.5+o*.12),u*(.17+o*.04),-.4,0,Math.PI);c.stroke();}}
 if(K0.spark)for(let k=0;k<3;k++){const ph=(t*.7+k*.33)%1;if(ph>.35)continue;const a=k*2.1+1,sx=x+Math.cos(a)*u*.3,sy=fy+Math.sin(a)*u*.28,r=u*.08*Math.sin(ph/.35*Math.PI);c.fillStyle='#fff';c.beginPath();c.moveTo(sx,sy-r);c.lineTo(sx+r*.25,sy-r*.25);c.lineTo(sx+r,sy);c.lineTo(sx+r*.25,sy+r*.25);c.lineTo(sx,sy+r);c.lineTo(sx-r*.25,sy+r*.25);c.lineTo(sx-r,sy);c.lineTo(sx-r*.25,sy-r*.25);c.fill();}
 if(rep<1){c.strokeStyle=K0.crack?'#3a0610':'#2a1a3a';c.lineWidth=Math.max(.8,u*.022);c.beginPath();c.moveTo(x-u*.05,fy-u*.25);c.lineTo(x+u*.04,fy-u*.08);c.lineTo(x-u*.03,fy+u*.05);if(rep<.5){c.moveTo(x+u*.1,fy-u*.05);c.lineTo(x+u*.02,fy+u*.1);}c.stroke();
  if(rep<.5&&!K0.crack&&Math.sin(t*9)>.6){c.fillStyle='#ff6ad5';c.fillRect(x+u*.12,fy-u*.18,u*.045,u*.045);}}
 if(K0.cr){c.save();c.beginPath();c.moveTo(x,top);c.lineTo(x+wd,fy);c.lineTo(x,bot);c.lineTo(x-wd,fy);c.closePath();c.clip();c.lineCap='round';c.lineJoin='round';const lum=.55+.45*Math.max(0,Math.sin(t*3.2))**4;
  if(K0.cr===1){/* una fractura larga de lado a lado con luz que se escapa */c.strokeStyle=`rgba(255,200,210,${lum})`;c.lineWidth=Math.max(1.2,u*.03);c.beginPath();c.moveTo(x-wd,fy-u*.06);c.lineTo(x-wd*.35,fy-u*.02);c.lineTo(x-wd*.1,fy+u*.05);c.lineTo(x+wd*.4,fy+u*.02);c.lineTo(x+wd,fy+u*.09);c.stroke();c.strokeStyle='#2a040a';c.lineWidth=Math.max(.6,u*.012);c.stroke();}
  if(K0.cr===2){/* telaraña desde un golpe cerca de la punta */const ix=x+wd*.25,iy=fy-u*.16;c.strokeStyle='#2a040a';c.lineWidth=Math.max(.7,u*.014);for(let k=0;k<6;k++){const a=k/6*Math.PI*2+.3,L=u*(.1+.06*(k%2));c.beginPath();c.moveTo(ix,iy);c.lineTo(ix+Math.cos(a)*L*.5,iy+Math.sin(a)*L*.5+u*.01);c.lineTo(ix+Math.cos(a)*L,iy+Math.sin(a)*L);c.stroke();}c.beginPath();c.arc(ix,iy,u*.04,0,7);c.stroke();c.fillStyle=`rgba(255,220,230,${lum})`;c.beginPath();c.arc(ix,iy,u*.018,0,7);c.fill();}
  if(K0.cr===3){/* esquirla que falta en un borde, con el interior brillante */c.fillStyle=`rgba(255,170,190,${.6+.4*lum})`;c.beginPath();c.moveTo(x+wd,fy);c.lineTo(x+wd*.45,fy-u*.05);c.lineTo(x+wd*.6,fy+u*.06);c.closePath();c.fill();c.strokeStyle='#2a040a';c.lineWidth=Math.max(.7,u*.014);c.stroke();c.beginPath();c.moveTo(x+wd*.45,fy-u*.05);c.lineTo(x+wd*.1,fy-u*.12);c.moveTo(x+wd*.6,fy+u*.06);c.lineTo(x+wd*.2,fy+u*.14);c.stroke();}
  c.restore();}
 if(K0.pulse){const p=Math.max(0,Math.sin(t*3.2))**6;c.strokeStyle=`rgba(${K0.g},${.7*p})`;c.lineWidth=Math.max(1,u*.04);c.beginPath();c.arc(x,fy,u*(.25+.25*p),0,7);c.stroke();}
 if(K0.sparks)for(let k=0;k<5;k++){const a=t*1.4+k*1.26,rx=x+Math.cos(a)*u*.32,ry=fy+Math.sin(a)*u*.12;c.fillStyle=`rgba(${K0.r},.9)`;c.beginPath();c.arc(rx,ry,u*.022,0,7);c.fill();}
 if(K0.rise)for(let k=0;k<4;k++){const ph=(t*.35+k*.25)%1,rx=x+Math.sin(k*2.3)*u*.22,ry=fy+u*.1-ph*u*.55;c.globalAlpha=Math.sin(ph*Math.PI);c.fillStyle=`rgb(${K0.r})`;c.font=`bold ${Math.round(u*.1)}px serif`;c.textAlign='center';c.textBaseline='middle';c.fillText('ᚱᛟᚦᛉ'[k],rx,ry);c.globalAlpha=1;}
 if(K0.swirl){c.save();c.translate(x,fy);for(let k=0;k<3;k++){c.rotate(t*1.5+k*2.09);c.strokeStyle=`rgba(150,90,255,${.5-k*.12})`;c.lineWidth=Math.max(.8,u*.025);c.beginPath();c.arc(0,0,u*(.28+k*.06),0,1.6);c.stroke();}c.restore();}
 if(K0.eye){const bl=Math.sin(t*1.1)>.97?.15:1;const ig=c.createRadialGradient(x,fy,0,x,fy,u*.12);ig.addColorStop(0,'#fff2a0');ig.addColorStop(.7,'#ffc21a');ig.addColorStop(1,'rgba(255,140,20,0)');c.fillStyle=ig;c.beginPath();c.ellipse(x,fy,u*.11,u*.15*bl,0,0,7);c.fill();c.fillStyle='#14080a';c.beginPath();c.ellipse(x,fy,u*.03,u*.14*bl,0,0,7);c.fill();}
 if(K0.seam){c.strokeStyle=`rgba(63,232,255,${.6+.3*Math.sin(t*2)})`;c.lineWidth=Math.max(1,u*.025);c.beginPath();c.moveTo(x,top+u*.05);c.lineTo(x-u*.02,fy-u*.05);c.lineTo(x+u*.02,fy+u*.08);c.lineTo(x,bot-u*.04);c.stroke();}
 if(K0.prism){const gr2=c.createLinearGradient(x-u*.4,0,x+u*.4,0);['#ff4a4a','#ffd84a','#4aff8a','#4ad8ff','#a84aff'].forEach((col,i)=>gr2.addColorStop(i/4,col));c.globalAlpha=.35+.15*Math.sin(t*2);c.fillStyle=gr2;c.beginPath();c.moveTo(x,bot);c.lineTo(x+u*.4,y+u*.42);c.lineTo(x-u*.4,y+u*.42);c.closePath();c.fill();c.globalAlpha=1;}
 if(K0.arch){c.fillStyle='#8a8478';c.strokeStyle='#3a362f';c.lineWidth=Math.max(.8,u*.015);for(const sd of[-1,1]){c.fillRect(x+sd*u*.3-u*.06,y-u*.42,u*.12,u*.66);c.strokeRect(x+sd*u*.3-u*.06,y-u*.42,u*.12,u*.66);}c.beginPath();c.arc(x,y-u*.42,u*.36,Math.PI,0);c.lineWidth=u*.08;c.strokeStyle='#8a8478';c.stroke();c.lineWidth=Math.max(.8,u*.015);c.strokeStyle='#3a362f';c.beginPath();c.arc(x,y-u*.42,u*.4,Math.PI,0);c.stroke();c.beginPath();c.arc(x,y-u*.42,u*.32,Math.PI,0);c.stroke();}
 if(K0.wring||K0.wsq){if(K0.wring)wring(1);else wsq(1);if(hit>0){c.fillStyle=`rgba(200,190,170,${.7*hit})`;for(let i=0;i<8;i++){c.beginPath();c.arc(x-u*.3+i*u*.085,y+u*.4+(1-hit)*u*.08+Math.sin(i*1.7)*u*.03,u*.012,0,7);c.fill();}}}
 if(K0.walls){wall(1);if(hit>0){c.fillStyle=`rgba(200,190,170,${.7*hit})`;for(let i=0;i<8;i++){c.beginPath();c.arc(x-u*.3+i*u*.085,y+u*.38+(1-hit)*u*.08+Math.sin(i*1.7)*u*.03,u*.012,0,7);c.fill();}}}}
function drawCore(g,cx,cy,b,skin){skin=skin||OPT.core||'base';const c=COSM.core.find(x=>x.id===skin);if(!c||!cosOwn(c))skin='base';const t=(typeof performance!=='undefined'?performance.now():0)/1000;
 coreCrystal(g,cx,cy,b,t,skin);}
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
  if(o.type==='slider')return sh+R(o,i,' osl',`${ic(o)}<div class="otl"><div>${o.label}</div>${o.real?`<span class="oreal">${o.real(OPT[o.key])}</span>`:''}${d(o)}</div><label class="osr"><input type="range" data-o="${i}" min="${o.min}" max="${o.max}" step="${o.step}" value="${OPT[o.key]}"><output>${o.fmt(OPT[o.key])}</output></label>`);
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
const LBOPTXT={jg:'Ajustes generales del juego. Señala una opción para leer qué hace.',kb:'Pulsa la tecla de un atajo y luego la nueva tecla. La columna Alternativa admite una segunda tecla; Supr la borra. Las teclas de Menús mueven el marco dorado por los menús.',ps:'Encuadernaciones (cuero, remates y papel del libro), núcleos, decoración, caminos, marcos de torre y efectos que vas desbloqueando al jugar. Lo que aún no tienes sale con candado.',hs:'Cómo se muestran los diálogos de la historia.',vol:'Volumen y sonidos. Pulsa un sonido para escucharlo; si tiene variantes, la última que pruebes es la que se queda.',gf:'Rendimiento y calidad gráfica.',ac:'Ayudas de lectura y accesibilidad.',un:'Atajos para desbloquear contenido sin jugar, pensados para probar el juego. Lo que desbloquees así no cuenta como progreso.'};
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
