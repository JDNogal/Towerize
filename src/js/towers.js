// ---- torres ----
const CRIT=.05;
function stats(t){
 if(t.ovr)return t.ovr;
 if(t.hero){const x=hsAt(t.hero.id,t.hero.lvl);return{dmg:x.dmg*(rp('badge')?1.15:1),rate:1/x.cd,range:x.range,crit:CRIT,critm:2,area:0,gold:0,pen:rp('tome')&&t.hero.def.dt==='magic'?10:0};}
 const T=TW[t.type],K=rp('anvil')?1.5:1,L=lvMods(t.type,t.lvl,t.spec);let d=L.dmg,r=1/L.cd,rg=L.range,ar=L.area,gold=0,on=false;
 for(const[x,y]of t.cells){const b=BF[S.buff[y][x]];if(!b)continue;on=true;const Kc=K*(S.bless&&S.bless[Math.floor(x/(N/BN))+','+Math.floor(y/(N/BN))]?2:1);
  d*=1+((b.d||1)-1)*Kc;r/=1+((1/(b.r||1))-1)*Kc;rg*=1+((b.rg||1)-1)*Kc;ar*=1+((b.ar||1)-1)*Kc;gold+=(b.gold||0)*Kc;}
 if(on&&ra('anvil')){r*=2;d*=1.5;}
 {const fb=faroBuff(t);if(fb){rg*=1+fb.rg;d*=1+fb.d;r/=1-fb.c;}}
 if(S.forgeR===S.round&&S.phase==='wave')d*=.8;
 if(t.xd)d*=t.xd;
 if(t.curse>0)r/=1.25;
 {const fs=abRank(t,'fists');if(fs)r/=1-fs.r;}
 if(rp('idol'))d*=1+idolPct()/100;
 if(rp('notebook'))d*=1+Math.min(.2,.02*(S.nbN||0));if(ra('idol'))r*=2;
 if(rp('horn')&&S.wt>=30)d*=1.2;if(ra('horn'))d*=2;if(ra('dice')){const v=S.dice||3;if(v===1)d*=.75;else if(v<=3)d*=1.25;else if(v<=5){d*=1.5;r/=.75;}else{d*=2;r/=.5;}}
 if(rp('map')){d*=1+mapDmg()/100;r/=1-mapCool()/100;}
 if(rp('quiver')&&!T.unit)r/=.85;
 if(rp('trophy'))rg*=1+.05*(S.troN||0);if(ra('trophy'))rg*=1.5;
 const tx=abRank(t,'toxin'),pa=abRank(t,'arcpen'),crit=Math.min(1,CRIT+(tx?tx.cr:0)+(rp('lens')?.1:0)+(ra('lens')?.2:0)),critm=2+(ra('lens')?1:0);
 return{ldur:T.log?logDur(t.lvl):0,dmg:T.dmg*d,rate:T.rate*r,range:T.range*rg,crit,critm,area:(T.splash||T.pr||0)*ar,gold,pen:(L.pen||0)+(pa?pa.pen:0)+(rp('tome')&&twm(t.type,t.spec).dt==='magic'?10:0)};
}
// cadencia de la torre respecto a la de su nivel sin bonus: los charcos (cuyo número no depende de disparar más) la usan para que Potencia y Frenesí sigan siendo un intercambio justo
const rateF=(t,s)=>{try{const T=TW[t.type],L=lvMods(t.type,t.lvl,t.spec);return Math.max(.25,s.rate/(T.rate/(L.cd||1)));}catch(e){return 1;}};
const sqOf=(x,y)=>{const kx=Math.floor(x/K),ky=Math.floor(y/K);return{kx,ky,x:kx*K+1,y:ky*K+1};};
const sqCells=q=>{const a=[];for(let j=0;j<K;j++)for(let i=0;i<K;i++)a.push([q.kx*K+i,q.ky*K+j]);return a;};
// quita la torre elegida en el menú de construcción
function unsel(){if(!S.tsel)return;S.tsel=null;ui();}
// mientras eliges y colocas la pieza no se puede gastar oro en torres (así no te quedas sin oro para sus casillas especiales)
const placeLock=()=>typeof S!=='undefined'&&S&&S.phase==='place'&&!PREVIEWING&&!S.pvE&&!S.pvH;
function plMsg(){S.msg='Primero elige y coloca la pieza.';try{errBubble('Primero elige y coloca la pieza.');}catch(e){}ui();}
function build(fx,fy){if(placeLock()){plMsg();return;}
 const t=TW[S.tsel];if(!t||(S.deck&&!S.deck.includes(S.tsel)))return;if(!inb(fx,fy)){unsel();return;}
 const q=sqOf(fx,fy),x=q.x,y=q.y;
 if(!inbc(q.kx,q.ky)||S.cc[q.ky][q.kx]!==1||S.occ[x+','+y]){unsel();return;}
 if(tutLockBlock(x,y))return;
 const cost0=S.half?Math.ceil(t.cost/2):t.cost;if(S.gold<cost0){S.msg='Oro insuficiente.';ui();return;}
 const tw={id:++S.tid,type:S.tsel,lvl:1,x,y,cells:[[x,y]],sq:sqCells(q),inv:t.cost,bph:phKey(),undo:cost0,spec:null,ab:{},acd:{},cd:0,tgt:null,mode:S.dtg[S.tsel]||'core'};
 if(S.tut&&S.tut.lock){if(S.tut.lock.some(l=>l.x===x&&l.y===y))S.tut.t2id=tw.id;S.tut.lock=null;S.tut.lockAsk=null;}
 see('tw',tw.type);if(t.dt==='elem')hint('elem','Daño elemental','Esta torre hace <b>daño elemental</b>: ignora tanto la armadura como la resistencia mágica.',tgCell(x,y,1.4));if(t.unit)hint('units','Torres de unidades',[['Esta torre no dispara: manda <b>unidades</b> a pelear y bloquear.',tgCell(x,y,1.4)],['Pulsa la torre y luego 🚩 para mover su <b>bandera</b>.',()=>tw.flag?tgCell(tw.flag.x,tw.flag.y,1.2)():tgCell(x,y,1.4)()]]);if(t.unit)mkSoldiers(tw);S.list.push(tw);for(const[a,b]of tw.sq)S.occ[a+','+b]=tw;
 S.gold-=cost0;S.st.spent+=cost0;if(!(S.built=S.built||[]).includes(tw.type))S.built.push(tw.type);if(!TW[tw.type].uniq)(S.bcnt=S.bcnt||{})[tw.type]=(S.bcnt[tw.type]||0)+1;if(S.half&&t.cost>0){S.half=0;tw.inv=cost0;}tw.rd=S.round;S.st.all.push(tw);S.msg='';S.selT=null;if(TOUCH){M.has=false;HV.key=null;HV.t=0;}ui();
}
const upLbl=c=>c?`<span class="gd">−${c} 🪙</span>`:'<span class="gd">gratis</span>';
function upgrade(t){if(placeLock()){plMsg();return;}
 if(t&&TW[t.type].uniq&&!TW[t.type].upc)return;
 if(!t||!S.list.includes(t)||t.lvl>=(TW[t.type].pig?4:3)||!(S.phase==='build'||S.phase==='wave'||S.phase==='place'))return;
 const T=TW[t.type],c=tCost(t,upCost(T,t.lvl+1));
 if(S.gold<c){S.msg='Oro insuficiente para mejorar.'+WISHTXT();ui();return;}
 S.gold-=c;S.st.spent+=c;t.lvl++;t.inv=(t.inv||T.cost)+c;if(undoOk(t))t.undo+=c;if(S.tut&&S.tut.freeUp)S.tut.freeUp=0;
 if(t.sd){const m=sdHp(t);for(const q of t.sd){const dd=m-q.max;q.max=m;if(q.hp>0)q.hp+=dd;}}
 S.msg='';if(T.pig&&t.lvl===4){mkPig(t);reveal('pig4');if(pigHouses().every(h=>h&&h.lvl>=4)&&!S.tut)achieve('pigs');S.msg='¡El '+PIGU[t.type].n.toLowerCase()+' sale a la batalla!';if(pigHouses().every(h=>h&&h.lvl>=4))hint('mecha','¡Mecha Cerdito!',[['Tienes las <b>tres casas</b> a Nv 4.',tgCell(t.x,t.y,1.4)],['Durante la oleada, pulsa 🤖 para que los cerditos se unan en un <b>mecha gigante</b>.',tgEl('[data-a="mecha"]')]]);}refreshPrim();ui();
}
function upText(t){
 const T=TW[t.type],n=t.lvl+1,L=LV[n],p=v=>Math.round((v-1)*100),a=[];
 a.push(`<span class="cd">+${p(L.dmg)}% ${T.unit?'daño del soldado':T.dot||T.burn?'stacks':'daño'}</span>`);
 a.push(`<span class="cr">−${Math.round((1-L.cd)*100)}% enfriamiento</span>`);
 a.push(`<span class="cg">+${p(L.range)}% rango</span>`);
 if(T.splash||T.pr)a.push(`<span class="ca">+${p(L.area)}% área</span>`);
 if(T.unit)a.push(`<span class="chp">+${p(L.hp)}% vida</span>`);
 return a.join(', ');
}
function specCh(t,sp){const L=SPECS[t.type][sp].lv,L3=LV[3],p=(a,b)=>Math.round((a/b-1)*100),a=[];
 const d=p(L.dmg,L3.dmg),c=p(L.cd,L3.cd);
 a.push(`<span class="cd">${d>=0?'+':'−'}${Math.abs(d)}% daño</span>`);a.push(`<span class="cr">${c>=0?'+':'−'}${Math.abs(c)}% enfriamiento</span>`);
 if(L.pen)a.push(`<span class="cph">${L.pen} de penetración ${TW[t.type].dt==='magic'?'mágica':'física'}</span>`);
 return a.join(', ');}
