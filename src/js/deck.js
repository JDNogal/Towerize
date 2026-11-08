// ---- ofertas de torres: cada 2 rondas eliges 1 de 3 hasta tener 7 en el mazo ----
const DECKMAX=7,SKIPG=[50,30,10];
const eraOk=k=>!TW[k].era||TW[k].era===1;
const tPool=()=>Object.keys(TW).filter(k=>!TW[k].uniq&&eraOk(k)&&tunl(k)&&!S.deck.includes(k));
function tryTowerOffer(){if(S&&S.tut){const o=S.tut.off;if(o&&!RL.open&&!S.aim&&S.phase==='build'&&!HQ.cur){S.tut.off=null;RL.towo=o.list.filter(k=>!S.deck.includes(k));RL.towT=o.title;RL.towD=o.txt;RL.towNS=1;if(RL.towo.length)renderTowerOffer();}return;}if(!S||!S.towOff||RL.open||S.aim||!S.deck||!(S.phase==='place'||S.phase==='build'))return;S.towOff=0;
 const p=tPool();if(S.deck.length>=DECKMAX||!p.length)return;RL.towo=shuf(p).slice(0,3);renderTowerOffer();}
const twChips=k=>{const T=TW[k],o=[];o.push(T.unit?'Unidades':T.range<=2*K?'Corto alcance':'A distancia');o.push(DT[T.dt]?DT[T.dt].n:'Físico');if(T.splash||T.puddle||T.cone)o.push('Área');if(T.slow)o.push('Ralentiza');if(T.zap)o.push('Rebote');if(T.beam)o.push('Rayo continuo');if(T.burn)o.push('Quemadura');if(T.dot)o.push('Veneno');if(T.monk)o.push('Curación');return o;};
function renderTowerOffer(){try{(RL.towo||[]).forEach(k=>see('tw',k));}catch(e){}closePrim();RL.open=true;const el=$('relic');el.classList.add('open');el.scrollTop=0;const g=SKIPG[S.skips||0]||0;
 el.innerHTML=`<div class="pscr"><i class="prod l"></i><i class="prod r"></i><div class="ppap"><b class="ptt">${RL.towT||'Nueva torre para tu mazo'}</b><small class="pst">${RL.towD||'Elige una torre: a partir de ahora podrás construirla en esta partida. Tu mazo: '+S.deck.length+'/'+DECKMAX+'.'} El juego está en pausa.</small><div>`+
  '</div><div class="toff">'+RL.towo.map(k=>{const T=TW[k];return `<div class="tof"><div class="tic" style="background:${T.col}">${T.ic}</div><div class="tnm">${T.n}</div><div class="chips">${twChips(k).map(c=>`<span>${c}</span>`).join('')}</div><span class="gd">${T.cost} 🪙</span><details data-k="${k}"><summary>+ Ver detalles</summary><div class="ce tcard" style="margin:0">${shopInfo(k,1)}</div></details><button data-a="towpick" data-k="${k}">Añadir al mazo</button></div>`;}).join('')+
  `</div>`+(RL.towNS?'':`<div class="pskip"><button data-a="towskip">Saltar${g?` (+${g} 🪙)`:''}</button><small>Si saltas, no pierdes el hueco: dentro de 2 rondas te volverán a ofrecer torres.${g?' El oro por saltar baja cada vez que saltas.':''}</small></div>`)+'</div></div>';try{sfx('page');}catch(e){}}
