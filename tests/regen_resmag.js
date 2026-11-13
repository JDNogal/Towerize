// Regeneración de los enemigos fuertes y resistencia mágica rota (Maleficio, Ácido nanométrico, Colmena, Radagast, Korr, Grimorio quebrado y Emisor de interferencias)
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;
 startGame(15);chooseHero('radagast');if(DLG.on)dlgEnd();HQ.q=[];RL.open=false;$('relic').classList.remove('open');const o={};
 S.phase='wave';S.wt=S.wt||10;const mk=t=>{const hp=ehpOf(t,S.round),e={t,x:S.core.x,y:S.core.y,tx:S.core.x,ty:S.core.y,hp,max:hp,fx:{},src:null,pv:[S.core.x,S.core.y]};S.enemies.push(e);return e;};
 const el=mk('elite'),no=mk('norm'),ar=mk('argos');
 // fuera de combate: 0,5 %/s
 el.hp=el.max*.5;el.rgH=el.hp;el.rgL=null;rgTick(1);o.out=(el.hp-el.max*.5)/el.max;
 // en combate: la mitad
 el.hp=el.max*.5;el.rgH=el.max*.6;rgTick(1);o.inC=(el.hp-el.max*.5)/el.max;
 no.hp=no.max*.5;no.rgH=no.hp;rgTick(1);o.norm=no.hp/no.max;if(ar){ar.hp=ar.max*.5;ar.rgH=ar.hp;rgTick(1);o.argos=ar.hp/ar.max;}
 // tope por fuente: el pulso de −20 no se lo come un golpe de −5 (tope −10)
 mbrkAdd(el,20,20);mbrkAdd(el,5,10);o.cap=mbrkOf(el);
 // Sin señal: con el Emisor, los que tienen la resistencia mágica rota no regeneran
 S.relics.push('emisor');S.rs.emisor={cd:0,t:0};el.hp=el.max*.5;el.rgH=el.hp;el.rgL=null;rgTick(1);o.sin=el.hp/el.max;
 // Radagast: sus golpes rompen la resistencia mágica
 no.mbrk=[];hurt(no,1,S.hero.pt,'magic');o.rad=mbrkOf(no);
 // Transmutación (Grimorio activo): el daño físico usa la resistencia mágica
 S.relics.push('grim');S.rs.grim={cd:0,t:5};const m1=e2DmgM(el,null,'phys');S.rs.grim.t=0;const m0=e2DmgM(el,null,'phys');o.trans=m1/m0;
 // textos y compendio
 o.hex=AB.hex.ranks.map(x=>x.max).join('/');o.breach=AB.breach.ranks.map(x=>x.a+'/'+x.max).join(' ');o.rel=!!(RELIC.grim&&RELIC.emisor&&RELIC.grim.era===1&&RELIC.emisor.era===2);
 o.comp=/Regeneración/.test(enemyInfo('elite'))&&!/Regeneración/.test(enemyInfo('norm'));o.use=MECUSE.mrbrk.length>=5&&MECUSE.rgn.includes('en:boss');
 o.icons=/[-]/.test(RELIC.grim.ic)&&/[-]/.test(RELIC.emisor.ic);
 return o;});
console.log(JSON.stringify(r));
ck(Math.abs(r.out-.005)<1e-4,'élite fuera de combate: 0,5 % por segundo ('+r.out+')');ck(Math.abs(r.inC-.0025)<1e-4,'en combate, la mitad ('+r.inC+')');
ck(r.norm===.5,'un enemigo normal no regenera');ck(r.argos==null||r.argos===.5,'ARGOS no regenera');
ck(r.cap===20,'el pulso de −20 no se pierde con un golpe de tope −10 ('+r.cap+')');ck(r.sin===.5,'Sin señal: no regenera con la resistencia mágica rota');
ck(r.rad===5,'Radagast quita −5 de resistencia mágica');ck(r.trans!==1,'Transmutación cambia el daño físico');
ck(r.hex==='10/15','Maleficio: hasta −10 / −15');ck(r.breach==='5/10 10/15','Rompemurallas: −5 hasta −10 y −10 hasta −15');ck(r.rel&&r.icons,'reliquias nuevas con su era y su icono');
ck(r.comp&&r.use,'compendio: regeneración en la ficha y estados en uso');
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'regen_resmag ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
