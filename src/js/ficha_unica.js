// ==================== v361 · FICHA NUEVA DE LAS TORRES DE EVENTO (en prueba: rama wip, sin aprobar) ====================
// En partida, las torres de evento usan la misma ficha que las demás (fichaTorre): qué hace en una línea, su mecánica con barra,
// números de colores, efectos en pastilla, DPS real abajo, Habilidades y Más detalles plegados. Cada torre ajusta lo suyo aquí.
// El compendio sigue con uniqInfo (como las torres normales siguen con shopInfo).
const FUQ={
 faro:t=>(t.lvl||1)>=4?'No ataca: proyecta dos zonas de luz que puedes mover. Mejoran las torres de dentro; si las juntas, se suman.':'No ataca: proyecta una zona de luz que puedes mover. Mejora las torres de dentro y crece con el daño que hacen.',
 dragon:t=>['Todavía no hace nada.','Bloquea en el camino y escupe fuego; de cerca, ataca con garras. Si cae, reaparece.','Vuela alrededor de su bandera y lanza bolas de fuego. Solo le atacan los enemigos a distancia.','Vuela y lanza bolas de fuego; cada cierto tiempo, una llamarada que deja el camino ardiendo.'][t.stage||0],
 guild:()=>'Un grupo de aventureros que pelea en el camino y te trae oro cada ronda.',
 straw:()=>'Lanza fardos de paja que dañan y ralentizan mucho a todos los del área.',
 wood:()=>'Lanza troncos que ruedan por el camino hacia los portales: dañan y empujan a todos los que pillan.',
 brick:()=>'Un cerdito albañil levanta un muro delante del enemigo más avanzado de su rango.',
 glut:()=>'Un cofre que se planta en el camino: bloquea y muerde. Sube de Nv comiendo, con las bajas que hace él.',
 omega:()=>'Absorbe torres de tu mazo y gana sus piezas. Cada Nv admite 2 familias más.'};
