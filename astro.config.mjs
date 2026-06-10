import { defineConfig } from 'astro/config';

// PUBLIC_BASE_PATH is set by the GitHub Pages workflow (/solidsports-test-site);
// unset locally and on Railway so paths stay root-relative.
export default defineConfig({
  output: 'static',
  base: process.env.PUBLIC_BASE_PATH,
  site: process.env.PUBLIC_BASE_PATH ? 'https://zdubsventuresllc-ai.github.io' : undefined,
});
