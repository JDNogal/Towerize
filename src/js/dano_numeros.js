// ==================== NÚMEROS DE DAÑO: estilos (salto lateral, al costado, encima) y filtros ====================
// Los golpes seguidos a un mismo enemigo se suman un instante; después:
//  · salto lateral: el número salta en arco desde el enemigo hacia fuera del camino y se desvanece allí (los críticos saltan más alto y más grandes)
//  · al costado: el contador sigue al enemigo por fuera del camino
//  · encima: como antes, sobre el enemigo
// Filtros: qué enemigos (todos / importantes / solo jefes), qué golpes (todos / críticos y grandes), opacidad y tamaño.
const DNIMP=new Set(['mini','elite','greyw','bigw','wanted','momdrg','boss','colossus','bob','tank','armored','custodian','shaman','warlock','griffin','champ']);
const DNBOSS=new Set(['boss','colossus','bob','momdrg']);
const dnStyle=()=>OPT.dnst||'jump',dnSz=()=>({s:.8,n:1,l:1.25}[OPT.dnsz||'n']||1),dnOp=()=>+(OPT.dnop||1);
function dnShowE(e){const w=OPT.dnwho||'all';if(!e.t)return w==='all';if(w==='all')return true;if(w==='boss')return DNBOSS.has(e.t);return DNIMP.has(e.t)||!!e.wanted;}
// lado hacia el que salta/se coloca: perpendicular a la marcha, hacia el borde del camino más cercano a su carril
function dnSide(d){const e=d.e;let fd=e.fd||[0,1];const px=fd[1],py=-fd[0];let s=e.fln!=null&&e.fln!==0?Math.sign(e.fln):((d.k=(d.k||0)+1)%2?1:-1);if(d.side!=null)s=d.side;d.side=s;
 const cx=Math.floor(e.x/K)*K+1,cy=Math.floor(e.y/K)*K+1,base=(e.x-cx)*px+(e.y-cy)*py;const off=(K/2+.9)-base*s;return{px:px*s,py:py*s,off};}
// el acumulador de siempre (dnAdd) decide cuándo «lanzar» un salto: tras 0,3 s sin golpes, o 0,5 s acumulando; un crítico se lanza al momento
{const _a=dnAdd;dnAdd=function(e,v,key){if(!OPT.dnum||!S.dn)return;if(!dnShowE(e))return;return _a.apply(this,arguments);};}
{const _t=dnTick;dnTick=function(dt){if(dnStyle()!=='jump')return _t.apply(this,arguments);if(!S.dn)return;S.dj=S.dj||[];
 for(const d of S.dn){d.age+=dt;d.idle+=dt;if(d.e.hp>0&&(d.u||S.enemies.includes(d.e))){d.x=d.e.x;d.y=d.e.y;}
  const cr=d.crit>0;if(d.v>0&&(cr||d.idle>.3||d.age>.5)){const big=cr||(d.e.max&&d.v>=d.e.max*.08);if(OPT.dnhit!=='big'||big){const sd=d.u?{px:0,py:-1,off:.9}:dnSide(d);const jt=(Math.random()-.5)*K*.5,fx=d.e.fd?d.e.fd[0]:0,fy=d.e.fd?d.e.fd[1]:0;S.dj.push({x0:d.x,y0:d.y,dx:sd.px*(sd.off+(cr?.5:0))+fx*jt,dy:sd.py*(sd.off+(cr?.5:0))+fy*jt,v:d.v,key:d.key,cr,t:0,h:cr?1.6:1});}
   d.v=0;d.age=0;d.crit=0;d.done=1;}}
 S.dn=S.dn.filter(d=>!d.done&&d.idle<1.1);for(const d of S.dn)if(d.e.dnm&&d.e.dnm[d.key]!==d)delete d.e.dnm[d.key];
 for(const e of S.enemies)if(e.dnm)for(const k in e.dnm)if(e.dnm[k].done)delete e.dnm[k];
 for(const j of S.dj)j.t+=dt;S.dj=S.dj.filter(j=>j.t<1.1);};}
function dnDraw(lw){if(!OPT.dnum)return;const st=dnStyle(),sz0=dnSz(),op=dnOp(),X=v=>v*CS+CS/2;g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';
 const put=(txt,x,y,sz,col,a)=>{g.globalAlpha=a*op;g.font='bold '+Math.round(sz)+'px "Trebuchet MS",sans-serif';g.lineWidth=lw(3);g.strokeStyle='rgba(10,12,16,.9)';g.strokeText(txt,x,y);g.fillStyle=col;g.fillText(txt,x,y);};
 if(st==='jump'){for(const j of S.dj||[]){const T=.32,k=Math.min(1,j.t/T),ease=1-(1-k)*(1-k),x=j.x0+j.dx*ease,y=j.y0+j.dy*ease,arc=Math.sin(k*Math.PI)*K*.55*j.h;
   const a=j.t<.65?1:Math.max(0,1-(j.t-.65)/.45),pop=k<1?.75+.25*k:1;put(fmtD(j.v)+(j.cr?'!':''),X(x),X(y)-arc*CS,lw((j.cr?19:13)*sz0*pop),DNC[j.key]||'#fff',a);}}
 else if(S.dn){for(const d of S.dn){if(d.sh<.5)continue;if(OPT.dnhit==='big'&&!(d.crit>0)&&!(d.e.max&&d.v>=d.e.max*.08))continue;const a=d.idle<.6?1:Math.max(0,1-(d.idle-.6)/.5),cr=d.crit>0,sz=lw((cr?19:14)*sz0),txt=fmtD(d.sh)+(cr?'!':'');
   if(st==='side'&&!d.u){const sd=dnSide(d);const px=X(d.x+sd.px*sd.off),py=X(d.y+sd.py*sd.off)-d.i*lw(14*sz0);put(txt,px,py,sz,DNC[d.key]||'#fff',a);}
   else{const rise=lw(Math.min(14,d.age*10));put(txt,X(d.x),X(d.y)-d.r*CS-lw(18)-d.i*lw(15)-rise,sz,DNC[d.key]||'#fff',a);}}}
 g.globalAlpha=1;}
