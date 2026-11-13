// ==================== v313 · Logros por niveles: bronce, plata, oro y platino; bajas y marcas por torre ====================
// Aprobado por Nogal el 13-nov-2026 (maquetas/logros_niveles.html: trofeos opción A, bordes opción B).
// · Cada logro tiene su nivel (ACHLV). El trofeo es el de siempre en su metal (en neón, la estrella del color del metal).
// · Logros nuevos de bronce (sencillos), bajas con cada torre (bronce/plata/oro → borde de esa torre) y el platino (todos los demás).
// · Progreso que se guarda entre partidas (rt-prog): bajas por torre, jefes, cofres, eventos y las marcas de cada torre.
// · Estadísticas › Marcas: tabla de torres con sus marcas (columnas numeradas; el bocadillo dice qué es cada número).

// ---------- progreso guardado ----------
let PRG={twk:{},boss:0,chests:0,evs:0,twm:{}};try{const o=JSON.parse(localStorage.getItem('rt-prog'));if(o)PRG=Object.assign(PRG,o);}catch(e){}
let PRGt=0;const prgSave=()=>{clearTimeout(PRGt);PRGt=setTimeout(()=>{try{localStorage.setItem('rt-prog',JSON.stringify(PRG));}catch(e){}},400);};
const prgOn=()=>typeof S!=='undefined'&&S&&!S.tut&&!S.pvE&&!S.pvH&&!(typeof PREVIEWING!=='undefined'&&PREVIEWING);

// ---------- niveles de los logros que ya había (revisables por Nogal) ----------
const ACHLV={curious:'b',chest:'b',event:'b',first:'b',tut_m:'b',sky:'b',elem:'b',pyro:'b',
 marathon:'g',perfect:'g',minimal:'g',close:'g',untouch:'g',bar:'g',cloink:'g',dragon:'g',party:'g',treasure:'g',rainbow:'g',rear:'g',onepath:'g',austere:'g',master:'g',clean:'g',nonet:'g'};
// cambios de Nogal (13-nov): «Soplaré y soplaré» pasa a plata y basta con conseguir las tres casas; «Todos los caminos…» con una descripción más clara
if(ACH.pigs)ACH.pigs.d='Consigue las tres casas de los cerditos en una misma partida.';
if(ACH.roma)ACH.roma.d='Haz que el camino salga del núcleo por un lado (por ejemplo, por la derecha) y dé la vuelta hasta que su portal quede al otro lado del núcleo (a la izquierda).';
const achLv=id=>ACH[id]&&ACH[id].lv||ACHLV[id]||'s';
const LVN={b:'Bronce',s:'Plata',g:'Oro',p:'Platino'};

// ---------- trofeos en cada metal ----------
const TROFM={b:{cup:'#c8803a',hl:'#f0b070',stem:'#a8642a',gem:'#3fae6a'},s:{cup:'#c8d0d8',hl:'#ffffff',stem:'#9aa4ae',gem:'#4a7ad8'},g:{cup:'#f2c140',hl:'#ffd75a',stem:'#e0a830',gem:'#e0405a'},p:{cup:'#e4eef4',hl:'#ffffff',stem:'#b8ccd8',gem:'#a86ae8'}};
const TROFN={b:'#ff9a4a',s:'#e8f0ff',g:'#ffd84a',p:'#c890ff'};
const TROFL={perg:{},holo:{}};
for(const lv in TROFM){const c=TROFM[lv];
 TROFL.perg[lv]=TROF.perg.replace('fill="#f2c140"',`fill="${c.cup}"`).replace('stroke="#ffd75a"',`stroke="${c.hl}"`).replace('fill="#e0a830"',`fill="${c.stem}"`).replace('fill="#e0405a"',`fill="${c.gem}"`).replace('stroke="#fff6c0"',`stroke="${c.hl}"`)
  .replace('</g></svg>',lv==='p'?'<path d="M50 6l1.6 3.4 3.4 1.6-3.4 1.6L50 16l-1.6-3.4-3.4-1.6 3.4-1.6z" fill="#fff" stroke-width="1.2"/><path d="M12 30l1.2 2.4 2.4 1.2-2.4 1.2L12 37l-1.2-2.4-2.4-1.2 2.4-1.2z" fill="#fff" stroke-width="1.1"/></g></svg>':'</g></svg>');
 TROFL.holo[lv]=TROF.holo.replace('fill="#fff" stroke="none"',`fill="${TROFN[lv]}" stroke="none"`).replace('</g></svg>',lv==='p'?'<path d="M50 6l1.6 3.4 3.4 1.6-3.4 1.6L50 16l-1.6-3.4-3.4-1.6 3.4-1.6z" fill="#fff" stroke="none"/></g></svg>':'</g></svg>');}
