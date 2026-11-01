// ===== sources: book page and slide numbers for lessons, examples and topics =====
// Book: Wang, Understandable Electric Circuits (IET 2010). Slides: the ME0212 chapter decks.
var LREF = {
  "The basic circuit": "Book §1.2, p. 4 · Slides 4–8", "Current": "Book §1.3, p. 8 · Slides 9–13", "Voltage": "Book §1.4, p. 10 · Slides 14–17",
  "Resistance and conductance": "Book §1.5.1–1.5.4, p. 14 · Slides 18–24", "Ohm's law": "Book §1.5.5–1.6, p. 17 · Slides 25–30", "Resistor colour code": "Slide 31",
  "Power and energy": "Book §2.1, p. 31 · Slides 2–11", "Kirchhoff's voltage law (KVL)": "Book §2.2, p. 36 · Slides 12–17", "Kirchhoff's current law (KCL)": "Book §2.3, p. 41 · Slides 18–23",
  "Node, branch, mesh, loop": "Book §2.3.6, p. 47 · Slides 24–25", "Real voltage source": "Book §2.4.1, p. 48 · Slides 26–29", "Current source": "Book §2.4.2, p. 50 · Slides 30–32", "Metric prefixes": "Book §2.5.2, p. 54 · Slides 33–34",
  "Series circuit": "Book §3.1.1, p. 63 · Slides 2–9", "Voltage-divider rule (VDR)": "Book §3.1.2, p. 67 · Slides 10–11", "Circuit ground": "Book §3.1.3, p. 70 · Slides 12–14",
  "Parallel circuit": "Book §3.2.1, p. 71 · Slides 15–20", "Current-divider rule (CDR)": "Book §3.2.2, p. 76 · Slides 21–24", "Series–parallel circuits": "Book §3.3, p. 79 · Slides 25–30",
  "Source conversion": "Book §4.1.1, p. 101 · Slides 2–7", "The polarity rule": "Book §4.1.1, p. 101 · Slides 2–3", "Sources in series and parallel": "Book §4.1.2, p. 104 · Slides 8–13",
  "Branch current analysis": "Book §4.2, p. 108 · Slides 14–19", "A circuit with a current source": "Book §4.2, Example 4.5, p. 112 · Slide 20",
  "Superposition theorem": "Book §5.1, p. 128 · Slides 2–10", "Thevenin's theorem": "Book §5.2, p. 133 · Slides 11–22", "Norton's theorem": "Book §5.2, p. 133 · Slides 11–22", "Maximum power transfer": "Book §5.3, p. 147 · Slide 23",
  "The capacitor": "Book §6.1, p. 164 · Slides 3–12, 18–19", "What sets the capacitance": "Book §6.1.6–6.1.8, p. 169 · Slides 13–15", "Capacitors in series and parallel": "Book §6.2, p. 174 · Slides 20–26",
  "The inductor": "Book §6.3, p. 179 · Slides 27–41", "DC behaviour and combinations": "Book §6.1.9, §6.3.4 and §6.4, p. 188 · Slides 16–17, 35, 42–45",
  "The sine wave": "Book §8.1, p. 227 · Slides 2–6, 11–12", "Average and RMS value": "Book §8.2.3–8.2.4, p. 236 · Slides 15–17", "Phase difference": "Book §8.1.5, p. 232 · Slides 7–10",
  "Complex numbers and phasors": "Book §8.3, p. 239 · Slides 18–28", "Resistor, inductor and capacitor in AC": "Book §8.4, p. 248 · Slides 29–37",
  "Impedance": "Book §9.1, p. 265 · Slides 2, 10–12", "Series and parallel impedances": "Book §9.2, p. 272 · Slides 3–9", "The impedance triangle": "Book §9.1.3, p. 267 · Slides 10–12",
  "Active, reactive and apparent power": "Book §9.3.1–9.3.5, p. 276 · Slides 13–21", "Power factor and its correction": "Book §9.3.6–9.3.7, p. 285 · Slides 22–33"
};
var EXP = { "1.1": 9, "1.3": 16, "1.4": 17, "2.1": 34, "2.2": 34, "2.3": 35, "2.4": 35, "2.5": 37, "2.6": 39, "2.7": 40, "2.8": 42, "2.9": 42, "2.10": 43, "2.11": 45, "2.12": 46, "2.13": 47, "2.14": 49,
  "3.1": 67, "3.2": 69, "3.3": 70, "3.4": 75, "3.5": 78, "3.6": 79, "4.1": 103, "4.2": 104, "4.3": 108, "4.4": 110, "4.5": 112,
  "5.1": 129, "5.2": 130, "5.4": 136, "5.5": 139, "5.6": 143, "5.7": 145, "6.1": 168, "6.2": 170, "6.3": 174, "6.4": 175, "6.5": 177, "6.6": 178, "6.8": 187, "6.9": 189, "6.10": 189,
  "8.1": 232, "8.2": 234, "8.3": 236, "8.11": 253, "8.12": 257, "9.1": 268, "9.3": 274, "9.5": 288, "9.6": 288, "11.1": 340, "11.2": 341, "11.3": 345 };
