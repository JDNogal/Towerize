// Habilidades de los enemigos normales (v291): embeleso de la Súcubo, interferencia del Pirata, golpes de campeón, disparos en arco y Girocóptero
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const out={};INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;let sol=[];
 for(let tr=0;tr<8&&sol.length<3;tr++){startGame(15);chooseHero('reinhart');if(DLG.on)dlgEnd();S.chests={};S.evts={};RL.open=false;HQ.q=[];
  for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
  RL.open=false;S.phase='build';S.gold=99999;S.deck=['arrow','bastion'];
  sol=[];for(let y=0;y<N;y++)for(let x=0;x<N;x++)if(S.cells[y][x]===1&&!S.occ[x+','+y]){const q=sqOf(x,y);if(q.x===x&&q.y===y)sol.push([x,y]);}}
 S.tsel='bastion';build(sol[0][0],sol[0][1]);const bt=S.list[S.list.length-1];S.tsel='arrow';build(sol[1][0],sol[1][1]);const ar=S.list[S.list.length-1];
 for(const p of S.portals){p.sq=[];p.sqm=[];p.plan={norm:0,fast:0,tank:0,custodian:0,mini:0,elite:0,boss:0,colossus:0};}startWave();S.enemies=[];const mk=(t,x,y)=>{const e={t,x,y,tx:Math.round(x),ty:Math.round(y),hp:500,max:500,fx:{}};S.enemies.push(e);return e;};
 const sd=bt.sd;for(const s of sd){s.x=bt.x;s.y=bt.y;s.hp=s.max;}
 // Súcubo
 const su=mk('warlock',bt.x+1,bt.y);for(let i=0;i<70;i++)eSkillsTick(.05);out.charm=sd.some(s=>s.charm);
 const c=sd.find(s=>s.charm);out.free=!!c;let seen=false;withoutCharmed(()=>{seen=bt.sd.includes(c);});out.hidden=!seen;
 out.thrall=S.enemies.some(e=>e.t==='thrall'&&e.ths===c);for(let i=0;i<230;i++)eSkillsTick(.05);out.release=c&&!c.charm&&!S.enemies.some(e=>e.t==='thrall'&&e.ths===c);
 for(const s of sd){s.hp=s.max;s.charm=null;s.x=bt.x;s.y=bt.y;}su.chc=0;eSkillsTick(.05);const c2=sd.find(s=>s.charm);if(c2){const pr=c2.charm.e;pr.hp=0;S.enemies=S.enemies.filter(e=>e!==pr);eSkillsTick(.05);out.thKill=c2.hp<=0&&!c2.charm;c2.hp=c2.max;c2.rt=0;}else out.thKill=false;S.enemies=[];
 // Pirata
 const hk=mk('hack',ar.x+1,ar.y);for(let i=0;i<64;i++)eSkillsTick(.05);out.jam=ar.jam>0&&hk.jc>0;out.jamRate=stats(ar).rate<.01;S.enemies=[];for(let i=0;i<10;i++)eSkillsTick(.05);out.jamStays=ar.jam>0;for(let i=0;i<120;i++)eSkillsTick(.05);out.unjam=!(ar.jam>0);
 // golpe de campeón
 for(const s of sd){s.x=bt.x;s.y=bt.y;s.hp=s.max;s.charm=null;}const h0=sd.reduce((a,s)=>a+s.hp,0);const ch=mk('champ',bt.x+.5,bt.y);for(let i=0;i<180;i++)eSkillsTick(.05);out.whirl=sd.reduce((a,s)=>a+s.hp,0)<h0&&ch.skc>15;S.enemies=[];
 // disparo en arco
 for(const s of sd){s.x=bt.x;s.y=bt.y;s.hp=s.max;}splashUnits(sd[0],5,null);out.splash=sd.slice(1).every(s=>s.hp<s.max);
 {const s0=sd[0];s0.hp=s0.max;s0.ps=[];uAddPois(s0,5,null);for(let i=0;i<20;i++)uStatusTick(.05);out.upois=s0.hp<s0.max&&s0.ps.length===1&&ET.spit.upois>0;}
 out.gyro=!!(ET.gyro&&ET.gyro.fly&&ET.gyro.rg==='ranged'&&ET.gyro.splashU&&EIC.gyro);out.gundr=ET.gundr.rg==='ranged';out.sk=ET.champ.sk==='whirl'&&ET.praet.sk==='claw';
 out.kw=['charm','jam','arcsh','airatk','whirl','jet','quake','claw'].every(k=>kwHtml0(k,'').includes('<b>'));
 return out;});
const f=[];const ck=(c,m)=>{if(!c)f.push(m);};
ck(r.charm,'la Súcubo no embelesa');ck(r.hidden,'el embelesado sigue contando como soldado');ck(r.release,'el embeleso no acaba');ck(r.thrall,'el embelesado no pasa a ser enemigo');ck(r.thKill,'matar al embelesado no tumba al soldado');ck(r.jam,'el Pirata no interfiere');ck(r.jamRate,'la torre interferida sigue disparando');ck(r.jamStays,'el pulso del Pirata no dura aunque muera');ck(r.unjam,'la interferencia no se va');
ck(r.whirl,'el Caudillo no usa el Hachazo');ck(r.upois,'el veneno no funciona en tus unidades');ck(r.splash,'el disparo en arco no salpica');ck(r.gyro&&r.gundr,'voladores con ataque mal');ck(r.sk,'habilidades de campeón sin asignar');ck(r.kw,'faltan palabras clave');
console.log(f.length?'FALLOS '+JSON.stringify(f)+' '+JSON.stringify(r):'habilidades_enemigos ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
