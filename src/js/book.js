// ======================= COMPENDIO EN FORMATO LIBRO =======================
// pulsar en el fondo oscuro (fuera del libro y de los marcapáginas) lo cierra
document.addEventListener('click',e=>{const c=$('comp');if(LB.open&&c&&e.target===c&&LB.area!=='prep'){if(LB.cover){if(lbInGame())lbClose(true);}else lbBack();}});
// marcapáginas arriba (secciones) · página izquierda: fichas en cuadritos · página derecha: detalle de lo elegido
const CTICO={tw:'🗼',hr:'🦸',pc:'🧩',bf:'✨',rl:'💎',en:'👹',ev:'📜',lg:'🏆'};
const bkNarrow=()=>innerWidth<760||innerHeight<430;
CP.sel=CP.sel||{};
function bkItems(t){const L=[];
 if(t==='tw'){const fl=CFILTERS.tw,act=fl.filter(f=>CP.flt[f.key]);
  const ids=Object.keys(TW).filter(k=>!TW[k].uniq&&eraShow(k)&&act.every(f=>seen('tw',k)&&f.test(k,CP.flt[f.key]))),e2=ids.filter(k=>TW[k].era===2),e1=ids.filter(k=>TW[k].era!==2);
  const row=k=>L.push({id:k,ic:twIc(k),col:TW[k].col,n:TW[k].n,ok:seen('tw',k),lk:!tunl(k)&&!seen('tw',k)});
  L.push({sec:e2.length?'Torres de la Era Fantástica':'Torres normales'});for(const k of e1)row(k);
  if(e2.length){L.push({sec:'Torres de la Era Distópica'});for(const k of e2)row(k);}
  L.push({sec:'Torres de evento'});for(const k of Object.keys(TW).filter(k=>TW[k].uniq))L.push({id:k,ic:twIc(k),col:TW[k].col,n:TW[k].n,ok:seen('tw',k)});}
 else if(t==='hr'){for(const id of Object.keys(HEROES).filter(h=>UNLOCK_ALL||heroVis(h)))L.push({id,por:1,col:HEROES[id].col,n:HEROES[id].n,ok:UNLOCK_ALL||!HEROES[id].lockTxt,lk:!UNLOCK_ALL&&!!HEROES[id].lockTxt});}
 else if(t==='pc'){PIECES.forEach((o,i)=>L.push({id:String(i),pc:i,n:o.n,ok:seen('pc',o.n)}));}
 else if(t==='bf'){for(const k of BK)L.push({id:k,bf:k,n:bname?bname(k):BF[k].n,ok:seen('bf',k)});}
 else if(t==='rl'){L.push({sec:'Reliquias normales'});for(const r of RELICS.filter(r=>!r.evr&&relSeeEra(r)))L.push({id:r.id,ic:r.ic,col:r.col,n:r.n,ok:seen('rl',r.id)});
  L.push({sec:'Reliquias de evento'});for(const r of RELICS.filter(r=>r.evr&&relSeeEra(r)))L.push({id:r.id,ic:r.ic,col:r.col,n:r.n,ok:seen('rl',r.id)});}
 else if(t==='en'){const fl=CFILTERS.en,act=fl.filter(f=>CP.flt[f.key]),ok=k=>act.every(f=>seen('en',k)&&f.test(k,CP.flt[f.key]));
  const nm=Object.keys(ET).filter(k=>!ET[k].evn&&!ET[k].gen&&ok(k)&&(typeof enEraOk!=='function'||enEraOk(k))),ev=Object.keys(ET).filter(k=>ET[k].evn&&ok(k));
  const fams=ks=>{const out=EFAM.map(([n,l])=>[n,l.filter(k=>ks.includes(k))]).filter(x=>x[1].length),used=new Set(EFAM.flatMap(x=>x[1])),rest=ks.filter(k=>!used.has(k));if(rest.length)out.push(['Otros',rest]);return out;};
  for(const [n,l] of fams(nm)){L.push({sec:n});for(const k of l)L.push({id:k,dot:ET[k].col,n:ET[k].n,ok:seen('en',k)});}
  if(ev.length){L.push({sec:'De evento'});for(const k of ev)L.push({id:k,dot:ET[k].col,n:ET[k].n,ok:seen('en',k)});}}
 else if(t==='ev'){for(const id of Object.keys(EVENTS).filter(evSeeEra))L.push({id,ic:EVENTS[id].ic||'❔',n:EVENTS[id].n,ok:seen('ev',id)});}
 else if(t==='lg'){CP.af=CP.af||'all';CP.as=CP.as||'all';
  // orden: fijados → en progreso (más avanzados primero) → resto → conseguidos (más recientes primero)
  const run=inRun(),frac=id=>{const M=APM[id];if(!M)return 0;const v=M.best&&!M.cur?(ACHBEST[id]||0):M.cur&&(run||id==='curious')?M.cur():0;return Math.min(1,v/M.max);},rk=id=>ACHS[id]?3:PINS.includes(id)?0:!achFound(id)?2.5:frac(id)>0?1:2,ord=(a,b)=>rk(a)-rk(b)||(rk(a)===1?frac(b)-frac(a):0)||(rk(a)===3?ACHS[b]-ACHS[a]:0);
  for(const [c,cn] of ACHCATS){const ids=Object.keys(ACH).filter(id=>achVis(id)&&(ACH[id].c||'cl')===c&&(CP.af==='all'||c===CP.af)&&(CP.as==='all'||(CP.as==='ok')===!!ACHS[id])).sort(ord);if(!ids.length)continue;
   L.push({sec:cn});for(const id of ids){const fnd=achFound(id);L.push({id,ic:fnd?(ACH[id].ic||trofIc()):'❔',n:fnd?ACH[id].n:'???',ok:true,got:!!ACHS[id],hid:!fnd,pin:PINS.includes(id)});}}
  const pn=PINS.filter(id=>ACH[id]&&achVis(id)&&!ACHS[id]&&achFound(id)&&(CP.as!=='ok'));if(pn.length)L.unshift({sec:'📌 Fijados'},...pn.map(id=>({id,ic:ACH[id].ic||trofIc(),n:ACH[id].n,ok:true,pin:true})));
  const rest=Object.keys(ACH).filter(id=>achVis(id)&&!ACHCATS.some(([c])=>(ACH[id].c||'cl')===c)&&(CP.af==='all')&&(CP.as==='all'||(CP.as==='ok')===!!ACHS[id]));
  if(rest.length){L.push({sec:'Otros'});for(const id of rest){const fnd=achFound(id);L.push({id,ic:fnd?(ACH[id].ic||trofIc()):'❔',n:fnd?ACH[id].n:'???',ok:true,got:!!ACHS[id],hid:!fnd});}}}
 return L;}
