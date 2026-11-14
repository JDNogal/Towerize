// ==================== v329 · Supercampeones: rasgos que se descubren (Nogal, 14-nov) ====================
// · En la ficha de la amenaza: la lista de rasgos posibles; los que aún no has visto salen como «???» con «Todavía no has encontrado este rasgo».
// · Se descubren al ver por primera vez en el mapa un supercampeón con ese rasgo (con Niebla, cuando ya se ve) y se recuerdan entre partidas.
// · También en el compendio, Mecánicas › Supercampeones.
const SUPTR={sh:['Escudo frontal','Sus 4 primeros golpes no le hacen daño.','<path d="M12 2.5l8 3v6c0 5-3.6 8.4-8 10-4.4-1.6-8-5-8-10v-6z" fill="#ffcf4a" stroke="#1b1712" stroke-width="1.8" stroke-linejoin="round"/>'],
 fa:['Paso rápido','Camina un 30 % más rápido.','<path d="M3 8h9M2 12h11M4 16h8" stroke="#1b1712" stroke-width="2" stroke-linecap="round"/><path d="M14 6l7 6-7 6z" fill="#ffcf4a" stroke="#1b1712" stroke-width="1.8" stroke-linejoin="round"/>'],
 rg:['Regeneración','Recupera vida poco a poco, como un élite.','<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z" fill="#6fe07a" stroke="#1b1712" stroke-width="1.8" stroke-linejoin="round"/>'],
 cc:['Resistencia a control','Los aturdimientos, congelaciones y ralentizaciones le afectan mucho menos.','<rect x="3" y="8" width="8" height="8" rx="4" fill="none" stroke="#1b1712" stroke-width="2.6"/><rect x="13" y="8" width="8" height="8" rx="4" fill="none" stroke="#1b1712" stroke-width="2.6"/><rect x="3" y="8" width="8" height="8" rx="4" fill="none" stroke="#c0c8d0" stroke-width="1.3"/><rect x="13" y="8" width="8" height="8" rx="4" fill="none" stroke="#c0c8d0" stroke-width="1.3"/>']};
const supTrIc=k=>`<svg viewBox="0 0 24 24" width="1em" height="1em">${SUPTR[k][2]}</svg>`;
const supSeen=k=>!!(STO.supT&&STO.supT[k]);
function supSee(k){if(supSeen(k)||!SUPTR[k])return;(STO.supT=STO.supT||{})[k]=1;try{saveSto();}catch(e){}}
setInterval(()=>{try{if(!S||S.phase!=='wave'||S.tut||!S.enemies)return;const fog=typeof azNie==='function'&&azNie()>=2;
 for(const e of S.enemies)if(e.sup&&e.hp>0&&(!fog||e.fog))for(const k of e.sup)supSee(k);}catch(e){}},400);
function supTrList(){const n=Object.keys(SUPTR).filter(supSeen).length;
 return `<div class="suptr"><div class="suptrh">Rasgos · ${n} de ${Object.keys(SUPTR).length} descubiertos</div>`+Object.keys(SUPTR).map(k=>supSeen(k)?
  `<div class="rg on"><span class="ri">${supTrIc(k)}</span><span><b>${SUPTR[k][0]}</b><small>${SUPTR[k][1]}</small></span></div>`:
  `<div class="rg"><span class="ri q">?</span><span><b>???</b><small>Todavía no has encontrado este rasgo.</small></span></div>`).join('')+'</div>';}
// ficha de la amenaza (las dos maquetaciones: con y sin Apoyos)
if(typeof azDetC==='function'){const _dc=azDetC;azDetC=function(){const h=_dc.apply(this,arguments);try{const t=AZT.find(x=>x[0]===AZUI.sel);if(t&&t[0]==='sup'&&azUn(t))return h.replace(/<\/div>$/,supTrList()+'</div>');}catch(e){}return h;};}
{const _ap=azParts;azParts=function(){const P=_ap.apply(this,arguments);try{const t=AZT.find(x=>x[0]===AZUI.sel);if(P&&t&&t[0]==='sup'&&azUn(t)&&P.right&&P.right.includes('amzd')&&!P.right.includes('suptr')){
  P.right=P.right.replace(/(<div class="lbdet amzd">[\s\S]*)<\/div>/,(m,a)=>a+supTrList()+'</div>');P.key=(P.key||'')+'|st'+Object.keys(STO.supT||{}).join('');}
  else if(P&&P.key)P.key+='|st'+Object.keys(STO.supT||{}).join('');}catch(e){}return P;};}
// compendio › Mecánicas › Supercampeones (solo si ya tienes la amenaza abierta)
MECG.push(['Supercampeones',Object.keys(SUPTR).map(k=>['st_'+k,'???','⭐'])]);
{const _bi=bkItems;bkItems=function(t){const L=_bi.apply(this,arguments);if(t!=='mc')return L;try{const sup=AZT.find(x=>x[0]==='sup');const show=sup&&azUn(sup);
  const out=[];let skip=false;for(const it of L){if(it.sec){skip=it.sec==='Supercampeones'&&!show;if(!skip)out.push(it);continue;}if(skip)continue;
   if(it.id&&it.id.startsWith('st_')){const k=it.id.slice(3),ok=supSeen(k);out.push(Object.assign({},it,{n:ok?SUPTR[k][0]:'???',ok,ic:`<span class="supic">${supTrIc(k)}</span>`}));}else out.push(it);}
  return out;}catch(e){return L;}};}
{const _k=kwHtml0;kwHtml0=function(id,src){if(id&&id.startsWith&&id.startsWith('st_')&&SUPTR[id.slice(3)]){const k=id.slice(3);return supSeen(k)?`<b>${SUPTR[k][0]}</b><small>Rasgo de supercampeón (amenaza Supercampeones). ${SUPTR[k][1]}</small>`:'<b>???</b><small>Todavía no has encontrado este rasgo.</small>';}return _k.apply(this,arguments);};}
