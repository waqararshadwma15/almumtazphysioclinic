const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
await p.goto('file://'+__dirname+'/winter-tips-poster.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1500);
await p.screenshot({path:'08-winter-tips-poster.png'});await p.screenshot({path:'08-winter-tips-poster.jpg',type:'jpeg',quality:92});await b.close()})();
