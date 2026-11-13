import json,math,re
# Ronda 6 (13-nov-2026): los emojis que aún no tenían dibujo. Interfaz, habilidades de enemigos (Mecánicas) y unidades.
SP='tools/dibujos_menus'
src=open(SP+'/menu_icons5.py',encoding='utf8').read()
src=src[:src.index("I=[]\ndef A(n,em,txt,svg)")]
exec(src)
MENUS=json.load(open('src/iconos/menus_final.json',encoding='utf8'))
def inner(s):
    m=re.match(r'\s*<svg[^>]*>(.*)</svg>\s*$',s,re.S);return m.group(1) if m else s
OK=lambda k:inner(MENUS[k])  # dibujo ya aprobado
SV='#d8dee6';SV2='#9aa5b0';BR='#7a4a2a';SK='#e8c49a';OR='#ff9a3c';CY='#3fe8ff';MG='#ff4fd8';NV='#2a2e38'
def poly(pts):return 'M'+' L'.join(f'{x:.1f} {y:.1f}' for x,y in pts)+'z'
def rot(pts,a,cx=24,cy=24):
    c,s=math.cos(math.radians(a)),math.sin(math.radians(a));return [(cx+(x-cx)*c-(y-cy)*s,cy+(x-cx)*s+(y-cy)*c) for x,y in pts]
# ---------------- interfaz ----------------
def warn():
    d='M24 5q2 0 3 2l18 33q1 3-2 4H5q-3-1-2-4L21 7q1-2 3-2z'
    return P(d,GD,2.4)+P('M21.5 16h5l-1 14h-3z',K,1)+C(24,36,2.6,K,1)
def keyarrow(a):
    cap=P('M6 6h36a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4z','#e8e2d4')+L('M6 38h36','#b8b0a0',2)
    ar=rot([(24,11),(35,23),(28.5,23),(28.5,33),(19.5,33),(19.5,23),(13,23)],a,24,22)
    return cap+P(poly(ar),'#3a3e48',2)
def info():
    return C(24,24,20,BL,2.4)+C(24,14,3,'#fff',1.4)+P('M20 20h7v14h3v4H18v-4h3V24h-1z','#fff',1.4)
def tower_c():
    d='M12 44V18h-2V8h6v4h4V8h8v4h4V8h6v10h-2v26z'
    return P(d,'#b8b0a0',2.4)+clip('twc',d,L('M14 24h20M14 31h20M14 38h20M20 18v6M28 18v6M24 24v7M18 31v7M30 31v7M24 38v6','#8a8070',1.4))+P(d,'none',2.4)+P('M20 44v-9a4 4 0 0 1 8 0v9z',BR,2)+P('M22 14h4v4h-4z','#3a3e48',1.4)
def piece():
    sq=lambda x,y,f:P(f'M{x} {y}h13v13h-{13}z',f,2.2)+L(f'M{x+3} {y+3}h7',PA,1.4)
    return sq(5,8,'#d8b070')+sq(18,8,'#d8b070')+sq(18,21,'#d8b070')+sq(18,34,'#d8b070')+sq(31,21,'#c89a58')
def tile_buff():
    d='M8 14l16-8 16 8-16 8z'
    side=P('M8 14v12l16 8V22z','#a8743a',2.2)+P('M40 14v12l-16 8V22z','#8a5a28',2.2)
    star=lambda x,y,r,f:P(f'M{x} {y-r}q{r*.18} {r*.82} {r} {r}q-{r*.82} {r*.18}-{r} {r}q-{r*.18}-{r*.82}-{r}-{r}q{r*.82}-{r*.18} {r}-{r}z',f,1.8)
    return side+P(d,'#d8c090',2.2)+star(30,30,9,'#ffd84a')+star(15,33,5,'#fff2a0')+star(38,9,4,'#fff2a0')
def city():
    b=P('M4 44V24h8v20zM12 44V14h9v30zM21 44V20h7v24zM28 44V8h10v36zM38 44V26h7v18z','#2a2e48',2)
    w=L('M15 19v2M18 19v2M15 26v2M18 26v2M31 13v2M35 13v2M31 20v2M35 20v2M31 27v2M35 27v2M24 25v2M7 29v2',CY,1.8)+L('M41 31v2M24 32v2M15 33v2',MG,1.8)
    return P('M2 44h44',K,2.4)+b+w+L('M33 8V3',K,2)+C(33,3,1.6,MG,1)
def plus():
    d='M19 6h10v13h13v10H29v13H19V29H6V19h13z'
    return P(d,GR,2.4)+L('M22 9v12M9 22h12',PA,1.6)
def deck():
    c=lambda a,f:G(f'rotate({a} 24 40)',inner=P('M14 6h20a3 3 0 0 1 3 3v28a3 3 0 0 1-3 3H14a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3z',f,2.2))
    return c(-22,'#d8c090')+c(-8,'#e8dcc0')+c(8,PA)+P('M24 17l3.5 6.5L24 30l-3.5-6.5z',RD,1.6)+G('rotate(8 24 40)',inner='')
def chest():
    lid='M6 20v-4a10 6 0 0 1 10-6h16a10 6 0 0 1 10 6v4z'
    return P('M6 20h36v22H6z',WD,2.4)+P(lid,'#8a5a28',2.4)+L('M6 28h36','#5a3818',2)+P('M14 10v32M34 10v32','none',0)+P('M10 10v32h4V10zM34 10v32h4V10z',GS,1.8)+P('M20 24h8v9h-8z',GD,2)+C(24,28,1.3,K,0)
