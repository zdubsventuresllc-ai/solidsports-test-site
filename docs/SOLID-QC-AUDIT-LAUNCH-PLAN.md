# SOLID — QC Audit & Launch Plan
### June 10, 2026 · prepared by Claude after full site + store inspection

---

## 1. What is verifiably LIVE right now

| Piece | Status | Proof |
|---|---|---|
| Website (Powder Inverted design, 7 pages) | ✅ Live | https://zdubsventuresllc-ai.github.io/solidsports-test-site/ |
| Auto-deploy on every GitHub push | ✅ Working | deploy workflow green |
| Shopify store | ✅ On **Basic plan** | `bttbzw-e1.myshopify.com` |
| Catalog: 3 edition products + metafields + inventory | ✅ Created via API | 001/002 sold out, 003 at 153 remaining |
| Live inventory on the site | ✅ Working | "047/200 PULLED" is computed from real Shopify stock at every build |
| Buy button → cart → Shopify checkout handoff | ✅ Working | cartCreate returns real checkout URLs |
| Headless channel (public + private Storefront tokens) | ✅ Installed & wired | the supported headless architecture |
| Catalog sync tooling | ✅ `npm run shopify:sync` | idempotent; products/prices/inventory/metafields/publishing in one command |
| Railway deploy spec | ✅ Ready | `railway.json` + `docs/DEPLOY.md`; ~10 min to deploy when wanted |

**What a customer experiences today:** they can browse the full site with real numbers and click PULL — but checkout dead-ends at Shopify's "Opening soon" password page, and no payment could be taken anyway. Which brings us to:

---

## 2. The path to taking the first real order

Shortest path, in order. Items marked **[Z]** need you (money/identity/legal); **[C]** I do.

1. **[Z] Turn off the storefront password** — admin → Online Store → Preferences → toggle off Password protection → Save. (Your plan + address now allow it. Until this is off, every checkout URL bounces.)
2. **[Z] Activate payments** — Settings → Payments → set up Shopify Payments (needs bank account, EIN or SSN, business details). This is THE gate to real orders.
3. **[Z] Shipping rates** — Settings → Shipping and delivery. A bat in a tube is ~3 lb; typical play: flat $9.95, free over $150 (one rate, 5 minutes).
4. **[Z] Sales tax** — Settings → Taxes and duties → enable US tax collection (Shopify automates the math; you only register where you have nexus — start with California).
5. **[Z] Rename the store** — it's still called **"My Store"** (appears on checkout, order emails, password page). Settings → General → rename to **SOLID** (or Solid Impact Sports — see §6, decision 4). Also the store address has an empty city field.
6. **[C] Checkout branding** — Settings → Checkout → Customize: SOLID logo, powder/navy/red, Oswald. I can drive this in the browser with you.
7. **[C+Z] Test order end-to-end** — Shopify Payments test mode → place an order → confirm emails, inventory decrement (pull counter moves!), then switch payments live.

> Realistic timeline: items 1–5 are about 30 minutes of your clicking. After that, the store can take money.

---

## 3. The real product gap — what "adding bats" actually means

This is the most important section. Right now the site sells **a cause with a card attached**. The bat itself — the thing being swung — is nearly invisible as a product. To sell bats to actual league players:

### 3a. Weight variants (the big structural one)
Slowpitch bats are bought by **weight**: 25 / 26 / 27 / 28 oz (and balanced vs. end-loaded). Our products currently have a single "Default Title" variant — no player can pick their weight. Needed:
- **[Z] Decide the lineup**: which weights does an edition run ship in? (Common play: 26/27/28 end-load.) Does the 200-unit run split across weights (e.g., 50/75/75)?
- **[C] Restructure products** with a Weight option per variant + per-variant inventory, and add a weight picker to the edition page. The pull counter then counts across the whole edition.

### 3b. Real bat specs
The spec table shows placeholders. A buyer needs: barrel length & diameter, weighting/load, material/construction, certification stamp (ASA/USSSA — which ones is it actually stamped for?), break-in, warranty terms. **[Z]** Get the spec sheet from Pure Sports Technologies → **[C]** I wire it into `editions.js` and the spec table.

