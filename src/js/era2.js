// ==================== ERAS · la segunda era: Ruinas de Neón ====================
// ERA = era elegida para la próxima partida; S.era = era de la partida en curso. La era 2 se abre al reparar a ÉTER (3 victorias).
const ERADEF={1:{n:'Fantástica',ic:'🐉',col:'#4a8a4a'},2:{n:'Ruinas de Neón',ic:'🌆',col:'#3fe8ff'}};

const era2Ok=()=>UNLOCK_ALL||(typeof OPT!=='undefined'&&OPT.u_era)||(typeof STO!=='undefined'&&STO.p>=3);
const inMenu=()=>document.body.classList.contains('inmenu');
// ¿se juega (o se consulta) con el contenido de la era 2? En el menú, si está desbloqueada; en partida, si la partida es de la era 2
function eraHas2(){return inMenu()?era2Ok():!!(typeof S!=='undefined'&&S&&S.era===2);}
const eraList=()=>era2Ok()?[1,2]:[1];
function eraPick(v){v=+v;if(v===2&&!era2Ok())return;ERA=v;try{localStorage.setItem('rt-era',String(v));}catch(e){}if(typeof lbRender==='function')lbRender();}
try{const v=+localStorage.getItem('rt-era');if(v===2)ERA=2;}catch(e){}
// página de la era 2 en «Elegir era»
function era2Page(){const nm=(typeof STO!=='undefined'&&STO.name)||'Piloto',bb=(typeof STO!=='undefined'&&STO.bb)||0;
 return{left:`<h3>Ruinas de Neón</h3><div class="bksub">Nueva partida · 1 de 3</div><div class="era lbera e2"><div class="pcs">${[0,1,2].map(i=>`<div class="pc${i<bb?' got':''}">${i<bb?'📼':''}</div>`).join('')}</div><small>Registros recuperados ${Math.min(3,bb)} / 3 · cada partida ganada recupera la caja negra de un jefe</small><p style="margin-top:16px">Un futuro lejano: caminos holográficos entre torres caídas y neones que aún parpadean. Las máquinas que quedaron atrás no han dejado de funcionar. Esta era es algo más dura que la Fantástica.</p></div>`,
  right:`<div class="lbeter"><div class="lbeh"><span class="lbei">💠</span><b>ÉTER</b></div><p>${escH(('Las coordenadas de casa nos han traído aquí, {N}. Esto fue una ciudad. Nuestra ciudad, creo. Los registros de esas máquinas pueden contarnos qué pasó.').replace(/\{N\}/g,nm))}</p></div><div class="lbsys"><b>SISTEMA</b> · Carga de salto: ${[0,33,66,100][Math.min(3,bb)]} % · Firmas temporales: ${Math.min(3,bb)} de 3</div>`};}
// ---- diálogos de la era 2 (provisionales, pendientes de aprobar) ----
const STORY2={
 arrive:[{sys:1,t:'Salto completado. Coordenadas: coinciden con el registro «Hogar». Fecha: desconocida.'},
  {sp:'ÉTER',g:0,t:'Esto… esto es nuestra ciudad, {N}. O lo fue. Las torres siguen en pie, pero no hay nadie. Solo máquinas.'},
  {sp:'ÉTER',g:0,t:'Detecto actividad: robots de mantenimiento, drones de vigilancia… y algo grande. Siguen cumpliendo órdenes de alguien que ya no está.'},
  {sp:'ÉTER',g:0,t:'Nos han visto. Defienda la nave como en la otra era, {N}. Yo intentaré leer sus registros.'}]};
