// node correr.js <html> <salida> <escenario> [torres,separadas,por,comas] [niveles]  -> corre trabajos en 2 procesos y deja <salida>/*.jsonl
// escenarios: ola (oleada ronda 20, 300 enemigos) · elites (10 élites de la era 1, ronda 20) · duro (un Señor de la guerra) · jefe
const {spawn,execFileSync}=require('child_process');const fs=require('fs');const path=require('path');
const [,,html,outN,esc,tws,lvs]=process.argv;const out=path.join(__dirname,outN);fs.mkdirSync(out,{recursive:true});
const meta=JSON.parse(execFileSync(process.execPath,[path.join(__dirname,'run_lab.js'),path.join(__dirname,html),'--meta'],{encoding:'utf8'}).trim().split('\n').pop());fs.writeFileSync(path.join(out,'meta.json'),JSON.stringify(meta));
const towers=tws&&tws!=='todas'?tws.split(','):meta.towers,niv=(lvs||'3,4a+,4b+').split(',');const jobs=[];
const ELI=['elite','troll','hknight','warlord','wander','elite','troll','hknight','warlord','wander'];
for(const type of towers)for(const lv of niv){const sp=meta.specs[type]||[];let lvl,spec=null,abMax=false;
 if(/^\d$/.test(lv)){lvl=+lv;}else{const i=lv[1]==='a'?0:1;if(!sp[i])continue;lvl=4;spec=sp[i];abMax=lv.endsWith('+');}
 const b={type,lvl,spec,abMax,tile:'',copies:1,lv,esc,seed:+(process.env.SEED||12345)};
 for(const e of esc.split('+')){
  if(e==='ola')jobs.push({...b,esc:e,round:20,maxT:120,maxEnemies:300});
  else if(e==='apoyo')jobs.push({...b,esc:e,round:20,maxT:120,maxEnemies:300,ref:'cata'});
  else if(e==='apoyo0')jobs.push({...b,esc:e,round:20,maxT:120,maxEnemies:300,ref:'cata',refOnly:1});
  else if(e==='ola2')jobs.push({...b,esc:e,round:20,maxT:120,maxEnemies:300,era:2});
  else if(e==='olafull')jobs.push({...b,esc:e,round:20,maxT:240,maxEnemies:5000});
  else if(e==='ola12')jobs.push({...b,esc:e,round:12,maxT:120,maxEnemies:300});
  else if(e==='elites'){if(!meta.support.includes(type))jobs.push({...b,esc:e,round:20,mobs:ELI,gap:2,maxT:180});}
  else if(e==='duro'){if(!meta.support.includes(type))jobs.push({...b,esc:e,round:20,mobs:['warlord'],maxT:120});}
  else if(e==='jefe'){if(lvl<4||meta.support.includes(type))continue;const era=meta.eras[type]===2?2:1;for(const bo of meta.bosses.filter(x=>(x.era===2)===(era===2)))jobs.push({...b,esc:e,boss:bo.id,era,maxT:240,lv:'J'+lv});}}}
const N=2,chunks=[[],[]];jobs.forEach((j,i)=>chunks[i%N].push(j));let done=0;const t0=Date.now();console.log(jobs.length+' pruebas');
chunks.forEach((c,i)=>{const jf=path.join(out,'p'+i+'.jobs.json'),of=path.join(out,'p'+i+'.jsonl');fs.writeFileSync(jf,JSON.stringify(c));if(fs.existsSync(of))fs.unlinkSync(of);
 const p=spawn(process.execPath,[path.join(__dirname,'run_lab.js'),path.join(__dirname,html),jf,of],{stdio:'ignore'});p.on('close',()=>{if(++done===N){fs.writeFileSync(path.join(out,'TERMINADO.txt'),String(Math.round((Date.now()-t0)/1000)));console.log('fin '+Math.round((Date.now()-t0)/1000)+' s');}});});