// ---- barras nuevas (en prueba): Luz, Comida, Crecimiento (en pips, una por ronda), Llamarada y Familias ----
// Como en las torres normales: la barra sin frase; lo que es y sus cifras, en el bocadillo de su palabra clave.
const fuTw=src=>{const m=/^tw:(\d+)$/.exec(src||'');return m&&S&&S.list?S.list.find(t=>t.id==m[1]):null;};
const fuCrec=t=>{const sg=t.stage||0,n=DRGAT[sg+1]-DRGAT[sg],d=Math.max(0,Math.min(n,S.round-t.born-DRGAT[sg]));return {n,d};};
TMECH.push(
 {k:'luz',on:t=>!!TW[t.type].faro&&(t.lvl||1)<4,n:'Luz',ic:'luz',v:t=>Math.min(1,(t.light||0)/FARO[t.lvl].need),l:t=>fi(t.light||0)+' / '+fi(FARO[t.lvl].need)},
 {k:'comida',on:t=>!!TW[t.type].glut&&(t.lvl||1)<4,n:'Comida',ic:'comida',v:t=>Math.min(1,(t.food||0)/GLUT[t.lvl]),l:t=>(t.food||0)+' / '+GLUT[t.lvl]+' bajas'},
 {k:'crece',on:t=>!!TW[t.type].dragon&&(t.stage||0)<3,n:'Crecimiento',ic:'crece',pips:fuCrec,v:t=>{const c=fuCrec(t);return c.d/c.n;},
  l:t=>{const c=fuCrec(t),r=c.n-c.d;return r<=1?'Cambia de forma la próxima ronda':'Faltan '+r+' rondas';}},
 {k:'llama',on:t=>!!TW[t.type].dragon&&(t.stage||0)>=3,n:'Llamarada',ic:'llama',v:t=>{const b=t.fly&&t.fly.br!=null?t.fly.br:DBRCD;return Math.max(0,Math.min(1,1-b/DBRCD));},
  l:t=>{const b=t.fly&&t.fly.br!=null?t.fly.br:DBRCD;return b<=1.5?'¡Lista!':'Cargando…';}},
 {k:'omfam',on:t=>!!TW[t.type].omega,n:'Familias',ic:'omfam',v:t=>Math.min(1,(t.fam||[]).length/omCap(t)),l:t=>(t.fam||[]).length+' / '+omCap(t)});
{const _k0=kwHtml0;kwHtml0=function(id,src){const t=fuTw(src);
 if(id==='luz')return '<b>Luz</b><small>Cada punto de daño que hacen las torres iluminadas por el Faro suma luz. Con '+FARO.slice(1).map(L=>fi(L.need)).join(', ')+' de luz, el Faro sube a Nv 2, 3 y 4.</small>';
 if(id==='comida')return '<b>Comida</b><small>Cada enemigo que mata el propio Mímico suma 1. Con '+GLUT.slice(1).join(', ')+' bajas sube a Nv 2, 3 y 4. No se mejora con oro.</small>';
 if(id==='crece'){let x='<b>Crecimiento</b><small>El huevo eclosiona a las 3 rondas de conseguirlo y después sigue creciendo solo, con las rondas. Cada punto es una ronda.';
  if(t&&TW[t.type].dragon&&(t.stage||0)<3){const sg=t.stage||0,nx=['','drag1','drag2','drag3'][sg+1],ok=sg===0||revd(nx);x+=' '+(ok?'Se convierte en '+DRAG[sg+1].n:'Cambia de forma')+' en la ronda '+(t.born+DRGAT[sg+1])+'.';}
  return x+'</small>';}
 if(id==='llama'){const br=t&&abRank(t,'dbreath'),bm=1+(br?br.b:0),L=DBRL+(br?br.L:0),T2=DBRT+(br?br.t:0);
  return '<b>Llamarada</b><small>Cada bola de fuego la carga (unos '+DBRCD+' s disparando). Llena, la siguiente bola lleva llamarada: pasa en línea recta sobre el camino, aplica '+f(DBRN*bm)+' stacks de '+kw('burn','quemadura',src)+' a los que pilla y deja una franja de fuego de '+cas(L)+' que dura '+f(T2)+' s y quema a quien la pisa.</small>';}
 if(id==='omfam')return '<b>Familias</b><small>Cada torre que absorbe le da la pieza de su familia (Físico, Fuego, Veneno…). Cada Nv admite 2 familias más.</small>';
 if(id==='logk'&&t&&TW[t.type].log){const h=_k0.apply(this,arguments),rows=document.createElement('div');rows.innerHTML=uniqInfo(t,t.type);
  const d=[...rows.querySelectorAll('.row')].find(r=>{const k=r.querySelector('[data-kw]');return k&&k.dataset.kw==='dur';});
  const v=d?d.lastElementChild.textContent.replace(/\s*\(rodando\)/,''):'';return v?h.replace(/<\/small>$/,' Rueda durante '+v+'.</small>'):h;}
 return _k0.apply(this,arguments);};}
// vida en barra ancha, como la del héroe (dragón y Mímico); caído, cuenta atrás en trozos
function fuVida(t,src){const T=TW[t.type],u=T.glut?glutU(t):(t.sd&&t.sd[0]);if(!u||!u.max)return '';
 if(u.hp<=0){const rz=T.dragon?DRREZ:Math.max(1,u.rtM||10);return `<div class="fhbox fhhp dead fuhp"><div class="fhl"><span>${kst('uhp','Vida',src)}</span><span class="fhdv">Caído · vuelve en ${Math.ceil(u.rt||0)} s</span></div>${fhSeg(rz,u.rt||0)}</div>`;}
 const hp=Math.ceil(u.hp),mx=Math.round(u.max);return `<div class="fhbox fhhp fuhp"><div class="fhl"><span>${kst('uhp','Vida',src)}</span><b>${hp} / ${mx}</b></div><div class="ftbar"><i style="width:${hp/mx*100}%"${hp/mx<.35?' class="low"':''}></i></div></div>`;}
