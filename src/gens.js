// ===== number generators: every call makes a new question with new values =====
var GENS = { "1": [], "2": [], "3": [], "4": [] };
function ri(a, b){ return a + Math.floor(Math.random() * (b - a + 1)); }
function pk(a){ return a[Math.floor(Math.random() * a.length)]; }
function rd(x){ return Math.round(x * 1e6) / 1e6; }
function nn(x){ return String(parseFloat(Number(x).toPrecision(5))); }
function G(ch, id, topic, make){ GENS[ch].push({ id: id, topic: topic, make: make }); }

var COLS = ["#111111", "#7b4a2a", "#d62828", "#f4820a", "#f2d000", "#2a9d3f", "#2563c9", "#7a3fb0", "#888888", "#f4f4f4"];
function resFig(d1, d2, m){
  var s = P.w([[40, YM], [100, YM]]) + P.w([[260, YM], [320, YM]]) + '<rect x="100" y="60" width="160" height="46" rx="14" fill="#e3d5b3" stroke="#1b2a3a" stroke-width="2"/>';
  [[122, COLS[d1]], [148, COLS[d2]], [174, COLS[m]], [226, "#c9a227"]].forEach(function(b){ s += '<rect x="' + b[0] + '" y="60" width="13" height="46" fill="' + b[1] + '" stroke="#0003" stroke-width=".6"/>'; });
  return svg(s);
}
function ohmFig(E, R, I, vmeter){
  var g = rect(XL, XR, YT, YB, { l: [B(E)], r: [{ t: "r", c: YM, lab: R, side: "l" }], b: [{ t: "m", c: 215, ch: "A", lab: I, side: "b" }] });
  if (vmeter) g += vrun(150, YT, YB, [{ t: "m", c: YM, ch: "V", lab: vmeter, side: "r" }]) + dots([[150, YT], [150, YB]]);
  return svg(g);
}
function lampFig(vlab, note){
  return svg(rect(XL, XR, YT, YB, { l: [B("E")], r: [{ t: "lamp", c: YM }] }) + vrun(230, YT, YB, [{ t: "m", c: YM, ch: "V", lab: vlab, side: "r" }]) + dots([[230, YT], [230, YB]]) + P.t(150, 79, note));
}
function chargeFig(ilab, note){
  return svg(rect(XL, XR, YT, YB, { l: [B("E")], t: [{ t: "m", c: 190, ch: "A", lab: ilab, side: "t" }], r: [{ t: "r", c: YM, lab: "R", side: "l" }] }) + P.t(190, 104, note));
}

// ---------- Chapter 1 ----------
G("1", "g1-1", "Current", function(){ var I = pk([0.5, 1, 2, 3, 4, 5, 6, 8]), t = pk([2, 4, 5, 10, 20, 30]), Q = rd(I * t);
  return { q: "A charge of " + nn(Q) + " C passes through the ammeter in " + t + " s. Find the current.", unit: "A", ans: I, fig: chargeFig("I = ?", nn(Q) + " C in " + t + " s"), sol: "I = Q / t = " + nn(Q) + " C / " + t + " s = " + nn(I) + " A" }; });
G("1", "g1-2", "Current", function(){ var I = pk([0.2, 0.5, 2, 3, 5]), t = pk([10, 20, 30, 60]), Q = rd(I * t);
  return { q: "A current of " + nn(I) + " A flows for " + t + " s. How much charge passes?", unit: "C", ans: Q, fig: chargeFig("I = " + nn(I) + " A", "t = " + t + " s"), sol: "Q = I t = " + nn(I) + " A × " + t + " s = " + nn(Q) + " C" }; });
G("1", "g1-3", "Voltage", function(){ var V = pk([3, 6, 9, 12, 24]), Q = pk([2, 4, 5, 10]), W = V * Q;
  return { q: W + " J of work moves " + Q + " C through the lamp. Find the voltage across the lamp.", unit: "V", ans: V, fig: lampFig("V = ?", W + " J moves|" + Q + " C"), sol: "V = W / Q = " + W + " J / " + Q + " C = " + V + " V" }; });
G("1", "g1-4", "Voltage", function(){ var V = pk([3, 6, 9, 12, 24]), Q = pk([2, 4, 5, 10]), W = V * Q;
  return { q: "The lamp voltage is " + V + " V. How much work moves " + Q + " C through it?", unit: "J", ans: W, fig: lampFig("V = " + V + " V", "Q = " + Q + " C"), sol: "W = V Q = " + V + " V × " + Q + " C = " + W + " J" }; });
G("1", "g1-5", "Ohm's law", function(){ var R = pk([10, 22, 47, 100, 220, 470]), I = pk([0.01, 0.02, 0.05, 0.1, 0.2]), V = rd(R * I);
  return { q: "The " + R + " Ω resistor carries " + nn(I) + " A. What does the voltmeter read?", unit: "V", ans: V, fig: ohmFig("E", "R = " + R + " Ω", nn(I) + " A", "V = ?"), sol: "V = I R = " + nn(I) + " A × " + R + " Ω = " + nn(V) + " V" }; });
