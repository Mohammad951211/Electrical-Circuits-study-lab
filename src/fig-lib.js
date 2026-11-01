  // ---------- tiny schematic library: draws every circuit as inline SVG ----------
  var XL = 82, XR = 300, YT = 38, YB = 128, YM = 83;

  function esc(s){ return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
  function lab(s){
    s = esc(s);
    var n = 0;
    s = s.replace(/_\{([^}]*)\}|_([A-Za-z]+|\d+)/g, function(m, a, b){
      n++;
      return '<tspan dy="3" font-size="9.5">' + (a || b) + '</tspan><tspan dy="-3">';
    });
    for (var i = 0; i < n; i++) s += "</tspan>";
    return s;
  }
  function rnd(n){ return Math.round(n * 10) / 10; }
  function pt(p){ return rnd(p[0]) + "," + rnd(p[1]); }

  var P = {};
  P.w = function(pts){ return '<polyline class="w" points="' + pts.map(pt).join(" ") + '"/>'; };
  P.dot = function(x, y){ return '<circle class="dot" cx="' + x + '" cy="' + y + '" r="3.3"/>'; };
  P.term = function(x, y){ return '<circle class="term" cx="' + x + '" cy="' + y + '" r="3.6"/>'; };
  P.t = function(x, y, s, anchor, cls){
    var lines = String(s).split("|");
    var out = '<text x="' + rnd(x) + '" y="' + rnd(y) + '" text-anchor="' + (anchor || "middle") + '"' + (cls ? ' class="' + cls + '"' : "") + ">";
    lines.forEach(function(l, i){
      out += '<tspan x="' + rnd(x) + '"' + (i ? ' dy="14"' : "") + ">" + lab(l) + "</tspan>";
    });
    return out + "</text>";
  };
  // label next to a centre point; side is where the label sits
  P.at = function(cx, cy, text, side, off, cls){
    off = off == null ? 14 : off;
    if (side === "t") return P.t(cx, cy - off, text, "middle", cls);
    if (side === "b") return P.t(cx, cy + off + 8, text, "middle", cls);
    if (side === "l") return P.t(cx - off, cy + 4, text, "end", cls);
    return P.t(cx + off, cy + 4, text, "start", cls);
  };
  P.head = function(x, y, ux, uy, s, cls){
    var nx = -uy, ny = ux;
    var b = [x - ux * s, y - uy * s];
    return '<polygon class="' + (cls || "arh") + '" points="' + pt([x, y]) + " " + pt([b[0] + nx * s * 0.5, b[1] + ny * s * 0.5]) + " " + pt([b[0] - nx * s * 0.5, b[1] - ny * s * 0.5]) + '"/>';
  };
  P.arr = function(x1, y1, x2, y2, label, lx, ly, anchor){
    var dx = x2 - x1, dy = y2 - y1, L = Math.sqrt(dx * dx + dy * dy), ux = dx / L, uy = dy / L;
    var s = '<line class="ar" x1="' + x1 + '" y1="' + y1 + '" x2="' + rnd(x2 - ux * 6) + '" y2="' + rnd(y2 - uy * 6) + '"/>' + P.head(x2, y2, ux, uy, 8);
    if (label) s += P.t(lx, ly, label, anchor || "middle", "acc");
    return s;
  };
  // resistor between two points; side = side of the label
  P.r = function(x1, y1, x2, y2, label, side, o){
    o = o || {};
    var dx = x2 - x1, dy = y2 - y1, L = Math.sqrt(dx * dx + dy * dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
    var B = o.body || 30, s = (L - B) / 2, a = 4.5, seq = [0, 1, -1, 1, -1, 1, 0];
    var pts = [[x1, y1]];
    for (var i = 0; i <= 6; i++){
      var d = s + B * i / 6;
      pts.push([x1 + ux * d + nx * seq[i] * a, y1 + uy * d + ny * seq[i] * a]);
    }
    pts.push([x2, y2]);
    var out = P.w(pts);
    var mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    if (label) out += P.at(mx, my, label, side || "t", o.off == null ? 12 : o.off);
    if (o.pm){
      var opp = { t: [0, 15], b: [0, -11], l: [14, 0], r: [-14, 0] }[side || "t"];
      out += P.t(x1 + ux * 4 + opp[0], y1 + uy * 4 + opp[1] + 4, "+", "middle", "sign");
      out += P.t(x2 - ux * 4 + opp[0], y2 - uy * 4 + opp[1] + 4, "−", "middle", "sign");
    }
    return out;
  };
  // battery: plus = absolute direction of the + terminal (u d l r); leads end 10 px from centre
  P.bat = function(x, y, plus, label, side, o){
    o = o || {};
    var d = { u: [0, -1], d: [0, 1], l: [-1, 0], r: [1, 0] }[plus], n = [-d[1], d[0]];
    function q(a, b){ return [x + d[0] * a + n[0] * b, y + d[1] * a + n[1] * b]; }
    function ln(p1, p2, cls){ return '<line class="' + cls + '" x1="' + rnd(p1[0]) + '" y1="' + rnd(p1[1]) + '" x2="' + rnd(p2[0]) + '" y2="' + rnd(p2[1]) + '"/>'; }
    var out = ln(q(3, -11), q(3, 11), "plate l") + ln(q(-3, -6), q(-3, 6), "plate s") + ln(q(10, 0), q(3, 0), "w") + ln(q(-3, 0), q(-10, 0), "w");
    side = side || "l";
    var opp = { t: [0, 15], b: [0, -11], l: [14, 0], r: [-14, 0] }[side];
    if (!o.nosign){
      out += P.t(x + d[0] * 11 + opp[0], y + d[1] * 11 + opp[1] + 4, "+", "middle", "sign");
      out += P.t(x - d[0] * 11 + opp[0], y - d[1] * 11 + opp[1] + 4, "−", "middle", "sign");
    }
    if (label) out += P.at(x, y, label, side, o.off == null ? 17 : o.off);
    return out;
  };
  P.isrc = function(x, y, dir, label, side){
    var d = { u: [0, -1], d: [0, 1], l: [-1, 0], r: [1, 0] }[dir];
    var out = '<circle class="meter" cx="' + x + '" cy="' + y + '" r="12"/>';
    out += '<line class="ar" x1="' + rnd(x - d[0] * 7) + '" y1="' + rnd(y - d[1] * 7) + '" x2="' + rnd(x + d[0] * 3) + '" y2="' + rnd(y + d[1] * 3) + '"/>';
    out += P.head(x + d[0] * 8, y + d[1] * 8, d[0], d[1], 7);
    if (label) out += P.at(x, y, label, side || "l", 17);
    return out;
  };
  P.m = function(x, y, ch){
    return '<circle class="meter" cx="' + x + '" cy="' + y + '" r="11"/><text class="mt" x="' + x + '" y="' + (y + 5) + '" text-anchor="middle">' + esc(ch) + "</text>";
  };
  P.lamp = function(x, y, dash){
    var c = dash ? "dead" : "w";
    return '<circle class="meter' + (dash ? " dashed" : "") + '" cx="' + x + '" cy="' + y + '" r="12"/><line class="' + c + '" x1="' + rnd(x - 8.5) + '" y1="' + rnd(y - 8.5) + '" x2="' + rnd(x + 8.5) + '" y2="' + rnd(y + 8.5) + '"/><line class="' + c + '" x1="' + rnd(x - 8.5) + '" y1="' + rnd(y + 8.5) + '" x2="' + rnd(x + 8.5) + '" y2="' + rnd(y - 8.5) + '"/>';
  };
  P.gnd = function(x, y){
    return P.w([[x, y], [x, y + 7]]) + P.w([[x - 9, y + 7], [x + 9, y + 7]]) + P.w([[x - 5.5, y + 11.5], [x + 5.5, y + 11.5]]) + P.w([[x - 2, y + 16], [x + 2, y + 16]]);
  };
  // dashed ring (supernode)
  P.ring = function(x, y, w, h){ return '<rect class="ring" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="14"/>'; };
  // circled number (mesh index)
  P.circ = function(x, y, n){ return '<circle class="mesh" cx="' + x + '" cy="' + y + '" r="9"/><text class="acc" x="' + x + '" y="' + (y + 4.5) + '" text-anchor="middle">' + n + "</text>"; };
  // open switch drawn between (x1,y) and (x2,y)
  P.sw = function(x1, x2, y){
    return P.dot(x1, y) + P.dot(x2, y) + '<line class="w" x1="' + x1 + '" y1="' + y + '" x2="' + (x2 - 8) + '" y2="' + (y - 16) + '"/>';
  };

  // capacitor (two plates), inductor (coil), AC source (sine in a circle); ux,uy = direction of the wire
  P.cap = function(x, y, ux, uy){
    var nx = -uy, ny = ux, a = 12;
    function ln(p, q, c){ return '<line class="' + c + '" x1="' + rnd(p[0]) + '" y1="' + rnd(p[1]) + '" x2="' + rnd(q[0]) + '" y2="' + rnd(q[1]) + '"/>'; }
    return ln([x - ux * 10, y - uy * 10], [x - ux * 3.5, y - uy * 3.5], "w") + ln([x + ux * 3.5, y + uy * 3.5], [x + ux * 10, y + uy * 10], "w") +
      ln([x - ux * 3.5 + nx * a, y - uy * 3.5 + ny * a], [x - ux * 3.5 - nx * a, y - uy * 3.5 - ny * a], "plate l") + ln([x + ux * 3.5 + nx * a, y + uy * 3.5 + ny * a], [x + ux * 3.5 - nx * a, y + uy * 3.5 - ny * a], "plate l");
  };
  P.ind = function(x, y, ux, uy){
    var nx = -uy, ny = ux, n = 4, step = 10, st = -n * step / 2, d = "M" + rnd(x + ux * (st - 10)) + " " + rnd(y + uy * (st - 10)) + " L" + rnd(x + ux * st) + " " + rnd(y + uy * st);
    for (var k = 0; k < n; k++){
      var a = st + k * step, b = a + step, cxp = x + ux * (a + b) / 2 - nx * 13, cyp = y + uy * (a + b) / 2 - ny * 13;
      d += " Q" + rnd(cxp) + " " + rnd(cyp) + " " + rnd(x + ux * b) + " " + rnd(y + uy * b);
    }
    d += " L" + rnd(x + ux * (st + n * step + 10)) + " " + rnd(y + uy * (st + n * step + 10));
    return '<path class="w" d="' + d + '"/>';
  };
  P.acs = function(x, y, ux, uy){
    var d = "M" + (x - 8) + " " + y + " q4 -9 8 0 t8 0";
    return '<circle class="meter" cx="' + x + '" cy="' + y + '" r="14"/><path class="w" d="' + d + '" transform="translate(-0 0)"/>' + '<line class="w" x1="' + rnd(x - ux * 14) + '" y1="' + rnd(y - uy * 14) + '" x2="' + rnd(x - ux * 22) + '" y2="' + rnd(y - uy * 22) + '"/>';
  };
  var EXTRA_HALF = { cap: 10, ind: 30, acs: 14 };
  var HALF = { r: 20, m: 11, lamp: 12, bat: 10, isrc: 12, sw: 35, cap: 10, ind: 30, acs: 14 };
  var DRAW = {
    r: function(it, cx, cy, ux, uy){
      var h = (it.len || 40) / 2;
      return P.r(cx - ux * h, cy - uy * h, cx + ux * h, cy + uy * h, it.lab, it.side, it);
    },
    m: function(it, cx, cy){ return P.m(cx, cy, it.ch) + (it.lab ? P.at(cx, cy, it.lab, it.side || "t", 16) : ""); },
    lamp: function(it, cx, cy){ return P.lamp(cx, cy, it.dash) + (it.lab ? P.at(cx, cy, it.lab, it.side || "r", 17) : ""); },
    bat: function(it, cx, cy){ return P.bat(cx, cy, it.plus, it.lab, it.side, it); },
    isrc: function(it, cx, cy){ return P.isrc(cx, cy, it.dir, it.lab, it.side); },
    sw: function(it, cx, cy, ux, uy){ return P.sw(cx - 35, cx + 35, cy); },
    cap: function(it, cx, cy, ux, uy){ return P.cap(cx, cy, ux, uy) + (it.lab ? P.at(cx, cy, it.lab, it.side || "t", 18) : ""); },
    ind: function(it, cx, cy, ux, uy){ return P.ind(cx, cy, ux, uy) + (it.lab ? P.at(cx, cy, it.lab, it.side || "t", 22) : ""); },
    acs: function(it, cx, cy, ux, uy){ return P.acs(cx, cy, ux, uy).replace(/<line[^>]*\/>$/, "") + (it.lab ? P.at(cx, cy, it.lab, it.side || "l", 22) : ""); }
  };
  // a straight wire from (x1,y1) to (x2,y2) carrying items; p = distance of an item's centre from the start
  function run(x1, y1, x2, y2, items){
    var dx = x2 - x1, dy = y2 - y1, L = Math.sqrt(dx * dx + dy * dy), ux = dx / L, uy = dy / L;
    var its = (items || []).slice().sort(function(a, b){ return a.p - b.p; });
    var out = "", cur = 0;
    its.forEach(function(it){
      var h = it.h || (it.t === "r" ? (it.len || 40) / 2 : HALF[it.t]);
      var s = it.p - h, e = it.p + h;
      if (s > cur) out += P.w([[x1 + ux * cur, y1 + uy * cur], [x1 + ux * s, y1 + uy * s]]);
      cur = e;
      out += DRAW[it.t](it, x1 + ux * it.p, y1 + uy * it.p, ux, uy);
    });
    if (cur < L) out += P.w([[x1 + ux * cur, y1 + uy * cur], [x2, y2]]);
    return out;
  }
  // items carry c = absolute coordinate along the wire they sit on
  function conv(items, f){
    return (items || []).map(function(it){
      var o = {};
      for (var k in it) o[k] = it[k];
      if (o.c != null) o.p = f(o.c);
      return o;
    });
  }
  function vrun(x, yt, yb, items){ return run(x, yt, x, yb, conv(items, function(c){ return c - yt; })); }
  function hrun(y, xa, xb, items){
    var sg = xb >= xa ? 1 : -1;
    return run(xa, y, xb, y, conv(items, function(c){ return sg * (c - xa); }));
  }
  // rectangular loop; s = { l, t, r, b } item lists
  function rect(xl, xr, yt, yb, s){
    s = s || {};
    return vrun(xl, yt, yb, s.l) + hrun(yt, xl, xr, s.t) + vrun(xr, yt, yb, s.r) + hrun(yb, xr, xl, s.b);
  }
  function dots(list){ return list.map(function(p){ return P.dot(p[0], p[1]); }).join(""); }
  // straight wire with an accent arrowhead part-way along (current direction)
  function edge(x1, y1, x2, y2, frac){
    var dx = x2 - x1, dy = y2 - y1, L = Math.sqrt(dx * dx + dy * dy), ux = dx / L, uy = dy / L;
    return P.w([[x1, y1], [x2, y2]]) + P.head(x1 + dx * frac + ux * 5, y1 + dy * frac + uy * 5, ux, uy, 9);
  }

  function svg(inner){
    return '<svg class="ckt" viewBox="0 0 360 160" role="img" aria-label="Circuit diagram" xmlns="http://www.w3.org/2000/svg">' + inner + "</svg>";
  }
