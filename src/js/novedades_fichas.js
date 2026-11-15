// ==================== v305 · Novedades del compendio, ítem a ítem (recuperado en v353) ====================
// OJO: en la v320 se perdió al reescribir novedades.js (el registro de cambios). Este sistema vive aquí, aparte.
// Las funciones llevan prefijo nf para no chocar con las del registro de cambios (nfMark de novedades.js es otra cosa).
// Cada cosa nueva (torre, enemigo, reliquia, mecánica, logro conseguido…) lleva su puntito hasta que abres su ficha.
// La pestaña y la cinta del área solo se apagan cuando ya no queda ninguna por ver. «Marcar todos como vistos» limpia solo la pestaña en la que estás.
var NOVO={};try{NOVO=JSON.parse(localStorage.getItem('rt-novo'))||{};}catch(e){}
const nfSave=()=>{try{localStorage.setItem('rt-novo',JSON.stringify(NOVO));}catch(e){}};
function nfAdd(t,k){if(t==null||k==null)return;(NOVO[t]=NOVO[t]||{})[k]=1;nfSave();}
function nfSeen(t,k){if(NOVO[t]&&NOVO[t][k]){delete NOVO[t][k];if(!Object.keys(NOVO[t]).length)delete NOVO[t];nfSave();return true;}return false;}
function nfHas(t){return !!(NOVO&&NOVO[t]&&Object.keys(NOVO[t]).length);}
function nfArea(a){return a==='lg'?nfHas('lg'):['tw','hr','pc','bf','rl','en','ev','mc'].some(nfHas);}
function nfMark(act,v){if(act==='ctab')return nfHas(v);if(act==='achf')return !!(NOVO.lg&&Object.keys(NOVO.lg).some(id=>ACH[id]&&(v==='all'||(ACH[id].c||'cl')===v)));return false;}
// mecánicas: se descubren solas al ver lo que las usa; se apuntan las que pasan a verse
let MECK=null;try{MECK=JSON.parse(localStorage.getItem('rt-meck'));}catch(e){}
function mecScan(mark){if(typeof MECI==='undefined'||typeof mecOk!=='function')return;const first=!MECK;MECK=MECK||{};let ch=false;
 for(const id in MECI){if(typeof MALIAS!=='undefined'&&MALIAS[id])continue;if(!MECK[id]&&mecOk(id)){MECK[id]=1;ch=true;if(!first&&mark)nfAdd('mc',id);}}if(ch){try{localStorage.setItem('rt-meck',JSON.stringify(MECK));}catch(e){}}}
try{mecScan(false);}catch(e){}
{const _s=see;see=function(t,k){const nw=typeof SEEOK!=='undefined'&&SEEOK&&SEEN[t]&&!SEEN[t][k];const r=_s.apply(this,arguments);try{if(nw&&SEEN[t][k]){nfAdd(t,k);mecScan(true);}}catch(e){}return r;};}
{const _a=achieve;achieve=function(id){const nw=ACH[id]&&!ACHS[id];const r=_a.apply(this,arguments);try{if(nw&&ACHS[id])nfAdd('lg',id);}catch(e){}return r;};}
// al abrir una ficha, deja de ser nueva; puntito en las fichas nuevas y botón para marcar toda la pestaña
{const _c=compParts;compParts=function(){const P=_c.apply(this,arguments);try{const t=CP.tab,k=CP.sel[t];
  if(k!=null&&!(CP.prev||CP.hprev||CP.eprev)&&(!bkNarrow()||CP.pageR))nfSeen(t,k);
  const N=NOVO[t]||{};P.left=P.left.replace(/<button class="bti([^"]*)" data-a="csel" data-v="([^"]*)"/g,(m,c,v)=>N[v]?`<button class="bti${c} nov" data-a="csel" data-v="${v}"`:m);
  if(Object.keys(N).length)P.left=P.left.replace(/(<div class="bksub">[\s\S]*?<\/div>)/,`$1<button class="bknovall" data-a="nfall">✓ Marcar todos como vistos <small>(${Object.keys(N).length})</small></button>`);}catch(e){}return P;};}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-a="nfall"]');if(!b)return;e.stopPropagation();e.preventDefault();delete NOVO[CP.tab];nfSave();try{sfx('ui');}catch(er){}lbRender();},true);
