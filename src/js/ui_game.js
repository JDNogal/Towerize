// botón de pantalla completa en los menús (móvil): al girar el móvil se sale de pantalla completa y en estas pantallas no hay Opciones a mano
{const b=document.createElement('button');b.id='fsmb';b.title='Pantalla completa';b.textContent='⛶';b.addEventListener('click',e=>{e.stopPropagation();try{enterFS();}catch(er){}setTimeout(()=>b.classList.remove('on'),150);});document.body.appendChild(b);
 setInterval(()=>{try{const on=TOUCH&&FSOK&&!isFS()&&(document.body.classList.contains('inmenu')||(RL.open&&RL.hpick))&&!(typeof INTRO!=='undefined'&&INTRO.on)&&!(typeof DLG!=='undefined'&&DLG.on);if(b.classList.contains('on')!==on)b.classList.toggle('on',on);}catch(er){}},400);}

// color de texto legible sobre el panel de la paleta actual (mantiene el tono, ajusta la luz)
function tcol(c){try{const bg=getComputedStyle(document.body).getPropertyValue('--panel').trim()||'#1c1f28';const hx=s=>{s=s.replace('#','');if(s.length===3)s=[...s].map(x=>x+x).join('');return[0,2,4].map(i=>parseInt(s.slice(i,i+2),16)/255);};
 const L=a=>{const f=v=>v<=.03928?v/12.92:((v+.055)/1.055)**2.4;const[r,g,b]=a.map(f);return .2126*r+.7152*g+.0722*b;},CR=(a,b)=>{const x=L(a),y=L(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
 const B=hx(bg),dk=L(B)<.2;let c0=hx(c);for(let i=0;i<120&&CR(c0,B)<4.6;i++)c0=c0.map(v=>dk?v+(1-v)*.04:v*.96);return'rgb('+c0.map(v=>Math.round(v*255)).join(',')+')';}catch(e){return c;}}
// ---- mensajes del panel: que no se queden colgados ----
// · instrucción de una acción en curso (Elige…, Pulsa…): se queda mientras la acción siga; si la acción ya terminó, se borra
// · aviso de algo que acaba de pasar: pasa a notificación flotante (4 s) y deja el panel libre
// · red de seguridad: ninguna instrucción sin acción dura más de 6 s
const MSGI=/^(Elige|Pulsa|Coloca|Mueve|Toca|Haz clic|Arrastra|Selecciona)/;let MSG0=null,MSGT=0,MSGA=false;
setInterval(()=>{try{if(typeof S==='undefined'||!S||!S.list){MSG0=null;return;}const m=S.msg;if(!m){MSG0=null;return;}
 const now=performance.now(),txt=String(m).replace(/<[^>]+>/g,'').trim();if(m!==MSG0){MSG0=m;MSGT=now;MSGA=!!S.aim;}
 if(S.aim||(typeof DLG!=='undefined'&&DLG.on))return;
 if(ERRRX.test(txt)&&!/^(Elige|Pulsa)/.test(txt)){S.msg='';errBubble(txt);ui();return;}
 if(MSGI.test(txt)||S.rask){if((MSGA&&!S.aim)||now-MSGT>6000){S.msg='';ui();}return;}
 if(now-MSGT<120)return; // deja que termine lo que lo escribió
 toast(m);S.msg='';ui();}catch(e){}},200);
// ---- burbuja roja para los errores: sale donde pulsas y siempre dentro de la pantalla ----
const LPT={x:0,y:0,t:0};addEventListener('pointerdown',e=>{LPT.x=e.clientX;LPT.y=e.clientY;LPT.t=performance.now();},true);
const ERRRX=/insuficiente|no se puede|solo se puede|no tienes|necesitas|ya tiene|ya est[áa]n|no quedan|primero termina|en enfriamiento|no hay |bloquead|no puedes|todavía no|aún no|no cabe|solo durante|se desbloquea a|está caído|enfriamiento: |ya está activo|está desactivado/i;
let ERRT=0,LMSG='';
// avisos de un botón concreto (reliquia, habilidad): salen encima de ese botón, también si se ha usado con el teclado
const ERRA={sel:null,t:0},errAt=sel=>{ERRA.sel=sel;ERRA.t=performance.now();};
function errBubble(txt){let b=$('errb');if(!b){b=document.createElement('div');b.id='errb';document.body.appendChild(b);}b.textContent=txt;b.classList.add('on');
 const an=performance.now()-ERRA.t<400&&ERRA.sel?document.querySelector(ERRA.sel):null;if(an){const q=an.getBoundingClientRect();LPT.x=(q.left+q.right)/2;LPT.y=q.top;LPT.t=performance.now();}ERRA.sel=null;
 const recent=performance.now()-LPT.t<1500,W=innerWidth,H=innerHeight,w=b.offsetWidth,h=b.offsetHeight;let x=recent?LPT.x-w/2:W/2-w/2,y=recent?LPT.y-h-16:64;
 if(recent&&y<10)y=LPT.y+22;x=Math.max(10,Math.min(W-w-10,x));y=Math.max(10,Math.min(H-h-10,y));b.style.left=x+'px';b.style.top=y+'px';
 clearTimeout(ERRT);ERRT=setTimeout(()=>b.classList.remove('on'),2200);try{sfx('err');}catch(e){}
 if(recent)requestAnimationFrame(()=>errFlash(LPT.x,LPT.y));}
function errFlash(x,y){try{const e=document.elementFromPoint(x,y);if(!e||e.tagName==='CANVAS')return;const el=e.closest('button,[data-a],[data-tm],[data-id],.rl,.card,.pc');if(!el||el===document.body)return;const q=el.getBoundingClientRect();if(q.width>innerWidth*.6||q.height>innerHeight*.6)return;el.classList.remove('errfl');void el.offsetWidth;el.classList.add('errfl');setTimeout(()=>el.classList.remove('errfl'),950);}catch(er){}}
setInterval(()=>{try{if(typeof S==='undefined'||!S)return;const m=S.msg||'';if(m===LMSG)return;LMSG=m;const t=m.replace(/<[^>]+>/g,'');if(t&&ERRRX.test(t)&&!/^(Elige|Pulsa)/.test(t)){errBubble(t);S.msg='';LMSG='';ui();}}catch(e){}},50);

// ---- ventana de estadísticas de la partida ----
const STW={tab:'run'};const STABS=[['run','Partida','📊'],['dmg','Daño','⚔️'],['rel','Reliquias','💎'],['hero','Héroe','🦸'],['en','Enemigos','👾']];
function statsHTML(tab){const st=S.st||{},g=n=>`<span class="gd">${fi(n||0)} 🪙</span>`,d=n=>`<span class="cd">${fi(n||0)}</span>`,R=(a,b)=>`<div class="srow"><span>${a}</span><b>${b}</b></div>`,H=S.hero;
 const earned=(st.gKill||0)+(st.gTile||0)+(st.gRound||0)+(st.gRel||0)+(st.gEv||0);
 if(tab==='run'){const all=st.all||[],sold=all.filter(t=>t.sold).length;
  return `<div class="kp"><div><b>${fi(st.kills||0)}</b><small>Enemigos eliminados</small></div><div><b>${g(earned)}</b><small>Oro ganado</small></div><div><b>${d(st.dmg)}</b><small>Daño total</small></div><div><b>${fi(st.hpL||0)}</b><small>Vida perdida</small></div></div>`+
  `<div class="cols"><div><h3 class="osec">Oro</h3>${R('Bajas',g(st.gKill))}${R('Fin de ronda',g(st.gRound))}${R('Casillas especiales',g(st.gTile))}${R('Reliquias',g(st.gRel))}${R('Eventos',g(st.gEv))}${R('Gastado en torres y mejoras',g(st.spent))}${R('Recuperado vendiendo',g(st.gSell))}</div>`+
  `<div><h3 class="osec">Partida</h3>${R('Ronda',Math.min(S.round,ROUNDS)+' / '+ROUNDS)}${R('Piezas colocadas',Math.max(0,Object.keys(S.blocks||{}).length-1))}${R('Torres construidas',all.length+(sold?' ('+sold+' vendidas)':''))}${R('Reliquias',(S.relics||[]).length)}${R('Reintentos usados',st.retries||0)}${R('Tiempo real',fClk(GT.r))}${R('Tiempo de combate',fClk(GT.c))}</div></div>`;}
 if(tab==='dmg'){const all=(st.all||[]).slice().sort((a,b)=>(b.dmgT||0)-(a.dmgT||0)),hd=H?(H.pt.dmgT||0):0,tdm=all.reduce((s2,t)=>s2+(t.dmgT||0),0),other=Math.max(0,(st.dmg||0)-tdm-hd),tot=st.dmg||0,pc=v=>tot>0?Math.round(v/tot*100):0;
  const rows=all.map(t=>{const X=tinfo(t),dm=t.dmgT||0,a=t.act||0;return{ic:icOf(X),n:X.n+(t.sold?' <small>(vendida)</small>':''),lv:'Nv '+t.lvl,col:X.col||'#e8b04a',dm,k:t.kills||0,dps:a>0?dm/a:0};});
  if(H)rows.push({ic:H.def.ic,n:H.def.n+' <small>(héroe)</small>',lv:'Nv '+H.lvl,col:'#b8c4dd',dm:hd,k:H.pt.kills||0,dps:H.pt.act>0?hd/H.pt.act:0});
  if(other>0)rows.push({ic:'✨',n:'Otras fuentes <small>(reliquias, explosiones…)</small>',lv:'',col:'#9aa0ad',dm:other,k:'—',dps:null});
  rows.sort((a,b)=>b.dm-a.dm);const mx=Math.max(1,...rows.map(r=>r.dm));
  return rows.length?`<table><tr><th>Fuente</th><th class="n">Daño</th><th class="hidem"></th><th class="n">%</th><th class="n">Bajas</th><th class="n">DPS</th></tr>`+rows.map(r=>`<tr><td><span class="sic" style="background:${r.col}33">${r.ic}</span>${r.n} <small style="color:var(--fg2)">${r.lv}</small></td><td class="n cd">${fi(r.dm)}</td><td class="hidem" style="width:28%"><div class="sbar"><i style="width:${r.dm/mx*100}%;background:${r.col}"></i></div></td><td class="n">${pc(r.dm)}%</td><td class="n">${r.k}</td><td class="n">${r.dps==null?'—':fi(r.dps)}</td></tr>`).join('')+'</table><div class="snote">Incluye las torres vendidas y el héroe. «Otras fuentes» suma el daño de reliquias, explosiones de veneno, barricadas…</div>':'<div class="snote">Todavía no has hecho daño en esta partida.</div>';}
 if(tab==='rel'){if(!(S.relics||[]).length)return '<div class="snote">Todavía no tienes reliquias.</div>';
  const rt={coin:()=>`${g(st.gRel)} generado`,venom:r=>`≈ ${d(r.dmg)} de daño`,frost:r=>`${fi(r.n)} ralentizaciones · ${fi(r.n2)} congelados`,barricade:r=>`${fi(r.n)} enemigos detenidos`,compass:r=>`${fi(r.n)} desvíos`,mimic:r=>`${fi(r.n)} bajas comidas · ${fi(r.n2||0)} cofres`};
  return S.relics.map(id=>{const Rr=RELIC[id],r=RS(id),v=rt[id]?rt[id](r):r.gold?`${g(r.gold)} generado`:r.dmg?`≈ ${d(r.dmg)} de daño`:r.n?`${fi(r.n)} activaciones`:'—';return `<div class="srl"><div class="ri" style="background:${Rr.col||'#333'}">${Rr.ic}</div><div><b>${Rr.n}</b><small>${S.rs&&S.rs[id]&&S.rs[id].cd>0?'En enfriamiento: '+S.rs[id].cd+' rondas':'Lista'}</small></div><div class="v">${v}</div></div>`;}).join('')+'<div class="snote">El daño de las reliquias es una estimación: la parte del daño que no existiría sin ellas.</div>';}
 if(tab==='hero'){if(!H)return '<div class="snote">No tienes héroe en esta partida.</div>';
  return `<div class="kp"><div><b>${d(H.pt.dmgT||0)}</b><small>Daño</small></div><div><b>${fi(H.pt.kills||0)}</b><small>Bajas</small></div><div><b class="cf">${fi(st.xp||0)} xp</b><small>Experiencia ganada</small></div><div><b>${fi(st.hDie||0)}</b><small>Veces caído</small></div></div>`+
  R('Héroe',H.def.ic+' '+H.def.n+' · Nv '+H.lvl)+R('Habilidad usada',(st.habB||0)+' veces')+R('Definitiva usada',(st.habU||0)+' veces')+R('DPS medio',H.pt.act>0?fi((H.pt.dmgT||0)/H.pt.act):0);}
 if(tab==='en'){const ek=st.ek||{},ks=Object.keys(ek).sort((a,b)=>ek[b].k-ek[a].k);
  return ks.length?`<table><tr><th>Enemigo</th><th class="n">Eliminados</th><th class="n">Llegaron al núcleo</th><th class="n">Oro dado</th></tr>`+ks.map(k=>{const E=ET[k],q=ek[k];return `<tr><td><span class="sic" style="background:${E.col||'#888'}44">${E.ic||'👾'}</span>${E.n}</td><td class="n">${fi(q.k)}</td><td class="n${q.l?' cd':''}">${fi(q.l)}</td><td class="n">${g(q.g)}</td></tr>`;}).join('')+'</table>':'<div class="snote">Todavía no te has cruzado con ningún enemigo en esta partida.</div>';}
 return '';}
function renderStats(){STW.tab=STW.tab||'run';lbOpen('st');}
function closeStats(){lbBack();}
// Esc: si no hay nada que cancelar, abre o cierra la pausa (en PC)
let ESCIDLE=false;
addEventListener('keydown',e=>{if(e.key!=='Escape')return;
 ESCIDLE=!!(S&&S.list&&!document.body.classList.contains('inmenu')&&!S.aim&&!S.tsel&&!BM.s&&(S.phase!=='place'||S.pi==null)&&!S.selT&&!PR.pinned&&!RL.open&&!(LB.open&&!LB.cover)&&!FO.open&&!(typeof DLG!=='undefined'&&DLG.on)&&!(HQ&&HQ.cur)&&(S.phase==='build'||S.phase==='wave'||S.phase==='place'));},true);
addEventListener('keydown',e=>{if(e.key!=='Escape'||!ESCIDLE)return;ESCIDLE=false;if(PMU.open)closePause(true);else openPause();});

// ---- compra marcada: clic derecho (o mantener pulsado) en una mejora para comprarla sola cuando haya oro ----
const WISHTXT=()=>TOUCH?' Mantén pulsado el botón para marcarla: se comprará sola cuando tengas oro.':' Clic derecho en el botón para marcarla: se comprará sola cuando tengas oro.';
function wishOk(w){if(w.a==='build'){const q=sqOf(w.x,w.y);return bmFree(q)&&bmDeck().includes(w.v)?{q,c:bmCost(w.v)}:null;}
 const t=S.list.find(o=>o.id===w.id);if(!t)return null;const T=TW[t.type];
 if(w.a==='up')return t.lvl===w.lv&&t.lvl<(T.pig?4:3)?{t,c:tCost(t,upCost(T,t.lvl+1))}:null;
 if(w.a==='spec')return t.lvl===3&&SPECS[t.type]&&SPECS[t.type][w.v]?{t,c:tCost(t,upCost(T,4))}:null;
 if(w.a==='abuy'){const D=AB[w.v],rk=t.ab&&t.ab[w.v]||0;return t.lvl===4&&D&&rk===w.rk&&rk<D.ranks.length&&!abReq(t,w.v)?{t,c:tCost(t,D.ranks[rk].c)}:null;}
 return null;}
function wishToggle(b){if(!S||!S.list||!(S.phase==='build'||S.phase==='wave'||S.phase==='place'))return;
 if((b.dataset.tm||b.dataset.a)==='build'){const v=b.dataset.v,x=+b.dataset.sx,y=+b.dataset.sy;S.wish=S.wish||[];const i=S.wish.findIndex(w=>w.a==='build'&&w.x===x&&w.y===y);
  if(i>=0&&S.wish[i].v===v)S.wish.splice(i,1);else{if(i>=0)S.wish.splice(i,1);S.wish.push({a:'build',v,x,y});}BM.sig='';S.msg='';try{sfx('btn');}catch(e){}ui();return;}const a=b.dataset.a||b.dataset.tm,id=+b.dataset.id,v=b.dataset.v||'',t=S.list.find(o=>o.id===id);if(!t)return;
 S.wish=S.wish||[];const i=S.wish.findIndex(w=>w.a===a&&w.id===id&&w.v===v);
 if(i>=0)S.wish.splice(i,1);else{if(a==='spec')S.wish=S.wish.filter(w=>!(w.a==='spec'&&w.id===id));S.wish.push({a,id,v,lv:t.lvl,rk:a==='abuy'?(t.ab&&t.ab[v]||0):0});}
 S.msg='';try{sfx('btn');}catch(e){}wishDeco();ui();}
function wishDeco(){const L=(typeof S!=='undefined'&&S&&S.wish)||[];for(const b of document.querySelectorAll('button[data-a="up"],button[data-a="spec"],button[data-a="abuy"],#tmenu [data-tm="up"],#tmenu [data-tm="spec"],#tmenu [data-tm="abuy"]')){
 const on=L.some(w=>w.a===(b.dataset.a||b.dataset.tm)&&w.id===+b.dataset.id&&w.v===(b.dataset.v||''));if(b.classList.contains('wish')!==on)b.classList.toggle('wish',on);
 const tt=on?(TOUCH?'Marcada: se comprará sola cuando tengas oro. Mantén pulsado para desmarcar.':'Marcada: se comprará sola cuando tengas oro. Clic derecho para desmarcar.'):(TOUCH?'Mantén pulsado para marcarla y comprarla sola cuando tengas oro.':'Clic derecho: marcar para comprarla sola cuando tengas oro.');if(b.dataset.a&&b.title!==tt)b.title=tt;}}
function wishTick(){if(typeof S==='undefined'||!S||!S.wish||!S.wish.length)return;
 S.wish=S.wish.filter(w=>wishOk(w));if(!S.wish.length){wishDeco();return;}
 if(RL.open||!(S.phase==='build'||S.phase==='wave'))return;
 const w=S.wish[0],o=wishOk(w);if(!o||S.gold<o.c)return;
 if(w.a==='build'){const n=S.list.length;bmBuildNow(w.v,o.q);S.wish.shift();if(S.list.length>n)toast(WISHI+' <b>'+TW[w.v].n+'</b>: construida');return;}
 const t=o.t,T=TW[t.type],lv=t.lvl,rk=t.ab&&t.ab[w.v]||0;
 if(w.a==='up')upgrade(t);else if(w.a==='spec')chooseSpec(t,w.v);else buyAb(t,w.v);
 S.wish.shift();
 if(t.lvl!==lv||(t.ab&&(t.ab[w.v]||0)!==rk))toast(WISHI+' <b>'+T.n+'</b>: '+(w.a==='up'?'mejorada a Nv '+t.lvl:w.a==='spec'?'ahora es '+SPECS[t.type][w.v].n:AB[w.v].n+' a rango '+t.ab[w.v]));
 wishDeco();}
setInterval(()=>{try{wishTick();wishDeco();}catch(e){}},150);
// compras en cola: resumen en el margen izquierdo, en orden, con la barra de oro que falta para cada una
const WQ={sg:''};
function wqTick(){let el=document.getElementById('wishq');
 const L=(typeof S!=='undefined'&&S&&S.wish&&!PREVIEWING&&!document.body.classList.contains('inmenu')&&(S.phase==='build'||S.phase==='wave'||S.phase==='place'))?S.wish:[];
 if(!L.length){if(el)el.classList.remove('on');WQ.sg='';return;}
 if(!el){el=document.createElement('div');el.id='wishq';
  el.addEventListener('click',e=>{const b=e.target.closest('[data-wq]');if(!b)return;e.stopPropagation();S.wish.splice(+b.dataset.wq,1);try{sfx('btn');}catch(x){}wishDeco();wqTick();});}
 {/* en PC va bajo el contador de enemigos; en móvil, al margen derecho para que no se quede pequeño */const par=document.body.classList.contains('mfs')?rstack():lstack();if(el.parentNode!==par)par.appendChild(el);}
 let acc=0;const rows=[];
 L.forEach((w,i)=>{const o=wishOk(w);if(!o)return;let ic,nm,wt;
  if(w.a==='build'){ic=twIc(w.v);nm=TW[w.v].n;wt='Construir';}
  else{const t=o.t,T=TW[t.type],X=t.spec&&SPECS[t.type]?SPECS[t.type][t.spec]:null;ic=(X||T).ic;nm=(X||T).n;
   wt=w.a==='up'?'Mejorar a Nv '+(t.lvl+1):w.a==='spec'?'→ '+SPECS[t.type][w.v].n:AB[w.v].n+' · rango '+((t.ab&&t.ab[w.v]||0)+1);}
  // la primera se paga con el oro de ahora; las siguientes, con lo que sobre tras las anteriores
  const have=Math.max(0,S.gold-acc),pc=Math.min(1,have/o.c),f=Math.max(0,o.c-have);acc+=o.c;
  rows.push(`<div class="wqr${i===0?' nx':''}"><div class="wqh"><span class="wqi">${ic}</span><span class="wqn"><b>${nm}</b><small>${wt}</small></span><button data-wq="${i}" aria-label="Desmarcar">✕</button></div><div class="wqb"><i style="width:${Math.round(pc*100)}%"></i></div><div class="wqc"><em>${f>0?'Faltan <b>'+f+'</b> 🪙':'¡Lista!'}</em><span>${o.c} 🪙</span></div></div>`);});
 const h=`<div class="wqt">${WISHI} Compras en cola</div>${rows.join('')}`;
 if(h!==WQ.sg){WQ.sg=h;el.innerHTML=h;}el.classList.add('on');}
setInterval(()=>{try{wqTick();}catch(e){}},150);
{const HS='#mbr [data-a="hab"],#mbr [data-a="hult"]';let ht=null,hAt=0;
 const hk=b=>b.dataset.a==='hult'?(S.hero&&S.hero.lvl>=10?'u':null):'b';
 document.addEventListener('contextmenu',e=>{const b=e.target.closest&&e.target.closest(HS);if(!b)return;e.preventDefault();e.stopPropagation();if(performance.now()-hAt<900)return;const k=hk(b);if(k)habAutoToggle(k);},true);
 document.addEventListener('touchstart',e=>{const b=e.target.closest&&e.target.closest(HS);clearTimeout(ht);if(!b)return;ht=setTimeout(()=>{const k=hk(b);if(!k)return;hAt=performance.now();habAutoToggle(k);try{navigator.vibrate&&navigator.vibrate(20);}catch(x){}},500);},{passive:true,capture:true});
 for(const ev of ['touchend','touchmove','touchcancel'])document.addEventListener(ev,()=>clearTimeout(ht),{passive:true,capture:true});
 document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest(HS);if(b&&performance.now()-hAt<1500){hAt=0;e.stopPropagation();e.preventDefault();}},true);}
{const SEL='button[data-a="up"],button[data-a="spec"],button[data-a="abuy"],#tmenu [data-tm="up"],#tmenu [data-tm="spec"],#tmenu [data-tm="abuy"],#tmenu [data-tm="ofeed"],#bmenu [data-tm="build"]';let lpT=null,lpAt=0,lpEat=false;
 document.addEventListener('contextmenu',e=>{const b=e.target.closest&&e.target.closest(SEL);if(!b)return;e.preventDefault();if(performance.now()-lpAt<900)return;wishToggle(b);},true);
 document.addEventListener('touchstart',e=>{const b=e.target.closest&&e.target.closest(SEL);clearTimeout(lpT);if(!b)return;lpT=setTimeout(()=>{lpAt=performance.now();lpEat=true;wishToggle(b);try{navigator.vibrate&&navigator.vibrate(20);}catch(e){}},500);},{passive:true,capture:true});
 for(const ev of ['touchend','touchmove','touchcancel'])document.addEventListener(ev,()=>clearTimeout(lpT),{passive:true,capture:true});
 document.addEventListener('click',e=>{if(lpEat){lpEat=false;const b=e.target.closest&&e.target.closest(SEL);if(b&&performance.now()-lpAt<1500){e.stopPropagation();e.preventDefault();}}},true);}

