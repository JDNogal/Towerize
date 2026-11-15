// ==================== v348 · Informar de un fallo: tecla F3 y captura siempre (Nogal) ====================
// · F3 (cambiable en Opciones › Atajos) abre el informe desde cualquier sitio; la tecla se ve en los botones del bicho.
// · Captura siempre: en la pausa de una partida, la del mapa tomada al pausar (antes de que el libro lo tape);
//   en cualquier otro sitio (menús, libro, ventanas, en plena partida), una captura de toda la pantalla al abrir el informe.
KBDEF.bug='f3';if(!KB.bug)KB.bug='f3';
{const g=KBL.find(x=>x[0]==='Menús')||KBL[KBL.length-1];if(g&&!g[1].some(r=>r[0]==='bug'))g[1].push(['bug','Informar de un fallo','🐞']);}
const H2C='https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
function h2cLoad(){return new Promise((ok,ko)=>{if(typeof html2canvas==='function')return ok();const s=document.createElement('script');s.src=H2C;s.onload=()=>ok();s.onerror=ko;document.head.appendChild(s);});}
// toda la pantalla (sin el propio botón ni avisos del informe), reducida a JPEG
async function bugScreen(){try{await Promise.race([h2cLoad(),new Promise((_,ko)=>setTimeout(ko,6000))]);
  const W=innerWidth,H=innerHeight,sc=Math.min(1,1100/W);
  const c=await Promise.race([html2canvas(document.body,{backgroundColor:'#000',scale:sc,logging:false,useCORS:true,width:W,height:H,x:scrollX,y:scrollY,windowWidth:W,windowHeight:H,
   ignoreElements:el=>el.id==='bugfab'||el.id==='bugtoast'||el.id==='bugw'||el.id==='bugbusy',onclone:h2cColors}),new Promise((_,ko)=>setTimeout(ko,12000))]);
  return c.toDataURL('image/jpeg',.72);}catch(e){
  /* v351: si falla la de toda la pantalla, la de la ventana que está abierta (libro, resumen, pergamino…); el mapa solo si no hay ninguna */
  try{const win=[...document.querySelectorAll('#comp.open,#relic.open,#menu:not([style*="none"]),#bugw')].find(e=>e.id!=='bugw'&&e.offsetParent!==null||getComputedStyle(e).position==='fixed'&&e.id!=='bugw');
   if(win&&typeof html2canvas==='function'){const r=win.getBoundingClientRect(),sc=Math.min(1,1100/Math.max(1,r.width));const c=await Promise.race([html2canvas(win,{backgroundColor:'#000',scale:sc,logging:false,useCORS:true,onclone:h2cColors}),new Promise((_,ko)=>setTimeout(ko,10000))]);return c.toDataURL('image/jpeg',.72);}}catch(e2){}
  const anyWin=document.querySelector('#comp.open,#relic.open');return !anyWin&&typeof bugShot==='function'?bugShot():null;}}
{const _o=bugOpen;bugOpen=async function(){if(BUG.busy||BUG.open)return;
 /* v351: siempre lo que hay en pantalla en ese momento (menú, libro, resumen final, ventana o mapa); antes, con el libro abierto en partida, se mandaba el mapa */
 let shot=null;
 if(!shot){BUG.busy=1;document.body.style.cursor='progress';try{shot=await bugScreen();}finally{BUG.busy=0;document.body.style.cursor='';}}
 const r=_o.apply(this,arguments);BUG.shot=shot||null;BUG.inc=!!shot;bugRender();return r;};}
// F3 desde cualquier sitio (también con el informe cerrado y en los menús)
addEventListener('keydown',e=>{try{const t=e.target;if(t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'))return;if(typeof KBC!=='undefined'&&KBC.on)return;
 if(kbIs('bug',e.key.toLowerCase())){e.preventDefault();e.stopImmediatePropagation();if(!BUG.open){try{sfx('ui');}catch(_){}bugOpen();}}}catch(_){}},true);
// la tecla, en los botones del bicho (solo en PC y si se ven las teclas)
setInterval(()=>{try{for(const b of document.querySelectorAll('[data-a="bugrep"]')){let k=b.querySelector(':scope>.kcap');const want=typeof kcOn==='function'?kcOn():!TOUCH,lab=kbN('bug');
 if(!want){if(k)k.remove();continue;}if(!k){b.insertAdjacentHTML('beforeend',kcap(lab));k=b.querySelector(':scope>.kcap');if(k)k.classList.add('bugk');}else if(k.textContent!==lab)k.textContent=lab;}}catch(e){}},400);
// html2canvas 1.4 no entiende los colores modernos (color(srgb …), que es como el navegador devuelve color-mix): en la copia se pasan a rgba
const H2CP=['color','background-color','border-top-color','border-right-color','border-bottom-color','border-left-color','outline-color','box-shadow','text-shadow','background-image','fill','stroke','text-decoration-color','caret-color','column-rule-color'];
const h2cFix=v=>v.replace(/color\(srgb ([-\d.e]+) ([-\d.e]+) ([-\d.e]+)(?: \/ ([-\d.e]+))?\)/g,(m,r,g,b,a)=>`rgba(${Math.round(+r*255)},${Math.round(+g*255)},${Math.round(+b*255)},${a===undefined?1:+a})`).replace(/(?:oklch|oklab|lab|lch)\([^)]*\)/g,'rgba(128,128,128,1)');
function h2cColors(doc){const W=doc.defaultView;/* v351: sin esto, html2canvas se come los espacios entre palabras con algunas letras */try{const st=doc.createElement('style');st.textContent='*{font-kerning:none!important;font-variant-ligatures:none!important;font-feature-settings:normal!important;text-rendering:auto!important}';doc.head.appendChild(st);}catch(e){}/* el body mide 0 de alto (todo va en posición fija): sin esto, la copia sale recortada a nada */for(const e of [doc.documentElement,doc.body]){e.style.setProperty('height','100vh','important');e.style.setProperty('overflow','visible','important');}for(const el of doc.querySelectorAll('*')){let cs;try{cs=W.getComputedStyle(el);}catch(e){continue;}
 for(const pr of H2CP){const v=cs.getPropertyValue(pr);if(v&&/color\(|oklch|oklab|lab\(|lch\(/.test(v))el.style.setProperty(pr,h2cFix(v),'important');}}}
