// ===== number generators for chapters 5, 6, 8, 9 =====
GENS["5"] = []; GENS["6"] = []; GENS["8"] = []; GENS["9"] = [];
function r3(x){ return parseFloat(Number(x).toPrecision(3)); }

// ---------- Chapter 5 ----------
G("5", "g5-1", "Thevenin", function(){ var R = pk([6, 12, 18, 24]), E = pk([24, 36, 48, 60]), V = rd(E * (R / 2) / (R + R / 2)), Rt = rd(R / 3);
  return { q: "Three equal resistors of " + R + " Ω are connected as in Example 5.4 with E = " + E + " V. Find V_TH, the open-circuit voltage at a and b.", unit: "V", ans: V, fig: figThev("E = " + E + " V", "R_1 = " + R + " Ω", "R_2 = " + R + " Ω", "R_3 = " + R + " Ω", "", true), sol: "V_TH = E (R₂ // R₃) / (R₁ + R₂ // R₃) = " + E + " × " + nn(R / 2) + " / " + nn(R + R / 2) + " = " + nn(V) + " V" }; });
G("5", "g5-2", "Thevenin", function(){ var R = pk([6, 12, 18, 24]), Rt = rd(R / 3);
  return { q: "Three equal resistors of " + R + " Ω are connected as in Example 5.4. Find R_TH seen from a and b with E shorted.", unit: "Ω", ans: Rt, fig: figThev("E", "R_1 = " + R + " Ω", "R_2 = " + R + " Ω", "R_3 = " + R + " Ω", "", true), sol: "R_TH = R₁ // R₂ // R₃ = " + R + " / 3 = " + nn(Rt) + " Ω" }; });
G("5", "g5-3", "Thevenin", function(){ var V = pk([10, 12, 16, 20, 24]), Rt = pk([2, 4, 5, 10]), RL = pk([4, 6, 8, 10, 20]), I = rd(1000 * V / (Rt + RL));
  return { q: "The Thevenin equivalent has V_TH = " + V + " V and R_TH = " + Rt + " Ω. Find the current in R_L = " + RL + " Ω.", unit: "mA", ans: r3(I), fig: figThevEq("V_TH = " + V + " V", "R_TH = " + Rt + " Ω", "R_L = " + RL + " Ω"), sol: "I_L = V_TH / (R_TH + R_L) = " + V + " V / " + (Rt + RL) + " Ω = " + nn(I / 1000) + " A = " + nn(r3(I)) + " mA" }; });
G("5", "g5-4", "Norton", function(){ var V = pk([12, 20, 24, 30, 48]), Rt = pk([2, 3, 4, 6, 8]), IN = rd(V / Rt);
  return { q: "A network has V_TH = " + V + " V and R_TH = " + Rt + " Ω. Find the Norton current I_N.", unit: "A", ans: IN, fig: figNorton("I_N = ?", "R_N = " + Rt + " Ω", "R_L"), sol: "I_N = V_TH / R_TH = " + V + " V / " + Rt + " Ω = " + nn(IN) + " A" }; });
G("5", "g5-5", "Norton", function(){ var IN = pk([1, 2, 3, 4, 6]), RN = pk([2, 4, 6, 12]), RL = pk([2, 4, 6, 12]), I = rd(IN * RN / (RN + RL));
  return { q: "A Norton equivalent has I_N = " + IN + " A and R_N = " + RN + " Ω. Find the current in R_L = " + RL + " Ω.", unit: "A", ans: r3(I), fig: figNorton("I_N = " + IN + " A", "R_N = " + RN + " Ω", "R_L = " + RL + " Ω"), sol: "I_L = I_N R_N / (R_N + R_L) = " + IN + " × " + RN + " / " + (RN + RL) + " = " + nn(r3(I)) + " A" }; });
