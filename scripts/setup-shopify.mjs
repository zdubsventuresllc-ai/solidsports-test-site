// One-shot Shopify store setup for the Solid site.
// Reads .env (SHOPIFY_CLIENT_ID/SECRET, PUBLIC_SHOPIFY_DOMAIN), then:
//   1. exchanges client credentials for a 24h Admin API token
//   2. upserts one product per edition (price, inventory, metafields) via productSet
//   3. mints a Storefront API access token if .env doesn't have one
// Idempotent — productSet matches on handle, so reruns update rather than duplicate.
// Run: node scripts/setup-shopify.mjs

import { readFileSync, writeFileSync } from 'node:fs';
import { editions, UNITS_PER_EDITION, DONATION_PER_BAT } from '../src/data/editions.js';

const envPath = new URL('../.env', import.meta.url).pathname;
const env = Object.fromEntries(
  readFileSync(envPath, 'utf8').split('\n')
    .filter((l) => l.includes('=') && !l.trim().startsWith('#'))
    .map((l) => [l.slice(0, l.indexOf('=')).trim(), l.slice(l.indexOf('=') + 1).trim()])
);

const DOMAIN = env.PUBLIC_SHOPIFY_DOMAIN;
const API_VERSION = '2026-04';

// ── 1. Admin token via client credentials ──
const tokenResp = await fetch(`https://${DOMAIN}/admin/oauth/access_token`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: env.SHOPIFY_CLIENT_ID,
    client_secret: env.SHOPIFY_CLIENT_SECRET,
  }),
});
if (!tokenResp.ok) throw new Error(`token exchange failed: ${tokenResp.status} ${await tokenResp.text()}`);
const { access_token } = await tokenResp.json();
console.log('✓ Admin token acquired');

async function gql(query, variables = {}) {
  const r = await fetch(`https://${DOMAIN}/admin/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': access_token },
    body: JSON.stringify({ query, variables }),
  });
  const j = await r.json();
  if (j.errors) throw new Error('GraphQL errors: ' + JSON.stringify(j.errors));
  return j.data;
}

// ── 2. location for inventory ──
const loc = await gql(`{ locations(first: 1) { nodes { id name } } }`);
const locationId = loc.locations.nodes[0].id;
console.log(`✓ Location: ${loc.locations.nodes[0].name} (${locationId})`);

// ── 3. upsert one product per sellable edition ──
const sellable = editions.filter((e) => e.handle);
for (const ed of sellable) {
  const inventory = UNITS_PER_EDITION - ed.pulled;
  // upsert: find the existing product by handle so reruns update in place
  const found = await gql(
    `query($q: String!) { products(first: 1, query: $q) { nodes { id } } }`,
    { q: `handle:${ed.handle}` }
  );
  const existingId = found.products.nodes[0]?.id;
  const data = await gql(
    `mutation productSet($input: ProductSetInput!) {
      productSet(input: $input, synchronous: true) {
        product { id handle variants(first: 1) { nodes { id price } } }
        userErrors { field message }
      }
    }`,
    {
      input: {
        ...(existingId ? { id: existingId } : {}),
        handle: ed.handle,
        title: `Solid ${ed.number} — ${ed.causeFull} Edition`,
        descriptionHtml: `<p>${ed.blurb}</p><p>Edition ${ed.number} of the Solid set. ${UNITS_PER_EDITION} bats, never reprinted. Every bat ships with its numbered card — same serial as the bat. $${DONATION_PER_BAT} from every pull goes to ${ed.causeFull}. Receipts on file.</p>`,
        status: 'ACTIVE',
        productOptions: [{ name: 'Title', values: [{ name: 'Default Title' }] }],
        variants: [{
          optionValues: [{ optionName: 'Title', name: 'Default Title' }],
          price: String(ed.price ?? 279),
          sku: `SOLID-${ed.number}`,
          inventoryQuantities: [{ locationId, name: 'available', quantity: inventory }],
          inventoryItem: { tracked: true },
        }],
        metafields: [
          { namespace: 'solid', key: 'edition_number', type: 'single_line_text_field', value: ed.number },
          { namespace: 'solid', key: 'cause_name', type: 'single_line_text_field', value: ed.causeFull },
          { namespace: 'solid', key: 'cause_url', type: 'url', value: ed.causeUrl },
          { namespace: 'solid', key: 'donation_per_unit', type: 'number_integer', value: String(DONATION_PER_BAT * 100) },
          { namespace: 'solid', key: 'total_units', type: 'number_integer', value: String(UNITS_PER_EDITION) },
        ],
      },
    }
  );
  const errs = data.productSet.userErrors;
  if (errs.length) throw new Error(`productSet ${ed.handle}: ${JSON.stringify(errs)}`);
  console.log(`✓ Product upserted: ${data.productSet.product.handle} — $${data.productSet.product.variants.nodes[0].price}, inventory ${inventory}`);
}

// ── 3.5 publish products to every sales channel (incl. this app's) ──
// Admin-created products aren't visible to the Storefront API until they're
// published to the querying app's publication.
const pubs = await gql(`{ publications(first: 10) { nodes { id name } } }`);
const products = await gql(`{ products(first: 10, query: "handle:solid-*") { nodes { id handle } } }`);
for (const product of products.products.nodes) {
  for (const pub of pubs.publications.nodes) {
    const r = await gql(
      `mutation publish($id: ID!, $input: [PublicationInput!]!) {
        publishablePublish(id: $id, input: $input) { userErrors { field message } }
      }`,
      { id: product.id, input: [{ publicationId: pub.id }] }
    );
    const errs = r.publishablePublish.userErrors.filter((e) => !/already published/i.test(e.message));
    if (errs.length) console.warn(`  ! publish ${product.handle} → ${pub.name}:`, JSON.stringify(errs));
  }
  console.log(`✓ Published: ${product.handle} → ${pubs.publications.nodes.map((p) => p.name).join(', ')}`);
}

// ── 4. storefront access token (mint once) ──
if (!env.PUBLIC_SHOPIFY_STOREFRONT_TOKEN) {
  const existing = await gql(`{ shop { storefrontAccessTokens(first: 5) { nodes { title accessToken } } } }`);
  let sfToken = existing.shop.storefrontAccessTokens.nodes.find((t) => t.title === 'solid-website')?.accessToken;
  if (!sfToken) {
    const minted = await gql(
      `mutation { storefrontAccessTokenCreate(input: { title: "solid-website" }) {
        storefrontAccessToken { accessToken }
        userErrors { field message }
      } }`
    );
    const errs = minted.storefrontAccessTokenCreate.userErrors;
    if (errs.length) throw new Error('storefrontAccessTokenCreate: ' + JSON.stringify(errs));
    sfToken = minted.storefrontAccessTokenCreate.storefrontAccessToken.accessToken;
  }
  writeFileSync(envPath, readFileSync(envPath, 'utf8').trimEnd() + `\nPUBLIC_SHOPIFY_STOREFRONT_TOKEN=${sfToken}\n`);
  console.log('✓ Storefront token saved to .env');
} else {
  console.log('✓ Storefront token already in .env');
}

console.log('\nDone. Store is set up.');
