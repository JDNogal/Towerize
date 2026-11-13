import json,math,re
SP='tools/dibujos_menus'
src=open(SP+'/menu_icons.py',encoding='utf8').read()
src=src[:src.index("I=[]  # (sección")]
exec(src)
ST=json.load(open('src/iconos/estadisticas_final.json'))
inner=lambda s:re.sub(r'^<svg[^>]*>|</svg>$','',s)
TROF=open(SP+'/trof.txt').read()
trof=inner(TROF)
# ---------- piezas corregidas ----------
def lock2(open_=False,s=1,x=24,y=24):
    sh='M16 21v-6a8 8 0 0 1 16 0v6' if not open_ else 'M16 21v-6a8 8 0 0 1 16 0v-2'
    if open_: sh='M16 21v-6a8 8 0 0 1 16 0v-1'
    g=Lk(sh if not open_ else 'M16 21V13a8 8 0 0 1 16 0v-1'.replace('M16 21V13','M16 21v-8'),3,GY) if not open_ else G('translate(10 -4)',inner=Lk('M16 21v-8a8 8 0 0 1 16 0',3,GY))
    body=P('M10 21h28v22H10z',GD)+clip(f'lk{int(x)}{open_}','M10 21h28v22H10z',L('M10 25h28',GL if 'GL' in globals() else '#ffe9a0',1.6))+P('M10 21h28v22H10z','none')
    hole=C(24,30,3.2,K,0)+P('M22.3 31h3.4l1 7h-5.4z',K,0)
    return G(f'translate({x-24*s} {y-24*s}) scale({s})',inner=g+body+hole)
GL='#ffe9a0'
def swords2():
    def one(r):
        return G(f'rotate({r} 24 20)',inner=P('M22.6 0h2.8l1.4 3v23h-5.6V3z','#d8dee6',1.8)+L('M24 4v20','#ffffff',1)+P('M19 26h10v3.2H19z',GD,1.8)+P('M22.5 29.2h3v7h-3z',WD,1.6)+C(24,38,1.9,GD,1.4))
    return G('translate(0 4)',inner=one(-45)+one(45))
def mapn():
    d='M4 12l13-5l14 5l13-5v29l-13 5l-14-5l-13 5z'
    inner_=P('M4 12h40v34H4z','#9ccf7a',0)+P('M4 24q10-6 20 2t20-4v26H4z','#7ab85a',0)+P('M30 6q-6 14 4 22t-2 18','none',0)+L('M31 6q-6 14 4 22t-4 18','#5aa8e0',3.2)+C(14,22,3,'#6a9a4a',1.2)+C(18,30,2.4,'#6a9a4a',1.2)+P('M33 16l3-5l3 5z','#a8a8a8',1.2)+P('M37 18l3-5l3 5z','#a8a8a8',1.2)
    return P(d,'#e8d8a8')+clip('mpn',d,inner_+P('M17 7v29l14 5V12z','#00000014',0))+P(d,'none')+L('M17 7v29M31 12v29',K,1.4)
def magn2(x,y,r):return Lk(f'M{x+r*.72} {y+r*.72}l7 7',4.4,WD)+C(x,y,r,'#cfeaf4')+L(f'M{x-r*.5} {y-r*.2}a{r*.55} {r*.55} 0 0 1 {r*.4} -{r*.4}','#ffffff',1.6)
def castle2(big=False):
    t=lambda x,w,h,roof='#c0392b':P(f'M{x} 44V{44-h}h{w}V44z','#c8ccd4')+P(f'M{x-1.5} {44-h}l{w/2+1.5} -{w*.9}l{w/2+1.5} {w*.9}z',roof,1.8)+P(f'M{x+w/2-1.2} {44-h+5}h2.4v4h-2.4z',DK,1)
    s=P('M12 44V22h4v-3h4v3h8v-3h4v3h4v22z','#d8dce4')+P('M20 44v-9a4 4 0 0 1 8 0v9z',WD,1.6)+L('M24 35v9',K,1.2)
    s=t(3,9,24)+t(36,9,24)+s+t(18.5,11,30,'#2f5fb8')+P('M24 2v6',K,1.6)+P('M24 2h6l-2 2l2 2h-6',RD,1.2)
    if big:s+=P('M9 30h3v4h-3zM36 30h3v4h-3z',DK,1)
    return s
