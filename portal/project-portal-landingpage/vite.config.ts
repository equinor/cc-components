import { defineConfig } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';


const fix = `
var process = {
  env: {
    NODE_ENV: "production"
  }
};
var production = "production";
`;

export const InjectProcessPlugin = {
  name: 'rollup-plugin-metadata',
  renderChunk: (code: any) => fix + code,
};


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
      entry: './src/index.ts',
      fileName: 'app-bundle',
      formats: ['es'],
    },
  },
});
