// vista previa del héroe en la pantalla de selección (Guerreros y algún Tanque)
function hpkPrevStep(rdt){
 if(!(RL.open&&RL.hpick&&PHV&&PHV.id===RL.hsel&&PHV.pick)||!document.getElementById('pvc'))return;
 const real=S,_ui=ui;S=PHV.S;ui=function(){};
 try{const H=S.hero;PHV.rt-=rdt;if(PHV.rt<=0&&S.enemies.length<8){PHV.n=(PHV.n||0)+1;const t=PHV.n%5===0?'tank':'norm',E=ET[t],hp=HP0*hpR(S.round)*E.hp;S.enemies.push({t,x:PHV.sx,y:PVY,tx:PHV.sx,ty:PVY,hp,max:hp,fx:{},src:null});PHV.rt=1.1;}
  update(rdt);S.phase='wave';S.hp=1e9;H.xp=0;H.s.x=H.pt.flag.x;H.s.y=H.pt.flag.y;
  if(H.s.hp<=0){H.s.hp=H.s.max;H.s.rt=0;H.s.en=null;H.s.fight=false;}
  dnTick(rdt);}finally{S=real;ui=_ui;}
 // nitidez: el lienzo se dibuja a la resolución real de la caja, con una vista recortada (escala k sobre la vista del compendio)
 const cv=document.getElementById('pvc'),bx=cv.parentElement.getBoundingClientRect(),dpr=window.devicePixelRatio||1,W=Math.max(50,Math.round(bx.width*dpr)),Hh=Math.max(50,Math.round(bx.height*dpr));
 if(cv.width!==W||cv.height!==Hh){cv.width=W;cv.height=Hh;}const c=cv.getContext('2d'),v=PHV.vw,k=Hh/(v.h*PVC);
 c.setTransform(1,0,0,1,0,0);c.fillStyle='#2e3441';c.fillRect(0,0,W,Hh);
 c.setTransform(k,0,0,k,W/2-(v.cx-PVX)*PVC*k,Hh/2-(v.cy-PVY)*PVC*k);
 const keep=PE;PE={S:PHV.S};try{drawEPrev();}finally{PE=keep;}
 if(PHV.rg){const H=PHV.S.hero,r=hsAt(H.id,1).range;c.fillStyle='rgba(90,180,255,.10)';c.strokeStyle='rgba(110,190,255,.85)';c.lineWidth=1.5/k*dpr;c.beginPath();c.arc((H.s.x-PVX+.5)*PVC,(H.s.y-PVY+.5)*PVC,r*PVC,0,7);c.fill();c.stroke();}
 c.setTransform(1,0,0,1,0,0);}
function prevStep(rdt){
 ePrevStep(rdt);hPrevStep(rdt);
 if(!(CP.open&&CP.prev&&PV&&PV.k===CP.prev))return;
 const real=S,_ui=ui;S=PV.S;ui=function(){};
 try{
  PV.rt-=rdt;if(PV.rt<=0&&S.enemies.length<14){const E=ET[PV.en],hp=HP0*E.hp;S.enemies.push({t:PV.en,x:PVCX,y:PVY,tx:PVCX,ty:PVY,hp,max:hp,fx:{},src:null});PV.rt=.8/(S.espd||1);}
  update(rdt);S.phase='wave';S.hp=1e9;
 }finally{S=real;ui=_ui;}
 drawPrev();
}
// ¿el clic cae sobre el héroe?
function heroAt(c){const H=S&&S.hero;if(!H||H.s.hp<=0||!c)return false;return Math.hypot(c.fx-.5-H.s.x,c.fy-.5-H.s.y)<=1.35;}
// bocadillo del héroe al moverlo
const HSAY={_:['¡Voy para allá!','¡Marchando!','¡En camino!','¡A la orden!','¡Entendido!'],reinhart:['¡Por el reino!','¡Mantened la línea!','¡Allá voy!'],sylvana:['Con paso ligero.','El bosque me guía.','Sin hacer ruido…'],radagast:['La magia me lleva.','Un mago nunca llega tarde.','¡Allá voy, allá voy!'],yrsa:['¡Que tiemblen!','¡A por ellos!','Voy a buscar pelea.']};
function heroSay(fr,to){const H=S.hero;if(!H)return;const cd=(a,b)=>Math.hypot(a.x-S.core.x,a.y-S.core.y),L=[...HSAY._,...(HSAY[H.id]||[])];
 const back=cd(to)<cd(fr)-2*K&&Math.random()<.5;S.hsay={txt:back?'¡Retirada!':L[Math.floor(Math.random()*L.length)],t0:performance.now()};}
