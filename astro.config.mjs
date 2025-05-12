import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

export default defineConfig({
  output: 'static',

  // ← this MUST match your GitHub Pages URL
  site: 'https://ashton-gates.github.io/tti-astro/',

  // ← this is the subpath for GitHub Pages
  base: '/tti-astro/',

  integrations: [react()]
});