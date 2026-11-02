"""Automated checks for the ME0212 Study Lab.
Run: python3 build.py --test && python3 tests/run_tests.py
Needs: pip install playwright && playwright install chromium. Optional: npm i axe-core (accessibility check).
"""
import os, sys, json
from playwright.sync_api import sync_playwright
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
URL = "file://" + os.path.join(ROOT, "build/test.html")
BAD = ("NaN", "undefined", "Infinity", "[object")
EXE = os.environ.get("CHROMIUM_PATH")
AXE = next((p for p in [os.path.join(ROOT, "node_modules/axe-core/axe.min.js"), "/tmp/node_modules/axe-core/axe.min.js"] if os.path.exists(p)), None)
fails = []

def launch(p): return p.chromium.launch(executable_path=EXE) if EXE else p.chromium.launch()

def content_checks(pg):
    r = pg.evaluate('''()=>{ var ids=__X('CHAPTER_IDS'),MCQ=__X('MCQ'),GENS=__X('GENS'),CH=__X('CHAPTERS'),L=__X('LESSONS'),T=__X('TOOLS'),SIMS=__X('SIMS'),I=__X('IDEAS'),bad=[],counts={};
      ids.forEach(function(c){
        counts[c]={mcq:MCQ[c].length,gens:GENS[c].length,bank:CH[c].questions.length,lessons:L[c].length,tools:T[c].length,sims:SIMS[c].length};
        MCQ[c].forEach(function(m,i){ var o=[m.ok].concat(m.wrong); if(new Set(o).size!==4||m.wrong.length!==3||!m.why) bad.push("mcq "+c+"-"+i); });
        GENS[c].forEach(function(g){ for(var k=0;k<200;k++){ try{ var r=g.make(), s=JSON.stringify(r); if(!(typeof r.ans==="number"&&isFinite(r.ans))||/NaN|undefined|Infinity/.test(s)){ bad.push(g.id+" "+s.slice(0,160)); break; } }catch(e){ bad.push(g.id+" "+e.message); break; } } });
        CH[c].questions.forEach(function(q,i){ var f=q.fig(); if(/NaN|undefined|Infinity/.test(f)) bad.push("fig "+c+"."+i); });
        L[c].forEach(function(l){ if(!I[l.t]) bad.push("no idea for lesson "+l.t); if(l.fig&&/NaN|undefined/.test(l.fig())) bad.push("lesson fig "+l.t); });
      });
      return {bad:bad,counts:counts}; }''')
    fails.extend(r["bad"]); return r["counts"]

