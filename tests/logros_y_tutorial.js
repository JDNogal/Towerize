const OUT=require('path').join(__dirname,'out');require('fs').mkdirSync(OUT,{recursive:true});
const {JSDOM}=require('jsdom');const fs=require('fs');
const dom=new JSDOM(fs.readFileSync(process.argv[2],'utf8'),{runScripts:'dangerously',pretendToBeVisual:true,url:'http://localhost/',
 beforeParse(w){const c=new Proxy({}, {get:(t,k)=>k==='measureText'?()=>({width:0}):()=>{},set:()=>true});w.matchMedia=()=>({matches:false});w.HTMLCanvasElement.prototype.getContext=()=>c;w.structuredClone=globalThis.structuredClone;
 w.Element.prototype.getBoundingClientRect=function(){return{left:0,top:0,right:900,bottom:900,width:900,height:900,x:0,y:0};};}});
const w=dom.window,errs=[];w.addEventListener('error',e=>errs.push(e.message+' '+(e.error&&e.error.stack)));const E=s=>w.eval(s);
setTimeout(()=>{try{
 console.log(E(`(()=>{const out=[];localStorage.clear();for(const k in ACHS)delete ACHS[k];
  startGame(20);S.chests={};chooseHero('radagast');
  for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
  // circuito: tesla Cadena + Conductor rango 2 (8 saltos), 3 enemigos juntos
  startWave();S.portals.forEach(p=>p.q=[]);const pc=pathNear(S.core.x+6,S.core.y)||pathNear(S.core.x,S.core.y+6)||pathNear(S.core.x-6,S.core.y)||pathNear(S.core.x,S.core.y-6);
  const mk=(dx,dy)=>{spawnEnemy('norm',{x:pc.x,y:pc.y,dir:[0,0]});const e=S.enemies[S.enemies.length-1];e.x=pc.x+dx;e.y=pc.y+dy;e.hp=e.max=1e6;return e;};
  const es=[mk(0,0),mk(1.5,0),mk(3,0)];
  const t={id:999,type:'tesla',lvl:4,spec:'cad',ab:{cond:2},acd:{},x:pc.x,y:pc.y-3,cells:[],cd:0};
  zap(t,es[0],stats(t),10,twm('tesla','cad'),false);out.push('circuit '+!!ACHS.circuit);
  // barra libre + cero absoluto
  const e=es[1];addBurn(e,null,5);addPois(e,3,null);addBleed(e,null,2);addChill(e,null,35);e.ez={n:3,t:4};freezeE(e,2);update(.05);out.push('bar '+!!ACHS.bar+' zero '+!!ACHS.zero);
  // choque térmico: matar con fuego congelado
  e.hp=1;e.bn=50;update(.05);out.push('thermal '+!!ACHS.thermal);
  // cofre: reliquia de cofre usada
  S.chestRel=['horn'];S.relics.push('horn');S.rs.horn={cd:0,t:0};setCD('horn');out.push('chest '+!!ACHS.chest);
  // victoria con condiciones
  S.built=['laser'];S.hp=1;S.hpEn=0;S.usedAct=0;S.unitDied=0;S.phase='won';achWin();out.push('win: '+['first','perfect','minimal','noact','untouch','pure','nobuild','marathon'].map(k=>k+':'+!!ACHS[k]).join(' '));
  // logros (categorías y secretos)
  toggleComp(true);CP.tab='lg';renderComp();const tx=$('comp').textContent;out.push('cats '+['Primeros pasos','Clásicos','Formas de jugar','Héroes','Estados y combinaciones','Eventos y torres únicas','Mapa','De veterano'].map(c=>c+':'+tx.includes(c)).join(' '));
  out.push('secret luz: '+tx.slice(tx.indexOf('Luz eterna'),tx.indexOf('Luz eterna')+90));
  return out.join('\\n');})()`));
 console.log(E(`(()=>{startTut();S.round=10;S.phase='build';S.relics.push('horn');S.rs.horn={cd:0,t:0};S.chestRel=['horn'];openRelic();const ch=RL.choices.join(',');RL.open=false;startWave();S.portals.forEach(p=>p.q=[]);const pc=pathNear(S.core.x,S.core.y+8)||pathNear(S.core.x+8,S.core.y)||pathNear(S.core.x-8,S.core.y)||pathNear(S.core.x,S.core.y-8);spawnEnemy('bob',{x:pc.x,y:pc.y,dir:[0,0]});const b=S.enemies[S.enemies.length-1];b.f0=999;b.hb={1:S.wt};achTick(.05);return 'tut choices '+ch+' | bob '+ET.bob.n+' isBoss '+isBoss(b)+' | hintQ '+HQ.q.map(h=>h.id).concat(HQ.cur?[HQ.cur.id]:[]).join(',');})()`));
 console.log('ERRS',errs.slice(0,4));
}catch(e){console.log('EXC',e.stack)}process.exit(0);},500);