// ---- ventanas sobre el mapa (eventos, reliquias, ofertas): 👁 para ocultarlas y ver el mapa, y el oro siempre a la vista ----
function peekLbl(){const r=$('relic');return r.querySelector('[data-a="relic"]')?'reliquias':r.querySelector('[data-a="towpick"]')?'oferta':r.querySelector('[data-a="evopt"],[data-a="evok"]')?'evento':'ventana';}
function setPeek(on){RL.peek=!!on;$('relic').classList.toggle('peek',RL.peek);let b=$('peekb');
 if(!b){b=document.createElement('button');b.id='peekb';b.onclick=()=>setPeek(false);$('cw').appendChild(b);}
 const l=peekLbl();b.textContent='👁 Volver '+(l==='reliquias'?'a las reliquias':l==='oferta'?'a la oferta':l==='evento'?'al evento':'a la ventana');b.title='Volver (Tab)';b.classList.toggle('on',RL.peek);
 if(RL.peek){closePrim();}ui();}
function rlBar(){const r=$('relic');if(!RL.open||RL.hpick||typeof S==='undefined'||!S||!S.list){if(RL.peek)setPeek(false);return;}
 if(!r.querySelector('[data-a="relic"],[data-a="towpick"],[data-a="evopt"],[data-a="evok"]'))return;
 let bar=r.querySelector('.rlbar');if(!bar){bar=document.createElement('div');bar.className='rlbar';bar.innerHTML='<span class="rlg"></span><button data-a="peek" title="Ocultar para ver el mapa ('+kbN('peek')+')">👁</button>';r.insertBefore(bar,r.firstChild);}
 const g=bar.querySelector('.rlg'),tx='🪙 '+S.gold;if(g.textContent!==tx)g.textContent=tx;}
