// ================= circuit drawings for worked examples and random questions =================
// Every example, practice and quiz item that talks about a circuit gets a drawing.
// EXFIG: "chapter|id" -> function that returns the SVG. GENFIG: generator id -> function(text) -> SVG.
// Builders use the schematic library in fig-lib.js (rect, hrun, vrun, B, P).

var EXFIG = {}, GENFIG = {};
function R_(lab, c, side, o){ var it = { t: "r", c: c, lab: lab, side: side || "t" }; if (o) for (var k in o) it[k] = o[k]; return it; }
function Bc(lab, plus, side, c){ return { t: "bat", c: c, plus: plus || "u", lab: lab, side: side || "l" }; }
function termAB(x, ya, yb){ return P.term(x, ya) + P.term(x, yb) + P.t(x + 8, ya + 4, "a", "start", "sign") + P.t(x + 8, yb + 4, "b", "start", "sign"); }
function nodeLab(x, y, s, dx, dy){ return P.t(x + (dx || 0), y + (dy == null ? -8 : dy), s, "middle", "sign"); }

// E and one resistor; optional current arrow label
function fLoop(E, R, I){ return svg(rect(XL, XR, YT, YB, { l: [B(E)], r: [R_(R, YM, "l")] }) + (I ? P.arr(150, 26, 200, 26, I, 175, 20) : "")); }
// source with internal resistance feeding a load; open = show terminals a, b with no load
function fReal(VS, RS, RL, open){
  var s = vrun(XL, YT, YB, [B(VS)]) + hrun(YT, XL, XR, [R_(RS, 175, "t")]) + hrun(YB, XR, XL, []);
  if (open) return svg(s + termAB(XR, YT, YB));
  return svg(s + vrun(XR, YT, YB, [R_(RL, YM, "l")]) + P.t(XR + 8, YT + 4, "a", "start", "sign") + P.t(XR + 8, YB + 4, "b", "start", "sign"));
}
// current source with a resistor in parallel; R == null leaves the terminals open
function fIsrc(I, R, dir){
  var s = vrun(XL, YT, YB, [{ t: "isrc", c: YM, dir: dir || "u", lab: I, side: "l" }]) + hrun(YT, XL, XR, []) + hrun(YB, XR, XL, []);
  return svg(R ? s + vrun(XR, YT, YB, [R_(R, YM, "l")]) : s + P.term(XR, YT) + P.term(XR, YB) + P.t(XR + 8, YT + 4, "a", "start", "sign") + P.t(XR + 8, YB + 4, "b", "start", "sign"));
}
// a node with several currents (items: [label, direction "in"|"out", angle in degrees])
function fNode(list){
  var cx = 190, cy = 82, s = P.dot(cx, cy).replace('r="3.3"', 'r="5"'), n = list.length, ang = n === 3 ? [180, 0, 90] : n === 4 ? [180, 0, 90, 270] : [180, 0, 90, 270, 325];
  list.forEach(function(it, i){
    var a = ang[i] * Math.PI / 180, ux = Math.cos(a), uy = -Math.sin(a), arm = uy ? 46 : 70, x1 = cx + ux * 24, y1 = cy + uy * 24, x2 = cx + ux * arm, y2 = cy + uy * arm;
    s += P.w([[x2, y2], [x1, y1]]);
    var inward = it[1] === "in", fx = inward ? x2 : x1, fy = inward ? y2 : y1, tx = inward ? x1 : x2, ty = inward ? y1 : y2;
    s += P.arr(fx + (tx - fx) * 0.15, fy + (ty - fy) * 0.15, fx + (tx - fx) * 0.85, fy + (ty - fy) * 0.85, "", 0, 0);
    s += P.t(cx + ux * (arm + 12), cy + uy * (arm + 12) + (uy ? (uy > 0 ? 10 : -4) : 4), it[0], ux > 0.5 ? "start" : ux < -0.5 ? "end" : "middle", "acc");
  });
  return svg(s);
}
// n resistors / capacitors / inductors in series on a source; labs = labels
function fSer(E, labs, type){
  var n = labs.length, xs = [], i; for (i = 0; i < n; i++) xs.push(XL + 28 + (XR - XL - 56) * (n === 1 ? 0.5 : i / (n - 1)));
  return svg(rect(XL, XR, YT, YB, { l: [B(E)], t: xs.map(function(x, k){ return type === "r" || !type ? R_(labs[k], x, "t") : { t: type, c: x, lab: labs[k], side: "t" }; }) }));
}
// parallel branches of one element each on a source (type r | cap | ind)
function fPar(top, labs, type){
  var n = labs.length, xs = [], i, s; for (i = 0; i < n; i++) xs.push(XL + 38 + (XR - XL - 50) * (n === 1 ? 0.5 : i / (n - 1)));
  s = vrun(XL, YT, YB, [top.indexOf("A") > 0 ? { t: "isrc", c: YM, dir: "u", lab: top, side: "l" } : B(top)]) + hrun(YT, XL, XR, []) + hrun(YB, XR, XL, []);
  var d = [];
  xs.forEach(function(x, k){
    var it = type === "r" || !type ? R_(labs[k], YM, "r", { off: 10 }) : { t: type, c: YM, lab: labs[k], side: "r" };
    s += vrun(x, YT, YB, [it]); if (k < n - 1 || x < XR) d.push([x, YT], [x, YB]);
  });
  return svg(s + dots(d.filter(function(p){ return p[0] < XR; })));
}
// R1 in series with R2 // R3 (any element type)
function fSP(E, R1, R2, R3, type){
  var el = function(l, side){ return type ? { t: type, c: YM, lab: l, side: side } : R_(l, YM, side, { off: 10 }); };
  var top = type ? { t: type, c: 135, lab: R1, side: "t" } : R_(R1, 135, "t");
  return svg(vrun(XL, YT, YB, [B(E)]) + hrun(YT, XL, XR, [top]) + vrun(215, YT, YB, [el(R2, "l")]) + vrun(XR, YT, YB, [el(R3, "r")]) + hrun(YB, XR, XL, []) + dots([[215, YT], [215, YB]]));
}
// voltage divider with node labels; gnd = "bottom" (negative terminal) or "mid" (point b)
function fDiv(E, R1, R2, gnd){
  var s = vrun(XL, YT, YB, [B(E)]) + hrun(YT, XL, XR, [R_(R1, 190, "t")]) + vrun(XR, YT, YB, [R_(R2, YM, "l")]) + hrun(YB, XR, XL, []);
  s += P.t(XL + 22, YT - 8, "a", "middle", "sign") + P.t(XR + 12, YT + 4, "b", "start", "sign");
  s += gnd === "mid" ? P.w([[XR, YM], [XR + 34, YM]]) + P.gnd(XR + 34, YM) : P.gnd(190, YB);
  return svg(s + P.dot(XR, YM));
}
// three vertical branches between a top and bottom wire; each branch = list of items (c is set here)
function fBranches(b1, b2, b3, xs, labs){
  xs = xs || [XL, 190, XR]; var s = hrun(YT, xs[0], xs[2], []) + hrun(YB, xs[2], xs[0], []), d = [];
  [b1, b2, b3].forEach(function(it, k){ if (!it) return; s += vrun(xs[k], YT, YB, it); if (k === 1) d.push([xs[k], YT], [xs[k], YB]); });
  s += (labs && labs.a ? P.t(190 + 12, YT - 6, "a", "start", "sign") : "") + (labs && labs.b ? P.t(190 + 12, YB + 14, "b", "start", "sign") : "");
  return svg(s + dots(d));
}
// two sources feeding one common branch (Millman / superposition shape)
function fTwoSrc(E1, E2, R1, R2, R3){
  return fBranches([R_(R1, 62, "r", { off: 10 }), Bc(E1, "u", "l", 106)], [R_(R3, YM, "r", { off: 10 })], [R_(R2, 62, "l", { off: 10 }), Bc(E2, "u", "r", 106)], [96, 190, 284]);
}
// node circuit: branch 1 = E + R1, branch 2 = current source, branch 3 = R3 (nodes a and b)
function fNodeCkt(E, R1, I, R3, dir){
  var b1 = [R_(R1, 62, "r", { off: 10 }), Bc(E, "u", "l", 106)];
  return fBranches(b1, [{ t: "isrc", c: YM, dir: dir || "u", lab: I, side: "r" }], [R_(R3, YM, "r", { off: 10 })], null, { a: 1, b: 1 });
}
// AC: source, series impedances on top
function fACser(V, zs){
  var xs = [150, 235];
  return svg(rect(XL, XR, YT, YB, { l: [{ t: "acs", c: YM, lab: V, side: "r", off: 20 }], t: zs.slice(0, 2).map(function(z, k){ return z[0] === "r" ? R_(z[1], xs[k], "t") : { t: z[0], c: xs[k], lab: z[1], side: "t" }; }), r: zs[2] ? [R_(zs[2][1], YM, "l")] : [] }));
}
function fACpar(V, z1, z2){
  var mk = function(z, side){ return z[0] === "r" ? R_(z[1], YM, side, { off: 10 }) : { t: z[0], c: YM, lab: z[1], side: side }; };
  return svg(vrun(XL, YT, YB, V ? [{ t: "acs", c: YM, lab: V, side: "r", off: 20 }] : []) + hrun(YT, XL, 280, []) + hrun(YB, 280, XL, []) + vrun(170, YT, YB, [mk(z1, "l")]) + vrun(250, YT, YB, [mk(z2, "r")]) + dots([[170, YT], [170, YB]]));
}
// motor load with a power-factor capacitor in parallel
function fPFC(P_, Q){
  return svg(vrun(XL, YT, YB, [{ t: "acs", c: YM, lab: "V", side: "r", off: 20 }]) + hrun(YT, XL, 280, []) + hrun(YB, 280, XL, []) + vrun(170, YT, YB, [R_(P_, YM, "l", { len: 44 })]) + vrun(250, YT, YB, [{ t: "cap", c: YM, lab: Q, side: "r" }]) + dots([[170, YT], [170, YB]]));
}
function fLine(V, RL, load){
  return svg(vrun(XL, YT, YB, [{ t: "acs", c: YM, lab: V, side: "r", off: 20 }]) + hrun(YT, XL, XR, [R_(RL, 150, "t")]) + hrun(YB, XR, XL, [R_(RL, 150, "b")]) + vrun(XR, YT, YB, [R_(load || "load", YM, "l", { off: 10 })]));
}
function fMatch2(rs, rl, n){
  var s = vrun(XL, YT, YB, [{ t: "acs", c: YM, lab: "e", side: "l" }]) + hrun(YT, XL, 158, [R_(rs, 118, "t")]) + hrun(YB, 158, XL, []);
  s += run(158, YT, 158, YB, [{ t: "ind", p: 45 }]) + run(214, YB, 214, YT, [{ t: "ind", p: 45 }]) + '<line class="w" x1="182" y1="50" x2="182" y2="116"/><line class="w" x1="190" y1="50" x2="190" y2="116"/>';
  s += hrun(YT, 214, XR, []) + hrun(YB, XR, 214, []) + vrun(XR, YT, YB, [R_(rl, YM, "l", { off: 10 })]) + P.t(186, 150, n);
  return svg(s);
}
function fThev(E, R1, R2, R3){
  return svg(vrun(XL, YT, YB, [B(E)]) + hrun(YT, XL, XR, [R_(R1, 125, "t"), R_(R3, 255, "t")]) + vrun(190, YT, YB, [R_(R2, YM, "r", { off: 10 })]) + hrun(YB, XR, XL, []) + dots([[190, YT], [190, YB]]) + termAB(XR, YT, YB));
}
function fTerm(E, R1, R2){
  return svg(vrun(XL, YT, YB, [B(E)]) + hrun(YT, XL, XR, [R_(R1, 150, "t")]) + vrun(235, YT, YB, [R_(R2, YM, "l", { off: 10 })]) + hrun(YB, XR, XL, []) + hrun(YT, 235, XR, []) + dots([[235, YT], [235, YB]]) + termAB(XR, YT, YB));
}

