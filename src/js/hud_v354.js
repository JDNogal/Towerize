// v354 · interfaz de PC (Nogal 16-nov): arriba, en fila y a la misma altura, ☰, F3, X y los FPS (en pergamino: no se pulsan);
// «Reintentar» sale de la fila y va abajo en el centro (los avisos de la partida suben encima). En móvil no cambia nada.
function hud4On(){const B=document.body.classList;return B.contains('dsk')&&!B.contains('mfs');}
function rtybEl(){let el=$('rtyb');if(!el){el=document.createElement('div');el.id='rtyb';document.body.appendChild(el);el.addEventListener('click',act);}return el;}
function hudRow(){const pc=hud4On(),B=document.body.classList;B.toggle('hud4',pc);const el=rtybEl();
 if(!pc||!S){el.classList.remove('on');B.remove('rtyon');return;}
 const m=$('mtl'),old=m&&m.querySelector('[data-a="retry"]');if(old)old.remove();
 const on=S.phase==='wave'&&!S.tut&&!PREVIEWING;B.toggle('rtyon',on);el.classList.toggle('on',on);if(!on){el.innerHTML='';return;}
 const rcOk=S.snap&&(S.rc||0)>0;
 el.innerHTML=`<button data-a="retry" class="rtyp${S.rask?' warn':''}"${rcOk?'':' disabled'} title="${S.rask?'Pulsa otra vez para reintentar la oleada (gasta 1 reintento)':'Reintentar la oleada desde el principio'}"><svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 8a5 5 0 1 1-1.6-3.7"/><path d="M12.6 1.8v3.6H9"/></svg><span>${S.rask?'Pulsa otra vez':'Reintentar'}</span><b>${S.rc||0}</b></button>`;}
// FPS (y el aviso de amenazas, si lo hay) detrás del último botón de la fila
function hudPos(){if(!hud4On())return;const bs=[...document.querySelectorAll('#mtl>button')].filter(b=>b.offsetWidth);if(!bs.length)return;
 let x=Math.max(...bs.map(b=>b.getBoundingClientRect().right))+8;const y=bs[0].getBoundingClientRect().top,rs=document.documentElement.style;
 const ch=$('amzchip');if(ch&&ch.style.display!=='none'&&ch.offsetWidth){const z=parseFloat(getComputedStyle(ch).zoom)||1;rs.setProperty('--amzx',x/z+'px');rs.setProperty('--amzy',(y+(bs[0].offsetHeight*z-ch.offsetHeight*z)/2)/z+'px');x+=ch.getBoundingClientRect().width+8;}
 const fe=$('fps');if(fe){const z=parseFloat(getComputedStyle(fe).zoom)||1;rs.setProperty('--fpsx',x/z+'px');rs.setProperty('--fpsy',y/z+'px');}}
{const _ui=ui;ui=function(){const r=_ui.apply(this,arguments);try{hudRow();hudPos();}catch(e){}return r;};}
setInterval(()=>{try{hudPos();}catch(e){}},250);
// ---- v354 · columna izquierda de PC: medidor de daño (DPS de la ronda), «En el mapa» y «Fijados»; cada tarjeta se pliega como un cajón ----
OPTS.splice(OPTS.findIndex(o=>o.key==='emap')+1,0,{tab:'gf',type:'toggle',key:'dps',def:true,label:'Medidor de daño',desc:'Panel con el daño por segundo de cada torre en la ronda actual: una pestaña con las mejores y una por cada tipo de torre (con su número también sobre el mapa). Pasa el ratón por una fila para ver de qué torre se trata.'});
const DPS={tab:'all',more:false,hl:null,sg:'',wt:0,ph:null};
let DRW={};try{DRW=JSON.parse(localStorage.getItem('rt-drw'))||{};}catch(e){}
const drwSave=()=>{try{localStorage.setItem('rt-drw',JSON.stringify(DRW));}catch(e){}};
const DIC={dps:'<svg viewBox="0 0 16 16" width="14" height="14"><rect x="1" y="3" width="10" height="3" rx="1.5" fill="#f0c060"/><rect x="1" y="7" width="14" height="3" rx="1.5" fill="#f0c060"/><rect x="1" y="11" width="6" height="3" rx="1.5" fill="#f0c060"/></svg>',
 emap:'<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="#f0c060" stroke-width="1.8" stroke-linecap="round"><path d="M3 13 13 3M10 3h3v3M13 13 3 3M3 6V3h3"/></svg>',
 fij:'<svg viewBox="0 0 16 16" width="14" height="14"><path d="M6 1.5h4l-.6 4 2.6 2.5H4l2.6-2.5z" fill="#e0533a" stroke="#5a1a0e" stroke-width=".8"/><path d="M8 8v6.5" stroke="#ddd" stroke-width="1.4" stroke-linecap="round"/></svg>'};
