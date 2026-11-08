// =============== EVENTOS ===============
// Casillas "?" en el mapa: al colocar una pieza encima se abre un evento único (2-4 opciones). Lo que da cada opción oculta se recuerda entre partidas.
let MEM={ev:{},pigs:{}};try{MEM={ev:{},pigs:{},...(JSON.parse(localStorage.getItem('rt-evmem'))||{})};}catch(e){}
const saveMem=()=>{try{localStorage.setItem('rt-evmem',JSON.stringify(MEM));}catch(e){}};
const evCount=()=>(ROUNDS<19?2:ROUNDS<24?3:ROUNDS<29?4:5)+(Math.random()<.5?1:0);
function placeEvents(c,A){const pool=shuf(Object.keys(EVENTS)),n=Math.min(evCount(),pool.length),cand=[];
 for(let by=0;by<BN;by++)for(let bx=0;bx<BN;bx++){const k=bx+','+by;if(S.blocks[k]||S.chests[k]||(bx===c&&by===c))continue;if(Math.abs(bx-A[0])+Math.abs(by-A[1])<2)continue;cand.push(k);}
 shuf(cand);for(let i=0;i<n&&i<cand.length;i++)S.evts[cand[i]]=pool[i];}
const rndRelic=()=>{const p=RELICS.filter(r=>!r.ini&&!r.evr&&!(r.ach&&!ACHS[r.ach]&&!OPT.u_rl)&&!S.relics.includes(r.id));return p.length?p[Math.floor(Math.random()*p.length)].id:null;};
function gainRelic(id){S.relics.push(id);S.rs[id]={cd:0,t:0};see('rl',id);relicHints(id);if(id==='badge')heroSync();renderRelics();}
function goldEv(v){S.gold+=v;if(S.st&&v>0)S.st.gEv+=v;}
function addNow(k,v){const p=S.portals[0];if(p)p.plan[k]=(p.plan[k]||0)+v;}
function blockBuffs(bk){if(!bk)return false;const[bx,by]=bk.split(',').map(Number),NB=N/BN;for(let y=by*NB;y<(by+1)*NB;y++)for(let x=bx*NB;x<(bx+1)*NB;x++)if(S.buff[y]&&BF[S.buff[y][x]])return true;return false;}
function lessEnemies(f){for(const p of S.portals)for(const k of['norm','fast','tank','custodian','sling','javelin','raider','acolyte','warlock','shaman'])if(p.plan[k])p.plan[k]=Math.max(1,Math.round(p.plan[k]*(1-f)));}
function moreEnemies(f){for(const p of S.portals)for(const k of['norm','fast','tank'])if(p.plan[k])p.plan[k]=Math.ceil(p.plan[k]*(1+f));}
function heroUp(){const H=S.hero;if(!H||H.lvl>=HLMAX)return false;giveXp(H,xpNeed(H.lvl+1)-H.xp+.01);return true;}
function lvUp(t){t.lvl++;if(t.lvl===3&&!TW[t.type].uniq)hint('spec','Nv 4','En <b>Nv 4</b> eliges una de dos especializaciones para tu torre, cada una con sus propias habilidades especiales.',tgCell(t.x,t.y,1.4));if(t.sd&&!TW[t.type].guild){const m=sdHp(t);for(const q of t.sd){const dd=m-q.max;q.max=m;if(q.hp>0)q.hp+=dd;}}}
const pigDone=()=>['brick','wood','straw'].every(k=>MEM.pigs[k]);
function pigWin(){let ch=0;for(const t of S.list)if(TW[t.type].pig&&!MEM.pigs[t.type]){MEM.pigs[t.type]=1;ch=1;}if(ch)saveMem();}
// claves de resultado → texto con icono (las reliquias abren su ficha al pasar el ratón)
function chip(k){const[a,b]=k.split(':');
 if(a==='gold')return `<span class="gd">🪙 ${+b>0?'+':''}${b}</span>`;
 if(a==='relic')return RELIC[b]?kw('rl_'+b,RELIC[b].ic+' '+RELIC[b].n,'','st'):'una reliquia';
 if(a==='relicx')return '🎁 reliquia a elegir';
 if(a==='hp')return `<span class="cd">❤️ ${+b>0?'+':''}${b}</span>`;
 if(a==='hphalf')return '<span class="cd">❤️ −mitad</span>';
 if(a==='lvl')return '<span class="cf">⭐ +1 nivel de héroe</span>';
 if(a==='elite')return '💀 +1 Élite';
 if(a==='more')return '💀 +'+b+'% enemigos';
 if(a==='tower')return TW[b]?`<span class="gd">${TW[b].ic} ${TW[b].n}</span>`:'';
 if(a==='wanted')return '📜 Élite de encargo en 2 rondas';
 if(a==='temper')return '⚒ torres de Nv 1 → 2';if(a==='bless')return '✨ las casillas especiales de la pieza dan el doble de bonus';if(a==='less')return '🕯 −'+b+'% enemigos en la próxima oleada';
 if(a==='sharpen')return '🗡 +25% de daño a la torre que elijas';
 if(a==='half')return '🏷 próxima torre a mitad de precio';
 if(a==='cubs')return '🐺 Lobatos';if(a==='grey')return '🐺 Lobo gris';if(a==='wolf')return '🐺 El Lobo';
 if(a==='chest4')return '🎁 el próximo cofre ofrece 4 reliquias';if(a==='scout')return '🗺 un cofre nuevo en un hueco sin explorar';
 if(a==='none')return 'nada';return k;}
