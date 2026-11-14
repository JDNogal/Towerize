// ==================== v318 · AMENAZAS (dificultad al estilo del Calor de Hades) ====================
// Decidido con Nogal (13-nov-2026): mismo nombre en todas las eras; se desbloquean al completar la era (3 piezas → logro de plata);
// botón a la derecha de las piezas; pantalla aparte agrupada por tipo; resumen antes de empezar; +10 % de puntuación por punto.
// Tanda 1: el sistema y Supercampeones y Venganza. El resto se ven y se desbloquean, pero aún no se pueden activar.
const AZSV=(b)=>`<svg viewBox="-4 -4 56 56" width="1em" height="1em" class="amzsv">${b}</svg>`;
const AZK='stroke="#1b1712" stroke-width="2.1" stroke-linejoin="round" stroke-linecap="round"';
const AZIC={
 sup:AZSV(`<path d="M10 40h28l3-18-9 7-8-13-8 13-9-7z" fill="#ffcf4a" ${AZK}/><circle cx="24" cy="14" r="3" fill="#ff5a64" ${AZK}/><circle cx="7" cy="20" r="2.5" fill="#5ab4ff" ${AZK}/><circle cx="41" cy="20" r="2.5" fill="#5ab4ff" ${AZK}/><path d="M10 40h28v5H10z" fill="#e0a52a" ${AZK}/>`),
 ven:AZSV(`<path d="M24 4c6 8 14 12 13 24a13 13 0 01-26 0c0-8 6-10 6-17 3 3 4 5 4 8 3-5 4-10 3-15z" fill="#ff5a3c" ${AZK}/><path d="M17 27l6 3M31 27l-6 3" ${AZK} fill="none"/><path d="M19 37q5-4 10 0" fill="none" ${AZK}/>`),
 cor:AZSV(`<path d="M6 10h14v14H6zM20 10h14v14H20zM20 24h14v14H20z" fill="#6a4a8a" ${AZK}/><path d="M34 24h8v14h-8z" fill="#3a2a4a" ${AZK}/><path d="M26 12l-3 7 5 4-4 7 3 6" fill="none" stroke="#c070ff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`),
 nie:AZSV(`<path d="M8 32a8 8 0 016-13 11 11 0 0121-2 8 8 0 016 15z" fill="#aab2bc" ${AZK}/><path d="M12 40h26M16 45h18" stroke="#8a929c" stroke-width="3" stroke-linecap="round"/><ellipse cx="24" cy="25" rx="8" ry="5" fill="#fff" ${AZK}/><circle cx="24" cy="25" r="2.5" fill="#1b1712"/>`),
 ref:AZSV(`<path d="M10 26a14 14 0 0128 0v6H10z" fill="#9aa3ad" ${AZK}/><path d="M8 32h32v5H8z" fill="#6b7480" ${AZK}/><circle cx="35" cy="35" r="10" fill="#fff" ${AZK}/><path d="M35 29v6l4 3" fill="none" ${AZK}/>`),
 ase:AZSV(`<path d="M12 4h24M12 44h24" ${AZK}/><path d="M15 4c0 12 18 12 18 20S15 32 15 44h18c0-12-18-12-18-20S33 16 33 4z" fill="#f2e3c0" ${AZK}/><path d="M18 40q6-6 12 0z" fill="#ff5a3c"/><path d="M20 12h8l-4 6z" fill="#ff5a3c"/>`),
 sab:AZSV(`<rect x="8" y="22" width="20" height="18" rx="3" fill="#c0392b" ${AZK}/><path d="M18 22v-6q0-6 8-6h6" fill="none" ${AZK}/><path d="M34 6l4 4M38 4l1 5M32 10l-4 1" stroke="#ffcf4a" stroke-width="2.4" stroke-linecap="round"/><path d="M12 29h12M12 34h12" stroke="#1b1712" stroke-width="1.6"/>`),
 gri:AZSV(`<ellipse cx="24" cy="26" rx="14" ry="18" fill="#3a1a5a" ${AZK}/><path d="M24 12c6 4 6 10 0 14s-6 10 0 14" fill="none" stroke="#c070ff" stroke-width="2.6" stroke-linecap="round"/><path d="M18 18q-4 8 2 16M30 18q4 8-2 16" fill="none" stroke="#7ad8ff" stroke-width="1.8" stroke-linecap="round"/>`),
 aba:AZSV(`<path d="M12 44V6" ${AZK}/><path d="M12 8h26l-6 8 6 8H12z" fill="#c0392b" ${AZK}/><circle cx="22" cy="16" r="3.5" fill="#ffcf4a" ${AZK}/>`),
 saq:AZSV(`<path d="M16 16h16l6 12a12 12 0 01-12 16h-4a12 12 0 01-12-16z" fill="#c9a05a" ${AZK}/><path d="M18 16l-3-8h18l-3 8" fill="#b08040" ${AZK}/><circle cx="24" cy="31" r="5" fill="#ffcf4a" ${AZK}/><path d="M36 10l6-4M38 16h6" stroke="#c0392b" stroke-width="2.6" stroke-linecap="round"/>`),
 inf:AZSV(`<circle cx="20" cy="28" r="13" fill="#ffcf4a" ${AZK}/><circle cx="20" cy="28" r="8" fill="none" stroke="#c99a2a" stroke-width="1.8"/><path d="M34 26V6M28 12l6-6 6 6" fill="none" stroke="#c0392b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`)};

