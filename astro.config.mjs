import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

export default defineConfig({
  output: 'static',

  // ← this MUST match your GitHub Pages URL
  site: 'https://projectojo.com',

  // ← this is the subpath for GitHub Pages
  base: '/',

  integrations: [react()]
});