// ==================== v361 · ICONOS PROVISIONALES de las torres de evento (dibujados por Claude; Mesa «iconos v361», por aprobar) ====================
// Mismo estilo que el resto de ICKW: lienzo 48×48, contorno #1b1712 de 2,1 y colores planos.
{const O='stroke="#1b1712" stroke-width="2.1" stroke-linejoin="round" stroke-linecap="round"';
 // Luz (Faro): un destello con rayos
 ICKW.luz=`<g ${O}>${[0,45,90,135,180,225,270,315].map(a=>`<path d="M24 ${a%90?9:5}l3 8h-6z" fill="#ffd54a" transform="rotate(${a} 24 24)"/>`).join('')}<circle cx="24" cy="24" r="9.5" fill="#fff3b0"/><circle cx="21" cy="21" r="3" fill="#ffffff" stroke-width="0"/></g>`;
 // Crecimiento (dragón): huevo con grieta y flecha hacia arriba
 ICKW.crece=`<g ${O}><path d="M20 6c-8 0-13 13-13 22a13 13 0 0 0 26 0c0-9-5-22-13-22z" fill="#9fdc7a"/><path d="M12 25l4 3 3-4 4 4 3-3" fill="none"/><circle cx="15" cy="16" r="2" fill="#5fa84a" stroke-width="0"/><circle cx="25" cy="36" r="2.4" fill="#5fa84a" stroke-width="0"/><path d="M38 44V22h-5l8-10 8 10h-5v22z" fill="#5ce05a"/></g>`;
 // Llamarada (dragón anciano): llamarada en cono, saliendo a la derecha
 ICKW.llama=`<g ${O}><path d="M4 24c6-3 10-9 18-12 6-2 12 0 15-4 3 6 8 9 7 16 1 7-4 10-7 16-3-4-9-2-15-4-8-3-12-9-18-12z" fill="#ff7a2e"/><path d="M14 24c5-2 8-6 13-7 4 0 7-1 9-3 2 4 4 6 4 10s-2 6-4 10c-2-2-5-3-9-3-5-1-8-5-13-7z" fill="#ffd75a" stroke-width="1.4"/></g>`;
 // Comida (Mímico): muslo de pollo
 ICKW.comida=`<g ${O}><path d="M30 18c5-9 16-8 16 1 0 8-9 12-16 10l-9 9c1 3-1 6-4 6-2 0-3-2-3-3-1 0-3-1-3-3 0-3 3-5 6-4l9-9c-1-3 1-6 4-7z" fill="#c9773a"/><path d="M33 20c3-4 9-4 10 0" fill="none" stroke="#f0b27a" stroke-width="2.2"/><path d="M13 39l7-7" fill="none" stroke="#f4ead8" stroke-width="3.2"/></g>`;
 // Familias (Omega): hexágono con tres huecos de colores
 ICKW.omfam=`<g ${O}><path d="M24 4l18 10v20L24 44 6 34V14z" fill="#8a94a6"/><circle cx="24" cy="15" r="5.5" fill="#ff7a2e"/><circle cx="15" cy="30" r="5.5" fill="#c070ff"/><circle cx="33" cy="30" r="5.5" fill="#7ad8ff"/></g>`;
 // Tronco rodante (Casa de madera): tronco tumbado con sus anillos y rayas de movimiento
 ICKW.logk=`<g ${O}><path d="M14 14h22v20H14z" fill="#a8693a"/><ellipse cx="14" cy="24" rx="7" ry="10" fill="#e3b178"/><ellipse cx="14" cy="24" rx="3.5" ry="5" fill="none" stroke-width="1.5"/><path d="M42 16h5M41 24h6M42 32h5" fill="none" stroke="#5ab8ff" stroke-width="2.4"/><path d="M20 19h12M22 29h10" fill="none" stroke="#7a4a22" stroke-width="1.6"/></g>`;
 // Muro (Casa de ladrillo): ya tiene dibujo aprobado (el de su casilla de evento, te_bwall): se usa ese
 if(typeof ICUIS!=='undefined'&&ICUIS.te_bwall)ICKW.bwall=ICUIS.te_bwall;}
