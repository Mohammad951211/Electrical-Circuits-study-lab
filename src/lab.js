// ================= platform =================
var APP_VERSION = "@@VERSION@@";
function chL(c){ return c === "M" ? "Motors" : "Chapter " + c; }
var CH_NAMES = { "1": "Basic Concepts", "2": "Basic Laws", "3": "Series–Parallel", "4": "DC Analysis Methods", "5": "Network Theorems", "6": "Capacitors & Inductors", "8": "AC Fundamentals", "9": "AC Analysis", "11": "Transformers", "M": "Electric Motors" };
var MCQ = {}; function M(topic, q, ok, wrong, why){ return { topic: topic, q: q, ok: ok, wrong: wrong, why: why }; }
//@@MCQ@@
//@@GENS@@
var S = { page: "dash", ch: "1", tab: "study", view: "learn", ti: 0 }; var CALC = {};
var PR = { ch: "all", topic: "all", type: "mixed", q: null, done: false, ses: { n: 0, r: 0 }, last: null };
var QZ = null;

// ---------- store (this device only) ----------
var STORE = { name: "", sid: "", a: {}, t: {}, quizzes: [], days: [], seen: 0, help: 1, welcomed: 0, joined: null };
var memOnly = false;
function loadStore(){ try { var o = JSON.parse(localStorage.getItem("me0212-lab-v2") || "null"); if (o) for (var k in STORE) if (o[k] != null) STORE[k] = o[k]; } catch (e) { memOnly = true; }
  if (!STORE.welcomed && (STORE.name || STORE.sid || Object.keys(STORE.a).length)) STORE.welcomed = 1; }
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
  CHAPTERS[c].questions.forEach(function(q, i){ l.push({ id: "b" + c + "-" + i, ch: c, topic: q.tag || "Circuit drawings", kind: "bank", ref: q }); });
  POOL[c] = l;
});
function topicsOf(c){ var s = []; POOL[c].forEach(function(d){ if (s.indexOf(d.topic) < 0) s.push(d.topic); }); return s; }
function instantiate(d){
  if (d.kind === "mcq"){
    var m = d.ref, opts = shuffle([m.ok].concat(m.wrong));
    return { d: d, kind: "mcq", text: m.q, opts: opts, correct: opts.indexOf(m.ok), why: m.why, fig: MQ(m.q) || MQ2(m.q) };
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

var UNITW = /^(?:[kMmµnp]?(?:Ω|V|A|W|s|Hz|F|H|J|C|S|VA|var|T|Wb|N|m|g)|rad|min|rpm|kg|h|r)$/;
var UPAIR = /^(m\/s|V\/m|A\/m|rad\/s|V\/s|A\/s|W\/m|J\/s|r\/min|kg\/m)$/;
function fmtMath(t){
  var U = "(?:(?:[kMmµnp]?(?:Ω|V|A|W|s|Hz|F|H|J|C|S|VA|var|T|Wb|N)|rad|[cmk]?m[²³]?)(?:·[cmk]?m)?)(?![A-Za-z])";
  var OP = "(?:(?:\\([^()<>]*\\)){1,3}|\\d[\\d.]*(?:\\s?×\\s?10[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+)?(?:\\s?" + U + ")?|[A-Za-zα-ωΩφθπ√]+(?:_[A-Za-z0-9]+)?[²³]?)";
  var re = new RegExp("(^|[\\s=+×·(,−-])(" + OP + ")\\s?/\\s?(" + OP + ")(?![A-Za-z0-9_(])", "g");
  return String(t).replace(re, function(m, pre, n, d){
    var strip = function(x){ return x.charAt(0) === "(" && x.charAt(x.length - 1) === ")" && x.indexOf(")(") < 0 ? x.slice(1, -1) : x; };
    if (UPAIR.test(n + "/" + d) || (/^[a-z]{2,}$/.test(n) && /^[a-z]{2,}$/.test(d))) return m;
    if (UNITW.test(d) && (/\d/.test(n) && !/\d/.test(d) || (n.length > 1 && UNITW.test(n)))) return m;
    if (/^\d+$/.test(n) && /^[a-zA-Z]{2,}$/.test(d) && !/^[A-Za-z]$/.test(d) && !UNITW.test(d) && d.length > 3) return m;
    return pre + '<span class="fr"><span>' + strip(n) + "</span><span>" + strip(d) + "</span></span>";
  });
}
var HIST = [];
function snap(){ return { page: S.page, ch: S.ch, tab: S.tab, ti: S.ti, view: S.view, pr: { ch: PR.ch, topic: PR.topic, type: PR.type } }; }
function pushHist(){ var h = snap(), l = HIST[HIST.length - 1]; if (l && JSON.stringify(l) === JSON.stringify(h)) return; HIST.push(h); if (HIST.length > 40) HIST.shift(); try { history.pushState({ n: HIST.length }, ""); } catch (e) {} }
function go(page, ch, tab, noPush){
  if (page === "dash" && !noPush){ HIST = []; }
  else if (!noPush && !(page === S.page && (!ch || ch === S.ch))) pushHist();
  S.page = page; if (ch) S.ch = ch; if (tab) S.tab = tab; render(); window.scrollTo(0, 0);
}
function goBack(fromPop){
  var h = HIST.pop(); if (!h) return go("dash", null, null, true);
  if (QZ && QZ.stage === "run") QZ = null;
  if (h.pr){ PR.ch = h.pr.ch; PR.topic = h.pr.topic; PR.type = h.pr.type; PR.q = null; PR.last = null; }
  S.ti = h.ti; S.view = h.view;
  go(h.page, h.ch, h.tab, true);
}
window.addEventListener("popstate", function(){ if (HIST.length) goBack(true); });

var NAV = [["dash", "Chapters"], ["progress", "My progress"]];
function addBack(){
  if (S.page === "dash" || (S.page === "quiz" && QZ && QZ.stage === "run")) return;
  var pg = $("page"); if (pg.querySelector(".back")) return;
  var b = document.createElement("button"); b.className = "btn ghost sm back"; b.dataset.a = "back"; b.textContent = "← Back";
  pg.insertBefore(b, pg.firstChild);
}
function pStudy(){ pStudy0(); addBack(); } function pSheet(){ pSheet0(); addBack(); } function pPractice(){ pPractice0(); addBack(); } function pQuiz(){ pQuiz0(); addBack(); } function pProgress(){ pProgress0(); addBack(); }
// Feedback: set FEEDBACK.form to the Google Form link (the .../viewform address) and the three entry ids to send reports to a form.
// With no form set, the links open the e-mail program instead.
var FEEDBACK = { form: "https://docs.google.com/forms/d/e/1FAIpQLScXgL7jvUNWovkCAGVkBa_X1fpwor7uyTXwT1qT__GCpZVzyw/viewform", eText: "", eWhere: "", eVer: "", eName: "entry.868138370", eSid: "entry.988915593", mail: "Mohammad.alghweri@gju.edu.jo" };
function feedbackLink(subject, where, body){
  if (FEEDBACK.form){
    var u = FEEDBACK.form + (FEEDBACK.form.indexOf("?") < 0 ? "?" : "&") + "usp=pp_url";
    if (FEEDBACK.eWhere) u += "&" + FEEDBACK.eWhere + "=" + encodeURIComponent(where);
    if (FEEDBACK.eText) u += "&" + FEEDBACK.eText + "=" + encodeURIComponent((FEEDBACK.eWhere ? "" : where + " (version " + APP_VERSION + ")" + String.fromCharCode(10)) + body);
    if (FEEDBACK.eVer) u += "&" + FEEDBACK.eVer + "=" + encodeURIComponent(APP_VERSION);
    if (FEEDBACK.eName && STORE.name) u += "&" + FEEDBACK.eName + "=" + encodeURIComponent(STORE.name);
    if (FEEDBACK.eSid && STORE.sid) u += "&" + FEEDBACK.eSid + "=" + encodeURIComponent(STORE.sid);
    return u;
  }
  return "mailto:" + FEEDBACK.mail + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(where + String.fromCharCode(10) + body);
}
function footLink(){ var a = document.getElementById("fbLink"); if (a){ a.href = feedbackLink("Circuit Hub feedback", "Feedback (App version " + APP_VERSION + ")", ""); if (FEEDBACK.form){ a.target = "_blank"; a.rel = "noopener"; } } }
function render(){
  $("nav").innerHTML = NAV.map(function(n){ return '<button class="nv" data-a="go" data-v="' + n[0] + '" aria-current="' + (S.page === n[0]) + '">' + n[1] + "</button>"; }).join("");
  $("who").innerHTML = STORE.name ? esc2(STORE.name) + (STORE.sid ? '<small class="sid">ID ' + esc2(STORE.sid) + "</small>" : "") + ' <button class="linkb" data-a="editid">Edit</button>' : '<button class="linkb" data-a="editid">Enter your name</button>';
  ({ dash: pDash, study: pStudy, practice: pPractice, quiz: pQuiz, progress: pProgress, sheet: pSheet })[S.page]();
  document.body.classList.toggle("landing", S.page === "dash" && showLanding());
  footLink();
}
function trace(f, label){
  var W = 1000, H = 80, N = 160, pts = [], k, x, y;
  for (k = 0; k <= N; k++){ x = W * k / N; y = 40 - 28 * Math.sin(2 * Math.PI * 3 * k / N); pts.push(x.toFixed(1) + "," + y.toFixed(1)); }
  var d = "M" + pts.join(" L"), cx = W * f, cy = 40 - 28 * Math.sin(2 * Math.PI * 3 * f);
  return '<svg viewBox="-8 0 1016 ' + H + '" role="img" aria-label="' + label + '"><line class="axis" x1="0" y1="40" x2="' + W + '" y2="40"/><path class="base" d="' + d + '"/><path class="on reveal" pathLength="1000" stroke-dasharray="' + (1000 * f).toFixed(1) + ' 1000" d="' + d + '"/><circle class="cur" cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="6"/></svg>';
}


// ---------- class list (optional): the student can choose to send the name and ID to the instructor ----------
// Create a Google Form with two short-answer questions (full name, university ID), then put its address (.../viewform)
// and the two entry ids below. While REG.form is empty the class-list choice is hidden.
var REG = { form: "https://docs.google.com/forms/d/e/1FAIpQLSfvTY4rQbyLXEhrzTKrpOnvKXdQPrUw6PjT9DVftGHYivK2Xg/viewform", eName: "entry.90797002", eSid: "entry.790649759" };
var REG_TEXT = "Share my name and university ID with the instructor so that I am counted in the class list. Only the name and the ID are sent. My answers and progress stay on this device. To leave the list later, I will ask the instructor.";
function regReady(){ return !!(REG.form && REG.eName && REG.eSid); }
function regSend(name, sid){
  var url = REG.form.replace(/\/viewform.*$/, "/formResponse"), body = new URLSearchParams();
  body.append(REG.eName, name); body.append(REG.eSid, sid);
  return fetch(url, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: body.toString() }).then(function(){
    STORE.joined = { sid: sid, date: today() }; saveStore(); return true;
  });
}
function onList(){ return !!(STORE.joined && STORE.joined.sid && STORE.joined.sid === STORE.sid); }
function showLanding(){ return !STORE.welcomed || !!S.editId; }
function pWelcome(){
  var first = !STORE.welcomed, edit = !!S.editId, joined = onList();
  var consent = !regReady() ? "" : joined ? '<p class="mut wjoined">You are on the class list since ' + esc2(STORE.joined.date) + ". To leave the list, ask the instructor.</p>"
    : '<label class="wconsent"><input type="checkbox" id="regIn"><span>' + REG_TEXT + "</span></label>";
  $("page").innerHTML = '<section class="card welcome"><h1 class="wtitle">Circuit Hub</h1><p class="wsub">ME0212 Electrical Circuits &amp; Machines · German Jordanian University</p>' +
    (first ? '<p class="wtext">Study each topic, watch the animations, work through solved examples, then practise with questions and test yourself with quizzes. Everything follows the course slides.</p>' +
      '<ul class="wlist"><li><b>Study</b><span>short lessons with animations</span></li><li><b>Practice</b><span>questions solved step by step</span></li><li><b>Quiz</b><span>test one topic or a whole chapter</span></li></ul>' : "") +
    '<h2 class="sh">' + (edit ? "Your details" : "Your details (optional)") + '</h2><p class="mut">They stay on this device and appear on your progress report. You can use the site without them.</p>' +
    '<div class="idrow"><label class="idf"><span>Full name</span><input id="nameIn" type="text" placeholder="Your full name" autocomplete="name" maxlength="60" value="' + esc2(STORE.name || "") + '"></label>' +
    '<label class="idf"><span>University ID</span><input id="sidIn" type="text" inputmode="numeric" placeholder="e.g. 20231234" maxlength="20" value="' + esc2(STORE.sid || "") + '"></label></div>' +
    consent + '<p class="msg" id="idmsg" role="alert"></p><div class="row"><button class="btn wstart" data-a="start">' + (edit ? "Save" : "Start") + "</button>" + (edit ? '<button class="btn ghost" data-a="canceledit">Cancel</button>' : "") + "</div></section>";
}

// ---------- dashboard ----------
function pDash(){
  if (showLanding()) return pWelcome();
  var s = allStats(), w = weak(), h = "";
  if (STORE.help) h += '<section class="card howto"><h2 class="sh">How to use Circuit Hub</h2><ol><li><b>Pick a chapter</b> from the cards below.</li><li><b>Study:</b> pick a topic, read it and press Watch to see the animation.</li><li><b>Examples:</b> worked examples of the topic, one step at a time.</li><li><b>Practice:</b> questions with the solution after every answer.</li><li><b>Quiz:</b> test one topic or the whole chapter.</li></ol><p class="mut">Your progress is saved on this device only. Each answer shows its source in the book or the slides.</p><button class="btn sm ghost" data-a="hidehelp">Hide this</button></section>';
  var f = s.total ? s.seen / s.total : 0;
  h += '<section class="card trace"><div class="trace-top"><h1>' + (STORE.name ? "Hello, " + esc2(STORE.name.split(" ")[0]) : "Dashboard") + '</h1><div class="read"><b>' + s.seen + "</b> of " + s.total + " questions seen</div></div>" + trace(f, s.seen + " of " + s.total + " questions seen") + "</section>";
  h += '<div class="stats">' + stat(s.n, "Answers given") + stat(s.acc == null ? "–" : s.acc + "%", "Accuracy") + stat(streak(), "Day streak") + stat(CHAPTER_IDS.length, "Chapters") + "</div>";
  h += '<h2 class="sh">Chapters</h2><div class="chgrid">' + CHAPTER_IDS.map(function(c){ var x = chStats(c); return '<section class="card chc">' + ring(x.acc, "Accuracy " + (x.acc == null ? "none" : x.acc + "%")) + "<div><h3>" + chL(c) + "</h3><p>" + CHAPTERS[c].title + '</p><p class="mut">' + x.seen + " of " + x.total + " questions seen</p>" + bar(Math.round(100 * x.seen / x.total)) +
    '<div class="row">' + MTABS.map(function(t, k){ return '<button class="btn sm' + (k ? " ghost" : "") + '" data-a="study" data-v="' + c + '" data-t="' + t[0] + '">' + t[1] + "</button>"; }).join("") + '</div></div></section>'; }).join("") + "</div>";
  h += '<div class="grid2"><section class="card"><h2 class="sh">Needs work</h2>' + (w.length ? w.map(function(x){ return '<div class="wk"><span><b>' + x.topic + "</b> · " + chL(x.ch) + '</span><span>' + x.acc + '%</span><button class="btn sm ghost" data-a="praction" data-v="' + x.ch + "|" + x.topic + '">Practise</button></div>'; }).join("") : '<p class="mut">Topics below 70% appear here after a few answers.</p>') + '</section><section class="card"><h2 class="sh">Badges</h2><div class="badges">' + badges().map(function(b){ return '<div class="bdg ' + (b[2] ? "on" : "") + '" title="' + b[1] + '"><b>' + b[0] + "</b><span>" + b[1] + "</span></div>"; }).join("") + "</div></section></div>";
  $("page").innerHTML = h;
}
function stat(v, l){ return '<div class="stat"><b>' + v + "</b><span>" + l + "</span></div>"; }

// ---------- study ----------
var MTABS = [["study", "Study"], ["practice", "Practice"], ["quiz", "Quiz"]];
var VIEWS = [["learn", "Explanation"], ["watch", "Watch"], ["calc", "Calculator"]];
function tpcs(){ return LESSONS[S.ch].map(function(l){ return l.t; }); }
function curTopic(){ return S.ti < 0 ? "all" : tpcs()[S.ti]; }
function topicCount(c, t){ return POOL[c].filter(function(d){ return d.topic === t; }).length; }
function pStudy0(){
  var tp = tpcs(); if (S.ti >= tp.length) S.ti = -1;
  WHOST = null; CHOST = null; EXHOST = null;
  $("page").innerHTML = '<div class="chead"><div><div class="lbl">' + chL(S.ch) + '</div><h1 class="ph">' + CHAPTERS[S.ch].title + '</h1></div><div class="row"><button class="btn ghost" data-a="sheet" data-v="' + S.ch + '">Formula sheet</button><button class="btn ghost" data-a="fx">Calculator</button></div></div>' +
    '<nav class="tabs main" role="tablist" aria-label="Chapter sections">' + MTABS.map(function(t){ return '<button class="tab" role="tab" data-a="mtab" data-v="' + t[0] + '" aria-selected="' + (S.tab === t[0]) + '">' + t[1] + "</button>"; }).join("") + "</nav>" +
    '<div id="ctab" class="ctab"></div>';
  if (S.tab === "study") rLearn();
  else if (S.tab === "practice") rPracticeTab();
  else rQuizTab();
}

  function topicBar(){
    var tp = tpcs(), all = S.tab !== "study";
    return '<nav class="topicbar" aria-label="Topics of this chapter">' + (all ? '<button class="pill" data-a="topic" data-v="-1" aria-pressed="' + (S.ti < 0) + '">All topics</button>' : "") +
      tp.map(function(t, i){ return '<button class="pill" data-a="topic" data-v="' + i + '" aria-pressed="' + (S.ti === i) + '">' + (i + 1) + ". " + t + "</button>"; }).join("") + "</nav>";
  }
  function nextCh(d){ var k = CHAPTER_IDS.indexOf(S.ch) + d; return k >= 0 && k < CHAPTER_IDS.length ? CHAPTER_IDS[k] : null; }
  function topicFoot(){
    var tp = tpcs(), i = S.ti; if (i < 0) return "";
    var prev = i > 0 ? "Previous topic" : (nextCh(-1) ? "Previous chapter" : null), next = i < tp.length - 1 ? "Next topic" : (nextCh(1) ? "Next chapter" : null);
    return '<div class="topicfoot"><div>' + (prev ? '<button class="btn ghost" data-a="tstep" data-v="-1">&larr; ' + prev + '</button>' : "") + '</div><span class="mut">Topic ' + (i + 1) + " of " + tp.length + '</span><div>' + (next ? '<button class="btn" data-a="tstep" data-v="1">' + next + ' &rarr;</button>' : "") + "</div></div>";
  }
  function tstep(d){
    var i = S.ti + d, n = tpcs().length; pushHist();
    if (i < 0 || i >= n){ var c = nextCh(d); if (!c) return; S.ch = c; i = d > 0 ? 0 : LESSONS[c].length - 1; }
    S.ti = i; if (S.tab === "practice"){ PR.q = null; PR.last = null; } render(); window.scrollTo(0, 0);
  }
  function lessonCard(l, i){
    var id = IDEAS[l.t], hasW = id && id.w != null, hasX = exList(i).length || genList(i).length;
    return '<section class="card lesson" id="les' + i + '"><h2>' + l.t + "</h2>" + (id ? '<p class="idea"><b>In plain words.</b> ' + id.i + "</p>" : "") + "<ul>" + l.pts.map(function(p){ return "<li>" + p + "</li>"; }).join("") + "</ul>" +
      (l.f ? '<div class="fl">' + l.f.map(function(f){ return '<span class="formula">' + fmtMath(f) + "</span>"; }).join(" ") + "</div>" : "") + (l.fig ? fig(l.fig()) : "") + (LREF[l.t] ? '<p class="srcl"><span>Source: ' + LREF[l.t] + "</span></p>" : "") + (id ? '<p class="slip"><b>Common slip.</b> ' + id.s + "</p>" : "") +
      '<div class="btnrow">' + (hasW ? '<button class="btn" data-watch="' + id.w + '" data-les="' + i + '" aria-expanded="false">Watch</button>' : "") + (hasX ? '<button class="btn ghost" data-exb="' + i + '" aria-expanded="false">Examples</button>' : "") + '</div><div class="wpanel" id="wp' + i + '"></div><div class="wpanel" id="ep' + i + '"></div></section>';
  }
  function rLearn(){
    if (S.ti < 0) S.ti = 0;
    $("ctab").innerHTML = topicBar() + '<div class="lessons">' + lessonCard(LESSONS[S.ch][S.ti], S.ti) + '</div>' +
      (TOOLS[S.ch] && TOOLS[S.ch].length ? '<details class="card calcwrap"><summary><span>Chapter tools</span><b>Try your own numbers</b></summary><div id="calcbox"></div></details>' : "") + topicFoot();
    var open = null, openX = null;
    function closeW(){ if (open != null){ var o = $("wp" + open); if (o) o.innerHTML = ""; var ob = document.querySelector('[data-les="' + open + '"]'); if (ob){ ob.setAttribute("aria-expanded", "false"); ob.textContent = "Watch"; } open = null; WHOST = null; } }
    function closeX(){ if (openX != null){ var o = $("ep" + openX); if (o) o.innerHTML = ""; var ob = document.querySelector('[data-exb="' + openX + '"]'); if (ob){ ob.setAttribute("aria-expanded", "false"); ob.textContent = "Examples"; } openX = null; EXHOST = null; } }
    $("ctab").querySelectorAll("[data-watch]").forEach(function(b){ b.onclick = function(){
      var i = +b.dataset.les, was = open === i; closeW(); if (was) return;
      open = i; b.setAttribute("aria-expanded", "true"); b.textContent = "Hide animation"; WHOST = $("wp" + i);
      (WSIM[S.ch] = WSIM[S.ch] || {}).k = +b.dataset.watch; rWatch();
    }; });
    $("ctab").querySelectorAll("[data-exb]").forEach(function(b){ b.onclick = function(){
      var i = +b.dataset.exb, was = openX === i; closeX(); if (was) return;
      openX = i; b.setAttribute("aria-expanded", "true"); b.textContent = "Hide examples"; EXHOST = $("ep" + i); EXCH = S.ch; rExamples(EXHOST, i);
    }; });
    var cw = document.querySelector(".calcwrap"); if (cw) cw.addEventListener("toggle", function(){ if (cw.open) rCalc($("calcbox")); else { $("calcbox").innerHTML = ""; CHOST = null; } });
  }

  var EXS = {}, EXCH = "1";
  function exLabel(id){ if (/^[PX]\d+$/.test(id)) return "Worked example"; return /^\d+\.\d+N$/.test(id) ? "Example " + id.replace("N", "") + " (Norton)" : /^\d+\.\d+$/.test(id) ? "Example " + id : id; }
  function exSrc(ch, id, topic){
    if (/^[PX]\d+$/.test(id)) return "Worked example on a slide topic" + (topic && LREF[topic] ? ": " + LREF[topic] : "");
    var m = /^(\d+\.\d+)/.exec(id);
    if (m && EXP[m[1]]) return "Book Example " + m[1] + ", p. " + EXP[m[1]];
    if (/^Table 5\.1/.test(id)) return "Book Table 5.1, p. 149 · Slide 23";
    if (/^Slide/.test(id)) return id + " (Chapter " + ch + ")";
    if (/^§/.test(id)) return "Book " + id;
    return CHREF[ch] || "";
  }
  var EXHOST = null;
  function exList(ti){ var l = EXAMPLES[S.ch] || [], t = LESSONS[S.ch][ti].t; return l.filter(function(e){ return e.topic === t; }); }
  function genList(ti){ var l = GENS[S.ch] || [], t = LESSONS[S.ch][ti].t; return l.filter(function(g){ return g.topic === t; }); }
  function rExamples(host, ti){
    if (!host) return;
    var list = exList(ti), gl = genList(ti), key = S.ch + "|" + ti, st = EXS[key] || (EXS[key] = { k: 0, n: 0, gen: null }), ex;
    if (!list.length && !gl.length){ host.innerHTML = '<section class="card"><p>Examples for this topic are being added.</p></section>'; return; }
    if (st.k === "gen" && !gl.length) st.k = 0;
    if (st.k === "gen" || !list.length){
      st.k = "gen";
      if (!st.gen){ var g = gl[Math.floor(Math.random() * gl.length)], r = g.make(); st.gen = { id: "New example", t: g.topic, q: r.q, steps: String(r.sol).split(/\n+/), ans: nn(r.ans) + " " + r.unit, figH: r.fig, gen: true }; }
      ex = st.gen;
    } else ex = list[st.k] || list[0];
    var pills = list.map(function(e, i){ return '<button class="pill" data-exk="' + i + '" aria-pressed="' + (st.k === i) + '">' + (/^[PX]\d+$/.test(e.id) ? "Example " + (i + 1) : exLabel(e.id)) + "</button>"; }).join("") + (gl.length ? '<button class="pill gen" data-exk="gen" aria-pressed="' + (st.k === "gen") + '">New random example</button>' : "");
    var fh = ex.figH || (ex.fig ? ex.fig() : ""), steps = ex.steps, n = Math.min(st.n, steps.length), done = n >= steps.length;
    var h = '<div class="picker">' + pills + '</div><div class="grid2 wide-left exgrid"><section class="card excard"><div class="lbl">' + (ex.gen ? "Generated example · " + ex.t : exLabel(ex.id)) + "</div><h2>" + (ex.gen ? "Worked example with new numbers" : ex.t) + '</h2><p class="exq">' + ex.q + "</p>" + (fh ? fig(fh) : "");
    if (ex.given) h += '<div class="gf"><div><b>Given</b><span>' + ex.given + "</span></div><div><b>Find</b><span>" + ex.find + "</span></div></div>";
    h += '</section><section class="card"><h2 class="sh">Solution, step by step</h2><ol class="exsteps">' + steps.slice(0, n).map(function(s, i){ return '<li><span>Step ' + (i + 1) + "</span><div>" + fmtMath(s) + "</div></li>"; }).join("") + "</ol>";
    if (!n) h += '<p class="mut">Try it on paper first. Then open the steps one at a time.</p>';
    h += '<div class="btnrow">' + (done ? "" : '<button class="btn" id="exNext">' + (n ? "Show next step" : "Show the first step") + '</button><button class="btn ghost" id="exAll">Show all steps</button>') + (n ? '<button class="btn ghost" id="exHide">Hide the steps</button>' : "") + "</div>";
    if (done) h += '<div class="st2a exans">Answer: ' + fmtMath(ex.ans) + "</div>" + (ex.gen ? '<button class="btn sm ghost" id="exNew">Another one</button>' : '<p class="srcl"><span>Source: ' + exSrc(EXCH, ex.id, ex.topic) + "</span></p>");
    h += '<p class="mut exprog">Step ' + n + " of " + steps.length + "</p></section></div>";
    host.innerHTML = h;
    host.querySelectorAll("[data-exk]").forEach(function(b){ b.onclick = function(){ var v = b.dataset.exk; st.k = v === "gen" ? "gen" : +v; st.n = 0; if (v === "gen") st.gen = null; rExamples(host, ti); }; });
    var f = function(id, fn){ var e = host.querySelector("#" + id); if (e) e.onclick = fn; };
    f("exNext", function(){ st.n++; rExamples(host, ti); }); f("exAll", function(){ st.n = steps.length; rExamples(host, ti); }); f("exHide", function(){ st.n = 0; rExamples(host, ti); }); f("exNew", function(){ st.gen = null; st.n = 0; rExamples(host, ti); });
  }

  var CHOST = null;
  function rCalc(host){
    if (host) CHOST = host; var H = CHOST || H;
    var tools = TOOLS[S.ch], k = CALC[S.ch] || 0, t = tools[k];
    H.innerHTML = '<div class="picker">' + tools.map(function(x, i){ return '<button class="pill" data-tool="' + i + '" aria-pressed="' + (i === k) + '">' + x.name + "</button>"; }).join("") + "</div>" +
      '<div class="grid2 wide-left"><section class="card"><p class="hint">' + t.hint + "</p>" + t.fields() + '<div class="btnrow"><button class="btn" id="goCalc">Calculate</button></div><div class="msg" id="cmsg" role="alert"></div></section>' +
      '<section class="card"><div id="cfig"></div><div class="steps" id="csteps"></div></section></div>';
    var run = function(){
      var r = t.run();
      if (r.msg){ $("cmsg").textContent = r.msg; $("csteps").textContent = ""; return; }
      $("cmsg").textContent = ""; $("cfig").innerHTML = r.raw ? fig(r.fig) : fig(r.fig); $("csteps").innerHTML = r.steps;
    };
    $("goCalc").onclick = run;
    H.querySelectorAll("input,select").forEach(function(el){ el.addEventListener("input", run); el.addEventListener("change", run); });
    run();
  }




// ---------- formula sheet ----------
function pSheet0(){
  var h = '<div class="chead"><div><div class="lbl">' + chL(S.ch) + '</div><h1 class="ph">Formula sheet · ' + CHAPTERS[S.ch].title + '</h1></div><div class="row"><button class="btn" data-a="print">Print or save as PDF</button></div></div><section class="card sheet">';
  h += LESSONS[S.ch].map(function(l){ return '<div class="srow"><h2>' + l.t + "</h2>" + (l.f ? "<p>" + l.f.map(function(f){ return '<span class="formula">' + f + "</span>"; }).join(" ") + "</p>" : "") + "<ul>" + l.pts.map(function(p){ return "<li>" + p + "</li>"; }).join("") + "</ul>" + (LREF[l.t] ? '<p class="srcl"><span>Source: ' + LREF[l.t] + "</span></p>" : "") + "</div>"; }).join("");
  $("page").innerHTML = h + '</section><p class="mut printnote">Circuit Hub · version ' + APP_VERSION + "</p>";
}

// ---------- practice ----------
function rPracticeTab(){
  PR.ch = S.ch; PR.topic = curTopic();
  var n = poolPractice().length;
  $("ctab").innerHTML = topicBar() + '<section class="card filters"><div class="field2"><label for="fty">Type</label><select id="fty" data-a="pf"><option value="mixed"' + (PR.type === "mixed" ? " selected" : "") + '>Mixed</option><option value="mcq"' + (PR.type === "mcq" ? " selected" : "") + '>Multiple choice</option><option value="num"' + (PR.type === "num" ? " selected" : "") + '>Numeric (new numbers every time)</option></select></div><p class="mut pcount">' + n + ' questions in ' + (S.ti < 0 ? "this chapter, mixed from all topics" : "the topic " + curTopic()) + ', each solved step by step.' + (S.ti < 0 ? "" : ' <button class="linkb" data-a="topic" data-v="-1">Show the whole chapter</button>') + '</p><div class="sesbox"><b>' + PR.ses.r + " / " + PR.ses.n + '</b><span>this session</span></div></section><div id="qarea"></div>' + topicFoot();
  if (!PR.q || PR.q.d.ch !== S.ch || (PR.topic !== "all" && PR.q.d.topic !== PR.topic)) nextPractice(); else drawQ();
}
function pPractice0(){ S.page = "study"; S.tab = "practice"; render(); }
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
    h += '<div class="numrow"><input id="numIn" type="text" inputmode="decimal" autocomplete="off" placeholder="Your answer" aria-label="Your answer" value="' + esc2(st.val || "") + '"' + (st.done ? " disabled" : "") + '><span class="un">' + (q.unit || "") + "</span>" + (st.done || st.quiz ? "" : '<button class="btn" data-a="check">Check</button>') + "</div>" + (st.done || st.quiz ? "" : '<p class="numhint">Answers within 1.5% are accepted. A prefix may be typed, for example 0.71 mA or 710 µA.</p>');
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
function stepsOf(text, finalLabel){
  var t = String(text || "").trim(), parts = t.indexOf("\n") >= 0 ? t.split(/\n+/) : t.split(/(?<=[.!?])\s+(?=[A-Z0-9(Ccdefghijklmnopqrstuvwxyzαβγδφωπ√ΣIVRPQZ])/);
  parts = parts.map(function(s){ return s.trim(); }).filter(Boolean);
  // expand a chained line "X = formula = numbers = result" into formula, values and result steps
  var out = [];
  parts.forEach(function(p){
    var seg = p.replace(/\.$/, "").split(" = ");
    if (seg.length >= 3 && /[A-Za-zα-ωΩ√]/.test(seg[1]) && seg[0].length < 40 && !/\s(and|so|then|with)\s/.test(seg[0])){
      out.push("Use the formula: " + seg[0] + " = " + seg[1]);
      if (seg.length > 3) out.push("Put in the values: " + seg[0] + " = " + seg.slice(2, -1).join(" = "));
      out.push("Result: " + seg[0] + " = " + seg[seg.length - 1]);
    } else out.push(p);
  });
  parts = out;
  if (!parts.length) return "";
  var h = '<div class="steps2"><div class="st2h">Solution, step by step</div><ol>';
  parts.forEach(function(p, i){ h += "<li" + (i === parts.length - 1 && parts.length > 1 ? ' class="last"' : "") + "><span>Step " + (i + 1) + "</span><div>" + fmtMath(esc2(p)) + "</div></li>"; });
  h += "</ol>";
  if (finalLabel) h += '<div class="st2a">Answer: ' + esc2(finalLabel) + "</div>";
  return h + "</div>";
}
function srcLine(q){
  var s = srcOf(q.d.ch, q.d.topic, q.text + " " + (q.sol || "") + " " + (q.why || ""));
  var body = "" + chL(q.d.ch) + " · " + q.d.topic + "\nQuestion: " + q.text + "\n\nWhat is wrong:\n\n(App version " + APP_VERSION + ")";
  var mail = feedbackLink("Circuit Hub: problem in " + chL(q.d.ch), chL(q.d.ch) + " · " + q.d.topic, body);
  return '<p class="srcl">' + (s ? "<span>Source: " + s + "</span>" : "") + '<a href="' + mail + '"' + (FEEDBACK.form ? ' target="_blank" rel="noopener"' : "") + '>Report a problem</a></p>';
}
function feedback(q, st){
  if (q.kind === "bank") return '<div class="fb" role="status"><b>Worked answer</b>' + stepsOf(q.ans) + '</div><div class="row"><span class="mut">Did you get it?</span><button class="btn" data-a="self" data-v="1">I got it</button><button class="btn ghost" data-a="self" data-v="0">Not yet</button></div>' + srcLine(q);
  var good = st.ok, h = '<div class="fb ' + (good ? "good" : "bad") + '" role="status"><b>' + (good ? "Correct." : "Not quite.") + "</b> ";
  if (q.kind === "mcq") h += (good ? "" : "The answer is: " + esc2(q.opts[q.correct]) + ".") + stepsOf(q.why, q.opts[q.correct]);
  if (q.kind === "num") h += (good ? "" : "The answer is " + nn(q.ans) + " " + q.unit + ".") + stepsOf(q.sol, nn(q.ans) + " " + q.unit);
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
  S.page = "study"; S.tab = "quiz"; S.ch = QZCH; render();
}
function quizPool(){
  var l = chDescs(S.ch); if (S.ti >= 0) l = l.filter(function(d){ return d.topic === curTopic(); });
  return l.filter(function(d){ return d.kind === "mcq" || d.kind === "num"; });
}
function rQuizTab(){
  var n = quizPool().length, opts = [5, 10, 20].filter(function(x){ return x <= Math.max(5, n); }); if (opts.indexOf(QZN) < 0) QZN = opts[opts.length - 1];
  $("ctab").innerHTML = topicBar() + '<section class="card"><h2 class="sh">' + (S.ti < 0 ? "Quiz on the whole chapter" : "Quiz: " + curTopic()) + '</h2><p>Multiple-choice and numeric questions. Ten questions are planned for ten minutes. The solutions and sources appear at the end.</p><div class="filters2"><div class="field2"><label for="qn">Questions</label><select id="qn">' + opts.map(function(x){ return "<option" + (QZN === x ? " selected" : "") + ">" + x + "</option>"; }).join("") + '</select></div></div><div class="row"><button class="btn" data-a="startquiz">Start quiz</button></div></section>' + quizHistory() + topicFoot();
}
function quizHistory(){
  var q = STORE.quizzes.slice(-5).reverse(); if (!q.length) return "";
  return '<section class="card"><h2 class="sh">Recent quizzes</h2>' + q.map(function(x){ var p = Math.round(100 * x.score / x.total); return '<div class="wk"><span>' + x.date + " · " + (x.ch === "all" ? "All chapters" : "" + chL(x.ch)) + (x.topic && x.topic !== "all" ? " · " + x.topic : "") + "</span><span>" + x.score + " / " + x.total + " (" + p + "%)</span>" + bar(p, p >= 80 ? "ok" : p < 50 ? "low" : "") + "</div>"; }).join("") + "</section>";
}
function startQuiz(){
  QZN = +$("qn").value; QZCH = S.ch;
  var all = quizPool(), mc = shuffle(all.filter(function(d){ return d.kind === "mcq"; })), nu = shuffle(all.filter(function(d){ return d.kind === "num"; }));
  var N = Math.min(QZN, mc.length + nu.length), nNum = Math.min(nu.length, Math.round(N * 0.3)), items = mc.slice(0, N - nNum).concat(nu.slice(0, nNum));
  if (items.length < N) items = items.concat(nu.slice(nNum, nNum + N - items.length));
  var qs = shuffle(items).map(instantiate);
  QZ = { stage: "run", qs: qs, i: 0, ans: [], ch: QZCH, topic: curTopic(), t0: Date.now() }; go("quiz");
}
function drawQuiz(){
  var q = QZ.qs[QZ.i], st = QZ.cur || {};
  $("page").innerHTML = '<div class="qzbar"><b>Question ' + (QZ.i + 1) + " of " + QZ.qs.length + "</b>" + bar(Math.round(100 * QZ.i / QZ.qs.length)) + '<span class="clock" id="qzclock"></span><button class="btn sm ghost" data-a="quitquiz">Quit</button></div><section class="card qcard">' + qbody(q, { done: false, quiz: true, picked: st.picked, val: st.val }) +
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
    STORE.quizzes.push({ ch: QZ.ch, topic: QZ.topic, score: sc, total: QZ.qs.length, date: today() }); saveStore();
  }
  render();
}
function drawResult(){
  var p = Math.round(100 * QZ.score / QZ.qs.length), h = '<h1 class="ph">Quiz result</h1><section class="card res"><div class="big">' + QZ.score + " / " + QZ.qs.length + "</div><div>" + p + "% · " + Math.floor(QZ.secs / 60) + " min " + (QZ.secs % 60) + ' s</div>' + bar(p, p >= 80 ? "ok" : p < 50 ? "low" : "") + '<div class="row"><button class="btn" data-a="againquiz">New quiz</button><button class="btn ghost" data-a="go" data-v="dash">Dashboard</button></div></section><h2 class="sh">Review</h2>';
  h += QZ.qs.map(function(q, i){ var a = QZ.ans[i], right = q.kind === "mcq" ? q.opts[q.correct] : nn(q.ans) + " " + q.unit, mine = q.kind === "mcq" ? (a.picked == null ? "no answer" : q.opts[a.picked]) : (a.val || "no answer");
    return '<section class="card rv ' + (a.ok ? "good" : "bad") + '"><div class="qmeta"><span class="chip">' + (a.ok ? "Correct" : "Wrong") + '</span><span class="chip alt">' + q.d.topic + '</span></div><div class="qtext2">' + (i + 1) + ". " + esc2(q.text) + "</div>" + (q.fig && !a.ok ? fig(q.fig) : "") + '<p><b>Your answer:</b> ' + esc2(mine) + "</p>" + (a.ok ? "" : "<p><b>Correct answer:</b> " + esc2(right) + "</p>") + stepsOf(q.kind === "mcq" ? q.why : q.sol, right) + srcLine(q) + "</section>"; }).join("");
  $("page").innerHTML = h;
}

// ---------- progress ----------
function pProgress0(){
  var s = allStats(), h = '<h1 class="ph">My progress</h1><section class="card idcard"><div><b>' + esc2(STORE.name || "Name not set") + '</b><span class="mut"> · University ID: ' + esc2(STORE.sid || "not set") + '</span>' + (regReady() && onList() ? '<div class="mut">On the class list since ' + esc2(STORE.joined.date) + '</div>' : '') + '</div><div class="row">' + (regReady() && !onList() ? '<button class="btn sm" data-a="joinclass">Join the class list</button>' : '') + '<button class="btn sm ghost" data-a="editid">Edit name and ID</button></div></section><div class="stats">'  + stat(s.n, "Answers given") + stat(s.acc == null ? "–" : s.acc + "%", "Accuracy") + stat(STORE.quizzes.length, "Quizzes taken") + stat(streak(), "Day streak") + "</div>";
  h += CHAPTER_IDS.map(function(c){ var rows = topicsOf(c).map(function(t){ var x = STORE.t[c + "|" + t], p = x && x.n ? Math.round(100 * x.r / x.n) : null; return '<div class="trow"><span>' + t + '</span><span class="mut">' + (x ? x.r + " / " + x.n : "not tried") + "</span>" + bar(p || 0, p == null ? "" : p >= 80 ? "ok" : p < 60 ? "low" : "") + "<span>" + (p == null ? "–" : p + "%") + "</span></div>"; }).join("");
    return '<section class="card"><h2 class="sh">' + chL(c) + " · " + CHAPTERS[c].title + "</h2>" + rows + "</section>"; }).join("");
  h += quizHistory() + '<section class="card"><h2 class="sh">Share or reset</h2><p class="mut">Your progress is stored in this browser only' + (memOnly ? " (storage is blocked, so it will be lost when you close the page)" : "") + '. To show your instructor, copy or save the summary.</p><div class="row"><button class="btn" data-a="copysum">Copy summary</button><button class="btn ghost" data-a="dlsum">Save as text file</button><button class="btn ghost danger" data-a="reset">Reset all progress</button></div><div id="sumMsg" class="mut"></div></section>' +
    '<section class="card"><h2 class="sh">Move your progress to another device</h2><p class="mut">Save a progress file, then load it on your phone, laptop or a new browser. The file stays with you and is not sent anywhere.</p><div class="row"><button class="btn" data-a="dlprog">Download progress file</button><button class="btn ghost" data-a="ldprog">Load progress file</button><input type="file" id="progFile" accept=".json,application/json" hidden></div><div id="progMsg" class="mut" role="status"></div></section>';
  $("page").innerHTML = h;
}
// progress file: save and load the whole progress of this device
function progressFile(){ return JSON.stringify({ app: "circuit-hub", version: APP_VERSION, saved: today(), data: STORE }); }
function loadProgressText(txt){
  var o; try { o = JSON.parse(txt); } catch (e) { return "This is not a progress file."; }
  var d = o && o.app === "circuit-hub" ? o.data : null;
  if (!d || typeof d.a !== "object" || typeof d.t !== "object" || !Array.isArray(d.quizzes)) return "This is not a Circuit Hub progress file.";
  if (!confirm("Replace the progress on this device with the file? Name: " + (d.name || "not set") + ", saved " + (o.saved || "?") + ".")) return "Nothing was changed.";
  var keep = STORE.help; for (var k in STORE) if (d[k] != null) STORE[k] = d[k]; STORE.help = keep; saveStore(); render();
  return "Progress loaded.";
}
function summaryText(){
  var s = allStats(), t = "Circuit Hub progress\nName: " + (STORE.name || "(not set)") + "\nUniversity ID: " + (STORE.sid || "(not set)") + "\nDate: " + today() + "\nAnswers: " + s.n + ", accuracy: " + (s.acc == null ? "-" : s.acc + "%") + ", questions seen: " + s.seen + " of " + s.total + "\n";
  CHAPTER_IDS.forEach(function(c){ var x = chStats(c); t += "" + chL(c) + ": " + x.seen + "/" + x.total + " seen, accuracy " + (x.acc == null ? "-" : x.acc + "%") + "\n"; });
  STORE.quizzes.slice(-10).forEach(function(q){ t += "Quiz " + q.date + " " + chL(q.ch) + ": " + q.score + "/" + q.total + "\n"; });
  return t;
}

// ---------- events ----------
document.addEventListener("change", function(e){
  var f = e.target && e.target.id === "progFile" && e.target.files && e.target.files[0]; if (!f) return;
  var rd = new FileReader(); rd.onload = function(){ var m = loadProgressText(String(rd.result)); var el = $("progMsg"); if (el) el.textContent = m; }; rd.readAsText(f); e.target.value = "";
});
document.addEventListener("click", function(e){
  var mi = e.target.closest && e.target.closest("#fxwin .fxi[data-i]");
  if (mi && FX.view === "menu"){ FX.menu.sel = +mi.dataset.i; FX.menu.items[FX.menu.sel].f(); fxRender(); return; }
  var b = e.target.closest("[data-a]"); if (!b || b.tagName === "SELECT") return;
  var a = b.dataset.a, v = b.dataset.v;
  if (a === "go") go(v);
  else if (a === "back") goBack();
  else if (a === "study"){ var tb = b.dataset.t || "study"; S.view = "learn"; S.ti = tb === "study" ? 0 : -1; PR.q = null; go("study", v, tb); }
  else if (a === "mtab"){ if (S.tab !== v){ pushHist(); S.tab = v; if (v === "study" && S.ti < 0) S.ti = 0; render(); window.scrollTo(0, 0); } }
  else if (a === "topic"){ if (S.ti !== +v){ pushHist(); S.ti = +v; if (S.tab === "practice") { PR.q = null; PR.last = null; } render(); } }
  else if (a === "tstep") tstep(+v);
  else if (a === "tool"){ }
  else if (a === "praction"){ var p = v.split("|"); PR.q = null; PR.last = null; S.view = "learn"; S.ti = Math.max(0, LESSONS[p[0]].map(function(l){ return l.t; }).indexOf(p[1])); go("study", p[0], "practice"); render(); }
  else if (a === "start"){
    var n = $("nameIn").value.trim(), id = $("sidIn").value.trim(), want = $("regIn") && $("regIn").checked, msg = $("idmsg");
    if (id && !/^[0-9A-Za-z-]{4,20}$/.test(id)){ msg.textContent = "The university ID needs at least 4 letters or digits."; return; }
    if (want && (!n || !id)){ msg.textContent = "To join the class list, enter both your name and your ID, or untick the box."; return; }
    STORE.name = n; STORE.sid = id; STORE.welcomed = 1; S.editId = false; saveStore();
    var go1 = function(){ render(); window.scrollTo(0, 0); };
    if (want && regReady() && !(STORE.joined && STORE.joined.sid === id)){ b.disabled = true; regSend(n, id).then(go1, function(){ STORE.joined = null; go1(); }); } else go1(); }
  else if (a === "canceledit"){ S.editId = false; render(); }
  else if (a === "joinclass"){
    if (!STORE.name || !STORE.sid){ S.editId = true; go("dash"); return; }
    if (confirm(REG_TEXT + "\n\nName: " + STORE.name + "\nID: " + STORE.sid)) regSend(STORE.name, STORE.sid).then(function(){ render(); });
  }
  else if (a === "editid"){ S.editId = true; go("dash"); }
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
  else if (a === "fx"){ fxToggle(); }
  else if (a === "print"){ window.print(); }
  else if (a === "againquiz"){ QZ = null; render(); }
  else if (a === "copysum"){ var t = summaryText(); function done(){ $("sumMsg").textContent = "Copied."; } if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(done, function(){ $("sumMsg").textContent = "Copy is blocked here. Use Save as text file."; }); else $("sumMsg").textContent = "Copy is blocked here. Use Save as text file."; }
  else if (a === "dlsum"){ var bl = new Blob([summaryText()], { type: "text/plain" }), u = URL.createObjectURL(bl), l = document.createElement("a"); l.href = u; l.download = "ME0212_progress.txt"; document.body.appendChild(l); l.click(); l.remove(); setTimeout(function(){ URL.revokeObjectURL(u); }, 500); }
  else if (a === "dlprog"){
    var blob = new Blob([progressFile()], { type: "application/json" }), url = URL.createObjectURL(blob), ln = document.createElement("a");
    ln.href = url; ln.download = "circuit-hub-progress" + (STORE.sid ? "-" + String(STORE.sid).replace(/[^0-9A-Za-z-]/g, "") : "") + ".json"; document.body.appendChild(ln); ln.click(); ln.remove(); setTimeout(function(){ URL.revokeObjectURL(url); }, 1000);
    $("progMsg").textContent = "Progress file downloaded. Keep it safe."; }
  else if (a === "ldprog"){ $("progFile").click(); }
  else if (a === "reset"){ if (confirm("Delete all your progress on this device?")){ STORE = { name: STORE.name, sid: STORE.sid, help: STORE.help, a: {}, t: {}, quizzes: [], days: [], seen: 0 }; saveStore(); render(); } }
  else if (b.dataset.tool != null){ }
});
document.addEventListener("change", function(e){
  var t = e.target;
  if (t.dataset.a === "pf"){ PR.type = $("fty").value; PR.q = null; PR.last = null; rPracticeTab(); }
  if (t.id === "qn") QZN = +t.value;
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
