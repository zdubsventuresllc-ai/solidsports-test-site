# Deploying the Solid site

## Architecture

Astro static site, headless commerce against the Shopify **Headless channel** on
`bttbzw-e1.myshopify.com`. At build time the site pulls live inventory/prices via the
Storefront API (`src/data/editions.js`); in the browser, the buy button creates a cart
via the Storefront API and hands off to Shopify-hosted checkout. If Shopify is
unreachable at build time, the site falls back to the placeholder numbers in
`editions.js` and still builds.

## Environments

| Env var | Purpose | Exposure |
|---|---|---|
| `PUBLIC_SHOPIFY_DOMAIN` | `bttbzw-e1.myshopify.com` | public (ends up in HTML) |
| `PUBLIC_SHOPIFY_STOREFRONT_TOKEN` | Headless channel **public** token — cart creation in the browser | public by design |
| `SHOPIFY_PRIVATE_STOREFRONT_TOKEN` | Headless channel **private** token — build-time data fetch | secret, server/build only |
| `SHOPIFY_CLIENT_ID` / `SHOPIFY_CLIENT_SECRET` | Admin API (client credentials) — only needed for `npm run shopify:sync` | secret |
| `PUBLIC_BASE_PATH` | Subpath when hosted off-root (GitHub Pages sets `/solidsports-test-site`) | leave unset on Railway |

## GitHub Pages (already live)

Every push to `main` deploys to
https://zdubsventuresllc-ai.github.io/solidsports-test-site/ via
`.github/workflows/deploy.yml`.

## Railway

1. Railway dashboard → **New Project → Deploy from GitHub repo** → pick
   `zdubsventuresllc-ai/solidsports-test-site`. `railway.json` supplies the build
   (`npm run build`) and start (`npm start`, static `serve` of `dist/`) commands.
2. Set variables: `PUBLIC_SHOPIFY_DOMAIN`, `PUBLIC_SHOPIFY_STOREFRONT_TOKEN`,
   `SHOPIFY_PRIVATE_STOREFRONT_TOKEN`. Do **not** set `PUBLIC_BASE_PATH`.
3. Deploy. Railway redeploys on every push to `main`.
4. Domain: Railway service → Settings → Custom Domain → add `solidimpactsports.com`
   (and/or `www`). In GoDaddy DNS, add the CNAME records Railway shows.

## Shopify catalog sync

`npm run shopify:sync` (needs `SHOPIFY_CLIENT_ID`/`SECRET` + `PUBLIC_SHOPIFY_DOMAIN`
in `.env`) upserts the edition products, prices, inventory, metafields, and publishes
them to every sales channel. Idempotent; run after editing `src/data/editions.js`.

## Going fully live checklist

- [ ] Remove storefront password: admin → Online Store → Preferences → toggle off
      password protection (requires paid plan + store address — both done)
- [ ] Brand the checkout: admin → Settings → Checkout → Customize (logo, powder/navy/red)
- [ ] Replace placeholder price ($279) and pull counts in Shopify (then `shopify:sync`
      is NOT needed — inventory is the source of truth once live)
- [ ] Real edition photography → `public/assets/`
- [ ] Payments: admin → Settings → Payments — activate a payment provider
- [ ] Email capture → wire to Shopify customerCreate or Klaviyo