const memOf=(id,i)=>(MEM.ev[id]&&MEM.ev[id][i])||[];
function remember(id,i,keys){MEM.ev[id]=MEM.ev[id]||{};const a=MEM.ev[id][i]=MEM.ev[id][i]||[];for(const k of keys)if(!a.includes(k)){a.push(k);if(a.length>8)a.shift();}saveMem();}
const EVENTS={
 merchant:{n:'Mercader ambulante',ic:'🧳',txt:'Un mercader con un carro lleno de objetos raros te corta el paso. «¿Te interesa algo, viajero?»',opts:[
  {l:'Comprar una reliquia',c:'Pagas 150 🪙',req:()=>S.gold<150?'Necesitas 150 🪙':'',run:()=>{const id=rndRelic();S.gold-=150;if(!id){goldEv(150);return['gold:0'];}gainRelic(id);return['relic:'+id];}},
  {l:'Robarle',c:'La próxima oleada trae una Élite extra',run:()=>{const id=rndRelic();addNow('elite',1);if(id)gainRelic(id);return[id?'relic:'+id:'gold:0'];}},
  {l:'Regatear',c:'El próximo cofre que abras estará vacío',run:()=>{S.noChest=1;gainRelic('scale');return['relic:scale'];}}]},
 shrine:{n:'Santuario olvidado',ic:'⛩️',txt:'Entre la maleza aparece un pequeño santuario. Una inscripción promete favores a cambio de sacrificios.',opts:[
  {l:'Sacrificar la mitad de tu vida',c:'Pierdes la mitad de tu vida actual',req:()=>!S.hero||S.hero.lvl>=HLMAX?'Tu héroe ya está al nivel máximo':S.hp<2?'Necesitas al menos 2 de vida':'',run:()=>{hpLoss(Math.floor(S.hp/2));heroUp();return['lvl'];}},
  {l:'Hacer una ofrenda',c:'Pagas 100 🪙',req:()=>S.gold<100?'Necesitas 100 🪙':!blockBuffs(EVK)?'La ofrenda bendice las casillas especiales de esta pieza, y no tiene ninguna':'',run:()=>{S.gold-=100;(S.bless=S.bless||{})[EVK]=1;return['bless'];}},
  {l:'Llevarte el ídolo',c:'Pierdes 3 de vida (la maldición del santuario)',req:()=>S.hp<=3?'Necesitas más de 3 de vida':'',run:()=>{hpLoss(3);gainRelic('idol');return['relic:idol'];}},
  {l:'Rezar',run:()=>{S.hp=Math.min(20,S.hp+8);return['hp:+8'];}}]},
 smith:{n:'Herrero errante',ic:'🔨',txt:'Un herrero ambulante ha montado su yunque junto al camino. «Puedo mejorar tus defensas… por un precio.»',opts:[
  {l:'Encargo',c:'Pagas 100 🪙',req:()=>S.gold<100?'Necesitas 100 🪙':!S.list.some(t=>t.lvl===1&&!TW[t.type].uniq)?'No tienes torres de Nv 1':'',run:()=>{S.gold-=100;for(const t of S.list)if(t.lvl===1&&!TW[t.type].uniq)lvUp(t);return['temper'];}},
  {l:'Afilar',c:'Pagas 100 🪙',req:()=>S.gold<100?'Necesitas 100 🪙':!S.list.some(sharpOk)?'No tienes torres que hagan daño':'',run:()=>{S.gold-=100;S.sharp=1;return['sharpen'];}},
  {l:'Ayudar en la forja',c:'Durante esta oleada tus torres hacen un 20% menos de daño',run:()=>{S.forgeR=S.round;if(!S.relics.includes('hammer'))gainRelic('hammer');return['relic:hammer'];}}]},
 chest:{n:'Cofre sospechoso',ic:'📦',txt:'Un cofre abandonado en mitad del camino. Parece demasiado fácil.',opts:[
  {l:'Abrirlo',run:()=>{if(Math.random()<.5){setTimeout(()=>openRelic(),0);return['relicx'];}moreEnemies(.3);return['more:30'];}},
  {l:'Alimentar al cofre',c:'Pagas 50 🪙',req:()=>S.gold<50?'Necesitas 50 🪙':'',run:()=>{S.gold-=50;gainRelic('mimic');return['relic:mimic'];}}]},
 lighthouse:{n:'Faro en ruinas',ic:'🏚️',txt:'Un viejo faro de piedra, cubierto de hiedra. En lo alto aún brilla débilmente un cristal arcano.',opts:[
  {l:'Restaurar el faro',c:'Desmantelas 2 torres de Nv 1 (o pagas 50 🪙 por cada una que te falte)',req:()=>{const k=Math.min(2,lv1Count());return S.gold<(2-k)*50?'Necesitas '+((2-k)*50)+' 🪙':'';},run:()=>{const k=Math.min(2,lv1Count());S.gold-=(2-k)*50;S.dneed=k;S.dsel=[];S.uq.push({type:'faro',bk:EVK});return['tower:faro'];}},
  {l:'Encender una señal',run:()=>{lessEnemies(.25);return['less:25'];}},
  {l:'Explorar los alrededores',req:()=>freeSlot()?'':'No quedan huecos sin explorar junto al mapa',run:()=>{const k=freeSlot();if(k)S.chests[k]=1;return['scout'];}}]},
 nest:{n:'Nido abandonado',ic:'🪺',txt:'En un hueco entre las rocas descansa un huevo enorme, todavía caliente, sobre un lecho de brasas.',opts:[
  {l:'Llevarte el huevo',run:()=>{S.uq.push({type:'dragon',bk:EVK});return['tower:dragon'];}},
  {l:'Vender el huevo',c:'Dentro de 2 oleadas te ataca una Mamá dragona',run:()=>{goldEv(250);S.sched.push({r:S.round+2,add:{momdrg:1}});return['gold:250'];}},
  {l:'Recoger una brasa del nido',c:'Pierdes 3 de vida (te quemas al cogerla)',req:()=>S.hp<=3?'Necesitas más de 3 de vida':'',run:()=>{hpLoss(3);gainRelic('ember');return['relic:ember'];}}]},
 guild:{n:'Gremio de Aventureros',ic:'📋',txt:'Un grupo de aventureros busca dónde instalar su sede, y su tablón de encargos está lleno.',opts:[
  {l:'Fundar una sede',c:'Pagas 150 🪙',req:()=>S.gold<150?'Necesitas 150 🪙':'',run:()=>{S.gold-=150;S.uq.push({type:'guild',bk:EVK});return['tower:guild'];}},
  {l:'Aceptar un encargo',c:'Dentro de 2 rondas llega una Élite extra',run:()=>{S.sched.push({r:S.round+2,add:{wanted:1}});return['wanted'];}},
  {l:'Reclutar un mercenario',c:'Pagas 80 🪙',req:()=>S.gold<80?'Necesitas 80 🪙':'',run:()=>{S.gold-=80;gainRelic('badge');return['relic:badge'];}}]},
 pigs:{n:'Los tres cerditos',ic:'🐷',txt:'Tres cerditos corren hacia ti: «¡El lobo viene a por nuestras casas!» Cada uno te ruega que defiendas la suya.',opts:[
  {l:'Defender la casa de ladrillo',c:'Fácil: la próxima oleada trae una manada de Lobatos',run:()=>{addNow('cub',8);S.pend.push({r:S.round,bk:EVK,towers:['brick']});return['tower:brick'];}},
  {l:'Defender la casa de madera',c:'Media: la próxima oleada trae un Lobo gris',run:()=>{addNow('greyw',1);S.pend.push({r:S.round,bk:EVK,towers:['wood']});return['tower:wood'];}},
  {l:'Defender la casa de paja',c:'Difícil: la próxima oleada trae a El Lobo',run:()=>{addNow('bigw',1);S.pend.push({r:S.round,bk:EVK,towers:['straw']});return['tower:straw'];}},
  {l:'¡Defender todas las casas!',c:'La próxima oleada trae Lobatos, un Lobo gris y El Lobo',req:()=>pigDone()?'':'Se desbloquea al ganar una partida con cada una de las tres casas',run:()=>{addNow('cub',8);addNow('greyw',1);addNow('bigw',1);S.pend.push({r:S.round,bk:EVK,towers:['brick','wood','straw']});return['tower:brick','tower:wood','tower:straw'];}}]}
};
let EVK=null;
function optHtml(id,o,i,live){const known=memOf(id,i),why=live&&o.req?o.req():'';
 const desc=(o.c?`<small>${o.c}</small>`:'')+`<small>Obtienes: ${known.length?known.map(chip).join(' · '):'???'}</small>`;
 if(!live)return `<div class="evo"><b>${o.l}</b>${desc}</div>`;
 return `<button class="evo" data-a="evopt" data-i="${i}"${why?' disabled':''}><b>${o.l}</b>${desc}${why?`<small class="cd">🔒 ${why}</small>`:''}</button>`;}
