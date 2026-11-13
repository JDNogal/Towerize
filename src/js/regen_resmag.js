// ==================== v315 · Regeneración de los enemigos fuertes y resistencia mágica rota en uso ====================
// Decidido con Nogal (13-nov-2026):
// · Regeneración: campeones 0,3 %, mini-élites 0,4 %, élites 0,5 % y jefes 0,6 % de su vida máxima por segundo.
//   Fuera de combate, entera; si le han hecho daño (también quemadura, veneno o sangrado) en los últimos 2,5 s, la mitad.
//   Sin regeneración: ARGOS (robot con escudo), el Generador de escudo y los trolls (ya tienen la suya).
// · Resistencia mágica rota, 3 fuentes por era: Maleficio (Foco Arcano), Radagast y el Grimorio quebrado en la era 1;
//   Ácido nanométrico (Enjambre devorador), Korr y el Emisor de interferencias en la era 2.

// ---- resistencia mágica rota: cada fuente tiene su tope y no se come lo que pusieron otras más fuertes ----
// (antes, al pasar del tope se borraban los golpes más viejos, aunque fueran de otra fuente con un tope mayor)
mbrkAdd=function(e,a,mx){if(!e||!(a>0)||!(e.hp>0))return;mx=mx||a;e.mbrk=e.mbrk||[];const s=mbrkOf(e),room=mx-s;
 if(room>0)e.mbrk.push({t:MBRKT,a:Math.min(a,room),mx});
 else{let o=null;for(const q of e.mbrk)if(q.mx===mx&&(!o||q.t<o.t))o=q;if(o)o.t=MBRKT;}};

// ---- regeneración de los enemigos fuertes ----
const RGHIT=2.5,RGEN={};
for(const[v,L]of[[.003,['champ','dchamp','armored','centu','praet','brute','titan']],[.004,['mini','hknight','greyw','infil','mutant']],
 [.005,['elite','warlord','wander','griffin','momdrg','bigw','brood','carrier','manta']],[.006,['boss','kgob','alord','colossus','bob','forge','symb']]])for(const k of L)if(ET[k])RGEN[k]=v;
const rgPct=v=>String(Math.round(v*1000)/10).replace('.',',')+' %';
// Emisor de interferencias (pasivo «Sin señal»): los enemigos con la resistencia mágica rota no regeneran
const sinSenal=e=>!!(S&&S.relics&&S.relics.includes('emisor')&&rp('emisor')&&mbrkOf(e)>0);
function rgTick(dt){for(const e of S.enemies){if(!(e.hp>0)){e.rgV=0;continue;}
  if(e.rgH==null)e.rgH=e.hp;if(e.hp<e.rgH-1e-6)e.rgL=S.wt;
  const ss=sinSenal(e);
  // los trolls tienen su propia regeneración (elites.js / jefes.js): Sin señal también la corta
  if(ss&&(e.t==='troll'||e.t==='atroll')&&e.hp>e.rgH)e.hp=e.rgH;
  const v=RGEN[e.t];e.rgV=0;
  if(v&&!ss&&e.hp<e.max){const inC=e.rgL!=null&&S.wt-e.rgL<RGHIT;e.hp=Math.min(e.max,e.hp+e.max*v*(inC?.5:1)*dt);e.rgV=inC?1:2;}
  e.rgH=e.hp;}}
{const _n=newStatesTick;newStatesTick=function(dt){const r=_n.apply(this,arguments);try{if(S&&S.phase==='wave')rgTick(dt);}catch(e){}return r;};}

