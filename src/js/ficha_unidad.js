// ==================== v361 · TARJETA DE UNIDAD (Nogal, 19-nov) ====================
// En la ficha de una torre con unidades (Baluarte, Gremio, cerditos…), «Más detalles» ya no despliega sus bloques de cifras:
// lleva un botón por unidad. Al pulsarlo, la ficha se cambia por la tarjeta de esa unidad (mismo diseño que la de la torre:
// vida en barra, números en tarjetas, efectos en pastilla y el resto plegado) con «← Torre» para volver.
const FU={tid:null,i:-1};
const fuNm=t=>(t.spec&&SPECS[t.type]&&SPECS[t.type][t.spec]&&SPECS[t.type][t.spec].n)||TW[t.type].n;/* nombre de la torre tal como sale en su ficha */
const fuTxt=h=>{const d=document.createElement('div');d.innerHTML=h;return d.textContent.trim();};
// soldados vivos de cada bloque (para la vida en directo): normales, todos; Gremio, por clase; cerditos, el suyo
function fuSold(t,i,blocks){const T=TW[t.type];if(T.pig)return t.pigT&&t.pigT.sd||[];if(!t.sd)return [];
 if(T.guild){const seen=[];for(const c of guildParty(t))if(!seen.includes(c))seen.push(c);const c=seen[i];return t.sd.filter(s=>s.cls===c);}
 return i===0&&!T.glut?t.sd:[];}
// quita los bloques de unidad de «Más detalles» y deja un botón por unidad
function fuButtons(t,w){const blocks=[...w.querySelectorAll('.ftfold[data-ft="more"] .usub')];if(!blocks.length||TW[t.type].glut)return [];
 const out=blocks.map(b=>{const hd=b.querySelector(':scope>b'),ic=hd&&hd.querySelector('.tuic'),nm=fuTxt(hd?hd.innerHTML.replace(/<span class="tuic[\s\S]*?<\/span>/,''):'Unidad');return {html:b.outerHTML,nm:/^Estadísticas de unidades$/.test(nm)?fuNm(t):nm,ic:ic?ic.outerHTML:''};});
 const ic0=(out.find(u=>u.ic)||{}).ic||unitHead('tw:'+t.id)||'';out.forEach(u=>{if(!u.ic)u.ic=ic0;});/* las unidades sin icono propio llevan el de su torre */
 blocks.forEach((b,i)=>{if(i===0)b.insertAdjacentHTML('beforebegin',`<div class="fuubs">${out.map((u,k)=>`<button class="fuub" data-a="fuunit" data-v="${k}">${u.ic}<span>${u.nm}</span><i>›</i></button>`).join('')}</div>`);b.remove();});
 return out;}
// tarjeta de la unidad i de la torre t
function fuCard(t,i){const T=TW[t.type],X=uxT(t.type,t.spec)||T,src='tw:'+t.id,w=document.createElement('div');w.innerHTML=fuBase(t);const bl=fuButtons(t,w),u=bl[i];if(!u)return null;
 const d=document.createElement('div');d.innerHTML=u.html;const rows=[...d.querySelectorAll('.usub>.row')],sm=[...d.querySelectorAll('.usub>small')].map(e=>e.outerHTML).join('');
 const get=id=>{const r=rows.find(r=>{const k=r.querySelector('[data-kw]');return k&&k.dataset.kw===id;});if(r)rows.splice(rows.indexOf(r),1);return r;};
 const chip=(r,lab)=>{const v=r.lastElementChild,l=r.firstElementChild;return ftChip(v.className||r.className.replace('row','').trim(),lab||l.innerHTML.replace(/\s*\(a distancia\)/,''),v.innerHTML.replace(/\s*\((a distancia|cuerpo a cuerpo)\)/,''));};
 const nm=get('usol'),hp=get('uhp'),dm=get('dmg'),cd=get('cool'),ap=get('aphys'),rg=get('rng'),sp=get('espd'),ef=get('eff');get('dps');
 const ch=[];if(dm)ch.push(chip(dm));if(cd)ch.push(chip(cd,kst('cool','Enfriam.',src)));else if(dm&&!T.guild){try{ch.push(ftChip('ccl',kst('cool','Enfriam.',src),f(1/stats(t).rate)+' s'));}catch(x){}}/* la ficha de la torre ya lo quitó de «Más detalles»: es el de la torre */
 if(ap)ch.push(chip(ap));if(rg)rows.unshift(rg);if(sp)rows.unshift(sp);/* tres números arriba (como mucho); velocidad y rango, en «Más detalles» */
 // vida: una barra por unidad (en directo); sin unidades en el mapa, su vida máxima
 const SD=fuSold(t,i),mx=hp?fuTxt(hp.lastElementChild.innerHTML):'';
 const vida=SD.length?`<div class="fhbox fhhp fuhp fuhps"><div class="fhl"><span>${kst('uhp','Vida',src)}</span><b>${mx}</b></div>${SD.map(s=>s.hp>0?`<div class="ftbar"><i style="width:${Math.round(s.hp/s.max*100)}%"${s.hp/s.max<.35?' class="low"':''}></i></div>`:`<div class="ftbar dead"><i style="width:0"></i><em>Caído · vuelve en ${Math.ceil(s.rt||0)} s</em></div>`).join('')}</div>`
  :hp?`<div class="fhbox fhhp fuhp"><div class="fhl"><span>${kst('uhp','Vida',src)}</span><b>${mx}</b></div><div class="ftbar"><i style="width:100%"></i></div></div>`:'';
 const fx=ef?`<div class="ftfx">${ef.lastElementChild.innerHTML}</div>`:'';
 const n=nm?fuTxt(nm.lastElementChild.innerHTML):'',cnt=/×\d+/.test(u.nm)?'':(n&&n!=='1'&&!isNaN(+n)?' ×'+n:'');
 return `<div class="ftc fuu"><button class="fuback" data-a="fuback">← ${fuNm(t)}</button>
  <div class="ttl">${u.ic}<b>${u.nm}${cnt}</b></div><div class="ftsub">Unidad de ${fuNm(t)}</div>${sm?`<div class="ftdesc fudsc">${sm}</div>`:''}
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
// la vida de la tarjeta, en directo
setInterval(()=>{try{if(FU.tid==null||FU.i<0)return;const box=document.querySelector('#tip .fuu,#side .fuu');if(!box)return;const t=S.list.find(o=>o.id===FU.tid);if(!t)return;
 const SD=fuSold(t,FU.i),bars=box.querySelectorAll('.fuhps .ftbar');if(bars.length!==SD.length)return;SD.forEach((s,k)=>{const b=bars[k],i=b.querySelector('i'),dead=s.hp<=0;
  if(dead!==b.classList.contains('dead')){refreshPrim();return;}if(dead){const em=b.querySelector('em');if(em)em.textContent='Caído · vuelve en '+Math.ceil(s.rt||0)+' s';}else{i.style.width=Math.round(s.hp/s.max*100)+'%';i.classList.toggle('low',s.hp/s.max<.35);}});}catch(e){}},250);