const trofIcL=lv=>{const k=typeof skinNow==='function'&&skinNow()==='holo'?'holo':'perg';return TROFL[k][lv]||TROF[k];};

// ---------- logros nuevos ----------
ACHCATS.push(['pr','Progreso'],['twk','Bajas con cada torre']);
if(typeof LGICO!=='undefined'){LGICO.pr=icU('m_st_run','📈');LGICO.twk=icU('m_c_tw','🗼');}
const LOGN=(id,c,lv,n,d,x)=>{ACH[id]=Object.assign({c,lv,n,d},x||{});};
for(const h of Object.keys(HEROES))LOGN('fw_'+h,'pr','b','Victoria con '+HEROES[h].n,'Gana tu primera partida con '+HEROES[h].n+'.',{hidH:h});
LOGN('h10','pr','b','En lo más alto','Sube un héroe a Nv 10.');
LOGN('tw4','pr','b','Primera especialización','Sube una torre a Nv 4.');
LOGN('ch25','pr','b','Buscador de cofres','Abre 25 cofres.',{prog:()=>[PRG.chests,25]});LOGN('ch100','pr','s','Saqueador','Abre 100 cofres.',{prog:()=>[PRG.chests,100]});
LOGN('ev10','pr','b','Viajero','Completa 10 eventos.',{prog:()=>[PRG.evs,10]});LOGN('ev50','pr','s','Trotamundos','Completa 50 eventos.',{prog:()=>[PRG.evs,50]});
LOGN('bo1','pr','b','Matagigantes','Derrota a un jefe.',{prog:()=>[PRG.boss,1]});LOGN('bo10','pr','s','Cazador de jefes','Derrota a 10 jefes.',{prog:()=>[PRG.boss,10]});LOGN('bo50','pr','g','Azote de jefes','Derrota a 50 jefes.',{prog:()=>[PRG.boss,50]});
LOGN('all1','pr','g','Explorador de la Era Fantástica','Descubre todos los héroes, torres, enemigos y reliquias de la Era Fantástica.');
LOGN('all2','pr','g','Explorador de la Era Distópica','Descubre todos los héroes, torres, enemigos y reliquias de la Era Distópica.',{e2:1});
// bajas con cada torre: bronce, plata y oro (desbloquean el borde de esa torre)
const TWKN={b:2500,s:5000,g:10000},TWKE={b:1250,s:2500,g:5000};
const twkList=()=>Object.keys(TW).filter(k=>!TW[k].hidden&&!TW[k].summ&&(TW[k].cost!=null||TW[k].uniq));
const twkThr=(k,lv)=>(TW[k].uniq?TWKE:TWKN)[lv];
for(const k of twkList())for(const lv of['b','s','g'])LOGN('k_'+k+'_'+lv,'twk',lv,'Exterminador de '+LVN[lv].toLowerCase()+' · '+TW[k].n,'Haz '+fi(twkThr(k,lv))+' bajas con '+TW[k].n+'. Desbloquea su borde de '+LVN[lv].toLowerCase()+'.',{twk:k,prog:()=>[PRG.twk[k]||0,twkThr(k,lv)]});
LOGN('plat','pr','p','Leyenda de Towerize','Consigue todos los demás logros.');
// visibles: las de la era 2, solo si ya la tienes; las de cada torre, solo si la has descubierto (sin spoilers)
if(typeof ACHVIS!=='undefined'){ACHVIS.all2=()=>typeof era2Ok==='function'&&era2Ok();
 for(const h of Object.keys(HEROES))ACHVIS['fw_'+h]=()=>!!(SEEN.hr&&SEEN.hr[h])||!HEROES[h].era||HEROES[h].era===1&&!HEROES[h].lockTxt;
 for(const k of twkList())for(const lv of['b','s','g'])ACHVIS['k_'+k+'_'+lv]=()=>!!(SEEN.tw&&SEEN.tw[k]);}
