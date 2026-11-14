// ==================== v330 · Ayudas de interfaz ====================
// Ideas aprobadas por Nogal (14-nov-2026): informar de fallos, «¿Por qué he perdido?», avisos en la línea de rondas,
// ver todos los alcances, aviso de oro sin gastar, «Sabías que…», resumen de carrera e interruptores en Opciones › Juego › Ayudas.

// ---------- Interruptores (Opciones › Juego › Ayudas) ----------
const AYU=[
 ['goldw','Aviso de oro sin gastar','Al empezar la oleada, si te sobra oro para construir o mejorar algo, te avisa y tienes que pulsar otra vez.'],
 ['rtlw','Avisos en la línea de rondas','La siguiente ronda se marca si trae enemigos voladores o alguno que aún no conoces.'],
 ['whyl','¿Por qué he perdido?','Al perder una partida, unas pistas sobre qué te hizo más daño y qué podrías probar.'],
 ['tips','Consejos de ÉTER («¿Sabías que…?»)','ÉTER te da consejos en la pausa y en el menú, marcados con una bombilla. Desactivado, solo hace comentarios.']];
for(const[k]of AYU)if(OPT[k]===undefined)OPT[k]=true;
{let at=OPTS.findIndex(o=>o.key==='hints');if(at<0)at=OPTS.findIndex(o=>o.tab==='jg');
 OPTS.splice(at+1,0,...AYU.map(([key,label,desc])=>({tab:'jg',type:'toggle',key,def:true,label,desc})));
 for(const[k]of AYU)OSEC[k]='Ayudas';OSEC.autopause='Ayudas';OSEC.nearach='Ayudas';
 Object.assign(OIC,{goldw:'🪙',rtlw:'⚠️',nearach:'🏆'});OIC.tips=OIC.hints||'💡';OIC.autopause='<svg viewBox="0 0 24 24" width="20" height="20"><rect x="5" y="4" width="5" height="16" rx="1.5" fill="#c8743a"/><rect x="14" y="4" width="5" height="16" rx="1.5" fill="#c8743a"/></svg>';
 // las de Ayudas, juntas (mismo orden que options.js: Interfaz, Ayudas, Tiempo)
 const ord=['Interfaz','Ayudas','Tiempo'],rk=o=>{const s=OSEC[oKey(o)];return s?ord.indexOf(s):-1;},pos=[],it=[];
 OPTS.forEach((o,i)=>{if(o.tab==='jg'){pos.push(i);it.push([o,i]);}});it.sort((x,y)=>rk(x[0])-rk(y[0])||x[1]-y[1]);pos.forEach((p,j)=>OPTS[p]=it[j][0]);}

// ---------- Ver todos los alcances (mantener X) ----------
KBDEF.rng='x';if(!KB.rng)KB.rng='x';
{const g0=KBL.find(x=>x[0]==='Partida');if(g0&&!g0[1].some(r=>r[0]==='rng'))g0[1].push(['rng','Ver el alcance de todas las torres (mantener)','⭕']);}
const RNGA={on:false,tch:false};
const rngaOn=()=>RNGA.on||RNGA.tch;
addEventListener('keydown',e=>{try{if(e.ctrlKey||e.metaKey||e.altKey)return;const t=e.target;if(t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'))return;
 if(typeof KBC!=='undefined'&&KBC.on)return;if(kbIs('rng',e.key.toLowerCase()))RNGA.on=true;}catch(_){}});
addEventListener('keyup',e=>{try{if(kbIs('rng',e.key.toLowerCase()))RNGA.on=false;}catch(_){}});
addEventListener('blur',()=>{RNGA.on=false;});
function rngaDraw(){if(!rngaOn()||!S||!S.list||PREVIEWING)return;
 for(const t of S.list){if(t.hero||t.summ||!TW[t.type])continue;let r=0;try{r=stats(t).range;}catch(e){}if(!(r>0))continue;
  const X=t.x*CS+CS/2,Y=t.y*CS+CS/2,c=TW[t.type].col||'#6ebeff';
  g.save();g.globalAlpha=.10;g.fillStyle=c;g.beginPath();g.arc(X,Y,r*CS,0,7);g.fill();g.globalAlpha=.85;g.strokeStyle=c;g.lineWidth=1.5/sc();g.setLineDash([6/sc(),4/sc()]);g.stroke();g.restore();}}
{const _dw=e2DrawWorld;e2DrawWorld=function(lw){const r=_dw.apply(this,arguments);try{rngaDraw();}catch(e){}return r;};}
// botón en la columna de la izquierda, debajo de «Reintentar» (PC y móvil): se enciende y se apaga
const RNGSVG='<svg viewBox="0 0 24 24" width="1em" height="1em"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.2" stroke-dasharray="3.2 2.4"/><circle cx="12" cy="12" r="2.8" fill="currentColor"/></svg>';
{const _ui=ui;ui=function(){const r=_ui.apply(this,arguments);try{const m=$('mtl');if(m&&S&&!S.tut&&!m.querySelector('[data-a="rngall"]'))m.insertAdjacentHTML('beforeend',`<div class="gap"></div><button data-a="rngall" class="rngb${RNGA.tch?' on':''}" title="Ver el alcance de todas tus torres (${kbN('rng').toUpperCase()}; mantén pulsada la tecla para verlo un momento)">${RNGSVG}${kcap(kbN('rng'))}</button>`);}catch(e){}return r;};}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-a="rngall"]');if(!b)return;e.stopPropagation();e.preventDefault();RNGA.tch=!RNGA.tch;b.classList.toggle('on',RNGA.tch);try{sfx('ui');}catch(_){}},true);

