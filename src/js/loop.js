const FF={on:false,t:0};
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
 FPS.n++;FPS.t+=raw;if(FPS.t>=.5){FPS.v=Math.round(FPS.n/FPS.t);FPS.n=0;FPS.t=0;const fe=$('fps');if(fe){fe.style.display=OPT.fps?'block':'none';fe.innerHTML=`<i style="background:${FPS.v>=50?'#6fe07a':FPS.v>=30?'#f0c040':'#ff6b5e'}"></i>${FPS.v} FPS`;/* junto al botón de menú */const mb=document.querySelector('#mtl button');if(mb&&OPT.fps){const r=mb.getBoundingClientRect();fe.style.left=(r.right+8)+'px';fe.style.top=(r.top+(r.height-fe.offsetHeight)/2)+'px';fe.style.right='auto';}}}
 const gon=S&&(S.hero||S.tut)&&S.round>=1&&S.phase!=='won'&&S.phase!=='lost'&&!document.body.classList.contains('inmenu');if(gon)GT.r+=Math.min(raw,3600);try{heroCard();}catch(e){}if(gon){/* héroe caído con una acción suya activa (moverlo, habilidad): se cancela para no bloquear el resto */const H=S.hero;if(H&&H.s&&H.s.hp<=0&&(S.aim==='hero'||S.aim==='habb'||S.aim==='habu')){S.aim=null;S.aimT=null;S.msg='';renderRelics();ui();}
 /* un enemigo junto al núcleo con el juego a más de ×1: se baja a ×1 para dar tiempo a reaccionar (una vez por enemigo) */
 if(S.phase==='wave'&&S.speed>1&&S.core&&!PREVIEWING){for(const e of S.enemies){if(e.hp>0&&!e.leak&&!e.nearC&&Math.hypot(e.x-S.core.x,e.y-S.core.y)<=1.6*K){e.nearC=1;S.lspd=1;S.speed=1;ui();toast('🐢 Velocidad ×1: un enemigo está a punto de llegar al núcleo.');break;}}}}hoverTick(rdt);layoutSide();posFocus();ptipTick();$('relic').classList.toggle('blur',!!(RL.open&&!RL.hpick&&(RL.towo||RL.ev||(RL.choices&&RL.choices.length))));{const lk=!compOk();for(const b of document.querySelectorAll('[data-a="comp"]'))b.classList.toggle('lk',lk);}if(APAN.open)apanTick();document.body.classList.toggle('ovl',!!(LB.open||RL.open||PMU.open||FO.open||$('endscr').classList.contains('open')));tryTowerOffer();hintTick(rdt);hpanTick();dnTick(rdt);
 const sp=S.speed,held=LB.open||RL.open||FO.open,forced=held||S.phase!=='wave',slw=(OPT.slow&&S.phase==='wave')?(HV.sl||0):0;
 // avance rápido: nadie en rango de torres ni del héroe → ×3 (se calcula cada cuarto de segundo)
 if(S.phase==='wave'&&OPT.ffwd!==false&&sp>0&&sp<3&&!held&&!PREVIEWING){FF.t-=raw;if(FF.t<=0){FF.t=.25;FF.on=ffIdle();}}else FF.on=false;
 const sp2=FF.on&&!slw?3:sp;
 {let fe=document.getElementById('ffwd');if(FF.on&&!fe){fe=document.createElement('div');fe.id='ffwd';fe.textContent='⏩ ×3 · ningún enemigo a tiro';document.body.appendChild(fe);}if(fe)fe.classList.toggle('on',FF.on);}
 const eff=((sp===0||held)?0:sp2+(Math.min(sp2,.25)-sp2)*slw)*HQ.f;
 const st=forced?'F':(OPT.slow&&sp>.25&&slw>=.95?'S':'N');if(st!==SPA){SPA=st;markSpeed();}
 if(gon)GT.c+=rdt*eff;update(rdt*eff);prevStep(rdt);hpkPrevStep(rdt);relicTick();draw();try{tmTick();}catch(e){}try{bmTick();}catch(e){}requestAnimationFrame(loop);
}
$('game').className='pm-'+PM;
setDsk();addEventListener('resize',setDsk);
function applyUnl(){let td=null;try{td=localStorage.getItem('rt-tutdone');}catch(e){}
 if(OPT.u_hr||td)delete HEROES.radagast.lockTxt;else HEROES.radagast.lockTxt='Completa el tutorial completo.';
 if(OPT.u_hr||ACHS.elem)delete HEROES.yrsa.lockTxt;else HEROES.yrsa.lockTxt=YLOCK;
 if(!OPT.u_rd)MR=Math.min(MR,rMax());}
applyUnl();

