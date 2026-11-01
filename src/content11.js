  // ================= Chapter 11 (transformers) and Motors: lessons and calculators =================
  LESSONS["11"] = [
    { t: "The transformer", pts: ["Two coils share one core. A changing current in the primary coil changes the flux, and the flux induces a voltage in the secondary coil (mutual inductance).", "The primary is connected to the source. The secondary is connected to the load Z_L.", "Air-core transformers are used in high-frequency circuits (instruments, radio, TV). Iron-core transformers are used in audio circuits and power systems."], fig: function(){ return bankFig("11", 5); } },
    { t: "The ideal transformer", pts: ["An ideal transformer has full coupling (k = 1), no winding resistance and no magnetic loss. An iron-core transformer is close to ideal.", "The book defines the turns ratio as n = N_S / N_P.", "The input power equals the output power: V_P I_P = V_S I_S.", "The load seen from the primary is the reflected impedance Z_P = Z_L / n²."], f: ["n = N_S / N_P = V_S / V_P = I_P / I_S", "Z_P = Z_L / n²"], fig: function(){ return bankFig("11", 0); } },
    { t: "Step-up and step-down transformers", pts: ["Step-up: N_S > N_P, n > 1, V_S > V_P.", "Step-down: N_S < N_P, n < 1, V_S < V_P.", "Power stations step the voltage up for transmission. A higher voltage carries the same power with less current, so the I² R_w loss in the lines falls. Local stations step it down again."], f: ["V_S = n V_P", "I_S = I_P / n"], fig: function(){ return bankFig("11", 3); } },
    { t: "Other types of transformers", pts: ["Center-tapped: a tap in the middle of the secondary gives two equal output voltages.", "Multiple-tapped: several taps give several output voltages.", "Adjustable (variable): the output voltage can be set from zero to the maximum.", "Auto-transformer: one winding serves as both primary and secondary. It is smaller and lighter."] },
    { t: "Impedance matching", pts: ["Maximum power reaches the load when Z_L = Z_S (Chapter 5 for AC).", "When the load does not match the source, a transformer with the right turns ratio is placed between them.", "Example 11.3: a 100 Ω amplifier and a 4 Ω speaker need n = 1/5."], f: ["n = √(Z_L / Z_P)"], fig: function(){ return bankFig("11", 4); } }
  ];
  LESSONS["M"] = [
    { t: "How a DC motor works", pts: ["A wire carrying a current in a magnetic field feels a force normal to the plane of the field and the current (F = I × B on the slide).", "The rotor (armature) carries the current-carrying windings and turns the shaft. The stator makes the fixed magnetic field with permanent magnets or electromagnets.", "In a brushed motor, graphite brushes feed current to the rotating coil through the commutator. When the armature becomes horizontal, the commutator reverses the connection and the rotation continues."] },
    { t: "Types of brushed DC motors", pts: ["Permanent magnet (PM): stator of permanent magnets, rotor of coils. Linear torque-speed line. Used in wipers, toys, toothbrushes, mixers and portable drills.", "Series-wound: field and armature in series. Very large torque at low speed, for example elevators, trolley cars, conveyors and locomotives. It must not run without load, because the speed rises out of control.", "Shunt-wound: field and armature in parallel. Almost constant speed with varying load, for example fans, blowers and machine tools.", "Compound-wound: both series and shunt fields. High starting torque and a controlled no-load speed, for example punch presses and cranes."], fig: function(){ return bankFig("M", 4); } },
    { t: "The PM DC motor model", pts: ["The coil is a resistor R in series with the back EMF. The inductance is neglected.", "The torque is proportional to the current. The back EMF is proportional to the speed.", "Together they give a straight torque-speed line: T = T_s − α ω."], f: ["I = (V_in − V_bemf) / R", "T = K_T I", "V_bemf = K_E ω", "T_s = K_T V_in / R, α = K_T K_E / R"], fig: function(){ return bankFig("M", 0); } },
    { t: "Torque-speed curve, power and efficiency", pts: ["No load (T = 0): ω_NL = V_in / K_E. Stall (ω = 0): T_stall = K_T V_in / R.", "The mechanical power P = T ω is largest at half the no-load speed, where T = T_stall / 2.", "K_T = K_E when K_T is in N·m/A and K_E in V/(rad/s).", "Example in the file: 1000 rpm and 100 mA at no load, 100 in·oz and 260 mA at stall."], f: ["η = P_mech / P_elec = T ω / (V I)"], fig: function(){ return bankFig("M", 2); } },
    { t: "AC motors", pts: ["The AC induction motor is the most widely used motor. It is efficient, needs little maintenance and costs little. The rotor gets its power by induction, with no brushes.", "Three-phase power comes from a generator with three windings spaced 120° apart. One end of each coil goes to the neutral N, the other ends are the phases A, B and C.", "The stator field rotates and pulls the rotor along. AC motors are by nature constant-speed machines.", "Torque-speed curve: the speed changes little over a wide load range. At the pull-out torque the torque drops sharply."] }
  ];

  TOOLS["11"] = [
    { name: "Ideal transformer",
      hint: "Example 11.1 values are filled in. The book uses n = N_S / N_P.",
      fields: function(){ return fld("np", "N_P", "turns", 40) + fld("ns", "N_S", "turns", 100) + fld("vp", "V_P", "V", 50) + fld("ip", "I_P", "A", 5) + fld("zl", "Z_L", "Ω", 2); },
      run: function(){
        var Np = val("np"), Ns = val("ns"), Vp = val("vp"), Ip = val("ip"), Zl = val("zl");
        if (!pos([Np, Ns, Vp, Ip, Zl])) return bad("All values must be positive.");
        var n = Ns / Np, Vs = n * Vp, Is = Ip / n, Zp = Zl / (n * n);
        var s = line("n = N_S / N_P = " + nf(Ns) + " / " + nf(Np) + " = " + nf(n, 4) + (n > 1 ? " (step-up)" : n < 1 ? " (step-down)" : " (1:1)")) + line(res("V_S = n V_P = " + fmt(Vs, "V"))) + line(res("I_S = I_P / n = " + fmt(Is, "A"))) + line(res("Z_P = Z_L / n² = " + fmt(Zp, "Ω")));
        s += line("P_P = V_P I_P = " + fmt(Vp * Ip, "W")) + line(ok("Check: P_S = V_S I_S = " + fmt(Vs * Is, "W") + (close(Vp * Ip, Vs * Is) ? " ✓" : "")));
        return { fig: figXfmr("V_P = " + fmt(Vp, "V"), "N_P = " + nf(Np), "N_S = " + nf(Ns), "Z_L = " + fmt(Zl, "Ω"), "I_P = " + fmt(Ip, "A")), steps: s };
      } },
    { name: "Impedance matching",
      hint: "Example 11.3 values are filled in. The turns ratio makes the load look equal to the source resistance.",
      fields: function(){ return fld("zs", "Z_S (source)", "Ω", 100) + fld("zl", "Z_L (load)", "Ω", 4) + fld("e", "E (source)", "V", 10); },
      run: function(){
        var Zs = val("zs"), Zl = val("zl"), E = val("e");
        if (!pos([Zs, Zl, E])) return bad("All values must be positive.");
        var n = Math.sqrt(Zl / Zs), Pd = E * E * Zl / Math.pow(Zs + Zl, 2), Pm = E * E / (4 * Zs);
        var s = line("Matched when Z_P = Z_S, so n = √(Z_L / Z_S) = √(" + nf(Zl) + " / " + nf(Zs) + ")") + line(res("n = " + nf(n, 4) + (n < 1 ? " = 1/" + nf(1 / n, 3) : "")));
        s += line("Direct connection: P_L = E² Z_L / (Z_S + Z_L)² = " + fmt(Pd, "W")) + line(res("With the transformer: P_L = E² / (4 Z_S) = " + fmt(Pm, "W")));
        s += line(ok("Check: Z_L / n² = " + fmt(Zl / (n * n), "Ω") + " = Z_S ✓"));
        return { fig: figMatch("n = " + nf(n, 3)), steps: s };
      } }
  ];
  TOOLS["M"] = [
    { name: "PM DC motor",
      hint: "K_T = K_E = K in SI units. Enter the speed to find the operating point.",
      fields: function(){ return fld("v", "V_in", "V", 12) + fld("r", "R", "Ω", 2) + fld("k", "K", "N·m/A", 0.05) + fld("w", "ω", "rad/s", 120); },
      run: function(){
        var V = val("v"), R = val("r"), K = val("k"), w = val("w");
        if (!pos([V, R, K]) || !(w >= 0)) return bad("V_in, R and K must be positive. ω must be zero or more.");
        var wnl = V / K, Ts = K * V / R;
        if (w > wnl) return bad("ω is above the no-load speed " + nf(wnl, 4) + " rad/s.");
        var Eb = K * w, I = (V - Eb) / R, T = K * I, Pm = T * w, Pe = V * I;
        var s = line("V_bemf = K_E ω = " + fmt(Eb, "V")) + line("I = (V_in − V_bemf) / R = " + fmt(I, "A")) + line(res("T = K_T I = " + nf(T, 4) + " N·m"));
        s += line("No-load speed ω_NL = V_in / K_E = " + nf(wnl, 4) + " rad/s (" + nf(wnl * 60 / (2 * Math.PI), 4) + " rpm)") + line("Stall torque T_stall = K_T V_in / R = " + nf(Ts, 4) + " N·m");
        s += line(res("P_mech = T ω = " + fmt(Pm, "W") + ", P_elec = V I = " + fmt(Pe, "W") + ", η = " + nf(Pe ? 100 * Pm / Pe : 0, 3) + "%"));
        s += line("Maximum power at ω = ω_NL / 2 = " + nf(wnl / 2, 4) + " rad/s: P_max = " + fmt(Ts * wnl / 4, "W"));
        s += line(ok("Check: T = T_s − α ω = " + nf(Ts - K * K / R * w, 4) + " N·m" + (close(T, Ts - K * K / R * w) ? " ✓" : "")));
        return { fig: figMotor("V_in = " + fmt(V, "V"), "R = " + fmt(R, "Ω"), "V_bemf = " + fmt(Eb, "V"), "I = " + fmt(I, "A")), steps: s };
      } },
    { name: "Torque-speed line",
      hint: "Read T_stall and ω_NL from a datasheet line. The load torque gives the speed. The file example is filled in.",
      fields: function(){ return fld("ts", "T_stall", "in·oz", 100) + fld("wn", "ω_NL", "rpm", 1000) + fld("t", "T (load)", "in·oz", 20); },
      run: function(){
        var Ts = val("ts"), wn = val("wn"), T = val("t");
        if (!pos([Ts, wn]) || !(T >= 0) || T > Ts) return bad("T_stall and ω_NL must be positive, and 0 ≤ T ≤ T_stall.");
        var w = wn * (1 - T / Ts);
        var s = line("ω = ω_NL (1 − T / T_stall) = " + nf(wn) + " × (1 − " + nf(T) + " / " + nf(Ts) + ")") + line(res("ω = " + nf(w, 4) + " rpm"));
        s += line("Maximum power at T = T_stall / 2 = " + nf(Ts / 2) + " and ω = ω_NL / 2 = " + nf(wn / 2) + " rpm");
        s += line(ok("Check: the point lies on the straight line between (0, T_stall) and (ω_NL, 0) ✓"));
        return { fig: figTS(nf(Ts) + " in·oz", nf(wn) + " rpm", nf(T) + " in·oz"), steps: s };
      } }
  ];
