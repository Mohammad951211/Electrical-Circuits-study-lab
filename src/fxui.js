// ===== calculator window: keys, screens and menus (fx-991EX style, own drawing) =====
// Key object: p = main label, s = SHIFT label (gold), a = ALPHA label (red), t/ts = token on press / with SHIFT,
// v = variable letter on ALPHA, x = not available, sx = SHIFT function not available.
var FXPAD = ["up", "left", "right", "down"];
var FXTOP = [
  { id: "shift", p: "SHIFT", c: "mod", area: "sh" }, { id: "alpha", p: "ALPHA", c: "alp", area: "al" },
  { id: "menu", p: "MENU", s: "SETUP", c: "fn", area: "mn" }, { id: "on", p: "ON", s: "OFF", c: "on", area: "on" },
  { id: "optn", p: "OPTN", c: "fn", area: "op" }, { id: "calc", p: "CALC", s: "SOLVE", a: "=", t: "", c: "fn", area: "ca" },
  { id: "integ", p: "∫▫", s: "d/dx", t: "∫(", ts: "d/dx(", c: "fn", area: "in" }, { id: "inv", p: "x⁻¹", s: "x!", t: "⁻¹", ts: "!", c: "fn", area: "iv" },
  { id: "up", p: "▲", c: "pad", area: "pu" }, { id: "down", p: "▼", c: "pad", area: "pd" }, { id: "left", p: "◀", c: "pad", area: "pl" }, { id: "right", p: "▶", c: "pad", area: "pr" }
];
var FXROWS = [
  "top",
  [{ id: "frac", p: "▫⁄▫", s: "a b/c", t: "⁄", sx: 1, c: "fn" }, { id: "sqrt", p: "√▫", s: "∛▫", t: "√(", ts: "∛(", c: "fn" }, { id: "sq", p: "x²", s: "x³", t: "²", ts: "³", c: "fn" }, { id: "pow", p: "x▫", s: "ˣ√▫", t: "^", ts: "ˣ√", c: "fn" }, { id: "log", p: "log", s: "10ˣ", t: "log(", ts: "10^(", c: "fn" }, { id: "ln", p: "ln", s: "eˣ", t: "ln(", ts: "e^(", c: "fn" }],
  [{ id: "neg", p: "(−)", a: "A", t: "−", v: "A", c: "fn" }, { id: "deg", p: "°′″", a: "B", t: "°", v: "B", c: "fn" }, { id: "hyp", p: "hyp", a: "C", v: "C", c: "fn" }, { id: "sin", p: "sin", s: "sin⁻¹", a: "D", t: "sin(", ts: "sin⁻¹(", v: "D", h: "sinh(", c: "fn" }, { id: "cos", p: "cos", s: "cos⁻¹", a: "E", t: "cos(", ts: "cos⁻¹(", v: "E", h: "cosh(", c: "fn" }, { id: "tan", p: "tan", s: "tan⁻¹", a: "F", t: "tan(", ts: "tan⁻¹(", v: "F", h: "tanh(", c: "fn" }],
  [{ id: "rcl", p: "RCL", s: "STO", c: "fn" }, { id: "eng", p: "ENG", s: "i", ts: "i", c: "fn" }, { id: "lp", p: "(", s: "Abs", a: "Y", t: "(", ts: "abs(", v: "Y", c: "fn" }, { id: "rp", p: ")", s: ",", a: "X", t: ")", ts: ",", v: "X", c: "fn" }, { id: "sd", p: "S⇔D", c: "fn" }, { id: "mp", p: "M+", s: "M−", a: "M", v: "M", c: "fn" }],
  "gap",
  [{ id: "7", p: "7", t: "7", s: "CONST", c: "num" }, { id: "8", p: "8", t: "8", s: "CONV", sx: 1, c: "num" }, { id: "9", p: "9", t: "9", s: "CLR", c: "num" }, { id: "del", p: "DEL", s: "INS", c: "del" }, { id: "ac", p: "AC", s: "OFF", c: "del" }],
  [{ id: "4", p: "4", t: "4", s: "MATRIX", sk: "mat", c: "num" }, { id: "5", p: "5", t: "5", s: "VECTOR", c: "num" }, { id: "6", p: "6", t: "6", c: "num" }, { id: "mul", p: "×", t: "×", s: "nPr", ts: "nPr", c: "num" }, { id: "div", p: "÷", t: "÷", s: "nCr", ts: "nCr", c: "num" }],
  [{ id: "1", p: "1", t: "1", s: "STAT", c: "num" }, { id: "2", p: "2", t: "2", s: "CMPLX", sk: "cmplx", c: "num" }, { id: "3", p: "3", t: "3", s: "BASE", c: "num" }, { id: "add", p: "+", t: "+", s: "Pol", ts: "Pol(", c: "num" }, { id: "sub", p: "−", t: "−", s: "Rec", ts: "Rec(", c: "num" }],
  [{ id: "0", p: "0", t: "0", s: "Ran#", ts: "Ran#", c: "num" }, { id: "dot", p: ".", t: ".", s: "RanInt", sx: 1, c: "num" }, { id: "exp", p: "×10ˣ", t: "ᴇ", s: "π", ts: "π", a: "e", ta: "e", c: "num" }, { id: "ans", p: "Ans", t: "Ans", s: "DRG▸", sx: 1, c: "num" }, { id: "eq", p: "=", c: "eq", s: "" }]
];
var FXKEY = {};
FXTOP.forEach(function(k){ FXKEY[k.id] = k; });
FXROWS.forEach(function(r){ if (typeof r !== "string") r.forEach(function(k){ FXKEY[k.id] = k; }); });
var FXPOST = ["²", "³", "⁻¹", "!", "%", "°", "+", "−", "×", "÷", "⁄", "^", "ˣ√", "nPr", "nCr", "∠", "and", "or", "xor", "xnor"];
var FXVARS = /^[ABCDEFXYM]$/;
function fxSet(t){ FX.tokens = t; FX.cur = t.length; }
function fxIns(tok){
  if (FX.done){ FX.done = false; if (FXPOST.indexOf(tok) >= 0) fxSet(["Ans"]); else fxSet([]); FX.out = ""; }
  FX.err = ""; FX.tokens.splice(FX.cur, 0, tok); FX.cur++;
}
function fxMenu(title, items, back){ FX.view = "menu"; FX.menu = { title: title, items: items, sel: 0, back: back || null }; }
function fxHome(){ FX.view = "calc"; FX.menu = null; FX.grid = null; FX.res = null; FX.ask = null; FX.entry = null; FX.pend = null; }
function fxMode(m){ FX.mode = m; fxSet([]); FX.out = ""; FX.err = ""; FX.done = false; fxHome(); }
function fxTop(){
  fxMenu("MENU", [
    { l: "Calculate", f: function(){ fxMode("comp"); } },
    { l: "Complex", f: function(){ fxMode("cmplx"); } },
    { l: "Base-N", f: function(){ FX.base = "dec"; fxMode("base"); } },
    { l: "Matrix", f: function(){ fxMatMenu(); } },
    { l: "Vector", f: function(){ fxVecMenu(); } },
    { l: "Statistics", f: function(){ fxStatTypeMenu(); } },
    { l: "Table", f: function(){ fxTableSetup(); } },
    { l: "Equation", f: function(){ fxEqnMenu(); } }
  ]);
}
function fxSetup(){
  fxMenu("SETUP", [
    { l: "Angle unit", f: function(){ fxMenu("Angle unit", [{ l: "Degree", f: function(){ FX.angle = "deg"; fxHome(); } }, { l: "Radian", f: function(){ FX.angle = "rad"; fxHome(); } }, { l: "Gradian", f: function(){ FX.angle = "gra"; fxHome(); } }], fxSetup); } },
    { l: "Complex result", f: function(){ fxMenu("Complex result", [{ l: "a+bi", f: function(){ FX.cfmt = "rect"; fxHome(); } }, { l: "r∠θ", f: function(){ FX.cfmt = "polar"; fxHome(); } }], fxSetup); } },
    { l: "Number format", f: function(){ fxMenu("Number format", [{ l: "Norm", f: function(){ FX.eng = false; fxHome(); } }, { l: "Engineering", f: function(){ FX.eng = true; fxHome(); } }], fxSetup); } },
    { l: "Fraction result", f: function(){ fxMenu("Fraction result", [{ l: "Decimal", f: function(){ FX.frac = false; fxHome(); fxReshow(); } }, { l: "Fraction", f: function(){ FX.frac = true; fxHome(); fxReshow(); } }], fxSetup); } }
  ]);
}
function fxInsMenu(title, list){ fxMenu(title, list.map(function(t){ return { l: t, f: function(){ fxHome(); fxIns(t); } }; })); }
function fxClrMenu(){
  fxMenu("CLR", [
    { l: "Setup", f: function(){ FX.angle = "deg"; FX.cfmt = "rect"; FX.eng = false; FX.frac = false; fxHome(); } },
    { l: "Memory", f: function(){ FX.vars = {}; FX.ans = null; FX.mats = {}; FX.vecs = {}; fxHome(); FX.out = "Memory cleared"; } },
    { l: "All", f: function(){ FX.angle = "deg"; FX.cfmt = "rect"; FX.eng = false; FX.frac = false; FX.vars = {}; FX.ans = null; FX.mats = {}; FX.vecs = {}; FX.stat = null; FX.mode = "comp"; fxSet([]); fxHome(); FX.out = "All cleared"; } }
  ]);
}
function fxConstMenu(){
  fxMenu("CONST", FXCONST.map(function(c){ return { l: c[0] + "  " + c[1], f: function(){ fxHome(); fxIns(String(c[2]).replace("e-", "ᴇ−").replace("e+", "ᴇ").replace(/e(\d)/, "ᴇ$1")); } }; }));
}
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
// ---- grid entry (equations, matrices, vectors, table range) ----
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
        done: function(vs){ var M = mat(m, n); M.a = vs.map(function(r){ return r.slice(); }); FX.mats[L] = M; fxMode("comp"); FX.out = "Mat" + L + " saved"; } });
    } });
}
// ---- vectors ----
function fxVecMenu(){
  fxMenu("Vector: define", ["A", "B", "C"].map(function(L){ return { l: "Define Vct" + L, f: function(){ fxVecDim(L); } }; }), fxTop);
}
function fxVecDim(L){
  fxGrid({ rows: 1, cols: 1, title: "Vct" + L + " dimension (2 or 3)", lab: function(){ return "dim"; }, vals: [[cx(3, 0)]], exit: fxVecMenu,
    done: function(v){
      var n = v[0][0].re; if (n !== 2 && n !== 3){ FX.err = "Math ERROR"; return; }
      var old = FX.vecs && FX.vecs[L], vals = [[]]; for (var j = 0; j < n; j++) vals[0].push(old && old.a[j] ? old.a[j] : cx(0, 0));
      fxGrid({ rows: 1, cols: n, title: "Vct" + L, lab: function(r, c){ return "xyz".charAt(c); }, vals: vals, exit: fxVecMenu,
        done: function(vs){ FX.vecs = FX.vecs || {}; FX.vecs[L] = fxVec(vs[0].slice()); fxMode("vec"); FX.out = "Vct" + L + " saved"; } });
    } });
}
function fxVectorKeyMenu(){
  fxMenu("VECTOR", [
    { l: "Define VctA", f: function(){ fxVecDim("A"); } }, { l: "Define VctB", f: function(){ fxVecDim("B"); } }, { l: "Define VctC", f: function(){ fxVecDim("C"); } },
    { l: "VctA", f: function(){ fxHome(); fxIns("VctA"); } }, { l: "VctB", f: function(){ fxHome(); fxIns("VctB"); } }, { l: "VctC", f: function(){ fxHome(); fxIns("VctC"); } },
    { l: "Dot(", f: function(){ fxHome(); fxIns("Dot("); } }, { l: "Angle(", f: function(){ fxHome(); fxIns("Angle("); } }, { l: "UnitV(", f: function(){ fxHome(); fxIns("UnitV("); } }, { l: "Abs(", f: function(){ fxHome(); fxIns("abs("); } }
  ]);
}
// ---- statistics ----
function fxStatTypeMenu(){
  fxMenu("Statistics: type", FXSTYPES.map(function(t){ return { l: t.name, f: function(){ FX.stat = { type: t.id, xs: [], ys: [], res: null }; fxMode("stat"); fxStatEditor(); } }; }), fxTop);
}
function fxStatEditor(){
  var st = FX.stat; FX.view = "sed"; FX.menu = null; FX.sed = FX.sed && FX.sed.keep ? FX.sed : { r: 0, c: 0 }; FX.sed.keep = false; fxSet([]); FX.err = "";
  if (st.res === undefined) st.res = null;
}
function fxStatCols(){ return fxStatType(FX.stat.type).two ? 2 : 1; }
function fxStatCommit(){
  var st = FX.stat, sd = FX.sed;
  if (FX.tokens.length){
    try { var v = realOf(fxClean(fxEval(FX.tokens).v)); var arr = sd.c === 0 ? st.xs : st.ys; arr[sd.r] = v; } catch (e){ FX.err = e.fx || "Syntax ERROR"; return; }
  }
  fxSet([]); FX.err = ""; if (sd.r < 79) sd.r++;
}
function fxStatRun(){
  var st = FX.stat, t = fxStatType(st.type), xs = [], ys = [], n = Math.max(st.xs.length, st.ys.length), i;
  for (i = 0; i < n; i++){
    if (st.xs[i] === undefined) continue;
    if (t.two){ if (st.ys[i] === undefined) continue; xs.push(st.xs[i]); ys.push(st.ys[i]); } else xs.push(st.xs[i]);
  }
  st.res = fxStat(st.type, xs, ys); return st.res;
}
function fxStatShowRes(kind){
  try { var r = fxStatRun(); FX.res = { title: kind === "one" ? "1-Variable" : "Regression: " + fxStatType(FX.stat.type).name, lines: fxStatLines(r, kind), back: function(){ FX.res = null; FX.view = "calc"; } }; FX.view = "res"; FX.resI = 0; FX.menu = null; }
  catch (e){ FX.err = e.fx || "Math ERROR"; FX.view = "calc"; }
}
function fxStatOptn(){
  var two = fxStatType(FX.stat.type).two, items = [
    { l: "Select Type", f: fxStatTypeMenu }, { l: "Editor", f: function(){ FX.sed = { r: 0, c: 0, keep: true }; fxStatEditor(); } },
    { l: "1-Variable Calc", f: function(){ fxStatShowRes("one"); } }
  ];
  if (two) items.push({ l: "Regression Calc", f: function(){ fxStatShowRes("reg"); } });
  fxMenu("STAT", items);
}
function fxStatKeyMenu(){
  var two = fxStatType(FX.stat.type).two, pick = function(list){ return list.map(function(n){ return { l: n, f: function(){ fxHome(); try { fxStatRun(); } catch (e){ FX.err = e.fx || "Math ERROR"; return; } fxIns(n); } }; }); };
  var sub = function(title, list){ return function(){ fxMenu(title, pick(list), fxStatKeyMenu); }; };
  var items = [{ l: "Type", f: fxStatTypeMenu }, { l: "Data", f: function(){ FX.sed = { r: 0, c: 0, keep: true }; fxStatEditor(); } },
    { l: "Sum", f: sub("Sum", two ? ["Σx²", "Σx", "Σy²", "Σy", "Σxy"] : ["Σx²", "Σx"]) },
    { l: "Var", f: sub("Var", two ? ["n", "x̄", "σx", "sx", "ȳ", "σy", "sy"] : ["n", "x̄", "σx", "sx"]) },
    { l: "MinMax", f: sub("MinMax", two ? ["minX", "maxX", "minY", "maxY"] : ["minX", "Q1", "Med", "Q3", "maxX"]) }];
  if (two) items.push({ l: "Reg", f: sub("Reg", fxStatType(FX.stat.type).id === "quad" ? ["RegA", "RegB", "RegC"] : ["RegA", "RegB", "RegR"]) });
  fxMenu("STAT", items);
}
// ---- table ----
function fxTableSetup(){
  FX.mode = "table"; FX.view = "calc"; FX.menu = null; FX.out = ""; FX.err = ""; FX.done = false; fxSet(FX.tbl && FX.tbl.f ? FX.tbl.f.slice() : []);
  FX.entry = { title: "f(X)=", done: function(){
    if (!FX.tokens.length) return;
    try { fxFnOfX(FX.tokens)(1); } catch (e){ if (e.fx && e.fx !== "Math ERROR") { FX.err = e.fx; return; } }
    var f = FX.tokens.slice(), old = FX.tbl || { start: 1, end: 5, step: 1 };
    fxGrid({ rows: 1, cols: 3, title: "Table range", lab: function(r, c){ return ["Start", "End", "Step"][c]; }, vals: [[cx(old.start, 0), cx(old.end, 0), cx(old.step, 0)]], exit: fxTableSetup,
      done: function(v){
        try { var s = v[0][0].re, e2 = v[0][1].re, st = v[0][2].re, rows = fxTableRows(f, s, e2, st); FX.tbl = { f: f, start: s, end: e2, step: st, rows: rows }; FX.view = "tbl"; FX.tblI = 0; FX.entry = null; }
        catch (er){ FX.err = er.fx || "Math ERROR"; }
      } });
  } };
}
// ---- CALC and SOLVE ----
function fxVarsIn(tokens){
  var out = [], T; try { T = fxLex(tokens.join("")); } catch (e) { return out; }
  T.forEach(function(t){ if (FXVARS.test(t) && out.indexOf(t) < 0) out.push(t); });
  return out;
}
function fxAsk(kind){
  if (!FX.tokens.length) return;
  var expr = FX.tokens.slice(), vars;
  if (kind === "solve"){ vars = ["X"]; }
  else { vars = fxVarsIn(expr); if (!vars.length){ fxEquals(); return; } }
  FX.ask = { kind: kind, expr: expr, vars: vars, i: 0 }; FX.view = "ask"; fxAskLoad();
}
function fxAskLoad(){
  var a = FX.ask, v = FX.vars[a.vars[a.i]]; fxSet(v && v.t === "C" && v.im === 0 ? [fxNum(v.re).replace(/<[^>]*>/g, "").replace("-", "−")] : []); FX.err = "";
  if (a.kind === "solve") fxSet([]);
}
function fxAskEnter(){
  var a = FX.ask, v = 0;
  try { v = FX.tokens.length ? realOf(fxClean(fxEval(FX.tokens).v)) : (FX.vars[a.vars[a.i]] ? FX.vars[a.vars[a.i]].re : 0); } catch (e){ FX.err = e.fx || "Syntax ERROR"; return; }
  if (a.kind === "solve") a.guess = v; else FX.vars[a.vars[a.i]] = cx(v, 0);
  a.i++;
  if (a.i < a.vars.length){ fxAskLoad(); return; }
  var expr = a.expr;
  FX.ask = null; fxSet(expr); FX.view = "calc";
  try {
    if (a.kind === "solve"){
      var r = fxSolve(expr, a.guess); FX.vars.X = cx(r.x, 0);
      FX.res = { title: "Solve", lines: ["X = " + fxNum(Number(r.x.toPrecision(10))), "L−R = " + fxNum(Math.abs(r.e) < 1e-10 ? 0 : r.e)], back: function(){ FX.res = null; FX.view = "calc"; } }; FX.view = "res"; FX.resI = 0;
    } else { var rr = fxEval(expr), vv = fxClean(rr.v); FX.ans = vv; FX.out = fxShow(vv, rr.mode); FX.done = false; FX.err = ""; }
  } catch (e2){ FX.err = e2.fx || "Syntax ERROR"; FX.out = ""; }
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
  if (id === "on"){ if (sh){ FX.open = false; fxClose(); return; } fxSet([]); FX.out = ""; FX.err = ""; fxHome(); fxRender(); return; }
  if (id === "ac"){
    if (sh){ FX.open = false; fxClose(); return; }
    if (view === "grid"){ if (FX.tokens.length){ fxSet([]); FX.err = ""; } else if (FX.grid.spec.exit) FX.grid.spec.exit(); }
    else if (view === "res"){ if (FX.res.back) FX.res.back(); else fxHome(); }
    else if (view === "ask"){ fxSet(FX.ask.expr); FX.ask = null; FX.view = "calc"; }
    else if (view === "sed"){ if (FX.tokens.length){ fxSet([]); FX.err = ""; } else { FX.view = "calc"; fxSet([]); FX.out = ""; } }
    else if (view === "tbl"){ fxTableSetup(); }
    else if (view === "calc" && FX.entry && !FX.tokens.length){ fxMode(FX.mode === "table" ? "comp" : FX.mode); }
    else { fxSet([]); FX.out = ""; FX.err = ""; FX.done = false; FX.hi = -1; }
    fxRender(); return;
  }
  if (id === "menu"){ if (sh) fxSetup(); else fxTop(); fxRender(); return; }
  if (view === "res"){ if (id === "down" || id === "eq") FX.resI = Math.min(FX.res.lines.length - 1, FX.resI + 1); else if (id === "up") FX.resI = Math.max(0, FX.resI - 1); fxRender(); return; }
  if (view === "tbl"){ if (id === "down" || id === "eq") FX.tblI = Math.min(FX.tbl.rows.length - 1, FX.tblI + 1); else if (id === "up") FX.tblI = Math.max(0, FX.tblI - 1); fxRender(); return; }
  if (view === "grid"){
    if (id === "eq") fxGridEnter();
    else if (id === "left") fxGridMove(0, -1); else if (id === "right") fxGridMove(0, 1); else if (id === "up") fxGridMove(-1, 0); else if (id === "down") fxGridMove(1, 0);
    else if (id === "del"){ if (FX.cur > 0){ FX.tokens.splice(FX.cur - 1, 1); FX.cur--; } }
    else if (k.t || (sh && k.ts)){ var gt = sh && k.ts ? k.ts : k.t; if (/^(\d|\.|−|\+|×|÷|ᴇ|\(|\)|π|\^|²|√\(|⁄|i)$/.test(gt)) { FX.tokens.splice(FX.cur, 0, gt); FX.cur++; } }
    fxRender(); return;
  }
  if (view === "sed"){
    var sd = FX.sed, st = FX.stat, nc = fxStatCols();
    if (id === "eq") fxStatCommit();
    else if (id === "up" && !FX.tokens.length){ if (sd.r > 0) sd.r--; }
    else if (id === "down" && !FX.tokens.length){ if (sd.r < 79) sd.r++; }
    else if (id === "left" && !FX.tokens.length){ if (sd.c > 0) sd.c--; }
    else if (id === "right" && !FX.tokens.length){ if (sd.c < nc - 1) sd.c++; }
    else if (id === "del"){ if (FX.cur > 0){ FX.tokens.splice(FX.cur - 1, 1); FX.cur--; } else if (sh) { st.xs.splice(sd.r, 1); st.ys.splice(sd.r, 1); } else { (sd.c ? st.ys : st.xs)[sd.r] = undefined; } }
    else if (id === "optn"){ fxStatOptn(); }
    else if (k.t || (sh && k.ts)){ var gt2 = sh && k.ts ? k.ts : k.t; if (/^(\d|\.|−|\+|×|÷|ᴇ|\(|\)|π|\^|²|√\(|⁄|i)$/.test(gt2)){ FX.tokens.splice(FX.cur, 0, gt2); FX.cur++; } }
    fxRender(); return;
  }
  if (view === "ask"){
    if (id === "eq") fxAskEnter();
    else if (id === "del"){ if (FX.cur > 0){ FX.tokens.splice(FX.cur - 1, 1); FX.cur--; } }
    else if (id === "left"){ if (FX.cur > 0) FX.cur--; } else if (id === "right"){ if (FX.cur < FX.tokens.length) FX.cur++; }
    else if (k.t || (sh && k.ts)){ var at = sh && k.ts ? k.ts : k.t; if (/^(\d|\.|−|\+|×|÷|ᴇ|\(|\)|π|\^|²|√\(|⁄|e)$/.test(at)){ FX.tokens.splice(FX.cur, 0, at); FX.cur++; } else if (al && k.ta){ FX.tokens.splice(FX.cur, 0, k.ta); FX.cur++; } }
    fxRender(); return;
  }
  // expression views: calculate, complex, base-n, vector, statistics, table (f(X) entry)
  if (FX.mode === "base" && fxBaseKey(id, k, sh, al)){ fxRender(); return; }
  switch (id){
    case "eq": if (FX.entry){ FX.entry.done(); } else fxEquals(); break;
    case "calc": if (sh){ fxAsk("solve"); } else if (al){ fxIns("="); } else fxAsk("calc"); break;
    case "del": if (FX.done){ FX.done = false; } if (FX.cur > 0){ FX.tokens.splice(FX.cur - 1, 1); FX.cur--; } FX.err = ""; break;
    case "left": FX.done = false; if (FX.cur > 0) FX.cur--; FX.err = ""; break;
    case "right": FX.done = false; if (FX.cur < FX.tokens.length) FX.cur++; FX.err = ""; break;
    case "up": fxHist(1); break;
    case "down": fxHist(-1); break;
    case "optn":
      if (FX.mode === "stat" && FX.stat) fxStatOptn();
      else fxInsMenu("OPTN", ["abs(", "Σ(", "Pol(", "Rec(", "det(", "trn(", "iden(", "MatA", "MatB", "MatC", "VctA", "VctB", "VctC", "Dot(", "Angle(", "UnitV("]);
      break;
    case "hyp": FX.hyp = !FX.hyp; break;
    case "rcl": if (sh) FX.pend = "sto"; else FX.pend = "rcl"; break;
    case "eng": if (sh) fxIns("i"); else { FX.eng = !FX.eng; fxReshow(); } break;
    case "sd": FX.frac = !FX.frac; fxReshow(); break;
    case "mp": if (al) fxIns("M"); else { var M0 = FX.vars.M || cx(0, 0); if (FX.ans && FX.ans.t === "C") FX.vars.M = sh ? csub(M0, FX.ans) : cadd(M0, FX.ans); } break;
    case "1": if (sh){ if (FX.mode === "stat" && FX.stat) fxStatKeyMenu(); else { FX.err = "Not in STAT mode"; } break; } fxIns("1"); break;
    case "2": if (sh){ fxInsMenu("CMPLX", ["arg(", "conj(", "Re(", "Im(", "▶r∠θ", "▶a+bi"]); break; } fxIns("2"); break;
    case "3": if (sh){ FX.base = FX.base || "dec"; fxMode("base"); break; } fxIns("3"); break;
    case "4": if (sh){ fxMenu("Matrix", [{ l: "Define MatA", f: function(){ fxMatDim("A"); } }, { l: "Define MatB", f: function(){ fxMatDim("B"); } }, { l: "Define MatC", f: function(){ fxMatDim("C"); } }, { l: "MatA", f: function(){ fxHome(); fxIns("MatA"); } }, { l: "MatB", f: function(){ fxHome(); fxIns("MatB"); } }, { l: "MatC", f: function(){ fxHome(); fxIns("MatC"); } }, { l: "det(", f: function(){ fxHome(); fxIns("det("); } }, { l: "trn(", f: function(){ fxHome(); fxIns("trn("); } }, { l: "iden(", f: function(){ fxHome(); fxIns("iden("); } }]); break; } fxIns("4"); break;
    case "5": if (sh){ fxVectorKeyMenu(); break; } fxIns("5"); break;
    case "7": if (sh){ fxConstMenu(); break; } fxIns("7"); break;
    case "9": if (sh){ fxClrMenu(); break; } fxIns("9"); break;
    default:
      if (al && k.v){ fxIns(k.v); break; }
      if (al && k.ta){ fxIns(k.ta); break; }
      if (sh && k.ts){ fxIns(k.ts); break; }
      if (FX.hyp && k.h){ FX.hyp = false; fxIns(k.h); break; }
      if (k.t) fxIns(k.t);
  }
  fxRender();
}
// Base-n mode: letters A to F are digits, x², x^▫, log and ln choose the number base, OPTN gives the logic operators
function fxBaseKey(id, k, sh, al){
  var map = { sq: "dec", pow: "hex", log: "bin", ln: "oct" };
  if (map[id] && !sh && !al){ FX.base = map[id]; fxReshow(); return true; }
  if (id === "optn"){ fxInsMenu("LOGIC", ["and", "or", "xor", "xnor", "Not(", "Neg("]); return true; }
  if (al && k.v && /^[A-F]$/.test(k.v)){ fxIns(k.v); return true; }
  if (al || sh) return /^(sq|pow|log|ln)$/.test(id) ? true : false;
  if (/^(sin|cos|tan|sqrt|inv|deg|hyp|eng|sd|neg|exp|dot|rcl|mp|ans)$/.test(id)){ if (id === "neg") fxIns("−"); if (id === "ans") fxIns("Ans"); return true; }
  return false;
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
    if (FX.mode === "base"){
      var b = FXBASES[FX.base || "dec"], bv = fxBaseParse(FX.tokens, b);
      FX.ans = cx(bv, 0); FX.out = fxBaseShow(bv, b); FX.err = "";
    } else {
      var r = fxEval(FX.tokens), v = fxClean(r.v);
      FX.ans = v.t === "L" ? v.items[0][1] : v; FX.lastMode = r.mode; FX.out = fxShow(v, r.mode); FX.err = ""; FX.frac = FX.frac && v.t === "C";
    }
    FX.hist.push(FX.tokens.slice()); if (FX.hist.length > 30) FX.hist.shift(); FX.hi = -1; FX.done = true;
  } catch (e){ FX.err = e.fx || "Syntax ERROR"; FX.out = ""; FX.done = false; }
}
function fxReshow(){
  if (!FX.ans || !FX.out || FX.view !== "calc" || FX.err) return;
  if (FX.mode === "base") FX.out = fxBaseShow(FX.ans.re | 0, FXBASES[FX.base || "dec"]); else FX.out = fxShow(FX.ans, FX.lastMode);
}
// ---- window ----
function fxTokHtml(t){ return t === "ᴇ" ? "×10<sup>x</sup>" : t === "Σ(" ? "Σ(" : esc2(t); }
function fxWin(list, sel, size){ var start = Math.max(0, Math.min(sel - 1, list.length - size)); return [start, Math.min(list.length, start + size)]; }
function fxRender(){
  var w = document.getElementById("fxwin"); if (!w) return;
  var st = [], md = { comp: "", cmplx: "CMPLX", base: (FX.base || "dec").toUpperCase(), vec: "VCT", stat: "STAT", table: "TABLE" }[FX.mode || "comp"];
  if (FX.shift) st.push("S"); if (FX.alpha) st.push("A"); if (FX.hyp) st.push("hyp"); if (FX.pend) st.push(FX.pend.toUpperCase());
  if (md) st.push(md);
  st.push(FX.angle === "deg" ? "D" : FX.angle === "rad" ? "R" : "G"); if (FX.cfmt === "polar") st.push("r∠θ"); if (FX.eng) st.push("ENG"); if (FX.vars.M && (FX.vars.M.re || FX.vars.M.im)) st.push("M");
  document.getElementById("fxst").innerHTML = st.map(function(s){ return "<i>" + s + "</i>"; }).join("");
  var h = "", v = FX.view;
  function expr(){ var a = FX.tokens.slice(0, FX.cur).map(fxTokHtml).join(""), b = FX.tokens.slice(FX.cur).map(fxTokHtml).join(""); return '<div class="fxe">' + a + '<span class="fxcur"></span>' + b + "</div>"; }
  if (v === "menu"){ var m = FX.menu, win = fxWin(m.items, m.sel, 4); h = '<div class="fxt">' + m.title + (m.items.length > 4 ? " (" + (m.sel + 1) + "/" + m.items.length + ")" : "") + "</div>" + m.items.slice(win[0], win[1]).map(function(it, i){ var n = win[0] + i; return '<div class="fxi' + (n === m.sel ? " sel" : "") + '">' + (n + 1) + ": " + it.l + "</div>"; }).join(""); }
  else if (v === "grid"){
    var g = FX.grid, sp = g.spec; h = '<div class="fxt">' + sp.title + '</div><table class="fxg">';
    for (var r = 0; r < sp.rows; r++){ h += "<tr>"; for (var c = 0; c < sp.cols; c++){ var cur = r === g.r && c === g.c; h += '<td class="' + (cur ? "on" : "") + '"><small>' + sp.lab(r, c) + "</small> " + (cur && FX.tokens.length ? FX.tokens.map(fxTokHtml).join("") : fxShowC(g.vals[r][c])) + "</td>"; } h += "</tr>"; }
    h += "</table>" + (FX.err ? '<div class="fxr err">' + FX.err + "</div>" : "");
  }
  else if (v === "res"){ var rs = FX.res; h = '<div class="fxt">' + rs.title + "</div>" + '<div class="fxr big">' + rs.lines[FX.resI] + '</div><div class="fxt">▲▼ next, AC back (' + (FX.resI + 1) + "/" + rs.lines.length + ")</div>"; }
  else if (v === "ask"){ var a = FX.ask, nm = a.vars[a.i]; h = '<div class="fxt">' + (a.kind === "solve" ? "Solve for X: start value" : "CALC: enter the value") + '</div><div class="fxt">' + a.expr.map(fxTokHtml).join("") + "</div>" + '<div class="fxe">' + nm + "=" + FX.tokens.slice(0, FX.cur).map(fxTokHtml).join("") + '<span class="fxcur"></span>' + FX.tokens.slice(FX.cur).map(fxTokHtml).join("") + "</div>" + (FX.err ? '<div class="fxr err">' + FX.err + "</div>" : ""); }
  else if (v === "sed"){
    var sd = FX.sed, s2 = FX.stat, nc = fxStatCols(), two = nc === 2, n = Math.max(s2.xs.length, s2.ys.length, sd.r + 1), a0 = Math.max(0, Math.min(sd.r - 1, n - 3));
    h = '<div class="fxt">' + fxStatType(s2.type).name + ': data, = to enter</div><table class="fxg"><tr><td><small>#</small></td><td><small>X</small></td>' + (two ? "<td><small>Y</small></td>" : "") + "</tr>";
    for (var q = a0; q < a0 + 3; q++){
      h += "<tr><td><small>" + (q + 1) + "</small></td>";
      for (var cc = 0; cc < nc; cc++){ var val = (cc ? s2.ys : s2.xs)[q], on = q === sd.r && cc === sd.c; h += '<td class="' + (on ? "on" : "") + '">' + (on && FX.tokens.length ? FX.tokens.map(fxTokHtml).join("") : val === undefined ? "" : fxNum(val)) + "</td>"; }
      h += "</tr>";
    }
    h += "</table>" + (FX.err ? '<div class="fxr err">' + FX.err + "</div>" : "");
  }
  else if (v === "tbl"){
    var tb = FX.tbl, w0 = Math.max(0, Math.min(FX.tblI - 1, tb.rows.length - 3));
    h = '<div class="fxt">f(X) = ' + tb.f.map(fxTokHtml).join("") + '</div><table class="fxg"><tr><td><small>X</small></td><td><small>f(X)</small></td></tr>';
    tb.rows.slice(w0, w0 + 3).forEach(function(rw, i){ var on = w0 + i === FX.tblI; h += '<tr class="' + (on ? "rowon" : "") + '"><td>' + fxNum(Number(rw[0].toPrecision(10))) + "</td><td>" + (rw[1] === null ? "ERROR" : fxNum(Number(rw[1].toPrecision(10)))) + "</td></tr>"; });
    h += "</table>";
  }
  else if (FX.entry){ h = '<div class="fxt">' + FX.entry.title + "</div>" + expr() + (FX.err ? '<div class="fxr err">' + FX.err + "</div>" : '<div class="fxt">type with X (ALPHA, then ")"), then =</div>'); }
  else { h = expr() + (FX.err ? '<div class="fxr err">' + FX.err + "</div>" : '<div class="fxr">' + (FX.out || "") + "</div>"); }
  document.getElementById("fxlcd").innerHTML = h;
  w.querySelectorAll(".fxk").forEach(function(b){ var id = b.dataset.k; b.classList.toggle("on", (id === "shift" && FX.shift) || (id === "alpha" && FX.alpha) || (id === "hyp" && FX.hyp)); });
  w.classList.toggle("shifted", FX.shift); w.classList.toggle("alphaed", FX.alpha);
}
function fxKeyHtml(k){
  var off = k.x ? " dis" : "";
  return '<button class="fxk ' + (k.c || "") + off + '"' + (k.area ? ' style="grid-area:' + k.area + '"' : "") + ' data-k="' + k.id + '"' + (k.x ? ' aria-disabled="true" title="Not available in this version"' : "") + ">" +
    (k.s ? '<span class="fs' + (k.sx ? " dis" : "") + '">' + k.s + "</span>" : "") + (k.a ? '<span class="fa">' + k.a + "</span>" : "") + '<span class="fp">' + k.p + "</span></button>";
}
function fxBuild(){
  var w = document.createElement("div"); w.id = "fxwin"; w.setAttribute("role", "dialog"); w.setAttribute("aria-label", "Scientific calculator"); w.tabIndex = -1;
  var h = '<div class="fxh" id="fxh"><span class="fxsolar" aria-hidden="true"></span><b>ME0212 · scientific</b><span class="fxmod">fx-991EX style</span><button class="fxx" data-fxc="close" aria-label="Close calculator">×</button></div><div class="fxbezel"><div class="fxlcdw"><div class="fxst" id="fxst"></div><div class="fxlcd" id="fxlcd" aria-live="polite"></div></div></div><div class="fxkeys">';
  FXROWS.forEach(function(row){
    if (row === "gap"){ h += '<div class="fxgap"></div>'; return; }
    if (row === "top"){ h += '<div class="fxtop">' + FXTOP.map(fxKeyHtml).join("") + "</div>"; return; }
    h += '<div class="fxrow n' + row.length + '">' + row.map(fxKeyHtml).join("") + "</div>";
  });
  w.innerHTML = h + '</div><p class="fxnote">Modes: Calculate, Complex, Base-N, Matrix, Vector, Statistics, Table, Equation. CALC, SOLVE, ∫ and d/dx work in Calculate. Not included: CONV, spreadsheet, distribution, inequality and ratio.</p>';
  document.body.appendChild(w);
  w.addEventListener("click", function(e){
    var b = e.target.closest("button"); if (!b) return;
    if (b.dataset.fxc === "close"){ fxClose(); return; }
    if (b.dataset.k) fxPress(b.dataset.k);
    w.focus({ preventScroll: true });
  });
  var map = { "0": "0", "1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8", "9": "9", ".": "dot", "+": "add", "-": "sub", "*": "mul", "/": "div", "(": "lp", ")": "rp", "Enter": "eq", "=": "eq", "Backspace": "del", "Escape": "ac", "ArrowLeft": "left", "ArrowRight": "right", "ArrowUp": "up", "ArrowDown": "down", "^": "pow", "!": "inv" };
  var hexk = { a: "neg", b: "deg", c: "hyp", d: "sin", e: "cos", f: "tan" };
  w.addEventListener("keydown", function(e){
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    var id = map[e.key], k = e.key.toLowerCase();
    if (FX.mode === "base" && hexk[k] && FX.view === "calc"){ FX.alpha = true; id = hexk[k]; }
    else if (e.key === "!"){ FX.shift = true; id = "inv"; }
    else if (e.key === "i"){ FX.shift = true; id = "eng"; }
    else if (e.key === "p"){ FX.shift = true; id = "exp"; }
    else if (e.key === "e"){ id = "exp"; FX.alpha = true; }
    else if (e.key === "x" || e.key === "X"){ id = "rp"; FX.alpha = true; }
    else if (e.key === "y" || e.key === "Y"){ id = "lp"; FX.alpha = true; }
    else if (e.key === ","){ id = "rp"; FX.shift = true; }
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
