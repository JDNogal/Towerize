// ---- bocadillo de pergamino en lugar de la etiqueta del navegador (title) ----
// Solo con ratón: sale casi al instante encima del botón y se va al quitar el ratón.
// El atributo title se pasa a data-ttb (data-tip ya lo usan los bocadillos del juego) al pasar por encima, así el navegador no saca la suya.
const TTB={el:null,t:0,cur:null};
(()=>{const d=document.createElement('div');d.id='ttb';document.body.appendChild(d);TTB.el=d;})();
function ttbHide(){clearTimeout(TTB.t);TTB.cur=null;TTB.el.classList.remove('on');}
function ttbShow(e){const txt=e.dataset.ttb;if(!txt||!e.isConnected){ttbHide();return;}
 const b=TTB.el;b.textContent=txt;b.classList.remove('dn');b.style.left='0px';b.style.top='0px';
 const r=e.getBoundingClientRect(),w=b.offsetWidth,h=b.offsetHeight,M=6;
 let x=r.left+r.width/2-w/2,y=r.top-h-8;
 if(y<M){y=r.bottom+8;b.classList.add('dn');}
 x=Math.max(M,Math.min(innerWidth-w-M,x));
 b.style.left=Math.round(x)+'px';b.style.top=Math.round(y)+'px';
 b.style.setProperty('--ax',Math.round(r.left+r.width/2-x)+'px');
 b.classList.add('on');}
const ttbTake=e=>{const t=e.getAttribute('title');if(t!=null){if(t)e.dataset.ttb=t;e.removeAttribute('title');}};
addEventListener('pointerover',ev=>{
 if(ev.pointerType!=='mouse'){return;}
 const e=ev.target.closest&&ev.target.closest('[title],[data-ttb]');
 if(!e){if(TTB.cur)ttbHide();return;}
 ttbTake(e);if(e===TTB.cur)return;
 clearTimeout(TTB.t);TTB.cur=e;TTB.t=setTimeout(()=>{if(TTB.cur===e)ttbShow(e);},120);
},true);
addEventListener('pointerout',ev=>{if(!TTB.cur)return;const to=ev.relatedTarget;if(to&&TTB.cur.contains(to))return;if(ev.target===TTB.cur||TTB.cur.contains(ev.target))ttbHide();},true);
addEventListener('pointerdown',ttbHide,true);
addEventListener('wheel',ttbHide,{passive:true,capture:true});
addEventListener('keydown',ttbHide,true);
// si el juego cambia el title del botón que tienes debajo, el bocadillo se actualiza (y el navegador no saca el suyo)
new MutationObserver(ms=>{for(const m of ms){const e=m.target;if(e.nodeType!==1||!e.hasAttribute('title'))continue;if(e===TTB.cur||e.matches(':hover')){ttbTake(e);if(e===TTB.cur&&TTB.el.classList.contains('on'))ttbShow(e);}}}).observe(document.body,{subtree:true,attributes:true,attributeFilter:['title']});
// si el botón desaparece (se repinta el menú), el bocadillo se va con él
setInterval(()=>{if(TTB.cur&&!TTB.cur.isConnected)ttbHide();},200);
