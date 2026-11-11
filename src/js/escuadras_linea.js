// ==================== v307 · Escuadras con línea evolutiva (sin azar) ====================
// Antes cada enemigo básico tiraba un dado para ascender: en la ronda 10 media escuadra ya era de la segunda fase y más tarde salían
// escuadras con 3-4 campeones. Además, la misma ronda podía ser mucho más dura en una partida que en otra.
// Ahora cada escuadra tiene tres versiones fijas y la oleada saca un número exacto de cada una:
//  · normal: como está escrita.
//  · veterana: un tercio de sus básicos (al menos uno) sube a la segunda fase.
//  · de élite: lo de la veterana y, además, uno de ellos sube a la tercera fase (como mucho un campeón por escuadra).
//    Si la escuadra no tiene tercera fase (o aún no toca), sale como la veterana.
// Los básicos nunca desaparecen. En los tanques, como mucho uno acorazado por escuadra.
const SQTIER=r=>r<6?[0,0]:r<=8?[.25,0]:r<=12?[.4,.1]:[.45,.2];   // [fracción veterana, fracción de élite]
const SQTN=['','veterana','de élite'];
// la línea de cada básico: [segunda fase, ronda desde la que sale], [tercera fase, ronda]
function lineOf(t){const P=PROMO[t];if(!P)return null;const L=[];for(const[r0,u]of P)if(!L.some(x=>x[0]===u))L.push([u,r0]);return L;}
function sqTierM(sq,tier,r){const m=Object.assign({},sqM(sq));if(!tier||S.tut)return m;
 const bases=Object.keys(m).filter(t=>{const L=lineOf(t);return L&&L[0]&&r>=L[0][1];});if(!bases.length)return m;
 const tot=bases.reduce((a,t)=>a+m[t],0);let up=Math.max(1,Math.round(tot/3));const out=Object.assign({},m);
 // reparte los ascensos entre los grupos, de mayor a menor (los tanques, como mucho uno)
 const order=bases.slice().sort((a,b)=>m[b]-m[a]);let guard=0;
 while(up>0&&guard++<20){let did=false;for(const t of order){if(up<=0)break;const L=lineOf(t),mid=L[0][0],isTank=!L[1];const have=out[mid]||0;
  if(out[t]<=1)continue;if(isTank&&have>=1)continue;if(have>=Math.ceil(m[t]/2))continue;out[t]--;out[mid]=have+1;up--;did=true;}if(!did)break;}
 if(tier>=2){// un solo ascenso a la tercera fase, del grupo más grande que la tenga
  const t=order.find(t=>{const L=lineOf(t);return L[1]&&r>=L[1][1]&&((out[L[0][0]]||0)>0||out[t]>1);});
  if(t){const L=lineOf(t),mid=L[0][0],top=L[1][0];if((out[mid]||0)>0){out[mid]--;if(!out[mid])delete out[mid];}else out[t]--;out[top]=(out[top]||0)+1;}
}
 for(const t in out)if(!out[t])delete out[t];return out;}
// qué versión toca a la escuadra i de n: repartido a intervalos fijos, sin azar
// (orden «dorado»: reparte las versiones sin que coincidan con el reparto entre portales, que va de uno en uno)
function sqTierOf(i,n,r){const[pv,pe]=SQTIER(r),nE=Math.round(n*pe),nV=Math.round(n*pv);
 const rank=Array.from({length:n},(_,j)=>j).sort((a,b)=>((a*.6180339887)%1)-((b*.6180339887)%1)).indexOf(i);
 return rank<nE?2:rank<nE+nV?1:0;}
// valor de una escuadra para el presupuesto: la media de sus versiones en esta ronda
{const val=m=>Object.entries(m).reduce((a,[t,n])=>a+n*(ET[t].hf||ET[t].hp),0);
 sqValT=k=>{if(!S||S.tut)return Object.entries(sqM(k)).reduce((a,[t,n])=>a+n*ET[t].hp,0);const r=S.round,[pv,pe]=SQTIER(r);return (1-pv-pe)*val(sqTierM(k,0,r))+pv*val(sqTierM(k,1,r))+pe*val(sqTierM(k,2,r));};}
