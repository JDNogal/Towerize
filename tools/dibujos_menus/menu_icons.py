import json,math
K='#1b1712'
def P(d,f,w=2.1):return f'<path d="{d}" fill="{f}" stroke="{K}" stroke-width="{w}" stroke-linejoin="round" stroke-linecap="round"/>'
def L(d,c,w=1.6):return f'<path d="{d}" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round"/>'
def Lk(d,w=2.4,c='#f4ead8',iw=None):return L(d,K,w+2.2)+L(d,c,w)  # trazo con borde
def C(x,y,r,f,w=2.1):return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{f}" stroke="{K}" stroke-width="{w}"/>'
def T(x,y,t,sz,f='#1b1712',wt=900):return f'<text x="{x}" y="{y}" font-family="system-ui,sans-serif" font-weight="{wt}" font-size="{sz}" text-anchor="middle" fill="{f}">{t}</text>'
def clip(i,d,inner):return f'<clipPath id="{i}"><path d="{d}"/></clipPath><g clip-path="url(#{i})">{inner}</g>'
def G(t,s=1,inner=''):return f'<g transform="{t}">{inner}</g>'
GD='#f2c94c';GS='#c8962a';PA='#f4ead8';RD='#d8453a';BL='#4a7ad8';GR='#5fbf5a';PU='#9a6ad8';GY='#9aa0aa';DK='#3a3e48';WD='#a8743a'
# ---------- piezas base ----------
def lock(x=24,y=28,s=1,open_=False):
    sh='M16 22v-6a8 8 0 0 1 16 0v6' if not open_ else 'M16 22v-6a8 8 0 0 1 16 0v-1'
    return G(f'translate({x-24*s} {y-28*s}) scale({s})',inner=Lk(sh,3,GY)+P('M11 22h26v20H11z',GD)+P('M22 30a2.5 2.5 0 1 1 4 2l1 5h-6l1-5a2.5 2.5 0 0 1 0-2z',K,1))
def gear(x=24,y=24,r=16,f=GY):
    pts=[]
    for i in range(16):
        a=i*math.pi/8;rr=r if i%2==0 else r*.78
        a1=a-.17;a2=a+.17
        pts+= [(x+rr*math.cos(a1),y+rr*math.sin(a1)),(x+rr*math.cos(a2),y+rr*math.sin(a2))]
    d='M'+' L'.join(f'{a:.1f} {b:.1f}' for a,b in pts)+'z'
    return P(d,f)+C(x,y,r*.36,PA)
def gem(x=24,y=24,s=1,f='#3fd0e0'):
    d=f'M{x-14*s} {y-4*s}l{6*s} -{8*s}h{16*s}l{6*s} {8*s}l-{14*s} {18*s}z'
    return P(d,f)+clip(f'gm{x}{y}',d,L(f'M{x-14*s} {y-4*s}h{28*s}M{x-8*s} {y-12*s}l{3*s} {8*s}l{5*s} {18*s}M{x+8*s} {y-12*s}l-{3*s} {8*s}',K,1.2))+P(d,'none')
def helmet(x=24,y=24):
    d='M10 40V22a14 14 0 0 1 28 0v18z'
    return P(d,'#c8ccd4')+clip('hm'+str(x),d,P('M13 25h22v5H13z',K,0)+L('M24 9v13',GY,2))+P(d,'none')+P('M20 2q4 3 4 7',RD,2)
def swords():
    one=lambda r:G(f'rotate({r} 24 24)',inner=P('M22.5 4h3v28h-3z','#d8dee6',1.8)+P('M17 32h14v3H17z',GD,1.8)+P('M22.5 35h3v7h-3z',WD,1.8)+C(24,43.5,2,GD,1.4))
    return one(-40)+one(40)
def scroll():
    return P('M12 10h24v30H12z',PA)+P('M8 6h28a3 3 0 0 1 0 6H8a3 3 0 0 1 0-6z','#d8c090')+P('M12 38h28a3 3 0 0 1 0 6H12a3 3 0 0 1 0-6z','#d8c090')+L('M16 18h16M16 24h16M16 30h10','#a08060',1.6)
