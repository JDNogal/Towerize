// ==================== v345 · Mímico: al pasar el ratón (o con su ficha abierta) se ve su alcance, como el de las torres ====================
{const _d=drawMimic;drawMimic=function(g,CS,lw){const m=S&&S.mim;try{if(m&&((typeof HV!=='undefined'&&HV.key==='mim')||(typeof PR!=='undefined'&&PR.open&&PR.key==='mim')||mimHov()))rangeCircle(m.x,m.y,MIMR*K);}catch(e){}return _d.apply(this,arguments);};}
function mimHov(){const h=S&&S.hover,m=S.mim;return !!(h&&m&&Math.floor(h.x/K)===Math.floor(m.x/K)&&Math.floor(h.y/K)===Math.floor(m.y/K));}
