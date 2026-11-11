// ---- oleadas por escuadras: grupos temáticos que salen juntos, con una pausa entre escuadras ----
const SQUADS={
 patrol:{n:'Patrulla',min:1,m:{norm:6}},
 tsling:{n:'Honderos (tutorial)',min:999,tut:1,m:{norm:3,sling:2}},
 squad:{n:'Pelotón',min:2,m:{norm:3,fast:2}},
 scouts:{n:'Avanzadilla',min:3,m:{fast:4,sling:1}},
 vanguard:{n:'Vanguardia',min:4,m:{tank:1,norm:4}},
 escort:{n:'Escolta',min:5,m:{sling:3,custodian:1}},
 conclave:{n:'Cónclave',min:5,m:{acolyte:2,norm:3}},
 phalanx:{n:'Falange',min:7,m:{tank:2,shaman:1,norm:2}},
 siege:{n:'Asedio',min:8,m:{javelin:2,tank:2}},
 raid:{n:'Incursión',min:8,m:{raider:3,fast:3}},
 ritual:{n:'Ritual',min:10,m:{warlock:1,acolyte:2,norm:3}},
 bats:{n:'Bandada',min:6,m:{bat:6}},
 harpies:{n:'Arpías',min:8,m:{harpy:2,bat:4}},
 skyraid:{n:'Asalto aéreo',min:12,once:1,m:{griffin:1,harpy:2,bat:4}},
 column:{n:'Columna',min:13,m:{tank:3,shaman:1,custodian:1}},
 mesnada:{n:'Mesnada',min:10,m:{tank:1,norm:4,javelin:2}},
 hueste:{n:'Hueste',min:11,m:{tank:2,custodian:1,norm:4}},
 coven:{n:'Aquelarre',min:12,m:{warlock:1,acolyte:3,norm:3}},
 stampede:{n:'Estampida',min:14,m:{runner:2,raider:2,fast:3}}};
// ---- batallones: cada escuadra sale ya formada. Cada formación es una lista [tipo, fila (0 = delante), carril (-1, 0, 1)].
// Reglas: 5 unidades en cinco de dado, 3 en triángulo y el apoyo en el centro. Al salir se elige al azar una de sus formaciones.
// Si la escuadra crece (rondas altas), la formación se repite detrás; los ascensos (Veterano, Corredor…) ocupan el sitio de su tipo base.
const SQF={
 patrol:[[['norm',0,-1],['norm',0,0],['norm',0,1],['norm',1,-1],['norm',1,0],['norm',1,1]],[['norm',0,-1],['norm',0,1],['norm',1,-1],['norm',1,1],['norm',2,-1],['norm',2,1]]],
 tsling:[[['norm',0,-1],['norm',0,1],['norm',.6,0],['sling',1.8,-1],['sling',1.8,1]]],
 squad:[[['fast',0,-1],['fast',0,1],['norm',1,-1],['norm',1.5,0],['norm',1,1]],[['norm',0,-1],['norm',0,1],['norm',1,0],['fast',1,-1],['fast',1,1]]],
 scouts:[[['fast',0,-1],['fast',0,1],['fast',1,-1],['fast',1,1],['sling',2.1,0]]],
 vanguard:[[['tank',0,0],['norm',1,-1],['norm',1,1],['norm',2,-1],['norm',2,1]],[['norm',0,-1],['norm',0,1],['tank',1,0],['norm',2,-1],['norm',2,1]]],
 escort:[[['sling',0,0],['sling',1.7,-1],['sling',1.7,1],['custodian',1.05,0]]],
 conclave:[[['norm',0,-1],['norm',0,1],['norm',.6,0],['acolyte',1.8,-1],['acolyte',1.8,1]]],
 phalanx:[[['tank',0,-1],['tank',0,1],['shaman',.9,0],['norm',1.8,-1],['norm',1.8,1]]],
 siege:[[['tank',0,-1],['tank',0,1],['javelin',1,-1],['javelin',1,1]]],
 raid:[[['raider',0,0],['raider',1,-1],['raider',1,1],['fast',2,-1],['fast',2,1],['fast',3,0]]],
 ritual:[[['norm',0,0],['norm',1,-1],['norm',1,1],['warlock',2,0],['acolyte',3,-1],['acolyte',3,1]]],
 bats:[[['bat',0,0],['bat',.8,-1],['bat',.8,1],['bat',1.6,-1],['bat',1.6,1],['bat',2.2,0]]],
 harpies:[[['harpy',0,-1],['harpy',0,1],['bat',1,-1],['bat',1,0],['bat',1,1],['bat',1.8,0]]],
 skyraid:[[['griffin',0,0],['harpy',1,-1],['harpy',1,1],['bat',2,-1],['bat',2,0],['bat',2,1],['bat',2.8,0]]],
 column:[[['tank',0,0],['tank',1,-1],['tank',1,1],['shaman',1.9,0],['custodian',2.9,0]]],
 mesnada:[[['tank',0,0],['norm',1,-1],['norm',1,1],['norm',2,-1],['norm',2,1],['javelin',3,-1],['javelin',3,1]]],
 hueste:[[['tank',0,-1],['tank',0,1],['custodian',1,0],['norm',2,-1],['norm',2,1],['norm',3,-1],['norm',3,1]],[['norm',0,-1],['norm',0,1],['tank',1,-1],['custodian',1,0],['tank',1,1],['norm',2,-1],['norm',2,1]]],
 coven:[[['norm',0,-1],['norm',0,0],['norm',0,1],['acolyte',1.4,-1],['acolyte',1.4,1],['warlock',2,0],['acolyte',2.8,0]]],
 stampede:[[['fast',0,0],['fast',1,0],['fast',2,0],['runner',.5,-1],['runner',.5,1],['raider',1.6,-1],['raider',1.6,1]],[['fast',0,0],['runner',1,-1],['runner',1,1],['raider',2,-1],['raider',2,1],['fast',3,-1],['fast',3,1]]]};