function towerPick(k){if(!RL.towo||!RL.towo.includes(k))return;RL.towT=RL.towD=null;RL.towNS=0;S.deck.push(k);see('tw',k);RL.towo=null;RL.open=false;$('relic').classList.remove('open');S.msg=TW[k].n+' se añade a tu mazo.';ui();}
function towerSkip(){const g=SKIPG[S.skips||0]||0;S.skips=(S.skips||0)+1;if(g)goldEv(g);RL.towo=null;RL.open=false;$('relic').classList.remove('open');S.msg=g?'Has saltado la oferta: +'+g+' 🪙.':'Has saltado la oferta.';ui();}
const HMX=(()=>{const v=Object.values(HEROES);return{hp:Math.max(...v.map(d=>d.base.hp)),dp:Math.max(...v.map(d=>d.base.dmg/d.base.cd*(d.area?1.3:1))),rg:Math.max(...v.map(d=>d.base.range||.5))};})();
let PREVIEWING=false;
function openHero(){if(PREVIEWING)return;closePrim();RL.open=false;RL.hpick=true;RL.hconf=null;let lh=null;try{lh=localStorage.getItem('rt-lasthero');}catch(e){}RL.hsel=RL.hsel&&HEROES[RL.hsel]?RL.hsel:HEROES[lh]?lh:'reinhart';RL.dman={};RL.rman={};const ids=HIDS();if(!ids.includes(RL.hsel))RL.hsel=ids[0];ids.forEach(h=>see('hr',h));LB.step='hero';lbOpen('prep');}
{let tx=null;addEventListener('touchstart',e=>{if(RL.open&&RL.hpick&&e.target.closest&&e.target.closest('.hcar'))tx=e.touches[0].clientX;else tx=null;},{passive:true});addEventListener('touchend',e=>{if(tx===null)return;const dx=e.changedTouches[0].clientX-tx;tx=null;if(Math.abs(dx)>45)heroNav(dx<0?1:-1);},{passive:true});}
function fitHero(){const el=$('relic'),pk=el&&el.querySelector('.hpk');if(!pk||!RL.hpick||el.clientHeight<200)return;const H=el.clientHeight;pk.style.minHeight=H+'px';
 // la vista previa intenta ocupar ~1/3 de la altura; si no cabe, se reduce y, como último recurso, se oculta
 const pv=pk.querySelector('.hpvb');let lo=.7;
 for(const mh of pv?[Math.max(130,H*.24),130,0]:[0]){if(pv){pv.style.display=mh?'':'none';pv.style.minHeight=mh+'px';}lo=.66;let hi=1.15;for(let i=0;i<9;i++){const m=(lo+hi)/2;pk.style.setProperty('--hs',m.toFixed(3));pk.style.minHeight='0';const fits=pk.offsetHeight<=H;if(fits)lo=m;else hi=m;}pk.style.setProperty('--hs',lo.toFixed(3));if(pk.offsetHeight<=H)break;}
 pk.style.setProperty('--hs',lo.toFixed(3));pk.style.minHeight=H+'px';if(!fitHero.again){fitHero.again=1;requestAnimationFrame(()=>{fitHero.again=0;if(RL.open&&RL.hpick)fitHero2();});}}
