// ==================== v305 · Línea de rondas ====================
// Bajo la barra de arriba: 5 puntos (esta ronda y las 4 siguientes) que van rotando; la línea hasta el siguiente punto se rellena
// según avanza la oleada. Cada punto dice lo que trae esa ronda: jefe (calavera roja), élite (delante) y mini-élites (a los lados).
const RTL={sg:'',N:5};
// qué trae la ronda r: {boss, el, mi, ex:[tipos extra de eventos]}
function rtlInfo(r){const o={boss:false,el:0,mi:0,ex:[]};if(!S||S.tut)return o;
 // la ronda que está por salir: lo que de verdad hay en los portales
 if(r===S.round&&S.phase==='build'&&S.portals&&S.portals.length){for(const p of S.portals)for(const t in p.plan||{}){const n=p.plan[t]||0;if(!n)continue;
   if(isBoss({t}))o.boss=true;else if(t==='elite'||t==='wanted')o.el+=n;else if(t==='mini')o.mi+=n;else if(ET[t]&&ET[t].evn)o.ex.push(t);}
  if(bossRound(r))o.boss=true;return o;}
 if(bossRound(r)){o.boss=true;return o;}
 const E=ELITES[r]||{};o.el+=E.elite||0;o.mi+=E.mini||0;
 for(const sc of S.sched||[])if(sc.r===r)for(const k in sc.add){if(k==='wanted'||k==='elite')o.el+=sc.add[k];else if(k==='mini')o.mi+=sc.add[k];else o.ex.push(k);}
 return o;}
const rtlEnIc=(k,cls)=>{const ok=typeof seen!=='function'||seen('en',k);const ic=ok&&enIc(k)?icHtml(enIc(k)):'?';return `<i class="rti ${cls}" style="--c:${ET[k]?ET[k].col:'#888'}">${ic}</i>`;};
function rtlDot(r){const o=rtlInfo(r);let h='',c='';
 if(o.boss){c='b';h='<i class="rti boss">💀</i>';}
 else if(o.el||o.mi||o.ex.length){c='x';const front=o.el?'elite':o.ex.length?o.ex[0]:'mini';
  const sides=o.el||o.ex.length?(o.mi>=2?['mini','mini']:o.mi===1?['mini']:[]):(o.mi>=2?['mini']:[]);
  if(sides[0])h+=rtlEnIc('mini','sl');if(sides[1])h+=rtlEnIc('mini','sr');h+=rtlEnIc(front,'fr');}
 return {c,h,o};}
// progreso de la oleada en curso (0 a 1)
function rtlProg(){if(!S||S.phase!=='wave')return 0;const N=S.rtlN||0;if(!N)return 0;let left=0;for(const e of S.enemies||[])if(e.hp>0&&!e.leak)left++;for(const p of S.portals||[])left+=(p.q||[]).filter(x=>x!=='|').length;return Math.max(0,Math.min(1,1-left/N));}
{const _sw=startWave;startWave=function(){const was=S&&S.phase;const r=_sw.apply(this,arguments);try{if(was!=='wave'&&S.phase==='wave'){let n=0;for(const p of S.portals||[])for(const t in p.plan||{})n+=p.plan[t]||0;S.rtlN=n;}}catch(e){}return r;};}
function rtlTick(){let el=document.getElementById('rtl');
 const on=S&&!S.tut&&(S.phase==='build'||S.phase==='wave'||S.phase==='place'||S.phase==='reward')&&!PREVIEWING&&!S.pvE&&!S.pvH&&!document.body.classList.contains('inmenu');
 if(!on){if(el)el.classList.remove('on');document.body.classList.remove('rtlon');RTL.sg='';return;}
 if(!el){el=document.createElement('div');el.id='rtl';document.body.appendChild(el);}
 const r0=Math.max(1,Math.min(S.round,ROUNDS)),r1=Math.min(ROUNDS,r0+RTL.N-1),p=rtlProg();
 const dots=[];for(let r=r0;r<=r1;r++)dots.push([r,rtlDot(r)]);
 const sg=r0+'|'+S.phase+'|'+dots.map(([r,d])=>d.c+d.h).join(',');
 if(sg!==RTL.sg){RTL.sg=sg;let h='';
  if(r0>1)h+=`<span class="rtm">${r0-1}◂</span>`;
  dots.forEach(([r,d],i)=>{h+=`<div class="rtd ${d.c}${r===r0?' cur':''}" data-tip="rtl:${r}"><span class="rtb">${d.h}</span><span class="rtn">${r}</span></div>`;if(i<dots.length-1)h+=`<div class="rts${i===0?' now':''}"><i></i></div>`;});
  if(r1<ROUNDS)h+=`<span class="rtm">▸${ROUNDS-r1}</span>`;
  el.innerHTML=h;}
 const f=el.querySelector('.rts.now i');if(f)f.style.width=Math.round(p*100)+'%';
 el.classList.add('on');document.body.classList.add('rtlon');}
if(typeof window!=='undefined')setInterval(()=>{try{rtlTick();}catch(e){}},200);
// bocadillo de cada punto
function rtlTip(r){const{o}=rtlDot(r),d=r-S.round,w=d<=0?(S.phase==='wave'?'en curso':'esta ronda'):d===1?'la próxima':'dentro de '+d+' rondas';
 const L=[];if(o.boss)L.push('💀 <b>Jefe</b>'+(r===ROUNDS?' final':''));if(o.el)L.push('Élite'+(o.el>1?' ×'+o.el:''));if(o.mi)L.push('Mini-élite'+(o.mi>1?' ×'+o.mi:''));
 for(const k of o.ex)L.push((typeof seen==='function'&&!seen('en',k))?'???':(ET[k]||{}).n||k);
 return `<div class="ttl"><b>Ronda ${r}</b> · ${w}</div><small style="margin:0">${L.length?L.join('<br>'):'Sin élites ni jefe.'}</small>`;}
{const _rs=resolve;resolve=function(el){const d=el&&el.closest&&el.closest('[data-tip^="rtl:"]');if(d){const r=+d.dataset.tip.slice(4),b=d.getBoundingClientRect();return{key:'rtl:'+r+':'+RTL.sg,html:()=>rtlTip(r),rect:{l:b.left,t:b.top,r:b.right,b:b.bottom},dom:1};}return _rs.apply(this,arguments);};}
