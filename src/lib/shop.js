// ════════════════════════════════════════════════════════════════
// SOLID — commerce adapter (handoff §9).
// MockProvider ships v1: returns editions data shaped like Shopify
// Storefront API responses. Going live = implement StorefrontProvider
// against the SAME interface and flip the export at the bottom —
// pages never change.
// ════════════════════════════════════════════════════════════════

import { editions, getEdition, UNITS_PER_EDITION, DONATION_PER_BAT } from '../data/editions.js';

// Interface every provider implements:
//   product(handle) -> { handle, title, price, currency, inventoryQuantity, metafields, available }
//   checkoutUrl(handle) -> string  (where the buy CTA points)

const MockProvider = {
  product(handle) {
    const ed = editions.find((e) => e.handle === handle);
    if (!ed) return null;
    return {
      handle: ed.handle,
      title: `Solid ${ed.number} — ${ed.causeFull} Edition`,
      price: ed.price,
      currency: 'USD',
      inventoryQuantity: UNITS_PER_EDITION - ed.pulled,
      available: ed.status === 'LIVE',
      metafields: {
        edition_number: ed.number,
        cause_name: ed.causeFull,
        cause_url: ed.causeUrl,
        donation_per_unit: DONATION_PER_BAT * 100, // cents, per handoff §9
        total_units: UNITS_PER_EDITION,
      },
    };
  },

  // Placeholder until Shopify cartCreate/cartLinesAdd is wired
  checkoutUrl() {
    return '#reserve';
  },
};

/*
 * StorefrontProvider (wire when store URL + token land in .env):
 *   - POST https://{PUBLIC_SHOPIFY_DOMAIN}/api/2025-07/graphql.json
 *     headers: { 'X-Shopify-Storefront-Access-Token': PUBLIC_SHOPIFY_STOREFRONT_TOKEN }
 *   - product(handle): productByHandle query -> price/inventory/metafields
 *   - checkoutUrl: cartCreate + cartLinesAdd -> cart.checkoutUrl
 *   - pulled = 200 - inventoryQuantity (drives counters in editions.js)
 */

export const shop = MockProvider;

export function productForEdition(number) {
  const ed = getEdition(number);
  return ed?.handle ? shop.product(ed.handle) : null;
}
