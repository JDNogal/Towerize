// Reliquias: de momento solo se eligen y se muestran; los efectos quedan por definir (un campo apply por reliquia).
const RELICS=[
 {id:'coin',n:'Moneda antigua',ic:'🪙',col:'#7a5c14'},{id:'lens',n:'Lente de precisión',ic:'🔭',col:'#1f5a7a'},
 {id:'anvil',n:'Yunque rúnico',ic:'⚒️',col:'#6a3a2a'},{id:'frost',n:'Amuleto de escarcha',ic:'❄️',col:'#2a5f86'},
 {id:'horn',n:'Cuerno de guerra',ic:'📯',col:'#7a4a1a'},{id:'compass',n:'Brújula rota',ic:'🧭',col:'#4a4a6a'},
 {id:'venom',n:'Frasco de veneno',ic:'☠️',col:'#3a6a2a'},{id:'map',n:'Mapa del cartógrafo',ic:'📜',col:'#6a5a2a'},
 {id:'square',n:'Escuadra del arquitecto',ic:'📐',col:'#5a5a3a',ach:'roma'},{id:'harpoon',n:'Arpón celeste',ic:'🔱',col:'#2a5a7a',ach:'sky'},
 {id:'banner',n:'Estandarte del regimiento',ic:'🏴',col:'#5a2a2a',ach:'untouch'},{id:'crystal',n:'Corazón de cristal',ic:'💎',col:'#2a6a7a',ach:'first'},{id:'trophy',n:'Trofeo de caza',ic:'🦴',col:'#6a5a4a',ach:'hunt'},
 {id:'barricade',n:'Barricada',ic:'🚧',col:'#6a4a2a',ini:1},{id:'quiver',n:'Carcaj',ic:'🎒',col:'#3a5a2a',ini:1},{id:'tome',n:'Tomo arcano',ic:'📘',col:'#3a3f8a',ini:1},{id:'balance',n:'Piedra del equilibrio',ic:'☯️',col:'#6a4a6a',ini:1},{id:'hammer',n:'Martillo del herrero',ic:'🛠️',col:'#6a5a4a',evr:1,ev:'smith'},{id:'scale',n:'Balanza del mercader',ic:'⚖️',col:'#8a7a3a',evr:1,ev:'merchant'},{id:'idol',n:'Ídolo profanado',ic:'🗿',col:'#5a5a6a',evr:1,ev:'shrine'},{id:'mimic',n:'Mímico domesticado',ic:'🦷',col:'#7a4a3a',evr:1,ev:'chest'},{id:'ember',n:'Brasa de dragona',ic:'☄️',col:'#9a3a2a',evr:1,ev:'nest'},{id:'badge',n:'Insignia de mercenario',ic:'🎖️',col:'#4a5a7a',evr:1,ev:'guild'},{id:'notebook',n:'Cuaderno del aprendiz',ic:'📓',col:'#4a6a5a',ach:'tut_m'}];
