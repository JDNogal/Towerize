// ==================== v301 · EVENTOS DE LA ERA 2 ====================
// Cápsula caída, Laboratorio de la Forja, Señal de socorro, Cámara criogénica y Proyecto Omega (el primero por fases).
// Las partidas de la Era Distópica solo traen estos; la Fantástica, los suyos. Ninguna opción da «nada».
// ---- eventos por fases: una opción con «next» abre otro evento al pulsar Continuar ----
{const _c=chooseEvent;chooseEvent=function(i){const id=RL.ev,E=EVENTS[id],o=E&&E.opts[i];const ok=o&&!(o.req&&o.req());const r=_c.apply(this,arguments);if(ok&&o.next)RL.evNext=o.next;return r;};}
{const _c=closeEvent;closeEvent=function(){if(RL.evNext){const n=RL.evNext;RL.evNext=null;if(EVENTS[n]){openEvent(n,EVK);return;}}return _c.apply(this,arguments);};}
{const _c=chip;chip=function(k){const[a,b]=k.split(':');
 if(a==='ally')return '👽 una criatura alienígena lucha contigo toda la partida';if(a==='hero')return HEROES[b]?`<span class="cf">🦸 héroe nuevo: ${HEROES[b].n}</span>`:'';
 if(a==='vch')return VCH[b]?`<span class="gd">${VCH[b].ic} ${VCH[b].n}</span>`:'';if(a==='squad')return '💂 2 soldados contigo toda la partida';
 if(a==='recharge')return '⚡ todas tus reliquias se recargan';if(a==='bank')return `<span class="gd">🏦 +${b} 🪙 dentro de 3 rondas</span>`;if(a==='next')return '🚪 entras en el hangar';
 return _c.apply(this,arguments);};}
