# Genera src/iconos/menus_final.json: los iconos de menús e interfaz aprobados el 13-nov-2026 (rondas 1-5 de maquetas/iconos_menus_*).
# Las funciones de dibujo viven en los scripts de las maquetas; aquí solo se elige qué dibujo va en cada sitio.
import json,sys,os
SP=os.path.join(os.path.dirname(os.path.abspath(__file__)),'dibujos_menus')
src=open(os.path.join(SP,'menu_icons5.py'),encoding='utf8').read()
src=src[:src.index("I=[]\ndef A(n,em,txt,svg)")]
os.chdir(os.path.dirname(os.path.abspath(__file__))+'/..');SP='tools/dibujos_menus'
exec(src)
W=lambda s:f'<svg viewBox="-4 -4 56 56">{s}</svg>'
M={
 # en partida
 'ptips':portal_bubble(L('M30 11h8',K,2)),'lock':lock3(),'lupa':P('M6 6h24v32H6z',PA)+L('M10 13h16M10 19h16M10 25h10','#a08060',1.6)+magn2(31,30,8),
 'faro':lantern2(),'swords':swords_n(),'zin':zoom('+'),'zout':zoom('-'),'zall':telescope(),'zcore':core_frame(),
 # logros
 'lg_tu':cap(),'lg_jg':dice4(),'lg_hr':heroes4(),'lg_st':flask(),'lg_ev':scroll(),'lg_mp':mapn(),'lg_vet':medal(),'pin':pin2(),
 # estadísticas
 'st_run':chart2(),'st_dmg':swords_n(),'st_rel':gem2(),'st_hero':heroes4(),'st_en':orc(),
 # partidas
 'save':floppy(),'down':download3(),'bigmap':mapn()+magn2(33,31,9),'castle':castle2(),
 # opciones: pestañas
 'op_jg':gear(),'op_kb':keyboard(),'op_ps':palette2(),'op_hs':bubble(),'op_vol':speaker(2),'op_gf':monitor(),'op_ac':access(),'op_un':lock3(True),'op_sv':floppy(),
 # opciones: cada opción
 'o_kcap':keycap('Q'),'o_pm':pin2(),'o_fs':corners(),'o_dnum':dmg_opts()[1],'o_hints':bulbF(),'o_ptip':portal_bubble(L('M28 11h4m2 0h4',K,2)),'o_ptipw':portal_sw(),
 'o_treal':clock(),'o_tcomb':clock()+swords_n(37,36,22),'o_slow':tortoise2(),'o_keys':keyboard(),'o_reset':trash(),'o_dspd':quill(),'o_dtype':typewriter(),'o_dauto':chevrons(),
 'o_dwait':hg2(),'o_dglitch':glitch2(),'o_dbig':bigtext(),'o_cname':namecard(),
 'o_u_tw':unlocked3(tower()),'o_u_hr':unlocked3(heroes4()),'o_u_rl':unlocked3(gem2()),'o_u_ev':unlocked3(scroll()),'o_u_cs':unlocked3(palette2()),'o_u_rd':unlocked3(calendar()),'o_u_cp':unlocked3(book()),
 'o_u_cpa':book(open_=True),'o_u_sec':eye_trophy(),'o_vm':speaker(2),'o_vu':note(),'o_vf':sparkle('#ffd84a'),'o_fps':gauge(),'o_fx':burst(),'o_dpsx':calc(),'o_dabbr':numbadge('1,2k'),'o_dsci':sci2(),'o_delay':hg2('#6ab8ec'),
 # atajos
 'k_hab':sparkle(),'k_ult':ult3(),'k_flag':flag(),'k_wave':swords_n(),'k_peek':eye(),
 # ayuda
 'h_play':gamepad(),'h_keys':keyboard(),'h_tips':bulbF(),'h_tut':cap(),'h_hints':bulb_wire(True),
}
json.dump({'_nota':'Iconos de menús e interfaz aprobados (13-nov-2026). Se generan con tools/iconos_menus.py.',**{k:W(v) for k,v in M.items()}},open('src/iconos/menus_final.json','w'),ensure_ascii=False,indent=0)
print(len(M))
