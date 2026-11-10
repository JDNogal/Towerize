// Novedades del compendio por ficha: puntito en cada ficha nueva, la pestaña y la cinta se apagan al verlas todas; «Marcar todos como vistos» solo en su pestaña
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const fails=[];const ck=(c,m)=>{if(!c)fails.push(m);};const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-tutdone','1');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(async()=>{const W=ms=>new Promise(r=>setTimeout(r,ms));const out={};const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;ACHS.curious=1;SEEOK=true;for(const [t,k] of [['tw','augur'],['tw','sala'],['en','runner'],['tw','orb'],['rl','coin']])if(SEEN[t])delete SEEN[t][k];NOVO={};
 window.__ns=[];const _ns=novSeen;novSeen=function(t,k){window.__ns.push(t+':'+k+':'+CP.sel.tw);return _ns.apply(this,arguments);};see('tw','augur');out.af=JSON.stringify(NOVO);see('tw','sala');see('en','runner');
 out.area=novArea('cp');CP.tab='tw';CP.sel.tw='arrow';lbOpen('cp');out.s2=JSON.stringify(NOVO)+CP.tab+CP.sel.tw;CP.tab='tw';CP.sel.tw='arrow';CP.pageR=false;lbRender();out.s3=JSON.stringify(NOVO);await W(200);
 out.tabDot=!!document.querySelector('#comp .bkmk.new[data-v="tw"]');out.tileDot=!!document.querySelector('#comp .bti.nov[data-v="augur"]');out.tcls=(document.querySelector('#comp .bti[data-v="augur"]')||{}).className;out.nv0=JSON.stringify(NOVO)+' '+window.__ns.join(',');out.btn=!!document.querySelector('#comp [data-a="novall"]');
 cpGo('tw','augur');await W(200);out.frostGone=!(NOVO.tw&&NOVO.tw.augur);out.dbg=JSON.stringify(NOVO);out.tabStill=novHas('tw');
 cpGo('tw','sala');await W(200);out.tabOff=!novHas('tw');out.areaStill=novArea('cp');
 out.mc=novHas('mc');delete NOVO.mc;CP.tab='en';CP.sel.en='norm';lbRender();await W(200);document.querySelector('#comp [data-a="novall"]').click();await W(200);out.enOff=!novHas('en');out.areaOff=!novArea('cp');
 see('tw','orb');see('rl','coin');CP.tab='tw';CP.sel.tw='arrow';lbRender();await W(200);document.querySelector('#comp [data-a="novall"]').click();await W(200);out.onlyTab=!novHas('tw')&&novHas('rl');
 return out;});
ck(r.area&&r.tabDot&&r.tileDot&&r.btn,'no se marcan las novedades ('+JSON.stringify(r)+')');ck(r.frostGone&&r.tabStill,'ver una ficha apaga toda la pestaña');ck(r.tabOff&&r.areaStill,'la pestaña no se apaga al verlas todas');
ck(r.enOff&&r.areaOff,'«Marcar todos como vistos» no funciona');ck(r.mc,'las mecánicas nuevas no se marcan');ck(r.onlyTab,'«Marcar todos como vistos» toca otras pestañas');
console.log(fails.length?'FALLOS '+JSON.stringify(fails)+' '+JSON.stringify(r):'novedades ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
