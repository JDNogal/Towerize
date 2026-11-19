// ==================== v361 · ICONOS PROVISIONALES de las torres de evento (dibujados por Claude; Mesa «iconos v361», por aprobar) ====================
// Mismo estilo que el resto de ICKW: lienzo 48×48, contorno #1b1712 de 2,1 y colores planos.
{const O='stroke="#1b1712" stroke-width="2.1" stroke-linejoin="round" stroke-linecap="round"';
 // Luz (Faro): un destello con rayos
 ICKW.luz=`<g ${O}>${[0,45,90,135,180,225,270,315].map(a=>`<path d="M24 ${a%90?9:5}l3 8h-6z" fill="#ffd54a" transform="rotate(${a} 24 24)"/>`).join('')}<circle cx="24" cy="24" r="9.5" fill="#fff3b0"/><circle cx="21" cy="21" r="3" fill="#ffffff" stroke-width="0"/></g>`;
 // Crecimiento (dragón): huevo con grieta y flecha hacia arriba
 ICKW.crece=`<g ${O}><g transform="translate(-2 0)"><path d="M17 7c-7 0-12 12-12 21a12 12 0 0 0 24 0c0-9-5-21-12-21z" fill="#9fdc7a"/><path d="M9 25l4 3 3-4 4 4 3-3" fill="none"/><circle cx="12" cy="16" r="2" fill="#5fa84a" stroke-width="0"/><circle cx="21" cy="35" r="2.2" fill="#5fa84a" stroke-width="0"/></g><path d="M40 40V20h-4.5l8-10 8 10H47v20z" fill="#5ce05a"/></g>`;
 // Llamarada (dragón anciano): llamarada en cono, saliendo a la derecha
 ICKW.llama=`<g ${O}><path d="M4 24c6-3 10-9 18-12 6-2 12 0 15-4 3 6 8 9 7 16 1 7-4 10-7 16-3-4-9-2-15-4-8-3-12-9-18-12z" fill="#ff7a2e"/><path d="M14 24c5-2 8-6 13-7 4 0 7-1 9-3 2 4 4 6 4 10s-2 6-4 10c-2-2-5-3-9-3-5-1-8-5-13-7z" fill="#ffd75a" stroke-width="1.4"/></g>`;
 // Comida (Mímico): muslo de pollo
 ICKW.comida=`<g ${O}><g transform="rotate(-45 24 24)"><path d="M20.5 26h7v11h-7z" fill="#f4ead8"/><circle cx="20.5" cy="40" r="3.6" fill="#f4ead8"/><circle cx="27.5" cy="40" r="3.6" fill="#f4ead8"/><path d="M21 37.5h6" fill="none" stroke="#f4ead8" stroke-width="3"/><path d="M24 4c8 0 12 7 12 13 0 7-5 11-12 11s-12-4-12-11c0-6 4-13 12-13z" fill="#c9773a"/><path d="M18 11c2-3 6-4 9-3" fill="none" stroke="#f0b27a" stroke-width="2.2"/></g></g>`;
 // Familias (Omega): hexágono con tres huecos de colores
 ICKW.omfam=`<g ${O}><path d="M24 4l18 10v20L24 44 6 34V14z" fill="#8a94a6"/><circle cx="24" cy="15" r="5.5" fill="#ff7a2e"/><circle cx="15" cy="30" r="5.5" fill="#c070ff"/><circle cx="33" cy="30" r="5.5" fill="#7ad8ff"/></g>`;
 // Tronco rodante (Casa de madera): el dibujo de «Troncos gordos» con rayas de movimiento
 ICKW.logk=`<g transform="translate(28 24) scale(1.25)"><path d="M-14 -7h26a4 7 0 0 1 0 14h-26a4 7 0 0 1 0-14z" fill="#a8743a" stroke="#1b1712" stroke-width="2.1" stroke-linejoin="round" stroke-linecap="round"/><path d="M-12 -2h12M-8 3h14" fill="none" stroke="#7a4a2a" stroke-width="1.2" stroke-linecap="round"/><ellipse cx="12" cy="0" rx="4" ry="7" fill="#e0b070" stroke="#1b1712" stroke-width="2.1"/><ellipse cx="12" cy="0" rx="2" ry="3.4" fill="none" stroke="#a8743a" stroke-width="1"/></g><path d="M1 17h5M0 24h6M1 31h5" fill="none" stroke="#1b1712" stroke-width="4.6" stroke-linecap="round"/><path d="M1 17h5M0 24h6M1 31h5" fill="none" stroke="#5ab8ff" stroke-width="2.2" stroke-linecap="round"/>`;/* el mismo tronco que «Troncos gordos» (Nogal) */
 // Fardo de paja (Casa de paja): un fardo con sus dos cuerdas y pajas sueltas
 ICKW.bale=`<g ${O}><path d="M6 14h36a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V18a4 4 0 0 1 4-4z" fill="#e8cf6a"/><path d="M15 14v22M33 14v22" fill="none" stroke="#9a6a2a" stroke-width="2.6"/><path d="M7 20h5M20 21h9M37 19h4M8 29h4M21 28h8M37 30h5" fill="none" stroke="#c4a640" stroke-width="1.5"/><path d="M4 12l-3-3M44 12l3-3M24 36l1 5" fill="none" stroke-width="1.6"/></g>`;
 // Roca rodante (Ogros lanzarrocas): una roca con rayas de movimiento detrás
 ICKW.rroll=`<g ${O}><path d="M4 18h10M2 26h10M5 34h9" fill="none" stroke="#7e9a5a" stroke-width="3"/><circle cx="30" cy="26" r="14" fill="#9a928a"/><path d="M24 20l5 3-2 6M34 30l4-1" fill="none" stroke-width="1.6"/></g>`;
 // Llamarada: el mismo icono que su habilidad, Aliento abrasador (Nogal: lo que viene de una habilidad lleva el icono de la habilidad)
 if(typeof AB!=='undefined'&&AB.dbreath&&ICSV[AB.dbreath.ic])ICKW.llama=ICSV[AB.dbreath.ic];
 // Muro (Casa de ladrillo): ya tiene dibujo aprobado (el de su casilla de evento, te_bwall): se usa ese
 if(typeof ICUIS!=='undefined'&&ICUIS.te_bwall)ICKW.bwall=ICUIS.te_bwall;}