def ui_checks(pg, w):
    errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
    pg.goto(URL); pg.wait_for_timeout(200)
    if pg.query_selector("#nameIn"): pg.fill("#nameIn", "Test"); pg.fill("#sidIn", "20231234"); pg.click('[data-a="setname"]')
    ids = pg.evaluate('__X("CHAPTER_IDS")')
    for ch in ids:
        pg.click('[data-a="go"][data-v="dash"]'); pg.click(f'[data-a="study"][data-v="{ch}"]'); pg.wait_for_timeout(50)
        for t in ("learn", "watch", "calc"):
            pg.click(f'[data-a="tab"][data-v="{t}"]'); pg.wait_for_timeout(60)
            if t == "watch":
                n = pg.evaluate(f'__X("SIMS[\\"{ch}\\"].length")')
                for k in range(n):
                    pg.click(f'[data-sim="{k}"]'); pg.wait_for_timeout(80)
                    for sl in pg.query_selector_all("input[type=range]"):
                        for val in (sl.get_attribute("min"), sl.get_attribute("max")):
                            sl.evaluate(f'e=>{{e.value={val};e.dispatchEvent(new Event("input"))}}'); pg.wait_for_timeout(30)
                            if any(b in pg.inner_html("#simsvg") + pg.inner_text("#simout") for b in BAD): errs.append(f"sim {ch}.{k} at {val}")
            if t == "calc":
                n = pg.evaluate(f'__X("TOOLS[\\"{ch}\\"].length")')
                for k in range(n):
                    pg.click(f'[data-tool="{k}"]'); pg.wait_for_timeout(50)
                    if pg.inner_text("#cmsg") or len(pg.inner_text("#csteps")) < 20: errs.append(f"calc {ch}.{k}")
            if any(b in pg.inner_html("#ctab") for b in BAD): errs.append(f"{t} {ch}")
        pg.click(f'#page .chead [data-a="prac"]'); pg.wait_for_timeout(40); pg.click(".back"); pg.wait_for_timeout(40)
        if not pg.query_selector("nav.tabs"): errs.append(f"back from exercises did not return to study {ch}")
        pg.click(".back"); pg.click(f'[data-a="prac"][data-v="{ch}"]'); pg.wait_for_timeout(60)
        n = len(pg.query_selector_all("[data-exk]"))
        if n < 2: errs.append(f"no worked examples in exercises {ch}")
        for k in range(n):
            pg.query_selector_all("[data-exk]")[k].click(); pg.wait_for_timeout(30)
            if pg.query_selector("#exAll"): pg.click("#exAll"); pg.wait_for_timeout(30)
            if not pg.query_selector(".exans") or any(b in pg.inner_html("#exbox") for b in BAD): errs.append(f"example {ch}.{k}")
        for _ in range(6):
            if pg.query_selector("#numIn"): pg.fill("#numIn", "1"); pg.click('[data-a="check"]')
            elif pg.query_selector('[data-a="opt"]'): pg.click('[data-a="opt"]')
            elif pg.query_selector('[data-a="reveal"]'): pg.click('[data-a="reveal"]'); pg.click('[data-a="self"][data-v="1"]'); continue
            if pg.query_selector('[data-a="next"]'): pg.click('[data-a="next"]')
        pg.click(".back")
        pg.click(f'[data-a="study"][data-v="{ch}"]'); pg.click(f'[data-a="sheet"][data-v="{ch}"]'); pg.wait_for_timeout(50)
        if any(b in pg.inner_html("#page") for b in BAD) or not pg.query_selector(".sheet"): errs.append(f"sheet {ch}")
        pg.click(".back"); pg.click(f'[data-a="quizch"][data-v="{ch}"]'); pg.wait_for_timeout(50)
        if w == 1366:
            pg.click('[data-a="startquiz"]'); pg.wait_for_timeout(50)
            for _ in range(40):
                if not pg.query_selector('[data-a="qnext"]'): break
                if pg.query_selector("#numIn"): pg.fill("#numIn", "1")
                elif pg.query_selector('[data-a="opt"]'): pg.click('[data-a="opt"]')
                pg.click('[data-a="qnext"]'); pg.wait_for_timeout(40)
            try: pg.wait_for_selector(".res", timeout=3000)
            except Exception: pass
            if not pg.query_selector(".res") or any(b in pg.inner_html("#page") for b in BAD): errs.append(f"quiz {ch}: " + pg.inner_text("#page")[:200].replace("\n", " | "))
            pg.click('[data-a="go"][data-v="dash"]')
        else: pg.click(".back")
    sw, iw = pg.evaluate("document.documentElement.scrollWidth"), pg.evaluate("innerWidth")
    if sw > iw: errs.append(f"horizontal overflow {sw}>{iw}")
    fails.extend(f"[{w}px] {e}" for e in errs)

def axe_checks(pg):
    if not AXE: print("axe-core not found, accessibility check skipped"); return
    src = open(AXE).read(); pg.goto(URL); pg.wait_for_timeout(200)
    for name, act in [("dashboard", None), ("study", '[data-a="study"][data-v="8"]'), ("watch", '[data-a="tab"][data-v="watch"]'), ("calc", '[data-a="tab"][data-v="calc"]'), ("exercises", '[data-a="prac"][data-v="8"]'), ("progress", '[data-a="go"][data-v="progress"]')]:
        if act: pg.click(act); pg.wait_for_timeout(150)
        pg.add_script_tag(content=src)
        v = pg.evaluate('async()=>(await axe.run(document,{resultTypes:["violations"]})).violations.map(v=>v.id+" ("+v.nodes.length+")")')
        fails.extend(f"axe {name}: {x}" for x in v)

with sync_playwright() as p:
    b = launch(p)
    pg = b.new_page(viewport={"width": 1366, "height": 800}); pg.goto(URL); pg.wait_for_timeout(200)
    print(json.dumps(content_checks(pg)))
    for w, h in [(1366, 800), (390, 844)]: ui_checks(b.new_page(viewport={"width": w, "height": h}), w)
    axe_checks(b.new_page(viewport={"width": 1366, "height": 800}))
    b.close()
print("\n".join(fails) if fails else "All checks passed.")
sys.exit(1 if fails else 0)
