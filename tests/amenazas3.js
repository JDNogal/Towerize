// Amenazas, tanda 3: Sabotaje (el saboteador apaga su torre al llegar) y Abanderados (escuadra inmune a ralentizar y empujar mientras vive)
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;startGame(15);chooseHero('reinhart');for(let i=0;i<5&&DLG.on;i++)dlgEnd();HQ.q=[];if(HQ.cur)hintClose();});
await p.waitForTimeout(600);
const r=await p.evaluate(()=>{try{lbClose(true);}catch(e){}RL.open=false;$('relic').classList.remove('open');
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
 RL.open=false;$('relic').classList.remove('open');document.body.classList.remove('pcpick');S.phase='build';S.gold=9999;S.amz={sab:1,aba:1};ui();
 const k=S.deck[0];const sol=[];for(let y=0;y<N;y++)for(let x=0;x<N;x++)if(S.cells[y][x]===1&&!S.occ[x+','+y]){const q=sqOf(x,y);if(q.x===x&&q.y===y)sol.push([x,y]);}
 S.tsel=k;for(const s of sol.slice(0,4))build(s[0],s[1]);ui();
 const o={};o.targets=azSabTargets().length;
 S.phase='wave';const t=azSabTargets()[0]||S.list.find(x=>!x.hero);const hp=ehpOf('norm',1);
 const mk=(dx,sq)=>{const q={t:'norm',x:t.x+dx,y:t.y,tx:t.x+dx,ty:t.y,hp,max:hp,fx:{},src:null,pv:[t.x,t.y],sqid:sq};S.enemies.push(q);return q;};
 const s1=mk(1,null);s1.sab=t;t.jam=0;azSabTick();o.jam=t.jam>0;o.done=!s1.sab;
 const s2=mk(t.x>N/2?-5:5,null);s2.sab=t;t.jam=0;azSabTick();o.far=!(t.jam>0)&&!!s2.sab;
 const b1=mk(0,'sq1'),m1=mk(0,'sq1');S.flagSq={sq1:b1};b1.flag=1;
 slowE(m1,.5,2);o.noSlow=!m1.fx.slow;b1.hp=0;S.enemies.splice(S.enemies.indexOf(b1),1);slowE(m1,.5,2);o.slowAfter=!!m1.fx.slow;
 o.ready=['sab','aba'].every(id=>!AZT.find(x=>x[0]===id)[5]);
 try{draw();o.draw=true;}catch(e){o.draw=String(e);}return o;});
console.log(JSON.stringify(r));
ck(r.jam&&r.done,'Sabotaje: al llegar cerca, la torre se apaga y el saboteador deja de estar marcado');
ck(r.far,'Sabotaje: lejos de la torre no pasa nada');
ck(r.noSlow&&r.slowAfter,'Abanderados: su escuadra no se ralentiza mientras vive y sí después');
ck(r.ready,'Sabotaje y Abanderados ya se pueden activar');
ck(r.draw===true,'Se dibuja sin errores: '+r.draw);
await b.close();if(errs.length)console.log('ERRS',errs);if(fails.length){console.log(fails.join('\n'));process.exit(1);}})();