// ---- quién rompe la resistencia mágica ----
// Maleficio (Foco Arcano): ya no da un % de daño mágico; cada orbe quita −5 de resistencia mágica (hasta −10 / −15)
AB.hex.ranks=[{c:45,a:5,max:10,m:0},{c:55,a:5,max:15,m:0}];
AB.hex.txt=r=>`Cada orbe deja ${kw('mrbrk','resistencia mágica rota','')} a su objetivo: <span class="cmg">−${r.a}</span> por orbe, hasta <span class="cmg">−${r.max}</span>.`;
SPECS.orb.foco.d='Orbes que rompen la resistencia mágica, cargan novas y pueden convertir a los enemigos en ranas.';
{const _oh=orbHit;orbHit=function(t,tg,s,dmg){const r=_oh.apply(this,arguments);try{const hx=abRank(t,'hex');if(hx&&tg){if(tg.fx)delete tg.fx.hex;mbrkAdd(tg,hx.a||5,hx.max||10);}}catch(e){}return r;};}
// Ácido nanométrico: rompe armadura y resistencia mágica (antes, la resistencia mágica iba por su cuenta)
AB.acid.txt=r=>`Cada segundo, los enemigos dentro del enjambre sufren ${kw('brk','armadura rota','')} y ${kw('mrbrk','resistencia mágica rota','')}: <span class="cph">−${r.a}</span> de cada una, acumulable hasta <span class="cph">−${r.max}</span>.`;
// Radagast y Korr: sus golpes quitan −5 de resistencia mágica, hasta −10 · Grimorio quebrado (pasivo): todo tu daño mágico, igual
{const _hm=eHurtMod;eHurtMod=function(e,a,src,ty){const r=_hm.apply(this,arguments);try{if(r>0&&e.hp>0){
  const hid=src&&src.hero&&src.hero.id;if(hid==='radagast'||hid==='korr')mbrkAdd(e,5,10);
  if(ty==='magic'&&S.relics.includes('grim')&&rp('grim'))mbrkAdd(e,5,10);}}catch(x){}return r;};}
HFX.radagast=src=>'Sus golpes dejan '+kw('mrbrk','resistencia mágica rota',src)+': −5, hasta −10';
{const _k=HFX.korr;HFX.korr=src=>_k(src)+'. Sus golpes dejan '+kw('mrbrk','resistencia mágica rota',src)+': −5, hasta −10';}

// ---- Grimorio quebrado (era 1) ----
nrAdd({id:'grim',n:'Grimorio quebrado',ic:'📕',col:'#5a2a7a',era:1,cd:1.5,
 pas:()=>`Todo tu daño mágico deja ${kw('mrbrk','resistencia mágica rota','')}: <span class="cmg">−5</span> por golpe, hasta <span class="cmg">−10</span>.`,
 act:()=>`<b>Transmutación</b>: durante <b>8 s</b>, el daño físico que reciben los enemigos con ${kw('mrbrk','resistencia mágica rota','')} pasa a ser <span class="cmg">daño mágico</span>.`},
 {dur:8,use:()=>{for(const e of S.enemies)if(e.hp>0&&mbrkOf(e)>0)S.fx.push({x:e.x,y:e.y,t:.45,m:.45,r:.7*K,col:'#b48aff'});return true;}});
// Transmutación: el golpe físico cuenta con la resistencia mágica en lugar de la armadura
{const _m=e2DmgM;e2DmgM=function(e,src,ty){let m=_m.apply(this,arguments);try{if(ty==='phys'&&S.relics.includes('grim')&&ra('grim')&&mbrkOf(e)>0){
  const M=A=>{A=Math.max(-MAXPEN,A);return 1-A/(A+ARM_K);};m*=M(armorOf(e,'magic'))/M(armorOf(e,'phys'));RS('grim').n++;}}catch(x){}return m;};}

// ---- Emisor de interferencias (era 2) ----
nrAdd({id:'emisor',n:'Emisor de interferencias',ic:'📡',col:'#2a4a6a',era:2,cd:1.5,
 pas:()=>`<b>Sin señal</b>: los enemigos con ${kw('mrbrk','resistencia mágica rota','')} no ${kw('rgn','regeneran','')} vida.`,
 act:()=>`Un pulso deja a todos los enemigos del mapa con <span class="cmg">−20</span> de ${kw('mrbrk','resistencia mágica rota','')} durante <b>${MBRKT} s</b>.`},
 {use:()=>{const L=S.enemies.filter(e=>e.hp>0&&!e.leak);if(!L.length){S.msg='Emisor de interferencias: no hay enemigos en el mapa.';return false;}
  for(const e of L){mbrkAdd(e,20,20);S.fx.push({x:e.x,y:e.y,t:.4,m:.4,r:.6*K,col:'#7ad8ff'});}RS('emisor').n+=L.length;return true;}});

