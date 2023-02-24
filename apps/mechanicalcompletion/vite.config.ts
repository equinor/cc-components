import * as path from 'path';
import viteConfigBase from '../../vite.config.base';

export default {
  ...viteConfigBase,
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