// el trofeo de cada logro, en su metal (los que tienen icono propio lo conservan)
for(const id in ACH){const A=ACH[id];if(!A.ic)Object.defineProperty(A,'ic',{get:()=>trofIcL(achLv(id)),configurable:true});}

// ---------- platino ----------
{const _a=achieve;achieve=function(id){const had=ACHS[id];const r=_a.apply(this,arguments);try{if(!had&&ACHS[id]&&id!=='plat'&&!ACHS.plat&&Object.keys(ACH).every(k=>k==='plat'||ACHS[k]))_a('plat');}catch(e){}return r;};}

// ---------- contar durante la partida ----------
const twMaxOK=t=>{if(!t||t.hero||t.summ||!TW[t.type])return false;const ids=abIds(t);if(!ids||!ids.length)return false;if(!(t.lvl>=4||TW[t.type].dragon&&(t.stage||0)>=3))return false;return ids.every(id=>(t.ab&&t.ab[id]||0)>=(AB[id]&&AB[id].ranks?AB[id].ranks.length:1));};
const twMk=k=>PRG.twm[k]||(PRG.twm[k]={});
{const _d=achDeath;achDeath=function(e){const r=_d.apply(this,arguments);try{if(!e.leak&&prgOn()){
  const s=e.src;if(s&&!s.hero&&s.type&&TW[s.type]){const k=s.type;PRG.twk[k]=(PRG.twk[k]||0)+1;for(const lv of['b','s','g'])if(PRG.twk[k]>=twkThr(k,lv))achieve('k_'+k+'_'+lv);prgSave();}
  if(isBoss(e)){PRG.boss++;if(PRG.boss>=1)achieve('bo1');if(PRG.boss>=10)achieve('bo10');if(PRG.boss>=50)achieve('bo50');prgSave();}}}catch(x){}return r;};}
{const _rp=renderRelicPick;renderRelicPick=function(){const fc=typeof RL!=='undefined'&&RL.fromChest;const r=_rp.apply(this,arguments);try{if(fc&&prgOn()){PRG.chests++;if(PRG.chests>=25)achieve('ch25');if(PRG.chests>=100)achieve('ch100');prgSave();}}catch(e){}return r;};}
{const _ce=closeEvent;closeEvent=function(){const was=typeof RL!=='undefined'&&RL.ev;const r=_ce.apply(this,arguments);try{if(was&&prgOn()){PRG.evs++;if(PRG.evs>=10)achieve('ev10');if(PRG.evs>=50)achieve('ev50');prgSave();}}catch(e){}return r;};}
// cada poco: héroe a Nv 10, torre a Nv 4, torres al máximo con su especialización, descubrirlo todo de una era
const eraAll=era=>{const sn=(t,k)=>!!(SEEN[t]&&SEEN[t][k]),E=x=>(x&&x.era||1)===era;
 return Object.keys(HEROES).filter(h=>E(HEROES[h])).every(h=>sn('hr',h))&&Object.keys(TW).filter(k=>E(TW[k])&&!TW[k].hidden&&!TW[k].summ&&(TW[k].cost!=null||TW[k].uniq)).every(k=>sn('tw',k))
  &&Object.keys(ET).filter(k=>E(ET[k])&&!ET[k].hidden&&!ET[k].call).every(k=>sn('en',k))&&RELICS.filter(r=>E(r)).every(r=>sn('rl',r.id));};
