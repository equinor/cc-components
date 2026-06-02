import { defineConfig } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';
import { InjectProcessPlugin } from '../../patches/3d-patch.ts';
import { ccAliases, repoRoot } from '../../dev-server.aliases.mjs';

export default defineConfig(({ command }) => ({
  plugins: [
    EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
  ],
  appType: 'custom',
  // During `fusion-framework-cli app dev` (serve) the CLI loads this file via
  // Vite's `loadConfigFromFile` and merges it into the dev server config, so
  // aliasing every internal `@cc-components/*` package to its TypeScript source
  // here gives true HMR for library edits. Skipped for production builds so the
  // app bundle keeps consuming the published `dist/` output.
  resolve:
    command === 'serve'
      ? {
          alias: ccAliases(),
          dedupe: ['react', 'react-dom', 'styled-components', '@tanstack/react-query'],
        }
      : undefined,
  server: command === 'serve' ? { fs: { allow: [repoRoot] } } : undefined,
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
}));