// Cada reliquia: pasivo + activo. Al usar el activo se pierde el pasivo durante `cd` rondas (incluida la actual). dur = segundos de juego que dura el activo.
const mapN=()=>Math.max(0,Object.keys(S.blocks).length-1),mapDmg=()=>5*mapN(),mapCool=()=>5*Math.floor(mapN()/3);
const RDEF={
 coin:{cd:4,pas:()=>'Los enemigos sueltan un <span class="gd">50% más de oro</span>.',act:()=>'Obtienes <span class="gd">200 de oro</span> al instante.'},
 lens:{cd:3,dur:20,pas:()=>'Todas las torres ganan <span class="cc">+10% de probabilidad de crítico</span>.',act:()=>'Durante 20 s: <span class="cc">+20% de probabilidad de crítico</span> y <span class="cc">+100% de daño crítico</span> (×3).'},
 anvil:{cd:3,dur:20,pas:()=>'Las casillas especiales dan un <span class="cf">50% más</span> de su bonus (10 pasa a 15).',act:()=>'Durante 20 s, las torres sobre casillas especiales ganan <span class="cr">−50% de enfriamiento</span> y <span class="cd">+50% de daño</span>.'},
 frost:{cd:3,pas:()=>'Cada impacto de torre tiene un 10% de <span class="kw" data-kw="slow">ralentizar</span> al enemigo.',act:()=>'Eliges un área (círculo azul claro bajo el ratón) y <span class="kw" data-kw="freeze">congela</span> 10 s a todos los enemigos dentro.'},
 horn:{cd:3,dur:10,pas:()=>'Tras 30 s de oleada, las torres ganan <span class="cd">+20% de daño</span>.',act:()=>'Durante 10 s, todas las torres ganan <span class="cd">+100% de daño</span>.'},
 compass:{cd:5,dur:10,pas:()=>'Al llegar a una intersección, un enemigo tiene un 50% de tomar una rama que se aleja del núcleo, hasta donde acabe (máx. una vez por enemigo).',act:()=>'Durante 10 s, todos los enemigos retroceden por el camino que han recorrido.'},
 venom:{cd:4,pas:()=>`Cada impacto de torre tiene un <span class="cc">20%</span> de aplicar 1 stack de ${kw('poison','veneno','')}.`,act:()=>'El veneno de todos los enemigos explota y hace su daño restante de golpe. Los que mueran por ello pasan su veneno al enemigo más cercano, sin importar la distancia.'},
 barricade:{cd:2,dur:5,pas:()=>'Tus unidades (soldados y héroes) ganan <span class="cph">+10 de armadura</span>.',act:()=>'Eliges un punto del camino y pones una barricada que lo corta de lado a lado (en diagonal si es una curva) y <span class="cr">detiene 5 s</span> a los enemigos que lleguen a ella. En los cruces no se puede poner.'},
 quiver:{cd:3,dur:10,pas:()=>'Las torres ganan <span class="cr">−15% de enfriamiento</span>.',act:()=>'Eliges un área (5 casillas de radio): durante 10 s las torres dentro disparan <span class="cd">dos proyectiles</span> en cada disparo (las torres de rayo continuo hacen el doble de daño).'},
 hammer:{cd:4,pas:()=>'Las mejoras de torres cuestan un <span class="gd">15% menos</span>.',act:()=>'Eliges una torre de Nv 1 o 2: sube un nivel gratis.'},
 scale:{cd:3,pas:()=>'Al final de cada ronda ganas un <span class="gd">10% de interés</span> sobre tu oro (múltiplos de 5, máx. <span class="gd">30 de oro</span>).',act:()=>'Cobras ahora el interés de las próximas 3 rondas, calculado con tu oro actual.'},
 idol:{cd:3,dur:15,pas:()=>`Cada punto de vida que ha perdido el núcleo en la partida, incluso antes de conseguir el ídolo, da a tus torres <span class="cd">+5% de daño</span>, hasta +50% (ahora: <span class="cd">+${idolPct()}%</span>).`,act:()=>'Sacrificas 2 de vida: durante 15 s tus torres ganan <span class="cr">−50% de enfriamiento</span>.'},
 mimic:{cd:4,pas:()=>'Los enemigos que mueren a 2 casillas o menos de un cofre sin abrir sueltan un <span class="gd">75% más de oro</span>.',act:()=>'Copia el activo de otra reliquia que tengas, aunque esté en enfriamiento. Solo el Mímico entra en enfriamiento.'},
 ember:{cd:3,dur:8,pas:()=>'Cada impacto de torre tiene un 10% de aplicar <span class="kw" data-kw="burn">quemadura</span> al enemigo.',act:()=>'Eliges un área (3 casillas de radio): durante 8 s cae una lluvia de fuego que aplica <span class="kw" data-kw="burn">quemadura</span> cada segundo a los enemigos dentro.'},
 badge:{cd:4,pas:()=>'Tu héroe gana <span class="cd">+15% de daño</span> y <span class="chp">+15% de vida</span>.',act:()=>'Un Espadachín y un Sanador del gremio luchan junto a tu héroe durante esta oleada.'},
 notebook:{cd:3,pas:()=>`Cada oleada que superas sin perder vida, tus torres ganan <span class="cd">+2% de daño</span> permanente, hasta +20% (ahora: <span class="cd">+${Math.min(20,2*((typeof S!=='undefined'&&S&&S.nbN)||0))}%</span>).`,act:()=>'Durante la oleada de esta ronda, cada enemigo eliminado suelta una bolita de <span class="cf">+1 de experiencia</span> extra para tu héroe, lo mate quien lo mate.'},
 balance:{cd:3,dur:8,pas:()=>`<span class="cf">Contraste</span>: los enemigos que tienen ${kw('burn','quemadura','')} e ${kw('chill','hipotermia','')} a la vez reciben un <span class="cd">25% más de stacks</span> de cualquier estado.`,act:()=>`Eliges un área (3 casillas de radio): durante 8 s, los enemigos dentro quedan ${kw('slow','ralentizados','')} un 30% y reciben 3 stacks de ${kw('burn','quemadura','')} y 1 de ${kw('chill','hipotermia','')} por segundo.`},
 tome:{cd:3,dur:8,pas:()=>'Tus torres y unidades que hacen daño mágico ganan <span class="cmg">+10 de penetración mágica</span>.',act:()=>'Eliges un área (4 casillas de radio): durante 8 s, los enemigos dentro reciben un <span class="cd">25% más de daño</span> de todas las fuentes, como <span class="cmg">daño mágico</span> (lo reduce la resistencia mágica, no la física).'},
 square:{cd:3,pas:()=>'Al elegir pieza te ofrecen <span class="cf">4 piezas</span> en lugar de 3.',act:()=>'Vuelves a sacar las piezas ofrecidas esta ronda. Solo en la fase de pieza.'},
 harpoon:{cd:3,dur:8,pas:()=>`Todo tu daño contra ${kw('fly','voladores','')} es un <span class="cd">25% mayor</span>.`,act:()=>`Eliges un área (3 casillas de radio): durante 8 s, los ${kw('fly','voladores','')} dentro <span class="cf">caen al suelo</span>. Tus unidades pueden bloquearlos y les afecta todo lo que golpea el suelo.`},
 banner:{cd:3,dur:10,pas:()=>'Tus soldados <span class="cr">reaparecen un 30% más rápido</span>.',act:()=>'Durante 10 s, tus soldados <span class="cf">no pueden morir</span>: aguantan con 1 de vida.'},
 crystal:{cd:5,pas:()=>'El primer enemigo que llega al núcleo en cada oleada <span class="cf">no quita vida</span> (no funciona con jefes).',act:()=>'Recuperas <span class="chp">3 de vida</span> (máx. 20).'},
 trophy:{cd:3,dur:10,pas:()=>`Cada élite o mini-élite que eliminas da a tus torres <span class="cg">+5% de rango</span> para el resto de la partida, hasta +25% (ahora: <span class="cg">+${5*((typeof S!=='undefined'&&S&&S.troN)||0)}%</span>).`,act:()=>'Durante 10 s, tus torres ganan <span class="cg">+50% de rango</span>.'},
 map:{cd:5,pas:()=>`Las torres ganan <span class="cd">+5% de daño</span> por cada pieza colocada (ahora: <span class="cd">+${mapDmg()}%</span>) y <span class="cr">−5% de enfriamiento</span> por cada 3 piezas (ahora: <span class="cr">−${mapCool()}%</span>).`,act:()=>'Genera un cofre en un hueco sin explorar junto al mapa.'}};
