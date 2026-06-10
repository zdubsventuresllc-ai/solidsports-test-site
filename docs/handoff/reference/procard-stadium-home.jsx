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
