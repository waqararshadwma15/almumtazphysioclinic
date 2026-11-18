"""Build a small Jameel Noori Nastaleeq webfont containing only the glyphs the Urdu page uses.

The full font is ~10 MB because it has ~19,000 pre-built ligatures. We shape every Urdu
string on the site with HarfBuzz (the same shaper browsers use), keep only the glyphs that
come out, and drop the rest (no layout closure).

Run again whenever Urdu text in lib/i18n.ts or app/ur/page.tsx changes:
  pip install fonttools brotli uharfbuzz
  python3 tools/urdu_font.py "<path to Jameel Noori Nastaleeq Regular.ttf>"
"""
import re, sys, pathlib
import uharfbuzz as hb
from fontTools import subset
from fontTools.ttLib import TTFont

root = pathlib.Path(__file__).resolve().parent.parent
src = sys.argv[1]
out = root / "app" / "fonts" / "jnn-subset.woff2"
sources = [root / "lib" / "i18n.ts", root / "app" / "ur" / "page.tsx", root / "components" / "HomeView.tsx"]

text = "\n".join(p.read_text(encoding="utf-8") for p in sources)
# Every string literal / JSX text that contains Arabic-script letters.
runs = set()
for lit in re.findall(r'"([^"\n]*)"|`([^`]*)`|>([^<>{}\n]+)<', text):
    s = next((x for x in lit if x), "")
    if re.search(r"[؀-ۿ]", s):
        runs.add(s)
# Also every word on its own (browsers may break runs at spaces, bidi or font boundaries).
for s in list(runs):
    runs.update(w for w in re.split(r"[\s()،۔]+", s) if w)
digits = "۰۱۲۳۴۵۶۷۸۹"
runs.update(digits)
runs.update(digits[a] + digits[b] for a in range(10) for b in range(10))  # count-up numbers
runs.update(list("،؛؟۔() -–/:!.,"))

blob = hb.Blob.from_file_path(src)
font = hb.Font(hb.Face(blob))
gids = set()
for s in runs:
    buf = hb.Buffer(); buf.add_str(s); buf.guess_segment_properties()
    # Record the glyphs after every lookup too: this font builds ligatures in several
    # steps, and the in-between glyphs must stay for the final ones to form.
    def trace(_msg, buf=buf):
        gids.update(i.codepoint for i in buf.glyph_infos)
        return True
    buf.set_message_func(trace)
    hb.shape(font, buf, {})
    gids.update(i.codepoint for i in buf.glyph_infos)

chars = "".join(sorted(set("".join(runs))))
opts = subset.Options()
opts.layout_features = ["*"]
opts.layout_closure = False      # keep only the glyphs we traced, not every reachable ligature
opts.hinting = False
opts.notdef_outline = True
opts.name_IDs = ["*"]            # keep the font's own name and notice
opts.flavor = "woff2"
f = subset.load_font(src, opts)
s = subset.Subsetter(opts)
s.populate(gids=sorted(gids), text=chars)
s.subset(f)
out.parent.mkdir(parents=True, exist_ok=True)
subset.save_font(f, str(out), opts)
print(f"{len(runs)} strings, {len(gids)} glyphs -> {out.relative_to(root)} ({out.stat().st_size/1024:.0f} KB)")
