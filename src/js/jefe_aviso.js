// ==================== v334 · Aviso de jefe ====================
// Cuando sale un jefe: onda que se expande desde él, cartel arriba con su nombre, y si el juego va acelerado, vuelve un momento a ×1.
// Mientras está en el mapa se dibuja por encima del resto de enemigos y lleva un aro rojo que late, para saber siempre dónde está.
const BOSSA={list:[],slow:null};
{const _se=spawnEnemy;spawnEnemy=function(t){const n0=S&&S.enemies?S.enemies.length:0;const r=_se.apply(this,arguments);try{
 if(S&&!S.tut&&!(PV&&S===PV.S)&&!(PE&&S===PE.S)&&!(PHV&&S===PHV.S)&&S.enemies&&S.enemies.length>n0){const e=S.enemies.slice(n0).find(isBoss);if(e)bossAnnounce(e);}}catch(err){}return r;};}
function bossAnnounce(e){BOSSA.list.push({e,t0:performance.now()});
 try{sfx('boss');}catch(_){try{sfx('page');}catch(__){}}
 let b=$('bossban');if(!b){b=document.createElement('div');b.id='bossban';document.body.appendChild(b);}
 const E=ET[e.t]||{},ic=enIc(e.t)?icHtml(enIc(e.t)):"";b.innerHTML=`<span class="bbic" style="background:${E.col||'#7a1a14'}">${ic||'☠'}</span><span><small>¡Atención!</small><b>${E.n||'Jefe'}</b> ha salido</span>`;
 b.classList.remove('on');void b.offsetWidth;b.classList.add('on');clearTimeout(BOSSA.bt);BOSSA.bt=setTimeout(()=>b.classList.remove('on'),3200);
 // a ×1 un momento (solo si iba más rápido) y luego vuelve a la velocidad que tenías, salvo que la hayas cambiado tú
 if(S.speed>1){if(!BOSSA.slow)BOSSA.slow={prev:S.speed};S.speed=1;try{ui();}catch(_){}clearTimeout(BOSSA.st);BOSSA.st=setTimeout(()=>{const s=BOSSA.slow;BOSSA.slow=null;if(s&&S&&S.speed===1)S.speed=s.prev;try{ui();}catch(_){}},3000);}}
// los jefes se dibujan los últimos (encima de todo lo demás)
{const _d=draw;draw=function(){if(!S||!S.enemies||!S.enemies.some(isBoss))return _d.apply(this,arguments);const E=S.enemies;S.enemies=E.filter(x=>!isBoss(x)).concat(E.filter(isBoss));try{return _d.apply(this,arguments);}finally{S.enemies=E;}};}
{const _dw=e2DrawWorld;e2DrawWorld=function(lw){const r=_dw.apply(this,arguments);try{if(!S||!S.enemies)return r;const X=v=>v*CS+CS/2,now=performance.now();
 for(const e of S.enemies){if(!isBoss(e)||e.sw||e.hp<=0)continue;const R=((ET[e.t]||{}).r||.5)*CS*(typeof EVS!=='undefined'?EVS:1),p=.5+.5*Math.sin(now/260);
  g.save();g.strokeStyle=`rgba(255,70,50,${.45+.35*p})`;g.lineWidth=lw(3);g.beginPath();g.arc(X(e.x),X(e.y),R*1.35+p*R*.15,0,Math.PI*2);g.stroke();g.restore();}
 BOSSA.list=BOSSA.list.filter(a=>now-a.t0<2600&&S.enemies.includes(a.e));
 for(const a of BOSSA.list){const u=(now-a.t0)/2600;for(let k=0;k<3;k++){const v=u*1.6-k*.22;if(v<=0||v>=1)continue;g.save();g.globalAlpha=(1-v)*.85;g.strokeStyle='#ff5a3a';g.lineWidth=lw(4*(1-v)+1);g.beginPath();g.arc(X(a.e.x),X(a.e.y),CS*(.6+v*4.5),0,Math.PI*2);g.stroke();g.restore();}}
}catch(e){}return r;};}
