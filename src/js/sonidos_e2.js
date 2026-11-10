// ==================== v302 · SONIDOS DE LO NUEVO (Era Distópica, héroes, reliquias y Prototipo Omega) ====================
// Todos sintetizados (sin muestras). Se añaden a «Probar sonidos» en un grupo propio.
const SY2={
 boom:(T,N)=>{T('sine',150,38,0,.004,.45,.9);N('lowpass',2600,280,.7,0,.004,.5,.8);N('highpass',3500,3500,.7,.01,.003,.18,.25);},
 zapE:(T,N)=>{T('sawtooth',1900,240,0,.002,.11,.3);T('square',2600,700,.02,.002,.07,.14);N('highpass',5000,7500,.9,0,.002,.09,.3);},
 gun:(T,N)=>{N('bandpass',1700,650,1.1,0,.001,.055,.75);T('square',210,85,0,.001,.045,.28);},
 nano:(T,N)=>{for(let i=0;i<4;i++){const f=2200+Math.random()*1800;T('sine',f,f*.8,i*.03,.003,.035,.14);}},
 acid:(T,N)=>{N('bandpass',900,2400,2.5,0,.01,.22,.5);for(let i=0;i<3;i++){const f=260+Math.random()*300;T('sine',f,f*2,.03+i*.05,.004,.05,.25);}},
 sonic:(T,N)=>{T('sine',70,150,0,.02,.3,.8);T('sawtooth',140,60,0,.01,.28,.22);N('lowpass',500,1400,.7,0,.02,.3,.3);},
 charm:(T,N)=>{[784,988,1175].forEach((f,i)=>{T('sine',f,f*1.03,i*.09,.02,.4,.2);T('triangle',f*2,f*2.04,i*.09,.02,.25,.06);});},
 tele:(T,N)=>{T('sine',300,1800,0,.01,.22,.3);T('sine',1800,300,.2,.01,.2,.25);N('highpass',3000,6000,.8,0,.01,.3,.15);},
 alarm:(T,N)=>{for(let i=0;i<3;i++){T('square',880,880,i*.24,.005,.1,.22);T('square',660,660,i*.24+.12,.005,.1,.22);}},
 roar:(T,N)=>{T('sawtooth',130,60,0,.04,.6,.5);T('sawtooth',196,82,.02,.04,.55,.3);N('bandpass',420,240,.9,0,.04,.6,.5);},
 spit:(T,N)=>{N('bandpass',2200,500,1.6,0,.01,.28,.6);T('sine',520,180,.02,.01,.2,.3);N('lowpass',900,300,.8,.18,.01,.3,.3);},
 slash:(T,N)=>{N('highpass',2500,7500,.9,0,.004,.13,.55);T('sawtooth',1400,380,0,.003,.1,.16);T('sine',95,50,.07,.003,.14,.5);},
 ult2:(T,N)=>{[98,147,196,294].forEach((f,i)=>T('sawtooth',f,f*1.5,i*.07,.02,.6,.2));T('sine',55,35,0,.01,.8,.8);N('bandpass',600,2400,.8,0,.05,.7,.3);},
 holo:(T,N)=>{[660,880,1320,1760].forEach((f,i)=>{T('square',f,f,i*.055,.003,.07,.09);T('sine',f*1.5,f*1.5,i*.055,.003,.1,.1);});N('highpass',6000,6000,.8,0,.01,.3,.06);},
 poly:(T,N)=>{T('sine',900,220,0,.005,.25,.35);T('square',220,440,.2,.005,.12,.14);T('square',440,660,.3,.005,.12,.12);},
 shield:(T,N)=>{T('sine',330,660,0,.03,.5,.28);T('triangle',495,990,0,.03,.45,.16);N('bandpass',1800,3200,3,0,.03,.4,.12);},
 habg:(T,N)=>{T('triangle',440,660,0,.01,.18,.25);T('sine',880,1320,.05,.01,.2,.15);N('highpass',4000,6000,.8,0,.005,.12,.1);}};