def skull():
    d='M24 5c10 0 17 7 17 16 0 5-2 8-5 10v6c0 2-2 3-4 3H16c-2 0-4-1-4-3v-6c-3-2-5-5-5-10C7 12 14 5 24 5z'
    return P(d,'#f0ead8',2.4)+P('M14 22a5 5 0 0 1 9 2c0 3-2 4-5 4s-4-3-4-6zM34 22a5 5 0 0 0-9 2c0 3 2 4 5 4s4-3 4-6z',K,1)+P('M24 28l2.5 5h-5z',K,1)+L('M19 36v4M24 36v4M29 36v4',K,1.8)
def picframe():
    o='M4 6h40v36H4z';i='M11 13h26v22H11z'
    return P(o,GD,2.4)+P(i,'#9ad0f0',2)+clip('pfr',i,P('M11 35l8-10 6 6 5-5 7 9z',GR,1.6)+C(31,19,3,'#fff2a0',1.2))+P(i,'none',2)+L('M7 9l4 4M41 9l-4 4M7 39l4-4M41 39l-4-4',GS,1.6)
def skip():
    d='M6 10l15 14L6 38zM21 10l15 14-15 14z'
    return P('M6 10l15 12V10l15 14-15 14V26L6 38z','#3a3e48',2.4)+P('M37 10h5v28h-5z','#3a3e48',2.4)
# ---------------- habilidades de enemigos ----------------
def boot():
    d='M14 6h13v20l12 6c3 2 4 4 4 8v2H9V31z'
    return P(d,BR,2.4)+L('M14 13h13M14 19h13','#5a3818',1.8)+P('M9 42h34v3H9z','#3a2818',2)
def heart(f='#ff6aa8',x=24,y=26,s=1):
    d=f'M{x} {y+16*s}C{x-18*s} {y+4*s} {x-18*s} {y-14*s} {x-8*s} {y-14*s}c{4*s} 0 {7*s} {3*s} {8*s} {6*s}c{1*s}-{3*s} {4*s}-{6*s} {8*s}-{6*s}C{x+18*s} {y-14*s} {x+18*s} {y+4*s} {x} {y+16*s}z'
    return P(d,f,2.4)+L(f'M{x-11*s} {y-6*s}q1-{4*s} {5*s}-{4*s}','#fff',2)
def charm():return heart('#ff6aa8')+P('M33 6l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z','#ffd84a',1.4)
def antenna():
    return P('M18 44l6-26 6 26z','#8a929c',2.2)+L('M20 36h8M21 30h6',K,1.6)+C(24,16,3.5,RD,1.8)+L('M15 10a12 12 0 0 0 0 12M33 10a12 12 0 0 1 0 12M10 6a18 18 0 0 0 0 20M38 6a18 18 0 0 1 0 20',K,2.4)+L('M15 10a12 12 0 0 0 0 12M33 10a12 12 0 0 1 0 12M10 6a18 18 0 0 0 0 20M38 6a18 18 0 0 1 0 20',CY,1)
def bomb_arc():
    return L('M6 40q8-34 30-30',K,1.8)+'<path d="M6 40q8-34 30-30" fill="none" stroke="#f4ead8" stroke-width="1.2" stroke-dasharray="2 3"/>'+C(33,30,10,'#3a3e48',2.4)+P('M37 18l4-2 2 4-4 2z',GY,1.6)+L('M42 17q3-3 1-6',K,1.6)+L('M27 25a5 5 0 0 1 4-3','#9aa0aa',1.6)+P('M43 9l1.5-3 1 3 3-.5-2 2.5z',OR,1)
def plane():
    d='M24 4c2 0 3 3 3 7v8l16 9v5l-16-4v9l5 4v3l-8-2-8 2v-3l5-4v-9l-16 4v-5l16-9v-8c0-4 1-7 3-7z'
    return P(d,'#9aa8b4',2.4)+L('M24 8v28',K,1)+P('M22.5 10h3v5h-3z',CY,1)
def carrow(cx,cy,r,a0,a1,w=4.4,f='#f4ead8'):
    # flecha curva de una sola pieza: banda de anillo de a0 a a1 (grados) y punta en a1
    pt=lambda rr,a:(cx+rr*math.cos(math.radians(a)),cy+rr*math.sin(math.radians(a)))
    sg=1 if a1>a0 else -1;ah=a1-sg*14;ro,ri=r+w/2,r-w/2
    o0,o1=pt(ro,a0),pt(ro,ah);i0,i1=pt(ri,a0),pt(ri,ah);h1,h2,tp=pt(r+w*1.4,ah),pt(r-w*1.4,ah),pt(r,a1)
    big=1 if abs(ah-a0)>180 else 0;sw=1 if sg>0 else 0
    d=f'M{o0[0]:.1f} {o0[1]:.1f}A{ro} {ro} 0 {big} {sw} {o1[0]:.1f} {o1[1]:.1f}L{h1[0]:.1f} {h1[1]:.1f}L{tp[0]:.1f} {tp[1]:.1f}L{h2[0]:.1f} {h2[1]:.1f}L{i1[0]:.1f} {i1[1]:.1f}A{ri} {ri} 0 {big} {1-sw} {i0[0]:.1f} {i0[1]:.1f}z'
    return P(d,f,1.9)
def axe_spin():
    ax=P('M22.5 10h3v32h-3z',WD,2)+P('M25.5 9q12-3 15 8l-1 7q-6-5-14-4z','#b8c0ca',2.2)+L('M38.5 12.5q1.5 4 1 10','#eef2f6',1.4)
    return carrow(24,24,19,150,250)+carrow(24,24,19,-30,70)+ax
