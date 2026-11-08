// ---- paneles de información ----
const R=(c,a,b)=>`<div class="row ${c}"><span>${a}</span><span>${b}</span></div>`;
const kw=(id,l,src,c)=>`<span class="kw${c?' '+c:''}" data-kw="${id}" data-src="${src||''}">${l}</span>`;
const kst=(id,l,src)=>kw(id,l,src,'st');
const objIc=(gOnly,src)=>kw('tgnd','🥾',src,'st')+(gOnly?'':' '+kw('tair','🪽',src,'st'));
const objRow=(gOnly,src)=>R('cg',kst('tgts','Objetivos',src),objIc(gOnly,src));

const dpsOf=(s,T)=>T.dot?s.dmg*POISD:T.burn?BURND*s.dmg*s.rate*(1-BURNK/2)/BURNK:T.unit?s.dmg*s.rate*T.unit.n*(1+(T.mhit||0)):s.dmg*s.rate;
const cas=n=>f(n)+(n===1?' casilla':' casillas');
function kctx(src){
 if(src&&src.startsWith('tw:')){const t=S.list.find(o=>o.id===+src.slice(3));if(t)return{T:twm(t.type,t.spec),s:stats(t)};}
 if(src&&src.startsWith('shop:')){const T=twm(src.slice(5),CP.open?cpState(src.slice(5)).spec:null);return{T,s:{dmg:T.dmg,rate:T.rate,range:T.range,crit:CRIT,critm:2,area:T.splash||T.pr||0}};}
 if(src&&src.startsWith('en:'))return{E:ET[src.slice(3)]};
 return null;
}
// estados: ¿se acumulan (stacks) o vale el más fuerte?
const STACKS={burn:1,poison:1,bleed:1,chill:1,ez:1,brk:1,slow:0,freeze:0,stun:0,root:0,sticky:0,cursed:0,poly:0,fear:0,wet:0};
function kwHtml(id,src){const h=kwHtml0(id,src);if(h&&id in STACKS){const i=h.indexOf('</b>');if(i>=0){const j=h.indexOf('<small>');const row=R('',kst('stk','Acumulable',''),STACKS[id]?'Sí':'No');return j>=0?h.slice(0,j)+row+h.slice(j):h+row;}}return h;}
function kwHtml0(id,src){
 if(id.startsWith('bf_')&&BF[id.slice(3)])return buffInfo(id.slice(3));
 // conceptos básicos del juego (los usa el tutorial) y fichas por nombre: torre, enemigo, héroe
 const GK={g_solar:['Solar','Las casillas de piedra de cada pieza. Solo puedes construir torres en los solares.'],
  g_core:['Núcleo','Lo que defiendes. Cada enemigo que llega a él te quita vida; si la vida llega a 0, pierdes.'],
  g_piece:['Pieza','Un trozo de camino de '+P+'×'+P+' casillas. Cada ronda eliges una y la colocas en un extremo libre del camino para alargarlo; puedes girarla antes.'],
  g_portal:['Portal','Por donde salen los enemigos: se abre en cada extremo libre del camino. Pasa el ratón por encima para ver qué viene.'],
  g_tile:['Casilla especial','Una casilla de color sobre un solar. La torre que construyas encima gana su bonus (más rango, más daño…). Cuestan oro al colocar la pieza.'],
  g_hab:['Habilidad del héroe','Cada héroe tiene una habilidad que se usa durante la oleada con su botón (o su tecla). Después tarda un rato en recargarse.']};
 if(GK[id])return '<b>'+GK[id][0]+'</b><small>'+GK[id][1]+'</small>';
 if(id.startsWith('tw_')&&TW[id.slice(3)])return shopInfo(id.slice(3),1);
 if(id.startsWith('en_')&&ET[id.slice(3)])return enemyInfo(id.slice(3));
 if(id.startsWith('hr_')&&HEROES[id.slice(3)])return heroInfo(id.slice(3),2);
 const c=kctx(src);
 if(c&&c.E){const E=c.E;
  if(id==='ehp')return '<b>Vida</b><small>Daño que aguanta el enemigo antes de morir. Es siempre la misma: los enemigos no se hacen más fuertes con las rondas, pero aparecen versiones más duras de cada familia (solo en partidas de más de 15 rondas crece un poco a partir de la ronda 16). El daño que recibe se reduce antes por su armadura o su resistencia mágica, según el tipo de daño; el elemental no lo reduce nada.</small>';
  if(id==='espd')return `<b>Velocidad</b><small>Casillas que avanza por segundo por el camino. Como referencia, un Guerrero avanza 1. Las ralentizaciones la reducen mientras duran.</small>`;
  if(id==='edmg')return `<b>Daño al núcleo</b><small>Vida que pierdes cada vez que uno de estos enemigos llega al núcleo. Los jefes te quitan toda la vida: si un jefe llega al núcleo, pierdes la expedición.</small>`;
  if(id==='egold')return `<b>Oro por baja</b><small>Oro que ganas al derrotarlo en las primeras rondas. Como las oleadas traen cada vez más enemigos, en rondas altas cada baja da algo menos, para que el oro de cada ronda no se dispare. Las casillas de Codicia y algunas reliquias suman un porcentaje de este oro.</small>`;
 }
 {const aE=c&&c.E,av=k=>aE?R('',aE.n,armTxt(aE[k]||0)):'';
  const tbl=R('','10 de armadura','−17% de daño')+R('','25 de armadura','−33% de daño')+R('','50 de armadura','−50% de daño');
  if(id.startsWith('ab_')){const D=AB[id.slice(3)];return '<b>'+D.n+'</b>'+D.ranks.map((r,i)=>'<small><b>Rango '+(i+1)+' · <span class="gd">'+r.c+' 🪙</span></b><br>'+D.txt(r)+'</small>').join('');}
  if(id.startsWith('rl_')&&RELIC[id.slice(3)])return relicInfo(id.slice(3),CP.open);
  if(id==='hrez')return '<b>Reaparición</b>'+R('cr','Tiempo',HREZ+' s')+'<small>Tiempo que tarda un héroe caído en volver a aparecer en el núcleo, el mismo para todos los héroes. Después camina hasta la posición en la que lo habías colocado. Al terminar la ronda se restaura por completo.</small>';
  if(id==='hrel')return '<b>Reliquia inicial</b><small>Todos los héroes van acompañados de una reliquia inicial única, que recibes al elegirlos y que no se puede obtener por ningún otro medio. Como el resto de reliquias, tiene un pasivo y un activo; pasa el ratón por su nombre para verlos.</small>';
  if(id==='hlv')return '<b>Nivel de héroe</b>'+R('chp','Vida por nivel','+12%')+R('cd','Daño por nivel','+10%')+(HEROES[(src||'').slice(5)]?R('cph','Armadura por nivel','+'+f(HEROES[src.slice(5)].apLv)):'')+'<small>Los héroes ganan experiencia con cada enemigo que cae (más si lo rematan ellos) y suben hasta el Nv '+HLMAX+'. Cada nivel mejora sus estadísticas. La experiencia necesaria sube un 25% por nivel.</small>';
  if(id==='hxp')return '<b>Experiencia</b><small>Cada enemigo vale una cantidad fija de experiencia (la puedes ver en su ficha del compendio). Si lo remata tu héroe, la recibe entera y le llega volando en una bolita dorada. Si lo remata una torre, deja en el suelo una bolita con el 40% (como mínimo 1): tu héroe la recoge al pasar a 2 casillas o menos, y las que queden se le suman al acabar la oleada.</small>'+'<div style="margin-top:6px"><b>Experiencia por nivel</b></div>'+[2,3,4,5,6,7,8,9,10].map(l=>R('','Nv '+l,xpNeed(l))).join('');
  if(id==='exv')return '<b>Experiencia</b><small>La experiencia que da este enemigo a tu héroe si lo remata él. Si lo remata una torre, deja en el suelo una bolita con el 40% (como mínimo 1) que el héroe recoge al acercarse.</small>';
  if(id==='hhp')return '<b>Vida</b><small>Daño que aguanta el héroe antes de caer. Se regenera poco a poco fuera de combate y se restaura al terminar la ronda. Cada nivel la aumenta un 12%.</small>';
  if(id==='hdmg')return '<b>Daño</b><small>Lo que hace cada golpe o disparo del héroe. Su tipo (físico o mágico) se indica en su ficha. Cada nivel lo aumenta un 10%. Los críticos lo multiplican.</small>';
  if(id==='hcd')return '<b>Enfriamiento</b><small>Tiempo que espera el héroe entre un golpe o disparo y el siguiente.</small>';
  if(id==='hrng')return '<b>Rango</b><small>Distancia máxima a la que dispara. Elige siempre al enemigo más cercano dentro de ese alcance.</small>';
  if(id==='hmel')return '<b>Daño en melee</b><small>Cuando un enemigo alcanza a un héroe a distancia, este lo bloquea y le pega cuerpo a cuerpo, pero su daño baja a la mitad. Conviene recolocarlo hacia atrás.</small>';
  if(id==='harea')return '<b>Área</b><small>Cada orbe de Radagast hace el '+Math.round(SPLASH*100)+'% de su daño a los demás enemigos dentro de este radio alrededor del impacto.</small>';
  if(id==='hblk')return '<b>Corpulencia</b><small>Capacidad de bloqueo. Una unidad con corpulencia 2 puede detener ella sola a un enemigo que necesita 2 unidades, o a <b>dos enemigos</b> que necesitan 1 a la vez. Ataca a uno cada vez, pero todos los que bloquea le golpean. Los héroes cuerpo a cuerpo tienen 2; los que atacan a distancia, 1.</small>';
  if(id==='mark')return '<b>Marcado</b>'+R('','Duración','4 s')+'<small>Un enemigo marcado por la Marca de cazador de los Ballesteros recibe críticos con más probabilidad de todas tus torres y unidades. Se ve con el icono 🎯 sobre el enemigo.</small>';
  if(id==='umr')return '<b class="cmg">Resistencia mágica</b><small>Reduce el daño mágico que recibe una unidad aliada (soldado o héroe): resistencia ÷ (resistencia + '+ARM_K+'). De momento ningún enemigo hace daño mágico a tus unidades.</small>';
  if(id==='chill')return `<b>Hipotermia</b> · daño elemental`+R('cd','Daño de cada stack',CHILLD+' por segundo si está parado')+R('','Duración de cada stack',CHILLT+' s')+'<small>Lo contrario del sangrado: cada stack hace daño elemental según lo frenado que esté el enemigo. <b>Parado</b> (congelado, aturdido, enredado o bloqueado por una unidad): daño completo. <b>Ralentizado</b>: la parte proporcional (con un 50% de ralentización, la mitad). Moviéndose a velocidad normal: nada. Los stacks se acumulan y caducan por separado.</small>';
  if(id==='bleed')return `<b>Sangrado</b> · daño elemental`+R('cd','Daño de cada stack',BLEEDD+' por casilla recorrida')+R('','Duración de cada stack',BLEEDT+' s')+'<small>Cada stack hace daño elemental (ignora la armadura) por cada casilla que recorre el enemigo. Si está quieto, bloqueado o congelado, no sufre nada. Los stacks se acumulan y caducan por separado.</small>';
  if(id==='call')return '<b>Vástagos</b><small>Cada vez que el Coloso pierde un 25% de su vida, un trozo de él se desprende y se convierte en 2 Mini-élites. Solo aparece en la ronda 30 si eliges 30 rondas.</small>';
  if(id==='howl')return '<b>Aullido</b><small>Cuando el Lobo gris baja de la mitad de su vida, aúlla: los Lobatos a 3 casillas o menos corren un 20% más rápido durante 3 s. Solo una vez.</small>';
  if(id==='blow')return '<b>Soplido</b><small>Cada 5 s, El Lobo sopla: derriba las barricadas y muros a 2 casillas o menos y aparta a los soldados que le bloquean.</small>';
  if(id==='dur')return '<b>Duración</b><small>Cuánto dura lo que deja en el campo esta torre o habilidad: un charco, un muro, un tronco rodando… Cómo funciona cada estado se explica en el tooltip de su palabra clave.</small>';
  if(id==='push')return '<b>Empuje</b><small>Distancia que el golpe hace retroceder al enemigo por el camino. Los jefes retroceden la mitad.</small>';
  if(id==='bwall')return '<b>Muro</b><small>Un muro que corta el camino de lado a lado, como una barricada: detiene a los enemigos que llegan a él mientras dura. Para a todos, incluidos los que esquivan a tus unidades.</small>';
  if(id==='logk')return '<b>Tronco rodante</b><small>El tronco cae en el camino delante del enemigo más avanzado y rueda hacia atrás, hacia los portales, siguiendo las curvas. Ocupa todo el ancho del camino: golpea una vez a cada enemigo con el que se cruza y lo empuja.</small>';
  if(id==='root')return '<b>Enredo</b><small>El enemigo enredado no puede moverse, pero sigue atacando a las unidades que tenga al alcance. Los jefes solo quedan enredados los 2 primeros segundos de la hiedra.</small>';
  if(id==='prey')return '<b>Presa</b><small>Un enemigo marcado como presa recibe un <span class="cd">15% más de daño</span> de todas las fuentes durante 4 s.</small>';
  if(id==='mheal')return '<b>Curación</b><small>Cada 4 s, cada monje cura un 10% de su vida máxima a la unidad aliada más herida a 2 casillas o menos: otros monjes, soldados de cualquier torre o tu héroe.</small>';
  if(id==='mhit')return '<b>Golpe espiritual</b><small>Cada golpe de un monje añade una parte de su daño como <span class="cmg">daño mágico</span> (20% de base). Así hace daño aunque el enemigo tenga mucha armadura.</small>';
  if(id==='drunk')return '<b>Embriaguez</b><small>Un monje ebrio se tambalea (🍶 sobre su cabeza). Los Maestros Ebrios beben de su calabaza para curarse, y estar ebrio activa habilidades como Tambaleo. Dura 5 s.</small>';
  if(id==='vch')return '<b>Vale de mejora</b><small>Se guarda hasta que decidas usarlo. Púlsalo y elige una torre: sube un nivel gratis. Algunos vales tienen condiciones, como funcionar solo con torres de un nivel concreto. Nunca suben a Nv 4.</small>';
  if(id==='pierce')return '<b>Perforante</b><small>Sus ataques ignoran la mitad de la armadura de tus unidades.</small>';
  if(id==='dodge')return '<b>Escurridizo</b><small>Esquiva a tus unidades: los soldados y el héroe no pueden bloquearlo ni atacarlo. Sí lo detienen las barricadas y los muros.</small>';
  if(id==='steal')return '<b>Saqueo</b><small>Si llega al núcleo, además de quitarte vida te roba 10 de oro.</small>';
  if(id==='curse')return '<b>Maldición</b><small>Cada 8 s maldice a la torre más cercana (4 casillas o menos): durante 5 s tiene <span class="cr">+25% de enfriamiento</span>. Las torres de evento no se ven afectadas.</small>';
  if(id==='eheal')return '<b>Curación tribal</b><small>Cada 6 s cura un 10% de su vida máxima a los enemigos a 2,5 casillas o menos. No cura a otros sanadores ni a sí mismo, y un enemigo no puede recibir más de una curación cada 6 s.</small>';
  if(id==='eorg')return '<b>Origen</b><small><b class="cg">Normales:</b> salen en las oleadas de los portales. <b class="cg">De evento:</b> solo aparecen por opciones de eventos.</small>';
  if(id==='breath')return '<b>Aliento de fuego</b><small>Cada 6 s, la Mamá dragona escupe fuego y hace 15 de daño a tus unidades (soldados y héroe) a 1,5 casillas o menos.</small>';
  if(id==='evn')return '<b>Enemigo de evento</b><small>Solo aparece en un evento concreto, no en las oleadas normales.</small>';
  if(id==='rcd')return '<b>Enfriamiento de reliquia</b><small>Rondas que pierdes el pasivo de la reliquia al usar su activo (incluida la ronda en la que lo usas).</small>';
  if(id==='eeff')return '<b>Efectos</b><small>Rasgos especiales de este enemigo además de sus estadísticas. Pasa el ratón por cada uno para ver qué hace.</small>';
  if(id==='bres')return `<b>Resistencia a control</b>`+R('','Efectos de control','−50%')+'<small>Los jefes reducen un 50% la fuerza o la duración de cualquier efecto de control: la ralentización hace la mitad de efecto, y las congelaciones y los empujones duran o llegan la mitad.</small>';
  if(id==='penp')return '<b>Penetración</b><small>Armadura plana que ignoran los golpes de esta torre. Si el enemigo tiene menos armadura que la penetración, su armadura efectiva queda negativa y recibe más daño, hasta un máximo del doble (armadura efectiva mínima de −'+MAXPEN+'). No afecta al daño elemental.</small>';
  if(id==='tlv')return '<b>Nivel de torre</b><small>Nivel de mejora con el que se muestran las torres del compendio. Los niveles 2 y 3 mejoran estadísticas; el Nv 4 es una especialización (A y B son las dos opciones de cada torre) con habilidades propias.</small>';
  if(id==='dtype'){const s=src||'';return `<b>Tipo de daño</b>`+(s.startsWith('en:')?'<small>Tipo de daño de los golpes de este enemigo a tus unidades. La armadura de tus unidades reduce el físico, su resistencia mágica reduce el mágico y el elemental no lo reduce nada.</small>':'<small>Tipo de daño que hace '+(s.startsWith('hero:')?'este héroe':'esta torre')+': físico, mágico o elemental. La armadura del enemigo reduce el físico, su resistencia mágica reduce el mágico y el elemental no lo reduce nada.</small>');}
  if(id==='usol')return '<b>Soldados</b><small>Unidades aliadas de la torre. Se colocan en la bandera, bloquean a los enemigos que llegan hasta ellos y los combaten cuerpo a cuerpo. Cada soldado bloquea a un enemigo; los más duros necesitan varios soldados para ser detenidos. Si uno cae, reaparece en la torre y camina hasta la bandera; no se detiene por el camino, pero puede recibir daño.</small>';
  if(id==='uhp')return '<b>Vida del soldado</b><small>Daño que aguanta cada soldado antes de caer. Se regenera poco a poco fuera de combate y se restaura al terminar la ronda.</small>';
  if(id==='urez')return '<b>Reaparición</b><small>Tiempo que tarda un soldado caído en volver a la torre antes de caminar hacia la bandera.</small>';
  if(id==='eud')return '<b>Daño a unidades</b><small>Daño de cada golpe de este enemigo a una unidad aliada, como los soldados del Baluarte. La armadura de la unidad lo reduce.</small>';
  if(id==='eac')return '<b>Enfriamiento</b><small>Tiempo que espera este enemigo entre un golpe y el siguiente contra una unidad aliada.</small>';
  if(id==='erg')return '<b>Rango</b><small><b class="cg">Melee:</b> pelea con la unidad que lo bloquea. <b class="cg">A distancia:</b> se detiene en cuanto una unidad entra en su alcance y la ataca desde lejos, sin acercarse más.</small>';
  if(id==='eblk')return '<b>Corpulencia</b><small>Cuántas unidades tienen que estar combatiéndolo a la vez para detenerlo. Con menos, sigue avanzando mientras lo golpean, aunque cada punto de corpulencia de las unidades que le pegan lo frena un 25%. Algunas unidades tienen corpulencia 2: detienen solas a un enemigo así, o a dos enemigos de corpulencia 1 a la vez.</small>';
  if(id==='tphys')return `<b class="cph">Daño físico</b>`+R('','Lo reduce','Armadura')+'<small>Daño de golpes y explosiones. Cada unidad lo reduce según su armadura.</small>';
  if(id==='tmagic')return `<b class="cmg">Daño mágico</b>`+R('','Lo reduce','Resistencia mágica')+'<small>Daño de origen arcano. Cada unidad lo reduce según su resistencia mágica.</small>';
  if(id==='telem')return `<b class="cel">Daño elemental</b>`+R('','Lo reduce','Nada')+'<small>Ignora por completo la armadura y la mágica.</small>';
  if(id==='aphys')return `<b class="cph">Armadura</b>`+tbl+'<small>Reduce el daño físico recibido: armadura ÷ (armadura + '+ARM_K+'). Los bonus de armadura son planos y suman antes de aplicar la fórmula, por eso nunca llegan a anular el daño.</small>';
  if(id==='amagic')return `<b class="cmg">Resistencia mágica</b>`+tbl+'<small>Reduce el daño mágico recibido: armadura ÷ (armadura + '+ARM_K+'). Funciona igual que la armadura.</small>';
  if(id==='aura')return `<b>Aura</b>`+'<small>Los enemigos dentro del radio, incluido el que la emite, reciben su bufo mientras sigan dentro y se dibujan con un contorno gris. Si varias auras dan el mismo bufo, no se suman: vale el mayor. Haz clic en un enemigo con aura para ver su radio.</small>';}
 if(c&&c.T){const T=c.T,s=c.s;
  if(id==='dmg')return `<b>Daño</b>`+`<small>${T.dot?'Esta torre no hace daño directo: lanza charcos que aplican stacks de veneno. Su daño por segundo estimado se muestra en DPS.':T.unit?'Lo que hace cada golpe de un soldado. Un crítico lo multiplica y las casillas especiales de la torre lo modifican.':'Lo que hace cada disparo al impactar. Un crítico lo multiplica y las casillas especiales de la torre lo modifican.'}</small>`;
  if(id==='pstk')return '<b>Acumulación</b><small>Cada cuánto tiempo el charco añade un stack de veneno a todos los enemigos que están dentro.</small>';
 if(id==='cool')return `<b>Enfriamiento</b>`+`<small>${T.unit?'Tiempo que espera cada soldado entre un golpe y el siguiente: cuanto menor, más rápido pelea.':'Tiempo que espera la torre entre un disparo y el siguiente: cuanto menor, más rápido ataca.'}${T.beam?' Las torres de rayo continuo aplican su daño en cada una de esas pulsaciones por segundo.':T.puddle?' Aquí es el tiempo entre un charco y el siguiente.':''}</small>`;
  if(id==='rng')return `<b>Rango</b>`+(T.unit?'<small>Distancia máxima, medida desde la torre, a la que puedes colocar su bandera. Los soldados solo combaten en la bandera. Es el círculo azul que se ve al señalarla.</small>':'<small>Distancia máxima a la que ataca, medida desde el centro de su casilla; es el círculo azul que se ve al señalarla. Solo ataca a enemigos dentro de él y elige según su Objetivo.</small>');
  if(id==='dmg'&&T.burn)return `<b>Daño</b><small>Esta torre no hace daño directo: su daño viene de la ${kw('burn','quemadura','')} que aplica. Su daño por segundo estimado se muestra en DPS.</small>`;
  if(id==='burnt')return `<b>Quemadura por tick</b><small>Stacks de ${kw('burn','quemadura','')} que aplica en cada tick a los enemigos golpeados. Un crítico multiplica los stacks de ese tick.</small>`;
  if(id==='dps'&&T.burn)return `<b>DPS</b>`+(OPT.dpsx?`<div style="margin:6px 0"><span class="cf">Cálculo:</span> <span class="cbu">${f(s.dmg)}</span> stacks/tick × <span class="cr">${f(s.rate)}</span> ticks/s = <b>${f(s.dmg*s.rate)}</b> stacks/s. Con una pérdida del ${Math.round(BURNK*100)}% por segundo se estabilizan en ≈<b>${f(s.dmg*s.rate*(1-BURNK/2)/BURNK)}</b> stacks × <span class="cd">${BURND}</span> de daño por segundo = <span class="cd">${f(dpsOf(s,T))}</span></div>`:'')+`<small>Daño por segundo en régimen estable sobre cada enemigo golpeado, una vez que los stacks se acumulan (unos 3 s). Con varios enemigos en el cono, cada uno lo recibe.</small>`;
  if(id==='dps')return `<b>DPS</b>`+(OPT.dpsx?`<div style="margin:6px 0"><span class="cf">Cálculo:</span> `+(T.unit?`${T.unit.n} soldados × <span class="cd">${f(s.dmg)}</span> de daño × <span class="cr">${f(s.rate)}</span> golpes/s = <span class="cd">${f(dpsOf(s,T))}</span>`:T.dot?`<span class="cpo">${f(s.dmg)}</span> stacks/s × ${f(POISD)} s de duración = <b>${f(s.dmg*POISD)}</b> stacks a la vez × 1 de daño por segundo = <span class="cd">${f(dpsOf(s,T))}</span>`:`<span class="cd">${f(s.dmg)}</span> de daño × <span class="cr">${f(s.rate)}</span> disparos/s = <span class="cd">${f(dpsOf(s,T))}</span>`)+'</div>':'')+`<small>${T.unit?'Daño teórico por segundo de todos los soldados juntos mientras combaten: daño por golpe × golpes por segundo × número de soldados.':T.dot?`Daño por segundo en régimen estable sobre cada enemigo dentro del charco: stacks por segundo × ${f(POISD)} s de duración de cada stack.`:'Daño teórico por segundo: daño por disparo × disparos por segundo. No cuenta críticos ni el daño en área.'}</small>`;
  if(id==='eff')return '<b>Efectos</b><small>Lo que aplica la torre además del daño, como ralentizar o envenenar. Pasa el ratón por cada efecto para ver sus detalles.</small>';
  if(id==='upc')return '<b>Mejora</b><small>Oro que cuesta subir la torre hasta este nivel desde el anterior (el Nv 2 cuesta el 150% de su coste base, el Nv 3 el 210% y el Nv 4 el 300%).</small>';
  if(id==='cost')return `<b>Coste</b>`+'<small>Oro que cuesta construirla. Al venderla recuperas la mitad.</small>';
  if(id==='lvl')return '<b>Nivel</b><small>Todas las torres empiezan en Nv 1 y pueden mejorarse pagando oro. Los niveles 2 y 3 mejoran sus estadísticas (daño, enfriamiento, rango, área y vida de los soldados, según la torre). El Nv 4 es una especialización que se elige entre dos y permite comprar habilidades. Al venderla recuperas la mitad de todo el oro invertido.</small>';
  if(id==='tgt'){const t=src.startsWith('tw:')?S.list.find(o=>o.id===+src.slice(3)):null,cur=t?t.mode:(S.dtg[Object.keys(TW).find(k=>TW[k]===T)]||'core');
   return `<b>Objetivo</b>`+Object.keys(TGT).map(k=>`<div><span style="color:var(--fg)">${TGT[k].n}:</span> ${TGT[k].d}</div>`).join('')+'<small>Se aplica solo entre los enemigos dentro del rango. En un empate decide el más cercano al núcleo.'+(T&&T.beam?' Las torres de rayo continuo mantienen su objetivo hasta que muere o sale del rango.':'')+'</small>';}
 }
 if(id==='poison'){const ok=c&&c.T.puddle,T=ok?c.T:TW.poison,s=ok?c.s:{dmg:T.dmg,area:T.pr};
  return `<b>Veneno</b> · daño con el tiempo`+R('cd','Daño de cada stack','1 por segundo')+R('','Duración de cada stack',f(POISD)+' s')+
   `<small>Cada segundo, los enemigos dentro del charco reciben stacks de veneno. Los stacks se acumulan (también entre torres y reliquias): cada uno hace 1 de daño por segundo durante ${f(POISD)} s. El crítico se calcula al lanzar el charco y multiplica los stacks que aplica.</small>`;}
 if(id==='freeze')return `<b>Congelar</b>`+R('','Duración base',f(FRZT)+' s')+R('','Inmunidad al descongelarse',f(FRZCD)+' s')+'<small>Un enemigo congelado no se mueve. Mientras está congelado, y durante la inmunidad posterior, no se puede volver a congelar. Algunos efectos congelan más tiempo que la duración base. Los jefes sufren la mitad (resistencia de jefe).</small>';
 if(id==='slow'){const m=TW.frost.slow,cs=kctx(src),cT=cs&&cs.T&&cs.T.slow?cs.T:null;
  return `<b>Ralentización</b>`+R('cr','Duración',f(cT?(cT.slowt||SLOWT):SLOWT)+' s')+'<small>Reduce la velocidad del enemigo mientras dura. Cada impacto refresca la duración y no se acumula con otras ralentizaciones: vale la más fuerte. Los jefes sufren la mitad de efecto.</small>';}
 if(id==='area'){const ok=c&&c.T.shape,T=ok?c.T:TW.cannon,a=ok?c.s.area:T.splash;
  return `<b>Área</b> · ${T.shape.toLowerCase()}`+`<small>${T.areaTxt}</small>`;}
 if(id==='aoedmg'){const ok=c&&c.T.splash,T=ok?c.T:TW.cannon,d=ok?c.s.dmg:T.dmg;
  return `<b>Daño AdE</b> · daño en área de efecto`+R('','Porcentaje del daño',Math.round(SPLASH*100)+'%')+'<small>El objetivo recibe el daño completo. Los demás enemigos dentro del radio reciben este porcentaje.</small>';}
 if(id==='crit'){const p=c?c.s.crit:CRIT;
  return `<b>Crítico</b>`+'<small>Cada disparo tiene una probabilidad (5% de base) de multiplicar su daño (×2 de base); al impactar aparece una «!» roja junto al enemigo. En los efectos de estado se calcula al aplicarlos y multiplica los stacks que aplican.</small>';}
 if(id==='chain'){const ch=(c&&c.T.chain)||TW.tesla.chain;
  return `<b>Rebote</b>`+R('','Rebotes',ch.n)+R('cd','Daño por rebote','−'+Math.round((1-ch.f)*100)+'%')+R('cg','Distancia máxima',cas(ZAPR/K))+'<small>El rayo golpea al objetivo y salta al enemigo más cercano que aún no haya golpeado, y así hasta agotar los rebotes o quedarse sin enemigos cerca. Cada rebote hace menos daño que el anterior. El crítico se calcula una vez y afecta a todo el rayo.</small>';}
 if(id==='ez')return `<b>Electrizado</b>`+R('cd','Daño eléctrico recibido','+'+Math.round(EZAMP*100)+'% por stack')+R('cr','Duración',f(4)+' s')+R('','Máximo',EZMAX+' stacks')+'<small>Cada stack hace que el enemigo reciba más daño eléctrico, venga de la torre que venga. Los stacks se refrescan al volver a electrizarlo y caducan todos a la vez.</small>';
 if(id==='stk')return '<b>Acumulable</b><small>Si un estado es acumulable, cada aplicación suma un stack más y su efecto crece con los stacks. Si no lo es, no se suma: se refresca y vale el más fuerte.</small>';
 if(id==='tgts')return '<b>Objetivos</b><small>A qué enemigos puede golpear: 🥾 terrestres, 🪽 voladores.</small>';
 if(id==='tgnd')return '<b>🥾 Terrestres</b><small>Enemigos que van por el camino.</small>';
 if(id==='tair')return '<b>🪽 Voladores</b><small>Enemigos que vuelan por encima del camino.</small>';
 if(id==='fly')return '<b>Volador</b><small>Vuela por encima del camino: no lo bloquean tus unidades y no le afecta nada que golpee el suelo. El resto de ataques sí le dan. Mira los <b>Objetivos</b> de cada torre.</small>';
 if(id==='wet')return `<b>Mojado</b>`+R('cr','Dura',WETT+' s tras salir de la lluvia')+'<small>El enemigo recibe más daño eléctrico (de cualquier torre eléctrica), queda congelado un 50% más de tiempo y no puede arder: se le apaga la quemadura.</small>';
 if(id==='cursed')return `<b>Maldito</b>`+R('cr','Dura',HEXT+' s tras el último golpe')+'<small>El enemigo recibe más daño mágico de todas las fuentes, venga de la torre que venga. No se acumula: vale el maleficio más fuerte.</small>';
 if(id==='poly')return `<b>Transformado</b>`+R('cr','Velocidad',Math.round(POLYS*100)+'% de la normal')+'<small>El enemigo se convierte en un animal inofensivo (de momento, una rana): pierde toda su armadura y resistencia mágica, avanza más despacio y no ataca. Las élites duran la mitad; los jefes son inmunes.</small>';
 if(id==='fear')return `<b>Aterrado</b>`+R('cr','Duración',f(FEART)+' s')+'<small>El enemigo huye: retrocede por el camino y no ataca mientras dure. Los jefes, la mitad del tiempo.</small>';
 if(id==='spect')return `<b>Espectro</b>`+'<small>Invocación aliada temporal. Tiene la mitad de la vida máxima del enemigo del que surge y golpea con daño físico según el daño del rayo del orbe. Bloquea como un soldado (corpulencia 1) y avanza por el camino hacia los portales mientras no lucha.</small>';
 if(id==='sticky')return `<b>Pegajoso</b>`+R('cr','Se despega en',f(STKT)+' s')+'<small>Una ralentización fuerte mientras el enemigo está sobre la sustancia. Al salir se va despegando: la ralentización baja poco a poco hasta desaparecer. No se suma a otras ralentizaciones: vale la más fuerte. Los jefes sufren la mitad.</small>';
 if(id==='brk')return `<b>Armadura rota</b>`+R('cr','Duración de cada golpe',BRKT+' s')+'<small>Reduce la armadura física del enemigo. Cada golpe suma su reducción y caduca por separado, hasta un máximo. Beneficia a todo el daño físico, venga de la torre que venga.</small>';
 if(id==='flam')return `<b>Inflamable</b>`+R('cd','Al arder',TARB+' stacks de quemadura por segundo')+R('cr','Duración del fuego',TARF+' s')+'<small>Si le llega fuego (un enemigo con quemadura o un charco de fuego), arde y se convierte en un charco de fuego que quema a quien esté dentro. Cualquier fuego prende cualquier sustancia inflamable, sea de la torre que sea.</small>';
 if(id==='stun')return `<b>Aturdir</b>`+R('cr','Duración',f(STUNT)+' s')+'<small>Un enemigo aturdido no se mueve. No se puede aturdir a un enemigo congelado. Los jefes sufren la mitad (resistencia de jefe).</small>';
 if(id==='burn')return `<b>Quemadura</b> · daño elemental`+R('cd','Daño de cada stack',BURND+' por segundo')+R('cr','Pérdida de stacks',Math.round(BURNK*100)+'% por segundo')+'<small>Los stacks no caducan por tiempo: cada segundo el enemigo pierde una parte de ellos. Mientras tanto, cada stack hace daño elemental (ignora la armadura) por segundo. Si lo golpeas sin parar, los stacks se acumulan hasta un equilibrio; si dejas de golpearlo, el fuego se apaga solo.</small>';
 if(id==='beam'){const ok=c&&c.T.beam,T=ok?c.T:TW.laser,s=ok?c.s:{dmg:T.dmg,rate:T.rate};
  return `<b>Rayo continuo</b>`+'<small>Se mantiene sobre un objetivo y le hace daño constante, en vez de disparos sueltos. Cambia de objetivo cuando muere o sale del rango.</small>';}
 return '';
}
function effHtml(T,src){
 if(T.wall)return kw('bwall','Muro',src);
 if(T.log)return kw('logk','Tronco rodante',src);
 if(T.monk)return T.noheal?kw('drunk','Embriaguez',src):kw('mheal','Curación',src);
 if(T.slow)return kw('slow','Ralentización',src)+' '+Math.round((1-T.slow)*100)+'%';
 if(T.puddle)return kw('poison','Veneno',src);
 if(T.chain)return kw('chain','Rebote',src)+' ×'+T.chain.n;
 if(T.ez)return kw('ez','Electrizado',src);
 if(T.burn)return kw('burn','Quemadura',src);
 return null;
}
// duración del efecto temporal de la torre (los detalles de cada estado están en el tooltip de su palabra clave)
function durOf(T,s){if(T.log)return f(s.ldur||logDur(1))+' s (rodando)';if(T.wall)return '4 s';if(T.puddle)return f(T.dur)+' s';return '';}
function rows(s,T,src,extra){
 const dm=T.dot?R('cd',kst('dmg','Daño',src),'0'):T.burn?R('cd',kst('dmg','Daño',src),'0'):T.monk&&T.mhit?R('cd',kst('dmg','Daño',src)+' ('+kst('mhit','Golpe espiritual',src)+')',f(s.dmg)+' ('+f(s.dmg*T.mhit)+')'):T.splash?R('cd',kst('dmg','Daño',src)+' ('+kst('aoedmg','Daño AdE',src)+')',f(s.dmg)+' ('+f(s.dmg*SPLASH)+')'):R('cd',kst('dmg','Daño',src),f(s.dmg)),ef=effHtml(T,src),du=durOf(T,s);
 const un=extra&&typeof extra==='object'&&extra.u;
 if(un){const cr=s.dmg>0?R('cc',kst('crit','Crítico',src),Math.round(s.crit*100)+'% (×'+s.critm+')'):'';
  return R('cg',kst('rng','Rango',src),cas(s.range/K))+(du?R('cr',kst('dur','Duración',src),du):'')+'<div class="usub"><b>Estadísticas de unidades</b>'+extra.n+dm+R(DT[T.dt].cls,kst('dtype','Tipo de daño',src),kw(DT[T.dt].kw,DT[T.dt].n,src,'st'))+R('ccl',kst('cool','Enfriamiento',src),f(1/s.rate)+' s')+extra.life+extra.rng+extra.obj+
   (s.area?R('ca',kst('area','Área',src),f(s.area/K)+' de radio'):'')+(s.pen?R('cph',kst('penp','Penetración '+(T.dt==='magic'?'mágica':'física'),src),f(s.pen)):'')+cr+(ef?R('cf',kst('eff','Efectos',src),ef):'')+`<div class="row cd"><span>${kst('dps','DPS',src)}</span><span>≈ ${f(dpsOf(s,T))}</span></div>`+'</div>'+extra.tail;}
 return dm+R(DT[T.dt].cls,kst('dtype','Tipo de daño',src),kw(DT[T.dt].kw,DT[T.dt].n,src,'st'))+(T.puddle?R('ccl',kst('cool','Enfriamiento',src)+' ('+kst('pstk','Acumulación',src)+')',f(1/s.rate)+' s ('+f(PTICK)+' s)'):R('ccl',kst('cool','Enfriamiento',src),f(1/s.rate)+' s'))+(du?R('cr',kst('dur','Duración',src),du):'')+R('cg',kst('rng','Rango',src),cas(s.range/K))+objRow(!!T.ground,src)+
  (s.area?R('ca',kst('area','Área',src),f(s.area/K)+' de radio'):'')+(T.burn&&T.cone?R('ca',kst('area','Área',src),'Cono de '+T.cone+'°'):'')+
  (s.pen?R('cph',kst('penp','Penetración '+(T.dt==='magic'?'mágica':'física'),src),f(s.pen)):'')+(s.dmg>0||T.dot||T.burn?R('cc',kst('crit','Crítico',src),Math.round(s.crit*100)+'% (×'+s.critm+')'):'')+
  (T.log?R('',kst('push','Empuje',src),'0,5 casillas'):'')+(extra||'')+(ef?R('cf',kst('eff','Efectos',src),ef):'');
}
// el DPS es siempre la última línea de la tarjeta, anclada abajo, con su hueco de separación
const dpsRow=(s,T,src)=>`<div class="row cd dps"><span>${kst('dps','DPS',src)}</span><span>≈ ${f(dpsOf(s,T))}</span></div>`;
// objetivo: en la ficha fijada se puede cambiar; si no, solo se muestra
function tgtRow(t,src,pinned){return tgtRow0(t,src,pinned)+(t&&t.type==='augur'&&t.spec==='lord'?(pinned?`<div class="tgt"><button data-a="flag" data-id="${t.id}">🚩 Mover la nube</button></div>`:'<small>Haz clic en la torre para mover su nube.</small>'):'');}
function tgtRow0(t,src,pinned){
 if(!pinned)return R('',kst('tgt','Objetivo',src),TGT[t.mode].n);
 return `<div class="tgt"><div>${kst('tgt','Objetivo',src)}</div><select class="tsel" data-a="tgt" data-id="${t.id}">`+Object.keys(TGT).map(k=>`<option value="${k}"${t.mode===k?' selected':''}>${TGT[k].n}</option>`).join('')+
  `</select><div class="tcp"><button data-a="tgtall" data-id="${t.id}">Copiar a todas las torres del mismo tipo</button><button class="${(S.dtg[t.type]||'core')===t.mode?'on':''}" data-a="tgtdef" data-id="${t.id}">Copiar a futuras torres creadas del mismo tipo</button></div></div>`;
}
function unitRows(T,src,t,pinned,hpm,uap){const U=T.unit,ap=U.ap+(uap||0),mr=t&&abRank(t,'sacred')?abRank(t,'sacred').a:0;
 return {u:1,n:R('',kst('usol','Nº de unidades',src),U.n),life:R('chp',kst('uhp','Vida',src),Math.round(U.hp*hpm))+(ap?R('cph',kst('aphys','Armadura',src),armTxt(ap)):'')+(mr?R('cmg',kst('umr','Resistencia mágica',src),armTxt(mr)):'')+R('cr',kst('urez','Reaparición',src),U.rez+' s'),rng:U.range?R('cg',kst('rng','Rango',src),cas(U.range)):'',obj:objRow(!U.range,src),tail:
  (t?(pinned?`<div class="tgt"><button data-a="flag" data-id="${t.id}">🚩 Mover bandera</button></div>`:'<small>Haz clic en la torre para mover su bandera.</small>'):'')};}
