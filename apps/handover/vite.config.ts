import * as path from 'path';
import viteConfigBase from '../../vite.config.base';

export default {
  ...viteConfigBase,
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
