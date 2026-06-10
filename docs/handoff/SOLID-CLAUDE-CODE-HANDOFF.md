# SOLID — Complete Brand & Build Handoff
### For Claude Code · v1.0 · June 2026
*Single source of truth. Everything decided to date is in this document.*

---

## 1. The brand in one paragraph

**Solid is a baseball-card brand that happens to sell slow-pitch softball bats.** Every edition is a numbered run of 200 bats; every bat ships with a numbered collectible card (same serial); every edition is dedicated to a cause — $25 per bat, totals published ("receipts on file"). Founded by a father and son from Vacaville, California. Bats built in the USA by Pure Sports Technologies. ASA/USSSA certified. Editions to date: 001 GLOVES UP (RBI), 002 HOMEFRONT (Wounded Warrior Project), 003 ST. JUDE (live).

> Positioning: For league players who grew up ripping wax packs, Solid is the bat brand whose every release is a collectible, numbered, cause-dedicated drop — because the cards we traded as kids can trade *for* kids now.

---

## 2. Logo — "The Period" (LOCKED for v1)

**The mark is `SOLID.` — Oswald 700 uppercase with a red square period.**

| Asset | File | Use |
|---|---|---|
| Wordmark (navy) | `brand/logo/solid-wordmark-navy.svg` | On powder/cream grounds |
| Wordmark (cream) | `brand/logo/solid-wordmark-cream.svg` | On navy/red/stadium grounds |
| Bug | `brand/logo/solid-bug.svg` | Favicon, app icon, card corner — a plain red square |

**CSS lockup (preferred in-site — crisper than SVG text):**
```html
<span class="logo">SOLID<span class="logo-dot">.</span></span>
```
```css
.logo { font-family: 'Oswald', sans-serif; font-weight: 700;
        text-transform: uppercase; letter-spacing: 0.02em; color: var(--navy); }
.logo-dot { color: var(--red); }
/* on dark grounds: .logo { color: var(--cream); } — dot stays red */
```

**Rules:**
1. The period is ALWAYS red (`--red #C8201A`) — except on red grounds, where it flips to navy.
2. The period appears everywhere the wordmark does. No period-less version.
3. Favicon = the red square alone. No letter in it.
4. Voice tie-in: brand statements may end "…SOLID." — the mark doubles as punctuation.
5. v2 evolution is allowed to change letterforms; the red period is permanent.

---

## 3. Brand mechanics (the system)

| Mechanic | Rule |
|---|---|
| **Editions** | Numbered 001, 002, 003… Always 200 units. Never reprinted. |
| **Cards** | Every bat ships with its numbered card. Serial matches the bat (047/200). |
| **Causes** | One cause per edition. Exactly $25/bat. Totals published live. |
| **Chase card** | Next edition's cause is voted on by current edition owners. |
| **Language** | You don't buy a bat — you **pull** it. CTA: "PULL NO. 048 →" |
| **The Set** | The archive is a card binder. "The set isn't done until the cause is." |

---

## 4. Voice

Collector confidence, warm underneath. Stats-literate, never solemn, no fake urgency.

| Say | Never |
|---|---|
| "Pull No. 048" | "Buy now" (checkout UI may use cart language) |
| "Rookie card, rookie cause" | "Limited edition luxury item" |
| "047/200 pulled" | "Only 153 left!!" |
| "Receipts on file" | "A portion of proceeds" |
| "The set isn't done until the cause is" | Charity guilt-language |

Founders' line (use widely): *"We grew up trading cards. Now the cards trade for kids."*

---

## 5. Color — "Powder Inverted" (LOCKED)

| Token | Hex | Role |
|---|---|---|
| `--powder` | #B5CFE8 | Page ground. THE brand color. |
| `--powder-2` | #A4C0DD | Alt sections, nav |
| `--powder-3` | #94B3D2 | Deepest tint |
| `--navy` | #14213D | Ink — all text on powder |
| `--navy-2` | #3A4660 | Secondary text |
| `--navy-3` | #6B7785 | Captions |
| `--red` | #C8201A | Action — CTAs, nameplates, LIVE badges, the logo period |
| `--red-dark` | #8C1410 | Hover / gradient end |
| `--cream` | #F2EBD8 | Card stock + text-on-red |
| `--stadium-black` | #0F0F0E | Hero ground ONLY (one per page) |
| `--gold` | #D9A93A | Foil stamps, RC badges, edition 001 |
| `--chrome` | #C9CDD3 | Foil card borders |

