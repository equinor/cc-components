import * as path from 'path';
import injectProcessEnv from 'rollup-plugin-inject-process-env';

export default {
  plugins: [injectProcessEnv({ NODE_ENV: 'development' })],
  resolve: {
    alias: {
      '@cc-components/jcainstallationapp': path.resolve(
        '../../libs/jcainstallationapp/src'
      ),
      '@cc-components/shared': path.resolve('../../libs/shared/src'),
    },
  },
};
