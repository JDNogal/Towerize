// ==================== v349 · Al especializar (Nv 4), el alcance de la torre también crece, a medida de cada una (Nogal) ====================
// Solo el alcance (el círculo de la torre): hasta dónde dispara, o hasta dónde llega su aura, su nube, su bandera, su dron o sus runas.
// No cambia el área de los efectos (explosiones, conos, charcos…) ni las unidades. Cuánto, especialización por especialización,
// según lo que hace (las rápidas o con mucho daño, poco; las lentas, de un objetivo o que trabajan dentro de su alcance, más):
// las que conectan con otras por su alcance (Red eléctrica) ganan algo más, para que no haya que colocarlas al milímetro;
// las que ya crecían (Trebuchet, Ventisca, Tormenta, Heraldo, Forja, Riel, Bombarderos, Nido, Muro de fuego, Nube, Sónica gigante) no se tocan.
const RNG4={
 arrow:{xbow:.40,rapid:.05}, cata:{ogre:.05}, frost:{hel:.10}, orb:{foco:.15,reap:.10}, poison:{alch:.15,pest:.10},
 tesla:{cad:.10,ele:.15}, sala:{volc:.05}, altar:{altar:.20,senda:.10},
 monk:{fist:.10,drunk:.10}, bastion:{pal:.10,ass:.05},
 bunker:{sup:.05}, laser:{red:.15,volt:.10}, robots:{mecha:.10,kami:.10}, nano:{hack:.10,devour:.10},
 dron:{dron:.20,petro:.15}, flame:{detn:.05}, acid:{corr:.10}, sonic:{spk:.10}, alien:{hive:.10,pred:.10}};
{const R3=LV[3].range;for(const k in RNG4)for(const sp in RNG4[k]){const X=SPECS[k]&&SPECS[k][sp];if(!X)continue;X.lv=X.lv||{...LV[3],pen:0};X.lv.range=Math.max(X.lv.range||R3,R3*(1+RNG4[k][sp]));}}
