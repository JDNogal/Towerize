// ==================== HABILIDADES DE HÉROE ====================
// b = activa básica (desde el inicio), p4 = pasiva de Nv 4, p8 = pasiva de Nv 8 (mejora la básica), u = ultimate (Nv 10). Las activas solo en combate y con el héroe vivo.
const HBCD=20,HUCD=90,HDUR={yrsa:{b:'1,5 s (congelación)',p8:'3 s (charco)',u:'1,5 s (congelación)'},reinhart:{b:'15 s',u:'2 s (aturdimiento)'},sylvana:{b:'4 s',p4:'4 s (presa)',u:'25 s'},radagast:{b:'1,5 s hasta explotar',u:'6 s'}};
const HAB={
 reinhart:{b:{n:'Llamada a las armas',ic:'📯',t:()=>'Eliges un punto del camino: 2 soldados bloquean y luchan <b>15 s</b>.'},
  p4:{n:'Provocación',ic:'🛡️',t:()=>'<span class="kw" data-kw="eblk" data-src="">Corpulencia 3</span> (bloquea hasta 3 enemigos) y <span class="chp">−15% de daño recibido</span>.'},
  p8:{n:'Veteranos',ic:'⚜️',t:()=>'Llamada a las armas invoca soldados pesados: más vida, daño y armadura.'},
  u:{n:'Carga Heroica',ic:'⚔️',t:()=>'Carga hasta un punto sin recibir daño: <span class="cd">300% de su daño</span> a lo que atraviesa y a 1,5 casillas, los empuja y los <span class="kw" data-kw="stun" data-src="">aturde</span> <b>2 s</b> (jefes, 1 s).'}},
 sylvana:{b:{n:'Hiedra enredadora',ic:'🌿',t:()=>`Una zona de hiedra (1,5 casillas) deja ${kw('root','enredados','')} <b>4 s</b> a los enemigos: no se mueven, pero atacan.`},
  p4:{n:'Halcón de caza',ic:'🦅',t:()=>`Cada 6 s, un halcón golpea al enemigo con más vida cerca de Sylvana y lo marca como ${kw('prey','presa','')} <b>4 s</b>.`},
  p8:{n:'Hiedra venenosa',ic:'☘️',t:()=>`La hiedra además ${kw('poison','envenena','')} cada segundo.`},
  u:{n:'Llamada salvaje',ic:'🐾',t:()=>'Invoca <b>25 s</b> una bestia al azar: 🐻 oso (aguanta y bloquea a 3), 🐺 huargo (rápido) o 🐆 pantera (caza la retaguardia).'}},
 yrsa:{b:{n:'Prisión de hielo',ic:'🥶',t:()=>`${kw('freeze','Congela','')} <b>1,5 s</b> a los enemigos a 1,2 casillas (a los jefes los ${kw('slow','ralentiza','')} 50%).`},
  p4:{n:'Combustión lenta',ic:'🌡️',t:()=>`Los enemigos ralentizados o parados reciben <span class="cbu">+50% de stacks</span> de ${kw('burn','quemadura','')}.`},
  p8:{n:'Piroescarcha',ic:'♨️',t:()=>`Al romperse la prisión, deja fuego <b>3 s</b> (1,2 casillas) que aplica ${kw('burn','quemadura','')}.`},
  u:{n:'Cataclismo',ic:'🌠',t:()=>`Meteoro: <span class="cd">300% de su daño</span> a 1,5 casillas, 10 de ${kw('burn','quemadura','')} y fuego <b>4 s</b>. Luego, onda de hielo: ${kw('freeze','congela','')} <b>1,5 s</b> y 5 de ${kw('chill','hipotermia','')}.`}},
 radagast:{b:{n:'Runa arcana',ic:'🔯',t:()=>'Una runa explota a los <b>1,5 s</b> con <span class="cmg">daño mágico</span> en área (1,2 casillas).'},
  p4:{n:'Orbe sobrecargado',ic:'🔮',t:()=>'Cada 4.º orbe va sobrecargado: <span class="cd">doble de daño</span> y doble de área.'},
  p8:{n:'Pulso arcano',ic:'🌀',t:()=>'Antes de explotar, la runa atrae a los enemigos (2,4 casillas) hacia su centro (los jefes, la mitad).'},
  u:{n:'Tormenta arcana',ic:'⛈️',t:()=>'Tormenta de <b>6 s</b> (3 casillas) que lanza rayos de <span class="cmg">daño mágico</span> con un poco de área sobre los enemigos de dentro.'}}};
const BEASTS={bear:{n:'Oso pardo',ic:'🐻',col:'#8a5a3a',hp:2.6,d:1.2,r:1,w:3,ap:25,sp:1},wolf:{n:'Huargo plateado',ic:'🐺',col:'#b8c0cc',hp:1.4,d:1,r:1.7,w:1,ap:10,sp:2.2,al:3.2},panther:{n:'Pantera de sombra',ic:'🐆',col:'#3a3448',hp:1.1,d:2.4,r:1,w:1,ap:5,sp:2.2,al:4.2,pref:1}};
const hdm=()=>stats(S.hero.pt).dmg;
const habOk=k=>{const H=S.hero;if(!H)return 'Sin héroe';if(k==='u'&&H.lvl<10)return 'Se desbloquea a Nv 10';if(S.phase!=='wave')return 'Solo durante la oleada';if(H.s.hp<=0)return 'Tu héroe está caído';const cd=k==='u'?H.ucd:H.bcd;if(cd>0)return 'Enfriamiento: '+Math.ceil(cd)+' s';return '';};
function startHab(k){const why=habOk(k);errAt('#mbr [data-a="'+(k==='u'?'hult':'hab')+'"]');if(S.aim==='hab'+k){S.aim=null;S.msg='';ui();renderRelics();return;}if(why){S.msg=HAB[S.hero.id][k].n+': '+why.toLowerCase()+'.';ui();return;}
 if(S.aim){S.msg='Primero termina o cancela la acción en curso.';ui();return;}closePrim();S.aim='hab'+k;S.msg=HAB[S.hero.id][k].n+': elige un punto del camino (Esc o el mismo botón para cancelar).';ui();renderRelics();}