def flames():
    d='M24 44c-10 0-16-6-16-14 0-7 5-10 6-17 4 3 5 7 5 10 2-5 4-11 2-18 9 4 15 13 15 23 0 10-6 16-12 16z'
    return P(d,OR,2.4)+P('M24 44c-5 0-8-3-8-8 0-4 3-6 4-10 2 2 3 4 3 7 2-3 3-6 2-9 5 3 7 7 7 12 0 5-3 8-8 8z','#ffd84a',1.8)
def quake():
    star=poly([(24+(15 if i%2==0 else 7)*math.cos(i*math.pi/6-math.pi/2),19+(15 if i%2==0 else 7)*math.sin(i*math.pi/6-math.pi/2)) for i in range(12)])
    return P('M3 38h42v7H3z',BR,2.2)+P('M18 38l3 4-2 3h3l2-4-2-3zM30 38l-2 3 2 4',  'none',1.6)+L('M20 38l3 3-2 4M30 38l-3 4 2 3',K,1.6)+P(star,'#ffb02e',2.4)+P(poly([(24+(7 if i%2==0 else 3)*math.cos(i*math.pi/6-math.pi/2),19+(7 if i%2==0 else 3)*math.sin(i*math.pi/6-math.pi/2)) for i in range(12)]),'#fff2a0',1.2)
def claws():
    one=lambda x:P(f'M{x} 6q8 14 2 36q4-16-6-30z',SV,2.2)
    return one(8)+one(19)+one(30)
def shield_f():
    d='M24 4l17 6v12c0 11-7 18-17 22C14 40 7 33 7 22V10z'
    return P(d,BL,2.4)+clip('shf',d,P('M24 4v40H6V4z','#6a96e8',0))+P(d,'none',2.4)+P('M24 13l3 6h6l-5 4 2 7-6-4-6 4 2-7-5-4h6z',GD,1.6)
def banner_e():
    return P('M10 4h3v40h-3z',WD,2)+C(11.5,4,2.4,GD,1.4)+P('M13 7h26l-6 9 6 9H13z',RD,2.2)+P('M20 12l2 3h3l-2 2 1 3-3-2-3 2 1-3-2-2h3z',GD,1.2)
def swirl(f='#7a5ad8',f2='#c0a8ff'):
    s=''
    for i,(r,c,w) in enumerate([(18,f,5),(12,f2,4),(6,f,3.5)]):
        s+=L(f'M{24+r} 24a{r} {r} 0 1 1-{r*0.6:.1f}-{r*0.8:.1f}',K,w+2.4)+L(f'M{24+r} 24a{r} {r} 0 1 1-{r*0.6:.1f}-{r*0.8:.1f}',c,w)
    return s+C(24,24,2.4,f2,1.4)
def ghost():
    d='M10 44V22a14 14 0 0 1 28 0v22l-5-4-5 4-4-4-4 4-5-4z'
    return P(d,'#eef0f6',2.4)+'<path d="'+d+'" fill="none" stroke="#c8d0e0" stroke-width="1" stroke-dasharray="2 2" transform="translate(3 0)" opacity=".7"/>'+P('M17 20a2.6 3.4 0 1 0 .01 0zM31 20a2.6 3.4 0 1 0 .01 0z',K,1)+P('M21 31q3 3 6 0',K,1.6)
def dna():
    s=''
    pts1=[(24+10*math.sin(t/40*2*math.pi),4+t) for t in range(0,41,2)]
    pts2=[(24-10*math.sin(t/40*2*math.pi),4+t) for t in range(0,41,2)]
    for t in range(4,40,6):
        x=10*math.sin(t/40*2*math.pi);s+=L(f'M{24-x:.1f} {4+t}H{24+x:.1f}','#ffd84a',2.2)
    d1='M'+' L'.join(f'{x:.1f} {y}' for x,y in pts1);d2='M'+' L'.join(f'{x:.1f} {y}' for x,y in pts2)
    return s+L(d1,K,5.4)+L(d1,GR,3)+L(d2,K,5.4)+L(d2,'#5aa0ff',3)
def egg_burst():
    return P('M24 6c8 0 14 12 14 22s-6 16-14 16-14-6-14-16S16 6 24 6z','#f4e8c8',2.4)+P('M10 26l5-3 4 4 5-5 5 5 4-4 5 3v2q-1 14-14 14T10 28z','#e0d0a8',2)+C(19,15,1.6,'#a8c070',0)+C(29,20,2,'#a8c070',0)+P('M6 10l3 3M42 10l-3 3M24 1v4',K,0)+L('M6 9l4 4M42 9l-4 4M24 0v4',K,2)
def ufo():
    return P('M14 22a10 9 0 0 1 20 0z','#9ad0f0',2.2)+P('M4 26c0-3 9-6 20-6s20 3 20 6-9 6-20 6S4 29 4 26z',SV2,2.4)+C(12,26,1.8,'#ffd84a',1)+C(24,28,1.8,'#ffd84a',1)+C(36,26,1.8,'#ffd84a',1)+P('M18 32h12l5 12H13z','#3fe8ff55',1.6)
def throne():
    return P('M12 4h24v22H12z','#9a2a3a',2.4)+P('M15 7h18v16H15z','#c8404f',1.6)+P('M8 26h32v6H8z',GD,2.2)+P('M10 32h5v12h-5zM33 32h5v12h-5z',GS,2.2)+P('M18 4l6-3 6 3',GD,1.6)+C(24,14,2.4,GD,1.4)