RELICS.forEach(r=>{Object.assign(r,RDEF[r.id]);});
const RELIC=Object.fromEntries(RELICS.map(r=>[r.id,r]));
const RL={open:false,choices:[]};
const rdesc=id=>{const r=RELIC[id];return `<div><span class="cf">Pasivo:</span> ${r.pas()}</div><div style="margin-top:4px"><span class="gd">Activo:</span> ${r.act()}</div>`;};
const rcdTag=id=>`<span class="rcdt">${kw('rcd','⏳ '+RELIC[id].cd,'','st')}</span>`;
const relicInfo=(id,quiet)=>{const r=RELIC[id],st=!quiet&&S.relics&&S.relics.includes(id)&&S.rs[id];
 const state=st?(st.t>0?`<small class="gd">Activo en curso: ${f(st.t)} s.</small>`:st.cd>0?`<small class="cr">Pasivo desactivado: ${st.cd} ronda${st.cd>1?'s':''} más.</small>`:'<small class="cc">Lista: pulsa el icono para usar el activo.</small>'):'';
 return `<div class="ttl">${rcdTag(id)}${r.evr?`<small style="display:block;margin:0 0 2px">Reliquia de evento · «${EVENTS[r.ev]?EVENTS[r.ev].n:''}»</small>`:''}<b><i style="background:${r.col};border-radius:4px;text-align:center;font-style:normal;font-size:11px;line-height:12px;width:14px;height:14px">${r.ic}</i>${r.n}</b></div>`+rdesc(id)+state;};