// ---- aviso de era nueva: al llegar a 3 piezas (en la historia) o, si ya las tenía, al abrir el menú ----
function era2Announce(){if(typeof STO==='undefined'||!era2Ok()||STO.e2n)return;STO.e2n=1;saveSto();newU('era',ERADEF[2].ic,'Era: '+ERADEF[2].n,'ÉTER reparado · 3 victorias');}
// ================= MAPA DE LA ERA 2 =================
// suelo: losas de hormigón oscuro con grietas y brotes · camino: holograma cian con bordes de luz y flechas; con enemigos en el mapa se tiñe de rojo y lo recorren ondas
// solares: plataformas hexagonales con marco magenta · núcleo: la nave entre escombros
const E2={alert:0,t0:0,cf:null,cfk:-1};
const e2Hash=(x,y)=>((x*73+y*151)|0)%11;
function e2Ground(g,X,Y,gx,gy,B){g.fillStyle=(gx+gy)%2?'#1c1f2a':'#1a1c26';g.fillRect(X,Y,B,B);g.strokeStyle='rgba(0,0,0,.35)';g.lineWidth=Math.max(.6,B*.025);g.strokeRect(X+.5,Y+.5,B-1,B-1);
 const h=e2Hash(gx,gy);if(h===0||h===7){g.strokeStyle='rgba(0,0,0,.55)';g.lineWidth=Math.max(.8,B*.03);g.beginPath();g.moveTo(X+B*.15,Y+B*.2);g.lineTo(X+B*.45,Y+B*.55);g.lineTo(X+B*.35,Y+B*.85);g.stroke();}
 if(h===3){g.fillStyle='#24342a';g.beginPath();g.ellipse(X+B*.72,Y+B*.78,B*.14,B*.08,0,0,7);g.fill();g.strokeStyle='#4f8a4a';g.lineWidth=Math.max(.8,B*.04);g.beginPath();g.moveTo(X+B*.72,Y+B*.78);g.lineTo(X+B*.82,Y+B*.56);g.moveTo(X+B*.72,Y+B*.78);g.lineTo(X+B*.6,Y+B*.58);g.stroke();}}
function e2CF(){const k=Object.keys(S.blocks).length;if(E2.cfk!==k||!E2.cf){E2.cf=cfield();E2.cfk=k;}return E2.cf;}
function e2Path(g,X,Y,gx,gy,B,a){const isP=(x,y)=>inbc(x,y)&&S.cc[y][x]===2,cf=e2CF(),t=performance.now()/1000;
 // holograma: cian → rojo según la alerta
 const r=Math.round(63+(255-63)*a),gg=Math.round(232-(232-70)*a),b=Math.round(255-(255-90)*a),col=(al)=>`rgba(${r},${gg},${b},${al})`;
 g.fillStyle=col(.16);g.fillRect(X,Y,B,B);g.fillStyle=col(.07);for(let i=0;i<B;i+=B/9)g.fillRect(X,Y+i,B,B/18);
 // ondas que recorren el camino (de los portales al núcleo) cuando hay alerta
 if(a>0&&cf&&cf[gy]&&cf[gy][gx]<1e9){const w=.5+.5*Math.sin(cf[gy][gx]*.9-t*5);g.fillStyle=`rgba(255,60,80,${.26*a*w})`;g.fillRect(X,Y,B,B);}
 // bordes de luz donde toca suelo (línea ancha tenue + línea fina viva, sin sombras: es barato)
 const L=Math.max(1,B*.05);g.lineWidth=L*2.6;g.strokeStyle=col(.22);const edge=(x1,y1,x2,y2)=>{g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke();};
 const es=[];if(!isP(gx,gy-1))es.push([X,Y+L,X+B,Y+L]);if(!isP(gx,gy+1))es.push([X,Y+B-L,X+B,Y+B-L]);if(!isP(gx-1,gy))es.push([X+L,Y,X+L,Y+B]);if(!isP(gx+1,gy))es.push([X+B-L,Y,X+B-L,Y+B]);
 for(const e of es)edge(...e);g.lineWidth=L;g.strokeStyle=col(.95);for(const e of es)edge(...e);
 // flecha hacia el núcleo
 if(cf&&cf[gy]&&cf[gy][gx]<1e9){let d=null,v=cf[gy][gx];for(const[dx,dy]of D){const nx=gx+dx,ny=gy+dy;if(isP(nx,ny)&&cf[ny][nx]<v){v=cf[ny][nx];d=[dx,dy];}}
  if(d){const cx=X+B/2,cy=Y+B/2,s=B*.16;g.strokeStyle=`rgba(${Math.round(180+(255-180)*a)},${Math.round(250-(250-150)*a)},255,.55)`;g.lineWidth=L;g.beginPath();g.moveTo(cx-d[0]*s-d[1]*s*.8,cy-d[1]*s-d[0]*s*.8);g.lineTo(cx,cy);g.lineTo(cx-d[0]*s+d[1]*s*.8,cy-d[1]*s+d[0]*s*.8);g.stroke();}}}