function bkTile(it,t){const on=CP.sel[t]===it.id;let ic;
 if(it.por)ic=`<span class="bpor">${portrait(it.id,1,!it.ok)}</span>`;
 else if(it.pc!=null)ic=`<canvas width="44" height="44" data-bpi="${it.pc}"></canvas>`;
 else if(it.bf)ic=typeof bfIcon==='function'?bfIcon(it.bf):`<span class="bbf" style="background:${BF[it.bf].col}">${BF[it.bf].l||''}</span>`;
 else if(it.dot)ic=`<span class="bdot${it.ok&&enIc(it.id)?' beic':''}" style="background:${it.dot}">${it.ok&&enIc(it.id)?icHtml(enIc(it.id)):''}</span>`;
 else ic=`<span class="bic"${it.col&&it.ok?` style="background:${it.col}"`:''}><i>${it.ic}</i></span>`;
 return `<button class="bti${t==='lg'?' ach':''}${it.pin?' pin':''}${on?' on':''}${it.ok?'':' un'}${it.got?' got':''}${it.hid?' hid':''}${it.lk&&!it.ok?' lkd':''}" data-a="csel" data-v="${it.id}">${ic}<small>${it.ok?it.n:'???'}</small></button>`;}
// ficha de la página derecha: icono y título en una fila; debajo, los datos en dos columnas con puntos («Daño ······ 6,5»)
function bkSheet(ic,inner,cls){let ttl='',rest=inner;const a='<div class="ttl">';
 if(inner.startsWith(a)){const j=inner.indexOf('</div>');ttl=inner.slice(a.length,j);rest=inner.slice(j+6);}
 const lv=(ttl.match(/<span class="lvtabs">[\s\S]*?<\/button><\/span>|<button class="stbtn lvbtn"[\s\S]*?<\/button>/g)||[]).join('');if(lv){ttl=ttl.replace(/<span class="lvtabs">[\s\S]*?<\/button><\/span>|<button class="stbtn lvbtn"[\s\S]*?<\/button>/g,'');ttl=ttl.includes('<br>')?ttl+lv:ttl+'<br>'+lv;}
 // filas con texto largo (etiqueta + valor) ocupan todo el ancho, para que no se aplasten en media columna
 rest=rest.replace(/<div class="row([^"]*)"><span>([\s\S]*?)<\/span><span>([\s\S]*?)<\/span><\/div>/g,(m,c,a,b)=>(a+b).replace(/<[^>]+>/g,'').length>22?`<div class="row${c} rw"><span>${a}</span><span>${b}</span></div>`:m);
 return `<div class="bksh">${ic||''}<div class="ttl bksht">${ttl}</div></div><div class="ce bkce bkg${cls?' '+cls:''}">${rest}</div>`;}
