// Builds one HTML page per video. Every motion is a CSS animation, so render.js can
// pause them all and seek to any frame deterministically.
const fs = require('fs');
const path = require('path');
const OUT = process.argv[2] || __dirname;
const logo = fs.readFileSync(path.join(__dirname, 'clinic-logo.svg'), 'utf8')
  .replace(/<\?xml[^>]*>/, '').replace(/xmlns:c2pa="[^"]*"/, '');

const C = { teal: '#0E5E6F', navy: '#0A2A35', orange: '#F28C28', mint: '#E8F5F4', g1: '#1F6E3B', g2: '#6DBE45' };
const st = (d, extra = '') => `style="animation-delay:${d.toFixed(2)}s;${extra}"`;

// ---------- illustrations (viewBox 600x600) ----------
const ILLO = {
  neck: (s) => `
  <svg viewBox="0 0 600 600" class="illo">
    <g stroke="${C.teal}" stroke-width="16" stroke-linecap="round" fill="none" opacity=".35">
      <path d="M200 410 H390 M380 410 V560 M210 410 V560 M205 410 V250"/></g>
    <g stroke="${C.navy}" stroke-width="34" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M262 400 L272 252"/><path d="M262 400 L400 404 L404 540 L452 540"/>
      <path d="M272 268 L322 352 L384 316"/></g>
    <rect x="374" y="270" width="34" height="58" rx="8" fill="${C.orange}" transform="rotate(20 391 299)"/>
    <circle cx="276" cy="232" r="46" fill="${C.orange}" class="pulse" ${st(s + 2.0)}/>
    <g class="tilt" style="animation-delay:${(s + .6).toFixed(2)}s;transform-origin:272px 252px">
      <path d="M272 252 L278 205" stroke="${C.navy}" stroke-width="34" stroke-linecap="round"/>
      <circle cx="282" cy="158" r="44" fill="${C.navy}"/></g>
    <g class="pop" ${st(s + 2.2)}><path d="M150 120 v90 m-26 -30 l26 30 l26 -30" stroke="${C.orange}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" fill="none"/></g>
  </svg>`,
  back: (s) => `
  <svg viewBox="0 0 600 600" class="illo">
    <g stroke="${C.teal}" stroke-width="16" stroke-linecap="round" fill="none" opacity=".35">
      <path d="M190 410 H380 M370 410 V560 M200 410 V560 M195 410 V240"/></g>
    <g stroke="${C.navy}" stroke-width="34" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M250 400 L390 404 L394 540 L442 540"/></g>
    <g class="swapOut" ${st(s + 2.2)}>
      <path d="M250 400 Q215 320 300 262" stroke="${C.navy}" stroke-width="34" stroke-linecap="round" fill="none"/>
      <path d="M250 400 Q215 320 300 262" stroke="${C.orange}" stroke-width="10" stroke-dasharray="4 18" stroke-linecap="round" fill="none"/>
      <circle cx="330" cy="222" r="42" fill="${C.navy}"/>
      <path d="M290 280 L350 330 L400 300" stroke="${C.navy}" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <g transform="translate(470 170)"><circle r="44" fill="#E04E39"/><path d="M-18 -18 L18 18 M18 -18 L-18 18" stroke="#fff" stroke-width="10" stroke-linecap="round"/></g></g>
    <g class="swapIn" ${st(s + 2.2)}>
      <path d="M250 400 L255 252" stroke="${C.navy}" stroke-width="34" stroke-linecap="round" fill="none"/>
      <path d="M250 400 L255 252" stroke="${C.g2}" stroke-width="10" stroke-dasharray="4 18" stroke-linecap="round" fill="none"/>
      <circle cx="260" cy="200" r="42" fill="${C.navy}"/>
      <path d="M256 272 L320 345 L385 318" stroke="${C.navy}" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <rect x="196" y="300" width="22" height="90" rx="10" fill="${C.g2}"/>
      <g transform="translate(470 170)"><circle r="44" fill="${C.g1}"/><path d="M-20 0 L-6 16 L20 -16" stroke="#fff" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none"/></g></g>
  </svg>`,
  knee: (s) => `
  <svg viewBox="0 0 600 600" class="illo">
    <path d="M60 560 H200 V470 H330 V380 H460 V290 H560" stroke="${C.teal}" stroke-width="16" fill="none" opacity=".35" stroke-linejoin="round"/>
    <g class="step" style="animation-delay:${(s + .4).toFixed(2)}s">
      <circle cx="318" cy="250" r="56" fill="${C.orange}" class="pulse" ${st(s + 1.0)}/>
      <g stroke="${C.navy}" stroke-width="36" stroke-linecap="round" stroke-linejoin="round" fill="none">
        <path d="M220 120 L318 250 L300 372 L360 372"/></g>
      <g stroke="${C.navy}" stroke-width="36" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity=".5">
        <path d="M220 120 L190 300 L170 462 L226 462"/></g></g>
    <g class="pop" ${st(s + 1.4)}><g transform="translate(430 150)">
      <path d="M-40 0 h-34 M40 0 h34 M0 -40 v-34 M-28 -28 l-24 -24 M28 -28 l24 -24" stroke="${C.orange}" stroke-width="12" stroke-linecap="round"/></g></g>
  </svg>`,
  shoulder: (s) => `
  <svg viewBox="0 0 600 600" class="illo">
    <path d="M345 225 m0 150 A150 150 0 0 0 345 75" stroke="${C.teal}" stroke-width="10" stroke-dasharray="6 18" stroke-linecap="round" fill="none" opacity=".5" transform="rotate(0)"/>
    <path d="M345 375 A150 150 0 0 0 493 230" stroke="${C.orange}" stroke-width="14" stroke-linecap="round" fill="none" class="draw" style="animation-delay:${(s + .6).toFixed(2)}s;stroke-dasharray:240;stroke-dashoffset:240"/>
    <g stroke="${C.navy}" stroke-width="34" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M300 200 V400 M300 400 L262 560 M300 400 L338 560 M255 225 L230 380"/></g>
    <path d="M255 225 H345" stroke="${C.navy}" stroke-width="34" stroke-linecap="round"/>
    <circle cx="300" cy="140" r="44" fill="${C.navy}"/>
    <circle cx="345" cy="225" r="38" fill="${C.orange}" class="pulse" ${st(s + 1.8)}/>
    <g class="raise" style="animation-delay:${(s + .6).toFixed(2)}s;transform-origin:345px 225px">
      <path d="M345 225 L360 380" stroke="${C.navy}" stroke-width="34" stroke-linecap="round"/></g>
    <g class="pop" ${st(s + 1.9)}><g transform="translate(500 150)"><circle r="40" fill="#E04E39"/><path d="M0 -20 v20 M0 18 v1" stroke="#fff" stroke-width="10" stroke-linecap="round"/></g></g>
  </svg>`,
};

