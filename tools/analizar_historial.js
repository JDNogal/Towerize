// Resume uno o varios historiales descargados del juego (⬇️ Descargar historial, en Partidas).
// Uso: node tools/analizar_historial.js archivo1.json [archivo2.json …]
const fs=require('fs');const files=process.argv.slice(2);if(!files.length){console.log('Uso: node tools/analizar_historial.js historial.json [más.json]');process.exit(1);}
let runs=[];const seen=new Set();for(const f of files){const o=JSON.parse(fs.readFileSync(f,'utf8'));for(const r of o.runs||[]){if(seen.has(r.id))continue;seen.add(r.id);runs.push(r);}}
runs=runs.filter(r=>!r.tut);const pct=(a,b)=>b?Math.round(100*a/b)+'%':'—',avg=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:0,f1=n=>n.toFixed(1);
const fin=runs.filter(r=>r.res==='w'||r.res==='l'),W=fin.filter(r=>r.res==='w'),Lo=fin.filter(r=>r.res==='l');
console.log(`\n=== Historial: ${runs.length} partidas (sin tutorial) · ${fin.length} terminadas · ${W.length} ganadas (${pct(W.length,fin.length)}) · ${runs.length-fin.length} abandonadas o en curso`);
const vers=[...new Set(runs.map(r=>r.ver))];console.log('Versiones: '+vers.join(', '));
// por era y héroe
const grp=(k)=>{const g={};for(const r of fin){const key=k(r);(g[key]=g[key]||[]).push(r);}return g;};
console.log('\n--- Por era ---');for(const [k,L] of Object.entries(grp(r=>'Era '+(r.era||1)+' · '+r.R+' rondas'))){const w=L.filter(r=>r.res==='w');console.log(`${k}: ${L.length} partidas, ${pct(w.length,L.length)} ganadas, vida media al ganar ${w.length?f1(avg(w.map(r=>r.hp)))+"/"+f1(avg(w.map(r=>r.hp0))):"—"}`);}
console.log('\n--- Por héroe ---');for(const [k,L] of Object.entries(grp(r=>r.hero)).sort((a,b)=>b[1].length-a[1].length)){const w=L.filter(r=>r.res==='w');console.log(`${k.padEnd(10)} ${String(L.length).padStart(3)} partidas · ${pct(w.length,L.length).padStart(4)} ganadas · Nv medio ${f1(avg(L.map(r=>r.hlv)))}`);}
// dónde se pierde
console.log('\n--- Ronda en la que se pierde ---');const dr={};for(const r of Lo)dr[r.r]=(dr[r.r]||0)+1;for(const k of Object.keys(dr).sort((a,b)=>a-b))console.log(`Ronda ${String(k).padStart(2)}: ${'█'.repeat(dr[k])} ${dr[k]}`);
console.log('\n--- Vida perdida por ronda (media de todas las partidas que llegaron a esa ronda) ---');const mx=Math.max(...fin.map(r=>r.R),0);
for(let i=0;i<mx;i++){const L=fin.filter(r=>r.r>i);if(!L.length)continue;const v=avg(L.map(r=>(r.hl||[])[i]||0));if(v>0)console.log(`Ronda ${String(i+1).padStart(2)}: ${f1(v).padStart(5)} ${'▇'.repeat(Math.round(v*2))}`);}
// enemigos que más vida quitan
console.log('\n--- Enemigo que más vida quitó (veces que fue el peor de la partida) ---');const we={};for(const r of fin)if(r.worst){const q=we[r.worst.t]=we[r.worst.t]||{n:0,hp:0};q.n++;q.hp+=r.worst.n;}
for(const [k,q] of Object.entries(we).sort((a,b)=>b[1].n-a[1].n).slice(0,12))console.log(`${k.padEnd(12)} ${q.n} veces · ${q.hp} de vida en total`);
// torres: cuota de daño media y presencia
console.log('\n--- Torres: en cuántas partidas aparecen y qué parte del daño hacen (media cuando aparecen) ---');const tw={};
for(const r of fin){const tot=r.tw.reduce((a,t)=>a+t[3],0)||1,per={};for(const t of r.tw){const k=t[0].startsWith('hero:')?'(héroe)':t[0]+(t[1]?':'+t[1]:'');per[k]=(per[k]||0)+t[3];}
 for(const k in per){const q=tw[k]=tw[k]||{n:0,sh:[],w:0};q.n++;q.sh.push(per[k]/tot);if(r.res==='w')q.w++;}}
console.log('torre[:espec]'.padEnd(26)+'partidas  % daño  % ganadas');for(const [k,q] of Object.entries(tw).sort((a,b)=>b[1].n-a[1].n))console.log(`${k.padEnd(26)}${String(q.n).padStart(8)}  ${(Math.round(100*avg(q.sh))+'%').padStart(6)}  ${pct(q.w,q.n).padStart(9)}`);
// reliquias
console.log('\n--- Reliquias: % de victorias en las partidas que la tenían ---');const rl={};for(const r of fin)for(const k of r.rel||[]){const q=rl[k]=rl[k]||{n:0,w:0};q.n++;if(r.res==='w')q.w++;}
for(const [k,q] of Object.entries(rl).sort((a,b)=>b[1].n-a[1].n))console.log(`${k.padEnd(12)} ${String(q.n).padStart(3)} partidas · ${pct(q.w,q.n)} ganadas`);
console.log('');