function e2Solar(g,X,Y,B){const cx=X+B/2,cy=Y+B/2;g.fillStyle='#2e3340';g.beginPath();for(let k=0;k<6;k++){const a=k/6*Math.PI*2+Math.PI/6;g.lineTo(cx+Math.cos(a)*B*.42,cy+Math.sin(a)*B*.42);}g.closePath();g.fill();
 g.strokeStyle='rgba(255,79,216,.35)';g.lineWidth=Math.max(1,B*.1);g.beginPath();for(let k=0;k<6;k++){const a=k/6*Math.PI*2+Math.PI/6;g.lineTo(cx+Math.cos(a)*B*.34,cy+Math.sin(a)*B*.34);}g.closePath();g.stroke();g.strokeStyle='#ff4fd8';g.lineWidth=Math.max(1,B*.045);g.stroke();
 g.fillStyle='#ff4fd8';g.fillRect(cx-B*.05,cy-B*.05,B*.1,B*.1);}
// celda completa (suelo + lo que lleve encima)
function e2Cell(g,gx,gy,cv0,B){const X=gx*B,Y=gy*B;e2Ground(g,X,Y,gx,gy,B);
 if(cv0===2)e2Path(g,X,Y,gx,gy,B,E2.alert);else if(cv0===1)e2Solar(g,X,Y,B);else if(cv0===3&&S.obs){const ch=S.obs[gx+','+gy]||'#';if(ch!=='#')drawObs(g,ch,X,Y,B);}}
