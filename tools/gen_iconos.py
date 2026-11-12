# Genera src/js/iconos_svg.js a partir de los iconos aprobados en src/iconos/*_final.json (las maquetas y propuestas viven en maquetas/ y no entran en el juego)
import json,re,os
M='src/iconos/'
def J(f):return json.load(open(M+f))
def inner(s):
    s=re.sub(r'^<svg[^>]*>','',s);s=re.sub(r'</svg>$','',s);return re.sub(r'\s+',' ',s)
maps=[]  # (target expr, svg)
art=[]  # dibujo de la torre en el mapa y en las cartas (icsvg)
def add(expr,svg):maps.append((expr,inner(svg)))
# habilidades de torres
for f in ['habilidades_e1_final.json','habilidades_e2_final.json','habilidades_torres_evento_final.json']:
    for k,v in J(f).items():
        if not k.startswith('_'):add(f"AB[{json.dumps(k)}]",v)
# especializaciones
SP={'treb':'cata.treb','ogre':'cata.ogre','hel':'frost.hel','vent':'frost.vent','lord':'augur.lord','herald':'augur.herald','foco':'orb.foco','reap':'orb.reap','altarm':'altar.altar','fist':'monk.fist','drunk':'monk.drunk','pal':'bastion.pal','ass':'bastion.ass','volc':'sala.volc','forge':'sala.forge','rapid':'arrow.rapid','xbow':'arrow.xbow','pest':'poison.pest','alch':'poison.alch',
 'red':'laser.red','arcov':'laser.volt','hack':'nano.hack','devora':'nano.devour','muro':'flame.muro','deton':'flame.detn','nido':'bunker.nido','supr':'bunker.sup','kami':'robots.kami','mecha':'robots.mecha','heli':'dron.dron','petro':'dron.petro','riel':'cannon.rail','bomb2':'cannon.bomb','senda':'altar.senda','corro':'acid.corr','nube':'acid.cloud','colmena':'alien.hive','depre':'alien.pred','rave':'sonic.spk','gigante':'sonic.giant'}
BASE={'base_acid':'acid','base_sonic':'sonic','base_bunker':'bunker','base_dron':'dron'}
for f in ['especializaciones_e1_final.json','especializaciones_e2_final.json']:
    for k,v in J(f).items():
        if k in SP:t,s=SP[k].split('.');add(f"SPECS[{json.dumps(t)}][{json.dumps(s)}]",v);art.append(('spec',t,s,inner(v)))
        elif k in BASE:add(f"TW[{json.dumps(BASE[k])}]",v);art.append(('tw',BASE[k],None,inner(v)))
# reliquias
for f in ['reliquias_e1_final.json','reliquias_e2_final.json']:
    for k,v in J(f).items():
        if not k.startswith('_'):add(f"RELIC[{json.dumps(k)}]",v)
# unidades invocadas
U={'bear':'BEASTS.bear','warg':'BEASTS.wolf','panther':'BEASTS.panther','ghost':'SPECT.spectre','knight':'SPECT.knight','guitar':'SPECT.guit'}
for k,v in J('unidades_final.json').items():
    if k in U:a,b=U[k].split('.');add(f"{a}[{json.dumps(b)}]",v)
# torres de evento
te=J('torres_evento_final.json')
for k,e in [('faro','TW.faro'),('guild','TW.guild'),('glut','TW.glut'),('dr_1','TW.dragon'),('pig_straw','PIGU.straw'),('pig_wood','PIGU.wood'),('pig_brick','PIGU.brick'),('pig_mecha','PIGU.mech')]:
    a,b=e.split('.');add(f"{a}[{json.dumps(b)}]",te[k])
    if a=='TW':art.append(('tw',b,None,inner(te[k])))
for i,k in enumerate(['dr_1','dk1','dk2','dk3']):add(f"DRAG[{i}]",te[k])
# habilidades de los héroes
for f in ['habilidades_heroes_e1_final.json','habilidades_heroes_e2_final.json']:
    for k,v in J(f).items():
        if k.startswith('_') or k=='korr_emb':continue
        h,s=k.split('_');add(f"HAB[{json.dumps(h)}][{json.dumps(s)}]",v)
