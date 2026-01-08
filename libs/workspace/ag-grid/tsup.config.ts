import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/index.ts', './src/modules/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: ['react', 'react-dom', 'styled-components'],
});
