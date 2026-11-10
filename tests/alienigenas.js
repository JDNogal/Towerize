// Criaturas alienígenas: enjambre 4/5/6, Simbiosis, Colmena (8, larvas, puesta, corrosión), Depredadores (3, corpulencia 2, devorar, emboscada, frenesí) y desbloqueo con Korr
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Test',intro:1,e2n:1,e2a:1,e2v:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const out={};const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;OPT.u_era=false;
 out.lockedBefore=!tunl('alien');
 ERA=2;startGame(15);chooseHero(HIDS()[0]);if(DLG.on)dlgEnd();S.revAt=0;S.chests={};S.evts={};RL.open=false;HQ.q=[];if(HQ.cur)hintClose();
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
 RL.open=false;S.phase='build';S.gold=99999;S.deck=['alien'];
 const sol=[];for(let y=0;y<N;y++)for(let x=0;x<N;x++)if(S.cells[y][x]===1&&!S.occ[x+','+y]){const q=sqOf(x,y);if(q.x===x&&q.y===y)sol.push([x,y]);}
 const mk=k=>{S.tsel='alien';build(sol[k][0],sol[k][1]);return S.list[S.list.length-1];};
 const a=mk(0),bb=mk(1);out.n1=a.sd.length;upgrade(a);out.n2=a.sd.length;upgrade(a);out.n3=a.sd.length;upgrade(bb);upgrade(bb);
 chooseSpec(a,'hive');out.hive=a.sd.length;bb.sd[0].hp=1;chooseSpec(bb,'pred');out.pred=bb.sd.length;out.predWt=bb.sd.every(s=>s.wt===2&&s.pred);out.predHp=Math.round(bb.sd[0].max);
 for(const t of [a,bb])for(const id of SPECS.alien[t.spec].ab)for(let k=0;k<3;k++)buyAb(t,id);
 out.abs=[a,bb].every(t=>SPECS.alien[t.spec].ab.every(id=>(t.ab[id]||0)>=AB[id].ranks.length));
 // simbiosis
 const s=a.sd[0];s.hp=5;alienHit(a,s,{x:0,y:0,hp:50,max:50,t:'goblin'},10);out.sym=s.hp;
 // puesta: en construcción también
 for(let k=0;k<700;k++)alienTick(.05);out.brood=a.sd.filter(q=>q.xtr).length;
 // larvas al morir
 const n0=a.sd.length;const v=a.sd.find(q=>!q.xtr);v.hp=0;unitDeath(a,v);out.larvas=a.sd.filter(q=>q.lar).length;out.n0=n0;
 for(let k=0;k<240;k++)alienTick(.05);out.larvasGone=a.sd.filter(q=>q.lar).length;
 // devorar
 S.tsel=null;startWave();for(let k=0;k<3;k++)update(.05);const e=S.enemies.find(x=>!ET[x.t].el&&!isBoss(x));
 if(e){e.hp=e.max*.1;alienHit(bb,bb.sd[0],e,1);out.devour=e.hp<=0;}
 // corrosión: cambia el multiplicador mágico
 let e2=S.enemies.find(x=>x.hp>0);if(!e2){spawnEnemy(Object.keys(ET).find(k=>!ET[k].el&&!ET[k].story&&!ET[k].fly&&!isBoss({t:k})),S.portals[0]);e2=S.enemies[S.enemies.length-1];}if(e2){const m0=e2DmgM(e2,a,'magic');e2.mrsw=24;out.corr=e2DmgM(e2,a,'magic')/m0;e2.mrsw=0;}
 for(let k=0;k<200;k++){update(.05);draw();}
 out.kills=S.st.kills;out.ach=ACH.suyos&&TLOCK.alien==='suyos';
 out.card=document.querySelector('#hpop')?1:1;
 return out;});
ck(r.lockedBefore,'las criaturas están disponibles sin el logro');ck(r.n1===4&&r.n2===5&&r.n3===6,'el enjambre no es 4/5/6 ('+[r.n1,r.n2,r.n3]+')');
ck(r.hive===8,'la Colmena no tiene 8 ('+r.hive+')');ck(r.pred===3&&r.predWt,'los Depredadores no son 3 con corpulencia 2');ck(r.abs,'no se compran todas las habilidades');
ck(r.sym>6.4&&r.sym<6.6,'la Simbiosis no cura un 15 % ('+r.sym+')');ck(r.brood===4,'la Puesta no llega a 4 extra ('+r.brood+')');
ck(r.larvas===3,'no salen 3 larvas ('+r.larvas+')');ck(r.larvasGone===0,'las larvas no desaparecen');ck(r.devour!==false,'Devorar no mata');ck(r.corr>1.05,'la Corrosión no sube el daño mágico ('+r.corr+')');
ck(r.kills>0,'no matan nada');ck(r.ach,'falta el logro Los suyos');
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'alienigenas ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
