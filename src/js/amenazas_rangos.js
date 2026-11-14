// ==================== v329 · Rangos nuevos de amenazas (Nogal, 14-nov) ====================
// Supercampeones R3 ★ (3 rasgos desde la ronda 12), Sabotaje R2, Asedio R3, Saqueadores R2: en su sitio (amenazas.js / amenazas2.js).
// Abanderados R2: la escuadra del abanderado corre un 15 % más mientras él vive.
{const _mv=move;move=function(e,dt){try{if(e&&azRank('aba')>=2&&typeof azFlagOn==='function'&&azFlagOn(e)){const h=e.fx.haste;if(!h||h.m<1.15)e.fx.haste={m:1.15,t:.3};}}catch(x){}return _mv.apply(this,arguments);};}
// Inflación R2: las mejoras de una torre cuestan un 15 % más por cada otra torre igual que tengas
{const _tc=tCost;tCost=function(t,c){const v=_tc.apply(this,arguments);try{if(v>0&&t&&!t.hero&&azRank('inf')>=2&&S&&S.list){const n=S.list.filter(o=>o!==t&&o.type===t.type&&!o.hero&&!o.summ).length;if(n)return Math.round(v*(1+.15*n));}}catch(e){}return v;};}
