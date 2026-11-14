// ==================== v329 · Piezas por era (Nogal, 14-nov-2026) ====================
// Cada era trae 4 piezas nuevas: 2 en la 1.ª partida de la era, 1 en la 2.ª y 1 en la 3.ª. Descubiertas, salen en cualquier era.
// Se diseñan en el «Taller de piezas» (artefacto). Las de una era no alcanzada no salen en el compendio.
// Recoveco: diseño de Nogal (camino pegado al borde: si toca otra pieza fuera de una salida, valla). Solares provisionales
// hasta que Nogal los ponga en el Taller.
PIECES.push({n:'Recoveco',p:['#...###','#.#####','#..####','##.###.','##...#.','####...','#######']});
SOLARES.Recoveco=[[[0,1],[1,5],[4,0],[5,4]]];SOLN.Recoveco=3;
function pzeOf(n){return ({Recoveco:[2,1]})[n];}/* función (no const): se consulta antes de cargar este archivo */
function pieceOk(n){const z=pzeOf(n);if(!z)return true;if(typeof S!=='undefined'&&S&&S.tut)return false;return (typeof bfzLv==='function'?bfzLv(z[0]):0)>=z[1];}
function pieceEraOk(n){const z=pzeOf(n);return !z||z[0]===1||(typeof era2Ok==='function'&&era2Ok());}
