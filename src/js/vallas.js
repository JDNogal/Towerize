// ==================== v329 · Vallas entre piezas (Nogal, 14-nov-2026) ====================
// Las piezas solo se unen por sus salidas (el centro de cada lado: D1, A4, G4, D7). Un camino puede tocar el borde por
// cualquier otro sitio; si toca el camino de la pieza de al lado, NO se unen: entre los dos se levanta una valla
// (empalizada en la Fantástica, barrera metálica en la Distópica). Regla geométrica, sin estado:
// cutC / cutF dicen si un paso entre dos casillas (gruesas / finas) cruza el borde de dos piezas fuera de una salida.
function exitL(x,y){return (x===3&&(y===0||y===P-1))||(y===3&&(x===0||x===P-1));}
function cutC(cx,cy,nx,ny){const bx=Math.floor(cx/P),by=Math.floor(cy/P),nbx=Math.floor(nx/P),nby=Math.floor(ny/P);if(bx===nbx&&by===nby)return false;
 return bx!==nbx?((cy%P+P)%P)!==3:((cx%P+P)%P)!==3;}
function cutF(x,y,nx,ny){const cx=Math.floor(x/K),cy=Math.floor(y/K),ncx=Math.floor(nx/K),ncy=Math.floor(ny/K);return (cx!==ncx||cy!==ncy)&&cutC(cx,cy,ncx,ncy);}
// dónde hay valla: pares de casillas de camino de piezas distintas que se tocan fuera de una salida
function fences(){const out=[];if(!S||!S.cc)return out;const isP=(x,y)=>inbc(x,y)&&S.cc[y][x]===2;
 for(let y=0;y<NC;y++)for(let x=0;x<NC;x++){if(!isP(x,y))continue;for(const[a,b]of[[1,0],[0,1]]){const nx=x+a,ny=y+b;if(isP(nx,ny)&&cutC(x,y,nx,ny))out.push([x,y,nx,ny]);}}
 return out;}
// dibujo: una valla corta sobre el borde compartido, de lado a lado del camino
{const _d=e2DrawWorld;e2DrawWorld=function(lw){const r=_d.apply(this,arguments);try{const F=fences();if(!F.length)return r;const e2=(S.era||1)===2,C=K*CS;
 g.save();for(const[x,y,nx,ny]of F){const vert=nx!==x,mx=(vert?nx:x)*C,my=(vert?y:ny)*C;/* línea del borde */
  const x0=vert?mx:mx+C*.12,y0=vert?my+C*.12:my,x1=vert?mx:mx+C*.88,y1=vert?my+C*.88:my;
  if(e2){g.strokeStyle='#1b2228';g.lineWidth=lw(7);g.lineCap='round';g.beginPath();g.moveTo(x0,y0);g.lineTo(x1,y1);g.stroke();
   g.strokeStyle='#ff4fd8';g.lineWidth=lw(2.4);g.shadowColor='#ff4fd8';g.shadowBlur=lw(8);g.setLineDash([lw(6),lw(4)]);g.beginPath();g.moveTo(x0,y0);g.lineTo(x1,y1);g.stroke();g.setLineDash([]);g.shadowBlur=0;
   g.fillStyle='#9aa4ae';for(const t of[0,.5,1]){const px=x0+(x1-x0)*t,py=y0+(y1-y0)*t;g.beginPath();g.arc(px,py,lw(3.4),0,7);g.fill();}}
  else{g.lineCap='round';/* dos travesaños y estacas */const n=5;g.strokeStyle='#8a5a2c';g.lineWidth=lw(3);for(const sh of[-1,1]){const dx=vert?sh*C*.07:0,dy=vert?0:sh*C*.07;g.beginPath();g.moveTo(x0+dx,y0+dy);g.lineTo(x1+dx,y1+dy);g.stroke();}
   for(let i=0;i<n;i++){const t=i/(n-1),px=x0+(x1-x0)*t,py=y0+(y1-y0)*t,L=C*.16;g.strokeStyle='#3a2210';g.lineWidth=lw(5.5);g.beginPath();g.moveTo(px-(vert?L:0),py-(vert?0:L));g.lineTo(px+(vert?L:0),py+(vert?0:L));g.stroke();
    g.strokeStyle='#b07a42';g.lineWidth=lw(3);g.beginPath();g.moveTo(px-(vert?L:0),py-(vert?0:L));g.lineTo(px+(vert?L:0),py+(vert?0:L));g.stroke();}}}
 g.restore();}catch(e){}return r;};}