def heroes3():
    a=G('translate(-12 4) scale(.78)',inner=C(24,14,7,'#f0c8a0')+P('M14 6q10-10 20 0l-2 4H16z',PU,1.8)+P('M10 46q0-17 14-17t14 17z',PU))
    b=G('translate(18 4) scale(.78)',inner=C(24,14,7,'#f0c8a0')+P('M15 12q0-10 9-10t9 10q-3-4-9-4t-9 4z','#3a6a3a',1.8)+P('M10 46q0-17 14-17t14 17z','#4a8a4a'))
    c=G('translate(3 0) scale(.88)',inner=helmet().replace('M10 40V22','M10 34V22')+P('M8 48q0-14 16-14t16 14z',RD))
    return a+b+c
def flag():
    return '<g fill="none" stroke="#1b1712" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round" transform="scale(.75)"><ellipse cx="30" cy="52" rx="20" ry="6.5" stroke-dasharray="5 5"/><path d="M30 52V7" stroke-width="3.4"/><path d="M30 9h26l-8 10 8 10H30z" fill="#d8453a"/></g>'
def pin2():
    return G('rotate(30 24 24)',inner=Lk('M24 46V30',2.4,GY)+P('M17 6h14l-2.5 6.5l4 10H15.5l4-10z',RD)+P('M14 22h20v5.5H14z',RD,1.8)+L('M20 9v9','#ff9a8a',1.6))
def gem2():
    d='M10 18l6-8h16l6 8l-14 22z'
    return P(d,'#3fd0e0')+clip('gm2',d,P('M10 18h28','none',1.2)+L('M16 10l3 8l5 22M32 10l-3 8l-5 22M10 18h28',K,1.2)+P('M16 10l3 8h10l3-8z','#ffffff',0).replace('fill="#ffffff"','fill="#ffffff" opacity=".35"'))+P(d,'none')
def chart2():
    return P('M6 6v36h36','none',2.4)+P('M12 40V28h6v12z',RD,1.8)+P('M22 40V16h6v24z',GD,1.8)+P('M32 40V22h6v18z',GR,1.8)
def download2():
    return P('M6 32v10h36V32','none',2.6)+L('M6 32v10h36V32',GY,1.2)+P('M19 4h10v12h7l-12 13l-12-13h7z',GR)
def palette2():
    d='M24 6c12 0 20 8 20 17c0 6-5 8-9 7c-4-1-6 2-4 6c2 5-2 7-7 7C13 43 4 34 4 24S12 6 24 6zM18 32a4 4 0 1 0 8 0a4 4 0 1 0 -8 0z'
    return f'<path d="{d}" fill="#e8c890" fill-rule="evenodd" stroke="{K}" stroke-width="2.1" stroke-linejoin="round"/>'+C(15,18,3.2,RD,1.4)+C(24,13,3.2,GD,1.4)+C(33,17,3.2,BL,1.4)+C(13,27,3.2,GR,1.4)
def corners():return ''.join(Lk(d,3,PA) for d in['M6 16V6h10','M42 16V6H32','M6 32v10h10','M42 32v10H32'])
def core_frame():
    return corners()+G('translate(12 12) scale(.5)',inner=inner(ST['g_core']))
def bulb_wire(q=False):
    d='M24 6a12 12 0 0 1 7 22v5H17v-5A12 12 0 0 1 24 6z'
    s=P(d,'#ffe27a')+clip('bw'+str(q),d,L('M18 14a7 7 0 0 1 6-4','#fff8d0',2.4))+P(d,'none')+P('M17 33h14v4H17zM18 37h12v4H18z',GY,1.8)
    s+= (T(24,26,'?',15,'#c8962a') if q else L('M20 33v-6l2-6l2 4l2-4l2 6v6','#c8962a',1.6))
    return s
