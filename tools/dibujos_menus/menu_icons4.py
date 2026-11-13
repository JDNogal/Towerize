import json,math,re
SP='tools/dibujos_menus'
src=open(SP+'/menu_icons3.py',encoding='utf8').read()
src=src[:src.index("I=[]\ndef A(n,em,txt,svg)")]
exec(src)
# flecha doble: una sola forma, un solo borde
def darrow(y=38,x0=8,x1=40,col='#5ab4ff'):
    return P(f'M{x0} {y}l7 -6v3.4h{x1-x0-14}v-3.4l7 6l-7 6v-3.4h-{x1-x0-14}v3.4z',col,1.8)
def lantern2():return P('M22 16L44 6v22z','#ffe27a',1.6)+P('M4 12h14v10H4z',GY)+P('M18 10h5v14h-5z',DK,1.8)+darrow(37,10,38)
# dado copiado del emoji: 1 rojo arriba; 2 en la cara izquierda (arriba-izquierda y abajo-derecha); 3 en la derecha de abajo-izquierda a arriba-derecha
def dice4():
    s=P('M24 4L42 13L24 22L6 13z','#f4f4f2')+P('M6 13L24 22V43L6 34z','#e2e2e0')+P('M24 22L42 13V34L24 43z','#c8c8c6')
    s+='<g transform="matrix(18 -9 18 9 6 13)"><circle cx=".5" cy=".5" r=".16" fill="#f04a2a"/></g>'
    pip=lambda mat,pts:f'<g transform="matrix({mat})">'+''.join(f'<ellipse cx="{x}" cy="{y}" rx=".13" ry=".1" fill="#2a2a2a"/>' for x,y in pts)+'</g>'
    s+=pip('18 9 0 21 6 13',[(.27,.25),(.73,.75)])
    s+=pip('18 -9 0 21 24 22',[(.27,.75),(.5,.5),(.73,.25)])
    return s
def stopwatch_rw():
    return P('M20 2h8v4h-8z',GY,1.6)+P('M34 8l3 3',K,2.4)+C(24,26,17,'#e05a4a')+C(24,26,13,'#fffaf0',1.6)+L('M24 26V16M24 26l6 4',K,2.4)
# reloj de arena: la arena va recortada dentro del cristal y el contorno se repinta encima (grosor igual en todo el borde)
GLASS='M13 9C13 19 21 20 24 24C21 28 13 29 13 39H35C35 29 27 28 24 24C27 20 35 19 35 9Z'
def hg2(sand='#e8ac42'):
    return ('<g stroke="#1b1712" stroke-linejoin="round" stroke-linecap="round">'
      f'<path d="{GLASS}" fill="#fbf1d8" stroke="none"/>'
      f'<clipPath id="hgc{sand[1:]}"><path d="{GLASS}"/></clipPath><g clip-path="url(#hgc{sand[1:]})">'
      f'<path d="M19.5 19.5H28.5L24 24Z" fill="{sand}" stroke-width="1"/><path d="M24 24v6" stroke="{sand}" stroke-width="2"/>'
      f'<path d="M10 33C15 29.5 20.5 28.5 24 25.5C27.5 28.5 33 29.5 38 33V42H10Z" fill="{sand}" stroke-width="1.2"/></g>'
      f'<path d="{GLASS}" fill="none" stroke-width="2.6"/><path d="M9 8h30M9 40h30" stroke-width="4"/></g>')
I=[]
def A(n,em,txt,svg):I.append((n,em,txt,svg))
A('4','🔦','Luz del Faro: flecha doble de una pieza',lantern2())
A('11','🎲','Dado copiado del emoji',dice4())
A('45','⏱️','Tiempo de combate: borde rojo, esfera blanca',stopwatch_rw())
A('52','⏳','Pausa del avance: borde del cristal igual de grueso',hg2())
A('73','⌛','Apertura del panel: igual, arena azul',hg2('#6ab8ec'))
css='body{margin:0;background:#14161c;font-family:system-ui,sans-serif}.w{width:960px;padding:16px}h2{color:#f4ead8;margin:14px 0 8px;font-size:20px}.g{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}.c{background:#f4ead8;border:2px solid #e0262e;border-radius:6px;padding:6px;text-align:center}.c svg{width:96px;height:96px;display:block;margin:0 auto}.n{font:800 12px system-ui;color:#fff;background:#e0262e;border-radius:9px;padding:0 6px;display:inline-block}.e{font-size:16px;margin-left:4px}.t{font-size:12.5px;color:#2a2018;line-height:1.2;margin-top:4px;min-height:30px}.sm{display:flex;gap:6px;justify-content:center;align-items:center}.sm svg{width:24px!important;height:24px!important;margin:0!important}'
h=f'<!doctype html><html><head><meta charset="utf-8"><style>{css}</style></head><body><div class="w"><h2 style="font-size:24px">Iconos · cuarta ronda</h2><div class="g">'
for n,em,t,s in I:h+=f'<div class="c"><div><span class="n">{n}</span><span class="e">{em}</span></div><svg viewBox="-4 -4 56 56">{s}</svg><div class="sm"><svg viewBox="-4 -4 56 56">{s}</svg></div><div class="t">{t}</div></div>'
open('maquetas/iconos_menus_r4.html','w',encoding='utf8').write(h+'</div></div></body></html>')
json.dump([(a,b,c,f'<svg viewBox="-4 -4 56 56">{d}</svg>') for a,b,c,d in I],open('maquetas/iconos_menus_r4.json','w'),ensure_ascii=False)
# espada suelta, vertical, para cruzarla a mano
sw=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="14 -2 20 44" width="200" height="440">{sword_local()}</svg>'
open('maquetas/espada_suelta.svg','w').write(sw)