def moneybag():
    d='M18 12h12l-2 4c9 4 14 12 14 20 0 6-5 8-18 8S6 42 6 36c0-8 5-16 14-20z'
    return P(d,'#c8a060',2.4)+P('M16 8l4-4 4 3 4-3 4 4-4 4h-8z','#c8a060',2.2)+L('M18 14h12','#5a3818',2.4)+'<text x="24" y="37" font-family="system-ui,sans-serif" font-weight="900" font-size="15" text-anchor="middle" fill="#7a5a18">$</text>'+C(40,12,4,GD,1.6)+C(38,6,3,GD,1.4)
def crown_s():
    return P('M6 36l-2-22 10 9 10-15 10 15 10-9-2 22z',GD,2.4)+P('M6 36h36v6H6z',GS,2.2)+C(24,30,3,RD,1.4)+C(13,31,2.2,BL,1.2)+C(35,31,2.2,GR,1.2)+C(4,13,2,GD,1.2)+C(24,7,2,GD,1.2)+C(44,13,2,GD,1.2)
def gen_shield():
    d=poly([(24+20*math.cos(math.radians(a)),24+20*math.sin(math.radians(a))) for a in range(-90,270,60)])
    return P(d,'#4a8ad8',2.4)+P(poly([(24+12*math.cos(math.radians(a)),24+12*math.sin(math.radians(a))) for a in range(-90,270,60)]),'#7ac0ff',1.8)+L('M24 4v8M41 14l-7 4M41 34l-7-4M24 44v-8M7 34l7-4M7 14l7 4',K,1.4)+C(24,24,3,'#e8fbff',1.2)
def anchor():
    return C(24,8,4,'none',2.4)+L('M24 12v30M14 18h20',K,5)+L('M24 12v30M14 18h20',SV2,2.6)+L('M8 28q2 14 16 14t16-14',K,5)+L('M8 28q2 14 16 14t16-14',SV2,2.6)+P('M4 30l4-5 4 5z',SV2,1.8)+P('M36 30l4-5 4 5z',SV2,1.8)
def abyss_heart():return heart('#3fbf6a')+L('M16 26h5l2-4 3 8 2-4h5','#eaffea',2)
def foot():
    return P('M14 44c-4 0-6-4-5-9 1-8 4-16 9-20 5-3 12-1 14 4 2 6-2 11-4 17-2 5-6 8-14 8z',SK,2.4)+C(34,8,3.4,SK,1.8)+C(27,6,3,SK,1.8)+C(39,13,2.6,SK,1.6)+C(21,8,2.6,SK,1.6)+C(41,19,2.2,SK,1.4)+L('M4 46h40',K,0)
def factory():
    return P('M4 44V24l10 6v-6l10 6v-6l10 6V10h8v34z','#8a929c',2.4)+P('M9 36h5v5H9zM19 36h5v5h-5zM29 36h5v5h-5z','#ffd84a',1.6)+P('M36 10h4v-4h-4z','#5a626c',1.4)+C(38,4,2.6,'#c8ccd4',1.2)+C(43,2,1.8,'#c8ccd4',1)
def rift():return swirl('#5a2a8a','#d070ff')
def bat_wings():
    d='M24 18c3 0 5 3 5 6l4-6c3 2 6 3 9 2-2 4-1 9 2 12-4 0-7 2-8 5-2-3-5-4-8-3l-4 8-4-8c-3-1-6 0-8 3-1-3-4-5-8-5 3-3 4-8 2-12 3 1 6 0 9-2l4 6c0-3 2-6 5-6z'
    return P(d,'#4a3a5a',2.4)+P('M21 14l1.5 4h3l1.5-4',  '#4a3a5a',1.6)+C(22,23,1,'#ffd84a',0)+C(26,23,1,'#ffd84a',0)
def shell_s():
    d='M24 6c12 0 20 10 20 22l-6 10H10L4 28C4 16 12 6 24 6z'
    return P(d,'#f0c8a8',2.4)+clip('shs',d,L('M24 40V6M24 40L12 9M24 40L36 9M24 40L5 22M24 40l19-18','#c89070',2))+P(d,'none',2.4)+P('M18 38h12l-2 6h-8z','#e0a888',2)
def no_signal():
    bars=P('M8 36h6v8H8zM17 28h6v16h-6zM26 20h6v24h-6zM35 12h6v32h-6z','#9aa0aa',2)
    return bars+L('M6 8l36 36',K,6.4)+L('M6 8l36 36',RD,3.6)
def core_d():
    d='M24 3l17 21-17 21L7 24z'
    return P(d,'#4fd6e8',2.4)+clip('cd2',d,P('M24 3v42H4V3z','#2aa8c8',0)+L('M7 24h34M24 3l-6 21 6 21M24 3l6 21-6 21','#e8fbff',1.4))+P(d,'none',2.4)
def fist():
    return P('M12 20c0-3 2-5 5-5h3c1-2 3-3 5-3s4 1 5 3c2-1 5 0 6 2 2 0 4 2 4 5v10c0 7-6 12-13 12h-3c-7 0-12-5-12-12z',SK,2.4)+L('M20 15v8M25 12v11M30 15v8M12 24q6-2 10 2',K,1.8)+L('M22 30h8',K,1.4)
# ---------------- unidades ----------------
def soldier(f_body='#c8ccd4',weapon='sword'):
    s=P('M14 44l2-14a8 8 0 0 1 16 0l2 14z','#6a7a9a',2.2)  # cuerpo
    s+=P('M17 18a7 7 0 0 1 14 0v4H17z',f_body,2.2)+P('M18 22h12v3a6 6 0 0 1-12 0z',SK,2)+L('M17 19h14',K,1.6)
    return s
