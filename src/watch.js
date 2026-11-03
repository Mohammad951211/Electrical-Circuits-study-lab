// ---------- Watch tab: animated, interactive simulations ----------
var SIMS = {};
function nf(x, d){ var s = (+x).toFixed(d == null ? 2 : d); if (s.indexOf(".") >= 0) s = s.replace(/0+$/, "").replace(/\.$/, ""); return s === "-0" ? "0" : s; }
function spd1(I){ return Math.max(-0.7, Math.min(0.7, I * 0.06)); }
function flow(pts, ph, cls, gap){
  var L = [], tot = 0, i, k, n, o = "";
  for (i = 1; i < pts.length; i++){ var d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
  n = Math.max(2, Math.round(tot / (gap || 34)));
  for (k = 0; k < n; k++){
    var f = ((((ph + k / n) % 1) + 1) % 1) * tot, j = 0;
    while (j < L.length - 1 && f > L[j]){ f -= L[j]; j++; }
    var t = L[j] ? f / L[j] : 0;
    var px = pts[j][0] + (pts[j + 1][0] - pts[j][0]) * t, py = pts[j][1] + (pts[j + 1][1] - pts[j][1]) * t, dx = pts[j + 1][0] - pts[j][0], dy = pts[j + 1][1] - pts[j][1], dl = Math.hypot(dx, dy) || 1, ux = dx / dl, uy = dy / dl, nx = -uy, ny = ux;
    o += '<polygon class="dot ' + cls + '" points="' + (px + ux * 6).toFixed(1) + "," + (py + uy * 6).toFixed(1) + " " + (px - ux * 4 + nx * 4.2).toFixed(1) + "," + (py - uy * 4 + ny * 4.2).toFixed(1) + " " + (px - ux * 4 - nx * 4.2).toFixed(1) + "," + (py - uy * 4 - ny * 4.2).toFixed(1) + '"/>';
  }
  return o;
}
function wr(s){ return '<polyline class="w" points="' + s + '"/>'; }
function sbs(s){ return String(s).replace(/_([A-Za-z]+)/g, "<sub>$1</sub>"); }
function sbt(s){ return String(s).replace(/_([A-Za-z]+)/g, '<tspan baseline-shift="sub" font-size="9.5">$1</tspan>'); }
function tx(x, y, s, a, c){ s = sbt(s); return '<text class="st ' + (c || "") + '" x="' + x + '" y="' + y + '" text-anchor="' + (a || "middle") + '">' + s + "</text>"; }
function zig(x1, y1, x2, y2){
  var hor = y1 === y2, L = hor ? Math.abs(x2 - x1) : Math.abs(y2 - y1), sg = hor ? (x2 > x1 ? 1 : -1) : (y2 > y1 ? 1 : -1), ld = L * 0.2, pts = [[0, 0], [ld, 0]], i, body = L - 2 * ld;
  for (i = 1; i <= 6; i++) pts.push([ld + (i - 0.5) * body / 6, (i % 2 ? -1 : 1) * 8]);
  pts.push([L - ld, 0]); pts.push([L, 0]);
  return wr(pts.map(function(p){ return hor ? (x1 + p[0] * sg).toFixed(1) + "," + (y1 + p[1]).toFixed(1) : (x1 + p[1]).toFixed(1) + "," + (y1 + p[0] * sg).toFixed(1); }).join(" "));
}
function bat(x, yt, yb){
  var m = (yt + yb) / 2;
  return wr(x + "," + yt + " " + x + "," + (m - 5)) + wr(x + "," + (m + 5) + " " + x + "," + yb) + '<line class="w" x1="' + (x - 15) + '" y1="' + (m - 5) + '" x2="' + (x + 15) + '" y2="' + (m - 5) + '"/><line class="w thick" x1="' + (x - 8) + '" y1="' + (m + 5) + '" x2="' + (x + 8) + '" y2="' + (m + 5) + '"/>' + tx(x + 24, m - 8, "+", "start") + tx(x + 24, m + 16, "−", "start");
}
function arr(x1, y, x2, cls){ var s = x2 > x1 ? 1 : -1; return '<line class="ar ' + (cls || "") + '" x1="' + x1 + '" y1="' + y + '" x2="' + x2 + '" y2="' + y + '"/><polygon class="arh ' + (cls || "") + '" points="' + x2 + "," + y + " " + (x2 - 9 * s) + "," + (y - 5) + " " + (x2 - 9 * s) + "," + (y + 5) + '"/>'; }
function sgn(x){ return x < 0 ? "−" + nf(-x) : nf(x); }

// ===== Chapter 1 =====
SIMS["1"] = [
  { t: "Current in a circuit", d: "Current leaves the + terminal of the battery, passes through the load and returns to the − terminal. Switch to the electron view to see the charge carriers move the other way.",
    ctl: [{ id: "sw", type: "sw", label: "Switch", opts: ["Closed", "Open"], val: 0 }, { id: "show", type: "sw", label: "Show", opts: ["Current (+ to −)", "Electron flow"], val: 0 }, { id: "E", label: "E", min: 1, max: 12, step: 1, val: 6, unit: "V" }, { id: "R", label: "R", min: 2, max: 12, step: 1, val: 6, unit: "Ω" }],
    I: function(v){ return v.sw ? 0 : v.E / v.R; },
    spd: function(v){ return [spd1(this.I(v))]; },
    draw: function(v, ph){
      var I = this.I(v), pts = [[70, 125], [70, 60], [410, 60], [410, 210], [70, 210], [70, 145]];
      return bat(70, 60, 210) + wr("70,60 200,60") + (v.sw ? '<line class="w" x1="200" y1="60" x2="250" y2="38"/><circle class="nd" cx="200" cy="60" r="4"/><circle class="nd" cx="260" cy="60" r="4"/>' : '<line class="w" x1="200" y1="60" x2="260" y2="60"/><circle class="nd" cx="200" cy="60" r="4"/><circle class="nd" cx="260" cy="60" r="4"/>') + wr("260,60 410,60 410,100") + zig(410, 100, 410, 170) + wr("410,170 410,210 70,210") +
        (v.show ? flow(pts, -ph[0], I ? "e" : "off") + arr(350, 36, 300, "e") + tx(325, 26, "electron flow") : flow(pts, ph[0], I ? "c" : "off") + arr(300, 36, 350, "c") + tx(325, 26, "I leaves the + terminal")) + tx(94, 138, "E = " + v.E + " V", "start") + tx(396, 140, "R = " + v.R + " Ω", "end") + (v.sw ? tx(230, 28, "open", "middle", "bad") : "");
    },
    out: function(v){ var I = this.I(v); return v.sw ? ["Switch open: no closed loop.", "I = 0 A"] : ["I = E / R", "I = " + v.E + " V / " + v.R + " Ω = " + nf(I) + " A"]; },
    look: ["Current leaves the + terminal and returns to the − terminal. Electrons move the other way.", "Open the switch. All motion stops, because the loop is no longer closed.", "Raise E. The dots speed up. Raise R. They slow down."],
    tryit: [["E = 12 V and R = 4 Ω. What is I?", "I = 12 / 4 = 3 A."], ["Which way do electrons move in the top wire?", "To the left, from the − terminal side toward the + terminal."]] },
  { t: "Ohm's law", d: "Change V and R. The current follows I = V / R. The graph is a straight line through the origin.",
    ctl: [{ id: "V", label: "V", min: 0, max: 12, step: 1, val: 6, unit: "V" }, { id: "R", label: "R", min: 1, max: 12, step: 1, val: 4, unit: "Ω" }],
    spd: function(v){ return [spd1(v.V / v.R)]; },
    draw: function(v, ph){
      var I = v.V / v.R, x0 = 290, y0 = 220, gx = 160, gy = 170, px = x0 + gx * v.V / 12, py = y0 - gy * Math.min(I, 12) / 12, ex = Math.min(12, 12 * v.R) , i, g = "";
      var pts = [[40, 118], [40, 60], [200, 60], [200, 210], [40, 210], [40, 142]];
      for (i = 0; i <= 12; i += 3) g += '<line class="gr" x1="' + (x0 + gx * i / 12) + '" y1="' + y0 + '" x2="' + (x0 + gx * i / 12) + '" y2="' + (y0 - gy) + '"/>' + tx(x0 + gx * i / 12, y0 + 16, i) + '<line class="gr" x1="' + x0 + '" y1="' + (y0 - gy * i / 12) + '" x2="' + (x0 + gx) + '" y2="' + (y0 - gy * i / 12) + '"/>' + tx(x0 - 6, y0 - gy * i / 12 + 4, i, "end");
      return bat(40, 60, 210) + wr("40,60 200,60 200,110") + zig(200, 110, 200, 170) + wr("200,170 200,210 40,210") + flow(pts, ph[0], I ? "c" : "off") + tx(64, 140, "V", "start") + tx(184, 144, "R", "end") +
        g + '<line class="axis2" x1="' + x0 + '" y1="' + y0 + '" x2="' + (x0 + gx) + '" y2="' + y0 + '"/><line class="axis2" x1="' + x0 + '" y1="' + y0 + '" x2="' + x0 + '" y2="' + (y0 - gy) + '"/>' + tx(x0 + gx / 2, 256, "V (volts)") + tx(262, 36, "I (A)") +
        '<line class="line" x1="' + x0 + '" y1="' + y0 + '" x2="' + (x0 + gx) + '" y2="' + (y0 - gy * (12 / v.R) / 12) + '"/>' + '<line class="dash" x1="' + px + '" y1="' + y0 + '" x2="' + px + '" y2="' + py + '"/><line class="dash" x1="' + x0 + '" y1="' + py + '" x2="' + px + '" y2="' + py + '"/><circle class="pt" cx="' + px + '" cy="' + py + '" r="6"/>';
    },
    out: function(v){ var I = v.V / v.R; return ["I = V / R", "I = " + v.V + " V / " + v.R + " Ω = " + nf(I) + " A", "Slope of the line = 1 / R = G = " + nf(1 / v.R, 3) + " S"]; },
    look: ["The point slides along a straight line. Double V and I doubles.", "A larger R makes the line flatter. The same V gives less current.", "The slope of the I to V line is the conductance G."],
    tryit: [["Set R = 2 Ω and V = 10 V. What is I?", "I = 10 / 2 = 5 A."], ["R is doubled and V stays the same. What happens to I?", "I is halved."]] },
  { t: "What sets the resistance", d: "A wire with length L, cross-section area A and a material factor ρ. Relative units are used. A short, thick, low-ρ wire has little resistance.",
    ctl: [{ id: "L", label: "Length L", min: 1, max: 10, step: 1, val: 4, unit: "" }, { id: "A", label: "Area A", min: 1, max: 6, step: 1, val: 2, unit: "" }, { id: "p", label: "Material ρ", min: 1, max: 4, step: 1, val: 1, unit: "" }],
    R: function(v){ return v.p * v.L / v.A; },
    spd: function(v){ return [Math.min(0.7, 0.16 * v.A / (v.p * v.L) * 2)]; },
    draw: function(v, ph){
      var R = this.R(v), w = v.L * 34, h = v.A * 13, x = 70, y = 118 - h / 2, o = "", i;
      o += '<rect class="wire" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="5" style="fill-opacity:' + (0.12 + v.p * 0.12) + '"/>';
      for (i = 0; i < v.A; i++) o += flow([[x + 4, y + 7 + i * 13], [x + w - 4, y + 7 + i * 13]], ph[0], "c", 30);
      o += '<line class="dim" x1="' + x + '" y1="' + (y - 16) + '" x2="' + (x + w) + '" y2="' + (y - 16) + '"/>' + tx(x + w / 2, y - 22, "L = " + v.L) + '<line class="dim" x1="' + (x + w + 14) + '" y1="' + y + '" x2="' + (x + w + 14) + '" y2="' + (y + h) + '"/>' + tx(x + w + 22, y + h / 2 + 4, "A = " + v.A, "start");
      o += arr(30, 118, 62) + wr("30,118 30,118");
      o += tx(240, 215, "R = ρ L / A", "middle") + '<rect class="rbar" x="40" y="226" width="' + Math.min(400, R * 20) + '" height="14" rx="3"/>' + tx(40 + Math.min(400, R * 20) + 8, 238, nf(R) + " units", "start");
      return o;
    },
    out: function(v){ var R = this.R(v); return ["R = ρ L / A", "R = " + v.p + " × " + v.L + " / " + v.A + " = " + nf(R) + " units", "G = 1 / R = " + nf(1 / R, 3) + " units⁻¹"]; },
    look: ["More length means more collisions along the way. R grows with L.", "More area gives more parallel paths. R falls as A grows.", "A larger ρ means a poorer conductor. R grows with ρ."],
    tryit: [["Double L and double A. What happens to R?", "R stays the same."], ["Raise ρ from 1 to 3 with L and A fixed. R changes by what factor?", "R becomes 3 times larger."]] },
  { t: "Resistor colour code", d: "Choose the first two digit bands, the multiplier band and the tolerance band.",
    ctl: [{ id: "a", type: "sel", label: "Band 1", opts: ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"], val: 2 }, { id: "b", type: "sel", label: "Band 2", opts: ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"], val: 2 }, { id: "m", type: "sel", label: "Band 3 (multiplier)", opts: ["black", "brown", "red", "orange", "yellow", "green", "blue"], val: 3 }, { id: "t", type: "sel", label: "Band 4 (tolerance)", opts: ["gold", "silver"], val: 0 }],
    spd: function(){ return []; },
    val: function(v){ return (v.a * 10 + v.b) * Math.pow(10, v.m); },
    draw: function(v){
      var cols = { black: "#111", brown: "#7a4a21", red: "#d12", orange: "#f08a00", yellow: "#f2d300", green: "#1a9b3c", blue: "#1f5fd0", violet: "#7a3fc0", grey: "#8c8c8c", white: "#fff", gold: "#c9a227", silver: "#c0c4c8" };
      var nm = this.ctl[0].opts, mn = this.ctl[2].opts, tn = this.ctl[3].opts, bands = [cols[nm[v.a]], cols[nm[v.b]], cols[mn[v.m]], cols[tn[v.t]]], xs = [170, 210, 250, 320], i, o = "";
      o += wr("30,120 130,120") + wr("350,120 450,120") + '<rect class="rbody" x="130" y="88" width="220" height="64" rx="30"/>';
      for (i = 0; i < 4; i++) o += '<rect x="' + xs[i] + '" y="88" width="16" height="64" fill="' + bands[i] + '" stroke="#0c2238" stroke-width="1"/>';
      o += tx(178, 178, "1st") + tx(218, 178, "2nd") + tx(258, 178, "× 10ⁿ") + tx(328, 178, "tol.") + tx(240, 235, fmtR(this.val(v)) + " " + (v.t ? "± 10%" : "± 5%"), "middle", "big");
      return o;
    },
    out: function(v){ var a = this.ctl[0].opts[v.a], b = this.ctl[1].opts[v.b], m = this.ctl[2].opts[v.m]; return [a + ", " + b + ", " + m + ", " + this.ctl[3].opts[v.t], "(" + v.a + v.b + ") × 10^" + v.m + " = " + (v.a * 10 + v.b) + " × " + Math.pow(10, v.m) + " Ω", "R = " + fmtR(this.val(v)) + " ± " + (v.t ? "10" : "5") + "%"]; },
    look: ["The first two bands are digits. The third band is the power of ten.", "Gold means ± 5%. Silver means ± 10%.", "Red, red, orange, gold gives 22 kΩ ± 5%."],
    tryit: [["Which bands give 4.7 kΩ?", "Yellow, violet, red. 47 × 10² = 4.7 kΩ."], ["Brown, black, orange. What is R?", "10 × 10³ = 10 kΩ."]] }
];
function fmtR(r){ return r >= 1e6 ? nf(r / 1e6, 2) + " MΩ" : r >= 1e3 ? nf(r / 1e3, 2) + " kΩ" : nf(r, 2) + " Ω"; }

