import json,math,re
SP='tools/dibujos_menus'
src=open(SP+'/menu_icons2.py',encoding='utf8').read()
src=src[:src.index("I=[]\ndef A(n,em,txt,svg)")]
exec(src)
# ---- espadas: se cruzan a mitad de la hoja ----
def sword_local():  # hoja de y=0 (punta) a y=26 (guarda); mitad de la hoja en y=13
    return P('M22.6 0h2.8l1.4 3v23h-5.6V3z','#d8dee6',1.8)+L('M24 4v20','#ffffff',1)+P('M19.5 26h9v3.2h-9z',GD,1.8)+P('M22.5 29.2h3v7h-3z',WD,1.6)+C(24,38,1.9,GD,1.4)
def swords3(cx=24,cy=19,s=1):
    one=lambda r:f'<g transform="translate({cx} {cy}) scale({s}) rotate({r}) translate(-24 -13)">{sword_local()}</g>'
    return one(-45)+one(45)
# ---- candados ----
def lock3(open_=False):
    sh=Lk('M16 21v-6a8 8 0 0 1 16 0v-1',3,GY) if open_ else Lk('M16 21v-6a8 8 0 0 1 16 0v6',3,GY)
    if open_: sh=Lk('M16 21v-6a8 8 0 0 1 16 0',3,GY)
    if open_:
        sh=G('translate(-8 -3)',inner=Lk('M24 24v-9a8 8 0 0 1 16 0v1',3,GY))
    body=P('M10 21h28v22H10z',GD)+clip('lk3'+str(open_),'M10 21h28v22H10z',L('M10 25h28','#ffe9a0',1.6))+P('M10 21h28v22H10z','none')
    return sh+body+C(24,30,3.2,K,0)+P('M22.3 31h3.4l1 7h-5.4z',K,0)
def unlocked3(item):return G('translate(-2 -2) scale(.9)',inner=item)+G('translate(26 24) scale(.48)',inner=lock3(True))
# ---- dado: caras con su propia perspectiva ----
def pips(mat,pts):return f'<g transform="matrix({mat})">'+''.join(f'<circle cx="{x}" cy="{y}" r=".12" fill="#1b1712"/>' for x,y in pts)+'</g>'
def dice3():
    s=P('M24 4L42 13L24 22L6 13z','#fffaf0')+P('M6 13L24 22V43L6 34z','#efe4cc')+P('M24 22L42 13V34L24 43z','#d8c8a8')
    s+=f'<g transform="matrix(18 -9 18 9 6 13)"><circle cx=".5" cy=".5" r=".15" fill="#d8453a"/></g>'
    s+=pips('18 9 0 21 6 13',[(.27,.27),(.73,.73)])
    s+=pips('18 -9 0 21 24 22',[(.27,.27),(.5,.5),(.73,.73)])
    return s
# ---- héroes: el casco delante del cuerpo, cabezas pegadas ----
def heroes4():
    def bust(x,y,sc,body,head):return f'<g transform="translate({x} {y}) scale({sc})">{body}{head}</g>'
    wiz=bust(-3,10,.62,P('M10 46q0-16 14-16t14 16z',PU),C(24,24,7.5,'#f0c8a0')+P('M14 20q10-22 20 0z',PU,1.8)+P('M12 20h24v3H12z',PU,1.6))
    arc=bust(22,10,.62,P('M10 46q0-16 14-16t14 16z','#4a8a4a'),C(24,24,7.5,'#f0c8a0')+P('M15 23q0-12 9-12t9 12q-3-5-9-5t-9 5z','#3a6a3a',1.8))
    hm='M14 33V22a10 10 0 0 1 20 0v11z'
    kn=bust(6,4,.75,P('M6 50q0-16 18-16t18 16z',RD),P(hm,'#c8ccd4')+clip('hk4',hm,P('M14 25h20v4H14z',K,0)+L('M24 12v11',GY,2))+P(hm,'none')+P('M20 6q4 2 4 6',RD,2))
    return wiz+arc+kn
