// ---- multiple-choice questions: a drawing is built from the numbers in the question text ----
// Rules are tried in order; the first rule that matches draws the circuit. Unknowns are shown as "?".
var MQ = (function(){
  var V = "([\\d.]+ ?[kM]?V)", Rs = "([\\d.]+ ?[kM]?Ω)", A_ = "([\\d.]+ ?[mμµk]?A)", Ls = "([\\d.]+ ?[mμµ]?H)", Cs = "([\\d.]+ ?[mμµnp]?F)";
  function re(s, f){ return [new RegExp(s), f]; }
  var W = { Two: 2, Three: 3, Four: 4, Five: 5 };
  function rep(n, x){ var l = []; for (var i = 0; i < n; i++) l.push(x); return l; }
  var rules = [
    // chapters 1 and 2: one source, one resistor
    re("^" + V + " is (?:applied to|across) " + Rs + "\\. ", function(m){ return fLoop(m[1], m[2], "I = ?"); }),
    re("^E = " + V + " and R = " + Rs + "\\. ", function(m){ return fLoop("E = " + m[1], "R = " + m[2], "I = ?"); }),
    re("^E = " + V + " across " + Rs + "\\.", function(m){ return fLoop("E = " + m[1], m[2], "I = ?"); }),
    re("^" + A_ + " flows through " + Rs, function(m){ return fLoop("E", m[2], m[1]); }),
    re("^" + V + " and " + A_ + "\\. ", function(m){ return fLoop(m[1], "R = ?", m[2]); }),
    re("^A " + V + " lamp carries " + A_, function(m){ return svg(rect(XL, XR, YT, YB, { l: [B(m[1])], r: [{ t: "lamp", c: YM }] }) + P.arr(150, 26, 200, 26, m[2], 175, 20)); }),
    re("^A circuit has E = " + V + " and a load of " + Rs, function(m){ return fLoop("E = " + m[1], "R = " + m[2], "I = ?"); }),
    re("^A " + Rs + " resistor carries " + A_ + "\\.", function(m){ return fLoop("E", m[1], m[2]); }),
    // series
    re("^" + Rs + ", " + Rs + " and " + Rs + " are in series on " + V, function(m){ return fSer(m[4], [m[1], m[2], m[3]]); }),
    re("^" + Rs + ", " + Rs + " and " + Rs + " are in series", function(m){ return fSer("E", [m[1], m[2], m[3]]); }),
    re("^" + V + " is across " + Rs + " and " + Rs + " in series", function(m){ return fSer(m[1], [m[2], m[3]]); }),
    re("^E = " + V + " on " + Rs + ", " + Rs + " and " + Rs, function(m){ return fSer("E = " + m[1], [m[2], m[3], m[4]]); }),
    re("^" + V + " across " + Rs + " and " + Rs + "\\.", function(m){ return fSer(m[1], [m[2], m[3]]); }),
    re("^E = " + V + " with drops of " + V + " and " + V + " in series", function(m){ return fSer("E = " + m[1], ["V₁ = " + m[2], "V₂ = " + m[3]]); }),
    re("^A loop has E = " + V + " and a drop of " + V, function(m){ return fSer("E = " + m[1], ["V₁ = " + m[2], "V₂ = ?"]); }),
    // parallel
    re("^" + Rs + " in parallel with " + Rs + " gives", function(m){ return fPar("", [m[1], m[2]]); }),
    re("^(Two|Three|Four|Five) " + Rs + " (?:resistors )?in parallel", function(m){ return fPar("", rep(W[m[1]], m[2])); }),
    re("^" + Rs + ", " + Rs + " and " + Rs + " in parallel", function(m){ return fPar("", [m[1], m[2], m[3]]); }),
    re("^" + V + " is across " + Rs + " in parallel with " + Rs, function(m){ return fPar(m[1], [m[2], m[3]]); }),
    re("^" + A_ + " enters " + Rs + " ∥ " + Rs, function(m){ return fPar(m[1], [m[2], m[3]]); }),
    re("^IT = " + A_ + " splits in " + Rs + ", " + Rs + " and " + Rs, function(m){ return fPar("I_T = " + m[1], [m[2], m[3], m[4]]); }),
    re("^R₁ = " + Rs + ", IT = " + A_ + " and I₂ = " + A_, function(m){ return fPar("I_T = " + m[2], ["R₁ = " + m[1], "R₂ = ?"]); }),
    re("^" + Rs + " in series with \\(" + Rs + " ∥ " + Rs + "\\)", function(m){ return fSP("", m[1], m[2], m[3]); }),
    // nodes
    re("^" + A_ + " and " + A_ + " enter a node\\. " + A_ + " and " + A_ + " leave in two wires", function(m){ return fNode([[m[1], "in"], [m[2], "in"], [m[3], "out"], [m[4], "out"], ["I = ?", "out"]]); }),
    re("^" + A_ + " and " + A_ + " enter a node\\. One wire leaves", function(m){ return fNode([[m[1], "in"], [m[2], "in"], ["I = ?", "out"]]); }),
    re("^" + A_ + " enters a node and " + A_ + " leaves", function(m){ return fNode([[m[1], "in"], [m[2], "out"], ["I = ?", "out"]]); }),
    // real and ideal sources
    re("^VS = " + V + ", RS = " + Rs + " and RL = " + Rs, function(m){ return fReal("V_S = " + m[1], "R_S = " + m[2], "R_L = " + m[3]); }),
    re("^" + V + " with RS = " + Rs + " feeds " + Rs, function(m){ return fReal(m[1], "R_S = " + m[2], "R_L = " + m[3]); }),
    re("^E = " + V + " and RS = " + Rs + "\\. ", function(m){ return fReal("E = " + m[1], "R_S = " + m[2], null, true); }),
    re("^E = " + V + " with R_S = " + Rs, function(m){ return fReal("E = " + m[1], "R_S = " + m[2], null, true); }),
    re("^An ideal " + A_ + " source feeds " + Rs, function(m){ return fIsrc(m[1], m[2]); }),
    re("^An ideal current source of " + A_ + " feeds " + Rs, function(m){ return fIsrc(m[1], m[2]); }),
    re("^A real current source has I_S = " + A_ + " and R_P = " + Rs, function(m){ return fIsrc("I_S = " + m[1], "R_P = " + m[2]); }),
    re("^IS = " + A_ + " and RS = " + Rs + "\\. ", function(m){ return fIsrc("I_S = " + m[1], "R_S = " + m[2]); }),
    re("^" + A_ + " with " + Rs + " converts", function(m){ return fIsrc(m[1], m[2]); }),
    re("^A current source of " + A_ + " in parallel with " + Rs, function(m){ return fIsrc(m[1], m[2]); }),
    re("^A voltage source of " + V + " with " + Rs + " in series", function(m){ return fReal(m[1], m[2], null, true); }),
    // Thevenin and Norton
    re("^V_TH = " + V + " and R_TH = " + Rs + "\\. R_L = " + Rs, function(m){ return figThevEq("V_TH = " + m[1], "R_TH = " + m[2], "R_L = " + m[3]); }),
    re("^V_TH = " + V + " and R_TH = " + Rs + "\\. What is the current in R_L = " + Rs, function(m){ return figThevEq("V_TH = " + m[1], "R_TH = " + m[2], "R_L = " + m[3]); }),
    re("^V_TH = " + V + " and R_TH = " + Rs, function(m){ return figThevEq("V_TH = " + m[1], "R_TH = " + m[2], "R_L"); }),
    re("^I_N = " + A_ + ", R_N = " + Rs + ", R_L = " + Rs, function(m){ return figNorton("I_N = " + m[1], "R_N = " + m[2], "R_L = " + m[3]); }),
    re("^A Norton equivalent has I_N = " + A_ + " and R_N = " + Rs, function(m){ return figNorton("I_N = " + m[1], "R_N = " + m[2], "R_L"); }),
    // capacitors and inductors
    re("^A " + Cs + " capacitor is charged to " + V, function(m){ return figCapLoop(m[2], m[1]); }),
    re("^(Two|Three|Four|Five) equal capacitors of " + Cs + " are in series", function(m){ return fSer("", rep(W[m[1]], m[2]), "cap"); }),
    re("^(Two|Three|Four|Five) " + Cs + " capacitors are in parallel", function(m){ return fPar("", rep(W[m[1]], m[2]), "cap"); }),
    re("^Two inductors of " + Ls + " and " + Ls + " are in parallel", function(m){ return fPar("", [m[1], m[2]], "ind"); }),
    // AC
    re("^Two impedances " + Rs + " and j(\\d+) Ω are in series", function(m){ return fACser("V", [["r", "Z₁ = " + m[1]], ["ind", "Z₂ = j" + m[2] + " Ω"]]); }),
    // transformer
    re("^n = ([\\d.]+)\\. V_P = " + V, function(m){ return figXfmr("V_P = " + m[2], "N_P", "N_S", "load"); }),
    re("^n = ([\\d.]+)\\. I_P = " + A_, function(m){ return figXfmr("V_P", "N_P", "N_S", "load", "I_P = " + m[2]); }),
    re("^n = ([\\d.]+) and Z_L = " + Rs, function(m){ return figXfmr("V_P", "N_P", "N_S", "Z_L = " + m[2]); }),
    re("^Example 11\\.3\\. R_S = " + Rs + " and the speaker is " + Rs, function(m){ return fMatch2("R_S = " + m[1], "R_L = " + m[2], "n = ?"); })
  ];
  return function(q){
    for (var i = 0; i < rules.length; i++){
      var m = rules[i][0].exec(q); if (!m) continue;
      try { var f = rules[i][1](m); if (f && !/NaN|undefined|null/.test(f)) return f; } catch (e) {}
    }
    return null;
  };
})();
