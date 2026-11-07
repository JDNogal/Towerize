// ---- oleadas por escuadras: grupos temáticos que salen juntos, con una pausa entre escuadras ----
const SQUADS={
 patrol:{n:'Patrulla',min:1,m:{norm:5}},
 tsling:{n:'Honderos (tutorial)',min:999,tut:1,m:{norm:3,sling:2}},
 squad:{n:'Pelotón',min:2,m:{norm:3,fast:2}},
 scouts:{n:'Avanzadilla',min:3,m:{fast:4,sling:1}},
 vanguard:{n:'Vanguardia',min:4,m:{tank:1,norm:4}},
 escort:{n:'Escolta',min:5,m:{sling:3,custodian:1}},
 conclave:{n:'Cónclave',min:5,m:{acolyte:2,norm:3}},
 phalanx:{n:'Falange',min:7,m:{tank:2,shaman:1,norm:3}},
 siege:{n:'Asedio',min:8,m:{javelin:2,tank:2}},
 raid:{n:'Incursión',min:8,m:{raider:3,fast:3}},
 ritual:{n:'Ritual',min:10,m:{warlock:1,acolyte:2,norm:3}},
 bats:{n:'Bandada',min:6,m:{bat:6}},
 harpies:{n:'Arpías',min:8,m:{harpy:2,norm:3}},
 skyraid:{n:'Asalto aéreo',min:12,once:1,m:{griffin:1,harpy:2,bat:3}},
 column:{n:'Columna',min:13,m:{tank:3,shaman:1,custodian:1}},
 mesnada:{n:'Mesnada',min:10,m:{tank:1,norm:4,javelin:1,sling:1}},
 hueste:{n:'Hueste',min:11,m:{tank:2,custodian:1,norm:4}},
 coven:{n:'Aquelarre',min:12,m:{warlock:1,acolyte:3,norm:3}},
 stampede:{n:'Estampida',min:14,m:{raider:3,tank:2,fast:3}}};
// orden de formación dentro de la escuadra: delante los que aguantan, en medio el apoyo, detrás los que disparan
const FORM={raider:0,tank:0,armored:0,norm:1,vet:1,champ:1,fast:1,runner:1,bat:2,harpy:2,griffin:1,custodian:2,shaman:2,javelin:3,sling:3,acolyte:3,warlock:3};
const REGT=['norm','fast','tank','custodian','sling','javelin','raider','acolyte','warlock','shaman'],SQGAP=1.6;
const sqSz=()=>S&&!S.tut&&S.round>8?1+.15*(Math.min(S.round,15)-8):1,sqM=k=>{const m=SQUADS[k].m,z=sqSz(),o={};for(const t in m)o[t]=m[t]>=2?Math.round(m[t]*z):m[t];return o;};
const sqVal=k=>Object.entries(sqM(k)).reduce((a,[t,n])=>a+n*(S&&!S.tut&&ET[t].hf?ET[t].hf*promoF(t,S.round):ET[t].hp),0),sqN=k=>Object.values(sqM(k)).reduce((a,b)=>a+b,0);
// presupuesto (en «vida de Guerrero») equivalente a la composición antigua, para no romper la dificultad
let WB=315,WG=1.47,WG2=1.65,WG3=1.38;
// crecimiento acumulado de la vida total de las oleadas hasta la ronda r (tres tramos)
const wGrow=r=>{let g=1;for(let i=2;i<=Math.min(r,15);i++)g*=i<=7?WG:i<=12?WG2:WG3;return g;};
function waveBudget(r){if(!S.tut)return WB*wGrow(r)*(r>15?Math.pow(1.08,r-15)*hpR(r):1);let b=0;for(let i=0;i<8+5*r;i++)b+=ET[i%5===4?'tank':i%3===2?'fast':'norm'].hp;const nc=r>=5?1+Math.floor((r-5)/4):0;return b+nc*ET.custodian.hp;}

// familias: a partir de ciertas rondas, parte de los básicos llegan como su versión más dura
const PROMO={norm:[[6,'vet',.3],[9,'vet',.55],[11,'champ',.3],[13,'champ',.55]],fast:[[7,'runner',.4],[10,'runner',.7]],tank:[[9,'armored',.35],[13,'armored',.6]],bat:[[8,'harpy',.15]]};
function promote(t,r){const P=PROMO[t];if(!P||S.tut)return t;let out=t;for(const[r0,u,p]of P)if(r>=r0&&Math.random()<p)out=u;return out;}
function promoF(t,r){const P=PROMO[t];if(!P)return 1;let v=1;for(const[r0,u,p]of P)if(r>=r0)v+=p*((ET[u].hf||0)/ET[t].hf-1)*.5;return v;}
function waveSquads(r){
 const av0=Object.keys(SQUADS).filter(k=>SQUADS[k].min<=r&&!SQUADS[k].tut),av=av0.filter(k=>!SQUADS[k].once),nt=Math.min(av.length,r<4?1:r<11?2:3),last=S.lastTh||[];
 // las escuadras de una sola aparición van aparte: salen siempre en su ronda de estreno y luego a veces, sin ocupar hueco de escuadra
 const ext=av0.filter(k=>SQUADS[k].once&&(SQUADS[k].min===r||Math.random()<.3));
 const fresh=av.filter(k=>SQUADS[k].min===r&&r>1);let th=fresh.slice(0,nt);
 // barajado ponderado: las escuadras de más nivel pesan más, así que en rondas altas las básicas salen poco
 const wsh=a=>a.map(k=>[k,Math.pow(Math.random(),1/Math.pow(SQUADS[k].min+2,2))]).sort((x,y)=>y[1]-x[1]).map(x=>x[0]);
 const rest=wsh(av.filter(k=>!th.includes(k)&&!last.includes(k))),rest2=wsh(av.filter(k=>!th.includes(k)&&last.includes(k)));
 const hasT=(k,t)=>!!SQUADS[k].m[t],clash=(a,k)=>r<10&&a.some(o=>(hasT(o,'shaman')&&hasT(k,'custodian'))||(hasT(o,'custodian')&&hasT(k,'shaman')));
 for(const k of rest.concat(rest2))if(th.length<nt&&!clash(th,k))th.push(k);
 S.lastTh=th;let B=waveBudget(r);const out=[];let i=0;for(const k of ext){out.push(k);B-=sqVal(k);}
 let gd=0;while(B>0&&th.length&&out.length<100&&gd++<400){const k=th[i++%th.length],v=sqVal(k);if(out.length&&B<v*.5)break;out.push(k);B-=v;}
 return out;}
