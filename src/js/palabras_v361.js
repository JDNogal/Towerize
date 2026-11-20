// ==================== v361 · PALABRAS CLAVE PROPIAS DE LAS BARRAS (Nogal, 20-nov) ====================
// Cada barra abre el bocadillo de SU palabra (M.kw); antes Calor abría Quemadura, Carga del juicio Electrizado, la Red Rebote y Almas Espectro.
// Las palabras clave van en minúscula dentro de las frases (solo mayúscula al principio): «carga del juicio», «disparo de riel».
{const _k=kwHtml0;kwHtml0=function(id,src){const t=(typeof fuTw==='function')?fuTw(src):null;
 if(id==='calor')return '<b>Calor</b><small>Sube mientras dispara (lleno en 8 s): el cono se abre hasta 110° y aplica hasta un 50% más de stacks de quemadura. Sin objetivo, se enfría.</small>';
 if(id==='juicio')return '<b>Carga del juicio</b><small>Sube 1 por segundo y '+f(HCHK)+' por cada baja de otra torre cercana (las suyas no cuentan). Llena ('+HCH+'), lanza un rayo al enemigo con más vida que hace '+HJM+'× su daño. Se vacía al acabar la oleada.</small>';
 if(id==='riel')return '<b>Disparo de riel</b><small>Recorre todo su alcance en línea recta, en el ángulo que más enemigos atraviesa. '+(t&&abRank(t,'perfor')?'Con Perforación total no pierde daño al atravesarlos.':'Pierde un '+Math.round((1-RAILF)*100)+'% de daño por cada enemigo que atraviesa.')+'</small>';
 if(id==='conex')return '<b>Conexión</b><small>Cada Red eléctrica unida a esta con un arco le da +15% de daño (como mucho 4 conexiones: +60%).</small>';
 if(id==='almas'){const r=t&&abRank(t,'knight'),n=(r&&r.n)||10;return '<b>Almas</b><small>Cada espectro que alzan sus orbes suma un alma. Con '+n+', aparece un Caballero Espectral.</small>';}
 return _k.apply(this,arguments);};}
{const set=(k,o)=>{const M=TMECH.find(m=>m.k===k);if(M)Object.assign(M,o);};
 set('volc',{kw:'calor'});set('herald',{n:'Carga del juicio',kw:'juicio'});set('net',{n:'Conexión',kw:'conex'});set('almas',{kw:'almas'});}
// descripciones cortas: la mecánica en su palabra clave (Nogal, 20-nov)
{const sd=(k,s,d)=>{if(SPECS[k]&&SPECS[k][s])SPECS[k][s].d=d;},K=id=>`<span class="kw" data-kw="${id}" data-src="">`;
 sd('augur','herald','No dispara: acumula '+K('juicio')+'carga del juicio</span> y, llena, lanza un rayo al enemigo con más vida.');
 sd('cannon','rail','Carga lenta y mucho alcance. Su '+K('riel')+'disparo de riel</span> atraviesa todo lo que encuentra en línea recta.');
 sd('laser','red','Se une mediante una '+K('conex')+'conexión</span> a las demás '+icOf(SPECS.laser.red)+' Redes eléctricas de su alcance. Los enemigos que cruzan un arco sufren.');
 sd('sala','volc','Acumula '+K('calor')+'calor</span> mientras dispara: el cono se abre y aplica más stacks. Sin objetivo, se enfría.');}
