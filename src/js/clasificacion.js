// ==================== v324 · Clasificación de playtesters (servidor en Cloudflare) ====================
// Nogal (13-nov-2026): al final de la partida, botón «Subir a la clasificación» en el hueco libre; si sigues sin subirla, aviso en el
// centro con la pantalla oscurecida (Sí y siempre / Sí, solo esta / No, gracias + «No volver a mostrar»). El nombre es el del piloto:
// se pregunta la primera vez (en Steam será el de Steam). Una tabla por era y por nivel de amenaza (puntos de amenaza − apoyos).
// Sin spoilers: si las Amenazas de esa era aún no están abiertas, no se habla de amenaza en ningún sitio.
const LBURL='https://towerize-ranking.towerize.workers.dev';
const LBR={up:null,busy:false,sel:null,era:null,data:{},tiers:{}};
if(OPT.lbup===undefined)OPT.lbup='ask';
const lbPilot=()=>{try{return (typeof STO!=='undefined'&&STO.name)||localStorage.getItem('rt-pilot')||'';}catch(e){return '';}};
// el nombre es el del piloto (el mismo que usa ÉTER y que se pone en la historia y en Opciones)
const lbSetPilot=n=>{try{STO.name=n;saveSto();localStorage.setItem('rt-pilot',n);}catch(e){}};
const lbBestK='rt-lbbest';
const lbBestGet=()=>{try{return JSON.parse(localStorage.getItem(lbBestK))||{};}catch(e){return {};}};
const lbAmzOpen=era=>{try{return azEraDone(era);}catch(e){return false;}};
OPTS.splice(Math.max(0,OPTS.findIndex(o=>o.tab==='jg')),0,{tab:'jg',type:'choice',key:'lbup',label:'Subir partidas a la clasificación',
 desc:'Preguntar: al acabar te lo pregunta si no la has subido. Siempre: se suben solas cuando es tu mejor marca con ese héroe. Solo con el botón: no pregunta nunca.',
 get:()=>OPT.lbup||'ask',set:v=>{OPT.lbup=v;saveOpt();},choices:[['ask','Preguntar'],['always','Siempre'],['manual','Solo con el botón']]});
// la partida que acaba de terminar
function lbRun(){if(!S||!S.hero||S.tut||S.pvE||S.pvH||(typeof PREVIEWING!=='undefined'&&PREVIEWING))return null;
 const sc=S.scF||(typeof scoreCalc==='function'?scoreCalc():{t:0});if(!(sc.t>0))return null;
 const era=(S.era||ERA||1),amz=(S.amz&&typeof azPtsOf==='function')?azPtsOf(S.amz):0;
 const sel={};for(const k in S.amz||{})if(S.amz[k]>0)sel[k]=S.amz[k];
 return {hero:S.hero.id,era,amz,score:Math.round(sc.t),round:Math.min(S.round,ROUNDS),won:S.phase==='won',sel,ver:String(NOVV())};}
function lbBtnHTML(){const R=LBR.cur;if(!R)return '';const st=LBR.up,amzT=lbAmzOpen(R.era)?'Amenaza '+R.amz+' · ':'';
 const ic='<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17V5M7 10l5-5 5 5"/></svg>';
 if(st&&st.ok)return `<button class="lbupb ok" data-a="lbrank">${st.pos?`<b>¡Subida! Puesto ${st.pos}</b><small>de ${st.n}${lbAmzOpen(R.era)?' en Amenaza '+R.amz:''} · ${ERADEF[R.era].esc||'Era '+ERADEF[R.era].n}</small>`:'<b>¡Subida!</b><small>Tu mejor marca con este héroe sigue siendo otra</small>'}</button>`;
 if(st&&st.err)return `<button class="lbupb err" data-a="lbup">${ic}<span>No se ha podido subir<small>Toca para reintentar</small></span></button>`;
 return `<button class="lbupb" data-a="lbup"${LBR.busy?' disabled':''}>${ic}<span>${LBR.busy?'Subiendo…':'Subir a la clasificación'}<small>${amzT}${fi(R.score)} puntos</small></span></button>`;}
function lbRefreshBtn(){if(!LB.end)return;LB.end.left=String(LB.end.left).replace(/<button class="lbupb[\s\S]*?<\/button>/,lbBtnHTML());if(LB.open&&LB.area==='end')lbRender();}
async function lbUpload(){const R=LBR.cur;if(!R||LBR.busy||(LBR.up&&LBR.up.ok))return;const nick=lbPilot();if(!nick){lbNameDlg(()=>lbUpload());return;}
 LBR.busy=true;lbRefreshBtn();
 try{const r=await fetch(LBURL+'/run',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.assign({nick},R))});const d=await r.json();
  LBR.up=d&&d.ok?{ok:1,pos:d.pos,n:d.n}:{err:1};
  if(d&&d.ok){const B=lbBestGet(),k=R.era+'|'+R.amz+'|'+R.hero;if(!(B[k]>=R.score)){B[k]=R.score;try{localStorage.setItem(lbBestK,JSON.stringify(B));}catch(e){}}delete LBR.data[R.era+'|'+R.amz];}
 }catch(e){LBR.up={err:1};}
 LBR.busy=false;lbRefreshBtn();}