const drwBtn=k=>`<span class="cl" data-drw="${k}" title="Plegar">‹</span>`;
const drwTab=k=>`<button class="drt" data-drw="${k}" title="Desplegar">${DIC[k]}<i>›</i></button>`;
function dpsMob(){return document.body.classList.contains('mfs');}
function dpsOn(){return (hud4On()||dpsMob())&&S&&OPT.dps!==false&&!S.tut&&(S.phase==='wave'||S.phase==='build')&&!PREVIEWING&&!document.body.classList.contains('inmenu');}
function dpsData(){const out=[];let tot=0;const wt=Math.max(1,DPS.wt);
 for(const t of S.list){if(t.summ||t.hero||t.sold)continue;const d=ftD(t),dm=d.d0==null?0:Math.max(0,(t.dmgT||0)-d.d0);tot+=dm;out.push({t,dm,v:dm/wt});}
 return {rows:out.sort((a,b)=>b.dm-a.dm),tot};}
const dpsFmt=v=>v>=9950?(v/1000).toFixed(v>=99500?0:1).replace('.',',')+' k':String(Math.round(v));
function dpsTick(){let el=$('dpsc');const on=dpsOn();
 dpsMBtn(on);const mob=dpsMob();document.body.classList.toggle('dpsmo',on&&mob&&DPS.mopen);
 if(!on||(mob&&!DPS.mopen)){if(el)el.classList.remove('on');dpsBadges(null);return;}
 if(!el){el=document.createElement('div');el.id='dpsc';el.className='lcard';
  el.addEventListener('click',e=>{const tb=e.target.closest('[data-dtab]');if(tb){DPS.tab=tb.dataset.dtab;DPS.more=false;DPS.sg='';dpsTick();return;}if(e.target.closest('.dmore')){DPS.more=!DPS.more;DPS.sg='';dpsTick();}});
  el.addEventListener('mouseover',e=>{const r=e.target.closest('.dr');DPS.hl=r?DPS.rowT[+r.dataset.i]:null;});el.addEventListener('mouseleave',()=>{DPS.hl=null;});}
 if(mob){if(el.parentNode!==document.body)document.body.appendChild(el);}else{const st=lstack();if(el.parentNode!==st||st.firstElementChild!==el)st.prepend(el);}el.classList.toggle('mob',mob);el.classList.add('on');
 if(S.phase==='wave')DPS.wt=S.wt||0;
 const {rows,tot}=dpsData(),types=[];for(const r of rows){if(!types.includes(r.t.type))types.push(r.t.type);}
 if(DPS.tab!=='all'&&!types.includes(DPS.tab))DPS.tab='all';
 let list=DPS.tab==='all'?rows:rows.filter(r=>r.t.type===DPS.tab);const n=list.length,cut=DPS.tab==='all'&&!DPS.more?4:99;list=list.slice(0,cut);DPS.rowT=list.map(r=>r.t);
 const mx=Math.max(1,...list.map(r=>r.v)),fold=!mob&&!!DRW.dps,ttl=DPS.tab==='all'?'Todas':(TW[DPS.tab]?TW[DPS.tab].n:'');
 const tabIc=k=>{const t=rows.find(r=>r.t.type===k).t;return icOf(tinfo(t));};
 const h=fold?drwTab('dps'):`<div class="dtabs${types.length+1>5?' many':''}"><button class="dtb${DPS.tab==='all'?' on':''}" data-dtab="all" data-n="Todas" title="Todas las torres">Σ</button>${types.map(k=>`<button class="dtb${DPS.tab===k?' on':''}" data-dtab="${k}" data-n="${TW[k]?TW[k].n:k}" title="${TW[k]?TW[k].n:k}">${tabIc(k)}</button>`).join('')}</div>`+
  `<div class="lh">${DIC.dps} DPS · ${ttl}${mob?'':drwBtn('dps')}</div>`+
  (list.length?'<div class="drs">'+list.map((r,i)=>`<div class="dr" data-i="${i}"><i class="dic">${icOf(tinfo(r.t))}</i><span class="dn">${DPS.tab==='all'?'':'#'+(i+1)}</span><span class="db"><i style="width:${Math.max(3,r.v/mx*100).toFixed(1)}%"></i></span><b>${dpsFmt(r.v)}</b><small>${tot>0?Math.round(r.dm/tot*100):0}%</small></div>`).join('')+'</div>':'<div class="dempty">Aún no hay daño en esta ronda.</div>')+
  (DPS.tab==='all'&&n>4?`<button class="dmore">${DPS.more?'▴ ver menos':'▾ ver las '+n}</button>`:'');
 if(h!==DPS.sg){DPS.sg=h;el.innerHTML=h;}el.classList.toggle('drwF',fold);
 dpsBadges(DPS.tab!=='all'&&!fold?rows.filter(r=>r.t.type===DPS.tab).map(r=>r.t):null);}
