// ---- construir en un solar: al pulsar un solar libre salen alrededor las torres del mazo (1.º toque: tarjeta · 2.º: construir) ----
const BM={s:null,arm:null,hov:null,sig:''};
const bmDeck=()=>Object.keys(TW).filter(k=>!TW[k].uniq&&(!S.deck||S.deck.includes(k)));
const bmCost=k=>S.half?Math.ceil(TW[k].cost/2):TW[k].cost;
function bmFree(q){return q&&inbc(q.kx,q.ky)&&S.cc[q.ky][q.kx]===1&&!S.occ[q.x+','+q.y];}
function bmVis(){return !!(BM.s&&S&&(S.phase==='build'||S.phase==='wave')&&bmFree(BM.s)&&!RL.open&&!PR.pinned&&!S.aim&&!FO.open&&!LB.open&&!(typeof DLG!=='undefined'&&DLG.on)&&!(typeof PMU!=='undefined'&&PMU.open));}
function bmClose(){BM.s=null;BM.arm=null;BM.hov=null;BM.sig='';const m=$('bmenu');if(m)m.classList.remove('on');const c=$('bmcard');if(c)c.classList.remove('on');}
function bmOpen(q){S.selT=null;try{tmClose();}catch(e){}if(PR.pinned)closePrim();BM.s=q;BM.arm=null;BM.hov=null;BM.sig='';try{sfx('ui');}catch(e){}}
function bmTap(c){const q=sqOf(c.x,c.y);if(!inb(c.x,c.y)||!bmFree(q)){if(BM.s){bmClose();}return false;}
 if(BM.s&&BM.s.x===q.x&&BM.s.y===q.y){bmClose();return true;}
 if(tutLockBlock(q.x,q.y))return true;
 if(!bmDeck().length)return false;
 bmOpen(q);return true;}
function bmBuildNow(k,q){q=q||BM.s;if(!q)return;const pt=S.tsel;S.tsel=k;const n=S.list.length;build(q.x,q.y);S.tsel=pt&&pt!==k?pt:null;if(S.list.length>n)bmClose();else{BM.arm=null;BM.sig='';}}
function bmBuild(){let m=$('bmenu');if(!m){m=document.createElement('div');m.id='bmenu';$('cw').appendChild(m);const c=document.createElement('div');c.id='bmcard';$('cw').appendChild(c);
  m.addEventListener('click',e=>{const b=e.target.closest('.tmb');if(!b)return;e.stopPropagation();const k=b.dataset.k;if(BM.arm===k){bmBuildNow(k);return;}BM.arm=k;BM.sig='';try{sfx('ui');}catch(er){}});
  m.addEventListener('mouseover',e=>{if(TOUCH)return;const b=e.target.closest('.tmb');BM.hov=b?b.dataset.k:null;bmCard();});
  m.addEventListener('mouseleave',()=>{BM.hov=null;bmCard();});}
 const q=BM.s;m.innerHTML=bmDeck().map(k=>{const T=TW[k],arm=BM.arm===k,wish=(S.wish||[]).some(w=>w.a==='build'&&w.v===k&&w.x===q.x&&w.y===q.y);
  return `<button class="tmb${arm?' arm':''}${wish?' wish':''}" data-k="${k}" data-tm="build" data-v="${k}" data-sx="${q.x}" data-sy="${q.y}">${arm?'✓':`<span class="ic tw" style="background:${T.col}">${icHtml(twIcO(T))}</span>`}<span class="p">${bmCost(k)} 🪙</span></button>`;}).join('');
 m.classList.add('on');bmPos(true);bmCard();}
function bmPos(force){const m=$('bmenu'),q=BM.s;if(!m||!q)return;const r=cv.getBoundingClientRect(),c=$('cw').getBoundingClientRect(),k=sc()/VIEW*r.width;
 const px=((q.x+.5)*CS-CAM.x)*k+(r.left-c.left),py=((q.y+.5)*CS-CAM.y)*k+(r.top-c.top),bs=m.querySelectorAll('.tmb'),n=bs.length;
 // tamaño según el zoom: alejado, compacto; acercándote, crece con el solar
 const sp=K*CS*k,bz=Math.round(Math.max(48,Math.min(100,sp*.72)));m.style.setProperty('--bs',bz+'px');
 const gap=bz*1.22,R=Math.max(sp*.5+bz*.8,n>1?gap/(2*Math.sin(Math.min(Math.PI/n,Math.PI/2)/1)):0),T0=58;
 // el anillo empieza arriba y se va cerrando hacia abajo: con 2 torres, las dos arriba; con 3, una en medio y dos a los lados…
 const d=n>=5?2*Math.PI/n:Math.min(2*Math.PI/n,gap/R);/* v305: con 5 o más, polígono regular completo (pentágono, hexágono…) */
 // si se sale de la pantalla, se desplaza hacia dentro (sin dejar de rodear el solar)
 const pad=bz/2+6,cx=Math.max(R+pad,Math.min(c.width-R-pad,px)),cy=Math.max(T0+R+pad,Math.min(c.height-pad-bz*.35-(n*d>Math.PI?R:0),py));
 bs.forEach((b,i)=>{const a=-Math.PI/2+(i-(n-1)/2)*d;b.style.left=cx+Math.cos(a)*R+'px';b.style.top=cy+Math.sin(a)*R+'px';});
 m._p={px:cx,py:cy,R,W:c.width,H:c.height};if(force||BM.hov||BM.arm)bmCardPos();}
