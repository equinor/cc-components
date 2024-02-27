import { defineConfig } from 'vite';
import { InjectProcessPlugin } from '../../patches/3d-patch.ts';

export default defineConfig({
  appType: 'custom',
  server: {
    fs: {
      allow: ['c:/'],
    },
  },
  build: {
    emptyOutDir: true,
    rollupOptions: {
      plugins: [InjectProcessPlugin],
    },
    lib: {
      entry: './src/main.tsx',
      fileName: 'app-bundle',
      formats: ['es'],
    },
  },
});
