# Calm, slow pad: sustained soft chords (7 s each), no plucks/arpeggio, gently low-passed.
import numpy as np, soundfile as sf
from scipy.signal import butter, sosfilt
sr=44100; T=28.5; t=np.arange(int(sr*T))/sr
n=lambda m:440*2**((m-69)/12)
chords=[[48,55,60,64],[45,52,57,60],[41,48,53,57],[43,50,55,59]]  # C - Am - F - G
cl=7.125; out=np.zeros_like(t)
for k,ch in enumerate(chords):
  s=k*cl; idx=(t>=s-1.5)&(t<s+cl+1.5); tt=t[idx]-(s-1.5); L=cl+3
  env=np.sin(np.pi*np.clip(tt/L,0,1))**1.5
  for j,m in enumerate(ch):
    f=n(m); out[idx]+=env*(np.sin(2*np.pi*f*tt)+.15*np.sin(2*np.pi*2*f*tt))*(.9 if j==0 else .55)*(1+.08*np.sin(2*np.pi*.15*tt+j))
out=sosfilt(butter(2,1400,'low',fs=sr,output='sos'),out)
d=int(.13*sr)
for g in (.3,.18,.1): out[d:]+=g*out[:-d]; d=int(d*1.6)
out/=np.abs(out).max()*1.05
f=np.ones_like(t); f[:sr]=np.linspace(0,1,sr); fo=t>T-2.5; f[fo]=(T-t[fo])/2.5; out*=f
sf.write('music_calm.wav',np.stack([out,np.roll(out,400)],1),sr)