const SQFAM={vet:'norm',champ:'norm',runner:'fast',armored:'tank'},SQROW=1.15;
// reparte las unidades reales (m, ya ascendidas) en los huecos de la formación; devuelve [{t,r,l}] ordenado por fila
function sqForm(k,m){const fs=SQF[k];const units=[];for(const t in m)for(let i=0;i<m[t];i++)units.push(t);if(!fs)return null;
 const f=fs[Math.floor(Math.random()*fs.length)],depth=Math.max(...f.map(s=>s[1]))+1.3,out=[],left=units.slice();
 for(let c=0;left.length&&c<6;c++){let got=0;for(const[st,r,l]of f){let i=left.indexOf(st);if(i<0)i=left.findIndex(u=>SQFAM[u]===st);if(i<0)i=left.findIndex(u=>SQFAM[st]&&SQFAM[st]===SQFAM[u]);if(i<0)continue;out.push({t:left.splice(i,1)[0],r:r+c*depth,l});got++;}if(!got)break;}
 let r0=out.length?Math.max(...out.map(o=>o.r))+1:0;for(let i=0;i<left.length;i++)out.push({t:left[i],r:r0+Math.floor(i/2),l:i%2?1:-1});
 return out.sort((a,b)=>a.r-b.r||a.l-b.l);}
// orden de formación dentro de la escuadra: delante los que aguantan, en medio el apoyo, detrás los que disparan
const FORM={raider:0,tank:0,armored:0,norm:1,vet:1,champ:1,fast:1,runner:1,bat:2,harpy:2,griffin:1,custodian:2,shaman:2,javelin:3,sling:3,acolyte:3,warlock:3};
const REGT=['norm','fast','tank','custodian','sling','javelin','raider','acolyte','warlock','shaman'],SQGAP=1.6;
const sqSz=()=>S&&!S.tut&&S.round>8?1+.15*(Math.min(S.round,15)-8):1,sqM=k=>{const m=SQUADS[k].m,z=sqSz(),o={};for(const t in m)o[t]=m[t]>=2?Math.round(m[t]*z):m[t];return o;};
let sqValT=null;const sqVal=k=>sqValT?sqValT(k):Object.entries(sqM(k)).reduce((a,[t,n])=>a+n*(S&&!S.tut&&ET[t].hf?ET[t].hf*promoF(t,S.round):ET[t].hp),0),sqN=k=>Object.values(sqM(k)).reduce((a,b)=>a+b,0);
// presupuesto (en «vida de Guerrero») equivalente a la composición antigua, para no romper la dificultad
let WB=315,WG=1.47,WG2=1.65,WG3=1.38;
// crecimiento acumulado de la vida total de las oleadas hasta la ronda r (tres tramos)
let WGR=null;/* v307: crecimiento propio por ronda (para suavizar solo una franja); si no hay, el de siempre */
const wGrow=r=>{let g=1;for(let i=2;i<=Math.min(r,15);i++)g*=WGR&&WGR[i]?WGR[i]:i<=7?WG:i<=12?WG2:WG3;return g;};
function waveBudget(r){if(!S.tut)return WB*wGrow(r)*(r>15?Math.pow(1.08,r-15)*hpR(r):1);let b=0;for(let i=0;i<8+5*r;i++)b+=ET[i%5===4?'tank':i%3===2?'fast':'norm'].hp;const nc=r>=5?1+Math.floor((r-5)/4):0;return b+nc*ET.custodian.hp;}

