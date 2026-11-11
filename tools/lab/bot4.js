// Bot que juega partidas de Towerize sin trampas (se inyecta en la página).
// window.BOT.play({hero,rounds,startRound,gold,specs,maxSteps}) -> resultado
(function(){
const R=()=>Math.random();
const pick=a=>a[Math.floor(R()*a.length)];
function cover(x,y,rg){let n=0;const r=Math.ceil(rg);for(let yy=y-r;yy<=y+r;yy++)for(let xx=x-r;xx<=x+r;xx++){if(!inb(xx,yy)||S.cells[yy][xx]!==2)continue;if(Math.hypot(xx-x,yy-y)<=rg)n++;}return n;}
function spots(){const out=[];for(let ky=0;ky<NC;ky++)for(let kx=0;kx<NC;kx++){if(S.cc[ky][kx]!==1)continue;const x=kx*K+1,y=ky*K+1;if(S.occ[x+','+y])continue;out.push({x,y});}return out;}
function evalPlace(){ // puntúa la colocación actual
 const f=field(),ends=collectEnds();let mx=0;for(const e of ends){const v=f[e.y]&&f[e.y][e.x];if(v<1e9)mx=Math.max(mx,v);}return mx-25*Math.max(0,ends.length-1);}
function place(cfg){cfg=cfg||{};let best=null;
 for(let pi=0;pi<S.offers.length;pi++){let p=S.offers[pi].p;for(let r=0;r<4;r++){for(let by=0;by<BN;by++)for(let bx=0;bx<BN;bx++){if(check(bx,by,p)!==0)continue;
   const pc=typeof pcost==='function'?pcost(S.offers[pi]):0;if(pc>S.gold)continue;const snap=structuredClone(S);for(let i=0;i<r;i++)rotO(S.offers[pi]);S.pi=pi;placePiece(bx,by);let sc=evalPlace()+R()*6;if(cfg.zone&&S.list.length){let cv=0;for(const t of S.list){const T=TW[t.type];if(T&&!T.uniq)cv+=cover(t.x,t.y,T.range)*(1+t.lvl*.5);}sc+=cv*(cfg.zw||.3);}if(pc){const dk=(snap.deck||[]).filter(k=>TW[k]&&!TW[k].uniq),minC=dk.length?Math.min(...dk.map(k=>TW[k].cost)):60,left=snap.gold-pc;sc+=cfg.bad?(Math.random()*2-.6)*pc*.5:left>=minC*1.5?.15*pc:-.6*pc;}const k=bx+','+by;if(snap.chests[k])sc+=40;if(snap.evts[k])sc+=30;S=snap;
   if(!best||sc>best.sc)best={sc,pi,r,bx,by};}p=rot(p);}}
 if(!best)return false;for(let i=0;i<best.r;i++)rotO(S.offers[best.pi]);S.pi=best.pi;placePiece(best.bx,best.by);{const f=field(),bad=collectEnds().filter(e=>!(f[e.y]&&f[e.y][e.x]<1e9));if(bad.length)window.BADP=(window.BADP||[]).concat(['r'+S.round]);}return true;}
const dps=t=>{const T=twm(t.type,t.spec);return dpsOf(stats(t),T)*(T.splash||T.puddle||T.cone||T.zap?1.6:1);};
const airW=T=>!T.ground&&!T.unit&&S.round>=5?1.4:1;
function spend(cfg){let guard=0;if(window.BOTDECK)S.deck=window.BOTDECK.slice();
 while(guard++<60){const deck=(S.deck||[]).filter(k=>TW[k]&&!TW[k].uniq);const own=S.list.filter(t=>!TW[t.type].uniq);
  const target=Math.min(cfg.tmax||99,(cfg.t0||3)+Math.floor(S.round*(cfg.tr||.7)));const want=1+S.round/(cfg.lr||4.5);
  // mejoras posibles, de la más barata a la más cara
  const ups=[];for(const t of own){const T=TW[t.type];
   if(t.lvl<3)ups.push({c:upCost(T,t.lvl+1),lv:t.lvl,f:()=>upgrade(t)});
   else if(t.lvl===3&&SPECS[t.type]){const ks=Object.keys(SPECS[t.type]),sp=cfg.spec&&cfg.spec[t.type]?cfg.spec[t.type]:ks[(t.id|0)%ks.length]||ks[0];ups.push({c:upCost(T,4),lv:3,f:()=>chooseSpec(t,sp)});}
   else if(t.lvl===4&&t.spec){for(const id of SPECS[t.type][t.spec].ab){const rk=t.ab[id]||0;if(rk>=AB[id].ranks.length||(typeof abReq==='function'&&abReq(t,id)))continue;ups.push({c:AB[id].ranks[rk].c,lv:4+rk*.1,f:()=>buyAb(t,id)});}}}
  ups.sort((a,b)=>a.lv-b.lv||a.c-b.c);
  const avg=own.length?own.reduce((a,t)=>a+t.lvl,0)/own.length:0;let did=false;
  const tryBuild=()=>{if(!deck.length||own.length>=target)return false;const cnt={};for(const t of own)cnt[t.type]=(cnt[t.type]||0)+1;const k=deck.slice().sort((a,b)=>(cnt[a]||0)-(cnt[b]||0))[0],T=TW[k],c=S.half?Math.ceil(T.cost/2):T.cost;if(S.gold<c)return false;
   let b=null;for(const q of spots()){const cv=cover(q.x,q.y,T.range)*(S.buff&&S.buff[q.y]&&S.buff[q.y][q.x]?1.3:1);if(cv&&(!b||cv>b.cv))b={...q,cv};}if(!b)return false;const g0=S.gold;S.tsel=k;build(b.x,b.y);S.tsel=null;return S.gold<g0;};
  const tryUp=()=>{const u=ups.find(u=>S.gold>=u.c);if(!u)return false;const g0=S.gold;u.f();return S.gold<g0;};
  if(own.length<target&&(avg>=want||!ups.length||own.length<3))did=tryBuild()||tryUp();else did=tryUp()||tryBuild();
  if(!did)break;}}
function handleModals(){let n=0;
 while(n++<10){
  if(S.towOff){tryTowerOffer();}
  if(RL.towo){towerPick(pick(RL.towo));continue;}
  if(RL.open&&RL.ev){const E=EVENTS[RL.ev];const ok=E.opts.map((o,i)=>i).filter(i=>!(E.opts[i].req&&E.opts[i].req()));chooseEvent(pick(ok));closeEvent();
   if(S.aim==='sharp'){const t=S.list.find(sharpOk);if(t)sharpAt({x:t.x,y:t.y});else S.aim=null;}
   let g=0;while(S.aim==='dism'&&g++<10){const t=S.list.find(t=>lv1Ok(t)&&!S.dsel.includes(t));if(!t){S.aim=null;break;}dismAt({x:t.x,y:t.y});}
   if(S.aim==='uplace'){const q=uSpots(S.uq[0].bk)[0];if(q)uPlaceAt({x:q.x,y:q.y});else S.aim=null;}
   continue;}
  if(RL.open&&RL.choices&&RL.choices.length){act({target:{closest:()=>({dataset:{a:'relic',id:pick(RL.choices)}})}});continue;}
  if(RL.open){RL.open=false;continue;}
  break;}}
function heroCast(){const H=S.hero;if(!H||H.s.hp<=0)return;const tg=S.enemies.filter(e=>e.hp>0).sort((a,b)=>fieldAt(a)-fieldAt(b))[0];if(!tg)return;
 for(const k of['b','u'])if(!habOk(k)){const p=pathNear(Math.round(tg.x),Math.round(tg.y));if(p)castHab(p,k);}}
window.BOT={play(cfg){
 cfg=cfg||{};const out={rounds:[],res:null};startGame(cfg.rounds||15);S.chests=cfg.noChest?{}:S.chests;chooseHero(cfg.hero||'reinhart');if(window.BOTDECK)S.deck=window.BOTDECK.slice();
 if(cfg.startRound){ // arranque avanzado: coloca piezas hasta la ronda pedida sin oleadas
  for(let r=1;r<cfg.startRound;r++){handleModals();if(S.phase==="place")place(cfg);handleModals();S.gold+=50+S.round*10;nextRound();}}
 if(cfg.gold)S.gold+=cfg.gold;
 let steps=0;
 while(S.phase!=='won'&&S.phase!=='lost'&&steps++<(cfg.maxSteps||400)){
  handleModals();
  if(S.phase==='place'){if(!place()){out.err='noplace r'+S.round;break;}handleModals();continue;}
  if(S.phase==='build'){if(cfg.tax){const inc=S.gold-(S.g0||0);if(inc>0)S.gold-=Math.floor(inc*cfg.tax);}spend(cfg);S.g0=S.gold;handleModals();const hp0=S.hp,r=S.round;startWave();let k=0;
   const lk={};while(S.phase==='wave'&&k++<24000){const pe=S.enemies.slice();update(.05);for(const e of pe)if(e.hp>0&&!S.enemies.includes(e))lk[e.t]=(lk[e.t]||0)+1;if(cfg.hab!==false&&k%20===0)heroCast();if(k%100===0&&!cfg.tax)spend(cfg);}
   if(S.phase==='wave'){out.stall={r:S.round,en:S.enemies.slice(0,4).map(e=>e.t+':'+Math.round(e.hp)+(e.stopped?'*':'')+'@'+fieldAt(e)+' xy'+e.x.toFixed(1)+','+e.y.toFixed(1)+' t'+e.tx+','+e.ty+' c'+((S.cells[Math.round(e.y)]||[])[Math.round(e.x)])+' aw'+!!e.away+' fx'+Object.keys(e.fx).join('/')).join(' ; ')+' relics '+S.relics.join(','),q:S.portals.map(p=>p.q.length).join(','),fury:S.fury,wt:Math.round(S.wt)};break;}
   handleModals();out.rounds.push({r,lk,lost:hp0-S.hp,hp:S.hp,gold:Math.floor(S.gold),tw:S.list.filter(t=>!TW[t.type].uniq).length,lv:S.list.filter(t=>!TW[t.type].uniq).map(t=>t.lvl+(t.spec?t.spec[0]:'')).join(''),hl:S.hero?S.hero.lvl:0,earn:Math.round(S.st.gKill+S.st.gTile+S.st.gRound+S.st.gRel+(S.st.gEv||0)),full:S.list.filter(t=>t.spec&&SPECS[t.type][t.spec].ab.every(id=>(t.ab[id]||0)>=AB[id].ranks.length)).length,l4:S.list.filter(t=>t.lvl>=4&&!TW[t.type].uniq).length,gb:[S.st.gKill,S.st.gTile,S.st.gRound,S.st.gRel,S.st.gEv||0].map(Math.round).join('/')});continue;}
  handleModals();if(RL.open)RL.open=false;
  if(S.phase==='reward'){let g=0;while(S.phase==='reward'&&g++<12){if(S.uq&&S.uq.length){const q=uSpots(S.uq[0].bk)[0];if(q){uPlaceAt({x:q.x,y:q.y});if(S.uq.length&&S.phase==='reward')uPlaceAt({x:q.x,y:q.y});}else S.uq.shift();}else uqFinish();}continue;}
  if(S.phase!=='place'&&S.phase!=='build'&&S.phase!=='won'&&S.phase!=='lost'){out.err='phase '+S.phase;break;}}
 out.res=S.phase;out.round=S.round;out.hp=S.hp;return out;}};
})();