# palabras clave del compendio
KW={}
for f in ['estados_final.json','tipos_dano_final.json','estadisticas_final.json']:
    for k,v in J(f).items():
        if not k.startswith('_'):KW[k]=inner(v)
for a,b in {'uhp':'ehp','umr':'amagic','eud':'dmg','eac':'cool','erg':'rng','hlv':'lvl','hrez':'urez','rgn':'regen'}.items():KW[a]=KW[b]
extra={'emb':inner(J('habilidades_heroes_e2_final.json')['korr_emb'])}
out="// ==================== v308 · ICONOS DIBUJADOS (estilo B) ====================\n"
out+="// Generado con tools/gen_iconos.py a partir de src/iconos/*_final.json. No editar a mano.\n"
out+="// Cada icono recibe un carácter de uso privado (U+E000…) como «ic»: en la interfaz se cambia por su dibujo SVG;\n// en el lienzo (que no admite SVG) se dibuja el emoji de antes.\n"
out+="const ICSV={},ICFB={};let ICN=0xE000;\n"
out+="const icReg=(o,svg)=>{if(!o)return;const ch=String.fromCodePoint(ICN++);ICFB[ch]=o.ic||'';ICSV[ch]=svg;o.ic=ch;return ch;};\n"
out+="const ICKW="+json.dumps(KW,ensure_ascii=False)+";\n"
out+="const ICX="+json.dumps(extra,ensure_ascii=False)+";\n"
out+="const ICBG={\"altar.altar\":\"#ece0ff\"};\n"
out+="const ICART="+json.dumps(art,ensure_ascii=False)+";\n"
out+="try{\n"
for e,s in maps: out+=f"icReg(typeof {e.split('[')[0]}!=='undefined'?{e}:null,{json.dumps(s,ensure_ascii=False)});\n"
out+="""}catch(e){console.warn('iconos',e);}
// palabras clave: MECG (lista del compendio) y MECI (búsqueda por id)
{const kwIc={};for(const[g,l]of MECG)for(const it of l){const svg=ICKW[it[0]];if(!svg)continue;const o={ic:it[2]};const ch=icReg(o,svg);it[2]=ch;kwIc[it[0]]=ch;}
 if(typeof MECI!=='undefined')for(const id in kwIc)if(MECI[id])MECI[id].ic=kwIc[id];}
const ICRX=/[\\uE000-\\uF8FF]/;
const icSvg=ch=>'<svg class="icsv" viewBox="-4 -4 56 56" aria-hidden="true">'+ICSV[ch]+'</svg>';
// lienzo: el carácter privado vuelve a su emoji
if(typeof CanvasRenderingContext2D!=='undefined'){const ft2=CanvasRenderingContext2D.prototype.fillText,mt2=CanvasRenderingContext2D.prototype.measureText;
 const back=t=>typeof t==='string'&&ICRX.test(t)?t.replace(/[\\uE000-\\uF8FF]/g,c=>ICFB[c]||''):t;
 const ICIM={},icImg=ch=>{let im=ICIM[ch];if(!im){im=new Image();im.src='data:image/svg+xml;utf8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 56 56">'+ICSV[ch]+'</svg>');ICIM[ch]=im;}return im;};
 // un icono dibujado, él solo: se pinta su dibujo, al tamaño de la letra y respetando la alineación (si aún no ha cargado, el emoji de antes)
 CanvasRenderingContext2D.prototype.fillText=function(t,x,y,...a){if(typeof t==='string'&&t.length===1&&ICSV[t]){const im=icImg(t);if(im.complete&&im.naturalWidth){const m=/(\\d+(?:\\.\\d+)?)px/.exec(this.font),sz=(m?+m[1]:16)*1.2,al=this.textAlign,bl=this.textBaseline,dx=al==='center'?-sz/2:(al==='right'||al==='end')?-sz:0,dy=bl==='middle'?-sz/2:(bl==='top'||bl==='hanging')?0:bl==='bottom'?-sz:-sz*.85;this.drawImage(im,x+dx,y+dy,sz,sz);return;}}
  return ft2.call(this,back(t),x,y,...a);};
 CanvasRenderingContext2D.prototype.measureText=function(t){return mt2.call(this,back(t));};}
// interfaz: cada carácter privado se cambia por su dibujo
{const fixI=n=>{if(n.nodeType===3){if(!ICRX.test(n.data)||!n.parentNode)return;const p=n.parentNode;if(p.tagName==='TITLE'||p.tagName==='OPTION'||p.tagName==='TEXTAREA'){n.data=n.data.replace(/[\\uE000-\\uF8FF]/g,c=>ICFB[c]||'');return;}
   const fr=document.createDocumentFragment();let buf='';for(const c of n.data){if(ICSV[c]){if(buf){fr.appendChild(document.createTextNode(buf));buf='';}const t=document.createElement('template');t.innerHTML=icSvg(c);fr.appendChild(t.content.firstChild);}else buf+=c;}
   if(buf)fr.appendChild(document.createTextNode(buf));p.replaceChild(fr,n);return;}
  if(n.nodeType===1&&n.tagName!=='SCRIPT'&&n.tagName!=='STYLE'){if(n.namespaceURI==='http://www.w3.org/2000/svg')return;const w=document.createTreeWalker(n,NodeFilter.SHOW_TEXT),Ls=[];let x;while((x=w.nextNode()))if(ICRX.test(x.data))Ls.push(x);Ls.forEach(fixI);
   for(const at of ['title','aria-label','placeholder'])n.querySelectorAll&&n.querySelectorAll('['+at+']').forEach(e=>{const v=e.getAttribute(at);if(v&&ICRX.test(v))e.setAttribute(at,v.replace(/[\\uE000-\\uF8FF]/g,c=>ICFB[c]||''));});}};
 const mo2=new MutationObserver(ms=>{for(const m of ms){if(m.type==='characterData')fixI(m.target);else m.addedNodes.forEach(fixI);}});
 const go2=()=>{fixI(document.body);mo2.observe(document.body,{childList:true,subtree:true,characterData:true});};
 if(document.body)go2();else addEventListener('DOMContentLoaded',go2);}
// terrestre y volador (esquina de las cartas de torre y fichas)
var ICTG=icReg({ic:'🥾'},ICKW.ground);var ICTA=icReg({ic:'🪽'},ICKW.fly);
// dibujo de las torres (mapa, cartas y fichas): base y especializaciones de Nv 4
for(const[kind,t,sp,svg]of ICART){const full='<svg viewBox=\"-4 -4 56 56\">'+svg+'</svg>';try{if(kind==='tw'&&TW[t]){TW[t].icsvg=full;delete TW[t].icimg;}else if(kind==='spec'&&SPECS[t]&&SPECS[t][sp]){const X=SPECS[t][sp];const ob=ICBG[t+'.'+sp]?{icsvg:full,icbg:ICBG[t+'.'+sp]}:{icsvg:full};X.o=Object.assign({},X.o||{},ob);X.icsvg=full;}}catch(e){}}
// unidades en el mapa: las de una especialización llevan el dibujo de su especialización; el dragón bebé, el suyo
if(typeof UIC!=='undefined'){for(const[u,t,s]of[['pal','bastion','pal'],['ass','bastion','ass'],['fist','monk','fist'],['drunk','monk','drunk'],['kami','robots','kami'],['mecha','robots','mecha']])if(SPECS[t]&&SPECS[t][s]&&ICSV[SPECS[t][s].ic])UIC[u]=SPECS[t][s].ic;if(typeof DRAG!=='undefined'&&ICSV[DRAG[1].ic])UIC.dragon=DRAG[1].ic;}
// Korr: nombres nuevos
if(typeof HAB!=='undefined'&&HAB.korr){HAB.korr.b.n='Señuelo psiónico';HAB.korr.p8.n='Represalia';}
"""
# ---- interfaz del libro (portada y cintas) ----
ST=J('estadisticas_final.json')
UI={'dur':inner(ST['dur']),'ehp':inner(ST['ehp']),'cool':inner(ST['cool']),
 'play':'<path d="M13 6L41 24L13 42Z" fill="currentColor" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>',
 'door':'<g stroke="#1b1712" stroke-width="2.4" stroke-linejoin="round"><path d="M10 2h28v44H10z" fill="#6a4020"/><path d="M14 6h20v40H14z" fill="#a8743a"/><path d="M18 10h12v14H18zM18 28h12v14H18z" fill="none" stroke-width="1.6"/><circle cx="30" cy="27" r="2.2" fill="#f2c94c" stroke-width="1.4"/></g>',
 'save':'<g stroke="#1b1712" stroke-width="2.4" stroke-linejoin="round"><path d="M6 4h30l8 8v32H6z" fill="#4a6a9a"/><path d="M13 4h20v13H13z" fill="#e8eef4"/><path d="M27 7v7" stroke-width="3"/><path d="M12 27h24v17H12z" fill="#f4ead8"/><path d="M16 33h16M16 38h12" stroke="#a08060" stroke-width="1.6"/></g>',
 'flag':'<g stroke="#1b1712" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"><path d="M10 4v42" stroke-width="3.2"/><path d="M10 6q8-5 16 0t16 0v20q-8 5-16 0t-16 0z" fill="#f4f4f0"/></g>',
 'cap':'<g stroke="#1b1712" stroke-width="2.4" stroke-linejoin="round"><path d="M12 22v10q12 8 24 0V22" fill="#3a3e48"/><path d="M2 18L24 8l22 10-22 10z" fill="#2a2e38"/><path d="M40 21v12" fill="none" stroke="#1b1712" stroke-width="5.4" stroke-linecap="round"/><path d="M40 21v12" fill="none" stroke="#f2c94c" stroke-width="2.4" stroke-linecap="round"/><circle cx="40" cy="35" r="2.6" fill="#f2c94c" stroke-width="1.4"/></g>'}
