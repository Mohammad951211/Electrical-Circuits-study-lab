  // Each chapter bank is built from that chapter's slides: worked examples, NOW YOU TRY items
  // and homework. Every value below comes from those slides. One question, one unknown.
  // fig() draws the circuit. The answer is the law and the result.
  function B(lab, plus, side){ return { t: "bat", c: YM, plus: plus || "u", lab: lab, side: side || "l" }; }

  var CHAPTERS = {
    "1": {
      title: "Basic Concepts of Electric Circuits",
      questions: [
        { tag: "Concept",
          q: "The lamp stays dark. Why?",
          a: "The switch is open, so the loop is not closed.\nAn open loop stops the current.",
          fig: function(){
            return svg(rect(XL, XR, YT, YB, {
              l: [B("E")],
              t: [{ t: "sw", c: 190 }],
              r: [{ t: "lamp", c: YM }]
            }));
          } },
        { tag: "Concept",
          q: "Is the ammeter connected correctly to measure the current through R?",
          a: "No. It is in parallel with R.\nAn ammeter goes in SERIES.",
          fig: function(){
            return svg(rect(XL, XR, YT, YB, {
              l: [B("E = 12 V")],
              r: [{ t: "r", c: YM, lab: "R = 6 Ω", side: "l" }]
            }) + vrun(215, YT, YB, [{ t: "m", c: YM, ch: "A" }]) + dots([[215, YT], [215, YB]]));
          } },
        { tag: "Concept",
          q: "Which way does conventional current flow, clockwise or counterclockwise?",
          a: "From the + terminal, through the lamp, back to the − terminal.\nHere it is clockwise.",
          fig: function(){
            return svg(rect(XL, XR, YT, YB, {
              l: [B(null)],
              r: [{ t: "lamp", c: YM }]
            }));
          } },
        { tag: "Calculation",
          q: "100 C passes through the ammeter in 50 s. Find I.",
          a: "I = Q / t = 100 C / 50 s = 2 A",
          fig: function(){
            return svg(rect(XL, XR, YT, YB, {
              l: [B("E")],
              t: [{ t: "m", c: 190, ch: "A", lab: "I = ?", side: "t" }],
              r: [{ t: "r", c: YM, lab: "R", side: "l" }]
            }) + P.t(190, 104, "100 C in 50 s"));
          } },
        { tag: "Calculation",
          q: "24 J of work moves 4 C through the lamp. Find the voltage.",
          a: "V = W / Q = 24 J / 4 C = 6 V",
          fig: function(){
            return svg(rect(XL, XR, YT, YB, {
              l: [B("E")],
              r: [{ t: "lamp", c: YM }]
            }) + vrun(230, YT, YB, [{ t: "m", c: YM, ch: "V", lab: "V = ?", side: "r" }]) + dots([[230, YT], [230, YB]]) + P.t(150, 79, "24 J moves|4 C"));
          } },
        { tag: "Calculation",
          q: "E = 2.5 V and R = 125 Ω. Find I.",
          a: "I = E / R = 2.5 V / 125 Ω = 0.02 A",
          fig: function(){
            return svg(rect(XL, XR, YT, YB, {
              l: [B("E = 2.5 V")],
              r: [{ t: "r", c: YM, lab: "R = 125 Ω", side: "l" }],
              b: [{ t: "m", c: 215, ch: "A", lab: "I = ?", side: "b" }]
            }));
          } },
        { tag: "Calculation",
          q: "A 9 V source drives 0.3 A. Find R.",
          a: "R = V / I = 9 V / 0.3 A = 30 Ω",
          fig: function(){
            return svg(rect(XL, XR, YT, YB, {
              l: [B("E = 9 V")],
              t: [{ t: "m", c: 190, ch: "A", lab: "0.3 A", side: "t" }],
              r: [{ t: "r", c: YM, lab: "R = ?", side: "l" }]
            }));
          } },
        { tag: "Calculation",
          q: "The 47 Ω resistor carries 0.1 A. Find the voltmeter reading.",
          a: "V = I R = 0.1 A × 47 Ω = 4.7 V",
          fig: function(){
            return svg(rect(XL, XR, YT, YB, {
              l: [B("E")],
              r: [{ t: "r", c: YM, lab: "R = 47 Ω", side: "l" }],
              b: [{ t: "m", c: 215, ch: "A", lab: "0.1 A", side: "b" }]
            }) + vrun(185, YT, YB, [{ t: "m", c: YM, ch: "V", lab: "V = ?", side: "l" }]) + dots([[185, YT], [185, YB]]));
          } },
        { tag: "Calculation",
          q: "Red, red, orange, gold. Find the resistance and tolerance.",
          a: "2, 2, then 3 zeros: 22 000 Ω = 22 kΩ.\nGold = ± 5%.",
          fig: function(){
            var s = P.w([[40, YM], [100, YM]]) + P.w([[260, YM], [320, YM]]);
            s += '<rect x="100" y="60" width="160" height="46" rx="14" fill="#e3d5b3" stroke="#1b2a3a" stroke-width="2"/>';
            [[122, "#d62828"], [148, "#d62828"], [174, "#f4820a"], [226, "#c9a227"]].forEach(function(b){
              s += '<rect x="' + b[0] + '" y="60" width="13" height="46" fill="' + b[1] + '"/>';
            });
            s += P.t(128.5, 126, "1", "middle", "sign") + P.t(154.5, 126, "2", "middle", "sign") + P.t(180.5, 126, "3", "middle", "sign") + P.t(232.5, 126, "4", "middle", "sign");
            return svg(s);
          } },
        { tag: "Calculation",
          q: "The resistor has G = 0.2 S. Find R.",
          a: "R = 1 / G = 1 / 0.2 S = 5 Ω",
          fig: function(){
            var s = P.r(90, 66, 270, 66, "G = 0.2 S", "t", { body: 70 });
            s += P.w([[90, 66], [90, 118], [163, 118]]) + P.w([[270, 66], [270, 118], [187, 118]]);
            s += dots([[90, 66], [270, 66]]) + P.m(175, 118, "Ω") + P.t(175, 148, "ohmmeter, resistor removed from the circuit", "middle", "sign");
            return svg(s);
          } }
      ]
    },

    "2": {
      title: "Basic Laws of Electric Circuits",
      questions: [
        { tag: "Calculation",
          q: "A 6 Ω resistor carries 2 A. Find the power.",
          a: "P = I²R = 2² × 6 = 24 W",
          fig: function(){
            return svg(rect(XL, XR, YT, YB, {
              l: [B("E")],
              r: [{ t: "r", c: YM, lab: "R = 6 Ω", side: "l" }]
            }) + P.arr(150, 20, 215, 20, "I = 2 A", 143, 25, "end") + P.t(190, 88, "P = ?"));
          } },
        { tag: "Calculation",
          q: "I = 2 A and E = 20 V. Find the power of the source.",
          a: "The current enters the − end of the source.\nP = −E I = −20 × 2 = −40 W (gives out energy)",
          fig: function(){
            return svg(rect(XL, XR, YT, YB, {
              l: [B("E = 20 V")],
              t: [{ t: "r", c: 190, lab: "V_1 = 6 V", side: "t", pm: true }],
              r: [{ t: "r", c: YM, lab: "V_2 = 14 V", side: "l", pm: true }]
            }) + P.arr(150, 9, 220, 9, "I = 2 A", 143, 13, "end"));
          } },
        { tag: "Calculation",
          q: "Write KVL for this loop, going clockwise.",
          a: "V₁ + V₂ + V₃ − E₂ − E₁ = 0\nClockwise, both sources are crossed from − to +.",
          fig: function(){
            return svg(rect(XL, XR, YT, YB, {
              t: [{ t: "r", c: 140, lab: "V_1", side: "t", pm: true }, { t: "r", c: 240, lab: "V_2", side: "t", pm: true }],
              r: [{ t: "r", c: YM, lab: "V_3", side: "l", pm: true }],
              b: [{ t: "bat", c: 245, plus: "l", lab: "E_2", side: "b" }, { t: "bat", c: 140, plus: "l", lab: "E_1", side: "b" }]
            }) + P.t(165, 87, "loop: clockwise", "middle", "sign"));
          } },
        { tag: "Calculation",
          q: "E = 5 V and I = 0.25 A. Find R₃.",
          a: "KVL: V₃ = 5 − 0.625 − 1.25 − 1 = 2.125 V\nR₃ = V₃ / I = 2.125 V / 0.25 A = 8.5 Ω",
          fig: function(){
            return svg(rect(XL, XR, YT, YB, {
              l: [B("E = 5 V")],
              t: [{ t: "r", c: 140, lab: "R_1 = 2.5 Ω", side: "t" }, { t: "r", c: 240, lab: "R_2 = 5 Ω", side: "t" }],
              r: [{ t: "r", c: YM, lab: "R_3 = ?", side: "l" }],
              b: [{ t: "r", c: 190, lab: "R_4 = 4 Ω", side: "b" }]
            }) + P.arr(160, 66, 220, 66, "I = 0.25 A", 190, 84));
          } },
        { tag: "Calculation",
          q: "Find Vab.",
          a: "Vab = E − V₁ − V₄ = 5 − 1.5 − 1 = 2.5 V",
          fig: function(){
            var s = vrun(XL, YT, YB, [B("E = 5 V")]);
            s += hrun(YT, XL, 250, [{ t: "r", c: 165, lab: "V_1 = 1.5 V", side: "t", pm: true }]);
            s += vrun(250, YT, YB, [
              { t: "r", c: 62, len: 36, body: 26, lab: "V_2 = 2 V", side: "r", pm: true },
              { t: "r", c: 104, len: 36, body: 26, lab: "V_3 = 0.5 V", side: "r", pm: true }]);
            s += hrun(YB, 250, XL, [{ t: "r", c: 165, lab: "V_4 = 1 V", side: "b", pm: true }]);
            s += dots([[250, YT], [250, YB]]) + P.t(250, 29, "a") + P.t(250, 146, "b");
            s += '<line class="dash" x1="258" y1="38" x2="335" y2="38"/><line class="dash" x1="258" y1="128" x2="335" y2="128"/>';
            s += P.arr(335, 83, 335, 44) + P.arr(335, 83, 335, 122) + P.t(328, 87, "V_{ab}", "end", "acc");
            return svg(s);
          } },
        { tag: "Calculation",
          q: "15 A and 10 A enter the node. 7 A and 8 A leave. Find I₅.",
          a: "KCL: in = out\n15 + 10 = 7 + 8 + I₅, so I₅ = 10 A (leaving)",
          fig: function(){
            var nx = 190, ny = 83;
            var s = edge(80, 36, nx, ny, 0.45) + edge(80, 130, nx, ny, 0.45);
            s += edge(nx, ny, 300, 36, 0.5) + edge(nx, ny, 300, ny, 0.5) + edge(nx, ny, 300, 130, 0.5);
            s += '<circle class="dot" cx="' + nx + '" cy="' + ny + '" r="5"/>';
            s += P.t(80, 28, "I_1 = 15 A", "start") + P.t(80, 150, "I_2 = 10 A", "start");
            s += P.t(304, 32, "I_3 = 7 A", "start") + P.t(308, 87, "I_4 = 8 A", "start") + P.t(304, 150, "I_5 = ?", "start", "acc");
            return svg(s);
          } },
        { tag: "Calculation",
          q: "I₁ = 5 A enters the ring. Use KCL on the ring to find I₇.",
          a: "What enters the ring must leave it.\nI₇ = I₁ = 5 A",
          fig: function(){
            var A = [130, 45], Bn = [250, 45], C = [130, 115], D = [250, 115];
            var s = P.ring(108, 22, 172, 114);
            s += edge(50, 45, A[0], A[1], 0.45);
            s += edge(A[0], A[1], Bn[0], Bn[1], 0.5);
            s += edge(C[0], C[1], D[0], D[1], 0.5);
            s += edge(C[0], C[1], A[0], A[1], 0.5);
            s += edge(Bn[0], Bn[1], D[0], D[1], 0.5);
            s += edge(Bn[0], Bn[1], C[0], C[1], 0.5);
            s += edge(D[0], D[1], 330, D[1], 0.5);
            s += dots([A, Bn, C, D]);
            s += P.t(44, 35, "I_1 = 5 A", "start") + P.t(190, 36, "I_2 = 6 A") + P.t(190, 143, "I_6 = 1 A");
            s += P.t(120, 84, "I_3", "end") + P.t(290, 84, "I_5 = 4 A", "start") + P.t(206, 103, "I_4", "start");
            s += P.t(330, 134, "I_7 = ?", "end", "acc");
            s += P.t(122, 41, "A", "end", "sign") + P.t(258, 41, "B", "start", "sign") + P.t(121, 129, "C", "end", "sign") + P.t(259, 129, "D", "start", "sign");
            return svg(s);
          } },
        { tag: "Calculation",
          q: "The ammeter reads 3 A. Find Vab.",
          a: "KVL, left loop: Vab = 12 − 3 × 2 = 6 V",
          fig: function(){
            var s = vrun(XL, YT, YB, [B("E = 12 V")]);
            s += hrun(YT, XL, 285, [{ t: "m", c: 105, ch: "A", lab: "I_1 = 3 A", side: "t" }, { t: "r", c: 150, lab: "R_1 = 2 Ω", side: "t" }]);
            s += vrun(205, YT, YB, [{ t: "r", c: YM, lab: "R_2 = 6 Ω", side: "r" }]);
            s += vrun(285, YT, YB, [{ t: "r", c: YM, lab: "R_3 = 3 Ω", side: "r" }]);
            s += hrun(YB, 285, XL, []);
            s += dots([[205, YT], [205, YB]]) + P.t(205, 29, "a") + P.t(205, 146, "b");
            s += P.arr(184, 83, 184, 48) + P.arr(184, 83, 184, 118) + P.t(177, 87, "V_{ab}", "end", "acc");
            return svg(s);
          } },
        { tag: "Calculation",
          q: "A real source has VS = 9 V and RS = 0.5 Ω. Find I.",
          a: "I = VS / (RS + RL) = 9 V / (0.5 + 4) Ω = 2 A",
          fig: function(){
            var s = vrun(XL, YT, YB, [B("V_S = 9 V")]);
            s += hrun(YT, XL, 285, [{ t: "r", c: 140, lab: "R_S = 0.5 Ω", side: "t" }]);
            s += vrun(285, YT, YB, [{ t: "r", c: YM, lab: "R_L = 4 Ω", side: "r" }]);
            s += hrun(YB, 285, XL, []);
            s += dots([[215, YT], [215, YB]]) + P.t(215, 29, "a") + P.t(215, 146, "b");
            return svg(s);
          } },
        { tag: "Calculation",
          q: "An ideal 5 mA current source feeds RL = 2 kΩ. Find Vab.",
          a: "Vab = IS × RL = 5 mA × 2 kΩ = 10 V",
          fig: function(){
            var xl = 105, xr = 285;
            var s = vrun(xl, YT, YB, [{ t: "isrc", c: YM, dir: "u", lab: "I_S = 5 mA", side: "l" }]);
            s += hrun(YT, xl, xr, []);
            s += vrun(xr, YT, YB, [{ t: "r", c: YM, lab: "R_L = 2 kΩ", side: "r" }]);
            s += hrun(YB, xr, xl, []);
            s += dots([[200, YT], [200, YB]]) + P.t(200, 29, "a") + P.t(200, 146, "b");
            s += P.arr(232, 83, 232, 48) + P.arr(232, 83, 232, 118) + P.t(240, 87, "V_{ab}", "start", "acc");
            return svg(s);
          } }
      ]
    },

    "3": {
      title: "Series–Parallel Resistive Circuits",
      questions: [
        { tag: "Calculation",
          q: "Find RT.",
          a: "RT = R₁ + R₂ + R₃ = 10 + 20 + 30 = 60 kΩ",
          fig: function(){
            return svg(rect(XL, XR, YT, YB, {
              l: [B("E = 60 V")],
              t: [{ t: "r", c: 140, lab: "R_1 = 10 kΩ", side: "t" }, { t: "r", c: 245, lab: "R_2 = 20 kΩ", side: "t" }],
              r: [{ t: "r", c: YM, lab: "R_3 = 30 kΩ", side: "l" }]
            }) + P.arr(165, 66, 215, 66, "I", 190, 84));
          } },
        { tag: "Calculation",
          q: "E = 24 V. Find I.",
          a: "RT = 2 + 4 + 6 = 12 Ω\nI = E / RT = 24 V / 12 Ω = 2 A",
          fig: function(){
            return svg(rect(XL, XR, YT, YB, {
              l: [B("E = 24 V")],
              t: [{ t: "r", c: 160, lab: "2 Ω", side: "t" }],
              r: [{ t: "r", c: YM, lab: "4 Ω", side: "l" }],
              b: [{ t: "r", c: 190, lab: "6 Ω", side: "b" }]
            }) + P.arr(150, 66, 215, 66, "I = ?", 182, 84));
          } },
        { tag: "Calculation",
          q: "Use the voltage-divider rule to find V₂.",
          a: "V₂ = E × R₂ / (R₁ + R₂) = 12 × 4 / 6 = 8 V",
          fig: function(){
            return svg(rect(XL, XR, YT, YB, {
              l: [B("E = 12 V")],
              r: [{ t: "r", c: 62, len: 36, body: 26, lab: "R_1 = 2 Ω", side: "l" }, { t: "r", c: 104, len: 36, body: 26, lab: "R_2 = 4 Ω", side: "l" }]
            }) + P.t(316, 108, "V_2 = ?", "start", "acc"));
          } },
        { tag: "Calculation",
          q: "E = 120 V and point e is ground. Find Vb.",
          a: "Vb = Vbe = E × (R₂ + R₃ + R₄) / RT\nVb = 120 × 50 / 60 = 100 V",
          fig: function(){
            var s = vrun(XL, YT, YB, [B("E = 120 V")]);
            s += hrun(YT, XL, XR, [{ t: "r", c: 140, lab: "R_1 = 10 kΩ", side: "t" }, { t: "r", c: 240, lab: "R_2 = 20 kΩ", side: "t" }]);
            s += vrun(XR, YT, YB, [{ t: "r", c: YM, lab: "R_3 = 20 kΩ", side: "l" }]);
            s += hrun(YB, XR, XL, [{ t: "r", c: 230, lab: "R_4 = 10 kΩ", side: "b" }]);
            s += dots([[XL, YT], [190, YT], [XR, YT], [XR, YB], [150, YB]]) + P.gnd(150, YB);
            s += P.t(XL - 8, 32, "a", "end", "sign") + P.t(190, 29, "b", "middle", "sign") + P.t(XR + 8, 32, "c", "start", "sign");
            s += P.t(XR + 8, 134, "d", "start", "sign") + P.t(158, 121, "e", "start", "sign");
            return svg(s);
          } },
        { tag: "Concept",
          q: "One lamp in the series string burns out. What do the other lamps do?",
          a: "All go off.\nA series circuit has one path, and the open lamp breaks it.",
          fig: function(){
            return svg(rect(XL, XR, YT, YB, {
              l: [B("E")],
              t: [{ t: "lamp", c: 125, lab: "L1", side: "t" }, { t: "lamp", c: 190, lab: "L2", side: "t", dash: true }, { t: "lamp", c: 255, lab: "L3", side: "t" }]
            }) + P.t(190, 78, "burned out", "middle", "sign"));
          } },
        { tag: "Calculation",
          q: "Find Req.",
          a: "Req = 1 / (1/10 + 1/20 + 1/30) ≈ 5.455 Ω",
          fig: function(){
            var xr = 272;
            var s = vrun(XL, YT, YB, [B("E")]);
            s += hrun(YT, XL, xr, []) + hrun(YB, xr, XL, []);
            s += vrun(120, YT, YB, [{ t: "r", c: YM, lab: "R_1 = 10 Ω", side: "r" }]);
            s += vrun(190, YT, YB, [{ t: "r", c: YM, lab: "R_2 = 20 Ω", side: "r" }]);
            s += vrun(xr, YT, YB, [{ t: "r", c: YM, lab: "R_3 = 30 Ω", side: "r" }]);
            s += dots([[120, YT], [120, YB], [190, YT], [190, YB]]);
            return svg(s);
          } },
        { tag: "Calculation",
          q: "Find Req of the two parallel resistors.",
          a: "Req = (4 × 12) / (4 + 12) = 3 Ω",
          fig: function(){
            var xr = 255;
            var s = vrun(XL, YT, YB, [B("E = 12 V")]);
            s += hrun(YT, XL, xr, []) + hrun(YB, xr, XL, []);
            s += vrun(170, YT, YB, [{ t: "r", c: YM, lab: "4 Ω", side: "r" }]);
            s += vrun(xr, YT, YB, [{ t: "r", c: YM, lab: "12 Ω", side: "r" }]);
            s += dots([[170, YT], [170, YB]]);
            return svg(s);
          } },
        { tag: "Calculation",
          q: "9 mA enters the two resistors. Find the current in the 1 kΩ resistor.",
          a: "CDR: the other R goes on top.\nI = 9 mA × 2 / (1 + 2) = 6 mA",
          fig: function(){
            var xl = 100, xr = 265;
            var s = vrun(xl, YT, YB, [{ t: "isrc", c: YM, dir: "u", lab: "9 mA", side: "l" }]);
            s += hrun(YT, xl, xr, []) + hrun(YB, xr, xl, []);
            s += vrun(185, YT, YB, [{ t: "r", c: YM, lab: "R_1 = 1 kΩ", side: "r" }]);
            s += vrun(xr, YT, YB, [{ t: "r", c: YM, lab: "R_2 = 2 kΩ", side: "r" }]);
            s += dots([[185, YT], [185, YB]]);
            return svg(s);
          } },
        { tag: "Calculation",
          q: "R₁ = 10 Ω, IT = 30 mA and I₂ = 10 mA. Find R₂.",
          a: "CDR: 10 = 30 × 10 / (10 + R₂)\nR₂ = 20 Ω",
          fig: function(){
            var xl = 100, xr = 265;
            var s = vrun(xl, YT, YB, [{ t: "isrc", c: YM, dir: "u", lab: "I_T = 30 mA", side: "l" }]);
            s += hrun(YT, xl, xr, []) + hrun(YB, xr, xl, []);
            s += vrun(185, YT, YB, [{ t: "r", c: YM, lab: "R_1 = 10 Ω", side: "r" }]);
            s += vrun(xr, YT, YB, [{ t: "r", c: YM, lab: "R_2 = ?|I_2 = 10 mA", side: "r" }]);
            s += dots([[185, YT], [185, YB]]);
            return svg(s);
          } },
        { tag: "Calculation",
          q: "Find Req.",
          a: "AB: 6 // 3 = 2 Ω. BC: 12 // (4 + 8) = 6 Ω.\nReq = 2 + 6 = 8 Ω",
          fig: function(){
            var yu = 50, yl = 100;
            var s = P.w([[45, 108], [45, yu], [130, yu]]) + P.w([[45, 128], [45, 148], [335, 148], [335, yu], [305, yu]]);
            s += P.bat(45, 118, "u", "E = 24 V", "r", { off: 17 });
            s += P.r(142, yu, 202, yu, "R_1 = 6 Ω", "t") + P.r(222, yu, 282, yu, "R_3 = 12 Ω", "t");
            s += P.r(142, yl, 202, yl, "R_2 = 3 Ω", "b") + P.r(210, yl, 252, yl, "R_4 = 4 Ω", "b", { body: 28 }) + P.r(256, yl, 298, yl, "R_5 = 8 Ω", "t", { body: 28 });
            s += P.w([[130, yu], [142, yu]]) + P.w([[130, yu], [130, yl], [142, yl]]);
            s += P.w([[202, yu], [222, yu]]) + P.w([[202, yl], [210, yl]]) + P.w([[202, yu], [202, yl]]);
            s += P.w([[282, yu], [305, yu]]) + P.w([[298, yl], [305, yl]]) + P.w([[305, yu], [305, yl]]);
            s += dots([[130, yu], [130, yl], [202, yu], [202, yl], [305, yu], [305, yl]]);
            s += P.t(122, 80, "A", "end", "sign") + P.t(210, 80, "B", "start", "sign") + P.t(313, 80, "C", "start", "sign");
            return svg(s);
          } }
      ]
    },

    "4": {
      title: "Methods of DC Circuit Analysis",
      questions: [
        { tag: "Calculation",
          q: "Convert the voltage source E = 6 V, RS = 2 Ω to a current source. Find IS.",
          a: "IS = E / RS = 6 V / 2 Ω = 3 A\nRS = 2 Ω moves in parallel.",
          fig: function(){
            var s = vrun(XL, YT, YB, [B("E = 6 V")]);
            s += hrun(YT, XL, 285, [{ t: "r", c: 135, lab: "R_S = 2 Ω", side: "t" }]);
            s += vrun(285, YT, YB, [{ t: "r", c: YM, lab: "R_L = 10 Ω", side: "r" }]);
            s += hrun(YB, 285, XL, []);
            s += dots([[200, YT], [200, YB]]) + P.t(200, 29, "a") + P.t(200, 146, "b");
            return svg(s);
          } },
        { tag: "Calculation",
          q: "Convert this current source to a voltage source. Find ES.",
          a: "ES = IS RS = 2 A × 4 Ω = 8 V\nRS = 4 Ω moves in series.",
          fig: function(){
            var xl = 110, xr = 290;
            var s = vrun(xl, YT, YB, [{ t: "isrc", c: YM, dir: "u", lab: "I_S = 2 A", side: "l" }]);
            s += hrun(YT, xl, xr, []) + hrun(YB, xr, xl, []);
            s += vrun(200, YT, YB, [{ t: "r", c: YM, lab: "R_S = 4 Ω", side: "r" }]);
            s += dots([[200, YT], [200, YB]]) + P.term(xr, YT) + P.term(xr, YB);
            s += P.t(xr + 10, 42, "a", "start") + P.t(xr + 10, 132, "b", "start");
            return svg(s);
          } },
        { tag: "Calculation",
          q: "Convert this voltage source to a current source. Find IS.",
          a: "IS = E / RS = 12 V / 3 Ω = 4 A",
          fig: function(){
            var xr = 255;
            var s = vrun(XL, YT, YB, [B("E = 12 V")]);
            s += hrun(YT, XL, xr, [{ t: "r", c: 160, lab: "R_S = 3 Ω", side: "t" }]);
            s += hrun(YB, xr, XL, []);
            s += P.term(xr, YT) + P.term(xr, YB);
            s += P.t(xr + 10, 42, "a", "start") + P.t(xr + 10, 132, "b", "start");
            return svg(s);
          } },
        { tag: "Calculation",
          q: "Find IL.",
          a: "IL = E / (RS + RL) = 9 V / (1 + 8) Ω = 1 A",
          fig: function(){
            return svg(rect(XL, XR - 10, YT, YB, {
              l: [B("E = 9 V")],
              t: [{ t: "r", c: 145, lab: "R_S = 1 Ω", side: "t" }],
              r: [{ t: "r", c: YM, lab: "R_L = 8 Ω", side: "r" }]
            }) + P.arr(185, 66, 235, 66, "I_L = ?", 210, 84));
          } },
        { tag: "Concept",
          q: "Three 1.5 V cells are in series. One is turned around. Find E.",
          a: "Same direction adds, opposite subtracts.\nE = 1.5 + 1.5 − 1.5 = 1.5 V",
          fig: function(){
            var s = hrun(YM, 55, 305, [
              { t: "bat", c: 125, plus: "r", lab: "1.5 V", side: "t" },
              { t: "bat", c: 195, plus: "l", lab: "1.5 V", side: "t" },
              { t: "bat", c: 265, plus: "r", lab: "1.5 V", side: "t" }]);
            s += P.term(55, YM) + P.term(305, YM) + P.t(180, 128, "E = ?", "middle", "acc");
            return svg(s);
          } },
        { tag: "Calculation",
          q: "Two current sources are in parallel. Find the combined IS.",
          a: "Parallel sources add, both point up.\nIS = 2 A + 4 A = 6 A",
          fig: function(){
            var s = vrun(80, YT, YB, [{ t: "isrc", c: YM, dir: "u", lab: "2 A", side: "r" }]);
            s += hrun(YT, 80, 330, []) + hrun(YB, 330, 80, []);
            s += vrun(145, YT, YB, [{ t: "r", c: YM, lab: "4 Ω", side: "r" }]);
            s += vrun(215, YT, YB, [{ t: "isrc", c: YM, dir: "u", lab: "4 A", side: "r" }]);
            s += vrun(280, YT, YB, [{ t: "r", c: YM, lab: "4 Ω", side: "r" }]);
            s += dots([[145, YT], [145, YB], [215, YT], [215, YB], [280, YT], [280, YB]]);
            s += P.term(330, YT) + P.term(330, YB) + P.t(340, 42, "a", "start") + P.t(340, 132, "b", "start");
            return svg(s);
          } },
        { tag: "Calculation",
          q: "The 12 V source aids the current. The 4 V and 2 V sources oppose it. Find I.",
          a: "I = ΣE / ΣR = (12 − 4 − 2) V / (2 + 2 + 4 + 2) Ω = 0.6 A",
          fig: function(){
            return svg(rect(XL, XR, YT, YB, {
              l: [B("12 V")],
              t: [{ t: "r", c: 125, lab: "2 Ω", side: "t" }, { t: "bat", c: 185, plus: "l", lab: "4 V", side: "t" }, { t: "r", c: 250, lab: "2 Ω", side: "t" }],
              r: [{ t: "r", c: YM, lab: "R_L = 2 Ω", side: "l" }],
              b: [{ t: "r", c: 225, lab: "4 Ω", side: "b" }, { t: "bat", c: 150, plus: "r", lab: "2 V", side: "b" }]
            }) + P.arr(150, 83, 215, 83, "I = ?", 182, 76));
          } },
        { tag: "Concept",
          q: "I₄ = 6 A is known. How many equations are needed to find the other currents?",
          a: "Unknowns: I₁, I₂, I₃, so 3 equations.\n1 KCL (n − 1 = 1) + 2 KVL = 3. No KVL in mesh 3.",
          fig: function(){
            var xs = [95, 165, 245, 320];
            var s = hrun(YT, xs[0], xs[3], []) + hrun(YB, xs[3], xs[0], []);
            s += vrun(xs[0], YT, YB, [{ t: "r", c: 60, len: 36, body: 26, lab: "1 Ω", side: "l" }, { t: "bat", c: 106, plus: "u", lab: "2.5 V", side: "l" }]);
            s += vrun(xs[1], YT, YB, [{ t: "r", c: 60, len: 36, body: 26, lab: "1.5 Ω", side: "r" }, { t: "bat", c: 106, plus: "u", lab: "4 V", side: "r" }]);
            s += vrun(xs[2], YT, YB, [{ t: "r", c: 62, len: 36, body: 26, lab: "0.5 Ω", side: "r" }]);
            s += vrun(xs[3], YT, YB, [{ t: "isrc", c: YM, dir: "u", lab: "6 A", side: "r" }]);
            s += dots([[xs[1], YT], [xs[1], YB], [xs[2], YT], [xs[2], YB]]);
            s += P.circ(130, 83, 1) + P.circ(205, 83, 2) + P.circ(282, 83, 3);
            s += P.t(xs[1], 29, "a", "middle", "sign") + P.t(xs[1], 146, "b", "middle", "sign");
            return svg(s);
          } },
        { tag: "Calculation",
          q: "Write KCL at node a.",
          a: "I₁ + I₂ = I₃",
          fig: function(){ return branchFig({ e1: "E_1 = 10 V", e2: "E_2 = 5 V", r1: "R_1 = 2 Ω", r2: "R_2 = 2 Ω", r3: "R_3 = 3 Ω" }); } },
        { tag: "Calculation",
          q: "Write KVL for mesh 1, clockwise.",
          a: "E₁ = R₁ I₁ + R₃ I₃\n10 = 2 I₁ + 3 I₃",
          fig: function(){ return branchFig({ e1: "E_1 = 10 V", e2: "E_2 = 5 V", r1: "R_1 = 2 Ω", r2: "R_2 = 2 Ω", r3: "R_3 = 3 Ω" }); } }
      ]
    }
  };
  var CHAPTER_IDS = ["1", "2", "3", "4"];

  // two-source branch-current circuit (Example 4.4)
  function branchFig(o){
    var xr = 285, xa = 195;
    var s = vrun(XL, YT, YB, [B(o.e1)]);
    s += hrun(YT, XL, xr, [{ t: "r", c: 135, lab: o.r1, side: "t" }, { t: "r", c: 250, lab: o.r2, side: "t" }]);
    s += vrun(xr, YT, YB, o.e2 ? [{ t: "bat", c: YM, plus: "u", lab: o.e2, side: "r" }] : []);
    s += hrun(YB, xr, XL, []);
    s += vrun(xa, YT, YB, [{ t: "r", c: YM, lab: o.r3, side: "r" }]);
    s += dots([[xa, YT], [xa, YB]]) + P.t(xa, 29, "a", "middle", "sign") + P.t(xa, 146, "b", "middle", "sign");
    s += P.arr(108, 66, 152, 66, "I_1", 130, 60);
    s += P.arr(270, 66, 226, 66, "I_2", 248, 60);
    s += P.arr(181, 50, 181, 72, "I_3", 174, 65, "end");
    s += P.circ(138, 103, 1) + P.circ(244, 108, 2);
    return svg(s);
  }
