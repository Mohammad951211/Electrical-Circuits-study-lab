"""Automated checks for Circuit Hub (ME0212).
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
      var DONE=["1","2","3","4","5","6","8","9","11","M"];  /* chapters whose per-topic content is complete: 3 examples, 10 practice, 5 quiz items per topic */
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
    fails.extend(r["bad"])
    # drawings: every worked-example figure, random-question figure and quiz figure must be well formed
    r2 = pg.evaluate("""()=>{ var bad=[],E=__X('EXFIG'),F=__X('GENFIG'),G=__X('GENS'),M=__X('MCQ'),Q=function(q){return __X('MQ')(q)||__X('MQ2')(q)},ex=__X('EXAMPLES'),nm=0,ne=0;
      Object.keys(E).forEach(function(k){ var f=E[k](); if(!/<svg/.test(f)||/NaN|undefined|null/.test(f)) bad.push("example figure "+k); });
      Object.keys(ex).forEach(function(c){ ex[c].forEach(function(e){ if(E[c+"|"+e.id]){ ne++; if(!e.fig) bad.push("figure not attached "+c+" "+e.id); } }); });
      Object.keys(G).forEach(function(c){ G[c].forEach(function(g){ if(!F[g.id]) return; for(var k=0;k<150;k++){ var r=g.make(); if(!r.fig||/NaN|undefined|null/.test(r.fig)){ bad.push("generator figure "+g.id); break; } } }); });
      Object.keys(M).forEach(function(c){ M[c].forEach(function(m,i){ var f=Q(m.q); if(f){ nm++; if(!/<svg/.test(f)||/NaN|undefined|null/.test(f)) bad.push("quiz figure "+c+"-"+i); } }); });
      return {bad:bad,nm:nm,ne:ne}; }""")
    fails.extend(r2["bad"]); print("drawings: examples", r2["ne"], "quiz questions", r2["nm"])
    return r["counts"]

def ui_checks(pg, w):
    errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
    pg.goto(URL); pg.wait_for_timeout(200)
    # first visit: the entry screen, optional fields, then the chapter list
    if not pg.query_selector(".welcome") or "Circuit Hub" not in pg.inner_text(".welcome"): fails.append("entry screen missing")
    if not pg.query_selector("#regIn") or pg.is_checked("#regIn"): fails.append("class-list box missing or ticked on the entry screen")
    if pg.is_visible("#nav"): fails.append("menu visible on the entry screen")
    pg.evaluate("()=>{window.__gc=[];window.goatcounter={count:function(o){window.__gc.push(o.path)}}}")
    pg.fill("#sidIn", "12"); pg.click('[data-a="start"]')
    if not pg.inner_text("#idmsg"): fails.append("short ID was accepted")
    pg.fill("#sidIn", ""); pg.click('[data-a="start"]'); pg.wait_for_timeout(50)
    if pg.query_selector(".welcome") or not pg.query_selector(".chgrid"): fails.append("Start without details did not open the chapters")
    if "start" not in pg.evaluate("window.__gc"): fails.append("start event not counted")
    pg.click('[data-a="study"][data-v="1"][data-t="study"]'); pg.wait_for_timeout(50)
    if "/ch1/study" not in pg.evaluate("window.__gc"): fails.append("chapter view not counted")
    pg.click('[data-a="go"][data-v="dash"]')
    pg.reload(); pg.wait_for_timeout(150)
    if pg.query_selector(".welcome"): fails.append("entry screen shown again after Start")
    def edit(): pg.click('[data-a="go"][data-v="progress"]'); pg.click('.idcard [data-a="editid"]'); pg.wait_for_timeout(30)
    edit(); pg.fill("#nameIn", "Test"); pg.fill("#sidIn", "20231234"); pg.click('[data-a="start"]'); pg.wait_for_timeout(50)
    if pg.evaluate('__X("STORE.name")') != "Test" or pg.evaluate('__X("STORE.sid")') != "20231234": fails.append("name and ID were not saved")
    # class list: send only when the box is ticked
    sent = []
    pg.route("https://forms.example.test/**", lambda route: (sent.append(route.request.post_data), route.fulfill(status=200, body="ok")))
    pg.evaluate("()=>{var r=__X('REG'); r.form='https://forms.example.test/forms/d/e/ABC/viewform'; r.eName='entry.11'; r.eSid='entry.22';}")
    edit()
    if not pg.query_selector("#regIn") or pg.is_checked("#regIn"): fails.append("class-list box missing or ticked by default")
    pg.click('[data-a="start"]'); pg.wait_for_timeout(200)
    if sent: fails.append("data sent without consent")
    edit(); pg.check("#regIn"); pg.click('[data-a="start"]'); pg.wait_for_timeout(300)
    if len(sent) != 1 or "entry.11=Test" not in sent[0] or "entry.22=20231234" not in sent[0]: fails.append(f"class list request wrong: {sent}")
    edit()
    if pg.query_selector("#regIn"): fails.append("box shown again after joining")
    pg.click('[data-a="canceledit"]')
    ids = pg.evaluate('__X("CHAPTER_IDS")')
    # Back must return to the previous page and tab, step by step
    pg.click('[data-a="study"][data-v="2"][data-t="study"]'); pg.click('[data-a="mtab"][data-v="practice"]'); pg.click('[data-a="mtab"][data-v="quiz"]')
    pg.click(".back")
    if pg.evaluate('__X("S.tab")') != "practice": errs.append("back did not return to the Practice tab")
    pg.click(".back")
    if pg.evaluate('__X("S.tab")') != "study": errs.append("back did not return to the Study tab")
    pg.click(".back")
    if pg.evaluate('__X("S.page")') != "dash": errs.append("back did not end on the chapter list")
    done = ("1", "2", "3", "4", "5", "6", "8", "9", "11", "M")
    for ch in ids:
        pg.click('[data-a="go"][data-v="dash"]'); pg.click(f'[data-a="study"][data-v="{ch}"][data-t="study"]'); pg.wait_for_timeout(50)
        nt = pg.evaluate(f'__X("LESSONS[\\"{ch}\\"].length")')
        if len(pg.query_selector_all(".lesson")) != 1 or len(pg.query_selector_all(".topicbar [data-a=topic]")) != nt or pg.query_selector(".topics") or pg.query_selector(".tabs.sub"): errs.append(f"study layout {ch}")
        if not pg.query_selector('.topicfoot [data-a="tstep"][data-v="1"]') and ch != ids[-1]: errs.append(f"next topic button missing {ch}")
        if pg.query_selector('[data-a="mtab"][data-v="examples"]'): errs.append(f"examples tab still present {ch}")
        if any(b in pg.inner_html("#ctab") for b in BAD): errs.append(f"study {ch}")
        for k in range(nt):
            if k:
                pg.click('.topicfoot [data-a="tstep"][data-v="1"]'); pg.wait_for_timeout(40)
                if pg.evaluate('__X("S.ti")') != k or len(pg.query_selector_all(".lesson")) != 1: errs.append(f"next topic {ch} {k}")
            w = pg.evaluate(f'(()=>{{var i=__X("IDEAS")[__X("LESSONS[\\"{ch}\\"][{k}].t")];return i&&i.w!=null}})()')
            has = pg.query_selector(f'[data-les="{k}"]') is not None
            if w != has: errs.append(f"Watch button rule {ch} topic {k}")
            if has:
                pg.click(f'[data-les="{k}"]'); pg.wait_for_timeout(80)
                if not pg.query_selector(f"#wp{k} #simsvg"): errs.append(f"Watch panel {ch} topic {k}")
                if pg.query_selector(f"#wp{k} .simpick"): errs.append(f"sim chips shown {ch} topic {k}")
                for sl in pg.query_selector_all(f"#wp{k} input[type=range]"):
                    for val in (sl.get_attribute("min"), sl.get_attribute("max")):
                        sl.evaluate(f'e=>{{e.value={val};e.dispatchEvent(new Event("input"))}}'); pg.wait_for_timeout(30)
                        if any(b in pg.inner_html("#simsvg") + pg.inner_text("#simout") for b in BAD): errs.append(f"sim {ch} topic {k} at {val}")
                pg.click(f'[data-les="{k}"]'); pg.wait_for_timeout(30)
                if pg.query_selector(f"#wp{k} #simsvg"): errs.append(f"Watch panel did not close {ch} {k}")
            # examples inside the topic
            if pg.query_selector(f'[data-exb="{k}"]') is None:
                if ch in done: errs.append(f"Examples button missing {ch} topic {k}")
            else:
                pg.click(f'[data-exb="{k}"]'); pg.wait_for_timeout(40)
                n = len(pg.query_selector_all(f"#ep{k} [data-exk]:not(.gen)"))
                if ch in done and n < 3: errs.append(f"examples {ch} topic {k}: {n}")
                for j in range(n):
                    pg.query_selector_all(f"#ep{k} [data-exk]:not(.gen)")[j].click(); pg.wait_for_timeout(20)
                    if pg.query_selector(f"#ep{k} #exAll"): pg.click(f"#ep{k} #exAll"); pg.wait_for_timeout(20)
                    if not pg.query_selector(f"#ep{k} .exans") or any(b in pg.inner_html(f"#ep{k}") for b in BAD): errs.append(f"example {ch}.{k}.{j}")
                pg.click(f'[data-exb="{k}"]'); pg.wait_for_timeout(20)
        pg.click(".calcwrap summary"); pg.wait_for_timeout(60)
        n = pg.evaluate(f'__X("TOOLS[\\"{ch}\\"].length")')
        for k in range(n):
            pg.click(f'[data-tool="{k}"]'); pg.wait_for_timeout(50)
            if pg.inner_text("#cmsg") or len(pg.inner_text("#csteps")) < 20: errs.append(f"calc {ch}.{k}")
        # practice
        pg.click('[data-a="mtab"][data-v="practice"]'); pg.wait_for_timeout(40)
        if pg.query_selector(".topics"): errs.append(f"topic pills in practice {ch}")
        for _ in range(6):
            if pg.query_selector("#numIn"): pg.fill("#numIn", "1"); pg.click('[data-a="check"]')
            elif pg.query_selector('[data-a="opt"]'): pg.click('[data-a="opt"]')
            elif pg.query_selector('[data-a="reveal"]'): pg.click('[data-a="reveal"]'); pg.click('[data-a="self"][data-v="1"]'); continue
            if pg.query_selector('[data-a="next"]'): pg.click('[data-a="next"]')
        if any(b in pg.inner_html("#ctab") for b in BAD): errs.append(f"practice {ch}")
        pg.click('[data-a="go"][data-v="dash"]')
        pg.click(f'[data-a="study"][data-v="{ch}"][data-t="study"]'); pg.click(f'[data-a="sheet"][data-v="{ch}"]'); pg.wait_for_timeout(50)
        if any(b in pg.inner_html("#page") for b in BAD) or not pg.query_selector(".sheet"): errs.append(f"sheet {ch}")
        pg.click('[data-a="go"][data-v="dash"]'); pg.click(f'[data-a="study"][data-v="{ch}"][data-t="quiz"]'); pg.wait_for_timeout(50)
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
        else: pg.click('[data-a="go"][data-v="dash"]')
    sw, iw = pg.evaluate("document.documentElement.scrollWidth"), pg.evaluate("innerWidth")
    if sw > iw: errs.append(f"horizontal overflow {sw}>{iw}")
    fails.extend(f"[{w}px] {e}" for e in errs)

def axe_checks(pg):
    if not AXE: print("axe-core not found, accessibility check skipped"); return
    src = open(AXE).read(); pg.goto(URL); pg.wait_for_timeout(200)
    for name, act in [("entry screen", None), ("dashboard", '[data-a="start"]'), ("study", '[data-a="study"][data-v="8"][data-t="study"]'), ("watch", '[data-les="0"]'), ("examples", '[data-exb="0"]'), ("calc", '.calcwrap summary'), ("practice", '[data-a="mtab"][data-v="practice"]'), ("quiz", '[data-a="mtab"][data-v="quiz"]'), ("progress", '[data-a="go"][data-v="progress"]')]:
        if act: pg.click(act); pg.mouse.move(5, 5); pg.wait_for_timeout(500)
        pg.add_script_tag(content=src)
        v = pg.evaluate('async()=>(await axe.run(document,{resultTypes:["violations"]})).violations.map(v=>v.id+" ("+v.nodes.length+")")')
        fails.extend(f"axe {name}: {x}" for x in v)

def calc_checks(pg):
    pg.goto(URL); pg.wait_for_timeout(200); pg.click('[data-a="start"]'); pg.wait_for_timeout(100)
    pg.evaluate("localStorage.setItem('x','1')")
    pg.click('[data-a="study"][data-v="1"][data-t="study"]'); pg.wait_for_timeout(200)
    pg.click('[data-a="fx"]')
    for k in ["1", "2", "add", "3", "eq"]: pg.click(f'#fxwin [data-k="{k}"]')
    if "15" not in pg.inner_text("#fxlcd"): fails.append("calc 12+3 failed")
    for k in ["ac", "menu", "8", "eq", "2", "eq", "1", "eq", "5", "eq", "1", "eq", "sub", "1", "eq", "1", "eq"]: pg.click(f'#fxwin [data-k="{k}"]')
    if "X = 2" not in pg.inner_text("#fxlcd"): fails.append("calc EQN failed")
    def fxk(*keys):
        for k in keys:
            if k.startswith("S:"): pg.click('#fxwin [data-k="shift"]'); k = k[2:]
            elif k.startswith("A:"): pg.click('#fxwin [data-k="alpha"]'); k = k[2:]
            pg.click(f'#fxwin [data-k="{k}"]')
        return pg.inner_text("#fxlcd").replace(chr(10), " | ")
    def fxexpect(name, got, want):
        if want not in got: fails.append(f"calc {name}: wanted {want!r}, got {got!r}")
    fxk("ac", "ac", "ac", "ac", "menu", "1")
    fxk("ac"); fxexpect("integral", fxk("integ", "A:rp", "sq", "S:rp", "0", "S:rp", "3", "rp", "eq"), "| 9")
    fxk("ac"); fxexpect("derivative", fxk("S:integ", "A:rp", "S:sq", "S:rp", "2", "rp", "eq"), "| 12")
    fxk("ac"); fxk("A:rp", "sq", "add", "1", "calc"); fxexpect("CALC", fxk("3", "eq"), "| 10")
    fxk("ac"); fxk("A:rp", "sq", "sub", "4", "A:calc", "0", "S:calc"); fxexpect("SOLVE", fxk("1", "eq"), "X = 2")
    fxk("ac", "ac", "menu", "3", "pow", "1", "A:neg", "add", "5", "eq"); fxexpect("hex", pg.inner_text("#fxlcd"), "1F")
    fxexpect("bin", fxk("log"), "1 1111"); fxexpect("dec", fxk("sq"), "31"); fxk("ac", "ac", "menu", "1")
    fxk("ac", "menu", "5", "eq", "eq", "1", "eq", "2", "eq", "3", "eq", "ac", "menu", "5", "2", "eq", "4", "eq", "5", "eq", "6", "eq", "ac")
    fxk("S:5", "7", "S:5", "4", "S:rp", "S:5", "5", "rp"); fxexpect("dot product", fxk("eq"), "| 32")
    fxk("ac"); fxk("S:5", "4", "mul", "S:5", "5"); fxexpect("cross product", fxk("eq"), "−3")
    fxk("ac", "menu", "6", "2", "1", "eq", "2", "eq", "3", "eq", "4", "eq", "up", "up", "up", "up", "right", "2", "eq", "4", "eq", "6", "eq", "8", "eq", "ac", "optn", "4")
    fxexpect("regression a", pg.inner_text("#fxlcd"), "a = 0"); fxexpect("regression b", fxk("down"), "b = 2")
    fxk("ac", "ac", "menu", "7", "A:rp", "sq", "eq", "1", "eq", "3", "eq", "1", "eq"); fxexpect("table", pg.inner_text("#fxlcd").replace(chr(10), " | "), "3" + chr(9) + "9")
    fxk("ac", "ac", "menu", "1")
    pg.click('#fxwin [data-fxc="close"]')
    if pg.is_visible("#fxwin"): fails.append("calc did not close")

with sync_playwright() as p:
    b = launch(p)
    pg = b.new_page(viewport={"width": 1366, "height": 800}); pg.goto(URL); pg.wait_for_timeout(200)
    print(json.dumps(content_checks(pg)))
    for w, h in [(1366, 800), (390, 844)]: ui_checks(b.new_page(viewport={"width": w, "height": h}), w)
    calc_checks(b.new_page(viewport={"width": 1366, "height": 800}))
    axe_checks(b.new_page(viewport={"width": 1366, "height": 800}))
    b.close()
print("\n".join(fails) if fails else "All checks passed.")
sys.exit(1 if fails else 0)