G("1", "g1-6", "Ohm's law", function(){ var V = pk([5, 10, 12, 24, 50]), R = pk([10, 20, 25, 50, 100, 200, 500]), I = rd(V / R * 1000);
  return { q: "E = " + V + " V and R = " + R + " Ω. What does the ammeter read?", unit: "mA", ans: I, fig: ohmFig("E = " + V + " V", "R = " + R + " Ω", "I = ?"), sol: "I = E / R = " + V + " V / " + R + " Ω = " + nn(I / 1000) + " A = " + nn(I) + " mA" }; });
G("1", "g1-7", "Ohm's law", function(){ var R = pk([20, 30, 40, 50, 60, 80, 120, 150, 200, 300]), I = pk([0.02, 0.05, 0.1, 0.2]), V = rd(R * I);
  return { q: "A " + nn(V) + " V source drives " + nn(I) + " A through the resistor. Find R.", unit: "Ω", ans: R, fig: ohmFig("E = " + nn(V) + " V", "R = ?", nn(I) + " A"), sol: "R = V / I = " + nn(V) + " V / " + nn(I) + " A = " + R + " Ω" }; });
G("1", "g1-8", "Conductance", function(){ var R = pk([2, 4, 5, 10, 20, 25, 50, 100, 200, 250, 500]), G1 = rd(1000 / R);
  return { q: "A resistor has R = " + R + " Ω. Find its conductance.", unit: "mS", ans: G1, fig: null, sol: "G = 1 / R = 1 / " + R + " Ω = " + nn(G1 / 1000) + " S = " + nn(G1) + " mS" }; });
G("1", "g1-9", "Conductance", function(){ var g = pk([0.1, 0.2, 0.25, 0.5, 0.04, 0.02, 0.005]), R = rd(1 / g);
  return { q: "A resistor has G = " + nn(g) + " S. Find R.", unit: "Ω", ans: R, fig: null, sol: "R = 1 / G = 1 / " + nn(g) + " S = " + nn(R) + " Ω" }; });
G("1", "g1-10", "Colour code", function(){ var d1 = ri(1, 9), d2 = ri(0, 9), m = ri(0, 5), v = (10 * d1 + d2) * Math.pow(10, m);
  return { q: "Read the colour code (the gold band is the tolerance). Find the resistance.", unit: "kΩ", ans: rd(v / 1000), fig: resFig(d1, d2, m), sol: "Digits " + d1 + " and " + d2 + " → " + (10 * d1 + d2) + ", multiplier 10^" + m + "\nR = " + nn(v) + " Ω = " + nn(v / 1000) + " kΩ ± 5%" }; });
G("1", "g1-11", "Colour code", function(){ var R = pk([100, 220, 470, 1000, 2200, 4700, 10000]), U = rd(R * 1.05);
  return { q: "A " + R + " Ω resistor has a gold band (± 5%). What is the highest value it can have?", unit: "Ω", ans: U, fig: null, sol: "5% of " + R + " Ω = " + nn(R * 0.05) + " Ω\nHighest value = " + R + " + " + nn(R * 0.05) + " = " + nn(U) + " Ω" }; });
G("1", "g1-12", "Conductance", function(){ var g = pk([2, 5, 10, 20, 25]), V = pk([5, 10, 12, 24]), I = g * V;
  return { q: "A resistor has G = " + g + " mS and " + V + " V across it. Find the current.", unit: "mA", ans: I, fig: null, sol: "I = G V = " + g + " mS × " + V + " V = " + I + " mA" }; });

// ---------- Chapter 2 ----------
function loopFig(E, a, b, c){
  return svg(rect(XL, XR, YT, YB, { l: [B("E = " + E + " V")], t: [{ t: "r", c: 190, lab: "V_1 = " + a, side: "t", pm: true }], r: [{ t: "r", c: YM, lab: "V_2 = " + b, side: "l", pm: true }], b: [{ t: "r", c: 190, lab: "V_3 = " + c, side: "b", pm: true }] }));
}
function nodeFig(a, b, c, d, e){
  var nx = 190, ny = 83, s = edge(80, 36, nx, ny, 0.45) + edge(80, 130, nx, ny, 0.45) + edge(nx, ny, 300, 36, 0.5) + edge(nx, ny, 300, ny, 0.5) + edge(nx, ny, 300, 130, 0.5);
  s += '<circle class="dot" cx="190" cy="83" r="5"/>' + P.t(80, 28, "I_1 = " + a + " A", "start") + P.t(80, 150, "I_2 = " + b + " A", "start") + P.t(304, 32, "I_3 = " + c + " A", "start") + P.t(308, 87, "I_4 = " + d + " A", "start") + P.t(304, 150, "I_5 = " + e, "start", "acc");
  return svg(s);
}
function rsFig(VS, RS, RL, vab){
  var s = vrun(XL, YT, YB, [B("V_S = " + VS + " V")]) + hrun(YT, XL, 285, [{ t: "r", c: 140, lab: "R_S = " + RS + " Ω", side: "t" }]) + vrun(285, YT, YB, [{ t: "r", c: YM, lab: "R_L = " + RL + " Ω", side: "r" }]) + hrun(YB, 285, XL, []);
  s += dots([[215, YT], [215, YB]]) + P.t(215, 29, "a") + P.t(215, 146, "b");
  if (vab) s += P.arr(240, 83, 240, 48) + P.arr(240, 83, 240, 118) + P.t(248, 87, "V_{ab}", "start", "acc");
  return svg(s);
}
function powFig(E, R, I, p){
  return svg(rect(XL, XR, YT, YB, { l: [B(E)], r: [{ t: "r", c: YM, lab: R, side: "l" }] }) + P.arr(150, 20, 215, 20, I, 143, 25, "end") + P.t(190, 88, p));
}
G("2", "g2-1", "Power and energy", function(){ var I = pk([0.5, 1, 2, 3, 4]), R = pk([2, 4, 6, 10, 20]), p = rd(I * I * R);
  return { q: "A " + R + " Ω resistor carries " + nn(I) + " A. Find the power.", unit: "W", ans: p, fig: powFig("E", "R = " + R + " Ω", "I = " + nn(I) + " A", "P = ?"), sol: "P = I² R = " + nn(I) + "² × " + R + " = " + nn(p) + " W" }; });
