// Habilidades de las torres de evento (Nv 4): Faro, casas de los cerditos, Gremio, Mímico y Dragón anciano
const OUT=require('path').join(__dirname,'out');require('fs').mkdirSync(OUT,{recursive:true});
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const out={};const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;
 startGame(15);chooseHero('yrsa');if(typeof DLG!=='undefined'&&DLG.on)dlgEnd();S.chests={};S.evts={};RL.open=false;HQ.q=[];if(HQ.cur)hintClose();
 for(let k=0;k<3;k++){for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}RL.open=false;$('relic').classList.remove('open');S.chests={};if(S.phase!=='place'){S.phase='place';deal();}}
 RL.open=false;$('relic').classList.remove('open');S.phase='build';S.gold=99999;
 let path=[];for(let y=0;y<N;y++)for(let x=0;x<N;x++)if(S.cells[y][x]===2)path.push({x,y});
 const dP=q=>Math.min(...path.map(c=>Math.hypot(c.x-q.x,c.y-q.y)));
 const sol=[];for(let y=0;y<N;y++)for(let x=0;x<N;x++)if(S.cells[y][x]===1&&!S.occ[x+','+y]){const q=sqOf(x,y);if(q.x===x&&q.y===y)sol.push(q);}
 sol.sort((a,b)=>dP(a)-dP(b));out.nsol=sol.length;
 const near=(q,n)=>path.slice().sort((a,b)=>Math.hypot(a.x-q.x,a.y-q.y)-Math.hypot(b.x-q.x,b.y-q.y)).slice(0,n||1);
 const mkU=(type,q,lvl)=>{const T=TW[type],tw={id:++S.tid,type,lvl,x:q.x,y:q.y,cells:[[q.x,q.y]],sq:sqCells(q),inv:0,spec:null,ab:{},acd:{},cd:0,tgt:null,mode:'core',rd:S.round};
  if(T.guild)mkGuild(tw);if(T.faro){tw.light=0;tw.lz=[{x:q.x,y:q.y}];tw.lzcd=[0,0];}if(T.dragon){tw.born=S.round-10;tw.stage=3;tw.sd=[];tw.fly={a:0,cd:0,br:2};}
  S.list.push(tw);S.st.all.push(tw);for(const[a,b]of tw.sq)S.occ[a+','+b]=tw;if(T.dragon||T.guild)autoFlag(tw);if(T.pig&&lvl>=4)mkPig(tw);return tw;};
 const dummy=(c,hp,ty)=>{spawnEnemy(ty||'tank',{x:c.x,y:c.y,dir:[0,0]});const e=S.enemies[S.enemies.length-1];e.x=e.tx=c.x;e.y=e.ty=c.y;e.hp=e.max=hp||4000;return e;};
 const run=(s,fn)=>{for(let i=0;i<s*20;i++){update(.05);draw();if(fn)fn();}};
 const clear=()=>{S.enemies=[];S.proj=[];S.logs=[];S.barr=[];S.cz=[];S.pools=[];S.strips=[];S.portals.forEach(p=>{p.q=[];p.qf=[];});};
 // --- sin Nv 4 no hay habilidades ---
 const g3=mkU('glut',sol[0],3);out.noAbLv3=abIds(g3).length===0&&!uabOk(g3);g3.lvl=4;
 out.locked=(()=>{const g=S.gold;buyAb(g3,'mbelly');return !g3.ab.mbelly&&S.gold===g;})();
 const T={glut:g3};let k=1;for(const ty of['faro','straw','wood','brick','guild','dragon'])T[ty]=mkU(ty,sol[k++],4);
 S.deck.push('arrow');S.tsel='arrow';build(sol[k].x,sol[k].y);S.tsel=null;const arrow=S.list[S.list.length-1];out.arrow=arrow.type;
 // menú y fichas antes de comprar
 out.menu=Object.values(T).every(t=>{const o=tmOpts(t).top;return o.length===3&&o.every(x=>x.k==='abuy');});
 const g0=S.gold;let cost=0;for(const t of Object.values(T))for(const id of UAB[t.type])for(const rk of AB[id].ranks){cost+=rk.c;buyAb(t,id);}
 out.allAb=Object.values(T).every(t=>UAB[t.type].every(id=>(t.ab[id]||0)===AB[id].ranks.length));out.paid=g0-S.gold;out.cost=cost;
 out.icons=Object.keys(UAB).every(ty=>UAB[ty].every(id=>AB[id].ic&&AB[id].ic.length));
 out.sheets=Object.values(T).every(t=>{PR.pinned=false;const h=towerInfo(t);return h.includes('Habilidades')&&UAB[t.type].every(id=>h.includes(AB[id].n));});
 out.comp=Object.keys(UAB).every(ty=>{const h=uniqInfo(null,ty,4);return UAB[ty].every(id=>h.includes(AB[id].n));})&&!uniqInfo(null,'glut',3).includes('Engullir');
 out.txt=Object.keys(UAB).every(ty=>UAB[ty].every(id=>AB[id].ranks.every(rk=>{const s=AB[id].txt(rk);return s.length>20&&!/undefined|NaN/.test(s);})));
 startWave();clear();path=path.filter(c=>S.field[c.y][c.x]<1e9&&S.field[c.y][c.x]>4);
 // --- Faro ---
 {const f=T.faro,c=near(arrow)[0];f.lz=[{x:arrow.x,y:arrow.y},{x:arrow.x,y:arrow.y}];const fb=faroBuff(arrow);out.conv=+fb.rg.toFixed(2);f.ab.fconv=0;out.conv0=+faroBuff(arrow).rg.toFixed(2);f.ab.fconv=1;
  f.lz=[{x:c.x,y:c.y},{x:c.x,y:c.y}];const e=dummy(c,90000);e.rev=0;let dz=0,mk=0;run(12,()=>{e.x=e.tx=c.x;e.y=e.ty=c.y;if(e.dz>0||e.fx.stun)dz++;if(e.mk&&e.mk.t>0&&e.mk.cr>=.2)mk++;});out.flash=dz>0;out.mark=mk>100;clear();}
 // --- Casa de paja ---
 {const t=T.straw,cs=near(t.flag||t,3);const es=cs.map(c=>dummy(c,90000));const a0=stats(t).area;t.ab.sheavy=0;const a1=stats(t).area;t.ab.sheavy=2;out.heavy=a0>a1*1.5;
  let hay=0,crow=0,bl=0,lit=0;run(10,()=>{if((S.cz||[]).some(z=>z.k==='hay'))hay++;if(S.proj.some(q=>q.crow))crow++;if(es.some(e=>e.bl&&e.bl.length))bl++;if(S.pools.some(q=>q.tar&&q.src===t))lit++;});out.hay=hay>0;out.crows=crow>0;out.crowBleed=bl>0;
  S.pools=[];const z=(S.cz||[]).find(z=>z.k==='hay');if(z){addBurn(es[0],t,3);es[0].x=z.x;es[0].y=z.y;run(.5);out.hayFire=S.pools.some(q=>q.el==='fire');}else out.hayFire=lit>0||'sin paja';out.phS=S.phase;clear();}
 // --- Casa de madera ---
 {const t=T.wood,cs=near(t.flag||t,3);const es=cs.map(c=>dummy(c,90000));const s=stats(t);t.ab.wlogs=0;const s0=stats(t);t.ab.wlogs=2;out.logs=s.dmg>s0.dmg*1.5&&s.ldur>=s0.ldur+2;
  let big=0,bl=0,spin=0;run(12,()=>{if((S.logs||[]).some(L=>L.big&&L.bl===2))big++;if(es.some(e=>e.bl&&e.bl.length))bl++;if((S.spins||[]).length)spin++;});out.logBig=big>0;out.logBleed=bl>0;out.spin=spin>0;clear();}
 // --- Casa de ladrillo ---
 {const t=T.brick,cs=near(t,3);const es=cs.map(c=>dummy(c,90000));let spk=0,wt=0,brk=0;const h0=es.map(e=>e.hp);run(12,()=>{for(const q of S.barr)if(q.brick){if(q.spk)spk++;wt=Math.max(wt,q.t);}brk=Math.max(brk,...es.map(e=>brkOf(e)));});
  out.spikes=spk>0;out.wallT=+wt.toFixed(1);out.brk=brk;clear();}
 // --- Gremio ---
 {const t=T.guild;out.party=t.sd.map(s=>s.cls).join();const fb=t.sd.find(s=>s.cls==='flagb');for(const s of t.sd){s.x=fb.x;s.y=fb.y;}out.aura=auraAP(t.sd[0]);t.sd[0].x+=3*K;out.auraFar=auraAP(t.sd[0]);t.sd[0].x=fb.x;
  out.loot=guildLoot(t);out.lootOther=guildLoot(arrow);const g=S.gold;const pend=S.pend;S.pend=[];roundRewards();S.pend=pend;out.reward=S.gold-g;
  achDeath({t:'mini',src:t,x:0,y:0,fx:{}});out.ren=+(t.sd[0].ren||0).toFixed(4);unitDeath(t,t.sd[0]);out.renHalf=+(t.sd[0].ren||0).toFixed(4);const h=uniqInfo(t,'guild');out.gSheet=h.includes('Abanderado')&&h.includes('88 🪙')&&h.includes('+100%');}
 // --- Mímico ---
 {const t=T.glut,cs=near(t,2),c=cs[0];const big=dummy(cs[1],90000),e=dummy(c,60,'norm');t.engT=0;t.dig=14;out.dbgG=[Math.hypot(c.x-t.x,c.y-t.y),stats(t).range,S.phase,S.enemies.length];let sw=0,hid=0;run(4,()=>{if(t.belly&&t.belly.e===e)sw++;if(e.sw&&eAlpha(e)===0)hid++;});out.swallow=sw>0;out.hidden=hid>0;out.digest=e.hp<=0&&!S.enemies.includes(e);out.chest=t.dig===0;out.fast=t.engT<=ENGCD/2;
  t.engT=0;big.x=big.tx=c.x;big.y=big.ty=c.y;let sw2=0;run(1.5,()=>{if(t.belly&&t.belly.e===big)sw2++;});out.heldBig=sw2>0&&big.sw===1&&big.hk>0;run(4);out.spit=!t.belly&&!big.sw&&!(big.hk>0)&&big.hp<90000;
  const el=dummy(c,90000,'elite');S.enemies=[el];t.engT=0;run(1);out.eliteBite=!el.sw&&el.hp<90000&&!t.belly;out.phG=S.phase;clear();}
 // --- Dragón anciano ---
 {const t=T.dragon,f=t.flag,cs=near(f,4);const es=cs.map(c=>dummy(c,90000));let strip=0,pass=0,fear=0,burn=0,cells=0;run(14,()=>{const z=(S.strips||[]).find(z=>z.fire);if(z){strip++;cells=Math.max(cells,z.cells.length);}if(t.fly.pass)pass++;if(es.some(e=>e.fx.fear))fear++;if(es.some(e=>e.bn>0))burn++;});
  out.strip=strip>0;out.stripCells=cells;out.pass=pass>0;out.roar=fear>0;out.burn=burn>0;const sa=t.sd[0];out.air=!!(sa&&sa.air)&&sa.max;out.scales=auraAP(sa);
  out.dSheet=(()=>{const h=uniqInfo(t,'dragon');return h.includes('Vida')&&h.includes('Franja de fuego')&&h.includes('6 casillas');})();
  clear();const rt=Object.keys(ET).find(k=>ET[k].rg==='ranged'&&!ET[k].el&&!ET[k].fly);out.ranged=rt;for(const u of unitTowers())if(u!==t)for(const q of u.sd){q.hp=0;q.rt=999;}const re=dummy(cs[0],90000,rt);let mn=sa.hp,blk=0;run(8,()=>{mn=Math.min(mn,sa.hp);if(sa.en||sa.fight)blk++;});out.hit=mn<sa.max;out.noBlock=!blk;
  sa.hp=0;sa.rt=0;clear();dummy(cs[0],90000);run(1);out.down=sa.hp<=0&&sa.rt>10&&!dragonUp(t);run(16);out.back=sa.hp===sa.max;clear();}
 out.err=UABERR?String(UABERR.stack||UABERR):null;return out;});