// alerta del camino: sube cuando hay enemigos en el mapa, baja al acabar la oleada
function e2Tick(){const now=performance.now(),dt=Math.min(.1,(now-(E2.t0||now))/1000);E2.t0=now;const want=S&&S.phase==='wave'&&S.enemies.length?1:0;E2.alert+=(want-E2.alert)*Math.min(1,dt*2.5);if(Math.abs(E2.alert-want)<.01)E2.alert=want;}
// ---- decoración de la era 2 (letras libres en OBS): Q pilar oxidado · N letrero de neón · X panel holográfico · V dron caído · c chatarra · Y brotes · E máquina expendedora ----
Object.assign(OBS,{Q:'Pilar oxidado',N:'Letrero de neón',X:'Panel holográfico',V:'Dron caído',c:'Chatarra',Y:'Brotes',E:'Máquina expendedora'});
function e2Obs(c,ch,x,y,s){const X=f=>x+s*f,Y=f=>y+s*f,L=Math.max(1,s*.04),t=performance.now()/1000,h=e2Hash(Math.round(x/s),Math.round(y/s));
 if(ch==='Q'){c.fillStyle='#4a3a2e';c.fillRect(X(.34),Y(.1),s*.32,s*.82);c.fillStyle='#6a4a30';c.fillRect(X(.34),Y(.1),s*.1,s*.82);c.fillStyle='#8a5a2a';c.fillRect(X(.4),Y(.26),s*.2,s*.08);c.fillRect(X(.4),Y(.6),s*.2,s*.08);c.fillStyle='#2a2028';c.fillRect(X(.3),Y(.86),s*.4,s*.08);}
 else if(ch==='N'){c.fillStyle='#262a36';c.fillRect(X(.08),Y(.3),s*.84,s*.4);c.strokeStyle='#1a1d26';c.lineWidth=L;c.strokeRect(X(.08),Y(.3),s*.84,s*.4);const on=Math.sin(t*7+h)>-.6;c.strokeStyle=on?'#ff4fd8':'rgba(255,79,216,.25)';c.lineWidth=L*1.5;c.beginPath();c.moveTo(X(.2),Y(.62));c.lineTo(X(.2),Y(.38));c.lineTo(X(.38),Y(.62));c.lineTo(X(.38),Y(.38));c.stroke();c.strokeStyle='#3fe8ff';c.beginPath();c.moveTo(X(.52),Y(.38));c.lineTo(X(.52),Y(.62));c.lineTo(X(.66),Y(.62));c.stroke();c.strokeStyle='rgba(255,79,216,.25)';c.beginPath();c.moveTo(X(.74),Y(.38));c.lineTo(X(.86),Y(.62));c.moveTo(X(.86),Y(.38));c.lineTo(X(.74),Y(.62));c.stroke();}
 else if(ch==='X'){const col=['#ff4fd8','#3fe8ff','#ffb347'][h%3],on=Math.sin(t*3+h*2)>-.85;c.fillStyle='#3a3f4a';c.fillRect(X(.45),Y(.5),s*.1,s*.42);c.fillStyle=on?col+'44':'#22262e';c.fillRect(X(.12),Y(.1),s*.76,s*.42);c.strokeStyle=on?col:'#3a3f4a';c.lineWidth=L;c.strokeRect(X(.12),Y(.1),s*.76,s*.42);if(on){c.fillStyle=col;for(let i=0;i<3;i++)c.fillRect(X(.2),Y(.18+i*.1),s*(i%2?.28:.44),s*.05);}}
 else if(ch==='V'){c.fillStyle='#55606e';c.beginPath();c.ellipse(X(.5),Y(.62),s*.34,s*.17,-.3,0,7);c.fill();c.fillStyle='#3a4250';c.fillRect(X(.1),Y(.3),s*.22,s*.1);c.fillRect(X(.66),Y(.24),s*.22,s*.1);c.fillStyle='#ff6a3a';c.beginPath();c.arc(X(.56),Y(.58),s*.05,0,7);c.fill();for(let i=0;i<3;i++){const k=(t*.5+i/3+h*.1)%1;c.fillStyle=`rgba(120,120,130,${.45*(1-k)})`;c.beginPath();c.arc(X(.6)+k*s*.1,Y(.35)-k*s*.5,s*(.06+k*.12),0,7);c.fill();}}
 else if(ch==='c'){c.fillStyle='#4a5566';c.fillRect(X(.15),Y(.5),s*.3,s*.3);c.fillStyle='#55606e';c.beginPath();c.arc(X(.65),Y(.6),s*.16,0,7);c.fill();c.fillStyle='#2a3038';c.beginPath();c.arc(X(.65),Y(.6),s*.06,0,7);c.fill();c.fillStyle='#6a4a30';c.fillRect(X(.4),Y(.3),s*.3,s*.1);c.fillStyle='#ff4fd8';c.fillRect(X(.22),Y(.58),s*.08,s*.05);}
 else if(ch==='Y'){c.fillStyle='#24342a';c.beginPath();c.ellipse(X(.5),Y(.78),s*.3,s*.12,0,0,7);c.fill();c.strokeStyle='#4f8a4a';c.lineWidth=L*1.3;for(let k=-1;k<=1;k++){c.beginPath();c.moveTo(X(.5),Y(.78));c.quadraticCurveTo(X(.5+k*.2),Y(.5),X(.5+k*.3),Y(.3));c.stroke();}c.fillStyle='#6fb05a';for(let k=-1;k<=1;k++){c.beginPath();c.ellipse(X(.5+k*.3),Y(.3),s*.07,s*.04,k*.6,0,7);c.fill();}}
 else if(ch==='E'){c.fillStyle='#4a5566';c.fillRect(X(.22),Y(.1),s*.56,s*.82);c.fillStyle='#2a3038';c.fillRect(X(.22),Y(.84),s*.56,s*.08);const on=Math.sin(t*2+h)>-.3;c.fillStyle=on?'rgba(63,232,255,.4)':'#1c2230';c.fillRect(X(.3),Y(.2),s*.4,s*.32);c.fillStyle='#ff4fd8';c.fillRect(X(.3),Y(.62),s*.14,s*.08);c.fillStyle='#2a3038';c.fillRect(X(.5),Y(.62),s*.2,s*.08);}}
// estampas de decoración de la era 2 (sustituyen a bosques, granjas y aldeas)
const E2STAMPS=[{w:3,f:'ruins'},{w:2,f:'neon'},{w:2,f:'scrap'},{w:2,f:'green'},{w:1,f:'shop'}];
function decorateE2(o){const g=o.p.map(r=>[...r]),free=(x,y)=>x>=0&&y>=0&&x<P&&y<P&&g[y][x]==='#',nb=(x,y)=>D.map(([a,b])=>[x+a,y+b]).filter(([a,b])=>free(a,b));
 const cells=[];g.forEach((r,y)=>r.forEach((ch,x)=>{if(ch==='#')cells.push([x,y]);}));const goal=Math.round(cells.length*DECF*.8);let n=0,tries=0;
 const grow=(s,k,ch)=>{const q=[s],got=[];while(q.length&&got.length<k){const[x,y]=q.splice(Math.floor(Math.random()*q.length),1)[0];if(!free(x,y))continue;g[y][x]=ch;got.push([x,y]);q.push(...nb(x,y));}return got;};
 while(n<goal&&tries++<40){const s=cells[Math.floor(Math.random()*cells.length)];if(!free(s[0],s[1]))continue;let W=0;for(const t of E2STAMPS)W+=t.w;let r=Math.random()*W,f='ruins';for(const t of E2STAMPS){r-=t.w;if(r<=0){f=t.f;break;}}
  if(f==='ruins'){const c=grow(s,1+Math.floor(Math.random()*2),'Q');n+=c.length;const m=c.flatMap(([x,y])=>nb(x,y))[0];if(m){g[m[1]][m[0]]='c';n++;}}
  else if(f==='neon'){g[s[1]][s[0]]=Math.random()<.5?'N':'X';n++;}
  else if(f==='scrap'){const c=grow(s,1+Math.floor(Math.random()*2),'c');n+=c.length;const m=c.flatMap(([x,y])=>nb(x,y))[0];if(m){g[m[1]][m[0]]='V';n++;}}
  else if(f==='green')n+=grow(s,2+Math.floor(Math.random()*3),'Y').length;
  else{g[s[1]][s[0]]='E';n++;}}
 o.p=g.map(r=>r.join(''));}