// ===== Chapter 2 =====
SIMS["2"] = [
  { t: "KCL at a node", d: "Two branches bring current to a node. The third carries it away. Switch the direction of I₂ to see a reference direction at work.",
    ctl: [{ id: "i1", label: "I₁ (into node)", min: 0, max: 6, step: 1, val: 3, unit: "A" }, { id: "i2", label: "I₂", min: 0, max: 6, step: 1, val: 2, unit: "A" }, { id: "d", type: "sw", label: "I₂ arrow points", opts: ["Into node", "Out of node"], val: 0 }],
    I2: function(v){ return v.d ? -v.i2 : v.i2; },
    I3: function(v){ return v.i1 + this.I2(v); },
    spd: function(v){ return [spd1(v.i1), spd1(this.I2(v)), spd1(this.I3(v))]; },
    draw: function(v, ph){
      return wr("40,135 240,135") + wr("240,30 240,135") + wr("240,135 440,135") + '<circle class="nd big" cx="240" cy="135" r="7"/>' + flow([[40, 135], [240, 135]], ph[0], "c") + flow([[240, 30], [240, 135]], ph[1], this.I2(v) ? "c" : "off") + flow([[240, 135], [440, 135]], ph[2], this.I3(v) ? "c" : "off") +
        arr(110, 112, 160, "c") + tx(135, 104, "I₁ = " + v.i1 + " A") + '<line class="ar c" x1="262" y1="' + (v.d ? 90 : 48) + '" x2="262" y2="' + (v.d ? 48 : 90) + '"/><polygon class="arh c" points="262,' + (v.d ? 48 : 90) + " 257," + (v.d ? 58 : 80) + " 267," + (v.d ? 58 : 80) + '"/>' + tx(274, 72, "I₂ = " + v.i2 + " A", "start") + arr(320, 112, 370, "c") + tx(345, 104, "I₃ = " + sgn(this.I3(v)) + " A") + tx(240, 190, "Σ I in = Σ I out", "middle", "big");
    },
    out: function(v){ var i2 = this.I2(v); return v.d ? ["I₁ = I₂ + I₃", "I₃ = I₁ − I₂ = " + v.i1 + " − " + v.i2 + " = " + sgn(this.I3(v)) + " A"] : ["I₁ + I₂ = I₃", "I₃ = " + v.i1 + " + " + v.i2 + " = " + nf(this.I3(v)) + " A"]; },
    look: ["Current in equals current out. The node stores no charge.", "When I₃ is negative, the real flow is opposite to the arrow.", "The dots in each wire speed up with the current there."],
    tryit: [["I₁ = 5 A, I₂ = 2 A entering. What leaves?", "I₃ = 7 A."], ["I₂ points out, I₁ = 2 A, I₂ = 5 A. What is I₃?", "I₃ = 2 − 5 = −3 A. The real flow enters the node from the right."]] },
  { t: "KVL around a loop", d: "The marker walks round the loop. It gains E at the source and loses voltage at each resistor. It ends at zero.",
    ctl: [{ id: "E", label: "E", min: 2, max: 12, step: 1, val: 9, unit: "V" }, { id: "r1", label: "R₁", min: 1, max: 6, step: 1, val: 2, unit: "Ω" }, { id: "r2", label: "R₂", min: 1, max: 6, step: 1, val: 3, unit: "Ω" }, { id: "r3", label: "R₃", min: 1, max: 6, step: 1, val: 4, unit: "Ω" }],
    RT: function(v){ return v.r1 + v.r2 + v.r3; },
    spd: function(v){ return [spd1(v.E / this.RT(v)), 0.1]; },
    draw: function(v, ph){
      var I = v.E / this.RT(v), V = [I * v.r1, I * v.r2, I * v.r3], pts = [[40, 100], [40, 50], [130, 50], [130, 50]], o = "", gx = 270, gy = 215, gw = 180, gh = 150;
      var pot = [0, v.E, v.E - V[0], v.E - V[0] - V[1], 0], xs = [0, 1, 2, 3, 4], px = function(i){ return gx + gw * i / 4; }, py = function(p){ return gy - gh * p / 12; };
      var lp = []; for (var i = 0; i < 5; i++) lp.push(px(i) + "," + py(pot[i]));
      var f = (((ph[1] % 1) + 1) % 1) * 4, j = Math.min(3, Math.floor(f)), tt = f - j, mx = px(j) + (px(j + 1) - px(j)) * tt, my = py(pot[j]) + (py(pot[j + 1]) - py(pot[j])) * tt;
      o += bat(40, 50, 190) + wr("40,50 70,50") + zig(70, 50, 130, 50) + wr("130,50 160,50 160,100") + zig(160, 100, 160, 140) + wr("160,140 160,190 100,190") + zig(100, 190, 70, 190) + wr("70,190 40,190");
      o += flow([[40, 105], [40, 50], [160, 50], [160, 190], [40, 190], [40, 135]], ph[0], "c") + tx(100, 38, "R₁ " + v.r1 + " Ω") + tx(190, 125, "R₂ " + v.r2 + " Ω", "start") + tx(85, 210, "R₃ " + v.r3 + " Ω") + tx(56, 125, "E", "start");
      o += '<line class="gr" x1="' + gx + '" y1="' + py(0) + '" x2="' + (gx + gw) + '" y2="' + py(0) + '"/>' + '<polyline class="line" points="' + lp.join(" ") + '" style="stroke-linejoin:miter"/>' + '<circle class="pt" cx="' + mx.toFixed(1) + '" cy="' + my.toFixed(1) + '" r="6"/>' + tx(gx + gw / 2, 245, "potential around the loop") + tx(gx - 6, py(v.E) + 4, v.E + " V", "end") + tx(gx - 6, py(0) + 4, "0", "end");
      return o;
    },
    out: function(v){ var I = v.E / this.RT(v), V = [I * v.r1, I * v.r2, I * v.r3]; return ["I = E / RT = " + v.E + " / " + this.RT(v) + " = " + nf(I) + " A", "V₁ = " + nf(V[0]) + " V, V₂ = " + nf(V[1]) + " V, V₃ = " + nf(V[2]) + " V", "V₁ + V₂ + V₃ = " + nf(V[0] + V[1] + V[2]) + " V = E ✓"]; },
    look: ["The graph rises once at the source and falls at each resistor.", "The biggest resistor takes the biggest drop.", "The drops always add up to E. That is KVL."],
    tryit: [["E = 12 V, R₁ = 2, R₂ = 4, R₃ = 6 Ω. What is V₃?", "I = 12/12 = 1 A, so V₃ = 6 V."], ["R₁ is doubled. What happens to V₂?", "I falls, so V₂ falls. The drops still add up to E."]] },
  { t: "Power and energy", d: "The source delivers power. The resistor absorbs it. The two always balance.",
    ctl: [{ id: "V", label: "V", min: 1, max: 12, step: 1, val: 6, unit: "V" }, { id: "R", label: "R", min: 1, max: 12, step: 1, val: 6, unit: "Ω" }],
    spd: function(v){ return [spd1(v.V / v.R)]; },
    draw: function(v, ph){
      var I = v.V / v.R, P = v.V * I, g = Math.min(0.9, P / 100);
      return '<circle cx="400" cy="135" r="46" fill="#f2a900" style="opacity:' + g.toFixed(2) + '"/>' + bat(70, 60, 210) + wr("70,60 400,60 400,105") + zig(400, 105, 400, 165) + wr("400,165 400,210 70,210") + flow([[70, 125], [70, 60], [400, 60], [400, 210], [70, 210], [70, 145]], ph[0], "c") + tx(94, 140, "source", "start") + tx(380, 140, "load", "end") + arr(150, 40, 230, "c") + tx(190, 30, "energy to load") + tx(240, 130, "P = V I", "middle", "big") + tx(240, 156, nf(P) + " W");
    },
    out: function(v){ var I = v.V / v.R, P = v.V * I; return ["I = V / R = " + nf(I) + " A", "Load: P = V I = " + nf(P) + " W (absorbs, +)", "Source: P = −V I = −" + nf(P) + " W (delivers)", "Sum of powers = 0 ✓", "Also P = I² R = " + nf(I * I * v.R) + " W and V² / R = " + nf(v.V * v.V / v.R) + " W"]; },
    look: ["The glow follows P. Double V and P grows four times for the same R.", "In the reference direction the source power is negative. It gives energy.", "P = V I = I² R = V² / R. All three give the same number."],
    tryit: [["V = 12 V and R = 4 Ω. What is P?", "I = 3 A. P = 36 W."], ["V is doubled with R fixed. What happens to P?", "P becomes 4 times larger."]] },
  { t: "Real voltage source", d: "A real source has an internal resistance Rs. The terminal voltage falls as the load current grows.",
    ctl: [{ id: "E", label: "E", min: 2, max: 12, step: 1, val: 10, unit: "V" }, { id: "rs", label: "Rs", min: 0, max: 5, step: 0.5, val: 1, unit: "Ω" }, { id: "rl", label: "RL", min: 1, max: 20, step: 1, val: 4, unit: "Ω" }],
    I: function(v){ return v.E / (v.rs + v.rl); },
    spd: function(v){ return [spd1(this.I(v))]; },
    draw: function(v, ph){
      var I = this.I(v), Vt = I * v.rl, x0 = 300, y0 = 220, gx = 150, gy = 160, o = "", k;
      var imax = Math.min(12, v.rs ? v.E / v.rs : 12), pts = [[40, 128], [40, 55], [70, 55]];
      o += bat(40, 55, 205) + wr("40,55 60,55") + zig(60, 55, 120, 55) + wr("120,55 180,55 180,100") + zig(180, 100, 180, 160) + wr("180,160 180,205 40,205") + flow([[40, 110], [40, 55], [180, 55], [180, 205], [40, 205], [40, 140]], ph[0], "c") + tx(90, 42, "Rs " + v.rs + " Ω") + tx(168, 135, "RL " + v.rl + " Ω", "end") + tx(56, 135, "E", "start");
      for (k = 0; k <= 12; k += 4) o += '<line class="gr" x1="' + (x0 + gx * k / 12) + '" y1="' + y0 + '" x2="' + (x0 + gx * k / 12) + '" y2="' + (y0 - gy) + '"/>' + tx(x0 + gx * k / 12, y0 + 16, k) + '<line class="gr" x1="' + x0 + '" y1="' + (y0 - gy * k / 12) + '" x2="' + (x0 + gx) + '" y2="' + (y0 - gy * k / 12) + '"/>' + tx(x0 - 6, y0 - gy * k / 12 + 4, k, "end");
      o += '<line class="axis2" x1="' + x0 + '" y1="' + y0 + '" x2="' + (x0 + gx) + '" y2="' + y0 + '"/><line class="axis2" x1="' + x0 + '" y1="' + y0 + '" x2="' + x0 + '" y2="' + (y0 - gy) + '"/>' + '<line class="line" x1="' + x0 + '" y1="' + (y0 - gy * v.E / 12) + '" x2="' + (x0 + gx * imax / 12) + '" y2="' + (y0 - gy * Math.max(0, v.E - v.rs * imax) / 12) + '"/>' + '<circle class="pt" cx="' + (x0 + gx * I / 12) + '" cy="' + (y0 - gy * Vt / 12) + '" r="6"/>' + tx(x0 + gx / 2, 252, "load current I (A)") + tx(x0 + 20, 36, "terminal voltage V (V)");
      return o;
    },
    out: function(v){ var I = this.I(v); return ["I = E / (Rs + RL) = " + nf(I) + " A", "V = E − I Rs = " + nf(v.E - I * v.rs) + " V", "V across RL = I RL = " + nf(I * v.rl) + " V"]; },
    look: ["With Rs = 0 the line is flat. That is the ideal source.", "A smaller RL draws more current. V falls along the line.", "The line meets the V axis at E and the I axis at E / Rs."],
    tryit: [["E = 10 V, Rs = 1 Ω, RL = 4 Ω. What is V?", "I = 2 A. V = 10 − 2 × 1 = 8 V."], ["Which Rs makes a source ideal?", "Rs = 0 Ω."]] }
];

