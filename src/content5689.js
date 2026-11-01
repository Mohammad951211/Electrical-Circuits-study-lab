  // ================= chapters 5, 6, 8, 9: lessons, calculators, errors, orders =================
  function cpl(re, im, unit){
    var m = Math.sqrt(re * re + im * im), a = Math.atan2(im, re) * 180 / Math.PI;
    return nf(re, 2) + (im < 0 ? " − j" + nf(-im, 2) : " + j" + nf(im, 2)) + " " + unit + " = " + nf(m, 3) + "∠" + nf(a, 2) + "° " + unit;
  }
  function fmtC(c){ return c >= 1e-3 ? nf(c * 1e3, 3) + " mF" : c >= 1e-6 ? nf(c * 1e6, 3) + " μF" : c >= 1e-9 ? nf(c * 1e9, 3) + " nF" : nf(c * 1e12, 3) + " pF"; }

  LESSONS["5"] = [
    { t: "Superposition theorem", pts: ["In a linear circuit with several sources, each source is solved alone. The partial results are added.", "Turn a voltage source off by replacing it with a short circuit. Turn a current source off by replacing it with an open circuit.", "Add the partial currents with their signs. Power is not added this way."], f: ["I = I' + I'' + ..."], fig: function(){ return bankFig("5", 0); } },
    { t: "Thevenin's theorem", pts: ["A two-terminal linear network is replaced by V_TH in series with R_TH.", "Remove the load. V_TH is the open-circuit voltage V_ab.", "R_TH is the resistance seen from a and b with all sources turned off.", "Reconnect the load: I_L = V_TH / (R_TH + R_L)."], f: ["I_L = V_TH / (R_TH + R_L)"], fig: function(){ return bankFig("5", 2); } },
    { t: "Norton's theorem", pts: ["A two-terminal linear network is replaced by I_N in parallel with R_N.", "I_N is the short-circuit current between a and b. R_N = R_TH.", "It is the source conversion of Chapter 4 applied to the Thevenin circuit."], f: ["I_N = V_TH / R_TH", "I_L = I_N R_N / (R_N + R_L)"], fig: function(){ return bankFig("5", 4); } },
    { t: "Maximum power transfer", pts: ["The load receives the most power when R_L = R_TH.", "At that point the load voltage is V_TH / 2 and the efficiency is 50%.", "Smaller or larger loads receive less power."], f: ["P_max = V_TH² / (4 R_TH)"], fig: function(){ return bankFig("5", 7); } }
  ];
  LESSONS["6"] = [
    { t: "The capacitor", pts: ["Two plates separated by a dielectric store charge and an electric field. The unit of C is the farad (F).", "Charge, capacitance and voltage are linked by Q = C V.", "The stored energy is W = ½ C V²."], f: ["Q = C V", "W = ½ C V²"], fig: function(){ return bankFig("6", 2); } },
    { t: "What sets the capacitance", pts: ["C grows with the plate area A and the dielectric constant k.", "C falls as the gap d grows.", "Above the breakdown voltage the dielectric fails and conducts."], f: ["C = 8.85×10⁻¹² k A / d"], fig: function(){ return bankFig("6", 1); } },
    { t: "Capacitors in series and parallel", pts: ["Series: the charge is the same. C_eq is smaller than the smallest capacitor.", "Parallel: the voltage is the same. C_eq is the sum.", "The rules are the reverse of resistors."], f: ["Series: 1/C_eq = 1/C₁ + 1/C₂ + ...", "Parallel: C_eq = C₁ + C₂ + ..."], fig: function(){ return bankFig("6", 5); } },
    { t: "The inductor", pts: ["A coil stores energy in a magnetic field. The unit of L is the henry (H).", "Faraday's law: a changing current induces a voltage. Lenz's law: the voltage opposes the change.", "More turns and a magnetic core raise L."], f: ["v = L di/dt", "W = ½ L I²"], fig: function(){ return bankFig("6", 6); } },
    { t: "DC behaviour and combinations", pts: ["In DC steady state the capacitor is an open circuit. It blocks DC and passes AC.", "In DC steady state the inductor is a short circuit. It passes DC and opposes AC.", "Inductors in series add like resistors."], f: ["L_eq = L₁ + L₂ + ... (series)"], fig: function(){ return bankFig("6", 7); } }
  ];
  LESSONS["8"] = [
    { t: "The sine wave", pts: ["A sine function has three components: the peak V_m, the angular frequency ω and the phase angle ψ.", "The period T is the time of one cycle. The frequency f is the number of cycles per second (Hz).", "The peak-to-peak value is 2 V_m."], f: ["v(t) = V_m sin(ωt + ψ)", "f = 1 / T", "ω = 2π f"], fig: function(){ return bankFig("8", 1); } },
    { t: "Average and RMS value", pts: ["The average over a full cycle is zero. The half-cycle average is 0.637 V_m.", "The RMS value is the DC value that gives the same heating: V = 0.707 V_m.", "Meters and supply ratings use rms values (120 V rms has a peak of 170 V)."], f: ["V = V_m / √2", "V_avg = 2 V_m / π = 0.637 V_m"], fig: function(){ return bankFig("8", 2); } },
    { t: "Phase difference", pts: ["The phase difference φ is the difference of the two phase angles.", "If φ is positive, the first wave leads. If φ is negative, it lags.", "In phase means φ = 0°."], f: ["φ = ψ₁ − ψ₂"], fig: function(){ return bankFig("8", 3); } },
    { t: "Complex numbers and phasors", pts: ["A phasor holds the rms value and the phase angle: V∠ψ.", "Rectangular form a + jb suits addition. Polar form r∠θ suits multiplication and division.", "In a phasor diagram, a positive angle is counterclockwise."], f: ["r = √(a² + b²)", "θ = tan⁻¹(b / a)", "a = r cos θ, b = r sin θ"], fig: function(){ return bankFig("8", 6); } },
    { t: "Resistor, inductor and capacitor in AC", pts: ["Resistor: v and i are in phase.", "Inductor: v leads i by 90°. X_L = ω L.", "Capacitor: i leads v by 90°. X_C = 1 / (ω C).", "Reactance X is measured in ohms."], f: ["X_L = ω L = 2π f L", "X_C = 1 / (ω C)"], fig: function(){ return bankFig("8", 4); } }
  ];
  LESSONS["9"] = [
    { t: "Impedance", pts: ["Impedance Z = V / I is the AC counterpart of resistance. Z = R + jX.", "Z_R = R, Z_L = jX_L and Z_C = −jX_C.", "The net reactance is X = X_L − X_C. A positive X is inductive and a negative X is capacitive."], f: ["Z = R + j(X_L − X_C)", "|Z| = √(R² + X²), φ = tan⁻¹(X / R)"], fig: function(){ return bankFig("9", 0); } },
    { t: "Series and parallel impedances", pts: ["Series: add the impedances. Parallel: Z₁ Z₂ / (Z₁ + Z₂).", "The voltage and current divider rules keep the same form with phasors.", "Add in rectangular form. Multiply and divide in polar form."], f: ["Z_T = Z₁ + Z₂", "V₂ = V Z₂ / (Z₁ + Z₂)"], fig: function(){ return bankFig("9", 1); } },
    { t: "The impedance triangle", pts: ["R is the horizontal side, X the vertical side and |Z| the hypotenuse.", "The angle φ is the angle of Z. It is also the angle between v and i.", "The power factor is cos φ = R / |Z|."], f: ["cos φ = R / |Z|"], fig: function(){ return bankFig("9", 5); } },
    { t: "Active, reactive and apparent power", pts: ["Active power P (W) is the average power. Reactive power Q (var) moves back and forth. Apparent power S (VA) is V I with rms values.", "The complex power is S = P + jQ. |S| is the apparent power.", "The power triangle has P, Q and S as its sides."], f: ["P = S cos φ", "Q = S sin φ", "S = √(P² + Q²)"], fig: function(){ return bankFig("9", 6); } },
    { t: "Power factor and its correction", pts: ["The power factor is PF = cos φ = P / S. An inductive load has a lagging PF.", "A capacitor in parallel supplies Q_C and lowers the total Q. P stays the same.", "Slide 33: 4 kW at 120 V rms, 60 Hz and PF 0.8 lagging."], f: ["Q_C = P (tan φ₁ − tan φ₂)", "C = Q_C / (ω V²)"], fig: function(){ return bankFig("9", 4); } }
  ];

  TOOLS["5"] = [
    { name: "Thevenin and Norton",
      hint: "Example 5.4 circuit. E feeds R₁. R₂ and R₃ are in parallel across the output a and b.",
      fields: function(){ return fld("e", "E", "V", 48) + fld("r1", "R₁", "Ω", 12) + fld("r2", "R₂", "Ω", 12) + fld("r3", "R₃", "Ω", 12) + fld("rl", "R_L", "Ω", 8); },
      run: function(){
        var E = val("e"), R1 = val("r1"), R2 = val("r2"), R3 = val("r3"), RL = val("rl");
        if (!pos([E, R1, R2, R3, RL])) return bad("All values must be positive.");
        var p23 = R2 * R3 / (R2 + R3), VT = E * p23 / (R1 + p23), RT = 1 / (1 / R1 + 1 / R2 + 1 / R3), IN = VT / RT, IL = VT / (RT + RL);
        var s = line("Step 1. R_TH with E shorted") + line("R_TH = R₁ // R₂ // R₃ = " + fmt(RT, "Ω"));
        s += line("Step 2. V_TH = V_ab with R_L removed") + line("R₂ // R₃ = " + fmt(p23, "Ω")) + line("V_TH = E (R₂ // R₃) / (R₁ + R₂ // R₃) = " + fmt(VT, "V"));
        s += line("Step 3. Norton: I_N = V_TH / R_TH = " + fmt(IN, "A") + ", R_N = " + fmt(RT, "Ω"));
        s += line("Step 4. Load: I_L = V_TH / (R_TH + R_L) = " + fmt(VT, "V") + " / " + fmt(RT + RL, "Ω"));
        s += line(res("I_L = " + fmt(IL, "A")));
        s += line(ok("Check with Norton: I_N R_N / (R_N + R_L) = " + fmt(IN * RT / (RT + RL), "A") + (close(IL, IN * RT / (RT + RL)) ? " ✓" : "")));
        return { fig: figThev("E = " + fmt(E, "V"), "R_1 = " + fmt(R1, "Ω"), "R_2 = " + fmt(R2, "Ω"), "R_3 = " + fmt(R3, "Ω"), "R_L = " + fmt(RL, "Ω"), false), steps: s };
      } },
    { name: "Maximum power transfer",
      hint: "Enter the Thevenin equivalent and a load. The result is compared with the matched load.",
      fields: function(){ return fld("v", "V_TH", "V", 16) + fld("rt", "R_TH", "Ω", 4) + fld("rl", "R_L", "Ω", 8); },
      run: function(){
        var V = val("v"), Rt = val("rt"), RL = val("rl");
        if (!pos([V, Rt, RL])) return bad("All values must be positive.");
        var I = V / (Rt + RL), PL = I * I * RL, Pm = V * V / (4 * Rt), eff = RL / (Rt + RL);
        var s = line("I = V_TH / (R_TH + R_L) = " + fmt(V, "V") + " / " + fmt(Rt + RL, "Ω") + " = " + fmt(I, "A")) + line(res("P_L = I² R_L = " + fmt(PL, "W")));
        s += line("Matched load: R_L = R_TH = " + fmt(Rt, "Ω")) + line(res("P_max = V_TH² / (4 R_TH) = " + fmt(Pm, "W")));
        s += line("This load receives " + nf(100 * PL / Pm, 3) + "% of P_max.");
        s += line(ok("Check: P_L + P_RTH = " + fmt(PL + I * I * Rt, "W") + ", source power V_TH I = " + fmt(V * I, "W") + (close(PL + I * I * Rt, V * I) ? " ✓" : "")));
        return { fig: figThevEq("V_TH = " + fmt(V, "V"), "R_TH = " + fmt(Rt, "Ω"), "R_L = " + fmt(RL, "Ω")), steps: s };
      } }
  ];
  TOOLS["6"] = [
    { name: "Capacitance, charge and energy",
      hint: "Enter the plate area, the gap, k and the voltage. C, Q and W are calculated.",
      fields: function(){ return fld("a", "A", "m²", 0.004) + fld("d", "d", "m", 0.006) + fld("k", "k", "", 5) + fld("v", "V", "V", 15); },
      run: function(){
        var A = val("a"), d = val("d"), k = val("k"), V = val("v");
        if (!pos([A, d, k, V])) return bad("All values must be positive.");
        var C = 8.85e-12 * k * A / d, Q = C * V, W = 0.5 * C * V * V;
        var s = line("C = 8.85×10⁻¹² k A / d = 8.85×10⁻¹² × " + k + " × " + A + " / " + d) + line(res("C = " + fmtC(C))) + line("Q = C V = " + fmtC(C) + " × " + fmt(V, "V") + " = " + fmt(Q, "C")) + line(res("W = ½ C V² = " + fmt(W, "J")));
        s += line(ok("Check: W = ½ Q V = " + fmt(0.5 * Q * V, "J") + (close(W, 0.5 * Q * V) ? " ✓" : "")));
        return { fig: figCapLoop("E = " + fmt(V, "V"), "C = " + fmtC(C)), steps: s };
      } },
    { name: "Capacitors in series and parallel",
      hint: "Three capacitors and a source voltage. Both connections are shown.",
      fields: function(){ return fld("c1", "C₁", "F", 100, 1e-6) + fld("c2", "C₂", "F", 100, 1e-6) + fld("c3", "C₃", "F", 100, 1e-6) + fld("e", "E", "V", 25); },
      run: function(){
        var C = [val("c1"), val("c2"), val("c3")], E = val("e");
        if (!pos(C.concat([E]))) return bad("All values must be positive.");
        var cs = 1 / (1 / C[0] + 1 / C[1] + 1 / C[2]), cp = C[0] + C[1] + C[2], Qs = cs * E, Qp = cp * E;
        var s = line("Series") + line("C_eq = 1 / (1/C₁ + 1/C₂ + 1/C₃) = " + fmtC(cs)) + line("Q = C_eq E = " + fmt(Qs, "C") + " on every capacitor") + line("V₁ = Q / C₁ = " + fmt(Qs / C[0], "V") + ", V₂ = " + fmt(Qs / C[1], "V") + ", V₃ = " + fmt(Qs / C[2], "V"));
        s += line(ok("Check KVL: " + fmt(Qs / C[0] + Qs / C[1] + Qs / C[2], "V") + " = E ✓"));
        s += line("Parallel") + line("C_eq = C₁ + C₂ + C₃ = " + fmtC(cp)) + line("Q_total = C_eq E = " + fmt(Qp, "C"));
        return { fig: figCapsSeries("E = " + fmt(E, "V"), ["C_1 " + fmtC(C[0]), "C_2 " + fmtC(C[1]), "C_3 " + fmtC(C[2])]), steps: s };
      } },
    { name: "Inductor",
      hint: "Enter L, the current change over a time and the steady current. The voltage and energy are calculated.",
      fields: function(){ return fld("l", "L", "H", 0.2) + fld("di", "Δi", "A", 4) + fld("dt", "Δt", "s", 0.1) + fld("i", "I (steady)", "A", 2); },
      run: function(){
        var L = val("l"), di = val("di"), dt = val("dt"), I = val("i");
        if (!pos([L, dt])) return bad("L and Δt must be positive.");
        var v = L * di / dt, W = 0.5 * L * I * I;
        var s = line("v = L Δi / Δt = " + fmt(L, "H") + " × " + fmt(di, "A") + " / " + fmt(dt, "s")) + line(res("v = " + fmt(v, "V"))) + line(res("W = ½ L I² = ½ × " + fmt(L, "H") + " × (" + fmt(I, "A") + ")² = " + fmt(W, "J")));
        s += line("In DC steady state di/dt = 0, so v = 0 and the inductor acts as a short circuit.");
        return { fig: svg(rect(XL, XR, YT, YB, { l: [B("E")], t: [{ t: "ind", c: 190, lab: "L = " + fmt(L, "H"), side: "t" }], r: [{ t: "r", c: YM, lab: "R", side: "l" }] })), steps: s };
      } }
  ];
  TOOLS["8"] = [
    { name: "Sine wave",
      hint: "Enter V_m, f and the phase angle ψ. Time t gives the instantaneous value.",
      fields: function(){ return fld("vm", "V_m", "V", 170) + fld("f", "f", "Hz", 60) + fld("psi", "ψ", "°", 0) + fld("t", "t", "s", 0.002); },
      run: function(){
        var Vm = val("vm"), f = val("f"), psi = val("psi"), t = val("t");
        if (!pos([Vm, f])) return bad("V_m and f must be positive.");
        var T = 1 / f, w = 2 * Math.PI * f, v = Vm * Math.sin(w * t + psi * Math.PI / 180);
        var s = line("T = 1 / f = " + fmt(T, "s")) + line("ω = 2π f = " + nf(w, 4) + " rad/s") + line(res("V (rms) = V_m / √2 = " + fmt(Vm / Math.SQRT2, "V"))) + line("V_avg (half cycle) = 0.637 V_m = " + fmt(0.637 * Vm, "V")) + line("V_pp = 2 V_m = " + fmt(2 * Vm, "V"));
        s += line(res("v(t) = V_m sin(ωt + ψ) = " + fmt(v, "V") + " at t = " + fmt(t, "s")));
        return { fig: waveFig({ waves: [{ lab: "v(t)", ph: -psi }], T: "V_m = " + fmt(Vm, "V") + ", f = " + fmt(f, "Hz") }), steps: s };
      } },
    { name: "Reactance and AC response",
      hint: "Enter f, L, C and the rms voltage. The reactances and the rms currents are calculated.",
      fields: function(){ return fld("f", "f", "Hz", 60) + fld("l", "L", "H", 0.2) + fld("c", "C", "F", 5, 1e-6) + fld("v", "V (rms)", "V", 6); },
      run: function(){
        var f = val("f"), L = val("l"), C = val("c"), V = val("v");
        if (!pos([f, L, C, V])) return bad("All values must be positive.");
        var w = 2 * Math.PI * f, XLv = w * L, XCv = 1 / (w * C);
        var s = line("ω = 2π f = " + nf(w, 4) + " rad/s") + line(res("X_L = ω L = " + fmt(XLv, "Ω"))) + line(res("X_C = 1 / (ω C) = " + fmt(XCv, "Ω")));
        s += line("Inductor: I = V / X_L = " + fmt(V / XLv, "A") + ", the current lags v by 90°.") + line("Capacitor: I = V / X_C = " + fmt(V / XCv, "A") + ", the current leads v by 90°.");
        s += line(ok("Check: X_L grows with f and X_C falls with f. Here X_L " + (XLv > XCv ? ">" : "<") + " X_C."));
        return { fig: figAC("V = " + fmt(V, "V"), "ind", "L = " + fmt(L, "H")), steps: s };
      } }
  ];
  TOOLS["9"] = [
    { name: "Series impedance",
      hint: "Enter R, X_L, X_C and the rms voltage. Z, the current and the powers are calculated.",
      fields: function(){ return fld("r", "R", "Ω", 1.5) + fld("xl", "X_L", "Ω", 2.5) + fld("xc", "X_C", "Ω", 3) + fld("v", "V (rms)", "V", 10); },
      run: function(){
        var R = val("r"), XLv = val("xl"), XCv = val("xc"), V = val("v");
        if (!pos([R, V]) || !isFinite(XLv) || !isFinite(XCv) || XLv < 0 || XCv < 0) return bad("R and V must be positive. X_L and X_C must be zero or more.");
        var X = XLv - XCv, Z = Math.sqrt(R * R + X * X), phi = Math.atan2(X, R) * 180 / Math.PI, I = V / Z, P = I * I * R, Q = I * I * X, S = V * I;
        var s = line("X = X_L − X_C = " + fmt(XLv, "Ω") + " − " + fmt(XCv, "Ω") + " = " + fmt(X, "Ω")) + line(res("Z = " + cpl(R, X, "Ω"))) + line("The circuit is " + (X > 0 ? "inductive (current lags)." : X < 0 ? "capacitive (current leads)." : "purely resistive."));
        s += line("I = V / |Z| = " + fmt(V, "V") + " / " + fmt(Z, "Ω") + " = " + fmt(I, "A")) + line("PF = cos φ = R / |Z| = " + nf(R / Z, 3) + (X > 0 ? " lagging" : X < 0 ? " leading" : ""));
        s += line(res("P = I² R = " + fmt(P, "W") + ", Q = I² X = " + nf(Q, 4) + " var, S = V I = " + fmt(S, "VA")));
        s += line(ok("Check: √(P² + Q²) = " + fmt(Math.sqrt(P * P + Q * Q), "VA") + (close(Math.sqrt(P * P + Q * Q), S) ? " ✓" : "")));
        return { fig: figRLCser("R = " + fmt(R, "Ω"), "X_L = " + fmt(XLv, "Ω"), "X_C = " + fmt(XCv, "Ω")), steps: s };
      } },
    { name: "Power factor correction",
      hint: "Slide 33 values are filled in. Enter P, V, f, the old and the new lagging power factor.",
      fields: function(){ return fld("p", "P", "W", 4000) + fld("v", "V (rms)", "V", 120) + fld("f", "f", "Hz", 60) + fld("pf1", "PF old", "", 0.8) + fld("pf2", "PF new", "", 0.95); },
      run: function(){
        var P = val("p"), V = val("v"), f = val("f"), p1 = val("pf1"), p2 = val("pf2");
        if (!pos([P, V, f]) || !(p1 > 0 && p1 < 1 && p2 > 0 && p2 < 1)) return bad("P, V and f must be positive. Power factors must be between 0 and 1.");
        if (p2 <= p1) return bad("The new power factor must be larger than the old one.");
        var Q1 = P * Math.tan(Math.acos(p1)), Q2 = P * Math.tan(Math.acos(p2)), Qc = Q1 - Q2, w = 2 * Math.PI * f, C = Qc / (w * V * V), S1 = P / p1, S2 = P / p2;
        var s = line("Before: S₁ = P / PF = " + fmt(S1, "VA") + ", Q₁ = P tan(cos⁻¹ " + p1 + ") = " + nf(Q1, 4) + " var") + line("After: S₂ = " + fmt(S2, "VA") + ", Q₂ = P tan(cos⁻¹ " + p2 + ") = " + nf(Q2, 4) + " var");
        s += line("Q_C = Q₁ − Q₂ = " + nf(Qc, 4) + " var") + line("ω = 2π f = " + nf(w, 4) + " rad/s") + line(res("C = Q_C / (ω V²) = " + fmtC(C)));
        s += line("Line current falls from " + fmt(S1 / V, "A") + " to " + fmt(S2 / V, "A") + ".");
        s += line(ok("Check: √(P² + Q₂²) = " + fmt(Math.sqrt(P * P + Q2 * Q2), "VA") + " = S₂ ✓"));
        return { fig: figPFC(), steps: s };
      } }
  ];

  ERRORS["5"] = [
    { fig: function(){ return bankFig("5", 0); }, say: "To turn off a voltage source, replace it with an open circuit.", ask: "What is wrong?", opts: ["Nothing is wrong.", "A voltage source is replaced by a short circuit. A current source is replaced by an open circuit.", "Voltage sources are replaced by a 1 Ω resistor.", "Voltage sources are never turned off."], ok: 1, why: "A zero-volt source is a wire, so it becomes a short circuit. A zero-amp source is a break, so it becomes an open circuit." },
    { fig: function(){ return bankFig("5", 1); }, say: "R_TH = 12 + 12 + 12 = 36 Ω, because the resistors are added.", ask: "What is wrong?", opts: ["Nothing is wrong.", "R_TH must be 12 Ω.", "With E shorted, the three resistors are in parallel seen from a and b: R_TH = 12 / 3 = 4 Ω.", "R_TH is the open-circuit voltage."], ok: 2, why: "Shorting E puts R₁ across the terminals in parallel with R₂ and R₃. Check: 4 Ω is smaller than 12 Ω, as a parallel value must be." },
    { fig: function(){ return bankFig("5", 3); }, say: "I_L = V_TH / R_L = 16 / 8 = 2 A.", ask: "What is wrong?", opts: ["R_TH is missing in the loop: I_L = 16 / (4 + 8) = 1.33 A.", "V_TH must be 48 V.", "The load must be in parallel with V_TH.", "Nothing is wrong."], ok: 0, why: "The load is in series with both V_TH and R_TH. The loop resistance is 4 + 8 = 12 Ω." },
    { fig: function(){ return bankFig("5", 6); }, say: "Maximum power is delivered when R_L is as small as possible, R_L = 0.", ask: "What is wrong?", opts: ["Maximum power needs R_L as large as possible.", "Nothing is wrong.", "Maximum power is delivered when R_L = R_TH. At R_L = 0 the load power is zero.", "Maximum power needs R_L = 2 R_TH."], ok: 2, why: "At R_L = 0 the load voltage is zero, so P = 0. The peak is at R_L = R_TH." }
  ];
  ERRORS["6"] = [
    { fig: function(){ return bankFig("6", 3); }, say: "Four 100 μF capacitors in series give C_eq = 400 μF.", ask: "What is wrong?", opts: ["Nothing is wrong.", "In series C_eq = 1 / (4 / 100 μF) = 25 μF. The sum belongs to parallel.", "C_eq must be 100 μF.", "C_eq must be 4 μF."], ok: 1, why: "Series capacitors give a value smaller than the smallest one. Check: 25 μF < 100 μF." },
    { fig: function(){ return bankFig("6", 2); }, say: "W = C V² = 2.2 μF × (15 V)² = 495 μJ.", ask: "What is wrong?", opts: ["The energy has no factor ½.", "The energy is W = ½ C V² = 247.5 μJ.", "V must not be squared.", "The unit must be farads."], ok: 1, why: "The stored energy is ½ C V². The missing ½ doubles the answer." },
    { fig: function(){ return bankFig("6", 7); }, say: "In DC steady state the capacitor is a short circuit and the inductor is an open circuit.", ask: "What is wrong?", opts: ["Nothing is wrong.", "Both are open circuits.", "Both are short circuits.", "It is the reverse: the capacitor is open (it blocks DC) and the inductor is a short (it passes DC)."], ok: 3, why: "A charged capacitor has i = C dv/dt = 0. A steady current gives v = L di/dt = 0." },
    { fig: function(){ return bankFig("6", 1); }, say: "The gap d is halved, so C is halved.", ask: "What is wrong?", opts: ["C does not depend on d.", "C is inversely proportional to d, so halving d doubles C.", "C becomes four times larger.", "Nothing is wrong."], ok: 1, why: "C = 8.85×10⁻¹² k A / d. A smaller gap puts the plates closer and stores more charge per volt." }
  ];
  ERRORS["8"] = [
    { fig: function(){ return bankFig("8", 2); }, say: "A supply of V_m = 170 V has an rms value of 170 × 2 = 340 V.", ask: "What is wrong?", opts: ["Nothing is wrong.", "The RMS value is V_m / √2 = 120.2 V.", "The RMS value is V_m / 2 = 85 V.", "The RMS value is V_m."], ok: 1, why: "RMS = 0.707 V_m. The rms value is always smaller than the peak." },
    { fig: function(){ return bankFig("8", 3); }, say: "v = V_m sin(ωt + 30°) and i = I_m sin(ωt − 20°), so i leads v by 10°.", ask: "What is wrong?", opts: ["Nothing is wrong.", "The angles are subtracted as 30° − 20°, which gives 10°.", "The phase difference is 30° − (−20°) = 50°, and v leads i.", "i leads by 50°."], ok: 2, why: "Subtract with the signs: φ = ψ_v − ψ_i = 30° − (−20°) = 50°. A positive φ means v leads." },
    { fig: function(){ return bankFig("8", 4); }, say: "L = 0.2 H at ω = 60 rad/s gives X_L = 1 / (ω L) = 0.083 Ω.", ask: "What is wrong?", opts: ["X_L = ω L = 12 Ω. The reciprocal belongs to the capacitor.", "X_L = L / ω.", "Nothing is wrong.", "X_L = ω / L."], ok: 0, why: "Inductive reactance grows with frequency: X_L = ω L = 60 × 0.2 = 12 Ω." },
    { fig: function(){ return bankFig("8", 5); }, say: "In a capacitor, the voltage leads the current by 90°.", ask: "What is wrong?", opts: ["Nothing is wrong.", "The current leads the voltage by 90° in a capacitor (ICE).", "They are in phase.", "The voltage leads by 180°."], ok: 1, why: "ELI the ICE man: in L the voltage E leads I, in C the current I leads E." }
  ];
  ERRORS["9"] = [
    { fig: function(){ return bankFig("9", 0); }, say: "Z = R + j(X_L + X_C) = 1.5 + j5.5 Ω.", ask: "What is wrong?", opts: ["Nothing is wrong.", "R must be removed.", "The reactances oppose each other: X = X_L − X_C = 2.5 − 3 = −0.5 Ω.", "Both reactances are negative."], ok: 2, why: "Z_L = +jX_L and Z_C = −jX_C. Their sum is X_L − X_C. Z = 1.5 − j0.5 Ω is capacitive." },
    { fig: function(){ return bankFig("9", 3); }, say: "S_T = P_T + Q_T = 60 + 55 = 115 VA.", ask: "What is wrong?", opts: ["P and Q are at 90° to each other: S = √(60² + 55²) = 81.39 VA.", "S must be 60 VA.", "Nothing is wrong.", "S must be 55 VA."], ok: 0, why: "P and Q are the sides of the power triangle. Add them as a right triangle, not as plain numbers." },
    { fig: function(){ return bankFig("9", 4); }, say: "To correct a lagging power factor, an inductor is placed in parallel with the load.", ask: "What is wrong?", opts: ["Nothing is wrong.", "A resistor must be used.", "A capacitor is placed in parallel. It supplies reactive power and lowers the total Q.", "A battery must be used."], ok: 2, why: "The load is inductive, so Q is positive. The capacitor gives Q_C of the opposite sign. P does not change." },
    { fig: function(){ return bankFig("9", 5); }, say: "Z = 3 + j4 Ω has |Z| = 3 + 4 = 7 Ω.", ask: "What is wrong?", opts: ["Nothing is wrong.", "|Z| must be 4 Ω.", "|Z| must be 12 Ω.", "|Z| = √(3² + 4²) = 5 Ω. R and X are the sides of a right triangle."], ok: 3, why: "The magnitude is the hypotenuse of the impedance triangle. Check: 5 Ω < 7 Ω." }
  ];

  ORDERS["5"] = [
    { t: "Example 5.4: find I_L with Thevenin (E = 48 V, three 12 Ω, R_L = 8 Ω)", steps: ["Remove R_L and mark the terminals a and b.", "Short E and find R_TH = 12 // 12 // 12 = 4 Ω.", "Restore E and find V_TH = 48 × 6 / 18 = 16 V.", "Draw the Thevenin circuit and reconnect R_L = 8 Ω.", "I_L = 16 / (4 + 8) = 1.33 A."] },
    { t: "Superposition with two sources", steps: ["Keep source 1. Replace source 2 with a short circuit (voltage source).", "Find the partial current I' in the wanted branch.", "Keep source 2. Replace source 1 with a short circuit.", "Find the partial current I'' in the same branch.", "Add with signs: I = I' + I''."] }
  ];
  ORDERS["6"] = [
    { t: "Example 6.6: find C_eq of the capacitor network", steps: ["Combine C₄ and C₅ in series: 0.5 × 2 / 2.5 = 0.4 μF.", "Add the parallel group: 2 + 0.6 + 0.4 = 3 μF.", "Combine with C₁ in series: 6 × 3 / 9.", "C_eq = 2 μF."] },
    { t: "Example 6.3: find the energy in a 2.2 μF capacitor at 15 V", steps: ["Choose the formula: W = ½ C V².", "Put in the values: ½ × 2.2 μF × (15 V)².", "Square the voltage: 225 V².", "W = 247.5 μJ."] }
  ];
  ORDERS["8"] = [
    { t: "Find the rms value and the instantaneous value of v = 170 sin ωt at 30°", steps: ["Read the peak: V_m = 170 V.", "RMS value: V = 170 / √2 = 120.2 V.", "Put ωt = 30° in the equation.", "v = 170 sin 30° = 85 V."] },
    { t: "Example 8.11: find X_L and I for L = 0.2 H, ω = 60 rad/s, V = 6∠35° V", steps: ["X_L = ω L = 60 × 0.2 = 12 Ω.", "Write the impedance: Z_L = j12 Ω = 12∠90° Ω.", "I = V / Z_L = 6∠35° / 12∠90°.", "I = 0.5∠−55° A. The current lags v by 90°."] }
  ];
  ORDERS["9"] = [
    { t: "Example 9.1: find Z of the series RLC circuit", steps: ["Read R = 1.5 Ω, X_L = 2.5 Ω and X_C = 3 Ω.", "Find the net reactance: X = 2.5 − 3 = −0.5 Ω.", "Write Z = 1.5 − j0.5 Ω.", "Convert: |Z| = 1.58 Ω, φ = −18.44°.", "X is negative, so the circuit is capacitive."] },
    { t: "Slide 33: correct the power factor of 4 kW, 120 V, 60 Hz from 0.8 to 0.95", steps: ["Find Q₁ = 4000 × tan(cos⁻¹ 0.8) = 3000 var.", "Find Q₂ = 4000 × tan(cos⁻¹ 0.95) = 1315 var.", "Q_C = Q₁ − Q₂ = 1685 var.", "ω = 2π × 60 = 377 rad/s.", "C = Q_C / (ω V²) = 1685 / (377 × 120²) = 310 μF."] }
  ];
