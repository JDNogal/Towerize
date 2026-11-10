// ==================== COMPENDIO ENLAZADO CON LA PARTIDA ====================
// · Botón 📖 en la ficha lateral (torre, enemigo, héroe, reliquia) y en los bocadillos de palabras clave: abre el libro en esa página.
// · Pestaña «Mecánicas»: todas las palabras clave agrupadas, generadas con los mismos textos de los bocadillos. Sin spoilers.
// · Flechas de evolución entre los enemigos de una misma línea (Orco → Orco veterano → Caudillo orco…).
// · Aviso de «¡Nuevo enemigo!» la primera vez que aparece cada tipo, con su «Cómo enfrentarlo».

// ---- palabras clave por grupos: [id, nombre, icono] ----
const MECG=[
 ['Estados',[['burn','Quemadura','🔥'],['poison','Veneno','☠️'],['bleed','Sangrado','🩸'],['chill','Hipotermia','🥶'],['ez','Electrizado','⚡'],['brk','Armadura rota','🔨'],['slow','Ralentización','🐌'],['freeze','Congelar','🧊'],['stun','Aturdir','💫'],['daze','Desorientado','🌀'],['root','Enredo','🌿'],['sticky','Pegajoso','🍯'],['flam','Inflamable','🛢️'],['wet','Mojado','💧'],['cursed','Maldito','🌑'],['poly','Transformado','🐸'],['fear','Aterrado','😱'],['mark','Marcado','🎯'],['prey','Presa','🦅'],['inf','Infectado','🦠'],['lmk','Marcado con láser','🔴'],['vc','Carga','🔋'],['stk','Acumulable','➕']]],
 ['Tipos de daño',[['tphys','Daño físico','⚔️'],['tmagic','Daño mágico','✨'],['telem','Daño elemental','🌈'],['crit','Crítico','❗'],['penp','Penetración','🗡️'],['aoedmg','Daño en área','💥'],['area','Área','⭕'],['chain','Rebote','🔗'],['beam','Rayo continuo','📏'],['push','Empuje','👋']]],
 ['Estadísticas de torres',[['dmg','Daño','🎯'],['cool','Enfriamiento','⏱️'],['rng','Rango','📡'],['dps','DPS','📈'],['dur','Duración','⌛'],['tgt','Objetivo','🧭'],['tgts','Objetivos','🥾'],['eff','Efectos','🧪'],['mag','Cargador','🔫'],['lvl','Nivel','⭐'],['cost','Coste','🪙'],['upc','Mejora','⬆️']]],
 ['Unidades y enemigos',[['ehp','Vida','❤️'],['espd','Velocidad','👟'],['edmg','Daño al núcleo','💔'],['egold','Oro por baja','💰'],['eud','Daño a unidades','🗡️'],['eac','Enfriamiento enemigo','⏱️'],['erg','Rango enemigo','🏹'],['eblk','Corpulencia','🧱'],['aphys','Armadura','🛡️'],['amagic','Resistencia mágica','🔮'],['umr','Resistencia mágica de unidades','🔮'],['bres','Resistencia a control','👑'],['fly','Volador','🪽'],['aura','Aura','🌟'],['dodge','Escurridizo','💨'],['steal','Saqueo','💸'],['pierce','Perforante','📌'],['curse','Maldición','🕯️'],['eheal','Curación tribal','🌿'],['usol','Soldados','💂'],['uhp','Vida del soldado','❤️'],['urez','Reaparición','🔄']]],
 ['Héroes',[['hlv','Nivel de héroe','⭐'],['hxp','Experiencia','✨'],['hrez','Reaparición del héroe','🔄'],['hrel','Reliquia inicial','💎'],['hmel','Daño en melee','✊'],['g_hab','Habilidad del héroe','🌀']]],
 ['Partida',[['g_core','Núcleo','💠'],['g_piece','Pieza','🧩'],['g_portal','Portal','🌀'],['g_solar','Solar','⬜'],['g_tile','Casilla especial','✨'],['vch','Vale de mejora','🎟️'],['rcd','Recarga de reliquia','⏳']]]];