const pathNear=(x,y)=>{let b=null,bd=1e9;for(let j=-2;j<=2;j++)for(let i=-2;i<=2;i++){const cx=Math.round(x)+i,cy=Math.round(y)+j;if(inb(cx,cy)&&S.cells[cy][cx]===2){const d=Math.hypot(cx-x,cy-y);if(d<bd){bd=d;b={x:cx,y:cy};}}}return b;};
function mkSummon(c,kind){const H=S.hero,x=hsAt(H.id,H.lvl);let t;
 if(kind==='sold'){const hv=H.lvl>=8;t={type:'bastion',lvl:hv?3:1,summ:1,ttl:15,x:c.x,y:c.y,cells:[],flag:{x:c.x,y:c.y},ab:{},acd:{},sd:[],xap:hv?15:0};const hp=sdHp(t)*(hv?1.3:1);t.sd=[0,1].map(i=>({i,x:c.x,y:c.y,hp,max:hp,en:null,cd:0,rt:0,tw:t,lock:false,fight:false}));}
 else{const B=BEASTS[kind],dm=hdm();t={type:'bastion',lvl:1,summ:1,beast:kind,ttl:25,x:c.x,y:c.y,cells:[],flag:{x:c.x,y:c.y},ab:{},acd:{},sd:[],xap:B.ap-10,alert:B.al?B.al*K:0,uspdx:B.sp,ovr:{dmg:dm*B.d,rate:B.r,range:2.5*K,crit:.1,critm:2,area:0,gold:0,pen:0}};
  const hp=x.hp*B.hp;t.sd=[{i:0,x:c.x,y:c.y,hp,max:hp,en:null,cd:0,rt:0,tw:t,lock:false,fight:false,wt:B.w,pref:B.pref,beast:kind}];}
 (S.summ=S.summ||[]).push(t);S.fx.push({x:c.x,y:c.y,t:.6,m:.6,r:1.4*K,col:kind==='sold'?'#cfe0ff':'#9be07a'});}
function castHab(c,k){const H=S.hero,id=H.id;let p=pathNear(c.x,c.y);
 if(!p){S.msg='Elige un punto del camino.';ui();return;}
 if(k==='b'){
  if(id==='reinhart')mkSummon(p,'sold');
  if(id==='yrsa'){yrsaIce(p,1.2*K);(S.ice=S.ice||[]).push({x:p.x,y:p.y,r:1.2*K,t:1.5,fire:H.lvl>=8});}
  if(id==='sylvana')(S.ivy=S.ivy||[]).push({x:p.x,y:p.y,r:1.5*K,t:4,pk:1,poison:H.lvl>=8});
  if(id==='radagast'){const pull=H.lvl>=8?S.enemies.filter(e=>e.hp>0&&Math.hypot(e.x-p.x,e.y-p.y)<=2.4*K):null;if(H.lvl>=8){for(const e of S.enemies){if(e.hp<=0)continue;const d=Math.hypot(e.x-p.x,e.y-p.y);if(d>2.4*K||d<.5)continue;const mv=Math.min(d,1.6*K*(isBoss(e)?.5:1)),q=pathNear(e.x+(p.x-e.x)/d*mv,e.y+(p.y-e.y)/d*mv);if(q){e.x=e.tx=q.x;e.y=e.ty=q.y;}}S.fx.push({x:p.x,y:p.y,t:.5,m:.5,r:2.4*K,col:'#8a6cff'});}
   (S.runes=S.runes||[]).push({x:p.x,y:p.y,r:1.2*K,t:1.5,m:1.5,pull});}
  H.bcd=HBCD;if(S.st)S.st.habB=(S.st.habB||0)+1;}
 else{
  if(id==='reinhart'){let nb=0;const q=H.s,x0=q.x,y0=q.y,dm=hdm()*3,L=Math.hypot(p.x-x0,p.y-y0)||1;
   for(const e of S.enemies){if(e.hp<=0)continue;const t2=Math.max(0,Math.min(1,((e.x-x0)*(p.x-x0)+(e.y-y0)*(p.y-y0))/(L*L))),dl=Math.hypot(e.x-(x0+(p.x-x0)*t2),e.y-(y0+(p.y-y0)*t2));
    if(dl<=K||Math.hypot(e.x-p.x,e.y-p.y)<=1.5*K){hurt(e,dm,H.pt,'phys');stunE(e,2);knock(e,1.2*K);nb++;}}if(!S.tut)recBest('bowl',nb);if(nb>=8&&!S.tut)achieve('bowl');
   H.chg={x0,y0,x1:p.x,y1:p.y,t:0};setFlag(H.pt,p);S.fx.push({x:p.x,y:p.y,t:.6,m:.6,r:1.5*K,col:'#ffd75a'});}
  if(id==='sylvana'){const ks=Object.keys(BEASTS),kd=ks[Math.floor(Math.random()*ks.length)];mkSummon(p,kd);S.msg='Llamada salvaje: '+BEASTS[kd].ic+' '+BEASTS[kd].n+'.';}
  if(id==='radagast')S.storm={x:p.x,y:p.y,r:3*K,t:6,tk:0};
  if(id==='yrsa'){const dm=hdm()*3;for(const e of S.enemies)if(e.hp>0&&Math.hypot(e.x-p.x,e.y-p.y)<=1.5*K){hurt(e,dm,H.pt,'elem');if(e.hp>0)addBurn(e,H.pt,10);}S.pools.push({x:p.x,y:p.y,t:4,n:2,tk:0,src:H.pt,r:1.2*K,el:'fire'});S.fx.push({x:p.x,y:p.y,t:.6,m:.6,r:1.5*K,col:'#ff6a2e'});S.cata={x:p.x,y:p.y,t:1,m:1};}
  H.ucd=HUCD;if(S.st)S.st.habU=(S.st.habU||0)+1;}
 S.aim=null;if(k==='b'||id!=='sylvana')S.msg='';ui();renderRelics();}
