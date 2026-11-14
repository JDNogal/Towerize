// ---- previsualización de torres (mini-partida independiente con un solo enemigo) ----
// prepara una torre de evento en la previsualización (nivel/forma elegidos en el compendio)
function uPrevFix(st,k){const T=TW[k],cur=(CP.ulv&&CP.ulv[k])||1,tw=st.list[0];if(!tw)return;const real=S;S=st;
 if(!st.cc){st.cc=Array.from({length:NC},()=>Array(NC).fill(0));for(let y=PVY;y<PVY+PVN;y++)for(let x=PVX;x<PVX+PVN;x++){const ky=Math.floor(y/K),kx=Math.floor(x/K);if(st.cells[y][x]===2)st.cc[ky][kx]=2;else if(!st.cc[ky][kx])st.cc[ky][kx]=1;}}st.logs=st.logs||[];
 try{tw.flag={x:PVCX,y:tw.y};
  if(T.dragon){tw.lvl=1;tw.born=-99;tw.stage=cur-1;tw.sd=[];if(cur===2){tw.sd=[{i:0,x:PVCX,y:tw.y,hp:60,max:60,en:null,cd:0,rt:0,tw,lock:false,fight:false,rng:1,drag:1}];}if(cur>=3)tw.fly={a:0,cd:0};}
  else if(T.guild){tw.lvl=cur;tw.sd=[];mkGuild(tw);tw.sd.forEach(q=>{const o=slotOf(tw,q.i);q.x=o.x;q.y=o.y;q.lock=false;});}
  else if(T.pig){tw.lvl=cur;if(cur>=4){mkPig(tw);const q=tw.pigT&&tw.pigT.sd[0];if(q){q.x=PVCX;q.y=tw.y;q.lock=false;}}}
 }finally{S=real;}}
let PV=null;const PVN=P*K,PVX=14*K,PVY=14*K,PVC=288/PVN,PVCX=PVX+(PVN>>1);
function newPrev(k,en){if(TW[k].uniq&&!uPrevOk(k,(CP.ulv&&CP.ulv[k])||1)){PV=null;return;}
 const cells=Array.from({length:N},()=>Array(N).fill(0)),buff=Array.from({length:N},()=>Array(N).fill(null));
 for(let y=PVY;y<PVY+PVN;y++)for(let x=PVX;x<PVX+PVN;x++)cells[y][x]=Math.abs(x-PVCX)<=1?2:1;
 const st={cells,buff,blocks:{},rain:[],mines:[],barr:[],dbl:[],list:[],occ:{},tid:1,enemies:[],pools:[],proj:[],fx:[],ends:[],portals:[{q:['x'],t:1e9,x:PVCX,y:PVY,dir:[0,-1],ln:0,plan:{}}],bags:{},af:{},round:0,hp:1e9,gold:0,phase:'wave',offers:[],sup:0,pi:0,dtg:{},relics:[],rs:{},wt:0,aim:null,chests:{},tsel:k,selT:null,hover:null,core:{x:PVCX,y:PVY+PVN-1},speed:1,field:null,msg:'',espd:CP.spd,pvT:1};
 const real=S;S=st;try{st.field=field();const tx=PVCX-3,ty=PVY+7,tw={id:1,type:k,lvl:cpState(k).lv,spec:cpState(k).spec,ab:{},acd:{},x:tx,y:ty,cells:[[tx,ty]],sq:[[tx,ty]],cd:0,tgt:null,mode:'core'};if(TW[k].unit){mkSoldiers(tw);tw.flag={x:PVCX,y:ty};tw.sd.forEach(q=>{const o=slotOf(tw,q.i);q.x=o.x;q.y=o.y;q.lock=false;});}if(tw.spec)for(const id of SPECS[k][tw.spec].ab)tw.ab[id]=AB[id].ranks.length;st.list.push(tw);st.occ[tx+','+ty]=tw;}finally{S=real;}
 if(TW[k].uniq)uPrevFix(st,k);
 PV={S:st,k,en,rt:.3};
}
// ---- previsualización de enemigos: un enemigo contra un héroe ----
let PE=null;
// aliados vistos para la vista previa de enemigos
function allyList(){const a=Object.keys(HEROES).filter(h=>seen('hr',h)||h==='reinhart').map(h=>['hero:'+h,HEROES[h].n+' (héroe, Nv 1)']);
 if(seen('tw','bastion'))a.push(['tw:bastion:1','Soldados del Baluarte (Nv 1)'],['tw:bastion:3','Soldados del Baluarte (Nv 3)'],['tw:bastion:pal','Paladines (Nv 4)'],['tw:bastion:ass','Asesinos (Nv 4)']);
 if(seen('tw','monk'))a.push(['tw:monk:1','Monjes élficos (Nv 1)'],['tw:monk:3','Monjes élficos (Nv 3)'],['tw:monk:fist','Monjes de Batalla (Nv 4)'],['tw:monk:drunk','Maestros Ebrios (Nv 4)']);
 if(seen('tw','guild'))a.push(['tw:guild:1','Aventureros (Nv 1)'],['tw:guild:4','Aventureros (Nv 4)']);
 if(seen('tw','dragon'))a.push(['dragon','Dragón bebé']);
 if(seen('rl','barricade'))a.push(['barr','Barricada de Reinhart']);
 if(seen('tw','brick'))a.push(['brick','Muro de la Casa de ladrillo']);
 return a;}
