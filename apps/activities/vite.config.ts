import viteConfigBase from '../../vite.config.base';
import path from 'path';
export default {
  ...viteConfigBase,
  resolve: {
    alias: {
      '@cc-components/activitiesapp': path.resolve('../../libs/activitiesapp/src'),
      '@cc-components/shared': path.resolve('../../libs/shared/src'),
    },
  },
};
