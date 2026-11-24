// ---- v365 · tamaño de cada enemigo en carriles ----
// El camino tiene 5 carriles y cada enemigo ocupa lo que diga su ficha del Taller de enemigos: TAM = diámetro de la ficha en carriles, tal como se ve.
// El radio de juego sale de ahí (tamaño ÷ 2 ÷ EVS, porque los enemigos se dibujan EVS veces más grandes que su radio real). Los que no están aquí conservan el tamaño que tenían.
const TAM={norm:1.2,vet:1.3,champ:1.4,javelin:1,sling:.9,shaman:1.3,minion:1.1};
const tamOf=k=>ET[k]?+(ET[k].r*2*EVS).toFixed(2):0;
for(const k in TAM)if(ET[k])ET[k].r=TAM[k]/2/EVS;
