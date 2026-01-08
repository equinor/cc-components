import { defineConfig } from 'vite';
import { InjectProcessPlugin } from '../../patches/process';

export default defineConfig({
  appType: 'custom',
  build: {
    rollupOptions: {
      plugins: [InjectProcessPlugin],
    },
    emptyOutDir: true,
    lib: {
      entry: './src/main.tsx',
      fileName: 'app-bundle',
      formats: ['es'],
    },
  },
});


