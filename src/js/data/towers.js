// Bufos: d=daño, r=cadencia (1/enfriamiento), rg=rango, ar=área (multiplicadores); gold=oro extra por baja
const BF={
rng:{n:'Alcance',l:'A',col:'#4cc9a0',rg:1.35,t:'<span class="cg">+35% rango</span>'},
pow:{n:'Potencia',l:'P',col:'#e0605a',d:1.5,r:1/1.5,t:'<span class="cd">+50% daño</span>, <span class="cr">+50% enfriamiento</span>'},
spd:{n:'Frenesí',l:'R',col:'#a15cff',d:.75,r:1/.75,t:'<span class="cr">−25% enfriamiento</span>, <span class="cd">−25% daño</span>'},
gold:{n:'Codicia',l:'$',col:'#f0b429',gold:.5,t:'<span class="gd">+50% de oro</span> por baja'},
aoe:{n:'Expansión',l:'E',col:'#ff9a3c',ar:1.4,t:'<span class="ca">+40% área de efecto</span>',note:'Solo tiene efecto en torres que hacen daño en área.'},
crt:{n:'Precisión',l:'C',col:'#ff5c8a',cr:.15,t:'<span class="cc">+15% de probabilidad de crítico</span>'},
prf:{n:'Perforación',l:'X',col:'#9aa4b4',pen:10,t:'<span class="cph">+10 de penetración</span> (física o mágica, según la torre)',note:'No afecta al daño elemental, que ya ignora la armadura.'},
eco:{n:'Eco',l:'O',col:'#4fd6e0',eco:5,t:'Uno de cada <b>5</b> disparos se repite al instante',note:'Solo en torres que disparan (no en las de unidades ni de apoyo).'},
per:{n:'Persistencia',l:'T',col:'#6aa0ff',per:1.5,t:'Lo que deja la torre dura un <span class="cr">50%</span> más',note:'Charcos, zonas, franjas de fuego, bidones y ralentizaciones de sus disparos.'},
tal:{n:'Taller',l:'M',col:'#b8865a',tal:.8,t:'Mejorar la torre cuesta un <span class="gd">20%</span> menos',note:'Mejoras de nivel, especialización y habilidades.'},
cua:{n:'Cuartel',l:'U',col:'#7a8cff',uhp:1.3,t:'<span class="chp">+30% de vida</span> de sus soldados',note:'Solo tiene efecto en torres de unidades.'}};
const BK=Object.keys(BF);
// Super casillas: mismas casillas con los bonus x2 (clave = base+'+'). Probabilidad base 20%, +SUPUP cada vez que sale una normal, se reinicia al salir una super.
const SUP0=.2,SUPUP=.05;
const BFSUP={rng:{rg:1.7,t:'<span class="cg">+70% rango</span>'},
 pow:{d:2,r:1/2,t:'<span class="cd">+100% daño</span>, <span class="cr">+100% enfriamiento</span>'},
 spd:{d:.5,r:2,t:'<span class="cr">−50% enfriamiento</span>, <span class="cd">−50% daño</span>'},
 gold:{gold:1,t:'<span class="gd">+100% de oro</span> por baja'},aoe:{ar:1.8,t:'<span class="ca">+80% área de efecto</span>'},
 crt:{cr:.3,t:'<span class="cc">+30% de probabilidad de crítico</span>'},prf:{pen:20,t:'<span class="cph">+20 de penetración</span> (física o mágica, según la torre)'},
 eco:{eco:3,t:'Uno de cada <b>3</b> disparos se repite al instante'},per:{per:2,t:'Lo que deja la torre dura el <span class="cr">doble</span>'},
 tal:{tal:.6,t:'Mejorar la torre cuesta un <span class="gd">40%</span> menos'},cua:{uhp:1.6,t:'<span class="chp">+60% de vida</span> de sus soldados'}};
for(const k of BK)BF[k+'+']={...BF[k],...BFSUP[k],sup:1,base:k};
const bkey=k=>BF[k].base||k,bname=k=>BF[k].n+(BF[k].sup?' <span class="stg">★</span>':'');
function rollBuff(){const k=BK[Math.floor(Math.random()*BK.length)];
 if(Math.random()<S.sup){S.sup=SUP0;return k+'+';}S.sup=Math.min(1,S.sup+SUPUP);return k;}
const TW={
arrow:{n:'Arqueros',ic:'🏹',dt:'phys',cost:75,range:2.8,dmg:8.5,rate:2.5,ps:12,col:'#e8b04a',l:'F',fx:'Ninguno'},
cannon:{n:'Cañoneros',ic:'💣',dt:'phys',era:2,cost:90,range:2.6,dmg:13,rate:.7,ps:6,splash:1.1,shape:'Explosión radial',areaTxt:'Al impactar, afecta a los enemigos dentro del radio.',col:'#e07a3d',l:'N',fx:'Ninguno'},
 cata:{n:'Catapulta',ic:'🪨',dt:'phys',cata:1,ground:1,cost:90,range:2.8,dmg:16,rate:.55,ps:5,splash:1.15,shape:'Explosión radial',areaTxt:'Al impactar, afecta a los enemigos dentro del radio.',col:'#a8977c',l:'C',fx:'Ninguno'},
frost:{n:'Cryomago',ic:'🧊',dt:'elem',cost:70,range:2.4,dmg:3,rate:1.5,ps:9,slow:.5,col:'#6cc5ff',l:'H',fx:'Ralentiza 50% (1,5 s)'},
laser:{n:'Láser de arco',ic:'⚡',dt:'elem',era:2,e2b:1,cost:110,range:2.8,dmg:2.6,rate:8,beam:1,arc:1,col:'#ffe24a',l:'L',fx:'Arco eléctrico continuo'},
bunker:{n:'Búnker',ic:'🏚️',dt:'phys',era:2,e2b:1,cost:85,range:2.6,dmg:4.2,rate:5,ps:40,mag:30,reload:1.8,ramp:.6,col:'#9aa07a',l:'K',fx:'Cargador: la cadencia sube mientras dispara'},
robots:{n:'Robots',ic:'🤖',dt:'phys',era:2,e2b:1,cost:90,range:2.5,dmg:6.5,rate:1,unit:{n:3,hp:58,ap:15,rez:9,spd:1.8},col:'#8aa0b8',l:'R',fx:'Ninguno'},
nano:{n:'Enjambre de nanitos',ic:'🫧',dt:'magic',era:2,e2b:1,cost:105,range:2.6,dmg:3.6,rate:4,swarm:1,col:'#8fb4ff',l:'E',fx:'Enjambre que persigue a los enemigos'},
altar:{n:'Altar de runas',ic:'🪬',dt:'magic',cost:90,range:2.6,dmg:0,rate:0,support:1,bufo:1,col:'#c89aff',l:'A',fx:'Bufos temporales a las torres cercanas'},
dron:{n:'Dron de mantenimiento',ic:'🛸',dt:'phys',era:2,cost:95,range:3,dmg:0,rate:0,support:1,bufo:1,col:'#e8b04a',l:'D',fx:'Afina la puntería de las torres cercanas'},
 orb:{n:'Orbe arcano',ic:'🧿',dt:'magic',cost:110,range:2.8,dmg:28,rate:.85,ps:4.5,orb:1,col:'#8a7dff',l:'I',fx:'Orbe mágico'},
poison:{n:'Envenenadora',ground:1,ic:'🧪',dt:'elem',cost:100,range:3,dmg:1.5,rate:.5,puddle:1,dot:1,dur:4,pr:1,shape:'Charco',areaTxt:'Todos los enemigos dentro del círculo reciben el efecto.',col:'#7bd34a',l:'V',fx:'Veneno acumulable'},
faro:{n:'Faro arcano',ic:'🗼',dt:'magic',cost:0,range:3,dmg:0,rate:0,col:'#ffe27a',l:'F',fx:'Ninguno',uniq:1,support:1,faro:1,ev:'lighthouse'},
dragon:{n:'Huevo de dragón',ic:'🥚',dt:'elem',cost:0,range:2.5,dmg:8,rate:.83,unit:{n:1,hp:60,ap:5,rez:8,spd:2.4},col:'#d0603a',l:'D',fx:'Ninguno',uniq:1,dragon:1,ev:'nest'},
guild:{n:'Sede del Gremio',ic:'🏰',dt:'phys',cost:0,range:2.5,dmg:4,rate:1,unit:{n:3,hp:40,ap:10,rez:8,spd:2},col:'#c9a24a',l:'G',fx:'Ninguno',uniq:1,guild:1,upc:[0,0,80,140,300],ev:'guild'},
straw:{n:'Casa de paja',ic:'🌾',dt:'phys',cost:0,range:2.6,dmg:10,rate:.8,ps:10,splash:.5,slow:.5,slowt:3,slowA:1,col:'#e8cf6a',l:'P',fx:'Ralentización',uniq:1,pig:1,upc:[0,0,40,70,120],ev:'pigs'},
wood:{n:'Casa de madera',ic:'🪵',dt:'phys',cost:0,range:3,dmg:5,rate:.5,col:'#a8743a',l:'M',fx:'Empuje',uniq:1,pig:1,log:1,upc:[0,0,40,70,120],ev:'pigs'},
brick:{n:'Casa de ladrillo',ic:'🧱',dt:'phys',cost:0,range:3,dmg:0,rate:1/12,col:'#c0563a',l:'L',fx:'Muro',uniq:1,pig:1,wall:1,upc:[0,0,40,70,120],ev:'pigs'},
glut:{n:'Mímico glotón',ic:'🧰',dt:'phys',cost:0,range:1.6,dmg:16,rate:.9,col:'#8a5626',l:'X',fx:'Ninguno',uniq:1,glut:1,ev:'chest'},
bastion:{n:'Baluarte',ic:'🛡️',dt:'phys',cost:80,range:2.5,dmg:5.5,rate:1,unit:{n:3,hp:48,ap:10,rez:8,spd:2},col:'#5b8def',l:'B',fx:'Ninguno'},
monk:{n:'Monasterio',ic:'🛕',dt:'phys',cost:90,range:2.5,dmg:5,rate:1,unit:{n:2,hp:42,ap:0,rez:8,spd:2.4},col:'#c9785c',l:'O',fx:'Curación',monk:1,mhit:.2,mheal:{cd:4,p:.1}},
tesla:{n:'Tesla',ic:'🌩️',dt:'elem',era:3,cost:100,range:2.4,dmg:7,rate:1.5,zap:1,chain:{n:3,f:.75},col:'#f4d84a',l:'T',fx:'Rebote'},
 augur:{n:'Augur Voltaico',ic:'👁️',icb:'⚡',dt:'elem',augur:1,cost:100,range:2.6,dmg:12,rate:.8,splash:.9,shape:'Rayo del cielo',areaTxt:'El rayo cae sobre el objetivo y alcanza a los enemigos de alrededor.',col:'#8fd0ff',l:'U',fx:'Ninguno'},
flame:{n:'Lanzallamas',ic:'🔥',dt:'elem',era:2,cost:110,range:2.2,dmg:.45,rate:4,burn:1,cone:60,shape:'Cono',areaTxt:'Todos los enemigos dentro del cono reciben los stacks.',col:'#ff6a2e',l:'Z',fx:'Quemadura'},
acid:{n:'Chorro de ácido',ic:'☣️',dt:'elem',era:2,cost:105,range:2.4,dmg:2.8,rate:2,dot:1,acidj:1,custom:1,col:'#9be15d',l:'Q',fx:'Veneno y armadura rota'},
sonic:{n:'Torre sónica',ic:'🔊',dt:'magic',era:2,cost:115,range:2.2,dmg:3.5,rate:.5,sonic:1,custom:1,shape:'Onda circular',areaTxt:'La onda se expande desde la torre hasta su alcance y golpea una vez a cada enemigo que atraviesa.',col:'#ff8ad8',l:'W',fx:'Onda que empuja'},
 sala:{n:'Salamandra',ic:'🦎',dt:'elem',cost:100,range:2.5,dmg:.45,rate:4,burn:1,cone:60,shape:'Cono',areaTxt:'Todos los enemigos dentro del cono reciben los stacks.',col:'#ff7a3a',l:'S',fx:'Quemadura'}};
