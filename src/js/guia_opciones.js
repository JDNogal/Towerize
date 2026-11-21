/* v363 · «Juega a tu manera» (Nogal, 21-nov): página del libro con las opciones más útiles que no cambian la dificultad.
   Sale una vez (rt-guia): al acabar el Tutorial completo o el rápido; quien los salta, en la ronda 10 o al acabar su primera partida (lo que llegue antes).
   Sustituye a la diapositiva «Personaliza tu juego» del Tutorial rápido, a su apartado en el final del Tutorial completo y a la pista de la mitad de la partida. */
const GUIA={after:null};
const GUIAOP=[
 ['ffwd','Avance rápido automático','Desde la ronda 5, cuando ningún enemigo está a tiro, el juego va solo a ×3. En cuanto entra el primero, vuelve a tu velocidad.','ff'],
 ['dnum','Números de daño','Cuánto daño hace cada golpe; los críticos, más grandes. Si el juego te va lento, quítalos o deja solo los de los jefes.','num'],
 ['dps','Medidor de daño','Qué torre hace más daño en cada ronda. Con «Ver más» abres las Estadísticas para verlo con todo detalle.','dps'],
 ['nearach','Avisar de logros cercanos','Te avisa cuando te falta poco para un logro y te deja fijarlo para seguirlo.','ach']];
function guiaSeen(){try{return !!localStorage.getItem('rt-guia');}catch(e){return true;}}
function guiaImg(k){return typeof GUIAIMG!=='undefined'&&GUIAIMG[k]?`style="background-image:url(${GUIAIMG[k]})"`:'';}
function guiaLeft(){
 return `<div class="gq"><h3>Juega a tu manera</h3><div class="bksub">Opciones a mano</div>`+
  `<p class="gqi">Towerize tiene muchas opciones para que lo disfrutes como más te guste. <b>Ninguna cambia la dificultad</b>: actívalas o quítalas solo si te apetece. Estas cuatro suelen gustar mucho:</p>`+
  `<div class="gqn">⚙️ Hay muchas más en <b>Opciones</b>, y puedes cambiar estas cuando quieras.<br>📊 En <b>Estadísticas</b> (menú de pausa) tienes el daño de cada torre con todo detalle.</div>`+
  `<div class="gqpic"><div ${guiaImg('full')}></div><small>Así se ven en partida (los números son los de cada tarjeta).</small></div></div>`;}
function guiaRight(){
 return `<div class="gq gqA">`+GUIAOP.map(([k,n,d,im],i)=>{const on=OPT[k]!==false;
  return `<div class="c"><div class="im" ${guiaImg(im)}></div><div class="t"><span class="nb">${i+1}</span><b>${n}</b><button class="sw${on?' on':''}" role="switch" aria-checked="${on}" data-a="guiasw" data-v="${k}"><i></i></button></div><small>${d}</small></div>`;}).join('')+`</div>`;}
function guiaOpen(after){try{localStorage.setItem('rt-guia','1');}catch(e){}GUIA.after=after||null;
 LB.msg={key:'guia',onBack:()=>guiaGo(true),left:guiaLeft,right:guiaRight,
  footL:`<button class="lbbk" data-a="guiaopts">⚙️ Ver todas las opciones</button>`,footR:`<button class="gbtn" data-a="guiacont">Continuar ›</button>`};
 lbOpen('msg');}
// sigue con lo que tocaba (menú, partida…); sin nada pendiente, vuelve a la partida
function guiaGo(back){const f=GUIA.after;GUIA.after=null;if(!back)LB.msg=null;
 if(f)f();else if(document.body.classList.contains('inmenu'))lbOpen(null,true);else lbClose(true);}
function guiaOpts(){const f=GUIA.after;GUIA.after=null;LB.msg=null;if(f)f();OP.tab='jg';lbOpen('op');}
// lo que tocaba hacer, pasando antes por la guía si aún no se ha visto
function guiaThen(f){if(guiaSeen())f();else guiaOpen(f);}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-a="guiasw"],[data-a="guiacont"],[data-a="guiaopts"]');if(!b)return;
 e.stopPropagation();e.preventDefault();const a=b.dataset.a;
 if(a==='guiasw'){const k=b.dataset.v;OPT[k]=OPT[k]===false;saveOpt();try{sfx('click');}catch(_){}lbRender();if(typeof S!=='undefined'&&S)ui();}
 else if(a==='guiacont')guiaGo();else guiaOpts();},true);
// quien salta los tutoriales: al acabar su primera partida, antes de volver al menú
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-a="menu"]');if(!b||e.defaultPrevented||!LB.open||LB.area!=='end'||guiaSeen())return;
 if(typeof S==='undefined'||!S||S.tut)return;e.stopPropagation();e.preventDefault();guiaOpen(()=>{LB.end=null;showMenu();});},true);
// … o en la ronda 10, en un momento tranquilo (construyendo, sin ventanas abiertas)
function guiaTick(){if(guiaSeen()||typeof S==='undefined'||!S||S.tut||S.pvE||S.phase!=='build'||S.round<Math.min(10,ROUNDS))return;
 const bd=document.body.classList;if(bd.contains('inmenu')||bd.contains('pcpick')||LB.open||(typeof DLG!=='undefined'&&DLG.on)||(typeof RL!=='undefined'&&RL.open))return;
 guiaOpen();}
setInterval(()=>{try{guiaTick();}catch(e){}},700);
