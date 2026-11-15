// ==================== v343 · Fichas del anillo de construir y del menú de torre: aguantan un poco al salir ====================
// Antes se cerraban en cuanto el ratón salía del botón, así que no se podía llegar a la ficha para mirar sus palabras clave.
// Ahora, como el resto de bocadillos: al salir, la ficha espera un momento; si llegas a ella (o a una palabra clave abierta
// desde ella) se queda abierta. Si pasas de camino por encima de otro botón, solo cambia de ficha si te paras un instante en él.
const TGR={OUT:.45,SW:.14};
function tgrStep(X,menuId,cardId,draw,dt){const st=X._g||(X._g={dead:0,pk:null,pt:0});
 if(typeof TOUCH!=='undefined'&&TOUCH)return;const m=$(menuId);if(!m||!m.classList.contains('on')){st.dead=0;st.pk=null;return;}
 const el=M.has?document.elementFromPoint(M.x,M.y):null,b=el&&el.closest('#'+menuId+' .tmb'),k=b?b.dataset.k:null;
 const onCard=!!(el&&(el.closest('#'+cardId)||el.closest('.kpanel')));let ch=false;
 if(k){st.dead=0;if(k===X.hov){st.pk=null;}else if(!X.hov){X.hov=k;st.pk=null;ch=true;}else{if(st.pk!==k){st.pk=k;st.pt=0;}st.pt+=dt;if(st.pt>=TGR.SW){X.hov=k;st.pk=null;ch=true;}}}
 else if(onCard&&X.hov){st.dead=0;st.pk=null;}
 else if(X.hov){st.pk=null;st.dead+=dt;if(st.dead>TGR.OUT){X.hov=null;st.dead=0;ch=true;}}
 if(ch)draw();}
{let t0=performance.now();setInterval(()=>{const t=performance.now(),dt=Math.min(.1,(t-t0)/1000);t0=t;
 try{if(typeof BM!=='undefined'&&BM.s)tgrStep(BM,'bmenu','bmcard',bmCard,dt);}catch(e){}
 try{if(typeof TM!=='undefined'&&TM.t)tgrStep(TM,'tmenu','tmcard',tmCard,dt);}catch(e){}},30);}
