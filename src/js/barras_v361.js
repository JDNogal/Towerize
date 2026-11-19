// ==================== v361 · BARRAS DE MURO Y COMIDA (maquetas Muro B y Comida A, aprobadas por Nogal el 19-nov) ====================
// Muro (Casa de ladrillo): un muro de ladrillos que se agrieta mientras aguanta (grietas distintas cada vez, que nacen en momentos
// distintos y avanzan en zigzag con ramas), tiembla y se derrumba; tras una pausa, se vuelve a levantar desde abajo hasta el siguiente.
// Comida (Mímico): el Mímico a un lado; por cada baja aparece una bolita de la nada en el otro extremo y vuela a su boca; al morder
// baja la tapa y se llena una casilla del contador de abajo (en grupos de 5).
// guarda la duración inicial de cada muro, para saber cuánto le queda
{const _w=wallShot;wallShot=function(t){const n0=S.barr.length;const r=_w.apply(this,arguments);if(S.barr.length>n0){const b=S.barr[S.barr.length-1];b.src=b.src||t;b.t0=b.t;}return r;};}
const B6DR={};
const b7Brick=(c,x,y,w,h,col,a=1)=>{c.globalAlpha=a;c.fillStyle=col;c.strokeStyle='#1b1712';c.lineWidth=1.4;c.beginPath();c.roundRect(x,y,w,h,2);c.fill();c.stroke();c.globalAlpha=1;};
const b7Wall=t=>S&&S.barr&&S.barr.find(b=>b.brick&&b.src===t&&b.t>0);
function b7Cracks(x0,y0,WW,HH){const L=[],N=5+Math.floor(Math.random()*3);for(let j=0;j<N;j++){
 let x=x0+WW*(.08+Math.random()*.84),y=Math.random()<.5?y0:y0+HH*(.2+Math.random()*.6),a=Math.PI/2+(Math.random()-.5)*1.6;if(y>y0)a=(Math.random()<.5?0:Math.PI)+(Math.random()-.5)*1.2;
 const p=[[x,y]],steps=6+Math.floor(Math.random()*8);for(let i=0;i<steps;i++){a+=(Math.random()-.5)*1.4;const d=3+Math.random()*6;x+=Math.cos(a)*d;y+=Math.sin(a)*d;x=Math.max(x0+1,Math.min(x0+WW-1,x));y=Math.max(y0+1,Math.min(y0+HH-1,y));p.push([x,y]);}
 const br=[];for(let i=2;i<p.length-1;i++)if(Math.random()<.3){let bx=p[i][0],by=p[i][1],ba=a+(Math.random()<.5?1:-1)*(.6+Math.random()*.8);const q=[[bx,by]];for(let s=0;s<3+Math.floor(Math.random()*3);s++){ba+=(Math.random()-.5)*1.2;bx+=Math.cos(ba)*(2+Math.random()*4);by+=Math.sin(ba)*(2+Math.random()*4);q.push([bx,by]);}br.push({at:i,p:q});}
 L.push({t0:j/N*.75+Math.random()*.08,p,br});}return L;}
const b7Parts=(c,o,dt)=>{o.pt=(o.pt||[]).filter(p=>p.t>0);for(const p of o.pt){p.t-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=(p.b?260:40)*dt;if(p.rot!=null)p.rot+=p.vr*dt;
 c.globalAlpha=Math.max(0,Math.min(1,p.t*1.5));if(p.b){c.save();c.translate(p.x+p.w/2,p.y+p.h/2);c.rotate(p.rot);b7Brick(c,-p.w/2,-p.h/2,p.w,p.h,p.col);c.restore();}else{c.fillStyle=p.col+Math.max(0,p.t)+')';c.beginPath();c.arc(p.x,p.y,p.r,0,7);c.fill();}c.globalAlpha=1;}};
