// Reliquias: de momento solo se eligen y se muestran; los efectos quedan por definir (un campo apply por reliquia).
const RELICS=[
 {id:'coin',n:'Moneda antigua',ic:'🪙',col:'#7a5c14'},{id:'lens',n:'Lente de precisión',ic:'🔭',col:'#1f5a7a'},
 {id:'anvil',n:'Yunque rúnico',ic:'⚒️',col:'#6a3a2a'},{id:'frost',n:'Amuleto de escarcha',ic:'❄️',col:'#2a5f86'},
 {id:'horn',n:'Cuerno de guerra',ic:'📯',col:'#7a4a1a'},{id:'compass',n:'Brújula rota',ic:'🧭',col:'#4a4a6a'},
 {id:'venom',n:'Frasco de veneno',ic:'☠️',col:'#3a6a2a'},{id:'map',n:'Mapa del cartógrafo',ic:'📜',col:'#6a5a2a'},{id:'dice',n:'Dado de la suerte',ic:'🎲',col:'#5a3a8a'},
 {id:'square',n:'Escuadra del arquitecto',ic:'📐',col:'#5a5a3a',ach:'roma'},{id:'harpoon',n:'Arpón celeste',ic:'🔱',col:'#2a5a7a',ach:'sky'},
 {id:'banner',n:'Estandarte del regimiento',ic:'🏴',col:'#5a2a2a',ach:'untouch'},{id:'crystal',n:'Corazón de cristal',ic:'💎',col:'#2a6a7a',ach:'first'},{id:'trophy',n:'Trofeo de caza',ic:'🦴',col:'#6a5a4a',ach:'hunt'},
 {id:'barricade',n:'Barricada',ic:'🚧',col:'#6a4a2a',ini:1},{id:'quiver',n:'Carcaj',ic:'🎒',col:'#3a5a2a',ini:1},{id:'tome',n:'Tomo arcano',ic:'📘',col:'#3a3f8a',ini:1},{id:'balance',n:'Piedra del equilibrio',ic:'☯️',col:'#6a4a6a',ini:1},{id:'hammer',n:'Martillo del herrero',ic:'🛠️',col:'#6a5a4a',evr:1,ev:'smith'},{id:'scale',n:'Balanza del mercader',ic:'⚖️',col:'#8a7a3a',evr:1,ev:'merchant'},{id:'idol',n:'Ídolo profanado',ic:'🗿',col:'#5a5a6a',evr:1,ev:'shrine'},{id:'mimic',n:'Mímico domesticado',ic:'🦷',col:'#7a4a3a',evr:1,ev:'chest'},{id:'ember',n:'Brasa de dragona',ic:'☄️',col:'#9a3a2a',evr:1,ev:'nest'},{id:'badge',n:'Insignia de mercenario',ic:'🎖️',col:'#4a5a7a',evr:1,ev:'guild'},{id:'notebook',n:'Cuaderno del aprendiz',ic:'📓',col:'#4a6a5a',ach:'tut_m'}];