function abList(type,sp,t,pinned){
 return SPECS[type][sp].ab.map(id=>{const D=AB[id],rk=t?(t.ab[id]||0):0,n=D.ranks.length;
  const head=`<div class="row"><span>${kst('ab_'+id,D.n,t?'tw:'+t.id:'')}</span><span>${t?`Rango ${rk}/${n}`:'<span class="gd">'+D.ranks.map(r=>r.c).join(' / ')+' 🪙</span>'}</span></div>`;
  if(!t)return head;
  const show=D.ranks[Math.max(0,Math.min(rk,n-1))];
  let btn='';
  const rq=abReq(t,id);if(rk<n&&rq)btn=`<small class="cd">🔒 ${rq}</small>`;else if(rk<n)btn=pinned?`<div class="tgt"><button data-a="abuy" data-id="${t.id}" data-v="${id}">${rk?'Mejorar a rango '+(rk+1):'Comprar'} (<span class="gd">−${D.ranks[rk].c} 🪙</span>)</button></div>`:'';
  return head+`<small>${rk>=n?D.txt(D.ranks[n-1]):(rk?'Siguiente: ':'')+D.txt(show)}</small>`+btn;}).join('');
}
function upRow(t,pinned){
 const T=TW[t.type];
 if(t.lvl<3){const c=upCost(T,t.lvl+1);
  return `<small>Nv ${t.lvl+1}: ${upText(t)}.</small>`+(pinned?`<div class="tgt"><button data-a="up" data-id="${t.id}">⬆ Mejorar a Nv ${t.lvl+1} (${upLbl(c)})</button></div>`:'<small>Haz clic en la torre para mejorarla.</small>');}
 if(t.lvl===3&&SPECS[t.type]){
  if(!pinned)return '<small>Nv 4: elige entre '+yJ(Object.values(SPECS[t.type]).map(x=>x.n))+'. Haz clic en la torre.</small>';
  const c=upCost(T,4);
  return Object.keys(SPECS[t.type]).map(sp=>{const x=SPECS[t.type][sp];
   return `<div style="margin-top:8px;padding-top:6px;border-top:1px solid var(--line2)"><b>${x.ic} ${x.n}</b><small>${x.d}</small><small>${specCh(t,sp)}</small>${abList(t.type,sp,null)}<div class="tgt"><button data-a="spec" data-id="${t.id}" data-v="${sp}">Elegir ${x.n} (<span class="gd">−${c} 🪙</span>)</button></div></div>`;}).join('');}
 if(t.lvl===4)return '<small>Nivel máximo.</small><div style="margin-top:6px"><b>Habilidades</b></div>'+abList(t.type,t.spec,t,pinned);
 return '<small>Nivel máximo.</small>';
}
function chooseSpec(t,sp){if(placeLock()){plMsg();return;}
 if(!t||!S.list.includes(t)||t.lvl!==3||!SPECS[t.type]||!SPECS[t.type][sp]||!(S.phase==='build'||S.phase==='wave'||S.phase==='place'))return;
 const T=TW[t.type],c=tCost(t,upCost(T,4));
 if(S.gold<c){S.msg='Oro insuficiente para mejorar.'+WISHTXT();ui();return;}
 S.gold-=c;S.st.spent+=c;t.lvl=4;t.spec=sp;t.inv=(t.inv||T.cost)+c;if(undoOk(t))t.undo+=c;t.ab={};t.acd={};if(t.type==='augur'&&sp==='lord'&&!t.flag)autoFlag(t);
 if(t.sd){const m=sdHp(t);for(const q of t.sd){const dd=m-q.max;q.max=m;if(q.hp>0)q.hp=Math.min(m,Math.max(1,q.hp+dd));}}S.msg='';refreshPrim();ui();
}
// habilidades que necesitan otra antes (p. ej. el Caballero Espectral sale de los espectros de «Alzar a los caídos»)
const abReq=(t,id)=>{const r=AB[id]&&AB[id].req;return r&&!(t&&t.ab&&t.ab[r])?'Primero compra «'+AB[r].n+'».':'';};
function buyAb(t,id){if(placeLock()){plMsg();return;}{const w=abReq(t,id);if(w){S.msg=w;try{errBubble(w);}catch(e){}ui();return;}}
 if(!t||!S.list.includes(t)||t.lvl!==4||!SPECS[t.type][t.spec].ab.includes(id)||!(S.phase==='build'||S.phase==='wave'||S.phase==='place'))return;
 const D=AB[id],rk=t.ab[id]||0;if(rk>=D.ranks.length)return;const c=tCost(t,D.ranks[rk].c);
 if(S.gold<c){S.msg='Oro insuficiente para la habilidad.'+WISHTXT();ui();return;}
 S.gold-=c;S.st.spent+=c;t.ab[id]=rk+1;t.inv=(t.inv||TW[t.type].cost)+c;if(undoOk(t))t.undo+=c;if(rk===0)t.acd[id]=0;S.msg='';refreshPrim();ui();
}
function pinTower(t){S.selT=t;openPrim({key:'tw:'+t.id,html:()=>towerInfo(t),rect:cellRect(t.x-1,t.y-1,K),cell:{x:t.x,y:t.y}});PR.pinned=true;refreshPrim();ui();}
function sell(t){
 if(t&&TW[t.type].uniq){S.msg='Las torres únicas no se pueden vender.';ui();return;}
 S.gold+=sellVal(t);S.st.gSell+=sellVal(t);t.sold=1;S.list=S.list.filter(o=>o!==t);
 for(const[a,b]of t.sq)delete S.occ[a+','+b];S.selT=null;if(PR.pinned&&PR.key==='tw:'+t.id)closePrim();ui();
}
// ---- Baluarte: soldados y bandera ----
// Cada soldado ocupa un vértice de un triángulo alrededor de la bandera; si un enemigo entra en el radio de alerta de la bandera, va a por él y al acabar vuelve a su vértice.
const SOFF=[0,1,2].map(i=>{const a=-Math.PI/2+i*2*Math.PI/3;return[Math.cos(a)*TRI,Math.sin(a)*TRI];});
const SOFF4=[[-TRI*.75,-TRI*.75],[TRI*.75,-TRI*.75],[TRI*.75,TRI*.75],[-TRI*.75,TRI*.75]];
const PIGOFF={brick:[0,-.9],wood:[.9,.6],straw:[-.9,.6]};
const slotOf=(t,i)=>{const b=t.flag||{x:t.x,y:t.y};if(t.pigU&&PIGOFF[t.pigU]){const o=PIGOFF[t.pigU];return{x:b.x+o[0],y:b.y+o[1]};}if(t.hero||(t.sd&&t.sd.length===1))return{x:b.x,y:b.y};const o=t.sd&&t.sd.length===4?SOFF4[i]:SOFF[i];return{x:b.x+o[0],y:b.y+o[1]};};
const sdHp=t=>TW[t.type].unit.hp*lvMods(t.type,t.lvl,t.spec).hp*(typeof tileV==='function'?tileV(t,'uhp',1):1),uapOf=t=>(t.uov?t.uov.ap:t.hero?hsAt(t.hero.id,t.hero.lvl).ap:TW[t.type].unit.ap+(tinfo(t).uap||0)+(t.xap||0))+RELARM();
function mkSoldiers(t){const U=TW[t.type].unit;t.sd=[];for(let i=0;i<U.n;i++)t.sd.push({i,x:t.x,y:t.y,hp:sdHp(t),max:sdHp(t),en:null,cd:0,rt:0,tw:t,lock:true,fight:false});}
function autoFlag(t){const R2=stats(t).range,r=Math.ceil(R2);let b=null,bd=1e9;
 for(let y=Math.max(0,t.y-r);y<=Math.min(N-1,t.y+r);y++)for(let x=Math.max(0,t.x-r);x<=Math.min(N-1,t.x+r);x++){if(S.cells[y][x]!==2)continue;const d=Math.hypot(x-t.x,y-t.y);if(d<=R2&&d<bd){bd=d;b={x,y};}}
 if(b)t.flag=b;}
