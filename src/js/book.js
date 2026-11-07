// ======================= COMPENDIO EN FORMATO LIBRO =======================
// pulsar en el fondo oscuro (fuera del libro y de los marcapáginas) lo cierra
document.addEventListener('click',e=>{const c=$('comp');if(CP.open&&c&&c.classList.contains('bkm')&&e.target===c)toggleComp(false);});
// marcapáginas arriba (secciones) · página izquierda: fichas en cuadritos · página derecha: detalle de lo elegido
const CTICO={tw:'🗼',hr:'🦸',pc:'🧩',bf:'✨',rl:'💎',en:'👹',ev:'📜',lg:'🏆'};
const bkNarrow=()=>innerWidth<760||innerHeight<430;
CP.sel=CP.sel||{};
function bkItems(t){const L=[];
 if(t==='tw'){const fl=CFILTERS.tw,act=fl.filter(f=>CP.flt[f.key]);
  const ids=Object.keys(TW).filter(k=>!TW[k].uniq&&eraOk(k)&&act.every(f=>seen('tw',k)&&f.test(k,CP.flt[f.key])));
  L.push({sec:'Torres normales'});for(const k of ids)L.push({id:k,ic:TW[k].ic,col:TW[k].col,n:TW[k].n,ok:seen('tw',k),lk:!tunl(k)&&!seen('tw',k)});
  L.push({sec:'Torres de evento'});for(const k of Object.keys(TW).filter(k=>TW[k].uniq))L.push({id:k,ic:TW[k].ic,col:TW[k].col,n:TW[k].n,ok:seen('tw',k)});}
 else if(t==='hr'){for(const id of Object.keys(HEROES).filter(h=>UNLOCK_ALL||heroVis(h)))L.push({id,por:1,col:HEROES[id].col,n:HEROES[id].n,ok:UNLOCK_ALL||!HEROES[id].lockTxt,lk:!UNLOCK_ALL&&!!HEROES[id].lockTxt});}
 else if(t==='pc'){PIECES.forEach((o,i)=>L.push({id:String(i),pc:i,n:o.n,ok:seen('pc',o.n)}));}
 else if(t==='bf'){for(const k of BK)L.push({id:k,bf:k,n:bname?bname(k):BF[k].n,ok:seen('bf',k)});}
 else if(t==='rl'){L.push({sec:'Reliquias normales'});for(const r of RELICS.filter(r=>!r.evr))L.push({id:r.id,ic:r.ic,col:r.col,n:r.n,ok:seen('rl',r.id)});
  L.push({sec:'Reliquias de evento'});for(const r of RELICS.filter(r=>r.evr))L.push({id:r.id,ic:r.ic,col:r.col,n:r.n,ok:seen('rl',r.id)});}
 else if(t==='en'){const fl=CFILTERS.en,act=fl.filter(f=>CP.flt[f.key]),ok=k=>act.every(f=>seen('en',k)&&f.test(k,CP.flt[f.key]));
  const nm=Object.keys(ET).filter(k=>!ET[k].evn&&ok(k)),ev=Object.keys(ET).filter(k=>ET[k].evn&&ok(k));
  const fams=ks=>{const out=EFAM.map(([n,l])=>[n,l.filter(k=>ks.includes(k))]).filter(x=>x[1].length),used=new Set(EFAM.flatMap(x=>x[1])),rest=ks.filter(k=>!used.has(k));if(rest.length)out.push(['Otros',rest]);return out;};
  for(const [n,l] of fams(nm)){L.push({sec:n});for(const k of l)L.push({id:k,dot:ET[k].col,n:ET[k].n,ok:seen('en',k)});}
  if(ev.length){L.push({sec:'De evento'});for(const k of ev)L.push({id:k,dot:ET[k].col,n:ET[k].n,ok:seen('en',k)});}}
 else if(t==='ev'){for(const id of Object.keys(EVENTS))L.push({id,ic:EVENTS[id].ic||'❔',n:EVENTS[id].n,ok:seen('ev',id)});}
 else if(t==='lg'){CP.af=CP.af||'all';CP.as=CP.as||'all';
  for(const [c,cn] of ACHCATS){const ids=Object.keys(ACH).filter(id=>achVis(id)&&(ACH[id].c||'cl')===c&&(CP.af==='all'||c===CP.af)&&(CP.as==='all'||(CP.as==='ok')===!!ACHS[id]));if(!ids.length)continue;
   L.push({sec:cn});for(const id of ids){const fnd=achFound(id);L.push({id,ic:fnd?(ACH[id].ic||'🏅'):'❔',n:fnd?ACH[id].n:'???',ok:true,got:!!ACHS[id],hid:!fnd,pin:PINS.includes(id)});}}
  const pn=PINS.filter(id=>ACH[id]&&achVis(id)&&!ACHS[id]&&achFound(id)&&(CP.as!=='ok'));if(pn.length)L.unshift({sec:'📌 Fijados'},...pn.map(id=>({id,ic:ACH[id].ic||'🏅',n:ACH[id].n,ok:true,pin:true})));
  const rest=Object.keys(ACH).filter(id=>achVis(id)&&!ACHCATS.some(([c])=>(ACH[id].c||'cl')===c)&&(CP.af==='all')&&(CP.as==='all'||(CP.as==='ok')===!!ACHS[id]));
  if(rest.length){L.push({sec:'Otros'});for(const id of rest){const fnd=achFound(id);L.push({id,ic:fnd?(ACH[id].ic||'🏅'):'❔',n:fnd?ACH[id].n:'???',ok:true,got:!!ACHS[id],hid:!fnd});}}}
 return L;}
