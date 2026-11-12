// ---- héroes ----
// base: estadísticas de Nv 1 (rango en casillas). Por nivel: +12% vida, +10% daño y +apLv de armadura. w = unidades que cuenta al bloquear (cuerpo a cuerpo 2, a distancia 1).
const HLMAX=10,HMELEE=.5,QR=5*K,HREZ=10;
const HEROES={
 reinhart:{n:'Reinhart',ic:'⚔️',col:'#b8c4dd',ranged:false,w:2,spd:1.6,apLv:1,base:{hp:120,ap:20,dmg:9,cd:1,range:0},relic:'barricade',role:'Paladín',tags:['Cuerpo a cuerpo','Aguante','Físico'],d:'Un soldado pesado al estilo de un paladín. Aguanta en primera línea y detiene a los enemigos duros.'},
 sylvana:{n:'Sylvana',ic:'🌿',col:'#7ad06a',ranged:true,w:1,spd:2.2,apLv:.5,base:{hp:50,ap:0,dmg:7,cd:.5,range:3.5},relic:'quiver',role:'Cazadora',tags:['A distancia','Disparo rápido','Físico'],d:'Dispara desde lejos con muchos disparos rápidos. Si un enemigo la alcanza, bloquea cuerpo a cuerpo pero hace menos daño: conviene retirarla.'},
 radagast:{n:'Radagast',ic:'🧙',col:'#8a74e0',ranged:true,w:1,spd:1.7,apLv:.5,dt:'magic',area:.6,base:{hp:45,ap:0,dmg:12,cd:1,range:3},relic:'tome',role:'Mago',tags:['A distancia','Área','Mágico'],d:'Lanza orbes arcanos de daño mágico que ignoran la armadura y salpican a los enemigos cercanos. Más lento que Sylvana, pero mejor contra grupos y enemigos acorazados.'},
 yrsa:{n:'Yrsa',ic:'💠',col:'#d07a9a',ranged:false,w:2,spd:2,apLv:1,dt:'elem',late:1,base:{hp:90,ap:10,dmg:8,cd:.8,range:0},relic:'balance',role:'Elementalista',tags:['Cuerpo a cuerpo','Control','Elemental'],d:'Una elementalista que pelea en primera línea alternando golpes de fuego y de hielo. Lo que ella bloquea está parado, así que recibe todo el daño de su hipotermia.'}};
const HFX={yrsa:src=>'Alterna golpes: 🔥 aplica 2 stacks de '+kw('burn','Quemadura',src)+'; ❄ aplica 2 stacks de '+kw('chill','Hipotermia',src)};
const hsAt=(id,l)=>{const D=HEROES[id],b=D.base;return{hp:b.hp*Math.pow(1.12,l-1),dmg:b.dmg*Math.pow(1.1,l-1),ap:b.ap+D.apLv*(l-1),cd:b.cd,range:b.range*K,rez:HREZ};};
// experiencia por nivel, según la duración de la partida (la experiencia que hay en cada ronda es la misma en partidas cortas y largas):
// Nv 2-4 rápidos; un héroe sin usar llega al Nv 8 hacia el 60 % de la partida y no llega al Nv 10; usándolo bien, la definitiva llega en las últimas rondas.
const XPDEF=[0,0,20,25,31,67,127,238,448,2068,6611];
function xpTable(n){try{let cum=0;const c=[];for(let R=1;R<=n;R++){let x=0;for(const sq of waveSquads(R)){const m=sqM(sq);for(const t in m)for(let k=0;k<m[t];k++){const u=promote(t,R);x+=Math.max(1,((ET[u]&&ET[u].xp)||1)*.4);}}cum+=x;c.push(cum);}
 const at=r=>c[Math.max(0,Math.min(n,Math.round(r))-1)],L4=76,L8=Math.max(L4*2,at(n*.58)*.6),L10=Math.max(L8*1.6,at(n*.92)*.6),C=[0,0,20,45,76];
 for(let l=5;l<=8;l++)C[l]=L4*Math.pow(L8/L4,(l-4)/4);C[9]=Math.sqrt(L8*L10);C[10]=L10;
 const T=[0,0];for(let l=2;l<=10;l++)T[l]=Math.max(T[l-1]||0,Math.round(C[l]-(C[l-1]||0)));return T;}catch(e){return XPDEF.slice();}}