// ---------- Aviso de oro sin gastar ----------
// lo más barato que puedes hacer ahora mismo: construir una torre del mazo en un solar libre o mejorar una torre
function goldCheap(){if(!S||!S.list)return Infinity;let m=Infinity;
 let free=false;for(let ky=0;ky<NC&&!free;ky++)for(let kx=0;kx<NC&&!free;kx++)if(S.cc[ky][kx]===1&&!S.occ[(kx*K+1)+','+(ky*K+1)])free=true;
 if(free)for(const k of S.deck||[]){const T=TW[k];if(T&&T.cost>0&&!T.uniq)m=Math.min(m,S.half?Math.ceil(T.cost/2):T.cost);}
 for(const t of S.list){const T=TW[t.type];if(!T||t.hero||t.summ||(T.uniq&&!T.upc)||t.lvl>=(T.pig?4:3))continue;let c=Infinity;try{c=tCost(t,upCost(T,t.lvl+1));}catch(e){}if(c>0)m=Math.min(m,c);}
 return m;}
const goldWarnOn=()=>OPT.goldw!==false&&S&&!S.tut&&S.phase==='build'&&S.round>=2&&Math.floor(S.gold)>=goldCheap();
const GW={r:-1};
function goldWarnShow(){let el=document.getElementById('goldw');const b=document.querySelector('#mbr [data-a="wave"]');
 if(!b){if(el)el.classList.remove('on');return;}
 if(!el){el=document.createElement('div');el.id='goldw';document.body.appendChild(el);}
 el.innerHTML=`<b>${fi(Math.floor(S.gold))} 🪙 sin gastar</b><small>Aún puedes construir o mejorar. Pulsa otra vez para empezar.</small>`;
 const r=b.getBoundingClientRect(),cx=r.left+r.width*.22,w=230,lx=Math.max(w/2+8,Math.min(innerWidth-w/2-8,cx));el.style.left=Math.round(lx)+'px';el.style.top=Math.round(r.top-10)+'px';el.style.setProperty('--ax',Math.round(w/2+cx-lx)+'px');el.classList.add('on');}
function goldWarnTick(){const el=document.getElementById('goldw');const show=typeof WARM!=='undefined'&&WARM&&S&&S.phase==='build'&&GW.r===S.round&&goldWarnOn();
 if(show)goldWarnShow();else if(el)el.classList.remove('on');}
setInterval(()=>{try{goldWarnTick();}catch(e){}},150);
// ratón: el primer toque ya arma el botón; aquí solo se recuerda que el aviso salió en esta ronda
document.addEventListener('click',e=>{try{const b=e.target.closest&&e.target.closest('#mbr [data-a="wave"]');if(b&&!WARM&&goldWarnOn())GW.r=S.round;}catch(_){}},true);
// teclado: Intro empieza directamente; si sobra oro, la primera vez solo avisa
addEventListener('keydown',e=>{try{if(e.ctrlKey||e.metaKey||e.altKey||e.repeat)return;const k=e.key.toLowerCase();if(!kbIs('wave',k)||!S||S.phase!=='build')return;
 if(RL.open||PMU.open||document.body.classList.contains('inmenu'))return;if(!goldWarnOn())return;
 if(GW.r===S.round&&WARM&&performance.now()-WARM<3000)return;
 GW.r=S.round;WARM=performance.now();e.preventDefault();e.stopImmediatePropagation();try{sfx('ui');}catch(_){}ui();
 setTimeout(()=>{if(WARM&&performance.now()-WARM>=3000){WARM=0;ui();}},3050);}catch(_){}},true);