// ---- datos: [id, nombre, grupo, rangos [[puntos, texto]], desbloqueo] ----
// desbloqueo: 'ini' (de salida), número N (gana con N puntos de amenaza), 'e2' (gana con amenazas en la Era Distópica), 'fut' (aún no existe)
const AZT=[
 ['sup','Supercampeones','en',[[2,'Desde la ronda 6, algunos campeones ascienden a supercampeón con <b>1 rasgo</b> al azar: escudo frontal, paso rápido, regeneración o resistencia a control. Cada vez más a menudo en las rondas altas. Dan el doble de oro.'],[2,'Los supercampeones llevan <b>2 rasgos</b>.'],[2,'Desde la ronda 12, algunos supercampeones llevan <b>3 rasgos</b>.']],'ini'],
 ['ven','Venganza','en',[[3,'Cuando muere un mini-élite o un jefe, los enemigos a 2 casillas se enfurecen <b>4 s</b>: corren un 50 % más y no se les puede retener.'],[2,'También cuando muere un élite, a <b>3</b> casillas y durante <b>6 s</b>.']],3],
 ['sab','Sabotaje','en',[[2,'A veces aparece un saboteador que va a por una torre. Él y la torre salen marcados; si llega, la torre se apaga <b>6 s</b>.'],[2,'La torre se apaga <b>10 s</b> y sale un saboteador más.']],6],
 ['aba','Abanderados','en',[[2,'Algunas escuadras llevan un abanderado: mientras vive, su escuadra no se puede ralentizar ni empujar.'],[2,'Además, su escuadra corre un <b>15 %</b> más mientras él vive.']],7],
 ['cor','Piezas corruptas','ma',[[2,'Cada <b>4</b> elecciones de pieza, las piezas vienen corruptas. Su casilla defectuosa se construye primero, su torre no se puede vender y sus mejoras cuestan un <b>25 %</b> más.'],[2,'Cada <b>3</b> elecciones; mejoras un <b>50 %</b> más caras.']],'bf'],
 ['nie','Niebla de guerra','ma',[[1,'La línea de rondas solo enseña la <b>ronda siguiente</b>.'],[2,'Además, los enemigos no se ven hasta que los detecta una torre, tu héroe o una unidad; desde entonces se ven siempre.'],[2,'Además, los portales no informan de la siguiente oleada.'],[2,'Además, no sabes <b>dónde están</b> los portales enemigos.']],5],
 ['gri','Grietas espaciotemporales','ma',[[3,'A veces se abre un portal especial por el que llegan escuadras extra de una era que ya has visto (con su oro).']],'e2',1],
 ['ref','Sin refuerzos','ri',[[1,'Tus soldados tardan un <b>50 %</b> más en reaparecer.'],[1,'Tardan un <b>100 %</b> más.'],[3,'Los que caen <b>no reaparecen</b> hasta la siguiente oleada.']],'ini'],
 ['ase','Asedio sin tregua','ri',[[2,'Desde que pones la pieza tienes <b>30 s</b> para construir; después la oleada empieza sola.'],[1,'Solo <b>20 s</b>.'],[2,'Solo <b>15 s</b>.']],'fast'],
 ['saq','Saqueadores','ec',[[2,'Cada enemigo que llega al núcleo, además de vida, te roba <b>20</b> de oro.'],[1,'Te roba <b>40</b> de oro.']],'ini'],
 ['inf','Inflación','ec',[[2,'Cada torre del mismo tipo que construyes cuesta un <b>10 %</b> más que la anterior.'],[2,'Un <b>15 %</b> más por cada torre igual, y sus mejoras también se encarecen.']],8],
 ['jp','Jefes preparados','je',[],'fut'],['js','Jefe supremo','je',[],'fut']];
