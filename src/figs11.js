// ================= Chapter 11 (transformers) and Motors: figures and drawing questions =================
CHAPTER_IDS.push("11", "M");
function figXfmr(vp, np, ns, zl, ip){
  var xp = 158, xs = 214, s = "";
  s += vrun(XL, YT, YB, [{ t: "acs", c: YM, lab: String(vp).replace(" = ", " =|"), side: "r", off: 22 }]) + hrun(YT, XL, xp, ip ? [] : []) + hrun(YB, xp, XL, []);
  s += run(xp, YT, xp, YB, [{ t: "ind", p: (YB - YT) / 2 }]) + run(xs, YB, xs, YT, [{ t: "ind", p: (YB - YT) / 2 }]);
  s += '<line class="w" x1="182" y1="50" x2="182" y2="116"/><line class="w" x1="190" y1="50" x2="190" y2="116"/>';
  s += hrun(YT, xs, XR, []) + hrun(YB, XR, xs, []) + vrun(XR, YT, YB, [{ t: "r", c: YM, lab: zl, side: "l", off: 10 }]);
  s += P.t(xp - 18, 148, np, "end") + P.t(xs + 18, 148, ns, "start");
  if (ip) s += P.arr(100, 26, 140, 26, ip, 120, 20);
  return svg(s);
}
function figMatch(n){
  var s = vrun(XL, YT, YB, [{ t: "acs", c: YM, lab: "e", side: "l" }]) + hrun(YT, XL, 158, [{ t: "r", c: 118, lab: "R_S = 100 Ω", side: "t" }]) + hrun(YB, 158, XL, []);
  s += run(158, YT, 158, YB, [{ t: "ind", p: 45 }]) + run(214, YB, 214, YT, [{ t: "ind", p: 45 }]) + '<line class="w" x1="182" y1="50" x2="182" y2="116"/><line class="w" x1="190" y1="50" x2="190" y2="116"/>';
  s += hrun(YT, 214, XR, []) + hrun(YB, XR, 214, []) + vrun(XR, YT, YB, [{ t: "r", c: YM, lab: "R_L = 4 Ω|(speaker)", side: "l", off: 10 }]) + P.t(186, 150, n);
  return svg(s);
}
function figMotor(vin, r, eb, I){
  var s = vrun(XL, YT, YB, [B(vin)]) + hrun(YT, XL, XR, [{ t: "r", c: 190, lab: r, side: "t" }]) + vrun(XR, YT, YB, [{ t: "bat", c: YM, plus: "u", lab: eb, side: "l" }]) + hrun(YB, XR, XL, []);
  if (I) s += P.arr(118, 26, 158, 26, I, 138, 20);
  return svg(s);
}
function figTS(ts, wnl, mark){
  var x0 = 70, y0 = 130, W = 250, H = 100, s = "";
  s += '<line class="w" x1="' + x0 + '" y1="' + y0 + '" x2="' + (x0 + W + 10) + '" y2="' + y0 + '"/><line class="w" x1="' + x0 + '" y1="' + y0 + '" x2="' + x0 + '" y2="' + (y0 - H - 10) + '"/>';
  s += '<polyline class="wave" points="' + x0 + "," + (y0 - H) + " " + (x0 + W) + "," + y0 + '"/>';
  s += P.t(x0 - 6, y0 - H + 4, ts, "end", "acc") + P.t(x0 + W, y0 + 16, wnl, "middle", "acc") + P.t(x0 - 6, 22, "T", "end") + P.t(x0 + W + 14, y0 + 4, "ω", "start");
  if (mark) s += '<line class="dash" x1="' + (x0 + W / 2) + '" y1="' + y0 + '" x2="' + (x0 + W / 2) + '" y2="' + (y0 - H / 2) + '"/><circle cx="' + (x0 + W / 2) + '" cy="' + (y0 - H / 2) + '" r="4" class="mesh"/>' + P.t(x0 + W / 2 + 8, y0 - H / 2 - 8, mark, "start", "acc");
  return svg(s);
}
function figWound(kind){
  // field winding F and armature A, connected in series or in parallel (shunt) to the supply
  var s = vrun(XL, YT, YB, [B("V")]);
  if (kind === "series") s += hrun(YT, XL, XR, [{ t: "ind", c: 190, lab: "field", side: "t" }]) + vrun(XR, YT, YB, [{ t: "m", c: YM, ch: "A", lab: "armature", side: "l" }]) + hrun(YB, XR, XL, []);
  else s += hrun(YT, XL, XR, []) + hrun(YB, XR, XL, []) + vrun(190, YT, YB, [{ t: "ind", c: YM, lab: "field", side: "l" }]) + vrun(XR, YT, YB, [{ t: "m", c: YM, ch: "A", lab: "armature", side: "l" }]) + dots([[190, YT], [190, YB]]);
  return svg(s);
}

