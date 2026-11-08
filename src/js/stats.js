// ---- estadísticas de la partida, menú y pantalla final ----
const NODUM={dmg:0,gold:0,n:0,n2:0};
const EKS=t=>{if(!S.st)return {k:0,l:0,g:0};const o=S.st.ek||(S.st.ek={});return o[t]||(o[t]={k:0,l:0,g:0});};
const RS=id=>{if(!S.st)return {...NODUM};return S.st.rl[id]||(S.st.rl[id]={dmg:0,gold:0,n:0,n2:0});};
// Daño aportado (aproximado) por las reliquias que mejoran el daño de las torres: parte del daño que desaparecería sin la reliquia
function relDmg(t,dl){
 if(t.hero||!t.cells)return;const sh=(id,m)=>{if(m>1)RS(id).dmg+=dl*(1-1/m);};
 if(ra('horn'))sh('horn',2);else if(rp('horn')&&S.wt>=30)sh('horn',1.2);
 if(rp('map'))sh('map',1+mapDmg()/100);
 if(ra('anvil')&&t.cells.some(([x,y])=>S.buff[y][x]))sh('anvil',1.5);
 if(rp('quiver')&&!TW[t.type].unit)sh('quiver',1/.85);
 if(ra('quiver')&&S.dbl.some(b=>Math.hypot(t.x-b.x,t.y-b.y)<=b.r))sh('quiver',2);
 const c=CRIT+(rp('lens')?.1:0)+(ra('lens')?.2:0),cm=2+(ra('lens')?1:0);
 if(c>CRIT)sh('lens',(1+c*(cm-1))/(1+CRIT));
}
const fi=n=>String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,'.'),bj=n=>fi(n)+(Math.round(n)===1?' baja':' bajas'),fT=s=>{s=Math.round(s);return Math.floor(s/60)+':'+String(s%60).padStart(2,'0');};
function showMenu(){
 S.mask=0;closeFocus();RL.open=false;$('relic').classList.remove('open');$('endscr').classList.remove('open');
 lbClose(false,true);closePrim();
 $('menu').classList.remove('setup');document.body.classList.add('inmenu');
 // tablero nuevo de fondo, con el libro cerrado encima del núcleo
 PREVIEWING=true;try{init();S.chests={};S.evts={};CAM.z=ZMIN;camCenter(S.core.x,S.core.y);clampCam();}catch(e){}PREVIEWING=false;
 lbOpen(null,true);
 if(NEWU.length)setTimeout(renderUnlocks,60);
}
