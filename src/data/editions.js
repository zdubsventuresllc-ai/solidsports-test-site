// ════════════════════════════════════════════════════════════════
// SOLID — Editions data. SINGLE SOURCE OF TRUTH for every number
// on the site. Pull counts and prices are PLACEHOLDERS until real
// figures (or the live Shopify inventory) arrive — edit here only.
// ════════════════════════════════════════════════════════════════

export const DONATION_PER_BAT = 25; // dollars — the mechanic. Never changes per handoff.
export const UNITS_PER_EDITION = 200;

export const editions = [
  {
    number: '001',
    handle: 'solid-001-gloves-up',
    cause: 'GLOVES UP',
    causeFull: 'Reviving Baseball in Inner Cities (RBI)',
    causeUrl: 'https://www.mlb.com/rbi',
    accentVar: '--ed-001', // gold
    accent: '#D9A93A',
    status: 'SOLD',
    statusStamp: 'SOLD',
    pulled: 200, // sold out
    price: 279, // placeholder
    subjectImage: '/assets/lifestyle_field.png',
    blurb: 'The first card in the set. Dedicated to getting gloves on kids who never had them.',
  },
  {
    number: '002',
    handle: 'solid-002-homefront',
    cause: 'HOMEFRONT',
    causeFull: 'Wounded Warrior Project',
    causeUrl: 'https://www.woundedwarriorproject.org',
    accentVar: '--ed-002', // navy
    accent: '#14213D',
    status: 'SOLD',
    statusStamp: 'SOLD',
    pulled: 200, // sold out
    price: 279, // placeholder
    subjectImage: '/assets/hero_angled.png',
    blurb: 'Edition two swung for the veterans who came home and the families who held the line.',
  },
  {
    number: '003',
    handle: 'solid-003-st-jude',
    cause: 'ST. JUDE',
    causeFull: "St. Jude Children's Research Hospital",
    causeUrl: 'https://www.stjude.org',
    accentVar: '--ed-003', // red
    accent: '#C8201A',
    status: 'LIVE',
    statusStamp: "RC '26",
    pulled: 47, // placeholder — live count comes from Shopify inventory when wired
    price: 279, // placeholder
    subjectImage: '/assets/lifestyle_dugout.png',
    blurb: 'The live edition. Every pull sends $25 to St. Jude. The set isn’t done until the cause is.',
  },
  {
    number: '004',
    handle: null,
    cause: 'VOTE NEXT',
    causeFull: 'Chosen by Edition 003 owners',
    causeUrl: null,
    accentVar: null,
    accent: '#6B7785', // --navy-3
    status: 'VOTE',
    statusStamp: '?',
    pulled: 0,
    price: null,
    subjectImage: '/assets/copper_detail.png',
    blurb: 'The chase card. Edition 003 owners vote on the next cause.',
  },
];

// ── derived helpers — all display numbers route through these ──

const usd = (n) => '$' + n.toLocaleString('en-US');

export function raised(ed) {
  return ed.pulled * DONATION_PER_BAT;
}

export function raisedDisplay(ed) {
  return ed.status === 'VOTE' ? '—' : usd(raised(ed));
}

export function totalRaised() {
  return editions.reduce((sum, ed) => sum + raised(ed), 0);
}

export function totalRaisedDisplay() {
  return usd(totalRaised());
}

export function totalPulled() {
  return editions.reduce((sum, ed) => sum + ed.pulled, 0);
}

export function serial(n) {
  return String(n).padStart(3, '0');
}

// "047/200" — current serial line for a card face
export function serialLine(ed) {
  if (ed.status === 'VOTE') return '??/200';
  return `${serial(ed.pulled)}/${UNITS_PER_EDITION}`;
}

// next serial to pull, zero-padded — drives "PULL NO. 048 →"
export function nextSerial(ed) {
  return serial(ed.pulled + 1);
}

// "3/4 SET" — released editions over total slots in series 1
export function setProgress() {
  const released = editions.filter((e) => e.status !== 'VOTE').length;
  return `${released}/${editions.length} SET`;
}

export function liveEdition() {
  return editions.find((e) => e.status === 'LIVE');
}

export function getEdition(number) {
  return editions.find((e) => e.number === number);
}
