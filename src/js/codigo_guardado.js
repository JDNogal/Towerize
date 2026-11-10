// ==================== v305 · Código de guardado (copiar el progreso y la partida a otro ordenador) ====================
// Opciones → 💾 Guardado. «Crear código» junta todo: el progreso (lo que guarda el navegador con rt-…) y la partida en curso
// (la de IndexedDB). Sale un texto que se puede copiar o descargar como .txt. En el otro ordenador, «Cargar código» lo pega
// (o abre el .txt), sustituye lo que hubiera y recarga la página.
// El estado de la partida tiene referencias cruzadas (unidades ↔ torre, enemigos ↔ objetivos…), Map, Set, Infinity…:
// se guarda como un grafo (cada objeto una vez, con referencias) para que al cargar quede exactamente igual.
const SVX={code:'',inp:'',msg:'',ask:0,busy:0};
const SVXP='TWZ1.',SVXP0='TWZ0.';
function svxEnc(root){const ids=new Map(),N=[];
 const ref=v=>{if(v===undefined)return{$u:1};if(v===null||typeof v==='boolean'||typeof v==='string')return v;
  if(typeof v==='number')return Number.isFinite(v)?v:{$n:Number.isNaN(v)?'nan':v>0?'inf':'-inf'};
  if(typeof v==='bigint')return{$b:String(v)};if(typeof v==='function'||typeof v==='symbol')return{$u:1};
  if(ids.has(v))return{$r:ids.get(v)};const id=N.length;ids.set(v,id);N.push(null);N[id]=node(v);return{$r:id};};
 const node=v=>{if(Array.isArray(v))return{a:v.map(ref)};if(v instanceof Map)return{m:[...v].map(([k,x])=>[ref(k),ref(x)])};if(v instanceof Set)return{s:[...v].map(ref)};
  if(v instanceof Date)return{d:v.getTime()};if(ArrayBuffer.isView(v))return{t:v.constructor.name,v:Array.from(v)};
  if(typeof Element!=='undefined'&&v instanceof Element)return{o:{}};const o={};for(const k of Object.keys(v))o[k]=ref(v[k]);return{o};};
 const r=ref(root);return{r,N};}
function svxDec(g){const N=g.N,out=new Array(N.length),done=new Array(N.length);
 const val=x=>{if(x===null||typeof x!=='object')return x;if(x.$u)return undefined;if(x.$n)return x.$n==='nan'?NaN:x.$n==='inf'?Infinity:-Infinity;if(x.$b!=null)return BigInt(x.$b);if(x.$r!=null)return mk(x.$r);return x;};
 const mk=id=>{if(out[id]!==undefined||done[id])return out[id];const n=N[id];let o;
  if(n.a){o=new Array(n.a.length);out[id]=o;done[id]=1;n.a.forEach((x,i)=>{o[i]=val(x);});}
  else if(n.m){o=new Map();out[id]=o;done[id]=1;for(const [k,x] of n.m)o.set(val(k),val(x));}
  else if(n.s){o=new Set();out[id]=o;done[id]=1;for(const x of n.s)o.add(val(x));}
  else if(n.d!=null){o=new Date(n.d);out[id]=o;done[id]=1;}
  else if(n.t){const C=globalThis[n.t]||Array;o=C.from?C.from(n.v):n.v;out[id]=o;done[id]=1;}
  else{o={};out[id]=o;done[id]=1;for(const k in n.o)o[k]=val(n.o[k]);}
  return o;};
 return val(g.r);}
// texto ↔ bytes comprimidos ↔ base64
const svxB64=u8=>{let s='';for(let i=0;i<u8.length;i+=0x8000)s+=String.fromCharCode.apply(null,u8.subarray(i,i+0x8000));return btoa(s);};
const svxU8=b=>{const s=atob(b),u=new Uint8Array(s.length);for(let i=0;i<s.length;i++)u[i]=s.charCodeAt(i);return u;};
async function svxPack(obj){const txt=JSON.stringify(obj);
 if(typeof CompressionStream==='undefined')return SVXP0+svxB64(new TextEncoder().encode(txt));
 const buf=await new Response(new Blob([txt]).stream().pipeThrough(new CompressionStream('gzip'))).arrayBuffer();return SVXP+svxB64(new Uint8Array(buf));}
async function svxUnpack(code){code=String(code||'').replace(/\s+/g,'');let txt;
 if(code.startsWith(SVXP)){if(typeof DecompressionStream==='undefined')throw new Error('Este navegador no puede leer códigos comprimidos.');
  txt=await new Response(new Blob([svxU8(code.slice(SVXP.length))]).stream().pipeThrough(new DecompressionStream('gzip'))).text();}
 else if(code.startsWith(SVXP0))txt=new TextDecoder().decode(svxU8(code.slice(SVXP0.length)));
 else throw new Error('Eso no parece un código de guardado de Towerize.');
 const o=JSON.parse(txt);if(!o||o.f!=='towerize')throw new Error('Eso no parece un código de guardado de Towerize.');return o;}
// crear el código: progreso + partida en curso (si estás jugando, primero se guarda tal como está)
async function svxMake(){SVX.busy=1;SVX.msg='Creando el código…';renderOpts();
 try{try{if(typeof svLive==='function'&&svLive())await saveRun('build');}catch(e){}
  const ls={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&k.startsWith('rt-'))ls[k]=localStorage.getItem(k);}
  let run=null;try{if(svOk())run=await svGet();}catch(e){}
  const ver=(($('ver')&&$('ver').textContent)||'').trim();
  SVX.code=await svxPack({f:'towerize',v:1,ver,t:Date.now(),ls,run:run?svxEnc(run):null});
  const m=run&&run.meta;SVX.msg='Código listo'+(m?` (con la partida en curso: ${m.heroN||''} · ronda ${m.round}/${m.rounds})`:' (sin partida en curso)')+'. Cópialo o descárgalo y pégalo en el otro ordenador.';}
 catch(e){SVX.code='';SVX.msg='⚠️ No se ha podido crear el código: '+e.message;}
 SVX.busy=0;renderOpts();}
