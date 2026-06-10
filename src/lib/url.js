// Joins a site-absolute path with Astro's configured base. BASE_URL is '/'
// in local dev and '/solidsports-test-site/' on GitHub Pages, so every
// internal link and asset src must route through this.
export function href(path) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return base + path;
}
