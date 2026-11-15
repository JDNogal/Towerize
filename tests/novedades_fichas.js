// Novedades del compendio por ficha: puntito en cada ficha nueva, la pestaña y la cinta se apagan al verlas todas; «Marcar todos como vistos» solo en su pestaña
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-tutdone','1');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(async()=>{const W=ms=>new Promise(r=>setTimeout(r,ms));const out={};const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;ACHS.curious=1;SEEOK=true;for(const [t,k] of [['tw','augur'],['tw','sala'],['en','runner'],['tw','orb'],['rl','coin']])if(SEEN[t])delete SEEN[t][k];NOVO={};
 window.__ns=[];const _ns=nfSeen;nfSeen=function(t,k){window.__ns.push(t+':'+k+':'+CP.sel.tw);return _ns.apply(this,arguments);};see('tw','augur');out.af=JSON.stringify(NOVO);see('tw','sala');see('en','runner');
 out.area=nfArea('cp');CP.tab='tw';CP.sel.tw='arrow';lbOpen('cp');out.s2=JSON.stringify(NOVO)+CP.tab+CP.sel.tw;CP.tab='tw';CP.sel.tw='arrow';CP.pageR=false;lbRender();out.s3=JSON.stringify(NOVO);await W(200);
 out.tabDot=!!document.querySelector('#comp .bkmk.new[data-v="tw"]');out.tileDot=!!document.querySelector('#comp .bti.nov[data-v="augur"]');out.tcls=(document.querySelector('#comp .bti[data-v="augur"]')||{}).className;out.nv0=JSON.stringify(NOVO)+' '+window.__ns.join(',');out.btn=!!document.querySelector('#comp [data-a="nfall"]');
 cpGo('tw','augur');await W(200);out.frostGone=!(NOVO.tw&&NOVO.tw.augur);out.dbg=JSON.stringify(NOVO);out.tabStill=nfHas('tw');
 cpGo('tw','sala');await W(200);out.tabOff=!nfHas('tw');out.areaStill=nfArea('cp');
 out.mc=nfHas('mc');delete NOVO.mc;CP.tab='en';CP.sel.en='norm';lbRender();await W(200);document.querySelector('#comp [data-a="nfall"]').click();await W(200);out.enOff=!nfHas('en');out.areaOff=!nfArea('cp');
 see('tw','orb');see('rl','coin');CP.tab='tw';CP.sel.tw='arrow';lbRender();await W(200);document.querySelector('#comp [data-a="nfall"]').click();await W(200);out.onlyTab=!nfHas('tw')&&nfHas('rl');
 return out;});
ck(r.area&&r.tabDot&&r.tileDot&&r.btn,'no se marcan las novedades ('+JSON.stringify(r)+')');ck(r.frostGone&&r.tabStill,'ver una ficha apaga toda la pestaña');ck(r.tabOff&&r.areaStill,'la pestaña no se apaga al verlas todas');
ck(r.enOff&&r.areaOff,'«Marcar todos como vistos» no funciona');ck(r.mc,'las mecánicas nuevas no se marcan');ck(r.onlyTab,'«Marcar todos como vistos» toca otras pestañas');

// v353 · el caso del playtester: sacas un logro, entras en Logros y el puntito sigue (cinta, filtro y ficha) hasta que haces clic en él
const q=await b.newPage({viewport:{width:1280,height:720}});q.on('pageerror',e=>errs.push(e.message));
await q.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-tutdone','1');}catch(e){}});
await q.goto('file://'+process.argv[2]);await q.waitForTimeout(800);
const L=await q.evaluate(async()=>{const W=ms=>new Promise(r=>setTimeout(r,ms));const o={};const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;
 const id=Object.keys(ACH).find(k=>!ACHS[k]&&!ACH[k].sec&&achVis(k));o.id=id;achieve(id);lbOpen(null,true);await W(300);o.cover=!!document.querySelector('#comp .new[data-v="lg"]');
 lbOpen('lg');CP.tab='lg';CP.af='all';CP.sel.lg=Object.keys(ACH).find(k=>k!==id&&achVis(k));lbRender();await W(400);
 o.rib=!!document.querySelector('#comp .bkrib.new[data-v="lg"]');o.tile=!!document.querySelector('#comp .bti.nov[data-v="'+id+'"]');o.mk=!!document.querySelector('#comp .bkmk.new[data-v="all"]');
 o.still=nfHas('lg');document.querySelector('#comp .bti[data-v="'+id+'"]').click();await W(400);
 o.gone=!nfHas('lg')&&!document.querySelector('#comp .bti.nov[data-v="'+id+'"]');return o;});
await q.screenshot({path:'tests/out/novedades_logro.png'});
ck(L.cover&&L.rib&&L.tile&&L.mk&&L.still,'el logro nuevo pierde el puntito al entrar en Logros ('+JSON.stringify(L)+')');ck(L.gone,'el puntito del logro no se apaga al abrirlo');
console.log(fails.length?'FALLOS '+JSON.stringify(fails)+' '+JSON.stringify(r):'novedades_fichas ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
