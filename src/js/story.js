// ======================= HISTORIA: ÉTER y la Era Fantástica =======================
let STO={p:0,name:'',intro:0};try{STO={...STO,...(JSON.parse(localStorage.getItem('rt-story'))||{})};}catch(e){}
const saveSto=()=>{try{localStorage.setItem('rt-story',JSON.stringify(STO));}catch(e){}};
const escH=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ERAS=['Fantástica','???','???','???','???'];
// fallos de texto: cuanto más dañado el núcleo (Nv 3 → 0), más caracteres corruptos
function glitch(s,lv){if(!OPT.dglitch||!lv)return s;let h=0;for(const c of s)h=(h*31+c.charCodeAt(0))>>>0;const rnd=()=>{h=(h*1103515245+12345)>>>0;return(h>>>8)/16777216;};
 const G='▒░▓█#¿§';let o='',tag=0;for(const w of s.split(' ')){let x=w;if(rnd()<.06*lv&&x.length>2&&/^[A-Za-zÁÉÍÓÚáéíóúÑñ]/.test(x))x=x.slice(0,2)+'-'+x;
  x=[...x].map(c=>/[a-záéíóúñ]/i.test(c)&&rnd()<.03*lv?G[Math.floor(rnd()*G.length)]:c).join('');o+=(o?' ':'')+x;if(lv>=3&&!tag&&rnd()<.12){o+=' [ERR 0x'+Math.floor(rnd()*255).toString(16).toUpperCase().padStart(2,'0')+']';tag=1;}}
 return o;}
const DLG={on:false};
// fallos visuales de ÉTER: letras que se corrompen un instante y sacudidas; más a menudo cuanto más dañado (g 3 → 1)
setInterval(()=>{try{if(!DLG.on||!OPT.dglitch)return;const L=DLG.lines&&DLG.lines[DLG.i];if(!L||!L.g)return;const el=$('dlg');
 if(DLG.gx&&performance.now()>=DLG.gx.u){DLG.gx=null;dlgRender();}
 if(!DLG.gx&&Math.random()<[0,.12,.22,.35][L.g]){const sh=DLG.full.slice(0,Math.floor(DLG.n)),ix=[];for(let i=0;i<sh.length;i++)if(/[a-záéíóúñ]/i.test(sh[i]))ix.push(i);
  if(ix.length){const i=ix[Math.floor(Math.random()*ix.length)],n=Math.random()<.3?Math.min(3,sh.length-i):1,G='▒░▓█';let c='';for(let k=0;k<n;k++)c+=G[Math.floor(Math.random()*G.length)];DLG.gx={i,c,u:performance.now()+90+Math.random()*120};dlgRender();}}
 if(L.g>=2&&Math.random()<(L.g===3?.018:.009)){const b=el.querySelector('.dbx');if(b){b.classList.remove('gk');void b.offsetWidth;b.classList.add('gk');}}}catch(e){}},110);
function playDialog(lines,done){DLG.lines=lines;DLG.i=-1;DLG.done=done;DLG.on=true;const el=$('dlg');el.classList.add('on');el.classList.toggle('big',!!OPT.dbig);dlgNext();}
function dlgShow(){const L0=DLG.lines[DLG.i],L=L0.sys?{...L0,sp:'SISTEMA',g:0,gt:null}:L0,el=$('dlg'),nm=STO.name||'Piloto',txt=(OPT.dglitch&&L.gt?L.gt:L.t).replace(/\{N\}/g,nm);DLG.full=txt;DLG.n=OPT.dtype===false?txt.length:0;DLG.t=0;DLG.wait=0;
 el.innerHTML=`<button class="dsk" data-dlg="skip">Saltar ⏭</button><div class="dbx${L.sp?'':' nar'}${L0.sys?' sys':''}${L.g>=1&&OPT.dglitch?' gl g'+L.g:''}">${L.sp?`<div class="dsp">${L.sp}</div>`:''}<div class="dtx"></div>${L.input?`<div class="din"><input id="dname" maxlength="16" placeholder="Tu nombre" autocomplete="off"><button data-dlg="name">Confirmar</button></div>`:''}<div class="dnx">▶ continuar</div></div>`;
 dlgRender();if(L.input)setTimeout(()=>{const i=$('dname');if(i)i.focus();},50);}
