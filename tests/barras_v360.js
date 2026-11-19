// v360 · Tanda 2 de barras: Racha (Ballesteros), Concentración y Sin pestañear (Nido), Presión y tope de 6 por roca (Ogros),
// Reserva de escarcha (Guardián de la Ventisca), Botín (Sede del Gremio); barras en la ficha, palabras clave, Mecánicas y partidas guardadas antiguas
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Test',intro:1,e2n:1,e2a:1,e2v:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(async()=>{const W=ms=>new Promise(r=>setTimeout(r,ms));const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;startGame(15);chooseHero('reinhart');for(let i=0;i<5&&DLG.on;i++)dlgEnd();try{lbClose(true);}catch(e){}HQ.q=[];if(HQ.cur)hintClose();S.chests={};S.evts={};
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}}
 RL.open=false;$('relic').classList.remove('open');S.gold=99999;S.deck=['arrow','bunker','cata','frost'];ui();
 const free=[];for(let gy=0;gy<NC;gy++)for(let gx=0;gx<NC;gx++)if(S.cc[gy][gx]===1)free.push([gx,gy,Math.hypot(gx*K-S.core.x,gy*K-S.core.y)]);free.sort((a,b)=>a[2]-b[2]);
 const T={};let j=0;for(const k of S.deck){S.tsel=k;for(;j<free.length;j++){const n=S.list.length;build(free[j][0]*K+K/2,free[j][1]*K+K/2);if(S.list.length>n){T[k]=S.list[S.list.length-1];j++;break;}}}S.tsel=null;
 const X=T.arrow,N=T.bunker,O=T.cata,V=T.frost;X.lvl=N.lvl=O.lvl=V.lvl=4;X.spec='xbow';N.spec='nido';O.spec='ogre';V.spec='vent';for(const t of [X,N,O,V]){t.ab={};t.acd={};}
 const o={};
 // las habilidades sustituidas ya no existen y las nuevas ocupan su hueco
 o.gone=['pierce','weak','aval','blizz','gcontr'].every(k=>!AB[k]);o.slots=abIds(X).includes('racha')&&abIds(N).includes('concen')&&abIds(O).includes('presion')&&abIds(V).includes('resv')&&UAB.guild.includes('botin');
 o.noMech=[X,N,O,V].every(t=>!ftMech(t));
 let path=[];for(let y=0;y<S.cells.length;y++)for(let x=0;x<S.cells[y].length;x++)if(S.cells[y][x]===2)path.push({x,y});
 const en=(c,hp,ty)=>{spawnEnemy(ty||'tank',{x:c.x,y:c.y,dir:[0,0]});const e=S.enemies[S.enemies.length-1];e.x=e.tx=c.x;e.y=e.ty=c.y;e.hp=e.max=hp||1e6;return e;};
 // --- Racha ---
 X.ab.racha=3;const d0=stats(X).dmg,r0=stats(X).rate,c0=path[0];const e1=en(c0),e2=en(c0);
 strike(e1,1,X,'phys',0);strike(e1,1,X,'phys',0);o.r2=X.rkN===2&&Math.abs(stats(X).dmg/d0-1.2)<1e-6&&Math.abs(stats(X).rate/r0-1.1)<1e-6;
 for(let k=0;k<5;k++)strike(e1,1,X,'phys',0);o.rMax=X.rkN===AB.racha.ranks[2].n;strike(e2,1,X,'phys',0);o.rSwitch=X.rkN===1;e2.hp=1;strike(e2,5,X,'phys',0);o.rKill=X.rkN===0;
 // --- Concentración y Sin pestañear ---
 const nd0=stats(N),cdB=1/nd0.rate,dB=nd0.dmg;o.blinkReq=/Concentración/.test(abReq(N,'blink'));N.ab.concen=1;const nd=stats(N);o.conc=Math.abs(1/nd.rate-cdB*KCONC)<1e-6&&Math.abs(nd.dmg/dB-AB.concen.ranks[0].m)<1e-6;
 N.ab.blink=1;N.cd=1;N.blT=0;const s=stats(N);mechTick(N,null,s,.1);const slow=N.cd;N.blT=2;mechTick(N,null,s,.1);o.blink=Math.abs(slow-1)<1e-6&&Math.abs(N.cd-.9)<1e-6;
 S.list.includes(N);const e3=en(c0);e3.hp=0;N.blT=0;onHit(e3,N);o.blinkKill=N.blT===2;
 // --- Presión y tope de 6 por roca ---
 S.enemies=[];const cp=path[Math.floor(path.length/2)];const L=[];for(let k=0;k<10;k++)L.push(en(cp));S.rolls=[];
 rollStart(O,cp.x,cp.y,cp.x,cp.y,false);rollTick(.01);o.cap=L.filter(e=>e.hp<e.max).length===ROLLMX;o.noPres=!(O.pres>0);
 O.ab.presion=1;for(const e of L)e.hp=e.max;S.rolls=[];rollStart(O,cp.x,cp.y,cp.x,cp.y,false);rollTick(.01);o.pres=O.pres===ROLLMX;
 O.pres=AB.presion.ranks[0].n;S.rolls=[];rollStart(O,cp.x,cp.y,cp.x,cp.y,false);const av=S.rolls[S.rolls.length-1];o.aval=!!(av&&av.big&&av.mx===12&&O.pres===0);
 for(const e of L)e.hp=e.max;rollTick(.01);o.avCap=L.filter(e=>e.hp<e.max).length===10;
 O.ab.presion=2;O.pres=20;S.rolls=[];rollStart(O,cp.x,cp.y,cp.x,cp.y,false);const av2=S.rolls[S.rolls.length-1];o.aval2=!!(av2&&av2.big&&av2.mx===16);S.rolls=[];
 // --- Reserva de escarcha ---
 S.enemies=[];V.ab.resv=1;V.resvV=0;const vs=stats(V);const nearV=path.filter(c=>Math.hypot(c.x-V.x,c.y-V.y)<=vs.range-.2);const cv=nearV[0];
 const E6=[];for(let k=0;k<RESVN;k++)E6.push(en(cv));let tt=0;while(!V.resvF&&tt<60){mechTick(V,null,vs,.1);tt+=.1;}
 o.resv30=Math.abs(tt-30)<.6&&V.resvF===1&&E6.every(e=>e.fx.freeze);o.resvT=[+tt.toFixed(1),V.resvF,E6.map(e=>!!e.fx.freeze).join()];
 for(const e of E6)delete e.fx.freeze;for(let k=0;k<12;k++)E6.push(en(cv));V.resvV=0;tt=0;const f0=V.resvF;while(V.resvF===f0&&tt<60){mechTick(V,null,vs,.1);tt+=.1;}o.resvFast=Math.abs(tt-10)<.6;
 S.enemies=[];V.resvV=.5;mechTick(V,null,vs,5);o.resvIdle=V.resvV===.5;
 // --- Botín ---
 const q=free[j+2],sq=sqOf(Math.floor(q[0]*K+K/2),Math.floor(q[1]*K+K/2));const G={id:++S.tid,type:'guild',lvl:4,x:sq.x,y:sq.y,cells:[[sq.x,sq.y]],sq:sqCells(sq),inv:0,spec:null,ab:{},acd:{},cd:0,tgt:null,mode:'core',rd:S.round};mkGuild(G);S.list.push(G);S.st.all.push(G);
 o.bNo=(()=>{botinKill({src:G,t:'norm'});return !G.btK;})();G.ab.botin=1;let g=S.gold;for(let k=0;k<BOTK*BOTN;k++)botinKill({src:G,t:'norm'});o.b1=S.gold-g===30&&!G.btC;
 G.ab.botin=2;g=S.gold;for(let k=0;k<BOTK*BOTN*BOTC;k++)botinKill({src:G,t:'norm'});o.b2=S.gold-g===45*BOTC&&G.btC===0&&S.botR===1;
 botinKill({src:G,t:'norm',leak:1});o.bLeak=!G.btK;
 // la reliquia llega en la siguiente pieza que se coloca
 S.phase='place';deal();const op=S.offers[0];let placed=0;for(let rr=0;rr<4&&!placed;rr++){for(let by=0;by<BN&&!placed;by++)for(let bx=0;bx<BN&&!placed;bx++)if(check(bx,by,op.p)===0&&!S.chests[bx+','+by]&&!S.evts[bx+','+by]){S.pi=0;placePiece(bx,by);placed=1;}if(!placed)rotO(op);}
 o.relic=placed&&RL.open&&S.botR===0;RL.open=false;$('relic').classList.remove('open');S.phase='build';
 // --- ficha: barras dibujadas, etiqueta y palabra clave ---
 X.rkN=2;N.blT=1;O.pres=7;V.resvV=.4;G.btK=20;G.btC=2;
 o.cv={};for(const [k,t] of [['racha',X],['concen',N],['pres',O],['resv',V],['botin',G]]){pinTower(t);await W(450);const c=document.querySelector('canvas.b6c[data-k="'+k+'"]');const lb=c&&c.parentElement.querySelector('.ftml');const kwE=c&&c.parentElement.querySelector('.ftmt [data-kw="'+(k)+'"]');
  o.cv[k]=!!(c&&c.width>0&&lb&&lb.textContent.length>1&&kwE);}
 o.lab={racha:B6K.racha.l(X),concen:B6K.concen.l(N),pres:B6K.pres.l(O),botin:B6K.botin.l(G)};
 o.kw=['racha','concen','pres','resv','botin'].every(k=>{const h=kwHtml(k,'');return h&&h.length>60&&!!ICKW[k]&&MECI[k];});
 // partidas guardadas antes de la v360: la habilidad sustituida pasa a la nueva con su rango
 {const t={type:'arrow',spec:'xbow',lvl:4,ab:{pierce:2,charged:1},acd:{}},u={type:'cata',spec:'ogre',lvl:4,ab:{aval:2},acd:{aval:3}},w={type:'guild',lvl:4,ab:{gcontr:1},acd:{}};const S0=S;S={list:[t,u,w]};try{b6Mig();}finally{S=S0;}
  o.mig=t.ab.racha===2&&!t.ab.pierce&&t.ab.charged===1&&u.ab.presion===2&&!('aval' in u.acd)&&w.ab.botin===1&&!w.ab.gcontr;}
 return o;});