def mapic():
    d='M4 12l13-5l14 5l13-5v29l-13 5l-14-5l-13 5z'
    return P(d,'#e8d8a8')+clip('mp',d,P('M17 7v29l14 5V12z','#d8c490',0)+L('M8 30q6-10 14-4t16-10',RD,1.8))+P(d,'none')+L('M17 7v29M31 12v29',K,1.6)+P('M34 18l3 3m0-3l-3 3','none',1.8)
def book(f='#c0392b',check=False,open_=False):
    if open_:
        return P('M4 10q10-4 20 2v30q-10-6-20-2z',PA)+P('M44 10q-10-4-20 2v30q10-6 20-2z',PA)+L('M8 18q6-2 12 1M8 24q6-2 12 1M28 19q6-3 12-1M28 25q6-3 12-1','#a08060',1.4)
    s=P('M10 6h26v36H10z',f)+P('M10 36h26v6H10z',PA,1.6)+L('M15 6v30','#00000044',2)
    if check:s+=L('M17 21l5 5l9-10','#fff',3.2)
    return s
def magnifier(x=20,y=20,r=11,inner=''):
    return Lk(f'M{x+r*.7} {y+r*.7}l12 12',4.4,WD)+C(x,y,r,'#cfeaf4')+inner
def bulb():
    d='M24 6a12 12 0 0 1 7 22v5H17v-5A12 12 0 0 1 24 6z'
    return P(d,'#ffe27a')+clip('bb',d,L('M18 14a7 7 0 0 1 6-4','#fff8d0',2.4))+P(d,'none')+P('M17 33h14v4H17zM18 37h12v4H18z',GY,1.8)+L('M24 26v-8l-3 3m3-3l3 3','#c8962a',1.6)
def hourglass(f='#e0b84a'):
    return P('M12 4h24v4H12zM12 40h24v4H12z',WD)+P('M15 8h18q0 9-9 16q9 7 9 16H15q0-9 9-16q-9-7-9-16z',PA)+P('M19 36h10q-2-6-5-7q-3 1-5 7z',f,1.2)+P('M20 14h8q-1 4-4 6q-3-2-4-6z',f,1.2)
def clock(f=PA):
    return C(24,25,17,f)+L('M24 25V14M24 25l7 5',K,2.4)+''.join(L(f'M{24+14*math.cos(a):.1f} {25+14*math.sin(a):.1f}L{24+12*math.cos(a):.1f} {25+12*math.sin(a):.1f}',K,1.6) for a in [i*math.pi/2 for i in range(4)])
def speaker(waves=2):
    s=P('M6 18h8l10-9v30l-10-9H6z',GY)
    for i in range(waves):s+=Lk(f'M{30+i*5} {16-i*3}q{4+i*2} {8+i*3} 0 {16+i*6}',2.2,PA)
    return s
def keyboard():
    d='M3 14h42v22H3z'
    k=''.join(P(f'M{6+i*8} 17h6v5h-6z',PA,1.2) for i in range(5))+''.join(P(f'M{10+i*8} 24h6v5h-6z',PA,1.2) for i in range(4))+P('M13 31h22v3H13z',PA,1.2)
    return P(d,DK)+k
def palette():
    d='M24 6c12 0 20 8 20 17c0 6-5 8-9 7c-4-1-6 2-4 6c2 5-2 7-7 7C13 43 4 34 4 24S12 6 24 6z'
    return P(d,'#e8c890')+C(15,18,3.2,RD,1.4)+C(24,13,3.2,GD,1.4)+C(33,17,3.2,BL,1.4)+C(13,28,3.2,GR,1.4)+C(22,32,4,'#e8c890',1.4)
def bubble(f=PA):
    return P('M6 8h36v24H22l-9 8v-8H6z',f)+L('M13 16h22M13 23h14','#a08060',2)
def monitor():
    return P('M4 7h40v26H4z',DK)+P('M8 11h32v18H8z','#4ab8e0',1.4)+P('M19 33h10l2 7H17z',GY,1.8)+P('M13 40h22v3H13z',GY,1.8)
