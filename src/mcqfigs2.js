// ---- fixed multiple-choice questions: matched by the start of the text; the drawing is the circuit the question names ----
var MQ2 = (function(){
  var rules = [];
  function pre(t){ return new RegExp("^" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")); }
  function at(t, f){ rules.push([pre(t), f]); }
  function each(list, f){ list.forEach(function(t){ at(t, f); }); }
  function cells(n, flip){ var it = [], i; for (i = 0; i < n; i++) it.push({ t: "bat", c: 120 + i * 60, plus: flip === i ? "l" : "r", lab: "1.5 V", side: "t" }); return svg(rect(XL, XR, YT, YB, { t: it, r: [R_("R", YM, "l")] })); }
  function bankFigStart(ch, start){ var l = CHAPTERS[ch].questions; for (var i = 0; i < l.length; i++) if (l[i].q.indexOf(start) === 0) return l[i].fig(); return null; }
  var switchCkt = function(){ return svg(rect(XL, XR, YT, YB, { l: [B("E")], t: [{ t: "sw", c: 190 }], r: [{ t: "lamp", c: YM }] })); };
  var xfmr = function(){ return figXfmr("V_P", "N_P", "N_S", "load"); };
  var motor = function(){ return figMotor("V_in", "R", "V_bemf", "I"); };
  var twoI = function(a, b, da, db){ return function(){ return fBranches([{ t: "isrc", c: YM, dir: da, lab: a, side: "r" }], [{ t: "isrc", c: YM, dir: db, lab: b, side: "r" }], [R_("R", YM, "r", { off: 10 })], [XL, 170, 250]); }; };
  var ex44 = function(){ return fTwoSrc("E₁ = 10 V", "E₂ = 5 V", "R₁ = 2 Ω", "R₂ = 2 Ω", "R₃ = 3 Ω"); };
  var ex41 = function(){ return fReal("E = 6 V", "R_S = 2 Ω", "R_L = 10 Ω"); };
  var ex51 = function(){ return bankFigStart("5", "Example 5.1."); };
  var t51 = function(){ return fReal("V_S = 10 V", "R_S = 30 Ω", "R_L"); };
  var s24 = function(){ return fSer("24 V", ["2 Ω", "4 Ω", "6 Ω"]); };
  var sp8 = function(){ return fSP("8 V", "2 Ω", "6 Ω", "3 Ω"); };

  at("Which three parts form a basic electric circuit?", function(){ return svg(rect(XL, XR, YT, YB, { l: [B("source")], r: [{ t: "lamp", c: YM, lab: "load", side: "l" }] }) + P.t(190, 26, "wires", "middle")); });
  at("A switch is open. What is the current in the loop?", switchCkt);
  at("A switch in a simple lamp circuit is open.", switchCkt);
  at("24 J of work moves 4 C through a lamp.", function(){ return svg(rect(XL, XR, YT, YB, { l: [B("E")], r: [{ t: "lamp", c: YM }] }) + P.t(190, 22, "24 J moves 4 C", "middle") + vrun(215, YT, YB, [{ t: "m", c: YM, ch: "V", lab: "V = ?", side: "r" }]) + dots([[215, YT], [215, YB]])); });
  at("R = 5 Ω. Then G is", function(){ return svg(hrun(YM, 60, 322, [R_("R = 5 Ω", 191, "t")]) + P.term(60, YM) + P.term(322, YM)); });
  at("The result is I = −2 A.", function(){ return fLoop("E", "R", "I = −2 A"); });
  at("E = 5 V, V₁ = 1.5 V and V₄ = 1 V.", function(){ return fSer("E = 5 V", ["V₁ = 1.5 V", "V₂", "V₃", "V₄ = 1 V"]); });
  at("Three resistors with 2.5 V each are in series with E₂ = 5 V and E₁ = 2.5 V.", function(){ return svg(rect(XL, XR, YT, YB, { l: [B("E₁ = 2.5 V")], r: [B("E₂ = 5 V", "d", "r")], t: [R_("2.5 V", 125, "t"), R_("2.5 V", 190, "t"), R_("2.5 V", 255, "t")] })); });
  at("In the same circuit the voltage lost in RS", function(){ return fReal("V_S = 9 V", "R_S = 0.5 Ω", "R_L = 4 Ω"); });
  at("The same 5 mA source feeds 500 Ω.", function(){ return fIsrc("5 mA", "500 Ω"); });
  at("An ideal current source of 3 A feeds a resistor.", function(){ return fIsrc("3 A", "R"); });
  each(["In that circuit the voltage on 6 Ω is", "In that circuit the total power is"], s24);
  at("In that circuit the current in the 4 Ω resistor is", function(){ return fPar("12 V", ["4 Ω", "12 Ω"]); });
  each(["That circuit is on 8 V.", "In that circuit the voltage on the parallel part is"], sp8);
  each(["In Example 4.1 (E = 6 V, RS = 2 Ω, RL = 10 Ω) IL is", "In Example 4.1, after conversion the CDR gives IL =", "The same circuit converted: IS is", "After the conversion of that circuit, IL by CDR is"], ex41);
  at("Three 1.5 V cells in series, one turned around.", function(){ return cells(3, 1); });
  at("Three 1.5 V cells in series, all the same way.", function(){ return cells(3, -1); });
  at("Two cells of 1.5 V in series, one turned around.", function(){ return cells(2, 1); });
  at("2 A and 4 A both point up in parallel.", twoI("2 A", "4 A", "u", "u"));
  at("4 A up and 2 A down in parallel.", twoI("4 A", "2 A", "u", "d"));
  at("In the one-loop circuit of Example 4.3", function(){ return svg(rect(XL, XR, YT, YB, { l: [B("12 V", "u")], t: [Bc("4 V", "l", "t", 190)], r: [R_("ΣR = 10 Ω", YM, "l")], b: [Bc("2 V", "r", "b", 190)] })); });
  each(["In Example 4.4", "Example 4.4 has b = 3 and n = 2."], ex44);
  at("Practice problem (E₁ = 14 V, E₂ = 12 V)", function(){ return fTwoSrc("E₁ = 14 V", "E₂ = 12 V", "R₁", "R₂", "R₃"); });
  at("A 2 A source pushes current into node a.", function(){ return fNodeCkt("E", "R₁", "I_S = 2 A", "R₃", "u"); });
  at("Example 5.4. Three 12 Ω resistors are in parallel when E is shorted.", function(){ return fPar("", ["12 Ω", "12 Ω", "12 Ω"]); });
  each(["Example 5.1. E₁ = 48 V acts alone", "Example 5.1. I_c′ = 1 A", "Example 5.1. When E₂ acts alone"], ex51);
  each(["Book Table 5.1. V_S = 10 V and R_S = 30 Ω.", "Book Table 5.1. V_S = 10 V, R_S = 30 Ω."], t51);
  at("R_TH = 8 Ω. Which load gives the maximum power?", function(){ return figThevEq("V_TH", "R_TH = 8 Ω", "R_L = ?"); });
  at("Capacitors C₁ and C₂ are in series.", function(){ return fSer("", ["C₁", "C₂"], "cap"); });
  at("Capacitors in parallel. What is C_eq?", function(){ return fPar("", ["C₁", "C₂"], "cap"); });
  at("Inductors L₁ and L₂ are in series.", function(){ return fSer("", ["L₁", "L₂"], "ind"); });
  at("Two inductors L₁ and L₂ are in parallel.", function(){ return fPar("", ["L₁", "L₂"], "ind"); });
  at("Example 6.1. Q = 50 μC and C = 1000 pF.", function(){ return figCapLoop("V = ?", "C = 1000 pF"); });
  at("Example 6.5. C_eq = 450 μF on 60 V.", function(){ return figCapLoop("60 V", "C_eq = 450 μF"); });
  at("Example 6.8. E = 20 V, R = 45 Ω and R_w = 5 Ω.", function(){ return svg(rect(XL, XR, YT, YB, { l: [B("20 V")], t: [R_("R = 45 Ω", 150, "t")], r: [{ t: "ind", c: 66, lab: "L", side: "l" }, R_("R_w = 5 Ω", 112, "l", { len: 30 })] })); });
  at("Example 9.1. R = 1.5 Ω, X_L = 2.5 Ω, X_C = 3 Ω.", function(){ return svg(rect(XL, XR, YT, YB, { l: [{ t: "acs", c: YM, lab: "V", side: "r", off: 20 }], t: [R_("R = 1.5 Ω", 130, "t"), { t: "ind", c: 215, lab: "X_L = 2.5 Ω", side: "t" }], r: [{ t: "cap", c: YM, lab: "X_C = 3 Ω", side: "l" }] })); });
  at("Example 11.1. V_S = 125 V and I_S = 2 A.", function(){ return figXfmr("V_P", "N_P", "N_S", "V_S = 125 V", "I_S = 2 A"); });
  at("Example 11.2. N_S = 125 and N_P = 250.", function(){ return figXfmr("V_P", "N_P = 250", "N_S = 125", "load"); });
  at("Example 11.3. With n = 1/5", function(){ return fMatch2("R_S = 100 Ω", "R_L = 4 Ω", "n = 1/5"); });
  each(["How does a transformer pass energy", "Which coil is connected to the source?", "In an ideal transformer, how are the input and output power related?"], xfmr);
  each(["In the motor model, what represents the back EMF?", "Which equation gives the motor current?", "Where is the mechanical power of a PM motor largest?", "What is the motor efficiency?"], motor);
  each(["Motors file example. What is the stall torque?", "Motors file example. What is the current at stall?"], function(){ return figMotor("V_in", "R", "V_bemf = 0"); });
  return function(q){
    for (var i = 0; i < rules.length; i++){
      if (!rules[i][0].test(q)) continue;
      try { var f = rules[i][1](); if (f && !/NaN|undefined|null/.test(f)) return f; } catch (e) {}
    }
    return null;
  };
})();
