// Apoyos: desbloqueo al ganar con amenazas, doble página Apoyos | Amenazas, puntuación con extremos/fuertes/suelo y efectos en partida
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{if(!sessionStorage.getItem('x')){localStorage.clear();sessionStorage.setItem('x',1);}localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r={};
r.m=await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;STO.p=3;
 return {before:apOk(),m1:azScoreM({nie:4},{pp:1}),m2:azScoreM({},{pp:1,ag:1,ba:1,bi:1,cb:1}),m3:azScoreM({sup:2},{}),net:azNetOf({sup:1},{pp:1,bi:1})};});
// desbloqueo: ganar con una amenaza
r.un=await p.evaluate(()=>{startGame(15);chooseHero('reinhart');for(let i=0;i<5&&DLG.on;i++)dlgEnd();HQ.q=[];if(HQ.cur)hintClose();try{lbClose(true);}catch(e){}
 S.amz={sup:1};S.round=15;S.phase='won';endGame();return {ok:apOk(),n:APT.filter(apUn).length};});
// pantalla
await p.evaluate(()=>{try{lbClose(true);}catch(e){}AZ.apw=7;LB.area='prep';LB.step='era';lbOpen('prep');LB.step='amz';lbRender();});await p.waitForTimeout(800);
r.scr=await p.evaluate(()=>({apl:document.querySelectorAll('#comp .apl').length,det:document.querySelectorAll('#comp .apdet').length}));
await p.evaluate(()=>{const e=document.querySelector('#comp [data-a="apsel"][data-id="bi"]');e.click();});await p.waitForTimeout(200);
await p.evaluate(()=>{document.querySelector('#comp [data-a="apsel"][data-id="bi"]').click();});await p.waitForTimeout(300);
r.tog=await p.evaluate(()=>!!apSelOf().bi);
await p.evaluate(()=>{AZ.sel[1]={nie:2};AZUI.sel='nie';APUI.sel='bi';lbRender();});await p.waitForTimeout(500);
await p.screenshot({path:'tests/out/apoyos_pantalla.png'});
await p.setViewportSize({width:2560,height:1440});await p.waitForTimeout(700);await p.screenshot({path:'tests/out/apoyos_pantalla_2560.png'});await p.setViewportSize({width:1280,height:720});
// efectos en partida
r.fx=await p.evaluate(()=>{try{lbClose(true);}catch(e){}const sel=apSelOf();for(const k of ['bi','mf','cb','rv','pp','ag','rr','hi','apr','tir','ba'])sel[k]=1;AZ.sel[1]={};
 startGame(15);const g0=S.gold,h0=S.hp;chooseHero('reinhart');for(let i=0;i<5&&DLG.on;i++)dlgEnd();HQ.q=[];if(HQ.cur)hintClose();try{lbClose(true);}catch(e){}
 const o={gold:S.gold-g0,hp:S.hp-h0,ap:Object.keys(S.ap||{}).length,ch:Object.keys(S.chests).length,ev:Object.keys(S.evts||{}).length};
 o.pc=pcost({b:[{k:'pow'}]});
 RL.open=false;$('relic').classList.remove('open');document.body.classList.remove('pcpick');
 for(let pi=0;pi<3;pi++){S.pi=pi;const of=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,of.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(of);}if(ok)break;}
 RL.open=false;$('relic').classList.remove('open');document.body.classList.remove('pcpick');S.phase='build';ui();
 const k=S.deck[0];S.tsel=k;const sol=[];for(let y=0;y<N;y++)for(let x=0;x<N;x++)if(S.cells[y][x]===1&&!S.occ[x+','+y]){const q=sqOf(x,y);if(q.x===x&&q.y===y)sol.push([x,y]);}
 S.gold=1000;build(sol[0][0],sol[0][1]);o.free=S.gold===1000;build(sol[1][0],sol[1][1]);o.paid=S.gold<1000;
 const t2=S.list[S.list.length-1];t2.bph='x';o.sv=sellVal(t2)===t2.inv;
 const t3=Object.assign({},t2,{lvl:3});o.apr=tCost(t3,100)===80&&tCost(t2,100)===100;
 o.dice=/Tirada de la ronda/.test(diceRr('tw'));
 const lv0=S.list.filter(t=>t.lvl===1).length;startWave();o.ag=S.list.some(t=>t.lvl===2);
 o.score=(()=>{S.amz={nie:4};const sc=scoreCalc();return sc.rows.some(x=>x[0]==='amz');})();
 return o;});
console.log(JSON.stringify(r));
ck(!r.m.before,'Sin ganar con amenazas no hay Apoyos');
ck(Math.abs(r.m.m1-1.5)<1e-9,'Niebla R4 (extremo) + Primera piedra (fuerte) = ×1,5 ('+r.m.m1+')');
ck(r.m.m2===.5,'Suelo de ×0,5 ('+r.m.m2+')');ck(Math.abs(r.m.m3-1.4)<1e-9,'+10 % por punto de amenaza (Supercampeones R2 = 4 puntos)');ck(r.m.net===0,'El nivel neto nunca baja de 0');
ck(r.un.ok&&r.un.n===4,'Al ganar con una amenaza se abren los 4 primeros apoyos ('+r.un.n+')');
ck(r.scr.apl===2&&r.scr.det===2,'Doble página: Apoyos y Amenazas, cada una con su detalle');
ck(r.tog,'Pulsar dos veces un apoyo lo activa');
ck(r.fx.gold===150&&r.fx.hp===5,'Bolsa inicial (+150) y Murallas firmes (+5)');
ck(r.fx.pc===13,'Casillas baratas: a mitad de precio ('+r.fx.pc+')');
ck(r.fx.free&&r.fx.paid,'Primera piedra: la primera torre de la ronda es gratis y la segunda no');
ck(r.fx.sv,'Reventa justa: al vender recuperas lo invertido');
ck(r.fx.apr,'Aprendices: −20 % en Nv 4');
ck(r.fx.dice,'Tirada de la ronda: aparece el botón');
ck(r.fx.ag,'Ascenso gratuito: una torre sube a Nv 2 al empezar la oleada');
await b.close();if(errs.length)console.log('ERRS',errs);if(fails.length||errs.length){console.log(fails.join('\n'));process.exit(1);}})();