def access():
    return C(24,24,19,BL)+C(24,13,3.2,PA,1.4)+Lk('M13 19h22M24 19v9l-6 9M24 28l6 9',2.6,PA)
def floppy():
    return P('M6 4h30l8 8v32H6z','#4a6a9a')+P('M13 4h20v13H13z','#e8eef4')+L('M27 7v7',K,3)+P('M12 27h24v17H12z',PA)+L('M16 33h16M16 38h12','#a08060',1.6)
def star(f=GD):
    pts=[];[pts.append((24+(18 if i%2==0 else 8)*math.sin(i*math.pi/5),25-(18 if i%2==0 else 8)*math.cos(i*math.pi/5))) for i in range(10)]
    return P('M'+' L'.join(f'{a:.1f} {b:.1f}' for a,b in pts)+'z',f)
def download():
    return P('M8 34v8h32v-8',GY)+P('M19 6h10v14h7l-12 13l-12-13h7z',GR)
def dice():
    return P('M8 12l16-7l16 7v20l-16 9l-16-9z',PA)+P('M8 12l16 8l16-8','none',1.8)+L('M24 20v21',K,1.8)+C(24,12,2,K,0)+C(15,24,2,K,0)+C(18,32,2,K,0)+C(31,27,2,K,0)+C(35,23,2,K,0)+C(30,34,2,K,0)
def medal():
    return P('M14 4h8l4 14h-8zM34 4h-8l-4 14h8z',RD,1.8)+C(24,30,12,GD)+star(GS).replace('<path','<path transform="translate(14.4 20.5) scale(.4)"')
def boots():
    f=lambda x,y,r:G(f'translate({x} {y}) rotate({r})',inner=P('M-4 -8h7v10l6 2v4h-13z',WD,1.8))
    return f(16,30,-10)+f(30,18,-10)+L('M8 44l6-3M22 32l6-3','#00000033',2)
def flask():
    d='M19 4h10v12l11 20q2 6-5 6H13q-7 0-5-6l11-20z'
    return P(d,PA)+clip('fl',d,P('M6 28h36v20H6z',GR,0)+C(20,33,2,'#c8f0b0',0)+C(27,37,1.6,'#c8f0b0',0))+P(d,'none')+P('M17 3h14v4H17z',WD,1.8)
def pin():
    return P('M24 44v-12',RD)+Lk('M24 44v-13',2.2,GY)+P('M15 8h18l-3 6l4 10H14l4-10z',RD)+P('M14 24h20v4H14z',RD,1.8)
def orc():
    return C(24,25,18,'#7aa04a')+P('M14 20l7 3M34 20l-7 3','none',2.4)+C(18,26,2.2,'#ffd84a',1.4)+C(30,26,2.2,'#ffd84a',1.4)+P('M15 34q9 6 18 0',K,0)+P('M17 34l2-5l2 5zM27 34l2-5l2 5z','#fff4dc',1.2)
def chart():
    return P('M6 6v36h36','none',2.4)+P('M12 40V28h6v12zM22 40V16h6v24zM32 40V22h6v18z',BL,1.8)
def portal(f=PU):
    return P('M10 44V22a14 14 0 0 1 28 0v22z','#5a5e68')+P('M15 44V23a9 9 0 0 1 18 0v21z',f,1.8)
def castle():
    return P('M6 44V16h6v4h4v-4h6v4h4v-4h6v4h4v-4h6v28z','#c8ccd4')+P('M20 44V34a4 4 0 0 1 8 0v10z',DK,1.8)+P('M12 26h4v5h-4zM32 26h4v5h-4z',DK,1.4)+P('M24 4v10','none',1.8)+P('M24 4h8l-2 3l2 3h-8','#d8453a',1.6)
def trash():
    return P('M10 12h28l-3 32H13z',GY)+P('M7 8h34v5H7zM19 4h10v4H19z',GY,1.8)+L('M18 18v20M24 18v20M30 18v20',K,1.8)
def quill():
    return P('M40 4C26 6 14 18 12 34l4 2C22 22 32 12 40 4z',PA)+L('M12 34l-4 10',K,2.4)+L('M16 30l8-1M20 23l8-1',GY,1.4)
