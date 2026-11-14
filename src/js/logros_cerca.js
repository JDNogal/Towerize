// ==================== v319 · Aviso de «¡Cerca de un logro!» ====================
// Idea de Nogal (13-nov-2026): cuando un logro que se mide en partida llega al 80 %, el juego te avisa (abajo en el centro), con su trofeo,
// su barra y un botón para fijarlo. Una vez por logro y partida; los de progreso entre partidas (bajas con cada torre, cofres…), una vez por nivel.
// Nunca de logros ocultos o sin descubrir. Se puede quitar en Opciones › Juego.
const NEARP=.8;
OPTS.splice(Math.max(0,OPTS.findIndex(o=>o.tab==='jg')),0,{tab:'jg',type:'toggle',key:'nearach',def:true,label:'Avisar de logros cercanos',desc:'Cuando te falta poco para un logro (has hecho el 80 %), sale un aviso abajo con su progreso y un botón para fijarlo.'});
if(OPT.nearach===undefined)OPT.nearach=true;
const NEAR={q:[],cur:null,tm:0};let NEARC={};try{NEARC=JSON.parse(localStorage.getItem('rt-near'))||{};}catch(e){}
const nearLv=id=>(ACH[id]&&ACH[id].lv)||(typeof ACHLV!=='undefined'&&ACHLV[id])||'s';
function nearProg(id){const A=ACH[id];if(!A)return null;const M=typeof APM!=='undefined'&&APM[id];
 if(M){if(M.cur&&id!=='curious')return [M.cur(),M.max,'run'];if(M.best)return [((S&&S.gbest)||{})[id]||0,M.max,'run'];return null;}
 if(typeof A.prog==='function'){const p=A.prog();return p?[p[0],p[1],'car']:null;}return null;}
function nearHtml(id){const A=ACH[id],p=nearProg(id)||[0,1],pc=Math.min(100,p[0]/p[1]*100),pin=typeof PINS!=='undefined'&&PINS.includes(id);
 return `<div class="nearbx"><span class="ntr">${typeof trofIcL==='function'?trofIcL(nearLv(id)):trofIc()}</span><span class="ntx"><b>¡Cerca de un logro!</b><span class="nn">${A.n}</span><span class="nbar"><i style="width:${pc}%"></i></span><small>${fi(Math.min(p[0],p[1]))} / ${fi(p[1])}</small></span><button class="npin${pin?' on':''}" data-nearpin="${id}">${typeof icU==='function'?icU('m_pin','📌'):''}${pin?'Fijado':'Fijar'}</button></div>`;}
function nearShow(id){let el=$('nearach');if(!el){el=document.createElement('div');el.id='nearach';document.body.appendChild(el);}NEAR.cur=id;el.innerHTML=nearHtml(id);el.classList.add('on');try{sfx('page');}catch(e){}
 clearTimeout(NEAR.tm);NEAR.tm=setTimeout(()=>{el.classList.remove('on');NEAR.cur=null;},8000);}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-nearpin]');if(!b)return;e.stopPropagation();e.preventDefault();const id=b.dataset.nearpin;
 if(!PINS.includes(id)){if(PINS.length>=3){toast('Ya tienes 3 logros fijados: quita uno para fijar este.');return;}PINS.push(id);savePins();try{apanTick(1);}catch(_){}}
 const el=$('nearach');if(el&&NEAR.cur===id){el.innerHTML=nearHtml(id);clearTimeout(NEAR.tm);NEAR.tm=setTimeout(()=>{el.classList.remove('on');NEAR.cur=null;},4000);}},true);
setInterval(()=>{try{if(typeof S==='undefined'||!S||!S.hero||S.tut||S.pvE||S.pvH||!OPT.nearach)return;if(S.phase!=='wave'&&S.phase!=='build')return;
 S.near=S.near||{};
 // el que se ve: progreso al día
 if(NEAR.cur){const el=$('nearach'),p=nearProg(NEAR.cur);if(el&&p){const i=el.querySelector('.nbar i'),s=el.querySelector('.ntx small');if(i)i.style.width=Math.min(100,p[0]/p[1]*100)+'%';if(s)s.textContent=fi(Math.min(p[0],p[1]))+' / '+fi(p[1]);}}
 for(const id of Object.keys(ACH)){if(ACHS[id]||S.near[id]||NEARC[id]||NEAR.q.includes(id)||NEAR.cur===id)continue;
  try{if(typeof achVis==='function'&&!achVis(id))continue;if(typeof achFound==='function'&&!achFound(id))continue;if(typeof achSec==='function'&&achSec(id))continue;}catch(e){continue;}
  /* v334: si ya no se puede conseguir en esta partida, no se avisa */try{if(typeof achState==='function'){const st=achState(id);if(st&&st[0]==='ko')continue;}}catch(e){}
  const p=nearProg(id);if(!p||!(p[1]>0))continue;const r=p[0]/p[1];
  if(r>=NEARP&&r<1){if(p[2]==='car'){NEARC[id]=1;try{localStorage.setItem('rt-near',JSON.stringify(NEARC));}catch(e){}}else S.near[id]=1;NEAR.q.push(id);}}
 while(NEAR.q.length&&(()=>{try{const st=achState(NEAR.q[0]);return st&&st[0]==='ko';}catch(e){return false;}})())NEAR.q.shift();if(!NEAR.cur&&NEAR.q.length)nearShow(NEAR.q.shift());
 // si sale a la vez el de enemigo nuevo, este se pone encima
 const el=$('nearach'),ne=$('nenot');if(el)el.classList.toggle('up',!!(ne&&ne.classList.contains('on')));}catch(e){}},1000);
// Borrar progreso: también los avisos ya dados
document.addEventListener('click',ev=>{const b=ev.target.closest&&ev.target.closest('[data-a="preset"]');if(b&&typeof OP!=='undefined'&&OP.rst){try{localStorage.removeItem('rt-near');}catch(e){}}},true);