def bastion_u():
    s=soldier()
    s+=P('M36 8l3 2-9 22-2-1z',SV,1.8)+P('M27 30l5 2-1 2-5-2z',GD,1.6)
    s+=P('M6 26l11-3 1 12c0 5-4 8-6 9-3-2-6-5-6-10z',BL,2.2)+P('M11 28v12',GD,1.6)
    return s
def monk_u():
    s=P('M12 44c0-10 4-18 12-18s12 8 12 18z','#e08a2a',2.2)+L('M24 26l-6 18','#b85a18',2)
    s+=C(24,17,7,SK,2.2)+L('M20 17h2.5M25.5 17H28',K,1.6)+P('M15 34q9-6 18 0l-2 4q-7-4-14 0z',SK,1.8)
    return s
def guild_u():
    s=P('M14 44l2-14a8 8 0 0 1 16 0l2 14z','#3a7a4a',2.2)+C(24,19,7,SK,2.2)+P('M15 17q9-12 18 0q-9-4-18 0z','#5a3818',2)+P('M14 16q10-8 20 0l2 2H12z','#4a6a3a',2)+P('M29 13q4-8 10-10q-2 6-8 11z','#d84a3a',1.6)
    s+=G('rotate(30 38 30)',inner=P('M37 14h3v22h-3z',SV,1.6)+P('M34 36h9v2.5h-9z',GD,1.4))+C(10,36,5,GD,1.8)+C(10,36,2.4,GS,1)
    return s
def robot_u():
    s=P('M12 22h24v20H12z','#9aa5b0',2.4)+P('M16 26h16v8H16z','#2a2e38',1.6)+C(20,30,2,CY,1)+C(28,30,2,CY,1)
    s+=P('M15 8h18v12H15z','#c8ccd4',2.2)+P('M18 12h4v4h-4zM26 12h4v4h-4z',CY,1.4)+L('M24 8V3',K,2)+C(24,3,1.8,RD,1.2)
    s+=P('M6 24h6v12H6zM36 24h6v12h-6z','#7a848e',2)+P('M16 42h6v4h-6zM26 42h6v4h-6z','#5a626c',2)
    return s

# ======== ronda 2: correcciones de Nogal ========
def sword(x,y,ang,ln=22,blade=SV):
    # espada completa: hoja, guarda, empuñadura y pomo (en coordenadas locales, la punta hacia arriba)
    return G(f'translate({x} {y}) rotate({ang})',inner=P(f'M-1.8 0V-{ln}l1.8-3.2 1.8 3.2V0z',blade,1.8)+P('M-6 0h12v2.6H-6z',GD,1.6)+P('M-1.5 2.6h3v6h-3z',WD,1.5)+C(0,10.2,1.9,GD,1.3))
def tframe():
    o='M6 6h36v36H6z';i='M13 13h22v22H13z'
    d=o+' '+i[0:]
    ring='<path d="M6 6h36v36H6zM13 13v22h22V13z" fill="#8a4ad8" stroke="#1b1712" stroke-width="2.4" stroke-linejoin="round" fill-rule="evenodd"/>'
    return ring+L('M9 9h30',  '#b88af0',1.6)+P('M4 4h7v7H4zM37 4h7v7h-7zM4 37h7v7H4zM37 37h7v7h-7z',GD,1.8)
def tower_s(x,y,s):
    return G(f'translate({x} {y}) scale({s}) translate(-24 -24)',inner=tower_c())
def deck2():
    c=lambda a,f:G(f'rotate({a} 24 40)',inner=P('M14 6h20a3 3 0 0 1 3 3v28a3 3 0 0 1-3 3H14a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3z',f,2.2))
    return c(-22,'#d8c090')+c(-8,'#e8dcc0')+G('rotate(8 24 40)',inner=P('M14 6h20a3 3 0 0 1 3 3v28a3 3 0 0 1-3 3H14a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3z',PA,2.2)+tower_s(24,23,.52))
def tile_buff2(top='#b87ad8',l='#7a3aa8',r='#5a2a80'):
    d='M8 14l16-8 16 8-16 8z'
    star=lambda x,y,rr,f:P(f'M{x} {y-rr}q{rr*.18} {rr*.82} {rr} {rr}q-{rr*.82} {rr*.18}-{rr} {rr}q-{rr*.18}-{rr*.82}-{rr}-{rr}q{rr*.82}-{rr*.18} {rr}-{rr}z',f,1.8)
    return P('M8 14v12l16 8V22z',l,2.2)+P('M40 14v12l-16 8V22z',r,2.2)+P(d,top,2.2)+star(30,30,9,'#ffd84a')+star(15,33,5,'#fff2a0')+star(38,9,4,'#fff2a0')
def boot2():
    d='M13 5h14v21l12 5c3 1 5 4 5 8v3H13z'
    return P(d,BR,2.4)+clip('bt2',d,L('M10 12h20M10 18h20','#5a3818',1.8))+P(d,'none',2.4)+P('M11 42h35v3.5H11z','#3a2818',2)
