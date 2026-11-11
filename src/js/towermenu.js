// ---- menú de torre: al pulsar una torre salen botones pegados a ella (mejorar / especializar / habilidades, ficha, vender, bandera) ----
const TM={t:null,arm:null,hov:null,sig:''};
function tmHas(t,a){const pp=PR.pinned,pk=PR.key;PR.pinned=true;PR.key='tw:'+t.id;let h='';try{h=towerInfo(t)||'';}catch(e){}finally{PR.pinned=pp;PR.key=pk;}return h.includes('data-a="'+a+'"');}
function tmOpts(t){const T=TW[t.type],top=[],bot=[];let side=null;
 if(T.guild&&tmHas(t,'gup'))top.push({k:'gup',ic:'⬆',c:T.upc[t.lvl+1]});
 else if(t.lvl===3&&SPECS[t.type]&&!T.uniq)for(const sp in SPECS[t.type])top.push({k:'spec',v:sp,ic:SPECS[t.type][sp].ic,c:tCost(t,upCost(T,4))});
 else if(t.lvl===4&&t.spec&&SPECS[t.type])for(const id of SPECS[t.type][t.spec].ab){const D=AB[id],rk=t.ab&&t.ab[id]||0,n=D.ranks.length;top.push({k:'abuy',v:id,ab:1,rk,n,c:rk<n?tCost(t,D.ranks[rk].c):null,lk:!!abReq(t,id)});}
 else if(tmHas(t,'up')||(!T.uniq&&!T.guild&&t.lvl<3))top.push({k:'up',ic:'⬆',c:tCost(t,upCost(T,t.lvl+1))});
 bot.push({k:'lupa',ic:'🔍'});if(!T.uniq)bot.push({k:'sell',ic:'$',sv:sellVal(t)});
 if(T.faro){bot.push({k:'flz',v:'0',ic:'🔦'});if((t.lvl||1)>=4)bot.push({k:'flz',v:'1',ic:'🔦'});}
 if(tmHas(t,'flag'))side={k:'flag',ic:FLAGI};
 return{top,bot,side};}
const tmKey=o=>o.k+(o.v?':'+o.v:'');
function tmVis(){const t=TM.t;return !!(t&&S&&S.list&&S.list.includes(t)&&S.selT===t&&!RL.open&&!PR.pinned&&!S.aim&&!FO.open&&!LB.open&&(S.phase==='build'||S.phase==='wave'||S.phase==='place')&&!(typeof DLG!=='undefined'&&DLG.on)&&!(typeof PMU!=='undefined'&&PMU.open));}
function tmClose(){TM.t=null;TM.arm=null;TM.hov=null;TM.sig='';const m=$('tmenu');if(m)m.classList.remove('on');const c=$('tmcard');if(c)c.classList.remove('on');}
function tmOpen(t){TM.t=t;TM.arm=null;TM.hov=null;TM.sig='';}
function tmBuild(){let m=$('tmenu');if(!m){m=document.createElement('div');m.id='tmenu';$('cw').appendChild(m);const c=document.createElement('div');c.id='tmcard';$('cw').appendChild(c);
  m.addEventListener('click',e=>{const b=e.target.closest('.tmb');if(!b)return;e.stopPropagation();tmClick(b);});
  m.addEventListener('mouseover',e=>{if(TOUCH)return;const b=e.target.closest('.tmb');TM.hov=b?b.dataset.k:null;tmCard();});
  m.addEventListener('mouseleave',()=>{TM.hov=null;tmCard();});}
 const t=TM.t,o=tmOpts(t),B=(x,cls,inner)=>`<button class="tmb ${cls}" data-k="${tmKey(x)}" data-tm="${x.k}" data-id="${t.id}"${x.v?` data-v="${x.v}"`:''}>${inner}</button>`;
 let h='';
 o.top.forEach(x=>{const arm=TM.arm===tmKey(x);let inner;
  if(x.ab){const D=AB[x.v];inner=arm?'✓':`<span class="ic ab">${D.n[0]}</span><span class="pip">${Array.from({length:x.n},(_,i)=>`<i${i<x.rk?'':' class="e"'}></i>`).join('')}</span>`;}
  else inner=arm?'✓':`<span class="ic">${x.ic}</span>`;
  h+=B(x,(arm?'arm ':'')+(x.c==null?'mx':'')+(x.lk?' lk':''),(x.lk?'<span class="tlk">🔒</span>':'')+inner+`<span class="p">${x.c==null?'Máx.':(x.c?x.c+' 🪙':'gratis')}</span>`);});
 o.bot.forEach(x=>{const arm=TM.arm===tmKey(x),un=x.k==='sell'&&undoOk(t);let cd=0;if(x.k==='flz')cd=S.phase==='wave'?Math.ceil((t.lzcd||[0,0])[+x.v]||0):0;h+=B(x,(x.k==='sell'?'sell ':'')+(arm?'arm':'')+(cd>0?' mx':''),(arm?'✓':`<span class="ic">${un?'↶':x.ic}</span>`)+(x.k==='sell'?`<span class="p">+${x.sv}</span>`:x.k==='flz'?`<span class="p">${cd>0?cd+' s':(+x.v?'2.ª':'Luz')}</span>`:''));});
 if(o.side)h+=B(o.side,'flag',`<span class="ic">${o.side.ic}</span>${kcap(kbN('flag'))}`);
 m.innerHTML=h;m._o=o;m.classList.add('on');tmPos(true);tmCard();try{wishDeco();}catch(e){}}