const ev2Relic=(id,alt)=>{if(S.relics.includes(id)){goldEv(alt||100);return['gold:'+(alt||100)];}gainRelic(id);return['relic:'+id];};
const ev2Real=()=>!S.tut&&!S.pvE&&!S.pvH;
Object.assign(EVENTS,{
 capsule:{n:'Cápsula caída',ic:'☄️',era:2,txt:'Una cápsula orgánica humea en un cráter reciente. Algo respira dentro, despacio. No lleva los colores de la colmena.',opts:[
  {l:'Abrirla',run:()=>{mkAlly();S.allyOn=1;const k=['ally'];if(ev2Real()&&!h2Has('korr')){h2Unlock('korr','Has abierto una cápsula caída');k.push('hero:korr');}return k;}},
  {l:'Entregársela a la Resistencia',run:()=>{goldEv(150);return['gold:150'];}},
  {l:'Tomar una muestra',c:'Pierdes 2 de vida (lo de dentro se defiende)',req:()=>S.hp<3?'Necesitas al menos 3 de vida':'',run:()=>{hpLoss(2);return['hp:-2'].concat(ev2Relic('sample'));}}]},
 lab:{n:'Laboratorio de la Forja',ic:'⚗️',era:2,txt:'Un laboratorio a medio derrumbar. En las mesas, robots abiertos en canal; en el centro, un prototipo con forma de pistola y un reactor que aún zumba.',opts:[
  {l:'Llevarte el prototipo',c:'La próxima oleada trae una Élite extra (la seguridad del laboratorio te sigue)',run:()=>{addNow('elite',1);return ev2Relic('repro').concat(['elite']);}},
  {l:'Saquear los suministros',run:()=>{giveVch('up',1);return['vch:up'];}},
  {l:'Activar el reactor',c:'Puede salir muy bien o muy mal',req:()=>S.hp<4?'Necesitas al menos 4 de vida':'',run:()=>{if(Math.random()<.5){goldEv(200);return['gold:200'];}hpLoss(3);return['hp:-3'];}}]},
 sos:{n:'Señal de socorro',ic:'🆘',era:2,txt:'Una patrulla de la Resistencia lleva días escondida en un sótano. Han sobrevivido gracias a un aparato que confunde a las escuadras enemigas. «¿Nos sacáis de aquí?»',opts:[
  {l:'Rescatarlos',c:'Pagas 100 🪙',req:()=>S.gold<100?'Necesitas 100 🪙':'',run:()=>{S.gold-=100;S.resc=1;return['squad'];}},
  {l:'Quedarte su equipo',c:'La próxima oleada trae una Élite extra (los que los buscaban vienen a por ti)',run:()=>{addNow('elite',1);return ev2Relic('jammer').concat(['elite']);}},
  {l:'Darles tu radio de repuesto',run:()=>{for(const id of S.relics){S.rs[id].cd=0;}renderRelics();return['recharge'];}}]},
 cryocam:{n:'Cámara criogénica',ic:'🥶',era:2,txt:'Bajo los escombros, una cámara criogénica sigue encendida. Dentro duerme alguien con uniforme de antes del cataclismo. El refrigerante gotea, azul y helado.',opts:[
  {l:'Despertar al superviviente',c:'Pagas 120 🪙 (la energía para descongelarlo)',req:()=>!S.hero||S.hero.lvl>=HLMAX?'Tu héroe ya está al nivel máximo':S.gold<120?'Necesitas 120 🪙':'',run:()=>{S.gold-=120;heroUp();return['lvl'];}},
  {l:'Quedarte el refrigerante',c:'Pierdes 2 de vida (quemaduras por frío)',req:()=>S.hp<3?'Necesitas al menos 3 de vida':'',run:()=>{hpLoss(2);return['hp:-2'].concat(ev2Relic('cryo'));}},
  {l:'Hibernar tus reservas',c:'Guardas hasta 150 🪙 en la cámara: los recuperas doblados dentro de 3 rondas',req:()=>S.gold<10?'Necesitas al menos 10 🪙':'',run:()=>{const g=Math.min(150,Math.floor(S.gold/5)*5);S.gold-=g;S.bank={g:g*2,at:S.round+3};return['gold:-'+g,'bank:'+g*2];}}]},
 omega:{n:'Proyecto Omega',ic:'Ω',era:2,txt:'Un hangar sellado de la Forja. Junto a la puerta, una terminal parpadea: «PROYECTO OMEGA — FASE DE ASIMILACIÓN». Dentro se adivina una plataforma con algo a medio montar.',opts:[
  {l:'Forzar la entrada',c:'Pagas 100 🪙',req:()=>S.gold<100?'Necesitas 100 🪙':'',next:'omega2',run:()=>{S.gold-=100;return['next'];}},
  {l:'Vender las coordenadas a la Resistencia',run:()=>{goldEv(120);return['gold:120'];}},
  {l:'Descargar los registros de la terminal',c:'Salta la alarma: la próxima oleada trae una Élite extra',run:()=>{addNow('elite',1);giveVch('ab',1);return['vch:ab','elite'];}}]},
 omega2:{n:'Proyecto Omega · El prototipo',ic:'Ω',era:2,sub:1,txt:'Sobre la plataforma descansa un prototipo inacabado, lleno de huecos vacíos, con un núcleo apagado en el centro. Los sistemas de seguridad siguen vivos.',opts:[
  {l:'Activar el prototipo',c:'Pierdes 4 de vida (descarga del sistema de seguridad)',req:()=>S.hp<5?'Necesitas al menos 5 de vida':!uSpots(EVK).length?'No queda ningún solar libre en esta pieza':S.list.some(t=>t.type==='omega')?'Ya tienes un Prototipo Omega':'',run:()=>{hpLoss(4);S.uq.push({type:'omega',bk:EVK});return['hp:-4','tower:omega'];}},
  {l:'Extraer su núcleo',c:'Pierdes 2 de vida',req:()=>S.hp<3?'Necesitas al menos 3 de vida':'',run:()=>{hpLoss(2);return['hp:-2'].concat(ev2Relic('core2'));}},
  {l:'Llevarte los planos',c:'La próxima oleada trae un 20% más de enemigos',run:()=>{moreEnemies(.2);giveVch('up',1);return['vch:up','more:20'];}}]}});
