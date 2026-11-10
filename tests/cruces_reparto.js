// v305 · En un cruce con dos ramas igual de largas, los enemigos se reparten (y cada escuadra va entera por la misma rama)
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:720}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Test',intro:1}));}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const run=async sq=>p.evaluate((sq)=>{INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;ERA=1;startGame(15);if(DLG.on)dlgEnd();RL.open=false;HQ.q=[];if(HQ.cur)hintClose();
 S.cc=Array.from({length:NC},()=>Array(NC).fill(0));S.cells=Array.from({length:N},()=>Array(N).fill(0));
 const set=(x,y)=>{S.cc[y][x]=2;for(let j=0;j<K;j++)for(let i=0;i<K;i++)S.cells[y*K+j][x*K+i]=2;};
 for(let y=2;y<=12;y++)set(5,y);for(let x=5;x<=15;x++)set(x,5);for(let y=5;y<=12;y++)set(15,y);for(let x=5;x<=18;x++)set(x,12);
 S.core={x:18*K+1,y:12*K+1};S.portals=[{x:5*K+1,y:2*K+1,dir:[0,-1]}];const P0=S.portals[0];for(const q of S.portals){q.sq=[];q.sqm=[];q.plan={norm:0,fast:0,tank:0,custodian:0,mini:0,elite:0,boss:0,colossus:0};}
 S.phase='build';S.hp=999;startWave();S.enemies=[];
 const es=[];for(let i=0;i<24;i++){const sid=sq?Math.floor(i/4)+1:0;const e={t:'norm',x:P0.x,y:P0.y,tx:P0.x,ty:P0.y,hp:1e9,max:1e9,fx:{},sqid:sid||undefined};if(sq&&i%4===0){e.sqlead=1;(S.sqL=S.sqL||{})[sid]=e;}es.push(e);}
 let rel=0;const out={right:0,down:0};const seen=new Set();
 for(let s=0;s<2000;s++){if(rel<es.length&&s%15===0)S.enemies.push(es[rel++]);update(.05);for(const e of es){if(seen.has(e))continue;const cx=Math.floor(e.x/K),cy=Math.floor(e.y/K);if(cx>=8&&cy===5){out.right++;seen.add(e);out["s"+e.sqid]=(out["s"+e.sqid]||"")+"R";}else if(cy>=8&&cx===5){out.down++;seen.add(e);out["s"+e.sqid]=(out["s"+e.sqid]||"")+"D";}}}
 return out;},sq);
const r={a:[await run(false)],b:await run(true)};r.a.push(r.b);
console.log(JSON.stringify(r));await b.close();let bad=[];for(const v of r.a)if(v.right<8||v.down<8)bad.push("reparto");for(const k in r.b)if(k[0]==="s"&&!/^(R+|D+)$/.test(r.b[k]))bad.push("escuadra "+k);if(errs.length)bad.push("errores "+errs[0]);if(bad.length){console.log("FALLA: "+bad.join(", "));process.exit(1);}})();