G("2", "g2-2", "Power and energy", function(){ var V = pk([6, 12, 24, 120]), R = pk([6, 12, 24, 48, 60]), p = rd(V * V / R);
  return { q: V + " V is across a " + R + " Ω resistor. Find the power.", unit: "W", ans: p, fig: powFig("E = " + V + " V", "R = " + R + " Ω", "I", "P = ?"), sol: "P = V² / R = " + V + "² / " + R + " = " + nn(p) + " W" }; });
G("2", "g2-3", "Power and energy", function(){ var V = pk([5, 12, 24, 120]), I = pk([0.5, 1, 2, 3]), p = rd(V * I);
  return { q: "A load has " + V + " V across it and carries " + nn(I) + " A. Find the power it takes in.", unit: "W", ans: p, fig: null, sol: "P = V I = " + V + " V × " + nn(I) + " A = " + nn(p) + " W" }; });
G("2", "g2-4", "Power and energy", function(){ var p = pk([40, 60, 100, 200]), t = pk([5, 10, 30, 60]), W = p * t;
  return { q: "A " + p + " W load works for " + t + " s. How much energy does it take in?", unit: "J", ans: W, fig: null, sol: "W = P t = " + p + " W × " + t + " s = " + W + " J" }; });
G("2", "g2-5", "KVL", function(){ var a = ri(2, 9), b = ri(2, 9), c = ri(2, 9), E = a + b + c;
  return { q: "Go round the loop with KVL. Find V₃.", unit: "V", ans: c, fig: loopFig(E, a + " V", b + " V", "?"), sol: "KVL: E = V₁ + V₂ + V₃\nV₃ = " + E + " − " + a + " − " + b + " = " + c + " V" }; });
G("2", "g2-6", "KCL", function(){ var a = ri(5, 15), b = ri(5, 15), c = ri(2, a), d = ri(1, b), e = a + b - c - d;
  return { q: "Use KCL at the node. Find I₅ (leaving the node).", unit: "A", ans: e, fig: nodeFig(a, b, c, d, "?"), sol: "KCL: in = out\n" + a + " + " + b + " = " + c + " + " + d + " + I₅\nI₅ = " + (a + b) + " − " + (c + d) + " = " + e + " A" }; });
G("2", "g2-7", "Power and energy", function(){ var E = pk([5, 12, 20, 24]), I = pk([1, 2, 3]), p = -E * I;
  return { q: "The current " + I + " A enters the − end of the " + E + " V source. Find the power of the source (give the sign).", unit: "W", ans: p, fig: powFig("E = " + E + " V", "R", "I = " + I + " A", "P = ?"), sol: "P = − E I = − " + E + " × " + I + " = " + p + " W\nNegative, so the source gives out energy." }; });
G("2", "g2-8", "Real sources", function(){ var I = pk([0.5, 1, 2, 3]), RS = pk([0.5, 1, 2]), RL = pk([2, 4, 5, 8, 10]), VS = rd(I * (RS + RL));
  return { q: "A real source feeds RL. Find the current I.", unit: "A", ans: I, fig: rsFig(nn(VS), nn(RS), RL, false), sol: "I = VS / (RS + RL) = " + nn(VS) + " / (" + nn(RS) + " + " + RL + ") = " + nn(I) + " A" }; });
G("2", "g2-9", "Real sources", function(){ var I = pk([0.5, 1, 2, 3]), RS = pk([0.5, 1, 2]), RL = pk([2, 4, 5, 8, 10]), VS = rd(I * (RS + RL)), v = rd(I * RL);
  return { q: "A real source feeds RL. Find the terminal voltage Vab.", unit: "V", ans: v, fig: rsFig(nn(VS), nn(RS), RL, true), sol: "I = VS / (RS + RL) = " + nn(I) + " A\nVab = I RL = " + nn(I) + " × " + RL + " = " + nn(v) + " V\n(RS drops " + nn(I * RS) + " V)" }; });
G("2", "g2-10", "Real sources", function(){ var IS = pk([2, 4, 5, 10]), RL = pk([0.5, 1, 2, 3, 5]), V = rd(IS * RL);
  var f = (function(){ var xl = 105, xr = 285, s = vrun(xl, YT, YB, [{ t: "isrc", c: YM, dir: "u", lab: "I_S = " + IS + " mA", side: "l" }]) + hrun(YT, xl, xr, []) + vrun(xr, YT, YB, [{ t: "r", c: YM, lab: "R_L = " + RL + " kΩ", side: "r" }]) + hrun(YB, xr, xl, []); return svg(s + dots([[200, YT], [200, YB]]) + P.t(200, 29, "a") + P.t(200, 146, "b") + P.arr(232, 83, 232, 48) + P.arr(232, 83, 232, 118) + P.t(240, 87, "V_{ab}", "start", "acc")); })();
  return { q: "An ideal " + IS + " mA current source feeds RL = " + RL + " kΩ. Find Vab.", unit: "V", ans: V, fig: f, sol: "Vab = IS × RL = " + IS + " mA × " + RL + " kΩ = " + nn(V) + " V" }; });
