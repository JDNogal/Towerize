// ==================== v352 · FICHA DE ENEMIGO: «ESTE ENEMIGO, AHORA» EN DIRECTO (Mesa, aprobado por Nogal 15-nov) ====================
// Al pulsar un enemigo: arriba, en grande y en directo, su vida con barra (el tramo amarillo es lo que acaba de perder), sus estados y su armadura,
// resistencia mágica y regeneración de ahora, con los colores de siempre. La ficha del tipo va debajo, plegada. Se actualiza sola sin cerrar la ficha.
const ENOW={e:null,fold:false};
function enowStates(e){const fx=e.fx||{},o=[],K=(id,l,x)=>o.push(`<span class="enst">${kw(id,l,'')}${x?' '+x:''}</span>`);
 if(e.bn>0)K('burn','Quemadura','×'+Math.max(1,Math.round(e.bn)));
 if(e.ps&&e.ps.length)K('poison','Veneno','×'+e.ps.length);
 if(e.bl&&e.bl.length)K('bleed','Sangrado','×'+e.bl.length);
 if(e.cs&&e.cs.length)K('cursed','Maldito');
 if(e.ez&&e.ez.n>0)K('ez','Electrizado');
 if(fx.freeze)K('freeze','Congelado');else if(fx.slow)K('slow','Ralentizado',Math.round(fx.slow.m*20)*5+'%');
 if(fx.stun)K('stun','Aturdido');if(fx.root)K('root','Inmovilizado');if(fx.fear)K('fear','Aterrado');if(fx.poly)K('poly','Transformado');if(fx.wet)K('wet','Mojado');
 const b=typeof brkOf==='function'?brkOf(e):0,mb=typeof mbrkOf==='function'?mbrkOf(e):0;
 if(b>0)K('brk','Armadura rota','−'+Math.round(b));if(mb>0)K('mrbrk','Resistencia mágica rota','−'+Math.round(mb));
 return o.length?o.join(''):'<span class="enst none">Sin estados</span>';}
function enowRows(e){const E=ET[e.t],b=typeof brkOf==='function'?brkOf(e):0,mb=typeof mbrkOf==='function'?mbrkOf(e):0,
 ap=Math.max(0,(e.apx!=null?e.apx:(E.ap||0))+(e.cb||0)-b),am=Math.max(0,(e.amx!=null?e.amx:(E.am||0))+(e.cbm||0)-mb),src='en:'+e.t;
 let h=R('cph',kst('aphys','Armadura',src),armTxt(ap))+R('cmg',kst('amagic','Resistencia mágica',src),armTxt(am));
 const v=(typeof RGEN!=='undefined'&&RGEN[e.t])||e.rgX;
 if(v)h+=R('chp',kw('rgn','Regenera',src,'st'),'+'+f(e.max*v*(e.rgV===1?.5:1))+' vida/s');
 return h;}
function enowHp(e){const p=Math.max(0,Math.min(100,e.hp/e.max*100));return{p,t:Math.max(0,Math.round(e.hp))+' / '+Math.round(e.max)};}
enemyInst=function(e){ENOW.e=e;const full=enemyInfo(e.t),i=full.indexOf('</div>')+6,head=full.slice(0,i),rest=full.slice(i),E=ET[e.t],h=enowHp(e);
 return head+`<div class="enow"><h4><span>Este enemigo, ahora</span><b class="enlive">● en directo</b></h4>
 <div class="ehp"><div class="g" style="width:${h.p}%"></div><div class="f" style="width:${h.p}%"></div><span>${h.t}</span></div>
 <div class="ests">${enowStates(e)}</div><div class="erows">${enowRows(e)}</div></div>
 <details class="efold"${ENOW.fold?' open':''}><summary>Ficha: ${E.n}</summary>${rest}</details>`;};
document.addEventListener('toggle',ev=>{if(ev.target&&ev.target.classList&&ev.target.classList.contains('efold'))ENOW.fold=ev.target.open;},true);
// en directo: cada 150 ms se actualiza la parte de «ahora» de la ficha abierta
setInterval(()=>{const e=ENOW.e;if(!e)return;const box=document.querySelector('#side .enow,#tip .enow');if(!box){return;}
 const h=enowHp(e),f0=box.querySelector('.ehp .f'),g0=box.querySelector('.ehp .g'),t0=box.querySelector('.ehp span');
 if(f0&&f0.style.width!==h.p+'%'){f0.style.width=h.p+'%';g0.style.width=h.p+'%';}if(t0&&t0.textContent!==h.t)t0.textContent=h.t;
 const sh=enowStates(e),st=box.querySelector('.ests');if(st&&st.dataset.h!==sh){st.dataset.h=sh;st.innerHTML=sh;}
 const rh=enowRows(e),rw=box.querySelector('.erows');if(rw&&rw.dataset.h!==rh){rw.dataset.h=rh;rw.innerHTML=rh;}
 if(!(e.hp>0))box.classList.add('dead');},150);
