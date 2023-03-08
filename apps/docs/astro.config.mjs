import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  outDir: '../../dist/apps/docs',
  site: 'https://equinor.github.io/',
  base: 'cc-components',
  integrations: [react()],
});