G("5", "g5-6", "Maximum power", function(){ var V = pk([12, 16, 20, 24, 40]), Rt = pk([2, 4, 5, 10]), P = rd(V * V / (4 * Rt));
  return { q: "A source has V_TH = " + V + " V and R_TH = " + Rt + " Ω. Find the maximum power the load can receive.", unit: "W", ans: r3(P), fig: figThevEq("V_TH = " + V + " V", "R_TH = " + Rt + " Ω", "R_L = ?"), sol: "R_L = R_TH = " + Rt + " Ω\nP_max = V_TH² / (4 R_TH) = " + V + "² / " + (4 * Rt) + " = " + nn(r3(P)) + " W" }; });
G("5", "g5-7", "Superposition", function(){ var a = pk([1, 2, 3, 4, 5]), b = pk([1, 2, 3]), opp = pk([0, 1]), I = opp ? a - b : a + b;
  return { q: "Source 1 alone gives " + a + " A through R_L. Source 2 alone gives " + b + " A through R_L " + (opp ? "in the opposite direction" : "in the same direction") + ". Find the net current in the direction of source 1.", unit: "A", ans: I, fig: null, sol: "I = I' " + (opp ? "−" : "+") + " I'' = " + a + (opp ? " − " : " + ") + b + " = " + I + " A" }; });

// ---------- Chapter 6 ----------
G("6", "g6-1", "Charge and energy", function(){ var C = pk([10, 22, 47, 100, 220]), V = pk([5, 10, 12, 24]), Q = C * V;
  return { q: "A capacitor of " + C + " μF is charged to " + V + " V. Find the charge Q.", unit: "μC", ans: Q, fig: figCapLoop("E = " + V + " V", "C = " + C + " μF"), sol: "Q = C V = " + C + " μF × " + V + " V = " + Q + " μC" }; });
G("6", "g6-2", "Charge and energy", function(){ var C = pk([2.2, 4.7, 10, 22, 100]), V = pk([5, 10, 15, 24]), W = rd(0.5 * C * V * V);
  return { q: "A capacitor of " + C + " μF is charged to " + V + " V. Find the stored energy W.", unit: "μJ", ans: W, fig: figCapLoop("E = " + V + " V", "C = " + C + " μF"), sol: "W = ½ C V² = ½ × " + C + " μF × " + V + "² V² = " + nn(W) + " μJ" }; });
G("6", "g6-3", "Capacitance", function(){ var k = pk([1, 2, 5, 10]), A = pk([0.002, 0.004, 0.01]), d = pk([0.002, 0.005, 0.01]), C = 8.85e-12 * k * A / d;
  return { q: "A capacitor has plates of area " + A + " m², a gap d = " + d + " m and a dielectric with k = " + k + ". Find C. Use C = 8.85×10⁻¹² k A / d.", unit: "pF", ans: r3(C * 1e12), fig: null, sol: "C = 8.85×10⁻¹² × " + k + " × " + A + " / " + d + " = " + nn(r3(C * 1e12)) + " pF" }; });
G("6", "g6-4", "Series and parallel", function(){ var n = pk([2, 4, 5]), C = pk([10, 20, 50, 100]), Ce = rd(C / n);
  return { q: n + " capacitors of " + C + " μF each are connected in series. Find C_eq.", unit: "μF", ans: Ce, fig: null, sol: "C_eq = C / n = " + C + " / " + n + " = " + nn(Ce) + " μF" }; });
G("6", "g6-5", "Series and parallel", function(){ var a = pk([10, 20, 100]), b = pk([5, 30, 50]), c = pk([20, 40, 60]), S = a + b + c;
  return { q: "Capacitors of " + a + " μF, " + b + " μF and " + c + " μF are connected in parallel. Find C_eq.", unit: "μF", ans: S, fig: null, sol: "C_eq = " + a + " + " + b + " + " + c + " = " + S + " μF" }; });
