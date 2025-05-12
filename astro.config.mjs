import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://ashton-gates.github.io/tti-astro/', // ← this MUST match your GitHub Pages URL
  base: '/tti-astro/' // ← this is the subpath for GitHub Pages
});