// ==================== v305 · Historia de la era 2: Kai, el reencuentro de Vega y Ferro, y Korr al salir de la cápsula ====================
// Kai (CERRADO en plan_era2): solo jugando con Vega, en una ronda de jefe de la Era Distópica (con 15 rondas o más, siempre la 15).
// Kai aparece cazando al jefe; pelea esa oleada como aliada controlada por la máquina (cerca de tu héroe, a por el jefe).
// v305: logro de historia, sin dificultad añadida: si vences a ese jefe con su ayuda (el jefe no llega al núcleo), Kai se une: «Caza mayor» y héroe desbloqueado.
ACH.caza={c:'jg',n:'Caza mayor',d:'Con Vega, derrota junto a Kai al jefe de la Era Distópica que ella está cazando.',hr:'kai'};
if(typeof ACHVIS!=='undefined')ACHVIS.caza=()=>typeof era2Ok==='function'&&era2Ok();
HUNL.kai='caza';
// el logro antiguo (3 élites) desaparece: quien lo tuviera vuelve a tener a Kai bloqueada hasta vivir su historia
try{if(ACHS.bounty){delete ACHS.bounty;localStorage.setItem('rt-ach',JSON.stringify(ACHS));}}catch(e){}
try{h2Locks();}catch(e){}
DLGC.kai='#e0b070';DLGC.ferro='#9fd6ff';DLGC.korr='#3fc9b0';
const KAIL={
 start:[{sp:'Kai',who:'kai',t:'Ese jefe tiene precio. Y es mío.'},
  {sp:'Vega',t:'¿Y tú quién eres? Esto es una operación de la Resistencia.'},
  {sp:'Kai',who:'kai',t:'Kai. Cazarrecompensas. Vosotros lleváis meses «operando» y la Forja sigue en pie.'},
  {sp:'Vega',t:'{N}, no me fío de ella. Pero si quiere ayudarnos con ese jefe, que ayude.'}],
 win:[{sp:'Kai',who:'kai',t:'Pieza cobrada. Puede que no seáis tan inútiles.'},
  {sp:'ÉTER',g:0,t:'Kai. Tengo algo que solo yo puedo darte. Quédate con nosotros y hablamos de tu precio.'},
  {sp:'Kai',who:'kai',t:'…Trato hecho. Pero cobro por adelantado.'},
  {sp:'Vega',t:'Genial. Otra que no sigue órdenes. Bienvenida… supongo.'}],
 lose:[{sp:'Kai',who:'kai',t:'Demasiado lentos. Así no se caza nada.'},
  {sp:'Vega',t:'Mejor así. Ya volverá a cruzarse en nuestro camino, {N}.'}]};
function kaiRound(){try{if(!S||S.tut||S.pvE||PREVIEWING||S.era!==2||!S.hero||S.hero.id!=='vega'||h2Has('kai'))return false;return ROUNDS>=15?S.round===15:bossRound(S.round);}catch(e){return false;}}
function mkKai(){const H=S.hero,f0=(H&&H.pt&&H.pt.flag)||S.core;const k=1+.06*Math.max(0,S.round-1),hp=170*k;
 const t={type:'bastion',lvl:3,summ:1,kai:1,ttl:9999,tinf:{n:'Kai',ic:(HEROES.kai||{}).ic||'🗡️',col:(HEROES.kai||{}).col||'#8a5a3a',dt:'phys',range:2.5,dmg:18,rate:1.4,unit:{n:1,hp:170,ap:10,rez:12,spd:2.6*K}},
  x:f0.x,y:f0.y,cells:[],flag:{x:f0.x,y:f0.y},ab:{},acd:{},sd:[],uov:{n:1,hp,ap:10,rez:12,spd:2.6*K},ovr:{dmg:18*k,rate:1.4,range:2.5*K,crit:.15,critm:2,area:0,gold:0,pen:10},alert:2.6*K};
 t.sd=[{i:0,x:f0.x,y:f0.y,hp,max:hp,en:null,cd:0,rt:0,tw:t,lock:false,fight:false,wt:1,ally:1,port:'kai'}];(S.summ=S.summ||[]).push(t);S.kaiT=t;
 S.fx.push({x:f0.x,y:f0.y,t:.6,m:.6,r:1.2*K,col:'#e0b070'});return t;}
// la máquina la lleva: a por el jefe si está en el camino; si no, junto a tu héroe
function kaiEvTick(dt){const t=S.kaiT;if(!t||S.phase!=='wave')return;t.kc=(t.kc||0)-dt;if(t.kc>0)return;t.kc=.5;
 const b=S.enemies.find(e=>e.hp>0&&!e.leak&&isBoss(e)&&!isFly(e));let p=null;
 if(b){p={x:Math.round(b.x),y:Math.round(b.y)};}else{const H=S.hero;if(H&&H.s)p={x:Math.round(H.s.x),y:Math.round(H.s.y)};}
 if(!p||!inb(p.x,p.y)||S.cells[p.y][p.x]!==2)return;if(t.flag&&t.flag.x===p.x&&t.flag.y===p.y)return;try{setFlag(t,p);}catch(e){}}
H2T.push(dt=>{try{kaiEvTick(dt);}catch(e){}});
{const _sw=startWave;startWave=function(){const was=S.phase;const r=_sw.apply(this,arguments);
 try{if(was!=='wave'&&S.phase==='wave'&&kaiRound()&&!S.kaiEv){S.kaiEv={hp0:S.hp,r:S.round};mkKai();dlgQueue(KAIL.start);}}catch(e){}return r;};}
