// ==================== v336 · Cofres y eventos del mapa (Mesa ay1g + ay1l, aprobados por Nogal) ====================
// Fantástica: cofre A (el de la animación de apertura) con destellos; poste de madera con el «?» tallado que da la vuelta sobre su clavo.
// Distópica: caja S.O.S. (la de la animación, sin paracaídas) con una baliza roja cuyo brillo llega lejos y se difumina suave;
// holograma con el «?» sobre un anillo, el haz sube y se curva en la interrogación, con un glitch al avisar.
// Avisan cada 15 s; al poner una pieza al lado, uno en el momento y luego cada 7,5 s. Sin el círculo de color de antes.
const MIC={img:{},adj:{},trig:{}};
function micImg(k,svg){let o=MIC.img[k];if(!o){o=new Image();o.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);MIC.img[k]=o;}return o.complete&&o.naturalWidth?o:null;}
function micChestSvg(){const add=s=>s.replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ');
 const body=CFX.CB.replace('<svg ','<svg y="70" ').replace(/<g class="inner"[\s\S]*?<\/g><\/g>/,'');
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 200" width="220" height="200">${body}${CFX.CL}</svg>`.replace(/<svg (?!xmlns)/g,'<svg ');}
function micCrateSvg(){return CFX.CR.replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ').replace('class="chute"','class="chute" display="none"');}
const micHash=k=>{let h=7;for(const c of k)h=(h*31+c.charCodeAt(0))%9973;return h;};
// momento del último aviso de este icono (segundos) y cuántas vueltas toca
function micLast(key,now){const[bx,by]=key.split(',').map(Number),B=S.blocks||{};
 const adj=[[1,0],[-1,0],[0,1],[0,-1]].some(([a,b])=>B[(bx+a)+','+(by+b)]);
 if(adj&&MIC.adj[key]==null)MIC.adj[key]=now;if(!adj)delete MIC.adj[key];
 const A=MIC.adj[key];if(A!=null){const n=Math.floor((now-A)/7.5);return {t:A+n*7.5,first:n===0};}
 const off=(micHash(key)%150)/10,n=Math.floor((now-off)/15);return {t:off+n*15,first:false};}
const micEio=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
function mapChestDraw(key,cx,cy,BCS,lw){const G=MIC.ctx||g,now=MIC.now!=null?MIC.now:performance.now()/1000,L=micLast(key,now),u=now-L.t,e2=MIC.e2!=null?MIC.e2:typeof era2G==='function'&&era2G();
 G.save();G.fillStyle='rgba(0,0,0,.28)';G.beginPath();G.ellipse(cx,cy+BCS*.95,BCS*1.35,BCS*.3,0,0,7);G.fill();G.restore();
 if(!e2){const im=micImg('chest',micChestSvg()),w=BCS*2.5,h=w*200/220;if(im)G.drawImage(im,cx-w/2,cy+BCS*1.0-h,w,h);
  // destellos: tres estrellitas que se encienden una detrás de otra
  if(u<1.2)for(const [dx,dy,s,d] of [[-.95,-.85,.42,0],[.85,-1.1,.28,.18],[.95,-.35,.32,.34]]){const k=(u-d)/.7;if(k<=0||k>=1)continue;const a=Math.sin(k*Math.PI),r=BCS*s*a;
   G.save();G.translate(cx+dx*BCS,cy+dy*BCS);G.rotate(k*.6);G.fillStyle=`rgba(255,246,200,${a})`;G.shadowColor='#ffe58a';G.shadowBlur=BCS*.4;G.beginPath();
   for(let i=0;i<8;i++){const rr=i%2?r*.28:r,an=i*Math.PI/4;G.lineTo(Math.cos(an)*rr,Math.sin(an)*rr);}G.closePath();G.fill();G.restore();}
  return;}
 const im=micImg('crate',micCrateSvg()),sc=BCS*2.2/120;if(im)G.drawImage(im,cx-120*sc,cy+BCS*1.0-364*sc,240*sc,380*sc);
 // baliza: la lucecita parpadea despacio y, al avisar, un brillo rojo grande que se difumina poco a poco
 const by=cy+BCS*1.0-364*sc+(300-62)*sc,bl=.55+.45*Math.max(0,Math.sin(now*Math.PI));
 G.save();G.fillStyle='#3a3a30';G.fillRect(cx-BCS*.05,by,BCS*.1,BCS*.35);G.restore();
 if(u<1.6){const k=u/1.6,a=Math.sin(Math.min(1,k*2.2)*Math.PI/2)*(1-k),R=BCS*(1.2+3.3*micEio(Math.min(1,k*1.4)));const gr=G.createRadialGradient(cx,by,0,cx,by,R);
  gr.addColorStop(0,`rgba(255,70,50,${.75*a})`);gr.addColorStop(.35,`rgba(255,60,40,${.35*a})`);gr.addColorStop(1,'rgba(255,40,30,0)');G.save();G.fillStyle=gr;G.beginPath();G.arc(cx,by,R,0,7);G.fill();G.restore();}
 G.save();G.shadowColor='#ff4030';G.shadowBlur=BCS*.5*bl;G.fillStyle=`rgb(255,${70+60*bl},${50+40*bl})`;G.beginPath();G.arc(cx,by,BCS*.16,0,7);G.fill();G.restore();}
function mapEvtDraw(key,cx,cy,BCS,lw){const G=MIC.ctx||g,now=MIC.now!=null?MIC.now:performance.now()/1000,L=micLast(key,now),u=now-L.t,e2=MIC.e2!=null?MIC.e2:typeof era2G==='function'&&era2G();
 if(!e2){// poste con el cartel: gira sobre el clavo (vuelta entera en 2,6 s; dos vueltas la primera vez que pones una pieza al lado)
  const T=L.first?3.6:2.6,turns=L.first?2:1,rot=u<T?micEio(u/T)*Math.PI*2*turns:0;
  G.save();G.fillStyle='rgba(0,0,0,.28)';G.beginPath();G.ellipse(cx,cy+BCS*1.05,BCS*.9,BCS*.24,0,0,7);G.fill();
  G.fillStyle='#7a4a22';G.strokeStyle='#2e1708';G.lineWidth=lw(2);G.beginPath();G.rect(cx-BCS*.13,cy-BCS*.7,BCS*.26,BCS*1.75);G.fill();G.stroke();
  const nx=cx,ny=cy-BCS*.62;G.translate(nx,ny);G.rotate(rot);
  const w=BCS*2.0,h=BCS*.95,x0=-w*.5,y0=-h*.5;G.fillStyle='#b8783a';G.strokeStyle='#2e1708';G.lineWidth=lw(2.4);G.lineJoin='round';
  G.beginPath();G.moveTo(x0,y0);G.lineTo(x0+w*.8,y0);G.lineTo(x0+w,0);G.lineTo(x0+w*.8,y0+h);G.lineTo(x0,y0+h);G.closePath();G.fill();G.stroke();
  G.strokeStyle='rgba(74,38,14,.55)';G.lineWidth=lw(1.2);G.beginPath();G.moveTo(x0+w*.08,y0+h*.33);G.lineTo(x0+w*.78,y0+h*.33);G.moveTo(x0+w*.08,y0+h*.68);G.lineTo(x0+w*.74,y0+h*.68);G.stroke();
  // «?» tallado: oscuro con un filo claro debajo
  G.font=`900 ${Math.round(BCS*.82)}px Georgia,serif`;G.textAlign='center';G.textBaseline='middle';G.fillStyle='rgba(255,220,170,.35)';G.fillText('?',x0+w*.42,h*.06+lw(1.2));G.fillStyle='#3a1e0a';G.fillText('?',x0+w*.42,h*.06);
  G.restore();return;}
 // holograma
 const gl=u<.7?(Math.random()<.5?1:0):0,jx=gl?(Math.random()-.5)*BCS*.35:0,fl=.85+.15*Math.sin(now*7)+(gl?-.35*Math.random():0),bob=Math.sin(now*1.6)*BCS*.08;
 const base=cy+BCS*.95,qy=cy-BCS*.55+bob;
 G.save();G.globalAlpha=Math.max(.2,fl);
 const bm=G.createLinearGradient(0,base,0,qy+BCS*.4);bm.addColorStop(0,'rgba(80,220,255,.45)');bm.addColorStop(1,'rgba(80,220,255,0)');G.fillStyle=bm;
 G.beginPath();G.moveTo(cx-BCS*.85,base);G.lineTo(cx+BCS*.85,base);G.lineTo(cx+BCS*.12+jx,qy+BCS*.55);G.lineTo(cx-BCS*.12+jx,qy+BCS*.55);G.closePath();G.fill();
 G.strokeStyle='#3fe8ff';G.shadowColor='#3fe8ff';G.shadowBlur=BCS*.4;G.lineWidth=lw(2.2);G.beginPath();G.ellipse(cx,base,BCS*.9,BCS*.22,0,0,7);G.stroke();
 // el «?»: trazo luminoso (el haz sube y se curva en la interrogación) con un fantasma rosa al hacer glitch
 const f=Math.round(BCS*1.9);G.font=`700 ${f}px Georgia,serif`;G.textAlign='center';G.textBaseline='middle';G.lineWidth=lw(2.6);
 if(gl){G.strokeStyle='rgba(255,90,200,.7)';G.strokeText('?',cx+jx+BCS*.12,qy);}
 G.strokeStyle='#7ff2ff';G.strokeText('?',cx+jx,qy);G.fillStyle='rgba(63,232,255,.18)';G.fillText('?',cx+jx,qy);
 if(!gl&&u<1.4){const k=u/1.4;G.globalAlpha=(1-k)*.8;G.strokeStyle='#bff8ff';G.lineWidth=lw(1.5);G.beginPath();G.ellipse(cx,base,BCS*(.9+1.6*k),BCS*(.22+.4*k),0,0,7);G.stroke();}
 G.restore();}
