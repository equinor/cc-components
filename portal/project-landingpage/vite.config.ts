import { defineConfig } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';

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
      plugins: [
        EnvironmentPlugin({
          NODE_ENV: 'production',
        }),
      ],
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
