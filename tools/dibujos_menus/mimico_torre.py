# Icono de la torre del Mímico glotón (aprobado 13-nov-2026): M2 (pila de monedas con la llave) y Nv 4 (N4 D: corona encima de la pila alta y gema verde delante)
import json,sys,os
SP='tools/dibujos_menus'
src=open(SP+'/menu_icons3.py',encoding='utf8').read();src=src[:src.index("I=[]\ndef A(n,em,txt,svg)")]
exec(src)
base=stackC(16,40,5)+stackC(31,40,8)+stackC(24,45,3,14)+gem_(41,40,3,'#3fd0e0')+gem_(5,27,2.8,'#e05a6a')
t1=base+keyp(28,30,-20,.9)
t4=base.replace(stackC(31,40,8),stackC(31,40,7))+keyp(28,30,-20,.9)+crownS(31,11,.8)+gem_(24,48,2.8,'#5fd060')
print(json.dumps({'t1':t1,'t4':t4}))