Object.assign(EVRES,{
 capsule:['La cápsula se abre con un chasquido húmedo. La criatura te olfatea, enseña los colmillos… y se coloca a tu lado, mirando hacia los portales.',
  'La Resistencia se la lleva en una caja reforzada. «Mejor nosotros que la Forja», dicen, y te pagan bien.',
  'Consigues un trozo de tejido antes de que la cápsula se cierre de golpe sobre tu brazo. Lo que te has llevado sigue vivo, y crece.'],
 lab:['Coges la pistola del soporte. Una luz roja empieza a girar en el techo: algo acaba de despertarse en el piso de abajo.',
  'Entre cajas reventadas encuentras un cartucho de datos intacto. Alguien iba a mejorar algo con esto.',
  k=>k[0]&&k[0].startsWith('gold')?'El reactor tose, se estabiliza y escupe un lingote de aleación pura. Vale una fortuna.':'El reactor tose… y te lanza contra la pared. Sales tosiendo humo, con menos cejas que antes.'],
 sos:['Los sacas uno a uno entre los escombros. No hacen preguntas: recargan y ocupan posiciones junto al núcleo.',
  'Les quitas el aparato «para estudiarlo». En cuanto lo apagas, algo grande cambia de rumbo hacia ti.',
  'Les das tu radio de repuesto y, a cambio, te pasan todas sus baterías. Tus reliquias vuelven a zumbar.'],
 cryocam:['La cámara silba y se abre. El superviviente parpadea, mira a tu héroe y le enseña un par de trucos de antes del cataclismo.',
  'Vacías el depósito en un bidón. Se te quedan los dedos azules, pero el refrigerante es tuyo.',
  'Metes el oro dentro y sellas la puerta. Nadie va a tocarlo ahí: ni tú, durante tres rondas.'],
 omega:['La puerta cede con un chirrido. Dentro, las luces se encienden de una en una.',
  'La Resistencia apunta las coordenadas y te paga sin regatear. «Ya mandaremos a alguien.»',
  'La terminal vuelca sus registros en un cartucho… y una sirena empieza a sonar por todo el hangar.'],
 omega2:['Conectas el núcleo. Una descarga te tira al suelo, pero el prototipo se enciende: «ASIMILACIÓN LISTA».',
  'Arrancas el núcleo de su soporte entre chispazos. Late en tu mano, buscando algo a lo que adaptarse.',
  'Enrollas los planos y sales por donde has entrado. Las alarmas, eso sí, ya han avisado a alguien.']});