const xpNeed=l=>{const T=(typeof S!=='undefined'&&S&&S.xpT)||XPDEF;return T[Math.max(2,Math.min(10,l))]||XPDEF[l];};
const RELARM=()=>S&&S.relics&&rp('barricade')?10:0;
const unitTs=s=>s.list.filter(t=>t.sd).concat(s.list.filter(t=>t.pigT&&!t.pigT.off).map(t=>t.pigT)).concat(s.mecha&&s.mecha.on?[s.mecha.on]:[]).concat(s.hero?[s.hero.pt]:[]).concat(s.merc?[s.merc]:[]).concat(s.ally?[s.ally]:[]).concat(s.summ||[]),unitTowers=()=>unitTs(S);
const unitOf=t=>{if(t.uov)return t.uov;if(!t.hero)return TW[t.type].unit;const x=hsAt(t.hero.id,t.hero.lvl);return{n:1,hp:x.hp,ap:x.ap,rez:x.rez,spd:t.hero.def.spd*K};};
let HLV={};try{HLV=JSON.parse(localStorage.getItem('rt-hlv'))||{};}catch(e){}
const hlvOk=(id,l)=>UNLOCK_ALL||l<=1||(HLV[id]||1)>=l;
function giveXp(H,x){if(H.lvl>=HLMAX||!(x>0))return;if(S&&S.st)S.st.xp=(S.st.xp||0)+x;H.xp+=x;H.xpT=performance.now();let up=0;
 while(H.lvl<HLMAX&&H.xp>=xpNeed(H.lvl+1)){H.xp-=xpNeed(H.lvl+1);H.lvl++;up=1;}
 if(H.lvl>=HLMAX)H.xp=0;
 if(up)H.lvT=performance.now();
 if(up&&!S.pvE&&!S.pvH&&H.lvl>(HLV[H.id]||1)){HLV[H.id]=H.lvl;try{localStorage.setItem('rt-hlv',JSON.stringify(HLV));}catch(e){}}
 if(up){const m=hsAt(H.id,H.lvl).hp*heroHpM(),q=H.s,dd=m-q.max;q.max=m;if(q.hp>0)q.hp+=dd;S.fx.push({x:q.x,y:q.y,t:.8,m:.8,r:2*K,col:'#ffe27a'});S.msg=H.def.n+' sube a Nv '+H.lvl+'.';}}
function mkHero(id){const D=HEROES[id],H={id,def:D,lvl:1,xp:0},st=hsAt(id,1);
 let b=null,bd=1e9;for(let y=0;y<N;y++)for(let x=0;x<N;x++){if(S.cells[y][x]!==2||(x===S.core.x&&y===S.core.y))continue;const d=Math.hypot(x-S.core.x,y-S.core.y);if(d<bd){bd=d;b={x,y};}}
 b=b||{x:S.core.x,y:S.core.y};
 H.pt={hero:H,type:'hero',x:S.core.x,y:S.core.y,flag:{x:b.x,y:b.y},ab:{},acd:{},sd:[],alert:HEROES[id]&&!HEROES[id].ranged?3*K:undefined};/* cuerpo a cuerpo: va a por los enemigos desde algo más lejos (2,75 casillas en vez de 2) */
 H.s={i:0,x:b.x,y:b.y,hp:st.hp,max:st.hp,en:null,cd:0,rt:0,tw:H.pt,lock:false,fight:false,H};H.pt.sd.push(H.s);S.hero=H;}