# ---- linterna del Faro, dos versiones ----
def lantern(kind):
    s=P('M22 16L44 6v22z','#ffe27a',1.6)+P('M4 12h14v10H4z',GY)+P('M18 10h5v14h-5z',DK,1.8)
    if kind=='doble':s+=Lk('M12 38h24',2.6,'#5ab4ff')+P('M10 38l5-4v8zM38 38l-5-4v8z','#5ab4ff',1.4)
    else:s+=Lk('M14 38h18',2.6,'#5ab4ff')+P('M36 38l-5-4v8z','#5ab4ff',1.4)
    return s
def download3():return P('M6 31v11h36V31','none',4.6)+L('M6 31v11h36V31',GY,2.6)+P('M19 4h10v12h7l-12 13l-12-13h7z',GR)
def bulbF():
    d='M24 6a12 12 0 0 1 7 22v5H17v-5A12 12 0 0 1 24 6z'
    return P(d,'#ffe27a')+clip('bf3',d,L('M18 14a7 7 0 0 1 6-4','#fff8d0',2.4)+L('M20.5 28v-5l1.8-5l1.7 3.5l1.7-3.5l1.8 5v5','#c8962a',1.6))+P(d,'none')+P('M17 33h14v4H17zM18 37h12v4H18z',GY,1.8)
def portal_sw():return portal()+swords3(37,35,.55)
def tortoise2():
    sh='M8 32q1-18 16-18t16 18z'
    return C(41,29,4.6,'#8ac06a',1.8)+P('M7 30h5v9H7zM33 30h5v9h-5zM14 32h4v6h-4zM28 32h4v6h-4z','#8ac06a',1.6).replace('M7 30h5v9H7z','M6 30l5-1l1 9h-5z').replace('M33 30h5v9h-5z','M33 30h5l2 8h-5z')+P(sh,'#6aa04a')+clip('tt2',sh,L('M24 14v18M16 18l8 6l8-6M12 26h24',K,1.4)+P('M18 20l6 4l6-4l-6-4z','#86b860',1.2))+P(sh,'none')+P('M7 32h34v3H7z','#5a8a3a',1.6)+C(42.5,28,1,K,0)
HG_OK='<path d="M13 9C13 19 21 20 24 24C21 28 13 29 13 39H35C35 29 27 28 24 24C27 20 35 19 35 9Z" fill="#fbf1d8"/><path d="M19.5 19.5H28.5L24 24Z" fill="{s}" stroke-width="1"/><path d="M24 24v6" stroke="{s}" stroke-width="2"/><path d="M13.2 33C15 29.5 20.5 28.5 24 25.5C27.5 28.5 33 29.5 34.8 33L35 39H13Z" fill="{s}" stroke-width="1.2"/><path d="M9 8h30M9 40h30" stroke-width="4"/>'
def hg(sand='#e8ac42'):return '<g stroke="#1b1712" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round">'+HG_OK.replace('{s}',sand)+'</g>'
def ult3():
    sp=lambda x,y,r,f:P(f'M{x} {y-r}q{r*.18} {r*.82} {r} {r}q-{r*.82} {r*.18} -{r} {r}q-{r*.18} -{r*.82} -{r} -{r}q{r*.82} -{r*.18} {r} -{r}z',f,1.8)
    return G('translate(-2 4) scale(.84)',inner=star('#ffb03a'))+sp(37,11,6.5,'#ffd84a')+sp(38,36,5.5,'#ffd84a')
# ---- monedas cilíndricas ----
GDc='#f2c94c';GSc='#c8962a'
def stackC(x,y,n,w=13,h=3.6,ry=2.3):
    """pila de n monedas; y = base. Cada canto es una franja curvada como la elipse."""
    rx=w/2;s=''
    top=y-n*h
    body=f'M{x-rx} {top}V{y}A{rx} {ry} 0 0 0 {x+rx} {y}V{top}z'
    s+=P(body,GDc,1.7)
    lines=''.join(f'<path d="M{x-rx} {y-i*h}A{rx} {ry} 0 0 0 {x+rx} {y-i*h}" fill="none" stroke="{K}" stroke-width="1.2"/>' for i in range(1,n))
    shine=''.join(f'<path d="M{x-rx+2} {y-i*h-h/2+.4}A{rx-2} {ry-.6} 0 0 0 {x+rx-2} {y-i*h-h/2+.4}" fill="none" stroke="{GSc}" stroke-width=".9"/>' for i in range(n))
    s+=clip(f'st{int(x)}{int(y)}{n}',body,shine+lines)+P(body,'none',1.7)
    s+=f'<ellipse cx="{x}" cy="{top}" rx="{rx}" ry="{ry}" fill="{GDc}" stroke="{K}" stroke-width="1.7"/><ellipse cx="{x}" cy="{top}" rx="{rx*.55}" ry="{ry*.5}" fill="none" stroke="{GSc}" stroke-width="1.1"/>'
    return s
