// Registro de partidas: se apunta al empezar (abandonada), se cierra al ganar o perder y se ve en el libro
const OUT=require('path').join(__dirname,'out');require('fs').mkdirSync(OUT,{recursive:true});
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:800}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};
const game=async(win)=>{await p.evaluate(async win=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;localStorage.setItem('rt-tutchoice','skip');startGame(15);chooseHero('sylvana');S.chests={};S.evts={};
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
 RL.open=false;HQ.q=[];if(HQ.cur)hintClose();S.gold=999;const fr=[];for(let y=0;y<N;y++)for(let x=0;x<N;x++){const q=sqOf(x,y);if(bmFree(q))fr.push(q);}bmBuildNow('arrow',fr[0]);
 histLeak('norm',2);S.st.dmg=500;S.list[0].dmgT=400;S.hero.pt.dmgT=100;S.phase=win?'won':'lost';if(win)S.era=2;endGame();if(DLG.on)dlgEnd();},win);await p.waitForTimeout(400);};
await game(true);await game(false);
// partida empezada y dejada a medias
await p.evaluate(()=>{startGame(15);chooseHero('reinhart');});await p.waitForTimeout(400);
const n=await p.evaluate(()=>hsAll().then(L=>L.map(r=>r.res+':'+r.hero+':'+r.tw.length+':'+(r.worst?r.worst.t:'')).join(',')));
ck(/w:sylvana/.test(n)&&/l:sylvana/.test(n)&&/a:reinhart/.test(n),'faltan partidas en el registro: '+n);ck(/w:sylvana:2:norm/.test(n),'no guarda torres o el enemigo que más daño hizo: '+n);
await p.evaluate(()=>{NEWU=[];STO.intro=1;showMenu();try{document.querySelectorAll('#toast,.story,#story').forEach(e=>e.remove());}catch(e){}if(LB.open)lbClose(false,true);HIST.list=null;lbOpen('pt');});await p.waitForTimeout(800);
ck(await p.evaluate(()=>document.querySelectorAll('#comp .hsrun').length>=3),'el libro no muestra las partidas');
await p.evaluate(()=>{const b=document.querySelector('#comp .hsrun');if(b)b.click();});await p.waitForTimeout(300);
ck(await p.evaluate(()=>!!document.querySelector('#comp .hsmap')&&/Victoria|Derrota|Abandonada|En curso/.test(document.querySelector('#comp .hshd').textContent)),'no se ve la ficha de la partida');
ck(await p.evaluate(()=>document.querySelectorAll('#comp .hsrun .hsera').length>=3&&!!document.querySelector('#comp .hsrun .hsera.e2')&&(()=>{const L=hsFiltered(),i=L.findIndex(r=>r.era===2);HIST.sel=i;lbRender();const f=document.querySelector('#comp .hsmap rect').getAttribute('fill');HIST.sel=0;lbRender();return f==='#171a2c';})()),'falta el icono de la era o el color del mapa por era');
await p.screenshot({path:OUT+'/registro.png'});
await p.evaluate(()=>{const b=document.querySelector('#comp [data-a="hsbig"]');if(b)b.click();});await p.waitForTimeout(300);ck(await p.evaluate(()=>!!$('hsbig')&&$('hsbig').classList.contains('on')),'no abre el mapa grande');
await p.screenshot({path:OUT+'/registro_mapa.png'});
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'registro ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