function tmPos(force){const m=$('tmenu'),t=TM.t;if(!m||!t||!m._o)return;const r=cv.getBoundingClientRect(),c=$('cw').getBoundingClientRect(),k=sc()/VIEW*r.width;
 const px=((t.x+.5)*CS-CAM.x)*k+(r.left-c.left),py=((t.y+.5)*CS-CAM.y)*k+(r.top-c.top),R=Math.max(16,K*CS*.44*k),o=m._o;
 const bs=m.querySelectorAll('.tmb');let i=0;const put=(x,y)=>{const b=bs[i++];if(b){b.style.left=x+'px';b.style.top=y+'px';}};
 const ty=py-R-42,by=py+R+28,n=o.top.length;
 o.top.forEach((x,j)=>{if(n===3)put(px+(j-1)*50,ty-(j===1?12:0));else if(n===2)put(px+(j?26:-26),ty);else put(px,ty);});
 o.bot.forEach((x,j)=>{put(px+(j-(o.bot.length-1)/2)*52,by);});
 if(o.side)put(px+R+34,py);
 m._p={px,py,R,ty,by,W:c.width,H:c.height};if(force||TM.hov||TM.arm)tmCardPos();}
// antes → después al mejorar un nivel
function upCmp(t){const T=TW[t.type];if(T.uniq||t.lvl>=3)return'';let a,b;try{a=stats(t);b=stats(Object.assign({},t,{lvl:t.lvl+1}));}catch(e){return'';}
 const TT=twm(t.type,t.spec),R=(l,c,x,y)=>x===y?'':`<div class="tmc"><span class="${c}">${l}</span><b><span class="${c} tmold">${x}</span> → <span class="${c}">${y}</span></b></div>`,dt=T.dot||T.burn,dc=(()=>{try{return dtCls(dtOf(T))||'cd';}catch(e){return 'cd';}})();
 return '<div class="tmcmp">'+R(T.unit?'Daño del soldado':dt?'Stacks':'Daño',dc,f(a.dmg),f(b.dmg))+(T.unit?'':R(dt?'DPS':'Daño por segundo','cd',f(dpsOf(a,TT)),f(dpsOf(b,TT))))+R('Enfriamiento','ccl',f(1/a.rate)+' s',f(1/b.rate)+' s')+R('Rango','cg',f(a.range/K)+' cas.',f(b.range/K)+' cas.')+'</div>';}
