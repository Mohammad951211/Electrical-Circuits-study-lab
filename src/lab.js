// ================= platform =================
var APP_VERSION = "@@VERSION@@";
function chL(c){ return c === "M" ? "Motors" : "Chapter " + c; }
var CH_NAMES = { "1": "Basic Concepts", "2": "Basic Laws", "3": "Series–Parallel", "4": "DC Analysis Methods", "5": "Network Theorems", "6": "Capacitors & Inductors", "8": "AC Fundamentals", "9": "AC Analysis", "11": "Transformers", "M": "Electric Motors" };
var MCQ = {}; function M(topic, q, ok, wrong, why){ return { topic: topic, q: q, ok: ok, wrong: wrong, why: why }; }
//@@MCQ@@
//@@GENS@@
var S = { page: "dash", ch: "1", tab: "learn" }; var CALC = {};
var PR = { ch: "all", topic: "all", type: "mixed", q: null, done: false, ses: { n: 0, r: 0 }, last: null };
var QZ = null;

// ---------- store (this device only) ----------
var STORE = { name: "", a: {}, t: {}, quizzes: [], days: [], seen: 0, help: 1 };
var memOnly = false;
function loadStore(){ try { var o = JSON.parse(localStorage.getItem("me0212-lab-v2") || "null"); if (o) for (var k in STORE) if (o[k] != null) STORE[k] = o[k]; } catch (e) { memOnly = true; } }
function saveStore(){ try { localStorage.setItem("me0212-lab-v2", JSON.stringify(STORE)); } catch (e) { memOnly = true; } }
function today(){ var d = new Date(); return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
function record(d, correct){
  var a = STORE.a[d.id] || (STORE.a[d.id] = { n: 0, r: 0, l: 0 }); a.n++; if (correct) a.r++; a.l = correct ? 1 : 0;
  var k = d.ch + "|" + d.topic, t = STORE.t[k] || (STORE.t[k] = { n: 0, r: 0 }); t.n++; if (correct) t.r++;
  var td = today(); if (STORE.days.indexOf(td) < 0) STORE.days.push(td); saveStore();
}

// ---------- question pool ----------
var POOL = {};
CHAPTER_IDS.forEach(function(c){
  var l = [];
  MCQ[c].forEach(function(m, i){ l.push({ id: "m" + c + "-" + i, ch: c, topic: m.topic, kind: "mcq", ref: m }); });
  GENS[c].forEach(function(g){ l.push({ id: g.id, ch: c, topic: g.topic, kind: "num", ref: g }); });
  CHAPTERS[c].questions.forEach(function(q, i){ l.push({ id: "b" + c + "-" + i, ch: c, topic: "Circuit drawings", kind: "bank", ref: q }); });
  POOL[c] = l;
});
function topicsOf(c){ var s = []; POOL[c].forEach(function(d){ if (s.indexOf(d.topic) < 0) s.push(d.topic); }); return s; }
function instantiate(d){
  if (d.kind === "mcq"){
    var m = d.ref, opts = shuffle([m.ok].concat(m.wrong));
    return { d: d, kind: "mcq", text: m.q, opts: opts, correct: opts.indexOf(m.ok), why: m.why, fig: null };
  }
  if (d.kind === "num"){ var r = d.ref.make(); return { d: d, kind: "num", text: r.q, unit: r.unit, ans: r.ans, sol: r.sol, fig: r.fig }; }
  var q = d.ref; return { d: d, kind: "bank", text: q.q, ans: q.a, fig: q.fig() };
}
function pickQ(descs, avoid){
  var w = descs.map(function(d){ var a = STORE.a[d.id]; var x = !a ? 3 : a.l ? 1 : 2.5; if (d.kind === "num") x *= 1.2; if (d.kind === "bank") x *= 0.5; if (d.id === avoid) x = 0; return x; });
  var tot = w.reduce(function(a, b){ return a + b; }, 0), r = Math.random() * tot;
  for (var i = 0; i < descs.length; i++){ r -= w[i]; if (r <= 0) return descs[i]; }
  return descs[descs.length - 1];
}
function chDescs(ch){ return ch === "all" ? [].concat.apply([], CHAPTER_IDS.map(function(c){ return POOL[c]; })) : POOL[ch]; }

// ---------- stats ----------
function chStats(c){
  var n = 0, r = 0; Object.keys(STORE.t).forEach(function(k){ if (k.split("|")[0] === c){ n += STORE.t[k].n; r += STORE.t[k].r; } });
  var seen = POOL[c].filter(function(d){ return STORE.a[d.id] && STORE.a[d.id].n > 0; }).length;
  return { n: n, r: r, acc: n ? Math.round(100 * r / n) : null, seen: seen, total: POOL[c].length };
}
function allStats(){ var n = 0, r = 0, s = 0, t = 0; CHAPTER_IDS.forEach(function(c){ var x = chStats(c); n += x.n; r += x.r; s += x.seen; t += x.total; }); return { n: n, r: r, acc: n ? Math.round(100 * r / n) : null, seen: s, total: t }; }
function streak(){
  var d = new Date(), c = 0, ds = STORE.days;
  function key(x){ return x.getFullYear() + "-" + ("0" + (x.getMonth() + 1)).slice(-2) + "-" + ("0" + x.getDate()).slice(-2); }
  if (ds.indexOf(key(d)) < 0) d.setDate(d.getDate() - 1);
  while (ds.indexOf(key(d)) >= 0){ c++; d.setDate(d.getDate() - 1); }
  return c;
}
function weak(){
  var out = []; Object.keys(STORE.t).forEach(function(k){ var t = STORE.t[k]; if (t.n >= 3 && t.r / t.n < 0.7){ var p = k.split("|"); out.push({ ch: p[0], topic: p[1], acc: Math.round(100 * t.r / t.n), n: t.n }); } });
  return out.sort(function(a, b){ return a.acc - b.acc; }).slice(0, 5);
}
function badges(){
  var s = allStats(), b = [];
  var best = {}; STORE.quizzes.forEach(function(q){ var p = Math.round(100 * q.score / q.total); if (!best[q.ch] || p > best[q.ch]) best[q.ch] = p; });
  b.push(["First steps", "Answer 10 questions", s.n >= 10]); b.push(["Century", "Answer 100 questions", s.n >= 100]);
  b.push(["Sharp", "80% accuracy over 30 answers", s.n >= 30 && s.acc >= 80]); b.push(["3-day streak", "Study 3 days in a row", streak() >= 3]);
  CHAPTER_IDS.forEach(function(c){ b.push(["" + chL(c) + " master", "Score 80% in a " + chL(c) + " quiz", (best[c] || 0) >= 80]); });
  return b;
}

// ---------- UI helpers ----------
function ring(p, label){
  var r = 26, c = 2 * Math.PI * r, o = c * (1 - (p || 0) / 100);
  return '<svg class="ring" viewBox="0 0 64 64" role="img" aria-label="' + label + '"><circle cx="32" cy="32" r="' + r + '" class="rt"/><circle cx="32" cy="32" r="' + r + '" class="rf" stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + o.toFixed(1) + '" transform="rotate(-90 32 32)"/><text x="32" y="37" text-anchor="middle">' + (p == null ? "–" : p + "%") + "</text></svg>";
}
function bar(p, cls){ return '<div class="bar ' + (cls || "") + '"><i style="width:' + (p || 0) + '%"></i></div>'; }
function esc2(s){ return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
function go(page, ch, tab){ S.page = page; if (ch) S.ch = ch; if (tab) S.tab = tab; render(); window.scrollTo(0, 0); }

var NAV = [["dash", "Chapters"], ["progress", "My progress"]];
function addBack(){
  if (S.page === "dash" || (S.page === "quiz" && QZ && QZ.stage === "run")) return;
  var pg = $("page"); if (pg.querySelector(".back")) return;
  var b = document.createElement("button"); b.className = "btn ghost sm back"; b.dataset.a = "go"; b.dataset.v = "dash"; b.textContent = "← Back to chapters";
  pg.insertBefore(b, pg.firstChild);
}
function pStudy(){ pStudy0(); addBack(); } function pSheet(){ pSheet0(); addBack(); } function pPractice(){ pPractice0(); addBack(); } function pQuiz(){ pQuiz0(); addBack(); } function pProgress(){ pProgress0(); addBack(); }
function render(){
  $("nav").innerHTML = NAV.map(function(n){ return '<button class="nv" data-a="go" data-v="' + n[0] + '" aria-current="' + (S.page === n[0]) + '">' + n[1] + "</button>"; }).join("");
  $("who").textContent = STORE.name ? STORE.name : "Guest";
  ({ dash: pDash, study: pStudy, practice: pPractice, quiz: pQuiz, progress: pProgress, sheet: pSheet })[S.page]();
}
function trace(f, label){
  var W = 1000, H = 80, N = 160, pts = [], k, x, y;
  for (k = 0; k <= N; k++){ x = W * k / N; y = 40 - 28 * Math.sin(2 * Math.PI * 3 * k / N); pts.push(x.toFixed(1) + "," + y.toFixed(1)); }
  var d = "M" + pts.join(" L"), cx = W * f, cy = 40 - 28 * Math.sin(2 * Math.PI * 3 * f);
  return '<svg viewBox="-8 0 1016 ' + H + '" role="img" aria-label="' + label + '"><line class="axis" x1="0" y1="40" x2="' + W + '" y2="40"/><path class="base" d="' + d + '"/><path class="on reveal" pathLength="1000" stroke-dasharray="' + (1000 * f).toFixed(1) + ' 1000" d="' + d + '"/><circle class="cur" cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="6"/></svg>';
}

// ---------- dashboard ----------
function pDash(){
  var s = allStats(), w = weak(), h = "";
  if (!STORE.name) h += '<section class="card hello"><h2>Welcome to the ME0212 Study Lab</h2><p>Enter your name. It stays on this device only.</p><div class="row"><input id="nameIn" type="text" placeholder="Your name" aria-label="Your name" maxlength="40"><button class="btn" data-a="setname">Save</button></div></section>';
  if (STORE.help) h += '<section class="card howto"><h2 class="sh">How to use the Study Lab</h2><ol><li><b>Pick a chapter</b> from the cards below.</li><li><b>Study:</b> read the lesson, watch the animation, try the calculator.</li><li><b>Exercises:</b> answer questions one by one and see the solution at once.</li><li><b>Quiz:</b> 10 questions in about 10 minutes, with the results at the end.</li></ol><p class="mut">Your progress is saved on this device only. Each answer shows its source in the book or the slides.</p><button class="btn sm ghost" data-a="hidehelp">Hide this</button></section>';
  var f = s.total ? s.seen / s.total : 0;
  h += '<section class="card trace"><div class="trace-top"><h1>' + (STORE.name ? "Hello, " + esc2(STORE.name.split(" ")[0]) : "Dashboard") + '</h1><div class="read"><b>' + s.seen + "</b> of " + s.total + " questions seen</div></div>" + trace(f, s.seen + " of " + s.total + " questions seen") + "</section>";
  h += '<div class="stats">' + stat(s.n, "Answers given") + stat(s.acc == null ? "–" : s.acc + "%", "Accuracy") + stat(streak(), "Day streak") + stat(CHAPTER_IDS.length, "Chapters") + "</div>";
  h += '<h2 class="sh">Chapters</h2><div class="chgrid">' + CHAPTER_IDS.map(function(c){ var x = chStats(c); return '<section class="card chc">' + ring(x.acc, "Accuracy " + (x.acc == null ? "none" : x.acc + "%")) + "<div><h3>" + chL(c) + "</h3><p>" + CHAPTERS[c].title + '</p><p class="mut">' + x.seen + " of " + x.total + " questions seen</p>" + bar(Math.round(100 * x.seen / x.total)) +
    '<div class="row"><button class="btn sm" data-a="study" data-v="' + c + '">Study</button><button class="btn sm ghost" data-a="prac" data-v="' + c + '">Exercises</button><button class="btn sm ghost" data-a="quizch" data-v="' + c + '">Quiz</button></div></div></section>'; }).join("") + "</div>";
  h += '<div class="grid2"><section class="card"><h2 class="sh">Needs work</h2>' + (w.length ? w.map(function(x){ return '<div class="wk"><span><b>' + x.topic + "</b> · " + chL(x.ch) + '</span><span>' + x.acc + '%</span><button class="btn sm ghost" data-a="praction" data-v="' + x.ch + "|" + x.topic + '">Practise</button></div>'; }).join("") : '<p class="mut">Topics below 70% appear here after a few answers.</p>') + '</section><section class="card"><h2 class="sh">Badges</h2><div class="badges">' + badges().map(function(b){ return '<div class="bdg ' + (b[2] ? "on" : "") + '" title="' + b[1] + '"><b>' + b[0] + "</b><span>" + b[1] + "</span></div>"; }).join("") + "</div></section></div>";
  $("page").innerHTML = h;
}
function stat(v, l){ return '<div class="stat"><b>' + v + "</b><span>" + l + "</span></div>"; }

// ---------- study ----------
var TABS = [["learn", "Learn"], ["watch", "Watch"], ["calc", "Calculate"]];
function pStudy0(){
  var x = chStats(S.ch);
  $("page").innerHTML = '<div class="chead"><div><div class="lbl">' + chL(S.ch) + '</div><h1 class="ph">' + CHAPTERS[S.ch].title + '</h1></div><div class="row"><button class="btn" data-a="prac" data-v="' + S.ch + '">Exercises (' + x.total + ')</button><button class="btn ghost" data-a="quizch" data-v="' + S.ch + '">Quiz</button><button class="btn ghost" data-a="sheet" data-v="' + S.ch + '">Formula sheet</button></div></div>' +
    '<nav class="tabs" role="tablist">' + TABS.map(function(t){ return '<button class="tab" role="tab" data-a="tab" data-v="' + t[0] + '" aria-selected="' + (S.tab === t[0]) + '">' + t[1] + "</button>"; }).join("") + '</nav><div id="ctab" class="ctab"></div>';
  ({ learn: rLearn, watch: rWatch, calc: rCalc })[S.tab]();
}
  function rLearn(){
    $("ctab").innerHTML = '<div class="lessons">' + LESSONS[S.ch].map(function(l){
      var id = IDEAS[l.t];
      return '<section class="card lesson"><h2>' + l.t + "</h2>" + (id ? '<p class="idea"><b>In plain words.</b> ' + id.i + "</p>" : "") + "<ul>" + l.pts.map(function(p){ return "<li>" + p + "</li>"; }).join("") + "</ul>" +
        (l.f ? "<p>" + l.f.map(function(f){ return '<span class="formula">' + f + "</span>"; }).join(" ") + "</p>" : "") + (l.fig ? fig(l.fig()) : "") + (LREF[l.t] ? '<p class="srcl"><span>Source: ' + LREF[l.t] + "</span></p>" : "") + (id ? '<p class="slip"><b>Common slip.</b> ' + id.s + "</p>" + (id.w != null ? '<button class="btn sm ghost" data-watch="' + id.w + '">Watch it move</button>' : "") : "") + "</section>";
    }).join("") + "</div>";
    $("ctab").querySelectorAll("[data-watch]").forEach(function(b){ b.onclick = function(){ (WSIM[S.ch] = WSIM[S.ch] || {}).k = +b.dataset.watch; S.tab = "watch"; render(); window.scrollTo(0, 0); }; });
  }

  function rCalc(){
    var tools = TOOLS[S.ch], k = CALC[S.ch] || 0, t = tools[k];
    $("ctab").innerHTML = '<div class="picker">' + tools.map(function(x, i){ return '<button class="pill" data-tool="' + i + '" aria-pressed="' + (i === k) + '">' + x.name + "</button>"; }).join("") + "</div>" +
      '<div class="grid2 wide-left"><section class="card"><p class="hint">' + t.hint + "</p>" + t.fields() + '<div class="btnrow"><button class="btn" id="goCalc">Calculate</button></div><div class="msg" id="cmsg" role="alert"></div></section>' +
      '<section class="card"><div id="cfig"></div><div class="steps" id="csteps"></div></section></div>';
    var run = function(){
      var r = t.run();
      if (r.msg){ $("cmsg").textContent = r.msg; $("csteps").textContent = ""; return; }
      $("cmsg").textContent = ""; $("cfig").innerHTML = r.raw ? fig(r.fig) : fig(r.fig); $("csteps").innerHTML = r.steps;
    };
    $("goCalc").onclick = run;
    $("ctab").querySelectorAll("input,select").forEach(function(el){ el.addEventListener("input", run); el.addEventListener("change", run); });
    run();
  }




// ---------- formula sheet ----------
function pSheet0(){
  var h = '<div class="chead"><div><div class="lbl">' + chL(S.ch) + '</div><h1 class="ph">Formula sheet · ' + CHAPTERS[S.ch].title + '</h1></div><div class="row"><button class="btn" data-a="print">Print or save as PDF</button></div></div><section class="card sheet">';
  h += LESSONS[S.ch].map(function(l){ return '<div class="srow"><h2>' + l.t + "</h2>" + (l.f ? "<p>" + l.f.map(function(f){ return '<span class="formula">' + f + "</span>"; }).join(" ") + "</p>" : "") + "<ul>" + l.pts.map(function(p){ return "<li>" + p + "</li>"; }).join("") + "</ul>" + (LREF[l.t] ? '<p class="srcl"><span>Source: ' + LREF[l.t] + "</span></p>" : "") + "</div>"; }).join("");
  $("page").innerHTML = h + '</section><p class="mut printnote">ME0212 Study Lab · version ' + APP_VERSION + "</p>";
}

// ---------- practice ----------
function pPractice0(){
  var topics = PR.ch === "all" ? [] : topicsOf(PR.ch);
  $("page").innerHTML = '<h1 class="ph">Exercises</h1><section class="card filters"><div class="field2"><label for="fch">Chapter</label><select id="fch" data-a="pf"><option value="all"' + (PR.ch === "all" ? " selected" : "") + ">All chapters</option>" + CHAPTER_IDS.map(function(c){ return '<option value="' + c + '"' + (PR.ch === c ? " selected" : "") + ">" + chL(c) + " · " + CH_NAMES[c] + "</option>"; }).join("") + '</select></div>' +
    '<div class="field2"><label for="ftp">Topic</label><select id="ftp" data-a="pf"' + (PR.ch === "all" ? " disabled" : "") + '><option value="all">All topics</option>' + topics.map(function(t){ return '<option' + (PR.topic === t ? " selected" : "") + ">" + t + "</option>"; }).join("") + '</select></div>' +
    '<div class="field2"><label for="fty">Type</label><select id="fty" data-a="pf"><option value="mixed"' + (PR.type === "mixed" ? " selected" : "") + '>Mixed</option><option value="mcq"' + (PR.type === "mcq" ? " selected" : "") + '>Multiple choice</option><option value="num"' + (PR.type === "num" ? " selected" : "") + '>Numeric (new numbers every time)</option></select></div>' +
    '<div class="sesbox"><b>' + PR.ses.r + " / " + PR.ses.n + '</b><span>this session</span></div></section><div id="qarea"></div>';
  if (!PR.q) nextPractice(); else drawQ();
}
function poolPractice(){
  var l = chDescs(PR.ch);
  if (PR.topic !== "all" && PR.ch !== "all") l = l.filter(function(d){ return d.topic === PR.topic; });
  if (PR.type === "mcq") l = l.filter(function(d){ return d.kind === "mcq"; });
  if (PR.type === "num") l = l.filter(function(d){ return d.kind === "num"; });
  return l;
}
function nextPractice(){
  var l = poolPractice(); if (!l.length){ $("qarea").innerHTML = '<section class="card"><p>No questions match this filter.</p></section>'; return; }
  var d = pickQ(l, PR.last); PR.last = d.id; PR.q = instantiate(d); PR.done = false; PR.res = null; drawQ();
}
function qhead(q){ return '<div class="qmeta"><span class="chip">' + chL(q.d.ch) + '</span><span class="chip alt">' + q.d.topic + "</span>" + (q.kind === "num" ? '<span class="chip">Numeric</span>' : q.kind === "mcq" ? '<span class="chip">Multiple choice</span>' : '<span class="chip">Drawing</span>') + "</div>"; }
function qbody(q, st){
  // st: { done, picked, val, review }
  var h = qhead(q) + '<div class="qtext2">' + esc2(q.text) + "</div>" + (q.fig ? fig(q.fig) : "");
  if (q.kind === "mcq"){
    h += '<div class="opts">' + q.opts.map(function(o, i){ var c = ""; if (st.done){ if (i === q.correct) c = " right"; else if (i === st.picked) c = " wrong"; } else if (st.picked === i) c = " pick"; return '<button class="opt" data-a="opt" data-v="' + i + '"' + (st.done ? " disabled" : "") + ">" + esc2(o) + "</button>"; }).join("") + "</div>";
  } else if (q.kind === "num"){
    h += '<div class="numrow"><input id="numIn" type="text" inputmode="decimal" autocomplete="off" placeholder="Your answer" aria-label="Your answer" value="' + esc2(st.val || "") + '"' + (st.done ? " disabled" : "") + '><span class="un">' + (q.unit || "") + "</span>" + (st.done ? "" : '<button class="btn" data-a="check">Check</button>') + "</div>" + (st.done ? "" : '<p class="numhint">Answers within 1.5% are accepted. A prefix may be typed, for example 0.71 mA or 710 µA.</p>');
  }
  return h;
}
function drawQ(){
  var q = PR.q, st = PR.res || {}, h = '<section class="card qcard">' + qbody(q, { done: PR.done, picked: st.picked, val: st.val });
  if (q.kind === "bank" && !PR.done) h += '<div class="row"><button class="btn" data-a="reveal">Show answer</button></div>';
  if (PR.done) h += feedback(q, st);
  $("qarea").innerHTML = h + "</section>";
  var inp = $("numIn"); if (inp && !PR.done){ inp.focus(); inp.addEventListener("keydown", function(e){ if (e.key === "Enter") check(); }); }
  var nx = $("nextBtn"); if (nx) nx.focus({ preventScroll: true });
  var sb = document.querySelector(".sesbox"); if (sb) sb.innerHTML = "<b>" + PR.ses.r + " / " + PR.ses.n + "</b><span>this session</span>";
}
function srcLine(q){
  var s = srcOf(q.d.ch, q.d.topic, q.text + " " + (q.sol || "") + " " + (q.why || ""));
  var body = "" + chL(q.d.ch) + " · " + q.d.topic + "\nQuestion: " + q.text + "\n\nWhat is wrong:\n\n(App version " + APP_VERSION + ")";
  var mail = "mailto:Mohammad.alghweri@gju.edu.jo?subject=" + encodeURIComponent("ME0212 Study Lab: problem in " + chL(q.d.ch)) + "&body=" + encodeURIComponent(body);
  return '<p class="srcl">' + (s ? "<span>Source: " + s + "</span>" : "") + '<a href="' + mail + '">Report a problem</a></p>';
}
function feedback(q, st){
  if (q.kind === "bank") return '<div class="fb" role="status"><b>Answer:</b><div class="sol">' + esc2(q.ans) + '</div></div><div class="row"><span class="mut">Did you get it?</span><button class="btn" data-a="self" data-v="1">I got it</button><button class="btn ghost" data-a="self" data-v="0">Not yet</button></div>' + srcLine(q);
  var good = st.ok, h = '<div class="fb ' + (good ? "good" : "bad") + '" role="status"><b>' + (good ? "Correct." : "Not quite.") + "</b> ";
  if (q.kind === "mcq") h += (good ? "" : "The answer is: " + esc2(q.opts[q.correct]) + ". ") + esc2(q.why);
  if (q.kind === "num") h += (good ? "" : "The answer is " + nn(q.ans) + " " + q.unit + ". ") + '<div class="sol">' + esc2(q.sol) + "</div>";
  return h + "</div>" + srcLine(q) + '<div class="row"><button class="btn" id="nextBtn" data-a="next">Next question</button></div>';
}
var SIPF = { p: 1e-12, n: 1e-9, u: 1e-6, "µ": 1e-6, "μ": 1e-6, m: 1e-3, k: 1e3, K: 1e3, M: 1e6 };
var BASEU = ["rad/s", "var", "VA", "Hz", "A", "V", "Ω", "W", "J", "C", "F", "H", "S", "°"];
function splitUnit(u){ u = String(u || "").replace(/ohms?/i, "Ω"); if (BASEU.indexOf(u) >= 0 || !u) return [1, u]; var p = u.charAt(0); if (SIPF[p] && BASEU.indexOf(u.slice(1)) >= 0) return [SIPF[p], u.slice(1)]; return [1, u]; }
function parseNum(s, unit){
  s = String(s).trim().replace(",", ".").replace(/\s+/g, "").replace(/ohms?/i, "Ω");
  var m = /^([-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?)(.*)$/.exec(s); if (!m) return NaN;
  var x = parseFloat(m[1]), rest = m[2]; if (!rest) return x;
  var qu = splitUnit(unit), ru = splitUnit(rest);
  if (ru[1] === qu[1] && rest !== ru[1] || rest === qu[1]) return x * ru[0] / qu[0];
  if (rest.length === 1 && SIPF[rest]) return x * SIPF[rest] / qu[0];
  if (rest === String(unit)) return x;
  return NaN;
}
function isRight(g, a){ if (!isFinite(g)) return false; if (a === 0) return Math.abs(g) < 1e-9; return Math.abs(g - a) <= Math.abs(a) * 0.015 + 1e-12; }
function check(){
  var q = PR.q, v = $("numIn").value, g = parseNum(v, q.unit);
  if (!isFinite(g)){ $("numIn").setAttribute("aria-invalid", "true"); $("numIn").placeholder = "Enter a number"; return; }
  var ok = isRight(g, q.ans); PR.done = true; PR.res = { ok: ok, val: v }; PR.ses.n++; if (ok) PR.ses.r++; record(q.d, ok); drawQ();
}

// ---------- quiz ----------
var QZCH = "1", QZN = 10;
function pQuiz0(){
  if (QZ && QZ.stage === "run") return drawQuiz();
  if (QZ && QZ.stage === "result") return drawResult();
  $("page").innerHTML = '<h1 class="ph">Quiz</h1><section class="card"><p>A quiz mixes multiple-choice and numeric questions. A 10-question quiz is planned for 10 minutes, like the course quizzes. You see the results, the solutions and the sources at the end.</p><div class="filters2"><div class="field2"><label for="qch">Chapter</label><select id="qch">' + CHAPTER_IDS.map(function(c){ return '<option value="' + c + '"' + (QZCH === c ? " selected" : "") + ">" + chL(c) + " · " + CH_NAMES[c] + "</option>"; }).join("") + '<option value="all"' + (QZCH === "all" ? " selected" : "") + '>All chapters</option></select></div><div class="field2"><label for="qn">Questions</label><select id="qn"><option' + (QZN === 10 ? " selected" : "") + '>10</option><option' + (QZN === 20 ? " selected" : "") + '>20</option></select></div></div><div class="row"><button class="btn" data-a="startquiz">Start quiz</button></div></section>' + quizHistory();
}
function quizHistory(){
  var q = STORE.quizzes.slice(-5).reverse(); if (!q.length) return "";
  return '<section class="card"><h2 class="sh">Recent quizzes</h2>' + q.map(function(x){ var p = Math.round(100 * x.score / x.total); return '<div class="wk"><span>' + x.date + " · " + (x.ch === "all" ? "All chapters" : "" + chL(x.ch)) + "</span><span>" + x.score + " / " + x.total + " (" + p + "%)</span>" + bar(p, p >= 80 ? "ok" : p < 50 ? "low" : "") + "</div>"; }).join("") + "</section>";
}
function startQuiz(){
  QZCH = $("qch").value; QZN = +$("qn").value;
  var all = chDescs(QZCH), mc = shuffle(all.filter(function(d){ return d.kind === "mcq"; })), nu = shuffle(all.filter(function(d){ return d.kind === "num"; }));
  var nNum = Math.round(QZN * 0.3), items = mc.slice(0, QZN - nNum).concat(nu.slice(0, nNum)), qs = shuffle(items).map(instantiate);
  QZ = { stage: "run", qs: qs, i: 0, ans: [], ch: QZCH, t0: Date.now() }; render();
}
function drawQuiz(){
  var q = QZ.qs[QZ.i], st = QZ.cur || {};
  $("page").innerHTML = '<div class="qzbar"><b>Question ' + (QZ.i + 1) + " of " + QZ.qs.length + "</b>" + bar(Math.round(100 * QZ.i / QZ.qs.length)) + '<span class="clock" id="qzclock"></span><button class="btn sm ghost" data-a="quitquiz">Quit</button></div><section class="card qcard">' + qbody(q, { done: false, picked: st.picked, val: st.val }) +
    '<div class="row"><button class="btn" data-a="qnext">' + (QZ.i === QZ.qs.length - 1 ? "Finish" : "Next") + "</button></div></section>";
  qclock(); var inp = $("numIn"); if (inp){ inp.focus(); inp.addEventListener("keydown", function(e){ if (e.key === "Enter") qnext(); }); }
  if (q.kind === "mcq" && st.picked != null) document.querySelectorAll(".opt")[st.picked].classList.add("pick");
}
function qclock(){
  var el = $("qzclock"); if (!el || !QZ || QZ.stage !== "run") return;
  var lim = QZ.qs.length <= 10 ? 600 : 1200, t = Math.floor((Date.now() - QZ.t0) / 1000), f = function(x){ return Math.floor(x / 60) + ":" + ("0" + x % 60).slice(-2); };
  el.textContent = t < lim ? "Time " + f(t) + " / " + f(lim) : "Time is up (" + f(t) + "). Finish when ready.";
  el.classList.toggle("over", t >= lim);
}
setInterval(qclock, 1000);
function qnext(){
  var q = QZ.qs[QZ.i], st = QZ.cur || {}, v = q.kind === "num" ? $("numIn").value : null, ok = false;
  if (q.kind === "mcq") ok = st.picked === q.correct; else ok = isRight(parseNum(v, q.unit), q.ans);
  QZ.ans.push({ picked: st.picked, val: v, ok: ok }); record(q.d, ok); QZ.cur = null; QZ.i++;
  if (QZ.i >= QZ.qs.length){
    var sc = QZ.ans.filter(function(a){ return a.ok; }).length; QZ.stage = "result"; QZ.score = sc; QZ.secs = Math.round((Date.now() - QZ.t0) / 1000);
    STORE.quizzes.push({ ch: QZ.ch, score: sc, total: QZ.qs.length, date: today() }); saveStore();
  }
  render();
}
function drawResult(){
  var p = Math.round(100 * QZ.score / QZ.qs.length), h = '<h1 class="ph">Quiz result</h1><section class="card res"><div class="big">' + QZ.score + " / " + QZ.qs.length + "</div><div>" + p + "% · " + Math.floor(QZ.secs / 60) + " min " + (QZ.secs % 60) + ' s</div>' + bar(p, p >= 80 ? "ok" : p < 50 ? "low" : "") + '<div class="row"><button class="btn" data-a="againquiz">New quiz</button><button class="btn ghost" data-a="go" data-v="dash">Dashboard</button></div></section><h2 class="sh">Review</h2>';
  h += QZ.qs.map(function(q, i){ var a = QZ.ans[i], right = q.kind === "mcq" ? q.opts[q.correct] : nn(q.ans) + " " + q.unit, mine = q.kind === "mcq" ? (a.picked == null ? "no answer" : q.opts[a.picked]) : (a.val || "no answer");
    return '<section class="card rv ' + (a.ok ? "good" : "bad") + '"><div class="qmeta"><span class="chip">' + (a.ok ? "Correct" : "Wrong") + '</span><span class="chip alt">' + q.d.topic + '</span></div><div class="qtext2">' + (i + 1) + ". " + esc2(q.text) + "</div>" + (q.fig && !a.ok ? fig(q.fig) : "") + '<p><b>Your answer:</b> ' + esc2(mine) + "</p>" + (a.ok ? "" : "<p><b>Correct answer:</b> " + esc2(right) + "</p>") + '<div class="sol">' + esc2(q.kind === "mcq" ? q.why : q.sol) + "</div>" + srcLine(q) + "</section>"; }).join("");
  $("page").innerHTML = h;
}

// ---------- progress ----------
function pProgress0(){
  var s = allStats(), h = '<h1 class="ph">My progress</h1><div class="stats">' + stat(s.n, "Answers given") + stat(s.acc == null ? "–" : s.acc + "%", "Accuracy") + stat(STORE.quizzes.length, "Quizzes taken") + stat(streak(), "Day streak") + "</div>";
  h += CHAPTER_IDS.map(function(c){ var rows = topicsOf(c).map(function(t){ var x = STORE.t[c + "|" + t], p = x && x.n ? Math.round(100 * x.r / x.n) : null; return '<div class="trow"><span>' + t + '</span><span class="mut">' + (x ? x.r + " / " + x.n : "not tried") + "</span>" + bar(p || 0, p == null ? "" : p >= 80 ? "ok" : p < 60 ? "low" : "") + "<span>" + (p == null ? "–" : p + "%") + "</span></div>"; }).join("");
    return '<section class="card"><h2 class="sh">' + chL(c) + " · " + CHAPTERS[c].title + "</h2>" + rows + "</section>"; }).join("");
  h += quizHistory() + '<section class="card"><h2 class="sh">Share or reset</h2><p class="mut">Your progress is stored in this browser only' + (memOnly ? " (storage is blocked, so it will be lost when you close the page)" : "") + '. To show your instructor, copy or save the summary.</p><div class="row"><button class="btn" data-a="copysum">Copy summary</button><button class="btn ghost" data-a="dlsum">Save as text file</button><button class="btn ghost danger" data-a="reset">Reset all progress</button></div><div id="sumMsg" class="mut"></div></section>';
  $("page").innerHTML = h;
}
function summaryText(){
  var s = allStats(), t = "ME0212 Study Lab progress\nName: " + (STORE.name || "(not set)") + "\nDate: " + today() + "\nAnswers: " + s.n + ", accuracy: " + (s.acc == null ? "-" : s.acc + "%") + ", questions seen: " + s.seen + " of " + s.total + "\n";
  CHAPTER_IDS.forEach(function(c){ var x = chStats(c); t += "" + chL(c) + ": " + x.seen + "/" + x.total + " seen, accuracy " + (x.acc == null ? "-" : x.acc + "%") + "\n"; });
  STORE.quizzes.slice(-10).forEach(function(q){ t += "Quiz " + q.date + " " + chL(q.ch) + ": " + q.score + "/" + q.total + "\n"; });
  return t;
}

// ---------- events ----------
document.addEventListener("click", function(e){
  var b = e.target.closest("[data-a]"); if (!b || b.tagName === "SELECT") return;
  var a = b.dataset.a, v = b.dataset.v;
  if (a === "go") go(v);
  else if (a === "study") go("study", v);
  else if (a === "tab"){ S.tab = v; pStudy(); }
  else if (a === "tool"){ }
  else if (a === "prac"){ PR.ch = v; PR.topic = "all"; PR.q = null; go("practice"); }
  else if (a === "praction"){ var p = v.split("|"); PR.ch = p[0]; PR.topic = p[1]; PR.q = null; go("practice"); }
  else if (a === "quizch"){ QZ = null; QZCH = v; go("quiz"); }
  else if (a === "setname"){ var n = $("nameIn").value.trim(); if (n){ STORE.name = n; saveStore(); render(); } }
  else if (a === "opt"){ var i = +v; if (S.page === "quiz"){ QZ.cur = { picked: i }; document.querySelectorAll(".opt").forEach(function(o, k){ o.classList.toggle("pick", k === i); }); }
    else if (!PR.done){ var ok = i === PR.q.correct; PR.done = true; PR.res = { ok: ok, picked: i }; PR.ses.n++; if (ok) PR.ses.r++; record(PR.q.d, ok); drawQ(); } }
  else if (a === "check") check();
  else if (a === "reveal"){ PR.done = true; PR.res = { ok: true }; drawQ(); }
  else if (a === "self"){ var okk = v === "1"; PR.ses.n++; if (okk) PR.ses.r++; record(PR.q.d, okk); nextPractice(); }
  else if (a === "next") nextPractice();
  else if (a === "startquiz") startQuiz();
  else if (a === "qnext") qnext();
  else if (a === "quitquiz"){ QZ = null; render(); }
  else if (a === "hidehelp"){ STORE.help = 0; saveStore(); render(); }
  else if (a === "sheet"){ go("sheet", v); }
  else if (a === "print"){ window.print(); }
  else if (a === "againquiz"){ QZ = null; render(); }
  else if (a === "copysum"){ var t = summaryText(); function done(){ $("sumMsg").textContent = "Copied."; } if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(done, function(){ $("sumMsg").textContent = "Copy is blocked here. Use Save as text file."; }); else $("sumMsg").textContent = "Copy is blocked here. Use Save as text file."; }
  else if (a === "dlsum"){ var bl = new Blob([summaryText()], { type: "text/plain" }), u = URL.createObjectURL(bl), l = document.createElement("a"); l.href = u; l.download = "ME0212_progress.txt"; document.body.appendChild(l); l.click(); l.remove(); setTimeout(function(){ URL.revokeObjectURL(u); }, 500); }
  else if (a === "reset"){ if (confirm("Delete all your progress on this device?")){ STORE = { name: STORE.name, a: {}, t: {}, quizzes: [], days: [], seen: 0 }; saveStore(); render(); } }
  else if (b.dataset.tool != null){ }
});
document.addEventListener("change", function(e){
  var t = e.target;
  if (t.dataset.a === "pf"){ PR.ch = $("fch").value; if (t.id === "fch") PR.topic = "all"; else PR.topic = $("ftp").value; PR.type = $("fty").value; PR.q = null; PR.last = null; pPractice(); }
  if (t.id === "qch") QZCH = t.value; if (t.id === "qn") QZN = +t.value;
});
// the Calculate tab buttons use data-tool
document.addEventListener("click", function(e){ var b = e.target.closest("button"); if (b && b.dataset.tool != null && S.page === "study"){ CALC[S.ch] = +b.dataset.tool; rCalc(); } });
loadStore(); render();

// subscripts: turn R_TH into R with a subscript TH in every rendered page text
(function(){
  function subify(root){
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), list = [], n;
    while ((n = w.nextNode())){ if (/_[A-Za-z]/.test(n.nodeValue) && !/^(SCRIPT|STYLE|TEXTAREA|OPTION|TSPAN|TEXT|svg)$/i.test(n.parentNode.nodeName) && !n.parentNode.closest("svg,textarea,select,input,.mono")) list.push(n); }
    list.forEach(function(t){
      var f = document.createDocumentFragment(), parts = t.nodeValue.split(/(_[A-Za-z]+)/);
      parts.forEach(function(p){ if (/^_[A-Za-z]+$/.test(p)){ var s = document.createElement("sub"); s.textContent = p.slice(1); f.appendChild(s); } else if (p) f.appendChild(document.createTextNode(p)); });
      t.parentNode.replaceChild(f, t);
    });
  }
  function start(){
    var pg = document.getElementById("page"); if (!pg) return;
    var busy = false, mo = new MutationObserver(function(){ if (busy) return; busy = true; try { subify(pg); } finally { busy = false; } });
    mo.observe(pg, { childList: true, subtree: true }); subify(pg);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