G("6", "g6-6", "Series and parallel", function(){ var a = pk([10, 20, 30, 60]), b = pk([20, 30, 60, 120]), E = pk([12, 24, 60]), Ce = a * b / (a + b), Q = rd(Ce * E);
  return { q: "C₁ = " + a + " μF and C₂ = " + b + " μF are in series across E = " + E + " V. Find the charge on C₁.", unit: "μC", ans: r3(Q), fig: figCapsSeries("E = " + E + " V", ["C_1 " + a + " μF", "C_2 " + b + " μF"]), sol: "C_eq = " + a + " × " + b + " / " + (a + b) + " = " + nn(r3(Ce)) + " μF\nQ = C_eq E = " + nn(r3(Ce)) + " × " + E + " = " + nn(r3(Q)) + " μC (same on each)" }; });
G("6", "g6-7", "Inductor", function(){ var L = pk([0.1, 0.2, 0.5, 2]), di = pk([2, 4, 5, 10]), dt = pk([0.1, 0.2, 0.5]), v = rd(L * di / dt);
  return { q: "The current in an inductor of " + L + " H changes by " + di + " A in " + dt + " s at a steady rate. Find the induced voltage.", unit: "V", ans: r3(v), fig: null, sol: "v = L Δi / Δt = " + L + " × " + di + " / " + dt + " = " + nn(r3(v)) + " V" }; });
G("6", "g6-8", "Inductor", function(){ var L = pk([0.5, 2, 4, 10]), I = pk([1, 2, 3, 5]), W = rd(0.5 * L * I * I);
  return { q: "An inductor of " + L + " H carries " + I + " A of steady DC. Find the stored energy.", unit: "J", ans: W, fig: null, sol: "W = ½ L I² = ½ × " + L + " × " + I + "² = " + nn(W) + " J" }; });

// ---------- Chapter 8 ----------
G("8", "g8-1", "Frequency", function(){ var T = pk([1, 2, 4, 5, 10, 20, 25]), f = rd(1000 / T);
  return { q: "A sine wave has a period T = " + T + " ms. Find the frequency.", unit: "Hz", ans: f, fig: waveFig({ waves: [{ lab: "v(t)" }], T: "one period T = " + T + " ms" }), sol: "f = 1 / T = 1 / " + T + " ms = " + nn(f) + " Hz" }; });
G("8", "g8-2", "Frequency", function(){ var f = pk([50, 60, 100, 400, 1000]), w = rd(2 * Math.PI * f);
  return { q: "A source has f = " + f + " Hz. Find the angular frequency ω.", unit: "rad/s", ans: r3(w), fig: null, sol: "ω = 2π f = 2π × " + f + " = " + nn(r3(w)) + " rad/s" }; });
G("8", "g8-3", "RMS value", function(){ var Vm = pk([10, 50, 100, 170, 311]), V = Vm / Math.SQRT2;
  return { q: "A sine voltage has a peak value V_m = " + Vm + " V. Find the RMS value.", unit: "V", ans: r3(V), fig: waveFig({ waves: [{ lab: "v(t)" }], T: "V_m = " + Vm + " V" }), sol: "V = V_m / √2 = " + Vm + " / 1.414 = " + nn(r3(V)) + " V" }; });
G("8", "g8-4", "RMS value", function(){ var V = pk([12, 24, 120, 230]), Vm = V * Math.SQRT2;
  return { q: "A supply is rated " + V + " V rms. Find the peak value V_m.", unit: "V", ans: r3(Vm), fig: null, sol: "V_m = √2 V = 1.414 × " + V + " = " + nn(r3(Vm)) + " V" }; });
G("8", "g8-5", "Instantaneous value", function(){ var Vm = pk([5, 10, 20, 100]), d = pk([30, 45, 60, 90, 120, 150, 210]), v = Vm * Math.sin(d * Math.PI / 180);
  return { q: "v(t) = " + Vm + " sin ωt volts. Find v at ωt = " + d + "°.", unit: "V", ans: r3(v), fig: waveFig({ waves: [{ lab: "v(t)" }], marks: [{ deg: d, lab: "v" }] }), sol: "v = " + Vm + " sin " + d + "° = " + nn(r3(v)) + " V" }; });
