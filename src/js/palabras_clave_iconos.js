// ==================== v352 · PALABRAS CLAVE: icono + subrayado punteado (Mesa, opción D) ====================
// Toda palabra clave con bocadillo lleva subrayado punteado (el convenio de «aquí hay una explicación») y peso medio, para no confundirse con las negritas.
// Delante, su icono dibujado (los mismos de las fichas, ICKW; nunca emojis). Opciones → «Iconos en las palabras clave» los quita y deja solo el punteado.
{const st=document.createElement('style');let css='.kw:not(.gico):not(.kwself){font-weight:600;text-decoration:underline dotted;text-decoration-thickness:1.5px;text-underline-offset:3px}'+
 '.kw:not(.gico):not(.kwself):hover{text-decoration-style:solid}'+
 'body.kwico .kw[data-kw]:not(.gico)::before{content:"";display:inline-block;width:1.05em;height:1.05em;margin-right:.18em;vertical-align:-.17em;background:center/contain no-repeat}';
 for(const id in ICKW)css+=`body.kwico .kw[data-kw="${id}"]:not(.gico)::before{background-image:url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 56 56">'+ICKW[id]+'</svg>')}")}`;
 st.textContent=css;document.head.appendChild(st);}
OPTS.splice(OPTS.findIndex(o=>o.key==='fx')+1,0,{tab:'gf',type:'toggle',key:'kwico',def:true,label:'Iconos en las palabras clave',desc:'Pone delante de cada palabra clave (quemadura, veneno, ralentizado…) su icono. Desactivado, solo queda el subrayado punteado que indica que tiene explicación.'});
if(OPT.kwico===undefined)OPT.kwico=true;
const kwIcoSync=()=>document.body.classList.toggle('kwico',OPT.kwico!==false);kwIcoSync();
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('[data-a="opt"]'))setTimeout(kwIcoSync,0);});
