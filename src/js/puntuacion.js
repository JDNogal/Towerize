// ==================== v314 · Puntuación de la partida ====================
// Propuesta aprobada por Nogal el 13-nov-2026 (pendientes_compendio.md). Se va contando durante la partida y se ve:
// en la pausa (la que llevas), en Estadísticas › Puntuación (el desglose), al final de la partida y en Partidas (con su desglose y el récord por héroe).
const SCMINI=new Set(['mini','troll','hknight','infil','mutant']);
const scOn=()=>typeof S!=='undefined'&&S&&!S.tut&&!S.pvE&&!S.pvH&&!(typeof PREVIEWING!=='undefined'&&PREVIEWING);
const scInit=()=>{if(!S.sc)S.sc={mini:0,eli:0,boss:0,bossF:0,evs:0,picks:0};return S.sc;};
{const _d=achDeath;achDeath=function(e){const r=_d.apply(this,arguments);try{if(!e.leak&&scOn()){const s=scInit();
 if(isBoss(e)){if(S.round===ROUNDS)s.bossF++;else s.boss++;}else if(ET[e.t]&&ET[e.t].el){if(SCMINI.has(e.t))s.mini++;else s.eli++;}}}catch(x){}return r;};}
{const _ce=closeEvent;closeEvent=function(){const was=typeof RL!=='undefined'&&RL.ev;const r=_ce.apply(this,arguments);try{if(was&&scOn())scInit().evs++;}catch(e){}return r;};}
{const _tp=towerPick;towerPick=function(k){const n=S&&S.deck?S.deck.length:0;const r=_tp.apply(this,arguments);try{if(scOn()&&S.deck.length>n)scInit().picks++;}catch(e){}return r;};}
// puntos: [clave, nombre, detalle, puntos]
const SCREF=15;
function scoreCalc(){const R=[];if(!S||!S.st)return {t:0,rows:R};const s=scInit(),st=S.st,won=S.phase==='won',done=won?ROUNDS:Math.max(0,Math.min(S.round,ROUNDS)-1);
 const add=(k,n,d,p)=>{if(p)R.push([k,n,d,Math.round(p)]);};
 let rp=0;for(let i=1;i<=done;i++)rp+=100*i;add('rnd','Rondas superadas',done+' de '+ROUNDS+' (100 × número de ronda)',rp);
 if(won){add('win','Victoria','Partida de '+ROUNDS+' rondas',3000*ROUNDS/SCREF);
  const t=GT.r||0,fast=ROUNDS*25,slow=ROUNDS*90,f=Math.max(0,Math.min(1,(slow-t)/(slow-fast)));add('fast','Rapidez','Tiempo real jugado: '+fClk(t),3000*f);
  if(!(S.hpEn>0))add('nol','Sin perder vida','Ningún enemigo te quitó vida',2000);
  add('hp','Vida que te queda',Math.max(0,S.hp)+' × 50',50*Math.max(0,S.hp));
  add('deck','Mazo pequeño',(DECKMAX-S.deck.length)+' hueco'+(DECKMAX-S.deck.length===1?'':'s')+' libre'+(DECKMAX-S.deck.length===1?'':'s')+' × 300',300*Math.max(0,DECKMAX-S.deck.length));
  if(!s.picks)add('deck0','Solo con el mazo inicial','Has saltado todas las ofertas de torres',2500);}
 const hl=st.hl||[];let pf=0;for(let i=0;i<done;i++)if(!(hl[i]>0))pf++;add('perf','Oleadas perfectas',pf+' × 100',100*pf);
 add('mini','Mini-élites',s.mini+' × 75',75*s.mini);add('eli','Élites',s.eli+' × 150',150*s.eli);add('boss','Jefes',s.boss+' × 500',500*s.boss);add('bossF','Jefe final','',1000*s.bossF);
 if(S.hero&&S.hero.lvl>=10)add('h10','Héroe a Nv 10',S.hero.def.n,1000);
 const tws=(S.list||[]).filter(t=>!t.hero&&!t.summ&&TW[t.type]);const mx=tws.filter(t=>!TW[t.type].uniq&&twMaxOK(t)).length;add('max','Torres al máximo',mx+' × 400 (Nv 4 con todas las habilidades)',400*mx);
 const ev=[...new Set(tws.filter(t=>TW[t.type].uniq&&!t.pigU).map(t=>t.type))],evm=ev.filter(k=>tws.some(t=>t.type===k&&twMaxOK(t))).length;
 add('evt','Torres de evento',ev.length+' × 200'+(evm?' · '+evm+' al máximo × 500':''),200*(ev.length-evm)+500*evm);
 add('rel','Reliquias',(S.relics||[]).length+' × 100',100*(S.relics||[]).length);add('evs','Eventos completados',s.evs+' × 100',100*s.evs);
 const used=st.retries||0,left=Math.max(0,(S.rc||0));add('rcu','Reintentos usados',used+' × −200',-200*used);if(won)add('rcl','Reintentos que te sobran',left+' × 100',100*left);
 const t=Math.max(0,R.reduce((a,x)=>a+x[3],0));return {t,rows:R};}
