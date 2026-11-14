// Puntuación: se calcula durante la partida, sale en la pausa, en Estadísticas › Puntuación, al final y se guarda en Partidas
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;
 startGame(15);chooseHero('reinhart');if(DLG.on)dlgEnd();HQ.q=[];RL.open=false;$('relic').classList.remove('open');const o={};
 S.round=6;o.mid=scoreCalc().t;STW.tab='sc';lbOpen('st');o.tab=!!document.querySelector('.sctab');lbOpen(null,true);o.pause=!!document.querySelector('.lbscore,.lbscr');lbClose(true);
 S.round=15;S.hp=S.hp||20;S.phase='won';endGame();o.fin=/scend/.test(String(LB.end.left));o.rib=!!document.querySelector('[data-a="endv"][data-v="sc"]');o.won=S.scF&&S.scF.t>o.mid;
 const rows=(S.scF&&S.scF.rows||[]).map(x=>x[0]);o.rows=['rnd','win','nol','hp'].every(k=>rows.includes(k));
 return o;});
console.log(JSON.stringify(r));
ck(r.mid>=1500&&r.mid<3000,'a mitad de partida (5 rondas superadas) deben ser 1.500 de rondas más algún extra: '+r.mid);ck(r.tab,'Estadísticas › Puntuación con el desglose');ck(r.pause,'la pausa muestra la puntuación');
ck(r.fin&&r.rib&&r.won&&r.rows,'el final muestra la puntuación, su cinta y el desglose con victoria, vida y rondas');
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'puntuacion ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
