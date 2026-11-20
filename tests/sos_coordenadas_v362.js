// v362: Señal de socorro › «Pedirles coordenadas»: un cofre y un evento, a 2 casillas o más de todo lo colocado y separados entre sí
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:720}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(700);
const r=await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;startGame(15);chooseHero(HIDS()[0]);for(let i=0;i<5&&DLG.on;i++)dlgEnd();
 const ch0=Object.keys(S.chests).filter(k=>S.chests[k]),ev0=Object.keys(S.evts||{});RL.ev='sos';const tags=sosCoords();
 const ch=Object.keys(S.chests).filter(k=>S.chests[k]&&!ch0.includes(k)),ev=Object.keys(S.evts).filter(k=>!ev0.includes(k));
 const d=k=>{const[x,y]=k.split(',').map(Number);let m=99;for(const q in S.blocks){if(!S.blocks[q])continue;const[a,b]=q.split(',').map(Number);m=Math.min(m,Math.max(Math.abs(a-x),Math.abs(b-y)));}return m;};
 const opt=EVENTS.sos.opts[2];const B0=Object.assign({},S.blocks);for(let y=0;y<BN;y++)for(let x=0;x<BN;x++)S.blocks[x+','+y]=S.blocks[x+','+y]||1;const blk=!!evReqTxt(opt),play=evPlayable('sos','2,2');S.blocks=B0;return {blk,play,tags,ch,ev,dch:ch.map(d),dev:ev.map(d),evk:ev.map(k=>S.evts[k]),label:opt.l,sep:ch[0]&&ev[0]?(([a,b],[c,e])=>Math.abs(a-c)+Math.abs(b-e))(ch[0].split(',').map(Number),ev[0].split(',').map(Number)):0};});
const fails=[];if(r.label!=='Pedirles coordenadas')fails.push('la opción no es «Pedirles coordenadas»');if(r.ch.length!==1)fails.push('no sale un cofre nuevo');if(r.ev.length!==1)fails.push('no sale un evento nuevo');
if(r.dch[0]<2||r.dev[0]<2)fails.push('cofre o evento a menos de 2 casillas de lo colocado');if(r.sep<3)fails.push('el cofre y el evento salen juntos');if(!r.blk||r.play)fails.push('sin sitio lejos, la opción no se bloquea o el evento no se cambia');if(r.evk[0]==='sos')fails.push('vuelve a salir el mismo evento');if(errs.length)fails.push('errores: '+errs.join(' | '));
console.log(JSON.stringify(r));if(fails.length)console.log('FALLOS\n'+fails.join('\n'));else console.log('coordenadas ok');await b.close();process.exit(fails.length?1:0);})();