// ===== Chapter 3 =====
SIMS["3"] = [
  { t: "Series circuit and the voltage divider", d: "The same current runs through every resistor. The source voltage is shared in proportion to R.",
    ctl: [{ id: "E", label: "E", min: 2, max: 12, step: 1, val: 12, unit: "V" }, { id: "r1", label: "R₁", min: 1, max: 12, step: 1, val: 2, unit: "Ω" }, { id: "r2", label: "R₂", min: 1, max: 12, step: 1, val: 4, unit: "Ω" }, { id: "r3", label: "R₃", min: 1, max: 12, step: 1, val: 6, unit: "Ω" }],
    RT: function(v){ return v.r1 + v.r2 + v.r3; },
    spd: function(v){ return [spd1(v.E / this.RT(v))]; },
    draw: function(v, ph){
      var RT = this.RT(v), I = v.E / RT, V = [I * v.r1, I * v.r2, I * v.r3], o = "", x = 50, cl = ["#cfe5f6", "#ffe3a1", "#cdebd6"], i, rs = [v.r1, v.r2, v.r3];
      o += bat(50, 50, 170) + wr("50,50 100,50") + zig(100, 50, 170, 50) + wr("170,50 200,50") + zig(200, 50, 270, 50) + wr("270,50 300,50") + zig(300, 50, 370, 50) + wr("370,50 430,50 430,170 50,170") + flow([[50, 100], [50, 50], [430, 50], [430, 170], [50, 170], [50, 120]], ph[0], "c");
      for (i = 0; i < 3; i++){ o += tx(135 + i * 100, 34, "R" + (i + 1) + " = " + rs[i] + " Ω") + tx(135 + i * 100, 76, "V" + (i + 1) + " = " + nf(V[i]) + " V", "middle", "mut"); }
      var bx = 50, bw = 380; for (i = 0; i < 3; i++){ var w = bw * V[i] / v.E; o += '<rect x="' + bx.toFixed(1) + '" y="206" width="' + w.toFixed(1) + '" height="30" fill="' + cl[i] + '" stroke="#0c2238"/>' + (w > 50 ? tx(bx + w / 2, 226, "V" + (i + 1) + " " + nf(V[i]) + " V") : ""); bx += w; }
      return o + tx(240, 198, "E = " + v.E + " V is shared in proportion to R");
    },
    out: function(v){ var RT = this.RT(v), I = v.E / RT; return ["RT = R₁ + R₂ + R₃ = " + RT + " Ω", "I = E / RT = " + nf(I) + " A", "V₁ = E R₁ / RT = " + nf(v.E * v.r1 / RT) + " V", "V₂ = E R₂ / RT = " + nf(v.E * v.r2 / RT) + " V", "V₃ = E R₃ / RT = " + nf(v.E * v.r3 / RT) + " V"]; },
    look: ["One current for the whole loop. The dots move at one speed everywhere.", "The coloured bar splits E. A bigger R gets a bigger share.", "Add resistance in series and the current falls."],
    tryit: [["E = 12 V, R₁ = 2, R₂ = 4, R₃ = 6 Ω. What is V₃?", "RT = 12 Ω, I = 1 A, V₃ = 6 V."], ["Make R₃ very large. Where does most of E appear?", "Across R₃."]] },
  { t: "Parallel circuit and the current divider", d: "Every branch has the same voltage. The total current splits. The smallest R takes the most current.",
    ctl: [{ id: "E", label: "E", min: 2, max: 12, step: 1, val: 12, unit: "V" }, { id: "r1", label: "R₁", min: 1, max: 12, step: 1, val: 4, unit: "Ω" }, { id: "r2", label: "R₂", min: 1, max: 12, step: 1, val: 6, unit: "Ω" }, { id: "r3", label: "R₃", min: 1, max: 12, step: 1, val: 12, unit: "Ω" }],
    Req: function(v){ return 1 / (1 / v.r1 + 1 / v.r2 + 1 / v.r3); },
    spd: function(v){ return [spd1(v.E / this.Req(v)), spd1(v.E / v.r1), spd1(v.E / v.r2), spd1(v.E / v.r3)]; },
    draw: function(v, ph){
      var xs = [170, 270, 370], rs = [v.r1, v.r2, v.r3], o = "", i, IT = v.E / this.Req(v);
      o += bat(60, 50, 200) + wr("60,50 370,50") + wr("60,200 370,200") + flow([[60, 105], [60, 50], [170, 50]], ph[0], "c", 40) + flow([[170, 200], [60, 200], [60, 135]], ph[0], "c", 40);
      for (i = 0; i < 3; i++){ o += wr(xs[i] + ",50 " + xs[i] + ",90") + zig(xs[i], 90, xs[i], 160) + wr(xs[i] + ",160 " + xs[i] + ",200") + '<circle class="nd" cx="' + xs[i] + '" cy="50" r="3.5"/><circle class="nd" cx="' + xs[i] + '" cy="200" r="3.5"/>' + flow([[xs[i], 50], [xs[i], 200]], ph[i + 1], "c", 30) + tx(xs[i] + 14, 128, "R" + (i + 1) + " " + rs[i] + " Ω", "start") + tx(xs[i], 232, "I" + (i + 1) + " = " + nf(v.E / rs[i]) + " A"); }
      return o + tx(40, 128, "E", "end") + tx(110, 36, "IT = " + nf(IT) + " A");
    },
    out: function(v){ var Rq = this.Req(v), IT = v.E / Rq; return ["Req = 1 / (1/R₁ + 1/R₂ + 1/R₃) = " + nf(Rq) + " Ω", "IT = E / Req = " + nf(IT) + " A", "I₁ + I₂ + I₃ = " + nf(v.E / v.r1 + v.E / v.r2 + v.E / v.r3) + " A = IT ✓", "Req is smaller than the smallest R."]; },
    look: ["The branch with the smallest R has the fastest dots.", "The total current is the sum of the branch currents.", "Adding a branch lowers Req. It never raises it."],
    tryit: [["R₁ = R₂ = 6 Ω in parallel. What is Req?", "Req = 3 Ω."], ["E = 12 V, R₁ = 4 Ω. What is I₁?", "I₁ = 3 A."]] },
  { t: "R₁ in series with R₂ ∥ R₃", d: "Reduce the parallel part first, then add R₁. Then work back to find each current.",
    ctl: [{ id: "E", label: "E", min: 2, max: 12, step: 1, val: 12, unit: "V" }, { id: "r1", label: "R₁", min: 1, max: 12, step: 1, val: 2, unit: "Ω" }, { id: "r2", label: "R₂", min: 1, max: 12, step: 1, val: 6, unit: "Ω" }, { id: "r3", label: "R₃", min: 1, max: 12, step: 1, val: 3, unit: "Ω" }],
    Rp: function(v){ return v.r2 * v.r3 / (v.r2 + v.r3); },
    IT: function(v){ return v.E / (v.r1 + this.Rp(v)); },
    spd: function(v){ var I = this.IT(v), Vp = I * this.Rp(v); return [spd1(I), spd1(Vp / v.r2), spd1(Vp / v.r3)]; },
    draw: function(v, ph){
      var I = this.IT(v), Vp = I * this.Rp(v), o = "";
      o += bat(50, 50, 200) + wr("50,50 100,50") + zig(100, 50, 190, 50) + wr("190,50 300,50 400,50") + wr("50,200 400,200") + flow([[50, 105], [50, 50], [300, 50]], ph[0], "c", 40) + flow([[300, 200], [50, 200], [50, 135]], ph[0], "c", 40);
      [300, 400].forEach(function(x, i){ o += wr(x + ",50 " + x + ",95") + zig(x, 95, x, 160) + wr(x + ",160 " + x + ",200") + '<circle class="nd" cx="' + x + '" cy="50" r="3.5"/><circle class="nd" cx="' + x + '" cy="200" r="3.5"/>' + flow([[x, 50], [x, 200]], ph[i + 1], "c", 30) + tx(x + 14, 132, "R" + (i + 2) + " " + (i ? v.r3 : v.r2) + " Ω", "start") + tx(x, 232, "I" + (i + 2) + " = " + nf(Vp / (i ? v.r3 : v.r2)) + " A"); });
      return o + tx(145, 36, "R₁ = " + v.r1 + " Ω") + tx(145, 74, "V₁ = " + nf(I * v.r1) + " V", "middle", "mut") + tx(350, 36, "Vp = " + nf(Vp) + " V", "middle", "mut") + tx(30, 128, "E", "end");
    },
    out: function(v){ var Rp = this.Rp(v), I = this.IT(v); return ["Rp = R₂ R₃ / (R₂ + R₃) = " + nf(Rp) + " Ω", "RT = R₁ + Rp = " + nf(v.r1 + Rp) + " Ω", "IT = E / RT = " + nf(I) + " A", "Vp = IT Rp = " + nf(I * Rp) + " V", "I₂ = Vp / R₂ = " + nf(I * Rp / v.r2) + " A, I₃ = " + nf(I * Rp / v.r3) + " A"]; },
    look: ["IT flows through R₁ and then splits at the node.", "The parallel pair has one voltage Vp across both resistors.", "I₂ + I₃ = IT. Check it every time."],
    tryit: [["R₂ = R₃ = 6 Ω, R₁ = 2 Ω, E = 10 V. What is IT?", "Rp = 3 Ω, RT = 5 Ω, IT = 2 A."], ["Raise R₃ a lot. What happens to I₂?", "I₂ approaches IT, since R₃ carries almost nothing."]] },
  { t: "Equivalent resistance builder", d: "Add equal resistors in series or in parallel and watch Req and the total current.",
    ctl: [{ id: "n", label: "Number n", min: 1, max: 6, step: 1, val: 3, unit: "" }, { id: "R", label: "Each R", min: 1, max: 12, step: 1, val: 6, unit: "Ω" }, { id: "m", type: "sw", label: "Connection", opts: ["Series", "Parallel"], val: 0 }],
    Req: function(v){ return v.m ? v.R / v.n : v.R * v.n; },
    spd: function(v){ return [spd1(12 / this.Req(v)), v.m ? spd1(12 / v.R) : 0]; },
    draw: function(v, ph){
      var o = "", i, n = v.n;
      if (!v.m){
        o += bat(40, 60, 190) + wr("40,60 60,60") + wr("430,60 430,190 40,190");
        var x = 60, w = 370 / n;
        for (i = 0; i < n; i++){ o += zig(x + 8, 60, x + w - 8, 60) + wr(x + "," + 60 + " " + (x + 8) + ",60") + wr((x + w - 8) + ",60 " + (x + w) + ",60"); x += w; }
        o += flow([[40, 110], [40, 60], [430, 60], [430, 190], [40, 190], [40, 140]], ph[0], "c");
      } else {
        o += bat(40, 50, 200) + wr("40,50 440,50") + wr("40,200 440,200") + flow([[40, 105], [40, 50], [120, 50]], ph[0], "c", 40) + flow([[120, 200], [40, 200], [40, 135]], ph[0], "c", 40);
        var sp = 300 / n;
        for (i = 0; i < n; i++){ var xx = 120 + sp * (i + 0.5); o += wr(xx + ",50 " + xx + ",95") + zig(xx, 95, xx, 155) + wr(xx + ",155 " + xx + ",200") + '<circle class="nd" cx="' + xx + '" cy="50" r="3.5"/><circle class="nd" cx="' + xx + '" cy="200" r="3.5"/>' + flow([[xx, 50], [xx, 200]], ph[1], "c", 30); }
      }
      return o + tx(240, 238, "E = 12 V, each R = " + v.R + " Ω", "middle") + (v.m ? "" : tx(240, 44, v.n + " resistors in series", "middle", "mut"));
    },
    out: function(v){ var Rq = this.Req(v); return v.m ? ["Parallel: Req = R / n = " + v.R + " / " + v.n + " = " + nf(Rq) + " Ω", "IT = 12 V / " + nf(Rq) + " Ω = " + nf(12 / Rq) + " A", "Each branch: " + nf(12 / v.R) + " A"] : ["Series: Req = n R = " + v.n + " × " + v.R + " = " + nf(Rq) + " Ω", "I = 12 V / " + nf(Rq) + " Ω = " + nf(12 / Rq) + " A", "Each resistor: V = " + nf(12 / v.n) + " V"]; },
    look: ["Series: more resistors give a larger Req and a slower current.", "Parallel: more resistors give a smaller Req and a larger total current.", "Equal resistors share the voltage (series) or the current (parallel) equally."],
    tryit: [["Four 8 Ω resistors in parallel. What is Req?", "Req = 8 / 4 = 2 Ω."], ["Four 8 Ω resistors in series. What is Req?", "Req = 32 Ω."]] }
];