// el último campo (1) marca las que aún no funcionan en partida: se ven, pero no se pueden activar hasta su versión
const AZG=[['en','Enemigos'],['ma','Mapa'],['ri','Ritmo y tropas'],['ec','Economía'],['je','Jefes']];
const AZ={sel:{1:{},2:{}},un:{}};try{Object.assign(AZ,JSON.parse(localStorage.getItem('rt-amz'))||{});}catch(e){}
const azSave=()=>{try{localStorage.setItem('rt-amz',JSON.stringify(AZ));}catch(e){}};
const azEraDone=era=>era===2?((typeof STO!=='undefined'&&STO.bb)||0)>=3:((typeof STO!=='undefined'&&STO.p)||0)>=3;
const AZBF=8,azBfSeen=()=>{try{return Object.keys((typeof SEEN!=='undefined'&&SEEN.bf)||{}).length;}catch(e){return 0;}};
const azUn=t=>t[4]==='ini'||!!AZ.un[t[0]]||(t[4]==='bf'&&azBfSeen()>=AZBF);
const azRk=id=>Math.max(1,(AZ.rk&&AZ.rk[id])||1);// rango más alto abierto: el siguiente se abre ganando con el anterior
const azReady=t=>azUn(t)&&!t[5]&&t[3].length>0;
const azCond=c=>c==='fut'?'llegará con los jefes nuevos':c==='e2'?'gana una partida con amenazas en la Era Distópica':c==='bf'?'descubre '+AZBF+' casillas especiales distintas ('+Math.min(AZBF,azBfSeen())+' / '+AZBF+')':c==='fast'?'gana una partida en menos de 1 minuto por ronda (tiempo real)':'gana una partida con '+c+' puntos de amenaza o más';
const azPtsOf=sel=>Object.entries(sel||{}).reduce((a,[k,r])=>{const t=AZT.find(x=>x[0]===k);if(!t)return a;for(let i=0;i<Math.min(r,t[3].length);i++)a+=t[3][i][0];return a;},0);
const azMult=p=>'×'+(1+p*.1).toFixed(1).replace('.',',');
const azOn=k=>!!(typeof S!=='undefined'&&S&&S.amz&&S.amz[k]>0)&&!S.tut&&!S.pvE&&!S.pvH;
const azRank=k=>azOn(k)?S.amz[k]:0;
const azRunPts=()=>typeof S!=='undefined'&&S&&S.amz?azPtsOf(S.amz):0;
const AZUI={sel:'sup',from:'era'};
const azFit=()=>setTimeout(()=>{try{const L=document.querySelector('#comp .amzl'),F=document.querySelector('#comp .lbft');if(L&&F&&!document.body.classList.contains('mfs')){const lt=L.getBoundingClientRect().top,ft=F.getBoundingClientRect().top;if(ft>lt+60)L.style.maxHeight=(ft-lt-10)/(parseFloat(getComputedStyle(L).zoom)||1)+'px';}
 for(const s of document.querySelectorAll('.amzsv:not([data-f])')){const b=s.getBBox();if(!b.width)continue;const m=Math.max(b.width,b.height)*1.08;s.setAttribute('viewBox',`${b.x+b.width/2-m/2} ${b.y+b.height/2-m/2} ${m} ${m}`);s.dataset.f=1;}}catch(e){}},30);
const AZLOCK=`<span class="amzlk">${typeof icU==='function'?icU('m_lock','🔒'):'🔒'}</span>`;