setInterval(()=>{try{rlBar();}catch(e){}},150);
try{new MutationObserver(()=>{try{rlBar();}catch(e){}}).observe($('relic'),{childList:true});}catch(e){}
addEventListener('keydown',e=>{if(!kbIs('peek',e.key.toLowerCase())||!RL.open||RL.hpick||!$('relic').querySelector('.rlbar'))return;e.preventDefault();setPeek(!RL.peek);});

// ---- menú de pausa: es la portada del libro (ver libro.js) ----
const PMU={open:false,ask:0,spd:1};
function openPause(){if(!S)return;PMU.ask=0;PMU.svask=0;lbOpen(null,true);}
function closePause(resume){lbClose(resume);}
function renderPause(){lbRender();}

// botón de lupa (móvil)
(()=>{const b=document.createElement('button');b.id='lupa';b.dataset.a='lupa';b.title='Ver detalles';b.innerHTML='<svg viewBox="0 0 16 16" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><circle cx="6.8" cy="6.8" r="4.6"/><path d="M10.3 10.3L14 14"/></svg>';document.body.appendChild(b);b.addEventListener('click',e=>{e.stopPropagation();act(e);});
 document.addEventListener('pointerdown',e=>{if(!(e.target.closest&&e.target.closest('#lupa')))LUPA.sticky=false;},true);})();
