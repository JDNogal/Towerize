#!/usr/bin/env node
// Monta Towerize en un único archivo HTML a partir de src/.
//   node build.js            → index.html (raíz del repo, el que publica GitHub Pages)
//   node build.js --out DIR  → además escribe DIR/towerize-vNNN.html
// La versión vive en version.txt. El orden de los archivos está en src/order.json.
// Sin dependencias: solo concatena. No cambia ni una línea del código.
const fs=require('fs'),path=require('path');
const ROOT=__dirname,SRC=path.join(ROOT,'src');
const read=p=>fs.readFileSync(p,'utf8');
const ver=read(path.join(ROOT,'version.txt')).trim();
const order=JSON.parse(read(path.join(SRC,'order.json')));
const cat=(dir,names)=>names.map(n=>read(path.join(SRC,dir,n))).join('');
const css=cat('css',order.css),js=cat('js',order.js);
const tpl=read(path.join(SRC,'index.html'));
for(const k of ['@@CSS@@','@@JS@@','@@VER@@'])if(!tpl.includes(k))throw new Error('falta '+k+' en src/index.html');
const html=tpl.replace('@@CSS@@',()=>css).replace('@@JS@@',()=>js).replace('@@VER@@',ver);
const outs=[path.join(ROOT,'index.html')];
const i=process.argv.indexOf('--out');if(i>0&&process.argv[i+1])outs.push(path.join(process.argv[i+1],'towerize-v'+ver+'.html'));
for(const o of outs)fs.writeFileSync(o,html);
console.log('Towerize v'+ver+' → '+outs.map(o=>path.relative(process.cwd(),o)||'.').join(', ')+' ('+(html.length/1024).toFixed(0)+' KB)');