// ---- logro: completar la era (las 3 piezas) desbloquea las Amenazas en esa era ----
ACH.erac1={c:'tu',n:'Era Fantástica completada',d:'Consigue las 3 piezas del núcleo en la Era Fantástica.'};
ACH.erac2={c:'tu',n:'Era Distópica completada',d:'Recupera los 3 registros de la Era Distópica.'};ACHVIS.erac2=()=>typeof eraList==='function'&&eraList().includes(2);
setInterval(()=>{try{if(azEraDone(1)&&!(ACHS&&ACHS.erac1))achieve('erac1');if(azEraDone(2)&&!(ACHS&&ACHS.erac2))achieve('erac2');}catch(e){}},1500);

// ---- pantalla de Amenazas ----
const azRow=(t,sel,ro)=>{const[id,n,,rk]=t,r=sel[id]||0,lk=!azUn(t)||t[4]==='fut',p=rk.slice(0,r).reduce((a,x)=>a+x[0],0);
 return `<div class="amzr${r?' on':''}${!ro&&AZUI.sel===id?' sel':''}${lk?' lk':''}"${ro?'':` data-a="azsel" data-id="${id}"`}><span class="ai">${lk?AZLOCK:AZIC[id]}</span><span><b>${lk?'???':n}</b>${!lk&&t[5]?'<span class="tg">próximamente</span>':''}</span><span class="pp">${lk?'':rk.map((x,i)=>`<i class="${i<r?'f':''}"></i>`).join('')}</span><span class="pt">${p?'+'+p:''}</span></div>`;};
const azTot=sel=>{const p=azPtsOf(sel);return `<span class="amztot"><span><small>Amenaza</small><b>${p}</b></span><span><small>Puntuación</small><b>${typeof azScoreM==='function'?azMultT(azScoreM(sel,{})):azMult(p)}</b></span></span>`;};
function azParts(){const sel=AZ.sel[ERA]=AZ.sel[ERA]||{},t=AZT.find(x=>x[0]===AZUI.sel)||AZT[0],lk=!azUn(t)||t[4]==='fut';
 const left=`<h3>Amenazas</h3><div class="bksub">Opcional · hacen la partida más difícil y puntúan más · se guardan para la próxima partida</div><div class="amzl">${AZG.map(([g,n])=>`<div class="amzg">${n}</div>`+AZT.filter(x=>x[2]===g).map(x=>azRow(x,sel)).join('')).join('')}</div>`;
 let right;
 if(lk)right=`<div class="lbdet amzd"><div class="big lk">${AZLOCK}</div><h4>???</h4><p>Amenaza sin descubrir.</p><div class="lbcur">Para desbloquear: <b>${azCond(t[4])}</b></div></div>`;
 else{const r=sel[t[0]]||0;right=`<div class="lbdet amzd"><div class="big">${AZIC[t[0]]}</div><h4>${t[1]}</h4><div class="amzrk">${t[3].map((x,i)=>i<azRk(t[0])?`<div class="${i<r?'on':''}"><b class="n">Rango ${i+1} · +${x[0]}</b>${x[1]}</div>`:`<div class="lk"><b class="n">Rango ${i+1} · +${x[0]}</b>Se abre al ganar una partida con el rango ${i}.</div>`).join('')}</div>${t[5]?'<p class="bknote">Todavía no se puede activar: llegará en una próxima versión.</p>':`<div class="amzbtns"><button class="gbtn" data-a="azdec"${r?'':' disabled'} title="Quitar rango"><span>−</span></button><button class="gbtn" data-a="azinc"${r<Math.min(t[3].length,azRk(t[0]))?'':' disabled'} title="Añadir rango"><span>+</span></button></div>`}</div>`;}
 return {marks:null,key:'amz'+JSON.stringify(sel)+AZUI.sel,left,right,footL:'',footR:`<span class="amzft">${azTot(sel)}<button class="gbtn" data-a="azback">Continuar ›</button></span>`,after:azFit};}
