// ==================== v305 · Novedades del compendio, ítem a ítem ====================
// Cada cosa nueva (torre, enemigo, reliquia, mecánica, logro conseguido…) lleva su puntito hasta que abres su ficha.
// La pestaña y la cinta del área solo se apagan cuando ya no queda ninguna por ver. «Marcar todos como vistos» limpia solo la pestaña en la que estás.
var NOVO={};try{NOVO=JSON.parse(localStorage.getItem('rt-novo'))||{};}catch(e){}
const novSave=()=>{try{localStorage.setItem('rt-novo',JSON.stringify(NOVO));}catch(e){}};
function novAdd(t,k){if(t==null||k==null)return;(NOVO[t]=NOVO[t]||{})[k]=1;novSave();}
function novSeen(t,k){if(NOVO[t]&&NOVO[t][k]){delete NOVO[t][k];if(!Object.keys(NOVO[t]).length)delete NOVO[t];novSave();return true;}return false;}
function novHas(t){return !!(NOVO&&NOVO[t]&&Object.keys(NOVO[t]).length);}
function novArea(a){return a==='lg'?novHas('lg'):['tw','hr','pc','bf','rl','en','ev','mc'].some(novHas);}
function novMark(act,v){if(act==='ctab')return novHas(v);if(act==='achf')return !!(NOVO.lg&&Object.keys(NOVO.lg).some(id=>ACH[id]&&(v==='all'||(ACH[id].c||'cl')===v)));return false;}
// mecánicas: se descubren solas al ver lo que las usa; se apuntan las que pasan a verse
let MECK=null;try{MECK=JSON.parse(localStorage.getItem('rt-meck'));}catch(e){}
function mecScan(mark){if(typeof MECI==='undefined'||typeof mecOk!=='function')return;const first=!MECK;MECK=MECK||{};let ch=false;
 for(const id in MECI){if(typeof MALIAS!=='undefined'&&MALIAS[id])continue;if(!MECK[id]&&mecOk(id)){MECK[id]=1;ch=true;if(!first&&mark)novAdd('mc',id);}}if(ch){try{localStorage.setItem('rt-meck',JSON.stringify(MECK));}catch(e){}}}
try{mecScan(false);}catch(e){}
{const _s=see;see=function(t,k){const nw=typeof SEEOK!=='undefined'&&SEEOK&&SEEN[t]&&!SEEN[t][k];const r=_s.apply(this,arguments);try{if(nw&&SEEN[t][k]){novAdd(t,k);mecScan(true);}}catch(e){}return r;};}
{const _a=achieve;achieve=function(id){const nw=ACH[id]&&!ACHS[id];const r=_a.apply(this,arguments);try{if(nw&&ACHS[id])novAdd('lg',id);}catch(e){}return r;};}
// al abrir una ficha, deja de ser nueva; puntito en las fichas nuevas y botón para marcar toda la pestaña
{const _c=compParts;compParts=function(){const P=_c.apply(this,arguments);try{const t=CP.tab,k=CP.sel[t];
  if(k!=null&&!(CP.prev||CP.hprev||CP.eprev)&&(!bkNarrow()||CP.pageR))novSeen(t,k);
  const N=NOVO[t]||{};P.left=P.left.replace(/<button class="bti([^"]*)" data-a="csel" data-v="([^"]*)"/g,(m,c,v)=>N[v]?`<button class="bti${c} nov" data-a="csel" data-v="${v}"`:m);
  if(Object.keys(N).length)P.left=P.left.replace(/(<div class="bksub">[\s\S]*?<\/div>)/,`$1<button class="bknovall" data-a="novall">✓ Marcar todos como vistos <small>(${Object.keys(N).length})</small></button>`);}catch(e){}return P;};}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-a="novall"]');if(!b)return;e.stopPropagation();e.preventDefault();delete NOVO[CP.tab];novSave();try{sfx('ui');}catch(er){}lbRender();},true);
