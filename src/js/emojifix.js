// ======================= EMOJIS QUE EL SISTEMA NO TIENE =======================
// Algunos equipos (Windows 10, navegadores antiguos) no tienen los emojis más nuevos (🪙, 🪽, 🪵…) y salen como un cuadrado.
// Al arrancar se comprueba cuáles se dibujan igual que un carácter inexistente; esos se sustituyen por uno parecido más antiguo.
// La moneda, que sale en todas partes, se cambia por una moneda dibujada con CSS.
const EMFB={'🪙':'COIN','🪽':'🦅','🪵':'🌲','🪨':'⛰️','🪶':'🕊️','🪦':'⚰️','🫗':'🍶','🫠':'😵','🪺':'🥚','🪪':'📇','🦣':'🐘','🧌':'👹','🧿':'🔮','🧙':'🧓','🧝':'🧑','🧘':'🙏','🦸':'🦹','🧳':'🎒','🧮':'🔢','🧭':'🗺️','🦴':'💀','🦷':'💀','🩸':'💧','🧪':'⚗️','🧊':'❄️','🧱':'🏠','🧩':'🔷','🧨':'💥'};
const EMBAD={};
(function emCheck(){try{const cv=document.createElement('canvas');cv.width=cv.height=24;const g=cv.getContext('2d');if(!g||!g.getImageData)return;
 const px=s=>{g.clearRect(0,0,24,24);g.font='20px sans-serif';g.textBaseline='top';g.fillStyle='#000';g.fillText(s,0,0);return g.getImageData(0,0,24,24).data.join(',');};
 const none=px('\u{10FFFD}'),none2=px('\u{E01EF}');for(const k in EMFB){const p=px(k);if(p===none||p===none2)EMBAD[k]=1;}}catch(e){}})();
EMBAD['🪙']=1;/* v307: la moneda de los precios es siempre la dibujada (redonda con estrella; crédito de neón en la era 2), no el emoji */
try{if(localStorage.getItem('rt-emtest'))for(const k in EMFB)EMBAD[k]=1;}catch(e){}/* prueba: simula un sistema sin estos emojis */
const EMRX=Object.keys(EMBAD).length?new RegExp(Object.keys(EMBAD).join('|'),'gu'):null;
// texto para el lienzo (no admite HTML): la moneda pasa a un círculo amarillo
const emTxt=s=>EMRX&&typeof s==='string'?s.replace(EMRX,m=>EMFB[m]==='COIN'?'🟡':EMFB[m]):s;
if(EMRX){
 // lienzo
 if(typeof CanvasRenderingContext2D!=='undefined'){const ft=CanvasRenderingContext2D.prototype.fillText;CanvasRenderingContext2D.prototype.fillText=function(t,...a){return ft.call(this,emTxt(t),...a);};}
 // interfaz: se revisan los textos nuevos y se sustituyen
 const fix=n=>{if(n.nodeType===3){if(!EMRX.test(n.data))return;EMRX.lastIndex=0;const parts=n.data.split(EMRX),ms=n.data.match(EMRX);const fr=document.createDocumentFragment();
   parts.forEach((p,i)=>{if(p)fr.appendChild(document.createTextNode(p));if(ms&&ms[i]){if(EMFB[ms[i]]==='COIN'){const c=document.createElement('i');c.className='cnf';fr.appendChild(c);}else fr.appendChild(document.createTextNode(EMFB[ms[i]]));}});n.parentNode&&n.parentNode.replaceChild(fr,n);return;}
  if(n.nodeType===1&&n.tagName!=='SCRIPT'&&n.tagName!=='STYLE'){const w=document.createTreeWalker(n,NodeFilter.SHOW_TEXT),L=[];let x;while((x=w.nextNode()))if(EMRX.test(x.data)){EMRX.lastIndex=0;L.push(x);}EMRX.lastIndex=0;L.forEach(fix);}};
 const mo=new MutationObserver(ms=>{for(const m of ms){if(m.type==='characterData')fix(m.target);else m.addedNodes.forEach(fix);}});
 const go=()=>{fix(document.body);mo.observe(document.body,{childList:true,subtree:true,characterData:true});};
 if(document.body)go();else addEventListener('DOMContentLoaded',go);
}
