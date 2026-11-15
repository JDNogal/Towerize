// ==================== v346 · El área también agranda los radios de las habilidades (Nogal) ====================
// Casilla Expansión (y su ★), la bendición de la casilla y el Yunque: el mismo multiplicador de área que usa la torre (stats().arm).
// Aquí, las habilidades cuyo radio va en su rango (campo r, o a para el área de cada impacto).
const ABRAD={roll:[],aval:[],drill:['d'],rain:['r'],bombard:['r'],mine:['r'],icicle:['r','a'],nova:['r'],erupt:['r'],deton:['r'],shoulder:['r'],decoy:['r'],virus:['r'],ground:['r'],seren:['r'],cadena:['r'],pierce:['r']};
// multiplicador de área de las casillas de la torre (igual que en stats, sin calcular todo lo demás)
function tileArm(t){if(!t||!t.cells||t.hero||!S||!S.buff)return 1;const Kk=rp('anvil')?1.5:1;let ar=1;
 for(const[x,y]of t.cells){const b=BF[S.buff[y]&&S.buff[y][x]];if(!b||!b.ar)continue;const Kc=Kk*(S.bless&&S.bless[Math.floor(x/(N/BN))+','+Math.floor(y/(N/BN))]?2:1);ar*=1+(b.ar-1)*Kc;}return ar;}
function abRad(t,id,r){const F=ABRAD[id];if(!F)return r;const m=tileArm(t);if(m===1)return r;const o={...r};for(const f of F)if(typeof o[f]==='number')o[f]*=m;return o;}
