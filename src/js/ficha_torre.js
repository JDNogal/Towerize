// ==================== v352 · FICHA DE TORRE NUEVA (Mesa «fichtorre3», aprobada por Nogal 15-nov) ====================
// Corta y con lo importante arriba: qué hace en una línea; su mecánica en directo con barra (solo las torres que la tienen);
// 4 números (DPS, enfriamiento, rango, área; los que valen 0 no salen); debajo, el DPS real en directo comparado con el teórico
// (entre oleadas, congelado con la media de la última, en gris); los efectos solo con su icono (el bocadillo los explica);
// Objetivo y Más detalles plegados, Habilidades abierta. Lo desplegado no se recuerda entre fichas: cada ficha se abre siempre igual.
const FT={key:null,t:null,open:{}};
const FTFOLD={obj:false,ab:true,more:false};
// ---- mecánicas con barra en directo: v = 0..1, l = texto de la derecha, base = se ve también la descripción de la torre ----
const TMECH=[
 {k:'volc',on:t=>t.spec==='volc',n:'Calor',ic:'burn',base:1,v:t=>t.heat||0,l:t=>'Calor '+Math.round((t.heat||0)*100)+'%'},
 {k:'herald',on:t=>t.type==='augur'&&t.spec==='herald',n:'Carga del Juicio',ic:'ez',v:t=>Math.min(1,(t.ch||0)/HCH),l:t=>Math.floor(t.ch||0)+' / '+HCH},
 {k:'mag',on:t=>{try{return magMax(t)>0;}catch(e){return false;}},n:'Cargador',ic:'mag',base:1,
  v:t=>{const mx=magMax(t);if(t.rld>0){const T=twm(t.type,t.spec),r=T.reload||1.8;return 1-Math.min(1,t.rld/r);}return (t.magN==null?mx:t.magN)/mx;},
  l:t=>{const mx=magMax(t);return t.rld>0?'Recargando…':(t.magN==null?mx:t.magN)+' / '+mx;},
  x:t=>{const T=twm(t.type,t.spec),r=T.ramp||.6;return 'Cuanto más rato dispara seguido, más Cadencia gana (hasta +'+Math.round(r*100)+'% de velocidad); al recargar, la pierde.';}},
 {k:'net',on:t=>{try{return !!twm(t.type,t.spec).net;}catch(e){return false;}},n:'Red',ic:'chain',v:t=>Math.min(4,t.netN||0)/4,l:t=>'+'+(15*Math.min(4,t.netN||0))+'% de daño'},
];
const ftMech=t=>TMECH.find(m=>{try{return m.on(t);}catch(e){return false;}})||null;
// ---- DPS real: muestras del daño hecho por cada torre (t.dmgT) en tiempo de juego; ventana de 3 s ----
const FTD=new WeakMap(),FTWIN=3;let FTPH=null;
function ftSample(){if(typeof S==='undefined'||!S||!S.list)return;const now=S.wt||0,wave=S.phase==='wave';
 if(wave&&FTPH!=='wave'){for(const t of S.list){const d=ftD(t);d.d0=t.dmgT||0;d.a0=t.act||0;d.s=[];}}
 if(!wave&&FTPH==='wave'){for(const t of S.list){const d=ftD(t);if(d.d0!=null){const a=(t.act||0)-d.a0;d.last=a>.5?((t.dmgT||0)-d.d0)/a:null;}}}
 FTPH=S.phase;if(!wave)return;
 for(const t of S.list){const d=ftD(t);d.s.push([now,t.dmgT||0]);while(d.s.length>2&&now-d.s[1][0]>=FTWIN)d.s.shift();}}
const ftD=t=>{let d=FTD.get(t);if(!d){d={s:[],d0:null,a0:0,last:null};FTD.set(t,d);}return d;};
function ftReal(t){const d=ftD(t);if(S.phase!=='wave')return d.last==null?null:{v:d.last,frozen:1};
 const s=d.s;if(s.length<2)return {v:0,warm:1};const a=s[0],b=s[s.length-1],dt=b[0]-a[0];return {v:dt>0?(b[1]-a[1])/dt:0,warm:dt<FTWIN*.6};}
// ---- piezas ----
const ftChip=(cls,lab,val)=>`<div class="ftchip"><span>${lab}</span><b class="${cls}">${val}</b></div>`;
const ftFold=(id,sum,body)=>{const o=FT.open[id]!=null?FT.open[id]:FTFOLD[id];return `<details class="ftfold" data-ft="${id}"${o?' open':''}><summary>${sum}</summary><div class="ftin">${body}</div></details>`;};
function ftFx(T,src){const h=effHtml(T,src);if(!h)return '';const m=h.match(/data-kw="([^"]+)"/),id=m&&m[1],extra=h.replace(/<span[^>]*>[^<]*<\/span>/,'').trim();
 const ic=id&&typeof ICKW!=='undefined'&&ICKW[id];if(!ic)return `<div class="ftfx">${h}</div>`;
 const nm=(h.match(/>([^<]*)<\/span>/)||[])[1]||'';
 return `<div class="ftfx"><span class="kw gico ftfxi" data-kw="${id}" data-src="${src}" aria-label="${nm}"><svg viewBox="-4 -4 56 56" width="22" height="22">${ic}</svg></span>${extra?`<small>${extra}</small>`:''}</div>`;}