// ---- resumen antes de empezar ----
function azResParts(){const id=RL.hsel,D=HEROES[id],E=ERADEF[ERA]||{},done=azEraDone(ERA),sel=AZ.sel[ERA]||{},on=AZT.filter(t=>(sel[t[0]]||0)>0),p=azPtsOf(sel);
 const left=`<h3>Resumen</h3><div class="bksub">Nueva partida · revisa antes de empezar</div><div class="amzres">
  <div class="it"><span class="ai">${E.ic||''}</span><span><small>Era</small><b>${ERA===2?'Distópica · Ruinas de Neón':'Fantástica · Reino'}</b></span><button class="lbbk ch" data-a="azch" data-v="era">Cambiar</button></div>
  <div class="it"><span class="ai">${typeof icU==='function'?icU('m_hourglass','⏳'):'⏳'}</span><span><small>Duración</small><b>${ROUNDS} rondas</b></span><button class="lbbk ch" data-a="azch" data-v="rounds">Cambiar</button></div>
  <div class="it" style="--hc:${D.col}"><span class="hp">${portrait(id)}</span><span><small>Héroe</small><b>${D.n}</b><small>${D.role} · ${D.ranged?'A distancia':'Cuerpo a cuerpo'}</small></span><button class="lbbk ch" data-a="azch" data-v="hero">Cambiar</button></div></div>`;
 const right=done?`<h3>Amenazas</h3><div class="bksub">${on.length?p+' puntos de amenaza · puntuación '+azMult(p):'Sin amenazas · partida normal'}</div><div class="amzl" style="margin-top:10px">${on.length?on.map(t=>azRow(t,sel,1)).join(''):'<p style="opacity:.75">Puedes añadir amenazas para que la partida sea más difícil y puntúe más.</p>'}</div><div style="margin-top:12px"><button class="amzsealb" data-a="azopen" data-v="res"><span class="ai">${AZIC.sup}</span>${on.length?'Cambiar amenazas':'Añadir amenazas'}</button></div>`
  :`<div class="lbdet"><span class="lbdic">${E.ic||''}</span><h4>Todo listo</h4><p>Cuando estés preparado, empieza la partida.</p></div>`;
 return {marks:null,key:'res'+JSON.stringify(sel)+ERA+id,left,right,footL:`<button class="lbbk" data-a="azch" data-v="hero">‹ Héroe</button>`,footR:`<button class="gbtn" data-a="azgo">Empezar partida ›</button>`,after:azFit};}
// botón de la era: a la derecha de las piezas (solo con la era completada)
const azSeal=()=>{const sel=AZ.sel[ERA]||{},p=azPtsOf(sel),on=Object.entries(sel).filter(x=>x[1]>0);
 // v326: con los Apoyos desbloqueados, el mismo botón pasa a «Apoyos / Amenazas» con el nivel neto y la puntuación completa
 if(typeof apOk==='function'&&apOk()){const as=apSelOf(),pp=apPtsOf(as),m=azScoreM(sel,as),ao=APT.filter(t=>as[t[0]]);
  return `<div class="amzpos A"><div class="amzseal" data-a="azopen" data-v="era"><span class="ai">${AZIC.sup}</span><span><b>Apoyos / Amenazas</b>${on.length||ao.length?`<small>${pp?`<span class="apc">−${pp}</span> · `:''}${p?`<span class="azc">+${p}</span> · `:''}amenaza ${Math.max(0,p-pp)} · puntuación ${azMultT(m)}</small><span class="act">${ao.map(t=>`<span class="ai">${APIC('#3a8a3a')}</span>`).join('')}${on.map(([k,r])=>`<span class="ai">${AZIC[k]}${r>1?`<i>${r}</i>`:''}</span>`).join('')}</span>`:'<small>Opcional: ayúdate o ponte las cosas difíciles</small>'}</span></div></div>`;}
 return `<div class="amzpos A"><div class="amzseal" data-a="azopen" data-v="era"><span class="ai">${AZIC.sup}</span><span><b>Amenazas</b>${on.length?`<small>${p} puntos · puntuación ${typeof azScoreM==='function'?azMultT(azScoreM(sel,{})):azMult(p)}</small><span class="act">${on.map(([k,r])=>`<span class="ai">${AZIC[k]}${r>1?`<i>${r}</i>`:''}</span>`).join('')}</span>`:'<small>Opcional: haz la partida más difícil</small>'}</span></div></div>`;};
{const _pp=prepParts;prepParts=function(){if(LB.step==='amz')return azParts();if(LB.step==='res')return azResParts();const P=_pp.apply(this,arguments);
 try{if(P&&(P.key==='era'||P.key==='era2')&&azEraDone(ERA)){P.key+='az'+azPtsOf(AZ.sel[ERA])+(typeof apSelOf==='function'?JSON.stringify(apSelOf()):'');const _a=P.after;P.after=()=>{try{_a&&_a();}catch(e){}setTimeout(()=>{try{const pcs=document.querySelector('#comp .lbera .pcs');if(pcs&&!document.querySelector('#comp .amzpos')){pcs.classList.add('amzA');pcs.insertAdjacentHTML('afterend',azSeal());azFit();}}catch(e){}},0);};}}catch(e){}
 return P;};}
