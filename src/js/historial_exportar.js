// ==================== v305 · Descargar el historial de partidas ====================
// Un botón en «Partidas» descarga todas las partidas registradas en un .json, para pasárselo al equipo y estudiar el equilibrio
// (en qué ronda se pierde, qué torres hacen el daño, qué enemigos quitan más vida…). tools/analizar_historial.js lo resume.
function hsExport(){return hsAll().then(L=>{const o={f:'towerize-historial',v:1,ver:($('ver')&&$('ver').textContent)||'',t:Date.now(),n:L.length,runs:L.sort((a,b)=>a.t0-b.t0)};
 const txt=JSON.stringify(o),d=new Date(),p=n=>String(n).padStart(2,'0'),name=`towerize-historial-${d.getFullYear()}${p(d.getMonth()+1)}${p(d.getDate())}.json`;
 try{const b=new Blob([txt],{type:'application/json'}),u=URL.createObjectURL(b),a=document.createElement('a');a.href=u;a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(u);a.remove();},500);
  toast('⬇️ Historial descargado: <b>'+L.length+'</b> partida'+(L.length===1?'':'s')+'<br><small>'+name+'</small>');}catch(e){toast('No se ha podido descargar el historial.');}
 return o;});}
{const _hp=histParts;histParts=function(){const P=_hp.apply(this,arguments);try{if((HIST.list||[]).length)P.left=P.left.replace(/(<div class="hsflt">[\s\S]*?<\/div>)/,'$1'+'<div class="hsexp"><button data-a="hsexp">⬇️ Descargar historial</button><small>Un archivo con todas tus partidas, para enviárnoslo y ayudarnos a equilibrar el juego.</small></div>');}catch(e){}return P;};}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-a="hsexp"]');if(!b)return;e.stopPropagation();hsExport();},true);