**Rules:** (1) Powder is ground, never accent. (2) Red is rationed — never body text. (3) One black section per page: the hero. (4) Text on red = cream; on powder = navy; on gold = black; NEVER cream-on-gold/yellow. (5) Gold + chrome live on cards only.

Full tokens (gradients, scanlines, shadows, photo filters): **`brand/tokens.css`** — import as-is.

---

## 6. Typography (Google Fonts)

| Face | Role |
|---|---|
| **Oswald 700** (uppercase) | Display, headlines, jersey numerals, the logo |
| **Alfa Slab One** | Card nameplates + big stat numbers |
| **Bungee** (uppercase, tracked .16–.22em, ≥10px) | Stamps, tickers, eyebrows, CTAs |
| **Newsreader italic** | Editorial/founders' voice only |
| **IBM Plex Sans 300–700** | UI body |
| **IBM Plex Mono** | MANDATORY for anything numbered: serials, specs, donations |

---

## 7. The card (core artifact)

Anatomy (reference component `PaletteCard` in `palette-dev-v2.jsx`):
cream stock frame → chrome-foil gradient border → photo region 74% (B&W documentary, scanline overlay) → hologram corner (top-right) → edition stamp (top-left, Bungee) → RC/status stamp (bottom-right, gold, rotated −12°) → red-gradient nameplate (bottom 26%: cause in Alfa Slab, SN + RAISED in mono) → SOLID bug on top edge (rotated −2°).

Photography: B&W documentary (`--photo-doc`). Currently sports placeholders from `assets/`; swap to real cause-subject portraits when permissions land.

---

## 8. Site to build (v1)

Design reference: **`Palette Development v2.html` → artboard B (Powder Inverted)**. Components: `procard-stadium-home.jsx` + `palette-dev-v2.jsx`.

| Page | Purpose |
|---|---|
| `/` | Home — port artboard B 1:1: nav → stadium hero (B&W photo, 720px numeral, hero card, 2 CTAs) → Roster (4-card binder) → Career Numbers (foil stat blocks) → founders' red quote block → email capture → Bungee footer ticker |
| `/editions/003` | The buy page: card hero, mono spec table, donation tracker, Shopify buy. 001/002 render sold-out. |
| `/the-set` | Archive as card binder; sold-out cards grayscale; chase-card vote teaser |
| `/story` | Short founders page — Vacaville, father & son, Pure Sports Tech |
| Checkout | Shopify-hosted. Never custom. |

**Responsive:** reference is 1280px. Hero numeral scales vw-based; binder 4→2→1 columns; hero card stays visible on mobile.

---

## 9. Shopify integration

**Recommended: headless via Shopify Storefront API** (catalog is tiny; design too custom for Liquid themes).

1. **Stack:** Astro or Next.js static. Import `brand/tokens.css` directly.
2. **Admin setup:** one product per edition ("Solid 003 — St. Jude Edition", $279 placeholder). Metafields: `edition_number`, `cause_name`, `cause_url`, `donation_per_unit` (2500 cents), `total_units` (200).
3. **API:** `product(handle)` → price/inventory/metafields. `cartCreate`/`cartLinesAdd` → redirect to `cart.checkoutUrl`.
4. **Pull counter:** `pulled = 200 − inventoryQuantity`; CTA number = `pulled + 1` zero-padded.
5. **Donation tracker:** `unitsSold × $25`; `/receipts` static page per disbursement.
6. **Serials:** assigned at fulfillment, not purchase. Confirmation: "Your number is being stamped."
7. **Email:** Shopify `customerCreate` w/ `acceptsMarketing` (or Klaviyo).

**Fallback:** static site + Shopify Buy Button SDK on the edition page only; drive it from a brand-styled button.

---

## 10. Implementation rules

- Tokens are law — no new colors. One stadium-black section per page.
- The card is a faithful component port. The card IS the brand.
- "Pull" language everywhere except Shopify checkout.
- All numbers in mono. Serials zero-padded (047, not 47).
- Photos: `--photo-doc` (cards) / `--photo-hero` (hero) filters.
- A11y: powder/navy passes AA; red-on-powder is large-text only.
- Favicon: `brand/logo/solid-bug.svg` (red square).

