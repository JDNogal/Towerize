// ==================== v306 · Tablet holográfica (libro de la Era Distópica) ====================
// En la Era Distópica el libro es una tablet holográfica: dos agarres de metal que se separan desde el centro y, entre ellos,
// la proyección con el contenido. En el menú se usa la de la última era jugada. Una vez llegas a la era 2, en Personalización
// eliges la que prefieras (o «según la era») y se queda para siempre.
// v308: la tablet solo existe si has llegado a la era 2 (o con el control «Desbloquear la tablet»)
const tabOk=()=>!!(OPT.u_tab||(typeof era2Ok==='function'&&era2Ok()));
function skinNow(){const pref=OPT.skin||'auto';if(!tabOk())return 'perg';if(pref!=='auto')return pref;
 const era=(typeof inMenu==='function'&&inMenu())||typeof S==='undefined'||!S?(typeof ERA!=='undefined'?ERA:1):S.era;return era===2?'holo':'perg';}
{const _ap=applyPal;applyPal=function(){const r=_ap.apply(this,arguments);try{const k=skinNow();document.documentElement.dataset.skin=k;if(k==='holo')document.documentElement.dataset.pal='holo';}catch(e){}return r;};}
if(typeof window!=='undefined')setInterval(()=>{try{const k=skinNow();if(document.documentElement.dataset.skin!==k)applyPal();}catch(e){}},300);
// opción en Personalización (solo cuando ya has llegado a la era 2)
{const i=OPTS.findIndex(o=>o.tab==='ps'&&o.type==='cosm');OPTS.splice(i<0?OPTS.length:i,0,{tab:'ps',type:'choice',show:()=>tabOk(),label:'Libro',desc:'Cómo se ven el menú, el compendio y las opciones: el libro de pergamino de la Era Fantástica, la tablet holográfica de la Era Distópica o el de la era en la que juegas.',get:()=>OPT.skin||'auto',set:v=>{OPT.skin=v;saveOpt();applyPal();},choices:[['auto','Según la era'],['perg','📜 Libro'],['holo','💠 Tablet']]});}

// la portada sabe si viene del libro abierto (para estrechar en vez de abrir desde cerrado)
{const _lr=lbRender;lbRender=function(){const bk=document.querySelector('#comp .bkw'),bw=bk?bk.getBoundingClientRect().width:0;const r=_lr.apply(this,arguments);try{const cv=document.querySelector('#comp .lbcv');if(cv&&bw){cv.classList.add('hnarrow');const cw=cv.getBoundingClientRect().width||1;cv.style.setProperty('--hr',(bw/cw).toFixed(3));}}catch(e){}return r;};}