function towerInfo(t){
 if(TW[t.type].uniq)return uniqInfo(t,t.type);
 const T=TW[t.type],s=stats(t),src='tw:'+t.id,ks=[...new Set(t.cells.map(([x,y])=>S.buff[y][x]).filter(Boolean))];
 const X=tinfo(t);
 return `<div class="ttl"><b>${X.ic} ${X.n}</b> · ${kst('lvl','Nv '+t.lvl,src)}</div>`+rows(s,twm(t.type,t.spec),src,T.unit?unitRows(T,src,t,PR.pinned&&PR.key===src,lvMods(t.type,t.lvl,t.spec).hp,X.uap):tgtRow(t,src,PR.pinned&&PR.key===src))+
  (ks.length?'<small>Casillas bajo la torre:</small>'+ks.map(k=>`<div><i style="background:${BF[k].col}"></i>${bfkw(k)}: ${bfT(k,t.x,t.y)}${bkey(k)==='aoe'&&!s.area?' (sin efecto aquí)':''}</div>`).join(''):'')+upRow(t,PR.pinned&&PR.key===src)+(PR.pinned&&PR.key===src?`<div class="tgt"><button data-a="sell">Vender torre (<span class="gd">+${sellVal(t)} 🪙</span>)</button></div>`:'')+(T.unit?'':dpsRow(s,T,src));
}
function shopInfo(id,quiet){
 const T=TW[id],src='shop:'+id,st=quiet?cpState(id):{lv:1,spec:null},lv=st.lv,L=lvMods(id,lv,st.spec),X=st.spec?SPECS[id][st.spec]:T,
  s={dmg:T.dmg*L.dmg,rate:T.rate/L.cd,range:T.range*L.range,crit:CRIT,critm:2,area:(T.splash||T.pr||0)*L.area,pen:L.pen||0},sn=CP.lv[id]||1;
 const lb=quiet?`<button class="stbtn lvbtn" data-a="clv" data-v="${id}" title="Ver la torre en otro nivel">${sn>=nStates(id)||(sn===3&&nStates(id)===3)||lv===4?'Nv Max':'Nv '+lv}</button>${sn>=4&&nStates(id)>4?`<button class="stbtn lvbtn" data-a="cbr" data-v="${id}" title="Cambiar a la otra especialización">⇄ ${sn===4?'B':'A'}</button>`:''}`:'';
 return `<div class="ttl">${lb}<b>${X.n}</b> · ${X.ic}<br><span class="gd">${(quiet&&lv>1?kst('upc','Mejora '+upCost(T,lv)+' 🪙',src):kst('cost','Coste '+T.cost+' 🪙',src))}</span></div>`+rows(s,twm(id,st.spec),src,T.unit?unitRows(T,src,null,false,L.hp,X.uap):(quiet?'':R('',kst('tgt','Objetivo',src),TGT[S.dtg[id]||'core'].n)))+(st.spec?'<div style="margin-top:6px"><b>Habilidades</b></div>'+abList(id,st.spec,null):'')+(quiet?'':'<small>Valores base, sin bufos de casilla.</small>')+(T.unit?'':dpsRow(s,T,src));
}