// números #1, #2… sobre las torres del tipo abierto, y la línea a la torre de la fila señalada
function scrOf(t){const r=cv.getBoundingClientRect(),k=sc();return [r.left+(t.x*CS-CAM.x)*k*r.width/VIEW,r.top+(t.y*CS-CAM.y)*k*r.height/VH,CS*K*k*r.width/VIEW];}
let DPSB=null;function dpsBadges(ts){DPSB=ts;let c=$('dpsbd');if(!ts||!ts.length){if(c)c.innerHTML='';return;}if(!c){c=document.createElement('div');c.id='dpsbd';document.body.appendChild(c);}
 if(c.children.length!==ts.length)c.innerHTML=ts.map((t,i)=>`<b>#${i+1}</b>`).join('');}
function dpsFrame(){try{const c=$('dpsbd');if(c&&DPSB)DPSB.forEach((t,i)=>{const b=c.children[i];if(!b)return;const [x,y,w]=scrOf(t);b.style.left=(x+w*.32)+'px';b.style.top=(y-w*.62)+'px';});
 let sv=$('dpsln');const t=DPS.hl,row=t&&$('dpsc')&&$('dpsc').querySelector('.dr:hover');
 if(t&&row&&S&&S.list.includes(t)){if(!sv){sv=document.createElementNS('http://www.w3.org/2000/svg','svg');sv.id='dpsln';document.body.appendChild(sv);}
  const a=row.getBoundingClientRect(),[x,y,w]=scrOf(t),x0=a.right+4,y0=a.top+a.height/2,mx=(x0+x)/2;
  sv.innerHTML=`<path d="M${x0} ${y0} C${mx} ${y0} ${mx} ${y} ${x} ${y}" fill="none" stroke="#f0c060" stroke-width="2.5" stroke-dasharray="6 5" stroke-linecap="round" opacity=".95"/><circle cx="${x}" cy="${y}" r="${Math.max(12,w*.55)}" fill="none" stroke="#f0c060" stroke-width="3"/>`;sv.style.display='block';}
 else if(sv)sv.style.display='none';}catch(e){}requestAnimationFrame(dpsFrame);}
