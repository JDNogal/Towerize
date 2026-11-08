const OUT=require('path').join(__dirname,'out');require('fs').mkdirSync(OUT,{recursive:true});
const {JSDOM}=require('jsdom');const fs=require('fs');
const dom=new JSDOM(fs.readFileSync(process.argv[2],'utf8'),{runScripts:'dangerously',pretendToBeVisual:true,url:'http://localhost/',
 beforeParse(w){const c=new Proxy({}, {get:(t,k)=>k==='measureText'?()=>({width:0}):()=>{},set:()=>true});w.matchMedia=()=>({matches:false});w.HTMLCanvasElement.prototype.getContext=()=>c;w.structuredClone=globalThis.structuredClone;
 w.Element.prototype.getBoundingClientRect=function(){return{left:0,top:0,right:900,bottom:900,width:900,height:900,x:0,y:0};};}});
const w=dom.window;const E=s=>w.eval(s);
setTimeout(()=>{console.log(E(`(()=>{const o=[];startGame(15);chooseHero('sylvana');for(let pi=0;pi<3;pi++){S.pi=pi;const of=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,of.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(of);}if(ok)break;}startWave();for(let i=0;i<100;i++)update(.05);
 toggleComp(true);const tabs=[...document.querySelectorAll('#comp [data-a]')].map(b=>b.dataset.a+':'+(b.dataset.v||b.dataset.t||'')).filter(x=>x.startsWith('ctab')||x.startsWith('tab'));o.push('tabs '+tabs.join(','));
 for(const t of ['tw','hr','pc','bf','rl','en','ev','lg']){try{CP.tab=t;renderComp();o.push(t+' ok');}catch(e){o.push(t+' ERR '+e.stack.split('\\n').slice(0,3).join(' | '));}}
 for(const k of Object.keys(TW).filter(k=>TW[k].uniq))for(let l=1;l<=4;l++){try{CP.tab='tw';CP.ulv={[k]:l};renderComp();}catch(e){o.push('ulv '+k+l+' ERR '+e.message);}}
 return o.join('\\n');})()`));process.exit(0);},400);
