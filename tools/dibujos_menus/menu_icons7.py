import json,math,re
# Ronda 3 (13-nov-2026): los tipos de cosmético que aún eran emoji y la tecla de pausa.
SP='tools/dibujos_menus'
src=open(SP+'/menu_icons6.py',encoding='utf8').read()
src=src[:src.index("\nI=[]\ndef A(grp")]
exec(src)
BRZ='#c8803a';BRZ2='#8a5220'
def hero_frame():
    # marco redondo de bronce con un retrato sencillo dentro
    s=C(24,24,21,BRZ,2.4)+C(24,24,15.5,'#5a7ab8',2)
    s+=clip('hfr','M24 8.5a15.5 15.5 0 1 1 0 31a15.5 15.5 0 1 1 0-31z',P('M12 42c0-8 5-12 12-12s12 4 12 12z','#3a4a6a',2)+C(24,22,6.5,SK,2))
    s+=C(24,24,15.5,'none',2)
    return s
def binding():
    # libro cerrado: tapa de cuero, lomo y cantoneras doradas
    return P('M10 6h26a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4H10z','#f4ead8',2.2)+P('M8 4h26a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4H8z','#a8302a',2.4)+P('M8 4h6v36H8z','#7a2018',2)+L('M17 12h14M17 17h10','#e8b0a0',1.6)+P('M30 4h4a4 4 0 0 1 4 4v4zM38 32v4a4 4 0 0 1-4 4h-4z',GD,1.6)+C(26,26,4,GD,1.6)
def deco():
    # decoración del mapa: un abeto con una piedra al lado
    return P('M24 3l9 12h-5l8 11h-6l8 11H10l8-11h-6l8-11h-5z','#3a8a4a',2.2)+P('M21.5 37h5v8h-5z',WD,1.8)+P('M34 45c-1-5 2-8 5-8s6 3 5 8z','#9aa0aa',2)+L('M37 41q2-1 4 0','#c8ccd4',1.4)
def path_c():
    # camino empedrado
    d='M4 10h40v28H4z'
    st=P('M6 12h11v7H6zM19 12h13v7H19zM34 12h8v7h-8zM6 21h7v7H6zM15 21h13v7H15zM30 21h12v7H30zM6 30h11v6H6zM19 30h12v6H19zM33 30h9v6h-9z','#c8b898',1.6)
    return P('M2 4h44v40H2z','#5fa84a',2.4)+P(d,'#8a7a62',2.4)+st+P(d,'none',2.4)
def effect():
    # efecto de torre: la torre con un aura y destellos alrededor
    star=lambda x,y,r,f:P(f'M{x} {y-r}q{r*.18} {r*.82} {r} {r}q-{r*.82} {r*.18}-{r} {r}q-{r*.18}-{r*.82}-{r}-{r}q{r*.82}-{r*.18} {r}-{r}z',f,1.6)
    return '<ellipse cx="24" cy="40" rx="18" ry="5" fill="#ffe27a" fill-opacity=".55" stroke="#1b1712" stroke-width="2"/>'+tower_s(24,26,.66)+star(7,14,5,'#ffd84a')+star(41,10,4.5,'#ffd84a')+star(40,28,3.4,'#fff2a0')+star(8,30,3,'#fff2a0')
def pause_play():
    return P('M4 10l16 14L4 38z','#3a3e48',2.4)+P('M26 10h6v28h-6zM36 10h6v28h-6z','#3a3e48',2.4)
I=[]
def A(grp,k,em,txt,svg):I.append((grp,k,em,txt,svg))
G1='Faltan (ronda 3)'
A(G1,'cs_frame','🖼️','Marco de héroe (el aviso «Marco de bronce para Reinhart»)',hero_frame())
A(G1,'cs_pal','📕','Encuadernación (color del libro)',binding())
A(G1,'cs_dec','🌲','Decoración del mapa',deco())
A(G1,'cs_path','🧱','Camino',path_c())
A(G1,'cs_fx','👑','Efecto de torre',effect())
A(G1,'k_pause','⏯️','Teclado · pausar / reanudar',pause_play())
css='body{margin:0;background:#14161c;font-family:system-ui,sans-serif}.w{padding:16px;max-width:1240px}h1{color:#f4ead8;font-size:22px;margin:0 0 4px}p.s{color:#9aa0aa;margin:0 0 10px}h2{color:#f4ead8;margin:18px 0 8px;font-size:19px}.g{display:grid;grid-template-columns:repeat(6,1fr);gap:10px}.c{background:#f4ead8;border-radius:10px;padding:8px;border:3px solid #e02020;position:relative}.c .n{position:absolute;left:6px;top:4px;font:800 13px system-ui;color:#c02020}.c .e{position:absolute;right:6px;top:2px;font-size:20px}.c>svg{width:100%;height:auto;display:block;margin-top:14px}.sm{display:flex;gap:6px;align-items:center;justify-content:center;margin:2px 0}.sm svg{width:22px;height:22px}.sm .dk{background:#3a3e48;border-radius:4px;padding:2px}.t{font:600 12.5px system-ui;color:#1b1712;text-align:center;min-height:30px}'
h=f'<!doctype html><html><head><meta charset="utf-8"><style>{css}</style></head><body><div class="w"><h1>Iconos que faltan · ronda 3</h1><p class="s">Tipos de cosmético que salen en las recompensas de los logros y en los avisos de desbloqueo, y la tecla de pausa.</p>'
grp=None;n=0
for g,k,em,t,s in I:
    if g!=grp:
        if grp:h+='</div>'
        h+=f'<h2>{g}</h2><div class="g">';grp=g
    n+=1;sv=f'<svg viewBox="-4 -4 56 56">{s}</svg>'
    h+=f'<div class="c"><span class="n">{n}</span><span class="e">{em}</span>{sv}<div class="sm">{sv}<span class="dk">{sv}</span></div><div class="t">{t}</div></div>'
open('maquetas/iconos_faltan_r3.html','w',encoding='utf8').write(h+'</div></div></body></html>')
print(n)
