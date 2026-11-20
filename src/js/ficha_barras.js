// ==================== v353 · BARRAS DE MECÁNICA DIBUJADAS EN LA FICHA DE TORRE (Mesa «Barras de mecánica v4», aprobadas por Nogal 16-nov) ====================
// Búnker: Cadencia arriba y debajo una ventana fija del cargador: las balas (de lado) se gastan por la izquierda, la tira se desliza
//   y una sombra a la derecha avisa de que quedan más; al disparar, la bala sale saltando y girando. «Recargando…» solo en el texto de abajo.
// Volcán: lava con el frente en diagonal (abajo va por delante), costra y vetas que avanzan, burbujas; avanza siempre al mismo ritmo y al 100 % llena entera.
// Heraldo: 20 pips marcados; chispas que vuelan a la barra con cada baja de otra torre; llena, parpadea la barra (la ficha no).
// Red: 5 puntos iguales y equidistantes (el primero, marrón, es la torre); electricidad azul con borde oscuro, como el arco del mapa.
// Sustituye a la barra simple (.ftbar) de ficha_torre.js solo para las mecánicas con clave k; la etiqueta de la derecha (.ftml) sigue igual.
const FB={st:new WeakMap(),raf:0};
const fbS=t=>{let o=FB.st.get(t);if(!o){o={fly:[],bub:[],spk:[],orbs:[],lastN:null,lastCh:null,flash:0};FB.st.set(t,o);}return o;};
const fbEase=x=>x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2;
const FBH={mag:50,volc:28,herald:24,net:30};
{const _mb=ftMechBox;ftMechBox=function(t,M,txt){if(!M||!M.k||!FBH[M.k])return _mb.apply(this,arguments);
 return `<div class="ftmech fbm fb-${M.k}"><div class="ftmt"><b>${kw(ftMkw(M),M.n,'tw:'+t.id,'st')}</b>${txt?' · '+txt:''}</div><canvas class="fbc" data-k="${M.k}" style="height:${FBH[M.k]}px"></canvas><div class="ftml">${M.l(t)}</div></div>`;};}
// ---- Búnker ----
function fbBullet(c,x,y,s,rot){c.save();c.translate(x,y);if(rot)c.rotate(rot);c.scale(s,s);c.lineWidth=1;c.strokeStyle='#2a1a10';
 c.fillStyle='#c9824a';c.beginPath();c.moveTo(-3,-3);c.quadraticCurveTo(0,-12,3,-3);c.closePath();c.fill();c.stroke();
 c.fillStyle='#e2b44a';c.beginPath();c.rect(-3,-3,6,13);c.fill();c.stroke();c.fillStyle='#b98a2a';c.beginPath();c.rect(-3.5,8,7,3);c.fill();c.stroke();
 c.strokeStyle='rgba(255,243,192,.8)';c.beginPath();c.moveTo(-1.4,-1);c.lineTo(-1.4,7);c.stroke();c.restore();}
function fbMag(c,W,H,t,o,dt){const mx=magMax(t),n=t.rld>0?0:(t.magN==null?mx:t.magN),cad=typeof bkCad==='function'?bkCad(t):0,T=twm(t.type,t.spec),tr=abRank(t,'trigger'),rmp=(T.ramp||.6)+(tr?tr.r:0);
 // Cadencia
 c.font='600 11px system-ui,sans-serif';c.textBaseline='middle';c.fillStyle='#6b5f52';c.textAlign='left';c.fillText('Cadencia',0,6);c.textAlign='right';c.fillText('+'+Math.round(cad*rmp*100)+'%',W,6);
 c.fillStyle='rgba(120,90,50,.18)';c.beginPath();c.roundRect(0,12,W,7,4);c.fill();if(cad>0){const g=c.createLinearGradient(0,0,W,0);g.addColorStop(0,'#9a8f84');g.addColorStop(1,'#5f554b');c.fillStyle=g;c.beginPath();c.roundRect(0,12,Math.max(7,W*cad),7,4);c.fill();}
 // cargador: ventana fija, la tira se desliza (se vacía por la izquierda)
 const P=8.6,y=36,fired=mx-n;if(o.lastN!=null&&n<o.lastN&&t.rld<=0){for(let k=0;k<Math.min(3,o.lastN-n);k++)o.fly.push({x:4,y,t:0,vx:-(10+Math.random()*12),r:(Math.random()<.5?-1:1)*9});}
 o.lastN=n;o.off=o.off==null?fired*P:o.off+(fired*P-o.off)*Math.min(1,dt*18);
 c.save();c.beginPath();c.rect(0,22,W,H-22);c.clip();
 for(let i=0;i<mx;i++){const x=4+i*P-o.off;if(x<-6||x>W+6)continue;if(i<fired)continue;fbBullet(c,x,y,.95,0);}
 if((mx-fired)*P>W-10){const g=c.createLinearGradient(W-40,0,W,0);g.addColorStop(0,'rgba(255,246,221,0)');g.addColorStop(.85,'rgba(255,246,221,1)');c.fillStyle=g;c.fillRect(W-40,22,40,H-22);}
 c.restore();
 for(const f of o.fly){f.t+=dt;const k=f.t/.55,yy=f.y-Math.sin(Math.min(1,k)*Math.PI*.9)*26+k*6;c.globalAlpha=Math.max(0,1-k);fbBullet(c,f.x+f.vx*k,yy,.95,f.r*k);c.globalAlpha=1;}
 o.fly=o.fly.filter(f=>f.t<.55);}