def stopwatch_red():
    return P('M20 2h8v4h-8z',GY,1.6)+P('M34 8l3 3',K,2.4)+C(24,26,17,'#e05a4a')+C(24,26,13,'#ffe0d8',1.6)+L('M24 26V16M24 26l6 4',K,2.4)
def tortoise():
    sh='M8 32q1-18 16-18t16 18z'
    return C(41,30,4.6,'#8ac06a',1.8)+P('M10 31h4v8h-4zM32 31h4v8h-4zM16 32h4v6h-4zM26 32h4v6h-4z','#8ac06a',1.6)+P(sh,'#6aa04a')+clip('tt',sh,L('M24 14v18M16 18l8 6l8-6M12 26h24',K,1.4)+P('M18 20l6 4l6-4l-6-4z','#86b860',1.2))+P(sh,'none')+P('M7 32h34v3H7z','#5a8a3a',1.6)+C(42.5,29,1,K,0)
def glitch2():
    E=lambda dx,dy,c:T(24+dx,36+dy,'É',32,c)
    return E(-2.5,0,'#ff3fd8')+E(2.5,0,'#3fe8ff')+E(0,0,PA)+'<path d="M8 18h32v3H8zM6 29h24v2.5H6zM22 36h22v2.4H22z" fill="#14161c"/>'+P('M30 16h10v4H30z','#3fe8ff',1)+P('M6 30h8v3H6z','#ff3fd8',1)
def unlocked(item):
    return G('translate(-2 -2) scale(.9)',inner=item)+G('translate(26 24) scale(.48)',inner=lock2(open_=True))
def eye_trophy():
    return G('translate(-3 2) scale(.82)',inner=eye())+f'<g transform="translate(27 20) scale(.36)">{trof}</g>'
def gauge():
    return P('M4 36a20 20 0 0 1 40 0z',DK)+L('M10 34a14 14 0 0 1 28 0','#5fe05a',3)+L('M30 22a14 14 0 0 1 8 12',RD,3)+Lk('M24 34l9-12',2.4,PA)+C(24,34,3,GY,1.4)+T(24,46,'FPS',9,K)
def sci2():
    return P('M3 12h42v24H3z',PA)+T(19,31,'×10',15,K)+T(37,25,'2',10,K)
def hourglass_dur(sand=None):
    s=ST['dur']
    if sand:s=s.replace('#ffd75a',sand)
    return inner(s)
def ult_star():
    sp=lambda x,y,r:P(f'M{x} {y-r}q{r*.18} {r*.82} {r} {r}q-{r*.82} {r*.18} -{r} {r}q-{r*.18} -{r*.82} -{r} -{r}q{r*.82} -{r*.18} {r} -{r}z','#fff2b0',1.6)
    return G('translate(2 4) scale(.82)',inner=star('#ffb03a'))+sp(40,10,6)+sp(8,36,5)
def dmg_opts():
    a=G('translate(-6 -6) scale(.7)',inner=burst('#ff6a5a'))+T(33,42,'12',19,RD).replace('fill="#d8453a"','fill="#d8453a" stroke="#1b1712" stroke-width="1.2" paint-order="stroke"')
    b=T(14,20,'12',15,'#e0453a')+T(34,30,'7',17,'#4a8ad8')+T(18,44,'25',16,'#f2a23a')
    b=b.replace('<text','<text stroke="#1b1712" stroke-width="1.6" paint-order="stroke"')
    c=(T(22,36,'24!',22,'#ffd75a')).replace('<text','<text stroke="#1b1712" stroke-width="2" paint-order="stroke"')+L('M8 12l4 4M40 10l-3 5M42 30l-5-1','#ffd75a',2.2)
    return a,b,c
# ---------- Mímico: pila de monedas con la llave por delante ----------
GDc='#f2c94c';GSc='#c8962a'
def coinS(x,y,w=13):  # moneda vista de canto, para las pilas
    return P(f'M{x-w/2} {y}h{w}v3.6h-{w}z',GDc,1.5)+L(f'M{x-w/2+1.5} {y+1.8}h{w-3}',GSc,1)
