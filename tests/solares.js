// Solares revisados (v328): 3 disposiciones por pieza (el Valle ya no existe), todas en hierba y sin repetir casilla; la V3 se puede ver en partida
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage();p.on('pageerror',e=>errs.push(e.message));await p.goto('file://'+process.argv[2]);await p.waitForTimeout(700);
const r=await p.evaluate(()=>{if(PIECES.some(x=>x.n==='Valle')||SOLARES.Valle||SOLN.Valle)return {out:[{n:'Valle sigue',nv:0}]};const out=[];for(const P0 of PIECES){const L=SOLARES[P0.n];out.push({n:P0.n,nv:L.length,
 bad:L.flat().filter(([x,y])=>P0.p[y][x]!=='#').length,dup:L.some(v=>new Set(v.map(a=>a+'')).size!==v.length),
 placed:L.map((v,i)=>{const o={n:P0.n,p:P0.p,b:[]};solarize(o,i,1);return o.p.join('').split('S').length-1===v.length;}).every(Boolean)});}
 return {out,rec:JSON.stringify(SOLARES['Recta'][0]),ser:JSON.stringify(SOLARES['Serpiente'][0])};});
for(const o of r.out){ck(o.nv===3,o.n+': '+o.nv+' disposiciones');ck(!o.bad,o.n+': solar fuera de la hierba');ck(!o.dup,o.n+': solar repetido');ck(o.placed,o.n+': no se colocan todos');}
ck(r.rec==='[[5,2],[1,3],[5,4]]','Recta V1 con los cambios de Nogal');ck(r.ser==='[[2,2],[5,1],[4,4],[1,5]]','Serpiente V1 con los cambios de Nogal');
await b.close();if(errs.length)console.log('ERRS',errs);if(fails.length||errs.length){console.log(fails.join("\n"));process.exit(1);}console.log("ok");})();