def typewriter():
    return P('M12 4h24v14H12z',PA,1.8)+L('M16 9h16M16 13h11','#a08060',1.4)+P('M4 18h40v16H4z',DK)+''.join(C(10+i*7,26,2.4,PA,1.2) for i in range(5))+P('M10 34h28v6H10z',GY,1.8)
def chevrons():
    return Lk('M8 12l12 12l-12 12',3.4,BL)+Lk('M24 12l12 12l-12 12',3.4,BL)
def glitch():
    return P('M4 8h40v28H4z',DK)+P('M8 12h32v20H8z','#4ab8e0',1.2)+P('M8 18h20v4H8z','#ff4fd8',0)+P('M18 26h22v3H18z','#3fe8ff',0)+P('M12 14h8v2h-8z','#fff',0)+P('M18 36h12l2 6H16z',GY,1.6)
def bigtext():
    return T(18,38,'A',30)+T(36,38,'a',20)
def namecard():
    return P('M4 10h40v28H4z','#e8eef4')+C(15,22,5,'#c8ccd4',1.6)+P('M8 34q7-10 14 0z','#c8ccd4',1.6)+L('M27 18h12M27 24h12M27 30h8','#8a8f9c',2)
def tower():
    return P('M14 44l3-28h14l3 28z','#c8ccd4')+P('M12 10h24v8H12z','#c8ccd4')+P('M12 10v-6h5v3h4V4h6v3h4V4h5v6',  '#c8ccd4',1.8)+P('M21 44V34a3 3 0 0 1 6 0v10z',DK,1.6)
def calendar():
    return P('M6 10h36v32H6z',PA)+P('M6 10h36v8H6z',RD)+L('M14 6v8M34 6v8',K,3)+''.join(P(f'M{10+(i%4)*8} {22+(i//4)*7}h5v4h-5z','#c8b090',1.1) for i in range(8))
def eye():
    return P('M4 24q20-22 40 0q-20 22-40 0z',PA)+C(24,24,8,'#4a8ad8')+C(24,24,3.4,K,0)+C(26.5,21.5,1.4,'#fff',0)
def note():
    return P('M18 34V8l20-4v26','none',3.4)+L('M18 34V8l20-4v26',K,3.6)+L('M18 34V8l20-4v26',GD,1.4)+C(13,35,6,GD)+C(33,30,6,GD)
def sparkle(f='#ffd84a'):
    s=lambda x,y,r:P(f'M{x} {y-r}q{r*.18} {r*.82} {r} {r}q-{r*.82} {r*.18} -{r} {r}q-{r*.18} -{r*.82} -{r} -{r}q{r*.82} -{r*.18} {r} -{r}z',f,1.8)
    return s(20,24,16)+s(36,12,7)+s(36,36,6)
def graph():
    return P('M4 4h40v40H4z',DK)+L('M8 34l9-8l7 4l8-14l8-6','#5fe05a',2.6)+L('M8 40h32','#5a5e68',1.4)
def burst(f='#ff9a3c'):
    pts=[(24+(19 if i%2==0 else 9)*math.cos(i*math.pi/7),24+(19 if i%2==0 else 9)*math.sin(i*math.pi/7)) for i in range(14)]
    return P('M'+' L'.join(f'{a:.1f} {b:.1f}' for a,b in pts)+'z',f)+C(24,24,6,'#ffe27a',1.4)
def calc():
    return P('M10 4h28v40H10z',DK)+P('M14 8h20v9H14z','#c8f0b0',1.4)+''.join(P(f'M{14+(i%3)*7} {21+(i//3)*7}h5v5h-5z',PA,1.1) for i in range(9))
def numbadge(t,sz=18):
    return P('M4 12h40v24H4z',PA)+T(24,31,t,sz)
def gamepad():
    return P('M10 14h28q8 0 8 12q0 12-7 12q-4 0-7-6H16q-3 6-7 6q-7 0-7-12q0-12 8-12z',DK)+P('M12 22h3v-3h3v3h3v3h-3v3h-3v-3h-3z',PA,1)+C(32,22,2.2,RD,1.2)+C(36,27,2.2,GD,1.2)
