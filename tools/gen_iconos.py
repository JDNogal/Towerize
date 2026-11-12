# Genera src/js/iconos_svg.js a partir de los iconos aprobados en maquetas/*_final.json
import json,re,os
M='maquetas/'
def J(f):return json.load(open(M+f))
def inner(s):
    s=re.sub(r'^<svg[^>]*>','',s);s=re.sub(r'</svg>$','',s);return re.sub(r'\s+',' ',s)
maps=[]  # (target expr, svg)
def add(expr,svg):maps.append((expr,inner(svg)))
# habilidades de torres
for f in ['habilidades_e1_final.json','habilidades_e2_final.json']:
    for k,v in J(f).items():
        if not k.startswith('_'):add(f"AB[{json.dumps(k)}]",v)
# especializaciones
SP={'treb':'cata.treb','ogre':'cata.ogre','hel':'frost.hel','vent':'frost.vent','lord':'augur.lord','herald':'augur.herald','foco':'orb.foco','reap':'orb.reap','altarm':'altar.altar','fist':'monk.fist','drunk':'monk.drunk','pal':'bastion.pal','ass':'bastion.ass','volc':'sala.volc','forge':'sala.forge','rapid':'arrow.rapid','xbow':'arrow.xbow','pest':'poison.pest','alch':'poison.alch',
 'red':'laser.red','arcov':'laser.volt','hack':'nano.hack','devora':'nano.devour','muro':'flame.muro','deton':'flame.detn','nido':'bunker.nido','supr':'bunker.sup','kami':'robots.kami','mecha':'robots.mecha','heli':'dron.dron','corro':'acid.corr','nube':'acid.cloud','colmena':'alien.hive','depre':'alien.pred','rave':'sonic.spk','gigante':'sonic.giant'}
BASE={'base_acid':'acid','base_sonic':'sonic','base_bunker':'bunker','base_dron':'dron'}
for f in ['especializaciones_e1_final.json','especializaciones_e2_final.json']:
    for k,v in J(f).items():
        if k in SP:t,s=SP[k].split('.');add(f"SPECS[{json.dumps(t)}][{json.dumps(s)}]",v)
        elif k in BASE:add(f"TW[{json.dumps(BASE[k])}]",v)
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
for a,b in {'uhp':'ehp','umr':'amagic','eud':'dmg','eac':'cool','erg':'rng','hlv':'lvl','hrez':'urez'}.items():KW[a]=KW[b]
extra={'emb':inner(J('habilidades_heroes_e2_final.json')['korr_emb'])}
out="// ==================== v308 · ICONOS DIBUJADOS (estilo B) ====================\n"
out+="// Generado con tools/gen_iconos.py a partir de maquetas/*_final.json. No editar a mano.\n"
out+="// Cada icono recibe un carácter de uso privado (U+E000…) como «ic»: en la interfaz se cambia por su dibujo SVG;\n// en el lienzo (que no admite SVG) se dibuja el emoji de antes.\n"
out+="const ICSV={},ICFB={};let ICN=0xE000;\n"
out+="const icReg=(o,svg)=>{if(!o)return;const ch=String.fromCodePoint(ICN++);ICFB[ch]=o.ic||'';ICSV[ch]=svg;o.ic=ch;return ch;};\n"
out+="const ICKW="+json.dumps(KW,ensure_ascii=False)+";\n"
out+="const ICX="+json.dumps(extra,ensure_ascii=False)+";\n"
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
 CanvasRenderingContext2D.prototype.fillText=function(t,...a){return ft2.call(this,back(t),...a);};
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
// Korr: nombres nuevos
if(typeof HAB!=='undefined'&&HAB.korr){HAB.korr.b.n='Señuelo psiónico';HAB.korr.p8.n='Represalia';}
"""
open('src/js/iconos_svg.js','w').write(out)
print(len(maps),'iconos +',len(KW),'palabras clave', os.path.getsize('src/js/iconos_svg.js'))