function evBanner(){if(S.tut?TUTHS.event:(!OPT.hints||HSEEN.event))return '';hintSeen('event');return '<div class="hban">💡 Cada opción muestra siempre su coste. Lo que obtienes aparece como <b>???</b> hasta que eliges esa opción una vez; a partir de ahí lo recordarás.</div>';}
function eventCard(id){const E=EVENTS[id];return `<div class="evhead"><span class="evic">${E.ic}</span><b>${E.n}</b></div><small>${E.txt}</small>`+E.opts.map((o,i)=>optHtml(id,o,i,false)).join('');}
function openEvent(id,bk){const E=EVENTS[id];if(!E)return;see('ev',id);achieve('event');EVK=bk;RL.ev=id;closePrim();RL.open=true;const el=$('relic');el.classList.add('open');el.scrollTop=0;
 el.innerHTML=`<div class="evwin"><div class="evhead big"><span class="evic">${E.ic}</span><b>${E.n}</b></div><p>${E.txt}</p>${evBanner()}<div class="evopts">`+E.opts.map((o,i)=>optHtml(id,o,i,true)).join('')+'</div><small>Evento · el juego está en pausa.</small></div>'+wcompBtn('ev');}
function chooseEvent(i){const id=RL.ev,E=EVENTS[id],o=E&&E.opts[i];if(!o||(o.req&&o.req()))return;const keys=o.run()||[];remember(id,i,keys);
 const el=$('relic');el.innerHTML=`<div class="evwin"><div class="evhead big"><span class="evic">${E.ic}</span><b>${E.n}</b></div><p><b>${o.l}</b></p><div class="evres">${keys.map(chip).join('<br>')}</div><button class="go" data-a="evok">Continuar</button></div>`+wcompBtn('ev');
 renderRelics();ui();}
function closeEvent(){RL.open=false;RL.ev=null;$('relic').classList.remove('open');ui();if(S.sharp)startSharp();else if(S.dneed>0)startDism();else if(S.uq.length&&!RL.open)startUPlace();}
const sharpOk=t=>!TW[t.type].support&&!TW[t.type].faro;
function startSharp(){closePrim();S.aim='sharp';S.msg='Elige la torre que quieres afilar (+25% de daño permanente).';renderRelics();ui();}
function sharpAt(c){const t=S.occ[c.x+','+c.y];if(!t||!sharpOk(t)){S.msg='Elige una de las torres marcadas.';ui();return;}t.xd=(t.xd||1)*1.25;S.sharp=0;S.aim=null;S.msg=tinfo(t).n+' afilada: +25% de daño.';S.fx.push({x:t.x,y:t.y,t:.6,m:.6,r:1.5*K,col:'#e8e8f0'});renderRelics();ui();if(S.dneed>0)startDism();else if(S.uq.length)startUPlace();}
// Restaurar el faro: eliges torres de Nv 1 para desmantelar (no devuelven oro)
const lv1Ok=t=>t.lvl===1&&!TW[t.type].uniq,lv1Count=()=>S.list.filter(lv1Ok).length;
function setCD(id){S.usedAct=1;if((S.chestRel||[]).includes(id)){S.chestUsed=1;achieve('chest');}if(S.mimFor===id){S.rs.mimic.cd=RELIC.mimic.cd;S.mimFor=null;}else S.rs[id].cd=RELIC[id].cd;}
const idolPct=()=>typeof S!=='undefined'&&S&&S.idolN?Math.min(50,5*S.idolN):0;
const furyM=()=>S&&S.fury?1+.25*S.fury:1;
function furyTick(){if(S.phase!=='wave'||!S.furyAt)return;const F=S.wt>S.furyAt?Math.floor((S.wt-S.furyAt)/10)+1:0;if(F>(S.fury||0)){if(!S.fury){S.msg='¡Furia! Cada 10 s todos ganan +25% de daño.';hint('fury','Furia',[['Cuando una oleada se alarga demasiado, entra en juego la <b>Furia</b>, que hace que <b>todos</b> reciban un <span class="cd">+25% de daño</span> cada 10 s.',tgEl('#sr')],['Así ninguna oleada se atasca.',null]]);}S.fury=F;}}
// la experiencia viaja en bolitas desde el enemigo (al morir o al escapar) hasta el héroe, y se suma al llegar
function orbAdd(x,y,v){if(!(v>0)||!S.hero)return;(S.orbs=S.orbs||[]).push({x,y,v,t:0});}
function orbGround(x,y,v){if(!(v>0)||!S.hero||S.pvH||S.pvE)return;(S.gorbs=S.gorbs||[]).push({x,y,v,t:0});}
const ORBPICK=2*K;// distancia a la que el héroe recoge las bolas del suelo
function orbTick(dt){if(S.gorbs&&S.gorbs.length&&S.hero&&S.hero.s.hp>0){const q=S.hero.s;S.gorbs=S.gorbs.filter(o=>{o.t+=dt;if(Math.hypot(q.x-o.x,q.y-o.y)<=ORBPICK){(S.orbs=S.orbs||[]).push({x:o.x,y:o.y,v:o.v,t:0});return false;}return true;});}
if(!S.orbs||!S.orbs.length||!S.hero)return;const H=S.hero,q=H.s;
 S.orbs=S.orbs.filter(o=>{o.t+=dt;if(q.hp<=0){o.y+=Math.sin(o.t*4)*dt*.6;return true;}const dx=q.x-o.x,dy=q.y-o.y,d=Math.hypot(dx,dy),sp=(8+o.t*18)*(K/3);
  if(d<=sp*dt+.3){giveXp(H,o.v);return false;}o.x+=dx/d*sp*dt;o.y+=dy/d*sp*dt;return true;});}
function orbFlush(){if(S.orbs&&S.hero)for(const o of S.orbs)giveXp(S.hero,o.v);S.orbs=[];}
function hpLoss(n,en){if(S)S.chit=performance.now();if(S.st)S.st.hpL=(S.st.hpL||0)+n;if(en)hint('retry','Reintentar',[['Un enemigo ha llegado al núcleo y has perdido <b>vida</b>.',tgEl('#sh')],['Si una oleada sale mal, puedes repetirla desde el principio con este botón. Tiene cargas limitadas.',tgEl('#mtl [data-a="retry"]')]]);S.hp-=n;S.idolN=(S.idolN||0)+n;if(en)S.hpEn=(S.hpEn||0)+n;}
const interest=()=>Math.min(30,Math.floor(S.gold*.1/5)*5);
const heroHpM=()=>rp('badge')?1.15:1;
function heroSync(){const H=S.hero;if(!H)return;const q=H.s,m=hsAt(H.id,H.lvl).hp*heroHpM();if(Math.abs(q.max-m)>.01){const f=q.max>0?q.hp/q.max:1;q.max=m;if(q.hp>0)q.hp=m*f;}}
const EMR=3*K;
function castEmber(c){S.fz.push({x:c.x,y:c.y,r:EMR,t:8,tk:0,n:3*hpR(S.round)});S.rs.ember.t=8;setCD('ember');S.aim=null;S.msg='';S.fx.push({x:c.x,y:c.y,t:.5,m:.5,r:EMR,col:'#ff7a3c'});renderRelics();ui();}
function emberBurn(e,src,n){const had=e.bn>0,bs=e.bsrc;addBurn(e,src,n);if(had)e.bsrc=bs;}
function spawnMerc(){const H=S.hero;if(!H)return false;const p=H.pt,m={type:'guild',lvl:3,merc:1,cells:[],x:p.x,y:p.y,flag:p.flag,ab:{},acd:{},sd:[]},base=TW.guild.unit.hp*lvMods('guild',3,null).hp;
 m.sd=['war','heal'].map((c,i)=>{const hp=base*CLS[c].hp;return{i,x:H.s.x,y:H.s.y,hp,max:hp,en:null,cd:0,rt:0,tw:m,lock:false,fight:false,cls:c,rng:!!CLS[c].rng};});S.merc=m;S.fx.push({x:H.s.x,y:H.s.y,t:.6,m:.6,r:1.5*K,col:'#c9a24a'});return true;}