def bell():
    return P('M24 6a3 3 0 0 1 3 3q10 3 10 17v6l4 5H7l4-5v-6q0-14 10-17a3 3 0 0 1 3-3z',GD)+C(24,41,3.4,GD,1.8)
def cap():
    return P('M12 22v10q12 8 24 0V22','#3a3e48')+P('M2 18L24 8l22 10-22 10z','#2a2e38')+L('M40 21v12',K,5.4)+L('M40 21v12',GD,2.4)
def keycap(t,sz=20):
    return P('M6 8h36v32H6z','#c8ccd4')+P('M10 10h28v24H10z',PA,1.6)+T(24,29,t,sz)
def arrows():
    a=lambda r:G(f'rotate({r} 24 24)',inner=P('M24 3l7 9h-4v8h-6v-8h-4z',PA,1.8))
    return a(0)+a(90)+a(180)+a(270)+C(24,24,3,GY,1.6)
def telescope():
    return G('rotate(-25 24 24)',inner=P('M6 20h26v9H6z',WD)+P('M32 18h10v13H32z','#c8ccd4')+P('M2 21h4v7H2z',GY,1.6))+L('M20 32l-8 12M22 32l8 12',K,2.6)
def alienface():
    return P('M24 4c11 0 18 9 18 18c0 13-11 22-18 22S6 35 6 22C6 13 13 4 24 4z','#7ad08a')+P('M10 22q7-1 10 6q-7 1-10-6zM38 22q-7-1-10 6q7 1 10-6z',K,1.4)
def pig():
    return C(24,25,17,'#f4b8c0')+P('M10 12l4 8l-7 0zM38 12l-4 8l7 0z','#f4b8c0',1.8)+P('M17 28q7-6 14 0q0 8-7 8t-7-8z','#e898a8',1.8)+C(21,31,1.4,K,0)+C(27,31,1.4,K,0)+C(17,20,1.6,K,0)+C(31,20,1.6,K,0)
def hero_fig():
    return C(24,13,7,'#f0c8a0')+P('M12 44q0-18 12-18q12 0 12 18z',RD)+P('M8 26l8 2l-2 14l-8-2z','#d8a030',1.8)
def zoom(sign):
    s=magnifier(20,20,12)+L(f'M14 20h12'+('M20 14v12' if sign=='+' else ''),K,3)
    return s
def expand():
    return ''.join(Lk(d,3,PA) for d in['M6 16V6h10','M42 16V6H32','M6 32v10h10','M42 32v10H32'])+Lk('M14 14l20 20M34 14L14 34',2,GY)
def frame():
    return ''.join(Lk(d,3,PA) for d in['M6 16V6h10','M42 16V6H32','M6 32v10h10','M42 32v10H32'])+C(24,24,8,RD)+C(24,24,3,PA,1.4)
def lantern_beam():
    return P('M24 18L46 6v24z','#ffe27a',1.6)+P('M6 12h16v12H6z',GY)+P('M2 14h4v8H2z',DK,1.6)+L('M30 34l6 6l6-6M36 40V28','#5ab4ff',2.6).replace('stroke="#5ab4ff"','stroke="#5ab4ff"')
def portal_bubble(sym):
    return portal()+P('M24 4h20v14h-9l-5 5v-5h-6z',PA,1.8)+sym
def chain_lock():
    return lock(24,30,.9)+Lk('M2 12q11 10 22 4t22 4',3,GY)
def card_magn():
    return P('M6 6h24v32H6z',PA)+L('M10 13h16M10 19h16M10 25h10','#a08060',1.6)+magnifier(32,30,8)
def nest():
    return P('M6 32q18 14 36 0q-4-6-18-6t-18 6z',WD)+L('M8 32q16 6 32 0M10 36q14 5 28 0',K,1.2)+P('M17 30a7 9 0 1 1 14 0z','#f4ead8')
