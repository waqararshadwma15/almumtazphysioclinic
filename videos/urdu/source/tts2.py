import json, sys, re, numpy as np, soundfile as sf
from piper import PiperVoice, SynthesisConfig
v=PiperVoice.load('/tmp/claude-0/ur/vits-piper-ur_PK-fasih-medium/ur_PK-fasih-medium.onnx')
FIX=[(r'fˌ?[əe]ː?zˈ?eːˌ?oː ?tʰ[ie]?ː?rˈaːpˌɪsʈ','fˈɪzɪjoːtʰˌɛrəpɪsʈ'),(r'fˌ?[əe]ː?zˈ?eːˌ?oː ?tʰ[ie]?ː?rˈaːpi','fˈɪzɪjoːtʰˌɛrəpi'),
     ('klˈiːnək','klˈɪnɪk'),('sˈiːr\\.hjãː','sˈiːɽʰɪjãː'),('ʋˈʌrəzʃẽː','ʋˈʌrzɪʃẽː'),('ʋˈʌrəzʃ','ʋˈʌrzɪʃ'),('almʊmtˈaːz','ˈal mʊmtˈaːz'),('ʋˈaːʈs ˈeːp','ʋˈɔːʈsˌɛp'),('r\\.h','ɽʰ'),('r\\.','ɽ'),('ɽʰj','ɽʰɪj')]
def phon(t,fix=True):
  out=[]
  for s in v.phonemize(t):
    p=''.join(s)
    if fix:
      for a,b in FIX: p=re.sub(a,b,p)
    out.append(p)
  return out
def synth(t,ls=0.95,fix=True):
  cfg=SynthesisConfig(length_scale=ls,noise_scale=0.5,noise_w_scale=0.6); parts=[]
  for p in phon(t,fix):
    parts.append(v.phoneme_ids_to_audio(v.phonemes_to_ids(list(p)),cfg)); parts.append(np.zeros(int(22050*0.12),dtype=np.float32))
  return np.concatenate(parts)
if __name__=='__main__':
  L=json.load(open('lines.json')); ls=float(sys.argv[1]); only=sys.argv[2] if len(sys.argv)>2 else ''; fix=len(sys.argv)<=3
  for vid,d in L.items():
    for k,t in d.items():
      if only and not re.search(only,f'{vid}_{k}'): continue
      a=synth(t,ls,fix); sf.write(f'{vid}_{k}.wav',a,22050); print(vid,k,round(len(a)/22050,2),phon(t)[0] if fix else '')
