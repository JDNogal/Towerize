// Enemigos por facciones (v289): tipos nuevos, iconos SVG, escuadras con líder y cadena de mando, auras de armadura y de resistencia mágica
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1280,height:720}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');}catch(e){}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
const r=await p.evaluate(async()=>{const out={};INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;
 out.types=['minion','demon','dchamp','hound','raptor','seal'].every(k=>ET[k]&&ET[k].fac==='d'&&ET[k].hf>0&&ET[k].ud>0);
 out.names=ET.norm.n==='Orco'&&ET.bat.n==='Diablillo'&&ET.custodian.n==='Tamborilero orco';
 out.svg=Object.keys(ESVG).length>=20&&EIC.norm&&!!EIC.norm.esvg&&icHtml(EIC.norm).includes('<svg');
 out.promo=PROMO.bat[0][1]==='raptor'&&PROMO.minion.some(x=>x[1]==='dchamp');
 out.squads=Object.keys(SQUADS).filter(k=>!SQUADS[k].tut).every(k=>SQF[k]&&Object.keys(SQUADS[k].m).every(t=>ET[t]));
 // líder marcado en cada formación
 out.lead=Object.keys(SQUADS).filter(k=>!SQUADS[k].tut).every(k=>{const f=sqForm(k,SQUADS[k].m);return f.filter(o=>o.lead).length===1;});
 out.leadSeal=sqForm('circulo',SQUADS.circulo.m).find(o=>o.lead).t==='seal';
 // cadena de mando: sale una escuadra, se mata al líder y los demás pierden la formación
 startGame(15);chooseHero('reinhart');if(DLG.on)dlgEnd();S.chests={};S.evts={};RL.open=false;HQ.q=[];
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}if(ok)break;}
 RL.open=false;S.phase='build';
 for(const p of S.portals){p.sq=['muro'];p.sqm=[{norm:3,custodian:1,sling:2}];p.plan={norm:3,custodian:1,sling:2,fast:0,tank:0,mini:0,elite:0,boss:0,colossus:0};}
 startWave();for(const p of S.portals){p.sq=['muro'];p.sqm=[{norm:3,custodian:1,sling:2}];}
 for(let i=0;i<400&&!(S.sqL&&Object.values(S.sqL).length&&S.enemies.length>=6);i++)update(.05);
 const L=Object.values(S.sqL||{})[0];out.leader=!!L&&L.t==='custodian';
 const mates=L?S.enemies.filter(e=>e.sqid===L.sqid&&e!==L):[];out.mates=mates.length;
 if(L){L.hp=0;for(let i=0;i<4;i++)update(.05);}
 out.loose=mates.length>0&&mates.every(e=>e.loose&&e.fsp===0&&e.scat);
 // auras: el Tamborilero da armadura y el Portador resistencia mágica
 const e1={t:'norm',x:5,y:5,hp:10,max:10,fx:{}},c1={t:'seal',x:5,y:5.5,hp:10,max:10,fx:{}};
 out.auraM=ET.seal.aura.m===1&&!ET.custodian.aura.m;
 const svgOk=await new Promise(res=>{const im=svgIm(ESVG.norm);if(im.complete&&im.naturalWidth)return res(true);im.onload=()=>res(true);im.onerror=()=>res(false);setTimeout(()=>res(im.naturalWidth>0),1500);});out.svgLoad=svgOk;
 return out;});
const f=[];const ck=(c,m)=>{if(!c)f.push(m);};
ck(r.types,'faltan tipos nuevos o sus datos');ck(r.names,'nombres nuevos no aplicados');ck(r.svg,'iconos SVG no registrados');ck(r.promo,'evoluciones mal');ck(r.squads,'escuadra con tipo inexistente');
ck(r.lead,'escuadra sin un único líder');ck(r.leadSeal,'el Círculo no lo guía el Portador');ck(r.leader,'el líder del Muro no es el Tamborilero');ck(r.mates>0,'no salió la escuadra');ck(r.loose,'al caer el líder no se desperdigan');ck(r.auraM,'auras mal');ck(r.svgLoad,'el SVG no carga como imagen');
console.log(f.length?'FALLOS '+JSON.stringify(f)+' '+JSON.stringify(r):'enemigos ok');console.log(errs.length?'ERRS '+JSON.stringify(errs):'ERRS []');await b.close();})();
