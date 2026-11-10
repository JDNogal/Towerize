// v304 · Fallos del estudio de enemigos: interferencia que dejaba torres sin disparar y empujones que paraban a los jefes para siempre (jsdom)
const {JSDOM}=require('jsdom');const fs=require('fs');
const dom=new JSDOM(fs.readFileSync(process.argv[2],'utf8'),{runScripts:'dangerously',pretendToBeVisual:true,url:'http://localhost/',
 beforeParse(w){const c=new Proxy({}, {get:(t,k)=>k==='measureText'?()=>({width:0}):()=>{},set:()=>true});w.matchMedia=()=>({matches:false});w.HTMLCanvasElement.prototype.getContext=()=>c;w.structuredClone=globalThis.structuredClone;
 w.Element.prototype.getBoundingClientRect=function(){return{left:0,top:0,right:900,bottom:900,width:900,height:900,x:0,y:0};};}});
const w=dom.window;
setTimeout(()=>{let r;try{r=w.eval(`(()=>{const o={};ERA=2;startGame(15);chooseHero('vega');if(DLG.on)dlgEnd();RL.open=false;
 for(let pi=0;pi<3;pi++){S.pi=pi;const of=S.offers[pi];let ok=0;for(let q=0;q<4&&!ok;q++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,of.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(of);}if(ok)break;}
 RL.open=false;S.gold=1e5;S.phase='build';
 const sol=[];for(let ky=0;ky<NC;ky++)for(let kx=0;kx<NC;kx++)if(S.cc[ky][kx]===1&&!S.occ[(kx*K+1)+','+(ky*K+1)])sol.push({x:kx*K+1,y:ky*K+1});
 const bld=(ty,i)=>{S.tsel=ty;if(!S.deck.includes(ty))S.deck.push(ty);build(sol[i].x,sol[i].y);return S.list[S.list.length-1];};
 const so=bld('sonic',0),na=bld('nano',1);startWave();for(const p of S.portals)p.q=[];const P0=S.portals[0];S.enemies=[{t:'auto',x:P0.x,y:P0.y,tx:P0.x,ty:P0.y,hp:1e9,max:1e9,fx:{freeze:{t:999}},src:null,pv:[P0.x,P0.y]}];
 // interferencia: al acabar, la recarga vuelve a la normal
 so.jam=1;na.jam=1;so.cd=2000;if(na.sw)for(const x of na.sw)x.tk=2000;update(.05);for(let i=0;i<30;i++)update(.05);
 const r1=1/stats(so).rate,r2=1/stats(na).rate;o.jamCd=so.jam===0&&so.cd<=r1+1e-6;o.dbg=[so.jam,so.cd,r1].map(v=>+(+v).toFixed(3)).join(",");o.jamSw=!na.sw||na.sw.every(x=>x.tk<=r2+1e-6);
 // empujones: un generador anclado no se mueve y ARGOS con escudo tampoco
 const g={t:'gen',x:3,y:3,anch:1,fx:{},trail:[[9,3]]};knock(g,K);o.anch=g.x===3;
 const a={t:'argos',x:5,y:5,sh:1,fx:{},trail:[[9,5]]};knock(a,K);o.argosSh=a.x===5;
 // jefes: empujones seguidos cada vez más flojos, hasta no moverlo
 const b={t:'atroll',x:0,y:0,fx:{},trail:[[100,0]],hp:10,max:10};const ds=[];const kb=()=>{const x0=b.x;knock(b,K);return +(b.x-x0).toFixed(2);};for(let i=0;i<5;i++)ds.push(kb());
 const w0=S.wt;S.wt=w0+8.5;ds.push(kb());S.wt=w0;
 o.bossKb=isBoss(b)&&ds[0]>ds[1]&&ds[1]>ds[2]&&ds[2]>0&&ds[3]===0&&ds[4]===0&&ds[5]>0;o.ds=ds.join(',');
 // Pirata: el pulso apaga 6 s las torres aunque él muera y recarga 12 s
 so.jam=0;so.cd=0;const pe={t:'hack',x:so.x+1,y:so.y,hp:1e9,max:1e9,fx:{},jc:0};jamTick(pe,.1);o.cast=pe.chan>0;jamTick(pe,1.05);o.jamOn=Math.abs(so.jam-JAMOFF)<1e-6;o.jamRest=pe.jc>10;
 return o;})()`);}catch(e){console.log('EXC '+e.stack);process.exit(1);}
 console.log(JSON.stringify(r));const bad=Object.entries(r).filter(([k,v])=>v===false).map(([k])=>k);if(bad.length){console.log('FALLOS '+bad.join(', '));process.exit(1);}console.log('ok');process.exit(0);},400);