// ---------- Avisos en la línea de rondas ----------
// Solo la ronda que está por salir (lo que de verdad hay en los portales): voladores y enemigos que aún no conoces (sin decir cuál).
function rtlWarn(r){const o={fly:0,nw:0};if(OPT.rtlw===false||!S||S.tut||r!==S.round||S.phase!=='build'||!S.portals)return o;
 for(const p of S.portals)for(const t in p.plan||{}){const n=p.plan[t]||0;if(!n||!ET[t])continue;if(ET[t].fly)o.fly+=n;if(typeof seen==='function'&&!seen('en',t))o.nw++;}
 return o;}
const RTLWSVG={fly:'<svg viewBox="0 0 16 16"><path d="M1 9c3-1 4-4 7-4s4 3 7 4c-2 0-3 1-4 2-1-1-2-1.5-3-1.5S6 10 5 11C4 10 3 9 1 9z" fill="currentColor"/></svg>',
 nw:'<svg viewBox="0 0 16 16"><text x="8" y="12.5" text-anchor="middle" font-size="12" font-weight="900" font-family="Georgia,serif" fill="currentColor">?</text></svg>'};
{const _d=rtlDot;rtlDot=function(r){const d=_d.apply(this,arguments);try{const w=rtlWarn(r);let x='';if(w.fly)x+=`<i class="rtw fly">${RTLWSVG.fly}</i>`;if(w.nw)x+=`<i class="rtw nw">${RTLWSVG.nw}</i>`;
  if(x){d.h+=`<span class="rtws">${x}</span>`;if(!d.c)d.c='w';}}catch(e){}return d;};}
{const _t=rtlTip;rtlTip=function(r){let h=_t.apply(this,arguments);try{const w=rtlWarn(r),L=[];
  if(w.fly)L.push(`<span class="rtwl fly">${RTLWSVG.fly}</span> Trae <b>voladores</b>`);if(w.nw)L.push(`<span class="rtwl nw">${RTLWSVG.nw}</span> Trae un enemigo que <b>aún no conoces</b>`);
  if(L.length)h=h.replace('</small>','</small><small class="rtwt">'+L.join('<br>')+'</small>');}catch(e){}return h;};}

// ---------- ¿Por qué he perdido? ----------
function whyLost(){const out=[];if(!S||!S.st)return out;const ek=S.st.ek||{};
 const L=Object.keys(ek).filter(k=>(ek[k].hpl||0)>0&&ET[k]).sort((a,b)=>ek[b].hpl-ek[a].hpl).slice(0,2);
 const dts=S.list.filter(t=>TW[t.type]&&!t.hero).map(t=>TW[t.type].dt);const nMag=dts.filter(d=>d==='magic'||d==='elem').length,nPhy=dts.filter(d=>d==='phys'||d==='elem').length;
 for(const k of L){const E=ET[k],n=ek[k].hpl,nm=E.n;let tip='';
  if(isBoss({t:k}))tip='Era un jefe: guarda la definitiva del héroe para él y pon tus torres más fuertes cerca de su camino.';
  else if((E.ap||0)>=30&&nMag<2)tip='Tienen mucha <span class="kw">armadura</span>: el daño mágico o elemental la ignora.';
  else if((E.am||0)>=30&&nPhy<2)tip='Tienen mucha <span class="kw">resistencia mágica</span>: el daño físico o elemental no la sufre.';
  else if(E.fly)tip='Vuelan: asegúrate de tener torres que les disparen a lo largo de todo su camino.';
  else if((E.sp||1)>=1.5)tip='Son muy rápidos: ralentizarlos da tiempo a tus torres.';
  else tip='Prueba a reforzar el tramo final del camino, cerca del núcleo.';
  out.push({h:`<b>${nm}</b>: te ${n===1?'quitó 1 de vida':'quitaron '+n+' de vida'}.`,s:tip});}
 /* v334: muchas salidas abiertas = más portales y oleadas más repartidas */
 {const np=(S.portals||[]).length;if(np>=4&&S.round<=Math.ceil(ROUNDS*.7))out.unshift({h:`Tenías <b>${np} portales</b> abiertos.`,s:'Cada salida que dejas abierta es un portal más: los enemigos llegan por más sitios a la vez. Elegir piezas con menos salidas (o cerrarlas) hace las oleadas más fáciles de defender.'});}
 const cheap=goldCheap();if(S.gold>=cheap&&S.gold>=50)out.push({h:`Te quedaron <b>${fi(Math.floor(S.gold))} 🪙</b> sin gastar.`,s:'Antes de cada oleada, mira si puedes construir o mejorar algo más.'});
 if(S.rc>0&&!S.tut)out.push({h:`Te ${S.rc===1?'quedaba 1 reintento':'quedaban '+S.rc+' reintentos'} de oleada.`,s:'Si una oleada se tuerce, desde la pausa puedes repetirla desde el principio.'});
 if(S.hero&&S.hero.lvl<=3&&S.round>=8)out.push({h:`Tu héroe acabó en <b>Nv ${S.hero.lvl}</b>.`,s:'Gana experiencia peleando: muévelo a donde haya más enemigos y usa sus habilidades.'});
 return out.slice(0,3);}