const rp=id=>S.relics.includes(id)&&S.rs[id].cd===0,ra=id=>S.relics.includes(id)&&S.rs[id].t>0;
const chestInfo=()=>'<div class="ttl"><b>Cofre</b></div><small style="margin:0">Coloca una pieza en este hueco y obtendrás una reliquia para esta partida.</small>';
function renderRelics(){
 const hb=S.hero?`<button class="rl hero${S.aim==='hero'?' aim':''}${S.aim&&S.aim!=='hero'?' dim':''}${S.hero.s.hp<=0?' off':''}" data-a="hero" data-tip="hero:x" style="background:${S.hero.def.col}">${portrait(S.hero.id,1)}<span class="bdg">${S.hero.s.hp<=0?Math.ceil(S.hero.s.rt)+'s':S.hero.lvl}</span></button>`:'';
 const vb=Object.keys(VCH).filter(k=>S.vch&&S.vch[k]>0).map(k=>`<button class="rl${S.aim==='vch'&&S.vty===k?' aim':''}${S.aim&&!(S.aim==='vch'&&S.vty===k)?' dim':''}" data-a="vch" data-id="${k}" data-tip="vch:${k}" style="background:#5a4a2a">${VCH[k].ic}<span class="bdg">${S.vch[k]}</span></button>`).join('');
 let rki=0;$('relics').innerHTML=vb+(S.relics.length?S.relics.map(id=>{const kn=++rki;const st=S.rs[id],R=RELIC[id],off=st.cd>0,on=st.t>0,bd=on?Math.ceil(st.t)+'s':off?st.cd:'';
  const rd=relUsable(id);return `<button class="rl${off?' off':''}${on?' act':''}${rd?' rdy'+(RUSE()<3?' pul':''):''}${RFL[id]&&performance.now()-RFL[id]<900?' rfl':''}${S.aim===id?' aim':''}${S.aim&&S.aim!==id?' dim':''}" data-a="ract" data-id="${id}" data-tip="relic:${id}" style="background:${R.col}">${R.ic}${bd!==''?`<span class="bdg">${bd}</span>`:''}${kn<=9&&kcOn()?`<span class="kcap kc2"><b>⇧</b><em>+</em><b>${kn}</b></span>`:''}</button>`;}).join(''):'');
}
let RSIG='';const RFL={},RPCD={};
// activa usable ahora mismo (para el brillo): recargada, sin efecto en curso y en la fase en que se puede usar
function relUsable(id){const st=S.rs&&S.rs[id];if(!st||st.cd>0||st.t>0||RL.open||!(S.phase==='build'||S.phase==='wave'||S.phase==='place'))return false;
 if(id==='square')return S.phase==='place';if(['coin','map','hammer','scale','notebook','crystal','mimic'].includes(id))return true;return S.phase==='wave';}