requestAnimationFrame(dpsFrame);setInterval(()=>{try{dpsTick();}catch(e){}},250);
// «En el mapa»: su cajón
{const _em=emapTick;emapTick=function(raw){_em(raw);const el=$('emap');if(!el)return;const pc=hud4On(),f=pc&&!!DRW.emap;el.classList.toggle('drwF',f);
 if(f){if(!el.querySelector('.drt')){el.innerHTML=drwTab('emap');EMAP.sg='';}return;}if(el.querySelector('.drt'))el.innerHTML='';
 if(pc){const h=el.querySelector('.emh');if(h&&!h.querySelector('.cl'))h.insertAdjacentHTML('beforeend',drwBtn('emap'));}};}
// «Fijados»: una sola tarjeta de cuero al final de la columna; la chincheta quita el logro y, al pulsarlo, se despliega su descripción y progreso (de uno en uno)
const FIJ={open:null};
{const _pb=pinbarTick;pinbarTick=function(){_pb();const el=$('pinbar');if(!el)return;const pc=hud4On();el.classList.toggle('pc4',pc);if(!pc){el.dataset.mine='';return;}
 const st=lstack();if(el.parentNode!==st||st.lastElementChild!==el)st.appendChild(el);el.style.left=el.style.top='';
 if(!el._fij){el._fij=1;el.addEventListener('click',e=>{const u=e.target.closest('[data-unpin]');if(u){e.stopPropagation();e.preventDefault();PINS=PINS.filter(x=>x!==u.dataset.unpin);savePins();el.dataset.mine='';pinbarTick();return;}
   const g=e.target.closest('[data-lgo]');if(g){e.stopPropagation();cpGo('lg',g.dataset.lgo);return;}
   const p=e.target.closest('[data-pp]');if(p){e.stopPropagation();FIJ.open=FIJ.open===p.dataset.pp?null:p.dataset.pp;el.dataset.mine='';pinbarTick();}},true);}
 const ids=PINS.filter(id=>ACH[id]&&!ACHS[id]),fold=!!DRW.fij;
 const row=id=>{const A=ACH[id],M=APM[id],sec=achSec(id);let v=null,mx=null;try{if(M){mx=M.max;v=M.cur?M.cur():M.best?Math.max((S.gbest||{})[id]||0,0):null;}}catch(e){}const op=FIJ.open===id;
  return `<div class="pr${op?' op':''}"><div class="pt" data-pp="${id}"><button class="unp" data-unpin="${id}" title="Quitar de fijados">${DIC.fij}</button><b>${sec?'???':A.n}</b><i>${op?'▴':'▾'}</i></div>${op?`<div class="pd">${sec?'Descúbrelo jugando.':A.d}${v!=null&&mx?`<span class="pnb"><i style="width:${Math.min(100,v/mx*100)}%"></i></span><small>${Math.min(mx,v)}/${mx}</small>`:''}<button class="lgo" data-lgo="${id}">Ver en Logros</button></div>`:''}</div>`;};
 const h=fold?drwTab('fij'):`<div class="lh">Fijados${drwBtn('fij')}</div>${ids.map(row).join('')}`;
 if(el.dataset.mine!==h||el.querySelector('.pbt')){el.dataset.mine=h;el.innerHTML=h;}el.classList.toggle('drwF',fold);};}
// plegar / desplegar
document.addEventListener('click',e=>{const d=e.target.closest&&e.target.closest('#lstack [data-drw]');if(!d)return;e.stopPropagation();const k=d.dataset.drw;DRW[k]=!DRW[k];drwSave();DPS.sg='';EMAP.sg='';const p=$('pinbar');if(p)p.dataset.mine='';
 const card=d.closest('#lstack>*');if(card){card.classList.add('drwA');setTimeout(()=>card.classList.remove('drwA'),320);}try{dpsTick();emapTick(1);pinbarTick();}catch(er){}},true);
