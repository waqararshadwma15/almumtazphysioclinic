import re, numpy as np
from piper import PiperVoice, SynthesisConfig
v=PiperVoice.load('/tmp/claude-0/ur/vits-piper-ur_PK-fasih-medium/ur_PK-fasih-medium.onnx')
FIX=[(r'fˌ?[əe]ː?zˈ?eːˌ?oː ?tʰ[ie]?ː?rˈaːpˌɪsʈ','fˈɪzɪjoːtʰˌɛrəpɪsʈ'),(r'fˌ?[əe]ː?zˈ?eːˌ?oː ?tʰ[ie]?ː?rˈaːpi','fˈɪzɪjoːtʰˌɛrəpi'),
 ('klˈiːnək','klˈɪnɪk'),('sˈiːr\\.hjãː','sˈiːɽʰɪjãː'),('ʋˈʌrəzʃẽː','ʋˈʌrzɪʃẽː'),('ʋˈʌrəzʃ','ʋˈʌrzɪʃ'),
 ('almʊmtˈaːz','ˈal mʊmtˈaːz'),('ʋˈaːʈs ˈeːp','ʋˈɔːʈsˌɛp'),('r\\.h','ɽʰ'),('r\\.','ɽ'),('ɽʰj','ɽʰɪj')]
def phon(t):
  out=[]
  for s in v.phonemize(t):
    p=''.join(s)
    for a,b in FIX: p=re.sub(a,b,p)
    out.append(p)
  return out
def synth(t,ls=0.95):
  cfg=SynthesisConfig(length_scale=ls,noise_scale=0.5,noise_w_scale=0.6); parts=[]
  for p in phon(t):
    parts.append(v.phoneme_ids_to_audio(v.phonemes_to_ids(list(p)),cfg)); parts.append(np.zeros(int(22050*0.12),dtype=np.float32))
  return np.concatenate(parts)