function yrsaIce(p,r,ch){for(const e of S.enemies){if(e.hp<=0||Math.hypot(e.x-p.x,e.y-p.y)>r)continue;if(isBoss(e))slowE(e,.5,1.5);else freezeE(e,1.5);if(ch)addChill(e,S.hero.pt,ch);}S.fx.push({x:p.x,y:p.y,t:.5,m:.5,r,col:'#9fe4ff'});}
function heroAbTick(dt){const H=S.hero;if(!H)return;
 for(const z of S.ice||[]){z.t-=dt;if(z.t<=0&&z.fire)S.pools.push({x:z.x,y:z.y,t:3,n:2,tk:0,src:H.pt,r:z.r,el:'fire'});}S.ice=(S.ice||[]).filter(z=>z.t>0);
 if(S.cata){S.cata.t-=dt;if(S.cata.t<=0){yrsaIce(S.cata,1.5*K,5);S.cata=null;}}H.bcd=Math.max(0,(H.bcd||0)-dt);H.ucd=Math.max(0,(H.ucd||0)-dt);if(H.inv>0)H.inv-=dt;
 if(H.chg){const c=H.chg;c.t+=dt/.35;const k=Math.min(1,c.t);H.s.x=c.x0+(c.x1-c.x0)*k;H.s.y=c.y0+(c.y1-c.y0)*k;H.inv=.2;if(k>=1)H.chg=null;}
 specTick(dt);
 if(S.summ&&S.summ.length){for(const t of S.summ)t.ttl-=dt;S.summ=S.summ.filter(t=>t.ttl>0&&t.sd.some(s=>s.hp>0));}
 for(const z of S.ivy||[]){z.t-=dt;z.pk-=dt;const tick=z.pk<=0;if(tick)z.pk+=1;for(const e of S.enemies){if(e.hp<=0||isFly(e)||Math.hypot(e.x-z.x,e.y-z.y)>z.r)continue;if(!isBoss(e)||z.t>2)e.fx.root={t:.15};if(tick&&z.poison)addPois(e,1+Math.floor(H.lvl/3),H.pt,0);}}
 S.ivy=(S.ivy||[]).filter(z=>z.t>0);
 for(const r of S.runes||[]){r.t-=dt;if(r.t<=0){const dm=hdm()*2.2;for(const e of S.enemies)if(e.hp>0&&Math.hypot(e.x-r.x,e.y-r.y)<=r.r)hurt(e,dm,H.pt,'magic');if(r.pull&&!S.tut){const kd=r.pull.filter(e=>!(e.hp>0)).length;if(kd===r.pull.length)recBest('bhole',kd);}if(r.pull&&r.pull.length>=10&&r.pull.every(e=>!(e.hp>0))&&!S.tut)achieve('bhole');S.fx.push({x:r.x,y:r.y,t:.45,m:.45,r:r.r,col:'#b38cff'});}}
 S.runes=(S.runes||[]).filter(r=>r.t>0);
 if(S.storm){const s=S.storm;s.t-=dt;s.tk-=dt;while(s.tk<=0&&s.t>0){s.tk+=.35;const c=S.enemies.filter(e=>e.hp>0&&Math.hypot(e.x-s.x,e.y-s.y)<=s.r);if(!c.length)break;const e=c[Math.floor(Math.random()*c.length)],dm=hdm()*1.5;hurt(e,dm,H.pt,'magic');for(const o of S.enemies)if(o!==e&&o.hp>0&&Math.hypot(o.x-e.x,o.y-e.y)<=.6*K)hurt(o,dm*.5,H.pt,'magic');S.fx.push({bolt:[[e.x,e.y-6*K],[e.x,e.y]],t:.18,m:.18,big:1});}if(s.t<=0)S.storm=null;}
 if(H.id==='sylvana'&&H.lvl>=4&&H.s.hp>0){H.hk=(H.hk===undefined?2:H.hk)-dt;if(H.hk<=0){let b=null;for(const e of S.enemies)if(e.hp>0&&Math.hypot(e.x-H.s.x,e.y-H.s.y)<=5*K&&(!b||e.hp>b.hp))b=e;if(b){H.hk=6;hurt(b,hdm()*1.2,H.pt,'phys');b.prey=4;S.hawk={x:b.x,y:b.y,t:.6};}else H.hk=.5;}}
 if(S.hawk&&(S.hawk.t-=dt)<=0)S.hawk=null;
 for(const e of S.enemies)if(e.prey>0)e.prey-=dt;}