// clics (antes que el resto: elegir héroe pasa por el resumen)
document.addEventListener('click',ev=>{const b=ev.target.closest&&ev.target.closest('[data-a]');if(!b)return;const a=b.dataset.a;
 const stop=()=>{ev.stopPropagation();ev.preventDefault();try{sfx('page');}catch(_){}};
 if(a==='pickhero'&&LB.area==='prep'&&(LB.step||'')!=='res'&&b.dataset.id&&!(typeof S!=='undefined'&&S&&S.tut)){stop();RL.hsel=b.dataset.id;LB.step='res';lbRender();return;}
 if(!/^az/.test(a))return;stop();const sel=AZ.sel[ERA]=AZ.sel[ERA]||{},t=AZT.find(x=>x[0]===AZUI.sel);
 if(a==='azopen'){AZUI.from=b.dataset.v||'era';LB.step='amz';}
 else if(a==='azback'){LB.step=AZUI.from==='res'?'res':'era';}
 else if(a==='azsel'){AZUI.sel=b.dataset.id;}
 else if(a==='azinc'&&t&&azReady(t)){sel[t[0]]=Math.min(t[3].length,azRk(t[0]),(sel[t[0]]||0)+1);azSave();}
 else if(a==='azdec'&&t){sel[t[0]]=Math.max(0,(sel[t[0]]||0)-1);if(!sel[t[0]])delete sel[t[0]];azSave();}
 else if(a==='azch'){const v=b.dataset.v;LB.step=v==='hero'?'hero':v==='rounds'?'rounds':'era';}
 else if(a==='azgo'){LB.step='hero';chooseHero(RL.hsel);return;}
 lbRender();},true);
// al empezar: las amenazas elegidas para esta era (solo si está completada y están desbloqueadas y listas)
{const _ch=chooseHero;chooseHero=function(id){try{if(typeof S!=='undefined'&&S&&!S.tut&&!S.amz){const sel=AZ.sel[ERA]||{};S.amz={};if(azEraDone(ERA))for(const t of AZT)if(sel[t[0]]>0&&azReady(t))S.amz[t[0]]=Math.min(sel[t[0]],t[3].length,azRk(t[0]));}}catch(e){}return _ch.apply(this,arguments);};}
{const _sg=startGame;startGame=function(){const r=_sg.apply(this,arguments);try{if(S)S.amz=null;}catch(e){}return r;};}

// ---- puntuación: +10 % por punto de amenaza ----
{const _sc=scoreCalc;scoreCalc=function(){const r=_sc.apply(this,arguments);try{const p=azRunPts();if(p>0&&r.t>0){const x=Math.round(r.t*p*.1);r.rows.push(['amz','Amenazas',p+' puntos de amenaza · '+azMult(p),x]);r.t+=x;}}catch(e){}return r;};}
{const _hr=hsRec;hsRec=function(){const r=_hr.apply(this,arguments);try{if(r&&S&&S.amz)r.amz=Object.assign({},S.amz);}catch(e){}return r;};}
// ---- desbloqueos al ganar ----
{const _eg=endGame;endGame=function(){const won=S&&S.phase==='won',p=typeof apNetRun==='function'?apNetRun():azRunPts(),era=ERA,fast=won&&!S.tut&&(GT.r||1e9)<=ROUNDS*60,act=Object.assign({},S&&S.amz||{});const r=_eg.apply(this,arguments);try{if(won){const nu=[];AZ.rk=AZ.rk||{};
  for(const[k,v]of Object.entries(act)){const t=AZT.find(x=>x[0]===k);if(t&&v>=azRk(k)&&v<t[3].length){AZ.rk[k]=v+1;nu.push(t[1]+' (rango '+(v+1)+')');}}
  for(const t of AZT){if(azUn(t))continue;const c=t[4];if((typeof c==='number'&&p>=c)||(c==='e2'&&era===2&&p>0)||(c==='fast'&&fast)){AZ.un[t[0]]=1;nu.push(t[1]);}}
  if(nu.length){azSave();if(azEraDone(1)||azEraDone(2))setTimeout(()=>{try{toast('Amenazas desbloqueadas: <b>'+nu.join('</b>, <b>')+'</b>');}catch(e){}},1200);}}}catch(e){}return r;};}
