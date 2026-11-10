// ==================== v305 · Filtro por era en el compendio ====================
// Las secciones ya no se parten por era («Guerreros · Distópica», «Torres de la Era Distópica»…): cada familia es una sola
// y se filtra por era con un filtro más. El filtro solo sale si ya has visto cosas de las dos eras (sin spoilers).
// familias de enemigos: «X · Distópica» se une a «X»
{const M=[];for(const [n,l] of EFAM){const base=n.replace(/ · Distópica$/,'');const f=M.find(x=>x[0]===base);if(f)f[1].push(...l.filter(k=>!f[1].includes(k)));else M.push([base,l.slice()]);}EFAM.splice(0,EFAM.length,...M);}
const ERAF_T=['tw','en','hr','rl','ev'];
function eraOfItem(t,id){try{if(t==='tw')return TW[id]?TW[id].era||1:0;if(t==='en')return ET[id]?ET[id].era||1:0;if(t==='hr')return HEROES[id]?HEROES[id].era||1:0;
 if(t==='rl'){const r=RELIC[id];return r?r.era||1:0;}if(t==='ev')return EVENTS[id]?EVENTS[id].era||1:0;}catch(e){}return 0;}
// lo que sale en la lista de cada era (con la era 2 alcanzada sus casillas ya se ven en silueta, así que el filtro no destripa nada)
function eraSeen(t){const has={};const L=_bkItemsRaw(t);for(const it of L){if(it.id==null||it.hid)continue;const e=eraOfItem(t,it.id);if(e)has[e]=1;}return has;}
let _bkItemsRaw=null;
{const _bi=bkItems;_bkItemsRaw=_bi;bkItems=function(t){let L=_bi.apply(this,arguments);if(!ERAF_T.includes(t))return L;
 // torres: una sola sección (más la de evento)
 if(t==='tw'){L=L.filter(it=>!(it.sec==='Torres de la Era Distópica'));for(const it of L)if(it.sec==='Torres de la Era Fantástica'||it.sec==='Torres normales')it.sec='Torres';}
 const v=CP.flt&&CP.flt.era;if(!v||!(typeof era2Ok==='function'&&era2Ok()))return L;
 const out=L.filter(it=>it.sec!=null||it.id==null||eraOfItem(t,it.id)===+v||!eraOfItem(t,it.id));
 // quitar secciones que se han quedado vacías
 return out.filter((it,i)=>it.sec==null||(i+1<out.length&&out[i+1].sec==null));};}
{const _bf=bkFilters;bkFilters=function(t){let h=_bf.apply(this,arguments);if(!ERAF_T.includes(t)||!(typeof era2Ok==='function'&&era2Ok()))return h;
 CP.flt=CP.flt||{};const has=eraSeen(t);if(!(has[1]&&has[2])){if(CP.flt.era)CP.flt.era='';return h;}
 const row=`<div class="bkfr"><span class="bkfl">Era:</span><button class="${CP.flt.era?'':'on'}" data-a="cflt" data-f="era" data-v="">Todas</button>`+[['1',ERADEF[1]],['2',ERADEF[2]]].map(([v,E])=>`<button class="${CP.flt.era===v?'on':''}" data-a="cflt" data-f="era" data-v="${v}">${E.ic} ${E.n}</button>`).join('')+'</div>';
 return h&&h.startsWith('<div class="bkflt">')?h.replace('<div class="bkflt">','<div class="bkflt">'+row):'<div class="bkflt">'+row+'</div>'+h;};}