def keyp(x,y,rot,sc=1):
    return (f'<g transform="translate({x} {y}) rotate({rot}) scale({sc})">'+P('M-11 -3.4h31v6.8h-31z',GDc,2.2)+P('M12 3.4h4.4v7h-4.4zM4.6 3.4h4.4v4.6h-4.6z',GDc,2)
      +'<path d="M-29 0a9.5 9.5 0 1 0 19 0a9.5 9.5 0 1 0 -19 0zM-24.2 0a4.7 4.7 0 1 1 9.4 0a4.7 4.7 0 1 1 -9.4 0z" fill="#f2c94c" fill-rule="evenodd" stroke="#1b1712" stroke-width="2.2" stroke-linejoin="round"/>'
      +'<path d="M-26 -3.5a7 7 0 0 1 5-4.5" fill="none" stroke="#ffe9a0" stroke-width="1.6" stroke-linecap="round"/></g>')
def crownS(x,y,s=1,rot=0):
    return f'<g transform="translate({x} {y}) rotate({rot}) scale({s})">'+P('M-10 4l-2-10l6 4l6-8l6 8l6-4l-2 10z','#ffd75a',1.6)+P('M-10 4h20v3.4h-20z','#e8b030',1.5)+C(0,-3,1.6,'#e0453a',1)+C(-6,1,1.1,'#3fd0e0',.8)+C(6,1,1.1,'#3fd0e0',.8)+'</g>'
base=stackC(16,40,5)+stackC(31,40,8)+stackC(24,45,3,14)+gem_(41,40,3,'#3fd0e0')+gem_(5,27,2.8,'#e05a6a')
M2=base+keyp(28,30,-20,.9)
N4={'N4 A':('Corona delante, en el centro',base+keyp(28,28,-20,.9)+crownS(22,44,.9)),
    'N4 B':('Corona apoyada en la pila, a la izquierda',base+keyp(28,28,-20,.9)+crownS(10,42,.85,-14)),
    'N4 C':('Corona delante y más gemas',base+gem_(36,46,2.6,'#a070e0')+keyp(28,28,-20,.9)+crownS(20,44,.9,6)+gem_(10,46,2.4,'#5fd060')),
    'N4 D':('Corona encima de la pila alta',base.replace(stackC(31,40,8),stackC(31,40,7))+keyp(28,30,-20,.9)+crownS(31,11,.8))}
