// El tutorial siempre trae 2 eventos (santuario y mercader) y 2 cofres; las partidas normales, sus cofres y eventos
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
let ok=0;for(let i=0;i<15;i++){if(await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;startTut();return Object.values(S.evts).includes('shrine')&&Object.values(S.evts).includes('merchant')&&Object.keys(S.chests).length===2;}))ok++;}
let ng=0;for(let i=0;i<5;i++){if(await p.evaluate(()=>{startGame(15);return Object.keys(S.chests).length>=1&&Object.keys(S.evts).length>=1;}))ng++;}
console.log('tutorial con santuario '+ok+'/15 · partidas con cofres y eventos '+ng+'/5');
console.log(ok===15&&ng===5&&!errs.length?'tutorial ok':'FALLO '+JSON.stringify(errs));await b.close();})();
