// Enlaces a Logros: desde una torre bloqueada del compendio y desde un héroe bloqueado (elección de héroe); fijar desde ahí; volver atrás
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-tutdone','1');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(async()=>{const out={};const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;
 const W=ms=>new Promise(r=>setTimeout(r,ms));ACHS.curious=1;
 // 1) torre bloqueada en el compendio → Logros
 const tw=Object.keys(TLOCK).find(k=>TW[k]&&!tunl(k)&&(TW[k].era||1)===1);out.tw=tw;
 if(compOk()){cpGo('tw',tw);await W(300);const bt=document.querySelector('#comp .achlk [data-a="cachgo"]');out.twLink=!!bt;if(bt){bt.click();await W(300);}out.twArea=LB.area;out.twSel=CP.sel.lg===TLOCK[tw];
  const back=document.querySelector('#comp [data-a="lbx"]');lbBack();await W(300);out.twBack=LB.area+'/'+CP.tab;}
 lbClose(true);await W(200);
 // 2) héroe bloqueado en la elección de héroe
 const hid=Object.keys(HUNL).find(h=>HEROES[h]&&HEROES[h].lockTxt);out.hid=hid;
 lbOpen('prep');await W(200);RL.hsel=hid;try{LB.hsel=hid;}catch(e){}renderHeroPick();await W(300);
 const hb=[...document.querySelectorAll('[data-a="hgo"]')].find(x=>x.dataset.id===hid);if(hb){hb.click();await W(300);}
 const lk=document.querySelector('#comp .achlk [data-a="cachgo"]')||document.querySelector('.achlk [data-a="cachgo"]');out.hLink=!!lk;
 const pin=document.querySelector('.achlk [data-a="apin"]');out.pinBtn=!!pin;out.found=achFound(HUNL[hid]);
 if(pin){pin.click();await W(200);out.pinned=PINS.includes(HUNL[hid]);}
 if(lk){(document.querySelector('.achlk [data-a="cachgo"]')).click();await W(300);}out.hArea=LB.area;out.hSel=CP.sel.lg===HUNL[hid];
 lbBack();await W(300);out.hBack=LB.area;
 return out;});
ck(r.twLink,'la torre bloqueada no tiene enlace al logro ('+r.tw+')');ck(r.twArea==='lg'&&r.twSel,'el enlace de la torre no salta a Logros ('+r.twArea+')');ck(r.twBack==='cp/tw','al volver no se vuelve a la torre ('+r.twBack+')');
ck(r.hLink,'el héroe bloqueado no tiene enlace al logro ('+r.hid+')');ck(r.hArea==='lg'&&r.hSel,'el enlace del héroe no salta a Logros ('+r.hArea+')');ck(r.hBack==='prep','al volver no se vuelve a la elección de héroe ('+r.hBack+')');
if(r.found)ck(r.pinBtn&&r.pinned,'no se puede fijar el logro desde el héroe');
console.log(JSON.stringify(r));console.log(fails.length?'FALLOS '+JSON.stringify(fails):'logro_enlace ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
