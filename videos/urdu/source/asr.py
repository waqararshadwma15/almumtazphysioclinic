import sherpa_onnx, soundfile as sf, glob, json, sys
W='/tmp/claude-0/ur/sherpa-onnx-whisper-small/'
r=sherpa_onnx.OfflineRecognizer.from_whisper(encoder=W+'small-encoder.int8.onnx' if __import__('os').path.exists(W+'small-encoder.int8.onnx') else W+'small-encoder.onnx',decoder=W+'small-decoder.int8.onnx',tokens=W+'small-tokens.txt',language='ur',task='transcribe',num_threads=8)
L=json.load(open('lines.json'))
for f in sorted(glob.glob(sys.argv[1] if len(sys.argv)>1 else '*.wav')):
  a,sr=sf.read(f,dtype='float32'); a=__import__('numpy').concatenate([a,__import__('numpy').zeros(sr*2,dtype='float32')]); s=r.create_stream(); s.accept_waveform(sr,a); r.decode_stream(s)
  v,k=f[:-4].rsplit('_',1); print(k,'| ORIG:',L[v][k]); print('   ASR:',s.result.text.strip())
