# Equilibrio · v307 (11-nov)

Notas de la sesión de estudios y ajustes. Todo está guardado en la rama local `wip-v307`, sin subir.

## Cómo se ha medido

Cada prueba es **una torre sola** en el mismo mapa de laboratorio (azar con semilla), en el solar que más camino cubre:

- **Oleada 20**: los primeros 300 enemigos de la oleada real de la ronda 20. Se mira cuántos mata (bajas) y cuánta vida pierde el núcleo (fugas).
- **Solo élites** (nuevo): 10 élites de la era 1 (Élite, Troll, Caballero infernal, Señor de la guerra y Demonio errante, dos de cada), uno cada 2 s, con la vida de la ronda 20.
- **Un objetivo duro** (nuevo): un Señor de la guerra solo, ronda 20.
- **Jefe final**: cada especialización con todo al máximo contra los jefes finales de su era.
- **De apoyo** (nuevo): la torre junto a una Catapulta Nv 3, para ver qué aportan las torres de soldados y de control, que solas no matan.

Aviso: con una sola semilla hay ruido (una misma torre puede variar ±15 bajas entre tandas). Las conclusiones de abajo son las que se repiten.

## Qué salió del estudio base (v307 sin tocar)

1. **Varias especializaciones con todo al máximo limpiaban solas la oleada 20** en el mapa de laboratorio habitual: Trebuchet (304 bajas, 0 fugas), Guardián de la Ventisca (304, 0), Pestilencia (303, 2), Artilleros (297, 7), Enjambre devorador (294, 20), Heraldo del Juicio (291, 21) y Corazón Volcánico (280, 48). Eran más que las que teníamos apuntadas (Heraldo, Volcán y Detonador). El Detonador, en cambio, no se pasa: 161-176 bajas.
2. **Ese mapa es muy favorable.** En otros dos mapas (semillas 777 y 4242) las mismas torres matan entre 70 y 225: nadie limpia sola. La regla «ninguna torre sola limpia la oleada 20» se rompía en mapas con mucha cobertura.
3. **Contra élites el orden se invierte**, que es lo que queríamos: mandan Aliento de Forja, Nido de francotirador y Arco voltaico; las de área quedan abajo. La excepción eran los **Artilleros al máximo, que mataban a las 10 élites** (además de limpiar la oleada).
4. **Ninguna torre mata sola a un jefe final.** Las que más: Arco voltaico y Nido (dejan a La Forja al 23-25 %) y el Heraldo (Señor del Abismo al 50 %).
5. **Torres de soldados** (Baluarte, Monasterio, Robots, Criaturas alienígenas): solas contra la oleada no matan casi nada (0-10 bajas a Nv 3). Sus unidades hacen el mismo daño al enemigo en la ronda 1 que en la 20, mientras la vida de los enemigos sube; su papel es bloquear. Hace falta medirlas acompañadas (ver «De apoyo»).
6. **Flojas a secas**: Chorro de ácido (12 bajas a Nv 3), Búnker (15), Hechicero Helado sin habilidades (8), Nube viajera sin habilidades (2), Supresión (30, y es «para hordas»), Segador (23).
7. **Toxina letal** daba daño extra «a mini-élites, élites y jefes» por tipo de enemigo, que es justo lo que decidimos no hacer.

## Cambios hechos (antes → después)