G("2", "g2-11", "KVL", function(){ var V1 = ri(1, 4), V4 = ri(1, 4), V2 = ri(1, 4), V3 = ri(1, 4), E = V1 + V4 + V2 + V3;
  var s = vrun(XL, YT, YB, [B("E = " + E + " V")]) + hrun(YT, XL, 250, [{ t: "r", c: 165, lab: "V_1 = " + V1 + " V", side: "t", pm: true }]) + vrun(250, YT, YB, [{ t: "r", c: 62, len: 36, body: 26, lab: "V_2 = " + V2 + " V", side: "r", pm: true }, { t: "r", c: 104, len: 36, body: 26, lab: "V_3 = " + V3 + " V", side: "r", pm: true }]) + hrun(YB, 250, XL, [{ t: "r", c: 165, lab: "V_4 = " + V4 + " V", side: "b", pm: true }]);
  s += dots([[250, YT], [250, YB]]) + P.t(250, 29, "a") + P.t(250, 146, "b") + '<line class="dash" x1="258" y1="38" x2="335" y2="38"/><line class="dash" x1="258" y1="128" x2="335" y2="128"/>' + P.arr(335, 83, 335, 44) + P.arr(335, 83, 335, 122) + P.t(328, 87, "V_{ab}", "end", "acc");
  return { q: "Find Vab.", unit: "V", ans: V2 + V3, fig: svg(s), sol: "Through R₂ and R₃: Vab = V₂ + V₃ = " + V2 + " + " + V3 + " = " + (V2 + V3) + " V\nThrough E: " + E + " − " + V1 + " − " + V4 + " = " + (V2 + V3) + " V" }; });
G("2", "g2-12", "Prefixes", function(){ var c = pk([
  ["Express 2 200 Ω in kΩ.", 2.2, "kΩ", "2 200 Ω = 2.2 × 10³ Ω = 2.2 kΩ"], ["Express 0.000047 A in µA.", 47, "µA", "0.000047 A = 47 × 10⁻⁶ A = 47 µA"],
  ["Express 3.3 kΩ in Ω.", 3300, "Ω", "3.3 kΩ = 3.3 × 10³ Ω = 3300 Ω"], ["Express 12 mA in A.", 0.012, "A", "12 mA = 12 × 10⁻³ A = 0.012 A"],
  ["Express 0.25 A in mA.", 250, "mA", "0.25 A = 250 × 10⁻³ A = 250 mA"], ["Express 4.7 MΩ in kΩ.", 4700, "kΩ", "4.7 MΩ = 4.7 × 10⁶ Ω = 4700 kΩ"],
  ["Express 68 kΩ in MΩ.", 0.068, "MΩ", "68 kΩ = 68 × 10³ Ω = 0.068 MΩ"], ["Express 0.5 mA in µA.", 500, "µA", "0.5 mA = 500 × 10⁻⁶ A = 500 µA"]]);
  return { q: c[0], unit: c[2], ans: c[1], fig: null, sol: c[3] }; });
G("2", "g2-13", "Power and energy", function(){ var a = pk([6, 12, 18, 24]), b = pk([10, 20, 28, 40]);
  return { q: "Two parts take in " + a + " W and " + b + " W. Find the power of the source (give the sign).", unit: "W", ans: -(a + b), fig: null, sol: "The powers add up to zero:\n" + a + " + " + b + " + P(source) = 0\nP(source) = " + (-(a + b)) + " W" }; });

