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
// ---------- v335 · el pergamino, igual que la maqueta aprobada (pg10 «resbala») ----------
// Se dibuja en un SVG detrás de la ventana (el HTML del juego, que se redibuja, solo se recorta y se va mostrando):
// papel con manchas y bordes irregulares, rodillos de papel enrollado con disco y mango de madera arriba y abajo,
// llega cerrado con la cinta y el lacre (0–1,8 s), se desenrolla (1,8–3,15 s), sale la cinta del título y las cartas se trazan a pluma.
const pgBack=x=>{const c1=.55,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2);};
const pgEio=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
function pgRng(s){return()=>{s=(s*16807)%2147483647;return s/2147483647;};}
function pgWavy(x0,x1,y,amp,seed,step=9){const r=pgRng(seed);let d=`M${x0} ${y}`;for(let x=x0+step;x<=x1+.1;x+=step)d+=` L${x.toFixed(1)} ${(y+(r()-.5)*amp*2).toFixed(1)}`;return d;}
const PGDEFS3='<linearGradient id="pgwd" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3a1f0c"/><stop offset=".35" stop-color="#8a5226"/><stop offset=".5" stop-color="#c88a4c"/><stop offset=".7" stop-color="#7a4520"/><stop offset="1" stop-color="#2e1808"/></linearGradient>'+
 '<linearGradient id="pgpr" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b89660"/><stop offset=".45" stop-color="#f6ead0"/><stop offset="1" stop-color="#a88450"/></linearGradient>'+
 '<radialGradient id="pgkn" cx=".38" cy=".35"><stop offset="0" stop-color="#d89a58"/><stop offset=".6" stop-color="#7a4420"/><stop offset="1" stop-color="#3a1f0c"/></radialGradient>'+
 '<filter id="pgtx" x="0" y="0" width="1" height="1"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3" seed="4"/><feColorMatrix values="0 0 0 0 .45  0 0 0 0 .3  0 0 0 0 .15  0 0 0 -1.1 .62"/><feComposite in2="SourceGraphic" operator="in"/></filter>'+
 '<filter id="pgtx2" x="0" y="0" width="1" height="1"><feTurbulence type="fractalNoise" baseFrequency=".012" numOctaves="3" seed="9"/><feColorMatrix values="0 0 0 0 .55  0 0 0 0 .38  0 0 0 0 .18  0 0 0 -1.6 .75"/><feComposite in2="SourceGraphic" operator="in"/></filter>'+
 '<radialGradient id="pgpp" cx=".5" cy=".45" r=".75"><stop offset="0" stop-color="#f8eed6"/><stop offset=".7" stop-color="#ecdcb4"/><stop offset="1" stop-color="#c9a970"/></radialGradient>'+
 '<linearGradient id="pgau" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff0a8"/><stop offset=".4" stop-color="#e0a83a"/><stop offset=".6" stop-color="#b07a1a"/><stop offset="1" stop-color="#f6d878"/></linearGradient>'+
 '<linearGradient id="pgsh"><stop offset="0" stop-color="#3a2008" stop-opacity=".45"/><stop offset="1" stop-color="#3a2008" stop-opacity="0"/></linearGradient><filter id="pgbl"><feGaussianBlur stdDeviation="3"/></filter>';
// rodillo: el papel enrollado alrededor del palo; de la madera solo asoman el disco y el mango arriba y abajo
function pgRoll2(cx,R,y0,y1){const knob=(y,d)=>{const yy=y+d*2;return `<rect x="${cx-R-4}" y="${d<0?yy-9:yy}" width="${2*R+8}" height="9" rx="3" fill="url(#pgwd)" stroke="#2a1608" stroke-width="1.4"/><rect x="${cx-5}" y="${d<0?yy-19:yy+9}" width="10" height="10" fill="url(#pgwd)" stroke="#2a1608" stroke-width="1.2"/><ellipse cx="${cx}" cy="${yy+d*27}" rx="11" ry="9" fill="url(#pgkn)" stroke="#2a1608" stroke-width="1.5"/>`;};
 let lines='';for(let i=1;i<4;i++){const xx=cx-R+2*R*i/4;lines+=`<path d="M${xx} ${y0+3}V${y1-3}" stroke="#a88450" stroke-width=".8" opacity=".35"/>`;}
 return `${knob(y0,-1)}${knob(y1,1)}<rect x="${cx-R}" y="${y0}" width="${2*R}" height="${y1-y0}" rx="${Math.min(6,R/2)}" fill="url(#pgpr)" stroke="#8a6a3a" stroke-width="1.2"/>${lines}<path d="M${cx-R+3} ${y0+4}V${y1-4}" stroke="#fff8e4" stroke-width="2" opacity=".35"/>`;}
