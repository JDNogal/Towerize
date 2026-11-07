// '#' = terreno (construible), '.' = camino enemigo, 'C' = núcleo. Las entradas van centradas en cada borde.
const PIECES=[
{n:'Recta',p:['###.###','###.###','###.###','###.###','###.###','###.###','###.###']},
{n:'Esquina',p:['###.###','###.###','###.###','###....','#######','#######','#######']},
{n:'Bifurcación',p:['#######','#######','#######','.......','###.###','###.###','###.###']},
{n:'Cruce',p:['###.###','###.###','###.###','.......','###.###','###.###','###.###']},
{n:'Arco',p:['#######','##...##','##.#.##','...#...','#######','#######','#######']},
{n:'Valle',p:['#######','#######','#######','...#...','##.#.##','##...##','#######']},
{n:'Serpiente',p:['###.###','#...###','#.#####','#.....#','#####.#','###...#','###.###']},
{n:'Anillo',p:['###.###','#.....#','#.###.#','#.###.#','#.###.#','#.....#','###.###']},
{n:'Abanico',p:['###.###','#.....#','#.#.#.#','#.#.#.#','#.#.#.#','#.....#','###.###']}];
// obstáculos decorativos: T árbol, R roca, H casa. No son camino ni se puede construir en ellos
const OBS={'#':'Hierba',T:'Árbol',R:'Roca',H:'Casa',W:'Pozo',F:'Trigo',M:'Molino',A:'Estanque',G:'Huerto',n:'Pino nevado',j:'Helechos',k:'Espantapájaros',l:'Farol',g:'Chatarra',e:'Tienda',f:'Hoguera',u:'Ruinas',z:'Gemas',b:'Barriles'},cellOf=ch=>ch==='S'?1:OBS[ch]?3:2;
// Decoración de la Era Fantástica: pequeñas estampas con sentido (bosques, granjas con molino, aldeas con pozo, canteras, estanques) sobre la hierba libre
const STAMPS=[{w:4,f:'forest'},{w:2,f:'farm'},{w:2,f:'village'},{w:1,f:'quarry'},{w:1,f:'pond'}];
function decorate(o){const g=o.p.map(r=>[...r]),free=(x,y)=>x>=0&&y>=0&&x<P&&y<P&&g[y][x]==='#',nb=(x,y)=>D.map(([a,b])=>[x+a,y+b]).filter(([a,b])=>free(a,b));
 const cells=[];g.forEach((r,y)=>r.forEach((ch,x)=>{if(ch==='#')cells.push([x,y]);}));const goal=Math.round(cells.length*DECF);let n=0,tries=0;
 const grow=(s,k,ch)=>{const q=[s],got=[];while(q.length&&got.length<k){const[x,y]=q.splice(Math.floor(Math.random()*q.length),1)[0];if(!free(x,y))continue;g[y][x]=ch;got.push([x,y]);q.push(...nb(x,y));}return got;};
 while(n<goal&&tries++<40){const s=cells[Math.floor(Math.random()*cells.length)];if(!free(s[0],s[1]))continue;const SL=STAMPS.concat(DSTAMPS.filter(t=>decOn(t.lot)).map(t=>({w:t.w,f:'d:'+t.lot,t})));let W=0;for(const t of SL)W+=t.w;let r=Math.random()*W,f='forest',dt=null;for(const t of SL){r-=t.w;if(r<=0){f=t.f;dt=t.t;break;}}
  if(dt){const c=grow(s,dt.a+Math.floor(Math.random()*(dt.b-dt.a+1)),dt.ch);n+=c.length;if(dt.x){const m=c.flatMap(([x,y])=>nb(x,y))[0];if(m){g[m[1]][m[0]]=dt.x;n++;}}continue;}
  if(f==='forest')n+=grow(s,3+Math.floor(Math.random()*4),'T').length;
  else if(f==='farm'){const c=grow(s,2+Math.floor(Math.random()*2),'F');n+=c.length;const m=c.flatMap(([x,y])=>nb(x,y))[0];if(m){g[m[1]][m[0]]='M';n++;}}
  else if(f==='village'){g[s[1]][s[0]]='H';n++;const w=nb(s[0],s[1]);if(w.length){const[a,b]=w[Math.floor(Math.random()*w.length)];g[b][a]='W';n++;const h=nb(a,b);if(h.length&&Math.random()<.5){g[h[0][1]][h[0][0]]='G';n++;}}}
  else if(f==='quarry')n+=grow(s,2+Math.floor(Math.random()*2),'R').length;
  else n+=grow(s,1+Math.floor(Math.random()*2),'A').length;}
 o.p=g.map(r=>r.join(''));}
