// ==================== v348 · El ojo (ver el mapa) va arriba a la derecha del pergamino (Nogal) ====================
// Elegir pieza: el ojo del pergamino; torres, eventos y resultados: el ojo de la barra de arriba se pasa a la esquina del papel.
// Se calcula con el tamaño real del pergamino (también con la ventana ampliada), dentro del papel y junto al rodillo.
function eyeAim(b,host){const hr=host.getBoundingClientRect();if(!hr.width)return false;const z=hr.width/(host.offsetWidth||hr.width)||1,br=b.getBoundingClientRect();
 const tx=hr.right-(PGIX+20)*z-br.width,ty=hr.top+(PGIY+16)*z;return {dx:tx-br.left,dy:ty-br.top,z};}
// v351: el panel se vuelve a dibujar al girar la pieza (y el ojo nacía en su sitio antiguo hasta la siguiente corrección): ahora se coloca al momento,
// antes de que se pinte, con la última posición buena y afinando en el acto.
let EYEP=null;
function eyeFixPick(){const pk=document.querySelector('body.pcpick:not(.pcpeek) #panel.pgf .pcpeek'),pn=$('panel');if(!pk||!pn||!pk.offsetParent)return;
 if(EYEP&&!pk.style.top){pk.style.setProperty('right',EYEP.r+'px','important');pk.style.setProperty('top',EYEP.t+'px','important');}
 for(let i=0;i<3;i++){const a=eyeAim(pk,pn);if(!a||Math.abs(a.dx)<=1&&Math.abs(a.dy)<=1)break;const cs=getComputedStyle(pk),zz=(pk.getBoundingClientRect().width/(pk.offsetWidth||1))||1;
  pk.style.setProperty('right',(parseFloat(cs.right)-a.dx/zz)+'px','important');pk.style.setProperty('top',(parseFloat(cs.top)+a.dy/zz)+'px','important');}
 EYEP={r:parseFloat(pk.style.right),t:parseFloat(pk.style.top)};}
try{new MutationObserver(()=>{try{eyeFixPick();}catch(e){}}).observe(document.getElementById('panel'),{childList:true,subtree:true});}catch(e){}
setInterval(()=>{try{if(typeof S==='undefined'||!S)return;
 // elegir pieza: el ojo vive dentro del panel (con su zoom): se corrige su top/right hasta que cae en la esquina
 eyeFixPick();
 // ventanas del pergamino (torres, eventos): el ojo de la barra pasa a la esquina del papel
 const rl=$('relic'),pp=rl&&rl.classList.contains('open')&&!rl.classList.contains('peek')?rl.querySelector('.pscr .ppap.pgf'):null,eb=rl&&rl.querySelector('.rlbar [data-a="peek"]');
 if(eb){if(pp){const hr=pp.getBoundingClientRect(),z=hr.width/(pp.offsetWidth||hr.width)||1,w=eb.offsetWidth;eb.classList.add('eyepg');
   eb.style.left=(hr.right-(PGIX+20)*z-w)+"px";/* v359: a la altura del título (centrado con su cinta), sin pisar la línea de debajo */const tt=pp.querySelector('.ptt,.evhead b,.evtt'),tr=tt&&tt.getBoundingClientRect();eb.style.top=(tr&&tr.height?tr.top+tr.height/2-eb.offsetHeight/2:hr.top+(PGIY+16)*z)+"px";}
  else if(eb.classList.contains('eyepg')){eb.classList.remove('eyepg');eb.style.left='';eb.style.top='';}}}catch(e){}},80);
// v349: si la ventana (pergamino o dron) no cabe entre los paneles del mazo y del cofre (pantallas estrechas, la tablet es más ancha), el panel que choca se oculta mientras está abierta
setInterval(()=>{try{const ps=[...document.querySelectorAll('#mzside>.mzd,#mzside>.mzr')];if(!ps.length)return;
 const w=document.querySelector('#relic.open:not(.peek) .pscr')||(document.body.classList.contains('pcpick')&&!document.body.classList.contains('pcpeek')?$('panel'):null);
 const wr=w&&w.getBoundingClientRect();
 for(const p of ps){let hit=false;if(wr&&wr.width){p.style.visibility='';const r=p.getBoundingClientRect();hit=r.width>0&&r.left<wr.right-2&&r.right>wr.left+2&&r.top<wr.bottom&&r.bottom>wr.top;}
  p.style.visibility=hit?'hidden':'';}}catch(e){}},150);