AXE='<path d="M0 -12q1.6 10 -.6 18q-.6 4 .4 7" fill="none" stroke="#1b1712" stroke-width="5.2" stroke-linecap="round"/><path d="M0 -12q1.6 10 -.6 18q-.6 4 .4 7" fill="none" stroke="#c07a3a" stroke-width="2.8" stroke-linecap="round"/><circle cx="0.2" cy="13.6" r="1.9" fill="#c07a3a" stroke="#1b1712" stroke-width="1.2"/><path d="M-2 -15H9Q12 -8 10 -1Q5 -6 1.6 -8H-2z" fill="#6a7280" stroke="#1b1712" stroke-width="2.1" stroke-linejoin="round"/><path d="M7.6 -14Q10 -8 8.4 -2.6" fill="none" stroke="#c8d0d8" stroke-width="1.3" stroke-linecap="round"/><path d="M-2 -15H9Q12 -8 10 -1Q5 -6 1.6 -8H-2z" fill="none" stroke="#1b1712" stroke-width="2.1" stroke-linejoin="round"/>'
def axe_spin2():
    # el hacha del cerdito leñador, en diagonal entre las flechas, con el filo hacia arriba
    return carrow(24,24,20,150,250,4.2)+carrow(24,24,20,-30,70,4.2)+f'<g transform="translate(24 24) rotate(20) scale(.8) translate(-4 0)">{AXE}</g>'
def flames2():
    star=poly([(24+(21 if i%2==0 else 13)*math.cos(i*math.pi/8),26+(21 if i%2==0 else 13)*math.sin(i*math.pi/8)) for i in range(16)])
    return P(star,'#ff5a3a',2.2)+G('translate(24 26) scale(.72) translate(-24 -26)',inner=flames())
def quake2():
    waves=''
    for r,w in [(8,3.2),(14,2.8),(20,2.4)]:
        waves+=L(f'M{24-r} 30a{r} {r*.45} 0 0 1 {2*r} 0',K,w+2.4)+L(f'M{24-r} 30a{r} {r*.45} 0 0 1 {2*r} 0','#ffb02e',w)
    return P('M2 36h44v9H2z',BR,2.2)+L('M24 36l-3 4 3 2-2 3M12 36l2 4M36 36l-2 4',K,1.6)+waves
def shield2():
    d='M24 4l17 6v12c0 11-7 18-17 22C14 40 7 33 7 22V10z'
    inn='M24 8.5l13 4.6V22c0 8.6-5.3 14.4-13 17.6C16.3 36.4 11 30.6 11 22v-8.9z'
    return P(d,'#9aa5b0',2.4)+P(inn,'#b07a40',2)+clip('sh2',inn,L('M17.5 6v40M24 6v40M30.5 6v40','#7a4a20',1.6))+P(inn,'none',2)+C(24,22,3.4,'#9aa5b0',1.6)+C(16,16,1.3,'#5a626c',0)+C(32,16,1.3,'#5a626c',0)+C(24,33,1.3,'#5a626c',0)
def banner2():
    # estandarte de guerra: asta con punta, travesaño y paño colgando con el borde de abajo en picos
    cloth='M11 11h26v24l-6.5-4-6.5 5-6.5-5L11 35z'
    return P('M22.6 9h2.8v37h-2.8z',WD,1.8)+P('M24 1l3 6h-6z','#9aa5b0',1.6)+P('M8 8h32v3.4H8z',WD,1.8)+C(8,9.7,1.8,GD,1.2)+C(40,9.7,1.8,GD,1.2)+P(cloth,'#8a2a2a',2.2)+L('M14 14h20','#c84a3a',1.6)+P('M18 18l6 10 6-10-6 3z','#f0ead8',1.6)
def tele2():
    ring=lambda x,f:P(f'M{x-8} 40a8 3 0 1 0 16 0a8 3 0 1 0-16 0z',f,1.8)
    return ring(10,'#b48ae8')+ring(38,'#7a4ad8')+carrow(24,36,14,192,348,4.4,'#e8d8ff')
def camo2():
    d='M24 4a8 8 0 0 1 8 8 8 8 0 0 1-3 6.3l7 3.7 2 22H10l2-22 7-3.7A8 8 0 0 1 16 12a8 8 0 0 1 8-8z'
    return '<path d="'+d+'" fill="#9ab0b8" fill-opacity=".35" stroke="#1b1712" stroke-width="2.4" stroke-dasharray="4 3" stroke-linejoin="round"/>'+P('M30 32a8 5 0 0 1 14 0a8 5 0 0 1-14 0z','#f4ead8',1.8)+C(37,32,2.2,K,0)+L('M30 38l14-12',K,3.2)+L('M30 38l14-12',RD,1.6)
def hangar():
    arch='M4 42V26a20 18 0 0 1 40 0v16z'
    return P(arch,'#9aa5b0',2.4)+clip('hg',arch,L('M4 30a20 18 0 0 1 40 0M4 36a20 18 0 0 1 40 0','#6a747e',1.4))+P(arch,'none',2.4)+P('M14 42V30a10 8 0 0 1 20 0v12z','#2a2e38',2)+P('M2 42h44v4H2z','#5a626c',2)+G('translate(31 6)',inner=P('M-6 4l6-3 6 3-6 3z','#c8ccd4',1.6)+L('M-8 1l3 2M8 1l-3 2',K,1.6)+C(0,4,1.2,CY,0))
def throne2():
    return P('M13 3h22v30H13z',GD,2.4)+P('M16 6h16v24H16z','#9a2a3a',1.8)+P('M21 3l3-3 3 3',GD,1.6)+C(24,12,2.2,'#4fd6e8',1.2)+P('M7 22h7v14H7zM34 22h7v14h-7z',GD,2)+P('M10 28h28v7H10z','#c8404f',2.2)+P('M9 35h30v4H9z',GS,2)+P('M10 39h4v6h-4zM34 39h4v6h-4z',GS,1.8)
def scepter():
    g=G('rotate(35 24 24)',inner=P('M22.4 14h3.2v32h-3.2z',GD,1.8)+P('M20 40h8v3h-8z',GS,1.6)+P('M19 14h10v3H19z',GS,1.6)+C(24,8.5,5.6,RD,2)+P('M18.5 6l2.5 2 3-4 3 4 2.5-2-1 5.5h-9z',GD,1.4)+C(24,47,1.8,GD,1.2))
    return g+L('M22 9.5a3 3 0 0 1 2-2','#ffb0a0',1.2)