CHAPTERS["11"] = { title: "Transformers", questions: [
  { tag: "Calculation", q: "Example 11.1. N_P = 40, N_S = 100, V_P = 50 V, I_P = 5 A, Z_L = 2 Ω. Find the turns ratio n.", a: "n = N_S / N_P = 100 / 40 = 2.5", fig: function(){ return figXfmr("V_P = 50 V", "N_P = 40", "N_S = 100", "Z_L = 2 Ω", "I_P = 5 A"); } },
  { tag: "Calculation", q: "Example 11.1. Find the secondary voltage and current.", a: "V_S = n V_P = 2.5 × 50 = 125 V\nI_S = I_P / n = 5 / 2.5 = 2 A", fig: function(){ return figXfmr("V_P = 50 V", "N_P = 40", "N_S = 100", "Z_L = 2 Ω", "I_P = 5 A"); } },
  { tag: "Calculation", q: "Example 11.1. Find the primary impedance Z_P reflected from the secondary and the power.", a: "Z_P = Z_L / n² = 2 / 2.5² = 0.32 Ω\nP_S = I_S V_S = 2 × 125 = 250 W", fig: function(){ return figXfmr("V_P = 50 V", "N_P = 40", "N_S = 100", "Z_L = 2 Ω", "I_P = 5 A"); } },
  { tag: "Concept", q: "Example 11.2. N_S = 125 and N_P = 250. Find n. Is it a step-up or a step-down transformer?", a: "n = N_S / N_P = 125 / 250 = 0.5\nn < 1, so it is a step-down transformer.", fig: function(){ return figXfmr("V_P", "N_P = 250", "N_S = 125", "Z_L"); } },
  { tag: "Calculation", q: "Example 11.3. An amplifier with R_S = 100 Ω drives a 4 Ω speaker. Find n for maximum power.", a: "n = √(Z_L / Z_P) = √(4 / 100) = 0.2 = 1/5\nThe speaker then looks like 4 / 0.2² = 100 Ω to the amplifier.", fig: function(){ return figMatch("n = ?"); } },
  { tag: "Concept", q: "Why is the voltage stepped up before long transmission lines?", a: "For the same power P = V I, a higher V needs a smaller I.\nThe line loss I² R_w falls, so the efficiency rises.", fig: function(){ return figXfmr("G", "N_P", "N_S > N_P", "line"); } }
] };
CHAPTERS["M"] = { title: "Electric Motors", questions: [
  { tag: "Concept", q: "Draw the model of a PM brushed DC motor. Write the current equation.", a: "The coil is a resistor R in series with the back EMF V_bemf = K_E ω (the inductance is neglected).\nI = (V_in − V_bemf) / R", fig: function(){ return figMotor("V_in", "R", "V_bemf = K_E ω", "I"); } },
  { tag: "Concept", q: "Read the torque-speed line of a PM DC motor. What are T_s and ω_NL?", a: "T_s (stall torque) is the torque at ω = 0: T_s = K_T V_in / R.\nω_NL (no-load speed) is the speed at T = 0: ω_NL = V_in / K_E.", fig: function(){ return figTS("T_stall", "ω_NL"); } },
  { tag: "Concept", q: "At which point does the motor give its maximum mechanical power?", a: "At half the no-load speed, where T = T_stall / 2.\nP = T ω is largest there.", fig: function(){ return figTS("T_stall", "ω_NL", "P_max"); } },
  { tag: "Calculation", q: "Motors file example. No-load speed 1000 rpm, stall torque 100 in·oz. A 10 oz weight hangs from a 2 in pulley. Find the torque and the speed.", a: "T = F × r = 10 oz × 2 in = 20 in·oz\nFrom the line: ω = 1000 × (1 − 20/100) = 800 rpm (the file reads 800 rpm and 125 mA from the graph).", fig: function(){ return figTS("100 in·oz", "1000 rpm", "20 in·oz"); } },
  { tag: "Concept", q: "Which winding connection is this? Name one application.", a: "Series-wound: the field and the armature are in series.\nVery large torque at low speed, for example elevators, conveyors and electric locomotives.", fig: function(){ return figWound("series"); } },
  { tag: "Concept", q: "Which winding connection is this? How does its speed behave?", a: "Shunt-wound: the field is in parallel with the armature.\nThe speed is almost constant with varying load, for example fans, blowers and machine tools.", fig: function(){ return figWound("shunt"); } }
] };