// 'boom' y 'zap' ya se pedían desde las torres de la era 2, pero no existían: ahora suenan
const SFX2=['Era Distópica',[
 ['boom','Explosión (Cañoneros, kamikazes, bombas)',[{y:'boom',v:.5,cd:.12,mx:2,pv:.12}]],
 ['zap','Descarga eléctrica (Láser de arco, pulsos)',[{y:'zapE',v:.3,cd:.1,mx:2,pv:.12}]],
 ['h_gun','Ametralladora (Búnker, Prototipo Omega)',[{y:'gun',v:.28,cd:.07,mx:3,pv:.12}]],
 ['h_nano','Enjambre de nanitos',[{y:'nano',v:.22,cd:.3,mx:2,pv:.1}]],
 ['h_acid','Chorro de ácido',[{y:'acid',v:.3,cd:.25,mx:2,pv:.1}]],
 ['sonic','Onda sónica',[{y:'sonic',v:.45,cd:.25,mx:2,pv:.06}]],
 ['charm','Embeleso',[{y:'charm',v:.35,cd:.6,mx:1}]],
 ['tele','Teletransporte enemigo',[{y:'tele',v:.4,cd:.5,mx:1}]],
 ['alarm','Alarma (llamada de refuerzos)',[{y:'alarm',v:.35,cd:2,mx:1}]],
 ['hab','Habilidad de héroe',[{y:'habg',v:.4,cd:.2,mx:1}]],
 ['h2_korr','Korr · Llamada de la colmena',[{y:'roar',v:.5,cd:.3,mx:1}]],
 ['h2_ferro','Ferro · Vertido corrosivo',[{y:'spit',v:.5,cd:.3,mx:1}]],
 ['h2_kai','Kai · Ejecución',[{y:'slash',v:.5,cd:.12,mx:2,pv:.08}]],
 ['h2_ult','Definitiva de héroe',[{y:'ult2',v:.55,cd:.5,mx:1}]],
 ['holo','Holograma (Impresora 3D, Prototipo Omega)',[{y:'holo',v:.4,cd:.3,mx:1}]],
 ['poly','Reprogramado en aspiradora',[{y:'poly',v:.35,cd:.3,mx:2}]],
 ['shield','Escudo y cúpula',[{y:'shield',v:.4,cd:.4,mx:1}]]]];
SFXG.push(SFX2);for(const[k,n,vs]of SFX2[1])SFXK[k]={n,vs};
{const _s=synth;synth=function(kind,t0,out,v,r){const f=SY2[kind];if(!f)return _s.apply(this,arguments);const c=SND.ctx;
 const tone=(type,f0,f1,at,a,d,pk)=>{const o=c.createOscillator(),g=c.createGain(),t=t0+at;o.type=type;o.frequency.setValueAtTime(f0*r,t);if(f1!==f0)o.frequency.exponentialRampToValueAtTime(Math.max(20,f1*r),t+a+d*.7);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(Math.max(.0002,pk*v),t+a);g.gain.exponentialRampToValueAtTime(.0001,t+a+d);o.connect(g);g.connect(out);o.start(t);o.stop(t+a+d+.05);};
 const noise=(ftype,f0,f1,q,at,a,d,pk)=>{const n=c.createBufferSource(),len=Math.ceil(c.sampleRate*(a+d+.05)),bf=c.createBuffer(1,len,c.sampleRate),ch=bf.getChannelData(0);for(let i=0;i<len;i++)ch[i]=Math.random()*2-1;n.buffer=bf;const fl=c.createBiquadFilter(),t=t0+at;fl.type=ftype;fl.frequency.setValueAtTime(f0*r,t);if(f1!==f0)fl.frequency.exponentialRampToValueAtTime(Math.max(20,f1*r),t+a+d);fl.Q.value=q;const g=c.createGain();g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(Math.max(.0002,pk*v),t+a);g.gain.exponentialRampToValueAtTime(.0001,t+a+d);n.connect(fl);fl.connect(g);g.connect(out);n.start(t);n.stop(t+a+d+.05);};
 f(tone,noise);};}
