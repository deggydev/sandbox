// Paper Cutout Story engine.
// Reads window.STORYBOARD and builds a deterministic film: every frame is a
// pure function of the film clock, exposed as window.__film.seek(t) so the
// renderer can capture frames one by one.
(() => {
  const SB = window.STORYBOARD;
  const META = { fps: 30, theme: 'meadow', boil: true, ...(SB.meta || {}) };
  const FPS = META.fps;
  const W = 1920;
  const H = 1080;
  const RENDER = new URLSearchParams(location.search).has('render');
  const stage = document.getElementById('stage');
  const NS = 'http://www.w3.org/2000/svg';
  const PAL = window.PAPER_PALETTE;
  const shade = window.PAPER_SHADE;

  // ---------------- helpers ----------------
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const lerp = (a, b, p) => a + (b - a) * p;
  const E = {
    out: (t) => 1 - (1 - t) ** 3,
    in: (t) => t ** 3,
    inOut: (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2),
    back: (t) => {
      const c1 = 1.9;
      const c3 = c1 + 1;
      return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
    },
    backIn: (t) => {
      const c1 = 1.7;
      return (c1 + 1) * t ** 3 - c1 * t * t;
    },
    bounce: (t) => {
      const n = 7.5625;
      const d = 2.75;
      if (t < 1 / d) return n * t * t;
      if (t < 2 / d) return n * (t -= 1.5 / d) * t + 0.75;
      if (t < 2.5 / d) return n * (t -= 2.25 / d) * t + 0.9375;
      return n * (t -= 2.625 / d) * t + 0.984375;
    },
  };
  const prog = (lt, at, d) => clamp((lt - at) / d);
  function hash(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i += 1) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return (h >>> 0) / 4294967295;
  }
  function rng(seed) {
    let s = Math.floor(hash(String(seed)) * 2147483646) + 1;
    return () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
  }
  function el(tag, cls, parent, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    if (parent) parent.appendChild(e);
    return e;
  }
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const CJK = /[\u3000-\u9fff\uac00-\ud7af\uff00-\uffef]/;

  // ---------------- themes ----------------
  const THEMES = {
    meadow: { sky: ['#D5EAE3', '#EEF1E4'], sun: '#F3B63E', hills: ['#D3E7BD', '#B7DA9C', '#98C97E', '#78B466', '#5C9F54', '#428647'], tuft: '#2F6D3B', cloud: '#FFFFFF', paper: '#EFEADF' },
    spring: { sky: ['#E2EEF4', '#F6F0E6'], sun: '#F5BE45', hills: ['#E0F0C8', '#C6E5A6', '#A8D68A', '#8AC470', '#6EB15E', '#53984B'], tuft: '#3E8040' },
    autumn: { sky: ['#F2E4CF', '#F8EFE0'], sun: '#EE913F', hills: ['#F1DAA8', '#E8C27C', '#DBA55C', '#CB8747', '#B26C3B', '#8F5535'], tuft: '#6F4A2C' },
    seaside: { sky: ['#D2E8F1', '#EFF4EE'], sun: '#F4BA45', hills: ['#C3E2EC', '#9ACFE2', '#76B8D4', '#F2DFB4', '#E9CD96', '#DDB97C'], amp: [0.5, 0.35, 0.3, 1, 0.9, 0.8], tuft: '#6EA36A' },
    snow: { sky: ['#DDE7F0', '#F3F5F6'], sun: '#F5C65C', hills: ['#F8FAFC', '#EAF1F7', '#DCE6F0', '#CEDBE8', '#FFFFFF', '#EFF4F9'], tuft: '#5E8A6A', cloud: '#FFFFFF' },
    dusk: { sky: ['#F6D5C2', '#F9EADA'], sun: '#F08A5D', hills: ['#EBCBB9', '#D9B6B0', '#BCA4B4', '#93A6A2', '#71967B', '#52805F'], tuft: '#3F6B4B' },
    desert: { sky: ['#F4E6CE', '#F9F1E2'], sun: '#F2A541', hills: ['#F3D8A8', '#ECC58C', '#E2B172', '#D69B5C', '#C9894D', '#B57541'], tuft: '#7E8F4E' },
  };
  const themeOf = (name) => {
    const base = THEMES[name] || THEMES[META.theme] || THEMES.meadow;
    return { ...THEMES.meadow, ...base, ...(typeof name === 'object' ? name : {}) };
  };
  const HILL_BASE = [612, 668, 730, 796, 866, 948];
  const HILL_AMP = [36, 30, 26, 20, 16, 12];
  const HILL_DEPTH = [0.15, 0.3, 0.45, 0.6, 0.78, 0.95];

  function hillPath(k, seed, ampScale = 1) {
    const r = rng(`${seed}-hill-${k}`);
    const ph = [r() * 6.28, r() * 6.28, r() * 6.28];
    const f = [0.0021 + r() * 0.0012, 0.0052 + r() * 0.002, 0.011 + r() * 0.004];
    const amp = HILL_AMP[k] * ampScale;
    const base = HILL_BASE[k];
    const pts = [];
    for (let x = -260; x <= W + 260; x += 18) {
      const y = base - amp * (Math.sin(x * f[0] + ph[0]) * 1 + Math.sin(x * f[1] + ph[1]) * 0.45 + Math.sin(x * f[2] + ph[2]) * 0.12) + (r() - 0.5) * 1.6;
      pts.push(`${x.toFixed(0)},${y.toFixed(1)}`);
    }
    return `M-260,${H + 40} L${pts.join(' L')} L${W + 260},${H + 40} Z`;
  }
  // Clay / felt surface: hand-cut wobbly edges, a soft puffy relief lit from
  // the top left, and mottled fibre texture inside every shape. k is the
  // number of screen pixels per SVG unit, so the texture has the same grain
  // whatever size a piece is drawn at.
  let FID = 0;
  const CLAY = { wobble: 3.4, relief: 1, tex: 0.26, ...(META.clay || {}) };
  function clayFilter(k = 1, o = {}) {
    FID += 1;
    const id = `clay${FID}`;
    const u = (v) => (v / k).toFixed(4);
    const seed = (FID * 7) % 97;
    const wob = (o.wobble ?? CLAY.wobble) * (META.clay === false ? 0 : 1);
    const relief = (o.relief ?? CLAY.relief) * (META.clay === false ? 0 : 1);
    const tex = (o.tex ?? CLAY.tex) * (META.clay === false ? 0 : 1);
    const f = `<filter id="${id}" x="-6%" y="-6%" width="112%" height="112%" color-interpolation-filters="sRGB">` +
      `<feTurbulence type="fractalNoise" baseFrequency="${u(0.028)}" numOctaves="2" seed="${seed}" result="n1"/>` +
      `<feDisplacementMap in="SourceGraphic" in2="n1" scale="${u(wob)}" xChannelSelector="R" yChannelSelector="G" result="w"/>` +
      `<feGaussianBlur in="w" stdDeviation="${u(0.55)}" result="ws"/>` +
      `<feColorMatrix in="ws" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="al"/>` +
      `<feGaussianBlur in="al" stdDeviation="${u(5)}" result="ab"/>` +
      `<feDiffuseLighting in="ab" surfaceScale="${(4 * relief).toFixed(2)}" diffuseConstant="1" lighting-color="#ffffff" result="lt"><feDistantLight azimuth="225" elevation="60"/></feDiffuseLighting>` +
      `<feComposite in="ws" in2="lt" operator="arithmetic" k1="${relief ? 1.155 : 1}" k2="${relief ? 0 : 1}" k3="0" k4="0" result="lit"/>` +
      `<feTurbulence type="fractalNoise" baseFrequency="${u(0.62)}" numOctaves="3" seed="${seed + 3}" result="fib"/>` +
      `<feTurbulence type="fractalNoise" baseFrequency="${u(0.009)} ${u(0.016)}" numOctaves="3" seed="${seed + 9}" result="blot"/>` +
      `<feComposite in="fib" in2="blot" operator="arithmetic" k2="0.55" k3="0.75" k4="-0.15" result="nz"/>` +
      `<feColorMatrix in="nz" type="matrix" values="0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 0 1" result="g"/>` +
      `<feComposite in="lit" in2="g" operator="arithmetic" k2="1" k3="${tex}" k4="${(-tex / 2).toFixed(3)}" result="tx"/>` +
      `<feComposite in="tx" in2="ws" operator="in"/></filter>`;
    return { id, defs: f };
  }
  function clayWrap(inner, k, o) {
    const f = clayFilter(k, o);
    return `<defs>${f.defs}</defs><g filter="url(#${f.id})">${inner}</g>`;
  }
  function svgBox(w, h, inner, cls = '', k = 1, o) {
    return `<svg xmlns="${NS}" class="${cls}" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" overflow="visible">${clayWrap(inner, k, o)}</svg>`;
  }
  function cloudSvg(r, color) {
    const n = 3 + Math.floor(r() * 2);
    let s = '';
    const w = 160 + n * 30;
    for (let i = 0; i < n; i += 1) {
      const cx = 50 + i * ((w - 100) / (n - 1));
      const rad = 30 + r() * 22 + (i > 0 && i < n - 1 ? 14 : 0);
      s += `<circle cx="${cx}" cy="${88 - rad * 0.7}" r="${rad}" fill="${color}"/>`;
    }
    s += `<rect x="20" y="62" width="${w - 40}" height="30" rx="15" fill="${color}"/>`;
    return { w, h: 96, svg: s };
  }
  function sunSvg(color, rad) {
    const r = rng(`sun-${color}`);
    const pts = [];
    for (let i = 0; i < 40; i += 1) {
      const a = (i / 40) * Math.PI * 2;
      const rr = rad * (1 + (r() - 0.5) * 0.025);
      pts.push(`${(rad + 6 + Math.cos(a) * rr).toFixed(1)},${(rad + 6 + Math.sin(a) * rr).toFixed(1)}`);
    }
    const d = rad * 2 + 12;
    return svgBox(d, d, `<polygon points="${pts.join(' ')}" fill="${color}"/><circle cx="${rad * 0.78}" cy="${rad * 0.72}" r="${rad * 0.42}" fill="${shade(color, 0.22)}" opacity="0.7"/>`);
  }
  function tuftSvg(color, flip) {
    const leaves = [
      ['M0 260 Q30 120 10 0 Q70 120 60 260 Z', 0.08],
      ['M40 260 Q90 110 150 40 Q120 150 110 260 Z', -0.06],
      ['M90 260 Q150 160 230 120 Q170 200 160 260 Z', 0.12],
      ['M-20 260 Q-10 170 -60 90 Q40 160 30 260 Z', -0.1],
    ];
    const s = leaves.map(([d, a]) => `<path d="${d}" fill="${shade(color, a)}"/>`).join('');
    // mirror inside the filtered group: a CSS-flipped SVG breaks the lighting filter
    return `<svg xmlns="${NS}" viewBox="-60 0 300 260" width="300" height="260" overflow="visible">${clayWrap(flip ? `<g transform="translate(180 0) scale(-1 1)">${s}</g>` : s, 1)}</svg>`;
  }
  const BACKDROPS = {
    mountains(th) {
      const c = shade(th.hills[0], -0.04);
      return `<path d="M-200 640 L180 300 L420 520 L700 250 L1040 600 L1300 330 L1620 560 L1880 290 L2140 640 Z" fill="${c}"/><path d="M180 300 L240 354 L210 360 L180 340 L150 362 L126 348 Z M700 250 L770 312 L730 320 L700 300 L668 322 L640 306 Z M1880 290 L1940 344 L1906 350 L1880 330 L1850 352 L1826 336 Z" fill="#FFFFFF"/>`;
    },
    city(th) {
      const r = rng('city');
      let s = '';
      let x = -200;
      while (x < W + 200) {
        const w = 80 + r() * 90;
        const h = 120 + r() * 200;
        const c = shade(th.hills[0], -0.06 - r() * 0.06);
        s += `<rect x="${x.toFixed(0)}" y="${(640 - h).toFixed(0)}" width="${w.toFixed(0)}" height="${(h + 40).toFixed(0)}" fill="${c}"/>`;
        for (let wy = 640 - h + 20; wy < 600; wy += 34) for (let wx = x + 14; wx < x + w - 24; wx += 30) if (r() > 0.45) s += `<rect x="${wx.toFixed(0)}" y="${wy.toFixed(0)}" width="14" height="18" fill="${shade(c, 0.35)}"/>`;
        x += w + 10 + r() * 30;
      }
      return s;
    },
    forest(th) {
      const r = rng('forest');
      let s = '';
      for (let x = -200; x < W + 200; x += 46 + r() * 30) {
        const h = 110 + r() * 90;
        const c = shade(th.hills[1], -0.1 - r() * 0.08);
        s += `<path d="M${x} 660 L${x + 34} ${660 - h} L${x + 68} 660 Z" fill="${c}"/>`;
      }
      return s;
    },
  };

  // ---------------- props ----------------
  function makeProp(p, key) {
    const wrap = el('div', 'prop');
    const inner = el('div', 'prop-in', wrap);
    let w;
    let h;
    if (p.src) {
      h = p.h || 260;
      w = p.w || h;
      const img = el('img', p.sticker === false ? 'cut' : 'sticker', inner);
      img.src = p.src;
      img.style.height = `${h}px`;
      img.style.width = p.w ? `${p.w}px` : 'auto';
      inner.style.width = p.w ? `${p.w}px` : 'auto';
      w = p.w || h; // approximate until the image loads; anchoring uses CSS
    } else if (p.svg) {
      const m = /viewBox="([\d.\s-]+)"/.exec(p.svg);
      const vb = m ? m[1].trim().split(/\s+/).map(Number) : [0, 0, 100, 100];
      h = p.h || vb[3];
      w = (vb[2] / vb[3]) * h;
      inner.innerHTML = p.svg;
      const s = inner.querySelector('svg');
      s.innerHTML = clayWrap(p.flip ? `<g transform="translate(${vb[0] * 2 + vb[2]} 0) scale(-1 1)">${s.innerHTML}</g>` : s.innerHTML, h / vb[3]);
      s.setAttribute('width', w);
      s.setAttribute('height', h);
      s.setAttribute('overflow', 'visible');
      s.classList.add('cut');
    } else {
      const def = window.PAPER_PROP(p.type, p);
      if (!def) {
        console.warn(`unknown prop type "${p.type}"`);
        return null;
      }
      h = p.h || def.h;
      w = (def.w / def.h) * h;
      inner.innerHTML = svgBox(def.w, def.h, p.flip ? `<g transform="translate(${def.w} 0) scale(-1 1)">${def.svg}</g>` : def.svg, 'cut', h / def.h);
      const s = inner.querySelector('svg');
      s.setAttribute('width', w.toFixed(1));
      s.setAttribute('height', h.toFixed(1));
    }
    if (p.flip && p.src && inner.firstElementChild) inner.firstElementChild.style.transform = 'scaleX(-1)';
    wrap.style.setProperty('--ph', (hash(key) * 10).toFixed(2));
    return { wrap, inner, w, h };
  }

  function propAnim(p, lt, T, sceneDur, exiting, key) {
    // returns {tx, ty, sx, sy, rot, op}
    let tx = 0;
    let ty = 0;
    let sx = 1;
    let sy = 1;
    let rot = p.rotate || 0;
    let op = 1;
    const at = p.at ?? 0.4;
    const enter = p.enter || 'pop';
    const d = p.enterDur || { pop: 0.5, grow: 0.9, drop: 0.8, slide: 0.9, fade: 0.6, rise: 0.7, walk: p.walkDur || 2.4, none: 0.001 }[enter] || 0.5;
    const q = prog(lt, at, d);
    if (enter === 'pop') {
      const e = E.back(q);
      sx = sy = Math.max(0, e);
      rot += (1 - q) * (hash(`${key}r`) > 0.5 ? 12 : -12);
      op = q > 0 ? 1 : 0;
    } else if (enter === 'grow') {
      const a = E.back(prog(lt, at, d * 0.8));
      const b = E.back(prog(lt, at + d * 0.2, d * 0.8));
      sy = Math.max(0, a);
      sx = Math.max(0, b);
      op = q > 0 ? 1 : 0;
    } else if (enter === 'drop') {
      ty = -(1 - E.bounce(q)) * 700;
      op = q > 0 ? 1 : 0;
    } else if (enter === 'slide') {
      const from = p.from ?? (p.x > W / 2 ? W + 300 : -300);
      tx = (from - p.x) * (1 - E.out(q));
      op = 1;
    } else if (enter === 'rise') {
      ty = (1 - E.back(q)) * 160;
      op = clamp(q * 3);
    } else if (enter === 'fade') {
      op = E.out(q);
    } else if (enter === 'walk') {
      const from = p.from ?? (p.x > W / 2 ? W + 200 : -200);
      tx = (from - p.x) * (1 - q);
      if (q > 0 && q < 1) ty = -Math.abs(Math.sin(lt * 9)) * 7;
    }
    if (p.float) ty += Math.sin((T + hash(key) * 6) * 2.1) * (typeof p.float === 'number' ? p.float : 8);
    if (exiting) {
      const x = prog(lt, sceneDur - 0.4, 0.34);
      const e = E.backIn(x);
      sx *= 1 - e;
      sy *= 1 - e;
      if (x >= 1) op = 0;
    }
    if (META.boil && !p.still) rot += (hash(`${key}-${Math.floor(T * 5)}`) - 0.5) * 1.1;
    return { tx, ty, sx, sy, rot, op };
  }

  // ---------------- kinetic text ----------------
  function buildText(spec, key) {
    const box = el('div', `ktext align-${spec.align || 'left'}`);
    const size = spec.size || 76;
    box.style.setProperty('--size', `${size}px`);
    if (spec.color) box.style.color = spec.color;
    if (spec.width) box.style.width = `${spec.width}px`;
    const words = [];
    const hls = [];
    if (spec.kicker) {
      const k = el('div', 'kicker', box, esc(spec.kicker));
      words.push({ node: k, kind: 'kicker' });
    }
    for (const [li, line] of (spec.lines || []).entries()) {
      const ln = el('div', 'kline', box);
      if (li === 0) ln.classList.add('first');
      const parts = String(line).split(/(\*\*[^*]+\*\*)/).filter(Boolean);
      for (const part of parts) {
        const isHl = part.startsWith('**');
        const raw = isHl ? part.slice(2, -2) : part;
        const target = isHl ? el('span', 'hl', ln) : ln;
        if (isHl) hls.push({ node: target, idx: words.length });
        const tokens = CJK.test(raw) ? raw.match(/[\u3000-\u9fff\uac00-\ud7af\uff00-\uffef]|[^\u3000-\u9fff\uac00-\ud7af\uff00-\uffef\s]+|\s+/g) : raw.split(/(\s+)/);
        for (const tok of tokens) {
          if (!tok) continue;
          if (/^\s+$/.test(tok)) {
            target.appendChild(document.createTextNode(' '));
            continue;
          }
          const w = el('span', spec.strips ? 'w strip' : 'w', target, esc(tok));
          if (spec.strips) {
            const r = hash(`${key}-${words.length}`);
            w.style.setProperty('--bg', spec.stripColors ? spec.stripColors[words.length % spec.stripColors.length] : ['#FFFFFF', '#FBF2D5', '#E5F1DC', '#FBE3DA'][Math.floor(r * 4)]);
          }
          words.push({ node: w, kind: 'word', line: li });
        }
      }
    }
    let note = null;
    if (spec.note) {
      note = el('div', 'note', box, esc(spec.note));
      if (spec.noteColor) note.style.color = spec.noteColor;
    }
    let sub = null;
    if (spec.body) sub = el('div', 'kbody', box, esc(spec.body).replace(/\n/g, '<br>'));
    const at = spec.at ?? 0.3;
    const stagger = spec.stagger ?? (CJK.test((spec.lines || []).join('')) ? 0.045 : 0.085);
    const wordsEnd = at + words.length * stagger + 0.3;
    return {
      el: box,
      update(lt, T, exiting, dur) {
        words.forEach((w, i) => {
          const q = prog(lt, at + i * stagger, 0.42);
          const e = E.back(q);
          const rest = spec.strips ? (hash(`${key}-rot-${i}`) - 0.5) * 6 : 0;
          const r0 = (hash(`${key}-w-${i}`) - 0.5) * 22;
          w.node.style.opacity = q > 0 ? clamp(q * 4) : 0;
          w.node.style.transform = `translateY(${((1 - e) * 34).toFixed(1)}px) rotate(${(r0 * (1 - q) + rest).toFixed(2)}deg) scale(${(0.6 + 0.4 * e).toFixed(3)})`;
        });
        for (const h of hls) {
          const q = E.inOut(prog(lt, at + (h.idx + 1) * stagger + 0.25, 0.5));
          h.node.style.backgroundSize = `${(q * 100).toFixed(1)}% 100%`;
        }
        if (note) {
          const q = prog(lt, wordsEnd + 0.1, 0.9);
          note.style.clipPath = `inset(-20% ${((1 - E.inOut(q)) * 100).toFixed(1)}% -20% 0)`;
        }
        if (sub) {
          const q = E.out(prog(lt, wordsEnd, 0.6));
          sub.style.opacity = q;
          sub.style.transform = `translateY(${((1 - q) * 16).toFixed(1)}px)`;
        }
        if (exiting) {
          const x = E.backIn(prog(lt, dur - 0.42, 0.36));
          box.style.opacity = 1 - x;
          box.style.transform = `translateY(${(x * -26).toFixed(1)}px)`;
        } else {
          box.style.opacity = 1;
          box.style.transform = 'none';
        }
      },
    };
  }

  // ---------------- paper card ----------------
  function buildCard(c, key) {
    const card = el('div', 'pcard');
    card.style.left = `${c.x ?? 110}px`;
    card.style.top = `${c.y ?? 300}px`;
    card.style.width = `${c.w ?? 520}px`;
    const color = c.color || PAL.teal;
    if (c.n !== undefined) el('div', 'badge', card, esc(c.n)).style.setProperty('--bg', color);
    if (c.kicker) el('div', 'ckicker', card, esc(c.kicker)).style.color = color;
    const title = el('div', 'ctitle', card, esc(c.title || ''));
    const body = c.body ? el('div', 'cbody', card, esc(c.body)) : null;
    const tilt = c.tilt ?? -1.2;
    const at = c.at ?? 0.25;
    return {
      el: card,
      update(lt, T, exiting, dur) {
        const q = prog(lt, at, 0.7);
        const e = E.back(q);
        let x = (1 - e) * -760;
        let rot = tilt + (1 - q) * -8;
        let op = q > 0 ? 1 : 0;
        if (exiting) {
          const xq = E.backIn(prog(lt, dur - 0.42, 0.38));
          x += xq * -800;
          rot += xq * -6;
        }
        if (META.boil) rot += (hash(`${key}-${Math.floor(T * 5)}`) - 0.5) * 0.35;
        card.style.opacity = op;
        card.style.transform = `translateX(${x.toFixed(1)}px) rotate(${rot.toFixed(2)}deg)`;
        const tq = E.out(prog(lt, at + 0.3, 0.45));
        title.style.opacity = tq;
        title.style.transform = `translateY(${((1 - tq) * 14).toFixed(1)}px)`;
        if (body) {
          const bq = E.out(prog(lt, at + 0.45, 0.45));
          body.style.opacity = bq;
          body.style.transform = `translateY(${((1 - bq) * 12).toFixed(1)}px)`;
        }
      },
    };
  }

  // ---------------- world (sky, sun, clouds, hills) ----------------
  function buildWorld(s, root, key, opts = {}) {
    const th = themeOf(s.theme || META.theme);
    const seed = s.seed || META.seed || 'paper';
    const world = el('div', 'world', root);
    const sky = el('div', 'sky', world);
    sky.style.background = `linear-gradient(180deg, ${th.sky[0]} 0%, ${th.sky[1]} 70%)`;
    const layers = [];
    const addLayer = (depth, cls) => {
      const L = el('div', `layer ${cls || ''}`, world);
      layers.push({ el: L, depth });
      return L;
    };
    // sun
    const sunCfg = s.sun === false ? null : { x: 1630, y: 185, r: 74, ...(th.sunPos || {}), ...(typeof s.sun === 'object' ? s.sun : {}) };
    let sunEl = null;
    if (sunCfg) {
      const L = addLayer(0.12);
      sunEl = el('div', 'sun', L, sunSvg(sunCfg.color || th.sun, sunCfg.r));
      sunEl.style.left = `${sunCfg.x - sunCfg.r - 6}px`;
      sunEl.style.top = `${sunCfg.y - sunCfg.r - 6}px`;
    }
    // clouds (same layout in every world scene of the film, so cuts feel continuous)
    const cl = addLayer(0.25, 'clouds');
    const cr = rng(`${seed}-clouds`);
    const clouds = [];
    const nClouds = s.clouds ?? 6;
    for (let i = 0; i < nClouds; i += 1) {
      const c = cloudSvg(cr, th.cloud);
      const scale = 0.55 + cr() * 0.6;
      const ce = el('div', 'cloud', cl, svgBox(c.w, c.h, c.svg, 'cut', scale, { relief: 1.3 }));
      clouds.push({ el: ce, x0: (i / nClouds) * (W + 500) - 250 + cr() * 120, y: 40 + cr() * 230, scale, speed: 6 + cr() * 8 });
    }
    // backdrop + hills, with props slotted between hills by depth
    const backdrop = s.backdrop || th.backdrop;
    const hillEls = [];
    th.hills.forEach((color, k) => {
      if (k === 1 && backdrop && BACKDROPS[backdrop]) {
        const L = addLayer(0.22, 'backdrop');
        L.innerHTML = `<svg xmlns="${NS}" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" overflow="visible" class="cut-soft">${clayWrap(BACKDROPS[backdrop](th), 1, { relief: 0.5 })}</svg>`;
      }
      const L = addLayer(HILL_DEPTH[k], 'hill');
      L.innerHTML = `<svg xmlns="${NS}" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" overflow="visible">${clayWrap(`<path d="${hillPath(k, seed, (th.amp || [])[k] ?? 1)}" fill="${color}"/>`, 1, { relief: 1.4, wobble: 5 })}</svg>`;
      hillEls.push({ el: L, k, depth: HILL_DEPTH[k] });
      L.dataset.slot = String(k);
    });
    const front = addLayer(1, 'front');
    const tufts = s.tufts === false ? null : addLayer(1.08, 'tufts');
    if (tufts) {
      el('div', 'tuft left', tufts, tuftSvg(th.tuft, false));
      el('div', 'tuft right', tufts, tuftSvg(th.tuft, true));
    }
    const slotFor = (depth) => {
      if (depth >= 0.95) return front;
      let idx = 0;
      for (const h of hillEls) if (h.depth <= depth) idx = h.k;
      // insert a dedicated layer right after that hill
      const key2 = `slot-${idx}`;
      let slot = world.querySelector(`[data-propslot="${key2}"]`);
      if (!slot) {
        slot = document.createElement('div');
        slot.className = 'layer props';
        slot.dataset.propslot = key2;
        hillEls[idx].el.after(slot);
        layers.push({ el: slot, depth: HILL_DEPTH[idx] + 0.01 });
      }
      return slot;
    };
    const groundY = (depth) => {
      if (depth >= 0.95) return 1012;
      let idx = 0;
      for (const h of hillEls) if (h.depth <= depth) idx = h.k;
      return (HILL_BASE[idx + 1] ?? 1000) + 18;
    };
    const rise = opts.rise;
    const cam = { x: [0, 0], y: [0, 0], zoom: [1, 1.03], ...(s.camera || {}) };
    return {
      world,
      slotFor,
      groundY,
      riseEnd: rise ? 1.25 : 0,
      update(lt, T, dur) {
        const p = E.inOut(clamp(lt / Math.max(0.1, dur)));
        const cx = lerp(cam.x[0], cam.x[1], p);
        const cy = lerp(cam.y[0], cam.y[1], p);
        const z = lerp(cam.zoom[0], cam.zoom[1], p);
        world.style.transform = `scale(${z.toFixed(4)})`;
        for (const L of layers) {
          let ty = cy * L.depth;
          if (rise && L.el.classList.contains('hill')) {
            const k = Number(L.el.dataset.slot);
            const q = E.out(prog(lt, k * 0.07, 0.9));
            ty += (1 - q) * (520 + k * 40);
          }
          if (rise && (L.el.classList.contains('props') || L.el.classList.contains('front') || L.el.classList.contains('tufts') || L.el.classList.contains('backdrop'))) {
            const q = E.out(prog(lt, 0.25, 0.9));
            ty += (1 - q) * 560;
          }
          L.el.style.transform = `translate(${(cx * L.depth).toFixed(1)}px, ${ty.toFixed(1)}px)`;
        }
        sky.style.opacity = rise ? E.out(prog(lt, 0, 0.6)) : 1;
        if (sunEl) {
          const q = rise ? E.back(prog(lt, 0.45, 0.9)) : 1;
          sunEl.style.transform = `translateY(${((1 - q) * 420).toFixed(1)}px) rotate(${(T * 4).toFixed(1)}deg)`;
        }
        for (const c of clouds) {
          let x = c.x0 + T * c.speed;
          x = ((x + 300) % (W + 600)) - 300;
          const q = rise ? E.out(prog(lt, 0.5, 0.8)) : 1;
          c.el.style.transform = `translate(${x.toFixed(1)}px, ${(c.y - (1 - q) * 120).toFixed(1)}px) scale(${c.scale.toFixed(3)})`;
          c.el.style.opacity = q;
        }
      },
    };
  }

  // ---------------- scenes ----------------
  const scenes = [];
  let tAcc = 0;
  const isWorld = (s) => s && (s.type === 'world' || s.bg === 'world');

  SB.scenes.forEach((s, i) => {
    const dur = Number(s.dur ?? { paper: 3, world: 3.5, steps: 4, cards: 4.5, end: 4 }[s.type] ?? 3.5);
    const start = tAcc;
    tAcc += dur;
    const prev = SB.scenes[i - 1];
    const next = SB.scenes[i + 1];
    const key = s.id || `s${i}`;
    const root = el('div', `scene type-${s.type}`, stage);
    root.style.background = s.paper || themeOf(s.theme || META.theme).paper;
    const parts = [];
    const nextCut = next && (!next.transition || next.transition === 'cut');
    const exiting = s.exit === 'swap' || (s.exit !== 'hold' && isWorld(s) && isWorld(next) && nextCut);
    let world = null;
    let offset = 0;
    if (isWorld(s)) {
      const rise = s.enter === 'rise' || (s.enter !== 'none' && !isWorld(prev) && (!s.transition || s.transition === 'cut'));
      world = buildWorld(s, root, key, { rise });
      offset = world.riseEnd;
    } else {
      el('div', 'paper-mottle', root);
    }
    const overlay = el('div', 'overlay', root);

    // props
    const props = [];
    (s.props || []).forEach((p, j) => {
      const pk = `${key}-p${j}`;
      const made = makeProp(p, pk);
      if (!made) return;
      const depth = p.depth ?? 1;
      const parent = world && !p.sky && p.y === undefined ? world.slotFor(depth) : world ? world.slotFor(1) : overlay;
      parent.appendChild(made.wrap);
      const baseY = p.y ?? (world ? world.groundY(depth) : H / 2);
      made.wrap.style.left = `${p.x ?? W / 2}px`;
      made.wrap.style.top = `${baseY}px`;
      // free (non-ground) props anchor at their centre
      made.wrap.classList.add(p.y !== undefined || !world ? 'anchor-center' : 'anchor-bottom');
      if (p.z) made.wrap.style.zIndex = p.z;
      const at = (p.at ?? 0.45 + j * 0.16) + (p.at === undefined ? offset : 0);
      const pp = { ...p, at };
      props.push({ p: pp, made, key: pk });
    });

    // confetti bits on paper scenes
    const bits = [];
    if (s.confetti) {
      const r = rng(`${key}-confetti`);
      const cols = [PAL.red, PAL.teal, PAL.mustard, PAL.leaf, PAL.coral, PAL.navy];
      for (let k = 0; k < (s.confetti === true ? 10 : s.confetti); k += 1) {
        const b = el('div', 'bit cut', overlay);
        const kind = Math.floor(r() * 3);
        const c = cols[k % cols.length];
        b.innerHTML = kind === 0 ? svgBox(26, 26, `<path d="M2 24 L13 2 L24 24 Z" fill="${c}"/>`) : kind === 1 ? svgBox(18, 18, `<circle cx="9" cy="9" r="8" fill="${c}"/>`) : svgBox(40, 18, `<path d="M3 12 Q11 2 20 10 Q29 18 37 6" fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round"/>`);
        const edge = r();
        const x = edge < 0.5 ? 120 + r() * 520 : 1280 + r() * 520;
        const y = 120 + r() * 840;
        bits.push({ el: b, x, y, rot: r() * 360, at: 0.2 + r() * 0.8, drift: (r() - 0.5) * 30 });
      }
    }

    // text, card
    const tparts = [];
    if (s.text) {
      const spec = { ...s.text, at: (s.text.at ?? 0.35) + offset };
      const t = buildText(spec, `${key}-t`);
      overlay.appendChild(t.el);
      t.el.style.left = `${s.text.x ?? (s.text.align === 'center' ? W / 2 : 150)}px`;
      t.el.style.top = `${s.text.y ?? (world ? 150 : H / 2)}px`;
      if (s.text.align === 'center') t.el.classList.add('cx');
      if (s.text.anchor === 'middle' || (!world && s.text.y === undefined)) t.el.classList.add('cy');
      tparts.push(t);
    }
    if (s.card) {
      const c = buildCard({ ...s.card, at: (s.card.at ?? 0.2) + offset }, `${key}-c`);
      overlay.appendChild(c.el);
      tparts.push(c);
    }

    // steps
    let steps = null;
    if (s.type === 'steps') {
      const list = s.steps || [];
      const gap = s.gap || 340;
      const size = s.size || 170;
      const cy = s.y ?? 470;
      const x0 = W / 2 - ((list.length - 1) * gap) / 2;
      const stepAt = (k) => (s.at ?? 0.3) + k * (s.stepGap ?? 0.75);
      const nodes = list.map((st, k) => {
        const n = el('div', 'step', overlay);
        n.style.left = `${x0 + k * gap}px`;
        n.style.top = `${cy}px`;
        const disc = el('div', 'disc cut-el', n);
        disc.style.width = disc.style.height = `${size}px`;
        disc.style.setProperty('--bg', st.color || [PAL.green, PAL.teal, PAL.navy, PAL.coral][k % 4]);
        if (st.prop) {
          const m = makeProp({ type: st.prop, h: size * 0.58, ...(st.propOptions || {}) }, `${key}-sp${k}`);
          if (m) disc.appendChild(m.inner);
        } else if (st.icon) disc.innerHTML = iconSvg(st.icon, size * 0.42, '#FFFFFF');
        const lab = el('div', 'slabel', n, esc(st.label || ''));
        lab.style.top = `${size / 2 + 30}px`;
        return { n, disc, lab, at: stepAt(k) };
      });
      const dashes = [];
      for (let k = 0; k < list.length - 1; k += 1) {
        const dl = el('div', 'dashes', overlay);
        dl.style.left = `${x0 + k * gap + size / 2 + 8}px`;
        dl.style.top = `${cy - 2}px`;
        dl.style.width = `${gap - size - 16}px`;
        dashes.push({ el: dl, at: stepAt(k) + 0.35, d: Math.max(0.2, (s.stepGap ?? 0.75) - 0.4) });
      }
      let cap = null;
      if (s.caption) {
        cap = el('div', 'scaption', overlay, esc(s.caption));
        cap.style.top = `${cy + size / 2 + 110}px`;
      }
      const capAt = stepAt(list.length - 1) + 0.6;
      steps = { nodes, dashes, cap, capAt };
    }

    // cards row
    let cardsRow = null;
    if (s.type === 'cards') {
      const list = s.cards || [];
      const cw = s.cardWidth || Math.min(420, (W - 260 - (list.length - 1) * 50) / list.length);
      const x0 = W / 2 - (list.length * cw + (list.length - 1) * 50) / 2;
      cardsRow = list.map((c, k) => {
        const card = el('div', 'mini', overlay);
        card.style.left = `${x0 + k * (cw + 50)}px`;
        card.style.top = `${s.y ?? 300}px`;
        card.style.width = `${cw}px`;
        const art = el('div', 'mini-art', card);
        art.style.setProperty('--bg', c.bg || ['#E3F0DA', '#FBEFD2', '#DDEDF2', '#FBE2DA'][k % 4]);
        if (c.prop || c.src) {
          const m = makeProp(c.src ? { src: c.src, h: 190 } : { type: c.prop, h: c.h || 170, ...(c.propOptions || {}) }, `${key}-mc${k}`);
          if (m) art.appendChild(m.inner);
        }
        el('div', 'mini-title', card, esc(c.title || ''));
        if (c.body) el('div', 'mini-body', card, esc(c.body));
        const at = (s.at ?? 0.4) + k * (s.stagger ?? 0.32);
        return { card, at, tilt: c.tilt ?? (k % 2 ? 1.6 : -1.4) };
      });
    }

    // end card
    let endc = null;
    if (s.type === 'end') {
      const box = el('div', 'endbox', overlay);
      const mark = el('div', 'mark', box);
      if (s.logo) mark.innerHTML = `<img src="${esc(s.logo)}" alt="">`;
      else if (s.prop) {
        const m = makeProp({ type: s.prop, h: s.propSize || 180, ...(s.propOptions || {}) }, `${key}-endprop`);
        if (m) {
          m.inner.style.position = 'relative';
          mark.appendChild(m.inner);
        }
      }
      else {
        const m = s.mark || {};
        mark.classList.add('mono', 'cut-el');
        mark.style.setProperty('--bg', m.color || PAL.green);
        mark.innerHTML = `<span>${esc(m.text || (s.name || '?').slice(0, 1))}</span>`;
      }
      const name = el('div', 'endname', box, esc(s.name || ''));
      const tag = s.tagline ? el('div', 'note endtag', box, esc(s.tagline)) : null;
      const url = s.url ? el('div', 'endurl', box, esc(s.url)) : null;
      endc = { mark, name, tag, url };
    }

    // ---- update ----
    function update(lt, T) {
      if (world) world.update(lt, T, dur);
      for (const { p, made, key: pk } of props) {
        const a = propAnim(p, lt, T, dur, exiting && !p.keep, pk);
        made.wrap.style.opacity = a.op;
        made.wrap.style.transform = `translate(${a.tx.toFixed(1)}px, ${a.ty.toFixed(1)}px) rotate(${a.rot.toFixed(2)}deg) scale(${a.sx.toFixed(3)}, ${a.sy.toFixed(3)})`;
      }
      for (const b of bits) {
        const q = E.back(prog(lt, b.at, 0.5));
        b.el.style.opacity = q > 0 ? 1 : 0;
        b.el.style.transform = `translate(${b.x.toFixed(0)}px, ${(b.y + Math.sin(T * 1.3 + b.rot) * 8).toFixed(1)}px) rotate(${(b.rot + T * b.drift).toFixed(1)}deg) scale(${Math.max(0, q).toFixed(3)})`;
      }
      for (const t of tparts) t.update(lt, T, exiting, dur);
      if (steps) {
        for (const nd of steps.nodes) {
          const q = prog(lt, nd.at, 0.5);
          const e = E.back(q);
          nd.disc.style.transform = `translate(-50%, -50%) scale(${Math.max(0, e).toFixed(3)}) rotate(${((1 - q) * -40 + (META.boil ? (hash(`${nd.at}-${Math.floor(T * 5)}`) - 0.5) * 1.2 : 0)).toFixed(2)}deg)`;
          nd.disc.style.opacity = q > 0 ? 1 : 0;
          const lq = E.back(prog(lt, nd.at + 0.2, 0.45));
          nd.lab.style.opacity = clamp(lq * 3);
          nd.lab.style.transform = `translate(-50%, ${((1 - lq) * 24).toFixed(1)}px)`;
        }
        for (const d of steps.dashes) d.el.style.clipPath = `inset(-10px ${((1 - E.inOut(prog(lt, d.at, d.d))) * 100).toFixed(1)}% -10px 0)`;
        if (steps.cap) {
          const q = E.out(prog(lt, steps.capAt, 0.6));
          steps.cap.style.opacity = q;
          steps.cap.style.transform = `translate(-50%, ${((1 - q) * 14).toFixed(1)}px)`;
        }
      }
      if (cardsRow) {
        for (const c of cardsRow) {
          const q = prog(lt, c.at, 0.75);
          const e = E.back(q);
          c.card.style.opacity = q > 0 ? 1 : 0;
          c.card.style.transform = `translateY(${((1 - e) * 520).toFixed(1)}px) rotate(${(c.tilt + (1 - q) * 14 + (META.boil ? (hash(`${c.at}-${Math.floor(T * 5)}`) - 0.5) * 0.5 : 0)).toFixed(2)}deg)`;
        }
      }
      if (endc) {
        const q = E.back(prog(lt, 0.3, 0.7));
        endc.mark.style.transform = `scale(${Math.max(0, q).toFixed(3)}) rotate(${((1 - clamp(q)) * -25).toFixed(1)}deg)`;
        endc.mark.style.opacity = q > 0 ? 1 : 0;
        const nq = E.out(prog(lt, 0.7, 0.6));
        endc.name.style.opacity = nq;
        endc.name.style.transform = `translateY(${((1 - nq) * 20).toFixed(1)}px)`;
        if (endc.tag) endc.tag.style.clipPath = `inset(-20% ${((1 - E.inOut(prog(lt, 1.1, 1))) * 100).toFixed(1)}% -20% 0)`;
        if (endc.url) endc.url.style.opacity = E.out(prog(lt, 1.9, 0.6));
      }
    }

    scenes.push({ index: i, type: s.type, id: s.id || '', start, dur, root, update, transition: s.transition || 'cut' });
  });

  const duration = tAcc;
  const TD = { cut: 0, fade: 0.5, push: 0.6, wipe: 0.75 };

  // ---------------- clay filters for HTML pieces (cards, discs, strips) ----------------
  {
    const named = (name, o) => {
      const f = clayFilter(1, o);
      return f.defs.replace(`id="${f.id}"`, `id="${name}"`);
    };
    const defs = el('div', 'defs', stage);
    defs.innerHTML = `<svg xmlns="${NS}" width="0" height="0" style="position:absolute"><defs>${named('clay-card', { relief: 0.5, wobble: 2.8, tex: 0.2 })}${named('clay-disc', { relief: 1.3, wobble: 2.6 })}${named('clay-strip', { relief: 0.6, wobble: 2, tex: 0.2 })}</defs></svg>`;
  }

  // ---------------- paper grain overlay ----------------
  const grain = el('div', 'grain', stage);
  grain.innerHTML = `<svg xmlns="${NS}" width="${W}" height="${H}"><filter id="pgrain" x="0" y="0"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="7"/><feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.3  0 0 0 0 0.22  0 0 0 0.55 0"/></filter><rect width="100%" height="100%" filter="url(#pgrain)"/></svg>`;
  const fibre = el('div', 'fibre', stage);
  fibre.innerHTML = `<svg xmlns="${NS}" width="${W}" height="${H}"><filter id="pfibre" x="0" y="0"><feTurbulence type="fractalNoise" baseFrequency="0.012 0.03" numOctaves="2" seed="3"/><feColorMatrix values="0 0 0 0 0.4  0 0 0 0 0.36  0 0 0 0 0.28  0 0 0 0.5 0"/></filter><rect width="100%" height="100%" filter="url(#pfibre)"/></svg>`;
  // sparse fibres and specks, like the flecks in handmade paper
  // off by default: they read as dirt on screen; meta.specks: true turns them on
  const specks = META.specks ? el('div', 'specks', stage) : { set innerHTML(v) {} };
  specks.innerHTML = `<svg xmlns="${NS}" width="${W}" height="${H}"><filter id="pspecks" x="0" y="0"><feTurbulence type="fractalNoise" baseFrequency="0.05 0.11" numOctaves="2" seed="11"/><feColorMatrix values="0 0 0 0 0.32  0 0 0 0 0.3  0 0 0 0 0.24  22 0 0 0 -16.4"/></filter><rect width="100%" height="100%" filter="url(#pspecks)"/></svg>`;
  if (META.vignette !== false) el('div', 'vignette', stage);
  const torn = el('div', 'torn', stage);
  {
    const r = rng('torn');
    let d = 'M0,0 L40,0 ';
    for (let y = 0; y <= H; y += 22) d += `L${(40 + (r() - 0.5) * 22).toFixed(1)},${y} `;
    d += `L40,${H} L0,${H} Z`;
    torn.innerHTML = `<svg xmlns="${NS}" width="60" height="${H}" overflow="visible"><path d="${d}" fill="#FBF7EE"/></svg>`;
  }

  // ---------------- seek ----------------
  function seek(T) {
    T = clamp(T, 0, duration - 1e-4);
    stage.style.setProperty('--t', T.toFixed(4));
    let i = scenes.findIndex((s) => T >= s.start && T < s.start + s.dur);
    if (i < 0) i = scenes.length - 1;
    const cur = scenes[i];
    const lt = T - cur.start;
    const td = TD[cur.transition] || 0;
    const prev = i > 0 && lt < td ? scenes[i - 1] : null;
    for (const s of scenes) {
      if (s !== cur && s !== prev) {
        s.root.style.visibility = 'hidden';
        continue;
      }
      s.root.style.visibility = 'visible';
      s.root.style.transform = 'none';
      s.root.style.opacity = 1;
      s.root.style.clipPath = 'none';
      s.root.style.filter = 'none';
      s.root.style.zIndex = s === cur ? 2 : 1;
    }
    torn.style.visibility = 'hidden';
    if (prev) {
      prev.update(T - prev.start, T);
      const p = lt / td;
      if (cur.transition === 'fade') cur.root.style.opacity = E.inOut(p);
      else if (cur.transition === 'push') {
        const e = E.inOut(p);
        const blur = Math.sin(p * Math.PI) * 10;
        prev.root.style.transform = `translateX(${(-e * W).toFixed(1)}px)`;
        cur.root.style.transform = `translateX(${((1 - e) * W).toFixed(1)}px)`;
        prev.root.style.filter = cur.root.style.filter = blur > 0.5 ? `blur(${blur.toFixed(1)}px)` : 'none';
      } else if (cur.transition === 'wipe') {
        const e = E.inOut(p);
        const x = (1 - e) * (W + 60);
        cur.root.style.clipPath = `inset(0 0 0 ${x.toFixed(1)}px)`;
        torn.style.visibility = 'visible';
        torn.style.transform = `translateX(${(x - 40).toFixed(1)}px)`;
      }
    }
    cur.update(lt, T);
    film.time = T;
    if (player) player.sync(T);
  }

  // ---------------- icons ----------------
  function iconSvg(name, size, color) {
    const nodes = (window.FILM_ICONS || {})[name];
    if (!nodes) return '';
    const inner = nodes.map(([tag, attrs]) => `<${tag} ${Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ')}/>`).join('');
    return `<svg xmlns="${NS}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
  }

  // ---------------- fit + player ----------------
  const viewport = document.getElementById('viewport');
  function fit() {
    if (RENDER) {
      stage.style.transform = 'none';
      return;
    }
    const s = Math.min(window.innerWidth / W, (window.innerHeight - 56) / H);
    stage.style.transform = `scale(${s})`;
  }
  let player = null;
  if (!RENDER) {
    document.body.classList.add('preview');
    const bar = document.getElementById('player');
    bar.innerHTML = '<button id="pp">Play</button><input id="scrub" type="range" min="0" step="0.001"><span id="tc"></span>';
    const pp = bar.querySelector('#pp');
    const scrub = bar.querySelector('#scrub');
    const tc = bar.querySelector('#tc');
    scrub.max = String(duration);
    let playing = false;
    let t0 = 0;
    let wall = 0;
    const loop = (now) => {
      if (!playing) return;
      const T = t0 + (now - wall) / 1000;
      if (T >= duration) {
        playing = false;
        pp.textContent = 'Play';
        seek(duration);
        return;
      }
      seek(T);
      requestAnimationFrame(loop);
    };
    const toggle = () => {
      playing = !playing;
      pp.textContent = playing ? 'Pause' : 'Play';
      if (playing) {
        t0 = film.time >= duration - 0.05 ? 0 : film.time;
        wall = performance.now();
        requestAnimationFrame(loop);
      }
    };
    pp.onclick = toggle;
    scrub.oninput = () => {
      playing = false;
      pp.textContent = 'Play';
      seek(Number(scrub.value));
    };
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        toggle();
      } else if (e.key === 'ArrowRight') seek(film.time + 1 / FPS);
      else if (e.key === 'ArrowLeft') seek(film.time - 1 / FPS);
      else if (e.key === ']') seek((scenes.find((s) => s.start > film.time + 0.01) || scenes[scenes.length - 1]).start);
      else if (e.key === '[') seek([...scenes].reverse().find((s) => s.start < film.time - 0.05)?.start || 0);
    });
    player = { sync: (T) => { scrub.value = String(T); tc.textContent = `${T.toFixed(2)} / ${duration.toFixed(2)}s`; } };
    window.addEventListener('resize', fit);
  }
  fit();
  if (viewport && RENDER) viewport.classList.add('render');

  const imgs = [...stage.querySelectorAll('img')].map((im) => (im.complete ? Promise.resolve() : new Promise((r) => { im.onload = im.onerror = r; })));
  const film = {
    duration,
    fps: FPS,
    time: 0,
    scenes: scenes.map(({ index, type, id, start, dur, transition }) => ({ index, type, id, start, dur, transition })),
    seek,
    ready: Promise.all([document.fonts.ready, ...imgs]).then(() => seek(0)),
  };
  window.__film = film;
  seek(0);
})();
