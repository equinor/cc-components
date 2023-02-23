import * as path from 'path';
import injectProcessEnv from 'rollup-plugin-inject-process-env';
export default {
  plugins: [injectProcessEnv({ NODE_ENV: 'development' })],
  resolve: {
    alias: {
      '@cc-components/handoverapp': path.resolve('../../libs/handoverapp/src'),
      '@cc-components/shared': path.resolve('../../libs/shared/src'),
      '@cc-components/handoversidesheet': path.resolve(
        '../../libs/handoversidesheet/src'
      ),
      '@cc-components/handovershared': path.resolve('../../libs/handovershared/src'),
    },
  },
};
