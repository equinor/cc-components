import * as path from 'path';
import injectProcessEnv from 'rollup-plugin-inject-process-env';
export default {
  plugins: [injectProcessEnv({ NODE_ENV: 'development' })],
  resolve: {
    alias: {
      '@cc-components/preservationanalyticsapp': path.resolve(
        '../../libs/preservationanalyticsapp/src'
      ),
      '@cc-components/shared': path.resolve('../../libs/shared/src'),
    },
  },
};