function setFlag(t,c){t.flag={x:c.x,y:c.y};for(const s of t.sd||[]){s.lock=true;s.en=null;s.fight=false;}if(t.pigT)setFlag(t.pigT,c);}
function mkPig(t){const P=PIGU[t.type];if(!t.flag)autoFlag(t);const pt={type:'bastion',lvl:3,pigU:t.type,home:t,x:t.x,y:t.y,cells:[],ab:{},acd:{},flag:t.flag,uov:{n:1,hp:P.hp,ap:P.ap,rez:10,spd:TW.bastion.unit.spd},ovr:{dmg:P.dmg,rate:P.rate,range:(P.range||2.5)*K,crit:CRIT,critm:2,area:0,gold:0,pen:0}};
 pt.sd=[{i:0,x:t.x,y:t.y,hp:P.hp,max:P.hp,en:null,cd:0,rt:0,tw:pt,lock:true,fight:false,wt:2,rng:!!P.rng,pig:t.type}];t.pigT=pt;}
const HOOC=3; // héroe fuera de combate: se mueve 3 veces más rápido
function unitWalk(dt){
 for(const t of unitTowers()){if(t.merc&&S.hero)t.flag=S.hero.pt.flag;if(t.home)t.flag=t.home.flag;if(!t.flag)autoFlag(t);const U=unitOf(t);
  for(const s of t.sd){
   if(s.hp<=0){if(!s.dd){s.dd=1;unitDeath(t,s);}if(t.summ)continue;if(s.rt>0){s.rt-=dt;if(s.rt<=0){s.hp=s.max;s.x=t.x;s.y=t.y;s.en=null;s.lock=true;}}continue;}
   s.dd=0;let tx,ty;
   if(s.en&&!s.lock&&!(s.H&&s.H.def.ranged)&&!s.rng){const e=s.en,dx=e.x-s.x,dy=e.y-s.y,dd=Math.hypot(dx,dy),r=SCONTACT*.85;
    if(dd>r){tx=e.x-dx/dd*r;ty=e.y-dy/dd*r;}else{tx=s.x;ty=s.y;}}
   else{const q=slotOf(t,s.i);tx=q.x;ty=q.y;}
   const dx=tx-s.x,dy=ty-s.y,dd=Math.hypot(dx,dy);
   if(dd>.02){/* fuera de combate = no está atacando ni le están atacando (no basta con que haya oleada o un objetivo lejos) */const ooc=s.H&&(S.phase!=='wave'||(!s.fight&&S.wt-(s.lh??-99)>=2&&S.wt-(s.la??-99)>=1.5));const st=Math.min(dd,U.spd*(t.uspdx||tinfo(t).uspd||1)*(ooc?HOOC:1)*dt);s.x+=dx/dd*st;s.y+=dy/dd*st;}
   if(s.lock&&Math.hypot(tx-s.x,ty-s.y)<=.15)s.lock=false;}}
}
// ---- Monasterio: curación al grupo, trago de calabaza y embriaguez ----
function monkTick(dt){for(const t of S.list){const T=TW[t.type];if(!T||!T.monk||!t.sd)continue;const X=twm(t.type,t.spec),gd=abRank(t,'gourd'),fb=abRank(t,'fireb');
 for(const s of t.sd){if(s.drunk>0)s.drunk-=dt;if(s.gc>0)s.gc-=dt;if(s.hp<=0)continue;
  if(!X.noheal){s.mh=(s.mh===undefined?T.mheal.cd:s.mh)-dt;if(s.mh<=0){s.mh=T.mheal.cd;let lo=null;for(const u of unitTowers())for(const q of u.sd)if(q.hp>0&&q.hp<q.max&&Math.hypot(q.x-s.x,q.y-s.y)<=2*K&&(!lo||q.hp/q.max<lo.hp/lo.max))lo=q;
   if(lo){lo.hp=Math.min(lo.max,lo.hp+lo.max*T.mheal.p);S.fx.push({x:lo.x,y:lo.y,t:.5,m:.5,r:.7*K,col:'#9ff0b0'});}}}
  if(gd&&s.hp<s.max*.5&&!(s.gc>0)){s.gc=8;s.drunk=5;s.hp=Math.min(s.max,s.hp+s.max*gd.h);S.fx.push({x:s.x,y:s.y,t:.5,m:.5,r:.7*K,col:'#c99ae0'});
   if(fb){const tg=s.en&&s.en.hp>0?s.en:S.enemies.find(e=>e.hp>0&&Math.hypot(e.x-s.x,e.y-s.y)<=1.5*K);if(tg){const a=Math.atan2(tg.y-s.y,tg.x-s.x),n=stats(t).dmg*1.2*fb.m;
     for(const e of S.enemies){if(e.hp<=0)continue;const dx=e.x-s.x,dy=e.y-s.y;if(Math.hypot(dx,dy)>1.5*K)continue;let da=Math.abs(Math.atan2(dy,dx)-a);if(da>Math.PI)da=2*Math.PI-da;if(da<=Math.PI/4||e===tg)addBurn(e,t,n);}
     S.fx.push({x:s.x+Math.cos(a)*.6*K,y:s.y+Math.sin(a)*.6*K,t:.45,m:.45,r:.8*K,col:'#ff8a3c'});}}}}}}
