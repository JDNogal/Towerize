// ==================== v334 · Pergamino nuevo (elegir pieza y nueva torre, Era Fantástica) ====================
// Aprobado en la Mesa (probador pg10, 14-nov): llega cerrado con una cinta de tela roja y un lacre con corona; el lacre se parte,
// la cinta se afloja y resbala por los rodillos; el pergamino se abre (más suave que antes), las cartas se dibujan a pluma una a una,
// al pasar el ratón sale un destello de vez en cuando y al elegir cae un lacre con el emblema de lo que eliges (pieza o torre),
// con un par de gotas de cera antes y salpicaduras al caer. En la Era Distópica sigue el dron.
const PGN={round:-1,busy:false};
const pgE2=()=>{try{return document.documentElement.dataset.skin==='holo';}catch(e){return false;}};
const pgRM=()=>{try{return matchMedia('(prefers-reduced-motion: reduce)').matches;}catch(e){return false;}};
const pgcl=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),pgseg=(t,a,b)=>pgcl((t-a)/(b-a)),pgeo=x=>1-Math.pow(1-x,3);
const PGDEFS='<defs><radialGradient id="pgwax" cx=".4" cy=".35"><stop offset="0" stop-color="#e2463a"/><stop offset=".7" stop-color="#9e1c16"/><stop offset="1" stop-color="#6a0e0a"/></radialGradient><linearGradient id="pgrib" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c43a2a"/><stop offset=".5" stop-color="#9a1e16"/><stop offset="1" stop-color="#6a100c"/></linearGradient></defs>';
const PGWAX='<path d="M0 -26 Q10 -27 16 -20 Q27 -15 25 -4 Q30 7 21 15 Q17 26 5 25 Q-5 31 -14 22 Q-26 20 -24 7 Q-31 -4 -21 -12 Q-16 -25 0 -26Z" fill="url(#pgwax)" stroke="#5a0a06" stroke-width="1.2"/><circle r="16" fill="none" stroke="#5a0a06" stroke-width="1.5" opacity=".55"/>';
const PGEMB={corona:'<path d="M-10 6l-2-12 6 5 6-9 6 9 6-5-2 12z" fill="#7a120c" stroke="#4a0806" stroke-width="1" stroke-linejoin="round"/><path d="M-10 9h20" stroke="#4a0806" stroke-width="2"/>',
 pieza:'<rect x="-9" y="-9" width="18" height="18" fill="none" stroke="#5a0a06" stroke-width="1.8"/><path d="M-9 0H9M0 -9V9" stroke="#7a120c" stroke-width="4"/>',
 torre:'<path d="M-8 9v-14h4v4h3v-4h3v4h3v-4h4v14z" fill="#7a120c" stroke="#4a0806" stroke-width="1"/>'};
