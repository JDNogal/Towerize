// Casillas especiales por era (v329): 4 en la 1.ª partida, +2, +2; era 2 +2, +1, +1 (Rebote); compendio sin las de la era 2; Rebote salta a 1 (★ 2) con el 40 %
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage();p.on('pageerror',e=>errs.push(e.message));await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{INTRO.on=false;STO.intro=1;const o={};
 startGame(15);const s0=S;
 const pool=(pp,bb,era)=>{STO.p=pp;STO.bb=bb;STO.bfz={};S=Object.assign({},s0,{era,tut:0});const r=bfPool().sort().join(',');S=s0;return r;};
 o.g=[pool(0,0,1),pool(1,0,1),pool(2,0,1),pool(3,0,2),pool(3,1,2),pool(3,2,2),pool(3,3,1)];
 STO.p=0;STO.bb=0;STO.bfz={};S=Object.assign(s0,{era:1,tut:0});const seenK=new Set();for(let i=0;i<400;i++)seenK.add(rollBuff().replace('+',''));o.roll=[...seenK].sort().join(',');
 // Rebote
 const y=5,x=5;S.buff[y][x]='reb';const t={cells:[[x,y]],type:'arrow'};const mk=(ex)=>({t:'grunt',x:ex,y:y,hp:100,max:100,fx:{}});
 S.enemies=[mk(6),mk(6.5),mk(7)];S.rbq=[];rebShot({src:t,e:S.enemies[0],x:6,y:y,dm:10,dt:'phys',sp:12});o.r1=S.rbq.length;o.dm=S.rbq[0]&&S.rbq[0].dm;
 S.rbq=[];rebShot({src:t,e:S.enemies[0],x:6,y:y,dm:10,rb:1});o.rb=S.rbq.length;
 S.buff[y][x]='reb+';S.rbq=[];rebShot({src:t,e:S.enemies[0],x:6,y:y,dm:10,dt:'phys',sp:12});o.r2=S.rbq.length;
 S.enemies=[];S.rbq=[];
 o.pow=BF.pow.col;o.cur=BF.cur.n;
 STO.bb=0;try{o.e2ok=era2Ok();}catch(e){o.e2ok='x';}o.okReb=bfEraOk('reb');o.okRng=bfEraOk('rng');return o;});
console.log(JSON.stringify(r));
const W=['gold,pow,rng,spd','aoe,crt,gold,pow,rng,spd','aoe,crt,cua,gold,per,pow,rng,spd','aoe,crt,cua,gold,per,pow,prf,rng,spd,tal','aoe,crt,cua,eco,gold,per,pow,prf,rng,spd,tal','aoe,crt,cua,eco,gold,per,pow,prf,reb,rng,spd,tal','aoe,crt,cua,eco,gold,per,pow,prf,reb,rng,spd,tal'];
W.forEach((w,i)=>ck(r.g[i]===w,'tanda '+i+': '+r.g[i]));
ck(r.roll==='gold,pow,rng,spd','en la 1.ª partida solo salen las 4 básicas ('+r.roll+')');
ck(r.r1===1&&Math.abs(r.dm-4)<1e-9,'Rebote: 1 salto con el 40 %');ck(r.rb===0,'un rebote no vuelve a rebotar');ck(r.r2===2,'Rebote ★: 2 saltos');
ck(r.pow==='#e0453a'&&r.cur==='Casilla defectuosa','colores intercambiados y nombre nuevo');ck(r.okRng&&(r.e2ok||!r.okReb),'sin la era 2, Rebote no sale en el compendio');
await b.close();if(errs.length)console.log('ERRS',errs);if(fails.length||errs.length){console.log(fails.join("\n"));process.exit(1);}console.log("ok");})();