function whyHTML(){const L=whyLost();if(!L.length)return '';
 return `<div class="whyl"><div class="whyh">${WHYSVG}<b>¿Por qué he perdido?</b></div>${L.map(x=>`<div class="whyi"><div>${x.h}</div><small>${x.s}</small></div>`).join('')}</div>`;}
const WHYSVG='<svg viewBox="0 0 24 24" width="20" height="20"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9.2 9.3a2.9 2.9 0 1 1 4.3 2.5c-.9.5-1.5 1-1.5 2.2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="17.3" r="1.2" fill="currentColor"/></svg>';
OIC.whyl='<span style="color:#a8432c;display:inline-grid">'+WHYSVG+'</span>';
const WHYPOS={v:'r'};/* 'r': arriba de la página derecha · 'l': debajo del resumen */
{const _eg=endGame;endGame=function(){const r=_eg.apply(this,arguments);try{if(S&&S.phase!=='won'&&!S.tut&&OPT.whyl!==false&&LB.end&&!LB.end.won){const w=whyHTML();if(w){
 if(WHYPOS.v==='r')LB.end.right=w+LB.end.right;else LB.end.left+=w;if(typeof lbRender==='function')lbRender();}}}catch(e){}return r;};}

// ---------- «Sabías que…» ----------
// Solo cosas que el jugador ya puede tener delante (sin destripar nada de lo que no ha visto).
const TIPS=[
 ()=>'Abrir muchas salidas no siempre es buena idea: cada una es un <b>portal</b> más, y los enemigos llegan por más sitios a la vez.',
 ()=>'Pulsa <b>'+(kbN?kbN('peek'):'Tab')+'</b> al elegir pieza, en un evento o en una oferta para ver el mapa sin cerrar la ventana.',
 ()=>'Con <b>Mayús + 1–9</b> usas las reliquias activas sin buscar el botón.',
 ()=>'Con el botón de la izquierda, debajo de «Reintentar» (o manteniendo <b>'+(kbN?kbN('rng').toUpperCase():'X')+'</b>), ves el alcance de todas tus torres a la vez.',
 ()=>'Las torres de unidades tienen <b>bandera</b>: pulsa la torre y luego la bandera para elegir dónde pelean.',
 ()=>'El daño <span class="kw">mágico</span> ignora la armadura, pero no la resistencia mágica.',
 ()=>'El daño <span class="kw">elemental</span> ignora tanto la armadura como la resistencia mágica.',
 ()=>'Si una oleada sale mal, puedes <b>reintentarla</b> desde la pausa mientras te queden cargas.',
 ()=>'Las <b>casillas especiales</b> mejoran la torre que construyas encima. Fíjate en ellas antes de colocar la pieza.',
 ()=>'Puedes <b>girar la pieza</b> con R antes de colocarla.',
 ()=>'Los enemigos de la ronda siguiente se ven en sus portales: pasa el ratón por encima.',
 ()=>(TOUCH?'Mantén pulsada':'Haz clic derecho en')+' una mejora (o en una torre del anillo de construir) para marcarla: se comprará sola en cuanto tengas el oro.',
 ()=>'Las habilidades del héroe pueden ir solas: actívalo en Opciones › Juego.',
 ()=>'Desde la ronda 5, si no hay enemigos al alcance, el juego va solo a ×3.',
 ()=>'En Estadísticas › Carrera tienes el resumen de todas tus partidas.',
 ()=>'¿Algo no funciona como debería? Desde la pausa puedes <b>informar de un fallo</b> con una captura.',
 ()=>'Abrir cofres pronto da más tiempo a que sus reliquias rindan.',
 ()=>S0e2()?'Cada era tiene sus propias piezas, casillas y enemigos. Lo que descubres, se recuerda.':null];
