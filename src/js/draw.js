// ---- dibujo ----
function mark(c,k,x,y,cs){const B=BF[k];c.fillStyle=B.col;c.globalAlpha=.9;c.fillRect(x+cs*.15,y+cs*.15,cs*.7,cs*.7);c.globalAlpha=1;
 c.fillStyle='#14161c';c.font='bold '+Math.round(cs*.5)+'px sans-serif,"Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji"';c.textAlign='center';c.textBaseline='middle';c.fillText(B.l,x+cs/2,y+cs/2+1);
 if(B.sup){c.strokeStyle='#f0b429';c.lineWidth=Math.max(1.5,cs*.09);c.strokeRect(x+cs*.15,y+cs*.15,cs*.7,cs*.7);
  c.fillStyle='#f0b429';c.font='bold '+Math.round(cs*.42)+'px sans-serif,"Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji"';c.textAlign='right';c.textBaseline='top';c.fillText('★',x+cs*.95,y+cs*.02);}}
function drawPat(c,o,cs,ox,oy,a){
 for(let y=0;y<P;y++)for(let x=0;x<P;x++){const ch=o.p[y][x];
  c.globalAlpha=a;const cv0=cellOf(ch);c.fillStyle=cv0===2?'#a8854a':'#2c3a2f';c.fillRect(ox+x*cs,oy+y*cs,cs,cs);if(cv0===3)drawObs(c,ch,ox+x*cs,oy+y*cs,cs);else if(cv0===1)drawSolar(c,ox+x*cs,oy+y*cs,cs);}
 c.globalAlpha=a;for(const b of o.b)mark(c,b.k,ox+b.x*cs,oy+b.y*cs,cs);c.globalAlpha=1;
}
function rangeCircle(x,y,r){g.fillStyle='rgba(90,180,255,.17)';g.strokeStyle='rgba(110,190,255,.95)';g.lineWidth=1.5/sc();
 g.beginPath();g.arc(x*CS+CS/2,y*CS+CS/2,r*CS,0,7);g.fill();g.stroke();}