function drawHeroAb(lw){const H=S.hero;if(!H)return;const X=v=>v*CS+CS/2;
 for(const z of S.ivy||[]){g.fillStyle='rgba(80,170,70,.22)';g.strokeStyle='rgba(110,210,90,.85)';g.lineWidth=lw(1.5);g.beginPath();g.arc(X(z.x),X(z.y),z.r*CS,0,7);g.fill();g.stroke();g.font=Math.round(CS*1.4)+'px sans-serif';g.textAlign='center';g.textBaseline='middle';for(let i=0;i<5;i++){const a=i*1.257;g.fillText(z.poison?'☘️':'🌿',X(z.x)+Math.cos(a)*z.r*CS*.6,X(z.y)+Math.sin(a)*z.r*CS*.6);}}
 for(const r of S.runes||[]){const k=1-r.t/r.m;g.strokeStyle='rgba(180,140,255,'+(.5+.5*k)+')';g.lineWidth=lw(2.5);g.beginPath();g.arc(X(r.x),X(r.y),r.r*CS,0,7);g.stroke();g.fillStyle='rgba(150,110,255,.18)';g.beginPath();g.arc(X(r.x),X(r.y),r.r*CS*k,0,7);g.fill();g.font=Math.round(CS*2)+'px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('🔯',X(r.x),X(r.y));}
 if(S.storm){const s=S.storm;g.fillStyle='rgba(60,40,110,.22)';g.strokeStyle='rgba(170,140,255,.7)';g.lineWidth=lw(1.5);g.beginPath();g.arc(X(s.x),X(s.y),s.r*CS,0,7);g.fill();g.stroke();}
 for(const z of S.ice||[]){g.fillStyle='rgba(160,220,255,.25)';g.strokeStyle='rgba(190,235,255,.9)';g.lineWidth=lw(2);g.beginPath();g.arc(X(z.x),X(z.y),z.r*CS,0,7);g.fill();g.stroke();}
 if(S.cata){const k=1-S.cata.t/S.cata.m;g.font=Math.round(CS*2.4)+'px sans-serif';g.textAlign='center';g.textBaseline='middle';g.globalAlpha=Math.max(0,1-k*1.5);g.fillText('🌠',X(S.cata.x),X(S.cata.y)-(1-k)*CS*2);g.globalAlpha=1;g.strokeStyle='rgba(160,220,255,'+(.3+.6*k)+')';g.lineWidth=lw(2);g.beginPath();g.arc(X(S.cata.x),X(S.cata.y),1.5*K*CS*k,0,7);g.stroke();}
 if(S.hawk){const k=1-S.hawk.t/.6;g.font=Math.round(CS*2.2)+'px sans-serif';g.textAlign='center';g.textBaseline='middle';g.globalAlpha=1-k*.6;g.fillText('🦅',X(S.hawk.x)+(1-k)*CS*4,X(S.hawk.y)-(1-k)*CS*6);g.globalAlpha=1;}
 for(const e of S.enemies)if(e.prey>0){g.strokeStyle='rgba(255,170,60,.95)';g.lineWidth=lw(2);const r=ET[e.t].r*CS+lw(7),px=X(e.x),py=X(e.y);g.beginPath();g.moveTo(px-r,py);g.lineTo(px-r*.5,py);g.moveTo(px+r,py);g.lineTo(px+r*.5,py);g.moveTo(px,py-r);g.lineTo(px,py-r*.5);g.moveTo(px,py+r);g.lineTo(px,py+r*.5);g.stroke();}
 if(S.aim==='habb'||S.aim==='habu'){const h=S.hover;if(h&&inb(h.x,h.y)){const id=H.id,k=S.aim.slice(3),r=(k==='b'?(id==='sylvana'?1.5:id==='radagast'?(H.lvl>=8?2.4:1.2):id==='yrsa'?1.2:.8):(id==='reinhart'||id==='yrsa'?1.5:id==='radagast'?3:.8))*K;g.strokeStyle='rgba(255,215,90,.9)';g.lineWidth=lw(1.5);g.setLineDash([lw(4),lw(4)]);g.beginPath();g.arc(X(h.x),X(h.y),r*CS,0,7);g.stroke();g.setLineDash([]);
  if(id==='reinhart'&&k==='u'){g.strokeStyle='rgba(255,215,90,.6)';g.lineWidth=K*CS*.6;g.beginPath();g.moveTo(X(H.s.x),X(H.s.y));g.lineTo(X(h.x),X(h.y));g.stroke();}}}}
// ---- ¡Mecha Cerdito!: habilidad especial (no depende del héroe) con las tres casas a Nv 4 ----
const MECHCD=90,MECHT=20;
const pigHouses=()=>['brick','wood','straw'].map(k=>S.list.find(t=>t.type===k));
function mechaOk(){const h=pigHouses();if(h.some(t=>!t))return 'Necesitas las tres casas de los cerditos';if(h.some(t=>t.lvl<4))return 'Sube las tres casas a Nv 4';if(S.phase!=='wave')return 'Solo durante la oleada';const M=S.mecha;if(M&&M.on)return 'El mecha ya está en combate';if(M&&M.cd>0)return 'Enfriamiento: '+Math.ceil(M.cd)+' s';return '';}
const mechaTxt=()=>`Los tres cerditos se unen en un mecha gigante de paja, madera y ladrillo en el punto del camino que elijas, durante ${MECHT} s. Tiene mucha vida y armadura y ${kw('hblk','corpulencia 4','')}. Cada 1,5 s da un pisotón (1,3 casillas) que hace daño, ${kw('push','empuja','')} y ${kw('slow','ralentiza','')} un 30% durante 2 s. Mientras, las casas siguen disparando sin sus cerditos; al terminar, o si el mecha cae, vuelven a sus banderas. Sale listo al empezar cada oleada.`;
function mechaInfo(){const w=mechaOk();return `<div class="ttl"><b>🤖 ¡Mecha Cerdito!</b> · Habilidad especial</div><small style="margin:0">${mechaTxt()}</small>`+R('chp','Vida',PIGU.mech.hp)+R('cph',kst('aphys','Armadura',''),PIGU.mech.ap)+R('cd',kst('dmg','Daño',''),PIGU.mech.dmg+' (golpe) · '+PIGU.mech.st+' (pisotón)')+R('ccl','Enfriamiento',MECHCD+' s')+R('cr',kst('dur','Duración',''),MECHT+' s')+(w?`<small class="cr" style="margin-top:4px">${w}</small>`:'');}
function xPanel(){if(!S||!S.list)return '';const h=pigHouses();if(h.some(t=>!t))return '';const w=mechaOk(),lk=h.some(t=>t.lvl<4);
 return `<div class="xpan"><button class="hpb xpb${S.aim==='mecha'?' aim':''}${w?' off':''}${lk?' lock':''}" data-a="mecha" data-tip="xab:mecha">${lk?'<span class="hchain">⛓️</span><span class="hlck">🔒</span>':'🤖'}<span class="hcdv" data-k="m"></span></button></div>`;}
function startMecha(){if(S.aim==='mecha'){S.aim=null;S.msg='';ui();renderRelics();return;}const w=mechaOk();if(w){S.msg='¡Mecha Cerdito!: '+w.toLowerCase()+'.';ui();return;}closePrim();S.aim='mecha';S.msg='Elige un punto del camino para el ¡Mecha Cerdito!'+CANC();ui();renderRelics();}
function castMecha(c){const p=pathNear(c.x,c.y);if(!p){S.msg='Elige un punto del camino.';ui();return;}const P=PIGU.mech;
 for(const t of pigHouses())if(t&&t.pigT)t.pigT.off=1;
 const m={type:'bastion',lvl:3,summ:1,pigU:'mech',ttl:MECHT,x:p.x,y:p.y,cells:[],flag:{x:p.x,y:p.y},ab:{},acd:{},uov:{n:1,hp:P.hp,ap:P.ap,rez:0,spd:TW.bastion.unit.spd*.8},ovr:{dmg:P.dmg,rate:P.rate,range:2.5*K,crit:CRIT,critm:2,area:0,gold:0,pen:0}};
 m.sd=[{i:0,x:p.x,y:p.y,hp:P.hp,max:P.hp,en:null,cd:0,rt:0,tw:m,lock:false,fight:false,wt:4,mech:1,st:.5}];
 reveal('mech');m.kills=0;S.mecha=S.mecha||{cd:0};S.mecha.on=m;S.mecha.cd=MECHCD;S.aim=null;S.msg='';S.fx.push({x:p.x,y:p.y,t:.7,m:.7,r:2*K,col:'#e8b06a'});ui();renderRelics();}
function mechaEnd(){const M=S.mecha;if(!M||!M.on)return;M.on=null;for(const t of S.list)if(t.pigT){t.pigT.off=0;for(const s of t.pigT.sd){s.hp=s.max;s.rt=0;s.en=null;s.fight=false;s.lock=true;s.x=t.x;s.y=t.y;}}}
function mechaTick(dt){const M=S.mecha;if(!M)return;if(M.cd>0)M.cd=Math.max(0,M.cd-dt);const m=M.on;if(!m)return;m.ttl-=dt;const s=m.sd[0];
 if(m.ttl<=0||s.hp<=0){mechaEnd();return;}
 s.st-=dt;if(s.st>0)return;const R2=1.3*K,hit=S.enemies.filter(e=>e.hp>0&&Math.hypot(e.x-s.x,e.y-s.y)<=R2);if(!hit.length){s.st=.2;return;}
 s.st=1.5;for(const e of hit){hurt(e,PIGU.mech.st,m,'phys');if(e.hp>0){knock(e,.5*K);slowE(e,.3,2);}}S.fx.push({x:s.x,y:s.y,t:.35,m:.35,r:R2,col:'#e8b06a'});}
function drawMecha(lw){if(S.aim!=='mecha')return;const h=S.hover;if(!h||!inb(h.x,h.y))return;const X=v=>v*CS+CS/2;g.strokeStyle='rgba(232,176,106,.95)';g.lineWidth=lw(1.5);g.setLineDash([lw(4),lw(4)]);g.beginPath();g.arc(X(h.x),X(h.y),1.3*K*CS,0,7);g.stroke();g.setLineDash([]);}
// panel del héroe (abajo a la derecha, encima de «Empezar oleada»)
function heroPanel(){const H=S.hero;if(!H)return '';const A=HAB[H.id],lk=H.lvl<10,bw=habOk('b'),uw=habOk('u');
 return `<div class="hpan"><button class="hpb hpport fr${hTier(H.id)}${S.aim==='hero'?' aim':''}${H.s.hp<=0?' off':''}" data-a="hero" data-tip="hero:x" style="background:${H.def.col}">${portrait(H.id,1)}<span class="bdg">${H.s.hp<=0?Math.ceil(H.s.rt)+'s':H.lvl}</span>${kcap(kbN('hero'))}</button>`+
  `<button class="hpb${S.aim==='habb'?' aim':''}${bw?' off':''}" data-a="hab" data-tip="hab:b">${A.b.ic}<span class="hcdv" data-k="b"></span>${kcap(kbN('hab'))}</button>`+
  `<button class="hpb hpult${S.aim==='habu'?' aim':''}${uw?' off':''}${lk?' lock':''}" data-a="hult" data-tip="hab:u">${lk?'<span class="hchain">⛓️</span><span class="hlck">🔒</span>':A.u.ic}<span class="hcdv" data-k="u"></span>${lk?'':kcap(kbN('ult'))}</button></div>`;}
function hpanTick(){if(S&&S.list){const xs=xPanel().replace(/<span class="hcdv"[^>]*><\/span>/,'');if(xs!==hpanTick.xs){hpanTick.xs=xs;const p=document.querySelector('#mbr .xpan');if(p)p.outerHTML=xPanel();}}
 const H=S&&S.hero;if(!H)return;for(const el of document.querySelectorAll('.hcdv')){const k=el.dataset.k;if(k==='m'){const cd=S.mecha&&!S.mecha.on?S.mecha.cd||0:0;el.style.setProperty('--p',(cd>0?cd/MECHCD*360:0)+'deg');el.textContent=cd>0?Math.ceil(cd):'';continue;}const cd=k==='u'?H.ucd||0:H.bcd||0,M=k==='u'?HUCD:HBCD;el.style.setProperty('--p',(cd>0?cd/M*360:0)+'deg');el.textContent=cd>0?Math.ceil(cd):'';}
 const sg=(habOk('b')?1:0)+''+(habOk('u')?1:0)+S.aim+H.lvl+(H.s.hp>0)+(H.s.hp<=0?Math.ceil(H.s.rt):'');if(sg!==hpanTick.sg){hpanTick.sg=sg;const p=document.querySelector('#mbr .hpan');if(p)p.outerHTML=heroPanel();}}
function habInfo(k){const H=S.hero;if(!H)return '';const A=HAB[H.id][k],w=habOk(k);return `<div class="ttl"><b>${A.ic} ${A.n}</b> · ${k==='u'?'Definitiva (Nv 10)':'Activa básica'}</div><small style="margin:0">${A.t()}</small>`+R('ccl','Enfriamiento',(k==='u'?HUCD:HBCD)+' s')+((HDUR[H.id]||{})[k]?R('cr',kst('dur','Duración',''),HDUR[H.id][k]):'')+(w?`<small class="cr" style="margin-top:4px">${w}</small>`:'');}
function heroAbHtml(id,lvl){const A=HAB[id];if(!A)return '';const box=(a,tp,dk,act,need)=>lvl!=null&&lvl<need?'':`<div class="rbx ${act?'rac':'rps'}"><div class="rbt">${act?'⚡':'♾'} ${tp}<small>${(HDUR[id]||{})[dk]?'⏱ '+HDUR[id][dk]:''}</small></div><b>${a.ic} ${a.n}</b> · ${a.t()}</div>`;
 return `<div class="esec" style="margin-top:12px">Habilidades</div>`+box(A.b,'Activa','b',1,1)+box(A.p4,'Pasiva · Nv 4','p4',0,4)+box(A.p8,'Pasiva · Nv 8','p8',0,8)+box(A.u,'Definitiva · Nv 10','u',1,10)+(lvl==null?'<small>Las activas solo se usan durante la oleada y con el héroe vivo.</small>':'');}
function startTut(){SEEOK=true;saveClear();TUTON=true;TUTR=0;TUTHS={};ROUNDS=10;CHESTS=2;setSize(5);$('menu').classList.remove('setup');
 if(TOUCH&&OPT.fs)enterFS();lbClose(false);document.body.classList.remove('inmenu');$('endscr').classList.remove('open');init();}
function lockSquares(bk){if(!bk)return[];const[bx,by]=bk.split(',').map(Number),o=[];for(let j=0;j<P;j++)for(let i=0;i<P;i++){const kx=bx*P+i,ky=by*P+j;if(S.cc[ky][kx]!==1)continue;const q={kx,ky,x:kx*K+1,y:ky*K+1};if(S.buff[q.y]&&S.buff[q.y][q.x]&&!S.occ[q.x+','+q.y])o.push(q);}return o;}
// tutorial, ronda 2: se recomienda construir en la casilla especial, pero nunca deja al jugador sin poder construir:
// la primera vez que intenta otro solar, avisa; si insiste (mismo solar), construye ahí. Al empezar la oleada se quita.
function tutLockBlock(x,y){const T=S&&S.tut;if(!T||!T.lock||T.lock.some(l=>l.x===x&&l.y===y))return false;
 if(T.lockAsk===x+','+y){T.lock=null;T.lockAsk=null;return false;}
 T.lockAsk=x+','+y;S.msg='Te recomendamos la casilla especial resaltada. Pulsa otra vez este solar para construir aquí de todos modos.';ui();return true;}
function tutOffer(list,title,txt,present){S.tut.off={list,title,txt,present:!!present};}
function tutPhase(ph){if(!S||!S.tut)return;const r=S.round,T=S.tut;
 if(ph==='place'){
  if(r===1)hint('tut_welcome','Bienvenido a Towerize',[['Defiende tu <span class="kw" data-kw="g_core" data-src="">núcleo</span>: si un enemigo llega a él, pierdes vida.',()=>tgCell(S.core.x,S.core.y,1.2)()],['Cada ronda eliges una <span class="kw" data-kw="g_piece" data-src="">pieza</span> de abajo para alargar el camino. Puedes girarla antes de colocarla.',tgEl('#ui [data-a="pick"]')]]);
  if(r===2)hint('tut_tiles','Casillas especiales',[['Estas piezas traen una <span class="kw" data-kw="g_tile" data-src="">casilla especial</span>. '+HOV()+' cada una para ver su bonus y elige la que prefieras.',tgEl('#ui [data-a="pick"]')],['Las casillas especiales cuestan oro: <span class="gd">25 🪙</span> cada una (<span class="gd">50 🪙</span> las súper). Esta vez te regalamos <span class="gd">25 🪙</span>.',tgEl('#ui .pcst')]]);
  if(r===3)hint('tut_kw','Palabras en negrita','Las palabras en negrita y de color, como '+kw('slow','ralentiza','')+', tienen su propia explicación. '+HOV()+' cualquiera de ellas para leerla: así puedes consultar cualquier cosa que no entiendas.',null);
  if(S.offers.some(o=>opens(o.p)>=3))hint('tut_fork','Dividir el camino','Dividir el camino te da más sitios para colocar piezas, pero los enemigos podrán salir por más portales.',tgEl('#ui [data-a="pick"]'));}
 if(ph==='build'){
  if(r===1&&S.hero){const H=HEROES[S.hero.id];tutOffer(S.deck.slice(),'Las torres de '+H.n,'Cada héroe empieza todas las partidas con dos torres propias en su mazo. Estas son las de '+H.n+': ya puedes construirlas. Cada pocas rondas podrás añadir más.',1);}
  if(r===2){T.lock=lockSquares(S.lastBk);if(T.lock.length)hint('tut_tile2','Construye en la casilla especial','Esta ronda, coloca tu torre en la casilla especial de la pieza nueva. Al acabar la oleada verás la diferencia con la torre de la ronda 1.',tgCell(T.lock[0].x,T.lock[0].y,1.3));else T.lock=null;}
  if(r===4){const sp=S.list.find(t=>t.id===T.t2id)||S.list[0];T.freeUp=1;hint('tut_gold','Mejorar torres','Pulsa una torre y luego ⬆ para mejorarla. Esta primera te sale gratis: elige la que quieras.',sp?tgCell(sp.x,sp.y,1.3):null);}
  if(r===3)tutOffer(['orb','frost'],'Nueva torre','Cada pocas rondas puedes añadir una torre a tu mazo. Elige: <span class="kw" data-kw="tw_orb" data-src="">Orbe arcano</span> (rayo mágico concentrado en un enemigo) o <span class="kw" data-kw="tw_frost" data-src="">Cryomago</span> (daño elemental que ralentiza, para que tus torres disparen más veces).');
  if(r===7)tutOffer(['bastion','monk','cata'],'Nueva torre','Elige otra torre para tu mazo. <span class="kw" data-kw="tw_bastion" data-src="">Baluarte</span>: soldados con armadura que bloquean el paso. <span class="kw" data-kw="tw_monk" data-src="">Monasterio</span>: monjes que golpean y curan. <span class="kw" data-kw="tw_cata" data-src="">Catapulta</span>: disparos lentos con daño en área.');
  if(r===10)hint('tut_final','Última oleada','Llega tu primer jefe: <span class="kw" data-kw="en_bob" data-src="">Bob</span>. Aguanta mucho más que cualquier enemigo que hayas visto. Usa todo lo que has aprendido. ¡Suerte!',null);}
 if(ph==='wave'&&r===2){T.d0={};for(const t of S.list)T.d0[t.id]=t.dmgT||0;}
 if(ph==='end'&&r===2)tutCompare();}
function tutCompare(){const T=S.tut,t2=S.list.find(t=>t.id===T.t2id),t1=S.list.find(t=>t!==t2&&!TW[t.type].uniq&&t.rd===1)||S.list.find(t=>t!==t2&&!TW[t.type].uniq);if(!t1||!t2)return;
 const col=t=>{const s=stats(t),bk=S.buff[t.y]&&S.buff[t.y][t.x],B=bk?BF[bkey(bk)]||BF[bk]:null;return{n:tinfo(t).n,tile:B?`<span style="color:${tcol(B.col)}">${B.n}</span>`:'Normal',hit:f(s.dmg),rate:f(s.rate),dmg:fi((t.dmgT||0)-((T.d0||{})[t.id]||0))};};
 const a=col(t1),b=col(t2),row=(l,x,y)=>`<tr><td>${l}</td><td>${x}</td><td>${y}</td></tr>`;
 closePrim();RL.open=true;const el=$('relic');el.classList.add('open');el.scrollTop=0;
 el.innerHTML=`<div class="evwin"><b style="font-size:17px">¿Qué ha cambiado la casilla especial?</b><p>Las dos torres son iguales; la diferencia es la casilla donde están.</p><table class="tcmp"><tr><th></th><th>Torre de la ronda 1</th><th>Torre de la ronda 2</th></tr>`+
  row('Casilla',a.tile,b.tile)+row('Daño por golpe',a.hit,b.hit)+row('Golpes por segundo',a.rate,b.rate)+row('Daño en esta oleada',a.dmg,b.dmg)+`</table><small>El daño total también depende de cuántos enemigos tenía cada torre a su alcance.</small><button class="go" data-a="tutok">Continuar</button></div>`;}
function tutRetry(){const snap=S.snap;if(!snap)return false;TUTR++;closePrim();closeFocus();RL.open=false;$('relic').classList.remove('open');
 S=structuredClone(snap);S.snap=snap;S.phase='build';S.selT=null;S.aim=null;S.dn=[];S.msg='El núcleo ha caído… En el tutorial no se pierde: la oleada vuelve a empezar. Prueba otra estrategia.';renderRelics();ui();return true;}
const optsMock=()=>`<div class="omk"><div class="ot"><span class="on">Juego</span><span>Volumen</span><span>Gráficos</span><span>Accesibilidad</span></div>`+
 [['Mostrar tiempo real',0,1],['Mostrar tiempo de combate',0,1],['Mostrar FPS',0,1],['Pistas',1,0],['Números de daño',1,0]].map(([l,on,hl])=>`<div class="orw${hl?' hl':''}"><span>${l}</span><span class="tg${on?' on':''}"></span></div>`).join('')+'</div>';
const OPTTXT='En <b>⚙ Opciones</b> puedes adaptar el juego a tu gusto: mostrar el tiempo de partida o los FPS, desactivar las pistas, cambiar dónde aparece la información y mucho más.';
function tutEnd(){const clean=TUTR===0,perfect=clean&&!(S.hpEn>0);try{localStorage.setItem('rt-tutdone','1');}catch(e){}if(HEROES.radagast)delete HEROES.radagast.lockTxt;
 if(clean)achieve('tut_m');if(perfect)achieve('tut_e');S.phase='won';S.proj=[];S.fx=[];
 closePrim();RL.open=false;$('relic').classList.remove('open');
 // en formato libro: izquierda, resumen y lo conseguido; derecha, consejos; pie con «Menú principal» y «Empezar una partida»
 const got=[['hr','🧙','Radagast','Ya puedes elegirlo al empezar una partida.','radagast']].concat(clean?[['ach','🏆',ACH.tut_m?ACH.tut_m.n:'Maestro del tutorial','Logro conseguido.']]:[]).concat(perfect?[['ach','🏅',ACH.tut_e?ACH.tut_e.n:'Experto en Tutoriales','Logro conseguido.']]:[]);
 const list=got.map(([k,ic,n,x,id])=>({k:k==='ach'?'ux':k,ic,n,x,id}));
 LB.msg={key:'tut',list,sel:-1,onBack:()=>showMenu(),
  left:()=>`<div class="tutbig"><div class="tutem">🎓</div><h3>¡Tutorial completado!</h3><div class="bksub">Ya conoces lo básico: piezas, torres, casillas especiales, mejoras, reliquias, unidades y eventos.</div></div>`+
   `<div class="tutst"><div>Reintentos<b>${TUTR}</b></div><div>Vida perdida<b>${S.hpEn||0}</b></div></div>`+
   `<div class="bksec">Conseguido</div><div class="bktiles">`+list.map((u,i)=>`<button class="bti nut${LB.msg.sel===i?' on':''}" data-a="nusel" data-v="${i}">${u.k==='hr'?'<span class="nunw">NUEVO</span>':''}<span class="bic"><i>${u.ic}</i></span><small>${u.n}</small></button>`).join('')+'</div>',
  right:()=>LB.msg.sel>=0?nuDetail(LB.msg.list[LB.msg.sel])+'<button class="lbbk" data-a="nusel" data-v="-1" style="margin-top:12px">‹ Consejos</button>':
   `<div class="bksec" style="margin-top:0">Para tu primera partida</div><ul class="tutl">`+
   `<li>⏩ <b>Velocidad</b>: pausa o acelera la oleada. En pausa puedes construir, mejorar y mover a tu héroe con calma.</li>`+
   `<li>↺ <b>Reintentar</b>: si una oleada sale mal, puedes repetirla desde el principio. Tiene cargas limitadas.</li>`+
   `<li>📖 <b>Compendio</b>: consulta en cualquier momento las torres, héroes y enemigos que ya conoces.</li>`+
   (MFSQ()?`<li>☰ <b>Menú de pausa</b>: desde ahí tienes el compendio, los logros, las opciones y la ayuda.</li>`:'')+`</ul>`+
   `<div class="bksec">Personaliza tu juego</div><p class="bknote" style="margin-top:0">${OPTTXT}</p>`,
  footL:`<button class="lbbk" data-a="tutmenu">‹ Menú principal</button>`,footR:`<button class="gbtn" data-a="tutplay">Empezar una partida ›</button>`};
 lbOpen('msg');}


// panel del héroe en partida: al pulsarlo (modo mover), sale a la derecha, encima de su retrato y habilidades,
// con sus datos actuales y las habilidades que ya tiene desbloqueadas a su nivel
function heroCard(){let el=$('hinfo');const H=S&&S.hero,on=!!(H&&S.aim==='hero'&&!RL.open&&!LB.open&&!document.body.classList.contains('inmenu'));
 if(!el){if(!on)return;el=document.createElement('div');el.id='hinfo';el.className='tipc';document.body.appendChild(el);}
 if(!on){el.classList.remove('on');el._sg='';return;}
 const sg=H.id+'|'+H.lvl+'|'+Math.round(H.s.hp)+'|'+Math.floor(H.xp);if(el._sg!==sg){el._sg=sg;el.innerHTML=heroInfo(H.id).replace(/<div class="tgt">[\s\S]*?<\/div>/,'')+heroAbHtml(H.id,H.lvl);}
 el.classList.add('on');const p=document.querySelector('#mbr .hpan');const r=p?p.getBoundingClientRect():{top:innerHeight-100,right:innerWidth-8};
 const h=el.offsetHeight;el.style.right=Math.max(8,innerWidth-r.right)+'px';el.style.top=Math.max(8,r.top-h-10)+'px';}