def platform():
    # plataforma sobre orugas con un emisor que lanza el láser hacia arriba
    return P('M6 34h36a5 5 0 0 1 0 10H6a5 5 0 0 1 0-10z','#3a3e48',2.2)+C(8,39,2.6,'#7a848e',1.2)+C(17,39,2.6,'#7a848e',1.2)+C(26,39,2.6,'#7a848e',1.2)+C(35,39,2.6,'#7a848e',1.2)+P('M8 26h32l2 8H6z','#9aa5b0',2.2)+P('M19 18h10l2 8H17z','#7a848e',2)+P('M22 10h4v8h-4z','#c8ccd4',1.8)+L('M24 9V1',K,4.6)+L('M24 9V1','#ff5ad8',2.4)+P('M12 29h5v2h-5zM31 29h5v2h-5z',CY,1)
def abyss2():
    d='M24 42C6 30 6 12 16 12c4 0 7 3 8 6 1-3 4-6 8-6 10 0 10 18-8 30z'
    return P('M14 15q-3-5 0-8.5q1 4.5 5 6.5zM34 15q3-5 0-8.5q-1 4.5-5 6.5z','#3a1a3a',1.8)+P(d,'#5a2a7a',2.4)+L('M14 26h5l2-4 3 8 2-4h8','#7aff9a',2.2)+L('M15 18q2-3 5-3','#8a5aaa',1.8)
def foot2():
    # planta del pie derecho: el dedo gordo a la izquierda y de mayor a menor hacia fuera
    sole='M17 44c-5 0-8-4-7-10 1-7 3-12 7-15 4-3 10-3 13 0 4 4 2 10 0 15-2 6-6 10-13 10z'
    return P(sole,SK,2.4)+P('M14 9a4.6 5.4 0 1 0 9.2 0a4.6 5.4 0 1 0-9.2 0z',SK,1.8)+C(27,8.5,3.2,SK,1.6)+C(33,11,2.8,SK,1.5)+C(37.5,15.5,2.4,SK,1.4)+C(40.5,21,2,SK,1.3)
def portal2():
    return P('M24 4c10 0 15 9 15 20s-5 20-15 20S9 35 9 24 14 4 24 4z','#5a5e68',2.4)+P('M24 9c6.6 0 10 7 10 15s-3.4 15-10 15-10-7-10-15 3.4-15 10-15z','#7a1a5a',2)+clip('pt2','M24 9c6.6 0 10 7 10 15s-3.4 15-10 15-10-7-10-15 3.4-15 10-15z',P('M24 14c4 0 6 5 6 10s-2 10-6 10-6-5-6-10 2-10 6-10z','#c03a8a',0)+P('M24 19c2 0 3 2.5 3 5s-1 5-3 5-3-2.5-3-5 1-5 3-5z','#ff8ac8',0))+P('M24 9c6.6 0 10 7 10 15s-3.4 15-10 15-10-7-10-15 3.4-15 10-15z','none',2)+P('M16 6l-3-5 6 3zM32 6l3-5-6 3z','#5a5e68',1.6)
def waves():
    s=C(24,24,5,'#4fd6e8',2.2)
    for r,w in [(11,3),(17,2.6)]:
        for a0,a1 in [(-40,40),(140,220)]:
            p0=(24+r*math.cos(math.radians(a0)),24+r*math.sin(math.radians(a0)));p1=(24+r*math.cos(math.radians(a1)),24+r*math.sin(math.radians(a1)))
            d=f'M{p0[0]:.1f} {p0[1]:.1f}A{r} {r} 0 0 1 {p1[0]:.1f} {p1[1]:.1f}'
            s+=L(d,K,w+2.4)+L(d,'#4fd6e8',w)
    return s
def soldier_body():
    return P('M14 44l2-14a8 8 0 0 1 16 0l2 14z','#6a7a9a',2.2)+P('M17 18a7 7 0 0 1 14 0v4H17z','#c8ccd4',2.2)+P('M18 22h12v3a6 6 0 0 1-12 0z',SK,2)+L('M17 19h14',K,1.6)
def bastion2():
    return soldier_body()+sword(34,32,20,20)+P('M6 26l11-3 1 12c0 5-4 8-6 9-3-2-6-5-6-10z',BL,2.2)+L('M11.5 27.5v13',GD,1.6)+C(33,33,2.6,SK,1.4)
def guild2():
    s=P('M14 44l2-14a8 8 0 0 1 16 0l2 14z','#3a7a4a',2.2)+C(24,19,7,SK,2.2)+P('M14 16q10-8 20 0l2 2H12z','#4a6a3a',2)+P('M29 13q4-8 10-10q-2 6-8 11z','#d84a3a',1.6)+sword(38,34,28,18)
    return s+C(36.5,35,2.6,SK,1.4)+C(10,36,5,GD,1.8)+C(10,36,2.4,GS,1)
def monk2():
    staff=G('rotate(-12 34 26)',inner=P('M32.6 4h3v42h-3z',WD,1.8)+P('M32 8h4.2v3H32z',GS,1.4))
    return staff+P('M12 44c0-10 4-18 12-18s12 8 12 18z','#e08a2a',2.2)+L('M24 26l-6 18','#b85a18',2)+C(24,17,7,SK,2.2)+L('M20 17h2.5M25.5 17H28',K,1.6)+P('M15 34q9-6 18 0l-2 4q-7-4-14 0z',SK,1.8)

