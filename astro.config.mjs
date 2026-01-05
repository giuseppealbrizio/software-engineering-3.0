import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [mdx()],
  site: 'https://giuseppealbrizio.github.io',
  base: '/software-engineering-3.0',
});