### Bajadas
| Qué | Antes | Después |
|---|---|---|
| Trebuchet · Arsenal improvisado (ralentización de la brea) | 60 % / 70 % | 40 % / 50 % |
| Trebuchet · Restos del asedio (duración) | 6 s / 10 s | 5 s / 8 s |
| Ventisca · daño del aura (especialización) | ×0,5 | ×0,42 |
| Ventisca · Escarcha profunda (ralentización máx.) | 60 / 65 / 70 % | 55 / 60 / 65 % |
| Ventisca · Ventisca (congelar a todos) | cada 25 / 20 s, 3 / 4 s | cada 30 / 25 s, 2 / 3 s |
| Ventisca · Escarcha intensa | +10 / +20 % por s, máx. +50 / +100 % | +10 / +16 % por s, máx. +40 / +80 % |
| Pestilencia · Ponzoña (multiplica los stacks) | ×2 / ×3 | ×1,3 / ×1,6 |
| Pestilencia · Epidemia | 25 / 35 / 50 % | 15 / 25 / 35 % |
| Artilleros · Racimo (bombas pequeñas) | 2 / 3 / 4 | 2 / 2 / 3 |
| Artilleros · Onda expansiva (empujón) | 0,5 / 0,75 / 1 casilla | 0,3 / 0,45 / 0,6 |
| Artilleros · Bombardeo incendiario | 5 / 8 bombas, 6 / 10 stacks | 4 / 6 bombas, 4 / 7 stacks |
| Enjambre devorador · Hambre voraz | +12 / 16 / 20 % por baja, máx. ×2,4 / 3 / 3,5 | +8 / 11 / 14 %, máx. ×1,8 / 2,2 / 2,6 |
| Heraldo · carga por muerte cercana | 1 carga | 0,35 de carga |
| Heraldo · Rayo bifurcado | 2 / 3 enemigos | 1 / 2 |
| Heraldo · Fulgurita (daño por segundo) | 25 % | 20 % |
| Corazón Volcánico · daño | ×1,0 | ×0,75 |
| Corazón Volcánico · Erupción | 8 / 12 stacks | 6 / 9 |
| Alquimista · daño | ×1,6 | ×1,4 |

### Subidas
| Qué | Antes | Después |
|---|---|---|
| Baluarte · daño / vida de los soldados | 4 / 40 | 5,5 / 48 |
| Monasterio · daño / vida | 3,5 / 34 | 5 / 42 |
| Robots · daño / vida | 5 / 50 | 6,5 / 58 |
| Criaturas alienígenas · daño / vida | 2,2 / 15 | 3 / 18 |
| Búnker · daño | 3,6 | 4,2 |
| Chorro de ácido · stacks por chorro | 2 | 2,8 |
| Arqueros Raudos · daño | ×1,0 | ×1,15 |
| Ballesteros · daño | ×2,5 | ×2,8 |
| Electrocutor · daño | ×2,0 | ×2,3 |
| Hechicero Helado · daño | ×1,3 | ×1,8 |
| Segador de Almas · daño | ×0,85 | ×1,0 |
| Supresión · daño | ×0,9 | ×1,2 |

### Otros
- **Toxina letal** (Pestilencia): ya no da daño «a élites y jefes» por tipo. Escala con lo duro que es el objetivo (función nueva `toughK`, de 0 a 1 según su vida base): nada a los pequeños, ~45 % del bonus a mini-élites, todo a élites y jefes. Sirve de plantilla para las habilidades de un objetivo que escalan con la vida.
- **Arreglo**: la roca de los Ogros Lanzarrocas podía dar error si el enemigo alcanzado no venía de una casilla entera del camino (salió en el laboratorio; en partida normal no debería pasar, pero ya no puede).

## Oleada 20, especializaciones al máximo: antes y después en tres mapas

Bajas de 300 (mapa habitual / semilla 777 / semilla 4242) y vida que pierde el núcleo.

| Especialización (todo al máximo) | Antes: bajas | Antes: fugas | Después: bajas | Después: fugas |
|---|---|---|---|---|
| Cryomago · Guardián de la Ventisca | 304/102/226 | 0/296/119 | 271/97/191 | 66/301/189 |
| Envenenadora · Pestilencia | 303/118/223 | 2/264/126 | 277/98/180 | 51/303/211 |
| Catapulta · Trebuchet | 304/70/217 | 0/333/133 | 239/78/183 | 128/320/233 |
| Cañoneros · Artilleros | 297/69/220 | 7/330/130 | 193/62/178 | 181/344/214 |
| Enjambre de nanitos · Enjambre devorador | 294/90/212 | 20/312/147 | 257/71/157 | 94/332/260 |
| Augur Voltaico · Heraldo del Juicio | 291/108/219 | 21/282/126 | 225/86/111 | 119/317/328 |
| Salamandra · Corazón Volcánico | 280/75/209 | 48/327/154 | 252/63/171 | 109/340/238 |
| Envenenadora · Alquimista | 268/75/157 | 75/327/274 | 238/75/174 | 130/327/243 |
| Torre sónica · Torre sónica gigante | 258/75/156 | 92/312/259 | sin cambios | |
| Robots · Androides kamikaze | 255/68/78 | 86/343/370 | 274/68/80 | 55/342/367 |
| Catapulta · Ogros Lanzarrocas | 225/69/220 | 149/333/131 | sin cambios | |
| Augur Voltaico · Señor de la Tormenta | 234/57/153 | 150/350/283 | sin cambios | |