const PAUSE7=1.3;
function b7Muro(c,W,H,t,o,dt,tm){const b=b7Wall(t),cols=Math.max(6,Math.min(11,Math.floor((W-24)/26))),bw=Math.min(26,(W-24)/cols),bh=14,rows=4,WW=cols*bw,HH=rows*bh,x0=(W-WW)/2,y0=H-8-HH;
 c.fillStyle='rgba(60,40,10,.15)';c.beginPath();c.ellipse(W/2,H-6,WW/2+8,4,0,0,7);c.fill();
 if(b){if(o.mb!==b){o.mb=b;o.cr=b7Cracks(x0,y0,WW,HH);o.cw=W;}if(o.cw!==W){o.cr=b7Cracks(x0,y0,WW,HH);o.cw=W;}o.up=1;const D=b.t0||4,k=Math.max(0,Math.min(1,1-b.t/D));
  const sh=b.t<.6?(Math.random()-.5)*3*(1-b.t/.6):0;c.save();c.translate(sh,0);
  c.save();c.beginPath();c.rect(x0-1,y0-1,WW+2,HH+2);c.clip();for(let r=0;r<rows;r++)for(let i=0;i<=cols;i++)b7Brick(c,x0+i*bw-(r%2?bw/2:0),y0+r*bh,bw,bh,'#c8553d');
  for(const q0 of o.cr){const q=Math.max(0,Math.min(1,(k-q0.t0)/(1-q0.t0)*1.3));if(q<=0)continue;const n=Math.max(1,Math.floor(q*q0.p.length)),P=q0.p;
   const ln=()=>{c.beginPath();c.moveTo(P[0][0],P[0][1]);for(let i=1;i<n;i++)c.lineTo(P[i][0],P[i][1]);c.stroke();};c.lineJoin='round';
   c.strokeStyle='rgba(20,12,8,.45)';c.lineWidth=3.2;ln();c.strokeStyle='#1b1712';c.lineWidth=1.3+q*.7;ln();
   for(const br of q0.br)if(br.at<n){const m=Math.max(1,Math.floor(Math.min(1,(n-br.at)/4)*br.p.length));c.lineWidth=1;c.beginPath();c.moveTo(br.p[0][0],br.p[0][1]);for(let i=1;i<m;i++)c.lineTo(br.p[i][0],br.p[i][1]);c.stroke();}}
  c.restore();c.strokeStyle='#1b1712';c.lineWidth=1.6;c.strokeRect(x0,y0,WW,HH);c.restore();}
 else{if(o.up){o.up=0;o.down=tm;o.mb=null;o.pt=o.pt||[];for(let i=0;i<14;i++)o.pt.push({x:x0+Math.random()*(WW-bw),y:y0+Math.random()*HH*.6,w:bw,h:bh,vx:(Math.random()-.5)*30,vy:-20,t:1.1,col:'#c8553d',rot:0,vr:(Math.random()-.5)*6,b:1});
   for(let i=0;i<18;i++)o.pt.push({x:W/2,y:y0+HH*.6,vx:(Math.random()-.5)*40,vy:-Math.random()*30,t:.7,r:2+Math.random()*3,col:'rgba(200,180,150,'});}
  // se vuelve a levantar desde abajo: tras una pausa, al ritmo que le queda de enfriamiento
  const cd=Math.max(0,t.cd||0),el=o.down!=null?tm-o.down:99,ph=cd<=0?1:Math.max(0,Math.min(1,(el-PAUSE7)/Math.max(.1,el+cd-PAUSE7))),hh=HH*ph;
  if(ph>0){c.save();c.beginPath();c.rect(x0,y0+HH-hh,WW,hh);c.clip();for(let r=0;r<rows;r++)for(let i=0;i<=cols;i++)b7Brick(c,x0+i*bw-(r%2?bw/2:0),y0+r*bh,bw,bh,'#d9b49a',.85);c.restore();}
  c.setLineDash([3,3]);c.strokeStyle='rgba(0,0,0,.25)';c.lineWidth=1.2;c.strokeRect(x0,y0,WW,HH);c.setLineDash([]);}
 b7Parts(c,o,dt);}