// ---- quién suena a qué ----
Object.assign(HITK,{bunker:'h_gun',robots:'h_metal',nano:'h_nano',acid:'h_acid',sonic:'sonic',omega:'h_gun'});
const sx=(k,o)=>{try{if(typeof PREVIEWING!=='undefined'&&PREVIEWING)return;sfx(k,o);}catch(e){}};
{const _f=bunkerFire;bunkerFire=function(){const r=_f.apply(this,arguments);sx('h_gun');return r;};}
{const _f=acidShot;acidShot=function(){const r=_f.apply(this,arguments);sx('h_acid');return r;};}
{const _f=sonicWave;sonicWave=function(){const r=_f.apply(this,arguments);sx('sonic');return r;};}
{const _f=turnCoat;turnCoat=function(){const r=_f.apply(this,arguments);sx('charm');return r;};}
{const _f=teleFwd;teleFwd=function(){const r=_f.apply(this,arguments);sx('tele');return r;};}
{const _f=argosCall;argosCall=function(){const r=_f.apply(this,arguments);sx('alarm');return r;};}
{const _f=splashUnits;splashUnits=function(){const r=_f.apply(this,arguments);sx('boom',{v:.6});return r;};}
// habilidades de los héroes de siempre (y de Vega): un sonido al lanzarlas
{const _c=castHab;castHab=function(c,k){const H=S.hero,b0=H?H.bcd||0:0,u0=H?H.ucd||0:0;const r=_c.apply(this,arguments);try{if(H&&!H2[H.id]&&((H.bcd||0)>b0||(H.ucd||0)>u0))sx(k==='u'?'h2_ult':'hab');}catch(e){}return r;};}
// reliquias con sonido propio
{const M={trojan:'charm',drone:'boom',implant:'hab',barrel:'h_acid',starmap:'boom',jetpack:'h2_ult',scouter:'zap',satlaser:'zap',gravity:'sonic',clone:'holo',aichip:'holo',beacon:'tele',emp:'zap',cryo:'h_ice',printer:'holo',repro:'poly',shgen:'shield',jammer:'zap',cell:'zap',seal:'sonic',sample:'charm',adren:'hab',core2:'holo',board:'coin'};
 for(const id in M){const Dn=NR[id];if(!Dn||!Dn.use)continue;const u=Dn.use;Dn.use=function(c){const r=u.apply(this,arguments);if(r!==false&&!(id==='printer'&&S.prSrc))sx(M[id]);return r;};}}
// nanitos: zumbido mientras tienen a alguien a tiro
if(typeof window!=='undefined')setInterval(()=>{try{if(typeof S==='undefined'||!S||S.phase!=='wave'||!S.list||(typeof PMU!=='undefined'&&PMU.open)||RL.open)return;
  for(const t of S.list){if(t.type!=='nano')continue;const R=stats(t).range;if(S.enemies.some(e=>e.hp>0&&Math.hypot(e.x-t.x,e.y-t.y)<=R)){sx('h_nano');break;}}}catch(e){}},420);
// Prototipo Omega: cada pieza con su sonido (se cuela en su tic mirando los contadores)
{const _t=omegaTick;omegaTick=function(dt){let pre=null;try{pre=S.list.filter(t=>t.type==='omega').map(t=>[t,Object.assign({},t.oc||{})]);}catch(e){}const r=_t.apply(this,arguments);
 try{for(const[t,o]of pre||[]){const n=t.oc||{},fired=k=>o[k]!=null&&n[k]>o[k];if(fired('fis'))sx('h_gun');if(fired('mag'))sx('h_magic');if(fired('ele'))sx('zap');if(fired('con'))sx('sonic');if(fired('ven'))sx('h_acid');if(fired('fue'))sx('h_fire');}}catch(e){}return r;};}
// transformaciones y hologramas que llegan por otras vías
{const _p=prCopy;prCopy=function(){const r=_p.apply(this,arguments);if(r)sx('holo');return r;};}
