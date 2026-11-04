// ===== calculator numerics for the extra modes: calculus, statistics, table, base-n, vectors, solver =====

// ---- calculus ----
function fxSimp(f, a, b, fa, fm, fb, whole, eps, depth){
  var m = (a + b) / 2, lm = (a + m) / 2, rm = (m + b) / 2, flm = f(lm), frm = f(rm);
  var left = (m - a) / 6 * (fa + 4 * flm + fm), right = (b - m) / 6 * (fm + 4 * frm + fb), d = left + right - whole;
  if (depth <= 0 || Math.abs(d) <= 15 * eps) return left + right + d / 15;
  return fxSimp(f, a, m, fa, flm, fm, left, eps / 2, depth - 1) + fxSimp(f, m, b, fm, frm, fb, right, eps / 2, depth - 1);
}
function fxIntegrate(f, a, b){
  if (a === b) return 0;
  var sg = 1, t; if (a > b){ t = a; a = b; b = t; sg = -1; }
  // split in 8 parts first so that narrow features are not missed
  var n = 8, s = 0, i, h = (b - a) / n;
  for (i = 0; i < n; i++){
    var x0 = a + i * h, x1 = x0 + h, xm = (x0 + x1) / 2, f0 = f(x0), fm = f(xm), f1 = f(x1);
    s += fxSimp(f, x0, x1, f0, fm, f1, (x1 - x0) / 6 * (f0 + 4 * fm + f1), 1e-11, 22);
  }
  if (!isFinite(s)) throw fxErr("Math ERROR");
  return sg * s;
}
function fxDeriv(f, a){
  var h = 1e-3 * Math.max(1, Math.abs(a));
  var d = (8 * (f(a + h) - f(a - h)) - (f(a + 2 * h) - f(a - 2 * h))) / (12 * h);
  if (!isFinite(d)) throw fxErr("Math ERROR");
  return d;
}
// the function of X taken from a token slice
function fxFnOfX(tokens){
  return function(x){
    var old = FX.vars.X; FX.vars.X = cx(x, 0);
    try { var r = fxEval(tokens).v; return realOf(r); } finally { if (old) FX.vars.X = old; else delete FX.vars.X; }
  };
}
// ---- solver: lhs = rhs or f = 0 for X ----
function fxSolve(tokens, guess){
  var k = tokens.indexOf("="), lhs, rhs;
  if (k >= 0){ lhs = tokens.slice(0, k); rhs = tokens.slice(k + 1); }
  else { lhs = tokens; rhs = ["0"]; }
  var fl = fxFnOfX(lhs), fr = fxFnOfX(rhs), f = function(x){ return fl(x) - fr(x); };
  var x = guess, i, fx, d, h;
  for (i = 0; i < 200; i++){
    fx = f(x); if (!isFinite(fx)) break;
    if (Math.abs(fx) < 1e-13) return { x: x, e: fx };
    h = 1e-6 * Math.max(1, Math.abs(x)); d = (f(x + h) - f(x - h)) / (2 * h);
    if (!isFinite(d) || Math.abs(d) < 1e-14) break;
    var nx = x - fx / d; if (Math.abs(nx - x) < 1e-13 * Math.max(1, Math.abs(x))){ x = nx; return { x: x, e: f(x) }; }
    x = nx;
  }
  // scan for a sign change around the guess and bisect
  var span, a, b, fa, fb;
  for (span = 1; span <= 1e6; span *= 2){
    a = guess - span; b = guess + span; fa = f(a); fb = f(b);
    if (isFinite(fa) && isFinite(fb) && fa * fb <= 0){
      for (i = 0; i < 200; i++){ var m = (a + b) / 2, fm = f(m); if (fa * fm <= 0){ b = m; fb = fm; } else { a = m; fa = fm; } }
      x = (a + b) / 2; if (Math.abs(f(x)) < 1e-6) return { x: x, e: f(x) };
    }
  }
  throw fxErr("Can't Solve");
}
// ---- statistics ----
var FXSTYPES = [
  { id: "1v", name: "1-Variable", two: false },
  { id: "lin", name: "A+BX", two: true, fx: function(a, b, c, x){ return a + b * x; } },
  { id: "quad", name: "_+CX²", two: true, fx: function(a, b, c, x){ return a + b * x + c * x * x; } },
  { id: "ln", name: "In X", two: true, fx: function(a, b, c, x){ return a + b * Math.log(x); } },
  { id: "exp", name: "e^X", two: true, fx: function(a, b, c, x){ return a * Math.exp(b * x); } },
  { id: "ab", name: "A·B^X", two: true, fx: function(a, b, c, x){ return a * Math.pow(b, x); } },
  { id: "pow", name: "A·X^B", two: true, fx: function(a, b, c, x){ return a * Math.pow(x, b); } },
  { id: "inv", name: "1/X", two: true, fx: function(a, b, c, x){ return a + b / x; } }
];
function fxStatType(id){ return FXSTYPES.filter(function(t){ return t.id === id; })[0]; }
function fxSorted(a){ return a.slice().sort(function(p, q){ return p - q; }); }
function fxMedian(s){ var n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; }
function fxQuart(xs){
  var s = fxSorted(xs), n = s.length, lo = s.slice(0, Math.floor(n / 2)), hi = s.slice(Math.ceil(n / 2));
  return { q1: lo.length ? fxMedian(lo) : s[0], med: fxMedian(s), q3: hi.length ? fxMedian(hi) : s[n - 1] };
}
function fxLinReg(X, Y){
  var n = X.length, sx = 0, sy = 0, sxx = 0, syy = 0, sxy = 0, i;
  for (i = 0; i < n; i++){ sx += X[i]; sy += Y[i]; sxx += X[i] * X[i]; syy += Y[i] * Y[i]; sxy += X[i] * Y[i]; }
  var den = n * sxx - sx * sx; if (den === 0) throw fxErr("Math ERROR");
  var b = (n * sxy - sx * sy) / den, a = (sy - b * sx) / n, rd = Math.sqrt(den * (n * syy - sy * sy));
  return { a: a, b: b, r: rd === 0 ? NaN : (n * sxy - sx * sy) / rd };
}
function fxStat(type, xs, ys){
  var t = fxStatType(type), n = xs.length; if (!n) throw fxErr("No Data");
  var r = { n: n, type: type }, i, sx = 0, sxx = 0, sy = 0, syy = 0, sxy = 0;
  for (i = 0; i < n; i++){ sx += xs[i]; sxx += xs[i] * xs[i]; }
  r.sx1 = sx; r.sx2 = sxx; r.mx = sx / n; r.sigx = Math.sqrt(Math.max(0, sxx / n - r.mx * r.mx)); r.sx = n > 1 ? Math.sqrt(Math.max(0, (sxx - n * r.mx * r.mx) / (n - 1))) : NaN;
  var s = fxSorted(xs), q = fxQuart(xs); r.minx = s[0]; r.maxx = s[n - 1]; r.q1 = q.q1; r.med = q.med; r.q3 = q.q3;
  if (!t.two) return r;
  if (ys.length !== n) throw fxErr("Data ERROR");
  for (i = 0; i < n; i++){ sy += ys[i]; syy += ys[i] * ys[i]; sxy += xs[i] * ys[i]; }
  r.sy1 = sy; r.sy2 = syy; r.sxy = sxy; r.my = sy / n; r.sigy = Math.sqrt(Math.max(0, syy / n - r.my * r.my)); r.sy = n > 1 ? Math.sqrt(Math.max(0, (syy - n * r.my * r.my) / (n - 1))) : NaN;
  var sy_ = fxSorted(ys); r.miny = sy_[0]; r.maxy = sy_[n - 1];
  var X = xs, Y = ys, g, c = 0;
  if (type === "lin"){ g = fxLinReg(X, Y); }
  else if (type === "ln"){ X = xs.map(function(v){ if (v <= 0) throw fxErr("Math ERROR"); return Math.log(v); }); g = fxLinReg(X, Y); }
  else if (type === "inv"){ X = xs.map(function(v){ if (v === 0) throw fxErr("Math ERROR"); return 1 / v; }); g = fxLinReg(X, Y); }
  else if (type === "exp"){ Y = ys.map(function(v){ if (v <= 0) throw fxErr("Math ERROR"); return Math.log(v); }); g = fxLinReg(X, Y); g = { a: Math.exp(g.a), b: g.b, r: g.r }; }
  else if (type === "ab"){ Y = ys.map(function(v){ if (v <= 0) throw fxErr("Math ERROR"); return Math.log(v); }); g = fxLinReg(X, Y); g = { a: Math.exp(g.a), b: Math.exp(g.b), r: g.r }; }
  else if (type === "pow"){ X = xs.map(function(v){ if (v <= 0) throw fxErr("Math ERROR"); return Math.log(v); }); Y = ys.map(function(v){ if (v <= 0) throw fxErr("Math ERROR"); return Math.log(v); }); g = fxLinReg(X, Y); g = { a: Math.exp(g.a), b: g.b, r: g.r }; }
  else if (type === "quad"){
    var S = [0, 0, 0, 0, 0], T = [0, 0, 0];
    for (i = 0; i < n; i++){ var x = xs[i], p = 1; for (var k = 0; k < 5; k++){ S[k] += p; p *= x; } T[0] += ys[i]; T[1] += ys[i] * x; T[2] += ys[i] * x * x; }
    var A = [[cx(S[0]), cx(S[1]), cx(S[2])], [cx(S[1]), cx(S[2]), cx(S[3])], [cx(S[2]), cx(S[3]), cx(S[4])]], sol = fxSolveLin(A, T.map(function(v){ return cx(v); }));
    g = { a: sol[0].re, b: sol[1].re, r: NaN }; c = sol[2].re;
  }
  r.a = g.a; r.b = g.b; r.c = c; r.r = g.r;
  r.est = function(x){ return t.fx(g.a, g.b, c, x); };
  // x-hat: value of x for a given y (not defined for the quadratic fit)
  r.estx = function(y){
    if (type === "lin") return (y - g.a) / g.b;
    if (type === "ln") return Math.exp((y - g.a) / g.b);
    if (type === "exp") return Math.log(y / g.a) / g.b;
    if (type === "ab") return Math.log(y / g.a) / Math.log(g.b);
    if (type === "pow") return Math.pow(y / g.a, 1 / g.b);
    if (type === "inv") return g.b / (y - g.a);
    throw fxErr("Math ERROR");
  };
  return r;
}
function fxStatVal(name){
  var s = FX.stat && FX.stat.res; if (!s) throw fxErr("Math ERROR");
  var m = { "x̄": "mx", "σx": "sigx", "sx": "sx", "Σx": "sx1", "Σx²": "sx2", "n": "n", "ȳ": "my", "σy": "sigy", "sy": "sy", "Σy": "sy1", "Σy²": "sy2", "Σxy": "sxy", "minX": "minx", "maxX": "maxx", "minY": "miny", "maxY": "maxy", "RegA": "a", "RegB": "b", "RegC": "c", "RegR": "r", "Q1": "q1", "Med": "med", "Q3": "q3" };
  var v = s[m[name]]; if (v === undefined || (typeof v === "number" && isNaN(v))) throw fxErr("Math ERROR");
  return cx(v, 0);
}
function fxStatLines(res, kind){
  var f = function(l, v){ return l + " = " + fxNum(v); }, L = [];
  if (kind === "one"){
    L = [f("x̄", res.mx), f("Σx", res.sx1), f("Σx²", res.sx2), f("σx", res.sigx), f("sx", isNaN(res.sx) ? 0 : res.sx), f("n", res.n), f("minX", res.minx), f("Q1", res.q1), f("Med", res.med), f("Q3", res.q3), f("maxX", res.maxx)];
    if (res.sy1 !== undefined) L = L.concat([f("ȳ", res.my), f("Σy", res.sy1), f("Σy²", res.sy2), f("Σxy", res.sxy), f("σy", res.sigy), f("sy", isNaN(res.sy) ? 0 : res.sy), f("minY", res.miny), f("maxY", res.maxy)]);
  } else {
    L = [f("a", res.a), f("b", res.b)]; if (res.type === "quad") L.push(f("c", res.c)); if (res.type !== "quad") L.push(f("r", res.r));
  }
  return L;
}
// ---- table ----
function fxTableRows(fTokens, start, end, step){
  if (!(step > 0) || end < start) throw fxErr("Math ERROR");
  var n = Math.floor((end - start) / step + 1e-9) + 1; if (n > 45) throw fxErr("Math ERROR");
  var f = fxFnOfX(fTokens), rows = [], i;
  for (i = 0; i < n; i++){ var x = start + i * step, y = null; try { y = f(x); } catch (e) { y = null; } rows.push([x, y]); }
  return rows;
}
// ---- base-n (32-bit two's complement) ----
var FXBASES = { dec: 10, hex: 16, bin: 2, oct: 8 };
function fxBaseWrap(v){ return v | 0; }
function fxBaseParse(tokens, base){
  var T = fxLex(tokens.join("")), p = 0;
  function peek(){ return T[p]; }
  function digitOK(t){ return /^[0-9A-F]$/.test(t) || /^\d+$/.test(t); }
  function lit(){
    var s = "";
    while (p < T.length && digitOK(T[p]) && !(s && false)){ s += T[p++]; }
    if (!s) throw fxErr("Syntax ERROR");
    var n = 0, i; for (i = 0; i < s.length; i++){ var d = parseInt(s.charAt(i), 16); if (isNaN(d) || d >= base) throw fxErr("Syntax ERROR"); n = n * base + d; }
    if (base === 10 ? n > 2147483647 : n > 4294967295) throw fxErr("Math ERROR");
    return fxBaseWrap(n);
  }
  function prim(){
    var t = peek();
    if (t === "(") { p++; var v = orx(); if (peek() === ")") p++; return v; }
    if (t === "Not("){ p++; var a = orx(); if (peek() === ")") p++; return ~a; }
    if (t === "Neg("){ p++; var b = orx(); if (peek() === ")") p++; return fxBaseWrap(-b); }
    return lit();
  }
  function sgn(){ if (peek() === "−"){ p++; return fxBaseWrap(-sgn()); } if (peek() === "+"){ p++; return sgn(); } return prim(); }
  function mul(){ var v = sgn(); while (peek() === "×" || peek() === "÷"){ var o = T[p++], r = sgn(); if (o === "×") v = Math.imul(v, r); else { if (r === 0) throw fxErr("Math ERROR"); v = Math.trunc(v / r) | 0; } } return v; }
  function add(){ var v = mul(); while (peek() === "+" || peek() === "−"){ var o = T[p++], r = mul(); v = o === "+" ? fxBaseWrap(v + r) : fxBaseWrap(v - r); } return v; }
  function andx(){ var v = add(); while (peek() === "and"){ p++; v = v & add(); } return v; }
  function orx(){ var v = andx(); while (peek() === "or" || peek() === "xor" || peek() === "xnor"){ var o = T[p++], r = andx(); v = o === "or" ? (v | r) : o === "xor" ? (v ^ r) : ~(v ^ r); } return v; }
  var v = orx(); if (p < T.length) throw fxErr("Syntax ERROR");
  return v;
}
function fxBaseShow(v, base){
  if (base === 10) return String(v).replace("-", "−");
  var u = v >>> 0, s = u.toString(base).toUpperCase();
  if (base === 2){ s = s.length > 16 ? ("00000000000000000000000000000000" + s).slice(-32) : s; return s.replace(/(?=(\d{4})+$)/g, " ").trim(); }
  return s;
}
// ---- vectors ----
function fxVec(a){ return { t: "V", a: a }; }
function fxVdot(p, q){ if (p.a.length !== q.a.length) throw fxErr("Dimension ERROR"); var s = cx(0, 0); for (var i = 0; i < p.a.length; i++) s = cadd(s, cmul(p.a[i], q.a[i])); return s; }
function fxVcross(p, q){
  if (p.a.length !== 3 || q.a.length !== 3) throw fxErr("Dimension ERROR");
  return fxVec([csub(cmul(p.a[1], q.a[2]), cmul(p.a[2], q.a[1])), csub(cmul(p.a[2], q.a[0]), cmul(p.a[0], q.a[2])), csub(cmul(p.a[0], q.a[1]), cmul(p.a[1], q.a[0]))]);
}
function fxVnorm(p){ var s = 0; p.a.forEach(function(c){ s += c.re * c.re + c.im * c.im; }); return Math.sqrt(s); }
// ---- physical constants (SI) ----
var FXCONST = [
  ["c", "speed of light", 299792458], ["ε₀", "vacuum permittivity", 8.8541878128e-12], ["μ₀", "vacuum permeability", 1.25663706212e-6],
  ["e", "elementary charge", 1.602176634e-19], ["g", "gravity", 9.80665], ["mₑ", "electron mass", 9.1093837015e-31],
  ["h", "Planck", 6.62607015e-34], ["k", "Boltzmann", 1.380649e-23], ["Nₐ", "Avogadro", 6.02214076e23]
];