## 11. What this document contains

**This document is fully self-contained.** Appendices A–D embed the production tokens, the approved palette values, and the two reference components (card + home page) verbatim. No other files are required to build v1 — though the repo also carries the same code as standalone files (`brand/tokens.css`, `palette-dev-v2.jsx`, `procard-stadium-home.jsx`) and the visual reference `Palette Development v2.html` (artboard B) if you prefer to view them rendered.

## 12. Open items (owner to answer)

1. Shopify store URL + Storefront API token
2. Final price ($279 is placeholder)
3. Cause-subject photography + permissions
4. Domain; email to Shopify or Klaviyo
5. Physical card production vendor

---

# APPENDIX A — tokens.css (production-ready, import as-is)

```css
/* ════════════════════════════════════════════════════════════════
   SOLID — Design Tokens
   Procard × Stadium · Powder Inverted · v1.0
   Import:  <link rel="stylesheet" href="tokens.css">
   Fonts:   Oswald 400-700 · Alfa Slab One · Bungee · Newsreader ital
            IBM Plex Sans 300-700 · IBM Plex Mono 400-600  (Google Fonts)
   ════════════════════════════════════════════════════════════════ */

:root {
  /* ── GROUND (powder — the brand color) ── */
  --powder:        #B5CFE8;   /* page ground */
  --powder-2:      #A4C0DD;   /* alt sections, nav */
  --powder-3:      #94B3D2;   /* deepest tint, wells */

  /* ── INK (navy) ── */
  --navy:          #14213D;   /* primary text on powder */
  --navy-2:        #3A4660;   /* secondary text */
  --navy-3:        #6B7785;   /* captions, disabled */

  /* ── ACTION (baseball red — rationed) ── */
  --red:           #C8201A;   /* CTAs, nameplates, LIVE badges */
  --red-dark:      #8C1410;   /* hover, gradient end */
  --ink-on-red:    #F2EBD8;   /* the ONLY text color on red */

  /* ── ARTIFACT (card materials) ── */
  --cream:         #F2EBD8;   /* card stock */
  --gold:          #D9A93A;   /* foil stamps, RC badge, ed.001 */
  --chrome:        #C9CDD3;   /* foil borders */

  /* ── STADIUM (hero only) ── */
  --stadium-black: #0F0F0E;   /* hero ground — ONE per page max */
  --hero-text:     #F5F2E8;   /* text over hero photo */
  --hero-text-2:   #C8C4B5;

  /* ── EDITION COLORS (card nameplates per release) ── */
  --ed-001:        #D9A93A;   /* GLOVES UP — gold */
  --ed-002:        #14213D;   /* HOMEFRONT — navy */
  --ed-003:        #C8201A;   /* ST. JUDE — red (current) */

  /* ── TYPE ── */
  --font-display:  'Oswald', 'Anton', sans-serif;          /* 700 uppercase */
  --font-slab:     'Alfa Slab One', serif;                  /* card voice */
  --font-kinetic:  'Bungee', sans-serif;                    /* stamps, CTAs */
  --font-serif:    'Newsreader', Georgia, serif;            /* italic editorial */
  --font-body:     'IBM Plex Sans', system-ui, sans-serif;
  --font-mono:     'IBM Plex Mono', monospace;              /* serials, stats */

  --track-stamp:   0.18em;    /* Bungee letter-spacing range .16–.22em */
  --track-display: 0.005em;

  /* ── SPACING (8pt) ── */
  --s-1: 4px;  --s-2: 8px;   --s-3: 12px; --s-4: 16px;
  --s-5: 24px; --s-6: 32px;  --s-7: 48px; --s-8: 64px;
  --s-9: 80px; --s-10: 96px;

  /* ── RADII — flat brand, cards are sharp ── */
  --radius: 0;

  /* ── FOIL GRADIENTS ── */
  --foil-chrome: linear-gradient(135deg, var(--chrome), #fff 25%, var(--chrome) 50%, #fff 75%, var(--chrome));
  --foil-holo:   conic-gradient(from 0deg, var(--gold), var(--chrome), var(--gold), var(--chrome), var(--gold));
  --plate-red:   linear-gradient(180deg, var(--red), var(--red-dark));

  /* ── TEXTURE ── */
  --scanlines:   repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0 1px, transparent 1px 3px);
  --crosshatch:  repeating-linear-gradient(45deg, transparent 0 18px, rgba(0,0,0,0.025) 18px 19px),
                 repeating-linear-gradient(-45deg, transparent 0 18px, rgba(0,0,0,0.025) 18px 19px);

  /* ── SHADOW ── */
  --shadow-card: 0 8px 24px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.6) inset;

  /* ── PHOTO TREATMENTS ── */
  --photo-doc:   grayscale(1) contrast(1.25) brightness(0.92);  /* cards */
  --photo-hero:  grayscale(1) contrast(1.3) brightness(0.55);   /* hero */
}

/* ── SEMANTIC BASICS ───────────────────────────────────────────── */
body {
  background: var(--powder);
  color: var(--navy);
  font-family: var(--font-body);
}

h1, h2, h3 {
  font-family: var(--font-display);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: var(--track-display);
  line-height: 0.95;
  color: var(--navy);
}

.stat, .serial { font-family: var(--font-mono); }
.nameplate, .stat-number { font-family: var(--font-slab); }
.editorial { font-family: var(--font-serif); font-style: italic; }

.stamp, .eyebrow, .ticker {
  font-family: var(--font-kinetic);
  text-transform: uppercase;
  letter-spacing: var(--track-stamp);
}

.btn-primary {
  background: var(--red);
  color: var(--ink-on-red);
  font-family: var(--font-display);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  border: none;
  padding: 16px 24px;
  cursor: pointer;
}
.btn-primary:hover { background: var(--red-dark); }

.btn-ghost {
  background: transparent;
  color: var(--navy);
  border: 2px solid var(--navy);
  font-family: var(--font-display);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  padding: 14px 22px;
  cursor: pointer;
}
```