const SKULL=new Image();SKULL.src='data:image/png;base64,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';
function draw(){
 const k=sc(),lw=v=>v*PXR/k,BCS=K*CS;
 g.setTransform(1,0,0,1,0,0);g.fillStyle=COL.bg2;g.fillRect(0,0,VIEW,VH);
 g.setTransform(k,0,0,k,-CAM.x*k,-CAM.y*k);drawRim(g,k);
 if(S.phase==='place'){g.strokeStyle='rgba(232,176,74,.35)';g.lineWidth=lw(1);g.setLineDash([lw(4),lw(4)]);
  // solo los huecos a los que llega una salida de camino (donde una pieza puede engancharse)
  const sl=new Set(collectEnds().map(e=>{const gx=Math.floor(e.x/K),gy=Math.floor(e.y/K);return Math.floor((gx+e.dir[0])/P)+','+Math.floor((gy+e.dir[1])/P);}));
  for(let by=0;by<BN;by++)for(let bx=0;bx<BN;bx++){if(S.blocks[bx+','+by])continue;
   if(sl.has(bx+','+by))g.strokeRect(bx*P*BCS+lw(2),by*P*BCS+lw(2),P*BCS-lw(4),P*BCS-lw(4));}
  g.setLineDash([]);}
 const e2=S.era===2,cob=!e2&&pathSkin()==='cob';if(e2)e2Tick();
 for(const key in S.blocks){const[bx,by]=key.split(',').map(Number);
  for(let y=0;y<P;y++)for(let x=0;x<P;x++){const gx=bx*P+x,gy=by*P+y;
   const cv0=S.cc[gy][gx];if(e2){e2Cell(g,gx,gy,cv0,BCS);}else{g.fillStyle=cv0===2?'#a8854a':'#2c3a2f';g.fillRect(gx*BCS,gy*BCS,BCS,BCS);if(cv0===2&&cob)drawCob(g,gx,gy,BCS);if(cv0===3&&S.obs)drawObs(g,S.obs[gx+','+gy]||'#',gx*BCS,gy*BCS,BCS);else if(cv0===1)drawSolar(g,gx*BCS,gy*BCS,BCS);}
   const bk=S.buff[gy*K][gx*K];if(bk)mark(g,bk,gx*BCS,gy*BCS,BCS);}}
 const RVO=revOrder();
 for(const key in S.evts||{}){if(S.blocks[key])continue;const rf=revF(RVO,key);if(rf<=0)continue;const[bx,by]=key.split(',').map(Number),cx=(bx*P+P/2)*BCS,cy=(by*P+P/2)*BCS;g.save();g.translate(cx,cy);g.scale(rf,rf);g.translate(-cx,-cy);g.globalAlpha=Math.min(1,rf);
  g.fillStyle='rgba(160,120,255,.14)';g.beginPath();g.arc(cx,cy,BCS*2.2,0,7);g.fill();g.fillStyle='#5a3f9e';g.strokeStyle='#c9b8ff';g.lineWidth=lw(2.5);g.beginPath();g.arc(cx,cy,BCS*1.05,0,7);g.fill();g.stroke();
  g.fillStyle='#fff';g.font='bold '+Math.round(BCS*1.4)+'px Georgia,serif';g.textAlign='center';g.textBaseline='middle';g.fillText('?',cx,cy+BCS*.06);g.restore();}
 for(const key in S.chests){if(S.blocks[key])continue;const rf=revF(RVO,key);if(rf<=0)continue;const[bx,by]=key.split(',').map(Number),cx=(bx*P+P/2)*BCS,cy=(by*P+P/2)*BCS,w=BCS*2.4,hh=BCS*1.7,y0=cy-hh/2;g.save();g.translate(cx,cy);g.scale(rf,rf);g.translate(-cx,-cy);g.globalAlpha=Math.min(1,rf);
  g.fillStyle='rgba(240,180,41,.12)';g.beginPath();g.arc(cx,cy,BCS*2.2,0,7);g.fill();
  g.fillStyle='#7a4b22';g.fillRect(cx-w/2,y0+hh*.35,w,hh*.65);g.fillStyle='#9a6330';g.fillRect(cx-w/2,y0,w,hh*.4);
  g.fillStyle='#f0b429';g.fillRect(cx-w/2,y0+hh*.34,w,hh*.1);g.fillRect(cx-BCS*.22,y0+hh*.15,BCS*.44,hh*.55);
  g.fillStyle='#14161c';g.fillRect(cx-BCS*.08,y0+hh*.42,BCS*.16,BCS*.3);g.restore();}
 const h=S.hover,ht=h&&!MFSQ()&&S.occ[h.x+','+h.y];
 for(const t of new Set([S.selT,ht]))if(t)rangeCircle(t.x,t.y,stats(t).range);
 if(BM.s&&(BM.arm||BM.hov)&&TW[BM.arm||BM.hov]){const q=BM.s,b=BF[S.buff[q.y][q.x]];rangeCircle(q.x,q.y,TW[BM.arm||BM.hov].range*(b&&b.rg||1));}
 if(BM.s){g.strokeStyle='#e8b04a';g.lineWidth=lw(2.5);g.strokeRect(BM.s.kx*BCS+lw(1.5),BM.s.ky*BCS+lw(1.5),BCS-lw(3),BCS-lw(3));}
 if(h&&S.tsel&&(S.phase==='build'||S.phase==='wave')&&inb(h.x,h.y)&&S.cells[h.y][h.x]===1&&!ht){
  const q=sqOf(h.x,h.y),b=BF[S.buff[q.y][q.x]];rangeCircle(q.x,q.y,TW[S.tsel].range*(b&&b.rg||1));
  g.strokeStyle='rgba(255,255,255,.8)';g.lineWidth=lw(1.5);g.strokeRect(q.kx*BCS+lw(1),q.ky*BCS+lw(1),BCS-lw(2),BCS-lw(2));}
 for(const w of (S.wish||[]))if(w.a==='build'){const q=sqOf(w.x,w.y);g.globalAlpha=.85;g.font=Math.round(CS*1.4)+'px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(TW[w.v].ic,(q.x+.5)*CS,(q.y+.5)*CS);g.font=Math.round(CS*.9)+'px sans-serif';g.fillText('🔖',(q.x+1.3)*CS,(q.y-.3)*CS);g.globalAlpha=1;}
 if(S.tut&&S.tut.lock){const pu=.5+.5*Math.sin(performance.now()/250);g.strokeStyle='rgba(255,215,90,'+(.5+.5*pu)+')';g.lineWidth=lw(3);for(const q of S.tut.lock)g.strokeRect(q.x*CS-CS+lw(2),q.y*CS-CS+lw(2),K*CS-lw(4),K*CS-lw(4));}
 if(S.aim==='vch'&&S.tut&&S.tut.sug){const t=S.list.find(o=>o.id===S.tut.sug);if(t){g.strokeStyle='#ffd75a';g.lineWidth=lw(4);g.beginPath();g.arc(t.x*CS+CS/2,t.y*CS+CS/2,K*CS*.8,0,7);g.stroke();}}
 for(const t of S.list)if(t.curse>0){g.strokeStyle='rgba(176,90,208,.9)';g.lineWidth=lw(2);g.setLineDash([lw(3),lw(3)]);g.beginPath();g.arc(t.x*CS+CS/2,t.y*CS+CS/2,K*CS*.55,0,7);g.stroke();g.setLineDash([]);}
 if(S.aim==='dism'||S.aim==='hammer'||S.aim==='sharp'||S.aim==='vch'){for(const t of S.list){const ok=S.aim==='dism'?lv1Ok(t):S.aim==='sharp'?sharpOk(t):S.aim==='vch'?vchOk(S.vty,t):(t.lvl<3&&!TW[t.type].uniq);if(!ok)continue;const sel=(S.dsel&&S.dsel.includes(t))||(S.acf&&S.acf.t===t);g.strokeStyle=sel?'#ff6b5e':'#c9b8ff';g.lineWidth=lw(sel?4:2.5);g.beginPath();g.arc(t.x*CS+CS/2,t.y*CS+CS/2,K*CS*.62,0,7);g.stroke();}}
 if(S.aim==='uplace'&&S.uq&&S.uq[0]){g.fillStyle='rgba(255,215,90,.35)';g.strokeStyle='#ffd75a';g.lineWidth=lw(2);for(const q of uSpots(S.uq[0].bk)){g.fillRect(q.kx*K*CS,q.ky*K*CS,K*CS,K*CS);g.strokeRect(q.kx*K*CS+lw(1),q.ky*K*CS+lw(1),K*CS-lw(2),K*CS-lw(2));}
  const u=S.upc;if(u){const T=TW[S.uq[0].type],pu=.6+.4*Math.sin(performance.now()/180);g.fillStyle=`rgba(255,240,170,${.35+.3*pu})`;g.fillRect(u.kx*K*CS,u.ky*K*CS,K*CS,K*CS);g.strokeStyle='#fff';g.lineWidth=lw(3);g.strokeRect(u.kx*K*CS+lw(1.5),u.ky*K*CS+lw(1.5),K*CS-lw(3),K*CS-lw(3));g.globalAlpha=.75;g.fillStyle='#14161c';icDraw(g,twIcO(T),(u.kx+.5)*K*CS,(u.ky+.5)*K*CS,K*CS*.6);g.globalAlpha=1;}}
 if(S.aim==='hero'||S.aim==='barricade'){const C=S.cells,pa=(x,y)=>x>=0&&y>=0&&x<N&&y<N&&C[y][x]===2;
  g.fillStyle='rgba(255,226,122,.24)';g.strokeStyle='#ffe27a';g.lineWidth=lw(3);g.beginPath();
  for(let y=0;y<N;y++)for(let x=0;x<N;x++){if(C[y][x]!==2)continue;const X0=x*CS,Y0=y*CS;g.fillRect(X0,Y0,CS,CS);
   if(!pa(x,y-1)){g.moveTo(X0,Y0);g.lineTo(X0+CS,Y0);}if(!pa(x,y+1)){g.moveTo(X0,Y0+CS);g.lineTo(X0+CS,Y0+CS);}
   if(!pa(x-1,y)){g.moveTo(X0,Y0);g.lineTo(X0,Y0+CS);}if(!pa(x+1,y)){g.moveTo(X0+CS,Y0);g.lineTo(X0+CS,Y0+CS);}}
  g.stroke();}
 for(const b of S.barr)drawBarr(b,1);
 drawFaros();
 if(S.oneEnd&&S.lastEnd&&!FO.open&&S.phase==='place'&&S.phase!=='lost'&&S.phase!=='won'){const e=S.lastEnd,gx=Math.floor(e.x/K),gy=Math.floor(e.y/K),bx=Math.floor((gx+e.dir[0])/P),by=Math.floor((gy+e.dir[1])/P);
  g.save();g.globalAlpha=.5+.45*Math.sin(performance.now()/180);g.strokeStyle='#ffcc33';g.lineWidth=lw(3);g.strokeRect(gx*K*CS,gy*K*CS,K*CS,K*CS);
  g.setLineDash([lw(8),lw(5)]);g.strokeRect(bx*P*K*CS+lw(2),by*P*K*CS+lw(2),P*K*CS-lw(4),P*K*CS-lw(4));g.restore();}
 for(const k in S.bless||{}){const[bx,by]=k.split(',').map(Number),B=N/BN*CS;g.strokeStyle='rgba(255,215,90,.55)';g.lineWidth=lw(2);g.setLineDash([lw(6),lw(4)]);g.strokeRect(bx*B+lw(2),by*B+lw(2),B-lw(4),B-lw(4));g.setLineDash([]);}
 for(const z of S.bz||[]){g.fillStyle='rgba(200,120,200,.13)';g.strokeStyle='rgba(225,150,225,.8)';g.lineWidth=lw(1.5);g.beginPath();g.arc(z.x*CS+CS/2,z.y*CS+CS/2,z.r*CS,0,7);g.fill();g.stroke();}
 for(const z of S.fz||[]){g.fillStyle='rgba(255,120,50,.14)';g.strokeStyle='rgba(255,140,60,.8)';g.lineWidth=lw(1.5);g.beginPath();g.arc(z.x*CS+CS/2,z.y*CS+CS/2,z.r*CS,0,7);g.fill();g.stroke();}
 for(const z of S.tz||[]){g.fillStyle='rgba(140,120,230,.12)';g.strokeStyle='rgba(170,150,255,.75)';g.lineWidth=lw(1.5);g.beginPath();g.arc(z.x*CS+CS/2,z.y*CS+CS/2,z.r*CS,0,7);g.fill();g.stroke();}
 for(const b of S.dbl){g.fillStyle='rgba(120,200,90,.10)';g.strokeStyle='rgba(140,220,100,.7)';g.lineWidth=lw(1.5);g.beginPath();g.arc(b.x*CS+CS/2,b.y*CS+CS/2,b.r*CS,0,7);g.fill();g.stroke();}
 for(const z of S.cz||[]){const X=z.x*CS+CS/2,Y=z.y*CS+CS/2;
  if(z.k==='tar'){g.fillStyle='rgba(40,30,22,'+Math.min(.75,z.t/1.5)+')';g.beginPath();g.arc(X,Y,z.r*CS,0,7);g.fill();}
  else if(z.k==='bee'){g.fillStyle='rgba(242,194,48,.12)';g.beginPath();g.arc(X,Y,z.r*CS,0,7);g.fill();g.fillStyle='#f2c230';for(let i=0;i<9;i++){const a=i*2.4+S.wt*6,d=z.r*CS*(.25+.6*((i*37)%10)/10);g.fillRect(X+Math.cos(a)*d-1,Y+Math.sin(a)*d-1,2.5,2.5);}}
  else if(z.k==='hive'){g.fillStyle='#d9a02a';g.strokeStyle='#6b4a10';g.lineWidth=lw(1);g.beginPath();g.arc(X,Y,CS*.35,0,7);g.fill();g.stroke();}
  else if(z.k==='rub'){g.fillStyle='#8a8070';for(const[a,b]of[[-.25,-.1],[.2,.05],[0,.25]]){g.beginPath();g.arc(X+a*CS,Y+b*CS,CS*.16,0,7);g.fill();}}}
 for(const t of S.list){if(t.type==='augur'&&t.spec==='lord'&&t.flag){const R=cloudR(t)*CS,X=t.flag.x*CS+CS/2,Y=t.flag.y*CS+CS/2;g.fillStyle='rgba(120,140,170,.22)';g.strokeStyle='rgba(170,190,220,.6)';g.lineWidth=lw(1.5);g.beginPath();g.arc(X,Y,R,0,7);g.fill();g.stroke();if(abRank(t,'drench')){g.strokeStyle='rgba(140,190,255,.45)';g.lineWidth=lw(1);for(let i=0;i<10;i++){const a=i*2.39,d=R*((i*53)%10)/11,yy=Y+Math.sin(a)*d,xx=X+Math.cos(a)*d,o=((S.wt*3+i*.37)%1)*CS*.8;g.beginPath();g.moveTo(xx,yy-CS*.4+o);g.lineTo(xx-CS*.08,yy+o);g.stroke();}}}
  if(t.type==='augur'&&t.spec==='herald'&&S.phase==='wave'){const X=t.x*CS+CS/2,Y=t.y*CS+CS/2;g.strokeStyle='#ffe58a';g.lineWidth=lw(2.5);g.beginPath();g.arc(X,Y,CS*1.1,-Math.PI/2,-Math.PI/2+6.283*(t.ch||0)/HCH);g.stroke();}}
 for(const z of S.cz||[])if(z.k==='fulg'){g.fillStyle='rgba(190,230,255,.28)';g.strokeStyle='rgba(220,245,255,.8)';g.lineWidth=lw(1);g.beginPath();g.arc(z.x*CS+CS/2,z.y*CS+CS/2,z.r*CS,0,7);g.fill();g.stroke();}
 for(const r of S.rolls||[]){g.fillStyle=r.fire?'#c8642a':r.pois?'#7fa04a':'#8f8678';g.strokeStyle='#3a332b';g.lineWidth=lw(1.5);g.beginPath();g.arc(r.x*CS+CS/2,r.y*CS+CS/2,r.r*CS*.8,0,7);g.fill();g.stroke();}
 for(const m of S.mines){g.fillStyle='#3a2a2a';g.strokeStyle='#ff9a5c';g.lineWidth=lw(1.5);g.beginPath();g.arc(m.x*CS+CS/2,m.y*CS+CS/2,CS*.35,0,7);g.fill();g.stroke();}
 for(const t of S.list){if(tinfo(t).aura&&S.phase==='wave'){g.fillStyle='rgba(150,220,255,.10)';g.strokeStyle='rgba(170,230,255,.5)';g.lineWidth=lw(1);g.beginPath();g.arc(t.x*CS+CS/2,t.y*CS+CS/2,stats(t).range*CS,0,7);g.fill();g.stroke();}}
 for(const p of S.pools){g.fillStyle=(p.el==='bleed'?'rgba(224,72,90,':p.el==='fire'?'rgba(255,120,40,':'rgba(123,211,74,')+Math.min(.55,p.t/2)+')';g.beginPath();g.arc(p.x*CS+CS/2,p.y*CS+CS/2,p.r*CS,0,7);g.fill();}
 g.strokeStyle='rgba(192,57,74,.55)';g.lineWidth=lw(2);
 for(const e of S.ends){g.beginPath();g.arc(e.x*CS+CS/2,e.y*CS+CS/2,CS*.9,0,7);g.stroke();}
 if(e2)e2Cars(g,BCS);if(e2)drawShipE2(g,S.core.x*CS+CS/2,S.core.y*CS+CS/2,BCS);else drawShip(g,S.core.x*CS+CS/2,S.core.y*CS+CS/2,BCS);
 drawMimic(g,CS,lw);
 drawCore(g,S.core.x*CS+CS/2,S.core.y*CS+CS/2,BCS);
 for(const t of S.list)if(t.fl&&S.phase==='wave')drawFlame(g,t,x=>x*CS+CS/2,y=>y*CS+CS/2,CS);
 const mst=fxOn('crown')?masterTw():null;
 for(const t of S.list){const T=TW[t.type];
  const fr=t.hero||t.summ?'none':tfrSkin(),mt=t===mst;if(mt)drawHalo(g,t.x*CS+CS/2,t.y*CS+CS/2,BCS);if(fr!=='none')drawTFr(g,t,t.x*CS+CS/2,t.y*CS+CS/2,BCS,fr);
  const X=tinfo(t);g.fillStyle=X.col;g.beginPath();g.arc(t.x*CS+CS/2,t.y*CS+CS/2,BCS*(fr!=='none'?.4:.44),0,7);g.fill();
  g.fillStyle='#14161c';icDraw(g,twIcO(X),t.x*CS+CS/2,t.y*CS+CS/2+1,BCS*.7);
  if(t.flash){g.strokeStyle='#fff';g.lineWidth=lw(3);g.beginPath();g.moveTo(t.x*CS+CS/2,t.y*CS+CS/2);g.lineTo(t.flash.x*CS+CS/2,t.flash.y*CS+CS/2);g.stroke();}
  /* galones de nivel en la esquina superior derecha: uno por nivel (Nv 1-3); Nv 4, tres dorados y estrella; con todo al máximo, estrella dorada */
  if(mt)drawCrown(g,t.x*CS+CS/2,t.y*CS+CS/2,BCS);
  if(!T.uniq||T.glut)drawGal(g,t.x*CS+CS/2+BCS*.4,t.y*CS+CS/2-BCS*.5,BCS,t.lvl,twFull(t),lw);
  if(S.wish&&S.wish.some(w=>w.id===t.id)){g.font=Math.round(BCS*.34)+'px sans-serif';g.fillText('🔖',t.x*CS+CS/2-BCS*.36,t.y*CS+CS/2-BCS*.34);}
  if(t===S.selT){g.strokeStyle='#fff';g.lineWidth=lw(1.5);g.strokeRect((t.x-1)*CS+lw(1),(t.y-1)*CS+lw(1),BCS-lw(2),BCS-lw(2));}
  if(t.rays&&S.phase==='wave'){g.lineWidth=lw(2);for(const r of t.rays)if(r.e.hp>0){g.strokeStyle=r.el.col;g.beginPath();g.moveTo(t.x*CS+CS/2,t.y*CS+CS/2);g.lineTo(r.e.x*CS+CS/2,r.e.y*CS+CS/2);g.stroke();}}
  else if(t.tgt&&S.phase==='wave'&&t.tgt.hp>0){g.strokeStyle=T.col;g.lineWidth=lw(2.5);g.beginPath();g.moveTo(t.x*CS+CS/2,t.y*CS+CS/2);g.lineTo(t.tgt.x*CS+CS/2,t.tgt.y*CS+CS/2);g.stroke();}}
 for(const q of S.fx)if(q.mk){const k=1-q.t/q.m;g.globalAlpha=Math.min(1,q.t/q.m*2);g.font='bold '+Math.round(lw(24))+'px sans-serif,"Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji"';g.textAlign='center';g.textBaseline='middle';g.lineWidth=lw(4);g.strokeStyle='#fff';g.fillStyle='#e8262e';const tx=q.x*CS+CS*1.3,ty=q.y*CS-CS*(.3+k*.9);g.strokeText('!',tx,ty);g.fillText('!',tx,ty);g.globalAlpha=1;}
 for(const q of S.fx)if(q.bolt)drawBolt(g,q,x=>x*CS+CS/2,y=>y*CS+CS/2,lw(2),lw(2.5));
 for(const q of S.fx)if(q.line){g.globalAlpha=Math.max(0,q.t/q.m);g.strokeStyle=q.col;g.lineWidth=lw(6);g.lineCap='round';g.beginPath();g.moveTo(q.line[0]*CS+CS/2,q.line[1]*CS+CS/2);g.lineTo(q.line[2]*CS+CS/2,q.line[3]*CS+CS/2);g.stroke();g.globalAlpha=1;}
 drawDragons();
 for(const q of S.fx)if(q.frag){const k=1-q.t/q.m,px=(q.x0+(q.x-q.x0)*k)*CS+CS/2,py=(q.y0+(q.y-q.y0)*k)*CS+CS/2-Math.sin(k*Math.PI)*CS*2.2,r=CS*(.9-.3*k);g.save();g.translate(px,py);g.rotate(k*6+q.sd*6);g.fillStyle=q.col;g.strokeStyle='#e8a0a8';g.lineWidth=lw(1.5);g.beginPath();g.moveTo(-r,-r*.6);g.lineTo(r*.8,-r);g.lineTo(r,r*.5);g.lineTo(-r*.4,r);g.closePath();g.fill();g.stroke();g.restore();}
 if(OPT.fx)for(const q of S.fx){if(q.mk||q.bolt||q.frag||q.line)continue;g.globalAlpha=Math.max(0,q.t/q.m)*.7;g.fillStyle=q.col;g.beginPath();g.arc(q.x*CS+CS/2,q.y*CS+CS/2,q.r*CS,0,7);g.fill();g.globalAlpha=1;}
 for(const e of S.enemies){const E=ET[e.t],px=e.x*CS+CS/2,py=e.y*CS+CS/2,r=E.r*CS;
  if(E.fly){g.fillStyle='rgba(0,0,0,.28)';g.beginPath();g.ellipse(px,py+r*1.1,r*.9,r*.35,0,0,7);g.fill();const wf=Math.sin(performance.now()/90+e.x)*.35;g.fillStyle=E.col;g.beginPath();g.moveTo(px,py);g.lineTo(px-r*2,py-r*(1.1+wf));g.lineTo(px-r*.6,py+r*.3);g.closePath();g.moveTo(px,py);g.lineTo(px+r*2,py-r*(1.1+wf));g.lineTo(px+r*.6,py+r*.3);g.closePath();g.fill();}
  const sk=e.ps&&e.ps.length,bl=e.bl&&e.bl.length;g.fillStyle=e.fx.freeze?'#cdf2ff':e.fx.stun?'#fff2a0':sk?'#8fc24a':e.bn>=.5?'#ff9a4a':bl?'#d0506a':e.fx.slow?'#7fb4d9':E.col;g.beginPath();g.arc(px,py,r,0,7);g.fill();
  if(enIc(e.t)){g.strokeStyle='#1a1008';g.lineWidth=Math.max(lw(1.2),r*.12);g.stroke();enIcDraw(g,e.t,px,py+r*.04,r*.72);}
  if(e.fx.wet){g.fillStyle='rgba(120,180,255,.9)';g.beginPath();g.arc(px+r*.7,py-r*.7,r*.35,0,7);g.fill();}
  if(e.fx.hex){g.strokeStyle='rgba(165,139,255,.9)';g.lineWidth=lw(2);g.beginPath();g.arc(px,py,r+lw(3.5),0,7);g.stroke();}
  if(e.fx.poly){g.font=Math.round(r*2.2)+'px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('🐸',px,py+1);}
  if(e.fx.fear){g.fillStyle='#e8ecff';g.font='bold '+Math.round(lw(11))+'px sans-serif,"Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji"';g.textAlign='center';g.textBaseline='bottom';g.fillText('!',px+r,py-r);}
  if(e.cb>0){g.strokeStyle='#aab0bd';g.lineWidth=lw(2);g.beginPath();g.arc(px,py,r+lw(E.el?4:2),0,7);g.stroke();}
  if(E.el){g.strokeStyle='#f0b429';g.lineWidth=lw(2);g.beginPath();g.arc(px,py,r+lw(2),0,7);g.stroke();}
  if(S.fury){const pu=.45+.35*Math.sin(performance.now()/160+e.x);g.strokeStyle='rgba(255,60,40,'+pu+')';g.lineWidth=lw(2.5);g.beginPath();g.arc(px,py,r+lw(5),0,7);g.stroke();}
  {const mk=emarks(e);if(mk){g.fillStyle='#e8f2c8';g.font='bold '+Math.round(lw(10))+'px sans-serif,"Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji"';g.textAlign='center';g.textBaseline='bottom';g.fillText(mk,px,py-r-lw(5));}}
  const bw=Math.max(r*2.2,lw(8)),bh=lw(2.5);g.fillStyle='#000';g.fillRect(px-bw/2,py-r-lw(4),bw,bh);g.fillStyle='#6fe07a';g.fillRect(px-bw/2,py-r-lw(4),bw*Math.max(0,e.hp/e.max),bh);}
 if(OPT.dnum&&S.dn&&S.dn.length){g.textAlign='center';g.textBaseline='bottom';g.lineJoin='round';
  for(const d of S.dn){if(d.sh<.5)continue;const a=d.idle<.6?1:Math.max(0,1-(d.idle-.6)/.5),cr=d.crit>0,sz=lw(cr?19:14),rise=lw(Math.min(14,d.age*10));
   const px=d.x*CS+CS/2,py=d.y*CS+CS/2-d.r*CS-lw(18)-d.i*lw(15)-rise,txt=fmtD(d.sh)+(cr?'!':'');
   g.globalAlpha=a;g.font='bold '+sz+'px "Trebuchet MS",sans-serif,"Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji"';g.lineWidth=lw(3);g.strokeStyle='rgba(10,12,16,.9)';g.strokeText(txt,px,py);g.fillStyle=DNC[d.key]||'#fff';g.fillText(txt,px,py);}
  g.globalAlpha=1;}
 // portales encima de los enemigos: salen «de debajo» y el portal siempre se ve y se puede pulsar
 for(const p of S.portals){const px=p.x*CS+CS/2,py=p.y*CS+CS/2,R=CS*1.35;g.fillStyle='#c8303f';g.beginPath();g.arc(px,py,R,0,7);g.fill();g.strokeStyle='#ffb0b8';g.lineWidth=lw(2.5);g.stroke();
  if(SKULL.complete&&SKULL.naturalWidth){const z=R*1.35;g.drawImage(SKULL,px-z/2,py-z/2,z,z);}}
 if(S.aim==='flag'&&S.aimT&&S.list.includes(S.aimT)){const t=S.aimT,R2=stats(t).range;g.fillStyle='rgba(90,180,255,.12)';g.strokeStyle='rgba(110,190,255,.9)';g.lineWidth=lw(1.5);g.beginPath();g.arc(t.x*CS+CS/2,t.y*CS+CS/2,R2*CS,0,7);g.fill();g.stroke();
  const r=Math.ceil(R2);for(let y=Math.max(0,t.y-r);y<=Math.min(N-1,t.y+r);y++)for(let x=Math.max(0,t.x-r);x<=Math.min(N-1,t.x+r);x++)if(S.cells[y][x]===2&&Math.hypot(x-t.x,y-t.y)<=R2){g.fillStyle='rgba(91,141,239,.45)';g.fillRect(x*CS,y*CS,CS,CS);if(h&&h.x===x&&h.y===y){g.fillStyle='rgba(255,255,255,.85)';g.beginPath();g.arc(x*CS+CS/2,y*CS+CS/2,CS*.48,0,7);g.fill();}}}
 if(S.selE&&PR.pinned&&PR.key&&PR.key.startsWith('ei:')&&S.enemies.includes(S.selE)){const q=S.selE,A=ET[q.t].aura,px=q.x*CS+CS/2,py=q.y*CS+CS/2;
  g.strokeStyle='#fff';g.lineWidth=lw(1.5);g.beginPath();g.arc(px,py,ET[q.t].r*CS+lw(5),0,7);g.stroke();
  if(A){g.fillStyle='rgba(170,176,189,.18)';g.strokeStyle='rgba(200,205,215,.9)';g.beginPath();g.arc(px,py,A.r*CS,0,7);g.fill();g.stroke();}}
 drawUnits(g,S,CS,0,0,lw);
 try{drawHeroSay(g,lw);}catch(e){}
 drawHammers();
 drawHeroAb(lw);drawMecha(lw);
 drawLogs(lw);
 for(const o of S.gorbs||[]){const pu=.75+.25*Math.sin(performance.now()/260+o.x),r=CS*(.3+Math.min(.3,o.v*.04))*pu,px=o.x*CS+CS/2,py=o.y*CS+CS/2;g.fillStyle='rgba(255,215,90,.25)';g.beginPath();g.arc(px,py,r*2,0,7);g.fill();g.fillStyle='#ffd84a';g.beginPath();g.arc(px,py,r,0,7);g.fill();}
 for(const o of S.orbs||[]){const r=CS*(.35+Math.min(.6,o.v*.05)),px=o.x*CS+CS/2,py=o.y*CS+CS/2;g.fillStyle='rgba(255,215,90,.35)';g.beginPath();g.arc(px,py,r*1.8,0,7);g.fill();g.fillStyle='#ffe27a';g.beginPath();g.arc(px,py,r,0,7);g.fill();}
 if(S.hero){const H=S.hero,q=H.s,sel=S.aim==='hero',now=performance.now(),ga=sel?1:Math.max(0,1-(now-(H.xpT||0))/1100),lf=Math.max(0,1-(now-(H.lvT||0))/700);
  const hov=!sel&&!S.aim&&S.hover&&heroAt(S.hover);/* al pasar el ratón por encima, también: su rango (a distancia) o la distancia a la que sale a pelear (cuerpo a cuerpo) */
  if((sel&&H.def.ranged||hov)&&q.hp>0){const R=H.def.ranged?hsAt(H.id,H.lvl).range:(H.pt&&H.pt.alert||ALERT);g.fillStyle='rgba(90,180,255,.10)';g.strokeStyle='rgba(110,190,255,.85)';g.lineWidth=lw(1.5);g.beginPath();g.arc(q.x*CS+CS/2,q.y*CS+CS/2,R*CS,0,7);g.fill();g.stroke();}
  if((ga>0||lf>0)&&q.hp>0){const r=CS*.85,bw=r*2.2,bh=lw(2.5),px=q.x*CS+CS/2,py=q.y*CS+CS/2-r-lw(4)+bh+lw(1.5),need=H.lvl>=HLMAX?1:xpNeed(H.lvl+1),fr=H.lvl>=HLMAX?1:Math.min(1,H.xp/need);
   g.globalAlpha=Math.max(ga,lf);g.fillStyle='#000';g.fillRect(px-bw/2,py,bw,bh);g.fillStyle=lf>0?'#fff6c0':'#ffd75a';g.fillRect(px-bw/2,py,bw*(lf>0?1:fr),bh);g.globalAlpha=1;}}
 for(const p of S.proj){const px=p.x*CS+CS/2,py=p.y*CS+CS/2;
  if(p.orb){drawOrbP(g,px,py,p.orb,CS*K,p.col);continue;}
  
  g.strokeStyle=p.col;g.lineWidth=lw(2);g.beginPath();g.moveTo(px-p.vx*CS*.9,py-p.vy*CS*.9);g.lineTo(px,py);g.stroke();
  g.fillStyle=p.col;g.beginPath();g.arc(px,py,lw(p.area?3.5:2.5),0,7);g.fill();}
 if(h&&S.aim==='hero'&&inb(h.x,h.y)&&S.cells[h.y][h.x]===2){g.fillStyle='rgba(255,255,255,.85)';g.beginPath();g.arc(h.x*CS+CS/2,h.y*CS+CS/2,CS*.48,0,7);g.fill();}
 if(S.aim==='barricade'){const pc=(a,b)=>inbc(a,b)&&S.cc[b][a]===2;g.fillStyle='rgba(230,60,60,.45)';for(let y=0;y<NC;y++)for(let x=0;x<NC;x++)if(pc(x,y)&&pc(x-1,y)+pc(x+1,y)+pc(x,y-1)+pc(x,y+1)>=3)g.fillRect(x*K*CS,y*K*CS,K*CS,K*CS);
  if(h)drawBarr(barrPick(h.x,h.y),.65);}
 if(h&&S.aim==='balance'){g.fillStyle='rgba(200,120,200,.2)';g.strokeStyle='rgba(225,150,225,.95)';g.lineWidth=lw(1.5);g.beginPath();g.arc(h.x*CS+CS/2,h.y*CS+CS/2,3*K*CS,0,7);g.fill();g.stroke();}
 if(h&&S.aim==='tome'){g.fillStyle='rgba(140,120,230,.2)';g.strokeStyle='rgba(170,150,255,.95)';g.lineWidth=lw(1.5);g.beginPath();g.arc(h.x*CS+CS/2,h.y*CS+CS/2,TZR*CS,0,7);g.fill();g.stroke();}
 if(h&&S.aim==='quiver'){g.fillStyle='rgba(120,200,90,.18)';g.strokeStyle='rgba(140,220,100,.9)';g.lineWidth=lw(1.5);g.beginPath();g.arc(h.x*CS+CS/2,h.y*CS+CS/2,QR*CS,0,7);g.fill();g.stroke();}
 if(h&&S.aim==='ember'){g.fillStyle='rgba(255,120,50,.2)';g.strokeStyle='rgba(255,140,60,.95)';g.lineWidth=lw(1.5);g.beginPath();g.arc(h.x*CS+CS/2,h.y*CS+CS/2,EMR*CS,0,7);g.fill();g.stroke();}
 if(h&&S.aim==='harpoon'){g.fillStyle='rgba(120,180,230,.2)';g.strokeStyle='rgba(140,200,240,.9)';g.lineWidth=lw(1.5);g.beginPath();g.arc(h.x*CS+CS/2,h.y*CS+CS/2,HARPR*CS,0,7);g.fill();g.stroke();}
 if(h&&S.aim==='frost'){g.fillStyle='rgba(150,220,255,.22)';g.strokeStyle='rgba(170,230,255,.9)';g.lineWidth=lw(1.5);g.beginPath();g.arc(h.x*CS+CS/2,h.y*CS+CS/2,FRZR*CS,0,7);g.fill();g.stroke();}
 if(h&&S.phase==='place'&&!S.aim&&S.pi!=null){const bx=Math.floor(h.x/(P*K)),by=Math.floor(h.y/(P*K));
  if(bx>=0&&by>=0&&bx<BN&&by<BN&&!S.blocks[bx+','+by]){
   const o=S.offers[S.pi],ok=check(bx,by,o.p)===0;
   drawPat(g,o,BCS,bx*P*BCS,by*P*BCS,.85);
   g.fillStyle=ok?'rgba(80,220,120,.22)':'rgba(230,70,70,.4)';g.fillRect(bx*P*BCS,by*P*BCS,P*BCS,P*BCS);
   g.strokeStyle=ok?'#50dc78':'#e64646';g.lineWidth=lw(2);g.strokeRect(bx*P*BCS+lw(1),by*P*BCS+lw(1),P*BCS-lw(2),P*BCS-lw(2));}}
 try{if(typeof e2DrawWorld==='function')e2DrawWorld(lw);if(typeof bufoDraw==='function')bufoDraw(lw);if(typeof vegaDraw==='function')vegaDraw(lw);}catch(e){}
 g.setTransform(1,0,0,1,0,0);
 $('sr').textContent='⏳ Ronda '+Math.min(S.round,ROUNDS)+'/'+ROUNDS+((S.phase==='build'||S.phase==='wave')&&S.portals&&S.portals.length?'  ·  ⭕ '+S.portals.length:'')+(S.fury?'  ·  💢 Furia ×'+String(furyM()).replace('.',','):'');$('sr').title=S.fury?'Furia: todos ganan daño mientras dure la oleada':'⭕ Portales activos esta ronda';{const a=$('stR'),b=$('stC');a.style.display=OPT.treal?'':'none';b.style.display=OPT.tcomb?'':'none';if(OPT.treal)a.textContent='🕒 '+fClk(GT.r);if(OPT.tcomb)b.textContent='⚔️ '+fClk(GT.c);}$('sh').textContent=(S.hp<=10?'💔':'❤️')+' Vida '+S.hp;{const iv=S.relics&&S.relics.includes('scale')?interest():0,h='🪙 Oro '+Math.floor(S.gold)+(iv>0?' <span class="sgint">+'+iv+'</span>':'');if($('sg')._h!==h){$('sg').innerHTML=h;$('sg')._h=h;}}
}