Ya ninguna limpia sola ni en el mapa más favorable. Pestilencia y Ventisca siguen siendo las más fuertes en oleadas; si en partida siguen pareciendo demasiado, son las siguientes a tocar. Los Androides kamikaze al máximo suben algo (por la subida de Robots): vigilar.

## Jefes: unidades que los retenían para siempre

Al subir a las Criaturas alienígenas, los **Depredadores al máximo mataban solos a La Forja y a ARGOS** (en unos 230 s). No era por su daño: tres unidades fuertes tenían al jefe parado todo el tiempo que hiciera falta. Antes de la subida iban por el mismo camino (lo dejaban al 26-29 % cuando se acababa el tiempo de la prueba).

Cambio: **un jefe retenido por unidades se enfurece**. Si lleva 8 s seguidos parado, pega a las unidades un 15 % más por cada segundo adicional; se le pasa en cuanto vuelve a andar. Resultado: Depredadores deja a La Forja y a ARGOS al 72-73 %, y ninguna torre mata sola a un jefe. La única prueba que sigue agotando el tiempo es Colmena contra ARGOS (lo deja al 46 %): vigilar.

De paso, las Criaturas alienígenas se quedan en 2,6 de daño (no 3).

Más cerca de matar a un jefe ella sola: Nido de francotirador contra La Forja (lo deja al 12 %). No lo he tocado, pero está en el límite.

## Solo élites y un objetivo duro (después de los cambios)

Contra 10 élites, vida quitada: Aliento de Forja al máximo 93 %, Nido de francotirador 92 %, Arco voltaico 86 %; sin habilidades, Forja 78 % y Nido 71 %. Las de área quedan entre el 5 % y el 30 %; Artilleros al máximo baja del 100 % al 43 %. Ballesteros y Electrocutor al máximo rondan el 42-44 % (les he subido el daño; siguen siendo los especialistas «de un objetivo» más flojos y son los primeros candidatos para una habilidad que escale con la vida del objetivo).

Contra un Señor de la guerra solo: lo matan Nido (en 9-14 s), Forja (38-42 s), Arco voltaico, Ballesteros y Raudos al máximo, Electrocutor al máximo, Mechas y Asesinos. La **Nube viajera no le hace nada (0 de daño)**, con y sin habilidades: la nube sale hacia los portales y un enemigo suelto casi nunca la cruza. Es la especialización más floja del juego ahora mismo y necesita un repaso de diseño, no solo de números.

## Torres de soldados y de control junto a una Catapulta

La torre a prueba junto a una Catapulta Nv 3, comparada con esa misma Catapulta sola en el mismo solar (107 bajas).

| Torre | Bajas con ella | Diferencia | Fugas |
|---|---|---|---|
| Guardián de la Ventisca (máx.) | 304 | +197 | 300 → 0 |
| Torre sónica gigante (máx.) | 304 | +197 | 300 → 0 |
| Rave de la Resistencia (máx.) | 286 | +179 | 300 → 36 |
| Androides kamikaze (máx.) | 280 | +173 | 300 → 48 |
| Mechas (máx.) | 210 | +103 | 300 → 163 |
| Hechicero Helado (máx.) | 181 | +74 | 300 → 209 |
| Torre sónica Nv 3 | 146 | +39 | |
| Maestros Ebrios (máx.) | 136 | +29 | |
| Paladines (máx.) | 128 | +21 | |
| Colmena (máx.) | 126 | +19 | |
| Cryomago Nv 3 | 123 | +16 | |
| Baluarte Nv 3 | 112 | +5 | |
| Depredadores (máx.) | 109 | +2 | |
| Asesinos (máx.) | 99 | −8 | |
| Monjes de Batalla (máx.) | 94 | −13 | |
| Criaturas alienígenas Nv 3 | 90 | −17 | |
| Robots Nv 3 | 88 | −19 | |
| Monasterio Nv 3 | 81 | −26 | |