G("8", "g8-6", "Reactance", function(){ var f = pk([50, 60, 100, 500]), L = pk([0.05, 0.1, 0.2, 0.5]), X = 2 * Math.PI * f * L;
  return { q: "An inductor of " + L + " H is on a " + f + " Hz supply. Find X_L.", unit: "Ω", ans: r3(X), fig: figAC("v", "ind", "L = " + L + " H"), sol: "X_L = 2π f L = 2π × " + f + " × " + L + " = " + nn(r3(X)) + " Ω" }; });
G("8", "g8-7", "Reactance", function(){ var f = pk([50, 60, 100, 500]), C = pk([1, 2, 5, 10, 22]), X = 1e6 / (2 * Math.PI * f * C);
  return { q: "A capacitor of " + C + " μF is on a " + f + " Hz supply. Find X_C.", unit: "Ω", ans: r3(X), fig: figAC("v", "cap", "C = " + C + " μF"), sol: "X_C = 1 / (2π f C) = 1 / (2π × " + f + " × " + C + "×10⁻⁶) = " + nn(r3(X)) + " Ω" }; });
G("8", "g8-8", "Phase", function(){ var a = pk([20, 30, 45, 60]), b = pk([-20, -30, 10, 15]), d = a - b;
  return { q: "v = V_m sin(ωt + " + a + "°) and i = I_m sin(ωt " + (b < 0 ? "− " + (-b) : "+ " + b) + "°). Find the angle by which v leads i.", unit: "°", ans: d, fig: null, sol: "φ = ψ_v − ψ_i = " + a + "° − (" + b + "°) = " + d + "°. v leads i." }; });

// ---------- Chapter 9 ----------
G("9", "g9-1", "Impedance", function(){ var R = pk([3, 6, 8, 12]), X = pk([4, 8, 6, 16]), Z = Math.sqrt(R * R + X * X);
  return { q: "Z = " + R + " + j" + X + " Ω. Find the magnitude |Z|.", unit: "Ω", ans: r3(Z), fig: figRLCser("R = " + R + " Ω", "X_L = " + X + " Ω", "X_C = 0"), sol: "|Z| = √(" + R + "² + " + X + "²) = " + nn(r3(Z)) + " Ω" }; });
G("9", "g9-2", "Impedance", function(){ var R = pk([3, 6, 8, 12]), X = pk([4, 8, 6, 16]), a = Math.atan2(X, R) * 180 / Math.PI;
  return { q: "Z = " + R + " + j" + X + " Ω. Find the angle φ in degrees.", unit: "°", ans: r3(a), fig: null, sol: "φ = tan⁻¹(" + X + " / " + R + ") = " + nn(r3(a)) + "°" }; });
G("9", "g9-3", "Impedance", function(){ var R = pk([2, 5, 10, 20]), XLv = pk([10, 15, 20, 30]), XCv = pk([5, 8, 25, 40]), X = XLv - XCv;
  return { q: "A series circuit has R = " + R + " Ω, X_L = " + XLv + " Ω and X_C = " + XCv + " Ω. Find the net reactance X = X_L − X_C.", unit: "Ω", ans: X, fig: figRLCser("R = " + R + " Ω", "X_L = " + XLv + " Ω", "X_C = " + XCv + " Ω"), sol: "X = X_L − X_C = " + XLv + " − " + XCv + " = " + X + " Ω" + (X < 0 ? " (capacitive)" : " (inductive)") }; });
G("9", "g9-4", "Impedance", function(){ var V = pk([100, 120, 220]), R = pk([3, 6, 8]), X = pk([4, 8, 6]), Z = Math.sqrt(R * R + X * X), I = V / Z;
  return { q: "A series R = " + R + " Ω and X_L = " + X + " Ω are on " + V + " V rms. Find the rms current.", unit: "A", ans: r3(I), fig: figRLCser("R = " + R + " Ω", "X_L = " + X + " Ω", "X_C = 0"), sol: "|Z| = √(" + R + "² + " + X + "²) = " + nn(r3(Z)) + " Ω\nI = V / |Z| = " + V + " / " + nn(r3(Z)) + " = " + nn(r3(I)) + " A" }; });
