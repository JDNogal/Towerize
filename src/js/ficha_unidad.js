// ==================== v361 · TARJETA DE UNIDAD (Nogal, 19-nov) ====================
// En la ficha de una torre con unidades (Baluarte, Gremio, cerditos…), «Más detalles» ya no despliega sus bloques de cifras:
// lleva un botón por unidad. Al pulsarlo, la ficha se cambia por la tarjeta de esa unidad (mismo diseño que la de la torre:
// vida en barra, números en tarjetas, efectos en pastilla y el resto plegado) con «← Torre» para volver.
const FU={tid:null,i:-1};
const fuNm=t=>(t.spec&&SPECS[t.type]&&SPECS[t.type][t.spec]&&SPECS[t.type][t.spec].n)||TW[t.type].n;/* nombre de la torre tal como sale en su ficha */
// nombre en singular de cada unidad (aprobados por Nogal, 19-nov)
const FUSG={bastion:'Soldado',pal:'Paladín',ass:'Asesino',monk:'Monje',fist:'Monje de Batalla',drunk:'Maestro Ebrio',robots:'Robot',mecha:'Mecha',kami:'K4M1-K4Z3',hack:'Robot',alien:'Alienígena',pred:'Depredador',hive:'Alienígena'};
const fuSing=t=>FUSG[t.spec]||FUSG[t.type]||fuNm(t);
const fuTxt=h=>{const d=document.createElement('div');d.innerHTML=h;return d.textContent.trim();};
// soldados vivos de cada bloque (para la vida en directo): normales, todos; Gremio, por clase; cerditos, el suyo
function fuSold(t,i,blocks){const T=TW[t.type];if(T.pig)return t.pigT&&t.pigT.sd||[];if(!t.sd)return [];
 if(T.guild){const seen=[];for(const c of guildParty(t))if(!seen.includes(c))seen.push(c);const c=seen[i];return t.sd.filter(s=>s.cls===c);}
 return i===0&&!T.glut?t.sd:[];}
