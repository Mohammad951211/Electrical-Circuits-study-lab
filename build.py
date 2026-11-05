"""Build the single-file site index.html from src/ and assets/.
Usage: python3 build.py            -> index.html
       python3 build.py --test     -> build/test.html (exposes window.__X for the tests)
"""
import base64, os, sys, datetime
ROOT = os.path.dirname(os.path.abspath(__file__))
def rd(p): return open(os.path.join(ROOT, p), encoding="utf-8").read()
def b64(p): return base64.b64encode(open(os.path.join(ROOT, p), "rb").read()).decode()

# Order matters: one shared scope. Figures, then content, then animations, then ideas, then the platform.
FIGS    = ["src/fig-lib.js", "src/fig-data.js", "src/figs5689.js", "src/figs11.js"]
CONTENT = ["src/content.js", "src/content5689.js", "src/content11.js", "src/examples.js", "src/examples2.js", "src/exidea.js", "src/examples3.js"]
WATCH   = ["src/watch.js", "src/watch5689.js", "src/watch11.js"]
IDEAS   = ["src/ideas.js", "src/ideas5689.js", "src/ideas11.js", "src/refs.js", "src/refs11.js"]
MCQ     = ["src/mcq1.js", "src/mcq2.js", "src/mcq3.js", "src/mcq4.js", "src/mcq5689.js", "src/mcq5689b.js", "src/mcq11.js", "src/mcqx.js"]
GENS    = ["src/fxcalc.js", "src/fxmodes.js", "src/fxui.js", "src/gens.js", "src/gens5689.js", "src/gens11.js", "src/gidea.js", "src/topics.js", "src/exfigs.js", "src/mcqfigs.js", "src/mcqfigs2.js"]
FONTS = [("Plex Cond", 600, "ibm-plex-sans-condensed-latin-600-normal.woff2"), ("Plex Cond", 700, "ibm-plex-sans-condensed-latin-700-normal.woff2"),
         ("Atkinson Hyperlegible", 400, "atkinson-hyperlegible-latin-400-normal.woff2"), ("Atkinson Hyperlegible", 700, "atkinson-hyperlegible-latin-700-normal.woff2"),
         ("JB Mono", 400, "jetbrains-mono-latin-400-normal.woff2"), ("JB Mono", 700, "jetbrains-mono-latin-700-normal.woff2")]

def why_js():
    d = os.path.join(ROOT, "src/why")
    if not os.path.isdir(d): return ""
    rows = []
    for fn in sorted(os.listdir(d)):
        if not fn.endswith(".txt"): continue
        ch = fn[:-4]; kind = "mcq"
        if ch.startswith("b"): ch = ch[1:]; kind = "bank"
        for ln in rd("src/why/" + fn).splitlines():
            if not ln.strip(): continue
            i, pre, txt = ln.split("|", 2)
            rows.append([ch, int(i), pre, txt.replace("\\n", "\n"), kind])
    import json
    return ("var WHYBAD = 0; (function(){ var R = " + json.dumps(rows, ensure_ascii=False) +
            "; R.forEach(function(r){ if (r[4] === 'bank'){ var bq = ((CHAPTERS[r[0]] || {}).questions || [])[r[1]]; if (bq && bq.q.indexOf(r[2]) === 0) bq.a = r[3]; else WHYBAD++; return; } var m = (MCQ[r[0]] || [])[r[1]]; if (m && m.q.indexOf(r[2]) === 0) m.why = r[3]; else WHYBAD++; }); })();\n")

def cat(files): return "\n".join(rd(f) for f in files if os.path.exists(os.path.join(ROOT, f)))

def build(test=False):
    version = rd("VERSION").strip()
    lab = rd("src/lab.js").replace("//@@MCQ@@", cat(MCQ) + "\n" + why_js()).replace("//@@GENS@@", cat(GENS))
    js = "\n".join([cat(FIGS), cat(CONTENT), cat(WATCH), cat(IDEAS), lab])
    fonts = "".join('@font-face{font-family:"%s";font-weight:%s;font-style:normal;font-display:swap;src:url(data:font/woff2;base64,%s) format("woff2")}\n' % (f, w, b64("assets/fonts/" + n)) for f, w, n in FONTS)
    css = fonts + rd("src/lab.css").replace("@@BACKDROP@@", "data:image/jpeg;base64," + b64("assets/gju-backdrop.jpg"))
    out = rd("src/template.html").replace("/*@@CSS@@*/", css).replace("@@LOGO@@", "data:image/webp;base64," + b64("assets/gju-logo.webp")).replace("@@SATS@@", "data:image/png;base64," + b64("assets/sats-logo.png"))
    out = out.replace("@@VERSION@@", version).replace("@@DATE@@", datetime.date.today().isoformat()).replace("//@@JS@@", js.replace("@@VERSION@@", version))
    if test: out = out.replace("(function(){\n", "(function(){ window.__X=function(n){return eval(n)};\n", 1)
    dst = os.path.join(ROOT, "build/test.html" if test else "index.html")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    open(dst, "w", encoding="utf-8").write(out)
    print(dst, len(out), "bytes, version", version)

if __name__ == "__main__":
    build("--test" in sys.argv)
