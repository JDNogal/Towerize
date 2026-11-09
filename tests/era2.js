// Era 2 (Ruinas de Neón): se abre con 3 victorias, se elige con su marcapáginas, la partida la recuerda y dibuja su mapa sin errores
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
for(const p3 of [0,3]){const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(v=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:v,name:'Test',intro:1,e2n:1,e2a:1}));}catch(e){}},p3);
 await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
 const r=await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;OPT.u_era=false;
  LB.step='era';lbOpen('prep');const marks=document.querySelectorAll('.bkmarks .bkmk[data-a="erasel"]').length;
  eraPick(2);const picked=ERA,title=(document.querySelector('#comp h3')||{}).textContent||'';
  startGame(15);chooseHero('reinhart');if(DLG.on)dlgEnd();S.chests={};S.evts={};RL.open=false;HQ.q=[];if(HQ.cur)hintClose();
  for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
  RL.open=false;S.phase='build';draw();const e2tw=['cannon','laser','flame'].every(k=>tPool().includes(k)||S.deck.includes(k));
  const obs=Object.values(S.obs||{}).join('');startWave();for(let i=0;i<30;i++){update(.1);draw();}
  return {marks,picked,title,era:S.era,e2tw,obs,alert:E2.alert,tesla:eraOk('tesla')};});
 if(p3===3){ck(r.marks===2,'con ÉTER reparado faltan los dos marcapáginas de era ('+r.marks+')');ck(r.picked===2,'no se puede elegir la era 2');ck(/Neón/.test(r.title),'la página no es la de Ruinas de Neón');ck(r.era===2,'la partida no es de la era 2');ck(/[QNXVcYE]/.test(r.obs),'la decoración no es de la era 2');ck(r.alert>0,'el camino no entra en alerta con enemigos');ck(!r.tesla,'la Tesla sale en la era 2');ck(r.e2tw,'las torres de la era 2 no salen en las ofertas');}
 else{ck(r.marks<2,'sin reparar a ÉTER ya se ve la era 2');ck(r.picked===1,'se ha podido elegir la era 2 sin desbloquear');ck(r.era===1,'la partida no es de la era 1');ck(!/[QNXVcYE]/.test(r.obs),'decoración de la era 2 en la Fantástica');ck(!r.e2tw,'torres de la era 2 en la Fantástica');}
 await p.close();}
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'era2 ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