// ---- diálogos en el centro con todo lo demás oscurecido ----
function lbDlg(html){let el=$('lbdlg');if(!el){el=document.createElement('div');el.id='lbdlg';document.body.appendChild(el);}
 el.className=(typeof skinNow==='function'&&skinNow()==='holo')?'holo on':'on';el.innerHTML=`<div class="lbdbox">${html}</div>`;try{sfx('page');}catch(e){}return el;}
function lbDlgClose(){const el=$('lbdlg');if(el){el.className='';el.innerHTML='';}}
function lbNameDlg(then){const el=lbDlg(`<h3>¿Cómo se llama tu piloto?</h3><p>Es el nombre con el que saldrás en la clasificación.</p><input id="lbname" maxlength="16" autocomplete="off" value="${lbPilot().replace(/"/g,'')}" placeholder="Nombre del piloto"><p class="note">Se puede cambiar desde la clasificación.</p><div class="lbdrow"><button class="lbdb" data-lbd="cancel">Cancelar</button><button class="lbdb main" data-lbd="name">${then?'Subir partida':'Guardar'}</button></div>`);
 LBR.then=then||null;const i=$('lbname');setTimeout(()=>{try{i.focus();i.select();}catch(e){}},50);
 i.addEventListener('keydown',e=>{e.stopPropagation();if(e.key==='Enter')el.querySelector('[data-lbd="name"]').click();if(e.key==='Escape')lbDlgClose();});}
function lbAskDlg(cont){LBR.cont=cont;lbDlg(`<h3>Aún no has subido esta partida</h3><p>Ahora puedes subir tus partidas a la <b>clasificación</b> y compararte con otros jugadores. ¿Quieres subirla?</p>
 <button class="lbdb main wide" data-lbd="always">Sí, y súbelas siempre<small>Se suben solas al acabar, solo cuando sea tu mejor marca con ese héroe</small></button>
 <button class="lbdb wide" data-lbd="once">Sí, solo esta</button><button class="lbdb wide" data-lbd="no">No, gracias</button>
 <label class="lbchk"><input type="checkbox" id="lbnomore"> No volver a mostrar este aviso</label><p class="note">Se puede cambiar en Opciones › Juego.</p>`);}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-lbd]');if(!b)return;e.stopPropagation();e.preventDefault();const a=b.dataset.lbd;
 if(a==='cancel'){lbDlgClose();return;}
 if(a==='name'){const v=String(($('lbname')||{}).value||'').replace(/[<>&"'`\\]/g,'').trim().slice(0,16);if(v.length<2){$('lbname').classList.add('bad');return;}lbSetPilot(v);lbDlgClose();const f=LBR.then;LBR.then=null;if(f)f();else lbRender();return;}
 const nm=$('lbnomore')&&$('lbnomore').checked,cont=LBR.cont;LBR.cont=null;LBR.asked=1;lbDlgClose();
 if(a==='always'){OPT.lbup='always';saveOpt();}else if(nm){OPT.lbup='manual';saveOpt();}
 const go=()=>{if(cont)cont();};
 if(a==='always'||a==='once'){const f=async()=>{await lbUpload();go();};if(!lbPilot())lbNameDlg(f);else f();}else go();},true);
// ---- al acabar: botón en el hueco libre; con «Siempre», se sube sola si es tu mejor marca ----
{const _eg=endGame;endGame=function(){const r=_eg.apply(this,arguments);try{LBR.cur=lbRun();LBR.up=null;LBR.busy=false;LBR.asked=0;
 if(LBR.cur&&LB.end){LB.end.left=String(LB.end.left).replace(/<\/div>\s*$/,lbBtnHTML()+'</div>');if(LB.open)lbRender();
  const R=LBR.cur,B=lbBestGet()[R.era+'|'+R.amz+'|'+R.hero];if(OPT.lbup==='always'&&lbPilot()&&!(B>=R.score))lbUpload();}}catch(e){console.warn(e);}return r;};}
// seguir sin haberla subido (Jugar de nuevo / Menú principal): aviso, si toca
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-a="reset"],[data-a="menu"]');if(!b||!LB.open||LB.area!=='end'||b.dataset.lbok)return;
 if(!LBR.cur||(LBR.up&&LBR.up.ok)||LBR.busy||LBR.asked||OPT.lbup!=='ask')return;
 e.stopPropagation();e.preventDefault();lbAskDlg(()=>{b.dataset.lbok=1;b.click();delete b.dataset.lbok;});},true);
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-a="lbup"],[data-a="lbrank"],[data-a="lbrkera"],[data-a="lbrkamz"],[data-a="lbrkback"],[data-a="lbrkname"]');if(!b)return;e.stopPropagation();e.preventDefault();const a=b.dataset.a;
 if(a==='lbup')lbUpload();else if(a==='lbrank')lbRankOpen();else if(a==='lbrkback'){LB.msg=null;lbOpen('end');}
 else if(a==='lbrkname')lbNameDlg(null);
 else{if(a==='lbrkera'){LBR.era=+b.dataset.v;LBR.sel=null;}else LBR.sel=+b.dataset.v;try{sfx('page');}catch(_){}lbRankLoad();lbRender();}},true);