function drawRim(g,k){const BCS=K*CS,x0=Math.floor(CAM.x/BCS)-1,y0=Math.floor(CAM.y/BCS)-1,x1=Math.ceil((CAM.x+VIEW/k)/BCS)+1,y1=Math.ceil((CAM.y+VH/k)/BCS)+1;
 const ext=COSM.dec.filter(d=>decOn(d.id)).map(d=>d.ch),pool=['T','T','T','R','T','R'].concat(ext);
 for(let gy=Math.max(y0,-P);gy<Math.min(y1,NC+P);gy++)for(let gx=Math.max(x0,-P);gx<Math.min(x1,NC+P);gx++){if(gx>=0&&gy>=0&&gx<NC&&gy<NC)continue;
  const X=gx*BCS,Y=gy*BCS,h=((gx*374761393+gy*668265263)^(gx*gy*2246822519))>>>0;g.fillStyle='#2c3a2f';g.fillRect(X,Y,BCS,BCS);
  if(h%100<38)drawObs(g,pool[(h>>>8)%pool.length],X,Y,BCS);else drawObs(g,'#',X,Y,BCS);
  const d=Math.max(gx<0?-gx:gx>=NC?gx-NC+1:0,gy<0?-gy:gy>=NC?gy-NC+1:0)/P;g.fillStyle=`rgba(8,10,14,${(.35+.5*d).toFixed(2)})`;g.fillRect(X,Y,BCS,BCS);}}
function drawObs(c,ch,x,y,s){if('njklgefuzb'.includes(ch))return drawDeco2(c,ch,x,y,s);
 if(ch==='#'){const h=((x*73+y*151)|0)%7;if(h===0){c.fillStyle='#d9c26a';c.beginPath();c.arc(x+s*.3,y+s*.35,s*.05,0,7);c.fill();}else if(h===3){c.fillStyle='#c98ac9';c.beginPath();c.arc(x+s*.68,y+s*.62,s*.05,0,7);c.fill();}else if(h===5){c.strokeStyle='#3e5a3a';c.lineWidth=Math.max(1,s*.04);c.beginPath();c.moveTo(x+s*.45,y+s*.7);c.lineTo(x+s*.42,y+s*.55);c.moveTo(x+s*.5,y+s*.7);c.lineTo(x+s*.55,y+s*.56);c.stroke();}return;}
 if(ch==='T'){c.fillStyle='#5a3c22';c.fillRect(x+s*.44,y+s*.55,s*.12,s*.3);c.fillStyle='#2f6b3a';c.beginPath();c.arc(x+s*.5,y+s*.42,s*.3,0,7);c.fill();c.fillStyle='#3e8a4a';c.beginPath();c.arc(x+s*.42,y+s*.36,s*.15,0,7);c.fill();}
 else if(ch==='R'){c.fillStyle='#6d6f78';c.beginPath();c.ellipse(x+s*.5,y+s*.58,s*.32,s*.22,0,0,7);c.fill();c.fillStyle='#8a8d97';c.beginPath();c.ellipse(x+s*.44,y+s*.52,s*.14,s*.09,0,0,7);c.fill();}
 else if(ch==='H'){c.fillStyle='#b08a5a';c.fillRect(x+s*.22,y+s*.45,s*.56,s*.38);c.fillStyle='#a8453a';c.beginPath();c.moveTo(x+s*.14,y+s*.47);c.lineTo(x+s*.5,y+s*.18);c.lineTo(x+s*.86,y+s*.47);c.closePath();c.fill();c.fillStyle='#4a3020';c.fillRect(x+s*.44,y+s*.62,s*.13,s*.21);}
 else if(ch==='W'){c.fillStyle='#8a8d97';c.beginPath();c.arc(x+s*.5,y+s*.55,s*.26,0,7);c.fill();c.fillStyle='#2a3a52';c.beginPath();c.arc(x+s*.5,y+s*.55,s*.15,0,7);c.fill();c.strokeStyle='#5a3c22';c.lineWidth=Math.max(1,s*.06);c.beginPath();c.moveTo(x+s*.25,y+s*.3);c.lineTo(x+s*.75,y+s*.3);c.stroke();}
 else if(ch==='F'){c.fillStyle='#8a7a3a';c.fillRect(x+s*.1,y+s*.1,s*.8,s*.8);c.strokeStyle='#d9bf5a';c.lineWidth=Math.max(1,s*.07);for(let i=0;i<4;i++){c.beginPath();c.moveTo(x+s*(.2+.2*i),y+s*.18);c.lineTo(x+s*(.2+.2*i),y+s*.82);c.stroke();}}
 else if(ch==='M'){c.fillStyle='#c9b48a';c.fillRect(x+s*.36,y+s*.4,s*.28,s*.45);c.fillStyle='#8a4a3a';c.beginPath();c.moveTo(x+s*.32,y+s*.42);c.lineTo(x+s*.5,y+s*.26);c.lineTo(x+s*.68,y+s*.42);c.closePath();c.fill();c.strokeStyle='#e8e2d0';c.lineWidth=Math.max(1,s*.06);c.beginPath();c.moveTo(x+s*.2,y+s*.12);c.lineTo(x+s*.8,y+s*.6);c.moveTo(x+s*.8,y+s*.12);c.lineTo(x+s*.2,y+s*.6);c.stroke();}
 else if(ch==='A'){c.fillStyle='#3a6a9a';c.beginPath();c.ellipse(x+s*.5,y+s*.55,s*.4,s*.3,0,0,7);c.fill();c.fillStyle='#7ab0d8';c.beginPath();c.ellipse(x+s*.42,y+s*.48,s*.12,s*.05,0,0,7);c.fill();c.strokeStyle='#4a7a3a';c.lineWidth=Math.max(1,s*.05);c.beginPath();c.moveTo(x+s*.82,y+s*.62);c.lineTo(x+s*.85,y+s*.3);c.moveTo(x+s*.88,y+s*.62);c.lineTo(x+s*.93,y+s*.38);c.stroke();}
 else if(ch==='G'){c.fillStyle='#5a4028';c.fillRect(x+s*.15,y+s*.15,s*.7,s*.7);c.fillStyle='#5aa04a';for(let i=0;i<3;i++)for(let j=0;j<3;j++){c.beginPath();c.arc(x+s*(.3+.2*i),y+s*(.3+.2*j),s*.06,0,7);c.fill();}}}
