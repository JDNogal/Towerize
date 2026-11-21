// Maquetas: página del libro «Juega a tu manera» (3 propuestas) y botón del medidor de daño a Estadísticas (2 propuestas).
const {chromium,devices}=require('/home/claude/jdnogal/towerize/node_modules/playwright');const fs=require('fs');
const IMG=f=>'data:image/png;base64,'+fs.readFileSync('/home/claude/mq/img/'+f).toString('base64');
const IM={full:IMG('partida.png'),ff:IMG('ffwd.png'),num:IMG('numeros.png'),dps:IMG('medidor.png'),ach:IMG('logro.png')};
const OUT='/home/claude/mq/out';fs.mkdirSync(OUT,{recursive:true});
const OPTS4=[
 ['ffwd','⏩','Avance rápido automático','Desde la ronda 5, cuando ningún enemigo está a tiro, el juego va solo a ×3. En cuanto entra el primero, vuelve a tu velocidad.','ff'],
 ['dnum','💥','Números de daño','Cuánto daño hace cada golpe; los críticos, más grandes. Si el juego te va lento, quítalos o deja solo los de los jefes.','num'],
 ['dps','📶','Medidor de daño','Qué torre hace más daño en cada ronda. Para verlo con todo detalle, abre Estadísticas en la pausa.','dps'],
 ['nearach','🏆','Avisar de logros cercanos','Te avisa cuando te falta poco para un logro y te deja fijarlo para seguirlo.','ach']];
const CSS=`
.gq p.gqi{font-size:13.5px;line-height:1.5;margin:4px 0 8px}
.gq .gqn{font-size:12.5px;color:var(--ink2);background:var(--paper2);border:1px dashed var(--pline2);border-radius:8px;padding:6px 10px;margin:8px 0 0;line-height:1.4}
.gq .sw{flex:none}
/* A: tarjetas 2x2 */
.gqA{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.gqA .c{background:var(--paper2);border:1.5px solid var(--pline2);border-radius:10px;padding:8px;display:flex;flex-direction:column;gap:5px}
.gqA .c .im{height:112px;border-radius:7px;background:#1d2a20 center/contain no-repeat;box-shadow:inset 0 0 0 1px rgba(0,0,0,.25)}
.gqA .c .t{display:flex;align-items:center;gap:6px}.gqA .c .t b{flex:1;font-size:13px;line-height:1.2}
.gqA .c small{font-size:11.5px;color:var(--ink2);line-height:1.3}
/* B: lista y detalle */
.gqB{display:flex;flex-direction:column;gap:7px}
.gqB .r{display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:10px;background:var(--paper2);border:1.5px solid var(--pline2)}
.gqB .r.on{box-shadow:0 0 0 2.5px var(--acc2),0 3px 10px rgba(0,0,0,.18);background:var(--paper)}
.gqB .r .e{font-size:18px}.gqB .r b{flex:1;font-size:13.5px}
.gqBd .im{height:150px;border-radius:10px;background:#1d2a20 center/contain no-repeat;margin:0 0 10px;box-shadow:0 6px 14px rgba(90,40,10,.3)}
.gqBd .sl{display:flex;align-items:center;gap:10px;margin-top:6px;font-size:13px}
/* C: filas con imagen */
.gqC{display:flex;flex-direction:column;gap:14px}
.gqpic{margin-top:12px}.gqpic div{height:200px;border-radius:10px;background:#1d2a20 center/cover no-repeat;box-shadow:0 6px 14px rgba(90,40,10,.3)}.gqpic small{display:block;text-align:center;font-size:11.5px;color:var(--ink2);margin-top:5px;font-style:italic}
.gqC .r{display:grid;grid-template-columns:160px 1fr auto;gap:12px;align-items:center;padding:9px;border-radius:10px;background:var(--paper2);border:1.5px solid var(--pline2)}
.gqC .r .im{height:100px;border-radius:7px;background:#1d2a20 center/contain no-repeat}
.gqC .r b{font-size:13.5px;display:block;margin-bottom:2px}.gqC .r small{font-size:11.5px;color:var(--ink2);line-height:1.3;display:block}
`;
function parts(v){
 const sw=k=>`<button class="sw on" role="switch"><i></i></button>`;
 const intro=`<h3>Juega a tu manera</h3><div class="bksub">Opciones a mano</div><p class="gqi">Towerize tiene muchas opciones para que lo disfrutes como más te guste. <b>Ninguna cambia la dificultad</b>: actívalas o quítalas solo si te apetece. Estas cuatro suelen gustar mucho:</p>`;
 const nota=`<div class="gqn">⚙️ Hay muchas más en <b>Opciones</b>, y puedes cambiar estas cuando quieras.<br>📊 En <b>Estadísticas</b> (menú de pausa) tienes el daño de cada torre con todo detalle.</div>`;
 const foot={footL:`<button class="lbbk">⚙️ Ver todas las opciones</button>`,footR:`<button class="gbtn">Continuar ›</button>`};
 if(v==='A')return {marks:null,key:'gqA',left:`<div class="gq">${intro}${nota}<div class="gqpic"><div style="background-image:url(${IM.full})"></div><small>Así se ven en partida: avance rápido arriba, medidor a la izquierda y aviso de logro abajo.</small></div></div>`,
  right:`<div class="gq gqA">${OPTS4.map(o=>`<div class="c"><div class="im" style="background-image:url(${IM[o[4]]})"></div><div class="t"><b>${o[2]}</b>${sw(o[0])}</div><small>${o[3]}</small></div>`).join('')}</div>`,...foot};
 if(v==='B'){const o=OPTS4[2];return {marks:null,key:'gqB',left:`<div class="gq">${intro}<div class="gqB">${OPTS4.map((q,i)=>`<div class="r${i===2?' on':''}"><span class="e">${q[1]}</span><b>${q[2]}</b>${sw(q[0])}</div>`).join('')}</div>${nota}</div>`,
  right:`<div class="lbdet gqBd"><div class="im" style="background-image:url(${IM[o[4]]})"></div><h4>${o[2]}</h4><p>${o[3]}</p><p>Puedes plegarlo con ‹ y cambiar de pestaña para ver solo un tipo de torre.</p><div class="sl">${sw()} Activado</div></div>`,...foot};}
 if(v==='C'){const row=o=>`<div class="r"><div class="im" style="background-image:url(${IM[o[4]]})"></div><div><b>${o[1]} ${o[2]}</b><small>${o[3]}</small></div>${sw(o[0])}</div>`;
  return {marks:null,key:'gqC',left:`<div class="gq">${intro}<div class="gqC">${row(OPTS4[0])}${row(OPTS4[1])}</div></div>`,
  right:`<div class="gq"><div class="gqC" style="margin-top:6px">${row(OPTS4[2])}${row(OPTS4[3])}</div>${nota}</div>`,...foot};}
}
async function book(br,ctxOpt,v,name){const c=await br.newContext(ctxOpt);const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','full');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Nogal',intro:1,e2n:1,e2a:1,e2v:1}));}catch(e){}});
 await p.goto('file:///home/claude/towerize/index.html');await p.waitForTimeout(900);
 await p.evaluate(([v,css,P])=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;
  const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
  const orig=prepParts;
  prepParts=function(){return LB.step==='mq'?window.__MQ:orig.apply(this,arguments);};LB.step='mq';},[v,CSS,parts.toString()]);
 // parts() se evalúa aquí y se pasa ya hecho
 await p.evaluate(o=>{window.__MQ=o;lbOpen('prep');},parts(v));
 await p.waitForTimeout(700);await p.evaluate(()=>{document.querySelectorAll('body *').forEach(e=>{if(e.isConnected&&/^\W*Logro:/.test(e.textContent||'')&&(e.textContent||'').length<90&&!e.closest('#lbook,.bk'))e.remove();});});
 await p.screenshot({path:`${OUT}/${name}.png`});if(errs.length)console.log(name,'ERRS',errs);await c.close();}