// texto del bonus de una casilla con los multiplicadores que están activos ahora (valores reales: el jugador no tiene que calcular)
function bfMul(kx,ky){let m=1,why=[];try{if(S&&S.relics&&rp('anvil')){m*=1.5;why.push('⚒️ Yunque');}if(kx!=null&&S.bless&&S.bless[Math.floor(kx/(N/BN))+','+Math.floor(ky/(N/BN))]){m*=2;why.push('✨ bendecida');}}catch(e){}return{m,why};}
const bfFmt=v=>{const r=Math.round(v*10)/10;return String(r).replace('.',',');};
function bfT(k,kx,ky){const B=BF[k],{m,why}=bfMul(kx,ky);if(m===1)return B.t;
 return B.t.replace(/([+−-])(\d+(?:[.,]\d+)?)%/g,(x,sg,n)=>sg+bfFmt(parseFloat(n.replace(',','.'))*m)+'%')+` <small class="cf">(${why.join(', ')})</small>`;}
function buffInfo(k,cmp,kx,ky){
 const B=BF[k],bt=cmp?`<button class="stbtn${B.sup?' on':''}" data-a="csup" data-v="${bkey(k)}" title="Mostrar versión ${B.sup?'normal':'super'}">${B.sup?'★':'☆'}</button>`:'';
 return `${bt}<b><i style="background:${B.col}"></i>${cmp?B.n:bname(k)}</b><div>${cmp?B.t:bfT(k,kx,ky)}</div><small>Solo afecta a la torre construida encima.${B.note?' '+B.note:''}</small>`;
}
// casilla especial como palabra clave: negrita, su color (algo oscurecido para leerse sobre el papel) y bocadillo con su explicación
const bfkw=k=>`<span class="kw" data-kw="bf_${k}" data-src="" style="color:color-mix(in srgb,${BF[k].col} 70%,var(--ink))">${bname(k)}</span>`;
function pieceInfo(o){
 return `<b>${o.n}</b> · pieza ${P}×${P}`+(o.b.length?'<small>Casillas especiales'+(payOn()&&S.offers&&S.offers.includes(o)?' · cuestan <span class="gd">'+pcost(o)+' 🪙</span> al colocar la pieza':'')+':</small>'+o.b.map(b=>`<div><i style="background:${BF[b.k].col}"></i>${bfkw(b.k)}: ${bfT(b.k)}</div>`).join(''):'<small>Sin casillas especiales.'+(payOn()&&S.offers&&S.offers.includes(o)?' Colocarla es gratis.':'')+'</small>');
}
function portalInfo(p){
 if(!p)return '<b>Extremo inactivo</b><small>Esta ronda no saldrán enemigos por aquí. Se usan primero los extremos de la pieza nueva y luego los más lejanos a la base.</small>';
 return '<b>Portal enemigo</b>'+['norm','fast','tank','custodian','sling','javelin','raider','acolyte','warlock','shaman','mini','elite','boss','colossus','cub','greyw','bigw','wanted','momdrg'].filter(t=>p.plan[t]).map(t=>R('',t==='wanted'?'Élite (encargo)':ET[t].n,p.plan[t])).join('')+'<small>Enemigos que saldrán por este portal en la oleada.</small>';
}
const PH='<small style="margin:0">Pasa el ratón por un elemento del juego para ver su información.</small>';
// ---- hover: rueda de carga, ralentización y panel de información ----
function cell(ev){const r=cv.getBoundingClientRect(),k=sc(),px=(ev.clientX-r.left)/r.width*VIEW,py=(ev.clientY-r.top)/r.height*VH,fx=(px/k+CAM.x)/CS,fy=(py/k+CAM.y)/CS;return{x:Math.floor(fx),y:Math.floor(fy),fx,fy};}
function cellRect(x,y,n){const r=cv.getBoundingClientRect(),k=sc(),l=r.left+(x*CS-CAM.x)*k*r.width/VIEW,t=r.top+(y*CS-CAM.y)*k*r.height/VH,w=(n||1)*CS*k*r.width/VIEW;return{l,t,r:l+w,b:t+w};}
const rr=r=>({l:r.left,t:r.top,r:r.right,b:r.bottom});
// Panel lateral como cajón pegado al mapa: escondido detrás del mapa y se desliza hacia fuera al mostrar información
function layoutSide(){
 const s=$('side'),cw=$('cw'),drawer=!PMN()&&innerWidth>860;
 if(!drawer){if(s.parentNode!==$('game'))$('game').insertBefore(s,$('game').firstChild);s.classList.remove('drawer','open');s.style.marginTop='';s.style.height='';s.style.maxHeight='';s.style.top='';return;}
 if(s.parentNode!==cw)cw.appendChild(s);s.classList.add('drawer');
 const cr=cv.getBoundingClientRect();s.style.marginTop='';s.style.height='auto';s.style.maxHeight=cr.height+'px';
 s.style.top=Math.max(0,(cr.height-s.offsetHeight)/2)+'px';
 const room=PM==='left'?cr.left-6:innerWidth-cr.right-6;s.style.setProperty('--ox',Math.min(0,room-s.offsetWidth)+'px');
 s.classList.toggle('open',!!PR.open);s.classList.toggle('over',room<s.offsetWidth&&!!PR.open);
}
function resolve(el){
 if(!el)return null;
 if(el===cv){
  const c=cell({clientX:M.x,clientY:M.y});S.hover=c;if(!inb(c.x,c.y))return null;
  const rect=cellRect(c.x,c.y);
  const at=q=>Math.abs(q.x-c.x)<=1&&Math.abs(q.y-c.y)<=1,pt=S.portals.find(at),po=pt||S.ends.find(at);
  if(po)return{key:'pt:'+po.x+','+po.y+(pt?'a':'i'),html:()=>portalInfo(pt),rect:cellRect(po.x-1,po.y-1,3)};
  const t=S.occ[c.x+','+c.y];
  if(t)return{key:'tw:'+t.id,html:()=>towerInfo(t),rect:cellRect(t.x-1,t.y-1,K),cell:c};
  const k=S.buff[c.y][c.x];
  const kx=Math.floor(c.x/K),ky=Math.floor(c.y/K),kr=cellRect(kx*K,ky*K,K);
  if(k)return{key:'bf:'+kx+','+ky,html:()=>buffInfo(k,0,c.x,c.y),rect:kr};
  if(S.phase==='place'&&S.pi!=null){const bx=Math.floor(kx/P),by=Math.floor(ky/P);
   if(bx<BN&&by<BN&&!S.blocks[bx+','+by]){const b=S.offers[S.pi].b.find(b=>b.x===kx-bx*P&&b.y===ky-by*P);
    if(b)return{key:'gb:'+kx+','+ky+b.k,html:()=>buffInfo(b.k),rect:kr};}}
  {const bx=Math.floor(kx/P),by=Math.floor(ky/P);
   if(S.chests[bx+','+by]&&!S.blocks[bx+','+by]&&Math.abs(kx-bx*P-3)<=1&&Math.abs(ky-by*P-3)<=1)return{key:'ch:'+bx+','+by,html:chestInfo,rect:kr};}
  return null;}
 const d=el.closest('[data-tip]');if(!d)return null;
 const[kind,id]=d.dataset.tip.split(':'),r=d.getBoundingClientRect();
 if(kind==='shop')return{key:'shop:'+id,html:()=>shopInfo(id),rect:rr(r),dom:1};
 if(kind==='relic')return{key:'relic:'+id,html:()=>relicInfo(id),rect:rr(r),dom:1};
 if(kind==='habp'){const[hi,hk]=id.split('.'),A=HAB[hi]&&HAB[hi][hk];return A?{key:'habp:'+id,html:()=>`<div class="ttl"><b>${A.ic} ${A.n}</b> · ${hk==='b'?'Activa básica · desde el inicio':hk==='u'?'Definitiva · Nv 10':'Pasiva · Nv '+hk.slice(1)}</div><small style="margin:0">${A.t()}</small>`+(hk==='b'||hk==='u'?R('ccl','Enfriamiento',(hk==='u'?HUCD:HBCD)+' s'):'')+((HDUR[hi]||{})[hk]?R('cr','Duración',HDUR[hi][hk]):''),rect:rr(r),dom:1}:null;}
 if(kind==='achrw'){const[k0,nm]=id.split('.'),W={tw:['Torre','Desbloquearás una nueva torre.','Desbloqueaste'],rl:['Reliquia','Desbloquearás una nueva reliquia.','Desbloqueaste'],hr:['Héroe','Desbloquearás un nuevo héroe.','Desbloqueaste a'],cp:['Compendio','Desbloquearás el Compendio.','Desbloqueaste'],cs:['Personalización','Desbloquearás un aspecto nuevo para Opciones → Personalización.','Desbloqueaste']}[k0];return W?{key:'achrw:'+id,html:()=>`<div class="ttl"><b>${W[0]}</b></div><small style="margin:0">${nm?W[2]+' '+decodeURIComponent(nm)+'.':W[1]}</small>`,rect:rr(r),dom:1}:null;}
 if(kind==='xab')return{key:'xab:'+id,html:mechaInfo,rect:rr(r),dom:1};
 if(kind==='hab')return S.hero?{key:'hab:'+id,html:()=>habInfo(id),rect:rr(r),dom:1}:null;
 if(kind==='vch')return{key:'vch:'+id,html:()=>vchInfo(id),rect:rr(r),dom:1};
 if(kind==='hero')return S.hero?{key:'hero',html:()=>heroInfo(S.hero.id),rect:rr(r),dom:1}:null;
 if(kind==='piece'){const o=S.offers[+id];if(!o)return null;
  const cr=d.querySelector('canvas').getBoundingClientRect();
  if(M.x>=cr.left&&M.x<cr.right&&M.y>=cr.top&&M.y<cr.bottom){const cs=cr.width/P,lx=Math.floor((M.x-cr.left)/cs),ly=Math.floor((M.y-cr.top)/cs),b=o.b.find(b=>b.x===lx&&b.y===ly);
   if(b)return{key:'pb:'+id+b.k+lx+ly,html:()=>buffInfo(b.k),rect:{l:cr.left+lx*cs,t:cr.top+ly*cs,r:cr.left+(lx+1)*cs,b:cr.top+(ly+1)*cs},dom:1};}
  return{key:'piece:'+id,html:()=>pieceInfo(o),rect:rr(r),dom:1};}
 return null;
}
const PR={open:false,pinned:false,key:null,html:null,rect:null,dom:0,cell:null,dead:0};
const KS=[],KD={el:null,t:0},GRACE=.3;
function closeKS(from){from=from||0;while(KS.length>from){const k=KS.pop();if(k.el.parentNode)k.el.parentNode.removeChild(k.el);}KD.el=null;KD.t=0;}
let EID=0;
function enemyInst(e){const E=ET[e.t],ap=(E.ap||0)+(e.cb||0),am=(E.am||0)+(e.cb||0);
 return enemyInfo(e.t)+'<small style="margin-top:8px">Este enemigo ahora:</small>'+R('chp','Vida',Math.round(e.hp)+' / '+Math.round(e.max))+R('cph','Armadura',armTxt(ap)+(e.cb>0?' (+'+e.cb+')':''))+R('cmg','Resistencia mágica',armTxt(am)+(e.cb>0?' (+'+e.cb+')':''));}