def penta():
    pts=[(24+17*math.cos(math.radians(-90+i*144)),25+17*math.sin(math.radians(-90+i*144))) for i in range(5)]
    d='M'+' L'.join(f'{x:.1f} {y:.1f}' for x,y in pts)+'z'
    return C(24,25,20,'#3a1a2a',2.4)+C(24,25,17.5,'none',0)+L(d,K,4.6)+L(d,'#ff4a3a',2.4)+'<circle cx="24" cy="25" r="17.5" fill="none" stroke="#ff4a3a" stroke-width="1.6"/>'

I=[]
def A(grp,k,em,txt,svg):I.append((grp,k,em,txt,svg))
G1='Corregidos'
A(G1,'frame','🖼️','Marco de torre: el marco de casilla, en morado con remaches dorados',tframe())
A(G1,'deck','🃏','Ver tu mazo: la torre en la carta de delante',deck2())
A(G1,'c_bf','✨','Casillas: casilla morada',tile_buff2())
A(G1,'c_bf_r','✨','Casillas: casilla roja (otra opción)',tile_buff2('#e8706a','#b83a3a','#8a2a2a'))
A(G1,'e_tgnd','🥾','Terrestre: rayas dentro y talón recto',boot2())
A(G1,'e_whirl','🪓','Hachazo giratorio: el hacha del cerdito, en diagonal y con el filo arriba',axe_spin2())
A(G1,'e_jet','🔥','Estallido de llamas: llama sobre una explosión',flames2())
A(G1,'e_quake','💥','Golpe sísmico: ondas sobre el suelo agrietado',quake2())
A(G1,'e_shield','🛡️','Escudo frontal: de madera con borde de metal',shield2())
A(G1,'e_banner','🚩','Estandarte: de guerra (asta, travesaño y paño en picos)',banner2())
A(G1,'e_tele','🌀','Teletransporte: salta de un círculo violeta a otro más adelante',tele2())
A(G1,'e_camo','👻','Camuflaje: figura casi invisible (borde de puntos) y ojo tachado',camo2())
A(G1,'e_launch','🛸','Hangar: nave de techo curvo de la que sale un dron',hangar())
A(G1,'e_throne','🪑','Trono: respaldo alto dorado, cojín rojo y brazos',throne2())
A(G1,'e_scepter','👑','Cetrazo real: cetro con corona y rubí',scepter())
A(G1,'e_anchor','⚓','Plataforma móvil: plataforma con orugas que lanza el láser',platform())
A(G1,'e_abregen','💚','Regeneración abisal: corazón demoníaco con cuernos y pulso verde',abyss2())
A(G1,'e_stomp','🦶','Pisotón: dedos en orden, del gordo al pequeño',foot2())
A(G1,'e_rift','🌀','Portal del abismo: portal ovalado como los nuestros, en tonos del abismo',portal2())
A(G1,'e_pulse','📴','Pulso: ondas que salen del centro',waves())
A(G1,'e_penta','⛧','Pentagrama (también faltaba): círculo con la estrella encendida en rojo',penta())
A(G1,'u_bastion','🗡️🛡️','Soldado del Bastión: espada con guarda, empuñadura y pomo',bastion2())
A(G1,'u_guild','🪙🗡️','Aventurero del Gremio: espada completa',guild2())
A(G1,'u_monk','🧘','Monje: bastón detrás y con borde',monk2())
css='body{margin:0;background:#14161c;font-family:system-ui,sans-serif}.w{padding:16px;max-width:1240px}h1{color:#f4ead8;font-size:22px;margin:0 0 4px}p.s{color:#9aa0aa;margin:0 0 10px}h2{color:#f4ead8;margin:18px 0 8px;font-size:19px}.g{display:grid;grid-template-columns:repeat(6,1fr);gap:10px}.c{background:#f4ead8;border-radius:10px;padding:8px;border:3px solid #e02020;position:relative}.c .n{position:absolute;left:6px;top:4px;font:800 13px system-ui;color:#c02020}.c .e{position:absolute;right:6px;top:2px;font-size:20px}.c>svg{width:100%;height:auto;display:block;margin-top:14px}.sm{display:flex;gap:6px;align-items:center;justify-content:center;margin:2px 0}.sm svg{width:22px;height:22px}.sm .dk{background:#2a2e38;border-radius:4px;padding:2px}.t{font:600 12.5px system-ui;color:#1b1712;text-align:center;min-height:30px}'
h=f'<!doctype html><html><head><meta charset="utf-8"><style>{css}</style></head><body><div class="w"><h1>Iconos que faltan · ronda 2</h1><p class="s">Número, emoji de ahora (arriba a la derecha), el dibujo grande, en pequeño sobre claro y oscuro, y para qué es.</p>'
grp=None;n=0
for g,k,em,t,s in I:
    if g!=grp:
        if grp:h+='</div>'
        h+=f'<h2>{g}</h2><div class="g">';grp=g
    n+=1;sv=f'<svg viewBox="-4 -4 56 56">{s}</svg>'
    h+=f'<div class="c"><span class="n">{n}</span><span class="e">{em}</span>{sv}<div class="sm">{sv}<span class="dk">{sv}</span></div><div class="t">{t}</div></div>'
open('maquetas/iconos_faltan_r2.html','w',encoding='utf8').write(h+'</div></div></body></html>')
json.dump([(g,k,em,t,f'<svg viewBox="-4 -4 56 56">{s}</svg>') for g,k,em,t,s in I],open('maquetas/iconos_faltan_r2.json','w'),ensure_ascii=False)
print(n)
