// Especializaciones nuevas: Senda rúnica (Altar de runas), Dron petrolero (Dron de mantenimiento), Cañón de riel y Drones bombarderos (Cañoneros)
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Test',intro:1,e2n:1,e2a:1,e2v:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const out={};const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;OPT.u_era=false;
 ERA=2;startGame(15);chooseHero('vega');if(DLG.on)dlgEnd();S.revAt=0;S.chests={};S.evts={};RL.open=false;HQ.q=[];if(HQ.cur)hintClose();
 for(let k=0;k<3;k++){for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}RL.open=false;$('relic').classList.remove('open');S.chests={};if(S.phase!=='place'){S.phase='place';deal();}}
 RL.open=false;S.phase='build';S.gold=99999;S.deck=['altar','dron','cannon'];
 out.specs=[Object.keys(SPECS.cannon).join(),Object.keys(SPECS.altar).join(),Object.keys(SPECS.dron).join()];out.weld=AB.weld.n;
 const NEW=['cadena','persist','sello','mancha','chispazo','municion','perfor','recarga','estela','escuad','picado','metafil'];
 out.icons=NEW.every(id=>AB[id]&&AB[id].ic&&AB[id].ic.length&&AB[id].ranks.every(q=>q.c>0));out.spIcons=[SPECS.altar.senda,SPECS.dron.petro,SPECS.cannon.rail,SPECS.cannon.bomb].every(x=>x.ic&&typeof x.ic==='string'&&x.ic.length<=2&&x.ic.charCodeAt(0)>=0xE000);
 out.txt=NEW.every(id=>AB[id].ranks.every(q=>{const s=AB[id].txt(q);return s.length>20&&!/undefined|NaN/.test(s);}));
 let path=[];for(let y=0;y<N;y++)for(let x=0;x<N;x++)if(S.cells[y][x]===2)path.push({x,y});
 const dP=q=>Math.min(...path.map(c=>Math.hypot(c.x-q.x,c.y-q.y)));
 const sol=[];for(let y=0;y<N;y++)for(let x=0;x<N;x++)if(S.cells[y][x]===1&&!S.occ[x+','+y]){const q=sqOf(x,y);if(q.x===x&&q.y===y)sol.push(q);}
 sol.sort((a,b)=>dP(a)-dP(b));
 const mk=(type,spec,q)=>{S.tsel=type;build(q.x,q.y);const t=S.list[S.list.length-1];if(!t||t.type!==type)return null;while(t.lvl<3)upgrade(t);chooseSpec(t,spec);for(const id of SPECS[type][spec].ab)for(let k=0;k<3;k++)buyAb(t,id);return t;};
 const senda=mk('altar','senda',sol[0]),petro=mk('dron','petro',sol[1]),rail=mk('cannon','rail',sol[2]),bomb=mk('cannon','bomb',sol[3]);S.tsel=null;
 out.built=[senda,petro,rail,bomb].map(t=>t&&t.spec);out.allAb=[senda,petro,rail,bomb].every(t=>t&&SPECS[t.type][t.spec].ab.every(id=>(t.ab[id]||0)===AB[id].ranks.length));
 const ALL=S.list.slice(),solo=(...ts)=>{S.list=ts;S.incS=null;const far=path.slice().sort((a,b)=>Math.hypot(b.x-ts[0].x,b.y-ts[0].y)-Math.hypot(a.x-ts[0].x,a.y-ts[0].y))[0];const H=S.hero;H.pt.flag={x:far.x,y:far.y};H.s.x=far.x;H.s.y=far.y;};
 PR.pinned=true;PR.key='tw:'+bomb.id;const hb=towerInfo(bomb);PR.key='tw:'+rail.id;const hr=towerInfo(rail);PR.pinned=false;
 out.noTgt=!hb.includes('data-a="tgt"')&&hr.includes('data-a="tgt"')&&hb.includes('Drones: <b>4</b>');
 out.sheets=towerInfo(senda).includes('explosiva')&&towerInfo(petro).includes('brea')&&towerInfo(senda).includes('Cadena rúnica');
 out.stats=[stats(senda).dmg>0,stats(petro).dmg>0,TW.altar.dmg===0&&TW.dron.dmg===0,stats(rail).pen>=20];
 startWave();path=path.filter(c=>S.field[c.y][c.x]<1e9&&S.field[c.y][c.x]>4);
 const near=(q,n)=>path.slice().sort((a,b)=>Math.hypot(a.x-q.x,a.y-q.y)-Math.hypot(b.x-q.x,b.y-q.y)).slice(0,n||1);
 const dummy=(c,hp,ty)=>{spawnEnemy(ty||'tank',{x:c.x,y:c.y,dir:[0,0]});const e=S.enemies[S.enemies.length-1];e.x=e.tx=c.x;e.y=e.ty=c.y;e.hp=e.max=hp||4000;return e;};
 const run=(s,fn)=>{for(let i=0;i<s*20;i++){update(.05);draw();if(fn)fn();}};
 const clear=()=>{S.enemies=[];S.proj=[];S.cz=[];S.pools=[];S.strips=[];S.srun=[];S.srfly=[];S.rails=[];S.bombs=[];S.portals.forEach(p=>{p.q=[];p.qf=[];});};
 clear();
 // --- Senda rúnica ---
 {const t=senda;solo(t);const cs=near(t,5),es=cs.map(c=>dummy(c,90000));const ks=new Set();let seal=0,root=0,brk=0,two=0,mx=0,buf=0;
  run(30,()=>{es.forEach((e,i)=>{e.x=e.tx=cs[i].x;e.y=e.ty=cs[i].y;});for(const q of S.srun||[]){ks.add(q.k);if(q.seal&&q.cells.length>=9)seal++;if(q.uses===2)two++;}mx=Math.max(mx,(S.srun||[]).filter(q=>!q.seal).length);if(es.some(e=>e.fx.root))root++;brk=Math.max(brk,...es.map(e=>brkOf(e)));if(ALL.some(o=>o.rb))buf++;});
  out.runes=[...ks].sort().join('');out.seal=seal>0;{const e=es[0];e.fx={};S.srun=[{x:e.x,y:e.y,k:'a',src:t,uses:1,arm:0}];sendaAll(.05);if(e.fx.root)root++;S.srun=[{x:e.x,y:e.y,k:'q',src:t,uses:1,arm:0}];sendaAll(.05);brk=Math.max(brk,brkOf(e));}out.root=root>0;out.sbrk=brk;out.persist=two>0;out.runeCap=mx<=SRMAX;out.noBuff=!buf;out.sdmg=es.some(e=>e.hp<90000);
  // cadena: dos runas armadas a menos de 2 casillas; al activar una, salta la otra
  clear();dummy(near(t)[0],90000);S.srun=[{x:10,y:10,k:'x',src:t,uses:1,arm:0},{x:10+K,y:10,k:'q',src:t,uses:1,arm:0},{x:10+8*K,y:10,k:'a',src:t,uses:1,arm:0}];runeFire(S.srun[0],new Set());out.chain=S.srun[0].dead===1&&S.srun[1].dead===1&&!S.srun[2].dead;clear();}
 // --- Dron petrolero ---
 {const t=petro;solo(t);const cs=near(t,4),es=cs.map(c=>dummy(c,90000));let tar=0,stk=0,burn=0,fire=0,far=0;
  run(20,()=>{es.forEach((e,i)=>{e.x=e.tx=cs[i].x;e.y=e.ty=cs[i].y;});if((S.cz||[]).some(z=>z.k==='tar'&&z.pd&&z.src===t))tar++;if(es.some(e=>e.stk>0))stk++;if(es.some(e=>e.bn>0))burn++;if(S.pools.some(q=>q.tar))fire++;if(t.pd&&Math.hypot(t.pd.x-t.x,t.pd.y-t.y)>1)far++;});
  out.tar=tar>0;out.sticky=stk>0;out.spark=burn>0;out.tarFire=fire>0;out.patrol=far>0;out.pdmg=es.some(e=>e.hp<90000);
  S.list=ALL.slice();{const fk={type:'cannon',x:t.x+K,y:t.y,lvl:1,ab:{}},far={type:'cannon',x:t.x+P*K*2,y:t.y+P*K*2,lvl:1,ab:{}};S.list.push(fk,far);const st=incendSet();out.incAdj=st.has(fk)&&!st.has(far)&&!st.has(t);S.list=ALL.slice();}S.incS=new Set([rail]);const e=es[0],b0=e.bn||0;rail.incT=undefined;onHit(e,rail);out.incend=(e.bn||0)>b0;S.incS=null;clear();}
 // --- Cañón de riel ---
 {const t=rail;solo(t);const pos=[[3,0],[5,0],[7,0]].map(([dx,dy])=>({x:t.x+dx,y:t.y+dy})),c0=near(t)[0];
  const shot=()=>{clear();const es=pos.map(q=>dummy(c0,90000));const pin=()=>es.forEach((e,i)=>{e.x=pos[i].x;e.y=pos[i].y;e.fx={};});pin();t.cd=0;t.tgt=null;let fx=0;for(let i=0;i<60&&!fx;i++){pin();update(.05);if((S.railfx||[]).length)fx=1;}return es.map(e=>90000-e.hp);};
  t.ab.perfor=0;t.ab.estela=0;const d0=shot();out.rail=d0.map(v=>Math.round(v));out.loss=d0[0]>0&&Math.abs(d0[1]/d0[0]-.85)<.03&&Math.abs(d0[2]/d0[0]-.7225)<.03;
  t.ab.perfor=1;const d1=shot();out.perfor=d1[0]>0&&Math.abs(d1[1]/d1[0]-1)<.03&&Math.abs(d1[2]/d1[0]-1)<.03;
  t.ab.estela=1;clear();const es=pos.map(q=>dummy(c0,90000)),weak=dummy(c0,1);const pin=()=>{es.forEach((e,i)=>{e.x=pos[i].x;e.y=pos[i].y;});if(weak.hp>0){weak.x=t.x+4;weak.y=t.y;}};pin();t.cd=0;let trail=0,ez=0,hot=0;run(4,()=>{pin();if((S.rails||[]).length)trail++;if(es.some(e=>e.ez&&e.ez.n>0))ez++;hot=Math.max(hot,t.hot||0);});out.trail=trail>0;out.ez=ez>0;out.hot=hot;clear();}
 // --- Drones bombarderos ---
 {const t=bomb;solo(t);const cs=near(t,8),a=dummy(cs[0],90000),c2=cs.slice().sort((x,y)=>Math.hypot(y.x-cs[0].x,y.y-cs[0].y)-Math.hypot(x.x-cs[0].x,x.y-cs[0].y))[0],b2=dummy(c2,90000);
  let nb=0,bl=0,split=0,dive=0,reb=0,towerShot=0;run(16,()=>{a.x=a.tx=cs[0].x;a.y=a.ty=cs[0].y;b2.x=b2.tx=c2.x;b2.y=b2.ty=c2.y;nb=Math.max(nb,(S.bombs||[]).length);bl=Math.max(bl,a.bl?a.bl.length:0,b2.bl?b2.bl.length:0);
   const D=t.bd||[];if(D.some(d=>Math.hypot(d.x-a.x,d.y-a.y)<1)&&D.some(d=>Math.hypot(d.x-b2.x,d.y-b2.y)<1))split++;if(D.some(d=>d.dive))dive++;if(D.some(d=>d.rb>0))reb++;if(S.proj.some(q=>q.src===t))towerShot++;});
  out.drones=t.bd.length;out.bombs=nb>0;out.bleed=bl;out.split=split>0;out.dive=dive>0;out.rebuild=reb>0;out.noTowerShot=!towerShot;out.bdmg=a.hp<90000&&b2.hp<90000;out.sep=Math.round(Math.hypot(c2.x-cs[0].x,c2.y-cs[0].y));clear();}
 S.list=ALL.slice();
 // guardados con los Cañoneros antiguos
 {const rec={v:-1,S:{list:[{type:'cannon',spec:'art',ab:{bombard:1}},{type:'cannon',spec:'mnr',ab:{}}]},g:{}};try{loadRun(rec);}catch(e){}out.migr=rec.S.list.map(o=>o.spec).join();}
 out.err=SPNERR?String(SPNERR.stack||SPNERR):null;return out;});