// Vales: up = cualquier torre de Nv 1-2 sube un nivel; l3 = solo torres de Nv 2, suben a Nv 3
const VCH={up:{n:'Vale de mejora',ic:'🎟️',ok:t=>t.lvl<3,d:'Una torre de Nv 1 o 2 sube un nivel gratis.'},l3:{n:'Vale de Nv 3',ic:'🎫',ok:t=>t.lvl===2,d:'Una torre de Nv 2 sube a Nv 3 gratis.'}};
const vchOk=(ty,t)=>!TW[t.type].uniq&&VCH[ty].ok(t);
function giveVch(ty,n){S.vch[ty]=(S.vch[ty]||0)+(n||1);renderRelics();hint('vch','Vales de mejora','Un vale sube gratis un nivel a una torre. Se guarda hasta que decidas usarlo: púlsalo y elige la torre.',tgEl('#relics [data-a="vch"]'));}
function useVch(ty){if(!(S.vch[ty]>0))return;if(S.aim==='vch'&&S.vty===ty){S.aim=null;S.msg='';renderRelics();ui();return;}if(S.aim){S.msg='Primero termina o cancela la acción en curso.';ui();return;}
 if(!S.list.some(t=>vchOk(ty,t))){S.msg=VCH[ty].n+': no tienes ninguna torre donde usarlo.';ui();return;}closePrim();S.aim='vch';S.vty=ty;S.msg='Elige la torre que quieres mejorar con el '+VCH[ty].n.toLowerCase()+' (Esc o el mismo icono para cancelar).';renderRelics();ui();}
function vchAt(c){const t=S.occ[c.x+','+c.y],ty=S.vty;if(!t||!vchOk(ty,t)){S.msg='Elige una de las torres marcadas.';ui();return;}lvUp(t);S.vch[ty]--;S.aim=null;S.msg=tinfo(t).n+' sube a Nv '+t.lvl+'.';S.fx.push({x:t.x,y:t.y,t:.6,m:.6,r:1.5*K,col:'#ffd75a'});renderRelics();ui();}
const vchInfo=ty=>`<div class="ttl"><b>${VCH[ty].ic} ${VCH[ty].n}</b> ×${S.vch[ty]||0}</div><small style="margin:0">${VCH[ty].d} ${kw('vch','Vale de mejora','')}: se guarda hasta que lo uses.</small>`;
// Animación del Martillo del herrero: dos martillazos con chispas sobre la torre
const HAMA=[];
function drawHammers(){const now=performance.now();for(let i=HAMA.length-1;i>=0;i--){const h=HAMA[i],el=(now-h.t0)/1000;if(el>1){HAMA.splice(i,1);continue;}
 const ph=(el%.45)/.45,ang=ph<.6?-1.1+ph/.6*1.6:.5-(ph-.6)/.4*1.6,cx=h.x*CS+CS/2,cy=h.y*CS+CS/2-K*CS*.35;
 g.save();g.translate(cx+K*CS*.45,cy);g.rotate(ang);g.font=Math.round(K*CS*.9)+'px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('🔨',-K*CS*.35,-K*CS*.2);g.restore();
 for(const st of[.27,.72])if(el>=st&&el<st+.22){const p=(el-st)/.22;g.strokeStyle='rgba(255,215,90,'+(1-p)+')';g.lineWidth=CS*.12;for(let k=0;k<7;k++){const a=k/7*Math.PI*2,r0=K*CS*.2,r1=r0+K*CS*.45*p;g.beginPath();g.moveTo(cx+Math.cos(a)*r0,cy+Math.sin(a)*r0+K*CS*.3);g.lineTo(cx+Math.cos(a)*r1,cy+Math.sin(a)*r1+K*CS*.3);g.stroke();}}}}
function relicHints(id){const sel='#relics [data-id="'+id+'"]';
 hint('relic','Reliquias',[['Las reliquias te ayudan solas durante toda la partida.',tgEl(sel)],['Si pulsas una, lanzas un efecto más potente, pero deja de ayudarte durante unas rondas.',tgEl(sel)]]);
 if(RELIC[id]&&RELIC[id].evr)hint('evrelic','Reliquias de evento','Esta es una reliquia de evento: solo se consigue en eventos concretos, nunca en cofres.',tgEl(sel));}
function hammerAt(c){const t=S.occ[c.x+','+c.y];if(!t||t.lvl>=3||TW[t.type].uniq){S.msg='Elige una torre de Nv 1 o 2.';ui();return;}HAMA.push({x:t.x,y:t.y,t0:performance.now()});lvUp(t);const st=S.rs.hammer;setCD('hammer');S.aim=null;S.msg=tinfo(t).n+' sube a Nv '+t.lvl+'.';S.fx.push({x:t.x,y:t.y,t:.6,m:.6,r:1.5*K,col:'#f0c040'});renderRelics();ui();}
function startDism(){closePrim();S.aim='dism';S.msg='Elige '+(S.dneed===1?'la torre de Nv 1':'las '+S.dneed+' torres de Nv 1')+' que quieres desmantelar para restaurar el faro ('+(S.dsel.length)+'/'+S.dneed+').';renderRelics();ui();}
function dismAt(c){const t=S.occ[c.x+','+c.y];if(!t||!lv1Ok(t)){S.msg='Elige una de las torres de Nv 1 marcadas.';ui();return;}
 if(S.dsel.includes(t))S.dsel=S.dsel.filter(o=>o!==t);else S.dsel.push(t);
 if(S.dsel.length<S.dneed){startDism();return;}
 for(const o of S.dsel){S.list=S.list.filter(x=>x!==o);for(const[a,b]of o.sq)delete S.occ[a+','+b];o.sold=1;S.fx.push({x:o.x,y:o.y,t:.5,m:.5,r:K,col:'#c9b8ff'});}
 S.dsel=[];S.dneed=0;S.aim=null;startUPlace();}
// ---- colocar torres únicas dentro de la pieza del evento ----
function uSpots(bk){const[bx,by]=bk.split(',').map(Number),o=[];for(let j=0;j<P;j++)for(let i=0;i<P;i++){const kx=bx*P+i,ky=by*P+j;if(S.cc[ky][kx]!==1)continue;const q={kx,ky,x:kx*K+1,y:ky*K+1};if(!S.occ[q.x+','+q.y])o.push(q);}
 if(o.length)return o;for(let ky=0;ky<NC;ky++)for(let kx=0;kx<NC;kx++){if(S.cc[ky][kx]!==1)continue;const q={kx,ky,x:kx*K+1,y:ky*K+1};if(!S.occ[q.x+','+q.y])o.push(q);}return o;}