$('rotx').addEventListener('click',()=>{document.body.classList.add('vert');setTimeout(setDsk,0);try{sessionStorage.setItem('rt-rot','1');}catch(e){}});
$('rotfs').addEventListener('click',()=>{enterFS();});if(!FSOK)$('rotfs').style.display='none';
$('rot').classList.add('on');try{if(sessionStorage.getItem('rt-rot'))document.body.classList.add('vert');}catch(e){}
$('zm').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const z=b.dataset.z;
 if(z==='f'&&IOS){iosNote(1);return;}if(z==='pt'){togglePtips();return;}if(z==='+')zoomSmooth(1.4,VIEW/2,VH/2);else if(z==='-')zoomSmooth(1/1.4,VIEW/2,VH/2);else if(z==='0'){camGo(ZMIN,N/2-.5,N/2-.5);}else if(z==='c'){camFit();}else if(z==='f')toggleFS();});
cv.addEventListener('contextmenu',e=>{e.preventDefault();if(!S||!S.list)return;if(S.aim&&S.aim!=='flag')return;const c=cell(e),t=S.occ[c.x+','+c.y];if(t)quickFlag(t);else if(S.aim==='flag'){S.aim=null;S.aimT=null;S.msg='';renderRelics();ui();}});
// móvil: mantener pulsada una torre ~0,5 s = mover su bandera
{let lp=null;cv.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'||!S||!S.list||S.aim)return;const c=cell(e),t=S.occ[c.x+','+c.y];if(!t)return;const x=e.clientX,y=e.clientY;lp={x,y,tm:setTimeout(()=>{if(lp&&quickFlag(t)){LPF=performance.now();try{navigator.vibrate&&navigator.vibrate(25);}catch(er){}}lp=null;},500)};});
 const cancel=e=>{if(lp&&(!e||e.type!=='pointermove'||Math.hypot(e.clientX-lp.x,e.clientY-lp.y)>10)){clearTimeout(lp.tm);lp=null;}};cv.addEventListener('pointermove',cancel);cv.addEventListener('pointerup',cancel);cv.addEventListener('pointercancel',cancel);}
