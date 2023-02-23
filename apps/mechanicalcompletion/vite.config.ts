import * as path from 'path';
import injectProcessEnv from 'rollup-plugin-inject-process-env';
export default {
  plugins: [injectProcessEnv({ NODE_ENV: 'development' })],
  resolve: {
    alias: {
      '@cc-components/mechanicalcompletionapp': path.resolve(
        '../../libs/mechanicalcompletionapp/src'
      ),
      '@cc-components/shared': path.resolve('../../libs/shared/src'),
      '@cc-components/mechanicalcompletionshared': path.resolve(
        '../../libs/mechanicalcompletionshared/src'
      ),
      '@cc-components/mechanicalcompletionsidesheet': path.resolve(
        '../../libs/mechanicalcompletionsidesheet/src'
      ),
    },
  },
};