// ---------- scenes ----------
function hook(v, s, e) {
  const media = v.hookImg
    ? `<div class="hcard kb" ${st(s)}><img src="${v.hookImg}" style="object-position:${v.hookPos || 'center'}"></div>`
    : `<div class="hcard illoCard">${ILLO[v.illo](s)}</div>`;
  return `<section class="scene dark" style="--s:${s}s;--e:${e}s">
    ${media}
    <div class="htext">
      <div class="l1 up" ${st(s + .2)}>${v.hook[0]}</div>
      <div class="big pop" ${st(s + .55)}>${v.hook[1]}</div>
      <div class="l1 up" ${st(s + .9)}>${v.hook[2]}</div>
      <div class="ur ur-w up" ${st(s + 1.3)}>${v.hookUr}</div>
    </div></section>`;
}
function explain(v, s, e) {
  return `<section class="scene" style="--s:${s}s;--e:${e}s">
    <div class="tag up" ${st(s + .1)}>${v.explainTag}</div>
    <div class="illoWrap">${ILLO[v.illo](s)}</div>
    <div class="caption">
      <div class="ru up" ${st(s + 1.0)}>${v.explain[0]}</div>
      <div class="ur up" ${st(s + 1.5)}>${v.explain[1]}</div>
      <div class="en up" ${st(s + 1.9)}>${v.explain[2]}</div>
    </div></section>`;
}
function tip(t, i, n, s, e) {
  return `<section class="scene" style="--s:${s}s;--e:${e}s">
    <div class="tag up" ${st(s + .05)}>Tip ${i}/${n}</div>
    <div class="tipIcon pop" ${st(s + .15)}><span>${t.icon}</span><b>${i}</b></div>
    <div class="caption">
      <div class="ru up" ${st(s + .45)}>${t.ru}</div>
      <div class="ur up" ${st(s + .8)}>${t.ur}</div>
      <div class="en up" ${st(s + 1.1)}>${t.en}</div>
    </div></section>`;
}
function warn(v, s, e) {
  return `<section class="scene warnBg" style="--s:${s}s;--e:${e}s">
    <div class="tipIcon pop warnIcon" ${st(s + .1)}><span>⚠️</span></div>
    <div class="caption">
      <div class="ru up" ${st(s + .35)}>${v.warn[0]}</div>
      <div class="ur up" ${st(s + .7)}>${v.warn[1]}</div>
      <div class="ru small up" ${st(s + 1.1)}>${v.warn[2]}</div>
    </div></section>`;
}
function endCard(s) {
  return `<section class="scene endBg" style="--s:${s}s;--e:999s">
    <div class="endLogo pop" ${st(s + .1)}>${logo}</div>
    <div class="endName up" ${st(s + .4)}>Al Mumtaz<br>Physiotherapy Clinic</div>
    <div class="endSub up" ${st(s + .6)}>Physiotherapy &amp; Rehabilitation</div>
    <div class="wa pop" ${st(s + .9)}>
      <svg viewBox="0 0 24 24" width="62" height="62"><path fill="#fff" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.2-.8-2.7-1.1-4.4-3.9-4.5-4.1-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.2c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.6 2 1.1 1 2 1.3 2.3 1.4.3.2.5.1.6 0l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.4.2.5.3 0 .2 0 .7-.3 1.2z"/></svg>
      <span>0333-2156512</span></div>
    <div class="endInfo up" ${st(s + 1.2)}>📍 Inside Al Mumtaz Hospital</div>
    <div class="endInfo up" ${st(s + 1.4)}>🕚 Daily 11 AM – 11 PM</div>
    <div class="ur ur-w up" style="animation-delay:${(s + 1.7).toFixed(2)}s;margin-top:18px">اپائنٹمنٹ کے لیے ابھی واٹس ایپ کریں</div>
    <div class="disc up" ${st(s + 2.0)}>General awareness only. Not a diagnosis. Please consult a physiotherapist.</div>
  </section>`;
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Poppins:wght@500;600;700;800&display=block');
@font-face{font-family:JNN;src:url('jnn.ttf')}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1920px;overflow:hidden}
body{font-family:Poppins,sans-serif;background:linear-gradient(180deg,#F4FBFA 0%,${C.mint} 60%,#D6ECE9 100%);color:${C.navy};position:relative}
.blob{position:absolute;border-radius:50%;filter:blur(10px);opacity:.5;animation:drift 14s ease-in-out infinite alternate}
.b1{width:700px;height:700px;left:-260px;top:-180px;background:radial-gradient(circle,#BFE3DE,transparent 70%)}
.b2{width:800px;height:800px;right:-320px;bottom:-200px;background:radial-gradient(circle,#FCD9B4,transparent 70%);animation-duration:18s}
@keyframes drift{to{transform:translate(120px,160px) scale(1.15)}}
.scene{position:absolute;inset:0;opacity:0;display:flex;flex-direction:column;align-items:center;padding:300px 80px 0;
  animation:sIn .45s ease-out var(--s) both,sOut .4s ease-in calc(var(--e) - .4s) forwards}
@keyframes sIn{from{opacity:0;transform:scale(1.04)}to{opacity:1;transform:none}}
@keyframes sOut{to{opacity:0;transform:scale(.97)}}
.dark{background:linear-gradient(180deg,${C.navy} 0%,#0B3F4B 55%,${C.teal} 100%);color:#fff}
.warnBg{background:linear-gradient(180deg,#FFF6EC,#FDE6CC)}
.endBg{background:radial-gradient(120% 80% at 50% 20%,#147487 0%,${C.teal} 45%,${C.navy} 100%);color:#fff;padding-top:250px}
.up{animation:up .6s cubic-bezier(.2,.8,.2,1) both}
@keyframes up{from{opacity:0;transform:translateY(50px)}to{opacity:1;transform:none}}
.pop{animation:pop .55s cubic-bezier(.3,1.6,.5,1) both;transform-box:fill-box;transform-origin:center}
@keyframes pop{from{opacity:0;transform:scale(.3)}to{opacity:1;transform:none}}
.pulse{animation:pulse 1.1s ease-in-out both infinite;transform-box:fill-box;transform-origin:center}
@keyframes pulse{0%{opacity:0;transform:scale(.6)}50%{opacity:.85;transform:scale(1.15)}100%{opacity:.25;transform:scale(1)}}
.tilt{animation:tilt 1.2s cubic-bezier(.5,0,.3,1) both;transform-box:view-box}
@keyframes tilt{to{transform:rotate(48deg)}}
.raise{animation:raise 1.3s cubic-bezier(.4,0,.3,1) both;transform-box:view-box}
@keyframes raise{0%{transform:rotate(0)}80%{transform:rotate(-88deg)}90%{transform:rotate(-80deg)}100%{transform:rotate(-84deg)}}
.draw{animation:draw 1.1s cubic-bezier(.4,0,.3,1) forwards}
@keyframes draw{to{stroke-dashoffset:0}}
.step{animation:step 2s ease-in-out both}
@keyframes step{0%{transform:translate(-30px,40px)}100%{transform:none}}
.swapOut{animation:fadeOut .5s both} @keyframes fadeOut{to{opacity:0}}
.swapIn{animation:fadeIn .5s both} @keyframes fadeIn{from{opacity:0}to{opacity:1}}
.kb{animation:kb 4.5s ease-out both}
@keyframes kb{from{transform:scale(1.18)}to{transform:scale(1)}}
.hcard{width:920px;height:760px;border-radius:44px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.35);border:6px solid rgba(255,255,255,.15)}
.hcard img{width:100%;height:100%;object-fit:cover;filter:saturate(.85) contrast(1.05)}
.illoCard{background:${C.mint};display:flex;align-items:center;justify-content:center}
.illoCard .illo{width:700px;height:700px}
.htext{text-align:center;margin-top:50px}
.l1{font-size:66px;font-weight:700;line-height:1.1}
.big{font-family:Anton,sans-serif;font-size:200px;line-height:1.05;color:${C.orange};letter-spacing:4px;transform-origin:center}
.ur{font-family:JNN,serif;direction:rtl;font-size:84px;line-height:1.55;color:${C.teal};text-align:center}
.ur-w{color:#CDEBE6}
.tag{background:${C.teal};color:#fff;font-weight:700;font-size:44px;padding:14px 46px;border-radius:60px;letter-spacing:1px}
.illoWrap{margin-top:30px;width:820px;height:820px}.illoWrap .illo{width:100%;height:100%}
.caption{text-align:center;margin-top:20px;max-width:960px;text-wrap:balance}.caption .ur{font-size:76px}
.ru{font-size:70px;font-weight:800;line-height:1.15}
.ru b{color:${C.orange}}
.ru.small{font-size:54px;font-weight:700;color:${C.teal};margin-top:10px}
.en{font-size:40px;font-weight:500;color:#4F6B73;margin-top:8px}
.tipIcon{position:relative;width:520px;height:520px;border-radius:50%;background:#fff;margin:60px 0 40px;display:flex;align-items:center;justify-content:center;
  box-shadow:0 30px 80px rgba(14,94,111,.25);border:14px solid ${C.mint}}
.tipIcon span{font-size:260px;line-height:1}
.tipIcon b{position:absolute;right:10px;top:10px;width:150px;height:150px;border-radius:50%;background:${C.orange};color:#fff;font-size:96px;display:flex;align-items:center;justify-content:center;font-weight:800}
.warnIcon{width:400px;height:400px;border-color:#FCD9B4}.warnIcon span{font-size:200px}
.endLogo{width:330px;height:330px;border-radius:50%;background:#fff;padding:30px;display:flex;align-items:center;justify-content:center;box-shadow:0 20px 60px rgba(0,0,0,.3)}
.endLogo svg{width:100%;height:100%}
.endName{font-size:78px;font-weight:800;line-height:1.08;text-align:center;margin-top:40px}
.endSub{font-size:44px;color:#CDEBE6;margin-top:10px;font-weight:600}
.wa{display:flex;align-items:center;gap:24px;background:#25D366;padding:26px 60px;border-radius:90px;margin-top:56px;font-size:76px;font-weight:800;box-shadow:0 20px 50px rgba(0,0,0,.3)}
.endInfo{font-size:52px;font-weight:600;margin-top:30px}
.disc{position:absolute;bottom:330px;left:80px;right:80px;text-align:center;font-size:30px;color:#A9CFD0}
.hdr{position:absolute;top:110px;left:0;right:0;display:flex;justify-content:center;align-items:center;gap:20px;z-index:5;font-weight:700;font-size:38px}
.hdr .lg{width:84px;height:84px;background:#fff;border-radius:50%;padding:10px;box-shadow:0 6px 20px rgba(0,0,0,.15)}
.hdr .lg svg{width:100%;height:100%}
.hdrD{color:#fff;animation:hdrD var(--hd) steps(1) both}
@keyframes hdrD{}
.prog{position:absolute;top:0;left:0;height:12px;width:100%;background:${C.orange};transform-origin:left;z-index:6;animation:prog var(--T) linear both}
@keyframes prog{from{transform:scaleX(0)}to{transform:scaleX(1)}}
`;

function page(v) {
  const T = [];
  let t = 0;
  const add = (d, fn) => { const s = t; t += d; T.push(fn(s, t)); };
  add(3.8, (s, e) => hook(v, s, e));
  add(4.6, (s, e) => explain(v, s, e));
  v.tips.forEach((tp, i) => add(4.0, (s, e) => tip(tp, i + 1, v.tips.length, s, e)));
  add(3.6, (s, e) => warn(v, s, e));
  const endStart = t; t += 4.5; T.push(endCard(endStart));
  const total = t;
  // header is white over dark hook/end, navy otherwise: two layers, toggled by scene timing
  return { total, html: `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body>
<div class="blob b1"></div><div class="blob b2"></div>
${T.join('\n')}
<div class="hdr hdrLight" style="animation:hdrVis ${total}s linear both"><div class="lg">${logo}</div><span>Al Mumtaz Physiotherapy Clinic</span></div>
<style>
.hdrLight{color:${C.navy}}
@keyframes hdrVis{0%{color:#fff}${(3.8 / total * 100).toFixed(2)}%{color:#fff}${(3.9 / total * 100).toFixed(2)}%{color:${C.navy}}${(endStart / total * 100).toFixed(2)}%{color:${C.navy};opacity:1}${((endStart + .3) / total * 100).toFixed(2)}%{opacity:0}100%{opacity:0}}
</style>
<div class="prog" style="--T:${total}s"></div>
</body></html>` };
}

const VIDEOS = require('./scripts.json');
const meta = {};
for (const [id, v] of Object.entries(VIDEOS)) {
  const { total, html } = page(v);
  fs.writeFileSync(path.join(OUT, id + '.html'), html);
  meta[id] = total;
}
fs.writeFileSync(path.join(OUT, 'durations.json'), JSON.stringify(meta, null, 1));
console.log(meta);
