# Genera src/css/21_dron.css: en la Era Distópica (aspecto «holo») el pergamino se cambia por el dron proyector.
# Solo cambia el aspecto: la colocación de todo lo de dentro es la del pergamino (10_pergamino_enrollado.css).
# Aprobado por Nogal el 13-nov-2026 (maquetas/dron_pantallas.html).
import os,urllib.parse
os.chdir(os.path.dirname(os.path.abspath(__file__))+'/..')
K='#1b1712'
def uri(svg):return "url('data:image/svg+xml;utf8,"+urllib.parse.quote(svg.replace('\n',' '),safe=' =:/;,()-."')+"')"
ANIM='<style>.rt{transform-box:fill-box;transform-origin:center;animation:s .11s linear infinite}@keyframes s{50%{transform:scaleX(.45)}}.bl{animation:b 1.1s steps(1) infinite}@keyframes b{50%{opacity:.2}}</style>'
GR='<defs><linearGradient id="m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8dee6"/><stop offset=".5" stop-color="#8e99a4"/><stop offset="1" stop-color="#5a646e"/></linearGradient><radialGradient id="e" cx=".5" cy=".3" r=".7"><stop offset="0" stop-color="#e8fbff"/><stop offset=".5" stop-color="#3fe8ff"/><stop offset="1" stop-color="#0a6a7a"/></radialGradient></defs>'
DRONE=f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 78">{ANIM}{GR}
<path d="M34 20L62 30M166 20L138 30" stroke="{K}" stroke-width="9" stroke-linecap="round"/><path d="M34 20L62 30M166 20L138 30" stroke="#5a646e" stroke-width="5" stroke-linecap="round"/>
<rect x="26" y="12" width="16" height="12" rx="3" fill="#3a4249" stroke="{K}" stroke-width="2"/><rect x="158" y="12" width="16" height="12" rx="3" fill="#3a4249" stroke="{K}" stroke-width="2"/>
<ellipse class="rt" cx="34" cy="10" rx="32" ry="4.5" fill="#c8d7e1" fill-opacity=".45" stroke="{K}" stroke-width="2"/><ellipse class="rt" cx="166" cy="10" rx="32" ry="4.5" fill="#c8d7e1" fill-opacity=".45" stroke="{K}" stroke-width="2"/>
<path d="M100 18V5" stroke="{K}" stroke-width="3"/><circle class="bl" cx="100" cy="5" r="4" fill="#ff4fd8" stroke="{K}" stroke-width="1.5"/>
<rect x="56" y="18" width="88" height="40" rx="19" fill="url(#m)" stroke="{K}" stroke-width="2.4"/><path d="M70 24h60" stroke="#fff" stroke-opacity=".5" stroke-width="4" stroke-linecap="round"/>
<circle cx="72" cy="38" r="3.4" fill="#3fe88f" stroke="{K}" stroke-width="1.2"/><circle class="bl" cx="81" cy="38" r="3.4" fill="#3fe8ff" stroke="{K}" stroke-width="1.2"/><circle cx="90" cy="38" r="3.4" fill="#ff5a5a" stroke="{K}" stroke-width="1.2"/>
<rect x="106" y="32" width="28" height="12" rx="2" fill="#071214" stroke="{K}" stroke-width="1.5"/><text x="120" y="41" font-family="monospace" font-size="8" text-anchor="middle" fill="#3fe8ff">ÉTER</text>
<path d="M84 56h32v4a16 12 0 0 1-32 0z" fill="url(#e)" stroke="{K}" stroke-width="2"/></svg>'''
MINI=f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 46">{ANIM}{GR}
<path d="M45 14V8" stroke="{K}" stroke-width="3"/><ellipse class="rt" cx="45" cy="7" rx="34" ry="4.5" fill="#c8d7e1" fill-opacity=".45" stroke="{K}" stroke-width="2"/>
<rect x="24" y="13" width="42" height="22" rx="11" fill="url(#m)" stroke="{K}" stroke-width="2.2"/><path d="M33 18h24" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"/>
<circle class="bl" cx="36" cy="25" r="2.6" fill="#3fe8ff" stroke="{K}" stroke-width="1"/><circle cx="44" cy="25" r="2.6" fill="#3fe88f" stroke="{K}" stroke-width="1"/>
<path d="M37 34h16v2a8 6 0 0 1-16 0z" fill="url(#e)" stroke="{K}" stroke-width="1.8"/></svg>'''
CRATE=f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 112">{GR}
<path d="M10 40Q10 6 60 6t50 34q-9-6-17 0-8-6-16 0-9-6-17 0-8-6-17 0-8-6-16 0-8-6-17 0z" fill="#e8e2d0" stroke="{K}" stroke-width="2.4" stroke-linejoin="round"/>
<path d="M27 40Q32 12 60 8M93 40Q88 12 60 8M43 40Q47 10 60 8M77 40Q73 10 60 8" fill="none" stroke="#a8a090" stroke-width="1.6"/>
<path d="M12 40L38 66M43 40L48 66M77 40L72 66M108 40L82 66" stroke="{K}" stroke-width="1.4"/>
<rect x="36" y="64" width="48" height="36" rx="3" fill="#5a6a3a" stroke="{K}" stroke-width="2.4"/><path d="M36 74h48M36 90h48" stroke="#3a4626" stroke-width="2"/>
<path d="M60 72l2.6 5.4 6 .8-4.3 4.2 1 6-5.3-2.8-5.3 2.8 1-6-4.3-4.2 6-.8z" fill="#f0ead8" stroke="{K}" stroke-width="1"/>
<rect x="40" y="64" width="5" height="36" fill="#7a8a52" stroke="{K}" stroke-width="1.2"/><rect x="75" y="64" width="5" height="36" fill="#7a8a52" stroke="{K}" stroke-width="1.2"/>
<path d="M52 100h16v2a8 6 0 0 1-16 0z" fill="url(#e)" stroke="{K}" stroke-width="1.8"/></svg>'''
H=':root[data-skin="holo"]'
HOLO='background:linear-gradient(180deg,rgba(18,64,80,.92),rgba(9,30,40,.96)),repeating-linear-gradient(0deg,rgba(63,232,255,.07) 0 1px,transparent 1px 3px)!important;background-blend-mode:screen;border:1px solid rgba(63,232,255,.8)!important;border-radius:4px!important;box-shadow:0 0 0 1px rgba(63,232,255,.2),0 0 30px rgba(63,232,255,.35),inset 0 0 40px rgba(63,232,255,.1)!important'
css=f'''/* ===== v312 · Era Distópica: el dron proyector sustituye al pergamino (tools/gen_dron_css.py) =====
   Mismo sitio y misma colocación que el pergamino; solo cambia el aspecto. El dron llega volando, la ventana se proyecta
   de arriba abajo, tiembla de vez en cuando como un holograma y al cambiar de escena hace una interferencia. */
