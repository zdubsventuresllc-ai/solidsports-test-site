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
