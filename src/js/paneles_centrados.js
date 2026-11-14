// ==================== v334 · Paneles del mazo y del cofre centrados en su hueco ====================
// Con una ventana abierta (oferta de torres, cofre, evento…), cada panel lateral queda a la misma distancia
// del borde de la pantalla que de la ventana. Sin ventana, vuelven a su sitio de siempre. Vale para las dos eras.
setInterval(()=>{try{const sd=$('mzside');if(!sd)return;const L=sd.querySelector('.mzd'),R=sd.querySelector('.mzr');if(!L&&!R)return;
 const rl=$('relic');let w=null;
 if(rl&&rl.classList.contains('open')&&!document.body.classList.contains('mfs'))w=rl.querySelector('.cgrid')&&rl.querySelector('.cfsign')?rl.querySelector('.cgrid'):(rl.querySelector('.hdwin')||rl.querySelector('.ppap')||rl.querySelector('.pscr'));
 const put=(el,side)=>{if(!el)return;if(!w||!el.offsetWidth){el.style[side]='';return;}const b=w.getBoundingClientRect();if(!b.width)return;
  const gap=side==='left'?b.left:innerWidth-b.right,pw=el.getBoundingClientRect().width,z=el.offsetWidth?pw/el.offsetWidth:1;const v=Math.max(10,(gap-pw)/2);el.style.setProperty(side,(v/z).toFixed(1)+'px','important');};
 put(L,'left');put(R,'right');}catch(e){}},200);
// ==================== v334 · Fichas de torre: sin estadísticas que no aplican ====================
// Las torres de apoyo (p. ej. el Altar de runas) no disparan: no se enseñan Daño 0, Enfriamiento «Infinity s», DPS ≈ 0 ni Objetivos vacíos.
{const _si=shopInfo;shopInfo=function(id){let h=_si.apply(this,arguments);try{if(typeof h!=='string')return h;
 h=h.replace(/<div class="row[^"]*"><span>(?:(?!<\/div>)[\s\S])*?<\/span><span>(?:0|0 s|Infinity s|∞ s|NaN s|≈ 0|≈ 0,0)<\/span><\/div>/g,'');
 const T=TW[id];if(T&&T.support)h=h.replace(/<div class="row[^"]*"><span><span class="kw st" data-kw="tgts"[\s\S]*?<\/div>/,'');}catch(e){}return h;};}