// torres que ilumina este Faro ahora mismo (las que reciben su mejora)
const fuIlN=f=>S.list.filter(o=>o!==f&&!o.hero&&TW[o.type]&&!TW[o.type].faro&&faroIn(f,o)>0).length;
const fuIl=f=>{const n=fuIlN(f);return n?'Ilumina '+n+(n===1?' torre':' torres'):'No ilumina ninguna torre';};
setInterval(()=>{try{const t=typeof FT!=='undefined'&&FT.t;if(!t||!TW[t.type]||!TW[t.type].faro)return;const e=document.querySelector('#side .fuil,#tip .fuil');if(e){const x=fuIl(t);if(e.textContent!==x)e.textContent=x;}}catch(e){}},300);
// DPS teórico del Omega por tipo de daño, con las mismas cuentas que omegaTick (omega.js): ametralladoras (físico), rayo (mágico) y arco (elemental, al primero)
function omDps(t){const fam=t.fam||[],L=t.lvl||1,st=stats(t),M=[0,1,1.3,1.6,2][L]*(st.dmg/TW.omega.dmg/lvMods('omega',L,null).dmg||1)*(t.xd||1),o={};
 if(fam.includes('fis')){const guns=L>=4?3:L>=2?2:1;o.fis=(L>=3?5.5:4)*guns*3*(L>=4?1.4:1)*M;}
 if(fam.includes('mag'))o.mag=(L>=2?22:14)*M/1.2;if(fam.includes('ele'))o.ele=8*M;return o;}