def stack(x,y,n,w=13):
    s=''.join(coinS(x,y-i*3.6,w) for i in range(n))
    top=y-(n-1)*3.6
    return s+f'<ellipse cx="{x}" cy="{top}" rx="{w/2}" ry="2.2" fill="{GDc}" stroke="{K}" stroke-width="1.5"/>'
def keyplain(x,y,rot,sc=1):
    return (f'<g transform="translate({x} {y}) rotate({rot}) scale({sc})">'+P('M-11 -3.4h31v6.8h-31z',GDc,2.2)+P('M12 3.4h4.4v7h-4.4zM4.6 3.4h4.4v4.6h-4.6z',GDc,2)
      +'<path d="M-29 0a9.5 9.5 0 1 0 19 0a9.5 9.5 0 1 0 -19 0zM-24.2 0a4.7 4.7 0 1 1 9.4 0a4.7 4.7 0 1 1 -9.4 0z" fill="#f2c94c" fill-rule="evenodd" stroke="#1b1712" stroke-width="2.2" stroke-linejoin="round"/>'
      +'<path d="M-26 -3.5a7 7 0 0 1 5-4.5" fill="none" stroke="#ffe9a0" stroke-width="1.6" stroke-linecap="round"/></g>')
def gem_(x,y,s,col):
    d=f'M{x} {y-s}L{x+s*1.1} {y}L{x} {y+s}L{x-s*1.1} {y}z'
    return P(d,col,1.5)+f'<path d="M{x-s*1.1} {y}L{x} {y-s}L{x} {y+s}z" fill="#fff" opacity=".35"/>'+P(d,'none',1.5)
