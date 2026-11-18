import json, subprocess, sys
P=json.load(open('plan.json')); SRC='/mnt/project-files/videos/'
for vid in (sys.argv[1:] or P):
  segs=P[vid]; ins=['-i',SRC+vid+'.mp4','-i','music.wav','-i',f'{vid}_voice.wav']; f=[]; last='0:v'
  for i,(k,st,en) in enumerate(segs):
    nxt=segs[i+1][1] if i+1<len(segs) else 28.5
    a=max(0,st-0.1); b=min(en+0.35,nxt-0.05) if i+1<len(segs) else 28.5
    ins+=['-loop','1','-t','28.5','-i',f'caps/{vid}_{k}.png']; idx=3+i
    f.append(f"[{last}][{idx}:v]overlay=0:0:enable='between(t,{a:.2f},{b:.2f})'[v{i}]"); last=f'v{i}'
  f.append("[1:a]volume=0.85[m];[2:a]aresample=44100,asplit[vs][vv];[m][vs]sidechaincompress=threshold=0.015:ratio=12:attack=20:release=450:makeup=1[md];[vv]volume=1.0,highpass=f=70[vo];[md][vo]amix=inputs=2:normalize=0:duration=first,loudnorm=I=-14:TP=-1.5:LRA=11[a]")
  cmd=['ffmpeg','-y','-v','error',*ins,'-filter_complex',';'.join(f),'-map',f'[{last}]','-map','[a]','-t','28.5','-c:v','libx264','-crf','19','-preset','medium','-pix_fmt','yuv420p','-r','30','-c:a','aac','-b:a','192k','-ar','44100','-movflags','+faststart',f'out/{vid}-urdu.mp4']
  subprocess.run(cmd,check=True); print('ok',vid)
