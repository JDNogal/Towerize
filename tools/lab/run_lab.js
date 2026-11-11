// node run_lab.js <html> <trabajos.json> <salida.jsonl>  -> corre cada trabajo del laboratorio de torres y escribe una línea JSON por resultado
const {JSDOM,VirtualConsole}=require('jsdom');const vc=new VirtualConsole();vc.on('jsdomError',()=>{});const fs=require('fs');
const [,,file,jobsF,outF]=process.argv;const jobs=jobsF==='--meta'?[]:JSON.parse(fs.readFileSync(jobsF,'utf8'));
const dom=new JSDOM(fs.readFileSync(file,'utf8'),{runScripts:'dangerously',pretendToBeVisual:true,url:'http://localhost/',virtualConsole:vc,
 beforeParse(w){const c=new Proxy({}, {get:(t,k)=>k==='measureText'?()=>({width:0}):()=>{},set:()=>true});w.matchMedia=()=>({matches:false});w.HTMLCanvasElement.prototype.getContext=()=>c;w.structuredClone=globalThis.structuredClone;
  w.Element.prototype.getBoundingClientRect=function(){return{left:0,top:0,right:900,bottom:900,width:900,height:900,x:0,y:0};};w.requestAnimationFrame=()=>0;}});
const w=dom.window,errs=[];w.addEventListener('error',e=>errs.push(e.message));
setTimeout(()=>{try{
 if(jobsF==='--meta'){console.log(w.eval(`JSON.stringify({towers:Object.keys(TW).filter(k=>!TW[k].uniq),specs:Object.fromEntries(Object.keys(SPECS).map(k=>[k,Object.keys(SPECS[k])])),names:Object.fromEntries(Object.keys(TW).map(k=>[k,TW[k].n])),specNames:Object.fromEntries(Object.keys(SPECS).flatMap(k=>Object.keys(SPECS[k]).map(s=>[s,SPECS[k][s].n]))),eras:Object.fromEntries(Object.keys(TW).map(k=>[k,TW[k].era||1])),support:Object.keys(TW).filter(k=>TW[k].support),bosses:Object.keys(ET).filter(k=>ET[k].story).map(k=>({id:k,n:ET[k].n,era:ET[k].era||1}))})`));process.exit(0);}
 w.eval(fs.readFileSync(__dirname+'/lab2.js','utf8'));
 w.eval(`OPT.hints=false;OPT.eter=false;OPT.dnum=false;OPT.u_tw=true;OPT.u_era=true;try{localStorage.setItem('rt-tutdone','1');localStorage.setItem('rt-tutchoice','skip');}catch(e){};try{INTRO.on=false;STO.intro=1;}catch(e){};for(const h in HEROES)delete HEROES[h].lockTxt;`);
 if(process.env.PATCH)w.eval(process.env.PATCH);
 for(const j of jobs){let r;try{r=w.eval(`LAB2.run(${JSON.stringify(j)})`);}catch(e){r={...j,err:e.message};}fs.appendFileSync(outF,JSON.stringify(r)+'\n');}
 if(errs.length)fs.appendFileSync(outF,JSON.stringify({errs:errs.slice(0,5)})+'\n');
}catch(e){fs.appendFileSync(outF,JSON.stringify({err:'EXC '+e.stack})+'\n');}process.exit(0);},400);