let LPF=0;
cv.addEventListener('click',e=>{
 if(DRAGGED)return;if(performance.now()-LPF<700)return;
 const c=cell(e);M.x=e.clientX;M.y=e.clientY;
 if(MFSQ()&&!S.occ[c.x+','+c.y]&&S.aim!=='flag')S.selT=null;
 {const pp=portalAt(c);PTAP=pp&&PTAP!==pp?pp:null;}
 if(S.aim==='frost'){if(inb(c.x,c.y))castFreeze(c);return;}
 if(S.aim==='harpoon'){if(inb(c.x,c.y))castHarpoon(c);return;}
 if(S.aim==='faroz'){const f=S.list.find(o=>o.id===S.flzSel.id);if(f&&inb(c.x,c.y)){faroZones(f);f.lz[S.flzSel.i]={x:c.x,y:c.y};f.lzcd=f.lzcd||[0,0];f.lzcd[S.flzSel.i]=S.phase==='wave'?FCD[(f.lvl||1)-1]:0;try{sfx('ui');}catch(er){}}S.aim=null;S.msg='';renderRelics();ui();return;}
 if(S.aim==='pigs'){if(inb(c.x,c.y)&&S.cells[c.y][c.x]===2){for(const t of pigHouses())if(t&&t.pigT)setFlag(t,c);S.aim=null;S.msg='';try{sfx('ui');}catch(e){}}else S.msg='Elige una casilla del camino.';renderRelics();ui();return;}
 if(S.aim==='hero'){const H=S.hero;/* v307: solo cancela si pulsas su propia casilla; antes un radio de 1,35 se comía la casilla de al lado y no dejaba moverlo un paso */if(H&&H.s.hp>0&&c&&c.x===Math.round(H.s.x)&&c.y===Math.round(H.s.y)){S.aim=null;S.msg='';renderRelics();ui();return;}if(H&&inb(c.x,c.y)&&S.cells[c.y][c.x]===2){const fr={x:H.s.x,y:H.s.y};setFlag(H.pt,c);if(S.st)S.st.hmv=1;S.aim=null;S.msg='';heroSay(fr,c);}else S.msg='Elige una casilla del camino.';renderRelics();ui();return;}
 if(!S.aim&&heroAt(c)&&(S.phase==='build'||S.phase==='wave'||S.phase==='place')){bmClose();S.selT=null;try{tmClose();}catch(er){}clickA('[data-a="hero"]');return;}
 if(S.aim==='barricade'){const bp=barrPick(c.x,c.y);if(bp){S.barr.push({t:5,...bp});const st=S.rs.barricade;setCD('barricade');st.t=5;S.aim=null;S.msg='';}else S.msg='Elige una casilla del camino.';renderRelics();ui();return;}
 if(S.aim==='uplace'){uPlaceAt(c);return;}
 if(S.aim==='dism'){dismAt(c);return;}
 if(S.aim==='sharp'){if(aimConfirm(c))return;sharpAt(c);S.acf=null;return;}
 if(S.aim==='vch'){if(aimConfirm(c))return;vchAt(c);S.acf=null;return;}
 if(S.aim==='fav'){favAt(c);return;}
 if(S.aim==='mecha'){if(mechaOk()){S.aim=null;ui();return;}castMecha(c);return;}
 if(S.aim==='habb'||S.aim==='habu'){if(habOk(S.aim.slice(3))){S.aim=null;ui();return;}castHab(c,S.aim.slice(3));return;}
 if(S.aim==='ember'){if(inb(c.x,c.y))castEmber(c);return;}
 if(S.aim==='hammer'){if(aimConfirm(c))return;hammerAt(c);S.acf=null;return;}
 if(S.aim==='balance'){if(inb(c.x,c.y)){(S.bz=S.bz||[]).push({x:c.x,y:c.y,r:3*K,t:8,tk:0});const st=S.rs.balance;setCD('balance');st.t=8;S.aim=null;S.msg='';renderRelics();ui();}return;}
 if(S.aim==='tome'){if(inb(c.x,c.y)){S.tz.push({x:c.x,y:c.y,r:TZR,t:8});const st=S.rs.tome;setCD('tome');st.t=8;S.aim=null;S.msg='';renderRelics();ui();}return;}
 if(S.aim==='quiver'){if(inb(c.x,c.y)){S.dbl.push({x:c.x,y:c.y,r:QR,t:10});const st=S.rs.quiver;setCD('quiver');st.t=10;S.aim=null;S.msg='';renderRelics();ui();}return;}
 if(S.aim==='flag'){const t=S.aimT;if(t&&S.list.includes(t)){const st=stats(t);if(inb(c.x,c.y)&&S.cells[c.y][c.x]===2&&Math.hypot(c.x-t.x,c.y-t.y)<=st.range){setFlag(t,c);S.aim=null;S.aimT=null;S.msg='Bandera movida.';if(MFSQ()){S.selT=null;hideLupa();}}else if(Math.hypot(c.x-t.x,c.y-t.y)>st.range){S.aim=null;S.aimT=null;S.msg='';}else S.msg='Elige una casilla del camino dentro del rango. Haz clic fuera del círculo para cancelar.';}else{S.aim=null;S.aimT=null;}renderRelics();ui();return;}
{const fx=c.fx-.5,fy=c.fy-.5;let be=null,bd=1.4;
  for(const q of S.enemies){const dd=Math.hypot(q.x-fx,q.y-fy);if(dd<bd){bd=dd;be=q;}}
  if(be&&MFSQ()){S.tsel=null;S.selE=be;LUPA.tg={key:'ei:'+(++EID),html:()=>enemyInst(be),get rect(){return be.hp>0?cellRect(be.x,be.y):null;}};LUPA.sticky=true;placeLupa(LUPA.tg.rect);ui();return;}
  if(be){S.tsel=null;openPrim({key:'ei:'+(++EID),html:()=>enemyInst(be),rect:cellRect(be.x,be.y)});PR.pinned=true;refreshPrim();S.selE=be;ui();return;}}
 const t=S.occ[c.x+','+c.y];
 if(t){ // clic en una torre: abre (o cierra) su menú de botones; la ficha completa se abre con la lupa del menú
  S.tsel=null;
  S.pi=null;
  if(PR.pinned){closePrim();}if(MFSQ())hideLupa();
  bmClose();
  if(S.selT===t&&TM.t===t){S.selT=null;tmClose();ui();return;}
  S.selT=t;tmOpen(t);ui();return;}
 // con una torre seleccionada, un clic en cualquier otra casilla solo cierra su menú
 if(S.selT&&!S.aim&&!S.tsel){S.selT=null;try{tmClose();}catch(er){}ui();return;}
 if(S.phase==='place'){if(S.pi==null)return;if(payOn()&&pcost(S.offers[S.pi])>S.gold){S.msg='No tienes oro suficiente para las casillas especiales de esta pieza.';ui();return;}const bx=Math.floor(c.x/(P*K)),by=Math.floor(c.y/(P*K)),free=bx>=0&&by>=0&&bx<BN&&by<BN&&!S.blocks[bx+','+by],r=free?check(bx,by,S.offers[S.pi].p):1;
  if(r===0)placePiece(bx,by);
  else{S.pi=null;S.msg=free?(r===2?'Esa pieza cierra el camino: no deja ningún extremo libre para seguir ampliando.':r===3?'Ahí te meterías en un callejón sin salida: la siguiente pieza cerraría el camino sí o sí. Prueba en otro sitio, gírala o elige otra pieza.':'Ahí no encaja: elige un hueco junto al mapa donde se unan dos caminos.'):'';ui();}}
 else if(S.phase==='build'||S.phase==='wave'){if(S.tsel)build(c.x,c.y);else bmTap(c);}
});
// un toque fuera del mapa (salvo el menú de torres, el zoom y los paneles de información) quita la torre elegida
document.addEventListener('click',e=>{
 if(S&&S.selT&&!S.aim&&e.target!==cv&&e.target.closest&&!e.target.closest('#tmenu,#tip,#side,.kpanel,#zm,#comp,#relic,#hint,#mbr,#mbl,#mtl,#relics')){S.selT=null;try{tmClose();}catch(er){}ui();}
 if(S&&BM.s&&e.target!==cv&&!(e.target.closest&&(e.target.closest('#bmenu')||e.target.closest('#zm'))))bmClose();
 if(!S||(!S.tsel&&S.pi==null))return;const tg=e.target;if(tg===cv)return;
 if(tg.closest&&(tg.closest('[data-a="sel"]')||tg.closest('[data-a="pick"]')||tg.closest('[data-a="prot"]')||tg.closest('#zm')||tg.closest('#tip')||tg.closest('.kpanel')||tg.closest('#side')))return;
 if(S.pi!=null){S.pi=null;ui();}unsel();
});
// un clic fuera del panel fijado y de su torre lo suelta
document.addEventListener('click',e=>{
 if(!PR.pinned)return;const tg=e.target;
 if(tg.closest&&(tg.closest('#tip')||tg.closest('#side')||tg.closest('.kpanel')))return;
 if(tg===cv){const c=cell(e),t=S.occ[c.x+','+c.y];if(t&&PR.key==='tw:'+t.id)return;}
 closePrim();
},true);
function rotate(){if(S.phase==='place'&&S.pi!=null){rotO(S.offers[S.pi]);ui();}}
addEventListener('keydown',e=>{if(RL.open&&RL.hpick&&(e.key==='ArrowLeft'||e.key==='ArrowRight')){heroNav(e.key==='ArrowLeft'?-1:1);e.preventDefault();return;}if(RL.open&&RL.hpick&&e.key==='Enter'&&!HEROES[RL.hsel].lockTxt){chooseHero(RL.hsel);return;}if(RL.open&&RL.hpick&&e.key==='Escape'&&RL.hconf){RL.hconf=null;renderHeroPick();return;}if(e.key==='Escape'&&LB.open&&LB.fromWin){lbBack();return;}if(RL.open)return;if(e.key==='Escape'&&S.aim&&S.aim!=='uplace'&&S.aim!=='dism'&&S.aim!=='sharp'){S.aim=null;S.mimFor=null;S.aimT=null;S.msg='';renderRelics();ui();return;}if(e.key==='Escape'&&LB.open&&!LB.cover){lbBack();}else if(e.key==='Escape'&&LB.open&&LB.cover&&document.body.classList.contains('inmenu')&&!e.repeat){if(!LB.exit){LB.exit=1;lbRender();}else exitGame();}else if(e.key==='Escape'&&PR.pinned)closePrim();else if(kbIs('rot',e.key.toLowerCase())&&!LB.open&&!S.aim&&keyOK(e))rotate();});
// elegir torre para un efecto que no se puede deshacer (afilar, vale, martillo): primero se marca, después se confirma pulsando otra vez la misma torre
function aimConfirm(c){const t=S.occ[c.x+','+c.y];const ok=t&&(S.aim==='sharp'?sharpOk(t):S.aim==='vch'?vchOk(S.vty,t):(t.lvl<3&&!TW[t.type].uniq));if(!ok)return false;
 if(S.acf&&S.acf.t===t&&S.acf.aim===S.aim)return false;S.acf={t,aim:S.aim};try{sfx('ui');}catch(e){}
 const w=S.aim==='sharp'?'afilar':S.aim==='hammer'?'subir de nivel':'usar el vale en';toast('¿Seguro que quieres '+w+' <b>'+tinfo(t).n+'</b>? Pulsa otra vez la misma torre para confirmar.');return true;}
