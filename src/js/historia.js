// ==================== HISTORIA: intro de la primera partida y presentaciones de héroes ====================
// Primera vez (sin tutorial o con él): se va directo a una partida de 15 rondas en la Fantástica, sin pasos de era ni duración.
// Al entrar el libro en el núcleo sale la intro (ÉTER, Reinhart y Sylvana) y justo después la elección de héroe de siempre.
{const _re=renderEra;renderEra=function(){if(!STO.intro){ERA=1;startGame(15);return;}return _re.apply(this,arguments);};}
{const _oh=openHero;openHero=function(){if(!STO.intro&&!PREVIEWING&&S&&!S.pvE&&!S.pvH){STO.intro=1;saveSto();const a=arguments,self=this;setTimeout(()=>playDialog(STORY.intro,()=>_oh.apply(self,a)),550);return;}return _oh.apply(this,arguments);};}
// al acabar la partida en la que se desbloquean, Radagast e Yrsa se presentan
{const _eg=endGame;endGame=function(){const r=_eg.apply(this,arguments);try{const q=[];if(STO.qrad){q.push(STORY.rad);STO.qrad=0;}if(STO.qyrsa){q.push(STORY.yrsa);STO.qyrsa=0;}if(q.length){saveSto();setTimeout(()=>{for(const L of q)dlgQueue(L);},700);}}catch(e){}return r;};}
// ---- ofertas en la era 2: en las 3 primeras partidas de la era, 2 torres futuristas y 1 de la Fantástica; después, al menos 1 futurista ----
function towPick3(p){if(!S||S.era!==2)return shuf(p).slice(0,3);const fut=shuf(p.filter(k=>TW[k].era===2)),fan=shuf(p.filter(k=>TW[k].era!==2)),nf=Math.min(fut.length,(STO.e2r||0)<=3?2:1);
 const out=fut.slice(0,nf).concat(fan.slice(0,3-nf));for(const k of fut.slice(nf))if(out.length<3)out.push(k);return shuf(out);}
{const _sg=startGame;startGame=function(){const r=_sg.apply(this,arguments);try{if(S&&S.era===2&&!S.tut){STO.e2r=(STO.e2r||0)+1;saveSto();}}catch(e){}return r;};}