G("9", "g9-5", "Power", function(){ var P = pk([20, 30, 60, 80]), Q = pk([15, 40, 45, 60]), S = Math.sqrt(P * P + Q * Q);
  return { q: "A load has P = " + P + " W and Q = " + Q + " var. Find the apparent power S.", unit: "VA", ans: r3(S), fig: null, sol: "S = √(P² + Q²) = √(" + P + "² + " + Q + "²) = " + nn(r3(S)) + " VA" }; });
G("9", "g9-6", "Power", function(){ var P = pk([20, 30, 60, 80]), Q = pk([15, 40, 45, 60]), S = Math.sqrt(P * P + Q * Q), pf = P / S;
  return { q: "A load has P = " + P + " W and Q = " + Q + " var. Find the power factor.", unit: "", ans: r3(pf), fig: null, sol: "S = √(P² + Q²) = " + nn(r3(S)) + " VA\nPF = P / S = " + P + " / " + nn(r3(S)) + " = " + nn(r3(pf)) }; });
G("9", "g9-7", "Power", function(){ var S = pk([100, 500, 1000, 2000]), pf = pk([0.6, 0.8, 0.9]), P = rd(S * pf);
  return { q: "A load has S = " + S + " VA and a power factor of " + pf + " lagging. Find the active power P.", unit: "W", ans: r3(P), fig: null, sol: "P = S cos φ = " + S + " × " + pf + " = " + nn(r3(P)) + " W" }; });
G("9", "g9-8", "Power", function(){ var Pw = pk([1, 2, 4, 5]) * 1000, pf1 = pk([0.6, 0.7, 0.8]), pf2 = 0.95, Q1 = Pw * Math.tan(Math.acos(pf1)), Q2 = Pw * Math.tan(Math.acos(pf2)), Qc = Q1 - Q2;
  return { q: "A " + (Pw / 1000) + " kW load has a lagging power factor of " + pf1 + ". Find the reactive power Q_C of the capacitor that raises the power factor to 0.95.", unit: "var", ans: r3(Qc), fig: null, sol: "Q₁ = P tan(cos⁻¹ " + pf1 + ") = " + nn(r3(Q1)) + " var\nQ₂ = P tan(cos⁻¹ 0.95) = " + nn(r3(Q2)) + " var\nQ_C = Q₁ − Q₂ = " + nn(r3(Qc)) + " var" }; });
// ---------- more worked-example generators ----------
G("5", "g5-8", "Superposition", function(){ var E1 = pk([24, 36, 48, 60]), E2 = pk([12, 24, 36]), a = E1 / 48, b = E2 / 48;
  return { q: "Example 5.1 circuit (R₁ = R₂ = R₃ = R₄ = 8 Ω, R₅ = 16 Ω) with E₁ = " + E1 + " V and E₂ = " + E2 + " V. Find I_c in R₅.", unit: "A", ans: r3(a + b), fig: null, sol: "E₁ alone: R′eq = 16 // 16 + 16 = 24 Ω, I_a′ = " + E1 + " / 24 = " + nn(E1 / 24) + " A, I_c′ = half of it = " + nn(a) + " A\nE₂ alone: I_b″ = " + E2 + " / 24 = " + nn(E2 / 24) + " A, I_c″ = " + nn(b) + " A\nI_c = I_c′ + I_c″ = " + nn(r3(a + b)) + " A" }; });