function fitHero2(){const f=fitHero.again;fitHero.again=1;fitHero();fitHero.again=f;}
addEventListener('resize',()=>{if(RL.open&&RL.hpick)fitHero();});
const HVIS={},heroVis=h=>!HVIS[h]||HVIS[h]();
const ACHVIS={marathon:()=>false,circuit:()=>false},achVis=id=>!!ACHS[id]||!ACHVIS[id]||ACHVIS[id]();
const HUNL={yrsa:'elem'};
function heroLockBox(id){const D=HEROES[id],a=HUNL[id]&&ACH[HUNL[id]];return `<div class="hbox"><div class="hbt">🔒 Héroe bloqueado</div><small class="hdesc">${a?achReq(HUNL[id]):D.lockTxt}</small></div>`;}
const HIDS=()=>S&&S.tut?['reinhart','sylvana']:Object.keys(HEROES).filter(heroVis);
const HMOB=()=>innerWidth<=640||(TOUCH&&innerHeight<520);
function heroNav(d){RL.hconf=null;const ids=HIDS();let k=ids.indexOf(RL.hsel);k=(k+d+ids.length)%ids.length;RL.hsel=ids[k];RL.hdir=d;try{sfx('page');}catch(e){}renderHeroPick();}
function renderHeroPick(){if(typeof LB!=='undefined'&&LB.open&&LB.area==='prep'){lbRender();return;}return renderHeroPickC();}
// ficha de un héroe (texto de la página derecha); se usa en la ventana antigua y en el libro
function heroSheet(id){const D=HEROES[id],b=D.base,R=RELIC[D.relic],lk=D.lockTxt;
 const bar=(l,v,c)=>`<div class="hbar"><span>${l}</span><span class="bt"><span class="bf" style="width:${Math.round(Math.min(1,v)*100)}%;background:${c}"></span></span></div>`;
 return lk?`<div class="hnm">???</div><div class="hcl">???</div><div class="hsec">🔒 Héroe bloqueado</div><small class="hds">${HUNL[id]?achReq(HUNL[id]):D.lockTxt}</small>`:
  `<div class="hnm">${D.n}<small>Récord: Nv ${HLV[id]||1}</small></div><div class="chips">${(D.tags||[]).filter(t=>t!=='Cuerpo a cuerpo'&&t!=='A distancia').map(t=>`<span>${t}</span>`).join('')}</div><div class="hcl">${D.role} · ${D.ranged?'A distancia':'Cuerpo a cuerpo'}</div>`+
  `<p class="hds">${D.d}</p>`+bar('Vida',b.hp/HMX.hp,'#6fe07a')+bar('Daño',b.dmg/b.cd*(D.area?1.3:1)/HMX.dp,'#e0605a')+bar('Alcance',(b.range||.5)/HMX.rg,'#5ab4ff')+
  (HAB[id]?`<div class="hsec">Habilidades</div><div class="habs">${[['b',1],['p4',4],['p8',8],['u',10]].map(([k2,l])=>`<span data-tip="habp:${id}.${k2}">${HAB[id][k2].ic}<em>${l}</em></span>`).join('')}</div>`:'')+
  `<div class="hsec">Reliquia inicial</div><div class="hrl"><span class="ri" style="background:${R.col}">${R.ic}</span><div><b>${R.n}</b><small><span class="cf">Pasivo:</span> ${R.pas()}</small>${R.act?`<small style="margin-top:3px"><span class="ccl">Activo:</span> ${R.act()}</small>`:''}</div></div>`+
  (S.tut?'':`<div class="hsec">Mazo inicial</div><div class="hdk2">${(D.deck||[]).map(k=>{const T=TW[k];return `<span data-tip="shop:${k}"><i style="background:${T.col}">${T.ic}</i>${T.n}</span>`;}).join('')}</div>`)+
  `<details><summary>+ Ver estadísticas</summary><div class="hst">${heroInfo(id,2)}</div></details>`;}
