import numpy as np, wave
sr=44100; T=29.0; t=np.arange(int(sr*T))/sr
def n(m): return 440*2**((m-69)/12)
# calm, warm pad: Am - F - C - G, 3.5 s per chord + soft plucked arpeggio
chords=[[57,60,64,69],[53,57,60,65],[48,55,60,64],[55,59,62,67]]
cl=3.5; out=np.zeros_like(t)
for k in range(int(T/cl)+1):
    ch=chords[k%4]; s=k*cl; idx=(t>=s-0.6)&(t<s+cl+0.9); tt=t[idx]-s+0.6
    env=np.minimum(1,tt/1.0)*np.minimum(1,np.maximum(0,(cl+1.5-tt)/1.0))
    for m in ch:
        f=n(m); out[idx]+=env*(np.sin(2*np.pi*f*tt)+.3*np.sin(2*np.pi*2*f*tt+.5)+.12*np.sin(2*np.pi*3*f*tt))*.06*(1+.15*np.sin(2*np.pi*.3*tt))
    for j in range(8):
        m=ch[[0,1,2,3,2,1,2,3][j]]+12; ps=s+j*cl/8; pidx=(t>=ps)&(t<ps+1.6); pt=t[pidx]-ps
        out[pidx]+=np.sin(2*np.pi*n(m)*pt)*np.exp(-pt*4.5)*.07
    bidx=(t>=s)&(t<s+cl); bt=t[bidx]-s
    out[bidx]+=np.sin(2*np.pi*n(ch[0]-12)*bt)*np.minimum(1,bt/0.3)*np.exp(-bt*0.4)*.12
# light reverb-ish smear
d=int(.11*sr); 
for g in (.35,.2,.1): out[d:]+=g*out[:-d]; d=int(d*1.7)
out/=np.abs(out).max()*1.12
fade=np.ones_like(t); fo=t>T-2.5; fade[fo]=(T-t[fo])/2.5; out*=fade; out[:int(.3*sr)]*=np.linspace(0,1,int(.3*sr))
st=np.stack([out,np.roll(out,300)],1)
w=wave.open('music.wav','wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(sr); w.writeframes((st*32767).astype(np.int16).tobytes()); w.close()