function startUPlace(){if(!S.uq.length)return;closePrim();S.aim='uplace';S.selT=null;S.tsel=null;S.msg='Coloca la torre «'+TW[S.uq[0].type].n+'» en uno de los huecos marcados de la pieza del evento.';renderRelics();ui();}
function uPlaceAt(c){const u=S.uq[0];if(!u)return;const kx=Math.floor(c.x/K),ky=Math.floor(c.y/K),q=uSpots(u.bk).find(q=>q.kx===kx&&q.ky===ky);if(!q){S.msg='Elige uno de los huecos marcados.';ui();return;}
 const T=TW[u.type],tw={id:++S.tid,type:u.type,lvl:1,x:q.x,y:q.y,cells:[[q.x,q.y]],sq:sqCells(q),inv:0,spec:null,ab:{},acd:{},cd:0,tgt:null,mode:S.dtg[u.type]||'core',rd:S.round};
 see('tw',u.type);hint('uniq','Torres de evento','Las torres de evento solo se consiguen en eventos concretos. Son únicas: no se compran, no se venden y se mejoran a su manera.',tgCell(q.x,q.y,1.4));if(T.guild)mkGuild(tw);if(T.faro){tw.light=0;tw.lz=[{x:q.x,y:q.y}];tw.lzcd=[0,0];}if(T.dragon){tw.born=S.round;tw.stage=0;}
 S.list.push(tw);S.st.all.push(tw);for(const[a,b]of tw.sq)S.occ[a+','+b]=tw;S.uq.shift();
 if(S.uq.length)startUPlace();else{S.aim=null;S.msg=T.n+' colocada.';renderRelics();ui();}}
function roundRewards(){
 for(const t of S.list)if(TW[t.type].guild){const v=[10,20,35,50][t.lvl-1]||10;goldEv(v);}
 if(rp('scale')){const v=interest();if(v>0){goldEv(v);if(S.st)S.st.gRel+=v;}}
 const due=(S.pend||[]).filter(p=>p.r===S.round);S.pend=(S.pend||[]).filter(p=>p.r!==S.round);
 for(const p of due)for(const ty of p.towers)S.uq.push({type:ty,bk:p.bk});
 if(due.length)S.msg='¡Has defendido las casas! Coloca tu recompensa.';}
// ---- Faro arcano: no ataca, ilumina torres cercanas y sube de nivel con su daño ----
const FARO=[{r:3,rg:.2,d:0,c:0,need:0},{r:3.5,rg:.25,d:.05,c:0,need:2000},{r:4,rg:.3,d:.1,c:.05,need:6000},{r:4,rg:.3,d:.1,c:.05,need:15000}];
// zonas de luz del Faro: se proyectan en cualquier punto del mapa (1 zona; 2 en Nv 4). Si se solapan, sus mejoras se suman
const FCD=[10,8,6,5];
const faroZones=f=>{if(!f.lz)f.lz=[{x:f.x,y:f.y}];if((f.lvl||1)>=4&&!f.lz[1])f.lz[1]={x:f.x,y:f.y};return f.lz.slice(0,(f.lvl||1)>=4?2:1);};
const faroIn=(f,t)=>{const L=FARO[(f.lvl||1)-1];return faroZones(f).filter(z=>Math.hypot(t.x-z.x,t.y-z.y)<=L.r*K).length;};
function faroBuff(t){if(t.hero||!S||!S.list)return null;let best=null;for(const f of S.list){if(!TW[f.type]||!TW[f.type].faro||f===t)continue;const L=FARO[(f.lvl||1)-1],m=faroIn(f,t);if(!m)continue;const b={rg:L.rg*m,d:L.d*m,c:L.c*m};if(!best||b.rg>best.rg)best=b;}return best;}
function faroFeed(src,dl){if(!(dl>0))return;for(const f of S.faros){if(f===src)continue;if(!faroIn(f,src))continue;f.light=(f.light||0)+dl;while((f.lvl||1)<4&&f.light>=FARO[f.lvl||1].need){f.lvl=(f.lvl||1)+1;S.fx.push({x:f.x,y:f.y,t:.8,m:.8,r:2*K,col:'#ffe27a'});S.msg='El Faro arcano sube a Nv '+f.lvl+'.';}}}
function drawFaros(){for(const f of S.list){if(!TW[f.type].faro)continue;const L=FARO[(f.lvl||1)-1],cx=f.x*CS+CS/2,cy=f.y*CS+CS/2,R=L.r*K*CS;
 for(const z of faroZones(f)){const zx=z.x*CS+CS/2,zy=z.y*CS+CS/2,d=Math.hypot(zx-cx,zy-cy);
  if(d>CS){const gr=g.createLinearGradient(cx,cy,zx,zy);gr.addColorStop(0,'rgba(255,236,150,.32)');gr.addColorStop(1,'rgba(255,236,150,.06)');const a=Math.atan2(zy-cy,zx-cx),w0=CS*.35,w1=Math.min(R*.9,CS*2.2);
   g.fillStyle=gr;g.beginPath();g.moveTo(cx+Math.cos(a+Math.PI/2)*w0,cy+Math.sin(a+Math.PI/2)*w0);g.lineTo(zx+Math.cos(a+Math.PI/2)*w1,zy+Math.sin(a+Math.PI/2)*w1);g.lineTo(zx+Math.cos(a-Math.PI/2)*w1,zy+Math.sin(a-Math.PI/2)*w1);g.lineTo(cx+Math.cos(a-Math.PI/2)*w0,cy+Math.sin(a-Math.PI/2)*w0);g.closePath();g.fill();}
  const rg=g.createRadialGradient(zx,zy,0,zx,zy,R);rg.addColorStop(0,'rgba(255,236,150,.16)');rg.addColorStop(1,'rgba(255,226,122,.05)');g.fillStyle=rg;g.strokeStyle='rgba(255,226,122,.5)';g.lineWidth=CS*.08;g.beginPath();g.arc(zx,zy,R,0,7);g.fill();g.stroke();}}
 // vista previa al elegir dónde proyectar la luz
 if(S.aim==='faroz'&&S.hover){const f=S.list.find(o=>o.id===S.flzSel.id);if(f){const L=FARO[(f.lvl||1)-1],R=L.r*K*CS,h=S.hover;g.setLineDash([CS*.3,CS*.2]);g.strokeStyle='rgba(255,236,150,.9)';g.lineWidth=CS*.1;g.beginPath();g.arc(h.x*CS+CS/2,h.y*CS+CS/2,R,0,7);g.stroke();g.setLineDash([]);}}}
// ---- casas de los cerditos ----
const logDur=lv=>2+.5*((lv||1)-1);
function logShot(t,tg,s,dm){const sq0=sqOf(Math.round(tg.tx),Math.round(tg.ty)),fv=(kx,ky)=>{const v=S.field&&S.field[ky*K+1]?S.field[ky*K+1][kx*K+1]:1e9;return v<1e9?v:-1;};
 // recorrido por los centros de casilla del camino, en sentido contrario al de los enemigos (hacia más lejos del núcleo)
 const pts=[[sq0.x,sq0.y]];let kx=sq0.kx,ky=sq0.ky;for(let n=0;n<12;n++){const f0=fv(kx,ky);let b=null;for(const[a,c]of D){const nx=kx+a,ny=ky+c;if(!inbc(nx,ny)||S.cc[ny][nx]!==2)continue;const f1=fv(nx,ny);if(f1>f0&&(!b||f1>b.f))b={x:nx,y:ny,f:f1};}if(!b)break;kx=b.x;ky=b.y;pts.push([kx*K+1,ky*K+1]);}
 if(pts.length<2){pts.push([pts[0][0]+(tg.x-t.x>0?K:-K),pts[0][1]]);}
 (S.logs=S.logs||[]).push({pts,d:0,t:s.ldur||logDur(t.lvl),sp:2*K,dm,src:t,pen:s.pen,hit:[]});}
