#!/usr/bin/env node
// Batería de pruebas de Towerize.
//   node tests/run.js                 → prueba el index.html de la raíz (haz antes «node build.js»)
//   node tests/run.js ruta/al.html    → prueba otro archivo (p. ej. un towerize-vNNN.html)
//   node tests/run.js faro libro      → solo las pruebas cuyo nombre contenga «faro» o «libro»
// Necesita: npm install (jsdom y playwright) y, la primera vez, «npx playwright install chromium».
// Las capturas que hacen las pruebas quedan en tests/out/ (no se suben al repo).
const {spawnSync}=require('child_process'),fs=require('fs'),path=require('path');
const args=process.argv.slice(2),fileArg=args.find(a=>a.endsWith('.html'));
const FILE=path.resolve(fileArg||path.join(__dirname,'..','index.html'));
const only=args.filter(a=>a!==fileArg);
if(!fs.existsSync(FILE)){console.error('No existe '+FILE+'. Ejecuta antes «node build.js».');process.exit(1);}
// [archivo, qué comprueba, variantes (pc / m = móvil), intentos]
const T=[
 ['sintaxis.js','El JavaScript montado se puede ejecutar'],
 ['vistos_al_cargar.js','Arranca sin nada descubierto (jsdom)'],
 ['contenido_jsdom.js','Reliquias, enemigos, eventos y logros se crean bien (jsdom)'],
 ['fallos_estudio.js','Interferencia y empujones a jefes (jsdom)'],
 ['portal_union.js','Portal en medio solo al unir dos extremos con una pieza (jsdom)'],
 ['logros_y_tutorial.js','Logros, tutorial y pistas (jsdom)'],
 ['pausa_y_estadisticas.js','Pausa, estadísticas y bocadillo de error, en PC y móvil'],
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
 ['habilidades_enemigos.js','Habilidades de los enemigos: embeleso, interferencia, golpes de campeón, disparos en arco y voladores que atacan'],
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
 ['eventos_e2.js','Eventos de la era 2, evento por fases y torre Prototipo Omega'],
 ['sonidos_e2.js','Sonidos nuevos de la era 2 y música por era'],
];
// una prueba pasa si termina sin error y su última línea dice que no hubo errores de página
const okLast=l=>/^(\[\]|ok|ERRS \[\]|\{.*\}|.* ok)$/.test(l)||/ OK$|sin cintas\)$/.test(l);
let pass=0,fail=0;const t0=Date.now();
console.log('Probando '+path.relative(process.cwd(),FILE)+'\n');
for(const [f,desc,vars,tries] of T){
 if(only.length&&!only.some(o=>f.includes(o)))continue;
 for(const v of vars||['pc']){
  let res,last='',ok=false;
  for(let i=0;i<(tries||1)&&!ok;i++){
   res=spawnSync(process.execPath,[path.join(__dirname,f),FILE,...(v==='m'?['m']:[])],{encoding:'utf8',timeout:180000});
   const out=((res.stdout||'')+(res.stderr||'')).split('\n').filter(l=>l.trim()&&!/agent-proxy|fonts\.g|Allowed|details/.test(l));
   last=(out[out.length-1]||'').trim();ok=res.status===0&&okLast(last)&&!out.some(l=>/^FALLOS\b/.test(l.trim()))&&!/Error|Uncaught/.test(res.stderr||'');
   if(!ok&&i+1<(tries||1))continue;
   if(!ok){console.log('✗ '+f+(vars?' ('+v+')':'')+' — '+desc);console.log(out.slice(-12).map(l=>'    '+l).join('\n'));}
  }
  if(ok){pass++;console.log('✓ '+f+(vars?' ('+v+')':'')+' — '+desc);}else fail++;
 }
}
console.log(`\n${pass} bien · ${fail} mal · ${((Date.now()-t0)/1000).toFixed(0)} s`);
process.exit(fail?1:0);
