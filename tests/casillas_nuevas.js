// Casillas especiales nuevas: Precisión, Perforación, Eco, Persistencia, Taller y Cuartel
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const out={};INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;let sol=[];for(let tr=0;tr<8&&sol.length<4;tr++){startGame(15);chooseHero('reinhart');if(DLG.on)dlgEnd();S.chests={};S.evts={};RL.open=false;HQ.q=[];
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
 RL.open=false;S.phase='build';S.gold=99999;S.deck=['arrow','bastion','poison'];
 sol=[];for(let y=0;y<N;y++)for(let x=0;x<N;x++)if(S.cells[y][x]===1&&!S.occ[x+','+y]){const q=sqOf(x,y);if(q.x===x&&q.y===y)sol.push([x,y]);}}
 const mk=(type,tile,i)=>{S.buff[sol[i][1]][sol[i][0]]=tile;S.tsel=type;build(sol[i][0],sol[i][1]);return S.list[S.list.length-1];};
 const a0=mk('arrow','',0),a1=mk('arrow','crt+',1),a2=mk('arrow','prf',2),b0=mk('bastion','cua+',3);
 out.crit=[stats(a0).crit,stats(a1).crit];out.pen=[stats(a0).pen,stats(a2).pen];out.uhp=[TW.bastion.unit.hp,b0.sd[0].max];
 S.buff[sol[0][1]][sol[0][0]]='tal';out.cost=[upCost(TW.arrow,2),tCost(a0,upCost(TW.arrow,2))];
 S.buff[sol[0][1]][sol[0][0]]='eco+';a0.ecoN=0;let rep=0;for(let i=0;i<9;i++)if(ecoShot(a0))rep++;out.eco=rep===3;startWave();for(let i=0;i<100;i++)update(.05);
 out.bk=BK.length;out.names=BK.map(k=>BF[k].n).join(',');
 return out;});
const f=[];const ck=(c,m)=>{if(!c)f.push(m);};ck(r.crit[1]>r.crit[0]+.25,'Precisión★ no sube el crítico');ck(r.pen[1]===10,'Perforación no da penetración');ck(r.uhp[1]>r.uhp[0]*1.5,'Cuartel★ no sube la vida de los soldados');ck(r.cost[1]<r.cost[0],'Taller no abarata las mejoras');ck(r.eco,'Eco no cuenta disparos');ck(r.bk===11,'no hay 11 casillas especiales');console.log(f.length?'FALLOS '+JSON.stringify(f):'casillas_nuevas ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