// quita los bloques de unidad de «Más detalles» y deja un botón por cada unidad (debajo de las cifras de la torre)
function fuList(t,w){const blocks=[...w.querySelectorAll('.ftfold[data-ft="more"] .usub')];if(!blocks.length||TW[t.type].glut)return [];const T=TW[t.type],L=[];
 blocks.forEach((b,bi)=>{const hd=b.querySelector(':scope>b'),ic=hd&&hd.querySelector('.tuic');let nm=fuTxt(hd?hd.innerHTML.replace(/<span class="tuic[\s\S]*?<\/span>/,''):'Unidad');let n=1;
  const mx=/\s*×(\d+)$/.exec(nm);if(mx){n=+mx[1];nm=nm.slice(0,mx.index);}
  if(/^Estadísticas de unidades$/.test(nm)){nm=fuSing(t);const SD=fuSold(t,bi);n=Math.max(1,SD.length||((T.unit&&T.unit.n)||1));}
  const SD=fuSold(t,bi);for(let j=0;j<n;j++)L.push({bi,j,n,nm,ic:ic?ic.outerHTML:'',html:b.outerHTML,s:SD[j]||null});});
 const ic0=(T.pig&&PIGU[t.type]?`<span class="tuic uhic" style="background:${T.col||'#5b8def'}">${icHtml(PIGU[t.type].ic)}</span>`:'')||(L.find(u=>u.ic)||{}).ic||unitHead('tw:'+t.id)||'';/* v361: los cerditos, con su icono en redondel (Nogal) */L.forEach(u=>{if(!u.ic)u.ic=ic0;});
 return {L,blocks};}
function fuButtons(t,w){const R0=fuList(t,w);if(!R0.L)return [];const {L,blocks}=R0;if(!L.length)return [];const lupa=icU('m_lupa','🔍');
 const bh=u=>{const s=u.s;if(!s)return '';return s.hp>0?`<span class="fuubh"><i style="width:${Math.round(s.hp/s.max*100)}%"></i></span>`:`<span class="fuubh dead">Caído</span>`;};
 const html=`<div class="fuubs">${L.map((u,k)=>`<button class="fuub" data-a="fuunit" data-v="${k}">${u.ic}<span class="fuubn"><b>${u.nm}</b>${bh(u)}</span><span class="fuubl">${lupa}</span></button>`).join('')}</div>`;
 const fin=blocks[0].closest('.ftin');blocks.forEach(b=>b.remove());if(fin)fin.insertAdjacentHTML('beforeend',html);return L;}
// tarjeta de la unidad i de la torre t
function fuCard(t,i){const T=TW[t.type],src='tw:'+t.id,w=document.createElement('div');w.innerHTML=fuBase(t);const bl=fuButtons(t,w),u=bl[i];if(!u)return null;
 const d=document.createElement('div');d.innerHTML=u.html;const rows=[...d.querySelectorAll('.usub>.row')],sm=[...d.querySelectorAll('.usub>small')].map(e=>e.outerHTML).join('');
 const get=id=>{const r=rows.find(r=>{const k=r.querySelector('[data-kw]');return k&&k.dataset.kw===id;});if(r)rows.splice(rows.indexOf(r),1);return r;};
 const chip=(r,lab)=>{const v=r.lastElementChild,l=r.firstElementChild;return ftChip(v.className||r.className.replace('row','').trim(),lab||l.innerHTML.replace(/\s*\(a distancia\)/,''),v.innerHTML.replace(/\s*\((a distancia|cuerpo a cuerpo)\)/,''));};
 const nm=get('usol'),hp=get('uhp'),dm=get('dmg'),cd=get('cool'),ap=get('aphys'),rg=get('rng'),sp=get('espd'),ef=get('eff');get('dps');
 const ch=[];if(dm)ch.push(chip(dm));if(cd)ch.push(chip(cd,kst('cool','Enfriam.',src)));else if(dm&&!T.guild){try{ch.push(ftChip('ccl',kst('cool','Enfriam.',src),f(1/stats(t).rate)+' s'));}catch(x){}}/* la ficha de la torre ya lo quitó de «Más detalles»: es el de la torre */
 if(ap)ch.push(chip(ap));if(rg)rows.unshift(rg);if(sp)rows.unshift(sp);/* tres números arriba (como mucho); velocidad y rango, en «Más detalles» */
 // vida de esta unidad, en directo; sin unidad en el mapa, su vida máxima
 const s0=u.s,mx=hp?fuTxt(hp.lastElementChild.innerHTML):'';
 const vida=s0?`<div class="fhbox fhhp fuhp fuhps"><div class="fhl"><span>${kst('uhp','Vida',src)}</span><b class="fuhv">${s0.hp>0?Math.ceil(s0.hp)+' / '+Math.round(s0.max):''}</b></div>${s0.hp>0?`<div class="ftbar"><i style="width:${Math.round(s0.hp/s0.max*100)}%"${s0.hp/s0.max<.35?' class="low"':''}></i></div>`:`<div class="ftbar dead"><i style="width:0"></i><em>Caído · vuelve en ${Math.ceil(s0.rt||0)} s</em></div>`}</div>`
  :hp?`<div class="fhbox fhhp fuhp"><div class="fhl"><span>${kst('uhp','Vida',src)}</span><b>${mx}</b></div><div class="ftbar"><i style="width:100%"></i></div></div>`:'';
 const fx=ef?`<div class="ftfx">${ef.lastElementChild.innerHTML}</div>`:'';
 return `<div class="ftc fuu"><button class="fuback" data-a="fuback">← ${fuNm(t)}</button>
  <div class="ttl">${u.ic}<b>${u.nm}</b></div><div class="ftsub">Unidad de ${fuNm(t)}${u.n>1?' · '+(u.j+1)+' de '+u.n:''}</div>${sm?`<div class="ftdesc fudsc">${sm}</div>`:''}
  ${vida}<div class="ftchips n${ch.length}">${ch.join('')}</div>${fx}${rows.length?ftFold('umore','<span>Más detalles</span>',rows.map(r=>r.outerHTML).join('')):''}</div>`;}
// la ficha de la torre sin la tarjeta de unidad (la que había antes de este archivo)
let fuBase=null;
{const _ti=towerInfo;fuBase=t=>_ti(t);towerInfo=function(t){try{if(t&&S&&S.list&&S.list.includes(t)){
  if(FU.tid===t.id&&FU.i>=0){const h=fuCard(t,FU.i);if(h)return h;FU.tid=null;FU.i=-1;}
  const w=document.createElement('div');w.innerHTML=_ti.apply(this,arguments);if(fuButtons(t,w).length)return w.innerHTML;}}catch(e){console.error(e);}
 return _ti.apply(this,arguments);};}
{const _c=closePrim;closePrim=function(){FU.tid=null;FU.i=-1;return _c.apply(this,arguments);};}
addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-a="fuunit"],[data-a="fuback"]');if(!b)return;const k=String(PR.key||''),t=S&&S.list&&S.list.find(o=>'tw:'+o.id===k);if(!t)return;
 e.preventDefault();e.stopPropagation();try{sfx('ui');}catch(x){}if(b.dataset.a==='fuunit'){FU.tid=t.id;FU.i=+b.dataset.v;}else{FU.tid=null;FU.i=-1;}refreshPrim();},true);
