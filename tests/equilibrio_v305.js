// v305 · Retoques tras el estudio de torres: el androide del señuelo vuelve, habilidades alienígenas a su coste, Forja para un solo objetivo y la ralentización no rompe el paso de la escuadra
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'T',intro:1,e2n:1,e2a:1,e2v:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const o={};INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;OPT.u_tw=true;OPT.u_era=true;ERA=2;startGame(15);chooseHero('vega');if(DLG.on)dlgEnd();try{if(LB.open)lbClose(true);}catch(e){}
 o.alien=['larva','brood','swcor','devour','ambush','frenzy'].every(a=>AB[a].ranks.every(x=>x.c>=150));
 const mk=(type,spec)=>({id:9,type,lvl:4,spec,ab:{},acd:{},x:10,y:10,cells:[]});o.forge=stats(mk('sala','forge')).dmg>stats(mk('sala','volc')).dmg*2;
 // señuelo: el androide que explota recibe tiempo de reensamblaje
 const t=mk('robots','kami');t.ab={decoy:2};t.flag={x:10,y:10};t.sd=[{i:0,x:10,y:10,hp:50,max:50,en:null,cd:0,rt:0,tw:t,lock:false,fight:false,beep:.01,beepR:6}];S.list.push(t);S.phase='wave';S.field=S.field||field();
 mechaTickE2(.05);o.decoy=t.sd[0].hp<=0&&t.sd[0].rt>0;
 // ralentizar no quita el paso de formación
 const e={t:'auto',x:S.core.x,y:S.core.y,tx:S.core.x,ty:S.core.y,hp:100,max:100,fx:{slow:{m:.5,t:1}},fsp:.5};move(e,.05);o.slow=e.fsp===.5;e.fx={stun:{t:1}};move(e,.05);o.stun=e.fsp===0;
 return o;});
console.log(JSON.stringify(r));const bad=Object.keys(r).filter(k=>!r[k]);if(bad.length||errs.length){console.log('FALLA: '+bad.join(', ')+' '+errs.join(';'));process.exit(1);}await b.close();})();
