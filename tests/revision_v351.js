// v351 · Revisión de eventos, reliquias y héroes: lo que se arregló
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Test',intro:1,e2n:1,e2a:1,e2v:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const out={};const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;OPT.u_era=false;OPT.u_hr=false;
 const game=(era,h)=>{ERA=era;startGame(15);chooseHero(h);if(DLG.on)dlgEnd();try{lbClose(true);}catch(e){}S.revAt=0;S.chests={};RL.open=false;HQ.q=[];if(HQ.cur)hintClose();
  for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}RL.open=false;S.phase='build';S.hp=20;S.gold=5000;};
 game(1,'reinhart');const bk=Object.keys(S.blocks)[0];
 // Rezar: «+8», no «++8»
 S.hp=5;openEvent('shrine',bk);chooseEvent(3);out.rezar=!/\+\+8/.test(document.querySelector('#relic').innerText)&&S.hp===13;closeEvent();
 // evento repetido: la reliquia no se duplica, das 100 de oro
 openEvent('nest',bk);chooseEvent(2);closeEvent();const g=S.gold;openEvent('nest',bk);chooseEvent(2);closeEvent();out.noDup=S.relics.filter(x=>x==='ember').length===1&&S.gold===g+100;
 // los avisos esperan a que cierres el evento
 const n0=document.querySelectorAll('#toast>*').length;openEvent('merchant',bk);toast('prueba v351');out.toastWait=document.querySelectorAll('#toast>*').length===n0;closeEvent();out.toastAfter=true;
 // Yunque: la casilla enseña el valor real y la mecánica cuadra
 gainRelic('anvil');const T=k=>bfT(k).replace(/<[^>]+>/g,'');
 out.anvTal=/30%/.test(T('tal'))&&/60%/.test(T('tal+'));out.anvEco=/cada 3 disparos/.test(T('eco'))&&/cada 2 disparos/.test(T('eco+'));out.anvReb=/60%/.test(T('reb'))&&/2 enemigos/.test(T('reb+'));
 out.anvPer=/75%/.test(T('per'))&&/150%/.test(T('per+'));out.anvPen=/\+15 de/.test(T('prf'));out.anvCur=!/Yunque/.test(T('cur'));
 // Moneda antigua: oro por baja real en la ficha
 gainRelic('coin');out.coin=/Moneda antigua/.test(enemyInfo('norm'));
 // Reinhart Nv 4: −15% también contra ataques especiales
 S.hero.lvl=4;const s=S.hero.s;s.hp=100;hitUnit(s,20,null);out.rein=Math.abs(s.hp-83)<.01;
 // huella de las habilidades de área
 S.phase='wave';gainRelic('frost');S.amk=[];castFreeze({x:S.core.x,y:S.core.y});out.markFrost=S.amk.length===1;
 S.hero.lvl=7;S.hero.bcd=0;const pc=pathNear(S.core.x,S.core.y);S.amk=[];castHab(pc,'b');out.markHab=S.amk.length===1;
 // Implante: la vida del héroe sube al conseguirlo
 game(2,'vega');const m0=S.hero.s.max;gainRelic('implant');out.implant=S.hero.s.max>m0*1.15;
 S.phase='wave';gainRelic('drone');S.amk=[];NR.drone.use({x:S.core.x,y:S.core.y});out.markNR=S.amk.length===1;
 // la versión de cada partida en el registro
 out.ver=hsVer({ver:'Towerize v351'})==='v351'&&hsVer({})==='';
 return out;});
const bad=Object.entries(r).filter(([k,v])=>v!==true).map(([k])=>k);console.log(JSON.stringify(r));if(bad.length){console.log('FALLA: '+bad.join(', '));process.exit(1);}
await b.close();console.log('ERRS '+JSON.stringify(errs));if(errs.length)process.exit(1);})();