setInterval(()=>{try{if(!prgOn()||!S.list)return;if(S.hero&&S.hero.lvl>=10)achieve('h10');try{if(typeof pigHouses==='function'&&pigHouses().every(h=>h))achieve('pigs');}catch(_){}let ch=0;
 for(const t of S.list){if(t.lvl>=4&&!t.hero&&!t.summ&&!t.pigU)achieve('tw4');if(twMaxOK(t)){const m=twMk(t.type),key=t.spec?'s_'+t.spec:'s_nv4';if(!m[key]){m[key]=1;ch=1;}}}
 if(ch)prgSave();}catch(e){}},1500);
setInterval(()=>{try{if(eraAll(1))achieve('all1');if(typeof era2Ok==='function'&&era2Ok()&&eraAll(2))achieve('all2');}catch(e){}},5000);
// al ganar: victoria con el héroe y las marcas de cada torre que has construido
{const _w=achWin;achWin=function(){const r=_w.apply(this,arguments);try{if(prgOn()){if(S.hero)achieve('fw_'+S.hero.id);
  const all=(S.st&&S.st.all)||S.list||[],types=[...new Set(all.filter(t=>t&&!t.hero&&!t.summ&&TW[t.type]).map(t=>t.type))];let top=null,tv=0;for(const t of all)if(t&&!t.hero&&(t.dmgT||0)>tv){tv=t.dmgT;top=t.type;}
  for(const k of types){const m=twMk(k);m.win=1;if(!(S.hpEn>0))m.nol=1;if(ROUNDS>=30)m.r30=1;if(k===top)m.dps=1;}
  for(const t of S.list)if(twMaxOK(t))twMk(t.type)[t.spec?'s_'+t.spec:'s_nv4']=1;prgSave();}}catch(e){}return r;};}

// ---------- bordes de bajas en el mapa (laurel en la era 1, hexágono de neón en la era 2) ----------
const BRDM={b:['#b8702a','#f0b070'],s:['#c8d0d8','#ffffff'],g:['#e8b830','#fff1b8']},BRDN={b:'#ff9a4a',s:'#dfe8ff',g:'#ffd84a'};
const twBest=k=>ACHS['k_'+k+'_g']?'g':ACHS['k_'+k+'_s']?'s':ACHS['k_'+k+'_b']?'b':null;
function drawTwBorder(g,X,Y,B,lv,e2){g.save();
 if(!e2){const[c,h]=BRDM[lv];for(const sg of[-1,1])for(let k=0;k<7;k++){const a=Math.PI/2+sg*(.35+k*.33),x=X+Math.cos(a)*B*.47,y=Y+Math.sin(a)*B*.47;g.save();g.translate(x,y);g.rotate(a+sg*1.2);g.fillStyle=c;g.strokeStyle='#1b1712';g.lineWidth=B*.022;g.beginPath();g.ellipse(0,0,B*.1,B*.045,0,0,7);g.fill();g.stroke();g.strokeStyle=h;g.lineWidth=B*.012;g.beginPath();g.moveTo(-B*.06,0);g.lineTo(B*.06,0);g.stroke();g.restore();}
  g.fillStyle=c;g.strokeStyle='#1b1712';g.lineWidth=B*.025;g.beginPath();g.arc(X,Y+B*.5,B*.06,0,7);g.fill();g.stroke();}
 else{const c=BRDN[lv];g.shadowColor=c;g.shadowBlur=B*.12;g.strokeStyle=c;g.lineWidth=B*.04;g.beginPath();for(let k=0;k<6;k++){const a=k/6*Math.PI*2+Math.PI/6;g.lineTo(X+Math.cos(a)*B*.52,Y+Math.sin(a)*B*.52);}g.closePath();g.stroke();g.fillStyle=c;for(let k=0;k<6;k++){const a=k/6*Math.PI*2+Math.PI/6;g.beginPath();g.arc(X+Math.cos(a)*B*.52,Y+Math.sin(a)*B*.52,B*.035,0,7);g.fill();}}
 g.restore();}