function closePrim(){if(typeof S!=='undefined'&&S)S.selE=null;PR.auto=0;PR.open=false;PR.pinned=false;PR.key=null;PR.cell=null;PR.dead=0;closeKS();$('tip').style.display='none';$('side').innerHTML=PH;}
function openPrim(tg){
 {const k=String(tg.key||'');if(k.startsWith('shop:'))curSeen(k.slice(5));else if(k.startsWith('tw:')){const t=S&&S.list&&S.list.find(o=>'tw:'+o.id===k);if(t)curSeen(t.type);}}
 closeKS();PR.open=true;PR.pinned=false;PR.key=tg.key;PR.html=tg.html;PR.rect=tg.rect;PR.dom=tg.dom;PR.cell=tg.cell||null;PR.dead=0;
 if(PMN())$('tip').innerHTML=tg.html();else $('side').innerHTML=tg.html();
}
function refreshPrim(){if(!PR.open)return;closeKS();const h=PR.html();if(PMN())$('tip').innerHTML=h;else $('side').innerHTML=h;}
function openKw(a,pl){
 closeKS(pl);
 const d=document.createElement('div');d.className='kpanel tipc';d.dataset.level=pl+1;d.innerHTML=kwHtml(a.dataset.kw,a.dataset.src);d.style.setProperty('--kc',getComputedStyle(a).color);
 document.body.appendChild(d);
 const par=a.closest('.kpanel')||a.closest('#tip')||a.closest('#side')||a.closest('.hmsg')||a.closest('#hpop'),ar=a.getBoundingClientRect(),br=par?par.getBoundingClientRect():ar,wd=d.offsetWidth,ht=d.offsetHeight;
 // la caja sale junto a la palabra (debajo; si no cabe, encima), aunque tape parte del panel del que sale: así no se va lejos de donde miras
 let l=Math.max(6,Math.min(innerWidth-6-wd,ar.left-12));
 let t=ar.bottom+6;if(t+ht>innerHeight-6)t=ar.top-6-ht;if(t<6)t=Math.max(6,Math.min(innerHeight-6-ht,ar.bottom+6));
 d.style.left=l+'px';d.style.top=t+'px';
 KS.push({el:d,anchor:a,dead:0});KD.el=null;KD.t=0;
}

