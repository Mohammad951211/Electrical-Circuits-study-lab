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
        MCQ[c].forEach(function(m,i){ var o=[m.ok].concat(m.wrong); if(new Set(o).size!==4||m.wrong.length!==3||!m.why) bad.push("mcq "+c+"-"+i); if(String(m.why).split("\\n").length<3) bad.push("mcq without steps "+c+"-"+i); });
        CH[c].questions.forEach(function(q,i){ if(String(q.a).split("\\n").length<3) bad.push("bank answer without steps "+c+"-"+i); });
        (__X('EXAMPLES')[c]||[]).forEach(function(e){ if((!/^X\\d+$/.test(e.id) && !/^Idea:/.test(e.steps[0]))||e.steps.length<3) bad.push("example without idea "+c+" "+e.id); });
        GENS[c].forEach(function(g){ for(var k=0;k<200;k++){ try{ var r=g.make(), s=JSON.stringify(r); if(String(r.sol).split("\\n").length<3){ bad.push("generator without steps "+g.id); break; } if(!(typeof r.ans==="number"&&isFinite(r.ans))||/NaN|undefined|Infinity/.test(s)){ bad.push(g.id+" "+s.slice(0,160)); break; } }catch(e){ bad.push(g.id+" "+e.message); break; } } });
        CH[c].questions.forEach(function(q,i){ var f=q.fig(); if(/NaN|undefined|Infinity/.test(f)) bad.push("fig "+c+"."+i); });
        L[c].forEach(function(l){ if(!I[l.t]) bad.push("no idea for lesson "+l.t); if(l.fig&&/NaN|undefined/.test(l.fig())) bad.push("lesson fig "+l.t); });
      });
      var DONE=["1","2","3","4","5","6","M"];  /* chapters whose per-topic content is complete: 3 examples, 10 practice, 5 quiz items per topic */
      if(__X('TOPICMAP.unmapped.length')!==0) bad.push("unmapped topics");
      __X('CHAPTER_IDS').forEach(function(c){ __X('LESSONS["'+c+'"]').forEach(function(l){
        var ex=__X('EXAMPLES["'+c+'"]').filter(function(e){return e.topic===l.t;}).length;
        var pr=__X('POOL["'+c+'"]').filter(function(d){return d.topic===l.t;});
        var qz=pr.filter(function(d){return d.kind!=="bank";}).length;
        if(DONE.indexOf(c)>=0 && ex<3) bad.push("examples "+c+" "+l.t+": "+ex);
        if(DONE.indexOf(c)>=0 && pr.length<10) bad.push("practice "+c+" "+l.t+": "+pr.length);
        if(DONE.indexOf(c)>=0 && qz<5) bad.push("quiz pool "+c+" "+l.t+": "+qz); }); });
      if(__X('WHYBAD')!==0) bad.push("WHY mismatch "+__X('WHYBAD'));
      return {bad:bad,counts:counts}; }''')
    fails.extend(r["bad"]); return r["counts"]

def ui_checks(pg, w):
    errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
    pg.goto(URL); pg.wait_for_timeout(200)
    if pg.query_selector("#nameIn"): pg.fill("#nameIn", "Test"); pg.fill("#sidIn", "20231234"); pg.click('[data-a="setname"]')
    ids = pg.evaluate('__X("CHAPTER_IDS")')
    # Back must return to the previous page and tab, step by step
    pg.click('[data-a="study"][data-v="2"][data-t="study"]'); pg.click('[data-a="mtab"][data-v="examples"]'); pg.click('[data-a="mtab"][data-v="practice"]')
    pg.click(".back")
    if pg.evaluate('__X("S.tab")') != "examples": errs.append("back did not return to the Examples tab")
    pg.click(".back")
    if pg.evaluate('__X("S.tab")') != "study": errs.append("back did not return to the Study tab")
    pg.click('[data-a="topic"][data-v="2"]'); pg.click(".back")
    if pg.evaluate('__X("S.ti")') != 0: errs.append("back did not return to the previous topic")
    pg.click(".back")
    if pg.evaluate('__X("S.page")') != "dash": errs.append("back did not end on the chapter list")
    done = ("1", "2", "3", "4", "5", "6", "M")
    for ch in ids:
        pg.click('[data-a="go"][data-v="dash"]'); pg.click(f'[data-a="study"][data-v="{ch}"][data-t="study"]'); pg.wait_for_timeout(50)
        nt = pg.evaluate(f'__X("LESSONS[\\"{ch}\\"].length")')
        for k in range(nt):
            pg.click(f'[data-a="topic"][data-v="{k}"]'); pg.wait_for_timeout(30)
            if not pg.query_selector(".lesson") or not pg.query_selector("[data-watch]") or any(b in pg.inner_html("#ctab") for b in BAD): errs.append(f"study {ch} topic {k}")
        pg.click('[data-watch]'); pg.wait_for_timeout(60)
        if pg.evaluate('__X("S.view")') != "watch": errs.append(f"Watch button {ch}")
        n = pg.evaluate(f'__X("SIMS[\\"{ch}\\"].length")')
        for k in range(n):
            pg.click(f'[data-sim="{k}"]'); pg.wait_for_timeout(80)
            for sl in pg.query_selector_all("input[type=range]"):
                for val in (sl.get_attribute("min"), sl.get_attribute("max")):
                    sl.evaluate(f'e=>{{e.value={val};e.dispatchEvent(new Event("input"))}}'); pg.wait_for_timeout(30)
                    if any(b in pg.inner_html("#simsvg") + pg.inner_text("#simout") for b in BAD): errs.append(f"sim {ch}.{k} at {val}")
        pg.click('[data-a="view"][data-v="calc"]'); pg.wait_for_timeout(60)
        n = pg.evaluate(f'__X("TOOLS[\\"{ch}\\"].length")')
        for k in range(n):
            pg.click(f'[data-tool="{k}"]'); pg.wait_for_timeout(50)
            if pg.inner_text("#cmsg") or len(pg.inner_text("#csteps")) < 20: errs.append(f"calc {ch}.{k}")
        # examples, topic by topic
        pg.click('[data-a="mtab"][data-v="examples"]'); pg.wait_for_timeout(40)
        for k in range(nt):
            pg.click(f'[data-a="topic"][data-v="{k}"]'); pg.wait_for_timeout(30)
            n = len(pg.query_selector_all("[data-exk]:not(.gen)"))
            if ch in done and n < 3: errs.append(f"examples {ch} topic {k}: {n}")
            for j in range(n):
                pg.query_selector_all("[data-exk]:not(.gen)")[j].click(); pg.wait_for_timeout(20)
                if pg.query_selector("#exAll"): pg.click("#exAll"); pg.wait_for_timeout(20)
                if not pg.query_selector(".exans") or any(b in pg.inner_html("#exbox") for b in BAD): errs.append(f"example {ch}.{k}.{j}")
        # practice
        pg.click('[data-a="mtab"][data-v="practice"]'); pg.wait_for_timeout(40)
        for k in range(nt):
            pg.click(f'[data-a="topic"][data-v="{k}"]'); pg.wait_for_timeout(30)
            for _ in range(3):
                if pg.query_selector("#numIn"): pg.fill("#numIn", "1"); pg.click('[data-a="check"]')
                elif pg.query_selector('[data-a="opt"]'): pg.click('[data-a="opt"]')
                elif pg.query_selector('[data-a="reveal"]'): pg.click('[data-a="reveal"]'); pg.click('[data-a="self"][data-v="1"]'); continue
                if pg.query_selector('[data-a="next"]'): pg.click('[data-a="next"]')
            if any(b in pg.inner_html("#ctab") for b in BAD): errs.append(f"practice {ch} topic {k}")
        pg.click('[data-a="go"][data-v="dash"]')
        pg.click(f'[data-a="study"][data-v="{ch}"][data-t="study"]'); pg.click(f'[data-a="sheet"][data-v="{ch}"]'); pg.wait_for_timeout(50)
        if any(b in pg.inner_html("#page") for b in BAD) or not pg.query_selector(".sheet"): errs.append(f"sheet {ch}")
        pg.click('[data-a="go"][data-v="dash"]'); pg.click(f'[data-a="study"][data-v="{ch}"][data-t="quiz"]'); pg.wait_for_timeout(50)
        if w == 1366:
            pg.click('[data-a="topic"][data-v="0"]'); pg.click('[data-a="startquiz"]'); pg.wait_for_timeout(50)
            for _ in range(40):
                if not pg.query_selector('[data-a="qnext"]'): break
                if pg.query_selector("#numIn"): pg.fill("#numIn", "1")
                elif pg.query_selector('[data-a="opt"]'): pg.click('[data-a="opt"]')
                pg.click('[data-a="qnext"]'); pg.wait_for_timeout(40)
            try: pg.wait_for_selector(".res", timeout=3000)
            except Exception: pass
            if not pg.query_selector(".res") or any(b in pg.inner_html("#page") for b in BAD): errs.append(f"quiz {ch}: " + pg.inner_text("#page")[:200].replace("\n", " | "))
            pg.click('[data-a="go"][data-v="dash"]')
        else: pg.click('[data-a="go"][data-v="dash"]')
    sw, iw = pg.evaluate("document.documentElement.scrollWidth"), pg.evaluate("innerWidth")
    if sw > iw: errs.append(f"horizontal overflow {sw}>{iw}")
    fails.extend(f"[{w}px] {e}" for e in errs)

def axe_checks(pg):
    if not AXE: print("axe-core not found, accessibility check skipped"); return
    src = open(AXE).read(); pg.goto(URL); pg.wait_for_timeout(200)
    for name, act in [("dashboard", None), ("study", '[data-a="study"][data-v="8"][data-t="study"]'), ("watch", '[data-a="view"][data-v="watch"]'), ("calc", '[data-a="view"][data-v="calc"]'), ("examples", '[data-a="mtab"][data-v="examples"]'), ("practice", '[data-a="mtab"][data-v="practice"]'), ("quiz", '[data-a="mtab"][data-v="quiz"]'), ("progress", '[data-a="go"][data-v="progress"]')]:
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