function drawHeroSay(g,lw){const q=S.hsay,H=S.hero;if(!q||!H||H.s.hp<=0)return;const el=(performance.now()-q.t0)/1000;if(el>1.7){S.hsay=null;return;}
 const a=el<.12?el/.12:el>1.4?Math.max(0,(1.7-el)/.3):1,px=H.s.x*CS+CS/2,py=H.s.y*CS+CS/2-CS*1.05-lw(10)-(el<.12?(1-a)*lw(6):0);
 g.save();g.globalAlpha=a;g.font='700 '+lw(13)+'px system-ui,sans-serif';g.textAlign='center';g.textBaseline='middle';const w=g.measureText(q.txt).width+lw(16),hh=lw(24),x0=px-w/2,y0=py-hh;
 g.fillStyle='rgba(255,255,255,.96)';g.strokeStyle='rgba(20,22,28,.55)';g.lineWidth=lw(1.2);g.beginPath();if(g.roundRect)g.roundRect(x0,y0,w,hh,lw(8));else g.rect(x0,y0,w,hh);g.fill();g.stroke();
 g.beginPath();g.moveTo(px-lw(6),py-lw(.5));g.lineTo(px,py+lw(7));g.lineTo(px+lw(6),py-lw(.5));g.closePath();g.fill();
 g.fillStyle='#1b1e26';g.fillText(q.txt,px,y0+hh/2+lw(.5));g.restore();}