function newEPrev(k,h){if(!h||!h.includes(':')&&!['dragon','barr','brick'].includes(h))h='hero:'+(h||'reinhart');
 const cells=Array.from({length:N},()=>Array(N).fill(0)),buff=Array.from({length:N},()=>Array(N).fill(null));
 for(let y=PVY;y<PVY+PVN;y++)for(let x=PVX;x<PVX+PVN;x++)cells[y][x]=Math.abs(x-PVCX)<=1?2:1;
 const st={cells,buff,blocks:{},rain:[],mines:[],barr:[],dbl:[],tz:[],list:[],occ:{},tid:1,enemies:[],pools:[],proj:[],fx:[],ends:[],portals:[{q:['x'],t:1e9,x:PVCX,y:PVY,dir:[0,-1],ln:0,plan:{}}],bags:{},af:{},round:1,hp:1e9,gold:0,phase:'wave',offers:[],sup:0,pi:null,dtg:{},relics:[],rs:{},wt:0,aim:null,chests:{},tsel:null,selT:null,hover:null,core:{x:PVCX,y:PVY+PVN-1},speed:1,field:null,msg:'',espd:CP.spd,dn:[],pvE:1};
 const real=S;S=st;const fy=PVY+12;try{st.field=field();
  if(h.startsWith('hero:')){mkHero(h.slice(5));const H=st.hero;H.pt.flag={x:PVCX,y:fy};H.s.x=PVCX;H.s.y=fy;}
  else if(h.startsWith('tw:')){const[,ty,lv]=h.split(':'),sp=isNaN(+lv)?lv:null,tw={id:1,type:ty,lvl:sp?4:+lv,spec:sp,ab:{},acd:{},x:PVCX-3,y:fy,cells:[[PVCX-3,fy]],sq:[[PVCX-3,fy]],cd:0,tgt:null,mode:'core'};
   if(sp)for(const id of SPECS[ty][sp].ab)tw.ab[id]=AB[id].ranks.length;if(TW[ty].guild)mkGuild(tw);else mkSoldiers(tw);tw.flag={x:PVCX,y:fy};tw.sd.forEach(q=>{const o=slotOf(tw,q.i);q.x=o.x;q.y=o.y;q.lock=false;});st.list.push(tw);}
  else if(h==='dragon'){const tw={id:1,type:'dragon',lvl:1,spec:null,ab:{},acd:{},x:PVCX-3,y:fy,cells:[[PVCX-3,fy]],sq:[[PVCX-3,fy]],cd:0,tgt:null,mode:'core',born:-3,stage:1,flag:{x:PVCX,y:fy}};tw.sd=[{i:0,x:PVCX,y:fy,hp:60,max:60,en:null,cd:0,rt:0,tw,lock:false,fight:false,rng:1,drag:1}];st.list.push(tw);}
  else{st.wallKind=h;}
 }finally{S=real;}
 PE={S:st,k,h,rt:.3,wt:0};
}
function ePrevStep(rdt){
 if(!(CP.open&&CP.eprev&&PE&&PE.k===CP.eprev))return;
 const real=S,_ui=ui;S=PE.S;ui=function(){};
 try{const H=S.hero;
  if(!S.enemies.length){PE.rt-=rdt;if(PE.rt<=0){const E=ET[PE.k],hp=HP0*hpR(1)*E.hp;S.enemies.push({t:PE.k,x:PVCX,y:PVY,tx:PVCX,ty:PVY,hp,max:hp,fx:{},src:null});PE.rt=.3;}}
  update(rdt);S.phase='wave';S.hp=1e9;if(H){H.lvl=1;H.xp=0;}
  if(H&&H.s.hp<=0){H.s.hp=H.s.max;H.s.rt=0;H.s.x=H.pt.flag.x;H.s.y=H.pt.flag.y;H.s.en=null;H.s.fight=false;}
  for(const t of S.list)for(const s of t.sd||[])if(s.hp<=0){s.hp=s.max;s.rt=0;const o=slotOf(t,s.i);s.x=o.x;s.y=o.y;s.en=null;s.fight=false;}
  if(S.wallKind&&!S.barr.length){PE.wt-=rdt;if(PE.wt<=0){const fy2=PVY+12,b={poly:[[PVCX-1,fy2],[PVCX+2,fy2],[PVCX+2,fy2+1],[PVCX-1,fy2+1]],seg:[PVCX-1,fy2+.5,PVCX+2,fy2+.5],x:PVCX,y:fy2};if(b)S.barr.push({t:S.wallKind==='brick'?4:5,...b,brick:S.wallKind==='brick'?1:0});PE.wt=1.5;}}
  dnTick(rdt);
 }finally{S=real;ui=_ui;}
 drawEPrev();
}
function drawEPrev(){
 const cv2=document.getElementById('pvc');if(!cv2||!PE)return;const c=cv2.getContext('2d'),s=PE.S,X=x=>(x-PVX+.5)*PVC,Y=y=>(y-PVY+.5)*PVC;
 for(let y=0;y<PVN;y++)for(let x=0;x<PVN;x++){c.fillStyle=s.cells[PVY+y][PVX+x]===2?'#a8854a':'#2e3441';c.fillRect(x*PVC,y*PVC,PVC,PVC);}
 c.fillStyle='#3dd6c4';c.fillRect(X(s.core.x)-PVC*1.2,Y(s.core.y)-PVC*1.2,PVC*2.4,PVC*2.4);
 for(const q of s.fx){if(q.bolt||q.frag)continue;if(q.mk){const k=1-q.t/q.m;c.globalAlpha=Math.min(1,q.t/q.m*2);c.font='bold 20px sans-serif,"Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji"';c.textAlign='center';c.textBaseline='middle';c.lineWidth=3;c.strokeStyle='#fff';c.fillStyle='#e8262e';const tx=X(q.x)+12,ty=Y(q.y)-8-k*14;c.strokeText('!',tx,ty);c.fillText('!',tx,ty);c.globalAlpha=1;continue;}c.globalAlpha=Math.max(0,q.t/q.m)*.7;c.fillStyle=q.col;c.beginPath();c.arc(X(q.x),Y(q.y),q.r*PVC,0,7);c.fill();c.globalAlpha=1;}
 for(const b of s.barr){c.save();c.beginPath();b.poly.forEach((p,i)=>i?c.lineTo((p[0]-PVX)*PVC,(p[1]-PVY)*PVC):c.moveTo((p[0]-PVX)*PVC,(p[1]-PVY)*PVC));c.closePath();c.fillStyle=b.brick?'#b0503a':'#8a5a2b';c.fill();c.strokeStyle='#f0c040';c.lineWidth=2;c.stroke();c.restore();}
 drawUnits(c,s,PVC,-PVX*PVC,-PVY*PVC);
 for(const e of s.enemies){const E=ET[e.t],px=X(e.x),py=Y(e.y),r=E.r*PVC;c.fillStyle=E.col;c.beginPath();c.arc(px,py,r,0,7);c.fill();
  if(E.el){c.strokeStyle='#f0b429';c.lineWidth=2;c.beginPath();c.arc(px,py,r+2,0,7);c.stroke();}
  c.fillStyle='#000';c.fillRect(px-r,py-r-6,2*r,3);c.fillStyle='#6fe07a';c.fillRect(px-r,py-r-6,2*r*Math.max(0,e.hp/e.max),3);}
 for(const p of s.proj){const px=X(p.x),py=Y(p.y);if(p.orb){drawOrbP(c,px,py,p.orb,PVC*K,p.col);continue;}c.fillStyle=p.col;c.beginPath();c.arc(px,py,3,0,7);c.fill();}
 if(OPT.dnum)for(const d of s.dn){if(d.sh<.5)continue;const a=d.idle<.6?1:Math.max(0,1-(d.idle-.6)/.5),cr=d.crit>0,txt=fmtD(d.sh)+(cr?'!':'');
  c.globalAlpha=a;c.font='bold '+(cr?17:13)+'px "Trebuchet MS",sans-serif,"Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji"';c.textAlign='center';c.textBaseline='bottom';c.lineWidth=3;c.lineJoin='round';c.strokeStyle='rgba(10,12,16,.9)';
  const px=X(d.x)+(d.u?16:0),py=Y(d.y)-d.r*PVC-10-d.i*14-Math.min(14,d.age*10);c.strokeText(txt,px,py);c.fillStyle=DNC[d.key]||'#fff';c.fillText(txt,px,py);}
 c.globalAlpha=1;
}
let PHV=null;const HLR={1:1,5:7,10:14};
function newHPrev(id,en,lv){
 const cells=Array.from({length:N},()=>Array(N).fill(0)),buff=Array.from({length:N},()=>Array(N).fill(null));
 for(let y=PVY;y<PVY+PVN;y++)for(let x=PVX;x<PVX+PVN;x++)cells[y][x]=Math.abs(x-PVCX)<=1?2:1;
 const st={cells,buff,blocks:{},rain:[],mines:[],barr:[],dbl:[],tz:[],list:[],occ:{},tid:1,enemies:[],pools:[],proj:[],fx:[],ends:[],portals:[{q:['x'],t:1e9,x:PVCX,y:PVY,dir:[0,-1],ln:0,plan:{}}],bags:{},af:{},round:HLR[lv]||1,hp:1e9,gold:0,phase:'wave',offers:[],sup:0,pi:null,dtg:{},relics:[],rs:{},wt:0,aim:null,chests:{},tsel:null,selT:null,hover:null,core:{x:PVCX,y:PVY+PVN-1},speed:1,field:null,msg:'',espd:CP.spd,dn:[],pvE:1,pvH:1};
 const real=S;S=st;try{st.field=field();mkHero(id);const H=st.hero,fy=PVY+13;H.lvl=lv;const x=hsAt(id,lv);H.s.max=x.hp;H.s.hp=x.hp;H.pt.flag={x:PVCX,y:fy};H.s.x=PVCX;H.s.y=fy;}finally{S=real;}
 PHV={S:st,id,en,lv,rt:.3};
}
function hPrevStep(rdt){
 if(!(CP.open&&CP.hprev&&PHV&&PHV.id===CP.hprev))return;
 const real=S,_ui=ui;S=PHV.S;ui=function(){};
 try{const H=S.hero;
  PHV.rt-=rdt;if(PHV.rt<=0&&S.enemies.length<8){const E=ET[PHV.en],hp=HP0*hpR(S.round)*E.hp;S.enemies.push({t:PHV.en,x:PVCX,y:PVY,tx:PVCX,ty:PVY,hp,max:hp,fx:{},src:null});PHV.rt=1.2/(S.espd||1);}
  update(rdt);S.phase='wave';S.hp=1e9;H.lvl=PHV.lv;H.xp=0;
  if(H.s.hp<=0){H.s.hp=H.s.max;H.s.rt=0;H.s.x=H.pt.flag.x;H.s.y=H.pt.flag.y;H.s.en=null;H.s.fight=false;}
  dnTick(rdt);
 }finally{S=real;ui=_ui;}
 const keep=PE;PE={S:PHV.S};try{drawEPrev();}finally{PE=keep;}
}
function hpkNew(id){const D=HEROES[id],rg=!!D.ranged;
 const cells=Array.from({length:N},()=>Array(N).fill(0)),buff=Array.from({length:N},()=>Array(N).fill(null));
 for(let y=PVY;y<PVY+PVN;y++)for(let x=PVX;x<PVX+PVN;x++)cells[y][x]=1;
 let core,hx,hy,sx,vw;
 if(!rg){for(let y=PVY;y<PVY+PVN;y++)for(let x=PVCX-1;x<=PVCX+1;x++)cells[y][x]=2;core={x:PVCX,y:PVY+PVN-1};sx=PVCX;hx=PVCX;hy=PVY+13;vw={cx:PVCX+.5,cy:PVY+10,h:12};}
 else{const cx=PVX+4,cy=PVY+12;for(let y=PVY;y<=cy+1;y++)for(let x=cx-1;x<=cx+1;x++)cells[y][x]=2;for(let y=cy-1;y<=cy+1;y++)for(let x=cx-1;x<PVX+PVN;x++)cells[y][x]=2;
  core={x:PVX+PVN-1,y:cy};sx=cx;hx=cx+7;hy=cy;vw={cx:PVX+PVN/2,cy:PVY+PVN/2-1,h:PVN-1};}
 const st={cells,buff,blocks:{},rain:[],mines:[],barr:[],dbl:[],tz:[],list:[],occ:{},tid:1,enemies:[],pools:[],proj:[],fx:[],ends:[],portals:[{q:['x'],t:1e9,x:sx,y:PVY,dir:[0,-1],ln:0,plan:{}}],bags:{},af:{},round:1,hp:1e9,gold:0,phase:'wave',offers:[],sup:0,pi:null,dtg:{},relics:[],rs:{},wt:0,aim:null,chests:{},tsel:null,selT:null,hover:null,core,speed:1,field:null,msg:'',espd:1,dn:[],pvE:1,pvH:1};
 const real=S;S=st;try{st.field=field();mkHero(id);const H=st.hero;H.pt.flag={x:hx,y:hy};H.s.x=hx;H.s.y=hy;}finally{S=real;}
 PHV={S:st,id,en:'norm',lv:1,rt:.3,pick:1,sx,vw,rg};}

// v334 · En las previsualizaciones del libro no suenan el núcleo, las bajas ni el fin de oleada (se quedaban en bucle); sí suenan los ataques
const PVMUTE=/^(core|lose|win|wclear|wave|rready|kill_|boss|roar)/;
{const _sx=sfx;sfx=function(k){try{if(PVMUTE.test(k)&&S&&((PV&&S===PV.S)||(PE&&S===PE.S)||(PHV&&S===PHV.S)))return;}catch(e){}return _sx.apply(this,arguments);};}