const MECI={};for(const[g,l]of MECG)for(const[id,n,ic]of l)MECI[id]={id,n,ic,g};
// contexto para las palabras que dependen de una torre o un enemigo concretos
const MECCTX={ehp:'en:norm',espd:'en:norm',edmg:'en:norm',egold:'en:norm',dmg:'shop:arrow',cool:'shop:arrow',rng:'shop:arrow',dps:'shop:arrow',eff:'shop:arrow',tgt:'shop:arrow',lvl:'shop:arrow',cost:'shop:arrow',upc:'shop:arrow'};
// quién usa cada mecánica (torres, enemigos y héroes); también decide si ya la has descubierto
const MECUSE={burn:['tw:sala','tw:flame','tw:monk','hr:yrsa'],poison:['tw:poison','tw:acid','tw:arrow'],bleed:['tw:cannon','tw:bastion','tw:bunker','hr:vega'],chill:['hr:yrsa'],ez:['tw:tesla'],
 brk:['tw:cata','tw:poison','tw:acid','tw:nano','tw:sala'],slow:['tw:frost','tw:sonic','tw:straw'],freeze:['tw:frost'],stun:['tw:tesla','tw:cata','tw:laser','tw:sonic'],daze:['tw:sonic'],root:['hr:sylvana'],
 sticky:['tw:cata'],flam:['tw:cata'],wet:['tw:augur'],cursed:['tw:orb'],poly:['tw:orb'],fear:['tw:orb'],mark:['tw:arrow'],prey:['hr:sylvana'],inf:['tw:nano'],lmk:['tw:bunker'],vc:['tw:laser'],
 chain:['tw:tesla'],beam:['tw:orb','tw:laser'],push:['tw:sonic','tw:cannon','tw:wood'],mag:['tw:bunker'],
 dodge:['en:raider'],steal:['en:raider'],pierce:['en:javelin'],curse:['en:warlock'],eheal:['en:shaman'],aura:['en:custodian'],fly:['en:bat','en:harpy','en:griffin'],bres:['en:boss','en:colossus']};
const mecRefOk=r=>{const[t,k]=r.split(':');return t==='hr'?(HEROES[k]&&(seen('hr',k)||!HEROES[k].lockTxt)):seen(t,k);};
const mecOk=id=>{const u=MECUSE[id];return !u||u.some(mecRefOk);};
// «Cómo enfrentarlo»: una o dos frases por enemigo
const ETIP={norm:'Enemigo básico. Cualquier torre sirve; las de área los barren en grupo.',vet:'Más vida y algo de armadura: el daño mágico o elemental rinde más.',champ:'Mucha armadura y cada 25 s un hachazo giratorio: no amontones tus unidades a su alrededor.',
 fast:'Corre mucho y aguanta poco: daño en área o ralentizarlo.',runner:'Muy rápido: ralentízalo o bloquéalo con tus unidades.',raider:'Esquiva a tus soldados y te roba oro si llega: mátalo con torres.',
 tank:'Lento y con mucha vida: concentra en él el daño fuerte.',armored:'Muy blindado: daño mágico, elemental o penetración. La armadura rota ayuda.',
 bat:'Voladores débiles en grupo: torres de área que alcancen el aire.',raptor:'El Diablillo ya crecido: vuela y aguanta más. Usa torres que den al aire.',hound:'Muy rápido y resiste algo la magia: ralentízalo o usa daño físico.',minion:'Resiste un poco la magia: el daño físico rinde más.',demon:'Más vida y resistencia mágica: usa daño físico o elemental.',dchamp:'Mucha resistencia mágica y cada 25 s un chorro de fuego hacia delante: usa daño físico.',seal:'Su aura da resistencia mágica a los de alrededor: mátalo primero o usa daño físico.',harpy:'Vuela rápido y aguanta poco: tus soldados no la paran. Usa torres rápidas que den al aire.',griffin:'Volador resistente: necesitas mucho daño contra el aire.',
 sling:'Se para a disparar a tus unidades desde lejos: quítalo pronto con torres.',javelin:'Sus bombas caen en arco, atraviesan media armadura y salpican a las unidades de alrededor.',gyro:'Se para en el aire a bombardear a tus unidades: usa torres que den al aire.',
 acolyte:'Resiste la magia y daña a tus unidades con ella: usa daño físico.',warlock:'Embelesa a tus soldados para que luchen contra ti: mátala pronto con torres. El héroe es inmune.',
 shaman:'Cura a los enemigos de alrededor: elimínalo antes que al resto.',custodian:'Su tambor da armadura a los de alrededor: mátalo primero o usa daño mágico.',
 mini:'Mucha vida y daño: concentra el fuego y frénalo.',elite:'Muy resistente y peligroso: prepara daño fuerte y control.',
 boss:'Si llega al núcleo, pierdes. Resiste el control: necesitas mucho daño.',colossus:'Al perder vida suelta mini-élites: guarda daño para ellas.',bob:'Usa tu reliquia cuando esté en tu zona de fuego.',
 cub:'Cachorros rápidos en manada: daño en área.',greyw:'Al bajar de la mitad aúlla y acelera a los lobatos.',bigw:'Derriba barricadas y muros y aparta a tus soldados.',momdrg:'Escupe fuego a tus unidades: mantenlas lejos o usa torres.'};