function unitCombat(dt){
 const SL=[];for(const t of unitTowers())for(const s of t.sd)if(s.hp>0&&!(s.H&&s.H.camo>0))SL.push(s);
 for(const e of S.enemies){e.stopped=false;e.nb=0;e.ct=0;}
 const fl=s=>s.tw.flag||s.tw;
 for(const s of SL)s.w=s.wt||(s.H?s.H.def.w+(s.H.id==='reinhart'&&s.H.lvl>=4?1:0):s.cls==='tank'?2:abRank(s.tw,'wall')?2:1);
 for(const s of SL){
  if(s.lock||(s.en&&(!(s.en.hp>0)||!S.enemies.includes(s.en)||Math.hypot(fl(s).x-s.en.x,fl(s).y-s.en.y)>(s.tw.alert||ALERT)+SCONTACT*2+(s.enR===s.en?RANGED_R:0))))s.en=null;
  if(s.en)s.en.nb+=s.w;}
 for(const s of SL){if(s.en||s.lock)continue;let be=null,bd=1e9;const f0=fl(s);
  for(const e of S.enemies){if(e.hp<=0||e.nb>=(ET[e.t].need||1)||ET[e.t].dodge||(isFly(e)&&!(s.H&&s.H.def.ranged)&&!s.rng))continue;if(Math.hypot(f0.x-e.x,f0.y-e.y)>(s.tw.alert||ALERT))continue;const E2=ET[e.t],d=Math.hypot(s.x-e.x,s.y-e.y)-(s.pref&&(E2.rg==='ranged'||E2.eheal||E2.curse||E2.aura)?100:0);if(d<bd){bd=d;be=e;}}
  if(be){s.en=be;be.nb+=s.w;s.cd=0;}}
 for(const s of SL){s.fight=!!(s.en&&!s.lock&&Math.hypot(s.x-s.en.x,s.y-s.en.y)<=SCONTACT);if(s.fight)s.en.ct+=s.w;}
 // bloqueo múltiple: con capacidad sobrante (corpulencia − lo que necesita su enemigo), retiene además a otro enemigo cercano
 for(const s of SL){const rem=s.fight&&!(s.H&&s.H.def.ranged)&&!s.rng?s.w-(ET[s.en.t].need||1):0;
  if(s.en2&&(rem<1||!(s.en2.hp>0)||s.en2===s.en||!S.enemies.includes(s.en2)||(ET[s.en2.t].need||1)>rem||Math.hypot(s.x-s.en2.x,s.y-s.en2.y)>SCONTACT*1.25))s.en2=null;
  if(!s.en2&&rem>=1){let be=null,bd=SCONTACT;for(const e of S.enemies){const E=ET[e.t];if(e.hp<=0||e===s.en||E.dodge||isFly(e)||E.rg==='ranged'||(E.need||1)>rem||e.ct>=(E.need||1))continue;const d=Math.hypot(s.x-e.x,s.y-e.y);if(d<=bd){bd=d;be=e;}}s.en2=be;}
  if(s.en2)s.en2.ct+=ET[s.en2.t].need||1;}
 for(const s of SL){
  if(s.H&&s.H.def.ranged){heroShoot(s,dt);continue;}
  if(s.rng){unitShoot(s,dt);continue;}
  if(!s.en){uRegen(s,dt);continue;}
  if(!s.fight){s.cd=0;continue;}
  const t=s.tw,st=stats(t);s.cd-=dt;let n=0;
  const CM=CLS[s.cls]||CLS0;while(s.cd<=0&&n++<4&&s.en&&s.en.hp>0){s.cd+=1/(st.rate*CM.rt);const crit=Math.random()<st.crit+CM.cr+mkB(s.en),bk=abRank(t,'back'),bm=bk&&s.bk!==s.en?bk.m:1;if(bk)s.bk=s.en;{const dh=st.dmg*CM.d*(crit?st.critm:1)*bm*(1+(s.ren||0));sfxHit(s.H?null:t,'phys',s);hurt(s.en,dh,t,s.H&&s.H.def.dt||'phys');if(s.H&&s.H.id==='yrsa'&&s.en.hp>0){s.alt=!s.alt;if(s.alt)addBurn(s.en,t,2);else addChill(s.en,t,2);S.fx.push({x:s.en.x,y:s.en.y,t:.15,m:.15,r:.35*K,col:s.alt?'#ff7a3c':'#9fe4ff'});}const MT=TW[t.type];if(MT&&MT.monk&&s.en.hp>0){const ch=abRank(t,'chi');DNK='magic';hurt(s.en,dh*(ch?ch.m:MT.mhit),t,'magic');DNK=null;}}if(crit)critMark(s.en);onHit(s.en,t);if(s.pig==='wood'&&s.en.hp>0){s.pk=(s.pk||0)+1;if(s.pk>=3){s.pk=0;knock(s.en,PIGU.wood.push*K);}}
   const ck=abRank(t,'cut');if(ck&&s.en.hp>0){const q=s.en;if(q.bl&&q.bl.length){DNK='bleed';hurt(q,q.bl.length*BLEEDD,t,'elem');DNK=null;}if(Math.random()<ck.p)addBleed(q,t,1);}}}
 for(const e of S.enemies){const E=ET[e.t];let tg=null;
  if(e.hp<=0||e.fx.freeze||e.fx.poly||e.fx.fear){e.acd=E.ac;continue;}
  if(E.rg==='ranged'){if(e.rw>0)e.rw-=dt;else{let bd=RANGED_R;for(const s of SL){if(s.H&&s.H.camo>0)continue;const d=Math.hypot(s.x-e.x,s.y-e.y);if(d<=bd){bd=d;tg=s;}}
   if(tg){if(e.rsH===undefined||e.hp<e.rsH-.01){e.rsH=e.hp;e.rsT=0;}else e.rsT=(e.rsT||0)+dt;if(e.rsT>20){e.rsT=0;e.rw=3;tg=null;}else{e.stopped=true;if(!tg.en&&!tg.lock&&!(tg.H&&tg.H.def.ranged)&&!tg.rng&&!isFly(e)){tg.en=e;tg.enR=e;e.nb=(e.nb||0)+tg.w;}}}else e.rsT=0;}}
  else if(e.ct>0){/* cuerpo a cuerpo: a cada unidad solo le pega el enemigo con el que está peleando (los que retiene de más esperan) */tg=SL.find(s=>s.fight&&s.en===e)||null;if(tg&&Math.hypot(tg.x-e.x,tg.y-e.y)>MELR)tg=null;e.stopped=e.ct>=(E.need||1);}
  if(tg){const U=unitOf(tg.tw);e.acd=(e.acd===undefined?E.ac:e.acd)-dt;
   while(e.acd<=0&&tg.hp>0){e.acd+=E.ac;if(E.rg==='ranged')S.fx.push({x:tg.x,y:tg.y,t:.25,m:.25,r:.35*K,col:E.dt==='magic'?'#a58bff':'#d9c08a'});const sg=tg.drunk>0&&abRank(tg.tw,'stagger');if(sg&&Math.random()<sg.p){if(S.pvE&&S.dn)dnAdd(tg,0,'taken');continue;}
    {const co=abRank(tg.tw,'counter');if(co&&Math.random()<co.p){const cs=stats(tg.tw),cd=cs.dmg;hurt(e,cd,tg.tw,'phys');const MT=TW[tg.tw.type],ch=abRank(tg.tw,'chi');if(MT&&MT.monk){DNK='magic';hurt(e,cd*(ch?ch.m:MT.mhit),tg.tw,'magic');DNK=null;}S.fx.push({x:e.x,y:e.y,t:.2,m:.2,r:.4*K,col:'#ffd27a'});}}
    const ua=E.dt==='magic'?auraAP(tg):(uapOf(tg.tw)+auraAP(tg)+((CLS[tg.cls]||CLS0).ap))*(1-(E.pierce||0)),wl=abRank(tg.tw,'wall'),dg=abRank(tg.tw,'dodge');if(!(dg&&Math.random()<dg.p)){let ud=(tg.H&&tg.H.inv>0)?0:E.ud*udM(e)*furyM()*(1-ua/(ua+ARM_K))*(1-(wl?wl.red:0))*(tg.H&&tg.H.id==='reinhart'&&tg.H.lvl>=4?.85:1);if(ud>0&&typeof uHitMod==='function')ud=uHitMod(tg,ud,e);tg.hp-=ud;tg.lh=S.wt;if(S.pvE&&S.dn)dnAdd(tg,ud,'taken');if(E.splashU&&typeof splashUnits==='function')splashUnits(tg,ud*.5,e);if(E.upois&&typeof uAddPois==='function')uAddPois(tg,E.upois,e);}if(tg.hp<=0&&!tg.H&&ra('banner'))tg.hp=1;if(tg.hp<=0){if(tg.H&&S.st)S.st.hDie=(S.st.hDie||0)+1;tg.rt=U.rez*(!tg.H&&rp('banner')?.7:1);tg.en=null;tg.fight=false;}}}
  else e.acd=E.ac;}
 monkTick(dt);
 for(const b of S.barr)for(const e of S.enemies)if(e.hp>0&&!isFly(e)&&segD(e.x+.5,e.y+.5,b.seg)<=1.1){e.stopped=true;if(!e.bq){e.bq=1;RS('barricade').n++;}}
}
// Sylvana: dispara desde su posición al enemigo más cercano dentro de su alcance; si uno la alcanza, lo bloquea y le pega cuerpo a cuerpo con la mitad de daño.
function heroShoot(s,dt){const H=s.H,t=s.tw,st=stats(t);s.cd-=dt;let tg=s.fight?s.en:null;
 if(!tg){let bd=st.range;for(const e of S.enemies)if(e.hp>0&&!ET[e.t].dodge){const d=Math.hypot(e.x-s.x,e.y-s.y);if(d<=bd){bd=d;tg=e;}}}
 if(!tg){s.cd=Math.max(s.cd,0);if(!s.en)uRegen(s,dt);return;}
 let n=0;while(s.cd<=0&&n++<4){s.cd+=1/st.rate;const crit=Math.random()<st.crit+mkB(tg),dm=st.dmg*(crit?st.critm:1);
  if(s.fight){hurt(tg,dm*HMELEE,t,H.def.dt||'phys',st.pen);if(crit)critMark(tg);onHit(tg,t);}
  else{const ov=H.id==='radagast'&&H.lvl>=4&&((H.oc=(H.oc||0)+1)%4===0);S.proj.push({x:s.x,y:s.y,e:tg,tx:tg.x,ty:tg.y,vx:0,vy:0,dm:dm*(ov?2:1),dt:H.def.dt||'phys',src:t,sp:14,area:(H.def.area?H.def.area*K:0)*(ov?2:1),slow:0,pen:st.pen,col:ov?'#e2b8ff':H.def.col,crit});}}}
