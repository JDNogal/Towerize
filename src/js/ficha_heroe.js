// ==================== v359 · Ficha del héroe nueva (Nogal, 17 y 18-nov; maqueta en la Mesa, «Ficha del héroe nueva») ====================
// Mismas piezas que la ficha de torre (ftChip, ftFold, ftdps): nombre con retrato pequeño y Nv, reaparición arriba a la derecha,
// descripción corta, vida en barra ancha (con el héroe caído se parte en trozos que se rellenan cada segundo), Daño · Enfriamiento ·
// su tercera tarjeta, efectos, experiencia y DPS real. En el mapa, debajo, las Habilidades pasivas (Nv 4 y Nv 8; sin alcanzar, «???»).
// Las activas solo salen en el compendio y al elegir héroe (en el mapa ya tienen su retrato junto al del héroe).
// una o dos líneas por héroe, como mucho
var HDESC1={reinhart:'Caballero cuerpo a cuerpo: aguanta en primera línea y frena a varios enemigos a la vez.',
 sylvana:'Arquera élfica: dispara rápido y desde lejos.',radagast:'Mago enano: golpes lentos de daño mágico a distancia.',
 yrsa:'Guerrera cuerpo a cuerpo que alterna golpes de fuego y de hielo.',korr:'Luchador cuerpo a cuerpo de daño mágico, muy duro contra la magia.',
 ferro:'Robot que dispara daño elemental a distancia.',kai:'Asesina muy rápida: mucho daño a un solo objetivo, poco aguante.',vega:'Tiradora de largo alcance con su dron.'};
// la tercera tarjeta de cada héroe (lo que más lo distingue); sin dato: Rango los de distancia y Armadura los de cuerpo a cuerpo
var HST3={reinhart:'ap',yrsa:'ap',korr:'mr',kai:'spd',sylvana:'rng',radagast:'rng',ferro:'rng',vega:'rng'};
// efectos del héroe: icono y valor en la misma pastilla; el nombre, en el bocadillo de su palabra clave
var HFXP={yrsa:[['burn','×2'],['chill','×2']],korr:[['tmagic',''],['umr','30'],['mrbrk','−5']],radagast:[['tmagic',''],['mrbrk','−5']],ferro:[['telem','']]};
function fhPill(ic,v,src){return fxPill(ic,v,src);}
// mismas piezas que la ficha de torre, pero como funciones (la ficha del héroe se pinta ya al cargar el libro, antes de ficha_torre.js)
function fhChip(cls,lab,val){return `<div class="ftchip"><span>${lab}</span><b class="${cls}">${val}</b></div>`;}
var FHOPEN={hpas:true};
function fhFold(id,sum,body){return `<details class="ftfold" data-fh="${id}"${FHOPEN[id]?' open':''}><summary>${sum}</summary><div class="ftin">${body}</div></details>`;}
document.addEventListener('toggle',ev=>{const d=ev.target;if(d&&d.dataset&&d.dataset.fh&&d.closest('#hinfo'))FHOPEN[d.dataset.fh]=d.open;},true);
function fhThird(id,x,arm,src){const D=HEROES[id],k=HST3[id]||(D.ranged?'rng':'ap');
 if(k==='mr')return ['cmg',kst('umr','Resist. mág.',src),D.mr||0];
 if(k==='spd')return ['cs',kst('espd','Velocidad',src),cas(D.spd)+'/s'];
 if(k==='rng')return ['cg',kst('hrng','Rango',src),cas(D.base.range)];
 return ['cph',kst('aphys','Armadura',src),armTxt(Math.round(arm*10)/10)];}
function fhSeg(rez,left){const n=Math.max(1,Math.min(15,Math.round(rez))),done=Math.max(0,Math.min(n,Math.round((rez-left)/rez*n)));
 return `<div class="fhseg">${Array.from({length:n},(_,i)=>`<i class="${i<done?'on':''}"></i>`).join('')}</div>`;}