if(typeof ETIP2!=='undefined')Object.assign(ETIP,ETIP2);if(typeof MECG2!=='undefined'){const g=MECG.find(x=>x[0]==='Unidades y enemigos');if(g)g[1].push(...MECG2);}if(typeof MECUSE2!=='undefined')Object.assign(MECUSE,MECUSE2);
const efamOf=k=>{const f=EFAM.find(([n,l])=>l.includes(k));return f?f[0]:'';};

// ---- pestaña nueva ----
CTABS.splice(CTABS.findIndex(x=>x[0]==='lg'),0,['mc','Mecánicas']);CTICO.mc='⚙️';BKSUB.mc='Cómo funciona todo';
{const _bi=bkItems;bkItems=function(t){
 if(t==='mc'){const L=[];for(const[g,l]of MECG){L.push({sec:g});for(const[id,n,ic]of l)L.push({id,ic,n,ok:mecOk(id)});}return L;}
 const L=_bi.apply(this,arguments);
 if(t==='en'){const ids=L.filter(x=>x.id!=null).map(x=>x.id);for(const it of L)if(it.id&&EVO[it.id]&&ids.includes(EVO[it.id].from))it.evo=EVO[it.id];
  // dentro de una sección con una línea de evolución, lo que no pertenece a esa línea va en otra fila
  const inChain=k=>!!(EVO[k]&&ids.includes(EVO[k].from))||Object.values(EVO).some(v=>v.from===k&&ids.includes(Object.keys(EVO).find(u=>EVO[u]===v)));
  const out=[];let sec=[];const flush=()=>{if(sec.some(x=>inChain(x.id))){const a=sec.filter(x=>inChain(x.id)),b2=sec.filter(x=>!inChain(x.id));out.push(...a);if(b2.length){out.push({sec:'\u200b'});out.push(...b2);}}else out.push(...sec);sec=[];};
  for(const it of L){if(it.sec){flush();out.push(it);}else sec.push(it);}flush();return out;}
 return L;};}
// líneas de evolución, sacadas de los ascensos de las escuadras (PROMO): base → primer ascenso → siguiente
const EVO={};for(const b in PROMO){let prev=b;const seenU=[];for(const[r,u]of PROMO[b]){if(seenU.includes(u))continue;seenU.push(u);EVO[u]={from:prev,r};prev=u;}}
const EVOSVG='<svg viewBox="0 0 26 16" width="26" height="16"><path d="M2 10.5 Q10 5.5 18.5 8" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M15.2 3.6 L22.6 8.6 L15.6 13" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>';
{const _bt=bkTile;bkTile=function(it,t){let h=_bt.apply(this,arguments);
 if(it.evo){const okA=seen('en',it.evo.from),okB=it.ok;const tip=okA&&okB?`Evoluciona del ${ET[it.evo.from].n} desde la ronda ${it.evo.r}`:'Evolución';h=h.replace(/<\/button>$/,`<i class="bkevo" title="${tip}">${EVOSVG}</i></button>`);}
 return h;};}
{const _bd=bkDetail;bkDetail=function(t,id){
 if(t==='mc')return mecDetail(id);
 let h=_bd.apply(this,arguments);
 if(t==='en'&&ET[id]&&seen('en',id)&&ETIP[id])h+=`<div class="esec" style="margin-top:12px">Cómo enfrentarlo</div><div class="ddesc">${ETIP[id]}</div>`;
 return h;};}
