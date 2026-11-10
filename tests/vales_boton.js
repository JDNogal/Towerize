// v298 · Recordatorio de vales y tickets en el botón de mejorar
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(async()=>{const out={};INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;
 startGame(15);chooseHero('reinhart');if(DLG.on)dlgEnd();S.chests={};S.evts={};RL.open=false;HQ.q=[];
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
 RL.open=false;S.phase='build';S.gold=5000;
 // construir una torre en un solar libre
 let t=null;for(let y=0;y<N&&!t;y++)for(let x=0;x<N&&!t;x++){if(S.cells[y][x]===1&&!S.occ[x+','+y]){S.tsel='arrow';build(x,y);t=S.list[S.list.length-1]||null;}}
 out.built=!!t;if(!t)return out;
 const open=()=>{S.selT=t;tmOpen(t);tmTick();},btn=()=>document.querySelector('#tmenu .tmb[data-tm="up"]');
 // sin vale: el botón es el de siempre
 S.gold=0;open();out.noVch=!btn().querySelector('.tvch')&&btn().classList.contains('no');
 // con vale y sin oro: lo ofrece
 S.vch.up=1;TM.sig='';tmTick();const b1=btn();out.badge=!!b1.querySelector('.tvch');out.offer=b1.classList.contains('vch')&&!b1.classList.contains('no')&&/Usar ticket/.test(b1.querySelector('.p').textContent);
 // primer toque: marca y avisa; no gasta
 tmClick(btn());tmTick();out.armed=TM.arm==='up'&&t.lvl===1&&S.vch.up===1;const n=document.getElementById('tmvch');out.note=!!n&&n.classList.contains('on')&&/Puedes usar tu Ticket de mejora/.test(n.textContent);
 out.card=/usar tu Ticket de mejora/.test(document.getElementById('tmcard').textContent);
 // segundo toque: gasta el vale y sube
 tmClick(btn());out.used=t.lvl===2&&S.vch.up===0&&S.gold===0;
 // con oro y vale: cobra oro y conserva el vale, pero lleva la marquita
 S.vch.up=1;S.gold=5000;open();TM.sig='';tmTick();const b2=btn();out.remind=!!b2.querySelector('.tvch')&&!b2.classList.contains('vch')&&/🪙/.test(b2.querySelector('.p').textContent);
 const g0=S.gold;tmClick(btn());tmClick(btn());out.paid=t.lvl===3&&S.vch.up===1&&S.gold<g0;
 // en Nv 3 el ticket de mejora no vale: no aparece
 S.gold=0;open();TM.sig='';tmTick();out.nv3=!document.querySelector('#tmenu .tvch');
 // ticket de habilidad en una torre de Nv 4
 S.gold=5000;const sp=Object.keys(SPECS[t.type])[0];chooseSpec(t,sp);out.nv4=t.lvl===4&&!!t.spec;
 S.gold=0;S.vch.ab=1;open();TM.sig='';tmTick();const id=SPECS[t.type][t.spec].ab.find(a=>!abReq(t,a));const ab=()=>document.querySelector('#tmenu .tmb[data-tm="abuy"][data-v="'+id+'"]');
 out.abOffer=!!ab()&&ab().classList.contains('vch');tmClick(ab());tmClick(ab());out.abUsed=(t.ab[id]||0)===1&&S.vch.ab===0;
 await new Promise(r=>setTimeout(r,2300));out.noteGone=!document.getElementById('tmvch').classList.contains('on');
 return out;});
await p.screenshot({path:__dirname+'/out/vales_boton.png'});
const bad=Object.entries(r).filter(([k,v])=>v!==true).map(([k])=>k);console.log(JSON.stringify(r));if(bad.length){console.log('FALLA: '+bad.join(', '));process.exit(1);}
await b.close();console.log('ERRS '+JSON.stringify(errs));if(errs.length)process.exit(1);})();
