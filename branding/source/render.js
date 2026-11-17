const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();
for(const [n,w,h] of [['logo-profile',1080,1080],['logo-lockup',1520,560],['fb-cover',1640,624],['intro-post',1080,1350]]){
 const p=await b.newPage({viewport:{width:w,height:h}});
 await p.goto('file://'+process.cwd()+'/'+n+'.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(800);
 await p.screenshot({path:n+'.png'});await p.close();}
await b.close();})();