---

# APPENDIX B — The approved palette object ("Powder Inverted")

This is the exact palette the approved design renders with. The home component (Appendix D) consumes this object as its `palette` prop.

```js
// 2 ─── POWDER INVERTED — powder blue ground, navy ink, red accent
  {
    id: 'powder',
    name: 'B · Powder Inverted',
    sub: 'Powder ground + navy + red',
    pitch: 'Vintage Cubs road uniform. Calmest of the family — the only light-ground option.',
    swatches: ['#B5CFE8', '#14213D', '#C8201A', '#F2EBD8', '#D9A93A'],
    palette: {
      ground: 'light',
      bg: '#B5CFE8', bgAlt: '#A4C0DD', surface: '#94B3D2',
      heroGround: '#0F0F0E',     // hero stays black for contrast
      fg: '#14213D', fg2: '#3A4660', fg3: '#6B7785',
      accent: '#C8201A',         // baseball red
      accentDark: '#8C1410',
      accentInk: '#F2EBD8',      // cream ink reads on red
      cardAccent: '#C8201A',
      heroNumeral: '#B5CFE8',
      cardStock: '#F2EBD8',
      chrome: '#C9CDD3',
      gold: '#D9A93A',
      ctaInk: '#F2EBD8',
      rosterA: '#D9A93A',
      rosterB: '#14213D',
    },
  },
```

---

# APPENDIX C — The card component (PaletteCard)

The core brand artifact. Port faithfully — chrome-foil border, scanline overlay, hologram corner, rotated status stamp, gradient nameplate, mono serials, logo bug.

