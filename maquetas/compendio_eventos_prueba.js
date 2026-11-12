// prueba: lista de eventos del compendio con recorte de la imagen (EVC.pos = 'arriba' | 'abajo')
window.EVC={pos:'abajo'};
const _st=document.createElement('style');_st.textContent=`
.bktiles.evg{grid-template-columns:repeat(auto-fill,minmax(118px,1fr));gap:10px}
.bti.evt{display:flex;flex-direction:column;gap:4px;padding:5px;height:auto;align-items:stretch}
.bti.evt .evcrop{display:block;width:100%;aspect-ratio:400/230;border-radius:5px;overflow:hidden;border:2px solid #1b1712;background:#2a2018}
.bti.evt .evcrop svg{width:100%;height:auto;display:block;margin-top:-6%}
.bti.evt small{font-weight:800;font-size:12px;line-height:1.15;text-align:center;white-space:normal}
.bti.evt.un .evcrop{background:repeating-linear-gradient(45deg,#e8dcc4 0 6px,#e0d2b6 6px 12px);border-style:dashed;display:flex;align-items:center;justify-content:center;font:900 28px system-ui;color:#b09a74}.bti.evt.un .evcrop svg{display:none}
.bti.evt.on{outline:3px solid #e0262e}
.evdet .evbig{border:2px solid #1b1712;border-radius:6px;overflow:hidden;margin:4px auto 8px;max-width:78%}
.evdet .evbig svg{width:100%;height:auto;display:block}
.evdet .evtxt{font-size:14px;line-height:1.35;margin:0 0 8px}
.evdet .evol{display:flex;flex-direction:column;gap:6px}
.evdet .evoi{border:1.5px solid #b89a6a;border-radius:6px;padding:6px 8px;background:#fff8e6}
.evdet .evoi b{display:block;font-size:13.5px}
.evdet .evoi .cst{font-size:12px;color:#8a3a2a}
.evdet .evoi .res{font-size:12.5px;margin-top:2px}
.evdet .evoi.no .res{color:#8a7a60;font-style:italic}
.evdet .evoi.lk{opacity:.7}
.evdet h4{margin:10px 0 6px;font-size:14px;border-bottom:2px solid #1b1712;padding-bottom:2px}`;
document.head.appendChild(_st);
const evCrop=(id,ok)=>{const s=evImg(id,null);return `<span class="evcrop">${ok&&s?s:'?'}</span>`;};
{const _t=bkTile;bkTile=function(it,t){if(t!=='ev')return _t.apply(this,arguments);const on=CP.sel[t]===it.id;const nm=`<small>${it.ok?it.n:'???'}</small>`;
 return `<button class="bti evt${on?' on':''}${it.ok?'':' un'}" data-a="csel" data-v="${it.id}">${EVC.pos==='arriba'?nm+evCrop(it.id,it.ok):evCrop(it.id,it.ok)+nm}</button>`;};}
{const _d=bkDetail;bkDetail=function(t,id){if(t!=='ev')return _d.apply(this,arguments);const E=EVENTS[id];if(!E)return '';
 if(!seen('ev',id))return `<div class="evdet"><div class="ttl"><b>???</b></div><small>Aún no has encontrado este evento.</small></div>`;
 const ops=E.opts.map((o,i)=>{const k=memOf(id,i);
  return `<div class="evoi${k.length?'':' no'}"><b>${o.l}</b>${o.c?`<div class="cst">${o.c}</div>`:''}<div class="res">${k.length?'Obtienes: '+k.map(chip).filter(Boolean).join(' · '):'Aún no la has elegido: no sabes qué da.'}</div></div>`;}).join('');
 return `<div class="evdet"><div class="ttl"><b>${E.n}</b></div><div class="evbig">${evImg(id,null)}</div><p class="evtxt">${E.txt}</p><h4>Opciones</h4><div class="evol">${ops}</div></div>`;};}
// la rejilla de eventos usa la clase evg
{const _r=lbRender;lbRender=function(){const r=_r.apply(this,arguments);try{if(LB.area==='cp'&&CP.tab==='ev')document.querySelectorAll('#comp .bktiles').forEach(x=>x.classList.add('evg'));}catch(e){}return r;};}