def coinF(x,y,rx=6.4,ry=3.2):return f'<ellipse cx="{x}" cy="{y}" rx="{rx}" ry="{ry}" fill="{GDc}" stroke="{K}" stroke-width="1.6"/><ellipse cx="{x}" cy="{y-.3}" rx="{rx*.55}" ry="{ry*.5}" fill="none" stroke="{GSc}" stroke-width="1.1"/>'
crown='<path d="M14 6l2-8 4 4 4-6 4 6 4-4 2 8z" fill="#ffd75a" stroke="#1b1712" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round"/><circle cx="24" cy="1" r="1.4" fill="#e0453a"/>'
MK={
 'M1':('Llave sobre el oro (sin mordisco)',coinF(16,40)+coinF(28,42)+coinF(39,39.5)+coinF(22,36.5)+coinF(34,35)+gem_(44,34,3.2,'#3fd0e0')+gem_(23,44.5,2.8,'#e05a6a')+keyplain(27,20,-32)),
 'M2':('Torre de monedas con la llave delante',stack(16,40,5)+stack(31,40,8)+stack(24,44,3,14)+gem_(41,40,3,'#3fd0e0')+gem_(8,42,2.8,'#e05a6a')+keyplain(28,30,-20,.9)),
 'M3':('Tres pilas y la llave apoyada',stack(12,42,4,12)+stack(24,42,7,12)+stack(36,42,5,12)+gem_(30,18,3,'#3fd0e0')+gem_(8,25,2.6,'#e05a6a')+keyplain(29,36,-8,.85)),
 'M4':('Pila alta y la llave colgando de una cinta',stack(20,44,9,15)+stack(34,44,4,12)+gem_(42,30,3,'#3fd0e0')+gem_(9,40,2.8,'#e05a6a')+L('M26 4q2 10 0 16',RD,2.6)+keyplain(30,29,90,.62)),
}
I=[]
def A(n,em,txt,svg):I.append((n,em,txt,svg))
A('2','⛓️🔒','Botón bloqueado: candado cerrado y centrado',lock2())
A('3','🔍','Abrir la ficha: mango más corto',P('M6 6h24v32H6z',PA)+L('M10 13h16M10 19h16M10 25h10','#a08060',1.6)+magn2(31,30,8))
A('4','🔦','Luz del Faro: el haz sale de la parte negra',P('M22 18L46 6v24z','#ffe27a',1.6)+P('M4 12h14v12H4z',GY)+P('M18 10h5v16h-5z',DK,1.8)+L('M30 34l6 6l6-6M36 40V28','#5ab4ff',2.6))
A('5','⚔️','En el mapa: espadas cruzadas',swords2())
A('8','⤢','Ver todo el mapa: catalejo',telescope())
A('9','◎','Encuadrar (centrar en el núcleo)',core_frame())
A('10','🎓','Primeros pasos: birrete',cap())
A('11','🎲','Formas de jugar: dado bien hecho',P('M24 4L42 13L24 22L6 13z','#fffaf0')+P('M6 13L24 22V44L6 34z','#e8dcc4')+P('M24 22L42 13V34L24 44z','#d4c4a4')+'<ellipse cx="24" cy="13" rx="3" ry="1.6" fill="#d8453a"/>'+''.join(f'<ellipse cx="{x}" cy="{y}" rx="1.7" ry="2.2" transform="rotate(-27 {x} {y})" fill="#1b1712"/>' for x,y in[(11,22),(19,36)])+''.join(f'<ellipse cx="{x}" cy="{y}" rx="1.7" ry="2.2" transform="rotate(27 {x} {y})" fill="#1b1712"/>' for x,y in[(29,24),(33,30),(37,36)]))
A('12/22/57','🦸','Héroes: un grupo de tres',heroes3())
A('15','🗺️','Mapa (sin ruta del tesoro)',mapn())
A('17/38','📌','Fijar: chincheta inclinada y unida',pin2())
A('18','🔒','Logro bloqueado',lock2())
A('19','📊','Partida: barras de colores',chart2())
A('20/43','⚔️','Daño (las mismas espadas)',swords2())
A('21/58','💎','Reliquias: diamante con las dos aristas',gem2())
A('24','⭐','Guardadas / Guardar: el disquete',floppy())
A('25','⬇️','Descargar historial',download2())
A('26','🗺️','Ver mapa grande',mapn()+magn2(33,31,9))
A('27','🐉','Era Fantástica: castillo con torreones',castle2())
A('30/60','🎨','Personalización: hueco transparente',palette2())
A('35','🔓','Desbloqueos: candado abierto',lock2(True))
A('39','⛶','Pantalla completa (sin la X)',corners())
a,b,c=dmg_opts();A('40 A','💥','Números de daño · explosión y número',a);A('40 B','💥','Números de daño · varios números de colores',b);A('40 C','💥','Números de daño · crítico',c)
A('41 A','💡','Pistas: bombilla con filamento',bulb_wire());A('41 B','💡','Pistas: bombilla con interrogante',bulb_wire(True))
A('43','🌀','Portales en combate (espadas nuevas)',portal()+G('translate(18 -2) scale(.55)',inner=swords2()))
A('45','⏱️','Tiempo de combate: cronómetro rojo',stopwatch_red())
A('46','🐢','Ralentizar: tortuga',tortoise())
A('52','⏳','Pausa del avance: el reloj de arena aprobado',hourglass_dur())
A('53','📺','Fallos de ÉTER: glitch',glitch2())
A('56','🗼','Desbloquear torres',unlocked(tower()))
A('57','🦸','Desbloquear héroes',unlocked(heroes3()))
A('58','💎','Desbloquear reliquias',unlocked(gem2()))
A('59','🗺️','Desbloquear eventos',unlocked(scroll()))
A('60','🎨','Desbloquear personalización',unlocked(palette2()))
A('61','📅','Desbloquear duraciones',unlocked(calendar()))
A('62','📖','Compendio completo',unlocked(book()))
A('64','🕵️','Revelar logros secretos: ojo y trofeo',eye_trophy())
A('68','📈','Mostrar FPS: velocímetro',gauge())
A('72','🔬','Notación científica',sci2())
A('73','⌛','Apertura del panel: reloj aprobado, arena azul',hourglass_dur('#7ac8f0'))
A('78','🌟','Habilidad definitiva',ult_star())
A('79-81','🦸👽🐷','Mover cualquier unidad: la bandera del juego',flag())
A('84/86 A','💡','Consejos / Pistas: filamento',bulb_wire());A('84/86 B','💡','Consejos / Pistas: interrogante',bulb_wire(True))
A('87','🏰','Créditos: castillo más currado',castle2(True))
json.dump([(a,b,c,f'<svg viewBox="-4 -4 56 56">{d}</svg>') for a,b,c,d in I],open('maquetas/iconos_menus_r2.json','w'),ensure_ascii=False)
json.dump({k:f'<svg viewBox="-4 -4 56 56">{v[1]}</svg>' for k,v in MK.items()},open('maquetas/mimico_torre_r3.json','w'))
css='body{margin:0;background:#14161c;font-family:system-ui,sans-serif}.w{width:1500px;padding:16px}h2{color:#f4ead8;margin:14px 0 8px;font-size:20px}.g{display:grid;grid-template-columns:repeat(8,1fr);gap:8px}.c{background:#f4ead8;border:2px solid #e0262e;border-radius:6px;padding:6px;text-align:center}.c svg{width:72px;height:72px;display:block;margin:0 auto}.n{font:800 12px system-ui;color:#fff;background:#e0262e;border-radius:9px;padding:0 6px;display:inline-block}.e{font-size:16px;margin-left:4px}.t{font-size:12.5px;color:#2a2018;line-height:1.2;margin-top:4px;min-height:30px}.sm{display:flex;gap:6px;justify-content:center;align-items:center}.sm svg{width:24px!important;height:24px!important;margin:0!important}'
h=f'<!doctype html><html><head><meta charset="utf-8"><style>{css}</style></head><body><div class="w"><h2 style="font-size:24px">Iconos · segunda ronda (con el número de la hoja anterior)</h2><div class="g">'
for n,em,t,s in I:h+=f'<div class="c"><div><span class="n">{n}</span><span class="e">{em}</span></div><svg viewBox="-4 -4 56 56">{s}</svg><div class="sm"><svg viewBox="-4 -4 56 56">{s}</svg></div><div class="t">{t}</div></div>'
h+='</div></div></body></html>'
open('maquetas/iconos_menus_r2.html','w',encoding='utf8').write(h)
# Mímico
T2=lambda s,sz:f'<svg viewBox="-4 -4 56 56" width="{sz}" height="{sz}"><circle cx="24" cy="24" r="27" fill="#8a5626"/><g transform="translate(5 5) scale(.8)">{s}</g></svg>'
h=f'<!doctype html><html><head><meta charset="utf-8"><style>{css}.k{{background:#f4ead8;border:3px solid #e0262e;border-radius:6px}}.k .h{{background:#e0262e;color:#fff;font-weight:800;padding:6px 10px}}.k .r{{display:flex;gap:12px;align-items:center;padding:10px}}</style></head><body><div class="w" style="width:auto"><h2 style="font-size:22px">Mímico glotón · icono de la torre (Nv 1-3 y Nv 4 con corona)</h2><div style="display:grid;grid-template-columns:repeat(2,700px);gap:14px">'
for k,(n,s) in MK.items():
    s4=f'<g transform="translate(3.6 7) scale(.85)">{s}</g>{crown}'
    s=f'<g class="fit">{s}</g>';s4=f'<g transform="translate(3.6 7) scale(.85)">{s}</g>{crown}'
    h+=f'<div class="k"><div class="h">{k} · {n}</div><div class="r"><svg viewBox="-4 -4 56 56" width="150" height="150" style="background:#e8dcc4;border-radius:8px">{s}</svg>{T2(s,96)}{T2(s,32)}<span style="width:14px"></span>{T2(s4,96)}{T2(s4,32)}</div></div>'
open('maquetas/mimico_torre_r3.html','w',encoding='utf8').write(h+'</div></div><script>for(const g of document.querySelectorAll("g.fit")){const b=g.getBBox(),S=Math.min(47/b.width,47/b.height);g.setAttribute("transform",`translate(${24-(b.x+b.width/2)*S} ${24-(b.y+b.height/2)*S}) scale(${S})`);}</script></body></html>')
print(len(I))
