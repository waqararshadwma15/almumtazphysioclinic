import sys, json, uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
fp=sys.argv[1]; phrases=json.load(open(sys.argv[2])); out=sys.argv[3]
blob=hb.Blob.from_file_path(fp); face=hb.Face(blob); font=hb.Font(face)
tt=TTFont(fp); gs=tt.getGlyphSet(); order=tt.getGlyphOrder()
upm=tt['head'].unitsPerEm; asc=tt['hhea'].ascent; desc=tt['hhea'].descent
res={}
for key,text in phrases.items():
    buf=hb.Buffer(); buf.add_str(text); buf.guess_segment_properties()
    hb.shape(font,buf,{})
    x=0; pen=SVGPathPen(gs)
    for info,pos in zip(buf.glyph_infos,buf.glyph_positions):
        name=order[info.codepoint]
        tp=TransformPen(pen,(1,0,0,-1,x+pos.x_offset,asc-pos.y_offset))
        gs[name].draw(tp); x+=pos.x_advance
    # compute bbox from path by drawing into bounds pen
    from fontTools.pens.boundsPen import BoundsPen
    bp=BoundsPen(gs); x2=0
    for info,pos in zip(buf.glyph_infos,buf.glyph_positions):
        gs[order[info.codepoint]].draw(TransformPen(bp,(1,0,0,-1,x2+pos.x_offset,asc-pos.y_offset))); x2+=pos.x_advance
    xmin,ymin,xmax,ymax=bp.bounds
    pad=20
    res[key]={"d":pen.getCommands(),"vb":[round(xmin-pad),round(ymin-pad),round(xmax-xmin+2*pad),round(ymax-ymin+2*pad)],"text":text}
json.dump(res,open(out,'w'),ensure_ascii=False)
print({k:(len(v['d']),v['vb']) for k,v in res.items()})