const pgWaxB=e=>PGWAX+PGEMB[e];
// cinta + lacre del pergamino cerrado, centrados en (0,0); k: 0 entero → 1 suelto y caído («resbala»)
function pgClosed(k,half){const H=22,yT=-H/2,yB=H/2,X0=-half,X1=half,f=pgeo(k),g=k*k*130;
 const tail=(d,rot,dy)=>`<g transform="translate(0 ${dy}) rotate(${rot} ${d*6} 6)"><path d="M${d*2} 6L${d*14} 6L${d*24} 62L${d*16} 54L${d*10} 66Z" fill="url(#pgrib)" stroke="#4a0806" stroke-width="1.2"/></g>`;
 const band=(wave,sx,dy,o)=>{const p=`M${X0} ${yT+2}Q${X0/2} ${yT-8+wave} 0 ${yT+wave*.5}Q${X1/2} ${yT-8-wave} ${X1} ${yT+2}L${X1} ${yB+2}Q${X1/2} ${yB-8-wave} 0 ${yB+wave*.5}Q${X0/2} ${yB-8+wave} ${X0} ${yB+2}Z`;
  return `<g opacity="${o}" transform="translate(0 ${dy}) scale(${sx} 1)"><path d="${p}" fill="url(#pgrib)" stroke="#4a0806" stroke-width="1.2"/><path d="M${X0} ${yT+5}Q${X0/2} ${yT-5+wave} 0 ${yT+3+wave*.5}Q${X1/2} ${yT-5-wave} ${X1} ${yT+5}" stroke="#ff9c86" stroke-width="1" fill="none" opacity=".55"/></g>`;};
 const body=pgWaxB('corona');
 if(k<=0)return tail(-1,0,0)+tail(1,0,0)+band(0,1,0,1)+`<g>${body}</g>`;
 const lo=pgeo(pgseg(k,0,.35)),fall=pgseg(k,.25,1),sx=1-.35*pgeo(pgseg(k,.3,1)),o=1-pgseg(k,.55,1);
 return `<g opacity="${o}"><g opacity="${1-pgseg(k,.6,.95)}">${tail(-1,-20*lo,fall*fall*150)}${tail(1,20*lo,fall*fall*150)}</g>${band(lo*6,sx,fall*fall*140,1-pgseg(k,.75,1))}`+
  `<g transform="translate(${-6-40*f},${g}) rotate(${-50*k})"><clipPath id="pghl"><rect x="-40" y="-40" width="40" height="80"/></clipPath><g clip-path="url(#pghl)" transform="translate(6,0)">${body}</g></g>`+
  `<g transform="translate(${6+40*f},${g*1.1}) rotate(${60*k})"><clipPath id="pghr"><rect x="0" y="-40" width="40" height="80"/></clipPath><g clip-path="url(#pghr)" transform="translate(-6,0)">${body}</g></g></g>`;}
// lacre al elegir: dos gotas escurren, cae el sello y salpican otras dos (pt en segundos)
const PGDROP='M0 -7C3 -3 4.5 0 4.5 2.5a4.5 4.5 0 0 1-9 0C-4.5 0-3 -3 0-7z';
function pgPick(pt,emb){let s='';const fall=(t0,dur,tx,ty)=>{const u=pgseg(pt,t0,t0+dur);if(u<=0)return '';const yy=ty-(1-u*u)*(ty+120),ld=u>=1;return `<g transform="translate(${tx},${yy}) scale(${ld?1.25:1},${ld?.6:1})"><path d="${PGDROP}" fill="url(#pgwax)" stroke="#5a0a06" stroke-width=".6"/></g>`;};
 s+=fall(0,.28,-40,26)+fall(.1,.28,36,-30);
 const k=pgseg(pt,.22,.52),q=pt>.52?1+.08*Math.sin(pgseg(pt,.52,.78)*Math.PI):1;
 if(k>0)s+=`<g transform="scale(${(3-2*pgeo(k))*q*1.1}) rotate(-10)" opacity="${pgeo(k)}">${pgWaxB(emb)}</g>`;
 const sp=pgeo(pgseg(pt,.52,.72));if(pt>=.52)for(const [ax,ay,r] of [[-50,6,3.6],[44,30,3]])s+=`<g transform="translate(${ax*sp},${ay*sp}) scale(1.1,.65)" opacity="${pgseg(pt,.52,.56)}"><circle r="${r}" fill="url(#pgwax)" stroke="#5a0a06" stroke-width=".5"/></g>`;
 return s;}