// ---- ficha ----
const fuChips=a=>`<div class="ftchips n${a.length}">${a.join('')}</div>`;
function fichaUnica(t){const T=TW[t.type],src='tw:'+t.id,ev=EVENTS[T.ev],lv=t.lvl||1;
 const w=document.createElement('div');w.innerHTML=fichaTorre(t);
 const q=s=>w.querySelector(s),rm=s=>w.querySelectorAll(s).forEach(e=>e.remove());
 // cabecera: subtítulo con el evento; el Gremio lleva rango (C, B, A, S) y el dragón su forma, no galones
 const ttl=q('.ttl');if(ttl){if(T.guild||T.dragon){const g=ttl.querySelector('.gal');if(g)g.remove();}
  if(T.guild)ttl.insertAdjacentHTML('beforeend',`<span class="fuRk">Rango <b>${RANKS[lv-1]}</b></span>`);
  ttl.insertAdjacentHTML('afterend',`<div class="ftsub">Torre de evento · «${ev?ev.n:''}»</div>`);}
 // qué hace
 const dtx=FUQ[t.type]?FUQ[t.type](t):'',d=q('.ftdesc');if(d)d.innerHTML=dtx;else if(dtx){const c=q('.ftc');if(c)c.insertAdjacentHTML('afterbegin',`<div class="ftdesc">${dtx}</div>`);}
 // barra de mecánica sin frase (como en las torres normales) y el Crecimiento en pips
 const mt=q('.ftmt');if(mt){const b0=mt.querySelector('b');mt.innerHTML=b0?b0.outerHTML:'';}
 const M=ftMech(t);if(M&&M.pips){const c=M.pips(t),mb=q('.ftmb');if(mb)mb.outerHTML=`<div class="fupips">${Array.from({length:c.n},(_,i)=>`<i class="${i<c.d?'on':''}"></i>`).join('')}</div>`;}
 // vida en barra (dragón con forma y Mímico), con aire debajo de la mecánica
 if((T.dragon&&(t.stage||0)>=1)||T.glut){const vh=fuVida(t,src),at=q('.ftmech')||q('.ftdesc');if(vh&&at)at.insertAdjacentHTML('afterend',vh);}
 // Faro: «Ilumina N torres» al otro lado de la línea de la barra (o solo, a Nv 4) y la barra en color luz
 if(T.faro){const mb=q('.ftmech');const il=`<span class="fuil">${fuIl(t)}</span>`;if(mb){mb.classList.add('fu-luz');const ml=mb.querySelector('.ftml');if(ml)ml.outerHTML=`<div class="furow">${il}${ml.outerHTML}</div>`;}else{const d0=q('.ftdesc');if(d0)d0.insertAdjacentHTML('afterend',`<div class="furow solo">${il}</div>`);}}
 // números propios
 const chips=q('.ftchips'),setChips=a=>{if(chips)chips.outerHTML=fuChips(a);else{const fx=q('.ftfx')||q('.ftgap');if(fx)fx.insertAdjacentHTML('beforebegin',fuChips(a));}};
 if(T.faro){const L=FARO[lv-1],a=[ftChip('ca',kst('area','Radio',src),f(L.r)),ftChip('cg',kst('rng','Alcance',src),'+'+Math.round(L.rg*100)+'%')];
  if(lv>=2)a.push(ftChip('cd',kst('dmg','Daño',src),'+'+Math.round(L.d*100)+'%'));if(lv>=3)a.push(ftChip('cr',kst('cool','Enfriam.',src),'−'+Math.round(L.c*100)+'%'));setChips(a);rm('.ftfold[data-ft="obj"]');}
 if(T.dragon){const sg=t.stage||0,st=stats(t),D=[null,{d:8,cd:1.2,r:2.5,a:.4},{d:18,cd:1.5,r:3.5,a:1},{d:22,cd:1.5,r:3.5,a:1.2}][sg];
  if(!D){setChips([]);rm('.ftdps');}else{const dps=D.d/D.cd*(1+(st.crit||0)*((st.critm||2)-1));setChips([ftChip('cd',kst('dps','DPS',src),f(dps)),ftChip('cr',kst('cool','Enfriam.',src),f(D.cd)+' s'),ftChip('cg',kst('rng','Rango',src),cas(D.r)),ftChip('ca',kst('area','Área',src),f(D.a))]);
   const dp=q('.ftdps');if(dp)dp.dataset.theo=dps;else{const g=q('.ftgap');if(g)g.insertAdjacentHTML('afterend',ftDpsBar(t,dps));}}}
 if(T.wall){const s=stats(t),a=[ftChip('cr',kst('cool','Enfriam.',src),f(1/s.rate)+' s'),ftChip('cg',kst('rng','Rango',src),cas(s.range/K))];
  a.push(ftChip('ca',kst('dur','Duración',src),durOf(T,s)));setChips(a);}
 if(T.omega){const fam=t.fam||[],D=omDps(t),a=[];
  if(D.fis)a.push(ftChip(dtCls('phys'),kst('tphys','Físico',src),f(D.fis)));if(D.mag)a.push(ftChip(dtCls('magic'),kst('tmagic','Mágico',src),f(D.mag)));if(D.ele)a.push(ftChip(dtCls('elem'),kst('telem','Elemental',src),f(D.ele)));
  a.push(ftChip('cg',kst('rng','Rango',src),cas(stats(t).range/K)));setChips(a.slice(0,4));rm('.ftfold[data-ft="obj"]');
  // efectos que no son daño directo (quemadura, veneno, control, apoyo), en su pastilla
  const fx=[];if(fam.includes('fue'))fx.push(fxPill('burn','',src,'Quemadura'));if(fam.includes('ven'))fx.push(fxPill('poison','',src,'Veneno'));if(fam.includes('con'))fx.push(fxPill('slow','30%',src,'Ralentiza'));if(fam.includes('ele')&&lv>=4)fx.push(fxPill('ez','',src,'Electrizado'));
  const ofx=q('.ftfx');if(ofx)ofx.remove();if(fx.length){const c=q('.ftchips');if(c)c.insertAdjacentHTML('afterend',`<div class="ftfx">${fx.join('')}</div>`);}
  const tot=(D.fis||0)+(D.mag||0)+(D.ele||0),dp=q('.ftdps');if(dp){if(tot>0)dp.outerHTML=ftDpsBar(t,tot);else dp.remove();}else if(tot>0){const g=q('.ftchips');if(g)g.insertAdjacentHTML('afterend',ftDpsBar(t,tot));}
  // las familias, en pips del color de cada una, en el orden en que las metiste
  const mb=q('.ftmech .ftmb');if(mb)mb.outerHTML=`<div class="fupips om">${Array.from({length:omCap(t)},(_,i)=>{const k=fam[i];return k?`<i class="on" style="background:${OMF[k].col}" title=""></i>`:'<i></i>';}).join('')}</div>`;
  const c=q('.ftdps')||q('.ftfx')||q('.ftchips');if(c)c.insertAdjacentHTML('afterend',fam.length?`<div class="fuom">${fam.map(k=>`<div class="omf"><span class="omi">${omPc(k)}</span><span><b style="color:color-mix(in srgb,${OMF[k].col} 65%,#2a1d08)">${OMF[k].n}</b><small>${OMF[k].d[lv-1]}</small></span></div>`).join('')}</div>`:'<small>Todavía no ha absorbido ninguna torre: solo lanza un pulso muy débil.</small>');}
 if(T.log){const fx=q('.ftfx');if(fx)fx.insertAdjacentHTML('beforeend',fxPill('push','0,5',src,'Empuje'));}
 // Más detalles propios (sacados de la ficha antigua, que ya tiene las cifras bien)
 const more=[];
 if(T.guild){const o=document.createElement('div');o.innerHTML=uniqInfo(t,t.type);o.querySelectorAll('.usub').forEach(e=>more.push(e.outerHTML));
  more.push(R('gd','Recompensa por ronda',[10,20,35,50][lv-1]+' 🪙')+R('gd','Comisión','+25%'));if(lv>=4)more.push(`<small><b>Renombre</b>: cuando un aventurero mata a una Mini-élite, una Élite o un Jefe, todo el grupo gana daño y vida.</small>`);}
 if(T.dragon&&(t.stage||0)>=1)more.push(dragRows(t,t.stage,src));
 if(T.pig&&lv>=4){const P=PIGU[t.type];let h=kwHtml0('pigu',src)||'';h=h.replace(/^<b>[\s\S]*?<\/b>/,'').replace(/^<small[^>]*>[\s\S]*?<\/small>/,'');more.push(`<div class="usub"><b>${P.n}</b>${h}</div>`);}/* v361: su tarjeta de unidad (ficha_unidad.js) */
 if(more.length){let mf=q('.ftfold[data-ft="more"]');if(T.guild||T.dragon){if(mf)mf.remove();mf=null;}
  if(mf)mf.querySelector('.ftin').insertAdjacentHTML('afterbegin',more.join(''));else{const c=q('.ftc');if(c)c.insertAdjacentHTML('beforeend',ftFold('more','<span>Más detalles</span>',more.join('')));}}
 // fuera lo repetido arriba y las cifras que valen 0
 if(T.faro||T.omega)rm('.ftfold[data-ft="more"]');
 w.querySelectorAll('.ftfold[data-ft="more"] .row').forEach(r=>{const k=r.querySelector('[data-kw]'),id=k&&k.dataset.kw,v=(r.lastElementChild&&r.lastElementChild.textContent||'').trim();
  if(v==='0'||((T.dragon||T.glut)&&id==='uhp')||(T.glut&&id==='usol')||(T.wall&&id==='dur')||(T.log&&(id==='push'||id==='dur')))r.remove();});
 return w.innerHTML;}
{const _ti=towerInfo;towerInfo=function(t){if(t&&TW[t.type]&&TW[t.type].uniq){try{return fichaUnica(t);}catch(e){console.error(e);}}return _ti.apply(this,arguments);};}