function renderHeroPickC(){const el=$('relic'),ids=HIDS();if(!ids.includes(RL.hsel))RL.hsel=ids[0];const id=RL.hsel,D=HEROES[id],b=D.base,R=RELIC[D.relic],lk=D.lockTxt;ids.forEach(h=>see('hr',h));
 const bar=(l,v,c)=>`<div class="hbar"><span>${l}</span><span class="bt"><span class="bf" style="width:${Math.round(Math.min(1,v)*100)}%;background:${c}"></span></span></div>`;
 const roster=ids.map(h=>{const L=!!HEROES[h].lockTxt;return `<button class="rt${h===id?' on':''}${L?' lk':''}" data-a="hgo" data-id="${h}" title="${L?'???':HEROES[h].n}">${portrait(h,1,L)}${L?'<span class="lc">🔒</span>':''}</button>`;}).join('');
 const info=lk?`<div class="hnm">???</div><div class="hcl">???</div><div class="hsec">🔒 Héroe bloqueado</div><small class="hds">${HUNL[id]?achReq(HUNL[id]):D.lockTxt}</small>`:
  `<div class="hnm">${D.n}<small>Récord: Nv ${HLV[id]||1}</small></div><div class="chips">${(D.tags||[]).filter(t=>t!=='Cuerpo a cuerpo'&&t!=='A distancia').map(t=>`<span>${t}</span>`).join('')}</div><div class="hcl">${D.role} · ${D.ranged?'A distancia':'Cuerpo a cuerpo'}</div>`+
  `<p class="hds">${D.d}</p>`+bar('Vida',b.hp/HMX.hp,'#6fe07a')+bar('Daño',b.dmg/b.cd*(D.area?1.3:1)/HMX.dp,'#e0605a')+bar('Alcance',(b.range||.5)/HMX.rg,'#5ab4ff')+
  (HAB[id]?`<div class="hsec">Habilidades</div><div class="habs">${[['b',1],['p4',4],['p8',8],['u',10]].map(([k2,l])=>`<span data-tip="habp:${id}.${k2}">${HAB[id][k2].ic}<em>${l}</em></span>`).join('')}</div>`:'')+
  `<div class="hsec">Reliquia inicial</div><div class="hrl"><span class="ri" style="background:${R.col}">${R.ic}</span><div><b>${R.n}</b><small><span class="cf">Pasivo:</span> ${R.pas()}</small>${R.act?`<small style="margin-top:3px"><span class="ccl">Activo:</span> ${R.act()}</small>`:''}</div></div>`+
  (S.tut?'':`<div class="hsec">Mazo inicial</div><div class="hdk2">${(D.deck||[]).map(k=>{const T=TW[k];return `<span data-tip="shop:${k}"><i style="background:${T.col}">${T.ic}</i>${T.n}</span>`;}).join('')}</div>`)+
  `<details><summary>+ Ver estadísticas</summary><div class="hst">${heroInfo(id,2)}</div></details>`;
 el.innerHTML=`<div class="hpc" style="--hc:${D.col}"><div class="hart${lk?' lk':''} fr${hTier(id)}">${portrait(id,0,1)}</div><div class="hinfo">${info}</div>`+
  `<div class="hbot"><button class="hbk" data-a="menu" data-bk="1">← Menú</button><div class="rost">${roster}</div><button class="hok2" data-a="pickhero" data-id="${lk?'':id}"${lk?' disabled':''}>${lk?'Bloqueado':'Elegir a '+D.n+' ✓'}</button></div></div>`;}
