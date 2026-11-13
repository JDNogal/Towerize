const FF={on:false,t:0};
// panel de enemigos en el mapa (durante la oleada): tipo → cantidad, eliminados y por salir
const EMAP={t:0,sg:''};
function emapTick(raw){EMAP.t-=raw;if(EMAP.t>0)return;EMAP.t=.25;let el=document.getElementById('emap');
 const bld=S&&S.phase==='build'&&!S.tut,on=S&&(S.phase==='wave'||bld)&&OPT.emap!==false&&!PREVIEWING&&!document.body.classList.contains('inmenu');
 if(!on){if(el)el.classList.remove('on');EMAP.sg='';return;}
 if(!el){el=document.createElement('div');el.id='emap';lstack().prepend(el);}
 // en construcción: resumen de lo que saldrá en la próxima oleada (suma de los portales)
 if(bld){const c={};let n=0;for(const p of S.portals||[])for(const t in (p.plan||{})){const k=t==='wanted'?'elite':t;c[k]=(c[k]||0)+p.plan[t];n+=p.plan[t];}
  const ks=Object.keys(c).filter(k=>c[k]>0).sort((a,b)=>c[b]-c[a]),sg='B'+ks.map(k=>k+c[k]).join(',');if(!n){el.classList.remove('on');EMAP.sg='';return;}
  if(sg!==EMAP.sg){EMAP.sg=sg;el.innerHTML=`<div class="emh">${icU('m_swords','⚔️')} Próxima oleada <b>${n}</b></div>`+(ks.length?'<div class="eml">'+ks.map(k=>`<span data-tip="emap:${k}"><i class="emi" style="background:${ET[k]?ET[k].col:'#888'}">${enIc(k)?icHtml(enIc(k)):''}</i>×${c[k]}</span>`).join('')+'</div>':'')+'<div class="emf">Saldrán por los portales al empezar.</div>';}
  el.classList.add('on');return;}
 const c={};let n=0;for(const e of S.enemies)if(e.hp>0&&!e.leak){c[e.t]=(c[e.t]||0)+1;n++;}
 let q=0;for(const p of S.portals||[])q+=(p.q||[]).filter(x=>x!=='|').length;
 const ks=Object.keys(c).sort((a,b)=>c[b]-c[a]),sg=ks.map(k=>k+c[k]).join(',')+'|'+(S.wk||0)+'|'+q;
 if(sg!==EMAP.sg){EMAP.sg=sg;el.innerHTML=`<div class="emh">${icU('m_swords','⚔️')} En el mapa <b>${n}</b></div>`+(ks.length?'<div class="eml">'+ks.map(k=>`<span data-tip="emap:${k}"><i class="emi" style="background:${ET[k]?ET[k].col:'#888'}">${enIc(k)?icHtml(enIc(k)):''}</i>×${c[k]}</span>`).join('')+'</div>':'')+`<div class="emf">💀 ${S.wk||0} eliminados${q?` · ${q} por salir`:''}</div>`;}
 el.classList.add('on');}
// columna del margen izquierdo: contador de enemigos arriba y compras en cola debajo, centrados juntos en vertical
function rstack(){let c=document.getElementById('rstack');if(!c){c=document.createElement('div');c.id='rstack';document.body.appendChild(c);}return c;}
function lstack(){let c=document.getElementById('lstack');if(!c){c=document.createElement('div');c.id='lstack';document.body.appendChild(c);}return c;}

// el avance rápido automático empieza en la ronda 5: antes el camino es corto y las oleadas ya duran poco
const FFR0=5;
// ¿hay algún enemigo vivo al alcance de alguna torre, unidad o del héroe? (si no, el avance rápido acelera)
function ffIdle(){if(!S.enemies||!S.enemies.length){return S.portals&&S.portals.some(p=>p.q&&p.q.length);}
 const live=S.enemies.filter(e=>e.hp>0&&!e.leak);if(!live.length)return false;
 for(const t of S.list){const st=stats(t),r=(st.range||0)+1.5*K;for(const e of live)if(Math.hypot(e.x-t.x,e.y-t.y)<=r)return false;}
 const H=S.hero;if(H&&H.s&&H.s.hp>0){const r=(H.def.ranged?hsAt(H.id,H.lvl).range:(H.pt&&H.pt.alert||ALERT))+1.5*K;for(const e of live)if(Math.hypot(e.x-H.s.x,e.y-H.s.y)<=r)return false;}
 for(const e of live)if(Math.hypot(e.x-S.core.x,e.y-S.core.y)<=4*K)return false;
 return true;}
