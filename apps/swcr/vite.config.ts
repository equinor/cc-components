import * as path from 'path';

import viteConfigBase from '../../vite.config.base';

export default {
  ...viteConfigBase,
  resolve: {
    alias: {
      '@cc-components/swcrapp': path.resolve('../../libs/swcrapp/src'),
      '@cc-components/shared': path.resolve('../../libs/shared/src'),
      '@cc-components/swcrshared': path.resolve('../../libs/swcrshared/src'),
      '@cc-components/swcrsidesheet': path.resolve('../../libs/swcrsidesheet/src'),
    },
  },
};