const PGM=60,PGIX=34,PGIY=38;/* margen del SVG alrededor de la ventana, para los rodillos y los mangos */
const PGF={on:null};
const pgCfg={pieza:{host:()=>{const p=$('panel');return p&&document.body.classList.contains('pcpick')&&p.querySelector('.prow')?p:null;},inner:h=>[h.querySelector('#ui'),h.querySelector('#msg')],cards:h=>[...h.querySelectorAll('.prow .card')],ttl:h=>h.querySelector('.pctt'),sub:h=>h.querySelector('#ui>small')},
 torre:{host:()=>{const r=$('relic');const a=r&&RL.open&&!r.classList.contains('cofre')&&r.querySelector('.pscr .ppap');return a&&(a.querySelector('.toff')||a.querySelector('.evopts')||a.classList.contains('evp'))?a:null;},inner:h=>[...h.children].filter(x=>!x.classList.contains('pgsvg')),cards:h=>[...h.querySelectorAll('.tof,.evopts .evo')],ttl:h=>h.querySelector('.ptt,.evhead b'),sub:h=>h.querySelector('.pst')}};
function pgStart(kind,anim){if(pgE2())return;const C=pgCfg[kind],h=C.host();if(!h)return;if(PGF.on&&PGF.on.h===h){if(anim)PGF.on.t0=performance.now();return;}
 pgStop();const sv=document.createElementNS('http://www.w3.org/2000/svg','svg');sv.setAttribute('class','pgsvg');h.insertBefore(sv,h.firstChild);h.classList.add('pgf');
 PGF.on={kind,h,sv,t0:anim&&!pgRM()?performance.now():-1e9,hov:-1,hovT:0};if(kind==='torre')pgFit(h);requestAnimationFrame(pgTick);}
