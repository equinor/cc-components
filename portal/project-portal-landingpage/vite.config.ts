import { defineConfig } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';
import { InjectProcessPlugin } from '@equinor/project-portal-common';

export default defineConfig({
  plugins: [
    EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
  ],
  appType: 'custom',
  build: {
    emptyOutDir: true,
    rollupOptions: {
      output: {
        plugins: [InjectProcessPlugin],
        inlineDynamicImports: true,
      },
    },
    lib: {
      entry: './src/index.ts',
      fileName: 'app-bundle',
      formats: ['es'],
    },
  },
});