// ---- Borrar progreso: también las amenazas y el progreso de los logros ----
document.addEventListener('click',ev=>{const b=ev.target.closest&&ev.target.closest('[data-a="preset"]');if(b&&typeof OP!=='undefined'&&OP.rst){for(const k of['rt-luck','rt-amz','rt-prog'])try{localStorage.removeItem(k);}catch(e){}}},true);

// ---- en partida: contador (en el sitio de los FPS; los FPS van a su derecha) ----
setInterval(()=>{try{let c=$('amzchip');const p=typeof apNetRun==='function'?apNetRun():azRunPts(),show=p>0&&typeof S!=='undefined'&&S&&S.hero&&!document.body.classList.contains('inmenu');
 if(!show){if(c)c.style.display='none';return;}
 if(!c){c=document.createElement('div');c.id='amzchip';c.className='c amzchip';document.body.appendChild(c);}
 const h=`<span class="ai">${AZIC.sup}</span>Amenazas · ${p}`;if(c.dataset.h!==h){c.innerHTML=h;c.dataset.h=h;azFit();}c.style.display='';
 const mb=document.querySelector('#mtl button');if(mb){const z=parseFloat(getComputedStyle(c).zoom)||1,r=mb.getBoundingClientRect();c.style.left=(r.right+8*z)/z+'px';c.style.top=(r.top+(r.height-c.offsetHeight*z)/2)/z+'px';}}catch(e){}},200);

// ---- Supercampeones ----
const AZCH=new Set(['champ','dchamp','armored','centu','praet','brute','titan']);
const AZTR=[['sh','Escudo frontal'],['fa','Paso rápido'],['rg','Regeneración'],['cc','Resistencia a control']];
{const _se=spawnEnemy;spawnEnemy=function(t){const n=S&&S.enemies?S.enemies.length:0;const r=_se.apply(this,arguments);try{const R=azRank('sup');if(R&&S.enemies.length>n){const e=S.enemies[S.enemies.length-1];
  if(AZCH.has(e.t)&&S.round>5){const pr=.1+.25*Math.max(0,Math.min(1,(S.round-6)/Math.max(1,ROUNDS-6)));if(Math.random()<pr){const tr=AZTR.map(x=>x[0]).sort(()=>Math.random()-.5).slice(0,R>=3&&S.round>=12&&Math.random()<.5?3:Math.min(R,2));e.sup=tr;
   if(tr.includes('sh'))e.supSh=4;if(tr.includes('fa'))e.supFa=1;}}}}catch(x){}return r;};}
{const _hm=eHurtMod;eHurtMod=function(e,a,src,ty){if(e&&e.supSh>0&&!DNK&&a>0){e.supSh--;S.fx.push({x:e.x,y:e.y,t:.2,m:.2,r:.35*K,col:'#ffcf4a'});return 0;}return _hm.apply(this,arguments);};}
{const _mv=move;move=function(e,dt){if(e&&(e.supFa||e.rage>0)){const h=e.fx.haste,m=(e.supFa?1.3:1)*(e.rage>0?1.5:1);if(!h||h.m<m)e.fx.haste={m,t:.3};if(e.rage>0)e.stopped=false;}return _mv.apply(this,arguments);};}
{const _st=stunE;stunE=function(e,t){if(e&&e.sup&&e.sup.includes('cc'))t*=BOSSRES;return _st.call(this,e,t);};}
{const _fr=freezeE;freezeE=function(e,t){if(e&&e.sup&&e.sup.includes('cc'))t*=BOSSRES;return _fr.call(this,e,t);};}
{const _sl=slowE;slowE=function(e,m,t){if(e&&e.sup&&e.sup.includes('cc'))m=1-(1-m)*BOSSRES;return _sl.call(this,e,m,t);};}
// regeneración del rasgo: como un élite (0,5 %/s, la mitad en combate) — la cuenta rgTick (regen_resmag.js)
{const _rg=rgTick;rgTick=function(dt){for(const e of S.enemies)if(e.sup&&e.sup.includes('rg')&&!RGEN[e.t])e.rgX=.005;return _rg.apply(this,arguments);};}
// oro doble y Venganza al morir
{const _d=achDeath;achDeath=function(e){const r=_d.apply(this,arguments);try{if(!e.leak){
  if(e.sup){const g=rndG(killGoldF(e.t));S.gold+=g;if(S.st)S.st.gKill+=g;}
  if(azOn('ven')){/* v329: R1 mini-élites y jefes; R2 además élites, a 3 casillas y 6 s (Nogal, 14-nov) */const R=azRank('ven'),mi=e.t==='mini'||ELV[1].mini.includes(e.t)||ELV[2].mini.includes(e.t),el=!mi&&(e.t==='elite'||ELV[1].elite.includes(e.t)||ELV[2].elite.includes(e.t)||(ET[e.t]&&ET[e.t].el));
   if(isBoss(e)||mi||(R>=2&&el)){const rr=(R>=2?3:2)*K,dur=R>=2?6:4;for(const q of S.enemies)if(q!==e&&q.hp>0&&Math.hypot(q.x-e.x,q.y-e.y)<=rr){q.rage=Math.max(q.rage||0,dur);}S.fx.push({x:e.x,y:e.y,t:.5,m:.5,r:rr,col:'#ff5a3c'});}}}}catch(x){}return r;};}