const bkPrevBtn=(a,v,l)=>`<button class="bkgo" data-a="${a}" data-v="${v}">▶ ${l||'Ver en acción'}</button>`;
function bkDetail(t,id){
 const sh=(ic,txt)=>`<div class="bkun"><span class="sil bkbig">${ic}</span><h4>???</h4><p>${txt}</p></div>`;
 if(t==='tw'){const T=TW[id];if(!T)return'';
  if(!seen('tw',id)){if(!T.uniq&&!tunl(id)&&TLOCK[id]){const a=TLOCK[id],fn=achFound(a);return sh(T.ic,`Aún no disponible.`)+achLink(a,'',1);}return sh(T.ic,'Aún no descubierto.');}
  const bi=`<span class="bkbic" style="background:${T.col}">${icHtml(twIcO(T))}</span>`;
  if(T.uniq){const cur=(CP.ulv&&CP.ulv[id])||1;return bkSheet(bi,uniqGlance(id,cur).replace(/<b>[^<]*? /,'<b>'))+(uPrevOk(id,cur)?bkPrevBtn('cprev',id):'');}
  return bkSheet(bi,shopInfo(id,1).replace(/<\/b> · [^<]*<br>/,'</b><br>'))+bkPrevBtn('cprev',id);}
 if(t==='hr'){const D=HEROES[id];if(!D)return'';if(D.lockTxt&&!UNLOCK_ALL)return `<div class="bkun bkhun"><span class="bkpor lk">${portrait(id,0,1)}</span><h4>???</h4>${heroLockBox(id)}</div>`;
  return bkSheet(`<span class="bkpor" style="background:${D.col}">${portrait(id)}</span>`,heroInfo(id,1).replace(/<b>[^<]*? /,'<b>'))+bkPrevBtn('chprev',id)+(D.d?'<div class="ddesc">'+D.d+'</div>':'')+`<div class="esec" style="margin-top:12px">Reliquia inicial</div><div class="ce bkce bkg">${relicInfo(D.relic,1)}</div><div class="ce bkce">${heroAbHtml(id)}</div>`;}
 if(t==='pc'){const i=+id,o=PIECES[i];if(!o)return'';if(!seen('pc',o.n))return sh('🧩','Aún no descubierta.');
  return `<div class="ce bkce"><div class="ttl">${(SOLARES[o.n]||[]).length>1?`<button class="stbtn lvbtn" data-a="cpcv" data-v="${i}" title="Ver la otra disposición de solares">V${((CP.pcv||{})[i]||0)+1}</button>`:''}<b>${o.n}</b> · ${opens(o.p)} salidas</div><canvas width="168" height="168" data-pi="${i}" style="margin:8px auto"></canvas><small>Solares en partida: <b>${SOLN[o.n]||'—'}</b></small><small>Las piezas pueden salir giradas, con casillas especiales y con otra decoración. Solo se construye en los solares.</small></div>`;}
 if(t==='bf'){if(!seen('bf',id))return sh('✨','Aún no descubierta.');return `<div class="fbar"><button class="${CP.sup[id]?'on':''}" data-a="csup" data-v="${id}">${CP.sup[id]?'★':'☆'} Versión super</button></div><div class="ce bkce">${typeof bfTileSvg==='function'?`<div class="bftbig">${bfTileSvg(CP.sup[id]?id+'+':id,null,null,88)}</div>`:''}${buffInfo(CP.sup[id]?id+'+':id,1)}</div>`;}
 if(t==='rl'){const r=RELIC[id];if(!r)return'';if(!seen('rl',id))return sh(r.ic,'Aún no descubierta.');return bkSheet(`<span class="bkbic" style="background:${r.col}">${r.ic}</span>`,relicInfo(id,1));}
 if(t==='en'){if(!ET[id])return'';if(!seen('en',id))return sh('<span class="lsd bkdot"></span>','Aún no descubierto.');return bkSheet(`<span class="bkbic bken"><i style="background:${ET[id].col}">${enIc(id)?icHtml(enIc(id)):''}</i></span>`,enemyInfo(id))+bkPrevBtn('ceprev',id);}
 if(t==='ev'){const E=EVENTS[id];if(!E)return'';if(!seen('ev',id))return sh(E.ic||'❔','Aún no descubierto.');return `<div class="ce bkce">${eventCard(id)}</div><small class="bknote">Las opciones que nunca has elegido aparecen como ???.</small>`;}
 if(t==='lg'){const A=ACH[id];if(!A)return'';if(!achFound(id))return sh('🏆','Logro oculto. Sigue jugando para descubrirlo.');
  const T=TW[A.tw],ok=!!ACHS[id],run=inRun(),dd=t=>{const d=new Date(t);return String(d.getDate()).padStart(2,'0')+'/'+String(d.getMonth()+1).padStart(2,'0')+'/'+d.getFullYear();};
  const rw=arw(ok,T&&[T.ic,T.n,'tw'],id)+arw(ok,A.rl&&[RELIC[A.rl].ic,RELIC[A.rl].n,'rl'],id)+arw(ok,A.hr&&[HEROES[A.hr].ic,HEROES[A.hr].n,'hr'],id)+arw(ok,A.ev&&EVENTS[A.ev]&&[EVENTS[A.ev].ic,EVENTS[A.ev].n,'ev'],id)+arw(ok,A.ux&&['📖','Compendio','cp'],id)+cosOf(id).map(([k,c])=>arw(ok,[CSKIND[k][0],c.n,'cs'],id)).join('');
  return bkSheet(`<span class="bkbic bkach${ok?'':' off'}">${A.ic||trofIc()}</span>`,`<div class="ttl">${ok?'':`<button class="pinb${PINS.includes(id)?' on':''}" data-a="apin" data-id="${id}" title="${PINS.includes(id)?'Quitar de fijados':'Fijar para seguirlo en partida'}">📌</button>`}<b>${A.n}</b></div>${achSec(id)?'<small style="margin:0">??? · <em>'+A.h+'</em></small>':'<small style="margin:0">'+A.d+'</small>'}<div class="abot">${rw}${ok?`<small class="agot">✓ Conseguido el ${dd(ACHS[id])}</small>`:achProg(id,run)}</div>`,'ach'+(ok?' got':'')+(CP.hl===id?' bkhl':''));}
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
// iconos de los marcapáginas de Logros (por categoría)
const LGICO={all:'🏆',tu:'🎓',jg:'🎲',hr:'🦸',st:'🧪',ev:'📜',mp:'🗺️',vet:'🎖️'};
// el compendio (y Logros) como piezas del libro: marcapáginas, página izquierda, página derecha y retoques tras pintar
// «Ver en acción» dentro del libro: cabecera pequeña, el mapa y, al lado, los controles en pergamino (botones en vez de desplegables).
// Los <select> siguen existiendo ocultos: los botones cambian su valor y disparan «change», así la lógica de la previsualización es la misma.
function bkPills(sel,opts,cur){return `<select id="${sel}" hidden>${opts.map(([v,l])=>`<option value="${v}"${String(v)===String(cur)?' selected':''}>${l}</option>`).join('')}</select>`+
 opts.map(([v,l,dis,col])=>`<button class="bkpill${String(v)===String(cur)?' on':''}" data-a="pvpill" data-s="${sel}" data-v="${v}"${dis?' disabled':''}>${col?`<i style="background:${col}"></i>`:''}${l}</button>`).join('');}
const bkPvRow=(l,h)=>`<div class="bkpvr"><b>${l}</b><div>${h}</div></div>`;
function bkPreview(){const es=Object.keys(ET).filter(e=>seen('en',e)),enOpts=es.map(e=>[e,ET[e].n,0,ET[e].col]),spd=sel=>bkPills(sel,[1,2,3].map(v=>[v,'×'+v]),CP.spd||1);
 let ic,nm,lv='',ctl='',note='',extra='',ok=true,back='cback';
 if(CP.prev){const k=CP.prev,T=TW[k];
  if(T.uniq){const o=T.dragon?['Huevo','Bebé','Adulto','Anciano']:T.guild?RANKS:['1','2','3','4'],cur=(CP.ulv&&CP.ulv[k])||1;nm=T.n;
   lv=`<button class="stbtn lvbtn" data-a="ulv" data-k="${k}" data-v="${cur>=o.length?1:cur+1}" title="Ver la torre en otro nivel">${cur>=o.length?'Nv Max':'Nv '+cur}</button>`;ok=uPrevOk(k,cur)&&!lvSec(k,cur);}
  else{const st=cpState(k),X=st.spec?SPECS[k][st.spec]:T;nm=X.n;lv=(shopInfo(k,1).match(/<span class="lvtabs">[\s\S]*?<\/button><\/span>|<button class="stbtn lvbtn"[\s\S]*?<\/button>/g)||[]).join('');if(st.spec&&X.d)extra='<div class="ddesc">'+X.d+'</div>';}
  ic=`<span class="bkbic" style="background:${T.col}">${icHtml(twIcO(T))}</span>`;
  ctl=bkPvRow('Enemigo',bkPills('pve',enOpts,CP.pen))+bkPvRow('Velocidad',spd('pvs'));
  note='Estadísticas base del enemigo (ronda 0), sin bufos de casilla ni reliquias. Los enemigos aparecen sin parar.'+(cpState(k).spec?' Las habilidades se muestran al rango máximo.':'');}
 else if(CP.hprev){const id=CP.hprev,D=HEROES[id];back='chback';nm=D.n;ic=`<span class="bkpor" style="background:${D.col}">${portrait(id)}</span>`;if(!es.includes(CP.hen))CP.hen=es[0]||'norm';
  ctl=bkPvRow('Enemigo',bkPills('pve3',enOpts,CP.hen))+bkPvRow('Nivel',bkPills('pvl',[1,5,10].map(l=>[l,'Nv '+l+(hlvOk(id,l)?'':' 🔒'),!hlvOk(id,l)]),CP.hlv||1))+bkPvRow('Velocidad',spd('pvs3'));
  note='Su vida depende del nivel: ronda 1 con Nv 1, ronda 7 con Nv 5 y ronda 14 con Nv 10. Los niveles con 🔒 se desbloquean al alcanzarlos en una partida. Si cae, reaparece al instante.';
  }
 else{const k=CP.eprev,E=ET[k],hs=allyList();back='ceback';if(!hs.some(a=>a[0]===CP.ph))CP.ph='hero:reinhart';nm=E.n;ic=`<span class="bkbic bken"><i style="background:${E.col}">${enIc(k)?icHtml(enIc(k)):''}</i></span>`;
  ctl=bkPvRow('Aliado',bkPills('pvh',hs.map(([v,l])=>[v,l]),CP.ph))+bkPvRow('Velocidad',spd('pvs2'));
  note='El enemigo, con su vida de la ronda 1, camina hasta el aliado y pelean. Si cae cualquiera de los dos, reaparece al instante.';}
 const body=ok?`<div class="bkpv"><canvas id="pvc" width="288" height="288" class="dpv bkpvc"></canvas><div class="bkpvs">${ctl}<small class="bknote">${note}</small></div></div>${extra}`:'<small class="bknote">??? · Sigue jugando para descubrir este nivel.</small>';
 return {html:`<div class="bksh bksm">${ic}<div class="ttl bksht"><b>${nm}</b><br><small>en acción</small>${lv}</div></div>${body}`,back:`<button class="lbbk pvbk" data-a="${back}">‹ Volver a la ficha</button>`};}
function compParts(){
 setTimeout(()=>{if(!ALKNEW.size)return;for(const id of ALKNEW)ALKS[id]=1;ALKNEW.clear();try{localStorage.setItem('rt-alks',JSON.stringify(ALKS));}catch(e){}},0);
 closeKS();if(!compOk())CP.tab='lg';
 const t=CP.tab,items=bkItems(t),real=items.filter(x=>x.id!=null),pvm=!!(CP.prev||CP.hprev||CP.eprev);
 if(!real.some(x=>x.id===CP.sel[t]))CP.sel[t]=(real.find(x=>x.ok)||real[0]||{}).id;
 const nOk=real.filter(x=>x.ok&&!x.hid&&(t!=='lg'||x.got)).length,flip=CP.flipK!==t+'|'+CP.sel[t]+'|'+pvm;CP.flipK=t+'|'+CP.sel[t]+'|'+pvm;
 let marks;
 if(t==='lg'){CP.af=CP.af||'all';const cats=[['all','Todos']].concat(ACHCATS.filter(([c])=>Object.keys(ACH).some(id=>achVis(id)&&(ACH[id].c||'cl')===c)));if(!cats.some(([c])=>c===CP.af))CP.af='all';marks={list:cats.map(([c,n])=>[c,n,LGICO[c]||'🏅']),cur:CP.af,act:'achf'};}
 else marks={list:CTABS.filter(([v])=>v!=='lg').map(([v,l])=>[v,l,CTICO[v]]),cur:t,act:'ctab'};
 const title=t==='lg'?'Logros':(CTABS.find(x=>x[0]===t)||[])[1]||'';
 let left=`<h3>${title}</h3><div class="bksub">${BKSUB[t]||''} · ${t==='lg'?nOk+' de '+real.length+' conseguidos':nOk+' de '+real.length+(['tw','pc','bf','rl'].includes(t)?' descubiertas':' descubiertos')}</div>`+bkFilters(t)+'<div class="bktiles">';
 for(const it of items)left+=it.sec?`</div><div class="bksec">${it.sec}</div><div class="bktiles">`:bkTile(it,t);
 left+='</div>';left=left.replace(/<div class="bktiles"><\/div>/g,'');
 const pv=pvm?bkPreview():null,right=pv?pv.html:bkDetail(t,CP.sel[t]),nar=bkNarrow();
 const after=el=>{
  el.querySelectorAll('canvas[data-pi]').forEach(cn=>drawPat(cn.getContext('2d'),(()=>{const P0=PIECES[+cn.dataset.pi],o={n:P0.n,p:P0.p,b:[]};solarize(o,(CP.pcv||{})[+cn.dataset.pi]||0,1);return o;})(),24,0,0,1));
  el.querySelectorAll('canvas[data-bpi]').forEach(cn=>{const P0=PIECES[+cn.dataset.bpi];if(!seen('pc',P0.n))return;const o={n:P0.n,p:P0.p,b:[]};solarize(o,0,1);drawPat(cn.getContext('2d'),o,6.2,0,0,1);});
  if(CP.hl){const hl=CP.hl;setTimeout(()=>{const b=el.querySelector(`.bti[data-v="${hl}"]`);if(b){b.scrollIntoView({block:'center'});b.classList.add('bkglow');}},30);setTimeout(()=>{if(CP.hl===hl){CP.hl=null;const c=el.querySelector('.bkhl');if(c)c.classList.remove('bkhl');}},1600);}};
 return {marks,left,right,flip,pvm,after,key:t==='lg'?'lg|'+CP.af:t,footL:pv&&nar?pv.back:'',footR:pv&&!nar?pv.back:''};
}
function renderComp(){if(typeof lbRender==='function')lbRender();}

