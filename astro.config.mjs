import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://krauseit.com.au',
  integrations: [
    sitemap({
      // Keep utility pages (form confirmation) out of the sitemap
      filter: (page) => !page.includes('/thanks'),
    }),
  ],
});