// retrato del héroe como imagen para dibujarlo en el mapa
const HIMG={};function heroImg(id){if(HIMG[id])return HIMG[id];const im=new Image();try{const u=++PUID;let s=PORT[id].replace(/@U/g,u);im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="${PCROP[id]||'0 0 120 120'}">${s}</svg>`);}catch(e){}return HIMG[id]=im;}
// galones de nivel (mapa): cx,top = centro arriba; u = tamaño de la torre
const twFull=t=>t.lvl>=4&&!!t.spec&&!!SPECS[t.type]&&!!SPECS[t.type][t.spec]&&(SPECS[t.type][t.spec].ab||[]).every(k=>AB[k]&&(t.ab&&t.ab[k]||0)>=AB[k].ranks.length);
function starPath(c,cx,cy,R){c.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?R*.45:R;c.lineTo(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr);}c.closePath();}
function drawGal(c,cx,top,u,lv,mx,lw){lw=lw||(v=>v);const n=Math.min(3,lv),w=u*.26,hh=u*.12,gap=u*.11,gold=lv>=4;c.lineJoin='round';c.lineCap='round';
 for(let i=0;i<n;i++){const y=top+i*gap;c.beginPath();c.moveTo(cx-w/2,y+hh);c.lineTo(cx,y);c.lineTo(cx+w/2,y+hh);c.strokeStyle='#14161c';c.lineWidth=Math.max(lw(2.4),u*.08);c.stroke();c.strokeStyle=gold?'#ffd84a':'#fff';c.lineWidth=Math.max(lw(1.1),u*.04);c.stroke();}
 if(lv>=4){starPath(c,cx,top+(n-1)*gap+hh+u*.13,u*.12);c.fillStyle=mx?'#ffd84a':'#fff';c.fill();c.strokeStyle='#14161c';c.lineWidth=Math.max(lw(1.1),u*.035);c.stroke();}}
// galones en la interfaz: dorados con borde oscuro (SVG con margen para que nada se corte), con bocadillo «Nv N»
function galSvg(lv,mx,sc,notip){sc=sc||1;const n=Math.min(3,Math.max(1,lv)),h=4+6+(n-1)*6+(lv>=4?13:0)+4;let d='';for(let i=0;i<n;i++){const y=4+i*6;d+=`M3 ${y+6} L10 ${y} L17 ${y+6} `;}
 let st='';if(lv>=4){const sy=4+(n-1)*6+6+7.5;let p=[];for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,r=i%2?2.5:5.6;p.push((10+Math.cos(a)*r).toFixed(1)+','+(sy+Math.sin(a)*r).toFixed(1));}
  st=`<polygon points="${p.join(' ')}" fill="${mx?'#ffd84a':'#fff3c4'}" stroke="#2a1a0c" stroke-width="1.3" stroke-linejoin="round"/>`;}
 return `<span class="gal"${notip?'':` data-tip="nv:${lv}${mx?'m':''}"`}><svg viewBox="0 0 20 ${h}" width="${(20*sc).toFixed(1)}" height="${(h*sc).toFixed(1)}"><path d="${d}" fill="none" stroke="#2a1a0c" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#ffcf3a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>${st}</svg></span>`;}
// iconos compuestos: uno delante y otro detrás ({f,b}); sirven para torres (icb) y unidades
function icDraw(c,ic,x,y,sz){c.textAlign='center';c.textBaseline='middle';if(ic&&typeof ic==='object'){c.font=Math.round(sz*1.05)+'px sans-serif';c.fillText(ic.b,x+sz*.08,y-sz*.04);c.font=Math.round(sz*(ic.fs||.72))+'px sans-serif';if(ic.fr){c.save();c.translate(x-sz*.04,y+sz*.04);c.rotate(ic.fr*Math.PI/180);c.fillText(ic.f,0,0);c.restore();}else c.fillText(ic.f,x-sz*.06,y+sz*.08);}else{c.font=Math.round(sz)+'px sans-serif';c.fillText(ic,x,y);}}
function icHtml(ic){return ic&&typeof ic==='object'?`<span class="icst"><span class="icb">${ic.b}</span><span class="icf"${ic.fs||ic.fr?` style="transform:translate(-6%,8%) scale(${ic.fs||.72})${ic.fr?` rotate(${ic.fr}deg)`:''}"`:''}>${ic.f}</span></span>`:ic;}
const twIcO=X=>X&&X.icb?{f:X.ic,b:X.icb}:X.ic,twIc=k=>icHtml(twIcO(TW[k]));
// icono de cada unidad (por torre y especialización): círculo con su icono, como el héroe
const UIC={bastion:{f:'🗡️',b:'🛡️',fs:.9},monk:'🧘',guild:{b:'🪙',f:'🗡️',fs:.85,fr:180},dragon:'🐲',pal:'⚜️',ass:'🗡️',fist:'🥋',drunk:'🍶'};
const unitIc=t=>UIC[t.spec]||UIC[t.type]||null;
function drawUnits(c,s,cs,ox,oy,lw){
 lw=lw||(v=>v);
 for(const t of unitTs(s)){
  if(t.flag&&!t.hero&&!t.merc&&!t.summ){const fx=ox+t.flag.x*cs+cs/2,fy=oy+t.flag.y*cs+cs/2;
   if(s.selT===t||s.aimT===t){c.strokeStyle='rgba(91,141,239,.7)';c.setLineDash([lw(4),lw(4)]);c.lineWidth=lw(1.5);c.beginPath();c.moveTo(ox+t.x*cs+cs/2,oy+t.y*cs+cs/2);c.lineTo(fx,fy);c.stroke();c.setLineDash([]);}
   const hv=s===S&&!MFSQ()&&S.hover&&S.occ[S.hover.x+','+S.hover.y]===t;if(s!==S||s.selT===t||s.aimT===t||hv){c.font=Math.round(cs*1.6)+'px sans-serif';c.textAlign='center';c.textBaseline='bottom';c.fillStyle='#fff';c.fillText('🚩',fx,fy+cs*.5);}}
  const MK=TW[t.type]&&TW[t.type].monk;
  for(const q of t.sd){if(q.hp<=0){if(q.H&&s===S){const px=ox+q.x*cs+cs/2,py=oy+q.y*cs+cs/2,r=cs*1.05,im=heroImg(q.H.id);c.save();c.globalAlpha=.75;c.fillStyle='#3a3d45';c.beginPath();c.arc(px,py,r,0,7);c.fill();
     if(im.complete&&im.naturalWidth){c.beginPath();c.arc(px,py,r,0,7);c.clip();try{c.filter='grayscale(1) brightness(.75)';}catch(e){}c.drawImage(im,px-r,py-r,r*2,r*2);try{c.filter='none';}catch(e){}}c.restore();
     c.strokeStyle='#8a8f9c';c.lineWidth=lw(2.5);c.beginPath();c.arc(px,py,r,0,7);c.stroke();
     const n=Math.ceil(q.H.s.rt||q.rt||0);if(n>0){c.font='800 '+Math.round(r*1.1)+'px system-ui,sans-serif';c.textAlign='center';c.textBaseline='middle';c.lineWidth=lw(3);c.strokeStyle='rgba(0,0,0,.8)';c.strokeText(n,px,py+1);c.fillStyle='#fff';c.fillText(n,px,py+1);}}
    continue;}const wb=q.drunk>0?Math.sin(performance.now()/110+q.i)*cs*.18:0,px=ox+q.x*cs+cs/2+wb,py=oy+q.y*cs+cs/2,r=q.H?cs*1.05:q.mech?cs*1.5:q.pig?cs*.75:q.beast?cs*(q.beast==='bear'?.95:.75):cs*.5;
   if(MK){c.fillStyle=tinfo(t).col;for(const sd of[-1,1]){c.beginPath();c.moveTo(px+sd*r*.55,py-r*.45);c.lineTo(px+sd*r*1.45,py-r*.95);c.lineTo(px+sd*r*.85,py-r*.05);c.closePath();c.fill();}}
   c.fillStyle=q.H?q.H.def.col:tinfo(t).col;c.beginPath();c.arc(px,py,r,0,7);c.fill();
   if(q.H){const im=heroImg(q.H.id);if(im.complete&&im.naturalWidth){c.save();c.beginPath();c.arc(px,py,r,0,7);c.clip();c.drawImage(im,px-r,py-r,r*2,r*2);c.restore();}else{c.font=Math.round(r*1.5)+'px sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillStyle='#14161c';c.fillText(q.H.def.ic,px,py+1);}
    c.strokeStyle=q.H.def.col;c.lineWidth=lw(3);c.beginPath();c.arc(px,py,r,0,7);c.stroke();c.strokeStyle='rgba(0,0,0,.55)';c.lineWidth=lw(1);c.beginPath();c.arc(px,py,r+lw(2),0,7);c.stroke();}
   else{c.strokeStyle='#cfe0ff';c.lineWidth=lw(1.5);c.stroke();if(!q.mech&&!q.pig&&!q.beast){const ui=unitIc(t);if(ui){c.fillStyle='#14161c';icDraw(c,ui,px,py+1,r*1.45);}}}
   if(q.mech){const cl=['#e8cf6a','#a8743a','#c0563a'];for(let i=0;i<3;i++){c.fillStyle=cl[i];c.beginPath();c.moveTo(px,py);c.arc(px,py,r,i*2.094-1.571,(i+1)*2.094-1.571);c.closePath();c.fill();}c.strokeStyle='#ffe0b0';c.lineWidth=lw(2.5);c.beginPath();c.arc(px,py,r,0,7);c.stroke();c.font=Math.round(r*1.2)+'px sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillText('🐷',px,py+1);}
   if(q.pig){c.font=Math.round(r*1.6)+'px sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillText(PIGU[q.pig].ic,px,py+1);}
   if(q.beast){c.font=Math.round(r*1.9)+'px sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillStyle='#fff';c.fillText((BEASTS[q.beast]||SPECT[q.beast]).ic,px,py+1);}
   if(q.drunk>0){c.font=Math.round(r*1.1)+'px sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillText('🍶',px+r*.9,py-r*.9);}
   if(q.hp<q.max){const bw=r*2.2,bh=lw(2.5);c.fillStyle='#000';c.fillRect(px-bw/2,py-r-lw(4),bw,bh);c.fillStyle='#6fe07a';c.fillRect(px-bw/2,py-r-lw(4),bw*Math.max(0,q.hp/q.max),bh);}}}
}
function drawPrev(){
 const cv2=document.getElementById('pvc');if(!cv2||!PV)return;const c=cv2.getContext('2d'),s=PV.S,T=TW[PV.k],tw=s.list[0];
 const X=x=>(x-PVX+.5)*PVC,Y=y=>(y-PVY+.5)*PVC;
c.fillStyle="#2e3441";c.fillRect(0,0,PVN*PVC,PVN*PVC);
 for(let y=0;y<PVN;y++)for(let x=0;x<PVN;x++){c.fillStyle=s.cells[PVY+y][PVX+x]===2?'#a8854a':'#2e3441';c.fillRect(x*PVC,y*PVC,PVC,PVC);}
 c.fillStyle='#3dd6c4';c.fillRect(X(s.core.x)-PVC*1.2,Y(s.core.y)-PVC*1.2,PVC*2.4,PVC*2.4);
 c.fillStyle='rgba(90,180,255,.15)';c.strokeStyle='rgba(110,190,255,.9)';c.lineWidth=1.5;c.beginPath();c.arc(X(tw.x),Y(tw.y),(T.uniq?(()=>{const r=S;S=s;try{return stats(tw).range;}catch(e){return T.range;}finally{S=r;}})():T.range*lvMods(PV.k,tw.lvl,tw.spec).range)*PVC,0,7);c.fill();c.stroke();
 for(const m of s.mines){c.fillStyle='#3a2a2a';c.strokeStyle='#ff9a5c';c.lineWidth=2;c.beginPath();c.arc(X(m.x),Y(m.y),PVC*.5,0,7);c.fill();c.stroke();}
 for(const p of s.pools){c.fillStyle=p.el==='bleed'?'rgba(224,72,90,.28)':p.el==='fire'?'rgba(255,120,40,.3)':'rgba(123,211,74,.28)';c.strokeStyle=p.el==='bleed'?'rgba(240,100,110,.8)':p.el==='fire'?'rgba(255,160,70,.85)':'rgba(150,230,90,.8)';c.beginPath();c.arc(X(p.x),Y(p.y),p.r*PVC,0,7);c.fill();c.stroke();}
 drawFlame(c,tw,X,Y,PVC);
 c.fillStyle=tinfo(tw).col;c.beginPath();c.arc(X(tw.x),Y(tw.y),PVC*1.35,0,7);c.fill();
 c.fillStyle='#14161c';icDraw(c,twIcO(tinfo(tw)),X(tw.x),Y(tw.y)+1,PVC*2);
 if(tw.rays){c.lineWidth=2;for(const r of tw.rays)if(r.e.hp>0){c.strokeStyle=r.el.col;c.beginPath();c.moveTo(X(tw.x),Y(tw.y));c.lineTo(X(r.e.x),Y(r.e.y));c.stroke();}}
 else if(tw.tgt&&tw.tgt.hp>0){c.strokeStyle=T.col;c.lineWidth=3;c.beginPath();c.moveTo(X(tw.x),Y(tw.y));c.lineTo(X(tw.tgt.x),Y(tw.tgt.y));c.stroke();}
 for(const q of s.fx)if(q.bolt)drawBolt(c,q,X,Y,2,3);
 for(const q of s.fx){if(q.bolt||q.frag)continue;if(q.mk){const k=1-q.t/q.m;c.globalAlpha=Math.min(1,q.t/q.m*2);c.font='bold 20px sans-serif,"Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji"';c.textAlign='center';c.textBaseline='middle';c.lineWidth=3;c.strokeStyle='#fff';c.fillStyle='#e8262e';const tx=X(q.x)+12,ty=Y(q.y)-8-k*14;c.strokeText('!',tx,ty);c.fillText('!',tx,ty);c.globalAlpha=1;continue;}c.globalAlpha=Math.max(0,q.t/q.m)*.7;c.fillStyle=q.col;c.beginPath();c.arc(X(q.x),Y(q.y),q.r*PVC,0,7);c.fill();c.globalAlpha=1;}
 for(const b of s.barr||[]){if(!b.poly)continue;c.save();c.beginPath();b.poly.forEach((p,i)=>i?c.lineTo((p[0]-PVX)*PVC,(p[1]-PVY)*PVC):c.moveTo((p[0]-PVX)*PVC,(p[1]-PVY)*PVC));c.closePath();c.fillStyle=b.brick?'#b0503a':'#8a5a2b';c.fill();c.strokeStyle='#f0c040';c.lineWidth=2;c.stroke();c.restore();}
 for(const L of s.logs||[]){if(L.x===undefined)continue;c.save();c.translate(X(L.x),Y(L.y));c.rotate(L.ang+Math.PI/2);const len=K*PVC*.86,th=K*PVC*.32;c.fillStyle='#8a5a2b';c.fillRect(-len/2,-th/2,len,th);c.strokeStyle='#5a3a1a';c.lineWidth=1.5;c.strokeRect(-len/2,-th/2,len,th);c.restore();}
 drawUnits(c,s,PVC,-PVX*PVC,-PVY*PVC);
 for(const t of s.list){if(!t.fly||t.fly.x===undefined)continue;const px=X(t.fly.x),py=Y(t.fly.y);c.fillStyle='rgba(0,0,0,.25)';c.beginPath();c.ellipse(px,py+PVC*1.6,PVC*1.2,PVC*.5,0,0,7);c.fill();if(t.stage>=3){c.fillStyle='rgba(255,110,40,.25)';c.beginPath();c.arc(px,py,PVC*2,0,7);c.fill();}c.font=Math.round(PVC*(t.stage>=3?3.3:2.6))+'px sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillText('🐉',px,py);}
 for(const e of s.enemies){const E=ET[e.t],px=X(e.x),py=Y(e.y),r=E.r*PVC,sk=e.ps&&e.ps.length;
  const bl=e.bl&&e.bl.length;c.fillStyle=e.fx.freeze?'#cdf2ff':e.fx.stun?'#fff2a0':sk?'#8fc24a':e.bn>=.5?'#ff9a4a':bl?'#d0506a':e.fx.slow?'#7fb4d9':E.col;c.beginPath();c.arc(px,py,r,0,7);c.fill();
  if(E.el){c.strokeStyle='#f0b429';c.lineWidth=2;c.beginPath();c.arc(px,py,r+2,0,7);c.stroke();}
  c.fillStyle='#000';c.fillRect(px-r,py-r-6,2*r,3);c.fillStyle='#6fe07a';c.fillRect(px-r,py-r-6,2*r*Math.max(0,e.hp/e.max),3);
  {const mk=emarks(e);if(mk){c.fillStyle='#e8f2c8';c.font='bold 10px sans-serif,"Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji"';c.textBaseline='bottom';c.fillText(mk,px,py-r-7);}}}
 for(const p of s.proj){const px=X(p.x),py=Y(p.y);if(p.orb){drawOrbP(c,px,py,p.orb,PVC*K,p.col);continue;}c.strokeStyle=p.col;c.lineWidth=3;c.beginPath();c.moveTo(px-p.vx*PVC*.6,py-p.vy*PVC*.6);c.lineTo(px,py);c.stroke();c.fillStyle=p.col;c.beginPath();c.arc(px,py,p.area?4:3,0,7);c.fill();}
}
function toggleComp(v){const on=v===undefined?!(LB.open&&!LB.cover&&CP.open):v;CP.solo=false;CP.prev=null;PV=null;CP.eprev=null;PE=null;CP.hprev=null;PHV=null;if(on)lbOpen(CP.tab==='lg'?'lg':'cp');else lbClose();}