// se dibuja con los marcos de torre (debajo del círculo); si la torre tiene borde de bajas, va en lugar del marco elegido
{const _dt=drawTFr;drawTFr=function(g,t,X,Y,B,sk){const lv=t&&t.type&&!t.summ&&!t.hero&&OPT.twbord!==false?twBest(t.type):null;if(lv){drawTwBorder(g,X,Y,B,lv,typeof S!=='undefined'&&S&&S.era===2);return;}if(sk&&sk!=='none')return _dt.apply(this,arguments);};}
const twHasBord=t=>!!(t&&t.type&&!t.summ&&!t.hero&&OPT.twbord!==false&&twBest(t.type));

// ---------- Estadísticas › Marcas: las marcas de cada torre ----------
const MKC=[['win','Ganar con ella','Gana una partida con esta torre construida.'],['nol','Ganar sin perder vida','Gana con ella sin que ningún enemigo te quite vida.'],['sA','Nv 4 al máximo · 1.ª especialización','Súbela a Nv 4 con su primera especialización y todas sus habilidades al máximo.'],['sB','Nv 4 al máximo · 2.ª especialización','Súbela a Nv 4 con su segunda especialización y todas sus habilidades al máximo.'],['dps','La de más DPS','Gana con ella como la torre que más daño ha hecho en la partida.'],['r30','Partida de 30 rondas','Gana una partida de 30 rondas con ella.'],['k','Bajas','Bajas con esta torre en todas tus partidas: bronce, plata y oro desbloquean su borde.']];
const MKN='①②③④⑤⑥⑦';const MKW={era:1,sel:null};
const mkSpecs=k=>{const sp=SPECS[k]?Object.keys(SPECS[k]):[];return TW[k].uniq||!sp.length?['nv4']:sp;};
const mkVal=(k,c)=>{const m=PRG.twm[k]||{};if(c==='k')return twBest(k)||'';if(c==='sA'||c==='sB'){const sp=mkSpecs(k);const s=sp[c==='sA'?0:1];return s?(m['s_'+s]?'ok':''):'—';}return m[c]?'ok':'';};
const mkCell=v=>v==='ok'?'<span class="mkok">✓</span>':v==='—'?'<span class="mkna">—</span>':'bsg'.includes(v)&&v?`<span class="mkmd mk${v}"></span>`:'<span class="mkno"></span>';
const mkTowers=()=>Object.keys(TW).filter(k=>!TW[k].hidden&&!TW[k].summ&&(TW[k].cost!=null||TW[k].uniq)&&((TW[k].era||1)===MKW.era));
function mkParts(){const e2=typeof era2Ok==='function'&&era2Ok();if(!e2)MKW.era=1;const L=mkTowers(),sn=k=>!!(SEEN.tw&&SEEN.tw[k]);
 if(!MKW.sel||!L.includes(MKW.sel)||!sn(MKW.sel))MKW.sel=L.find(sn)||null;
 const head=`<tr><th class="mkn">Torre</th>${MKC.map((c,i)=>`<th><button class="mkh" data-ttb="${c[1]}: ${c[2]}">${MKN[i]}</button></th>`).join('')}</tr>`;
 const rows=L.map(k=>{const ok=sn(k);if(!ok)return `<tr class="mklk"><td class="mkn"><span class="mkic sil">?</span>???</td>${MKC.map(()=>'<td><span class="mkno"></span></td>').join('')}</tr>`;
  return `<tr class="${k===MKW.sel?'on':''}" data-a="mksel" data-v="${k}"><td class="mkn"><span class="mkic">${twIc(k)}</span>${TW[k].n}${TW[k].uniq?' <small>(evento)</small>':''}</td>${MKC.map(c=>`<td>${mkCell(mkVal(k,c[0]))}</td>`).join('')}</tr>`;}).join('');
 const eraB=e2?`<div class="mkeras">${[[1,'Fantástica'],[2,'Distópica']].map(([v,n])=>`<button class="${MKW.era===v?'on':''}" data-a="mkera" data-v="${v}">${n}</button>`).join('')}</div>`:'';
 const tot=L.filter(sn).reduce((a,k)=>a+MKC.filter(c=>{const v=mkVal(k,c[0]);return v&&v!=='—';}).length,0);
 const left=`<h3>Estadísticas</h3><div class="bksub">Marcas de torres · ${tot} conseguidas · pulsa un número para ver qué es</div>${eraB}<div class="mkwrap"><table class="mktab">${head}${rows}</table></div>`;
 let right='<div class="lbdet"><p>Aún no has descubierto ninguna torre de esta era.</p></div>';
 if(MKW.sel){const k=MKW.sel,sp=mkSpecs(k),n=MKC.filter(c=>{const v=mkVal(k,c[0]);return v&&v!=='—';}).length,nn=MKC.filter(c=>mkVal(k,c[0])!=='—').length;
  const it=MKC.map((c,i)=>{const v=mkVal(k,c[0]);if(v==='—')return'';let nm=c[1],d=c[2];
   if(c[0]==='sA'||c[0]==='sB'){const s=sp[c[0]==='sA'?0:1];nm='Nv 4 al máximo · '+(s==='nv4'?'Nv 4':(SPECS[k]&&SPECS[k][s]?SPECS[k][s].n:s));d=s==='nv4'?'Súbela a Nv 4 con todas sus habilidades al máximo.':'Súbela a Nv 4 con esa especialización y todas sus habilidades al máximo.';}
   if(c[0]==='k'){const kk=PRG.twk[k]||0,nx=['b','s','g'].find(lv=>kk<twkThr(k,lv));nm='Bajas: '+fi(kk)+(v?' · borde de '+LVN[v].toLowerCase():'');d=nx?'Siguiente: '+LVN[nx].toLowerCase()+' a las '+fi(twkThr(k,nx))+'.':'¡Tienes el borde de oro!';
    const pr=nx?Math.min(100,kk/twkThr(k,nx)*100):100;d+=`<div class="mkbar"><i style="width:${pr}%"></i></div>`;}
   return `<div class="mkit"><span class="mki">${MKN[i]}</span>${mkCell(v)}<div><b>${nm}</b><small>${d}</small></div></div>`;}).join('');
  right=`<div class="lbdet mkdet"><h4><span class="mkic big">${twIc(k)}</span>${TW[k].n}</h4><small class="mksub">Marcas conseguidas: ${n} de ${nn}</small>${it}</div>`;}
 return {marks:{list:STABS.map(([v,l,i])=>[v,l,i]),cur:'mk',act:'stab'},left,right,key:'stmk'+MKW.era+(MKW.sel||'')};}