// solar: plataforma de piedra donde se puede construir
function drawSolar(c,x,y,s){c.fillStyle='#4a4f5e';c.fillRect(x+s*.08,y+s*.08,s*.84,s*.84);c.strokeStyle='#c8b27a';c.lineWidth=Math.max(1,s*.06);c.strokeRect(x+s*.12,y+s*.12,s*.76,s*.76);}
const BASE=['#######','#######','#####S#','###C...','#####S#','#######','#######'];
// solares de cada pieza (columna, fila): dos variantes colocadas a mano en buenas posiciones
const SOLARES={'Recta': [[[4, 2], [2, 3], [4, 4]], [[2, 1], [2, 3], [2, 5]]], 'Esquina': [[[4, 2], [4, 4], [2, 2]], [[5, 1], [4, 2], [2, 4]]], 'Bifurcación': [[[4, 4], [2, 4], [4, 2], [2, 2]], [[1, 2], [5, 2], [1, 5], [5, 5]]], 'Cruce': [[[4, 4], [4, 2], [2, 4], [2, 2]], [[4, 0], [0, 2], [6, 4], [2, 6]]], 'Arco': [[[3, 2], [5, 2], [3, 4], [1, 2]], [[3, 3], [5, 1], [1, 1], [3, 0]]], 'Valle': [[[3, 4], [5, 5], [3, 2], [1, 5]], [[3, 3], [5, 4], [1, 4], [3, 6]]], 'Serpiente': [[[4, 4], [2, 2], [4, 2], [2, 4]], [[4, 0], [2, 2], [4, 4], [2, 6]]], 'Anillo': [[[0, 0], [6, 0], [0, 6], [6, 6]], [[4, 4], [4, 2], [2, 4], [2, 2]]], 'Abanico': [[[4, 4], [4, 2], [2, 4], [2, 2]], [[0, 3], [2, 3], [4, 3], [6, 3]]]};
// cuántos solares trae cada pieza en partida (de su variante): más salidas = enemigos por más direcciones = más solares
const SOLN={'Recta':1,'Esquina':1,'Arco':2,'Valle':2,'Serpiente':2,'Anillo':2,'Abanico':2,'Bifurcación':3,'Cruce':4};
function solarize(o,v,all){const L=SOLARES[o.n];if(!L)return;const g=o.p.map(r=>[...r]);let pts=[...L[v===undefined?Math.floor(Math.random()*L.length):v]];if(!all&&SOLN[o.n])pts=shuf(pts).slice(0,SOLN[o.n]);for(const[x,y]of pts)if(g[y][x]==='#')g[y][x]='S';o.p=g.map(r=>r.join(''));}
