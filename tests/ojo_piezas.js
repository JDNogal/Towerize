// v331 · Móvil: los botones de arriba a la derecha (mazo, reliquias y ojo) funcionan al tocarlos,
// al elegir pieza y en la ventana de reliquias (antes el ojo de elegir pieza no hacía nada)
const {chromium,devices}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[],fails=[];
const c=await b.newContext({...devices['iPhone 13 landscape']});const p=await c.newPage();p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Test',intro:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;OPT.nearach=false;ERA=1;startGame(15);chooseHero(Object.keys(HEROES)[0]);if(DLG.on)dlgEnd();HQ.q=[];if(HQ.cur)hintClose();});
await p.evaluate(()=>{RL.open=false;$('relic').classList.remove('open');ui();});
const tap=async sel=>{const pos=await p.evaluate(s=>{const b=document.querySelector(s);if(!b||!b.offsetParent)return null;const r=b.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2];},sel);if(!pos)return false;await p.touchscreen.tap(pos[0],pos[1]);await p.waitForTimeout(400);return true;};
const pop=()=>p.evaluate(()=>{const e=document.getElementById('mzpop');return e?(e.querySelector('.mzd')?'deck':'rel'):null;});
const close=()=>p.evaluate(()=>{try{mzClose();}catch(e){}});
// 1) elegir pieza
await p.waitForFunction(()=>document.querySelector('#pkbar.on [data-a="ppeek"]'),null,{timeout:6000}).catch(()=>fails.push('no sale la barra al elegir pieza'));
if(!(await tap('#pkbar.on [data-mz="deck"]'))||await pop()!=='deck')fails.push('pieza: el mazo no se abre');await close();
if(!(await tap('#pkbar.on [data-mz="rel"]'))||await pop()!=='rel')fails.push('pieza: las reliquias no se abren');await close();
if(!(await tap('#pkbar.on [data-a="ppeek"]'))||!(await p.evaluate(()=>S.ppk===1&&document.body.classList.contains('pcpeek'))))fails.push('pieza: el ojo no deja ver el mapa');
// 2) ventana de reliquias
await p.evaluate(()=>{S.ppk=0;S.phase='build';document.body.classList.remove('pcpick','pcpeek');const pb=document.getElementById('pcback');if(pb)pb.remove();openRelic();});await p.waitForTimeout(600);
if(!(await tap('#relic .rlbar [data-mz="deck"]'))||await pop()!=='deck')fails.push('reliquias: el mazo no se abre');await close();
if(!(await tap('#relic .rlbar [data-mz="rel"]'))||await pop()!=='rel')fails.push('reliquias: las reliquias no se abren');await close();
if(!(await tap('#relic .rlbar [data-a="peek"]'))||!(await p.evaluate(()=>RL.peek===true)))fails.push('reliquias: el ojo no deja ver el mapa');
await b.close();if(errs.length)console.log('ERRS',errs);if(fails.length||errs.length){console.log('FALLOS',JSON.stringify(fails));process.exit(1);}console.log('ok');})();