function S0e2(){return typeof era2Ok==='function'&&era2Ok();}
const TIPW={i:-1};
function tipPick(adv){const L=TIPS.map((f,i)=>[i,f()]).filter(x=>x[1]);if(!L.length)return null;
 if(TIPW.i<0||adv){let j;do{j=Math.floor(Math.random()*L.length);}while(L.length>1&&L[j][0]===TIPW.i);TIPW.i=L[j][0];}
 const f=L.find(x=>x[0]===TIPW.i)||L[0];return f[1];}
function tipHTML(){if(OPT.tips===false)return '';const t=tipPick(false);if(!t)return '';
 return `<div class="lbtip" data-a="tipnext" title=""><span class="lbtipi">${TIPSVG}</span><div><b>Sabías que…</b><small>${t}</small></div></div>`;}
const TIPSVG='<svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 2.5a6.5 6.5 0 0 0-3.8 11.8c.7.5 1.1 1.2 1.1 2V17h5.4v-.7c0-.8.4-1.5 1.1-2A6.5 6.5 0 0 0 12 2.5z" fill="currentColor" opacity=".9"/><rect x="9.3" y="18.2" width="5.4" height="1.6" rx=".6" fill="currentColor"/><rect x="10" y="20.6" width="4" height="1.4" rx=".6" fill="currentColor"/></svg>';
// cada vez que se abre la pausa o el menú, un consejo nuevo
{const _op=lbOpen;lbOpen=function(a){try{if(a==null)TIPW.i=-1;}catch(e){}return _op.apply(this,arguments);};}

// ---------- Informar de un fallo ----------
const BUGURL='https://towerize-ranking.towerize.workers.dev/bug';
const BUG={shot:null,open:false,cat:'bug',sending:false,msg:''};
const BUGCAT=[['bug','Fallo'],['ui','Interfaz'],['txt','Textos'],['bal','Equilibrio'],['idea','Idea']];
// captura del mapa (lo que se ve en el lienzo), reducida a JPEG
function bugShot(){try{const c=document.getElementById('c');if(!c||!c.width)return null;const W=Math.min(1100,c.width),H=Math.round(c.height*W/c.width);
 const o=document.createElement('canvas');o.width=W;o.height=H;const x=o.getContext('2d');x.fillStyle='#000';x.fillRect(0,0,W,H);x.drawImage(c,0,0,W,H);return o.toDataURL('image/jpeg',.72);}catch(e){return null;}}
// la captura se toma al pausar (antes de que el libro tape el mapa)
{const _p=openPause;openPause=function(){try{BUG.shot=bugShot();}catch(e){}return _p.apply(this,arguments);};}
function bugInfo(){const v=($('ver')&&$('ver').textContent)||'';const inG=typeof lbInGame==='function'&&lbInGame();
 const L=['v'+((v.match(/\d+/)||[''])[0])];if(inG&&S){L.push('Era '+(S.era||1));L.push('Ronda '+Math.min(S.round,ROUNDS)+'/'+ROUNDS);if(S.hero)L.push(S.hero.def.n+' Nv '+S.hero.lvl);L.push(S.phase==='wave'?'en combate':'preparando');}else L.push('menú');
 L.push(TOUCH?'táctil':'PC');L.push(innerWidth+'×'+innerHeight);return L.join(' · ');}
function bugOpen(){const inG=typeof lbInGame==='function'&&lbInGame();if(!inG)BUG.shot=null;BUG.open=true;BUG.msg='';BUG.cat='bug';BUG.inc=!!BUG.shot;bugRender(true);}
function bugClose(){BUG.open=false;const el=document.getElementById('bugw');if(el)el.classList.remove('open');}
function bugRender(first){let el=document.getElementById('bugw');if(!el){el=document.createElement('div');el.id='bugw';document.body.appendChild(el);
  el.addEventListener('click',bugClick);el.addEventListener('keydown',e=>{e.stopPropagation();if(e.key==='Escape'){e.preventDefault();bugClose();}});}
 const txt=first?'':((el.querySelector('textarea')||{}).value||'');
 el.innerHTML=`<div class="bugbox"><button class="bkx" data-bg="x" aria-label="Cerrar">✕</button><h3>${BUGSVG} Informar de un fallo</h3>
  <small class="bugsub">Cuéntanos qué ha pasado. Lo recibimos en el canal de feedback de Discord.</small>
  <div class="bugcats">${BUGCAT.map(([k,l])=>`<button class="pill${BUG.cat===k?' on':''}" data-bg="cat" data-v="${k}">${l}</button>`).join('')}</div>
  <textarea maxlength="1500" placeholder="¿Qué ha pasado? ¿Qué esperabas que pasara?"></textarea>
  ${BUG.shot?`<div class="bugshot${BUG.inc?'':' off'}"><img src="${BUG.shot}" alt="" data-bg="zoom"><label><input type="checkbox" data-bg="inc"${BUG.inc?' checked':''}> Adjuntar esta captura del mapa</label></div>`:'<small class="bugnos">Sin captura: ábrelo desde la pausa de una partida para adjuntar el mapa.</small>'}
  <small class="buginfo">Se envía también: ${bugInfo()}${typeof lbPilot==='function'&&lbPilot()?' · piloto '+lbPilot():''}</small>
  <div class="bugbot"><span class="bugmsg">${BUG.msg}</span><button class="lbbk" data-bg="x">Cancelar</button><button class="gbtn" data-bg="send"${BUG.sending?' disabled':''}>${BUG.sending?'Enviando…':'Enviar'}</button></div></div>
  <div class="bugzoom"><img alt=""></div>`;
 const ta=el.querySelector('textarea');ta.value=txt;el.classList.add('open');if(first)setTimeout(()=>{try{ta.focus();}catch(e){}},50);}
