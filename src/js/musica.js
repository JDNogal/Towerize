// ---- música de fondo ----
// Las canciones se inyectan solo en las versiones de prueba (build.js --out, si existen musica/tema.mp3 y musica/tema2.mp3, que no van al repositorio).
// tema = Era Fantástica y menús; tema2 = Era Distópica (suena mientras juegas una partida de esa era). Cada una en bucle.
// Suena desde el primer clic o tecla (el navegador no deja sonar antes). Volumen = general × música. Se pausa con la pestaña oculta.
const MUS={el:null,on:false,k:0,f:1};
const musVol=()=>Math.max(0,Math.min(1,(OPT.vm??80)/100*(OPT.vu??60)/100*.45));
// qué canción toca ahora: 2 dentro de una partida de la era 2 (si hay tema2), 1 en lo demás
const musWant=()=>{const e2=typeof S!=='undefined'&&S&&S.era===2&&!S.tut&&!(typeof inMenu==='function'&&inMenu());return e2&&window.MUSIC_SRC2?2:window.MUSIC_SRC?1:window.MUSIC_SRC2&&e2?2:0;};
function musPlay(k){const src=k===2?window.MUSIC_SRC2:window.MUSIC_SRC;if(!src)return;try{if(MUS.el){MUS.el.pause();MUS.el.src='';}const a=new Audio(src);a.loop=true;a.volume=0;MUS.el=a;MUS.k=k;MUS.f=0;const p=a.play();if(p&&p.catch)p.catch(()=>{MUS.on=false;MUS.el=null;MUS.k=0;});}catch(e){MUS.on=false;}}
function musStart(){if(MUS.on||typeof window==='undefined'||!(window.MUSIC_SRC||window.MUSIC_SRC2))return;const k=musWant();if(!k)return;MUS.on=true;musPlay(k);}
function musTick(){if(!MUS.on)return;const k=musWant();
 if(MUS.el&&k!==MUS.k){/* cambio de era: baja el volumen y cambia de canción */MUS.f=Math.max(0,MUS.f-.12);if(MUS.f<=0){if(k)musPlay(k);else{MUS.el.pause();MUS.k=0;}}}
 else if(!MUS.el&&k)musPlay(k);else if(MUS.f<1)MUS.f=Math.min(1,MUS.f+.08);
 if(MUS.el)MUS.el.volume=musVol()*MUS.f;}
if(typeof window!=='undefined'){
 for(const ev of['pointerdown','keydown'])window.addEventListener(ev,musStart,{capture:true});
 setInterval(()=>{try{musTick();}catch(e){}},100);
 document.addEventListener('visibilitychange',()=>{if(!MUS.el)return;if(document.hidden)MUS.el.pause();else MUS.el.play().catch(()=>{});});}
