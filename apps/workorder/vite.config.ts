import { defineConfig } from 'vite';
import { InjectProcessPlugin } from '../../patches/3d-patch.ts';

export default defineConfig({
  appType: 'custom',
  build: {
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {},
      },
    },
    lib: {
      entry: './src/main.tsx',
      fileName: 'app-bundle',
      formats: ['es'],
    },
  },
});
