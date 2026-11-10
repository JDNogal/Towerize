// ---- v298 · Recordar vales y tickets en el propio botón de mejorar ----
// Si no te llega el oro para mejorar (o para una habilidad) y tienes un vale que vale para esa torre, el botón lo ofrece:
// el precio cambia por «Usar ticket», el primer toque marca (y avisa 2 s) y el segundo lo gasta ahí mismo.
// Si te llega el oro, el botón cobra oro como siempre y lleva una marquita del vale para recordarlo.
const VB={t:0};
function vbFor(t,x){if(!t||!S||!S.vch||!x)return null;const T=TW[t.type];
 if(x.k==='up'&&!T.uniq&&!T.guild){for(const ty of['up','l3'])if(S.vch[ty]>0&&vchOk(ty,t))return ty;return null;}
 if(x.k==='abuy'&&x.c!=null&&!x.lk&&S.vch.ab>0&&vchOk('ab',t))return'ab';
 return null;}
const vbPoor=x=>x.c!=null&&x.c>0&&S.gold<x.c;
{const _o=tmOpts;tmOpts=function(t){const o=_o.apply(this,arguments);try{for(const x of o.top){const ty=vbFor(t,x);if(ty)x.vch=ty;}}catch(e){}return o;};}
function vbDeco(){const m=$('tmenu'),t=TM.t;if(!m||!t||!m._o)return;
 for(const b of m.querySelectorAll('.tmb')){const x=m._o.top.find(o=>tmKey(o)===b.dataset.k);const ty=x&&S.vch&&S.vch[x.vch]>0?x.vch:null;
  let bd=b.querySelector('.tvch');if(!ty){if(bd)bd.remove();b.classList.remove('vch');continue;}
  if(!bd){bd=document.createElement('span');bd.className='tvch';b.appendChild(bd);}if(bd.textContent!==VCH[ty].ic)bd.textContent=VCH[ty].ic;
  const poor=vbPoor(x);b.classList.toggle('vch',poor);if(poor)b.classList.remove('no');
  const p=b.querySelector('.p');if(p){const want=poor?'Usar '+(ty==='up'||ty==='ab'||ty==='l3'?'ticket':'vale'):(x.c?x.c+' 🪙':'gratis');if(p.textContent!==want)p.textContent=want;}}}
{const _t=tmTick;tmTick=function(){const r=_t.apply(this,arguments);try{if(tmVis())vbDeco();else vbHide();}catch(e){}return r;};}
function vbUse(t,x){const ty=x.vch;if(!(S.vch[ty]>0))return false;
 if(x.k==='up'){if(!vchOk(ty,t))return false;lvUp(t);S.vch[ty]--;S.msg=tinfo(t).n+' sube a Nv '+t.lvl+' con tu '+VCH[ty].n+'.';S.fx.push({x:t.x,y:t.y,t:.6,m:.6,r:1.5*K,col:'#ffd75a'});}
 else{const id=x.v,D=AB[id];if(!vchOk('ab',t)||abReq(t,id)||(t.ab[id]||0)>=D.ranks.length)return false;t.ab[id]=(t.ab[id]||0)+1;if(t.ab[id]===1)t.acd[id]=0;S.vch.ab--;S.msg=tinfo(t).n+': '+D.n+' (rango '+t.ab[id]+') con tu '+VCH.ab.n+'.';S.fx.push({x:t.x,y:t.y,t:.6,m:.6,r:1.5*K,col:'#ff4fd8'});try{chapaCheck(t);}catch(e){}}
 try{sfx('up');}catch(e){}try{refreshPrim();}catch(e){}renderRelics();return true;}
{const _d=tmDo;tmDo=function(b,direct){const t=TM.t,m=$('tmenu');if(t&&m&&m._o&&(b.dataset.tm==='up'||b.dataset.tm==='abuy')){const x=m._o.top.find(o=>tmKey(o)===b.dataset.k);
  if(x&&x.vch&&vbPoor(x)&&!placeLock()&&vbUse(t,x)){TM.arm=null;TM.sig='';vbHide();ui();return;}}return _d.apply(this,arguments);};}
function vbHide(){const n=$('tmvch');if(n)n.classList.remove('on');}
function vbNote(b,ty){let n=$('tmvch');if(!n){n=document.createElement('div');n.id='tmvch';$('cw').appendChild(n);}
 n.textContent='Puedes usar tu '+VCH[ty].n;n.style.left=b.style.left;{const y=parseFloat(b.style.top)-58;n.style.top=(y<64?parseFloat(b.style.top)+44:y)+'px';}n.classList.add('on');clearTimeout(VB.t);VB.t=setTimeout(vbHide,2000);}
{const _c=tmClick;tmClick=function(b){const k=b.dataset.k,was=TM.arm;const r=_c.apply(this,arguments);try{const m=$('tmenu');if(TM.arm===k&&was!==k&&m&&m._o){const x=m._o.top.find(o=>tmKey(o)===k);if(x&&x.vch&&S.vch[x.vch]>0&&vbPoor(x))vbNote(b,x.vch);}}catch(e){}return r;};}
// la tarjeta del botón: en vez de «Te faltan X», explica que se puede pagar con el vale
{const _c=tmCard;tmCard=function(){const r=_c.apply(this,arguments);try{const c=$('tmcard'),m=$('tmenu'),k=TM.arm||TM.hov;if(c&&m&&m._o&&k){const x=m._o.top.find(o=>tmKey(o)===k);
  if(x&&x.vch&&S.vch[x.vch]>0&&vbPoor(x)){const cf=c.querySelector('.cf');const txt=(TM.arm===k?'Pulsa otra vez para usar tu ':'No te llega el oro: puedes usar tu ')+VCH[x.vch].n;if(cf&&cf.textContent!==txt){cf.textContent=txt;cf.classList.remove('no');cf.classList.add('vch');c._h=null;}}}}catch(e){}return r;};}