console.log(JSON.stringify(r));
ck(r.gone,'quedan habilidades sustituidas');ck(r.slots,'las nuevas habilidades no están en su hueco');ck(r.noMech,'sin la habilidad no debe salir barra');
ck(r.r2,'Racha: +10 % de daño y +5 % de velocidad por punto');ck(r.rMax,'Racha: tope según el rango');ck(r.rSwitch,'Racha: al cambiar de objetivo empieza de nuevo');ck(r.rKill,'Racha: al matar se pierde');
ck(r.blinkReq,'Sin pestañear pide Concentración');ck(r.conc,'Concentración: triple de enfriamiento y +230 % de daño');ck(r.blink,'Sin pestañear: se concentra el doble de rápido');ck(r.blinkKill,'Sin pestañear: se activa al matar');
ck(r.cap,'cada roca arrolla como mucho a 6');ck(r.noPres,'sin la habilidad no hay Presión');ck(r.pres,'cada enemigo arrollado suma Presión');ck(r.aval,'con la Presión llena sale una avalancha (tope 12)');ck(r.avCap,'la avalancha arrolla a más de 6');ck(r.aval2,'rango 2: Presión 20 y tope 16');
ck(r.resv30,'Reserva: con 6 enemigos se llena en 30 s y congela');ck(r.resvFast,'Reserva: con muchos enemigos, como mucho el triple de rápido');ck(r.resvIdle,'Reserva: sin enemigos no se llena');
ck(r.bNo,'sin Botín no cuenta');ck(r.b1,'Botín rango 1: 30 de oro cada 45 bajas');ck(r.b2,'Botín rango 2: 45 de oro y una reliquia cada 5 repartos');ck(r.bLeak,'los que llegan al núcleo no cuentan');ck(r.relic,'la reliquia del Botín llega al colocar la siguiente pieza');
ck(Object.values(r.cv).every(Boolean),'faltan barras en la ficha: '+JSON.stringify(r.cv));ck(r.kw,'faltan palabras clave, iconos o entradas de Mecánicas');ck(r.mig,'partidas guardadas antiguas: no se pasan las habilidades');
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'barras_v360 ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();if(fails.length||errs.length)process.exit(1);})();
