import * as path from 'path';
import viteConfigBase from '../../vite.config.base';

export default {
  ...viteConfigBase,
  resolve: {
    alias: {
      '@cc-components/jcaspoolsapp': path.resolve('../../libs/jcaspoolsapp/src'),
      '@cc-components/shared': path.resolve('../../libs/shared/src'),
    },
  },
};
