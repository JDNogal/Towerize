// extremos libres: casillas de camino en el borde de una pieza que miran a un hueco vacío del tablero
function collectEnds(first){
 const out=[],seen={};
 for(const k in S.blocks){const[bx,by]=k.split(',').map(Number);
  for(let y=0;y<P;y++)for(let x=0;x<P;x++){const gx=bx*P+x,gy=by*P+y;if(S.cc[gy][gx]!==2)continue;
   for(const[a,b]of D){const lx=x+a,ly=y+b;if(lx>=0&&ly>=0&&lx<P&&ly<P)continue;
    const nx=bx+(lx<0?-1:lx>=P?1:0),ny=by+(ly<0?-1:ly>=P?1:0);
    if(nx>=0&&ny>=0&&nx<BN&&ny<BN&&!S.blocks[nx+','+ny]){
     if(first)return[1];
     if(!seen[gx+','+gy]){seen[gx+','+gy]=1;out.push({x:gx*K+1+a,y:gy*K+1+b,bx,by,dir:[a,b]});}}}}}
 return out;
}
// salidas del camino al borde de la cuadrícula: no sirven para poner piezas, pero sí pueden abrir portales
function borderEnds(){const out=[];
 for(const k in S.blocks){const[bx,by]=k.split(',').map(Number);
  for(let y=0;y<P;y++)for(let x=0;x<P;x++){const gx=bx*P+x,gy=by*P+y;if(S.cc[gy][gx]!==2)continue;
   for(const[a,b]of D){const lx=x+a,ly=y+b;if(lx>=0&&ly>=0&&lx<P&&ly<P)continue;
    const nx=bx+(lx<0?-1:lx>=P?1:0),ny=by+(ly<0?-1:ly>=P?1:0);
    if(nx<0||ny<0||nx>=BN||ny>=BN)out.push({x:gx*K+1+a,y:gy*K+1+b,bx,by,dir:[a,b],bd:1});}}}
 return out;}
// 0 = válida, 1 = no conecta, 2 = cierra el camino, 3 = callejón: deja al camino casi sin sitio (menos de 3 bloques libres alcanzables)
function check(bx,by,p){
 if(bx<0||by<0||bx>=BN||by>=BN||S.blocks[bx+','+by]||!conns(bx,by,p))return 1;
 if(S.round>=ROUNDS||S.allowClose)return 0;
 S.blocks[bx+','+by]=1;
 for(let y=0;y<P;y++)for(let x=0;x<P;x++)S.cc[by*P+y][bx*P+x]=cellOf(p[y][x]);
 const e=collectEnds(),ok=e.length>0,dead=ok&&!S.allowDead&&endRoom(e)<Math.min(3,ROUNDS-S.round);
 delete S.blocks[bx+','+by];
 for(let y=0;y<P;y++)for(let x=0;x<P;x++)S.cc[by*P+y][bx*P+x]=0;
 return !ok?2:dead?3:0;
}
// huecos libres alrededor del bloque al que da un extremo (cuántas salidas tendría la siguiente pieza)
function endFree(e){const gx=Math.floor(e.x/K),gy=Math.floor(e.y/K),sx=Math.floor((gx+e.dir[0])/P),sy=Math.floor((gy+e.dir[1])/P);
 return D.filter(([a,b])=>{const x=sx+a,y=sy+b;return x>=0&&y>=0&&x<BN&&y<BN&&!S.blocks[x+','+y];}).length;}
// espacio que le queda al camino: bloques libres conectados a los huecos a los que dan los extremos
function endRoom(e){const seen={},q=[];for(const x of e){const gx=Math.floor(x.x/K),gy=Math.floor(x.y/K),sx=Math.floor((gx+x.dir[0])/P),sy=Math.floor((gy+x.dir[1])/P),k=sx+','+sy;if(!seen[k]){seen[k]=1;q.push([sx,sy]);}}
 for(let i=0;i<q.length;i++){const[x,y]=q[i];for(const[a,b]of D){const nx=x+a,ny=y+b,k=nx+','+ny;if(nx>=0&&ny>=0&&nx<BN&&ny<BN&&!S.blocks[k]&&!seen[k]){seen[k]=1;q.push([nx,ny]);}}}
 return q.length;}
