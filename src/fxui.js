// ===== calculator window: keys, screens and menus =====
var FXROWS = [
  [{ id: "shift", p: "SHIFT", c: "mod" }, { id: "alpha", p: "ALPHA", c: "mod" }, { id: "left", p: "◀", c: "pad" }, { id: "up", p: "▲", c: "pad" }, { id: "down", p: "▼", c: "pad" }, { id: "right", p: "▶", c: "pad" }],
  [{ id: "menu", p: "MENU", s: "SETUP" }, { id: "optn", p: "OPTN" }, { id: "calc", p: "CALC", x: 1 }, { id: "integ", p: "∫▫", x: 1 }, { id: "inv", p: "x⁻¹", s: "x!", t: "⁻¹", ts: "!" }, { id: "frac", p: "▫⁄▫", s: "a b/c", t: "⁄", sx: 1 }],
  [{ id: "sqrt", p: "√▫", s: "∛▫", t: "√(", ts: "∛(" }, { id: "sq", p: "x²", s: "x³", t: "²", ts: "³" }, { id: "pow", p: "x▫", s: "ˣ√▫", t: "^", ts: "ˣ√" }, { id: "log", p: "log", s: "10ˣ", t: "log(", ts: "10^(" }, { id: "ln", p: "ln", s: "eˣ", t: "ln(", ts: "e^(" }, { id: "neg", p: "(−)", a: "A", t: "−", v: "A" }],
  [{ id: "deg", p: "°′″", a: "B", t: "°", v: "B" }, { id: "hyp", p: "hyp", a: "C", v: "C" }, { id: "sin", p: "sin", s: "sin⁻¹", a: "D", t: "sin(", ts: "sin⁻¹(", v: "D", h: "sinh(" }, { id: "cos", p: "cos", s: "cos⁻¹", a: "E", t: "cos(", ts: "cos⁻¹(", v: "E", h: "cosh(" }, { id: "tan", p: "tan", s: "tan⁻¹", a: "F", t: "tan(", ts: "tan⁻¹(", v: "F", h: "tanh(" }, { id: "rcl", p: "RCL", s: "STO" }],
  [{ id: "eng", p: "ENG", s: "i", ts: "i" }, { id: "lp", p: "(", s: "Abs", a: "Y", t: "(", ts: "abs(", v: "Y" }, { id: "rp", p: ")", s: ",", a: "X", t: ")", ts: ",", v: "X" }, { id: "sd", p: "S⇔D" }, { id: "mp", p: "M+", s: "M−", a: "M", v: "M" }, { id: "on", p: "ON", s: "OFF" }],
  "gap",
  [{ id: "7", p: "7", t: "7", sx: 1, s: "CONST" }, { id: "8", p: "8", t: "8", sx: 1, s: "CONV" }, { id: "9", p: "9", t: "9", sx: 1, s: "CLR" }, { id: "del", p: "DEL", s: "INS", c: "del" }, { id: "ac", p: "AC", s: "OFF", c: "del" }],
  [{ id: "4", p: "4", t: "4", s: "MATRIX", sk: "mat" }, { id: "5", p: "5", t: "5", s: "VECTOR", sx: 1 }, { id: "6", p: "6", t: "6", s: "" }, { id: "mul", p: "×", t: "×", s: "nPr", ts: "nPr" }, { id: "div", p: "÷", t: "÷", s: "nCr", ts: "nCr" }],
  [{ id: "1", p: "1", t: "1", s: "STAT", sx: 1 }, { id: "2", p: "2", t: "2", s: "CMPLX", sk: "cmplx" }, { id: "3", p: "3", t: "3", s: "BASE", sx: 1 }, { id: "add", p: "+", t: "+", s: "Pol", sx: 1 }, { id: "sub", p: "−", t: "−", s: "Rec", sx: 1 }],
  [{ id: "0", p: "0", t: "0", s: "Ran#", sx: 1 }, { id: "dot", p: ".", t: ".", s: "Ran", sx: 1 }, { id: "exp", p: "×10ˣ", t: "ᴇ", s: "π", ts: "π", a: "e", ta: "e" }, { id: "ans", p: "Ans", t: "Ans", s: "DRG▸", sx: 1 }, { id: "eq", p: "=", c: "eq", s: "" }]
];
var FXKEY = {}; FXROWS.forEach(function(r){ if (r !== "gap") r.forEach(function(k){ FXKEY[k.id] = k; }); });
var FXPOST = ["²", "³", "⁻¹", "!", "%", "°", "+", "−", "×", "÷", "⁄", "^", "ˣ√", "nPr", "nCr", "∠"];
function fxSet(t){ FX.tokens = t; FX.cur = t.length; }
function fxIns(tok){
  if (FX.done){ FX.done = false; if (FXPOST.indexOf(tok) >= 0) fxSet(["Ans"]); else fxSet([]); FX.out = ""; }
  FX.err = ""; FX.tokens.splice(FX.cur, 0, tok); FX.cur++;
}
function fxMenu(title, items, back){ FX.view = "menu"; FX.menu = { title: title, items: items, sel: 0, back: back || null }; }
function fxHome(){ FX.view = "calc"; FX.menu = null; FX.grid = null; FX.res = null; }
function fxTop(){
  fxMenu("MENU", [
    { l: "Calculate", f: fxHome },
    { l: "Equation", f: function(){ fxEqnMenu(); } },
    { l: "Matrix", f: function(){ fxMatMenu(); } }
  ]);
}
function fxSetup(){
  fxMenu("SETUP", [
    { l: "Angle unit", f: function(){ fxMenu("Angle unit", [{ l: "Degree", f: function(){ FX.angle = "deg"; fxHome(); } }, { l: "Radian", f: function(){ FX.angle = "rad"; fxHome(); } }, { l: "Gradian", f: function(){ FX.angle = "gra"; fxHome(); } }], fxSetup); } },
    { l: "Complex result", f: function(){ fxMenu("Complex result", [{ l: "a+bi", f: function(){ FX.cfmt = "rect"; fxHome(); } }, { l: "r∠θ", f: function(){ FX.cfmt = "polar"; fxHome(); } }], fxSetup); } },
    { l: "Number format", f: function(){ fxMenu("Number format", [{ l: "Norm", f: function(){ FX.eng = false; fxHome(); } }, { l: "Engineering", f: function(){ FX.eng = true; fxHome(); } }], fxSetup); } }
  ]);
}
function fxInsMenu(title, list){ fxMenu(title, list.map(function(t){ return { l: t.replace(/\($/, "("), f: function(){ fxHome(); fxIns(t); } }; })); }
function fxEqnMenu(){
  fxMenu("Equation", [
    { l: "aX+bY=c (2 unknowns)", f: function(){ fxLin(2); } },
    { l: "aX+bY+cZ=d (3 unknowns)", f: function(){ fxLin(3); } },
    { l: "aX²+bX+c=0", f: function(){ fxPoly(2); } },
    { l: "aX³+bX²+cX+d=0", f: function(){ fxPoly(3); } }
  ], fxTop);
}
function fxMatMenu(){
  fxMenu("Matrix: define", ["A", "B", "C"].map(function(L){ return { l: "Define Mat" + L, f: function(){ fxMatDim(L); } }; }), fxTop);
}
// ---- grid entry (equations and matrices) ----
function fxGrid(spec){
  FX.view = "grid"; FX.menu = null; FX.res = null; FX.done = false; FX.err = "";
  var vals = spec.vals || []; while (vals.length < spec.rows){ vals.push([]); }
  vals.forEach(function(r){ while (r.length < spec.cols) r.push(cx(0, 0)); });
  FX.grid = { spec: spec, vals: vals, r: 0, c: 0 }; fxSet([]);
}
function fxGridEnter(){
  var g = FX.grid, v;
  if (FX.tokens.length){ try { v = fxClean(fxEval(FX.tokens).v); if (v.t !== "C") throw fxErr("Math ERROR"); } catch (e){ FX.err = e.fx || "Syntax ERROR"; return; } g.vals[g.r][g.c] = v; }
  fxSet([]); FX.err = "";
  g.c++; if (g.c >= g.spec.cols){ g.c = 0; g.r++; }
  if (g.r >= g.spec.rows){ g.r = g.spec.rows - 1; g.c = g.spec.cols - 1; g.spec.done(g.vals); }
}
function fxGridMove(dr, dc){
  var g = FX.grid; if (FX.tokens.length) return;
  var c = g.c + dc, r = g.r + dr; if (c < 0 || c >= g.spec.cols) c = g.c; if (r < 0 || r >= g.spec.rows) r = g.r; g.r = r; g.c = c;
}
function fxLin(n){
  var L = "abcd".split(""), V = ["X", "Y", "Z"];
  fxGrid({ rows: n, cols: n + 1, title: n === 2 ? "aX+bY=c" : "aX+bY+cZ=d", lab: function(r, c){ return L[c] + (r + 1); }, exit: fxEqnMenu,
    done: function(vals){
      try { var A = vals.map(function(r){ return r.slice(0, n); }), B = vals.map(function(r){ return r[n]; }), s = fxSolveLin(A, B).map(fxClean); FX.res = { title: "Solution", back: function(){ FX.res = null; FX.view = "grid"; }, lines: s.map(function(x, i){ return V[i] + " = " + fxShow(x); }) }; FX.view = "res"; FX.resI = 0; }
      catch (e){ FX.err = e.fx || "Math ERROR"; }
    } });
}
function fxPoly(d){
  var L = "abcd".split("");
  fxGrid({ rows: 1, cols: d + 1, title: d === 2 ? "aX²+bX+c=0" : "aX³+bX²+cX+d=0", lab: function(r, c){ return L[c]; }, exit: fxEqnMenu,
    done: function(vals){
      try { var z = fxRoots(vals[0]).map(fxClean); FX.res = { title: "Solution", lines: z.map(function(x, i){ return "X" + (i + 1) + " = " + fxShow(x); }) }; FX.view = "res"; FX.resI = 0; }
      catch (e){ FX.err = e.fx || "Math ERROR"; }
    } });
}
function fxMatDim(L){
  fxGrid({ rows: 1, cols: 2, title: "Mat" + L + " size (m, n)", lab: function(r, c){ return c ? "n" : "m"; }, vals: [[cx(2, 0), cx(2, 0)]], exit: fxMatMenu,
    done: function(v){
      var m = v[0][0].re, n = v[0][1].re;
      if (!Number.isInteger(m) || !Number.isInteger(n) || m < 1 || n < 1 || m > 4 || n > 4){ FX.err = "Math ERROR"; return; }
      var old = FX.mats[L], vals = []; for (var i = 0; i < m; i++){ vals.push([]); for (var j = 0; j < n; j++) vals[i].push(old && old.a[i] && old.a[i][j] ? old.a[i][j] : cx(0, 0)); }
      fxGrid({ rows: m, cols: n, title: "Mat" + L + " (" + m + "×" + n + ")", lab: function(r, c){ return (r + 1) + "," + (c + 1); }, vals: vals, exit: fxHome,
        done: function(vs){ var M = mat(m, n); M.a = vs.map(function(r){ return r.slice(); }); FX.mats[L] = M; fxHome(); FX.done = false; FX.out = "Mat" + L + " saved"; } });
    } });
}
// ---- key handling ----
function fxVarOf(k){ return k.v || (k.id === "mp" ? "M" : null); }
function fxPress(id){
  var k = FXKEY[id], sh = FX.shift, al = FX.alpha;
  if (!k || k.x || (k.sx && sh)) return;
  if (id === "shift"){ FX.shift = !FX.shift; FX.alpha = false; fxRender(); return; }
  if (id === "alpha"){ FX.alpha = !FX.alpha; FX.shift = false; fxRender(); return; }
  FX.shift = false; FX.alpha = false;
  if (FX.pend){
    var pend = FX.pend, vv = fxVarOf(k); FX.pend = null;
    if (vv){ if (pend === "sto"){ if (FX.ans && FX.ans.t === "C") FX.vars[vv] = FX.ans; } else { fxIns(vv); } }
    fxRender(); return;
  }
  var view = FX.view;
  if (view === "menu"){ fxMenuKey(id, k, sh); fxRender(); return; }
  if (id === "on"){ fxSet([]); FX.out = ""; FX.err = ""; fxHome(); fxRender(); return; }
  if (id === "ac"){
    if (sh){ FX.open = false; fxClose(); return; }
    if (view === "grid"){ if (FX.tokens.length){ fxSet([]); FX.err = ""; } else if (FX.grid.spec.exit) FX.grid.spec.exit(); }
    else if (view === "res"){ if (FX.res.back) FX.res.back(); else fxHome(); }
    else { fxSet([]); FX.out = ""; FX.err = ""; FX.done = false; FX.hi = -1; }
    fxRender(); return;
  }
  if (id === "menu"){ if (sh) fxSetup(); else fxTop(); fxRender(); return; }
  if (view === "res"){ if (id === "down" || id === "eq") FX.resI = Math.min(FX.res.lines.length - 1, FX.resI + 1); else if (id === "up") FX.resI = Math.max(0, FX.resI - 1); fxRender(); return; }
  if (view === "grid"){
    if (id === "eq") fxGridEnter();
    else if (id === "left") fxGridMove(0, -1); else if (id === "right") fxGridMove(0, 1); else if (id === "up") fxGridMove(-1, 0); else if (id === "down") fxGridMove(1, 0);
    else if (id === "del"){ if (FX.cur > 0){ FX.tokens.splice(FX.cur - 1, 1); FX.cur--; } }
    else if (k.t || (sh && k.ts)){ var gt = sh && k.ts ? k.ts : k.t; if (/^(\d|\.|−|\+|×|÷|ᴇ|\(|\)|π|\^|²|√\(|⁄|i)$/.test(gt)) { FX.tokens.splice(FX.cur, 0, gt); FX.cur++; } }
    fxRender(); return;
  }
  // calculate view
  switch (id){
    case "eq": fxEquals(); break;
    case "del": if (FX.done){ FX.done = false; } if (FX.cur > 0){ FX.tokens.splice(FX.cur - 1, 1); FX.cur--; } FX.err = ""; break;
    case "left": FX.done = false; if (FX.cur > 0) FX.cur--; FX.err = ""; break;
    case "right": FX.done = false; if (FX.cur < FX.tokens.length) FX.cur++; FX.err = ""; break;
    case "up": fxHist(1); break;
    case "down": fxHist(-1); break;
    case "optn": fxInsMenu("OPTN", ["abs(", "det(", "trn(", "iden(", "MatA", "MatB", "MatC"]); break;
    case "hyp": FX.hyp = !FX.hyp; break;
    case "rcl": if (sh) FX.pend = "sto"; else FX.pend = "rcl"; break;
    case "eng": if (sh) fxIns("i"); else { FX.eng = !FX.eng; fxReshow(); } break;
    case "sd": FX.frac = !FX.frac; fxReshow(); break;
    case "mp": if (al) fxIns("M"); else { var M0 = FX.vars.M || cx(0, 0); if (FX.ans && FX.ans.t === "C") FX.vars.M = sh ? csub(M0, FX.ans) : cadd(M0, FX.ans); } break;
    case "2": if (sh){ fxInsMenu("CMPLX", ["arg(", "conj(", "Re(", "Im(", "▶r∠θ", "▶a+bi"]); break; } fxIns("2"); break;
    case "4": if (sh){ fxMenu("Matrix", [{ l: "Define MatA", f: function(){ fxMatDim("A"); } }, { l: "Define MatB", f: function(){ fxMatDim("B"); } }, { l: "Define MatC", f: function(){ fxMatDim("C"); } }, { l: "MatA", f: function(){ fxHome(); fxIns("MatA"); } }, { l: "MatB", f: function(){ fxHome(); fxIns("MatB"); } }, { l: "MatC", f: function(){ fxHome(); fxIns("MatC"); } }, { l: "det(", f: function(){ fxHome(); fxIns("det("); } }, { l: "trn(", f: function(){ fxHome(); fxIns("trn("); } }, { l: "iden(", f: function(){ fxHome(); fxIns("iden("); } }]); break; } fxIns("4"); break;
    default:
      if (al && k.v){ fxIns(k.v); break; }
      if (al && k.ta){ fxIns(k.ta); break; }
      if (sh && k.ts){ fxIns(k.ts); break; }
      if (FX.hyp && k.h){ FX.hyp = false; fxIns(k.h); break; }
      if (k.t) fxIns(k.t);
  }
  fxRender();
}
function fxMenuKey(id, k, sh){
  var m = FX.menu;
  if (id === "up") m.sel = Math.max(0, m.sel - 1);
  else if (id === "down") m.sel = Math.min(m.items.length - 1, m.sel + 1);
  else if (id === "eq"){ m.items[m.sel].f(); }
  else if (/^[1-9]$/.test(id) && m.items[+id - 1]){ m.sel = +id - 1; m.items[m.sel].f(); }
  else if (id === "ac"){ if (m.back) m.back(); else fxHome(); }
  else if (id === "menu"){ fxHome(); }
}
function fxHist(d){
  if (!FX.hist.length) return;
  var n = FX.hi + d; if (n < -1) n = -1; if (n > FX.hist.length - 1) n = FX.hist.length - 1;
  FX.hi = n; FX.done = false; FX.err = "";
  if (n >= 0) fxSet(FX.hist[FX.hist.length - 1 - n].slice()); else fxSet([]);
}
function fxEquals(){
  if (!FX.tokens.length) return;
  try {
    var r = fxEval(FX.tokens), v = fxClean(r.v);
    FX.ans = v; FX.lastMode = r.mode; FX.out = fxShow(v, r.mode); FX.err = ""; FX.frac = false;
    FX.hist.push(FX.tokens.slice()); if (FX.hist.length > 30) FX.hist.shift(); FX.hi = -1; FX.done = true;
  } catch (e){ FX.err = e.fx || "Syntax ERROR"; FX.out = ""; FX.done = false; }
}
function fxReshow(){ if (FX.ans && FX.out && FX.view === "calc" && !FX.err) FX.out = fxShow(FX.ans, FX.lastMode); }
// ---- window ----
function fxTokHtml(t){ return t === "ᴇ" ? "×10<sup>x</sup>" : esc2(t); }
function fxRender(){
  var w = document.getElementById("fxwin"); if (!w) return;
  var st = [];
  if (FX.shift) st.push("S"); if (FX.alpha) st.push("A"); if (FX.hyp) st.push("hyp"); if (FX.pend) st.push(FX.pend.toUpperCase());
  st.push(FX.angle === "deg" ? "D" : FX.angle === "rad" ? "R" : "G"); if (FX.cfmt === "polar") st.push("r∠θ"); if (FX.eng) st.push("ENG"); if (FX.vars.M && (FX.vars.M.re || FX.vars.M.im)) st.push("M");
  document.getElementById("fxst").innerHTML = st.map(function(s){ return "<i>" + s + "</i>"; }).join("");
  var h = "", v = FX.view;
  function expr(){ var a = FX.tokens.slice(0, FX.cur).map(fxTokHtml).join(""), b = FX.tokens.slice(FX.cur).map(fxTokHtml).join(""); return '<div class="fxe">' + a + '<span class="fxcur"></span>' + b + "</div>"; }
  if (v === "menu"){ var m = FX.menu; h = '<div class="fxt">' + m.title + "</div>" + m.items.map(function(it, i){ return '<div class="fxi' + (i === m.sel ? " sel" : "") + '">' + (i + 1) + ": " + it.l + "</div>"; }).join(""); }
  else if (v === "grid"){
    var g = FX.grid, sp = g.spec; h = '<div class="fxt">' + sp.title + '</div><table class="fxg">';
    for (var r = 0; r < sp.rows; r++){ h += "<tr>"; for (var c = 0; c < sp.cols; c++){ var cur = r === g.r && c === g.c; h += '<td class="' + (cur ? "on" : "") + '"><small>' + sp.lab(r, c) + "</small> " + (cur && FX.tokens.length ? FX.tokens.map(fxTokHtml).join("") : fxShowC(g.vals[r][c])) + "</td>"; } h += "</tr>"; }
    h += "</table>" + (FX.err ? '<div class="fxr err">' + FX.err + "</div>" : "");
  }
  else if (v === "res"){ var rs = FX.res; h = '<div class="fxt">' + rs.title + "</div>" + '<div class="fxr big">' + rs.lines[FX.resI] + '</div><div class="fxt">▲▼ next, AC back (' + (FX.resI + 1) + "/" + rs.lines.length + ")</div>"; }
  else { h = expr() + (FX.err ? '<div class="fxr err">' + FX.err + "</div>" : '<div class="fxr">' + (FX.out || "") + "</div>"); }
  document.getElementById("fxlcd").innerHTML = h;
  w.querySelectorAll(".fxk").forEach(function(b){ var id = b.dataset.k; b.classList.toggle("on", (id === "shift" && FX.shift) || (id === "alpha" && FX.alpha) || (id === "hyp" && FX.hyp)); });
  w.classList.toggle("shifted", FX.shift); w.classList.toggle("alphaed", FX.alpha);
}
function fxBuild(){
  var w = document.createElement("div"); w.id = "fxwin"; w.setAttribute("role", "dialog"); w.setAttribute("aria-label", "Scientific calculator"); w.tabIndex = -1;
  var h = '<div class="fxh" id="fxh"><b>Scientific calculator</b><span>fx-991EX style</span><button class="fxx" data-fxc="close" aria-label="Close calculator">×</button></div><div class="fxlcdw"><div class="fxst" id="fxst"></div><div class="fxlcd" id="fxlcd" aria-live="polite"></div></div><div class="fxkeys">';
  FXROWS.forEach(function(row){
    if (row === "gap"){ h += '<div class="fxgap"></div>'; return; }
    h += '<div class="fxrow n' + row.length + '">' + row.map(function(k){
      var dis = k.x || (k.sx && false);
      return '<button class="fxk ' + (k.c || "") + (k.x ? " dis" : "") + '" data-k="' + k.id + '"' + (k.x ? ' aria-disabled="true" title="Not available in this version"' : "") + ">" + (k.s ? '<span class="fs' + (k.sx ? " dis" : "") + '">' + k.s + "</span>" : "") + (k.a ? '<span class="fa">' + k.a + "</span>" : "") + '<span class="fp">' + k.p + "</span></button>";
    }).join("") + "</div>";
  });
  w.innerHTML = h + '</div><p class="fxnote">Not included: calculus, statistics, base-n, vector, table and spreadsheet modes. Greyed keys are not available.</p>';
  document.body.appendChild(w);
  w.addEventListener("click", function(e){
    var b = e.target.closest("button"); if (!b) return;
    if (b.dataset.fxc === "close"){ fxClose(); return; }
    if (b.dataset.k) fxPress(b.dataset.k);
    w.focus({ preventScroll: true });
  });
  var map = { "0": "0", "1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8", "9": "9", ".": "dot", "+": "add", "-": "sub", "*": "mul", "/": "div", "(": "lp", ")": "rp", "Enter": "eq", "=": "eq", "Backspace": "del", "Escape": "ac", "ArrowLeft": "left", "ArrowRight": "right", "ArrowUp": "up", "ArrowDown": "down", "^": "pow", "!": "inv" };
  w.addEventListener("keydown", function(e){
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    var id = map[e.key]; if (e.key === "!"){ FX.shift = true; id = "inv"; }
    if (e.key === "i"){ FX.shift = true; id = "eng"; }
    if (e.key === "p"){ FX.shift = true; id = "exp"; }
    if (e.key === "e"){ id = "exp"; FX.alpha = true; }
    if (id){ e.preventDefault(); fxPress(id); }
  });
  var hd = document.getElementById("fxh"), dx = 0, dy = 0, drag = false;
  hd.addEventListener("pointerdown", function(e){ if (e.target.closest("button")) return; drag = true; var r = w.getBoundingClientRect(); dx = e.clientX - r.left; dy = e.clientY - r.top; hd.setPointerCapture(e.pointerId); });
  hd.addEventListener("pointermove", function(e){ if (!drag) return; w.style.left = Math.max(0, Math.min(window.innerWidth - 60, e.clientX - dx)) + "px"; w.style.top = Math.max(0, Math.min(window.innerHeight - 40, e.clientY - dy)) + "px"; w.style.right = "auto"; w.style.bottom = "auto"; });
  hd.addEventListener("pointerup", function(){ drag = false; });
  return w;
}
function fxOpen(){ var w = document.getElementById("fxwin") || fxBuild(); w.style.display = "block"; FX.open = true; fxRender(); w.focus({ preventScroll: true }); }
function fxClose(){ var w = document.getElementById("fxwin"); if (w) w.style.display = "none"; FX.open = false; }
function fxToggle(){ if (FX.open) fxClose(); else fxOpen(); }
