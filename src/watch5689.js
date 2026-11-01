// ===== Watch tab: chapters 5, 6, 8 and 9 =====
function vec(x1, y1, x2, y2, cls){
  var dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy); if (L < 1) return "";
  var ux = dx / L, uy = dy / L, h = Math.min(10, L * 0.5), bx = x2 - ux * h, by = y2 - uy * h, nx = -uy * h * 0.42, ny = ux * h * 0.42;
  return '<line class="ar ' + (cls || "") + '" x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + bx.toFixed(1) + '" y2="' + by.toFixed(1) + '"/><polygon class="arh ' + (cls || "") + '" points="' + x2.toFixed(1) + "," + y2.toFixed(1) + " " + (bx + nx).toFixed(1) + "," + (by + ny).toFixed(1) + " " + (bx - nx).toFixed(1) + "," + (by - ny).toFixed(1) + '"/>';
}
function coilH(x1, x2, y){
  var n = 4, w = (x2 - x1 - 16) / n, d = "M" + x1 + " " + y + " L" + (x1 + 8) + " " + y, i;
  for (i = 0; i < n; i++) d += " a" + (w / 2).toFixed(1) + " " + (w / 2).toFixed(1) + " 0 0 1 " + w.toFixed(1) + " 0";
  d += " L" + x2 + " " + y;
  return '<path class="w" d="' + d + '"/>';
}
function capH(x, y){ return wr((x - 20) + "," + y + " " + (x - 4) + "," + y) + wr((x + 4) + "," + y + " " + (x + 20) + "," + y) + '<line class="w thick" x1="' + (x - 4) + '" y1="' + (y - 14) + '" x2="' + (x - 4) + '" y2="' + (y + 14) + '"/><line class="w thick" x1="' + (x + 4) + '" y1="' + (y - 14) + '" x2="' + (x + 4) + '" y2="' + (y + 14) + '"/>'; }
function capV(x, y){ return wr(x + "," + (y - 20) + " " + x + "," + (y - 4)) + wr(x + "," + (y + 4) + " " + x + "," + (y + 20)) + '<line class="w thick" x1="' + (x - 14) + '" y1="' + (y - 4) + '" x2="' + (x + 14) + '" y2="' + (y - 4) + '"/><line class="w thick" x1="' + (x - 14) + '" y1="' + (y + 4) + '" x2="' + (x + 14) + '" y2="' + (y + 4) + '"/>'; }
function acsrc(x, y){ return '<circle class="srcc" cx="' + x + '" cy="' + y + '" r="16"/><path class="w" d="M' + (x - 9) + " " + y + " q4.5 -10 9 0 t9 0" + '"/>'; }
function poly(pts, cls){ return '<polyline class="' + cls + '" points="' + pts.map(function(p){ return p[0].toFixed(1) + "," + p[1].toFixed(1); }).join(" ") + '"/>'; }
function rad(d){ return d * Math.PI / 180; }