function logTick(dt){if(!S.logs||!S.logs.length)return;
 S.logs=S.logs.filter(L=>{L.t-=dt;L.d+=L.sp*dt;let d=L.d,i=0;while(i<L.pts.length-1){const sl=Math.hypot(L.pts[i+1][0]-L.pts[i][0],L.pts[i+1][1]-L.pts[i][1]);if(d<=sl)break;d-=sl;i++;}
  if(i>=L.pts.length-1||L.t<=0)return false;const a=L.pts[i],b=L.pts[i+1],sl=Math.hypot(b[0]-a[0],b[1]-a[1])||1;L.x=a[0]+(b[0]-a[0])*d/sl;L.y=a[1]+(b[1]-a[1])*d/sl;L.ang=Math.atan2(b[1]-a[1],b[0]-a[0]);
  for(const e of S.enemies){if(e.hp<=0||L.hit.includes(e))continue;if(Math.hypot(e.x-L.x,e.y-L.y)<=.6*K){L.hit.push(e);hurt(e,L.dm,L.src,'phys',L.pen);if(e.hp>0)knock(e,.5*K);}}return true;});}
function drawLogs(lw){for(const L of S.logs||[]){if(L.x===undefined)continue;const px=L.x*CS+CS/2,py=L.y*CS+CS/2,len=K*CS*.86,th=K*CS*.32;g.save();g.translate(px,py);g.rotate(L.ang+Math.PI/2);
 g.fillStyle='#8a5a2b';g.fillRect(-len/2,-th/2,len,th);g.strokeStyle='#5a3a1a';g.lineWidth=lw(1.5);g.strokeRect(-len/2,-th/2,len,th);const ph=(L.d/(K*.4))%1;for(let k=0;k<5;k++){const yy=-th/2+((k/5+ph)%1)*th;g.beginPath();g.moveTo(-len/2,yy);g.lineTo(len/2,yy);g.stroke();}
 g.fillStyle='#c79a5a';for(const sx of[-1,1]){g.beginPath();g.ellipse(sx*len/2,0,th*.18,th/2,0,0,7);g.fill();g.stroke();}g.restore();}}
function wallShot(t,s,prog){let be=null;for(const e of S.enemies){if(e.hp<=0||Math.hypot(e.x-t.x,e.y-t.y)>s.range)continue;if(!be||prog(e)<prog(be))be=e;}
 if(!be){t.cd=0;return;}const b=barrPick(Math.round(be.tx),Math.round(be.ty));if(b){S.barr.push({t:4,...b,brick:1});S.fx.push({x:b.x,y:b.y,t:.4,m:.4,r:K,col:'#c0563a'});}}
// ---- lobos ----
function wolfTick(dt){for(const t of S.list)if(t.curse>0)t.curse-=dt;
 for(const e of S.enemies){if(e.hp<=0)continue;const E=ET[e.t];
 if(E.curse){e.cu=(e.cu===undefined?3:e.cu)-dt;if(e.cu<=0){let b=null,bd=4*K;for(const t of S.list){if(TW[t.type].uniq)continue;const d=Math.hypot(t.x-e.x,t.y-e.y);if(d<=bd){bd=d;b=t;}}if(b){e.cu=8;b.curse=5;S.fx.push({x:b.x,y:b.y,t:.5,m:.5,r:1.2*K,col:'#b05ad0'});}else e.cu=.5;}}
 if(E.eheal){e.eh=(e.eh===undefined?6:e.eh)-dt;if(e.eh<=0){e.eh=6;const nw=S.wt||0;for(const o of S.enemies)if(o.hp>0&&!(ET[o.t]&&ET[o.t].eheal)&&!(o.hlt!==undefined&&nw-o.hlt<5.9&&nw>=o.hlt)&&Math.hypot(o.x-e.x,o.y-e.y)<=2.5*K){o.hlt=nw;o.hp=Math.min(o.max,o.hp+o.max*.1);}S.fx.push({x:e.x,y:e.y,t:.5,m:.5,r:2.5*K,col:'#6fe0a0'});}}
 if(E.breath){e.br=(e.br||6)-dt;if(e.br<=0){e.br=6;let n=0;for(const t of unitTowers())for(const s of t.sd)if(s.hp>0&&Math.hypot(s.x-e.x,s.y-e.y)<=1.5*K){s.hp-=15;n++;if(S.pvE&&S.dn)dnAdd(s,15,'taken');if(s.hp<=0&&ra('banner'))s.hp=1;if(s.hp<=0){s.rt=unitOf(t).rez*(rp('banner')?.7:1);s.en=null;s.fight=false;}}S.fx.push({x:e.x,y:e.y,t:.5,m:.5,r:1.5*K,col:'#ff7a3c'});}}
 if(E.howl&&!e.howled&&e.hp<e.max/2){e.howled=1;for(const o of S.enemies)if(o.t==='cub'&&Math.hypot(o.x-e.x,o.y-e.y)<=3*K)o.fx.haste={m:1.2,t:3};S.fx.push({x:e.x,y:e.y,t:.6,m:.6,r:3*K,col:'#c8c8d0'});}
 if(E.blow){e.bw=(e.bw||5)-dt;if(e.bw<=0){e.bw=5;S.barr=S.barr.filter(b=>segD(e.x+.5,e.y+.5,b.seg)>2*K);
  for(const t of unitTowers())for(const s of t.sd)if(s.en===e&&s.hp>0){const dx=s.x-e.x,dy=s.y-e.y,d=Math.hypot(dx,dy)||1;s.x+=dx/d*K;s.y+=dy/d*K;s.en=null;s.fight=false;s.lock=true;}
  S.fx.push({x:e.x,y:e.y,t:.5,m:.5,r:2*K,col:'#d8e4f0'});}}}}
