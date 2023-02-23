import * as path from 'path';
import injectProcessEnv from 'rollup-plugin-inject-process-env';
export default {
  plugins: [injectProcessEnv({ NODE_ENV: 'development' })],
  resolve: {
    alias: {
      '@cc-components/punchapp': path.resolve('../../libs/punchapp/src'),
      '@cc-components/shared': path.resolve('../../libs/shared/src'),
      '@cc-components/punchshared': path.resolve('../../libs/punchshared/src'),
      '@cc-components/punchsidesheet': path.resolve('../../libs/punchsidesheet/src'),
    },
  },
};
