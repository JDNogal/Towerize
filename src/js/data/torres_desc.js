// v334 · Descripción y frase de ambiente de cada torre normal (solo en el compendio)
const TWDESC={
 arrow:['Disparan flechas rápidas a un solo enemigo. Baratos y fiables.','Si se mueve, tiene una flecha esperándole.'],
 cata:['Lanza rocas que estallan al caer y dañan a todo el grupo. No alcanza a los voladores.','Puntería, poca. Entusiasmo, mucho.'],
 frost:['Su hielo daña y ralentiza a los enemigos.','Nunca ha tenido prisa. Y no piensa dejar que nadie la tenga.'],
 orb:['Lanza un orbe mágico lento y muy potente que atraviesa la armadura.','Nadie sabe quién lo encendió. Nadie se atreve a apagarlo.'],
 poison:['Su veneno se acumula: cuanto más tiempo sigue el enemigo a tiro, más daño le hace.','Una gota no mata a nadie. Diez, ya veremos.'],
 sala:['Escupe fuego en cono y deja quemaduras en todo lo que toca.','Duerme sobre brasas y desayuna carbón.'],
 augur:['Llama a un rayo del cielo que cae sobre el objetivo y alcanza a los de alrededor.','Ve la tormenta antes de que llegue. Y a veces la trae él.'],
 bastion:['Saca soldados al camino que bloquean y pelean cuerpo a cuerpo.','Por aquí no pasa nadie. Ese es todo el plan.'],
 monk:['Sus monjes luchan en el camino y se curan entre ellos.','Meditan por la mañana. Reparten por la tarde.'],
 altar:['No ataca: da mejoras temporales a las torres de alrededor.','Las piedras antiguas todavía recuerdan cómo ayudar.'],
 cannon:['Disparan proyectiles pesados que estallan y dañan en área.','El silencio después del disparo es lo que más asusta.'],
 laser:['Un arco eléctrico continuo que no deja de quemar mientras el enemigo esté a tiro.','Zumba. Siempre zumba.'],
 bunker:['Cuanto más rato dispara sin parar, más rápido lo hace, hasta que recarga.','Nadie sabe cuántos hay dentro. Ellos tampoco.'],
 robots:['Unidades de metal que bloquean el camino y aguantan golpes.','No sienten miedo. Ni dolor. Ni muchas cosas, la verdad.'],
 nano:['Un enjambre que persigue a los enemigos y los muerde poco a poco.','Pequeños. Muchos. Hambrientos.'],
 dron:['No ataca: afina la puntería de las torres cercanas.','Aprieta un tornillo aquí, ajusta una mira allá.'],
 flame:['Rocía fuego en cono y deja quemaduras.','Ilumina la noche. Y todo lo demás.'],
 acid:['Envenena y rompe la armadura de los enemigos.','El metal también se derrite, solo hay que tener paciencia.'],
 sonic:['Lanza ondas que dañan y empujan a los enemigos hacia atrás.','Subid el volumen.'],
 alien:['Criaturas que salen a pelear al camino y se hacen más fuertes juntas.','No son de aquí. Pero luchan por ti.']};
// frase de ambiente de cada especialización (la descripción ya la tienen en SPECS[k][s].d)
const SPDESC={
 arrow:{rapid:'Más flechas que segundos tiene el día.',xbow:'Una sola flecha. Bien puesta.'},
 cata:{treb:'Si no cabe en la catapulta, cabe en el trebuchet.',ogre:'¿Para qué cargar la roca si se puede lanzar a mano?'},
 frost:{hel:'Donde mira, cae escarcha.',vent:'El invierno no dispara: llega.'},
 augur:{lord:'Donde planta su bandera, nunca deja de llover.',herald:'Espera. Cuenta. Y entonces, juicio.'},
 orb:{foco:'Un buen hechizo, bien concentrado, convierte a cualquiera en rana.',reap:'Ningún enemigo se va del todo.'},
 laser:{red:'Juntas zumban más fuerte.',volt:'Carga, carga, carga… ¡zas!'},
 bunker:{sup:'Si no los ves, dispara igual.',nido:'Un disparo. Una baja. Y a recargar.'},
 robots:{mecha:'Tres robots entraron en el taller. Salió uno muy grande.',kami:'Su último gesto siempre es explosivo.'},
 nano:{hack:'Un mordisco y ya no eres el mismo.',devour:'Cuanto más come, más hambre tiene.'},
 altar:{altar:'Las runas viejas brillan más lejos.',senda:'Mira dónde pisas.'},
 dron:{dron:'Un dron no da abasto. Dos, tampoco, pero lo intentan.',petro:'Pringoso, apestoso e inflamable.'},
 poison:{alch:'Un poco de esto, un poco de aquello… y a ver qué pasa.',pest:'Poco veneno, pero del bueno.'},
 monk:{fist:'La paz interior también se entrena a puñetazos.',drunk:'Nadie sabe qué llevan en la calabaza. Mejor así.'},
 bastion:{pal:'Su fe es su armadura. Y su armadura, también.',ass:'No los verás venir. Los verás irse.'},
 sala:{volc:'Cuanto más dispara, más se calienta. Y no le importa.',forge:'Funde el acero como si fuera mantequilla.'},
 flame:{detn:'Primero arde. Luego, ¡bum!',muro:'Una raya en el suelo. No la cruces.'},
 acid:{corr:'Lo que toca, se deshace.',cloud:'Una nube verde que camina sola. Nada bueno puede salir de ahí.'},
 sonic:{spk:'La música amansa a las fieras. Esta, no.',giant:'Tan alto que tiembla el suelo.'},
 alien:{hive:'Una se convierte en dos. Dos, en muchas.',pred:'Solo sobreviven las más fuertes.'}};
// con una especialización elegida en el compendio sale la suya; si no, la de la torre
const twDescHtml=k=>{let st=null;try{st=cpState(k);}catch(e){}const sp=st&&st.spec,X=sp&&SPECS[k]&&SPECS[k][sp];
 if(X){const fl=SPDESC[k]&&SPDESC[k][sp];return `<div class="twdesc">${X.d||''}${fl?`<i>«${fl}»</i>`:''}</div>`;}
 const d=TWDESC[k];return d?`<div class="twdesc">${d[0]}<i>«${d[1]}»</i></div>`:'';};
const UNDESC={faro:'Hasta en ruinas, sigue guiando a quien se acerca.',dragon:'Todo gran dragón empezó siendo un huevo con mucha paciencia.',guild:'Se cobra por adelantado. Los héroes no son baratos.',
 straw:'Soplaron y soplaron… y esta vez no se cayó.',wood:'Más sólida que la de paja. Más rodante, también.',brick:'El lobo nunca pudo con ella. Tus enemigos, tampoco.',glut:'No era un cofre. Nunca lo fue.'};