const scRows=sc=>`<table class="sctab">${sc.rows.map(([k,n,d,p])=>`<tr class="${p<0?'neg':''}"><td><b>${n}</b>${d?`<small>${d}</small>`:''}</td><td class="n">${p>0?'+':''}${fi(p)}</td></tr>`).join('')}<tr class="tot"><td><b>Total</b></td><td class="n">${fi(sc.t)}</td></tr></table>`;
// ---- Estadísticas › Puntuación ----
STABS.splice(1,0,['sc','Puntuación',icU('m_st_run','📈')]);
{const _sp=statParts;statParts=function(){if(STW.tab!=='sc')return _sp.apply(this,arguments);const sc=scoreCalc(),top=sc.rows.filter(r=>r[3]>0).sort((a,b)=>b[3]-a[3]).slice(0,3);
 const left=`<h3>Estadísticas</h3><div class="bksub">Puntuación · ronda ${Math.min(S.round,ROUNDS)}/${ROUNDS}, se actualiza mientras juegas</div>${scRows(sc)}`;
 const right=`<div class="lbdet lbkp"><div class="kp"><div class="scbig"><b>${fi(sc.t)}</b><small>Puntuación que llevas</small></div>${top.map(r=>`<div><b>+${fi(r[3])}</b><small>${r[1]}</small></div>`).join('')}</div><p class="scnote">La victoria, la rapidez, la vida que te queda, el mazo y los reintentos que te sobran se suman al ganar.</p></div>`;
 return {marks:{list:STABS.map(([v,l,i])=>[v,l,i]),cur:'sc',act:'stab'},left,right,one:true,key:'stsc'};};}
{const _sh=statsHTML;statsHTML=function(t){if(t==='sc')return '';return _sh.apply(this,arguments);};}
// ---- pausa: la puntuación que llevas, en la portada ----
{const _cv=lbCoverHTML;lbCoverHTML=function(){let h=_cv.apply(this,arguments);try{if(scOn()&&S.st&&!document.body.classList.contains('inmenu')){const t=scoreCalc().t;h=h.replace('<div class="lbemb">',`<div class="lbscore"><small>Puntuación</small><b>${fi(t)}</b></div><div class="lbemb">`);}}catch(e){}return h;};}
// ---- final de partida: total arriba y una cinta «Puntuación» con el desglose ----
{const _eg=endGame;endGame=function(){if(scOn()){try{S.scF=scoreCalc();}catch(e){}}const r=_eg.apply(this,arguments);try{if(S.scF&&LB.end){const sc=S.scF;LB.endv='';
  LB.end.left=String(LB.end.left).replace('<div class="esum">',`<div class="esum"><div class="scend"><small>Puntuación</small><b>${fi(sc.t)}</b></div>`);
  LB.end.scL=`<h2>Puntuación · ${fi(sc.t)}</h2><small>Lo que has sumado en esta partida.</small>${scRows(sc)}`;
  LB.end.scR=(()=>{const best=hsBest(S.hero&&S.hero.id,S.runId);const hn=S.hero?S.hero.def.n:'';return `<div class="lbdet"><h4>${best==null?'¡Tu primer récord con '+hn+'!':sc.t>best?'¡Nuevo récord con '+hn+'! (antes: '+fi(best)+')':'Récord con '+hn+': '+fi(best)}</h4><p>Cuanto más alta la ronda, más vale. Al ganar suman también la rapidez, la vida que te queda, el mazo pequeño y los reintentos que no has usado.</p></div>`;})();
  if(LB.open)lbRender();}}catch(e){console.warn(e);}return r;};}
{const _ep=endParts;endParts=function(){const p=_ep.apply(this,arguments);try{const E=LB.end||{};if(E.scL){p.ribs=p.ribs.replace('<button class="bkrib on" title="Resumen">',`<button class="bkrib${LB.endv==='sc'?'':' on'}" data-a="endv" data-v="" title="Resumen">`).replace('<button class="bkrib" data-a="hideend"',`<button class="bkrib${LB.endv==='sc'?' on':''}" data-a="endv" data-v="sc" title="Puntuación">${icU('m_st_run','📈')}<span>Puntuación</span></button><button class="bkrib" data-a="hideend"`);
  if(LB.endv==='sc'){p.left=`<div class="lbend">${E.scL}</div>`;p.right=`<div class="lbend r">${E.scR}</div>`;p.key='endsc';}}}catch(e){}return p;};}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-a="endv"],[data-a="hsv"]');if(!b)return;e.stopPropagation();e.preventDefault();if(b.dataset.a==='endv')LB.endv=b.dataset.v;else HIST.v=b.dataset.v;try{sfx('page');}catch(_){}lbRender();},true);
