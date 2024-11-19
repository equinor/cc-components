import { defineConfig } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';

export default defineConfig({
  plugins: [
    EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
  ],
  define: {
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  },
  appType: 'custom',
  build: {
    emptyOutDir: true,
    rollupOptions: {
      output: {
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
