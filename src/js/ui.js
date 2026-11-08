// ---- interfaz ----
function ui(){
 try{if(S.msg){const t=String(S.msg).replace(/<[^>]+>/g,'');if(ERRRX.test(t)&&!/^(Elige|Pulsa)/.test(t)){S.msg='';LMSG='';errBubble(t);}}}catch(e){}
 $('panel').style.display=S.hero?'':'none';$('msg').textContent=S.msg;let h='';$('ui').classList.toggle('lock',!!S.aim);
 const sp=[[0,'Pausa'],[.25,'×0,25'],[.5,'×0,5'],[1,'×1'],[2,'×2'],[3,'×3']];
 $('ctl').innerHTML='';
 const sl=S.speed;const MF=document.body.classList.contains('mfs');if(S.speed>0)S.lspd=S.speed;
 $('mbl').innerHTML=MF?`<button data-a="spdt" class="${sl===0?'on':''}" title="${sl===0?'Reanudar':'Pausa'}">${sl===0?'<i class="pplay"></i>':'<i class="pbar"></i>'}</button><button data-a="spdc" title="Cambiar velocidad">×${String(S.lspd||1).replace('.',',')}</button>`:sp.map(([v,l])=>`<button class="${sl===v?'on':''}" data-a="spd" data-v="${v}" title="${v===0?'Pausa':'Velocidad '+l}">${v===0?'<i class="pbar"></i>':l}</button>`).join('');
 const rcOk=S.phase==='wave'&&S.snap&&(S.rc||0)>0;
 $('mtl').innerHTML=`<button data-a="pause" title="Menú de pausa (Esc)">☰</button><div class="gap"></div>`+
  `<button data-a="retry" class="${S.rask?'warn':''}"${rcOk?'':' disabled'} title="${S.rask?'Pulsa otra vez para reintentar la oleada (gasta 1 carga)':'Reintentar la oleada desde el principio'}">↺<span class="bdg">${S.tut?'∞':S.rc||0}</span></button>`;
 $('mbr').innerHTML=xPanel()+heroPanel()+(S.phase==='build'?`<button class="go${WARM?' arm':''}" data-a="wave" style="position:relative">${WARM?'✓ Pulsa otra vez':'Empezar oleada'}${kcap(kbN('wave'))}</button>`:'');
 if(S.phase==='place'&&(MF||!TOUCH)&&S.pi!=null&&!S.pexp&&S.offers[S.pi]){const o=S.offers[S.pi];h=`<div class="pstrip"><b>${o.n}</b>${payOn()&&pcost(o)?`<span class="gd">${pcost(o)} 🪙</span>`:''}<button data-a="prot" data-i="${S.pi}">⟳ Girar</button><button data-a="pick" data-i="${S.pi}">✕ Cancelar</button><button data-a="pexp" title="Ver las piezas">▲</button></div>`;}
 else if(S.phase==='place'){
  h=(S.pi==null&&!S.tut?'<div class="pctt">Elige una pieza</div><button class="pcpeek" data-a="ppeek" title="Ver el mapa">👁</button>'+diceRr('pc'):'')+'<small style="display:block;margin-bottom:12px">'+(S.pi==null?(S.tut?'Elige una pieza. Puedes girarla antes de colocarla.':'Puedes girarla antes de colocarla. Después podrás cancelar y volver aquí.'):(BARX.pc=1,'Pulsa un hueco marcado que conecte con el camino.'+(HSEEN.barpc?'':' Vuelve a pulsar la pieza para dejar de elegirla.')))+'</small><div class="prow">'+
  S.offers.map((o,i)=>`<div class="cardw"><button class="card ${i===S.pi?'on':''}" data-a="pick" data-i="${i}" data-tip="piece:${i}"><canvas width="98" height="98" data-i="${i}"></canvas>${o.n}${!payOn()?'':pcost(o)?`<span class="pcst gd">${pcost(o)} 🪙</span>`:'<span class="pcst pfree">Gratis</span>'}</button><button class="rbtn${TOUCH?'':' wide'}" data-a="prot" data-i="${i}" title="Girar la pieza${TOUCH?'':' ('+kbN('rot')+')'}"><svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M13.2 8.4A5.2 5.2 0 1 1 11.6 4.3"/><path d="M12.6 1.8v3.4H9.2"/></svg>${TOUCH?'':'R'}</button></div>`).join('')+'</div>';}
 else if(S.phase==='build'||S.phase==='wave'){h='';}
 else h=(S.phase==='lost'&&S.snap&&S.rc>0?`<button class="go" data-a="retry" data-now="1">↺ Reintentar oleada (${S.rc})</button>`:'')+'<button class="go" data-a="results">Ver resultados</button><button data-a="reset">Jugar de nuevo</button><button data-a="menu">Menú principal</button>';
 $('ui').innerHTML=h;$('panel').classList.toggle('pempty',!h&&!S.msg);
 {/* elegir pieza: ventana centrada y grande, sin poder hacer nada más; 👁 para mirar el mapa */const pk=S.phase==='place'&&S.pi==null&&!S.tut&&!document.body.classList.contains('inmenu')&&!(typeof DLG!=='undefined'&&DLG.on);if(!pk)S.ppk=0;document.body.classList.toggle('pcpick',pk&&!S.ppk);document.body.classList.toggle('pcpeek',pk&&!!S.ppk);
  let pb=$('pcback');if(pk&&S.ppk&&!pb){pb=document.createElement('button');pb.id='pcback';pb.innerHTML='🧩 Volver a las piezas';document.body.appendChild(pb);pb.addEventListener('click',e=>{e.stopPropagation();S.ppk=0;ui();});}if(pb&&!(pk&&S.ppk))pb.remove();}
 {let ch=0;if(BARX.pc&&S.pi==null){BARX.pc=0;if(!HSEEN.barpc){HSEEN.barpc=1;ch=1;}}if(BARX.tw&&!S.tsel){BARX.tw=0;if(!HSEEN.bartw){HSEEN.bartw=1;ch=1;}}if(ch)try{localStorage.setItem('rt-hints',JSON.stringify(HSEEN));}catch(e){}}
 $('ui').querySelectorAll('canvas[data-i]').forEach(cn=>drawPat(cn.getContext('2d'),S.offers[+cn.dataset.i],14,0,0,1));
 markSpeed();
}
let WARM=0; // «Empezar oleada» armado (primer toque)
let SPA='N'; // N = normal, S = ralentizado por hover (oleada), F = juego parado (preparación o ventana abierta)
function markSpeed(){document.querySelectorAll('#mbl button[data-a="spd"]').forEach(b=>{const v=+b.dataset.v;let on,dim=false;
 if(SPA==='F'){on=v===0;dim=v===S.speed&&S.speed>0;}else if(SPA==='S'){on=v===.25;dim=v===S.speed;}else on=v===S.speed;
 b.classList.toggle('on',on);b.classList.toggle('dim',dim);});}
