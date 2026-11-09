// Barricada: corta el camino de lado a lado. Recta: tira de 1x3 perpendicular. Curva: diagonal a 45° recortada al giro. En cruces no se puede poner.
const clipPoly=(pts,nx,ny,c)=>{const o=[];for(let i=0;i<pts.length;i++){const a=pts[i],b=pts[(i+1)%pts.length],da=nx*a[0]+ny*a[1]-c,db=nx*b[0]+ny*b[1]-c;
 if(da<=0)o.push(a);if((da<0&&db>0)||(da>0&&db<0)){const u=da/(da-db);o.push([a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u]);}}return o;};
function barrAt(x,y){const kx=Math.floor(x/K),ky=Math.floor(y/K),pc=(a,b)=>inbc(a,b)&&S.cc[b][a]===2;if(!pc(kx,ky))return null;
 const L=pc(kx-1,ky),Rr=pc(kx+1,ky),U=pc(kx,ky-1),Dd=pc(kx,ky+1),h=L+Rr,v=U+Dd,X0=kx*K,Y0=ky*K;
 if(h+v>=3)return null; // cruce en T o en cruz
 if(h===1&&v===1){const sx=L?-1:1,sy=U?-1:1,I=[X0+(sx<0?0:K),Y0+(sy<0?0:K)],O=[X0+(sx<0?K:0),Y0+(sy<0?K:0)];
  const dx=O[0]-I[0],dy=O[1]-I[1],l=Math.hypot(dx,dy),nx=-dy/l,ny=dx/l,c=nx*I[0]+ny*I[1];
  let poly=[[X0,Y0],[X0+K,Y0],[X0+K,Y0+K],[X0,Y0+K]];poly=clipPoly(poly,nx,ny,c+.55);poly=clipPoly(poly,-nx,-ny,-c+.55);
  return{kx,ky,poly,seg:[I[0],I[1],O[0],O[1]],x:kx*K+1,y:ky*K+1};}
 const vert=h>v||(h===v&&Math.abs(y-(ky*K+1))<=Math.abs(x-(kx*K+1)));
 if(vert)return{kx,ky,poly:[[x,Y0],[x+1,Y0],[x+1,Y0+K],[x,Y0+K]],seg:[x+.5,Y0,x+.5,Y0+K],x,y};
 return{kx,ky,poly:[[X0,y],[X0+K,y],[X0+K,y+1],[X0,y+1]],seg:[X0,y+.5,X0+K,y+.5],x,y};}
// punto válido más cercano: en un cruce, la vista previa salta a la casilla del camino válida más próxima
function barrPick(x,y){if(!inb(x,y)||S.cells[y][x]!==2)return null;const b=barrAt(x,y);if(b)return b;
 let best=null,bd=1e9;const kx=Math.floor(x/K),ky=Math.floor(y/K);
 for(let j=-3;j<=3;j++)for(let i=-3;i<=3;i++){const a=kx+i,c=ky+j;if(!inbc(a,c)||S.cc[c][a]!==2)continue;const cx=a*K+1,cy=c*K+1,d=Math.hypot(cx-x,cy-y);if(d<bd){const q=barrAt(cx,cy);if(q){bd=d;best=q;}}}
 return best;}