// ---- coches voladores al fondo: cruzan la zona construida con una estela ----
const E2CARS=[{y:.18,sp:.055,col:'#ff9a3a',off:0},{y:.52,sp:-.04,col:'#3fe8ff',off:.4},{y:.86,sp:.047,col:'#ff4fd8',off:.75}];
function e2Cars(g,B){const ks=Object.keys(S.blocks);if(!ks.length)return;let x0=1e9,y0=1e9,x1=-1,y1=-1;for(const k of ks){const[bx,by]=k.split(',').map(Number);x0=Math.min(x0,bx);y0=Math.min(y0,by);x1=Math.max(x1,bx);y1=Math.max(y1,by);}
 const L=(x1-x0+1)*P*B,T=(y1-y0+1)*P*B,ox=x0*P*B,oy=y0*P*B,t=performance.now()/1000;
 for(const c of E2CARS){let k=((t*c.sp+c.off)%1+1)%1;const x=ox+k*L,y=oy+c.y*T,dir=Math.sign(c.sp),w=B*1.3;const gr=g.createLinearGradient(x-dir*w,0,x,0);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(1,c.col);g.strokeStyle=gr;g.lineWidth=Math.max(1,B*.05);g.beginPath();g.moveTo(x-dir*w,y);g.lineTo(x,y);g.stroke();
  g.fillStyle='rgba(42,46,58,.9)';g.beginPath();g.ellipse(x+dir*B*.15,y,B*.24,B*.09,0,0,7);g.fill();g.fillStyle=c.col;g.fillRect(x+dir*B*.3-B*.03,y-B*.03,B*.07,B*.06);}}
// ---- núcleo de la era 2: la nave en pie entre escombros, con destello rojo al recibir daño ----
function e2Core(g,cx,cy,B){const t=performance.now()/1000,hit=S&&S.chit?Math.max(0,1-(performance.now()-S.chit)/500):0;
 g.fillStyle='#3a3f4a';for(const[a,b,r]of[[-.65,-.5,.18],[.7,-.45,.15],[-.75,.38,.13],[.6,.52,.2],[0,-.8,.12],[-.3,.62,.1]]){g.beginPath();g.ellipse(cx+a*B,cy+b*B,r*B,r*B*.7,0,0,7);g.fill();}
 g.fillStyle='#55606e';for(const[a,b]of[[-.45,-.7],[.5,-.75],[.8,.15],[-.82,-.05]])g.fillRect(cx+a*B,cy+b*B,B*.16,B*.26);
 const gl=g.createRadialGradient(cx,cy,2,cx,cy,B*1.3);gl.addColorStop(0,`rgba(${hit?255:63},${hit?80:232},${hit?90:255},${.3+.2*Math.sin(t*2)})`);gl.addColorStop(1,'rgba(63,232,255,0)');g.fillStyle=gl;g.fillRect(cx-B*1.4,cy-B*1.4,B*2.8,B*2.8);
 g.save();g.translate(cx,cy-B*.1+Math.sin(t*1.4)*B*.03);const s=B/52;g.scale(s,s);g.fillStyle=hit?'#c9a4ae':'#9aa4ae';g.strokeStyle='#2a3038';g.lineWidth=2.5;g.beginPath();g.moveTo(-34,6);g.quadraticCurveTo(0,-18,34,6);g.lineTo(20,13);g.lineTo(-20,13);g.closePath();g.fill();g.stroke();
 g.fillStyle=hit?'#ff6a7a':'#3fe8ff';g.beginPath();g.ellipse(0,-1,9,5.5,0,0,7);g.fill();g.stroke();g.fillStyle='#7a848e';g.beginPath();g.moveTo(-34,6);g.lineTo(-43,15);g.lineTo(-22,13);g.closePath();g.fill();g.stroke();g.beginPath();g.moveTo(34,6);g.lineTo(43,15);g.lineTo(22,13);g.closePath();g.fill();g.stroke();
 g.fillStyle=`rgba(63,232,255,${.6+.3*Math.sin(t*6)})`;g.beginPath();g.ellipse(-14,15,4,2,0,0,7);g.ellipse(14,15,4,2,0,0,7);g.fill();g.restore();}
