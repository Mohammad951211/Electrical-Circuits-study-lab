// ===== scientific calculator in the style of the Casio fx-991EX (own layout code, no Casio artwork) =====
var FX = { open: false, shift: false, alpha: false, hyp: false, pend: null, tokens: [], cur: 0, hist: [], hi: -1, ans: null, vars: {}, angle: "deg", cfmt: "rect", eng: false, frac: false, view: "calc", out: "", err: "", menuSel: 0, mats: {}, ctx: null, x: null, y: null };
function fxErr(m){ var e = new Error(m); e.fx = m; return e; }
// ---- complex numbers and matrices ----
function cx(re, im){ return { t: "C", re: re, im: im || 0 }; }
function cadd(a, b){ return cx(a.re + b.re, a.im + b.im); }
function csub(a, b){ return cx(a.re - b.re, a.im - b.im); }
function cmul(a, b){ return cx(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re); }
function cdiv(a, b){ var d = b.re * b.re + b.im * b.im; if (d === 0) throw fxErr("Math ERROR"); return cx((a.re * b.re + a.im * b.im) / d, (a.im * b.re - a.re * b.im) / d); }
function cabsv(a){ return Math.hypot(a.re, a.im); }
function cargv(a){ return Math.atan2(a.im, a.re); }
function cexp(a){ var m = Math.exp(a.re); return cx(m * Math.cos(a.im), m * Math.sin(a.im)); }
function cln(a){ if (a.re === 0 && a.im === 0) throw fxErr("Math ERROR"); return cx(Math.log(cabsv(a)), cargv(a)); }
function csqrt(a){ var r = cabsv(a), t = cargv(a) / 2; var s = Math.sqrt(r); return cx(s * Math.cos(t), s * Math.sin(t)); }
function cpow(a, b){
  if (b.im === 0 && a.im === 0){
    if (a.re >= 0 || Number.isInteger(b.re)){ if (a.re === 0 && b.re < 0) throw fxErr("Math ERROR"); return cx(Math.pow(a.re, b.re), 0); }
  }
  if (a.re === 0 && a.im === 0){ if (b.re > 0) return cx(0, 0); throw fxErr("Math ERROR"); }
  if (b.im === 0 && Number.isInteger(b.re) && Math.abs(b.re) <= 64){ var r = cx(1, 0), n = Math.abs(b.re), k; for (k = 0; k < n; k++) r = cmul(r, a); return b.re < 0 ? cdiv(cx(1, 0), r) : r; }
  return cexp(cmul(b, cln(a)));
}
function realOf(v){ if (v.t !== "C") throw fxErr("Math ERROR"); if (Math.abs(v.im) > 1e-12 * Math.max(1, Math.abs(v.re))) throw fxErr("Math ERROR"); return v.re; }
function toRadA(x){ return FX.angle === "deg" ? x * Math.PI / 180 : FX.angle === "gra" ? x * Math.PI / 200 : x; }
function fromRadA(x){ return FX.angle === "deg" ? x * 180 / Math.PI : FX.angle === "gra" ? x * 200 / Math.PI : x; }
function fact(n){ if (!Number.isInteger(n) || n < 0 || n > 69) throw fxErr("Math ERROR"); var r = 1, i; for (i = 2; i <= n; i++) r *= i; return r; }
function mat(m, n){ var a = [], i, j; for (i = 0; i < m; i++){ a.push([]); for (j = 0; j < n; j++) a[i].push(cx(0, 0)); } return { t: "M", m: m, n: n, a: a }; }
function mmul(A, B){ if (A.n !== B.m) throw fxErr("Dimension ERROR"); var R = mat(A.m, B.n), i, j, k; for (i = 0; i < A.m; i++) for (j = 0; j < B.n; j++){ var s = cx(0, 0); for (k = 0; k < A.n; k++) s = cadd(s, cmul(A.a[i][k], B.a[k][j])); R.a[i][j] = s; } return R; }
function mscal(c, A){ var R = mat(A.m, A.n), i, j; for (i = 0; i < A.m; i++) for (j = 0; j < A.n; j++) R.a[i][j] = cmul(c, A.a[i][j]); return R; }
function mtrn(A){ var R = mat(A.n, A.m), i, j; for (i = 0; i < A.m; i++) for (j = 0; j < A.n; j++) R.a[j][i] = A.a[i][j]; return R; }
function mdet(A){
  if (A.m !== A.n) throw fxErr("Dimension ERROR");
  var n = A.n, M = A.a.map(function(r){ return r.slice(); }), d = cx(1, 0), i, j, k;
  for (i = 0; i < n; i++){
    var p = i; for (j = i + 1; j < n; j++) if (cabsv(M[j][i]) > cabsv(M[p][i])) p = j;
    if (cabsv(M[p][i]) < 1e-13) return cx(0, 0);
    if (p !== i){ var t = M[p]; M[p] = M[i]; M[i] = t; d = cmul(d, cx(-1, 0)); }
    d = cmul(d, M[i][i]);
    for (j = i + 1; j < n; j++){ var f = cdiv(M[j][i], M[i][i]); for (k = i; k < n; k++) M[j][k] = csub(M[j][k], cmul(f, M[i][k])); }
  }
  return d;
}
function minv(A){
  if (A.m !== A.n) throw fxErr("Dimension ERROR");
  var n = A.n, M = A.a.map(function(r, i){ return r.concat(r.map(function(_, j){ return cx(i === j ? 1 : 0, 0); })); }), i, j, k;
  for (i = 0; i < n; i++){
    var p = i; for (j = i + 1; j < n; j++) if (cabsv(M[j][i]) > cabsv(M[p][i])) p = j;
    if (cabsv(M[p][i]) < 1e-13) throw fxErr("Math ERROR");
    var t = M[p]; M[p] = M[i]; M[i] = t;
    var piv = M[i][i]; for (k = 0; k < 2 * n; k++) M[i][k] = cdiv(M[i][k], piv);
    for (j = 0; j < n; j++) if (j !== i){ var f = M[j][i]; for (k = 0; k < 2 * n; k++) M[j][k] = csub(M[j][k], cmul(f, M[i][k])); }
  }
  var R = mat(n, n); for (i = 0; i < n; i++) for (j = 0; j < n; j++) R.a[i][j] = M[i][n + j]; return R;
}
// ---- tokenizer and parser ----
var FXFUN = ["sin⁻¹(", "cos⁻¹(", "tan⁻¹(", "sinh(", "cosh(", "tanh(", "sin(", "cos(", "tan(", "log(", "ln(", "√(", "∛(", "abs(", "arg(", "conj(", "Re(", "Im(", "det(", "trn(", "iden(", "10^(", "e^("];
var FXSYM = ["MatA", "MatB", "MatC", "Ans", "nPr", "nCr", "▶r∠θ", "▶a+bi", "ˣ√", "⁻¹", "×", "÷", "⁄", "−", "+", "^", "(", ")", ",", "²", "³", "!", "%", "°", "∠", "π", "i", "e", "A", "B", "C", "D", "F", "X", "Y", "M"];
function fxLex(s){
  var out = [], i = 0, m, k, hit;
  while (i < s.length){
    var rest = s.slice(i);
    if ((m = /^(\d+\.?\d*|\.\d+)(ᴇ[−+]?\d+)?/.exec(rest))){ out.push(m[0]); i += m[0].length; continue; }
    hit = null; for (k = 0; k < FXFUN.length; k++) if (rest.indexOf(FXFUN[k]) === 0){ hit = FXFUN[k]; break; }
    if (!hit){ for (k = 0; k < FXSYM.length; k++) if (rest.indexOf(FXSYM[k]) === 0){ hit = FXSYM[k]; break; } }
    if (!hit && rest.charAt(0) === "E") hit = "E";
    if (!hit) throw fxErr("Syntax ERROR");
    out.push(hit); i += hit.length;
  }
  return out;
}
function fxEval(tokens){
  var T = fxLex(tokens.join("")), p = 0, mode = null;
  function peek(){ return T[p]; }
  function nxt(){ return T[p++]; }
  function isNum(t){ return /^[\d.]/.test(t); }
  function startsAtom(t){ return t !== undefined && (isNum(t) || t === "(" || t === "π" || t === "i" || t === "e" || /^[ABCDEFXYM]$/.test(t) || t === "Ans" || /^Mat/.test(t) || FXFUN.indexOf(t) >= 0); }
  function toC(v){ if (v.t !== "C") throw fxErr("Math ERROR"); return v; }
  function add(a, b){ if (a.t === "M" && b.t === "M"){ if (a.m !== b.m || a.n !== b.n) throw fxErr("Dimension ERROR"); var R = mat(a.m, a.n), i, j; for (i = 0; i < a.m; i++) for (j = 0; j < a.n; j++) R.a[i][j] = cadd(a.a[i][j], b.a[i][j]); return R; } return cadd(toC(a), toC(b)); }
  function neg(a){ return a.t === "M" ? mscal(cx(-1, 0), a) : cx(-a.re, -a.im); }
  function mul(a, b){ if (a.t === "M" && b.t === "M") return mmul(a, b); if (a.t === "M") return mscal(b, a); if (b.t === "M") return mscal(a, b); return cmul(a, b); }
  function div(a, b){ if (b.t === "M") throw fxErr("Math ERROR"); if (a.t === "M") return mscal(cdiv(cx(1, 0), b), a); return cdiv(a, b); }
  function sum(){ var v = term(); while (peek() === "+" || peek() === "−"){ var o = nxt(), r = term(); v = o === "+" ? add(v, r) : add(v, neg(r)); } return v; }
  function term(){ var v = perm(); while (peek() === "×" || peek() === "÷" || peek() === "⁄"){ var o = nxt(), r = perm(); v = o === "×" ? mul(v, r) : div(v, r); } return v; }
  function perm(){ var v = polar(); while (peek() === "nPr" || peek() === "nCr"){ var o = nxt(), r = polar(), n = realOf(v), k = realOf(r); if (!Number.isInteger(n) || !Number.isInteger(k) || k < 0 || n < k) throw fxErr("Math ERROR"); v = cx(o === "nPr" ? fact(n) / fact(n - k) : fact(n) / (fact(k) * fact(n - k)), 0); } return v; }
  function polar(){ var v = signed(); if (peek() === "∠"){ nxt(); var th = toRadA(realOf(signed())), r = realOf(v); return cx(r * Math.cos(th), r * Math.sin(th)); } return v; }
  function signed(){ if (peek() === "−"){ nxt(); return neg(signed()); } if (peek() === "+"){ nxt(); return signed(); } return impl(); }
  function impl(){ var v = pw(); while (startsAtom(peek())) v = mul(v, pw()); return v; }
  function pw(){
    var b = post();
    if (peek() === "ˣ√"){ nxt(); var x = pwSigned(); return cpow(x, cdiv(cx(1, 0), toC(b))); }
    if (peek() === "^"){ nxt(); var e = pwSigned(); if (b.t === "M"){ var n = realOf(e), R = b, i; if (n === -1) return minv(b); if (!Number.isInteger(n) || n < 1) throw fxErr("Math ERROR"); for (i = 1; i < n; i++) R = mmul(R, b); return R; } return cpow(b, toC(e)); }
    return b;
  }
  function pwSigned(){ if (peek() === "−"){ nxt(); return neg(pwSigned()); } if (peek() === "+"){ nxt(); return pwSigned(); } return pw(); }
  function post(){
    var v = atom();
    for (;;){
      var t = peek();
      if (t === "²"){ nxt(); v = v.t === "M" ? mmul(v, v) : cmul(v, v); }
      else if (t === "³"){ nxt(); v = v.t === "M" ? mmul(mmul(v, v), v) : cmul(cmul(v, v), v); }
      else if (t === "⁻¹"){ nxt(); v = v.t === "M" ? minv(v) : cdiv(cx(1, 0), v); }
      else if (t === "!"){ nxt(); v = cx(fact(realOf(v)), 0); }
      else if (t === "%"){ nxt(); v = cdiv(toC(v), cx(100, 0)); }
      else if (t === "°"){ nxt(); var d = realOf(v); v = cx(FX.angle === "deg" ? d : FX.angle === "gra" ? d * 200 / 180 : d * Math.PI / 180, 0); }
      else break;
    }
    return v;
  }
  function arg(){ var v = sum(); if (peek() === ")") nxt(); return v; }
  function atom(){
    var t = nxt();
    if (t === undefined) throw fxErr("Syntax ERROR");
    if (isNum(t)){ return cx(parseFloat(t.replace("ᴇ", "e").replace("−", "-")), 0); }
    if (t === "(") return arg();
    if (t === "π") return cx(Math.PI, 0);
    if (t === "e") return cx(Math.E, 0);
    if (t === "i") return cx(0, 1);
    if (/^[ABCDEFXYM]$/.test(t)) return FX.vars[t] || cx(0, 0);
    if (t === "Ans") return FX.ans || cx(0, 0);
    if (/^Mat[ABC]$/.test(t)){ var Mx = FX.mats[t.charAt(3)]; if (!Mx) throw fxErr("Dimension ERROR"); return Mx; }
    if (FXFUN.indexOf(t) >= 0){
      var a = arg(), r;
      switch (t){
        case "sin(": r = cx(Math.sin(toRadA(realOf(a))), 0); break;
        case "cos(": r = cx(Math.cos(toRadA(realOf(a))), 0); break;
        case "tan(": { var q = toRadA(realOf(a)); if (Math.abs(Math.cos(q)) < 1e-14) throw fxErr("Math ERROR"); r = cx(Math.tan(q), 0); break; }
        case "sin⁻¹(": { var s1 = realOf(a); if (Math.abs(s1) > 1) throw fxErr("Math ERROR"); r = cx(fromRadA(Math.asin(s1)), 0); break; }
        case "cos⁻¹(": { var c1 = realOf(a); if (Math.abs(c1) > 1) throw fxErr("Math ERROR"); r = cx(fromRadA(Math.acos(c1)), 0); break; }
        case "tan⁻¹(": r = cx(fromRadA(Math.atan(realOf(a))), 0); break;
        case "sinh(": r = cx(Math.sinh(realOf(a)), 0); break;
        case "cosh(": r = cx(Math.cosh(realOf(a)), 0); break;
        case "tanh(": r = cx(Math.tanh(realOf(a)), 0); break;
        case "log(": { var l = realOf(a); if (l <= 0) throw fxErr("Math ERROR"); r = cx(Math.log10(l), 0); break; }
        case "ln(": r = cln(toC(a)); break;
        case "√(": r = csqrt(toC(a)); break;
        case "∛(": { var cv = realOf(a); r = cx(Math.cbrt(cv), 0); break; }
        case "abs(": r = cx(cabsv(toC(a)), 0); break;
        case "arg(": r = cx(fromRadA(cargv(toC(a))), 0); break;
        case "conj(": r = cx(toC(a).re, -toC(a).im); break;
        case "Re(": r = cx(toC(a).re, 0); break;
        case "Im(": r = cx(toC(a).im, 0); break;
        case "det(": if (a.t !== "M") throw fxErr("Math ERROR"); r = mdet(a); break;
        case "trn(": if (a.t !== "M") throw fxErr("Math ERROR"); r = mtrn(a); break;
        case "iden(": { var n = realOf(a); if (!Number.isInteger(n) || n < 1 || n > 4) throw fxErr("Math ERROR"); r = mat(n, n); for (var z = 0; z < n; z++) r.a[z][z] = cx(1, 0); break; }
        case "10^(": r = cx(Math.pow(10, realOf(a)), 0); break;
        case "e^(": r = cexp(toC(a)); break;
      }
      return r;
    }
    throw fxErr("Syntax ERROR");
  }
  var v = sum();
  if (peek() === "▶r∠θ" || peek() === "▶a+bi"){ mode = nxt() === "▶r∠θ" ? "polar" : "rect"; }
  if (p < T.length) throw fxErr("Syntax ERROR");
  return { v: v, mode: mode };
}
// ---- display ----
function fxClean(v){
  if (v.t === "M"){ var R = mat(v.m, v.n), i, j; for (i = 0; i < v.m; i++) for (j = 0; j < v.n; j++) R.a[i][j] = fxClean(v.a[i][j]); return R; }
  var s = Math.max(Math.abs(v.re), Math.abs(v.im)), re = Math.abs(v.re) < 1e-12 * s ? 0 : v.re, im = Math.abs(v.im) < 1e-12 * s ? 0 : v.im;
  if (!isFinite(re) || !isFinite(im)) throw fxErr("Math ERROR");
  var rd = function(x){ return x === 0 ? 0 : Number(x.toPrecision(14)); };
  return cx(rd(re), rd(im));
}
function fxNum(x){
  if (x === 0) return "0";
  var ax = Math.abs(x), sci = ax >= 1e10 || ax < 1e-2;
  if (FX.eng || sci){
    var e = Math.floor(Math.log10(ax)); if (FX.eng) e = Math.floor(e / 3) * 3;
    var m = x / Math.pow(10, e), ms = Number(m.toPrecision(10));
    if (!FX.eng && Math.abs(ms) >= 10){ ms = ms / 10; e += 1; }
    return ms + "×10<sup>" + e + "</sup>";
  }
  return String(Number(x.toPrecision(10)));
}
function fxFrac(x){
  if (Number.isInteger(x)) return null;
  var ax = Math.abs(x), h1 = 1, h0 = 0, k1 = 0, k0 = 1, b = ax, i;
  for (i = 0; i < 20; i++){
    var a = Math.floor(b), h2 = a * h1 + h0, k2 = a * k1 + k0;
    h0 = h1; h1 = h2; k0 = k1; k1 = k2;
    if (k1 > 99999) return null;
    if (Math.abs(ax - h1 / k1) < 1e-10 * Math.max(1, ax)) return [x < 0 ? -h1 : h1, k1];
    var fr = b - a; if (fr < 1e-12) break; b = 1 / fr;
  }
  return null;
}
function fxReal(x){ if (FX.frac){ var f = fxFrac(x); if (f) return (f[0] < 0 ? "−" : "") + '<span class="fr"><span>' + Math.abs(f[0]) + "</span><span>" + f[1] + "</span></span>"; } return fxNum(x).replace(/^-/, "−"); }
function fxShowC(v, mode){
  mode = mode || FX.cfmt;
  if (v.im === 0) return fxReal(v.re).replace(/^-/, "−");
  if (mode === "polar"){ return fxNum(cabsv(v)) + "∠" + fxNum(fromRadA(cargv(v))); }
  var re = v.re === 0 ? "" : fxNum(v.re), im = Math.abs(v.im) === 1 ? "i" : fxNum(Math.abs(v.im)) + "i";
  return (re + (v.im < 0 ? "−" : (re ? "+" : "")) + im).replace(/-/g, "−");
}
function fxShow(v, mode){
  if (v.t === "M"){ return '<table class="fxm">' + v.a.map(function(r){ return "<tr>" + r.map(function(c){ return "<td>" + fxShowC(c, mode) + "</td>"; }).join("") + "</tr>"; }).join("") + "</table>"; }
  return fxShowC(v, mode);
}
function fxRun(str){ var r = fxEval([str]); var v = fxClean(r.v); return { html: fxShow(v, r.mode), re: v.re, im: v.im, t: v.t }; }
// ---- equations ----
function fxSolveLin(A, B){
  var n = A.length, M = A.map(function(r, i){ return r.concat([B[i]]); }), i, j, k;
  for (i = 0; i < n; i++){
    var p = i; for (j = i + 1; j < n; j++) if (cabsv(M[j][i]) > cabsv(M[p][i])) p = j;
    if (cabsv(M[p][i]) < 1e-13) throw fxErr("Math ERROR");
    var t = M[p]; M[p] = M[i]; M[i] = t;
    for (j = 0; j < n; j++) if (j !== i){ var f = cdiv(M[j][i], M[i][i]); for (k = i; k <= n; k++) M[j][k] = csub(M[j][k], cmul(f, M[i][k])); }
  }
  return M.map(function(r, i){ return cdiv(r[n], r[i]); });
}
function fxRoots(co){ // co: complex coefficients, highest power first
  var n = co.length - 1, i, k;
  if (cabsv(co[0]) === 0) throw fxErr("Math ERROR");
  var c = co.map(function(x){ return cdiv(x, co[0]); }), z = [], s = cx(0.4, 0.9);
  for (i = 0; i < n; i++) z.push(cpow(s, cx(i, 0)));
  for (k = 0; k < 500; k++){
    var mx = 0;
    for (i = 0; i < n; i++){
      var pv = cx(1, 0), j; for (j = 1; j <= n; j++) pv = cadd(cmul(pv, z[i]), c[j]);
      var den = cx(1, 0); for (j = 0; j < n; j++) if (j !== i) den = cmul(den, csub(z[i], z[j]));
      var d = cdiv(pv, den); z[i] = csub(z[i], d); mx = Math.max(mx, cabsv(d));
    }
    if (mx < 1e-15) break;
  }
  return z;
}