// si la ventana (con rodillos y mangos) no cabe de alto en la pantalla, se encoge entera lo justo
function pgFit(h){const cur=parseFloat(h.style.zoom)||1,nat=h.getBoundingClientRect().height/cur,f=Math.max(document.body.classList.contains('mfs')?.7:.9,Math.min(1,(innerHeight-(document.body.classList.contains('mfs')?12:44))/nat));if(Math.abs(f-cur)>.01)h.style.zoom=f<1?f.toFixed(3):'';}/* el reloj empieza cuando la ventana ya se ve */
function pgStop(){const o=PGF.on;if(!o)return;PGF.on=null;try{o.sv.remove();o.h.classList.remove('pgf');o.h.style.zoom='';for(const e of pgCfg[o.kind].inner(o.h))if(e){e.style.clipPath='';}for(const c of pgCfg[o.kind].cards(o.h))(c.closest('.cardw')||c).style.opacity='';const tt=pgCfg[o.kind].ttl(o.h);if(tt){tt.style.transform='';tt.style.opacity='';}const sb=pgCfg[o.kind].sub(o.h);if(sb)sb.style.opacity='';}catch(e){}}
function pgTick(now){const o=PGF.on;if(!o)return;const C=pgCfg[o.kind],h=C.host();if(h!==o.h||!h.isConnected){pgStop();/* la ventana cambió (otra ronda, otra oferta): se vuelve a montar si sigue abierta */const h2=C.host();if(h2)pgStart(o.kind,false);return;}
 const W=h.offsetWidth,H=h.offsetHeight,vis=h.getBoundingClientRect().width>0&&getComputedStyle(h).visibility!=='hidden'&&!(o.kind==='pieza'&&((typeof LB!=='undefined'&&LB.open)||$('relic').classList.contains('open')||(typeof DLG!=='undefined'&&DLG.on)));if(!W||!H||!vis){if(o.t0>0)o.t0=now;requestAnimationFrame(pgTick);return;}if(o.kind==='pieza'&&o.t0>0&&S)PGN.round=S.round;
 if(o.kind==='torre')pgFit(h);
 const t=(now-o.t0)/1000,SE=1.0,UN0=1.8,UND=1.35,t0=UN0+.55,base=UN0+.75,CX=W/2+PGM,CY=H/2+PGM,IX=PGIX,IY=PGIY,Y0=PGM+IY,PH=H-2*IY,PW=W-2*IX;
 /* los rodillos y sus mangos van dentro de la caja de la ventana (que reserva ese hueco), para no montarse con lo de al lado */
 const op=t<UN0?0:Math.max(0,pgBack(pgseg(t,UN0,UN0+UND)));const w=Math.max(0,PW*Math.min(op,1.04)),xl=CX-w/2,xr=CX+w/2;
 const appear=t<UN0?pgeo(pgseg(t,.15,.6)):1,drop=(1-pgeo(pgseg(t,.15,.6)))*-40;
 const SW=W+2*PGM,SH=H+2*PGM;o.sv.setAttribute('viewBox',`0 0 ${SW} ${SH}`);o.sv.style.cssText=`left:${-PGM}px;top:${-PGM}px;width:${SW}px;height:${SH}px;opacity:${appear};transform:translateY(${drop}px)`;
 // el HTML de la ventana: recortado al papel abierto; título, subtítulo y cartas a su tiempo
 const m=Math.max(0,(W-w)/2-IX);for(const e of C.inner(h))if(e)e.style.clipPath=t>=UN0+UND+.2?'':`inset(-40px ${m.toFixed(1)}px -40px ${m.toFixed(1)}px)`;
 const tt=C.ttl(h);if(tt){const k=pgBack(pgseg(t,t0,t0+.7));tt.style.transform=`scaleX(${Math.max(.01,k).toFixed(3)})`;tt.style.opacity=pgseg(t,t0,t0+.15).toFixed(2);}
 const sb=C.sub(h);if(sb)sb.style.opacity=pgseg(t,t0+.5,t0+.9).toFixed(2);
 const hr=h.getBoundingClientRect(),zx=hr.width/W||1,zy=hr.height/H||1;
 const TOP=pgWavy(PGM+IX-27,PGM+W-IX+27,Y0,2,7),BOT=pgWavy(PGM+IX-27,PGM+W-IX+27,Y0+PH,2,12);const PD=TOP+' L'+BOT.replace('M','').split(' L').reverse().join(' L')+' Z';
 let s=`<defs>${PGDEFS.slice(6,-7)}${PGDEFS3}<clipPath id="pgpc"><rect x="${xl}" y="0" width="${w}" height="${SH}"/></clipPath></defs><ellipse cx="${CX}" cy="${Y0+PH+22}" rx="${Math.max(60,w/2+40)}" ry="12" fill="#000" opacity=".35" filter="url(#pgbl)"/>`;
 if(w>2){s+=`<g clip-path="url(#pgpc)"><path d="${PD}" fill="url(#pgpp)"/><path d="${PD}" fill="#000" filter="url(#pgtx2)"/><path d="${PD}" fill="#000" filter="url(#pgtx)" opacity=".5"/><path d="${TOP}" stroke="#8a5a2a" stroke-width="1.4" fill="none" opacity=".55"/><path d="${BOT}" stroke="#8a5a2a" stroke-width="1.4" fill="none" opacity=".55"/><circle cx="${PGM+IX+PW*.12}" cy="${Y0+PH*.76}" r="34" fill="#a0723a" opacity=".07"/><circle cx="${PGM+IX+PW*.84}" cy="${Y0+PH*.18}" r="24" fill="#a0723a" opacity=".09"/>`;
  // cartas: el borde se traza a pluma y después aparece lo de dentro; con el ratón encima, borde dorado y destello
  const cs=C.cards(h);let hv=-1;cs.forEach((c,i)=>{if(c.matches(':hover'))hv=i;});if(hv!==o.hov){o.hov=hv;o.hovT=now;}
  cs.forEach((c,i)=>{const r=c.getBoundingClientRect();const x=(r.left-hr.left)/zx+PGM,y=(r.top-hr.top)/zy+PGM,cw=r.width/zx,ch=r.height/zy,P=2*(cw+ch);
   const a=pgseg(t,base+i*.2,base+.65+i*.2),cc=pgseg(t,base+.45+i*.2,base+.8+i*.2),hot=i===hv||c.classList.contains('pgchosen');
   const cw0=c.closest('.cardw')||c;cw0.style.opacity=cc<1?cc.toFixed(2):'';
   s+=`<rect x="${x}" y="${y}" width="${cw}" height="${ch}" rx="10" fill="${hot?'rgba(240,200,110,.2)':'none'}" stroke="${hot?'url(#pgau)':'#6a4a2a'}" stroke-width="${hot?2.8:1.4}" stroke-dasharray="${P}" stroke-dashoffset="${(P*(1-a)).toFixed(1)}"/>`;
   if(i===hv){const u=pgcl(((now-o.hovT)/1000%3.6)/.9);if(u<1){const sx=x-60+(cw+120)*pgEio(u);s+=`<clipPath id="pgcc${i}"><rect x="${x}" y="${y}" width="${cw}" height="${ch}" rx="10"/></clipPath><g clip-path="url(#pgcc${i})"><rect x="${sx}" y="${y-40}" width="46" height="${ch+80}" fill="#fff6d0" opacity=".45" transform="rotate(18 ${sx+23} ${y+ch/2})"/></g>`;}}});
  s+=`</g><rect x="${xl}" y="${Y0}" width="20" height="${PH}" fill="url(#pgsh)"/><rect x="${xr-20}" y="${Y0}" width="20" height="${PH}" fill="url(#pgsh)" transform="rotate(180 ${xr-10} ${CY})"/>`;}
 const R=12+12*(1-pgcl(op));for(const [x,d] of [[xl,-1],[xr,1]])s+=pgRoll2(x+d*R,R,Y0-6,Y0+PH+6);
 if(t<UN0+.5)s+=`<g transform="translate(${CX} ${CY})">${pgClosed(pgseg(t,SE,UN0+.15),54)}</g>`;
 o.sv.innerHTML=s;requestAnimationFrame(pgTick);}
