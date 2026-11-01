// ===== Watch tab: Chapter 11 and Motors =====
function coilV(x, y1, y2, n, side){
  // a winding drawn as n loops on a vertical core leg at x; side = -1 (left) or 1 (right) for the lead side
  var o = "", h = (y2 - y1) / n, i;
  for (i = 0; i < n; i++) o += '<ellipse cx="' + x + '" cy="' + (y1 + h * (i + 0.5)).toFixed(1) + '" rx="16" ry="' + Math.max(2.5, h / 2 - 0.5).toFixed(1) + '" class="fl" fill="none" stroke-width="2.4"/>';
  return o;
}
function osc(ph, amp){ return amp * Math.sin(2 * Math.PI * ph); }
SIMS["11"] = [
  { t: "Ideal transformer", d: "An ideal transformer feeds a load Z_L. Change the turns and watch the voltage and the current change in opposite ways. The turns ratio is the book's n = N_S / N_P.",
    ctl: [{ id: "np", label: "N_P", min: 20, max: 200, step: 20, val: 40, unit: "turns" }, { id: "ns", label: "N_S", min: 20, max: 200, step: 20, val: 100, unit: "turns" }, { id: "vp", label: "V_P", min: 10, max: 100, step: 10, val: 50, unit: "V" }, { id: "zl", label: "Z_L", min: 5, max: 50, step: 5, val: 25, unit: "Ω" }],
    q: function(v){ var n = v.ns / v.np, Vs = n * v.vp, Is = Vs / v.zl, Ip = n * Is; return { n: n, Vs: Vs, Is: Is, Ip: Ip }; },
    spd: function(){ return [0.5]; },
    draw: function(v, ph){
      var q = this.q(v), o = "", a1 = Math.min(0.35, 0.02 * q.Ip), a2 = Math.min(0.35, 0.02 * q.Is);
      o += '<rect x="178" y="52" width="124" height="156" rx="6" fill="none" stroke="#5b6b7b" stroke-width="10"/>';
      o += coilV(178, 70, 190, Math.round(v.np / 20)) + coilV(302, 70, 190, Math.round(v.ns / 20));
      o += acsrc(60, 130) + wr("60,114 60,70 162,70") + wr("60,146 60,190 162,190") + wr("318,70 430,70 430,105") + zig(430, 105, 430, 155) + wr("430,155 430,190 318,190");
      o += flow([[60, 146], [60, 190], [162, 190]], osc(ph[0], a1), "c", 30) + flow([[162, 70], [60, 70], [60, 114]], osc(ph[0], a1), "c", 30) + flow([[318, 70], [430, 70], [430, 190], [318, 190]], osc(ph[0], a2), "c", 34);
      o += tx(60, 222, "V_P = " + v.vp + " V") + tx(178, 228, "N_P = " + v.np) + tx(302, 228, "N_S = " + v.ns) + tx(414, 134, "Z_L " + v.zl + " Ω", "end") + tx(240, 36, "n = N_S / N_P = " + nf(q.n, 3) + (q.n > 1 ? " (step-up)" : q.n < 1 ? " (step-down)" : " (1:1)"), "middle", "a") + tx(380, 222, "V_S = " + nf(q.Vs, 3) + " V") + tx(110, 58, "I_P = " + nf(q.Ip, 3) + " A") + tx(380, 58, "I_S = " + nf(q.Is, 3) + " A");
      return o;
    },
    out: function(v){ var q = this.q(v); return ["n = N_S / N_P = " + nf(q.n, 4), "V_S = n V_P = " + nf(q.Vs, 4) + " V", "I_S = V_S / Z_L = " + nf(q.Is, 4) + " A, I_P = n I_S = " + nf(q.Ip, 4) + " A", "Z_P = Z_L / n² = " + nf(v.zl / (q.n * q.n), 4) + " Ω", "P_P = P_S = " + nf(v.vp * q.Ip, 4) + " W"]; },
    look: ["The arrows swing back and forth: the current is AC.", "More secondary turns give more voltage and less current on that side.", "The power is the same on both sides."],
    tryit: [["N_P = 40, N_S = 100, V_P = 50 V. What is V_S?", "125 V (Example 11.1)."], ["Make N_S smaller than N_P. Which type is it now?", "A step-down transformer."]] },
  { t: "Power transmission", d: "100 kW leaves a 2 kV generator through lines of 5 Ω in total. A step-up transformer raises the voltage k times. A higher voltage needs less current, so the line loss I² R falls.",
    ctl: [{ id: "k", label: "Step-up ratio k", min: 1, max: 20, step: 1, val: 1, unit: "" }],
    q: function(v){ var V = 2000 * v.k, I = 100000 / V, L = I * I * 5; return { V: V, I: I, L: L }; },
    spd: function(v){ var q = this.q(v); return [Math.min(0.9, q.I / 50)]; },
    draw: function(v, ph){
      var q = this.q(v), o = "", w = Math.max(2, Math.min(280, q.L / 12500 * 280));
      o += '<circle class="srcc" cx="45" cy="110" r="22"/>' + tx(45, 115, "G") + tx(45, 150, "2 kV") + wr("67,110 100,110") + '<rect x="100" y="92" width="36" height="36" rx="4" fill="none" stroke="#5b6b7b" stroke-width="3"/>' + tx(118, 115, "↑") + tx(118, 150, "×" + v.k);
      o += wr("136,110 360,110") + flow([[136, 110], [360, 110]], ph[0], "c", 34) + '<rect x="360" y="92" width="36" height="36" rx="4" fill="none" stroke="#5b6b7b" stroke-width="3"/>' + tx(378, 115, "↓") + wr("396,110 430,110") + '<rect x="430" y="88" width="34" height="44" rx="3" fill="none" stroke="#5b6b7b" stroke-width="2.4"/>' + tx(447, 150, "town");
      o += tx(248, 84, "line: V = " + nf(q.V / 1000, 3) + " kV, I = " + nf(q.I, 3) + " A") + tx(248, 136, "R_line = 5 Ω", "middle", "mut");
      o += tx(40, 200, "line loss", "start") + '<rect x="130" y="188" width="' + w.toFixed(1) + '" height="16" rx="3" fill="#c0392b"/>' + tx(130, 230, nf(q.L, 4) + " W, which is " + nf(q.L / 1000, 3) + "% of the 100 kW sent", "start", "r");
      return o;
    },
    out: function(v){ var q = this.q(v); return ["Line voltage V = 2 kV × " + v.k + " = " + nf(q.V / 1000, 3) + " kV", "I = P / V = 100 kW / " + nf(q.V / 1000, 3) + " kV = " + nf(q.I, 4) + " A", "Loss = I² R = " + nf(q.I, 4) + "² × 5 = " + nf(q.L, 4) + " W"]; },
    look: ["Each step up of the voltage cuts the current by the same factor.", "The loss falls with the square of the current: k = 10 cuts it 100 times.", "The arrows slow down as the current falls."],
    tryit: [["k = 1. What is the loss?", "I = 50 A, loss = 12.5 kW."], ["k = 10. What is the loss?", "I = 5 A, loss = 125 W."]] },
  { t: "Impedance matching", d: "Example 11.3: an amplifier with R_S = 100 Ω drives a 4 Ω speaker through a transformer with turns ratio n. The speaker power peaks when 4 / n² = 100 Ω.",
    ctl: [{ id: "n", label: "n = N_S / N_P", min: 0.05, max: 0.6, step: 0.05, val: 0.2, unit: "" }],
    P: function(n){ var Zp = 4 / (n * n); return 100 * Zp / Math.pow(100 + Zp, 2); },
    spd: function(){ return []; },
    draw: function(v){
      var x0 = 70, y0 = 210, gx = 360, gy = 150, pts = [], n, o = "", Pm = 0.25, i;
      for (n = 0.05; n <= 0.601; n += 0.005) pts.push([x0 + gx * (n - 0.05) / 0.55, y0 - gy * this.P(n) / Pm]);
      for (i = 1; i <= 6; i++){ var nn2 = i / 10; o += tx(x0 + gx * (nn2 - 0.05) / 0.55, y0 + 16, nf(nn2, 2)); }
      o += '<line class="axis2" x1="' + x0 + '" y1="' + y0 + '" x2="' + (x0 + gx) + '" y2="' + y0 + '"/><line class="axis2" x1="' + x0 + '" y1="' + y0 + '" x2="' + x0 + '" y2="' + (y0 - gy - 10) + '"/>' + poly(pts, "line");
      var px = x0 + gx * (v.n - 0.05) / 0.55, py = y0 - gy * this.P(v.n) / Pm, mx = x0 + gx * (0.2 - 0.05) / 0.55;
      o += '<line class="dash" x1="' + mx.toFixed(1) + '" y1="' + y0 + '" x2="' + mx.toFixed(1) + '" y2="' + (y0 - gy) + '"/>' + tx(mx + 6, y0 - gy - 4, "n = 1/5", "start", "a") + '<circle class="nd big" cx="' + px.toFixed(1) + '" cy="' + py.toFixed(1) + '" r="5.5"/>';
      o += tx(x0 + gx / 2, 252, "turns ratio n") + tx(x0 - 6, 40, "P (W)", "end") + tx(x0 + 8, 40, "speaker power for E = 10 V", "start", "mut");
      return o;
    },
    out: function(v){ var Zp = 4 / (v.n * v.n), P = this.P(v.n); return ["The speaker seen from the primary: Z_P = 4 / n² = " + nf(Zp, 4) + " Ω", "P = E² Z_P / (R_S + Z_P)² = " + nf(P, 4) + " W (E = 10 V)", "Maximum 0.25 W at n = √(4 / 100) = 0.2"]; },
    look: ["The curve peaks when the reflected load equals R_S = 100 Ω.", "A smaller n makes the speaker look larger. A larger n makes it look smaller.", "Without a transformer (n = 1) the 4 Ω speaker gets only 0.037 W."],
    tryit: [["What n gives the peak?", "n = 0.2 = 1/5."], ["At n = 0.2, what does the amplifier see?", "100 Ω, equal to its own resistance."]] }
];
SIMS["M"] = [
  { t: "PM DC motor", d: "A PM motor with R = 2 Ω and K_T = K_E = 0.05. Raise the load torque: the speed falls, the current rises and the back EMF falls.",
    ctl: [{ id: "V", label: "V_in", min: 4, max: 24, step: 2, val: 12, unit: "V" }, { id: "T", label: "Load T", min: 0, max: 0.6, step: 0.02, val: 0.1, unit: "N·m" }],
    q: function(v){ var K = 0.05, R = 2, Ts = K * v.V / R, T = Math.min(v.T, Ts), w = (Ts - T) / (K * K / R), I = T / K; return { Ts: Ts, w: w, I: I, Eb: K * w, T: T, stall: v.T >= Ts }; },
    spd: function(v){ var q = this.q(v); return [q.w / (2 * Math.PI) / 30, spd1(q.I * 2)]; },
    draw: function(v, ph){
      var q = this.q(v), o = "", cx = 330, cy = 130, a = 2 * Math.PI * ph[0], i;
      o += '<rect x="250" y="70" width="30" height="120" rx="4" fill="#c0392b"/><rect x="380" y="70" width="30" height="120" rx="4" fill="#0b6bab"/>' + tx(265, 135, "N", "middle") + tx(395, 135, "S", "middle");
      o += '<circle cx="' + cx + '" cy="' + cy + '" r="44" fill="none" stroke="#5b6b7b" stroke-width="3"/>';
      for (i = 0; i < 2; i++){ var b = a + i * Math.PI; o += '<line class="w thick" x1="' + cx + '" y1="' + cy + '" x2="' + (cx + 40 * Math.cos(b)).toFixed(1) + '" y2="' + (cy + 40 * Math.sin(b)).toFixed(1) + '"/>'; }
      o += '<circle cx="' + cx + '" cy="' + cy + '" r="6" fill="#5b6b7b"/>';
      o += bat(40, 70, 190) + wr("40,70 160,70") + zig(160, 70, 210, 70) + wr("210,70 230,70 230,190 40,190") + flow([[40, 115], [40, 70], [230, 70], [230, 190], [40, 190], [40, 145]], ph[1], q.I ? "c" : "off", 34);
      o += tx(40, 212, "V_in " + v.V + " V") + tx(185, 56, "R 2 Ω") + tx(330, 210, q.stall ? "stalled: ω = 0" : "ω = " + nf(q.w, 1) + " rad/s (" + Math.round(q.w * 60 / (2 * Math.PI)) + " rpm)", "middle", q.stall ? "r" : "a") + tx(330, 232, "I = " + nf(q.I, 3) + " A, V_bemf = " + nf(q.Eb, 3) + " V");
      return o;
    },
    out: function(v){ var q = this.q(v), Pm = q.T * q.w, Pe = v.V * q.I; return ["T_stall = K_T V_in / R = " + nf(q.Ts, 3) + " N·m, ω_NL = V_in / K_E = " + nf(v.V / 0.05, 4) + " rad/s", q.stall ? "The load is above the stall torque: the motor stops." : "ω = (T_s − T) / α = " + nf(q.w, 4) + " rad/s", "I = T / K_T = " + nf(q.I, 3) + " A", "P_mech = T ω = " + nf(Pm, 4) + " W, P_elec = V I = " + nf(Pe, 4) + " W, η = " + (Pe ? nf(100 * Pm / Pe, 3) : "0") + "%"]; },
    look: ["With no load the rotor spins fastest and the current is smallest.", "A heavier load slows the rotor and draws more current.", "At the stall torque the rotor stops and the current is largest."],
    tryit: [["V_in = 12 V. What is the no-load speed?", "ω_NL = 12 / 0.05 = 240 rad/s."], ["V_in = 12 V. What is the stall torque?", "T_stall = 0.05 × 12 / 2 = 0.3 N·m."]] },
  { t: "Torque-speed and power", d: "The straight torque-speed line of a PM motor and the power curve P = T ω. The power peaks at half the no-load speed.",
    ctl: [{ id: "V", label: "V_in", min: 6, max: 24, step: 2, val: 12, unit: "V" }, { id: "f", label: "Load (% of stall)", min: 0, max: 100, step: 5, val: 30, unit: "%" }],
    spd: function(){ return []; },
    draw: function(v){
      var K = 0.05, R = 2, Ts = K * v.V / R, wn = v.V / K, Tm = 0.6, Wm = 480, Pm = 0.6 * 480 / 4, x0 = 60, y0 = 215, gx = 380, gy = 165, o = "", a = [], b = [], w, i;
      for (w = 0; w <= wn + 0.01; w += wn / 40){ var T = Ts * (1 - w / wn); a.push([x0 + gx * w / Wm, y0 - gy * T / Tm]); b.push([x0 + gx * w / Wm, y0 - gy * (T * w) / Pm]); }
      for (i = 0; i <= 4; i++) o += tx(x0 + gx * i / 4, y0 + 16, Wm * i / 4);
      o += '<line class="axis2" x1="' + x0 + '" y1="' + y0 + '" x2="' + (x0 + gx) + '" y2="' + y0 + '"/><line class="axis2" x1="' + x0 + '" y1="' + y0 + '" x2="' + x0 + '" y2="' + (y0 - gy - 8) + '"/>' + poly(a, "line") + poly(b, "line l2");
      var T0 = Ts * v.f / 100, w0 = wn * (1 - v.f / 100), px = x0 + gx * w0 / Wm;
      o += '<circle class="nd big" cx="' + px.toFixed(1) + '" cy="' + (y0 - gy * T0 / Tm).toFixed(1) + '" r="5.5"/><circle cx="' + px.toFixed(1) + '" cy="' + (y0 - gy * T0 * w0 / Pm).toFixed(1) + '" r="5" fill="#c0392b"/>';
      var hx = x0 + gx * (wn / 2) / Wm;
      o += '<line class="dash" x1="' + hx.toFixed(1) + '" y1="' + y0 + '" x2="' + hx.toFixed(1) + '" y2="' + (y0 - gy * (Ts * wn / 4) / Pm).toFixed(1) + '"/>' + tx(hx + 6, y0 - gy * (Ts * wn / 4) / Pm - 8, "P_max at ω_NL / 2", "start", "r");
      o += tx(x0 + gx, 250, "ω (rad/s)", "end") + tx(x0 + 6, 30, "T (blue), P (red)", "start", "mut");
      return o;
    },
    out: function(v){ var K = 0.05, R = 2, Ts = K * v.V / R, wn = v.V / K, T0 = Ts * v.f / 100, w0 = wn * (1 - v.f / 100); return ["T_stall = " + nf(Ts, 3) + " N·m, ω_NL = " + nf(wn, 4) + " rad/s", "Operating point: T = " + nf(T0, 3) + " N·m, ω = " + nf(w0, 4) + " rad/s", "P = T ω = " + nf(T0 * w0, 4) + " W", "P_max = T_stall ω_NL / 4 = " + nf(Ts * wn / 4, 4) + " W at 50% load"]; },
    look: ["The torque line falls from T_stall to zero at ω_NL.", "The power is zero at both ends of the line and peaks in the middle.", "A higher V_in shifts the whole line outward."],
    tryit: [["At which load percentage is P largest?", "At 50% of the stall torque."], ["Double V_in. What happens to P_max?", "It becomes four times larger."]] },
  { t: "Three-phase field", d: "Three windings 120° apart carry three currents 120° apart. Their fields add to one field of constant size that rotates. This rotating field drives the induction motor.",
    ctl: [{ id: "s", label: "Speed", min: 1, max: 5, step: 1, val: 2, unit: "" }],
    spd: function(v){ return [0.05 * v.s]; },
    draw: function(v, ph){
      var th = 2 * Math.PI * ph[0], cx = 120, cy = 130, o = "", cols = ["#c0392b", "#14803c", "#0b6bab"], names = ["A", "B", "C"], i, sx = 0, sy = 0, x0 = 250, gx = 210, cyw = 130, A = 70;
      o += '<circle cx="' + cx + '" cy="' + cy + '" r="80" fill="none" stroke="#8aa0b4" stroke-width="1.2" stroke-dasharray="3 4"/>';
      for (i = 0; i < 3; i++){
        var ang = i * 2 * Math.PI / 3, c = Math.cos(th - ang), ux = Math.cos(ang), uy = -Math.sin(ang);
        o += '<line x1="' + cx + '" y1="' + cy + '" x2="' + (cx + 80 * ux).toFixed(1) + '" y2="' + (cy + 80 * uy).toFixed(1) + '" stroke="' + cols[i] + '" stroke-width="1" stroke-dasharray="4 3"/>' + tx(cx + 92 * ux, cy + 92 * uy + 4, names[i]);
        o += vec(cx, cy, cx + 50 * c * ux, cy + 50 * c * uy, ["l2", "l3", ""][i]);
        sx += c * ux; sy += c * uy;
        var pts = [], d;
        for (d = 0; d <= 360; d += 6) pts.push([x0 + gx * d / 360, cyw - A * Math.cos(d * Math.PI / 180 - ang)]);
        o += '<polyline points="' + pts.map(function(p){ return p[0].toFixed(1) + "," + p[1].toFixed(1); }).join(" ") + '" fill="none" stroke="' + cols[i] + '" stroke-width="2.2"/>';
      }
      o += vec(cx, cy, cx + 50 * sx, cy + 50 * sy, "l4");
      var px = x0 + gx * ((th / (2 * Math.PI)) % 1);
      o += '<line class="axis2" x1="' + x0 + '" y1="' + cyw + '" x2="' + (x0 + gx) + '" y2="' + cyw + '"/><line class="dash" x1="' + px.toFixed(1) + '" y1="50" x2="' + px.toFixed(1) + '" y2="210"/>' + tx(x0 + gx / 2, 236, "A red, B green, C blue") + tx(cx, 236, "purple: total field");
      return o;
    },
    out: function(){ return ["Each phase current is cos(ωt − 0°), cos(ωt − 120°) or cos(ωt − 240°).", "The sum of the three fields has a constant size of 1.5 times one phase.", "The total field turns once per cycle of the supply."]; },
    look: ["Each coloured arrow only grows and shrinks along its own winding axis.", "The purple total keeps the same length and turns round.", "The rotor is pulled along by this turning field."],
    tryit: [["How far apart are the windings?", "120°."], ["Does the total field change its size?", "No. Only its direction turns."]] }
];
