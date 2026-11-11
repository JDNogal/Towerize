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
