// ==================== v307 · ÉTER habla en el menú principal (tableta) ====================
// Al pulsar la pantallita «ÉTER · EN LÍNEA» de la consola, ÉTER suelta una frase en un bocadillo que sale del altavoz.
// El altavoz está gris (apagado) y solo parpadea en cian mientras habla. Nunca repite la frase anterior.
// En la tableta ÉTER ya está reparado: habla limpio y usa tu nombre en lugar de «Piloto».
// (En la recámara: frases según la reparación y un ÉTER «fantástico» al lado del libro en la era 1.)
const ETMN={
 go:['El núcleo no se va a defender solo, Piloto.','Botón grande, en el centro. Pone «Nueva partida». Solo lo comento.','Cuando quiera. Yo no tengo prisa. Bueno, un poco.','Llevo un rato mirando este menú. Es un menú precioso. Juguemos.','¿Otra partida? Prometo no quejarme si se cuela alguno. Mucho.'],
 joke:['Mis sensores detectan… que sigue usted en el menú.','Diagnóstico: 0 % de enemigos derrotados hoy. Preocupante.','Me reconstruyeron con piezas de un campo de batalla. No pregunte.','No soy una tostadora. Aunque, con la pieza adecuada…','Si me vuelve a pulsar, le cuento otra cosa. Es una amenaza.'],
 tickle:['Eso hace cosquillas.','Sí, sigo aquí. Siempre sigo aquí.'],
 tip:[['Con Q y E se pasa de sección en el compendio.',()=>typeof compOk==='function'&&compOk()],'Fije hasta tres logros con 📌 y los seguirá durante la partida.','Las casillas especiales potencian a la torre que se ponga encima.','Algunos enemigos llevan armadura; otros, resistencia mágica. Mezcle tipos de daño.','El oro guardado no defiende nada.','Las escuadras con aura refuerzan a las de alrededor. Elimínelas primero.']};
const ETM={last:'',taps:[],hide:0,type:0,stats:null};
// datos de tus partidas (del registro); se leen una vez al abrir el menú
function etmStats(){try{hsAll().then(L=>{L=(L||[]).filter(r=>r&&!r.tut);if(!L.length){ETM.stats=null;return;}
 const tc={};for(const r of L)for(const t of r.tw||[])if(!String(t[0]).startsWith('hero:'))tc[t[9]||t[0]]=(tc[t[9]||t[0]]||0)+1;
 const fav=Object.keys(tc).sort((a,b)=>tc[b]-tc[a])[0];
 ETM.stats={n:L.length,best:Math.max(...L.map(r=>r.r||0)),won:L.filter(r=>r.res==='won').length,fav};});}catch(e){}}
function etmPool(){const P=[...ETMN.go,...ETMN.joke];
 for(const t of ETMN.tip)if(typeof t==='string')P.push(t);else if(t[1]())P.push(t[0]);
 const s=ETM.stats;if(s){P.push(`Ha jugado ${s.n} ${s.n===1?'partida':'partidas'}. Yo las he contado todas.`,`Su mejor ronda: ${s.best}. Superarla sería… adecuado.`);
  if(s.fav)P.push(`Su torre más usada: ${s.fav}. Le tiene cariño, se nota.`);if(s.won)P.push(`${s.won} ${s.won===1?'victoria':'victorias'}. No está mal para un humano.`);}
 return P;}
function etmName(t){const nm=STO.name;return nm?t.replace(/Piloto/g,nm):t;}
function etmTips(){const P=[];for(const t of ETMN.tip)if(typeof t==='string')P.push(t);else if(t[1]())P.push(t[0]);return P;}
// auto: lo dice solo (no cuenta como pulsación). En la pausa (.ing) solo consejos.
function etmSay(auto){const cv=document.querySelector('.lbcv.a');if(!cv)return;const now=performance.now(),pau=cv.classList.contains('ing');ETM.at=now;
 if(!auto){ETM.taps=ETM.taps.filter(x=>now-x<6000);ETM.taps.push(now);}
 const P=(pau?etmTips():!auto&&ETM.taps.length>=4?ETMN.tickle:etmPool()).filter(x=>x!==ETM.last);const txt=etmName(P[Math.floor(Math.random()*P.length)]||ETMN.go[0]);ETM.last=txt;
 let b=cv.querySelector('.etmbub');if(!b){b=document.createElement('div');b.className='etmbub';b.setAttribute('role','status');b.setAttribute('aria-live','polite');cv.appendChild(b);}
 b.innerHTML='<b>ÉTER</b><span class="etmt"></span>';const sp=b.querySelector('.etmt');
 cv.classList.add('etmon');b.classList.remove('on');void b.offsetWidth;b.classList.add('on');
 clearInterval(ETM.type);clearTimeout(ETM.hide);let i=0;const ch=[...txt];
 ETM.type=setInterval(()=>{i++;sp.textContent=ch.slice(0,i).join('');if(i>=ch.length){clearInterval(ETM.type);cv.classList.remove('etmtalk');}},28);
 cv.classList.add('etmtalk');
 ETM.hide=setTimeout(()=>{b.classList.remove('on');cv.classList.remove('etmon','etmtalk');},2600+ch.length*28+1800);
 try{sfx('eter');}catch(e){}}
{const _lr=lbRender;lbRender=function(){const r=_lr.apply(this,arguments);try{
 const cv=document.querySelector('.lbcv.a');if(cv&&!cv.querySelector('.etmbt')){
  cv.insertAdjacentHTML('beforeend','<button class="etmbt" data-a="etmsay" title="Hablar con ÉTER" aria-label="Hablar con ÉTER"></button><i class="etmgr" aria-hidden="true"></i>');
  if(!ETM.stats)etmStats();}}catch(e){}return r;};}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-a="etmsay"]');if(!b)return;e.stopPropagation();e.preventDefault();etmSay();},true);
// ÉTER habla solo: en el menú, una frase cada ~35 s; al abrir la pausa, a veces un consejo. Se quita en Opciones › Diálogos.
OPTS.splice(OPTS.findIndex(o=>o.key==='eter')+1,0,{tab:'hs',type:'toggle',key:'eterm',def:true,show:()=>typeof era2Ok==='function'&&era2Ok(),label:'ÉTER habla solo en el menú y la pausa',desc:'En el menú principal, ÉTER suelta una frase de vez en cuando; al pausar, a veces te da un consejo. Pulsando su pantalla habla igual aunque lo desactives.'});
if(OPT.eterm===undefined)OPT.eterm=true;
const ETMAUTO=35000;
setInterval(()=>{try{const cv=document.querySelector('.lbcv.a');const bt=cv&&cv.querySelector('.etmbt'),vis=bt&&LB.open&&LB.cover&&getComputedStyle(bt).display!=='none'&&bt.getClientRects().length&&!document.hidden;
 if(!vis){ETM.since=0;ETM.pau=false;return;}
 const now=performance.now(),pau=cv.classList.contains('ing');if(!ETM.since)ETM.since=now;
 if(pau&&!ETM.pau){ETM.pau=true;if(OPT.eterm!==false&&Math.random()<.6)setTimeout(()=>{const c=document.querySelector('.lbcv.a.ing');if(c&&!c.classList.contains('etmon'))etmSay(true);},900);return;}
 if(!pau)ETM.pau=false;
 if(OPT.eterm===false||pau||cv.classList.contains('etmon'))return;
 if(now-Math.max(ETM.since,ETM.at||0)>=ETMAUTO)etmSay(true);}catch(e){}},1000);