function bkTile(it,t){const on=CP.sel[t]===it.id;let ic;
 if(it.por)ic=`<span class="bpor">${portrait(it.id,1,!it.ok)}</span>`;
 else if(it.pc!=null)ic=`<canvas width="44" height="44" data-bpi="${it.pc}"></canvas>`;
 else if(it.bf)ic=`<span class="bbf" style="background:${BF[it.bf].col}">${BF[it.bf].l||''}</span>`;
 else if(it.dot)ic=`<span class="bdot" style="background:${it.dot}"></span>`;
 else ic=`<span class="bic"${it.col&&it.ok?` style="background:${it.col}"`:''}><i>${it.ic}</i></span>`;
 return `<button class="bti${t==='lg'?' ach':''}${it.pin?' pin':''}${on?' on':''}${it.ok?'':' un'}${it.got?' got':''}${it.hid?' hid':''}${it.lk&&!it.ok?' lkd':''}" data-a="csel" data-v="${it.id}">${ic}<small>${it.ok?it.n:'???'}</small></button>`;}
const bkPrevBtn=(a,v,l)=>`<button class="bkgo" data-a="${a}" data-v="${v}">▶ ${l||'Ver en acción'}</button>`;
function bkDetail(t,id){
 const sh=(ic,txt)=>`<div class="bkun"><span class="sil bkbig">${ic}</span><h4>???</h4><p>${txt}</p></div>`;
 if(t==='tw'){const T=TW[id];if(!T)return'';
  if(!seen('tw',id)){if(!T.uniq&&!tunl(id)&&TLOCK[id]){const a=TLOCK[id],fn=achFound(a);return sh(T.ic,`Aún no disponible.`)+`<button class="bklink" data-a="cachgo" data-v="${a}">🏆 ${fn?ACH[a].n:'Logro oculto'}</button>`;}return sh(T.ic,'Aún no descubierto.');}
  if(T.uniq){const cur=(CP.ulv&&CP.ulv[id])||1;return `<div class="bkhd"><span class="bkbic" style="background:${T.col}">${T.ic}</span></div><div class="ce bkce">${uniqGlance(id,cur)}</div>`+(uPrevOk(id,cur)?bkPrevBtn('cprev',id):'');}
  return `<div class="bkhd"><span class="bkbic" style="background:${T.col}">${T.ic}</span></div><div class="ce bkce">${shopInfo(id,1)}</div>`+bkPrevBtn('cprev',id);}
 if(t==='hr'){const D=HEROES[id];if(!D)return'';if(D.lockTxt&&!UNLOCK_ALL)return `<div class="bkun bkhun"><span class="bkpor lk">${portrait(id,0,1)}</span><h4>???</h4>${heroLockBox(id)}</div>`;
  return `<div class="bkhd"><span class="bkpor" style="background:${D.col}">${portrait(id)}</span></div><div class="ce bkce">${heroInfo(id,1)}</div>`+bkPrevBtn('chprev',id);}
 if(t==='pc'){const i=+id,o=PIECES[i];if(!o)return'';if(!seen('pc',o.n))return sh('🧩','Aún no descubierta.');
  return `<div class="ce bkce"><div class="ttl">${(SOLARES[o.n]||[]).length>1?`<button class="stbtn lvbtn" data-a="cpcv" data-v="${i}" title="Ver la otra disposición de solares">V${((CP.pcv||{})[i]||0)+1}</button>`:''}<b>${o.n}</b> · ${opens(o.p)} salidas</div><canvas width="168" height="168" data-pi="${i}" style="margin:8px auto"></canvas><small>Solares en partida: <b>${SOLN[o.n]||'—'}</b></small><small>Las piezas pueden salir giradas, con casillas especiales y con otra decoración. Solo se construye en los solares.</small></div>`;}
 if(t==='bf'){if(!seen('bf',id))return sh('✨','Aún no descubierta.');return `<div class="fbar"><button class="${CP.sup[id]?'on':''}" data-a="csup" data-v="${id}">${CP.sup[id]?'★':'☆'} Versión super</button></div><div class="ce bkce">${buffInfo(CP.sup[id]?id+'+':id,1)}</div>`;}
 if(t==='rl'){const r=RELIC[id];if(!r)return'';if(!seen('rl',id))return sh(r.ic,'Aún no descubierta.');return `<div class="bkhd"><span class="bkbic" style="background:${r.col}">${r.ic}</span></div><div class="ce bkce">${relicInfo(id,1)}</div>`;}
 if(t==='en'){if(!ET[id])return'';if(!seen('en',id))return sh('<span class="lsd bkdot"></span>','Aún no descubierto.');return `<div class="ce bkce">${enemyInfo(id)}</div>`+bkPrevBtn('ceprev',id);}
 if(t==='ev'){const E=EVENTS[id];if(!E)return'';if(!seen('ev',id))return sh(E.ic||'❔','Aún no descubierto.');return `<div class="ce bkce">${eventCard(id)}</div><small class="bknote">Las opciones que nunca has elegido aparecen como ???.</small>`;}
 if(t==='lg'){const A=ACH[id];if(!A)return'';if(!achFound(id))return sh('🏆','Logro oculto. Sigue jugando para descubrirlo.');
  const T=TW[A.tw],ok=!!ACHS[id],run=inRun(),dd=t=>{const d=new Date(t);return String(d.getDate()).padStart(2,'0')+'/'+String(d.getMonth()+1).padStart(2,'0')+'/'+d.getFullYear();};
  const rw=arw(ok,T&&[T.ic,T.n,'tw'],id)+arw(ok,A.rl&&[RELIC[A.rl].ic,RELIC[A.rl].n,'rl'],id)+arw(ok,A.hr&&[HEROES[A.hr].ic,HEROES[A.hr].n,'hr'],id)+arw(ok,A.ux&&['📖','Compendio','cp'],id)+cosOf(id).map(([k,c])=>arw(ok,[CSKIND[k][0],c.n,'cs'],id)).join('');
  return `<div class="bkhd"><span class="bkbic bkach${ok?'':' off'}">${A.ic||'🏅'}</span></div><div class="ce ach bkce${ok?' got':''}${CP.hl===id?' bkhl':''}"><div class="ttl">${ok?'':`<button class="pinb${PINS.includes(id)?' on':''}" data-a="apin" data-id="${id}" title="${PINS.includes(id)?'Quitar de fijados':'Fijar para seguirlo en partida'}">📌</button>`}<b>${A.n}</b></div>${achSec(id)?'<small style="margin:0">??? · <em>'+A.h+'</em></small>':'<small style="margin:0">'+A.d+'</small>'}<div class="abot">${rw}${ok?`<small class="agot">✓ Conseguido el ${dd(ACHS[id])}</small>`:achProg(id,run)}</div></div>`;}
 return '';}