// v307: ritmo real de las torres de apoyo (no disparan): el Altar lanza una runa cada 3 s; el Dron tarda 2 s en ajustar cada torre
const BUFOCD={altar:3,dron:2};
const ET={vet:{n:'Veterano',gold:6,hp:4.4,hf:80,sp:1,r:.27,col:'#b8443f',dmg:1,ap:15,am:0},champ:{n:'Campeón',gold:14,hp:12,hf:220,sp:.9,r:.31,col:'#8e2a36',dmg:2,ap:30,am:10},runner:{n:'Corredor',gold:6,hp:2.5,hf:45,sp:1.9,r:.22,col:'#e3a33e',dmg:1,ap:0,am:0},armored:{n:'Acorazado',gold:18,hp:15,hf:280,sp:.55,r:.35,col:'#6c7484',dmg:3,ap:40,am:0},bat:{n:'Murciélago',gold:2,hp:.8,hf:14,sp:1.8,r:.18,col:'#6a5480',dmg:1,ap:0,am:0,fly:1},harpy:{n:'Arpía',gold:6,hp:3.3,hf:60,sp:1.2,r:.25,col:'#b07cc0',dmg:1,ap:0,am:10,fly:1},griffin:{n:'Grifo',gold:16,hp:12,hf:220,sp:1,r:.33,col:'#c9a052',dmg:2,ap:20,am:0,fly:1,el:1},norm:{n:'Guerrero',gold:3,hp:1,sp:1,r:.26,col:'#e05a5a',dmg:1,ap:0,am:0},fast:{n:'Asalto',gold:4,hp:.55,sp:1.7,r:.2,col:'#f08fb0',dmg:1,ap:0,am:0},
tank:{n:'Tanque',gold:10,hp:2.6,sp:.65,r:.34,col:'#a04a7a',dmg:2,ap:10,am:0},
custodian:{n:'Custodio',gold:5,hp:1.4,sp:.65,r:.3,col:'#4f9fb5',dmg:1,ap:0,am:10,aura:{r:2.5,v:10}},
sling:{n:'Hondero',gold:4,hp:.7,sp:1.05,r:.24,col:'#c9a86a',dmg:1,ap:0,am:0},
javelin:{n:'Jabalinero',gold:6,hp:1.3,sp:.85,r:.28,col:'#8a6a4a',dmg:1,ap:10,am:0,pierce:.5},
raider:{n:'Saqueador',gold:6,hp:.8,sp:1.6,r:.22,col:'#d8b04a',dmg:1,ap:0,am:0,dodge:1,steal:10},
acolyte:{n:'Acólito',gold:5,hp:.9,sp:.9,r:.26,col:'#9a7ae0',dmg:1,ap:0,am:30,dt:'magic'},
warlock:{n:'Brujo',gold:10,hp:1.4,sp:.8,r:.3,col:'#5a2a7a',dmg:2,ap:5,am:30,dt:'magic',curse:1},
shaman:{n:'Chamán',gold:8,hp:1.2,sp:.8,r:.28,col:'#4aa07a',dmg:1,ap:5,am:20,dt:'magic',eheal:1},
mini:{n:'Mini-élite',hp:6,sp:.8,r:.4,col:'#e08a2e',dmg:5,gold:25,el:1,ap:15,am:15},elite:{n:'Élite',hp:12,sp:.6,r:.48,col:'#7a4be0',dmg:8,gold:50,el:1,ap:25,am:25},
boss:{n:'Jefe',hp:30,sp:.5,r:.55,col:'#8f1f2e',dmg:10,gold:60,ap:40,am:40},
bob:{n:'Bob',hp:14,sp:.5,r:.52,col:'#c0607a',dmg:5,gold:60,ap:20,am:20},
momdrg:{n:'Mamá dragona',hp:17,sp:.6,r:.55,col:'#a8402e',dmg:5,gold:60,el:1,ap:25,am:25,evn:1,breath:1},
cub:{n:'Lobato',gold:4,hp:.55,sp:1.9,r:.22,col:'#9a8f80',dmg:1,ap:0,am:0,evn:1},
greyw:{n:'Lobo gris',hp:6,sp:.95,r:.4,col:'#7d828a',dmg:3,gold:25,el:1,ap:15,am:15,evn:1,howl:1},
bigw:{n:'El Lobo',hp:14,sp:.75,r:.52,col:'#4a4540',dmg:5,gold:50,el:1,ap:25,am:25,evn:1,blow:1},
colossus:{n:'Coloso',hp:45,sp:.45,r:.68,col:'#4a0d18',dmg:20,gold:150,ap:60,am:60,call:1}};
// Combate cuerpo a cuerpo: ud = daño a unidades, ac = enfriamiento, rg = 'melee' | 'ranged' (se detiene al tener una unidad en su alcance), need = soldados necesarios para detenerlo
const HPOLD=r=>r<=15?Math.pow(HPG,r):Math.pow(HPG,15)*(1+.2*(r-15));
// vida fija (hf) de los enemigos normales; tutorial y eventos siguen escalando por ronda como antes
{const HF={"norm": 25, "fast": 15, "tank": 75, "custodian": 50, "sling": 20, "javelin": 90, "raider": 70, "acolyte": 45, "warlock": 110, "shaman": 55, "mini": 300, "elite": 1300, "boss": 13000, "colossus": 20000};for(const k in HF)ET[k].hf=HF[k];}
const ESTAT={vet:[8,1.2,1],champ:[14,1.3,1],runner:[5,1,1],armored:[14,1.6,2],bat:[2,.8,1],harpy:[4,1,1],griffin:[8,1.2,1],norm:[5,1,1],fast:[3,.6,1],tank:[8,1.5,1],custodian:[2,1.2,1],mini:[10,1.2,1],elite:[18,1.4,2],boss:[35,1.5,3],colossus:[35,1.5,3],bob:[20,1.5,2],cub:[3,.6,1],greyw:[10,1.2,1],bigw:[18,1.4,2],momdrg:[18,1.4,2],sling:[3,.7,1],javelin:[12,2.2,1],raider:[0,1,1],acolyte:[5,1.2,1],warlock:[6,1.4,1],shaman:[3,1.2,1]};
for(const k in ESTAT)Object.assign(ET[k],{ud:ESTAT[k][0],ac:ESTAT[k][1],need:ESTAT[k][2],rg:'melee'});for(const k of['sling','javelin','acolyte','warlock','shaman'])ET[k].rg='ranged';
// XP que vale cada enemigo: se reparte entre los héroes según el daño que le hacen (proporción de su vida máxima).
const XPV={vet:5,champ:12,runner:4,armored:15,bat:1,harpy:5,griffin:14,norm:2,fast:1,tank:4,custodian:3,mini:12,elite:25,boss:60,colossus:150,bob:30,cub:1,greyw:12,bigw:25,momdrg:30,sling:2,javelin:3,raider:3,acolyte:3,warlock:5,shaman:4};for(const k in XPV)ET[k].xp=XPV[k];for(const k in ET)if(ET[k].xp===undefined)ET[k].xp=2;
// Niveles de torre: multiplicadores acumulados respecto a Nv 1 (cd = multiplicador del enfriamiento). Coste: Nv 2 = 60% del coste base, Nv 3 = 100%.
// Curva de potencia: el DPS se multiplica ~2,2× en Nv 2, ~3,8× en Nv 3 y ~5,5× en Nv 4 (antes de habilidades)
const L4D=3.2,L4H=2.7,LVMAX=3,LV={1:{dmg:1,cd:1,range:1,area:1,hp:1},2:{dmg:1.85,cd:.85,range:1.1,area:1.15,hp:1.6},3:{dmg:2.65,cd:.7,range:1.2,area:1.3,hp:2.2}};
// Coste de subir de nivel (múltiplo de 5): Nv 2 = 150% del coste base, Nv 3 = 210%, Nv 4 = 300%
const upCost0=(T,l)=>T.upc?T.upc[l]||0:Math.round(T.cost*(l===2?1.5:l===3?2.1:3)/5)*5,upCost=(T,l)=>{const v=upCost0(T,l);if(typeof S!=='undefined'&&S&&S.tut&&S.tut.freeUp)return 0;return typeof S!=='undefined'&&S&&S.relics&&S.relics.includes('hammer')&&S.rs.hammer&&S.rs.hammer.cd===0&&!T.upc?Math.ceil(v*.85/5)*5:v;},phKey=()=>S?S.round+':'+S.phase:'',undoOk=t=>!!t&&t.bph===phKey(),sellVal=t=>TW[t.type].uniq?0:undoOk(t)?(t.undo||0):Math.floor((t.inv||TW[t.type].cost)/2);
// Nv 4: especializaciones (multiplicadores respecto a Nv 1, igual que LV) y habilidades compradas con oro, con rangos.
const RAINP=.6,MAXPEN=25;
// Sangrado: daño elemental por casilla recorrida y stack. Jefes: reducen un 50% cualquier efecto de control. Elementos de los rayos del Prisma (se repartirán en orden).
const BLEEDT=5,BLEEDD=2,BOSSRES=.5,MINET=.5*K,ICEM=5,DEEPT=4;
const BURND=2,BURNK=.33,EZMAX=10,EZAMP=.05,ZAPR=1.2*K,STUNT=.5;
const ELEMS=[{k:'bleed',n:'Sangrado',col:'#e0485a'},{k:'poison',n:'Veneno',col:'#7bd34a'}];
const AB={
 chi:{n:'Chi interior',ranks:[{c:35,m:.4},{c:40,m:.6},{c:45,m:.8}],txt:r=>`El ${kw('mhit','golpe espiritual','')} de cada monje pasa a añadir un <span class="cmg">${Math.round(r.m*100)}%</span> de su daño como daño mágico.`},
 fists:{n:'Puños veloces',ranks:[{c:35,r:.15},{c:40,r:.25},{c:45,r:.35}],txt:r=>`Los monjes golpean con un <span class="cr">−${Math.round(r.r*100)}%</span> de enfriamiento.`},
 counter:{n:'Contraataque',ranks:[{c:40,p:.2},{c:50,p:.3}],txt:r=>`Cada golpe que recibe un monje tiene un <span class="cc">${Math.round(r.p*100)}%</span> de probabilidad de devolverlo al instante con un golpe propio.`},
 gourd:{n:'Trago de calabaza',ranks:[{c:35,h:.2},{c:40,h:.3},{c:45,h:.4}],txt:r=>`Cuando un monje baja del 50% de vida, bebe de su calabaza (como mucho una vez cada 8 s): se cura un <span class="chp">${Math.round(r.h*100)}%</span> de su vida máxima y queda ${kw('drunk','ebrio','')} 5 s.`},
 stagger:{n:'Tambaleo',ranks:[{c:40,p:.25},{c:50,p:.4}],txt:r=>`Mientras está ${kw('drunk','ebrio','')}, el monje esquiva un <span class="cc">${Math.round(r.p*100)}%</span> de los golpes.`},
 fireb:{n:'Llamarada etílica',ranks:[{c:40,m:1},{c:50,m:1.8}],txt:r=>`Al beber, el monje escupe un cono de alcohol en llamas (1,5 casillas) que aplica ${kw('burn','quemadura','')} a los enemigos de delante${r.m>1?' (más fuerte)':''}.`},
 rain:{n:'Lluvia de Flechas',ranks:[{c:40,cd:30,r:1.5,n:8},{c:45,cd:20,r:2,n:8}],txt:r=>`Cada <span class="cr">${r.cd} s</span>, si hay un objetivo, llueven ${r.n} flechas en un radio de <span class="ca">${f(r.r)} casillas</span> centrado en él. Cada flecha hace el ${Math.round(RAINP*100)}% del daño de la torre a un enemigo al azar dentro del radio.`},
 poison:{n:'Puntas envenenadas',ranks:[{c:30,p:.5},{c:35,p:.6},{c:40,p:.7}],txt:r=>`Cada golpe tiene un <span class="cc">${Math.round(r.p*100)}%</span> de aplicar 1 stack de veneno al enemigo.`},
 charged:{n:'Disparo cargado',ranks:[{c:55,cd:30,el:.2,boss:.1},{c:60,cd:30,el:.25,boss:.15}],txt:r=>`Cada <span class="cr">${r.cd} s</span> dispara al enemigo con más vida actual dentro del rango y lo mata de un golpe. Mini-élites y Élites pierden el ${Math.round(r.el*100)}% de su vida máxima y los Jefes el ${Math.round(r.boss*100)}%. Ignora la armadura.`},
 pierce:{n:'Balas penetrantes',ranks:[{c:30,r:2},{c:35,r:3},{c:40,r:4}],txt:r=>`Cuando un proyectil mata a un enemigo, el daño sobrante pasa al enemigo más cercano en un radio de <span class="ca">${r.r} casillas</span>, y puede encadenarse. Cada salto vuelve a pasar por la armadura.`},
 arsenal:{n:'Arsenal improvisado',ranks:[{c:40,tar:4,stk:.4,bee:.2},{c:50,tar:5,stk:.5,bee:.3}],txt:r=>`Cada disparo es al azar: <b>roca</b> (daño completo), <b>barril de brea</b> (60% del daño; deja un charco de <span class="cr">${f(r.tar)} s</span> que deja ${kw('sticky','pegajosos','')} a los enemigos, hasta un <span class="cc">${Math.round(r.stk*100)}%</span> de ralentización) o <b>colmena</b> (40% del daño; un enjambre pica 3 s a todos en 1,1 casillas: <span class="cd">${Math.round(r.bee*100)}%</span> del daño de la torre por segundo como daño físico, +50% a los enemigos ralentizados). La brea es ${kw('flam','inflamable','')}.`},
 debris:{n:'Restos del asedio',ranks:[{c:35,t:5,tar:2},{c:45,t:8,tar:3}],txt:r=>`Cada munición deja algo en el camino durante <span class="cr">${r.t} s</span>. <b>Roca</b>: cascotes que hacen tropezar (${kw('stun','aturden','')} ${f(RUBT)} s) al primer enemigo que los cruza. <b>Brea</b>: el charco dura <span class="cr">${r.tar} s</span> más. <b>Colmena</b>: un panal que suelta otro enjambre (2 s) cuando pasa un enemigo.`},
 breach:{n:'Rompemurallas',ranks:[{c:40,a:2,max:10},{c:50,a:3,max:15}],txt:r=>`Cada impacto de roca aplica ${kw('brk','armadura rota','')} a todos los alcanzados: <span class="cph">−${r.a}</span> de armadura durante ${BRKT} s, acumulable hasta <span class="cph">−${r.max}</span>.`},
 roll:{n:'Rodar',ranks:[{c:30,d:4},{c:40,d:5}],txt:r=>`La roca rueda <span class="ca">${r.d} casillas</span> en vez de 3.`},
 crush:{n:'Aplastar',ranks:[{c:35,s:.4},{c:45,s:.7}],txt:r=>`Los enemigos arrollados por una roca quedan ${kw('stun','aturdidos','')} <span class="cr">${f(r.s)} s</span>. Los jefes, la mitad.`},
 aval:{n:'Avalancha',ranks:[{c:50,cd:25,d:8,m:3},{c:60,cd:20,d:10,m:4}],txt:r=>`Cada <span class="cr">${r.cd} s</span>, si hay un objetivo, una roca gigante rueda <span class="ca">${r.d} casillas</span> desde él hacia los portales: hace <span class="cd">${r.m}×</span> el daño del disparo a todos los que arrolla y los ${kw('push','empuja','')} 0,5 casillas hacia atrás.`},
 bombard:{n:'Bombardeo incendiario',ranks:[{c:45,cd:30,r:1.5,n:4,b:4},{c:50,cd:20,r:2,n:6,b:7}],txt:r=>`Cada <span class="cr">${r.cd} s</span>, si hay un objetivo, caen ${r.n} bombas incendiarias en un radio de <span class="ca">${f(r.r)} casillas</span> centrado en él. Cada bomba hace el ${Math.round(RAINP*100)}% del daño del disparo, explota en un área pequeña (${Math.round(SPLASH*100)}% a los vecinos) y aplica <span class="cbu">${r.b} stacks</span> de ${kw('burn','quemadura','')} a todos los que alcanza.`},
 shock:{n:'Onda expansiva',ranks:[{c:35,k:.3},{c:40,k:.45},{c:45,k:.6}],txt:r=>`Las explosiones empujan hacia atrás por el camino a los enemigos alcanzados <span class="cg">${f(r.k)} ${r.k===1?'casilla':'casillas'}</span>. Los jefes se empujan la mitad (${kw('bres','resistencia de jefe','')}).`},
 mine:{n:'Mina',ranks:[{c:40,dm:3,r:1.2},{c:50,dm:4,r:1.6}],txt:r=>`La torre deja una mina en el camino, delante de su objetivo. Explota al acercarse un enemigo y hace <span class="cd">${r.dm}×</span> el daño del disparo a todos los que estén en <span class="ca">${f(r.r)} casillas</span>. Se rearma <span class="cr">15 s</span> después de explotar.`},
 shrap:{n:'Metralla',ranks:[{c:30,p:.2},{c:35,p:.3},{c:40,p:.4}],txt:r=>`Cada impacto tiene un <span class="cc">${Math.round(r.p*100)}%</span> de aplicar 1 stack de ${kw('bleed','sangrado','')}.`},
 frzh:{n:'Congelación',ranks:[{c:40,p:.1},{c:45,p:.15},{c:50,p:.2}],txt:r=>`Cada golpe tiene un <span class="cc">${Math.round(r.p*100)}%</span> de ${kw('freeze','congelar','')} al enemigo <span class="cr">1 s</span>.`},
 icicle:{n:'Témpanos',ranks:[{c:40,cd:25,r:1.5,a:.5,n:4},{c:45,cd:25,r:1.5,a:.5,n:6},{c:50,cd:25,r:1.5,a:.5,n:8}],txt:r=>`Cada <span class="cr">${r.cd} s</span>, si hay un objetivo, caen ${r.n} témpanos en un radio de <span class="ca">${f(r.r)} casillas</span> centrado en él. Cada uno hace el ${ICEM*100}% del daño del golpe (mágico) en un área de <span class="ca">${f(r.a)} casillas</span> y ${kw('slow','ralentiza','')} a los alcanzados.`},
 deep:{n:'Escarcha profunda',ranks:[{c:40,s:.55},{c:45,s:.6},{c:50,s:.65}],txt:r=>`La ${kw('slow','ralentización','')} del aura crece cuanto más tiempo lleva el enemigo dentro: del 50% al entrar hasta el <span class="cvl">${Math.round(r.s*100)}%</span> tras ${DEEPT} s.`},
 blizz:{n:'Ventisca',ranks:[{c:55,cd:30,d:2},{c:60,cd:25,d:3}],txt:r=>`Cada <span class="cr">${r.cd} s</span>, si hay enemigos en el aura, los ${kw('freeze','congela','')} a todos durante <span class="cr">${r.d} s</span>. Los jefes, la mitad.`},
 overl:{n:'Sobrecarga',ranks:[{c:50,g:.1,max:1},{c:55,g:.15,max:1}],txt:r=>`Mientras el rayo siga sobre el mismo enemigo, su daño sube un <span class="cd">${Math.round(r.g*100)}%</span> por segundo, hasta un máximo de +${Math.round(r.max*100)}%. Se reinicia al cambiar de objetivo.`},
 arcpen:{n:'Penetración arcana',ranks:[{c:35,pen:15},{c:40,pen:20},{c:45,pen:25}],txt:r=>`El rayo gana <span class="cmg">${r.pen}</span> de ${kw('penp','penetración mágica','')}.`},
 split:{n:'Divisor',ranks:[{c:45,n:2},{c:50,n:3},{c:55,n:4}],txt:r=>`El rayo se divide en <b>${r.n}</b> rayos, cada uno sobre un enemigo distinto. Los rayos reparten los elementos en orden (${ELEMS.map(e=>`<span style="color:${tcol(e.col)}">${e.n}</span>`).join(', ')}) y cada rayo aplica 1 stack de su elemento cada 1,5 s.`},
 trail:{n:'Estela',ranks:[{c:35,p:.2},{c:45,p:.35}],txt:r=>`Los enemigos que cruza cada rayo de camino a su objetivo reciben el <span class="cd">${Math.round(r.p*100)}%</span> de su daño, sin stacks elementales.`},
 plague:{n:'Plaga',ranks:[{c:45,p:.5},{c:50,p:1}],txt:r=>`Cuando muere un enemigo envenenado por esta torre, el <span class="cc">${Math.round(r.p*100)}%</span> de sus stacks pasa a los enemigos cercanos (2 casillas).`},
 corr:{n:'Corrosión',ranks:[{c:35,a:2,max:10},{c:40,a:3,max:15},{c:45,a:4,max:20}],txt:r=>`Cada segundo, por cada 5 stacks de veneno de esta torre que tenga el enemigo, recibe un golpe de ${kw('brk','armadura rota','')}: <span class="cph">−${r.a}</span> de armadura, acumulable hasta <span class="cph">−${r.max}</span>.`},
 ponz:{n:'Ponzoña',ranks:[{c:40,m:1.3},{c:50,m:1.6}],txt:r=>`Cada vez que esta torre aplica ${kw('poison','veneno','')}, pone <span class="cpo">${r.m} veces</span> los stacks.`},
 toxin:{n:'Toxina letal',ranks:[{c:35,cr:.1,el:.1},{c:40,cr:.15,el:.15},{c:45,cr:.2,el:.2}],txt:r=>`+<span class="cc">${Math.round(r.cr*100)}%</span> de probabilidad de crítico, y el veneno de esta torre hace más daño cuanta más vida tiene el objetivo: nada a los pequeños y hasta un +${Math.round(r.el*100)}% a élites y jefes.`},
 heal:{n:'Manos curativas',ranks:[{c:35,cd:10,p:.2},{c:40,cd:10,p:.3},{c:45,cd:10,p:.4}],txt:r=>`Cada <span class="cr">${r.cd} s</span>, cura a todos sus soldados un <span class="chp">${Math.round(r.p*100)}%</span> de su vida máxima.`},
 wall:{n:'Muro de escudos',ranks:[{c:40,red:.1},{c:50,red:.15},{c:60,red:.2}],txt:r=>`Los soldados reciben un <span class="chp">${Math.round(r.red*100)}%</span> menos de daño y cada uno tiene <b>corpulencia 2</b>: detiene solo a un enemigo grande, o a dos enemigos normales a la vez.`},
 dodge:{n:'Esquiva',ranks:[{c:35,p:.2},{c:40,p:.3},{c:45,p:.4}],txt:r=>`Cada golpe que reciben los soldados tiene un <span class="cc">${Math.round(r.p*100)}%</span> de ser esquivado.`},
 cut:{n:'Filo sangrante',ranks:[{c:30,p:.1},{c:35,p:.15},{c:40,p:.2}],txt:r=>`Cada golpe tiene un <span class="cc">${Math.round(r.p*100)}%</span> de aplicar 1 stack de ${kw('bleed','sangrado','')}. Además, cada golpe a un enemigo con sangrado le hace al instante el daño de todos sus stacks, aunque esté quieto.`},
 burst:{n:'Ráfaga',ranks:[{c:35,n:6,a:2},{c:45,n:5,a:3}],txt:r=>`Uno de cada <b>${r.n}</b> disparos lanza <b>${r.a} flechas</b> a la vez al mismo objetivo.`},
 mark:{n:'Marca de cazador',ranks:[{c:40,cr:.1},{c:50,cr:.2}],txt:r=>`Cada impacto deja al enemigo ${kw('mark','marcado','')} durante <span class="cr">4 s</span>: todas tus torres y unidades tienen un <span class="cc">+${Math.round(r.cr*100)}%</span> de probabilidad de ${kw('crit','crítico','')} contra él.`},
 cluster:{n:'Racimo',ranks:[{c:40,n:2},{c:45,n:2},{c:50,n:3}],txt:r=>`Al explotar, cada bomba suelta <b>${r.n}</b> bombas pequeñas a su alrededor (1 casilla), cada una con el <span class="cd">25%</span> del daño y un ${kw('area','área','')} de 0,5 casillas.`},
 hollow:{n:'Carga hueca',ranks:[{c:40,p:.01},{c:50,p:.015}],txt:r=>`El daño físico de esta torre (bombas, área y minas) aumenta un <span class="cd">+${f(r.p*100)}%</span> por cada punto de ${kw('aphys','armadura','')} del objetivo. Contra un enemigo sin armadura no cambia nada.`},
 shatter:{n:'Fragilidad',ranks:[{c:40,m:1.5},{c:45,m:2},{c:50,m:3}],txt:r=>`Cuando un enemigo ${kw('freeze','congelado','')} por esta torre se descongela, estalla en escarcha: hace daño ${kw('tmagic','mágico','')} de <span class="cd">×${f(r.m)}</span> el daño de un disparo a todos los enemigos a 1 casilla o menos.`},
 bite:{n:'Escarcha intensa',ranks:[{c:45,g:.1,max:.4,pct:1},{c:55,g:.16,max:.8,pct:1}],txt:r=>`El daño del aura a cada enemigo sube un <span class="cd">+${Math.round(r.g*100)}%</span> por cada segundo que lleva dentro, hasta un <span class="cd">+${Math.round(r.max*100)}%</span>. Vuelve a cero si sale del aura.`},
 conv:{n:'Convergencia',ranks:[{c:40,p:.25},{c:50,p:.5}],txt:r=>`Al matar a su objetivo, el rayo conserva el <span class="cd">${Math.round(r.p*100)}%</span> de la Sobrecarga acumulada para el siguiente enemigo, en vez de empezar de cero.`},
 refr:{n:'Refracción',ranks:[{c:40,p:.1},{c:50,p:.2}],txt:r=>`Cada rayo elemental tiene un <span class="cc">${Math.round(r.p*100)}%</span> de rebotar a otro enemigo a 2 casillas o menos, con el mismo daño y el mismo stack.`},
 flask:{n:'Matraz volátil',ranks:[{c:45,cd:20},{c:55,cd:15}],txt:r=>`Cada <span class="cr">${r.cd} s</span>, lanza un matraz a la zona de su rango con más enemigos y crea allí un charco extra de ${kw('poison','veneno','')} durante <span class="cr">4 s</span>.`},
 epid:{n:'Epidemia',ranks:[{c:40,p:.15},{c:45,p:.25},{c:50,p:.35}],txt:r=>`Cuando muere un enemigo envenenado por esta torre, explota y hace a los enemigos a 1,5 casillas o menos daño ${kw('telem','elemental','')} igual al <span class="cd">${Math.round(r.p*100)}%</span> del veneno que le quedaba.`},
 sacred:{n:'Aura sagrada',ranks:[{c:35,a:5},{c:45,a:10}],txt:r=>`Las unidades aliadas (soldados y héroe) a 2 casillas o menos de la bandera ganan <span class="cph">+${r.a}</span> de ${kw('aphys','armadura','')} y <span class="cmg">+${r.a}</span> de ${kw('umr','resistencia mágica','')}.`},
 back:{n:'Golpe por la espalda',ranks:[{c:40,m:2},{c:45,m:2.5},{c:50,m:3}],txt:r=>`El primer golpe de cada soldado a un enemigo nuevo hace <span class="cd">×${f(r.m)}</span> de daño.`},
 cond:{n:'Conductor',ranks:[{c:35,n:1},{c:40,n:3},{c:45,n:5}],txt:r=>`El rayo rebota <b>${r.n}</b> ${r.n===1?'vez':'veces'} más (${kw('chain','rebote','')}). Si no quedan enemigos nuevos a su alcance, rebota de vuelta a los que ya tocó.`},
 disch:{n:'Descarga',ranks:[{c:35,p:.1},{c:40,p:.15},{c:45,p:.2}],txt:r=>`Cada impacto tiene un <span class="cc">${Math.round(r.p*100)}%</span> de ${kw('stun','aturdir','')} al enemigo <span class="cr">${f(STUNT)} s</span>. Los jefes, la mitad.`},
 storm:{n:'Pararrayos',ranks:[{c:50,cd:8,m:5},{c:55,cd:6,m:5}],txt:r=>`Cada <span class="cr">${r.cd} s</span>, si hay un objetivo, cae un rayo sobre el enemigo con más vida dentro del rango. Hace <span class="cd">${r.m}×</span> el daño del disparo y también rebota.`},
 accum:{n:'Acumulador',ranks:[{c:35,n:2},{c:40,n:3},{c:45,n:4}],txt:r=>`Cada impacto aplica <b>${r.n}</b> stacks de ${kw('ez','electrizado','')} en vez de 1.`},
 short:{n:'Cortocircuito',ranks:[{c:45,m:3},{c:50,m:4}],txt:r=>`Cuando un enemigo llega a ${EZMAX} stacks de ${kw('ez','electrizado','')}, recibe un golpe extra de <span class="cd">${r.m}×</span> el daño del disparo y pierde todos sus stacks.`},
 reson:{n:'Resonancia',ranks:[{c:30,t:6},{c:35,t:8},{c:40,t:10}],txt:r=>`Los stacks de ${kw('ez','electrizado','')} duran <span class="cr">${r.t} s</span> en vez de 4 s.`},
 drench:{n:'Lluvia',ranks:[{c:40,m:.2},{c:50,m:.35}],txt:r=>`La nube llueve: los enemigos bajo ella quedan ${kw('wet','mojados','')} (${WETT} s). Reciben un <span class="cd">+${Math.round(r.m*100)}%</span> de daño eléctrico, quedan congelados más tiempo y se les apaga la ${kw('burn','quemadura','')}.`},
 cumulo:{n:'Cumulonimbo',ranks:[{c:45,r:.4}],txt:r=>`La nube es un <span class="ca">${Math.round(r.r*100)}%</span> más grande.`},
 hail:{n:'Granizo',ranks:[{c:40,p:.3},{c:50,p:.5}],txt:r=>`Cada segundo cae granizo sobre todos los enemigos bajo la nube: <span class="cph">${Math.round(r.p*100)}%</span> del daño de la torre como daño físico.`},
 wrath:{n:'Ira divina',ranks:[{c:50,p:.08},{c:60,p:.12}],txt:r=>`El rayo del juicio hace además un <span class="cd">${Math.round(r.p*100)}%</span> de la vida actual de su objetivo (los jefes, la mitad).`},
 fork:{n:'Rayo bifurcado',ranks:[{c:45,n:1},{c:55,n:2}],txt:r=>`El rayo del juicio se divide y cae también sobre ${r.n===1?'el enemigo más cercano':'los <b>'+r.n+'</b> enemigos más cercanos'} a su objetivo (2,5 casillas), con la mitad de daño.`},
 fulg:{n:'Fulgurita',ranks:[{c:40,t:4},{c:50,t:6}],txt:r=>`Donde cae el rayo del juicio, el suelo se vuelve cristal durante <span class="cr">${r.t} s</span>: cada segundo, los enemigos que lo pisan reciben daño eléctrico y 1 stack de ${kw('ez','electrizado','')}.`},
 hex:{n:'Maleficio',ranks:[{c:45,m:.15},{c:55,m:.25}],txt:r=>`Cada orbe deja ${kw('cursed','maldito','')} a su objetivo durante ${HEXT} s: recibe un <span class="cmg">+${Math.round(r.m*100)}%</span> de daño mágico de todas las fuentes.`},
 nova:{n:'Nova Arcana',ranks:[{c:45,ch:6,m:2,r:1.2},{c:55,ch:5,m:2.5,r:1.5}],txt:r=>`Cada <b>${r.ch}</b> orbes que impactan, el siguiente estalla en una nova: <span class="cmg">${r.m}×</span> el daño del orbe como daño mágico a todos en <span class="ca">${f(r.r)} casillas</span>.`},
 poly:{n:'Polimorfia',ranks:[{c:50,p:.1,d:3},{c:60,p:.15,d:4}],txt:r=>`Cada orbe tiene un <span class="cc">${Math.round(r.p*100)}%</span> de dejar ${kw('poly','transformado','')} (en rana) a su objetivo durante <span class="cr">${r.d} s</span>. Las élites, la mitad; los jefes son inmunes.`},
 raise:{n:'Alzar a los caídos',ranks:[{c:45,d:5,n:3},{c:55,d:7,n:5}],txt:r=>`Los enemigos que mata el orbe (salvo jefes) se alzan como ${kw('spect','espectros','')} durante <span class="cr">${r.d} s</span>, hasta <b>${r.n}</b> a la vez. Caminan hacia los portales y bloquean y golpean a los enemigos que encuentran.`},
 knight:{n:'Caballero Espectral',req:'raise',ranks:[{c:150,n:10,d:12}],txt:r=>`Cada <b>${r.n}</b> espectros alzados aparece un <b>Caballero Espectral</b> durante <span class="cr">${r.d} s</span>: mucho más resistente, bloquea por completo a todo lo que no sea jefe (a los jefes, en parte) y golpea en área. Al desvanecerse lanza un grito de ultratumba: los enemigos a 2 casillas quedan ${kw('fear','aterrados','')} ${f(FEART)} s.`},
 harvest:{n:'Cosecha de almas',ranks:[{c:40,max:.3},{c:50,max:.5}],txt:r=>`Cada enemigo que muere por el orbe o por sus espectros entrega su alma: <span class="cd">+1%</span> de daño del orbe y de los espectros durante el resto de la partida, hasta <span class="cd">+${Math.round(r.max*100)}%</span>.`},
 erupt:{n:'Erupción',ranks:[{c:45,b:6,r:1.5,cd:6},{c:55,b:9,r:2,cd:5}],txt:r=>`Mientras el Calor está lleno, cada <span class="cr">${r.cd} s</span> estalla un anillo de fuego alrededor de la torre: aplica <span class="cbu">${r.b} stacks</span> de ${kw('burn','quemadura','')} a todos los enemigos a <span class="ca">${f(r.r)} casillas</span> o menos. No gasta Calor.`},
 flare:{n:'Llamarada',ranks:[{c:35,g:.5},{c:45,g:1}],txt:r=>`Con el Calor alto, el cono también llega más lejos: hasta <span class="cg">+${f(r.g)} ${r.g===1?'casilla':'casillas'}</span> de alcance con el Calor lleno.`},
 embr:{n:'Brasas internas',ranks:[{c:40,k:.5}],txt:r=>`La salamandra se enfría <span class="cr">el doble de despacio</span> cuando no tiene objetivo, así que conserva el Calor entre grupos de enemigos.`},
 melt:{n:'Fundir',ranks:[{c:40,th:20,a:2,max:10},{c:50,th:15,a:3,max:15}],txt:r=>`Mientras su objetivo tenga <b>${r.th}</b> stacks de ${kw('burn','quemadura','')} o más, cada segundo le aplica ${kw('brk','armadura rota','')}: <span class="cph">−${r.a}</span> de armadura, acumulable hasta <span class="cph">−${r.max}</span>.`},
 blue:{n:'Llama azul',ranks:[{c:45,th:30,p:.25},{c:55,th:25,p:.4}],txt:r=>`Cuando su objetivo supera <b>${r.th}</b> stacks de ${kw('burn','quemadura','')}, la llama se vuelve azul y además le hace cada segundo un <span class="cmg">${Math.round(r.p*100)}%</span> del daño de su quemadura como daño mágico.`},
 sbite:{n:'Mordisco',ranks:[{c:40,cd:5,m:20},{c:50,cd:4,m:30}],txt:r=>`Cada <span class="cr">${r.cd} s</span>, la salamandra muerde al enemigo que está quemando: un golpe de daño físico igual a <span class="cph">${r.m}×</span> sus stacks por tick.`},
 napalm:{n:'Napalm',ranks:[{c:40,t:4},{c:45,t:5},{c:50,t:6}],txt:r=>`Los enemigos golpeados dejan en el camino un charco de fuego que dura <span class="cr">${r.t} s</span> y aplica 1 stack de ${kw('burn','quemadura','')} por segundo a quien lo pise.`},
 embers:{n:'Rescoldos',ranks:[{c:40,p:.25},{c:45,p:.35},{c:50,p:.5}],txt:r=>`Cuando muere un enemigo quemado por esta torre, el <span class="cc">${Math.round(r.p*100)}%</span> de sus stacks de ${kw('burn','quemadura','')} pasa a los 2 enemigos más cercanos (2 casillas).`},
 fuel:{n:'Combustible',ranks:[{c:35,d:.3},{c:40,d:.25},{c:45,d:.2}],txt:r=>`Los stacks de ${kw('burn','quemadura','')} de esta torre se reducen un <b>${Math.round(r.d*100)}%</b> por segundo en vez de un ${Math.round(BURNK*100)}%.`},
 focus:{n:'Foco',ranks:[{c:45,g:.05,max:.25},{c:50,g:.1,max:.35},{c:55,g:.15,max:.5}],txt:r=>`Mientras la llama siga sobre el mismo enemigo, sus stacks de ${kw('burn','quemadura','')} por tick suben un <span class="cbu">${Math.round(r.g*100)}%</span> por segundo, hasta un máximo de +${Math.round(r.max*100)}%. Se reinicia al cambiar de objetivo.`},
 deton:{n:'Detonación',ranks:[{c:45,th:50,r:1},{c:50,th:40,r:1.2},{c:55,th:30,r:1.5}],txt:r=>`Cuando un enemigo supera <b>${r.th}</b> stacks de ${kw('burn','quemadura','')}, explota: hace a todos en <span class="ca">${f(r.r)} casillas</span> la mitad del daño de 1 segundo de sus stacks (<span class="cd">${BURND}</span> por stack) y pierde la mitad de ellos.`},
 intens:{n:'Intensidad',ranks:[{c:35,p:.1},{c:40,p:.15},{c:45,p:.2}],txt:r=>`+<span class="cbu">${Math.round(r.p*100)}%</span> de stacks de ${kw('burn','quemadura','')} por tick.`},
 // ---- era 2 · Búnker ----
 trigger:{n:'Gatillo fácil',ranks:[{c:30,r:.5},{c:35,r:1},{c:40,r:1.5}],txt:r=>`La cadencia sube aún más mientras dispara: hasta <span class="cr">+${Math.round(r.r*100)}%</span> extra con el ${kw('mag','cargador','')} a punto de vaciarse.`},
 magz:{n:'Cargador ampliado',ranks:[{c:30,n:15},{c:35,n:30},{c:40,n:50}],txt:r=>`El ${kw('mag','cargador','')} tiene <b>+${r.n} balas</b>.`},
 expan:{n:'Balas expansivas',ranks:[{c:30,p:.1},{c:35,p:.15},{c:40,p:.2}],txt:r=>`Cada bala tiene un <span class="cc">${Math.round(r.p*100)}%</span> de aplicar 1 stack de ${kw('bleed','sangrado','')}.`},
 weak:{n:'Punto débil',ranks:[{c:35,m:.5},{c:40,m:1},{c:45,m:1.5}],txt:r=>`Los ${kw('crit','críticos','')} hacen <span class="cc">×${f(2+r.m)}</span> en vez de ×2.`},
 lmark:{n:'Marcador láser',ranks:[{c:40,v:2.5},{c:50,v:5}],txt:r=>`La torre apunta con un láser visible: su objetivo queda ${kw('lmk','fijado','')} y cada golpe de tus torres y unidades le hace <span class="cd">+${f(r.v)}</span> de daño plano. No se acumula.`},
 blink:{n:'Sin pestañear',ranks:[{c:45,p:1}],txt:r=>`Si un disparo mata a su objetivo, el siguiente disparo sale <b>al instante</b>.`},
 // ---- era 2 · Robots ----
 drill:{n:'¡Giga Taladro!',ranks:[{c:45,cd:20,d:4,m:2},{c:55,cd:15,d:6,m:2.5}],txt:r=>`Cada <span class="cr">${r.cd} s</span>, si hay enemigos, el mecha carga desde su bandera <span class="ca">${r.d} casillas</span> hacia los portales con un taladro que ocupa todo el carril: <span class="cd">${r.m}×</span> su daño a todo lo que atraviesa y los ${kw('push','empuja','')} media casilla.`},
 react:{n:'Blindaje reactivo',ranks:[{c:35,p:.25},{c:40,p:.4},{c:45,p:.55}],txt:r=>`Cada golpe que recibe un robot tiene un <span class="cc">${Math.round(r.p*100)}%</span> de rebotar: el robot recibe la mitad de daño y devuelve al atacante el <span class="cd">100%</span> de su propio daño.`},
 shoulder:{n:'Cañón de hombro',ranks:[{c:40,cd:6,m:2,r:.8},{c:50,cd:4,m:2.5,r:1}],txt:r=>`Cada <span class="cr">${r.cd} s</span>, el mecha dispara un misil al enemigo más fuerte a 3 casillas de su bandera: <span class="cd">${f(r.m)}×</span> su daño en un área de <span class="ca">${f(r.r)} casillas</span>.`},
 reens:{n:'Reensamblaje rápido',ranks:[{c:30,t:5},{c:35,t:3},{c:40,t:1.5}],txt:r=>`Los androides caídos se reensamblan en <span class="cr">${f(r.t)} s</span>.`},
 decoy:{n:'Señuelo',ranks:[{c:45,cd:15,r:2},{c:55,cd:10,r:2.5}],txt:r=>`Cada <span class="cr">${r.cd} s</span>, un androide pita 1,5 s: los enemigos a <span class="ca">${f(r.r)} casillas</span> se amontonan a su alrededor, y entonces explota con <span class="cd">doble</span> de daño.`},
 scrap:{n:'Chatarra volátil',ranks:[{c:35,n:3,m:.6},{c:45,n:4,m:.8}],txt:r=>`Al explotar, cada androide suelta <b>${r.n} piezas</b> que caen cerca y explotan un segundo después con el <span class="cd">${Math.round(r.m*100)}%</span> de su daño.`},
 // ---- era 2 · Nanitos ----
 infect:{n:'Infección',ranks:[{c:35,m:.15},{c:40,m:.2},{c:45,m:.25,sw:1}],txt:r=>`Los enemigos que toca el enjambre quedan ${kw('inf','infectados','')} 4 s: reciben un <span class="cd">+${Math.round(r.m*100)}%</span> de daño de todas las fuentes.${r.sw?' Además, el enjambre se divide en una <b>tercera nube</b>.':''}`},
 virus:{n:'Virus',req:'infect',ranks:[{c:40,r:1.5},{c:50,r:2.5}],txt:r=>`Cuando muere un enemigo ${kw('inf','infectado','')}, la infección salta a los enemigos a <span class="ca">${f(r.r)} casillas</span> o menos.`},
 reprog:{n:'Reprogramar',req:'infect',ranks:[{c:45,p:.3},{c:55,p:.5}],txt:r=>`Cada segundo, un enemigo ${kw('inf','infectado','')} tiene un <span class="cc">${Math.round(r.p*100)}%</span> de atacar al enemigo más cercano con el daño del enjambre. Si mata o muere, la infección pasa a otro enemigo cercano.`},
 hunger:{n:'Hambre voraz',ranks:[{c:35,g:.08,max:1.8},{c:40,g:.11,max:2.2},{c:45,g:.14,max:2.6}],txt:r=>`El enjambre crece un <span class="cd">${Math.round(r.g*100)}%</span> por enemigo devorado, hasta <span class="cd">×${f(r.max)}</span>.`},
 acid:{n:'Ácido nanométrico',ranks:[{c:35,a:2,max:10},{c:40,a:3,max:15},{c:45,a:4,max:20}],txt:r=>`Cada segundo, los enemigos dentro del enjambre sufren ${kw('brk','armadura rota','')}: <span class="cph">−${r.a}</span> de armadura y de resistencia mágica, acumulable hasta <span class="cph">−${r.max}</span>.`},
 bottom:{n:'Sin fondo',ranks:[{c:40,k:.5},{c:50,k:.75}],txt:r=>`Al empezar la oleada, el enjambre conserva el <span class="cd">${Math.round(r.k*100)}%</span> del crecimiento de la anterior.`},
 // ---- era 2 · Láser de arco ----
 fence:{n:'Valla eléctrica',ranks:[{c:35,m:3,s:.5},{c:40,m:5,s:.75}],txt:r=>`Los enemigos que cruzan un arco de la red reciben <span class="cd">${r.m}×</span> el daño de un tick y quedan ${kw('stun','aturdidos','')} <span class="cr">${f(r.s)} s</span>. Como mucho una vez cada 3 s por enemigo.`},
 shortc:{n:'Cortocircuito',ranks:[{c:40,p:.25},{c:50,p:.4}],txt:r=>`Cada golpe tiene un <span class="cc">${Math.round(r.p*100)}%</span> de saltar a otro enemigo que esté a 1,5 casillas de cualquier otra torre de la red, con el <span class="cd">60%</span> del daño.`},
 overload:{n:'Sobrecarga',ranks:[{c:45,cd:15,m:3},{c:55,cd:12,m:4}],txt:r=>`Cada <span class="cr">${r.cd} s</span>, toda la red descarga a la vez: <span class="cd">${r.m}×</span> el daño de un tick a todos los enemigos dentro del rango de cualquiera de sus torres.`},
 hv:{n:'Alto voltaje',ranks:[{c:35,n:.5},{c:40,n:1},{c:45,n:1.5}],txt:r=>`Cada tick del arco añade <b>${f(1+r.n)}</b> de ${kw('vc','carga','')} en vez de 1.`},
 ground:{n:'Toma de tierra',ranks:[{c:40,r:1,p:.35},{c:50,r:1.3,p:.5}],txt:r=>`La descarga hace también el <span class="cd">${Math.round(r.p*100)}%</span> de su daño a los enemigos a <span class="ca">${f(r.r)} casillas</span> del objetivo.`},
 jump:{n:'Arco saltarín',ranks:[{c:45,k:.35}],txt:r=>`Tras descargar, el arco salta solo al siguiente enemigo, que empieza con el <span class="cd">${Math.round(r.k*100)}%</span> de la ${kw('vc','carga','')}.`},
 // ---- Lanzallamas · Detonador ----
 overp:{n:'Sobrepresión',ranks:[{c:40,r:.3,m:.3},{c:50,r:.6,m:.6}],txt:r=>`La explosión es un <span class="ca">${Math.round(r.r*100)}%</span> más grande y hace un <span class="cd">+${Math.round(r.m*100)}%</span> de daño.`},
 chainr:{n:'Reacción en cadena',ranks:[{c:40,b:6},{c:50,b:10}],txt:r=>`La explosión deja <span class="cbu">${r.b} stacks</span> de ${kw('burn','quemadura','')} a los enemigos que alcanza. Además, un enemigo ${kw('poison','envenenado','')} explota al momento, sin esperar a los 30 stacks.`},
 tarb:{n:'Bidones de brea',ranks:[{c:45,cd:12,n:1},{c:55,cd:8,n:2}],txt:r=>`Cada <span class="cr">${r.cd} s</span> deja un bidón de brea en el camino, dentro de su alcance (hasta <b>${r.n}</b> a la vez). Al tocarlo un enemigo ardiendo, o el fuego, explota: <span class="cd">15×</span> el daño de un tick a 1 casilla y deja brea ardiendo.`},
 // ---- Lanzallamas · Muro de fuego ----
 morew:{n:'Más muros',ranks:[{c:40,n:1},{c:50,n:2}],txt:r=>`Mantiene <b>${1+r.n} franjas</b> de fuego a la vez, en puntos distintos del camino.`},
 densef:{n:'Combustible denso',ranks:[{c:35,t:2,m:.25},{c:45,t:4,m:.5}],txt:r=>`Las franjas duran <span class="cr">${r.t} s</span> más y meten un <span class="cbu">+${Math.round(r.m*100)}%</span> de stacks de ${kw('burn','quemadura','')}.`},
 ash:{n:'Humo y ceniza',ranks:[{c:35,s:.75,w:.25},{c:45,s:.6,w:.5}],txt:r=>`Dentro de una franja, los enemigos van un <span class="cvl">${Math.round((1-r.s)*100)}%</span> más lentos y atacan a tus unidades un <span class="cph">${Math.round(r.w*100)}%</span> más despacio.`},
 // ---- Chorro de ácido · Corrosión ----
 conc:{n:'Ácido concentrado',ranks:[{c:35,a:2,max:10},{c:40,a:3,max:15},{c:45,a:4,max:20}],txt:r=>`Cada golpe rompe <span class="cph">−${r.a}</span> de armadura (${kw('brk','armadura rota','')}), acumulable hasta <span class="cph">−${r.max}</span>, en vez de −1 hasta −5.`},
 pudd:{n:'Charcos',ranks:[{c:40,t:2},{c:50,t:3}],txt:r=>`Los enemigos que mata el veneno de esta torre se deshacen en un charco de ${kw('poison','veneno','')} que dura <span class="cr">${r.t} s</span>.`},
 sores:{n:'Llagas',ranks:[{c:40,p:.5},{c:50,p:1}],txt:r=>`Cuando un enemigo se queda sin armadura, cada golpe del chorro tiene un <span class="cc">${Math.round(r.p*100)}%</span> de aplicarle 1 stack de ${kw('bleed','sangrado','')}.`},
 // ---- Chorro de ácido · Nube viajera ----
 dfront:{n:'Doble frente',ranks:[{c:50,n:1}],txt:r=>`Suelta <b>2 nubes</b> a la vez. En los cruces, cada una se va por una rama distinta.`},
 slowadv:{n:'Avance lento',ranks:[{c:35,sp:.7,m:.5},{c:45,sp:.5,m:1}],txt:r=>`La nube avanza un <span class="cvl">${Math.round((1-r.sp)*100)}%</span> más despacio y mete un <span class="cpo">+${Math.round(r.m*100)}%</span> de stacks de ${kw('poison','veneno','')}.`},
 trailx:{n:'Estela tóxica',ranks:[{c:40,t:3},{c:50,t:5}],txt:r=>`La nube deja tras de sí un rastro de ${kw('poison','veneno','')} que dura <span class="cr">${r.t} s</span>. Además, si alcanza a un enemigo ${kw('burn','ardiendo','')}, estalla: daño de veneno igual a <span class="cd">10×</span> sus stacks a todos a 1 casilla.`},
 // ---- Torre sónica · Altavoces ----
 bass:{n:'Bajo profundo',ranks:[{c:45,cd:8,s:.6,m:2},{c:55,cd:6,s:.8,m:3}],txt:r=>`Cada <span class="cr">${r.cd} s</span>, si hay enemigos, lanza una onda grave: <span class="cd">${r.m}×</span> el daño y ${kw('stun','aturde','')} <span class="cr">${f(r.s)} s</span> a los que alcanza.`},
 seren:{n:'Serenata bélica',ranks:[{c:50,h:.05,r:1},{c:60,h:.1,r:1.5}],txt:r=>`Invoca a un <b>guitarrista rebelde</b> junto a la torre: sus acordes golpean en área (<span class="ca">${f(r.r)} casillas</span>, 50% del daño) y cada 2 s curan un <span class="chp">${Math.round(r.h*100)}%</span> a las unidades a 2 casillas. Si cae, vuelve a los 10 s.`},
 feedb:{n:'Acople',ranks:[{c:40,m:.15},{c:50,m:.25}],txt:r=>`Los enemigos ${kw('slow','ralentizados','')} dentro de su alcance reciben un <span class="cd">+${Math.round(r.m*100)}%</span> de daño de tus torres.`},
 // ---- Torre sónica · Gigante ----
 daze:{n:'Desorientación',ranks:[{c:45,t:.4,m:.5}],txt:r=>`Los enemigos empujados quedan ${kw('daze','desorientados','')}: se paran <span class="cr">${f(r.t)} s</span> y el siguiente golpe que reciben hace un <span class="cd">+${Math.round(r.m*100)}%</span>.`},
 echo:{n:'Eco',ranks:[{c:40,p:.75,p2:0},{c:50,p:.75,p2:.4}],txt:r=>`Al apagarse una onda, hay un <span class="cc">75%</span> de que suene una réplica con el <span class="cd">60%</span> del daño${r.p2?`, y esta a su vez un <span class="cc">40%</span> de que suene una tercera`:''}.`},
 swall:{n:'Muro de sonido',ranks:[{c:45,b:1.5}],txt:r=>`Las ondas ${kw('push','empujan','')} también a los voladores, y las élites y los jefes resisten menos el empuje (<span class="cg">×${f(r.b)}</span> antes de su resistencia).`},
 // ---- torres de bufo ----
 twin:{n:'Runas gemelas',ranks:[{c:40,n:1},{c:50,n:2}],txt:r=>`El altar lanza <b>${1+r.n} runas</b> a la vez.`},
 major:{n:'Runa mayor',ranks:[{c:40,m:.5,t:2},{c:50,m:1,t:4}],txt:r=>`Los bufos de las runas son un <span class="cd">${Math.round(r.m*100)}%</span> más fuertes y duran <span class="cr">${r.t} s</span> más.`},
 affin:{n:'Afinidad',ranks:[{c:35,p:.5}],txt:r=>`Puedes marcar una torre favorita (botón de bandera): recibe la <span class="cd">mitad</span> de todas las runas.`},
 fleet:{n:'Flota',ranks:[{c:40,n:1},{c:50,n:2}],txt:r=>`<b>${1+r.n} drones</b> en vez de 1.`},
 overclock:{n:'Overclock',ranks:[{c:45,t:5,m:2},{c:55,t:5,m:2.5}],txt:r=>`La torre que ajusta un dron dispara <span class="cr">×${f(r.m)}</span> más rápido durante <span class="cr">${r.t} s</span>. Con Overclock, el dron no se para: cuando ya ha dado todos los ajustes de crítico, sigue repartiendo Overclock (primero a las torres que están disparando).`},
 weld:{n:'Asistencia de campo',ranks:[{c:35,h:.05,sh:.1},{c:45,h:.1,sh:.2}],txt:r=>`Mientras vuela, el dron cura cada segundo un <span class="chp">${Math.round(r.h*100)}%</span> a las unidades a 1,5 casillas y les da un escudo del <span class="chp">${Math.round(r.sh*100)}%</span> de su vida.`},
 // ---- Senda rúnica (Altar de runas) ----
 cadena:{n:'Cadena rúnica',ranks:[{c:0,r:2}],txt:r=>`Cuando una runa se activa, se activan también las que estén a <span class="ca">${r.r} casillas</span> de ella.`},
 persist:{n:'Runa persistente',ranks:[{c:0,n:2}],txt:r=>`Cada runa aguanta <b>${r.n} activaciones</b> antes de gastarse.`},
 sello:{n:'Sello mayor',ranks:[{c:0,n:6,m:1.5}],txt:r=>`Cada <b>${r.n}</b> runas lanza un sello: ocupa todo el ancho del camino y 3 casillas de largo, con el efecto de la runa que toque un <span class="cd">${Math.round((r.m-1)*100)}%</span> más fuerte. No caduca: se activa cuando tiene 4 enemigos encima o cuando el primero va a salir de él.`},
 // ---- Dron petrolero (Dron de mantenimiento) ----
 mancha:{n:'Mancha de aceite',ranks:[{c:0,ar:.25,m:.15},{c:0,ar:.5,m:.3}],txt:r=>`Charcos de brea un <span class="ca">${Math.round(r.ar*100)}%</span> más grandes y que ralentizan un <span class="cc">${Math.round(r.m*100)}%</span> más.`},
 chispazo:{n:'Chispazo',ranks:[{c:0,cd:6,n:2},{c:0,cd:4,n:3}],txt:r=>`Cada <span class="cr">${r.cd} s</span>, el dron dispara a un enemigo que esté sobre uno de sus charcos: poco daño, pero las chispas saltan a todos los del charco, les ponen <b>${r.n}</b> stacks de ${kw('burn','quemadura','')} y prenden la brea.`},
 municion:{n:'Munición incendiaria',ranks:[{c:0,n:1}],txt:r=>`Las torres de la misma pieza que el dron, o pegadas a él, ponen <b>${r.n}</b> stack de ${kw('burn','quemadura','')} con cada disparo (como mucho, 2 por segundo cada torre).`},
 // ---- Cañón de riel (Cañoneros) ----
 perfor:{n:'Perforación total',ranks:[{c:0}],txt:r=>`El disparo ya no pierde daño al atravesar enemigos.`},
 recarga:{n:'Recarga en caliente',ranks:[{c:0,p:.05,max:.4}],txt:r=>`Por cada enemigo que mata un disparo, la siguiente carga es un <span class="cr">${Math.round(r.p*100)}%</span> más rápida (hasta un <span class="cr">${Math.round(r.max*100)}%</span>).`},
 estela:{n:'Estela iónica',ranks:[{c:0,t:3,p:.1}],txt:r=>`La línea del disparo queda electrificada <span class="cr">${r.t} s</span>: cada segundo hace un <span class="cd">${Math.round(r.p*100)}%</span> del daño del disparo como daño eléctrico y deja ${kw('ez','electrizados','')} a los enemigos que la pisan.`},
 // ---- Drones bombarderos (Cañoneros) ----
 escuad:{n:'Escuadrilla',ranks:[{c:0,n:1},{c:0,n:2}],txt:r=>`<b>${2+r.n} drones</b> en vez de 2.`},
 picado:{n:'Bombardeo en picado',ranks:[{c:0,cd:14,m:8},{c:0,cd:10,m:10}],txt:r=>`Cada <span class="cr">${r.cd} s</span>, un dron se lanza en picado contra el grupo de enemigos más grande y estalla: <span class="cd">${r.m}×</span> el daño de una bomba, con el doble de área. Alcanza también a los voladores. La torre reconstruye el dron en 5 s.`},
 metafil:{n:'Metralla afilada',ranks:[{c:0,n:1},{c:0,n:2},{c:0,n:3}],txt:r=>`Las bombas sueltan metralla: cada una aplica <b>${r.n}</b> ${r.n>1?'stacks':'stack'} de ${kw('bleed','sangrado','')} a los enemigos que alcanza.`}};