// ---------- Chapter 5 ----------
SIMS["5"] = [
  { t: "Thevenin equivalent", d: "The network on the left and the Thevenin circuit on the right give the same load current. Change any resistor and watch V_TH and R_TH follow.",
    ctl: [{ id: "E", label: "E", min: 12, max: 60, step: 6, val: 48, unit: "V" }, { id: "r1", label: "R₁", min: 2, max: 20, step: 2, val: 12, unit: "Ω" }, { id: "r2", label: "R₂", min: 2, max: 20, step: 2, val: 12, unit: "Ω" }, { id: "r3", label: "R₃", min: 2, max: 20, step: 2, val: 12, unit: "Ω" }, { id: "rl", label: "R_L", min: 2, max: 30, step: 2, val: 8, unit: "Ω" }],
    eq: function(v){ var p23 = v.r2 * v.r3 / (v.r2 + v.r3), VT = v.E * p23 / (v.r1 + p23), RT = 1 / (1 / v.r1 + 1 / v.r2 + 1 / v.r3); return { VT: VT, RT: RT, IL: VT / (RT + v.rl), IN: VT / RT }; },
    spd: function(v){ var q = this.eq(v); return [spd1(q.IL), spd1(q.IL)]; },
    draw: function(v, ph){
      var q = this.eq(v), o = "";
      o += bat(30, 60, 210) + wr("30,60 60,60") + zig(60, 60, 130, 60) + wr("130,60 275,60") + wr("30,210 275,210");
      [170, 225, 275].forEach(function(x){ o += wr(x + ",60 " + x + ",110") + zig(x, 110, x, 170) + wr(x + ",170 " + x + ",210"); });
      o += '<circle class="nd" cx="170" cy="60" r="3.5"/><circle class="nd" cx="170" cy="210" r="3.5"/><circle class="nd" cx="225" cy="60" r="3.5"/><circle class="nd" cx="225" cy="210" r="3.5"/>';
      o += flow([[275, 60], [275, 210]], ph[0], "c", 34) + tx(95, 46, "R₁ " + v.r1) + tx(170, 100, "R₂") + tx(170, 190, v.r2) + tx(225, 100, "R₃") + tx(225, 190, v.r3) + tx(275, 100, "R_L") + tx(275, 190, v.rl) + tx(30, 232, "E " + v.E) + tx(288, 56, "a", "start") + tx(288, 214, "b", "start") + tx(150, 252, "original network");
      o += bat(350, 60, 210) + wr("350,60 380,60") + zig(380, 60, 440, 60) + wr("440,60 455,60 455,110") + zig(455, 110, 455, 170) + wr("455,170 455,210 350,210");
      o += flow([[350, 125], [350, 60], [455, 60], [455, 210], [350, 210], [350, 145]], ph[1], "c") + tx(410, 46, "R_TH " + nf(q.RT)) + tx(440, 144, "R_L " + v.rl, "end") + tx(350, 232, "V_TH " + nf(q.VT)) + tx(410, 252, "Thevenin equivalent");
      return o;
    },
    out: function(v){ var q = this.eq(v); return ["R_TH = R₁ // R₂ // R₃ = " + nf(q.RT) + " Ω", "V_TH = E (R₂ // R₃) / (R₁ + R₂ // R₃) = " + nf(q.VT) + " V", "I_L = V_TH / (R_TH + R_L) = " + nf(q.IL, 3) + " A", "Norton: I_N = V_TH / R_TH = " + nf(q.IN, 3) + " A"]; },
    look: ["The load current is the same in both circuits.", "R_L has no effect on V_TH or R_TH. They belong to the network.", "Make R₁ larger and V_TH falls, because R₁ drops more of E."],
    tryit: [["Set R₁ = R₂ = R₃ = 12 Ω and E = 48 V. What are V_TH and R_TH?", "V_TH = 16 V and R_TH = 4 Ω (Example 5.4)."], ["Raise R_L to 30 Ω. What happens to V_TH?", "Nothing. V_TH is found with the load removed."]] },
  { t: "Maximum power transfer", d: "The load power depends on R_L. It peaks when R_L equals R_TH.",
    ctl: [{ id: "V", label: "V_TH", min: 6, max: 30, step: 2, val: 16, unit: "V" }, { id: "rt", label: "R_TH", min: 1, max: 10, step: 1, val: 4, unit: "Ω" }, { id: "rl", label: "R_L", min: 1, max: 20, step: 1, val: 8, unit: "Ω" }],
    PL: function(v, R){ return v.V * v.V * R / Math.pow(v.rt + R, 2); },
    spd: function(v){ return [spd1(v.V / (v.rt + v.rl))]; },
    draw: function(v, ph){
      var Pm = v.V * v.V / (4 * v.rt), x0 = 270, y0 = 215, gx = 190, gy = 150, pts = [], R, o = "", i;
      for (R = 0; R <= 20.01; R += 0.5) pts.push([x0 + gx * R / 20, y0 - gy * Math.min(1.12, this.PL(v, R) / Pm) / 1.12]);
      o += bat(40, 60, 210) + wr("40,60 90,60") + zig(90, 60, 160, 60) + wr("160,60 200,60 200,110") + zig(200, 110, 200, 170) + wr("200,170 200,210 40,210") + flow([[40, 125], [40, 60], [200, 60], [200, 210], [40, 210], [40, 145]], ph[0], "c");
      o += tx(125, 46, "R_TH " + v.rt) + tx(190, 144, "R_L " + v.rl, "end") + tx(40, 232, "V_TH " + v.V);
      for (i = 0; i <= 20; i += 5) o += '<line class="gr" x1="' + (x0 + gx * i / 20) + '" y1="' + y0 + '" x2="' + (x0 + gx * i / 20) + '" y2="' + (y0 - gy) + '"/>' + tx(x0 + gx * i / 20, y0 + 16, i);
      o += '<line class="axis2" x1="' + x0 + '" y1="' + y0 + '" x2="' + (x0 + gx) + '" y2="' + y0 + '"/><line class="axis2" x1="' + x0 + '" y1="' + y0 + '" x2="' + x0 + '" y2="' + (y0 - gy) + '"/>' + poly(pts, "line");
      var px = x0 + gx * v.rl / 20, py = y0 - gy * Math.min(1.12, this.PL(v, v.rl) / Pm) / 1.12;
      o += '<line class="dash" x1="' + (x0 + gx * v.rt / 20) + '" y1="' + y0 + '" x2="' + (x0 + gx * v.rt / 20) + '" y2="' + (y0 - gy * 1 / 1.12) + '"/><circle class="nd big" cx="' + px.toFixed(1) + '" cy="' + py.toFixed(1) + '" r="5.5"/>' + tx(x0 + gx / 2, 250, "R_L (Ω)") + tx(x0 + 4, y0 - gy - 8, "P_L (W)", "start") + tx(x0 + gx * v.rt / 20 + 10, y0 - gy * 1 / 1.12 - 10, "R_L = R_TH", "start", "a");
      return o;
    },
    out: function(v){ var P = this.PL(v, v.rl), Pm = v.V * v.V / (4 * v.rt); return ["P_L = V_TH² R_L / (R_TH + R_L)² = " + nf(P, 3) + " W", "P_max = V_TH² / (4 R_TH) = " + nf(Pm, 3) + " W at R_L = " + v.rt + " Ω", "This load gets " + nf(100 * P / Pm, 3) + "% of P_max", "Efficiency = R_L / (R_TH + R_L) = " + nf(100 * v.rl / (v.rt + v.rl), 3) + "%"]; },
    look: ["The curve rises, peaks at R_L = R_TH and then falls.", "At the peak the efficiency is 50%.", "A larger R_TH lowers P_max."],
    tryit: [["V_TH = 16 V and R_TH = 4 Ω. Set R_L = 4 Ω. What is P_L?", "P_max = 16 W."], ["Set R_L = 1 Ω. Is P_L larger or smaller than P_max?", "Smaller: 10.2 W."]] },
  { t: "Superposition", d: "Example 5.1: E₁ and E₂ feed the middle resistor R₅. Each source alone gives a partial current I_c′ and I_c″. The two are added.",
    ctl: [{ id: "e1", label: "E₁", min: 0, max: 60, step: 6, val: 48, unit: "V" }, { id: "e2", label: "E₂", min: 0, max: 48, step: 6, val: 24, unit: "V" }],
    sol: function(v){ var rl = 16, rr = 16, r5 = 16, a = v.e1 / (rl + r5 * rr / (r5 + rr)) * rr / (rr + r5), b = v.e2 / (rr + r5 * rl / (r5 + rl)) * rl / (rl + r5); return [a, b, a + b]; },
    spd: function(v){ return [spd1(this.sol(v)[2] * 1.4)]; },
    draw: function(v, ph){
      var s = this.sol(v), o = "", sc = 70, x0 = 300, rows = [["I_c′ (E₁ alone)", s[0], "l3"], ["I_c″ (E₂ alone)", s[1], "l2"], ["I_c = I_c′ + I_c″", s[2], ""]], i;
      o += wr("40,40 240,40") + wr("40,220 240,220") + wr("40,40 40,52") + zig(40, 52, 40, 102) + bat(40, 112, 172) + wr("40,172 40,220") + wr("240,40 240,52") + zig(240, 52, 240, 102) + bat(240, 112, 172) + wr("240,172 240,220") + wr("140,40 140,100") + zig(140, 100, 140, 160) + wr("140,160 140,220");
      o += '<circle class="nd" cx="140" cy="40" r="3.5"/><circle class="nd" cx="140" cy="220" r="3.5"/>' + flow([[140, 40], [140, 220]], ph[0], "g", 32) + tx(52, 82, "R₁+R₂ 16", "start") + tx(228, 82, "R₃+R₄ 16", "end") + tx(150, 130, "R₅ 16", "start") + tx(70, 150, "E₁ " + v.e1, "start") + tx(212, 150, "E₂ " + v.e2, "end") + tx(140, 250, "current in R₅ = I_c");
      for (i = 0; i < 3; i++){
        var y = 62 + i * 62, w = s[i] * sc;
        o += tx(x0 + 6, y - 14, rows[i][0], "start", i === 2 ? "a" : "") + '<rect x="' + x0 + '" y="' + (y - 8) + '" width="' + Math.max(0, w).toFixed(1) + '" height="16" rx="3" fill="' + (i === 0 ? "#14803c" : i === 1 ? "#c0392b" : "#0b6bab") + '"/>' + tx(x0 + Math.max(0, w) + 6, y + 5, nf(s[i], 3) + " A", "start");
      }
      o += '<line class="axis2" x1="' + x0 + '" y1="40" x2="' + x0 + '" y2="205"/>';
      return o;
    },
    out: function(v){ var s = this.sol(v); return ["E₁ alone (E₂ shorted): I_c′ = " + nf(s[0], 3) + " A", "E₂ alone (E₁ shorted): I_c″ = " + nf(s[1], 3) + " A", "I_c = I_c′ + I_c″ = " + nf(s[2], 3) + " A", "R₁ = R₂ = R₃ = R₄ = 8 Ω, R₅ = 16 Ω (Example 5.1)"]; },
    look: ["The bars add up: the third bar is the sum of the first two.", "Set E₂ = 0. Only the first bar is left.", "Both partial currents flow the same way in R₅, so they add."],
    tryit: [["Example 5.1 uses E₁ = 48 V and E₂ = 24 V. What is I_c?", "I_c′ = 1 A, I_c″ = 0.5 A, so I_c = 1.5 A."], ["Why is superposition not used for power?", "Power depends on the square of the current, so it is not linear."]] }
];