// ---- enganches: al abrir el menú, aviso de era nueva; al empezar partida, diálogo de llegada ----
{const _sm=showMenu;showMenu=function(){const r=_sm.apply(this,arguments);try{era2Announce();}catch(e){}return r;};}
function era2Arrive(){if(!S||S.era!==2||S.tut||STO.e2a)return;STO.e2a=1;saveSto();setTimeout(()=>{if(S&&S.era===2&&!DLG.on)playDialog(STORY2.arrive);},700);}
{const _ch=chooseHero;chooseHero=function(){const r=_ch.apply(this,arguments);try{era2Arrive();}catch(e){}return r;};}
// ---- la primera vez que aparece el marcapáginas de la era 2: pista con foco como las demás (bloquea hasta pulsar Entendido) ----
const era2HintOn=()=>era2Ok()&&!HSEEN.era2mk&&ERA!==2;
function era2HintHTML(){return '';}
function era2Hint(){if(!era2HintOn()||HQ.cur)return;setTimeout(()=>{if(!era2HintOn()||HQ.cur||!LB.open||LB.step!=='era')return;const tg=tgEl('.bkmarks .bkmk[data-v="2"]');if(!tg())return;
 hintShow({id:'era2mk',menu:1,title:'¡Nueva era desbloqueada!',txt:'Has reparado a ÉTER: ahora puedes viajar a las <b>Ruinas de Neón</b>. Elige la era en estos marcapáginas'+(kcOn()?' (o con <b>Q</b> y <b>E</b>)':'')+': 🐉 Fantástica, 🌆 Ruinas de Neón.',tg});},650);}
{const _ep=eraPick;eraPick=function(v){const r=_ep.apply(this,arguments);try{if(+v===2&&!HSEEN.era2mk)hintSeen('era2mk');}catch(e){}return r;};}
// ---- al empezar la partida, los cofres y eventos aparecen uno a uno (del más cercano al núcleo al más lejano) mientras el libro entra en el núcleo ----
const REV0=380,REVG=200,REVD=260;
function revOrder(){const c=S.core||{x:0,y:0},ks=Object.keys(S.chests||{}).concat(Object.keys(S.evts||{})).filter(k=>!S.blocks[k]),B=P*K,d=k=>{const[bx,by]=k.split(',').map(Number);return Math.hypot((bx+.5)*B-c.x,(by+.5)*B-c.y);};return ks.sort((a,b)=>d(a)-d(b));}
function revF(ord,key){if(S.revAt===undefined||S.revAt===0)return 1;if(S.revAt<0)return 0;const i=ord.indexOf(key),t=performance.now()-S.revAt-REV0-Math.max(0,i)*REVG;if(t<=0)return 0;const k=Math.min(1,t/REVD);return k<1?k*(1+.35*Math.sin(k*Math.PI)):1;}
function revStart(){if(!S||S.revAt!==-1)return;S.revAt=performance.now();const n=revOrder().length,tok=S.revAt;
 for(let i=0;i<n;i++)setTimeout(()=>{if(S&&S.revAt===tok)try{sfx('ui');}catch(e){}},REV0+i*REVG);
 setTimeout(()=>{if(S&&S.revAt===tok){S.revAt=0;try{ui();}catch(e){}}},REV0+n*REVG+REVD+250);}
{const _c2=chooseHero;chooseHero=function(){LB.slowOut=1;try{revStart();}catch(e){}const r=_c2.apply(this,arguments);LB.slowOut=0;try{ui();}catch(e){}return r;};}
