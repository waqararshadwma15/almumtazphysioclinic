# Re-voice with a brighter, quicker, more expressive delivery:
# Piper at faster pace + more expressive noise, then pitch up ~7% keeping the faster duration,
# with a louder, punchier level and a short fade in/out to avoid clicks.
import re, json, numpy as np, soundfile as sf, subprocess, sys
import tts_lib as tts2
from scipy.signal import resample_poly
SR=22050
def energize(a):
    # pitch up 7% by resampling then time-stretch back, via ffmpeg atempo to keep length
    x=np.clip(a,-1,1).astype(np.float32)
    up=resample_poly(x,1000,1070)  # plays faster+higher
    sf.write('/tmp/claude-0/winter/work/_t.wav',up,SR)
    subprocess.run(['ffmpeg','-v','error','-y','-i','/tmp/claude-0/winter/work/_t.wav','-filter:a','atempo=1.0','/tmp/claude-0/winter/work/_t2.wav'],check=True)
    y,_=sf.read('/tmp/claude-0/winter/work/_t2.wav',dtype='float32')
    fade=np.ones(len(y)); n=int(SR*0.03); fade[:n]=np.linspace(0,1,n); fade[-n:]=np.linspace(1,0,n)
    y=y*fade; y=y/np.max(np.abs(y))*0.92
    return y
L=json.load(open('lines.json'))
for vid,d in L.items():
    for k,t in d.items():
        a=tts2.synth(t,ls=0.82)           # faster delivery
        a=energize(a)
        sf.write(f'energetic/{vid}_{k}.wav',a,SR)
        print(vid,k,round(len(a)/SR,2))
