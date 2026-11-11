// node run_bot.js <html> <trabajos.json> <salida.jsonl>   trabajo: {era,hero,rounds,seed,deck:[...],cfg:{...}}
const {JSDOM,VirtualConsole}=require('jsdom');const vc=new VirtualConsole();vc.on('jsdomError',()=>{});const fs=require('fs');
const [,,file,jobsF,outF]=process.argv;const jobs=JSON.parse(fs.readFileSync(jobsF,'utf8'));
const dom=new JSDOM(fs.readFileSync(file,'utf8'),{runScripts:'dangerously',pretendToBeVisual:true,url:'http://localhost/',virtualConsole:vc,
 beforeParse(w){const c=new Proxy({}, {get:(t,k)=>k==='measureText'?()=>({width:0}):()=>{},set:()=>true});w.matchMedia=()=>({matches:false});w.HTMLCanvasElement.prototype.getContext=()=>c;w.structuredClone=globalThis.structuredClone;
  w.Element.prototype.getBoundingClientRect=function(){return{left:0,top:0,right:900,bottom:900,width:900,height:900,x:0,y:0};};w.requestAnimationFrame=()=>0;}});
const w=dom.window,errs=[];w.addEventListener('error',e=>errs.push(e.message));
setTimeout(()=>{try{
 w.eval(fs.readFileSync(__dirname+'/bot4.js','utf8'));
 w.eval(`OPT.hints=false;OPT.eter=false;OPT.dnum=false;OPT.u_tw=true;OPT.u_era=true;OPT.u_hr=true;try{localStorage.setItem('rt-tutdone','1');localStorage.setItem('rt-tutchoice','skip');}catch(e){};try{INTRO.on=false;STO.intro=1;}catch(e){};for(const h in HEROES)delete HEROES[h].lockTxt;`);
 for(const j of jobs){let r;const t0=Date.now();try{r=w.eval(`(function(j){let a=(j.seed||1)>>>0;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};
   ERA=j.era||1;window.BOTDECK=j.deck||null;const o=BOT.play(Object.assign({hero:j.hero,rounds:j.rounds||15},j.cfg||{}));
   const tw={};for(const t of S.list){if(TW[t.type].uniq)continue;const k=t.type+(t.spec?':'+t.spec:'');tw[k]=tw[k]||{n:0,dmg:0,inv:0};tw[k].n++;tw[k].dmg+=Math.round(t.dmgT||0);tw[k].inv+=t.inv||0;}
   return JSON.stringify({res:o.res,round:o.round,hp:o.hp,err:o.err,stall:o.stall,rounds:o.rounds.map(r=>({r:r.r,lost:r.lost,gold:r.gold,tw:r.tw,l4:r.l4})),tw,heroDmg:S.hero&&S.hero.pt?Math.round(S.hero.pt.dmgT||0):0,relics:S.relics});})(${JSON.stringify(j)})`);r=JSON.parse(r);}catch(e){r={err:e.message+' '+(e.stack||'').slice(0,300)};}
  fs.appendFileSync(outF,JSON.stringify({...j,...r,ms:Date.now()-t0})+'\n');}
 if(errs.length)fs.appendFileSync(outF,JSON.stringify({errs:errs.slice(0,5)})+'\n');
}catch(e){fs.appendFileSync(outF,JSON.stringify({err:'EXC '+e.stack})+'\n');}process.exit(0);},400);