def bricks():
    return P('M4 10h40v28H4z','#c0563a')+L('M4 19h40M4 28h40M16 10v9M32 10v9M24 19v9M10 28v10M38 28v10',K,1.6)
def sci():
    return T(18,34,'×10',15,K)+T(37,24,'²',14,K)
I=[]  # (sección, emoji, qué es, svg)
def A(sec,em,txt,svg):I.append((sec,em,txt,svg))
S1='En partida';A(S1,'💀','Bocadillos de los portales (botón)',portal_bubble(L('M30 11h8',K,2)));A(S1,'⛓️🔒','Botón bloqueado (Mecha Cerdito y otros)',chain_lock());A(S1,'🔍','Abrir la ficha (menú de torre)',card_magn());A(S1,'🔦','Mover la luz del Faro (menú de torre)',lantern_beam());A(S1,'⚔️','Contador «En el mapa»',swords())
A(S1,'＋','Acercar',zoom('+'));A(S1,'－','Alejar',zoom('-'));A(S1,'⤢','Ver todo el mapa',expand());A(S1,'◎','Encuadrar lo construido',frame())
S2='Logros (categorías)';A(S2,'🎓','Primeros pasos',boots());A(S2,'🎲','Formas de jugar',dice());A(S2,'🦸','Héroes',helmet());A(S2,'🧪','Estados y combinaciones',flask());A(S2,'📜','Eventos y torres únicas',scroll());A(S2,'🗺️','Mapa',mapic());A(S2,'🎖️','De veterano',medal());A(S2,'📌','Fijar un logro',pin());A(S2,'🔒','Logro bloqueado',lock())
S3='Estadísticas (pestañas)';A(S3,'📊','Partida',chart());A(S3,'⚔️','Daño',swords());A(S3,'💎','Reliquias',gem());A(S3,'🦸','Héroe',helmet());A(S3,'👾','Enemigos',orc())
S4='Partidas';A(S4,'⭐','Guardadas / Guardar',star());A(S4,'⬇️','Descargar historial',download());A(S4,'🗺️','Ver mapa grande',mapic()+magnifier(34,32,7));A(S4,'🐉','Era Fantástica (en la lista)',castle())
S5='Opciones (pestañas)';A(S5,'⚙️','Juego',gear());A(S5,'⌨️','Atajos',keyboard());A(S5,'🎨','Personalización',palette());A(S5,'💬','Diálogos',bubble());A(S5,'🔊','Sonido',speaker(2));A(S5,'🖥️','Gráficos',monitor());A(S5,'♿','Accesibilidad',access());A(S5,'🔓','Desbloqueos',lock(open_=True));A(S5,'💾','Guardado',floppy())
S6='Opciones (cada opción)'
for em,t,s in[('🔤','Teclas sobre los botones',keycap('Q')),('📌','Fijar fichas',pin()),('⛶','Pantalla completa al empezar',expand()),('💥','Números de daño',burst('#ff6a5a')+T(24,30,'12',14,'#fff')),('💡','Pistas',bulb()),('🎯','Portales abiertos en construcción',portal_bubble(L('M28 11h4m2 0h4',K,2))),('🌀','Portales abiertos en combate',portal()+swords().replace('<g transform="rotate','<g transform="translate(24 0) scale(.5) rotate')),
 ('🕒','Mostrar tiempo real',clock()),('⏱️','Mostrar tiempo de combate',clock('#ffe0d0')+P('M20 4h8v4h-8z',GY,1.6)),('🐢','Ralentizar al consultar información',P('M8 34q2-16 16-16q14 0 16 16z','#6aa04a')+L('M14 28h20M18 22v12M30 22v12',K,1.4)+C(41,30,4,'#8ac06a',1.8)+P('M10 34v5h5v-5zM30 34v5h5v-5z','#8ac06a',1.6)),
 ('⌨️','Atajos de teclado',keyboard()),('🗑️','Borrar progreso',trash()),('✍️','Velocidad del texto',quill()),('📝','Efecto máquina de escribir',typewriter()),('⏩','Avance automático',chevrons()),('⏳','Pausa del avance automático',hourglass()),('📺','Efectos de fallo de ÉTER',glitch()),('🔠','Texto de diálogos grande',bigtext()),('🪪','Tu nombre',namecard()),
 ('🗼','Desbloquear todas las torres',tower()),('🦸','Desbloquear todos los héroes',helmet()),('💎','Desbloquear todas las reliquias',gem()),('🗺️','Desbloquear todos los eventos',scroll()),('🎨','Desbloquear la personalización',palette()),('📅','Desbloquear todas las duraciones',calendar()),('📖','Compendio completo',book(check=True)),('📘','Abrir el Compendio',book(open_=True)),('🕵️','Revelar logros secretos',eye()),
 ('🔊','Volumen general',speaker(2)),('🎵','Música',note()),('💫','Efectos de sonido',sparkle('#ffd84a')),('📈','Mostrar FPS',graph()),('✨','Destellos de impacto',burst()),('🧮','Tooltips de DPS avanzados',calc()),('🔢','Abreviar números grandes',numbadge('1,2k')),('🔬','Notación científica',numbadge('')+sci()),('⌛','Tiempo de apertura del panel',hourglass('#9ad0f0'))]:A(S6,em,t,s)