I=[]
def A(n,em,txt,svg):I.append((n,em,txt,svg))
A('4 A','🔦','Luz del Faro: flecha doble debajo',lantern('doble'));A('4 B','🔦','Luz del Faro: flecha a la derecha',lantern('una'))
A('5/20','⚔️','Espadas: cruzan a mitad de la hoja',swords3())
A('11','🎲','Dado (1 arriba, 2 a la izquierda, 3 a la derecha)',dice3())
A('12/22','🦸','Héroes: casco delante y cabezas pegadas',heroes4())
A('25','⬇️','Descargar historial: base más gruesa',download3())
A('35','🔓','Desbloqueos: candado abierto',lock3(True))
A('41/84','💡','Bombilla con filamento (sin tocar la base)',bulbF())
A('43','🌀','Portales en combate: espadas abajo a la derecha',portal_sw())
A('44','🕒','Tiempo real (el de ahora)',clock())
A('45 nuevo','⏱️','Tiempo de combate (el rojo de la ronda 2)',stopwatch_red())
A('cool','⏱️','Cronómetro aprobado (el de «Enfriamiento»)',inner(ST['cool']))
A('46','🐢','Tortuga: patas corregidas',tortoise2())
A('52','⏳','Pausa del avance: el reloj de las rondas (v307)',hg())
A('73','⌛','Apertura del panel: el mismo, arena azul',hg('#6ab8ec'))
A('78','🌟','Definitiva: estrella y destellos a la derecha',ult3())
A('87','🏰','Créditos: el castillo de la era',castle2())
for n,(em,t,it) in {'56':('🗼','Desbloquear torres',tower()),'57':('🦸','Desbloquear héroes',heroes4()),'58':('💎','Desbloquear reliquias',gem2()),'59':('🗺️','Desbloquear eventos',scroll()),'60':('🎨','Desbloquear personalización',palette2()),'61':('📅','Desbloquear duraciones',calendar()),'62':('📖','Compendio completo',book())}.items():A(n,em,t,unlocked3(it))
json.dump([(a,b,c,f'<svg viewBox="-4 -4 56 56">{d}</svg>') for a,b,c,d in I],open('maquetas/iconos_menus_r3.json','w'),ensure_ascii=False)
css='body{margin:0;background:#14161c;font-family:system-ui,sans-serif}.w{width:1500px;padding:16px}h2{color:#f4ead8;margin:14px 0 8px;font-size:20px}.g{display:grid;grid-template-columns:repeat(8,1fr);gap:8px}.c{background:#f4ead8;border:2px solid #e0262e;border-radius:6px;padding:6px;text-align:center}.c svg{width:72px;height:72px;display:block;margin:0 auto}.n{font:800 12px system-ui;color:#fff;background:#e0262e;border-radius:9px;padding:0 6px;display:inline-block}.e{font-size:16px;margin-left:4px}.t{font-size:12.5px;color:#2a2018;line-height:1.2;margin-top:4px;min-height:30px}.sm{display:flex;gap:6px;justify-content:center;align-items:center}.sm svg{width:24px!important;height:24px!important;margin:0!important}'
h=f'<!doctype html><html><head><meta charset="utf-8"><style>{css}</style></head><body><div class="w"><h2 style="font-size:24px">Iconos · tercera ronda</h2><div class="g">'
for n,em,t,s in I:h+=f'<div class="c"><div><span class="n">{n}</span><span class="e">{em}</span></div><svg viewBox="-4 -4 56 56">{s}</svg><div class="sm"><svg viewBox="-4 -4 56 56">{s}</svg></div><div class="t">{t}</div></div>'
open('maquetas/iconos_menus_r3.html','w',encoding='utf8').write(h+'</div></div></body></html>')
T2=lambda s,sz:f'<svg viewBox="-4 -4 56 56" width="{sz}" height="{sz}"><circle cx="24" cy="24" r="27" fill="#8a5626"/><g transform="translate(5 5) scale(.8)"><g class="fit">{s}</g></g></svg>'
BIG=lambda s:f'<svg viewBox="-4 -4 56 56" width="160" height="160" style="background:#e8dcc4;border-radius:8px"><g class="fit">{s}</g></svg>'
cards=f'<div class="k"><div class="h">M2 · Nv 1-3 (con gema roja y monedas redondas)</div><div class="r">{BIG(M2)}{T2(M2,96)}{T2(M2,32)}</div></div>'
for k,(n,s) in N4.items():cards+=f'<div class="k"><div class="h">{k} · Nv 4 · {n}</div><div class="r">{BIG(s)}{T2(s,96)}{T2(s,32)}</div></div>'
h=f'<!doctype html><html><head><meta charset="utf-8"><style>{css}.k{{background:#f4ead8;border:3px solid #e0262e;border-radius:6px}}.k .h{{background:#e0262e;color:#fff;font-weight:800;padding:6px 10px}}.k .r{{display:flex;gap:12px;align-items:center;padding:10px}}</style></head><body><div class="w" style="width:auto"><h2 style="font-size:22px">Mímico glotón · torre de monedas con la llave (M2)</h2><div style="display:grid;grid-template-columns:repeat(2,520px);gap:14px">{cards}</div></div><script>for(const g of document.querySelectorAll("g.fit")){{const b=g.getBBox(),S=Math.min(47/b.width,47/b.height);g.setAttribute("transform",`translate(${{24-(b.x+b.width/2)*S}} ${{24-(b.y+b.height/2)*S}}) scale(${{S}})`);}}</script></body></html>'
open('maquetas/mimico_torre_r4.html','w',encoding='utf8').write(h)
json.dump({'M2':M2,**{k:v[1] for k,v in N4.items()}},open('maquetas/mimico_torre_r4.json','w'))
print(len(I))
