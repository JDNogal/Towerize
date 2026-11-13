// Clasificación: botón al final, nombre del piloto, subida (servidor simulado), aviso al seguir sin subir y tabla
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
const posted=[];
await p.route('**/towerize-ranking.towerize.workers.dev/**',async r=>{const u=new URL(r.request().url());let body={ok:true};
 if(u.pathname==='/run'){posted.push(JSON.parse(r.request().postData()));body={ok:true,pos:2,n:5};}
 else if(u.pathname==='/tiers')body={ok:true,era:1,tiers:[0,3]};
 else if(u.pathname==='/top')body={ok:true,top:[{nick:'Bodom',hero:'reinhart',score:20000,round:15,won:true},{nick:'Piloto',hero:'reinhart',score:12000,round:15,won:false}]};
 await r.fulfill({status:200,contentType:'application/json',headers:{'Access-Control-Allow-Origin':'*'},body:JSON.stringify(body)});});
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;startGame(15);chooseHero('reinhart');for(let i=0;i<5&&DLG.on;i++)dlgEnd();HQ.q=[];if(HQ.cur)hintClose();});
await p.waitForTimeout(600);
await p.evaluate(()=>{try{lbClose(true);}catch(e){}RL.open=false;S.round=12;S.phase='lost';endGame();});await p.waitForTimeout(1200);
const r={};r.btn=await p.evaluate(()=>!!document.querySelector('#comp .lbupb'));r.rib=await p.evaluate(()=>!!document.querySelector('#comp [data-a="lbrank"]'));
r.noAmz=await p.evaluate(()=>!/Amenaza/.test(document.querySelector('#comp .lbupb').textContent));
await p.screenshot({path:'tests/out/clasif_fin.png'});
// seguir sin subir → aviso
await p.evaluate(()=>document.querySelector('#comp [data-a="reset"]').click());await p.waitForTimeout(400);
r.ask=await p.evaluate(()=>$('lbdlg').classList.contains('on')&&/Aún no has subido/.test($('lbdlg').textContent)&&!/amenaza/i.test($('lbdlg').textContent));
await p.screenshot({path:'tests/out/clasif_aviso.png'});
await p.evaluate(()=>document.querySelector('[data-lbd="once"]').click());await p.waitForTimeout(400);
r.name=await p.evaluate(()=>!!$('lbname'));await p.screenshot({path:'tests/out/clasif_nombre.png'});
// probamos el reinicio en otra partida: aquí cancelamos antes de nombrar para no reiniciar
await p.evaluate(()=>{$('lbname').value='Piloto';});
await p.evaluate(()=>{LBR.cont=null;});
await p.evaluate(()=>document.querySelector('[data-lbd="name"]').click());await p.waitForTimeout(1500);
r.posted=posted.length===1&&posted[0].nick==='Piloto'&&posted[0].hero==='reinhart'&&posted[0].score>0;
r.pilot=await p.evaluate(()=>localStorage.getItem('rt-pilot'));
await p.screenshot({path:'tests/out/clasif_tras.png'});
r.after=await p.evaluate(()=>({phase:S.phase,area:LB.area,open:LB.open}));
console.log(JSON.stringify(r),JSON.stringify(posted[0]||{}));
ck(r.btn&&r.rib,'Al acabar: botón «Subir a la clasificación» y cinta «Clasificación»');
ck(r.noAmz,'Sin las Amenazas abiertas, el botón no habla de amenaza');
ck(r.ask,'Seguir sin subir: sale el aviso (sin mencionar la amenaza)');
ck(r.name&&r.pilot==='Piloto','La primera vez pide el nombre del piloto y lo guarda');
ck(r.posted,'Se sube la partida con nombre, héroe y puntuación');
// tabla
await p.evaluate(()=>{S.round=10;S.phase='lost';endGame();});await p.waitForTimeout(800);
await p.evaluate(()=>document.querySelector('#comp [data-a="lbrank"]').click());await p.waitForTimeout(1200);
r.table=await p.evaluate(()=>{const t=document.querySelector('#comp table.lbrkt');return t?t.querySelectorAll('tr').length:0;});r.me=await p.evaluate(()=>!!document.querySelector('#comp tr.me'));r.tabs=await p.evaluate(()=>!!document.querySelector('#comp .lbrktabs'));
await p.screenshot({path:'tests/out/clasif_tabla.png'});
ck(r.table===3&&r.me,'La tabla se carga y resalta tu fila');
ck(!r.tabs,'Sin las Amenazas abiertas, no hay pestañas de nivel de amenaza');
console.log(JSON.stringify(r));
await b.close();if(errs.length)console.log('ERRS',errs);if(fails.length||errs.length){console.log(fails.join('\n'));process.exit(1);}})();
