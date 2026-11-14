// Amenazas: se desbloquean al completar la era, botón junto a las piezas, pantalla, resumen, Supercampeones, Venganza, puntuación, desbloqueos y Borrar progreso
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{if(!sessionStorage.getItem('x')){localStorage.clear();sessionStorage.setItem('x',1);}localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r1=await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;const o={};
 STO.p=2;LB.area='prep';LB.step='era';lbOpen('prep');LB.step='era';lbRender();return o;});
await p.waitForTimeout(800);r1.before=await p.evaluate(()=>!!document.querySelector('#comp .amzseal'));
await p.evaluate(()=>{STO.p=3;lbRender();});await p.waitForTimeout(800);r1.seal=await p.evaluate(()=>!!document.querySelector('#comp .amzseal'));
await p.evaluate(()=>document.querySelector('#comp .amzseal').click());await p.waitForTimeout(700);r1.page=await p.evaluate(()=>LB.step==='amz'&&!!document.querySelector('#comp .amzl'));
await p.evaluate(()=>document.querySelector('#comp [data-a="azinc"]').click());await p.waitForTimeout(500);r1.inc=await p.evaluate(()=>AZ.sel[1].sup===1);
await p.evaluate(()=>document.querySelector('#comp [data-a="azsel"][data-id="cor"]').click());await p.waitForTimeout(500);r1.lk=await p.evaluate(()=>!document.querySelector('#comp [data-a="azinc"]')&&/Para desbloquear/.test(document.querySelector('#comp').textContent));
await p.evaluate(()=>document.querySelector('#comp [data-a="azsel"][data-id="ref"]').click());await p.evaluate(()=>document.querySelector('#comp [data-a="azinc"]').click());await p.waitForTimeout(500);
await p.evaluate(()=>document.querySelector('#comp [data-a="azback"]').click());await p.waitForTimeout(700);r1.back=await p.evaluate(()=>LB.step==='era'&&/3 puntos/.test(document.querySelector('#comp .amzseal').textContent));
const r2=await p.evaluate(()=>{startGame(15);RL.hsel='reinhart';LB.step='hero';lbRender();return {};});await p.waitForTimeout(800);
await p.evaluate(()=>document.querySelector('#comp [data-a="pickhero"]').click());await p.waitForTimeout(700);r2.res=await p.evaluate(()=>LB.step==='res'&&/Supercampeones/.test(document.querySelector('#comp').textContent));
await p.evaluate(()=>document.querySelector('#comp [data-a="azgo"]').click());await p.waitForTimeout(600);
const r3=await p.evaluate(()=>{const o={amz:JSON.stringify(S.amz)};for(let i=0;i<5&&DLG.on;i++)dlgEnd();
 S.round=12;S.phase='wave';const rnd=Math.random;Math.random=()=>0.01;const n=S.enemies.length;spawnEnemy('champ',(S.portals&&S.portals[0])||{x:S.core.x,y:S.core.y,dir:[0,1]});Math.random=rnd;const e=S.enemies[S.enemies.length-1];o.sup=!!(e&&e.sup&&e.sup.length===1);
 if(e){e.supSh=2;const h=e.hp;hurt(e,5,null,'phys');o.shield=e.hp===h;}
 const mk=t=>{const hp=ehpOf(t,S.round),q={t,x:S.core.x,y:S.core.y,tx:S.core.x,ty:S.core.y,hp,max:hp,fx:{},src:null,pv:[S.core.x,S.core.y]};S.enemies.push(q);return q;};
 S.amz.ven=1;const el=mk('mini'),nb=mk('norm');el.hp=0;achDeath(el);o.rage=nb.rage>0;/* v329: R1 = mini-élites y jefes */delete S.amz.ven;
 const sc=scoreCalc();o.score=sc.rows.some(x=>x[0]==='amz');o.chip=!!document.getElementById('amzchip');
 S.phase='won';S.round=ROUNDS;endGame();o.unlock=!!AZ.un.ven&&!AZ.un.nie&&AZ.rk&&AZ.rk.sup===2&&AZ.rk.ref===2;return o;});
await p.waitForTimeout(800);r3.chipShown=await p.evaluate(()=>{const c=document.getElementById('amzchip');return !!c;});
console.log(JSON.stringify({r1,r2,r3}));
ck(!r1.before&&r1.seal,'el botón de Amenazas solo sale con la era completada');ck(r1.page&&r1.inc,'la pantalla abre y suma rangos');ck(r1.lk,'las bloqueadas no se pueden activar y dicen cómo se desbloquean');ck(r1.back,'Continuar vuelve a la era con los puntos');
ck(r2.res,'elegir héroe pasa por el resumen con las amenazas');ck(r3.amz==='{"sup":1,"ref":1}','la partida empieza con las amenazas elegidas: '+r3.amz);
ck(r3.sup,'Supercampeones: el campeón asciende');ck(r3.shield,'el escudo frontal para golpes');ck(r3.rage,'Venganza enfurece a los de alrededor');ck(r3.score&&r3.chip,'puntuación con amenazas y contador en partida');ck(r3.unlock,'ganar con 3 puntos desbloquea Venganza y el rango 2 de las que llevabas');
// Borrar progreso
await p.evaluate(()=>{OP.rst=1;const b=document.createElement('button');b.dataset.a='preset';b.id='xpreset';document.body.appendChild(b);});
await p.evaluate(()=>{try{document.getElementById('xpreset').click();}catch(e){}});await p.waitForTimeout(1200);
const w=await p.evaluate(()=>localStorage.getItem('rt-amz'));ck(!w,'Borrar progreso borra las amenazas');
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'amenazas ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