// ---- v354 · barra de arriba: iconos dibujados para el tiempo real y el de combate (antes emojis) y todos con el mismo centro y tamaño ----
const HUDT={clock:'<svg class="hudi" viewBox="0 0 48 48"><g stroke="#1b1712" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"><circle cx="24" cy="25" r="16" fill="#fbf1d8"/><path d="M24 15v10l7 5" fill="none" stroke="#3a2a1a" stroke-width="3.2"/><path d="M20 6h8M24 6v3" stroke="#f3e3c0" stroke-width="3.4"/><circle cx="24" cy="25" r="2" fill="#e8ac42" stroke-width="1.2"/></g></svg>',
 cbt:'<svg class="hudi" viewBox="0 0 48 48"><g stroke="#1b1712" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"><path d="M9 7l4 0 19 19-4 4L9 11z" fill="#dfe6f0"/><path d="M39 7h-4L16 26l4 4L39 11z" fill="#dfe6f0"/><path d="M12 30l6 6M36 30l-6 6" stroke="#e8ac42" stroke-width="4.4"/><path d="M8 40l5-5M40 40l-5-5" stroke="#8a5a2a" stroke-width="4.4"/></g></svg>'};
// cada dibujo ocupa distinto dentro de su caja de 48: se recorta a su contenido para que todos tengan el mismo centro visual y el mismo tamaño
const HUDVB=new Map();
function hudNorm(){for(const sv of document.querySelectorAll('#stats svg')){if(sv.dataset.nv)continue;
 /* el oro es un montón que crece con lo que tienes: no se reescala, solo se centra el montón más alto */if(sv.closest('#sg')){sv.setAttribute('viewBox','4 9 40 40');sv.dataset.nv=1;continue;}
 const k=sv.innerHTML;let vb=HUDVB.get(k);
 if(!vb){try{const b=sv.getBBox();if(!(b.width>0))continue;const s=Math.max(b.width,b.height)+3,cx=b.x+b.width/2,cy=b.y+b.height/2;vb=`${(cx-s/2).toFixed(1)} ${(cy-s/2).toFixed(1)} ${s.toFixed(1)} ${s.toFixed(1)}`;HUDVB.set(k,vb);}catch(e){continue;}}
 sv.setAttribute('viewBox',vb);sv.dataset.nv=1;}}
setInterval(()=>{try{hudNorm();}catch(e){}},300);

// ---- móvil: botón del medidor a la derecha de ☰ (mismo tamaño); el panel se abre a la altura de «Reintentar» con las pestañas colgando por abajo ----
function dpsMBtn(on){let b=$('dpsmb');const show=on&&dpsMob();if(!show){if(b)b.classList.remove('on');return;}
 if(!b){b=document.createElement('button');b.id='dpsmb';b.title='Medidor de daño';b.innerHTML=DIC.dps;document.body.appendChild(b);b.addEventListener('click',e=>{e.stopPropagation();DPS.mopen=!DPS.mopen;DPS.sg='';dpsTick();});}
 b.classList.add('on');b.classList.toggle('act',!!DPS.mopen);
 const m=document.querySelector('#mtl [data-a="pause"]');if(m){const r=m.getBoundingClientRect(),rs=document.documentElement.style;rs.setProperty('--dmbx',(r.right+6)+'px');rs.setProperty('--dmby',r.top+'px');rs.setProperty('--dmbs',r.width+'px');
  const rt=document.querySelector('#mtl [data-a="retry"]');if(rt)rs.setProperty('--dmpy',rt.getBoundingClientRect().top+'px');rs.setProperty('--fpsmx',(r.right+12+r.width)+'px');}}
// con más de 5 pestañas se montan: mantén pulsado y desliza; la de debajo del dedo crece con su nombre y al soltar se abre
{let drag=null;document.addEventListener('pointerdown',e=>{const t=e.target.closest&&e.target.closest('#dpsc.mob .dtabs.many');if(!t)return;drag=t;e.preventDefault();mv(e);},true);
 const mv=e=>{if(!drag)return;const el=document.elementFromPoint(e.clientX,e.clientY),b=el&&el.closest('.dtb');drag.querySelectorAll('.dtb').forEach(x=>x.classList.toggle('pk',x===b));};
 document.addEventListener('pointermove',mv,true);
 document.addEventListener('pointerup',e=>{if(!drag)return;const b=drag.querySelector('.dtb.pk');drag.querySelectorAll('.dtb').forEach(x=>x.classList.remove('pk'));drag=null;if(b){DPS.tab=b.dataset.dtab;DPS.more=false;DPS.sg='';dpsTick();}},true);}