// ---- la tabla ----
async function lbRankLoad(){const era=LBR.era;try{if(!LBR.tiers[era]){const d=await (await fetch(LBURL+'/tiers?era='+era)).json();LBR.tiers[era]=d.ok?d.tiers:[];}
 const T=lbAmzOpen(era)?LBR.tiers[era]:LBR.tiers[era].filter(x=>x===0);if(LBR.sel==null||!T.includes(LBR.sel))LBR.sel=T.includes(LBR.cur&&LBR.cur.era===era?LBR.cur.amz:-1)?LBR.cur.amz:(T[0]??0);
 const k=era+'|'+LBR.sel;if(!LBR.data[k]){const d=await (await fetch(LBURL+'/top?era='+era+'&amz='+LBR.sel)).json();LBR.data[k]=d.ok?d.top:[];}}catch(e){LBR.err=1;}
 if(LB.open&&LB.area==='msg'&&LB.msg&&LB.msg.key==='rank')lbRender();}
function lbRankParts(){const era=LBR.era,open=lbAmzOpen(era),T=(LBR.tiers[era]||[]).filter(x=>open||x===0),me=lbPilot().toLowerCase(),L=LBR.data[era+'|'+LBR.sel];
 const eras=[1,2].filter(e=>e===1||(typeof era2Ok==='function'&&era2Ok()));
 const hn=id=>(HEROES[id]&&HEROES[id].n)||id;
 const left=`<h3>Clasificación</h3><div class="bksub">${open?'Una tabla por nivel de amenaza · ':''}tu mejor partida con cada héroe</div>
  ${eras.length>1?`<div class="lbrkeras">${eras.map(e=>`<button data-a="lbrkera" data-v="${e}" class="${e===era?'on':''}">${ERADEF[e].esc||'Era '+ERADEF[e].n}</button>`).join('')}</div>`:''}
  ${open&&T.length?`<div class="lbrktabs">${T.map(n=>`<button data-a="lbrkamz" data-v="${n}" class="${n===LBR.sel?'on':''}">${n?'Amenaza '+n:'Sin amenazas'}</button>`).join('')}</div><p class="note">Cada nivel de amenaza tiene su propia tabla, y cada era las suyas.</p>`:''}
  <p class="note">Piloto: <b>${lbPilot()||'sin nombre'}</b> · <button class="lbbk sm" data-a="lbrkname">Cambiar nombre</button></p>`;
 let right;if(LBR.err)right='<p class="note">No se ha podido cargar la clasificación. Comprueba la conexión.</p>';
 else if(!L)right='<p class="note">Cargando…</p>';
 else if(!L.length)right='<p class="note">Aún no hay partidas aquí. ¡Sé el primero!</p>';
 else right=`<table class="lbrkt"><tr><th>#</th><th>Piloto</th><th>Héroe</th><th>Ronda</th><th class="s">Puntos</th></tr>${L.map((r,i)=>`<tr class="${r.nick.toLowerCase()===me?'me':''}"><td class="n">${i+1}</td><td>${r.nick}</td><td>${hn(r.hero)}</td><td>${r.round}${r.won?' ✓':''}</td><td class="s">${fi(r.score)}</td></tr>`).join('')}</table>`;
 return {left,right};}
function lbRankOpen(){LBR.err=0;LBR.era=LBR.era||(LBR.cur?LBR.cur.era:(S&&S.era)||ERA||1);
 LB.msg={key:'rank',left:()=>lbRankParts().left,right:()=>lbRankParts().right,footL:`<button class="lbbk" data-a="${LB.end?'lbrkback':'menu'}">‹ Volver</button>`,footR:'',onBack:()=>{if(LB.end)lbOpen('end');}};
 lbOpen('msg');lbRankLoad();}
// cinta «Clasificación» en el final de partida
{const _ep=endParts;endParts=function(){const p=_ep.apply(this,arguments);try{if(LBR.cur&&p.ribs)p.ribs=p.ribs.replace(/<\/div>\s*$/,`<button class="bkrib" data-a="lbrank" title="Clasificación"><svg width="24" height="22" viewBox="0 0 24 22" fill="#f2cd62" stroke="#1b1712" stroke-width="1.4"><rect x="8.5" y="6" width="7" height="15"/><rect x="1.5" y="11" width="7" height="10" fill="#d9d2c2"/><rect x="15.5" y="14" width="7" height="7" fill="#d08a4a"/><path d="M12 1l1 2 2 .3-1.5 1.4.4 2.1L12 5.8l-1.9 1 .4-2.1L9 3.3l2-.3z"/></svg><span>Clasificación</span></button></div>`);}catch(e){}return p;};}
