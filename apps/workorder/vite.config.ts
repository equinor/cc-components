import viteConfigBase from '../../vite.config.base';
import { UserConfigExport, defineConfig } from 'vite';
export default defineConfig({
  ...viteConfigBase,
  build: {
    lib: {
      entry: './src/main.tsx',
      name: 'workorder',
      fileName: 'app-bundle',
      formats: ['es'],
    },
  },
} as UserConfigExport);