function tmInfo(k,t){const T=TW[t.type],[a,v]=k.split(':');
 if(a==='up'){const n=t.lvl+1;return{h:`<b>⬆ Mejorar a Nv ${n}</b>`+(!T.uniq&&n<=3?(upCmp(t)||`<small>${upText(t)}.</small>`):''),c:tCost(t,upCost(T,n)),buy:1,w:1};}
 if(a==='gup')return{h:`<b>⬆ Subir a rango ${RANKS[t.lvl]}</b>`,c:T.upc[t.lvl+1],buy:1};
 if(a==='spec'){const x=SPECS[t.type][v];return{h:`<b>${x.ic} ${x.n}</b><small>${x.d}</small><small>${specCh(t,v)}</small>`,c:tCost(t,upCost(T,4)),buy:1,w:1};}
 if(a==='abuy'){const D=AB[v],rk=t.ab&&t.ab[v]||0,n=D.ranks.length,rq=abReq(t,v);return{h:`<b>${D.n}</b> · Rango ${rk}/${n}<small>${rk>=n?D.txt(D.ranks[n-1]):(rk?'Siguiente: ':'')+D.txt(D.ranks[Math.min(rk,n-1)])}</small>`+(rq?`<small class="cd">🔒 ${rq}</small>`:''),c:rk<n?tCost(t,D.ranks[rk].c):null,buy:rk<n,w:rk<n};}
 if(a==='sell')return{h:undoOk(t)?`<b>Deshacer construcción</b><small>La has puesto en esta fase: recuperas <b>todo</b> lo que pagaste, <span class="gd">+${sellVal(t)} 🪙</span>.</small>`:`<b>Vender torre</b><small>Recuperas <span class="gd">+${sellVal(t)} 🪙</span> (la mitad de lo invertido).</small>`,sell:1};
 if(a==='flag')return{h:`<b>${FLAGI} ${t.type==='augur'?'Mover la nube':'Mover bandera'}</b><small>Elige una casilla del camino dentro de su rango.</small>`};
 if(a==='lupa')return{h:'<b>🔍 Ficha completa</b><small>Estadísticas, objetivo y todos los detalles de la torre.</small>'};
 if(a==='flz'){const cd=S.phase==='wave'?((t.lzcd||[0,0])[+v]||0):0;return{h:`<b>🔦 Mover ${+v?'la segunda luz':'la luz'}</b><small>Proyecta la zona de luz en cualquier punto del mapa: las torres de dentro reciben la mejora. Durante la oleada, se puede volver a mover cada ${FCD[(t.lvl||1)-1]} s.</small>`+(cd>0?`<div class="cf no">Disponible en ${Math.ceil(cd)} s</div>`:'')};}
 return{h:''};}
function tmCard(){const c=$('tmcard'),t=TM.t;if(!c||!t)return;const k=TM.arm||TM.hov;if(!k){c.classList.remove('on');return;}const I=tmInfo(k,t);let h=I.h;
 if(TM.arm===k){if(I.sell)h+='<div class="cf">Pulsa otra vez para vender</div>';else if(I.buy)h+=`<div class="cf${S.gold<I.c?' no':''}">${S.gold<I.c?'Te faltan '+(I.c-S.gold)+' 🪙':'Pulsa otra vez para comprar · '+(I.c?I.c+' 🪙':'gratis')}</div>`;}
 else if(I.buy)h+=`<div class="cf${S.gold<I.c?' no':''}">${I.c?I.c+' 🪙':'gratis'}${S.gold<I.c?' · te faltan '+(I.c-S.gold):''}</div>`;
 if(I.w)h+=`<div class="hn">${TOUCH?'Mantén pulsado':'Clic derecho'} para marcarla 🔖 y comprarla sola cuando tengas oro.</div>`;
 if(c._h!==h){c.innerHTML=h;c._h=h;}c.classList.add('on');c.dataset.k=k;tmCardPos();}