STABS.push(['mk','Marcas',icU('m_c_tw','🗼')]);
{const _sp=statParts;statParts=function(){if(STW.tab==='mk')return mkParts();return _sp.apply(this,arguments);};}
{const _sh=statsHTML;statsHTML=function(t){if(t==='mk')return '';return _sh.apply(this,arguments);};}
document.addEventListener('click',e=>{const h=e.target.closest&&e.target.closest('.mkh');if(h){e.stopPropagation();e.preventDefault();try{ttbShow(h);clearTimeout(MKW.tt);MKW.tt=setTimeout(()=>{try{ttbHide();}catch(_){}},5000);}catch(_){}return;}if(document.querySelector('.mkh'))try{ttbHide();}catch(_){}const b=e.target.closest&&e.target.closest('[data-a="mksel"],[data-a="mkera"]');if(!b)return;e.stopPropagation();e.preventDefault();
 if(b.dataset.a==='mksel')MKW.sel=b.dataset.v;else{MKW.era=+b.dataset.v;MKW.sel=null;}try{sfx('ui');}catch(_){}lbRender();},true);
{const _lr=lbRender;lbRender=function(){try{if(typeof ttbHide==='function'&&TTB&&TTB.cur&&TTB.cur.classList&&TTB.cur.classList.contains('mkh'))ttbHide();}catch(e){}return _lr.apply(this,arguments);};}