setInterval(()=>{try{if(!S||S.phase!=='wave')return;for(const e of S.enemies)if(e.rage>0)e.rage-=.1*(S.espd||1);}catch(e){}},100);
// en el mapa: corona del supercampeón y aura roja del enfurecido
{const _dw=e2DrawWorld;e2DrawWorld=function(lw){const r=_dw.apply(this,arguments);try{const X=v=>v*CS+CS/2,es=typeof EVS!=='undefined'?EVS:1;
  for(const e of S.enemies){if(!(e.hp>0))continue;const rr=ET[e.t].r*CS*es,x=X(e.x),y=X(e.y);
   if(e.sup){const w=rr*.9,h=rr*.55,top=y-rr-h*.6;g.fillStyle='#ffcf4a';g.strokeStyle='#1b1712';g.lineWidth=lw(1.6);g.beginPath();g.moveTo(x-w/2,top+h);g.lineTo(x-w/2,top+h*.25);g.lineTo(x-w/4,top+h*.6);g.lineTo(x,top);g.lineTo(x+w/4,top+h*.6);g.lineTo(x+w/2,top+h*.25);g.lineTo(x+w/2,top+h);g.closePath();g.fill();g.stroke();}
   if(e.rage>0){g.strokeStyle='rgba(255,90,60,.85)';g.lineWidth=lw(2.4);g.beginPath();g.arc(x,y,rr+lw(5),0,7);g.stroke();}}}catch(x){}return r;};}

// ---- Sin refuerzos: los soldados tardan más en reaparecer (R3: hasta la siguiente oleada) ----
{const _ud=unitDeath;unitDeath=function(t,s){const r=_ud.apply(this,arguments);try{const R=azRank('ref');if(R&&t&&!t.hero&&s&&!s.H){if(R>=3)s.rt=1e9;else if(s.rt>0)s.rt*=R===2?2:1.5;}}catch(e){}return r;};}
{const _sw=startWave;startWave=function(){const r=_sw.apply(this,arguments);try{if(S&&S.phase==='wave')for(const t of unitTowers())for(const s of t.sd||[])if(s.rt>1e8)s.rt=.5;}catch(e){}return r;};}
// ---- Saqueadores: cada enemigo que llega al núcleo roba 20 de oro ----
{const _d2=achDeath;achDeath=function(e){const r=_d2.apply(this,arguments);try{if(e&&e.leak&&azOn('saq')&&S.gold>0){const g=Math.min(S.gold,azRank('saq')>=2?40:20);S.gold-=g;S.fx.push({x:S.core.x,y:S.core.y,t:.6,m:.6,r:.8*K,col:'#ffcf4a'});if(S.st)S.st.gSaq=(S.st.gSaq||0)+g;}}catch(x){}return r;};}