@keyframes hdin{{from{{transform:translateY(-170px)}}to{{transform:none}}}}
@keyframes hdhov{{50%{{margin-top:4px}}}}
@keyframes hdopen{{0%{{clip-path:inset(0 46% 100% 46%);filter:brightness(2.6);opacity:.4}}35%{{clip-path:inset(0 0 92% 0);opacity:1}}70%{{clip-path:inset(0 0 0 0);filter:brightness(1.6)}}78%{{opacity:.7}}84%{{opacity:1;filter:none}}99%{{clip-path:inset(0 0 0 0)}}100%{{clip-path:none}}}}
@keyframes hdjit{{0%,91%,100%{{transform:none;filter:none;opacity:1}}92%{{transform:translateX(-5px) skewX(-3deg);filter:hue-rotate(40deg) brightness(1.4)}}93%{{transform:translateX(4px);opacity:.75}}94%{{transform:none;opacity:1}}96%{{opacity:.85}}97%{{opacity:1}}}}
@keyframes hdglitch{{0%{{clip-path:inset(0)}}10%{{clip-path:inset(20% 0 60% 0);transform:translateX(-8px)}}20%{{clip-path:inset(60% 0 10% 0);transform:translateX(6px)}}30%{{clip-path:inset(0);filter:brightness(2.5) hue-rotate(60deg);transform:none}}45%{{opacity:.2}}55%{{opacity:1;filter:none}}100%{{clip-path:inset(0)}}}}
@keyframes hdflk{{0%,93%,100%{{opacity:1;filter:none}}94%{{opacity:.6;filter:hue-rotate(40deg) brightness(1.4)}}95%{{opacity:1}}97%{{opacity:.8}}}}
@keyframes hdout{{from{{clip-path:inset(0 0 0 0);filter:none;opacity:1}}to{{clip-path:inset(0 46% 100% 46%);filter:brightness(3);opacity:0}}}}
@keyframes hdaway{{to{{transform:translateY(-190px)}}}}
@keyframes hdpara{{from{{transform:translateY(-200px) rotate(-6deg)}}70%{{transform:translateY(6px) rotate(3deg)}}to{{transform:none}}}}
@keyframes hdsway{{50%{{transform:rotate(2deg)}}}}
/* --- el pergamino desaparece: rodillos fuera --- */
{H} #relic .pscr .prod,{H} body.dsk #panel:has(.prow)::after{{display:none!important}}
/* --- ventana proyectada (oferta de torres, eventos y su resultado) --- */
{H} #relic .pscr{{filter:none!important}}
{H} #relic .ppap{{{HOLO};animation:hdopen .6s .32s cubic-bezier(.2,.8,.3,1) both,hdjit 7s 1.4s infinite!important}}
{H} #relic .pscr.hdglitch .ppap{{animation:hdglitch .5s steps(1) both,hdjit 7s 1s infinite!important}}
{H} #relic .pscr::before,{H} body.dsk #panel:has(.prow)::before,{H} #relic .hdwin::before{{content:'';position:absolute;left:50%;top:-60px;width:156px;height:60px;margin-left:-78px;z-index:6;pointer-events:none;
 background:{uri(DRONE)} no-repeat center/contain;border:0!important;border-radius:0!important;box-shadow:none!important;bottom:auto!important;right:auto!important;filter:drop-shadow(0 6px 8px rgba(0,0,0,.55));
 animation:hdin .45s cubic-bezier(.2,.9,.3,1.1) both,hdhov 2.6s .45s ease-in-out infinite}}
{H} #relic .pscr{{position:relative}}
/* el dron va encima de la ventana: se deja su hueco arriba (la ventana sigue centrada, solo baja un poco) */
{H} #relic.open:has(.pscr),{H} #relic.open:has(.hdwin),{H} #relic.hdcl{{padding-top:64px!important}}
/* --- elegir pieza: la misma ventana grande del centro --- */
{H} body.dsk #panel:has(.prow){{{HOLO};border-width:1px!important}}
{H} body.pcpick #panel>*{{animation:hdopen .6s .32s cubic-bezier(.2,.8,.3,1) both}}
{H} body.pcpick #panel .prow .card{{background:rgba(63,232,255,.06)!important;border-color:rgba(63,232,255,.55)!important}}
/* --- cofre abierto (elegir reliquia): se proyecta igual --- */
{H} #relic .hdwin{{position:relative;{HOLO};padding:18px 22px 14px;margin:0 auto;text-align:center;max-width:100%;width:fit-content;box-sizing:border-box;animation:hdopen .6s .32s cubic-bezier(.2,.8,.3,1) both,hdjit 7s 1.4s infinite}}
/* --- misma ventana: si solo se redibuja no se anima; si cambia de escena, interferencia (el dron no vuelve a llegar) --- */
{H} #relic .hdkeep .ppap,{H} #relic .hdwin.hdkeep{{animation:hdjit 7s 1.4s infinite!important}}
{H} #relic .hdwin.hdglitch{{animation:hdglitch .5s steps(1) both,hdjit 7s 1s infinite!important}}
{H} #relic .pscr.hdkeep::before,{H} #relic .pscr.hdglitch::before,{H} #relic .hdwin.hdkeep::before,{H} #relic .hdwin.hdglitch::before{{animation:hdhov 2.6s ease-in-out infinite!important}}
/* con los paneles del mazo y del cofre a los lados, la ventana no se mete debajo de ellos */
{H} body.dsk:not(.mzbtn):not(.mfs) #relic .hdwin{{max-width:calc(100vw - 2 * (var(--mzw,168px) + 34px))}}
{H} body.dsk:not(.mzbtn):not(.mfs) #relic .hdwin .cgrid{{max-width:100%!important;margin-left:auto!important;margin-right:auto!important}}
/* --- se cierra: la imagen se aplasta en una línea y el dron se va --- */
{H} #relic.hdcl{{display:block!important;pointer-events:none!important;background:transparent!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}}
{H} #relic.hdcl:has(.pscr),{H} #relic.hdcl:has(.hdwin){{display:flex!important;flex-direction:column;align-items:center;justify-content:safe center}}
{H} #relic.hdcl .ppap,{H} #relic.hdcl .hdwin{{animation:hdout .32s cubic-bezier(.5,0,.9,.6) both!important}}
{H} #relic.hdcl .pscr::before,{H} #relic.hdcl .hdwin::before{{animation:hdaway .45s .25s ease-in both!important}}
{H} #relic.hdcl .hdwin>*{{visibility:hidden}}
/* --- paneles de los lados: el mazo lo proyecta un dron pequeño; las reliquias, un paquete de ayuda militar en paracaídas --- */
{H} #mzside .mzd,{H} #mzside .mzr{{{HOLO};color:#d4f4ff!important;overflow:visible!important;animation:hdopen .55s .45s both,hdflk 9s 2s infinite}}
{H} #mzpop .mzbox.mzr,{H} #mzside .mzr{{background:linear-gradient(180deg,rgba(74,92,46,.94),rgba(42,54,26,.96)),repeating-linear-gradient(0deg,rgba(200,230,140,.07) 0 1px,transparent 1px 3px)!important;border-color:rgba(176,206,110,.85)!important;box-shadow:0 0 0 1px rgba(176,206,110,.25),0 0 26px rgba(150,190,80,.35),inset 0 0 30px rgba(176,206,110,.12)!important;color:#eef4d8!important}}
{H} #mzpop .mzbox.mzr h4,{H} #mzside .mzr h4{{color:#d8ec9a!important;text-shadow:0 0 8px rgba(176,206,110,.6)!important}}
{H} #mzside .mzr .mzgrid i,{H} #mzside .mzr .mzvac{{background:rgba(176,206,110,.12)!important;border-color:rgba(176,206,110,.5)!important;color:#d8e8b0!important}}
{H} #mzside .mzd h4,{H} #mzside .mzr h4{{color:#3fe8ff;font-family:system-ui,sans-serif;text-shadow:0 0 8px rgba(63,232,255,.6)}}
{H} #mzside .mzd .mzrow{{border-color:rgba(63,232,255,.25)!important}}
{H} #mzside .mzd .mzgrid i{{background:rgba(63,232,255,.08)!important}}
{H} #mzside>div{{overflow-y:visible!important}}
{H} #mzside .mzd::before,{H} #mzside .mzr::before{{content:'';position:absolute;left:50%;pointer-events:none;z-index:3;filter:drop-shadow(0 4px 6px rgba(0,0,0,.5))}}
{H} #mzside .mzd::before{{top:-40px;width:84px;height:43px;margin-left:-42px;background:{uri(MINI)} no-repeat center/contain;animation:hdin .45s cubic-bezier(.2,.9,.3,1.1) both,hdhov 2.4s .45s ease-in-out infinite}}
{H} #mzside .mzr::before{{top:-86px;width:92px;height:86px;margin-left:-46px;background:{uri(CRATE)} no-repeat center/contain;transform-origin:50% 0;animation:hdpara .7s cubic-bezier(.3,.7,.3,1) both,hdsway 3s .7s ease-in-out infinite}}
/* móvil: el dron más pequeño y menos hueco arriba; también encima de la ventana de piezas */
#hdpk{{display:none}}
{H} body.pcpick.mfs #hdpk.on{{display:block;position:fixed;width:124px;height:48px;margin-left:-62px;z-index:61;pointer-events:none;background:{uri(DRONE)} no-repeat center/contain;filter:drop-shadow(0 6px 8px rgba(0,0,0,.55));animation:hdin .45s cubic-bezier(.2,.9,.3,1.1) both,hdhov 2.6s .45s ease-in-out infinite}}
{H} body.pcpick.mfs #panel::before{{display:none!important}}
{H} body.mfs #relic.open:has(.pscr),{H} body.mfs #relic.open:has(.hdwin),{H} body.mfs #relic.hdcl{{padding-top:50px!important}}
{H} body.mfs #relic .pscr::before,{H} body.mfs #relic .hdwin::before{{top:-48px;width:124px;height:48px;margin-left:-62px}}
/* letra futurista de la tablet (Chakra Petch) en todo lo que proyecta el dron */
html{H} #relic.open :is(h1,h2,h3,h4,b,strong,small,i,em,p,span,div,button,label,a,li),html{H} #mzside :is(h4,b,small,span,div,em),html{H} #mzpop :is(h4,b,small,span,div,em,button),html{H} body.pcpick #panel :is(b,small,span,div,button){{font-family:'Chakra Petch',system-ui,sans-serif,"Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji"!important}}
html{H} #relic.open :is(i,em){{font-style:normal}}
@media (prefers-reduced-motion:reduce){{{H} #relic .ppap,{H} #relic .hdwin,{H} body.pcpick #panel>*,{H} #mzside>div{{animation:none!important}}}}
'''
open('src/css/21_dron.css','w',encoding='utf8').write(css)
print(len(css))
