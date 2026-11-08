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
   last=(out[out.length-1]||'').trim();ok=res.status===0&&okLast(last)&&!/Error|Uncaught/.test(res.stderr||'');
   if(!ok&&i+1<(tries||1))continue;
   if(!ok){console.log('✗ '+f+(vars?' ('+v+')':'')+' — '+desc);console.log(out.slice(-12).map(l=>'    '+l).join('\n'));}
  }
  if(ok){pass++;console.log('✓ '+f+(vars?' ('+v+')':'')+' — '+desc);}else fail++;
 }
}
console.log(`\n${pass} bien · ${fail} mal · ${((Date.now()-t0)/1000).toFixed(0)} s`);
process.exit(fail?1:0);