// filtros: cada opción solo si hay algo descubierto que encaje; una fila con menos de 2 opciones reales no se muestra
function bkFilters(t){
 if(t==='tw'||t==='en'){const fl=CFILTERS[t],pool=t==='tw'?Object.keys(TW).filter(k=>!TW[k].uniq&&eraOk(k)&&seen('tw',k)):Object.keys(ET).filter(k=>seen('en',k));
  const rows=fl.map(f=>{const ops=f.opts.filter(([v])=>pool.some(k=>f.test(k,v)));if(ops.length<2){if(CP.flt[f.key])CP.flt[f.key]='';return '';}if(CP.flt[f.key]&&!ops.some(o=>o[0]===CP.flt[f.key]))CP.flt[f.key]='';
   return `<div class="bkfr"><span class="bkfl">${f.label}:</span><button class="${CP.flt[f.key]?'':'on'}" data-a="cflt" data-f="${f.key}" data-v="">Todos</button>`+ops.map(([v,l])=>`<button class="${CP.flt[f.key]===v?'on':''}" data-a="cflt" data-f="${f.key}" data-v="${v}">${l}</button>`).join('')+'</div>';}).join('');
  return rows?'<div class="bkflt">'+rows+'</div>':'';}
 if(t==='lg'){const vis=Object.keys(ACH).filter(id=>achVis(id)),got=vis.some(id=>ACHS[id]),todo=vis.some(id=>!ACHS[id]);if(!(got&&todo)){CP.as='all';return '';}
  return '<div class="bkflt"><div class="bkfr">'+[['all','Todos'],['todo','Pendientes'],['ok','Conseguidos']].map(([k,n])=>`<button class="${CP.as===k?'on':''}" data-a="achs" data-v="${k}">${n}</button>`).join('')+'</div></div>';}
 return '';}