// atajo para mover la bandera (clic derecho, mantener pulsado en móvil o tecla B): bandera de unidades, nube del Señor de la Tormenta o la luz del Faro
function quickFlag(t){if(!t||!S.list.includes(t)||!(S.phase==='build'||S.phase==='wave'||S.phase==='place'))return false;
 if(S.aim==='flag'&&S.aimT===t){S.aim=null;S.aimT=null;S.msg='';renderRelics();ui();return true;}
 try{tmClose();}catch(e){}S.selT=null;
 if(TW[t.type].faro){const cd=S.phase==='wave'?((t.lzcd||[0,0])[0]||0):0;if(cd>0){errBubble('La luz se podrá mover en '+Math.ceil(cd)+' s.');return true;}S.aim='faroz';S.flzSel={id:t.id,i:0};S.msg='Elige dónde proyectar la luz del Faro (Esc para cancelar).';renderRelics();ui();return true;}
 if(tmHas(t,'flag')){startFlag(t);return true;}return false;}
function startFlag(t){/* casas de los cerditos en Nv 4: el cerdito se mueve como un héroe, por todo el mapa (junto a los demás) */if(TW[t.type]&&TW[t.type].pig&&t.pigT&&pigsOn()){closePrim();S.aim='pigs';S.aimT=null;S.msg='Elige una casilla del camino a la que mover a los cerditos (Esc o el mismo botón para cancelar).';renderRelics();ui();return;}
 closePrim();S.aim='flag';S.aimT=t;S.msg='Elige una casilla del camino dentro del rango. Haz clic fuera del círculo para cancelar.';renderRelics();ui();}