S7='Atajos (lista de teclas)';A(S7,'⬆️⬅️','Mover la cámara',arrows());A(S7,'🔍','Zoom',zoom('+'));A(S7,'🔭','Ver todo el mapa',telescope());A(S7,'✨','Habilidad del héroe',sparkle());A(S7,'🌟','Habilidad definitiva',star('#ffb03a')+sparkle('#fff8d0').replace('<path','<path transform="translate(26 -2) scale(.4)"',1));A(S7,'🦸','Mover al héroe',hero_fig());A(S7,'👽','Mover a la criatura aliada',alienface());A(S7,'🐷','Mover a los cerditos',pig())
S8='Ayuda (pestañas)';A(S8,'🎮','Cómo se juega',gamepad());A(S8,'⌨️','Controles y atajos',keyboard());A(S8,'💡','Consejos rápidos',bulb());A(S8,'🎓','Tutoriales',cap());A(S8,'🔔','Pistas',bell())
S9='Otros';A(S9,'🏰','Créditos (portada)',castle());A(S9,'🪺','Evento «Nido abandonado» (lista)',nest());A(S9,'🧱','Personalización: caminos',bricks())
json.dump([(a,b,c,f'<svg viewBox="-4 -4 56 56">{d}</svg>') for a,b,c,d in I],open('/home/claude/towerize/maquetas/iconos_menus_bocetos.json','w'),ensure_ascii=False)
secs=[];[secs.append(x[0]) for x in I if x[0] not in secs]
h='<!doctype html><html><head><meta charset="utf-8"><style>body{margin:0;background:#14161c;font-family:system-ui,sans-serif}.w{width:1500px;padding:16px}h2{color:#f4ead8;margin:14px 0 8px;font-size:20px}.g{display:grid;grid-template-columns:repeat(8,1fr);gap:8px}.c{background:#f4ead8;border:2px solid #e0262e;border-radius:6px;padding:6px;text-align:center}.c svg{width:72px;height:72px;display:block;margin:0 auto}.n{font:800 12px system-ui;color:#fff;background:#e0262e;border-radius:9px;padding:0 6px;display:inline-block}.e{font-size:18px;margin-left:4px}.t{font-size:12.5px;color:#2a2018;line-height:1.2;margin-top:4px;min-height:30px}</style></head><body><div class="w"><h2 style="font-size:24px">Iconos que siguen en emoji · bocetos (número · emoji de ahora · qué es)</h2>'
n=0
for sc in secs:
    h+=f'<h2>{sc}</h2><div class="g">'
    for a,b,c,d in I:
        if a!=sc:continue
        n+=1;h+=f'<div class="c"><div><span class="n">{n}</span><span class="e">{b}</span></div><svg viewBox="-4 -4 56 56">{d}</svg><div class="t">{c}</div></div>'
    h+='</div>'
open('/home/claude/towerize/maquetas/iconos_menus_bocetos.html','w',encoding='utf8').write(h+'</div></body></html>');print(n)
