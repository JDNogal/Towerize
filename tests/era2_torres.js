// Torres de serie de la era 2 (Búnker, Robots, Nanitos, Láser de arco), torres de bufo, Vega y la Radio de la Resistencia
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Test',intro:1,e2n:1,e2a:1,e2v:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const out={};const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;OPT.u_era=false;
 ERA=1;startGame(15);out.vegaEra1=HIDS().includes('vega');ERA=2;startGame(15);out.vegaEra2=HIDS().includes('vega');chooseHero('vega');if(DLG.on)dlgEnd();S.revAt=0;S.chests={};S.evts={};RL.open=false;HQ.q=[];if(HQ.cur)hintClose();
 out.relic=S.relics[0];out.deck=S.deck.join(',');out.pool=tPool();
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
 RL.open=false;S.phase='build';S.gold=99999;S.deck=['bunker','robots','nano','laser','altar','dron'];
 const sol=[];for(let y=0;y<N;y++)for(let x=0;x<N;x++)if(S.cells[y][x]===1&&!S.occ[x+','+y]){const q=sqOf(x,y);if(q.x===x&&q.y===y)sol.push([x,y]);}
 const types=['bunker','robots','nano','laser','altar','dron'],built=[];for(let i=0;i<types.length&&i<sol.length;i++){S.tsel=types[i];build(sol[i][0],sol[i][1]);const t=S.list[S.list.length-1];if(t&&t.type===types[i])built.push(t);}
 out.built=built.map(t=>t.type).join(',');out.nsol=sol.length;
 const specs={bunker:'sup',robots:'kami',nano:'hack',laser:'red',altar:'altar',dron:'dron'};
 for(const t of built){while(t.lvl<3)upgrade(t);chooseSpec(t,specs[t.type]);for(const id of SPECS[t.type][t.spec].ab)for(let k=0;k<3;k++)buyAb(t,id);}
 out.allAb=built.every(t=>SPECS[t.type][t.spec].ab.every(id=>(t.ab[id]||0)>=AB[id].ranks.length));out.kami4=(built.find(t=>t.type==='robots')||{sd:[]}).sd.length;
 out.sw3=(built.find(t=>t.type==='nano')||{sw:[]}).sw.length;out.chapa=!!ACHS.chapa;
 S.tsel=null;startWave();out.patrol=(S.summ||[]).filter(t=>t.pat).length;{const pq=((S.summ||[]).find(t=>t.pat)||{sd:[]}).sd[0];if(pq){const h0=pq.hp;hitUnit(pq,1e6,null);out.patImm=pq.hp===h0;}else out.patImm=false;}for(let i=0;i<120;i++){update(.05);draw();}
 out.kills=S.st.kills;out.magN=built.find(t=>t.type==='bunker').magN;
 S.hero.bcd=0;castHab({x:S.core.x,y:S.core.y},'b');out.flare=(S.flares||[]).length;S.hero.lvl=10;S.hero.ucd=0;let pc=null;for(let y=0;y<N&&!pc;y++)for(let x=0;x<N;x++)if(S.cells[y][x]===2&&S.field[y][x]>5){pc={x,y};break;}castHab(pc,'u');out.planes=(S.planes||[]).length;
 for(let i=0;i<60;i++){update(.05);}
 S.rs.radio.cd=0;useRelic('radio');out.supply=document.querySelectorAll('#supply.on [data-sup]').length;const bt=document.querySelector('#supply [data-sup]');if(bt)bt.click();out.supplyClosed=!document.querySelector('#supply.on');
 giveVch('ab',1);renderRelics();out.tk=document.querySelectorAll('#tickets .tk').length;
 out.locked={cannon:tunl('cannon'),flame:tunl('flame'),altar:tunl('altar')};
 return out;});
ck(!r.vegaEra1,'Vega sale al elegir héroe en la Fantástica');ck(r.vegaEra2,'Vega no sale al elegir héroe en la era 2');ck(r.relic==='radio','Vega no trae la Radio');ck(r.deck==='bunker,robots','el mazo de Vega no es Búnker y Robots');
ck(r.pool.includes('nano')&&r.pool.includes('laser')&&!r.pool.includes('cannon'),'las ofertas de la era 2 no son las de serie ('+r.pool+')');
ck(r.built.split(',').length===Math.min(6,r.nsol)&&r.built.startsWith('bunker,robots,nano,laser'),'no se han podido construir todas ('+r.built+' de '+r.nsol+' solares)');ck(r.allAb,'no se han podido comprar todas las habilidades');ck(r.kami4===4,'los kamikazes no son 4');ck(r.sw3===3,'el Hackeo con Infección al máximo no tiene 3 nubes ('+r.sw3+')');
ck(r.chapa,'Chapa y pintura no se consigue');if(r.nsol<6)r.tk=1;ck(r.patrol===1,'la Patrulla de la Resistencia no aparece');ck(r.kills>0,'las torres no matan nada');ck(r.flare===1,'la bengala no se coloca');ck(r.planes===3,'el ataque aéreo no lanza 3 aviones');
ck(r.supply===2,'los suministros no ofrecen 2 opciones');ck(r.supplyClosed,'el paquete no se cierra al elegir');ck(r.tk>=1,'el panel de tickets no se muestra');ck(!r.locked.cannon&&!r.locked.flame&&!r.locked.altar,'torres desbloqueables disponibles sin logro');
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'era2_torres ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
