// ==================== v305 · Piezas en el compendio: variantes vistas y decorado de cada era ====================
// · V1/V2…: solo las disposiciones de solares que ya te han salido en partida (se apuntan al repartir las piezas).
// · Era: con la era 2 alcanzada, la pieza se puede ver con el decorado de la Fantástica o de la Distópica. 🎲 cambia el decorado.
let PCVS={};try{PCVS=JSON.parse(localStorage.getItem('rt-pcvs')||'{}')||{};}catch(e){PCVS={};}
const pcvSeen=n=>{const a=(PCVS[n]||[]).slice();if(!a.includes(0))a.unshift(0);return a.sort((x,y)=>x-y);};
{const _s=solarize;solarize=function(o,v,all){const L=SOLARES[o&&o.n];if(v===undefined&&L&&L.length>1){v=Math.floor(Math.random()*L.length);
  try{if(typeof S!=='undefined'&&S&&!S.tut&&!(typeof PREVIEWING!=='undefined'&&PREVIEWING)){const a=PCVS[o.n]=PCVS[o.n]||[];if(!a.includes(v)){a.push(v);localStorage.setItem('rt-pcvs',JSON.stringify(PCVS));}}}catch(e){}}
 return _s.call(this,o,v,all);};}
CP.pce=CP.pce||{};CP.pcd=CP.pcd||{};
// azar con semilla, para que el decorado no cambie cada vez que se repinta el libro
function seeded(seed,fn){let s=(seed*2654435761)>>>0||1;const R=Math.random;Math.random=()=>{s^=s<<13;s>>>=0;s^=s>>>17;s^=s<<5;s>>>=0;return (s%1e6)/1e6;};try{return fn();}finally{Math.random=R;}}
function pcDraw(cn){const i=+cn.dataset.pi,P0=PIECES[i];if(!P0)return;const v=(CP.pcv||{})[i]||0,era=CP.pce[i]||((typeof S!=='undefined'&&S&&S.era)||1),sd=CP.pcd[i]||0;
 const real=typeof S!=='undefined'?S:null;try{S=Object.assign(Object.create(null),real||{},{era});
  const o={n:P0.n,p:P0.p,b:[]};seeded(1+i*97+sd*7919+era*31,()=>{solarize(o,v,1);decorate(o);});
  const c=cn.getContext('2d');c.clearRect(0,0,cn.width,cn.height);drawPat(c,o,24,0,0,1);}finally{S=real;}}
{const _bd=bkDetail;bkDetail=function(t,id){let h=_bd.apply(this,arguments);if(t!=='pc')return h;try{const i=+id,o=PIECES[i];if(!o||!seen('pc',o.n))return h;
 const vs=pcvSeen(o.n),v=(CP.pcv||{})[i]||0;
 // v307: un botón por cada disposición de solares de la pieza (1, 2…); las que aún no te han salido, con candado y sin enseñarla
 h=h.replace(/<button class="stbtn lvbtn" data-a="cpcv"[^>]*>V\d+<\/button>/,'');
 const NV=(SOLARES[o.n]||[0]).length;
 const vb=NV>1?`<span class="pcvs"><span class="pcvl">Solares</span>${Array.from({length:NV},(_,k)=>vs.includes(k)?`<button class="bkpill pcvn${v===k?' on':''}" data-a="cpcv3" data-i="${i}" data-v="${k}" title="Disposición ${k+1} de los solares">${k+1}</button>`:`<button class="bkpill pcvn lk" disabled title="Esta disposición aún no te ha salido en partida">🔒</button>`).join('')}</span>`:'';
 const e2=typeof era2Ok==='function'&&era2Ok(),era=CP.pce[i]||((typeof S!=='undefined'&&S&&S.era)||1);
 const bar=`<div class="pcbar">${e2?[1,2].map(e=>`<button class="bkpill${era===e?' on':''}" data-a="cpce" data-i="${i}" data-v="${e}">${ERADEF[e].ic} ${ERADEF[e].n}</button>`).join(''):''}<button class="bkpill pcdado" data-a="cpcd" data-i="${i}" title="Otro decorado">🎲</button>${vb}</div>`;
 h=h.replace(/(<canvas width="168" height="168" data-pi=")/,bar+'$1');}catch(e){}return h;};}
{const _lr=lbRender;lbRender=function(){const r=_lr.apply(this,arguments);try{document.querySelectorAll('#comp canvas[data-pi]').forEach(pcDraw);}catch(e){}return r;};}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-a="cpcv2"],[data-a="cpcv3"],[data-a="cpce"],[data-a="cpcd"]');if(!b)return;e.stopPropagation();e.preventDefault();const a=b.dataset.a;
 const sc=$('comp')?$('comp').scrollTop:0;
 if(a==='cpcv2'){const i=+b.dataset.v,vs=pcvSeen(PIECES[i].n);CP.pcv=CP.pcv||{};const k=vs.indexOf(CP.pcv[i]||0);CP.pcv[i]=vs[(k+1)%vs.length];}
 else if(a==='cpcv3'){CP.pcv=CP.pcv||{};CP.pcv[+b.dataset.i]=+b.dataset.v;}
 else if(a==='cpce'){CP.pce[+b.dataset.i]=+b.dataset.v;}
 else CP.pcd[+b.dataset.i]=(CP.pcd[+b.dataset.i]||0)+1;
 renderComp();if($('comp'))$('comp').scrollTop=sc;},true);
