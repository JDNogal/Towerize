// ==================== v366 · Datos del Taller de enemigos ====================
// El Taller (artefacto «Taller de enemigos») es donde Nogal diseña enemigos y escuadrones. tools/taller/importar.js convierte lo exportado del
// Taller en src/js/data/taller_datos.js (const TALLER={…}) y este archivo lo mete en las tablas del juego al cargar:
//  · tam: tamaño en carriles de enemigos que ya existen (TAM);
//  · en:  enemigos nuevos (ET). Los que aún no tienen su mecánica programada (no están en TALLER_MEC) entran ocultos y no salen en ninguna oleada;
//  · sq:  escuadrones: cambios a los del juego, escuadrones nuevos, versiones Nv 2 / Nv 3 («de», «nv») y escuadrones de jefe con escolta.
//         Un escuadrón con algún enemigo que no existe o que no tiene la mecánica montada queda apagado (min 999, off) hasta que la tenga.
// Sin datos (TALLER sin definir) no hace nada: el juego sigue con sus escuadrones de siempre.
const TALLER_MEC={};   // id del Taller → 1 cuando la mecánica de ese enemigo ya está programada en el juego
const TFAC={'Pieles verdes':'g','Demonios':'d','Máquinas':'m','Alienígenas':'a','Monstruos':'x'};
if(typeof FACN!=='undefined'&&!FACN.x)FACN.x='Monstruos';
function tallerAplicar(T){const rep={en:0,enOff:[],sq:0,ver:0,jefe:0,sqOff:[],tam:0};if(!T)return rep;
 for(const k in T.tam||{})if(ET[k]&&T.tam[k]>0){TAM[k]=T.tam[k];ET[k].r=T.tam[k]/2/EVS;rep.tam++;}
 for(const id in T.en||{}){const d=T.en[id],st=d.st||{};if(ET[id]||!d.fam||d.tipo==='agua')continue;const mec=typeof TMEC!=='undefined'&&TMEC[id],ok=!!(TALLER_MEC[id]||mec),tam=d.tam||1.3;
  ET[id]={n:d.n,era:d.era||1,fac:TFAC[d.fac]||undefined,gold:st.gold||1,hp:(st.hp||18)/HP0,hf:st.hp||18,sp:(st.sp||1)*K,r:tam/2/EVS,col:d.col||'#888',dmg:st.dmg||1,ap:st.ap||0,am:st.am||0,
   ud:st.ud||0,ac:1.2,need:1,rg:d.rg==='A distancia'?'ranged':'melee',xp:Math.max(1,Math.round((st.gold||1)*.6)),taller:id,fam:d.fam};
  if(d.tipo==='aire')ET[id].fly=1;if(d.lleva)ET[id].lleva=d.lleva;if(d.vf)ET[id].vf=d.vf;if(mec)Object.assign(ET[id],mec);if(!ok){ET[id].hidden=1;ET[id].pend=1;rep.enOff.push(id);}
  else{if(d.contra&&typeof ETIP2!=='undefined')ETIP2[id]=d.contra;if(typeof EFAM!=='undefined'){let f=EFAM.find(x=>x[0]===d.fam);if(!f){f=[d.fam,[]];EFAM.push(f);}if(!f[1].includes(id))f[1].push(id);}}
  TAM[id]=tam;if(T.ic&&T.ic[id]&&typeof EIC!=='undefined')EIC[id]={esvg:T.ic[id]};rep.en++;}
 const jefes=typeof SBALL!=='undefined'?SBALL.filter(k=>ET[k]&&ET[k].story):[];
 for(const k in T.sq||{}){const d=T.sq[k],base=SQUADS[k]&&!SQUADS[k].tut?SQUADS[k]:null;if(SQUADS[k]&&SQUADS[k].tut)continue;if(!base&&!d.custom)continue;
  const q=base||(SQUADS[k]={n:d.n||k,min:d.min||1,m:{}});
  if(d.n)q.n=d.n;if(d.min)q.min=d.min;if(d.m)q.m=Object.assign({},d.m);if(d.lead!==undefined){if(d.lead)q.lead=d.lead;else delete q.lead;}
  if(d.era)q.era=d.era;if(d.pz)q.pz=d.pz;if(d.de){q.de=d.de;q.nv=d.nv||2;rep.ver++;}
  if(d.f&&d.f.length){SQF[k]=d.f.map(f=>f.map(u=>[u[0],+u[1]||0,+u[2]||0]));q.t5=1;}
  const jb=Object.keys(q.m).find(t=>jefes.includes(t));if(jb){q.boss=jb;rep.jefe++;}
  const bad=Object.keys(q.m).filter(t=>!ET[t]||ET[t].pend);if(bad.length){q.off=bad;q.min0=q.min;q.min=999;delete q.boss;rep.sqOff.push(k);}
  rep.sq++;}
 // una versión no puede salir si su Nv 1 está apagado
 for(const k in SQUADS){const q=SQUADS[k];if(q.de&&SQUADS[q.de]&&SQUADS[q.de].off&&!q.off){q.off=['Nv 1'];q.min0=q.min;q.min=999;}}
 if(typeof SQVER!=='undefined')SQVER.n=-1;return rep;}
const TALLER_REP=tallerAplicar(typeof TALLER!=='undefined'?TALLER:null);
