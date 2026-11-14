// ==================== v329 · «Mala suerte con red» (distribución pseudoaleatoria) ====================
// Nogal (14-nov-2026): las habilidades con probabilidad baja (< 50 %) no deben pasar rachas largas sin salir.
// Cada intento fallido sube un poco la probabilidad del siguiente; al salir, vuelve a la base. La media es la misma.
// Es lógica interna: no se cuenta en el compendio ni en Mecánicas. Los efectos del 50 % o más siguen siendo azar puro.
const PRDC={};
// la constante C que da, de media, la probabilidad p (P(n) = n·C tras n−1 fallos)
function prdC(p){const k=Math.round(p*1000);if(PRDC[k]!=null)return PRDC[k];
 const avg=C=>{let ex=0,none=1;for(let n=1;none>1e-9;n++){const q=Math.min(1,n*C);ex+=n*none*q;none*=1-q;if(q>=1)break;}return 1/ex;};
 let lo=0,hi=p;for(let i=0;i<40;i++){const m=(lo+hi)/2;if(avg(m)<p)lo=m;else hi=m;}return PRDC[k]=(lo+hi)/2;}
const PRDW=new WeakMap();
// owner: el objeto al que pertenece la cuenta (el rango de la habilidad, la torre…); key: para separar cuentas del mismo dueño
function prdRoll(owner,p,key){if(!(p>0))return false;if(p>=.5||!owner||typeof owner!=='object')return Math.random()<p;
 let m=PRDW.get(owner);if(!m){m={};PRDW.set(owner,m);}const k=key||'_',n=(m[k]||0)+1,C=prdC(p);
 if(Math.random()<n*C){m[k]=0;return true;}m[k]=n;return false;}