// Cada reliquia: pasivo + activo. Al usar el activo se pierde el pasivo durante la recarga (en RDEF, en «rondas»; abajo se pasa a segundos de oleada). dur = segundos de juego que dura el activo.
const mapN=()=>Math.max(0,Object.keys(S.blocks).length-1),mapDmg=()=>Math.min(75,5*Math.floor(mapN()/2)),mapCool=()=>Math.min(30,5*Math.floor(mapN()/4));
const RDEF={
 coin:{cd:4,pas:()=>'Los enemigos sueltan <span class="gd">+50% de oro</span>.',act:()=>'<span class="gd">+200 de oro</span> al instante.'},
 lens:{cd:3,dur:20,pas:()=>'Torres: <span class="cc">+10% de crítico</span>.',act:()=>'<b>20 s</b>: <span class="cc">+20% de crítico</span> y críticos <span class="cc">×3</span>.'},
 anvil:{cd:3,dur:20,pas:()=>'Las casillas especiales dan <span class="cf">+50% de su bonus</span>.',act:()=>'<b>20 s</b>: torres sobre casillas especiales con <span class="cr">−50% de enfriamiento</span> y <span class="cd">+50% de daño</span>.'},
 frost:{cd:3,pas:()=>'Cada impacto de torre: <span class="cf">10%</span> de <span class="kw" data-kw="slow">ralentizar</span>.',act:()=>'<span class="kw" data-kw="freeze">Congela</span> <b>10 s</b> a los enemigos de un área.'},
 dice:{cd:3,dur:10,pas:()=>'Puedes <span class="cf">volver a tirar</span> una vez en cada elección: piezas, ofertas de torres y cofres.',act:()=>'Tiras el dado; dura <b>10 s</b>:<br>⚀ Pifia: torres <span class="cd">−25% de daño</span> (recarga de 40 s).<br>⚁⚂ Torres <span class="cd">+25% de daño</span>.<br>⚃⚄ Torres <span class="cd">+50% de daño</span> y <span class="cr">−25% de enfriamiento</span>.<br>⚅ Torres <span class="cd">+100% de daño</span> y <span class="cr">−50% de enfriamiento</span> (recarga de 80 s).'},
 horn:{cd:3,dur:10,pas:()=>'Tras 30 s de oleada: torres <span class="cd">+20% de daño</span>.',act:()=>'<b>10 s</b>: torres <span class="cd">+100% de daño</span>.'},
 compass:{cd:5,dur:10,pas:()=>'En cada cruce, un enemigo tiene un <span class="cf">50%</span> de tomar la rama que se aleja del núcleo (una vez por enemigo).',act:()=>'<b>10 s</b>: los enemigos retroceden por donde han venido.'},
 venom:{cd:4,pas:()=>`Cada impacto de torre: <span class="cc">20%</span> de aplicar 1 de ${kw('poison','veneno','')}.`,act:()=>`Todo el ${kw('poison','veneno','')} explota de golpe; si mata, salta al enemigo más cercano.`},
 barricade:{cd:2,dur:5,pas:()=>'Tus unidades y tu héroe: <span class="cph">+10 de armadura</span>.',act:()=>'Cortas un tramo del camino: los enemigos se detienen <b>5 s</b> (no en cruces).'},
 quiver:{cd:3,dur:10,pas:()=>'Torres: <span class="cr">−15% de enfriamiento</span>.',act:()=>'<b>10 s</b>: las torres de un área disparan <span class="cd">doble</span> (los rayos, doble daño).'},
 hammer:{cd:4,pas:()=>'Mejorar torres cuesta un <span class="gd">15% menos</span>.',act:()=>'Una torre de Nv 1 o 2 sube un nivel gratis.'},
 scale:{cd:3,pas:()=>'Al final de cada ronda, <span class="gd">+10% de interés</span> sobre tu oro (máx. '+INTMAX+').'+(typeof S!=='undefined'&&S&&S.relics&&S.relics.includes('scale')?' Ahora: <span class="gd">+'+interest()+' 🪙</span>.':''),act:()=>'Cobras ya el interés de 3 rondas.'},
 idol:{cd:3,dur:15,pas:()=>`Torres: <span class="cd">+5% de daño</span> por cada vida perdida en la partida (máx. +50%; ahora: <span class="cd">+${idolPct()}%</span>).`,act:()=>'Pierdes 2 de vida: <b>15 s</b> con <span class="cr">−50% de enfriamiento</span>.'},
 mimic:{cd:4,pas:()=>'Cae en el mapa, junto al camino, donde haya solares libres y pocas torres. Cada enemigo que muere a 2,5 casillas o menos lo <span class="cf">alimenta</span>; lleno ('+MIM0+', y '+MIMUP+' más cada vez), <span class="gd">escupe un cofre</span> al colocar la siguiente pieza.',act:()=>'Usa el activo de otra reliquia tuya, aunque esté recargando.'},
 ember:{cd:3,dur:8,pas:()=>'Cada impacto de torre: <span class="cf">10%</span> de aplicar <span class="kw" data-kw="burn">quemadura</span>.',act:()=>'<b>8 s</b>: lluvia de fuego en un área (<span class="kw" data-kw="burn">quemadura</span> cada segundo).'},
 badge:{cd:4,pas:()=>'Tu héroe: <span class="cd">+15% de daño</span> y <span class="chp">+15% de vida</span>.',act:()=>'Un Espadachín y un Sanador del gremio luchan contigo esta oleada.'},
 notebook:{cd:3,pas:()=>`Cada oleada sin perder vida: torres <span class="cd">+2% de daño</span> permanente (máx. +20%; ahora: <span class="cd">+${Math.min(20,2*((typeof S!=='undefined'&&S&&S.nbN)||0))}%</span>).`,act:()=>'Esta oleada, cada baja da <span class="cf">+1 de experiencia</span> a tu héroe.'},
 balance:{cd:3,dur:8,pas:()=>`Enemigos con ${kw('burn','quemadura','')} e ${kw('chill','hipotermia','')} a la vez: <span class="cd">+25% de stacks</span>.`,act:()=>`<b>8 s</b>, en un área: ${kw('slow','ralentiza','')} un 30% y aplica 3 de ${kw('burn','quemadura','')} y 1 de ${kw('chill','hipotermia','')} por segundo.`},
 tome:{cd:3,dur:8,pas:()=>'Lo que hace daño mágico: <span class="cmg">+10 de penetración mágica</span>.',act:()=>'<b>8 s</b>: los enemigos de un área reciben <span class="cd">+25% de daño</span> de todo (como <span class="cmg">daño mágico</span>).'},
 square:{cd:3,pas:()=>'Te ofrecen <span class="cf">4 piezas</span> en vez de 3.',act:()=>'Vuelves a sacar las piezas de esta ronda.'},
 harpoon:{cd:3,dur:8,pas:()=>`<span class="cd">+25% de daño</span> contra ${kw('fly','voladores','')}.`,act:()=>`<b>8 s</b>: los ${kw('fly','voladores','')} de un área caen al suelo y se pueden bloquear.`},
 banner:{cd:3,dur:10,pas:()=>'Tus soldados reaparecen un <span class="cr">30% más rápido</span>.',act:()=>'<b>10 s</b>: tus soldados <span class="cf">no pueden morir</span>.'},
 crystal:{cd:5,pas:()=>'El primer enemigo que llega al núcleo cada oleada <span class="cf">no quita vida</span> (salvo jefes).',act:()=>'Recuperas <span class="chp">3 de vida</span>.'},
 trophy:{cd:3,dur:10,pas:()=>`Cada élite eliminada: <span class="cg">+5% de rango</span> para tus torres el resto de la partida (máx. +25%; ahora: <span class="cg">+${5*((typeof S!=='undefined'&&S&&S.troN)||0)}%</span>).`,act:()=>'<b>10 s</b>: torres <span class="cg">+50% de rango</span>.'},
 map:{cd:5,pas:()=>`Torres: <span class="cd">+5% de daño</span> cada 2 piezas colocadas (máx. +75%) y <span class="cr">−5% de enfriamiento</span> cada 4 (máx. −30%) (ahora: <span class="cd">+${mapDmg()}%</span>, <span class="cr">−${mapCool()}%</span>).`,act:()=>'Crea un cofre en un hueco sin explorar.'}};
