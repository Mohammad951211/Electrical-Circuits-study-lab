// ================= chapters 5, 6, 8, 9: figures and drawing questions =================
CHAPTER_IDS.push("5", "6", "8", "9");

// ---- helpers ----
function waveFig(o){
  // o.waves = [{ph (deg), cls, lab, amp}], o.marks = [{deg, lab}], o.T = label for the period
  var x0 = 44, x1 = 330, yc = 82, A = 48, s = "", i, k;
  function X(d){ return x0 + (x1 - x0) * d / 360; }
  s += '<line class="dash" x1="' + x0 + '" y1="' + yc + '" x2="' + (x1 + 8) + '" y2="' + yc + '"/><line class="dash" x1="' + x0 + '" y1="' + (yc - A - 6) + '" x2="' + x0 + '" y2="' + (yc + A + 6) + '"/>';
  (o.waves || []).forEach(function(w, wi){
    var pts = [], amp = (w.amp || 1) * A;
    for (k = 0; k <= 120; k++){ var d = k * 3, v = Math.sin((d - (w.ph || 0)) * Math.PI / 180); pts.push(rnd(X(d)) + "," + rnd(yc - amp * v)); }
    s += '<polyline class="' + (wi ? "wave2" : "wave") + '" points="' + pts.join(" ") + '"/>';
    if (w.lab) s += P.t(x1 - 6, wi ? yc + A + 4 : yc - A - 4, w.lab, "end", wi ? "" : "acc");
  });
  (o.marks || []).forEach(function(m){
    var v = Math.sin(m.deg * Math.PI / 180), px = X(m.deg), py = yc - A * v;
    s += '<line class="dash" x1="' + rnd(px) + '" y1="' + yc + '" x2="' + rnd(px) + '" y2="' + rnd(py) + '"/><circle cx="' + rnd(px) + '" cy="' + rnd(py) + '" r="3.6" class="mesh"/>' + P.t(px + 5, py + (v > 0 ? -7 : 14), m.lab, "start", "acc");
  });
  s += P.t(x0 - 4, yc - A + 4, "V_m", "end") + P.t(X(0) + 2, yc + 16, "0", "start") + P.t(X(180), yc + 16, "180°") + P.t(X(360), yc + 16, "360°", "end") + P.t((x0 + x1) / 2, 152, o.T || "ωt (degrees)");
  return svg(s);
}
function nl(s){ return String(s).replace(" = ", " =|"); }
function figThev(E, R1, R2, R3, RL, open){
  var s = vrun(XL, YT, YB, [B(E)]) + hrun(YT, XL, XR, [{ t: "r", c: 135, lab: R1, side: "t" }]) + vrun(205, YT, YB, [{ t: "r", c: YM, lab: nl(R2), side: "l" }]) + hrun(YB, XR, XL, []);
  s += vrun(250, YT, YB, [{ t: "r", c: YM, lab: nl(R3), side: "r" }]);
  if (open) s += P.term(XR, YT) + P.term(XR, YB) + P.t(XR + 8, YT + 4, "a", "start", "sign") + P.t(XR + 8, YB + 4, "b", "start", "sign");
  else s += vrun(XR, YT, YB, [{ t: "r", c: YM, lab: nl(RL), side: "r", off: 10 }]);
  s += dots([[205, YT], [205, YB], [250, YT], [250, YB]]);
  return svg(s);
}
function figThevEq(V, R, RL){ return svg(rect(XL, XR, YT, YB, { l: [B(V)], t: [{ t: "r", c: 190, lab: R, side: "t" }], r: [{ t: "r", c: YM, lab: RL, side: "l" }] })); }
function figNorton(I, RN, RL){
  var s = vrun(XL, YT, YB, [{ t: "isrc", c: YM, dir: "u", lab: I, side: "l" }]) + hrun(YT, XL, XR, []) + hrun(YB, XR, XL, []) + vrun(190, YT, YB, [{ t: "r", c: YM, lab: nl(RN), side: "r", off: 10 }]) + vrun(XR, YT, YB, [{ t: "r", c: YM, lab: nl(RL), side: "r", off: 10 }]) + dots([[190, YT], [190, YB]]);
  return svg(s);
}
function figCapLoop(E, C, extra){ return svg(rect(XL, XR, YT, YB, { l: [B(E)], r: [{ t: "cap", c: YM, lab: C, side: "l" }] }) + (extra || "")); }
function figCapsSeries(E, labs){
  var xs = labs.length === 4 ? [112, 162, 212, 262] : labs.length === 3 ? [125, 190, 255] : [140, 235];
  return svg(rect(XL, XR, YT, YB, { l: [B(E)], t: xs.map(function(x, i){ return { t: "cap", c: x, lab: labs[i], side: "t" }; }) }));
}
function figCapsPar(E, labs){
  var xs = labs.length === 4 ? [125, 175, 225, 275] : [140, 200, 260], s = vrun(XL, YT, YB, [B(E)]) + hrun(YT, XL, xs[xs.length - 1] + 25, []) + hrun(YB, xs[xs.length - 1] + 25, XL, []);
  xs.forEach(function(x, i){ s += vrun(x, YT, YB, [{ t: "cap", c: YM, lab: labs[i], side: "r", off: 14 }]); });
  s += dots(xs.map(function(x){ return [x, YT]; }).concat(xs.map(function(x){ return [x, YB]; })));
  return svg(s);
}
function figCapNet(){
  var s = hrun(YT, 60, 145, [{ t: "cap", c: 100, lab: "C_1 = 6", side: "t" }]) + P.term(60, YT) + P.t(52, YT + 4, "a", "end", "sign");
  s += hrun(YT, 145, 270, []) + hrun(YB, 270, 60, []) + P.t(330, 150, "all in μF", "end") + P.term(60, YB) + P.t(52, YB + 4, "b", "end", "sign");
  s += vrun(145, YT, YB, [{ t: "cap", c: YM, lab: "C_2 = 2", side: "l", off: 14 }]) + vrun(205, YT, YB, [{ t: "cap", c: YM, lab: "C_3|0.6", side: "r", off: 14 }]) + vrun(270, YT, YB, [{ t: "cap", c: 62, lab: "C_4|0.5", side: "r", off: 14 }, { t: "cap", c: 104, lab: "C_5|2", side: "r", off: 14 }]);
  s += dots([[145, YT], [145, YB], [205, YT], [205, YB], [270, YT], [270, YB]]);
  return svg(s);
}
function figAC(srcLab, kind, lab){ return svg(rect(XL, XR, YT, YB, { l: [{ t: "acs", c: YM, lab: srcLab, side: "l" }], r: [{ t: kind, c: YM, lab: lab, side: "l", off: 12 }] })); }
function figRLCser(R, XL_, XC_){ return svg(rect(XL, XR, YT, YB, { t: [{ t: "r", c: 120, lab: R, side: "t" }, { t: "ind", c: 190, lab: XL_, side: "t" }, { t: "cap", c: 258, lab: XC_, side: "t" }] })); }
function figZnet(){
  var s = vrun(XL, YT, YB, [{ t: "acs", c: YM, lab: "E =|100∠0° V", side: "r", off: 24 }]) + hrun(YT, XL, 130, [{ t: "r", c: 105, lab: "R_1 = 4 kΩ", side: "t" }]) + hrun(YT, 130, XR, []) + hrun(YB, XR, XL, []);
  s += vrun(195, YT, YB, [{ t: "cap", c: YM, lab: "X_C|8 kΩ", side: "r", off: 14 }]) + vrun(XR, YT, YB, [{ t: "r", c: 53, len: 30, lab: "R_L = 4 kΩ", side: "l", off: 8 }, { t: "ind", c: 98, lab: "X_L = 8 kΩ", side: "l", off: 12 }]);
  s += dots([[195, YT], [195, YB]]);
  return svg(s);
}
function figLoads(){
  var s = vrun(XL, YT, YB, [{ t: "acs", c: YM, lab: "10 V|∠0°", side: "r", off: 24 }]) + hrun(YT, XL, 310, []) + hrun(YB, 310, XL, []);
  [[170, "Z_1|10 W"], [235, "Z_2|30 W|−15 var"], [300, "Z_3|20 W|+70 var"]].forEach(function(l){ s += vrun(l[0], YT, YB, [{ t: "r", c: YM, lab: l[1], side: "r", off: 11 }]); });
  s += dots([[170, YT], [170, YB], [235, YT], [235, YB]]);
  return svg(s);
}
function figPFC(){
  var s = vrun(XL, YT, YB, [{ t: "acs", c: YM, lab: "120 V rms|60 Hz", side: "r", off: 26 }]) + hrun(YT, XL, 260, []) + hrun(YB, 260, XL, []);
  s += vrun(170, YT, YB, [{ t: "r", c: YM, lab: "Load|4 kW|pf 0.8 lag", side: "r", off: 14 }]) + vrun(260, YT, YB, [{ t: "cap", c: YM, lab: "C = ?", side: "r", off: 14 }]) + dots([[170, YT], [170, YB]]);
  return svg(s);
}