function heroInfo(id,quiet){
 const D=HEROES[id],H=!quiet&&S&&S.hero&&S.hero.id===id?S.hero:null,l=H?H.lvl:1,x=hsAt(id,l),x10=hsAt(id,HLMAX),src='hero:'+id,q=H?H.s:null;
 const arm=x.ap+(H?RELARM()+auraAP(H.s):0),amr=H?auraAP(H.s):0,dead=!!(H&&q&&q.hp<=0),left=dead?Math.ceil(q.rt):0,rez=x.rez;
 const k3=fhThird(id,x,arm,src),dt=DT[D.dt||'phys'];
 let h=`<div class="${quiet===1?'ttl':'ttl fhttl'}">${quiet===1?'':`<span class="hpsm fhpor">${portrait(id,1)}</span>`}<b>${D.n}</b><span class="fhlv">${kst('hlv','Nv '+l,src)}</span><span class="fhrez">${kw('hrez',(dead?left:rez)+' s',src)}</span></div>`;
 h+=`<div class="ftc fhc">`+(HDESC1[id]?`<div class="ftdesc">${HDESC1[id]}</div>`:'');
 // vida: barra ancha; caído, cuenta atrás en trozos
 const max=Math.round(H&&q?q.max:x.hp),hp=Math.round(H&&q?Math.max(0,q.hp):x.hp);
 h+=dead?`<div class="fhbox fhhp dead"><div class="fhl"><span>${kst('hhp','Vida',src)}</span><span class="fhdv">Caído · vuelve en ${left} s</span></div>${fhSeg(rez,q.rt)}</div>`
  :`<div class="fhbox fhhp"><div class="fhl"><span>${kst('hhp','Vida',src)}</span><b>${hp} / ${max}</b></div><div class="ftbar"><i style="width:${max?hp/max*100:0}%"${hp/max<.35?' class="low"':''}></i></div></div>`;
 h+=`<div class="ftchips n3">${fhChip('cd',kst('hdmg','Daño',src),f(x.dmg))}${fhChip('cr',kst('hcd','Enfriam.',src),f(x.cd)+' s')}${fhChip(k3[0],k3[1],k3[2])}</div>`;
 const fx=(HFXP[id]||[]).map(([ic,v])=>fhPill(ic,v,src)).join('');if(fx)h+=`<div class="ftfx fhfx">${fx}</div>`;
 h+='<div class="ftgap"></div>';
 if(H){const top=H.lvl>=HLMAX,need=top?1:xpNeed(H.lvl+1),xp=top?need:Math.floor(H.xp);
  h+=`<div class="fhbox fhxp"><div class="fhl"><span>${kst('hxp','Experiencia',src)}</span><b>${top?'Nivel máximo':xp+' / '+need}</b></div><div class="ftbar"><i style="width:${Math.min(100,xp/need*100)}%"></i></div></div>`;
  const theo=x.dmg/x.cd;h+=`<div class="ftdps fhdps" data-theo="${theo}"><div class="ftdl"><span>${kst('dpsr','DPS real',src)}</span><span class="ftdv">—</span></div><div class="ftbar"><i></i></div><div class="ftdn"></div></div>`;
  // habilidades pasivas (las activas tienen su retrato junto al del héroe)
  const A=HAB[id]||{},pas=(a,n)=>!a?'':l>=n?`<details class="fhpas" open><summary><span class="fhpn">Nv ${n}</span><b>${a.ic} ${a.n}</b></summary><div class="fhpt">${a.t()}</div></details>`:`<div class="fhpas no"><span class="fhpn">Nv ${n}</span><b>???</b></div>`;
  h+=fhFold('hpas','<span>Habilidades pasivas</span>',pas(A.p4,4)+pas(A.p8,8));}
 // más detalles: el resto de datos
 const k3k=HST3[id]||(D.ranged?'rng':'ap');
 let more=(k3k!=='ap'&&arm>0?R('cph',kst('aphys','Armadura',src),armTxt(Math.round(arm*10)/10)):'')+(k3k!=='mr'&&(amr>0||D.mr)?R('cmg',kst('umr','Resistencia mágica',src),armTxt(amr+(D.mr||0))):'')+
  (D.ranged?R('cd',kst('hmel','Daño cuerpo a cuerpo',src),f(x.dmg*HMELEE)):'')+R(dt.cls,kst('dtype','Tipo de daño',src),dt.n)+(D.area?R('ca',kst('harea','Área',src),cas(D.area)+' de radio'):'')+objRow(!D.ranged,src)+
  (D.ranged&&k3k!=='rng'?R('cg',kst('hrng','Rango',src),cas(D.base.range)):'')+(HFX[id]?R('cf','Efectos',HFX[id](src)):'')+R('',kst('hblk','Corpulencia',src),D.w>1?'Bloquea hasta '+D.w:'1')+
  (k3k!=='spd'?R('cs',kst('espd','Velocidad',src),cas(D.spd)+'/s'):'')+`<small style="margin:0 0 2px">En combate se mueve un ${Math.round((1-COMBM)*100)}% más lento.</small>`+
  (!H&&quiet===1?R('cf',kst('hxp','Experiencia por nivel',src),xpNeed(2)+' → '+xpNeed(10)):'')+
  `<small>Nv ${HLMAX}: ${Math.round(x10.hp)} de vida, ${f(x10.dmg)} de daño, ${f(x10.ap)} de armadura.</small>`;
 if(!quiet)more+=`<div class="tgt"><small>Pulsa su icono y luego una casilla del camino para recolocarlo.</small></div>`;
 h+=quiet?`<div class="fhmore">${more}</div>`:fhFold('hmore','<span>Más detalles</span>',more);
 return h+'</div>';}
