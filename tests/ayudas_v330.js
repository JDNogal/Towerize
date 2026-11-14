// v330 · Ayudas: alcances, oro sin gastar, avisos de la línea, ¿por qué he perdido?, Sabías que, fallos, carrera, interruptores
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Test',intro:1,e2n:1,e2a:1,e2v:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};
const r=await p.evaluate(async()=>{const out={};const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;OPT.nearach=false;
 ERA=1;startGame(15);chooseHero(Object.keys(HEROES)[0]);if(DLG.on)dlgEnd();RL.open=false;HQ.q=[];if(HQ.cur)hintClose();
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
 RL.open=false;$('relic').classList.remove('open');S.phase='build';S.round=3;S.gold=600;
 const sol=[];for(let ky=0;ky<NC;ky++)for(let kx=0;kx<NC;kx++)if(S.cc[ky][kx]===1&&!S.occ[(kx*K+1)+','+(ky*K+1)])sol.push({x:kx*K+1,y:ky*K+1});
 S.tsel=S.deck[0];build(sol[0].x,sol[0].y);
 out.opts=['goldw','rtlw','whyl','tips'].every(k=>OPT[k]===true&&OPTS.some(o=>o.key===k&&OSEC[k]==='Ayudas'));
 out.kb=KB.rng==='x'&&KBL.some(g=>g[1].some(r=>r[0]==='rng'));
 // oro: con 600 se puede hacer algo; con 0, no
 out.gw1=goldWarnOn();S.gold=0;out.gw0=!goldWarnOn();S.gold=600;
 // Intro: la primera vez no empieza
 document.body.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}));
 out.held=S.phase==='build'&&GW.r===S.round;
 // línea: voladores y enemigo nuevo
 const P=S.portals[0];P.plan={bat:3,norm:2};SEEN.en.bat=0;delete SEEN.en.bat;const w=rtlWarn(S.round);out.fly=w.fly===3;out.dot=rtlDot(S.round).h.includes('rtw fly');OPT.rtlw=false;out.off=rtlWarn(S.round).fly===0;OPT.rtlw=true;
 // ¿por qué he perdido?
 S.st.ek={armored:{k:1,l:2,g:0,hpl:6}};const L=whyLost();out.why=L.length>=1&&/Acorazado|armadura/i.test(L[0].h+L[0].s);
 // Sabías que
 out.tip=/Sabías que/.test(tipHTML());OPT.tips=false;out.tipOff=tipHTML()==='';OPT.tips=true;
 // portada: botón de fallos
 out.cover=/data-a="bugrep"/.test(lbCoverHTML());
 // informe: se envía lo que toca
 let sent=null;const f0=window.fetch;window.fetch=async(u,o)=>{sent={u,b:JSON.parse(o.body)};return {json:async()=>({ok:true})};};
 openPause();bugOpen();const ta=document.querySelector('#bugw textarea');ta.value='Prueba de informe';document.querySelector('#bugw [data-bg="cat"][data-v="ui"]').click();document.querySelector('#bugw textarea').value='Prueba de informe';
 document.querySelector('#bugw [data-bg="send"]').click();await new Promise(r=>setTimeout(r,200));window.fetch=f0;
 out.bug=!!sent&&/\/bug$/.test(sent.u)&&sent.b.cat==='ui'&&sent.b.txt==='Prueba de informe'&&/^\d+$/.test(sent.b.ver)&&(!sent.b.img||sent.b.img.startsWith('data:image/jpeg'))&&!document.getElementById('bugw').classList.contains('open');
 // carrera
 HIST.list=[{id:'a',res:'w',t0:1,R:15,r:15,hero:Object.keys(HEROES)[0],era:1,time:100,kills:10,gold:5,dmg:9,tw:[['arrow','',1,5,1]]},{id:'b',res:'l',t0:2,R:15,r:4,hero:Object.keys(HEROES)[0],era:1,time:50,kills:5,gold:2,dmg:3,tw:[]}];
 const c=carStats();out.car=c.n===2&&c.w===1&&c.streak===1&&c.kills===15&&STABS.some(t=>t[0]==='car')&&/Carrera/.test(carParts().left);
 return out;});
console.log(JSON.stringify(r));
for(const k in r)ck(r[k]===true,k);
await p.keyboard.down('x');await p.waitForTimeout(150);const on=await p.evaluate(()=>rngaOn());await p.keyboard.up('x');ck(on,'tecla X');
await b.close();if(errs.length)console.log('ERRS',errs);if(fails.length||errs.length){console.log('FALLOS',JSON.stringify(fails));process.exit(1);}console.log("ok");})();
