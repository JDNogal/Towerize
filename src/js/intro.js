// ---- pantallas de entrada: Claude → NogalDev → título (con el menú desenfocado detrás) ----
const INTRO={i:-1,t:0,on:true,fs:false};
function introGo(i){const el=$('intro');INTRO.i=i;INTRO.t=0;for(const s of el.querySelectorAll('.ist'))s.classList.toggle('on',+s.dataset.i===i);
 el.classList.toggle('dark',i<2);el.classList.toggle('ttl',i===2);el.querySelector('.iskip').style.display=i<2?'':'none';}
function introEnd(){INTRO.on=false;const el=$('intro');el.classList.remove('ttl');el.classList.add('out');setTimeout(()=>el.remove(),650);}
function introTap(){if(!INTRO.on)return;if(TOUCH&&FSOK&&OPT.fs&&!INTRO.fs){INTRO.fs=true;enterFS();}if(INTRO.i<0)return;if(INTRO.i<2)introGo(INTRO.i+1);else introEnd();}
$('intro').querySelector('.iskip').textContent=TOUCH?'Toca para saltar':'Haz clic o pulsa una tecla para saltar';$('intro').querySelector('.ipress').textContent=TOUCH?'Toca la pantalla para empezar':'Pulsa una tecla para empezar';
$('intro').addEventListener('click',e=>{e.stopPropagation();introTap();});
addEventListener('keydown',e=>{if(!INTRO.on)return;e.preventDefault();e.stopImmediatePropagation();if(!e.repeat)introTap();},true);
(function introTick(){if(!INTRO.on)return;const rot=$('rot'),blocked=rot&&getComputedStyle(rot).display!=='none';
 if(!blocked){if(INTRO.i<0)introGo(0);else if(INTRO.i<2){INTRO.t+=.1;if(INTRO.t>=3.2)introGo(INTRO.i+1);}}
 setTimeout(introTick,100);})();
$('rotfs').addEventListener('click',()=>{INTRO.fs=true;});

applyPal();

{const _ro=renderOpts;renderOpts=function(){_ro();if(OP.tab==='ps')cosmPaint();};}