const AIMLOCK=['pick','rot','prot','sel','wave','sell','up','spec','abuy','pin4','close','tgt','tgtall','tgtdef','flag'];
// botón Nv de una torre: siguiente nivel que el jugador ya ha visto; si no lo ha alcanzado, aviso
function nextLv(k){const cur=CP.lv[k]||1;let nx=cur>=4?1:cur+1;if(nx===4&&!tlvOk(k,4)&&tlvOk(k,5))nx=5;if(!tlvOk(k,nx)){errBubble('No has alcanzado aún ese nivel.');return 1;}return nx;}
function otherSpec(k){const cur=CP.lv[k]||1,nx=cur===4?5:4;if(!tlvOk(k,nx)){errBubble('No has alcanzado aún ese nivel.');return cur;}return nx;}
// salir del juego: de momento cierra la pestaña (solo funciona si el navegador lo permite; si no, se avisa)
function exitGame(){LB.exit=0;try{saveRun&&svLive()&&saveRun('exit');}catch(e){}try{window.close();}catch(e){}setTimeout(()=>{if(!window.closed){lbRender();toast('🚪 Tu navegador no deja cerrar la pestaña desde el juego: ciérrala tú (Ctrl+W).');}},250);}
// bocadillos de los portales siempre visibles: se encienden y apagan con un botón del mapa (o la tecla P)
function togglePtips(){const on=!(OPT.ptip||OPT.ptipw);OPT.ptip=OPT.ptipw=on;saveOpt();const b=$('ptb');if(b)b.classList.toggle('on',on);try{sfx('ui');}catch(e){}toast(on?'💀 Bocadillos de los portales: siempre visibles':'💀 Bocadillos de los portales: solo al pasar el ratón');}
function act(e){
 const b=e.target.closest('button')||(e.target.closest&&!e.target.closest('summary')&&!e.target.closest('.kw')?e.target.closest('[data-a="hsel"]'):null);if(!b)return;const a=b.dataset.a;
 /* con una ventana (oferta, cofre, evento) abierta solo valen sus botones… salvo dentro del libro abierto encima (compendio desde el mazo, las reliquias o el 📖) */
 if(RL.open&&!(LB.open&&b.closest&&b.closest('#comp'))&&!['tutok','tutplay','tutmenu','relic','pickhero','evopt','evok','hsel','hdet','hnav','hgo','hconf','hcancel','towpick','towskip','towok','dreroll','erasel','era2hok','wincomp','tdet','clv','cbr','clvs','menuask','menu','peek'].includes(a))return;
 if(S.aim&&(AIMLOCK.includes(a)||(a==='ract'&&b.dataset.id!==S.aim)||(a==='hero'&&S.aim!=='hero')||(a==='vch'&&S.aim!=='vch')||(a==='hab'&&S.aim!=='habb')||(a==='hult'&&S.aim!=='habu'))){S.msg='Primero termina o cancela la acción en curso.';ui();return;}
 if(a==='pick'){const i=+b.dataset.i;S.pi=S.pi===i?null:i;S.pexp=false;ui();}
 else if(a==='lupa'){const tg=LUPA.tg;hideLupa();if(tg){openPrim({key:tg.key,html:tg.html,rect:tg.rect||{l:0,t:0,r:0,b:0},dom:tg.dom,cell:tg.cell});PR.pinned=true;refreshPrim();ui();}}
 else if(a==='pexp'){S.pexp=!S.pexp;ui();}
 else if(a==='prot'){const o=S.offers[+b.dataset.i];if(o&&S.phase==='place'){rotO(o);ui();}}
 else if(a==='rot')rotate();
 else if(a==='sel'){S.tsel=S.tsel===b.dataset.k?null:b.dataset.k;ui();}
 else if(a==='wave'){if(b.dataset.now||(WARM&&performance.now()-WARM<3000)){WARM=0;startWave();}else{WARM=performance.now();try{sfx('ui');}catch(e){}ui();setTimeout(()=>{if(WARM&&performance.now()-WARM>=3000){WARM=0;ui();}},3050);}}
 else if(a==='spd'){S.speed=+b.dataset.v;ui();}
 else if(a==='spdt'){if(S.speed===0)S.speed=S.lspd||1;else{S.lspd=S.speed;S.speed=0;}ui();}
 else if(a==='spdc'){const L=[.5,1,2,3],c=S.lspd||1,n=L[(L.indexOf(c)+1)%L.length]||1;S.lspd=n;S.speed=n;ui();}
 else if(a==='pause')openPause();
 else if(a==='pcont')closePause(true);
 else if(a==='phelp')lbOpen('hp');
 else if(a==='pstats'){STW.tab=STW.tab||'run';lbOpen('st');}
 else if(a==='pretry'){closePause(true);retryWave();}
 else if(a==='lbarea'){const v=b.dataset.v;if(v==='cp'&&!compOk()){lockToast('Compendio bloqueado','curious');return;}PMU.ask=0;lbOpen(v);}
 else if(a==='lbx')lbBack();
 else if(a==='lbprev')lbStep(-1);
 else if(a==='lbnext')lbStep(1);
 else if(a==='lbcont')lbClose(true);
 else if(a==='stab'){STW.tab=b.dataset.v;CP.pageR=false;lbRender();}
 else if(a==='lbhp'){LB.hp=b.dataset.v;LB.note='';CP.pageR=false;lbRender();}
 else if(a==='lbgo'){const [ar,tb]=b.dataset.v.split(':');if(ar==='op'&&tb)OP.tab=tb;lbOpen(ar);}
 else if(a==='pfs'){if(IOS){iosNote(1);return;}toggleFS();setTimeout(renderPause,200);}
 else if(a==='pquit'){if(PMU.ask){closePause(false);saveClear();showMenu();}else{PMU.ask=1;renderPause();}}
 else if(a==='psave'){if(S.phase==='wave'&&!PMU.svask){PMU.svask=1;toast('💾 La partida se reanudará al principio de esta oleada (ronda '+Math.min(S.round,ROUNDS)+'). Pulsa otra vez para guardar y salir.');return;}PMU.svask=0;saveAndExit();}
 else if(a==='lbload'){LB.ask=0;continueRun();}
 else if(a==='pcomp'){if(!compOk()){lockToast('Compendio bloqueado','curious');return;}lbOpen('cp');}
 else if(a==='pach')lbOpen('lg');
 else if(a==='popts')lbOpen('op');
 else if(a==='sell')sell(S.selT);
 else if(a==='peek'){setPeek(true);}
 else if(a==='up'){const t=S.list.find(o=>o.id===+b.dataset.id);upgrade(t);}
 else if(a==='spec'){chooseSpec(S.list.find(o=>o.id===+b.dataset.id),b.dataset.v);}
 else if(a==='abuy'){buyAb(S.list.find(o=>o.id===+b.dataset.id),b.dataset.v);}
 else if(a==='pin4'){const t=S.list.find(o=>o.id===+b.dataset.id);if(t)pinTower(t);}
 else if(a==='close'){S.selT=null;ui();}
 else if(a==='pm')setPM(b.dataset.v);
 else if(a==='comp'){if(!compOk()&&!CP.open){lockToast('Compendio bloqueado','curious');return;}if(LB.open&&!LB.cover&&CP.open)lbBack();else lbOpen('cp');}
 else if(a==='cclose')lbBack();
 else if(a==='ctab'){CP.tab=b.dataset.v;CP.prev=null;CP.eprev=null;PE=null;CP.hprev=null;PHV=null;CP.pageR=false;renderComp();}
 else if(a==='csel'){CP.sel[CP.tab]=b.dataset.v;CP.prev=null;CP.eprev=null;PE=null;CP.hprev=null;PHV=null;CP.pageR=true;renderComp();}
 else if(a==='cbkl'){CP.pageR=false;CP.prev=null;CP.eprev=null;PE=null;CP.hprev=null;PHV=null;renderComp();}
 else if(a==='cachgo'){cpGo('lg',b.dataset.v);}
 else if(a==='cprev'){const es=Object.keys(ET).filter(e=>seen('en',e));if(!es.includes(CP.pen))CP.pen=es[0]||'norm';CP.prev=b.dataset.v;newPrev(CP.prev,CP.pen);$('comp').scrollTop=0;renderComp();}
 else if(a==='cflt'){const sc=$('comp').scrollTop;if(b.dataset.v)CP.flt[b.dataset.f]=b.dataset.v;else delete CP.flt[b.dataset.f];renderComp();$('comp').scrollTop=sc;}
 else if(a==='pvpill'){const sl=$(b.dataset.s);if(sl){sl.value=b.dataset.v;sl.dispatchEvent(new Event('change',{bubbles:true}));}b.parentElement.querySelectorAll('.bkpill').forEach(x=>x.classList.toggle('on',x===b));}
 else if(a==='cback'){CP.prev=null;PV=null;renderComp();}
 else if(a==='cpcv'){const sc=$('comp').scrollTop,i=+b.dataset.v,n=(SOLARES[PIECES[i].n]||[1]).length;CP.pcv=CP.pcv||{};CP.pcv[i]=((CP.pcv[i]||0)+1)%n;renderComp();$('comp').scrollTop=sc;}
 else if(a==='ceprev'){CP.eprev=b.dataset.v;newEPrev(CP.eprev,CP.ph||'hero:reinhart');$('comp').scrollTop=0;renderComp();}
 else if(a==='ceback'){CP.eprev=null;PE=null;renderComp();}
 else if(a==='chprev'){CP.hprev=b.dataset.v;if(!hlvOk(CP.hprev,CP.hlv||1))CP.hlv=1;CP.hlv=CP.hlv||1;const es=Object.keys(ET).filter(e=>seen('en',e));if(!es.includes(CP.hen))CP.hen=es[0]||'norm';newHPrev(CP.hprev,CP.hen,CP.hlv);$('comp').scrollTop=0;renderComp();}
 else if(a==='chback'){CP.hprev=null;PHV=null;renderComp();}
 else if(a==='glv'){const sc=$('comp').scrollTop;for(const k in TW)if(!TW[k].uniq)CP.lv[k]=glState(k,b.dataset.v);renderComp();$('comp').scrollTop=sc;}
 else if(a==='clvs'){const k=b.dataset.v,n=+b.dataset.n;if(!tlvOk(k,n)){errBubble('No has alcanzado aún ese nivel.');return;}CP.lv[k]=n;
  if(RL.open&&b.closest('#relic')){const c=b.closest('.tcard')||(b.closest('.tof')&&b.closest('.tof').querySelector('.tdt .tcard'));if(c)c.innerHTML=shopInfo(k,1);const gl=b.closest('.tof')&&b.closest('.tof').querySelector('.tgl');if(gl)gl.innerHTML=tofGlance(k);}
  else{const sc=$('comp').scrollTop;if(CP.prev===k)newPrev(k,CP.pen);renderComp();$('comp').scrollTop=sc;}}
 else if((a==='clv'||a==='cbr')&&RL.open&&b.closest('#relic')){/* Nv dentro de «Ver detalles» de la oferta de torres: se cambia ahí mismo */const k=b.dataset.v;CP.lv[k]=a==='cbr'?otherSpec(k):nextLv(k);const c=b.closest('.tcard');if(c)c.innerHTML=shopInfo(k,1);const gl=b.closest('.tof')&&b.closest('.tof').querySelector('.tgl');if(gl)gl.innerHTML=tofGlance(k);}
 else if(a==='cbr'){const sc=$('comp').scrollTop,k=b.dataset.v;CP.lv[k]=otherSpec(k);if(CP.prev===k)newPrev(k,CP.pen);renderComp();$('comp').scrollTop=sc;}
 else if(a==='clv'){const sc=$('comp').scrollTop,k=b.dataset.v;CP.lv[k]=nextLv(k);if(CP.prev===k)newPrev(k,CP.pen);renderComp();$('comp').scrollTop=sc;}
 else if(a==='csupall'){const sc=$('comp').scrollTop,all=BK.every(k=>CP.sup[k]);for(const k of BK)CP.sup[k]=!all;renderComp();$('comp').scrollTop=sc;}
 else if(a==='csup'){const sc=$('comp').scrollTop;CP.sup[b.dataset.v]=!CP.sup[b.dataset.v];renderComp();$('comp').scrollTop=sc;}
 else if(a==='opts'){if(LB.open&&!LB.cover&&OP.open)lbBack();else lbOpen('op');}
 else if(a==='oclose')lbBack();
 else if(a==='kbset'){const s=+(b.dataset.s||0);if(KBC.on===b.dataset.v&&KBC.s===s)KBC.on=null;else{KBC.on=b.dataset.v;KBC.s=s;}KBC.note='';renderOpts();}
 else if(a==='kbreset'){KB=Object.assign({},KBDEF);KB2=Object.assign({},KB2DEF);kbSave();KBC.on=null;KBC.note='Atajos restablecidos.';renderOpts();}
 else if(a==='otab'){KBC.on=null;KBC.note='';OP.tab=b.dataset.v;OP.keepS=0;renderOpts();}
 else if(a==='sname'){const v=($('cname').value||'').trim().slice(0,16);if(v){STO.name=v;saveSto();toast('ÉTER te llamará <b>'+escH(v)+'</b>.');}renderOpts();}
 else if(a==='preset'){if(!OP.rst){OP.rst=1;renderOpts();return;}for(const k of['rt-alks','rt-story','rt-ach','rt-seen','rt-hlv','rt-evmem','rt-rev','rt-runl','rt-rounds','rt-tutdone','rt-win1','rt-tutchoice','rt-qdone','rt-hints','rt-lasthero','rt-achpin','rt-achbest','rt-cur','rt-hwin','rt-newu','rt-ruse','rt-tlv','rt-era'])try{localStorage.removeItem(k);}catch(e){}
  // también lo que es progreso dentro de las opciones: desbloqueos y personalización
  for(const k of Object.keys(OPT))if(k.startsWith('u_'))OPT[k]=false;OPT.pal='perg';OPT.skin='auto';OPT.core='base';OPT.decoff={};saveOpt();location.reload();}
 else if(a==='opt'){const o=OPTS[+b.dataset.i];OPT[o.key]=!OPT[o.key];saveOpt();if(o.key.startsWith('u_'))applyUnl();renderOpts();}
 else if(a==='cspal'){OPT.pal=b.dataset.v;saveOpt();applyPal();renderOpts();}
 else if(a==='cscore'){OPT.core=b.dataset.v;saveOpt();renderOpts();}
 else if(a==='dreroll')diceReroll(b.dataset.k);
 else if(a==='csex'){OPT['cs_'+b.dataset.k]=b.dataset.v;saveOpt();renderOpts();}
 else if(a==='csfx'){OPT.fxoff=OPT.fxoff||{};OPT.fxoff[b.dataset.v]=!OPT.fxoff[b.dataset.v];saveOpt();renderOpts();}
 else if(a==='csdec'){OPT.decoff=OPT.decoff||{};OPT.decoff[b.dataset.v]=!OPT.decoff[b.dataset.v];saveOpt();renderOpts();}
 else if(a==='nuok'){$('menu').classList.remove('setup');lbBack();}
 else if(a==='nusel'){if(LB.msg){LB.msg.sel=+b.dataset.v;lbRender();}}
 else if(a==='achf'){CP.af=b.dataset.v;renderComp();}
 else if(a==='achs'){CP.as=b.dataset.v;renderComp();}
 else if(a==='sfxt'){sfxTest(b.dataset.v,+b.dataset.i||0);renderOpts();}
 else if(a==='optc'){OPTS[+b.dataset.i].set(b.dataset.v);renderOpts();}
 else if(a==='tgt'||a==='tgtall'||a==='tgtdef'){
  const t=S.list.find(o=>o.id===+b.dataset.id);
  if(t){
   if(a==='tgt'){t.mode=b.dataset.v;t.tgt=null;t.mman=1;}
   else if(a==='tgtall'){let n=0;for(const o of S.list)if(o.type===t.type){o.mode=t.mode;o.tgt=null;o.mman=1;n++;}
    S.msg='Objetivo «'+TGT[t.mode].n+'» aplicado a '+n+(n===1?' torre':' torres')+' de '+TW[t.type].n+'.';ui();}
   else{S.dtg[t.type]=t.mode;S.msg='Las nuevas torres de '+TW[t.type].n+' empezarán con «'+TGT[t.mode].n+'».';ui();}
   refreshPrim();}}
 else if(a==='flag'){const t=S.list.find(o=>o.id===+b.dataset.id);if(t)startFlag(t);}
 else if(a==='ract')useRelic(b.dataset.id);
 else if(a==='vch'){if(!RL.open)useVch(b.dataset.id);}
 else if(a==='hab'){if(S.hero&&!RL.open)startHab('b');}
 else if(a==='mecha'){if(!RL.open)startMecha();}
 else if(a==='hult'){if(S.hero&&!RL.open)startHab('u');}
 else if(a==='pigs'){if(RL.open||!pigsOn())return;if(S.aim==='pigs'){S.aim=null;S.msg='';}else{closePrim();S.aim='pigs';S.aimT=null;S.msg='Elige una casilla del camino a la que mover a los cerditos (Esc o el mismo botón para cancelar).';}renderRelics();ui();}
 else if(a==='hero'){if(!S.hero||RL.open)return;if(S.aim==='hero'){S.aim=null;S.msg='';}else{closePrim();S.aim='hero';S.aimT=null;/* v307: en el tutorial, el héroe se explica en cuanto lo tocas */if(S.tut&&!S.tut.heroT){S.tut.heroT=1;hint('hero','Tu héroe',HEROTXT2,null);}S.msg='Elige una casilla del camino donde colocar a '+S.hero.def.n+' (clic; Esc o el mismo icono para cancelar).';}renderRelics();ui();}
 else if(a==='pickhero'){if(b.dataset.id)chooseHero(b.dataset.id);}
 else if(a==='hdet'){RL.hdet=!RL.hdet;RL.dman={};RL.rman={};const sc=$('relic').scrollTop;renderHeroPick();$('relic').scrollTop=sc;}
 else if(a==='hsel'){if(RL.hsel!==b.dataset.id&&!RL.hdet)RL.dman={};RL.rman={};RL.hsel=b.dataset.id;const sc=$('relic').scrollTop;renderHeroPick();$('relic').scrollTop=sc;}
 else if(a==='towpick'){towerPick(b.dataset.k);}
 else if(a==='towskip'){towerSkip();}
 else if(a==='towok'){towerOk();}
 else if(a==='ppeek'){S.ppk=S.ppk?0:1;ui();}
 else if(a==='tdet'){/* detalles de todas las torres de la oferta a la vez */RL.tdet=!RL.tdet;$('relic').classList.toggle('tdeton',!!RL.tdet);b.textContent=RL.tdet?'− Ocultar detalles':'+ Ver detalles';}
 else if(a==='wincomp'){CP.tab=b.dataset.v||'tw';CP.pageR=false;LB.fromWin=1;lbOpen('cp');}
 else if(a==='hnav'){heroNav(+b.dataset.v);}
 else if(a==='tutok'){RL.open=false;$('relic').classList.remove('open');ui();}
 else if(a==='tutmenu'){showMenu();}
 else if(a==='tutplay'){showMenu();renderEra();}
 else if(a==='hgo'){const ids=HIDS(),d=ids.indexOf(b.dataset.id)-ids.indexOf(RL.hsel);if(d){RL.hconf=null;RL.hsel=b.dataset.id;RL.hdir=d>0?1:-1;renderHeroPick();}}
 else if(a==='hconf'){if(b.dataset.id){RL.hconf=b.dataset.id;renderHeroPick();}}
 else if(a==='hcancel'){RL.hconf=null;renderHeroPick();}
 else if(a==='relic'){if(RL.fromChest){(S.chestRel=S.chestRel||[]).push(b.dataset.id);RL.fromChest=false;}S.relics.push(b.dataset.id);S.rs[b.dataset.id]={cd:0,t:0};relicHints(b.dataset.id);RL.open=false;$('relic').classList.remove('open');renderRelics();ui();}
 else if(a==='reset'){LB.end=null;lbClose(false,true);init();}
 else if(a==='focusok'){closeFocus();ui();}
 else if(a==='evopt')chooseEvent(+b.dataset.i);
 else if(a==='evok')closeEvent();
 else if(a==='gup')guildUp(S.list.find(o=>o.id===+b.dataset.id));
 else if(a==='pexit'){if(!LB.exit){LB.exit=1;lbRender();return;}exitGame();}
 else if(a==='newgame'){if(SAV.meta&&!LB.ask){LB.ask=1;lbRender();return;}LB.ask=0;const go=()=>{if(!tutChosen())renderTutPick();else renderEra();};go();}
 else if(a==='erago')renderSetup();
 else if(a==='erasel')eraPick(b.dataset.v);
 else if(a==='era2hok'){hintSeen('era2mk');lbRender();}
 else if(a==='lbprep'){LB.step=b.dataset.v;lbRender();}
 else if(a==='lbcover'){closeQuick();lbOpen(null,true);}
 else if(a==='help')renderHelp();
 else if(a==='credits')renderCredits();
 else if(a==='ulv'){CP.ulv=CP.ulv||{};if(lvSec(b.dataset.k,+b.dataset.v)){errBubble('No has alcanzado aún ese nivel.');CP.ulv[b.dataset.k]=1;}else CP.ulv[b.dataset.k]=+b.dataset.v;if(CP.prev===b.dataset.k)newPrev(CP.prev,CP.pen);const sc=$('comp').scrollTop;renderComp();$('comp').scrollTop=sc;}
 else if(a==='achm'){APAN.open=false;apanTick();lbOpen('lg');}
 else if(a==='apan'){APAN.open=!APAN.open;apanTick();}
 else if(a==='apin'){const id=b.dataset.id;if(PINS.includes(id))PINS=PINS.filter(x=>x!==id);else if(PINS.length>=3){toast('📌 Ya tienes 3 logros fijados: quita uno para fijar este.');return;}else PINS.push(id);savePins();if(LB.open&&!LB.cover){const sc=$('comp').scrollTop;lbRender();$('comp').scrollTop=sc;}else if(RL.open&&RL.hpick&&typeof renderHeroPick==='function')renderHeroPick();apanTick(1);}
 else if((a==='tutfull'||a==='tutquick')&&LB.open&&LB.step==='learn'&&LB.tsel!==a){LB.tsel=a;lbRender();}/* v307: primer toque elige; el segundo (o «Empezar») confirma */
 else if(a==='tutgo'){const t=LB.tsel;LB.tsel=null;if(t){const q=document.createElement('button');q.dataset.a=t;q.style.display='none';document.body.appendChild(q);LB.step=null;q.click();q.remove();}}
 else if(a==='tutfull'){LB.tsel=null;try{localStorage.setItem('rt-tutchoice','full');}catch(e){}closeQuick();startTut();}
 else if(a==='tutquick'){const first=!tutChosen();try{localStorage.setItem('rt-tutchoice','quick');}catch(e){}openQuick(first?'setup':'help');}
 else if(a==='qprev'){if(QS.i>0){QS.i--;renderQuick();}}
 else if(a==='qnext'){if(QS.i<QSL.length-1){QS.i++;renderQuick();}}
 else if(a==='qend'||a==='qskip'){if(QS.on)quickSeen();if(a==='qend'){try{localStorage.setItem('rt-qdone','1');}catch(e){}}closeQuick();if(QS.after==='setup'){renderEra();}else renderHelp();}
 else if(a==='hreset'){HSEEN={};try{localStorage.removeItem('rt-hints');}catch(e){}LB.note='Pistas restablecidas ✓';lbRender();}
 else if(a==='begin')startGame();
 else if(a==='tutskip'){try{localStorage.setItem('rt-tutchoice','skip');}catch(e){}OPT.hints=false;saveOpt();renderSkip();}
 else if(a==='skipok')renderEra();
 else if(a==='htog'){OPT.hints=!OPT.hints;saveOpt();lbRender();}
 else if(a==='mback'){closeQuick();$('menu').classList.remove('setup');if(document.body.classList.contains('inmenu'))lbOpen(null,true);}
 else if(a==='rnd')setRounds(MR+ +b.dataset.v);
 else if(a==='menu')showMenu();
 else if(a==='menuask'){if(S.mask){S.mask=0;showMenu();}else{S.mask=1;S.msg='Pulsa ⏻ otra vez para abandonar la partida.';ui();setTimeout(()=>{if(S.mask){S.mask=0;if(S.msg.startsWith('Pulsa ⏻'))S.msg='';ui();}},3000);}}
 else if(a==='retry'){if(b.dataset.now||S.rask){S.rask=0;retryWave();/* v305: desde el libro (fin de partida o pausa) se cierra para ver la oleada reintentada */try{if(LB.open)lbClose(true,true);}catch(e){}}else if(S.phase==='wave'&&S.snap&&S.rc>0){S.rask=1;S.msg='Pulsa ↺ otra vez para reintentar la oleada (gasta 1 carga).';ui();setTimeout(()=>{if(S.rask){S.rask=0;if(S.msg.startsWith('Pulsa ↺'))S.msg='';ui();}},3000);}}
 else if(a==='results'){if(LB.end)lbOpen('end');}
 else if(a==='hideend'){if(LB.open&&LB.area==='end')lbClose(true);}
}
$('ui').addEventListener('click',act);$('apan').addEventListener('click',act);$('mtl').addEventListener('click',act);$('mbl').addEventListener('click',act);$('mbr').addEventListener('click',act);$('relic').addEventListener('toggle',e=>{const d=e.target;if(d.dataset&&d.dataset.k&&d.open)curSeen(d.dataset.k);if(d.classList&&d.classList.contains('hpvd')){RL.hpvo=d.open;fitHero();}if(d.classList&&d.classList.contains('hdet')&&d.dataset.id){RL.dman=RL.dman||{};RL.dman[d.dataset.id]=d.open;}if(d.classList&&d.classList.contains('rdet')&&d.dataset.id){RL.rman=RL.rman||{};RL.rman[d.dataset.id]=d.open;}},true);$('menu').addEventListener('click',act);$('focus').addEventListener('click',act);$('menu').addEventListener('input',e=>{if(e.target.id==='rrange')setRounds(+e.target.value);});$('comp').addEventListener('input',e=>{if(e.target.id==='rrange')setRounds(+e.target.value);});$('endscr').addEventListener('click',act);$('ctl').addEventListener('click',act);$('opt').addEventListener('click',act);$('comp').addEventListener('click',act);document.addEventListener('change',e=>{const el=e.target;if(el.classList&&el.classList.contains('tsel')){const t=S.list.find(o=>o.id===+el.dataset.id);if(t&&!S.aim){t.mode=el.value;t.tgt=null;refreshPrim();ui();}}});$('comp').addEventListener('change',e=>{if(e.target.id==='pvs'){CP.spd=+e.target.value;if(PV&&PV.S)PV.S.espd=CP.spd;}if(e.target.id==='pve'){CP.pen=e.target.value;newPrev(CP.prev,CP.pen);}if(e.target.id==='pvs2'){CP.spd=+e.target.value;if(PE&&PE.S)PE.S.espd=CP.spd;}if(e.target.id==='pve2'){CP.eprev=e.target.value;newEPrev(CP.eprev,CP.ph||'hero:reinhart');renderComp();}if(e.target.id==='pvh'){CP.ph=e.target.value;newEPrev(CP.eprev,CP.ph);}if(e.target.id==='pve3'){CP.hen=e.target.value;newHPrev(CP.hprev,CP.hen,CP.hlv);}if(e.target.id==='pvl'){CP.hlv=+e.target.value;newHPrev(CP.hprev,CP.hen,CP.hlv);}if(e.target.id==='pvs3'){CP.spd=+e.target.value;if(PHV&&PHV.S)PHV.S.espd=CP.spd;}});$('relic').addEventListener('click',act);$('relics').addEventListener('click',act);$('tip').addEventListener('click',act);$('side').addEventListener('click',act);$('opts').addEventListener('click',act);
for(const _el of [$('opts'),$('comp')])_el.addEventListener('input',e=>{if(e.target.dataset.o===undefined)return;const o=OPTS[+e.target.dataset.o];OPT[o.key]=+e.target.value;saveOpt();e.target.closest('label').querySelector('output').textContent=o.fmt(OPT[o.key]);if(o.real){const rw=e.target.closest('.orow'),rl=rw&&rw.querySelector('.oreal');if(rl)rl.textContent=o.real(OPT[o.key]);}});

setTimeout(()=>{try{const b=$('ptb');if(b)b.classList.toggle('on',!!(OPT.ptip||OPT.ptipw));}catch(e){}},0);