(function(){
  var E = EXFIG;
  // ---- chapter 1 ----
  E["1|P2"] = function(){ return svg(rect(XL, XR, YT, YB, { l: [B("E")], r: [{ t: "lamp", c: YM }] }) + P.t(190, 22, "36 J moves 3 C", "middle") + vrun(215, YT, YB, [{ t: "m", c: YM, ch: "V", lab: "V = ?", side: "r" }]) + dots([[215, YT], [215, YB]])); };
  E["1|P3"] = function(){ return svg(hrun(YM, 60, 322, [R_("R = 50 Ω", 191, "t")]) + P.term(60, YM) + P.term(322, YM)); };
  E["1|P4"] = function(){ return fLoop("E = 12 V", "R = 4 kΩ", "I = ?"); };
  E["1|P6"] = function(){ return svg(rect(XL, XR, YT, YB, { l: [B("E")], r: [R_("R = 5 Ω", YM, "l")] }) + P.arr(150, 26, 200, 26, "I = −2 A", 175, 20) + P.t(XR + 12, 70, "+", "start", "sign") + P.t(XR + 12, 100, "−", "start", "sign")); };
  E["1|X3"] = function(){ return svg(vrun(XL, YT, YB, [B("9 V")]) + hrun(YT, XL, 170, []) + hrun(YT, 200, XR, []) + P.term(170, YT) + P.term(200, YT) + P.t(185, YT - 10, "cut", "middle", "acc") + vrun(XR, YT, YB, [{ t: "lamp", c: YM, lab: "lamp", side: "l" }]) + hrun(YB, XR, XL, [])); };
  E["1|X10"] = function(){ return svg(rect(XL, XR, YT, YB, { l: [B("E")], t: [{ t: "m", c: 140, ch: "A", lab: "25 mA", side: "t" }], r: [R_("R", YM, "l")] }) + vrun(225, YT, YB, [{ t: "m", c: YM, ch: "V", lab: "7.5 V", side: "l" }]) + dots([[225, YT], [225, YB]])); };
  E["1|X7"] = function(){ return svg(hrun(YM, 60, 322, [R_("R = ?", 191, "t", { len: 120 })]) + P.term(60, YM) + P.term(322, YM) + P.t(191, YM + 30, "ℓ = 100 m,  A = 2 mm²", "middle")); };
  // ---- chapter 2 ----
  E["2|2.1"] = function(){ return fLoop("V = 10 V", "R = 10 Ω", "I = 1 A"); };
  E["2|P1"] = function(){ return svg(rect(XL, XR, YT, YB, { l: [B("12 V")], r: [{ t: "lamp", c: YM, lab: "60 W", side: "l" }] })); };
  E["2|P3"] = function(){ return fSer("E = 24 V", ["R₁", "R₂", "R₃"]); };
  E["2|P4"] = function(){ return fNode([["I₁ = 8 A", "in"], ["I₃ = 2 A", "in"], ["I₂ = 3 A", "out"], ["I₄ = ?", "out"]]); };
  E["2|P5"] = function(){ return fReal("V_S = 12 V", "R_S = 0.5 Ω", "R_L = 5.5 Ω"); };
  E["2|X14"] = function(){ return fNode([["6 A", "in"], ["2 A", "in"], ["5 A", "out"], ["I₄ = ?", "out"]]); };
  E["2|X15"] = function(){ return fBranches([B("E")], [R_("R₁", YM, "r", { off: 10 })], [R_("R₂", YM, "l", { off: 10 })], null, { a: 1, b: 1 }); };
  E["2|X17"] = function(){ return svg(vrun(XL, YT, YB, [B("10 V")]) + hrun(YT, XL, 280, []) + hrun(YB, 280, XL, []) + vrun(170, YT, YB, [R_("R₁", YM, "r", { off: 10 })]) + vrun(250, YT, YB, [R_("R₂", YM, "r", { off: 10 })]) + dots([[XL, YT], [XL, YB], [170, YT], [170, YB]]) + P.t(XL - 4, YT - 8, "a", "end", "sign") + P.t(XL - 4, YB + 16, "b", "end", "sign")); };
  E["2|X18"] = function(){ return fReal("V_S = 12 V", "R_S = 2 Ω", null, true); };
  E["2|X20"] = function(){ return fIsrc("4 mA", "2.5 kΩ"); };
  E["2|X21"] = function(){ return fIsrc("4 mA", "5 kΩ"); };
  E["2|X22"] = function(){ return fIsrc("2 A", null); };
  E["2|X24"] = function(){ return fLoop("5 V", "2 kΩ", "I = ?"); };
  E["2|X25"] = function(){ return fLoop("E", "1.2 kΩ", "30 mA"); };
  // ---- chapter 3 ----
  E["3|P1"] = function(){ return fSer("24 V", ["2 Ω", "4 Ω", "6 Ω"]); };
  E["3|P2"] = function(){ return fDiv("18 V", "3 kΩ", "6 kΩ"); };
  E["3|P3"] = function(){ return fPar("12 V", ["6 Ω", "12 Ω", "4 Ω"]); };
  E["3|P4"] = function(){ return fPar("9 mA", ["1 kΩ", "2 kΩ"]); };
  E["3|P5"] = function(){ return fSP("12 V", "2 Ω", "6 Ω", "3 Ω"); };
  E["3|X28"] = function(){ return fSer("9 V", ["R₁", "R₂ = 3 kΩ"]); };
  E["3|X29"] = function(){ return fDiv("20 V", "6 kΩ", "4 kΩ"); };
  E["3|X30"] = function(){ return fDiv("20 V", "6 kΩ", "4 kΩ", "mid"); };
  E["3|X32"] = function(){ return fPar("10 V", ["100 Ω", "100 Ω", "100 Ω", "100 Ω"]); };
  E["3|X34"] = function(){ return fSP("18 V", "3 Ω", "12 Ω", "6 Ω"); };
  E["3|X35"] = function(){ return svg(vrun(XL, YT, YB, [B("30 V")]) + hrun(YT, XL, 280, []) + hrun(YB, 280, XL, []) + vrun(170, YT, YB, [R_("10 Ω", 62, "r", { off: 10 }), R_("20 Ω", 104, "r", { off: 10 })]) + vrun(250, YT, YB, [R_("15 Ω", 62, "r", { off: 10 }), R_("15 Ω", 104, "r", { off: 10 })]) + dots([[170, YT], [170, YB]]) + P.t(150, 20, "A", "middle", "acc") + P.t(230, 20, "B", "middle", "acc")); };
  // ---- chapter 4 ----
  E["4|P1"] = function(){ return fReal("E = 24 V", "R_S = 4 Ω", "R_L = 8 Ω"); };
  E["4|P2"] = function(){ return fIsrc("I_S = 2 A", "R_S = 15 Ω"); };
  E["4|P3"] = function(){ return svg(rect(XL, XR, YT, YB, { l: [B("E₁ = 9 V", "u")], t: [R_("R = 3 Ω", 190, "t")], r: [B("E₂ = 3 V", "d", "r")] })); };
  E["4|P4"] = function(){ return fBranches([{ t: "isrc", c: 66, dir: "u", lab: "5 A", side: "l" }, R_("10 Ω", 106, "l", { off: 10 })], [{ t: "isrc", c: 66, dir: "d", lab: "2 A", side: "l" }, R_("10 Ω", 106, "l", { off: 10 })], [R_("R_L = 5 Ω", YM, "l", { off: 10 })], [XL, 190, XR]); };
  E["4|X36"] = function(){ return fReal("E = 12 V", "R_S = 3 Ω", "R_L = 6 Ω"); };
  E["4|X37"] = function(){ return svg(rect(XL, XR, YT, YB, { l: [B("E = 8 V", "d")], t: [R_("R_S = 2 Ω", 190, "t")] }) + termAB(XR, YT, YB)); };
  E["4|X38"] = function(){ return svg(rect(XL, XR, YT, YB, { l: [B("E₁ = 12 V", "u")], t: [Bc("E₂ = 5 V", "l", "t", 190)], r: [R_("R = 5 Ω", YM, "l")], b: [Bc("E₃ = 3 V", "l", "b", 190)] })); };
  E["4|X39"] = function(){ return fTwoSrc("E₁ = 12 V", "E₂ = 8 V", "R₁ = 2 Ω", "R₂ = 4 Ω", "R₃ = 4 Ω"); };
  E["4|X40"] = function(){ return fNodeCkt("E = 10 V", "R₁ = 2 Ω", "I_S = 2 A", "R₃ = 3 Ω", "u"); };
  E["4|X41"] = function(){ return fNodeCkt("E = 12 V", "R₁ = 3 Ω", "I_S = 1 A", "R₃ = 6 Ω", "u"); };
  E["4|X42"] = function(){ return fNodeCkt("E = 10 V", "R₁ = 2 Ω", "I_S = 2 A", "R₃ = 3 Ω", "d"); };
  // ---- chapter 5 ----
  E["5|P1"] = function(){ return fNodeCkt("E = 12 V", "R₁ = 4 Ω", "I = 2 A", "R₂ = 6 Ω", "u"); };
  E["5|P4"] = function(){ return fThev("E = 20 V", "R₁ = 4 Ω", "R₂ = 4 Ω", "R₃ = 3 Ω"); };
  E["5|X43"] = function(){ return fTwoSrc("E₁ = 12 V", "E₂ = 6 V", "R₁ = 4 Ω", "R₂ = 4 Ω", "R₃ = 2 Ω"); };
  E["5|X44"] = function(){ return fTerm("E = 12 V", "R₁ = 6 Ω", "R₂ = 3 Ω"); };
  E["5|X45"] = function(){ return figThevEq("V_TH = 20 V", "R_TH = 5 Ω", "R_L = ?"); };
  E["5|X46"] = function(){ return fTerm("E = 24 V", "R₁ = 6 Ω", "R₂ = 12 Ω"); };
  // ---- chapter 6 ----
  E["6|P1"] = function(){ return figCapLoop("12 V", "47 μF"); };
  E["6|P3"] = function(){ return fSer("18 V", ["3 μF", "6 μF"], "cap"); };
  E["6|P4"] = function(){ return svg(rect(XL, XR, YT, YB, { l: [B("v")], r: [{ t: "ind", c: YM, lab: "0.5 H", side: "l" }] }) + P.arr(150, 26, 200, 26, "i: 0 → 4 A", 175, 20)); };
  E["6|P5"] = function(){ return fSP("", "L₁ = 2 H", "3 H", "6 H", "ind"); };
  E["6|X47"] = function(){ return figCapLoop("v", "10 μF", P.arr(150, 26, 200, 26, "i = ?", 175, 20)); };
  E["6|X50"] = function(){ return svg(rect(XL, XR, YT, YB, { l: [B("v")], r: [{ t: "ind", c: YM, lab: "20 mH", side: "l" }] }) + P.arr(150, 26, 200, 26, "i: 0 → 5 A", 175, 20)); };
  E["6|X52"] = function(){ return svg(vrun(XL, YT, YB, [B("12 V")]) + hrun(YT, XL, XR, [R_("R₁ = 4 Ω", 125, "t"), { t: "ind", c: 190, lab: "L", side: "t" }]) + vrun(XR, YT, YB, [R_("R₂|= 2 Ω", YM, "r", { off: 10 })]) + hrun(YB, XR, XL, []) + vrun(222, YT, YB, [{ t: "cap", c: YM, lab: "C", side: "l" }]) + dots([[222, YT], [222, YB]])); };
  E["6|X53"] = function(){ return fSP("", "L₃ = 4 mH", "L₁ = 6 mH", "L₂ = 3 mH", "ind"); };
  // ---- chapter 8 and 9 ----
  E["9|P2"] = function(){ return fACser("V = 50∠0° V", [["r", "R = 30 Ω"], ["cap", "X_C = 40 Ω"]]); };
  E["9|P4"] = function(){ return fACpar(null, ["r", "Z₁ = 10 Ω"], ["cap", "Z₂ = −j10 Ω"]); };
  E["9|P5"] = function(){ return fACser("E = 20∠0° V", [["r", "Z₁ = 4 Ω"], ["ind", "Z₂ = j3 Ω"]]); };
  E["9|P7"] = function(){ return fPFC("motor|1.2 kW|PF 0.6", "Q_C = ?"); };
  // ---- chapter 11 ----
  E["11|P2"] = function(){ return figXfmr("V_P", "N_P", "N_S", "load", "I_P"); };
  E["11|P3"] = function(){ return figXfmr("V_P = 120 V", "N_P = 600", "N_S = ?", "V_S = 12 V"); };
  E["11|P4"] = function(){ return figXfmr("V_P", "N_P", "N_S", "Z_L = 8 Ω"); };
  E["11|P5"] = function(){ return figXfmr("11 kV", "N_P", "N_S", "load", "100 A"); };
  E["11|P6"] = function(){ return fLine("50 kW", "R = 2 Ω", "load"); };
  E["11|P7"] = function(){ return fMatch2("R_S = 800 Ω", "R_L = 8 Ω", "n = ?"); };
  // ---- motors ----
  E["M|P1"] = function(){ return figMotor("24 V", "R = 1.2 Ω", "V_bemf", "5 A"); };
  E["M|P2"] = function(){ return figMotor("24 V", "R = 2 Ω", "V_bemf", "3 A"); };
  E["M|P3"] = function(){ return figMotor("12 V", "R", "V_bemf", "4 A"); };
  E["M|P4"] = function(){ return figMotor("12 V", "R = 1 Ω", "V_bemf"); };
  E["M|P5"] = function(){ return figTS("T_stall = 2 N·m", "ω_NL = 3000 rpm", "0.5 N·m"); };

  // attach to the worked examples that have no drawing yet
  Object.keys(EXAMPLES).forEach(function(ch){
    EXAMPLES[ch].forEach(function(e){ if (!e.fig && E[ch + "|" + e.id]) e.fig = E[ch + "|" + e.id]; });
  });
})();