// la recarga de las reliquias es en segundos de oleada (el reloj se para fuera de la oleada); RDEF la da en «rondas» y aquí se convierte
const RCDS={1:40,2:80,3:120,4:150,5:180};
RELICS.forEach(r=>{Object.assign(r,RDEF[r.id]);r.cd=RCDS[r.cd]||r.cd*40;});
const RELIC=Object.fromEntries(RELICS.map(r=>[r.id,r]));
const RL={open:false,choices:[]};
// pasivo y activo en dos recuadros, con título grande; el activo lleva su recarga
const rdesc=id=>{const r=RELIC[id];return `<div class="rbx rps"><div class="rbt">♾ Pasivo</div>${r.pas()}</div><div class="rbx rac"><div class="rbt">⚡ Activo<small>${kw('rcd','⌛ '+fmtT(r.cd),'','st')}</small></div>${r.act()}</div>`;};
const rcdTag=id=>`<span class="rcdt">${kw('rcd','⏳ '+RELIC[id].cd,'','st')}</span>`;
const relicInfo=(id,quiet)=>{const r=RELIC[id],st=!quiet&&S.relics&&S.relics.includes(id)&&S.rs[id];
 const state=st?(st.t>0?`<small class="gd">Activo en curso: ${f(st.t)} s.</small>`:st.cd>0?`<small class="cr">Pasivo desactivado: ${fmtT(st.cd)} más de oleada.</small>`:'<small class="cc">Lista: pulsa el icono para usar el activo.</small>'):'';
 return `<div class="ttl">${r.evr?`<small style="display:block;margin:0 0 2px">Reliquia de evento · «${EVENTS[r.ev]?EVENTS[r.ev].n:''}»</small>`:''}<b><i style="background:${r.col};border-radius:4px;text-align:center;font-style:normal;font-size:11px;line-height:12px;width:14px;height:14px">${r.ic}</i>${r.n}</b></div>`+rdesc(id)+state;};