async function bugSend(el){const ta=el.querySelector('textarea'),txt=(ta.value||'').trim();
 if(txt.length<3){BUG.msg='Escribe qué ha pasado.';bugRender();return;}
 BUG.sending=true;BUG.msg='';bugRender();
 const body={cat:BUG.cat,txt,nick:(typeof lbPilot==='function'&&lbPilot())||'',ver:((($('ver')&&$('ver').textContent)||'').match(/\d+/)||[''])[0],info:bugInfo(),img:BUG.inc&&BUG.shot?BUG.shot:null};
 let ok=false,err='';try{const r=await fetch(BUGURL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});const d=await r.json();ok=!!d.ok;err=d.err||'';}catch(e){err='red';}
 BUG.sending=false;
 if(ok){bugClose();try{sfx('ui');}catch(_){}bugToast('¡Gracias! Lo hemos recibido.');}
 else{BUG.msg=err==='espera'?'Espera un minuto antes de enviar otro.':'No se ha podido enviar. Comprueba la conexión.';bugRender();const t2=document.querySelector('#bugw textarea');if(t2)t2.value=txt;}}
function bugToast(t){let el=document.getElementById('bugtoast');if(!el){el=document.createElement('div');el.id='bugtoast';document.body.appendChild(el);}el.textContent=t;el.classList.add('on');clearTimeout(BUG.tt);BUG.tt=setTimeout(()=>el.classList.remove('on'),3000);}
function bugClick(e){const el=document.getElementById('bugw'),b=e.target.closest('[data-bg]');
 if(!b){if(e.target===el)bugClose();const z=e.target.closest('.bugzoom');if(z)z.classList.remove('on');return;}
 const a=b.dataset.bg;e.stopPropagation();
 if(a==='x')bugClose();
 else if(a==='cat'){const v=el.querySelector('textarea').value;BUG.cat=b.dataset.v;bugRender();el.querySelector('textarea').value=v;}
 else if(a==='inc'){BUG.inc=b.checked;b.closest('.bugshot').classList.toggle('off',!BUG.inc);}
 else if(a==='zoom'){const z=el.querySelector('.bugzoom');z.querySelector('img').src=BUG.shot;z.classList.add('on');}
 else if(a==='send'&&!BUG.sending)bugSend(el);}
const BUGSVG='<svg viewBox="0 0 24 24" width="20" height="20" style="vertical-align:-4px"><ellipse cx="12" cy="13.5" rx="5" ry="6.5" fill="currentColor"/><circle cx="12" cy="6" r="2.6" fill="currentColor"/><path d="M7 10 3.5 8M7 14H3M7.5 18 4 20.5M17 10l3.5-2M17 14h4M16.5 18l3.5 2.5M10.5 4 9 2M13.5 4 15 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M12 8v12" stroke="#0006" stroke-width="1.2"/></svg>';

// botones en la portada del libro (pausa y menú principal) y consejo «Sabías que…»
{const _cv=lbCoverHTML;lbCoverHTML=function(){let h=_cv.apply(this,arguments);try{
  const bug=`<button data-a="bugrep" class="bugbtn" aria-label="Informar de un fallo">${BUGSVG}<span>Informar de un fallo</span></button>`;
  h=h.replace('<div class="lbcvin">','<div class="lbcvin">'+bug);
  // puntuación: cinta bajo el retrato en lugar del texto suelto de arriba
  h=h.replace(/<div class="lbscore"><small>Puntuación<\/small><b>([^<]*)<\/b><\/div>(<div class="lbemb">[\s\S]*?<\/div>)/,(m,t,emb)=>`<div class="lbembw">${emb}<div class="lbscr"><b>${t}</b><small>puntos</small></div></div>`);
 }catch(e){}return h;};}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-a="bugrep"]');if(!b)return;e.stopPropagation();e.preventDefault();
 if(b.dataset.a==='bugrep'){try{sfx('ui');}catch(_){}bugOpen();}
 else{const t=tipPick(true);const s=b.querySelector('small');if(s&&t)s.innerHTML=t;try{sfx('page');}catch(_){}}},true);