// ===== Chapter 4 =====
SIMS["4"] = [
  { t: "Source conversion", d: "A voltage source E in series with Rs gives the same load voltage and current as a current source Is = E / Rs in parallel with Rs.",
    ctl: [{ id: "E", label: "E", min: 2, max: 24, step: 1, val: 12, unit: "V" }, { id: "rs", label: "Rs", min: 1, max: 10, step: 1, val: 4, unit: "Ω" }, { id: "rl", label: "RL", min: 1, max: 20, step: 1, val: 6, unit: "Ω" }],
    IL: function(v){ return v.E / (v.rs + v.rl); },
    spd: function(v){ var Is = v.E / v.rs, IL = this.IL(v); return [spd1(IL), spd1(Is), spd1(Is - IL), spd1(IL)]; },
    draw: function(v, ph){
      var Is = v.E / v.rs, IL = this.IL(v), o = "";
      o += bat(30, 70, 210) + wr("30,70 60,70") + zig(60, 70, 130, 70) + wr("130,70 190,70 190,110") + zig(190, 110, 190, 170) + wr("190,170 190,210 30,210") + flow([[30, 115], [30, 70], [190, 70], [190, 210], [30, 210], [30, 145]], ph[0], "c") + tx(95, 56, "Rs " + v.rs + " Ω") + tx(176, 144, "RL " + v.rl, "end") + tx(46, 148, "E", "start");
      o += wr("270,70 420,70") + wr("270,210 420,210") + '<circle class="srcc" cx="270" cy="140" r="22"/><line class="ar c" x1="270" y1="152" x2="270" y2="128"/><polygon class="arh c" points="270,126 265,137 275,137"/>' + wr("270,70 270,118") + wr("270,162 270,210") + flow([[270, 210], [270, 70]], ph[1], "c", 40);
      o += wr("340,70 340,110") + zig(340, 110, 340, 170) + wr("340,170 340,210") + flow([[340, 70], [340, 210]], ph[2], "c", 40) + wr("420,70 420,110") + zig(420, 110, 420, 170) + wr("420,170 420,210") + flow([[420, 70], [420, 210]], ph[3], "c", 40);
      o += '<circle class="nd" cx="340" cy="70" r="3.5"/><circle class="nd" cx="340" cy="210" r="3.5"/>' + tx(246, 144, "Is", "end") + tx(354, 144, "Rs", "start") + tx(406, 144, "RL", "end") + tx(110, 240, "voltage source") + tx(345, 240, "current source Is = " + nf(Is) + " A");
      return o;
    },
    out: function(v){ var Is = v.E / v.rs, IL = this.IL(v); return ["Is = E / Rs = " + v.E + " / " + v.rs + " = " + nf(Is) + " A", "Left: IL = E / (Rs + RL) = " + nf(IL) + " A", "Right: IL = Is Rs / (Rs + RL) = " + nf(Is * v.rs / (v.rs + v.rl)) + " A", "VL = IL RL = " + nf(IL * v.rl) + " V in both"]; },
    look: ["The load sees the same current and voltage in both circuits.", "Inside the sources the currents differ. Only the outside is equal.", "Rs keeps its value. Only its place changes: series or parallel."],
    tryit: [["E = 10 V, Rs = 5 Ω. What is Is?", "Is = 2 A, with Rs = 5 Ω in parallel."], ["A 3 A source has Rs = 4 Ω in parallel. What is E?", "E = 12 V, with Rs = 4 Ω in series."]] },
  { t: "Sources in series", d: "Voltage sources in series add. The polarity decides the sign. A negative total reverses the current.",
    ctl: [{ id: "e1", label: "E₁", min: 1, max: 12, step: 1, val: 10, unit: "V" }, { id: "e2", label: "E₂", min: 1, max: 12, step: 1, val: 4, unit: "V" }, { id: "p", type: "sw", label: "E₂ polarity", opts: ["Aiding E₁", "Opposing E₁"], val: 0 }, { id: "R", label: "R", min: 1, max: 10, step: 1, val: 4, unit: "Ω" }],
    ET: function(v){ return v.p ? v.e1 - v.e2 : v.e1 + v.e2; },
    spd: function(v){ return [spd1(this.ET(v) / v.R)]; },
    draw: function(v, ph){
      var I = this.ET(v) / v.R, o = "";
      o += bat(60, 50, 120) + (v.p ? '' : '') + (v.p ? flipBat(60, 120, 210) : bat(60, 120, 210)) + wr("60,50 400,50 400,100") + zig(400, 100, 400, 160) + wr("400,160 400,210 60,210") + flow([[60, 80], [60, 50], [400, 50], [400, 210], [60, 210], [60, 190]], ph[0], I ? "c" : "off") + tx(84, 92, "E₁ = " + v.e1 + " V", "start") + tx(84, 168, "E₂ = " + v.e2 + " V", "start") + tx(384, 134, "R = " + v.R + " Ω", "end") + tx(240, 128, "ET = " + sgn(this.ET(v)) + " V", "middle", "big");
      return o;
    },
    out: function(v){ var ET = this.ET(v), I = ET / v.R; return [v.p ? "ET = E₁ − E₂ = " + v.e1 + " − " + v.e2 + " = " + sgn(ET) + " V" : "ET = E₁ + E₂ = " + v.e1 + " + " + v.e2 + " = " + nf(ET) + " V", "I = ET / R = " + sgn(I) + " A" + (I < 0 ? " (real flow is opposite to the arrow)" : ""), "Current sources in parallel add the same way: IT = I₁ ± I₂."]; },
    look: ["Same polarity: the voltages add. Opposite polarity: they subtract.", "If E₂ is larger and opposes E₁, ET turns negative and the dots reverse.", "Only the net voltage drives the current."],
    tryit: [["E₁ = 6 V and E₂ = 6 V opposing. What is I?", "ET = 0, so I = 0."], ["E₁ = 3 V and E₂ = 8 V opposing, R = 5 Ω. What is I?", "ET = −5 V, I = −1 A."]] },
  { t: "Branch current analysis", d: "Three branches, three unknown currents. KCL gives one equation. KVL on two meshes gives two more.",
    ctl: [{ id: "e1", label: "E₁", min: 0, max: 20, step: 1, val: 12, unit: "V" }, { id: "e2", label: "E₂", min: 0, max: 20, step: 1, val: 6, unit: "V" }, { id: "r1", label: "R₁", min: 1, max: 10, step: 1, val: 2, unit: "Ω" }, { id: "r2", label: "R₂", min: 1, max: 10, step: 1, val: 3, unit: "Ω" }, { id: "r3", label: "R₃", min: 1, max: 10, step: 1, val: 4, unit: "Ω" }],
    sol: function(v){ var D = (v.r1 + v.r3) * (v.r2 + v.r3) - v.r3 * v.r3, i1 = (v.e1 * (v.r2 + v.r3) - v.e2 * v.r3) / D, i2 = ((v.r1 + v.r3) * v.e2 - v.r3 * v.e1) / D; return [i1, i2, i1 + i2]; },
    spd: function(v){ var s = this.sol(v); return [spd1(s[0]), spd1(s[1]), spd1(s[2])]; },
    draw: function(v, ph){
      var s = this.sol(v), o = "";
      o += wr("90,40 390,40") + wr("90,220 390,220") + wr("90,40 90,55") + zig(90, 55, 90, 105) + wr("90,105 90,125") + bat(90, 125, 185) + wr("90,185 90,220") + wr("390,40 390,55") + zig(390, 55, 390, 105) + wr("390,105 390,125") + bat(390, 125, 185) + wr("390,185 390,220") + wr("240,40 240,100") + zig(240, 100, 240, 160) + wr("240,160 240,220") + '<circle class="nd" cx="240" cy="40" r="4"/><circle class="nd" cx="240" cy="220" r="4"/>';
      o += flow([[240, 220], [90, 220], [90, 40], [240, 40]], ph[0], "c", 36) + flow([[240, 220], [390, 220], [390, 40], [240, 40]], ph[1], "d", 36) + flow([[240, 40], [240, 220]], ph[2], "g", 30);
      o += tx(118, 160, "E₁ " + v.e1 + " V", "start") + tx(362, 160, "E₂ " + v.e2 + " V", "end") + tx(80, 84, "R₁ " + v.r1 + " Ω", "end") + tx(402, 84, "R₂ " + v.r2 + " Ω", "start") + tx(255, 134, "R₃ " + v.r3 + " Ω", "start") + tx(165, 30, "I₁ → " + sgn(s[0]) + " A") + tx(315, 30, "← I₂ " + sgn(s[1]) + " A") + tx(255, 80, "I₃ ↓ " + sgn(s[2]) + " A", "start");
      return o;
    },
    out: function(v){ var s = this.sol(v), e1 = v.e1 - s[0] * v.r1 - s[2] * v.r3, e2 = v.e2 - s[1] * v.r2 - s[2] * v.r3; return ["KCL: I₃ = I₁ + I₂", "KVL left: E₁ = I₁ R₁ + I₃ R₃", "KVL right: E₂ = I₂ R₂ + I₃ R₃", "I₁ = " + sgn(s[0]) + " A, I₂ = " + sgn(s[1]) + " A, I₃ = " + sgn(s[2]) + " A", "Check left: " + nf(v.e1) + " = " + nf(s[0] * v.r1 + s[2] * v.r3) + " ✓", "A negative answer means the real current is opposite to the arrow."]; },
    look: ["I₃ is always the sum of I₁ and I₂ at the top node.", "Raise E₂ until I₁ turns negative. The dots in that branch reverse.", "Every answer can be checked with a KVL loop."],
    tryit: [["Set E₂ = 0. Which way does I₂ flow?", "I₂ is negative. Current enters the E₂ branch from the top node."], ["R₃ is made very large. What happens to I₃?", "I₃ approaches zero."]] }
];
function flipBat(x, yt, yb){ var m = (yt + yb) / 2; return wr(x + "," + yt + " " + x + "," + (m - 5)) + wr(x + "," + (m + 5) + " " + x + "," + yb) + '<line class="w thick" x1="' + (x - 8) + '" y1="' + (m - 5) + '" x2="' + (x + 8) + '" y2="' + (m - 5) + '"/><line class="w" x1="' + (x - 15) + '" y1="' + (m + 5) + '" x2="' + (x + 15) + '" y2="' + (m + 5) + '"/>' + tx(x + 24, m - 8, "−", "start") + tx(x + 24, m + 16, "+", "start"); }