let last=performance.now();
function loop(t){
 const raw=Math.max(0,(t-last)/1000),rdt=Math.min(.05,raw);last=t;
 FPS.n++;FPS.t+=raw;if(FPS.t>=.5){FPS.v=Math.round(FPS.n/FPS.t);FPS.n=0;FPS.t=0;const fe=$('fps');if(fe){fe.style.display=OPT.fps?'block':'none';fe.innerHTML=`<i style="background:${FPS.v>=50?'#6fe07a':FPS.v>=30?'#f0c040':'#ff6b5e'}"></i>${FPS.v} FPS`;/* junto al botón de menú */const ach=$('amzchip'),mb=ach&&ach.style.display!=='none'&&ach.offsetWidth?ach:document.querySelector('#mtl button');if(mb&&OPT.fps){const r=mb.getBoundingClientRect(),fz=parseFloat(getComputedStyle(fe).zoom)||1;fe.style.left=(r.right+8*fz)/fz+'px';fe.style.top=(r.top+(r.height-fe.offsetHeight*fz)/2)/fz+'px';fe.style.right='auto';}}}
 const gon=S&&(S.hero||S.tut)&&S.round>=1&&S.phase!=='won'&&S.phase!=='lost'&&!document.body.classList.contains('inmenu');if(gon)GT.r+=Math.min(raw,3600);try{heroCard();}catch(e){}try{emapTick(raw);}catch(e){}if(gon){/* héroe caído con una acción suya activa (moverlo, habilidad): se cancela para no bloquear el resto */const H=S.hero;if(H&&H.s&&H.s.hp<=0&&(S.aim==='hero'||S.aim==='habb'||S.aim==='habu')){S.aim=null;S.aimT=null;S.msg='';renderRelics();ui();}
 /* un enemigo junto al núcleo con el juego a más de ×1: se baja a ×1 para dar tiempo a reaccionar (una vez por enemigo) */
 if(S.phase==='wave'&&S.speed>1&&S.core&&!PREVIEWING){for(const e of S.enemies){if(e.hp>0&&!e.leak&&!e.nearC&&Math.hypot(e.x-S.core.x,e.y-S.core.y)<=1.6*K){e.nearC=1;S.lspd=1;S.speed=1;ui();toast('🐢 Velocidad ×1: un enemigo está a punto de llegar al núcleo.');break;}}}}hoverTick(rdt);layoutSide();posFocus();ptipTick();$('relic').classList.toggle('blur',!!(RL.open&&!RL.hpick&&(RL.towo||RL.ev||(RL.choices&&RL.choices.length))));{const lk=!compOk();for(const b of document.querySelectorAll('[data-a="comp"]'))b.classList.toggle('lk',lk);}if(APAN.open)apanTick();document.body.classList.toggle('ovl',!!(LB.open||RL.open||PMU.open||FO.open||$('endscr').classList.contains('open')));tryTowerOffer();hintTick(rdt);hpanTick();dnTick(rdt);
 const sp=S.speed,held=LB.open||RL.open||FO.open||(typeof NEC!=='undefined'&&NEC.open),forced=held||S.phase!=='wave',slw=(OPT.slow&&S.phase==='wave')?(HV.sl||0):0;
 // avance rápido: nadie en rango de torres ni del héroe → ×3 (se calcula cada cuarto de segundo)
 if(S.phase==='wave'&&OPT.ffwd!==false&&sp>0&&sp<3&&!held&&!PREVIEWING&&S.round>=FFR0){FF.t-=raw;if(FF.t<=0){FF.t=.25;FF.on=ffIdle();}}else FF.on=false;
 const sp2=FF.on&&!slw?3:sp;
 {let fe=document.getElementById('ffwd');if(FF.on&&!fe){fe=document.createElement('div');fe.id='ffwd';fe.textContent='⏩ ×3 · ningún enemigo a tiro';document.body.appendChild(fe);}if(fe)fe.classList.toggle('on',FF.on);}
 const eff=((sp===0||held)?0:sp2+(Math.min(sp2,.25)-sp2)*slw)*HQ.f;
 const st=forced?'F':(OPT.slow&&sp>.25&&slw>=.95?'S':'N');if(st!==SPA){SPA=st;markSpeed();}
 if(gon)GT.c+=rdt*eff;update(rdt*eff);try{camTick(rdt);camAuto();}catch(e){}prevStep(rdt);hpkPrevStep(rdt);relicTick();draw();try{tmTick();}catch(e){}try{bmTick();}catch(e){}requestAnimationFrame(loop);
}
$('game').className='pm-'+PM;
setDsk();addEventListener('resize',setDsk);
// Radagast: se desbloquea al ganar la primera partida, sea el tutorial o una partida normal (quien se salta el tutorial también lo consigue)
const RADLOCK='Gana tu primera partida (el tutorial cuenta).';
function radOk(){try{if(localStorage.getItem('rt-tutdone')||localStorage.getItem('rt-win1'))return true;
 /* quien ya ganó antes de existir este registro (victorias por héroe, logro «Primera victoria» o más rondas desbloqueadas) también lo tiene */
 const old=(typeof HWIN!=='undefined'&&Object.values(HWIN).some(v=>v>0))||(typeof ACHS!=='undefined'&&ACHS.first)||(typeof RUNL!=='undefined'&&RUNL>15);
 if(old){localStorage.setItem('rt-win1','1');return true;}return false;}catch(e){return false;}}
function applyUnl(){
 if(OPT.u_hr||radOk())delete HEROES.radagast.lockTxt;else HEROES.radagast.lockTxt=RADLOCK;
 if(OPT.u_hr||ACHS.elem)delete HEROES.yrsa.lockTxt;else HEROES.yrsa.lockTxt=YLOCK;
 if(!OPT.u_rd)MR=Math.min(MR,rMax());}
applyUnl();

// móvil: el contador de enemigos va abajo en el centro, en una línea; los mensajes de abajo suben un poco para no taparlo
{const _e=emapTick;emapTick=function(){const r=_e.apply(this,arguments);const el=document.getElementById('emap');if(el){const m=document.body.classList.contains('mfs');
 if(m){if(el.parentNode!==document.body)document.body.appendChild(el);}else if(el.parentNode!==lstack())lstack().prepend(el);
 document.body.classList.toggle('emb',m&&el.classList.contains('on'));}return r;};}