G("5", "g5-9", "Norton", function(){ var IN = pk([0.5, 1, 2, 3, 4]), RN = pk([4, 5, 10, 20]), V = rd(IN * RN);
  return { q: "A Norton equivalent has I_N = " + IN + " A and R_N = " + RN + " Ω. Find the Thevenin voltage V_TH.", unit: "V", ans: V, fig: figNorton("I_N = " + IN + " A", "R_N = " + RN + " Ω", "R_L"), sol: "R_TH = R_N = " + RN + " Ω\nV_TH = I_N R_N = " + IN + " × " + RN + " = " + nn(V) + " V" }; });
G("6", "g6-9", "Charge and energy", function(){ var Q = pk([10, 50, 100, 220]), C = pk([1, 2, 5, 10]), V = rd(Q / C);
  return { q: "A charge of " + Q + " μC is stored on a " + C + " μF capacitor. Find the voltage.", unit: "V", ans: V, fig: figCapLoop("E = ?", "C = " + C + " μF"), sol: "V = Q / C\nV = " + Q + " μC / " + C + " μF = " + nn(V) + " V" }; });
G("6", "g6-10", "Inductor", function(){ var a = pk([2, 4, 6, 12]), b = pk([3, 6, 12]), L = rd(a * b / (a + b));
  return { q: "Inductors of " + a + " H and " + b + " H are in parallel. Find L_eq.", unit: "H", ans: r3(L), fig: null, sol: "Parallel inductors combine like parallel resistors\nL_eq = L₁ L₂ / (L₁ + L₂) = " + a + " × " + b + " / " + (a + b) + "\nL_eq = " + nn(r3(L)) + " H" }; });
G("8", "g8-9", "Frequency", function(){ var f = pk([50, 60, 100, 200, 400]), T = rd(1000 / f);
  return { q: "A sine wave has f = " + f + " Hz. Find the period T.", unit: "ms", ans: r3(T), fig: null, sol: "T = 1 / f\nT = 1 / " + f + " Hz = " + nn(r3(T / 1000)) + " s\nT = " + nn(r3(T)) + " ms" }; });
G("8", "g8-10", "RMS value", function(){ var Vm = pk([10, 50, 100, 170, 311]), Va = rd(0.637 * Vm);
  return { q: "A sine voltage has V_m = " + Vm + " V. Find the half-cycle average value.", unit: "V", ans: r3(Va), fig: null, sol: "The full-cycle average of a sine wave is zero, so the half cycle is used\nV_avg = 0.637 V_m = 0.637 × " + Vm + "\nV_avg = " + nn(r3(Va)) + " V" }; });
G("9", "g9-9", "Power", function(){ var p = [pk([10, 20]), pk([30, 40]), pk([20, 50])], qc = pk([10, 15, 20]), ql = pk([40, 60, 70]), P = p[0] + p[1] + p[2], Q = ql - qc, S = Math.sqrt(P * P + Q * Q);
  return { q: "Three loads take P = " + p.join(", ") + " W. One capacitor load gives Q_C = " + qc + " var and one inductive load takes Q_L = " + ql + " var. Find the power factor.", unit: "", ans: r3(P / S), fig: null, sol: "P_T = " + p.join(" + ") + " = " + P + " W\nQ_T = Q_L − Q_C = " + ql + " − " + qc + " = " + Q + " var\nS_T = √(" + P + "² + " + Q + "²) = " + nn(r3(S)) + " VA\nPF = P_T / S_T = " + nn(r3(P / S)) + " (lagging)" }; });
G("9", "g9-10", "Power factor", function(){ var Qc = pk([500, 1000, 1685, 2000]), V = pk([120, 230]), f = pk([50, 60]), C = Qc / (2 * Math.PI * f * V * V) * 1e6;
  return { q: "A capacitor must supply Q_C = " + Qc + " var on " + V + " V rms, " + f + " Hz. Find C.", unit: "μF", ans: r3(C), fig: null, sol: "ω = 2π f = " + nn(r3(2 * Math.PI * f)) + " rad/s\nC = Q_C / (ω V²) = " + Qc + " / (" + nn(r3(2 * Math.PI * f)) + " × " + V + "²)\nC = " + nn(r3(C)) + " μF" }; });