// ---- random questions: the drawing follows the numbers in the question text ----
function qv(text, re){ var m = re.exec(text); return m ? m[1] : null; }
(function(){
  var F = GENFIG;
  F["g1-8"] = function(q){ return svg(hrun(YM, 60, 322, [R_("R = " + qv(q, /R = ([\d.]+ ?[kMm]?Ω)/), 191, "t")]) + P.term(60, YM) + P.term(322, YM)); };
  F["g1-9"] = function(q){ return svg(hrun(YM, 60, 322, [R_("R = ?", 191, "t")]) + P.term(60, YM) + P.term(322, YM) + P.t(191, YM + 30, "G = " + qv(q, /G = ([\d.]+ ?m?S)/), "middle")); };
  F["g1-12"] = function(q){ return fLoop(qv(q, /and ([^ ]+ ?V) across/) || "V", "G = " + qv(q, /G = ([\d.]+ ?m?S)/), "I = ?"); };
  F["g6-4"] = function(q){ var n = +qv(q, /^(\d+) capacitors/), c = qv(q, /of ([^ ]+ ?[μµ]?F) each/) || "C", l = []; for (var i = 0; i < n; i++) l.push(c); return fSer("", l, "cap"); };
  F["g6-5"] = function(q){ var m = /Capacitors of (.+?) are connected/.exec(q), l = m ? m[1].replace(/ and /g, ", ").split(/, ?/) : []; return l.length ? fPar("", l, "cap") : ""; };
  F["g6-10"] = function(q){ var m = /Inductors of (\d+) H and (\d+) H/.exec(q); return m ? fPar("", [m[1] + " H", m[2] + " H"], "ind") : ""; };
  F["g6-7"] = function(q){ return svg(rect(XL, XR, YT, YB, { l: [B("v")], r: [{ t: "ind", c: YM, lab: qv(q, /inductor of ([^ ]+ H)/) || "L", side: "l" }] })); };
  F["g6-8"] = function(q){ return svg(rect(XL, XR, YT, YB, { l: [B("DC")], r: [{ t: "ind", c: YM, lab: qv(q, /inductor of ([^ ]+ H)/) || "L", side: "l" }] }) + P.arr(150, 26, 200, 26, qv(q, /carries ([^ ]+ A)/) || "I", 175, 20)); };
  F["g11-3"] = function(q){ return figXfmr("V_P", "N_P", "N_S", "Z_L = " + qv(q, /Z_L = ([\d.]+ ?[kM]?Ω)/)); };
  F["g11-5"] = function(q){ return fMatch2("Z_S = " + qv(q, /Z_S = ([\d.]+ ?[kM]?Ω)/), "R_L = " + qv(q, /drives an? ([\d.]+ ?[kM]?Ω)/), "n = ?"); };
  F["g11-2"] = function(q){ return figXfmr("V_P", "N_P", "N_S", "load", qv(q, /I_P = ([\d.]+ ?[mk]?A)/)); };
  F["gM-1"] = function(q){ return figMotor("V_in = " + qv(q, /V_in = (\d+ ?V)/), "R", "V_bemf"); };
  F["gM-6"] = function(q){ return figMotor(qv(q, /takes ([\d.]+ ?V)/), "R", "V_bemf", qv(q, /and ([\d.]+ ?A)\./)); };

  Object.keys(GENS).forEach(function(ch){
    GENS[ch].forEach(function(g){
      if (!F[g.id]) return;
      var mk = g.make;
      g.make = function(){ var r = mk(); if (!r.fig){ try { var f = F[g.id](r.q); if (f && !/NaN|undefined|null/.test(f)) r.fig = f; } catch (e) {} } return r; };
    });
  });
})();
