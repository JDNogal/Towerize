// Towerize · clasificación de playtesters (Cloudflare Worker + Workers KV)
// POST /run          → guarda una partida terminada
// GET  /top?era=1&amz=3 → las 50 mejores de esa era y ese nivel de amenaza
// GET  /tiers?era=1  → niveles de amenaza con partidas en esa era
// Sin secretos aquí: el enlace con KV se hace al desplegar (binding RUNS).
const TOPN = 50;
const CORS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' };
const J = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS } });
const clean = (s, n) => String(s || '').replace(/[<>&"'`\\\u0000-\u001f]/g, '').trim().slice(0, n);
const int = (v, lo, hi) => { v = Math.floor(Number(v)); return Number.isFinite(v) && v >= lo && v <= hi ? v : null; };

async function addRun(req, env) {
  let b; try { b = await req.json(); } catch (e) { return J({ ok: false, err: 'json' }, 400); }
  const nick = clean(b.nick, 16), hero = clean(b.hero, 24), ver = clean(b.ver, 8);
  const era = int(b.era, 1, 9), amz = int(b.amz, 0, 99), score = int(b.score, 0, 1e9), round = int(b.round, 0, 99);
  if (nick.length < 2 || !hero || era == null || amz == null || score == null) return J({ ok: false, err: 'datos' }, 400);
  const sel = {}; if (b.sel && typeof b.sel === 'object') for (const [k, v] of Object.entries(b.sel).slice(0, 30)) { const r = int(v, 0, 9); if (r) sel[clean(k, 6)] = r; }
  const run = { nick, hero, ver, era, amz, score, round, won: !!b.won, sel, t: Date.now() };
  const key = `top:${era}:${amz}`;
  const top = (await env.RUNS.get(key, 'json')) || [];
  top.push(run); top.sort((a, c) => c.score - a.score);
  // como mucho una entrada por apodo y héroe: se queda la mejor
  const seen = new Set(), out = [];
  for (const r of top) { const id = r.nick.toLowerCase() + '|' + r.hero; if (seen.has(id)) continue; seen.add(id); out.push(r); if (out.length >= TOPN) break; }
  await env.RUNS.put(key, JSON.stringify(out));
  const pos = out.indexOf(run);
  return J({ ok: true, pos: pos < 0 ? null : pos + 1 });
}

export default {
  async fetch(req, env) {
    const u = new URL(req.url);
    if (req.method === 'OPTIONS') return new Response(null, { headers: CORS });
    if (req.method === 'POST' && u.pathname === '/run') return addRun(req, env);
    if (req.method === 'GET' && u.pathname === '/top') {
      const era = int(u.searchParams.get('era'), 1, 9), amz = int(u.searchParams.get('amz'), 0, 99);
      if (era == null || amz == null) return J({ ok: false, err: 'datos' }, 400);
      return J({ ok: true, era, amz, top: (await env.RUNS.get(`top:${era}:${amz}`, 'json')) || [] });
    }
    if (req.method === 'GET' && u.pathname === '/tiers') {
      const era = int(u.searchParams.get('era'), 1, 9); if (era == null) return J({ ok: false, err: 'datos' }, 400);
      const l = await env.RUNS.list({ prefix: `top:${era}:` });
      return J({ ok: true, era, tiers: l.keys.map(k => +k.name.split(':')[2]).sort((a, b) => a - b) });
    }
    return J({ ok: true, juego: 'Towerize', rutas: ['POST /run', 'GET /top?era=&amz=', 'GET /tiers?era='] });
  }
};
