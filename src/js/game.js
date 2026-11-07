// tiempos de partida: real (todo incluido) y de combate (tiempo de juego, con la velocidad); FPS
const GT={r:0,c:0},FPS={n:0,t:0,v:0};
const fClk=s=>{s=Math.floor(s);const h=Math.floor(s/3600),m=Math.floor(s/60)%60,x=s%60;return(h?h+':'+String(m).padStart(2,'0'):m)+':'+String(x).padStart(2,'0');};
function init(){GT.r=0;GT.c=0;
 closePrim();if(typeof FO!=='undefined')closeFocus();S={cc:Array.from({length:NC},()=>Array(NC).fill(0)),cells:Array.from({length:N},()=>Array(N).fill(0)),buff:Array.from({length:N},()=>Array(N).fill(null)),
 blocks:{},rain:[],mines:[],barr:[],dbl:[],list:[],occ:{},tid:0,enemies:[],pools:[],proj:[],fx:[],ends:[],portals:[],round:0,hp:20,gold:150,phase:'place',
 offers:[],sup:SUP0,pi:0,dtg:{},relics:[],rs:{},wt:0,aim:null,chests:{},evts:{},uq:[],vch:{},hpEn:0,pend:[],sched:[],half:0,dneed:0,dsel:[],chest4:0,forgeR:-1,noChest:0,bless:{},sharp:0,idolN:0,merc:null,fz:[],mimFor:null,tsel:null,dn:[],rc:3,tut:TUTON?{}:null,snap:null,selT:null,hover:null,core:null,speed:1,field:null,msg:'',st:{dmg:0,gKill:0,gTile:0,gRound:0,gRel:0,gEv:0,gSell:0,spent:0,kills:0,time:0,all:[],rl:{}}};
 let b=BASE;for(let i=Math.floor(Math.random()*4);i>0;i--)b=rot(b);
 const c=BN>>1;stamp(c,c,b,[]);
 // Cofres: recorrido de bloques contiguos que empieza en el hueco de salida de la base (donde va la pieza de la ronda 1).
 // El primero va a 2 pasos de ese hueco y ninguno está en él ni a su lado, así que como pronto se abre uno en la ronda 3. Los demás, cada 3 pasos más.
 const ex=(()=>{for(let y=0;y<P;y++)for(let x=0;x<P;x++)if(b[y][x]==='.'&&(x===0||y===0||x===P-1||y===P-1))return x===0?[-1,0]:x===P-1?[1,0]:y===0?[0,-1]:[0,1];return[1,0];})();
 const A=[c+ex[0],c+ex[1]],L=3*CHESTS;let best=[];
 for(let t=0;t<4000&&best.length<L;t++){const seen={[c+','+c]:1,[A[0]+','+A[1]]:1},w=[A[0]+','+A[1]];let x=A[0],y=A[1];
  for(let i=1;i<L;i++){const nb=shuf(D.map(d=>[x+d[0],y+d[1]]).filter(q=>q[0]>=0&&q[1]>=0&&q[0]<BN&&q[1]<BN&&!seen[q[0]+','+q[1]]&&Math.abs(q[0]-A[0])+Math.abs(q[1]-A[1])>=(i>=2?2:1)));if(!nb.length)break;[x,y]=nb[0];seen[x+','+y]=1;w.push(x+','+y);}
  if(w.length>best.length)best=w;}
 for(let k=0;k<CHESTS;k++){const a=k?3*k:2,z=k?Math.min(3*k+2,best.length-1):2;if(a<best.length)S.chests[best[a+Math.floor(Math.random()*(z-a+1))]]=1;}
 if(S.tut){S.rc=99;const k=best.find((v,i)=>i>=5&&!S.chests[v]);if(k)S.evts[k]='shrine';}else placeEvents(c,A);
 CAM.z=ZINI;camCenter(S.core.x,S.core.y);
 RL.open=false;$('relic').classList.remove('open');renderRelics();nextRound();openHero();
}
function stamp(bx,by,p,bs){
 S.blocks[bx+','+by]=1;
 for(let y=0;y<P;y++)for(let x=0;x<P;x++){const ch=p[y][x],gx=bx*P+x,gy=by*P+y;
  S.cc[gy][gx]=cellOf(ch);if(OBS[ch])(S.obs=S.obs||{})[gx+','+gy]=ch;
  for(let j=0;j<K;j++)for(let i=0;i<K;i++)S.cells[gy*K+j][gx*K+i]=cellOf(ch);
  if(ch==='C')S.core={x:gx*K+1,y:gy*K+1};}
 for(const b of bs){const gx=bx*P+b.x,gy=by*P+b.y;for(let j=0;j<K;j++)for(let i=0;i<K;i++)S.buff[gy*K+j][gx*K+i]=b.k;}
}
function conns(bx,by,p){
 let c=0;
 for(let y=0;y<P;y++)for(let x=0;x<P;x++){if(cellOf(p[y][x])!==2)continue;
  for(const[a,b]of D){const lx=x+a,ly=y+b;if(lx>=0&&ly>=0&&lx<P&&ly<P)continue;
   const gx=bx*P+lx,gy=by*P+ly;if(inbc(gx,gy)&&S.cc[gy][gx]===2)c++;}}
 return c;
}
