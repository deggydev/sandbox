// Paper Cutout prop library.
// Every prop is a flat, cut-paper SVG drawn in its own viewBox and anchored at
// its bottom centre. A prop is a function (options) => { w, h, svg }.
// Options every prop accepts: color (main colour), plus the prop-specific ones
// listed in references/props.md. Parts with class "spin", "sway", "bob",
// "flap" or "steam" are animated by papercut.css from the film clock.
(() => {
  const P = {
    cream: '#FBF7EE', paper: '#F3EEE2', ink: '#2A3550', navy: '#27406E', red: '#E25B4B', coral: '#F08A74',
    mustard: '#EDB33F', sun: '#F3B63E', teal: '#2E8C7C', mint: '#8FD0B5', green: '#5FAE55', leaf: '#6DB85C',
    dark: '#3D7D43', brown: '#A8744A', bark: '#8C5F3C', soil: '#8B5B3A', sky: '#BFE0EE', pink: '#F2A7B5',
    lilac: '#B9A6E0', grey: '#B8B6AE', white: '#FFFFFF', skin: '#F2C9A0', hair: '#3A2E2A', blue: '#4C86C6',
  };

  function hexToRgb(h) {
    const s = h.replace('#', '');
    const n = parseInt(s.length === 3 ? s.split('').map((c) => c + c).join('') : s, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function shade(hex, amt) {
    // amt > 0 lightens towards white, amt < 0 darkens towards black
    if (!/^#[0-9a-f]{3,6}$/i.test(hex)) return hex;
    const [r, g, b] = hexToRgb(hex);
    const t = amt < 0 ? 0 : 255;
    const p = Math.abs(amt);
    const m = (c) => Math.round(c + (t - c) * p);
    return `#${[m(r), m(g), m(b)].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
  }
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const circ = (cx, cy, r, f, extra = '') => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}" ${extra}/>`;
  const ell = (cx, cy, rx, ry, f, extra = '') => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}" ${extra}/>`;
  const rect = (x, y, w, h, f, rx = 0, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}" ${extra}/>`;
  const path = (d, f, extra = '') => `<path d="${d}" fill="${f}" ${extra}/>`;
  const line = (d, s, w = 4, extra = '') => `<path d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
  const txt = (x, y, s, size, f, weight = 900) =>
    `<text x="${x}" y="${y}" font-family="Nunito, 'PingFang SC', sans-serif" font-weight="${weight}" font-size="${size}" fill="${f}" text-anchor="middle" dominant-baseline="middle">${esc(s)}</text>`;
  const g = (cls, origin, body) => `<g class="${cls}" style="transform-origin:${origin}">${body}</g>`;

  const PROPS = {
    // ---------------- nature ----------------
    tree(o) {
      const c = o.color || P.leaf;
      const fruit = o.fruit ? (o.fruit === true ? P.red : o.fruit) : null;
      let fruits = '';
      if (fruit) for (const [x, y] of [[62, 120], [118, 74], [150, 142], [96, 150], [138, 104], [70, 84]]) fruits += circ(x, y, 7, fruit) + circ(x - 2, y - 2, 2.2, shade(fruit, 0.4));
      return {
        w: 200, h: 300,
        svg: path('M92 300 L95 170 Q80 150 66 142 L70 136 Q88 146 97 158 L99 120 L105 120 L106 160 Q118 140 134 134 L137 140 Q120 150 109 172 L112 300 Z', P.bark) +
          path('M100 300 L104 172 L112 300 Z', shade(P.bark, -0.15)) +
          g('sway', '100px 290px',
            circ(100, 104, 74, shade(c, -0.12)) + circ(54, 140, 50, shade(c, -0.16)) + circ(148, 136, 52, shade(c, -0.14)) +
            circ(100, 96, 70, c) + circ(58, 128, 46, c) + circ(144, 124, 48, c) +
            circ(84, 70, 30, shade(c, 0.18)) + circ(128, 92, 18, shade(c, 0.18)) + fruits),
      };
    },
    pine(o) {
      const c = o.color || P.dark;
      return {
        w: 140, h: 300,
        svg: rect(62, 240, 16, 60, P.bark) +
          g('sway', '70px 290px',
            path('M70 120 L130 250 L10 250 Z', c) + path('M70 120 L130 250 L70 250 Z', shade(c, -0.15)) +
            path('M70 60 L120 180 L20 180 Z', shade(c, 0.08)) + path('M70 60 L120 180 L70 180 Z', shade(c, -0.08)) +
            path('M70 6 L108 110 L32 110 Z', shade(c, 0.16)) + path('M70 6 L108 110 L70 110 Z', c)),
      };
    },
    bush(o) {
      const c = o.color || P.green;
      return {
        w: 200, h: 110,
        svg: path('M10 110 Q8 70 48 64 Q60 22 104 26 Q146 20 158 60 Q194 66 190 110 Z', shade(c, -0.12)) +
          circ(60, 74, 34, c) + circ(104, 56, 38, c) + circ(148, 76, 32, c) + circ(92, 44, 14, shade(c, 0.2)),
      };
    },
    flower(o) {
      const c = o.color || P.coral;
      let petals = '';
      for (let k = 0; k < 6; k += 1) {
        const a = (k / 6) * Math.PI * 2;
        petals += circ(30 + Math.cos(a) * 14, 30 + Math.sin(a) * 14, 12, k % 2 ? c : shade(c, -0.08));
      }
      return {
        w: 60, h: 160,
        svg: line('M30 160 Q26 110 30 40', P.dark, 5) + ell(18, 118, 14, 6, P.green, 'transform="rotate(-30 18 118)"') +
          ell(42, 96, 14, 6, P.leaf, 'transform="rotate(30 42 96)"') + g('sway', '30px 150px', petals + circ(30, 30, 9, P.mustard)),
      };
    },
    tulip(o) {
      const c = o.color || P.red;
      return {
        w: 60, h: 150,
        svg: line('M30 150 Q32 100 30 50', P.dark, 5) + path('M30 140 Q8 110 14 82 Q30 104 30 140 Z', P.leaf) +
          g('sway', '30px 140px', path('M12 22 L20 34 L30 14 L40 34 L48 22 Q52 56 30 60 Q8 56 12 22 Z', c) + path('M30 14 L40 34 L48 22 Q52 56 30 60 Z', shade(c, -0.12))),
      };
    },
    sprout(o) {
      const c = o.color || P.leaf;
      return {
        w: 220, h: 260,
        svg: path('M40 260 Q50 222 110 218 Q170 222 180 260 Z', P.soil) + path('M70 236 Q110 226 150 238', 'none', `stroke="${shade(P.soil, -0.2)}" stroke-width="4" stroke-linecap="round"`) +
          g('sway', '110px 230px',
            line('M110 228 Q104 160 112 70', P.dark, 7) +
            path('M110 110 Q60 120 40 70 Q90 50 110 110 Z', c) + path('M110 110 Q70 100 46 74 Q88 64 110 110 Z', shade(c, 0.15)) +
            path('M112 80 Q150 30 196 46 Q178 100 112 80 Z', shade(c, -0.08)) + path('M112 80 Q150 50 190 50 Q176 86 112 80 Z', c)),
      };
    },
    grass(o) {
      const c = o.color || P.dark;
      return {
        w: 120, h: 80,
        svg: path('M10 80 Q20 40 6 6 Q34 40 34 80 Z', shade(c, 0.1)) + path('M30 80 Q46 30 40 0 Q64 40 56 80 Z', c) +
          path('M50 80 Q70 36 96 14 Q80 50 78 80 Z', shade(c, -0.1)) + path('M74 80 Q96 50 116 40 Q100 62 100 80 Z', shade(c, 0.15)),
      };
    },
    mushroom(o) {
      const c = o.color || P.red;
      return {
        w: 90, h: 90,
        svg: path('M34 90 Q30 60 36 48 L56 48 Q62 60 58 90 Z', P.cream) + path('M4 50 Q8 6 46 4 Q84 6 86 50 Z', c) +
          circ(28, 28, 6, P.white) + circ(52, 18, 5, P.white) + circ(66, 36, 6, P.white),
      };
    },
    rock(o) {
      const c = o.color || P.grey;
      return { w: 140, h: 70, svg: path('M6 70 L22 30 L60 10 L102 16 L132 44 L136 70 Z', c) + path('M60 10 L102 16 L132 44 L84 40 Z', shade(c, 0.25)) };
    },
    sunflower(o) {
      const c = o.color || P.mustard;
      let petals = '';
      for (let k = 0; k < 12; k += 1) petals += ell(45, 22, 8, 18, k % 2 ? c : shade(c, -0.1), `transform="rotate(${k * 30} 45 45)"`);
      return {
        w: 90, h: 260,
        svg: line('M45 260 Q40 160 45 60', P.dark, 7) + path('M45 190 Q10 180 6 150 Q40 150 45 190 Z', P.leaf) + path('M45 150 Q80 140 86 110 Q52 112 45 150 Z', P.green) +
          g('sway', '45px 240px', petals + circ(45, 45, 17, P.bark) + circ(41, 41, 6, shade(P.bark, 0.2))),
      };
    },
    wheat(o) {
      const c = o.color || P.mustard;
      let s = '';
      for (const [x, top, tilt] of [[40, 30, -8], [62, 10, 0], [84, 34, 8]]) {
        let grains = '';
        for (let k = 0; k < 6; k += 1) grains += ell(x - 7, top + 12 + k * 14, 6, 10, c, `transform="rotate(-25 ${x - 7} ${top + 12 + k * 14})"`) + ell(x + 7, top + 12 + k * 14, 6, 10, shade(c, -0.1), `transform="rotate(25 ${x + 7} ${top + 12 + k * 14})"`);
        s += g('sway', `${x}px 220px`, `<g transform="rotate(${tilt} ${x} 220)">${line(`M${x} 220 L${x} ${top + 90}`, shade(c, -0.25), 4)}${grains}</g>`);
      }
      return { w: 120, h: 220, svg: s };
    },
    pot(o) {
      const c = o.color || P.coral;
      return {
        w: 90, h: 140,
        svg: g('sway', '45px 80px', path('M45 82 Q16 60 18 22 Q44 38 45 82 Z', P.leaf) + path('M45 82 Q72 54 74 14 Q46 34 45 82 Z', P.green) + path('M45 82 Q40 40 50 8 Q58 46 45 82 Z', shade(P.leaf, 0.15))) +
          path('M14 80 L76 80 L68 140 L22 140 Z', c) + rect(10, 74, 70, 16, shade(c, -0.12), 4),
      };
    },
    // ---------------- people ----------------
    person(o) {
      const body = o.color || P.navy;
      const skin = o.skin || P.skin;
      const hair = o.hair || P.hair;
      const wave = o.pose === 'wave';
      const hat = o.hat
        ? path('M10 40 Q12 8 35 6 Q58 8 60 40 Z', o.hat === true ? P.mustard : o.hat) + rect(4, 36, 62, 8, shade(o.hat === true ? P.mustard : o.hat, -0.12), 4)
        : path('M12 36 Q12 8 35 8 Q60 8 58 36 Q50 22 35 22 Q20 22 12 36 Z', hair);
      const arm = wave
        ? g('wave', '58px 82px', path('M54 84 L74 30 Q80 24 84 32 L66 90 Z', body) + circ(80, 26, 7, skin))
        : path('M56 80 Q70 110 64 140 L56 138 Q60 112 50 90 Z', shade(body, -0.12));
      const scarf = o.scarf ? g('sway', '35px 66px', path('M18 64 Q35 74 54 64 L56 74 Q35 84 16 74 Z', o.scarf === true ? P.mustard : o.scarf) + path('M48 70 Q78 70 88 84 Q72 88 46 80 Z', o.scarf === true ? P.mustard : o.scarf)) : '';
      return {
        w: 90, h: 200,
        svg: path('M14 200 L14 90 Q14 64 35 64 Q56 64 56 90 L56 200 Z', body) + path('M35 64 Q56 64 56 90 L56 200 L35 200 Z', shade(body, -0.1)) +
          circ(35, 36, 26, skin) + hat + arm + circ(27, 40, 2.5, P.ink) + circ(43, 40, 2.5, P.ink) + scarf,
      };
    },
    // ---------------- buildings ----------------
    house(o) {
      const wall = o.color || '#F6D9B8';
      const roof = o.roof || P.red;
      return {
        w: 260, h: 240,
        svg: rect(176, 30, 24, 60, shade(roof, -0.25)) + rect(30, 110, 200, 130, wall) + rect(130, 110, 100, 130, shade(wall, -0.06)) +
          path('M10 120 L130 20 L250 120 Z', roof) + path('M130 20 L250 120 L130 120 Z', shade(roof, -0.12)) +
          rect(108, 160, 44, 80, P.navy, 6) + circ(144, 202, 3, P.mustard) +
          rect(50, 140, 42, 42, P.mustard, 4) + rect(168, 140, 42, 42, P.mustard, 4) +
          line('M71 140 V182 M50 161 H92 M189 140 V182 M168 161 H210', wall, 4),
      };
    },
    shop(o) {
      const wall = o.color || P.cream;
      const awn = o.awning || P.red;
      let stripes = '';
      for (let k = 0; k < 7; k += 1) stripes += path(`M${20 + k * 37} 112 h37 v22 a18.5 18.5 0 0 1 -37 0 Z`, k % 2 ? P.white : awn);
      return {
        w: 300, h: 270,
        svg: rect(30, 60, 240, 210, wall) + rect(150, 60, 120, 210, shade(wall, -0.05)) + rect(20, 50, 260, 16, shade(awn, -0.2), 4) +
          rect(60, 66, 180, 40, P.navy, 6) + (o.text ? txt(150, 87, o.text, 24, P.white) : '') + stripes +
          rect(48, 166, 110, 76, P.sky, 4) + line('M103 166 V242', P.white, 4) + rect(186, 166, 60, 104, P.navy, 6) + circ(196, 220, 3, P.mustard) +
          rect(52, 226, 102, 12, shade(P.bark, 0.1), 3),
      };
    },
    barn(o) {
      const c = o.color || P.red;
      return {
        w: 260, h: 230,
        svg: path('M20 100 L130 20 L240 100 L240 230 L20 230 Z', c) + path('M130 20 L240 100 L240 230 L130 230 Z', shade(c, -0.1)) +
          rect(80, 130, 100, 100, P.cream) + line('M80 130 L180 230 M180 130 L80 230', c, 8) + rect(110, 60, 40, 34, P.cream, 4) +
          path('M14 104 L130 16 L246 104', 'none', `stroke="${P.cream}" stroke-width="8" stroke-linejoin="round"`),
      };
    },
    greenhouse(o) {
      const c = o.color || P.teal;
      return {
        w: 300, h: 200,
        svg: path('M20 200 Q20 30 150 26 Q280 30 280 200 Z', shade(P.mint, 0.45), 'opacity="0.95"') + circ(90, 170, 26, P.leaf) + circ(150, 160, 34, P.green) + circ(210, 172, 24, P.leaf) +
          line('M20 200 Q20 30 150 26 Q280 30 280 200 Z M85 200 Q80 60 150 26 M215 200 Q220 60 150 26 M150 26 V200 M24 130 H276 M34 76 H266', c, 5),
      };
    },
    stall(o) {
      const c = o.color || P.red;
      let stripes = '';
      for (let k = 0; k < 6; k += 1) stripes += path(`M${30 + k * 40} 100 L${70 + k * 40} 100 L${70 + k * 40} 120 Q${50 + k * 40} 136 ${30 + k * 40} 120 Z`, k % 2 ? P.white : c);
      return {
        w: 300, h: 300,
        svg: line('M40 110 V300 M260 110 V300', P.bark, 8) + path('M30 100 Q150 10 270 100 Z', c) + path('M150 30 Q210 50 270 100 L150 100 Z', shade(c, -0.1)) + stripes +
          rect(30, 200, 240, 100, P.cream) + rect(30, 200, 240, 14, shade(P.cream, -0.1)) + circ(80, 186, 16, P.red) + circ(116, 188, 14, P.mustard) + circ(150, 186, 16, P.leaf) +
          (o.text ? txt(150, 256, o.text, 30, P.navy) : ''),
      };
    },
    bunting(o) {
      const cols = o.colors || [P.red, P.mustard, P.teal, P.coral, P.navy, P.leaf];
      const w = o.span || 420;
      let flags = '';
      const n = Math.round(w / 46);
      for (let k = 0; k < n; k += 1) {
        const x = 10 + (k + 0.5) * ((w - 20) / n);
        const y = 14 + Math.sin(((k + 0.5) / n) * Math.PI) * 36;
        flags += path(`M${x - 15} ${y} L${x + 15} ${y + 2} L${x} ${y + 34} Z`, cols[k % cols.length]);
      }
      return { w, h: 90, svg: `<path d="M10 12 Q${w / 2} 92 ${w - 10} 12" fill="none" stroke="${P.ink}" stroke-width="2.5"/>` + flags };
    },
    windmill(o) {
      const c = o.color || P.cream;
      let blades = '';
      for (let k = 0; k < 4; k += 1) blades += `<g transform="rotate(${k * 90} 100 100)">${rect(94, 10, 12, 90, P.bark)}${rect(106, 14, 34, 76, "#F6E7B8", 3)}</g>`;
      return {
        w: 200, h: 340,
        svg: path('M64 340 L80 120 L120 120 L136 340 Z', c) + path('M100 120 L120 120 L136 340 L100 340 Z', shade(c, -0.08)) + path('M70 124 L100 84 L130 124 Z', P.red) + rect(88, 280, 24, 60, P.navy, 10) +
          g('spin', '100px 100px', blades) + circ(100, 100, 10, P.navy),
      };
    },
    lighthouse(o) {
      const c = o.color || P.red;
      return {
        w: 140, h: 340,
        svg: path('M40 340 L52 90 L88 90 L100 340 Z', P.white) + path('M45 250 L95 250 L98 300 L42 300 Z', c) + path('M48 160 L92 160 L94 200 L46 200 Z', c) +
          rect(46, 70, 48, 22, P.navy) + rect(52, 40, 36, 32, P.mustard, 4) + path('M48 42 L70 18 L92 42 Z', c) + rect(30, 330, 80, 10, P.grey, 4),
      };
    },
    camp(o) {
      const c = o.color || P.mustard;
      return { w: 240, h: 150, svg: path('M10 150 L120 10 L230 150 Z', c) + path('M120 10 L230 150 L120 150 Z', shade(c, -0.15)) + path('M120 60 L150 150 L90 150 Z', P.navy) };
    },
    fence(o) {
      const c = o.color || P.cream;
      let s = rect(0, 30, o.span || 300, 12, shade(c, -0.08)) + rect(0, 62, o.span || 300, 12, shade(c, -0.08));
      for (let x = 6; x < (o.span || 300) - 20; x += 44) s += path(`M${x} 90 V18 L${x + 13} 4 L${x + 26} 18 V90 Z`, c);
      return { w: o.span || 300, h: 90, svg: s };
    },
    // ---------------- vehicles ----------------
    bicycle(o) {
      const c = o.color || P.teal;
      const wheel = (x) => g('spin', `${x}px 90px`, circ(x, 90, 30, 'none', `stroke="${P.ink}" stroke-width="7"`) + line(`M${x - 30} 90 H${x + 30} M${x} 60 V120`, P.grey, 3)) + circ(x, 90, 5, P.ink);
      return {
        w: 200, h: 130,
        svg: wheel(48) + wheel(152) + line('M48 90 L86 40 L136 40 L152 90 M86 40 L100 90 L48 90 M100 90 L136 40', c, 7) + line('M80 28 L98 28 M136 40 L130 22 L146 18', P.ink, 6) + (o.basket ? rect(140, 44, 44, 28, P.bark, 4) : ''),
      };
    },
    car(o) {
      const c = o.color || P.red;
      const wheel = (x) => g('spin', `${x}px 100px`, circ(x, 100, 22, P.ink) + rect(x - 3, 82, 6, 36, P.grey)) + circ(x, 100, 8, P.grey);
      return {
        w: 240, h: 124,
        svg: path('M10 100 L14 64 Q20 52 40 50 L70 20 Q80 12 96 12 L160 12 Q176 12 186 24 L208 50 Q230 54 232 72 L232 100 Z', c) + path('M84 24 L120 24 L120 52 L64 52 Z', P.sky) + path('M130 24 L170 24 L194 52 L130 52 Z', P.sky) + wheel(62) + wheel(184),
      };
    },
    boat(o) {
      const c = o.color || P.navy;
      return {
        w: 220, h: 210,
        svg: g('bob', '110px 180px', line('M110 176 V20', P.bark, 6) + path('M114 24 L196 150 L114 150 Z', P.white) + path('M106 44 L40 150 L106 150 Z', P.coral) + path('M10 160 L210 160 L180 206 L40 206 Z', c) + rect(10, 156, 200, 10, shade(c, 0.2), 3)),
      };
    },
    // ---------------- sky things ----------------
    kite(o) {
      const c = o.color || P.red;
      return { w: 160, h: 300, svg: g('bob', '80px 80px', path('M80 4 L140 70 L80 150 L20 70 Z', c) + path('M80 4 L140 70 L80 70 Z', shade(c, 0.25)) + path('M80 70 L20 70 L80 150 Z', shade(c, -0.12)) + line('M80 150 Q60 200 90 240 Q110 270 80 300', P.ink, 2.5)) };
    },
    balloon(o) {
      const c = o.color || P.red;
      return { w: 100, h: 250, svg: g('bob', '50px 60px', ell(50, 56, 44, 54, c) + ell(36, 38, 10, 16, shade(c, 0.3)) + path('M42 108 L58 108 L50 120 Z', shade(c, -0.15)) + line('M50 118 Q40 170 56 200 Q64 230 50 250', P.ink, 2.5)) };
    },
    butterfly(o) {
      const c = o.color || P.coral;
      return { w: 90, h: 70, svg: g('flap', '45px 35px', ell(26, 24, 20, 18, c) + ell(64, 24, 20, 18, c) + ell(30, 50, 14, 12, shade(c, -0.12)) + ell(60, 50, 14, 12, shade(c, -0.12))) + rect(42, 14, 6, 46, P.ink, 3) };
    },
    bird(o) {
      const c = o.color || P.navy;
      return { w: 60, h: 30, svg: g('flap', '30px 20px', line('M4 14 Q16 2 30 18 Q44 2 56 14', c, 5)) };
    },
    // ---------------- objects ----------------
    bench(o) {
      const c = o.color || P.brown;
      return { w: 200, h: 100, svg: rect(10, 10, 180, 18, c, 4) + rect(10, 36, 180, 18, shade(c, -0.08), 4) + rect(4, 54, 192, 14, shade(c, 0.1), 4) + rect(24, 66, 12, 34, P.ink) + rect(164, 66, 12, 34, P.ink) };
    },
    signpost(o) {
      const c = o.color || P.cream;
      return { w: 220, h: 230, svg: rect(102, 40, 16, 190, P.bark) + path('M20 30 L180 30 L210 66 L180 102 L20 102 Z', c) + path('M20 92 L180 92 L190 102 L20 102 Z', shade(c, -0.1)) + (o.text ? txt(106, 66, o.text, 30, P.navy) : '') };
    },
    easel(o) {
      const c = o.color || P.white;
      const bars = o.bars || [0.4, 0.62, 0.5, 0.85];
      const cols = [P.leaf, P.teal, P.mustard, P.red];
      let b = '';
      bars.forEach((v, k) => (b += rect(56 + k * 26, 148 - v * 90, 18, v * 90, cols[k % 4], 2)));
      return { w: 200, h: 290, svg: line('M60 160 L36 290 M140 160 L164 290 M100 160 L100 270', P.bark, 7) + rect(34, 30, 132, 136, c, 4) + rect(50, 46, 70, 8, P.navy, 4) + b };
    },
    laptop(o) {
      const c = o.color || P.navy;
      return { w: 220, h: 140, svg: rect(34, 0, 152, 108, c, 10) + rect(46, 12, 128, 84, P.sky, 4) + rect(58, 26, 60, 10, P.white, 4) + rect(58, 46, 100, 8, P.white, 4) + rect(58, 62, 80, 8, P.white, 4) + path('M6 112 L214 112 L200 140 L20 140 Z', shade(c, 0.2)) };
    },
    book(o) {
      const c = o.color || P.teal;
      return { w: 200, h: 120, svg: path('M10 28 Q60 10 100 30 Q140 10 190 28 L190 120 Q140 102 100 120 Q60 102 10 120 Z', c) + path('M20 24 Q60 6 98 24 L98 108 Q60 92 20 108 Z', P.cream) + path('M102 24 Q140 6 180 24 L180 108 Q140 92 102 108 Z', P.white) + line('M34 44 Q60 34 86 46 M34 62 Q60 52 86 64 M114 44 Q140 34 166 46 M114 62 Q140 52 166 64', P.grey, 4) };
    },
    cup(o) {
      const c = o.color || P.coral;
      return {
        w: 120, h: 140,
        svg: g('steam', '60px 40px', line('M42 40 Q34 24 44 12 M62 40 Q54 20 66 4 M80 40 Q74 26 82 14', P.white, 5, 'opacity="0.9"')) +
          path('M14 52 L94 52 L86 130 Q84 140 72 140 L36 140 Q24 140 22 130 Z', c) + path('M92 66 Q116 66 114 88 Q112 108 88 108', 'none', `stroke="${c}" stroke-width="10"`) + rect(10, 46, 88, 12, shade(c, -0.12), 6),
      };
    },
    bread(o) {
      const c = o.color || '#D99A55';
      return { w: 190, h: 96, svg: path('M8 96 Q0 30 50 16 Q95 0 140 16 Q190 30 182 96 Z', c) + path('M8 96 Q4 70 20 54 L170 54 Q186 70 182 96 Z', shade(c, -0.12)) + line('M56 26 L44 50 M96 18 L84 46 M136 26 L124 50', shade(c, 0.35), 6) };
    },
    cake(o) {
      const c = o.color || P.pink;
      return {
        w: 170, h: 180,
        svg: rect(80, 30, 10, 36, P.mustard, 3) + g('bob', '85px 26px', path('M85 0 Q96 16 85 28 Q74 16 85 0 Z', P.red)) + rect(20, 64, 130, 56, P.cream, 8) +
          path('M20 80 Q36 96 52 80 Q68 96 85 80 Q102 96 118 80 Q134 96 150 80 L150 64 L20 64 Z', c) + rect(10, 118, 150, 52, shade(c, -0.1), 8) + rect(0, 166, 170, 14, P.white, 7),
      };
    },
    gift(o) {
      const c = o.color || P.teal;
      return { w: 130, h: 140, svg: rect(14, 54, 102, 86, c, 4) + rect(6, 36, 118, 26, shade(c, 0.15), 4) + rect(56, 36, 18, 104, P.mustard) + path('M65 36 Q40 0 28 20 Q24 36 65 36 Q90 0 102 20 Q106 36 65 36 Z', P.mustard) };
    },
    envelope(o) {
      const c = o.color || P.cream;
      return { w: 170, h: 116, svg: rect(6, 6, 158, 104, c, 6) + path('M6 12 L85 66 L164 12', 'none', `stroke="${shade(c, -0.18)}" stroke-width="6" stroke-linejoin="round"`) + circ(85, 70, 14, P.red) };
    },
    heart(o) {
      const c = o.color || P.red;
      return { w: 110, h: 100, svg: g('bob', '55px 50px', path('M55 96 Q4 60 6 32 Q8 6 32 6 Q48 6 55 22 Q62 6 78 6 Q102 6 104 32 Q106 60 55 96 Z', c) + ell(32, 30, 10, 14, shade(c, 0.3), 'transform="rotate(-30 32 30)"')) };
    },
    star(o) {
      const c = o.color || P.mustard;
      return { w: 110, h: 106, svg: g('bob', '55px 55px', path('M55 4 L69 38 L106 40 L77 64 L88 102 L55 80 L22 102 L33 64 L4 40 L41 38 Z', c) + path('M55 4 L69 38 L106 40 L77 64 L55 56 Z', shade(c, 0.2))) };
    },
    bulb(o) {
      const c = o.color || P.mustard;
      return {
        w: 120, h: 160,
        svg: g('bob', '60px 80px', line('M60 6 V20 M18 22 L28 32 M102 22 L92 32 M4 64 H18 M102 64 H116', c, 5) + circ(60, 66, 36, c) + circ(48, 54, 10, shade(c, 0.4)) + rect(44, 98, 32, 30, P.grey, 4) + rect(48, 128, 24, 10, P.ink, 4)),
      };
    },
    gear(o) {
      const c = o.color || P.teal;
      let teeth = '';
      for (let k = 0; k < 8; k += 1) teeth += rect(52, 0, 20, 30, c, 4, `transform="rotate(${k * 45} 62 62)"`);
      return { w: 124, h: 124, svg: g('spin', '62px 62px', teeth + circ(62, 62, 44, c) + circ(62, 62, 18, P.cream)) };
    },
    bubble(o) {
      const c = o.color || P.white;
      const dots = o.text ? txt(70, 48, o.text, 30, P.navy) : circ(44, 48, 7, P.navy) + circ(70, 48, 7, P.navy) + circ(96, 48, 7, P.navy);
      return { w: 140, h: 116, svg: g('bob', '70px 60px', rect(4, 4, 132, 88, c, 22) + path('M30 88 L26 114 L56 88 Z', c) + dots) };
    },
    phone(o) {
      const c = o.color || P.navy;
      return { w: 96, h: 170, svg: rect(4, 4, 88, 162, c, 16) + rect(12, 20, 72, 124, P.sky, 6) + rect(20, 30, 40, 10, P.white, 4) + rect(20, 50, 56, 30, P.white, 6) + rect(20, 88, 56, 30, P.white, 6) + circ(48, 154, 5, shade(c, 0.3)) };
    },
    rocket(o) {
      const c = o.color || P.cream;
      return {
        w: 130, h: 230,
        svg: g('bob', '65px 115px', path('M44 150 Q62 220 65 230 Q68 220 86 150 Z', P.mustard) + path('M54 150 Q62 196 65 204 Q68 196 76 150 Z', P.red) + path('M30 120 L8 168 L44 150 Z', P.red) + path('M100 120 L122 168 L86 150 Z', P.red) +
            path('M65 4 Q110 50 100 150 L30 150 Q20 50 65 4 Z', c) + path('M65 4 Q110 50 100 150 L65 150 Z', shade(c, -0.08)) + circ(65, 72, 18, P.navy) + circ(65, 72, 11, P.sky)),
      };
    },
    flag(o) {
      const c = o.color || P.red;
      return { w: 130, h: 220, svg: rect(10, 6, 8, 214, P.ink, 4) + g('sway', '18px 20px', path('M18 14 Q60 0 90 18 Q110 28 124 20 L124 84 Q110 92 90 82 Q60 64 18 78 Z', c)) };
    },
    lamp(o) {
      const c = o.color || P.navy;
      return { w: 80, h: 330, svg: rect(36, 60, 8, 270, c) + rect(26, 316, 28, 14, c, 4) + path('M16 56 L64 56 L56 24 L24 24 Z', c) + rect(24, 56, 32, 20, P.mustard, 4) + circ(40, 16, 8, c) };
    },
    mailbox(o) {
      const c = o.color || P.red;
      return { w: 120, h: 180, svg: rect(52, 80, 14, 100, P.bark) + path('M10 90 L10 40 Q10 10 46 10 L76 10 Q108 10 108 40 L108 90 Z', c) + path('M46 10 Q10 10 10 40 L10 90 L46 90 Z', shade(c, -0.12)) + rect(100, 20, 6, 46, P.ink) + rect(100, 20, 22, 16, P.mustard) };
    },
    camera(o) {
      const c = o.color || P.navy;
      return { w: 160, h: 120, svg: rect(14, 26, 132, 90, c, 14) + rect(34, 12, 40, 20, c, 6) + circ(80, 70, 32, P.cream) + circ(80, 70, 22, P.ink) + circ(72, 62, 6, P.white) + circ(126, 44, 6, P.mustard) };
    },
    basket(o) {
      const c = o.color || P.brown;
      return { w: 150, h: 110, svg: circ(52, 46, 18, P.red) + circ(84, 40, 18, P.leaf) + circ(108, 50, 16, P.red) + path('M14 50 L136 50 L120 110 L30 110 Z', c) + line('M24 70 H126 M28 90 H122', shade(c, -0.2), 4) + path('M30 52 Q75 -10 120 52', 'none', `stroke="${shade(c, -0.15)}" stroke-width="7"`) };
    },
    picnic(o) {
      const c = o.color || P.red;
      let s = path('M10 70 L60 6 L270 6 L240 70 Z', P.white);
      for (let k = 0; k < 5; k += 1) s += path(`M${20 + k * 50} 70 L${66 + k * 44} 6 L${88 + k * 44} 6 L${44 + k * 50} 70 Z`, c, 'opacity="0.85"');
      return { w: 280, h: 74, svg: s };
    },
    apple(o) {
      const c = o.color || P.red;
      return { w: 70, h: 76, svg: path('M35 18 Q60 6 66 34 Q70 64 46 74 Q35 70 24 74 Q0 64 4 34 Q10 6 35 18 Z', c) + ell(20, 34, 6, 10, shade(c, 0.35)) + line('M35 18 Q36 8 42 2', P.bark, 4) + ell(48, 10, 10, 5, P.leaf, 'transform="rotate(-20 48 10)"') };
    },
    trophy(o) {
      const c = o.color || P.mustard;
      return { w: 120, h: 150, svg: path('M24 6 L96 6 L92 56 Q86 86 60 88 Q34 86 28 56 Z', c) + path('M24 20 Q2 20 6 44 Q10 60 30 62 M96 20 Q118 20 114 44 Q110 60 90 62', 'none', `stroke="${c}" stroke-width="8"`) + rect(52, 86, 16, 30, shade(c, -0.15)) + rect(28, 114, 64, 18, P.navy, 4) + rect(20, 130, 80, 16, shade(P.navy, 0.15), 4) };
    },
    calendar(o) {
      const c = o.color || P.red;
      return { w: 130, h: 130, svg: rect(6, 16, 118, 110, P.white, 10) + path('M6 26 Q6 16 16 16 L114 16 Q124 16 124 26 L124 46 L6 46 Z', c) + rect(30, 4, 10, 24, P.ink, 5) + rect(90, 4, 10, 24, P.ink, 5) + (o.text ? txt(65, 88, o.text, 44, P.navy) : rect(26, 62, 20, 16, P.grey, 3) + rect(56, 62, 20, 16, P.grey, 3) + rect(86, 62, 20, 16, c, 3) + rect(26, 90, 20, 16, P.grey, 3) + rect(56, 90, 20, 16, P.grey, 3)) };
    },
    pin(o) {
      const c = o.color || P.red;
      return { w: 90, h: 120, svg: g('bob', '45px 110px', path('M45 118 Q8 70 8 44 Q8 6 45 6 Q82 6 82 44 Q82 70 45 118 Z', c) + circ(45, 44, 16, P.white)) };
    },
    note(o) {
      const c = o.color || P.navy;
      return { w: 90, h: 120, svg: g('bob', '45px 60px', rect(56, 6, 10, 84, c) + path('M66 6 Q90 20 86 46 Q80 30 66 30 Z', c) + ell(40, 92, 26, 20, c, 'transform="rotate(-20 40 92)"')) };
    },

    // ---------------- story & science extras ----------------
    planet(o) {
      const c = o.color || '#E9C98F';
      const extra = (o.rose ? `<g transform="translate(150 -28) scale(0.55)">${PROPS.rose({}).svg}</g>` : '') +
        (o.volcano ? `<g transform="translate(40 18) scale(0.5)">${PROPS.volcano({}).svg}</g>` : '');
      return {
        w: 260, h: 260,
        svg: extra + circ(130, 150, 110, c) + path('M130 40 A110 110 0 0 1 130 260 A90 110 0 0 0 130 40 Z', shade(c, -0.1)) +
          circ(92, 128, 18, shade(c, -0.14)) + circ(160, 196, 13, shade(c, -0.14)) + circ(176, 112, 9, shade(c, -0.14)) + circ(84, 116, 6, shade(c, 0.25)),
      };
    },
    rose(o) {
      const c = o.color || P.red;
      const dome = o.dome ? path('M30 150 L30 70 Q30 14 70 14 Q110 14 110 70 L110 150 Z', '#DDF0F4', 'opacity="0.55"') + rect(22, 146, 96, 10, P.grey, 4) : '';
      return {
        w: 140, h: 160,
        svg: line('M70 150 Q66 110 70 70', P.dark, 6) + path('M70 120 Q40 112 36 90 Q60 92 70 120 Z', P.leaf) + path('M70 104 Q98 96 102 76 Q78 78 70 104 Z', P.green) +
          g('sway', '70px 140px', path('M48 56 Q46 26 70 22 Q94 26 92 56 Q82 72 70 72 Q58 72 48 56 Z', c) + path('M56 40 Q70 30 84 40 Q80 54 70 56 Q60 54 56 40 Z', shade(c, -0.15)) + path('M70 22 Q60 36 70 46 Q80 36 70 22 Z', shade(c, 0.15))) + dome,
      };
    },
    fox(o) {
      const c = o.color || '#E8843C';
      return {
        w: 180, h: 200,
        svg: g('sway', '140px 190px', path('M120 190 Q190 180 172 120 Q166 96 150 104 Q160 150 112 168 Z', c) + path('M160 108 Q172 110 172 126 Q164 118 154 120 Z', P.white)) +
          path('M50 196 Q40 120 70 96 L110 96 Q136 120 126 196 Z', c) + path('M66 196 Q64 140 88 120 Q110 140 110 196 Z', P.white) +
          path('M44 40 L54 4 L76 32 Z', c) + path('M136 40 L126 4 L104 32 Z', c) + path('M52 34 L56 14 L68 30 Z', P.ink) + path('M128 34 L124 14 L112 30 Z', P.ink) +
          path('M40 40 Q90 10 140 40 Q146 84 90 110 Q34 84 40 40 Z', c) + path('M58 72 Q90 118 122 72 Q112 100 90 110 Q68 100 58 72 Z', P.white) +
          circ(70, 60, 5, P.ink) + circ(110, 60, 5, P.ink) + circ(90, 96, 6, P.ink),
      };
    },
    plane(o) {
      const c = o.color || P.red;
      return {
        w: 260, h: 140,
        svg: g('bob', '130px 70px', rect(60, 18, 150, 12, shade(c, -0.15), 6) + rect(60, 92, 150, 12, shade(c, -0.15), 6) + line('M90 30 V92 M180 30 V92', P.ink, 4) +
          path('M30 50 Q30 40 50 40 L200 46 Q236 50 236 62 Q236 74 200 78 L50 84 Q30 84 30 74 Z', c) + path('M30 50 L4 24 L18 62 L4 100 L30 74 Z', shade(c, -0.1)) + rect(120, 42, 34, 16, P.sky, 4) +
          ell(240, 62, 5, 34, P.ink, 'opacity="0.75"')),
      };
    },
    volcano(o) {
      const c = o.color || '#9A7D6B';
      return { w: 120, h: 90, svg: path('M6 90 L44 20 L76 20 L114 90 Z', c) + path('M60 20 L76 20 L114 90 L80 90 Z', shade(c, -0.12)) + path('M44 20 Q60 30 76 20 Q72 8 60 10 Q48 8 44 20 Z', P.red) + g('steam', '60px 10px', circ(54, -4, 7, P.grey) + circ(66, -12, 9, P.grey)) };
    },
    baobab(o) {
      const c = o.color || P.green;
      return {
        w: 220, h: 260,
        svg: path('M76 260 Q86 170 70 120 Q60 96 40 90 L50 82 Q76 90 90 108 L96 70 L120 70 L124 108 Q140 86 170 82 L176 90 Q156 100 148 124 Q132 170 146 260 Z', '#B98A5E') +
          g('sway', '110px 250px', circ(60, 70, 44, c) + circ(110, 46, 50, shade(c, 0.08)) + circ(164, 72, 44, c) + circ(110, 78, 34, shade(c, -0.1))),
      };
    },
    moon(o) {
      const c = o.color || '#F6D96B';
      return { w: 120, h: 120, svg: g('bob', '60px 60px', path('M84 10 A52 52 0 1 0 110 86 A44 44 0 1 1 84 10 Z', c)) };
    },
    raincloud(o) {
      const c = o.color || '#C9D6E2';
      let drops = '';
      for (const [x, y] of [[60, 120], [100, 140], [140, 118], [180, 136]]) drops += path(`M${x} ${y} Q${x - 8} ${y + 14} ${x} ${y + 20} Q${x + 8} ${y + 14} ${x} ${y} Z`, P.blue);
      return { w: 240, h: 170, svg: g('bob', '120px 60px', drops) + circ(70, 70, 40, c) + circ(126, 52, 52, c) + circ(182, 74, 38, c) + rect(30, 70, 190, 40, c, 20) + circ(110, 44, 18, shade(c, 0.3)) };
    },
    drop(o) {
      const c = o.color || P.blue;
      const face = o.face ? circ(40, 76, 4, P.ink) + circ(60, 76, 4, P.ink) + path('M42 90 Q50 98 58 90', 'none', `stroke="${P.ink}" stroke-width="3" stroke-linecap="round"`) : '';
      return { w: 100, h: 130, svg: g('bob', '50px 70px', path('M50 4 Q90 60 90 86 Q90 126 50 126 Q10 126 10 86 Q10 60 50 4 Z', c) + ell(34, 82, 8, 14, shade(c, 0.4)) + face) };
    },
    mountain(o) {
      const c = o.color || '#8FA9B8';
      return { w: 340, h: 220, svg: path('M0 220 L120 30 L190 120 L240 70 L340 220 Z', c) + path('M120 30 L190 120 L170 220 L120 220 Z', shade(c, -0.1)) + path('M120 30 L150 78 L132 72 L118 88 L104 70 L92 76 Z', P.white) + path('M240 70 L262 104 L248 100 L236 110 L224 96 Z', P.white) };
    },
    river(o) {
      const c = o.color || '#7FC0DA';
      const w = o.span || 600;
      return { w, h: 70, svg: path(`M0 30 Q${w * 0.25} 0 ${w * 0.5} 30 Q${w * 0.75} 60 ${w} 30 L${w} 70 L0 70 Z`, c) + path(`M${w * 0.1} 44 Q${w * 0.2} 36 ${w * 0.3} 44 M${w * 0.6} 50 Q${w * 0.7} 42 ${w * 0.8} 50`, 'none', `stroke="${shade(c, 0.45)}" stroke-width="5" stroke-linecap="round"`) };
    },
    waterworks(o) {
      const c = o.color || '#E8EEF0';
      return {
        w: 320, h: 220,
        svg: rect(20, 90, 170, 130, c) + rect(20, 80, 170, 16, P.teal, 4) + rect(40, 120, 34, 34, P.sky, 4) + rect(90, 120, 34, 34, P.sky, 4) + rect(140, 150, 34, 70, P.navy, 4) +
          rect(200, 120, 110, 100, '#9CC9DC', 10) + ell(255, 120, 55, 14, shade('#9CC9DC', 0.3)) + rect(200, 170, 110, 8, shade('#9CC9DC', -0.15)) + rect(60, 30, 22, 52, P.grey),
      };
    },
    pipe(o) {
      const c = o.color || '#9AA9B2';
      const w = o.span || 400;
      let joints = '';
      for (let x = 60; x < w - 30; x += 140) joints += rect(x, 0, 18, 44, shade(c, -0.15), 4);
      const water = o.flow === false ? '' : g('bob', `${w / 2}px 22px`, circ(w * 0.3, 22, 6, P.blue) + circ(w * 0.55, 22, 6, P.blue) + circ(w * 0.8, 22, 6, P.blue));
      return { w, h: 44, svg: rect(0, 6, w, 32, c, 16) + rect(0, 10, w, 8, shade(c, 0.3), 4) + water + joints };
    },
    tap(o) {
      const c = o.color || '#B8C4CC';
      const drip = o.drip === false ? '' : g('bob', '128px 150px', path('M128 136 Q120 150 128 158 Q136 150 128 136 Z', P.blue));
      return { w: 170, h: 170, svg: rect(0, 40, 40, 50, shade(c, -0.1), 6) + path('M40 50 L110 50 Q140 50 140 80 L140 112 L116 112 L116 82 Q116 74 108 74 L40 74 Z', c) + rect(70, 26, 16, 26, c) + rect(56, 18, 44, 12, P.red, 6) + drip };
    },
    glass(o) {
      const c = o.color || '#CFE7F1';
      return { w: 90, h: 130, svg: path('M8 6 L82 6 L72 124 L18 124 Z', c, 'opacity="0.85"') + path('M14 50 L76 50 L72 124 L18 124 Z', P.blue, 'opacity="0.8"') + rect(22, 14, 8, 30, P.white, 4) };
    },
    hand(o) {
      const c = o.color || P.skin;
      return {
        w: 170, h: 220,
        svg: rect(36, 0, 26, 110, c, 13) + rect(66, -10, 26, 120, c, 13) + rect(96, 0, 26, 112, c, 13) + rect(126, 22, 24, 96, c, 12) +
          path('M40 92 Q30 92 22 82 L4 60 Q-2 50 8 46 Q18 42 26 52 L44 74 Z', c) + path('M34 90 L150 90 L148 160 Q140 200 96 204 Q46 200 38 160 Z', c) + rect(50, 196, 92, 24, shade(c, -0.1), 8),
      };
    },
    germ(o) {
      const c = o.color || '#7CC66A';
      let spikes = '';
      for (let k = 0; k < 10; k += 1) {
        const a = (k / 10) * Math.PI * 2;
        spikes += line(`M${60 + Math.cos(a) * 40} ${60 + Math.sin(a) * 40} L${60 + Math.cos(a) * 56} ${60 + Math.sin(a) * 56}`, shade(c, -0.15), 6) + circ(60 + Math.cos(a) * 58, 60 + Math.sin(a) * 58, 6, shade(c, -0.15));
      }
      return { w: 120, h: 120, svg: g('bob', '60px 60px', spikes + circ(60, 60, 42, c) + circ(46, 54, 9, P.white) + circ(74, 54, 9, P.white) + circ(48, 56, 4, P.ink) + circ(72, 56, 4, P.ink) + path('M48 74 Q60 82 72 74', 'none', `stroke="${P.ink}" stroke-width="4" stroke-linecap="round"`) + circ(40, 36, 6, shade(c, 0.3))) };
    },
    soap(o) {
      const c = o.color || P.pink;
      return { w: 160, h: 130, svg: g('bob', '110px 30px', circ(110, 30, 18, '#E4F3FA', 'opacity="0.9"') + circ(138, 14, 10, '#E4F3FA', 'opacity="0.9"') + circ(84, 12, 8, '#E4F3FA', 'opacity="0.9"')) + rect(10, 60, 140, 70, c, 22) + rect(24, 66, 112, 20, shade(c, 0.3), 10) };
    },
    bubbles(o) {
      const c = o.color || '#E4F3FA';
      let s = '';
      for (const [x, y, r] of [[40, 90, 30], [96, 60, 40], [150, 100, 26], [70, 30, 18], [130, 20, 14]]) s += circ(x, y, r, c, 'opacity="0.92"') + circ(x - r * 0.35, y - r * 0.35, r * 0.22, P.white);
      return { w: 180, h: 130, svg: g('bob', '90px 60px', s) };
    },
    door(o) {
      const c = o.color || P.teal;
      return { w: 140, h: 240, svg: rect(0, 0, 140, 240, shade(c, -0.2), 8) + rect(12, 12, 116, 228, c, 6) + rect(26, 30, 88, 70, shade(c, 0.12), 6) + rect(26, 118, 88, 100, shade(c, 0.12), 6) + rect(96, 120, 30, 12, P.mustard, 6) + circ(102, 126, 9, P.mustard) };
    },
    clock(o) {
      const c = o.color || P.red;
      return { w: 140, h: 150, svg: circ(70, 80, 64, c) + circ(70, 80, 50, P.cream) + rect(62, 4, 16, 16, c, 4) + line('M70 80 L70 46', P.ink, 6) + g('spin', '70px 80px', line('M70 80 L96 92', P.ink, 6)) + circ(70, 80, 6, P.ink) + (o.text ? txt(70, 118, o.text, 20, P.ink) : '') };
    },
    sink(o) {
      const c = o.color || P.white;
      return { w: 260, h: 200, svg: rect(110, 120, 40, 80, P.grey, 6) + path('M10 60 L250 60 Q246 130 130 130 Q14 130 10 60 Z', c) + rect(0, 50, 260, 18, shade(c, -0.08), 9) + path('M40 70 L220 70 Q214 110 130 112 Q46 110 40 70 Z', '#D8EEF6') };
    },
  };

  const ALIASES = { faucet: 'tap', water: 'drop', virus: 'germ', bacteria: 'germ', tent2: 'camp', tent: 'stall', market: 'stall', bike: 'bicycle', mail: 'envelope', letter: 'envelope', idea: 'bulb', chat: 'bubble', sign: 'signpost', chart: 'easel' };
  window.PAPER_ALIASES = ALIASES;
  window.PAPER_PALETTE = P;
  window.PAPER_SHADE = shade;
  window.PAPER_PROPS = PROPS;
  window.PAPER_PROP = (name, opts = {}) => {
    const fn = PROPS[name] || PROPS[ALIASES[name]];
    if (!fn) return null;
    return fn(opts);
  };
})();