const segD=(px,py,s)=>{const ax=s[0],ay=s[1],bx=s[2]-ax,by=s[3]-ay,L2=bx*bx+by*by||1,u=Math.max(0,Math.min(1,((px-ax)*bx+(py-ay)*by)/L2));return Math.hypot(ax+bx*u-px,ay+by*u-py);};
function drawBarr(b,alpha){if(!b||!b.poly||b.poly.length<3)return;g.save();g.globalAlpha=alpha;g.beginPath();b.poly.forEach((p,i)=>i?g.lineTo(p[0]*CS,p[1]*CS):g.moveTo(p[0]*CS,p[1]*CS));g.closePath();
 g.fillStyle='#8a5a2b';g.fill();g.save();g.clip();const xs=b.poly.map(p=>p[0]*CS),ys=b.poly.map(p=>p[1]*CS),x=Math.min(...xs),y=Math.min(...ys),w=Math.max(...xs)-x,hh=Math.max(...ys)-y;
 g.strokeStyle='#f0c040';g.lineWidth=CS*.32;for(let k=-hh-w;k<w+hh;k+=CS*.9){g.beginPath();g.moveTo(x+k,y);g.lineTo(x+k+hh,y+hh);g.stroke();}g.restore();
 g.beginPath();b.poly.forEach((p,i)=>i?g.lineTo(p[0]*CS,p[1]*CS):g.moveTo(p[0]*CS,p[1]*CS));g.closePath();g.strokeStyle='#3a2410';g.lineWidth=CS*.12;g.stroke();g.restore();}
function useRelic(id){
 errAt('#relics [data-id="'+id+'"]');
 if(!S.relics.includes(id)||RL.open||S.phase==='lost'||S.phase==='won')return;
 let mim=false;
 if(S.aim==='mimic'&&id!=='mimic'){mim=true;S.aim=null;}
 else if(S.aim===id){S.aim=null;S.mimFor=null;S.msg='';renderRelics();ui();return;}
 const R=RELIC[id],st=S.rs[id];
 if(mim&&st.t>0){S.msg=R.n+' ya está activo.';ui();return;}
 if(!mim&&(st.cd>0||st.t>0)){S.msg=R.n+': el pasivo está desactivado '+fmtT(st.cd)+' más de oleada.';ui();return;}
 if(id==='mimic'){S.aim='mimic';S.msg='Elige la reliquia cuyo activo quieres copiar.'+CANC();renderRelics();ui();return;}
 if(id==='square'&&S.phase!=='place'){S.msg=R.n+': este activo solo se puede usar al elegir pieza.';ui();return;}
 if(!['coin','map','hammer','scale','notebook','square','crystal'].includes(id)&&S.phase!=='wave'){S.msg=R.n+': este activo solo se puede usar durante una oleada.';ui();return;}
 S.mimFor=mim?id:null;
 if(id==='coin'){S.gold+=200;if(S.st)S.st.gRel+=200;}
 else if(id==='map'){const k=freeSlot();if(!k){S.msg='No quedan huecos sin explorar junto al mapa.';ui();return;}S.chests[k]=1;S.msg='Ha aparecido un cofre en un hueco sin explorar.';}
 else if(id==='barricade'){S.aim='barricade';S.msg='Elige una casilla del camino para la barricada.'+CANC();renderRelics();ui();return;}
 else if(id==='hammer'){S.aim='hammer';S.msg='Elige una torre de Nv 1 o 2 para subirla un nivel gratis.'+CANC();renderRelics();ui();return;}
 else if(id==='balance'){S.aim='balance';S.msg='Elige el área de la Piedra del equilibrio.'+CANC();renderRelics();ui();return;}
 else if(id==='tome'){S.aim='tome';S.msg='Elige el área del Tomo arcano.'+CANC();renderRelics();ui();return;}
 else if(id==='quiver'){S.aim='quiver';S.msg='Elige el área donde las torres dispararán doble.'+CANC();renderRelics();ui();return;}
 else if(id==='frost'){S.aim='frost';S.msg='Elige el área que congelar.'+CANC();renderRelics();ui();return;}
 else if(id==='venom')venomBlast();
 else if(id==='square'){S.pi=null;deal();S.msg='La Escuadra del arquitecto saca piezas nuevas.';}
 else if(id==='crystal'){if(S.hp>=20){S.mimFor=null;S.msg='Tu núcleo ya tiene la vida al máximo.';ui();return;}S.hp=Math.min(20,S.hp+3);S.fx.push({x:S.core.x,y:S.core.y,t:.7,m:.7,r:1.5*K,col:'#8fe3ff'});S.msg='💎 Recuperas vida.';}
 else if(id==='harpoon'){S.aim='harpoon';S.msg='Elige el área del Arpón celeste.'+CANC();renderRelics();ui();return;}
 else if(id==='notebook'){S.nbR=S.round;S.msg='Cuaderno del aprendiz: en esta oleada, cada baja da +1 de experiencia a tu héroe.';}
 else if(id==='scale'){const v=interest()*3;goldEv(v);if(S.st)S.st.gRel+=v;S.msg='La Balanza adelanta '+v+' de oro de interés.';}
 else if(id==='idol'){if(S.hp<=2){S.mimFor=null;S.msg='Necesitas más de 2 de vida.';ui();return;}hpLoss(2);st.t=15;}
 else if(id==='ember'){S.aim='ember';S.msg='Elige el área de la lluvia de fuego.'+CANC();renderRelics();ui();return;}
 else if(id==='badge'){if(S.merc){S.mimFor=null;S.msg='Los mercenarios ya están luchando.';ui();return;}if(!spawnMerc()){S.mimFor=null;return;}S.msg='Los mercenarios del gremio se unen a la batalla.';}
 else if(id==='dice'){const v=1+Math.floor(Math.random()*6);S.dice=v;st.t=R.dur;S.msg=['','🎲 ¡Pifia! Sale un 1: tus torres hacen menos daño un rato.','🎲 Sale un 2: torres +25% de daño.','🎲 Sale un 3: torres +25% de daño.','🎲 Sale un 4: torres +50% de daño y más rápidas.','🎲 Sale un 5: torres +50% de daño y más rápidas.','🎲 ¡Un 6! Torres +100% de daño y mucho más rápidas.'][v];setCD(id);if(v===1||v===6){const c=v===1?40:80;if(S.mimFor){S.rs.mimic.cd=Math.min(S.rs.mimic.cd,c);}else st.cd=c;}heroSync();renderRelics();ui();return;}
 else st.t=R.dur;
 setCD(id);heroSync();renderRelics();ui();
}
function openRelic(){
 if(S.noChest){S.noChest=0;S.msg='El cofre está vacío: el mercader ya se había llevado lo que había dentro.';ui();return;}
 const pool=S.tut?RELICS.filter(r=>['horn','lens','anvil'].includes(r.id)&&!S.relics.includes(r.id)):shuf(RELICS.filter(r=>!r.ini&&!r.evr&&!(r.ach&&!ACHS[r.ach]&&!OPT.u_rl)&&!S.relics.includes(r.id)));RL.choices=pool.slice(0,S.chest4?4:3);S.chest4=0;RL.choices=RL.choices.map(r=>r.id);RL.choices.forEach(id=>see('rl',id));
 if(!RL.choices.length)return;(S.drr=S.drr||{}).rl=0;renderRelicPick();}