// ---------- apertura ----------
// todo en JS: el papel se recorta desde el centro y los rodillos (dibujados encima mientras dura) se separan con él
const pgBack=x=>{const c1=.55,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2);};
function pgRoll(cx,top,h,R){return `<rect x="${cx-R}" y="${top}" width="${2*R}" height="${h}" rx="5" fill="url(#pgpr)" stroke="#8a6a3a" stroke-width="1.2"/><path d="M${cx-R+3} ${top+4}V${top+h-4}" stroke="#fff8e4" stroke-width="2" opacity=".35"/>`+
 [[top,-1],[top+h,1]].map(([y,d])=>`<rect x="${cx-R-3}" y="${d<0?y-8:y}" width="${2*R+6}" height="8" rx="2" fill="url(#pgwd)" stroke="#2a1608" stroke-width="1.2"/><rect x="${cx-4}" y="${d<0?y-16:y+8}" width="8" height="8" fill="url(#pgwd)"/><ellipse cx="${cx}" cy="${y+d*22}" rx="9" ry="7" fill="url(#pgkn)" stroke="#2a1608" stroke-width="1.3"/>`).join('');}
const PGDEFS2='<linearGradient id="pgpr" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b89660"/><stop offset=".45" stop-color="#f6ead0"/><stop offset="1" stop-color="#a88450"/></linearGradient><linearGradient id="pgwd" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3a1f0c"/><stop offset=".5" stop-color="#c88a4c"/><stop offset="1" stop-color="#2e1808"/></linearGradient><radialGradient id="pgkn" cx=".38" cy=".35"><stop offset="0" stop-color="#d89a58"/><stop offset=".6" stop-color="#7a4420"/><stop offset="1" stop-color="#3a1f0c"/></radialGradient>';
function pgOpen(host,paper){if(!host||!paper||pgE2()||pgRM())return;const old=document.querySelector('.pgseal');if(old)old.remove();
 host.classList.add('pgopen');paper.style.clipPath='inset(0 50%)';
 const ov=document.createElement('div');ov.className='pgseal';document.body.appendChild(ov);let t0=0;const tA=performance.now(),T1=1.05,T2=2.0,R=15;
 const fin=()=>{ov.remove();host.classList.remove('pgopen');paper.style.clipPath='';};
 const step=now=>{const r=paper.getBoundingClientRect();if(!paper.isConnected||now-tA>6000){fin();return;}/* espera a que la ventana tenga tamaño (puede salir un poco después) */if(!r.width||!r.height){requestAnimationFrame(step);return;}if(!t0){t0=now;pgPen(host,paper);}const t=(now-t0)/1000;
  const p=t<T1?0:t>=T2?1:Math.max(0,Math.min(1.03,pgBack(pgseg(t,T1,T2))));const half=Math.min(1,p)*50;paper.style.clipPath=p>=1&&t>=T2?'':`inset(0 ${Math.max(0,50-p*50).toFixed(2)}%)`;
  const cx=r.left+r.width/2,cy=r.top+r.height/2,w=r.width*p,top=r.top-4,h=r.height+8;
  ov.style.cssText=`left:0;top:0;width:${innerWidth}px;height:${innerHeight}px`;
  ov.innerHTML=`<svg viewBox="0 0 ${innerWidth} ${innerHeight}"><defs>${PGDEFS.slice(6,-7)}${PGDEFS2}</defs>${pgRoll(cx-w/2-R+2,top,h,R)}${pgRoll(cx+w/2+R-2,top,h,R)}<g transform="translate(${cx} ${cy})">${pgClosed(pgseg(t,.3,1.15),2*R+4)}</g></svg>`;
  // las cartas: cada una se dibuja a pluma y después aparece lo de dentro
  if(t<T2+.05)requestAnimationFrame(step);else fin();};
 setTimeout(()=>{if(ov.isConnected||paper.style.clipPath)fin();},7000);
 requestAnimationFrame(step);
}
 // las cartas: cada una se dibuja a pluma (en una capa aparte: no se toca el HTML de la ventana, que el juego redibuja) y después aparece lo de dentro
