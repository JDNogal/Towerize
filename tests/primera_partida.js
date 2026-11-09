// Primera partida: sin pasos de era ni duración (15 rondas, Fantástica); la intro sale al empezar y después la elección de héroe. Al ganar la primera, Radagast se presenta.
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;OPT.eter=false;});
await p.evaluate(()=>document.querySelector('[data-a="newgame"]').click());await p.waitForTimeout(600);
ck(!(await p.evaluate(()=>DLG.on)),'la intro sale al pulsar Nueva partida (debe salir al empezar)');
await p.evaluate(()=>document.querySelector('[data-a="tutskip"]').click());await p.waitForTimeout(600);
await p.evaluate(()=>document.querySelector('[data-a="skipok"]').click());await p.waitForTimeout(1300);
const a=await p.evaluate(()=>({R:ROUNDS,era:S&&S.era,dlg:DLG.on,step:LB.open?LB.step:null,who:!!document.querySelector('#dlg .dpp')}));
ck(a.R===15,'la primera partida no es de 15 rondas');ck(a.era===1,'la primera partida no es de la Fantástica');ck(a.dlg,'no sale la intro al empezar');ck(a.step!=='era'&&a.step!=='rounds','salen los pasos de era o duración en la primera partida');
let n=0,port=0;while(await p.evaluate(()=>DLG.on)&&n<30){port+=await p.evaluate(()=>/REINHART|SYLVANA/.test((document.querySelector('#dlg .dsp')||{}).textContent||'')&&!!document.querySelector('#dlg .dpp svg')?1:0);await p.evaluate(()=>{DLG.n=DLG.full.length;dlgTap();});await p.waitForTimeout(60);n++;}
ck(port>=2,'Reinhart y Sylvana no salen con su retrato');
await p.waitForTimeout(800);ck(await p.evaluate(()=>LB.open&&RL.hpick),'tras la intro no se abre la elección de héroe');
await p.evaluate(()=>{chooseHero('reinhart');S.phase='won';endGame();});await p.waitForTimeout(2500);
let rad=false;for(let k=0;k<40;k++){const t=await p.evaluate(()=>DLG.on?((document.querySelector('#dlg .dsp')||{}).textContent||''):'');if(/RADAGAST/.test(t)){rad=true;break;}await p.evaluate(()=>{if(DLG.on){DLG.n=DLG.full.length;dlgTap();}});await p.waitForTimeout(120);}
ck(rad,'Radagast no se presenta al ganar la primera partida');
console.log(fails.length?'FALLOS '+JSON.stringify(fails):'primera ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
