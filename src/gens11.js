// ===== number generators: Chapter 11 and Motors =====
GENS["11"] = []; GENS["M"] = [];
G("11", "g11-1", "Ideal transformer", function(){ var Np = pk([40, 50, 100, 200]), Ns = pk([100, 200, 400, 25, 20]), Vp = pk([12, 50, 120, 230]), n = Ns / Np, Vs = rd(n * Vp);
  return { q: "An ideal transformer has N_P = " + Np + " and N_S = " + Ns + ". V_P = " + Vp + " V. Find V_S.", unit: "V", ans: r3(Vs), fig: figXfmr("V_P = " + Vp + " V", "N_P = " + Np, "N_S = " + Ns, "Z_L"), sol: "n = N_S / N_P = " + nn(n) + "\nV_S = n V_P = " + nn(n) + " × " + Vp + " = " + nn(r3(Vs)) + " V" }; });
G("11", "g11-2", "Ideal transformer", function(){ var n = pk([0.5, 2, 2.5, 4, 0.25]), Ip = pk([1, 2, 4, 5, 10]), Is = rd(Ip / n);
  return { q: "An ideal transformer has n = N_S / N_P = " + n + ". I_P = " + Ip + " A. Find I_S.", unit: "A", ans: Is, fig: null, sol: "I_S = I_P / n = " + Ip + " / " + n + " = " + nn(Is) + " A" }; });
G("11", "g11-3", "Ideal transformer", function(){ var n = pk([0.5, 2, 2.5, 4, 5]), Zl = pk([2, 4, 8, 50, 100]), Zp = rd(Zl / (n * n));
  return { q: "n = " + n + " and Z_L = " + Zl + " Ω. Find the impedance Z_P seen from the primary.", unit: "Ω", ans: r3(Zp), fig: null, sol: "Z_P = Z_L / n² = " + Zl + " / " + n + "² = " + nn(r3(Zp)) + " Ω" }; });
G("11", "g11-4", "Step-up and step-down", function(){ var Np = pk([100, 200, 250, 500]), Ns = pk([25, 50, 125, 1000, 2000]), n = rd(Ns / Np);
  return { q: "N_P = " + Np + " and N_S = " + Ns + ". Find the turns ratio n (the book's n = N_S / N_P).", unit: "", ans: n, fig: figXfmr("V_P", "N_P = " + Np, "N_S = " + Ns, "Z_L"), sol: "n = " + Ns + " / " + Np + " = " + nn(n) + (n > 1 ? " > 1: step-up" : " < 1: step-down") }; });
G("11", "g11-5", "Impedance matching", function(){ var Zs = pk([100, 400, 800, 1600]), Zl = pk([4, 8, 16]), n = Math.sqrt(Zl / Zs);
  return { q: "A source with Z_S = " + Zs + " Ω drives a " + Zl + " Ω speaker. Find the turns ratio n that matches them.", unit: "", ans: r3(n), fig: null, sol: "n = √(Z_L / Z_S) = √(" + Zl + " / " + Zs + ") = " + nn(r3(n)) }; });
G("11", "g11-6", "Step-up and step-down", function(){ var P = pk([10, 20, 50]) * 1000, V1 = pk([1000, 2000]), k = pk([5, 10, 20]), R = pk([1, 2, 5]), I1 = P / V1, I2 = I1 / k, L1 = I1 * I1 * R, L2 = I2 * I2 * R;
  return { q: P / 1000 + " kW is sent at " + V1 + " V through lines of " + R + " Ω. A transformer raises the voltage " + k + " times. Find the new line loss.", unit: "W", ans: r3(L2), fig: null, sol: "Before: I = " + nn(I1) + " A, loss = " + nn(r3(L1)) + " W\nAfter: I = " + nn(I1) + " / " + k + " = " + nn(I2) + " A\nLoss = I² R = " + nn(r3(L2)) + " W" }; });