// ---- Sede del Gremio: grupo de aventureros por rango ----
const CLS0={d:1,rt:1,cr:0,hp:1,ap:0},CLS={war:{n:'Espadachín',d:1,rt:1,cr:0,hp:1,ap:0},tank:{n:'Protector',d:.5,rt:1,cr:0,hp:2,ap:15},mage:{n:'Mago',d:1.2,rt:1,cr:0,hp:.7,ap:0,rng:1},rogue:{n:'Pícaro',d:1,rt:1.6,cr:.2,hp:.7,ap:0},heal:{n:'Sanador',d:.4,rt:1,cr:0,hp:.8,ap:0,rng:1}};
const PARTY={1:['war','war','war'],2:['war','war','mage'],3:['tank','war','mage'],4:['tank','rogue','mage','heal']},RANKS=['C','B','A','S'];
function mkGuild(t){const U=TW[t.type].unit,base=U.hp*lvMods(t.type,t.lvl,null).hp;t.sd=PARTY[t.lvl].map((c,i)=>{const m=base*CLS[c].hp;return{i,x:t.x,y:t.y,hp:m,max:m,en:null,cd:0,rt:0,tw:t,lock:true,fight:false,cls:c,rng:!!CLS[c].rng};});if(t.flag)setFlag(t,t.flag);}
function guildHeal(dt){for(const t of unitTowers()){if(!(TW[t.type]||{}).guild||!t.sd)continue;const pool=t.merc&&S.hero?t.sd.concat([S.hero.s]):t.sd;for(const s of t.sd){if(s.cls!=='heal'||s.hp<=0)continue;s.hc=(s.hc||4)-dt;if(s.hc>0)continue;s.hc=4;let lo=null;for(const q of pool)if(q.hp>0&&q.hp<q.max&&(!lo||q.hp/q.max<lo.hp/lo.max))lo=q;if(lo){lo.hp=Math.min(lo.max,lo.hp+lo.max*.15);S.fx.push({x:lo.x,y:lo.y,t:.5,m:.5,r:.8*K,col:'#8ff0a0'});}}}}
// disparo de unidades a distancia (magos y sanadores del gremio, dragón bebé)
function unitShoot(s,dt){const t=s.tw,st=stats(t),C=CLS[s.cls]||CLS0,drag=!!s.drag;s.cd-=dt;let tg=s.fight?s.en:null;const rg=drag?2.5*K:st.range;
 if(!tg){let bd=rg;for(const e of S.enemies)if(e.hp>0&&!ET[e.t].dodge){const d=Math.hypot(e.x-s.x,e.y-s.y);if(d<=bd){bd=d;tg=e;}}}
 if(!tg){s.cd=Math.max(s.cd,0);if(!s.en)uRegen(s,dt);return;}
 const rate=drag?1/1.2:st.rate*C.rt,base=drag?8:st.dmg*C.d,ty=drag?'elem':s.cls==='mage'?'magic':'phys';
 let n=0;while(s.cd<=0&&n++<4){s.cd+=1/rate;const crit=Math.random()<st.crit+mkB(tg),dm=base*(crit?st.critm:1)*(1+(s.ren||0));
  if(s.fight){hurt(tg,dm*(drag?.7:HMELEE),t,ty,st.pen);if(crit)critMark(tg);}
  else{const sp=s.pig==='straw'?PIGU.straw:null;S.proj.push({x:s.x,y:s.y,e:tg,tx:tg.x,ty:tg.y,vx:0,vy:0,dm,dt:ty,src:t,sp:12,area:drag?.4*K:s.cls==='mage'?.5*K:sp?.5*K:0,slow:sp?sp.slow:0,slowt:sp?sp.slowt:0,slowA:!!sp,pen:st.pen,col:drag?'#ff8a3c':s.cls==='mage'?'#a58bff':sp?'#e8cf6a':'#8ff0a0',crit});}}}
// ---- Huevo de dragón: huevo → bebé (en el camino, bloquea) → adulto (vuela alrededor de su bandera) ----
function dragonGrow(){for(const t of S.list){if(!TW[t.type].dragon)continue;const st=DRGST(S.round-t.born);if(st===t.stage)continue;t.stage=st;
 if(st===1){t.sd=[{i:0,x:t.x,y:t.y,hp:60,max:60,en:null,cd:0,rt:0,tw:t,lock:true,fight:false,rng:1,drag:1}];autoFlag(t);S.msg='¡El huevo de dragón ha eclosionado! Coloca su bandera en el camino.';}
 if(st===2){reveal('drag2');t.sd=[];t.fly={a:0,cd:0};if(!t.flag)autoFlag(t);S.msg='¡Tu dragón ya es adulto y vuela!';}
 if(st===3){reveal('drag3');t.sd=[];t.fly=t.fly||{a:0,cd:0};t.fly.br=2;if(!t.flag)autoFlag(t);S.msg='¡Tu dragón se ha convertido en un Dragón anciano! Ahora también lanza llamaradas.';}}}
function dragonAdults(dt){for(const t of S.list){if(!t.fly||!t.flag)continue;t.fly.a+=dt*1.2;const fx=t.flag.x+Math.cos(t.fly.a)*1.5*K,fy=t.flag.y+Math.sin(t.fly.a)*1.5*K;t.fly.x=fx;t.fly.y=fy;
 t.fly.cd-=dt;if(t.fly.cd>0)continue;let tg=null,bd=3.5*K;for(const e of S.enemies)if(e.hp>0){const d=Math.hypot(e.x-fx,e.y-fy);if(d<=bd){bd=d;tg=e;}}if(!tg){t.fly.cd=0;continue;}
 t.fly.cd=1.5;const st=stats(t),crit=Math.random()<st.crit+mkB(tg),old=t.stage>=3;S.proj.push({x:fx,y:fy,e:tg,tx:tg.x,ty:tg.y,vx:0,vy:0,dm:(old?22:18)*(crit?st.critm:1),dt:'elem',src:t,sp:10,area:old?1.2*K:K,slow:0,pen:0,col:'#ff6a2e',crit});
 if(old){t.fly.br=(t.fly.br===undefined?2:t.fly.br)-1.5;if(t.fly.br<=0){t.fly.br=DBRCD;dragonBreath(t,fx,fy,tg);}}}}
// Dragón anciano: llamarada en cono que quema y deja charcos de fuego en el camino
function dragonBreath(t,fx,fy,tg){const a=Math.atan2(tg.y-fy,tg.x-fx),L=3*K;
 for(const e of S.enemies){if(e.hp<=0)continue;const dx=e.x-fx,dy=e.y-fy,d=Math.hypot(dx,dy);if(d>L)continue;let da=Math.abs(Math.atan2(dy,dx)-a);if(da>Math.PI)da=2*Math.PI-da;if(da<=Math.PI/6||e===tg)addBurn(e,t,DBRN);}
 for(let i=1;i<=4;i++){const x=fx+Math.cos(a)*L*i/4,y=fy+Math.sin(a)*L*i/4,cx=Math.round(x),cy=Math.round(y);S.fx.push({x,y,t:.5,m:.5,r:(.4+.15*i)*K,col:'#ff7a2e'});
  if(inb(cx,cy)&&S.cells[cy][cx]===2&&!S.pools.some(p=>p.src===t&&Math.hypot(p.x-x,p.y-y)<.8*K))S.pools.push({x,y,t:4,n:1,tk:0,src:t,r:.6*K,el:'fire'});}}
