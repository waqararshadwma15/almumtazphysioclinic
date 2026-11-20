import json, numpy as np, soundfile as sf, subprocess, sys
from scipy.signal import resample_poly
S={'hook':0.35,'explain':3.95,'t1':8.6,'t2':12.6,'t3':16.6,'warn':20.6,'end':24.4}
SR=44100; T=28.5; L=json.load(open('lines.json')); plan={}
for vid in (sys.argv[1:] or L):
  v=np.zeros(int(SR*T)); prev=0; segs=[]
  for k in S:
    a,sr=sf.read(f'{vid}_{k}.wav',dtype='float32'); a=resample_poly(a,SR,sr)
    nz=np.where(np.abs(a)>0.01)[0]; a=a[max(0,nz[0]-400):nz[-1]+2000]
    st=max(S[k],prev+0.2); en=st+len(a)/SR; assert en<=28.3,(vid,k,en)
    i=int(st*SR); v[i:i+len(a)]+=a*0.95/np.abs(a).max(); prev=en; segs.append((k,round(st,2),round(en,2)))
  sf.write(f'{vid}_voice.wav',v,SR); plan[vid]=segs; print(vid,segs)
json.dump(plan,open('plan.json','w'),indent=1)