// ---------- Chapter 6 ----------
SIMS["6"] = [
  { t: "What sets the capacitance", d: "C = 8.85×10⁻¹² k A / d. Larger plates and a better dielectric raise C. A wider gap lowers it.",
    ctl: [{ id: "A", label: "Plate area A", min: 20, max: 200, step: 20, val: 100, unit: "cm²" }, { id: "d", label: "Gap d", min: 1, max: 10, step: 1, val: 3, unit: "mm" }, { id: "k", label: "Dielectric k", min: 1, max: 10, step: 1, val: 5, unit: "" }, { id: "V", label: "V", min: 1, max: 50, step: 1, val: 10, unit: "V" }],
    C: function(v){ return 8.85e-12 * v.k * (v.A * 1e-4) / (v.d * 1e-3); },
    spd: function(){ return [0.45]; },
    draw: function(v, ph){
      var C = this.C(v), Q = C * v.V, w = 40 + 1.3 * v.A, g = 6 * v.d, cx = 240, yc = 125, xl = cx - w / 2, xr = cx + w / 2, yt = yc - g / 2, yb = yc + g / 2, o = "", n = Math.max(2, Math.min(14, Math.round(2 + 12 * Math.log10(1 + Q / 1e-9) / Math.log10(1 + 8.9e-8 / 1e-9)))), i, x;
      o += '<rect x="' + xl.toFixed(1) + '" y="' + yt.toFixed(1) + '" width="' + w.toFixed(1) + '" height="' + g.toFixed(1) + '" fill="#0b6bab" opacity="' + (0.06 + v.k * 0.03).toFixed(2) + '"/>';
      o += '<line class="plt" x1="' + xl.toFixed(1) + '" y1="' + yt.toFixed(1) + '" x2="' + xr.toFixed(1) + '" y2="' + yt.toFixed(1) + '"/><line class="plt" x1="' + xl.toFixed(1) + '" y1="' + yb.toFixed(1) + '" x2="' + xr.toFixed(1) + '" y2="' + yb.toFixed(1) + '"/>';
      for (i = 0; i < n; i++){ x = xl + 10 + (w - 20) * (n === 1 ? 0.5 : i / (n - 1)); o += tx(x, yt - 7, "+", "middle", "r") + tx(x, yb + 16, "−", "middle", "a") + flow([[x, yt + 2], [x, yb - 2]], ph[0], "c", Math.max(14, g / 2)); }
      o += wr(cx + ",40 " + cx + "," + (yt) ) + wr(cx + "," + yb + " " + cx + ",210");
      o += '<line class="dim" x1="' + (xr + 14) + '" y1="' + yt.toFixed(1) + '" x2="' + (xr + 14) + '" y2="' + yb.toFixed(1) + '"/>' + tx(xr + 22, yc + 4, "d = " + v.d + " mm", "start") + tx(cx, 36, "A = " + v.A + " cm²") + tx(xl - 6, yc + 4, "k = " + v.k, "end") + tx(cx, 244, "C = " + nf(C * 1e12, 3) + " pF", "middle", "big");
      return o;
    },
    out: function(v){ var C = this.C(v), Q = C * v.V; return ["C = 8.85×10⁻¹² × " + v.k + " × " + nf(v.A * 1e-4, 4) + " m² / " + nf(v.d * 1e-3, 4) + " m = " + nf(C * 1e12, 3) + " pF", "Q = C V = " + nf(Q * 1e9, 3) + " nC", "W = ½ C V² = " + nf(0.5 * C * v.V * v.V * 1e9, 3) + " nJ"]; },
    look: ["More area gives more room for charge. C grows with A.", "A smaller gap puts the plates closer. C grows as d falls.", "A higher k means a better dielectric. C grows with k."],
    tryit: [["Halve d and keep the rest. What happens to C?", "C doubles."], ["A = 100 cm², d = 2 mm, k = 5. What is C?", "C = 221 pF."]] },
  { t: "Charging and discharging", d: "The animation runs in slow motion. The exponential shape is shown without the time constant theory, which belongs to Chapter 7. No Chapter 7 slides exist in this course folder.",
    ctl: [{ id: "sw", type: "sw", label: "Mode", opts: ["Charging", "Discharging"], val: 0 }, { id: "R", label: "R", min: 1, max: 10, step: 1, val: 5, unit: "kΩ" }, { id: "C", label: "C", min: 10, max: 100, step: 10, val: 50, unit: "μF" }],
    tau: function(v){ return v.R * v.C / 1000; },
    spd: function(){ return [0.1]; },
    draw: function(v, ph){
      var tau = this.tau(v), t = ((ph[0] % 1) + 1) % 1 * 2, ex = Math.exp(-t / tau), vc = v.sw ? ex : 1 - ex, ic = ex, x0 = 290, y0 = 225, gx = 170, gy = 150, o = "", a = [], b = [], s, i;
      o += (v.sw ? wr("40,60 40,210") : bat(40, 60, 210)) + wr("40,60 70,60") + zig(70, 60, 140, 60) + wr("140,60 190,60 190,110") + capV(190, 135) + wr("190,160 190,210 40,210");
      var q = (v.sw ? -1 : 1) * (1 - ex) * 2.2;
      o += flow(v.sw ? [[190, 210], [40, 210], [40, 60], [190, 60], [190, 110]] : [[40, 125], [40, 60], [190, 60], [190, 110]], v.sw ? -q * 0.5 : q * 0.5, v.sw ? "e" : "c", 36);
      o += tx(105, 46, "R " + v.R + " kΩ") + tx(212, 140, "C " + v.C + " μF", "start") + tx(115, 240, v.sw ? "battery removed" : "battery E = 10 V");
      for (i = 0; i <= 20; i++){ s = i / 10; a.push([x0 + gx * s / 2, y0 - gy * (v.sw ? Math.exp(-s / tau) : 1 - Math.exp(-s / tau))]); b.push([x0 + gx * s / 2, y0 - gy * Math.exp(-s / tau)]); }
      for (i = 0; i <= 2; i++) o += '<line class="gr" x1="' + (x0 + gx * i / 2) + '" y1="' + y0 + '" x2="' + (x0 + gx * i / 2) + '" y2="' + (y0 - gy) + '"/>' + tx(x0 + gx * i / 2, y0 + 16, i);
      o += '<line class="axis2" x1="' + x0 + '" y1="' + y0 + '" x2="' + (x0 + gx) + '" y2="' + y0 + '"/><line class="axis2" x1="' + x0 + '" y1="' + y0 + '" x2="' + x0 + '" y2="' + (y0 - gy) + '"/>' + poly(a, "line") + poly(b, "line l2 thin") + tx(x0 + gx / 2, 254, "time (s), slow motion");
      var px = x0 + gx * t / 2;
      o += '<line class="dash" x1="' + px.toFixed(1) + '" y1="' + y0 + '" x2="' + px.toFixed(1) + '" y2="' + (y0 - gy) + '"/><circle class="nd big" cx="' + px.toFixed(1) + '" cy="' + (y0 - gy * vc).toFixed(1) + '" r="5"/><circle cx="' + px.toFixed(1) + '" cy="' + (y0 - gy * ic).toFixed(1) + '" r="4.5" fill="#c0392b"/>' + tx(x0 + gx, y0 - gy - 30, "v_C / E", "end", "a") + tx(x0 + gx, y0 - gy - 12, "i / I₀", "end", "r");
      return o;
    },
    out: function(v){ var tau = this.tau(v); return v.sw ? ["Discharging: v_C falls toward zero and the current reverses.", "The dots move the other way round the loop and slow down."] .concat(["R C = " + nf(tau * 1000) + " ms: a larger R or C gives a slower fall."]) : ["Charging: v_C rises toward E and the current falls toward zero.", "After a long time: v_C = E, i = 0. The capacitor acts as an open circuit.", "R C = " + nf(tau * 1000) + " ms: a larger R or C gives a slower rise."]; },
    look: ["The dots slow down while the capacitor fills, because the current falls.", "At the end the dots stop: a charged capacitor blocks DC.", "Raise R or C. The curve takes longer to reach its end value."],
    tryit: [["Which curve is zero at the start when charging?", "v_C starts at zero. The current starts at its maximum."], ["Which way does the current flow when discharging?", "Opposite to the charging direction."]] },
  { t: "Inductor voltage", d: "The voltage across an inductor is v = L di/dt. A steady current gives zero voltage.",
    ctl: [{ id: "m", type: "sw", label: "Current", opts: ["Rising and falling", "Steady DC"], val: 0 }, { id: "L", label: "L", min: 1, max: 20, step: 1, val: 5, unit: "×0.1 H" }, { id: "r", label: "Rate |di/dt|", min: 1, max: 8, step: 1, val: 4, unit: "A/s" }],
    iv: function(v, t){ var L = v.L / 10; if (v.m) return [2, 0]; var T = 8 / v.r, tt = t % T, up = tt < 4 / v.r; return [up ? v.r * tt : 8 - v.r * tt, up ? L * v.r : -L * v.r]; },
    spd: function(){ return [0.25]; },
    draw: function(v, ph){
      var tc = (((ph[0] % 1) + 1) % 1) * 4, o = "", pi = [], pv = [], t, x0 = 60, gx = 390, k = 0, L = v.L / 10;
      for (t = 0; t <= 4.001; t += 0.02){ var a = this.iv(v, t); pi.push([x0 + gx * t / 4, 105 - a[0] * 18]); pv.push([x0 + gx * t / 4, 195 - a[1] * 50 / Math.max(1, L * (v.m ? 1 : v.r))]); }
      o += tx(x0 - 6, 40, "i (A)", "end", "a") + '<line class="axis2" x1="' + x0 + '" y1="105" x2="' + (x0 + gx) + '" y2="105"/><line class="axis2" x1="' + x0 + '" y1="105" x2="' + x0 + '" y2="30"/>' + poly(pi, "line") + tx(x0 - 6, 128, "v (V)", "end", "r") + '<line class="axis2" x1="' + x0 + '" y1="195" x2="' + (x0 + gx) + '" y2="195"/><line class="axis2" x1="' + x0 + '" y1="130" x2="' + x0 + '" y2="250"/>' + poly(pv, "line l2");
      var c = this.iv(v, tc), px = x0 + gx * tc / 4;
      o += '<line class="dash" x1="' + px.toFixed(1) + '" y1="30" x2="' + px.toFixed(1) + '" y2="250"/><circle class="nd big" cx="' + px.toFixed(1) + '" cy="' + (105 - c[0] * 18).toFixed(1) + '" r="5"/><circle cx="' + px.toFixed(1) + '" cy="' + (195 - c[1] * 50 / Math.max(1, L * (v.m ? 1 : v.r))).toFixed(1) + '" r="5" fill="#c0392b"/>' + tx(x0 + gx - 4, 124, "time (s)", "end") + tx(px + 8, 24, "i = " + nf(c[0], 2) + " A", px > 330 ? "end" : "start") + tx(px + 8, 244, "v = " + nf(c[1], 2) + " V", px > 330 ? "end" : "start");
      return o;
    },
    out: function(v){ var L = v.L / 10; return v.m ? ["Steady DC: di/dt = 0", "v = L di/dt = 0 V", "The inductor acts as a short circuit."] : ["v = L di/dt = " + L + " H × " + v.r + " A/s = " + nf(L * v.r, 3) + " V while i rises", "v = −" + nf(L * v.r, 3) + " V while i falls", "The voltage opposes the change (Lenz's law)."]; },
    look: ["The voltage is positive while the current rises and negative while it falls.", "A steeper current slope gives a larger voltage.", "Switch to steady DC. The voltage drops to zero."],
    tryit: [["L = 0.5 H and di/dt = 4 A/s. What is v?", "v = 2 V."], ["What is v when the current is constant?", "Zero."]] }
];

