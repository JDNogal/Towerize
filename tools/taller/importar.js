#!/usr/bin/env node
// Convierte lo exportado del Taller de enemigos en src/js/data/taller_datos.js (lo que carga src/js/taller_aplicar.js).
//   node tools/taller/importar.js exportado.json
// exportado.json: { version?, enemigos:{<clave>:{tam,…}}, nuevos:{<id>:{…ficha…}}, escuadrones:{<clave>:{…}}, iconos:{<id>:"<svg…>"} }
//   (las tres colecciones de la base de datos del Taller tal cual, un objeto por colección con el id del documento como clave, y su iconos.json)
// Comprueba cada escuadrón (que la composición cuadre con cada formación, carriles de -2 a 2) y avisa de lo que no cuadra, sin arreglarlo.
// Añade data/taller_datos.js al orden de montaje (justo antes de taller_aplicar.js) si no estaba.
const fs=require('fs'),path=require('path');
const ROOT=path.join(__dirname,'..','..'),src=process.argv[2];
if(!src||!fs.existsSync(src)){console.error('Uso: node tools/taller/importar.js exportado.json');process.exit(1);}
const X=JSON.parse(fs.readFileSync(src,'utf8')),col=k=>{const c=X[k]||{};return Array.isArray(c)?Object.fromEntries(c.map(d=>[d.id,d.data||d])):c;};
const CENTRO=['i07divisor'];/* enemigos que se parten al morir: en las formaciones conviene que vayan por los carriles -1, 0 o 1 */
const E=col('enemigos'),N=col('nuevos'),Q=col('escuadrones'),IC=X.iconos||{},avisos=[];
const out={v:X.version||new Date().toISOString().slice(0,10),tam:{},en:{},sq:{},ic:{}};
for(const k in E)if(E[k]&&E[k].tam>0)out.tam[k]=E[k].tam;
for(const id in N){const d=N[id];if(!d||!d.fam)continue;   // sin familia = idea, no enemigo
 out.en[id]={n:d.n,era:d.era,fac:d.fac,fam:d.fam,tipo:d.tipo,rg:d.rg,col:d.col,st:d.st,tam:d.tam,lleva:d.lleva,vf:d.vf,mec:d.mec,aviso:d.aviso,contra:d.contra};
 for(const f in out.en[id])if(out.en[id][f]===undefined||out.en[id][f]==='')delete out.en[id][f];
 const svg=d.ic||IC[id];if(svg)out.ic[id]=svg;else avisos.push('sin icono: '+id+' ('+d.n+')');}
const cuenta=f=>{const c={};for(const u of f)c[u[0]]=(c[u[0]]||0)+1;return c;},igual=(a,b)=>{const ks=new Set([...Object.keys(a),...Object.keys(b)]);for(const k of ks)if((a[k]||0)!==(b[k]||0))return false;return true;};
for(const k in Q){const d=Q[k];if(!d)continue;const o={};for(const f of['n','era','pz','min','m','f','lead','de','nv','custom'])if(d[f]!==undefined&&d[f]!==null)o[f]=d[f];
 if(o.f){o.f.forEach((f,i)=>{for(const u of f)if(CENTRO.includes(u[0])&&Math.abs(u[2])>1)avisos.push(k+' F'+(i+1)+': '+u[0]+' va por un carril del borde ('+u[2]+'); al partirse no le cabe el triángulo: mejor en el carril central o los de al lado');
  for(const u of f)if(Math.abs(u[2])>2||u[1]<0)avisos.push(k+' F'+(i+1)+': ficha fuera de los 5 carriles o con fila negativa ('+u.join(',')+')');
   if(o.m&&!igual(cuenta(f),o.m))avisos.push(k+' F'+(i+1)+': la formación no cuadra con la composición '+JSON.stringify(o.m)+' ≠ '+JSON.stringify(cuenta(f)));});}
 if(o.de&&!Q[o.de]&&!o.custom)avisos.push(k+': versión de un escuadrón que no está ('+o.de+')');
 out.sq[k]=o;}
const js='// Generado por tools/taller/importar.js a partir del Taller de enemigos ('+out.v+'). No editar a mano: se cambia en el Taller y se vuelve a importar.\nconst TALLER='+JSON.stringify(out)+';\n';
fs.writeFileSync(path.join(ROOT,'src','js','data','taller_datos.js'),js);
const op=path.join(ROOT,'src','order.json'),ord=JSON.parse(fs.readFileSync(op,'utf8'));
if(!ord.js.includes('data/taller_datos.js')){const i=ord.js.indexOf('taller_aplicar.js');if(i<0)throw new Error('falta taller_aplicar.js en src/order.json');ord.js.splice(i,0,'data/taller_datos.js');fs.writeFileSync(op,JSON.stringify(ord,null,1)+'\n');}
console.log('Taller '+out.v+': '+Object.keys(out.tam).length+' tamaños, '+Object.keys(out.en).length+' enemigos nuevos ('+Object.keys(out.ic).length+' con icono), '+Object.keys(out.sq).length+' escuadrones ('+Object.values(out.sq).filter(q=>q.de).length+' versiones) → src/js/data/taller_datos.js ('+(js.length/1024).toFixed(0)+' KB)');
if(avisos.length){console.log('\nAVISOS ('+avisos.length+'):');for(const a of avisos)console.log(' · '+a);}