function b7Comida(c,W,H,t,o,dt,tm){const lv=t.lvl||1,NEED=GLUT[lv]||1,food=Math.min(NEED,t.food||0);
 if(o.glv!==lv){o.glv=lv;o.lf=food;o.eat=food;o.bt=[];o.jmp=lv>1&&o.seen?1:0;}o.seen=1;
 if(food>o.lf)for(let i=o.lf;i<food;i++)o.bt.push({t:-(i-o.lf)*.18});else if(food<o.lf)o.eat=food;o.lf=food;
 for(const b of o.bt){const was=b.t;b.t+=dt;if(was<.62&&b.t>=.62)o.eat=Math.min(food,o.eat+1);}o.bt=o.bt.filter(b=>b.t<.8);if(o.eat>food)o.eat=food;o.jmp=Math.max(0,(o.jmp||0)-dt*.8);
 // el contador, aparte: casillas en grupos de 5 (más de 40, en dos filas)
 const rowsN=NEED>40?2:1,perRow=Math.ceil(NEED/rowsN),G=Math.ceil(perRow/5),bw0=W-12,gw=bw0/G,cw=Math.min(12,(gw-4)/5),ch=rowsN>1?9:12,gy=H-4-rowsN*(ch+3);
 for(let k=0;k<NEED;k++){const r=Math.floor(k/perRow),kk=k%perRow,gi=Math.floor(kk/5),j=kk%5,x=6+gi*gw+(gw-5*cw)/2+j*cw,y=gy+r*(ch+3),on=k<o.eat;
  c.fillStyle=on?'#e0903a':'rgba(0,0,0,.09)';c.strokeStyle=on?'#1b1712':'rgba(0,0,0,.2)';c.lineWidth=1;c.beginPath();c.roundRect(x,y,cw-1.5,ch,2);c.fill();c.stroke();}
 const Z=1.35,MW=40,mx=8,my=Math.max(2,gy-6-44*Z),ex=mx+MW*Z/2,ey=my+16*Z;/* el Mímico, a escala Z */
 // las bolitas: aparecen de la nada en el otro extremo (destello) y vuelan en arco hasta la boca
 for(const b of o.bt){if(b.t<0)continue;const q=Math.min(1,b.t/.6),sx=W-18,sy=my+10;if(q<.18){const pp=q/.18;c.fillStyle=`rgba(255,240,180,${1-pp})`;c.beginPath();c.arc(sx,sy,4+pp*10,0,7);c.fill();}
  const e=Math.min(1,Math.max(0,(q-.12)/.88)),x=sx+(ex-sx)*e,y=sy+(ey-sy)*e-Math.sin(e*Math.PI)*Math.min(18,my+2),r=5.5*Math.min(1,q/.12);if(q<1){c.fillStyle='#e0a060';c.strokeStyle='#1b1712';c.lineWidth=1.3;c.beginPath();c.arc(x,y,r,0,7);c.fill();c.stroke();}}
 // el Mímico: el cuerpo quieto y la tapa baja para morder (Nogal)
 const chomp=o.bt.some(b=>b.t>.55&&b.t<.75),jy=-Math.sin(o.jmp*Math.PI*3)*6*o.jmp,LY=my+(chomp?9:0),BY=my+23;
 c.save();c.translate(mx,my+jy);c.scale(Z,Z);c.translate(-mx,-my);c.fillStyle='#8a5a2e';c.strokeStyle='#1b1712';c.lineWidth=1.8;c.beginPath();c.roundRect(mx,BY,MW,20,3);c.fill();c.stroke();
 c.fillStyle='#f4ead8';for(let i=0;i<5;i++){const tx=mx+2+i*7.2;c.beginPath();c.moveTo(tx,BY);c.lineTo(tx+3.6,BY-5);c.lineTo(tx+7.2,BY);c.fill();c.stroke();}
 c.fillStyle='#a8743a';c.beginPath();c.roundRect(mx,LY,MW,13,[7,7,2,2]);c.fill();c.stroke();
 c.fillStyle='#f4ead8';for(let i=0;i<5;i++){const tx=mx+2+i*7.2;c.beginPath();c.moveTo(tx,LY+13);c.lineTo(tx+3.6,LY+18);c.lineTo(tx+7.2,LY+13);c.fill();c.stroke();}
 c.fillStyle='#ffd34a';c.fillRect(mx+MW/2-3,BY+5,6,5);c.fillStyle='#1b1712';c.beginPath();c.arc(mx+11,LY+6,1.8,0,7);c.arc(mx+MW-11,LY+6,1.8,0,7);c.fill();c.restore();}
B6DR.muro=b7Muro;B6DR.comida=b7Comida;B6H.muro=74;B6H.comida=104;
// las barras: la de Comida ya existía (ficha_unica.js) con dibujo genérico; la de Muro es nueva
{const i=TMECH.findIndex(m=>m.k==='comida');if(i>=0)B6K.comida=TMECH[i];
 const M={k:'muro',on:t=>!!(TW[t.type]&&TW[t.type].wall),n:'Muro',ic:'bwall',v:t=>{const b=b7Wall(t);return b?b.t/(b.t0||4):0;},
  l:t=>{const b=b7Wall(t);if(b)return 'Quedan '+f(Math.ceil(b.t*10)/10)+' s';const cd=t.cd||0;return cd>0?'Siguiente muro en '+f(Math.ceil(cd*10)/10)+' s':'¡Listo!';}};
 TMECH.push(M);B6K.muro=M;}