// ---- Partidas: se guarda la puntuación con su desglose; récord por héroe; pestaña con el desglose ----
{const _hr=hsRec;hsRec=function(res){const r=_hr.apply(this,arguments);try{if(r&&scOn()){const sc=S.scF||scoreCalc();r.sc=sc.t;r.scr=sc.rows;}}catch(e){}return r;};}
const hsBest=(hero,skip)=>{try{const L=(HIST.list||[]).filter(x=>x.hero===hero&&x.sc!=null&&x.id!==skip);return L.length?Math.max(...L.map(x=>x.sc)):null;}catch(e){return null;}};
{const _hp=histParts;histParts=function(){const p=_hp.apply(this,arguments);try{const L=hsFiltered(),r=L[HIST.sel];
 if(r&&p.right){const tabs=`<div class="hsv"><button class="${HIST.v==='sc'?'':'on'}" data-a="hsv" data-v="">Resumen</button><button class="${HIST.v==='sc'?'on':''}" data-a="hsv" data-v="sc">Puntuación${r.sc!=null?' · '+fi(r.sc):''}</button></div>`;
  if(HIST.v==='sc'){const best=hsBest(r.hero);p.right=String(p.right).replace(/(<div class="hshd">[\s\S]*?<\/div><\/div><\/div>)[\s\S]*$/,(m,a)=>a+tabs+(r.scr?`${scRows({t:r.sc,rows:r.scr})}${best!=null?`<p class="scnote">Récord con ${HEROES[r.hero]?HEROES[r.hero].n:r.hero}: <b>${fi(best)}</b>${best===r.sc?' (esta partida)':''}</p>`:''}`:'<p class="scnote">Esta partida es de antes de que hubiera puntuación.</p>'));}
  else p.right=String(p.right).replace(/(<div class="hshd">[\s\S]*?<\/div><\/div><\/div>)/,'$1'+tabs);}}catch(e){console.warn(e);}return p;};}