```jsx
// PALETTE DEVELOPMENT — full home pages for the 6 finalist palettes.
// 4 Procard × Stadium variants + 2 Rally × Cards variants.
// Each takes a `palette` prop with the colors. Layout is locked, paint changes.

// Subject -> real project sport asset. Replaces the picsum placeholders so
// every card carries softball/baseball imagery. (Cards still represent kids;
// when real portrait photography arrives, swap these.)
const SUBJECT_IMAGES = {
  'marcus':    'assets/lifestyle_dugout.png',   // hero card
  'kid-pd1':   'assets/lifestyle_field.png',
  'vet-pd1':   'assets/hero_angled.png',
  'empty-pd1': 'assets/copper_detail.png',
};
const subjectSrc = (k) => SUBJECT_IMAGES[k] || 'assets/lifestyle_dugout.png';

// Default font tokens (shared across all variants — palette only changes color)
const FONTS_PROCARD = {
  display: "'Oswald', 'Anton', sans-serif",   // jersey numerals (Dugout DNA carryover)
  displayWeight: 700,
  slab: "'Alfa Slab One', serif",             // procard nameplates
  kinetic: "'Bungee', sans-serif",            // tickers, stamps, CTAs
  serif: "'Newsreader', Georgia, serif",      // italic body
  body: "'IBM Plex Sans', system-ui, sans-serif",
  mono: "'IBM Plex Mono', monospace",
};

const FONTS_RALLY = {
  slab: "'Alfa Slab One', serif",
  kinetic: "'Bungee', sans-serif",
  serif: "'Newsreader', Georgia, serif",
  body: "'Newsreader', Georgia, serif",
  mono: "'JetBrains Mono', monospace",
  script: "'Caveat', cursive",
};

// ─────────────────────────────────────────────────────────────────────
// SHARED — a Procard rendering, parameterized by palette
// ─────────────────────────────────────────────────────────────────────
function PaletteCard({ p, num = '003', cause = 'ST. JUDE', subject = 'kid',
                       sn = '047/200', stat = '$5,000', accent, status = 'RC \'26',
                       size = 'md', tilt = 0, bw = false }) {
  const w = size === 'lg' ? 320 : size === 'sm' ? 200 : 260;
  const h = w * 1.4;
  const c = accent || p.accent;
  const photoFilter = bw
    ? 'grayscale(1) contrast(1.25) brightness(0.92)'
    : 'saturate(0.85) contrast(1.1)';
  return (
    <div style={{
      position: 'relative', width: w, height: h, transform: `rotate(${tilt}deg)`,
      background: p.cardStock,
      boxShadow: `0 8px 24px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.6) inset`,
      padding: 9, fontFamily: FONTS_PROCARD.body,
    }}>
      {/* foil chrome border */}
      <div style={{
        position: 'absolute', inset: 4,
        background: `linear-gradient(135deg, ${p.chrome}, #fff 25%, ${p.chrome} 50%, #fff 75%, ${p.chrome})`,
        padding: 2,
      }}>
        <div style={{ width: '100%', height: '100%', background: c, padding: 4 }}>
          <div style={{ width: '100%', height: '100%', background: p.bg, position: 'relative', overflow: 'hidden' }}>
            {/* photo region */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '74%',
                          background: `linear-gradient(180deg, ${p.surface}, ${p.bg})`, overflow: 'hidden' }}>
              <img src={subjectSrc(subject)}
                   style={{ width: '100%', height: '100%', objectFit: 'cover', filter: photoFilter }} />
              <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0 1px, transparent 1px 3px)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: 6, right: 6, width: 28, height: 28,
                            background: `conic-gradient(from 0deg, ${p.gold}, ${p.chrome}, ${p.gold}, ${p.chrome}, ${p.gold})`,
                            border: `1px solid ${p.fg}`, opacity: 0.85 }} />
              <div style={{ position: 'absolute', top: 6, left: 6, background: c, color: p.accentInk || p.cardStock,
                            padding: '2px 8px', fontFamily: FONTS_PROCARD.kinetic, fontSize: 9, letterSpacing: '0.16em' }}>
                ED. {num}
              </div>
              <div style={{ position: 'absolute', bottom: 8, right: 8, transform: 'rotate(-12deg)',
                            background: p.gold, color: '#0F0F0E',
                            padding: '3px 10px', fontFamily: FONTS_PROCARD.slab, fontSize: 13,
                            letterSpacing: '0.04em', border: `1.5px solid #0F0F0E` }}>
                {status}
              </div>
            </div>
            {/* nameplate */}
            <div style={{ position: 'absolute', top: '74%', bottom: 0, left: 0, right: 0,
                          padding: '6px 10px',
                          background: `linear-gradient(180deg, ${c}, ${p.accentDark || c})`,
                          color: p.accentInk || p.cardStock,
                          display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ fontFamily: FONTS_PROCARD.slab, fontSize: w / 14, lineHeight: 1.0, letterSpacing: '0.005em' }}>{cause}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
                            borderTop: `1px solid rgba(255,255,255,0.4)`, paddingTop: 4 }}>
                <div>
                  <div style={{ fontFamily: FONTS_PROCARD.mono, fontSize: 8, opacity: 0.85, letterSpacing: '0.06em' }}>SN</div>
                  <div style={{ fontFamily: FONTS_PROCARD.kinetic, fontSize: 11, letterSpacing: '0.08em' }}>{sn}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: FONTS_PROCARD.mono, fontSize: 8, opacity: 0.85, letterSpacing: '0.06em' }}>RAISED</div>
                  <div style={{ fontFamily: FONTS_PROCARD.kinetic, fontSize: 11, letterSpacing: '0.08em' }}>{stat}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* SOLID logo bug */}
      <div style={{ position: 'absolute', top: -10, left: 12, background: p.fg, color: p.bg,
                    padding: '2px 10px', fontFamily: FONTS_PROCARD.kinetic, fontSize: 10,
                    letterSpacing: '0.18em', border: `1.5px solid ${p.bg}`, transform: 'rotate(-2deg)' }}>
        ★ SOLID ★
      </div>
    </div>
  );
}

