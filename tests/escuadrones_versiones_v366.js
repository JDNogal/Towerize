// v366 · Motor de los escuadrones del Taller: versiones Nv 1/2/3 diseñadas (en vez de subir unidades sueltas), formaciones en 5 carriles,
// reparto por ronda, jefe con su escolta al paso del jefe, valor por unidad y Coloso fuera. Los escuadrones de muestra son del Taller (Cónclave y sus versiones).
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(async()=>{const out={};{const i=document.getElementById('intro');if(i)i.style.display='none';}INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;
 // ---- Coloso fuera ----
 out.sinColoso=!ET.colossus&&!EFAM.some(f=>f[1].includes('colossus'))&&!PSPEC.includes('colossus');
 // ---- escuadrones de muestra, tal como salen del Taller ----
 Object.assign(SQUADS.conclave,{t5:1,pz:1,min:4});SQF.conclave=[[['minion',2,-2],['minion',2,2],['minion',1,0],['acolyte',0,-1],['acolyte',0,1]],[['minion',0,-2],['minion',0,2],['minion',0,0],['acolyte',1.5,-1],['acolyte',1.5,1]]];
 SQUADS.conclave_n2={n:'Cónclave',min:6,era:1,pz:1,lead:'acolyte',de:'conclave',nv:2,t5:1,m:{acolyte:2,demon:2,minion:1}};
 SQF.conclave_n2=[[['demon',2,-2],['demon',2,2],['minion',1,0],['acolyte',0,-1],['acolyte',0,1]],[['demon',0,-2],['demon',0,2],['minion',0,0],['acolyte',1.5,-1],['acolyte',1.5,1]]];
 SQUADS.conclave_n3={n:'Cónclave',min:11,era:1,pz:1,lead:'acolyte',de:'conclave',nv:3,t5:1,m:{acolyte:2,dchamp:1,demon:2}};
 SQF.conclave_n3=[[['demon',2,-2],['demon',2,2],['dchamp',1.1,0],['acolyte',0,-1],['acolyte',0,1]],[['demon',0,-2],['demon',0,2],['dchamp',0,0],['acolyte',1.5,-1],['acolyte',1.5,1]]];
 SQUADS.qjefe_t={n:'Corte de prueba',min:15,era:1,boss:'kgob',t5:1,m:{kgob:1,runner:4,custodian:1,sling:4}};
 SQF.qjefe_t=[[['runner',0,-2],['runner',0,2],['runner',1,-1],['runner',1,1],['kgob',2.5,0],['custodian',2.5,2],['sling',4.5,-2],['sling',4.5,-1],['sling',4.5,1],['sling',4.5,2]]];
 startGame(15);chooseHero('reinhart');if(DLG.on)dlgEnd();S.chests={};S.evts={};RL.open=false;HQ.q=[];
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
 RL.open=false;S.phase='build';
 // ---- qué versión toca ----
 out.ver=sqVer('conclave',0,12)==='conclave'&&sqVer('conclave',1,5)==='conclave'&&sqVer('conclave',1,6)==='conclave_n2'&&sqVer('conclave',2,8)==='conclave_n2'&&sqVer('conclave',2,12)==='conclave_n3'&&(()=>{/* con los datos del Taller cargados, uno sin versiones */const k=Object.keys(SQUADS).find(k=>!SQUADS[k].de&&!SQUADS[k].boss&&!Object.values(SQUADS).some(o=>o.de===k));return !k||sqVer(k,1,9)===null;})();
 S.round=8;const m2=sqTierM('conclave',1,8);out.tierM=m2.demon===2&&m2.minion===1&&m2.acolyte===2&&!m2.dchamp;
 // un escuadrón sin versiones diseñadas sigue con el cálculo de siempre
 {const m=sqTierM('patrol',1,8);out.viejo=(m.vet||0)>=1&&(m.norm||0)>=1;}
 // ---- reparto por ronda: solo Nv 1 al principio; al final, de 10: 2 / 4 / 4 ----
 const cnt=r=>{const c=[0,0,0];for(let i=0;i<10;i++)c[sqTierOf(i,10,r)]++;return c.join('/');};
 out.reparto=cnt(3)==='10/0/0'&&cnt(7)==='7/3/0'&&cnt(10)==='5/5/0'&&cnt(15)==='2/4/4';out.repartoV=[cnt(7),cnt(12),cnt(14)].join(' ');
 // ---- las versiones y los escuadrones de jefe no se sortean como tema ----
 {let bad=0;for(let i=0;i<40;i++){S.round=12;for(const k of waveSquads(12))if(SQUADS[k].de||SQUADS[k].boss)bad++;}out.sorteo=bad===0;}
 // ---- formación del Taller: 5 carriles y filas en casillas pequeñas ----
 {const f=sqForm('conclave_n2',SQUADS.conclave_n2.m);out.forma=f.length===5&&f.some(o=>Math.abs(o.l)===2)&&f.filter(o=>o.lead).length===1&&f.find(o=>o.lead).t==='acolyte'&&Math.abs(Math.max(...f.map(o=>o.r))*SQROW-Math.max(...SQF.conclave_n2[0].map(s=>s[1]),...SQF.conclave_n2[1].map(s=>s[1])))<.6;}
 // ---- en la oleada: a la cola va la versión, con su clave ----
 {const _w=waveSquads;waveSquads=()=>['conclave','conclave','conclave','conclave'];S.round=9;makePortals(null);waveSquads=_w;
  const ks=S.portals.flatMap(q=>q.sq);out.cola=ks.filter(k=>k==='conclave_n2').length===2&&ks.filter(k=>k==='conclave').length===2;
  startWave();let demons=0,lanes=new Set();for(let i=0;i<200;i++){update(.05);for(const e of S.enemies){if(e.t==='demon')demons++;if(e.fln!=null)lanes.add(e.fln);}}
  out.salen=demons>0&&lanes.has(2)&&lanes.has(-2);}
 // ---- valor por unidad ----
 {S.phase='build';const v0=enVal('norm');ET.norm.vf=2;const v1=enVal('norm');delete ET.norm.vf;ET.tank.lleva={norm:3};const v2=enVal('tank');delete ET.tank.lleva;out.valor=v0===ET.norm.hf&&v1===2*v0&&Math.abs(v2-(ET.tank.hf+3*v0))<1e-6;}
 // ---- jefe con escolta ----
 {S.enemies=[];S.phase='build';S.round=15;const _w=waveSquads;waveSquads=()=>['patrol'];makePortals(S.ends[0]||S.portals[0]);waveSquads=_w;
  const q=S.portals.find(q=>q.bsq);out.jefePlan=!!q&&SQUADS[q.bsq]&&SQUADS[q.bsq].boss==='kgob'&&!q.esc&&q.plan.kgob===1/* qjefe_t o el del Taller (qjefe_kgob) */;
  out.jefeBocadillo=!!q&&portalRows(q).includes(ET.runner.n);
  startWave();const iB=q.q.indexOf('kgob');out.jefeCola=iB>=0&&q.q.filter(t=>t==='runner').length>=4&&q.qf[iB]&&q.qf[iB].sid==='jefe'&&q.qf[iB].lead===1&&q.q.filter(t=>t==='kgob').length===1;
  let boss=null;for(let i=0;i<1500&&!(boss&&S.enemies.filter(e=>e.sqid===boss.sqid).length>=10);i++){update(.05);boss=S.enemies.find(e=>e.t==='kgob')||boss;}
  const esc=boss?S.enemies.filter(e=>e.sqid===boss.sqid&&e!==boss):[];
  out.jefeEscolta=!!boss&&esc.length>=9&&esc.filter(e=>e.t==='runner').every(e=>e.fsp===ET.kgob.sp||e.loose)&&boss.sqlead===1&&S.sqL[boss.sqid]===boss;}
 // ---- datos del Taller: se meten en las tablas; lo que aún no tiene mecánica queda apagado ----
 {const rep=tallerAplicar({tam:{sling:1},en:{i01x:{n:'Portalero de prueba',era:1,fac:'Demonios',fam:'Místicos',tipo:'tierra',rg:'No ataca',col:'#7a3ab8',st:{hp:200,sp:.8,ap:10,am:20,dmg:1,gold:10,ud:0}},i02x:{n:'Idea',fam:''}},
   sq:{qx1:{custom:true,era:1,pz:1,min:7,n:'Atajo de prueba',lead:'i01x',m:{i01x:1,vet:4},f:[[['vet',0,-1],['vet',0,1],['i01x',1.5,0],['vet',3,-1],['vet',3,1]]]},
       qx1_n2:{custom:true,de:'qx1',nv:2,era:1,min:9,n:'Atajo de prueba',m:{i01x:1,champ:2,vet:2},f:[[['champ',0,-1],['champ',0,1],['i01x',1.5,0],['vet',3,-1],['vet',3,1]]]},
       patrol:{f:[[['norm',0,-2],['norm',0,0],['norm',0,2],['norm',1.5,-2],['norm',1.5,0],['norm',1.5,2]]]}}});
  out.taller=rep.en===1&&rep.tam===1&&rep.sq===3&&rep.ver===1&&ET.i01x.hf===200&&ET.i01x.sp===.8*K&&ET.i01x.hidden===1&&ET.i01x.fac==='d'&&!ET.i02x&&tamOf('sling')===1
   &&SQUADS.qx1.min===999&&SQUADS.qx1.off[0]==='i01x'&&SQUADS.qx1_n2.min===999&&SQUADS.patrol.t5===1&&SQF.patrol[0][0][2]===-2;
  let bad=0;for(let i=0;i<30;i++){S.round=12;for(const k of waveSquads(12))if(k.startsWith('qx1'))bad++;}out.apagado=bad===0;}
 return out;});
const bad=Object.keys(r).filter(k=>r[k]!==true&&k!=='repartoV');console.log(JSON.stringify(r));console.log(bad.length?'FALLA: '+bad.join(', '):'escuadrones_versiones ok');console.log(errs.length?'ERRS '+JSON.stringify(errs.slice(0,5)):'ERRS []');await b.close();process.exit(bad.length||errs.length?1:0);})();
