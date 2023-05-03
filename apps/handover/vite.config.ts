import { defineConfig } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';

export default defineConfig({
  plugins: [
    EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
  ],
  appType: 'custom',
  build: {
    emptyOutDir: true,
    minify: false,
    lib: {
      entry: './src/main.tsx',
      fileName: 'app-bundle',
      formats: ['es'],
    },
  },
});
