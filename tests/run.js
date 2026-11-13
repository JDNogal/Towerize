#!/usr/bin/env node
// Batería de pruebas de Towerize.
//   node tests/run.js                 → prueba el index.html de la raíz (haz antes «node build.js»)
//   node tests/run.js ruta/al.html    → prueba otro archivo (p. ej. un towerize-vNNN.html)
//   node tests/run.js faro libro      → solo las pruebas cuyo nombre contenga «faro» o «libro»
//   node tests/run.js ui              → solo las de menús, libro y aspecto (rápidas, para cambios visuales); «juego» → el resto
// Necesita: npm install (jsdom y playwright) y, la primera vez, «npx playwright install chromium».
// Las capturas que hacen las pruebas quedan en tests/out/ (no se suben al repo).
const {spawnSync}=require('child_process'),fs=require('fs'),path=require('path');
const args=process.argv.slice(2),fileArg=args.find(a=>a.endsWith('.html'));
const FILE=path.resolve(fileArg||path.join(__dirname,'..','index.html'));
// grupos: «ui» = solo pruebas de menús, libro y aspecto (para cambios visuales); «juego» = el resto
const UI=['sintaxis.js','navegacion_teclado.js','compendio_libro.js','libro_filtros.js','libro_menus.js','bocadillo.js','libro_bordes.js','encuadernaciones.js','libro_flechas_puntitos.js','preparacion_partida.js','libro_nucleo.js','final_partida.js','registro_partidas.js','compendio_enlace.js','logro_enlace.js','novedades.js','filtros_era.js','vista_enemigos.js','piezas_compendio.js','habilidades_compendio.js','tablet.js'];
const grp=args.includes('ui')?'ui':args.includes('juego')?'juego':null;
const only=args.filter(a=>a!==fileArg&&a!=='ui'&&a!=='juego'&&!/^-j\d+$/.test(a));
if(!fs.existsSync(FILE)){console.error('No existe '+FILE+'. Ejecuta antes «node build.js».');process.exit(1);}
// [archivo, qué comprueba, variantes (pc / m = móvil), intentos]
const T=[
 ['sintaxis.js','El JavaScript montado se puede ejecutar'],
 ['vistos_al_cargar.js','Arranca sin nada descubierto (jsdom)'],
 ['contenido_jsdom.js','Reliquias, enemigos, eventos y logros se crean bien (jsdom)'],
 ['fallos_estudio.js','Interferencia y empujones a jefes (jsdom)'],
 ['portal_union.js','Portal en medio solo al unir dos extremos con una pieza (jsdom)'],
 ['logros_y_tutorial.js','Logros, tutorial y pistas (jsdom)'],
 ['pausa_y_estadisticas.js','Pausa, estadísticas y bocadillo de error, en PC y móvil',null,2],
 ['anillo_construccion.js','Anillo de construcción y compra marcada 🔖'],
 ['heroe_en_mapa.js','Héroe en el mapa: tocarlo, moverlo, bocadillo, avisos',['pc','m']],
 ['logros_ocultos.js','Logros ocultos sin spoilers'],
 ['navegacion_teclado.js','Menús con teclado (WASD/flechas, Intro, Q/E)'],
 ['compendio_libro.js','Compendio en formato libro',['pc','m']],
 ['libro_filtros.js','Filtros del libro, clic fuera, marcapáginas'],
 ['faro.js','Faro: zonas de luz, bonus y enfriamiento',null,3],
 ['libro_menus.js','Libro: portada, áreas, Esc, Q/E, clic fuera',['pc','m']],
 ['bocadillo.js','Bocadillo de pergamino en lugar del title del navegador'],
 ['libro_bordes.js','El libro y sus cintas caben en ventanas de varios tamaños'],
 ['encuadernaciones.js','Las 8 encuadernaciones cargan sus colores; la inicial es Pergamino'],
 ['libro_flechas_puntitos.js','Flechas de pasar página y puntito de novedad en las cintas'],
 ['preparacion_partida.js','Nueva partida en el libro: aprender, era, duración y héroe',['pc','m']],
 ['libro_nucleo.js','El libro sale del núcleo y vuelve a él; menú sobre el tablero',['pc','m']],
 ['final_partida.js','Victoria/Derrota como libro: ver mapa, logros, jugar de nuevo',['pc','m']],
 ['guardar_partida.js','Guardar y continuar: construcción, en oleada (vuelve al inicio), borrar al perder, formato antiguo'],
 ['niveles_vistos.js','Niveles de torre sin spoilers: solo los alcanzados, con aviso'],
 ['pista_bloquea.js','Con una pista abierta no se puede hacer nada más (ni empezar la oleada)'],
 ['tutorial_evento.js','El tutorial trae 2 eventos (santuario y mercader) y 2 cofres'],
 ['tutorial_completo.js','El tutorial completo se juega de principio a fin sin atascarse (10 rondas)'],
 ['eter_habla.js','ÉTER habla en partida: fallos, nombre, enfriamiento, opción',['pc','m']],
 ['guardar_ventanas_tutorial.js','Guardar con cofre, evento u oferta abiertos; fin de ronda; tutorial'],
 ['radagast_primera.js','Radagast se desbloquea al ganar la primera partida (aunque se salte el tutorial)'],
 ['registro_partidas.js','Registro de partidas: se apunta al empezar, se cierra al acabar y se ve en el libro'],
 ['primera_partida.js','Primera partida: directa a 15 rondas, intro con Reinhart y Sylvana y luego elegir héroe; Radagast se presenta al ganar'],
 ['era2.js','Era 2 (Distópica · Ruinas de Neón): se abre con 3 victorias, se elige en el libro y dibuja su mapa'],
 ['era2_torres.js','Torres de serie de la era 2, torres de bufo, Vega y la Radio de la Resistencia'],
 ['desbloqueables.js','Lanzallamas, Chorro de ácido y Torre sónica con sus especializaciones, habilidades y logros'],
 ['compendio_enlace.js','Compendio enlazado: botón 📖, pestaña Mecánicas, flechas de evolución y aviso de enemigo nuevo'],
 ['casillas_nuevas.js','Casillas especiales nuevas: Precisión, Perforación, Eco, Persistencia, Taller y Cuartel'],
 ['enemigos.js','Enemigos por facciones: tipos nuevos, iconos, escuadras con líder y cadena de mando'],
 ['habilidades_enemigos.js','Habilidades de los enemigos: embeleso, interferencia, golpes de campeón, disparos en arco y voladores que atacan',null,2],
 ['elites.js','Mini-élites y élites de cada era con sus habilidades'],
 ['jefes.js','Jefes de historia: los tres de cada era y su orden'],
 ['vales_boton.js','Vales y tickets: el botón de mejorar los ofrece cuando no llega el oro'],
 ['heroes_e2.js','Héroes de la era 2: Korr, Ferro y Kai con sus habilidades, reliquias y charcos en franja'],
 ['reliquias_e2.js','Reliquias de la era 2: cuatro de cofre y cinco de evento'],
 ['reliquias_e2b.js','Reliquias de la era 2: segunda tanda de doce'],
 ['alienigenas.js','Criaturas alienígenas: enjambre, Colmena, Depredadores y desbloqueo con Korr'],
 ['recompensa_evento.js','Torre de evento al acabar la oleada antes de la ronda siguiente'],
 ['teclas_bloqueo.js','Teclas rápidas bloqueadas cuando el ratón no puede pulsar el control'],
 ['codigo_guardado.js','Código de guardado: copiar progreso y partida a otro navegador'],
 ['logro_enlace.js','Logros pedidos: enlace a Logros desde torres y héroes bloqueados, fijar y volver'],
 ['novedades.js','Novedades del compendio por ficha y marcar todos como vistos'],
 ['construir_anillo.js','Construir con el anillo y el ratón (dos clics en la torre)'],
 ['historia_kai.js','Historia de Kai: aparece con Vega en la ronda de jefe y se une si la oleada sale perfecta'],
 ['cruces_reparto.js','Cruces: los enemigos se reparten entre ramas igual de largas; cada escuadra va entera por una'],
 ['pendientes_evento.js','Pendientes de eventos: oro de la cámara, élites de encargo y extras de la oleada con su cuenta atrás'],
 ['linea_rondas.js','Línea de rondas: 5 puntos que rotan, jefe, élites y mini-élites, y la línea se rellena con la oleada'],
 ['filtros_era.js','Compendio: familias sin partir por era y filtro por era en todas las pestañas'],
 ['red_electrica.js','Red eléctrica: se conecta con las torres dentro de su alcance'],
 ['vista_enemigos.js','Vistas previas: enemigos en tarjeta con scroll y filtros; el núcleo no cae'],
 ['piezas_compendio.js','Compendio de piezas: variantes vistas y decorado de cada era'],
 ['habilidades_compendio.js','Compendio: el bocadillo de las habilidades de Nv 4'],
 ['equilibrio_v305.js','Retoques de equilibrio tras el estudio de torres'],
 ['evento_logro.js','Salamandra desde el principio; «Todo arde» desbloquea el Nido abandonado'],
 ['eventos_e2.js','Eventos de la era 2, evento por fases y torre Prototipo Omega'],
 ['eventos_imagenes.js','Eventos en pergamino: dibujo de cada evento y de cada opción'],
 ['sonidos_e2.js','Sonidos nuevos de la era 2 y música por era'],
 ['especializaciones_nuevas.js','Especializaciones nuevas: Senda rúnica, Dron petrolero, Cañón de riel y Drones bombarderos',null,2],
 ['compendio_eventos.js','Compendio de eventos: imagen de cada evento, opciones y página de cada opción'],
 ['puntuacion.js','Puntuación: durante la partida, en la pausa, en Estadísticas, al final y en Partidas'],
 ['regen_resmag.js','Regeneración de enemigos fuertes y resistencia mágica rota'],
 ['paneles_mazo.js','Paneles del mazo y del cofre con la elección de pieza pendiente'],
 ['amenazas.js','Amenazas: desbloqueo, botón, pantalla, resumen, Supercampeones, Venganza, puntuación y Borrar progreso'],
 ['logros_cerca.js','Aviso de «¡Cerca de un logro!» al 80 %, con botón para fijarlo'],
 ['novedades.js','Menú principal (Continuar / Nueva partida) y Novedades'],
 ['amenazas2.js','Amenazas, tanda 2: Asedio sin tregua, Inflación y Niebla de guerra'],
 ['amenazas3.js','Amenazas, tanda 3: Sabotaje y Abanderados'],
 ['clasificacion.js','Clasificación: botón al final, aviso, nombre del piloto, subida y tabla'],
 ['logros_niveles.js','Logros por niveles (bronce, plata, oro, platino), bajas con cada torre y Estadísticas › Marcas'],
 ['torres_evento_hab.js','Habilidades de las torres de evento: Faro, cerditos, Gremio, Mímico y Dragón anciano',null,2],
];
// una prueba pasa si termina sin error y su última línea dice que no hubo errores de página
const okLast=l=>/^(\[\]|ok|ERRS \[\]|\{.*\}|.* ok)$/.test(l)||/ OK$|sin cintas\)$/.test(l);
let pass=0,fail=0;const t0=Date.now();
console.log('Probando '+path.relative(process.cwd(),FILE)+'\n');
// se lanzan varias a la vez (por defecto 2; «-j3» para cambiarlo)
const J=+((args.find(a=>/^-j\d+$/.test(a))||'-j2').slice(2));
const jobs=[];for(const [f,desc,vars,tries] of T){
 if(only.length&&!only.some(o=>f.includes(o)&&!/^-j\d+$/.test(o)))continue;if(grp==='ui'&&!UI.includes(f))continue;if(grp==='juego'&&UI.includes(f)&&f!=='sintaxis.js')continue;
 for(const v of vars||['pc'])jobs.push({f,desc,vars,tries,v});}