function setPM(v){PM=v;if(OP.open)setTimeout(renderOpts,0);try{localStorage.setItem('rt-pm',v);}catch(e){}$('game').className='pm-'+v;closePrim();ui();}
document.addEventListener('pointermove',e=>{M.x=e.clientX;M.y=e.clientY;M.has=true;M.touch=e.pointerType==='touch';});
document.addEventListener('pointerdown',e=>{M.x=e.clientX;M.y=e.clientY;M.has=true;M.touch=e.pointerType==='touch';});
document.documentElement.addEventListener('mouseleave',()=>M.has=false);
addEventListener('blur',()=>M.has=false);
let DR=null,DRAGGED=false;
cv.addEventListener('wheel',e=>{e.preventDefault();const r=cv.getBoundingClientRect(),px=(e.clientX-r.left)/r.width*VIEW,py=(e.clientY-r.top)/r.height*VH;
 if(e.ctrlKey){zoomAt(Math.exp(-e.deltaY*.01),px,py);return;}
 const pad=e.deltaMode===0&&(e.deltaX!==0||!Number.isInteger(e.deltaY)||Math.abs(e.deltaY)<50);
 if(pad){const k=sc();CAM.x+=e.deltaX/r.width*VIEW/k;CAM.y+=e.deltaY/r.height*VH/k;clampCam();return;}
 zoomAt(e.deltaY<0?1.2:1/1.2,px,py);},{passive:false});