// cuántas veces has usado activos de reliquia (entre partidas): con menos de 3, el brillo late para llamar más la atención
const RUSE=()=>{try{return +localStorage.getItem('rt-ruse')||0;}catch(e){return 9;}};
function relicTick(){if(RPCD._S!==S){for(const k in RPCD)delete RPCD[k];RPCD._S=S;}for(const id of S.relics){const st=S.rs[id],c=st.cd,u=c>0||st.t>0,pv=RPCD[id];if(pv&&pv.c>0&&c<=0&&realG()){RFL[id]=performance.now();try{sfx('rready');}catch(e){}setTimeout(()=>{RSIG='';},950);}if(pv&&!pv.u&&u&&realG()){try{localStorage.setItem('rt-ruse',RUSE()+1);}catch(e){}}RPCD[id]={c,u};}
 const sg=S.relics.map(id=>S.rs[id].cd+':'+Math.ceil(S.rs[id].t)+(relUsable(id)?'r':'')+(RFL[id]&&performance.now()-RFL[id]<900?'f':'')).join(',')+'|'+S.aim+'|'+(S.hero?S.hero.lvl+':'+(S.hero.s.hp>0?1:Math.ceil(S.hero.s.rt)):'');if(sg!==RSIG){RSIG=sg;renderRelics();}}
function nearChest(e){const NB=N/BN,R=2*NB/P;for(const k in S.chests){if(!S.chests[k])continue;const[bx,by]=k.split(',').map(Number),x0=bx*NB,y0=by*NB,dx=Math.max(x0-e.x,0,e.x-(x0+NB)),dy=Math.max(y0-e.y,0,e.y-(y0+NB));if(Math.hypot(dx,dy)<=R)return true;}return false;}
function freeSlot(){const c=[];for(let by=0;by<BN;by++)for(let bx=0;bx<BN;bx++){const k=bx+','+by;if(S.blocks[k]||S.chests[k])continue;if(D.some(([a,b])=>S.blocks[(bx+a)+','+(by+b)]))c.push(k);}return c.length?c[Math.floor(Math.random()*c.length)]:null;}
function addPois(e,w,src,rv){(e.ps=e.ps||[]).push({w:w*stkM(e),t:POISD,src,rv});}
function onHit(e,src){
 if(rp('frost')&&Math.random()<.1){slowE(e,TW.frost.slow,SLOWT);RS('frost').n++;}
 if(rp('venom')&&Math.random()<.2)addPois(e,1,src,1);
 if(rp('ember')&&src&&Math.random()<.1){const n=Math.max(1,stats(src).dmg*.25);emberBurn(e,src,n);RS('ember').n++;}}
function venomBlast(){
 for(const e of S.enemies){if(!e.ps||!e.ps.length)continue;let tot=0;for(const q of e.ps){tot+=q.w*q.t;if(q.rv)RS('venom').dmg+=q.w*q.t;}
  const src=e.ps[e.ps.length-1].src;e.pb=e.ps;e.ps=[];DNK='poison';hurt(e,tot,src,'elem');DNK=null;S.fx.push({x:e.x,y:e.y,t:.45,m:.45,r:.8*K,col:'#7bd34a'});}
 const living=S.enemies.filter(e=>e.hp>0);
 for(const e of S.enemies){if(e.hp>0||!e.pb)continue;let nr=null,nd=1e9;
  for(const o of living){const dd=Math.hypot(o.x-e.x,o.y-e.y);if(dd<nd){nd=dd;nr=o;}}
  if(nr)for(const q of e.pb)addPois(nr,q.w,q.src,q.rv);}
}
const HARPR=3*K;
function castHarpoon(c){let n=0;for(const e of S.enemies)if(e.hp>0&&ET[e.t].fly&&Math.hypot(e.x-c.x,e.y-c.y)<=HARPR){e.gnd=S.wt+8;n++;}
 S.fx.push({x:c.x,y:c.y,t:.5,m:.5,r:HARPR,col:'#7fb8e0'});RS('harpoon').n+=n;
 setCD('harpoon');S.rs.harpoon.t=8;S.aim=null;S.msg='Derribados: '+n+' volador'+(n===1?'':'es')+'.';renderRelics();ui();}
function castFreeze(c){
 let n=0;for(const e of S.enemies)if(Math.hypot(e.x-c.x,e.y-c.y)<=FRZR&&freezeE(e,10))n++;RS('frost').n2+=n;
 S.fx.push({x:c.x,y:c.y,t:.5,m:.5,r:FRZR,col:'#9fdcff'});
 setCD('frost');S.aim=null;S.msg='Congelados: '+n+' enemigo'+(n===1?'':'s')+'.';renderRelics();ui();
}
