// ==================== v329 · Cofre y paquete de ayuda sin marco (Nogal, 14-nov-2026) ====================
// Maqueta aprobada: maquetas/cofre_sin_marco.html (v4 + luz ancha en la era 2 + bocadillo de reliquia centrado).
// · Sin pergamino ni dron: las 3 reliquias flotan en abanico, reaccionan al ratón y el título es un cartel
//   (dos tablones colgados que caen y rebotan en la Fantástica; pantalla de neón colgada en la Distópica).
// · Si vienes de un cofre del mapa: animación. Fantástica: el cofre entra grande, tiembla, la tapa se abre en 3D con un
//   destello a toda pantalla y se echa atrás mientras salen las cartas. Distópica: un paquete S.O.S cae en paracaídas al
//   centro, se abren los laterales con un cono de luz cian y se echa atrás. Un clic la salta.
// · La frase de los activos pasa a un bocadillo centrado abajo, que solo sale cuando han terminado de salir las tres.
const CFX={CB:`<svg viewBox="0 0 220 130" width="220" height="130"><defs>
<linearGradient id="wd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a8692f"/><stop offset="1" stop-color="#6e3f1a"/></linearGradient>
<linearGradient id="ir" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9c46a"/><stop offset=".5" stop-color="#c8923a"/><stop offset="1" stop-color="#8a5e1e"/></linearGradient>
<radialGradient id="gl" cx=".5" cy="0" r=".9"><stop offset="0" stop-color="#fff6c8"/><stop offset=".4" stop-color="#ffd25a" stop-opacity=".9"/><stop offset="1" stop-color="#ffb030" stop-opacity="0"/></radialGradient></defs>
<g class="inner" opacity="0" style="display:none"><path d="M14 6 H206 L200 26 H20Z" fill="#2a160a"/><ellipse cx="110" cy="16" rx="80" ry="12" fill="url(#gl)"/><g fill="#ffd75a" stroke="#8a5e1e" stroke-width="1.5"><circle cx="78" cy="18" r="6"/><circle cx="92" cy="14" r="6"/><circle cx="130" cy="17" r="6"/><circle cx="144" cy="13" r="6"/><circle cx="112" cy="20" r="6"/></g></g>
<rect x="10" y="6" width="200" height="118" rx="6" fill="url(#wd)" stroke="#2e1708" stroke-width="5"/>
<g stroke="#4a260e" stroke-width="2.5" opacity=".7"><path d="M12 45 H208 M12 85 H208"/></g>
<g stroke="#2e1708" stroke-width="1.2" opacity=".35" fill="none"><path d="M30 20 q20 6 40 0 M120 60 q25 -6 50 0 M40 100 q20 5 45 -2 M140 108 q18 4 36 0"/></g>
<rect x="34" y="6" width="22" height="118" fill="url(#ir)" stroke="#2e1708" stroke-width="3"/><rect x="164" y="6" width="22" height="118" fill="url(#ir)" stroke="#2e1708" stroke-width="3"/>
<g fill="#5a3a12"><circle cx="45" cy="18" r="2.6"/><circle cx="45" cy="48" r="2.6"/><circle cx="45" cy="78" r="2.6"/><circle cx="45" cy="108" r="2.6"/><circle cx="175" cy="18" r="2.6"/><circle cx="175" cy="48" r="2.6"/><circle cx="175" cy="78" r="2.6"/><circle cx="175" cy="108" r="2.6"/></g>
<path d="M10 6 h18 v18 M210 6 h-18 v18 M10 124 h18 v-18 M210 124 h-18 v-18" fill="none" stroke="#c8923a" stroke-width="6"/>
<g class="lock"><path d="M92 4 H128 V44 Q128 58 110 62 Q92 58 92 44Z" fill="url(#ir)" stroke="#2e1708" stroke-width="3.5"/><circle cx="110" cy="26" r="6.5" fill="#1b0e05"/><path d="M106.5 28 L104 44 H116 L113.5 28Z" fill="#1b0e05"/><circle cx="98" cy="12" r="2" fill="#5a3a12"/><circle cx="122" cy="12" r="2" fill="#5a3a12"/><path class="glint" d="M110 15 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z" fill="#fff" opacity="0"/></g></svg>`,CL:`<svg viewBox="0 0 220 80" width="220" height="80"><defs><linearGradient id="wd2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8783a"/><stop offset=".55" stop-color="#94592a"/><stop offset="1" stop-color="#6e3f1a"/></linearGradient>
<linearGradient id="ir2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9c46a"/><stop offset=".5" stop-color="#c8923a"/><stop offset="1" stop-color="#8a5e1e"/></linearGradient></defs>
<path d="M10 78 V44 Q10 8 110 6 Q210 8 210 44 V78Z" fill="url(#wd2)" stroke="#2e1708" stroke-width="5"/>
<g fill="none" stroke="#4a260e" stroke-width="2" opacity=".55"><path d="M12 62 H208"/><path d="M14 46 Q110 40 206 46"/><path d="M24 28 Q110 14 196 28"/></g>
<g fill="none" stroke="#2e1708" stroke-width="1.1" opacity=".3"><path d="M60 70 q14 -4 28 0 M140 54 q16 -4 30 0 M70 36 q12 -3 26 0"/></g>
<path d="M34 78 V20 Q38 12 56 9 V78Z" fill="url(#ir2)" stroke="#2e1708" stroke-width="3"/><path d="M186 78 V20 Q182 12 164 9 V78Z" fill="url(#ir2)" stroke="#2e1708" stroke-width="3"/>
<g fill="#5a3a12"><circle cx="45" cy="26" r="2.4"/><circle cx="45" cy="50" r="2.4"/><circle cx="45" cy="70" r="2.4"/><circle cx="175" cy="26" r="2.4"/><circle cx="175" cy="50" r="2.4"/><circle cx="175" cy="70" r="2.4"/></g>
<path d="M10 78 h18 v-16 M210 78 h-18 v-16" fill="none" stroke="#c8923a" stroke-width="6"/>
<path d="M100 60 H120 V84 Q120 92 110 94 Q100 92 100 84Z" fill="url(#ir2)" stroke="#2e1708" stroke-width="3"/><rect x="105" y="74" width="10" height="12" rx="3" fill="none" stroke="#2e1708" stroke-width="2.5"/></svg>`,CLI:`<svg viewBox="0 0 220 64" width="220" height="64"><defs><linearGradient id="lif" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a2810"/><stop offset=".7" stop-color="#7a4820"/><stop offset="1" stop-color="#c8843e"/></linearGradient></defs>
<rect x="6" y="2" width="208" height="60" rx="3" fill="url(#lif)" stroke="#2e1708" stroke-width="5"/><g stroke="#2e1708" stroke-width="1.5" opacity=".45"><path d="M8 22H212M8 42H212"/></g>
<rect x="34" y="2" width="22" height="60" fill="#5a3a12" stroke="#2e1708" stroke-width="2.5"/><rect x="164" y="2" width="22" height="60" fill="#5a3a12" stroke="#2e1708" stroke-width="2.5"/><rect x="8" y="50" width="204" height="10" fill="#ffd27a" opacity=".35"/></svg>`,CM:`<svg viewBox="0 0 220 64" width="220" height="64"><defs><radialGradient id="mg" cx=".5" cy=".95" r=".8"><stop offset="0" stop-color="#fff2b0"/><stop offset=".35" stop-color="#ffc848"/><stop offset="1" stop-color="#3a1e0a"/></radialGradient></defs>
<rect x="10" y="2" width="200" height="62" fill="#2a160a" stroke="#2e1708" stroke-width="4"/><rect x="16" y="6" width="188" height="56" fill="url(#mg)"/>
<g fill="#ffd75a" stroke="#8a5e1e" stroke-width="1.5"><ellipse cx="70" cy="48" rx="9" ry="5"/><ellipse cx="96" cy="42" rx="9" ry="5"/><ellipse cx="124" cy="50" rx="9" ry="5"/><ellipse cx="150" cy="44" rx="9" ry="5"/><ellipse cx="110" cy="34" rx="9" ry="5"/></g></svg>`,CR:`<svg viewBox="-120 -300 240 380" width="240" height="380" style="overflow:visible"><defs>
<linearGradient id="cw" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#46562f"/><stop offset=".5" stop-color="#5e7040"/><stop offset="1" stop-color="#3e4c2a"/></linearGradient>
<linearGradient id="cf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4726"/><stop offset="1" stop-color="#2a3420"/></linearGradient>
<linearGradient id="cn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ece6cc"/><stop offset="1" stop-color="#b8b090"/></linearGradient>
<clipPath id="cpan"><rect x="-44" y="-30" width="88" height="70"/></clipPath></defs>
<g class="chute" style="transform-origin:0px -110px">
 <path d="M-110 -200 Q-106 -284 0 -290 Q106 -284 110 -200 Q92 -190 73 -200 Q55 -190 37 -200 Q18 -190 0 -200 Q-18 -190 -37 -200 Q-55 -190 -73 -200 Q-92 -190 -110 -200Z" fill="url(#cn)" stroke="#6a6450" stroke-width="3"/>
 <g fill="#7a8a5a" opacity=".9"><path d="M-73 -200 Q-72 -270 -37 -284 Q-46 -250 -37 -200 Q-55 -190 -73 -200Z"/><path d="M37 -200 Q46 -250 37 -284 Q72 -270 73 -200 Q55 -190 37 -200Z"/></g>
 <path d="M-37 -284 Q-46 -250 -37 -200 M0 -290 V-200 M37 -284 Q46 -250 37 -200" stroke="#6a6450" stroke-width="2" fill="none"/>
 <path d="M-110 -200 L0 -112 M-73 -200 L0 -112 M-37 -200 L0 -112 M0 -200 L0 -112 M37 -200 L0 -112 M73 -200 L0 -112 M110 -200 L0 -112" stroke="#4a4636" stroke-width="1.4" fill="none"/>
 <circle cx="0" cy="-112" r="4" fill="#8a8470" stroke="#2a2a20" stroke-width="1.5"/>
 <path d="M0 -112 L-56 -48 M0 -112 L56 -48 M0 -112 L-22 -48 M0 -112 L22 -48" stroke="#2f3a22" stroke-width="3" fill="none"/></g>
<ellipse class="dustc" cx="0" cy="66" rx="110" ry="18" fill="#9a9a90" opacity="0"/>
<g class="beam" style="opacity:0;transform-origin:0 -46px"><path d="M-46 -46 L-150 -340 L150 -340 L46 -46Z" fill="#3fe8ff" opacity=".32"/><path d="M-20 -46 L-60 -340 L60 -340 L20 -46Z" fill="#bff8ff" opacity=".35"/></g>
<rect x="-60" y="-48" width="120" height="112" rx="5" fill="url(#cw)" stroke="#1c2416" stroke-width="5"/>
<rect x="-58" y="-46" width="116" height="16" fill="url(#cf)"/><rect x="-58" y="42" width="116" height="20" fill="url(#cf)"/>
<path d="M-60 -30 H60 M-60 42 H60" stroke="#1c2416" stroke-width="3"/>
<g clip-path="url(#cpan)"><g stroke="#2a3420" stroke-width="1.4" opacity=".55"><path d="M-22 -30 V42 M0 -30 V42 M22 -30 V42"/></g>
 <path d="M-44 -30 L44 42 M44 -30 L-44 42" stroke="#33402a" stroke-width="10" stroke-linecap="butt"/><path d="M-44 -30 L44 42 M44 -30 L-44 42" stroke="#566a3c" stroke-width="6"/></g>
<rect x="-44" y="-30" width="88" height="72" fill="none" stroke="#1c2416" stroke-width="2.5"/>
<g fill="#9aa48a" stroke="#1c2416" stroke-width="1.6"><path d="M-60 -48 h16 v6 h-10 v10 h-6z"/><path d="M60 -48 h-16 v6 h10 v10 h6z"/><path d="M-60 64 h16 v-6 h-10 v-10 h-6z"/><path d="M60 64 h-16 v-6 h10 v-10 h6z"/></g>
<g fill="#2a2a20"><circle cx="-36" cy="-38" r="2"/><circle cx="36" cy="-38" r="2"/><circle cx="-36" cy="52" r="2"/><circle cx="36" cy="52" r="2"/></g>
<rect x="-38" y="-9" width="76" height="32" rx="3" fill="#e2dac0" stroke="#1c2416" stroke-width="2.5"/><text x="0" y="15.5" font-size="22" font-family="Impact,'Arial Black',sans-serif" text-anchor="middle" fill="#b0261c" textLength="60" lengthAdjust="spacingAndGlyphs">S.O.S</text>
<g class="pnl" style="transform-origin:-60px 64px"><rect x="-60" y="-48" width="12" height="112" fill="#56683e" stroke="#1c2416" stroke-width="2.5"/></g>
<g class="pnr" style="transform-origin:60px 64px"><rect x="48" y="-48" width="12" height="112" fill="#56683e" stroke="#1c2416" stroke-width="2.5"/></g></svg>`};
const cfE2=()=>typeof era2G==='function'?era2G():document.body.classList.contains('era2g');
function cfSign(e2){return e2?'<div class="cfsign holo"><h3>Ayuda recibida</h3><small>Elige una reliquia para esta partida · juego en pausa</small></div>'
 :'<div class="cfsign perg"><div class="pk pk1"><i class="nl" style="left:8px;top:8px"></i><i class="nl" style="right:8px;top:8px"></i><i class="nl" style="left:8px;bottom:8px"></i><i class="nl" style="right:8px;bottom:8px"></i><h3>¡Cofre abierto!</h3></div><div class="pk pk2"><small>Elige una reliquia para esta partida. El juego está en pausa.</small></div></div>';}
