// v363 · Genera src/js/data/guia_img.js: capturas reales (webp) para la guía «Juega a tu manera».
// Uso: node build.js && node maquetas/guia_imagenes.js && node build.js   (necesita python3 con Pillow)
const path=require('path'),fs=require('fs'),{execFileSync}=require('child_process');
let pw;try{pw=require('playwright');}catch(e){pw=require('/home/claude/jdnogal/towerize/node_modules/playwright');}
const ROOT=path.join(__dirname,'..'),TMP=path.join(ROOT,'tests','out','guia');fs.mkdirSync(TMP,{recursive:true});
(async()=>{const b=await pw.chromium.launch();const p=await b.newPage({viewport:{width:1280,height:720}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.clear();localStorage.setItem('rt-tutchoice','skip');localStorage.setItem('rt-guia','1');localStorage.setItem('rt-story',JSON.stringify({p:3,name:'Nogal',intro:1,e2n:1,e2a:1,e2v:1}));}catch(e){}});
await p.goto('file://'+path.join(ROOT,'index.html'));await p.waitForTimeout(800);
const R=await p.evaluate(async()=>{const W=ms=>new Promise(r=>setTimeout(r,ms));const i=document.getElementById('intro');if(i)i.style.display='none';INTRO.on=false;STO.intro=1;OPT.hints=false;OPT.eter=false;OPT.nearach=true;OPT.dnum=true;OPT.dps=true;startGame(15);chooseHero('reinhart');for(let i=0;i<5&&DLG.on;i++)dlgEnd();HQ.q=[];
 for(let pi=0;pi<3;pi++){S.pi=pi;const o=S.offers[pi];let ok=0;for(let r=0;r<4&&!ok;r++){for(let by=0;by<BN&&!ok;by++)for(let bx=0;bx<BN&&!ok;bx++)if(check(bx,by,o.p)===0){placePiece(bx,by);ok=1;}if(!ok)rotO(o);}}
 RL.open=false;$('relic').classList.remove('open');S.gold=99999;S.deck=['arrow','orb','bunker'];
 const free=[];for(let gy=0;gy<NC;gy++)for(let gx=0;gx<NC;gx++)if(S.cc[gy][gx]===1)free.push([gx,gy,Math.hypot(gx*K-S.core.x,gy*K-S.core.y)]);free.sort((a,b)=>a[2]-b[2]);
 let j=0;for(const k of ['arrow','arrow','orb','bunker','arrow','orb']){S.tsel=k;for(;j<free.length;j++){const n=S.list.length;build(free[j][0]*K+K/2,free[j][1]*K+K/2);if(S.list.length>n){j++;break;}}}S.tsel=null;S.gold=240;
 S.round=6;startWave();S.speed=1;ui();
 // momento con varios números de daño en pantalla
 let best=0;for(let t=0;t<80;t++){await W(150);const n=(S.dn||[]).length;if(n>best)best=n;if(dpsData().tot>150&&n>=2)break;}
 S.speed=0;
 // números de daño: el centro de los que hay
 const pts=(S.dn||[]).map(d=>scrOf({x:d.x,y:d.y}));let nb=null;if(pts.length){const xs=pts.map(q=>q[0]),ys=pts.map(q=>q[1]);const cx=xs.reduce((a,b)=>a+b,0)/xs.length,cy=ys.reduce((a,b)=>a+b,0)/ys.length;nb={x:cx-70,y:cy-50,w:140,h:90};}
 await W(200);
 let id=null;for(const k in APM){if(k==='curious'||!ACH[k])continue;try{if(nearProg(k)){id=k;break;}}catch(e){}}if(id)nearShow(id);
 let fe=document.getElementById('ffwd');if(!fe){fe=document.createElement('div');fe.id='ffwd';fe.textContent='⏩ ×3 · ningún enemigo a tiro';document.body.appendChild(fe);}
 const rb=$('rtl').getBoundingClientRect();fe.style.top=Math.round(rb.bottom+6)+'px';fe.classList.add('on');fe.style.opacity='1';
 await W(600);
 const box=s=>{const e=document.querySelector(s);if(!e)return null;const q=e.getBoundingClientRect();return q.width?{x:q.left,y:q.top,w:q.width,h:q.height}:null;};
 return {ff:box('#ffwd'),dps:box('#dpsc'),ach:box('#nearach'),num:nb,n:best};});
console.log(JSON.stringify(R));
const full=path.join(TMP,'partida.png');await p.screenshot({path:full});
await b.close();if(errs.length)console.log('ERRS',errs);
fs.writeFileSync(path.join(TMP,'cajas.json'),JSON.stringify(R));
// recortes, recuadros numerados y webp con Pillow
const py=`
import json,base64,io,sys
from PIL import Image,ImageDraw,ImageFont
T=sys.argv[1];R=json.load(open(T+'/cajas.json'));im=Image.open(T+'/partida.png').convert('RGB')
def crop(b,pad,minw=0):
    x,y,w,h=b['x'],b['y'],b['w'],b['h'];cx=x+w/2;w=max(w+2*pad,minw);x=cx-w/2
    return im.crop((int(max(0,x)),int(max(0,y-pad)),int(min(1280,x+w)),int(min(720,y+h+pad))))
out={}
def put(k,img,maxw,q):
    if img.width>maxw:img=img.resize((maxw,round(img.height*maxw/img.width)),Image.LANCZOS)
    bio=io.BytesIO();img.save(bio,'WEBP',quality=q,method=6);out[k]='data:image/webp;base64,'+base64.b64encode(bio.getvalue()).decode()
put('ff',crop(R['ff'],34,330),420,80)
put('dps',crop(R['dps'],10),420,80)
put('ach',crop(R['ach'],14),420,80)
if R.get('num'):
    n=crop(R['num'],0);n=n.resize((n.width*2,n.height*2),Image.LANCZOS);put('num',n,420,80)
d=ImageDraw.Draw(im)
try:f=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',22)
except Exception:f=ImageFont.load_default()
G=(246,200,80)
for n,k,pad in((1,'ff',6),(2,'num',6),(3,'dps',4),(4,'ach',6)):
    b=R.get(k)
    if not b:continue
    x,y,w,h=b['x']-pad,b['y']-pad,b['w']+2*pad,b['h']+2*pad
    for j in range(4):d.rounded_rectangle((x-j,y-j,x+w+j,y+h+j),radius=8,outline=G if j<3 else (60,30,10))
    cx,cy=(x+w+4,y-4) if k!='ach' else (x-6,y-6)
    cx=min(cx,1262);cy=max(cy,18)
    d.ellipse((cx-17,cy-17,cx+17,cy+17),fill=G,outline=(60,30,10),width=3);d.text((cx,cy),str(n),fill=(60,30,10),font=f,anchor='mm')
im.save(T+'/partida_marcas.png');put('full',im,960,72)
js='/* v363 · imágenes de la guía «Juega a tu manera» (capturas reales del juego en webp; las genera maquetas/guia_imagenes.js) */\\nconst GUIAIMG='+json.dumps(out)+';\\n'
open(sys.argv[2],'w').write(js);print({k:len(v)//1024 for k,v in out.items()},'KB')
`;
console.log(execFileSync('python3',['-c',py,TMP,path.join(ROOT,'src','js','data','guia_img.js')]).toString());
})();
