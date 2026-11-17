const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();
await p.goto('file://'+process.cwd()+'/final.html',{waitUntil:'networkidle'});
await p.evaluate(()=>document.fonts.ready);
await p.pdf({path:'out.pdf',format:'A4',printBackground:true,displayHeaderFooter:true,
headerTemplate:'<div></div>',
footerTemplate:'<div style="font-family:Arial;font-size:7.5px;color:#5b6b70;width:100%;padding:0 15mm;display:flex;justify-content:space-between"><span>Al Mumtaz Physiotherapy Clinic · Project summary · 17 Nov 2026</span><span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>',
margin:{top:'16mm',bottom:'18mm',left:'15mm',right:'15mm'}});
await b.close();})();
