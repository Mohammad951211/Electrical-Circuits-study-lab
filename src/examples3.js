// ================= worked examples for chapters 8, 9 and 11: the slide examples and extra examples on the same topics =================
// Slide examples keep the book number (8.1, 9.5, 11.3). Extra examples are written for the course (ids X1xx).
(function(){
  function add(ch, id, topic, t, q, given, find, idea, steps, ans, fig){
    var e = { id: id, topic: topic, t: t, q: q, given: given, find: find, steps: [idea].concat(steps), ans: ans, ideaDone: true };
    if (fig) e.fig = fig; EXAMPLES[ch].push(e);
  }
  // triangle drawing for impedance and power triangles
  function fTri(h, v, hyp, ang){
    var x0 = 100, y0 = 118, x1 = 270, y1 = 42;
    return svg(P.w([[x0, y0], [x1, y0], [x1, y1], [x0, y0]]) + P.w([[x1 - 12, y0], [x1 - 12, y0 - 12], [x1, y0 - 12]]) +
      P.t((x0 + x1) / 2, y0 + 17, h, "middle", "acc") + P.t(x1 + 8, (y0 + y1) / 2 + 4, v, "start", "acc") + P.t((x0 + x1) / 2 - 22, (y0 + y1) / 2 - 8, hyp, "end", "acc") + P.t(x0 + 36, y0 - 6, ang, "start"));
  }
  function loopAC(lab, el, I){
    return svg(rect(XL, XR, YT, YB, { l: [{ t: "acs", c: YM, lab: lab, side: "r", off: 20 }], r: [el] }) + (I ? P.arr(150, 26, 200, 26, I, 175, 20) : ""));
  }

  // ---------------- chapter 8 ----------------
  add("8", "8.1", "The sine wave", "Peak, phase and frequency of a sine voltage", "Given v(t) = 6 sin(25t − 30°) V, determine its peak voltage, phase angle and frequency, and plot its waveform.",
    "v(t) = 6 sin(25t − 30°) V", "V_m, ψ, f, T",
    "Idea: compare v(t) with the general form v = V_m sin(ωt + ψ). The number in front of sin is V_m, the number in front of t is ω, and the angle is ψ.",
    ["Peak value: V_m = 6 V.", "Phase: ψ = −30°. Because ψ < 0, the wave is shifted to the right of the origin (it starts late).", "ω = 25 rad/s, and ω = 2π / T, so T = 2π / ω = 6.283 / 25 ≈ 0.25 s.", "f = 1 / T = 1 / 0.25 s ≈ 4 Hz."],
    "V_m = 6 V, ψ = −30°, f ≈ 4 Hz (T ≈ 0.25 s)", function(){ return waveFig({ waves: [{ lab: "v(t)", ph: 30 }], T: "V_m = 6 V, ψ = −30°" }); });
  add("8", "8.3", "Average and RMS value", "Instantaneous values of a sine wave", "A sine voltage v(t) = V_m sin ωt has V_m = 5 V. Find the instantaneous voltage v₁ at 30° and v₂ at 135°.",
    "V_m = 5 V, ωt = 30° and 135°", "v₁, v₂",
    "Idea: the instantaneous value is the peak value times the sine of the angle reached at that moment.",
    ["v₁ = V_m sin 30° = 5 × 0.5 = 2.5 V.", "v₂ = V_m sin 135° = 5 × 0.7071 ≈ 3.54 V.", "Check: 135° is past the peak at 90°, so the wave is already falling and v₂ is smaller than V_m ✓"],
    "v₁ = 2.5 V, v₂ ≈ 3.54 V", function(){ return waveFig({ waves: [{ lab: "v" }], marks: [{ deg: 30, lab: "v₁" }, { deg: 135, lab: "v₂" }], T: "V_m = 5 V" }); });
  add("8", "X101", "Average and RMS value", "Peak and average from the socket voltage", "A household socket gives V_rms = 230 V. Find the peak value V_m and the average value over a half cycle.",
    "V_rms = 230 V", "V_m, V_avg (half cycle)",
    "Idea: the rms value is V_m / √2, so V_m = √2 V_rms. The half-cycle average of a sine wave is 2 V_m / π.",
    ["V_m = √2 × 230 V = 1.414 × 230 ≈ 325 V.", "V_avg = 2 V_m / π = 2 × 325 / 3.1416 ≈ 207 V.", "Check: V_rms / V_avg = 230 / 207 ≈ 1.11, the form factor of a sine wave ✓"],
    "V_m ≈ 325 V, V_avg ≈ 207 V", function(){ return waveFig({ waves: [{ lab: "v" }], T: "V_rms = 230 V" }); });
  add("8", "8.2", "Phase difference", "Phase difference of two functions", "Find the phase difference of (a) v = 20 sin(ωt + 30°) V and i = 12 sin(ωt + 60°) A, and (b) v = 5 sin(ωt + 60°) V and i = 2.5 sin(ωt + 20°) A. Say which one leads.",
    "(a) ψ_v = 30°, ψ_i = 60°  (b) ψ_v = 60°, ψ_i = 20°", "φ for (a) and (b)",
    "Idea: the phase difference is φ = ψ_v − ψ_i. A positive φ means v leads i, a negative φ means v lags i.",
    ["(a) φ = 30° − 60° = −30°. φ < 0, so the voltage lags the current by 30°.", "(b) φ = 60° − 20° = 40°. φ > 0, so the voltage leads the current by 40°.", "Both pairs have the same frequency, so the phase difference does not change with time."],
    "(a) φ = −30°, v lags i  (b) φ = 40°, v leads i", function(){ return waveFig({ waves: [{ lab: "v", ph: -30 }, { lab: "i", ph: -60 }], T: "(a) v lags i by 30°" }); });
  add("8", "X102", "Phase difference", "Phase and time shift at 50 Hz", "v = 40 sin(ωt − 25°) V and i = 8 sin(ωt + 35°) A, with f = 50 Hz. Find φ, say which leads, and find the time shift between the two waves.",
    "ψ_v = −25°, ψ_i = 35°, f = 50 Hz", "φ, time shift",
    "Idea: φ = ψ_v − ψ_i gives the angle. One full turn of 360° takes T = 1 / f, so a shift of φ takes φ / 360° of T.",
    ["φ = ψ_v − ψ_i = −25° − 35° = −60°.", "φ < 0, so the voltage lags the current by 60°.", "T = 1 / f = 1 / 50 = 20 ms.", "Time shift = (60° / 360°) × 20 ms ≈ 3.33 ms."],
    "φ = −60° (v lags i), shift ≈ 3.33 ms", function(){ return waveFig({ waves: [{ lab: "v", ph: 25 }, { lab: "i", ph: -35 }], T: "f = 50 Hz" }); });
  add("8", "8.4", "Complex numbers and phasors", "From sine functions to phasors (peak values)", "Write the phasors of (a) v = −10 sin(60t + 25°) V and (b) i = 12 sin(25t − 20°) A. The numbers 10 and 12 are peak values.",
    "(a) v = −10 sin(60t + 25°) V  (b) i = 12 sin(25t − 20°) A", "peak phasors V and I",
    "Idea: a peak phasor has the peak value as magnitude and the phase angle as angle. A minus sign in front of sin adds 180° to the angle.",
    ["(a) −10 sin(60t + 25°) = 10 sin(60t + 25° + 180°) = 10 sin(60t + 205°).", "So V = 10∠205° V, which is the same as 10∠−155° V.", "(b) The function is already in the form I_m sin(ωt + ψ), so I = 12∠−20° A.", "The frequency (60 or 25 rad/s) is not written in the phasor. It is remembered separately."],
    "(a) V = 10∠205° = 10∠−155° V  (b) I = 12∠−20° A");
  add("8", "8.5", "Complex numbers and phasors", "From rms phasors to sine functions", "Write the instantaneous values of (a) V = 120∠30° V and (b) I = 12∠0° A. The numbers 120 and 12 are rms values.",
    "(a) V = 120∠30° V rms  (b) I = 12∠0° A rms", "v(t) and i(t)",
    "Idea: for rms phasors, the peak value is √2 times the rms value.",
    ["(a) V_m = √2 × 120 V ≈ 169.7 V, so v = 120√2 sin(ωt + 30°) V.", "(b) I_m = √2 × 12 A ≈ 17 A, so i = 12√2 sin ωt A.", "The angle of the phasor becomes the added angle ψ in the sine function."],
    "(a) v = 120√2 sin(ωt + 30°) V  (b) i = 12√2 sin ωt A");
  add("8", "8.9", "Complex numbers and phasors", "Adding two sine voltages with phasors", "Find the sum of v₁ = 2 sin(ωt + 60°) V and v₂ = 10 sin(ωt − 40°) V.",
    "V₁ = 2∠60° V, V₂ = 10∠−40° V", "v₁ + v₂",
    "Idea: sine waves of the same frequency are added as phasors. Change to rectangular form, add the real parts and the imaginary parts, then go back to polar form.",
    ["V₁ = 2 cos 60° + j2 sin 60° = 1 + j1.732 V.", "V₂ = 10 cos(−40°) + j10 sin(−40°) = 7.66 − j6.43 V.", "V₁ + V₂ = (1 + 7.66) + j(1.732 − 6.43) = 8.66 − j4.698 V.", "Magnitude: √(8.66² + 4.698²) ≈ 9.85 V. Angle: tan⁻¹(−4.698 / 8.66) ≈ −28.48° (real part positive, imaginary part negative: fourth quadrant).", "Back to the time domain: v(t) = 9.85 sin(ωt − 28.48°) V."],
    "v(t) = 9.85 sin(ωt − 28.48°) V");
  add("8", "8.10", "Resistor, inductor and capacitor in AC", "Voltage across a resistor in the phasor domain", "R = 10 Ω and i_R = 6√2 sin(ωt − 30°) A. Find the voltage across the resistor in the phasor domain.",
    "R = 10 Ω, i_R = 6√2 sin(ωt − 30°) A", "v_R and its phasor",
    "Idea: in a resistor Ohm's law holds at every instant, and v and i are in phase, so the voltage has the same angle as the current.",
    ["v_R = R i_R = 10 × 6√2 sin(ωt − 30°) = 60√2 sin(ωt − 30°) V.", "Phasor: V_Rm = 60√2∠−30° V.", "The angle is the same as that of the current: φ = 0°, v and i are in phase."],
    "V_Rm = 60√2∠−30° V", function(){ return loopAC("v_R", R_("R = 10 Ω", YM, "l"), "i_R"); });
  add("8", "8.11", "Resistor, inductor and capacitor in AC", "Inductor current in the time domain", "In an AC inductive circuit, v_L = 6√2 sin(60t + 35°) V and L = 0.2 H. Find the inductor current in the time domain.",
    "v_L = 6√2 sin(60t + 35°) V, L = 0.2 H, ω = 60 rad/s", "i_L(t)",
    "Idea: change to the phasor domain, divide by the impedance jX_L, and change back. The inductor current lags the voltage by 90°.",
    ["X_L = ωL = (60 rad/s)(0.2 H) = 12 Ω, so Z_L = jX_L = j12 Ω = 12∠90° Ω.", "V_Lm = 6√2∠35° V.", "I_Lm = V_Lm / Z_L = 6√2∠35° / 12∠90° = 0.5√2∠−55° A.", "Back to the time domain: i_L = 0.5√2 sin(60t − 55°) A.", "Check: the current lags the voltage by 90° (35° − 90° = −55°) ✓"],
    "i_L = 0.5√2 sin(60t − 55°) A", function(){ return svg(rect(XL, XR, YT, YB, { l: [{ t: "acs", c: YM, lab: "v_L", side: "r", off: 20 }], r: [{ t: "ind", c: YM, lab: "L = 0.2 H", side: "l" }] }) + P.arr(150, 26, 200, 26, "i_L", 175, 20)); });
  add("8", "8.12", "Resistor, inductor and capacitor in AC", "Capacitor current in the time domain", "A capacitor of C = 5 μF at f = 500 Hz has v_C = 50√2 sin(ωt − 20°) V. Find the capacitor current in the time domain.",
    "v_C = 50√2 sin(ωt − 20°) V, C = 5 μF, f = 500 Hz", "i_C(t)",
    "Idea: the capacitor opposes the current with X_C = 1 / ωC, and the current leads the voltage by 90°.",
    ["ω = 2πf = 2π(500 Hz) ≈ 3142 rad/s.", "X_C = 1 / (ωC) = 1 / [(3142 rad/s)(5×10⁻⁶ F)] ≈ 63.65 Ω.", "I_Cm = V_Cm / X_C = 50√2 / 63.65 ≈ 786√2 mA.", "The current leads the voltage by 90°: −20° + 90° = +70°.", "i_C = 786√2 sin(ωt + 70°) mA."],
    "i_C ≈ 786√2 sin(ωt + 70°) mA", function(){ return svg(rect(XL, XR, YT, YB, { l: [{ t: "acs", c: YM, lab: "v_C", side: "r", off: 20 }], r: [{ t: "cap", c: YM, lab: "C = 5 μF", side: "l" }] }) + P.arr(150, 26, 200, 26, "i_C", 175, 20)); });

  // ---------------- chapter 9 ----------------
  add("9", "9.1", "The impedance triangle", "Impedance of a series RLC circuit", "R = 1.5 Ω, X_L = 2.5 Ω and X_C = 3 Ω are in series. Find the impedance Z and the impedance angle, and say whether the circuit is inductive or capacitive.",
    "R = 1.5 Ω, X_L = 2.5 Ω, X_C = 3 Ω", "Z, φ",
    "Idea: in series the impedances add. The real part is R and the imaginary part is X = X_L − X_C. The angle comes from the impedance triangle.",
    ["Z = R + j(X_L − X_C) = 1.5 + j(2.5 − 3) = 1.5 − j0.5 Ω.", "|Z| = √(1.5² + 0.5²) ≈ 1.58 Ω and φ = tan⁻¹(−0.5 / 1.5) ≈ −18.44°.", "Z = 1.58∠−18.44° Ω.", "X_C > X_L, so the net reactance is negative: the circuit is more capacitive, and φ < 0."],
    "Z = 1.5 − j0.5 = 1.58∠−18.44° Ω, capacitive", function(){ return svg(rect(XL, XR, YT, YB, { l: [{ t: "acs", c: YM, lab: "V", side: "r", off: 20 }], t: [R_("R = 1.5 Ω", 130, "t"), { t: "ind", c: 215, lab: "X_L = 2.5 Ω", side: "t" }], r: [{ t: "cap", c: YM, lab: "X_C = 3 Ω", side: "l" }] })); });
  add("9", "X103", "The impedance triangle", "Impedance triangle of an inductive load", "R = 8 Ω and X_L = 6 Ω are in series. Draw the impedance triangle and find |Z|, φ and the power factor.",
    "R = 8 Ω, X_L = 6 Ω", "|Z|, φ, PF",
    "Idea: R is the base of the triangle, X is its height and |Z| is the hypotenuse, so Pythagoras and the tangent give everything.",
    ["Z = R + jX_L = 8 + j6 Ω.", "|Z| = √(8² + 6²) = 10 Ω.", "φ = tan⁻¹(X / R) = tan⁻¹(6 / 8) ≈ 36.87°. X > 0, so the load is inductive.", "PF = cos φ = R / |Z| = 8 / 10 = 0.8 lagging."],
    "|Z| = 10 Ω, φ = 36.87°, PF = 0.8 lagging", function(){ return fTri("R = 8 Ω", "X = 6 Ω", "Z = 10 Ω", "φ"); });
  add("9", "X104", "The impedance triangle", "From Z to R and X", "A load has Z = 12 − j16 Ω. Find |Z| and φ, say whether it is inductive or capacitive, and find its power factor.",
    "Z = 12 − j16 Ω", "|Z|, φ, type, PF",
    "Idea: the real part is the resistance R and the imaginary part is the net reactance X. A negative X means the capacitor wins.",
    ["R = 12 Ω and X = −16 Ω.", "|Z| = √(12² + 16²) = 20 Ω.", "φ = tan⁻¹(−16 / 12) ≈ −53.13°.", "X < 0, so the load is capacitive: the current leads the voltage.", "PF = cos φ = R / |Z| = 12 / 20 = 0.6 leading."],
    "|Z| = 20 Ω, φ = −53.13°, capacitive, PF = 0.6 leading", function(){ return fTri("R = 12 Ω", "X = −16 Ω", "Z = 20 Ω", "φ"); });
  add("9", "9.3", "Series and parallel impedances", "Equivalent impedance and a branch current", "E = 100∠0° V feeds Z₁ = R₁ = 4 kΩ in series with Z₂ = −j8 kΩ (a capacitor) in parallel with Z₃ = R_L + jX_L = 4 + j8 kΩ. Find the input impedance Z_eq and the current I₃ in the branch with R and X_L.",
    "E = 100∠0° V, Z₁ = 4 kΩ, Z₂ = −j8 kΩ, Z₃ = 4 + j8 kΩ", "Z_eq, I₃",
    "Idea: combine the parallel pair first, then add the series part. The branch current follows from the total current with the current divider.",
    ["Z₂ ∥ Z₃ = Z₂ Z₃ / (Z₂ + Z₃) = (−j8)(4 + j8) / (−j8 + 4 + j8) = (64 − j32) / 4 = 16 − j8 kΩ.", "Z_eq = Z₁ + Z₂ ∥ Z₃ = 4 + 16 − j8 = 20 − j8 kΩ = 21.54∠−21.8° kΩ.", "Total current: I₁ = E / Z_eq = 100∠0° / 21.54∠−21.8° ≈ 4.64∠21.8° mA.", "Current divider: I₃ = I₁ Z₂ / (Z₂ + Z₃) = 4.64∠21.8° × (−j8) / 4 = 4.64∠21.8° × 2∠−90° ≈ 9.28∠−68.2° mA."],
    "Z_eq = 21.54∠−21.8° kΩ, I₃ ≈ 9.28∠−68.2° mA", function(){ return svg(vrun(XL, YT, YB, [{ t: "acs", c: YM, lab: "E =|100∠0°|V", side: "l", off: 12 }]) + hrun(YT, XL, XR, [R_("Z₁ = 4 kΩ", 135, "t")]) + vrun(215, YT, YB, [{ t: "cap", c: YM, lab: "Z₂ = −j8 kΩ", side: "l" }]) + vrun(XR, YT, YB, [R_("Z₃|= 4 + j8 kΩ", YM, "l", { off: 10 })]) + hrun(YB, XR, XL, []) + dots([[215, YT], [215, YB]])); });
  add("9", "9.4", "Series and parallel impedances", "Inductor voltage in a series-parallel circuit", "E = 40 sin(2t − 30°) V, R = 120 Ω, L = 10 H and C = 20 mF with L and C in parallel and R in series with them. Find the voltage across the inductor.",
    "e = 40 sin(2t − 30°) V, R = 120 Ω, L = 10 H, C = 20 mF, ω = 2 rad/s", "v_L(t)",
    "Idea: change everything to the phasor domain, find the parallel impedance of L and C, then use the voltage divider rule.",
    ["E = 40∠−30° V. Z₁ = R = 120 Ω, Z₂ = jωL = j(2 × 10) = j20 Ω, Z₃ = −j / (ωC) = −j / (2 × 0.02) = −j25 Ω.", "Z₂ ∥ Z₃ = (j20)(−j25) / (j20 − j25) = 500 / (−j5) = j100 Ω.", "Voltage divider: V_L = E (Z₂ ∥ Z₃) / (Z₁ + Z₂ ∥ Z₃) = (40∠−30°)(j100) / (120 + j100).", "The numerator is 4000∠60° and the denominator is 156.2∠39.8°, so V_L ≈ 25.61∠20.2° V.", "Back to the time domain: v_L = 25.61 sin(2t + 20.2°) V."],
    "v_L = 25.61 sin(2t + 20.2°) V", function(){ return svg(vrun(XL, YT, YB, [{ t: "acs", c: YM, lab: "E =|40∠−30°|V", side: "l", off: 12 }]) + hrun(YT, XL, XR, [R_("Z₁ = 120 Ω", 135, "t")]) + vrun(215, YT, YB, [{ t: "ind", c: YM, lab: "j20 Ω", side: "l" }]) + vrun(XR, YT, YB, [{ t: "cap", c: YM, lab: "−j25 Ω", side: "l" }]) + hrun(YB, XR, XL, []) + dots([[215, YT], [215, YB]])); });
  add("9", "9.5", "Active, reactive and apparent power", "Total power factor and power triangle", "Three loads take P₁ = 10 W, P₂ = 30 W and P₃ = 20 W. An inductive part takes Q_L = 70 var and a capacitive part Q_C = 15 var. Find the total power factor and draw the power triangle.",
    "P₁ = 10 W, P₂ = 30 W, P₃ = 20 W, Q_L = 70 var, Q_C = 15 var", "P_T, Q_T, S_T, PF, φ",
    "Idea: active powers add, and reactive powers add with their signs (inductive +, capacitive −). Then S_T = √(P_T² + Q_T²) and PF = P_T / S_T.",
    ["P_T = 10 + 30 + 20 = 60 W.", "Q_T = Q_L − Q_C = 70 − 15 = 55 var (inductive).", "S_T = √(P_T² + Q_T²) = √(60² + 55²) ≈ 81.39 VA.", "PF = P_T / S_T = 60 / 81.39 ≈ 0.74 lagging.", "φ = cos⁻¹ 0.74 ≈ 42.3°."],
    "P_T = 60 W, Q_T = 55 var, S_T = 81.39 VA, PF ≈ 0.74, φ ≈ 42.3°", function(){ return fTri("P_T = 60 W", "Q_T = 55 var", "S_T = 81.39 VA", "φ = 42.3°"); });
  add("9", "X105", "Active, reactive and apparent power", "Power of a load from V, I and φ", "A load has V = 120 V rms and I = 5 A rms with the current lagging by 30°. Find S, P, Q and the power factor.",
    "V = 120 V, I = 5 A, φ = 30° lagging", "S, P, Q, PF",
    "Idea: S = V I is the apparent power. P = S cos φ is active and Q = S sin φ is reactive, and the three form a right triangle.",
    ["S = V I = 120 × 5 = 600 VA.", "P = S cos φ = 600 × cos 30° ≈ 519.6 W.", "Q = S sin φ = 600 × sin 30° = 300 var (inductive, because the current lags).", "PF = cos 30° ≈ 0.866 lagging.", "Check: √(519.6² + 300²) = 600 VA ✓"],
    "S = 600 VA, P ≈ 519.6 W, Q = 300 var, PF ≈ 0.866 lagging", function(){ return fTri("P = 519.6 W", "Q = 300 var", "S = 600 VA", "φ = 30°"); });
  add("9", "9.6", "Power factor and its correction", "Power factor correction of a mixed load", "At E = 110 V, 60 Hz the load is 5 lamps of 100 W each, a heating element (R = 5 Ω, X_L = 5 Ω, I = 10 A) and a 6 kW electric stove with PF 0.75 lagging. Find P_T, Q_T, S_T, the power factor and the source current. Then find the capacitor that raises the PF to 0.87 and the new source current.",
    "E = 110 V, f = 60 Hz, lamps 5 × 100 W, heater R = 5 Ω and X_L = 5 Ω at 10 A, stove 6 kW at PF 0.75", "P_T, Q_T, S_T, PF, I, C, I′",
    "Idea: add the active powers and the reactive powers of all loads, then S_T gives PF and the current. A capacitor in parallel takes away reactive power Q_C = Q_T − P_T tan φ′, and it changes only Q, not P.",
    ["Lamps: P₁ = 5 × 100 = 500 W, Q₁ = 0.", "Heater: P₂ = I²R = 10² × 5 = 500 W and Q₂ = I²X_L = 10² × 5 = 500 var.", "Stove: P₃ = 6000 W, φ = cos⁻¹ 0.75 ≈ 41.4°, Q₃ = P₃ tan φ ≈ 5290 var.", "P_T = 500 + 500 + 6000 = 7000 W and Q_T = 0 + 500 + 5290 = 5790 var.", "S_T = √(7000² + 5790²) ≈ 9084.3 VA, PF = 7000 / 9084.3 ≈ 0.77 and φ ≈ 39.7°.", "Source current: I = S_T / E = 9084.3 / 110 ≈ 82.6 A, lagging by 39.7°.", "New angle: φ′ = cos⁻¹ 0.87 ≈ 29.5°, so Q_T′ = P_T tan φ′ = 7000 tan 29.5° ≈ 3960 var.", "Q_C = 5790 − 3960 = 1830 var, X_C = E² / Q_C = 110² / 1830 ≈ 6.61 Ω, C = 1 / (2π × 60 × 6.61) ≈ 400 μF.", "New current: I′ = P_T / (E cos φ′) = 7000 / (110 × 0.87) ≈ 73.1 A. The source current falls by 82.6 − 73.1 = 9.5 A."],
    "P_T = 7000 W, Q_T = 5790 var, S_T = 9084.3 VA, PF ≈ 0.77, I = 82.6 A, C ≈ 400 μF, I′ ≈ 73.1 A", function(){ return svg(vrun(XL, YT, YB, [{ t: "acs", c: YM, lab: "E =|110 V", side: "l", off: 12 }]) + hrun(YT, XL, 280, []) + hrun(YB, 280, XL, []) + vrun(170, YT, YB, [R_("loads|7000 W|5790 var", YM, "r", { len: 44, off: 10 })]) + vrun(262, YT, YB, [{ t: "cap", c: YM, lab: "C = ?", side: "r" }]) + dots([[170, YT], [170, YB]])); });

  // ---------------- chapter 11 ----------------
  add("11", "X106", "The transformer", "Why a transformer does not work on DC", "A transformer is connected to a battery through a switch. When the switch is closed, a voltmeter on the secondary jumps for an instant and then reads zero. Explain what is happening.",
    "primary on a battery (DC), voltmeter on the secondary", "explanation",
    "Idea: a voltage is induced in the secondary only while the flux of the core is changing (Faraday's law).",
    ["With a steady DC current, the flux in the core is constant, so it induces no voltage in the secondary.", "For a moment after the switch is closed (and again when it is opened), the current and the flux change. This is the instant the voltmeter jumps.", "After that the current is steady, the flux stops changing and the secondary voltage is zero.", "So a transformer needs a changing current. This is why it works on AC and not on steady DC."],
    "A steady DC gives a constant flux, so no voltage is induced. Only AC works.");
  add("11", "X107", "The transformer", "Choosing the core", "Choose the core type, air or iron, for (a) a radio-frequency circuit and (b) a 50 Hz power supply, and give the reason.",
    "(a) radio frequencies  (b) 50 Hz power supply", "core type",
    "Idea: the core decides how well the flux links the two coils. Iron gives near-full coupling at low frequency but wastes energy at high frequency.",
    ["(a) High frequency (radio, TV, instruments): an air-core transformer. An iron core would waste too much energy at these frequencies.", "(b) 50 Hz power supply: an iron-core transformer. Iron has a high permeability, so almost all the flux links both windings (k ≈ 1) and the transformer is close to ideal.", "Iron-core transformers are also used in audio circuits."],
    "(a) air core  (b) iron core");
  add("11", "X108", "The transformer", "Induced voltage in the secondary", "The flux linking a secondary coil with N_S = 200 turns changes steadily from 0 to 5 mWb in 10 ms. Find the voltage induced in the secondary.",
    "N_S = 200, ΔΦ = 5 mWb, Δt = 10 ms", "induced voltage",
    "Idea: Faraday's law (Chapter 6): the induced voltage is the number of turns times the rate of change of flux, v = N ΔΦ / Δt.",
    ["Rate of change of flux: ΔΦ / Δt = 5×10⁻³ Wb / 10×10⁻³ s = 0.5 Wb/s.", "v = N_S ΔΦ / Δt = 200 × 0.5 = 100 V."],
    "v = 100 V");
  add("11", "11.1", "The ideal transformer", "Ideal transformer: all quantities", "An ideal transformer has N_P = 40 and N_S = 100. V_P = 50 V, I_P = 5 A and Z_L = 2 Ω. Find the turns ratio, the secondary voltage, the secondary current, the primary (reflected) impedance and the primary power.",
    "N_P = 40, N_S = 100, V_P = 50 V, I_P = 5 A, Z_L = 2 Ω", "n, V_S, I_S, Z_P, P_P",
    "Idea: the turns ratio n = N_S / N_P multiplies the voltage, divides the current and divides the load impedance by n². The power is the same on both sides.",
    ["n = N_S / N_P = 100 / 40 = 2.5.", "V_S = n V_P = 2.5 × 50 = 125 V.", "I_S = I_P / n = 5 / 2.5 = 2 A.", "Z_P = Z_L / n² = 2 / 2.5² = 0.32 Ω.", "P_P = V_P I_P = 50 × 5 = 250 W, and P_S = V_S I_S = 125 × 2 = 250 W ✓ (the amplitude only)"],
    "n = 2.5, V_S = 125 V, I_S = 2 A, Z_P = 0.32 Ω, P = 250 W", function(){ return figXfmr("V_P = 50 V", "N_P = 40", "N_S = 100", "Z_L = 2 Ω", "I_P = 5 A"); });
  add("11", "11.2", "Step-up and step-down transformers", "Step-up or step-down?", "A transformer has 125 turns of secondary winding and 250 turns of primary winding. Find its turns ratio and say if it is step-up or step-down.",
    "N_S = 125, N_P = 250", "n and the type",
    "Idea: n = N_S / N_P. If n > 1 the voltage is raised (step-up), and if n < 1 the voltage is lowered (step-down).",
    ["n = N_S / N_P = 125 / 250 = 0.5.", "n < 1, so N_S < N_P: the output voltage is lower than the input voltage.", "It is a step-down transformer."],
    "n = 0.5, step-down", function(){ return figXfmr("V_P", "N_P = 250", "N_S = 125", "load"); });
  add("11", "X109", "Other types of transformers", "Multiple-tapped secondary", "A transformer has a 230 V primary with N_P = 1000 turns. The secondary is tapped at 50, 100 and 200 turns. Find the three output voltages.",
    "V_P = 230 V, N_P = 1000, taps at 50, 100 and 200 turns", "three output voltages",
    "Idea: a multiple-tapped transformer gives several voltages. Each tap has its own turns ratio, V = V_P N / N_P.",
    ["Tap 1: V₁ = 230 × 50 / 1000 = 11.5 V.", "Tap 2: V₂ = 230 × 100 / 1000 = 23 V.", "Tap 3: V₃ = 230 × 200 / 1000 = 46 V."],
    "11.5 V, 23 V and 46 V");
  add("11", "X110", "Other types of transformers", "Auto-transformer", "An auto-transformer has one winding of 400 turns connected across a 230 V supply. The load is connected to a tap at 100 turns. Find the output voltage.",
    "V_P = 230 V, N_total = 400, N_tap = 100", "V_S",
    "Idea: an auto-transformer uses one winding as both primary and secondary. The voltage is shared in proportion to the turns.",
    ["The whole winding (400 turns) carries 230 V, so each turn has 230 / 400 = 0.575 V.", "V_S = 100 × 0.575 = 57.5 V (the turns ratio is n = 100 / 400 = 0.25).", "It is a step-down use. It needs less copper and is smaller and lighter than a two-winding transformer."],
    "V_S = 57.5 V");
  add("11", "11.3", "Impedance matching", "Matching an amplifier to a speaker", "A simplified amplifier has an internal resistance of 100 Ω. How can the maximum power be delivered to a 4 Ω speaker?",
    "Z_S = R_S = 100 Ω, Z_L = R_L = 4 Ω", "n for maximum power",
    "Idea: maximum power reaches the load when the impedance seen from the source equals the source impedance, so choose n so that Z_P = Z_L / n² equals Z_S.",
    ["With the speaker connected directly, Z_L = 4 Ω does not match Z_S = 100 Ω, so the maximum power cannot be delivered.", "An audio transformer between them must have Z_P = Z_L / n² = Z_S = 100 Ω.", "n = √(Z_L / Z_P) = √(4 / 100) = 0.2 = 1/5."],
    "n = 0.2 = 1/5", function(){ return fMatch2("R_S = 100 Ω", "R_L = 4 Ω", "n = 1/5"); });
  add("11", "X111", "Impedance matching", "Matching a 16 Ω load to a 1 kΩ source", "A source with Z_S = 1 kΩ must drive a load of 16 Ω with maximum power. Find the turns ratio and check the impedance seen by the source.",
    "Z_S = 1000 Ω, Z_L = 16 Ω", "n, Z_P",
    "Idea: the transformer must make the load look like the source impedance, Z_P = Z_L / n² = Z_S.",
    ["n = √(Z_L / Z_S) = √(16 / 1000) = √0.016 ≈ 0.1265.", "Check: Z_P = Z_L / n² = 16 / 0.016 = 1000 Ω ✓", "n < 1, so the transformer is step-down: about 7.9 primary turns for each secondary turn."],
    "n ≈ 0.1265 (step-down)", function(){ return fMatch2("Z_S = 1 kΩ", "R_L = 16 Ω", "n = ?"); });
})();