async function meter(br,v,name){const c=await br.newContext({viewport:{width:1280,height:720}});const p=await c.newPage();
 await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Nogal',intro:1,e2n:1,e2a:1,e2v:1}));}catch(e){}});
 await p.goto('file:///home/claude/towerize/index.html');await p.waitForTimeout(800);
 const r=await p.evaluate(async v=>{const W=ms=>new Promise(r=>setTimeout(r,ms));const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;OPT.nearach=false;startGame(15);chooseHero('reinhart');for(let i=0;i<5&&DLG.on;i++)dlgEnd();HQ.q=[];
  for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}}
  RL.open=false;$('relic').classList.remove('open');S.gold=99999;S.deck=['arrow','orb','bunker'];
  const free=[];for(let gy=0;gy<NC;gy++)for(let gx=0;gx<NC;gx++)if(S.cc[gy][gx]===1)free.push([gx,gy,Math.hypot(gx*K-S.core.x,gy*K-S.core.y)]);free.sort((a,b)=>a[2]-b[2]);
  let j=0;for(const k of ['arrow','arrow','orb','bunker','arrow','orb']){S.tsel=k;for(;j<free.length;j++){const n=S.list.length;build(free[j][0]*K+K/2,free[j][1]*K+K/2);if(S.list.length>n){j++;break;}}}S.tsel=null;
  S.round=4;startWave();S.speed=1;ui();for(let t=0;t<60;t++){await W(250);if(dpsData().tot>300)break;}S.speed=0;await W(400);
  const el=$('dpsc');const css=document.createElement('style');css.textContent=`#dpsc .dstb{margin:0 0 0 auto;padding:0 6px;height:20px;border-radius:6px;border:1px solid var(--lea2);background:color-mix(in srgb,var(--lea) 80%,#fff 20%);color:var(--leatxt);font:600 11px system-ui;display:inline-flex;align-items:center;gap:3px;cursor:pointer}
   #dpsc .lh{display:flex;align-items:center;gap:5px}#dpsc .dfoot{display:flex;justify-content:space-between;align-items:center;padding:2px 6px 0}#dpsc .dfoot .dmore{margin:0}`;document.head.appendChild(css);
  if(v===1){const lh=el.querySelector('.lh');const fb=lh.lastElementChild;const b=document.createElement('button');b.className='dstb';b.innerHTML='📊';b.title='Estadísticas';lh.insertBefore(b,fb);}
  if(v===2){const m=el.querySelector('.dmore');const f=document.createElement('div');f.className='dfoot';m.replaceWith(f);f.appendChild(m);const b=document.createElement('button');b.className='dstb';b.innerHTML='📊 Ver más';f.appendChild(b);}
  dpsTick=function(){};/* que no lo repinte */const R=el.getBoundingClientRect();return {x:R.left,y:R.top,w:R.width,h:R.height};},v);
 await p.waitForTimeout(200);await p.screenshot({path:`${OUT}/${name}.png`,clip:{x:0,y:Math.max(0,r.y-40),width:330,height:r.h+60}});
 await p.screenshot({path:`${OUT}/${name}_entera.png`});await c.close();}
(async()=>{const br=await chromium.launch();
 for(const v of ['A','B','C']){await book(br,{viewport:{width:1280,height:720}},v,'guia_'+v+'_pc');await book(br,{...devices['iPhone 13 landscape']},v,'guia_'+v+'_movil');}
 await meter(br,1,'medidor_1');await meter(br,2,'medidor_2');
 await br.close();console.log('ok');})();