const {spawn}=require('child_process');
function runOne(jb){return new Promise(res=>{const p=spawn(process.execPath,[path.join(__dirname,jb.f),FILE,...(jb.v==='m'?['m']:[])]);let o='',e='';const to=setTimeout(()=>p.kill(),180000);
 p.stdout.on('data',d=>o+=d);p.stderr.on('data',d=>e+=d);p.on('close',code=>{clearTimeout(to);res({code,stdout:o,stderr:e});});});}
async function job(jb){let ok=false,out=[];for(let i=0;i<(jb.tries||1)&&!ok;i++){const r=await runOne(jb);out=((r.stdout||'')+(r.stderr||'')).split('\n').filter(l=>l.trim()&&!/agent-proxy|fonts\.g|Allowed|details/.test(l));
  const last=(out[out.length-1]||'').trim();ok=r.code===0&&okLast(last)&&!out.some(l=>/^FALLOS\b/.test(l.trim()))&&!/Error|Uncaught/.test(r.stderr||'');}
 const nm=jb.f+(jb.vars?' ('+jb.v+')':'')+' — '+jb.desc;if(ok){pass++;console.log('✓ '+nm);}else{fail++;console.log('✗ '+nm);console.log(out.slice(-12).map(l=>'    '+l).join('\n'));}}
(async()=>{let k=0;await Promise.all(Array.from({length:Math.max(1,J)},async()=>{while(k<jobs.length)await job(jobs[k++]);}));
 console.log(`\n${pass} bien · ${fail} mal · ${((Date.now()-t0)/1000).toFixed(0)} s`);process.exit(fail?1:0);})();
