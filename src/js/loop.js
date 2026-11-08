let last=performance.now();
function loop(t){
 const raw=Math.max(0,(t-last)/1000),rdt=Math.min(.05,raw);last=t;
 FPS.n++;FPS.t+=raw;if(FPS.t>=.5){FPS.v=Math.round(FPS.n/FPS.t);FPS.n=0;FPS.t=0;const fe=$('fps');if(fe){fe.style.display=OPT.fps?'block':'none';fe.textContent=FPS.v+' FPS';fe.style.color=FPS.v>=50?'#6fe07a':FPS.v>=30?'#f0c040':'#ff6b5e';}}
 const gon=S&&(S.hero||S.tut)&&S.round>=1&&S.phase!=='won'&&S.phase!=='lost'&&!document.body.classList.contains('inmenu');if(gon)GT.r+=Math.min(raw,3600);hoverTick(rdt);layoutSide();posFocus();ptipTick();$('relic').classList.toggle('blur',!!(RL.open&&!RL.hpick&&(RL.towo||RL.ev||(RL.choices&&RL.choices.length))));{const lk=!compOk();for(const b of document.querySelectorAll('[data-a="comp"]'))b.classList.toggle('lk',lk);}if(APAN.open)apanTick();document.body.classList.toggle('fpsx',!!OPT.fps);document.body.classList.toggle('ovl',!!(LB.open||RL.open||PMU.open||FO.open||$('endscr').classList.contains('open')));tryTowerOffer();hintTick(rdt);hpanTick();dnTick(rdt);
 const sp=S.speed,held=LB.open||RL.open||FO.open,forced=held||S.phase!=='wave',slw=(OPT.slow&&S.phase==='wave')?(HV.sl||0):0;
 const eff=((sp===0||held)?0:sp+(Math.min(sp,.25)-sp)*slw)*HQ.f;
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