// ---- Volcán ----
function fbVolc(c,W,H,t,o,dt,tm){const heat=Math.max(0,Math.min(1,t.heat||0)),x0=2,y0=3,y1=H-3,bh=y1-y0,len=W-4,lean=Math.min(16,W*.08);
 c.save();c.beginPath();c.roundRect(1,1,W-2,H-2,6);const rg=c.createLinearGradient(0,0,0,H);rg.addColorStop(0,'#2a140c');rg.addColorStop(1,'#45251a');c.fillStyle=rg;c.fill();c.clip();
 if(heat>0){const fb=x0+heat*(len+lean+6),front=y=>Math.max(x0,fb-lean*(1-(y-y0)/bh)+Math.sin(y*.36+tm*4)*1.1-Math.pow((y-y0)/bh-.85,2)*5);
  c.beginPath();c.moveTo(x0,y1);c.lineTo(x0,y0+1);for(let x=x0;x<=front(y0+1);x+=3)c.lineTo(x,y0+1+Math.sin(x*.09-tm*3)*.8);for(let y=y0+1;y<=y1;y+=1)c.lineTo(front(y),y);c.closePath();
  const g=c.createLinearGradient(0,y0,0,y1);g.addColorStop(0,'#ffe066');g.addColorStop(.3,'#ff8a1e');g.addColorStop(.75,'#d8380e');g.addColorStop(1,'#8a1a08');c.fillStyle=g;c.fill();
  c.save();c.clip();const fl=tm*19;c.fillStyle='rgba(90,16,4,.55)';
  for(let i=0;i<10;i++){const cx=((i*31+fl)%(len+40))-20+x0,cy=y0+4+((i*19)%(bh-7)),r=2.5+(i*13)%3;c.beginPath();c.ellipse(cx,cy,r*1.8,r*.7,.15,0,7);c.fill();}
  c.strokeStyle='rgba(255,240,170,.55)';c.lineWidth=1;for(let k=0;k<3;k++){c.beginPath();for(let x=x0;x<fb-lean;x+=3)c.lineTo(x,y0+5+k*6+Math.sin(x*.07-tm*2.4+k*2)*1.5);c.stroke();}
  const fg=c.createLinearGradient(fb-lean-8,0,fb+2,0);fg.addColorStop(0,'rgba(255,255,200,0)');fg.addColorStop(1,'rgba(255,250,200,.85)');c.fillStyle=fg;c.fillRect(fb-lean-8,y0,lean+11,bh);c.restore();
  c.strokeStyle='#5a1204';c.lineWidth=1;c.beginPath();for(let y=y0+1;y<=y1;y+=1)c.lineTo(front(y),y);c.stroke();
  if(Math.random()<dt*16*heat)o.bub.push({x:x0+Math.random()*Math.max(4,fb-lean-4),y:y1-2,r:1+Math.random()*2,v:7+Math.random()*8});
  for(const b of o.bub){b.y-=b.v*dt;c.fillStyle='rgba(255,236,150,.8)';c.beginPath();c.arc(b.x,b.y,b.r,0,7);c.fill();}
  o.bub=o.bub.filter(b=>b.y>y0+2);}
 c.restore();c.strokeStyle='#1a0904';c.lineWidth=1.5;c.beginPath();c.roundRect(1,1,W-2,H-2,6);c.stroke();}
