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
// ---- barras nuevas (en prueba): progreso de la Luz, la Comida, el crecimiento del dragón, su llamarada y las familias del Omega ----
TMECH.push(
 {k:'luz',on:t=>!!TW[t.type].faro&&(t.lvl||1)<4,n:'Luz',ic:'luz',base:1,v:t=>Math.min(1,(t.light||0)/FARO[t.lvl].need),l:t=>fi(t.light||0)+' / '+fi(FARO[t.lvl].need),
  x:t=>'La llenan las torres iluminadas con su daño; llena, sube a Nv '+((t.lvl||1)+1)+'.'},
 {k:'comida',on:t=>!!TW[t.type].glut&&(t.lvl||1)<4,n:'Comida',ic:'comida',base:1,v:t=>Math.min(1,(t.food||0)/GLUT[t.lvl]),l:t=>(t.food||0)+' / '+GLUT[t.lvl]+' bajas',
  x:t=>'Cada baja que hace el Mímico le alimenta; lleno, sube a Nv '+((t.lvl||1)+1)+'.'},
 {k:'crece',on:t=>!!TW[t.type].dragon&&(t.stage||0)<3,n:'Crecimiento',ic:'crece',base:1,
  v:t=>{const sg=t.stage||0,a=DRGAT[sg],b=DRGAT[sg+1];return Math.max(0,Math.min(1,(S.round-t.born-a)/(b-a)));},
  l:t=>{const sg=t.stage||0;return 'Ronda '+(t.born+DRGAT[sg+1]);},
  x:t=>{const sg=t.stage||0,nx=['','drag1','drag2','drag3'][sg+1],ok=sg===0||revd(nx);return 'Crece con las rondas: '+(ok?'se convierte en '+DRAG[sg+1].n:'cambia de forma')+' en la ronda '+(t.born+DRGAT[sg+1])+'.';}},
 {k:'llama',on:t=>!!TW[t.type].dragon&&(t.stage||0)>=3,n:'Llamarada',ic:'burn',base:1,v:t=>{const b=t.fly&&t.fly.br!=null?t.fly.br:DBRCD;return Math.max(0,Math.min(1,1-b/DBRCD));},
  l:t=>{const b=t.fly&&t.fly.br!=null?t.fly.br:DBRCD;return b<=1.5?'¡Lista!':'Cargando…';},
  x:t=>'Cada bola de fuego la carga; llena, la siguiente lleva llamarada.'},
 {k:'omfam',on:t=>!!TW[t.type].omega,n:'Familias',ic:'omfam',base:1,v:t=>Math.min(1,(t.fam||[]).length/omCap(t)),l:t=>(t.fam||[]).length+' / '+omCap(t),
  x:t=>{const n=(t.fam||[]).length,c=omCap(t);return n<c?'Le caben '+(c-n)+' familias más.':(t.lvl||1)<4?'Lleno: súbelo a Nv '+((t.lvl||1)+1)+' para que quepan 2 más.':'Lleno: tiene todas las familias que admite.';}});
{const _k0=kwHtml0;kwHtml0=function(id,src){
 if(id==='luz')return '<b>Luz</b><small>Cada punto de daño que hacen las torres iluminadas por el Faro suma luz. Con '+FARO.slice(1).map(L=>fi(L.need)).join(', ')+' de luz, el Faro sube a Nv 2, 3 y 4.</small>';
 if(id==='comida')return '<b>Comida</b><small>Cada enemigo que mata el propio Mímico suma 1. Con '+GLUT.slice(1).join(', ')+' bajas sube a Nv 2, 3 y 4. No se mejora con oro.</small>';
 if(id==='crece')return '<b>Crecimiento</b><small>El huevo eclosiona a las 3 rondas de conseguirlo. Después sigue creciendo solo con las rondas.</small>';
 if(id==='omfam')return '<b>Familias</b><small>Cada torre que absorbe le da la pieza de su familia (Físico, Fuego, Veneno…). Cada Nv admite 2 familias más.</small>';
 return _k0.apply(this,arguments);};}
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
 // números propios
 const chips=q('.ftchips'),setChips=a=>{if(chips)chips.outerHTML=fuChips(a);else{const fx=q('.ftfx')||q('.ftgap');if(fx)fx.insertAdjacentHTML('beforebegin',fuChips(a));}};
 if(T.faro){const L=FARO[lv-1],a=[ftChip('ca',kst('area','Radio',src),f(L.r)),ftChip('cg',kst('rng','Alcance',src),'+'+Math.round(L.rg*100)+'%')];
  if(lv>=2)a.push(ftChip('cd',kst('dmg','Daño',src),'+'+Math.round(L.d*100)+'%'));if(lv>=3)a.push(ftChip('cr',kst('cool','Enfriam.',src),'−'+Math.round(L.c*100)+'%'));setChips(a);rm('.ftfold[data-ft="obj"]');}
 if(T.dragon){const sg=t.stage||0,st=stats(t),D=[null,{d:8,cd:1.2,r:2.5,a:.4},{d:18,cd:1.5,r:3.5,a:1},{d:22,cd:1.5,r:3.5,a:1.2}][sg];
  if(!D){setChips([]);rm('.ftdps');}else{const dps=D.d/D.cd*(1+(st.crit||0)*((st.critm||2)-1));setChips([ftChip('cd',kst('dps','DPS',src),f(dps)),ftChip('cr',kst('cool','Enfriam.',src),f(D.cd)+' s'),ftChip('cg',kst('rng','Rango',src),cas(D.r)),ftChip('ca',kst('area','Área',src),f(D.a))]);
   const dp=q('.ftdps');if(dp)dp.dataset.theo=dps;else{const g=q('.ftgap');if(g)g.insertAdjacentHTML('afterend',ftDpsBar(t,dps));}}}
 if(T.wall){const s=stats(t),a=[ftChip('cr',kst('cool','Enfriam.',src),f(1/s.rate)+' s'),ftChip('cg',kst('rng','Rango',src),cas(s.range/K))];
  a.push(ftChip('ca',kst('dur','Duración',src),durOf(T,s)));setChips(a);}
 if(T.omega){const fam=t.fam||[];setChips([ftChip('cg',kst('rng','Rango',src),cas(stats(t).range/K))]);rm('.ftdps');rm('.ftfold[data-ft="obj"]');
  const c=q('.ftchips');if(c)c.insertAdjacentHTML('afterend',fam.length?`<div class="fuom">${OMORD.filter(k=>fam.includes(k)).map(k=>`<div class="omf"><span class="omi">${omPc(k)}</span><span><b style="color:${OMF[k].col}">${OMF[k].n}</b><small>${OMF[k].d[lv-1]}</small></span></div>`).join('')}</div>`:'<small>Todavía no ha absorbido ninguna torre: solo lanza un pulso muy débil.</small>');}
 if(T.log){const fx=q('.ftfx');if(fx)fx.insertAdjacentHTML('beforeend',fxPill('push','0,5',src,'Empuje'));}
 // Más detalles propios (sacados de la ficha antigua, que ya tiene las cifras bien)
 const more=[];
 if(T.guild){const o=document.createElement('div');o.innerHTML=uniqInfo(t,t.type);o.querySelectorAll('.usub').forEach(e=>more.push(e.outerHTML));
  more.push(R('gd','Recompensa por ronda',[10,20,35,50][lv-1]+' 🪙')+R('gd','Comisión','+25%'));if(lv>=4)more.push(`<small><b>Renombre</b>: cuando un aventurero mata a una Mini-élite, una Élite o un Jefe, todo el grupo gana daño y vida.</small>`);}
 if(T.dragon&&(t.stage||0)>=1){const sg=t.stage;more.push(dragRows(t,sg,src));if(sg>=3){const br=abRank(t,'dbreath'),bm=1+(br?br.b:0);more.push(R('cd','Llamarada',f(DBRN*bm)+' stacks de '+kw('burn','quemadura',src))+R('ca','Franja de fuego',f(DBRL+(br?br.L:0)))+R('cr',kst('dur','Duración',src)+' de la franja',f(DBRT+(br?br.t:0))+' s'));}}
 if(T.pig&&lv>=4){const P=PIGU[t.type];more.push(R('',kst('usol','Unidad',src),`<span class="kw" data-kw="pigu" data-src="${src}">${P.n}</span>`));}
 if(more.length){let mf=q('.ftfold[data-ft="more"]');if(T.guild||T.dragon){if(mf)mf.remove();mf=null;}
  if(mf)mf.querySelector('.ftin').insertAdjacentHTML('afterbegin',more.join(''));else{const c=q('.ftc');if(c)c.insertAdjacentHTML('beforeend',ftFold('more','<span>Más detalles</span>',more.join('')));}}
 // fuera lo repetido arriba y las cifras que valen 0
 if(T.faro||T.omega)rm('.ftfold[data-ft="more"]');
 w.querySelectorAll('.ftfold[data-ft="more"] .row').forEach(r=>{const k=r.querySelector('[data-kw]'),id=k&&k.dataset.kw,v=(r.lastElementChild&&r.lastElementChild.textContent||'').trim();
  if(v==='0'||(T.wall&&id==='dur')||(T.log&&id==='push'))r.remove();});
 return w.innerHTML;}
{const _ti=towerInfo;towerInfo=function(t){if(t&&TW[t.type]&&TW[t.type].uniq){try{return fichaUnica(t);}catch(e){console.error(e);}}return _ti.apply(this,arguments);};}
