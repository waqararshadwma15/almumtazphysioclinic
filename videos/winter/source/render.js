// usage: node render.js <id> <fps> [stillsOnly t1,t2,...]
const {chromium}=require('playwright');const {spawn}=require('child_process');
const id=process.argv[2],fps=+process.argv[3]||30,stills=process.argv[4];
const T=require('./durations.json')[id];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+__dirname+'/'+id+'.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1500);
const seek=t=>p.evaluate(ms=>{for(const a of document.getAnimations()){a.pause();a.currentTime=ms;}},t*1000);
if(stills){for(const t of stills.split(',')){await seek(+t);await p.screenshot({path:`still-${id}-${t}.jpg`,type:'jpeg',quality:80});}await b.close();return;}
const ff=spawn('ffmpeg',['-y','-v','error','-f','image2pipe','-framerate',String(fps),'-c:v','mjpeg','-i','-','-c:v','libx264','-pix_fmt','yuv420p','-crf','18','-preset','medium','-r',String(fps),`${id}-silent.mp4`],{stdio:['pipe','inherit','inherit']});
const N=Math.round(T*fps);for(let i=0;i<N;i++){await seek(i/fps);const buf=await p.screenshot({type:'jpeg',quality:94});if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));}
ff.stdin.end();await new Promise(r=>ff.on('close',r));await b.close();console.log('done',id,N);})();
