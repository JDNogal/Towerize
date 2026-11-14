// ==================== v329 · Piezas por era (Nogal, 14-nov-2026) ====================
// Cada era trae 4 piezas nuevas: 2 en la 1.ª partida de la era, 1 en la 2.ª y 1 en la 3.ª. Descubiertas, salen en cualquier era.
// Diseñadas con Nogal en el «Taller de piezas» (artefacto): caminos y solares (V1–V3) suyos. Recoveco es un diseño suyo:
// su camino toca el borde fuera de las salidas (si toca otra pieza, valla). Las de una era no alcanzada no salen en el compendio.
PIECES.push({n:"Desvío",p:["#######", "#######", "#######", ".......", "#.###.#", "#.....#", "#######"]});SOLARES["Desvío"]=[[[2, 4], [4, 4]], [[1, 1], [5, 1], [3, 4]], [[3, 1], [0, 5], [6, 5]]];
PIECES.push({n:"Ocho",p:["###.###", "##...##", "##.#.##", "##...##", "##.#.##", "##...##", "###.###"]});SOLARES["Ocho"]=[[[3, 2], [3, 4]], [[4, 0], [3, 4], [2, 6]], [[3, 2], [1, 3], [5, 3]]];
PIECES.push({n:"Recoveco",p:["#...###", "#.#####", "#..####", "##.###.", "##...#.", "####...", "#######"]});SOLARES["Recoveco"]=[[[2, 1], [3, 3], [5, 4]], [[4, 0], [6, 2], [1, 3], [3, 5]], [[0, 0], [4, 2], [1, 5], [6, 6]]];
PIECES.push({n:"Rotonda",p:["###.###", "###.###", "##...##", "...#...", "##...##", "###.###", "###.###"]});SOLARES["Rotonda"]=[[[2, 0], [3, 3], [4, 6]], [[0, 0], [6, 0], [0, 6], [6, 6]], [[1, 1], [5, 1], [1, 5], [5, 5]]];
function pzeOf(n){return ({'Desvío':[2,1],'Ocho':[2,1],'Recoveco':[2,2],'Rotonda':[2,3]})[n];}/* función (no const): se consulta antes de cargar este archivo */
function pieceOk(n){const z=pzeOf(n);if(!z)return true;if(typeof S!=='undefined'&&S&&S.tut)return false;return (typeof bfzLv==='function'?bfzLv(z[0]):0)>=z[1];}
function pieceEraOk(n){const z=pzeOf(n);return !z||z[0]===1||(typeof era2Ok==='function'&&era2Ok());}
// v329: las piezas también pueden salir en espejo (la mitad de las veces), con sus solares y casillas especiales
function mirO(o){o.p=o.p.map(r=>[...r].reverse().join(''));o.b=(o.b||[]).map(({x,y,k})=>({x:P-1-x,y,k}));}
