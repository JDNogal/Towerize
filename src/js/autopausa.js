// ==================== v326 · Pausa automática al cambiar de ventana ====================
// Idea aprobada por Nogal (13-nov-2026): si la ventana del juego pierde el foco en plena partida, se abre el menú de pausa.
// Se puede quitar en Opciones › Juego.
if(OPT.autopause===undefined)OPT.autopause=true;
OPTS.splice(Math.max(0,OPTS.findIndex(o=>o.tab==='jg')),0,{tab:'jg',type:'toggle',key:'autopause',def:true,label:'Pausa automática',desc:'Si cambias de ventana o de pestaña en plena partida, el juego se pausa solo.'});
function apAutoPause(){try{if(!OPT.autopause||typeof S==='undefined'||!S||!S.hero||S.pvE||S.pvH||PREVIEWING)return;if(!(S.phase==='wave'||S.phase==='build'))return;
 if(S.speed===0||(typeof LB!=='undefined'&&LB.open)||(typeof RL!=='undefined'&&RL.open)||document.body.classList.contains('inmenu'))return;openPause();}catch(e){}}
addEventListener('blur',apAutoPause);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')apAutoPause();});