function drawDragons(){for(const t of S.list){if(!t.fly||t.fly.x===undefined)continue;const px=t.fly.x*CS+CS/2,py=t.fly.y*CS+CS/2;g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(px,py+CS*1.6,CS*1.2,CS*.5,0,0,7);g.fill();
 if(t.stage>=3){g.fillStyle='rgba(255,110,40,.25)';g.beginPath();g.arc(px,py,CS*2,0,7);g.fill();}g.font=Math.round(CS*(t.stage>=3?3.3:2.6))+'px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('🐉',px,py);}}
// ---- ficha de las torres únicas ----
function uniqInfo(t,k,lvo){const T=TW[k],src=t?'tw:'+t.id:'shop:'+k,X=t?tinfo(t):T,pin=t&&PR.pinned&&PR.key===src,ev=EVENTS[T.ev],CL=lvo||(t?(T.dragon?(t.stage||0)+1:t.lvl||1):1);
 let h=`<div class="ttl"><b>${X.ic} ${X.n}</b>${t&&(T.guild||T.pig)?' · '+kst('lvl','Nv '+t.lvl,src):''}<br><small style="margin:0">Torre única · evento «${ev?ev.n:''}»</small></div>`;
 if(T.faro){const lv=CL,L=FARO[lv-1];h+=R('cd',kst('dmg','Daño',src),0)+R('ca','Radio',f(L.r)+' casillas')+R('cg','Alcance a torres iluminadas','+'+Math.round(L.rg*100)+'%')+(lv>=2?R('cd','Daño a torres iluminadas','+'+Math.round(L.d*100)+'%'):'')+(lv>=3?R('ccl','Enfriamiento de torres iluminadas','−'+Math.round(L.c*100)+'%'):'');
  h+=t&&lv<4?R('gd','Luz',fi(t.light||0)+' / '+fi(FARO[lv].need)):'';h+='<small>'+['No ataca: proyecta una zona de luz que puedes mover a cualquier parte del mapa (🔦 en su menú). Mejora las torres de dentro y acumula luz con el daño que hacen. Con 2.000 de luz sube a Nv 2.','Ahora también da daño a las torres que ilumina. Con 6.000 de luz sube a Nv 3.','Ahora también reduce el enfriamiento de las torres que ilumina. Con 15.000 de luz sube a Nv 4.','Gana una segunda zona de luz que también puedes mover. Si las pones una encima de otra, sus mejoras se suman.'][lv-1]+'</small>';}
 else if(T.dragon){const sg=CL-1;h+=R('','Forma',DRAG[sg].n)+(sg===0?R('cd',kst('dmg','Daño',src),0):sg===1?R('cd',kst('dmg','Daño',src)+' (fuego)',8)+R('ca','Área','0,4 casillas')+R('cg','Rango','2,5 casillas')+R('cd','Daño con garras','70%')+R('chp','Vida',60):sg===2?R('cd',kst('dmg','Daño',src)+' (bola de fuego)',18)+R('ca','Área','1 casilla')+R('cg','Rango','3,5 casillas'):R('cd',kst('dmg','Daño',src)+' (bola de fuego)',22)+R('ca','Área','1,2 casillas')+R('cg','Rango','3,5 casillas')+R('cd','Llamarada',DBRN+' stacks de '+kw('burn','Quemadura',src))+R('ccl','Enfriamiento de la llamarada',DBRCD+' s')+R('cr',kst('dur','Duración',src)+' de los charcos','4 s'))+
  (t&&sg<3&&!lvo?R('cr','Siguiente fase','ronda '+(t.born+DRGAT[sg+1])):'')+'<small>'+['Todavía no hace nada. '+(()=>{const a=['eclosiona a las 3 rondas'];if(revd('drag2')||revd('drag3'))a.push('es adulto a las 6');if(revd('drag3'))a.push('anciano a las 10');return (a.length>1?a.slice(0,-1).join(', ')+' y '+a[a.length-1]:a[0]).replace(/^e/,'E')+'.';})(),'Se coloca en el camino, bloquea y escupe fuego; si le alcanzan, ataca con garras. Si cae, reaparece.','Vuela en círculos alrededor de su bandera y lanza bolas de fuego con más área. No bloquea, y solo pueden atacarle los enemigos a distancia.','Vuela como el adulto, con bolas de fuego más fuertes y más área. Cada 8 s lanza una llamarada en cono (3 casillas) que aplica mucha quemadura y deja charcos de fuego en el camino durante 4 s.'][sg]+'</small>';
  if(pin&&sg>=1)h+=`<div class="tgt"><button data-a="flag" data-id="${t.id}">🚩 Mover bandera</button></div>`;}
 else if(T.guild){const lv=CL,Lm=lvMods(k,lv,null),bd=T.dmg*Lm.dmg,bh=T.unit.hp*Lm.hp;h+='<div class="usub"><b>Estadísticas de unidades</b>'+R('','Aventureros',PARTY[lv].length)+PARTY[lv].map((c,i)=>R('','· '+CLS[c].n,`<span class="cd">${f(bd*CLS[c].d)}</span> daño · <span class="chp">${Math.round(bh*CLS[c].hp)}</span> vida`+(t&&!lvo&&t.sd&&t.sd[i]&&t.sd[i].ren?` · <span class="gd">Renombre +${Math.round(t.sd[i].ren*100)}%</span>`:''))).join('')+'</div>'+(lv>=4?'<small><b>Renombre</b>: cuando un aventurero mata a una Mini-élite, una Élite o un Jefe (que no sea el final), todo el grupo gana un 5%, 10% o 15% de daño y vida, sin límite. Quien cae pierde el suyo.</small>':'')+R('gd','Recompensa por ronda',[10,20,35,50][lv-1]+' 🪙')+R('gd','Botín','+25% de oro por baja');
  if(pin){if(lv<4){const c=T.upc[lv+1];h+=`<div class="tgt"><button data-a="gup" data-id="${t.id}">⬆ Subir a rango ${RANKS[lv]} (<span class="gd">−${c} 🪙</span>)</button></div>`;}h+=`<div class="tgt"><button data-a="flag" data-id="${t.id}">🚩 Mover bandera</button></div>`;}}
 else{const lv=T.pig?CL:Math.min(3,CL),L=lvMods(k,lv,null),s=t&&!lvo?stats(t):{dmg:T.dmg*L.dmg,rate:T.rate/L.cd,range:T.range*L.range,crit:CRIT,critm:2,area:(T.splash||0)*L.area,pen:0,ldur:T.log?logDur(lv):0};
  if(CL>=4&&!T.pig)h+='<small>Nv 4: su habilidad está por definir.</small>';else h+=rows(s,T,src,'');
  h+=`<small>${T.log?'Lanza troncos que ruedan por el camino hacia los portales: dañan y empujan a todos los enemigos con los que se cruzan.':T.wall?'Un cerdito albañil levanta un muro delante del enemigo más avanzado dentro de su rango.':'Lanza fardos de paja que dañan y ralentizan mucho a todos los enemigos del área.'}</small>`;
  if(T.pig&&CL>=4){const P=PIGU[k];h+=`<div style="margin-top:8px"><b>${P.ic} ${P.n}</b> <small style="display:inline">· unidad de Nv 4</small></div>`+R('chp','Vida',P.hp)+R('cph',kst('aphys','Armadura',src),P.ap)+R('cd',kst('dmg','Daño',src),f(P.dmg)+(P.rng?' (a distancia)':' (cuerpo a cuerpo)'))+R('ccl','Enfriamiento',f(1/P.rate)+' s')+R('',kst('hblk','Corpulencia',src),'Bloquea hasta 2')+R('cr','Reaparece','10 s')+'<small>'+P.d+' Pelea en la bandera de la casa, dentro de su rango.</small>'+(revd('mech')?'<small>Con las tres casas a Nv 4, los cerditos pueden unirse en el 🤖 <b>¡Mecha Cerdito!</b></small>':'');
   if(pin)h+=`<div class="tgt"><button data-a="flag" data-id="${t.id}">🚩 Mover bandera</button></div>`;}
  if(pin&&t.lvl<(T.pig?4:3)){const c=upCost(T,t.lvl+1);h+=`<div class="tgt"><button data-a="up" data-id="${t.id}">⬆ Mejorar a Nv ${t.lvl+1} (${upLbl(c)})</button></div>`;}}
 if(pin)h+='<small>Las torres únicas no se pueden vender.</small>';return h;}
function guildUp(t){if(!t||!TW[t.type].guild||t.lvl>=4||!(S.phase==='build'||S.phase==='wave'||S.phase==='place'))return;const c=TW[t.type].upc[t.lvl+1];if(S.gold<c){S.msg='Oro insuficiente.';ui();return;}
 S.gold-=c;S.st.spent+=c;t.lvl++;t.inv=(t.inv||0)+c;mkGuild(t);if(t.lvl>=4)S.guildS=1;S.msg='La Sede del Gremio sube a rango '+RANKS[t.lvl-1]+'.';refreshPrim();ui();}

