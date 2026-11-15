// ==================== v352 · DESCRIPCIONES SIN «CASILLAS» (Mesa, aprobado por Nogal 15-nov) ====================
// Las distancias de las descripciones van solo con el icono de rango y el número (span .kw.rgv con data-kw="rng"),
// y el bocadillo de «Rango» explica una sola vez qué mide: 1 de rango = 1 casilla del mapa, no una pieza.
const RGNOTE='<small class="rgnote">1 de rango = 1 casilla del mapa (el cuadrado más pequeño del tablero, no una pieza). Un rango de 1,5 llega a casilla y media.</small>';
{const _k=kwHtml;kwHtml=function(id){let h=_k.apply(this,arguments);try{if((id==='rng'||id==='hrng'||id==='erg')&&h&&!h.includes('rgnote'))h+=RGNOTE;}catch(e){}return h;};}
{let css='.kw.rgv{white-space:nowrap}.kw.rgv::before{content:"";display:inline-block;width:1.05em;height:1.05em;margin-right:.15em;vertical-align:-.17em;background:center/contain no-repeat}';
 try{css+=`.kw.rgv::before{background-image:url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 56 56">'+ICKW.rng+'</svg>')}")}`;}catch(e){}
 const st=document.createElement('style');st.id='rgvcss';st.textContent=css;document.head.appendChild(st);}