function mecDetail(id){const M=MECI[id];if(!M)return'';
 if(!mecOk(id))return `<div class="bkun"><span class="sil bkbig">${M.ic}</span><h4>???</h4><p>Aún no descubierta. Aparecerá al encontrar algo que la use.</p></div>`;
 let h='';try{h=kwHtml(id,MECCTX[id]||'')||'';}catch(e){h='';}
 h=h.replace(/^\s*<b[^>]*>[\s\S]*?<\/b>/,'').replace(/<div class="row[^"]*"><span>Cálculo<\/span>[\s\S]*?<\/div>/,'');
 let sub=M.g;{const m=h.match(/^\s*·\s*([^<]+)/);if(m){const x=m[1].trim();sub+=' · '+x.charAt(0).toUpperCase()+x.slice(1);h=h.slice(m[0].length);}}
 const uses=(MECUSE[id]||[]).filter(mecRefOk).map(r=>{const[t,k]=r.split(':');const n=t==='tw'?TW[k].n:t==='en'?ET[k].n:HEROES[k].n,ic=t==='tw'?`<i style="background:${TW[k].col}">${twIc(k)}</i>`:t==='en'?`<i style="background:${ET[k].col}">${enIc(k)?icHtml(enIc(k)):''}</i>`:`<i style="background:${HEROES[k].col}">${HEROES[k].ic||'🦸'}</i>`;
  return `<button class="mecuse" data-a="cpgo" data-t="${t}" data-v="${k}">${ic}${n}</button>`;}).join('');
 return bkSheet(`<span class="bkbic mecbic">${M.ic}</span>`,`<div class="ttl"><b>${M.n}</b></div><small class="mecg">${sub}</small>`+h)+(uses?`<div class="esec" style="margin-top:12px">Lo usan</div><div class="mecuses">${uses}</div>`:'');}
// subtítulo: «descubiertas» y flechas que empiezan fila (al hacer salto de línea) se ocultan
{const _cp=compParts;compParts=function(){const P=_cp.apply(this,arguments);
 if(CP.tab==='mc')P.left=P.left.replace(' descubiertos</div>',' descubiertas</div>');P.left=P.left.split('<div class="bksec">\u200b</div>').join('');
 const a0=P.after;P.after=el=>{a0&&a0(el);try{el.querySelectorAll('.bkevo').forEach(i=>{const b=i.closest('.bti'),p=b&&b.previousElementSibling;i.style.display=p&&p.classList.contains('bti')&&p.offsetTop===b.offsetTop?'':'none';});}catch(e){}};
 return P;};}

// ---- botón 📖 en fichas y bocadillos ----
const cpBtn=(t,v)=>`<button class="cpgo" data-a="cpgo" data-t="${t}" data-v="${v}" title="Abrir en el compendio">📖</button>`;
{const _ei=enemyInfo;enemyInfo=function(k){return _ei.apply(this,arguments)+`<i class="cpref" data-t="en" data-v="${k}" hidden></i>`;};}
function cpTarget(key,box){key=String(key||'');
 if(key.startsWith('tw:')){const t=S&&S.list&&S.list.find(o=>'tw:'+o.id===key);return t&&!t.hero&&TW[t.type]?['tw',t.type]:null;}
 if(key.startsWith('shop:'))return['tw',key.slice(5)];
 if(key.startsWith('relic:'))return['rl',key.slice(6)];
 if(key.startsWith('emap:'))return seen('en',key.slice(5).replace('?',''))?['en',key.slice(5)]:null;
 if(key==='hero'&&S&&S.hero)return['hr',S.hero.id];
 const m=box&&box.querySelector('.cpref');if(m)return[m.dataset.t,m.dataset.v];
 return null;}
function cpDecorate(box,tg){if(!box||!tg||!compOk())return;box.querySelectorAll(':scope>.cpgo').forEach(b=>b.remove());if((tg[0]==='tw'||tg[0]==='en'||tg[0]==='rl')&&!seen(tg[0],tg[1]))return;
 box.insertAdjacentHTML('afterbegin',cpBtn(tg[0],tg[1]));box.classList.add('hascp');}
function cpPrimDecor(){try{const box=PMN()?$('tip'):$('side');box.classList.remove('hascp');if(!PR.open)return;cpDecorate(box,cpTarget(PR.key,box));}catch(e){}}
{const _o=openPrim;openPrim=function(){const r=_o.apply(this,arguments);cpPrimDecor();return r;};}
{const _r=refreshPrim;refreshPrim=function(){const r=_r.apply(this,arguments);cpPrimDecor();return r;};}
{const _k=openKw;openKw=function(a,pl){const r=_k.apply(this,arguments);try{const d=KS[KS.length-1]&&KS[KS.length-1].el,id=a.dataset.kw||'';
  const tg=MECI[id]&&mecOk(id)?['mc',id]:id.startsWith('tw_')?['tw',id.slice(3)]:id.startsWith('en_')?['en',id.slice(3)]:id.startsWith('hr_')?['hr',id.slice(3)]:id.startsWith('rl_')?['rl',id.slice(3)]:null;
  if(d&&tg)cpDecorate(d,tg);}catch(e){}return r;};}