// mientras la ventana está abierta, el teclado es suyo
addEventListener('keydown',e=>{if(BUG.open&&document.getElementById('bugw')&&document.getElementById('bugw').classList.contains('open')){if(e.key==='Escape'){e.preventDefault();bugClose();}e.stopImmediatePropagation();}},true);

// ---------- Estadísticas › Carrera ----------
function carStats(){const L=((typeof HIST!=='undefined'&&HIST.list)||[]).filter(r=>!r.tut);
 const o={n:L.length,w:0,time:0,kills:0,gold:0,dmg:0,best:0,streak:0,cur:0,hero:{},tw:{},era:{},bestR:0};
 const asc=L.slice().sort((a,b)=>a.t0-b.t0);
 for(const r of asc){const w=r.res==='w';if(w){o.w++;o.cur++;o.streak=Math.max(o.streak,o.cur);}else o.cur=0;
  o.time+=r.time||0;o.kills+=r.kills||0;o.gold+=r.gold||0;o.dmg+=r.dmg||0;o.bestR=Math.max(o.bestR,w?r.R:r.r||0);
  o.hero[r.hero]=(o.hero[r.hero]||0)+1;o.era[r.era||1]=(o.era[r.era||1]||0)+1;
  for(const t of r.tw||[]){const k=t[0];if(typeof k!=='string'||k.startsWith('hero:')||!TW[k])continue;const c=o.tw[k]||(o.tw[k]={n:0,d:0});c.n++;c.d+=t[3]||0;}}
 o.last=L.slice().sort((a,b)=>b.t0-a.t0).find(r=>r.res==='w')||null;return o;}
const top1=m=>{let b=null;for(const k in m){const v=typeof m[k]==='object'?m[k].n:m[k];if(!b||v>b[1])b=[k,v];}return b;};
function carParts(){if(typeof hsLoad==='function')hsLoad();const o=carStats();
 const big=(l,v,s)=>`<div class="carb"><small>${l}</small><b>${v}</b>${s?`<em>${s}</em>`:''}</div>`;
 const hrs=o.time>=3600?Math.floor(o.time/3600)+' h '+Math.floor(o.time%3600/60)+' min':Math.floor(o.time/60)+' min';
 let left=`<h3>Estadísticas</h3><div class="bksub">Carrera · todas tus partidas${o.n?'':' (todavía no has terminado ninguna)'}</div>
  <div class="cargrid">${big('Partidas',fi(o.n))}${big('Victorias',fi(o.w),o.n?Math.round(o.w/o.n*100)+' %':'')}${big('Mejor racha',fi(o.streak),o.streak===1?'victoria':'victorias')}
  ${big('Tiempo de combate',hrs)}${big('Enemigos eliminados',fi(o.kills))}${big('Oro conseguido',fi(o.gold)+' 🪙')}${big('Daño total',fi(o.dmg))}${big('Ronda más lejana',fi(o.bestR))}</div>`;
 const fav=top1(o.hero),ftw=top1(o.tw),fera=top1(o.era);
 const row=(ic,l,v,s)=>`<div class="carf"><span class="carfi">${ic}</span><div><small>${l}</small><b>${v}</b>${s?`<em>${s}</em>`:''}</div></div>`;
 let right='<div class="lbdet carr">';
 if(fav&&HEROES[fav[0]]){const H=HEROES[fav[0]];right+=row(`<i class="lbsvpor" style="background:${H.col||'#8a5a2e'}">${portrait(fav[0],1)}</i>`,'Héroe favorito',H.n,fav[1]+(fav[1]===1?' partida':' partidas'));}
 if(ftw)right+=row(twIc(ftw[0]),'Torre más construida',TW[ftw[0]].n,'en '+ftw[1]+(ftw[1]===1?' partida':' partidas')+' · '+fi(o.tw[ftw[0]].d)+' de daño');
 if(fera&&S0e2())right+=row(icU('dur','⏳'),'Era más jugada',(ERADEF[fera[0]]||ERADEF[1]).n,fera[1]+(fera[1]===1?' partida':' partidas'));
 if(o.last){const H=HEROES[o.last.hero];right+=row(icU('m_c_ach','🏆'),'Última victoria',(H?H.n+' · ':'')+(ERADEF[o.last.era||1]||ERADEF[1]).n,typeof hsWhen==='function'?hsWhen(o.last.t0):'');}
 if(!o.n)right+='<p>Cuando termines tu primera partida, aquí verás tu resumen.</p>';
 right+='</div>';
 return {marks:{list:STABS.map(([v,l,i])=>[v,l,i]),cur:'car',act:'stab'},left,right,key:'stcar'+o.n+'|'+((HIST&&HIST.list)||[]).length};}
