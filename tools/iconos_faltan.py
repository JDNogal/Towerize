# Genera src/iconos/faltan_final.json: los iconos que aún eran emoji, aprobados el 13-nov-2026 (maquetas/iconos_faltan_r1 y r2).
# Los dibujos viven en tools/dibujos_menus/menu_icons6.py; aquí solo se elige cuál va en cada sitio.
import json,os,re
os.chdir(os.path.dirname(os.path.abspath(__file__))+'/..')
src=open('tools/dibujos_menus/menu_icons6.py',encoding='utf8').read()
src=src[:src.index("\nI=[]\ndef A(grp")]
exec(src)
M={
 # interfaz
 'warn':warn(),'k_up':keyarrow(0),'k_left':keyarrow(-90),'k_down':keyarrow(180),'k_right':keyarrow(90),'info':info(),'skip':skip(),'skull':skull(),
 'frame':tframe(),'deck':deck2(),'chest':chest(),'era2':city(),
 # pestañas del compendio (las nuevas; las demás reutilizan dibujos aprobados)
 'c_tw':tower_c(),'c_pc':piece(),'c_bf':tile_buff2(),
 # habilidades de enemigos (Mecánicas)
 'e_tgnd':boot2(),'e_charm':charm(),'e_jam':antenna(),'e_arcsh':bomb_arc(),'e_airatk':plane(),'e_whirl':axe_spin2(),'e_jet':flames2(),'e_quake':quake2(),
 'e_claw':claws(),'e_shield':shield2(),'e_banner':banner2(),'e_tele':tele2(),'e_camo':camo2(),'e_adapt':dna(),'e_burst':egg_burst(),'e_launch':hangar(),
 'e_throne':throne2(),'e_riches':moneybag(),'e_scepter':scepter(),'e_gens':gen_shield(),'e_anchor':platform(),'e_abregen':abyss2(),'e_stomp':foot2(),
 'e_line':factory(),'e_rift':portal2(),'e_wings':bat_wings(),'e_shell':shell_s(),'e_pulse':waves(),'e_core2':core_d(),'e_penta':penta(),
 # unidades
 'u_bastion':bastion2(),'u_monk':monk2(),'u_guild':guild2(),'u_robots':robot_u(),
}
json.dump({'_nota':'Iconos que faltaban (13-nov-2026). Se generan con tools/iconos_faltan.py.',**{k:f'<svg viewBox="-4 -4 56 56">{v}</svg>' for k,v in M.items()}},open('src/iconos/faltan_final.json','w',encoding='utf8'),ensure_ascii=False,indent=0)
print(len(M))