// ---------- Chapter 3 ----------
function vdrFig(E, R1, R2){ return svg(rect(XL, XR, YT, YB, { l: [B("E = " + E + " V")], r: [{ t: "r", c: 62, len: 36, body: 26, lab: "R_1 = " + R1 + " Ω", side: "l" }, { t: "r", c: 104, len: 36, body: 26, lab: "R_2 = " + R2 + " Ω", side: "l" }] }) + P.t(316, 108, "V_2 = ?", "start", "acc")); }
function par2Fig(E, R1, R2){ var xr = 255, s = vrun(XL, YT, YB, [B(E == null ? "E" : "E = " + E + " V")]) + hrun(YT, XL, xr, []) + hrun(YB, xr, XL, []) + vrun(170, YT, YB, [{ t: "r", c: YM, lab: R1 + " Ω", side: "r" }]) + vrun(xr, YT, YB, [{ t: "r", c: YM, lab: R2 + " Ω", side: "r" }]); return svg(s + dots([[170, YT], [170, YB]])); }
function cdrFig(IT, R1, R2, q2){ var xl = 100, xr = 265, s = vrun(xl, YT, YB, [{ t: "isrc", c: YM, dir: "u", lab: "I_T = " + IT + " mA", side: "l" }]) + hrun(YT, xl, xr, []) + hrun(YB, xr, xl, []) + vrun(185, YT, YB, [{ t: "r", c: YM, lab: "R_1 = " + R1, side: "r" }]) + vrun(xr, YT, YB, [{ t: "r", c: YM, lab: "R_2 = " + q2, side: "r" }]); return svg(s + dots([[185, YT], [185, YB]])); }
function spFig(E, R1, R2, R3){ var xr = 290, f = vrun(XL, YT, YB, [B("E = " + E + " V")]) + hrun(YT, XL, xr, [{ t: "r", c: 140, lab: "R_1 = " + R1 + " Ω", side: "t" }]) + vrun(215, YT, YB, [{ t: "r", c: YM, lab: "R_2 = " + R2 + " Ω", side: "r" }]) + vrun(xr, YT, YB, [{ t: "r", c: YM, lab: "R_3 = " + R3 + " Ω", side: "r" }]) + hrun(YB, xr, XL, []) + dots([[215, YT], [215, YB]]); return svg(f); }
function gndFig(E, R){ var s = vrun(XL, YT, YB, [B("E = " + E + " V")]) + hrun(YT, XL, XR, [{ t: "r", c: 140, lab: "R_1 = " + R[0] + " kΩ", side: "t" }, { t: "r", c: 240, lab: "R_2 = " + R[1] + " kΩ", side: "t" }]) + vrun(XR, YT, YB, [{ t: "r", c: YM, lab: "R_3 = " + R[2] + " kΩ", side: "l" }]) + hrun(YB, XR, XL, [{ t: "r", c: 230, lab: "R_4 = " + R[3] + " kΩ", side: "b" }]);
  s += dots([[XL, YT], [190, YT], [XR, YT], [XR, YB], [150, YB]]) + P.gnd(150, YB) + P.t(XL - 8, 32, "a", "end", "sign") + P.t(190, 29, "b", "middle", "sign") + P.t(XR + 8, 32, "c", "start", "sign") + P.t(XR + 8, 134, "d", "start", "sign") + P.t(158, 121, "e", "start", "sign"); return svg(s); }
var NICE2 = [[3, 6, 2], [4, 12, 3], [6, 12, 4], [10, 40, 8], [20, 30, 12], [15, 10, 6], [2, 2, 1], [8, 24, 6], [30, 60, 20], [12, 6, 4]];
var NICE3 = [[10, 10, 10, 10 / 3], [20, 20, 10, 5], [6, 12, 4, 2], [30, 30, 30, 10], [60, 30, 20, 10], [12, 12, 6, 3], [40, 40, 20, 10], [4, 4, 2, 1]];
var SETS4 = [[10, 20, 20, 10], [20, 10, 20, 10], [10, 10, 30, 10], [10, 30, 10, 10], [20, 20, 10, 10], [15, 15, 15, 15]];
G("3", "g3-1", "Series", function(){ var a = pk([2, 5, 10, 12]), b = pk([4, 8, 15, 20]), c = pk([6, 10, 30, 40]), RT = a + b + c;
  return { q: "Three resistors are in series. Find RT.", unit: "kΩ", ans: RT, fig: serFig(pk([12, 24, 60]), a * 1000, b * 1000, c * 1000), sol: "RT = R₁ + R₂ + R₃ = " + a + " + " + b + " + " + c + " = " + RT + " kΩ" }; });
G("3", "g3-2", "Series", function(){ var a = pk([2, 5, 10]), b = pk([4, 10, 20]), c = pk([6, 10, 30]), RT = a + b + c, I = pk([1, 2, 3, 5]), E = I * RT;
  return { q: "Find the current in the series circuit.", unit: "mA", ans: I, fig: serFig(E, a * 1000, b * 1000, c * 1000), sol: "RT = " + a + " + " + b + " + " + c + " = " + RT + " kΩ\nI = E / RT = " + E + " V / " + RT + " kΩ = " + I + " mA" }; });
G("3", "g3-3", "Voltage divider", function(){ var R1 = pk([2, 4, 6, 10]), R2 = pk([2, 4, 6, 8, 12]), E = (R1 + R2) * pk([1, 2, 3]), V = rd(E * R2 / (R1 + R2));
  return { q: "Use the voltage-divider rule to find V₂.", unit: "V", ans: V, fig: vdrFig(E, R1, R2), sol: "V₂ = E × R₂ / (R₁ + R₂) = " + E + " × " + R2 + " / " + (R1 + R2) + " = " + nn(V) + " V\nKVL check: V₁ = " + nn(E - V) + " V, and V₁ + V₂ = " + E + " V" }; });
G("3", "g3-4", "Series", function(){ var a = pk([10, 20]), b = pk([20, 30]), c = pk([30, 40]), RT = a + b + c, E = pk([12, 24, 60, 120]), p = rd(E * E / RT);
  return { q: "Find the total power of the series circuit.", unit: "mW", ans: p, fig: serFig(E, a * 1000, b * 1000, c * 1000), sol: "RT = " + RT + " kΩ\nI = E / RT = " + nn(E / RT) + " mA\nPT = E I = " + E + " V × " + nn(E / RT) + " mA = " + nn(p) + " mW" }; });
G("3", "g3-5", "Parallel", function(){ var c = pk(NICE2);
  return { q: "Two resistors are in parallel. Find Req.", unit: "Ω", ans: c[2], fig: par2Fig(null, c[0], c[1]), sol: "Req = R₁ R₂ / (R₁ + R₂) = " + c[0] + " × " + c[1] + " / " + (c[0] + c[1]) + " = " + c[2] + " Ω" }; });