G("M", "gM-1", "Torque and power", function(){ var V = pk([6, 12, 24]), K = pk([0.02, 0.05, 0.1]), w = rd(V / K);
  return { q: "A PM DC motor has V_in = " + V + " V and K_E = " + K + " V/(rad/s). Find the no-load speed.", unit: "rad/s", ans: r3(w), fig: null, sol: "ω_NL = V_in / K_E = " + V + " / " + K + " = " + nn(r3(w)) + " rad/s" }; });
G("M", "gM-2", "Torque and power", function(){ var V = pk([6, 12, 24]), K = pk([0.02, 0.05, 0.1]), R = pk([1, 2, 4]), T = rd(K * V / R);
  return { q: "A PM DC motor has V_in = " + V + " V, R = " + R + " Ω and K_T = " + K + " N·m/A. Find the stall torque.", unit: "N·m", ans: r3(T), fig: figMotor("V_in = " + V + " V", "R = " + R + " Ω", "V_bemf = 0 (stall)"), sol: "T_stall = K_T V_in / R = " + K + " × " + V + " / " + R + " = " + nn(r3(T)) + " N·m" }; });
G("M", "gM-3", "Motor model", function(){ var V = pk([12, 24]), R = pk([1, 2, 4]), Eb = pk([4, 6, 8, 10]), I = rd((V - Eb) / R);
  return { q: "V_in = " + V + " V, R = " + R + " Ω and the back EMF is " + Eb + " V. Find the motor current.", unit: "A", ans: I, fig: figMotor("V_in = " + V + " V", "R = " + R + " Ω", "V_bemf = " + Eb + " V", "I = ?"), sol: "I = (V_in − V_bemf) / R = (" + V + " − " + Eb + ") / " + R + " = " + nn(I) + " A" }; });
G("M", "gM-4", "Motor model", function(){ var K = pk([0.02, 0.05, 0.1]), I = pk([0.5, 1, 2, 3]), T = rd(K * I);
  return { q: "K_T = " + K + " N·m/A and the current is " + I + " A. Find the torque.", unit: "N·m", ans: T, fig: null, sol: "T = K_T I = " + K + " × " + I + " = " + nn(T) + " N·m" }; });
G("M", "gM-5", "Torque and power", function(){ var Ts = pk([50, 100, 200]), wn = pk([1000, 1500, 3000]), T = pk([10, 20, 25]), w = rd(wn * (1 - T / Ts));
  return { q: "A PM motor has T_stall = " + Ts + " in·oz and ω_NL = " + wn + " rpm. Find the speed at a load of " + T + " in·oz.", unit: "rpm", ans: r3(w), fig: figTS(Ts + " in·oz", wn + " rpm", T + " in·oz"), sol: "ω = ω_NL (1 − T / T_stall) = " + wn + " × (1 − " + T + " / " + Ts + ") = " + nn(r3(w)) + " rpm" }; });
G("M", "gM-6", "Torque and power", function(){ var T = pk([0.05, 0.1, 0.2]), w = pk([100, 150, 200]), V = 12, I = pk([2, 3, 4]), e = rd(100 * T * w / (V * I));
  if (e >= 100) { I = 5; e = rd(100 * T * w / (V * I)); }
  return { q: "A motor gives T = " + T + " N·m at ω = " + w + " rad/s. It takes " + V + " V and " + I + " A. Find the efficiency in percent.", unit: "%", ans: r3(e), fig: null, sol: "η = T ω / (V I) = " + nn(rd(T * w)) + " W / " + V * I + " W = " + nn(r3(e)) + " %" }; });
G("M", "gM-7", "Torque and power", function(){ var F = pk([5, 10, 16, 20]), r = pk([1, 2, 3]), T = F * r;
  return { q: "A " + F + " oz weight hangs from a pulley of radius " + r + " in on the motor shaft. Find the torque needed.", unit: "in·oz", ans: T, fig: null, sol: "T = F × r = " + F + " oz × " + r + " in = " + T + " in·oz" }; });