window.PaletteCard = PaletteCard;
window.FONTS_PROCARD = FONTS_PROCARD;
window.FONTS_RALLY = FONTS_RALLY;
```

---

# APPENDIX D — The approved home page component

The full approved home layout (artboard B of Palette Development v2). Structure: nav → stadium hero (B&W photo, giant numeral, hero card, 2 CTAs) → Roster binder → Career Numbers → founders' red quote → email capture → footer ticker.

```jsx
// PROCARD × STADIUM home — parameterized by palette.
// Same layout as ProcardDocHome, but every color routes through `p`.

const F = window.FONTS_PROCARD;

window.ProcardStadiumHome = function ProcardStadiumHome({ palette: p, edition = '003' }) {
  const cardAccent = p.cardAccent || p.accent;     // accent color used on the hero card nameplate
  const ctaInk = p.ctaInk || (p.ground === 'light' ? p.fg : '#0A0A0A');
  const heroPhoto = p.heroPhoto || 'lifestyle_dugout';
  const heroFilter = p.heroFilter || 'grayscale(1) contrast(1.3) brightness(0.55)';
  const isLight = p.ground === 'light';

  return (
    <div style={{ width: 1280, background: p.bg, color: p.fg, fontFamily: F.body, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: `repeating-linear-gradient(45deg, transparent 0 18px, ${isLight ? 'rgba(0,0,0,0.025)' : 'rgba(255,255,255,0.025)'} 18px 19px), repeating-linear-gradient(-45deg, transparent 0 18px, ${isLight ? 'rgba(0,0,0,0.025)' : 'rgba(255,255,255,0.025)'} 18px 19px)`, pointerEvents: 'none' }} />
      <div style={{ position: 'relative' }}>

        {/* nav */}
        <div style={{ background: p.bgAlt, color: p.fg, padding: '12px 36px',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      fontFamily: F.kinetic, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase',
                      borderBottom: `2px solid ${p.accent}` }}>
          <span style={{ display: 'flex', gap: 18 }}>
            <span style={{ color: p.accent }}>★ SOLID</span>
            <span style={{ opacity: 0.7 }}>The Set</span>
            <span style={{ opacity: 0.7 }}>The Roster</span>
            <span style={{ opacity: 0.7 }}>Story</span>
          </span>
          <span style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <span style={{ color: p.fg2, fontFamily: F.mono, fontSize: 11 }}>$94,200 RAISED · 3/4 SET</span>
            <span style={{ background: p.accent, color: ctaInk, padding: '5px 12px' }}>RESERVE {edition}</span>
          </span>
        </div>

        {/* HERO — massive jersey numeral over B&W photo, with a hero card */}
        <section style={{ position: 'relative', height: 820, background: p.heroGround || '#0F0F0E', overflow: 'hidden' }}>
          <img src={`assets/${heroPhoto}.png`}
               style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
                        filter: heroFilter }} />

          {/* MASSIVE jersey numeral */}
          <div style={{ position: 'absolute', right: -40, top: -80,
                        fontFamily: F.display, fontWeight: 700, fontSize: 720,
                        color: p.heroNumeral || p.accent,
                        lineHeight: 0.85, letterSpacing: '-0.04em', opacity: 0.92 }}>
            {edition}
          </div>

          {/* corner stamp */}
          <div style={{ position: 'absolute', top: 32, left: 32,
                        background: p.accent, color: ctaInk,
                        padding: '8px 14px', fontFamily: F.display, fontSize: 11,
                        letterSpacing: '0.22em', fontWeight: 700 }}>
            ROOKIE CARD '26 ▸ ED. {edition} ▸ ST. JUDE
          </div>

          {/* hero copy */}
          <div style={{ position: 'absolute', left: 32, bottom: 48, maxWidth: 720, zIndex: 2 }}>
            <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 88, lineHeight: 0.95,
                          color: '#F5F2E8', letterSpacing: '0.005em', textTransform: 'uppercase' }}>
              ROOKIE CARD,<br/>ROOKIE CAUSE.
            </div>
            <p style={{ fontFamily: F.serif, fontStyle: 'italic', fontSize: 19, lineHeight: 1.5,
                        color: '#C8C4B5', maxWidth: 540, marginTop: 18 }}>
              200 bats. 200 numbered cards. Documentary photography of the kid the cause is for. The card ships in the box.
            </p>
            <div style={{ marginTop: 26, display: 'flex', gap: 12 }}>
              <button style={{ background: p.accent, color: ctaInk, border: 'none', padding: '16px 24px',
                               fontFamily: F.display, fontSize: 13, letterSpacing: '0.18em',
                               fontWeight: 700, textTransform: 'uppercase', cursor: 'pointer' }}>
                PULL NO. 048 →
              </button>
              <button style={{ background: 'transparent', color: '#F5F2E8', border: `2px solid #F5F2E8`,
                               padding: '14px 22px', fontFamily: F.display, fontSize: 13,
                               letterSpacing: '0.18em', fontWeight: 700, textTransform: 'uppercase', cursor: 'pointer' }}>
                SEE THE ROSTER
              </button>
            </div>
          </div>

          {/* hero card */}
          <div style={{ position: 'absolute', right: 64, bottom: 60, transform: 'rotate(2deg)', zIndex: 3 }}>
            <window.PaletteCard p={p} num={edition} cause="ST. JUDE" subject="marcus"
                                sn="047/200" stat="$5,000" accent={cardAccent}
                                status={`RC '26`} size="lg" tilt={0} bw />
          </div>
        </section>

        {/* THE ROSTER — 4-card binder, B&W documentary cards */}
        <section style={{ padding: '64px 48px', background: p.bgAlt,
                          borderTop: `2px solid ${p.accent}`, borderBottom: `2px solid ${p.accent}`,
                          position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
                        marginBottom: 36, borderBottom: `2px solid ${p.fg}`, paddingBottom: 14 }}>
            <div>
              <div style={{ fontFamily: F.display, fontSize: 12, letterSpacing: '0.24em',
                            textTransform: 'uppercase', color: p.accent, fontWeight: 700 }}>
                THE ROSTER ▸ SERIES 1
              </div>
              <h2 style={{ fontFamily: F.display, fontWeight: 700, fontSize: 56, lineHeight: 0.95,
                           margin: '8px 0 0', color: p.fg, textTransform: 'uppercase' }}>
                Every card is a kid.
              </h2>
            </div>
            <div style={{ fontFamily: F.serif, fontStyle: 'italic', fontSize: 16, color: p.fg2,
                          maxWidth: 380, lineHeight: 1.5, textAlign: 'right' }}>
              No glossy product. Real photographs. The kid the cause is for, on the front. Stat line on the back. <em>Numbered out of 200.</em>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 22,
                        justifyItems: 'center', padding: '20px 0' }}>
            <window.PaletteCard p={p} num="001" cause="GLOVES UP"  subject="kid-pd1" sn="200/200" stat="$5,000" accent={p.rosterA || p.gold} status="SOLD" size="sm" tilt={-2} bw />
            <window.PaletteCard p={p} num="002" cause="HOMEFRONT"  subject="vet-pd1" sn="200/200" stat="$5,000" accent={p.rosterB || '#7E8E3D'} status="SOLD" size="sm" tilt={1}  bw />
            <window.PaletteCard p={p} num={edition} cause="ST. JUDE" subject="marcus"  sn="047/200" stat="$1,175" accent={cardAccent} status="LIVE" size="sm" tilt={-1} bw />
            <window.PaletteCard p={p} num="004" cause="VOTE NEXT"  subject="empty-pd1" sn="??/200"  stat="—"      accent={p.fg3} status="?" size="sm" tilt={2} bw />
          </div>
        </section>

        {/* STAT LINE */}
        <section style={{ padding: '52px 48px', background: p.bg, borderBottom: `2px solid ${p.accent}` }}>
          <div style={{ fontFamily: F.kinetic, fontSize: 12, letterSpacing: '0.22em',
                        textTransform: 'uppercase', color: p.accent }}>
            ★ STATS ON THE BACK
          </div>
          <h2 style={{ fontFamily: F.slab, fontSize: 56, lineHeight: 0.95, margin: '6px 0 24px',
                       color: p.fg, textShadow: `3px 3px 0 ${p.accent}` }}>
            Career numbers.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {[
              { k: 'EDITIONS',      v: '003',     sub: 'And counting' },
              { k: 'RAISED',        v: '$94,200', sub: 'Across 3 causes' },
              { k: 'BATS PULLED',   v: '447',     sub: 'Of 800 in series 1' },
              { k: 'CARDS IN PLAY', v: '447',     sub: 'Each numbered, each shipped' },
            ].map(s => (
              <div key={s.k} style={{
                background: `linear-gradient(135deg, ${p.chrome}, #fff 25%, ${p.chrome} 50%, #fff 75%, ${p.chrome})`,
                padding: 2,
              }}>
                <div style={{ background: p.accent, padding: 3 }}>
                  <div style={{ background: p.bgAlt, padding: 16, color: p.fg }}>
                    <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.2em', color: p.fg3 }}>{s.k}</div>
                    <div style={{ fontFamily: F.slab, fontSize: 52, lineHeight: 1.0, color: p.fg,
                                  marginTop: 6, textShadow: `2px 2px 0 ${p.accentDark || p.accent}` }}>
                      {s.v}
                    </div>
                    <div style={{ fontFamily: F.serif, fontStyle: 'italic', fontSize: 13,
                                  color: p.fg2, marginTop: 6 }}>
                      {s.sub}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STORY pull quote — dropped onto the accent block (Dugout move) */}
        <section style={{ background: p.accent, color: ctaInk, padding: '80px 48px' }}>
          <div style={{ fontFamily: F.display, fontSize: 11, letterSpacing: '0.24em',
                        fontWeight: 700, marginBottom: 24 }}>
            FROM THE DUGOUT ▸ FOUNDERS' NOTE
          </div>
          <div style={{ fontFamily: F.serif, fontStyle: 'italic', fontSize: 56, lineHeight: 1.1,
                        fontWeight: 300, maxWidth: 1000, textWrap: 'balance' }}>
            "We grew up trading cards. Now the cards trade for kids. The set isn't done until the cause is."
          </div>
          <div style={{ marginTop: 28, fontFamily: F.display, fontSize: 12, letterSpacing: '0.22em',
                        fontWeight: 700, textTransform: 'uppercase' }}>
            — Z & Z, FOUNDERS · VACAVILLE CA
          </div>
        </section>

        {/* EMAIL */}
        <section style={{ padding: '60px 48px', display: 'flex', justifyContent: 'space-between',
                          alignItems: 'center', borderTop: `2px solid ${p.accent}` }}>
          <div style={{ fontFamily: F.display, fontSize: 22, fontWeight: 700, textTransform: 'uppercase',
                        letterSpacing: '0.02em', color: p.fg }}>
            GET THE NEXT PACK IN YOUR INBOX
          </div>
          <div style={{ display: 'flex', gap: 1 }}>
            <input placeholder="email@team.com"
                   style={{ background: 'transparent', border: `2px solid ${p.fg}`, padding: '14px 18px',
                            color: p.fg, width: 320, fontFamily: F.body, fontSize: 14 }} />
            <button style={{ background: p.accent, color: ctaInk, border: 'none', padding: '14px 24px',
                             fontFamily: F.display, fontWeight: 700, letterSpacing: '0.2em',
                             textTransform: 'uppercase', cursor: 'pointer' }}>
              NOTIFY ME
            </button>
          </div>
        </section>

        {/* footer */}
        <div style={{ background: p.bgAlt, color: p.fg2, padding: '12px 0',
                      fontFamily: F.kinetic, fontSize: 11, letterSpacing: '0.22em',
                      textTransform: 'uppercase', textAlign: 'center', borderTop: `2px solid ${p.accent}` }}>
          ★ PRINTED IN VACAVILLE ★ © 2026 SOLID ★ ROOKIE CARDS '26 ★
        </div>
      </div>
    </div>
  );
};
```

---
*End of handoff. SOLID.*