// nueva torre: cada vez que se abre la oferta
{const _r=renderTowerOffer;renderTowerOffer=function(){const was=RL.open&&$('relic').querySelector('.toff');const r=_r.apply(this,arguments);try{pgStart('torre',!was);}catch(e){}return r;};}
// eventos: también con el pergamino nuevo (la animación al abrirlo; el resultado de una opción ya sale abierto)
{const _o=openEvent;openEvent=function(){const was=RL.open&&$('relic').querySelector('.evopts,.evres,.evp');const r=_o.apply(this,arguments);try{pgStart('torre',!was);}catch(e){}return r;};}
// elegir pieza: animación la primera vez que sale en cada ronda (volver desde el mapa la enseña ya abierta)
{const _u=ui;ui=function(){const r=_u.apply(this,arguments);try{const p=pgCfg.pieza.host();if(p)pgStart('pieza',PGN.round!==S.round);}catch(e){}return r;};}
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
// v336 · lo que dice cada pieza (casillas especiales, coste) va debajo de su carta, no en un bocadillo junto al ratón
{const _u2=ui;ui=function(){const r=_u2.apply(this,arguments);try{if(document.body.classList.contains('pcpick')&&S&&S.offers){document.querySelectorAll('#panel .prow .cardw').forEach((w,i)=>{const o=S.offers[i];if(!o)return;const c=w.querySelector('.card');if(c&&c.dataset.tip)c.removeAttribute('data-tip');
  let h=pieceInfo(o).replace(/^<b>[\s\S]*?<\/b>[^<]*/,'');/* v340: cada casilla con su dibujo propio y el texto seguido */try{h=h.replace(/<div><i style="background:[^"]*"><\/i>/g,'<div>');const B=o.b||[];let n=0;h=h.replace(/<div>/g,m=>{const b=B[n++];return b&&typeof bfIcon==='function'?'<div class="pcbf">'+bfIcon(b.k,18):m;});}catch(e){}if(w._pci===h)return;w._pci=h;let d=w.querySelector('.pcinfo');if(!d){d=document.createElement('div');d.className='pcinfo';w.appendChild(d);}d.innerHTML=h;});}}catch(e){}return r;};}