### 3c. Photography (the brand lives or dies here)
Every image on the site is an AI render placeholder. Needed, roughly in priority order:
1. **The bat** — barrel art per edition is the hero product shot (each cause gets its own barrel design — that's a design decision per edition)
2. **The card** — physical card photography once printed
3. **Documentary cause photography** — the handoff's "real photographs, the kid the cause is for" (requires permissions/releases)

### 3d. The serial + card mechanic, operationally
The brand promise is "your card's serial matches your bat." That needs a fulfillment process:
- Serial assigned **at fulfillment** (handoff §9): when an order comes in, who stamps/records the number? Recommendation: track assigned serials as order metafields (I can build a small admin script), keep a master ledger.
- **[Z]** Physical card production vendor — still the open item from the handoff. Until cards exist, consider shipping "card follows" with a printed serial certificate.

### 3e. Pricing
$279 is the placeholder. Premium slowpitch market sits ~$250–$400 (Monsta, Suncoast, Proton territory). $279 with $25 baked in for the cause is defensible — **[Z]** confirm final price, **[C]** one-line change + sync.

### 3f. ⚠️ The honesty question (raise before launch)
Editions 001 (GLOVES UP) and 002 (HOMEFRONT) display as **sold out with $5,000 raised each**. If those editions never actually shipped, publishing raised totals conflicts with the brand's own spine — *"receipts on file," "a number you can check."* Options:
- **A (recommended):** launch with St. Jude as **Edition 001**. The set starts honest. Roster shows 001 LIVE + future slots ("VOTE NEXT").
- **B:** keep 001/002 visually but label clearly as *concept/preview* until real history exists.
This is a 20-minute site change either way — but it's a brand-defining decision.

### 3g. Policies & legal (required before real orders)
Refund/return policy (incl. bat warranty terms), privacy policy, terms of service, shipping policy. Shopify generates solid templates (Settings → Policies) → **[C]** I link them in the site footer. Card networks effectively require these for checkout.

---

## 4. Website QC findings

### Fixed during this audit
- **Mobile horizontal overflow** — the giant hero numeral pushed the page wider than the screen, shrinking everything. Fixed and verified (page now lays out at exactly viewport width).

### Pre-launch must-dos (I can do all of these in one pass)
| Finding | Impact |
|---|---|
| No Open Graph / Twitter meta tags | links shared in texts/socials show no card/preview — brand moment lost |
| No 404 page | broken links show a default server page (off-brand) |
| No robots.txt / sitemap.xml | weaker Google indexing |
| Hero images served as 7–8 MB PNGs | multi-second load on phones; converting to WebP/AVIF cuts ~95% of the weight |
| Email capture is a mock | "NOTIFY ME" stores nothing — must wire to Klaviyo or Shopify before collecting real emails |
| No analytics | can't see traffic/conversion; recommend GA4 or Plausible + Shopify's checkout analytics |

### Brand refinements (the bat-first correction, applied)
Per your note — Solid is a **bat brand** whose giving mechanic is cards/editions, not a card brand:
1. **Hero copy** leads with "ROOKIE CARD, ROOKIE CAUSE" and the sub is all about the card. Recommend the bat takes the first line — e.g. headline territory like *"BUILT TO RIP. NUMBERED TO MATTER."* with the card as the signature close. (Happy to draft 3–4 options.)
2. **Edition pages need a "The Bat" section** — specs, certification, swing feel — above or beside the card story. A league player landing here should instantly know what they'd be swinging.
3. **Story page lede** is card-nostalgia-first; flip to bat/founders-first with cards as the twist.
4. **Meta description** says "card brand" — update with the bat-first frame.
5. **Roster/Set sections** work great as-is — that's where the card mechanic *should* shine.

---

## 5. Shopify themes — evaluation & recommendation

**Recommendation: no theme. Spend the money on photography instead.**

- In our headless architecture, the Astro site **is** the storefront. Shopify themes (Liquid) only render the `myshopify.com` Online Store — a surface customers never see.
- Checkout has no theme — it's branded separately (Settings → Checkout → Customize), which is on the list above.
- A paid theme (~$300–400) would mean re-implementing the locked Powder Inverted design in Liquid — duplicate effort, worse result, two codebases to maintain.
- Only scenario where a theme makes sense: you want a zero-code fallback store running *this week* while the custom site matures. Then: **Dawn** (free, Shopify's reference theme) with the powder/navy/red palette — 1 hour of setup. Otherwise keep the Online Store password ON permanently; it's not a customer surface.

---

## 6. Decisions only you can make (the launch blockers list)

1. **Final price** ($279 placeholder)
2. **Weight lineup per edition** (26/27/28 oz? split of the 200 units?)
3. **The 001/002 honesty call** (§3f — relaunch St. Jude as Edition 001, or label as concept)
4. **Store/brand name on receipts**: "SOLID" vs "Solid Impact Sports" (your email domain is solidimpactsports.com — checkout, order emails, and the eventual real domain should all match)
5. **Photography plan** (who shoots the bats/cards; cause-photo permissions)
6. **Card production vendor**
7. **Charity disbursement proof format** for /receipts (screenshot of donation receipt? letter from org?)

## 7. Suggested build order

- **Sprint 1 — site hardening (me, no blockers):** OG/meta tags, 404, robots/sitemap, image optimization, email capture wiring, bat-first copy pass, policy page links
- **Sprint 2 — commerce completion (you ~30 min + me):** §2 list — password off, payments, shipping, tax, rename, checkout branding, test order
- **Sprint 3 — product truth (joint):** weight variants, real specs, pricing, serial ops, photography intake
- **Sprint 4 — launch:** Railway + GoDaddy domain, analytics, soft launch to league contacts

---
*Everything in sections 2–4 marked [C] is ready to execute on your word. SOLID.*