// ---- drawing questions (book values where the book gives them) ----
CHAPTERS["5"] = { title: "The Network Theorems", questions: [
  { tag: "Concept", q: "In the superposition theorem, how is a voltage source turned off? How is a current source turned off?", a: "A voltage source is replaced by a short circuit (a jump wire).\nA current source is replaced by an open circuit.", fig: function(){ return branchFig({ e1: "E_1", e2: "E_2", r1: "R_1", r2: "R_2", r3: "R_3" }); } },
  { tag: "Calculation", q: "Example 5.4. Remove R_L and find R_TH = R_N seen from a and b. E is replaced by a short circuit.", a: "R_TH = R₁ // R₂ // R₃ = (12 // 12 // 12) Ω = 4 Ω", fig: function(){ return figThev("E = 48 V", "R_1 = 12 Ω", "R_2 = 12 Ω", "R_3 = 12 Ω", "", true); } },
  { tag: "Calculation", q: "Example 5.4. Find V_TH = V_ab, the open-circuit voltage.", a: "VDR on R₁ and (R₂ // R₃):\nV_TH = 48 V × (12 // 12) / (12 + 12 // 12) = 48 × 6 / 18 = 16 V", fig: function(){ return figThev("E = 48 V", "R_1 = 12 Ω", "R_2 = 12 Ω", "R_3 = 12 Ω", "", true); } },
  { tag: "Calculation", q: "Example 5.4. Use Thevenin's equivalent to find I_L with R_L = 8 Ω.", a: "I_L = V_TH / (R_TH + R_L) = 16 V / (4 + 8) Ω = 1.33 A", fig: function(){ return figThevEq("V_TH = 16 V", "R_TH = 4 Ω", "R_L = 8 Ω"); } },
  { tag: "Calculation", q: "Norton's equivalent of the same network. Find I_N and check with I_L = 1.33 A.", a: "I_N = V_TH / R_TH = 16 V / 4 Ω = 4 A\nI_L = I_N R_N / (R_N + R_L) = 4 × 4 / 12 = 1.33 A", fig: function(){ return figNorton("I_N = ?", "R_N = 4 Ω", "R_L = 8 Ω"); } },
  { tag: "Calculation", q: "Example 5.6. Find I_L from Norton's equivalent circuit.", a: "I_L = I_N R_N / (R_L + R_N) = 1 mA × 250 / (250 + 100) = 0.71 mA", fig: function(){ return figNorton("I_N = 1 mA", "R_N = 250 Ω", "R_L = 100 Ω"); } },
  { tag: "Calculation", q: "Maximum power transfer. V_S = 10 V and R_S = 30 Ω. Find R_L and the maximum load power.", a: "R_L = R_S = 30 Ω\nP_L = V_S² / (4 R_S) = 100 / 120 = 833 mW", fig: function(){ return figThevEq("V_S = 10 V", "R_S = 30 Ω", "R_L = ?"); } },
  { tag: "Calculation", q: "Maximum power transfer for the network of Example 5.4. Find R_L and P_max.", a: "R_L = R_TH = 4 Ω\nP_max = V_TH² / (4 R_TH) = 16² / 16 = 16 W", fig: function(){ return figThevEq("V_TH = 16 V", "R_TH = 4 Ω", "R_L = ?"); } }
] };
CHAPTERS["6"] = { title: "Capacitors and Inductors", questions: [
  { tag: "Calculation", q: "Example 6.1. A charge of 50 μC is stored. Find the voltage across the capacitor.", a: "V = Q / C = 50 μC / 1000 pF = 50 000 V", fig: function(){ return figCapLoop("E", "C = 1000 pF"); } },
  { tag: "Calculation", q: "Example 6.2. A = 0.004 m², d = 0.006 m, dielectric mica (k = 5). Find C.", a: "C = 8.85 × 10⁻¹² k A / d = 8.85×10⁻¹² × 5 × 0.004 / 0.006 = 29.5 pF", fig: function(){ return svg(rect(XL, XR, YT, YB, { r: [{ t: "cap", c: YM, lab: "C = ?", side: "l" }] }) + P.t(190, 79, "mica, k = 5")); } },
  { tag: "Calculation", q: "Example 6.3. Find the energy stored in the capacitor.", a: "W = ½ C V² = ½ × 2.2 μF × (15 V)² = 247.5 μJ", fig: function(){ return figCapLoop("E = 15 V", "C = 2.2 μF"); } },
  { tag: "Calculation", q: "Example 6.4. Find C_eq and the charge Q on each capacitor.", a: "C_eq = 1 / (4 / 100 μF) = 25 μF\nQ = C_eq E = 25 μF × 25 V = 625 μC (the same on each capacitor)", fig: function(){ return figCapsSeries("E = 25 V", ["C_1", "C_2", "C_3", "C_4"]) .replace("</svg>", P.t(190, 150, "each capacitor 100 μF") + "</svg>"); } },
  { tag: "Calculation", q: "Example 6.5. Find C_eq and the total charge.", a: "C_eq = (100 + 10 + 20 + 320) μF = 450 μF\nQ = C_eq E = 450 μF × 60 V = 27 000 μC = 27 mC", fig: function(){ return figCapsPar("E = 60 V", ["C_1|100 μF", "C_2|10 μF", "C_3|20 μF", "C_4|320 μF"]); } },
  { tag: "Calculation", q: "Example 6.6. Find C_eq between a and b. The values are in μF.", a: "C₄,₅ = 0.5 × 2 / (0.5 + 2) = 0.4 μF\nC₂,₃,₄,₅ = 2 + 0.6 + 0.4 = 3 μF\nC_eq = 6 × 3 / (6 + 3) = 2 μF", fig: function(){ return figCapNet(); } },
  { tag: "Calculation", q: "Example 6.8. In steady state the inductor stores 4 J. Find L.", a: "I = E / (R + R_w) = 20 / (45 + 5) = 0.4 A\nL = 2 W / I² = 2 × 4 / 0.16 = 50 H", fig: function(){ return svg(rect(XL, XR, YT, YB, { l: [B("E = 20 V")], t: [{ t: "r", c: 140, lab: "R = 45 Ω", side: "t" }], r: [{ t: "r", c: 53, len: 30, lab: "R_w = 5 Ω", side: "l", off: 8 }, { t: "ind", c: 98, lab: "L", side: "l", off: 12 }] })); } },
  { tag: "Concept", q: "In DC steady state, how does each element behave?", a: "Capacitor: open circuit (it blocks DC, I = 0).\nInductor: short circuit (it passes DC, V = 0).", fig: function(){ return svg(rect(XL, XR, YT, YB, { l: [B("E")], t: [{ t: "ind", c: 140, lab: "L", side: "t" }], r: [{ t: "cap", c: YM, lab: "C", side: "l" }] })); } }
] };
CHAPTERS["8"] = { title: "Fundamentals of AC Circuits", questions: [
  { tag: "Calculation", q: "Example 8.3. v(t) = V_m sin ωt with V_m = 5 V. Find v₁ at 30° and v₂ at 135°.", a: "v₁ = 5 sin 30° = 2.5 V\nv₂ = 5 sin 135° = 3.54 V", fig: function(){ return waveFig({ waves: [{ lab: "v(t)" }], marks: [{ deg: 30, lab: "v₁" }, { deg: 135, lab: "v₂" }] }); } },
  { tag: "Calculation", q: "The period of a sine wave is T = 20 ms. Find f and ω.", a: "f = 1 / T = 1 / 20 ms = 50 Hz\nω = 2π f = 314.2 rad/s", fig: function(){ return waveFig({ waves: [{ lab: "v(t)" }], T: "one period T = 20 ms" }); } },
  { tag: "Calculation", q: "A sine voltage has V_m = 170 V. Find the RMS value and the half-cycle average value.", a: "V = V_m / √2 = 0.707 × 170 = 120.2 V\nV_avg = 0.637 V_m = 108.3 V", fig: function(){ return waveFig({ waves: [{ lab: "v(t)" }], T: "V_m = 170 V" }); } },
  { tag: "Calculation", q: "v = V_m sin(ωt + 30°) and i = I_m sin(ωt − 20°). Find the phase difference. Which one leads?", a: "φ = ψ_v − ψ_i = 30° − (−20°) = 50°\nφ > 0, so v leads i by 50°.", fig: function(){ return waveFig({ waves: [{ lab: "v", ph: -30 }, { lab: "i", ph: 20, amp: 0.7 }], T: "v is shifted left of i" }); } },
  { tag: "Calculation", q: "Example 8.11. v_L = 6√2 sin(60t + 35°) V and L = 0.2 H. Find X_L and the current phasor (rms).", a: "X_L = ω L = 60 × 0.2 = 12 Ω\nI = V / (j X_L) = 6∠35° V / (12∠90° Ω) = 0.5∠−55° A", fig: function(){ return figAC("v_L", "ind", "L = 0.2 H"); } },
  { tag: "Calculation", q: "Example 8.12. v_C = 50√2 sin(ωt − 20°) V, C = 5 μF, f = 500 Hz. Find X_C and the rms current.", a: "ω = 2π × 500 = 3142 rad/s\nX_C = 1 / (ω C) = 63.65 Ω\nI = V / X_C = 50 / 63.65 = 0.786 A, with phase −20° + 90° = +70°", fig: function(){ return figAC("v_C", "cap", "C = 5 μF"); } },
  { tag: "Calculation", q: "Convert 3 + j4 to polar form and 10∠30° to rectangular form.", a: "3 + j4 = √(3² + 4²) ∠tan⁻¹(4/3) = 5∠53.13°\n10∠30° = 10 cos 30° + j 10 sin 30° = 8.66 + j5", fig: function(){ return svg(P.w([[60, 118], [330, 118]]) + P.w([[110, 140], [110, 20]]) + '<line class="ar" x1="110" y1="118" x2="236" y2="42"/>' + P.head(240, 40, 0.855, -0.52, 9) + '<line class="dash" x1="240" y1="40" x2="240" y2="118"/><line class="dash" x1="110" y1="40" x2="240" y2="40"/>' + P.t(176, 82, "5", "end", "acc") + P.t(240, 134, "3 (real)") + P.t(100, 44, "4 (j)", "end") + P.t(150, 108, "53.13°", "start")); } }
] };
CHAPTERS["9"] = { title: "Methods of AC Circuit Analysis", questions: [
  { tag: "Calculation", q: "Example 9.1. Find the series impedance Z in rectangular and polar form. Is the circuit inductive or capacitive?", a: "Z = R + j(X_L − X_C) = 1.5 + j(2.5 − 3) = 1.5 − j0.5 Ω\n|Z| = 1.58 Ω, φ = tan⁻¹(−0.5 / 1.5) = −18.44°\nZ = 1.58∠−18.44° Ω. X < 0, so the circuit is more capacitive.", fig: function(){ return figRLCser("R = 1.5 Ω", "X_L = 2.5 Ω", "X_C = 3 Ω"); } },
  { tag: "Calculation", q: "Example 9.3. Find Z_eq seen by the source. Z_eq = Z₁ + Z₂ // Z₃.", a: "Z₂ // Z₃ = (−j8)(4 + j8) / (4) = 16 − j8 kΩ\nZ_eq = 4 + 16 − j8 = 20 − j8 kΩ = 21.54∠−21.8° kΩ", fig: function(){ return figZnet(); } },
  { tag: "Calculation", q: "Example 9.3. Find the source current I₁ and the branch current I₃.", a: "I₁ = E / Z_eq = 100∠0° / 21.54∠−21.8° = 4.64∠21.8° mA\nI₃ = I₁ Z₂ / (Z₂ + Z₃) = 4.64∠21.8° × 8∠−90° / 4 = 9.28∠−68.2° mA", fig: function(){ return figZnet(); } },
  { tag: "Calculation", q: "Example 9.5. Find P_T, Q_T, S_T and the power factor.", a: "P_T = 10 + 30 + 20 = 60 W\nQ_T = Q_L − Q_C = 70 − 15 = 55 var\nS_T = √(60² + 55²) = 81.39 VA\nPF = P_T / S_T = 0.74, φ = 42.3° (lagging)", fig: function(){ return figLoads(); } },
  { tag: "Calculation", q: "Slide 33. A load absorbs 4 kW at 120 V rms, 60 Hz and pf = 0.8 lagging. Find C that raises the pf to 0.95.", a: "Q₁ = P tan(cos⁻¹ 0.8) = 4000 × 0.75 = 3000 var\nQ₂ = P tan(cos⁻¹ 0.95) = 4000 × 0.3287 = 1315 var\nQ_C = Q₁ − Q₂ = 1685 var\nC = Q_C / (ω V²) = 1685 / (377 × 120²) = 310 μF", fig: function(){ return figPFC(); } },
  { tag: "Calculation", q: "Z = 3 + j4 Ω. Find |Z| and φ. What is the power factor?", a: "|Z| = √(3² + 4²) = 5 Ω, φ = tan⁻¹(4/3) = 53.13°\nZ = 5∠53.13° Ω (inductive)\nPF = cos φ = R / |Z| = 0.6 lagging", fig: function(){ return figRLCser("R = 3 Ω", "X_L = 4 Ω", "X_C = 0"); } },
  { tag: "Concept", q: "In the power triangle, which side is P, which is Q and which is S? Give the formulas.", a: "P is the horizontal side, Q is the vertical side and S is the hypotenuse.\nP = S cos φ, Q = S sin φ, S = √(P² + Q²), S = P + jQ", fig: function(){ return svg(P.w([[90, 118], [290, 118], [290, 34], [90, 118]]) + P.t(190, 136, "P (W)") + P.t(300, 80, "Q (var)", "start") + P.t(172, 66, "S (VA)", "end", "acc") + P.t(122, 112, "φ", "start", "acc")); } }
] };