cv.addEventListener('mousedown',e=>{if(e.button>2)return;DR={x:e.clientX,y:e.clientY,cx:CAM.x,cy:CAM.y,m:false,b:e.button};if(e.button)e.preventDefault();});
addEventListener('mousemove',e=>{if(!DR)return;const dx=e.clientX-DR.x,dy=e.clientY-DR.y;if(!DR.m&&Math.hypot(dx,dy)<6)return;DR.m=true;const r=cv.getBoundingClientRect(),k=sc();CAM.x=DR.cx-dx/r.width*VIEW/k;CAM.y=DR.cy-dy/r.height*VH/k;clampCam();});
addEventListener('mouseup',()=>{if(DR&&DR.m){DRAGGED=true;setTimeout(()=>{DRAGGED=false;},60);}DR=null;});
{let T0=null;const px=t=>{const r=cv.getBoundingClientRect();return[(t.clientX-r.left)/r.width*VIEW,(t.clientY-r.top)/r.height*VH];};
 const dist=ts=>Math.hypot(ts[0].clientX-ts[1].clientX,ts[0].clientY-ts[1].clientY),mid=ts=>px({clientX:(ts[0].clientX+ts[1].clientX)/2,clientY:(ts[0].clientY+ts[1].clientY)/2});
 cv.addEventListener('touchstart',e=>{const ts=e.touches;if(ts.length===2){T0={pinch:1,d:dist(ts),m:mid(ts),moved:true};}else if(ts.length===1){T0={pinch:0,x:ts[0].clientX,y:ts[0].clientY,cx:CAM.x,cy:CAM.y,moved:false};}},{passive:true});
 cv.addEventListener('touchmove',e=>{if(!T0)return;const ts=e.touches,r=cv.getBoundingClientRect();
  if(ts.length===2&&T0.pinch){e.preventDefault();const d=dist(ts),m=mid(ts);zoomAt(d/T0.d,m[0],m[1]);const k=sc();CAM.x-=(m[0]-T0.m[0])/k;CAM.y-=(m[1]-T0.m[1])/k;clampCam();T0.d=d;T0.m=m;DRAGGED=true;}
  else if(ts.length===1&&!T0.pinch){const dx=ts[0].clientX-T0.x,dy=ts[0].clientY-T0.y;if(!T0.moved&&Math.hypot(dx,dy)<8)return;T0.moved=true;e.preventDefault();const k=sc();CAM.x=T0.cx-dx/r.width*VIEW/k;CAM.y=T0.cy-dy/r.height*VH/k;clampCam();DRAGGED=true;}},{passive:false});
 cv.addEventListener('touchend',e=>{if(e.touches.length===0){if(T0&&T0.moved)setTimeout(()=>{DRAGGED=false;},120);T0=null;}else if(e.touches.length===1){T0={pinch:0,x:e.touches[0].clientX,y:e.touches[0].clientY,cx:CAM.x,cy:CAM.y,moved:true};}},{passive:true});}
$('msg').addEventListener('click',()=>{if(document.body.classList.contains('mfs'))$('msg').classList.toggle('full');});

// aviso de «hay más abajo» en los paneles que se desplazan
const SMSEL='#tip,#comp,#opts,#relic,#panel,#side,#menu,#endscr,.kpanel,.evwin';
setInterval(()=>{try{for(const el of document.querySelectorAll(SMSEL)){const on=el.getClientRects().length>0&&el.scrollHeight>el.clientHeight+8&&el.scrollTop+el.clientHeight<el.scrollHeight-8&&getComputedStyle(el).overflowY!=='visible';if(el.classList.contains('smore')!==on)el.classList.toggle('smore',on);}}catch(e){}},250);

// habilidades en la selección de héroe: se abren al tocar o pasar el ratón (antes no mostraban nada)
(()=>{const p=document.createElement('div');p.id='hpop';p.className='tipc';document.body.appendChild(p);let cur=null;
 const show=a=>{const tg=resolve(a);if(!tg)return;p.innerHTML=tg.html();p.style.display='block';const r=a.getBoundingClientRect(),w=p.offsetWidth,h=p.offsetHeight;let l=r.right+8;if(l+w>innerWidth-8)l=r.left-8-w;if(l<8)l=Math.max(8,Math.min(innerWidth-8-w,r.left));let t=r.top;if(t+h>innerHeight-8)t=innerHeight-8-h;if(t<8)t=8;p.style.left=l+'px';p.style.top=t+'px';cur=a;};
 const hide=()=>{p.style.display='none';cur=null;};
 const tgt=e=>e.target.closest&&e.target.closest('#relic [data-tip^="habp:"],[data-tip^="achrw:"],#comp .lbhpc [data-tip]');
 document.addEventListener('click',e=>{const a=tgt(e);if(a){if(cur===a&&TOUCH)hide();else show(a);e.stopPropagation();return;}if(!(e.target.closest&&e.target.closest('#hpop')))hide();},true);
 document.addEventListener('mouseover',e=>{if(TOUCH)return;const a=tgt(e);if(a)show(a);else if(cur&&!(e.target.closest&&e.target.closest('#hpop')))hide();});
 setInterval(()=>{if(cur&&!document.body.contains(cur))hide();},300);})();


// sonido al pasar el ratón por los botones de los menús (fuera de la partida; en partida cansaría)
{let lastHB=null;document.addEventListener('mouseover',e=>{if(TOUCH)return;const b=e.target.closest&&e.target.closest('button');if(b===lastHB)return;lastHB=b;
 if(!b||b.disabled)return;const inM=document.body.classList.contains('inmenu')||(RL.open&&RL.hpick);if(!inM||(typeof DLG!=='undefined'&&DLG.on)||(typeof INTRO!=='undefined'&&INTRO.on))return;try{sfx('uih');}catch(er){}},true);}