const SPECS={arrow:{
 rapid:{n:'Arqueros Raudos',ic:'🪶',col:'#f0c46a',lv:{dmg:L4D*1.15,cd:.7*.65,range:1.2,area:1.3,hp:L4H,pen:0},ab:['rain','poison','burst'],d:'Disparan mucho más rápido, a costa de algo de daño.'},
 xbow:{n:'Ballesteros',ic:'🎯',col:'#c9783a',lv:{dmg:L4D*2.8,cd:.7*1.4,range:1.2,area:1.3,hp:L4H,pen:15},ab:['charged','pierce','mark'],d:'Disparan más lento, pero con mucho más daño y penetración de armadura.'}},
cata:{
 treb:{n:'Trebuchet',ic:'🏯',col:'#b59a6a',lv:{dmg:L4D*1.9,cd:.7*1.45,range:1.2*1.3,area:1.3*1.2,hp:L4H,pen:0},ab:['arsenal','debris','breach'],d:'Alcance enorme y disparos muy lentos y potentes. Arma de asedio: lanza lo que tenga a mano.'},
 ogre:{n:'Ogros Lanzarrocas',ic:'👹',col:'#7e9a5a',lv:{dmg:L4D*.9,cd:.7*.75,range:1.2,area:1.3*.8,hp:L4H,pen:0},ab:['roll','crush','aval'],d:'Lanzan más a menudo. La roca rueda hacia los portales y golpea a cada enemigo (45% del daño). Si pasa por brea ardiendo, quema; si pasa por veneno, envenena.'}},
cannon:{
 rail:{n:'Cañón de riel',ic:'🔩',col:'#7ad8ff',lv:{dmg:L4D*3,cd:.7*2.2,range:1.2*1.35,area:1.3,hp:L4H,pen:20},rail:1,o:{splash:0,shape:'Línea',areaTxt:'Atraviesa a todos los enemigos de la línea de tiro.',fx:'Atraviesa'},ab:['perfor','recarga','estela'],d:'Carga lenta y mucho alcance. Dispara en línea recta por todo su alcance, en el ángulo que más enemigos atraviesa; pierde un 15% de daño por cada enemigo atravesado.'},
 bomb:{n:'Drones bombarderos',ic:'🛩️',col:'#e8a05a',lv:{dmg:L4D*.34,cd:.7*.75,range:1.2*1.25,area:1.3*.75,hp:L4H,pen:0},custom:1,notgt:1,o:{ground:1,fx:'Drones autónomos'},ab:['escuad','picado','metafil'],d:'La torre ya no dispara: 2 drones vuelan solos por su alcance y sueltan bombas pequeñas y rápidas. Cada dron va a una escuadra distinta, empezando por la más adelantada.'}},
frost:{
 hel:{n:'Hechicero Helado',ic:'🔮',col:'#8fb0ff',lv:{dmg:L4D*1.8,cd:.7,range:1.2,area:1.3,hp:L4H,pen:0},ab:['frzh','icicle','shatter'],d:'Proyectiles de hielo que pueden congelar, y témpanos que caen del cielo.'},
 vent:{n:'Guardián de la Ventisca',ic:'🌨️',col:'#9fe0ff',lv:{dmg:L4D*.42,cd:.7,range:1.2*1.3,area:1.3,hp:L4H,pen:0},aura:true,ab:['deep','blizz','bite'],d:'No dispara: emite un aura que ralentiza y daña poco a todos los enemigos dentro.'}},
augur:{
 lord:{n:'Señor de la Tormenta',ic:'☁️',col:'#9fc4e8',lv:{dmg:L4D*1.3,cd:.7,range:1.2*1.2,area:1.3,hp:L4H,pen:0},ab:['drench','cumulo','hail'],d:'Invoca una nube sobre su bandera (puedes moverla). Sus rayos caen al azar sobre los enemigos que pasan debajo.'},
 herald:{n:'Heraldo del Juicio',ic:'🌟',col:'#ffe58a',lv:{dmg:L4D*1.5,cd:.7,range:1.2*1.2,area:1.3,hp:L4H,pen:0},ab:['wrath','fork','fulg'],d:'No dispara: se carga con el tiempo y, más despacio, con cada muerte cercana. Lleno (8), lanza un rayo al enemigo con más vida: 6× su daño.'}},
orb:{
 foco:{n:'Foco Arcano',ic:'🌑',col:'#9d86ff',lv:{dmg:L4D*1.2,cd:.7,range:1.2,area:1.3,hp:L4H,pen:0},ab:['hex','nova','poly'],d:'Orbes que maldicen: debilitan frente a la magia, cargan novas y pueden convertir a los enemigos en ranas.'},
 reap:{n:'Segador de Almas',ic:'🪦',col:'#9fb4d8',lv:{dmg:L4D*1.0,cd:.7,range:1.2,area:1.3,hp:L4H,pen:0},ab:['raise','knight','harvest'],d:'Orbes más débiles: los enemigos que matan se alzan como espectros aliados.'}},
laser:{
 red:{n:'Red eléctrica',ic:'🔗',col:'#9fe8ff',lv:{dmg:L4D*1.0,cd:.7,range:1.2,area:1.3,hp:L4H,pen:0},o:{net:1},ab:['fence','shortc','overload'],d:'Se une con un arco a las demás Redes eléctricas que estén dentro de su alcance: cada torre conectada da +15% de daño a todas. Los enemigos que cruzan un arco sufren.'},
 volt:{n:'Arco voltaico',ic:'⚡',col:'#fff08a',lv:{dmg:L4D*1.1,cd:.7,range:1.2,area:1.3,hp:L4H,pen:0},o:{volt:1},ab:['hv','ground','jump'],d:'El arco carga de electricidad a su objetivo; con la carga llena, descarga: un golpe de 15× y lo aturde.'}},
bunker:{
 sup:{n:'Supresión',ic:'🔩',col:'#c9b06a',lv:{dmg:L4D*1.2,cd:.7*.8,range:1.2,area:1.3,hp:L4H,pen:0},o:{mag:45,ramp:1.2},ab:['trigger','magz','expan'],d:'Cargadores de 45 balas y la cadencia sube mucho más mientras dispara. Pensada para hordas.'},
 nido:{n:'Nido de francotirador',ic:'🔭',col:'#8fb0a0',lv:{dmg:L4D*10,cd:.7*5,range:1.2*2.2,area:1.3,hp:L4H,pen:20},o:{mag:0,ps:60},ab:['weak','lmark','blink'],d:'Alcance enorme y disparos lentos y muy potentes con penetración. Para élites y jefes.'}},
robots:{
 mecha:{n:'Mechas',ic:'🦾',col:'#e0884a',lv:{dmg:L4D*1.2,cd:.7,range:1.2,area:1.3,hp:L4H*1.5,pen:0},o:{mecha:1},ab:['drill','react','shoulder'],d:'Uno de los robots se transforma en un mecha élite: mucha más vida, corpulencia 2 y golpes en área. Los otros dos le apoyan.'},
 kami:{n:'Androides kamikaze',ic:'💥',col:'#ff6a5a',lv:{dmg:L4D*.8,cd:.7,range:1.2,area:1.3,hp:L4H*.5,pen:0},o:{kami:1},uspd:1.5,ab:['reens','decoy','scrap'],d:'4 androides rápidos y frágiles. Al caer explotan (3× su daño en 1 casilla) y la torre los reensambla enseguida.'}},
nano:{
 hack:{n:'Hackeo',ic:'🧬',col:'#9fe0ff',lv:{dmg:L4D*.75,cd:.7,range:1.2,area:1.3,hp:L4H,pen:0},o:{nsw:2},ab:['infect','virus','reprog'],d:'El enjambre se divide en 2 nubes que van a enemigos distintos. Infecta a los enemigos para que reciban más daño.'},
 devour:{n:'Enjambre devorador',ic:'🕳️',col:'#b0b8ff',lv:{dmg:L4D*1.1,cd:.7,range:1.2,area:1.3,hp:L4H,pen:0},o:{nsw:1,grow:1},ab:['hunger','acid','bottom'],d:'Una sola nube que crece con cada enemigo que devora durante la oleada: más daño y más grande. Al acabar la oleada vuelve a su tamaño.'}},
altar:{
 altar:{n:'Altar mayor',ic:'🪬',col:'#c89aff',lv:{dmg:1,cd:1,range:1.3,area:1.3,hp:1,pen:0},ab:['twin','major','affin'],d:'Más alcance. Sus runas llegan más lejos y se pueden mejorar.'},
 senda:{n:'Senda rúnica',ic:'🔮',col:'#b07aff',lv:{dmg:1,cd:1,range:1.3,area:1.3,hp:1,pen:0},senda:1,notgt:1,o:{dmg:60,rate:1/3,ground:1,fx:'Runas trampa en el camino'},ab:['cadena','persist','sello'],d:'Deja de bufar a las torres: lanza runas al camino, que se quedan en el suelo hasta que un enemigo las pisa. Rotan tres tipos: explosiva, atadura y quebranto.'}},
dron:{
 dron:{n:'Helipuerto',ic:'🛸',col:'#e8b04a',lv:{dmg:1,cd:1,range:1.3,area:1.3,hp:1,pen:0},ab:['fleet','overclock','weld'],d:'Más alcance. Los drones se pueden mejorar.'},
 petro:{n:'Dron petrolero',ic:'🛢️',col:'#8a6a3a',lv:{dmg:1,cd:1,range:1.3,area:1.3,hp:1,pen:0},petro:1,notgt:1,o:{dmg:3,rate:1,ground:1,dt:'phys',fx:'Charcos de brea'},ab:['mancha','chispazo','municion'],d:'Deja de ajustar torres: el dron recorre el camino dentro de su alcance soltando charcos de brea, que hacen poco daño, dejan pegajosos a los enemigos y arden si les llega fuego.'}},
poison:{
 alch:{n:'Alquimista',ic:'⚗️',col:'#58c9a0',lv:{dmg:L4D*1.4,cd:.7,range:1.2,area:1.3*1.3,hp:L4H,pen:0},ab:['plague','corr','flask'],d:'Charcos más grandes y más stacks. El veneno se contagia y corroe la armadura.'},
 pest:{n:'Pestilencia',ic:'🦠',col:'#a7d12a',lv:{dmg:L4D*1.0,cd:.7,range:1.2,area:1.3*.85,hp:L4H,pen:0},ab:['ponz','toxin','epid'],d:'Charcos más pequeños pero con veneno mucho más potente.'}},
monk:{
 fist:{n:'Monjes de Batalla',ic:'🥋',col:'#e07a3a',lv:{dmg:L4D*1.25,cd:.7,range:1.2,area:1.3,hp:L4H*1.1,pen:0},uspd:1.125,ab:['chi','fists','counter'],d:'Monjes élficos que pelean con más daño y más daño mágico. Siguen curando al grupo.'},
 drunk:{n:'Maestros Ebrios',ic:'🍶',col:'#b07ad0',lv:{dmg:L4D*1.3,cd:.7,range:1.2,area:1.3,hp:L4H*1.4,pen:0},o:{noheal:1},uspd:.75,ab:['gourd','stagger','fireb'],d:'Beben de su calabaza: se curan solos, esquivan y escupen fuego. Ya no curan al grupo.'}},
bastion:{
 pal:{n:'Paladines',ic:'⚜️',col:'#f0d36a',lv:{dmg:L4D*.7,cd:.7,range:1.2,area:1.3,hp:L4H*1.6,pen:0},uap:15,uspd:.8,ab:['heal','wall','sacred'],d:'Soldados con más vida y armadura y menos daño. Se curan y bloquean mejor.'},
 ass:{n:'Asesinos',ic:'🗡️',col:'#9a4bd6',lv:{dmg:L4D*1.6,cd:.7*.6,range:1.2,area:1.3,hp:L4H*.6,pen:0},uspd:1.5,ab:['dodge','cut','back'],d:'Soldados rápidos y frágiles que golpean mucho. Esquivan y provocan sangrado.'}},
tesla:{
 cad:{n:'Cadena',ic:'🔗',col:'#fff08a',lv:{dmg:L4D*1.4,cd:.7,range:1.2,area:1.3,hp:L4H,pen:0},o:{chain:{n:5,f:.8}},ab:['cond','disch','storm'],d:'El rayo salta hasta 5 veces entre enemigos, con un 20% menos de daño por salto. Pensada para hordas.'},
 ele:{n:'Electrocutor',ic:'🔌',col:'#e8c21f',lv:{dmg:L4D*2.3,cd:.7,range:1.2,area:1.3,hp:L4H,pen:0},o:{chain:null,ez:1},ab:['accum','short','reson'],d:'Sin rebotes: golpea a un solo enemigo y lo electriza (+5% de daño eléctrico por stack, máx. 10). Para élites y jefes.'}},
sala:{
 volc:{n:'Corazón Volcánico',ic:'❤️‍🔥',col:'#ff6a2e',lv:{dmg:L4D*.75,cd:.7,range:1.2,area:1.3,hp:L4H,pen:0},ab:['erupt','flare','embr'],d:'Acumula Calor mientras dispara (lleno en 8 s): el cono se abre hasta 110° y aplica hasta un 50% más de stacks. Sin objetivo, se enfría.'},
 forge:{n:'Aliento de Forja',ic:'🫠',col:'#ffb347',lv:{dmg:L4D*5.3,cd:.7,range:1.2*1.3,area:1.3,hp:L4H,pen:0},o:{cone:0,shape:'Línea',areaTxt:'Solo afecta al enemigo objetivo.'},ab:['melt','blue','sbite'],d:'Llama estrecha que funde el metal, sobre un solo enemigo. Para élites, jefes y enemigos con armadura.'}},
flame:{
 detn:{n:'Detonador',ic:'🎆',col:'#ff8a3c',lv:{dmg:L4D*1.1,cd:.7,range:1.2,area:1.3,hp:L4H,pen:0},ab:['overp','chainr','tarb'],d:'Cuando un enemigo acumula 30 stacks de quemadura de esta torre, explota: pierde la mitad de sus stacks y hace daño en área (1 casilla).'},
 muro:{n:'Muro de fuego',ic:'🌋',col:'#ff5f3a',lv:{dmg:L4D*1.25,cd:.7,range:1.2*1.2,area:1.3,hp:L4H,pen:0},o:{cone:0,fwall:1,shape:'Franja',areaTxt:'La franja ocupa toda la anchura del camino.'},ab:['morew','densef','ash'],d:'Ya no lanza llamas: enciende una franja de fuego en el camino, delante de su objetivo, que quema durante 4 s a todo el que la cruza.'}},
acid:{
 corr:{n:'Corrosión',ic:'🧫',col:'#7fd34a',lv:{dmg:L4D*1.2,cd:.7,range:1.2,area:1.3,hp:L4H,pen:0},ab:['conc','pudd','sores'],d:'Chorro más concentrado: más veneno y más armadura rota por golpe. Lo que mata se deshace en charcos.'},
 cloud:{n:'Nube viajera',ic:'🌫️',col:'#b8e07a',lv:{dmg:L4D*.9,cd:.7,range:1.2*1.1,area:1.3,hp:L4H,pen:0},o:{tcloud:1,shape:'Nube',areaTxt:'Envenena a todos los enemigos que atraviesa, también a los voladores.'},ab:['dfront','slowadv','trailx'],d:'Ya no dispara: cada 6 s suelta una nube tóxica en el camino que avanza contra corriente hacia los portales (6 casillas) envenenando a todo lo que atraviesa.'}},
sonic:{
 spk:{n:'Rave de la Resistencia',ic:'📢',col:'#ff9ae0',lv:{dmg:L4D*.8,cd:.7,range:1.2,area:1.3,hp:L4H,pen:0},o:{spk:1},ab:['bass','seren','feedb'],d:'Sus ondas ralentizan un 30% (2 s) a los enemigos y animan a tus unidades y a tu héroe dentro de su alcance: +20% de daño.'},
 giant:{n:'Torre sónica gigante',ic:'📣',col:'#ff6ad0',lv:{dmg:L4D*1.1,cd:.7,range:1.2*1.15,area:1.3,hp:L4H,pen:0},o:{giant:1},ab:['daze','echo','swall'],d:'Ondas más potentes que empujan más lejos (casi media casilla). Pueden desorientar, repetirse como un eco y formar un muro de sonido.'}}};