function dlgRender(){const el=$('dlg'),t=el.querySelector('.dtx');if(!t)return;const sh=DLG.full.slice(0,Math.floor(DLG.n)),gx=DLG.gx;if(gx&&gx.i<sh.length&&performance.now()<gx.u){t.textContent='';t.append(sh.slice(0,gx.i));const sp=document.createElement('span');sp.className='gch';sp.textContent=gx.c;t.append(sp,sh.slice(gx.i+gx.c.length));}else t.textContent=sh;const fin=DLG.n>=DLG.full.length,L=DLG.lines[DLG.i];el.querySelector('.dnx').classList.toggle('on',fin&&!L.input);}
function dlgNext(){const L=DLG.lines[DLG.i];if(L&&L.input&&!STO.name)return;DLG.i++;if(DLG.i>=DLG.lines.length){dlgEnd();return;}dlgShow();}
function dlgEnd(){DLG.on=false;$('dlg').classList.remove('on');$('dlg').innerHTML='';const d=DLG.done;DLG.done=null;if(d)d();try{if(S&&S.phase==='place')ui();}catch(e){}}
function dlgTap(){if(!DLG.on)return;if(DLG.n<DLG.full.length){DLG.n=DLG.full.length;dlgRender();return;}dlgNext();}
function dlgName(){const i=$('dname'),v=i&&(i.value||'').trim().slice(0,16);if(!v){if(i)i.focus();return;}STO.name=v;saveSto();dlgNext();}
$('dlg').addEventListener('click',e=>{const b=e.target.closest('[data-dlg]');if(b){e.stopPropagation();if(b.dataset.dlg==='skip'){if(DLG.lines.some((l,i)=>i>DLG.i&&l.input)&&!STO.name){DLG.i=DLG.lines.findIndex(l=>l.input)-1;dlgNext();}else dlgEnd();}else if(b.dataset.dlg==='name')dlgName();return;}if(e.target.tagName==='INPUT')return;dlgTap();});
addEventListener('keydown',e=>{if(!DLG.on)return;if(e.target&&e.target.id==='dname'){if(e.key==='Enter'){e.preventDefault();dlgName();}e.stopImmediatePropagation();return;}if(e.key===' '||e.key==='Enter'||e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();if(e.key==='Escape'){const L=DLG.lines[DLG.i];if(!(L&&L.input))dlgEnd();}else dlgTap();}},true);
(function dlgTick(t0){let last=performance.now();const step=t=>{const dt=Math.min(.1,(t-last)/1000);last=t;
 if(DLG.on&&DLG.full!==undefined){const cps={l:22,n:45,r:95}[OPT.dspd||'n'];if(DLG.n<DLG.full.length){DLG.n=Math.min(DLG.full.length,DLG.n+cps*dt);dlgRender();}
  else if(OPT.dauto&&!DLG.lines[DLG.i].input){DLG.wait+=dt;if(DLG.wait>=(OPT.dwait||2)+DLG.full.length/60)dlgNext();}}
 requestAnimationFrame(step);};requestAnimationFrame(step);})();
