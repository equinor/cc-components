import * as path from 'path';
import injectProcessEnv from 'vite-plugin-environment';
export default {
  plugins: [injectProcessEnv({ NODE_ENV: 'development' })],
  resolve: {
    alias: {
      '@cc-components/ccoverviewapp': path.resolve('../../libs/ccoverviewapp/src'),
      '@cc-components/shared': path.resolve('../../libs/shared/src'),
    },
  },
};
