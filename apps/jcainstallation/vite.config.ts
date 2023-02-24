import * as path from 'path';
import viteConfigBase from '../../vite.config.base';

export default {
  ...viteConfigBase,
  resolve: {
    alias: {
      '@cc-components/jcainstallationapp': path.resolve(
        '../../libs/jcainstallationapp/src'
      ),
      '@cc-components/shared': path.resolve('../../libs/shared/src'),
    },
  },
};