const DTN={phys:'Físico',magic:'Mágico',elem:'Elemental'};
function bmInfo(k){const T=TW[k],a=twAt(k,1,null),M=twMax(1),src='shop:'+k;
 const tags=T.bufo?['Apoyo']:[DTN[T.dt]||'',T.unit?'Unidades':T.splash||T.pr?'Área':T.beam||T.chain?'Rayo':'Un objetivo'].filter(Boolean);
 const dm=a.st?`<div class="grow"><span class="cd">DPS</span><div class="gtr"><i style="width:${Math.max(3,Math.min(100,100*a.dv/M.dps))}%;background:${GCOL[a.st]}"></i></div><span class="gv ${a.st==='burn'?'cbu':'cpo'}">${f(a.dv)} ${GICO[a.st]}</span></div>`:gRow(dtLab(dtOf(T,a.TT),T.unit?'Daño (unidad)':'Daño'),dtCls(dtOf(T,a.TT)),a.dv,M.dmg,f(a.dv));
 return `<div class="bmh"><b>${T.ic} ${T.n}</b><span class="bp">${bmCost(k)} 🪙</span></div><div class="bmt">${tags.map(t=>`<em>${t}</em>`).join('')}</div>`+(T.bufo?'':dm)+((cd=>cd&&isFinite(cd)?gRow('Enfriamiento','ccl',1/cd,M.rate,f(cd)+' s'):'')(T.bufo?BUFOCD[k]:1/a.s.rate));}
function bmCard(){const c=$('bmcard');if(!c||!BM.s)return;const k=BM.arm||BM.hov;if(!k){c.classList.remove('on');return;}const cost=bmCost(k),no=S.gold<cost;
 let h=bmInfo(k)+(BM.arm===k?`<div class="cf${no?' no':''}">${no?'Te faltan '+(cost-S.gold)+' 🪙':'Pulsa otra vez para construir'}</div>`:`<div class="cf${no?' no':''}">${no?'Te faltan '+(cost-S.gold)+' 🪙':(TOUCH?'Toca':'Pulsa')+' otra vez para construir'}</div>`);
 if(no)h+=`<div class="hn">${TOUCH?'Mantén pulsado':'Clic derecho'} para marcarla 🔖 y construirla sola cuando tengas oro.</div>`;
 if(c._h!==h){c.innerHTML=h;c._h=h;}c.classList.add('on');bmCardPos();}
function bmCardPos(){const c=$('bmcard'),m=$('bmenu');if(!c||!m||!m._p||!c.classList.contains('on'))return;const P=m._p,w=c.offsetWidth,hh=c.offsetHeight,T0=58,g=P.R+30;
 const fit=(x,y)=>x>=6&&y>=T0&&x+w<=P.W-6&&y+hh<=P.H-6;
 const cand=[[P.px+g,P.py-hh/2],[P.px-g-w,P.py-hh/2],[P.px-w/2,P.py-g-hh],[P.px-w/2,P.py+g]];
 let [x,y]=cand.find(([x,y])=>fit(x,y))||cand[0];x=Math.max(6,Math.min(P.W-w-6,x));y=Math.max(T0,Math.min(P.H-hh-6,y));c.style.left=x+'px';c.style.top=y+'px';}
function bmTick(){if(!bmVis()){if(BM.s&&!(S&&(S.phase==='build'||S.phase==='wave')&&bmFree(BM.s)))bmClose();else{const m=$('bmenu');if(m)m.classList.remove('on');const c=$('bmcard');if(c)c.classList.remove('on');BM.sig='';}return;}
 const sig=[BM.s.x,BM.s.y,BM.arm,S.half?1:0,(S.deck||[]).join(),JSON.stringify((S.wish||[]).filter(w=>w.a==='build'))].join('|');
 if(sig!==BM.sig){BM.sig=sig;bmBuild();}else bmPos();
 const m=$('bmenu');for(const b of m.querySelectorAll('.tmb')){const no=S.gold<bmCost(b.dataset.k)&&!b.classList.contains('arm');if(b.classList.contains('no')!==no)b.classList.toggle('no',no);const sel=BM.hov===b.dataset.k&&!b.classList.contains('arm');if(b.classList.contains('sel')!==sel)b.classList.toggle('sel',sel);}
 if(BM.arm||BM.hov)bmCard();}
// teclas 1–7: construir esa torre del mazo en el solar abierto o en el que tengas el ratón encima
function bmKey(i){if(!S||!(S.phase==='build'||S.phase==='wave'))return false;const k=bmDeck()[i];if(!k)return false;let q=BM.s;
 if(!q&&S.hover){const h=S.hover,qq=sqOf(h.x,h.y);if(inb(h.x,h.y)&&bmFree(qq))q=qq;}
 if(!q){errBubble('Pasa el ratón por un solar libre para construir ahí.');return true;}
 bmBuildNow(k,q);if(BM.s&&!bmFree(BM.s))bmClose();return true;}
addEventListener('keydown',e=>{if(e.key==='Escape'&&BM.s&&bmVis()&&!e.defaultPrevented){if(BM.arm){BM.arm=null;BM.sig='';}else bmClose();}});