function anyPlace(o){
 let p=o.p;
 for(let r=0;r<4;r++){for(let by=0;by<BN;by++)for(let bx=0;bx<BN;bx++)if(check(bx,by,p)===0)return true;p=rot(p);}
 return false;
}
const payOn=()=>S&&!(S.tut&&S.round<2),BFC=25,BFCS=50,DSUP=.35,pcost=o=>(o&&o.b?o.b:[]).reduce((a,b)=>a+(BF[b.k].sup?BFCS:BFC),0);
function dealTry(){
 // rescate: si solo queda un extremo libre, salen sí o sí la Bifurcación y el Cruce, gratis
 const E1=!S.tut&&S.round<ROUNDS?collectEnds():[],resc=E1.length===1,RN=['Bifurcación','Cruce'];
 for(let t=0;t<40;t++){
  let pool=shuf([...PIECES]).slice(0,rp('square')?4:3);
  if(resc){const rest=shuf(PIECES.filter(x=>!RN.includes(x.n)));pool=shuf([...PIECES.filter(x=>RN.includes(x.n)),...rest.slice(0,pool.length-2)]);}
  S.offers=pool.map(o=>{const of={n:o.n,p:o.p,b:[]};solarize(of);decorate(of);
   if(S.round>=BUFFS_FROM&&Math.random()<.6){const cs=[];of.p.forEach((r,y)=>[...r].forEach((ch,x)=>{if(ch==='S')cs.push([x,y]);}));
    shuf(cs);
    const two=Math.random()>=.7,dbl=two&&Math.random()<DSUP;for(let i=two?2:1;i>0&&cs.length;i--){const c=cs.pop();of.b.push({x:c[0],y:c[1],k:dbl?BK[Math.floor(Math.random()*BK.length)]+'+':rollBuff()});}if(dbl)S.sup=SUP0;}
   for(let i=Math.floor(Math.random()*4);i>0;i--)rotO(of);return of;});
  // siempre hay una pieza gratis (sin casillas especiales) entre las que se pueden colocar, y solo salen casillas que puedas pagar
  if(!S.tut){const okI=S.offers.map((o,i)=>i).filter(i=>anyPlace(S.offers[i]));if(okI.length)S.offers[okI[Math.floor(Math.random()*okI.length)]].b=[];
   for(const o of S.offers){o.b.sort((a,b)=>(BF[a.k].sup?1:0)-(BF[b.k].sup?1:0));while(o.b.length&&pcost(o)>S.gold)o.b.pop();}
   if(resc)for(const o of S.offers)if(RN.includes(o.n))o.b=[];}
  if(S.offers.some(anyPlace)){S.offers.forEach(o=>{see('pc',o.n);o.b.forEach(b=>see('bf',bkey(b.k)));});return true;}
 }
 return false;
}
// Reparte 3 piezas. Si ninguna puede colocarse dejando un extremo libre, se permite cerrar el camino; si no cabe ninguna, la ronda no trae pieza.
function deal(){if(S.tut&&tutDeal()){S.allowClose=false;S.allowDead=false;S.noSlot=false;return;}S.allowClose=false;S.allowDead=false;S.noSlot=false;if(dealTry())return;S.allowDead=true;if(dealTry())return;S.allowClose=true;if(dealTry())return;S.noSlot=true;}
function nextRound(){
 mechaEnd();if(S.mecha)S.mecha.cd=0;for(const id in S.rs){S.rs[id].t=0;}S.aim=null;S.aimT=null;if(S.gorbs&&S.gorbs.length&&S.hero)for(const o of S.gorbs)giveXp(S.hero,o.v);S.gorbs=[];S.fury=0;S.summ=[];S.ivy=[];S.runes=[];S.storm=null;S.ice=[];S.cata=null;S.bz=[];S.logs=[];S.hawk=null;if(S.hero){S.hero.bcd=0;S.hero.chg=null;}S.barr=[];S.dbl=[];S.tz=[];S.fz=[];S.merc=null;S.mimFor=null;for(const t of S.list)t.curse=0;for(const t of unitTowers())for(const s of t.sd){const q=slotOf(t,s.i);s.hp=s.max;s.rt=0;s.en=null;s.fight=false;s.lock=false;s.x=q.x;s.y=q.y;}S.round++;heroSync();if(S.round%2===0&&!S.tut)S.towOff=1;S.phase='place';S.pi=null;S.selT=null;S.ends=[];S.portals=[];S.proj=[];S.fx=[];S.rain=[];deal();
 S.msg=S.tut?'':S.round===ROUNDS?'Última ronda: la pieza que coloques invoca al jefe final.':bossRound(S.round)?'Ronda de jefe: la pieza que coloques invoca al jefe.':'';if(S.noSlot){skipPlace();return;}ui();setTimeout(()=>tutPhase('place'),0);
 if(!S.tut&&S.offers.some(o=>pcost(o)))setTimeout(()=>hint('bfcost','Casillas de pago',[['Las casillas especiales <b>cuestan oro</b>: <span class="gd">25 🪙</span> cada una (<span class="gd">50 🪙</span> las súper).',tgCard('#ui .pcst:not(.pfree)')],['Siempre habrá una pieza <b>gratis</b>.',tgCard('#ui .pfree')]]),0);
}
function field(){
 const d=Array.from({length:N},()=>Array(N).fill(1e9)),q=[[S.core.x,S.core.y]];d[S.core.y][S.core.x]=0;
 for(let i=0;i<q.length;i++){const[x,y]=q[i];for(const[a,b]of D){const nx=x+a,ny=y+b;
  if(inb(nx,ny)&&S.cells[ny][nx]===2&&d[ny][nx]>d[y][x]+1){d[ny][nx]=d[y][x]+1;q.push([nx,ny]);}}}
 return d;
}
function cfield(){
 const d=Array.from({length:NC},()=>Array(NC).fill(1e9)),c0=[Math.floor(S.core.x/K),Math.floor(S.core.y/K)],q=[c0];d[c0[1]][c0[0]]=0;
 for(let i=0;i<q.length;i++){const[x,y]=q[i];for(const[a,b]of D){const nx=x+a,ny=y+b;if(inbc(nx,ny)&&S.cc[ny][nx]===2&&d[ny][nx]>d[y][x]+1){d[ny][nx]=d[y][x]+1;q.push([nx,ny]);}}}
 return d;
}
function afield(c){
 const k=c[0]+','+c[1];if(S.af[k])return S.af[k];
 const d=Array.from({length:N},()=>Array(N).fill(1e9)),sx=c[0]*K+1,sy=c[1]*K+1,q=[[sx,sy]];d[sy][sx]=0;
 for(let i=0;i<q.length;i++){const[x,y]=q[i];for(const[a,b]of D){const nx=x+a,ny=y+b;if(inb(nx,ny)&&S.cells[ny][nx]===2&&d[ny][nx]>d[y][x]+1){d[ny][nx]=d[y][x]+1;q.push([nx,ny]);}}}
 return S.af[k]=d;
}
function placePiece(bx,by){
 const solF=S.tut&&S.round===1&&!S.tut.solf;
 const o=S.offers[S.pi],p=o.p,pc=payOn()?pcost(o):0;if(pc){S.gold-=pc;if(S.st)S.st.bfpay=(S.st.bfpay||0)+pc;}stamp(bx,by,p,o.b);
 const d=field();let any=null,ad=-1;
 for(let y=0;y<P;y++)for(let x=0;x<P;x++){if(p[y][x]!=='.')continue;const fx=(bx*P+x)*K+1,fy=(by*P+y)*K+1,dd=d[fy][fx];if(dd<1e9&&dd>ad){ad=dd;any={x:fx,y:fy,d:dd,dir:[0,0]};}}
 // prioridad: extremos de la pieza nueva (más lejanos primero) y después el resto, de más lejos a más cerca de la base
 const ends=shuf(collectEnds().concat(borderEnds()));
 for(const e of ends){e.d=d[e.y][e.x];e.nw=e.bx===bx&&e.by===by;}
 for(let i=ends.length-1;i>=0;i--)if(!(ends[i].d<1e9))ends.splice(i,1);
 // primero el extremo más lejano de la pieza nueva; el resto, al azar (antes, siempre los más alejados: los enemigos tardaban mucho en llegar)
 ends.sort((a,b)=>a.nw===b.nw?b.d-a.d:a.nw?-1:1);{const nw=ends.filter(e=>e.nw),rest=shuf(ends.filter(e=>!e.nw));ends.length=0;ends.push(...nw.slice(0,1),...shuf(nw.slice(1).concat(rest)));}
 if(!ends.length)ends.push({...any,nw:true});
 S.ends=ends;
 const boss=bossRound(S.round)?(ends.find(e=>e.nw)||any):null;
 makePortals(boss);S.phase='build';if(solF&&showSolarFocus(bx,by)){S.tut.solf=1;FO.after=()=>setTimeout(()=>tutPhase('build'),0);}else setTimeout(()=>tutPhase('build'),0);
 S.msg=(S.round===ROUNDS&&ROUNDS===30?'¡Se ha abierto un portal enorme… algo peor que el jefe se acerca! ':bossRound(S.round)?'¡Se ha abierto el portal del jefe! ':'')+(ELITES[S.round]&&!bossRound(S.round)?'Esta ronda trae '+Object.entries(ELITES[S.round]).map(([t,n])=>n+' '+ET[t].n.toLowerCase()).join(' y ')+'.':'');ui();
 pieceWarn(p);S.lastBk=bx+','+by;
 if(S.hero)hint('hero','Tu héroe',HEROTXT,tgEl('#mbr .hpport'));
 if(S.chests[bx+','+by]){delete S.chests[bx+','+by];S.chOpen=(S.chOpen||0)+1;if(S.chOpen>=3&&S.round<7&&!S.tut)achieve('treasure');openRelic();RL.fromChest=!!(RL.open&&RL.choices&&RL.choices.length);}
 else if(S.evts[bx+','+by]){const id=S.evts[bx+','+by];delete S.evts[bx+','+by];openEvent(id,bx+','+by);}
}
// Ronda sin pieza: los portales salen de los extremos sin salida del camino (los más lejanos del núcleo primero)
function skipPlace(){
 const isP=(x,y)=>inbc(x,y)&&S.cc[y][x]===2,d=field(),cx=Math.floor(S.core.x/K),cy=Math.floor(S.core.y/K),ends=[];
 for(let y=0;y<NC;y++)for(let x=0;x<NC;x++){if(!isP(x,y)||(x===cx&&y===cy))continue;const nb=D.filter(([a,b])=>isP(x+a,y+b));
  if(nb.length===1){const fx=x*K+1,fy=y*K+1;if(d[fy][fx]<1e9)ends.push({x:fx,y:fy,dir:[-nb[0][0],-nb[0][1]],d:d[fy][fx],nw:false});}}
 if(!ends.length){let any=null,ad=-1;for(let y=0;y<N;y++)for(let x=0;x<N;x++)if(S.cells[y][x]===2&&d[y][x]<1e9&&d[y][x]>ad){ad=d[y][x];any={x,y,d:ad,dir:[0,0],nw:false};}ends.push(any);}
 ends.sort((a,b)=>b.d-a.d);S.ends=ends;const boss=bossRound(S.round)?ends[0]:null;
 makePortals(boss);S.phase='build';setTimeout(()=>tutPhase('build'),0);
 S.msg=(boss?'¡Se ha abierto el portal del jefe! ':'')+'Mapa completo: ya no hay piezas nuevas. Los enemigos salen de los extremos del camino.';ui();
}
// ---- avisos de camino: pocas salidas libres ----
// aberturas de una pieza = casillas de camino en su borde; 3 o más = tiene bifurcación
const opens=p=>{let n=0,o=ch=>cellOf(ch)===2;for(let i=0;i<P;i++){if(o(p[0][i]))n++;if(o(p[P-1][i]))n++;if(o(p[i][0]))n++;if(o(p[i][P-1]))n++;}return n;};
const FO={open:false,pt:null};
function pieceWarn(p){
 if(S.round>=ROUNDS)return; // ya no hacen falta más piezas
 S.nob=opens(p)>=3?0:(S.nob||0)+1;
 const ends=collectEnds();
 // riesgo real: un solo extremo libre y el hueco al que da tiene como mucho otra salida libre (cualquier pieza que no encaje bien cierra el camino)
 let risk=false;if(ends.length===1)risk=endFree(ends[0])<=1;
 if(risk){S.lastEnd=ends[0];if(!S.oneEnd){S.oneEnd=true;if(!FO.open)showFocus(ends[0]);}}else{S.oneEnd=false;S.lastEnd=null;}
 if(S.nob===4&&!S.oneEnd)S.msg='⚠ Llevas varias piezas sin bifurcar: tu camino podría cerrarse. Usa bifurcaciones y cruces. '+S.msg;
 ui();
}
// Foco: oscurece el mapa salvo un círculo sobre el único extremo libre que queda. Pausa el juego hasta pulsar Entendido.
function showFocus(pt){
 FO.open=true;FO.pt=pt;closePrim();camCenter(pt.x,pt.y);const el=$('focus');
 el.innerHTML='<div class="fring"></div><div class="fmsg tipc"><b>¡Cuidado!</b> Solo te queda <b>un extremo libre</b>. Si se cierra, no podrás poner más piezas. Usa bifurcaciones y cruces.<button class="go" data-a="focusok">Entendido</button></div>';
 el.classList.add('open');posFocus();
}
function showSolarFocus(bx,by){
 const cells=[];for(let gy=0;gy<NC;gy++)for(let gx=0;gx<NC;gx++)if(S.cc[gy][gx]===1&&!S.occ[(gx*K+1)+','+(gy*K+1)])cells.push({x:gx*K,y:gy*K});if(!cells.length)return false;
 FO.open=true;FO.cells=cells;FO.pt={x:bx*P*K+P*K/2-.5,y:by*P*K+P*K/2-.5};closePrim();camCenter(FO.pt.x,FO.pt.y);const el=$('focus');
 el.innerHTML='<svg class="fsvg"></svg><div class="fmsg tipc"><b>Solares</b> Las casillas marcadas son <b>solares</b>: solo ahí puedes construir torres. Cada pieza trae los suyos.<button class="go" data-a="focusok">Entendido</button></div>';
 el.classList.add('open');posFocus();return true;
}
function closeFocus(){FO.open=false;FO.cells=null;$('focus').classList.remove('open','cells');const a=FO.after;FO.after=null;if(a)a();}
function posFocus(){
 if(!FO.open)return;const r=cv.getBoundingClientRect(),c=$('cw').getBoundingClientRect(),k=sc()/VIEW*r.width;
 const px=((FO.pt.x+.5)*CS-CAM.x)*k+(r.left-c.left),py=((FO.pt.y+.5)*CS-CAM.y)*k+(r.top-c.top),rad=Math.max(44,4.5*K*CS*k);
 if(FO.cells){const W=c.width,H=c.height,q=CS*k,ox=r.left-c.left-CAM.x*k,oy=r.top-c.top-CAM.y*k,rs=FO.cells.map(o=>({x:ox+o.x*CS*k,y:oy+o.y*CS*k,w:K*q}));
  $('focus').firstChild.outerHTML=`<svg class="fsvg" width="${W}" height="${H}"><defs><mask id="fmask"><rect width="${W}" height="${H}" fill="white"/>${rs.map(o=>`<rect x="${o.x}" y="${o.y}" width="${o.w}" height="${o.w}" rx="4" fill="black"/>`).join('')}</mask></defs><rect width="${W}" height="${H}" fill="rgba(8,9,12,.8)" mask="url(#fmask)"/>${rs.map(o=>`<rect class="fcell" x="${o.x}" y="${o.y}" width="${o.w}" height="${o.w}" rx="4"/>`).join('')}</svg>`;
  $('focus').classList.add('top','cells');return;}
 const f=$('focus').firstChild;f.style.left=(px-rad)+'px';f.style.top=(py-rad)+'px';f.style.width=f.style.height=(2*rad)+'px';
 $('focus').classList.toggle('top',py-(r.top-c.top)>r.height*.55);
}
function makePortals(boss){
 if(S.tut)boss=null;const sqs=S.tut?(TUTW[S.round]||['patrol']):waveSquads(S.round),X=sqs.reduce((a,k)=>a+sqN(k),0);
 let k=S.ends.length;while(k>1&&X/k<MINP)k--;
 const mk=e=>({x:e.x,y:e.y,dir:e.dir||[0,0],ln:0,plan:{norm:0,fast:0,tank:0,custodian:0,mini:0,elite:0,boss:0,colossus:0},q:[],t:0});
 const ps=S.ends.slice(0,k).map(mk);
 sqs.forEach((sq,i)=>{const q=ps[i%ps.length];(q.sq=q.sq||[]).push(sq);const m={},sm=sqM(sq);for(const t in sm)for(let n=0;n<sm[t];n++){const u=promote(t,S.round);m[u]=(m[u]||0)+1;}(q.sqm=q.sqm||[]).push(m);for(const t in m)q.plan[t]=(q.plan[t]||0)+m[t];});
 if(S.tut&&S.round===10)ps[0].plan.bob=1;
 if(!boss&&!S.tut&&ELITES[S.round])for(const t in ELITES[S.round])ps[0].plan[t]+=ELITES[S.round][t];
 for(const sc of S.sched||[])if(sc.r===S.round)for(const k in sc.add)ps[0].plan[k]=(ps[0].plan[k]||0)+sc.add[k];
 if(boss){let q=ps.find(q=>q.x===boss.x&&q.y===boss.y);if(!q){q=mk(boss);ps.push(q);}q.plan[ROUNDS===30&&S.round===30?'colossus':'boss']=1;}
 {const cap=S.round<14?1:S.round<=15?2:2+Math.floor((S.round-15)/5);let n=0;for(const q of ps)for(const m of (q.sqm||[])){const g=m.griffin||0;if(!g)continue;const ok=Math.min(g,cap-n),ex=g-ok;n+=ok;m.griffin=ok;if(ex){m.harpy=(m.harpy||0)+ex;q.plan.griffin-=ex;q.plan.harpy=(q.plan.harpy||0)+ex;}}}
 S.portals=ps;
}
