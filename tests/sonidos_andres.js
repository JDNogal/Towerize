// v352 · Sonidos de Andres: conjunto «Andres»/«Claude» en Opciones, resolución por era, bolsa barajada y que las muestras se decodifican
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Test',intro:1,e2n:1,e2a:1,e2v:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);await p.mouse.click(400,300);await p.waitForTimeout(400);
const r=await p.evaluate(async()=>{const out={};const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;
 out.def=OPT.sndset==='andres'&&sndSet()==='andres';
 out.andres=['ui','uix','boss'].every(k=>sfxDef(k)===SNDA[k]);
 // pasar el ratón: sin versión de Andres (Nogal, 21-nov), suena el de Claude más bajo
 out.uih=!SNDA.uih&&sfxDef('uih')===sfxDefC('uih')&&sfxDef('uih').s==='n_uih'&&sfxDef('uih').v<=.1;
 out.fallback=sfxDef('build')===sfxDefC('build')&&sfxDef('h_arrow')===sfxDefC('h_arrow');
 OPT.sndset='claude';out.claude=['ui','uih','uix','boss'].every(k=>sfxDef(k)===sfxDefC(k))&&sfxDef('boss').y==='boss3A';
 // por era: una clave _e2 de Claude se usa en la era 2 y la general en la era 1
 SFXK.ui_e2={n:'x',vs:[{y:'bopA',v:.5}]};S.era=2;out.era2=sfxDef('ui')===SFXK.ui_e2.vs[0];S.era=1;out.era1=sfxDef('ui')===sfxDefC('ui');delete SFXK.ui_e2;S.era=undefined;
 // Andres como último recurso: si Claude no tuviera «uix», suena el de Andres
 const keep=SFXK.uix;delete SFXK.uix;out.last=sfxDef('uix')===SNDA.uix;SFXK.uix=keep;OPT.sndset='andres';
 // bolsa: 9 seguidas = las 9 distintas; nunca la misma dos veces seguidas en 400 disparos
 const d=SNDA.ui,seq=[];for(let k=0;k<400;k++)seq.push(sfxPick(d));out.bag=new Set(seq.slice(0,9)).size===9&&seq.every((s,k)=>!k||s!==seq[k-1]);
 const u=SNDA.uix,s2=[];for(let k=0;k<300;k++)s2.push(sfxPick(u));out.bag3=s2.every((s,k)=>!k||s!==s2[k-1]);
 sndInit();await new Promise(r=>setTimeout(r,1500));const ks=Object.keys(SNDB64).filter(k=>k.startsWith('a_'));
 out.decoded=ks.length===13&&ks.every(k=>SND.buf[k]);out.boss2ch=!!SND.buf.a_boss&&SND.buf.a_boss.numberOfChannels===2&&SND.buf.a_boss.duration>6.3;
 out.uiLen=SNDA.ui.s.every(k=>SND.buf[k]&&SND.buf[k].duration<.08);
 let thrown=0;for(const k of['ui','uih','uix','boss']){try{sfx(k,{force:1});}catch(e){thrown++;}}out.play=thrown===0;
 out.panel=/Andres/.test(sfxTestHTML())&&!/la última que pruebes/.test(sfxTestHTML());
 out.size=ks.reduce((a,k)=>a+SNDB64[k].length,0)<300*1024;return out;});
const bad=Object.entries(r).filter(([k,v])=>v!==true).map(([k])=>k);console.log(JSON.stringify(r));if(bad.length){console.log('FALLA: '+bad.join(', '));process.exit(1);}
await b.close();console.log('ERRS '+JSON.stringify(errs));if(errs.length)process.exit(1);})();