const CFA=(el,kf,o)=>el&&el.animate?el.animate(kf,Object.assign({fill:'both',easing:'ease-out'},o)):null;
{const _rp=renderRelicPick;renderRelicPick=function(){const r=_rp.apply(this,arguments);try{cfDress();}catch(e){console.error(e);}return r;};}
function cfDress(){const rl=$('relic');if(!rl||!rl.querySelector('.rcard'))return;const e2=cfE2(),pp=rl.querySelector('.ppap')||rl;
 rl.classList.add('cofre');rl.classList.toggle('cfe2',e2);rl.dataset.ready='0';
 const t=pp.querySelector('.ptt'),st=pp.querySelector('.pst');if(t)t.style.display='none';if(st)st.style.display='none';
 const old=pp.querySelector('.cfsign');if(old)old.remove();pp.insertAdjacentHTML('afterbegin',cfSign(e2));
 for(const sm of pp.querySelectorAll(':scope>small'))if(/fila superior/.test(sm.textContent))sm.classList.add('cfhint');
 let tip=rl.querySelector('.cftip');if(!tip){rl.insertAdjacentHTML('beforeend','<div class="cftip"><b>Reliquia</b>Su <b class="ps">pasivo</b> funciona siempre. Su <b class="ac">activo</b> se usa desde la fila de reliquias y luego se enfría; mientras actúa, el pasivo se apaga un rato.</div>');tip=rl.querySelector('.cftip');}
 tip.classList.remove('on');
 const cards=[...rl.querySelectorAll('.cgrid .rcard')],n=cards.length;
 cards.forEach((c,i)=>{const r=n<2?0:(i-(n-1)/2)*(8/(n-1||1));c.style.setProperty('--cfr',r+'deg');
  c.onmouseenter=c.onmousemove=()=>{if(rl.dataset.ready==='1')tip.classList.add('on');};c.onmouseleave=()=>tip.classList.remove('on');});
 // ¿viene de un cofre del mapa? (RL.fromChest se pone justo después de abrir)
 cards.forEach(c=>c.classList.add('cfwait'));const sign=pp.querySelector('.cfsign');sign.style.opacity='0';
 setTimeout(()=>{if(!RL.open||!rl.classList.contains('cofre'))return;const chest=!!RL.fromChest;cfPlay(rl,cards,sign,e2,chest);},0);}
