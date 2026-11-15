// ==================== v352 · SALIDA DEL COFRE Y DEL PAQUETE (Mesa «cofresal», aprobada por Nogal 15-nov) ====================
// Al elegir una reliquia: la elegida brilla y vuela a la fila de reliquias (abajo a la izquierda); las otras dos vuelven
// al cofre o al paquete. Fantástica: el cartel se recoge hacia arriba, la tapa se cierra de golpe y el cofre se hunde.
// Distópica: estela cian, los laterales se cierran, la pantalla de neón se apaga y el paquete se «desmaterializa».
// Después se aplica la elección como siempre. Un clic durante la salida la termina al momento.
const CFOUT={on:false,go:null};
function cfExit(rl,card,btn){if(CFOUT.on)return;CFOUT.on=true;rl.dataset.ready='0';const e2=rl.classList.contains('cfe2'),red=matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
 const cards=[...rl.querySelectorAll('.cgrid .rcard')],sign=rl.querySelector('.cfsign'),fx=rl.querySelector('.cofx'),tip=rl.querySelector('.cftip');if(tip)tip.classList.remove('on');
 let fin=false;const finish=()=>{if(fin)return;fin=true;CFOUT.on=false;CFOUT.go=null;rl.style.opacity='';rl.style.transition='';try{btn.click();}catch(e){}};
 if(red){finish();return;}
 CFOUT.go=finish;
 cards.forEach(c=>c.getAnimations().forEach(a=>a.cancel()));
 const glow=e2?'rgba(63,232,255,.95)':'rgba(255,214,110,.9)';
 // destino: la fila de reliquias (o, si no se ve, abajo a la izquierda)
 // destino: el «Cofre de reliquias» de al lado (si se ve); si no, la fila de reliquias del mapa; si no, abajo a la izquierda
 const vis=e=>e&&e.offsetWidth&&getComputedStyle(e).visibility!=='hidden';const mz=[...document.querySelectorAll('.mzr')].find(vis),bar=$('relics');
 let tx=40,ty=innerHeight-40;if(mz){const r=mz.getBoundingClientRect(),sl=mz.querySelectorAll('img,svg,.rl,i,span').length;tx=r.left+r.width/2;ty=r.top+r.height*.62;}else if(vis(bar)){const r=bar.getBoundingClientRect();tx=r.left+30;ty=r.top+r.height/2;}
 const fb=fx?fx.getBoundingClientRect():rl.getBoundingClientRect(),hx=fb.left+fb.width/2,hy=fx?fb.top+fb.height-90:innerHeight*.8;
 cards.forEach((c,i)=>{const b=c.getBoundingClientRect(),cx=b.left+b.width/2,cy=b.top+b.height/2,r=getComputedStyle(c).getPropertyValue('--cfr')||'0deg';c.style.pointerEvents='none';
  if(c===card){c.style.zIndex=6;CFA(c,[{transform:`rotate(${r})`,filter:'drop-shadow(0 12px 20px rgba(0,0,0,.65))'},{transform:'rotate(0) scale(1.12)',filter:`drop-shadow(0 0 22px ${glow})`,offset:.3},{transform:`translate(${tx-cx}px,${ty-cy}px) rotate(-8deg) scale(.12)`,filter:`drop-shadow(0 0 12px ${glow})`,opacity:.9}],{duration:850,easing:'cubic-bezier(.5,0,.3,1)',fill:'forwards'});
   if(e2)for(let k=1;k<=3;k++){const g=c.cloneNode(true);g.removeAttribute('id');g.style.position='fixed';g.style.left=b.left+'px';g.style.top=b.top+'px';g.style.width=b.width+'px';g.style.height=b.height+'px';g.style.margin='0';g.style.pointerEvents='none';g.style.zIndex=5;g.style.filter=`drop-shadow(0 0 10px ${glow})`;document.body.appendChild(g);
    const an=CFA(g,[{transform:'scale(1)',opacity:0},{transform:'scale(1.05)',opacity:.35/k,offset:.3},{transform:`translate(${tx-cx}px,${ty-cy}px) scale(.12)`,opacity:0}],{duration:850,delay:k*55,easing:'cubic-bezier(.5,0,.3,1)',fill:'forwards'});if(an)an.onfinish=()=>g.remove();setTimeout(()=>g.remove(),1400);}}
  else CFA(c,[{transform:`rotate(${r})`,opacity:1},{transform:`translate(${(hx-cx)*.15}px,${(hy-cy)*.15-24}px) scale(1.03)`,opacity:1,offset:.3},{transform:`translate(${hx-cx}px,${hy-cy}px) rotate(${r==='0deg'?'0deg':'-30deg'}) scale(.1)`,opacity:0}],{duration:550,delay:120+i*70,easing:'cubic-bezier(.5,0,.6,1)',fill:'forwards'});});
 try{sfx('uix');}catch(e){}
 if(sign){sign.getAnimations().forEach(a=>{if(a.effect&&a.effect.getComputedTiming().iterations===Infinity)a.cancel();});const h=sign.querySelector('h3');if(h)h.getAnimations().forEach(a=>a.cancel());
  if(!e2)CFA(sign,[{opacity:1,transform:'translateY(0)'},{opacity:1,transform:'translateY(8px)',offset:.2},{opacity:0,transform:'translateY(-260px)'}],{duration:500,delay:150,easing:'ease-in',fill:'forwards'});
  else CFA(sign,[{opacity:1,transform:'scaleY(1)'},{opacity:1,transform:'scaleY(.05)',offset:.6},{opacity:0,transform:'scale(.02,.05)'}],{duration:400,delay:150,fill:'forwards'});}
 let end=1500;
 if(fx){fx.classList.remove('back');const pr=fx.querySelector('.cfprop');
  if(!e2){const ch=pr&&pr.querySelector('.chest'),lid=pr&&pr.querySelector('.lid3'),w=pr&&pr.querySelector('.wrap'),inn=pr&&pr.querySelector('.inner');
   if(ch){ch.getAnimations().forEach(a=>a.cancel());
    CFA(ch,[{transform:'translateY(0) scale(.62)'},{transform:'translateY(-70px) scale(.9)'}],{duration:350,delay:150,easing:'cubic-bezier(.3,.8,.4,1)',fill:'forwards'});
    if(lid){const l0=lid.getAnimations();CFA(lid,[{transform:'rotateX(108deg)'},{transform:'rotateX(-6deg)',offset:.8},{transform:'rotateX(0deg)'}],{duration:300,delay:720,easing:'cubic-bezier(.6,0,.9,.5)'});setTimeout(()=>l0.forEach(a=>a.cancel()),1050);}
    if(inn)CFA(inn,[{opacity:1},{opacity:0}],{duration:100,delay:900,fill:'forwards'});
    if(w)CFA(w,[{transform:'translateY(0) rotate(0)'},{transform:'translateY(6px) rotate(-1.5deg)'},{transform:'translateY(0) rotate(1deg)'},{transform:'translateY(0) rotate(0)'}],{duration:250,delay:1000});
    setTimeout(()=>{try{sfx('build');}catch(e){}},1000);
    CFA(ch,[{transform:'translateY(-70px) scale(.9)',opacity:1},{transform:'translateY(-90px) scale(.95)',opacity:1,offset:.25},{transform:'translateY(180px) scale(.35)',opacity:0}],{duration:550,delay:1350,easing:'cubic-bezier(.5,0,.8,.4)',fill:'forwards'});end=1950;}}
  else{const c=pr&&pr.querySelector('.crate'),s=c&&c.querySelector('svg'),hf=fx.querySelector('.hfx');
   if(c){c.getAnimations().forEach(a=>a.cancel());
    if(hf)CFA(hf,[{opacity:0},{opacity:.85,offset:.3},{opacity:0}],{duration:700,delay:100,fill:'forwards'});
    const pl=s.querySelector('.pnl'),pn=s.querySelector('.pnr');[pl,pn].forEach(p=>p&&p.getAnimations().forEach(a=>a.cancel()));
    if(pl)CFA(pl,[{transform:'rotate(-85deg)',opacity:0},{transform:'rotate(0)',opacity:1}],{duration:250,delay:750,easing:'cubic-bezier(.3,1.4,.5,1)',fill:'forwards'});
    if(pn)CFA(pn,[{transform:'rotate(85deg)',opacity:0},{transform:'rotate(0)',opacity:1}],{duration:250,delay:750,easing:'cubic-bezier(.3,1.4,.5,1)',fill:'forwards'});
    CFA(c,[{transform:'translateY(0) scale(1)',opacity:1,filter:'none'},{transform:'translateY(0) scale(1)',opacity:.35,filter:'drop-shadow(0 0 10px #3fe8ff) brightness(1.6)',offset:.12},{transform:'translateY(0) scale(1)',opacity:1,filter:'none',offset:.24},{transform:'translateY(0) scale(1)',opacity:.4,filter:'drop-shadow(0 0 14px #3fe8ff) brightness(1.8)',offset:.36},{transform:'translateY(-40px) scale(.55)',opacity:.8,filter:'drop-shadow(0 0 18px #3fe8ff) brightness(2)',offset:.7},{transform:'translateY(-90px) scale(.12,.02)',opacity:0,filter:'drop-shadow(0 0 24px #3fe8ff) brightness(3)'}],{duration:900,delay:1100,easing:'ease-in',fill:'forwards'});
    const fl=fx.querySelector('.cfflash');if(fl)CFA(fl,[{opacity:0},{opacity:.7,offset:.2},{opacity:0}],{duration:500,delay:1850,fill:'forwards'});end=2250;}}}
 // al final, la ventana se desvanece y se aplica la elección
 setTimeout(()=>{if(fin)return;rl.style.transition='opacity .3s';rl.style.opacity='0';},end-300);
 setTimeout(finish,end);}
document.addEventListener('click',e=>{const rl=$('relic');if(!rl||!rl.classList.contains('open')||!rl.classList.contains('cofre'))return;
 if(CFOUT.on){e.stopPropagation();e.preventDefault();if(CFOUT.go)CFOUT.go();return;}
 const card=e.target.closest&&e.target.closest('#relic .cgrid .rcard');if(!card)return;const btn=card.querySelector('[data-a="relic"]');if(!btn||!rl.querySelector('.cfsign'))return;
 if(e.isTrusted===false&&e.target===btn)return;/* el clic que lanzamos al final pasa tal cual */
 e.stopPropagation();e.preventDefault();cfExit(rl,card,btn);},true);