// ---- Heraldo ----
function fbHerald(c,W,H,t,o,dt,tm){const ch=Math.max(0,Math.min(HCH,t.ch||0));
 if(o.lastCh!=null){if(ch-o.lastCh>=HCHK*.9)o.orbs.push({p:0,sx:.15+Math.random()*.5});if(o.lastCh>=HCH*.95&&ch<o.lastCh*.5)o.flash=.9;}o.lastCh=ch;o.flash=Math.max(0,o.flash-dt);
 const full=ch>=HCH-.001||o.flash>0,on=full&&(Math.floor(tm/.12)%2===0),x0=1,y0=6,y1=H-2,len=W-2,w=len*ch/HCH;
 c.save();c.beginPath();c.roundRect(x0,y0,len,y1-y0,5);c.fillStyle='#e3d2ae';c.fill();c.clip();
 const g=c.createLinearGradient(0,y0,0,y1);g.addColorStop(0,on?'#ffffff':'#fff0a0');g.addColorStop(.45,on?'#fff7c0':'#ffc928');g.addColorStop(1,on?'#ffe066':'#c98a00');c.fillStyle=g;c.fillRect(x0,y0,o.flash>0&&ch<1?len:w,y1-y0);
 if(full&&!on){c.fillStyle='rgba(120,70,0,.25)';c.fillRect(x0,y0,len,y1-y0);}
 c.strokeStyle=on?'#fff':'rgba(255,255,255,.7)';c.lineWidth=on?1.6:1;c.beginPath();for(let x=x0;x<x0+(o.flash>0&&ch<1?len:w);x+=4)c.lineTo(x,(y0+y1)/2+Math.sin(x*.18+tm*14)*2*Math.sin(x*.04+tm*3));c.stroke();c.restore();
 c.strokeStyle='#7a5200';c.lineWidth=1;for(let i=1;i<HCH;i++){const x=x0+len*i/HCH;c.beginPath();c.moveTo(x+.5,y0+1.5);c.lineTo(x+.5,y1-1.5);c.stroke();}
 c.strokeStyle='#5a3a00';c.lineWidth=1.5;c.beginPath();c.roundRect(x0,y0,len,y1-y0,5);c.stroke();
 for(const b of o.orbs){b.p+=dt*2.2;const k=fbEase(Math.min(1,b.p)),sx=x0+len*b.sx,sy=-4,ex=x0+w,ey=(y0+y1)/2,x=sx+(ex-sx)*k,y=sy+(ey-sy)*k-Math.sin(k*Math.PI)*4;
  c.fillStyle='#fff5b0';c.beginPath();c.arc(x,y,2.5,0,7);c.fill();c.strokeStyle='#d99a00';c.lineWidth=1;c.stroke();}
 o.orbs=o.orbs.filter(b=>b.p<1);}
// ---- Red ----
function fbNet(c,W,H,t,o,dt,tm){const n=Math.min(4,t.netN||0),y=H/2,r=6,xs=[0,1,2,3,4].map(i=>r+2+i*(W-2*r-4)/4);
 for(let i=0;i<4;i++){if(i>=n)break;const xa=xs[i]+r,xb=xs[i+1]-r,pts=[[xa,y]];for(let s=1;s<6;s++)pts.push([xa+(xb-xa)*s/6,y+(Math.sin(tm*23+i*3+s*1.7))*4]);pts.push([xb,y]);
  for(const [col,wd] of [['#0c3556',4.4],['#3fb4ff',2.2],['#e6f8ff',.8]]){c.strokeStyle=col;c.lineWidth=wd;c.lineCap='round';c.lineJoin='round';c.beginPath();pts.forEach((p,k)=>k?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.stroke();}}
 xs.forEach((x,i)=>{const on=i===0||i<=n;c.fillStyle=i===0?'#8a5a00':on?'#ffcf3a':'#e3d2ae';c.strokeStyle='#2a1a10';c.lineWidth=1.4;c.beginPath();c.arc(x,y,r,0,7);c.fill();c.stroke();
  if(i>0&&on){c.strokeStyle='#0c3556';c.globalAlpha=.4+.3*Math.sin(tm*8+i);c.lineWidth=1.2;c.beginPath();c.arc(x,y,r+3.5,0,7);c.stroke();c.globalAlpha=1;}});}
// ---- bucle: solo mientras hay una barra en pantalla ----
function fbDraw(now){FB.raf=0;const cs=document.querySelectorAll('canvas.fbc');if(!cs.length)return;const t=FT.t;const tm=now/1000,dt=Math.min(.05,(now-(FB.last||now))/1000);FB.last=now;
 for(const cv of cs){if(!t||!cv.isConnected)continue;const r=cv.getBoundingClientRect();if(!r.width)continue;const dpr=Math.min(2,window.devicePixelRatio||1),W=Math.round(r.width),H=Math.round(r.height);
  if(cv.width!==Math.round(W*dpr)||cv.height!==Math.round(H*dpr)){cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);}
  const c=cv.getContext('2d');c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,W,H);const o=fbS(t),k=cv.dataset.k;
  try{if(k==='mag')fbMag(c,W,H,t,o,dt);else if(k==='volc')fbVolc(c,W,H,t,o,dt,tm);else if(k==='herald')fbHerald(c,W,H,t,o,dt,tm);else if(k==='net')fbNet(c,W,H,t,o,dt,tm);}catch(e){}}
 FB.raf=requestAnimationFrame(fbDraw);}
setInterval(()=>{if(!FB.raf&&document.querySelector('canvas.fbc')){FB.last=performance.now();FB.raf=requestAnimationFrame(fbDraw);}},250);
