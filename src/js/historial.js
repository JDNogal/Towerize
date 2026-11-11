// ======================= REGISTRO DE PARTIDAS =======================
// Se guardan todas las partidas (sin límite) en IndexedDB, en un formato compacto (unos pocos KB cada una):
// resultado, héroe, rondas, vida perdida por ronda, torres con su daño y posición, reliquias, lo que más daño hizo
// y el mapa codificado (caminos, torres, núcleo y portales) para dibujar la miniatura sin guardar imágenes.
// La partida se apunta al empezar (como «Abandonada») y se actualiza al final de cada ronda; al ganar o perder queda cerrada.
// Sirve también para dar más adelante logros o desbloqueos a quien ya los hubiera cumplido (como pasó con Radagast).
const HIST={db:null,list:null,sel:0,flt:'all',big:null};
const HISTV=1;
function hsDB(){return new Promise((res,rej)=>{if(HIST.db)return res(HIST.db);if(typeof indexedDB==='undefined')return rej('sin IndexedDB');
 const r=indexedDB.open('towerize-hist',1);r.onupgradeneeded=()=>{r.result.createObjectStore('runs',{keyPath:'id'});};r.onsuccess=()=>{HIST.db=r.result;res(HIST.db);};r.onerror=()=>rej(r.error);});}
