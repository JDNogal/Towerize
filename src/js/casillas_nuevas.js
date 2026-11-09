// ==================== Casillas especiales nuevas: Precisión, Perforación, Eco, Persistencia, Taller y Cuartel ====================
// valor de una casilla bajo la torre (con el Yunque ×1,5 y la Bendición ×2, como las demás)
function tileV(t,key,def){if(!t||!t.cells||!S||!S.buff)return def;let v=null;const K0=typeof rp==='function'&&rp('anvil')?1.5:1;
 for(const[x,y]of t.cells){const b=BF[S.buff[y]&&S.buff[y][x]];if(!b||b[key]==null)continue;const Kc=K0*(S.bless&&S.bless[Math.floor(x/(N/BN))+','+Math.floor(y/(N/BN))]?2:1);
  const val=key==='tal'?1-(1-b[key])*Kc:key==='eco'?b[key]:key==='per'||key==='uhp'?1+(b[key]-1)*Kc:b[key]*Kc;v=v==null?val:(key==='tal'||key==='eco'?Math.min(v,val):Math.max(v,val));}
 return v==null?def:v;}
// Precisión y Perforación
{const _st=stats;stats=function(t){const s=_st.apply(this,arguments);if(!t||t.hero||t.ovr)return s;const cr=tileV(t,'cr',0),pe=tileV(t,'pen',0);if(cr)s.crit=Math.min(1,s.crit+cr);if(pe&&twm(t.type,t.spec).dt!=='elem')s.pen=(s.pen||0)+pe;return s;};}
// Eco: cuenta disparos y, cada N, devuelve el enfriamiento de ese disparo (sale otro al instante)
function ecoShot(t){const n=tileV(t,'eco',0);if(!n)return false;t.ecoN=(t.ecoN||0)+1;if(t.ecoN>=n){t.ecoN=0;return true;}return false;}
// Taller: coste de mejoras, especialización y habilidades de esa torre
const r5c=v=>Math.max(0,Math.round(v/5)*5);
function tCost(t,c){if(c==null)return c;const m=tileV(t,'tal',1);return m<1?r5c(c*m):c;}
// Cuartel: vida de los soldados
/* se aplica en sdHp (towers.js) */
// Persistencia: lo que deja la torre en el camino dura más (se aplica una vez, al aparecer)
function perTick(){const m=t=>tileV(t,'per',1);
 for(const L of [S.pools,S.cz,S.fwall,S.tarb])if(L)for(const z of L){if(z.perOk||!z.src)continue;z.perOk=1;const f=m(z.src);if(f>1&&z.t!=null)z.t*=f;}
 if(S.proj)for(const p of S.proj){if(p.perOk||!p.src||!p.slow)continue;p.perOk=1;const f=m(p.src);if(f>1)p.slowt=(p.slowt||SLOWT)*f;}}
{const _u=update;update=function(dt){try{if(S&&S.phase==='wave')perTick();}catch(e){}return _u.apply(this,arguments);};}