function renderRelicPick(){
 closePrim();RL.open=true;$('relic').classList.add('open');$('relic').scrollTop=0;
 $('relic').innerHTML='<b style="font-size:16px">¡Cofre abierto!</b><br><small>Elige una reliquia para esta partida. El juego está en pausa.</small><div class="cgrid">'+
  RL.choices.map(id=>{const r=RELIC[id];return `<div class="ce rcard" style="text-align:left"><div class="ric" style="background:${r.col}">${r.ic}</div><b style="display:block;text-align:center">${r.n}</b>${rdesc(id)}<button data-a="relic" data-id="${id}">Elegir</button></div>`;}).join('')+
  '</div>'+diceRr('rl')+'<small>Pulsa una reliquia de la fila superior para usar su activo (pierdes el pasivo un rato de oleada).</small>'+wcompBtn('rl');
}
function toggleOpts(v){const on=v===undefined?!(LB.open&&!LB.cover&&OP.open):v;if(on){OP.keepS=0;lbOpen('op');}else lbClose();}
function heroInfo(id,quiet){
 const D=HEROES[id],H=!quiet&&S.hero&&S.hero.id===id?S.hero:null,l=H?H.lvl:1,x=hsAt(id,l),x10=hsAt(id,HLMAX),src='hero:'+id,R2=RELIC[D.relic],q=H?H.s:null;
 const arm=x.ap+(H?RELARM()+auraAP(H.s):0),amr=H?auraAP(H.s):0;
 return `<div class="ttl"><b>${D.ic} ${D.n}</b> · ${kst('hlv','Nv '+l,src)}</div>`+
  R('chp',kst('hhp','Vida',src),H&&q?Math.round(Math.max(0,q.hp))+' / '+Math.round(q.max):Math.round(x.hp))+
  (arm>0?R('cph',kst('aphys','Armadura',src),armTxt(Math.round(arm*10)/10)):'')+(amr>0?R('cmg',kst('umr','Resistencia mágica',src),armTxt(amr)):'')+
  R('cd',kst('hdmg','Daño',src),f(x.dmg))+R(DT[D.dt||'phys'].cls,kst('dtype','Tipo de daño',src),DT[D.dt||'phys'].n)+(D.area?R('ca',kst('harea','Área',src),cas(D.area)+' de radio'):'')+R('ccl',kst('hcd','Enfriamiento',src),f(x.cd)+' s')+objRow(!D.ranged,src)+
  (D.ranged?R('cg',kst('hrng','Rango',src),cas(D.base.range))+R('cd',kst('hmel','Daño en melee',src),'−'+Math.round((1-HMELEE)*100)+'%'):'')+
  (HFX[id]?R('cf','Efectos',HFX[id](src)):'')+R('',kst('hblk','Corpulencia',src),D.w>1?'Bloquea hasta '+D.w:'1')+
  R('cg','Velocidad',cas(D.spd)+'/s')+`<small style="margin:0 0 2px">Fuera de combate se mueve ${HOOC} veces más rápido.</small>`+
  R('cr',kst('hrez','Reaparición',src),x.rez+' s')+
  (H?R('cf',kst('hxp','Experiencia',src),H.lvl>=HLMAX?'Nivel máximo':Math.floor(H.xp)+' / '+xpNeed(H.lvl+1)):quiet===1?R('cf',kst('hxp','Experiencia por nivel',src),xpNeed(2)+' → '+xpNeed(10)):'')+
  (H&&q&&q.hp<=0?`<small class="cr">Caído: vuelve en ${Math.ceil(q.rt)} s.</small>`:'')+
  (quiet?'':`<div class="tgt"><small>Pulsa su icono y luego una casilla del camino para recolocarlo.</small></div>`)+
  (quiet===2?'':`<div style="margin-top:6px"><span class="cf">${kst('hrel','Reliquia inicial',src)}:</span> ${kw('rl_'+D.relic,R2.ic+' '+R2.n,src,'st')}</div>`)+
  `<small>Nv ${HLMAX}: ${Math.round(x10.hp)} de vida, ${f(x10.dmg)} de daño, ${f(x10.ap)} de armadura.</small>`;
}
function enemyInfo(k){
 const E=ET[k],src='en:'+k,hp=r=>Math.round(E.hf&&!E.evn?E.hf*hpR(r):HP0*HPOLD(r)*E.hp);
 return `<div class="ttl"><b><i style="background:${E.col};border-radius:50%"></i>${E.n}</b></div>`+(E.hf&&!E.evn?R('chp',kst('ehp','Vida',src),hp(1))+(E.fly?R('',kst('fly','Volador',src),'Sí'):''):(E.call?'':R('chp',kst('ehp','Vida (ronda 1)',src),hp(1)))+R('chp',kst('ehp','Vida (ronda '+(E.call?30:ROUNDS)+')',src),hp(E.call?30:ROUNDS)))+R('cvl',kst('espd','Velocidad',src),f(E.sp/K)+' casillas/s')+R('cd',kst('edmg','Daño al núcleo',src),(['boss','colossus','bob'].includes(k)||E.story)?20:E.dmg)+R('cd',kst('eud','Daño a unidades',src),E.ud)+R('ccl',kst('eac','Enfriamiento',src),f(E.ac)+' s')+R('cg',kst('erg','Rango',src),E.rg==='ranged'?'A distancia':'Melee')+R(DT[E.dt||'phys'].cls,kst('dtype','Tipo de daño',src),kw(DT[E.dt||'phys'].kw,DT[E.dt||'phys'].n,src,'st'))+R('',kst('eblk','Corpulencia',src),E.need)+(E.ap?R('cph',kst('aphys','Armadura',src),armTxt(E.ap)):'')+(E.am?R('cmg',kst('amagic','Resistencia mágica',src),armTxt(E.am)):'')+(()=>{const ef=[];if(E.call)ef.push(kw('call','Vástagos',src));if(E.aura)ef.push(kw('aura','Aura',src)+' +'+E.aura.v+(E.aura.m?' de resistencia mágica · ':' de armadura · ')+f(E.aura.r/K)+' casillas');if(E.howl)ef.push(kw('howl','Aullido',src));if(E.blow)ef.push(kw('blow','Soplido',src));if(E.breath)ef.push(kw('breath','Aliento de fuego',src));if(E.pierce)ef.push(kw('pierce','Perforante',src));if(E.dodge)ef.push(kw('dodge','Escurridizo',src));if(E.steal)ef.push(kw('steal','Saqueo',src));if(E.curse)ef.push(kw('curse','Maldición',src));if(E.charm)ef.push(kw('charm','Embeleso',src));if(E.regen)ef.push(kw('regen','Regeneración',src));if(E.shield)ef.push(kw('shield','Escudo frontal',src));if(E.banner)ef.push(kw('banner','Estandarte',src));if(E.tele)ef.push(kw('tele','Teletransporte',src));if(E.camo)ef.push(kw('camo','Camuflaje',src));if(E.adapt)ef.push(kw('adapt','Adaptación',src));if(E.burst)ef.push(kw('burst','Puesta',src));if(E.launch)ef.push(kw('launch','Hangar',src));if(E.jam)ef.push(kw('jam','Interferencia',src));if(E.splashU)ef.push(kw('arcsh','Disparo en arco',src));if(E.fly&&E.rg==='ranged')ef.push(kw('airatk','Ataque aéreo',src));if(E.sk&&typeof ESK!=='undefined')ef.push(kw(E.sk,ESK[E.sk].n,src));if(E.eheal)ef.push(kw('eheal','Curación tribal',src));if(E.rift)ef.push(kw('rift','Portal del abismo',src));if(E.penta)ef.push(kw('penta','Pentagrama',src));if(E.wings)ef.push(kw('wings','Alas',src));if(E.shell)ef.push(kw('shell','Caparazón',src));if(E.pulse)ef.push(kw('pulse','Pulso',src));if(E.core2)ef.push(kw('core2','Núcleo',src));if(E.abregen)ef.push(kw('abregen','Regeneración abisal',src));if(E.stomp)ef.push(kw('stomp','Pisotón',src));if(E.line)ef.push(kw('line','Cadena de montaje',src));if(E.throne)ef.push(kw('throne','Trono',src));if(E.riches)ef.push(kw('riches','Lluvia de riquezas',src));if(E.scepter)ef.push(kw('scepter','Cetrazo real',src));if(E.gens)ef.push(kw('gens','Escudo de generadores',src));if(E.anchor)ef.push(kw('anchor','Anclado',src));if(k==='boss'||k==='colossus'||E.story)ef.push(kw('bres','Resistencia a control',src)+' '+Math.round(BOSSRES*100)+'%');return ef.length?R('cf',kst('eeff','Efectos',src),ef.join('<br>')):'';})()+R('gd',kst('egold','Oro por baja',src),E.gold+' 🪙')+R('cf',kst('exv','Experiencia',src),E.xp);
}
