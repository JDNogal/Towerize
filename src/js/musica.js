// ---- música de fondo ----
// La canción se inyecta solo en las versiones de prueba (build.js --out, si existe musica/tema.mp3, que no va al repositorio).
// Suena en bucle desde el primer clic o tecla (el navegador no deja sonar antes). Volumen = general × música.
// Se pausa con la pestaña oculta. Si no hay canción, no hace nada.
const MUS={el:null,on:false};
const musVol=()=>Math.max(0,Math.min(1,(OPT.vm??80)/100*(OPT.vu??60)/100*.45));
function musStart(){if(MUS.on||typeof window==='undefined'||!window.MUSIC_SRC)return;MUS.on=true;
 try{const a=new Audio(window.MUSIC_SRC);a.loop=true;a.volume=musVol();MUS.el=a;const p=a.play();if(p&&p.catch)p.catch(()=>{MUS.on=false;MUS.el=null;});}catch(e){MUS.on=false;}}
if(typeof window!=='undefined'){
 for(const ev of['pointerdown','keydown'])window.addEventListener(ev,musStart,{capture:true});
 setInterval(()=>{if(MUS.el)MUS.el.volume=musVol();},300);
 document.addEventListener('visibilitychange',()=>{if(!MUS.el)return;if(document.hidden)MUS.el.pause();else MUS.el.play().catch(()=>{});});}
