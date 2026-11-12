// ==================== v308 · Botón «Atrás» del libro ====================
// Como el «atrás» del navegador: el libro apunta cada página que ves (área, sección, ficha y su Nv o especialización)
// y el botón ↩ (junto a la ✕) o la tecla Retroceso te devuelven a la anterior.
const LBH={st:[],nav:0};
const lbSnap=()=>{const tab=CP.tab,sel=CP.sel?CP.sel[tab]:null;return{area:LB.area,tab,sel:sel==null?null:sel,lv:sel!=null&&CP.lv?CP.lv[sel]||null:null,op:typeof OP!=='undefined'?OP.tab:null};};
const lbSnapKey=s=>JSON.stringify(s);
function lbHistBack(){if(LBH.st.length<2)return;LBH.st.pop();const s=LBH.st[LBH.st.length-1];
 LB.area=s.area;CP.tab=s.tab;if(CP.sel&&s.sel!=null)CP.sel[s.tab]=s.sel;if(s.sel!=null&&CP.lv){if(s.lv==null)delete CP.lv[s.sel];else CP.lv[s.sel]=s.lv;}if(s.op!=null&&typeof OP!=='undefined')OP.tab=s.op;
 LBH.nav=1;try{lbRender();}finally{LBH.nav=0;}}
{const _lbo=lbOpen;lbOpen=function(){LBH.st=[];return _lbo.apply(this,arguments);};
 const _lbr=lbRender;lbRender=function(){const r=_lbr.apply(this,arguments);try{
  if(!LB.open||LB.cover)return r;const s=lbSnap(),k=lbSnapKey(s),L=LBH.st;
  if(!LBH.nav&&(!L.length||lbSnapKey(L[L.length-1])!==k)){L.push(s);if(L.length>60)L.shift();}
  const el=$('comp'),x=el&&el.querySelector('.bkx');if(x&&!el.querySelector('.bkhist')){const b=document.createElement('button');b.className='bkx bkhist';b.dataset.a='lbhist';b.innerHTML='<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M10 5L5 10l5 5M5 10h9a5 5 0 0 1 0 10h-4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';x.parentNode.insertBefore(b,x);}
  const bb=el&&el.querySelector('.bkhist');if(bb){const on=typeof kcOn==='function'&&kcOn(),cap=bb.querySelector('.kcap');if(on&&!cap)bb.insertAdjacentHTML('beforeend','<span class="kcap kesc kbk"><svg viewBox="0 0 16 11" width="13" height="9" aria-hidden="true"><path d="M5 1h9.5v9H5L1 5.5z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 3.5l4 4M12 3.5l-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span>');else if(!on&&cap)cap.remove();const ok=L.length>1;bb.disabled=!ok;bb.classList.toggle('off',!ok);bb.dataset.tip=ok?'Atrás':'';}
 }catch(e){}return r;};}
addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-a="lbhist"]');if(!b)return;e.preventDefault();e.stopPropagation();lbHistBack();},true);
addEventListener('keydown',e=>{if(e.key!=='Backspace'||!LB.open||LB.cover)return;const t=e.target;if(t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.isContentEditable))return;e.preventDefault();lbHistBack();});
