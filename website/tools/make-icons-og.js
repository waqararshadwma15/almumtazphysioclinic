const { chromium } = require('playwright');
const fs = require('fs');
const root = require('path').resolve(__dirname, '..');
const logo = fs.readFileSync(root + '/public/logo.svg', 'utf8');
const urdu = JSON.parse(fs.readFileSync(root + '/app/urdu.json', 'utf8'));
const u = (k, h, c) => { const p = urdu[k]; const [x,y,w,hh]=p.vb; return `<svg viewBox="${x} ${y} ${w} ${hh}" height="${h}" width="${Math.round(h*w/hh)}"><path d="${p.d}" fill="${c}"/></svg>`; };
(async () => {
  const b = await chromium.launch();
  const pg = await b.newPage();
  for (const [s, file, pad] of [[192,'icon-192.png',.14],[512,'icon-512.png',.14],[180,'apple-icon.png',.12]]) {
    await pg.setViewportSize({ width: s, height: s });
    await pg.setContent(`<body style="margin:0;width:${s}px;height:${s}px;display:grid;place-items:center;background:#fff">${logo.replace('<svg','<svg style="width:'+(s*(1-2*pad))+'px;height:'+(s*(1-2*pad))+'px"')}</body>`);
    await pg.screenshot({ path: (file==='apple-icon.png'? root+'/app/' : root+'/public/') + file });
  }
  const img = fs.readFileSync(root + '/public/hero-treatment.jpg').toString('base64');
  await pg.setViewportSize({ width: 1200, height: 630 });
  await pg.setContent(`<html><head><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;700;800&display=block" rel="stylesheet"></head>
  <body style="margin:0;width:1200px;height:630px;font-family:Poppins;overflow:hidden;background:linear-gradient(120deg,#0A2A35,#0E5E6F 62%,#13788A);color:#fff;position:relative">
  <img src="data:image/jpeg;base64,${img}" style="position:absolute;right:0;top:0;width:520px;height:630px;object-fit:cover;object-position:60% 50%">
  <div style="position:absolute;right:0;top:0;width:520px;height:630px;background:linear-gradient(90deg,#0E5E6F 0%,rgba(14,94,111,0) 40%)"></div>
  <div style="position:absolute;left:64px;top:60px;width:640px">
   <div style="display:flex;align-items:center;gap:16px"><div style="background:#fff;border-radius:16px;padding:8px;width:72px;height:72px;display:grid;place-items:center">${logo.replace('<svg','<svg style="width:56px;height:56px"')}</div>
   <div><div style="font-weight:800;font-size:34px;line-height:1">Al Mumtaz</div><div style="font-size:22px;color:#CFEDEA">Physiotherapy Clinic</div></div></div>
   <div style="font-weight:800;font-size:56px;line-height:1.08;margin-top:40px">Physiotherapy &amp;<br>Rehabilitation</div>
   <div style="margin-top:14px">${u('centre',58,'#CFEDEA')}</div>
   <div style="font-size:22px;margin-top:14px;color:#DCEFF0">Dr. Arshad Khan · Consultant Physiotherapist</div>
   <div style="margin-top:26px;display:inline-block;background:#F28C28;color:#0A2A35;font-weight:700;font-size:24px;padding:12px 26px;border-radius:999px">WhatsApp 0333-2156512</div>
   <div style="font-size:18px;margin-top:18px;color:#CFEDEA">Inside Al Mumtaz Hospital, Malir, Karachi · Daily 11 AM – 9 PM</div>
  </div></body></html>`, { waitUntil: 'networkidle' });
  await pg.evaluate(() => document.fonts.ready);
  await pg.screenshot({ path: root + '/public/og.png' });
  await b.close();
})();