console.log(JSON.stringify(r));
ck(r.noAbLv3,'un Mímico de Nv 3 no debe tener habilidades');ck(r.locked,'Estómago sin fondo debe pedir Engullir antes');ck(r.menu,'el menú de torre debe ofrecer las 3 habilidades');
ck(r.allAb,'no se han podido comprar todas las habilidades');ck(r.paid>0,'comprar habilidades debe costar oro');ck(r.icons,'falta el icono de alguna habilidad');ck(r.sheets,'la ficha no lista las habilidades');ck(r.comp,'el compendio no lista las habilidades a Nv Máx');ck(r.txt,'algún texto de habilidad sale mal');
ck(r.conv===0.9&&r.conv0===0.6,'Haz convergente: el solape debe dar ×1,5 ('+r.conv+' / '+r.conv0+')');ck(r.flash,'Destello no desorienta');ck(r.mark,'Revelación no marca');
ck(r.heavy,'Fardos pesados no da área');ck(r.hay,'Paja seca no deja paja');ck(r.hayFire===true,'la paja seca no arde: '+r.hayFire);ck(r.crows,'no salen cuervos');ck(r.crowBleed,'los cuervos no hacen sangrar');
ck(r.logs,'Troncos gordos no sube daño y duración');ck(r.logBig,'los troncos no salen gordos y con astillas');ck(r.logBleed,'Astillas no hace sangrar');ck(r.spin,'no hay Hachazo giratorio');
ck(r.spikes,'los muros no llevan pinchos');ck(r.wallT>7,'Muro reforzado no alarga el muro ('+r.wallT+')');ck(r.brk>=8,'Ladrillazo no rompe armadura ('+r.brk+')');
ck(r.party==='tank,rogue,mage,heal,flagb','falta el Abanderado: '+r.party);ck(r.aura>=15&&r.auraFar<r.aura,'el aura del Abanderado no funciona ('+r.aura+' / '+r.auraFar+')');ck(r.loot===2&&r.lootOther===1,'botín del gremio mal: '+r.loot);ck(r.reward===88,'recompensa por ronda mal: '+r.reward);ck(r.ren===0.075&&r.renHalf===0.0375,'Leyenda viva mal: '+r.ren+' / '+r.renHalf);ck(r.gSheet,'la ficha del gremio no refleja las habilidades');
ck(r.swallow&&r.hidden,'Engullir no se traga al enemigo');ck(r.digest,'el enemigo no muere dentro');ck(r.chest,'Estómago sin fondo no cuenta los digeridos');ck(r.heldBig,'no retiene a un enemigo resistente');ck(r.spit,'no escupe al enemigo al acabar el tiempo');ck(r.eliteBite,'una élite no debe ser tragada, sí mordida');
ck(r.strip&&r.stripCells>=12,'la llamarada no deja franja ('+r.stripCells+')');ck(r.pass,'el dragón no hace la pasada');ck(r.roar,'Rugido no aterra');ck(r.burn,'la franja no quema');ck(r.air===220,'el anciano no tiene vida: '+r.air);ck(r.scales>=30,'Escamas no da armadura: '+r.scales);ck(r.dSheet,'ficha del dragón sin datos nuevos');
ck(r.hit,'un enemigo a distancia ('+r.ranged+') no daña al dragón');ck(r.noBlock,'el dragón no debe bloquear');ck(r.down,'el dragón caído debe esperar para reaparecer');ck(r.back,'el dragón no reaparece');ck(!r.err,'error en el módulo: '+r.err);
// el cofre del Mímico se abre solo
await p.waitForTimeout(200);const rel=await p.evaluate(()=>{const o=RL.open;try{RL.open=false;$('relic').classList.remove('open');}catch(e){}return o;});ck(rel,'el Mímico no ha soltado su cofre');
if(fails.length)console.log('FALLOS\n'+fails.join('\n'));console.log(errs.length?JSON.stringify(errs):'[]');await b.close();})();