function hsPut(rec){return hsDB().then(db=>new Promise((res,rej)=>{const tx=db.transaction('runs','readwrite');tx.objectStore('runs').put(rec);tx.oncomplete=()=>res();tx.onerror=()=>rej(tx.error);})).catch(()=>{});}
function hsAll(){return hsDB().then(db=>new Promise((res,rej)=>{const tx=db.transaction('runs','readonly'),q=tx.objectStore('runs').getAll();q.onsuccess=()=>res(q.result||[]);q.onerror=()=>rej(q.error);})).catch(()=>[]);}
// mapa en texto: una fila por línea, '.' vacío, '#' camino; RLE para que ocupe poco
function hsMap(){const out=[];for(let y=0;y<N;y++){let row='',prev='',n=0;const flush=()=>{if(n)row+=(n>1?n:'')+prev;};for(let x=0;x<N;x++){const c=S.cells[y][x]===2?'#':S.cells[y][x]===1?'o':'.';if(c===prev)n++;else{flush();prev=c;n=1;}}flush();out.push(row);}return out.join('/');}
function hsUnmap(s){return s.split('/').map(r=>{let o='';const re=/(\d*)([.#o])/g;let m;while((m=re.exec(r)))o+=m[2].repeat(+m[1]||1);return o;});}
// registro de la partida en curso
function hsRec(res){if(!S||!S.hero||!S.st||PREVIEWING||S.pvE||S.pvH)return null;
 if(!S.runId)S.runId=Date.now().toString(36)+Math.random().toString(36).slice(2,6);
 const H=S.hero,all=S.st.all||[],tot=Math.max(1,(S.st.dmg||0));
 const tw=all.map(t=>{const X=tinfo(t);return [t.type,t.spec||'',t.lvl||1,Math.round(t.dmgT||0),t.kills||0,t.x,t.y,t.sold?1:0,X.ic,X.n];});
 tw.push(['hero:'+H.id,'',H.lvl,Math.round(H.pt.dmgT||0),H.pt.kills||0,-1,-1,0,H.def.ic,H.def.n]);
 const ek=S.st.ek||{};let worst=null;for(const k in ek){const L=(ek[k].hpl||0);if(L>0&&(!worst||L>worst.n))worst={t:k,n:L,r:ek[k].lr||0};}
 return {id:S.runId,v:HISTV,ver:($('ver')&&$('ver').textContent)||'',t0:S.t0||Date.now(),t1:Date.now(),res,tut:!!S.tut,era:S.era||1,R:ROUNDS,r:Math.min(S.round,ROUNDS),
  hero:H.id,hlv:H.lvl,hp:Math.max(0,S.hp),hp0:S.hp0||20,kills:S.st.kills||0,gold:Math.round((S.st.gKill||0)+(S.st.gTile||0)+(S.st.gRound||0)+(S.st.gRel||0)+(S.st.gEv||0)),
  dmg:Math.round(tot),time:Math.round(S.st.time||0),rc:S.st.retries||0,pcs:S.st.pcs||0,rel:(S.relics||[]).slice(),deck:(S.deck||[]).slice(),tw,hl:(S.st.hl||[]).slice(),worst,
  rs:(S.st.rs||[]).slice(),map:hsMap(),core:[S.core.x,S.core.y],pt:(S.portals||[]).map(p=>[p.x,p.y]),N,star:S.runStar?1:0};}
function hsSave(res){try{const r=hsRec(res);if(r){if(HIST.list){const i=HIST.list.findIndex(x=>x.id===r.id);if(i>=0){r.star=HIST.list[i].star||0;HIST.list[i]=r;}else HIST.list.unshift(r);}hsPut(r);}}catch(e){console.warn('registro',e);}}
// enganches: empezar, fin de ronda, ganar/perder; vida perdida por ronda y quién la quitó
function histLeak(t,n){try{if(!S||!S.st)return;S.st.lkN=(S.st.lkN||0)+1;const q=EKS(t);q.hpl=(q.hpl||0)+n;q.lr=S.round;S.st.hlr=(S.st.hlr||0)+n;}catch(e){}}
{const _sg=startGame;startGame=function(...a){const r=_sg.apply(this,a);try{S.runId=null;S.t0=Date.now();S.hp0=S.hp;}catch(e){}return r;};}
{const _ch=chooseHero;chooseHero=function(...a){const r=_ch.apply(this,a);try{if(S&&S.hero&&!S.runId){S.t0=S.t0||Date.now();S.hp0=S.hp0||S.hp;hsSave('a');}}catch(e){}return r;};}
// v307 · foto de cada ronda al terminarla (para comparar cómo juega una persona con el bot): oro, vida, torres con nivel/especialización/sitio/objetivo,
// qué se coló, bajas, nivel del héroe, reliquias y piezas. Unos pocos cientos de bytes por ronda.
function hsSnap(){try{if(!S||!S.st||!S.hero||S.round<1)return;const st=S.st,rs=st.rs=st.rs||[];if(rs.length&&rs[rs.length-1].r===S.round)rs.pop();
 rs.push({r:S.round,g:Math.round(S.gold),hp:Math.max(0,S.hp),k:(st.kills||0)-(st.k0||0),lk:st.lkt||{},hl:S.hero.lvl,rel:(S.relics||[]).length,pcs:st.pcs||0,ts:Math.round(st.time||0),
  tw:(S.list||[]).filter(t=>!t.sold).map(t=>[t.type,t.spec||'',t.lvl||1,Math.round(t.x/K*10)/10,Math.round(t.y/K*10)/10,t.mode||'core',Object.keys(t.ab||{}).length])});
 st.k0=st.kills||0;st.lkt={};}catch(e){}}
{const _hl=histLeak;histLeak=function(t,n){const r=_hl.apply(this,arguments);try{if(S&&S.st){const L=S.st.lkt=S.st.lkt||{};L[t]=(L[t]||0)+1;}}catch(e){}return r;};}
{const _nr=nextRound;nextRound=function(...a){hsSnap();try{if(S&&S.st&&S.round>=1){(S.st.hl=S.st.hl||[])[S.round-1]=S.st.hlr||0;S.st.hlr=0;}}catch(e){}const r=_nr.apply(this,a);try{if(S&&S.hero&&S.phase!=='won'&&S.phase!=='lost')hsSave('a');}catch(e){}return r;};}
{const _pp=placePiece;placePiece=function(...a){const o=S&&S.offers?S.offers[S.pi]:null,pc=o&&typeof payOn==='function'&&payOn()?pcost(o):0;const r=_pp.apply(this,a);try{if(S&&S.st&&S.phase!=='place'){S.st.pcs=(S.st.pcs||0)+1;if(o&&(o.n==='Bifurcación'||o.n==='Cruce'))S.st.fork=1;if(pc>0)S.st.paid=1;}}catch(e){}return r;};}
{const _eg=endGame;endGame=function(...a){hsSnap();try{if(S&&S.st){(S.st.hl=S.st.hl||[])[Math.min(S.round,ROUNDS)-1]=(S.st.hl[Math.min(S.round,ROUNDS)-1]||0)+(S.st.hlr||0);S.st.hlr=0;}hsSave(S.phase==='won'?'w':'l');}catch(e){}return _eg.apply(this,a);};}
// ---- en el libro ----
const hsWhen=t=>{const d=new Date(t),n=new Date(),hm=d.toLocaleTimeString('es-ES',{hour:'2-digit',minute:'2-digit'});const days=Math.floor((new Date(n.toDateString())-new Date(d.toDateString()))/864e5);
 return days===0?'Hoy '+hm:days===1?'Ayer '+hm:d.toLocaleDateString('es-ES',{day:'numeric',month:'short'})+' '+hm;};
const hsDur=s=>s>=60?Math.round(s/60)+' min':s+' s';
const hsRes=r=>r.res==='w'?['Victoria','w']:r.res==='l'?['Derrota','l']:(SAV.meta&&S&&r.id&&svLiveId()===r.id)?['En curso','c']:['Abandonada','a'];
const svLiveId=()=>{try{return (SAV.meta&&SAV.meta.runId)||null;}catch(e){return null;}};
function hsLoad(){if(HIST.list)return;HIST.list=[];hsAll().then(L=>{HIST.list=L.sort((a,b)=>b.t0-a.t0);if(LB.open&&LB.area==='pt')lbRender();});}
function hsFiltered(){const L=HIST.list||[];return HIST.flt==='w'?L.filter(r=>r.res==='w'):HIST.flt==='l'?L.filter(r=>r.res!=='w'):HIST.flt==='s'?L.filter(r=>r.star):L;}
function hsPor(id,big){const D=HEROES[id];return `<span class="hspor${big?' big':''}" style="background:${D?D.col:'#888'}">${typeof portrait==='function'?portrait(id,1):D?D.ic:'?'}</span>`;}
// v305: el fondo del minimapa depende de la era (bosque en la Fantástica, asfalto de neón en la Distópica)
const HSMC={1:{bg:'#26391f',path:'#a8875a',sol:'#2f4a2a'},2:{bg:'#171a2c',path:'#4a5677',sol:'#252a44'}};
const hsEraIc=r=>{const E=ERADEF[r.era||1]||ERADEF[1];return `<span class="hsera e${r.era||1}" style="--ec:${E.col}">${E.ic}</span>`;};
function hsMini(r,W){const g=hsUnmap(r.map),n=r.N||g.length,MC=HSMC[r.era||1]||HSMC[1];
 // solo la zona construida (con un margen), no todo el tablero vacío
 let x0=n,y0=n,x1=0,y1=0;g.forEach((row,y)=>{for(let x=0;x<row.length;x++)if(row[x]!=='.'){x0=Math.min(x0,x);y0=Math.min(y0,y);x1=Math.max(x1,x);y1=Math.max(y1,y);}});
 if(x1<x0){x0=0;y0=0;x1=n-1;y1=n-1;}const m=2;x0=Math.max(0,x0-m);y0=Math.max(0,y0-m);x1=Math.min(n-1,x1+m);y1=Math.min(n-1,y1+m);
 const span=Math.max(x1-x0+1,y1-y0+1),s=W/span,ox=x0-(span-(x1-x0+1))/2,oy=y0-(span-(y1-y0+1))/2,X=v=>((v-ox)*s).toFixed(1),Y=v=>((v-oy)*s).toFixed(1),u=Math.max(1,(typeof K!=='undefined'?K:3));
 let h=`<svg class="hsmap" viewBox="0 0 ${W} ${W}" width="${W}" height="${W}" data-ox="${ox}" data-oy="${oy}" data-s="${s}"><rect width="${W}" height="${W}" fill="${MC.bg}"/>`;
 g.forEach((row,y)=>{for(let x=0;x<row.length;x++){const c=row[x];if(c==='.')continue;h+=`<rect x="${X(x)}" y="${Y(y)}" width="${(s+.4).toFixed(1)}" height="${(s+.4).toFixed(1)}" fill="${c==='#'?MC.path:MC.sol}"/>`;}});
 for(const t of r.tw)if(t[5]>=0&&!t[7]){const T=TW[t[0]],c=t[5]+.5,d=t[6]+.5,z=u*.42;h+=`<rect x="${X(c-z)}" y="${Y(d-z)}" width="${(2*z*s).toFixed(1)}" height="${(2*z*s).toFixed(1)}" rx="${(z*s*.35).toFixed(1)}" fill="${T?T.col:'#ccc'}" stroke="#14161c" stroke-width="${Math.max(.8,s*.2).toFixed(1)}"/><text x="${X(c)}" y="${Y(d)}" font-size="${(z*s*1.25).toFixed(1)}" text-anchor="middle" dominant-baseline="central">${t[8]||''}</text>`;}
 for(const p of r.pt)h+=`<circle cx="${X(p[0]+.5)}" cy="${Y(p[1]+.5)}" r="${Math.max(3,s*1.1).toFixed(1)}" fill="#e8344a" stroke="#fff" stroke-width="${Math.max(.8,s*.25).toFixed(1)}"/>`;
 h+=`<circle cx="${X(r.core[0]+.5)}" cy="${Y(r.core[1]+.5)}" r="${Math.max(3.5,s*1.3).toFixed(1)}" fill="#3fe8ff" stroke="#0a4a5a" stroke-width="${Math.max(.8,s*.25).toFixed(1)}"/>`;return h+'</svg>';}
function histParts(){hsLoad();const L=hsFiltered(),all=HIST.list||[],won=all.filter(r=>r.res==='w').length;if(HIST.sel>=L.length)HIST.sel=0;const r=L[HIST.sel];
 const fl=[['all','Todas'],['w','Ganadas'],['l','Perdidas'],['s','⭐ Guardadas']].map(([k,l])=>`<button class="pill${HIST.flt===k?' on':''}" data-a="hsflt" data-v="${k}">${l}</button>`).join('');
 const rows=L.map((x,i)=>{const H=HEROES[x.hero],[rt,rc]=hsRes(x);return `<button class="hsrun${i===HIST.sel?' on':''}" data-a="hssel" data-v="${i}">${hsEraIc(x)}${hsPor(x.hero)}<span class="hsrt"><b>${H?H.n:x.hero} · Nv ${x.hlv}${x.star?' ⭐':''}</b><small>${hsWhen(x.t0)} · ${x.tut?'Tutorial':(ERADEF[x.era||1]||ERADEF[1]).n} · ${x.res==='w'?x.R+' rondas · '+hsDur(x.time):'ronda '+x.r+'/'+x.R}</small></span><span class="hsres ${rc}">${rt}</span></button>`;}).join('');
 const left=`<h3>Partidas</h3><div class="bksub">${all.length?`Tus partidas · ${all.length} jugada${all.length===1?'':'s'}, ${won} ganada${won===1?'':'s'}`:'Aquí aparecerán tus partidas'}</div><div class="hsflt">${fl}</div>${rows||'<p class="hsempty">'+(all.length?'Ninguna partida con este filtro.':'Todavía no hay partidas registradas. A partir de esta versión, cada partida queda apuntada aquí.')+'</p>'}`;
 let right='<div class="lbdet"><span class="lbdic">📚</span><h4>Registro de partidas</h4><p>Elige una partida para ver cómo fue: el mapa, las torres, el daño y dónde perdiste vida.</p></div>';
 if(r){const H=HEROES[r.hero],[rt]=hsRes(r),tot=r.tw.reduce((a,t)=>a+t[3],0)||1,tws=r.tw.filter(t=>t[3]>0||t[0].startsWith('hero:')).sort((a,b)=>b[3]-a[3]),mx=tws.length?tws[0][3]:1;
  const hl=r.hl||[],hmx=Math.max(1,...hl.map(v=>v||0));
  const twr=tws.slice(0,8).map(t=>{const T=TW[t[0]],hero=t[0].startsWith('hero:');return `<div class="hstw"><span class="hsic" style="background:${hero?(H?H.col:'#888'):T?T.col:'#ccc'}">${hsIc(t)}</span><span>${t[9]}${hero?' (héroe)':' · Nv '+t[2]}${t[7]?' <small>(vendida)</small>':''}</span><span class="hsbar"><i style="width:${Math.round(100*t[3]/mx)}%"></i></span><span>${Math.round(100*t[3]/tot)}%</span></div>`;}).join('');
  const ch=Array.from({length:r.R},(_,i)=>{const v=hl[i]||0;return `<i class="${v>0?'h':''}" style="height:${v>0?Math.max(8,Math.round(100*v/hmx)):4}%" title="Ronda ${i+1}: ${v} de vida"></i>`;}).join('');
  const W=r.worst&&ET[r.worst.t];
  right=`<div class="hshd">${hsPor(r.hero,1)}<div><h3>${rt}${r.res==='w'?' · '+r.R+' rondas':' · ronda '+r.r+'/'+r.R}</h3><div class="bksub" style="margin:0">${H?H.n:''} Nv ${r.hlv} · ${r.tut?'Tutorial':(ERADEF[r.era||1]||ERADEF[1]).n} · ${hsDur(r.time)} · ${hsWhen(r.t0)}</div></div></div>
  <div class="hsg2"><button class="hsmini" data-a="hsbig" title="Ver mapa grande">${hsMini(r,150)}</button><div class="hskv"><span>Vida al final</span><b>${r.hp} / ${r.hp0}</b><span>Bajas</span><b>${fi(r.kills)}</b><span>Oro ganado</span><b>${fi(r.gold)} 🪙</b><span>Daño total</span><b>${fi(r.dmg)}</b><span>Reintentos</span><b>${r.rc}</b><span>Piezas</span><b>${r.pcs}</b></div></div>
  <div class="hssec">Torres · daño en la partida</div>${twr||'<small>Sin daño registrado.</small>'}
  <div class="hssec">Vida perdida por ronda</div><div class="hschart">${ch}</div>
  ${r.rel.length?`<div class="hssec">Reliquias</div><div class="hsrel">${r.rel.map(k=>RELIC[k]?`<span title="${RELIC[k].n}">${RELIC[k].ic}</span>`:'').join('')}</div>`:''}
  ${W?`<div class="hsnote">Lo que más daño te hizo: <b>${W.n}</b> (${r.worst.n} de vida)${r.worst.r?' en la ronda '+r.worst.r:''}.</div>`:r.res==='w'&&!hl.some(v=>v>0)?'<div class="hsnote">Ningún enemigo llegó a tu núcleo.</div>':''}
  <div class="hsbtns"><button class="go" data-a="hsbig">🗺️ Ver mapa grande</button><button data-a="hsstar">${r.star?'★ Quitar de guardadas':'⭐ Guardar'}</button></div>`;}
 return {marks:null,left,right,key:'pt|'+HIST.flt+'|'+HIST.sel+'|'+(HIST.list?HIST.list.length:0)+'|'+(r?r.star:''),one:false};}
function hsBig(){const L=hsFiltered(),r=L[HIST.sel];if(!r)return;let el=$('hsbig');if(!el){el=document.createElement('div');el.id='hsbig';document.body.appendChild(el);}
 const W=Math.min(innerWidth-40,innerHeight-90);el.innerHTML=`<div class="hsbw"><div class="hsbt"><b>${(HEROES[r.hero]||{}).n||''} · ${hsWhen(r.t0)}</b><small>Pasa el ratón por una torre para ver su daño</small><button data-a="hsbigx">✕</button></div><div class="hsbm">${hsMini(r,W)}<div class="hsbtip"></div></div></div>`;
 el.classList.add('on');const svg=el.querySelector('svg'),tip=el.querySelector('.hsbtip'),s=+svg.dataset.s,ox=+svg.dataset.ox,oy=+svg.dataset.oy,u=Math.max(1,K),tot=r.dmg||1;
 svg.addEventListener('pointermove',e=>{const b=svg.getBoundingClientRect(),x=(e.clientX-b.left)/s+ox,y=(e.clientY-b.top)/s+oy;const t=r.tw.find(t=>t[5]>=0&&!t[7]&&Math.abs(t[5]+.5-x)<=u*.5&&Math.abs(t[6]+.5-y)<=u*.5);
  if(!t){tip.style.display='none';return;}tip.style.display='block';tip.innerHTML=`<b>${hsIc(t)} ${t[9]}</b> · Nv ${t[2]}<br>${fi(t[3])} de daño (${Math.round(100*t[3]/tot)}%) · ${t[4]} bajas`;tip.style.left=(e.clientX-b.left+14)+'px';tip.style.top=(e.clientY-b.top+14)+'px';});
 svg.addEventListener('pointerleave',()=>tip.style.display='none');}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a;
 if(a==='hsflt'){HIST.flt=b.dataset.v;HIST.sel=0;lbRender();}
 else if(a==='hssel'){HIST.sel=+b.dataset.v;CP.pageR=true;lbRender();}
 else if(a==='hsstar'){const r=hsFiltered()[HIST.sel];if(r){r.star=r.star?0:1;hsPut(r);lbRender();}}
 else if(a==='hsbig')hsBig();
 else if(a==='hsbigx'){const el=$('hsbig');if(el)el.classList.remove('on');}
 else return;e.stopPropagation();},true);
addEventListener('keydown',e=>{const el=$('hsbig');if(e.key==='Escape'&&el&&el.classList.contains('on')){el.classList.remove('on');e.stopImmediatePropagation();e.preventDefault();}},true);

// v307: en el historial, las torres sin especialización salen con su icono dibujado (lo guardado era el emoji)
function hsIc(t){try{if(!t[1]&&TW[t[0]]&&TW[t[0]].icsvg)return twIc(t[0]);}catch(e){}return t[8]||'';}
