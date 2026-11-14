// v304 · Portal en medio solo donde una pieza une dos extremos del camino (no en los bucles que ya trae una pieza) (jsdom)
const {JSDOM}=require('jsdom');const fs=require('fs');
const dom=new JSDOM(fs.readFileSync(process.argv[2],'utf8'),{runScripts:'dangerously',pretendToBeVisual:true,url:'http://localhost/',
 beforeParse(w){const c=new Proxy({}, {get:(t,k)=>k==='measureText'?()=>({width:0}):()=>{},set:()=>true});w.matchMedia=()=>({matches:false});w.HTMLCanvasElement.prototype.getContext=()=>c;w.structuredClone=globalThis.structuredClone;
 w.Element.prototype.getBoundingClientRect=function(){return{left:0,top:0,right:900,bottom:900,width:900,height:900,x:0,y:0};};}});
const w=dom.window;
setTimeout(()=>{let r;try{r=w.eval(`(()=>{const o={};TUTON=false;ERA=1;MR=15;startGame(15);chooseHero('reinhart');if(DLG.on)dlgEnd();RL.open=false;
 const reset=()=>{for(let y=0;y<NC;y++)for(let x=0;x<NC;x++)S.cc[y][x]=3;for(let y=0;y<N;y++)for(let x=0;x<N;x++)S.cells[y][x]=3;S.blocks={};S.joins=[];S.chests={};S.evts={};S.mim=null;S.af={};};
 const G=['#######','#######','#######','#######','#######','#######','#######'];
 const pc=(rows)=>rows.map(r=>r.split(''));
 // dibujo de Nogal: núcleo en (2,2); brazos arriba y abajo que acaban en el hueco (0,2)
 reset();
 stamp(2,2,pc(['#######','#######','#######','...C...','#######','#######','#######']),[]);
 stamp(1,2,pc(['###.###','###.###','###.###','###....','###.###','###.###','###.###']),[]);
 /* v329: las piezas solo se unen por las salidas (centro de cada lado) */stamp(1,1,pc(['#######','#######','#######','....###','###.###','###.###','###.###']),[]);
 stamp(0,1,pc(['#######','#######','#######','###....','###.###','###.###','###.###']),[]);
 stamp(1,3,pc(['###.###','###.###','###.###','....###','#######','#######','#######']),[]);
 stamp(0,3,pc(['###.###','###.###','###.###','###....','#######','#######','#######']),[]);
 S.offers=[{p:pc(['###.###','###.###','###.###','###.###','###.###','###.###','###.###']),b:[],free:1}];S.pi=0;S.round=3;
 o.joinN=joinsAt(0,2)===0;placePiece(0,2);o.joined=S.joins.includes('0,2');o.mid=S.ends.some(e=>e.mid&&Math.floor(e.x/K/P)===0);
 // v305 · mismo cierre en la ronda del jefe final: un solo portal (el de en medio) y el jefe sale de ahí
 reset();
 stamp(2,2,pc(['#######','#######','#######','...C...','#######','#######','#######']),[]);
 stamp(1,2,pc(['###.###','###.###','###.###','###....','###.###','###.###','###.###']),[]);
 /* v329: las piezas solo se unen por las salidas (centro de cada lado) */stamp(1,1,pc(['#######','#######','#######','....###','###.###','###.###','###.###']),[]);
 stamp(0,1,pc(['#######','#######','#######','###....','###.###','###.###','###.###']),[]);
 stamp(1,3,pc(['###.###','###.###','###.###','....###','#######','#######','#######']),[]);
 stamp(0,3,pc(['###.###','###.###','###.###','###....','#######','#######','#######']),[]);
 S.offers=[{p:pc(['###.###','###.###','###.###','###.###','###.###','###.###','###.###']),b:[],free:1}];S.pi=0;S.round=ROUNDS;
 placePiece(0,2);o.bossInMid=S.portals.some(q=>q.x===S.ends.find(e=>e.mid).x&&q.y===S.ends.find(e=>e.mid).y&&Object.keys(q.plan).filter(t=>q.plan[t]).length>3)&&S.portals.some(q=>Object.keys(q.plan).some(t=>q.plan[t]&&(t==='boss'||(ET[t]&&ET[t].story))));
 // anillo en una sola pieza pegado al núcleo, con una salida libre: sin portal en medio
 reset();
 stamp(2,2,pc(['#######','#######','#######','...C###','#######','#######','#######']),[]);
 S.offers=[{p:pc(['###.###','#.....#','#.###.#','#.###..','#.###.#','#.....#','#######']),b:[],free:1}];S.pi=0;S.round=3;
 placePiece(1,2);o.ringNoJoin=!S.joins.length;o.ringNoMid=!S.ends.some(e=>e.mid);o.ringEnds=S.ends.length;
 return o;})()`);}catch(e){console.log('EXC '+e.stack);process.exit(1);}
 console.log(JSON.stringify(r));const bad=Object.entries(r).filter(([k,v])=>v===false).map(([k])=>k);if(bad.length){console.log('FALLOS '+bad.join(', '));process.exit(1);}console.log('ok');process.exit(0);},400);
