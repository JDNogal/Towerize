// node tabla.js <dir> [dirAnterior] -> tabla compacta por torre/nivel de cada escenario, con la diferencia respecto a otra tanda
const fs=require('fs'),path=require('path');
function load(d){const R=[];for(const f of fs.readdirSync(d))if(f.endsWith('.jsonl'))for(const l of fs.readFileSync(path.join(d,f),'utf8').split('\n'))if(l.trim()){try{const r=JSON.parse(l);if(r.ok)R.push(r);else if(r.err||r.errs)console.error('ERR',JSON.stringify(r).slice(0,200));}catch(e){}}return R;}
const d=process.argv[2],R=load(d),P=process.argv[3]?load(process.argv[3]):null;let meta={names:{},specNames:{}};try{meta=JSON.parse(fs.readFileSync(path.join(d,'meta.json')));}catch(e){}
const key=r=>r.type+'|'+r.lv+'|'+(r.boss||r.esc||(r.mobs?'mobs':'ola'));const prev=P?Object.fromEntries(P.map(r=>[key(r),r])):{};
const nm=r=>(meta.names[r.type]||r.type)+' '+(r.spec?(meta.specNames[r.spec]||r.spec)+(r.abMax?'+':''):'Nv'+r.lvl);
const dlt=(a,b)=>b==null?'':' ('+(a-b>=0?'+':'')+Math.round(a-b)+')';
for(const oe of ['ola','ola2','apoyo','apoyo0','olafull','ola12',undefined]){const olas=R.filter(r=>!r.bossMode&&!r.mobMode&&r.esc===oe);if(olas.length){console.log('\n## Oleada · '+(oe||'ola')+' · torre sola\n| Torre | Coste | DPS | Bajas | Fugas | Parado % |\n|---|---|---|---|---|---|');
 for(const r of olas.sort((a,b)=>b.kills-a.kills)){const p=prev[key(r)];console.log(`| ${nm(r)} | ${r.inv} | ${r.dps}${dlt(r.dps,p&&p.dps)} | ${r.kills}${dlt(r.kills,p&&p.kills)} | ${r.leakHp} | ${r.stallPct} |`);}}}
for(const e of ['elites','duro']){const M=R.filter(r=>r.mobMode&&r.esc===e);if(!M.length)continue;console.log('\n## '+(e==='elites'?'Solo élites (10, ronda 20)':'Un objetivo duro (Señor de la guerra, ronda 20)')+'\n| Torre | Coste | Muertos | Vida quitada % | Daño | Caídas de unidades | s |\n|---|---|---|---|---|---|---|');
 for(const r of M.sort((a,b)=>b.hpDonePct-a.hpDonePct)){const p=prev[key(r)];console.log(`| ${nm(r)} | ${r.inv} | ${r.killed}/${r.n} | ${r.hpDonePct}${dlt(r.hpDonePct,p&&p.hpDonePct)} | ${r.dmg} | ${r.uDead} | ${r.time} |`);}}
const B=R.filter(r=>r.bossMode);if(B.length){console.log('\n## Jefe final contra una torre\n| Torre | Jefe | Resultado | En alcance s |\n|---|---|---|---|');const bn=Object.fromEntries((meta.bosses||[]).map(b=>[b.id,b.n]));
 for(const r of B.sort((a,b)=>a.hpLeftPct-b.hpLeftPct)){const p=prev[key(r)];console.log(`| ${nm(r)} | ${bn[r.boss]||r.boss} | ${r.killed?'**MUERTO** '+r.time+' s':(r.capped?'⏱ ':'')+'queda '+r.hpLeftPct+' %'+dlt(r.hpLeftPct,p&&p.hpLeftPct)} | ${r.inRangeS} |`);}}