// ---- en el mapa: cruces verdes al regenerar (más tenues en combate) y un aro violeta roto con la resistencia mágica rota ----
{const _d=e2DrawWorld;e2DrawWorld=function(lw){const r=_d.apply(this,arguments);try{const X=v=>v*CS+CS/2,now=performance.now()/1000,es=typeof EVS!=='undefined'?EVS:1;
  for(const e of S.enemies){if(!(e.hp>0))continue;const rr=ET[e.t].r*CS*es;
   if(e.rgV&&!e.rgn){g.strokeStyle='rgba(110,230,120,.9)';g.lineWidth=lw(1.6);for(let i=0;i<2;i++){const k=(now*.9+i*.5)%1,px=X(e.x)+(i?rr:-rr)*.7,py=X(e.y)-rr-k*CS*.9,a=CS*.16;g.globalAlpha=(1-k)*(e.rgV===1?.45:1);g.beginPath();g.moveTo(px-a,py);g.lineTo(px+a,py);g.moveTo(px,py-a);g.lineTo(px,py+a);g.stroke();}g.globalAlpha=1;}
   if(e.mbrk&&e.mbrk.length){g.strokeStyle='rgba(180,138,255,.9)';g.lineWidth=lw(2);g.setLineDash([lw(5),lw(3)]);g.beginPath();g.arc(X(e.x),X(e.y),rr+lw(3.5),0,7);g.stroke();g.setLineDash([]);}}}catch(e){}return r;};}

// ---- compendio ----
{const _ei=enemyInfo;enemyInfo=function(k){let h=_ei.apply(this,arguments);try{const v=RGEN[k];if(v){const row=R('chp',kst('rgn','Regeneración','en:'+k),rgPct(v)+' de su vida/s');h=h.replace('<i class="cpref"',row+'<i class="cpref"');if(!h.includes(row))h+=row;}}catch(e){}return h;};}
E2KW.rgn=()=>'<b>Regeneración</b>'+R('chp','Campeones · mini-élites',rgPct(.003)+' · '+rgPct(.004)+' /s')+R('chp','Élites · jefes',rgPct(.005)+' · '+rgPct(.006)+' /s')+R('cr','En combate','la mitad')+
 '<small>Los enemigos fuertes recuperan cada segundo un % de su vida máxima. Si han recibido daño en los últimos '+String(RGHIT).replace('.',',')+' s (también de quemadura, veneno o sangrado), regeneran la mitad. Hay que hacerles daño seguido: dos zonas de torres muy separadas les dejan curarse por el camino. Algunas habilidades también dan regeneración durante unos segundos a tus unidades o a los enemigos.</small>';
E2KW.mrbrk=()=>'<b>Resistencia mágica rota</b>'+R('cr','Duración de cada golpe',MBRKT+' s')+'<small>Reduce la resistencia mágica del enemigo. Cada golpe suma su reducción y caduca por separado, hasta el máximo de cada fuente. Puede quedar por debajo de 0: entonces recibe más daño mágico (como mucho, el doble). Beneficia a todo el daño mágico, venga de la torre que venga.</small>';
MECUSE.rgn=Object.keys(RGEN).map(k=>'en:'+k);MECUSE.mrbrk=['tw:orb','tw:nano','hr:radagast','hr:korr'];MECUSE.cursed=[];
// Trebuchet › Rompemurallas: menos disparos para llegar al tope (Nogal, 13-nov: es de área y lenta, raro que dé muchas veces al mismo)
AB.breach.ranks=[{c:40,a:5,max:10},{c:50,a:10,max:20}];
// Colmena › Corrosión del enjambre: ya quitaba resistencia mágica a quien muerden (mientras sigan encima); ahora se llama por su nombre
AB.swcor.n='Mordisco ácido';{AB.swcor.txt=r=>`Cada criatura que muerde al mismo enemigo le deja ${kw('mrbrk','resistencia mágica rota','')}: <span class="cmg">−${r.a}</span> mientras siga encima (puede quedar negativa).`;}
MECUSE.mrbrk.push('tw:alien');
// Alquimista: pierde Corrosión (la armadura rota con veneno queda solo en la era 2, Chorro de ácido) y gana Catalizador
// «otro estado que hace daño»: quemadura, sangrado o hipotermia (el veneno de la propia torre no cuenta)
const catOther=e=>e.bn>0||!!(e.bl&&e.bl.length)||!!(e.cs&&e.cs.length&&chillF(e)>0);
try{MECUSE.brk=MECUSE.brk.filter(x=>x!=='tw:poison');}catch(e){}
