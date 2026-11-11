// ==================== v307 · Trofeos por era, infinito propio y bordes de reliquias/habilidades ====================
// · Logros: el icono es un trofeo que cambia con el aspecto: copa de torneo (libro) y copa de neón (tablet).
// · ♾ propio (solo el lazo, sin el círculo del emoji del sistema).
// · Bordes: reliquias en ámbar; héroe con activa cian, pasivas violeta y definitiva dorada.
const TROF={
 perg:'<svg class="trof" viewBox="0 0 64 64" width="1em" height="1em"><g stroke="#1b1410" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"><path d="M18 10h28v8c0 10-6 17-14 17s-14-7-14-17z" fill="#f2c140"/><path d="M18 14c-8 0-9 12 1 14M46 14c8 0 9 12-1 14" fill="none" stroke-width="3.5"/><path d="M18 14c-8 0-9 12 1 14M46 14c8 0 9 12-1 14" fill="none" stroke="#ffd75a" stroke-width="1.5"/><path d="M28 35h8l-1 8h-6z" fill="#e0a830"/><path d="M22 43h20v5H22zM18 48h28v7H18z" fill="#7a4a2a"/><circle cx="32" cy="21" r="3.6" fill="#e0405a"/><path d="M22 13.5h20" stroke="#fff6c0" stroke-width="1.6" opacity=".8"/></g></svg>',
 holo:'<svg class="trof" viewBox="0 0 64 64" width="1em" height="1em"><g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h28v8c0 10-6 17-14 17s-14-7-14-17z" stroke="#3fe8ff" stroke-width="3.4"/><path d="M18 14c-8 0-9 12 1 14M46 14c8 0 9 12-1 14M28 35v8M36 35v8M22 43h20M18 54h28" stroke="#ff4fd8" stroke-width="3.4"/><path d="M22 48.5h20" stroke="#3fe8ff" stroke-width="3.4"/><path d="M32 15l2.2 4.4 4.8.7-3.5 3.4.8 4.8L32 26l-4.3 2.3.8-4.8-3.5-3.4 4.8-.7z" fill="#fff" stroke="none"/></g></svg>'};
const trofIc=()=>{const k=typeof skinNow==='function'?skinNow():'perg';return TROF[k==='holo'?'holo':'perg'];};
// pestaña Logros (cinta/tecla) y marca «Todos» con el trofeo de la era
try{Object.defineProperty(LBAREAS.find(a=>a[0]==='lg'),2,{get:trofIc,configurable:true});}catch(e){}
try{Object.defineProperty(LGICO,'all',{get:trofIc,configurable:true,enumerable:true});}catch(e){}
try{Object.defineProperty(CTICO,'lg',{get:trofIc,configurable:true,enumerable:true});}catch(e){}