var TREF = {
  "1": { "Circuit basics": "The basic circuit", "Current": "Current", "Voltage": "Voltage", "Resistance": "Resistance and conductance", "Conductance": "Resistance and conductance", "Ohm's law": "Ohm's law", "Colour code": "Resistor colour code" },
  "2": { "Power and energy": "Power and energy", "KVL": "Kirchhoff's voltage law (KVL)", "KCL": "Kirchhoff's current law (KCL)", "Circuit terms": "Node, branch, mesh, loop", "Sources": "Real voltage source", "Real sources": "Real voltage source", "Prefixes": "Metric prefixes" },
  "3": { "Series circuit": "Series circuit", "Series": "Series circuit", "Voltage divider": "Voltage-divider rule (VDR)", "Ground": "Circuit ground", "Parallel circuit": "Parallel circuit", "Parallel": "Parallel circuit", "Current divider": "Current-divider rule (CDR)", "Series-parallel": "Series–parallel circuits" },
  "4": { "Source conversion": "Source conversion", "Polarity": "The polarity rule", "Sources in series": "Sources in series and parallel", "Series sources": "Sources in series and parallel", "Parallel sources": "Sources in series and parallel", "Branch current": "Branch current analysis", "Current source in a circuit": "A circuit with a current source" },
  "5": { "Superposition": "Superposition theorem", "Thevenin": "Thevenin's theorem", "Norton": "Norton's theorem", "Maximum power": "Maximum power transfer" },
  "6": { "Capacitor": "The capacitor", "Charge and energy": "The capacitor", "Capacitance": "What sets the capacitance", "Series and parallel": "Capacitors in series and parallel", "Inductor": "The inductor", "DC behaviour": "DC behaviour and combinations" },
  "8": { "Sine wave": "The sine wave", "Frequency": "The sine wave", "Instantaneous value": "The sine wave", "RMS value": "Average and RMS value", "Phase": "Phase difference", "Phasor": "Complex numbers and phasors", "R, L, C": "Resistor, inductor and capacitor in AC", "Reactance": "Resistor, inductor and capacitor in AC" },
  "9": { "Impedance": "Impedance", "Power": "Active, reactive and apparent power", "Power factor": "Power factor and its correction" }
};
var CHREF = { "1": "Book Chapter 1, p. 1 · Chapter 1 slides", "2": "Book Chapter 2, p. 31 · Chapter 2 slides", "3": "Book Chapter 3, p. 63 · Chapter 3 slides", "4": "Book Chapter 4, p. 101 · Chapter 4 slides", "5": "Book Chapter 5, p. 127 · Chapter 5 slides", "6": "Book Chapter 6, p. 163 · Chapter 6 slides", "8": "Book Chapter 8, p. 227 · Chapter 8 slides", "9": "Book Chapter 9, p. 265 · Chapter 9 slides" };
function srcOf(ch, topic, text){
  var m = /Example (\d+\.\d+)/.exec(text || "");
  if (m && EXP[m[1]]) return "Book Example " + m[1] + ", p. " + EXP[m[1]];
  if (/Slide 33/.test(text || "") && ch === "9") return "Slide 33 (Chapter 9)";
  var t = TREF[ch] && TREF[ch][topic];
  if (t && LREF[t]) return LREF[t];
  if (LREF[topic]) return LREF[topic];
  return CHREF[ch] || "";
}