LAT={'perg':{
 'cr':'<g stroke="#1b1410" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"><path d="M16 14h32v34H16z" fill="#f4ead8"/><path d="M12 8h38a4 4 0 0 1 0 8H12a4 4 0 0 1 0-8z" fill="#d8c090"/><path d="M12 44h38a4 4 0 0 1 0 8H12a4 4 0 0 1 0-8z" fill="#d8c090"/><path d="M22 24h20M22 31h20M22 38h12" stroke="#a08060" stroke-width="1.8"/><path d="M42 36l2 4 4 .6-3 2.8.8 4.2-3.8-2-3.8 2 .8-4.2-3-2.8 4-.6z" fill="#c0392b" stroke-width="1.2"/></g>',
 'st':'<g stroke="#1b1410" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"><path d="M8 8h48v48H8z" fill="#f4ead8"/><path d="M16 46V34h8v12zM28 46V22h8v24zM40 46V28h8v18z" fill="#c0392b"/><path d="M12 48h40" fill="none"/></g>'},
 'holo':{'st':'<path d="M8 8h48v48h-48z" fill="none" stroke="#3fe8ff" stroke-width="3.2" stroke-linejoin="round"/><path d="M18 46V34M30 46V22M42 46V28" fill="none" stroke="#ff4fd8" stroke-width="6" stroke-linecap="round"/>'}}
out+="const ICUIS="+json.dumps(UI,ensure_ascii=False)+",ICLAT="+json.dumps(LAT,ensure_ascii=False)+";\n"
out+="""
// interfaz: portada del libro, cintas y Sí/No de acumulable
var ICU={};for(const k in ICUIS)ICU[k]=icReg({ic:''},ICUIS[k]);
var ICSI=icReg({ic:'Sí'},ICKW.stk_si),ICNO=icReg({ic:'No'},ICKW.stk_no);
if(typeof LATSVG!=='undefined')for(const sk in ICLAT)for(const k in ICLAT[sk])if(!LATSVG[sk][k])LATSVG[sk][k]=ICLAT[sk][k];
if(typeof LB!=='undefined'&&LB.open)try{lbRender();}catch(e){}
"""
open('src/js/iconos_svg.js','w').write(out)
print(len(maps),'iconos +',len(KW),'palabras clave', os.path.getsize('src/js/iconos_svg.js'))