// textos (g = nivel de fallo; {N} = nombre del capitán)
const STORY={
 intro:[{t:'El salto debía durar un parpadeo. Duró una eternidad.'},
  {sys:1,t:'Salto temporal interrumpido. Integridad del núcleo: 9 %. Navegación: sin señal.'},
  {sp:'ÉTER',g:3,gt:'Pi-Piloto, ¿me recibe? Daños crít▒cos en el núcleo. No reconozco esta fe░ha… ni este siglo. [ERR 0x3F]',t:'Piloto, ¿me recibe? Daños críticos en el núcleo. No reconozco esta fecha… ni este siglo.'},
  {sp:'ÉTER',g:3,gt:'Hay algo más. Mi energía está atrayendo a… cri-criaturas. Nos han locali▓ado.',t:'Hay algo más. Mi energía está atrayendo a… criaturas. Nos han localizado.'},
  {sp:'ÉTER',g:3,gt:'Si el nú-núcleo cae, nos quedaremos aquí para siempre. Defiéndalo. Yo me encargaré de repar░rme… pieza a pieza.',t:'Si el núcleo cae, nos quedaremos aquí para siempre. Defiéndalo. Yo me encargaré de repararme… pieza a pieza.'}],
 p1:[{sys:1,t:'Fragmento cristalino detectado. Integración 1 de 3 completada. Integridad del núcleo: 38 %.'},{sp:'ÉTER',g:2,gt:'El jefe ha dejado un fragmento cristalino. Es compatible con mis circ▒itos, Pi-Piloto. Pieza integrada: 1 de 3. [ERR 0x1C]',t:'El jefe ha dejado un fragmento cristalino. Es compatible con mis circuitos, Piloto. Pieza integrada: 1 de 3.'},
  {sp:'ÉTER',g:2,gt:'Sistemas de memoria restau▓ados al 12%. Re-recuerdo… una ciudad. Nuestro hogar. Y un destello que lo cubría todo.',t:'Sistemas de memoria restaurados al 12%. Recuerdo… una ciudad. Nuestro hogar. Y un destello que lo cubría todo.'}],
 p2:[{sys:1,t:'Integración 2 de 3 completada. Integridad del núcleo: 71 %. Sensores: en línea.'},{sp:'ÉTER',g:1,gt:'Segunda pieza integrada. Mis sens░res vuelven a funcionar, Piloto.',t:'Segunda pieza integrada. Mis sensores vuelven a funcionar, Piloto.'},
  {sp:'ÉTER',g:1,gt:'Estas criaturas no pertenecen a esta era. Lle▒an por grietas. Algo ha roto el tiempo.',t:'Estas criaturas no pertenecen a esta era. Llegan por grietas. Algo ha roto el tiempo.'}],
 p3:[{sys:1,t:'Integración 3 de 3 completada. Integridad del núcleo: 100 %. Memoria: recuperación parcial.'},{sp:'ÉTER',g:0,t:'Tercera pieza integrada. Núcleo estable.'},
  {sp:'ÉTER',g:0,t:'Registros de tripulación restaurados. Rango: Capitán. Nombre: [datos corruptos]…'},
  {sp:'ÉTER',g:0,t:'Lo siento, Capitán. Hay huecos en mi memoria. ¿Cómo debo llamarle?',input:1},
  {sp:'ÉTER',g:0,t:'{N}… Sí. Ahora lo recuerdo.'},
  {sp:'ÉTER',g:0,t:'Gracias por no rendirte, {N}. Navegación parcial operativa: solo conservo unas coordenadas. Las de casa.'},
  {sp:'ÉTER',g:0,t:'Volvamos a nuestro tiempo. No sé qué nos espera allí… pero esta vez no estás solo.'},
  {sys:1,t:'Coordenadas fijadas. Destino: Ruinas de Neón. Nueva era disponible al empezar partida.'}]};
const ERALINE=()=>STO.p>=3?['¿Listos para el salto, {N}? La Era Fantástica ya no tiene más que darnos… por ahora. Sigo calibrando las coordenadas.',0]:
 [['Núcleo dañado. Necesito los fragmentos que dejan los jefes de esta era para repararme. Gane, Piloto.',3],['Una pieza integrada. Siga así, Piloto.',2],['Solo falta una pieza. Puedo sentirlo.',1]][STO.p];
function renderEra(){LB.step='era';lbOpen('prep');}
function renderEraOld(){const [ln]=ERALINE(),nm=STO.name||'Piloto',done=STO.p>=3;
 $('msetup').innerHTML=`<div class="era"><h3>Era Fantástica</h3><div class="pcs">${[0,1,2].map(i=>`<div class="pc${i<STO.p?' got':''}">${i<STO.p?'💠':''}</div>`).join('')}</div><small>Núcleo ${Math.min(3,STO.p)} / 3${done?'':' · cada partida ganada (con cualquier héroe y duración) repara una pieza'}</small>`+
  `<div class="eter"><b>ÉTER</b>${escH(ln.replace(/\{N\}/g,nm))}</div>${done?'<div class="eline"><span class="on">Fantástica</span><span title="Próximamente">???</span></div>':''}`+
  `<div style="display:flex;gap:10px;justify-content:center"><button class="go" data-a="erago">Continuar</button><button data-a="mback">Volver</button></div></div>`;$('menu').classList.add('setup');}
function storyWin(){if(S.tut||STO.p>=3)return;STO.p++;saveSto();const k='p'+STO.p;setTimeout(()=>playDialog(STORY[k],STO.p>=3?()=>{try{era2Announce();}catch(e){}}:null),400);}
closePrim();init();showMenu();fsMark();requestAnimationFrame(loop);

