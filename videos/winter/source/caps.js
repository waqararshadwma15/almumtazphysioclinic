const {chromium}=require('playwright');const L=require('./lines.json');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.setContent(`<html><head><link href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@600&display=block" rel="stylesheet"><style>
html,body{margin:0;background:transparent}#c{position:absolute;left:50%;top:var(--top);transform:translateX(-50%);width:max-content;white-space:nowrap;box-sizing:border-box;
padding:2px 30px 18px;border-radius:28px;background:rgba(10,42,53,.86);color:#fff;font:600 var(--fs,40px)/1.85 'Noto Nastaliq Urdu';direction:rtl;text-align:center;box-shadow:0 6px 24px rgba(0,0,0,.25)}
#c b{color:#F28C28;font-weight:600}</style></head><body><div id="c">ا</div></body></html>`);
await p.evaluate(()=>document.fonts.load("600 44px 'Noto Nastaliq Urdu'","اردو"));await p.waitForTimeout(800);
fs.mkdirSync('caps',{recursive:true});
for(const [vid,d] of Object.entries(L))for(const [k,t] of Object.entries(d)){
 const top=k==='end'?'1475px':'184px';
 await p.evaluate(([t,top])=>{const c=document.getElementById('c');c.textContent=t;c.style.setProperty('--top',top);let fs=40;c.style.setProperty('--fs',fs+'px');while(c.getBoundingClientRect().width>990&&fs>28){fs--;c.style.setProperty('--fs',fs+'px')}},[t,top]);
 await p.screenshot({path:`caps/${vid}_${k}.png`,omitBackground:true});}
await b.close();})();