// ---------- Chapter 8 ----------
SIMS["8"] = [
  { t: "Sine wave explorer", d: "A rotating phasor draws the wave. The height of its tip is the instantaneous value. Change V_m, f and ψ.",
    ctl: [{ id: "Vm", label: "V_m", min: 1, max: 10, step: 1, val: 8, unit: "V" }, { id: "f", label: "f", min: 25, max: 100, step: 25, val: 50, unit: "Hz" }, { id: "psi", label: "ψ", min: -90, max: 90, step: 15, val: 0, unit: "°" }],
    spd: function(){ return [0.14]; },
    draw: function(v, ph){
      var u = (((ph[0] % 1) + 1) % 1), tms = u * 40, th = 360 * v.f * tms / 1000 + v.psi, A = 6 * v.Vm, cy = 135, cx = 82, x0 = 175, gx = 285, o = "", pts = [], t, k;
      for (t = 0; t <= 40.01; t += 0.5) pts.push([x0 + gx * t / 40, cy - A * Math.sin(rad(360 * v.f * t / 1000 + v.psi))]);
      var tipx = cx + A * Math.cos(rad(th)), tipy = cy - A * Math.sin(rad(th)), wx = x0 + gx * u, rms = A / Math.SQRT2;
      o += '<circle cx="' + cx + '" cy="' + cy + '" r="' + A + '" fill="none" stroke="#8aa0b4" stroke-width="1.2" stroke-dasharray="3 4"/><line class="axis2" x1="' + (cx - 66) + '" y1="' + cy + '" x2="' + (cx + 66) + '" y2="' + cy + '"/><line class="axis2" x1="' + cx + '" y1="' + (cy - 66) + '" x2="' + cx + '" y2="' + (cy + 66) + '"/>' + vec(cx, cy, tipx, tipy, "");
      o += '<line class="axis2" x1="' + x0 + '" y1="' + cy + '" x2="' + (x0 + gx) + '" y2="' + cy + '"/><line class="dash" x1="' + x0 + '" y1="' + (cy - rms).toFixed(1) + '" x2="' + (x0 + gx) + '" y2="' + (cy - rms).toFixed(1) + '"/>' + poly(pts, "line");
      o += '<line class="dash" x1="' + tipx.toFixed(1) + '" y1="' + tipy.toFixed(1) + '" x2="' + wx.toFixed(1) + '" y2="' + tipy.toFixed(1) + '"/><circle class="nd big" cx="' + wx.toFixed(1) + '" cy="' + tipy.toFixed(1) + '" r="5"/>';
      var T = 1000 / v.f;
      o += tx(x0 + gx, 232, "dashed line: rms = 0.707 V_m", "end", "mut") + tx(x0, cy + 78, "0 ms") + tx(x0 + gx / 2, cy + 78, "20 ms") + tx(x0 + gx, cy + 78, "40 ms", "end") + tx(cx, 38, "phasor") + tx(x0 + 4, 38, "v(t) = " + v.Vm + " sin(ωt " + (v.psi < 0 ? "− " + (-v.psi) : "+ " + v.psi) + "°)", "start") + tx(x0 + gx / 2, 254, "T = 1/f = " + nf(T, 3) + " ms", "middle", "a");
      return o;
    },
    out: function(v){ var w = 2 * Math.PI * v.f; return ["T = 1 / f = " + nf(1000 / v.f, 3) + " ms", "ω = 2π f = " + nf(w, 4) + " rad/s", "rms = V_m / √2 = " + nf(v.Vm / Math.SQRT2, 3) + " V", "half-cycle average = 0.637 V_m = " + nf(0.637 * v.Vm, 3) + " V", "V_pp = 2 V_m = " + 2 * v.Vm + " V"]; },
    look: ["The tip of the phasor goes round once per period. The wave is its height.", "A higher f packs more cycles into the 40 ms window.", "Change ψ and the whole wave shifts. ψ is the angle at t = 0."],
    tryit: [["f = 50 Hz. What is T?", "T = 20 ms."], ["V_m = 8 V. What is the rms value?", "V = 5.66 V."]] },
  { t: "Phase difference", d: "Two waves of the same frequency. The one that reaches its peak first is the one that leads.",
    ctl: [{ id: "phi", label: "φ (v leads i by)", min: -180, max: 180, step: 15, val: 60, unit: "°" }],
    spd: function(){ return [0.12]; },
    draw: function(v, ph){
      var u = (((ph[0] % 1) + 1) % 1), x0 = 40, gx = 420, cy = 130, A = 62, a = [], b = [], d, o = "", cur = 540 * u;
      for (d = 0; d <= 540; d += 5){ a.push([x0 + gx * d / 540, cy - A * Math.sin(rad(d + v.phi))]); b.push([x0 + gx * d / 540, cy - A * 0.7 * Math.sin(rad(d))]); }
      o += '<line class="axis2" x1="' + x0 + '" y1="' + cy + '" x2="' + (x0 + gx) + '" y2="' + cy + '"/>' + poly(a, "line") + poly(b, "line l2");
      var px = x0 + gx * u;
      o += '<line class="dash" x1="' + px.toFixed(1) + '" y1="40" x2="' + px.toFixed(1) + '" y2="225"/><circle class="nd big" cx="' + px.toFixed(1) + '" cy="' + (cy - A * Math.sin(rad(cur + v.phi))).toFixed(1) + '" r="5"/><circle cx="' + px.toFixed(1) + '" cy="' + (cy - A * 0.7 * Math.sin(rad(cur))).toFixed(1) + '" r="5" fill="#c0392b"/>';
      o += tx(x0 + 4, 30, "v = V_m sin(ωt + φ)", "start", "a") + tx(x0 + gx - 4, 30, "i = I_m sin ωt", "end", "r") + tx(x0 + gx - 4, 246, "ωt (degrees)", "end");
      var r0 = v.phi === 0 ? "in phase" : Math.abs(v.phi) === 180 ? "opposite phase" : v.phi > 0 ? "v leads i by " + v.phi + "°" : "v lags i by " + (-v.phi) + "°";
      o += tx(x0 + gx / 2, 246, r0, "middle", "a");
      return o;
    },
    out: function(v){ return ["φ = ψ_v − ψ_i = " + v.phi + "°", v.phi === 0 ? "The waves peak together: in phase." : Math.abs(v.phi) === 180 ? "The waves are opposite: φ = 180°." : v.phi > 0 ? "φ is positive: v leads i. v peaks first." : "φ is negative: v lags i. i peaks first.", "The time shift is Δt = φ / (360° f)."]; },
    look: ["Move φ to a positive value. The blue wave shifts to the left and peaks first.", "At φ = 0° the two waves peak together.", "At φ = 180° one wave is the mirror of the other."],
    tryit: [["v = sin(ωt + 30°) and i = sin(ωt − 20°). What is φ?", "50°. v leads i."], ["What does φ = −90° mean?", "v lags i by 90°."]] },
  { t: "R, L and C in AC", d: "Pick an element. The current phasor (red) stays at a fixed angle to the voltage phasor (blue) while both rotate.",
    ctl: [{ id: "el", type: "sel", label: "Element", opts: ["Resistor 40 Ω", "Inductor 0.1 H", "Capacitor 50 μF"], val: 1 }, { id: "f", label: "f", min: 20, max: 200, step: 20, val: 60, unit: "Hz" }],
    X: function(v){ var w = 2 * Math.PI * v.f; return v.el === 0 ? 40 : v.el === 1 ? w * 0.1 : 1 / (w * 50e-6); },
    spd: function(){ return [0.12]; },
    draw: function(v, ph){
      var u = (((ph[0] % 1) + 1) % 1), th = 720 * u, sh = v.el === 0 ? 0 : v.el === 1 ? -90 : 90, cx = 70, cy = 72, r = 48, x0 = 40, gx = 420, wy = 188, A = 40, a = [], b = [], d, o = "";
      for (d = 0; d <= 720; d += 6){ a.push([x0 + gx * d / 720, wy - A * Math.sin(rad(d))]); b.push([x0 + gx * d / 720, wy - A * Math.sin(rad(d + sh))]); }
      var vx = cx + r * Math.cos(rad(th)), vy = cy - r * Math.sin(rad(th)), ix = cx + r * 0.8 * Math.cos(rad(th + sh)), iy = cy - r * 0.8 * Math.sin(rad(th + sh));
      o += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="#8aa0b4" stroke-width="1.2" stroke-dasharray="3 4"/>' + vec(cx, cy, vx, vy, "") + vec(cx, cy, ix, iy, "l2") + tx(vx + (vx > cx ? 6 : -6), vy + (vy > cy ? 14 : -4), "v", vx > cx ? "start" : "end", "a") + tx(ix + (ix > cx ? 6 : -6), iy + (iy > cy ? 14 : -4), "i", ix > cx ? "start" : "end", "r");
      o += '<line class="axis2" x1="' + x0 + '" y1="' + wy + '" x2="' + (x0 + gx) + '" y2="' + wy + '"/>' + poly(a, "line") + poly(b, "line l2");
      var px = x0 + gx * u;
      o += '<line class="dash" x1="' + px.toFixed(1) + '" y1="140" x2="' + px.toFixed(1) + '" y2="236"/><circle class="nd big" cx="' + px.toFixed(1) + '" cy="' + (wy - A * Math.sin(rad(th))).toFixed(1) + '" r="5"/><circle cx="' + px.toFixed(1) + '" cy="' + (wy - A * Math.sin(rad(th + sh))).toFixed(1) + '" r="5" fill="#c0392b"/>';
      var X = this.X(v), nm = ["Resistor: R = 40 Ω", "Inductor: X_L = ω L = " + nf(X, 3) + " Ω", "Capacitor: X_C = 1/(ω C) = " + nf(X, 3) + " Ω"][v.el], rel = ["v and i are in phase", "v leads i by 90°", "i leads v by 90°"][v.el];
      o += tx(150, 40, nm, "start", "a") + tx(150, 62, rel, "start") + tx(150, 84, "I_m = V_m / " + (v.el ? "X" : "R") + " = 10 V / " + nf(X, 3) + " Ω = " + nf(10 / X, 3) + " A", "start", "mut") + tx(150, 106, "(waves drawn to equal height)", "start", "mut") + tx(x0 + gx - 4, 246, "ωt (degrees, two cycles)", "end");
      return o;
    },
    out: function(v){ var X = this.X(v); return v.el === 0 ? ["R = 40 Ω does not depend on f.", "I = V / R. v and i are in phase."] : v.el === 1 ? ["X_L = 2π f L = " + nf(X, 3) + " Ω", "Raise f: X_L grows and the current falls.", "v leads i by 90° (ELI)."] : ["X_C = 1 / (2π f C) = " + nf(X, 3) + " Ω", "Raise f: X_C falls and the current grows.", "i leads v by 90° (ICE)."]; },
    look: ["In the resistor the two phasors point the same way.", "In the inductor the voltage phasor is 90° ahead of the current phasor.", "In the capacitor the current phasor is 90° ahead."],
    tryit: [["L = 0.1 H at 60 Hz. What is X_L?", "X_L = 37.7 Ω."], ["Double f in a capacitor. What happens to X_C?", "X_C is halved."]] }
];

