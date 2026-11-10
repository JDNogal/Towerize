// v302 · Sonidos nuevos (se sintetizan sin errores) y música por era
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Test',intro:1,e2n:1,e2a:1,e2v:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);await p.mouse.click(400,300);await p.waitForTimeout(400);
const r=await p.evaluate(async()=>{const out={};const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;
 const NEW=['boom','zap','h_gun','h_nano','h_acid','sonic','charm','tele','alarm','hab','h2_korr','h2_ferro','h2_kai','h2_ult','holo','poly','shield'];
 out.keys=NEW.every(k=>SFXK[k]&&sfxDef(k)&&SY2[sfxDef(k).y]);out.group=SFXG.some(g=>g[0]==='Era Distópica')&&/Era Distópica/.test(sfxTestHTML());
 out.hitk=HITK.bunker==='h_gun'&&HITK.nano==='h_nano'&&HITK.acid==='h_acid'&&HITK.robots==='h_metal';
 sndInit();out.ctx=!!SND.ctx;let thrown=0;for(const k of NEW){try{sfx(k,{force:1});}catch(e){thrown++;}}out.play=thrown===0;await new Promise(r=>setTimeout(r,300));
 // música: 1 en menús y en la era 1, 2 dentro de una partida de la era 2 (si la copia trae las canciones)
 const has1=!!window.MUSIC_SRC,has2=!!window.MUSIC_SRC2;out.music=typeof musWant==='function';
 ERA=1;startGame(15);chooseHero('reinhart');document.body.classList.remove('inmenu');out.m1=musWant()===(has1?1:0);
 ERA=2;startGame(15);chooseHero('vega');document.body.classList.remove('inmenu');out.m2=musWant()===(has2?2:has1?1:0);
 if(has1&&has2){MUS.on=true;musPlay(1);for(let k=0;k<30;k++)musTick();out.swap=MUS.k===2;}else out.swap=true;
 out.has=[has1,has2].join();return out;});
const has=r.has;delete r.has;const bad=Object.entries(r).filter(([k,v])=>v!==true).map(([k])=>k);console.log(JSON.stringify(r)+' canciones:'+has);if(bad.length){console.log('FALLA: '+bad.join(', '));process.exit(1);}
await b.close();console.log('ERRS '+JSON.stringify(errs));if(errs.length)process.exit(1);})();
