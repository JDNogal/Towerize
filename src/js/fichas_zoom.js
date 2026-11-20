// ==================== v352 · FICHAS QUE CRECEN AL ACERCARTE (Mesa, aprobado por Nogal 15-nov) ====================
// Las fichas del mapa (construir en un solar y menú de una torre ya construida) salen pegadas a la opción que señalas, hacia fuera del anillo
// (izquierda, derecha, arriba o abajo según dónde esté); si no caben, se mueven lo justo. Crecen con el zoom de la cámara: a la distancia normal
// igual que ahora y, con la cámara pegada, hasta un 45 % más (además de lo que ya crecen con pantallas grandes). Abajo, «Ver en el compendio» (L).
const FZ={max:.45};
const fzZoom=()=>{try{return Math.max(0,Math.min(1,(CAM.z-ZINI)/(ZMAX-ZINI)));}catch(e){return 0;}};
{const _cz=cardZ;cardZ=function(c){const b=_cz.apply(this,arguments);if(document.body.classList.contains('mfs'))return b;const z=Math.min(1.9,b*(1+FZ.max*fzZoom()));c.style.transformOrigin='0 0';c.style.transform=z>1.01?`scale(${z.toFixed(3)})`:'';return z>1.01?z:1;};}
// coloca la ficha c junto a la opción it del anillo m, hacia fuera del centro del anillo
function fzPlace(c,m,it){const P=m._p;if(!P||!it)return false;const Z=cardZ(c),w=c.offsetWidth*Z,h=c.offsetHeight*Z,T0=58,g=10,op=(c.offsetParent||document.body).getBoundingClientRect(),r=it.getBoundingClientRect();
 const ix=r.left-op.left,iy=r.top-op.top,cx=ix+r.width/2,cy=iy+r.height/2,dx=cx-P.px,dy=cy-P.py;
 const right=[ix+r.width+g,cy-h/2],left=[ix-g-w,cy-h/2],up=[cx-w/2,iy-g-h],down=[cx-w/2,iy+r.height+g];
 const order=Math.abs(dx)>=Math.abs(dy)?(dx<0?[left,up,down,right]:[right,up,down,left]):(dy<0?[up,dx<0?left:right,dx<0?right:left,down]:[down,dx<0?left:right,dx<0?right:left,up]);
 const fit=([x,y])=>x>=6&&y>=T0&&x+w<=P.W-6&&y+h<=P.H-6;let [x,y]=order.find(fit)||order[0];
 // v361: la ficha no tapa la interfaz (barras y columnas) ni los botones del anillo: si el sitio de siempre pisa algo, se busca el que menos pise
 if(typeof tmObs==='function'){const ob=tmObs(op);for(const b of m.querySelectorAll('.tmb')){const q=b.getBoundingClientRect();if(q.width)ob.push([q.left-op.left-3,q.top-op.top-3,q.right-op.left+3,q.bottom-op.top+16]);}
  const cl=([a,b])=>[Math.max(6,Math.min(P.W-w-6,a)),Math.max(6,Math.min(P.H-h-6,b))],pis=([a,b])=>{let s=0;for(const q of ob){const ix=Math.min(a+w,q[2])-Math.max(a,q[0]),iy=Math.min(b+h,q[3])-Math.max(b,q[1]);if(ix>0&&iy>0)s+=ix*iy;}return s;};
  if(pis(cl([x,y]))>0){const all=order.filter(fit).concat(order);for(const[ax,ay]of order)for(let d=20;d<=300;d+=20){all.push([ax+d,ay],[ax-d,ay],[ax,ay+d],[ax,ay-d]);for(let e=20;e<=d;e+=20)all.push([ax+d,ay+e],[ax-d,ay+e],[ax+d,ay-e],[ax-d,ay-e],[ax+e,ay+d],[ax-e,ay+d],[ax+e,ay-d],[ax-e,ay-d]);}/* v361: también en diagonal, para no quedarse pisando unos píxeles */
   let best=null;for(const q of all){const k=cl(q),v=pis(k);if(!best||v<best.v)best={k,v};if(!v)break;}[x,y]=best.k;}}
 x=Math.max(6,Math.min(P.W-w-6,x));y=Math.max(T0,Math.min(P.H-h-6,y));c.style.left=x+'px';c.style.top=y+'px';return true;}
{const _p=bmCardPos;bmCardPos=function(){const c=$('bmcard'),m=$('bmenu');if(!c||!m||!m._p||!c.classList.contains('on'))return;const k=BM.arm||BM.hov,it=k&&m.querySelector(`.tmb[data-k="${k}"]`);if(!fzPlace(c,m,it))return _p.apply(this,arguments);};}
{const _p=tmCardPos;tmCardPos=function(){const c=$('tmcard'),m=$('tmenu');if(!c||!m||!m._p||!c.classList.contains('on'))return;const k=c.dataset.k,it=k&&[...m.querySelectorAll('.tmb[data-k]')].find(b=>b.dataset.k===k);if(!fzPlace(c,m,it))return _p.apply(this,arguments);};}
// ---- «Ver en el compendio» (L) en las fichas del mapa ----
KBDEF.comp='l';if(!KB.comp)KB.comp='l';
{const g0=KBL.find(x=>x[0]==='Partida');if(g0&&!g0[1].some(r=>r[0]==='comp'))g0[1].push(['comp','Ver en el compendio lo que señalas','📖']);}
const fzSeen=k=>{try{return compOk()&&seen('tw',k);}catch(e){return false;}};
const fzLink=k=>`<button class="fzlink" data-a="fzcp" data-v="${k}">📖 Ver en el compendio<kbd>${String(KB.comp||'l').toUpperCase()}</kbd></button>`;
function fzKey(){if(typeof BM!=='undefined'&&BM.s&&(BM.arm||BM.hov))return BM.arm||BM.hov;if(typeof TM!=='undefined'&&TM.t&&TM.t.type&&TW[TM.t.type])return TM.t.type;return null;}
{const _b=bmCard;bmCard=function(){const r=_b.apply(this,arguments);try{const c=$('bmcard'),k=BM.arm||BM.hov;if(c&&k&&c.classList.contains('on')&&fzSeen(k)&&!c.querySelector('.fzlink')){c.insertAdjacentHTML('beforeend',fzLink(k));c._h+='+fz';bmCardPos();}}catch(e){}return r;};}
{const _t=tmCard;tmCard=function(){const r=_t.apply(this,arguments);try{const c=$('tmcard'),k=TM.t&&TM.t.type;if(c&&k&&TW[k]&&c.classList.contains('on')&&fzSeen(k)&&!c.querySelector('.fzlink')){c.insertAdjacentHTML('beforeend',fzLink(k));c._h+='+fz';tmCardPos();}}catch(e){}return r;};}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-a="fzcp"]');if(!b)return;e.stopPropagation();e.preventDefault();try{cpGo('tw',b.dataset.v);}catch(_){}},true);
addEventListener('keydown',e=>{try{if(e.ctrlKey||e.metaKey||e.altKey)return;const t=e.target;if(t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'))return;if(typeof KBC!=='undefined'&&KBC.on)return;
 if(!kbIs('comp',e.key.toLowerCase()))return;const k=fzKey();if(k&&fzSeen(k)){e.preventDefault();e.stopPropagation();cpGo('tw',k);}}catch(_){}},true);
// al hacer zoom, las fichas abiertas se recolocan y cambian de tamaño
{const _za=zoomAt;zoomAt=function(){const r=_za.apply(this,arguments);try{if(BM.s)bmCardPos();if(TM.t)tmCardPos();}catch(e){}return r;};}
// la ficha va dentro del mapa y no puede quedar por encima del panel de la izquierda: si se pisan, ese panel se aparta
function fzUnder(){const l=$('lstack');if(!l)return;let hit=false;for(const id of ['bmcard','tmcard']){const c=$(id);if(!c||!c.classList.contains('on'))continue;const a=c.getBoundingClientRect();
 for(const e of l.children){if(!e.offsetWidth)continue;const r=e.getBoundingClientRect();if(a.left<r.right&&a.right>r.left&&a.top<r.bottom&&a.bottom>r.top)hit=true;}}
 if(l.classList.contains('fzunder')!==hit)l.classList.toggle('fzunder',hit);}
setInterval(fzUnder,120);
