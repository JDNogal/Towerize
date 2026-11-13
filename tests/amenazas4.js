// Amenazas: Piezas corruptas (casilla maldita: piezas que la traen, construir primero en ella, no se vende, mejoras más caras)
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;startGame(15);chooseHero('reinhart');for(let i=0;i<5&&DLG.on;i++)dlgEnd();HQ.q=[];if(HQ.cur)hintClose();});
await p.waitForTimeout(600);
const r=await p.evaluate(()=>{try{lbClose(true);}catch(e){}S.amz={cor:1};S.pkN=3;S.gold=9999;deal();const o={};o.cor=S.offers.filter(x=>x.b.some(b=>b.k==='cur')).length;
 o.cost=S.offers.map(x=>pcost(x));
 let placed=false;for(let pi=0;pi<S.offers.length&&!placed;pi++){if(!S.offers[pi].b.some(b=>b.k==='cur'))continue;S.pi=pi;const of=S.offers[pi];for(let r=0;r<4&&!placed;r++){for(let by=0;by<BN&&!placed;by++)for(let bx=0;bx<BN&&!placed;bx++)if(check(bx,by,of.p)===0){placePiece(bx,by);placed=true;}if(!placed)rotO(of);}}
 o.placed=placed;RL.open=false;$('relic').classList.remove('open');document.body.classList.remove('pcpick');S.phase='build';ui();
 o.pend=azCurPending().length;
 const k=S.deck[0];S.tsel=k;const sol=[];for(let y=0;y<N;y++)for(let x=0;x<N;x++)if(S.cells[y][x]===1&&!S.occ[x+','+y]){const q=sqOf(x,y);if(q.x===x&&q.y===y)sol.push([x,y]);}
 const cur=azCurPending()[0],other=sol.find(([x,y])=>!(x===cur.x&&y===cur.y)&&S.buff[y][x]!=='cur');
 const n0=S.list.length;build(other[0],other[1]);o.blocked=S.list.length===n0;
 build(cur.x,cur.y);const t=S.list[S.list.length-1];o.builtCur=S.list.length===n0+1&&azIsCur(t);
 const n1=S.list.length;build(other[0],other[1]);o.afterOk=S.list.length===n1+1;
 sell(t);o.noSell=S.list.includes(t);
 const base=upCost(TW[t.type],2),tc=tCost(t,base),t2=S.list[S.list.length-1];o.up=[base,tc,tCost(t2,base)];
 o.ready=!AZT.find(x=>x[0]==='cor')[5];
 try{camCenter(t.x,t.y);}catch(e){}return o;});
await p.waitForTimeout(500);await p.screenshot({path:'tests/out/amz_maldita.png'});
console.log(JSON.stringify(r));
ck(r.cor>=1,'Las piezas vienen con casilla maldita en su turno');
ck(r.cost.every(c=>c%25===0),'La casilla maldita no cobra como casilla especial');
ck(r.placed&&r.pend===1,'Al colocarla queda una casilla maldita pendiente');
ck(r.blocked,'No se puede construir en otro sitio antes que en la maldita');
ck(r.builtCur&&r.afterOk,'Se construye en la maldita y después ya se puede en cualquier sitio');
ck(r.noSell,'La torre de la casilla maldita no se puede vender');
ck(r.up[1]===Math.round(r.up[2]*1.25),'Sus mejoras cuestan un 25 % más ('+r.up.join(' / ')+')');
ck(r.ready,'Piezas corruptas ya se puede activar');
await b.close();if(errs.length)console.log('ERRS',errs);if(fails.length||errs.length){console.log(fails.join('\n'));process.exit(1);}})();