function ftDpsBar(t,theo){if(!(theo>0))return '';const src='tw:'+t.id;
 return `<div class="ftdps" data-theo="${theo}"><div class="ftdl"><span>${kst('dpsr','DPS real',src)}</span><span class="ftdv">—</span></div><div class="ftbar"><i></i></div><div class="ftdn"></div></div>`;}
function ftMechBox(t,M,txt){return `<div class="ftmech"><div class="ftmt"><b>${kw(M.ic,M.n,'tw:'+t.id,'st')}</b>${txt?' · '+txt:''}</div><div class="ftbar ftmb"><i style="width:${Math.round(M.v(t)*100)}%"></i></div><div class="ftml">${M.l(t)}</div></div>`;}
// quita de un trozo de HTML las filas cuyo dato ya está arriba (números, efectos, objetivo, DPS)
function ftStrip(html,drop){const w=document.createElement('div');w.innerHTML=html;
 for(const r of [...w.querySelectorAll('.row')]){const k=r.querySelector('[data-kw]'),id=k&&k.dataset.kw;if(r.classList.contains('dps')||(id&&drop.includes(id)))r.remove();}
 return w.innerHTML;}
function fichaTorre(t){
 const T=TW[t.type],s=stats(t),src='tw:'+t.id,ks=[...new Set(t.cells.map(([x,y])=>S.buff[y][x]).filter(Boolean))];
 if(FT.key!==src){FT.key=src;FT.open={};}FT.t=t;
 const X=tinfo(t),usp=X.uspd||(!t.tinf&&t.uspdx)||0,UA=T.unit?uxAdj(t.type,t.spec,s,lvMods(t.type,t.lvl,t.spec).hp,X.uap):null,TT=uxT(t.type,t.spec),ss=UA?UA.s:s;
 const SP=t.spec&&SPECS[t.type]&&SPECS[t.type][t.spec],M=ftMech(t),base=typeof TWDESC!=='undefined'&&TWDESC[t.type]?TWDESC[t.type][0]:(T.d||'');
 // cabecera
 let h=`<div class="ttl ttlg"><b>${icOf(evIcX(t,X))} ${X.n}</b>${galSvg(t.lvl,twFull(t),1.05)}</div>`+(SP?`<div class="ftsub">${T.n} · especialización</div>`:'');
 // qué hace + su mecánica
 const desc=M?(M.base?base:''):(SP?SP.d||base:base);
 h+=`<div class="ftc">`+(desc?`<div class="ftdesc">${desc}</div>`:'')+(M?ftMechBox(t,M,M.x?M.x(t):(SP?SP.d:'')):'')+'<div class="row ftanc"></div><div class="esec" data-ftanc></div>';
 // los 4 números (sin los que valen 0)
 const hit=ss.dmg>0||TT.dot||TT.burn,theo=hit&&!(TT.bufo&&!(ss.dmg>0))?dpsOf(ss,TT):0,ch=[];
 if(theo>0)ch.push(ftChip('cd',kst('dps','DPS',src),f(theo)));
 if(ss.rate>0&&(hit||TT.unit))ch.push(ftChip('cr',kst('cool','Enfriam.',src),f(1/ss.rate)+' s'));
 if(ss.range>0)ch.push(ftChip('cg',kst('rng','Rango',src),cas(ss.range/K)));
 if(ss.area)ch.push(ftChip('ca',kst('area','Área',src),f(ss.area/K)));else if(TT.burn&&TT.cone)ch.push(ftChip('ca',kst('area','Área',src),Math.round(Math.min(360,TT.cone*(ss.arm||1)))+'°'));
 if(ch.length)h+=`<div class="ftchips n${ch.length}">${ch.join('')}</div>`;
 h+=ftDpsBar(t,theo);
 h+=ftFx(TT,src);
 // botones de bandera de las torres con unidades (o de la nube), siempre a mano
 let rest=rows(ss,TT,src,T.unit?unitExtra(unitRows(T,src,t,PR.pinned&&PR.key===src,UA.hpm,UA.uap,usp),t.type,t.spec,t,UA.s,UA.hpm,UA.uap,usp,src):'');
 const tail=[];rest=rest.replace(/<div class="tgt"><button data-a="flag"[^]*?<\/div>|<small>Haz clic en la torre para mover su (bandera|nube)\.<\/small>/g,m=>{tail.push(m);return '';});
 h+=tail.join('');
 // Objetivo (plegado): a quién ataca y, en la ficha fijada, el selector
 if(!T.unit){const notgt=SP&&SP.notgt,tg=notgt?'':tgtRow(t,src,PR.pinned&&PR.key===src),tw=tg.replace(/<div class="row[^>]*><span>[^]*?<\/span><span>[^<]*<\/span><\/div>/,'').replace(/(<div class="tgt">)<div>[^]*?<\/span><\/div>/,'$1');
  h+=ftFold('obj',`<span>${kst('tgt','Objetivo',src)}${notgt?'':' <em>· '+TGT[t.mode].n+'</em>'}</span>`,tw+R('cg',kst('tgts','Ataca a',src),objIc(!!T.ground,src)));}
 // Habilidades (abierta)
 const ids=abIds(t);if(ids.length){t.ab=t.ab||{};const nOn=ids.filter(id=>t.ab[id]).length;
  h+=ftFold('ab',`<span>Habilidades <em>· ${nOn} de ${ids.length}</em></span>`,ids.map(id=>{const D=AB[id],rk=t.ab[id]||0,n=D.ranks.length;
   return `<div class="row ftab${rk?'':' cno'}"><span>${kst('ab_'+id,D.n,src)}</span><span class="ftpip">${Array.from({length:n},(_,i)=>`<i class="${i<rk?'on':''}"></i>`).join('')}</span></div>`;}).join(''));}
 // Más detalles (plegado): el resto de datos, cada uno con su icono y su color
 const more=ftStrip(rest,T.unit?['rng','eff','tgt','cool','dps']:['cool','rng','area','eff','tgts','tgt','dps'])+(ks.length?'<small>Casillas bajo la torre:</small>'+ks.map(k=>`<div><i style="background:${BF[k].col}"></i>${bfkw(k)}: ${bfT(k,t.x,t.y)}${bkey(k)==='aoe'&&!ss.area&&!T.cone&&!(t.type==='robots'&&t.spec==='mecha')?' (sin efecto aquí)':''}</div>`).join(''):'');
 if(more.replace(/<[^>]+>/g,'').trim())h+=ftFold('more','<span>Más detalles</span>',more);
 return h+'</div>';
}
// lo que se pliega o despliega se mantiene mientras sigue abierta la misma ficha (al refrescarse), no entre fichas
document.addEventListener('toggle',ev=>{const d=ev.target;if(d&&d.classList&&d.classList.contains('ftfold')&&d.closest('#side,#tip'))FT.open[d.dataset.ft]=d.open;},true);
// bocadillo del DPS real
{const _k0=kwHtml0;kwHtml0=function(id,src){if(id==='dpsr')return '<b>DPS real</b><div style="margin-top:4px">El daño que está haciendo de verdad esta torre, de media en los últimos 3 s, ya con la armadura y la resistencia de los enemigos y sin contar el daño que sobra al rematar.</div><div style="margin-top:4px">La barra lo compara con su DPS teórico. Las torres de área pueden pasar del 100%: golpean a varios a la vez.</div><div style="margin-top:4px">Entre oleadas se queda la media de la última oleada, en gris.</div>';return _k0.apply(this,arguments);};}
try{if(typeof ICKW!=='undefined'&&ICKW.dps){ICKW.dpsr=ICKW.dps;const st=document.createElement('style');st.textContent=`body.kwico .kw[data-kw="dpsr"]:not(.gico)::before{background-image:url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 56 56">'+ICKW.dps+'</svg>')}")}`;document.head.appendChild(st);}}catch(e){}
// en directo: muestras cada 200 ms y se pintan las barras de la ficha abierta
setInterval(()=>{try{ftSample();const t=FT.t;if(!t)return;const box=document.querySelector('#side .ftc,#tip .ftc');if(!box)return;
 const M=ftMech(t),mb=box.querySelector('.ftmb i'),ml=box.querySelector('.ftml');if(M&&mb)mb.style.width=Math.round(M.v(t)*100)+'%';if(M&&ml){const l=M.l(t);if(ml.textContent!==l)ml.textContent=l;}
 const dp=box.querySelector('.ftdps');if(dp){const theo=+dp.dataset.theo,r=ftReal(t),bi=dp.querySelector('.ftbar i'),dv=dp.querySelector('.ftdv'),dn=dp.querySelector('.ftdn');
  let pc=0,v='—',n='';if(r){pc=Math.round(r.v/theo*100);v=f(r.v);n=r.frozen?'Media de la última oleada · '+pc+'% del teórico':(r.warm?'Midiendo…':pc+'% de su DPS teórico ('+f(theo)+')');}
  else n=S.phase==='wave'?'':'Se mide durante las oleadas';
  dp.classList.toggle('frozen',!!(r&&r.frozen)||!r);dp.classList.toggle('over',pc>100);bi.style.width=Math.min(100,pc)+'%';if(dv.textContent!==v)dv.textContent=v;if(dn.textContent!==n)dn.textContent=n;}
}catch(e){}},200);