G("3", "g3-6", "Parallel", function(){ var c = pk(NICE3);
  return { q: "Three resistors are in parallel. Find Req.", unit: "Ω", ans: rd(c[3]), fig: parFig("E", c[0], c[1], c[2]), sol: "1/Req = 1/" + c[0] + " + 1/" + c[1] + " + 1/" + c[2] + "\nReq = " + nn(c[3]) + " Ω" }; });
G("3", "g3-7", "Parallel", function(){ var c = pk(NICE2), I = pk([1, 2, 3, 4]), E = rd(I * c[2]);
  return { q: "Find the total current IT.", unit: "A", ans: I, fig: par2Fig(nn(E), c[0], c[1]), sol: "Req = " + c[0] + " × " + c[1] + " / " + (c[0] + c[1]) + " = " + c[2] + " Ω\nIT = E / Req = " + nn(E) + " V / " + c[2] + " Ω = " + I + " A" }; });
G("3", "g3-8", "Parallel", function(){ var c = pk(NICE2), E = pk([12, 24, 60]), I1 = rd(E / c[0]);
  return { q: "Find the current in the " + c[0] + " Ω resistor.", unit: "A", ans: I1, fig: par2Fig(E, c[0], c[1]), sol: "Same voltage on every branch:\nI = E / R = " + E + " V / " + c[0] + " Ω = " + nn(I1) + " A" }; });
G("3", "g3-9", "Current divider", function(){ var c = pk([[1, 2], [1, 3], [2, 4], [3, 6], [1, 4], [2, 3]]), k = pk([3, 4, 5, 6]), IT = (c[0] + c[1]) * k, I1 = rd(IT * c[1] / (c[0] + c[1]));
  return { q: "Use the current-divider rule to find the current in R₁.", unit: "mA", ans: I1, fig: cdrFig(IT, c[0] + " kΩ", c[1] + " kΩ", c[1] + " kΩ"), sol: "I₁ = IT × R₂ / (R₁ + R₂) = " + IT + " × " + c[1] + " / " + (c[0] + c[1]) + " = " + nn(I1) + " mA\nThe other resistor goes on top." }; });
G("3", "g3-10", "Current divider", function(){ var R1 = pk([10, 20, 30]), R2 = pk([20, 30, 60]), k = pk([1, 2, 3]), IT = (R1 + R2) * k / 10, I2 = rd(IT * R1 / (R1 + R2));
  return { q: "R₁ = " + R1 + " Ω, IT = " + nn(IT) + " mA and I₂ = " + nn(I2) + " mA. Find R₂.", unit: "Ω", ans: R2, fig: cdrFig(nn(IT), R1 + " Ω", R2, "?|I_2 = " + nn(I2) + " mA"), sol: "CDR: I₂ = IT R₁ / (R₁ + R₂)\n" + nn(I2) + " = " + nn(IT) + " × " + R1 + " / (" + R1 + " + R₂)\n" + R1 + " + R₂ = " + (R1 + R2) + ", so R₂ = " + R2 + " Ω" }; });
G("3", "g3-11", "Series-parallel", function(){ var c = pk(NICE2), R1 = pk([2, 4, 5, 6, 10]), Req = R1 + c[2];
  return { q: "Find Req of R₁ in series with (R₂ ∥ R₃).", unit: "Ω", ans: Req, fig: spFig(12, R1, c[0], c[1]), sol: "R₂ ∥ R₃ = " + c[0] + " × " + c[1] + " / " + (c[0] + c[1]) + " = " + c[2] + " Ω\nReq = " + R1 + " + " + c[2] + " = " + Req + " Ω" }; });
G("3", "g3-12", "Series-parallel", function(){ var c = pk(NICE2), R1 = pk([2, 4, 5, 6, 10]), Req = R1 + c[2], IT = pk([1, 2, 3]), E = IT * Req;
  return { q: "Find the total current IT.", unit: "A", ans: IT, fig: spFig(E, R1, c[0], c[1]), sol: "Req = " + R1 + " + (" + c[0] + " ∥ " + c[1] + ") = " + Req + " Ω\nIT = E / Req = " + E + " V / " + Req + " Ω = " + IT + " A" }; });
G("3", "g3-13", "Series-parallel", function(){ var c = pk(NICE2), R1 = pk([2, 4, 5, 6, 10]), Req = R1 + c[2], IT = pk([1, 2, 3]), E = IT * Req, Vp = IT * c[2];
  return { q: "Find the voltage across the parallel part (R₂ and R₃).", unit: "V", ans: Vp, fig: spFig(E, R1, c[0], c[1]), sol: "Req = " + Req + " Ω, IT = " + IT + " A\nV(parallel) = IT × (R₂ ∥ R₃) = " + IT + " × " + c[2] + " = " + Vp + " V\nKVL check: " + (IT * R1) + " + " + Vp + " = " + E + " V" }; });
G("3", "g3-14", "Ground", function(){ var R = pk(SETS4), E = pk([60, 120, 180]), Vb = rd(E * (60 - R[0]) / 60);
  return { q: "Point e is ground. Find Vb (RT = 60 kΩ).", unit: "V", ans: Vb, fig: gndFig(E, R), sol: "Vb = Vbe = E × (R₂ + R₃ + R₄) / RT\n= " + E + " × " + (60 - R[0]) + " / 60 = " + nn(Vb) + " V" }; });
