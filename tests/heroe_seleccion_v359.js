// v359: con el héroe seleccionado para moverlo, pulsar una torre suelta el héroe y abre la torre; pulsar fuera del camino sin nada da el aviso en rojo;
// la ficha fijada de una torre sigue a la torre al mover la cámara; la ficha del héroe nueva (vida, tarjetas, pasivas).
const OUT=require('path').join(__dirname,'out');require('fs').mkdirSync(OUT,{recursive:true});
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
const p=await (await b.newContext({viewport:{width:1280,height:720}})).newPage();const errs=[],F=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
await p.evaluate(()=>{const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;localStorage.setItem('rt-tutchoice','skip');startGame(15);chooseHero('yrsa');for(let i=0;i<6&&DLG.on;i++)dlgEnd();S.chests={};S.evts={};try{lbClose(true);}catch(e){}
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}}
 RL.open=false;$('relic').classList.remove('open');S.gold=99999;S.deck=['frost'];HQ.q=[];if(HQ.cur)hintClose();ui();
 const free=[];for(let gy=0;gy<NC;gy++)for(let gx=0;gx<NC;gx++)if(S.cc[gy][gx]===1)free.push([gx,gy,Math.hypot(gx*K-S.core.x,gy*K-S.core.y)]);free.sort((a,b)=>a[2]-b[2]);
 S.tsel='frost';for(const c of free){const n=S.list.length;build(c[0]*K+K/2,c[1]*K+K/2);if(S.list.length>n)break;}S.tsel=null;
 const t=S.list[0];CAM.x=(t.x+.5)*CS-VIEW/sc()/2;CAM.y=(t.y+.5)*CS-VH/sc()/2;clampCam();ui();});
await p.waitForTimeout(1500);
const info=await p.evaluate(()=>{const t=S.list[0];let empty=null;for(let y=0;y<N&&!empty;y++)for(let x=0;x<N&&!empty;x++){const r=cellRect(x,y);if(r.l<300||r.r>1000||r.t<120||r.b>600)continue;if(S.cells[y][x]!==2&&!S.occ[x+','+y]&&!bmFree(sqOf(x,y))&&!heroAt({x,y,fx:x+.5,fy:y+.5})){M.x=(r.l+r.r)/2;M.y=(r.t+r.b)/2;let g=null;try{g=resolve(cv);}catch(e){}if(!g)empty={x,y};}}return {t:{x:t.x,y:t.y},empty};});
const pt=c=>p.evaluate(([x,y])=>{const r=cellRect(x,y);return [(r.l+r.r)/2,(r.t+r.b)/2];},[c.x,c.y]);
await p.evaluate(()=>clickA('[data-a="hero"]'));await p.waitForTimeout(200);
if(info.empty){const q=await pt(info.empty);await p.mouse.click(q[0],q[1]);await p.waitForTimeout(300);
 const r=await p.evaluate(()=>[S.aim,S.msg,$('msg').classList.contains('err')]);if(r[0]!=='hero'||!r[2])F.push('vacío: '+r);}
const qt=await pt(info.t);await p.mouse.click(qt[0],qt[1]);await p.waitForTimeout(300);
const r2=await p.evaluate(()=>[S.aim,!!S.selT,$('tmenu').classList.contains('on'),$('msg').classList.contains('err')]);if(r2[0]||!r2[1]||!r2[2]||r2[3])F.push('torre: '+r2);
// un botón de la interfaz (elegir torre del mazo) también suelta al héroe
await p.evaluate(()=>{tmClose();S.selT=null;clickA('[data-a="hero"]');});await p.waitForTimeout(200);
const sb=await p.$('[data-a="sel"]');if(sb){await sb.click();await p.waitForTimeout(200);const r3=await p.evaluate(()=>[S.aim,S.tsel]);if(r3[0]||!r3[1])F.push('botón: '+r3);}
await p.evaluate(()=>{S.tsel=null;ui();});
// ficha fijada que sigue a la torre
await p.evaluate(()=>{tmClose();pinTower(S.list[0]);});await p.waitForTimeout(400);
const d=await p.evaluate(async()=>{/* v362: aquí se mira solo que siga a la torre; si al moverla pisa la interfaz, se aparta (primAvoidHud, prueba ficha_reintentar_v362) */const _pa=primAvoidHud;primAvoidHud=()=>null;const tw=()=>{const t=S.list[0],r=cellRect(t.x-1,t.y-1,K);return r;};const tp=$('tip').getBoundingClientRect(),a=tw();CAM.x-=150;await new Promise(r=>setTimeout(r,600));const tp2=$('tip').getBoundingClientRect(),b2=tw();primAvoidHud=_pa;return [Math.round((tp2.left-tp.left)-(b2.l-a.l)),Math.round(b2.l-a.l)];});
if(Math.abs(d[0])>3)F.push('la ficha no sigue a la torre: '+d);
// arrastrar el mapa con la ficha fijada no la cierra
await p.evaluate(()=>{pinTower(S.list[0]);});await p.waitForTimeout(300);
{const tr=await p.evaluate(()=>{const r=$('tip').getBoundingClientRect();return r.left>640?300:1000;});await p.mouse.move(tr,300);await p.mouse.down();await p.mouse.move(tr-60,260,{steps:8});await p.mouse.up();await p.waitForTimeout(300);
 if(!await p.evaluate(()=>PR.pinned))F.push('arrastrar cierra la ficha');}
// ficha del héroe
const h=await p.evaluate(()=>{S.aim='hero';heroCard();const e=$('hinfo');return [!!e.querySelector('.fhhp .ftbar'),e.querySelectorAll('.ftchips .ftchip').length,!!e.querySelector('.fhxp'),!!e.querySelector('.fhdps'),e.querySelectorAll('.fhpas').length,/Nv 8/.test(e.textContent)&&/\?\?\?/.test(e.textContent),!!e.querySelector('.fhpor svg,.fhpor canvas,.fhpor img,.fhpor *')];});
if(!h[0]||h[1]!==3||!h[2]||!h[3]||h[4]!==2||!h[5]||!h[6])F.push('ficha héroe: '+h);
await p.screenshot({path:`${OUT}/heroe_v359.png`});
if(F.length)console.log('FALLOS '+F.join(' · '));
console.log(errs.length?'ERRS '+JSON.stringify(errs):'ok');await b.close();})();