function cfPlay(rl,cards,sign,e2,chest){let fx=rl.querySelector('.cofx');if(fx)fx.remove();
 const T=s=>s*1000,red=matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
 const done=()=>{rl.dataset.ready='1';};
 const showCards=(t0,from)=>{cards.forEach((c,i)=>{c.classList.remove('cfwait');const r=getComputedStyle(c).getPropertyValue('--cfr')||'0deg';
   if(from&&!red){const b=c.getBoundingClientRect(),dx=from.x-(b.left+b.width/2),dy=from.y-(b.top+b.height/2);
    CFA(c,[{transform:`translate(${dx}px,${dy}px) scale(.1) rotate(0deg)`,opacity:0},{opacity:1,offset:.15},{transform:`translate(${dx*.08}px,${dy*.08-30}px) scale(1.06) rotate(${r})`,opacity:1,offset:.72},{transform:`rotate(${r})`,opacity:1}],{duration:600,delay:T(t0+i*.09),easing:'cubic-bezier(.2,.8,.3,1)'});}
   else CFA(c,[{opacity:0,transform:`translateY(20px) rotate(${r})`},{opacity:1,transform:`rotate(${r})`}],{duration:250,delay:i*60});
   if(!red)c.animate([{translate:'0 0'},{translate:'0 -6px'},{translate:'0 0'}],{duration:2600,delay:T(t0+.8)+i*350,iterations:Infinity,easing:'ease-in-out'});});
  setTimeout(done,from?T(t0+.18+.6):400);};
 const showSign=t0=>{sign.style.opacity='';if(red)return;if(!e2)CFA(sign,[{transform:'translateY(-260px) rotate(0)'},{transform:'translateY(0) rotate(0)',offset:.5},{transform:'translateY(-16px) rotate(2deg)',offset:.64},{transform:'translateY(0) rotate(-1.5deg)',offset:.78},{transform:'translateY(-4px) rotate(.8deg)',offset:.89},{transform:'translateY(0) rotate(0)'}],{duration:750,delay:T(t0),easing:'ease-in'});
  else{CFA(sign,[{opacity:0,transform:'translateY(-30px) scaleY(.05)'},{opacity:1,transform:'scaleY(.05)',offset:.35},{opacity:1,transform:'scaleY(1.08)',offset:.7},{opacity:1,transform:'none'}],{duration:450,delay:T(t0)});
   const h=sign.querySelector('h3');h.animate([{opacity:1,translate:'0 0'},{opacity:1,translate:'0 0',offset:.86},{opacity:.4,translate:'2px 0',offset:.88},{opacity:1,translate:'-1px 0',offset:.9},{opacity:.7,translate:'0 0',offset:.93},{opacity:1,translate:'0 0'}],{duration:3200,delay:T(t0+.6),iterations:Infinity});}};
 if(!chest||red){showSign(0);showCards(0,null);return;}
 rl.insertAdjacentHTML('beforeend',`<div class="cofx${e2?' e2':''}"><div class="cfflash"></div><div class="cfrays"></div><div class="hfx"><div class="hcone"></div><div class="hring"></div><div class="hring"></div><div class="hring"></div></div><div class="cfprop"></div></div>`);
 fx=rl.querySelector('.cofx');const pr=fx.querySelector('.cfprop'),fl=fx.querySelector('.cfflash'),ry=fx.querySelector('.cfrays');
 const W=fx.clientWidth,H=fx.clientHeight,cx=W/2,cy=H*.56,by=H-70;pr.style.left=cx+'px';pr.style.top=by+'px';ry.style.left=cx+'px';ry.style.top=cy+'px';
 const fb=fx.getBoundingClientRect(),from={x:fb.left+cx,y:fb.top+by-30};const up=by-cy;let t0;
 const skip=()=>{for(const e of [fx,...fx.querySelectorAll('*'),...cards,sign])e.getAnimations().forEach(a=>{if(a.effect&&a.effect.getComputedTiming().iterations!==Infinity)a.finish();});done();};
 rl.addEventListener('pointerdown',skip,{once:true});
 if(!e2){pr.innerHTML=`<div class="chest"><div class="wrap"><div class="mouth">${CFX.CM}</div><div class="body">${CFX.CB}</div><div class="lid3"><div class="lidf">${CFX.CL}</div><div class="lidi">${CFX.CLI}</div></div></div></div>`;
  const ch=pr.querySelector('.chest'),w=pr.querySelector('.wrap'),lid=pr.querySelector('.lid3'),gl=pr.querySelector('.glint');
  CFA(ch,[{transform:`translateY(${-up-520}px) scale(1.7)`},{transform:`translateY(${-up}px) scale(1.7)`,offset:.7},{transform:`translateY(${-up-18}px) scale(1.7)`,offset:.85},{transform:`translateY(${-up}px) scale(1.7)`}],{duration:450,easing:'ease-in'});
  CFA(w,[{transform:'rotate(0)'},{transform:'rotate(-3deg)'},{transform:'rotate(3deg)'},{transform:'rotate(-2deg)'},{transform:'rotate(1deg)'},{transform:'rotate(0)'}],{duration:400,delay:450});
  if(gl){gl.style.transformOrigin='110px 22px';gl.style.transformBox='view-box';CFA(gl,[{opacity:0,transform:'scale(.2)'},{opacity:1,transform:'scale(1.6)'},{opacity:0,transform:'scale(.4)'}],{duration:350,delay:600});}
  CFA(lid,[{transform:'rotateX(0deg)'},{transform:'rotateX(-4deg)',offset:.12},{transform:'rotateX(120deg)',offset:.8},{transform:'rotateX(108deg)'}],{duration:420,delay:860,easing:'cubic-bezier(.45,0,.3,1)'});
  CFA(fl,[{opacity:0},{opacity:1,offset:.25},{opacity:0}],{duration:700,delay:1000});
  CFA(ry,[{opacity:0,transform:'rotate(0) scale(.25)'},{opacity:1,transform:'rotate(25deg) scale(1)',offset:.35},{opacity:0,transform:'rotate(70deg) scale(1.15)'}],{duration:1300,delay:1000});
  CFA(ch,[{transform:`translateY(${-up}px) scale(1.7)`},{transform:'translateY(0) scale(.62)'}],{duration:450,delay:1350,easing:'cubic-bezier(.4,0,.2,1)'});t0=1.3;}
 else{pr.innerHTML=`<div class="crate">${CFX.CR}</div>`;const c=pr.querySelector('.crate'),s=c.querySelector('svg'),ch=s.querySelector('.chute');s.querySelector('.beam').style.display='none';
  CFA(c,[{transform:`translateY(${-up-760}px) scale(1.7)`},{transform:`translateY(${-up}px) scale(1.7)`,offset:.78},{transform:`translateY(${-up-12}px) scale(1.7)`,offset:.88},{transform:`translateY(${-up}px) scale(1.7)`}],{duration:850,easing:'cubic-bezier(.3,.6,.4,1)'});
  CFA(ch,[{transform:'rotate(-7deg)'},{transform:'rotate(6deg)'},{transform:'rotate(-3deg)'},{transform:'rotate(0)'}],{duration:850,easing:'ease-in-out'});
  CFA(ch,[{transform:'rotate(0) scale(1,1)'},{transform:'translate(30px,40px) rotate(18deg) scale(1.1,.55)',opacity:1,offset:.45},{transform:'translate(240px,10px) rotate(40deg) scale(.9,.35)',opacity:0}],{duration:800,delay:870,easing:'ease-in'});
  CFA(s.querySelector('.dustc'),[{transform:'scale(.3)',opacity:.85},{transform:'scale(1.7)',opacity:0}],{duration:550,delay:670});
  CFA(s.querySelector('.pnl'),[{transform:'rotate(0)'},{transform:'rotate(-85deg)',opacity:0}],{duration:300,delay:1300,easing:'ease-in'});
  CFA(s.querySelector('.pnr'),[{transform:'rotate(0)'},{transform:'rotate(85deg)',opacity:0}],{duration:300,delay:1300,easing:'ease-in'});
  const hf=fx.querySelector('.hfx'),hc=hf.querySelector('.hcone');hf.style.setProperty('--cy',cy+'px');
  CFA(hf,[{opacity:0},{opacity:1,offset:.12},{opacity:1,offset:.6},{opacity:0}],{duration:1500,delay:1300});
  CFA(hc,[{transform:'scaleX(.15) scaleY(.2)'},{transform:'scaleX(1) scaleY(1)',offset:.3},{transform:'scaleX(1.08) scaleY(1.05)'}],{duration:1500,delay:1300,easing:'cubic-bezier(.2,.8,.3,1)'});
  hf.querySelectorAll('.hring').forEach((r,i)=>CFA(r,[{opacity:.95,transform:'scale(.3)'},{opacity:0,transform:'scale('+(6+i*2)+')'}],{duration:1100,delay:1320+i*180,easing:'ease-out'}));
  fl.style.background='radial-gradient(circle at 50% 56%,rgba(191,248,255,.7),rgba(63,232,255,0) 60%)';CFA(fl,[{opacity:0},{opacity:1,offset:.25},{opacity:0}],{duration:700,delay:1300});
  CFA(c,[{transform:`translateY(${-up}px) scale(1.7)`},{transform:'translateY(0) scale(1)'}],{duration:450,delay:1650,easing:'cubic-bezier(.4,0,.2,1)'});t0=1.6;}
 setTimeout(()=>{if(fx.isConnected)fx.classList.add('back');},T(t0));
 showSign(t0+.35);showCards(t0,from);}