// cargar un código: sustituye el progreso y la partida guardada de este navegador y recarga
async function svxLoad(code){SVX.busy=1;renderOpts();
 try{const o=await svxUnpack(code);
  const old=[];for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&k.startsWith('rt-'))old.push(k);}for(const k of old)localStorage.removeItem(k);
  for(const k in o.ls)localStorage.setItem(k,o.ls[k]);
  if(svOk()){if(o.run)await svPut(svxDec(o.run));else await svDel().catch(()=>{});}
  try{SAV.meta=null;}catch(e){}SVX.msg='✓ Cargado. Recargando…';renderOpts();  SVX.reloading=1;setTimeout(()=>location.reload(),400);}
 catch(e){SVX.msg='⚠️ '+e.message;SVX.busy=0;SVX.ask=0;renderOpts();}}
// al recargar tras cargar un código no hay que volver a guardar la partida que estaba abierta (pisaría la cargada)
{const _s=saveRun;saveRun=function(){if(SVX.reloading)return Promise.resolve(false);return _s.apply(this,arguments);};}
// ---- pestaña de opciones ----
OTABS.push(['sv','Guardado','💾']);
OPTS.push({tab:'sv',type:'svx',label:'Código de guardado',desc:'Copia tu progreso y la partida en curso a otro ordenador o navegador.'});
LBOPTXT.sv='Crea un código con todo tu progreso (compendio, logros, desbloqueos, opciones) y la partida que tengas a medias. En el otro ordenador, pégalo en «Cargar código» (o abre el archivo .txt): sustituye lo que hubiera allí.';
const svxEsc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
function svxHTML(){const inG=!document.body.classList.contains('inmenu');const kb=SVX.code?Math.round(SVX.code.length/1024):0;
 return `<div class="svx">
 <h3 class="osec">Copiar a otro sitio</h3>
 <p class="svxp">Crea un código con tu progreso${inG?' y esta partida (se guarda tal como está)':' y la partida que tengas a medias'}.</p>
 <div class="svxb"><button class="go" data-sx="make"${SVX.busy?' disabled':''}>💾 Crear código</button>${SVX.code?`<button data-sx="copy">📋 Copiar</button><button data-sx="dl">⬇ Descargar .txt</button>`:''}</div>
 ${SVX.code?`<textarea class="svxt" readonly data-sx="out">${svxEsc(SVX.code)}</textarea><small class="svxs">${kb?kb+" KB":"menos de 1 KB"}</small>`:''}
 <h3 class="osec">Cargar desde otro sitio</h3>
 <p class="svxp">Pega aquí el código (o abre el archivo .txt). <b>Sustituye</b> el progreso y la partida guardada de este navegador.</p>
 <textarea class="svxt" data-sx="in" placeholder="TWZ1.…">${svxEsc(SVX.inp)}</textarea>
 <div class="svxb"><button data-sx="file">📂 Abrir archivo…</button><button class="${SVX.ask?'warn':'go'}" data-sx="load"${SVX.busy||!SVX.inp.trim()?' disabled':''}>${SVX.ask?'¿Seguro? Pulsa otra vez':'Cargar código'}</button></div>
 ${SVX.msg?`<div class="svxm">${svxEsc(SVX.msg)}</div>`:''}</div>`;}
{const _b=optBody;optBody=function(book){const r=_b.apply(this,arguments);if(OP.tab==='sv')r.body=svxHTML();return r;};}
document.addEventListener('input',e=>{const t=e.target;if(t&&t.dataset&&t.dataset.sx==='in'){SVX.inp=t.value;SVX.ask=0;const b=document.querySelector('[data-sx="load"]');if(b){b.disabled=!SVX.inp.trim()||!!SVX.busy;b.classList.remove('warn');b.classList.add('go');b.textContent='Cargar código';}}});
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('button[data-sx]');if(!b)return;e.preventDefault();e.stopPropagation();const a=b.dataset.sx;try{sfx('ui');}catch(er){}
 if(a==='make')svxMake();
 else if(a==='copy'){const t=document.querySelector('[data-sx="out"]');const done=()=>{SVX.msg='✓ Copiado. Pégalo en «Cargar código» en el otro ordenador.';renderOpts();};
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(SVX.code).then(done,()=>{if(t){t.select();document.execCommand('copy');}done();});else{if(t){t.select();document.execCommand('copy');}done();}}
 else if(a==='dl'){const d=new Date(),p=n=>String(n).padStart(2,'0');const a2=document.createElement('a');a2.href=URL.createObjectURL(new Blob([SVX.code],{type:'text/plain'}));
  a2.download=`towerize-guardado-${d.getFullYear()}${p(d.getMonth()+1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}.txt`;document.body.appendChild(a2);a2.click();setTimeout(()=>{URL.revokeObjectURL(a2.href);a2.remove();},500);}
 else if(a==='file'){const f=document.createElement('input');f.type='file';f.accept='.txt,text/plain';f.onchange=()=>{const x=f.files&&f.files[0];if(!x)return;x.text().then(t=>{SVX.inp=t.trim();SVX.ask=0;SVX.msg='Archivo leído: '+x.name;renderOpts();});};f.click();}
 else if(a==='load'){if(!SVX.inp.trim())return;if(!SVX.ask){SVX.ask=1;renderOpts();return;}svxLoad(SVX.inp);}},true);
