// ==================== v352 · FIN DE PARTIDA: LA PUNTUACIÓN SE SUMA EN EL LIBRO (Mesa, aprobado por Nogal 15-nov) ====================
// Lo primero al acabar es una página del libro: cada concepto entra uno tras otro y suma al total con un contador (los grandes, con destellos).
// Clic o Espacio acelera. Al terminar, «Continuar ›» pasa la página y lleva a la pantalla de victoria o derrota de siempre.
const SCT={run:0,i:0,shown:0,tot:0,fast:false,done:false,timer:0};
const SCTBIG=new Set(['win','nol','fast','deck0','bossF','h10']);
function sctHead(){const won=LB.end&&LB.end.won;return `<h2 class="scthd">${won?'¡Victoria!':'Fin de la partida'}</h2><small class="sctsub">Así se ha sumado tu puntuación</small>`;}
{const _ep=endParts;endParts=function(){const p=_ep.apply(this,arguments);try{const E=LB.end||{};
 if(LB.endv==='tally'&&S.scF){const sc=S.scF,hn=S.hero?S.hero.def.n:'',best=hsBest(S.hero&&S.hero.id,S.runId);
  const rec=best==null?`¡Tu primer récord con ${hn}!`:sc.t>best?`¡Nuevo récord con ${hn}! (antes: ${fi(best)})`:`Récord con ${hn}: ${fi(best)}`;
  p.left=`<div class="lbend sctl">${sctHead()}<div class="sctlist" id="sctlist"></div></div>`;
  p.right=`<div class="lbend r sctr"><div class="sctot"><small>Puntuación</small><b id="scttot">${fi(SCT.done?sc.t:SCT.shown)}</b></div><p class="sctrec${SCT.done?' on':''}" id="sctrec">${rec}</p><p class="scthint" id="scthint"${SCT.done?' hidden':''}>Clic o Espacio: acelerar</p></div>`;
  if(bkNarrow()){p.left=`<div class="lbend sctl nar">${sctHead()}<div class="sctot sm"><small>Puntuación</small><b id="scttot">${fi(SCT.done?sc.t:SCT.shown)}</b><span class="sctrec${SCT.done?' on':''}" id="sctrec">${rec}</span></div><div class="sctlist" id="sctlist"></div></div>`;p.right='';}
  p.key='endtally';p.ribs='<div class="bkribs"></div>';p.footL='<button class="lbbk" data-a="scskip" id="sctskip"'+(SCT.done?' hidden':'')+'>Saltar ›</button>';
  p.footR=`<button class="gbtn" data-a="sccont" id="sctgo"${SCT.done?'':' hidden'}>Continuar ›</button>`;
  p.after=()=>sctStart();}
 else if(LB.sctFlip){p.flip=true;LB.sctFlip=false;}}catch(e){console.warn(e);}return p;};}
function sctRow(r,on){const [k,n,d,pt]=r;return `<div class="sctit${SCTBIG.has(k)?' big':''}${pt<0?' neg':''}${on?' on':''}"><span class="t"><b>${n}</b>${d?`<small>${d}</small>`:''}</span><span class="p">${pt>0?'+':''}${fi(pt)}</span></div>`;}
function sctStart(){const L=$('sctlist');if(!L||!S.scF)return;const rows=S.scF.rows;
 // repintado (cambio de tamaño, etc.): se vuelve a poner lo ya sumado sin animar
 L.innerHTML=rows.slice(0,SCT.i).map(r=>sctRow(r,1)).join('');sctScroll();
 if(SCT.run!==LB.sctRun){SCT.run=LB.sctRun;SCT.i=0;SCT.shown=0;SCT.tot=0;SCT.fast=false;SCT.done=false;L.innerHTML='';clearTimeout(SCT.timer);SCT.timer=setTimeout(sctStep,600);}}