// DPS real del héroe: igual que el de las torres (ventana de 3 s en oleada; entre oleadas, la media de la última, en gris)
var HRD={s:[],d0:null,t0:0,last:null,ph:null};
function fhSample(){const H=S&&S.hero;if(!H||!H.pt)return;const now=S.wt||0,wave=S.phase==='wave',d=H.pt.dmgT||0;
 if(wave&&HRD.ph!=='wave'){HRD.d0=d;HRD.t0=now;HRD.s=[];}
 if(!wave&&HRD.ph==='wave'&&HRD.d0!=null){const dt=now-HRD.t0;HRD.last=dt>.5?(d-HRD.d0)/dt:null;}
 HRD.ph=S.phase;if(!wave)return;HRD.s.push([now,d]);while(HRD.s.length>2&&now-HRD.s[1][0]>=FTWIN)HRD.s.shift();}
function fhReal(){if(S.phase!=='wave')return HRD.last==null?null:{v:HRD.last,frozen:1};const s=HRD.s;if(s.length<2)return {v:0,warm:1};const a=s[0],b=s[s.length-1],dt=b[0]-a[0];return {v:dt>0?(b[1]-a[1])/dt:0,warm:dt<FTWIN*.6};}
setInterval(()=>{try{if(!S)return;fhSample();const dp=document.querySelector('#hinfo .ftdps');if(!dp)return;const H=S.hero,theo=+dp.dataset.theo,r=H&&H.s.hp>0?fhReal():null,bi=dp.querySelector('.ftbar i'),dv=dp.querySelector('.ftdv'),dn=dp.querySelector('.ftdn');
 let pc=0,v='—',n='';if(r){pc=Math.round(r.v/theo*100);v=f(r.v);n=r.frozen?'Media de la última oleada · '+pc+'% del teórico':(r.warm?'Midiendo…':pc+'% de su DPS teórico ('+f(theo)+')');}
 else n=H&&H.s.hp<=0?'Caído':S.phase==='wave'?'':'Se mide durante las oleadas';
 dp.classList.toggle('frozen',!r||!!r.frozen);dp.classList.toggle('over',pc>100);bi.style.width=Math.min(100,pc)+'%';if(dv.textContent!==v)dv.textContent=v;if(dn.textContent!==n)dn.textContent=n;}catch(e){}},200);