// los logros viven en su propia sección del libro (🏆 Logros): hay que saltar de sección, no solo cambiar la pestaña
function cpGo(t,v){if(t!=='lg'&&!compOk())return;if(NEC.open)necClose();try{closeKS();}catch(e){}
 CP.tab=t;CP.sel[t]=v;CP.flt={};CP.prev=null;CP.eprev=null;PE=null;CP.hprev=null;PHV=null;CP.pageR=true;CP.hl=v;
 if(t==='lg'){CP.af='all';CP.as='all';}
 const area=t==='lg'?'lg':'cp';if(LB.open&&!LB.cover&&LB.area===area)renderComp();else{PMU.ask=0;lbOpen(area);}}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('.cpgo,.mecuse');if(!b)return;e.stopPropagation();e.preventDefault();cpGo(b.dataset.t,b.dataset.v);},true);

// ---- aviso de «¡Nuevo enemigo!» ----
const NEC={q:[],cur:null,open:false,tm:0};
{const _s=see;see=function(t,k){try{if(t==='en'&&SEEOK&&!SEEN.en[k]&&typeof S!=='undefined'&&S&&!S.tut&&!S.pvE&&!(typeof PREVIEWING!=='undefined'&&PREVIEWING)&&S.phase==='wave'&&ET[k]&&!NEC.q.includes(k)&&NEC.cur!==k)NEC.q.push(k);}catch(e){}return _s.apply(this,arguments);};}
const necIc=k=>`<span class="necic" style="background:${ET[k].col}">${enIc(k)?icHtml(enIc(k)):''}</span>`;
const necShort=k=>{const s=ETIP[k]||'';const i=s.indexOf(':');return i>0&&i<60?s.slice(0,i)+'.':s.split('. ')[0].replace(/\.?$/,'.');};
function necShow(k){let el=$('nenot');if(!el){el=document.createElement('div');el.id='nenot';document.body.appendChild(el);}NEC.cur=k;
 el.innerHTML=`<button class="nenot" data-k="${k}">${necIc(k)}<span class="nentx"><b>¡Nuevo enemigo!</b><span>${ET[k].n}</span></span><span class="neeye">👁️</span></button>`;el.classList.add('on');try{sfx('page');}catch(e){}
 clearTimeout(NEC.tm);NEC.tm=setTimeout(()=>{if(NEC.cur===k&&!NEC.open)necHide();},8000);}
function necHide(){const el=$('nenot');if(el)el.classList.remove('on');NEC.cur=null;}
function necOpen(k){necHide();NEC.open=true;NEC.k=k;let el=$('necard');if(!el){el=document.createElement('div');el.id='necard';document.body.appendChild(el);}
 el.innerHTML=`<div class="necpap">${compOk()?cpBtn('en',k):''}<div class="nechd">${necIc(k)}<div><b>${ET[k].n}</b><small>${efamOf(k)}</small></div></div><div class="esec">Cómo enfrentarlo</div><p>${ETIP[k]||'Obsérvalo bien: es nuevo.'}</p><div class="necbt"><button class="go" data-necok="1">Seguir ›</button></div></div>`;el.classList.add('on');}
function necClose(){NEC.open=false;const el=$('necard');if(el)el.classList.remove('on');}
document.addEventListener('click',e=>{const n=e.target.closest&&e.target.closest('.nenot');if(n){e.stopPropagation();necOpen(n.dataset.k);return;}
 if(e.target.closest&&e.target.closest('[data-necok]')){e.stopPropagation();necClose();return;}
 if(NEC.open&&e.target.id==='necard'){e.stopPropagation();necClose();}},true);
addEventListener('keydown',e=>{if(!NEC.open)return;if(e.key==='Escape'||e.key==='Enter'||e.key===' '){e.preventDefault();e.stopImmediatePropagation();necClose();}},true);
setInterval(()=>{try{if(!S||S.phase!=='wave'||S.tut){if(NEC.cur&&(!S||S.phase!=='wave'))necHide();if(!S||S.phase!=='wave')NEC.q=[];return;}if(!NEC.cur&&!NEC.open&&!LB.open&&NEC.q.length)necShow(NEC.q.shift());}catch(e){}},250);
