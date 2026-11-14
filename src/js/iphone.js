// ---- iPhone: Safari no deja poner pantalla completa. Evitamos el «tirar para recargar» y explicamos cómo jugar sin barras ----
const IOS=/iPhone|iPod/.test(navigator.userAgent||'')&&!(window.navigator.standalone||(window.matchMedia&&matchMedia('(display-mode: standalone)').matches));
// fuera de las zonas que tienen scroll, deslizar no mueve la página (así no recarga ni rebota)
{const canScroll=el=>{for(let n=el;n&&n!==document.body&&n.nodeType===1;n=n.parentElement){const st=getComputedStyle(n),oy=st.overflowY,ox=st.overflowX;
  if((oy==='auto'||oy==='scroll')&&n.scrollHeight>n.clientHeight+1)return true;if((ox==='auto'||ox==='scroll')&&n.scrollWidth>n.clientWidth+1)return true;}return false;};
 if(/iPhone|iPod|iPad/.test(navigator.userAgent||'')||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1))
  document.addEventListener('touchmove',e=>{if(e.touches.length>1)return;if(!canScroll(e.target)&&e.cancelable)e.preventDefault();},{passive:false});}
function iosNote(force){if(!IOS)return;if(!force){try{if(localStorage.getItem('rt-iosfs'))return;}catch(e){}}
 let el=document.getElementById('iosfs');if(!el){el=document.createElement('div');el.id='iosfs';document.body.appendChild(el);}
 el.innerHTML='<div class="iosb"><div class="ioic">📱</div><b>Pantalla completa en iPhone</b><span>En iPhone, Safari no deja que el juego se ponga en pantalla completa. Para jugar sin las barras del navegador:</span>'+
  '<ol><li>Pulsa <b>Compartir</b> <em>⬆︎</em> en la barra de Safari.</li><li>Elige <b>Añadir a pantalla de inicio</b>.</li><li>Abre Towerize desde ese icono.</li></ol>'+
  '<span class="iosn">Si en algún momento se te sale el juego, vuelve a abrirlo desde el icono. Puedes volver a ver esto en el menú de pausa.</span><button>Entendido</button></div>';
 el.classList.add('on');el.querySelector('button').onclick=()=>{el.classList.remove('on');try{localStorage.setItem('rt-iosfs','1');}catch(e){}};}
// la primera vez, en cuanto termina la intro
if(IOS&&!navigator.webdriver){const iv=setInterval(()=>{if(typeof INTRO!=='undefined'&&INTRO.on)return;clearInterval(iv);setTimeout(()=>iosNote(0),400);},300);}
// v330 · iPhone desde la pantalla de inicio: al girar, iOS avisa del cambio de tamaño antes de terminar de girar y el lienzo
// se quedaba con las medidas de antes (el juego se veía estirado). Se vuelve a medir poco después de girar y, por si acaso, cada medio segundo.
{const remeasure=()=>{try{setDsk();}catch(e){}};
 const later=()=>{for(const t of [60,250,600,1200])setTimeout(remeasure,t);};
 addEventListener('orientationchange',later);addEventListener('resize',later);
 if(window.visualViewport)visualViewport.addEventListener('resize',later);
 addEventListener('pageshow',later);document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')later();});
 setInterval(remeasure,500);}
