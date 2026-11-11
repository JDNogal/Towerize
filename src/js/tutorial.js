// ==================== TUTORIAL COMPLETO ====================
// Partida guionizada de 10 rondas: el guion controla lo que se ofrece (piezas, torres, oleadas) y el jugador siempre elige.
let TUTON=false,TUTR=0,TUTHS={};
const TUTP={1:['Recta','Esquina','Arco'],2:['Esquina','Arco','Recta'],3:['Bifurcación','Serpiente','Esquina'],4:['Cruce','Valle','Recta'],5:['Bifurcación','Anillo','Esquina'],6:['Bifurcación','Cruce','Abanico'],7:['Serpiente','Bifurcación','Arco'],8:['Cruce','Anillo','Esquina'],9:['Valle','Bifurcación','Abanico'],10:['Recta','Esquina','Cruce']};
const TUTW={1:['patrol'],2:['patrol','patrol'],3:['patrol','squad'],4:['squad','squad'],5:['vanguard','vanguard'],6:['squad','vanguard','squad'],7:['tsling','patrol','tsling'],8:['vanguard','tsling','squad','tsling'],9:['vanguard','tsling','vanguard','tsling'],10:['vanguard','tsling','squad','vanguard','tsling']};
const adjPath=(p,x,y)=>D.some(([a,b])=>p[y+b]&&p[y+b][x+a]==='.');
function tutDeal(){const r=S.round,names=TUTP[r]||['Recta','Esquina'];let any=null,best=null;S.offers=[];
 for(let t=0;t<80;t++){const of=names.map((n,i)=>{const P0=PIECES.find(p=>p.n===n),o={n,p:P0.p,b:[]};solarize(o,0,1);decorate(o);
   if(r===2){/* v307: piezas distintas, cada una con una casilla especial distinta en el solar más céntrico */const cs=[];o.p.forEach((row,y)=>[...row].forEach((ch,x)=>{if(ch==='S')cs.push([x,y]);}));cs.sort((a,b)=>(Math.abs(a[0]-3)+Math.abs(a[1]-3))-(Math.abs(b[0]-3)+Math.abs(b[1]-3)));if(cs[0])o.b.push({x:cs[0][0],y:cs[0][1],k:['pow','spd','rng'][i]});}
   else if(r===4&&i===2){}
   else if(r>=3){/* desde la ronda 3, todas con casilla especial (así la pieza que llega al santuario permite la ofrenda) */const cs=[];o.p.forEach((row,y)=>[...row].forEach((ch,x)=>{if(ch==='S')cs.push([x,y]);}));const c=cs[Math.floor(Math.random()*cs.length)];o.b.push({x:c[0],y:c[1],k:['pow','spd','rng'][Math.floor(Math.random()*3)]});}
   for(let k=Math.floor(Math.random()*4);k>0;k--)rotO(o);return o;});
  if(of.every(anyPlace)){const sk=r>=5&&r<=8?Object.keys(S.evts).find(k=>S.evts[k]==='shrine'):null;
   if(!sk){S.offers=of;break;}
   // puntuación: lo cerca del Santuario que puede quedar cada pieza con la rotación que se ofrece; se queda con el mejor de varios intentos
   const[sx,sy]=sk.split(',').map(Number),sc=of.reduce((a,o)=>{let b=99;for(let by=0;by<BN;by++)for(let bx=0;bx<BN;bx++)if(check(bx,by,o.p)===0)b=Math.min(b,Math.abs(bx-sx)+Math.abs(by-sy));return a+b;},0);
   if(!best||sc<best.sc)best={of,sc};if(t>=24)break;continue;}
  if(!any&&of.some(anyPlace))any=of;}
 if(best)S.offers=best.of;
 if(!S.offers.length||!S.offers.every(anyPlace)){if(!any)return false;S.offers=any;}
 if(r===2&&!S.tut.gift){S.tut.gift=1;S.gold+=BFC;}
 if(r>=3){const okI=S.offers.map((o,i)=>i).filter(i=>anyPlace(S.offers[i]));if(okI.length&&S.offers.every(o=>pcost(o)))S.offers[okI[Math.floor(Math.random()*okI.length)]].b=[];for(const o of S.offers)while(o.b.length&&pcost(o)>S.gold)o.b.pop();}
 S.offers.forEach(o=>{see('pc',o.n);o.b.forEach(b=>see('bf',bkey(b.k)));});return true;}