// ---- palabras de estado escritas como texto: se convierten solas en palabras clave (con su color y su tooltip) ----
const AKW=[['poison','veneno|venenos|envenenad[oa]s?|envenena|envenenar'],['burn','quemaduras?|quemad[oa]s?'],['chill','hipotermia'],
 ['freeze','congela\\p{L}*'],['slow','ralentiza\\p{L}*'],['stun','aturd\\p{L}*'],['bleed','sangrado'],['ez','electrizad[oa]s?'],['wet','mojad[oa]s?'],
 ['root','enredad[oa]s?|enredo'],['fear','aterrad[oa]s?'],['cursed','maldit[oa]s?'],['sticky','pegajos[oa]s?'],['flam','inflamables?'],['poly','transformad[oa]s?'],['brk','armadura rota']];
const AKWR=new RegExp('(?<!\\p{L})('+AKW.map(a=>a[1]).join('|')+')(?!\\p{L})','giu'),AKWI=AKW.map(([id,r])=>[id,new RegExp('^(?:'+r+')$','iu')]);
const AKWC='#tip,#side,#comp,#relic,.kpanel,#hint,#apan,#endscr';
function akwRun(root){
 if(!root||root.nodeType!==1&&root.nodeType!==3)return;const host=root.nodeType===3?root.parentElement:root;if(!host||!host.closest||!host.closest(AKWC))return;
 const list=[];if(root.nodeType===3)list.push(root);else{const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode())list.push(n);}
 for(const t of list){const pe=t.parentElement;if(!pe||pe.closest('.kw,b,strong,h1,h2,h3,h4,.ttl,button,option,select,textarea,input,script,style,.nokw,svg'))continue;
  const v=t.nodeValue;AKWR.lastIndex=0;if(!AKWR.test(v))continue;AKWR.lastIndex=0;
  const fr=document.createDocumentFragment();let last=0,m;
  while(m=AKWR.exec(v)){const id=(AKWI.find(([i,r])=>r.test(m[0]))||[])[0];if(!id)continue;fr.appendChild(document.createTextNode(v.slice(last,m.index)));
   const sp=document.createElement('span');sp.className='kw';sp.dataset.kw=id;sp.dataset.src='';sp.textContent=m[0];fr.appendChild(sp);last=m.index+m[0].length;}
  if(!last)continue;fr.appendChild(document.createTextNode(v.slice(last)));t.replaceWith(fr);}
}
try{new MutationObserver(ms=>{for(const m of ms)for(const n of m.addedNodes)akwRun(n);}).observe(document.body,{childList:true,subtree:true});}catch(e){}
const MFSQ=()=>document.body.classList.contains('mfs'),LUPA={tg:null,sticky:false};
function placeLupa(r){const b=$('lupa');if(!b||!r)return;b.style.display='grid';const w=40,x=(r.l+r.r)/2-w/2;let y=r.t-w-6;if(y<4)y=r.b+6;b.style.left=Math.max(4,Math.min(innerWidth-w-4,x))+'px';b.style.top=Math.max(4,Math.min(innerHeight-w-4,y))+'px';}
function hideLupa(){LUPA.tg=null;LUPA.sticky=false;const b=$('lupa');if(b)b.style.display='none';}
function hoverTick(rdt){
 S.hover=null;
 const el=M.has?document.elementFromPoint(M.x,M.y):null;
 const kpEl=el&&el.closest('.kpanel'),kwEl=el&&el.closest('.kw');
 const inPrim=!!(el&&(el.closest('#tip')||el.closest('#side'))),inComp=!!(el&&(el.closest('#comp')||el.closest('#opts')||el.closest('#relic')||el.closest('#hint')||el.closest('#hpop')||el.closest('#focus')||el.closest('#tmcard')||el.closest('#bmcard')));
 const lvl=kpEl?+kpEl.dataset.level:(inPrim||inComp?0:-1);
 const tg=(!inPrim&&!kpEl&&!inComp)?resolve(el):null;
 if(MFSQ()){const onL=el&&el.closest&&el.closest('#lupa');if(PR.pinned||RL.open||LB.open||(typeof PMU!=='undefined'&&PMU.open))hideLupa();else if(tg&&!LUPA.sticky){LUPA.tg=tg;placeLupa(tg.rect);}else if(LUPA.tg&&LUPA.sticky){const r=LUPA.tg.rect;if(r)placeLupa(r);else hideLupa();}else if(!onL)hideLupa();}
 // panel principal: se abre tras la rueda y aguanta mientras el ratón esté en el elemento o en los paneles
 if(PR.pinned){HV.key=null;HV.t=0;}
 else if(tg&&!MFSQ()&&!(TM.t&&tg.key==='tw:'+TM.t.id&&tmVis())){
  if(HV.key!==tg.key){HV.key=tg.key;HV.t=0;}else HV.t=Math.min(1,HV.t+rdt/OPT.delay);
  if(HV.t>=1&&!(PR.open&&PR.key===tg.key))openPrim(tg);
  if(PR.open&&PR.key===tg.key){PR.rect=tg.rect;PR.cell=tg.cell||null;}
 }else{HV.key=null;if(!PR.open)HV.t=Math.max(0,HV.t-rdt*3);}
 const onPin=PR.pinned&&(inPrim||!!kpEl||(tg&&tg.key===PR.key));
 if(PR.open&&!PR.pinned){
  const alive=inPrim||kpEl||(tg&&tg.key===PR.key);
  PR.dead=alive?0:PR.dead+rdt;
  if(PR.dead>GRACE)closePrim();
 }
 // paneles de palabras clave encadenados
 for(let i=0;i<KS.length;i++){const k=KS[i],alive=k.el.classList.contains('inline')||kwEl===k.anchor||lvl>=i+1;
  k.dead=alive?0:k.dead+rdt;if(k.dead>GRACE){closeKS(i);break;}}
 if(kwEl&&(PR.open||inComp||kpEl)){
  const pl=kpEl?+kpEl.dataset.level:0;
  if(KS[pl]&&KS[pl].anchor===kwEl){KD.el=null;KD.t=0;}
  else{if(KD.el!==kwEl){KD.el=kwEl;KD.t=0;}else KD.t=Math.min(1,KD.t+rdt/(OPT.delay*.58));if(KD.t>=1)openKw(kwEl,pl);}
 }else{KD.el=null;KD.t=0;}
 // rueda de carga
 const w=$('wheel'),pw=(tg&&!MFSQ()&&!PR.pinned&&!(PR.open&&PR.key===tg.key)&&HV.t<1)?HV.t:(KD.el&&KD.t<1?KD.t:-1);
 if(pw>=0){w.style.display='block';w.style.left=(M.x+14)+'px';w.style.top=(M.y+14)+'px';
  w.style.background=`conic-gradient(var(--acc) ${pw*360}deg,rgba(128,128,128,.4) 0)`;}else w.style.display='none';
 // posición del panel flotante
 const tip=$('tip');
 if(PMN()&&PR.open&&!(HQ.cur&&document.body.classList.contains('mfs'))){
  tip.style.display='block';
  const wd=tip.offsetWidth,ht=tip.offsetHeight;let r=PR.rect;
  /* si el anillo de controles de la torre (o del solar) está abierto, el panel se coloca fuera de él para no taparlo */
  for(const id of ['tmenu','bmenu']){const m=$(id);if(m&&m.classList.contains('on')&&m.offsetParent!==null){let u=null;m.querySelectorAll('button').forEach(b=>{const q=b.getBoundingClientRect();if(!q.width)return;u=u?{l:Math.min(u.l,q.left),t:Math.min(u.t,q.top),r:Math.max(u.r,q.right),b:Math.max(u.b,q.bottom)}:{l:q.left,t:q.top,r:q.right,b:q.bottom};});if(u)r={l:Math.min(r.l,u.l),t:r.t,r:Math.max(r.r,u.r),b:r.b};}}
  let l=r.r+8;if(l+wd>innerWidth-6)l=r.l-8-wd;if(l<6)l=6;
  let t=PR.dom?(r.t+r.b)/2-ht/2:r.t;if(t+ht>innerHeight-6)t=innerHeight-6-ht;if(t<6)t=6;
  tip.style.left=l+'px';tip.style.top=t+'px';
 }else tip.style.display='none';
 if(!S.hover&&PR.open&&PR.cell)S.hover=PR.cell;
 HV.sl=PR.pinned?(onPin?1:0):(PR.open?1:HV.t);
}