// la vida de la tarjeta (y de los botones), en directo
function fuUnits(){const t=S&&S.list&&FU.tid!=null&&S.list.find(o=>o.id===FU.tid);return t;}
setInterval(()=>{try{const box=document.querySelector('#tip .ftc,#side .ftc');if(!box||!box.querySelector('.fuub,.fuhps'))return;const k=String(PR.key||''),t=S&&S.list&&S.list.find(o=>'tw:'+o.id===k);if(!t)return;
 const w=document.createElement('div');w.innerHTML=fuBase(t);const L=fuButtons(t,w);
 if(FU.tid===t.id&&FU.i>=0){const u=L[FU.i],s=u&&u.s,bx=box.querySelector('.fuhps');if(!s||!bx)return;const dead=s.hp<=0,was=!!bx.querySelector('.ftbar.dead');if(dead!==was){refreshPrim();return;}
  if(dead){const em=bx.querySelector('em');if(em)em.textContent='Caído · vuelve en '+Math.ceil(s.rt||0)+' s';}else{const i=bx.querySelector('.ftbar i'),v=bx.querySelector('.fuhv');i.style.width=Math.round(s.hp/s.max*100)+'%';i.classList.toggle('low',s.hp/s.max<.35);if(v)v.textContent=Math.ceil(s.hp)+' / '+Math.round(s.max);}return;}
 box.querySelectorAll('.fuub').forEach((b,k)=>{const u=L[k],s=u&&u.s,h=b.querySelector('.fuubh');if(!s||!h)return;const dead=s.hp<=0;if(dead!==h.classList.contains('dead')){h.outerHTML=dead?'<span class="fuubh dead">Caído</span>':'<span class="fuubh"><i></i></span>';return;}if(!dead)h.querySelector('i').style.width=Math.round(s.hp/s.max*100)+'%';});}catch(e){}},250);
