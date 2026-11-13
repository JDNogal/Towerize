// ---- v311 · Compendio > Eventos ----
// La lista enseña cada evento con un recorte de su imagen y el nombre debajo (los no encontrados, una tarjeta con «?»).
// El detalle tiene la imagen, el texto y las opciones con lo que dan (si ya las has elegido alguna vez).
// Al pulsar una opción ya elegida se pasa a su página: su imagen, su texto y lo que obtienes.
CP.evo=null;
const evCrop=(id,ok)=>{const s=ok?evImg(id,null):'';return `<span class="evcrop">${s||'?'}</span>`;};
{const _t=bkTile;bkTile=function(it,t){if(t!=='ev')return _t.apply(this,arguments);const on=CP.sel[t]===it.id;
 return `<button class="bti evt${on?' on':''}${it.ok?'':' un'}" data-a="csel" data-v="${it.id}">${evCrop(it.id,it.ok)}<small>${it.ok?it.n:'???'}</small></button>`;};}
const evGot=k=>k.length?'Obtienes: '+k.map(chip).filter(Boolean).join(' · '):'';
function evOptPage(id,i){const E=EVENTS[id],o=E.opts[i],k=memOf(id,i),img=evImg(id,i),tale=evRes(id,i,k);
 return `<div class="evdet"><div class="ttl"><b>${E.n}</b></div><small>Opción: <b>${o.l}</b></small><div class="evbig">${img}</div>${tale?`<p class="evtxt">${tale}</p>`:''}${o.c?`<div class="evoi"><span class="cst">${o.c}</span><div class="res">${evGot(k)}</div></div>`:`<div class="evoi"><div class="res">${evGot(k)}</div></div>`}<button class="stbtn evback" data-a="cevob">‹ Volver al evento</button></div>`;}
{const _d=bkDetail;bkDetail=function(t,id){if(t!=='ev')return _d.apply(this,arguments);const E=EVENTS[id];if(!E)return '';
 if(!seen('ev',id))return `<div class="evdet"><div class="ttl"><b>???</b></div><small>Aún no has encontrado este evento.</small></div>`;
 if(CP.evo!=null&&E.opts[CP.evo]&&memOf(id,CP.evo).length)return evOptPage(id,CP.evo);
 const ops=E.opts.map((o,i)=>{const k=memOf(id,i),c=o.c?`<div class="cst">${o.c}</div>`:'';
  return k.length?`<button class="evoi" data-a="cevo" data-v="${i}"><span class="ver">Ver ›</span><b>${o.l}</b>${c}<div class="res">${evGot(k)}</div></button>`
   :`<div class="evoi no"><b>${o.l}</b>${c}<div class="res">Aún no la has elegido: no sabes qué da.</div></div>`;}).join('');
 return `<div class="evdet"><div class="ttl"><b>${E.n}</b></div><div class="evbig">${evImg(id,null)}</div><p class="evtxt">${E.txt}</p><h4>Opciones</h4><div class="evol">${ops}</div></div>`;};}
// la rejilla de eventos lleva tarjetas más grandes
{const _r=lbRender;lbRender=function(){const r=_r.apply(this,arguments);try{if(LB.area==='cp'&&CP.tab==='ev')document.querySelectorAll('#comp .bktiles').forEach(x=>x.classList.add('evg'));}catch(e){}return r;};}
// «Volver» (Esc o retroceso) desde la página de una opción vuelve al evento
{const _b=lbBack;lbBack=function(){if(LB.open&&LB.area==='cp'&&CP.tab==='ev'&&CP.evo!=null){CP.evo=null;renderComp();return;}return _b.apply(this,arguments);};}