// fin de la oleada: ¿perfecta?
{const _nr=nextRound;nextRound=function(){const ev=S&&S.kaiEv&&S.kaiEv.r===S.round?S.kaiEv:null,ok=!!ev&&S.hp>0;const r=_nr.apply(this,arguments);
 try{if(ev){S.kaiEv.done=1;S.kaiT=null;if(ok){achieve('caza');try{h2Locks();}catch(e){}dlgQueue(KAIL.win);}else dlgQueue(KAIL.lose);}}catch(e){}return r;};}
// ---- reencuentro de Vega y Ferro: al derrotar a la Forja, Vega lo encuentra entre los restos ----
const FERL=[{sp:'Vega',t:'Espera… esa placa. FR-0. ¿Ferro? ¡Ferro!'},
 {sp:'Ferro',who:'ferro',t:'UNIDAD FR-0… REINICIANDO. IDENTIFICACIÓN: VEGA. PRIORIDAD: PROTEGER.'},
 {sp:'Vega',t:'La Forja te volvió a atrapar en el cataclismo… Creía que te había perdido.'},
 {sp:'Ferro',who:'ferro',t:'PROTOCOLO DE LEALTAD: INTACTO. REPROGRAMACIÓN DE VEGA: INTACTA. LISTO PARA SERVIR.'},
 {sp:'ÉTER',g:0,t:'Un robot de seguridad de la Forja de nuestro lado, {N}. Esto puede cambiarlo todo.'}];
// ---- Korr al salir de la cápsula: habla en símbolos, con alguna palabra suelta ----
const KORRL=[{sp:'Korr',who:'korr',t:'⟒⌇⍜… ⋔⏃… ¿hu… ma… no?'},
 {sp:'Vega',t:'Está vivo. Y creo que… intenta hablar.'},
 {sp:'Korr',who:'korr',t:'⟁⌖ ⍜⟒ ☍. Korr. ⌖ amigo.'},
 {sp:'ÉTER',g:0,t:'Se llama Korr. Llevaba mucho tiempo congelado ahí dentro… y creo que acaba de elegir bando.'}];
{const _u=h2Unlock;h2Unlock=function(id,why){const nw=!h2Has(id);const r=_u.apply(this,arguments);try{if(nw&&h2Has(id)){if(id==='ferro')setTimeout(()=>dlgQueue(FERL),400);else if(id==='korr')setTimeout(()=>dlgQueue(KORRL),300);}}catch(e){}return r;};}
// Korr como héroe: frases simples con algún símbolo, al empezar la primera partida con él
{const _cg=chooseHero;chooseHero=function(id){const r=_cg.apply(this,arguments);try{if(id==='korr'&&!STO.korr1&&!(S&&S.tut)){STO.korr1=1;saveSto();setTimeout(()=>dlgQueue([{sp:'Korr',who:'korr',t:'Korr ⌖ protege ⟒ núcleo. Máquinas… ⍜ romper.'},{sp:'Vega',t:'Lo tomaré como un «estoy listo».'}]),600);}}catch(e){}return r;};}
// v305: los soldados de la radio de Vega no pueden morir (por si algún daño no pasa por hitUnit)
H2T.push(()=>{for(const t of S.summ||[])if(t.pat)for(const q of t.sd||[])if(q.pat&&q.hp<q.max)q.hp=q.max;});
// ---- v305: la Cápsula caída. La primera vez sale Korr (y se desbloquea); con Korr ya desbloqueado, sale otra criatura distinta (el retrato antiguo) ----
{const _m=mkAlly;mkAlly=function(){const korr=!!(S&&!S.tut&&!S.pvE&&!h2Has('korr')&&(typeof ev2Real!=='function'||ev2Real()));const t=_m.apply(this,arguments);
 try{if(t){S.allyKorr=korr?1:0;if(korr){t.tinf.n='Korr';t.tinf.ic='👾';t.tinf.col='#5ad0e0';t.sd[0].port='korr';}}}catch(e){}return t;};}
{const _u=h2Unlock;h2Unlock=function(id){const nw=!h2Has(id);const r=_u.apply(this,arguments);try{if(nw&&S)(S.h2just=S.h2just||{})[id]=1;}catch(e){}return r;};}
{const _c=chip;chip=function(k){const[a,b]=k.split(':');
 if(a==='ally'&&S&&S.allyKorr)return '<span class="cf">👾 Korr lucha contigo toda la partida</span>';
 // el «héroe nuevo» que recuerda la opción no se vuelve a anunciar si ya lo tienes (salvo en la partida en que lo desbloqueas)
 if(a==='hero'&&H2[b]&&h2Has(b)&&!(S&&S.h2just&&S.h2just[b]))return '';
 return _c.apply(this,arguments);};}
{const _hp=heroPanel;heroPanel=function(){let h=_hp.apply(this,arguments);try{if(h&&S&&S.ally&&S.allyKorr)h=h.replace(/(<button class="hpb hpally[^>]*style="background:)#8a4fd0("[^>]*>)/,'$1#5ad0e0$2').replace(portrait('ally',1),portrait('korr',1));}catch(e){}return h;};}
{const _k=kwHtml0;kwHtml0=function(id){if(id==='ally'&&typeof S!=='undefined'&&S&&S.allyKorr)return '<b>👾 Korr</b><small>Salió de la cápsula caída y pelea de tu lado toda la partida: bloquea a 2 enemigos y, si cae, reaparece a los 12 s. Pulsa su retrato y elige una casilla del camino para moverlo.</small>';return _k.apply(this,arguments);};}
