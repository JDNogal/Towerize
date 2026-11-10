// ==================== v305 · Elegir enemigo en las vistas previas ====================
// La lista de enemigos de las vistas previas (torre y héroe) va dentro de una tarjeta con su propio scroll, para no perder de vista
// la previsualización, y con filtros arriba: era (si ya has visto las dos) y tipo (normales, élites, jefes, de evento).
CP.pvf=CP.pvf||{era:'',ty:''};
const pvTy=k=>{const E=ET[k]||{};if(typeof isBoss==='function'&&isBoss({t:k})||E.story||k==='gen'||k==='porter')return 'b';if(E.evn)return 'v';if(E.el)return 'e';return 'n';};
function pvFiltered(btn){const f=CP.pvf,k=btn.dataset.v;if(!ET[k])return true;return (!f.era||String(ET[k].era||1)===f.era)&&(!f.ty||pvTy(k)===f.ty);}
function pvApply(root){const box=(root||document).querySelector('.bkpven');if(!box)return;
 for(const b of box.querySelectorAll('.bkpill'))b.style.display=pvFiltered(b)||b.classList.contains('on')?'':'none';
 for(const b of box.parentElement.querySelectorAll('[data-a="pvenf"]'))b.classList.toggle('on',(CP.pvf[b.dataset.f]||'')===b.dataset.v);}
{const _bp=bkPreview;bkPreview=function(){const P=_bp.apply(this,arguments);try{
 const fix=h=>{if(typeof h!=='string')return h;
  return h.replace(/<div class="bkpvr"><b>Enemigo<\/b><div>([\s\S]*?)<\/div><\/div>(?=<div class="bkpvr">)/,(m,inner)=>{
   const es=Object.keys(ET).filter(e=>seen('en',e)),eras=new Set(es.map(e=>ET[e].era||1)),tys=new Set(es.map(pvTy));
   const pill=(f,v,l)=>`<button class="bkpill${(CP.pvf[f]||'')===v?' on':''}" data-a="pvenf" data-f="${f}" data-v="${v}">${l}</button>`;
   let fl='';if(eras.size>1&&typeof era2Ok==='function'&&era2Ok())fl+=`<div class="pvfr">${pill('era','','Todas')}${pill('era','1',ERADEF[1].ic+' '+ERADEF[1].n)}${pill('era','2',ERADEF[2].ic+' '+ERADEF[2].n)}</div>`;
   const T=[['n','Normales'],['e','Élites'],['b','Jefes'],['v','De evento']].filter(([v])=>tys.has(v));if(T.length>1)fl+=`<div class="pvfr">${pill('ty','','Todos')}${T.map(([v,l])=>pill('ty',v,l)).join('')}</div>`;
   return `<div class="bkpvr"><b>Enemigo</b>${fl}<div class="bkpven">${inner}</div></div>`;});};
 if(typeof P==='string')return fix(P);if(P&&typeof P==='object'){for(const k in P)if(typeof P[k]==='string')P[k]=fix(P[k]);}
 }catch(e){}return P;};}
// tras pintar el libro: aplicar el filtro y dejar a la vista el enemigo elegido
{const _rc=lbRender;lbRender=function(){const r=_rc.apply(this,arguments);try{const box=document.querySelector('#comp .bkpven');if(box){pvApply(document.getElementById('comp'));const on=box.querySelector('.bkpill.on');if(on)box.scrollTop=Math.max(0,on.offsetTop-box.offsetTop-box.clientHeight/2+on.offsetHeight/2);}}catch(e){}return r;};}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-a="pvenf"]');if(!b)return;e.stopPropagation();e.preventDefault();CP.pvf[b.dataset.f]=b.dataset.v;pvApply(document.getElementById('comp'));},true);