function renderHeroPickOld(){
 const el=$('relic'),ids=HIDS();if(!ids.includes(RL.hsel))RL.hsel=ids[0];const id=RL.hsel,D=HEROES[id],b=D.base,R=RELIC[D.relic],lk=D.lockTxt;ids.forEach(h=>see('hr',h));
 const bar=(l,v,c)=>`<div class="hbar"><span>${l}</span><span class="bt"><span class="bf" style="width:${Math.round(Math.min(1,v)*100)}%;background:${c}"></span></span></div>`;
 const anim=RL.hdir?(RL.hdir>0?' slr':' sll'):'';RL.hdir=0;
 el.innerHTML=`<div class="hpk" style="--hc:${D.col}"><div class="hpt"><button class="hback" data-a="menu">← Menú principal</button><b>Elige a tu héroe</b> <small>· te acompaña toda la partida; recibes su reliquia inicial y empiezas con su mazo.</small></div>`+
  `<div class="hlay"><button class="harr" data-a="hnav" data-v="-1" aria-label="Héroe anterior">‹</button>`+
  `<div class="hcols${anim}${lk?' hlock':''}">`+
   `<div class="hleft"><div class="hport">${portrait(id,0,1)}</div><div class="hname">${lk?'???':D.n}</div><div class="hcls">${lk?'???':D.role+' · '+(D.ranged?'A Distancia':'Cuerpo a Cuerpo')}</div>`+
    (lk?'':`<div class="hbars">${bar('Vida',b.hp/HMX.hp,'#6fe07a')+bar('Daño',b.dmg/b.cd*(D.area?1.3:1)/HMX.dp,'#e0605a')+bar('Alcance',(b.range||.5)/HMX.rg,'#5ab4ff')}</div>`)+
    (HAB[id]&&!lk?`<div class="hpabs">${[['b',1],['p4',4],['p8',8],['u',10]].map(([k2,l])=>`<div class="hpab" data-tip="habp:${id}.${k2}"><span class="habi">${HAB[id][k2].ic}</span><span class="hpn">${HAB[id][k2].n}</span><span class="hpl">Nv ${l}</span></div>`).join('')}</div>`:'')+
    `<div class="hdots" title="Héroe ${ids.indexOf(id)+1} de ${ids.length}">${ids.map(h=>`<button class="hdot${h===id?' on':''}" data-a="hgo" data-id="${h}" title="${HEROES[h].lockTxt?'???':HEROES[h].n}"></button>`).join('')}</div>`+
    `</div>`+
   `<div class="hright">`+(lk?heroLockBox(id):
    `<div class="hbox"><div class="hbt">Detalles <small class="hrec">· récord: Nv ${HLV[id]||1}</small></div><div class="htags">${(D.tags||[]).map(t=>`<span>${t}</span>`).join('')}</div><small class="hdesc">${lk?'🔒 '+lk:D.d}</small><div class="hst">${heroInfo(id,2)}</div></div>`+(HMOB()?`<details class="hbox hpvd"${RL.hpvo?' open':''}><summary>Ver a ${D.n} en acción</summary><div class="hpvc"><canvas id="pvc" width="288" height="288"></canvas></div></details>`:`<div class="hbox hpvb"><canvas id="pvc" width="288" height="288"></canvas></div>`)+
    `<div class="hbox"><div class="hbt">Reliquia inicial</div><div style="display:flex;gap:8px;align-items:flex-start"><span class="hric" style="background:${R.col}">${R.ic}</span><div style="flex:1;min-width:0">${rcdTag(D.relic)}<b>${R.n}</b><div class="hrt"><span class="cf">Pasivo:</span> ${R.pas()}</div><div class="hrt"><span class="cf">Activo:</span> ${R.act()}</div></div></div></div>`+
    (S.tut?`<div class="hbox"><div class="hbt">Torres</div><small>En el tutorial empiezas sin torres: las irás desbloqueando eligiendo entre dos.</small></div>`:'')+`<div class="hbox"${S.tut?' style="display:none"':''}><div class="hbt">Mazo inicial <small>· cada 2 rondas podrás añadir torres, hasta ${DECKMAX}</small></div><div class="hdeck">${(D.deck||[]).map(k=>{const T=TW[k];return `<div class="hdk" data-tip="shop:${k}"><span class="hdi" style="background:${T.col}">${T.ic}</span><div><b>${T.n}</b> <small class="${DT[T.dt].cls}">${DT[T.dt].n}</small>${T.unit?' <small>· unidades</small>':''}</div></div>`;}).join('')}</div></div>`)+
   `</div></div>`+
  `<button class="harr" data-a="hnav" data-v="1" aria-label="Héroe siguiente">›</button></div>`+
  `<div class="hgo2">${RL.hconf===id?`<span class="hcq">¿Empezar la partida con ${D.n}?</span><button class="hok" data-a="pickhero" data-id="${id}">Sí, empezar</button><button data-a="hcancel">Cancelar</button>`:`<button class="hok" data-a="hconf" data-id="${lk?'':id}"${lk?' disabled':''}>${lk?'Bloqueado':'Elegir a '+D.n}</button>`}</div></div>`;
 if(!lk&&!(PHV&&PHV.pick&&PHV.id===id))hpkNew(id);
 fitHero();
}
const abRank=(t,id)=>t.ab&&t.ab[id]?AB[id].ranks[t.ab[id]-1]:null;
const TRI=.9,ALERT=2*K,SCONTACT=1.1,RANGED_R=3*K,MELR=1.6*K,SREGEN=3,SREGP=.05,SREGT=3;
const uRegen=(s,dt)=>{if(S.wt-(s.lh===undefined?-99:s.lh)>=SREGT)s.hp=Math.min(s.max,s.hp+s.max*SREGP*dt);};