// ---- criatura aliada (Cápsula caída): pelea toda la partida, reaparece y se mueve como los cerditos ----
PORT.ally='<defs><radialGradient id="pbg@U" cx="50%" cy="35%" r="75%"><stop offset="0" stop-color="#7a3a9a"/><stop offset="1" stop-color="#120a1c"/></radialGradient></defs><rect width="120" height="120" fill="url(#pbg@U)"/><g stroke="#14101e" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"><path d="M14 120 C16 92 34 78 60 78 C86 78 104 92 106 120Z" fill="#5a2a7a"/><path d="M30 120 Q36 96 48 90 M90 120 Q84 96 72 90" fill="none" stroke="#ff4fd8" stroke-width="2"/><path d="M34 40 L20 16 L42 30Z M86 40 L100 16 L78 30Z" fill="#3a1a52"/><path d="M60 24 Q88 26 88 54 Q88 78 60 86 Q32 78 32 54 Q32 26 60 24Z" fill="#6a3a92"/><path d="M40 34 Q60 22 80 34 Q72 30 60 30 Q48 30 40 34Z" fill="#8a5ab8"/><path d="M46 70 L42 84 L52 76 M74 70 L78 84 L68 76" fill="#f4ecd6"/><path d="M50 70 Q60 76 70 70" fill="none"/></g><g fill="#ff4fd8" stroke="#14101e" stroke-width="1.2"><ellipse cx="47" cy="50" rx="6" ry="7.5"/><ellipse cx="73" cy="50" rx="6" ry="7.5"/><circle cx="54" cy="62" r="3"/><circle cx="66" cy="62" r="3"/></g><g fill="#fff"><circle cx="45" cy="47" r="2"/><circle cx="71" cy="47" r="2"/></g>';
PCROP.ally='22 12 76 76';
function mkAlly(){const c=S.core;let b=null,bd=1e9;for(let y=0;y<N;y++)for(let x=0;x<N;x++){if(S.cells[y][x]!==2||(x===c.x&&y===c.y))continue;const d=Math.hypot(x-c.x,y-c.y);if(d<bd){bd=d;b={x,y};}}if(!b)return null;
 const k=1+.06*Math.max(0,S.round-1),hp=150*k,old=S.ally,fl=old&&old.flag?old.flag:b;
 const t={type:'bastion',lvl:3,ally:1,tinf:{n:'Criatura alienígena',ic:'👽',col:'#8a4fd0',dt:'phys',range:2.5,dmg:11,rate:1.1,unit:{n:1,hp:150,ap:10,rez:12,spd:2.2}},x:fl.x,y:fl.y,cells:[],flag:{x:fl.x,y:fl.y},ab:{},acd:{},sd:[],uov:{n:1,hp,ap:10,rez:12,spd:2.2},ovr:{dmg:11*k,rate:1.1,range:2.5*K,crit:.05,critm:2,area:0,gold:0,pen:0}};
 t.sd=[{i:0,x:fl.x,y:fl.y,hp,max:hp,en:null,cd:0,rt:0,tw:t,lock:false,fight:false,wt:2,ally:1}];S.ally=t;try{hpanTick.sg='';}catch(e){}S.fx.push({x:fl.x,y:fl.y,t:.6,m:.6,r:1.2*K,col:'#ff4fd8'});return t;}
{const _hp=heroPanel;heroPanel=function(){let h=_hp.apply(this,arguments);try{if(h&&S.ally){const s=S.ally.sd[0];h=h.replace('<div class="hpan">',`<div class="hpan"><button class="hpb hpally${S.aim==='ally'?' aim':''}${s.hp<=0?' off':''}" data-a="ally" data-tip="ally:x" style="background:#8a4fd0">${portrait('ally',1)}${s.hp<=0?`<span class="bdg">${Math.ceil(s.rt)}s</span>`:''}</button>`);}}catch(e){}return h;};}
if(typeof document!=='undefined'){document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-a="ally"]');if(!b||typeof S==='undefined'||!S||!S.ally||RL.open)return;e.stopPropagation();
  if(S.aim==='ally'){S.aim=null;S.msg='';}else if(S.aim){S.msg='Primero termina o cancela la acción en curso.';}else{try{closePrim();}catch(x){}S.aim='ally';S.msg='Elige una casilla del camino para la criatura (Esc para cancelar).';}try{hpanTick.sg='';}catch(x){}renderRelics();ui();},true);
 const cw=document.getElementById('cw');if(cw)cw.addEventListener('click',e=>{if(typeof S==='undefined'||!S||S.aim!=='ally'||e.target!==cv)return;e.stopPropagation();if(DRAGGED)return;const c=cell(e);
  if(S.ally&&inb(c.x,c.y)&&S.cells[c.y][c.x]===2){setFlag(S.ally,c);S.aim=null;S.msg='';try{sfx('ui');}catch(x){}}else S.msg='Elige una casilla del camino.';try{hpanTick.sg='';}catch(x){}renderRelics();ui();},true);}
{const _k=kwHtml0;kwHtml0=function(id,src){if(id==='ally')return '<b>👽 Criatura alienígena</b><small>Salió de la cápsula caída y pelea de tu lado toda la partida: bloquea a 2 enemigos y, si cae, reaparece a los 12 s. Pulsa su retrato y elige una casilla del camino para moverla.</small>';return _k.apply(this,arguments);};}
// ---- soldados rescatados (Señal de socorro) y oro hibernado (Cámara criogénica) ----
function rescPatrol(){const c=S.core;let b=null,bd=1e9;for(let y=0;y<N;y++)for(let x=0;x<N;x++){if(S.cells[y][x]!==2||(x===c.x&&y===c.y))continue;const d=Math.hypot(x-c.x,y-c.y);if(d<bd){bd=d;b={x,y};}}if(!b)return;
 S.summ=(S.summ||[]).filter(t=>!t.resc);const k=1+.05*Math.max(0,S.round-1);
 const t={type:'bastion',lvl:2,summ:1,pat:1,resc:1,ttl:9999,x:b.x,y:b.y,cells:[],flag:{x:b.x,y:b.y},ab:{},acd:{},sd:[],xap:5,ovr:{dmg:TW.bastion.dmg*1.6*k,rate:1.2,range:2.5*K,crit:.05,critm:2,area:0,gold:0,pen:0}};
 const hp=sdHp(t)*k;t.sd=[0,1].map(i=>({i,x:b.x,y:b.y,hp,max:hp,en:null,cd:0,rt:0,tw:t,lock:false,fight:false,rng:1,pat:1}));S.summ.push(t);}
{const _sw=startWave;startWave=function(){const was=S.phase;const r=_sw.apply(this,arguments);try{if(was!=='wave'&&S.phase==='wave'){if(S.resc)rescPatrol();if(S.allyOn){const o=S.ally;if(!o)mkAlly();else{const k=1+.06*Math.max(0,S.round-1),s=o.sd[0],m=150*k;o.uov.hp=m;o.ovr.dmg=11*k;if(s.hp>0)s.hp+=m-s.max;s.max=m;}}}}catch(e){}return r;};}
{const _nr=nextRound;nextRound=function(){const r=_nr.apply(this,arguments);try{if(S.bank&&S.round>=S.bank.at){const g=S.bank.g;S.bank=null;goldEv(g);toast('🏦 La cámara criogénica se abre: <b>+'+g+' 🪙</b>.');ui();}}catch(e){}return r;};}