function sctScroll(){const L=$("sctlist");if(!L)return;L.scrollTop=L.scrollHeight;}
function sctCount(to,ms){const from=SCT.shown,t0=performance.now();return new Promise(res=>{const f=t=>{const k=Math.min(1,(t-t0)/ms);SCT.shown=Math.round(from+(to-from)*(1-Math.pow(1-k,3)));const T=$('scttot');if(T)T.textContent=fi(SCT.shown);if(k<1)requestAnimationFrame(f);else{if(T){T.classList.add('pop');setTimeout(()=>T.classList.remove('pop'),150);}res();}};requestAnimationFrame(f);});}
function sctSpark(el){const r=el.querySelector('.p').getBoundingClientRect();for(let k=0;k<10;k++){const s=document.createElement('i');s.className='sctspark';document.body.appendChild(s);const a=Math.random()*6.28,d=30+Math.random()*50;s.style.left=(r.left+r.width/2)+'px';s.style.top=(r.top+r.height/2)+'px';s.animate([{transform:'translate(0,0)',opacity:1},{transform:`translate(${Math.cos(a)*d}px,${Math.sin(a)*d}px)`,opacity:0}],{duration:650,easing:'ease-out'}).onfinish=()=>s.remove();}}
async function sctStep(){const run=SCT.run;if(typeof S==="undefined"||!S||!S.scF)return;const rows=S.scF.rows;if(run!==LB.sctRun||LB.endv!=="tally")return;
 if(SCT.i>=rows.length){SCT.done=true;SCT.shown=S.scF.t;const T=$('scttot');if(T)T.textContent=fi(S.scF.t);for(const[id,on]of[['sctrec',1],['sctgo',1],['sctskip',0],['scthint',0]]){const e=$(id);if(e){if(id==='sctrec')e.classList.add('on');else e.hidden=!on;}}try{sfx('wclear');}catch(e){}const g=$('sctgo');if(g)g.focus();return;}
 const r=rows[SCT.i++],L=$('sctlist');if(!L)return;L.insertAdjacentHTML('beforeend',sctRow(r,0));const el=L.lastElementChild;requestAnimationFrame(()=>el.classList.add('on'));sctScroll();
 await new Promise(res=>setTimeout(res,SCT.fast?50:340));if(run!==SCT.run)return;
 const big=SCTBIG.has(r[0]);if(big&&!SCT.fast){sctSpark(el);try{sfx('relic',{v:.6});}catch(e){}}else if(!SCT.fast){try{sfx('coin',{force:1,v:.7});}catch(e){}}
 SCT.tot+=r[3];await sctCount(Math.max(0,SCT.tot),SCT.fast?110:big?850:500);if(run!==SCT.run)return;SCT.timer=setTimeout(sctStep,SCT.fast?30:220);}
// tras endGame: la primera página del libro es la de la puntuación
{const _eg=endGame;endGame=function(){const r=_eg.apply(this,arguments);try{if(S.scF&&LB.end){LB.endv='tally';LB.sctRun=(LB.sctRun||0)+1;if(LB.open&&LB.area==='end')lbRender();}}catch(e){console.warn(e);}return r;};}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-a="scskip"],[data-a="sccont"]');
 if(!b){if(LB.open&&LB.area==='end'&&LB.endv==='tally'&&!SCT.done&&e.target.closest&&e.target.closest('#comp .bk'))SCT.fast=true;return;}
 e.stopPropagation();e.preventDefault();if(b.dataset.a==='scskip')SCT.fast=true;else{LB.endv='';LB.sctFlip=true;lbRender();}},true);
addEventListener('keydown',e=>{if(!(LB.open&&LB.area==='end'&&LB.endv==='tally'))return;if(e.key===' '&&!SCT.done){e.preventDefault();e.stopPropagation();SCT.fast=true;}
 else if((e.key==='Enter'||e.key===' ')&&SCT.done){e.preventDefault();e.stopPropagation();LB.endv='';LB.sctFlip=true;lbRender();}},true);
