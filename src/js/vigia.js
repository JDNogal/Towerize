// ==================== v329 · Apoyo «Vigía» (Nogal, 14-nov) ====================
// · En la línea de rondas, el bocadillo de las 2 rondas siguientes dice qué escuadras vienen y cuántos enemigos de cada tipo.
// · Para que lo que ves sea lo que llega, las escuadras de esas rondas se deciden por adelantado y se guardan (S.vigW).
// · Si tienes activado «Tooltips de portales abiertos en fase de construcción», en la preparación también se abren solos.
//   Durante la oleada, solo al pasar el ratón.
function vigOn(){return typeof apOn==='function'&&apOn('vig');}
{const _ws=waveSquads;waveSquads=function(r){try{if(vigOn()&&S.vigW&&S.vigW[r]){const w=S.vigW[r];S.lastTh=w.th.slice();return w.out.slice();}}catch(e){}return _ws.apply(this,arguments);};
 // reparte las escuadras de las rondas que faltan hasta r (encadenando las de la ronda anterior, como el juego normal)
 window.vigPlan=function(r){if(!vigOn()||r>ROUNDS)return null;S.vigW=S.vigW||{};if(S.vigW[r])return S.vigW[r];
  const made=S.mpR===S.round,k0=made?S.round+1:S.round,keep=(S.lastTh||[]).slice();
  for(let k=k0;k<=r;k++){if(S.vigW[k]){S.lastTh=S.vigW[k].th.slice();continue;}const out=_ws(k);S.vigW[k]={out,th:(S.lastTh||[]).slice()};}
  S.lastTh=keep;return S.vigW[r];};}
{const _mp=makePortals;makePortals=function(){const r=_mp.apply(this,arguments);try{if(S)S.mpR=S.round;}catch(e){}return r;};}
// lo que trae la ronda r: escuadras (agrupadas) y enemigos por tipo
function vigRows(r){const w=vigPlan(r);if(!w)return '';const cnt={},tot={};let i=0;const n=w.out.length;
 for(const sq of w.out){cnt[sq]=(cnt[sq]||0)+1;const tr=typeof sqTierOf==='function'?sqTierOf(i,n,r):0,m=typeof sqTierM==='function'?sqTierM(sq,tr,r):sqM(sq);i++;for(const t in m)tot[t]=(tot[t]||0)+m[t];}
 const sqs=Object.entries(cnt).map(([k,c])=>`${(SQUADS[k]&&SQUADS[k].n)||k}${c>1?' ×'+c:''}`).join(' · ');
 const types=Object.entries(tot).sort((a,b)=>b[1]-a[1]);
 return `<div class="vigb"><div class="vigt">${typeof icU==='function'?icU('m_eye',''):''}Vigía</div><div class="vigs">${sqs}</div>${rowHtml(types).replace('class="pbr"','class="pbr pbw"')}</div>`;}
{const _t=rtlTip;rtlTip=function(r){let h=_t.apply(this,arguments);try{const d=r-S.round;if(vigOn()&&d>=1&&d<=2)h+=vigRows(r);}catch(e){}return h;};}
// en la preparación, con los bocadillos de los portales siempre abiertos: también los del Vigía
function vigAuto(){let el=document.getElementById('vigauto');const on=vigOn()&&OPT.ptip&&S&&S.phase==='build'&&!RL.open&&!LB.open&&!document.body.classList.contains('inmenu')&&document.getElementById('rtl')&&document.getElementById('rtl').classList.contains('on');
 if(!on){if(el)el.style.display='none';return;}
 if(!el){el=document.createElement('div');el.id='vigauto';document.body.appendChild(el);}
 const rs=[1,2].map(d=>S.round+d).filter(r=>r<=ROUNDS),dots=rs.map(r=>document.querySelector(`#rtl [data-tip="rtl:${r}"]`)).filter(Boolean);if(!dots.length||!(dots[0].getBoundingClientRect().width>0)){el.style.display='none';return;}
 const b0=dots[0].getBoundingClientRect(),b1=dots[dots.length-1].getBoundingClientRect(),x=Math.round((b0.left+b1.right)/2),y=Math.round(Math.max(b0.bottom,b1.bottom)+8);
 const h=`<div class="viga" style="left:${x}px;top:${y}px">${rs.map(r=>`<div><b>Ronda ${r}</b>${vigRows(r)}</div>`).join('')}</div>`;
 if(el.dataset.h!==h){el.dataset.h=h;el.innerHTML=h;}el.style.display='';}
if(typeof window!=='undefined')setInterval(()=>{try{vigAuto();}catch(e){}},250);