// familias: a partir de ciertas rondas, parte de los básicos llegan como su versión más dura
const PROMO={norm:[[6,'vet',.3],[9,'vet',.55],[11,'champ',.3],[13,'champ',.55]],fast:[[7,'runner',.4],[10,'runner',.7]],tank:[[9,'armored',.35],[13,'armored',.6]],bat:[[8,'harpy',.15]]};
function promote(t,r){const P=PROMO[t];if(!P||S.tut)return t;let out=t;for(const[r0,u,p]of P)if(r>=r0&&Math.random()<p)out=u;return out;}
function promoF(t,r){const P=PROMO[t];if(!P)return 1;let v=1;for(const[r0,u,p]of P)if(r>=r0)v+=p*((ET[u].hf||0)/ET[t].hf-1)*.5;return v;}
function waveSquads(r){
 const av0=Object.keys(SQUADS).filter(k=>SQUADS[k].min<=r&&!SQUADS[k].tut&&(SQUADS[k].era||1)===((S&&S.era)||1)),av=av0.filter(k=>!SQUADS[k].once),nt=Math.min(av.length,r<4?1:r<11?2:3),last=S.lastTh||[];
 // las escuadras de una sola aparición van aparte: salen siempre en su ronda de estreno y luego a veces, sin ocupar hueco de escuadra
 const ext=av0.filter(k=>SQUADS[k].once&&(SQUADS[k].min===r||Math.random()<.3));
 const fresh=av.filter(k=>SQUADS[k].min===r&&r>1);let th=fresh.slice(0,nt);
 // barajado ponderado: las escuadras de más nivel pesan más, así que en rondas altas las básicas salen poco
 const wsh=a=>a.map(k=>[k,Math.pow(Math.random(),1/Math.pow(SQUADS[k].min+2,2))]).sort((x,y)=>y[1]-x[1]).map(x=>x[0]);
 const rest=wsh(av.filter(k=>!th.includes(k)&&!last.includes(k))),rest2=wsh(av.filter(k=>!th.includes(k)&&last.includes(k)));
 const hasT=(k,t)=>!!SQUADS[k].m[t],aur=k=>Object.keys(SQUADS[k].m).some(t=>ET[t]&&ET[t].aura),clash=(a,k)=>(aur(k)&&a.some(aur))||(r<10&&a.some(o=>(hasT(o,'shaman')&&hasT(k,'custodian'))||(hasT(o,'custodian')&&hasT(k,'shaman'))));/* v305: como mucho un tipo de escuadra con aura por oleada */
 for(const k of rest.concat(rest2))if(th.length<nt&&!clash(th,k))th.push(k);
 S.lastTh=th;let B=waveBudget(r);const out=[];let i=0;for(const k of ext){out.push(k);B-=sqVal(k);}
 let gd=0,na=0;const mix=th.some(k=>!aur(k));while(B>0&&th.length&&out.length<100&&gd++<400){const k=th[i++%th.length],v=sqVal(k);/* v305: la escuadra con aura sale una vuelta sí y otra no (más salteada) */if(mix&&aur(k)&&(na++%2===1))continue;if(out.length&&B<v*.5)break;out.push(k);B-=v;}
 return out;}