const BKSUB={tw:'Las torres que puedes construir',hr:'Quienes defienden el núcleo',pc:'Las piezas del camino',bf:'Las casillas especiales',rl:'Objetos con poder',en:'Lo que sale de los portales',ev:'Encuentros en el camino',lg:'Tus hazañas'};
function renderComp(){
 setTimeout(()=>{if(!ALKNEW.size)return;for(const id of ALKNEW)ALKS[id]=1;ALKNEW.clear();try{localStorage.setItem('rt-alks',JSON.stringify(ALKS));}catch(e){}},0);
 closeKS();if(!compOk())CP.tab='lg';
 const t=CP.tab,items=bkItems(t),real=items.filter(x=>x.id!=null),pvm=!!(CP.prev||CP.hprev||CP.eprev);
 if(!real.some(x=>x.id===CP.sel[t]))CP.sel[t]=(real.find(x=>x.ok)||real[0]||{}).id;
 const nOk=real.filter(x=>x.ok&&!x.hid&&(t!=='lg'||x.got)).length,flip=CP.flipK!==t+'|'+CP.sel[t]+'|'+pvm;CP.flipK=t+'|'+CP.sel[t]+'|'+pvm;
 const tabs=CTABS.filter(([v])=>compOk()||v==='lg');
 const marks=`<div class="bkmarks">${kcOn()&&tabs.length>1?'<span class="kcap bkq">Q</span>':''}${tabs.map(([v,l])=>`<button class="bkmk${v===t?' on':''}" data-a="ctab" data-v="${v}" title="${l}">${CTICO[v]}</button>`).join('')}${kcOn()&&tabs.length>1?'<span class="kcap bkq">E</span>':''}</div>`;
 let left=`<h3>${(CTABS.find(x=>x[0]===t)||[])[1]||''}</h3><div class="bksub">${BKSUB[t]||''} · ${t==='lg'?nOk+' de '+real.length+' conseguidos':nOk+' de '+real.length+(['tw','pc','bf','rl'].includes(t)?' descubiertas':' descubiertos')}</div>`+bkFilters(t)+'<div class="bktiles">';
 for(const it of items)left+=it.sec?`</div><div class="bksec">${it.sec}</div><div class="bktiles">`:bkTile(it,t);
 left+='</div>';left=left.replace(/<div class="bktiles"><\/div>/g,'');
 const right=pvm?compBodyOld():bkDetail(t,CP.sel[t]);
 const nar=bkNarrow(),showR=!nar||CP.pageR||pvm;
 const el=$('comp');el.classList.add('bkm');el.classList.toggle('narrow',nar);
 const sl=el.querySelector('.bkp.l'),st=sl?sl.scrollTop:0,same=CP.lastT===t;CP.lastT=t;
 el.innerHTML=`<div class="bkw">${marks}<div class="bk"><div class="bkcover"></div>`+
  (!nar||!showR?`<div class="bkp l">${left}</div>`:'')+(showR?`<div class="bkp r${flip?' flip':''}">${nar&&!pvm?'<button class="bkback" data-a="cbkl">‹ Volver</button>':''}${right}</div>`:'')+
  `<button class="bkx" data-a="cclose" title="Cerrar">✕</button></div></div>`;
 const nl=el.querySelector('.bkp.l');if(nl&&same)nl.scrollTop=st;
 el.querySelectorAll('canvas[data-pi]').forEach(cn=>drawPat(cn.getContext('2d'),(()=>{const P0=PIECES[+cn.dataset.pi],o={n:P0.n,p:P0.p,b:[]};solarize(o,(CP.pcv||{})[+cn.dataset.pi]||0,1);return o;})(),24,0,0,1));
 el.querySelectorAll('canvas[data-bpi]').forEach(cn=>{const P0=PIECES[+cn.dataset.bpi];if(!seen('pc',P0.n))return;const o={n:P0.n,p:P0.p,b:[]};solarize(o,0,1);drawPat(cn.getContext('2d'),o,6.2,0,0,1);});
 if(CP.hl){const hl=CP.hl;setTimeout(()=>{const b=el.querySelector(`.bti[data-v="${hl}"]`);if(b){b.scrollIntoView({block:'center'});b.classList.add('bkglow');}},30);setTimeout(()=>{if(CP.hl===hl){CP.hl=null;const c=el.querySelector('.bkhl');if(c)c.classList.remove('bkhl');}},1600);}
}