// Precios de habilidades de Nv 4: el primer rango (desbloquear) es el caro; las de un solo rango, más caras aún
{const r5=v=>Math.round(v/5)*5;for(const k in SPECS){const b=TW[k]&&TW[k].cost;if(!b)continue;for(const sp of Object.values(SPECS[k]))for(const a of sp.ab){const R=AB[a]&&AB[a].ranks;if(!R)continue;R.forEach((r,i)=>{r.c=R.length===1?r5(b*4.2):i===0?r5(b*2.8):r5(b*1.9);});}}}
const GLV=[['1','Nv 1'],['2','Nv 2'],['3','Nv 3'],['4a','Nv 4 · A'],['4b','Nv 4 · B']];
// Estado de una torre en el compendio para un botón global: 1-3 = nivel; 4a/4b = primera/segunda especialización (si no tiene, se queda en su nivel máximo)
const glState=(k,v)=>v==='4a'?(SPECS[k]?4:3):v==='4b'?(SPECS[k]&&Object.keys(SPECS[k]).length>1?5:3):+v;
const MAXL=t=>SPECS[t.type]?4:3,nStates=id=>3+(SPECS[id]?Object.keys(SPECS[id]).length:0);
const cpState=id=>{let n=CP.lv[id]||1;if(typeof tlvOk==='function'&&!tlvOk(id,n))n=1;return n<=3?{lv:n,spec:null}:{lv:4,spec:Object.keys(SPECS[id])[n-4]};};
const lvMods=(type,lv,spec)=>lv>=4&&TW[type].uniq?{dmg:1.8*1.2,cd:.7,range:1.2,area:1.3,hp:1.8*1.25,pen:0}:lv>=4&&spec?SPECS[type][spec].lv:{...(LV[lv]||LV[1]),pen:0};
const twm=(k,sp)=>{const T=TW[k];if(!sp)return T;const X=SPECS[k][sp];return{...T,...(X.dt?{dt:X.dt}:{}),...(X.o||{})};};
const DRAG=[{n:'Huevo de dragón',ic:'🥚',col:'#d9c9a8'},{n:'Dragón bebé',ic:'🐲',col:'#d0603a'},{n:'Dragón adulto',ic:'🐉',col:'#b8402a'},{n:'Dragón anciano',ic:'👑',col:'#8a2a1a'}];
const DRGAT=[0,3,6,10],DRGST=r=>r>=10?3:r>=6?2:r>=3?1:0,DBRCD=8,DBRN=8;
const PIGU={brick:{n:'Cerdito albañil',ic:'🐖',col:'#c0563a',hp:290,ap:40,dmg:6,rate:1,spd:1.5,d:'Pelea cuerpo a cuerpo. Hace poco daño, pero tiene mucha vida y armadura.'},
 wood:{n:'Cerdito leñador',ic:'🐗',col:'#a8743a',hp:200,ap:20,dmg:14,rate:.9,push:.6,spd:1.9,d:'Cuerpo a cuerpo con hacha: más daño que el albañil, y cada 3 golpes empuja al enemigo.'},
 straw:{n:'Cerdito espantapájaros',ic:'🐽',col:'#e8cf6a',hp:120,ap:0,dmg:10,rate:1,rng:1,range:3,spd:2.2,slow:.3,slowt:2,d:'Lanza paja desde lejos: daña en un área pequeña y ralentiza un 30%. Si le alcanzan, bloquea y pega a mitad de daño.'},
 mech:{n:'Mecha Cerdito',ic:'🤖',col:'#d08a5a',hp:700,ap:50,dmg:20,rate:.8,st:30,spd:1.4}};
const tinfo=t=>t.tinf?t.tinf:t.type==='omega'&&typeof omegaT==='function'?omegaT(t):t.pigU?{...TW.bastion,...PIGU[t.pigU]}:t.beast?{...TW.bastion,...(BEASTS[t.beast]||SPECT[t.beast])}:t.hero?t.hero.def:TW[t.type]&&TW[t.type].dragon?{...TW[t.type],...DRAG[t.stage||0]}:t.spec?SPECS[t.type][t.spec]:TW[t.type];