Lecturas:
- **El control es lo que más multiplica**: Ventisca o Sónica gigante al máximo, junto a una simple Catapulta Nv 3, ya limpian la oleada. Es un combo de dos torres (no rompe la regla de «una sola»), pero es barato para lo que da: si se quiere bajar algo más, es por aquí.
- **Los soldados de Nv 3 no aportan nada en la ronda 20**, y a veces estorban: retienen a los enemigos fuera del centro de la explosión. Baluarte, Monasterio (las dos ramas), Asesinos y Depredadores apenas suman.
- Los que sí aportan son los que hacen daño en área o explotan (Kamikaze, Mechas).
- Conclusión: a los soldados no les falta daño base (la subida casi no se nota); **les falta escalar con la partida**. Propuesta para decidir: que la vida y el daño de las unidades suban un poco con la ronda (como los enemigos), o que sus habilidades de Nv 4 den control en área.

## Era 2: mucha más armadura que la era 1 (hallazgo, sin tocar)

Midiendo las oleadas enteras de cada era en el mismo laboratorio (Catapulta Nv 3 sola, física):

| Ronda | Era | Enemigos | Vida total | Armadura media | Velocidad media | Bajas de la Catapulta |
|---|---|---|---|---|---|---|
| 5 | Fantástica | 52 | 1 568 | 0,8 | 3,96 | 52 |
| 5 | Distópica | 54 | 1 542 | 2,8 | 2,99 | 18 |
| 10 | Fantástica | 337 | 17 335 | 0,5 | 3,92 | 271 |
| 10 | Distópica | 227 | 17 962 | 7,7 | 2,84 | 85 |
| 15 | Fantástica | 1 220 | 116 990 | 5,9 | 3,87 | 504 |
| 15 | Distópica | 715 | 121 697 | 21,0 | 2,67 | 29 |
| 20 | Fantástica | 1 226 | 192 496 | 6,0 | 3,86 | 352 |
| 20 | Distópica | 746 | 207 258 | 21,1 | 2,67 | 15 |

- La **vida total** de la oleada es casi la misma en las dos eras (un 4-8 % más en la Distópica), como estaba previsto.
- La **armadura media es de 3 a 15 veces mayor** en la Distópica. No es porque cada enemigo tenga mucha más (el Autómata tiene 10 y el Orco 5; el Titán 55 y el Ogro acorazado 40): es la **composición**. La Fantástica va llena de goblins sin armadura; la Distópica, de autómatas, centuriones y titanes.
- Consecuencia: las torres **físicas** se hunden en la era 2 (la misma Catapulta mata 271 en la ronda 10 de la era 1 y 85 en la de la era 2; 504 contra 29 en la ronda 15). Y el mazo inicial de la era 2 es casi todo físico: Búnker, Robots y Cañoneros.
- Con el mismo bot: gana 3-4 de 6 partidas en la era 1 y **pierde las 6 de la era 2, todas en la ronda 9-10, sin haber perdido vida antes**.
- Esto contradice el principio «la era nueva es algo más dura en vida, con la misma velocidad y armadura». Opciones para decidir: (a) bajar la armadura de los enemigos básicos de la era 2 (Autómata 10 → 5, como el Orco); (b) meter más enemigos sin armadura en sus escuadras; (c) dar penetración o daño mágico/elemental a alguna torre inicial de la era 2. He lanzado una prueba con la armadura de la era 2 a la mitad para ver si el bot pasa de la ronda 10 (resultado abajo, si llegó a tiempo).

Las torres de la era 2 no son más flojas que las de la era 1: contra la oleada 20 de la era 2, las mejores son Arco voltaico (98 bajas), Kamikaze (85) y Sónica gigante (80), por delante de las mejores de la era 1 en ese mismo escenario (Ogros 69, Heraldo 61, Alquimista 59).

### Prueba: armadura de la era 2 a la mitad (no aplicada)

Con todos los enemigos de la era 2 a la mitad de armadura, el bot **sigue perdiendo**: 4 partidas, caídas en las rondas 10, 10, 11 y 11 (antes 9-10). Mejora una ronda, no más. Así que la armadura no es toda la explicación.

Mirando qué se le escapa en esas rondas: sobre todo **Guerreros de colmena** y **Autómatas de asalto** (enemigos «medianos», con 5 veces la vida de un básico), más Pretorianos y Planeadores. En la ronda 10 la era 2 trae 227 enemigos contra 337 de la era 1 con la misma vida total: menos enemigos y más gordos, que las torres de área aprovechan peor y las de un objetivo de Nv 2-3 no llegan a matar. En la era 1, cuando el bot pierde en la ronda 10, lo que se escapa es una mezcla de pequeños (goblins, esbirros, demonios).

