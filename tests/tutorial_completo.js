// v307 · Juega el tutorial completo de principio a fin (10 rondas) como lo haría alguien: elige pieza, coloca, construye, juega la oleada.
// Falla si salta un error, si una ronda se queda atascada (p. ej. colocar una pieza y que siga pidiendo pieza) o si no se llega al final.
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:720}});const errs=[];p.on('pageerror',e=>errs.push(e.message+' '+((e.stack||'').split('\n')[1]||'')));
await p.goto('file://'+require('path').resolve(process.argv[2]));await p.waitForTimeout(800);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;try{localStorage.setItem('rt-story',JSON.stringify({intro:1}));}catch(e){}STO.intro=1;startTut();chooseHero('sylvana');});
const W=ms=>p.waitForTimeout(ms);
// cierra todo lo que pida atención: pistas, foco de solares, ventanas de torre / reliquia / evento / comparación
const clear=async()=>{let idle=0;for(let i=0;i<40;i++){const did=await p.evaluate(()=>{const q=s=>{const e=document.querySelector(s);return e&&e.offsetParent?e:null;};
  const c=HQ.cur;if(c&&c.steps&&c.steps[c.si]&&c.steps[c.si][2]){hintClose();return 'pista-accion';}
  for(const s of['#hint.open [data-a="hintok"]','#relic.open [data-a="tutok"]','#relic.open [data-a="evok"]','#relic.open [data-a="towok"]','#relic.open [data-a="towpick"]','#relic.open [data-a="evopt"]:not([disabled])','#relic.open [data-a="relic"]','#relic.open button.go','#focus.open [data-a="focusok"]']){const e=q(s);if(e){e.click();return s;}}
  return '';});if(!did){await W(90);idle++;const again=await p.evaluate(()=>!!(HQ.cur||RL.open||FO.open||(S.tut&&S.tut.off&&S.phase==='build')));if(!again&&idle>=3)return;}else idle=0;await W(110);}};
const log=[];let fin='';
for(let guard=0;guard<14;guard++){await W(250);await clear();if(process.env.DBG)console.log('g',guard,await p.evaluate(()=>[S.round,S.phase,HQ.cur&&HQ.cur.id,RL.open,FO.open,!!(S.tut&&S.tut.off),S.aim]));
 const st=await p.evaluate(()=>[S.round,S.phase]);if(st[1]==='won'||st[1]==='lost'){fin=st[1];break;}
 if(st[1]==='place'){const r=await p.evaluate(()=>{for(let pi=0;pi<S.offers.length;pi++){S.pi=pi;const o=S.offers[pi];if(payOn()&&pcost(o)>S.gold)continue;for(let k=0;k<4;k++){for(let by=0;by<BN;by++)for(let bx=0;bx<BN;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);return o.n;}rotO(o);}}return '';});
  if(!r){errs.push('ronda '+st[0]+': ninguna pieza cabe');break;}await W(400);await clear();
  const ph=await p.evaluate(()=>S.phase);if(ph==='place'){errs.push('ronda '+st[0]+': tras colocar «'+r+'» sigue pidiendo pieza');break;}log.push(st[0]+':'+r);}
 await clear();
 // construye lo que pueda en solares libres junto al camino
 await p.evaluate(()=>{let n=0;for(let gy=0;gy<NC&&n<2;gy++)for(let gx=0;gx<NC&&n<2;gx++){const x=gx*K+1,y=gy*K+1;if(S.cc[gy][gx]!==1||S.occ[x+','+y])continue;const k=S.deck.find(k=>TW[k]&&TW[k].cost<=S.gold);if(!k)return;S.tsel=k;try{build(x,y);n++;}catch(e){}}S.tsel=null;});
 await W(300);await clear();
 const ok=await p.evaluate(()=>{if(S.phase!=='build')return S.phase;startWave();return S.phase;});
 if(ok!=='wave'){await clear();await p.evaluate(()=>{if(S.phase==='build')startWave();});}
 // la oleada, acelerada; los enemigos mueren para no depender de la defensa
 for(let t=0;t<200;t++){const ph=await p.evaluate(()=>{if(S.phase!=='wave')return S.phase;for(let i=0;i<120;i++){if(HQ.cur||RL.open)return 'pista';for(const e of S.enemies)if(e.hp>0&&!e.leak)hurt(e,e.max*.2,null,'elem');update(.1);if(S.phase!=='wave')break;}return S.phase;});if(ph==='pista'){if(process.env.DBG)console.log('pista',await p.evaluate(()=>[S.round,S.phase,HQ.cur&&HQ.cur.id,RL.open,(document.querySelector('#relic.open')||{}).innerHTML?document.querySelector('#relic.open').innerText.slice(0,80):'']));await clear();continue;}if(ph!=='wave')break;}
 const after=await p.evaluate(()=>[S.round,S.phase]);if(after[1]==='wave'){errs.push('ronda '+st[0]+': la oleada no termina');break;}}
if(!fin)fin=await p.evaluate(()=>S.phase);
const done=await p.evaluate(()=>{try{return !!localStorage.getItem('rt-tutdone');}catch(e){return false;}});
console.log('piezas',log.join(' '),'| final',fin,'| tutorial completado',done);
if(fin!=='won'&&!done)errs.push('no se llegó al final del tutorial (fase '+fin+')');
console.log(errs.length?'FALLOS\n'+errs.join('\n'):'ERRS []');await b.close();process.exit(errs.length?1:0);})();