G("3", "g3-15", "Ground", function(){ var R = pk(SETS4), E = pk([60, 120, 180]), Vbc = rd(E * R[1] / 60);
  return { q: "Find Vbc between points b and c (RT = 60 kΩ).", unit: "V", ans: Vbc, fig: gndFig(E, R), sol: "Vbc is the voltage on R₂:\nVbc = E × R₂ / RT = " + E + " × " + R[1] + " / 60 = " + nn(Vbc) + " V" }; });

// ---------- Chapter 4 ----------
function srcV(E, RS){ var xr = 255, s = vrun(XL, YT, YB, [B("E = " + E + " V")]) + hrun(YT, XL, xr, [{ t: "r", c: 160, lab: "R_S = " + RS + " Ω", side: "t" }]) + hrun(YB, xr, XL, []); return svg(s + P.term(xr, YT) + P.term(xr, YB) + P.t(xr + 10, 42, "a", "start") + P.t(xr + 10, 132, "b", "start")); }
function srcI(IS, RS){ var xl = 110, xr = 290, s = vrun(xl, YT, YB, [{ t: "isrc", c: YM, dir: "u", lab: "I_S = " + IS + " A", side: "l" }]) + hrun(YT, xl, xr, []) + hrun(YB, xr, xl, []) + vrun(200, YT, YB, [{ t: "r", c: YM, lab: "R_S = " + RS + " Ω", side: "r" }]); return svg(s + dots([[200, YT], [200, YB]]) + P.term(xr, YT) + P.term(xr, YB) + P.t(xr + 10, 42, "a", "start") + P.t(xr + 10, 132, "b", "start")); }
function brData(){ for (;;){ var I1 = ri(1, 5), I2 = pk([-3, -2, -1, 1, 2, 3, 4]), I3 = I1 + I2, R1 = pk([1, 2, 3, 4]), R2 = pk([1, 2, 3, 4]), R3 = pk([1, 2, 3, 4]), E1 = R1 * I1 + R3 * I3, E2 = R2 * I2 + R3 * I3; if (I3 > 0 && E2 > 0 && E1 > 0 && E1 <= 40 && E2 <= 40) return { I1: I1, I2: I2, I3: I3, R1: R1, R2: R2, R3: R3, E1: E1, E2: E2 }; } }
function brQ(which){ return function(){ var d = brData(), ans = d["I" + which];
  return { q: "Use branch current analysis. Find I" + ["", "₁", "₂", "₃"][which] + ". (A negative answer means the current flows against its arrow.)", unit: "A", ans: ans,
    fig: branchFig({ e1: "E_1 = " + d.E1 + " V", e2: "E_2 = " + d.E2 + " V", r1: "R_1 = " + d.R1 + " Ω", r2: "R_2 = " + d.R2 + " Ω", r3: "R_3 = " + d.R3 + " Ω" }),
    sol: "KCL at a: I₁ + I₂ = I₃\nMesh 1: " + d.R1 + " I₁ + " + d.R3 + " I₃ = " + d.E1 + "\nMesh 2: " + d.R2 + " I₂ + " + d.R3 + " I₃ = " + d.E2 + "\nSolving: I₁ = " + d.I1 + " A, I₂ = " + d.I2 + " A, I₃ = " + d.I3 + " A\nCheck mesh 1: " + (d.R1 * d.I1 + d.R3 * d.I3) + " V" }; }; }
G("4", "g4-1", "Source conversion", function(){ var RS = pk([2, 3, 4, 5]), IS = pk([1, 2, 3, 4]), E = IS * RS;
  return { q: "Convert this voltage source to a current source. Find IS.", unit: "A", ans: IS, fig: srcV(E, RS), sol: "IS = E / RS = " + E + " V / " + RS + " Ω = " + IS + " A, with " + RS + " Ω in parallel." }; });
G("4", "g4-2", "Source conversion", function(){ var RS = pk([2, 3, 4, 5, 10]), IS = pk([0.5, 1, 2, 3, 5]), E = rd(IS * RS);
  return { q: "Convert this current source to a voltage source. Find E.", unit: "V", ans: E, fig: srcI(nn(IS), RS), sol: "E = IS RS = " + nn(IS) + " A × " + RS + " Ω = " + nn(E) + " V, with " + RS + " Ω in series." }; });
G("4", "g4-3", "Source conversion", function(){ var RS = pk([1, 2, 3, 4]), RL = pk([2, 4, 5, 8, 10]), IL = pk([0.5, 1, 2]), E = rd(IL * (RS + RL)), IS = rd(E / RS);
  var s = vrun(XL, YT, YB, [B("E = " + nn(E) + " V")]) + hrun(YT, XL, 285, [{ t: "r", c: 150, lab: "R_S = " + RS + " Ω", side: "t" }]) + vrun(285, YT, YB, [{ t: "r", c: YM, lab: "R_L = " + RL + " Ω", side: "r" }]) + hrun(YB, 285, XL, []);
  return { q: "Find the load current IL. (Either circuit form gives the same answer.)", unit: "A", ans: IL, fig: svg(s), sol: "Voltage source: IL = E / (RS + RL) = " + nn(E) + " / " + (RS + RL) + " = " + nn(IL) + " A\nCurrent source: IS = " + nn(IS) + " A, CDR: IL = " + nn(IS) + " × " + RS + " / " + (RS + RL) + " = " + nn(IL) + " A" }; });