Conclusión prudente: **la era 2 es bastante más dura que la 1 entre las rondas 9 y 11**, por armadura y por enemigos medianos en cantidad. Hay que mirarlo con partidas reales antes de tocar números; el bot juega peor que una persona, pero la diferencia entre eras (3-4 de 6 contra 0 de 6) es demasiado grande para ser solo cosa suya.

## Partidas enteras con el bot (15 rondas)

El bot coloca piezas, construye pocas torres y las mejora (unas 8-10 al final). No juega como una persona, pero sirve para comparar. Seis mapas por era, antes y después de los cambios:

| Era | Antes | Después |
|---|---|---|
| Fantástica (Reinhart) | 3 de 6 ganadas | 4 de 6 ganadas |
| Distópica (Vega) | 0 de 6 (todas caen en la ronda 9-10) | 0 de 6 (igual; una llega a la 12) |

Los cambios de equilibrio no han hecho la era 1 más difícil para una partida normal: las bajadas tocan habilidades de Nv 4 al máximo, que en 15 rondas casi no se alcanzan.

## Pendiente / propuestas

1. **Era 2**: decidir cómo bajar la armadura efectiva de sus oleadas (ver arriba). Es lo más importante que ha salido.
2. **Soldados**: que escalen con la ronda o den control en área (ahora, a partir de la ronda 15-20, no aportan).
3. **Nube viajera**: repaso de diseño (no toca a enemigos sueltos).
4. **Habilidades que escalan con la vida del objetivo** para Ballesteros y Electrocutor (la función `toughK` ya existe; la usa Toxina letal).
5. **Combos de control + área** (Ventisca o Sónica gigante al máximo + una Catapulta Nv 3 limpian la oleada 20 en el mapa favorable): vigilar.
6. **Colmena contra ARGOS**: sigue reteniéndolo mucho tiempo.
7. **Estudio**: usar siempre varias semillas (el mapa 12345 es muy favorable) y añadir los escenarios nuevos al estudio del PC. Las herramientas están en `tools/lab/` del repositorio (`correr.js`, `tabla.js`, `lab2.js`, `bot4.js`).
8. Sin tocar en esta sesión: daño en área decreciente torre a torre, Detonador (no se pasa), señuelo kamikaze que arrastra hacia delante.

## Tope de bufadores y base de la era 2 (11-nov, mediodía)

**Bufadores.** Medido antes del cambio: las oleadas repiten unos pocos tipos de escuadra y, si uno lleva bufador, salía en muchas. Era 2 ronda 10: 11 de 34 escuadras con Tejedor; ronda 15: 17-20 de 85-100. Era 1 rondas 11-12: 18-20 de ~100 con Portador de sellos.
Cambio (`bufadores_tope.js`): como mucho 1 grupo con bufador por oleada hasta la ronda 10, 2 hasta la 15 y 3 después (uno más en la última ronda, para la escolta del jefe final). En las demás escuadras, el Tamborilero pasa a Orco, el Portador de sellos a Esbirro, el Tecnomante a Autómata y el Tejedor a Zángano. Medido después: 0-2 grupos bufados por oleada, 3 en la última.

**Base de la era 2.** Autómata 10 → 3 de armadura; Zángano 10 → 0 de resistencia mágica; Autómata de asalto 15 → 10 de armadura; Guerrero de colmena 15 → 10 de resistencia mágica. Los grandes, igual.

**Bot después de los dos cambios** (6 mapas por era):
- Era 2: sigue perdiendo las 6, cinco en la ronda 10 y una en la 11. Pierde menos vida antes (en la ronda 9 ya casi no se le escapa nada), pero la ronda 10 le sigue pudiendo.
- Era 1: 3 de 6 ganadas (como antes). Dos de las derrotas también son de golpe en la ronda 10 (20 vidas en una ronda).

**Lo que se ve ahora:** el problema es **el salto de la ronda 10 en las dos eras**. Las oleadas pasan de ~110 enemigos (ronda 8) a 230-350 (ronda 10), y además muchos básicos ascienden a su versión mediana (Autómata de asalto, Guerrero de colmena, Demonio), con 4-5 veces la vida. En la era 2 lo que se escapa en la ronda 10 es casi todo **Autómata de asalto** (hasta 17 en una partida) y **Guerrero de colmena**. Propuestas, para decidir: suavizar el número de enemigos entre las rondas 8 y 11, o retrasar/bajar el porcentaje de ascensos a la versión mediana en la ronda 10.
