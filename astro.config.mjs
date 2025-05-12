import { defineConfig } from 'astro/config';
import ghPages from '@astrojs/gh-pages';

export default defineConfig({
  output: 'static',
  integrations: [ghPages()],
  base: '/', // or '/your-repo-name' if it's not a user/organization page
  site: 'https://projectojo.com', // custom domain here
});