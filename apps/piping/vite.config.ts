import { defineConfig } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';
import { InjectProcessPlugin } from '../../patches/3d-patch.ts';

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
      plugins: [InjectProcessPlugin],
      output: {
        inlineDynamicImports: true,
      },
    },
    lib: {
      entry: './src/main.tsx',
      fileName: 'app-bundle',
      formats: ['es'],
    },
  },
});