// línea punteada (como la del medidor de daño) del botón o de la tarjeta abierta a su unidad en el mapa
const FUH={k:-1};addEventListener('mouseover',e=>{const b=e.target.closest&&e.target.closest('.fuub');FUH.k=b?+b.dataset.v:-1;FUH.el=b||null;});
function fuLine(){try{let sv=$('fuln');const k=String(PR.key||''),t=PR.open&&S&&S.list&&S.list.find(o=>'tw:'+o.id===k);let el=null,i=-1;
 if(t&&FU.tid===t.id&&FU.i>=0){el=document.querySelector('#tip .fuu,#side .fuu');i=FU.i;}else if(t&&FUH.el&&document.body.contains(FUH.el)){el=FUH.el;i=FUH.k;}
 let s=null;if(el&&i>=0){const w=document.createElement('div');w.innerHTML=fuBase(t);const u=fuButtons(t,w)[i];s=u&&u.s;}
 if(s&&s.hp>0&&typeof scrOf==='function'){if(!sv){sv=document.createElementNS('http://www.w3.org/2000/svg','svg');sv.id='fuln';document.body.appendChild(sv);}
  const a=el.getBoundingClientRect(),[x,y,wd]=scrOf(s),cz=wd/K,cx=x+cz/2,cy=y+cz/2,lft=cx<a.left,x0=lft?a.left-4:a.right+4,y0=Math.max(a.top+12,Math.min(a.bottom-12,cy)),mx=(x0+cx)/2;
  const ur=Math.max(8,cz*.9);/* solo alrededor de esa unidad; azul claro con borde oscuro para que no se confunda con la bandera ni con el alcance (Nogal) */
  sv.innerHTML=`<path d="M${x0} ${y0} C${mx} ${y0} ${mx} ${cy} ${cx} ${cy}" fill="none" stroke="#10202a" stroke-width="5" stroke-dasharray="6 5" stroke-linecap="round" opacity=".55"/><path d="M${x0} ${y0} C${mx} ${y0} ${mx} ${cy} ${cx} ${cy}" fill="none" stroke="#7ad8ff" stroke-width="2.5" stroke-dasharray="6 5" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="${ur}" fill="none" stroke="#10202a" stroke-width="5" opacity=".55"/><circle cx="${cx}" cy="${cy}" r="${ur}" fill="none" stroke="#7ad8ff" stroke-width="2.5"/>`;sv.style.display='block';}
 else if(sv)sv.style.display='none';}catch(e){}setTimeout(()=>requestAnimationFrame(fuLine),50);}
requestAnimationFrame(fuLine);
// v361 · la tarjeta de una unidad sale a su lado, sin taparla (si no, el círculo y la línea quedan debajo de la tarjeta) (Nogal)
function fuUnitBox(){const k=String(PR.key||''),t=PR.open&&S&&S.list&&S.list.find(o=>'tw:'+o.id===k);if(!t||FU.tid!==t.id||FU.i<0||typeof scrOf!=='function')return null;
 /* la unidad se busca como mucho 4 veces por segundo (montar la ficha cada fotograma sería caro) */const now=performance.now();if(!FU.sc||FU.sc.k!==t.id+':'+FU.i||now-FU.sc.at>250){const w=document.createElement('div');w.innerHTML=fuBase(t);const u=fuButtons(t,w)[FU.i];FU.sc={k:t.id+':'+FU.i,at:now,s:u&&u.s};}const s=FU.sc.s;if(!s||s.hp<=0)return null;
 const [x,y,wd]=scrOf(s),cz=wd/K,cx=x+cz/2,cy=y+cz/2,rr=Math.max(8,cz*.9)+10;return {l:cx-rr,r:cx+rr,t:cy-rr,b:cy+rr};}
// si la unidad se mete debajo, la tarjeta se aparta lo justo, empujada por la unidad (así se mueve con ella, sin saltos);
// sigue apartándose hacia el mismo lado mientras quepa, y una transición corta suaviza el resto (Nogal)
function fuAvoid(l,t,wd,ht,r){const tip=$('tip'),ub=fuUnitBox(),k0=ub?FU.tid+':'+FU.i:null;/* al abrir la tarjeta, sale ya en su sitio; después, se aparta con suavidad */if(tip)tip.classList.toggle('fumv',!!ub&&FU.mk===k0);FU.mk=k0;if(!ub){FU.dir=null;return null;}
 const hit=(L,T)=>L<ub.r&&L+wd>ub.l&&T<ub.b&&T+ht>ub.t,fit=(L,T)=>L>=6&&T>=6&&L+wd<=innerWidth-6&&T+ht<=innerHeight-6;
 if(!hit(l,t))return null;const g=6,M={L:[ub.l-g-wd,t],R:[ub.r+g,t],U:[l,ub.t-g-ht],D:[l,ub.b+g]},dist=k=>Math.abs(M[k][0]-l)+Math.abs(M[k][1]-t);
 if(FU.dir&&fit(...M[FU.dir]))return M[FU.dir];
 const ks=Object.keys(M).filter(k=>fit(...M[k])).sort((a,b)=>dist(a)-dist(b));if(!ks.length)return null;FU.dir=ks[0];return M[ks[0]];}