function pgPen(host,paper){host.classList.add('pgpen');setTimeout(()=>{const cards=[...paper.querySelectorAll('.tof,.prow .card')].map(c=>c.getBoundingClientRect()).filter(r=>r.width&&r.height);if(!cards.length){host.classList.remove('pgpen');return;}
  const pv=document.createElement('div');pv.className='pgpenl';pv.innerHTML=`<svg viewBox="0 0 ${innerWidth} ${innerHeight}">`+cards.map((r,i)=>{const L=2*(r.width+r.height);return `<rect x="${r.left+1}" y="${r.top+1}" width="${r.width-2}" height="${r.height-2}" rx="10" stroke-dasharray="${L}" style="--pgL:${L};stroke-dashoffset:${L};animation-delay:${(.75+i*.2).toFixed(2)}s"/>`;}).join('')+'</svg>';document.body.appendChild(pv);
  setTimeout(()=>{host.classList.remove('pgpen');pv.style.opacity='0';setTimeout(()=>pv.remove(),300);},(1.5+cards.length*.2)*1000);},1000);}
// nueva torre: cada vez que se abre la oferta
{const _r=renderTowerOffer;renderTowerOffer=function(){const was=RL.open&&$('relic').querySelector('.toff');const r=_r.apply(this,arguments);try{if(!was){const ps=$('relic').querySelector('.pscr');if(ps)pgOpen(ps,ps.querySelector('.ppap'));}}catch(e){}return r;};}
// elegir pieza: la primera vez que sale en cada ronda (volver desde el mapa no lo repite)
{const _u=ui;ui=function(){const r=_u.apply(this,arguments);try{const pk=S&&S.phase==='place'&&S.pi==null&&document.body.classList.contains('pcpick');
  if(pk&&PGN.round!==S.round){PGN.round=S.round;const p=$('panel');if(p&&p.querySelector('.prow'))pgOpen(p,p);}}catch(e){}return r;};}
// ---------- al elegir: lacre con el emblema ----------
function pgStamp(card,emb,done){if(pgE2()||pgRM()){done();return;}PGN.busy=true;const r=card.getBoundingClientRect(),s=Math.max(56,Math.min(r.width,r.height)*.45);
 const ov=document.createElement('div');ov.className='pgstamp';ov.style.cssText=`left:${r.right-s*.62}px;top:${r.top-s*.12}px;width:${s*1.6}px;height:${s*1.6}px;margin:${-s*.3}px 0 0 ${-s*.3}px`;
 ov.innerHTML=`<svg viewBox="-60 -60 120 120">${PGDEFS}<g></g></svg>`;document.body.appendChild(ov);const g=ov.querySelector('g:last-child'),t0=performance.now();card.classList.add('pgchosen');
 try{sfx('ui');}catch(e){}
 const step=now=>{const t=(now-t0)/1000;g.innerHTML=pgPick(t,emb);if(t<.82)requestAnimationFrame(step);else{PGN.busy=false;done();setTimeout(()=>ov.remove(),350);ov.style.opacity='0';}};requestAnimationFrame(step);}
document.addEventListener('click',e=>{if(PGN.busy){const b=e.target.closest&&e.target.closest('[data-a="pick"],[data-a="towpick"]');if(b){e.stopPropagation();e.preventDefault();}return;}
 const b=e.target.closest&&e.target.closest('[data-a="pick"],[data-a="towpick"]');if(!b||b.dataset.pgok||pgE2()||pgRM())return;
 if(b.dataset.a==='pick'){if(!(S&&S.pi==null&&document.body.classList.contains('pcpick')))return;}
 e.stopPropagation();e.preventDefault();const card=b.dataset.a==='pick'?b:(b.closest('.tof')||b);
 const sel=b.dataset.a==='pick'?`[data-a="pick"][data-i="${b.dataset.i}"]`:`[data-a="towpick"][data-k="${b.dataset.k}"]`;
 pgStamp(card,b.dataset.a==='pick'?'pieza':'torre',()=>{card.classList.remove('pgchosen');const nb=document.querySelector(sel)||b;nb.dataset.pgok=1;nb.click();delete nb.dataset.pgok;});},true);
