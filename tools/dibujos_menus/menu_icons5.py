import json,math,re
SP='tools/dibujos_menus'
src=open(SP+'/menu_icons4.py',encoding='utf8').read()
src=src[:src.index("I=[]\ndef A(n,em,txt,svg)")]
exec(src)
# espadas cruzadas como las cruzó Nogal (puntas y pomos medidos en su imagen)
def swords_n(cx=24,cy=24,sz=46):
    S=sz/330;ox,oy=225,215
    def one(tip,pom):
        tx,ty=(tip[0]-ox)*S+cx,(tip[1]-oy)*S+cy;px,py=(pom[0]-ox)*S+cx,(pom[1]-oy)*S+cy
        L_=math.hypot(px-tx,py-ty);ang=math.degrees(math.atan2(py-ty,px-tx))-90;sc=L_/39.9
        return f'<g transform="translate({tx:.2f} {ty:.2f}) rotate({ang:.2f}) scale({sc:.3f}) translate(-24 0)">{sword_local()}</g>'
    return one((338,72),(77,358))+one((112,72),(373,358))
I=[]
def A(n,em,txt,svg):I.append((n,em,txt,svg))
A('5/20','⚔️','Espadas, cruzadas como las tuyas',swords_n())
A('43','🌀','Portales en combate: espadas abajo a la derecha',portal()+swords_n(37,36,22))
css='body{margin:0;background:#14161c;font-family:system-ui,sans-serif}.w{width:620px;padding:16px}h2{color:#f4ead8;margin:14px 0 8px;font-size:20px}.g{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.c{background:#f4ead8;border:2px solid #e0262e;border-radius:6px;padding:6px;text-align:center}.c svg{width:120px;height:120px;display:block;margin:0 auto}.n{font:800 12px system-ui;color:#fff;background:#e0262e;border-radius:9px;padding:0 6px;display:inline-block}.e{font-size:16px;margin-left:4px}.t{font-size:12.5px;color:#2a2018;line-height:1.2;margin-top:4px;min-height:30px}.sm{display:flex;gap:6px;justify-content:center;align-items:center}.sm svg{width:24px!important;height:24px!important;margin:0!important}'
h=f'<!doctype html><html><head><meta charset="utf-8"><style>{css}</style></head><body><div class="w"><h2>Espadas · tu cruce</h2><div class="g"><div class="c"><div><span class="n">Tuya</span></div><img src="/mnt/user-data/attachments/0814a39a-8a2d-5455-9a58-d9d5b326e92f/25c9aa35-image.png" style="width:120px;height:110px;object-fit:contain"><div class="t">La que me has mandado</div></div>'
for n,em,t,s in I:h+=f'<div class="c"><div><span class="n">{n}</span><span class="e">{em}</span></div><svg viewBox="-4 -4 56 56">{s}</svg><div class="sm"><svg viewBox="-4 -4 56 56">{s}</svg></div><div class="t">{t}</div></div>'
open('maquetas/iconos_menus_r5.html','w',encoding='utf8').write(h+'</div></div></body></html>')
json.dump([(a,b,c,f'<svg viewBox="-4 -4 56 56">{d}</svg>') for a,b,c,d in I],open('maquetas/iconos_menus_r5.json','w'),ensure_ascii=False)
