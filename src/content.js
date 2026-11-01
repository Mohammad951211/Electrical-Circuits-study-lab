  // ================= helpers =================
  var PFX = [["µ", 1e-6], ["m", 1e-3], ["", 1], ["k", 1e3], ["M", 1e6]];
  function fmt(x, unit){
    if (!isFinite(x)) return "?";
    if (x === 0) return "0 " + unit;
    var a = Math.abs(x);
    if (a < 1e-6) return parseFloat((x * (a < 1e-9 ? 1e12 : 1e9)).toPrecision(4)) + " " + (a < 1e-9 ? "p" : "n") + unit;
    var i = a >= 1e6 ? 4 : a >= 1e3 ? 3 : a >= 1 ? 2 : a >= 1e-3 ? 1 : 0;
    return parseFloat((x / PFX[i][1]).toPrecision(4)) + " " + PFX[i][0] + unit;
  }
  function fl(x, unit, known){ return known === false ? "?" : fmt(x, unit); }
  function $(id){ return document.getElementById(id); }
  function fld(id, label, unit, def, pf, blankOk){
    var o = PFX.map(function(p){ return '<option value="' + p[1] + '"' + (p[1] === (pf || 1) ? " selected" : "") + ">" + (p[0] || "–") + "</option>"; }).join("");
    return '<div class="field"><label for="' + id + '">' + label + '</label><input id="' + id + '" type="number" step="any" inputmode="decimal" value="' + (def == null ? "" : def) + '"' + (blankOk ? ' placeholder="empty"' : "") + '><select id="' + id + '_p" aria-label="prefix for ' + label + '">' + o + '</select><span class="unit">' + unit + "</span></div>";
  }
  function blank(id){ return $(id).value.trim() === ""; }
  function val(id){ return parseFloat($(id).value) * parseFloat($(id + "_p").value); }
  function line(s){ return s + "\n"; }
  function ok(s){ return '<span class="ok">' + s + "</span>"; }
  function res(s){ return '<span class="res">' + s + "</span>"; }
  function shuffle(a){ a = a.slice(); for (var i = a.length - 1; i > 0; i--){ var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function close(a, b){ return Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(a), Math.abs(b)); }
  function fig(h){ return '<div class="figure">' + h + "</div>"; }
  function bankFig(ch, i){ return CHAPTERS[ch].questions[i].fig(); }

  // ================= lessons (all from the slides) =================
  var LESSONS = {
    "1": [
      { t: "The basic circuit", pts: ["Three parts: a power supply, a load and wires.", "Current flows only in a closed loop. An open switch gives an open circuit and no current."], fig: function(){ return bankFig("1", 0); } },
      { t: "Current", pts: ["Current is the flow of charge. Its unit is the ampere (A).", "Conventional current leaves the + terminal and returns to the − terminal. Electrons move the other way.", "The ammeter goes in series with the part."], f: ["I = Q / t   (A = C / s)"] },
      { t: "Voltage", pts: ["Voltage is the work per unit charge. Its unit is the volt (V).", "E or Vs is the source voltage. A voltage drop appears across a load.", "The voltmeter goes in parallel with the part."], f: ["V = W / Q   (V = J / C)"] },
      { t: "Resistance and conductance", pts: ["Resistance R (Ω) opposes the current.", "Four factors: the material (resistivity), the length, the cross-section area and the temperature.", "Conductance G is the reverse of R. Its unit is the siemens (S)."], f: ["G = 1 / R"] },
      { t: "Ohm's law", pts: ["The I to V characteristic of a resistor is a straight line through the origin.", "Choose a reference direction for I and V first. A negative answer means the real direction is opposite."], f: ["I = V / R", "V = I R", "R = V / I"], fig: function(){ return bankFig("1", 5); } },
      { t: "Resistor colour code", pts: ["Four bands: first digit, second digit, multiplier, tolerance.", "Example: red, red, orange, gold = 22 × 10³ Ω = 22 kΩ, ± 5%."], fig: function(){ return bankFig("1", 8); } }
    ],
    "2": [
      { t: "Power and energy", pts: ["Power P (watt, W) is the work per second.", "A part that takes in energy has positive power. A source that gives out energy has negative power in the reference direction.", "In a circuit, the powers of all parts add up to zero."], f: ["P = V I = I² R = V² / R"], fig: function(){ return bankFig("2", 1); } },
      { t: "Kirchhoff's voltage law (KVL)", pts: ["Go round any closed path and add the voltages. The sum is zero.", "In this course: drops are added, rises are subtracted.", "It also holds for a path that crosses open terminals, such as Vab."], f: ["ΣV = 0   or   ΣE = ΣI R"], fig: function(){ return bankFig("2", 2); } },
      { t: "Kirchhoff's current law (KCL)", pts: ["At a node, the current in equals the current out.", "It also holds for a closed surface (a supernode)."], f: ["Σ I(in) = Σ I(out)"], fig: function(){ return bankFig("2", 5); } },
      { t: "Node, branch, mesh, loop", pts: ["Node: a point where two or more parts join.", "Branch: one part (or series parts) between two nodes.", "Loop: any closed path. Mesh: a loop with no other loop inside it."], fig: function(){ return bankFig("2", 6); } },
      { t: "Real voltage source", pts: ["A real source is an ideal source VS with a resistance RS in series.", "The terminal voltage falls as the load current grows. An ideal source has RS = 0."], f: ["Vab = VS − I RS"], fig: function(){ return bankFig("2", 8); } },
      { t: "Current source", pts: ["An ideal current source keeps its current. The load sets the voltage.", "A real current source has RS in parallel."], f: ["Vab = IS RL"], fig: function(){ return bankFig("2", 9); } },
      { t: "Metric prefixes", pts: ["M = 10⁶, k = 10³, m = 10⁻³, µ = 10⁻⁶.", "Example: 2 200 000 Ω = 2.2 MΩ and 0.000 047 A = 47 µA."] }
    ],
    "3": [
      { t: "Series circuit", pts: ["One path, so the same current flows in every part.", "The resistors share the source voltage (KVL).", "RT is bigger than the biggest R."], f: ["RT = R₁ + R₂ + R₃", "I = E / RT", "PT = E I = I² RT"], fig: function(){ return bankFig("3", 0); } },
      { t: "Voltage-divider rule (VDR)", pts: ["In series, a big R gets a big share of the voltage.", "Put the resistor you want on top."], f: ["Vx = E × Rx / RT"], fig: function(){ return bankFig("3", 2); } },
      { t: "Circuit ground", pts: ["Ground is the 0 V point.", "Vb is point b measured from ground. Vbc is the voltage between b and c."], fig: function(){ return bankFig("3", 3); } },
      { t: "Parallel circuit", pts: ["Many paths, the same voltage on every branch.", "The total current is the sum of the branch currents (KCL).", "Req is smaller than the smallest R."], f: ["Geq = G₁ + G₂ + …", "Req = R₁ R₂ / (R₁ + R₂)   (two)"], fig: function(){ return bankFig("3", 5); } },
      { t: "Current-divider rule (CDR)", pts: ["The total current splits. The smaller R takes the bigger share.", "For two resistors the OTHER one goes on top. This is the opposite of the VDR."], f: ["I₁ = IT × R₂ / (R₁ + R₂)"], fig: function(){ return bankFig("3", 7); } },
      { t: "Series–parallel circuits", pts: ["1. Reduce the circuit to Req, starting at the far end.", "2. Go back step by step with Ohm's law, VDR, CDR, KCL and KVL."], fig: function(){ return bankFig("3", 9); } }
    ],
    "4": [
      { t: "Source conversion", pts: ["A voltage source with RS equals a current source with the same RS.", "Equivalent means the same V and I at the load terminals a and b.", "RS moves from series to parallel, or back."], f: ["IS = E / RS", "E = IS RS"], fig: function(){ return bankFig("4", 0); } },
      { t: "The polarity rule", pts: ["The arrow of IS points to the + of E."], fig: function(){ return bankFig("4", 1); } },
      { t: "Sources in series and parallel", pts: ["Voltage sources in series: add them. Use + if the source points the same way as E and − if not.", "Voltage sources in parallel: only equal sources with the same polarity.", "Current sources in parallel: add them (up +, down −).", "Current sources in series: only equal sources in the same direction."], fig: function(){ return bankFig("4", 4); } },
      { t: "Branch current analysis", pts: ["The unknowns are the branch currents: b branches, b equations.", "Step 1: label the nodes, a current arrow in every branch and a clockwise loop in every mesh.", "Step 2: KCL at (n − 1) nodes.", "Step 3: KVL in every mesh. Write V = I R for every resistor.", "Step 4: solve by substitution.", "Step 5: find the rest (V, P). A negative current flows the other way."], f: ["KCL equations = n − 1", "KVL equations = b − (n − 1)"], fig: function(){ return bankFig("4", 8); } },
      { t: "A circuit with a current source", pts: ["The current of the source is known, so there is one unknown less.", "The voltage across it is unknown, so no KVL is written for a mesh that holds it."], fig: function(){ return bankFig("4", 7); } }
    ]
  };

  // ================= calculators =================
  var TOOLS = {};
  function R3(){ return [val("r1"), val("r2"), val("r3")]; }
  function bad(m){ return { msg: m }; }
  function pos(a){ return a.every(function(x){ return isFinite(x) && x > 0; }); }

  TOOLS["1"] = [
    { name: "Ohm's law",
      hint: "Leave exactly one field empty. It will be calculated.",
      fields: function(){ return fld("v", "V", "V", 9, 1, true) + fld("i", "I", "A", "", 1, true) + fld("r", "R", "Ω", 30, 1, true); },
      run: function(){
        var b = ["v", "i", "r"].filter(blank);
        if (b.length !== 1) return bad("Leave exactly one of V, I and R empty.");
        var V = val("v"), I = val("i"), R = val("r"), s = "", name = b[0];
        if (name === "v"){ if (!pos([I, R])) return bad("I and R must be positive."); V = I * R; s += line("V = I R = " + fmt(I, "A") + " × " + fmt(R, "Ω")) + line(res("V = " + fmt(V, "V"))); }
        if (name === "i"){ if (!pos([V, R])) return bad("V and R must be positive."); I = V / R; s += line("I = V / R = " + fmt(V, "V") + " / " + fmt(R, "Ω")) + line(res("I = " + fmt(I, "A"))); }
        if (name === "r"){ if (!pos([V, I])) return bad("V and I must be positive."); R = V / I; s += line("R = V / I = " + fmt(V, "V") + " / " + fmt(I, "A")) + line(res("R = " + fmt(R, "Ω"))); }
        s += line("G = 1 / R = " + fmt(1 / R, "S"));
        s += line("P = V I = " + fmt(V, "V") + " × " + fmt(I, "A") + " = " + fmt(V * I, "W"));
        s += line(ok("Check: I² R = " + fmt(I * I * R, "W") + (close(I * I * R, V * I) ? " ✓" : "")));
        var kn = function(n){ return n !== name; };
        return { fig: svg(rect(XL, XR, YT, YB, { l: [B("E = " + fl(V, "V", kn("v")))], r: [{ t: "r", c: YM, lab: "R = " + fl(R, "Ω", kn("r")), side: "l" }], b: [{ t: "m", c: 215, ch: "A", lab: "I = " + fl(I, "A", kn("i")), side: "b" }] })), steps: s };
      } },
    { name: "Resistor colour code",
      hint: "Choose the four bands. The value and the tolerance range are shown.",
      fields: function(){
        var cols = ["Black", "Brown", "Red", "Orange", "Yellow", "Green", "Blue", "Violet", "Grey", "White"];
        function sel(id, list, def){ return '<select id="' + id + '">' + list.map(function(c, i){ return '<option value="' + i + '"' + (i === def ? " selected" : "") + ">" + c[0] + "</option>"; }).join("") + "</select>"; }
        var d = cols.map(function(c, i){ return [c + " (" + i + ")", i]; });
        var m = cols.map(function(c, i){ return [c + " (×10" + (i === 1 ? "" : i === 0 ? "⁰" : ["", "", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"][i]) + ")"]; });
        m[1] = ["Brown (×10)"]; m.push(["Gold (×0.1)"], ["Silver (×0.01)"]);
        return '<div class="band-sel"><span>Band 1</span>' + sel("b1", d, 2) + "<span>Band 2</span>" + sel("b2", d, 2) + "<span>Band 3</span>" + sel("b3", m, 3) + '<span>Band 4</span><select id="b4"><option value="0.05" selected>Gold (± 5%)</option><option value="0.1">Silver (± 10%)</option></select></div>';
      },
      run: function(){
        var C = ["#111111", "#7b4a2a", "#d62828", "#f4820a", "#f2d000", "#2a9d3f", "#2563c9", "#7a3fb0", "#888888", "#f4f4f4", "#c9a227", "#b8bcc2"];
        var d1 = +$("b1").value, d2 = +$("b2").value, m = +$("b3").value, tol = +$("b4").value;
        var mult = m < 10 ? Math.pow(10, m) : (m === 10 ? 0.1 : 0.01), v = (d1 * 10 + d2) * mult;
        var s = "";
        [C[d1], C[d2], C[m], tol === 0.05 ? C[10] : C[11]].forEach(function(c, i){ s += '<rect x="' + [122, 148, 174, 226][i] + '" y="60" width="13" height="46" fill="' + c + '"/>'; });
        var f = P.w([[40, YM], [100, YM]]) + P.w([[260, YM], [320, YM]]) + '<rect x="100" y="60" width="160" height="46" rx="14" fill="#e3d5b3" stroke="#1b2a3a" stroke-width="2"/>' + s;
        var t = line("Digits: " + d1 + " and " + d2 + " → " + (d1 * 10 + d2)) + line("Multiplier: × " + mult) + line(res("R = " + fmt(v, "Ω") + " ± " + (tol * 100) + "%")) + line("Range: " + fmt(v * (1 - tol), "Ω") + " to " + fmt(v * (1 + tol), "Ω"));
        return { fig: svg(f), steps: t };
      } },
    { name: "Charge, current, work, voltage",
      hint: "Two quick formulas: I = Q / t and V = W / Q. Leave the unknown empty.",
      fields: function(){ return fld("q", "Q", "C", 100, 1, true) + fld("t", "t", "s", 50, 1, true) + fld("w", "W", "J", "", 1, true) + fld("qq", "Q", "C", "", 1, true); },
      run: function(){
        var s = "", n = 0;
        if (!blank("q") && !blank("t")){ var I = val("q") / val("t"); s += line("I = Q / t = " + fmt(val("q"), "C") + " / " + fmt(val("t"), "s")) + line(res("I = " + fmt(I, "A"))); n++; }
        if (!blank("w") && !blank("qq")){ var V = val("w") / val("qq"); s += line("V = W / Q = " + fmt(val("w"), "J") + " / " + fmt(val("qq"), "C")) + line(res("V = " + fmt(V, "V"))); n++; }
        if (!n) return bad("Fill Q and t for the current, or W and Q for the voltage.");
        return { fig: svg(rect(XL, XR, YT, YB, { l: [B("E")], t: [{ t: "m", c: 190, ch: "A", lab: "I", side: "t" }], r: [{ t: "lamp", c: YM }] })), steps: s };
      } }
  ];

  TOOLS["2"] = [
    { name: "Real voltage source",
      hint: "A source VS with RS in series feeds a load RL.",
      fields: function(){ return fld("vs", "VS", "V", 9) + fld("rs", "RS", "Ω", 0.5) + fld("rl", "RL", "Ω", 4); },
      run: function(){
        var VS = val("vs"), RS = val("rs"), RL = val("rl");
        if (!(isFinite(VS) && isFinite(RS) && RS >= 0 && RL > 0)) return bad("Enter VS, RS (0 or more) and RL (more than 0).");
        var I = VS / (RS + RL), Vab = I * RL, Vrs = I * RS, s = "";
        s += line("I = VS / (RS + RL) = " + fmt(VS, "V") + " / " + fmt(RS + RL, "Ω")) + line(res("I = " + fmt(I, "A")));
        s += line("Vab = I RL = " + fmt(I, "A") + " × " + fmt(RL, "Ω")) + line(res("Vab = " + fmt(Vab, "V")));
        s += line("Drop in RS = I RS = " + fmt(Vrs, "V")) + line("P(source) = VS I = " + fmt(VS * I, "W")) + line("P(RS) = I² RS = " + fmt(I * I * RS, "W")) + line("P(RL) = I² RL = " + fmt(I * I * RL, "W"));
        s += line(ok("Check: " + fmt(I * I * RS, "W") + " + " + fmt(I * I * RL, "W") + " = " + fmt(VS * I, "W") + " ✓")) + line(ok("KVL: Vab + drop in RS = VS ✓"));
        var f = vrun(XL, YT, YB, [B("V_S = " + fmt(VS, "V"))]) + hrun(YT, XL, 285, [{ t: "r", c: 140, lab: "R_S = " + fmt(RS, "Ω"), side: "t" }]) + vrun(285, YT, YB, [{ t: "r", c: YM, lab: "R_L = " + fmt(RL, "Ω"), side: "r" }]) + hrun(YB, 285, XL, []);
        f += dots([[215, YT], [215, YB]]) + P.t(215, 29, "a") + P.t(215, 146, "b") + P.arr(240, 83, 240, 48) + P.arr(240, 83, 240, 118) + P.t(248, 87, "V_{ab}", "start", "acc");
        return { fig: svg(f), steps: s };
      } },
    { name: "KCL at a node",
      hint: "Two currents enter and three leave. Find the unknown I₅. A negative answer means I₅ really enters.",
      fields: function(){ return fld("i1", "I₁ (in)", "A", 15) + fld("i2", "I₂ (in)", "A", 10) + fld("i3", "I₃ (out)", "A", 7) + fld("i4", "I₄ (out)", "A", 8); },
      run: function(){
        var a = val("i1"), b = val("i2"), c = val("i3"), d = val("i4");
        if (![a, b, c, d].every(isFinite)) return bad("Enter all four currents.");
        var i5 = a + b - c - d, s = "";
        s += line("KCL: in = out") + line(fmt(a, "A") + " + " + fmt(b, "A") + " = " + fmt(c, "A") + " + " + fmt(d, "A") + " + I₅") + line(res("I₅ = " + fmt(i5, "A") + (i5 < 0 ? "  (negative: it really enters the node)" : "  (leaving)")));
        s += line(ok("Check: in = " + fmt(a + b, "A") + ", out = " + fmt(c + d + i5, "A") + " ✓"));
        var nx = 190, ny = 83, f = edge(80, 36, nx, ny, 0.45) + edge(80, 130, nx, ny, 0.45) + edge(nx, ny, 300, 36, 0.5) + edge(nx, ny, 300, ny, 0.5) + edge(nx, ny, 300, 130, 0.5);
        f += '<circle class="dot" cx="190" cy="83" r="5"/>' + P.t(80, 28, "I_1 = " + fmt(a, "A"), "start") + P.t(80, 150, "I_2 = " + fmt(b, "A"), "start") + P.t(304, 32, "I_3 = " + fmt(c, "A"), "start") + P.t(308, 87, "I_4 = " + fmt(d, "A"), "start") + P.t(304, 150, "I_5 = " + fmt(i5, "A"), "start", "acc");
        return { fig: svg(f), steps: s };
      } },
    { name: "Power of a resistor",
      hint: "Enter R and one of V or I. Leave the other empty.",
      fields: function(){ return fld("r", "R", "Ω", 6) + fld("i", "I", "A", 2, 1, true) + fld("v", "V", "V", "", 1, true); },
      run: function(){
        var R = val("r"), I, V;
        if (!(R > 0)) return bad("R must be more than 0.");
        if (!blank("i") && blank("v")){ I = val("i"); V = I * R; }
        else if (blank("i") && !blank("v")){ V = val("v"); I = V / R; }
        else return bad("Fill exactly one of I and V.");
        var s = line("V = I R = " + fmt(V, "V")) + line("I = V / R = " + fmt(I, "A")) + line("P = I² R = " + fmt(I * I * R, "W")) + line("P = V I = " + fmt(V * I, "W")) + line("P = V² / R = " + fmt(V * V / R, "W")) + line(ok("The three results agree ✓"));
        return { fig: svg(rect(XL, XR, YT, YB, { l: [B("E = " + fmt(V, "V"))], r: [{ t: "r", c: YM, lab: "R = " + fmt(R, "Ω"), side: "l" }] }) + P.arr(150, 20, 215, 20, "I = " + fmt(I, "A"), 143, 25, "end") + P.t(190, 88, "P = " + fmt(I * I * R, "W"))), steps: s };
      } }
  ];

  function serFig(E, R1, R2, R3){
    return svg(rect(XL, XR, YT, YB, { l: [B("E = " + fmt(E, "V"))], t: [{ t: "r", c: 140, lab: "R_1 = " + fmt(R1, "Ω"), side: "t" }, { t: "r", c: 245, lab: "R_2 = " + fmt(R2, "Ω"), side: "t" }], r: [{ t: "r", c: YM, lab: "R_3 = " + fmt(R3, "Ω"), side: "l" }] }) + P.arr(165, 66, 215, 66, "I", 190, 84));
  }
  function parFig(E, R1, R2, R3){
    var xr = 272, s = vrun(XL, YT, YB, [B(typeof E === "string" ? E : "E = " + fmt(E, "V"))]) + hrun(YT, XL, xr, []) + hrun(YB, xr, XL, []);
    s += vrun(120, YT, YB, [{ t: "r", c: YM, lab: "R_1 = " + fmt(R1, "Ω"), side: "r" }]) + vrun(190, YT, YB, [{ t: "r", c: YM, lab: "R_2 = " + fmt(R2, "Ω"), side: "r" }]) + vrun(xr, YT, YB, [{ t: "r", c: YM, lab: "R_3 = " + fmt(R3, "Ω"), side: "r" }]);
    return svg(s + dots([[120, YT], [120, YB], [190, YT], [190, YB]]));
  }
  TOOLS["3"] = [
    { name: "Series circuit",
      hint: "Three resistors in series on a source E.",
      fields: function(){ return fld("e", "E", "V", 60) + fld("r1", "R₁", "Ω", 10, 1e3) + fld("r2", "R₂", "Ω", 20, 1e3) + fld("r3", "R₃", "Ω", 30, 1e3); },
      run: function(){
        var E = val("e"), r = R3();
        if (!pos([E].concat(r))) return bad("All values must be more than 0.");
        var RT = r[0] + r[1] + r[2], I = E / RT, v = r.map(function(x){ return I * x; }), s = "";
        s += line("RT = R₁ + R₂ + R₃ = " + fmt(RT, "Ω")) + line("I = E / RT = " + fmt(E, "V") + " / " + fmt(RT, "Ω") + " = " + fmt(I, "A"));
        v.forEach(function(x, k){ s += line("V" + (k + 1) + " = I R" + (k + 1) + " = " + fmt(x, "V") + "   (VDR: E × R" + (k + 1) + " / RT)   P" + (k + 1) + " = " + fmt(x * I, "W")); });
        s += line(res("PT = E I = " + fmt(E * I, "W"))) + line(ok("Check: V₁ + V₂ + V₃ = " + fmt(v[0] + v[1] + v[2], "V") + " = E ✓"));
        return { fig: serFig(E, r[0], r[1], r[2]), steps: s };
      } },
    { name: "Parallel circuit",
      hint: "Three resistors in parallel on a source E.",
      fields: function(){ return fld("e", "E", "V", 12) + fld("r1", "R₁", "Ω", 10) + fld("r2", "R₂", "Ω", 20) + fld("r3", "R₃", "Ω", 30); },
      run: function(){
        var E = val("e"), r = R3();
        if (!pos([E].concat(r))) return bad("All values must be more than 0.");
        var G = 1 / r[0] + 1 / r[1] + 1 / r[2], Req = 1 / G, IT = E / Req, i = r.map(function(x){ return E / x; }), s = "";
        s += line("Geq = 1/R₁ + 1/R₂ + 1/R₃ = " + fmt(G, "S")) + line(res("Req = 1 / Geq = " + fmt(Req, "Ω"))) + line("IT = E / Req = " + fmt(IT, "A"));
        i.forEach(function(x, k){ s += line("I" + (k + 1) + " = E / R" + (k + 1) + " = " + fmt(x, "A") + "   (CDR: IT × Req / R" + (k + 1) + ")"); });
        s += line("PT = E IT = " + fmt(E * IT, "W")) + line(ok("Check: I₁ + I₂ + I₃ = " + fmt(i[0] + i[1] + i[2], "A") + " = IT ✓")) + line(ok("Req is smaller than the smallest R ✓"));
        return { fig: parFig(E, r[0], r[1], r[2]), steps: s };
      } },
    { name: "R₁ in series with (R₂ // R₃)",
      hint: "The method of slide 22: reduce to Req, then go back.",
      fields: function(){ return fld("e", "E", "V", 8) + fld("r1", "R₁", "Ω", 2) + fld("r2", "R₂", "Ω", 6) + fld("r3", "R₃", "Ω", 3); },
      run: function(){
        var E = val("e"), r = R3();
        if (!pos([E].concat(r))) return bad("All values must be more than 0.");
        var Rp = r[1] * r[2] / (r[1] + r[2]), Req = r[0] + Rp, IT = E / Req, V1 = IT * r[0], Vp = IT * Rp, s = "";
        s += line("R₂ // R₃ = R₂ R₃ / (R₂ + R₃) = " + fmt(Rp, "Ω")) + line(res("Req = R₁ + (R₂ // R₃) = " + fmt(Req, "Ω"))) + line("IT = E / Req = " + fmt(IT, "A"));
        s += line("V₁ = IT R₁ = " + fmt(V1, "V")) + line("V(parallel part) = IT × " + fmt(Rp, "Ω") + " = " + fmt(Vp, "V")) + line("I₂ = V / R₂ = " + fmt(Vp / r[1], "A") + "   I₃ = V / R₃ = " + fmt(Vp / r[2], "A"));
        s += line(ok("KVL: " + fmt(V1, "V") + " + " + fmt(Vp, "V") + " = " + fmt(E, "V") + " ✓")) + line(ok("KCL: I₂ + I₃ = " + fmt(Vp / r[1] + Vp / r[2], "A") + " = IT ✓"));
        var xr = 290, f = vrun(XL, YT, YB, [B("E = " + fmt(E, "V"))]) + hrun(YT, XL, xr, [{ t: "r", c: 140, lab: "R_1 = " + fmt(r[0], "Ω"), side: "t" }]) + vrun(215, YT, YB, [{ t: "r", c: YM, lab: "R_2 = " + fmt(r[1], "Ω"), side: "r" }]) + vrun(xr, YT, YB, [{ t: "r", c: YM, lab: "R_3 = " + fmt(r[2], "Ω"), side: "r" }]) + hrun(YB, xr, XL, []) + dots([[215, YT], [215, YB]]);
        return { fig: svg(f), steps: s };
      } }
  ];

  function convFig(kind, E, IS, RS, RL){
    var f;
    if (kind === "v"){
      f = vrun(XL, YT, YB, [B("E = " + fmt(E, "V"))]) + hrun(YT, XL, 285, [{ t: "r", c: 150, lab: "R_S = " + fmt(RS, "Ω"), side: "t" }]) + vrun(285, YT, YB, [{ t: "r", c: YM, lab: "R_L = " + fmt(RL, "Ω"), side: "r" }]) + hrun(YB, 285, XL, []);
    } else {
      f = vrun(XL, YT, YB, [{ t: "isrc", c: YM, dir: "u", lab: "I_S = " + fmt(IS, "A"), side: "l" }]) + hrun(YT, XL, 285, []) + vrun(185, YT, YB, [{ t: "r", c: YM, lab: "R_S = " + fmt(RS, "Ω"), side: "r" }]) + vrun(285, YT, YB, [{ t: "r", c: YM, lab: "R_L = " + fmt(RL, "Ω"), side: "r" }]) + hrun(YB, 285, XL, []) + dots([[185, YT], [185, YB]]);
    }
    return svg(f);
  }
  TOOLS["4"] = [
    { name: "Source conversion",
      hint: "Convert and check that the load current stays the same. The arrow of IS points to the + of E.",
      fields: function(){ return '<div class="field"><label for="dir">Convert</label><select id="dir"><option value="v">voltage → current</option><option value="i">current → voltage</option></select></div>' + fld("a", "E or IS", "V or A", 6) + fld("rs", "RS", "Ω", 2) + fld("rl", "RL", "Ω", 10); },
      run: function(){
        var dir = $("dir").value, a = val("a"), RS = val("rs"), RL = val("rl");
        if (!pos([a, RS, RL])) return bad("All values must be more than 0.");
        var s = "", E, IS, IL1, IL2;
        if (dir === "v"){ E = a; IS = E / RS; IL1 = E / (RS + RL); IL2 = IS * RS / (RS + RL);
          s += line("IS = E / RS = " + fmt(E, "V") + " / " + fmt(RS, "Ω")) + line(res("IS = " + fmt(IS, "A") + ", with RS = " + fmt(RS, "Ω") + " in parallel")) + line("Voltage source: IL = E / (RS + RL) = " + fmt(IL1, "A")) + line("Current source (CDR): IL = IS × RS / (RS + RL) = " + fmt(IL2, "A")); }
        else { IS = a; E = IS * RS; IL1 = E / (RS + RL); IL2 = IS * RS / (RS + RL);
          s += line("E = IS RS = " + fmt(IS, "A") + " × " + fmt(RS, "Ω")) + line(res("E = " + fmt(E, "V") + ", with RS = " + fmt(RS, "Ω") + " in series")) + line("Current source (CDR): IL = IS × RS / (RS + RL) = " + fmt(IL2, "A")) + line("Voltage source: IL = E / (RS + RL) = " + fmt(IL1, "A")); }
        s += line(ok("Same IL, so the two sources are equivalent for the load ✓"));
        var a1 = convFig(dir, E, IS, RS, RL), a2 = convFig(dir === "v" ? "i" : "v", E, IS, RS, RL);
        return { fig: '<div class="lbl">Original</div>' + a1 + '<div class="lbl" style="margin-top:8px">Converted</div>' + a2, steps: s, raw: true };
      } },
    { name: "Branch current analysis",
      hint: "The circuit of Example 4.4. Put E₂ = 0 for a wire in place of E₂.",
      fields: function(){ return fld("e1", "E₁", "V", 10) + fld("e2", "E₂", "V", 5) + fld("r1", "R₁", "Ω", 2) + fld("r2", "R₂", "Ω", 2) + fld("r3", "R₃", "Ω", 3); },
      run: function(){
        var E1 = val("e1"), E2 = val("e2"), R1 = val("r1"), R2 = val("r2"), R3v = val("r3");
        if (!(isFinite(E1) && isFinite(E2) && pos([R1, R2, R3v]))) return bad("Enter E₁, E₂ and three resistors above 0.");
        var I3 = (E1 / R1 + E2 / R2) / (1 + R3v / R1 + R3v / R2), I1 = (E1 - R3v * I3) / R1, I2 = (E2 - R3v * I3) / R2, s = "";
        s += line("Step 2, KCL at a:   I₁ + I₂ = I₃") + line("Step 3, KVL mesh 1: R₁ I₁ + R₃ I₃ = E₁") + line("          KVL mesh 2: R₂ I₂ + R₃ I₃ = E₂");
        s += line("Step 4, substitution: I₃ = (E₁/R₁ + E₂/R₂) / (1 + R₃/R₁ + R₃/R₂)");
        s += line(res("I₁ = " + fmt(I1, "A") + "   I₂ = " + fmt(I2, "A") + "   I₃ = " + fmt(I3, "A")));
        if (I2 < 0) s += line("I₂ is negative, so it really flows the other way.");
        s += line(ok("Check mesh 1: " + fmt(R1 * I1 + R3v * I3, "V") + " = E₁ ✓")) + line(ok("Check mesh 2: " + fmt(R2 * I2 + R3v * I3, "V") + " = E₂ ✓"));
        s += line(ok("Power: E₁I₁ + E₂I₂ = " + fmt(E1 * I1 + E2 * I2, "W") + " = I₁²R₁ + I₂²R₂ + I₃²R₃ = " + fmt(I1 * I1 * R1 + I2 * I2 * R2 + I3 * I3 * R3v, "W") + " ✓"));
        return { fig: branchFig({ e1: "E_1 = " + fmt(E1, "V"), e2: E2 === 0 ? null : "E_2 = " + fmt(E2, "V"), r1: "R_1 = " + fmt(R1, "Ω"), r2: "R_2 = " + fmt(R2, "Ω"), r3: "R_3 = " + fmt(R3v, "Ω") }), steps: s };
      } }
  ];

  // ================= find the error =================
  function wrongSeries(){
    var s = vrun(XL, YT, YB, [{ t: "isrc", c: YM, dir: "u", lab: "I_S = 4 A", side: "l" }]) + hrun(YT, XL, 255, [{ t: "r", c: 160, lab: "R_S = 3 Ω", side: "t" }]) + hrun(YB, 255, XL, []);
    return svg(s + P.term(255, YT) + P.term(255, YB) + P.t(265, 42, "a", "start") + P.t(265, 132, "b", "start"));
  }
  function wrongArrow(){
    var xl = 110, xr = 290, s = vrun(xl, YT, YB, [{ t: "isrc", c: YM, dir: "d", lab: "I_S = 4 A", side: "l" }]) + hrun(YT, xl, xr, []) + hrun(YB, xr, xl, []) + vrun(200, YT, YB, [{ t: "r", c: YM, lab: "R_S = 3 Ω", side: "r" }]);
    return svg(s + dots([[200, YT], [200, YB]]) + P.term(xr, YT) + P.term(xr, YB) + P.t(xr + 10, 42, "a", "start") + P.t(xr + 10, 132, "b", "start") + P.t(60, 148, "original: E = 12 V, + on a", "start", "sign"));
  }
  var ERRORS = {
    "1": [
      { fig: function(){ return bankFig("1", 1); }, say: "The ammeter is connected across R.", ask: "What is wrong?", opts: ["The ammeter is in parallel. It must be in series with R.", "The battery is reversed.", "R is too small for an ammeter.", "A voltmeter is missing."], ok: 0, why: "An ammeter goes in series, so the current passes through it. In parallel it would act almost like a wire across R." },
      { fig: function(){ var s = rect(XL, XR, YT, YB, { l: [B("E = 12 V")], r: [{ t: "r", c: YM, lab: "R = 6 Ω", side: "l" }], t: [{ t: "m", c: 190, ch: "V", lab: "V = ?", side: "t" }] }); return svg(s); }, say: "The voltmeter is placed in the wire, in line with R.", ask: "What is wrong?", opts: ["The voltmeter must be placed in series.", "The voltmeter must be in parallel across R.", "A voltmeter cannot measure 12 V.", "The resistor has the wrong value."], ok: 1, why: "A voltmeter goes in parallel with the part it measures. In series it blocks the current." },
      { fig: function(){ return bankFig("1", 5); }, say: "I = E × R = 2.5 × 125 = 312.5 A", ask: "What is wrong?", opts: ["Nothing, the value is correct.", "Ohm's law is I = E / R, so I = 0.02 A.", "The answer must be in volts.", "R must be in kΩ."], ok: 1, why: "A 125 Ω resistor on 2.5 V cannot carry 312.5 A. Ohm's law gives I = E / R = 2.5 V / 125 Ω = 0.02 A." },
      { fig: function(){ return bankFig("1", 8); }, say: "Red, red, orange, gold = 22 Ω ± 5%.", ask: "What is wrong?", opts: ["Gold means ± 10%.", "The first digit is wrong.", "Orange is the multiplier × 10³, so it is 22 kΩ.", "Red is the multiplier."], ok: 2, why: "The third band is the multiplier. Orange = 3 zeros, so 22 000 Ω = 22 kΩ ± 5%." }
    ],
    "2": [
      { fig: function(){ return bankFig("2", 1); }, say: "KVL: E + V₁ + V₂ = 0, so 20 + 6 + 14 = 40 V.", ask: "What is wrong?", opts: ["KVL does not apply with a battery.", "V₂ should be 6 V.", "The current must be added too.", "The source is a rise and the drops are opposite: E − V₁ − V₂ = 0."], ok: 3, why: "Add the drops and subtract the rise (or the reverse). 20 − 6 − 14 = 0, so the loop checks." },
      { fig: function(){ return bankFig("2", 5); }, say: "I₅ = 15 + 10 + 7 + 8 = 40 A", ask: "What is wrong?", opts: ["Currents in and out are added together.", "Only the currents in go on one side: 15 + 10 = 7 + 8 + I₅, so I₅ = 10 A.", "I₅ must be 0 A.", "KCL is not used at nodes."], ok: 1, why: "KCL: current in = current out. 25 A enters, 15 A leaves in the known wires, so I₅ = 10 A." },
      { fig: function(){ return bankFig("2", 1); }, say: "The source has P = + E I = + 40 W, so it takes in energy.", ask: "What is wrong?", opts: ["The current enters the − end, so P = −40 W and the source gives out energy.", "Sources never have power.", "P must be 20 W.", "The resistors give out energy."], ok: 0, why: "With the reference direction of the slides, the current enters the − end of the source, so its power is negative. The 12 W and 28 W of the resistors are supplied by it." },
      { fig: function(){ return bankFig("2", 8); }, say: "Vab = VS = 9 V because the source is 9 V.", ask: "What is wrong?", opts: ["RS is ignored. It drops 1 V, so Vab = I RL = 8 V.", "Vab is always 0 V.", "RL is ignored, Vab = 4 V.", "Nothing is wrong."], ok: 0, why: "A real source loses voltage in RS. I = 9 / 4.5 = 2 A. Vab = 2 × 4 = 8 V and the other 1 V drops across RS." }
    ],
    "3": [
      { fig: function(){ return bankFig("3", 2); }, say: "V₂ = 12 × 2 / (2 + 4) = 4 V", ask: "What is wrong?", opts: ["The total resistance is 2 Ω.", "The VDR is not allowed here.", "The resistor wanted (R₂ = 4 Ω) must be on top: V₂ = 12 × 4 / 6 = 8 V.", "The answer must be 12 V."], ok: 2, why: "In the VDR the resistor you want goes on top. Check with KVL: 4 V + 8 V = 12 V." },
      { fig: function(){ return bankFig("3", 7); }, say: "I(1 kΩ) = 9 mA × 1 / (1 + 2) = 3 mA", ask: "What is wrong?", opts: ["The 1 kΩ branch must take the smaller current.", "In the CDR the OTHER resistor goes on top: 9 × 2 / 3 = 6 mA.", "The units must be amps.", "The CDR needs the voltage first."], ok: 1, why: "The smaller R takes the bigger share. 1 kΩ takes 6 mA and 2 kΩ takes 3 mA. Check: 6 + 3 = 9 mA." },
      { fig: function(){ return bankFig("3", 6); }, say: "Req = 4 Ω + 12 Ω = 16 Ω", ask: "What is wrong?", opts: ["The sum is only for series. For two in parallel: Req = (4 × 12) / (4 + 12) = 3 Ω.", "Req must be 48 Ω.", "Nothing is wrong.", "Req must be bigger than 12 Ω."], ok: 0, why: "In parallel, Req is smaller than the smallest R. 3 Ω is smaller than 4 Ω, as it must be." },
      { fig: function(){ return bankFig("3", 4); }, say: "L2 is burned out, so L1 and L3 stay on.", ask: "What is wrong?", opts: ["Only L1 goes off.", "L3 gets brighter.", "All the lamps stay on.", "Series has one path. The open lamp breaks it, so all lamps go off."], ok: 3, why: "That is how old Christmas lights behave. In a parallel circuit each lamp has its own path." }
    ],
    "4": [
      { fig: wrongSeries, say: "12 V with RS = 3 Ω was converted to IS = 4 A with RS = 3 Ω in series.", ask: "What is wrong?", opts: ["IS should be 36 A.", "RS must move to parallel with IS.", "RS must be removed.", "Nothing is wrong."], ok: 1, why: "In a source conversion RS moves from series to parallel (or back). IS = E / RS = 4 A is right." },
      { fig: wrongArrow, say: "The + of the 12 V source was on terminal a. The converted IS arrow points down.", ask: "What is wrong?", opts: ["Nothing is wrong.", "The value must be 36 A.", "The arrow of IS points to the + of E, so it must point up toward a.", "RS must be 12 Ω."], ok: 2, why: "The polarity rule: the arrow of IS points to the + of E." },
      { fig: function(){ return bankFig("4", 4); }, say: "E = 1.5 + 1.5 + 1.5 = 4.5 V", ask: "What is wrong?", opts: ["One cell is turned around, so it subtracts: E = 1.5 + 1.5 − 1.5 = 1.5 V.", "Cells in series never add.", "E must be 0 V.", "E must be 3 V."], ok: 0, why: "Series sources add with + if they point the same way as E and − if not." },
      { fig: function(){ return bankFig("4", 8); }, say: "KCL at node a: I₁ + I₃ = I₂", ask: "What is wrong?", opts: ["KCL is not used in this method.", "I₁ and I₂ enter node a and I₃ leaves: I₁ + I₂ = I₃.", "I₃ enters the node.", "The node must be b."], ok: 1, why: "Read the arrows in the figure. I₁ and I₂ point into a, and I₃ points away from it." }
    ]
  };

  // ================= order the steps =================
  var ORDERS = {
    "1": [
      { t: "Read the colour code: red, red, orange, gold", steps: ["First band red: first digit 2.", "Second band red: second digit 2.", "Third band orange: multiplier × 10³.", "R = 22 × 10³ Ω = 22 kΩ.", "Gold: tolerance ± 5%, so 20.9 kΩ to 23.1 kΩ."] },
      { t: "E = 2.5 V and R = 125 Ω. Find I.", steps: ["Choose the formula: I = E / R.", "Put in the values: I = 2.5 V / 125 Ω.", "Calculate: I = 0.02 A.", "Check with Ohm's law: V = I R = 0.02 × 125 = 2.5 V."] }
    ],
    "2": [
      { t: "Example 2.6: find R₃ (E = 5 V, I = 0.25 A)", steps: ["Find the known drops with V = I R: V₁ = 0.625 V, V₂ = 1.25 V, V₄ = 1 V.", "Write KVL for the loop.", "Solve: V₃ = 5 − 0.625 − 1.25 − 1 = 2.125 V.", "R₃ = V₃ / I = 2.125 / 0.25 = 8.5 Ω.", "Check the power: I² RT = E I = 1.25 W."] },
      { t: "KCL: 15 A and 10 A enter, 7 A and 8 A leave. Find I₅.", steps: ["Mark the arrows of all the currents at the node.", "Write KCL: in = out.", "Put in the values: 15 + 10 = 7 + 8 + I₅.", "Solve: I₅ = 25 − 15 = 10 A (leaving)."] }
    ],
    "3": [
      { t: "2 Ω in series with (6 Ω // 3 Ω) on 8 V", steps: ["Combine the parallel part: 6 // 3 = 2 Ω.", "Add the series part: Req = 2 + 2 = 4 Ω.", "Find the total current: IT = 8 / 4 = 2 A.", "Go back: V(parallel) = 2 A × 2 Ω = 4 V.", "Check with KVL: 2 × 2 + 4 = 8 V."] },
      { t: "Example 3.6: R₁ = 10 Ω, IT = 30 mA, I₂ = 10 mA. Find R₂.", steps: ["Write the CDR for I₂: I₂ = IT R₁ / (R₁ + R₂).", "Put in the values: 10 = 30 × 10 / (10 + R₂).", "Solve: 10 + R₂ = 30.", "R₂ = 20 Ω.", "Check: 30 mA × 10 / 30 = 10 mA."] }
    ],
    "4": [
      { t: "Example 4.1: convert E = 6 V, RS = 2 Ω, RL = 10 Ω", steps: ["Find IS = E / RS = 6 / 2 = 3 A.", "Move RS from series to parallel.", "Place the arrow of IS toward the + of E.", "IL (voltage source) = 6 / (2 + 10) = 0.5 A.", "IL (CDR) = 3 × 2 / (2 + 10) = 0.5 A. Same, so equivalent."] },
      { t: "Branch current analysis in five steps", steps: ["Label the nodes, a current arrow in every branch and a clockwise loop in every mesh.", "Write KCL at (n − 1) nodes.", "Write KVL in every mesh, with V = I R.", "Solve the equations by substitution.", "Find the rest (V, P). A negative current flows the other way."] }
    ]
  };

  