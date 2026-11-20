// ==================== v354 · ALMAS DEL SEGADOR (Mesa «almasBar2», aprobado por Nogal 16-nov) ====================
// Espectro = B3 (bola y llama de una pieza, con aro y ojos con la luz del Caballero) y Caballero Espectral = jinete de perfil (C1), los dos dentro de su círculo y quietos.
// Barra «Almas» en la ficha del Orbe con «Caballero Espectral»: cada espectro alzado enciende un hueco (la llama entra con fundido y luego ondea);
// con las 10, vuelan al centro, destello y aparece el Caballero; los huecos no vuelven hasta que él termina. Debajo, la Cosecha si la tiene.
const ALMA=(()=>{const $=id=>document.getElementById(id);
const OUT='#1f2a48';
function glow(c,x,y,r,col){const g=c.createRadialGradient(x,y,1,x,y,r);g.addColorStop(0,col);g.addColorStop(1,'rgba(120,150,230,0)');c.fillStyle=g;c.beginPath();c.arc(x,y,r,0,7);c.fill();}
function armor(c,y0,y1){const g=c.createLinearGradient(0,y0,0,y1);g.addColorStop(0,'#eef3ff');g.addColorStop(1,'#9fb2de');return g;}
function wisps(c,x0,x1,y,t,col){c.fillStyle=col;for(let i=0;i<7;i++){const x=x0+(x1-x0)*(i/6),w=Math.sin(t*3+i*1.7);c.beginPath();c.ellipse(x+w*3,y+4+Math.abs(w)*5,7,5+Math.abs(w)*3,0,0,7);c.fill();}}
// C1 · jinete de perfil (mira a la derecha). Origen: suelo, centro.
function mist(c,x0,x1,y,t,a){for(let i=0;i<9;i++){const x=x0+(x1-x0)*(i/8),w=Math.sin(t*2.5+i*1.9),r=9+Math.abs(w)*4;const g=c.createRadialGradient(x+w*3,y+Math.abs(w)*4,0,x+w*3,y+Math.abs(w)*4,r);g.addColorStop(0,`rgba(200,215,255,${a})`);g.addColorStop(1,'rgba(200,215,255,0)');c.fillStyle=g;c.beginPath();c.arc(x+w*3,y+Math.abs(w)*4,r,0,7);c.fill();}}
function k1(c,t,lw=1){const bob=Math.abs(Math.sin(t*4))*-3;c.save();c.translate(0,bob);c.lineJoin='round';c.lineCap='round';c.lineWidth=2.2*lw;c.strokeStyle=OUT;
 glow(c,0,-50,85,'rgba(170,195,255,.45)');const fl=Math.sin(t*6);
 // lomo: grupa redonda detrás, pecho redondo delante, sin cabeza ni patas; abajo se deshace en niebla
 const lg=c.createLinearGradient(0,-48,0,-10);lg.addColorStop(0,'rgba(205,218,246,1)');lg.addColorStop(.65,'rgba(165,185,232,.85)');lg.addColorStop(1,'rgba(150,175,235,0)');
 const lomo=()=>{c.beginPath();c.moveTo(-54,-12);c.bezierCurveTo(-60,-30,-52,-46,-36,-46);c.bezierCurveTo(-20,-46,-12,-41,4,-41);c.bezierCurveTo(22,-41,30,-50,42,-46);c.bezierCurveTo(56,-40,54,-22,48,-12);};
 lomo();c.closePath();c.fillStyle=lg;c.fill();
 c.beginPath();c.moveTo(-55,-18);c.bezierCurveTo(-60,-30,-52,-46,-36,-46);c.bezierCurveTo(-20,-46,-12,-41,4,-41);c.bezierCurveTo(22,-41,30,-50,42,-46);c.bezierCurveTo(56,-40,54,-24,50,-18);c.stroke();
 // cola de niebla
 c.strokeStyle='rgba(200,215,255,.7)';c.lineWidth=5*lw;c.beginPath();c.moveTo(-52,-38);c.quadraticCurveTo(-66,-34+fl*3,-70,-22+fl*4);c.stroke();c.strokeStyle=OUT;c.lineWidth=2.2*lw;
 // gualdrapa con picos
 c.fillStyle='#3f4f88';c.beginPath();c.moveTo(-30,-45);c.bezierCurveTo(-18,-44,-10,-40,4,-40);c.bezierCurveTo(16,-40,22,-43,28,-45);c.lineTo(30,-26);
 for(let i=0;i<6;i++){const x=30-i*10;c.lineTo(x-5,-19+((i%2)?2:0)+Math.sin(t*5+i)*1.2);c.lineTo(x-10,-26);}c.closePath();c.fill();c.stroke();
 c.strokeStyle='#d8c27a';c.lineWidth=1.6*lw;c.beginPath();c.moveTo(-29,-42);c.bezierCurveTo(-18,-41,-10,-37,4,-37);c.bezierCurveTo(16,-37,22,-40,28.5,-42);c.stroke();
 c.fillStyle='#d8c27a';c.beginPath();c.arc(0,-31,3,0,7);c.fill();c.strokeStyle=OUT;c.lineWidth=2.2*lw;
 mist(c,-52,48,-14,t,.55);
 // jinete
 c.save();c.translate(0,-40);c.scale(.82,.82);
 // capa
 c.fillStyle='#4d5f9a';c.beginPath();c.moveTo(-4,-48);c.quadraticCurveTo(-26,-40+fl*2,-44,-26+fl*4);c.lineTo(-38,-22+fl*3);c.lineTo(-46,-14+fl*5);c.lineTo(-32,-14+fl*3);c.lineTo(-34,-6+fl*3);c.quadraticCurveTo(-18,-14,-6,-22);c.closePath();c.fill();c.stroke();
 // pierna
 c.fillStyle=armor(c,-20,22);c.beginPath();c.moveTo(-6,-14);c.lineTo(12,-12);c.lineTo(14,-4);c.lineTo(11,18);c.lineTo(19,22);c.lineTo(18,26);c.lineTo(4,25);c.lineTo(4,0);c.lineTo(-8,-4);c.closePath();c.fill();c.stroke();
 // torso
 c.fillStyle=armor(c,-52,-8);c.beginPath();c.moveTo(-10,-10);c.quadraticCurveTo(-14,-32,-8,-48);c.lineTo(8,-50);c.quadraticCurveTo(16,-34,12,-12);c.closePath();c.fill();c.stroke();
 c.beginPath();c.moveTo(-10,-24);c.quadraticCurveTo(2,-20,13,-24);c.stroke();
 // penacho
 const pg=c.createLinearGradient(-40,0,0,0);pg.addColorStop(0,'rgba(127,176,255,0)');pg.addColorStop(1,'#7fb0ff');c.fillStyle=pg;
 c.beginPath();c.moveTo(0,-76);c.bezierCurveTo(-14,-82,-26,-76+fl*2,-42,-70+fl*4);c.bezierCurveTo(-28,-68+fl*2,-16,-70,-4,-68);c.closePath();c.fill();
 // yelmo
 c.fillStyle=armor(c,-78,-48);c.beginPath();c.moveTo(-8,-50);c.lineTo(-9,-66);c.quadraticCurveTo(0,-78,10,-66);c.lineTo(13,-54);c.lineTo(8,-48);c.closePath();c.fill();c.stroke();
 c.fillStyle='#bfefff';c.shadowColor='#8fd8ff';c.shadowBlur=8;c.fillRect(2,-61,10,2.6);c.shadowBlur=0;
 // lanza en ristre bajo el brazo
 const L0=[-38,-20],L1=[86,-44];c.strokeStyle=OUT;c.lineWidth=5.5*lw;c.beginPath();c.moveTo(...L0);c.lineTo(...L1);c.stroke();c.strokeStyle='#cbd8f4';c.lineWidth=3.2*lw;c.beginPath();c.moveTo(...L0);c.lineTo(...L1);c.stroke();
 c.fillStyle='#eef3ff';c.strokeStyle=OUT;c.lineWidth=2*lw;c.beginPath();c.moveTo(96,-46);c.lineTo(84,-48.5);c.lineTo(85,-41);c.closePath();c.fill();c.stroke();
 // arandela (protección cónica de la mano)
 c.fillStyle='#9fb2de';c.beginPath();c.moveTo(18,-33);c.lineTo(32,-40);c.lineTo(34,-31);c.closePath();c.fill();c.stroke();
 // banderola
 c.fillStyle='#8fb6ff';c.beginPath();c.moveTo(80,-43);c.lineTo(66,-40);c.quadraticCurveTo(58,-34+fl*3,48,-34+fl*4);c.lineTo(56,-31+fl*3);c.lineTo(48,-27+fl*4);c.quadraticCurveTo(62,-30,80,-37);c.closePath();c.fill();c.stroke();
 // brazo
 c.fillStyle=armor(c,-46,-24);c.beginPath();c.moveTo(-6,-44);c.lineTo(6,-30);c.lineTo(18,-32);c.lineTo(19,-26);c.lineTo(3,-24);c.lineTo(-11,-38);c.closePath();c.fill();c.stroke();
 c.restore();
 c.restore();}
// C2 · armadura vacía, de frente
function k2(c,t,lw=1){c.save();c.lineJoin='round';c.lineWidth=2.2*lw;c.strokeStyle=OUT;const f=(i)=>Math.sin(t*2.2+i)*2.2;
 glow(c,0,-60,85,'rgba(150,185,255,.5)');
 // capa a jirones
 c.fillStyle='#3d4c84';c.beginPath();c.moveTo(-24,-84);c.lineTo(24,-84);c.lineTo(30,-40);for(let i=0;i<7;i++){const x=30-i*10;c.lineTo(x-5,-8-(i%2?6:0)+Math.sin(t*4+i)*3);c.lineTo(x-10,-24+Math.sin(t*3+i)*2);}c.closePath();c.fill();c.stroke();
 // luz interior
 glow(c,0,-62,30,'rgba(140,220,255,.9)');
 // faldar
 c.fillStyle=armor(c,-50,-30);c.beginPath();c.moveTo(-18,-50+f(3));c.lineTo(18,-50+f(3));c.lineTo(22,-32+f(3));c.lineTo(-22,-32+f(3));c.closePath();c.fill();c.stroke();c.beginPath();c.moveTo(-20,-41+f(3));c.lineTo(20,-41+f(3));c.stroke();
 // peto
 c.fillStyle=armor(c,-82,-54);c.beginPath();c.moveTo(-18,-82+f(1));c.lineTo(18,-82+f(1));c.quadraticCurveTo(20,-64+f(1),12,-56+f(1));c.lineTo(-12,-56+f(1));c.quadraticCurveTo(-20,-64+f(1),-18,-82+f(1));c.closePath();c.fill();c.stroke();
 c.beginPath();c.moveTo(0,-80+f(1));c.lineTo(0,-58+f(1));c.stroke();
 // hombreras
 for(const s of[-1,1]){c.fillStyle=armor(c,-92,-74);c.beginPath();c.ellipse(s*26,-82+f(2+s),11,8,s*.3,0,7);c.fill();c.stroke();c.beginPath();c.ellipse(s*27,-76+f(2+s),9,4,s*.3,0,Math.PI);c.stroke();}
 // guanteletes sobre el pomo
 const hy=-48+f(5);
 // espadón clavado
 c.fillStyle='#eaf0ff';c.beginPath();c.moveTo(-4,hy+6);c.lineTo(4,hy+6);c.lineTo(3,-2);c.lineTo(0,4);c.lineTo(-3,-2);c.closePath();c.fill();c.stroke();
 c.fillStyle='#d8c27a';c.fillRect(-14,hy+3,28,4);c.strokeRect(-14,hy+3,28,4);c.fillStyle='#5a4a7a';c.fillRect(-2.5,hy-12,5,15);c.strokeRect(-2.5,hy-12,5,15);c.fillStyle='#d8c27a';c.beginPath();c.arc(0,hy-14,3.5,0,7);c.fill();c.stroke();
 c.fillStyle=armor(c,hy-14,hy);for(const s of[-1,1]){c.beginPath();c.ellipse(s*5,hy-6,6,5,0,0,7);c.fill();c.stroke();}
 // yelmo de cubo con visera en T
 const yy=-104+f(0);c.fillStyle=armor(c,yy-12,yy+14);c.beginPath();c.moveTo(-12,yy+12);c.lineTo(-13,yy-6);c.quadraticCurveTo(0,yy-16,13,yy-6);c.lineTo(12,yy+12);c.closePath();c.fill();c.stroke();
 c.fillStyle='#bfefff';c.shadowColor='#7fd0ff';c.shadowBlur=10;c.fillRect(-9,yy-1,18,3);c.fillRect(-1.5,yy-1,3,10);c.shadowBlur=0;
 c.restore();}
// C3 · caballero de las almas
function k3(c,t,lw=1){c.save();c.lineJoin='round';c.lineWidth=2.2*lw;c.strokeStyle='#0d1226';const b=Math.sin(t*1.8)*2;c.translate(0,b);
 glow(c,0,-60,85,'rgba(150,130,230,.45)');
 // alabarda-guadaña
 c.strokeStyle='#0d1226';c.lineWidth=4.5*lw;c.beginPath();c.moveTo(32,-2);c.lineTo(30,-118);c.stroke();c.strokeStyle='#6b6f8f';c.lineWidth=2.5*lw;c.beginPath();c.moveTo(32,-2);c.lineTo(30,-118);c.stroke();
 c.fillStyle='#dfe8ff';c.strokeStyle='#0d1226';c.lineWidth=2*lw;c.beginPath();c.moveTo(30,-112);c.quadraticCurveTo(4,-126,-10,-104);c.quadraticCurveTo(8,-114,30,-104);c.closePath();c.fill();c.stroke();
 c.beginPath();c.moveTo(30,-118);c.lineTo(34,-128);c.lineTo(32,-116);c.fill();c.stroke();
 // manto
 const mg=c.createLinearGradient(0,-100,0,0);mg.addColorStop(0,'#2a2f55');mg.addColorStop(1,'rgba(30,30,70,.2)');c.fillStyle=mg;c.lineWidth=2.2*lw;
 c.beginPath();c.moveTo(-14,-94);c.quadraticCurveTo(-30,-60,-34,-20);for(let i=0;i<6;i++){const x=-34+i*13;c.lineTo(x+6.5,-6+Math.sin(t*4+i)*3);c.lineTo(x+13,-18);}c.quadraticCurveTo(30,-60,14,-94);c.closePath();c.fill();c.stroke();
 // brazo a la alabarda
 c.fillStyle='#3a4070';c.beginPath();c.moveTo(12,-86);c.quadraticCurveTo(26,-74,28,-64);c.lineTo(34,-66);c.lineTo(34,-58);c.lineTo(24,-58);c.quadraticCurveTo(18,-70,8,-78);c.closePath();c.fill();c.stroke();
 // hueco del pecho con almas girando
 const cy=-62;c.fillStyle='#0a0d1c';c.beginPath();c.ellipse(0,cy,13,16,0,0,7);c.fill();glow(c,0,cy,18,'rgba(160,190,255,.7)');
 const pts=[];for(let i=0;i<4;i++){const a=t*1.6+i*Math.PI/2;pts.push({x:Math.cos(a)*9,y:Math.sin(a)*12,z:Math.sin(a)});}
 pts.sort((p,q)=>p.z-q.z).forEach((p,i)=>{c.save();c.translate(p.x,cy+p.y);c.scale(.7+p.z*.15,.7+p.z*.15);body(c,4,t,i,.95);c.restore();});c.globalAlpha=1;
 c.strokeStyle='#0d1226';c.lineWidth=2*lw;c.beginPath();c.ellipse(0,cy,13,16,0,0,7);c.stroke();
 // capucha + yelmo con cuernos
 c.fillStyle='#22264a';c.beginPath();c.moveTo(-16,-88);c.quadraticCurveTo(-20,-118,0,-124);c.quadraticCurveTo(20,-118,16,-88);c.quadraticCurveTo(0,-82,-16,-88);c.closePath();c.fill();c.stroke();
 c.fillStyle='#0a0d1c';c.beginPath();c.ellipse(0,-102,9,11,0,0,7);c.fill();
 c.fillStyle='#cfe0ff';for(const s of[-1,1]){c.beginPath();c.moveTo(s*12,-112);c.quadraticCurveTo(s*24,-118,s*22,-130);c.quadraticCurveTo(s*18,-118,s*8,-116);c.closePath();c.fill();c.stroke();}
 c.fillStyle='#c8f0ff';c.shadowColor='#9fd8ff';c.shadowBlur=8;for(const s of[-1,1]){c.beginPath();c.arc(s*3.5,-103,1.8,0,7);c.fill();}c.shadowBlur=0;
 c.restore();}

// C1 dentro del círculo de unidad: lomo con cuello que sale del círculo (no se ve que falte la cabeza), silla de montar y lanza más corta
function k1c(c,t,lw=1){const bob=0;c.save();c.translate(0,bob);c.lineJoin='round';c.lineCap='round';c.lineWidth=2.2*lw;c.strokeStyle=OUT;const fl=Math.sin(t*6);
 const lg=c.createLinearGradient(0,-70,0,-8);lg.addColorStop(0,'rgba(210,222,248,1)');lg.addColorStop(.7,'rgba(165,185,232,.9)');lg.addColorStop(1,'rgba(150,175,235,0)');
 // caballo en UNA sola pieza (cuello + lomo en el mismo trazado): sin uniones visibles entre partes
 c.fillStyle=lg;c.beginPath();
 c.moveTo(28,-45);c.bezierCurveTo(44,-52,58,-64,72,-86);c.lineTo(98,-80);c.bezierCurveTo(86,-62,72,-44,64,-26);c.quadraticCurveTo(60,-14,54,-8);
 c.lineTo(-46,-8);c.bezierCurveTo(-52,-30,-44,-46,-26,-46);c.bezierCurveTo(-12,-46,-4,-41,10,-41);c.bezierCurveTo(20,-41,26,-44,28,-45);c.closePath();c.fill();
 c.beginPath();c.moveTo(-47,-16);c.bezierCurveTo(-52,-30,-44,-46,-26,-46);c.bezierCurveTo(-12,-46,-4,-41,10,-41);c.bezierCurveTo(20,-41,26,-44,28,-45);c.bezierCurveTo(44,-52,58,-64,72,-86);c.stroke();
 c.beginPath();c.moveTo(98,-80);c.bezierCurveTo(86,-62,72,-44,64,-26);c.quadraticCurveTo(61,-18,57,-12);c.stroke();
 c.strokeStyle='rgba(150,190,255,.85)';c.lineWidth=3*lw;for(let i=0;i<5;i++){const q=i/4,x=32+q*34,y=-49-q*30,w=Math.sin(t*5-i)*3;c.beginPath();c.moveTo(x,y);c.quadraticCurveTo(x-8,y+2+w,x-14,y+7+w);c.stroke();}
 c.strokeStyle=OUT;c.lineWidth=2.2*lw;
 c.strokeStyle='rgba(200,215,255,.7)';c.lineWidth=5*lw;c.beginPath();c.moveTo(-44,-38);c.quadraticCurveTo(-58,-34+fl*3,-62,-22+fl*4);c.stroke();c.strokeStyle=OUT;c.lineWidth=2.2*lw;
 // gualdrapa (más corta) con picos
 c.fillStyle='#3f4f88';c.beginPath();c.moveTo(-30,-44);c.bezierCurveTo(-18,-43,-10,-39,4,-39);c.bezierCurveTo(14,-39,18,-41,22,-43);c.lineTo(24,-28);
 for(let i=0;i<5;i++){const x=24-i*10.8;c.lineTo(x-5.4,-21+((i%2)?2:0)+Math.sin(t*5+i)*1.2);c.lineTo(x-10.8,-28);}c.closePath();c.fill();c.stroke();
 c.strokeStyle='#d8c27a';c.lineWidth=1.6*lw;c.beginPath();c.moveTo(-29,-41);c.bezierCurveTo(-18,-40,-10,-36,4,-36);c.bezierCurveTo(14,-36,18,-38,22,-40);c.stroke();c.strokeStyle=OUT;c.lineWidth=2.2*lw;
 // silla de montar: faldón de cuero a un lado (bajo la pierna)
 c.fillStyle='#5a4a8a';c.beginPath();c.moveTo(-17,-42);c.quadraticCurveTo(0,-38,17,-43);c.lineTo(15,-27);c.quadraticCurveTo(0,-23,-15,-27);c.closePath();c.fill();c.stroke();
 c.strokeStyle='#d8c27a';c.lineWidth=1.2*lw;c.setLineDash([2.5,2.5]);c.beginPath();c.moveTo(-13,-38);c.quadraticCurveTo(0,-35,13,-39);c.lineTo(12,-30);c.quadraticCurveTo(0,-27,-12,-30);c.closePath();c.stroke();c.setLineDash([]);c.strokeStyle=OUT;c.lineWidth=2.2*lw;
 // acción del estribo
 c.strokeStyle='#3a3060';c.lineWidth=2*lw;c.beginPath();c.moveTo(6,-42);c.lineTo(12,-21);c.stroke();c.strokeStyle=OUT;
 mist(c,-56,40,-12,t,.55);
 // jinete
 c.save();c.translate(0,-40);c.scale(.82,.82);
 c.fillStyle='#4d5f9a';c.beginPath();c.moveTo(-4,-48);c.quadraticCurveTo(-26,-40+fl*2,-44,-26+fl*4);c.lineTo(-38,-22+fl*3);c.lineTo(-46,-14+fl*5);c.lineTo(-32,-14+fl*3);c.lineTo(-34,-6+fl*3);c.quadraticCurveTo(-18,-14,-6,-22);c.closePath();c.fill();c.stroke();
 c.fillStyle='#5a4a8a';c.beginPath();c.moveTo(-10,0);c.quadraticCurveTo(-24,-2,-26,-20);c.quadraticCurveTo(-19,-21,-16,-14);c.quadraticCurveTo(-13,-6,-6,-4);c.closePath();c.fill();c.stroke();
 c.fillStyle=armor(c,-20,22);c.beginPath();c.moveTo(-6,-14);c.lineTo(12,-12);c.lineTo(14,-4);c.lineTo(11,18);c.lineTo(19,22);c.lineTo(18,26);c.lineTo(4,25);c.lineTo(4,0);c.lineTo(-8,-4);c.closePath();c.fill();c.stroke();
 // estribo
 c.strokeStyle='#b8a060';c.lineWidth=1.8*lw;c.beginPath();c.moveTo(9,27);c.lineTo(19,27);c.moveTo(10,27);c.quadraticCurveTo(11,21,14,20);c.quadraticCurveTo(18,21,18,27);c.stroke();c.strokeStyle=OUT;c.lineWidth=2.2*lw;
 c.fillStyle=armor(c,-52,-8);c.beginPath();c.moveTo(-10,-10);c.quadraticCurveTo(-14,-32,-8,-48);c.lineTo(8,-50);c.quadraticCurveTo(16,-34,12,-12);c.closePath();c.fill();c.stroke();
 c.beginPath();c.moveTo(-10,-24);c.quadraticCurveTo(2,-20,13,-24);c.stroke();
 c.fillStyle='#5a4a8a';c.beginPath();c.moveTo(13,-6);c.quadraticCurveTo(18,-10,21,-20);c.quadraticCurveTo(25,-14,22,-4);c.closePath();c.fill();c.stroke();
 const pg=c.createLinearGradient(-40,0,0,0);pg.addColorStop(0,'rgba(127,176,255,0)');pg.addColorStop(1,'#7fb0ff');c.fillStyle=pg;
 c.beginPath();c.moveTo(0,-76);c.bezierCurveTo(-14,-82,-26,-76+fl*2,-42,-70+fl*4);c.bezierCurveTo(-28,-68+fl*2,-16,-70,-4,-68);c.closePath();c.fill();
 c.fillStyle=armor(c,-78,-48);c.beginPath();c.moveTo(-8,-50);c.lineTo(-9,-66);c.quadraticCurveTo(0,-78,10,-66);c.lineTo(13,-54);c.lineTo(8,-48);c.closePath();c.fill();c.stroke();
 c.fillStyle='#bfefff';c.shadowColor='#8fd8ff';c.shadowBlur=8;c.fillRect(2,-61,10,2.6);c.shadowBlur=0;
 // lanza más corta y algo más levantada: la punta y la banderola caben en el círculo
 const L0=[-30,-45],L1=[62,-14],dx=L1[0]-L0[0],dy=L1[1]-L0[1],ln=Math.hypot(dx,dy),ux=dx/ln,uy=dy/ln,px=-uy,py=ux;
 c.strokeStyle=OUT;c.lineWidth=5.5*lw;c.beginPath();c.moveTo(...L0);c.lineTo(...L1);c.stroke();c.strokeStyle='#cbd8f4';c.lineWidth=3.2*lw;c.beginPath();c.moveTo(...L0);c.lineTo(...L1);c.stroke();
 const T=[L1[0]+ux*12,L1[1]+uy*12];c.fillStyle='#eef3ff';c.strokeStyle=OUT;c.lineWidth=2*lw;c.beginPath();c.moveTo(...T);c.lineTo(L1[0]+px*4,L1[1]+py*4);c.lineTo(L1[0]-px*4,L1[1]-py*4);c.closePath();c.fill();c.stroke();
 // banderola: cuelga hacia atrás desde justo detrás de la punta
 const B=(a,b)=>[L1[0]-ux*a+px*b,L1[1]-uy*a+py*b];c.fillStyle='#8fb6ff';c.beginPath();c.moveTo(...B(2,0));c.lineTo(...B(18,0));
 const q1=B(24,-7-fl*2),q2=B(30,-10-fl*3),q3=B(23,-12-fl*3),q4=B(28,-16-fl*4);c.quadraticCurveTo(q1[0],q1[1]+6,q2[0],q2[1]+6);c.lineTo(q3[0],q3[1]+6);c.lineTo(q4[0],q4[1]+6);c.quadraticCurveTo(...B(12,-8),...B(2,-6));c.closePath();c.fill();c.stroke();
 {const H=[20,-28.3];c.fillStyle='#9fb2de';c.beginPath();c.moveTo(H[0]+px*4.5,H[1]+py*4.5);c.lineTo(H[0]+ux*10,H[1]+uy*10);c.lineTo(H[0]-px*4.5,H[1]-py*4.5);c.closePath();c.fill();c.stroke();}
 c.fillStyle=armor(c,-46,-24);c.beginPath();c.moveTo(-6,-44);c.lineTo(6,-30);c.lineTo(18,-32);c.lineTo(19,-26);c.lineTo(3,-24);c.lineTo(-11,-38);c.closePath();c.fill();c.stroke();
 c.restore();c.restore();}
// círculo de unidad como en el juego: fondo, recorte y borde claro
function inCircle(c,x,y,R,t,lw){c.save();c.translate(x,y);
 c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(0,R*.95,R*.9,R*.28,0,0,7);c.fill();
 const g=c.createRadialGradient(0,-R*.3,R*.1,0,0,R);g.addColorStop(0,'#3a4c80');g.addColorStop(1,'#151c34');c.fillStyle=g;c.beginPath();c.arc(0,0,R,0,7);c.fill();
 c.save();c.beginPath();c.arc(0,0,R,0,7);c.clip();const s=R/68;c.save();c.scale(s,s);c.translate(-6,63);k1c(c,1.0,lw);c.restore();const fg=c.createLinearGradient(0,R*.25,0,R);fg.addColorStop(0,'rgba(190,205,250,0)');fg.addColorStop(.55,'rgba(190,205,250,.55)');fg.addColorStop(1,'rgba(205,218,252,.8)');c.fillStyle=fg;c.fillRect(-R,R*.25,2*R,R);c.restore();
 c.strokeStyle='#cfe0ff';c.lineWidth=Math.max(1.5,R*.07);c.beginPath();c.arc(0,0,R,0,7);c.stroke();c.restore();}

function enemy(c,x,y,r,col,t,i){c.fillStyle='rgba(0,0,0,.25)';c.beginPath();c.ellipse(x,y+r*.8,r,r*.35,0,0,7);c.fill();c.fillStyle=col;c.strokeStyle='#1a1a1a';c.lineWidth=1.5;c.beginPath();c.arc(x,y+Math.sin(t*6+i)*1,r,0,7);c.fill();c.stroke();}
function path(m,y0,h){m.fillStyle='#c8a86a';m.fillRect(0,y0,552,h);m.fillStyle='rgba(120,90,40,.25)';for(let i=0;i<30;i++)m.fillRect((i*47)%552,y0+4+(i*13)%(h-8),6,3);m.strokeStyle='rgba(90,60,20,.4)';m.lineWidth=2;m.beginPath();m.moveTo(0,y0);m.lineTo(552,y0);m.moveTo(0,y0+h);m.lineTo(552,y0+h);m.stroke();}
// Espectro: bola de luz con llama encima (estilo fuego fatuo). Unidades: radio del círculo = 1.
const WISP={
 A:{n:'Llama',d:'Fiel a tu referencia: bola de luz con un aro oscuro y una llama de tres lenguas encima. Sin ojos.',eyes:0,ring:1,
  f:c=>{c.moveTo(-.27,.06);c.bezierCurveTo(-.33,-.18,-.26,-.30,-.22,-.44);c.bezierCurveTo(-.14,-.36,-.10,-.38,-.08,-.48);c.bezierCurveTo(-.06,-.62,.04,-.68,.03,-.84);c.bezierCurveTo(.16,-.70,.16,-.60,.12,-.52);c.bezierCurveTo(.17,-.54,.21,-.57,.24,-.64);c.bezierCurveTo(.31,-.44,.33,-.20,.27,.06);}},
 B:{n:'Llama con ojos',d:'La A con los ojos elegidos: cuencas oscuras con la luz azul del Caballero.',eyes:1,ring:1,
  f:c=>WISP.A.f(c)},
 C:{n:'Fuego fatuo',d:'Una sola llama alta y fina que se dobla un poco hacia atrás, como si avanzara. Con ojos.',eyes:1,ring:0,
  f:c=>{c.moveTo(-.27,.06);c.bezierCurveTo(-.33,-.22,-.24,-.40,-.24,-.56);c.bezierCurveTo(-.24,-.70,-.30,-.78,-.26,-.88);c.bezierCurveTo(-.08,-.76,.08,-.62,.10,-.46);c.bezierCurveTo(.13,-.34,.31,-.22,.27,.06);}},
 D:{n:'Remolino',d:'La punta de la llama se enrosca suave hacia delante (sin gancho por debajo). Con ojos y aro.',eyes:1,ring:1,
  f:c=>{c.moveTo(-.27,.06);c.bezierCurveTo(-.34,-.26,-.20,-.44,-.12,-.58);c.bezierCurveTo(-.05,-.72,.10,-.84,.22,-.80);c.bezierCurveTo(.30,-.77,.30,-.66,.22,-.65);c.bezierCurveTo(.15,-.65,.13,-.71,.17,-.73);c.bezierCurveTo(.08,-.70,.06,-.60,.12,-.50);c.bezierCurveTo(.22,-.38,.33,-.20,.27,.06);}},
 B2:{n:'Unida, sin aro',d:'La B con bola y llama de una sola pieza: el blanco del centro sube hasta la llama sin borde y todo el contorno es llama.',eyes:1,ring:0,merge:1,f:c=>WISP.A.f(c)},
 B3:{n:'Unida, con aro',d:'Igual que la unida, pero con el aro oscuro detrás, como en tu referencia.',eyes:1,ring:1,merge:1,f:c=>WISP.A.f(c)},
 E:{n:'Gota',d:'Bola y llama en una sola silueta, como una gota del revés. La más sencilla: la que mejor se lee pequeña. Con ojos.',eyes:1,ring:0,one:1,
  f:c=>{c.moveTo(.05,-.84);c.bezierCurveTo(.14,-.62,.37,-.34,.37,.18);c.arc(0,.18,.37,0,Math.PI);c.bezierCurveTo(-.37,-.24,-.12,-.50,.05,-.84);}}
};
const OY=.18,OR=.30; // centro y radio de la bola (todo el dibujo queda centrado en el círculo)
function wispDraw(c,R,k){const w=WISP[k];c.save();c.scale(R,R);
 // halo
 let g=c.createRadialGradient(0,OY,0,0,OY,.95);g.addColorStop(0,'rgba(150,240,255,.55)');g.addColorStop(.5,'rgba(110,210,240,.22)');g.addColorStop(1,'rgba(110,210,240,0)');c.fillStyle=g;c.beginPath();c.arc(0,OY,.95,0,7);c.fill();
 // aro oscuro (como la referencia)
 if(w.ring){c.strokeStyle='rgba(40,130,160,.75)';c.lineWidth=.1;c.beginPath();c.arc(0,OY,OR+.1,0,7);c.stroke();}
 if(w.merge){c.save();c.shadowColor='#7fe6ff';c.shadowBlur=R*.25;
  // una sola silueta: llama + bola, con un solo degradado desde el centro de la bola
  g=c.createRadialGradient(0,OY,0,0,OY-.12,1.0);g.addColorStop(0,'#ffffff');g.addColorStop(.28,'#f2fdff');g.addColorStop(.5,'#c4f3ff');g.addColorStop(.78,'#6fdcf6');g.addColorStop(1,'rgba(80,205,240,.8)');
  c.fillStyle=g;c.beginPath();w.f(c);c.closePath();c.moveTo(OR,OY);c.arc(0,OY,OR,0,7);c.fill('nonzero');c.restore();
  // núcleo blanco que sube por dentro de la llama (sin borde)
  c.save();g=c.createRadialGradient(0,OY-.02,0,0,OY-.02,OR*1.05);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.7,'rgba(255,255,255,.75)');g.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=g;c.beginPath();c.arc(0,OY-.02,OR*1.05,0,7);c.fill();
  c.globalAlpha=.6;c.translate(0,OY*.35);c.scale(.55,.6);c.fillStyle='#ffffff';c.beginPath();w.f(c);c.closePath();c.fill();c.restore();
 } else {
 // llama
 c.save();c.shadowColor='#7fe6ff';c.shadowBlur=R*.25;
 g=c.createLinearGradient(0,OY,0,-.86);g.addColorStop(0,'#f4fdff');g.addColorStop(.35,'#bff3ff');g.addColorStop(.8,'#5fd6f5');g.addColorStop(1,'rgba(80,205,240,.75)');
 c.fillStyle=g;c.beginPath();w.f(c);c.closePath();c.fill();c.restore();
 // lengua interior más clara
 c.save();c.globalAlpha=.55;c.translate(0,OY*.35);c.scale(.55,.6);c.fillStyle='#ffffff';c.beginPath();w.f(c);c.closePath();c.fill();c.restore();
 // bola
 if(!w.one){g=c.createRadialGradient(-.06,OY-.06,0,0,OY,OR);g.addColorStop(0,'#ffffff');g.addColorStop(.55,'#e6fbff');g.addColorStop(1,'#8fe2f7');c.fillStyle=g;c.save();c.shadowColor='#8feaff';c.shadowBlur=R*.2;c.beginPath();c.arc(0,OY,OR,0,7);c.fill();c.restore();}
 else{g=c.createRadialGradient(-.04,OY-.04,0,0,OY,.36);g.addColorStop(0,'#ffffff');g.addColorStop(.6,'rgba(235,252,255,.9)');g.addColorStop(1,'rgba(235,252,255,0)');c.fillStyle=g;c.beginPath();c.arc(0,OY,.36,0,7);c.fill();}
 }
 // ojos: cuencas oscuras con la luz azul del Caballero
 if(w.eyes){for(const ex of[-.11,.11]){c.save();c.translate(ex,OY+.01);c.fillStyle='#22345c';c.beginPath();c.ellipse(0,0,.068,.095,ex<0?.22:-.22,0,7);c.fill();
  c.shadowColor='#8fd8ff';c.shadowBlur=R*.12;c.fillStyle='#bfefff';c.beginPath();c.ellipse(0,.008,.03,.042,0,0,7);c.fill();c.restore();}}
 c.restore();}
// círculo de unidad (igual que el del Caballero)
function wispCircle(c,x,y,R,k){c.save();c.translate(x,y);
 c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(0,R*.95,R*.9,R*.28,0,0,7);c.fill();
 const g=c.createRadialGradient(0,-R*.3,R*.1,0,0,R);g.addColorStop(0,'#3a4c80');g.addColorStop(1,'#151c34');c.fillStyle=g;c.beginPath();c.arc(0,0,R,0,7);c.fill();
 c.save();c.beginPath();c.arc(0,0,R,0,7);c.clip();wispDraw(c,R,k);c.restore();
 c.strokeStyle='#cfe0ff';c.lineWidth=Math.max(1.5,R*.07);c.beginPath();c.arc(0,0,R,0,7);c.stroke();c.restore();}
// alma B3 animada (sin círculo): la llama ondea, crece y encoge; la bola y los ojos quietos
function waveCtx(c,t,ph){const W=(x,y)=>{const h=Math.max(0,OY-.05-y);// cuanto más arriba, más se mueve
  return[x+Math.sin(t*5.2+ph-y*6)*.07*h+Math.sin(t*8.3+ph*1.3-y*11)*.025*h,y*(1+Math.sin(t*6.1+ph*2.1)*.07*h)-Math.sin(t*3.7+ph)*.02*h];};
 return{moveTo:(x,y)=>c.moveTo(...W(x,y)),lineTo:(x,y)=>c.lineTo(...W(x,y)),bezierCurveTo:(a,b,d,e,x,y)=>c.bezierCurveTo(...W(a,b),...W(d,e),...W(x,y)),
  quadraticCurveTo:(a,b,x,y)=>c.quadraticCurveTo(...W(a,b),...W(x,y)),arc:(...q)=>c.arc(...q)};}
const B3W={};
function soul(c,x,y,R,a,t,ph){c.save();c.globalAlpha=a;c.translate(x,y+Math.sin(t*2.2+ph)*1.2);
 const base=WISP.B3;WISP.B3W={...base,f:cc=>base.f(waveCtx(cc,t,ph))};
 const pulse=1+Math.sin(t*4.4+ph*1.9)*.08;c.save();c.globalAlpha=a*.5*(pulse-.85);const g=c.createRadialGradient(0,OY*R,0,0,OY*R,R*1.05);g.addColorStop(0,'rgba(150,240,255,.6)');g.addColorStop(1,'rgba(150,240,255,0)');c.fillStyle=g;c.beginPath();c.arc(0,OY*R,R*1.05,0,7);c.fill();c.restore();
 wispDraw(c,R,'B3W');c.restore();}

const IMG={};function img(kind){if(IMG[kind])return IMG[kind];const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');
 if(kind==='spectre')wispCircle(g,64,64,60,'B3');else inCircle(g,64,64,60,1,2.4);IMG[kind]=c;return c;}
return {img,soul,inCircle};})();
// dibujo en el mapa: el espectro y el Caballero dejan de ser emojis
const almaImg=k=>(k==='spectre'||k==='knight')?ALMA.img(k):null;
// barra en la ficha
TMECH.unshift({k:'almas',on:t=>t.type==='orb'&&!!abRank(t,'knight'),n:'Almas',ic:'spect',v:t=>(t.raised||0)/((abRank(t,'knight')||{n:10}).n),
 l:t=>{const kn=abRank(t,'knight')||{n:10},hv=abRank(t,'harvest');const kl=almaKn(t);return (kl?'¡Caballero Espectral!':(t.raised||0)+' / '+kn.n)+(hv?' · Cosecha: '+(t.souls||0)+((t.souls||0)===1?' alma':' almas')+' (+'+Math.round(soulB(t)*100)+'%)':'');}});
{const _mb=ftMechBox;ftMechBox=function(t,M,txt){if(!M||M.k!=='almas')return _mb.apply(this,arguments);
 return `<div class="ftmech fbm fb-almas"><div class="ftmt"><b>${kw(ftMkw(M),M.n,'tw:'+t.id,'st')}</b>${txt?' · '+txt:''}</div><canvas class="albc" style="height:52px;width:100%;display:block"></canvas><div class="ftml">${M.l(t)}</div></div>`;};}
