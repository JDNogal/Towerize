// ======================= ÉTER HABLA EN PARTIDA =======================
// De vez en cuando, un bocadillo corto sale del núcleo. No para el juego.
// Un vigilante mira el estado cada cuarto de segundo (vida del núcleo, fase, jefes, torres, héroe) en lugar de engancharse a cada función.
// Reglas: como mucho una frase cada ~40 s (los momentos seguros, cada 8 s), nunca la misma dos veces seguidas,
// no habla en el tutorial ni con una ventana abierta. Cómo habla depende de lo reparado que está el núcleo (STO.p).
const ETERL={
 clean:{p:.25,l:['Bien hecho, Piloto.','Ni un rasguño.','Sensores despejados.','Así se hace.']},
 leak:{p:.4,l:['¡Ay! Núcleo dañado.','Eso ha dolido.','Brecha detectada.','¡Cuidado, Piloto!']},
 low:{p:1,l:['Integridad crítica. No me deje caer aquí.']},
 boss:{p:1,l:['Firma de energía enorme. Es un jefe.','Ese lleva un fragmento. Lo noto.']},
 bossk:{p:1,l:['Fragmento a la vista. Buen trabajo.']},
 nv4:{p:1,l:['Lecturas de poder muy altas en esa torre.']},
 better:{p:.3,l:['Mejor. Mucho mejor.']},
 last:{p:1,l:['Última oleada. Aguante, Piloto.']},
 hero:{p:.3,l:['Su héroe ha caído.']}};
const ETER={last:'',t:-1e9,el:null,hide:0,prev:null};
// fallos de texto según la reparación: 0-1 piezas tartamudea y corrompe letras; 2, algún fallo suelto; 3, limpio y con tu nombre
function eterGlitch(txt){const p=STO.p||0,nm=STO.name;if(p>=3)return nm?txt.replace(/Piloto/g,nm):txt;if(OPT.dglitch===false)return txt;
 const G='▒░▓',lv=p>=2?1:p>=1?2:3;let w=txt.split(' ');
 if(lv>=2)w=w.map((x,i)=>i<2&&/^[A-Za-zÁÉÍÓÚáéíóúÑñ]{3,}/.test(x)&&Math.random()<.5?x.slice(0,2)+'-'+x:x);
 const ch=[...w.join(' ')],n=lv===1?1:lv;for(let k=0;k<n;k++){const i=1+Math.floor(Math.random()*(ch.length-2));if(/[a-záéíóúñ]/i.test(ch[i]))ch[i]=`<span class="eg">${G[k%3]}</span>`;}
 return ch.join('');}
function eterSay(k,force){if(!OPT.eter||!S||S.tut||PREVIEWING||RL.open||(LB&&LB.open)||document.body.classList.contains('inmenu'))return false;
 const D=ETERL[k];if(!D)return false;const now=performance.now();
 if(now-ETER.t<(D.p>=1?8000:40000))return false;if(!force&&Math.random()>D.p)return false;
 const opts=D.l.filter(x=>x!==ETER.last),txt=(opts.length?opts:D.l)[Math.floor(Math.random()*(opts.length||D.l.length))];
 ETER.last=txt;ETER.t=now;let el=ETER.el;if(!el){el=ETER.el=document.createElement('div');el.id='eterb';document.body.appendChild(el);}
 el.className='g'+Math.max(0,3-(STO.p||0));el.innerHTML=`<b>ÉTER</b>${eterGlitch(txt)}`;el.classList.add('on');eterPos();
 clearTimeout(ETER.hide);ETER.hide=setTimeout(()=>el.classList.remove('on'),3200);try{sfx('eter');}catch(e){}return true;}
function eterPos(){const el=ETER.el;if(!el||!el.classList.contains('on')||!S||!S.core)return;try{const r=cellRect(S.core.x,S.core.y,1),x=(r.l+r.r)/2,y=r.t;
 el.style.left=Math.max(12,Math.min(innerWidth-el.offsetWidth-12,x-el.offsetWidth+34))+'px';el.style.top=Math.max(54,y-el.offsetHeight-14)+'px';}catch(e){}}
// el vigilante: compara con lo que vio la última vez
setInterval(()=>{try{
 if(!S||!S.hero||PREVIEWING||document.body.classList.contains('inmenu')||S.phase==='won'||S.phase==='lost'){ETER.prev=null;if(ETER.el)ETER.el.classList.remove('on');return;}
 eterPos();
 const E=S.eter=S.eter||{},P=ETER.prev,bosses=S.enemies?S.enemies.filter(e=>e.hp>0&&isBoss(e)).length:0,hhp=S.hero.s?S.hero.s.hp:1,nv4=S.list?S.list.some(t=>t.lvl>=4&&!TW[t.type].uniq):false;
 const cur={ph:S.phase,hp:S.hp,round:S.round,bosses,hhp,nv4};ETER.prev=cur;if(!P||P.round!==cur.round&&P.ph!=='wave')return;
 if(cur.ph==='wave'&&P.ph!=='wave'){E.hp0=S.hp;E.leak=0;if(S.round===ROUNDS)eterSay('last');}
 if(cur.ph==='wave'){
  if(cur.hp<P.hp){if(cur.hp>0&&cur.hp<=6&&!E.low){E.low=1;eterSay('low');}else if(!E.leak){E.leak=1;eterSay('leak');}}
  if(cur.bosses>P.bosses)eterSay('boss');
  if(cur.bosses<P.bosses&&cur.hp>0&&cur.hp===P.hp)eterSay('bossk');
  if(P.hhp>0&&cur.hhp<=0)eterSay('hero');}
 if(P.ph==='wave'&&cur.ph!=='wave'&&cur.hp>0){const clean=E.hp0!=null&&S.hp>=E.hp0;if(clean&&E.hurt)eterSay('better');else if(clean)eterSay('clean');E.hurt=!clean;}
 if(cur.nv4&&!E.nv4){E.nv4=1;eterSay('nv4');}
}catch(e){}},250);