G("4", "g4-4", "Series sources", function(){ var n = pk([3, 4]), dirs = [], tot = 0, vv = pk([1.5, 3, 5, 6]); for (var i = 0; i < n; i++){ var d = Math.random() < 0.7 ? 1 : -1; dirs.push(d); tot += d * vv; } tot = rd(tot);
  var xs = n === 3 ? [125, 195, 265] : [105, 160, 215, 270], items = xs.map(function(x, i){ return { t: "bat", c: x, plus: dirs[i] > 0 ? "r" : "l", lab: nn(vv) + " V", side: "t" }; });
  return { q: "The sources are in series. The + of E is on the right. Find E (negative if its + is on the left).", unit: "V", ans: tot, fig: svg(hrun(YM, 55, 305, items) + P.term(55, YM) + P.term(305, YM) + P.t(180, 128, "E = ?", "middle", "acc")), sol: "Same way as E: +. Opposite: −.\nE = " + dirs.map(function(d){ return (d > 0 ? "+ " : "− ") + nn(vv); }).join(" ") + " = " + nn(tot) + " V" }; });
G("4", "g4-5", "Parallel sources", function(){ var a = ri(1, 5), b = ri(1, 5), c = ri(1, 5), da = 1, db = Math.random() < 0.5 ? 1 : -1, dc = Math.random() < 0.5 ? 1 : -1, tot = a * da + b * db + c * dc;
  var s = hrun(YT, 80, 300, []) + hrun(YB, 300, 80, []), xs = [100, 190, 280], vals = [a, b, c], ds = [da, db, dc];
  xs.forEach(function(x, i){ s += vrun(x, YT, YB, [{ t: "isrc", c: YM, dir: ds[i] > 0 ? "u" : "d", lab: vals[i] + " A", side: "r" }]); });
  s += P.term(300, YT) + P.term(300, YB);
  return { q: "Three current sources are in parallel. Find IS (positive if it points up).", unit: "A", ans: tot, fig: svg(s), sol: "Up is +, down is −:\nIS = " + [a * da, b * db, c * dc].map(function(x){ return (x > 0 ? "+ " : "− ") + Math.abs(x); }).join(" ") + " = " + tot + " A" }; });
G("4", "g4-6", "Source conversion", function(){ var I = pk([0.5, 1, 2]), Rs = [pk([1, 2]), pk([1, 2, 3]), pk([2, 4]), pk([1, 2])], SR = Rs.reduce(function(a, b){ return a + b; }, 0), e2 = pk([2, 4, 6]), e3 = pk([2, 4]), E1 = rd(I * SR + e2 + e3);
  var f = svg(rect(XL, XR, YT, YB, { l: [B(nn(E1) + " V")], t: [{ t: "r", c: 125, lab: Rs[0] + " Ω", side: "t" }, { t: "bat", c: 185, plus: "l", lab: e2 + " V", side: "t" }, { t: "r", c: 250, lab: Rs[1] + " Ω", side: "t" }], r: [{ t: "r", c: YM, lab: Rs[2] + " Ω", side: "l" }], b: [{ t: "r", c: 225, lab: Rs[3] + " Ω", side: "b" }, { t: "bat", c: 150, plus: "r", lab: e3 + " V", side: "b" }] }) + P.arr(150, 83, 215, 83, "I = ?", 182, 76));
  return { q: "The " + nn(E1) + " V source aids the current. The " + e2 + " V and " + e3 + " V sources oppose it. Find I.", unit: "A", ans: I, fig: f, sol: "I = ΣE / ΣR = (" + nn(E1) + " − " + e2 + " − " + e3 + ") / (" + Rs.join(" + ") + ") = " + nn(I * SR) + " / " + SR + " = " + nn(I) + " A" }; });
G("4", "g4-7", "Branch current", brQ(1));
G("4", "g4-8", "Branch current", brQ(2));
G("4", "g4-9", "Branch current", brQ(3));
G("4", "g4-10", "Branch current", function(){ var b = ri(3, 8), n = ri(2, Math.min(5, b)), which = pk(["KCL", "KVL"]);
  return { q: "A circuit has b = " + b + " branches and n = " + n + " nodes. How many " + which + " equations does branch current analysis need?", unit: "", ans: which === "KCL" ? n - 1 : b - (n - 1), fig: null, sol: "KCL equations = n − 1 = " + (n - 1) + "\nKVL equations = b − (n − 1) = " + (b - n + 1) + "\nTotal = b = " + b }; });
G("4", "g4-11", "Branch current", function(){ var d = brData(), p = rd(d.E1 * d.I1);
  return { q: "Find the power of source E₁ (positive when it gives out energy).", unit: "W", ans: p, fig: branchFig({ e1: "E_1 = " + d.E1 + " V", e2: "E_2 = " + d.E2 + " V", r1: "R_1 = " + d.R1 + " Ω", r2: "R_2 = " + d.R2 + " Ω", r3: "R_3 = " + d.R3 + " Ω" }), sol: "Solve the currents: I₁ = " + d.I1 + " A\nP = E₁ I₁ = " + d.E1 + " × " + d.I1 + " = " + p + " W" }; });