const rp=id=>S.relics.includes(id)&&S.rs[id].cd===0,ra=id=>S.relics.includes(id)&&S.rs[id].t>0;
const chestInfo=()=>'<div class="ttl"><b>Cofre</b></div><small style="margin:0">Coloca una pieza en este hueco y obtendrás una reliquia para esta partida.</small>';
function renderRelics(){
 const hb=S.hero?`<button class="rl hero${S.aim==='hero'?' aim':''}${S.aim&&S.aim!=='hero'?' dim':''}${S.hero.s.hp<=0?' off':''}" data-a="hero" data-tip="hero:x" style="background:${S.hero.def.col}">${portrait(S.hero.id,1)}<span class="bdg">${S.hero.s.hp<=0?Math.ceil(S.hero.s.rt)+'s':S.hero.lvl}</span></button>`:'';
 const vb=Object.keys(VCH).filter(k=>S.vch&&S.vch[k]>0).map(k=>`<button class="rl${S.aim==='vch'&&S.vty===k?' aim':''}${S.aim&&!(S.aim==='vch'&&S.vty===k)?' dim':''}" data-a="vch" data-id="${k}" data-tip="vch:${k}" style="background:#5a4a2a">${VCH[k].ic}<span class="bdg">${S.vch[k]}</span></button>`).join('');
 let rki=0;$('relics').innerHTML=vb+(S.relics.length?S.relics.map(id=>{const kn=++rki;const st=S.rs[id],R=RELIC[id],off=st.cd>0,on=st.t>0,bd=on?Math.ceil(st.t)+'s':off?fmtT(st.cd,1):id==='scale'&&interest()>0?'+'+interest():'';
  const rd=relUsable(id);return `<button class="rl${off?' off':''}${on?' act':''}${rd?' rdy'+(RUSE()<3?' pul':''):''}${RFL[id]&&performance.now()-RFL[id]<900?' rfl':''}${S.aim===id?' aim':''}${S.aim&&S.aim!==id?' dim':''}" data-a="ract" data-id="${id}" data-tip="relic:${id}" style="background:${R.col}">${R.ic}${bd!==''?`<span class="bdg">${bd}</span>`:''}${kn<=9&&kcOn()?`<span class="kcap kc2"><b>⇧</b><em>+</em><b>${kn}</b></span>`:''}</button>`;}).join(''):'');
}
let RSIG='';const RFL={},RPCD={};
// activa usable ahora mismo (para el brillo): recargada, sin efecto en curso y en la fase en que se puede usar
function relUsable(id){const st=S.rs&&S.rs[id];if(!st||st.cd>0||st.t>0||RL.open||!(S.phase==='build'||S.phase==='wave'||S.phase==='place'))return false;
 if(id==='square')return S.phase==='place';if(['coin','map','hammer','scale','notebook','crystal','mimic'].includes(id))return true;return S.phase==='wave';}
// cuántas veces has usado activos de reliquia (entre partidas): con menos de 3, el brillo late para llamar más la atención
const RUSE=()=>{try{return +localStorage.getItem('rt-ruse')||0;}catch(e){return 9;}};
function relicTick(){if(RPCD._S!==S){for(const k in RPCD)delete RPCD[k];RPCD._S=S;}for(const id of S.relics){const st=S.rs[id],c=st.cd,u=c>0||st.t>0,pv=RPCD[id];if(pv&&pv.c>0&&c<=0&&realG()){RFL[id]=performance.now();try{sfx('rready');}catch(e){}setTimeout(()=>{RSIG='';},950);}if(pv&&!pv.u&&u&&realG()){try{localStorage.setItem('rt-ruse',RUSE()+1);}catch(e){}}RPCD[id]={c,u};}
 const sg=S.relics.map(id=>Math.ceil(S.rs[id].cd)+':'+Math.ceil(S.rs[id].t)+(relUsable(id)?'r':'')+(RFL[id]&&performance.now()-RFL[id]<900?'f':'')).join(',')+'|'+S.aim+'|'+(S.hero?S.hero.lvl+':'+(S.hero.s.hp>0?1:Math.ceil(S.hero.s.rt)):'');if(sg!==RSIG){RSIG=sg;renderRelics();}}
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

// ---- Dado de la suerte (pasivo): volver a tirar una vez en cada elección (piezas, ofertas de torres y cofres) ----
const diceRr=k=>S&&S.relics&&rp('dice')&&!(S.drr||{})[k]?`<button class="drr" data-a="dreroll" data-k="${k}">🎲 Volver a tirar</button>`:'';
function diceReroll(k){if(!rp('dice')||(S.drr||{})[k])return;
 if(k==='pc'){if(S.phase!=='place')return;S.pi=null;deal();(S.drr=S.drr||{}).pc=1;}
 else if(k==='tw'){if(!RL.towo)return;const p=tPool();if(!p.length)return;RL.towo=towPick3(p);(S.drr=S.drr||{}).tw=1;renderTowerOffer();}
 else if(k==='rl'){if(!RL.choices)return;openRelic();(S.drr=S.drr||{}).rl=1;renderRelicPick();}
 try{sfx('ui');}catch(e){}ui();}