console.log(JSON.stringify(r));
ck(r.specs[0]==='rail,bomb'&&r.specs[1]==='altar,senda'&&r.specs[2]==='dron,petro','especializaciones mal: '+r.specs);ck(r.weld==='Asistencia de campo','Soldadura debe llamarse Asistencia de campo');
ck(r.icons,'falta icono o precio en alguna habilidad nueva');ck(r.spIcons,'falta el icono de alguna especialización nueva');ck(r.txt,'algún texto de habilidad sale mal');
ck(r.built.join()==='senda,petro,rail,bomb','no se han construido las cuatro: '+r.built);ck(r.allAb,'no se han comprado todas las habilidades');ck(r.noTgt,'los Drones bombarderos no llevan selector de objetivo (el riel sí)');ck(r.sheets,'las fichas no explican la especialización');ck(r.stats.every(Boolean),'estadísticas mal: '+r.stats);
ck(r.runes==='aqx','no rotan los tres tipos de runa: '+r.runes);ck(r.seal,'no sale el Sello mayor');ck(r.root,'la atadura no inmoviliza');ck(r.sbrk>=8,'el quebranto no rompe armadura: '+r.sbrk);ck(r.persist,'Runa persistente no da 2 usos');ck(r.runeCap,'hay más runas de la cuenta en el suelo');ck(r.noBuff,'la Senda rúnica no debe bufar torres');ck(r.sdmg,'las runas no hacen daño');ck(r.chain,'Cadena rúnica no encadena bien');
ck(r.tar,'el dron no suelta brea');ck(r.sticky,'la brea no deja pegajoso');ck(r.spark,'Chispazo no quema');ck(r.tarFire,'la brea no arde');ck(r.patrol,'el dron no recorre el camino');ck(r.pdmg,'la brea no hace daño');ck(r.incend,'Munición incendiaria no quema');ck(r.incAdj,'Munición incendiaria no elige bien las torres vecinas');
ck(r.loss,'el riel debe perder un 15% por enemigo: '+r.rail);ck(r.perfor,'Perforación total no quita la pérdida');ck(r.trail,'no queda Estela iónica');ck(r.ez,'la estela no electriza');ck(r.hot>0,'Recarga en caliente no se activa');
ck(r.drones===4,'Escuadrilla: deben ser 4 drones ('+r.drones+')');ck(r.bombs,'los drones no sueltan bombas');ck(r.bleed>=3,'Metralla afilada no hace sangrar ('+r.bleed+')');ck(r.split||r.sep<4,'los drones no se reparten entre escuadras');ck(r.dive&&r.rebuild,'no hay Bombardeo en picado con reconstrucción');ck(r.noTowerShot,'la torre de los drones no debe disparar');ck(r.bdmg,'las bombas no hacen daño');
ck(r.migr==='rail,bomb','los guardados antiguos no se convierten: '+r.migr);ck(!r.err,'error en el módulo: '+r.err);
if(fails.length)console.log('FALLOS\n'+fails.join('\n'));console.log(errs.length?JSON.stringify(errs):'[]');await b.close();})();
