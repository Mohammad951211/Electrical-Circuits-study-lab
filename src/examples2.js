  // ===== extra worked examples, 3 per topic (slide and book examples are in examples.js) =====
  var XN = 0;
  function ex(ch, topic, t, q, given, find, steps, ans, fig){
    var e = { id: "X" + (++XN), topic: topic, t: t, q: q, given: given, find: find, steps: steps, ans: ans };
    if (fig) e.fig = fig; EXAMPLES[ch].push(e);
  }
  // ---------- Chapter 1 ----------
  ex("1", "The basic circuit", "Name the parts of a circuit", "A torch has a battery, a switch, a bulb and two wires. Name the source and the load. Say what happens when the switch is open.", "battery, switch, bulb, wires", "source, load, state of the lamp", [
    "Find the part that supplies energy. This is the source: the battery.",
    "Find the part that uses the energy. This is the load: the bulb.",
    "The switch and the wires only connect the two. They carry the current and control it.",
    "Open switch: the loop is broken, so no current can flow. The bulb stays dark."], "Source: battery. Load: bulb. Open switch: no current.");
  ex("1", "The basic circuit", "Current in a simple loop", "A 12 V battery is connected through a closed switch to a lamp of 6 Ω. Find the current and the power of the lamp.", "E = 12 V, R = 6 Ω", "I and P", [
    "The loop is closed, so one current flows through the battery and the lamp.",
    "Ohm's law gives the current: I = E / R = 12 V / 6 Ω = 2 A.",
    "The power of the load is P = E I = 12 V × 2 A = 24 W.",
    "Check: P = I² R = (2 A)² × 6 Ω = 24 W. Both results agree."], "I = 2 A, P = 24 W", function(){ return exSeries("E = 12 V", ["Lamp 6 Ω"]); });
  ex("1", "The basic circuit", "Why the lamp does not light", "A 9 V battery, a switch and a lamp are in one loop. The switch is closed, but one wire is cut. Will the lamp light? How much current flows?", "9 V battery, closed switch, cut wire", "state of the lamp and I", [
    "Look for a closed path from the battery back to the battery.",
    "The cut wire breaks the path, so the circuit is open even though the switch is closed.",
    "An open circuit has an infinite resistance, so I = E / R = 0 A.",
    "No current means no energy for the lamp. The lamp stays dark."], "No. I = 0 A.");

  // Current
  ex("1", "Current", "Number of electrons", "A current of 3.2 A flows for 5 s. How much charge passes, and how many electrons is this? (One electron carries 1.6×10⁻¹⁹ C.)", "I = 3.2 A, t = 5 s, e = 1.6×10⁻¹⁹ C", "Q and the number of electrons", [
    "Current is charge per second, so Q = I t.",
    "Q = 3.2 A × 5 s = 16 C.",
    "The number of electrons is the total charge divided by the charge of one electron: n = Q / e.",
    "n = 16 C / (1.6×10⁻¹⁹ C) = 1×10²⁰ electrons."], "Q = 16 C, n = 1×10²⁰ electrons");

  // Voltage
  ex("1", "Voltage", "Voltage drop across a resistor", "A current of 2 mA flows through a 3.3 kΩ resistor. Find the voltage across the resistor.", "I = 2 mA, R = 3.3 kΩ", "V", [
    "Write the prefixes as powers of ten: I = 2×10⁻³ A and R = 3.3×10³ Ω.",
    "Ohm's law gives the voltage drop: V = I R.",
    "V = (2×10⁻³ A)(3.3×10³ Ω) = 6.6 V.",
    "Shortcut: mA × kΩ gives V directly. 2 × 3.3 = 6.6 V."], "V = 6.6 V", function(){ return exSeries("I = 2 mA", ["R 3.3 kΩ"]); });
  ex("1", "Voltage", "Work needed to move a charge", "How much work is needed to move 5 C of charge through a potential difference of 9 V?", "Q = 5 C, V = 9 V", "W", [
    "Voltage is work per unit charge: V = W / Q.",
    "Solve for the work: W = V Q.",
    "W = 9 V × 5 C = 45 J.",
    "Meaning: each coulomb gains 9 J, so 5 C gain 45 J."], "W = 45 J");

  // Resistance and conductance
  ex("1", "Resistance and conductance", "Resistance of an aluminium wire", "An aluminium wire is 100 m long with a cross-sectional area of 2 mm². Find its resistance. (ρ for aluminium = 2.82×10⁻⁸ Ω·m)", "ℓ = 100 m, A = 2 mm² = 2×10⁻⁶ m², ρ = 2.82×10⁻⁸ Ω·m", "R", [
    "Use R = ρ ℓ / A.",
    "Change the area to m²: 2 mm² = 2×10⁻⁶ m². All lengths must be in metres.",
    "R = (2.82×10⁻⁸ Ω·m)(100 m) / (2×10⁻⁶ m²).",
    "R = 1.41 Ω.",
    "Check: a longer wire or a thinner wire gives a larger R, as expected."], "R = 1.41 Ω");
  ex("1", "Resistance and conductance", "Conductance of a parallel pair", "Two conductors have G₁ = 0.2 S and G₂ = 0.3 S. Find the resistance of each and say which one conducts better.", "G₁ = 0.2 S, G₂ = 0.3 S", "R₁, R₂", [
    "Resistance is the reciprocal of conductance: R = 1 / G.",
    "R₁ = 1 / 0.2 S = 5 Ω.",
    "R₂ = 1 / 0.3 S = 3.33 Ω.",
    "The larger conductance has the smaller resistance, so G₂ conducts better."], "R₁ = 5 Ω, R₂ = 3.33 Ω. The second conducts better.");

  // Ohm's law
  ex("1", "Ohm's law", "Find the voltage and the power", "A heater of 24 Ω carries a current of 5 A. Find the voltage across it and its power.", "R = 24 Ω, I = 5 A", "V and P", [
    "Ohm's law gives the voltage: V = I R.",
    "V = 5 A × 24 Ω = 120 V.",
    "Power: P = V I = 120 V × 5 A = 600 W.",
    "Check: P = I² R = 25 × 24 = 600 W."], "V = 120 V, P = 600 W", function(){ return exSeries("E = 120 V", ["R 24 Ω"]); });
  ex("1", "Ohm's law", "Find the resistance from a measurement", "A voltmeter reads 7.5 V across a resistor and an ammeter reads 25 mA. Find R. What is the new current if the voltage rises to 12 V?", "V = 7.5 V, I = 25 mA", "R and the new I", [
    "Ohm's law: R = V / I.",
    "R = 7.5 V / (25×10⁻³ A) = 300 Ω.",
    "The resistor does not change, so I = V / R for the new voltage.",
    "I = 12 V / 300 Ω = 0.04 A = 40 mA.",
    "Check: the voltage rose by 1.6 times, so the current also rose by 1.6 times (25 mA to 40 mA)."], "R = 300 Ω, I = 40 mA");

  // Resistor colour code
  ex("1", "Resistor colour code", "Read a four-band resistor", "A resistor has the bands red, red, orange, gold. Find its value and its tolerance range.", "red, red, orange, gold", "R and the range", [
    "Bands 1 and 2 are digits: red = 2 and red = 2, so 22.",
    "Band 3 is the multiplier: orange = ×10³, so R = 22 × 1000 = 22 kΩ.",
    "Band 4 is the tolerance: gold = ±5 %.",
    "5 % of 22 kΩ = 1.1 kΩ, so the range is 20.9 kΩ to 23.1 kΩ."], "R = 22 kΩ ± 5 %, range 20.9 kΩ to 23.1 kΩ");
  ex("1", "Resistor colour code", "Choose the colours for a value", "Give the four colour bands of a 470 Ω resistor with a tolerance of 10 %.", "R = 470 Ω, tolerance 10 %", "the four bands", [
    "Write the value as two digits and a multiplier: 470 Ω = 47 × 10¹.",
    "Digit 1 is 4 (yellow) and digit 2 is 7 (violet).",
    "The multiplier is 10¹ (brown).",
    "The tolerance of 10 % is silver."], "yellow, violet, brown, silver");

  // ---------- Chapter 2 ----------
  ex("2", "Kirchhoff's voltage law (KVL)", "Find a source voltage with KVL", "A series loop has R₁ = 10 Ω, R₂ = 20 Ω and R₃ = 30 Ω. The current is 0.5 A. Find the source voltage E.", "R₁ = 10 Ω, R₂ = 20 Ω, R₃ = 30 Ω, I = 0.5 A", "E", [
    "KVL: the source voltage equals the sum of the voltage drops, E = V₁ + V₂ + V₃.",
    "Find each drop with Ohm's law: V₁ = 0.5 A × 10 Ω = 5 V.",
    "V₂ = 0.5 A × 20 Ω = 10 V and V₃ = 0.5 A × 30 Ω = 15 V.",
    "E = 5 V + 10 V + 15 V = 30 V.",
    "Check: E = I R_T = 0.5 A × 60 Ω = 30 V."], "E = 30 V", function(){ return exSeries("E = ?", ["R_1 10 Ω", "R_2 20 Ω", "R_3 30 Ω"]); });
  ex("2", "Kirchhoff's current law (KCL)", "KCL with three branches", "At a node, 6 A enters through branch 1 and 2 A enters through branch 2. Branch 3 takes away 5 A. Find the current in branch 4 and its direction.", "I₁ = 6 A in, I₂ = 2 A in, I₃ = 5 A out", "I₄", [
    "KCL: the sum of the currents entering a node equals the sum leaving it.",
    "Entering: 6 A + 2 A = 8 A.",
    "Leaving: 5 A + I₄ must also be 8 A.",
    "I₄ = 8 A − 5 A = 3 A. The sign is positive, so I₄ leaves the node."], "I₄ = 3 A, leaving the node");
  ex("2", "Node, branch, mesh, loop", "Count nodes, branches and meshes", "A circuit has a source E in the left branch, R₁ in the middle branch and R₂ in the right branch. All three branches connect between a top wire and a bottom wire. Count the nodes, branches, meshes and loops.", "3 parallel branches between two wires", "n, b, meshes, loops", [
    "A node is a point where two or more branches meet. The top wire and the bottom wire are the two nodes: n = 2.",
    "A branch holds one element in series. There are three: E, R₁ and R₂, so b = 3.",
    "A mesh is a loop with no other loop inside. Two windows are open: E with R₁, and R₁ with R₂. So there are 2 meshes.",
    "A loop is any closed path. The outer path (E with R₂) is a third loop, so there are 3 loops.",
    "Check: meshes = b − n + 1 = 3 − 2 + 1 = 2."], "n = 2, b = 3, meshes = 2, loops = 3");
  ex("2", "Node, branch, mesh, loop", "Mesh equation count", "A circuit has b = 5 branches and n = 3 nodes. How many independent KCL equations and how many mesh (KVL) equations are needed?", "b = 5, n = 3", "KCL and KVL equation counts", [
    "KCL gives n − 1 independent equations, because the last node equation repeats the others.",
    "n − 1 = 3 − 1 = 2 KCL equations.",
    "The number of meshes is b − n + 1 = 5 − 3 + 1 = 3, so 3 KVL equations.",
    "Check: 2 + 3 = 5 equations for 5 unknown branch currents."], "2 KCL equations and 3 KVL equations");
  ex("2", "Node, branch, mesh, loop", "Is this node a supernode?", "A 10 V source sits between nodes a and b with no resistor in series. Other branches connect to a and to b. How is this handled in KCL?", "voltage source directly between two nodes", "how to apply KCL", [
    "The current in an ideal source is not known from its voltage, so KCL at a or at b alone has an unknown term.",
    "Draw a closed surface around both nodes a and b and the source. This is a supernode.",
    "Apply KCL to the whole surface: the currents entering equal the currents leaving. The source current stays inside and cancels.",
    "Add the source condition as the second equation: V_a − V_b = 10 V."], "Use a supernode and add V_a − V_b = 10 V.");
  ex("2", "Real voltage source", "Open-circuit and short-circuit of a real source", "A real source has V_S = 12 V and R_S = 2 Ω. Find the terminal voltage with no load and the current when the terminals are shorted.", "V_S = 12 V, R_S = 2 Ω", "V_oc and I_sc", [
    "No load means no current, so there is no drop in R_S: V_oc = V_S = 12 V.",
    "A short circuit puts R_L = 0, so only R_S limits the current.",
    "I_sc = V_S / R_S = 12 V / 2 Ω = 6 A.",
    "Meaning: a small R_S gives a stiff source, and a large R_S makes the voltage fall quickly with load."], "V_oc = 12 V, I_sc = 6 A");
  ex("2", "Real voltage source", "Load voltage of a real source", "A battery has V_S = 9 V and R_S = 1 Ω. It feeds a load of 8 Ω. Find the load voltage and the voltage lost inside the source.", "V_S = 9 V, R_S = 1 Ω, R_L = 8 Ω", "V_L and the internal drop", [
    "R_S and R_L are in series, so I = V_S / (R_S + R_L) = 9 V / 9 Ω = 1 A.",
    "The load voltage is V_L = I R_L = 1 A × 8 Ω = 8 V.",
    "The internal drop is I R_S = 1 A × 1 Ω = 1 V.",
    "Check with KVL: 8 V + 1 V = 9 V = V_S."], "V_L = 8 V, internal drop = 1 V", function(){ return exSeries("V_S = 9 V", ["R_S 1 Ω", "R_L 8 Ω"]); });
  ex("2", "Current source", "Voltage across a resistor fed by a current source", "An ideal current source of 4 mA feeds a resistor of 2.5 kΩ. Find the voltage across the resistor and its power.", "I_S = 4 mA, R = 2.5 kΩ", "V and P", [
    "An ideal current source forces its current through the circuit. The current is 4 mA whatever R is.",
    "The voltage follows from Ohm's law: V = I R = 4 mA × 2.5 kΩ = 10 V.",
    "Power: P = I² R = (4×10⁻³ A)² × 2500 Ω = 0.04 W = 40 mW.",
    "Check: P = V I = 10 V × 4 mA = 40 mW."], "V = 10 V, P = 40 mW");
  ex("2", "Current source", "Doubling the resistance", "The same 4 mA current source now feeds 5 kΩ. What happens to the current and to the voltage?", "I_S = 4 mA, R = 5 kΩ", "I and V", [
    "The current of an ideal current source does not change with the load: I = 4 mA.",
    "The voltage changes: V = I R = 4 mA × 5 kΩ = 20 V.",
    "The voltage doubled because R doubled.",
    "Compare with a voltage source: there the voltage stays fixed and the current changes."], "I = 4 mA (unchanged), V = 20 V (doubled)");
  ex("2", "Current source", "An open circuit at a current source", "An ideal current source of 2 A is connected to nothing (open terminals). What is the terminal voltage?", "I_S = 2 A, R = ∞", "V", [
    "The current source must push 2 A, but an open circuit allows no current.",
    "V = I R and R → ∞, so the voltage would grow without limit.",
    "A real current source has a large R_P in parallel, so the voltage stays finite.",
    "Rule: never leave a current source open. Short it, or give it a load."], "The voltage is not defined (infinite for an ideal source). Never open a current source.");
  ex("2", "Metric prefixes", "Convert with prefixes", "Write 0.0047 A in mA, 2200 Ω in kΩ and 3.3×10⁻⁶ F in μF.", "0.0047 A, 2200 Ω, 3.3×10⁻⁶ F", "the three converted values", [
    "m means 10⁻³. To change A to mA multiply by 1000: 0.0047 A × 1000 = 4.7 mA.",
    "k means 10³. To change Ω to kΩ divide by 1000: 2200 Ω / 1000 = 2.2 kΩ.",
    "μ means 10⁻⁶. 3.3×10⁻⁶ F = 3.3 μF.",
    "Check: each prefix changes the number and the unit in opposite ways, so the physical value stays the same."], "4.7 mA, 2.2 kΩ, 3.3 μF");
  ex("2", "Metric prefixes", "Ohm's law with prefixes", "A voltage of 5 V is applied to 2 kΩ. Find the current in mA.", "V = 5 V, R = 2 kΩ", "I", [
    "Write the resistance in ohms: 2 kΩ = 2×10³ Ω.",
    "I = V / R = 5 V / (2×10³ Ω) = 2.5×10⁻³ A.",
    "2.5×10⁻³ A = 2.5 mA.",
    "Shortcut: V divided by kΩ gives mA directly."], "I = 2.5 mA");
  ex("2", "Metric prefixes", "Power with prefixes", "A current of 30 mA flows through a 1.2 kΩ resistor. Find the power in mW.", "I = 30 mA, R = 1.2 kΩ", "P", [
    "Use P = I² R.",
    "Convert: I = 30×10⁻³ A and R = 1.2×10³ Ω.",
    "P = (30×10⁻³ A)² × 1.2×10³ Ω = 9×10⁻⁴ × 1.2×10³ W = 1.08 W.",
    "In milliwatts: 1.08 W = 1080 mW."], "P = 1.08 W = 1080 mW");

  // ---------- Chapter 3 ----------
  ex("3", "Series circuit", "Find E from R_T and I", "Three resistors of 4 Ω, 6 Ω and 10 Ω are in series. The current is 1.5 A. Find R_T, the supply voltage and the voltage across the 6 Ω resistor.", "R₁ = 4 Ω, R₂ = 6 Ω, R₃ = 10 Ω, I = 1.5 A", "R_T, E, V₂", [
    "In series the resistances add: R_T = R₁ + R₂ + R₃ = 4 + 6 + 10 = 20 Ω.",
    "The supply voltage is E = I R_T = 1.5 A × 20 Ω = 30 V.",
    "The same current flows in every resistor, so V₂ = I R₂ = 1.5 A × 6 Ω = 9 V.",
    "Check with KVL: V₁ + V₂ + V₃ = 6 V + 9 V + 15 V = 30 V."], "R_T = 20 Ω, E = 30 V, V₂ = 9 V", function(){ return exSeries("E = ?", ["R_1 4 Ω", "R_2 6 Ω", "R_3 10 Ω"]); });
  ex("3", "Voltage-divider rule (VDR)", "Voltage divider with two resistors", "E = 12 V is applied to R₁ = 2 kΩ in series with R₂ = 4 kΩ. Find V₁ and V₂ with the voltage-divider rule.", "E = 12 V, R₁ = 2 kΩ, R₂ = 4 kΩ", "V₁, V₂", [
    "The divider rule: V_x = E R_x / R_T. The larger resistor takes the larger share.",
    "R_T = 2 kΩ + 4 kΩ = 6 kΩ.",
    "V₁ = 12 V × 2 kΩ / 6 kΩ = 4 V.",
    "V₂ = 12 V × 4 kΩ / 6 kΩ = 8 V.",
    "Check: V₁ + V₂ = 12 V = E."], "V₁ = 4 V, V₂ = 8 V", function(){ return exSeries("E = 12 V", ["R_1 2 kΩ", "R_2 4 kΩ"]); });
  ex("3", "Voltage-divider rule (VDR)", "Choose a resistor for a given output", "A 9 V supply feeds R₁ in series with R₂ = 3 kΩ. The voltage across R₂ must be 3 V. Find R₁.", "E = 9 V, R₂ = 3 kΩ, V₂ = 3 V", "R₁", [
    "The divider rule for R₂: V₂ = E R₂ / (R₁ + R₂).",
    "Put in the numbers: 3 V = 9 V × 3 kΩ / (R₁ + 3 kΩ).",
    "Solve for the total: R₁ + 3 kΩ = 9 V × 3 kΩ / 3 V = 9 kΩ.",
    "R₁ = 9 kΩ − 3 kΩ = 6 kΩ.",
    "Check: V₂ = 9 × 3 / 9 = 3 V ✓"], "R₁ = 6 kΩ");
  ex("3", "Circuit ground", "Voltages relative to ground", "E = 20 V feeds R₁ = 6 kΩ (from a to b) and R₂ = 4 kΩ (from b to ground). The negative terminal of the source is ground. Find V_a, V_b and V_ab.", "E = 20 V, R₁ = 6 kΩ, R₂ = 4 kΩ", "V_a, V_b, V_ab", [
    "A single subscript means the voltage of a point relative to ground. Point a is on the positive terminal, so V_a = 20 V.",
    "The current is I = 20 V / (6 kΩ + 4 kΩ) = 2 mA.",
    "V_b is the drop across R₂ (b to ground): V_b = 2 mA × 4 kΩ = 8 V.",
    "A double subscript is a difference: V_ab = V_a − V_b = 20 V − 8 V = 12 V.",
    "Check: V_ab is the drop across R₁ = 2 mA × 6 kΩ = 12 V ✓"], "V_a = 20 V, V_b = 8 V, V_ab = 12 V");
  ex("3", "Circuit ground", "Moving the ground point", "The same circuit has E = 20 V, R₁ = 6 kΩ and R₂ = 4 kΩ. Now ground is placed at point b (between the two resistors). Find V_a and the voltage at the negative terminal of the source.", "ground at b", "V_a and V_neg", [
    "Moving the ground does not change the currents or the drops. I = 2 mA, V₁ = 12 V and V₂ = 8 V.",
    "Point a is above b by the drop across R₁: V_a = +12 V.",
    "The negative terminal is below b by the drop across R₂: V_neg = −8 V.",
    "The difference is still 12 V − (−8 V) = 20 V = E.",
    "Lesson: the ground only chooses the zero level. Differences between points never change."], "V_a = +12 V, V_neg = −8 V");
  ex("3", "Parallel circuit", "Two resistors in parallel", "R₁ = 12 Ω and R₂ = 4 Ω are in parallel on E = 24 V. Find R_eq, the total current and each branch current.", "E = 24 V, R₁ = 12 Ω, R₂ = 4 Ω", "R_eq, I_T, I₁, I₂", [
    "For two resistors in parallel: R_eq = R₁ R₂ / (R₁ + R₂).",
    "R_eq = 12 × 4 / (12 + 4) = 48 / 16 = 3 Ω. It is smaller than the smaller resistor.",
    "Every branch has the full voltage: I₁ = 24 V / 12 Ω = 2 A and I₂ = 24 V / 4 Ω = 6 A.",
    "KCL: I_T = I₁ + I₂ = 8 A.",
    "Check: E / R_eq = 24 V / 3 Ω = 8 A ✓"], "R_eq = 3 Ω, I_T = 8 A, I₁ = 2 A, I₂ = 6 A", function(){ return exPar("E = 24 V", ["R_1 12 Ω", "R_2 4 Ω"]); });
  ex("3", "Parallel circuit", "Equal resistors in parallel", "Four 100 Ω resistors are in parallel on 10 V. Find R_eq and the total current.", "4 × 100 Ω, E = 10 V", "R_eq, I_T", [
    "For n equal resistors in parallel: R_eq = R / n.",
    "R_eq = 100 Ω / 4 = 25 Ω.",
    "I_T = E / R_eq = 10 V / 25 Ω = 0.4 A.",
    "Check: each branch takes 10 V / 100 Ω = 0.1 A, and 4 × 0.1 A = 0.4 A ✓"], "R_eq = 25 Ω, I_T = 0.4 A");
  ex("3", "Current-divider rule (CDR)", "Current divider with two branches", "A current of 12 A enters two parallel branches of 3 Ω and 6 Ω. Find the current in each.", "I_T = 12 A, R₁ = 3 Ω, R₂ = 6 Ω", "I₁, I₂", [
    "The divider rule for two branches: I₁ = I_T R₂ / (R₁ + R₂). The current favours the smaller resistance.",
    "I₁ = 12 A × 6 Ω / 9 Ω = 8 A.",
    "I₂ = 12 A × 3 Ω / 9 Ω = 4 A.",
    "Check: I₁ + I₂ = 12 A, and I₁ R₁ = 24 V = I₂ R₂ ✓"], "I₁ = 8 A, I₂ = 4 A", function(){ return exPar("I_T = 12 A", ["R_1 3 Ω", "R_2 6 Ω"]); });
  ex("3", "Series–parallel circuits", "Series resistor with a parallel pair", "E = 18 V feeds R₁ = 3 Ω in series with the parallel pair R₂ = 12 Ω and R₃ = 6 Ω. Find I_T, the voltage across the pair and the current in R₃.", "E = 18 V, R₁ = 3 Ω, R₂ = 12 Ω, R₃ = 6 Ω", "I_T, V_pair, I₃", [
    "Combine the parallel pair first: R₂₃ = 12 × 6 / (12 + 6) = 4 Ω.",
    "The circuit is now R₁ in series with R₂₃: R_T = 3 + 4 = 7 Ω.",
    "I_T = 18 V / 7 Ω = 2.571 A.",
    "The voltage across the pair is V₂₃ = I_T R₂₃ = 2.571 A × 4 Ω = 10.29 V.",
    "I₃ = V₂₃ / R₃ = 10.29 V / 6 Ω = 1.714 A.",
    "Check: I₂ = 10.29 / 12 = 0.857 A, and 0.857 A + 1.714 A = 2.571 A ✓"], "I_T = 2.571 A, V₂₃ = 10.29 V, I₃ = 1.714 A");
  ex("3", "Series–parallel circuits", "Two series branches in parallel", "E = 30 V is across two parallel branches. Branch A is 10 Ω + 20 Ω in series. Branch B is 15 Ω + 15 Ω in series. Find each branch current and the total current.", "E = 30 V, A: 10 Ω + 20 Ω, B: 15 Ω + 15 Ω", "I_A, I_B, I_T", [
    "Replace each series branch by one resistor: R_A = 10 + 20 = 30 Ω and R_B = 15 + 15 = 30 Ω.",
    "Each branch has the full source voltage across it.",
    "I_A = 30 V / 30 Ω = 1 A and I_B = 30 V / 30 Ω = 1 A.",
    "KCL: I_T = 1 A + 1 A = 2 A.",
    "Check: R_eq = 30 / 2 = 15 Ω, and 30 V / 15 Ω = 2 A ✓"], "I_A = 1 A, I_B = 1 A, I_T = 2 A");

  // ---------- Chapter 4 ----------
  ex("4", "Source conversion", "Equivalent at the terminals only", "E = 12 V with R_S = 3 Ω feeds R_L = 6 Ω. Convert to a current source. Find I_L and the power in R_S in both circuits.", "E = 12 V, R_S = 3 Ω, R_L = 6 Ω", "I_S, I_L, P_RS", [
    "Convert: I_S = E / R_S = 12 V / 3 Ω = 4 A, with R_S = 3 Ω in parallel.",
    "Voltage-source circuit: I_L = E / (R_S + R_L) = 12 V / 9 Ω = 1.333 A, so V_L = 8 V.",
    "Current-source circuit, CDR: I_L = I_S R_S / (R_S + R_L) = 4 × 3 / 9 = 1.333 A. The load sees the same current.",
    "Power in R_S, voltage source: I² R_S = (1.333)² × 3 = 5.33 W.",
    "Power in R_S, current source: V_L² / R_S = 8² / 3 = 21.3 W.",
    "The two sources are equal only at the terminals. Inside, the power in R_S differs."], "I_L = 1.333 A. P_RS = 5.33 W (voltage source) and 21.3 W (current source).");
  ex("4", "The polarity rule", "Direction of the arrow", "A voltage source E = 8 V with R_S = 2 Ω has its + terminal at the bottom. Convert it to a current source. Give I_S and the direction of the arrow.", "E = 8 V (+ at the bottom), R_S = 2 Ω", "I_S and its direction", [
    "The size is I_S = E / R_S = 8 V / 2 Ω = 4 A.",
    "R_S moves from series to parallel with the source.",
    "Polarity rule: the arrow of the current source points toward the + terminal of the voltage source.",
    "The + terminal is at the bottom, so the arrow points down."], "I_S = 4 A with the arrow pointing down, R_S = 2 Ω in parallel");
  ex("4", "Sources in series and parallel", "Add series sources with signs", "In a loop with R = 5 Ω, E₁ = 12 V aids the current, E₂ = 5 V opposes it and E₃ = 3 V aids it. Find the equivalent source and the current.", "E₁ = 12 V, E₂ = 5 V, E₃ = 3 V, R = 5 Ω", "E_T and I", [
    "Sources in series add. Aiding sources count as plus, and opposing sources count as minus.",
    "E_T = 12 V − 5 V + 3 V = 10 V.",
    "The sign is positive, so E_T acts in the direction of E₁.",
    "I = E_T / R = 10 V / 5 Ω = 2 A."], "E_T = 10 V, I = 2 A");
  ex("4", "Branch current analysis", "A branch with zero current", "E₁ = 12 V, E₂ = 8 V, R₁ = 2 Ω, R₂ = 4 Ω and R₃ = 4 Ω (two sources feeding the common branch R₃). Find I₁, I₂ and I₃.", "E₁ = 12 V, E₂ = 8 V, R₁ = 2 Ω, R₂ = 4 Ω, R₃ = 4 Ω", "I₁, I₂, I₃", [
    "Choose reference directions for I₁, I₂ and I₃ toward the common node a.",
    "KCL at node a: I₃ = I₁ + I₂.",
    "KVL mesh 1: 2 I₁ + 4 I₃ = 12. KVL mesh 2: 4 I₂ + 4 I₃ = 8.",
    "Put in I₃ = I₁ + I₂: 6 I₁ + 4 I₂ = 12 and 4 I₁ + 8 I₂ = 8.",
    "Divide: 3 I₁ + 2 I₂ = 6 and I₁ + 2 I₂ = 2. Subtract: 2 I₁ = 4, so I₁ = 2 A.",
    "I₂ = (2 − 2) / 2 = 0 A and I₃ = 2 A.",
    "Check mesh 2: 4(0) + 4(2) = 8 V ✓. The second branch carries no current because E₂ equals the voltage across R₃."], "I₁ = 2 A, I₂ = 0 A, I₃ = 2 A");
  ex("4", "A circuit with a current source", "Current source in one branch", "A circuit has two nodes a and b. Branch 1 holds E = 10 V in series with R₁ = 2 Ω (current I₁ flows up into a). Branch 2 is a current source I_S = 2 A pointing up into a. Branch 3 is R₃ = 3 Ω between a and b. Find I₁, I₃ and V_ab.", "E = 10 V, R₁ = 2 Ω, I_S = 2 A, R₃ = 3 Ω", "I₁, I₃, V_ab", [
    "The current in branch 2 is known (2 A), so only I₁ and I₃ are unknown. One KCL and one KVL are enough.",
    "KCL at node a: I₁ + 2 A = I₃.",
    "KVL on the loop of E, R₁ and R₃: 2 I₁ + 3 I₃ = 10.",
    "Put in I₃ = I₁ + 2: 2 I₁ + 3 I₁ + 6 = 10, so 5 I₁ = 4 and I₁ = 0.8 A.",
    "I₃ = 0.8 + 2 = 2.8 A and V_ab = I₃ R₃ = 2.8 × 3 = 8.4 V.",
    "Power check: sources give 10 × 0.8 + 8.4 × 2 = 24.8 W. Resistors take 0.8² × 2 + 2.8² × 3 = 1.28 + 23.52 = 24.8 W ✓"], "I₁ = 0.8 A, I₃ = 2.8 A, V_ab = 8.4 V");
  ex("4", "A circuit with a current source", "Same circuit with the other numbers", "Use the same layout with E = 12 V, R₁ = 3 Ω, I_S = 1 A (up into a) and R₃ = 6 Ω. Find I₁ and V_ab.", "E = 12 V, R₁ = 3 Ω, I_S = 1 A, R₃ = 6 Ω", "I₁, V_ab", [
    "KCL at node a: I₁ + 1 A = I₃.",
    "KVL: 3 I₁ + 6 I₃ = 12.",
    "Put in I₃ = I₁ + 1: 3 I₁ + 6 I₁ + 6 = 12, so 9 I₁ = 6 and I₁ = 0.667 A.",
    "I₃ = 1.667 A and V_ab = 1.667 × 6 = 10 V.",
    "Power check: sources give 12 × 0.667 + 10 × 1 = 18 W. Resistors take 0.667² × 3 + 1.667² × 6 = 1.33 + 16.67 = 18 W ✓"], "I₁ = 0.667 A, V_ab = 10 V");
  ex("4", "A circuit with a current source", "Current source pointing the other way", "In the first circuit of this topic (E = 10 V, R₁ = 2 Ω, R₃ = 3 Ω) the 2 A current source now points down, away from node a. Find I₁ and V_ab.", "E = 10 V, R₁ = 2 Ω, R₃ = 3 Ω, I_S = 2 A (down)", "I₁, V_ab", [
    "The source now takes 2 A away from node a.",
    "KCL at node a: I₁ = I₃ + 2 A.",
    "KVL: 2 I₁ + 3 I₃ = 10. Put in I₁ = I₃ + 2: 2 I₃ + 4 + 3 I₃ = 10, so I₃ = 1.2 A.",
    "I₁ = 1.2 + 2 = 3.2 A and V_ab = 1.2 × 3 = 3.6 V.",
    "Power check: E gives 10 × 3.2 = 32 W. R₁ takes 20.48 W, R₃ takes 4.32 W and the current source absorbs 3.6 × 2 = 7.2 W. The total is 32 W ✓"], "I₁ = 3.2 A, V_ab = 3.6 V");

  // ---------- Chapter 5 ----------
  ex("5", "Superposition theorem", "Superposition with two voltage sources", "E₁ = 12 V with R₁ = 4 Ω feeds the left branch. E₂ = 6 V with R₂ = 4 Ω feeds the right branch. R₃ = 2 Ω is the middle branch. Both sources push current into R₃. Find I₃.", "E₁ = 12 V, E₂ = 6 V, R₁ = R₂ = 4 Ω, R₃ = 2 Ω", "I₃", [
    "Superposition: find the effect of each source alone, then add. A source that is switched off is replaced by a short circuit.",
    "E₁ alone (E₂ shorted): R₂ // R₃ = 4 × 2 / 6 = 1.333 Ω, so R_T = 4 + 1.333 = 5.333 Ω.",
    "The current from E₁ is 12 V / 5.333 Ω = 2.25 A. CDR into R₃: I₃′ = 2.25 A × 4 / (4 + 2) = 1.5 A.",
    "E₂ alone (E₁ shorted): R₁ // R₃ = 1.333 Ω, so R_T = 5.333 Ω and the current is 6 V / 5.333 Ω = 1.125 A.",
    "CDR into R₃: I₃″ = 1.125 A × 4 / 6 = 0.75 A, in the same direction as I₃′.",
    "Add: I₃ = 1.5 A + 0.75 A = 2.25 A.",
    "Check with the node voltage: V_a = (12/4 + 6/4) / (1/4 + 1/4 + 1/2) = 4.5 V, and 4.5 V / 2 Ω = 2.25 A ✓"], "I₃ = 2.25 A");
  ex("5", "Norton's theorem", "Norton equivalent and the load current", "E = 12 V is in series with R₁ = 6 Ω. R₂ = 3 Ω is connected across the terminals a and b. Find the Norton equivalent at a and b. Then find the current in a load R_L = 4 Ω.", "E = 12 V, R₁ = 6 Ω, R₂ = 3 Ω, R_L = 4 Ω", "I_N, R_N, I_L", [
    "Remove the load. Short the terminals a and b to find I_N: the short bypasses R₂, so I_N = E / R₁ = 12 V / 6 Ω = 2 A.",
    "Find R_N: replace E by a short circuit and look into a and b: R_N = R₁ // R₂ = 6 × 3 / 9 = 2 Ω.",
    "The Norton circuit is a 2 A source in parallel with 2 Ω. Connect the load.",
    "CDR: I_L = I_N R_N / (R_N + R_L) = 2 A × 2 Ω / 6 Ω = 0.667 A.",
    "Check with Thevenin: V_TH = 12 × 3 / 9 = 4 V, and I_L = 4 V / (2 + 4) Ω = 0.667 A ✓"], "I_N = 2 A, R_N = 2 Ω, I_L = 0.667 A");
  ex("5", "Maximum power transfer", "Maximum power and efficiency", "A source has V_TH = 20 V and R_TH = 5 Ω. Find the load that receives the maximum power, the maximum power, and the efficiency at that point.", "V_TH = 20 V, R_TH = 5 Ω", "R_L, P_max, η", [
    "Maximum power transfer: the load equals the source resistance, R_L = R_TH = 5 Ω.",
    "The current is I = V_TH / (R_TH + R_L) = 20 V / 10 Ω = 2 A.",
    "P_max = I² R_L = 4 × 5 = 20 W. The formula P_max = V_TH² / (4 R_TH) = 400 / 20 = 20 W gives the same value.",
    "The source gives P_total = V_TH I = 20 × 2 = 40 W, so the efficiency is 20 / 40 = 50 %.",
    "Meaning: the best power transfer wastes half of the energy in R_TH."], "R_L = 5 Ω, P_max = 20 W, η = 50 %");
  ex("5", "Maximum power transfer", "Find R_TH first, then the load", "E = 24 V is in series with R₁ = 6 Ω. R₂ = 12 Ω is connected across the terminals a and b. Find the load for maximum power and the power it receives.", "E = 24 V, R₁ = 6 Ω, R₂ = 12 Ω", "R_L, P_max", [
    "Remove the load and find V_TH across R₂ with the divider rule: V_TH = 24 V × 12 / (6 + 12) = 16 V.",
    "Find R_TH: shorted source, R₁ // R₂ = 6 × 12 / 18 = 4 Ω.",
    "The best load is R_L = R_TH = 4 Ω.",
    "P_max = V_TH² / (4 R_TH) = 16² / (4 × 4) = 256 / 16 = 16 W.",
    "Check: I = 16 V / 8 Ω = 2 A and P = 2² × 4 = 16 W ✓"], "R_L = 4 Ω, P_max = 16 W");

  // ---------- Chapter 6 ----------
  ex("6", "The capacitor", "Current of a capacitor", "The voltage across a 10 μF capacitor rises steadily from 0 to 20 V in 2 ms. Find the capacitor current.", "C = 10 μF, Δv = 20 V, Δt = 2 ms", "i", [
    "The current of a capacitor follows the rate of change of its voltage: i = C Δv / Δt.",
    "The rate of change is Δv / Δt = 20 V / (2×10⁻³ s) = 10 000 V/s.",
    "i = (10×10⁻⁶ F)(10 000 V/s) = 0.1 A.",
    "Meaning: a steady voltage gives zero current, and a faster rise gives a larger current."], "i = 0.1 A");
  ex("6", "The capacitor", "Voltage from the stored energy", "A 2200 μF capacitor stores 4.4 J. Find its voltage.", "C = 2200 μF, W = 4.4 J", "V", [
    "The stored energy is W = ½ C V².",
    "Solve for the voltage: V = √(2 W / C).",
    "V = √(2 × 4.4 J / 0.0022 F) = √4000 = 63.2 V.",
    "Check: ½ × 0.0022 × 63.2² = 4.4 J ✓"], "V = 63.2 V");
  ex("6", "What sets the capacitance", "Inserting a dielectric", "An air capacitor has C = 50 pF. A dielectric of relative permittivity 5 fills the gap. Find the new capacitance. What happens if the gap is also doubled?", "C_air = 50 pF, ε_r = 5", "C_new", [
    "C = ε₀ ε_r A / d, so C is proportional to ε_r when A and d stay the same.",
    "C = 5 × 50 pF = 250 pF.",
    "Doubling the gap d halves C, because C is proportional to 1 / d.",
    "C = 250 pF / 2 = 125 pF."], "250 pF with the dielectric, then 125 pF with the doubled gap");
  ex("6", "The inductor", "Voltage across an inductor", "The current in a 20 mH inductor rises steadily from 0 to 5 A in 10 ms. Find the inductor voltage.", "L = 20 mH, Δi = 5 A, Δt = 10 ms", "v", [
    "The voltage of an inductor follows the rate of change of its current: v = L Δi / Δt.",
    "Δi / Δt = 5 A / (10×10⁻³ s) = 500 A/s.",
    "v = (20×10⁻³ H)(500 A/s) = 10 V.",
    "Meaning: a steady current gives zero voltage, and a faster change gives a larger voltage."], "v = 10 V");
  ex("6", "The inductor", "Energy stored in an inductor", "An inductor of 0.2 H carries 3 A. Find the stored energy. How does it change if the current doubles?", "L = 0.2 H, I = 3 A", "W", [
    "The stored energy is W = ½ L I².",
    "W = 0.5 × 0.2 H × (3 A)² = 0.9 J.",
    "The energy depends on I², so doubling the current gives four times the energy.",
    "W = 0.5 × 0.2 × 6² = 3.6 J = 4 × 0.9 J ✓"], "W = 0.9 J, and 3.6 J at 6 A");
  ex("6", "DC behaviour and combinations", "Steady state with a capacitor and an inductor", "E = 12 V feeds R₁ = 4 Ω, an inductor, and R₂ = 2 Ω in series. A capacitor is connected across R₂. The circuit is in DC steady state. Find the current and the capacitor voltage.", "E = 12 V, R₁ = 4 Ω, R₂ = 2 Ω", "I, V_C", [
    "In DC steady state the inductor acts as a short circuit (a plain wire), because its voltage is zero.",
    "The capacitor acts as an open circuit, so no current goes into it.",
    "The current flows through R₁ and R₂ only: I = 12 V / (4 Ω + 2 Ω) = 2 A.",
    "The capacitor has the same voltage as R₂: V_C = I R₂ = 2 A × 2 Ω = 4 V."], "I = 2 A, V_C = 4 V");
  ex("6", "DC behaviour and combinations", "Inductors in series and parallel", "L₁ = 6 mH and L₂ = 3 mH are in parallel. This pair is in series with L₃ = 4 mH. Find L_eq.", "L₁ = 6 mH, L₂ = 3 mH, L₃ = 4 mH", "L_eq", [
    "Inductors combine like resistors: series values add and parallel values follow the product over sum.",
    "Parallel pair: L₁₂ = L₁ L₂ / (L₁ + L₂) = 6 × 3 / 9 = 2 mH.",
    "Series with L₃: L_eq = 2 mH + 4 mH = 6 mH.",
    "Check: the parallel value 2 mH is smaller than the smaller inductor 3 mH ✓"], "L_eq = 6 mH");

  // ---------- Motors ----------
  ex("M", "How a DC motor works", "Name the parts of a brushed DC motor", "In a brushed DC motor, name the part that makes the fixed magnetic field, the part that turns the shaft, and the parts that bring the current to the rotating coil.", "brushed DC motor", "stator, rotor, commutator and brushes", [
    "The stator is the fixed part. It makes the magnetic field with permanent magnets or electromagnets.",
    "The rotor (armature) carries the coil windings and turns the shaft.",
    "The brushes are fixed graphite contacts. They slide on the commutator and feed current into the rotating coil.",
    "The commutator reverses the connection each half turn, so the force keeps the same turning direction."], "Field: stator. Turning part: rotor. Current to the coil: brushes and commutator.");
  ex("M", "How a DC motor works", "Force on a wire in a magnetic field", "A straight wire of length 0.2 m carries 5 A at right angles to a field of 0.4 T. Find the force on the wire. (Prerequisite: PHYS104, F = I × B.)", "ℓ = 0.2 m, I = 5 A, B = 0.4 T", "F", [
    "The force on a current-carrying wire is F = B I ℓ when the wire is at right angles to the field.",
    "F = 0.4 T × 5 A × 0.2 m = 0.4 N.",
    "The force acts normal to the plane of the field and the current. This force on the two coil sides makes the torque of the motor.",
    "Reversing the current reverses the force. This is why the commutator is needed."], "F = 0.4 N");
  ex("M", "How a DC motor works", "Why the commutator is needed", "The armature of a brushed motor becomes horizontal. What does the commutator do, and what would happen without it?", "armature in the horizontal position", "the effect of the commutator", [
    "The torque is largest when the coil is parallel to the field and falls to zero when it is perpendicular.",
    "When the coil passes the horizontal position, the commutator swaps the connection to the brushes.",
    "The current in each coil side reverses, so the force on each side keeps pushing in the same turning direction.",
    "Without it, the force would reverse after a half turn, and the coil would only swing back and forth."], "It reverses the coil current each half turn, so the rotation continues in one direction.");
  ex("M", "Types of brushed DC motors", "Choose a motor for the load", "Choose the best brushed DC motor for each job: (a) an elevator, (b) a fan, (c) a toothbrush, (d) a crane.", "four applications", "motor type for each", [
    "Match the job to the torque-speed behaviour of each type.",
    "(a) Elevator: needs a very large torque at low speed, so a series-wound motor.",
    "(b) Fan: needs almost constant speed when the load changes, so a shunt-wound motor.",
    "(c) Toothbrush: a small, simple motor with a linear torque-speed line, so a permanent magnet (PM) motor.",
    "(d) Crane: needs high starting torque and a controlled no-load speed, so a compound-wound motor."], "(a) series, (b) shunt, (c) PM, (d) compound");
  ex("M", "Types of brushed DC motors", "Why a series motor must not run without load", "A series-wound motor is started with no load on the shaft. Explain what goes wrong.", "series motor, no load", "the danger", [
    "In a series motor the field and the armature carry the same current.",
    "With no load, the torque needed is small, and the motor accelerates. The back EMF rises with speed.",
    "The speed rises out of control, because nothing limits it, and the machine can be damaged.",
    "Rule: a series motor is always connected to a load. A shunt motor keeps an almost constant speed."], "The speed rises out of control, so a series motor must always carry a load.");
  ex("M", "Types of brushed DC motors", "Compare the field connections", "State how the field winding is connected in a series, a shunt and a compound motor. Which gives an almost constant speed?", "series, shunt, compound", "connections and the constant-speed type", [
    "Series: field and armature are in series, so one current flows in both.",
    "Shunt: field and armature are in parallel on the same supply.",
    "Compound: the motor has both a series field and a shunt field.",
    "The shunt-wound motor keeps almost constant speed when the load changes."], "Series: in series. Shunt: in parallel. Compound: both. Constant speed: shunt.");
  ex("M", "AC motors", "Time between the phase peaks", "A three-phase supply of 60 Hz has windings spaced 120° apart. Find the period and the time between the peaks of two phases.", "f = 60 Hz, spacing 120°", "T and the time delay", [
    "The period is T = 1 / f = 1 / 60 Hz = 16.67 ms.",
    "A full cycle is 360°, so 120° is one third of a cycle.",
    "Delay = T / 3 = 16.67 ms / 3 = 5.56 ms.",
    "So the three phases peak one after another, every 5.56 ms, and the stator field turns smoothly."], "T = 16.67 ms, delay between phase peaks = 5.56 ms");
  ex("M", "AC motors", "Reading the induction motor curve", "The torque-speed curve of an induction motor is flat in speed over a wide range of load. What does this mean for its speed, and what happens above the pull-out torque?", "induction motor torque-speed curve", "speed behaviour", [
    "The speed changes little while the torque rises over the working range. The motor is a constant-speed machine.",
    "The pull-out torque is the peak of the curve.",
    "If the load asks for more than the pull-out torque, the torque drops sharply.",
    "The motor then slows down quickly and may stall."], "Almost constant speed in normal use. Above the pull-out torque the motor slows and may stall.");