// ---------- player ----------
var WSIM = {}, SIMTOK = 0, SIMPLAY = true, WHOST = null;
function WH(){ return WHOST || WH(); }
function simDefaults(sim){ var v = {}; sim.ctl.forEach(function(c){ v[c.id] = c.val; }); return v; }
function rWatch(){
  var list = SIMS[S.ch], st = WSIM[S.ch] || (WSIM[S.ch] = { k: 0 }), sim = list[st.k], tok = ++SIMTOK, v = st.v && st.k === st.vk ? st.v : (st.v = simDefaults(sim)); st.vk = st.k;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches; if (reduce && !st.touched) SIMPLAY = false;
  var chips = list.map(function(s, i){ return '<button class="pill" data-sim="' + i + '" aria-pressed="' + (i === st.k) + '">' + s.t + "</button>"; }).join("");
  var ctl = sim.ctl.map(function(c){
    if (c.type === "sw") return '<div class="ctl"><span class="lbl">' + c.label + '</span><div class="seg">' + c.opts.map(function(o, i){ return '<button data-c="' + c.id + '" data-o="' + i + '" aria-pressed="' + (v[c.id] === i) + '">' + o + "</button>"; }).join("") + "</div></div>";
    if (c.type === "sel") return '<div class="ctl"><label class="lbl" for="c_' + c.id + '">' + c.label + '</label><select id="c_' + c.id + '" data-c="' + c.id + '">' + c.opts.map(function(o, i){ return '<option value="' + i + '"' + (v[c.id] === i ? " selected" : "") + ">" + o + "</option>"; }).join("") + "</select></div>";
    return '<div class="ctl"><label class="lbl" for="c_' + c.id + '">' + sbs(c.label) + ' <b id="cv_' + c.id + '">' + v[c.id] + " " + c.unit + '</b></label><input type="range" id="c_' + c.id + '" data-c="' + c.id + '" min="' + c.min + '" max="' + c.max + '" step="' + c.step + '" value="' + v[c.id] + '"></div>';
  }).join("");
  WH().innerHTML = '<div class="simpick">' + chips + '</div><section class="card sim"><p class="mut simdesc">' + sbs(sim.d) + '</p><div class="simgrid"><div class="simfig"><svg id="simsvg" viewBox="0 0 480 262" role="img" aria-label="' + sim.t + '" data-tok="' + tok + '"></svg><button class="btn sm ghost" id="simplay">' + (SIMPLAY ? "Pause" : "Play") + '</button></div><div class="simctl">' + ctl + '<div class="sol" id="simout" aria-live="polite"></div></div></div></section>' +
    '<div class="grid2"><section class="card"><h2 class="sh">What to notice</h2><ul class="notice">' + sim.look.map(function(x){ return "<li>" + sbs(x) + "</li>"; }).join("") + '</ul></section><section class="card"><h2 class="sh">Try this</h2>' + sim.tryit.map(function(q){ return '<details class="try"><summary>' + sbs(q[0]) + "</summary><p>" + sbs(q[1]) + "</p></details>"; }).join("") + "</section></div>";
  function outs(){ $("simout").innerHTML = sim.out(v).map(function(l){ return "<div>" + sbs(l) + "</div>"; }).join(""); }
  outs();
  var ph = sim.spd(v).map(function(){ return 0; }), last = performance.now();
  function frame(now){
    var el = $("simsvg"); if (!el || +el.dataset.tok !== SIMTOK) return;
    var dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (SIMPLAY){ var sp = sim.spd(v); for (var i = 0; i < sp.length; i++) ph[i] += sp[i] * dt; }
    el.innerHTML = sim.draw(v, ph); requestAnimationFrame(frame);
  }
  frame(performance.now());
  WH().querySelectorAll("[data-sim]").forEach(function(b){ b.onclick = function(){ st.k = +b.dataset.sim; rWatch(); }; });
  $("simplay").onclick = function(){ SIMPLAY = !SIMPLAY; st.touched = true; this.textContent = SIMPLAY ? "Pause" : "Play"; };
  WH().querySelectorAll("input[data-c]").forEach(function(inp){ inp.oninput = function(){ v[inp.dataset.c] = +inp.value; var c = sim.ctl.filter(function(x){ return x.id === inp.dataset.c; })[0]; $("cv_" + c.id).textContent = inp.value + " " + c.unit; outs(); }; });
  WH().querySelectorAll("select[data-c]").forEach(function(sel){ sel.onchange = function(){ v[sel.dataset.c] = +sel.value; outs(); }; });
  WH().querySelectorAll("button[data-o]").forEach(function(b){ b.onclick = function(){ v[b.dataset.c] = +b.dataset.o; rWatch(); }; });
}
