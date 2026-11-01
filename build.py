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
CONTENT = ["src/content.js", "src/content5689.js", "src/content11.js", "src/examples.js"]
WATCH   = ["src/watch.js", "src/watch5689.js", "src/watch11.js"]
IDEAS   = ["src/ideas.js", "src/ideas5689.js", "src/ideas11.js", "src/refs.js", "src/refs11.js"]
MCQ     = ["src/mcq1.js", "src/mcq2.js", "src/mcq3.js", "src/mcq4.js", "src/mcq5689.js", "src/mcq5689b.js", "src/mcq11.js"]
GENS    = ["src/gens.js", "src/gens5689.js", "src/gens11.js"]
FONTS = [("Plex Cond", 600, "ibm-plex-sans-condensed-latin-600-normal.woff2"), ("Plex Cond", 700, "ibm-plex-sans-condensed-latin-700-normal.woff2"),
         ("Atkinson Hyperlegible", 400, "atkinson-hyperlegible-latin-400-normal.woff2"), ("Atkinson Hyperlegible", 700, "atkinson-hyperlegible-latin-700-normal.woff2"),
         ("JB Mono", 400, "jetbrains-mono-latin-400-normal.woff2"), ("JB Mono", 700, "jetbrains-mono-latin-700-normal.woff2")]

def cat(files): return "\n".join(rd(f) for f in files if os.path.exists(os.path.join(ROOT, f)))

def build(test=False):
    version = rd("VERSION").strip()
    lab = rd("src/lab.js").replace("//@@MCQ@@", cat(MCQ)).replace("//@@GENS@@", cat(GENS))
    js = "\n".join([cat(FIGS), cat(CONTENT), cat(WATCH), cat(IDEAS), lab])
    fonts = "".join('@font-face{font-family:"%s";font-weight:%s;font-style:normal;font-display:swap;src:url(data:font/woff2;base64,%s) format("woff2")}\n' % (f, w, b64("assets/fonts/" + n)) for f, w, n in FONTS)
    css = fonts + rd("src/lab.css").replace("@@BACKDROP@@", "data:image/jpeg;base64," + b64("assets/gju-backdrop.jpg"))
    out = rd("src/template.html").replace("/*@@CSS@@*/", css).replace("@@LOGO@@", "data:image/jpeg;base64," + b64("assets/gju-logo.jpg"))
    out = out.replace("@@VERSION@@", version).replace("@@DATE@@", datetime.date.today().isoformat()).replace("//@@JS@@", js)
    if test: out = out.replace("(function(){\n", "(function(){ window.__X=function(n){return eval(n)};\n", 1)
    dst = os.path.join(ROOT, "build/test.html" if test else "index.html")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    open(dst, "w", encoding="utf-8").write(out)
    print(dst, len(out), "bytes, version", version)

if __name__ == "__main__":
    build("--test" in sys.argv)
