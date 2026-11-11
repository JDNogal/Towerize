// ==================== CÁMARA: zoom suave y encuadre de lo construido ====================
// El zoom (rueda, botones, centrar) ya no salta: la cámara se acerca a su objetivo en unas décimas de segundo.
// La cámara automática encuadra las piezas colocadas (en la fase de colocar pieza, también los huecos donde puede ir la siguiente).
const CAMA={on:false,tz:1,ax:0,ay:0,wx:0,wy:0,cx:null,cy:null};
// zoom suave hacia un punto de la pantalla (el punto del mundo bajo el cursor se queda quieto)
function zoomSmooth(f,px,py){const base=CAMA.on&&CAMA.cx==null?CAMA.tz:CAM.z,a=sc();CAMA.on=true;CAMA.tz=Math.max(ZMIN,Math.min(ZMAX,base*f));CAMA.ax=px;CAMA.ay=py;CAMA.wx=px/a+CAM.x;CAMA.wy=py/a+CAM.y;CAMA.cx=null;CAMA.cy=null;}
// viaje suave a un zoom y un centro (en casillas del mundo)
function camGo(z,x,y,sp){CAMA.sp=sp||11;CAMA.on=true;CAMA.tz=Math.max(ZMIN,Math.min(ZMAX,z));CAMA.cx=x;CAMA.cy=y;}
function camStop(){CAMA.on=false;}
function camTick(dt){if(!CAMA.on)return;const k=1-Math.exp(-dt*(CAMA.cx!=null?(CAMA.sp||11):11));/* v307: los encuadres automáticos van más suaves que el zoom de la rueda */CAM.z+=(CAMA.tz-CAM.z)*k;
 if(CAMA.cx!=null){const w=VIEW/sc(),h=VH/sc(),tx=CAMA.cx*CS+CS/2-w/2,ty=CAMA.cy*CS+CS/2-h/2;CAM.x+=(tx-CAM.x)*k;CAM.y+=(ty-CAM.y)*k;clampCam();
  if(Math.abs(CAMA.tz-CAM.z)<CAM.z*.002&&Math.abs(tx-CAM.x)<.5&&Math.abs(ty-CAM.y)<.5){CAM.z=CAMA.tz;camCenter(CAMA.cx,CAMA.cy);CAMA.on=false;}}
 else{const b=sc();CAM.x=CAMA.wx-CAMA.ax/b;CAM.y=CAMA.wy-CAMA.ay/b;clampCam();if(Math.abs(CAMA.tz-CAM.z)<CAM.z*.002){CAM.z=CAMA.tz;const c=sc();CAM.x=CAMA.wx-CAMA.ax/c;CAM.y=CAMA.wy-CAMA.ay/c;clampCam();CAMA.on=false;}}}
// encuadre: caja de las piezas colocadas (en casillas de pieza). En la fase de colocar, se amplía una pieza por cada lado
function camFitBox(){if(!S||!S.blocks)return null;let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;for(const k in S.blocks){const[bx,by]=k.split(',').map(Number);x0=Math.min(x0,bx);y0=Math.min(y0,by);x1=Math.max(x1,bx);y1=Math.max(y1,by);}
 if(x0>x1)return null;if(S.phase==='place'){x0=Math.max(0,x0-1);y0=Math.max(0,y0-1);x1=Math.min(BN-1,x1+1);y1=Math.min(BN-1,y1+1);}return{x0,y0,x1,y1};}
const CAMFITMAX=3.2;
function camFit(instant){const b=camFitBox();if(!b)return;const PK=P*K,wc=(b.x1-b.x0+1)*PK+K*2,hc=(b.y1-b.y0+1)*PK+K*2;
 const z=Math.max(ZMIN,Math.min(ZMAX,CAMFITMAX,Math.min(VIEW/(wc*CS*BS),VH/(hc*CS*BS))*.92)),cx=(b.x0+b.x1+1)/2*PK-.5,cy=(b.y0+b.y1+1)/2*PK-.5;
 if(instant){CAMA.on=false;CAM.z=z;camCenter(cx,cy);}else camGo(z,cx,cy,5);}
// el encuadre automático se repite al colocar pieza y al cambiar de fase (colocar ↔ construir); un zoom manual lo respeta hasta el siguiente cambio
let CAMPH=null,CAMNB=0;
function camAuto(){if(!S||PREVIEWING||S.pvE||S.pvH||!S.blocks)return;const nb=Object.keys(S.blocks).length,ph=S.phase==='place'?'place':'other';
 if(nb!==CAMNB||ph!==CAMPH){const first=!CAMNB;CAMNB=nb;CAMPH=ph;if(OPT.camauto!==false)camFit(first);}}
// el botón de centrar encuadra lo construido
{const _g=startGame;startGame=function(){CAMNB=0;CAMPH=null;CAMA.on=false;return _g.apply(this,arguments);};}