function tmCardPos(){const c=$('tmcard'),m=$('tmenu');if(!c||!m||!m._p||!c.classList.contains('on'))return;const P=m._p,k=c.dataset.k;
 const w=c.offsetWidth,h=c.offsetHeight,T0=58,L=P.px-P.R-74,Rr=P.px+P.R+(m._o&&m._o.side?82:74),top=P.ty-34,bot=P.by+40;
 const fit=(x,y)=>x>=6&&y>=T0&&x+w<=P.W-6&&y+h<=P.H-6;const below=['lupa','sell'].includes(k.split(':')[0]);
 const cand=below?[[P.px-w/2,bot],[Rr,P.py-h/2],[L-w,P.py-h/2],[P.px-w/2,top-h]]:[[P.px-w/2,top-h],[Rr,P.py-h/2],[L-w,P.py-h/2],[P.px-w/2,bot]];
 let [x,y]=cand.find(([x,y])=>fit(x,y))||cand[0];x=Math.max(6,Math.min(P.W-w-6,x));y=Math.max(T0,Math.min(P.H-h-6,y));c.style.left=x+'px';c.style.top=y+'px';}
function tmDo(b,direct){const t=TM.t;if(!t)return;const a=b.dataset.tm,v=b.dataset.v;TM.arm=null;
 if(a==='up')upgrade(t);else if(a==='gup')guildUp(t);else if(a==='spec')chooseSpec(t,v);else if(a==='abuy')buyAb(t,v);
 else if(a==='sell'){sell(t);tmClose();return;}
 else if(a==='flag'){tmClose();startFlag(t);return;}
 else if(a==='flz'){const cd=S.phase==='wave'?((t.lzcd||[0,0])[+v]||0):0;if(cd>0){errBubble('La luz se podrá mover en '+Math.ceil(cd)+' s.');return;}tmClose();S.selT=null;S.aim='faroz';S.flzSel={id:t.id,i:+v};S.msg='Elige dónde proyectar la luz del Faro (en cualquier parte del mapa; Esc para cancelar).';renderRelics();ui();return;}
 else if(a==='lupa'){const tg={key:'tw:'+t.id,html:()=>towerInfo(t),rect:cellRect(t.x-1,t.y-1,K),cell:{x:t.x,y:t.y}};TM.sig='';if(MFSQ()){LUPA.tg=tg;LUPA.sticky=false;}openPrim(tg);PR.pinned=true;refreshPrim();ui();return;}
 TM.sig='';ui();}
function tmClick(b){const k=b.dataset.k,a=b.dataset.tm;if(a==='lupa'||a==='flag'||a==='flz'){try{sfx('ui');}catch(e){}tmDo(b);return;}
 if(TM.arm===k){tmDo(b);return;}TM.arm=k;TM.sig='';try{sfx('ui');}catch(e){}}
function tmTick(){if(!tmVis()){if(TM.t&&!(TM.t&&S&&S.list&&S.list.includes(TM.t)&&S.selT===TM.t))tmClose();else{const m=$('tmenu');if(m)m.classList.remove('on');const c=$('tmcard');if(c)c.classList.remove('on');TM.sig='';}return;}
 const t=TM.t,sig=[undoOk(t)?1:0,t.id,t.lvl,S.phase==='wave'&&t.lzcd?t.lzcd.map(Math.ceil).join():'',t.spec,JSON.stringify(t.ab||{}),TM.arm,(S.tut&&S.tut.freeUp)?1:0,S.relics&&S.relics.join()].join('|');
 if(sig!==TM.sig){TM.sig=sig;tmBuild();}else tmPos();
 const m=$('tmenu');for(const b of m.querySelectorAll('.tmb')){const x=[...m._o.top,...m._o.bot].find(o=>tmKey(o)===b.dataset.k);const no=!!(x&&x.c!=null&&x.c>0&&S.gold<x.c&&!b.classList.contains('arm'));if(b.classList.contains('no')!==no)b.classList.toggle('no',no);}
 if(TM.arm||TM.hov)tmCard();}
addEventListener('keydown',e=>{if(e.key==='Escape'&&TM.t&&tmVis()&&!e.defaultPrevented){if(TM.arm){TM.arm=null;TM.sig='';}else{S.selT=null;tmClose();ui();}}});

