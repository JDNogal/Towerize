// ==================== v305 · Teclas rápidas bloqueadas cuando el ratón lo está ====================
// Si una pista, el tutorial o una ventana (foco de portal, aviso de enemigo nuevo, eventos, libro, diálogo…) impide pulsar con el ratón,
// las teclas rápidas de esos controles tampoco hacen nada hasta que se avance.
function ctlBlocked(){try{
 if(typeof hintBlocks==='function'&&hintBlocks())return true;
 if(typeof HQ!=='undefined'&&HQ.cur){const c=HQ.cur,w=c.steps&&c.steps[c.si]&&c.steps[c.si][2];if(!w)return true;}/* pista oculta tras otra ventana: sigue pendiente */
 if((typeof FO!=='undefined'&&FO.open)||(typeof NEC!=='undefined'&&NEC.open)||(typeof LB!=='undefined'&&LB.open)||(typeof DLG!=='undefined'&&DLG.on)||(typeof RL!=='undefined'&&RL.open))return true;
 if(typeof S!=='undefined'&&S&&S.phase==='reward')return true;
}catch(e){}return false;}
// ¿se podría pulsar este botón con el ratón ahora mismo? (que no lo tape nada: pista, ventana, velo del tutorial…)
function hitOk(b){try{if(!document.elementFromPoint)return true;const r=b.getBoundingClientRect();if(!r.width&&!r.height)return true;const x=r.left+r.width/2,y=r.top+r.height/2;
 if(x<0||y<0||x>innerWidth||y>innerHeight)return true;const el=document.elementFromPoint(x,y);if(!el)return true;if(el===b||b.contains(el))return true;
 /* bocadillos y avisos que solo informan no cuentan */if(el.closest&&el.closest('#hpop,#tip,.toast,#toast,.ttb'))return true;return false;}catch(e){return true;}}