const almaKn=t=>(S.summ||[]).find(q=>q.spOwner===t&&q.beast==='knight'&&q.sd[0]&&q.sd[0].hp>0&&q.ttl>0);
const ALB={st:new WeakMap()};
function almaBar(c,t,now){const W=c.width,H=c.height,dpr=W/c.clientWidth;const g=c.getContext('2d');g.setTransform(dpr,0,0,dpr,0,0);const w=W/dpr,h=H/dpr;g.clearRect(0,0,w,h);
 let o=ALB.st.get(t);if(!o){o={last:t.raised||0,fly:[],form:-1,T:0};ALB.st.set(t,o);}const tm=now/1000;
 const kn=abRank(t,'knight')||{n:10},N=kn.n,n=t.raised||0,K=almaKn(t);
 if(n>o.last)for(let i=o.last;i<n;i++)o.fly.push({k:i,t0:tm});if(n<o.last&&K&&o.form<0)o.form=tm;o.last=n;o.fly=o.fly.filter(f=>tm-f.t0<.5);
 {const gr=g.createLinearGradient(0,2,0,h-2);gr.addColorStop(0,'#2a3866');gr.addColorStop(1,'#151c34');g.fillStyle=gr;g.beginPath();g.roundRect(1,2,w-2,h-4,10);g.fill();g.strokeStyle='#5a2e1c';g.lineWidth=1.5;g.stroke();}
 const R=Math.min(16,h*.32),gap=(w-16)/N,xs=i=>8+gap*(i+.5),y0=h*.54,E=x=>x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2;
 const formEl=o.form>=0?tm-o.form:99,FORM=.9;
 if(K||formEl<FORM){// las llamas vuelan al centro y sale el Caballero; los huecos no vuelven hasta que termina
  if(formEl<FORM){const k=E(formEl/FORM);for(let i=0;i<N;i++){const x=xs(i);ALMA.soul(g,x+(w/2-x)*k,y0-6*k,R*(1-k*.45),1,tm,i);}}
  if(formEl>=FORM*.85){const q=Math.min(1,(formEl-FORM*.85)/.5);g.save();g.globalAlpha=Math.max(0,.9-q*.9);const gl=g.createRadialGradient(w/2,y0,0,w/2,y0,20+q*70);gl.addColorStop(0,'#fff');gl.addColorStop(.5,'rgba(190,240,255,.9)');gl.addColorStop(1,'rgba(150,220,255,0)');g.fillStyle=gl;g.beginPath();g.arc(w/2,y0,20+q*70,0,7);g.fill();g.restore();
   g.save();g.globalAlpha=Math.min(1,q*1.6);const s=.85+.15*Math.min(1,q*1.4);g.translate(w/2,h/2);g.scale(s,s);ALMA.inCircle(g,0,0,h*.42,1,1.4);g.restore();}
  if(!K&&formEl>=FORM)o.form=-1;return;}
 o.form=-1;
 for(let i=0;i<N;i++){const x=xs(i);g.strokeStyle='rgba(190,215,255,.35)';g.setLineDash([3,3]);g.lineWidth=1.2;g.beginPath();g.arc(x,y0-R*.15,R*.95,0,7);g.stroke();g.setLineDash([]);
  if(i<n){const f=o.fly.find(f=>f.k===i);let a=1,yy=y0;if(f){const q=E(Math.min(1,(tm-f.t0)/.5));yy-=18*(1-q);a=q;}ALMA.soul(g,x,yy,R,a,tm,i);}}}
function almaLoop(now){const cs=document.querySelectorAll('canvas.albc');if(cs.length&&typeof FT!=='undefined'&&FT.t){for(const c of cs){const W=Math.round(c.clientWidth*(devicePixelRatio||1)),H=Math.round(c.clientHeight*(devicePixelRatio||1));if(W&&(c.width!==W||c.height!==H)){c.width=W;c.height=H;}if(W)try{almaBar(c,FT.t,now);}catch(e){}}}requestAnimationFrame(almaLoop);}
requestAnimationFrame(almaLoop);
