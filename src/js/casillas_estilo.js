// ==================== v307 · Casillas especiales con dibujo propio ====================
// Cada casilla lleva un pictograma (ojo, espada, rayo…) en vez de la letra. Tres estilos: Sello (de serie), Losa rúnica y Baldosa
// de color (cosméticos, Opciones › Personalización). Cada estilo tiene su versión Fantástica y Distópica, y la «Super» lleva marco dorado.
const BFICO={"rng": "<path d=\"M1.8 12s3.8-6.5 10.2-6.5S22.2 12 22.2 12s-3.8 6.5-10.2 6.5S1.8 12 1.8 12z\"/><circle cx=\"12\" cy=\"12\" r=\"3.3\" fill=\"currentColor\"/>", "pow": "<path d=\"M12 2.5l2.2 3v9.5h-4.4V5.5z\" fill=\"currentColor\"/><path d=\"M7 15.5h10M12 16v4.5M10 21h4\"/>", "spd": "<path d=\"M13.5 2.5L6 13.5h5.5L10 21.5l8-11.5h-5.5z\" fill=\"currentColor\"/>", "gold": "<circle cx=\"12\" cy=\"12\" r=\"8.5\"/><path d=\"M14.6 9.2c-.6-1-1.6-1.4-2.6-1.4-1.6 0-2.8.8-2.8 2.1 0 2.9 5.8 1.5 5.8 4.3 0 1.3-1.3 2.1-3 2.1-1.2 0-2.4-.5-3-1.5M12 6v1.8M12 16.3v1.8\"/>", "aoe": "<path d=\"M12 2.5l1.9 5.3 5.1-2.4-2.4 5.1 5.3 1.9-5.3 1.9 2.4 5.1-5.1-2.4L12 21.5l-1.9-5.3-5.1 2.4 2.4-5.1L2.5 12l5.3-1.9L5.4 5l5.1 2.4z\" fill=\"currentColor\"/>", "crt": "<circle cx=\"12\" cy=\"12\" r=\"7.5\"/><circle cx=\"12\" cy=\"12\" r=\"3.2\"/><path d=\"M12 1.5v4M12 18.5v4M1.5 12h4M18.5 12h4\"/>", "prf": "<path d=\"M3 21L19.5 4.5M14 4h6v6\" /><path d=\"M8 9.5l6.5 6.5\" stroke-width=\"3.4\" stroke-linecap=\"butt\"/>", "eco": "<circle cx=\"6\" cy=\"12\" r=\"2.4\" fill=\"currentColor\"/><path d=\"M10.5 7.5a6.4 6.4 0 0 1 0 9M14.5 4.5a10.6 10.6 0 0 1 0 15M18.5 2a14 14 0 0 1 0 20\"/>", "per": "<path d=\"M6.5 2.5h11M6.5 21.5h11M7.5 2.5c0 5.5 9 6 9 9.5s-9 4-9 9.5M16.5 2.5c0 5.5-9 6-9 9.5s9 4 9 9.5\"/><path d=\"M9.5 19.5h5l-2.5-2.6z\" fill=\"currentColor\"/>", "tal": "<path d=\"M14.5 3.5a4.6 4.6 0 0 0-4.2 6.3L3.5 16.6l3.9 3.9 6.8-6.8a4.6 4.6 0 0 0 6.3-4.2l-2.8 2.8-3.2-.9-.9-3.2z\" fill=\"currentColor\"/>", "cua": "<path d=\"M12 2.5l8 3v6c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10v-6z\" fill=\"currentColor\"/><path d=\"M12 8v8M8 12h8\" stroke=\"#0b0d10\" stroke-width=\"2.6\"/>"};
const bfIcoSvg=(k,col,sw)=>`<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="${col}" stroke-width="${sw||2}" stroke-linecap="round" stroke-linejoin="round" style="color:${col}">${(BFICO[k]||'').replace(/#0b0d10/g,'#0b0d10')}</svg>`;
const BFDEFS='<defs><linearGradient id="st" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".25"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient><linearGradient id="bev" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient></defs>';
const BFST={
 sello(k,c,sup,e2){let base,ic,ty;
  if(!e2){base=`<circle cx="32" cy="32" r="26" fill="${c}" opacity=".22"/><circle cx="32" cy="32" r="26" fill="none" stroke="${c}" stroke-width="3.5"/><circle cx="32" cy="32" r="20" fill="none" stroke="${c}" stroke-width="1.4" stroke-dasharray="3 3"/>`;ic=bfIcoSvg(k,'#fff8e8');ty=18;}
  else{base=`<ellipse cx="32" cy="52" rx="24" ry="6" fill="${c}" opacity=".4"/><path d="M14 52 L20 30 H44 L50 52" fill="${c}" opacity=".13"/><path d="M8 52h48" stroke="${c}" stroke-width="2.5"/><circle cx="32" cy="28" r="15" fill="#0b1016" stroke="${c}" stroke-width="2.5"/>`;ic=bfIcoSvg(k,c);ty=14;}
  const sp=sup?'<circle cx="32" cy="32" r="30" fill="none" stroke="#ffd75a" stroke-width="2.5"/>'+[[8,8],[56,8],[8,56],[56,56]].map(([x,y])=>`<path d="M${x} ${y-4}l1.3 2.7 2.7 1.3-2.7 1.3-1.3 2.7-1.3-2.7-2.7-1.3 2.7-1.3z" fill="#ffd75a"/>`).join(''):'';
  return `${base}<g transform="translate(18 ${ty}) scale(1.17)">${ic}</g>${sp}`;},
 losa(k,c,sup,e2){let base,glow;
  if(!e2){base=`<rect x="3" y="3" width="58" height="58" rx="7" fill="#7d776b"/><rect x="3" y="3" width="58" height="58" rx="7" fill="url(#st)"/><rect x="9" y="9" width="46" height="46" rx="5" fill="#3c3933" stroke="${c}" stroke-width="2.5"/>`;glow=`<rect x="9" y="9" width="46" height="46" rx="5" fill="${c}" opacity=".18"/>`;}
  else{base=`<rect x="3" y="3" width="58" height="58" rx="4" fill="#2a3038"/><path d="M3 15V7a4 4 0 0 1 4-4h8M49 3h8a4 4 0 0 1 4 4v8M61 49v8a4 4 0 0 1-4 4h-8M15 61H7a4 4 0 0 1-4-4v-8" stroke="${c}" stroke-width="3" fill="none"/><rect x="11" y="11" width="42" height="42" rx="3" fill="#12161c" stroke="#4b5462"/>`;glow=`<rect x="11" y="11" width="42" height="42" rx="3" fill="${c}" opacity=".16"/>`;}
  const sp=sup?'<rect x="1.5" y="1.5" width="61" height="61" rx="8" fill="none" stroke="#ffd75a" stroke-width="3"/><path d="M1 1h9L1 10zM63 1h-9l9 9zM1 63h9l-9-9zM63 63h-9l9-9z" fill="#ffd75a"/>':'';
  return `${base}${glow}<g transform="translate(17 17) scale(1.25)">${bfIcoSvg(k,c)}</g>${sp}`;},
 bald(k,c,sup,e2){const base=!e2?`<rect x="4" y="4" width="56" height="56" rx="9" fill="${c}"/><rect x="4" y="4" width="56" height="56" rx="9" fill="url(#bev)"/>`
   :`<rect x="4" y="4" width="56" height="56" rx="3" fill="#161b22"/><rect x="7" y="7" width="50" height="50" rx="2" fill="${c}" opacity=".85"/><path d="M7 14h50M7 50h50" stroke="#000" stroke-opacity=".35" stroke-width="3" stroke-dasharray="4 4"/><rect x="7" y="7" width="50" height="50" rx="2" fill="url(#bev)"/>`;
  const sp=sup?'<rect x="2" y="2" width="60" height="60" rx="11" fill="none" stroke="#ffd75a" stroke-width="3.5"/><path d="M50 6l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" fill="#fff"/>':'';
  return `${base}<g transform="translate(17 17) scale(1.25)">${bfIcoSvg(k,'#fff',2.3)}</g>${sp}`;}};
