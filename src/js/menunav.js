// ======================= NAVEGACIÓN POR MENÚS CON TECLADO =======================
// WASD / flechas mueven un marco dorado por los botones del menú abierto; Intro / Espacio lo pulsan; Esc vuelve
const MN={el:null,on:false,key:null};
function mnRoot(){const vis=e=>e&&e.getClientRects().length>0&&getComputedStyle(e).display!=='none';
 const H=$('hint');if(H&&H.classList.contains('open')&&H.querySelector('button'))return H;
 const F=$('focus');if(F&&F.classList.contains('open'))return F;
 if(typeof DLG!=='undefined'&&DLG.on)return null;
 if(LB.open)return $('comp');
 if(RL.open)return $('relic');
 const es=$('endscr');if(es&&es.classList.contains('open'))return es;
 if(document.body.classList.contains('inmenu')){const m=$('menu');if(vis(m))return m;}
 return null;}
function mnItems(r){return [...r.querySelectorAll('button,select,[data-a]')].filter(b=>!b.disabled&&b.getClientRects().length&&!b.closest('[hidden]')&&getComputedStyle(b).visibility!=='hidden'&&!(b.tagName!=='BUTTON'&&b.tagName!=='SELECT'&&b.querySelector('button')));}
const mnKey=b=>b?[b.dataset.a||'',b.dataset.v||'',b.dataset.k||'',b.dataset.i||'',b.dataset.id||'',b.id||'',(b.textContent||'').trim().slice(0,24)].join('|'):null;
function mnSet(b){if(MN.el&&MN.el!==b)MN.el.classList.remove('kfoc');MN.el=b;MN.key=mnKey(b);MN.on=true;if(b){b.classList.add('kfoc');try{b.scrollIntoView({block:'nearest',inline:'nearest'});}catch(e){}if(typeof lbFocus==='function')lbFocus(b);}}
function mnClear(){if(MN.el)MN.el.classList.remove('kfoc');MN.el=null;MN.on=false;}
function mnRefind(r){if(MN.el&&MN.el.isConnected&&r.contains(MN.el))return MN.el;const L=mnItems(r);const b=L.find(x=>mnKey(x)===MN.key)||null;if(b){MN.el=b;b.classList.add('kfoc');}return b;}
function mnMove(r,dx,dy){const L=mnItems(r);if(!L.length)return;let cur=mnRefind(r);
 if(!cur){const pick=['.bti.on','.lbmain','.bkrib.on','.hok','button.go:not([disabled])','button.on'].map(s=>r.querySelector(s)).find(x=>x&&L.includes(x))||L.find(x=>!x.classList.contains('oxb')&&!/close|cclose|oclose/.test(x.dataset.a||''))||L[0];mnSet(L.includes(pick)?pick:L[0]);return;}
 const a=cur.getBoundingClientRect(),ax=a.left+a.width/2,ay=a.top+a.height/2;let best=null,bs=1e9;
 for(const b of L){if(b===cur)continue;const q=b.getBoundingClientRect(),bx=q.left+q.width/2,by=q.top+q.height/2,vx=bx-ax,vy=by-ay;
  const pr=vx*dx+vy*dy;if(pr<=4)continue;const ort=Math.abs(vx*dy-vy*dx);if(ort>pr*2.5+30)continue;const s=pr+ort*2.2;if(s<bs){bs=s;best=b;}}
 if(best){mnSet(best);if(best.classList.contains('bti')&&!(typeof bkNarrow==='function'&&bkNarrow())){const k=MN.key;best.click();setTimeout(()=>{const r2=mnRoot();if(r2){MN.key=k;mnRefind(r2);}},0);}}}
addEventListener('keydown',e=>{if(KBC.on)return;if(e.target&&/INPUT|TEXTAREA/.test(e.target.tagName))return;if(e.ctrlKey||e.metaKey||e.altKey)return;
 const r=mnRoot();if(!r){if(MN.on)mnClear();return;}const k=e.key.toLowerCase();
 // selección de héroe: izquierda/derecha cambian de héroe (ya lo hacen las flechas)
 if(RL.open&&RL.hpick&&(kbIs('nl',k)||kbIs('nr',k))){if(k!=='arrowleft'&&k!=='arrowright'){heroNav(kbIs('nl',k)?-1:1);e.preventDefault();}return;}
 if(r.id==='comp'&&!MN.on&&(k==='arrowleft'||k==='arrowright')&&typeof LB!=='undefined'&&LB.open&&!LB.cover&&!(e.target&&/INPUT|SELECT/.test(e.target.tagName))){lbStep(k==='arrowright'?1:-1);e.preventDefault();e.stopImmediatePropagation();return;}
 if(r.id==='comp'&&(k==='q'||k==='e')){const ms=[...r.querySelectorAll('.bkmk')],i=ms.findIndex(m=>m.classList.contains('on'));const n=ms[(i+(k==='e'?1:-1)+ms.length)%ms.length];if(n){mnClear();n.click();}e.preventDefault();e.stopImmediatePropagation();return;}
 const d=kbIs('nu',k)?[0,-1]:kbIs('nd',k)?[0,1]:kbIs('nl',k)?[-1,0]:kbIs('nr',k)?[1,0]:null;
 if(d){if(e.target&&e.target.tagName==='SELECT'&&(k==='arrowup'||k==='arrowdown'))return;e.preventDefault();e.stopImmediatePropagation();mnMove(r,d[0],d[1]);return;}
 if(kbIs('nok',k)){const b=MN.on?mnRefind(r):null;if(b){e.preventDefault();e.stopImmediatePropagation();const kk=MN.key;if(b.tagName==='SELECT'){b.focus();return;}b.click();setTimeout(()=>{const r2=mnRoot();if(r2){MN.key=kk;if(!mnRefind(r2))mnClear();}else mnClear();},0);}return;}
},true);
addEventListener('mousemove',e=>{if(MN.on&&(Math.abs(e.movementX)+Math.abs(e.movementY)>2))mnClear();},{passive:true});
addEventListener('pointerdown',()=>{if(MN.on)mnClear();},{passive:true,capture:true});
// tecla Esc dibujada en los botones de cerrar (solo PC, con «Teclas sobre los botones»)
setInterval(()=>{try{const on=kcOn();for(const b of document.querySelectorAll('.oxb,.bkx')){const s=b.querySelector('.kesc');if(on&&!s)b.insertAdjacentHTML('beforeend','<span class="kcap kesc">Esc</span>');else if(!on&&s)s.remove();}}catch(e){}},250);
// tras repintar un menú, el marco vuelve al mismo botón
setInterval(()=>{if(!MN.on)return;const r=mnRoot();if(!r){mnClear();return;}if(!(MN.el&&MN.el.isConnected))mnRefind(r);},150);