// ---------- Chapter 9 ----------
SIMS["9"] = [
  { t: "Series RLC phasors", d: "The same current flows through R, L and C. V_R is in phase with I, V_L leads by 90° and V_C lags by 90°. The whole diagram rotates.",
    ctl: [{ id: "R", label: "R", min: 1, max: 10, step: 1, val: 3, unit: "Ω" }, { id: "xl", label: "X_L", min: 0, max: 10, step: 1, val: 6, unit: "Ω" }, { id: "xc", label: "X_C", min: 0, max: 10, step: 1, val: 2, unit: "Ω" }],
    spd: function(){ return [0.08]; },
    draw: function(v, ph){
      var th = 360 * ph[0], X = v.xl - v.xc, Z = Math.hypot(v.R, X), sc = 100 / Math.max(v.R, v.xl, v.xc, Z, 1), cx = 150, cy = 135, o = "", p0 = [cx, cy], i;
      function P(len, ang){ return [cx + len * sc * Math.cos(rad(th + ang)), cy - len * sc * Math.sin(rad(th + ang))]; }
      var a = P(v.R, 0), b = [a[0] + v.xl * sc * Math.cos(rad(th + 90)), a[1] - v.xl * sc * Math.sin(rad(th + 90))], c = [b[0] + v.xc * sc * Math.cos(rad(th - 90)), b[1] - v.xc * sc * Math.sin(rad(th - 90))], I = P(Math.min(v.R, 4) + 1.5, 0);
      o += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (Z * sc).toFixed(1) + '" fill="none" stroke="#8aa0b4" stroke-width="1.2" stroke-dasharray="3 4"/>' + vec(cx, cy, I[0], I[1], "l3") + vec(cx, cy, a[0], a[1], "") + vec(a[0], a[1], b[0], b[1], "l2") + vec(b[0], b[1], c[0], c[1], "l4") + vec(cx, cy, c[0], c[1], "l2".replace("l2", "")) ;
      var gx0 = (p0[0] + a[0] + b[0] + c[0]) / 4, gy0 = (p0[1] + a[1] + b[1] + c[1]) / 4;
      function lab(p, q, s, cls){ var mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2, dx = q[0] - p[0], dy = q[1] - p[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L; if ((mx + nx - gx0) * nx + (my + ny - gy0) * ny < 0){ nx = -nx; ny = -ny; } return L < 6 ? "" : tx(mx + nx * 15, my + ny * 15 + 4, s, "middle", cls); }
      o += lab(p0, a, "V_R", "gn") + lab(a, b, "V_L", "r") + lab(b, c, "V_C", "pp") + lab(p0, c, "V", "a") + tx(I[0] + (I[0] - cx) * 0.12, I[1] + (I[1] - cy) * 0.12 + 4, "I", "middle", "gn");
      o += tx(300, 60, "Voltages for I = 1 A", "start", "a") + tx(300, 86, "V_R = I R = " + v.R + " V", "start", "gn") + tx(300, 106, "V_L = I X_L = " + v.xl + " V", "start", "r") + tx(300, 126, "V_C = I X_C = " + v.xc + " V", "start", "pp") + tx(300, 156, "V = |Z| I = " + nf(Z, 3) + " V", "start", "a") + tx(300, 178, X > 0 ? "V leads I: inductive" : X < 0 ? "V lags I: capacitive" : "V and I in phase", "start") + tx(300, 200, "φ = " + nf(Math.atan2(X, v.R) * 180 / Math.PI, 3) + "°", "start");
      return o;
    },
    out: function(v){ var X = v.xl - v.xc, Z = Math.hypot(v.R, X); return ["X = X_L − X_C = " + X + " Ω", "Z = " + v.R + (X < 0 ? " − j" + (-X) : " + j" + X) + " Ω = " + nf(Z, 3) + "∠" + nf(Math.atan2(X, v.R) * 180 / Math.PI, 3) + "° Ω", "V_L and V_C point opposite ways, so they partly cancel."]; },
    look: ["V_L points 90° ahead of I. V_C points 90° behind it.", "Make X_L equal to X_C. They cancel and V equals V_R.", "The dashed circle has the radius of |V|. The tip of V stays on it."],
    tryit: [["R = 3 Ω, X_L = 6 Ω, X_C = 2 Ω. What is |Z|?", "5 Ω, at 53.13°."], ["Set X_L = X_C. What is φ?", "0°. The circuit is resistive."]] },
  { t: "Impedance triangle", d: "R is the horizontal side, X the vertical side and |Z| the hypotenuse. The current moves with the size of |Z|.",
    ctl: [{ id: "R", label: "R", min: 1, max: 20, step: 1, val: 8, unit: "Ω" }, { id: "xl", label: "X_L", min: 0, max: 20, step: 1, val: 12, unit: "Ω" }, { id: "xc", label: "X_C", min: 0, max: 20, step: 1, val: 4, unit: "Ω" }],
    spd: function(v){ var X = v.xl - v.xc, I = 10 / Math.hypot(v.R, X); return [Math.min(0.5, 0.08 * I), 0.12]; },
    draw: function(v, ph){
      var X = v.xl - v.xc, Z = Math.hypot(v.R, X), s = 5.5, ox = 70, oy = 135, o = "", ex = ox + v.R * s, ey = oy - X * s, phi = Math.atan2(X, v.R) * 180 / Math.PI;
      o += '<line class="axis2" x1="' + ox + '" y1="' + oy + '" x2="' + (ox + 150) + '" y2="' + oy + '"/>' + vec(ox, oy, ex, oy, "l3") + vec(ex, oy, ex, ey, X >= 0 ? "l2" : "l4") + vec(ox, oy, ex, ey, "");
      var mx = (ox + ex) / 2, my = (oy + ey) / 2;
      o += tx(mx, oy + (X >= 0 ? 18 : -8), "R = " + v.R + " Ω", "middle", "gn") + tx(ex + 8, my + 4, "X = " + X + " Ω", "start", X >= 0 ? "r" : "") + tx(mx - 10, my + (X >= 0 ? -6 : 18), "|Z|", "end", "a") + tx(20, 252, "|Z| = " + nf(Z, 3) + " Ω,  φ = " + nf(phi, 3) + "°", "start", "a");
      var I = 10 / Z, k = Math.min(1, I / 5) * 0.28;
      o += acsrc(290, 120) + wr("290,104 290,70 310,70") + wr("450,70 450,170 290,170 290,136");
      o += zig(310, 70, 360, 70) + wr("360,70 370,70") + coilH(370, 410, 70) + capH(430, 70);
      o += flow([[300, 70], [450, 70], [450, 170], [290, 170], [290, 140]], 0.5 * Math.sin(ph[1] * 2 * Math.PI) * Math.min(1, I / 5), "c", 40);
      o += tx(335, 46, "R") + tx(390, 46, "X_L") + tx(430, 46, "X_C") + tx(370, 200, "I = 10 V / |Z| = " + nf(I, 3) + " A", "middle", "a") + tx(370, 222, "(alternating current)", "middle", "mut");
      return o;
    },
    out: function(v){ var X = v.xl - v.xc, Z = Math.hypot(v.R, X), phi = Math.atan2(X, v.R) * 180 / Math.PI; return ["Z = " + v.R + (X < 0 ? " − j" + (-X) : " + j" + X) + " Ω = " + nf(Z, 3) + "∠" + nf(phi, 3) + "° Ω", X > 0 ? "X is positive: the circuit is inductive, I lags V." : X < 0 ? "X is negative: the circuit is capacitive, I leads V." : "X = 0: the circuit is resistive.", "PF = cos φ = R / |Z| = " + nf(v.R / Z, 3)]; },
    look: ["Raise X_L. The triangle grows upward and φ opens up.", "Raise X_C above X_L. X turns negative and the triangle flips down.", "A larger |Z| means a smaller current. The dots swing less."],
    tryit: [["R = 8 Ω, X_L = 12 Ω, X_C = 4 Ω. What is φ?", "X = 8 Ω, so φ = 45°."], ["What is the PF when X = 0?", "PF = 1."]] },
  { t: "Power triangle and correction", d: "P stays the same when a capacitor is added in parallel. Q_C lowers the total Q, S and the line current. Values follow the 120 V, 60 Hz example of slide 33.",
    ctl: [{ id: "P", label: "P", min: 1, max: 10, step: 1, val: 4, unit: "kW" }, { id: "pf", label: "PF (lagging)", min: 0.5, max: 0.95, step: 0.05, val: 0.8, unit: "" }, { id: "qc", label: "Q_C", min: 0, max: 10, step: 0.5, val: 1.5, unit: "kvar" }],
    q: function(v){ var Q1 = v.P * Math.tan(Math.acos(v.pf)), Q2 = Q1 - v.qc; return { Q1: Q1, Q2: Q2, S1: v.P / v.pf, S2: Math.hypot(v.P, Q2) }; },
    spd: function(v){ var q = this.q(v); return [Math.min(0.7, q.S1 * 1000 / 120 / 120), Math.min(0.7, q.S2 * 1000 / 120 / 120)]; },
    draw: function(v, ph){
      var q = this.q(v), s = Math.min(280 / v.P, 80 / Math.max(Math.abs(q.Q1), Math.abs(q.Q2), 1)), ox = 50, oy = 100, o = "", px = ox + v.P * s, y1 = oy - q.Q1 * s, y2 = oy - q.Q2 * s;
      o += '<line class="axis2" x1="' + ox + '" y1="' + oy + '" x2="' + (px + 12) + '" y2="' + oy + '"/>' + vec(ox, oy, px, oy, "l3") + vec(px, oy, px, y1, "l2") + vec(ox, oy, px, y1, "") + '<line class="dash" x1="' + px + '" y1="' + y1.toFixed(1) + '" x2="' + px + '" y2="' + y2.toFixed(1) + '"/>' + vec(ox, oy, px, y2, "l4");
      o += tx((ox + px) / 2, oy + (q.Q2 < 0 ? -8 : 16), "P = " + v.P + " kW", "middle", "gn") + tx(352, 28, "Q₁ = " + nf(q.Q1, 3) + " kvar", "start", "r") + tx(352, 46, "S₁ = " + nf(q.S1, 3) + " kVA", "start", "am") + tx(352, 70, "Q₂ = " + nf(q.Q2, 3) + " kvar", "start", "pp") + tx(352, 88, "S₂ = " + nf(q.S2, 3) + " kVA", "start", "pp");
      var I1 = q.S1 * 1000 / 120, I2 = q.S2 * 1000 / 120;
      o += tx(16, 200, "line current at 120 V", "start", "mut") + tx(16, 222, "before", "start") + wr("80,218 380,218") + flow([[80, 218], [380, 218]], ph[0], "c", 30) + tx(392, 222, nf(I1, 3) + " A", "start", "r");
      o += tx(16, 250, "after", "start") + wr("80,246 380,246") + flow([[80, 246], [380, 246]], ph[1], "d", 30) + tx(392, 250, nf(I2, 3) + " A", "start", "pp");
      return o;
    },
    out: function(v){ var q = this.q(v), pf2 = v.P / q.S2, C = v.qc * 1000 / (2 * Math.PI * 60 * 120 * 120); return ["Q₁ = P tan(cos⁻¹ " + v.pf + ") = " + nf(q.Q1, 3) + " kvar", "Q₂ = Q₁ − Q_C = " + nf(q.Q2, 3) + " kvar", "S₂ = √(P² + Q₂²) = " + nf(q.S2, 3) + " kVA, new PF = " + nf(pf2, 3) + (q.Q2 < 0 ? " leading" : " lagging"), "C = Q_C / (ω V²) = " + nf(C * 1e6, 4) + " μF at 120 V, 60 Hz", "Line current: " + nf(q.S1 * 1000 / 120, 3) + " A before, " + nf(q.S2 * 1000 / 120, 3) + " A after"]; },
    look: ["P does not move. Only the vertical side changes.", "Raise Q_C until Q₂ is zero. The new PF is 1 and the current is lowest.", "Raise Q_C more and Q₂ turns negative. The PF becomes leading."],
    tryit: [["P = 4 kW, PF = 0.8. What is Q₁?", "Q₁ = 3 kvar."], ["How much Q_C gives PF 0.95 for that load?", "About 1.685 kvar (C ≈ 310 μF)."]] }
];