COSM.tile=[{id:'sello',n:'Sello',def:1},{id:'losa',n:'Losa rúnica',ach:'sacred'},{id:'bald',n:'Baldosa de color',ach:'rainbow'}];
Object.assign(CSKIND,{tile:['✨','Casillas especiales','Casillas especiales']});Object.assign(NUKL,{tile:'Casillas especiales'});
const tileSkin=()=>cosSel('tile','sello');
const bfEra2=()=>((typeof S!=='undefined'&&S&&S.era)||(typeof ERA!=='undefined'?ERA:1))===2;
function bfTileSvg(k,st,e2,sz){const B=BF[k];if(!B)return '';const b=B.base||k,fn=BFST[st||tileSkin()]||BFST.sello;
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${sz||64}" height="${sz||64}">${BFDEFS}${fn(b,B.col,!!B.sup,e2==null?bfEra2():e2)}</svg>`;}
// imágenes para el lienzo del mapa (se preparan una vez por estilo, era y casilla)
const BFIMG={};
function bfImg(k,st,e2){const key=st+'|'+k+'|'+(e2?2:1);let im=BFIMG[key];if(!im){im=new Image();im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(bfTileSvg(k,st,e2,128));BFIMG[key]=im;}return im;}
function bfPreload(){const st=tileSkin();for(const k in BF)for(const e of[false,true])bfImg(k,st,e);}
try{bfPreload();}catch(e){}
{const _m=mark;mark=function(c,k,x,y,cs){try{const im=bfImg(k,tileSkin(),bfEra2());if(im.complete&&im.naturalWidth){c.drawImage(im,x,y,cs,cs);return;}}catch(e){}return _m.apply(this,arguments);};}
// el icono de la casilla en el compendio y en los bocadillos
const bfIcon=(k,sz)=>`<span class="bbf2">${bfTileSvg(k,null,null,sz||44)}</span>`;
// ---- desbloqueo de los estilos: dos logros nuevos sobre casillas especiales ----
Object.assign(ACH,{sacred:{c:'mp',n:'Suelo sagrado',d:'Gana con al menos 6 torres construidas sobre casillas especiales.'},
 rainbow:{c:'mp',n:'Arcoíris',d:'Gana con torres sobre 5 tipos distintos de casillas especiales a la vez.'}});
function bfOnTowers(){const r=[];if(!S||!S.list||!S.buff)return r;for(const t of S.list){if(t.hero||t.summ||!t.cells)continue;let k=null;for(const[x,y]of t.cells){const b=S.buff[y]&&S.buff[y][x];if(b){k=b;break;}}if(k)r.push(k);}return r;}
{const _w=achWin;achWin=function(){const r=_w.apply(this,arguments);try{if(!S.tut){const L=bfOnTowers();if(L.length>=6)achieve('sacred');if(new Set(L.map(k=>BF[k].base||k)).size>=5)achieve('rainbow');}}catch(e){}return r;};}
{const _s=achState;achState=function(id){if(id==='sacred'){const n=bfOnTowers().length;return ['nt','Se comprueba al ganar: ahora '+n+' de 6'];}if(id==='rainbow'){const n=new Set(bfOnTowers().map(k=>BF[k].base||k)).size;return ['nt','Se comprueba al ganar: ahora '+n+' de 5 tipos'];}return _s.apply(this,arguments);};}
// ---- Personalización: fila «Casillas especiales» ----
{const _h=cosmHTML2;cosmHTML2=function(){const lk=c=>'🔒 '+achReq(c.ach).replace(/<[^>]+>/g,'');
 const row=COSM.tile.map(c=>{const o=cosOwn(c),on=tileSkin()===c.id;return `<button class="csw${on?' on':''}${o?'':' lk'}" ${o?`data-a="csex" data-k="tile" data-v="${c.id}"`:(c.ach&&ACH[c.ach]?`data-a="cachgo" data-v="${c.ach}"`:'disabled')} title="${o?c.n:lk(c)}"><span class="cstile">${o?bfTileSvg('pow',c.id,null,40):'<i>?</i>'}</span><span>${o?c.n:'🔒 ???'}</span></button>`;}).join('');
 return _h()+`<div class="orow"><div>Casillas especiales</div><small>Cómo se dibujan las casillas especiales en el mapa.</small><div class="cswr">${row}</div></div>`;};}
// al cambiar de estilo, preparar sus imágenes
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-a="csex"][data-k="tile"]');if(b)setTimeout(()=>{try{bfPreload();}catch(e){}},0);});
