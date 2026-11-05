// ===== one topic list per chapter: the lesson titles. Every question, example and drawing gets one of these topics. =====
var TOPICMAP = (function(){
  function T(c, i){ return LESSONS[c][i].t; }
  var rx = function(r, s){ return r.test(s); };
  var map = {
    "1": {
      mcq: { "Circuit basics": 0, "Current": 1, "Voltage": 2, "Resistance": 3, "Conductance": 3, "Ohm's law": 4, "Colour code": 5 },
      gen: { "Current": 1, "Voltage": 2, "Ohm's law": 4, "Conductance": 3, "Colour code": 5 },
      bank: [0, 1, 1, 1, 2, 4, 4, 4, 5, 3],
      ex: { "1.1": 1, "1.3": 3, "P1": 1, "P2": 2, "P3": 3, "P4": 4, "P5": 5, "P6": 4 }
    },
    "2": {
      mcq: { "Power and energy": 0, "KVL": 1, "KCL": 2, "Circuit terms": 3, "Prefixes": 6, "Sources": function(m){ return rx(/current source|mA source|\bmA\b/, m.q) ? 5 : 4; } },
      gen: { "Power and energy": 0, "KVL": 1, "KCL": 2, "Real sources": function(g, id){ return id === "g2-10" ? 5 : 4; }, "Prefixes": 6 },
      bank: [0, 0, 1, 1, 1, 2, 2, 1, 4, 5],
      ex: { "2.1": 0, "2.6": 1, "2.12": 2, "P1": 0, "P2": 0, "P3": 1, "P4": 2, "P5": 4 }
    },
    "3": {
      mcq: { "Series circuit": 0, "Parallel circuit": 3, "Voltage divider": 1, "Ground": 2, "Parallel": 3, "Current divider": 4, "Series-parallel": 5 },
      gen: { "Series": 0, "Voltage divider": 1, "Ground": 2, "Parallel": 3, "Current divider": 4, "Series-parallel": 5 },
      bank: [0, 0, 1, 2, 0, 3, 3, 4, 4, 5],
      ex: { "3.1": 0, "3.2": 1, "3.5": 4, "P1": 0, "P2": 2, "P3": 3, "P4": 4, "P5": 5 }
    },
    "4": {
      mcq: { "Source conversion": 0, "Polarity": 1, "Sources in series": 2, "Parallel sources": 2, "Branch current": 3, "Current source in a circuit": 4 },
      gen: { "Source conversion": 0, "Parallel sources": 2, "Series sources": 2, "Branch current": 3 },
      bank: [0, 0, 0, 0, 2, 2, 2, 4, 3, 3],
      ex: { "4.1": 0, "4.2": 1, "4.4": 3, "P1": 0, "P2": 1, "P3": 2, "P4": 2, "P5": 3 }
    },
    "5": {
      mcq: { "Superposition": 0, "Thevenin": 1, "Norton": 2, "Maximum power": 3 },
      gen: { "Superposition": 0, "Thevenin": 1, "Norton": 2, "Maximum power": 3 },
      bank: [0, 1, 1, 1, 2, 2, 3, 3, 0],
      ex: { "5.1": 0, "5.4": 1, "5.6": 2, "P1": 0, "P2": 1, "P3": 2, "P4": 1, "P5": 3 }
    },
    "6": {
      mcq: { "Capacitor": function(m){ return rx(/series|parallel|C_eq|C₁/, m.q) ? 2 : rx(/what sets|gap|plate area|area|permittivity|dielectric|k =|8\.85/i, m.q) ? 1 : 0; },
             "Inductor": function(m){ return rx(/L_eq|series|parallel|L₁/, m.q) ? 4 : 3; }, "DC behaviour": 4 },
      gen: { "Charge and energy": 0, "Capacitance": 1, "Series and parallel": 2, "Inductor": function(g, id){ return id === "g6-10" ? 4 : 3; } },
      bank: [0, 1, 0, 2, 2, 2, 3, 4],
      ex: { "6.2": 1, "6.4": 2, "6.6": 2, "P1": 0, "P2": 1, "P3": 2, "P4": 3, "P5": 4 }
    },
    "8": {
      mcq: { "Sine wave": 0, "RMS value": 1, "Phase": 2, "Phasor": 3, "R, L, C": 4 },
      gen: { "Frequency": 0, "Instantaneous value": 0, "RMS value": 1, "Reactance": 4, "Phase": 2 },
      bank: [0, 0, 1, 2, 4, 4, 3],
      ex: { "P1": 0, "P2": 0, "P3": 2, "P4": 1, "P5": 0, "P6": 3, "P7": 4, "P8": 4, "8.1": 0, "8.2": 2, "8.3": 1, "8.4": 3, "8.5": 3, "8.9": 3, "8.10": 4, "8.11": 4, "8.12": 4 }
    },
    "9": {
      mcq: { "Impedance": function(m){ return rx(/series|parallel|divider|Z_T|KVL/, m.q) ? 1 : rx(/triangle|φ|angle|polar|rectangular/, m.q) ? 2 : 0; },
             "Power": function(m){ return rx(/PF|power factor|correct|capacitor|Example 9\.6|Slide 33|Q_C/i, m.q) ? 4 : 3; } },
      gen: { "Impedance": function(g, id){ return id === "g9-1" || id === "g9-2" ? 2 : id === "g9-4" ? 1 : 0; }, "Power": function(g, id){ return id === "g9-8" ? 4 : 3; }, "Power factor": 4 },
      bank: [0, 1, 1, 3, 4, 2, 3],
      ex: { "Slide 33": 4, "P1": 0, "P2": 0, "P3": 0, "P4": 1, "P5": 1, "P6": 3, "P7": 4, "9.1": 2, "9.3": 1, "9.4": 1, "9.5": 3, "9.6": 4 }
    },
    "11": {
      mcq: { "Transformer": 0, "Ideal transformer": 1, "Step-up and step-down": 2, "Transformer types": 3, "Impedance matching": 4 },
      gen: { "Ideal transformer": 1, "Step-up and step-down": 2, "Impedance matching": 4 },
      bank: [1, 1, 1, 2, 4, 2],
      ex: { "P1": 1, "P2": 1, "P3": 1, "P4": 1, "P5": 2, "P6": 2, "P7": 4, "P8": 3, "11.1": 1, "11.2": 2, "11.3": 4 }
    },
    "M": {
      mcq: { "DC motor basics": 0, "Motor types": 1, "Motor model": 2, "Torque and power": 3, "AC motors": 4 },
      gen: { "Motor model": 2, "Torque and power": 3 },
      bank: [2, 3, 3, 3, 1, 1],
      ex: { "File example": 3, "P7": 2, "P1": 2, "P2": 2, "P3": 3, "P4": 3, "P5": 3, "P6": 4 }
    }
  };
  var unmapped = [];
  function pick(c, v, a, b, tag){ var i = typeof v === "function" ? v(a, b) : v; if (i == null){ unmapped.push(c + ": " + tag); return null; } return T(c, i); }
  Object.keys(map).forEach(function(c){
    var m = map[c];
    (MCQ[c] || []).forEach(function(q){ q.sub = q.topic; if (LESSONS[c].some(function(l){ return l.t === q.topic; })) return; var t = pick(c, m.mcq[q.topic], q, null, q.topic); if (t) q.topic = t; else q.topic = T(c, 0); });
    (GENS[c] || []).forEach(function(g){ g.sub = g.topic; var t = pick(c, m.gen[g.topic], g, g.id, g.topic); if (t) g.topic = t; else g.topic = T(c, 0); });
    CHAPTERS[c].questions.forEach(function(q, i){ q.sub = q.tag; q.tag = T(c, m.bank[i] == null ? 0 : m.bank[i]); });
    (EXAMPLES[c] || []).forEach(function(e){ e.sub = e.topic; if (/^X\d+$/.test(e.id)) return; var i = m.ex[e.id]; e.topic = T(c, i == null ? 0 : i); });
  });
  map.unmapped = unmapped;
  return map;
})();
