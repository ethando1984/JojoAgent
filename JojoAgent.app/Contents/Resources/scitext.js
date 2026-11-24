// scitext.js — shows math, physics and chemistry written in LaTeX as readable Unicode text:
//   $E = mc^2$ → E = mc²   \ce{2H2 + O2 -> 2H2O} → 2H₂ + O₂ → 2H₂O   \frac{a+b}{2} → (a+b)/2   \alpha → α
// One source for every jojo chat surface: the voice subtitles (view.html), the Windows chat (chat.html,
// inlined by the host) and the macOS chat (Host.m runs it in JavaScriptCore). No DOM, no dependencies.
// Formulas are found in $…$, $$…$$, \(…\), \[…\] and bare \ce{…} / \pu{…}; code (``` fences and `spans`)
// and money ("$5 and $10") are left as written. Anything it does not know stays as typed.
(function (root) {
  'use strict';

  const SYMBOLS = {
    // Greek
    alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', epsilon: 'ε', varepsilon: 'ε', zeta: 'ζ', eta: 'η',
    theta: 'θ', vartheta: 'ϑ', iota: 'ι', kappa: 'κ', lambda: 'λ', mu: 'μ', nu: 'ν', xi: 'ξ', omicron: 'ο',
    pi: 'π', varpi: 'ϖ', rho: 'ρ', varrho: 'ϱ', sigma: 'σ', varsigma: 'ς', tau: 'τ', upsilon: 'υ', phi: 'φ',
    varphi: 'φ', chi: 'χ', psi: 'ψ', omega: 'ω',
    Gamma: 'Γ', Delta: 'Δ', Theta: 'Θ', Lambda: 'Λ', Xi: 'Ξ', Pi: 'Π', Sigma: 'Σ', Upsilon: 'Υ', Phi: 'Φ',
    Psi: 'Ψ', Omega: 'Ω',
    // Operators and relations
    times: '×', cdot: '·', div: '÷', pm: '±', mp: '∓', ast: '∗', star: '⋆', circ: '∘', bullet: '•',
    le: '≤', leq: '≤', ge: '≥', geq: '≥', ne: '≠', neq: '≠', approx: '≈', simeq: '≃', cong: '≅', equiv: '≡',
    sim: '∼', propto: '∝', ll: '≪', gg: '≫', lt: '<', gt: '>', perp: '⊥', parallel: '∥', mid: '∣',
    // Arrows (also reactions)
    to: '→', rightarrow: '→', leftarrow: '←', gets: '←', leftrightarrow: '↔', Rightarrow: '⇒', implies: '⇒',
    Leftarrow: '⇐', Leftrightarrow: '⇔', iff: '⇔', rightleftharpoons: '⇌', longrightarrow: '⟶',
    longleftarrow: '⟵', mapsto: '↦', uparrow: '↑', downarrow: '↓', nearrow: '↗', searrow: '↘',
    // Big operators and calculus
    sum: '∑', prod: '∏', coprod: '∐', int: '∫', iint: '∬', iiint: '∭', oint: '∮', partial: '∂', nabla: '∇',
    infty: '∞', lim: 'lim', sin: 'sin', cos: 'cos', tan: 'tan', cot: 'cot', sec: 'sec', csc: 'csc',
    arcsin: 'arcsin', arccos: 'arccos', arctan: 'arctan', sinh: 'sinh', cosh: 'cosh', tanh: 'tanh',
    log: 'log', ln: 'ln', lg: 'lg', exp: 'exp', max: 'max', min: 'min', det: 'det', gcd: 'gcd', deg: 'deg',
    // Sets and logic
    in: '∈', notin: '∉', ni: '∋', subset: '⊂', supset: '⊃', subseteq: '⊆', supseteq: '⊇', cup: '∪', cap: '∩',
    setminus: '∖', emptyset: '∅', varnothing: '∅', forall: '∀', exists: '∃', nexists: '∄', neg: '¬', lnot: '¬',
    land: '∧', wedge: '∧', lor: '∨', vee: '∨', oplus: '⊕', otimes: '⊗', therefore: '∴', because: '∵',
    // Physics and misc
    hbar: 'ħ', ell: 'ℓ', degree: '°', angle: '∠', triangle: '△', square: '□', prime: '′', dagger: '†',
    aleph: 'ℵ', Re: 'ℜ', Im: 'ℑ', wp: '℘', AA: 'Å', ohm: 'Ω', micro: 'µ', permil: '‰', percent: '%',
    langle: '⟨', rangle: '⟩', lceil: '⌈', rceil: '⌉', lfloor: '⌊', rfloor: '⌋', vert: '|', Vert: '‖',
    ldots: '…', cdots: '⋯', dots: '…', vdots: '⋮', ddots: '⋱',
    lbrace: '{', rbrace: '}', '{': '{', '}': '}', '%': '%', '$': '$', '&': '&', '#': '#', _: '_',
    quad: '  ', qquad: '    ', ',': ' ', ';': ' ', ':': ' ', ' ': ' ', '!': '',
    left: '', right: '', big: '', Big: '', bigg: '', Bigg: '', displaystyle: '', textstyle: '',
    limits: '', nolimits: '', middle: '',
  };
  const SUP = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
    '+': '⁺', '-': '⁻', '−': '⁻', '=': '⁼', '(': '⁽', ')': '⁾', ' ': ' ',
    a: 'ᵃ', b: 'ᵇ', c: 'ᶜ', d: 'ᵈ', e: 'ᵉ', f: 'ᶠ', g: 'ᵍ', h: 'ʰ', i: 'ⁱ', j: 'ʲ', k: 'ᵏ', l: 'ˡ', m: 'ᵐ',
    n: 'ⁿ', o: 'ᵒ', p: 'ᵖ', r: 'ʳ', s: 'ˢ', t: 'ᵗ', u: 'ᵘ', v: 'ᵛ', w: 'ʷ', x: 'ˣ', y: 'ʸ', z: 'ᶻ',
    T: 'ᵀ', '*': '*', '′': '′', '∘': '°', '°': '°',
  };
  const SUB = {
    '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
    '+': '₊', '-': '₋', '−': '₋', '=': '₌', '(': '₍', ')': '₎', ' ': ' ',
    a: 'ₐ', e: 'ₑ', h: 'ₕ', i: 'ᵢ', j: 'ⱼ', k: 'ₖ', l: 'ₗ', m: 'ₘ', n: 'ₙ', o: 'ₒ', p: 'ₚ', r: 'ᵣ', s: 'ₛ',
    t: 'ₜ', u: 'ᵤ', v: 'ᵥ', x: 'ₓ',
  };
  const ACCENT = { vec: '⃗', hat: '̂', bar: '̄', overline: '̅', dot: '̇', ddot: '̈', tilde: '̃', widehat: '̂', widetilde: '̃', overrightarrow: '⃗' };
  const TEXT_LIKE = new Set(['text', 'textrm', 'textbf', 'textit', 'mathrm', 'mathbf', 'mathit', 'mathsf', 'mathtt', 'mathcal', 'mathscr', 'mathfrak', 'operatorname', 'boldsymbol', 'bm', 'mbox', 'unit', 'si', 'textnormal']);
  const DOUBLE_STRUCK = { N: 'ℕ', Z: 'ℤ', Q: 'ℚ', R: 'ℝ', C: 'ℂ', P: 'ℙ', H: 'ℍ', E: '𝔼' };

  // Reads one argument: a {group} or a single (possibly \command) token. Returns [text, nextIndex].
  function arg(s, i) {
    while (s[i] === ' ') i++;
    if (s[i] === '{') {
      let depth = 0;
      for (let j = i; j < s.length; j++) {
        if (s[j] === '\\') { j++; continue; }
        if (s[j] === '{') depth++;
        else if (s[j] === '}' && --depth === 0) return [s.slice(i + 1, j), j + 1];
      }
      return [s.slice(i + 1), s.length];
    }
    if (s[i] === '\\') {
      const m = /^\\([A-Za-z]+|.)/.exec(s.slice(i));
      if (m) return [m[0], i + m[0].length];
    }
    return [s[i] || '', i + 1];
  }
  const optional = (s, i) => {
    if (s[i] !== '[') return [null, i];
    const end = s.indexOf(']', i);
    return end < 0 ? [null, i] : [s.slice(i + 1, end), end + 1];
  };

  function script(text, table, mark) {
    if (!text) return '';
    const chars = Array.from(text);
    if (chars.every(c => table[c])) return chars.map(c => table[c]).join('');
    return chars.length === 1 ? mark + text : mark + '(' + text + ')';
  }
  // Wraps a fraction part in brackets when it is more than one term
  const part = t => (/^(\d+([.,]\d+)?|\p{L}\p{M}*[′⁰¹²³⁴-⁹]*|∞)$/u.test(t) || /^\([^()]*\)$/.test(t) ? t : '(' + t + ')');

  // LaTeX math (no delimiters) → Unicode text
  function math(s) {
    let out = '';
    let i = 0;
    while (i < s.length) {
      const c = s[i];
      if (c === '\\') {
        const m = /^\\([A-Za-z]+|.)/.exec(s.slice(i));
        if (!m) { out += c; i++; continue; }
        const name = m[1];
        i += m[0].length;
        if (name === 'frac' || name === 'dfrac' || name === 'tfrac' || name === 'cfrac') {
          const [a, j] = arg(s, i); const [b, k] = arg(s, j); i = k;
          out += part(math(a)) + '/' + part(math(b));
        } else if (name === 'sqrt') {
          const [n, j] = optional(s, i); const [a, k] = arg(s, j); i = k;
          const root = n === '3' ? '∛' : n === '4' ? '∜' : (n ? script(math(n), SUP, '') + '√' : '√');
          const inner = math(a);
          out += root + (/^[\p{L}\p{N}]$/u.test(inner) || /^\d+$/.test(inner) ? inner : '(' + inner + ')');
        } else if (name === 'ce') {
          const [a, j] = arg(s, i); i = j; out += chem(a);
        } else if (name === 'pu') {
          const [a, j] = arg(s, i); i = j; out += units(a);
        } else if (name === 'mathbb') {
          const [a, j] = arg(s, i); i = j; out += Array.from(a).map(ch => DOUBLE_STRUCK[ch] || ch).join('');
        } else if (TEXT_LIKE.has(name)) {
          const [a, j] = arg(s, i); i = j; out += name.startsWith('text') || name === 'mbox' ? a : math(a);
        } else if (ACCENT[name]) {
          const [a, j] = arg(s, i); i = j;
          const inner = math(a);
          out += Array.from(inner).length === 1 ? inner + ACCENT[name] : inner + (name === 'vec' || name === 'overrightarrow' ? '⃗' : ACCENT[name]);
        } else if (name === 'binom') {
          const [a, j] = arg(s, i); const [b, k] = arg(s, j); i = k;
          out += 'C(' + math(a) + ', ' + math(b) + ')';
        } else if (name === 'begin' || name === 'end') {
          const [, j] = arg(s, i); i = j; out += name === 'end' ? ' ' : '';
        } else if (name === '\\') {
          out += '; ';
        } else if (Object.prototype.hasOwnProperty.call(SYMBOLS, name)) {
          out += SYMBOLS[name];
          if (/^[A-Za-z]+$/.test(name) && /^[a-z]{2,}$/.test(SYMBOLS[name]) && /^[\p{L}\p{N}\\]/u.test(s.slice(i).replace(/^ /, ''))) out += ' ';
        } else {
          out += m[0];   // unknown command: keep as typed
        }
        // "\Delta E" → ΔE, "\forall x" → ∀x; around operators ("\alpha + \beta") the spaces stay.
        if (s[i] === ' ' && /^[\p{L}∀∃∂∇¬]$/u.test(SYMBOLS[name] || '') && /[\p{L}\p{N}]/u.test(s[i + 1] || '')) i++;
        continue;
      }
      if (c === '^' || c === '_') {
        const [a, j] = arg(s, i + 1); i = j;
        out += script(math(a), c === '^' ? SUP : SUB, c);
        continue;
      }
      if (c === '{' || c === '}') { i++; continue; }
      if (c === '~') { out += ' '; i++; continue; }
      if (c === '&') { out += ' '; i++; continue; }
      if (c === '-' ) { out += '−'; i++; continue; }
      if (c === '*' ) { out += '·'; i++; continue; }
      out += c;
      i++;
    }
    return out.replace(/ {2,}(?=\S)/g, m => (m.length >= 4 ? m : ' ')).replace(/\s+$/, '');
  }

  // mhchem \ce{…}: H2O → H₂O, SO4^2- → SO₄²⁻, -> → →, <=> → ⇌, (aq) kept, ^ (gas) → ↑, v (precipitate) → ↓
  function chem(s) {
    let t = s
      .replace(/<=>>|<<=>|<=>/g, ' ⇌ ').replace(/<->/g, ' ↔ ').replace(/->|→/g, ' → ').replace(/<-/g, ' ← ')
      .replace(/\s+\^(?=\s|$)/g, ' ↑').replace(/\s+v(?=\s|$)/g, ' ↓')
      .replace(/\s*[*·]\s*/g, '·').replace(/\$([^$]*)\$/g, (m, x) => math(x));
    // charges: ^{2+} / ^2- / ^+ / ^-
    t = t.replace(/\^\{([^}]*)\}|\^([0-9]*[+\-−])|\^([0-9]+)/g, (m, a, b, c) => script(a || b || c, SUP, '^'));
    // an ion written without ^: Fe3+ → Fe³⁺ (the digits are its charge, not a subscript)
    t = t.replace(/([A-Za-z\)\]])(\d+)([+\-])(?=\s|$|[,;)])/g, (m, el, n, ch) => el + script(n + ch, SUP, '^'));
    // subscripts: digits right after an element symbol, a closing bracket or a charge-free group
    t = t.replace(/([A-Za-z\)\]])(\d+)/g, (m, el, n) => el + script(n, SUB, '_'));
    t = t.replace(/_\{([^}]*)\}|_(\d+)/g, (m, a, b) => script(a || b, SUB, '_'));
    // a bare trailing charge: Na+ , Cl- , Fe3+ (not "->", handled above)
    t = t.replace(/([A-Za-z₀-₉\)\]])([+\-])(?=\s|$|[,;)])/g, (m, el, ch) => el + (ch === '+' ? '⁺' : '⁻'));
    t = t.replace(/\\[A-Za-z]+(\{[^}]*\})?/g, m => math(m));
    return t.replace(/\s{2,}/g, ' ').trim();
  }

  // mhchem \pu{…}: 9.8 m/s^2 → 9.8 m/s², kJ mol^-1 → kJ mol⁻¹, 1e-3 → 1·10⁻³
  function units(s) {
    let t = s.replace(/(\d)\s*[eE]([+\-]?\d+)/g, (m, d, e) => d + '·10' + script(e.replace('-', '−'), SUP, '^'));
    t = t.replace(/\^\{([^}]*)\}|\^([+\-]?\d+)/g, (m, a, b) => script(a || b, SUP, '^'));
    t = t.replace(/\\[A-Za-z]+(\{[^}]*\})?/g, m => math(m));
    return t.replace(/\s*\*\s*|\s*\.\s+(?=[A-Za-z])/g, '·').trim();
  }

  // Formulas in one stretch of prose (no code in it)
  function prose(s) {
    let out = '';
    let i = 0;
    while (i < s.length) {
      const c = s[i];
      if (c === '\\') {
        const n = s[i + 1];
        let end;
        if (n === '[' && (end = s.indexOf('\\]', i + 2)) >= 0) { out += math(s.slice(i + 2, end).trim()); i = end + 2; continue; }
        if (n === '(' && (end = s.indexOf('\\)', i + 2)) >= 0) { out += math(s.slice(i + 2, end).trim()); i = end + 2; continue; }
        if (s.startsWith('\\ce{', i) || s.startsWith('\\pu{', i)) {
          const [a, j] = arg(s, i + 3);
          if (j <= s.length && s[j - 1] === '}') { out += s[i + 1] === 'c' ? chem(a) : units(a); i = j; continue; }
        }
        out += c + (n || '');
        i += 2;
        continue;
      }
      if (c === '$') {
        const double = s[i + 1] === '$';
        const open = double ? 2 : 1;
        // money: $5, $1,200.50, $3k — followed by a space / punctuation / end
        if (!double && /^\$\d[\d.,]*[kKmMbB]?(?=[\s.,;:!?)\]]|$)/.test(s.slice(i)) && !/^\$\d[\d.,]*\$/.test(s.slice(i))) { out += c; i++; continue; }
        const end = s.indexOf(double ? '$$' : '$', i + open);
        const body = end >= 0 ? s.slice(i + open, end) : '';
        if (end > i + open && body.trim() && (double || !/\n\s*\n/.test(body)) && (double || !/^\s|\s$/.test(body))) {
          out += math(body.trim());
          i = end + open;
          continue;
        }
      }
      out += c;
      i++;
    }
    return out;
  }

  function line(text) {
    let out = '';
    let pos = 0;
    const re = /(`+)[^`]*?\1/g;
    let m;
    while ((m = re.exec(text))) {
      out += prose(text.slice(pos, m.index)) + m[0];
      pos = m.index + m[0].length;
    }
    return out + prose(text.slice(pos));
  }

  function sciText(md) {
    if (typeof md !== 'string' || !/[\\$]/.test(md)) return md;
    const out = [];
    let chunk = [];
    let fence = null;
    const flush = () => { if (chunk.length) out.push(line(chunk.join('\n'))); chunk = []; };
    for (const l of md.split('\n')) {
      const f = /^\s{0,3}(`{3,}|~{3,})/.exec(l);
      if (fence) {
        out.push(l);
        if (f && f[1][0] === fence[0] && f[1].length >= fence.length) fence = null;
        continue;
      }
      if (f) { flush(); fence = f[1]; out.push(l); continue; }
      chunk.push(l);
    }
    flush();
    return out.join('\n');
  }

  root.sciText = sciText;
  if (typeof module === 'object' && module.exports) module.exports = { sciText, math, chem, units };
})(typeof globalThis !== 'undefined' ? globalThis : this);
