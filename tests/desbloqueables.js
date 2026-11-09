// Torres desbloqueables de la Era Distópica: Lanzallamas (Detonador / Muro de fuego), Chorro de ácido (Corrosión / Nube viajera), Torre sónica (Altavoces / Gigante) y sus logros
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Test',intro:1,e2n:1,e2a:1,e2v:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const out={};const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;OPT.u_era=false;
 out.locked={flame:tunl('flame'),acid:tunl('acid'),sonic:tunl('sonic'),cannon:tunl('cannon')};out.tlock={flame:TLOCK.flame,acid:TLOCK.acid,sonic:TLOCK.sonic,cannon:TLOCK.cannon};
 ERA=2;startGame(15);chooseHero('vega');if(DLG.on)dlgEnd();S.revAt=0;S.chests={};S.evts={};RL.open=false;HQ.q=[];if(HQ.cur)hintClose();
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
 RL.open=false;S.phase='build';S.gold=99999;S.deck=['flame','acid','sonic'];
 // seis torres, una por especialización; si el mapa tiene menos solares, las que quepan
 const types=['flame','flame','acid','acid','sonic','sonic'],specs=['detn','muro','corr','cloud','spk','giant'];
 const sol=[];for(let y=0;y<N;y++)for(let x=0;x<N;x++)if(S.cells[y][x]===1&&!S.occ[x+','+y]){const q=sqOf(x,y);if(q.x===x&&q.y===y)sol.push([x,y]);}
 const built=[];for(let i=0;i<types.length&&i<sol.length;i++){S.tsel=types[i];build(sol[i][0],sol[i][1]);const t=S.list[S.list.length-1];if(t&&t.type===types[i]){built.push(t);while(t.lvl<3)upgrade(t);chooseSpec(t,specs[i]);for(const id of SPECS[t.type][t.spec].ab)for(let k=0;k<3;k++)buyAb(t,id);}}
 out.nsol=sol.length;out.built=built.map(t=>t.type+'/'+t.spec);out.allAb=built.every(t=>SPECS[t.type][t.spec].ab.every(id=>(t.ab[id]||0)>=AB[id].ranks.length));
 out.info=built.every(t=>towerInfo(t).length>500);out.shop=['flame','acid','sonic'].every(k=>shopInfo(k).length>500);
 out.rg1=stats(built[built.length-1]).range;
 // muñecos resistentes junto a cada torre, para que todas tengan a quién disparar
 S.tsel=null;startWave();S.portals.forEach(p=>{p.q=[];p.qf=[];});S.enemies=[];
 const cells=[];for(let yy=0;yy<N;yy++)for(let xx=0;xx<N;xx++)if(S.cells[yy][xx]===2&&S.field[yy][xx]<1e9&&S.field[yy][xx]>3)cells.push({x:xx,y:yy});
 for(const t of built){const cs=cells.slice().sort((a,b)=>Math.hypot(a.x-t.x,a.y-t.y)-Math.hypot(b.x-t.x,b.y-t.y)).slice(0,5);for(const c of cs){spawnEnemy('tank',{x:c.x,y:c.y,dir:[0,0]});const e=S.enemies[S.enemies.length-1];e.x=e.tx=c.x;e.y=e.ty=c.y;e.hp=e.max=4000;}}
 const mx={w:0,c:0,f:0,b:0,g:0};let kbAny=0;for(let i=0;i<500;i++){update(.05);draw();if(!kbAny&&S.enemies.some(e=>(e.kbR||0)>0||(e.kbT||0)>0))kbAny=1;mx.w=Math.max(mx.w,(S.sonw||[]).length);mx.c=Math.max(mx.c,(S.tcl||[]).length);mx.f=Math.max(mx.f,(S.fwall||[]).length);mx.b=Math.max(mx.b,(S.tarb||[]).length);mx.g=Math.max(mx.g,(S.summ||[]).filter(t=>t.beast==='guit').length);}
 out.mx=mx;try{unlTick(.05);}catch(e){out.uerr=e.message;}out.son=built.filter(t=>t.type==='sonic').map(t=>({sp:t.spec,rg:stats(t).range,near:Math.min(...S.enemies.map(e=>Math.hypot(e.x-t.x,e.y-t.y))),n:S.enemies.length}));out.dmg=built.map(t=>Math.round(t.dmgT||0));out.kb=kbAny;out.marcha=ACHBEST.marcha||0;
 CP.tab='tw';toggleComp(true);renderComp();out.comp=document.querySelector('#comp').innerHTML.length;toggleComp(false);
 return out;});
const has=k=>r.built.some(x=>x.startsWith(k));
ck(!r.locked.flame&&!r.locked.acid&&!r.locked.sonic&&!r.locked.cannon,'las torres desbloqueables están disponibles sin su logro');
ck(r.tlock.flame==='herencia'&&r.tlock.acid==='oxido'&&r.tlock.sonic==='marcha'&&r.tlock.cannon==='bombard','los logros de desbloqueo no son los previstos');
ck(r.built.length===Math.min(6,r.nsol),'no se han podido construir todas ('+r.built.join(',')+' de '+r.nsol+' solares)');ck(r.allAb,'no se han podido comprar todas las habilidades');
ck(r.info&&r.shop,'las fichas de las torres no se generan');
if(has('sonic'))ck(r.rg1>2.2*3*1.2*1.15,'el alcance de la Torre sónica no crece más con los niveles ('+r.rg1+')');
if(has('sonic'))ck(r.mx.w>0,'la Torre sónica no lanza ondas');if(has('sonic'))ck(r.kb>0||r.marcha>0,'las ondas no empujan');
if(has('acid/cloud'))ck(r.mx.c>0,'la Nube viajera no suelta nubes');if(has('flame/muro'))ck(r.mx.f>0,'el Muro de fuego no enciende franjas');
if(has('flame/detn'))ck(r.mx.b>0,'los bidones de brea no aparecen');if(has('sonic/spk'))ck(r.mx.g>0,'el guitarrista rebelde no aparece');
ck(r.dmg.every(d=>d>0),'alguna torre no hace daño ('+r.dmg.join(',')+')');ck(r.comp>1000,'el compendio no se genera');
if(fails.length)console.log(JSON.stringify({mx:r.mx,uerr:r.uerr,son:r.son,kb:r.kb,built:r.built}));console.log(fails.length?'FALLOS '+JSON.stringify(fails):'desbloqueables ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