STABS.push(['car','Carrera','<svg viewBox="0 0 24 24" width="1em" height="1em"><path d="M4 20V10M10 20V5M16 20v-7M22 20H2" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" fill="none"/><circle cx="16" cy="6" r="2.4" fill="currentColor"/></svg>']);
{const _sp=statParts;statParts=function(){if(STW.tab==='car')return carParts();return _sp.apply(this,arguments);};}
{const _sh=statsHTML;statsHTML=function(t){if(t==='car')return '';return _sh.apply(this,arguments);};}
// cuando acaba de cargar el registro, se repinta
{const _hl=hsLoad;hsLoad=function(){const was=!!HIST.list;const r=_hl.apply(this,arguments);if(!was)setTimeout(()=>{try{if(LB.open&&STW.tab==='car')lbRender();}catch(e){}},400);return r;};}

// ---------- «¿Sabías que…?» lo dice ÉTER ----------
// Sus consejos (los de siempre y los nuevos) salen con una bombilla y «¿Sabías que…?» para que se distingan de sus comentarios.
const ETTIPS=new Set();
const tipTexts=()=>TIPS.map(f=>{try{return f();}catch(e){return null;}}).filter(Boolean).map(t=>t.replace(/<[^>]+>/g,''));
{const _t=etmTips;etmTips=function(){if(OPT.tips===false)return [];const L=_t.apply(this,arguments).concat(tipTexts());for(const x of L)ETTIPS.add(etmName(x));return L;};}
{const _p=etmPool;etmPool=function(){const base=_t0();let P=_p.apply(this,arguments);if(OPT.tips===false)P=P.filter(x=>!base.includes(x));else{const T=tipTexts();P=P.concat(T);}for(const x of base.concat(tipTexts()))ETTIPS.add(etmName(x));return P;};
 function _t0(){const P=[];for(const t of ETMN.tip)if(typeof t==='string')P.push(t);else if(t[1]())P.push(t[0]);return P;}}
{const _s=etmSay;etmSay=function(auto){const cv=document.querySelector('.lbcv.a');if(auto&&cv&&cv.classList.contains('ing')&&OPT.tips===false)return;
 const r=_s.apply(this,arguments);try{const b=document.querySelector('.lbcv.a .etmbub');if(b&&ETTIPS.has(ETM.last)){const h=b.querySelector('b');if(h&&!b.querySelector('.ettip'))h.insertAdjacentHTML('afterend',`<em class="ettip">${TIPSVG}¿Sabías que…?</em>`);}}catch(e){}return r;};}
// Bocadillo de ÉTER: el primer clic (dentro o fuera) termina de escribir; ya escrito, un clic fuera lo cierra y el clic sigue su camino
document.addEventListener('pointerdown',e=>{try{const b=document.querySelector('.lbcv.a .etmbub.on');if(!b)return;const cv=b.closest('.lbcv'),sp=b.querySelector('.etmt');if(!sp)return;
 const gr=cv.querySelector('.etmgr');
 if(sp.textContent!==ETM.last){clearTimeout(ETM.type);sp.textContent=ETM.last;cv.classList.remove('etmtalk');if(gr){gr.style.animation='';gr.style.opacity='';}
  clearTimeout(ETM.hide);ETM.hide=setTimeout(()=>{b.classList.remove('on');cv.classList.remove('etmon','etmtalk');},4000);ETMSKIP.on=1;setTimeout(()=>{ETMSKIP.on=0;},600);e.preventDefault();e.stopPropagation();return;}
 if(!b.contains(e.target)){clearTimeout(ETM.hide);b.classList.remove('on');cv.classList.remove('etmon','etmtalk');}}catch(_){}},true);
document.addEventListener('click',e=>{try{if(ETMSKIP.on){ETMSKIP.on=0;e.preventDefault();e.stopPropagation();}}catch(_){}},true);
const ETMSKIP={on:0};
